/**
 * Spacing Definitions for SpeedyMeds App Theme
 *
 * This file defines a standard scale for spacing units (margins, paddings) used
 * throughout the application layout. Using a consistent spacing scale helps create
 * visual rhythm and harmony in the UI.
 *
 * This scale is based on a 4-pixel grid system, a common practice in design systems.
 * Multiples of 4 are used for most spacing values.
 *
 * These values are typically accessed via the theme object (e.g., `theme.customSpacing.m`)
 * within styled components or inline styles.
 *
 * @module theme/spacing
 * @see theme/theme - Where these values are integrated into the main theme under `customSpacing`.
 */

/**
 * @description An object containing standard spacing units (in pixels).
 * The keys provide semantic names (xxs, xs, s, m, l, xl, xxl, xxxl) corresponding
 * to increasing pixel values based on a 4px grid.
 */
export const spacing = {
  /** 4px - Extra extra small spacing, useful for tight layouts or small gaps. */
  xxs: 4,
  /** 8px - Extra small spacing. */
  xs: 8,
  /** 12px - Small spacing. */
  s: 12,
  /** 16px - Medium spacing, often used as the default margin or padding around elements. */
  m: 16,
  /** 20px - Large spacing. */
  l: 20,
  /** 24px - Extra large spacing. */
  xl: 24,
  /** 32px - Extra extra large spacing, for significant separation. */
  xxl: 32,
  /** 48px - Extra extra extra large spacing, for major section breaks or large gaps. */
  xxxl: 48,
};

/**
 * @description Represents the union of all keys available in the `spacing` object.
 * Useful for creating types that accept only valid spacing keys.
 */
export type SpacingKeys = keyof typeof spacing;
