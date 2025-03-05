/**
 * Home Screen (Medication List)
 * 
 * This screen should display a list of medications.
 * Users should be able to tap on a medication to view its details.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medications</Text>
      <Text style={styles.description}>
        This screen should display a list of medications.
      </Text>
      <Text style={styles.todo}>
        TODO: Implement a list of medications that navigates to the MedicationDetailScreen when tapped.
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