/**
 * @fileoverview Exercise 3: Flexbox Layout Starter
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, Image } from 'react-native';

/**
 * Basic medication card component without proper layout
 * This component needs to be enhanced with proper Flexbox layout
 * @returns {React.ReactElement} Medication card component
 */
interface MedicationCardProps {
  name: string;
  dosage: string;
  instructions: string;
  imageUrl: string;
}

export default function MedicationCard({ 
  name, 
  dosage, 
  instructions,
  imageUrl
}: MedicationCardProps) {
  return (
    <View>
      <Image 
        source={{ uri: imageUrl }} 
        style={{ width: 60, height: 60 }}
      />
      <View>
        <Text>{name}</Text>
        <Text>{dosage}</Text>
        <Text>{instructions}</Text>
      </View>
    </View>
  );
}

/**
 * Main app component that demonstrates the MedicationCard
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    { 
      id: '1', 
      name: 'Amoxicillin', 
      dosage: '500mg - Every 8 hours', 
      instructions: 'Take with food. Complete full course.',
      imageUrl: 'https://www.drugs.com/images/pills/fio/ABM21510.JPG'
    },
    { 
      id: '2', 
      name: 'Lisinopril', 
      dosage: '10mg - Once daily', 
      instructions: 'Take in the morning. Avoid potassium supplements.',
      imageUrl: 'https://www.drugs.com/images/pills/fio/RDY12350.JPG'
    },
    { 
      id: '3', 
      name: 'Metformin', 
      dosage: '1000mg - Twice daily', 
      instructions: 'Take with meals to reduce stomach upset.',
      imageUrl: 'https://www.drugs.com/images/pills/fio/CIP00360.JPG'
    }
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        My Medications
      </Text>
      
      {medications.map(med => (
        <MedicationCard 
          key={med.id}
          name={med.name}
          dosage={med.dosage}
          instructions={med.instructions}
          imageUrl={med.imageUrl}
        />
      ))}
    </View>
  );
}