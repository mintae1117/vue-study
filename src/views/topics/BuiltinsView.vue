<script setup lang="ts">
import { ref } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import KeepAliveCounter from '@/components/study/demos/KeepAliveCounter.vue'
import { builtins as s } from './samples'

const modalOpen = ref(false)
const tabShown = ref(true)
const fadeShown = ref(true)
</script>

<template>
  <TopicPage
    :no="10"
    title="내장 컴포넌트"
    subtitle="Teleport / KeepAlive / Transition / Suspense vs Portal · 라이브러리"
  >
    <p>
      React 에선 라이브러리를 깔거나(애니메이션), 아예 대응물이 없던(상태 보존 캐시) 기능들이 Vue
      에는 <strong>내장 컴포넌트</strong>로 들어 있습니다. import 없이 어느 템플릿에서나 바로 쓸 수
      있습니다.
    </p>

    <h2>&lt;Teleport&gt; — createPortal 대응</h2>
    <CompareCode :vue="s.vueTeleport" :react="s.reactPortal" />
    <DemoBox title="Teleport 라이브 데모 — 모달">
      <UiButton @click="modalOpen = true">모달 열기</UiButton>
      <p class="mt-2.5 text-[0.82rem] text-muted-foreground">
        모달은 이 카드가 아니라 <code>&lt;body&gt;</code> 직속으로 렌더됩니다 — 개발자 도구에서
        확인해 보세요. 부모의 overflow / z-index 제약에서 탈출하는 용도까지
        <code>createPortal</code> 과 동일합니다.
      </p>
      <Teleport to="body">
        <div
          v-if="modalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          @click.self="modalOpen = false"
        >
          <div class="w-80 rounded-xl border border-border bg-surface p-5 shadow-lg">
            <p class="font-semibold text-heading">body 끝에 렌더된 모달</p>
            <p class="mt-1 text-sm text-muted-foreground">
              배경을 클릭해도 닫힙니다 — <code>@click.self</code> 수식어 덕분에 모달 내부 클릭은
              무시됩니다.
            </p>
            <UiButton class="mt-4" @click="modalOpen = false">닫기</UiButton>
          </div>
        </div>
      </Teleport>
    </DemoBox>

    <h2>&lt;KeepAlive&gt; — React 에 없는 상태 보존 캐시</h2>
    <CompareCode :vue="s.vueKeepAlive" :react="s.reactKeepAlive" />
    <DemoBox title="KeepAlive 라이브 데모">
      <UiButton @click="tabShown = !tabShown">{{
        tabShown ? '두 컴포넌트 언마운트' : '다시 마운트'
      }}</UiButton>
      <div class="mt-3 space-y-2">
        <KeepAlive>
          <KeepAliveCounter v-if="tabShown" label="🟢 KeepAlive 안" />
        </KeepAlive>
        <KeepAliveCounter v-if="tabShown" label="⚪ KeepAlive 밖" />
      </div>
      <p class="mt-2.5 text-[0.82rem] text-muted-foreground">
        양쪽 count 를 올리고 언마운트 → 다시 마운트해 보세요. KeepAlive 안쪽만 count 가 살아
        있습니다. 탭 UI, "뒤로 가기 시 스크롤/입력 유지" 에 쓰입니다.
      </p>
    </DemoBox>
    <div class="key">
      KeepAlive 로 캐시된 컴포넌트는 <code>onMounted</code> 대신 <code>onActivated</code> /
      <code>onDeactivated</code> 훅으로 들락날락을 감지합니다.
    </div>

    <h2>&lt;Transition&gt; — 라이브러리 없이 enter/leave 애니메이션</h2>
    <CompareCode :vue="s.vueTransition" :react="s.reactTransition" />
    <DemoBox title="Transition 라이브 데모">
      <UiButton @click="fadeShown = !fadeShown">토글</UiButton>
      <Transition name="fade">
        <p v-if="fadeShown" class="mt-3 rounded-lg border border-border bg-surface-muted px-4 py-2">
          ✨ v-if 로 사라질 때도 부드럽게 — leave 애니메이션이 끝난 뒤 DOM 에서 제거됩니다.
        </p>
      </Transition>
    </DemoBox>
    <div class="key">
      React 에서 <code>{show && &lt;p&gt;}</code> 는 즉시 DOM 에서 사라져 leave 애니메이션이
      불가능했고, 그래서 <code>AnimatePresence</code> 같은 라이브러리가 필요했습니다. 리스트
      이동까지 애니메이션하는 <code>&lt;TransitionGroup&gt;</code> 도 내장돼 있습니다.
    </div>

    <h2>&lt;Suspense&gt; — 개념은 동일</h2>
    <CompareCode :vue="s.vueSuspense" :react="s.reactSuspense" />
    <div class="key">
      <strong>정리:</strong> <code>createPortal</code> → <code>&lt;Teleport&gt;</code> ·
      framer-motion 류 → <code>&lt;Transition&gt;</code> · 대응물 없음 →
      <code>&lt;KeepAlive&gt;</code> · <code>&lt;Suspense&gt;</code> → 동명 (단 Vue 쪽은 아직
      experimental).
    </div>
  </TopicPage>
</template>

<style scoped>
/* <Transition name="fade"> 가 자동으로 붙이는 클래스들 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
