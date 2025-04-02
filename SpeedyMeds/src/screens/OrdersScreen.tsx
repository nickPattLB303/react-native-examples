import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper"; // Import Paper Button & Text
import styled from "styled-components/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import parent navigator type
import {
  RootStackParamList,
  BottomTabParamList,
} from "../navigation/AppNavigator";
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
 * Includes navigation props provided by React Navigation's BottomTabScreenProps
 * for the 'Orders' screen within the `BottomTabParamList`.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Orders">} OrdersProps
 */
type OrdersProps = BottomTabScreenProps<BottomTabParamList, "Orders">;

/**
 * @description Screen component for displaying user orders or related actions.
 * Includes a button to navigate to a specific order's detail screen.
 * Uses React Native Paper components and styled-components with the shared theme.
 * @param {OrdersProps} props - The component props.
 * @param {OrdersProps['navigation']} props.navigation - Navigation object provided by React Navigation (specific to Bottom Tab Navigator).
 * @returns {React.ReactElement} The rendered Orders screen.
 */
const OrdersScreen: React.FC<OrdersProps> = ({ navigation }) => {
  /**
   * @description Handles navigation to the OrderDetail screen.
   */
  const handlePress = () => {
    // Navigate to OrderDetail screen with a dummy orderId
    // Note: Navigating from a Tab screen to a Stack screen requires getting the parent navigator.
    const parentNavigator =
      navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
    if (parentNavigator) {
      parentNavigator.navigate("OrderDetail", { orderId: "12345" });
    } else {
      // Handle case where parent navigator might not be available (optional logging/error)
      console.warn("Could not get parent navigator to navigate to OrderDetail");
    }
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
