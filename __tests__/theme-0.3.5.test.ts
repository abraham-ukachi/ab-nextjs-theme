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
* @name: Theme 0.3.5 Home palette + breakpoints - Tests
* @file: __tests__/theme-0.3.5.test.ts
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

const strip = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '') // 🧹
const tokens = strip(readFileSync(join(__dirname, '..', 'css/ab-tokens.css'), 'utf8'))
const light = tokens.slice(0, tokens.indexOf('.dark,')) // 🌞
const dark = tokens.slice(tokens.indexOf('.dark,')) // 🌙
const decl = (block: string, name: string): string => block.match(new RegExp(`${name}:\\s*([^;]+);`))![1].trim()
const hex = (h: string): number[] => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const lum = (c: number[]): number => { const [r, g, b] = c.map((x) => { const s = x / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a: string, b: string): number => { const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

describe('0.3.5: Home palette (spec §2, P15/P16) 🏠', () => {
  // 🎯 mock values (home.css .light / .dark), except the four AA nudges God approved at 20:26
  const L = { bg: '#fff8f5', card: '#fff', card2: '#fbf3ec', text: '#211a16', muted: '#6b5b50', faint: '#807062', accent: '#a67c52', 'accent-text': '#88603d', tint: '#f4e7db', btn: '#8b6340', 'btn-text': '#fff', code: '#231a14' }
  const D = { bg: '#19120c', 'pane-main': '#1d150f', card: '#241a12', card2: '#2c2118', text: '#f4ece5', muted: '#b5a597', faint: '#9a8a7d', accent: '#c29a6f', 'accent-text': '#d8b085', btn: '#8b6340', 'btn-text': '#fff8f5', code: '#110b07' }
  it.each(Object.entries(L))('light --ab-color-%s = %s', (k, v) => expect(decl(light, `--ab-color-${k}`)).toBe(v))
  it.each(Object.entries(D))('dark --ab-color-%s = %s', (k, v) => expect(decl(dark, `--ab-color-${k}`)).toBe(v))
  it('no neutral black / bright orange in dark (spec checklist)', () => {
    expect(dark).not.toMatch(/#0a0a0a/i); expect(dark).not.toMatch(/#fcb975/i)
  })
  it('AA nudges (God 20:26): each ratio ≥ 4.5:1 where the token is used', () => {
    const v = (b: string, k: string) => decl(b, `--ab-color-${k}`)
    // 🌞 faint text on the pane bg + cards
    expect(ratio(v(light, 'faint'), '#fff8f5')).toBeGreaterThanOrEqual(4.5)
    expect(ratio(v(light, 'faint'), '#ffffff')).toBeGreaterThanOrEqual(4.5)
    // 🌞 accent text on bg, card and the active-nav tint
    for (const bg of ['#fff8f5', '#ffffff', v(light, 'tint')]) expect(ratio(v(light, 'accent-text'), bg), bg).toBeGreaterThanOrEqual(4.5)
    // 🌞 white on the primary button / New badge
    expect(ratio(v(light, 'btn-text') === '#fff' ? '#ffffff' : v(light, 'btn-text'), v(light, 'btn'))).toBeGreaterThanOrEqual(4.5)
    // 🌙 faint text on bg, main pane, card and card2
    for (const bg of ['#19120c', '#1d150f', '#241a12', '#2c2118']) expect(ratio(v(dark, 'faint'), bg), bg).toBeGreaterThanOrEqual(4.5)
    // 📏 still close to the mock (each channel within 0x20)
    const near = (a: string, b: string) => hex(a).every((c, i) => Math.abs(c - hex(b)[i]) <= 0x20)
    expect(near(v(light, 'faint'), '#9c8c80')).toBe(true); expect(near(v(dark, 'faint'), '#86776b')).toBe(true); expect(near(v(light, 'accent-text'), '#8b6340')).toBe(true)
  })
  it('dark accent is warm: --ab-color-primary / --ab-focus-ring = #c29a6f (not #fcb975), ≥ 3:1 on dark surfaces', () => {
    expect(decl(dark, '--ab-color-primary')).toBe('#c29a6f'); expect(decl(dark, '--ab-focus-ring')).toBe('#c29a6f')
    expect(ratio('#c29a6f', '#19120c')).toBeGreaterThan(3); expect(ratio('#c29a6f', '#241a12')).toBeGreaterThan(3)
  })
  it('shapes (P16) + shadows: radii 5/6/8/9/10/12/14/999, button 40/44, chip 20; pane shadow none in dark', () => {
    const want = { kbd: '5px', chip: '6px', row: '8px', tile: '9px', button: '10px', code: '12px', card: '14px', pill: '999px' }
    for (const [k, px] of Object.entries(want)) expect(decl(light, `--ab-radius-${k}`), k).toBe(px)
    expect(decl(light, '--ab-button-height')).toBe('40px'); expect(decl(light, '--ab-button-height-touch')).toBe('44px'); expect(decl(light, '--ab-chip-height')).toBe('20px')
    expect(decl(light, '--ab-pane-shadow')).toMatch(/^0 1px 2px/); expect(decl(dark, '--ab-pane-shadow')).toBe('none')
    expect(decl(light, '--ab-scrim-color')).toBe('rgb(25 18 12 / 40%)'); expect(decl(dark, '--ab-scrim-color')).toBe('rgb(25 18 12 / 60%)')
  })
  it('text + accent text stay AA on cards (light + dark)', () => {
    expect(ratio('#211a16', '#ffffff')).toBeGreaterThan(7) // 🖋️
    expect(ratio('#8b6340', '#ffffff')).toBeGreaterThan(4.5) // 🥉 light accent text
    expect(ratio('#f4ece5', '#241a12')).toBeGreaterThan(7) // 🌙
    expect(ratio('#d8b085', '#241a12')).toBeGreaterThan(4.5) // 🌙 accent text
    expect(ratio('#fff8f5', '#8b6340')).toBeGreaterThan(4.5) // 🔘 dark primary button
  })
})

describe('0.3.5: breakpoints + gapped panes (Decision 6) 📐', () => {
  it('declares 768 / 1180 / 1920 and the mock gapped geometry (16 gap, 20 radius)', () => {
    expect(decl(light, '--ab-breakpoint-tablet')).toBe('768px')
    expect(decl(light, '--ab-breakpoint-joined')).toBe('1180px')
    expect(decl(light, '--ab-breakpoint-gapped')).toBe('1920px')
    expect(decl(light, '--ab-pane-gap')).toBe('16px'); expect(decl(light, '--ab-pane-radius')).toBe('20px')
  })
  it('fonts stay Mulish titles / Inter body / Roboto Mono code (God, 2026-10-20)', () => {
    expect(decl(light, '--ab-font-title')).toMatch(/^'Mulish'/); expect(decl(light, '--ab-font-body')).toMatch(/^inter/); expect(decl(light, '--ab-font-code')).toMatch(/^'Roboto Mono'/)
  })
})
