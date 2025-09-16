# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- This repo is a small Next.js-oriented theme package that ships:
  - CSS tokens and utilities for light/dark and contrast variants (Material 3-style variables).
  - A TypeScript theme object composed from material-theme.json (colors), with planned typography/styles.
- Consumers typically import the aggregated stylesheet (styles.css) to get colors, typography (fonts), icons, and utilities.

Core commands (Windows PowerShell, pnpm)
- Install dependencies
```powershell path=null start=null
pnpm install
```
- Lint the entire repo (auto-fix enabled)
```powershell path=null start=null
pnpm lint
```
- Lint a single file (bypassing the repo-level script’s fixed path)
```powershell path=null start=null
pnpm exec eslint .\colors.ts --ext .ts,.tsx --fix
```
- Tests/build
  - No test runner or build script is configured in this repository. The package is published as-is and consumed by Next.js/bundlers that handle TypeScript and CSS.

Release and publishing
- CI/CD: A GitHub Actions workflow publishes on version tags (vX.Y.Z) pushed to main.
  - Workflow: .github/workflows/publish.yml
  - Environment: Node 20, pnpm 9
  - Steps: install → lint → authenticate → pnpm publish
- How to trigger a release from main
```powershell path=null start=null
# Update version in package.json as needed, commit, then:
git tag v0.2.4
git push origin v0.2.4
```
- Manual local publish (rare; CI is preferred)
```powershell path=null start=null
# Requires valid authentication via your npm token in the environment
pnpm publish --access public
```

Big-picture architecture
- Source of truth for color tokens: material-theme.json
  - Defines core colors and six schemes: light, light-medium-contrast, light-high-contrast, dark, dark-medium-contrast, dark-high-contrast.
- TypeScript theme (runtime object)
  - colors.ts: Builds a Colors object by importing material-theme.json and exposing:
    - seed, core, palettes, plus light/dark and contrast variants (lightM, lightH, darkM, darkH).
  - index.ts: Composes abTheme from colors and exports it as default. Typography/styles are TODOs.
  - types/index.d.ts: Declares Theme, Colors, Typography, and related interfaces (used by consumers for typing).
    - Note: Theme currently marks typography and styles as required, but index.ts only provides colors. Downstream strict type checks may surface this; plan to add typography/styles or mark them optional.
- CSS token system (for UI styling without TS consumption)
  - css/light.css, css/dark.css, css/*-mc.css, css/*-hc.css: Provide Material 3-style tokens as CSS custom properties for each scheme (e.g., --md-sys-color-primary, etc.).
  - css/colors.css: Centralizes imports of the per-scheme files and defines base variables (seed, key colors, a11y colors, opacity constants). It also defines selectors:
    - .light / .dark classes: activate the scheme-specific tokens.
  - css/typography.css: Imports fonts (from ab-nextjs-fonts) and material icons (from ab-nextjs-icons), then sets default text styles and responsive variants.
  - css/styles.css: Global utilities and application-level styles (layout helpers, dialogs, progress bar, visibility helpers) and [data-theme="light|dark"] adjustments for opacities and misc tokens.
  - styles.css (root): Aggregator that imports css/colors.css, css/typography.css, and css/styles.css. This is the single import most consumers should use.
- Dependencies interplay
  - The CSS layer depends on ab-nextjs-fonts and ab-nextjs-icons (both listed in dependencies) via @import statements in css/typography.css.
  - No build/bundling step exists here; consumers compile TS and load CSS.

How to consume the theme
- Import the aggregated stylesheet in your Next.js app (e.g., app/globals.css):
```css path=null start=null
@import 'ab-nextjs-theme/styles.css';
```
- Activate a scheme via DOM class and/or data attribute
  - The M3 tokens are attached via .light or .dark classes.
  - Some utilities (opacities, etc.) are keyed off [data-theme="light|dark"]. It’s fine to set both for complete styling.
```tsx path=null start=null
// In app/layout.tsx or a top-level component
export default function RootLayout({ children }) {
  return (
    <html className="light" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```
- Switching at runtime (example):
```tsx path=null start=null
const toggleTheme = () => {
  const html = document.documentElement;
  const next = html.classList.contains('light') ? 'dark' : 'light';
  html.classList.toggle('light', next === 'light');
  html.classList.toggle('dark', next === 'dark');
  html.setAttribute('data-theme', next);
};
```

Important notes and pitfalls
- No local build step: main points to index.ts and types points to types/index.d.ts. Consumers (e.g., Next.js) should handle TS transpilation; pure Node environments may not.
- Keep CSS and TS colors in sync: colors.ts uses material-theme.json; CSS files (css/*.css) hardcode matching values. When updating material-theme.json, update css/* tokens accordingly.
- Planned expansion: index.ts contains TODOs to add typography and styles into the Theme export; types expect them.

Files to know (high impact)
- index.ts: Exports the abTheme object (currently colors-only).
- colors.ts and material-theme.json: Drive the Theme color definitions and scheme variants.
- styles.css (root) and css/ folder: Aggregated CSS styling surface for consumers.
- .github/workflows/publish.yml: Tag-driven publish to npm.
- .eslintrc.json: TypeScript-aware linting rules; pnpm lint runs eslint . --ext .ts,.tsx --fix.
