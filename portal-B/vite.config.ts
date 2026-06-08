import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@theme-ui/components' // 기존 Make 플러그인 환경 유지
import path from 'path'

// Figma Make 플러그인 전용 에셋 리졸버 설정 유지
const figmaAssetResolver = () => ({
  name: 'figma-asset-resolver',
})

export default defineConfig({
  base: '/bora-portal/portal-B/', // 👈 GitHub Pages 서브폴더 경로 인식 치트키 코드
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
