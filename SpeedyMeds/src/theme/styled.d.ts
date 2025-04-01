// src/theme/styled.d.ts

// Import original module declarations from styled-components
import 'styled-components/native';

// Import the fully structured theme type we created in theme.ts
import { theme } from './theme';

// Infer the type of our theme object
type AppTheme = typeof theme;

// Extend the 'styled-components/native' module
declare module 'styled-components/native' {
  /**
   * Augment the DefaultTheme interface.
   * This makes our custom `AppTheme` type available globally for styled components,
   * enabling type checking and IntelliSense for theme properties.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
} 