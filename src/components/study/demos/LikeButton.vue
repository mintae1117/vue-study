<script setup lang="ts">
// 자식 → 부모로 이벤트를 올려보내는 데모 컴포넌트.
// props 로 라벨을 받고, 클릭 시 'liked' 이벤트를 emit 한다.
defineProps<{ label: string }>()
const emit = defineEmits<{ liked: [amount: number] }>()
</script>

<template>
  <button class="like-btn" @click="emit('liked', 1)">👍 {{ label }}</button>
</template>

<style scoped>
.like-btn {
  border: 1px solid var(--color-border-hover);
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}
.like-btn:hover {
  border-color: hsla(160, 100%, 37%, 1);
  color: hsla(160, 100%, 37%, 1);
}
</style>
