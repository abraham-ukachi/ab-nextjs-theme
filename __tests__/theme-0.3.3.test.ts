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
* @name: Theme 0.3.3 fixes
* @file: __tests__/theme-0.3.3.test.ts
* @type: TypeScript (Vitest)
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

// 📁 package root
const root = join(__dirname, '..')
const read = (f: string): string => readFileSync(join(root, f), 'utf8') // 📄
const strip = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '') // 🧹 what the browser sees
const styles = strip(read('css/styles.css'))

// 🔎 every rule as [selector, body]
const rules = [...styles.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => [m[1].trim(), m[2]] as const)
const ruleFor = (pred: (sel: string) => boolean) => rules.filter(([s]) => pred(s))

// 🎨 parse "rgb(r g b)" from a palette file
const token = (file: string, name: string): number[] => {
  const m = read(`css/${file}.css`).match(new RegExp(`${name}:\\s*rgb\\((\\d+) (\\d+) (\\d+)\\)`))
  expect(m, `${file}: ${name}`).toBeTruthy()
  return m!.slice(1, 4).map(Number)
}
// 📐 WCAG relative luminance + contrast ratio
const lum = (c: number[]): number => {
  const [r, g, b] = c.map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a: number[], b: number[]): number => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

describe('0.3.3 (a): only the Ab layout main is a stacking context 🌐', () => {
  it('no rule targets a bare `main` with z-index', () => {
    for (const [sel, body] of ruleFor((s) => s.split(',').some((p) => p.trim() === 'main'))) {
      expect(body, `bare main in "${sel}"`).not.toMatch(/z-index/)
    }
  })
  it('the layout main rule is scoped to #appLayout / AbMainLayout / data-ab-part', () => {
    const [sel] = ruleFor((s) => s.includes('#appLayout > main'))[0]
    expect(sel.split(',').map((p) => p.trim())).toEqual(['#appLayout > main', 'main.AbMainLayout', 'main[data-ab-part="main"]'])
  })
})

describe('0.3.3 (b): bronze filled button 🥉', () => {
  const base = ruleFor((s) => s.startsWith('button[data-type="filled"], a[role="button"][data-type="filled"]'))[0]
  it('solid primary background with on-primary label and icon', () => {
    expect(base[1]).toMatch(/background:\s*var\(--ab-button-background-color,\s*var\(--md-sys-color-primary\)\)/)
    expect(base[1]).toMatch(/color:\s*var\(--ab-button-text-color,\s*var\(--md-sys-color-on-primary\)\)/)
    expect(base[1]).toMatch(/--material-icon-color:\s*var\(--ab-button-text-color,\s*var\(--md-sys-color-on-primary\)\)/)
  })
  it.each(['hover', 'focus-visible', 'disabled'])('has a %s state', (st) => {
    expect(ruleFor((s) => s.includes('data-type="filled"') && s.includes(`:${st}`)).length).toBeGreaterThan(0)
  })
  it.each([['light'], ['dark']])('%s: on-primary on primary passes AA (≥ 4.5:1)', (f) => {
    expect(ratio(token(f, '--md-sys-color-primary'), token(f, '--md-sys-color-on-primary'))).toBeGreaterThanOrEqual(4.5)
  })
})

describe('0.3.3 (c): button icons follow the label colour, not the background 🎨', () => {
  it('every --material-icon-color in a button rule reads a --ab-button-text-color* variable', () => {
    const buttonRules = ruleFor((s) => /data-type="(contained|filled|outlined|text)"/.test(s))
    let checked = 0 // 🔢 guard against a vacuous pass
    for (const [sel, body] of buttonRules) {
      for (const [, value] of body.matchAll(/--material-icon-color:\s*([^;]+);/g)) {
        checked++
        // ✅ disabled is the only exception: it uses the Material on-surface 38% grey
        if (/:disabled|aria-disabled/.test(sel)) { expect(value, sel).toMatch(/--md-sys-color-on-surface/); continue }
        expect(value, `${sel}: ${value}`).toMatch(/^var\(--ab-button-text-color(-hover|-focus)?,/)
      }
    }
    expect(checked).toBeGreaterThanOrEqual(8)
  })
  it('no rule reads the non-existent --ab-button-color-focus', () => {
    expect(styles).not.toMatch(/--ab-button-color-focus/) // 👻
  })
  it('filled shares the 20px mobile button size', () => {
    const mobile = ruleFor((s) => s.includes('button[data-type="contained"], button[data-type="filled"]'))
    expect(mobile.length).toBe(1)
    expect(mobile[0][1]).toMatch(/font-size:\s*20px/)
  })
  it('no --material-icon-color reads a --ab-button-background-color* variable', () => {
    expect(styles).not.toMatch(/--material-icon-color:\s*var\(--ab-button-background-color/)
  })
  it('contained icon = contained label', () => {
    const [, body] = ruleFor((s) => s.startsWith('button[data-type="contained"], a[role="button"][data-type="contained"]'))[0]
    expect(body).toMatch(/--material-icon-color:\s*var\(--ab-button-text-color,\s*var\(--on-primary-container-color\)\)/)
  })
})
