/**
 * @description Defines the base color palette for the application.
 * These colors are used to build the final theme object and can be accessed directly.
 */
export const colors = {
  // --- Primary Palette ---
  /** Application's main brand color. Used for primary actions, highlights, etc. */
  primary: "#007AFF", // Bright blue
  /** Lighter shade of the primary color, useful for hover states or backgrounds. */
  primaryLight: "#EBF5FF", // Very light blue
  /** Darker shade of the primary color, useful for pressed states or contrast. */
  primaryDark: "#0056B3", // Darker blue

  // --- Secondary Palette (Optional) ---
  /** Secondary brand color, used for less prominent actions or accents. */
  secondary: "#34C759", // Bright green
  /** Lighter shade of the secondary color. */
  secondaryLight: "#EAFBF0", // Very light green
  /** Darker shade of the secondary color. */
  secondaryDark: "#228B22", // Forest green

  // --- Accent Palette (Optional) ---
  /** Accent color, used sparingly for highlights or calls to action. */
  accent: "#FF9500", // Orange

  // --- Neutrals ---
  /** Pure white. */
  white: "#FFFFFF",
  /** Pure black. */
  black: "#000000",
  /** Extremely light grey, often used for subtle backgrounds or dividers. */
  grey50: "#F8F9FA", // Very light grey
  /** Very light grey, common for page backgrounds or card backgrounds. */
  grey100: "#E9ECEF", // Light grey
  /** Light grey. */
  grey200: "#DEE2E6",
  /** Slightly darker light grey, often used for borders. */
  grey300: "#CED4DA",
  /** Medium-light grey, suitable for disabled states or secondary text. */
  grey400: "#ADB5BD",
  /** Standard medium grey, good for secondary text or icons. */
  grey500: "#6C757D", // Medium grey
  /** Medium-dark grey. */
  grey600: "#495057",
  /** Dark grey, suitable for primary text. */
  grey700: "#343A40", // Dark grey
  /** Very dark grey, close to black. */
  grey800: "#212529",
  /** Almost black, often used for primary text for strong contrast. */
  grey900: "#121212", // Near black

  // --- Functional Colors ---
  /** Color indicating success operations or states. */
  success: "#34C759", // Bright green
  /** Color indicating warnings or potentially problematic states. */
  warning: "#FFCC00", // Standard yellow/orange for warnings.
  /** Color indicating errors or failed operations. */
  error: "#FF3B30", // Standard red for errors.
  /** Color for informational messages or highlights. */
  info: "#007AFF", // Using primary blue for info messages.

  // --- Text Colors ---
  /** Default text color for primary content. */
  textPrimary: "#1C1C1E", // Almost black
  /** Text color for secondary information, captions, etc. */
  textSecondary: "#6C757D", // Medium grey
  /** Text color for disabled elements. */
  textDisabled: "#AEAEB2", // Lighter grey for disabled state
  /** Text color for use on dark backgrounds (e.g., on primary buttons). */
  textLight: "#FFFFFF", // White text (for use on dark backgrounds)

  // --- Background Colors ---
  /** Default background color for most screens. */
  background: "#F2F2F7", // Very light grey background
  /** Background color for elements like cards, modals, or paper surfaces. */
  backgroundPaper: "#FFFFFF", // White for cards, modals, etc.
  /** Background color for disabled input fields or components. */
  backgroundDisabled: "#E9ECEF", // Disabled background (similar to light grey)

  // --- Border Colors ---
  /** Default border color for inputs, dividers, etc. */
  border: "#CED4DA", // Light grey border

  // --- Dark Mode Colors ---
  darkBackground: "#000000", // Black background
  darkSurface: "#1C1C1E", // Very dark grey for surfaces (cards)
  textDarkPrimary: "#FFFFFF", // White text
  textDarkSecondary: "#8E8E93", // Lighter grey for secondary text
  textDarkDisabled: "#48484A", // Darker grey for disabled text
  darkBackgroundDisabled: "#2C2C2E", // Dark disabled background
  darkBorder: "#38383A", // Dark grey border
};

/**
 * @description Represents the keys available in the `colors` object.
 * Useful for creating types that accept only valid color names.
 */
export type ColorKeys = keyof typeof colors;
