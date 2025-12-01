import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://parampara-backend-cq7a.onrender.com/',
        changeOrigin: true,
      }
    }
  }
})
