/**
 * @fileoverview Exercise 3: Flexbox Layout Complete - Using StyleSheet API
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView } from 'react-native';

/**
 * Enhanced medication card component with proper Flexbox layout
 * @param {object} props - Component props
 * @param {string} props.name - Name of the medication
 * @param {string} props.dosage - Dosage information
 * @param {string} props.instructions - Usage instructions
 * @param {string} props.imageUrl - URL for the medication image
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
    <View style={styles.card}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dosage}>{dosage}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
    <View style={styles.container}>
      <Text style={styles.title}>
        My Medications
      </Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {medications.map(med => (
          <MedicationCard 
            key={med.id}
            name={med.name}
            dosage={med.dosage}
            instructions={med.instructions}
            imageUrl={med.imageUrl}
          />
        ))}
      </ScrollView>
    </View>
  );
}

/**
 * StyleSheet for all component styles
 */
const styles = StyleSheet.create({
  // App container styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    color: '#212529',
  },
  
  // Card container styles
  card: {
    flexDirection: 'row', // Arrange items horizontally
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden', // Ensures the image respects border radius
    
    // Platform-specific shadow styling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  // Image styles
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 12,
  },
  
  // Content container styles
  contentContainer: {
    flex: 1, // Take up remaining space
    paddingVertical: 12,
    paddingRight: 16,
    justifyContent: 'center', // Center content vertically
  },
  
  // Text styles with typography hierarchy
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 4,
  },
  instructions: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});