/**
 * Orders List Screen Component (Placeholder)
 *
 * @file This file defines the placeholder React component for the main "Orders" list screen.
 * @module screens/OrdersScreen
 *
 * @purpose This serves as a minimal placeholder for the Orders list screen,
 * ensuring navigation works while feature development is pending.
 * It verifies theme context integration by applying themed background/text colors.
 * Includes a button to test navigation to the detail placeholder.
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../navigation/types';
import type { AppTheme } from '../theme/theme';

// ============================================================================
// Navigation Props Type
// ============================================================================

type OrdersScreenProps = NativeStackScreenProps<
  OrdersStackParamList,
  'OrdersList'
>;

// ============================================================================
// Styled Components (Minimal Container)
// ============================================================================

const PlaceholderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.colors.background};
`;

// ============================================================================
// Orders Screen Component Definition (Placeholder)
// ============================================================================

/**
 * The placeholder functional component for the Orders list screen.
 *
 * @param {OrdersScreenProps} props - Navigation props.
 * @returns {React.ReactElement} The rendered placeholder UI.
 */
const OrdersScreen: React.FC<OrdersScreenProps> = ({
  navigation,
}): React.ReactElement => {
  const theme = useTheme<AppTheme>();

  const handleNavigateToDetail = (orderId: string): void => {
    navigation.navigate("OrderDetail", { orderId });
  };

  return (
    <PlaceholderContainer>
      <Text
        variant="headlineMedium"
        style={{ color: theme.colors.onBackground, marginBottom: 16 }}
      >
        Orders List Placeholder
      </Text>
      {/* Button to test navigating to the Order Detail Placeholder */}
      <Button
        mode="contained"
        onPress={() => handleNavigateToDetail("TEST_ORD_123")}
        style={{ marginTop: theme.customSpacing.m }}
        accessibilityLabel="Navigate to Order Detail placeholder screen with test ID"
      >
        Go to Detail Placeholder (TEST_ORD_123)
      </Button>
    </PlaceholderContainer>
  );
};

export default OrdersScreen;
