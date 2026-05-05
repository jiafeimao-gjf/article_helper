<template>
  <div class="list-page">
    <div class="page-header">
      <h1>文章列表</h1>
      <router-link to="/">
        <button>新建文章</button>
      </router-link>
    </div>
    <ArticleList
      :articles="store.articles"
      :loading="store.loading"
      :error="store.error"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from '../stores/article.js'
import ArticleList from '../components/ArticleList.vue'

const store = useArticleStore()

onMounted(() => {
  store.fetchArticles()
})

async function handleDelete(id) {
  if (confirm('确定要删除这篇文章吗？')) {
    await store.deleteArticle(id)
  }
}
</script>

<style scoped>
.list-page {
  height: 100%;
  overflow-y: auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border);
}

.page-header h1 {
  font-size: 24px;
}
</style>
