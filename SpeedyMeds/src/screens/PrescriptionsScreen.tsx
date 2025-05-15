/**
 * Prescriptions List Screen Component (Placeholder)
 *
 * @file This file defines the placeholder React component for the "Prescriptions" screen.
 * @module screens/PrescriptionsScreen
 *
 * @purpose This serves as a minimal placeholder for the Prescriptions screen,
 * ensuring navigation works while feature development is pending.
 * It verifies theme context integration by applying themed background/text colors.
 */

import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import type { AppTheme } from "../theme/theme";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types";

// ============================================================================
// Navigation Props Type
// ============================================================================

type PrescriptionsScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Prescriptions"
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
// Prescriptions Screen Component Definition (Placeholder)
// ============================================================================

/**
 * The placeholder functional component for the Prescriptions screen.
 *
 * @param {PrescriptionsScreenProps} _props - Navigation props (typed but unused).
 * @returns {React.ReactElement} The rendered placeholder UI.
 */
const PrescriptionsScreen: React.FC<PrescriptionsScreenProps> = (
  _props: PrescriptionsScreenProps,
): React.ReactElement => {
  const theme = useTheme<AppTheme>();

  return (
    <PlaceholderContainer>
      <Text
        variant="headlineMedium"
        style={{ color: theme.colors.onBackground }}
      >
        Prescriptions Screen Placeholder
      </Text>
    </PlaceholderContainer>
  );
};

export default PrescriptionsScreen;
