import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Figma Make 배포 서버에서 에러를 뿜던 플러그인들을 안전하게 모킹(Mocking) 처리합니다.
const figmaAssetResolver = () => ({
  name: 'figma-asset-resolver',
})
const tailwindcss = () => ({
  name: 'tailwindcss',
})

export default defineConfig({
  base: './', // 👈 index.html과 짝을 이뤄 하얀 화면을 없애주는 핵심 상대 경로
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
