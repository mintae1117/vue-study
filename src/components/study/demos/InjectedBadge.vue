<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

// provide / inject 데모용: 조상이 provide('demo-user', ref) 한 값을
// 중간 props 전달 없이 직접 주입받는다. (React 의 useContext 에 해당)
// 두 번째 인자는 provide 가 없을 때의 기본값.
const user = inject<Ref<string>>('demo-user', ref('(provide 없음)'))
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-sm"
  >
    inject 결과: <strong class="font-semibold text-brand">{{ user }}</strong>
  </span>
</template>
