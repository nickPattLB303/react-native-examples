/**
 * @fileoverview Prescription Form Validation Exercise - Starter
 * @author React Native Training Course
 * @created 2023-07-20
 */

import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

/**
 * Interface for the prescription form data
 */
interface PrescriptionFormData {
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  specialInstructions: string;
}

/**
 * Interface for form validation errors
 */
interface FormErrors {
  patientName?: string;
  patientId?: string;
  medication?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  specialInstructions?: string;
}

/**
 * Prescription Form Component
 *
 * Implement a prescription form with validation for each field:
 * - Patient name (required)
 * - Patient ID (required, alphanumeric, minimum 6 characters)
 * - Medication (required)
 * - Dosage (required, numeric, positive value)
 * - Frequency (required)
 * - Duration (required, numeric, whole number)
 * - Special instructions (optional, maximum 200 characters)
 */
const PrescriptionForm: React.FC = () => {
  // TODO: Initialize form state
  const [formData, setFormData] = useState<PrescriptionFormData>({
    patientName: '',
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    specialInstructions: '',
  });

  // TODO: Initialize errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // TODO: Initialize touched fields state to track which fields have been interacted with
  const [touched, setTouched] = useState<Record<keyof PrescriptionFormData, boolean>>({
    patientName: false,
    patientId: false,
    medication: false,
    dosage: false,
    frequency: false,
    duration: false,
    specialInstructions: false,
  });

  /**
   * TODO: Implement field change handler
   * Update the form data when a field changes
   */
  const handleChange = (field: keyof PrescriptionFormData, value: string) => {
    // Update form data
    
    // If field has been touched, validate it on change
  };

  /**
   * TODO: Implement field blur handler
   * Mark a field as touched when the user leaves it
   */
  const handleBlur = (field: keyof PrescriptionFormData) => {
    // Mark the field as touched
    
    // Validate the field
  };

  /**
   * TODO: Implement form validation
   * Validate all fields and return whether the form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // TODO: Validate patient name (required)

    // TODO: Validate patient ID (required, alphanumeric, minimum 6 characters)

    // TODO: Validate medication (required)

    // TODO: Validate dosage (required, numeric, positive value)

    // TODO: Validate frequency (required)

    // TODO: Validate duration (required, numeric, whole number)

    // TODO: Validate special instructions (optional, maximum 200 characters)

    // Update errors state
    setErrors(newErrors);
    
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  /**
   * TODO: Implement form submission
   * Submit the form if all fields are valid
   */
  const handleSubmit = () => {
    // Mark all fields as touched
    
    // Validate all fields
    
    // If valid, submit the form
    
    // Otherwise, scroll to the first error
  };

  /**
   * TODO: Implement field-level validation
   * Validate a specific field and update errors state
   */
  const validateField = (field: keyof PrescriptionFormData, value: string): string | undefined => {
    // Implement field-specific validation logic based on the field
    return undefined;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>Prescription Details</Text>
            
            {/* Patient Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Patient Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.patientName}
                onChangeText={(text) => handleChange('patientName', text)}
                onBlur={() => handleBlur('patientName')}
                placeholder="Enter patient's full name"
              />
              {/* TODO: Display error message when there is an error */}
            </View>
            
            {/* Patient ID Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Patient ID *</Text>
              <TextInput
                style={[
                  styles.input,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.patientId}
                onChangeText={(text) => handleChange('patientId', text)}
                onBlur={() => handleBlur('patientId')}
                placeholder="Enter patient ID (min 6 alphanumeric)"
              />
              {/* TODO: Display error message when there is an error */}
            </View>
            
            {/* Medication Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Medication *</Text>
              <TextInput
                style={[
                  styles.input,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.medication}
                onChangeText={(text) => handleChange('medication', text)}
                onBlur={() => handleBlur('medication')}
                placeholder="Enter medication name"
              />
              {/* TODO: Display error message when there is an error */}
            </View>
            
            {/* Dosage Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Dosage *</Text>
              <TextInput
                style={[
                  styles.input,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.dosage}
                onChangeText={(text) => handleChange('dosage', text)}
                onBlur={() => handleBlur('dosage')}
                placeholder="Enter dosage (e.g., 500mg)"
                keyboardType="decimal-pad"
              />
              {/* TODO: Display error message when there is an error */}
            </View>
            
            {/* Frequency Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Frequency *</Text>
              <TextInput
                style={[
                  styles.input,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.frequency}
                onChangeText={(text) => handleChange('frequency', text)}
                onBlur={() => handleBlur('frequency')}
                placeholder="Enter frequency (e.g., twice daily)"
              />
              {/* TODO: Display error message when there is an error */}
            </View>
            
            {/* Duration Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Duration (days) *</Text>
              <TextInput
                style={[
                  styles.input,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.duration}
                onChangeText={(text) => handleChange('duration', text)}
                onBlur={() => handleBlur('duration')}
                placeholder="Enter duration in days"
                keyboardType="number-pad"
              />
              {/* TODO: Display error message when there is an error */}
            </View>
            
            {/* Special Instructions Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Special Instructions</Text>
              <TextInput
                style={[
                  styles.textArea,
                  // TODO: Add error styling when there are errors
                ]}
                value={formData.specialInstructions}
                onChangeText={(text) => handleChange('specialInstructions', text)}
                onBlur={() => handleBlur('specialInstructions')}
                placeholder="Enter any special instructions (optional, max 200 characters)"
                multiline
                numberOfLines={4}
              />
              {/* TODO: Display error message when there is an error */}
              <Text style={styles.characterCount}>
                {formData.specialInstructions.length}/200
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button title="Submit Prescription" onPress={handleSubmit} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/**
 * Styles for the Prescription Form component
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  characterCount: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
});

/**
 * Main App Component
 */
const App: React.FC = () => {
  return <PrescriptionForm />;
}

export default App; 