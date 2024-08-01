<p align="center">
  <!-- Ab - Logo - Light Mode --> 
  <a href="https://abraham-ukachi.vercel.app/#gh-light-mode-only" target="_blank">
    <img src="./.github/ab-logo-light.svg" alt="Ab Logo on Light" width="64" height="64" />
  </a>

  <!-- Ab - Logo - Dark Mode --> 
  <a href="https://abraham-ukachi.vercel.app/#gh-dark-mode-only" target="_blank">
    <img src="./.github/ab-logo-dark.svg" alt="Ab Logo on Dark" width="64" height="64" />
  </a>

  <!-- Next.js - Logo Name - Light Mode -->
  <a href="https://nextjs.org/#gh-light-mode-only" target="_blank">
    <img src="./.github/nextjs-logoname-light.svg" alt="Next.js LogoName on Light" width="192" height="64" />
  </a>

  <!-- Next.js - Logo Name - Dark Mode -->
  <a href="https://nextjs.org/#gh-dark-mode-only" target="_blank">
    <img src="./.github/nextjs-logoname-dark.svg" alt="Next.js LogoName on Dark" width="192" height="64" />
  </a>

</p>


<p align="center">
    <a href="https://ab-elements.vercel.app/docs/theme" target="_blank"><b>Checkout abElements &rarr;</b></a>
</p>


# `ab-nextjs-theme`

> IMPORTANT: This is a work in progress and subject to major changes until version 1.0.


🎨 This is a lightweight collection of client React components as theme abElements created by [Abraham Ukachi](https://github.com/abraham-ukachi), and optimized for [Next.js](https://nextjs.org/docs) applications 😎. 



## Getting Started

### Installation

#### npm

```bash
npm i ab-nextjs-theme 
```

#### pnpm

```bash
pnpm install ab-nextjs-theme 
```

---


## Tailwind

A list of all the supported **tailwind theme** and their current status:

| No. | Name | File | Status |
|:----|:-----|:-----|:-------|
| 1 | *`Colors`* | **colors.ts** | [Done](./colors.ts) |
| 2 | *`Typography`* | **typography.ts** | Pending |
| 3 | *`Styles`* | **styles.ts** | Pending |

> NOTE:


--- 


## CSS

A list of all the supported **css theme** and their current status:

| No. | Name | File | Status |
|:----|:-----|:-----|:-------|
| 1 | *`Colors`* | **css/colors.css** | *In progress* |
| 2 | *`Typography`* | **css/typography.css** | Pending |
| 3 | *`Styles`* | **css/styles.css** | Pending |

> NOTE:


### Usage

Import the main **`styles.css`** (from root folder) in your *`globals.css`*

```css
@import 'ab-nextjs-theme/styles.css';
```

> NOTE: 


---

## Color scheme

### Key colors

| Name | Color (HEX) | Codename |
|:-------|:-------|:----------|
| Primary Color | **#A67C52** | Melanin |
| Secondary Color | **#FFD700** | Gold |
| Tertiary Color | **#21FFFF** | Cyan |
| Neutral Color | **#211A16** | Mud |

> NOTE: These key colors - also refered to as **seeds** - were used in the [Material Theme Builder](https://m3.material.io/theme-builder#/dynamic) to generate `AbTheme`'s [M3 Baseline color scheme](https://m3.material.io/styles/color/the-color-system/tokens). However, the codenames are specific to this App :)


### Accessibility colors

| Name | Color (HEX) |
|:-------|:--------------|
| P-Light | **#D9AB7F** |
| P-Dark | **#755028** |
| S-Light | **#FFFF52** |
| S-Dark | **#C7A600** |
| Text On Primary | **#2D1600** |
| Text On Secondary | **#000000** |

> NOTE: These accessibility (a11y) colors were generated using Google's [Color Tool](https://material.io/resources/color/#!/?view.left=1&view.right=1&primary.color=a67c52&secondary.color=ffd700&primary.text.color=000000) with `AbTheme`'s Primary & Secondary colors. *`P-Light`* and *`S-Light`* are short for **Primary Light** and **Secondary Light** color respectively.



### Theme

> The Ab Theme consists of three parts, namely Classic, Light and Dark Theme.

| Name | Classic ⭐️ | Light ☀️ | Dark 🌑 | Role |
|:-----|:-----------|:---------|:---------|:------------|
| *`primary`* | **#FCFCFC** | **#8B5000** | **#FFB86B** | Primary |
| *`onPrimary`* | **#201A17** | **#FFFFFF** | **#4A2800** | On Primary |
| *`primaryContainer`* | **#FFDCBA** | **#FFDCBA** | **#6A3C00** | Primary Container |
| *`onPrimaryContainer`* | **#2D1600** | **#2D1600** | **#FFDCBA** | On Primary Container |
| *`secondary`* | **#EAC400** | **#715D00** | **#EAC400** | Secondary |
| *`onSecondary`* | **#3A3000** | **#FFFFFF** | **#3A3000** | On Secondary |
| *`secondaryContainer`* | **#FFE15E** | **#FFE15E** | **#554600** | Secondary Container |
| *`onSecondaryContainer`* | **#231B00** | **#231B00** | **#FFE15E** | On Secondary Container |
| *`tertiary`* | **#006A6B** | **#006A6B** | **#02DCDC** | Tertiary |
| *`onTertiary`* | **#FFFFFF** | **#FFFFFF** | **#003738** | On Tertiary |
| *`tertiaryContainer`* | **#004F50** | **#14FBFB** | **#004F50** | Tertiary Container |
| *`onTertiaryContainer`* | **#14FBFB** | **#002020** | **#14FBFB** | On Tertiary Container |
| *`error`* | **#680003** | **#BA1B1B** | **#FFB4A9** | Error |
| *`errorContainer`* | **#BA1B1B** | **#FFDAD4** | **#930006** | Error Container |
| *`onError`* | **#FF897A** | **#FFFFFF** | **#680003** | On Error |
| *`onErrorContainer`* | **#FFDAD4** | **#410001** | **#FFDAD4** | On Error Container |
| *`background`* | **#A67C52** | **#FCFCFC** | **#201A17** | Background |
| *`onBackground`* | **#2D1600** | **#201A17** | **#ECE0DB** | On Background |
| *`surface`* | **#A67C52** | **#FCFCFC** | **#201A17** | Surface |
| *`onSurface`* | **#2D1600** | **#201A17** | **#ECE0DB** | On Surface |
| *`surfaceVariant`* | **#755028** | **#F2DFD1** | **#51453A** | Surface Variant |
| *`onSurfaceVariant`* | **#D9AB7F** | **#51453A** | **#D4C3B5** | On Surface Variant |
| *`outline`* | **#392E24** | **#837569** | **#9E8E81** | Outline |
| *`inverseOnSurface`* | **#2D1600** | **#FAEEE8** | **#201A17** | Inverse On Surface |
| *`inverseSurface`* | **#A67C52** | **#362F2B** | **#ECE0DB** | Inverse Surface |
| *`primaryInverse`* | **#A67C52** | **#FFB86B** | **#8B5000** | Primary Inverse |

> NOTE: The Classic Theme ⭐️ was manually created for the `AbTheme`, This is an addition to the [dynamic color](https://m3.material.io/styles/color/dynamic-color/overview) requirements from [Material Design 3](https://m3.material.io/).
> *`primaryInverse`* was used in the **`colors.xml`** file, which differs from the **Inverse Primary** "Role" mentioned in the [Baseline color scheme tokens](https://m3.material.io/styles/color/the-color-system/tokens) page.



#### Custom

> NOTE: Custom theme colors for `AbTheme` will be displayed or added here.


### Tonal palettes

> A tonal palette consists of thirteen tones, including white and black. A tone value of 100 is equivalent to the idea of light at its maximum and results in white. Every tone value between 0 and 100 expresses the amount of light present in the color.


| Tone | Primary | Secondary | Tertiary | Error | Neutral | Neutral Variant |
|:----|:-----|:------|:------|:-------|:--------|:--------|
| **0** | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 |
| **10** | #2d1600 | #231b00 | #002020 | #410001 | #201a17 | #231a11 |
| **20** | #4a2800 | #3a3000 | #003738 | #680003 | #362f2b | #392e24 |
| **30** | #6a3c00 | #554600 | #004f50 | #930006 | #4d4541 | #51453a |
| **40** | #8b5000 | #715d00 | #006a6b | #ba1b1b | #655d59 | #695c51 |
| **50** | #ac6604 | #8d7500 | #008586 | #dd3730 | #7e7571 | #837569 |
| **60** | #cb7f24 | #ab8e00 | #00a1a2 | #ff5449 | #998f8a | #9e8e81 |
| **70** | #ea993d | #caa800 | #00bebe | #ff897a | #b4a9a4 | #b9a89b |
| **80** | #ffb86b | #eac400 | #02dcdc | #ffb4a9 | #d0c4bf | #d4c3b5 |
| **90** | #ffdcba | #ffe15e | #14fbfb | #ffdad4 | #ece0db | #f2dfd1 |
| **95** | #ffeedf | #fff0bb | #a9ffff | #ffede9 | #faeee8 | #ffeddf |
| **99** | #fcfcfc | #fffbf7 | #efffff | #fcfcfc | #fcfcfc | #fcfcfc |
| **100** | #ffffff | #ffffff | #ffffff | #ffffff | #ffffff | #ffffff |

> NOTE: These tonal palettes were generated by [Material Theme Builder](https://material-foundation.github.io/material-theme-builder).



## Typography

### Roboto

| Name | Type | Size | Character | Line | Paragraph |
|:-----|:-----|:-----|:----------|:-----|:----------|
| *`H1`* | Light | 96 | -1.5 | 112 | 0 |
| *`H2`* | Light | 60 | -0.5 | 71 | 0 |
| *`H3`* | Regular | 48 | *auto* | 57 | 0 |
| *`H4`* | Regular | 34 | 0.25 | 40 | 0 |
| *`H5`* | Regular | 24 | *auto* | 28 | 0 |
| *`H6`* | Medium | 20 | 0.25 | 24 | 0 |
| *`Body 1`* | Regular | 16 | 0.5 | 28 | 0 |
| *`Body 2`* | Regular | 14 | 0.25 | 20 | 0 |
| *`Subtitle 1`* | Regular | 16 | 0.15 | 24 | 0 |
| *`Subtitle 2`* | Medium | 14 | 0.1 | 24 | 0 |
| *`Button`* | Medium | 14 | 1.25 | 16 | 0 |
| *`Caption`* | Regular | 12 | 0.4 | 16 | 0 |
| *`Overline`* | Medium | 12 | 2 | 16 | 0 |

> NOTE: Character = Letter Spacing & Line = Height




## Shape

The supported shapes are **Circle** ⚪️, **Square** ◻️ and **Squircle** ⏺ .



## Shadow

| Elevation | X | Y | Blur | Spread |
|:----------|:--|:--|:-----|:-------|
| *`01dp-1`* | 0 | 1 | 1 | 0 |
| *`01dp-2`* | 0 | 2 | 1 | -1 |
| *`01dp-3`* | 0 | 1 | 3 | 0 |
| *`02dp-1`* | 0 | 2 | 2 | 0 |
| *`02dp-2`* | 0 | 3 | 1 | -2 |
| *`02dp-3`* | 0 | 1 | 5 | 0 |
| *`03dp-1`* | 0 | 3 | 4 | 0 |
| *`03dp-2`* | 0 | 3 | 3 | -2 |
| *`03dp-3`* | 0 | 1 | 8 | 0 |
| *`04dp-1`* | 0 | 4 | 5 | 0 |
| *`04dp-2`* | 0 | 1 | 10 | 0 |
| *`04dp-3`* | 0 | 2 | 4 | -1 |
| *`06dp-1`* | 0 | 6 | 10 | 0 |
| *`06dp-2`* | 0 | 1 | 18 | 0 |
| *`06dp-3`* | 0 | 3 | 5 | -1 |
| *`08dp-1`* | 0 | 8 | 10 | 1 |
| *`08dp-2`* | 0 | 3 | 14 | 2 |
| *`08dp-3`* | 0 | 5 | 5 | -3 |
| *`09dp-1`* | 0 | 9 | 12 | 1 |
| *`09dp-2`* | 0 | 3 | 16 | 2 |
| *`09dp-3`* | 0 | 5 | 6 | -3 |
| *`12dp-1`* | 0 | 12 | 17 | 2 |
| *`12dp-2`* | 0 | 5 | 22 | 4 |
| *`12dp-3`* | 0 | 7 | 8 | -4 |
| *`16dp-1`* | 0 | 16 | 24 | 2 |
| *`16dp-2`* | 0 | 6 | 30 | 5 |
| *`16dp-3`* | 0 | 8 | 10 | -5 |
| *`24dp-1`* | 0 | 24 | 38 | 3 |
| *`24dp-2`* | 0 | 9 | 46 | 8 |
| *`24dp-3`* | 0 | 11 | 15 | -7 |

> NOTE:
---

## Learn More abElements

To learn more about **`abElements`**, take a look at the following resources:

- [abElements Documentation](https://ab-elements.vercel.app/docs) - learn about `abElements` features and API.
- [abElements Animations](https://ab-elements.vercel.app/docs/animations) - learn about **animations** in `abElements`.
- [abElements Core](https://ab-elements.vercel.app/docs/core) - learn about **core** in `abElements`.
- [abElements Theme](https://ab-elements.vercel.app/docs/theme) - learn about **theme** in `abElements`.
- [abElements Icons](https://ab-elements.vercel.app/docs/icons) - learn about **icons** in `abElements`.
- [abElements Components](https://ab-elements.vercel.app/docs/components) - learn about **components** in `abElements`. 
- [abElements Fonts](https://ab-elements.vercel.app/docs/fonts) - learn about **fonts** in `abElements`. 
- [abElements Hooks](https://ab-elements.vercel.app/docs/hooks) - learn about **hooks** in `abElements`. 

You can check out [the abElements GitHub repository](https://github.com/abraham-ukachi/ab-elements-app) for more details.


## License

This **`ab-nextjs-theme`** project is [MIT Licensed](./LICENSE) ;)



