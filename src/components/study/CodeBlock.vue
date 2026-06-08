<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { getHighlighter, SHIKI_THEMES } from '@/composables/useHighlighter'

const props = withDefaults(defineProps<{ code: string; lang?: string }>(), {
  lang: 'ts',
})

const html = ref('')

// 코드/언어가 바뀔 때마다 다시 하이라이팅. (React의 useEffect([code, lang]) 격)
watchEffect(async () => {
  const highlighter = await getHighlighter()
  html.value = highlighter.codeToHtml(props.code.trim(), {
    lang: props.lang,
    themes: SHIKI_THEMES,
  })
})
</script>

<template>
  <!-- shiki가 생성한 <pre> 마크업을 그대로 주입 -->
  <div class="code-block" v-html="html" />
</template>

<style scoped>
.code-block :deep(pre.shiki) {
  margin: 0;
  padding: 1rem 1.1rem;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.55;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace;
}

/* shiki 듀얼 테마: 다크모드일 때 --shiki-dark 변수로 스왑 */
@media (prefers-color-scheme: dark) {
  .code-block :deep(pre.shiki),
  .code-block :deep(pre.shiki span) {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
  }
}
</style>
