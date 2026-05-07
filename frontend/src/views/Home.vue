<template>
  <div class="home" :data-theme="theme">
    <div class="toolbar">
      <div class="toolbar-left">
        <select v-model="selectedArticleId" @change="handleArticleSelect" class="article-select">
          <option value="">+ 新建文章</option>
          <option v-for="article in store.articles" :key="article.id" :value="article.id">
            {{ article.title || '无标题' }}
          </option>
        </select>
        <button v-if="articleId" @click="handleDelete" class="delete-btn" title="删除文章">×</button>
        <input
          v-model="title"
          class="title-input"
          placeholder="文章标题"
        />
        <ThemeSelector v-model="theme" />
      </div>
      <div class="toolbar-right">
        <span v-if="articleId" class="status">
          <span v-if="saving">保存中...</span>
          <span v-else-if="lastSaved">已保存 {{ formatTime(lastSaved) }}</span>
          <span v-else>已保存</span>
        </span>
        <button v-if="!articleId" @click="handleSave" :disabled="saving">
          {{ saving ? '保存中...' : '保存文章' }}
        </button>
        <button v-else @click="handleUpdate" :disabled="saving">
          {{ saving ? '更新中...' : '更新文章' }}
        </button>
      </div>
    </div>
    <div class="editor-container">
      <div class="pane editor-pane">
        <Editor v-model="content" />
      </div>
      <div class="pane preview-pane">
        <Preview :content="content" :theme="theme" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article.js'
import Editor from '../components/Editor.vue'
import Preview from '../components/Preview.vue'
import ThemeSelector from '../components/ThemeSelector.vue'

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const title = ref('')
const content = ref('')
const theme = ref('default')
const articleId = ref(null)
const saving = ref(false)
const selectedArticleId = ref('')
const autoSaveTimer = ref(null)
const lastSaved = ref(null)
const hasChanges = ref(false)

// 监听变化，触发自动保存
watch([title, content, theme], () => {
  if (articleId.value) {
    hasChanges.value = true
    scheduleAutoSave()
  }
})

function scheduleAutoSave() {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value)
  }
  autoSaveTimer.value = setTimeout(() => {
    if (hasChanges.value && articleId.value) {
      autoSave()
    }
  }, 2000) // 2秒后自动保存
}

async function autoSave() {
  if (!title.value.trim() || !content.value.trim() || saving.value) return

  saving.value = true
  try {
    await store.updateArticle(articleId.value, {
      title: title.value,
      content: content.value,
      theme: theme.value
    })
    hasChanges.value = false
    lastSaved.value = new Date()
  } catch (e) {
    console.error('Auto-save failed:', e)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await store.fetchArticles()
  const id = route.params.id
  if (id) {
    selectedArticleId.value = id
    await loadArticle(id)
  }
})

watch(() => route.params.id, async (newId) => {
  if (newId) {
    selectedArticleId.value = newId
    await loadArticle(newId)
  } else {
    selectedArticleId.value = ''
    resetEditor()
  }
})

async function handleArticleSelect() {
  const id = selectedArticleId.value
  if (id) {
    router.push(`/edit/${id}`)
  } else {
    router.push('/')
  }
}

async function loadArticle(id) {
  const article = await store.fetchArticle(id)
  if (article) {
    title.value = article.title
    content.value = article.content
    theme.value = article.theme
    articleId.value = article.id
    lastSaved.value = new Date(article.updatedAt)
    hasChanges.value = false
  }
}

function formatTime(date) {
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return `${diff}秒前`
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function resetEditor() {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value)
  }
  articleId.value = null
  title.value = ''
  content.value = ''
  theme.value = 'default'
  lastSaved.value = null
  hasChanges.value = false
}

async function handleSave() {
  if (!title.value.trim() || !content.value.trim()) {
    alert('请填写标题和内容')
    return
  }
  saving.value = true
  try {
    const article = await store.createArticle({
      title: title.value,
      content: content.value,
      theme: theme.value
    })
    articleId.value = article.id
    selectedArticleId.value = article.id
    lastSaved.value = new Date()
    hasChanges.value = false
    await store.fetchArticles()
    router.push(`/edit/${article.id}`)
  } finally {
    saving.value = false
  }
}

async function handleUpdate() {
  if (!title.value.trim() || !content.value.trim()) {
    alert('请填写标题和内容')
    return
  }
  saving.value = true
  try {
    await store.updateArticle(articleId.value, {
      title: title.value,
      content: content.value,
      theme: theme.value
    })
    await store.fetchArticles()
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  if (!articleId.value) return
  if (!confirm('确定要删除这篇文章吗？')) return

  try {
    await store.deleteArticle(articleId.value)
    selectedArticleId.value = ''
    resetEditor()
    router.push('/')
  } catch (e) {
    alert('删除失败')
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  gap: 16px;
  flex-wrap: wrap;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  flex-wrap: wrap;
}

.article-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  min-width: 150px;
  max-width: 250px;
  cursor: pointer;
}

.article-select:focus {
  outline: none;
  border-color: var(--accent);
}

.delete-btn {
  padding: 6px 12px;
  background: #dc3545;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  line-height: 1;
}

.delete-btn:hover {
  background: #c82333;
}

.title-input {
  max-width: 250px;
  font-size: 16px;
  font-weight: 500;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status {
  font-size: 12px;
  color: var(--text-secondary);
}

.editor-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.pane {
  flex: 1;
  overflow: hidden;
}

.editor-pane {
  border-right: 1px solid var(--border);
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-left {
    flex-direction: column;
    align-items: stretch;
  }

  .article-select,
  .title-input {
    max-width: 100%;
    width: 100%;
  }

  .editor-container {
    flex-direction: column;
  }

  .editor-pane {
    border-right: none;
    border-bottom: 1px solid var(--border);
    flex: 1;
  }

  .preview-pane {
    flex: 1;
  }
}
</style>
