<script setup lang="ts">
// 슬롯(slot) 데모용 카드. React의 children / named props 에 해당.
</script>

<template>
  <div class="info-card">
    <!-- named slot: React의 <Card title={...}> 처럼 특정 자리 -->
    <header class="ic-head">
      <slot name="title">기본 제목</slot>
    </header>
    <!-- default slot: React의 {children} 에 해당 -->
    <div class="ic-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.info-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}
.ic-head {
  padding: 0.5rem 0.9rem;
  background: var(--color-background-mute);
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}
.ic-body {
  padding: 0.9rem;
}
</style>
