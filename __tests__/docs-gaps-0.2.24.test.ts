/* 
* @license MIT
* ~~~~~~~~~~~~
* ab-nextjs-theme
* ~~~~~~~~~~~~ 
* Copyright (c) 2026 Abraham Ukachi. The abElements Project.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the 'Software'), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions: 
*  
* The above copyright notice and this permission notice shall be included in all 
* copies or substantial portions of the Software. 
*
* THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* @project: ab-nextjs-theme
* @name: Joseph 0.2.24 docs gaps (prose size, mono, lists, inline code)
* @file: __tests__/docs-gaps-0.2.24.test.ts
* @type: Vitest
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


// 🧪 vitest
import { describe, expect, it } from 'vitest'
// 📁 fs + path
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '') // 🧹 comments out
const read = (p: string) => strip(readFileSync(join(__dirname, '..', p), 'utf8')) // 📖
const typo = read('css/typography.css') // 🔤
const prose = read('css/prose.css') // 📄

// ⌨️ gap 2: the base font-family rule must not reach code / pre / Shiki spans
describe('⌨️ gap 2: mono font survives inside code', () => {
  it('base font-family rule skips code, pre, kbd + samp descendants', () => {
    expect(typo).toContain(':is(body, h1, h2, h3, p, button, span, input, textarea):not(:where(code *, pre *, kbd *, samp *))') // 🎯
  })
  it('no bare `span` font-family selector is left', () => {
    expect(typo).not.toMatch(/(^|\n)body, h1, h2, h3, p, button, span, input, textarea \{/) // 🚫
  })
})

// 🔠 gap 1: the base `body, p { font-size: 24px }` must not reach .ab-prose text
describe('🔠 gap 1: .ab-prose text re-inherits its size', () => {
  it('p, li, span + table cells inherit font-size + line-height from .ab-prose', () => {
    const rule = prose.match(/\.ab-prose :where\(p, li, span[^)]*\):not\(:where\(\.ab-prose-none \*\)\) \{([^}]*)\}/) // 🔍
    expect(rule, 'rule present').not.toBeNull()
    expect(rule![1]).toContain('font-size: inherit') // 🔠
    expect(rule![1]).toContain('line-height: inherit') // ↕️
  })
  it('.ab-prose still sets its own 16px default size', () => {
    expect(prose).toContain('font-size: var(--ab-prose-font-size, 16px)') // 📏
  })
  it('consumers outside .ab-prose keep the base 24px wide-layout size', () => {
    expect(typo).toMatch(/body, p \{\s*font-size: 24px/) // 🧱 untouched
  })
})

// 🔘 gap 5: .ab-prose lists show their markers again
describe('🔘 gap 5: .ab-prose list markers', () => {
  it('ul gets disc, ol gets decimal, both keep their start padding', () => {
    expect(prose).toMatch(/\.ab-prose :where\(ul\):not\(:where\(\.ab-prose-none \*\)\) \{ list-style-type: disc; \}/) // ⚫
    expect(prose).toMatch(/\.ab-prose :where\(ol\):not\(:where\(\.ab-prose-none \*\)\) \{ list-style-type: decimal; \}/) // 🔢
    expect(prose).toContain('padding-inline-start: 1.5em') // ↔️
  })
})

// 🌓 gap 6: inline code uses the scheme-aware surface pair
describe('🌓 gap 6: .ab-prose inline code contrast', () => {
  const rule = prose.match(/\.ab-prose :where\(:not\(pre\) > code\):not\(:where\(\.ab-prose-none \*\)\) \{([^}]*)\}/)![1] // 🔍
  it('background is surface-container, text is on-surface', () => {
    expect(rule).toContain('background: var(--ab-color-surface-container') // 🎨
    expect(rule).toContain('color: var(--ab-color-on-surface') // 🖋️
  })
  it('no longer uses card2 or the code-text token', () => {
    expect(rule).not.toContain('--ab-color-card2') // 🚫
    expect(rule).not.toContain('--ab-color-code-text') // 🚫
  })
  it('every scheme file defines both M3 tokens', () => {
    for (const f of ['light', 'light-mc', 'light-hc', 'dark', 'dark-mc', 'dark-hc']) {
      const c = read(`css/${f}.css`) // 🎨
      expect(c, f).toContain('--md-sys-color-surface-container:') // ✅
      expect(c, f).toContain('--md-sys-color-on-surface:') // ✅
    }
  })
})
