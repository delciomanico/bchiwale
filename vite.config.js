import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // SPA fallback — all unknown paths serve index.html so React Router handles them
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
})
