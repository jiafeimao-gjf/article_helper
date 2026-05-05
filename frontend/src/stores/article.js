import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '../api/article.js'

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const currentArticle = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchArticles() {
    loading.value = true
    error.value = null
    try {
      const res = await api.getArticles()
      articles.value = res.data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchArticle(id) {
    loading.value = true
    error.value = null
    try {
      const res = await api.getArticle(id)
      currentArticle.value = res.data
      return res.data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function createArticle(data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.createArticle(data)
      articles.value.unshift(res.data)
      return res.data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateArticle(id, data) {
    loading.value = true
    error.value = null
    try {
      const res = await api.updateArticle(id, data)
      const index = articles.value.findIndex(a => a.id === id)
      if (index !== -1) {
        articles.value[index] = { ...articles.value[index], ...res.data }
      }
      if (currentArticle.value?.id === id) {
        currentArticle.value = res.data
      }
      return res.data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteArticle(id) {
    loading.value = true
    error.value = null
    try {
      await api.deleteArticle(id)
      articles.value = articles.value.filter(a => a.id !== id)
      if (currentArticle.value?.id === id) {
        currentArticle.value = null
      }
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    currentArticle,
    loading,
    error,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle
  }
})
