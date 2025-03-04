/**
 * @fileoverview Patient Information Input Form Exercise - Starter Code
 * @author React Native Training Course
 * @created 2023-07-10
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  SafeAreaView,
  Pressable,
} from 'react-native';

/**
 * Interface for form field configuration
 */
interface FormField {
  id: string;
  label: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  required?: boolean;
}

/**
 * Interface for patient information
 */
interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  patientId: string;
  notes: string;
}

/**
 * PatientInformationForm Component
 * 
 * This component displays a form for collecting patient information,
 * demonstrating various TextInput configurations and keyboard management.
 * 
 * Exercise Requirements:
 * 1. Implement state management for all form fields
 * 2. Create form fields with appropriate keyboard types
 * 3. Implement focus management between fields
 * 4. Add basic validation for required fields
 * 5. Implement a submit function that validates all fields
 * 6. Provide feedback for validation errors
 * 7. Implement keyboard avoiding behavior
 * 
 * @returns {JSX.Element} A form component for patient information
 */
const PatientInformationForm: React.FC = () => {
  // TODO: Define state variables for form fields using the PatientInfo interface
  
  // TODO: Create refs for each text input to manage focus
  
  // TODO: Implement a function to handle changes for each field
  
  // TODO: Implement a validation function for required fields
  
  // TODO: Implement a submit function that validates all fields
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Text style={styles.header}>Patient Information</Text>
            
            {/* TODO: Implement the First Name text input field */}
            
            {/* TODO: Implement the Last Name text input field */}
            
            {/* TODO: Implement the Date of Birth text input field */}
            
            {/* TODO: Implement the Phone Number text input field */}
            
            {/* TODO: Implement the Email Address text input field */}
            
            {/* TODO: Implement the Patient ID text input field */}
            
            {/* TODO: Implement the Notes multiline text input field */}
            
            {/* TODO: Implement the Submit button */}
            
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/**
 * Styles for the PatientInformationForm component
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  // TODO: Add styles for form fields, labels, errors, and submit button
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <PatientInformationForm />;
}

export default App;