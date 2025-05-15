/**
 * Root Application Component (App.tsx)
 *
 * This is the entry point and highest-level component of the SpeedyMeds application.
 * Its primary responsibilities are:
 *   - Setting up global context providers (React Query, Custom Theme).
 *   - Configuring React Query's focus and online status management for React Native.
 *   - Rendering the main application structure (`AppContent`).
 *
 * Provider Hierarchy:
 * The order of providers matters. Generally, data providers like React Query should wrap
 * theme providers if the theme might depend on fetched data (not the case here),
 * but theme providers must wrap components that consume the theme.
 *   - QueryClientProvider (React Query)
 *     - CustomThemeProvider (Our Theme Context)
 *       - AppContent
 *         - PaperProvider (React Native Paper Theme)
 *         - StyledThemeProvider (Styled Components Theme)
 *           - AppNavigator (React Navigation Container)
 *             - Screens...
 *
 * @module App
 * @see context/ThemeContext - Provides theme state and functions.
 * @see navigation/AppNavigator - Defines the app's navigation structure.
 * @see hooks/useInitializeAppData - Hook to fetch initial data and populate Zustand store.
 * @see https://tanstack.com/query/v5/docs/react/overview - React Query (TanStack Query) Docs
 * @see https://reactnative.dev/docs/appstate - React Native AppState API
 * @see https://github.com/react-native-netinfo/react-native-netinfo - React Native NetInfo Docs
 * @see https://callstack.github.io/react-native-paper/docs/guides/getting-started/ - React Native Paper Setup
 * @see https://styled-components.com/docs/basics#react-native - Styled Components React Native Setup
 */

import React, { useEffect } from "react";
// Import React Native APIs for detecting app state and platform
import { AppState, Platform } from "react-native";
import type { AppStateStatus } from "react-native";
// Import Expo component for controlling the status bar appearance
import { StatusBar } from "expo-status-bar";
// Import Theme provider from React Native Paper
import { Provider as PaperProvider } from "react-native-paper";
// Import Theme provider from Styled Components
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
// Import the root navigator component
import AppNavigator from "./src/navigation/AppNavigator";
// Import our custom theme context provider and hook
import {
  ThemeProvider as CustomThemeProvider,
  useThemeContext,
} from "./src/context/ThemeContext";
// Import the pre-combined themes suitable for React Navigation
import { CombinedNavLightTheme, CombinedNavDarkTheme } from "./src/theme/theme";
// Import React Query (TanStack Query) core components and utilities
import {
  QueryClient, // The client instance managing the cache
  QueryClientProvider, // Provider component to make the client available
  onlineManager, // Utility to manage online/offline status
  focusManager, // Utility to manage window/app focus status
} from "@tanstack/react-query";
// Import NetInfo library to detect network connectivity changes
import NetInfo from "@react-native-community/netinfo";
// Import the custom hook that triggers initial data fetching
import { useInitializeAppData } from "./src/hooks/useInitializeAppData";

// --- React Query Native Configuration ---

/**
 * Configures React Query's `onlineManager` for React Native.
 * It uses `@react-native-community/netinfo` to listen for network connectivity changes
 * and informs React Query whether the app is online or offline. This allows React Query
 * to automatically pause/resume queries and refetch data when connectivity is restored.
 * @see https://tanstack.com/query/v5/docs/react/react-native#online-status-management
 */
onlineManager.setEventListener((setOnline) => {
  // `setOnline` is a function provided by React Query to update its internal online state.
  // We subscribe to NetInfo state changes.
  return NetInfo.addEventListener((state) => {
    // Update React Query's online status based on the `isConnected` flag from NetInfo.
    setOnline(!!state.isConnected);
  });
});

/**
 * Callback function triggered when the application's state changes (active, background, inactive).
 * Used to inform React Query's `focusManager` about the app's focus state.
 * @param {AppStateStatus} status - The new state of the application.
 * @see https://tanstack.com/query/v5/docs/react/react-native#refetch-on-app-focus
 * @see https://reactnative.dev/docs/appstate
 */
function onAppStateChange(status: AppStateStatus) {
  // On Web platforms, focus management is handled differently by the browser.
  if (Platform.OS !== "web") {
    // `focusManager.setFocused` tells React Query whether the app window is focused.
    // React Query uses this to trigger refetches when the app comes back into focus (if configured).
    focusManager.setFocused(status === "active");
  }
}

/**
 * Create a single instance of the QueryClient.
 * This client holds the cache and configuration for React Query.
 * It's created once and provided to the application via `QueryClientProvider`.
 * @see https://tanstack.com/query/v5/docs/react/reference/QueryClient
 */
const queryClient = new QueryClient();

// --- App Content Component ---

/**
 * @description Inner component responsible for rendering the core application UI
 * within the necessary context providers (Theme, Paper, Styled Components).
 *
 * Separating this from the main `App` component allows `AppContent` to easily
 * consume the `CustomThemeProvider`'s context using the `useThemeContext` hook,
 * which wouldn't be possible if this logic were directly inside `App`.
 *
 * It performs several key tasks:
 *   - Consumes the theme context (`useThemeContext`).
 *   - Selects the appropriate theme for React Navigation.
 *   - Calls the `useInitializeAppData` hook to trigger initial data fetching.
 *   - Renders the `PaperProvider` and `StyledThemeProvider` with the active theme.
 *   - Renders the `AppNavigator` (passing the navigation theme).
 *   - Renders the `StatusBar` component, styling it based on the active theme.
 *
 * @returns {React.ReactElement} The themed application UI structure.
 */
const AppContent = (): React.ReactElement => {
  // 1. Consume our custom theme context to get the active theme and mode.
  const { theme, isDark } = useThemeContext();

  // 2. Select the correct theme object specifically adapted for React Navigation.
  const navigationTheme = isDark ? CombinedNavDarkTheme : CombinedNavLightTheme;

  // 3. Call the custom hook to initiate background data fetching.
  // This hook uses React Query and updates the Zustand store. It doesn't return UI.
  useInitializeAppData();

  // 4. Render the UI within the necessary theme providers.
  return (
    // PaperProvider makes the React Native Paper theme available to Paper components.
    <PaperProvider theme={theme}>
      {/* StyledThemeProvider makes the theme available to styled-components. */}
      {/* Crucially, we pass the *same* theme object to both providers for consistency. */}
      <StyledThemeProvider theme={theme}>
        {/* Render the main navigation structure, passing the navigation-specific theme */}
        <AppNavigator navigationTheme={navigationTheme} />
        {/* Configure the device's status bar style (time, battery, etc.) */}
        {/* Set style to 'light' content on dark backgrounds, 'dark' content on light backgrounds. */}
        <StatusBar style={isDark ? "light" : "dark"} />
      </StyledThemeProvider>
    </PaperProvider>
  );
};

// --- Root App Component ---

/**
 * @description The root component of the SpeedyMeds application.
 * Sets up the top-level providers (`QueryClientProvider`, `CustomThemeProvider`)
 * and subscribes to AppState changes for React Query focus management.
 *
 * @returns {React.ReactElement} The root application component wrapped in providers.
 */
export default function App(): React.ReactElement {
  // Subscribe to AppState changes when the component mounts.
  // This ensures `onAppStateChange` is called whenever the app goes to the background or foreground.
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    // Cleanup function: Remove the listener when the App component unmounts.
    return () => {
      subscription.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  // Render the application structure.
  return (
    // QueryClientProvider makes the `queryClient` instance available to all components
    // that use React Query hooks (like `useQuery`).
    <QueryClientProvider client={queryClient}>
      {/* CustomThemeProvider provides our application theme context (light/dark/system preference). */}
      <CustomThemeProvider>
        {/* AppContent renders the rest of the app within the theme context. */}
        <AppContent />
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}
