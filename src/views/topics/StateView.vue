<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import { state as s } from './samples'

// 이 프로젝트에 원래 있던 Pinia 스토어를 그대로 사용.
const counter = useCounterStore()
// storeToRefs: 반응성을 유지하며 구조 분해 (그냥 분해하면 반응성 끊김)
const { count, doubleCount } = storeToRefs(counter)
</script>

<template>
  <TopicPage :no="6" title="상태관리" subtitle="Pinia vs Redux / Zustand / Context">
    <p>
      Vue의 공식 상태관리는 <strong>Pinia</strong>입니다. Redux의 보일러플레이트
      (action / reducer / dispatch)가 거의 없고, <strong>Zustand</strong>와 매우 비슷한 감각입니다.
      스토어 안에서 <code>ref</code>/<code>computed</code>/함수를 그냥 정의하고 <code>return</code>하면
      끝 — 컴포넌트의 <code>&lt;script setup&gt;</code>과 작성법이 똑같습니다.
    </p>

    <div class="key">
      <strong>핵심:</strong> Pinia는 <em>dispatch / action type 문자열이 없습니다.</em> 스토어의
      함수를 메서드처럼 직접 호출하면 됩니다. <code>computed</code>는 Redux의 selector(또는 reselect)
      역할을 자동으로 합니다.
    </div>

    <h2>Pinia vs Redux Toolkit</h2>
    <CompareCode :vue="s.vueStore" :react="s.reduxStore" vue-lang="ts" react-lang="ts" />

    <h2>Pinia ↔ Zustand (감각이 가장 비슷)</h2>
    <CompareCode :vue="s.vueStore" :react="s.zustandStore" vue-lang="ts" react-lang="ts" />

    <DemoBox title="Pinia 라이브 데모 (전역 스토어)">
      <div class="row">
        <button class="btn" @click="counter.increment()">increment()</button>
        <span
          >count = <strong>{{ count }}</strong></span
        >
        <span
          >doubleCount(getter) = <strong>{{ doubleCount }}</strong></span
        >
      </div>
      <p style="font-size: 0.82rem; opacity: 0.7; margin-top: 0.6rem">
        이 값은 <strong>전역</strong>입니다. 다른 메뉴(예: 라우팅 페이지)로 갔다 와도 값이 유지됩니다 —
        Redux store / Zustand store 가 컴포넌트 트리 밖에 사는 것과 같습니다.
      </p>
    </DemoBox>

    <h2>storeToRefs — 구조 분해할 때 주의</h2>
    <p>
      Pinia 스토어를 <code>const { count } = counter</code>로 그냥 분해하면 반응성이 끊깁니다.
      <code>storeToRefs(counter)</code>로 감싸야 <code>ref</code>로 유지됩니다. (함수/액션은 그냥
      분해해도 OK.) React에서 Zustand selector를 잘못 써서 리렌더가 안 되는 실수와 비슷한 함정입니다.
    </p>
    <CompareCode
      :vue="s.storeToRefsVue"
      :react="s.storeToRefsReact"
      vue-lang="ts"
      react-lang="ts"
    />
  </TopicPage>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.btn {
  border: 1px solid var(--color-border-hover);
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn:hover {
  border-color: hsla(160, 100%, 37%, 1);
  color: hsla(160, 100%, 37%, 1);
  background: transparent;
}
</style>
