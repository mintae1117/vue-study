<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, onUnmounted } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { lifecycle as s } from './samples'

const seconds = ref(0)
const query = ref('')
const logs = ref<string[]>([])
let timer: ReturnType<typeof setInterval> | undefined

function log(msg: string) {
  logs.value.unshift(`[${seconds.value}s] ${msg}`)
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
      <strong>가장 큰 차이:</strong> Vue는 <code>watchEffect</code>가 의존성을 <em>자동 추적</em>하므로
      deps 배열을 빠뜨려 생기는 stale closure 버그가 구조적으로 없습니다. React의
      "deps 배열 깜빡" 문제가 Vue엔 없어요.
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
        <li v-for="(l, i) in logs" :key="i">{{ l }}</li>
        <li v-if="!logs.length" class="opacity-50">아직 로그가 없습니다…</li>
      </ul>
    </DemoBox>
    <div class="key">
      이 컴포넌트를 떠났다가(다른 메뉴 클릭) 돌아오면 <code>onUnmounted</code>에서
      <code>clearInterval</code>이 호출돼 타이머가 0부터 다시 시작합니다 — cleanup이 잘 동작한다는 증거.
    </div>
  </TopicPage>
</template>
