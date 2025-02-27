/**
 * @fileoverview Prescription list screen showing available medications
 * @author React Native Training Course
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  SafeAreaView,
  Platform
} from 'react-native';
import MedicationCard from '../components/MedicationCard';
import { getAllMedications, refillMedication } from '../data/MedicationData';

/**
 * PrescriptionListScreen displays a list of prescriptions and allows
 * users to view details, refill, or prescribe medications.
 * 
 * @returns {React.ReactElement} The rendered screen component
 */
const PrescriptionListScreen = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch medications on component mount
  useEffect(() => {
    // Simulate API call delay
    const fetchMedications = async () => {
      try {
        setLoading(true);
        // Artificial delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const medsData = getAllMedications();
        setMedications(medsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load medications');
        setLoading(false);
        console.error('Error fetching medications:', err);
      }
    };
    
    fetchMedications();
  }, []);
  
  /**
   * Handle the prescribe action for a medication
   * @param {Object} medication - The medication to prescribe
   */
  const handlePrescribe = (medication) => {
    // In a real app, this would call an API to process the prescription
    console.log(`Prescribing ${medication.name}`);
    // Example implementation could show a modal with prescription details
  };
  
  /**
   * Handle the refill action for a medication
   * @param {Object} medication - The medication to refill
   */
  const handleRefill = (medication) => {
    // Update the medication's refill count
    const updatedMedication = refillMedication(medication.id);
    
    if (updatedMedication) {
      // Update the state with the new medication data
      setMedications(medications.map(med => 
        med.id === medication.id ? updatedMedication : med
      ));
      
      console.log(`Refilled ${medication.name}, new refill count: ${updatedMedication.refillsRemaining}`);
    }
  };
  
  // Platform-specific header styling
  // iOS: Uses larger title and navigation bar
  // Android: Uses material design header with elevation
  const headerStyle = Platform.OS === 'ios' 
    ? styles.iosHeader 
    : styles.androidHeader;
  
  // If loading, show loading indicator
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.loadingText}>Loading Prescriptions...</Text>
      </View>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyle}>
        <Text style={styles.headerTitle}>Pharmacy Prescriptions</Text>
        <Text style={styles.headerSubtitle}>
          {medications.length} medications available
        </Text>
      </View>
      
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationCard
            medication={item}
            onPrescribe={handlePrescribe}
            onRefill={handleRefill}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No medications found</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // iOS-specific header styling
  iosHeader: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  // Android-specific header styling
  androidHeader: {
    padding: 16,
    backgroundColor: '#2e7d32', // Pharmacy green
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Platform.OS === 'android' ? '#fff' : '#2e7d32',
  },
  headerSubtitle: {
    fontSize: 14,
    color: Platform.OS === 'android' ? '#e0e0e0' : '#546e7a',
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#546e7a',
  },
  errorText: {
    fontSize: 16,
    color: '#c62828', // Error red
    textAlign: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#546e7a',
    textAlign: 'center',
    padding: 24,
  },
});

export default PrescriptionListScreen;