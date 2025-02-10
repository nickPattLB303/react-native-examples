/**
 * useProductAnimation Hook
 * 
 * Custom hook to manage product card animations.
 * Demonstrates useState and useEffect with Animated.
 * 
 * Features:
 * - Fade-in animation on mount
 * - Smooth expand/collapse transitions
 * - Platform-specific configurations
 * - Type-safe implementation
 */

import { useState, useEffect } from 'react';
import { Animated, Platform } from 'react-native';
import { UseProductAnimationResult } from '../types';

/**
 * Platform-specific animation configurations
 */
const ANIMATION_CONFIG = {
  FADE_DURATION: Platform.select({
    ios: 400,
    android: 300,
    default: 400,
  }),
  SPRING_CONFIG: Platform.select({
    ios: {
      friction: 8,
      tension: 40,
    },
    android: {
      friction: 7,
      tension: 35,
    },
    default: {
      friction: 8,
      tension: 40,
    },
  }),
  MIN_HEIGHT: 100,
  MAX_HEIGHT: 300,
};

/**
 * Hook for managing product card animations
 * @param isExpanded - Current expanded state
 */
export const useProductAnimation = (isExpanded: boolean): UseProductAnimationResult => {
  // Initialize animation values
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [expandAnim] = useState(() => new Animated.Value(0));

  /**
   * Initial fade-in animation on mount
   */
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION_CONFIG.FADE_DURATION,
      useNativeDriver: true, // Enable native driver for opacity
    }).start();
  }, []);

  /**
   * Handle expand/collapse animations
   */
  useEffect(() => {
    Animated.spring(expandAnim, {
      toValue: isExpanded ? 1 : 0,
      ...ANIMATION_CONFIG.SPRING_CONFIG,
      useNativeDriver: false, // Native driver doesn't support layout animations
    }).start();
  }, [isExpanded, expandAnim]);

  /**
   * Create animated styles for the container
   */
  const containerStyle = {
    opacity: fadeAnim,
    maxHeight: expandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [ANIMATION_CONFIG.MIN_HEIGHT, ANIMATION_CONFIG.MAX_HEIGHT],
      extrapolate: 'clamp',
    }),
  };

  return {
    fadeAnim,
    expandAnim,
    containerStyle,
  };
}; 