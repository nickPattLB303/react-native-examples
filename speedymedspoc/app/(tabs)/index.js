import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

/**
 * Dashboard Screen Placeholder Component.
 *
 * This is the default screen for the 'Dashboard' tab, serving as the main landing area.
 * It demonstrates basic component structure, styling, layout, and event handling.
 *
 * Key Concepts Introduced Here:
 * - Core Components: <View>, <Text>, <Button>
 * - JSX Syntax
 * - StyleSheet for styling
 * - Flexbox for layout
 * - Event handling with onPress
 * - Declarative UI programming
 *
 * @returns {React.JSX.Element} The rendered dashboard screen placeholder.
 */
export default function DashboardScreen() {
  /**
   * Handles the press event for the button.
   * In a real app, this would trigger a meaningful action.
   */
  const handleButtonPress = () => {
    alert('Button Pressed!');
  };

  return (
    // View: The most fundamental component for building UI.
    // Serves as a container that supports layout with flexbox, styling,
    // touch handling, and accessibility controls.
    // @see https://reactnative.dev/docs/view
    <View style={styles.container}>
      {/* Text: A component for displaying text content. */}
      {/* @see https://reactnative.dev/docs/text */}
      <Text style={styles.title}>Dashboard Screen</Text>

      {/* Button: A basic platform-specific button component. */}
      {/* The 'onPress' prop takes a function to be called when the button is tapped. */}
      {/* @see https://reactnative.dev/docs/button */}
      <Button
        title="Press Me!"
        onPress={handleButtonPress} // Event handler function
      />

      {/* --- TODOs for Development --- */}
      {/* 1. Replace placeholders with actual dashboard content (e.g., summary cards). */}
      {/* 2. Add more components (<Image>, <ScrollView> if needed). */}
      {/* 3. Implement more complex event handling logic. */}
      {/* 4. Create and use custom components for repeated UI elements. */}
      {/* 5. Explore different Flexbox layout configurations. */}
    </View>
  );
}

/**
 * StyleSheet: API for creating style objects in React Native.
 * - Uses JavaScript objects with camelCase properties (e.g., backgroundColor).
 * - Provides performance optimizations (styles sent over the bridge once).
 * - Helps organize styling rules separately from component logic.
 * @see https://reactnative.dev/docs/stylesheet
 * @see https://reactnative.dev/docs/style
 * @see https://reactnative.dev/docs/flexbox
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the View occupy all available space in its parent.
    justifyContent: 'center', // Aligns children vertically in the center (main axis).
    alignItems: 'center', // Aligns children horizontally in the center (cross axis).
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // Add space below the title before the button
  },
});
