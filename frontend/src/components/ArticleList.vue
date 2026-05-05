<template>
  <div class="article-list">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="articles.length === 0" class="empty">
      暂无文章，<router-link to="/">立即创作</router-link>
    </div>
    <div v-else class="list">
      <div
        v-for="article in articles"
        :key="article.id"
        class="article-item"
      >
        <div class="article-info">
          <h3 class="article-title">
            <router-link :to="`/edit/${article.id}`">{{ article.title }}</router-link>
          </h3>
          <div class="article-meta">
            <span class="theme-badge">{{ article.theme }}</span>
            <span class="date">{{ formatDate(article.updatedAt) }}</span>
          </div>
        </div>
        <div class="article-actions">
          <router-link :to="`/edit/${article.id}`">
            <button class="secondary">编辑</button>
          </router-link>
          <button class="danger" @click="$emit('delete', article.id)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

defineEmits(['delete'])

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.loading, .error, .empty {
  text-align: center;
  padding: 60px 0;
  color: var(--text-secondary);
}

.error {
  color: #dc3545;
}

.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 12px;
  background: var(--bg-secondary);
  transition: border-color 0.2s;
}

.article-item:hover {
  border-color: var(--accent);
}

.article-title {
  font-size: 16px;
  margin-bottom: 8px;
}

.article-title a {
  color: var(--text-primary);
}

.article-title a:hover {
  color: var(--accent);
}

.article-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--text-secondary);
}

.theme-badge {
  background: var(--accent);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
}

.article-actions {
  display: flex;
  gap: 8px;
}

.article-actions a {
  display: inline;
}

.article-actions button {
  padding: 6px 12px;
  font-size: 12px;
}
</style>
