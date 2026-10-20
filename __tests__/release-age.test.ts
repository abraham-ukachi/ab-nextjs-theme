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
* @name: Peer ranges + minimumReleaseAge guard - Tests (0.3.4, D33)
* @file: __tests__/release-age.test.ts
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
// 📄 fs + paths
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 📁 package root + reader
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel: string) => readFileSync(join(root, rel), 'utf8')

/** 🎯 the sibling ranges theme 0.3.4 builds on (carets, peer == dev). */
const WANT: Record<string, string> = {
  'ab-nextjs-fonts': '^0.2.6', // ⌨️ Roboto Mono (D29 a)
  'ab-nextjs-icons': '^0.2.4', // 🔣 G20 peer
  'ab-nextjs-animations': '^0.2.1', // 🎞️
}

/**
 * 🛡️ D33: the ONLY allowed pnpm 11 minimumReleaseAge exemptions — our own brand-new ab-nextjs-* releases,
 * exact versions, each with an expiry (registry publish time + 24h, UTC). An expired entry fails the suite,
 * so nobody forgets to remove it.
 */
const ALLOWED_EXCLUDES: Record<string, string> = {
  'ab-nextjs-fonts@0.2.6': '2026-10-21T17:06:38.319Z', // ⏰ TODO(remove after expiry): published 2026-10-20T17:06:38.319Z
  'ab-nextjs-icons@0.2.4': '2026-10-21T17:15:19.993Z', // ⏰ TODO(remove after expiry): published 2026-10-20T17:15:19.993Z
}

/** ⏰ an exclude is expired once `now` is past its expiry (publish + 24h) */
const isExpired = (until: string, now: number = Date.now()): boolean => now >= Date.parse(until)

// 📋 the list under `minimumReleaseAgeExclude:` (stops at the next top-level key)
function readExcludes(ws: string): string[] {
  const block = /^minimumReleaseAgeExclude:[^\n]*\n((?:[ \t]+[^\n]*\n?|[ \t]*#[^\n]*\n?|[ \t]*\n)*)/m.exec(ws)?.[1] ?? '' // 📋
  return [...block.matchAll(/^[ \t]+-[ \t]+['"]?([^'"\s#]+)['"]?/gm)].map((m) => m[1]) // 🔍 entries
}

describe('release age + sibling ranges 📦', () => {
  it('lists exactly the two D33 entries, each pinned to the version WANT resolves to', () => {
    expect(readExcludes(read('pnpm-workspace.yaml')).sort()).toEqual(Object.keys(ALLOWED_EXCLUDES).sort()) // 🎯 no more, no fewer
    for (const e of Object.keys(ALLOWED_EXCLUDES)) {
      const [name, version] = e.split('@') // ✂️
      expect(WANT[name], e).toBe(`^${version}`) // 📌 the exclude is the floor of the range we ship
      expect(read('pnpm-lock.yaml'), e).toContain(`${name}@${version}:`) // 🔒 and the lockfile resolved it
    }
  })
  it('the expiry rule fails a day after publish ⏰', () => {
    for (const until of Object.values(ALLOWED_EXCLUDES)) {
      expect(isExpired(until, Date.parse(until) - 1)).toBe(false) // ✅ still inside the window
      expect(isExpired(until, Date.parse(until) + 1)).toBe(true) // ❌ the suite goes red from here
    }
  })

  const pkg = JSON.parse(read('package.json')) // 📦

  it('peer + dev ranges are matching carets; icons is required', () => {
    for (const [name, range] of Object.entries(WANT)) {
      expect(pkg.peerDependencies[name], name).toBe(range) // 🤝 peer
      expect(pkg.devDependencies[name], name).toBe(range) // 🧪 dev
    }
    expect(pkg.peerDependenciesMeta?.['ab-nextjs-icons']).toBeUndefined() // 🚫 optional
  })

  it('never commits local links (file:, link:, workspace:, portal:)', () => {
    const all = [...Object.values(pkg.dependencies ?? {}), ...Object.values(pkg.devDependencies), ...Object.values(pkg.peerDependencies)] as string[]
    for (const range of all) expect(range).not.toMatch(/^(file|link|workspace|portal):/) // 🔗
  })

  it('minimumReleaseAgeExclude only lists allowed, unexpired, exact ab-nextjs-* versions', () => {
    const excludes = readExcludes(read('pnpm-workspace.yaml')) // 📋
    for (const e of excludes) {
      expect(e, e).toMatch(/^ab-nextjs-[a-z-]+@\d+\.\d+\.\d+$/) // 🎯 ours, exact
      expect(Object.keys(ALLOWED_EXCLUDES), e).toContain(e) // 🚫 unlisted
      expect(e.split('@')[1], `${e} must pin one exact version`).toMatch(/^\d+\.\d+\.\d+$/) // 📌 no ^ ~ * x ranges
      expect(isExpired(ALLOWED_EXCLUDES[e]), `${e} is over a day old: remove it from pnpm-workspace.yaml`).toBe(false) // ⏰
    }
  })

  it('the minimum release age itself stays on (no repo-level opt-out)', () => {
    expect(read('pnpm-workspace.yaml')).not.toMatch(/^minimumReleaseAge:\s*0\b/m) // 🛡️
  })

  it('.npmrc has no minimum-release-age setting (pnpm 11 ignores it there; James review)', () => {
    let npmrc = '' // 📄 a missing .npmrc is fine
    try { npmrc = read('.npmrc') } catch { /* 🙅 none */ }
    expect(npmrc).not.toMatch(/^\s*minimum-?release-?age/im) // 🚫 minimumReleaseAge / minimum-release-age
  })

  it('pnpm-workspace.yaml turns on minimumReleaseAgeStrict 🛡️', () => {
    expect(read('pnpm-workspace.yaml')).toMatch(/^minimumReleaseAgeStrict:\s*true\b/m) // 🛡️
  })
})
