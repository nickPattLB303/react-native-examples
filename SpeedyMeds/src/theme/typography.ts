import { Platform } from "react-native";

/**
 * @description Defines standard font sizes used throughout the application.
 */
export const fontSizes = {
  /** 12px */
  xs: 12,
  /** 14px */
  s: 14,
  /** 16px (Default app font size) */
  m: 16,
  /** 18px */
  l: 18,
  /** 20px (Often used for subheadings) */
  xl: 20,
  /** 24px (Often used for headings) */
  xxl: 24,
  /** 30px (Often used for large display text/titles) */
  xxxl: 30,
};

/**
 * @description Defines standard font weights used throughout the application.
 * Uses string values compatible with `fontWeight` style property.
 */
export const fontWeights = {
  /** Font weight 300 */
  light: "300" as const,
  /** Font weight 400 (Default) */
  normal: "400" as const,
  /** Font weight 500 */
  medium: "500" as const,
  /** Font weight 600 */
  semibold: "600" as const,
  /** Font weight 700 */
  bold: "700" as const,
};

/**
 * @description Defines standard font families, using platform defaults initially.
 * Custom fonts can be added here later and loaded via `expo-font`.
 */
export const fonts = {
  /** Default font family for regular text. */
  regular: Platform.select({
    ios: "System", // San Francisco
    android: "Roboto", // Roboto Regular
    default: "sans-serif",
  }),
  /** Font family for medium weight text. */
  medium: Platform.select({
    ios: "System", // Uses system font with appropriate weight
    android: "Roboto-Medium",
    default: "sans-serif-medium",
  }),
  /** Font family for bold text. */
  bold: Platform.select({
    ios: "System", // Uses system font with appropriate weight
    android: "Roboto-Bold",
    default: "sans-serif-bold",
  }),
  // Example: Add custom fonts like this
  // customRegular: 'YourCustomFont-Regular',
  // customBold: 'YourCustomFont-Bold',
};

/** Represents the keys available in the `fontSizes` object. */
export type FontSizeKeys = keyof typeof fontSizes;
/** Represents the keys available in the `fontWeights` object. */
export type FontWeightKeys = keyof typeof fontWeights;
/** Represents the keys available in the `fonts` object. */
export type FontKeys = keyof typeof fonts;
