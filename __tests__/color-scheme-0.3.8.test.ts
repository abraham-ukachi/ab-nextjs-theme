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
* @name: color-scheme per theme (0.3.8)
* @file: __tests__/color-scheme-0.3.8.test.ts
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

// 📖 the tokens, comments stripped
const css = readFileSync(join(__dirname, '..', 'css/ab-tokens.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
// 🧱 the body of the first block opened by `head`
const block = (head: string) => { const i = css.indexOf(head); expect(i, head).toBeGreaterThanOrEqual(0); return css.slice(i, css.indexOf('}', i)) }

// 🌗 Joseph (0.2.24 MDX docs): native scrollbars + controls follow the theme class
describe('🌗 color-scheme', () => {
  it('light (and :root) → color-scheme: light', () => {
    expect(block(":root,\n.light,\n[data-theme='light'] {")).toMatch(/color-scheme:\s*light;/) // 🌞
  })
  it('.dark / [data-theme=dark] → color-scheme: dark', () => {
    expect(block(".dark,\n[data-theme='dark'] {")).toMatch(/color-scheme:\s*dark;/) // 🌙
  })
  it('dark is declared after light, so .dark wins even with both on <html>', () => {
    expect(css.indexOf('color-scheme: dark')).toBeGreaterThan(css.indexOf('color-scheme: light')) // ⬇️ cascade order
  })
})

// 🌗 0.3.8 (God): the Material medium/high contrast classes set it too, AFTER the base blocks (they win on <html>)
describe('🌗 color-scheme on the contrast schemes', () => {
  for (const [sel, mode] of [['.light-medium-contrast', 'light'], ['.light-high-contrast', 'light'], ['.dark-medium-contrast', 'dark'], ['.dark-high-contrast', 'dark']] as const) {
    it(`${sel} → color-scheme: ${mode}`, () => {
      expect(block(`\n${sel} {`)).toMatch(new RegExp(`color-scheme:\\s*${mode};`)) // 🌗
      expect(css.indexOf(`\n${sel} {`)).toBeGreaterThan(css.indexOf(".dark,\n[data-theme='dark'] {")) // ⬇️ after the base dark block
    })
  }
})

