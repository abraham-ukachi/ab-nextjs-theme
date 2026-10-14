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
* @name: James review fixes
* @file: __tests__/james-review.test.ts
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
// 📄 fs + paths
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 📁 root + reader
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel: string) => readFileSync(join(root, rel), 'utf8')
const pkg = JSON.parse(read('package.json')) // 📦

describe('James review 🧐', () => {
  it('ab-nextjs-fonts ^0.2.5 is an optional peer', () => {
    expect(pkg.peerDependencies['ab-nextjs-fonts']).toBe('^0.2.5') // 🤝
    expect(pkg.peerDependenciesMeta['ab-nextjs-fonts']).toEqual({ optional: true }) // 🫥
  })

  it('README tells the app to import the fonts itself', () => {
    const md = read('README.md') // 📖
    expect(md).toContain('@import "ab-nextjs-fonts/inter/styles.css";') // 🔤
    expect(md).toContain('@import "ab-nextjs-fonts/mulish/styles.css";') // 🔤
  })

  it('CoreColors spells `tertiary`, keeping `tertiaty` only as an optional @deprecated alias', () => {
    const dts = read('types/index.d.ts') // 🧾
    expect(dts).toMatch(/^\s*tertiary: string;/m) // ✅
    expect(dts).toMatch(/@deprecated[^\n]*\n\s*tertiaty\?: string;/) // ⚠️ alias
    expect(read('colors.ts')).not.toContain('tertiaty') // 🚫 no runtime use
  })

  it('has a typecheck script', () => {
    expect(pkg.scripts.typecheck).toBe('tsc -p tsconfig.typecheck.json') // 🧪
  })

  it('release prep: fonts + animations are optional peers only; icons stays a dependency (CSS @import)', () => {
    expect(pkg.dependencies['ab-nextjs-fonts']).toBeUndefined() // 🚫 no longer a dependency
    expect(pkg.dependencies['ab-nextjs-animations']).toBeUndefined() // 🚫
    expect(pkg.peerDependenciesMeta['ab-nextjs-animations']).toEqual({ optional: true }) // 🫥 unused by theme code / CSS
    expect(pkg.devDependencies['ab-nextjs-fonts']).toBeDefined() // 🧪 for tests + css checks
    expect(pkg.dependencies['ab-nextjs-icons']).toBeDefined() // 🔣 css/typography.css @imports it
    expect(read('css/typography.css')).toContain("@import 'ab-nextjs-icons/css/material-icons.css';") // 🔗 why
    expect(read('README.md')).toContain('**must** install `ab-nextjs-fonts` itself') // ⚠️ documented
  })
})
