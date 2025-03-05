/**
 * @fileoverview Exercise 2: StyleSheet API Refactoring Complete
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Component displaying a medication reminder with status
 * @param {object} props - Component props
 * @param {string} props.medication - Name of the medication
 * @param {string} props.time - Time the medication should be taken
 * @param {boolean} props.isOverdue - Whether the medication is overdue
 * @returns {React.ReactElement} Medication reminder component
 */
interface MedicationReminderProps {
  medication: string;
  time: string;
  isOverdue: boolean;
}

export default function MedicationReminder({ 
  medication, 
  time, 
  isOverdue 
}: MedicationReminderProps) {
  return (
    <View style={[
      styles.container,
      { borderLeftColor: isOverdue ? styles.colors.error : styles.colors.primary }
    ]}>
      <Text style={[
        styles.medicationName,
        isOverdue && styles.overdueText
      ]}>
        {medication}
      </Text>
      <Text style={[
        styles.medicationTime,
        isOverdue && styles.overdueText
      ]}>
        {time}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isOverdue ? styles.colors.error : styles.colors.primary }
        ]}
      >
        <Text style={styles.buttonText}>
          {isOverdue ? 'Take Now' : 'Mark as Taken'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Main app component that demonstrates the MedicationReminder component
 * @returns {React.ReactElement} App component
 */
export function App() {
  const reminders = [
    { id: '1', medication: 'Amoxicillin', time: '8:00 AM', isOverdue: false },
    { id: '2', medication: 'Lisinopril', time: '12:00 PM', isOverdue: true },
    { id: '3', medication: 'Metformin', time: '6:00 PM', isOverdue: false }
  ];

  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitle}>
        Medication Reminders
      </Text>
      {reminders.map(reminder => (
        <MedicationReminder
          key={reminder.id}
          medication={reminder.medication}
          time={reminder.time}
          isOverdue={reminder.isOverdue}
        />
      ))}
    </View>
  );
}

/**
 * StyleSheet for all component styles with proper naming conventions
 * and optimized for performance
 */
const styles = StyleSheet.create({
  // Design system color palette
  colors: {
    primary: '#1890ff',
    error: '#ff4d4f',
    text: {
      primary: '#333',
      secondary: '#666',
    },
    background: {
      main: '#f5f5f5',
      card: 'white',
    },
  },
  
  // App container and title
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    color: '#333',
  },
  
  // Medication reminder card
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  
  // Text styles
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  medicationTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  overdueText: {
    color: '#ff4d4f',
  },
  
  // Button styles
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});