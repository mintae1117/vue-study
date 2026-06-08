<script setup lang="ts">
import { computed } from 'vue'

// 디자인 시스템 버튼 프리미티브.
// 기존에 7개 뷰에 중복되던 `.btn` scoped 스타일을 이 한 컴포넌트로 통합한다.
// 스타일은 전부 토큰 기반 Tailwind 유틸리티 → 라이트/다크 자동 대응.
const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'ghost'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'outline', size: 'md', type: 'button' },
)

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap ' +
  'cursor-pointer select-none transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ' +
  'focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

const sizes: Record<NonNullable<typeof props.size>, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
}

const variants: Record<NonNullable<typeof props.variant>, string> = {
  solid: 'bg-brand text-brand-contrast hover:opacity-90',
  outline: 'border border-border-strong text-foreground hover:border-brand hover:text-brand',
  ghost: 'text-foreground hover:bg-surface-muted',
}

const classes = computed(() => [base, sizes[props.size], variants[props.variant]].join(' '))
</script>

<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>
