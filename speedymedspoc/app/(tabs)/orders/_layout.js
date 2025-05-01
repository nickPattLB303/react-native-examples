import { Stack } from 'expo-router';

/**
 * Stack Navigator Layout for the Orders section.
 *
 * This layout defines the navigation stack specifically for the screens
 * accessed within the "Orders" tab. It allows for push/pop navigation
 * between the orders list and order details.
 *
 * Having a nested stack navigator within a tab allows each tab to maintain
 * its own navigation history independently.
 *
 * @see https://docs.expo.dev/router/layouts/ - Expo Router Layouts Documentation
 * @see https://docs.expo.dev/router/navigating/stack/ - Expo Router Stack Navigator Documentation
 * @see https://reactnavigation.org/docs/nesting-navigators/ - React Navigation Nesting Concept
 */
export default function OrdersLayout() {
  return (
    <Stack>
      {/* The initial screen for this stack is the orders list */}
      <Stack.Screen
        name="index" // Corresponds to app/(tabs)/orders/index.js
        options={{
          title: 'Your Orders', // Set the header title for the list screen
          // You can customize header styles here if needed
        }}
      />
      {/* The order detail screen - note the dynamic segment name '[orderId]' */}
      {/* The name here matches the filename '[orderId].js' */}
      <Stack.Screen
        name="[orderId]" // Corresponds to app/(tabs)/orders/[orderId].js
        options={{
          title: 'Order Details', // Set the header title for the detail screen
          // Example: You could dynamically set the title based on params later
          // title: ({ params }) => `Order #${params.orderId}`,
        }}
      />
      {/* Add other screens specific to the Orders flow here if needed */}
    </Stack>
  );
} 