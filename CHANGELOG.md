## 0.3.5 (Unreleased)

* 🏠 **Home palette (P15/P16, spec §2):** new `--ab-color-*` tokens with the exact approved mock values for light and the warm-brown dark: `bg`, `pane-main`, `card`, `card2`, `border`, `div`, `text`, `muted`, `faint`, `accent`, `accent-text`, `tint`, `btn`, `btn-text`, `code`, `code-text`, `kbd`, `hover` and `sage-accent`, plus `--ab-shadow-card`. Existing tokens are unchanged.
* 🌿 **Sage beta-chip text (John, 20:57):** light `--ab-color-sage-accent` #778d79 (3.2:1) → #566a58, ≥ 4.72:1 on the sage tint over bg/card/card2. John's #5f7461 measured 4.46:1 on card, so it is one step darker. Dark #8fa491 already ≥ 5.03:1, unchanged. Tint unchanged. Tested.
* ♿ **AA nudges (God, 2026-10-20 20:26):** a few mock colours moved just enough to reach 4.5:1, each ratio tested:
  * light `--ab-color-faint` `#9c8c80 → #807062`
  * light `--ab-color-accent-text` `#8b6340 → #88603d` (4.5:1 on `--tint`)
  * light `--ab-color-btn` `#a67c52 → #8b6340` (white text 5.31:1; also the New badge)
  * dark `--ab-color-faint` `#86776b → #9a8a7d`
* 🥉 **Warm dark accent (P15):** in dark, `--ab-color-primary` / `--ab-focus-ring` = `#c29a6f` (with `--ab-color-on-primary: #19120c`) instead of the Material `#fcb975`. Every component that reads them turns warm bronze.
* 🔷 **Shapes (P16):**
  * radii: `--ab-radius-kbd` 5, `-chip` 6, `-row` 8, `-tile` 9, `-button` 10, `-code` 12, `-card` 14, `-pill` 999
  * sizes: `--ab-button-height` 40 (`-touch` 44), `--ab-button-padding-inline` 16, `--ab-chip-height` 20, `--ab-chip-padding-inline` 7
  * shadows and colours: `--ab-shadow-button`, `--ab-shadow-thumb`, `--ab-color-thumb`, `--ab-scrim-color` (40% / 60%), `--ab-color-handle`, `--ab-color-sheet-edge`
* 🧅 **Cascade layer:** the bare element rules (`body`, `h1`–`h3`, `p`, `button`, `span`, `a`, …) in `css/typography.css` and `css/styles.css` now sit in `@layer base` (Tailwind v4's base layer). Tailwind utilities and any unlayered app CSS now win over them. ⚠️ An app that relied on those defaults beating its own unlayered rules will see its own rules apply.
  * ⚠️ **Heads-up for consumers:** any layered CSS in your app (Tailwind's `utilities` and `components` layers, or a third-party library's `@layer`) now beats the theme's `body`, `h1`–`h3`, `p`, `a` and `button` defaults. Before this change those defaults were unlayered and beat every layered rule. Only unlayered app CSS is unaffected.
* 📐 **Breakpoints (Decision 6):** mobile <768, tablet 768–1179, joined panes 1180–1919, gapped panes ≥1920. They're declared as `--ab-breakpoint-tablet` / `-joined` / `-gapped` for reference (core ≥ 0.1.7 owns the media queries). The gapped panes now use the desktop mock geometry: ⚠️ `--ab-pane-gap` **12px → 16px** and `--ab-pane-radius` **16px → 20px**. `--ab-pane-shadow` is new: the mock shadow in light, `none` in dark.

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.4](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.3.3...v0.3.4) (2026-10-16)

* 🧭 **Docs-shell tokens (G18 slice):** `--ab-focus-ring-width` / `--ab-focus-ring-offset` (the primary ring is ≥ 3:1 on background and surface-container in both themes), `--ab-pane-gap` / `--ab-pane-radius`, `--ab-color-divider` / `--ab-divider-hairline`, and `--ab-color-code-surface` / `--ab-color-on-code-surface` (dark in both themes, ≥ 4.5:1)
* ↕️ **Legacy button margins skip AbButton (Joseph):** the `margin-top/bottom` (24/16px, 32/24px from 460px) on outlined / text buttons now use `:not(.AbButton)`, so an AbButton in the app bar no longer makes it 105px tall
* ⌨️ **`--ab-font-code`** = `'Roboto Mono'` (ab-nextjs-fonts 0.2.6, D29 a / G30) first, then the system mono stack (`--ab-font-mono`) as the fallback. The fonts peer and devDependency move to `^0.2.6`, and `css/typography.css` imports `ab-nextjs-fonts/roboto-mono/styles.css`
* 🔧 npm author email is abrahamukachi@gmail.com
* 📝 **Only Ab forms are styled:** the form layout, disabled opacity, typography and staggered entrance now target `:is(form.AbForm, form[data-ab-part="form"])`. A plain `<form>` (search box, newsletter, …) keeps the browser layout
* ➖ **`ab-nextjs-icons` is a required peer (G20)**, no longer a runtime dependency, so apps get one icons copy. Install it next to the theme (`^0.2.3`, satisfied by 0.2.4)
* 📝 Code file headers use the house `@authors` email
* 🔣 **icons peer `^0.2.4`** (peer + dev; was `^0.2.3`)
* ⏳ **D33:** `pnpm-workspace.yaml` turns on `minimumReleaseAgeStrict` and exempts exactly `ab-nextjs-fonts@0.2.6` and `ab-nextjs-icons@0.2.4` until 24h after their publish (2026-10-21 17:06 / 17:15 UTC); `__tests__/release-age.test.ts` fails after that and only accepts exact versions
* Tests: tokens declared, focus-ring and code-surface contrast, D29a Roboto Mono + mono fallback, no bare `form` selector, icons as a non-optional peer

## [0.3.3](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.3.2...v0.3.3) (2026-10-16)

* 🌐 **Menus are no longer hidden behind content:** the layout `main` rule (`position: relative; z-index: 99`) matched every `<main>`, so any `<main>` became a stacking context painted over popovers outside it, like the globe/language menu. It now targets only the Ab layout main: `#appLayout > main`, `main.AbMainLayout` and `main[data-ab-part="main"]`
* 🥉 **New bronze filled button:** `button[data-type="filled"]` / `a[role="button"][data-type="filled"]` paints a solid `--md-sys-color-primary` background with `--md-sys-color-on-primary` label and icon (6.47:1 light, 7.74:1 dark, measured in WebKit). Hover and focus add an 8% / 12% on-primary state layer (focus also draws a 2px `--ab-focus-ring` outline); disabled uses Material's on-surface 12% / 38%. Every colour can still be overridden with the `--ab-button-*` variables
* 🎨 **Button icons follow the label colour:** `--material-icon-color` on contained, outlined and text buttons (and their hover / focus states) read the `--ab-button-background-color*` overrides, so an app that set a custom background got an icon the same colour as the background. They now read the matching `--ab-button-text-color*` (label) variables
* 👻 **Text-button focus reads a real variable:** the text-button focus rule read `--ab-button-color-focus`, which nothing defines, for both its label and icon. Both now read `--ab-button-text-color-focus`, like the other button types
* 📱 **Filled follows the mobile size:** the 20px / `8px 16px` mobile button rule now includes `button[data-type="filled"]` (it rendered at 18px)
* Tests: no bare `main` with z-index, the scoped main selectors, the filled base / hover / focus / disabled rules, on-primary-on-primary contrast ≥ 4.5:1 in light and dark, every button `--material-icon-color` reads a `--ab-button-text-color*` variable (disabled excepted), no `--ab-button-color-focus`, filled in the mobile size rule

## [0.3.2](https://github.com/abraham-ukachi/ab-nextjs-theme/compare/v0.3.1...v0.3.2) (2026-10-15)

* 🩹 **Legacy colour aliases are live again:** the section comments in the `[data-theme="light"], .light` and `[data-theme="dark"], .dark` blocks of `css/colors.css` were never closed, so `--primary-container-color` and the other 48 aliases in each block were swallowed and AbButton `contained` rendered **transparent**. The comments are closed, and each alias now points at the live Material token (`--md-sys-color-*` from `light.css` / `dark.css`). The old `--*-color-light` / `--*-color-dark` source values were themselves commented out (an old green palette), so the aliases had nothing to point at
* ♿ **Form entrance respects reduced motion:** the staggered `form > *` fade/slide-in only runs inside `@media (prefers-reduced-motion: no-preference)`, and it no longer hard-sets `opacity: 0` (`backwards` fill instead). Children are visible by default, including when the `fadeIn` / `slideFromDown` keyframes (from the optional `ab-nextjs-animations` peer) aren't loaded
* 🧱 **Only the Ab layout aside is laid out:** the layout `aside` rules (hidden by default, `position: absolute` on phones, 60% width on laptops, `data-opened` / `data-closing`) now target `#appLayout > aside`, `aside.AbAsideLayout` and `aside[data-ab-part="aside"]`, so a plain `<aside>` in content is no longer hidden or absolute-positioned
* ⬆️ **`ab-nextjs-icons ^0.2.3`** (was `^0.1.4`): removes the duplicate icons 0.1.x copy apps got next to the components' 0.2.3. `css/typography.css` still imports `ab-nextjs-icons/css/material-icons.css`, which 0.2.3 ships
* Tests: comment balance + every alias resolves (light + dark), form entrance gated + no hard opacity 0, no bare `aside` layout selector, one icons version in the lockfile. Checked in WebKit: contained button `rgb(255, 220, 189)` light / `rgb(105, 60, 0)` dark (was transparent), form visible under reduced motion and without keyframes, plain `<aside>` static

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
