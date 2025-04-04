/**
 * Orders List Screen Component
 *
 * @file This file defines the React component for the main "Orders" list screen.
 * @module screens/OrdersScreen
 *
 * @purpose Displays a list of the user's past and current medication orders.
 * It fetches order data from the global Zustand store and handles loading, error,
 * and empty states. Users can tap on an order to navigate to the `OrderDetailScreen`.
 * This screen acts as the root screen within the `OrdersStackNavigator`.
 *
 * @dependencies
 * - React: For component logic.
 * - React Native (`FlatList`): For efficiently rendering the list of orders.
 * - React Native Paper (`Button`, `Text`, `List`, `Divider`, `useTheme`): For UI elements.
 * - @react-navigation/native-stack: For navigation prop types (`NativeStackScreenProps`).
 * - Internal:
 *   - `../navigation/types`: For stack-specific parameter list (`OrdersStackParamList`).
 *   - `../theme/theme`: For `AppTheme` type definition.
 *   - `../stores/appDataStore`: Hook (`useAppDataStore`) to access global order state, loading/error status.
 *   - `../types`: For `Order` type definition.
 *   - `../components/LoadingIndicator`: Reusable loading component.
 *   - `../components/ErrorDisplay`: Reusable error display component.
 *   - `../components/ScreenContainer`: Reusable screen wrapper.
 *
 * @see {@link ../navigation/OrdersStackNavigator.tsx | Orders Stack Navigator}
 * @see {@link ./OrderDetailScreen.tsx | Order Detail Screen}
 * @see {@link ../stores/appDataStore.ts | App Data Store (Zustand)}
 * @see {@link https://reactnavigation.org/docs/native-stack-navigator | React Navigation Native Stack Navigator}
 * @see {@link https://reactnative.dev/docs/flatlist | React Native FlatList}
 */

import React from "react";
import { FlatList, View } from "react-native"; // Core components for lists and layout
// Import UI components from React Native Paper
import { Button, Text, List, Divider, useTheme } from "react-native-paper";
// Import navigation prop types specifically for Native Stack screens
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Import the specific ParamList for the Orders stack from the central types file
// This defines the routes and their parameters within this specific stack navigator.
import { OrdersStackParamList } from "../navigation/types";
// Import the AppTheme type for strong typing when using theme properties
import type { AppTheme } from "../theme/theme";
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";
// Import the Order type definition
import type { Order } from "../types";
// Import reusable custom components
import LoadingIndicator from "../components/LoadingIndicator"; // Shows when loading
import ErrorDisplay from "../components/ErrorDisplay"; // Shows on error
import ScreenContainer from "../components/ScreenContainer"; // Consistent screen padding/background

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * Defines the shape of the navigation props specifically for the OrdersScreen.
 *
 * @description This type uses `NativeStackScreenProps` because this screen lives inside
 * a `NativeStackNavigator`. It's parameterized with `OrdersStackParamList` (listing all
 * screens and their params within this stack) and `"OrdersList"` (the name of this specific screen).
 * This provides type safety for the `navigation` and `route` props.
 *
 * @typedef {NativeStackScreenProps<OrdersStackParamList, "OrdersList">} OrdersScreenProps
 * @property navigation - The navigation object used to navigate to other screens in the stack (e.g., `OrderDetail`).
 * @property route - The route object containing information about the current route (key, name). No params are expected for this list screen itself.
 * @see {@link https://reactnavigation.org/docs/typescript/#type-checking-the-navigator | React Navigation: Type checking the navigator}
 */
type OrdersScreenProps = NativeStackScreenProps<
  OrdersStackParamList,
  "OrdersList" // This name must match the screen name defined in OrdersStackNavigator
>;

// ============================================================================
// Orders Screen Component Definition
// ============================================================================

/**
 * The main functional component for the Orders list screen.
 *
 * @description Fetches and displays a list of user orders from the global Zustand store.
 * Handles loading, error, and empty states. Allows navigation to the detail view for each order.
 *
 * @param {OrdersScreenProps} props - Component props provided by React Navigation.
 *        Destructures the `navigation` object for triggering navigation actions.
 * @returns {React.ReactElement} The rendered UI for the Orders list screen.
 */
const OrdersScreen: React.FC<OrdersScreenProps> = ({
  navigation, // Destructure the navigation object from props
}): React.ReactElement => {
  // --- State and Theme Access ---

  // Access global state slices from the Zustand store using selectors for performance.
  const orders = useAppDataStore((state) => state.orders);
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // Access the theme object for styling.
  const theme = useTheme<AppTheme>();

  // --- Navigation Handler ---

  /**
   * Navigates to the OrderDetail screen, passing the selected order's ID.
   *
   * @function handleNavigateToDetail
   * @param {string} orderId - The unique ID of the order to display details for.
   */
  const handleNavigateToDetail = (orderId: string): void => {
    // Use the navigation object provided by the Stack Navigator.
    // Navigate to the 'OrderDetail' screen (defined within the same OrdersStack).
    // Pass the required `orderId` as a route parameter.
    navigation.navigate("OrderDetail", { orderId: orderId });
  };

  // --- List Item Renderer ---

  /**
   * Renders a single order item component for the FlatList.
   *
   * @function renderOrderItem
   * @param {object} listItemProps - The props provided by FlatList for each item.
   * @param {Order} listItemProps.item - The data object for the current order.
   * @returns {React.ReactElement} A JSX element representing one row in the order list.
   * @see {@link https://reactnative.dev/docs/flatlist#renderitem | FlatList renderItem prop}
   * @see {@link https://callstack.github.io/react-native-paper/docs/components/List/ListItem/ | Paper List.Item}
   */
  const renderOrderItem = ({
    item, // Destructure the 'item' data
  }: {
    item: Order; // Explicitly type the 'item'
  }): React.ReactElement => (
    <List.Item
      // Display drug name and dosage as the main title
      title={`${item.drugName} ${item.dosage}`}
      // Display order number and status as the description
      description={`Order #${item.orderNumber} - ${item.status}`}
      // Display the formatted order date on the right side
      right={() => (
        <Text
          variant="bodySmall"
          style={{ alignSelf: "center", marginRight: 8 }} // Align vertically and add margin
        >
          {/* Format the date. Consider a library like date-fns for more complex needs. */}
          {item.orderDate.toLocaleDateString()}
        </Text>
      )}
      // Call the navigation handler when the item is pressed
      onPress={() => handleNavigateToDetail(item.id)}
      // Add a leading icon for visual context
      left={(props) => <List.Icon {...props} icon="receipt" />} // Use 'receipt' or similar
      // Accessibility: Provide a comprehensive label for screen readers
      accessibilityLabel={`Order for ${item.drugName}, ${
        item.dosage
      }. Order number ${
        item.orderNumber
      }. Status: ${item.status}. Date: ${item.orderDate.toLocaleDateString()}. Press to view details.`}
    />
  );

  // --- Conditional Rendering Logic ---

  // 1. Loading State: Show indicator only during initial load (when orders list is empty).
  if (isLoading && orders.length === 0) {
    return <LoadingIndicator message="Loading Orders..." />;
  }

  // 2. Error State: Show error display if fetching failed.
  if (error) {
    // TODO: Implement a retry mechanism via retryAction prop
    return <ErrorDisplay error={error} />;
  }

  // 3. Empty State: Show message if loading is done, no error, but no orders found.
  if (!isLoading && orders.length === 0) {
    return (
      <ScreenContainer>
        {/* Center the text elements */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            No Orders Found
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              marginTop: theme.customSpacing.s,
              textAlign: "center",
              color: theme.colors.onSurfaceVariant, // Use muted color
            }}
          >
            You haven't placed any orders yet.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  // --- Success State: Render Order List ---
  return (
    <ScreenContainer>
      {/* FlatList efficiently renders the list of orders */}
      {/* See: https://reactnative.dev/docs/flatlist */}
      <FlatList
        data={orders} // The array of order data from Zustand
        renderItem={renderOrderItem} // Function to render each order row
        keyExtractor={(item) => item.id} // Use unique order ID as the key
        ItemSeparatorComponent={() => <Divider />} // Show dividers between items
        contentContainerStyle={{ paddingBottom: theme.customSpacing.l }} // Add padding at the bottom of the list
        // Optional: Add pull-to-refresh later
        // onRefresh={handleRefresh}
        // refreshing={isRefreshing}
      />

      {/* Test Button (Example - Can be removed) */}
      {/* Demonstrates navigating with a hardcoded ID */}
      <Button
        mode="contained"
        onPress={() => handleNavigateToDetail("12345")} // Navigate to a dummy ID
        style={{ margin: theme.customSpacing.m }} // Add margin
        accessibilityLabel="View details for hardcoded test order 12345"
      >
        View Hardcoded Order 12345 (Test)
      </Button>
    </ScreenContainer>
  );
};

export default OrdersScreen; // Export the component for use in the navigator
