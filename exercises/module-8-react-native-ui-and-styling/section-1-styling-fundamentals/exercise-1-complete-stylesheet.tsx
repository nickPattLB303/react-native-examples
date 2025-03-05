/**
 * @fileoverview Exercise 1: Style Transformation Complete - Using StyleSheet API
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

/**
 * Component that displays styled information about a medication
 * @param {object} props - Component props
 * @param {string} props.name - Name of the medication
 * @param {string} props.dosage - Dosage of the medication
 * @param {string} props.schedule - Schedule for taking the medication
 * @returns {React.ReactElement} Styled medication item component
 */
interface MedicationItemProps {
  name: string;
  dosage: string;
  schedule: string;
}

export default function MedicationItem({ name, dosage, schedule }: MedicationItemProps) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Image 
          source={{ 
            uri: 'https://cdn-icons-png.flaticon.com/512/822/822163.png' 
          }}
          style={styles.icon}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.medicationName}>{name}</Text>
        <Text style={styles.medicationDosage}>{dosage}</Text>
        <Text style={styles.medicationSchedule}>{schedule}</Text>
      </View>
    </View>
  );
}

/**
 * Main app component that demonstrates the styled MedicationItem
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: '3x daily' },
    { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: '1x daily' },
    { id: '3', name: 'Metformin', dosage: '1000mg', schedule: '2x daily' }
  ];

  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitle}>My Medications</Text>
      {medications.map(med => (
        <MedicationItem 
          key={med.id}
          name={med.name}
          dosage={med.dosage}
          schedule={med.schedule}
        />
      ))}
    </View>
  );
}

/**
 * StyleSheet for all component styles
 */
const styles = StyleSheet.create({
  // App container and title styles
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 40,
  },
  
  // Medication item styles
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // Platform-specific shadow styling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  // Icon styling
  iconContainer: {
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  
  // Content styling
  contentContainer: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  medicationSchedule: {
    fontSize: 14,
    color: '#888',
  },
});