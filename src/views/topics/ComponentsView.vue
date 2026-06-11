<script setup lang="ts">
import { provide, ref } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import LikeButton from '@/components/study/demos/LikeButton.vue'
import InfoCard from '@/components/study/demos/InfoCard.vue'
import InjectedBadge from '@/components/study/demos/InjectedBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { components as s } from './samples'

const total = ref(0)

// defineModel 데모용 — UiInput(defineModel 사용)과 양방향으로 묶인다
const msg = ref('')

// provide/inject 데모용 — ref 를 그대로 provide 하면 자손에서도 반응형 유지
const userName = ref('민태')
provide('demo-user', userName)
</script>

<template>
  <TopicPage :no="5" title="컴포넌트 통신" subtitle="props / emit / slots vs props / children">
    <p>
      데이터를 부모→자식으로 내릴 때는 양쪽 다 <strong>props</strong>로 같습니다. 차이는
      <strong>자식→부모</strong> 방향입니다. React는 콜백 함수를 prop으로 넘겨 호출하지만, Vue는
      전용 <code>emit</code> 메커니즘이 있습니다. "props는 내려가고 이벤트는 올라간다"는 단방향
      원칙은 동일합니다.
    </p>

    <h2>이벤트 — defineEmits vs 콜백 prop</h2>
    <CompareCode :vue="s.vueProps" :react="s.reactProps" vue-lang="vue" react-lang="tsx" />
    <DemoBox title="emit 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <LikeButton label="좋아요 누르기" @liked="total++" />
        <span
          >자식이 올려보낸 누적 좋아요:
          <strong class="font-semibold text-foreground">{{ total }}</strong></span
        >
      </div>
      <p class="mt-2.5 text-[0.82rem] text-muted-foreground">
        자식 <code>LikeButton</code>이 <code>emit('liked', 1)</code> → 부모가
        <code>@liked="total++"</code>로 수신
      </p>
    </DemoBox>

    <h2>슬롯(slot) vs children</h2>
    <p>
      Vue의 <strong>슬롯</strong>은 React의 <code>children</code>과 같은 개념이지만 더 풍부합니다.
      <strong>named slot</strong>으로 여러 구멍을 만들 수 있고(React에선 보통 마크업을 prop으로
      넘겨야 함), scoped slot으로 자식의 데이터를 부모 템플릿에 노출할 수도 있습니다(React의 render
      props에 대응).
    </p>
    <CompareCode :vue="s.vueSlot" :react="s.reactChildren" vue-lang="vue" react-lang="tsx" />
    <DemoBox title="slot 라이브 데모">
      <InfoCard>
        <template #title>📌 신혼여행 메모</template>
        <p class="m-0">
          이 카드의 제목은 <code>#title</code> 슬롯, 이 문장은 default 슬롯으로 들어왔습니다.
        </p>
      </InfoCard>
    </DemoBox>
    <div class="key">
      <strong>정리:</strong> props ↓ (동일) · 이벤트 ↑ (Vue=emit / React=콜백) · 마크업 주입
      (Vue=slot / React=children). 멘탈 모델은 같고 문법만 다릅니다.
    </div>

    <h2>defineModel — 부모와 양방향 바인딩 (Vue 3.4+)</h2>
    <p>
      props ↓ + emit ↑ 을 합친 것이 컴포넌트 <code>v-model</code> 입니다. 자식은
      <code>defineModel()</code> 한 줄이면 끝 — React 에서 <code>value</code> +
      <code>onChange</code> prop 쌍을 매번 정의하던 패턴의 압축판입니다.
    </p>
    <CompareCode
      :vue="s.vueDefineModel"
      :react="s.reactDefineModel"
      vue-lang="vue"
      react-lang="tsx"
    />
    <DemoBox title="defineModel 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <UiInput v-model="msg" class="max-w-xs" placeholder="부모 ↔ 자식 양방향" />
        <span
          >부모의 msg =
          <strong class="font-semibold text-foreground">{{ msg || '(비어있음)' }}</strong></span
        >
      </div>
      <p class="mt-2.5 text-[0.82rem] text-muted-foreground">
        이 인풋이 바로 <code>defineModel</code> 한 줄로 v-model 을 받는 실제 컴포넌트입니다 —
        <code>src/components/ui/UiInput.vue</code> 참고.
      </p>
    </DemoBox>

    <h2>provide / inject — Context API 대응</h2>
    <p>
      prop drilling 을 피하는 수단도 양쪽에 다 있습니다. React 는
      <strong>Provider 로 트리를 감싸고</strong> <code>useContext</code> 로 꺼내지만, Vue 는 조상이
      setup 에서 <code>provide()</code> 를 호출하면 모든 자손이 <code>inject()</code> 로 받습니다 —
      감싸는 컴포넌트가 없습니다. 다만 전역 상태라면 Pinia 가 있어서, React 보다 사용 빈도는
      낮습니다(주로 컴포넌트 라이브러리 내부용).
    </p>
    <CompareCode :vue="s.vueProvide" :react="s.reactContext" vue-lang="ts" react-lang="tsx" />
    <DemoBox title="provide / inject 라이브 데모">
      <div class="flex flex-wrap items-center gap-4">
        <UiInput v-model="userName" class="max-w-xs" placeholder="provide 되는 값" />
        <InjectedBadge />
      </div>
      <p class="mt-2.5 text-[0.82rem] text-muted-foreground">
        이 페이지가 <code>provide('demo-user', userName)</code> 한 ref 를, 자손
        <code>InjectedBadge</code> 가 props 없이 <code>inject</code> 로 받습니다. ref 를 그대로
        provide 했기 때문에 입력 즉시 반영됩니다.
      </p>
    </DemoBox>
  </TopicPage>
</template>
