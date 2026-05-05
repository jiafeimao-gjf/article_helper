import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/list', component: List },
  { path: '/edit/:id?', component: Home }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
