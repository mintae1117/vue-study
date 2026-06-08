import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    // 토픽 페이지들은 lazy-load (라우트별 코드 스플리팅)
    {
      path: '/reactivity',
      name: 'reactivity',
      component: () => import('../views/topics/ReactivityView.vue'),
    },
    {
      path: '/template',
      name: 'template',
      component: () => import('../views/topics/TemplateView.vue'),
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('../views/topics/FormsView.vue'),
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('../views/topics/LifecycleView.vue'),
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/topics/ComponentsView.vue'),
    },
    {
      path: '/state',
      name: 'state',
      component: () => import('../views/topics/StateView.vue'),
    },
    {
      path: '/routing',
      name: 'routing',
      component: () => import('../views/topics/RoutingView.vue'),
    },
  ],
})

export default router
