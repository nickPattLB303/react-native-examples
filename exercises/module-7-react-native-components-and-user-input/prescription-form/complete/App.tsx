/**
 * @fileoverview Prescription Form Validation Exercise - Complete Solution
 * @author React Native Training Course
 * @created 2023-07-20
 */

import React, { useState, useRef } from 'react';
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
  Platform,
  Alert
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
 * This component creates a prescription form with validation for each field:
 * - Patient name (required)
 * - Patient ID (required, alphanumeric, minimum 6 characters)
 * - Medication (required)
 * - Dosage (required, numeric, positive value)
 * - Frequency (required)
 * - Duration (required, numeric, whole number)
 * - Special instructions (optional, maximum 200 characters)
 */
const PrescriptionForm: React.FC = () => {
  // Reference to ScrollView for scrolling to errors
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Initialize form state
  const [formData, setFormData] = useState<PrescriptionFormData>({
    patientName: '',
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    specialInstructions: '',
  });

  // Initialize errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Initialize touched fields state to track which fields have been interacted with
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
   * Handle field change
   * Update the form data and validate on change if the field has been touched
   */
  const handleChange = (field: keyof PrescriptionFormData, value: string) => {
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    // If field has been touched, validate it on change
    if (touched[field]) {
      const errorMessage = validateField(field, value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: errorMessage
      }));
    }
  };

  /**
   * Handle field blur
   * Mark a field as touched when the user leaves it and validate
   */
  const handleBlur = (field: keyof PrescriptionFormData) => {
    // Mark the field as touched
    setTouched(prevTouched => ({
      ...prevTouched,
      [field]: true
    }));
    
    // Validate the field
    const errorMessage = validateField(field, formData[field]);
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: errorMessage
    }));
  };

  /**
   * Validate all form fields
   * Return whether the form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate each field
    Object.keys(formData).forEach(key => {
      const field = key as keyof PrescriptionFormData;
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });
    
    // Update errors state
    setErrors(newErrors);
    
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    // Mark all fields as touched
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, {} as Record<keyof PrescriptionFormData, boolean>);
    
    setTouched(allTouched);
    
    // Validate all fields
    if (validateForm()) {
      // If valid, submit the form
      Alert.alert(
        'Prescription Submitted',
        'The prescription has been successfully submitted.',
        [{ text: 'OK', onPress: resetForm }]
      );
    } else {
      // Otherwise, display an error and scroll to the first error
      Alert.alert(
        'Validation Error',
        'Please correct the errors in the form before submitting.',
        [{ text: 'OK' }]
      );

      // Find the first field with an error and scroll to it
      const firstErrorField = Object.keys(errors)[0] as keyof PrescriptionFormData;
      if (firstErrorField && scrollViewRef.current) {
        // This is a simple implementation; in a real app you would use measured positions
        // or refs to each field to scroll to the exact position
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }
  };

  /**
   * Reset the form to its initial state
   */
  const resetForm = () => {
    setFormData({
      patientName: '',
      patientId: '',
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      specialInstructions: '',
    });
    setErrors({});
    setTouched({
      patientName: false,
      patientId: false,
      medication: false,
      dosage: false,
      frequency: false,
      duration: false,
      specialInstructions: false,
    });
  };

  /**
   * Validate a specific field
   * Return an error message if invalid, undefined if valid
   */
  const validateField = (field: keyof PrescriptionFormData, value: string): string | undefined => {
    switch (field) {
      case 'patientName':
        // Required validation
        if (!value || value.trim() === '') {
          return 'Patient name is required';
        }
        break;
        
      case 'patientId':
        // Required validation
        if (!value || value.trim() === '') {
          return 'Patient ID is required';
        }
        // Minimum length and alphanumeric validation
        if (value.length < 6) {
          return 'Patient ID must be at least 6 characters';
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          return 'Patient ID must contain only letters and numbers';
        }
        break;
        
      case 'medication':
        // Required validation
        if (!value || value.trim() === '') {
          return 'Medication name is required';
        }
        break;
        
      case 'dosage':
        // Required validation
        if (!value || value.trim() === '') {
          return 'Dosage is required';
        }
        // Numeric and positive value validation
        const dosageValue = parseFloat(value);
        if (isNaN(dosageValue) || dosageValue <= 0) {
          return 'Dosage must be a positive number';
        }
        break;
        
      case 'frequency':
        // Required validation
        if (!value || value.trim() === '') {
          return 'Frequency is required';
        }
        break;
        
      case 'duration':
        // Required validation
        if (!value || value.trim() === '') {
          return 'Duration is required';
        }
        // Numeric and whole number validation
        const durationValue = parseInt(value, 10);
        if (isNaN(durationValue) || durationValue <= 0) {
          return 'Duration must be a positive whole number';
        }
        if (durationValue !== parseFloat(value)) {
          return 'Duration must be a whole number';
        }
        break;
        
      case 'specialInstructions':
        // Maximum length validation (not required)
        if (value.length > 200) {
          return 'Special instructions must be less than 200 characters';
        }
        break;
    }
    
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
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
          >
            <Text style={styles.header}>Prescription Details</Text>
            
            {/* Patient Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Patient Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.patientName && errors.patientName && styles.errorInput
                ]}
                value={formData.patientName}
                onChangeText={(text) => handleChange('patientName', text)}
                onBlur={() => handleBlur('patientName')}
                placeholder="Enter patient's full name"
                accessibilityLabel="Patient Name"
                accessibilityHint="Enter the patient's full name"
              />
              {touched.patientName && errors.patientName && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.patientName}
                </Text>
              )}
            </View>
            
            {/* Patient ID Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Patient ID *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.patientId && errors.patientId && styles.errorInput
                ]}
                value={formData.patientId}
                onChangeText={(text) => handleChange('patientId', text)}
                onBlur={() => handleBlur('patientId')}
                placeholder="Enter patient ID (min 6 alphanumeric)"
                accessibilityLabel="Patient ID"
                accessibilityHint="Enter patient ID with at least 6 alphanumeric characters"
              />
              {touched.patientId && errors.patientId && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.patientId}
                </Text>
              )}
            </View>
            
            {/* Medication Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Medication *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.medication && errors.medication && styles.errorInput
                ]}
                value={formData.medication}
                onChangeText={(text) => handleChange('medication', text)}
                onBlur={() => handleBlur('medication')}
                placeholder="Enter medication name"
                accessibilityLabel="Medication"
                accessibilityHint="Enter the name of the medication"
              />
              {touched.medication && errors.medication && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.medication}
                </Text>
              )}
            </View>
            
            {/* Dosage Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Dosage *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.dosage && errors.dosage && styles.errorInput
                ]}
                value={formData.dosage}
                onChangeText={(text) => handleChange('dosage', text)}
                onBlur={() => handleBlur('dosage')}
                placeholder="Enter dosage (e.g., 500mg)"
                keyboardType="decimal-pad"
                accessibilityLabel="Dosage"
                accessibilityHint="Enter the dosage amount as a positive number"
              />
              {touched.dosage && errors.dosage && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.dosage}
                </Text>
              )}
            </View>
            
            {/* Frequency Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Frequency *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.frequency && errors.frequency && styles.errorInput
                ]}
                value={formData.frequency}
                onChangeText={(text) => handleChange('frequency', text)}
                onBlur={() => handleBlur('frequency')}
                placeholder="Enter frequency (e.g., twice daily)"
                accessibilityLabel="Frequency"
                accessibilityHint="Enter how often the medication should be taken"
              />
              {touched.frequency && errors.frequency && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.frequency}
                </Text>
              )}
            </View>
            
            {/* Duration Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Duration (days) *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.duration && errors.duration && styles.errorInput
                ]}
                value={formData.duration}
                onChangeText={(text) => handleChange('duration', text)}
                onBlur={() => handleBlur('duration')}
                placeholder="Enter duration in days"
                keyboardType="number-pad"
                accessibilityLabel="Duration"
                accessibilityHint="Enter the duration in days as a whole number"
              />
              {touched.duration && errors.duration && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.duration}
                </Text>
              )}
            </View>
            
            {/* Special Instructions Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Special Instructions</Text>
              <TextInput
                style={[
                  styles.textArea,
                  touched.specialInstructions && errors.specialInstructions && styles.errorInput,
                  formData.specialInstructions.length > 180 && formData.specialInstructions.length <= 200 && styles.warningInput,
                  formData.specialInstructions.length > 200 && styles.errorInput
                ]}
                value={formData.specialInstructions}
                onChangeText={(text) => handleChange('specialInstructions', text)}
                onBlur={() => handleBlur('specialInstructions')}
                placeholder="Enter any special instructions (optional, max 200 characters)"
                multiline
                numberOfLines={4}
                accessibilityLabel="Special Instructions"
                accessibilityHint="Enter any special instructions, maximum 200 characters"
              />
              {touched.specialInstructions && errors.specialInstructions && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                  {errors.specialInstructions}
                </Text>
              )}
              <Text 
                style={[
                  styles.characterCount,
                  formData.specialInstructions.length > 180 && formData.specialInstructions.length <= 200 && styles.warningText,
                  formData.specialInstructions.length > 200 && styles.errorText
                ]}
              >
                {formData.specialInstructions.length}/200
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button 
                title="Submit Prescription" 
                onPress={handleSubmit} 
                accessibilityLabel="Submit Prescription"
                accessibilityHint="Submit the prescription form after filling out all required fields"
              />
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
  warningInput: {
    borderColor: '#FFCC00',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  warningText: {
    color: '#CC9900',
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