/**
 * @fileoverview Exercise 4: Responsive Design Starter - Basic Medication Dashboard
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

/**
 * Simple medication dashboard component
 * This needs to be enhanced to adapt to different screen sizes and orientations
 * @returns {React.ReactElement} Medication dashboard component
 */
export default function MedicationDashboard() {
  const medications = [
    { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: '8:00 AM, 4:00 PM, 12:00 AM', instructions: 'Take with food' },
    { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: '9:00 AM', instructions: 'Take on an empty stomach' },
    { id: '3', name: 'Metformin', dosage: '1000mg', schedule: '9:00 AM, 9:00 PM', instructions: 'Take with meals' },
    { id: '4', name: 'Simvastatin', dosage: '20mg', schedule: '9:00 PM', instructions: 'Take in the evening' },
    { id: '5', name: 'Losartan', dosage: '50mg', schedule: '8:00 AM', instructions: 'Take as directed' }
  ];

  const upcomingDoses = [
    { id: '1', medication: 'Amoxicillin', time: '4:00 PM', taken: false },
    { id: '2', medication: 'Lisinopril', time: '9:00 AM', taken: true },
    { id: '3', medication: 'Metformin', time: '9:00 AM', taken: true },
    { id: '4', medication: 'Metformin', time: '9:00 PM', taken: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Dashboard</Text>
      
      <Text style={styles.sectionTitle}>Upcoming Doses</Text>
      <View style={styles.upcomingContainer}>
        {upcomingDoses.map(dose => (
          <View key={dose.id} style={styles.doseCard}>
            <Text style={styles.doseMedication}>{dose.medication}</Text>
            <Text style={styles.doseTime}>{dose.time}</Text>
            <Text style={styles.doseStatus}>
              {dose.taken ? 'Taken' : 'Upcoming'}
            </Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>My Medications</Text>
      <ScrollView>
        {medications.map(med => (
          <View key={med.id} style={styles.medicationCard}>
            <Text style={styles.medicationName}>{med.name}</Text>
            <Text style={styles.medicationDosage}>{med.dosage}</Text>
            <Text style={styles.medicationSchedule}>{med.schedule}</Text>
            <Text style={styles.medicationInstructions}>{med.instructions}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/**
 * App component that demonstrates the MedicationDashboard
 * @returns {React.ReactElement} App component
 */
export function App() {
  return <MedicationDashboard />;
}

// Basic styles without responsiveness
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  upcomingContainer: {
    marginBottom: 20,
  },
  doseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  doseMedication: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doseTime: {
    fontSize: 14,
    color: '#666',
  },
  doseStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  medicationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  medicationDosage: {
    fontSize: 16,
  },
  medicationSchedule: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  medicationInstructions: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
}); 