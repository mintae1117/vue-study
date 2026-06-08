<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'

// Vue 코드와 React 코드를 나란히 비교해서 보여주는 카드.
defineProps<{
  vue: string
  react: string
  vueLang?: string
  reactLang?: string
}>()
</script>

<template>
  <div class="compare">
    <div class="pane">
      <span class="tag tag-vue">Vue</span>
      <CodeBlock :code="vue" :lang="vueLang ?? 'vue'" />
    </div>
    <div class="pane">
      <span class="tag tag-react">React</span>
      <CodeBlock :code="react" :lang="reactLang ?? 'tsx'" />
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
}

.pane {
  min-width: 0; /* grid 셀 안에서 overflow-x 스크롤이 동작하도록 */
}

.tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 2px 9px;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}

.tag-vue {
  color: #fff;
  background: hsla(160, 100%, 37%, 1);
}

.tag-react {
  color: #fff;
  background: #61afef;
}

@media (max-width: 860px) {
  .compare {
    grid-template-columns: 1fr;
  }
}
</style>
