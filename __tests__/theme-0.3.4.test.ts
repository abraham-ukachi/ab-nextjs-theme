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
* @name: Theme 0.3.4 (docs shell)
* @file: __tests__/theme-0.3.4.test.ts
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
const strip = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '') // 🧹
const tokens = strip(read('css/ab-tokens.css'))
const lightBlock = tokens.slice(0, tokens.indexOf('.dark,')) // 🌞
const darkBlock = tokens.slice(tokens.indexOf('.dark,')) // 🌙

// 🎨 rgb() from a palette file or a literal
type Rgb = [number, number, number]
const rgb = (v: string): Rgb => v.match(/rgb\((\d+) (\d+) (\d+)\)/)!.slice(1, 4).map(Number) as Rgb
const md = (mode: 'light' | 'dark', name: string): Rgb => rgb(read(`css/${mode}.css`).match(new RegExp(`--md-sys-color-${name}:\\s*(rgb\\([^)]*\\))`))![1])
const decl = (block: string, name: string): string => block.match(new RegExp(`${name}:\\s*([^;]+);`))![1].trim()
// 📐 WCAG contrast
const lum = (c: Rgb): number => { const [r, g, b] = c.map((x) => { const s = x / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a: Rgb, b: Rgb): number => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

describe('0.3.4 (a): G18 shell tokens 🧭', () => {
  it.each(['--ab-focus-ring-width', '--ab-focus-ring-offset', '--ab-pane-gap', '--ab-pane-radius', '--ab-color-divider', '--ab-divider-hairline', '--ab-color-code-surface', '--ab-color-on-code-surface', '--ab-font-code'])('%s is declared', (t) => {
    expect(lightBlock).toContain(`${t}:`) // 🌞 (also :root)
  })
  it.each(['light', 'dark'] as const)('%s: focus ring (primary) is ≥ 3:1 on background and surface-container', (mode) => {
    for (const bg of ['background', 'surface-container']) expect(ratio(md(mode, 'primary'), md(mode, bg)), bg).toBeGreaterThanOrEqual(3) // 💍
  })
  it.each([['light', lightBlock], ['dark', darkBlock]] as const)('%s: code surface is dark and its text is ≥ 4.5:1', (_m, block) => {
    const bg = rgb(decl(block, '--ab-color-code-surface')); const fg = rgb(decl(block, '--ab-color-on-code-surface'))
    expect(lum(bg)).toBeLessThan(0.05) // 🌑 dark in both themes
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(4.5) // ♿
  })
  it('D29 (b): the code font is the system mono stack (no font files)', () => {
    expect(decl(lightBlock, '--ab-font-code')).toBe("'Roboto Mono', var(--ab-font-mono)") // ⌨️ D29a: Roboto Mono first, system mono fallback
    expect(decl(lightBlock, '--ab-font-mono')).toMatch(/^ui-monospace,.*monospace$/) // 🔤
  })
})

describe('0.3.4 (b): only Ab forms are styled 📝', () => {
  it.each(['css/styles.css', 'css/typography.css'])('%s has no bare `form` selector', (f) => {
    for (const [, sel] of strip(read(f)).matchAll(/([^{}]+)\{/g)) {
      for (const part of sel.replace(/:is\([^)]*\)/g, ':is()').split(','))  // 🧩 commas inside :is() are not selector-list commas
      expect(part.trim(), `${f}: ${part.trim()}`).not.toMatch(/^form\b/) // 🚫
    }
  })
  it('the form rules target form.AbForm / form[data-ab-part="form"]', () => {
    expect(strip(read('css/styles.css'))).toContain(':is(form.AbForm, form[data-ab-part="form"]) {')
    expect(strip(read('css/typography.css'))).toContain(':is(form.AbForm, form[data-ab-part="form"]) {')
  })
})

describe('0.3.4 (c): G20 ab-nextjs-icons is a required peer 🔣', () => {
  const pkg = JSON.parse(read('package.json'))
  it('not a runtime dependency, a non-optional peer + dev dependency', () => {
    expect(pkg.dependencies?.['ab-nextjs-icons']).toBeUndefined() // 🚫 no duplicate copy in apps
    expect(pkg.peerDependencies['ab-nextjs-icons']).toMatch(/^\^0\.2\./) // 🤝
    expect(pkg.peerDependenciesMeta?.['ab-nextjs-icons']).toBeUndefined() // ❗ required (CSS @import)
    expect(pkg.devDependencies['ab-nextjs-icons']).toBe(pkg.peerDependencies['ab-nextjs-icons']) // 🧪 same caret
  })
})
