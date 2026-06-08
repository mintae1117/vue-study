<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { topics } from '@/data/topics'
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <img alt="Vue logo" class="brand-logo" src="@/assets/logo.svg" width="32" height="32" />
        <div>
          <div class="brand-title">Vue 3 ↔ React</div>
          <div class="brand-sub">학습 노트</div>
        </div>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link home-link">🏠 개요 / 멘탈 모델</RouterLink>
        <span class="nav-section">TOPICS</span>
        <RouterLink v-for="t in topics" :key="t.path" :to="t.path" class="nav-link">
          <span class="nav-no">{{ String(t.no).padStart(2, '0') }}</span>
          {{ t.title }}
        </RouterLink>
      </nav>

      <footer class="side-foot">React 개발자용 Vue 비교 가이드</footer>
    </aside>

    <main class="content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  border-right: 1px solid var(--color-border);
  background: var(--color-background-soft);
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  padding: 0;
  margin-bottom: 1.5rem;
}
.brand:hover {
  background: transparent;
}
.brand-logo {
  flex-shrink: 0;
}
.brand-title {
  font-weight: 700;
  color: var(--color-heading);
  font-size: 0.95rem;
}
.brand-sub {
  font-size: 0.75rem;
  opacity: 0.65;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
}
.nav-section {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  opacity: 0.5;
  margin: 1rem 0 0.4rem 0.6rem;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-radius: 7px;
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.88rem;
  transition: all 0.15s;
}
.nav-link:hover {
  background: var(--color-background-mute);
}
.nav-no {
  font-size: 0.72rem;
  font-weight: 700;
  opacity: 0.5;
  font-variant-numeric: tabular-nums;
}
/* 현재 활성 라우트 강조 */
.nav-link.router-link-exact-active {
  background: hsla(160, 100%, 37%, 0.12);
  color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
}
.nav-link.router-link-exact-active .nav-no {
  color: hsla(160, 100%, 37%, 1);
  opacity: 1;
}

.side-foot {
  font-size: 0.72rem;
  opacity: 0.5;
  padding: 1rem 0.6rem 0;
  border-top: 1px solid var(--color-border);
  margin-top: 1rem;
}

.content {
  padding: 2.5rem 3rem;
  min-width: 0;
}

@media (max-width: 760px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }
  .content {
    padding: 1.5rem 1.2rem;
  }
}
</style>
