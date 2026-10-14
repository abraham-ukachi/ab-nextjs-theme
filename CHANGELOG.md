# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.1](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.3.0...v0.3.1) (2026-10-14)

* **New `css/ab-tokens.css`** (imported by `colors.css`): `--ab-*` tokens for abElements components ≥ 0.1.10
  * ♿ **`--ab-color-bronze-text`** (God, §8): small bronze text that passes AA. Light `#8a6440` (5.03:1 on background, 4.56:1 on surface-container); dark `#d9ab7f` (8.9:1 / 7.86:1). The base `--ab-color-bronze` `#a67c52` stays for large text/UI (3.55:1)
  * 🔤 **`--ab-font-title`** = Mulish (God, §8 Q6: Cyrillic) + `.font-title` / `.ab-title` utilities (weight 800). Global `h1–h3` are unchanged (still Inter)
  * 🎨 aliases onto the live `--md-sys-color-*` palette (primary, surface, surface-container, outline-variant, …), `--ab-color-sage`, `--ab-focus-ring`, `--ab-font-body`, `--ab-font-mono`; `.text-bronze`
* Tests: tokens present, aliases resolve in both palettes, AA contrast computed from the live palette
* **Dependencies:** `ab-nextjs-fonts` (`^0.2.5`) and `ab-nextjs-animations` are now **optional peers**, no longer dependencies. ⚠️ `styles.css` still `@import`s the font stylesheets, so apps using it must install `ab-nextjs-fonts` themselves (README). `ab-nextjs-icons` stays a dependency (`css/typography.css` imports its `material-icons.css`)
* **Types:** `CoreColors.tertiary` (the misspelled `tertiaty` stays as an optional `@deprecated` alias); `CoreColors.error`, `Theme.typography` and `Theme.styles` are optional and `FontSize` entries are `[size, meta]`, matching runtime
* **Tooling:** `typecheck` script (`tsconfig.typecheck.json`)

## [0.3.0](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.10...v0.3.0) (2026-10-05)

### BREAKING CHANGES

* Dialog, toast, logo, spinner, and doodle chrome CSS + assets moved to [`ab-nextjs-components`](https://github.com/abraham-ukachi/ab-nextjs-components) `>=0.1.8`. Apps on `^0.2.10` that only bump the theme would silently lose all chrome.
* **Migration:** add this import right after the theme import:

```css
@import "ab-nextjs-theme/styles.css";
@import "ab-nextjs-components/styles.css";
```

### [0.2.10](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.9...v0.2.10) (2026-10-03)

* Publish to npm automatically from GitHub Actions with Trusted Publishing (OIDC + provenance, no NPM_TOKEN)
* Ship only package files via `files`; `next` peer is now `^16.3.4`
* Fix `styles.css` breaking app builds: the Ab logo and spinners now ship in `assets/`, the LYD-only images (doodles, 3D, emoji GIF, lock) became opt-in custom properties, and a new `check-css-assets` guard fails packing if a CSS `url()` doesn't resolve inside the package

### [0.2.9](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.8...v0.2.9) (2026-10-03)

### [0.2.8](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.7...v0.2.8) (2026-09-17)

### [0.2.7](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.6...v0.2.7) (2025-09-17)

### [0.2.6](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.5...v0.2.6) (2025-09-17)

### [0.2.5](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.4...v0.2.5) (2025-09-17)

### [0.2.4](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.3...v0.2.4) (2025-09-16)

### [0.2.3](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.2...v0.2.3) (2025-03-09)

### [0.2.2](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.1...v0.2.2) (2025-03-09)

### [0.2.1](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.2.0...v0.2.1) (2025-03-09)

## [0.2.0](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.1.5...v0.2.0) (2025-03-08)

### [0.1.5](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.1.4...v0.1.5) (2024-08-02)

### [0.1.4](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.1.3...v0.1.4) (2024-07-31)

### [0.1.3](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.1.2...v0.1.3) (2024-07-30)

### [0.1.2](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.1.1...v0.1.2) (2024-06-10)

### 0.1.1 (2024-06-10)
