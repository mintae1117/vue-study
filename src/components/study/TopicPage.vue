<script setup lang="ts">
// 모든 토픽 페이지가 공유하는 헤더 + 본문 레이아웃.
// 헤더는 Tailwind 유틸리티로. 본문은 .prose-content 클래스를 달아 슬롯으로 들어온
// 리치 텍스트(h2/p/strong/code/.key)에 전역 타이포그래피를 적용한다.
// (전역인 이유: ::slotted 는 최상위 슬롯 노드만 잡아 <p> 안의 <code> 등은 못 잡음 — main.css 참고)
defineProps<{ no: number; title: string; subtitle: string }>()
</script>

<template>
  <article class="max-w-[880px]">
    <header class="mb-6 flex items-center gap-4 border-b border-border pb-4">
      <span class="text-3xl font-bold tabular-nums text-brand">{{
        String(no).padStart(2, '0')
      }}</span>
      <div>
        <h1 class="text-2xl font-semibold leading-tight text-heading">{{ title }}</h1>
        <p class="text-sm text-muted-foreground">{{ subtitle }}</p>
      </div>
    </header>
    <div class="prose-content">
      <slot />
    </div>
  </article>
</template>
