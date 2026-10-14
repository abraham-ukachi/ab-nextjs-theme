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
* @name: Package smoke test
* @file: __tests__/package-smoke.test.ts
* @type: TypeScript (Vitest)
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("ab-nextjs-theme package smoke", () => {
  it("targets Next 16.3.4 peers and package metadata", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.name).toBe("ab-nextjs-theme");
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(pkg.peerDependencies.next).toBe("^16.3.4");
  });

  it("only depends on registry semver ranges (no file:/link:/workspace:)", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    for (const section of ["dependencies", "peerDependencies", "optionalDependencies", "devDependencies"]) {
      for (const [name, spec] of Object.entries<string>(pkg[section] ?? {})) {
        expect(spec, `${section}.${name}`).not.toMatch(/^(file|link|workspace|portal):/);
      }
    }
    expect(Object.keys(pkg.dependencies).sort()).toEqual(["ab-nextjs-icons"]); // 🔣 still a dependency: css/typography.css @imports its material-icons.css (fonts + animations are optional peers now)
  });

  it("ships CSS entrypoints", () => {
    for (const rel of ["styles.css", "index.css", "css/colors.css", "css/typography.css", "css/styles.css"]) {
      const css = readFileSync(join(root, rel), "utf8");
      expect(css.length).toBeGreaterThan(0);
    }
  });

  it("only references CSS assets that ship inside the package", () => {
    const out = execFileSync(process.execPath, [join(root, "scripts/check-css-assets.mjs")], { encoding: "utf8" });
    expect(out).toContain("all CSS url() references resolve inside the package");
  });

  it("exports default theme with colors", async () => {
    const mod = await import("../index.ts");
    expect(mod.default).toBeTruthy();
    expect(mod.default.colors).toBeTruthy();
  });
});
