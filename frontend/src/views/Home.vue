<template>
  <div class="home" :data-theme="theme">
    <div class="toolbar">
      <div class="toolbar-left">
        <input
          v-model="title"
          class="title-input"
          placeholder="文章标题"
        />
        <ThemeSelector v-model="theme" />
      </div>
      <div class="toolbar-right">
        <span v-if="articleId" class="status">文章 ID: {{ articleId }}</span>
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/article.js'
import Editor from '../components/Editor.vue'
import Preview from '../components/Preview.vue'
import ThemeSelector from '../components/ThemeSelector.vue'

const route = useRoute()
const store = useArticleStore()

const title = ref('')
const content = ref('')
const theme = ref('default')
const articleId = ref(null)
const saving = ref(false)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    articleId.value = id
    const article = await store.fetchArticle(id)
    if (article) {
      title.value = article.title
      content.value = article.content
      theme.value = article.theme
    }
  }
})

watch(() => route.params.id, async (newId) => {
  if (newId) {
    articleId.value = newId
    const article = await store.fetchArticle(newId)
    if (article) {
      title.value = article.title
      content.value = article.content
      theme.value = article.theme
    }
  } else {
    articleId.value = null
    title.value = ''
    content.value = ''
    theme.value = 'default'
  }
})

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
  } finally {
    saving.value = false
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
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.title-input {
  max-width: 300px;
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
</style>
