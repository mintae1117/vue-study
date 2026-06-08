<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'

// 자식 → 부모로 이벤트를 올려보내는 데모 컴포넌트.
// props 로 라벨을 받고, 클릭 시 'liked' 이벤트를 emit 한다.
defineProps<{ label: string }>()
const emit = defineEmits<{ liked: [amount: number] }>()
</script>

<template>
  <UiButton @click="emit('liked', 1)">👍 {{ label }}</UiButton>
</template>
