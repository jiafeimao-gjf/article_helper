import axios from 'axios'

const http = axios.create({
  baseURL: '/api'
})

export async function getArticles() {
  const res = await http.get('/articles')
  return res.data
}

export async function getArticle(id) {
  const res = await http.get(`/articles/${id}`)
  return res.data
}

export async function createArticle(data) {
  const res = await http.post('/articles', data)
  return res.data
}

export async function updateArticle(id, data) {
  const res = await http.put(`/articles/${id}`, data)
  return res.data
}

export async function deleteArticle(id) {
  const res = await http.delete(`/articles/${id}`)
  return res.data
}
