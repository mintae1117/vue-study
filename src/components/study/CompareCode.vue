<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'

// Vue 코드와 React 코드를 나란히 비교해서 보여주는 카드.
// 레이아웃은 Tailwind 유틸리티, 색상은 디자인 토큰(brand)으로.
defineProps<{
  vue: string
  react: string
  vueLang?: string
  reactLang?: string
}>()
</script>

<template>
  <div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="min-w-0">
      <span
        class="mb-2 inline-block rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-brand-contrast"
        >Vue</span
      >
      <CodeBlock :code="vue" :lang="vueLang ?? 'vue'" />
    </div>
    <div class="min-w-0">
      <span
        class="mb-2 inline-block rounded-full bg-[#61afef] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#0a0a0a]"
        >React</span
      >
      <CodeBlock :code="react" :lang="reactLang ?? 'tsx'" />
    </div>
  </div>
</template>
