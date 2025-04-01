import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components/native';
import AppNavigator from './src/navigation/AppNavigator';

// TODO: Define or import theme later
const theme = {}; // Placeholder theme

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
