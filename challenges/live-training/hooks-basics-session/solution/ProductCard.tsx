/**
 * ProductCard Component
 * 
 * A smart product card component that demonstrates React Native hooks usage
 * including useState, useEffect, and custom hooks.
 * 
 * Features:
 * - Expandable product description
 * - Quantity selection with bounds
 * - Favorite toggle with persistence
 * - Loading states and error handling
 * - Platform-specific animations
 * - Analytics tracking
 * 
 * @see https://reactjs.org/docs/hooks-intro.html
 */

import React, { useState, useCallback } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProductCardProps } from './types';
import { useFavoriteProduct } from './hooks/useFavoriteProduct';
import { useProductAnimation } from './hooks/useProductAnimation';
import { useProductAnalytics } from './hooks/useProductAnalytics';
import {
  Container,
  ImageContainer,
  ProductImage,
  Header,
  Title,
  Price,
  Description,
  Controls,
  QuantityControls,
  QuantityButton,
  QuantityText,
  FavoriteButton,
  ExpandButton,
  LoadingContainer,
} from './styles';

/**
 * Constants for quantity limits
 */
const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 10,
} as const;

/**
 * ProductCard Component
 * @param props - See ProductCardProps interface
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onFavoriteChange,
  onQuantityChange,
  style,
}) => {
  // Local state management
  const [quantity, setQuantity] = useState(QUANTITY_LIMITS.MIN);
  const [isExpanded, setIsExpanded] = useState(false);

  // Custom hooks
  const { isFavorite, setIsFavorite, isLoading, error } = useFavoriteProduct(product.id);
  const { containerStyle } = useProductAnimation(isExpanded);
  const analytics = useProductAnalytics(product.id);

  /**
   * Handle quantity increment
   */
  const handleIncrement = useCallback(() => {
    setQuantity(prev => {
      const newValue = Math.min(prev + 1, QUANTITY_LIMITS.MAX);
      onQuantityChange?.(product.id, newValue);
      if (newValue === QUANTITY_LIMITS.MAX) {
        analytics.logPurchase(newValue);
      }
      return newValue;
    });
  }, [product.id, onQuantityChange, analytics]);

  /**
   * Handle quantity decrement
   */
  const handleDecrement = useCallback(() => {
    setQuantity(prev => {
      const newValue = Math.max(prev - 1, QUANTITY_LIMITS.MIN);
      onQuantityChange?.(product.id, newValue);
      return newValue;
    });
  }, [product.id, onQuantityChange]);

  /**
   * Handle favorite toggle
   */
  const handleFavoriteToggle = useCallback(() => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    onFavoriteChange?.(product.id, newValue);
    analytics.logFavorite(newValue);
  }, [product.id, isFavorite, setIsFavorite, onFavoriteChange, analytics]);

  /**
   * Handle expand/collapse toggle
   */
  const handleExpandToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
    analytics.logView();
  }, [analytics]);

  /**
   * Get icon name based on platform and state
   */
  const getFavoriteIconName = useCallback(() => {
    const prefix = Platform.select({ ios: 'ios-', android: 'md-' }) ?? 'ios-';
    return `${prefix}heart${isFavorite ? '' : '-outline'}`;
  }, [isFavorite]);

  /**
   * Get expand icon name based on platform and state
   */
  const getExpandIconName = useCallback(() => {
    const prefix = Platform.select({ ios: 'ios-', android: 'md-' }) ?? 'ios-';
    return `${prefix}chevron-${isExpanded ? 'up' : 'down'}`;
  }, [isExpanded]);

  return (
    <Container style={[style, containerStyle]}>
      <ImageContainer>
        <ProductImage
          source={{ uri: product.imageUrl }}
          resizeMode="cover"
        />
      </ImageContainer>

      <Header>
        <Title>{product.name}</Title>
        <Price>{product.currency || '$'}{product.price}</Price>
      </Header>

      <Description numberOfLines={isExpanded ? undefined : 2}>
        {product.description}
      </Description>

      <Controls>
        <QuantityControls>
          <QuantityButton
            onPress={handleDecrement}
            disabled={quantity <= QUANTITY_LIMITS.MIN}
          >
            <Ionicons
              name={Platform.select({ ios: 'ios-remove', android: 'md-remove' }) ?? 'ios-remove'}
              size={24}
              color={quantity <= QUANTITY_LIMITS.MIN ? '#999' : '#000'}
            />
          </QuantityButton>
          
          <QuantityText>
            {quantity}
          </QuantityText>
          
          <QuantityButton
            onPress={handleIncrement}
            disabled={quantity >= QUANTITY_LIMITS.MAX}
          >
            <Ionicons
              name={Platform.select({ ios: 'ios-add', android: 'md-add' }) ?? 'ios-add'}
              size={24}
              color={quantity >= QUANTITY_LIMITS.MAX ? '#999' : '#000'}
            />
          </QuantityButton>
        </QuantityControls>

        <FavoriteButton
          onPress={handleFavoriteToggle}
          isFavorite={isFavorite}
          disabled={isLoading}
        >
          <Ionicons
            name={getFavoriteIconName()}
            size={24}
            color={isFavorite ? '#FF2D55' : '#666'}
          />
        </FavoriteButton>
      </Controls>

      <ExpandButton onPress={handleExpandToggle}>
        <Ionicons
          name={getExpandIconName()}
          size={24}
          color="#666"
        />
      </ExpandButton>

      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator
            size="large"
            color={Platform.select({ ios: '#007AFF', android: '#2196F3' })}
          />
        </LoadingContainer>
      )}

      {error && (
        <LoadingContainer>
          <Ionicons
            name={Platform.select({ ios: 'ios-alert', android: 'md-alert' }) ?? 'ios-alert'}
            size={32}
            color="#FF3B30"
          />
        </LoadingContainer>
      )}
    </Container>
  );
}; 