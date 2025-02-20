/**
 * @module components/orders/OrderStatusTimeline
 * @description A timeline component for displaying order status progression
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { FlexRow } from '../styled/containers';
import { ORDER_STATUS } from '../OrderListItem';

/** Type for order status values */
export type OrderStatus = keyof typeof ORDER_STATUS;

/**
 * Props for the OrderStatusTimeline component
 * @interface OrderStatusTimelineProps
 */
export interface OrderStatusTimelineProps {
  /** Current order status */
  currentStatus: OrderStatus;
  /** Optional timestamp for each status */
  timestamps?: Partial<Record<OrderStatus, string>>;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional test ID for testing */
  testID?: string;
}

/**
 * Styled timeline container
 */
const TimelineContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * Styled timeline step container
 */
const TimelineStep = styled(FlexRow)<{ isActive: boolean }>`
  opacity: ${({ isActive }) => isActive ? 1 : 0.5};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  align-items: flex-start;
`;

/**
 * Styled timeline connector line
 */
const TimelineConnector = styled.View<{ isActive: boolean }>`
  position: absolute;
  left: 12px;
  top: 24px;
  width: 2px;
  height: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.surfaceVariant};
`;

/**
 * Styled content container
 */
const Content = styled.View`
  margin-left: ${({ theme }) => theme.spacing.md}px;
  flex: 1;
`;

/** Order of status progression */
const STATUS_ORDER: OrderStatus[] = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
];

/**
 * Maps status to display text and icon
 */
const STATUS_CONFIG = {
  PENDING: {
    text: 'Order Placed',
    icon: 'cart.fill',
    description: 'Your order has been received',
  },
  PROCESSING: {
    text: 'Processing',
    icon: 'gear.fill',
    description: 'Your order is being prepared',
  },
  SHIPPED: {
    text: 'Shipped',
    icon: 'box.truck.fill',
    description: 'Your order is on its way',
  },
  DELIVERED: {
    text: 'Delivered',
    icon: 'checkmark.circle.fill',
    description: 'Your order has been delivered',
  },
  CANCELLED: {
    text: 'Cancelled',
    icon: 'xmark.circle.fill',
    description: 'Your order has been cancelled',
  },
} as const;

/**
 * A timeline component that shows the progression of an order's status.
 * It displays each status step with icons, timestamps, and connecting lines.
 * 
 * @component
 * @param {OrderStatusTimelineProps} props - The component props
 * @returns {JSX.Element} An order status timeline component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function OrderDetails() {
 *   return (
 *     <OrderStatusTimeline
 *       currentStatus="PROCESSING"
 *       timestamps={{
 *         PENDING: '2024-03-15 10:30 AM',
 *         PROCESSING: '2024-03-15 11:45 AM',
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export const OrderStatusTimeline = memo(function OrderStatusTimeline({
  currentStatus,
  timestamps,
  style,
  testID,
}: OrderStatusTimelineProps): JSX.Element {
  const theme = useTheme();

  // If order is cancelled, only show the cancelled status
  const timelineSteps = currentStatus === 'CANCELLED'
    ? [{ status: 'CANCELLED' as OrderStatus }]
    : STATUS_ORDER.map(status => ({
        status,
        isCompleted: STATUS_ORDER.indexOf(status) <= STATUS_ORDER.indexOf(currentStatus),
      }));

  return (
    <TimelineContainer
      style={style}
      testID={testID || 'order-status-timeline'}
    >
      {timelineSteps.map((step, index) => {
        const { status } = step;
        const isActive = 'isCompleted' in step ? step.isCompleted : true;
        const config = STATUS_CONFIG[status];
        const timestamp = timestamps?.[status];
        const isLast = index === timelineSteps.length - 1;

        return (
          <React.Fragment key={status}>
            <TimelineStep
              isActive={isActive}
              testID={`timeline-step-${status.toLowerCase()}`}
            >
              <IconSymbol
                name={config.icon}
                size={24}
                color={isActive ? theme.colors.primary : theme.colors.surfaceVariant}
              />
              <Content>
                <ThemedText
                  type="defaultSemiBold"
                  color={isActive ? theme.colors.primary : theme.colors.onSurfaceVariant}
                >
                  {config.text}
                </ThemedText>
                <ThemedText
                  type="default"
                  color={theme.colors.onSurfaceVariant}
                >
                  {config.description}
                </ThemedText>
                {timestamp && (
                  <ThemedText
                    type="default"
                    color={theme.colors.onSurfaceVariant}
                  >
                    {timestamp}
                  </ThemedText>
                )}
              </Content>
            </TimelineStep>
            {!isLast && (
              <TimelineConnector
                isActive={isActive}
                testID={`timeline-connector-${status.toLowerCase()}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </TimelineContainer>
  );
}); 