/**
 * Theme Selector Component
 *
 * @file This file defines a reusable component for selecting the app's theme.
 * @module components/ThemeSelector
 *
 * @purpose Provides UI controls (Segmented Buttons) to switch between
 * light, dark, and system default themes. It uses the ThemeContext to
 * get the current theme preference and update it.
 *
 * @dependencies
 * - React: For component logic.
 * - React Native Paper (`SegmentedButtons`, `useTheme`): For UI elements and accessing theme spacing.
 * - Internal:
 *   - `../context/ThemeContext`: Hook (`useThemeContext`) to access and modify theme state.
 *   - `../theme/theme`: For `AppTheme` type definition.
 *   - `../types`: For `ThemePreference` type.
 */

import React from "react";
import { SegmentedButtons, useTheme } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext";
import type { ThemePreference } from "../context/ThemeContext";
import type { AppTheme } from "../theme/theme";

/**
 * A component that renders segmented buttons for theme selection.
 *
 * @returns {React.ReactElement} The rendered ThemeSelector component.
 */
const ThemeSelector: React.FC = (): React.ReactElement => {
  // Get theme state and functions from the ThemeContext
  const { themePreference, setThemePreference } = useThemeContext();
  // Get theme object for spacing values
  const theme = useTheme<AppTheme>();

  return (
    <SegmentedButtons
      value={themePreference} // Controlled component: value reflects current state
      // Update the theme preference state in the context when a button is selected
      onValueChange={
        (value) => setThemePreference(value as ThemePreference) // Cast value to ThemePreference type
      }
      // Define the buttons to display
      buttons={[
        {
          value: "light", // Value passed to onValueChange
          label: "Light", // Text displayed on the button
          icon: "brightness-5", // Icon name (MaterialCommunityIcons)
          accessibilityLabel: "Set light theme", // Label for screen readers
        },
        {
          value: "dark",
          label: "Dark",
          icon: "brightness-4",
          accessibilityLabel: "Set dark theme",
        },
        {
          value: "system",
          label: "System",
          icon: "brightness-auto",
          accessibilityLabel: "Use system theme setting",
        },
      ]}
      style={{
        // Apply margins using theme spacing for consistency
        marginTop: theme.customSpacing.l,
        marginBottom: theme.customSpacing.m,
        marginHorizontal: theme.customSpacing.m, // Add horizontal margin
      }}
    />
  );
};

export default ThemeSelector;
