<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { topics } from '@/data/topics'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
</script>

<template>
  <div class="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
    <!-- Sidebar: 구조적 레이아웃이라 scoped 스타일 + 토큰으로 캡슐화 -->
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <img alt="Vue logo" class="brand-logo" src="@/assets/logo.svg" width="32" height="32" />
        <div>
          <div class="brand-title">Vue 3 ↔ React</div>
          <div class="brand-sub">학습 노트</div>
        </div>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">🏠 개요 / 멘탈 모델</RouterLink>
        <span class="nav-section">TOPICS</span>
        <RouterLink v-for="t in topics" :key="t.path" :to="t.path" class="nav-link">
          <span class="nav-no">{{ String(t.no).padStart(2, '0') }}</span>
          {{ t.title }}
        </RouterLink>
      </nav>

      <div class="side-foot">
        <div class="foot-row">
          <span>테마</span>
          <ThemeToggle />
        </div>
        <p class="foot-note">React 개발자용 Vue 비교 가이드</p>
      </div>
    </aside>

    <main class="px-6 py-8 md:px-12 md:py-10" style="min-width: 0">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  border-right: 1px solid var(--border);
  background: var(--surface);
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  margin-bottom: 1.5rem;
}
.brand-logo {
  flex-shrink: 0;
}
.brand-title {
  font-weight: 700;
  color: var(--heading);
  font-size: 0.95rem;
}
.brand-sub {
  font-size: 0.75rem;
  color: var(--muted-foreground);
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
  color: var(--muted-foreground);
  margin: 1rem 0 0.4rem 0.6rem;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-radius: 7px;
  text-decoration: none;
  color: var(--foreground);
  font-size: 0.88rem;
  transition: all 0.15s;
}
.nav-link:hover {
  background: var(--surface-muted);
}
.nav-no {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--muted-foreground);
  font-variant-numeric: tabular-nums;
}
/* 현재 활성 라우트 강조 */
.nav-link.router-link-exact-active {
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: 600;
}
.nav-link.router-link-exact-active .nav-no {
  color: var(--brand);
}

.side-foot {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-top: 1rem;
}
.foot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--muted-foreground);
  margin-bottom: 0.7rem;
}
.foot-note {
  font-size: 0.72rem;
  color: var(--muted-foreground);
  opacity: 0.8;
}

@media (max-width: 767px) {
  .sidebar {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
}
</style>
