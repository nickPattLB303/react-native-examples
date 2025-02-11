import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

// TODO: Import and use the useTheme hook
// Expected Behavior: Component should switch between light and dark themes
// Hint: Destructure theme and toggleTheme from useTheme hook

/**
 * ThemeSwitcher Component
 * 
 * Provides UI controls for switching between light and dark themes.
 * Demonstrates proper usage of Context API with hooks.
 * 
 * Usage:
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export const ThemeSwitcher: React.FC = () => {
  // TODO: Implement theme switching logic
  // Expected Behavior: Toggle switch should change app theme
  // Hint: Use useTheme hook to access current theme and toggle function

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Mode</Text>
      <Switch
        // TODO: Add switch props for theme toggling
        // Expected Behavior: Switch should reflect current theme state
      />
    </View>
  );
};

// TODO: Update styles to use theme values
// Expected Behavior: Styles should adapt to current theme
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginRight: 8,
  },
}); 