import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      // Exclude figma_ui from build
      external: [],
    },
  },
  // Exclude figma_ui from TypeScript checking during build
  esbuild: {
    exclude: ['src/figma_ui/**'],
  },
})

