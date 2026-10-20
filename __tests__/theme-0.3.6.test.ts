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
