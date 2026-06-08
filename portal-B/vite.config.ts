import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Figma Make 고유 플러그인이 빌드 에러를 내지 않도록 안전하게 선언
const figmaAssetResolver = () => ({
  name: 'figma-asset-resolver',
})
const tailwindcss = () => ({
  name: 'tailwindcss',
})

export default defineConfig({
  base: './', // 👈 index.html과 짝을 이루는 안전한 상대 경로 설정
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
