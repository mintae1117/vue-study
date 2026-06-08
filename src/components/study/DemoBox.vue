<script setup lang="ts">
// 라이브 데모(실제로 동작하는 Vue 예제)를 감싸는 카드.
defineProps<{ title?: string }>()
</script>

<template>
  <div class="demo">
    <div class="demo-head">
      <span class="dot" />
      <span class="label">{{ title ?? '라이브 데모' }}</span>
    </div>
    <div class="demo-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.demo {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
  background: var(--color-background-soft);
}

.demo-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-mute);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 0 3px hsla(160, 100%, 37%, 0.2);
}

.label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
}

.demo-body {
  padding: 1.2rem;
}
</style>
