/**
 * useProductAnalytics Hook
 * 
 * Custom hook to track product interactions.
 * Demonstrates useEffect and useCallback for analytics.
 * 
 * Features:
 * - View tracking with duration
 * - Favorite action logging
 * - Purchase attempt tracking
 * - Memoized handlers
 */

import { useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { UseProductAnalyticsResult } from '../types';

/**
 * Analytics event names
 */
const ANALYTICS_EVENTS = {
  PRODUCT_VIEW: 'product_view',
  PRODUCT_VIEW_DURATION: 'product_view_duration',
  PRODUCT_FAVORITE: 'product_favorite',
  PRODUCT_PURCHASE: 'product_purchase',
} as const;

/**
 * Mock analytics service
 * In a real app, this would be your analytics SDK
 */
const analytics = {
  logEvent: (eventName: string, params: Record<string, any>) => {
    console.log(`[Analytics] ${eventName}:`, {
      ...params,
      platform: Platform.OS,
      timestamp: new Date().toISOString(),
    });
  },
};

/**
 * Hook for tracking product interactions
 * @param productId - Unique identifier for the product
 */
export const useProductAnalytics = (productId: string): UseProductAnalyticsResult => {
  /**
   * Track product view duration
   */
  useEffect(() => {
    const startTime = Date.now();
    
    // Log initial view
    analytics.logEvent(ANALYTICS_EVENTS.PRODUCT_VIEW, {
      productId,
      action: 'view_start',
    });

    // Cleanup function to log duration on unmount
    return () => {
      const duration = Date.now() - startTime;
      analytics.logEvent(ANALYTICS_EVENTS.PRODUCT_VIEW_DURATION, {
        productId,
        durationMs: duration,
      });
    };
  }, [productId]);

  /**
   * Log product view event
   */
  const logView = useCallback(() => {
    analytics.logEvent(ANALYTICS_EVENTS.PRODUCT_VIEW, {
      productId,
      action: 'view_refresh',
    });
  }, [productId]);

  /**
   * Log favorite/unfavorite events
   */
  const logFavorite = useCallback((isFavorite: boolean) => {
    analytics.logEvent(ANALYTICS_EVENTS.PRODUCT_FAVORITE, {
      productId,
      action: isFavorite ? 'add_favorite' : 'remove_favorite',
    });
  }, [productId]);

  /**
   * Log purchase attempts
   */
  const logPurchase = useCallback((quantity: number) => {
    analytics.logEvent(ANALYTICS_EVENTS.PRODUCT_PURCHASE, {
      productId,
      quantity,
      action: 'attempt_purchase',
    });
  }, [productId]);

  return {
    logView,
    logFavorite,
    logPurchase,
  };
}; 