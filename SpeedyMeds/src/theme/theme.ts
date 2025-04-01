import { DefaultTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper'; // Import the type for Paper's Material Design 3 theme structure.
import { colors } from './colors';
import { spacing } from './spacing';
import { fontSizes, fontWeights, fonts } from './typography';
import { shape } from './shape';

/**
 * @description Raw custom theme values, organized logically.
 * This object holds our defined palette, spacing, typography, etc., before mapping to Paper's theme structure.
 */
export const customTheme = {
  colors,
  spacing,
  fontSizes,
  fontWeights,
  fonts,
  shape,
};

/**
 * @description The final theme object used by both React Native Paper and Styled Components.
 * It merges React Native Paper's `DefaultTheme` with our custom values,
 * mapping them to the expected properties of Paper's `MD3Theme` structure.
 * Includes custom properties (`customSpacing`, `customFontSizes`, etc.) for direct access in Styled Components.
 */
export const theme: MD3Theme & { customSpacing: typeof spacing, customFontSizes: typeof fontSizes, customShape: typeof shape } = {
  ...DefaultTheme, // Start with Paper's default theme as a base
  colors: {
    ...DefaultTheme.colors, // Include default Paper colors

    // --- Map custom colors to Paper's MD3 theme properties ---
    // See: https://callstack.github.io/react-native-paper/docs/guides/theming/#theme-properties

    // Primary
    primary: colors.primary,
    onPrimary: colors.textLight, // Text/icons on primary background
    primaryContainer: colors.primaryLight, // Background for elements needing less emphasis than primary
    onPrimaryContainer: colors.primaryDark, // Text/icons on primaryContainer

    // Secondary
    secondary: colors.secondary,
    onSecondary: colors.textLight,
    secondaryContainer: colors.secondaryLight,
    onSecondaryContainer: colors.secondaryDark,

    // Tertiary (Using Accent as Tertiary for now)
    tertiary: colors.accent,
    onTertiary: colors.textLight,
    tertiaryContainer: colors.accent, // Example, adjust as needed
    onTertiaryContainer: colors.textLight, // Example, adjust as needed

    // Error
    error: colors.error,
    onError: colors.textLight,
    errorContainer: '#FFDAD6', // Default MD3 light error container, can customize
    onErrorContainer: '#410002', // Default MD3 light on-error container, can customize

    // Backgrounds & Surfaces
    background: colors.background,
    onBackground: colors.textPrimary,
    surface: colors.backgroundPaper, // General surface color (cards, sheets)
    onSurface: colors.textPrimary,
    surfaceVariant: colors.grey100, // Surface with slightly different emphasis
    onSurfaceVariant: colors.textPrimary,
    surfaceDisabled: colors.backgroundDisabled,
    onSurfaceDisabled: colors.textDisabled,

    // Outlines & Dividers
    outline: colors.border,
    outlineVariant: colors.grey200,

    // Other common mappings
    placeholder: colors.textSecondary,
    disabled: colors.textDisabled, // Deprecated in v3, use onSurfaceDisabled
    notification: colors.primary, // Often uses primary or error color

    // Add any other specific MD3 color mappings needed
  },
  fonts: {
    ...DefaultTheme.fonts,
    // Map our custom fonts to the structure Paper expects.
    // Paper v3 uses variants like bodySmall, bodyMedium, bodyLarge, titleSmall, etc.
    // Mapping basic weights here for simplicity, can be expanded.
    regular: {
      fontFamily: fonts.regular,
      fontWeight: fontWeights.normal,
    },
    medium: {
      fontFamily: fonts.medium,
      fontWeight: fontWeights.medium,
    },
    light: {
      fontFamily: fonts.regular, // Assuming light uses regular family
      fontWeight: fontWeights.light,
    },
    thin: {
      fontFamily: fonts.regular, // Assuming thin uses regular family
      fontWeight: '100', // MD default thin weight
    },
    // It's often better to configure fonts using configureFonts (see Paper docs)
    // for full MD3 type scale support if needed.
  },
  // --- Map other theme properties ---
  roundness: shape.borderRadiusMedium, // Base roundness for components

  // --- Add Custom properties for Styled Components access ---
  // These are not used by Paper directly but are available via the theme prop
  customSpacing: spacing,
  customFontSizes: fontSizes,
  customShape: shape,
};

// Export the merged theme as the default export for App.tsx
export default theme;

// Re-export the individual custom theme parts for potentially easier direct import
// in styled-components, though accessing via `theme.customSpacing.m` is standard.
export { colors, spacing, fontSizes, fontWeights, fonts, shape }; 