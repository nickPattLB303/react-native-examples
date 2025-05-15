import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

// Import the Root ParamList type from the central types file
import type { RootStackParamList } from "./types";
// Import the MainTabNavigator which contains the app's primary sections
import MainTabNavigator from "./MainTabNavigator";

/**
 * Root Application Navigator Setup
 *
 * This file defines the top-level navigation structure for the SpeedyMeds app.
 * It sets up the `NavigationContainer` which is essential for React Navigation to work,
 * and defines the Root Stack Navigator.
 *
 * The Root Stack primarily holds the `MainTabNavigator`, but could also include
 * screens that need to be displayed *outside* or *on top of* the main tabs,
 * such as full-screen modals (e.g., a login screen shown initially, or a settings modal).
 *
 * @see https://reactnavigation.org/docs/getting-started/ - React Navigation Getting Started Guide
 * @see https://reactnavigation.org/docs/navigation-container/ - `NavigationContainer` documentation
 * @see https://reactnavigation.org/docs/native-stack-navigator/ - Native Stack Navigator documentation
 */

/**
 * Creates the Root Native Stack Navigator instance.
 * We pass the `RootStackParamList` to ensure type safety for screens defined
 * directly within this root stack.
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * @description Defines the expected props for the main AppNavigator component.
 * This interface ensures that the component receives the necessary theme information.
 */
interface AppNavigatorProps {
  /**
   * @description The navigation theme object provided by React Navigation (`@react-navigation/native`).
   * This theme object (containing colors, etc.) will be applied to the `NavigationContainer`,
   * influencing the default appearance of navigator elements like headers and tab bars.
   * It's typically derived from the application's overall theme (light/dark mode).
   * @see https://reactnavigation.org/docs/themes/ - React Navigation Theming documentation
   */
  navigationTheme: Theme;
}

/**
 * @description The main application navigator component. This is the top-level navigator
 * that should be rendered within the main `App.tsx` file, inside necessary context providers
 * (like ThemeProvider, PaperProvider, etc.).
 *
 * It sets up the `NavigationContainer` which links the navigator state to the app environment,
 * and defines the root `NativeStackNavigator`. The primary screen within this root stack
 * is the `MainTabNavigator`, which holds the app's main sections.
 *
 * @param {AppNavigatorProps} props - The component props containing the navigation theme.
 * @param {Theme} props.navigationTheme - The theme object to apply.
 * @returns {React.ReactElement} The fully configured root navigator component for the application.
 */
function AppNavigator({
  navigationTheme,
}: AppNavigatorProps): React.ReactElement {
  // Define default screen options for the Root Stack Navigator.
  const rootScreenOptions: NativeStackNavigationOptions = {
    // `headerShown: false` hides the header bar for the Root Stack itself.
    // This is common practice when the primary screen is a Tab Navigator,
    // as the screens *within* the Tab Navigator (or nested stacks) will manage their own headers.
    // This prevents having a double header (one for the root stack, one for the tab screen).
    headerShown: false,
  };

  return (
    /**
     * The `NavigationContainer` is a mandatory component that wraps the entire navigator structure.
     * It manages the navigation tree and contains the navigation state. It also handles deep linking
     * and connects the navigator to the device's back button/gestures.
     * We pass the `navigationTheme` prop here to theme the navigator elements.
     */
    <NavigationContainer theme={navigationTheme}>
      {/* Define the Root Stack Navigator */}
      {/* `screenOptions` applies the `rootScreenOptions` defined above to all screens in this stack. */}
      <RootStack.Navigator screenOptions={rootScreenOptions}>
        {/* Define the primary screen within the Root Stack. */}
        <RootStack.Screen
          // `name` must match a key in `RootStackParamList` ('MainTabs').
          name="MainTabs"
          // `component` renders the imported `MainTabNavigator` component.
          component={MainTabNavigator}
          // No specific `options` needed here as the header is hidden by `screenOptions`.
        />
        {/*
         * Add other screens directly to the Root Stack here if needed.
         * These screens would typically be modals or screens presented outside the tab flow.
         * Example:
         * <RootStack.Screen
         *   name="SettingsModal"
         *   component={SettingsScreen}
         *   options={{ presentation: 'modal', headerShown: true, title: 'Settings' }}
         * />
         */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// Export the main AppNavigator component.
export default AppNavigator;
