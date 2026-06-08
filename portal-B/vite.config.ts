import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './', // index.html과 세트로 하얀 화면을 막아주는 안전한 상대 경로
  plugins: [
    react() // 꼬이기 쉬운 커스텀 플러그인들을 제외하고 리액트 기본 빌드로 안전하게 처리
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
