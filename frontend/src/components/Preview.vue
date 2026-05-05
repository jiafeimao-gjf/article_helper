<template>
  <div class="preview">
    <div class="preview-header">
      <span>预览</span>
      <div class="header-actions">
        <button v-if="content" class="copy-btn" @click="handleCopy">
          {{ copied ? '已复制' : '复制' }}
        </button>
      </div>
    </div>
    <div class="article-theme-wrapper" :data-article-theme="theme">
      <div class="markdown-preview" v-html="rendered"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'default'
  }
})

const copied = ref(false)

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const rendered = computed(() => {
  if (!props.content) return '<p class="empty-hint">预览区域</p>'
  return md.render(props.content)
})

async function handleCopy() {
  const previewEl = document.querySelector('.article-theme-wrapper')
  if (!previewEl) return

  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(previewEl)
  selection.removeAllRanges()
  selection.addRange(range)

  try {
    document.execCommand('copy')
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    // fallback: 尝试 clipboard API
    try {
      const htmlContent = previewEl.innerHTML
      const plainText = props.content
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
      ])
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    } catch (e2) {
      alert('复制失败，请尝试手动选择内容后 Ctrl+C 复制')
    }
  }

  selection.removeAllRanges()
}
</script>

<style scoped>
.preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
}

.preview-header span {
  font-size: 12px;
  color: var(--text-secondary);
}

.header-actions {
  display: flex;
  gap: 8px;
}

.copy-btn {
  padding: 4px 12px;
  font-size: 12px;
  background: var(--accent);
}

.article-theme-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
}

.empty-hint {
  color: var(--text-secondary);
  text-align: center;
  padding-top: 100px;
  font-size: 14px;
}
</style>
