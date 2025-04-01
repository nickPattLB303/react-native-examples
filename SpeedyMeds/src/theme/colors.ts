/**
 * @description Defines the base color palette for the application.
 * These colors are used to build the final theme object and can be accessed directly.
 */
export const colors = {
  // --- Primary Palette ---
  /** Application's main brand color. Used for primary actions, highlights, etc. */
  primary: "#007AFF", // Apple's standard blue - chosen for its clean and trustworthy feel.
  /** Lighter shade of the primary color, useful for hover states or backgrounds. */
  primaryLight: "#E6F2FF",
  /** Darker shade of the primary color, useful for pressed states or contrast. */
  primaryDark: "#0056B3",

  // --- Secondary Palette (Optional) ---
  /** Secondary brand color, used for less prominent actions or accents. */
  secondary: "#5AC8FA", // A lighter, friendly blue.
  /** Lighter shade of the secondary color. */
  secondaryLight: "#EBF8FF",
  /** Darker shade of the secondary color. */
  secondaryDark: "#009AEE",

  // --- Accent Palette (Optional) ---
  /** Accent color, used sparingly for highlights or calls to action. */
  accent: "#FF9500", // Orange for attention.

  // --- Neutrals ---
  /** Pure white. */
  white: "#FFFFFF",
  /** Pure black. */
  black: "#000000",
  /** Extremely light grey, often used for subtle backgrounds or dividers. */
  grey50: "#F9FAFB",
  /** Very light grey, common for page backgrounds or card backgrounds. */
  grey100: "#F3F4F6",
  /** Light grey. */
  grey200: "#E5E7EB",
  /** Slightly darker light grey, often used for borders. */
  grey300: "#D1D5DB",
  /** Medium-light grey, suitable for disabled states or secondary text. */
  grey400: "#9CA3AF",
  /** Standard medium grey, good for secondary text or icons. */
  grey500: "#6B7280",
  /** Medium-dark grey. */
  grey600: "#4B5563",
  /** Dark grey, suitable for primary text. */
  grey700: "#374151",
  /** Very dark grey, close to black. */
  grey800: "#1F2937",
  /** Almost black, often used for primary text for strong contrast. */
  grey900: "#111827",

  // --- Functional Colors ---
  /** Color indicating success operations or states. */
  success: "#34C759", // Standard green for success.
  /** Color indicating warnings or potentially problematic states. */
  warning: "#FFCC00", // Standard yellow/orange for warnings.
  /** Color indicating errors or failed operations. */
  error: "#FF3B30", // Standard red for errors.
  /** Color for informational messages or highlights. */
  info: "#5AC8FA", // Using secondary blue for info messages.

  // --- Text Colors ---
  /** Default text color for primary content. */
  textPrimary: "#111827",
  /** Text color for secondary information, captions, etc. */
  textSecondary: "#6B7280",
  /** Text color for disabled elements. */
  textDisabled: "#9CA3AF",
  /** Text color for use on dark backgrounds (e.g., on primary buttons). */
  textLight: "#FFFFFF",

  // --- Background Colors ---
  /** Default background color for most screens. */
  background: "#FFFFFF",
  /** Background color for elements like cards, modals, or paper surfaces. */
  backgroundPaper: "#F3F4F6",
  /** Background color for disabled input fields or components. */
  backgroundDisabled: "#E5E7EB",

  // --- Border Colors ---
  /** Default border color for inputs, dividers, etc. */
  border: "#D1D5DB",
};

/**
 * @description Represents the keys available in the `colors` object.
 * Useful for creating types that accept only valid color names.
 */
export type ColorKeys = keyof typeof colors;
