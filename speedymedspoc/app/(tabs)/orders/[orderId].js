import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

/**
 * Order Detail Screen Placeholder Component.
 *
 * Displays details for a specific order, identified by the 'orderId' route parameter.
 * Demonstrates receiving and using dynamic route parameters and the useEffect hook.
 *
 * Key Concepts Introduced Here:
 * - Expo Router: Dynamic routes ([param]), useLocalSearchParams hook
 * - Core Hooks: useEffect (for side effects like data fetching)
 * - Dependency array in useEffect
 *
 * @returns {React.JSX.Element} The rendered order detail screen placeholder.
 */
export default function OrderDetailScreen() {
  // useLocalSearchParams Hook: Accesses parameters passed through the dynamic route segment.
  // The key ('orderId') matches the filename: [orderId].js.
  // @see https://docs.expo.dev/router/reference/hooks/#uselocalsearchparams
  const { orderId } = useLocalSearchParams();

  // useEffect Hook: Performs side effects after rendering.
  // Used here to simulate fetching data based on the received orderId.
  // @see https://react.dev/reference/react/useEffect
  useEffect(() => {
    // This function runs when the component mounts and whenever 'orderId' changes.
    console.log("Effect triggered: Fetching details for order:", orderId);

    // --- Placeholder for data fetching logic ---
    // Example:
    // const fetchOrderDetails = async (id) => {
    //   try {
    //     // const response = await fetch(`/api/orders/${id}`);
    //     // const data = await response.json();
    //     // Update component state with fetched data here...
    //   } catch (error) {
    //     console.error("Failed to fetch order details:", error);
    //   }
    // };
    // fetchOrderDetails(orderId);
    // -----------------------------------------

    // Optional: Return a cleanup function if the effect needs cleanup
    // (e.g., unsubscribing from listeners, clearing timers).
    // return () => {
    //   console.log("Cleaning up effect for order:", orderId);
    // };

  }, [orderId]); // Dependency Array: Ensures the effect re-runs if 'orderId' changes.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Detail Screen</Text>
      {/* Display the orderId received from the route parameters */}
      <Text style={styles.text}>Details for Order ID: {orderId}</Text>

      {/* --- TODOs for Development --- */}
      {/* 1. Implement actual data fetching logic within useEffect. */}
      {/* 2. Manage loading and error states during data fetching. */}
      {/* 3. Display the fetched order details in the UI. */}
      {/* 4. Add more detailed styling for order information. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
}); 