/**
 * @description Defines standard spacing units for consistent layout (margins, paddings).
 * Based on a 4px grid system.
 */
export const spacing = {
  /** 4px */
  xxs: 4,
  /** 8px */
  xs: 8,
  /** 12px */
  s: 12,
  /** 16px (default) */
  m: 16,
  /** 20px */
  l: 20,
  /** 24px */
  xl: 24,
  /** 32px */
  xxl: 32,
  /** 48px */
  xxxl: 48,
};

/**
 * @description Represents the keys available in the `spacing` object.
 * Useful for creating types that accept only valid spacing keys.
 */
export type SpacingKeys = keyof typeof spacing; 