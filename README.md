# vue-study — React 개발자를 위한 Vue 3 학습 노트

🔗 **라이브 데모: [vue-study-for-me.netlify.app](https://vue-study-for-me.netlify.app/)**

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
| 06  | 상태관리                | Pinia ↔ Redux / Zustand · 모듈 스코프 ref                |
| 07  | 라우팅                  | vue-router ↔ react-router · navigation guard             |
| 08  | 반응성 함정             | 구조분해 / 재할당 / props — 반응성이 끊기는 패턴         |
| 09  | DOM 접근 & nextTick     | template ref / `defineExpose` ↔ `useRef` / `forwardRef`  |
| 10  | 내장 컴포넌트           | `Teleport` / `KeepAlive` / `Transition` ↔ Portal 등      |

## 기술 스택

- **Vue 3.5** (Composition API, `<script setup>`)
- **Vite 8** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`) — 디자인 토큰 기반 유틸리티
- **Pinia** (상태관리) · **Vue Router** (라우팅)
- **shiki** — 코드 하이라이팅. 번들 최소화를 위해 fine-grained 방식으로 실제 사용하는
  언어(vue/tsx/ts)와 테마(github-light/dark)만 import 합니다. (`src/composables/useHighlighter.ts`)
- 테마: **light / dark / system** 토글 (클래스 기반, localStorage 영속, 무-FOUC)

## 프로젝트 구조

```
src/
├─ App.vue                     # 사이드바 + <RouterView> 레이아웃
├─ assets/
│  ├─ base.css                 # 디자인 토큰 (:root=light / .dark=dark) — 단일 소스
│  └─ main.css                 # Tailwind import + @theme 토큰 매핑 + 전역 레이어
├─ data/topics.ts              # 사이드바 메뉴 + 라우트가 공유하는 토픽 메타데이터
├─ composables/
│  ├─ useHighlighter.ts        # shiki 하이라이터 싱글톤
│  └─ useTheme.ts              # 테마 상태(light/dark/system) 싱글톤 + 영속
├─ components/
│  ├─ ui/                      # 디자인 시스템 프리미티브
│  │  ├─ UiButton.vue          # 버튼 (variant/size) — 중복 .btn 통합
│  │  ├─ UiInput.vue           # 인풋 (defineModel 양방향 바인딩)
│  │  └─ ThemeToggle.vue       # light/dark/system 세그먼트 토글
│  └─ study/
│     ├─ TopicPage.vue         # 토픽 페이지 공통 레이아웃(헤더 + .prose-content)
│     ├─ CodeBlock.vue         # shiki 하이라이팅 코드 블록
│     ├─ CompareCode.vue       # Vue | React 2열 비교 카드
│     ├─ DemoBox.vue           # 라이브 데모를 감싸는 카드
│     └─ demos/                # 데모 전용 자식 컴포넌트
│        #  LikeButton(emit) · InfoCard(slot) · InjectedBadge(inject) · KeepAliveCounter(KeepAlive)
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
      ├─ RoutingView.vue       # 07
      ├─ GotchasView.vue       # 08
      ├─ DomView.vue           # 09
      └─ BuiltinsView.vue      # 10
```

> **왜 코드 샘플이 `samples.ts`에 따로 있나?**
> 샘플 안에는 닫는 `</script>` 태그가 그대로 들어갑니다(SFC 예시이므로). 이를 `.vue`의
> `<script setup>` 안 문자열에 두면 SFC 파서가 진짜 스크립트 종료로 오인하고, prettier가
> 이스케이프를 되돌려 빌드가 깨집니다. 일반 `.ts` 파일의 문자열에서는 안전하므로 분리했습니다.

## 디자인 시스템 & 테마

토큰을 단일 소스로 두고, **Tailwind 유틸리티**와 **scoped CSS**가 같은 토큰을 공유하는 구조입니다.

**1) 토큰 레이어 (`assets/base.css`)** — 모든 색/반경 값의 단일 소스.
light는 `:root`, dark는 `.dark` 클래스에 정의합니다. 여기 값만 바꾸면 앱 전체가 재테마링됩니다.

**2) Tailwind 매핑 (`assets/main.css`)** — `@theme inline`으로 토큰을 유틸리티에 연결합니다.
`inline` 덕분에 `bg-background` / `text-foreground` / `bg-brand` 같은 유틸리티가 값을 굽지 않고
`var(--token)`을 그대로 출력 → **테마 전환 시 즉시 반영**됩니다. (별도 `dark:` 변형 없이, `.dark`가
변수를 덮어쓰는 것만으로 전체가 바뀝니다.)

**3) 역할 분담**

- **Tailwind 유틸리티** — 페이지/뷰 조합, 일회성 레이아웃, DS 프리미티브(`ui/*`)
- **scoped CSS + 토큰** — 캡슐화가 필요한 구조적 컴포넌트(`App.vue` 사이드바 등)
- **전역 CSS** — v-html로 주입돼 scoped가 닿지 않는 영역(shiki 코드블록, `.prose-content` 본문 타이포)
- **`@apply`** — `main.css`에서만 사용 (SFC `<style>`에서는 `@reference` 의존성을 피하려 미사용)

**4) 테마 전환 (`composables/useTheme.ts` + `index.html`)**

- `light` / `dark` / `system` 3-way. `system`은 OS 설정을 따르고 변경도 실시간 반영(matchMedia 리스너).
- 선택값은 `localStorage`(`vue-study-theme`)에 영속.
- `index.html`의 인라인 부트스트랩 스크립트가 CSS 페인트 **이전에** `.dark`를 설정 → 새로고침 시
  테마 깜빡임(FOUC) 없음.

## 로컬 실행

```sh
npm install
npm run dev        # 개발 서버 (HMR)
```

## 참고: 코드 샘플의 `react` / `react-router-dom`

코드 비교 샘플 문자열 안에 `import ... from 'react'` 같은 줄이 텍스트로 들어갑니다.
이는 실제 의존성이 아니므로, Vite 의존성 스캐너가 오인하지 않도록 `vite.config.ts`의
`optimizeDeps.exclude`에 `react`, `react-router-dom`을 명시해 두었습니다. (React를 실제로
설치하지 않습니다.)
