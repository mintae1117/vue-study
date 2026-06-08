import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { topics } from '@/data/topics'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 메뉴 이동 시 항상 맨 위로 스크롤
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // 토픽 라우트는 topics 데이터에서 파생 — 사이드바 메뉴와 라우트의 single source of truth.
    // 각 토픽 페이지는 topics 의 lazy 로더로 코드 스플리팅된다.
    ...topics.map((t) => ({
      path: t.path,
      name: t.name,
      component: t.component,
    })),
  ],
})

export default router
