import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const figmaAssetResolver = () => ({
  name: 'figma-asset-resolver',
})

export default defineConfig({
  base: './', // 👈 하얀 화면을 막아주는 가장 표준적인 상대 경로 설정
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
