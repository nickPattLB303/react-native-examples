import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "lodash.merge"; // Use lodash merge for deep merging

import { colors as customColors } from "./colors"; // Keep custom base colors
import { spacing } from "./spacing";
import { fontSizes, fontWeights, fonts } from "./typography";
import { shape } from "./shape";

/**
 * @description Raw custom theme values, organized logically.
 * This object holds our defined palette, spacing, typography, etc., before mapping to Paper's theme structure.
 */
export const customTheme = {
  colors: customColors,
  spacing,
  fontSizes,
  fontWeights,
  fonts,
  shape,
};

// --- Reusable custom properties ---
// These don't change between light/dark mode usually
const customProperties = {
  customSpacing: spacing,
  customFontSizes: fontSizes,
  customShape: shape,
  // Note: We don't include base 'colors' here, map them per theme
  // Note: fonts config might need adjustments based on light/dark if desired,
  // but often the base font config remains the same.
  fonts: {
    ...MD3LightTheme.fonts, // Start with base fonts
    regular: {
      fontFamily: fonts.regular,
      fontWeight: fontWeights.normal,
    },
    medium: {
      fontFamily: fonts.medium,
      fontWeight: fontWeights.medium,
    },
    light: {
      fontFamily: fonts.regular,
      fontWeight: fontWeights.light,
    },
    thin: {
      fontFamily: fonts.regular,
      fontWeight: "100",
    },
  },
  roundness: shape.borderRadiusMedium,
};

// --- Base Theme Type ---
// Define a type that includes Paper's MD3Theme and our custom properties
export type AppTheme = MD3Theme & typeof customProperties;

// --- Light Theme Definition ---
export const lightTheme: AppTheme = merge({}, MD3LightTheme, {
  colors: {
    // Start with MD3 Light colors and override/map our custom ones
    ...MD3LightTheme.colors,
    primary: customColors.primary,
    onPrimary: customColors.textLight,
    primaryContainer: customColors.primaryLight,
    onPrimaryContainer: customColors.primaryDark,
    secondary: customColors.secondary,
    onSecondary: customColors.textLight,
    secondaryContainer: customColors.secondaryLight,
    onSecondaryContainer: customColors.secondaryDark,
    tertiary: customColors.accent,
    onTertiary: customColors.textLight,
    tertiaryContainer: customColors.accent,
    onTertiaryContainer: customColors.textLight,
    error: customColors.error,
    onError: customColors.textLight,
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: customColors.background,
    onBackground: customColors.textPrimary,
    surface: customColors.backgroundPaper,
    onSurface: customColors.textPrimary,
    surfaceVariant: customColors.grey100,
    onSurfaceVariant: customColors.textPrimary,
    surfaceDisabled: customColors.backgroundDisabled,
    onSurfaceDisabled: customColors.textDisabled,
    outline: customColors.border,
    outlineVariant: customColors.grey200,
    textPrimary: customColors.textPrimary,
    textSecondary: customColors.textSecondary,
    textLight: customColors.textLight,
    textDisabled: customColors.textDisabled,
    placeholder: customColors.textSecondary,
    disabled: customColors.textDisabled,
    notification: customColors.primary,
  },
  ...customProperties,
});

// --- Dark Theme Definition ---
export const darkTheme: AppTheme = merge({}, MD3DarkTheme, {
  colors: {
    // Start with MD3 Dark colors and override/map our custom dark colors
    ...MD3DarkTheme.colors,
    primary: customColors.primary, // Keep primary, adjust if needed
    onPrimary: customColors.textLight,
    primaryContainer: customColors.primaryDark, // Use darker variant for container
    onPrimaryContainer: customColors.textLight,

    secondary: customColors.secondary, // Keep secondary, adjust if needed
    onSecondary: customColors.textLight,
    secondaryContainer: customColors.secondaryDark,
    onSecondaryContainer: customColors.textLight,

    tertiary: customColors.accent,
    onTertiary: customColors.textDarkPrimary, // Use primary dark text on accent
    tertiaryContainer: customColors.accent,
    onTertiaryContainer: customColors.textDarkPrimary,

    error: customColors.error,
    onError: customColors.textLight,
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",

    background: customColors.darkBackground, // Use dark background
    onBackground: customColors.textDarkPrimary, // Use dark primary text
    surface: customColors.darkSurface, // Use dark surface
    onSurface: customColors.textDarkPrimary,
    surfaceVariant: customColors.grey800, // Use dark grey variant
    onSurfaceVariant: customColors.textDarkSecondary, // Use dark secondary text
    surfaceDisabled: customColors.darkBackgroundDisabled, // Use dark disabled background
    onSurfaceDisabled: customColors.textDarkDisabled, // Use dark disabled text

    outline: customColors.darkBorder, // Use dark border
    outlineVariant: customColors.grey700,

    // Explicitly map text colors for dark theme
    textPrimary: customColors.textDarkPrimary,
    textSecondary: customColors.textDarkSecondary,
    textLight: customColors.textLight, // This remains white
    textDisabled: customColors.textDarkDisabled,

    placeholder: customColors.textDarkSecondary, // Use dark secondary text for placeholder
    disabled: customColors.textDarkDisabled, // Deprecated, use onSurfaceDisabled
    notification: customColors.primaryDark, // Use darker primary for notifications
  },
  ...customProperties,
});

// --- Navigation Themes ---
// Adapt the Paper themes for React Navigation
// See: https://callstack.github.io/react-native-paper/docs/guides/theming-with-react-navigation/
const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

// Merge Paper navigation themes with our custom themes to ensure consistency
export const CombinedNavLightTheme = merge({}, NavLightTheme, lightTheme);
export const CombinedNavDarkTheme = merge({}, NavDarkTheme, darkTheme);

// Re-export base colors/spacing etc. if needed elsewhere, though theme access is preferred.
export {
  customColors as colors,
  spacing,
  fontSizes,
  fontWeights,
  fonts,
  shape,
};
