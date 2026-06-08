import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const figmaAssetResolver = () => ({
  name: 'figma-asset-resolver',
})
const tailwindcss = () => ({
  name: 'tailwindcss',
})

export default defineConfig({
  base: './',
  root: 'src/src',
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
})
