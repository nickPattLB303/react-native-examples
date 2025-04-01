import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper"; // Import Paper Button & Text
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// Styled container using theme
const ScreenContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

// Define the props type using the RootStackParamList and the screen name
type OrdersProps = NativeStackScreenProps<RootStackParamList, "Orders">;

/**
 * @description Screen to display a list of orders or order-related actions.
 * Uses React Native Paper components and styled-components with the shared theme.
 */
const OrdersScreen: React.FC<OrdersProps> = ({ navigation }) => {
  /**
   * @description Handles navigation to the OrderDetail screen.
   */
  const handlePress = () => {
    // Navigate to OrderDetail screen with a dummy orderId
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
