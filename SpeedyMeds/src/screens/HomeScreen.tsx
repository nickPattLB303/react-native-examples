/**
 * Home Screen (Dashboard) Component
 *
 * This is the main landing screen of the application after the user is authenticated (implicitly, in this version).
 * It typically displays summary information, quick actions, or serves as a central navigation point.
 * Currently, it displays a welcome message and provides controls to change the application theme.
 *
 * @module screens/HomeScreen
 * @see screens/AccountScreen - Example of another screen using similar patterns.
 * @see context/ThemeContext - Context providing theme state and functions.
 */

import React from "react";
import { View } from "react-native";
// Import UI components from React Native Paper
import { Text, SegmentedButtons } from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import the custom hook to access the theme context
import { useThemeContext } from "../context/ThemeContext";
// Import the type definition for theme preference values
import type { ThemePreference } from "../context/ThemeContext";
// Import the AppTheme type for strong typing with styled-components and theme usage
import type { AppTheme } from "../theme/theme";
// Import navigation prop types (even if not used directly, good practice for screen components)
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types";

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * @description Defines the navigation props expected by the HomeScreen.
 * Uses `BottomTabScreenProps` specific to its position within the `MainTabNavigator`.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Home">} HomeScreenProps
 */
type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;

// ============================================================================
// Styled Components
// ============================================================================

/**
 * @description A styled `View` component serving as the main container for the screen content.
 * It ensures the container takes up the full screen height (`flex: 1`), centers its children
 * both horizontally (`align-items: center`) and vertically (`justify-content: center`),
 * applies standard padding from the theme, and sets the background color based on the theme.
 *
 * Note: The explicit `{ theme: AppTheme }` typing for the `theme` prop within the template literal
 * is a robust way to ensure TypeScript provides correct autocompletion and type checking,
 * even if global `styled-components` theme typing (`styled.d.ts`) is set up.
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
 * @description A styled `Text` component specifically for the main title of the screen.
 * It leverages the theme for setting the text color (`primary`), font size (`xxl`),
 * and adds a bottom margin using theme spacing constants.
 */
const TitleText = styled(Text)`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  font-size: ${({ theme }: { theme: AppTheme }) => theme.customFontSizes.xxl}px;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  text-align: center; /* Ensure title is centered if it wraps */
`;

// ============================================================================
// Home Screen Component
// ============================================================================

/**
 * @description The main dashboard/home screen component.
 * It utilizes the `useThemeContext` hook to get the current theme preference (`themePreference`),
 * the function to update it (`setThemePreference`), and the active theme object (`theme`).
 * It displays a welcome message and uses React Native Paper's `SegmentedButtons`
 * to allow the user to switch between light, dark, and system theme preferences.
 *
 * @param {HomeScreenProps} props - Navigation props provided by React Navigation.
 *        Currently unused but included for completeness and future potential use.
 * @returns {React.ReactElement} The rendered Home screen UI.
 */
const HomeScreen: React.FC<HomeScreenProps> = (_props: HomeScreenProps) => {
  // Destructure values from the theme context using the custom hook.
  const { themePreference, setThemePreference, theme } = useThemeContext();

  return (
    <ScreenContainer>
      {/* Display the main title using the styled TitleText component and a Paper variant */}
      <TitleText variant="headlineLarge">Home Screen (Dashboard)</TitleText>

      {/* Display a welcome message */}
      <Text
        variant="bodyMedium"
        // Apply margin using inline style with theme spacing for demonstration
        style={{ marginBottom: theme.customSpacing.l }}
      >
        Welcome to SpeedyMeds!
      </Text>

      {/* Theme selection buttons */}
      {/* @see https://callstack.github.io/react-native-paper/docs/components/SegmentedButtons/ */}
      <SegmentedButtons
        // `value` controls which button is currently selected. It's bound to the `themePreference` from context.
        value={themePreference}
        // `onValueChange` is called when the user selects a different button.
        // We call `setThemePreference` from context to update the global theme state.
        // The `value` received is cast to `ThemePreference` to satisfy TypeScript.
        onValueChange={(value) => setThemePreference(value as ThemePreference)}
        // `buttons` is an array defining the configuration for each button in the group.
        buttons={[
          {
            value: "light", // Must match a ThemePreference value
            label: "Light", // Text displayed on the button
            icon: "brightness-5", // Icon name from MaterialCommunityIcons
            // accessibilityLabel: "Set light theme", // Good for accessibility
          },
          {
            value: "dark",
            label: "Dark",
            icon: "brightness-4",
            // accessibilityLabel: "Set dark theme",
          },
          {
            value: "system",
            label: "System",
            icon: "brightness-auto",
            // accessibilityLabel: "Use system theme setting",
          },
        ]}
        // Apply some basic styling to the button group container.
        style={{ width: "90%" }} // Make the group take up most of the screen width
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
