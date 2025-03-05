/**
 * Medication Detail Screen
 * 
 * This screen should display detailed information about a specific medication.
 * It should receive the medication data as a parameter from the HomeScreen.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MedicationDetailScreen() {
  // TODO: Get the medication data from route.params
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Details</Text>
      <Text style={styles.description}>
        This screen should display detailed information about a specific medication.
      </Text>
      <Text style={styles.todo}>
        TODO: Display the medication details received from route.params.
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