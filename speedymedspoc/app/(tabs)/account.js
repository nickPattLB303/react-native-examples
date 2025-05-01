import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

/**
 * Account Screen Placeholder Component.
 *
 * Displays user account information and actions.
 * Demonstrates layout with sections, event handling, and potential for custom components.
 *
 * Key Concepts Introduced Here:
 * - Layout with <View> and Flexbox (implicit via StyleSheet)
 * - Core Components: <Button>, <ScrollView>
 * - Event handling: onPress
 * - Structuring UI into sections
 * - Potential for custom component usage
 *
 * @returns {React.JSX.Element} The rendered account screen placeholder.
 */
export default function AccountScreen() {
  /**
   * Placeholder function for handling profile edits.
   */
  const handleEditProfile = () => {
    alert('Edit Profile TBD');
  };

  /**
   * Placeholder function for handling user sign-out.
   */
  const handleSignOut = () => {
    alert('Sign Out TBD');
    // In a real app: Clear auth state, reset app state, navigate to login.
  };

  return (
    // ScrollView allows content to scroll if it exceeds screen height.
    // contentContainerStyle applies styles to the container *within* the ScrollView.
    // @see https://reactnative.dev/docs/scrollview
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Account Screen</Text>

      {/* Section 1: User Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Information</Text>
        <Text style={styles.text}>Name: Jane Doe (Placeholder)</Text>
        <Text style={styles.text}>Email: jane.doe@example.com</Text>
      </View>

      {/* Section 2: Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit Profile" onPress={handleEditProfile} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sign Out" color="red" onPress={handleSignOut} />
        </View>
      </View>

      {/* --- TODOs for Development --- */}
      {/* 1. Replace placeholders with actual user data from state/context. */}
      {/* 2. Implement actual logic for 'Edit Profile' and 'Sign Out'. */}
      {/* 3. Add more sections (e.g., Payment Methods, Notification Settings). */}
      {/* 4. Create reusable custom components (e.g., <SettingsRow>, <ProfileHeader>). */}
      {/* 5. Enhance styling and layout. */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the container can grow to fit content, enabling scroll.
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    // Basic shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
  },
}); 