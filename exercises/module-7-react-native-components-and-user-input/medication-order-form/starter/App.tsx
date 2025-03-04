/**
 * @fileoverview Multi-Step Medication Order Form Exercise - Starter Code
 * @author React Native Training Course
 * @created 2023-07-20
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

/**
 * Interface for the entire form data
 */
interface MedicationOrderData {
  // Step 1: Patient Information
  patientName: string;
  patientId: string;
  dateOfBirth: string;
  
  // Step 2: Medication Selection
  medicationName: string;
  medicationForm: string;
  medicationStrength: string;
  
  // Step 3: Prescription Details
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

/**
 * Multi-Step Medication Order Form Component
 * 
 * This component displays a multi-step form for ordering medication,
 * demonstrating form state management across multiple steps.
 * 
 * Exercise Requirements:
 * 1. Implement form state management for all fields
 * 2. Create navigation between steps
 * 3. Implement validation for each step
 * 4. Create a review step that displays all information
 * 5. Implement form submission with loading state
 * 6. Add error handling and user feedback
 * 
 * @returns {JSX.Element} A multi-step form for ordering medication
 */
const MedicationOrderForm: React.FC = () => {
  // TODO: Initialize the current step state
  
  // TODO: Initialize form data state using the MedicationOrderData interface
  
  // TODO: Add validation error state
  
  // TODO: Add loading state for form submission
  
  // TODO: Implement function to handle field changes
  
  // TODO: Implement function to validate each step
  
  // TODO: Implement next step function with validation
  
  // TODO: Implement previous step function
  
  // TODO: Implement form submission function
  
  /**
   * Render Patient Information Step (Step 1)
   */
  const renderPatientInfoStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Patient Information</Text>
        
        {/* TODO: Implement patient name input */}
        
        {/* TODO: Implement patient ID input */}
        
        {/* TODO: Implement date of birth input */}
        
        {/* TODO: Add Next button */}
      </View>
    );
  };
  
  /**
   * Render Medication Selection Step (Step 2)
   */
  const renderMedicationSelectionStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Medication Selection</Text>
        
        {/* TODO: Implement medication name input */}
        
        {/* TODO: Implement medication form input */}
        
        {/* TODO: Implement medication strength input */}
        
        {/* TODO: Add Previous and Next buttons */}
      </View>
    );
  };
  
  /**
   * Render Prescription Details Step (Step 3)
   */
  const renderPrescriptionDetailsStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Prescription Details</Text>
        
        {/* TODO: Implement dosage input */}
        
        {/* TODO: Implement frequency input */}
        
        {/* TODO: Implement duration input */}
        
        {/* TODO: Implement special instructions input */}
        
        {/* TODO: Add Previous and Next buttons */}
      </View>
    );
  };
  
  /**
   * Render Review and Submit Step (Step 4)
   */
  const renderReviewStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Review and Submit</Text>
        
        {/* TODO: Display all form data for review */}
        
        {/* TODO: Add Previous and Submit buttons */}
      </View>
    );
  };
  
  /**
   * Render the current step based on step state
   */
  const renderCurrentStep = () => {
    // TODO: Implement step rendering based on current step
    return renderPatientInfoStep(); // Default to first step for now
  };
  
  /**
   * Render progress indicator
   */
  const renderProgressIndicator = () => {
    // TODO: Implement progress indicator
    return null;
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Medication Order</Text>
          
          {renderProgressIndicator()}
          {renderCurrentStep()}
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

/**
 * Styles for the MedicationOrderForm component
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  stepContainer: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  // TODO: Add styles for progress indicator, review section, etc.
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <MedicationOrderForm />;
}

export default App; 