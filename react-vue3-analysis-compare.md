# React 개발자를 위한 Vue 3 완전 정복 — 비교 학습 노트

> 이 프로젝트 자체가 **"Vue 3 ↔ React 비교 학습 노트"**로 만들어진 거라 설명하기 딱 좋다.
> React만 보던 입장에서 코드/기술 관점으로 하나씩 짚는다.

---

## 0. 가장 먼저 — `.vue` 파일(SFC)이라는 것

React는 `.jsx`/`.tsx` 한 파일에 **"JS 함수 하나 = 컴포넌트"**다.
Vue는 **SFC(Single File Component)**라는 `.vue` 확장자를 쓰고, 한 파일이 **3개 블록**으로 나뉜다.

`DemoBox.vue` 예시:

```vue
<script setup lang="ts">
   <!-- ① 로직 (JS/TS) -->
defineProps<{ title?: string }>()
</script>

<template>
  <!-- ② 마크업 (HTML + 디렉티브) -->
  <div>...<slot /></div>
</template>

<style scoped>
<!-- ③ 스타일 (이 컴포넌트 전용 CSS) -->
</style>
```

- **React**: 마크업·로직·스타일이 전부 JS 안에 섞임 (JSX, styled-components 등)
- **Vue**: 물리적으로 분리. 대신 빌드 타임에 `@vitejs/plugin-vue`(package.json에 있음)가 이 `.vue`를 파싱해 일반 JS 컴포넌트로 컴파일

→ 즉 **컴파일러가 핵심인 프레임워크**다. (React는 런타임 중심, Vue는 컴파일러가 많은 일을 함)

`<script setup>`의 **`setup`**이 핵심 키워드. 이건 **"이 블록 전체가 컴포넌트의 setup 함수 본문"**이라는 뜻이다. React 함수 컴포넌트 바디와 비슷하지만, 결정적 차이가 있다 👇

---

## 1. 렌더링 모델 — "함수 재실행" vs "값 추적" (가장 큰 멘탈 모델 차이)

`ReactivityView.vue:10` 주석에 정확히 적혀 있다.

```ts
const count = ref(0) // React의 useState(0)
const double = computed(() => count.value * 2) // useMemo(() => count*2, [count])
```

**React의 모델**

- 상태가 바뀌면 **컴포넌트 함수 전체가 다시 실행**됨
- 그래서 `useMemo`, `useCallback`, deps 배열이 필요 (재실행 시 불필요한 재계산/재생성을 막으려고)

**Vue의 모델**

- `<script setup>` 본문은 **컴포넌트당 딱 한 번만 실행**됨 (마운트될 때 1회)
- 대신 `ref`/`reactive`로 만든 값들이 **반응형 프록시**라서, 누가 그 값을 읽었는지 Vue가 추적하다가 값이 바뀌면 **그 부분만** 다시 렌더
- 그래서 **deps 배열이 존재하지 않음.** `computed`도 의존성을 자동 추적
- 의존성 배열 빼먹어서 생기는 **stale closure 버그가 구조적으로 없음** (`LifecycleView.vue:61` 주석 참고)

이게 `ref`에 `.value`가 붙는 이유다 👇

---

## 2. `ref` / `reactive` / `.value` — useState의 대응물

```ts
const count = ref(0)
count.value++ // 읽고 쓸 때 .value 필요 (script 안에서)
```

**왜 `.value`가 필요하냐면**: JS에서 원시값(number)은 그냥 넘기면 "값 복사"라 추적이 안 된다. 그래서 Vue는 `{ value: 0 }` 같은 객체로 한 번 감싸서(box) 그 객체의 getter/setter를 가로채 추적한다. `count.value`를 읽는 순간 "아 이 effect가 count에 의존하는구나" 하고 기록한다.

- **`ref`**: 원시값/단일값용. `.value`로 접근
- **`reactive`**: 객체용. 객체 자체를 Proxy로 만들어서 `.value` 없이 직접 접근 (`ReactivityView.vue:14`):

```ts
const profile = reactive({ name: '민태', likes: 0 })
profile.likes++ // .value 없이 바로
```

React로 치면 `reactive`는 **대응물이 없다.** `useState({...})` + 불변 업데이트(`setProfile(p => ({...p, likes: p.likes+1}))`)로 흉내 내야 한다. Vue는 **직접 변이(mutation)가 정상**이다. 불변성 안 지켜도 됨 — Proxy가 변이를 감지하니까.

> ⚠️ **`.value`의 함정**: `<script>` 안에서는 `count.value`, 하지만 `<template>` 안에서는 Vue가 자동으로 풀어줘서 그냥 `{{ count }}`로 쓴다 (`ReactivityView.vue:68` 주석).

---

## 3. 템플릿 — JSX vs 디렉티브

React는 **"JS 안의 마크업"(JSX)**이라 `map`, 삼항연산자 같은 순수 JS를 쓴다.
Vue는 **"HTML 안의 특수 속성"(디렉티브, `v-` 접두사)**을 쓴다. `TemplateView.vue` 기준:

| React (JSX)                    | Vue (디렉티브)                  | 비고                  |
| ------------------------------ | ------------------------------- | --------------------- |
| `{cond ? <A/> : <B/>}`         | `v-if="cond"` / `v-else`        | DOM 추가·제거         |
| (대응물 없음)                  | `v-show="cond"`                 | `display:none`만 토글 |
| `{arr.map(x => <li key={i}>)}` | `v-for="(x,i) in arr" :key="i"` | `:key` 둘 다 필수     |
| `<img src={url}/>`             | `<img :src="url"/>`             | `:` = `v-bind` 축약   |
| `onClick={fn}`                 | `@click="fn"`                   | `@` = `v-on` 축약     |

```vue
<p v-if="show">보입니다</p>
<p v-else>숨겨졌어요</p>

<li v-for="(fruit, i) in fruits" :key="i">{{ fruit }}</li>
```

**기억할 축약 기호 3개**

- `:` = `v-bind:` (속성에 JS 값 바인딩) → React의 `{}`
- `@` = `v-on:` (이벤트) → React의 `onXxx`
- `{{ }}` = 텍스트 보간 → React의 `{}`

그리고 **React엔 없는 이벤트 수식어**(`FormsView.vue:57`, `TemplateView.vue:56`):

```vue
<input @keyup.enter="addFruit" />
<!-- Enter 키일 때만 -->
<form @submit.prevent="..."></form>
```

`.prevent` `.stop` `.enter` `.once` 등 — `e.preventDefault()`를 손으로 안 써도 됨.

---

## 4. `v-model` — controlled component의 문법 설탕

React에서 input은 `value` + `onChange`를 손수 연결하는 controlled component다.
Vue는 **`v-model` 하나**다 (`FormsView.vue`):

```vue
<input v-model="text" />
```

이건 마법이 아니라 정확히 이걸로 컴파일된다:

```vue
<input :value="text" @input="text = $event.target.value" />
```

즉 **"value 바인딩 + 이벤트 핸들러"의 축약**. 게다가 input 타입을 알아서 매핑한다:

- `checkbox` → boolean
- `radio`/`select` → 선택값

React라면 `checked` / `value`를 타입별로 분기해야 하는 걸 `v-model` 하나로 끝낸다.

---

## 5. 생명주기 & 사이드이펙트 — useEffect의 분해

React는 모든 사이드이펙트를 `useEffect` 하나로 처리한다 (마운트/언마운트/값 변화 전부 deps 배열로 구분).
Vue는 **용도별로 함수가 나뉜다** (`LifecycleView.vue`):

```ts
onMounted(() => { ... })    // useEffect(()=>{...}, [])  의 마운트 부분
onUnmounted(() => { ... })  // useEffect의 return () => {} (cleanup)

watch(query, (val, old) => { ... })   // 특정 값 감시, 이전값/새값 둘 다 받음
watchEffect(() => { ... })            // 의존성 자동 추적 (deps 배열 없음)
```

**대응 정리**

- `onMounted` / `onUnmounted` = `useEffect(..., [])`의 마운트/클린업
- `watch(source, cb)` = `useEffect(cb, [source])` — 단 **이전 값(old)도 줌** (React는 직접 ref로 보관해야 함)
- `watchEffect` = `useEffect`인데 deps를 자동 추적 → **깜빡할 일이 없음**

→ 역할이 분리돼 있어 **"이 effect가 무슨 의도인지"가 코드만 봐도 명확**하다.

---

## 6. 컴포넌트 통신 — props / emit / slot

방향별로 보면 (`ComponentsView.vue`, `LikeButton.vue`, `InfoCard.vue`):

### ① 부모 → 자식 (props): React와 동일

```ts
defineProps<{ label: string }>() // 컴파일러 매크로. import 불필요
```

`defineProps`는 import 없이 그냥 쓰는데, 이게 **컴파일러 매크로**다. `<script setup>` 안에서만 동작하는 특수 함수.

### ② 자식 → 부모 (이벤트): 여기가 React와 다름

React는 콜백 함수를 prop으로 넘겨 호출(`onLiked={...}`)한다. Vue는 **전용 emit 메커니즘**:

```ts
// 자식 (LikeButton.vue)
const emit = defineEmits<{ liked: [amount: number] }>()
// <UiButton @click="emit('liked', 1)">
```

```vue
<!-- 부모 (ComponentsView.vue) -->
<LikeButton @liked="total++" />
```

**"props는 내려가고(↓), 이벤트는 올라간다(↑)"**는 단방향 원칙은 React와 동일. 문법만 다름.

### ③ 마크업 주입 (slot = children)

React의 `children`에 해당하는 게 `<slot />`인데 **더 강력**하다 (`InfoCard.vue`):

```vue
<header><slot name="title">기본 제목</slot></header>
<!-- named slot -->
<div><slot /></div>
<!-- default = children -->
```

```vue
<!-- 사용처 -->
<InfoCard>
  <template #title>📌 신혼여행 메모</template>  <!-- 이름 붙은 구멍에 -->
  <p>이건 default 슬롯</p>
</InfoCard>
```

React에서 "여러 구멍"을 만들려면 마크업을 prop으로 넘긴다(`<Card title={<h1/>}>`). Vue는 **named slot으로 여러 자리를 선언적으로** 만든다. `#title`은 `v-slot:title`의 축약.

### ④ `defineModel` — 부모와 양방향 (Vue 3.4+)

`UiInput.vue`가 가장 깔끔한 예다:

```ts
const model = defineModel<string>() // 단 한 줄로 v-model 지원
```

이러면 부모가 `<UiInput v-model="text" />`로 양방향 바인딩된다. React엔 양방향 자체가 없어서 `value` + `onChange` prop 두 개를 직접 정의해야 한다.

---

## 7. 상태관리 — Pinia (Vue 공식, Zustand 감각)

`stores/counter.ts`가 전형적인 Pinia store다:

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2) // = Redux selector
  function increment() {
    count.value++
  } // = action (dispatch 없음)
  return { count, doubleCount, increment }
})
```

**핵심**

- 컴포넌트 `<script setup>`과 **작성법이 완전히 똑같음.** `ref`/`computed`/함수 정의 후 return. 새 API를 배울 게 없음
- Redux의 보일러플레이트(action type 문자열 / reducer / dispatch)가 **전혀 없음.** store의 함수를 메서드처럼 직접 호출: `counter.increment()`
- 감각은 **Zustand와 거의 동일.** 컴포넌트 트리 밖에 사는 전역 store

> ⚠️ **함정** (`StateView.vue:13`): store를 그냥 구조분해하면 반응성이 끊긴다.
>
> ```ts
> const { count } = counter // ❌ 반응성 끊김 (그냥 값 복사)
> const { count } = storeToRefs(counter) // ✅ ref로 유지
> ```
>
> 단, **함수/액션은 그냥 분해해도 됨**(반응형이 아니니까). Zustand에서 selector 잘못 써서 리렌더 안 되는 실수와 비슷한 함정.

그리고 `composables/useTheme.ts`는 **Pinia 없이도 전역 상태를 만드는 패턴**을 보여준다:

```ts
// 모듈 스코프에 ref를 두면 = 싱글톤 전역 상태
const mode = ref<ThemeMode>(readStored())
export function useTheme() { ... return { mode, setMode, isDark } }
```

모듈 최상단의 `ref`는 import하는 모든 곳이 **같은 인스턴스를 공유**한다. React로 치면 Context 없이 동작하는 외부 store(Zustand의 본질과 같음). 이게 **Vue의 composable 패턴 = React의 custom hook**이다.

단, custom hook은 매 렌더 재실행되지만 **composable은 setup당 1회만 실행**된다는 차이가 있다.

---

## 8. 앱 부팅 & 라우팅

`main.ts` — `ReactDOM.createRoot(...).render(<App/>)`의 Vue 버전:

```ts
const app = createApp(App)
app.use(createPinia()) // 플러그인 등록 (전역 기능 주입)
app.use(router)
app.mount('#app')
```

`app.use(plugin)`이 React엔 없는 패턴인데, **Provider로 트리를 감싸는 대신 앱 인스턴스에 플러그인을 등록**하는 방식이다. (React는 `<Provider><RouterProvider>...`처럼 JSX로 감쌈)

`router/index.ts` — react-router와 거의 1:1:

```ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/reactivity', component: () => import('...ReactivityView.vue') }, // lazy
  ],
})
```

| react-router                    | vue-router                   |
| ------------------------------- | ---------------------------- |
| `<Link>`                        | `<RouterLink>`               |
| `<Outlet>`                      | `<RouterView>`               |
| `useParams()` / `useLocation()` | `useRoute()`                 |
| `useNavigate()`                 | `useRouter().push()`         |
| `React.lazy(() => import())`    | `() => import()` (그냥 함수) |

`App.vue:38`의 `<RouterView v-slot="{ Component }"><component :is="Component" /></RouterView>`가 `<Outlet/>` 자리고, `<component :is="...">`는 **동적 컴포넌트** — 변수에 담긴 컴포넌트를 렌더하는 Vue 문법이다 (React에선 `const C = comp; <C/>`).

> 가장 큰 차이는 **공식 여부**: vue-router는 Vue 공식이라 표준이 하나. React는 react-router / TanStack Router 등 선택지가 갈린다.

---

## 9. `<style scoped>` — CSS 캡슐화 (React엔 없는 1급 기능)

`App.vue` 하단의 `<style scoped>`:

```vue
<style scoped>
.sidebar { ... }   /* 이 컴포넌트에서만 적용됨 */
</style>
```

`scoped`를 붙이면 컴파일러가 각 요소에 `data-v-xxxxxx` 같은 고유 속성을 붙이고 CSS 셀렉터도 거기 맞춰 변형한다. 결과적으로 **이 컴포넌트 밖으로 스타일이 새지 않는다.** React는 이게 기본 제공이 아니라 CSS Modules / styled-components 같은 라이브러리가 필요하다.

그리고 `App.vue:113`의 `.router-link-exact-active`는 **vue-router가 현재 활성 링크에 자동으로 붙여주는 클래스**다. react-router의 `<NavLink className={({isActive}) => ...}>`에 대응하는데, Vue는 그냥 CSS 클래스로 준다.

이 프로젝트는 **scoped CSS와 Tailwind를 섞어** 쓴다(`UiButton.vue`는 Tailwind 유틸, `App.vue`는 scoped). `var(--border)` 같은 CSS 변수로 라이트/다크 테마를 처리한다.

---

## 10. 빌드 / 툴링 (package.json)

React 생태계와 **겹치는 것 / 다른 것**:

- **Vite + `@vitejs/plugin-vue`**: `.vue` 파일을 컴파일하는 플러그인 (React면 `@vitejs/plugin-react`)
- **`vue-tsc`** (type-check 스크립트): 그냥 `tsc`로는 `.vue` 안의 타입을 못 봐서, Vue 전용 타입체커가 따로 있다. `<template>` 안의 바인딩까지 타입 검사
- **Pinia(상태), vue-router(라우팅)**: 둘 다 공식. React는 전부 서드파티 선택
- **Vitest + `@vue/test-utils`**: 테스트(`HelloWorld.spec.ts`). React Testing Library 대응
- **ESLint + oxlint + Prettier**: 동일

---

## 📋 한 장 요약 (React → Vue 매핑)

| React                  | Vue 3                       | 한 줄                                      |
| ---------------------- | --------------------------- | ------------------------------------------ |
| `useState`             | `ref` / `reactive`          | `.value` 필요(ref), 직접 변이 OK(reactive) |
| `useMemo`              | `computed`                  | deps 배열 불필요 (자동 추적)               |
| `useEffect([])`        | `onMounted` / `onUnmounted` | 용도별 분리                                |
| `useEffect([deps])`    | `watch` / `watchEffect`     | watch는 old값도 줌                         |
| custom hook            | composable                  | setup당 1회 실행                           |
| JSX `{cond ?:}` `.map` | `v-if` `v-for`              | 디렉티브                                   |
| `value`+`onChange`     | `v-model`                   | 양방향 바인딩(설탕)                        |
| 콜백 prop              | `emit`                      | 이벤트 ↑                                   |
| children / render prop | slot / scoped slot          | 마크업 주입                                |
| Redux / Zustand        | Pinia                       | dispatch 없음, store 함수 직접 호출        |
| react-router           | vue-router                  | 공식, 1:1 대응                             |
| CSS Modules            | `<style scoped>`            | 기본 제공                                  |

---

## 🎯 가장 중요한 한 가지

> **React는 "상태 바뀜 → 함수 재실행"**이라 deps/memo로 재실행을 관리하는 모델이고,
> **Vue는 "값을 추적 → 바뀐 부분만 갱신"**이라 setup이 1회만 돌고 deps 배열이 아예 없다.
>
> `.value`, `computed`, `watchEffect`가 다 여기서 나온다.

---

### 더 깊게 팔 수 있는 토픽

- 반응성 내부 동작 (Proxy / effect 추적 메커니즘)
- slot의 scoped slot
- `defineModel` 컴파일 결과
- `npm run dev`로 띄워서 라이브 데모 보며 설명
