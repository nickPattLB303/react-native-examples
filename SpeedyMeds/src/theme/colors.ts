/**
 * Base Color Palette Definition for SpeedyMeds App
 *
 * This file defines the core color constants used throughout the application.
 * These raw color values serve as the foundation for the light and dark themes
 * constructed in `theme.ts`. Defining them centrally makes it easy to manage
 * and update the application's visual identity.
 *
 * The colors are organized into logical groups (Primary, Secondary, Neutrals, Functional, etc.)
 * for better readability and understanding. Both light and dark mode specific colors
 * are included where necessary.
 *
 * @module theme/colors
 * @see theme/theme - Where these colors are mapped into the React Native Paper theme structure.
 */

/**
 * @description An object containing the base color palette.
 * Each key represents a semantic color name, and the value is its hex code.
 */
export const colors = {
  // --- Primary Palette ---
  /** Application's main brand color. Used for primary actions, highlights, interactive elements. */
  primary: "#007AFF", // Bright blue
  /** Lighter shade of the primary color, useful for subtle backgrounds or hover states. */
  primaryLight: "#EBF5FF", // Very light blue
  /** Darker shade of the primary color, useful for pressed states or providing contrast. */
  primaryDark: "#0056B3", // Darker blue

  // --- Secondary Palette (Optional) ---
  /** Secondary brand color, used for less prominent actions or alternative visual accents. */
  secondary: "#34C759", // Bright green
  /** Lighter shade of the secondary color. */
  secondaryLight: "#EAFBF0", // Very light green
  /** Darker shade of the secondary color. */
  secondaryDark: "#228B22", // Forest green

  // --- Accent Palette (Optional) ---
  /** Accent color, used sparingly for highlights, calls to action, or specific features. */
  accent: "#FF9500", // Orange

  // --- Neutrals ---
  /** Pure white, typically used for text on dark backgrounds or paper backgrounds. */
  white: "#FFFFFF",
  /** Pure black, typically used for text on light backgrounds or dark mode backgrounds. */
  black: "#000000",
  /** Extremely light grey, often used for subtle backgrounds or dividers in light mode. */
  grey50: "#F8F9FA", // Very light grey
  /** Very light grey, common for page backgrounds or card backgrounds in light mode. */
  grey100: "#E9ECEF", // Light grey
  /** Light grey. */
  grey200: "#DEE2E6",
  /** Slightly darker light grey, often used for borders or disabled states in light mode. */
  grey300: "#CED4DA",
  /** Medium-light grey, suitable for less important text or icons. */
  grey400: "#ADB5BD",
  /** Standard medium grey, good for secondary text or icons. */
  grey500: "#6C757D", // Medium grey
  /** Medium-dark grey. */
  grey600: "#495057",
  /** Dark grey, suitable for primary text in light mode or surfaces in dark mode. */
  grey700: "#343A40", // Dark grey
  /** Very dark grey, often used for surfaces or backgrounds in dark mode. */
  grey800: "#212529",
  /** Almost black, often used for primary text for strong contrast or dark mode backgrounds. */
  grey900: "#121212", // Near black

  // --- Functional Colors ---
  /** Color indicating success operations or states (e.g., validation success). */
  success: "#34C759", // Bright green (same as secondary for now)
  /** Color indicating warnings or potentially problematic states (e.g., low supply). */
  warning: "#FFCC00", // Standard yellow/orange for warnings.
  /** Color indicating errors or failed operations (e.g., validation errors). */
  error: "#FF3B30", // Standard red for errors.
  /** Color for informational messages or highlights (can often be primary). */
  info: "#007AFF", // Using primary blue for info messages.

  // --- Text Colors (Light Mode Defaults) ---
  /** Default text color for primary content in light mode. */
  textPrimary: "#1C1C1E", // Almost black
  /** Text color for secondary information, captions, etc., in light mode. */
  textSecondary: "#6C757D", // Medium grey
  /** Text color for disabled elements in light mode. */
  textDisabled: "#AEAEB2", // Lighter grey for disabled state
  /** Text color for use on dark backgrounds (e.g., on primary buttons). Typically white. */
  textLight: "#FFFFFF", // White text

  // --- Background Colors (Light Mode Defaults) ---
  /** Default background color for most screens in light mode. */
  background: "#F2F2F7", // Very light grey background
  /** Background color for elements like cards, modals, or paper surfaces in light mode. */
  backgroundPaper: "#FFFFFF", // White for cards, modals, etc.
  /** Background color for disabled input fields or components in light mode. */
  backgroundDisabled: "#E9ECEF", // Disabled background (similar to light grey)

  // --- Border Colors (Light Mode Default) ---
  /** Default border color for inputs, dividers, etc., in light mode. */
  border: "#CED4DA", // Light grey border

  // --- Dark Mode Specific Colors ---
  /** Default background color for most screens in dark mode. */
  darkBackground: "#000000", // Black background
  /** Background color for elements like cards, modals, or paper surfaces in dark mode. */
  darkSurface: "#1C1C1E", // Very dark grey for surfaces (cards)
  /** Default text color for primary content in dark mode. */
  textDarkPrimary: "#FFFFFF", // White text
  /** Text color for secondary information in dark mode. */
  textDarkSecondary: "#8E8E93", // Lighter grey for secondary text
  /** Text color for disabled elements in dark mode. */
  textDarkDisabled: "#48484A", // Darker grey for disabled text
  /** Background color for disabled input fields or components in dark mode. */
  darkBackgroundDisabled: "#2C2C2E", // Dark disabled background
  /** Default border color for inputs, dividers, etc., in dark mode. */
  darkBorder: "#38383A", // Dark grey border
};

/**
 * @description Represents the union of all keys available in the `colors` object.
 * This utility type can be used for function parameters or prop types that should
 * only accept valid color names defined in our palette.
 * @example
 * type IconProps = { color: ColorKeys };
 */
export type ColorKeys = keyof typeof colors;
