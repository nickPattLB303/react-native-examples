/**
 * @fileoverview Exercise 5: Theming and Design Systems Starter
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

/**
 * Simple medication detail screen without theming
 * @returns {React.ReactElement} Medication detail component
 */
export default function MedicationDetail() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medication Details</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Amoxicillin</Text>
          <Text style={styles.cardSubtitle}>500mg tablet</Text>
          <Text style={styles.cardLabel}>Description:</Text>
          <Text style={styles.cardText}>
            Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection.
          </Text>
          
          <Text style={styles.cardLabel}>Dosage:</Text>
          <Text style={styles.cardText}>Take 1 tablet (500mg) 3 times a day for 10 days.</Text>
          
          <Text style={styles.cardLabel}>Side Effects:</Text>
          <Text style={styles.cardText}>
            - Diarrhea
            - Rash
            - Nausea
            - Vomiting
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule</Text>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>8:00 AM</Text>
            <Text style={styles.scheduleText}>Take 1 tablet with breakfast</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>4:00 PM</Text>
            <Text style={styles.scheduleText}>Take 1 tablet in the afternoon</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>12:00 AM</Text>
            <Text style={styles.scheduleText}>Take 1 tablet before bed</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Refill Information</Text>
          <Text style={styles.cardText}>Prescription #: RX7281904</Text>
          <Text style={styles.cardText}>Refills Remaining: 2</Text>
          <Text style={styles.cardText}>Pharmacy: MedPlus Pharmacy</Text>
          <Text style={styles.cardText}>Phone: (555) 123-4567</Text>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Request Refill</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Warnings</Text>
          <Text style={styles.warningText}>
            Do not use this medication if you are allergic to penicillin antibiotics.
          </Text>
          <Text style={styles.warningText}>
            Tell your doctor if you have kidney disease or a history of diarrhea.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * App component that demonstrates the MedicationDetail
 * @returns {React.ReactElement} App component
 */
export function App() {
  return <MedicationDetail />;
}

// Basic styles without theming
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#444',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 5,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 80,
    color: '#4A90E2',
  },
  scheduleText: {
    fontSize: 14,
    flex: 1,
    color: '#666',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#E53935',
    marginBottom: 8,
    lineHeight: 20,
  },
}); 