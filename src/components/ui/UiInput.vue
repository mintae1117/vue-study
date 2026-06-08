<script setup lang="ts">
// 디자인 시스템 인풋 프리미티브.
// defineModel 로 v-model 을 그대로 지원하고(=Vue 3.4+ 양방향 바인딩),
// placeholder / @keyup.enter 등 나머지 속성·리스너는 단일 루트라 자동 fallthrough 된다.
const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"
    class="h-9 w-full rounded-md border border-border-strong bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  />
</template>
