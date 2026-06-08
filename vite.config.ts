import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    // 'react' / 'react-router-dom' 은 실제 의존성이 아니라 학습용 "코드 비교" 샘플
    // 문자열 안에만 등장한다. 의존성 스캐너가 이를 잡아 pre-bundling을 건너뛰지
    // 않도록 제외 목록에 명시한다.
    exclude: ['react', 'react-router-dom'],
  },
})
