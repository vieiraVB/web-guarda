import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: globalThis.process.env.VITE_BASE_PATH || (command === 'build' ? '/web-guarda/' : '/'),
  plugins: [react()],
}))
