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
* @name: Theme 0.3.2 fixes
* @file: __tests__/theme-0.3.2.test.ts
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

// 📁 package root (CommonJS-safe, same as the other theme tests)
const root = join(__dirname, '..')
const read = (f: string): string => readFileSync(join(root, f), 'utf8') // 📄
const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '') // 🧹 what the browser actually sees

// 🔎 the body of a top-level rule, by its exact selector line
const block = (css: string, selector: string): string => {
  const i = css.indexOf(selector) // 📍
  expect(i, selector).toBeGreaterThan(-1)
  return css.slice(i, css.indexOf('\n}', i)) // ✂️
}

describe('0.3.2 (a): legacy colour aliases are defined again 🎨', () => {
  const colors = read('css/colors.css') // 📄
  // 🗂️ every custom property declared by colors.css and the palette files it imports (light.css, dark.css, …)
  const palette = ['light', 'light-mc', 'light-hc', 'dark', 'dark-mc', 'dark-hc'].map((f) => read(`css/${f}.css`)).join('\n') + colors
  const declared = new Set([...stripComments(palette).matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])) // ✅

  it.each([
    ['light', '[data-theme="light"], .light {'],
    ['dark', '[data-theme="dark"], .dark {'],
  ])('%s block: comments are balanced and the aliases are live', (mode, selector) => {
    const raw = block(colors, selector) // 📦
    expect(raw.split('/*').length, `${mode}: every /* has its */`).toBe(raw.split('*/').length) // ⚖️
    const live = stripComments(raw) // 👀
    // 🔘 the ones AbButton "contained" / "tonal" read; they were swallowed by an unclosed comment before
    for (const v of ['--primary-color', '--on-primary-color', '--primary-container-color', '--on-primary-container-color', '--surface-color', '--on-surface-color', '--outline-color']) {
      expect(live, `${mode}: ${v}`).toMatch(new RegExp(`${v}\\s*:\\s*var\\(--md-sys-color-${v.slice(2, -'-color'.length)}\\)`)) // 🎯 live Material token
    }
    // 🔗 and every alias points at a variable that really exists
    for (const [, ref] of live.matchAll(/var\((--[\w-]+)\)/g)) expect(declared.has(ref), `${mode}: ${ref} is declared`).toBe(true)
  })

  it('the whole file has no unclosed or stray comment markers', () => {
    expect(stripComments(colors)).not.toMatch(/\/\*|\*\//) // 🚫
  })
})

describe('0.3.2 (b): form children are visible unless motion is allowed ♿', () => {
  const css = stripComments(read('css/styles.css')) // 📄

  it('runs the `form > *` entrance (backwards fill, no hard opacity 0) only with prefers-reduced-motion: no-preference', () => {
    const at = css.indexOf('@media (prefers-reduced-motion: no-preference)') // 📍
    expect(at).toBeGreaterThan(-1)
    const media = css.slice(at, css.indexOf('\n}', at) + 2) // 📦 the media block
    expect(media).toMatch(/form > \*\s*\{[^}]*animation:\s*fadeIn[^;]*backwards,\s*slideFromDown[^;]*backwards;/) // 🎬 backwards fill
    // 🚫 no `form > *` rule anywhere hides the children with a hard opacity 0 (keyframes may be missing)
    for (const [, body] of css.matchAll(/form > \*\s*\{([^}]*)\}/g)) {
      expect(body).not.toMatch(/opacity:\s*0\b/)
      expect(body).not.toMatch(/\bforwards\b/) // 🙅 `forwards` is what kept them hidden after a run
    }
    // 🚫 and the entrance never runs outside the no-preference block
    const outside = css.replace(media, '') // ✂️
    for (const [, body] of outside.matchAll(/form > \*\s*\{([^}]*)\}/g)) expect(body).not.toMatch(/animation:/)
  })
})

describe('0.3.2 (c): only the Ab layout aside is laid out 🧱', () => {
  const css = stripComments(read('css/styles.css')) // 📄
  // 🔎 every selector in every rule
  const selectors = [...css.matchAll(/([^{};]+)\{/g)].flatMap((m) => m[1].split(',').map((s) => s.trim())).filter(Boolean)

  it('no rule targets a bare `aside` element (descendant rules like `aside .Menus` are fine)', () => {
    const bare = selectors.filter((s) => /^aside(?=$|:|\[)/.test(s) && !s.startsWith('aside[data-ab-part="aside"]')) // 🚫 `aside`, `aside:not(...)`, `aside[data-...]`
    expect(bare).toEqual([])
  })

  it('the position:absolute mobile rule targets aside.AbAsideLayout / [data-ab-part="aside"]', () => {
    const rule = /([^{}]+)\{\s*display:\s*flex;\s*position:\s*absolute;\s*inset:\s*0;/.exec(css) // 📍
    expect(rule?.[1]).toContain('aside.AbAsideLayout')
    expect(rule?.[1]).toContain('aside[data-ab-part="aside"]')
  })

  it('the hidden-by-default layout rule keeps #appLayout > aside and the Ab aside', () => {
    expect(css).toMatch(/#appLayout > aside, aside\.AbAsideLayout, aside\[data-ab-part="aside"\]\s*\{\s*display:\s*none;/) // 🙈
  })
})

describe('0.3.2 (d): one ab-nextjs-icons (^0.2.3) 🔣', () => {
  it('depends on ab-nextjs-icons ^0.2.3 and the lockfile has no 0.1.x copy', () => {
    const pkg = JSON.parse(read('package.json')) // 📦
    expect(pkg.dependencies['ab-nextjs-icons']).toBe('^0.2.3')
    const versions = [...read('pnpm-lock.yaml').matchAll(/^ {2}ab-nextjs-icons@([\d.]+):/gm)].map((m) => m[1]) // 🔒
    expect(versions).toEqual(['0.2.3'])
  })

  it('still imports the material-icons stylesheet icons 0.2.3 ships', () => {
    expect(read('css/typography.css')).toContain("@import 'ab-nextjs-icons/css/material-icons.css'") // 🔗
    expect(readFileSync(join(root, 'node_modules/ab-nextjs-icons/css/material-icons.css'), 'utf8').length).toBeGreaterThan(0) // ✅ resolvable
  })
})
