import React, { useEffect } from "react";
import { StyleSheet, View, Text, AppState, Platform } from "react-native";
import type { AppStateStatus } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { useColorScheme } from "react-native";

// Import custom theme provider and themes
import { ThemeProvider } from "./src/context/ThemeContext";
import { CombinedNavLightTheme, CombinedNavDarkTheme } from "./src/theme/theme";

// Import hooks
import {
  useDashboardQuery,
  useOrdersQuery,
  usePrescriptionsQuery,
  useUserProfileQuery,
} from "./src/hooks/useDataQueries";

/**
 * @description Inner component responsible for setting up theme providers (Paper, Styled Components)
 * and rendering the main AppNavigator. It consumes the theme context provided by CustomThemeProvider.
 * It also determines the correct navigation theme and status bar style based on the current theme mode.
 * @returns {React.ReactElement} The themed application content including the navigator and status bar.
 */
const AppContent = () => {
  const colorScheme = useColorScheme() ?? "light";

  // Determine navigation theme based on isDark
  const navigationTheme =
    colorScheme === "dark" ? CombinedNavDarkTheme : CombinedNavLightTheme;

  // --- Initiate data fetching ---
  // The hooks handle the fetching and updating the Zustand stores via onSuccess
  const { isLoading: isLoadingProfile, error: errorProfile } =
    useUserProfileQuery();
  const { isLoading: isLoadingPrescriptions, error: errorPrescriptions } =
    usePrescriptionsQuery();
  const { isLoading: isLoadingOrders, error: errorOrders } = useOrdersQuery();
  const { isLoading: isLoadingDashboard, error: errorDashboard } =
    useDashboardQuery();

  // Log errors for debugging
  useEffect(() => {
    if (errorProfile || errorPrescriptions || errorOrders || errorDashboard) {
      console.error("Data fetching errors:", {
        profile: errorProfile?.message,
        prescriptions: errorPrescriptions?.message,
        orders: errorOrders?.message,
        dashboard: errorDashboard?.message,
      });
    }
  }, [errorProfile, errorPrescriptions, errorOrders, errorDashboard]);

  return (
    <NavigationContainer theme={navigationTheme}>
      {/* Your AppNavigator will go here once created/imported */}
      {/* For now, showing a placeholder */}
      <View style={styles.placeholderContainer}>
        <Text>App Navigator Placeholder</Text>
        <Text style={styles.loadingText}>
          {isLoadingProfile ||
          isLoadingPrescriptions ||
          isLoadingOrders ||
          isLoadingDashboard
            ? "Loading Data..."
            : "Data Loaded (check Zustand stores)"}
        </Text>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </NavigationContainer>
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
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Add styles for placeholder
const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#6c757d",
  },
});
