/**
 * Product Types
 * 
 * Core type definitions for the ProductCard component and related functionality.
 * These types are shared between the starter and solution code.
 */

/**
 * Product data structure
 * @interface Product
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  currency?: string;
  inStock?: boolean;
}

/**
 * Props for the ProductCard component
 * @interface ProductCardProps
 */
export interface ProductCardProps {
  /**
   * Product data to display
   */
  product: Product;
  
  /**
   * Optional callback when favorite status changes
   * @param productId - The ID of the product
   * @param isFavorite - New favorite status
   */
  onFavoriteChange?: (productId: string, isFavorite: boolean) => void;
  
  /**
   * Optional callback when quantity changes
   * @param productId - The ID of the product
   * @param quantity - New quantity value
   */
  onQuantityChange?: (productId: string, quantity: number) => void;
  
  /**
   * Optional style overrides
   */
  style?: any; // We'll refine this with styled-components theme types
}

/**
 * Hook result for favorite product functionality
 * @interface UseFavoriteProductResult
 */
export interface UseFavoriteProductResult {
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook result for product animations
 * @interface UseProductAnimationResult
 */
export interface UseProductAnimationResult {
  fadeAnim: Animated.Value;
  expandAnim: Animated.Value;
  containerStyle: {
    opacity: Animated.Value;
    maxHeight: Animated.AnimatedInterpolation;
  };
}

/**
 * Hook result for product analytics
 * @interface UseProductAnalyticsResult
 */
export interface UseProductAnalyticsResult {
  logView: () => void;
  logFavorite: (isFavorite: boolean) => void;
  logPurchase: (quantity: number) => void;
} 