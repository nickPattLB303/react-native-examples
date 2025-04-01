/**
 * @description Defines standard border radius values for shaping components.
 */
export const shape = {
  /** 4px border radius, often for small elements like tags or badges. */
  borderRadiusSmall: 4,
  /** 8px border radius, common default for buttons, inputs, cards. */
  borderRadiusMedium: 8,
  /** 16px border radius, for larger cards or containers needing more rounding. */
  borderRadiusLarge: 16,
  /** 24px border radius, for significantly rounded elements. */
  borderRadiusXLarge: 24,
};

/**
 * @description Represents the keys available in the `shape` object.
 */
export type ShapeKeys = keyof typeof shape;
