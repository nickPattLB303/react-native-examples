/**
 * @module OrdersScreen
 * @description Main orders list screen component
 * @since 1.0.0
 */

import { Link } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function OrdersScreen
 * @description Displays a list of orders and provides navigation to order details
 * @returns {React.ReactElement} A screen component showing the orders list
 */
export default function OrdersScreen() {
  return (
    <ScreenContainer>
      <ThemedText type="title">Orders</ThemedText>
      <Link href="/orders/details" asChild>
        <Button mode="contained">View Order Details</Button>
      </Link>
    </ScreenContainer>
  );
} 