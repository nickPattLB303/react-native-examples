/**
 * @module OrderDetailsScreen
 * @description Order details screen component that shows detailed order information
 * @since 1.0.0
 */

import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function OrderDetailsScreen
 * @description Displays detailed information about a specific order
 * @returns {React.ReactElement} A screen component showing order details
 * 
 * @example
 * ```tsx
 * <Stack.Screen name="orders/details" component={OrderDetailsScreen} />
 * ```
 */
export default function OrderDetailsScreen(): React.ReactElement {
  return (
    <ScreenContainer>
      <ThemedText type="title">Order Details</ThemedText>
    </ScreenContainer>
  );
} 