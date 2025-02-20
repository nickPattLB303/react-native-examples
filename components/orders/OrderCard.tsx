/**
 * @module components/orders/OrderCard
 * @description A detailed card component for displaying order information
 */

import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { Card, FlexRow } from '../styled/containers';
import { ORDER_STATUS } from '../OrderListItem';

/**
 * Props for the OrderCard component
 * @interface OrderCardProps
 */
export interface OrderCardProps {
  /** Order ID */
  orderId: string;
  /** Order status */
  status: keyof typeof ORDER_STATUS;
  /** Order date */
  orderDate: string;
  /** Expected delivery date */
  deliveryDate?: string;
  /** Tracking number */
  trackingNumber?: string;
  /** Total items in order */
  itemCount: number;
  /** Order total amount */
  totalAmount: number;
  /** Optional cancel action handler */
  onCancel?: () => void;
  /** Optional track action handler */
  onTrack?: () => void;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Styled header section
 */
const Header = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * Styled status badge
 */
const StatusBadge = styled.View<{ status: keyof typeof ORDER_STATUS }>`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'DELIVERED':
        return `${theme.colors.success}20`;
      case 'CANCELLED':
        return `${theme.colors.error}20`;
      case 'PROCESSING':
      case 'SHIPPED':
        return `${theme.colors.primary}20`;
      default:
        return `${theme.colors.secondary}20`;
    }
  }};
  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.sm}px`};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

/**
 * Styled info section
 */
const InfoSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

/**
 * Styled actions section
 */
const Actions = styled(FlexRow)`
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * A detailed card component for displaying comprehensive order information.
 * It includes status indicators, order details, and action buttons.
 * 
 * @component
 * @param {OrderCardProps} props - The component props
 * @returns {JSX.Element} A detailed order card component
 * 
 * @example
 * ```tsx
 * function OrderDetail() {
 *   const handleCancel = useCallback(() => {
 *     // Handle order cancellation
 *   }, []);
 * 
 *   const handleTrack = useCallback(() => {
 *     // Handle order tracking
 *   }, []);
 * 
 *   return (
 *     <OrderCard
 *       orderId="ORD-123456"
 *       status="PROCESSING"
 *       orderDate="2024-03-15"
 *       deliveryDate="2024-03-20"
 *       trackingNumber="1Z999AA1234567890"
 *       itemCount={3}
 *       totalAmount={59.99}
 *       onCancel={handleCancel}
 *       onTrack={handleTrack}
 *     />
 *   );
 * }
 * ```
 */
export const OrderCard = memo(function OrderCard({
  orderId,
  status,
  orderDate,
  deliveryDate,
  trackingNumber,
  itemCount,
  totalAmount,
  onCancel,
  onTrack,
  style,
  onError,
}: OrderCardProps): JSX.Element {
  const theme = useTheme();

  const handleCancel = useCallback(() => {
    try {
      onCancel?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to cancel order'));
    }
  }, [onCancel, onError]);

  const handleTrack = useCallback(() => {
    try {
      onTrack?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to track order'));
    }
  }, [onTrack, onError]);

  const getStatusColor = (status: keyof typeof ORDER_STATUS) => {
    switch (status) {
      case 'DELIVERED':
        return theme.colors.success;
      case 'CANCELLED':
        return theme.colors.error;
      case 'PROCESSING':
      case 'SHIPPED':
        return theme.colors.primary;
      default:
        return theme.colors.secondary;
    }
  };

  return (
    <Card style={style}>
      <Header>
        <ThemedText type="title">Order #{orderId}</ThemedText>
        <StatusBadge status={status}>
          <ThemedText
            type="defaultSemiBold"
            color={getStatusColor(status)}
          >
            {status}
          </ThemedText>
        </StatusBadge>
      </Header>

      <InfoSection>
        <FlexRow>
          <IconSymbol
            name="calendar"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText>Ordered: {orderDate}</ThemedText>
        </FlexRow>

        {deliveryDate && (
          <FlexRow>
            <IconSymbol
              name="box.truck.fill"
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText>Expected delivery: {deliveryDate}</ThemedText>
          </FlexRow>
        )}

        {trackingNumber && (
          <FlexRow>
            <IconSymbol
              name="location.fill"
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText>Tracking: {trackingNumber}</ThemedText>
          </FlexRow>
        )}

        <FlexRow>
          <IconSymbol
            name="bag.fill"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText>{itemCount} items</ThemedText>
        </FlexRow>

        <FlexRow>
          <IconSymbol
            name="creditcard.fill"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText>Total: ${totalAmount.toFixed(2)}</ThemedText>
        </FlexRow>
      </InfoSection>

      <Actions>
        {status !== 'CANCELLED' && status !== 'DELIVERED' && onCancel && (
          <ThemedText
            type="link"
            color={theme.colors.error}
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityHint="Double tap to cancel order"
          >
            Cancel Order
          </ThemedText>
        )}
        {(status === 'SHIPPED' || status === 'PROCESSING') && onTrack && (
          <ThemedText
            type="link"
            onPress={handleTrack}
            accessibilityRole="button"
            accessibilityHint="Double tap to track order"
          >
            Track Order
          </ThemedText>
        )}
      </Actions>
    </Card>
  );
}); 