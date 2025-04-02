import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper"; // Use Paper Text for consistency
import styled from "styled-components/native"; // Import styled
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator"; // Adjust path as needed
import type { AppTheme } from "../theme/theme"; // Import AppTheme type

/**
 * @description Props for the OrderDetailScreen.
 * Includes navigation props provided by React Navigation's NativeStackScreenProps
 * and expects an `orderId` string within the route parameters.
 * @typedef {object} OrderDetailProps
 * @property {NativeStackScreenProps<RootStackParamList, "OrderDetail">['route']} route - Route object containing parameters.
 * @property {NativeStackScreenProps<RootStackParamList, "OrderDetail">['navigation']} navigation - Navigation object.
 */
type OrderDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "OrderDetail"
>;

/**
 * @description Styled container for the screen content.
 * Applies theme-based padding and background color, centers content.
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
 * @description Styled text component for the screen title.
 * Uses theme for font size and margin.
 */
const TitleText = styled(Text)`
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.customFontSizes.xl}px; /* Example theme usage */
  margin-bottom: ${({ theme }: { theme: AppTheme }) =>
    theme.customSpacing.m}px; /* Example theme usage */
`;

/**
 * @description Styled text component for displaying information.
 * Uses theme for font size.
 */
const InfoText = styled(Text)`
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.customFontSizes.m}px; /* Example theme usage */
`;

/**
 * @description Screen component to display details for a specific order.
 * Retrieves the `orderId` from the route parameters passed during navigation.
 * @param {OrderDetailProps} props - The component props.
 * @param {object} props.route - The route object provided by React Navigation.
 * @param {object} props.route.params - Parameters passed to this route.
 * @param {string} props.route.params.orderId - The unique identifier for the order to display.
 * @returns {React.ReactElement} The rendered Order Detail screen.
 */
const OrderDetailScreen: React.FC<OrderDetailProps> = ({ route }) => {
  // Access the route params
  const { orderId } = route.params;

  return (
    <ScreenContainer>
      <TitleText variant="headlineMedium">Order Detail Screen</TitleText>
      <InfoText variant="bodyLarge">Order ID: {orderId}</InfoText>
    </ScreenContainer>
  );
};

// Removed StyleSheet.create

export default OrderDetailScreen;
