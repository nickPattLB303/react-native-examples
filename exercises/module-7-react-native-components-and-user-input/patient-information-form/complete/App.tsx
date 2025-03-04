/**
 * @fileoverview Patient Information Input Form Exercise - Complete Solution
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
  Alert,
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
 * Interface for validation errors
 */
interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  patientId?: string;
  notes?: string;
}

/**
 * Form fields configuration
 */
const formFields: FormField[] = [
  {
    id: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    autoCapitalize: 'words',
    required: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    autoCapitalize: 'words',
    required: true,
  },
  {
    id: 'dateOfBirth',
    label: 'Date of Birth',
    placeholder: 'MM/DD/YYYY',
    keyboardType: 'numbers-and-punctuation',
    required: true,
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    placeholder: '(123) 456-7890',
    keyboardType: 'phone-pad',
    required: true,
  },
  {
    id: 'email',
    label: 'Email Address',
    placeholder: 'email@example.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    required: true,
  },
  {
    id: 'patientId',
    label: 'Patient ID',
    placeholder: 'Enter patient ID',
    autoCapitalize: 'characters',
    required: true,
  },
  {
    id: 'notes',
    label: 'Notes',
    placeholder: 'Any additional information...',
    multiline: true,
    numberOfLines: 4,
    maxLength: 500,
    required: false,
  },
];

/**
 * PatientInformationForm Component
 * 
 * This component displays a form for collecting patient information,
 * demonstrating various TextInput configurations and keyboard management.
 * 
 * @returns {JSX.Element} A form component for patient information
 */
const PatientInformationForm: React.FC = () => {
  // Initialize form state with empty values
  const [formData, setFormData] = useState<PatientInfo>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    patientId: '',
    notes: '',
  });

  // State for tracking validation errors
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // State to track if form was submitted
  const [submitted, setSubmitted] = useState(false);

  // Create refs for each text input to manage focus
  const inputRefs = useRef<Record<string, TextInput | null>>({});

  /**
   * Handle changes for form fields
   * @param field - The field name
   * @param value - The field value
   */
  const handleChange = (field: keyof PatientInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for the field when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  /**
   * Focus the next input field
   * @param currentField - The current field ID
   */
  const focusNextField = (currentField: string) => {
    // Find the index of the current field
    const currentIndex = formFields.findIndex(field => field.id === currentField);
    
    // If there's a next field, focus it
    if (currentIndex < formFields.length - 1) {
      const nextField = formFields[currentIndex + 1];
      inputRefs.current[nextField.id]?.focus();
    } else {
      // If it's the last field, dismiss the keyboard
      Keyboard.dismiss();
    }
  };

  /**
   * Validate the form data
   * @returns ValidationErrors object with error messages
   */
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    // Validate required fields
    formFields.forEach(field => {
      const key = field.id as keyof PatientInfo;
      if (field.required && !formData[key]) {
        newErrors[key] = `${field.label} is required`;
      }
    });
    
    // Validate date of birth format (simple MM/DD/YYYY check)
    if (formData.dateOfBirth && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please use MM/DD/YYYY format';
    }
    
    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone number (simple US format)
    if (formData.phoneNumber && !/^(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    return newErrors;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    // Validate form
    const formErrors = validateForm();
    setErrors(formErrors);
    setSubmitted(true);
    
    // If no errors, submit the form
    if (Object.keys(formErrors).length === 0) {
      // In a real app, you would submit to a server here
      Alert.alert(
        'Form Submitted',
        'Patient information has been saved successfully!',
        [{ text: 'OK' }]
      );
      
      // Reset the form
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        patientId: '',
        notes: '',
      });
      setSubmitted(false);
    }
  };

  /**
   * Render a single input field
   * @param field - The field configuration
   */
  const renderField = (field: FormField) => {
    const fieldId = field.id as keyof PatientInfo;
    
    return (
      <View key={field.id} style={styles.fieldContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
        
        <TextInput
          ref={ref => (inputRefs.current[field.id] = ref)}
          style={[
            styles.input,
            field.multiline && styles.multilineInput,
            errors[fieldId] ? styles.inputError : null,
          ]}
          value={formData[fieldId]}
          onChangeText={(text) => handleChange(fieldId, text)}
          placeholder={field.placeholder}
          keyboardType={field.keyboardType || 'default'}
          autoCapitalize={field.autoCapitalize || 'sentences'}
          multiline={field.multiline}
          numberOfLines={field.numberOfLines}
          maxLength={field.maxLength}
          blurOnSubmit={field.multiline}
          returnKeyType={field.multiline ? 'default' : 'next'}
          onSubmitEditing={() => !field.multiline && focusNextField(field.id)}
        />
        
        {errors[fieldId] && (
          <Text style={styles.errorText}>{errors[fieldId]}</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Text style={styles.header}>Patient Information</Text>
            
            {formFields.map(renderField)}
            
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
            
            {submitted && Object.keys(errors).length > 0 && (
              <Text style={styles.formErrorText}>
                Please correct the errors above.
              </Text>
            )}
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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  formErrorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonPressed: {
    backgroundColor: '#004c99',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <PatientInformationForm />;
}

export default App;