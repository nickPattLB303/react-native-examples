/**
 * @module OrdersLayout
 * @description Stack navigation layout for the Orders section
 * @since 1.0.0
 */

import { Stack } from 'expo-router';
import React from 'react';

/**
 * @function OrdersLayout
 * @description Manages the stack navigation for the Orders tab, including list and detail views
 * @returns {React.ReactElement} A stack navigator component for order-related screens
 */
export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Orders',
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Order Details',
        }}
      />
    </Stack>
  );
} 