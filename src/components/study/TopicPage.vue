<script setup lang="ts">
// 모든 토픽 페이지가 공유하는 헤더 + 본문 레이아웃.
defineProps<{ no: number; title: string; subtitle: string }>()
</script>

<template>
  <article class="topic">
    <header class="topic-head">
      <span class="no">{{ String(no).padStart(2, '0') }}</span>
      <div>
        <h1>{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
    </header>
    <div class="topic-body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.topic {
  max-width: 880px;
}

.topic-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.no {
  font-size: 2rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  font-variant-numeric: tabular-nums;
}

h1 {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-heading);
  line-height: 1.2;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.75;
}

.topic-body :slotted(h2) {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 2rem 0 0.6rem;
}

.topic-body :slotted(p) {
  margin: 0.6rem 0;
}

.topic-body :slotted(ul) {
  margin: 0.6rem 0;
  padding-left: 1.2rem;
}

.topic-body :slotted(li) {
  margin: 0.3rem 0;
}

.topic-body :slotted(code) {
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 0.85em;
  background: var(--color-background-mute);
  padding: 1px 5px;
  border-radius: 4px;
}

.topic-body :slotted(.key) {
  border-left: 3px solid hsla(160, 100%, 37%, 1);
  background: var(--color-background-soft);
  padding: 0.8rem 1rem;
  border-radius: 0 8px 8px 0;
  margin: 1rem 0;
}
</style>
