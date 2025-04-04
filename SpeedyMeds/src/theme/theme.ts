/**
 * Application Theme Assembly for SpeedyMeds App
 *
 * This file is responsible for constructing the complete theme objects used by
 * React Native Paper, Styled Components, and React Navigation. It combines base themes
 * provided by these libraries with the custom design tokens (colors, spacing, typography, shapes)
 * defined in other files within the `src/theme/` directory.
 *
 * Key Steps:
 * 1. Import base design tokens (`colors`, `spacing`, etc.).
 * 2. Import base themes from React Native Paper (`MD3LightTheme`, `MD3DarkTheme`).
 * 3. Define reusable custom properties (`customSpacing`, `customFontSizes`, etc.) and merge
 *    base Paper font configurations with custom font families/weights.
 * 4. Define the `AppTheme` type by extending Paper's `MD3Theme` with our `customProperties`.
 *    This provides strong typing for the entire theme object.
 * 5. Create `lightTheme` and `darkTheme` objects:
 *    - Start with the corresponding base Paper theme.
 *    - Use `lodash.merge` for deep merging to intelligently combine objects.
 *    - Map colors from `customColors` onto the specific properties expected by Paper's theme
 *      (e.g., `primary`, `onPrimary`, `surface`, `background`). This requires understanding
 *      Paper's theme structure.
 *    - Merge in the `customProperties`.
 * 6. Adapt the Paper themes for React Navigation using `adaptNavigationTheme`.
 * 7. Merge the adapted navigation themes with our `lightTheme`/`darkTheme` to ensure
 *    navigation elements also use our custom values where applicable.
 *
 * @module theme/theme
 * @see theme/colors - Base color palette.
 * @see theme/spacing - Spacing scale.
 * @see theme/typography - Font sizes, weights, and families.
 * @see theme/shape - Border radius values.
 * @see context/ThemeContext - Where these theme objects are provided to the app.
 * @see https://callstack.github.io/react-native-paper/docs/guides/theming/ - React Native Paper Theming Guide
 * @see https://callstack.github.io/react-native-paper/docs/guides/theming-with-react-navigation/ - Theming with React Navigation
 * @see https://lodash.com/docs/4.17.15#merge - Lodash `merge` documentation
 */

import {
  MD3LightTheme, // Base light theme preset from Paper V5 (Material Design 3)
  MD3DarkTheme, // Base dark theme preset from Paper V5
  adaptNavigationTheme, // Utility to adapt Paper themes for React Navigation
} from "react-native-paper";
import type { MD3Theme } from "react-native-paper"; // Type definition for Paper's theme structure
import {
  DarkTheme as NavigationDarkTheme, // Base dark theme from React Navigation
  DefaultTheme as NavigationDefaultTheme, // Base light theme from React Navigation
} from "@react-navigation/native";
// Use lodash merge for deep merging theme objects. This handles nested objects correctly,
// ensuring that nested properties (like `colors` or `fonts`) are combined rather than overwritten.
import merge from "lodash.merge";

// Import our custom base design tokens
import { colors as customColors } from "./colors";
import { spacing } from "./spacing";
import { fontSizes, fontWeights, fonts } from "./typography";
import { shape } from "./shape";

/**
 * @description A simple object holding references to all raw custom theme values.
 * Useful for potential direct import elsewhere, though accessing via the theme context is preferred.
 * @deprecated Accessing theme values via `useTheme` or context is generally preferred over direct import.
 */
export const customTheme = {
  colors: customColors,
  spacing,
  fontSizes,
  fontWeights,
  fonts,
  shape,
};

// --- Reusable Custom Properties ---
// Define custom properties that will be added to *both* light and dark themes.
// These often include non-color values like spacing scales or custom font sizes.
// We also configure the `fonts` property required by Paper's theme here, merging
// Paper's base font configuration with our custom font families and weights.
const customProperties = {
  /** Custom spacing scale (e.g., theme.customSpacing.m) */
  customSpacing: spacing,
  /** Custom font size scale (e.g., theme.customFontSizes.xl) */
  customFontSizes: fontSizes,
  /** Custom shape/border radius values (e.g., theme.customShape.borderRadiusMedium) */
  customShape: shape,

  /**
   * Configure fonts according to React Native Paper's theme structure.
   * We start with Paper's default MD3 font configuration (`MD3LightTheme.fonts`)
   * and override specific variants (`regular`, `medium`, etc.) to use the
   * font families and weights defined in `typography.ts`.
   * @see https://callstack.github.io/react-native-paper/docs/guides/theming/#fonts
   */
  fonts: merge({}, MD3LightTheme.fonts, {
    // Override specific font variants
    regular: {
      fontFamily: fonts.regular,
      fontWeight: fontWeights.normal,
    },
    medium: {
      fontFamily: fonts.medium,
      fontWeight: fontWeights.medium,
    },
    light: {
      fontFamily: fonts.regular, // Assuming regular font file supports light weight
      fontWeight: fontWeights.light,
    },
    thin: {
      fontFamily: fonts.regular, // Assuming regular font file supports thin weight
      fontWeight: "100", // Standard thin weight
    },
    // Ensure default is also set if needed, inheriting from MD3 or overriding
    // default: { ... }
  }),

  /**
   * Maps our custom border radius to Paper's `roundness` property.
   * Paper uses `roundness` internally for component styling (multiplied by factors).
   * We use our medium radius as the base roundness.
   */
  roundness: shape.borderRadiusMedium,
};

// --- Base Application Theme Type ---
/**
 * @description Defines the complete structure of our application theme object.
 * It combines all properties from React Native Paper's `MD3Theme`
 * with our own `customProperties` (like `customSpacing`, `customFontSizes`).
 * This provides strong type safety when accessing theme properties anywhere in the app.
 * Components using `useTheme<AppTheme>()` or styled-components with the global
 * declaration will have access to both Paper's standard properties and our custom ones.
 */
export type AppTheme = MD3Theme & typeof customProperties;

// --- Light Theme Definition ---
/**
 * @description The complete theme object for the light mode.
 * It's created by deep merging:
 *   1. React Native Paper's `MD3LightTheme` (provides defaults).
 *   2. Our custom color mappings onto Paper's `colors` structure.
 *   3. Our `customProperties` (spacing, custom fonts, shapes, etc.).
 */
export const lightTheme: AppTheme = merge(
  {}, // Start with an empty object for immutability
  MD3LightTheme, // Base Paper light theme defaults
  {
    // Override and map colors
    colors: {
      // It's good practice to spread the base theme colors first,
      // then override specific ones with our custom palette values.
      ...MD3LightTheme.colors,
      primary: customColors.primary,
      onPrimary: customColors.textLight, // Text color on primary background
      primaryContainer: customColors.primaryLight, // Background for elements emphasizing primary
      onPrimaryContainer: customColors.primaryDark, // Text color on primaryContainer
      secondary: customColors.secondary,
      onSecondary: customColors.textLight,
      secondaryContainer: customColors.secondaryLight,
      onSecondaryContainer: customColors.secondaryDark,
      tertiary: customColors.accent, // Using accent as tertiary
      onTertiary: customColors.textLight,
      tertiaryContainer: customColors.accent, // Often same as tertiary or a lighter shade
      onTertiaryContainer: customColors.textLight,
      error: customColors.error,
      onError: customColors.textLight,
      errorContainer: "#FFDAD6", // Standard Material 3 light error container
      onErrorContainer: "#410002", // Standard Material 3 text on light error container
      warning: customColors.warning, // Our custom warning color
      onWarning: customColors.textPrimary, // Text on warning background (dark text for yellow)
      background: customColors.background, // Overall screen background
      onBackground: customColors.textPrimary, // Default text color on background
      surface: customColors.backgroundPaper, // Card/modal background
      onSurface: customColors.textPrimary, // Default text color on surface
      surfaceVariant: customColors.grey100, // Background for elements like chips, menus
      onSurfaceVariant: customColors.textPrimary, // Text color on surfaceVariant
      surfaceDisabled: customColors.backgroundDisabled, // Background for disabled elements
      onSurfaceDisabled: customColors.textDisabled, // Text/icon color for disabled elements
      outline: customColors.border, // Default border color
      outlineVariant: customColors.grey200, // Subtle borders or dividers

      // Explicitly map our semantic text colors (optional but good for clarity)
      textPrimary: customColors.textPrimary,
      textSecondary: customColors.textSecondary,
      textLight: customColors.textLight,
      textDisabled: customColors.textDisabled,

      // Map other potentially useful colors
      placeholder: customColors.textSecondary, // Placeholder text color
      disabled: customColors.textDisabled, // Deprecated Paper v4 color, use onSurfaceDisabled
      notification: customColors.primary, // Badge/notification background color
    },
    // Merge in our custom non-color properties
    ...customProperties,
  },
);

// --- Dark Theme Definition ---
/**
 * @description The complete theme object for the dark mode.
 * Constructed similarly to the light theme but starting with `MD3DarkTheme`
 * and mapping our dark mode color palette.
 */
export const darkTheme: AppTheme = merge(
  {}, // Start with an empty object
  MD3DarkTheme, // Base Paper dark theme defaults
  {
    // Override and map colors for dark mode
    colors: {
      ...MD3DarkTheme.colors,
      primary: customColors.primary, // Keeping primary the same, adjust if needed for dark mode
      onPrimary: customColors.textLight,
      primaryContainer: customColors.primaryDark, // Use darker variant
      onPrimaryContainer: customColors.textLight, // Text on the darker container

      secondary: customColors.secondary,
      onSecondary: customColors.textLight,
      secondaryContainer: customColors.secondaryDark,
      onSecondaryContainer: customColors.textLight,

      tertiary: customColors.accent,
      onTertiary: customColors.textDarkPrimary, // Use dark primary text on orange accent
      tertiaryContainer: customColors.accent,
      onTertiaryContainer: customColors.textDarkPrimary,

      error: customColors.error, // Keep error red, adjust if needed
      onError: customColors.textLight,
      errorContainer: "#93000A", // Standard Material 3 dark error container
      onErrorContainer: "#FFDAD6", // Standard Material 3 text on dark error container
      warning: customColors.warning, // Our custom warning color
      onWarning: customColors.textPrimary, // Text on warning (dark text still contrasts well with yellow)

      background: customColors.darkBackground, // Use dark background color
      onBackground: customColors.textDarkPrimary, // Use light text on dark background
      surface: customColors.darkSurface, // Use dark surface color for cards/modals
      onSurface: customColors.textDarkPrimary, // Light text on dark surface
      surfaceVariant: customColors.grey800, // Darker variant background
      onSurfaceVariant: customColors.textDarkSecondary, // Secondary light text on variant
      surfaceDisabled: customColors.darkBackgroundDisabled,
      onSurfaceDisabled: customColors.textDarkDisabled,

      outline: customColors.darkBorder, // Darker border color
      outlineVariant: customColors.grey700,

      // Explicitly map our semantic text colors for dark theme
      textPrimary: customColors.textDarkPrimary,
      textSecondary: customColors.textDarkSecondary,
      textLight: customColors.textLight, // This remains white
      textDisabled: customColors.textDarkDisabled,

      placeholder: customColors.textDarkSecondary,
      disabled: customColors.textDarkDisabled, // Deprecated Paper v4 color
      notification: customColors.primaryDark, // Use darker primary for notifications
    },
    // Merge in our custom non-color properties (same as light theme)
    ...customProperties,
  },
);

// --- Navigation Themes ---
// Adapt the React Native Paper themes for use with React Navigation.
// This utility ensures that default navigation elements (like headers, tab bars)
// pick up colors from the Paper theme automatically.
const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme, // Base React Navigation light theme
    reactNavigationDark: NavigationDarkTheme, // Base React Navigation dark theme
    // Optional: Provide specific material light/dark themes if needed,
    // but usually adapting the defaults is sufficient if Paper themes are well-defined.
    // materialLight: lightTheme,
    // materialDark: darkTheme,
  });

// Merge the adapted Navigation themes with our *full* AppThemes.
// This ensures that navigation components not only get the basic adapted colors
// but also have access to our custom properties (`customSpacing`, etc.) if needed
// for more advanced styling within navigator options.
export const CombinedNavLightTheme = merge({}, NavLightTheme, lightTheme);
export const CombinedNavDarkTheme = merge({}, NavDarkTheme, darkTheme);

// --- Optional Re-exports ---
// Re-export base design tokens if they need to be imported directly elsewhere.
// However, accessing these values through the theme object provided by
// `useTheme` or context is the recommended approach for consistency.
export {
  customColors as colors, // Re-exporting base colors under 'colors' alias
  spacing,
  fontSizes,
  fontWeights,
  fonts,
  shape,
};
