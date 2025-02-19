/**
 * @module theme/types
 * @description Type definitions for the application's theme system
 */

import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { Theme as NavigationTheme } from '@react-navigation/native';

/**
 * @interface CustomTheme
 * @description Custom theme that combines MD3 and Navigation themes with additional properties
 */
export interface CustomTheme {
  /**
   * @property {Object} colors - Combined colors from MD3 and Navigation themes
   */
  colors: MD3Theme['colors'] & NavigationTheme['colors'];

  /**
   * @property {Object} fonts - Font configuration from MD3 theme
   */
  fonts: MD3Theme['fonts'];

  /**
   * @property {Object} spacing - Standardized spacing values for consistent layout
   */
  spacing: {
    /** Extra small spacing (4px) */
    xs: number;
    /** Small spacing (8px) */
    sm: number;
    /** Medium spacing (16px) */
    md: number;
    /** Large spacing (24px) */
    lg: number;
    /** Extra large spacing (32px) */
    xl: number;
  };

  /**
   * @property {Object} borderRadius - Standardized border radius values
   */
  borderRadius: {
    /** Small border radius (4px) */
    sm: number;
    /** Medium border radius (8px) */
    md: number;
    /** Large border radius (16px) */
    lg: number;
    /** Pill-shaped border radius (9999px) */
    pill: number;
  };

  /**
   * @property {Object} elevation - Shadow elevation values for depth perception
   */
  elevation: {
    /** No elevation */
    none: number;
    /** Low elevation (subtle shadow) */
    low: number;
    /** Medium elevation (moderate shadow) */
    medium: number;
    /** High elevation (pronounced shadow) */
    high: number;
  };
} 