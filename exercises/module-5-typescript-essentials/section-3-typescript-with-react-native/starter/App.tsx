import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

// ToDo: Define interface for medication reminder

// Sample data - this would normally come from an API or storage
const sampleMedications = [
  { id: 1, name: 'Aspirin', dosage: '100mg', time: '8:00 AM', taken: false },
  { id: 2, name: 'Vitamin D', dosage: '1000 IU', time: '9:00 AM', taken: true },
  { id: 3, name: 'Metformin', dosage: '500mg', time: '1:00 PM', taken: false },
  { id: 4, name: 'Lisinopril', dosage: '10mg', time: '7:00 PM', taken: false },
];

// ToDo: Create a type-safe MedicationItem component

// ToDo: Create a type-safe MedicationList component 

export default function App() {
  // ToDo: Implement the medication tracker app
  // 1. Use proper TypeScript types for state
  // 2. Add handlers for taking medications
  // 3. Create a summary of medications taken/pending

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medication Tracker</Text>
      {/* Implement your medication list here */}
      <Text style={styles.instructions}>
        Complete the ToDo items to build a type-safe medication tracker!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0066cc',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 