// 각 토픽 페이지에서 보여주는 "Vue vs React 코드 비교" 샘플 문자열 모음.
//
// 왜 별도 .ts 파일인가?
//  - 샘플 안에는 닫는 </script> 태그가 그대로 들어간다(SFC 예시이므로).
//  - 이걸 .vue 의 <script setup> 안에 두면 SFC 파서가 진짜 스크립트 종료로 오인한다.
//  - 일반 .ts 파일의 문자열 안에서는 </script> 가 그냥 텍스트라 안전하다.

export const reactivity = {
  vueRef: `<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)              // 값은 count.value 로 접근
const double = computed(          // 의존성 배열이 없다! 자동 추적
  () => count.value * 2,
)

function inc() {
  count.value++                   // .value 에 직접 대입 → 자동 리렌더
}
</script>

<template>
  <button @click="inc">{{ count }} (x2 = {{ double }})</button>
</template>`,

  reactState: `import { useState, useMemo } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const double = useMemo(
    () => count * 2,
    [count],                       // 의존성 배열을 직접 명시해야 함
  )

  // 항상 setter 사용. count++ 같은 직접 변경은 동작 안 함
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {count} (x2 = {double})
    </button>
  )
}`,

  reactiveVue: `const profile = reactive({ name: '민태', likes: 0 })

// 변경: 그냥 속성에 대입
profile.likes++`,

  reactiveReact: `const [profile, setProfile] = useState({ name: '민태', likes: 0 })

// 변경: 항상 새 객체로 (불변성)
setProfile((p) => ({ ...p, likes: p.likes + 1 }))`,
}

export const template = {
  vIf: `<template>
  <p v-if="show">보입니다</p>
  <p v-else>숨겨졌어요</p>

  <!-- v-show 는 display:none 토글 (DOM은 유지) -->
  <p v-show="show">자주 토글되면 v-show</p>
</template>`,

  reactIf: `function View({ show }) {
  return (
    <>
      {show ? <p>보입니다</p> : <p>숨겨졌어요</p>}

      {/* v-show 대응: style 로 직접 토글 */}
      <p style={{ display: show ? '' : 'none' }}>...</p>
    </>
  )
}`,

  vFor: `<template>
  <ul>
    <li v-for="(fruit, i) in fruits" :key="i">
      {{ fruit }}
    </li>
  </ul>
</template>`,

  reactFor: `function List({ fruits }) {
  return (
    <ul>
      {fruits.map((fruit, i) => (
        <li key={i}>{fruit}</li>
      ))}
    </ul>
  )
}`,

  vBind: `<!-- v-bind (축약: 콜론 ":") 로 속성 바인딩 -->
<img :src="url" :alt="name" :class="{ active: isOn }" />
<button :disabled="loading">저장</button>`,

  reactBind: `// JSX는 중괄호로 표현식 삽입
<img src={url} alt={name} className={isOn ? 'active' : ''} />
<button disabled={loading}>저장</button>`,
}

export const forms = {
  vModel: `<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <!-- v-model = :value + @input 자동 양방향 바인딩 -->
  <input v-model="text" />
  <p>입력값: {{ text }}</p>
</template>`,

  reactControlled: `import { useState } from 'react'

function Field() {
  const [text, setText] = useState('')

  // controlled component: value + onChange 를 직접 연결
  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>입력값: {text}</p>
    </>
  )
}`,

  vEvents: `<template>
  <!-- @click = v-on:click. 인라인 식 or 메서드 -->
  <button @click="count++">+1</button>
  <button @click="handleSave">저장</button>

  <!-- 이벤트 수식어: 보일러플레이트 제거 -->
  <form @submit.prevent="onSubmit">...</form>
  <input @keyup.enter="search" />
</template>`,

  reactEvents: `// 매번 preventDefault / 키 체크를 직접
<button onClick={() => setCount(c => c + 1)}>+1</button>
<button onClick={handleSave}>저장</button>

<form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>...</form>
<input onKeyUp={(e) => { if (e.key === 'Enter') search() }} />`,
}

export const lifecycle = {
  vueLifecycle: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
let timer

onMounted(() => {            // 마운트 직후
  timer = setInterval(() => seconds.value++, 1000)
})

onUnmounted(() => {          // 언마운트 시 정리
  clearInterval(timer)
})
</script>`,

  reactEffect: `import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {                       // 마운트 + cleanup 이 한 함수
    const timer = setInterval(
      () => setSeconds((s) => s + 1), 1000,
    )
    return () => clearInterval(timer)     // cleanup = onUnmounted
  }, [])                                  // [] = 마운트 시 1회
}`,

  vueWatch: `// watch: 감시 대상을 명시. 이전값/새값 제공
watch(query, (val, old) => {
  fetchResults(val)
})

// watchEffect: deps 없이 내부에서 읽은 값 자동 추적
watchEffect(() => {
  console.log(query.value, page.value)   // 둘 중 뭐든 바뀌면 재실행
})`,

  reactWatch: `// useEffect 로 "값 변화 감지"를 흉내
useEffect(() => {
  fetchResults(query)
}, [query])                  // deps 배열에 직접 나열해야 함

useEffect(() => {
  console.log(query, page)
}, [query, page])            // 빠뜨리면 stale 버그`,
}

export const components = {
  vueProps: `<!-- 부모 -->
<LikeButton label="좋아요" @liked="onLiked" />

<!-- 자식 (LikeButton.vue) -->
<script setup lang="ts">
defineProps<{ label: string }>()                  // 받기
const emit = defineEmits<{ liked: [n: number] }>() // 올려보내기
</script>
<template>
  <button @click="emit('liked', 1)">{{ label }}</button>
</template>`,

  reactProps: `// 부모
<LikeButton label="좋아요" onLiked={onLiked} />

// 자식 — 콜백 prop 을 받아서 호출 (전용 emit 문법은 없음)
function LikeButton({ label, onLiked }) {
  return (
    <button onClick={() => onLiked(1)}>{label}</button>
  )
}`,

  vueSlot: `<!-- 부모: 태그 사이에 마크업을 끼워넣음 -->
<InfoCard>
  <template #title>커스텀 제목</template>
  <p>본문 내용은 default slot 으로</p>
</InfoCard>

<!-- 자식 (InfoCard.vue) -->
<template>
  <header><slot name="title" /></header>
  <div><slot /></div>          <!-- = children -->
</template>`,

  reactChildren: `// React: children + props 로 마크업 전달
<InfoCard title={<span>커스텀 제목</span>}>
  <p>본문 내용은 children 으로</p>
</InfoCard>

function InfoCard({ title, children }) {
  return (
    <>
      <header>{title}</header>
      <div>{children}</div>
    </>
  )
}`,
}

export const state = {
  vueStore: `// stores/counter.ts — Pinia (setup store 스타일)
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, doubleCount, increment }
})

// 컴포넌트에서
const counter = useCounterStore()
counter.increment()        // 액션 직접 호출, dispatch 불필요`,

  reduxStore: `// Redux Toolkit — slice
const slice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: { increment: (s) => { s.count++ } },
})

// 컴포넌트에서
const count = useSelector((s) => s.counter.count)
const dispatch = useDispatch()
dispatch(increment())      // 항상 action 을 dispatch`,

  zustandStore: `// Zustand — Pinia 와 거의 동일한 감각
const useCounter = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))

// 컴포넌트에서
const { count, increment } = useCounter()
increment()`,

  storeToRefsVue: `import { storeToRefs } from 'pinia'

const counter = useCounterStore()
const { count, doubleCount } = storeToRefs(counter) // 반응성 유지
const { increment } = counter                       // 액션은 그냥 분해 OK`,

  storeToRefsReact: `// Zustand: selector 로 필요한 조각만 구독 (불필요한 리렌더 방지)
const count = useCounter((s) => s.count)
const increment = useCounter((s) => s.increment)`,
}

export const routing = {
  vueRouter: `// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/user/:id', component: User },          // 동적 파라미터
    { path: '/about', component: () => import('./About.vue') }, // lazy
  ],
})

// 템플릿에서
<RouterLink to="/about">About</RouterLink>
<RouterView />`,

  reactRouter: `// react-router (v6+)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/user/:id', element: <User /> },          // 동적 파라미터
  { path: '/about', element: <About /> },
])

// JSX 에서
<Link to="/about">About</Link>
<Outlet />          {/* vue-router 의 <RouterView /> */}`,

  vueNav: `import { useRoute, useRouter } from 'vue-router'

const route = useRoute()       // 현재 경로 정보 (params, query...)
const router = useRouter()     // 이동 제어

route.params.id                // /user/:id 의 id
router.push('/about')          // 코드로 이동
router.push({ name: 'user', params: { id: 7 } })`,

  reactNav: `import { useParams, useNavigate } from 'react-router-dom'

const { id } = useParams()     // useRoute().params 대응
const navigate = useNavigate() // useRouter().push 대응

navigate('/about')             // 코드로 이동
navigate(\`/user/\${id}\`)`,
}
