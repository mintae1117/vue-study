<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { getHighlighter, SHIKI_THEMES } from '@/composables/useHighlighter'

const props = withDefaults(defineProps<{ code: string; lang?: string }>(), {
  lang: 'ts',
})

const html = ref('')

// 코드/언어가 바뀔 때마다 다시 하이라이팅. (React의 useEffect([code, lang]) 격)
// shiki 결과물의 <pre class="shiki"> 스타일은 main.css 의 전역 @layer components 에 있다
// (v-html 주입이라 scoped 스타일이 닿지 않으므로 전역으로 둔다).
watchEffect(async () => {
  const highlighter = await getHighlighter()
  html.value = highlighter.codeToHtml(props.code.trim(), {
    lang: props.lang,
    themes: SHIKI_THEMES,
  })
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="html" />
</template>
