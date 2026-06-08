import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Figma Make 고유의 에셋 플러그인 정의 유지
const figmaAssetResolver = () => ({
  name: 'figma-asset-resolver',
})

export default defineConfig({
  base: '/bora-portal/portal-B/', // 👈 하얀 화면을 해결해 주는 핵심 경로 설정!
  plugins: [
    figmaAssetResolver(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
