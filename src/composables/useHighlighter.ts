// shiki를 "fine-grained" 방식으로 구성한다.
// 전체 번들(shiki) 대신 실제로 쓰는 테마/언어만 import 해서 번들 크기를 줄인다.
import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

import githubLight from '@shikijs/themes/github-light'
import githubDark from '@shikijs/themes/github-dark'
import vue from '@shikijs/langs/vue'
import tsx from '@shikijs/langs/tsx'
import ts from '@shikijs/langs/typescript'
import bash from '@shikijs/langs/bash'

// 앱 전체에서 단 한 번만 생성해 공유하는 싱글톤.
let highlighterPromise: Promise<HighlighterCore> | null = null

export const SHIKI_THEMES = { light: 'github-light', dark: 'github-dark' } as const

export function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [githubLight, githubDark],
      langs: [vue, tsx, ts, bash],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })
  }
  return highlighterPromise
}
