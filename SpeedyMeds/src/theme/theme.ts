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
type AppTheme = MD3Theme & typeof customProperties;

// --- Light Theme Definition ---
export const lightTheme: AppTheme = merge({}, MD3LightTheme, {
  colors: {
    // Start with MD3 Light colors and override/map our custom ones
    ...MD3LightTheme.colors,
    primary: customColors.primary,
    onPrimary: customColors.textLight, // Usually white/light text on primary
    primaryContainer: customColors.primaryLight,
    onPrimaryContainer: customColors.primaryDark, // Darker text on light container

    secondary: customColors.secondary,
    onSecondary: customColors.textLight,
    secondaryContainer: customColors.secondaryLight,
    onSecondaryContainer: customColors.secondaryDark,

    tertiary: customColors.accent,
    onTertiary: customColors.textLight,
    tertiaryContainer: customColors.accent, // Revisit if specific light/dark needed
    onTertiaryContainer: customColors.textLight, // Revisit

    error: customColors.error,
    onError: customColors.textLight,
    errorContainer: "#FFDAD6", // Default MD3 light
    onErrorContainer: "#410002", // Default MD3 light

    background: customColors.background, // Our light background
    onBackground: customColors.textPrimary, // Our dark text on light background
    surface: customColors.backgroundPaper, // Light surface (cards)
    onSurface: customColors.textPrimary, // Dark text on light surface
    surfaceVariant: customColors.grey100, // Light variant
    onSurfaceVariant: customColors.textPrimary,
    surfaceDisabled: customColors.backgroundDisabled,
    onSurfaceDisabled: customColors.textDisabled,

    outline: customColors.border,
    outlineVariant: customColors.grey200,

    // Ensure text colors are mapped correctly
    textPrimary: customColors.textPrimary, // Main text color for light theme
    textSecondary: customColors.textSecondary, // Secondary text color for light theme
    textLight: customColors.textLight, // Explicitly light text
    textDisabled: customColors.textDisabled,

    // Map other colors as needed from customColors or MD3 defaults
    placeholder: customColors.textSecondary, // Usually secondary text
    disabled: customColors.textDisabled, // Deprecated, use onSurfaceDisabled
    notification: customColors.primary,
  },
  ...customProperties, // Spread the rest of the custom properties
});

// --- Dark Theme Definition ---
export const darkTheme: AppTheme = merge({}, MD3DarkTheme, {
  colors: {
    // Start with MD3 Dark colors and override/map our custom ones
    ...MD3DarkTheme.colors,
    primary: customColors.primaryDark, // Use a darker primary for dark mode if available, or adjust primary
    onPrimary: customColors.textLight, // Light text on dark primary often works
    primaryContainer: customColors.primary, // Could be the original primary
    onPrimaryContainer: customColors.textLight, // Light text on the container

    secondary: customColors.secondaryDark, // Darker secondary
    onSecondary: customColors.textLight,
    secondaryContainer: customColors.secondary,
    onSecondaryContainer: customColors.textLight,

    tertiary: customColors.accent, // Accent might stay the same or need adjustment
    onTertiary: customColors.textDark, // Dark text might be needed if accent is light
    tertiaryContainer: customColors.accent,
    onTertiaryContainer: customColors.textDark,

    error: customColors.error, // Error color might stay the same
    onError: customColors.textLight, // Text on error
    errorContainer: "#93000A", // Default MD3 dark
    onErrorContainer: "#FFDAD6", // Default MD3 dark

    background: customColors.darkBackground, // Dark background
    onBackground: customColors.textLight, // Light text on dark background
    surface: customColors.darkSurface, // Dark surface (cards)
    onSurface: customColors.textLight, // Light text on dark surface
    surfaceVariant: customColors.grey800, // Darker variant
    onSurfaceVariant: customColors.textLight, // Light text on dark variant
    surfaceDisabled: customColors.darkBackgroundDisabled, // Dark disabled background
    onSurfaceDisabled: customColors.textDisabledDark, // Dark disabled text

    outline: customColors.grey600, // Lighter outline for dark mode
    outlineVariant: customColors.grey700,

    // Ensure text colors are mapped correctly
    textPrimary: customColors.textLight, // Main text color for dark theme is light
    textSecondary: customColors.grey300, // Secondary text color for dark theme (lighter grey)
    textLight: customColors.textLight, // Explicitly light text
    textDisabled: customColors.textDisabledDark, // Use dark disabled text

    // Map other colors as needed
    placeholder: customColors.grey500, // Placeholder text for dark theme
    disabled: customColors.textDisabledDark, // Deprecated
    notification: customColors.primaryDark, // Darker notification color
  },
  ...customProperties, // Spread the rest of the custom properties
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
