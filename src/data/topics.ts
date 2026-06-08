// 사이드바 네비게이션 + 라우터가 함께 참조하는 학습 토픽 목록.
// 한 곳에서 관리해서 메뉴와 라우트가 어긋나지 않게 한다.
export interface Topic {
  no: number
  path: string
  name: string
  title: string
  summary: string
}

export const topics: Topic[] = [
  {
    no: 1,
    path: '/reactivity',
    name: 'reactivity',
    title: '반응성 (Reactivity)',
    summary: 'ref / reactive / computed vs useState / useMemo',
  },
  {
    no: 2,
    path: '/template',
    name: 'template',
    title: '템플릿 & 렌더링',
    summary: 'v-if / v-for / v-bind vs JSX',
  },
  {
    no: 3,
    path: '/forms',
    name: 'forms',
    title: '이벤트 & 폼 바인딩',
    summary: 'v-on / v-model vs onChange (controlled)',
  },
  {
    no: 4,
    path: '/lifecycle',
    name: 'lifecycle',
    title: '생명주기 & 사이드이펙트',
    summary: 'onMounted / watch / watchEffect vs useEffect',
  },
  {
    no: 5,
    path: '/components',
    name: 'components',
    title: '컴포넌트 통신',
    summary: 'props / emit / slots vs props / children',
  },
  {
    no: 6,
    path: '/state',
    name: 'state',
    title: '상태관리',
    summary: 'Pinia vs Redux / Zustand / Context',
  },
  {
    no: 7,
    path: '/routing',
    name: 'routing',
    title: '라우팅',
    summary: 'vue-router vs react-router',
  },
]
