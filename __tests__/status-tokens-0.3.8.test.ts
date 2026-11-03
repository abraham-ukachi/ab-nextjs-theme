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
* @name: Status tokens: warning + danger (0.3.8)
* @file: __tests__/status-tokens-0.3.8.test.ts
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

const css = readFileSync(join(__dirname, '..', 'css/ab-tokens.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') // 📖 no comments
// 🧱 the body of the block opened by `head`
const block = (head: string) => { const i = css.indexOf(head); expect(i, head).toBeGreaterThanOrEqual(0); return css.slice(i, css.indexOf('}', i)) }
// 🎨 a token's hex in a block
const tok = (b: string, n: string) => { const m = b.match(new RegExp(`--ab-color-${n}:\\s*(#[0-9a-f]{3,6});`)); expect(m, n).not.toBeNull(); return m![1] }
// 🧮 WCAG 2 contrast ratio of two hex colours
const lum = (hex: string) => { const h = hex.length === 4 ? hex.slice(1).split('').map((c) => c + c).join('') : hex.slice(1); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)).reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0) }
const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => p - q); return (y + 0.05) / (x + 0.05) }

// 🗂️ every scheme: its block, its page backgrounds (bg + card) and the bar (AA 4.5 / AAA 7 for high contrast)
const SCHEMES = [
  { name: 'light', head: ":root,\n.light,\n[data-theme='light'] {", bgs: ['#fff8f5', '#ffffff'], min: 4.5 },
  { name: 'dark', head: ".dark,\n[data-theme='dark'] {", bgs: ['#19120c', '#241a12'], min: 4.5 },
  { name: 'light-medium-contrast', head: '\n.light-medium-contrast {', bgs: ['#fff8f5', '#ffffff'], min: 4.5 },
  { name: 'light-high-contrast', head: '\n.light-high-contrast {', bgs: ['#fff8f5', '#ffffff'], min: 7 },
  { name: 'dark-medium-contrast', head: '\n.dark-medium-contrast {', bgs: ['#19120c', '#241a12'], min: 4.5 },
  { name: 'dark-high-contrast', head: '\n.dark-high-contrast {', bgs: ['#19120c', '#241a12'], min: 7 },
] as const

// ⚠️🛑 God (Joseph 0.2.24 docs): AbCallout warning/danger get real theme tokens, with good contrast everywhere
describe('⚠️🛑 --ab-color-warning / --ab-color-danger', () => {
  for (const s of SCHEMES) {
    describe(s.name, () => {
      const b = block(s.head) // 🧱
      for (const kind of ['warning', 'danger']) {
        it(`${kind} text on bg + card ≥ ${s.min}:1`, () => {
          for (const bg of s.bgs) expect(ratio(tok(b, kind), bg), `${kind} on ${bg}`).toBeGreaterThanOrEqual(s.min) // ♿
        })
        it(`on-${kind} on ${kind} and on-${kind}-container on ${kind}-container ≥ ${s.min}:1`, () => {
          expect(ratio(tok(b, `on-${kind}`), tok(b, kind))).toBeGreaterThanOrEqual(s.min) // ♿ a fill
          expect(ratio(tok(b, `on-${kind}-container`), tok(b, `${kind}-container`))).toBeGreaterThanOrEqual(s.min) // ♿ a soft fill
        })
      }
    })
  }
})
