import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8523,
    proxy: {
      '/api': {
        target: 'http://localhost:9523',
        changeOrigin: true
      },
      '/images': {
        target: 'http://localhost:9523',
        changeOrigin: true
      }
    }
  }
})
