/**
 * @module components/OrderListItem
 * @description Specialized list item component for displaying order information
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BaseListItem, ListItemTitle, ListItemDescription } from './styled/list';
import { IconSymbol } from './ui/IconSymbol';
import { useTheme } from 'styled-components/native';

export interface OrderListItemProps {
  /** Order ID */
  orderId: string;
  /** Order status */
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
 * @function OrderListItem
 * @description A list item component specifically designed for displaying order information
 * 
 * @example
 * ```tsx
 * <OrderListItem
 *   orderId="ORD-123"
 *   status="processing"
 *   date="2024-03-15"
 *   itemCount={3}
 *   onPress={() => {}}
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
}: OrderListItemProps) {
  const theme = useTheme();

  const getStatusColor = (status: OrderListItemProps['status']) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning;
      case 'processing':
        return theme.colors.info;
      case 'shipped':
        return theme.colors.primary;
      case 'delivered':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.secondary;
    }
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
        left={props => (
          <IconSymbol
            name="box.fill"
            size={24}
            color={getStatusColor(status)}
            {...props}
          />
        )}
        right={props => (
          <IconSymbol
            name="chevron.right"
            size={24}
            color={theme.colors.secondary}
            {...props}
          />
        )}
      />
    </TouchableOpacity>
  );
} 