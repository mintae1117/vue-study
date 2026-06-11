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

  vForIf: `<!-- ❌ 같은 요소에 함께 쓰면 v-if 가 먼저 평가됨 (todo 에 접근 불가) -->
<li v-for="todo in todos" v-if="!todo.done">...</li>

<!-- ✅ <template> 태그로 분리 (DOM 에는 나타나지 않는 래퍼) -->
<template v-for="todo in todos" :key="todo.id">
  <li v-if="!todo.done">{{ todo.text }}</li>
</template>`,

  reactForIf: `// JSX 는 그냥 JS 라서 애초에 이런 함정이 없다
{todos
  .filter((t) => !t.done)
  .map((t) => (
    <li key={t.id}>{t.text}</li>
  ))}`,
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

  vModifiers: `<!-- v-model 수식어 — 흔한 입력값 정리를 선언적으로 -->
<input v-model.trim="name" />    <!-- 양끝 공백 제거 -->
<input v-model.number="age" />   <!-- 가능하면 숫자로 변환 -->
<input v-model.lazy="memo" />    <!-- input 대신 change 시점에 동기화 -->`,

  reactModifiers: `// React 는 onChange 안에서 직접 처리
<input onChange={(e) => setName(e.target.value.trim())} />
<input onChange={(e) => setAge(e.target.valueAsNumber)} />
<input onBlur={(e) => setMemo(e.target.value)} />  {/* .lazy 대응 */}`,
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

  vueWatchOptions: `// ⚠️ reactive 객체의 속성은 getter 로 감싸야 한다 (가장 흔한 첫 에러!)
watch(() => profile.likes, (v) => { ... })   // ✅
watch(profile.likes, (v) => { ... })         // ❌ 그냥 number 를 넘긴 것

watch(query, cb, {
  immediate: true,  // 등록 즉시 1회 실행 (useEffect 의 기본 동작에 해당)
  deep: true,       // 객체 내부의 깊은 변경까지 감지
  once: true,       // 딱 1번만 실행하고 해제
})

// 경쟁 상태(race) 정리 — useEffect cleanup 대응
watch(query, async (q, _old, onCleanup) => {
  const ctrl = new AbortController()
  onCleanup(() => ctrl.abort())   // 다음 실행 직전/중단 시 호출됨
  results.value = await fetchResults(q, ctrl.signal)
})`,

  reactWatchOptions: `// useEffect 는 기본이 "즉시 1회 + 변경 시마다".
// Vue 의 watch 는 기본이 "변경 시에만" — 그래서 immediate 옵션이 따로 있다

useEffect(() => {
  const ctrl = new AbortController()
  fetchResults(query, ctrl.signal).then(setResults)
  return () => ctrl.abort()       // cleanup = watch 의 onCleanup
}, [query])`,

  vueError: `// 자손 컴포넌트가 던진 에러를 잡는 생명주기 훅
import { onErrorCaptured, ref } from 'vue'

const error = ref<unknown>(null)
onErrorCaptured((err) => {
  error.value = err
  return false        // false 반환 시 더 위로 전파되지 않음
})

// 템플릿에서: <Fallback v-if="error" /> 아니면 <slot />`,

  reactError: `// React 의 Error Boundary 는 아직 클래스 컴포넌트로만 작성 가능
// (보통 react-error-boundary 라이브러리를 쓴다)
class ErrorBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    return this.state.error ? <Fallback /> : this.props.children
  }
}`,
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

  vueDefineModel: `<!-- 자식 (UiInput.vue) — 단 한 줄로 v-model 지원 (Vue 3.4+) -->
<script setup lang="ts">
const model = defineModel<string>()
</script>
<template>
  <input v-model="model" />
</template>

<!-- 부모 — 자식의 상태가 부모 변수와 양방향으로 묶인다 -->
<UiInput v-model="text" />`,

  reactDefineModel: `// React 에 양방향 바인딩은 없다 — value + onChange 쌍을 직접 정의
function UiInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

<UiInput value={text} onChange={setText} />`,

  vueProvide: `// 조상 — Provider 로 트리를 감싸는 대신 setup 에서 호출
import { provide, ref } from 'vue'

const user = ref({ name: '민태' })
provide('user', user)        // ref 를 그대로 주면 반응성도 유지

// ── 깊은 자손 — 중간 컴포넌트는 아무것도 몰라도 됨
import { inject } from 'vue'

const user = inject('user')  // 부모~조상 어디서 줬든 받는다`,

  reactContext: `// React — createContext + Provider + useContext 3종 세트
const UserContext = createContext(null)

function App() {
  return (
    <UserContext.Provider value={user}>
      <Page />
    </UserContext.Provider>
  )
}

// 깊은 자손
const user = useContext(UserContext)`,
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

  moduleStateVue: `// composables/useTheme.ts — Pinia 없이도 전역 상태가 된다.
// 모듈 스코프의 ref = import 하는 모든 곳이 같은 인스턴스를 공유 (싱글톤)
import { ref, computed } from 'vue'

const mode = ref<ThemeMode>(readStored())   // 함수 밖 = 모듈 스코프!

export function useTheme() {
  const isDark = computed(() => /* mode 기반 계산 */)
  function setMode(m: ThemeMode) { mode.value = m }
  return { mode, isDark, setMode }
}`,

  moduleStateReact: `// React 에선 모듈 스코프 변수가 바뀌어도 리렌더가 일어나지 않는다.
// 그래서 "외부 스토어 + 구독 장치"가 필요 — 이게 Zustand 의 본질
import { create } from 'zustand'

const useTheme = create((set) => ({
  mode: readStored(),
  setMode: (mode) => set({ mode }),
}))`,
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

  vueGuard: `// 전역 navigation guard — 모든 라우트 이동을 한 곳에서 가로챈다
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

// 라우트엔 meta 만 달면 끝
{ path: '/admin', component: Admin, meta: { requiresAuth: true } }`,

  reactGuard: `// react-router 에 전역 가드는 없다 — 패턴으로 해결
// ① 래퍼 컴포넌트로 보호하거나
<Route path="/admin"
  element={<RequireAuth><Admin /></RequireAuth>} />

// ② loader 에서 redirect (v6.4+ data API)
{ path: '/admin', element: <Admin />,
  loader: () => (isLoggedIn() ? null : redirect('/login')) }`,
}

export const gotchas = {
  destructureVue: `import { reactive, toRefs } from 'vue'

const profile = reactive({ name: '민태', likes: 0 })

// ❌ 구조분해 = 그 시점 값의 복사. 반응성이 끊긴다
const { likes } = profile          // likes 는 그냥 number 0

// ✅ toRefs: 각 속성을 ref 로 바꿔 원본과 연결을 유지
const { likes } = toRefs(profile)
likes.value++                      // profile.likes 도 같이 증가`,

  destructureReact: `// React 개발자의 손버릇 — React 에선 구조분해가 늘 안전했다
const [profile, setProfile] = useState({ name: '민태', likes: 0 })

// 문제없음. setProfile 이 호출되면 컴포넌트 함수가
// 통째로 재실행되며 어차피 다시 구조분해되니까
const { likes } = profile`,

  propsVue: `<script setup lang="ts">
// Vue 3.4 이하: ❌ 구조분해 즉시 반응성이 끊겼다 (props.label 로 써야 했음)
// Vue 3.5+:    ✅ 컴파일러가 props.label 접근으로 되돌려 줘서 안전
const { label } = defineProps<{ label: string }>()

// 단, watch 에 직접 넘기는 건 여전히 ❌ — getter 로 감싼다
watch(() => label, (v) => { ... })
</script>`,

  propsReact: `// React: 매 렌더마다 새 props 객체가 들어오므로
// 시그니처에서 바로 구조분해하는 게 오히려 표준이다
function LikeButton({ label }: { label: string }) {
  return <button>{label}</button>
}`,

  reassignVue: `// ❌ reactive 를 통째로 재할당 — 템플릿은 여전히 옛 Proxy 를 본다
let profile = reactive({ name: '민태' })
profile = reactive({ name: '교체' })   // 화면은 안 바뀜

// ✅ ref 는 .value 재할당이 추적된다 — 통째 교체가 필요하면 ref
const profile = ref({ name: '민태' })
profile.value = { name: '교체' }       // OK. 공식 가이드도 ref 를 기본 권장`,

  reassignReact: `// React 는 어차피 setter 로만 교체하므로 이런 함정 자체가 없다
const [profile, setProfile] = useState({ name: '민태' })
setProfile({ name: '교체' })           // 항상 OK`,

  passValueVue: `const count = ref(0)

// ❌ .value 를 넘기는 순간 그냥 number — 추적이 끊긴다
const double = useDouble(count.value)

// ✅ ref 자체 또는 getter 를 넘긴다
const double = useDouble(count)               // ref 그대로
const double = useDouble(() => count.value)   // getter
// 받는 쪽은 toValue() 로 풀면 둘 다 대응 가능 (Vue 3.3+)`,

  passValueReact: `// React 의 custom hook 은 매 렌더 재실행되므로
// 값을 그대로 넘겨도 다음 렌더 때 새 값이 다시 들어온다
const double = useDouble(count)   // 늘 최신 값`,
}

export const dom = {
  vueTemplateRef: `<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'

// 템플릿의 ref="input" 과 이름으로 연결 (Vue 3.5+)
// 3.4 이하: const inputEl = ref<HTMLInputElement | null>(null) — 변수명 일치
const inputEl = useTemplateRef('input')

onMounted(() => {
  inputEl.value?.focus()      // 마운트 전엔 null
})
</script>

<template>
  <input ref="input" />
</template>`,

  reactRef: `import { useRef, useEffect } from 'react'

function Field() {
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  return <input ref={inputEl} />
}`,

  vueMutable: `// 리렌더와 무관한 mutable 값 — Vue 는 그냥 일반 변수면 된다.
// setup 은 1회만 실행되므로 클로저에 그대로 살아 있다
let timerId: number | undefined

onMounted(() => { timerId = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(timerId))`,

  reactMutable: `// React 는 함수가 매 렌더 재실행되므로 useRef 로 보관해야 한다
// (useRef 의 두 번째 용도: 리렌더를 일으키지 않는 보관함)
const timerId = useRef<number>()

useEffect(() => {
  timerId.current = setInterval(tick, 1000)
  return () => clearInterval(timerId.current)
}, [])`,

  vueNextTick: `import { nextTick } from 'vue'

async function addItem() {
  items.value.push(newItem)
  // 이 시점의 DOM 은 아직 옛날 — Vue 는 갱신을 모아서(batch) 반영한다
  await nextTick()
  // 이제 DOM 반영 완료 — 스크롤 / 포커스 / 측정 OK
  listEl.value?.lastElementChild?.scrollIntoView()
}`,

  reactNextTick: `// React 는 "렌더가 끝난 뒤"를 useEffect 로 잡는다
const [items, setItems] = useState([])

useEffect(() => {
  listEl.current?.lastElementChild?.scrollIntoView()
}, [items])      // items 가 바뀌어 그려진 다음 실행`,

  vueExpose: `<!-- 자식: <script setup> 컴포넌트는 기본적으로 "닫혀" 있다 -->
<script setup lang="ts">
function focus() { inputEl.value?.focus() }
defineExpose({ focus })        // 공개할 것만 명시적으로
</script>

<!-- 부모 -->
<FancyInput ref="fancy" />
// fancy.value?.focus()  ← expose 한 것만 보인다`,

  reactExpose: `// React 19: ref 를 일반 prop 으로 (이전엔 forwardRef 로 감싸야 했다)
function FancyInput({ ref }) {
  const inputEl = useRef(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputEl.current?.focus(),
  }))
  return <input ref={inputEl} />
}`,
}

export const builtins = {
  vueTeleport: `<template>
  <!-- 부모의 overflow / z-index 에서 탈출해 body 끝에 렌더 -->
  <Teleport to="body">
    <div v-if="open" class="modal">...</div>
  </Teleport>
</template>`,

  reactPortal: `import { createPortal } from 'react-dom'

function Modal({ open }) {
  if (!open) return null
  return createPortal(
    <div className="modal">...</div>,
    document.body,
  )
}`,

  vueKeepAlive: `<template>
  <!-- 꺼진 컴포넌트를 파괴하지 않고 캐시 — 내부 상태/스크롤 유지 -->
  <KeepAlive>
    <component :is="currentTab" />
  </KeepAlive>

  <!-- 라우터와 함께 쓰면 "뒤로 가기 시 그대로" 가 공짜 -->
  <RouterView v-slot="{ Component }">
    <KeepAlive><component :is="Component" /></KeepAlive>
  </RouterView>
</template>`,

  reactKeepAlive: `// React 에는 대응물이 없다 — 언마운트되면 상태는 사라진다.
// 흔한 우회: 상태 끌어올리기, 또는 display:none 으로 전부 마운트해 두기
// (<Activity> 가 실험 중이긴 하다)
{tabs.map((t) => (
  <div key={t.id}
    style={{ display: t.id === current ? '' : 'none' }}>
    <Tab {...t} />
  </div>
))}`,

  vueTransition: `<template>
  <!-- enter/leave 시 클래스(.fade-enter-active 등)를 자동 부착 -->
  <Transition name="fade">
    <p v-if="show">짠!</p>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>`,

  reactTransition: `// React 기본 제공 없음 — 라이브러리를 쓴다
// (framer-motion / react-transition-group 등)
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {show && (
    <motion.p initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      짠!
    </motion.p>
  )}
</AnimatePresence>`,

  vueSuspense: `<!-- async setup(top-level await) 컴포넌트를 기다린다 -->
<Suspense>
  <UserProfile />   <!-- <script setup> 안에서 await 사용 가능 -->
  <template #fallback>로딩 중…</template>
</Suspense>`,

  reactSuspense: `<Suspense fallback={<p>로딩 중…</p>}>
  <UserProfile />   {/* React.lazy / use() 등 */}
</Suspense>

// 개념은 동일하다. 단 Vue 쪽은 아직 experimental 표기`,
}
