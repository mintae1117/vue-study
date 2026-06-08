import { computed, ref } from 'vue'

// 테마 모드: 명시적 light/dark + OS 설정을 따르는 system.
export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'vue-study-theme'

function readStored(): ThemeMode {
  const v = localStorage.getItem(STORAGE_KEY)
  return v === 'light' || v === 'dark' || v === 'system' ? v : 'system'
}

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// 모듈 스코프 싱글톤 상태 — 어느 컴포넌트에서 useTheme()를 부르든 동일한 상태를 공유한다.
// (React로 치면 Context 없이도 동작하는 외부 store. Zustand 와 같은 패턴.)
const mode = ref<ThemeMode>(readStored())

function resolveDark(m: ThemeMode): boolean {
  return m === 'dark' || (m === 'system' && systemPrefersDark())
}

// 실제 <html>.classList 에 .dark 를 반영. (index.html 의 무-FOUC 스크립트와 동일한 규칙)
function applyToDom() {
  document.documentElement.classList.toggle('dark', resolveDark(mode.value))
}

// system 모드일 때 OS 설정이 바뀌면 즉시 반영되도록 한 번만 리스너 등록.
let mqlBound = false
function bindSystemListener() {
  if (mqlBound) return
  mqlBound = true
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (mode.value === 'system') applyToDom()
  })
}

export function useTheme() {
  bindSystemListener()
  applyToDom()

  function setMode(next: ThemeMode) {
    mode.value = next
    localStorage.setItem(STORAGE_KEY, next)
    applyToDom()
  }

  // 현재 실제로 dark가 적용 중인지 (system → OS 설정 반영).
  const isDark = computed(() => resolveDark(mode.value))

  return { mode, setMode, isDark }
}
