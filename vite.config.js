import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //
  server: {
    proxy: {
      //这里/api就是给 https://article.puxiaoshuai.top/api 取个别名  最终的 地址 由别名+后缀完成  /api/article
      "/api": {
        target: "https://article.puxiaoshuai.top/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
})
