/**
 * @module styled
 * @description Type declarations for styled-components
 */

import 'styled-components/native';
import { CustomTheme } from './theme/types';

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {}
} 