/**
 * Home Screen (Dashboard) Component (Placeholder)
 *
 * @file This file defines the placeholder React component for the main "Home" or dashboard screen.
 * @module screens/HomeScreen
 *
 * @purpose Serves as a minimal placeholder for the Home screen,
 * ensuring navigation works while feature development is pending.
 * It verifies theme context integration by applying themed background/text colors.
 */

import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styled from 'styled-components/native';
import type { AppTheme } from '../theme/theme';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../navigation/types';

// ============================================================================
// Navigation Props Type
// ============================================================================

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

// ============================================================================
// Styled Components (Minimal Container)
// ============================================================================

const PlaceholderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.colors.background};
`;

// ============================================================================
// Home Screen Component Definition (Placeholder)
// ============================================================================

/**
 * The placeholder functional component for the Home screen.
 *
 * @param {HomeScreenProps} _props - Navigation props (typed but unused).
 * @returns {React.ReactElement} The rendered placeholder UI.
 */
const HomeScreen: React.FC<HomeScreenProps> = (
  _props: HomeScreenProps,
): React.ReactElement => {
  const theme = useTheme<AppTheme>();

  return (
    <PlaceholderContainer>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
        Home Screen Placeholder
      </Text>
    </PlaceholderContainer>
  );
};

export default HomeScreen;
