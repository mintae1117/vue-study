<script setup lang="ts">
import { useTheme, type ThemeMode } from '@/composables/useTheme'

const { mode, setMode } = useTheme()

const options: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
  { value: 'system', label: '시스템' },
]
</script>

<template>
  <!-- 3-way 세그먼트 컨트롤: light / dark / system -->
  <div
    class="inline-flex items-center gap-0.5 rounded-lg border border-border bg-surface-muted p-0.5"
    role="radiogroup"
    aria-label="테마 선택"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      role="radio"
      :aria-checked="mode === opt.value"
      :title="opt.label"
      class="flex h-7 w-8 items-center justify-center rounded-md transition-colors"
      :class="
        mode === opt.value
          ? 'bg-background text-brand shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      "
      @click="setMode(opt.value)"
    >
      <!-- light: sun -->
      <svg
        v-if="opt.value === 'light'"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
      </svg>
      <!-- dark: moon -->
      <svg
        v-else-if="opt.value === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <!-- system: monitor -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    </button>
  </div>
</template>
