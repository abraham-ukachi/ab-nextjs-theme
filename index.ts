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
* @name: Theme - abElements
* @file: index.ts
* @type: TypeScript 
* @authors: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1+|> // Import the colors, typography and global styles from the ab-nextjs-theme  
*    -|> import { colors, typography, styles } from 'ab-nextjs-theme';
*    -|> 
*
*/



/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


// import the `Theme` type 
import type { Theme } from './types';


import colors from './colors';
// import typography from './typography';
// import styles from './styles';



// TODO: do something w/ the `colors` here ;)
// TODO: do something w/ the `typography` here ;)
// TODO: do something w/ the `styles` here ;)


// create the ab theme as `abTheme`...

const abTheme: Theme = {
  colors,
  // typography,
  // styles,
};


// export `abTheme` as default...
export default abTheme;

