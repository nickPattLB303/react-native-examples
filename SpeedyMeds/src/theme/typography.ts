/**
 * Typography Definitions for SpeedyMeds App Theme
 *
 * This file defines the standard typographic scale (font sizes, weights, and families)
 * used throughout the application. Centralizing these definitions ensures consistency
 * in text appearance and makes it easier to manage the app's visual hierarchy.
 *
 * These values are typically integrated into the main theme object (`theme.ts`)
 * and accessed via the theme context in components, often through React Native Paper's
 * Text variants or styled-components.
 *
 * @module theme/typography
 * @see theme/theme - Where these values are integrated into the main theme.
 * @see https://reactnative.dev/docs/platform-specific-code - React Native Platform Specific Code
 * @see https://docs.expo.dev/guides/using-custom-fonts/ - Expo Custom Fonts Guide (if adding custom fonts later)
 */

import { Platform } from "react-native";

/**
 * @description An object containing standard font sizes (in pixels) used across the app.
 * Keys provide semantic names (xs to xxxl) for different text sizes.
 */
export const fontSizes = {
  /** 12px - Extra small size, suitable for captions or fine print. */
  xs: 12,
  /** 14px - Small size, often used for secondary text or labels. */
  s: 14,
  /** 16px - Medium size, typically the default body font size for readability. */
  m: 16,
  /** 18px - Large size. */
  l: 18,
  /** 20px - Extra large size, often used for subheadings or secondary titles. */
  xl: 20,
  /** 24px - Extra extra large size, commonly used for main headings or titles. */
  xxl: 24,
  /** 30px - Extra extra extra large size, used for prominent display text or major titles. */
  xxxl: 30,
};

/**
 * @description An object containing standard font weights.
 * Uses string values compatible with the React Native `fontWeight` style property.
 * `as const` is used for stricter type inference.
 */
export const fontWeights = {
  /** Font weight 300 */
  light: "300" as const,
  /** Font weight 400 (Default weight for most text) */
  normal: "400" as const,
  /** Font weight 500 */
  medium: "500" as const,
  /** Font weight 600 */
  semibold: "600" as const,
  /** Font weight 700 */
  bold: "700" as const,
};

/**
 * @description Defines standard font families, utilizing platform-specific defaults initially.
 * `Platform.select` is used to choose the appropriate default system font based on the OS.
 * This ensures the app uses familiar system fonts (San Francisco on iOS, Roboto on Android)
 * without requiring custom font loading initially.
 *
 * To use custom fonts:
 * 1. Add font files (e.g., .ttf, .otf) to your project (e.g., in `assets/fonts/`).
 * 2. Load them using `useFonts` hook from `expo-font` in your `App.tsx`.
 * 3. Update the font family names here to match the names you used when loading them.
 */
export const fonts = {
  /** Default font family for regular weight text. */
  regular: Platform.select({
    ios: "System", // Uses the default San Francisco font family on iOS
    android: "Roboto", // Uses the default Roboto font family on Android
    default: "sans-serif", // Generic fallback
  }),
  /** Font family for medium weight text. Note: Android often requires specific font file names like 'Roboto-Medium'. */
  medium: Platform.select({
    ios: "System", // iOS uses the system font and applies the weight specified elsewhere (e.g., fontWeight: '500')
    android: "Roboto-Medium", // Specific font name often needed for Android weights other than regular/bold
    default: "sans-serif-medium", // Generic fallback
  }),
  /** Font family for bold weight text. Note: Android often requires specific font file names like 'Roboto-Bold'. */
  bold: Platform.select({
    ios: "System", // iOS uses the system font and applies the weight specified elsewhere (e.g., fontWeight: 'bold')
    android: "Roboto-Bold", // Specific font name often needed for Android bold weight
    default: "sans-serif-bold", // Generic fallback
  }),
  // --- Example for Custom Fonts (if loaded via expo-font) ---
  // customRegular: 'YourCustomFont-Regular', // Replace with actual font name used in useFonts
  // customMedium: 'YourCustomFont-Medium',
  // customBold: 'YourCustomFont-Bold',
};

/** Represents the union of all keys available in the `fontSizes` object. */
export type FontSizeKeys = keyof typeof fontSizes;
/** Represents the union of all keys available in the `fontWeights` object. */
export type FontWeightKeys = keyof typeof fontWeights;
/** Represents the union of all keys available in the `fonts` object. */
export type FontKeys = keyof typeof fonts;
