/**
 * Shape Definitions for SpeedyMeds App Theme
 *
 * This file defines standard border radius values used for shaping UI components
 * like buttons, cards, inputs, etc. Centralizing these values ensures visual
 * consistency in rounding across the application.
 *
 * These values are typically consumed by the main theme object (`theme.ts`)
 * and can also be accessed directly via the theme context in components.
 * React Native Paper uses the `roundness` property in its theme, which we map
 * from one of these values (e.g., `borderRadiusMedium`).
 *
 * @module theme/shape
 * @see theme/theme - Where these values are integrated into the main theme.
 */

/**
 * @description An object containing standard border radius values (in pixels).
 */
export const shape = {
  /** 4px border radius, suitable for small elements like tags, badges, or subtle rounding. */
  borderRadiusSmall: 4,
  /** 8px border radius, a common default for buttons, inputs, cards, and general containers. */
  borderRadiusMedium: 8,
  /** 16px border radius, used for larger cards or containers requiring a more pronounced rounded look. */
  borderRadiusLarge: 16,
  /** 24px border radius, for significantly rounded elements like floating action buttons or specific card styles. */
  borderRadiusXLarge: 24,
  // Add other shape-related properties if needed, e.g., specific border widths.
};

/**
 * @description Represents the union of all keys available in the `shape` object.
 * Useful for creating types that accept only valid shape keys.
 */
export type ShapeKeys = keyof typeof shape;
