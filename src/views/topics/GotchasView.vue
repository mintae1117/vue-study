<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { gotchas as s } from './samples'

// --- 라이브 데모용 상태 ---
const profile = reactive({ likes: 0 })

// ❌ 일부러 만든 함정: setup 시점 값(0)이 복사된 그냥 number — 영원히 0
const { likes: brokenLikes } = profile

// ✅ toRefs: ref 로 변환되어 원본과 연결 유지
const { likes } = toRefs(profile)
</script>

<template>
  <TopicPage
    :no="8"
    title="반응성 함정 (Losing Reactivity)"
    subtitle="React 에서 안전했던 습관이 Vue 에선 버그가 되는 지점들"
  >
    <p>
      React 는 상태가 바뀌면 <strong>컴포넌트 함수가 통째로 재실행</strong>되므로 구조분해도, 값
      전달도 늘 안전했습니다. Vue 의 <code>setup</code> 은 <strong>딱 1회만 실행</strong>되고 그
      뒤로는 반응형 연결(Proxy / ref)에 의존하기 때문에, <strong>연결을 끊는 순간</strong> 화면이
      멈춥니다. React 개발자가 가장 많이 당하는 패턴 4가지입니다.
    </p>

    <h2>① reactive 구조분해 — 끊김 (toRefs 로 해결)</h2>
    <CompareCode
      :vue="s.destructureVue"
      :react="s.destructureReact"
      vue-lang="ts"
      react-lang="tsx"
    />
    <DemoBox title="구조분해 함정 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <UiButton @click="profile.likes++">profile.likes++</UiButton>
        <span
          >원본 profile.likes =
          <strong class="font-semibold text-foreground">{{ profile.likes }}</strong></span
        >
      </div>
      <ul class="mt-3 list-disc space-y-1 pl-5">
        <li>
          ❌ <code>const { likes } = profile</code> →
          <strong class="font-semibold text-foreground">{{ brokenLikes }}</strong> (setup 때 복사된
          0 에서 멈춤)
        </li>
        <li>
          ✅ <code>const { likes } = toRefs(profile)</code> →
          <strong class="font-semibold text-foreground">{{ likes }}</strong> (원본을 계속 따라옴)
        </li>
      </ul>
    </DemoBox>
    <div class="key">
      06 상태관리에서 본 <code>storeToRefs(store)</code> 가 바로 이 원칙의 Pinia 버전입니다. Pinia
      store 도 reactive 객체라서 같은 함정이 적용됩니다.
    </div>

    <h2>② props 구조분해 — Vue 3.5 부터는 OK</h2>
    <p>
      React 의 <code>function C({ label })</code> 손버릇 그대로
      <code>const { label } = defineProps()</code> 를 쓰면, Vue 3.4 이하에선 반응성이 끊겼습니다.
      <strong>이 프로젝트가 쓰는 Vue 3.5+ 에선 컴파일러가 처리해 줘서 안전</strong>합니다.
    </p>
    <CompareCode :vue="s.propsVue" :react="s.propsReact" vue-lang="vue" react-lang="tsx" />
    <div class="key">
      <strong>단:</strong> 구조분해한 prop 을 <code>watch(label, ...)</code> 처럼 직접 넘기는 건
      여전히 안 됩니다. <code>watch(() =&gt; label, ...)</code> 처럼 getter 로 감싸세요. 또 props 는
      양쪽 모두 <strong>읽기 전용</strong> — 자식이 고치고 싶으면 emit(React 라면 콜백)으로
      올려보냅니다.
    </div>

    <h2>③ reactive 통째로 재할당 — 끊김 (ref 가 기본 권장인 이유)</h2>
    <CompareCode :vue="s.reassignVue" :react="s.reassignReact" vue-lang="ts" react-lang="ts" />
    <div class="key">
      <code>reactive</code> 는 "그 객체"에 대한 Proxy 라서 변수에 다른 객체를 다시 넣으면 템플릿과의
      연결이 사라집니다. <strong>통째로 교체할 일이 있는 값은 <code>ref</code> 로</strong> — 공식
      가이드도 <code>ref</code> 를 기본으로 권장합니다.
    </div>

    <h2>④ 함수에 .value 를 넘기기 — 그 순간 그냥 숫자</h2>
    <CompareCode :vue="s.passValueVue" :react="s.passValueReact" vue-lang="ts" react-lang="ts" />
    <div class="key">
      <strong>요약 규칙:</strong> 반응형 값을 어딘가로 "옮길" 때는 항상
      <strong>컨테이너(ref) 또는 getter 째로</strong> 옮기세요. 알맹이(<code>.value</code>, 구조분해
      값)만 꺼내 옮기면 그 시점의 스냅샷일 뿐입니다. <code>watch</code> 에서 같은 이유로 생기는
      함정은 04 생명주기 페이지를 참고하세요.
    </div>
  </TopicPage>
</template>
