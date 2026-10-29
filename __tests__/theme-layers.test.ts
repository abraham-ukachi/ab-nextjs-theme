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
* @name: Theme 0.3.5 cascade layers - Tests
* @file: __tests__/theme-layers.test.ts
* @type: Vitest
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const read = (f: string) => readFileSync(join(__dirname, '..', f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') // 🧹

describe('0.3.5: bare element rules live in @layer base (Tailwind utilities win) 🧅', () => {
  it('typography.css: every rule is inside one @layer base block', () => {
    const css = read('css/typography.css').replace(/^@import [^;]+;\s*/gm, '').trim() // 📥 font @imports must stay first
    expect(css.startsWith('@layer base {')).toBe(true) // 🧅 nothing before it
    expect(css.endsWith('}')).toBe(true)
    expect(css.match(/@layer base \{/g)).toHaveLength(1)
  })
  it('styles.css: the bare a / a:hover rules are layered too', () => {
    expect(read('css/styles.css')).toMatch(/@layer base \{\s*:where\(a\) \{[^}]*\}\s*:where\(a\):hover \{[^}]*\}\s*\}/)
  })
})

// 🔗📏 0.3.7 (Joseph): the theme must not restyle AbButton or recolour component links app-wide
describe('0.3.7: no app-wide AbButton / link overrides', () => {
  const css = read('css/styles.css') // 🎨 (comments stripped)
  it('links: zero specificity + a --ab-link-color token (any other rule wins; docs keep the primary colour)', () => {
    expect(css).toMatch(/:where\(a\) \{\s*color: var\(--ab-link-color, var\(--link-color, var\(--primary-color\)\)\);/) // 🔗
    expect(css).not.toMatch(/(^|\})\s*a(:hover)? \{/) // 🚫 no bare `a {` / `a:hover {` left anywhere
  })
  it('legacy button box metrics (18px / 32px, padding, fit-content, radius, opacity) skip .AbButton', () => {
    for (const t of ['contained', 'filled', 'outlined', 'text']) {
      const rules = [...css.matchAll(new RegExp(`([^{}]*button\\[data-type="${t}"\\][^{}]*)\\{([^}]*)\\}`, 'g'))] // 🔍 every rule naming this type
      for (const [, sel, body] of rules) {
        if (/:(hover|focus|focus-visible|active|disabled)|::/.test(sel)) continue // 🖱️ state rules + ::before state layers: colours only
        if (!/(^|;)\s*(font-size|line-height|padding|width|height|border-radius|opacity):/m.test(body)) continue // 🎨 colour / state rules may hit AbButton
        for (const part of sel.split(',').filter((x) => x.includes(`button[data-type="${t}"]`))) expect(part, `${t}: ${part.trim()}`).toMatch(/:not\(\.AbButton\)/) // 📏
      }
    }
  })
  it('AbButton still gets the colours + state layers (filled hover / focus / disabled)', () => {
    expect(css).toMatch(/button\[data-type="filled"\], a\[role="button"\]\[data-type="filled"\] \{[^}]*background: var\(--ab-button-background-color/) // 🥉
    expect(css).toMatch(/button\[data-type="filled"\]:not\(:disabled, \[aria-disabled="true"\]\):hover/) // 🖱️
  })
})
