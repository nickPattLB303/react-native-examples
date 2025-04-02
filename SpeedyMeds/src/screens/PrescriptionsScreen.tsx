import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper"; // Use Paper Text for consistency
import styled from "styled-components/native"; // Import styled
import type { AppTheme } from "../theme/theme"; // Import AppTheme type

/**
 * @description Screen component for displaying and managing user prescriptions.
 * Currently a placeholder. Uses styled-components with the shared theme.
 * @returns {React.ReactElement} The rendered Prescriptions screen.
 */
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
 * Uses theme for font size.
 */
const TitleText = styled(Text)`
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.customFontSizes.xl}px; /* Example theme usage */
`;

const PrescriptionsScreen = () => {
  return (
    <ScreenContainer>
      <TitleText variant="headlineMedium">Prescriptions Screen</TitleText>
    </ScreenContainer>
  );
};

// Removed StyleSheet.create

export default PrescriptionsScreen;
