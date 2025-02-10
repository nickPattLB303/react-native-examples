/**
 * ProductCard Styled Components
 * 
 * Styled components for the ProductCard with proper TypeScript types
 * and platform-specific considerations.
 */

import styled from 'styled-components/native';
import { Animated, Platform } from 'react-native';

/**
 * Main container for the ProductCard
 * Platform-specific shadow implementation
 */
export const Container = styled(Animated.View)`
  background-color: white;
  border-radius: 12px;
  margin: 8px;
  padding: 16px;
  
  /* Platform-specific shadows */
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: `
      elevation: 5;
    `
  })}
`;

/**
 * Product image container with proper aspect ratio
 */
export const ImageContainer = styled.View`
  aspect-ratio: 1;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
`;

/**
 * Product image with cover fit
 */
export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

/**
 * Header container with space-between layout
 */
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

/**
 * Product title with platform-specific font
 */
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  ${Platform.select({
    ios: `
      font-family: 'System';
    `,
    android: `
      font-family: 'Roboto';
    `
  })}
`;

/**
 * Price text with accent color
 */
export const Price = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #007AFF;
`;

/**
 * Description text with ellipsis
 */
export const Description = styled(Animated.Text)`
  font-size: 14px;
  color: #666;
  margin-vertical: 8px;
`;

/**
 * Controls container for quantity and favorite
 */
export const Controls = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

/**
 * Quantity control container
 */
export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 4px;
`;

/**
 * Quantity control button
 */
export const QuantityButton = styled.TouchableOpacity`
  padding: 8px;
  background-color: ${props => props.disabled ? '#DDD' : '#FFF'};
  border-radius: 6px;
`;

/**
 * Quantity text
 */
export const QuantityText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-horizontal: 16px;
`;

/**
 * Favorite button with platform-specific feedback
 */
export const FavoriteButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 20px;
  background-color: ${props => props.isFavorite ? '#FFE8EC' : '#F5F5F5'};
`;

/**
 * Expand/collapse button
 */
export const ExpandButton = styled.TouchableOpacity`
  align-self: center;
  padding: 8px;
  margin-top: 8px;
`;

/**
 * Loading container with centered content
 */
export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`; 