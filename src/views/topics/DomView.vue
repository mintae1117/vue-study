<script setup lang="ts">
import { ref, useTemplateRef, nextTick } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { dom as s } from './samples'

// --- template ref 데모 ---
const focusTarget = useTemplateRef('focusTarget')
function focusInput() {
  focusTarget.value?.focus()
}

// --- nextTick 데모: 상태 변경 직후 DOM 을 읽어 보면? ---
const count = ref(0)
const countEl = useTemplateRef('countEl')
const beforeText = ref('—')
const afterText = ref('—')

async function incAndRead() {
  count.value++
  beforeText.value = countEl.value?.textContent ?? '' // 아직 옛 DOM
  await nextTick()
  afterText.value = countEl.value?.textContent ?? '' // 갱신된 DOM
}
</script>

<template>
  <TopicPage
    :no="9"
    title="DOM 접근 & nextTick"
    subtitle="template ref / useTemplateRef / defineExpose vs useRef / forwardRef"
  >
    <p>
      React 의 <code>useRef</code> 는 용도가 둘입니다 — ① DOM 참조, ② 리렌더와 무관한 mutable 값
      보관. Vue 에선 이게 자연스럽게 분리됩니다: ①은 <strong>template ref</strong>, ②는
      <strong>그냥 일반 변수</strong>(setup 이 1회만 실행되니 클로저로 충분).
    </p>

    <h2>DOM 참조 — template ref vs useRef</h2>
    <CompareCode :vue="s.vueTemplateRef" :react="s.reactRef" />
    <DemoBox title="template ref 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <input
          ref="focusTarget"
          placeholder="버튼을 누르면 여기에 포커스"
          class="h-9 w-full max-w-sm rounded-md border border-border-strong bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <UiButton @click="focusInput">focus()</UiButton>
      </div>
    </DemoBox>
    <div class="key">
      <strong>주의:</strong> ref 는 <strong>마운트 전엔 <code>null</code></strong> 입니다. setup
      본문에서 바로 쓰지 말고 <code>onMounted</code> 안에서 접근하세요. (React 에서 렌더 중
      <code>ref.current</code> 가 null 인 것과 같은 이유)
    </div>

    <h2>리렌더와 무관한 값 — 일반 변수 vs useRef</h2>
    <CompareCode :vue="s.vueMutable" :react="s.reactMutable" vue-lang="ts" react-lang="tsx" />

    <h2>nextTick — "렌더 후"를 기다리는 법</h2>
    <p>
      Vue 는 상태 변경을 <strong>모아서(batch) 비동기로 DOM 에 반영</strong>합니다. 변경 직후엔 DOM
      이 아직 옛날이라, 스크롤·포커스·크기 측정을 하려면 <code>await nextTick()</code> 으로 반영
      완료를 기다려야 합니다. React 에서 <code>useEffect</code> 가 해 주던 "렌더 후 실행"의 명령형
      버전입니다.
    </p>
    <CompareCode :vue="s.vueNextTick" :react="s.reactNextTick" vue-lang="ts" react-lang="tsx" />
    <DemoBox title="nextTick 라이브 데모 — 상태 변경 직후 DOM 읽기">
      <div class="flex flex-wrap items-center gap-4">
        <UiButton @click="incAndRead">count++ 직후 DOM 읽기</UiButton>
        <span
          >count =
          <strong ref="countEl" class="font-semibold text-foreground">{{ count }}</strong></span
        >
      </div>
      <ul class="mt-3 space-y-0.5 font-mono text-[0.82rem]">
        <li>
          nextTick <strong>전</strong> DOM 텍스트: {{ beforeText }}
          <span class="text-muted-foreground">← 아직 이전 값</span>
        </li>
        <li>
          nextTick <strong>후</strong> DOM 텍스트: {{ afterText }}
          <span class="text-muted-foreground">← 반영 완료</span>
        </li>
      </ul>
    </DemoBox>

    <h2>자식의 메서드 호출 — defineExpose vs useImperativeHandle</h2>
    <p>
      <code>&lt;script setup&gt;</code> 컴포넌트는 기본적으로
      <strong>밖에서 내부에 접근할 수 없게 닫혀</strong> 있습니다. 부모가 자식의 메서드를 불러야
      하면 자식이 <code>defineExpose</code> 로 공개합니다 — React 의
      <code>useImperativeHandle</code>(+ 18 이하라면 <code>forwardRef</code>)에 해당합니다.
    </p>
    <CompareCode :vue="s.vueExpose" :react="s.reactExpose" vue-lang="vue" react-lang="tsx" />
    <div class="key">
      양쪽 모두 같은 조언이 적용됩니다 — <strong>최후의 수단</strong>입니다. 대부분은 props /
      v-model 로 풀 수 있고, 명령형 핸들이 정말 필요한 건 focus·스크롤·재생 제어 정도입니다.
    </div>
  </TopicPage>
</template>
