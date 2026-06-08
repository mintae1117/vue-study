import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useTheme } from './composables/useTheme'

// 앱 마운트 전에 테마 시스템을 한 번 초기화한다.
// (저장된 모드를 <html>.dark 에 반영 + OS 변경 리스너 등록)
useTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
