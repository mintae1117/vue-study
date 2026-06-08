# vue-study — React 개발자를 위한 Vue 3 학습 노트

이미 React를 아는 사람 입장에서 **Vue 3 (Composition API)** 를 비교하며 익히는 인터랙티브 학습 앱입니다.
각 주제마다 **① 개념 설명 · ② 동작하는 라이브 데모 · ③ Vue vs React 코드 나란히 비교** 가 들어 있습니다.

## 학습 토픽

| #   | 토픽                    | Vue ↔ React 비교                                         |
| --- | ----------------------- | -------------------------------------------------------- |
| 홈  | 개요                    | React ↔ Vue 멘탈 모델 매핑 표                            |
| 01  | 반응성 (Reactivity)     | `ref` / `reactive` / `computed` ↔ `useState` / `useMemo` |
| 02  | 템플릿 & 렌더링         | `v-if` / `v-for` / `v-bind` ↔ JSX                        |
| 03  | 이벤트 & 폼 바인딩      | `v-model` / 이벤트 수식어 ↔ controlled component         |
| 04  | 생명주기 & 사이드이펙트 | `onMounted` / `watch` / `watchEffect` ↔ `useEffect`      |
| 05  | 컴포넌트 통신           | `props` / `emit` / `slot` ↔ `props` / 콜백 / `children`  |
| 06  | 상태관리                | Pinia ↔ Redux / Zustand                                  |
| 07  | 라우팅                  | vue-router ↔ react-router                                |

## 기술 스택

- **Vue 3.5** (Composition API, `<script setup>`)
- **Vite 8** + **TypeScript**
- **Pinia** (상태관리) · **Vue Router** (라우팅)
- **shiki** — 코드 하이라이팅. 번들 최소화를 위해 fine-grained 방식으로 실제 사용하는
  언어(vue/tsx/ts)와 테마(github-light/dark)만 import 합니다. (`src/composables/useHighlighter.ts`)
- 테마: Vue 공식 컬러 + `prefers-color-scheme` 기반 **다크모드 자동 대응**

## 프로젝트 구조

```
src/
├─ App.vue                     # 사이드바 + <RouterView> 레이아웃
├─ data/topics.ts              # 사이드바 메뉴 + 라우트가 공유하는 토픽 메타데이터
├─ composables/
│  └─ useHighlighter.ts        # shiki 하이라이터 싱글톤
├─ components/study/
│  ├─ TopicPage.vue            # 토픽 페이지 공통 레이아웃(헤더 + 본문)
│  ├─ CodeBlock.vue            # shiki 하이라이팅 코드 블록
│  ├─ CompareCode.vue          # Vue | React 2열 비교 카드
│  ├─ DemoBox.vue              # 라이브 데모를 감싸는 카드
│  └─ demos/                   # 데모 전용 자식 컴포넌트(LikeButton, InfoCard)
├─ stores/counter.ts           # Pinia 스토어 (06 상태관리 데모에서 사용)
└─ views/
   ├─ HomeView.vue             # 개요 + 멘탈 모델 매핑 표
   └─ topics/
      ├─ samples.ts            # 모든 "Vue vs React" 코드 비교 샘플 문자열 모음
      ├─ ReactivityView.vue    # 01
      ├─ TemplateView.vue      # 02
      ├─ FormsView.vue         # 03
      ├─ LifecycleView.vue     # 04
      ├─ ComponentsView.vue    # 05
      ├─ StateView.vue         # 06
      └─ RoutingView.vue       # 07
```

> **왜 코드 샘플이 `samples.ts`에 따로 있나?**
> 샘플 안에는 닫는 `</script>` 태그가 그대로 들어갑니다(SFC 예시이므로). 이를 `.vue`의
> `<script setup>` 안 문자열에 두면 SFC 파서가 진짜 스크립트 종료로 오인하고, prettier가
> 이스케이프를 되돌려 빌드가 깨집니다. 일반 `.ts` 파일의 문자열에서는 안전하므로 분리했습니다.

## 권장 IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official) / Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Vetur는 비활성화).
`.vue` 타입 체크는 `tsc` 대신 `vue-tsc`를 사용합니다.

## 실행 방법

### 의존성 설치

```sh
npm install
```

### 개발 서버 (HMR)

```sh
npm run dev
```

### 프로덕션 빌드 (타입 체크 포함)

```sh
npm run build
```

### 단위 테스트 ([Vitest](https://vitest.dev/))

```sh
npm run test:unit
```

### 타입 체크

```sh
npm run type-check
```

### Lint ([oxlint](https://oxc.rs/) + [ESLint](https://eslint.org/))

```sh
npm run lint
```

## 참고: 코드 샘플의 `react` / `react-router-dom`

코드 비교 샘플 문자열 안에 `import ... from 'react'` 같은 줄이 텍스트로 들어갑니다.
이는 실제 의존성이 아니므로, Vite 의존성 스캐너가 오인하지 않도록 `vite.config.ts`의
`optimizeDeps.exclude`에 `react`, `react-router-dom`을 명시해 두었습니다. (React를 실제로
설치하지 않습니다.)
