/**
 * Orders List Screen Component
 *
 * This screen displays a list of the user's past and current orders.
 * It serves as the entry point within the Orders navigation stack.
 * Users can tap on an order in the list to navigate to the `OrderDetailScreen`.
 *
 * @module screens/OrdersScreen
 * @see navigation/OrdersStackNavigator - The navigator containing this screen.
 * @see screens/OrderDetailScreen - The screen navigated to from here.
 * @see stores/appDataStore - The Zustand store providing the orders data.
 */

import React from "react";
import { FlatList } from "react-native"; // Import FlatList for rendering lists
// Import UI components from React Native Paper
import { Button, Text, List, Divider, useTheme } from "react-native-paper";
// Import navigation prop types, specifically for Native Stack screens
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Import the specific ParamList for the Orders stack from the central types file
import { OrdersStackParamList } from "../navigation/types";
// Import the AppTheme type for strong typing with styled-components and theme usage
import type { AppTheme } from "../theme/theme";
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";
// Import the Order type
import type { Order } from "../types";
// Import reusable components
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";
import ScreenContainer from "../components/ScreenContainer";

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * @description Defines the navigation props expected by the OrdersScreen.
 * Uses `NativeStackScreenProps` and specifies its place ('OrdersList') within the `OrdersStackParamList`.
 * This screen doesn't expect any parameters itself, but its `navigation` prop
 * can be used to navigate to other screens within the same stack (like 'OrderDetail').
 * @typedef {NativeStackScreenProps<OrdersStackParamList, "OrdersList">} OrdersScreenProps
 * @property {object} navigation - The navigation object for performing navigation actions.
 * @property {object} route - The route object (contains key and name, no params expected here).
 */
type OrdersScreenProps = NativeStackScreenProps<
  OrdersStackParamList,
  "OrdersList" // This must match the screen name in the navigator and the key in the ParamList
>;

// ============================================================================
// Orders Screen Component
// ============================================================================

/**
 * @description Screen component responsible for displaying a list of the user's orders.
 * It retrieves the orders list, loading status, and error status from the
 * global `useAppDataStore` (Zustand). It renders the list using `FlatList` and
 * allows navigation to the `OrderDetailScreen` for each order.
 *
 * @param {OrdersScreenProps} props - Component props provided by React Navigation,
 *        primarily used for the `navigation` object.
 * @returns {React.ReactElement} The rendered Orders list screen UI.
 */
const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  // Access the global state from the Zustand store.
  // Select only the slices needed for this screen using individual selectors
  // to prevent unnecessary re-renders.
  const orders = useAppDataStore((state) => state.orders);
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // Access the theme object.
  const theme = useTheme<AppTheme>();

  /**
   * @description Handles navigation to the OrderDetail screen when an order item is pressed.
   * It uses the `navigation.navigate` method provided by the `navigation` prop
   * (which comes from the NativeStackScreenProps).
   * @param {string} orderId - The unique ID of the order to navigate to.
   */
  const handleNavigateToDetail = (orderId: string) => {
    // Navigate to the 'OrderDetail' screen within the *same* OrdersStack.
    // Pass the required `orderId` as a parameter in the second argument object.
    navigation.navigate("OrderDetail", { orderId: orderId });
  };

  /**
   * @description Renders a single order item within the FlatList.
   * Uses React Native Paper's List.Item for consistent styling.
   * @param {object} props - Props containing the item data.
   * @param {Order} props.item - The order data object for the current row.
   * @returns {React.ReactElement} The rendered list item component.
   */
  const renderOrderItem = ({ item }: { item: Order }): React.ReactElement => (
    <List.Item
      title={`${item.drugName} ${item.dosage}`} // Combine drug name and dosage for the title
      description={`Order #${item.orderNumber} - ${item.status}`} // Show order number and status
      // Display the order date, formatted nicely
      // Note: Consider using a date formatting library like `date-fns` or `moment` for complex formatting
      right={() => (
        <Text
          variant="bodySmall"
          style={{ alignSelf: "center", marginRight: 8 }}
        >
          {item.orderDate.toLocaleDateString()}
        </Text>
      )}
      // Navigate to detail screen on press, passing the order ID
      onPress={() => handleNavigateToDetail(item.id)}
      // Add a left icon for visual flair (optional)
      left={(props) => <List.Icon {...props} icon="receipt" />} // Use 'receipt' or similar icon
    />
  );

  // --- Loading State ---
  // Show loading indicator only during initial load (when orders array is empty)
  if (isLoading && orders.length === 0) {
    // Use the reusable LoadingIndicator component
    return <LoadingIndicator message="Loading Orders..." />;
  }

  // --- Error State ---
  if (error) {
    // Use the reusable ErrorDisplay component
    // TODO: Implement retry mechanism by passing a retryAction prop
    return <ErrorDisplay error={error} />;
  }

  // --- Empty State ---
  // Handle the case where loading is finished, no error, but no orders exist.
  if (!isLoading && orders.length === 0) {
    // Use ScreenContainer for consistent padding/background
    // Center content using inline styles for now
    return (
      <ScreenContainer>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          No Orders Found
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            marginTop: theme.customSpacing.s,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          You haven't placed any orders yet.
        </Text>
      </ScreenContainer>
    );
  }

  // --- Success State (Render Order List) ---
  return (
    <ScreenContainer>
      {/* Use FlatList for efficient rendering of lists.
          It only renders items currently visible on screen. */}
      {/* @see https://reactnative.dev/docs/flatlist */}
      <FlatList
        data={orders} // The array of order data from the Zustand store
        renderItem={renderOrderItem} // Function to render each item in the list
        keyExtractor={(item) => item.id} // Function to extract a unique key for each item (order ID is perfect)
        // Add dividers between items for better visual separation
        ItemSeparatorComponent={() => <Divider />}
        // Optional: Add pull-to-refresh functionality later
        // onRefresh={handleRefresh} // Define a handleRefresh function
        // refreshing={isRefreshing} // Control the refresh indicator state
      />

      {/* Example Button (kept from previous version, might be removed in final design) */}
      {/* This button demonstrates navigating to a specific hardcoded order */}
      <Button
        mode="contained"
        onPress={() => handleNavigateToDetail("12345")} // Navigate to a dummy ID
        style={{ margin: theme.customSpacing.m }} // Add margin around the button
      >
        View Hardcoded Order 12345 (Test)
      </Button>
    </ScreenContainer>
  );
};

export default OrdersScreen;
