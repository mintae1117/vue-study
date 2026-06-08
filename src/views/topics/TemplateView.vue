<script setup lang="ts">
import { ref } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { template as s } from './samples'

const show = ref(true)
// 리스트가 변이(추가)되므로 index가 아닌 안정적인 id를 key로 쓴다.
// 같은 이름을 두 번 추가해도 항목이 고유하게 식별된다.
let nextFruitId = 0
const fruits = ref([
  { id: nextFruitId++, label: '🍎 사과' },
  { id: nextFruitId++, label: '🍌 바나나' },
  { id: nextFruitId++, label: '🍇 포도' },
])
const newFruit = ref('')

function addFruit() {
  const v = newFruit.value.trim()
  if (!v) return
  fruits.value.push({ id: nextFruitId++, label: v })
  newFruit.value = ''
}
</script>

<template>
  <TopicPage :no="2" title="템플릿 & 렌더링" subtitle="v-if / v-for / v-bind vs JSX">
    <p>
      React는 <strong>JSX</strong>(자바스크립트 안에 마크업)로, Vue는 <strong>템플릿</strong>(HTML
      안에 디렉티브)으로 화면을 그립니다. JSX는 "그냥 JS라서" <code>map</code>, 삼항연산자를 쓰지만,
      Vue는 <code>v-for</code>, <code>v-if</code> 같은 <strong>디렉티브</strong>를 씁니다.
    </p>

    <h2>조건부 렌더링 — v-if / v-else vs 삼항</h2>
    <CompareCode :vue="s.vIf" :react="s.reactIf" />
    <DemoBox title="v-if / v-show 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <UiButton @click="show = !show">토글</UiButton>
        <p v-if="show">✅ v-if: 지금 보입니다</p>
        <p v-else>🚫 v-if: 숨겨졌어요 (DOM에서 제거됨)</p>
      </div>
    </DemoBox>
    <div class="key">
      <strong>v-if vs v-show:</strong> <code>v-if</code>는 DOM을 실제로 추가/제거(React 삼항과 동일),
      <code>v-show</code>는 <code>display:none</code>만 토글합니다. 자주 깜빡이면 <code>v-show</code>가
      유리 — React에는 없는 구분입니다.
    </div>

    <h2>리스트 렌더링 — v-for vs map</h2>
    <CompareCode :vue="s.vFor" :react="s.reactFor" />
    <DemoBox title="v-for 라이브 데모">
      <ul class="mb-4 list-disc pl-5">
        <li v-for="fruit in fruits" :key="fruit.id" class="my-1">{{ fruit.label }}</li>
      </ul>
      <div class="flex flex-wrap items-center gap-4">
        <UiInput
          v-model="newFruit"
          class="max-w-xs flex-1"
          placeholder="과일 추가 후 Enter"
          @keyup.enter="addFruit"
        />
        <UiButton @click="addFruit">추가</UiButton>
      </div>
    </DemoBox>
    <div class="key">
      양쪽 다 <code>:key</code> / <code>key</code>가 필수입니다. 이유도 동일 — 가상 DOM diff 최적화.
    </div>

    <h2>속성 바인딩 — v-bind(:) vs {중괄호}</h2>
    <CompareCode :vue="s.vBind" :react="s.reactBind" vue-lang="vue" react-lang="tsx" />
  </TopicPage>
</template>
