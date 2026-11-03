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
* @name: .ab-prose MDX typography (0.3.8)
* @file: __tests__/prose-0.3.8.test.ts
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

const read = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8') // 📖
const raw = read('css/prose.css') // 📄 the stylesheet
const css = raw.replace(/\/\*[\s\S]*?\*\//g, '') // 🧹 comments stripped
const pkg = JSON.parse(read('package.json')) // 📦

// 📄 Joseph (0.2.24 MDX docs): one class styles long-form MDX with theme tokens
describe('📄 .ab-prose', () => {
  it('is imported by both entry stylesheets and shipped (css/ is in files)', () => {
    for (const entry of ['index.css', 'styles.css']) expect(read(entry), entry).toContain("@import './css/prose.css';") // 🔗
    expect(pkg.files).toContain('css') // 📦
  })
  it('lives in @layer components, so utilities + component classes win', () => {
    expect(css.trim().startsWith('@layer components {')).toBe(true) // 🧅
  })
  for (const el of ['h1', 'h2', 'h3', 'p', 'ul, ol', 'li', 'a', ':not(pre) > code', 'pre', 'blockquote', 'table', 'th, td', 'hr']) {
    it(`styles ${el} with zero-specificity :where()`, () => expect(css).toContain(`.ab-prose :where(${el})`)) // 🎯
  }
  it('uses theme tokens only (every colour is a var(--ab-*) with a fallback)', () => {
    for (const m of css.matchAll(/(?:^|[\s;{])(color|background|border|border-(?:top|bottom|inline-start)(?:-color)?):\s*([^;]+);/g)) {
      if (/^(0|none|inherit|transparent)$/.test(m[2].trim()) || /^1px solid var\(--ab-|^3px solid var\(--ab-/.test(m[2].trim())) continue // ✅ keywords / token borders
      expect(m[2], m[0]).toMatch(/var\(--ab-/) // 🎨 a token
    }
  })
  it('links are underlined (not colour alone) and have a focus ring', () => {
    expect(css).toMatch(/:where\(a\)[^{]*\{[^}]*text-decoration: underline/) // ➖ WCAG 1.4.1
    expect(css).toMatch(/:where\(a\)[^{]*:focus-visible \{[^}]*outline:/) // ♿
  })
  it('code blocks scroll and tables scroll on narrow screens', () => {
    expect(css).toMatch(/:where\(pre\)[^{]*\{[^}]*overflow-x: auto/) // ↔️
    expect(css).toMatch(/:where\(table\)[^{]*\{[^}]*overflow-x: auto/) // ↔️
  })
  it('.ab-prose-none opts a subtree out', () => {
    expect(css.match(/:not\(:where\(\.ab-prose-none \*\)\)/g)!.length).toBeGreaterThan(15) // 🙅
  })
  it('carries the license header', () => {
    expect(raw).toContain('Copyright (c) 2026 Abraham Ukachi. The abElements Project.') // 📜
  })
})
