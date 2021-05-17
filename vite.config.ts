import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, 'src/assets/'),
    }
  },
  base: './',
  server: {
    port: 4000,
    cors: true,
    // 设置代理
    proxy: {
      '/api': {
        ws: true,
        target: 'https://test-event.ccc.cn/ccc_new_cms',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'/')
      },
      '/elApi': {
        ws: true,
        target: 'http://192.168.1.4:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/elApi/,'/')
      },
    }
  }
})
