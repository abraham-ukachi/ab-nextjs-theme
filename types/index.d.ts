/* 
* @license MIT
* ~~~~~~~~~~~~
* ab-nextjs-theme 
* ~~~~~~~~~~~~
* Copyright (c) 2024 Abraham Ukachi. The abElements Project.
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
*
* @project: ab-nextjs-tion
* @name: Types - Theme  
* @file: index.d.ts
* @type: TS Types 
* @authors: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*
*   1+|> //  
*    -|>
*/



/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: I'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/









////////////////////////////
/// PALETTES - interface ///
////////////////////////////

export interface Palettes {
  primary: Record<string, string>;
  secondary: Record<string, string>;
  tertiary: Record<string, string>;
  error?: Record<string, string>;
  neutral: Record<string, string>;
  neutralVariant: Record<string, string>;
}




///////////////////////////////
/// CORE COLORS - interface ///
///////////////////////////////

export interface CoreColors {
  primary: string;
  secondary: string;
  tertiaty: string;
  error: string;
  neutral: string;
  neutralVariant?: string;
}



/////////////////////////////////
/// SCHEME COLORS - interface ///
/////////////////////////////////

/**
 * Scheme Colors - interface
 *
 * @description The color scheme of the abElements theme. 
 * Supported schemes are `light`, `dark`, `lightM`, `lightH`, `darkM`, `darkH`. 
 * where `M` stands for `Medium` contrast and `H` stands for `High` contrast.
 */
export interface SchemeColors {

  // Primary
  primary: string;
  surfaceTint: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  // Secondary
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  // Tertiary
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  // Error
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  // Background
  background: string;
  onBackground: string;
  // Surface
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  // Outline
  outline: string;
  outlineVariant: string;
  // Shadow + Scrim
  shadow: string;
  scrim: string;
  // Inverse
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;

  // Fixed - Primary
  primaryFixed: string;
  onPrimaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixedVariant: string;
  // Fixed - Secondary
  secondaryFixed: string;
  onSecondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixedVariant: string;
  // Fixed - Tertiary
  tertiaryFixed: string;
  onTertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixedVariant: string;
  // Fixed - Surface
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  
}




//////////////////////////
/// COLORS - interface ///
//////////////////////////

// Colors - interface
export interface Colors extends SchemeColors {
  seed: string;
  core: CoreColors;

  // TODO: classic: SchemeColors;
  // TODO: classicM: SchemeColors;
  // TODO: classicH: SchemeColors;

  // light + medium & high contrast
  light: SchemeColors;
  lightM?: SchemeColors;
  lightH?: SchemeColors;
  
  // dark + medium & high contrast
  dark: SchemeColors;
  darkM: SchemeColors;
  darkH: SchemeColors;

  palettes: Palettes;
}







////////////////////////////
/// AB THEME - interface ///
////////////////////////////

export interface Theme {
  colors: Colors;
  typography: any;
  styles: any;
}


