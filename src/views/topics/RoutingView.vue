<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import { routing as s } from './samples'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <TopicPage :no="7" title="라우팅" subtitle="vue-router vs react-router">
    <p>
      두 라우터는 개념이 거의 1:1로 대응됩니다. 가장 큰 차이는 <strong>공식 여부</strong>입니다.
      <code>vue-router</code>는 Vue 공식 라이브러리라 표준이 하나지만, React는 <code>react-router</code>,
      TanStack Router 등 선택지가 갈립니다.
    </p>

    <div class="key">
      대응표: <code>&lt;RouterLink&gt;</code> = <code>&lt;Link&gt;</code> ·
      <code>&lt;RouterView&gt;</code> = <code>&lt;Outlet&gt;</code> · <code>useRoute()</code> =
      <code>useParams()/useLocation()</code> · <code>useRouter().push()</code> =
      <code>useNavigate()</code>
    </div>

    <h2>라우터 정의</h2>
    <CompareCode :vue="s.vueRouter" :react="s.reactRouter" vue-lang="ts" react-lang="tsx" />

    <h2>프로그래밍 방식 이동 & 현재 경로</h2>
    <CompareCode :vue="s.vueNav" :react="s.reactNav" vue-lang="ts" react-lang="tsx" />

    <DemoBox title="라이브 데모 — 현재 라우트 정보">
      <ul class="route-info">
        <li>
          <code>route.path</code> → <strong>{{ route.path }}</strong>
        </li>
        <li>
          <code>route.name</code> → <strong>{{ String(route.name) }}</strong>
        </li>
        <li>
          <code>route.fullPath</code> → <strong>{{ route.fullPath }}</strong>
        </li>
      </ul>
      <div class="row" style="margin-top: 0.8rem">
        <button class="btn" @click="router.push('/reactivity')">push('/reactivity')</button>
        <button class="btn" @click="router.back()">router.back()</button>
      </div>
      <p style="font-size: 0.82rem; opacity: 0.7; margin-top: 0.6rem">
        위 버튼은 이 앱의 사이드바와 동일하게 <code>useRouter()</code>로 코드 이동합니다.
      </p>
    </DemoBox>

    <div class="key">
      <strong>이 학습 앱 자체</strong>가 <code>vue-router</code>로 만들어졌습니다. 사이드바는
      <code>&lt;RouterLink&gt;</code>, 본문이 바뀌는 자리는 <code>&lt;RouterView&gt;</code>,
      각 토픽 페이지는 lazy import 된 라우트입니다. 코드는 <code>src/router/index.ts</code> 참고.
    </div>
  </TopicPage>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.route-info {
  margin: 0;
  padding-left: 1.1rem;
}
.route-info li {
  margin: 0.3rem 0;
}
.btn {
  border: 1px solid var(--color-border-hover);
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn:hover {
  border-color: hsla(160, 100%, 37%, 1);
  color: hsla(160, 100%, 37%, 1);
  background: transparent;
}
</style>
