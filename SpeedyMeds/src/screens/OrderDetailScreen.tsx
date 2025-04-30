/**
 * Order Detail Screen Component (Placeholder)
 *
 * @file This file defines the placeholder React component for the Order Detail screen.
 * @module screens/OrderDetailScreen
 *
 * @purpose This serves as a minimal placeholder for the Order Detail screen,
 * ensuring navigation works while feature development is pending.
 * It verifies navigation parameters (`orderId`) are received and displays the ID.
 * It verifies theme context integration by applying themed background/text colors.
 */

import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrdersStackParamList } from "../navigation/types";
import type { AppTheme } from "../theme/theme";

// ============================================================================
// Navigation Props Type
// ============================================================================

type OrderDetailScreenProps = NativeStackScreenProps<
  OrdersStackParamList,
  "OrderDetail"
>;

// ============================================================================
// Styled Components (Minimal Container)
// ============================================================================

const PlaceholderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

// ============================================================================
// Order Detail Screen Component Definition (Placeholder)
// ============================================================================

/**
 * The placeholder functional component for the Order Detail screen.
 *
 * @param {OrderDetailScreenProps} props - Navigation props including `route`.
 * @returns {React.ReactElement} The rendered placeholder UI.
 */
const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  route,
}): React.ReactElement => {
  const theme = useTheme<AppTheme>();
  const { orderId } = route.params; // Extract orderId from navigation parameters

  return (
    <PlaceholderContainer>
      <Text
        variant="headlineMedium"
        style={{ color: theme.colors.onBackground, marginBottom: 16 }}
      >
        Order Detail Placeholder
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onBackground }}>
        Received Order ID: {orderId}
      </Text>
    </PlaceholderContainer>
  );
};

export default OrderDetailScreen;
