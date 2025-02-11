import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from './challenge/context-api/completed/src/context/ThemeContext';
import { HomeScreen } from './challenge/context-api/completed/src/screens/HomeScreen';

/**
 * Root App Component
 * 
 * Sets up the theme provider and demonstrates proper context
 * provider hierarchy.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
