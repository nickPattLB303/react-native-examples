/**
 * @module components/OrderListItem
 * @description Specialized list item component for displaying order information
 */

import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useTheme, MD3Colors } from 'react-native-paper';
import { IconSymbol } from './ui/IconSymbol';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

/** Valid order status values */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

/** Type for order status */
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

/** Status configuration mapping */
const STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    color: 'primary',
    icon: 'gear.fill',
    label: 'Pending Order',
  },
  [ORDER_STATUS.PROCESSING]: {
    color: 'primary',
    icon: 'gear.fill',
    label: 'Processing Order',
  },
  [ORDER_STATUS.SHIPPED]: {
    color: 'primary',
    icon: 'box.fill',
    label: 'Shipped Order',
  },
  [ORDER_STATUS.DELIVERED]: {
    color: 'primary',
    icon: 'checkmark',
    label: 'Delivered Order',
  },
  [ORDER_STATUS.CANCELLED]: {
    color: 'error',
    icon: 'xmark',
    label: 'Cancelled Order',
  },
} as const;

/**
 * Props for the OrderListItem component
 * @interface OrderListItemProps
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <OrderListItem
 *   orderId="ORD-123"
 *   status="processing"
 *   date="2024-03-15"
 *   itemCount={3}
 *   onPress={() => console.log('Order pressed')}
 * />
 * 
 * // With loading state
 * <OrderListItem
 *   orderId="ORD-123"
 *   status="processing"
 *   date="2024-03-15"
 *   itemCount={3}
 *   isLoading={true}
 * />
 * 
 * // Disabled state
 * <OrderListItem
 *   orderId="ORD-123"
 *   status="cancelled"
 *   date="2024-03-15"
 *   itemCount={3}
 *   disabled={true}
 * />
 * 
 * // Compact mode
 * <OrderListItem
 *   orderId="ORD-123"
 *   status="delivered"
 *   date="2024-03-15"
 *   itemCount={3}
 *   compact={true}
 * />
 * ```
 */
export interface OrderListItemProps {
  /** Order ID */
  orderId: string;
  /** Order status */
  status: OrderStatus;
  /** Order date */
  date: string;
  /** Total items in order */
  itemCount: number;
  /** Handler for when the item is pressed */
  onPress?: () => void;
  /** Whether to use compact styling */
  compact?: boolean;
  /** Whether the item is in a loading state */
  isLoading?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional test ID for testing */
  testID?: string;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

const SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
} as const;

/**
 * A list item component specifically designed for displaying order information.
 * This component handles various states (loading, disabled) and provides proper
 * accessibility support.
 * 
 * @component
 * @param {OrderListItemProps} props - The component props
 * @returns {JSX.Element} A list item displaying order information
 * 
 * @example
 * // In an order list
 * function OrderList({ orders }) {
 *   return (
 *     <ScrollView>
 *       {orders.map(order => (
 *         <OrderListItem
 *           key={order.id}
 *           orderId={order.id}
 *           status={order.status}
 *           date={order.date}
 *           itemCount={order.items.length}
 *           onPress={() => navigateToOrder(order.id)}
 *         />
 *       ))}
 *     </ScrollView>
 *   );
 * }
 * 
 * @example
 * // With error handling
 * function OrderSection() {
 *   const handleError = useCallback((error: Error) => {
 *     console.error('Order item error:', error);
 *     showErrorToast(error.message);
 *   }, []);
 * 
 *   return (
 *     <OrderListItem
 *       orderId="ORD-123"
 *       status="processing"
 *       date="2024-03-15"
 *       itemCount={3}
 *       onError={handleError}
 *     />
 *   );
 * }
 */
function OrderListItem({
  orderId,
  status,
  date,
  itemCount,
  onPress,
  compact = false,
  isLoading = false,
  disabled = false,
  testID,
  onError,
}: OrderListItemProps): JSX.Element {
  const theme = useTheme();
  const statusConfig = STATUS_CONFIG[status];
  const isInteractive = Boolean(onPress) && !disabled && !isLoading;

  // Memoize styles to prevent unnecessary recalculations
  const containerStyle = React.useMemo(() => ({
    padding: compact ? SPACING.xs : SPACING.md,
    opacity: disabled ? 0.5 : 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  }), [compact, disabled, theme.colors.surface, theme.roundness]);

  // Memoize content container style
  const contentContainerStyle = React.useMemo(() => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: SPACING.sm,
  }), []);

  // Memoize text container style
  const textContainerStyle = React.useMemo(() => ({
    flex: 1,
    gap: SPACING.xs,
  }), []);

  // Memoize press handler
  const handlePress = useCallback(() => {
    try {
      onPress?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to handle press'));
    }
  }, [onPress, onError]);

  const content = (
    <TouchableOpacity 
      onPress={handlePress}
      disabled={!isInteractive}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{
        disabled: !isInteractive,
        busy: isLoading,
      }}
      accessibilityLabel={`${statusConfig.label} #${orderId}`}
      testID={testID}
    >
      <ThemedView style={containerStyle}>
        <ThemedView style={contentContainerStyle}>
          <IconSymbol
            name={statusConfig.icon}
            size={24}
            color={theme.colors[statusConfig.color]}
          />
          
          <ThemedView style={textContainerStyle}>
            <ThemedText type="defaultSemiBold">
              Order #{orderId}
            </ThemedText>
            <ThemedText>
              Status: {status}
            </ThemedText>
            <ThemedText>
              Date: {date}
            </ThemedText>
            <ThemedText>
              Items: {itemCount}
            </ThemedText>
          </ThemedView>

          <IconSymbol
            name="chevron.right"
            size={24}
            color={theme.colors.onSurfaceVariant}
          />
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  // Since we don't have an ErrorBoundary component yet, we'll just return the content
  // TODO: Implement proper error boundary when the component is available
  return content;
}

// Memoize the component to prevent unnecessary re-renders
export default memo(OrderListItem); 