/**
 * @fileoverview Medication Form Challenge - Starter Code
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';

/**
 * Medication form data interface
 */
interface MedicationFormData {
  name: string;
  strength: string;
  form?: string;
  dosage?: string;
  frequency?: string;
  instructions?: string;
}

/**
 * Main component for the Medication Form challenge
 * @returns {JSX.Element} The MedicationForm component
 */
export default function App(): JSX.Element {
  /**
   * Form submission handler
   * @param {MedicationFormData} formData - The validated form data
   */
  const handleSubmit = (formData: MedicationFormData): void => {
    // For the challenge, we'll just show the form data in an alert
    Alert.alert(
      'Form Submitted',
      JSON.stringify(formData, null, 2),
      [{ text: 'OK' }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Medication Input Form</Text>
        
        {/* 
          TODO: Implement the medication form here
          
          Requirements:
          1. Medication Information Section
             - Text input for medication name (required)
             - Numeric input for medication strength (required)
             - Selection component for medication form (tablet, liquid, etc.)

          2. Dosage Instructions Section
             - Input for dosage amount
             - Dropdown or segmented control for frequency (once daily, twice daily, etc.)
             - Basic text area for additional instructions

          3. Form Validation
             - Validate required fields
             - Show error messages for invalid inputs
             - Disable submission until form is valid

          4. Form Submission
             - Add a submit button
             - Call handleSubmit function with form data when valid
        */}
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Medication Information</Text>
          {/* Implement medication information inputs here */}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Dosage Instructions</Text>
          {/* Implement dosage instruction inputs here */}
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {
            // TODO: Replace with your form data and validation
            const formData: MedicationFormData = { 
              name: '',
              strength: '',
              message: 'Form not yet implemented' as any
            };
            handleSubmit(formData);
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#34495e',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 