<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { routing as s } from './samples'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <TopicPage :no="7" title="라우팅" subtitle="vue-router vs react-router">
    <p>
      두 라우터는 개념이 거의 1:1로 대응됩니다. 가장 큰 차이는 <strong>공식 여부</strong>입니다.
      <code>vue-router</code>는 Vue 공식 라이브러리라 표준이 하나지만, React는
      <code>react-router</code>, TanStack Router 등 선택지가 갈립니다.
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

    <h2>Navigation Guard — react-router 에 없는 전역 가드</h2>
    <p>
      로그인 보호 같은 "이동 가로채기"가 vue-router 에는 <strong>1급 기능</strong>으로 있습니다.
      <code>router.beforeEach</code> 한 곳에서 모든 이동을 검사하고, 라우트에는 <code>meta</code> 만
      달면 됩니다. react-router 는 래퍼 컴포넌트나 loader 패턴으로 라우트마다 처리해야 했던
      일입니다.
    </p>
    <CompareCode :vue="s.vueGuard" :react="s.reactGuard" vue-lang="ts" react-lang="tsx" />
    <div class="key">
      가드는 전역(<code>beforeEach</code>) 외에 라우트별(<code>beforeEnter</code>), 컴포넌트별(<code
        >onBeforeRouteLeave</code
      >
      — "저장 안 하고 나가시겠어요?" 용)로도 걸 수 있습니다. 이 앱의 <code>router/index.ts</code> 에
      있는 <code>scrollBehavior</code>(이동 시 스크롤 맨 위로)도 react-router 라면 직접 구현했어야
      할 내장 기능입니다.
    </div>

    <DemoBox title="라이브 데모 — 현재 라우트 정보">
      <ul class="list-disc space-y-1 pl-[1.1rem]">
        <li>
          <code>route.path</code> →
          <strong class="font-semibold text-foreground">{{ route.path }}</strong>
        </li>
        <li>
          <code>route.name</code> →
          <strong class="font-semibold text-foreground">{{ String(route.name) }}</strong>
        </li>
        <li>
          <code>route.fullPath</code> →
          <strong class="font-semibold text-foreground">{{ route.fullPath }}</strong>
        </li>
      </ul>
      <div class="mt-3 flex flex-wrap items-center gap-4">
        <UiButton @click="router.push('/reactivity')">push('/reactivity')</UiButton>
        <UiButton @click="router.back()">router.back()</UiButton>
      </div>
      <p class="mt-2.5 text-[0.82rem] text-muted-foreground">
        위 버튼은 이 앱의 사이드바와 동일하게 <code>useRouter()</code>로 코드 이동합니다.
      </p>
    </DemoBox>

    <div class="key">
      <strong>이 학습 앱 자체</strong>가 <code>vue-router</code>로 만들어졌습니다. 사이드바는
      <code>&lt;RouterLink&gt;</code>, 본문이 바뀌는 자리는 <code>&lt;RouterView&gt;</code>, 각 토픽
      페이지는 lazy import 된 라우트입니다. 코드는 <code>src/router/index.ts</code> 참고.
    </div>
  </TopicPage>
</template>
