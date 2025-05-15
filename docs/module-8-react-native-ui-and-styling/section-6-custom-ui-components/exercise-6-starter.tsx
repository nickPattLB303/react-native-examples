/**
 * @fileoverview Exercise 6: Custom UI Components Starter
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

/**
 * Basic medication card component without proper composition
 * @returns {React.ReactElement} Medication card component
 */
export default function MedicationCard({ medication }) {
  // This component needs to be refactored into a reusable, composable component
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{medication.name}</Text>
        <Text style={styles.subtitle}>{medication.dosage}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: medication.imageUrl }} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.details}>
          <Text style={styles.label}>Next Dose:</Text>
          <Text style={styles.value}>{medication.nextDose}</Text>
          
          <Text style={styles.label}>Remaining:</Text>
          <Text style={styles.value}>{medication.remaining} tablets</Text>
          
          <Text style={styles.label}>Refills:</Text>
          <Text style={styles.value}>{medication.refills} remaining</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={() => console.log('Take medication')}
        >
          <Text style={styles.buttonText}>Take Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => console.log('View details')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * App component that demonstrates the MedicationCard
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    {
      id: '1',
      name: 'Amoxicillin',
      dosage: '500mg',
      nextDose: '4:00 PM',
      remaining: 12,
      refills: 2,
      imageUrl: 'https://www.drugs.com/images/pills/nlm/006035601.jpg',
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      nextDose: '9:00 AM Tomorrow',
      remaining: 45,
      refills: 5,
      imageUrl: 'https://www.drugs.com/images/pills/nlm/167140101.jpg',
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '1000mg',
      nextDose: '9:00 PM',
      remaining: 28,
      refills: 3,
      imageUrl: 'https://www.drugs.com/images/pills/nlm/007815101.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>My Medications</Text>
      <ScrollView>
        {medications.map(medication => (
          <MedicationCard key={medication.id} medication={medication} />
        ))}
      </ScrollView>
    </View>
  );
}

// Basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4A90E2',
  },
}); 