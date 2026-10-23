import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Served from the root of agenticopz.com (GitHub Pages custom domain).
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
})
