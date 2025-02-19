/**
 * @module styled
 * @description Type declarations for styled-components/native
 * @see https://styled-components.com/docs/api#typescript
 */

import 'styled-components/native';
import { CustomTheme } from './theme/types';

/**
 * @description Extension of styled-components DefaultTheme
 * This declaration ensures proper type inference when using styled-components
 * with our custom theme throughout the application.
 */
declare module 'styled-components/native' {
  /**
   * @interface DefaultTheme
   * @extends CustomTheme
   * @description Extends the default theme with our custom theme properties
   */
  export interface DefaultTheme extends CustomTheme {}
} 