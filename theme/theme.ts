/**
 * @module theme/theme
 * @description Theme configuration combining Material Design 3, Navigation, and custom theming
 */

import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { CustomTheme } from './types';

/**
 * @constant
 * @description Adapted navigation themes for light and dark modes
 */
const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: DarkTheme,
});

/**
 * @constant
 * @description Font configuration for the application
 */
const fontConfig = {
  /** Regular weight font style */
  regular: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
  },
  /** Medium weight font style */
  medium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0.15,
    lineHeight: 20,
    fontSize: 14,
  },
  /** Bold weight font style */
  bold: {
    fontFamily: 'System',
    fontWeight: '700' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
    fontSize: 16,
  },
  /** Heavy weight font style */
  heavy: {
    fontFamily: 'System',
    fontWeight: '900' as const,
    letterSpacing: 0.15,
    lineHeight: 32,
    fontSize: 24,
  },
};

/**
 * @constant
 * @description Base theme configuration shared between light and dark themes
 */
const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    pill: 9999,
  },
  elevation: {
    none: 0,
    low: 2,
    medium: 4,
    high: 8,
  },
};

/**
 * @constant
 * @description Light theme configuration
 * @type {CustomTheme}
 */
export const lightTheme: CustomTheme = {
  ...MD3LightTheme,
  ...NavigationLightTheme,
  ...baseTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    ...NavigationLightTheme.colors,
    primary: Colors.light.tint,
    secondary: Colors.light.tabIconDefault,
    background: Colors.light.background,
    text: Colors.light.text,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    labelLarge: fontConfig.regular,
    labelMedium: fontConfig.medium,
    labelSmall: fontConfig.regular,
    bodyLarge: fontConfig.regular,
    bodyMedium: fontConfig.regular,
    bodySmall: fontConfig.regular,
    titleLarge: fontConfig.bold,
    titleMedium: fontConfig.bold,
    titleSmall: fontConfig.medium,
    headlineLarge: fontConfig.heavy,
    headlineMedium: fontConfig.bold,
    headlineSmall: fontConfig.bold,
  },
};

/**
 * @constant
 * @description Dark theme configuration
 * @type {CustomTheme}
 */
export const darkTheme: CustomTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  ...baseTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: Colors.dark.tint,
    secondary: Colors.dark.tabIconDefault,
    background: Colors.dark.background,
    text: Colors.dark.text,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    labelLarge: fontConfig.regular,
    labelMedium: fontConfig.medium,
    labelSmall: fontConfig.regular,
    bodyLarge: fontConfig.regular,
    bodyMedium: fontConfig.regular,
    bodySmall: fontConfig.regular,
    titleLarge: fontConfig.bold,
    titleMedium: fontConfig.bold,
    titleSmall: fontConfig.medium,
    headlineLarge: fontConfig.heavy,
    headlineMedium: fontConfig.bold,
    headlineSmall: fontConfig.bold,
  },
}; 