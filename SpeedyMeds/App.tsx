import React, { useEffect } from "react";
import { AppState, Platform } from "react-native";
import type { AppStateStatus } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import AppNavigator from "./src/navigation/AppNavigator";
import {
  ThemeProvider as CustomThemeProvider,
  useThemeContext,
} from "./src/context/ThemeContext"; // Import our custom provider
// Import the combined navigation themes
import { CombinedNavLightTheme, CombinedNavDarkTheme } from "./src/theme/theme";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { useInitializeAppData } from "./src/hooks/useInitializeAppData"; // Import the hook

/**
 * @description Inner component responsible for setting up theme providers (Paper, Styled Components)
 * and rendering the main AppNavigator. It consumes the theme context provided by CustomThemeProvider.
 * It also determines the correct navigation theme and status bar style based on the current theme mode.
 * @returns {React.ReactElement} The themed application content including the navigator and status bar.
 */
const AppContent = () => {
  const { theme, isDark } = useThemeContext(); // Get theme from our context

  // Determine navigation theme based on isDark
  const navigationTheme = isDark ? CombinedNavDarkTheme : CombinedNavLightTheme;

  // Initialize app data fetching
  useInitializeAppData();

  return (
    <PaperProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        {/* Pass navigationTheme to AppNavigator */}
        <AppNavigator navigationTheme={navigationTheme} />
        {/* Adjust StatusBar based on theme */}
        <StatusBar style={isDark ? "light" : "dark"} />
      </StyledThemeProvider>
    </PaperProvider>
  );
};

// React Query Online Manager setup
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// React Query App Focus setup
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

// Create a client
const queryClient = new QueryClient();

/**
 * @description The root component of the application.
 * Wraps the entire application within the `CustomThemeProvider` to provide
 * theme context to all descendants. It renders the `AppContent` component
 * which handles the setup of other providers and the main navigator.
 * @returns {React.ReactElement} The root application component.
 */
export default function App() {
  // Subscribe to AppState changes for focus management
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}
