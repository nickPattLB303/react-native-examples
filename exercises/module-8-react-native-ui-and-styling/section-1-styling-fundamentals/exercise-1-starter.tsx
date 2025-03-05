/**
 * @fileoverview Exercise 1: Style Transformation Starter - Basic unstyled medication list item
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, Image } from 'react-native';

/**
 * Component that displays basic information about a medication
 * @param {object} props - Component props
 * @param {string} props.name - Name of the medication
 * @param {string} props.dosage - Dosage of the medication
 * @param {string} props.schedule - Schedule for taking the medication
 * @returns {React.ReactElement} Medication item component
 */
interface MedicationItemProps {
  name: string;
  dosage: string;
  schedule: string;
}

export default function MedicationItem({ name, dosage, schedule }: MedicationItemProps) {
  return (
    <View>
      <Image 
        source={{ 
          uri: 'https://cdn-icons-png.flaticon.com/512/822/822163.png' 
        }} 
        style={{ width: 40, height: 40 }}
      />
      <View>
        <Text>{name}</Text>
        <Text>{dosage}</Text>
        <Text>{schedule}</Text>
      </View>
    </View>
  );
}

/**
 * Main app component that demonstrates the MedicationItem
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: '3x daily' },
    { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: '1x daily' },
    { id: '3', name: 'Metformin', dosage: '1000mg', schedule: '2x daily' }
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>My Medications</Text>
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