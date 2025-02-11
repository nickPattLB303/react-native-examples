import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';

/**
 * Root App Component
 * 
 * Sets up the application's theme context and main navigation structure.
 * Demonstrates proper provider hierarchy and component organization.
 * 
 * Component Structure:
 * - ThemeProvider: Manages global theme state
 * - SafeAreaView: Handles safe area insets
 * - HomeScreen: Main content display
 * 
 * Implementation Notes:
 * - Ensures theme context is available to all child components
 * - Handles safe area on iOS devices
 * - Maintains proper provider ordering
 * 
 * @example
 * ```tsx
 * import App from './App';
 * 
 * // In index.js or similar
 * AppRegistry.registerComponent('AppName', () => App);
 * ```
 */
export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}

/**
 * Base styles for the App component
 * 
 * Note: These styles are theme-independent as they only
 * handle basic layout structure.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the app takes full screen height
  },
});
