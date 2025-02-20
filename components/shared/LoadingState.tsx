/**
 * @module components/shared/LoadingState
 * @description A reusable loading state component for displaying loading feedback
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { ThemedText } from '../ThemedText';
import { Card } from '../styled/containers';

/**
 * Props for the LoadingState component
 * @interface LoadingStateProps
 */
export interface LoadingStateProps {
  /** Optional message to display */
  message?: string;
  /** Optional size for the loading indicator */
  size?: 'small' | 'large';
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
}

/**
 * Styled container for centering content
 */
const Container = styled(Card)`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  opacity: 0.9;
`;

/**
 * A reusable loading state component that provides consistent loading
 * feedback across the app. Supports custom messages and loading
 * indicator sizes.
 * 
 * @component
 * @param {LoadingStateProps} props - The component props
 * @returns {JSX.Element} A loading state component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function MedicationList() {
 *   const { isLoading } = useMedications();
 *   
 *   return isLoading ? (
 *     <LoadingState message="Loading medications..." />
 *   ) : (
 *     // Render medications
 *   );
 * }
 * 
 * @example
 * // With custom size
 * function OrderDetails() {
 *   const { isLoading } = useOrderDetails(orderId);
 *   
 *   return isLoading ? (
 *     <LoadingState
 *       message="Loading order details..."
 *       size="large"
 *     />
 *   ) : (
 *     // Render order details
 *   );
 * }
 * ```
 */
export const LoadingState = memo(function LoadingState({
  message,
  size = 'large',
  style,
}: LoadingStateProps): JSX.Element {
  const theme = useTheme();

  return (
    <Container style={style}>
      <ActivityIndicator
        size={size}
        color={theme.colors.primary}
        accessibilityLabel={message || 'Loading'}
      />
      {message && (
        <ThemedText
          type="default"
          color={theme.colors.onSurfaceVariant}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {message}
        </ThemedText>
      )}
    </Container>
  );
}); 