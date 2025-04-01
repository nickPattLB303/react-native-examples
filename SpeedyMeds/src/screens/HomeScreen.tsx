import React from "react";
import { View } from "react-native";
import { Text, SegmentedButtons } from "react-native-paper";
import styled from "styled-components/native";
import { useThemeContext } from "../context/ThemeContext";
import type { ThemePreference } from "../context/ThemeContext";

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
 * Displays a welcome message and theme selection controls.
 * Uses React Native Paper components and styled-components with the shared theme.
 */
const HomeScreen: React.FC = () => {
  const { themePreference, setThemePreference, theme } = useThemeContext();

  return (
    <ScreenContainer>
      <TitleText variant="headlineLarge">Home Screen (Dashboard)</TitleText>
      <Text
        variant="bodyMedium"
        style={{ marginBottom: theme.customSpacing.l }}
      >
        Welcome to SpeedyMeds!
      </Text>

      <SegmentedButtons
        value={themePreference}
        onValueChange={(value) => setThemePreference(value as ThemePreference)}
        buttons={[
          {
            value: "light",
            label: "Light",
            icon: "brightness-5",
          },
          {
            value: "dark",
            label: "Dark",
            icon: "brightness-4",
          },
          {
            value: "system",
            label: "System",
            icon: "brightness-auto",
          },
        ]}
        style={{ width: "90%" }}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
