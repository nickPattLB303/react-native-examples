import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Orders List Screen Placeholder Component.
 *
 * Displays a list of orders and allows navigation to order details.
 * Demonstrates list rendering, navigation with parameters, and handling presses.
 *
 * Key Concepts Introduced Here:
 * - Core Components: <FlatList>, <Pressable>
 * - Expo Router: useRouter hook, router.push(), stack navigation concept
 * - Event handling: onPress on <Pressable>
 * - Passing route parameters
 *
 * @returns {React.JSX.Element} The rendered orders list screen placeholder.
 */
export default function OrdersListScreen() {
  // useRouter hook: Provides access to the router instance for navigation actions.
  // @see https://docs.expo.dev/router/reference/hooks/#userouter
  const router = useRouter();

  // State for mock order data
  const [orders, setOrders] = useState([
    { id: 'ord123', date: '2024-07-28', status: 'Delivered' },
    { id: 'ord456', date: '2024-07-25', status: 'Delivered' },
    { id: 'ord789', date: '2024-08-01', status: 'Processing' },
  ]);

  /**
   * Navigates to the Order Detail screen for the selected order.
   * Uses router.push with a dynamic path segment.
   *
   * @param {string} orderId - The unique ID of the order to navigate to.
   */
  const handleNavigateToDetails = (orderId) => {
    // router.push navigates forward, adding the new screen to the stack.
    // The path uses a template literal to include the dynamic orderId.
    // This path corresponds to the file 'app/(tabs)/orders/[orderId].js'.
    // @see https://docs.expo.dev/router/navigating/navigating-between-pages/
    router.push(`/orders/${orderId}`);
    // Note: This navigation happens within the stack defined in 'app/(tabs)/orders/_layout.js'
  };

  /**
   * Renders a single order item row for the FlatList.
   * Each row is a Pressable component to handle taps.
   *
   * @param {object} params
   * @param {object} params.item - The order data item.
   * @returns {React.JSX.Element}
   */
  const renderOrderItem = ({ item }) => (
    // Pressable: A core component for making views interactive.
    // Provides feedback during different press states.
    // @see https://reactnative.dev/docs/pressable
    <Pressable
      style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}
      onPress={() => handleNavigateToDetails(item.id)}
    >
      <Text style={styles.itemText}>Order #{item.id}</Text>
      <Text style={styles.itemText}>{item.date}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders List Screen</Text>

      {/* FlatList renders the list of orders */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
      />

      {/* --- TODOs for Development --- */}
      {/* 1. Fetch real order data instead of using mock state. */}
      {/* 2. Add error handling and loading indicators for data fetching. */}
      {/* 3. Implement filtering or search functionality. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    marginBottom: 1,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure items take full width for consistent border
  },
  listItemPressed: {
    backgroundColor: '#e0e0e0', // Visual feedback on press
  },
  itemText: {
    fontSize: 16,
  },
}); 