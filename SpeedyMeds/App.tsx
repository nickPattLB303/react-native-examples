import React from "react";
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

// Inner component to access the theme context
const AppContent = () => {
  const { theme, isDark } = useThemeContext(); // Get theme from our context

  // Determine navigation theme based on isDark
  const navigationTheme = isDark ? CombinedNavDarkTheme : CombinedNavLightTheme;

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

// Main App component wraps everything in our custom ThemeProvider
export default function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}
