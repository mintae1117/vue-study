import type { AsyncComponentLoader } from 'vue'

// 사이드바 네비게이션 + 라우터가 함께 참조하는 학습 토픽 목록.
// 라우트(path/name/component)까지 여기서 한 번에 정의해 single source of truth 로 둔다.
// → 메뉴와 라우트가 구조적으로 어긋날 수 없다. (router/index.ts 가 이 배열을 그대로 파생)
export interface Topic {
  no: number
  path: string
  name: string
  title: string
  summary: string
  // 라우트별 코드 스플리팅을 위한 lazy 컴포넌트 로더.
  component: AsyncComponentLoader
}

export const topics: Topic[] = [
  {
    no: 1,
    path: '/reactivity',
    name: 'reactivity',
    title: '반응성 (Reactivity)',
    summary: 'ref / reactive / computed vs useState / useMemo',
    component: () => import('@/views/topics/ReactivityView.vue'),
  },
  {
    no: 2,
    path: '/template',
    name: 'template',
    title: '템플릿 & 렌더링',
    summary: 'v-if / v-for / v-bind vs JSX',
    component: () => import('@/views/topics/TemplateView.vue'),
  },
  {
    no: 3,
    path: '/forms',
    name: 'forms',
    title: '이벤트 & 폼 바인딩',
    summary: 'v-on / v-model vs onChange (controlled)',
    component: () => import('@/views/topics/FormsView.vue'),
  },
  {
    no: 4,
    path: '/lifecycle',
    name: 'lifecycle',
    title: '생명주기 & 사이드이펙트',
    summary: 'onMounted / watch / watchEffect vs useEffect',
    component: () => import('@/views/topics/LifecycleView.vue'),
  },
  {
    no: 5,
    path: '/components',
    name: 'components',
    title: '컴포넌트 통신',
    summary: 'props / emit / slots vs props / children',
    component: () => import('@/views/topics/ComponentsView.vue'),
  },
  {
    no: 6,
    path: '/state',
    name: 'state',
    title: '상태관리',
    summary: 'Pinia vs Redux / Zustand / Context',
    component: () => import('@/views/topics/StateView.vue'),
  },
  {
    no: 7,
    path: '/routing',
    name: 'routing',
    title: '라우팅',
    summary: 'vue-router vs react-router',
    component: () => import('@/views/topics/RoutingView.vue'),
  },
  {
    no: 8,
    path: '/gotchas',
    name: 'gotchas',
    title: '반응성 함정',
    summary: '구조분해 / 재할당 / props — 반응성이 끊기는 패턴',
    component: () => import('@/views/topics/GotchasView.vue'),
  },
  {
    no: 9,
    path: '/dom',
    name: 'dom',
    title: 'DOM 접근 & nextTick',
    summary: 'template ref / defineExpose vs useRef / forwardRef',
    component: () => import('@/views/topics/DomView.vue'),
  },
  {
    no: 10,
    path: '/builtins',
    name: 'builtins',
    title: '내장 컴포넌트',
    summary: 'Teleport / KeepAlive / Transition vs Portal · 라이브러리',
    component: () => import('@/views/topics/BuiltinsView.vue'),
  },
]
