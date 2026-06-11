<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, onUnmounted } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { lifecycle as s } from './samples'

const seconds = ref(0)
const query = ref('')
// 로그는 앞에 쌓이고(unshift) 잘려나가므로(pop) index를 key로 쓰면 안 된다.
// 각 줄에 고유 id 를 부여해 안정적으로 식별한다.
let nextLogId = 0
const logs = ref<{ id: number; text: string }[]>([])
let timer: ReturnType<typeof setInterval> | undefined

function log(msg: string) {
  logs.value.unshift({ id: nextLogId++, text: `[${seconds.value}s] ${msg}` })
  if (logs.value.length > 6) logs.value.pop()
}

// onMounted: DOM 마운트 직후 1회. (useEffect(()=>{}, []) 의 마운트 부분)
onMounted(() => {
  log('onMounted: 타이머 시작')
  timer = setInterval(() => seconds.value++, 1000)
})

// onUnmounted: 정리(cleanup). (useEffect 의 return () => {} 부분)
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// watch: 특정 소스를 콕 집어 감시. 이전값/새값을 둘 다 받는다.
watch(query, (val, old) => {
  log(`watch(query): "${old}" → "${val}"`)
})

// watchEffect: 의존성 배열 없이, 내부에서 읽은 반응형을 자동 추적
watchEffect(() => {
  if (seconds.value > 0 && seconds.value % 5 === 0) {
    log(`watchEffect: ${seconds.value}초 (5의 배수)`)
  }
})
</script>

<template>
  <TopicPage
    :no="4"
    title="생명주기 & 사이드이펙트"
    subtitle="onMounted / watch / watchEffect vs useEffect"
  >
    <p>
      React는 <strong>모든 사이드이펙트를 <code>useEffect</code> 하나로</strong> 처리합니다(마운트,
      언마운트, 값 변화 감지 전부). Vue는 이걸 용도별로 나눠 둡니다 — 생명주기 훅
      (<code>onMounted</code>/<code>onUnmounted</code>)과 값 감시(<code>watch</code>/
      <code>watchEffect</code>). 역할이 분리돼 있어 의도가 더 명확합니다.
    </p>

    <h2>생명주기 — onMounted / onUnmounted vs useEffect([])</h2>
    <CompareCode :vue="s.vueLifecycle" :react="s.reactEffect" />

    <h2>값 감시 — watch / watchEffect vs useEffect([deps])</h2>
    <CompareCode :vue="s.vueWatch" :react="s.reactWatch" vue-lang="ts" react-lang="tsx" />
    <div class="key">
      <strong>가장 큰 차이:</strong> Vue는 <code>watchEffect</code>가 의존성을
      <em>자동 추적</em>하므로 deps 배열을 빠뜨려 생기는 stale closure 버그가 구조적으로 없습니다.
      React의 "deps 배열 깜빡" 문제가 Vue엔 없어요.
    </div>

    <h2>watch 실전 옵션 — getter / immediate / deep / onCleanup</h2>
    <p>
      실무에서 watch 를 쓰면 바로 만나는 것들입니다. 특히
      <strong>reactive 객체의 속성은 getter 로 감싸야 한다</strong>는 규칙이 React 개발자가 겪는 첫
      번째 watch 에러입니다. <code>watch(profile.likes, ...)</code> 는 그 시점의 숫자를 넘긴 것일
      뿐이거든요.
    </p>
    <CompareCode
      :vue="s.vueWatchOptions"
      :react="s.reactWatchOptions"
      vue-lang="ts"
      react-lang="tsx"
    />
    <div class="key">
      <strong>immediate 주의:</strong> <code>useEffect</code> 는 기본이 "즉시 1회 + 변경 시"지만 Vue
      의 <code>watch</code> 는 기본이 <strong>"변경 시에만"</strong> 입니다. 마운트 직후에도 한 번
      돌리고 싶으면 <code>{ immediate: true }</code> — useEffect 감각으로 옮기다 가장 자주 빠뜨리는
      옵션입니다.
    </div>

    <h2>composable 의 규칙 — Rules of Hooks 와 비교</h2>
    <p>
      React 의 "Rules of Hooks"(조건문/반복문 안 호출 금지, 호출 순서 유지)는 Vue composable 에
      <strong>거의 없습니다</strong>. setup 이 1회만 실행되니 호출 순서에 의존할 이유가 없어서,
      조건문 안에서 composable 을 호출해도 됩니다. 대신 Vue 고유의 규칙이 둘 있습니다.
    </p>
    <div class="key">
      ① 생명주기 훅(<code>onMounted</code> 등)은 <strong>setup 동기 실행 중에만 등록</strong>됩니다
      — <code>await</code> 뒤에 적은 <code>onMounted</code> 는 <em>조용히 무시</em>되니 await 보다
      위에 두세요. ② React 18 StrictMode 의 "dev 에서 mount 2번" 같은 의도적 이중 실행은 Vue 에
      없습니다 — effect 가 두 번 돌아 당황할 일도 없습니다.
    </div>

    <h2>에러 잡기 — onErrorCaptured vs Error Boundary</h2>
    <CompareCode :vue="s.vueError" :react="s.reactError" vue-lang="ts" react-lang="tsx" />
    <div class="key">
      React 에선 Error Boundary 만큼은 아직 클래스 컴포넌트가 필요했지만, Vue 는 생명주기 훅
      하나(<code>onErrorCaptured</code>)라서 composable 로도 만들 수 있습니다.
    </div>

    <DemoBox title="라이브 데모 — 타이머 + watch 로그">
      <p>
        ⏱ 마운트 후 경과:
        <strong class="font-semibold text-foreground">{{ seconds }}초</strong> (onMounted에서 시작한
        setInterval)
      </p>
      <div class="my-3">
        <UiInput v-model="query" class="max-w-sm" placeholder="입력하면 watch가 감지" />
      </div>
      <p class="text-xs text-muted-foreground">실행 로그 (watch / watchEffect):</p>
      <ul class="mt-1 space-y-0.5 pl-[1.1rem] font-mono text-[0.78rem]">
        <li v-for="l in logs" :key="l.id">{{ l.text }}</li>
        <li v-if="!logs.length" class="opacity-50">아직 로그가 없습니다…</li>
      </ul>
    </DemoBox>
    <div class="key">
      이 컴포넌트를 떠났다가(다른 메뉴 클릭) 돌아오면 <code>onUnmounted</code>에서
      <code>clearInterval</code>이 호출돼 타이머가 0부터 다시 시작합니다 — cleanup이 잘 동작한다는
      증거.
    </div>
  </TopicPage>
</template>
