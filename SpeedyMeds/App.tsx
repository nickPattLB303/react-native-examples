import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";
import AppNavigator from "./src/navigation/AppNavigator";
import theme from "./src/theme/theme"; // Import the actual theme

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
