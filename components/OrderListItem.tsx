/**
 * @module components/OrderListItem
 * @description Specialized list item component for displaying order information
 */

import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, OpaqueColorValue } from 'react-native';
import { BaseListItem, ListItemTitle, ListItemDescription } from './styled/list';
import { IconSymbol, type IconSymbolName } from './ui/IconSymbol';
import { useTheme } from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';

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

/** Props passed to icon components */
interface IconProps {
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}

/** Status color mapping */
const STATUS_COLORS: Record<OrderStatus, keyof DefaultTheme['colors']> = {
  [ORDER_STATUS.PENDING]: 'primary',
  [ORDER_STATUS.PROCESSING]: 'primary',
  [ORDER_STATUS.SHIPPED]: 'primary',
  [ORDER_STATUS.DELIVERED]: 'primary',
  [ORDER_STATUS.CANCELLED]: 'error',
};

/**
 * Props for the OrderListItem component
 * @interface OrderListItemProps
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
}

/**
 * A list item component specifically designed for displaying order information
 * 
 * @component
 * @param {OrderListItemProps} props - The component props
 * @returns {JSX.Element} A list item displaying order information
 * 
 * @example
 * ```tsx
 * <OrderListItem
 *   orderId="ORD-123"
 *   status={ORDER_STATUS.PROCESSING}
 *   date="2024-03-15"
 *   itemCount={3}
 *   onPress={() => console.log('Order pressed')}
 * />
 * ```
 */
export function OrderListItem({
  orderId,
  status,
  date,
  itemCount,
  onPress,
  compact = false,
}: OrderListItemProps): JSX.Element {
  const theme = useTheme();

  /**
   * Gets the appropriate color for the order status
   * @param {OrderStatus} status - The order status
   * @returns {string} The color code for the status
   */
  const getStatusColor = (status: OrderStatus): string => {
    const colorKey = STATUS_COLORS[status];
    return theme.colors[colorKey] as string;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <BaseListItem
        compact={compact}
        title={<ListItemTitle>Order #{orderId}</ListItemTitle>}
        description={
          <>
            <ListItemDescription>Status: {status}</ListItemDescription>
            <ListItemDescription>Date: {date}</ListItemDescription>
            <ListItemDescription>Items: {itemCount}</ListItemDescription>
          </>
        }
        left={(props: IconProps) => (
          <IconSymbol
            name="house.fill"
            size={24}
            color={getStatusColor(status)}
            {...props}
          />
        )}
        right={(props: IconProps) => (
          <IconSymbol
            name="chevron.right"
            size={24}
            color={theme.colors.secondary as string}
            {...props}
          />
        )}
      />
    </TouchableOpacity>
  );
} 