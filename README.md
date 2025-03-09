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
| 2 | *`Typography`* | **typography.ts** | [Done](./typography.ts) |
| 3 | *`Styles`* | **styles.ts** | Pending |

> NOTE:


--- 


## CSS

A list of all the supported **css theme** and their current status:

| No. | Name | File | Status |
|:----|:-----|:-----|:-------|
| 1 | *`Colors`* | **css/colors.css** | [Done](./css/colors.css)\* |
| 2 | *`Typography`* | **css/typography.css** | [Done](./css/typography.css)\* |
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
| *`primary`* | **#FCFCFC** | **#855318** | **#FCB975** | Primary |
| *`surfaceTint`* | **-** | **855318** | **#FCB975** | Surface Tint |
| *`onPrimary`* | **#201A17** | **#FFFFFF** | **#4A2800** | On Primary |
| *`primaryContainer`* | **#FFDCBA** | **#FFDCBD** | **#693C00** | Primary Container |
| *`onPrimaryContainer`* | **#2D1600** | **#2C1600** | **#FFDCBD** | On Primary Container |
| *`secondary`* | **#EAC400** | **#6F5D0E** | **#DDC66E** | Secondary |
| *`onSecondary`* | **#3A3000** | **#FFFFFF** | **#3A3000** | On Secondary |
| *`secondaryContainer`* | **#FFE15E** | **#FAE287** | **#544600** | Secondary Container |
| *`onSecondaryContainer`* | **#231B00** | **#221B00** | **#FAE287** | On Secondary Container |
| *`tertiary`* | **#006A6B** | **#006A6A** | **#80D5D4** | Tertiary |
| *`onTertiary`* | **#FFFFFF** | **#FFFFFF** | **#003737** | On Tertiary |
| *`tertiaryContainer`* | **#004F50** | **#9CF1F0** | **#004F50** | Tertiary Container |
| *`onTertiaryContainer`* | **#14FBFB** | **#002020** | **#9CF1F0** | On Tertiary Container |
| *`error`* | **#680003** | **#BA1A1A** | **#FFB4AB** | Error |
| *`onError`* | **#FF897A** | **#FFFFFF** | **#690005** | On Error |
| *`errorContainer`* | **#BA1B1B** | **#FFDAD6** | **#93000A** | Error Container |
| *`onErrorContainer`* | **#FFDAD4** | **#410002** | **#FFDAD6** | On Error Container |
| *`background`* | **#A67C52** | **#FFF8F5** | **#19120C** | Background |
| *`onBackground`* | **#2D1600** | **#211A14** | **#EFE0D5** | On Background |
| *`surface`* | **#A67C52** | **#FFF8F5** | **#19120D** | Surface |
| *`onSurface`* | **#2D1600** | **#221A15** | **#F0DFD7** | On Surface |
| *`surfaceVariant`* | **#755028** | **#F2DFD1** | **#51453A** | Surface Variant |
| *`onSurfaceVariant`* | **#D9AB7F** | **#51453A** | **#D5C3B5** | On Surface Variant |
| *`outline`* | **#392E24** | **#837468** | **#9D8E81** | Outline |
| *`outlineVariant`* | **-** | **D5C3B5** | **#51453A** | Outline Variant |
| *`shadow`* | **-** | **000000** | **#000000** | Shadow |
| *`scrim`* | **-** | **000000** | **#000000** | Scrim |
| *`inverseSurface`* | **#A67C52** | **#382E29** | **#F0DFD7** | Inverse Surface |
| *`inverseOnSurface`* | **#2D1600** | **#FFEDE5** | **#382E29** | Inverse On Surface |
| *`inversePrimary`* | **#A67C52** | **#FCB975** | **#855318** | Inverse Primary |
| *`primaryFixed`* | **-** | **#FFDCBD** | **#FFDCBD** | Primary Fixed |
| *`onPrimaryFixed`* | **-** | **#2C1600** | **#2C1600** | On Primary Fixed |
| *`primaryFixedDim`* | **-** | **#FCB975** | **#FCB975** | Primary Fixed Dim |
| *`onPrimaryFixedVariant`* | **-** | **#693C00** | **#693C00** | On Primary Fixed Variant |
| *`secondaryFixed`* | **-** | **#FAE287** | **#FAE287** | Secondary Fixed |
| *`onSecondaryFixed`* | **-** | **#221B00** | **#221B00** | On Secondary Fixed |
| *`secondaryFixedDim`* | **-** | **#DDC66E** | **#DDC66E** | Secondary Fixed Dim |
| *`onSecondaryFixedVariant`* | **-** | **#544600** | **#544600** | On Secondary Fixed Variant |
| *`tertiaryFixed`* | **-** | **#9CF1F0** | **#9CF1F0** | Tertiary Fixed |
| *`onTertiaryFixed`* | **-** | **#002020** | **#002020** | On Tertiary Fixed |
| *`tertiaryFixedDim`* | **-** | **#80D5D4** | **#80D5D4** | Tertiary Fixed Dim |
| *`onTertiaryFixedVariant`* | **-** | **#004F50** | **#004F50** | On Tertiary Fixed Variant |
| *`surfaceDim`* | **-** | **#E7D7CF** | **#19120D** | Surface Dim |
| *`surfaceBright`* | **-** | **#FFF8F5** | **#413731** | Surface Bright |
| *`surfaceContainerLowest`* | **-** | **#FFFFFF** | **#140D08** | Surface Container Lowest |
| *`surfaceContainerLow`* | **-** | **#FFF1EA** | **#221A15** | Surface Container Low |
| *`surfaceContainer`* | **-** | **#FCEBE2** | **#261E19** | Surface Container |
| *`surfaceContainerHigh`* | **-** | **#F6E5DC** | **#312823** | Surface Container High |
| *`surfaceContainerHighest`* | **-** | **#F0DFD7** | **#3D332D** | Surface Container Highest |

> NOTE: The Classic Theme ⭐️ was manually created for the `AbTheme`, This is an addition to the [dynamic color](https://m3.material.io/styles/color/dynamic-color/overview) requirements from [Material Design 3](https://m3.material.io/).


#### Medium Contast

| Name | Classic ⭐️ | Light ☀️ | Dark 🌑 | Role |
|:-----|:-----------|:--------|:--------|:-----|
| *`primary`* | **-** | **#633900** | **#FFBE7C** | Primary |
| *`surfaceTint`* | **-** | **#855318** | **#FCB975** | Surface Tint |
| *`onPrimary`* | **-** | **#FFFFFF** | **#251200** | On Primary |
| *`primaryContainer`* | **-** | **#9F692C** | **#BF8445** | Primary Container |
| *`onPrimaryContainer`* | **-** | **#FFFFFF** | **#000000**  | On Primary Container |
| *`secondary`* | **-** | **#504200** | **#E1CA72** | Secondary |
| *`onSecondary`* | **-** | **#FFFFFF** | **#1C1600** | On Secondary |
| *`secondaryContainer`* | **-** | **#867325** | **#A4903E** | Secondary Container |
| *`onSecondaryContainer`* | **-** | **#FFFFFF** | **#000000** | On Secondary Container |
| *`tertiary`* | **-** | **#004B4B** | **#84D9D8** | Tertiary |
| *`onTertiary`* | **-** | **#FFFFFF** | **#001A1A** | On Tertiary |
| *`tertiaryContainer`* | **-** | **#238181** | **#479E9D** | Tertiary Container |
| *`onTertiaryContainer`* | **-** | **#FFFFFF** | **#000000** | On Tertiary Container |
| *`error`* | **-** | **#8C0009** | **#FFBAB1** | Error |
| *`onError`* | **-** | **#FFFFFF** | **#370001** | On Error |
| *`errorContainer`* | **-** | **#DA342E** | **#FF5449** | Error Container |
| *`onErrorContainer`* | **-** | **#FFFFFF** | **#000000** | On Error Container |
| *`background`* | **-** | **#FFF8F5** | **#19120C** | Background |
| *`onBackground`* | **-** | **#211A14** | **#EFE0D5** | On Background |
| *`surface`* | **-** | **#FFF8F5** | **#19120D** | Surface |
| *`onSurface`* | **-** | **#221A15** | **#FFFAF8** | On Surface |
| *`surfaceVariant`* | **-** | **#F2DFD1** | **#51453A** | Surface Variant |
| *`onSurfaceVariant`* | **-** | **#4C4136** | **#D9C8B9** | On Surface Variant |
| *`outline`* | **-** | **#6A5D51** | **#B0A093** | Outline |
| *`outlineVariant`* | **-** | **#87786C** | **#8F8074** | Outline Variant |
| *`shadow`* | **-** | **#000000** | **#000000** | Shadow |
| *`scrim`* | **-** | **#000000** | **#000000** | Scrim |
| *`inverseSurface`* | **-** | **#382E29** | **#F0DFD7** | Inverse Surface |
| *`inverseOnSurface`* | **-** | **#FFEDE5** | **#312823** | Inverse On Surface |
| *`inversePrimary`* | **-** | **#FCB975** | **#6A3D01** | Inverse Primary |
| *`primaryFixed`* | **-** | **#9F692C** | **#FFDCBD** | Primary Fixed |
| *`onPrimaryFixed`* | **-** | **#FFFFFF** | **#1E0D00** | On Primary Fixed |
| *`primaryFixedDim`* | **-** | **#825115** | **#FCB975** | Primary Fixed Dim |
| *`onPrimaryFixedVariant`* | **-** | **#FFFFFF** | **#522E00** | On Primary Fixed Variant |
| *`secondaryFixed`* | **-** | **#867325** | **#FAE287** | Secondary Fixed |
| *`onSecondaryFixed`* | **-** | **#FFFFFF** | **#161100** | On Secondary Fixed |
| *`secondaryFixedDim`* | **-** | **#6C5B0B** | **#DDC66E** | Secondary Fixed Dim |
| *`onSecondaryFixedVariant`* | **-** | **#FFFFFF** | **#413500** | On Secondary Fixed Variant |
| *`tertiaryFixed`* | **-** | **#238181** | **#9CF1F0** | Tertiary Fixed |
| *`onTertiaryFixed`* | **-** | **#FFFFFF** | **#001414** | On Tertiary Fixed |
| *`tertiaryFixedDim`* | **-** | **#006767** | **#80D5D4** | Tertiary Fixed Dim |
| *`onTertiaryFixedVariant`* | **-** | **#FFFFFF** | **#003D3D** | On Tertiary Fixed Variant |
| *`surfaceDim`* | **-** | **#E7D7CF** | **#19120D** | Surface Dim |
| *`surfaceBright`* | **-** | **#FFF8F5** | **#413731** | Surface Bright |
| *`surfaceContainerLowest`* | **-** | **#FFFFFF** | **#140D08** | Surface Container Lowest |
| *`surfaceContainerLow`* | **-** | **#FFF1EA** | **#221A15** | Surface Container Low |
| *`surfaceContainer`* | **-** | **#FCEBE2** | **#261E19** | Surface Container |
| *`surfaceContainerHigh`* | **-** | **#F6E5DC** | **#312823** | Surface Container High |
| *`surfaceContainerHighest`* | **-** | **#F0DFD7** | **#3D332D** | Surface Container Highest |

> NOTE: 


#### High Contrast

| Name | Classic ⭐️ | Light ☀️ | Dark 🌑 | Role |
|:-----|:-----------|:--------|:--------|:-----|
| *`primary`* | **-** | **#361C00** | **#FFFAF8** | Primary |
| *`surfaceTint`* | **-** | **#855318** | **#FCB975** | Surface Tint |
| *`onPrimary`* | **-** | **#FFFFFF** | **#000000** | On Primary |
| *`primaryContainer`* | **-** | **#633900** | **#FFBE7C** | Primary Container |
| *`onPrimaryContainer`* | **-** | **#FFFFFF** | **#000000**  | On Primary Container |
| *`secondary`* | **-** | **#2A2200** | **#FFFAF5** | Secondary |
| *`onSecondary`* | **-** | **#FFFFFF** | **#000000** | On Secondary |
| *`secondaryContainer`* | **-** | **#504200** | **#E1CA72** | Secondary Container |
| *`onSecondaryContainer`* | **-** | **#FFFFFF** | **#000000** | On Secondary Container |
| *`tertiary`* | **-** | **#002727** | **#EAFFFE** | Tertiary |
| *`onTertiary`* | **-** | **#FFFFFF** | **#000000** | On Tertiary |
| *`tertiaryContainer`* | **-** | **#004B4B** | **#84D9D8** | Tertiary Container |
| *`onTertiaryContainer`* | **-** | **#FFFFFF** | **#000000** | On Tertiary Container |
| *`error`* | **-** | **#4E0002** | **#FFF9F9** | Error |
| *`onError`* | **-** | **#FFFFFF** | **#000000** | On Error |
| *`errorContainer`* | **-** | **#8C0009** | **#FFBAB1** | Error Container |
| *`onErrorContainer`* | **-** | **#FFFFFF** | **#000000** | On Error Container |
| *`background`* | **-** | **#FFF8F5** | **#19120C** | Background |
| *`onBackground`* | **-** | **#211A14** | **#EFE0D5** | On Background |
| *`surface`* | **-** | **#FFF8F5** | **#19120D** | Surface |
| *`onSurface`* | **-** | **#000000** | **#FFFFFF** | On Surface |
| *`surfaceVariant`* | **-** | **#F2DFD1** | **#51453A** | Surface Variant |
| *`onSurfaceVariant`* | **-** | **#2C2219** | **#FFFAF8** | On Surface Variant |
| *`outline`* | **-** | **#4C4136** | **#D9C8B9** | Outline |
| *`outlineVariant`* | **-** | **#4C4136** | **#D9C8B9** | Outline Variant |
| *`shadow`* | **-** | **#000000** | **#000000** | Shadow |
| *`scrim`* | **-** | **#000000** | **#000000** | Scrim |
| *`inverseSurface`* | **-** | **#382E29** | **#F0DFD7** | Inverse Surface |
| *`inverseOnSurface`* | **-** | **#FFFFFF** | **#000000** | Inverse On Surface |
| *`inversePrimary`* | **-** | **#FFE8D5** | **#412300** | Inverse Primary |
| *`primaryFixed`* | **-** | **#633900** | **#FFE2C8** | Primary Fixed |
| *`onPrimaryFixed`* | **-** | **#FFFFFF** | **#000000** | On Primary Fixed |
| *`primaryFixedDim`* | **-** | **#442500** | **#FFBE7C** | Primary Fixed Dim |
| *`onPrimaryFixedVariant`* | **-** | **#FFFFFF** | **#251200** | On Primary Fixed Variant |
| *`secondaryFixed`* | **-** | **#504200** | **#FFE68B** | Secondary Fixed |
| *`onSecondaryFixed`* | **-** | **#FFFFFF** | **#000000** | On Secondary Fixed |
| *`secondaryFixedDim`* | **-** | **#362C00** | **#E1CA72** | Secondary Fixed Dim |
| *`onSecondaryFixedVariant`* | **-** | **#FFFFFF** | **#1C1600** | On Secondary Fixed Variant |
| *`tertiaryFixed`* | **-** | **#004B4B** | **#A0F5F5** | Tertiary Fixed |
| *`onTertiaryFixed`* | **-** | **#FFFFFF** | **#000000** | On Tertiary Fixed |
| *`tertiaryFixedDim`* | **-** | **#003333** | **#84D9D8** | Tertiary Fixed Dim |
| *`onTertiaryFixedVariant`* | **-** | **#FFFFFF** | **#001A1A** | On Tertiary Fixed Variant |
| *`surfaceDim`* | **-** | **#E7D7CF** | **#19120D** | Surface Dim |
| *`surfaceBright`* | **-** | **#FFF8F5** | **#413731** | Surface Bright |
| *`surfaceContainerLowest`* | **-** | **#FFFFFF** | **#140D08** | Surface Container Lowest |
| *`surfaceContainerLow`* | **-** | **#FFF1EA** | **#221A15** | Surface Container Low |
| *`surfaceContainer`* | **-** | **#FCEBE2** | **#261E19** | Surface Container |
| *`surfaceContainerHigh`* | **-** | **#F6E5DC** | **#312823** | Surface Container High |
| *`surfaceContainerHighest`* | **-** | **#F0DFD7** | **#3D332D** | Surface Container Highest |

> NOTE: 

---

#### Custom

> NOTE: Custom theme colors for `AbTheme` will be displayed or added here.


### Tonal palettes

> A tonal palette consists of thirteen tones, including white and black. A tone value of 100 is equivalent to the idea of light at its maximum and results in white. Every tone value between 0 and 100 expresses the amount of light present in the color.


| Tone | Primary | Secondary | Tertiary | Error | Neutral | Neutral Variant |
|:----|:-----|:------|:------|:-------|:--------|:--------|
| **0** | #000000 | #000000 | #000000 | #000000 | #000000 | #000000 |
| **5** | #1D0D00 | #161000 | #001414 | #000000 | #121110 | #15100C |
| **10** | #2C1600 | #221B00 | #002020 | #410001 | #1C1B1B | #201B16 |
| **15** | #3B1F00 | #2E2500 | #002B2B | #410001 | #272525 | #2A2520 |
| **20** | #472A06 | #3A3000 | #003737 | #680003 | #313030 | #352F2A |
| **25** | #543411 | #473A00 | #004343 | #680003 | #3D3B3A | #413A35 |
| **30** | #61401B | #544600 | #004F50 | #930006 | #484646 | #4C4540 |
| **35** | #6E4B25 | #625100 | #005C5C | #930006 | #545251 | #58514B |
| **40** | #7C5730 | #705D00 | #006A6A | #ba1b1b | #605E5D | #655D57 |
| **50** | #976F46 | #8C7500 | #008585 | #dd3730 | #797676 | #7E766F |
| **60** | #B4885D | #AA8F00 | #00A1A1 | #ff5449 | #93908F | #988F88 |
| **70** | #D1A275 | #C9A900 | #00BEBE | #ff897a | #AEAAA9 | #B3A9A2 |
| **80** | #EEBD8E | #E9C400 | #00DDDD | #ffb4a9 | #CAC6C4 | #CFC5BD |
| **90** | #FFDCBD | #FCE17B | #8FF3F2 | #ffdad4 | #E6E1E0 | #ECE0D9 |
| **95** | #FFEEE0 | #FFF0C2 | #ADFFFE | #ffede9 | #F4F0EE | #FAEFE7 |
| **98** | #FFF8F5 | #FFF9EF | #E2FFFE | #FFEDE9 | #FDF8F7 | #FFF8F5 |
| **99** | #FFFBFF | #FFFBFF | #F1FFFE | #FCFCFC | #FFFBFF | #FFFBFF |
| **100** | #FFFFFF | #FFFFFF | #FFFFFF | #ffffff | #FFFFFF | #FFFFFF |

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



## TODOs

- [x] Update/sync the [Theme](#Theme) with the current [material-theme.json](./material-theme.json) data.
- [x] Update/sync the [Medium Contrast](#Medium-Contrast) with the current [material-theme.json](./material-theme.json) data.
- [x] Update/sync the [High Contrast](#High-Contrast) with the current [material-theme.json](./material-theme.json) data.
- [ ] Complete the Classic theme (including in the [material-theme.json](./material-theme.json) data).

## License

This **`ab-nextjs-theme`** project is [MIT Licensed](./LICENSE) ;)



