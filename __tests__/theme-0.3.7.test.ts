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
* @name: Dotted surface tokens (0.3.7)
* @file: __tests__/theme-0.3.7.test.ts
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
import { join } from 'node:path'

// 📄 tokens without comments
const css = readFileSync(join(__dirname, '..', 'css/ab-tokens.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') // 🧹
// 🌞 / 🌙 the first light block and the dark block
const light = css.slice(0, css.indexOf(".dark,\n[data-theme='dark']")) // 🌞
const dark = css.slice(css.indexOf(".dark,\n[data-theme='dark']")) // 🌙

// 🟤 John's Welcome v6 playground `.dots`: radial-gradient(var(--grid) 1.3px, transparent 1.4px) / 20px
describe('🟤 0.3.7 dotted surface tokens (Welcome v6 mock)', () => {
  it('light: --ab-dot-color rgb(107 79 53 / 0.16), --ab-dot-size 1.3px, --ab-dot-gap 20px', () => {
    expect(light).toMatch(/--ab-dot-color: rgb\(107 79 53 \/ 0\.16\);/) // 🟤
    expect(light).toMatch(/--ab-dot-size: 1\.3px;/) // ⚫
    expect(light).toMatch(/--ab-dot-gap: 20px;/) // 📏
  })
  it('dark: only the colour changes, rgb(245 235 225 / 0.10)', () => {
    expect(dark).toMatch(/--ab-dot-color: rgb\(245 235 225 \/ 0\.10\);/) // 🌙
    expect(dark).not.toMatch(/--ab-dot-size|--ab-dot-gap/) // 📏 same geometry
  })
  it('--ab-color-card is white in light and #241a12 in dark (the playground card)', () => {
    expect(light).toMatch(/--ab-color-card: #fff;/); expect(dark).toMatch(/--ab-color-card: #241a12;/) // 🃏
  })
})
