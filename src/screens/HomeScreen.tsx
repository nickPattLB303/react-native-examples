import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

// TODO: Import and use the useTheme hook
// Expected Behavior: Screen should adapt to theme changes
// Hint: Use useTheme to access current theme values

/**
 * HomeScreen Component
 * 
 * Demonstrates theme application across different UI elements
 * and proper context consumption patterns.
 * 
 * Usage:
 * ```tsx
 * <HomeScreen />
 * ```
 */
export const HomeScreen: React.FC = () => {
  // TODO: Access theme context
  // Expected Behavior: Use theme values for styling
  // Hint: Destructure theme object from useTheme hook

  return (
    <ScrollView
      // TODO: Apply theme background color
      style={styles.container}
    >
      <Text
        // TODO: Apply theme text color
        style={styles.title}
      >
        Theme Demo
      </Text>
      
      <View style={styles.card}>
        <Text
          // TODO: Apply theme text color
          style={styles.cardText}
        >
          This card demonstrates theme application to various UI elements.
          The background, text color, and border should all adapt to the
          current theme.
        </Text>
      </View>

      <ThemeSwitcher />
    </ScrollView>
  );
};

// TODO: Update styles to use theme values
// Expected Behavior: All styles should adapt to current theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    // TODO: Add theme-based shadow styles
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 