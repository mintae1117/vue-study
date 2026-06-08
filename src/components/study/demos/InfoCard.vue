<script setup lang="ts">
// 슬롯(slot) 데모용 카드. React의 children / named props 에 해당.
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border">
    <!-- named slot: React의 <Card title={...}> 처럼 특정 자리 -->
    <header class="border-b border-border bg-surface-muted px-3.5 py-2 font-semibold text-heading">
      <slot name="title">기본 제목</slot>
    </header>
    <!-- default slot: React의 {children} 에 해당 -->
    <div class="p-3.5">
      <slot />
    </div>
  </div>
</template>
