<script setup lang="ts">
import { ref } from 'vue'
import TopicPage from '@/components/study/TopicPage.vue'
import CompareCode from '@/components/study/CompareCode.vue'
import DemoBox from '@/components/study/DemoBox.vue'
import LikeButton from '@/components/study/demos/LikeButton.vue'
import InfoCard from '@/components/study/demos/InfoCard.vue'
import { components as s } from './samples'

const total = ref(0)
</script>

<template>
  <TopicPage :no="5" title="컴포넌트 통신" subtitle="props / emit / slots vs props / children">
    <p>
      데이터를 부모→자식으로 내릴 때는 양쪽 다 <strong>props</strong>로 같습니다. 차이는
      <strong>자식→부모</strong> 방향입니다. React는 콜백 함수를 prop으로 넘겨 호출하지만, Vue는
      전용 <code>emit</code> 메커니즘이 있습니다. "props는 내려가고 이벤트는 올라간다"는 단방향 원칙은
      동일합니다.
    </p>

    <h2>이벤트 — defineEmits vs 콜백 prop</h2>
    <CompareCode :vue="s.vueProps" :react="s.reactProps" vue-lang="vue" react-lang="tsx" />
    <DemoBox title="emit 라이브 데모">
      <div class="row">
        <LikeButton label="좋아요 누르기" @liked="total++" />
        <span
          >자식이 올려보낸 누적 좋아요: <strong>{{ total }}</strong></span
        >
      </div>
      <p style="font-size: 0.82rem; opacity: 0.7; margin-top: 0.6rem">
        자식 <code>LikeButton</code>이 <code>emit('liked', 1)</code> → 부모가
        <code>@liked="total++"</code>로 수신
      </p>
    </DemoBox>

    <h2>슬롯(slot) vs children</h2>
    <p>
      Vue의 <strong>슬롯</strong>은 React의 <code>children</code>과 같은 개념이지만 더 풍부합니다.
      <strong>named slot</strong>으로 여러 구멍을 만들 수 있고(React에선 보통 마크업을 prop으로 넘겨야
      함), scoped slot으로 자식의 데이터를 부모 템플릿에 노출할 수도 있습니다(React의 render props에
      대응).
    </p>
    <CompareCode :vue="s.vueSlot" :react="s.reactChildren" vue-lang="vue" react-lang="tsx" />
    <DemoBox title="slot 라이브 데모">
      <InfoCard>
        <template #title>📌 신혼여행 메모</template>
        <p style="margin: 0">
          이 카드의 제목은 <code>#title</code> 슬롯, 이 문장은 default 슬롯으로 들어왔습니다.
        </p>
      </InfoCard>
    </DemoBox>
    <div class="key">
      <strong>정리:</strong> props ↓ (동일) · 이벤트 ↑ (Vue=emit / React=콜백) · 마크업 주입
      (Vue=slot / React=children). 멘탈 모델은 같고 문법만 다릅니다.
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
</style>
