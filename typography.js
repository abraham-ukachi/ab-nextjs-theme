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
* @project: ab-nextjs-theme
* @name: Typography - Theme
* @file: typography.js
* @type: JavaScript File
* @authors: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1+|> 
*    -|>
*
*/



// Font Families
const fontFamily = {

  sans: [ 'Inter' ],
  'sans-extralight': [ 'Inter-ExtraLight' ],
  'sans-light': [ 'Inter-Light' ],
  'sans-regular': [ 'Inter-Regular' ],
  'sans-medium': [ 'Inter-Medium' ],
  'sans-semibold': [ 'Inter-SemiBold' ],
  'sans-bold': [ 'Inter-Bold' ],
  'sans-extrabold': [ 'Inter-ExtraBold' ],
  'sans-black': [ 'Inter-Black' ],


  serif: [ 'QuickSand' ],
  'serif-light': [ 'QuickSand-Light' ],
  'serif-regular': [ 'QuickSand-Regular' ],
  'serif-medium': [ 'QuickSand-Medium' ],
  'serif-semibold': [ 'QuickSand-SemiBold' ],
  'serif-bold': [ 'QuickSand-Bold' ],

  mono: [ 'ZillaSlab' ],
  'mono-light': [ 'ZillaSlab-Light' ],
  'mono-regular': [ 'ZillaSlab-Regular' ],
  'mono-bold': [ 'ZillaSlab-Bold' ],

  roboto: [ 'Roboto' ],
  'roboto-light': [ 'Roboto-Light' ],
  'roboto-regular': [ 'Roboto-Regular' ],
  'roboto-bold': [ 'Roboto-Bold' ],
  'roboto-medium': [ 'Roboto-Medium' ],
  'roboto-black': [ 'Roboto-Black' ],


  mulish: [ 'Mulish' ],
  'mulish-extralight': [ 'Mulish-ExtraLight' ],
  'mulish-light': [ 'Mulish-Light' ],
  'mulish-regular': [ 'Mulish-Regular' ],
  'mulish-medium': [ 'Mulish-Medium' ],
  'mulish-semibold': [ 'Mulish-SemiBold' ],
  'mulish-bold': [ 'Mulish-Bold' ],
  'mulish-extrabold': [ 'Mulish-ExtraBold' ],
  'mulish-black': [ 'Mulish-Black' ],
};


// Font Sizes
// WARNING: The caption size was created for testing purposes only
// TODO: Remove caption font size
const fontSize = {
  caption: [ '0.75rem', {
    lineHeight: '1rem',
    letterSpacing: '0.03333em',
    fontWeight: '400',
  } ],
};






/**
 * Create a color palette for this `ab-elements` project as `abColors`
 */
const abTypography = {
  fontFamily,
  fontSize,
};


// export `abTypography` as default
export default abTypography;
