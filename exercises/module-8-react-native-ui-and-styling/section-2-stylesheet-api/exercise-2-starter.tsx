/**
 * @fileoverview Exercise 2: StyleSheet API Refactoring Starter
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    <View style={{
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: isOverdue ? '#ff4d4f' : '#1890ff',
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: isOverdue ? '#ff4d4f' : '#333',
      }}>
        {medication}
      </Text>
      <Text style={{
        fontSize: 16,
        color: isOverdue ? '#ff4d4f' : '#666',
        marginBottom: 10,
      }}>
        {time}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: isOverdue ? '#ff4d4f' : '#1890ff',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 4,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
        }}>
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
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 40 }}>
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
