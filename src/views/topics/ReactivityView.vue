<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { reactivity as s } from './samples'

// --- 라이브 데모용 상태 ---
const count = ref(0) // React의 useState(0)에 해당. 단, 값 접근은 count.value
const double = computed(() => count.value * 2) // useMemo(() => count*2, [count])

// reactive: 객체 전체를 반응형으로. .value 없이 속성 직접 접근/변경.
const profile = reactive({ name: '민태', likes: 0 })
</script>

<template>
  <TopicPage
    :no="1"
    title="반응성 (Reactivity)"
    subtitle="ref / reactive / computed vs useState / useMemo"
  >
    <p>
      Vue의 핵심은 <strong>반응성 시스템</strong>입니다. React가 "상태가 바뀌면 컴포넌트 함수를
      통째로 다시 실행"하는 모델이라면, Vue는 "값을 추적하다가 의존하는 부분만 갱신"하는 모델입니다.
      그래서 <strong>의존성 배열(deps)을 직접 적을 필요가 없습니다.</strong>
    </p>

    <div class="key">
      <strong>핵심 차이:</strong> React는 <code>setCount(c =&gt; c+1)</code>처럼 setter로만 갱신.
      Vue는 <code>count.value++</code>처럼 변수에 직접 대입하면 자동으로 추적·갱신됩니다.
    </div>

    <h2>ref &amp; computed vs useState &amp; useMemo</h2>
    <CompareCode :vue="s.vueRef" :react="s.reactState" />

    <DemoBox title="ref + computed 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <UiButton @click="count++">count++</UiButton>
        <span>count = <strong class="font-semibold text-foreground">{{ count }}</strong></span>
        <span
          >double(computed) =
          <strong class="font-semibold text-foreground">{{ double }}</strong></span
        >
      </div>
    </DemoBox>

    <h2>reactive — 객체를 통째로 반응형으로</h2>
    <p>
      <code>ref</code>는 원시값/단일값에, <code>reactive</code>는 객체에 적합합니다.
      <code>reactive</code> 객체는 <code>.value</code> 없이 속성에 바로 접근·변경합니다. React에는
      대응물이 없고, 보통 <code>useState({...})</code> + 불변 업데이트로 흉내 냅니다.
    </p>

    <CompareCode :vue="s.reactiveVue" :react="s.reactiveReact" vue-lang="ts" react-lang="tsx" />

    <DemoBox title="reactive 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <span
          >{{ profile.name }} 님의 좋아요:
          <strong class="font-semibold text-foreground">{{ profile.likes }}</strong></span
        >
        <UiButton @click="profile.likes++">👍 좋아요</UiButton>
      </div>
    </DemoBox>

    <div class="key">
      <strong>주의:</strong> <code>ref</code>는 <code>&lt;script&gt;</code> 안에서는
      <code>.value</code>가 필요하지만, <code>&lt;template&gt;</code> 안에서는 Vue가 자동으로 풀어줘서
      <code>.value</code> 없이 씁니다.
    </div>
  </TopicPage>
</template>
