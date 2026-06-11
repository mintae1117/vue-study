<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'

// KeepAlive 데모용: 내부 상태(count)를 가진 자식 컴포넌트.
// 보통은 언마운트되면 이 상태가 사라진다 — <KeepAlive> 로 감싸면 캐시되어 유지된다.
defineProps<{ label: string }>()
const count = ref(0)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-3">
    <span class="text-sm font-medium text-heading">{{ label }}</span>
    <UiButton size="sm" @click="count++">+1</UiButton>
    <span class="text-sm"
      >내부 count: <strong class="font-semibold text-foreground">{{ count }}</strong></span
    >
  </div>
</template>
