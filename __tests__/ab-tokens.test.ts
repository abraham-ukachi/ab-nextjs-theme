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
* @name: --ab-* tokens - Tests (0.3.1)
* @file: __tests__/ab-tokens.test.ts
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
// 📄 fs
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 📁 read CSS without comments (the commented-out legacy layer must not count)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f: string) => readFileSync(join(root, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const tokens = read('css/ab-tokens.css') // 🆕
const light = read('css/light.css') // 🌞
const dark = read('css/dark.css') // 🌙

// 🔍 declarations inside the first block whose selector list contains `sel`
function block(css: string, sel: string): Record<string, string> {
  const re = /([^{}]+)\{([^}]*)\}/g // 🧱 selector { body }
  for (const m of css.matchAll(re)) {
    if (!m[1].split(',').map((s) => s.trim()).includes(sel)) continue // 🙅
    return Object.fromEntries([...m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2].trim()])) // 📦
  }
  return {}
}

// 🎨 colour helpers for WCAG contrast
const rgb = (v: string): number[] => v.startsWith('#') ? [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)) : v.match(/\d+/g)!.slice(0, 3).map(Number)
const lum = (c: number[]) => { const [r, g, b] = c.map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4 }); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const contrast = (a: string, b: string) => { const [x, y] = [lum(rgb(a)), lum(rgb(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

// 📦 parsed blocks
const T = { light: block(tokens, '.light'), dark: block(tokens, '.dark') }
const MD = { light: block(light, '.light'), dark: block(dark, '.dark') }

describe('ab-tokens.css (theme 0.3.1)', () => {
  it('is imported (live, not commented) by colors.css', () => {
    expect(read('css/colors.css')).toMatch(/@import '\.\/ab-tokens\.css';/) // 🔗
  })
  it('defines the new tokens in light and dark', () => {
    for (const k of ['--ab-color-bronze-text', '--ab-font-title', '--ab-color-sage', '--ab-focus-ring']) expect(T.light[k], k).toBeTruthy() // 🌞
    expect(T.dark['--ab-color-bronze-text']).toBeTruthy() // 🌙
    expect(T.light['--ab-font-title']).toMatch(/^'Mulish'/) // 🔤 Mulish first (God, §8 Q6)
  })
  it('every alias points at a --md-sys token that exists in BOTH palettes', () => {
    for (const theme of ['light', 'dark'] as const) {
      for (const [k, v] of Object.entries(T[theme])) {
        const ref = v.match(/^var\((--md-sys-[\w-]+)\)$/)?.[1] // 🔗
        if (!ref) continue // 🎨 literal value
        expect(MD.light[ref], `${k} → ${ref} (light)`).toBeTruthy() // 🌞
        expect(MD.dark[ref], `${k} → ${ref} (dark)`).toBeTruthy() // 🌙
      }
    }
  })
  it('small bronze text meets WCAG AA (4.5:1) on background + surface-container in both themes', () => {
    for (const theme of ['light', 'dark'] as const) {
      const text = T[theme]['--ab-color-bronze-text'] // ♿
      for (const bg of ['--md-sys-color-background', '--md-sys-color-surface-container']) {
        expect(contrast(text, MD[theme][bg]), `${theme} ${bg}`).toBeGreaterThanOrEqual(4.5) // ✅
      }
    }
  })
  it('documents why the base bronze is not enough for small text in light mode', () => {
    expect(contrast(T.light['--ab-color-bronze'], MD.light['--md-sys-color-background'])).toBeLessThan(4.5) // 📉 3.55
  })
})

// 🌿 John 20:57: the sage beta-chip text must be AA (≥ 4.5:1) on its tint (rgb(119 141 121 / 12%)) over every Home surface
describe('sage chip text AA 🌿', () => {
  const over = (bg: string) => { const b = rgb(bg); return '#' + [119, 141, 121].map((t, i) => Math.round(t * 0.12 + b[i] * 0.88).toString(16).padStart(2, '0')).join('') } // 🎨 flatten the tint
  for (const mode of ['light', 'dark'] as const) {
    it(`${mode}: --ab-color-sage-accent ≥ 4.5:1 on the tint over bg, pane-main, card and card2`, () => {
      const fg = T[mode]['--ab-color-sage-accent'] // 🖋️
      for (const s of ['--ab-color-bg', '--ab-color-pane-main', '--ab-color-card', '--ab-color-card2']) {
        const bg = T[mode][s] === '#fff' ? '#ffffff' : T[mode][s] // 🧱
        expect(contrast(fg, over(bg)), `${mode} ${s}`).toBeGreaterThanOrEqual(4.5) // ♿
      }
    })
  }
})
