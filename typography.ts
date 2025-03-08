/* 
* @license MIT
* ~~~~~~~~~~~~
* ab-nextjs-theme
* ~~~~~~~~~~~~
* Copyright (c) 2024 Abraham Ukachi. The abElements Contributors.
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
* @name: Typography - Theme - abElements
* @file: typography.ts
* @type: Javascript
* @authors: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1+|> 
*    -|>
*
*/


import type { 
  Palettes,
  CoreTypography,
  SchemeTypography,
  Typography,

} from "./types";


// import the `material-theme.json` file as `mt`
import mt from "./material-theme.json"


// Palettes

const palettes: Palettes = {
  primary: mt.palettes.primary,
  secondary: mt.palettes.secondary,
  tertiary: mt.palettes.tertiary,
  error: mt.palettes.error,
  neutral: mt.palettes.neutral,
  neutralVariant: mt.palettes['neutral-variant'],
};


// Core Typography
const coreTypography: CoreTypography = {
  primary: mt.coreTypography.primary,
  secondary: mt.coreTypography.secondary,
  tertiary: mt.coreTypography.tertiary,
  error: mt.coreTypography.error,
  neutral: mt.coreTypography.neutral,
};


// TODO: Create a Classic - Scheme

// Light - Scheme
const lightScheme: SchemeTypography = {...mt.schemes.light};
// Light Medium Contrast - Scheme
const lightMediumContrastScheme: SchemeTypography = {...mt.schemes['light-medium-contrast']};
// Light High Contrast - Scheme
const lightHighContrastScheme: SchemeTypography = {...mt.schemes['light-high-contrast']};


// Dark - Scheme
const darkScheme: SchemeTypography = {...mt.schemes.dark};
// Dark Medium Contrast - Scheme
const darkMediumContrastScheme: SchemeTypography = {...mt.schemes['dark-medium-contrast']};
// Dark High Contrast - Scheme
const darkHighContrastScheme: SchemeTypography = {...mt.schemes['dark-high-contrast']};




/**
 * Create a color palette for this `abElements` project as `abTypography`
 */
const abTypography: Typography = {
  ...lightScheme, // default
  
  // seed
  seed: mt.seed,
  // core colors
  core: coreTypography,
  

  // TODO: create classic - Mode

  // light mode + medium & high contrasts
  light: lightScheme,
  lightM: lightMediumContrastScheme,
  lightH: lightHighContrastScheme,

  // dark mode + medium & high contrasts
  dark: darkScheme,
  darkM: darkMediumContrastScheme,
  darkH: darkHighContrastScheme,

  
  // palettes
  palettes,
};


// export `abTypography` as default
export default ab;
// module.exports = abTypography;
