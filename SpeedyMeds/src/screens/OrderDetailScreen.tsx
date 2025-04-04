/**
 * Order Detail Screen Component
 *
 * This screen displays detailed information about a specific order.
 * It retrieves the unique identifier (`orderId`) for the order from the
 * navigation route parameters passed when navigating to this screen.
 *
 * @module screens/OrderDetailScreen
 * @see navigation/OrdersStackNavigator - The navigator that contains this screen.
 * @see screens/OrdersScreen - The screen typically used to navigate *to* this screen.
 */

import React from "react";
import { View } from "react-native";
// Import UI components from React Native Paper
import { Text, ActivityIndicator, useTheme } from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import navigation prop types, specifically for Native Stack screens
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Import the specific ParamList for the Orders stack from the central types file
import { OrdersStackParamList } from "../navigation/types";
// Import the AppTheme type for strong typing with styled-components and theme usage
import type { AppTheme } from "../theme/theme";
// Import hook to access global state (though not used for fetching order details *yet*)
// import useAppDataStore from "../stores/appDataStore";
// Import hook/API call for fetching specific order details (if implemented)
// import { useQuery } from '@tanstack/react-query';
// import { fetchOrderDetail } from '../api'; // Assuming an API function exists
// import { queryKeys } from '../api/queryKeys';

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * @description Defines the navigation props expected by the OrderDetailScreen.
 * Uses `NativeStackScreenProps` and specifies its place within the `OrdersStackParamList`,
 * indicating that it expects an `orderId` in its route parameters.
 * @typedef {NativeStackScreenProps<OrdersStackParamList, "OrderDetail">} OrderDetailScreenProps
 * @property {object} route - The route object provided by React Navigation.
 * @property {object} route.params - Parameters passed to this route.
 * @property {string} route.params.orderId - The unique identifier for the order.
 * @property {object} navigation - The navigation object for performing navigation actions.
 * @see https://reactnavigation.org/docs/typescript/#type-checking-screens - Type checking screens
 * @see https://reactnavigation.org/docs/params/ - Passing parameters to routes
 */
type OrderDetailScreenProps = NativeStackScreenProps<
  OrdersStackParamList,
  "OrderDetail" // This must match the screen name in the navigator and the key in the ParamList
>;

// ============================================================================
// Styled Components
// ============================================================================

/**
 * @description Styled `View` component serving as the main container for the screen content.
 * Centers content and applies theme-based padding and background color.
 */
const ScreenContainer = styled(View)`
  flex: 1;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

/**
 * @description Styled `Text` component for the screen title.
 * Uses theme properties for styling.
 */
const TitleText = styled(Text)`
  /* Use a specific variant for semantic meaning and consistent styling */
  /* variant="headlineMedium" is applied directly on the component instance below */
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  text-align: center;
`;

/**
 * @description Styled `Text` component for displaying informational content.
 * Uses theme properties for styling.
 */
const InfoText = styled(Text)`
  /* Use a specific variant for semantic meaning */
  /* variant="bodyLarge" is applied directly on the component instance below */
  text-align: center;
`;

// ============================================================================
// Order Detail Screen Component
// ============================================================================

/**
 * @description Screen component responsible for displaying the details of a specific order.
 * It retrieves the `orderId` from the navigation parameters (`route.params`).
 *
 * **Future Enhancements:**
 *   - Fetch detailed order data using the `orderId` (e.g., using TanStack Query and a `fetchOrderDetail` API function).
 *   - Display more order details (items, shipping status, tracking info, cost, etc.).
 *   - Handle loading and error states for the data fetching.
 *
 * @param {OrderDetailScreenProps} props - Component props provided by React Navigation.
 *        Crucially contains the `route` object with the `orderId` parameter.
 * @returns {React.ReactElement} The rendered Order Detail screen UI.
 */
const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ route }) => {
  // Access the theme object for potential inline styling needs.
  const theme = useTheme<AppTheme>();

  // --- Accessing Route Parameters ---
  // Destructure the `orderId` directly from `route.params`.
  // React Navigation ensures that if this screen is navigated to correctly
  // (according to the types defined in OrdersStackParamList), `route.params`
  // will contain an `orderId` property of type string.
  const { orderId } = route.params;

  // --- Data Fetching (Placeholder) ---
  // In a real application, you would use the orderId to fetch detailed data.
  // Example using TanStack Query (if implemented):
  /*
  const { data: orderDetails, isLoading, error } = useQuery({
    queryKey: queryKeys.orderDetail(orderId), // Use a query key factory if defined
    queryFn: () => fetchOrderDetail(orderId), // Assumes fetchOrderDetail API function exists
    enabled: !!orderId, // Only run the query if orderId is available
  });

  if (isLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        <InfoText style={{ marginTop: theme.customSpacing.s }}>Loading Order Details...</InfoText>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <InfoText style={{ color: theme.colors.error }}>Error loading order details: {error.message}</InfoText>
      </ScreenContainer>
    );
  }

  if (!orderDetails) {
     return (
      <ScreenContainer>
        <InfoText>Order details not found.</InfoText>
      </ScreenContainer>
    );
  }
  */
  // --- End Data Fetching Placeholder ---

  // --- Render UI ---
  // Currently, just displays the passed orderId.
  return (
    <ScreenContainer>
      <TitleText variant="headlineMedium">Order Detail Screen</TitleText>
      {/* Display the retrieved order ID */}
      <InfoText variant="bodyLarge">Displaying details for Order ID:</InfoText>
      <InfoText variant="bodyLarge" style={{ fontWeight: "bold" }}>
        {orderId}
      </InfoText>

      {/* Placeholder for where more details would go */}
      {/* <InfoText>Status: {orderDetails?.status}</InfoText> */}
      {/* <InfoText>Ordered On: {orderDetails?.orderDate.toLocaleDateString()}</InfoText> */}
      {/* ... etc. ... */}
    </ScreenContainer>
  );
};

export default OrderDetailScreen;
