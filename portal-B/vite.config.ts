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
  base: './', // 👈 주소창 뒤에 폴더명이 안 붙는 환경에 맞춘 상대 경로
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
