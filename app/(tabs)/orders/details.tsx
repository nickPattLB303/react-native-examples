/**
 * @module OrderDetailsScreen
 * @description Order details screen component
 * @since 1.0.0
 */

import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function OrderDetailsScreen
 * @description Displays detailed information about a specific order
 * @returns {React.ReactElement} A screen component showing order details
 */
export default function OrderDetailsScreen() {
  return (
    <ScreenContainer>
      <ThemedText type="title">Order Details</ThemedText>
    </ScreenContainer>
  );
} 