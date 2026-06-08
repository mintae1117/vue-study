<script setup lang="ts">
import { ref } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { forms as s } from './samples'

const text = ref('')
const agreed = ref(false)
const pick = ref('vue')
const clicks = ref(0)
</script>

<template>
  <TopicPage :no="3" title="이벤트 & 폼 바인딩" subtitle="v-on(@) / v-model vs onChange (controlled)">
    <p>
      React의 폼은 <strong>controlled component</strong> — <code>value</code>와
      <code>onChange</code>를 손수 연결합니다. Vue는 이걸 <code>v-model</code> 하나로 처리하는
      <strong>양방향 바인딩</strong>을 제공합니다. 내부적으로는 똑같이 "value 바인딩 + 이벤트 핸들러"라서
      마법이 아니라 문법 설탕입니다.
    </p>

    <h2>v-model vs controlled component</h2>
    <CompareCode :vue="s.vModel" :react="s.reactControlled" />
    <DemoBox title="v-model 라이브 데모">
      <UiInput v-model="text" class="max-w-sm" placeholder="여기에 입력해 보세요" />
      <p class="mt-2.5">
        입력값:
        <strong class="font-semibold text-foreground">{{ text || '(비어있음)' }}</strong> — 글자 수
        {{ text.length }}
      </p>
    </DemoBox>

    <h2>다양한 입력에도 v-model 하나로</h2>
    <DemoBox title="체크박스 · 라디오 v-model">
      <label class="my-1.5 flex flex-wrap items-center gap-4">
        <input type="checkbox" v-model="agreed" class="accent-brand" /> 약관에 동의합니다
        <em class="not-italic text-muted-foreground">→ {{ agreed }}</em>
      </label>
      <div class="my-1.5 flex flex-wrap items-center gap-4">
        <label class="flex items-center gap-1.5"
          ><input type="radio" value="vue" v-model="pick" class="accent-brand" /> Vue</label
        >
        <label class="flex items-center gap-1.5"
          ><input type="radio" value="react" v-model="pick" class="accent-brand" /> React</label
        >
        <em class="not-italic text-muted-foreground">→ 선택: {{ pick }}</em>
      </div>
    </DemoBox>
    <div class="key">
      체크박스는 <code>boolean</code>, 라디오/셀렉트는 선택값으로 <code>v-model</code>이 알아서
      매핑합니다. React라면 각각 <code>checked</code>/<code>value</code>를 분기해서 다뤄야 합니다.
    </div>

    <h2>이벤트 핸들링 — @click 과 이벤트 수식어</h2>
    <CompareCode :vue="s.vEvents" :react="s.reactEvents" vue-lang="vue" react-lang="tsx" />
    <DemoBox title="이벤트 수식어 .prevent / .enter">
      <div class="flex flex-wrap items-center gap-4">
        <UiButton @click="clicks++">클릭 {{ clicks }}회</UiButton>
        <span>@click="clicks++" 처럼 인라인 식도 가능</span>
      </div>
    </DemoBox>
    <div class="key">
      <strong>이벤트 수식어</strong>(<code>.prevent</code>, <code>.stop</code>,
      <code>.enter</code>, <code>.once</code>)는 React에 없는 Vue만의 편의 기능입니다.
      <code>e.preventDefault()</code>를 손으로 안 써도 됩니다.
    </div>
  </TopicPage>
</template>
