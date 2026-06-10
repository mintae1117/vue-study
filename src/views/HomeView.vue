<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { topics } from '@/data/topics'

const mapping: { react: string; vue: string }[] = [
  { react: 'useState', vue: 'ref / reactive' },
  { react: 'useMemo', vue: 'computed' },
  { react: 'useEffect', vue: 'watch / watchEffect / onMounted' },
  { react: 'JSX', vue: '<template> + 디렉티브' },
  { react: 'controlled input', vue: 'v-model' },
  { react: '콜백 prop', vue: 'emit' },
  { react: 'children', vue: '<slot>' },
  { react: 'Redux / Zustand', vue: 'Pinia' },
  { react: 'react-router', vue: 'vue-router' },
]
</script>

<template>
  <div class="max-w-220">
    <header>
      <h1 class="text-3xl font-bold leading-tight text-heading">
        React 개발자를 위한 <span class="text-brand">Vue 3</span> 학습 노트
      </h1>
      <p class="mt-3 text-base text-muted-foreground">
        이미 React를 아는 사람 입장에서 Vue 3 (Composition API)를 비교하며 익히는 인터랙티브 가이드.
        각 주제마다
        <strong class="font-semibold text-foreground"
          >개념 설명 · 라이브 데모 · Vue vs React 코드 비교</strong
        >가 들어 있습니다.
      </p>
    </header>

    <section>
      <h2 class="mb-3 mt-9 text-xl font-semibold text-heading">한 장 요약 — 멘탈 모델 매핑</h2>
      <div class="overflow-hidden rounded-lg border border-border">
        <div class="grid grid-cols-[1fr_1.4fr] bg-surface-muted font-semibold text-heading">
          <span class="border-r border-border px-3.5 py-2.5">React</span>
          <span class="px-3.5 py-2.5">Vue 3</span>
        </div>
        <div
          v-for="(m, i) in mapping"
          :key="m.react"
          class="grid grid-cols-[1fr_1.4fr]"
          :class="i < mapping.length - 1 ? 'border-b border-border' : ''"
        >
          <span class="border-r border-border px-3.5 py-2"
            ><code class="rounded bg-surface-muted px-1.5 py-px font-mono text-[0.82em]">{{
              m.react
            }}</code></span
          >
          <span class="px-3.5 py-2 text-foreground">{{ m.vue }}</span>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-3 mt-9 text-xl font-semibold text-heading">학습 토픽</h2>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
        <RouterLink
          v-for="t in topics"
          :key="t.path"
          :to="t.path"
          class="group flex flex-col gap-1 rounded-xl border border-border p-4 no-underline transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-surface"
        >
          <span class="text-xs font-bold text-brand">{{ String(t.no).padStart(2, '0') }}</span>
          <span class="font-semibold text-heading">{{ t.title }}</span>
          <span class="text-xs text-muted-foreground">{{ t.summary }}</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
