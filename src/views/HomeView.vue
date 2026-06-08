<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { topics } from '@/data/topics'
</script>

<template>
  <div class="home">
    <header class="hero">
      <h1>React 개발자를 위한 <span class="accent">Vue 3</span> 학습 노트</h1>
      <p class="lead">
        이미 React를 아는 사람 입장에서 Vue 3 (Composition API)를 비교하며 익히는 인터랙티브 가이드.
        각 주제마다 <strong>개념 설명 · 라이브 데모 · Vue vs React 코드 비교</strong>가 들어 있습니다.
      </p>
    </header>

    <section class="mental-model">
      <h2>한 장 요약 — 멘탈 모델 매핑</h2>
      <div class="table">
        <div class="tr th"><span>React</span><span>Vue 3</span></div>
        <div class="tr">
          <span><code>useState</code></span><span><code>ref</code> / <code>reactive</code></span>
        </div>
        <div class="tr"><span><code>useMemo</code></span><span><code>computed</code></span></div>
        <div class="tr">
          <span><code>useEffect</code></span
          ><span><code>watch</code> / <code>watchEffect</code> / <code>onMounted</code></span>
        </div>
        <div class="tr"><span>JSX</span><span><code>&lt;template&gt;</code> + 디렉티브</span></div>
        <div class="tr"><span>controlled input</span><span><code>v-model</code></span></div>
        <div class="tr"><span>콜백 prop</span><span><code>emit</code></span></div>
        <div class="tr"><span><code>children</code></span><span><code>&lt;slot&gt;</code></span></div>
        <div class="tr"><span>Redux / Zustand</span><span>Pinia</span></div>
        <div class="tr"><span>react-router</span><span>vue-router</span></div>
      </div>
    </section>

    <section class="topics">
      <h2>학습 토픽</h2>
      <div class="cards">
        <RouterLink v-for="t in topics" :key="t.path" :to="t.path" class="card">
          <span class="card-no">{{ String(t.no).padStart(2, '0') }}</span>
          <span class="card-title">{{ t.title }}</span>
          <span class="card-summary">{{ t.summary }}</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 880px;
}
.hero h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.25;
}
.accent {
  color: hsla(160, 100%, 37%, 1);
}
.lead {
  margin-top: 0.8rem;
  font-size: 1rem;
  opacity: 0.85;
}
h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 2.2rem 0 0.8rem;
}
.table {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}
.tr {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  border-bottom: 1px solid var(--color-border);
}
.tr:last-child {
  border-bottom: 0;
}
.tr span {
  padding: 0.55rem 0.9rem;
}
.tr span:first-child {
  border-right: 1px solid var(--color-border);
}
.tr.th {
  font-weight: 600;
  background: var(--color-background-mute);
  color: var(--color-heading);
}
.tr code {
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 0.82em;
  background: var(--color-background-mute);
  padding: 1px 5px;
  border-radius: 4px;
}
.tr.th code {
  background: transparent;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.8rem;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.2s;
}
.card:hover {
  border-color: hsla(160, 100%, 37%, 1);
  background: var(--color-background-soft);
  transform: translateY(-2px);
}
.card-no {
  font-size: 0.78rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
}
.card-title {
  font-weight: 600;
  color: var(--color-heading);
}
.card-summary {
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
