/**
 * @module components/shared/EmptyState
 * @description A reusable empty state component for displaying when content is not available
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { Card } from '../styled/containers';

/**
 * Props for the EmptyState component
 * @interface EmptyStateProps
 */
export interface EmptyStateProps {
  /** The title text to display */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional icon name to display */
  icon?: string;
  /** Optional action button text */
  actionLabel?: string;
  /** Optional action button handler */
  onAction?: () => void;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Styled container for centering content
 */
const Container = styled(Card)`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  opacity: 0.8;
`;

/**
 * Styled icon container
 */
const IconContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * A reusable empty state component that provides consistent feedback when
 * content is not available. Supports custom icons, messages, and optional
 * action buttons.
 * 
 * @component
 * @param {EmptyStateProps} props - The component props
 * @returns {JSX.Element} An empty state component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function MedicationList() {
 *   return medications.length === 0 ? (
 *     <EmptyState
 *       title="No Medications"
 *       description="You haven't added any medications yet."
 *       icon="pills.fill"
 *     />
 *   ) : (
 *     // Render medications
 *   );
 * }
 * 
 * @example
 * // With action button
 * function OrderList() {
 *   const handleNewOrder = useCallback(() => {
 *     navigation.navigate('NewOrder');
 *   }, [navigation]);
 * 
 *   return orders.length === 0 ? (
 *     <EmptyState
 *       title="No Orders"
 *       description="Start by creating your first order."
 *       icon="box.fill"
 *       actionLabel="Create Order"
 *       onAction={handleNewOrder}
 *     />
 *   ) : (
 *     // Render orders
 *   );
 * }
 * ```
 */
export const EmptyState = memo(function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  style,
  onError,
}: EmptyStateProps): JSX.Element {
  const theme = useTheme();
  
  const handleAction = React.useCallback(() => {
    try {
      onAction?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to perform action'));
    }
  }, [onAction, onError]);

  return (
    <Container style={style}>
      {icon && (
        <IconContainer>
          <IconSymbol
            name={icon}
            size={48}
            color={theme.colors.onSurfaceVariant}
          />
        </IconContainer>
      )}
      <ThemedText
        type="title"
        accessibilityRole="header"
        color={theme.colors.onSurfaceVariant}
      >
        {title}
      </ThemedText>
      {description && (
        <ThemedText
          type="default"
          color={theme.colors.onSurfaceVariant}
        >
          {description}
        </ThemedText>
      )}
      {actionLabel && onAction && (
        <ThemedText
          type="link"
          onPress={handleAction}
          accessibilityRole="button"
          accessibilityHint={`Double tap to ${actionLabel.toLowerCase()}`}
        >
          {actionLabel}
        </ThemedText>
      )}
    </Container>
  );
}); 