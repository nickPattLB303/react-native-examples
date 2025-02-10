/**
 * useFavoriteProduct Hook
 * 
 * Custom hook to manage product favorite state with persistence.
 * Demonstrates useState and useEffect with AsyncStorage.
 * 
 * Features:
 * - Persistent favorite state
 * - Loading state management
 * - Error handling
 * - Type-safe implementation
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseFavoriteProductResult } from '../types';

/**
 * Storage key prefix for favorite products
 */
const STORAGE_KEY_PREFIX = '@favorite_product_';

/**
 * Hook for managing product favorite state
 * @param productId - Unique identifier for the product
 */
export const useFavoriteProduct = (productId: string): UseFavoriteProductResult => {
  // Initialize state with type safety
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Get storage key for the product
   */
  const getStorageKey = useCallback(() => `${STORAGE_KEY_PREFIX}${productId}`, [productId]);

  /**
   * Load favorite state from AsyncStorage
   */
  useEffect(() => {
    const loadFavoriteState = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const stored = await AsyncStorage.getItem(getStorageKey());
        if (stored !== null) {
          setIsFavorite(JSON.parse(stored));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load favorite state'));
        console.error('Error loading favorite state:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteState();
  }, [getStorageKey]);

  /**
   * Save favorite state to AsyncStorage
   */
  useEffect(() => {
    const saveFavoriteState = async () => {
      try {
        setError(null);
        await AsyncStorage.setItem(getStorageKey(), JSON.stringify(isFavorite));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to save favorite state'));
        console.error('Error saving favorite state:', err);
      }
    };

    // Only save if not in initial loading state
    if (!isLoading) {
      saveFavoriteState();
    }
  }, [isFavorite, isLoading, getStorageKey]);

  /**
   * Wrapped setIsFavorite to handle errors
   */
  const handleSetIsFavorite = useCallback((value: boolean) => {
    setError(null);
    setIsFavorite(value);
  }, []);

  return {
    isFavorite,
    setIsFavorite: handleSetIsFavorite,
    isLoading,
    error,
  };
}; 