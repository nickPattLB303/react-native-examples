/**
 * Profile Screen
 * 
 * This screen should display the user's profile information.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.description}>
        This screen should display the user's profile information.
      </Text>
      <Text style={styles.todo}>
        TODO: Implement the user profile display.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a8577',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  todo: {
    fontSize: 14,
    color: '#dc3545',
    fontStyle: 'italic',
    marginTop: 20,
  },
}); 