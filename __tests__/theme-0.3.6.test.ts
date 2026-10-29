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
* @name: Theme 0.3.6 gapped light panes - Tests
* @file: __tests__/theme-0.3.6.test.ts
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
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'css/ab-tokens.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') // 🧹 no comments

describe('gapped light panes (mock 05 .gapped) 🖥️', () => {
  const m = /@media \(width >= 1920px\) \{\s*:root,\s*\.light,\s*\[data-theme='light'\] \{([^}]*)\}\s*\}/.exec(css) // 🔍
  it('≥ 1920px light: --ab-color-pane-main #fff and --ab-color-card #fffcfa', () => {
    expect(m, 'the gapped light block').not.toBeNull()
    expect(m![1]).toMatch(/--ab-color-pane-main: #fff;/) // 📄
    expect(m![1]).toMatch(/--ab-color-card: #fffcfa;/) // 🃏
  })
  it('sits before the dark block, so .dark still wins (same specificity, later)', () => {
    expect(css.indexOf('@media (width >= 1920px)')).toBeLessThan(css.indexOf('.dark,\n[data-theme=\'dark\']')) // 🌙
  })
  it('--ab-breakpoint-gapped stays 1920px (the same edge core uses)', () => {
    expect(css).toMatch(/--ab-breakpoint-gapped: 1920px;/) // 📐
  })
})

describe('--ab-color-pane (sidebar + aside panes) 🪟', () => {
  it('only the gapped light block sets it (#fff); not in the base light block', () => {
    const m = /@media \(width >= 1920px\) \{\s*:root,\s*\.light,\s*\[data-theme='light'\] \{([^}]*)\}/.exec(css)! // 🔍
    expect(m[1]).toMatch(/--ab-color-pane: #fff;/) // 🪟
    expect(css.match(/--ab-color-pane:/g)).toHaveLength(3) // 🎯 gapped light + the dark unset + 0.3.7 [data-ab-surface='page'] opt-out
  })
  it('dark unsets it with `initial`, so core falls back to today\'s dark colours', () => {
    const dark = /\.dark,\s*\[data-theme='dark'\] \{([^}]*)\}/.exec(css)![1] // 🌙
    expect(dark).toMatch(/--ab-color-pane: initial;/)
  })
})

// 🛡️ James P2 (round 3): --ab-color-accent (#a67c52 light) is a decoration colour (rings, dots), never text: it fails AA
describe('guard: --ab-color-accent is never a text colour', () => {
  const files = ['ab-tokens.css', 'colors.css', 'dark-hc.css', 'dark-mc.css', 'dark.css', 'light-hc.css', 'light-mc.css', 'light.css', 'styles.css', 'typography.css']
  for (const f of files) {
    it(`${f}: no color / text token reads var(--ab-color-accent)`, () => {
      const src = readFileSync(join(root, 'css', f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') // 🧹
      expect(src).not.toMatch(/(?:^|[;{\s])color:\s*var\(--ab-color-accent[,)]/m) // 🚫 color: var(--ab-color-accent)
      expect(src).not.toMatch(/--[\w-]*(?:text|fg|foreground)[\w-]*:\s*var\(--ab-color-accent[,)]/) // 🚫 a text token aliased to it
    })
  }
  it('the text-safe partner --ab-color-accent-text is still defined (light + dark)', () => {
    expect(css.match(/--ab-color-accent-text:/g)?.length).toBeGreaterThanOrEqual(2) // 🖋️
  })
})
