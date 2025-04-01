import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styled from 'styled-components/native';

const ScreenContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const TitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.customFontSizes.xxl}px;
  margin-bottom: ${({ theme }) => theme.customSpacing.m}px;
`;

/**
 * @description The main dashboard/home screen of the application.
 * Displays a welcome message or key dashboard elements.
 * Uses React Native Paper components and styled-components with the shared theme.
 */
const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <TitleText variant="headlineLarge">Home Screen (Dashboard)</TitleText>
      <Text variant="bodyMedium">Welcome to SpeedyMeds!</Text>
    </ScreenContainer>
  );
};

export default HomeScreen; 