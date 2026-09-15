import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("ab-nextjs-theme package smoke", () => {
  it("targets Next 16.3.4 peers and package metadata", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.name).toBe("ab-nextjs-theme");
    expect(pkg.version).toBe("0.2.7");
    expect(pkg.peerDependencies.next).toBe("16.3.4");
  });

  it("ships CSS entrypoints", () => {
    for (const rel of ["styles.css", "index.css", "css/colors.css", "css/typography.css", "css/styles.css"]) {
      const css = readFileSync(join(root, rel), "utf8");
      expect(css.length).toBeGreaterThan(0);
    }
  });

  it("exports default theme with colors", async () => {
    const mod = await import("../index.ts");
    expect(mod.default).toBeTruthy();
    expect(mod.default.colors).toBeTruthy();
  });
});
