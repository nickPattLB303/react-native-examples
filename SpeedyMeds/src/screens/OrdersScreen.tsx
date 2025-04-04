import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper"; // Import Paper Button & Text
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Use NativeStackScreenProps
import { OrdersStackParamList } from "../navigation/types"; // Import from types.ts
import type { AppTheme } from "../theme/theme"; // Import AppTheme type

/**
 * @description A styled `View` component serving as the main container for the screen.
 * Centers content and applies theme-based padding and background color.
 */
const ScreenContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

/**
 * @description Props for the OrdersScreen.
 * Includes navigation props provided by React Navigation's NativeStackScreenProps
 * for the 'OrdersList' screen within the `OrdersStackParamList`.
 * @typedef {NativeStackScreenProps<OrdersStackParamList, "OrdersList">} OrdersProps
 */
type OrdersProps = NativeStackScreenProps<OrdersStackParamList, "OrdersList">;

/**
 * @description Screen component for displaying user orders or related actions.
 * Includes a button to navigate to a specific order's detail screen.
 * Uses React Native Paper components and styled-components with the shared theme.
 * @param {OrdersProps} props - The component props.
 * @param {OrdersProps['navigation']} props.navigation - Navigation object provided by React Navigation (specific to Native Stack Navigator).
 * @returns {React.ReactElement} The rendered Orders screen.
 */
const OrdersScreen: React.FC<OrdersProps> = ({ navigation }) => {
  /**
   * @description Handles navigation to the OrderDetail screen.
   */
  const handlePress = () => {
    // Navigate to OrderDetail screen within the same OrdersStack
    navigation.navigate("OrderDetail", { orderId: "12345" });
  };

  return (
    <ScreenContainer>
      {/* Use Paper Text with variants */}
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Orders Screen
      </Text>
      {/* Use Paper Button */}
      <Button mode="contained" onPress={handlePress}>
        View Order 12345
      </Button>
    </ScreenContainer>
  );
};

export default OrdersScreen;
