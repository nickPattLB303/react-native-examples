/**
 * @fileoverview Medication Form Challenge - Complete Solution
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Interface for medication form data
 */
interface MedicationFormData {
  name: string;
  strength: string;
  form: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

/**
 * Interface for form validation errors
 */
interface FormErrors {
  name: string;
  strength: string;
}

/**
 * Type for medication form options
 */
type MedicationFormOption = {
  label: string;
  value: string;
}

/**
 * Main component for the Medication Form challenge
 * @returns {JSX.Element} The MedicationForm component
 */
export default function App(): JSX.Element {
  // Form state
  const [formData, setFormData] = useState<MedicationFormData>({
    name: '',
    strength: '',
    form: 'tablet',
    dosage: '',
    frequency: 'once_daily',
    instructions: ''
  });

  // Validation state
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    strength: ''
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  /**
   * Update form data when inputs change
   * @param {keyof MedicationFormData} field - The field to update
   * @param {string} value - The new value
   */
  const handleInputChange = (field: keyof MedicationFormData, value: string): void => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  /**
   * Validate form fields
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = (): boolean => {
    let newErrors: FormErrors = {
      name: '',
      strength: ''
    };
    let isValid = true;

    // Validate medication name
    if (!formData.name.trim()) {
      newErrors.name = 'Medication name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    // Validate medication strength
    if (!formData.strength.trim()) {
      newErrors.strength = 'Medication strength is required';
      isValid = false;
    } else if (isNaN(Number(formData.strength))) {
      newErrors.strength = 'Strength must be a number';
      isValid = false;
    } else {
      newErrors.strength = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  // Check form validity whenever form data changes
  useEffect(() => {
    const formIsValid = formData.name.trim() !== '' && 
                       formData.strength.trim() !== '' && 
                       !isNaN(Number(formData.strength));
    setIsFormValid(formIsValid);
  }, [formData]);

  /**
   * Form submission handler
   */
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show submission results
    Alert.alert(
      'Form Submitted',
      JSON.stringify(formData, null, 2),
      [{ text: 'OK' }]
    );

    setIsSubmitting(false);
  };

  // Medication form options
  const medicationForms: MedicationFormOption[] = [
    { label: 'Tablet', value: 'tablet' },
    { label: 'Capsule', value: 'capsule' },
    { label: 'Liquid', value: 'liquid' },
    { label: 'Injection', value: 'injection' },
    { label: 'Topical', value: 'topical' }
  ];

  // Frequency options
  const frequencyOptions: MedicationFormOption[] = [
    { label: 'Once daily', value: 'once_daily' },
    { label: 'Twice daily', value: 'twice_daily' },
    { label: 'Three times daily', value: 'three_times_daily' },
    { label: 'Four times daily', value: 'four_times_daily' },
    { label: 'As needed', value: 'as_needed' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Medication Input Form</Text>
          
          {/* Medication Information Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Medication Information</Text>
            
            {/* Medication Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Medication Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.name ? styles.inputError : null
                ]}
                placeholder="Enter medication name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                accessibilityLabel="Medication name input"
                accessibilityHint="Enter the name of the medication"
              />
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>
            
            {/* Medication Strength Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Strength (mg) *</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.strength ? styles.inputError : null
                ]}
                placeholder="Enter strength in mg"
                value={formData.strength}
                onChangeText={(text) => handleInputChange('strength', text)}
                keyboardType="numeric"
                accessibilityLabel="Medication strength input"
                accessibilityHint="Enter the strength of the medication in milligrams"
              />
              {errors.strength ? (
                <Text style={styles.errorText}>{errors.strength}</Text>
              ) : null}
            </View>
            
            {/* Medication Form Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Medication Form</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.form}
                  onValueChange={(value) => handleInputChange('form', value)}
                  style={styles.picker}
                  accessibilityLabel="Medication form selector"
                >
                  {medicationForms.map((form) => (
                    <Picker.Item 
                      key={form.value} 
                      label={form.label} 
                      value={form.value} 
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {/* Dosage Instructions Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Dosage Instructions</Text>
            
            {/* Dosage Amount Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Dosage Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter dosage amount"
                value={formData.dosage}
                onChangeText={(text) => handleInputChange('dosage', text)}
                accessibilityLabel="Dosage amount input"
                accessibilityHint="Enter the amount of medication to be taken"
              />
            </View>
            
            {/* Frequency Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Frequency</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.frequency}
                  onValueChange={(value) => handleInputChange('frequency', value)}
                  style={styles.picker}
                  accessibilityLabel="Medication frequency selector"
                >
                  {frequencyOptions.map((option) => (
                    <Picker.Item 
                      key={option.value} 
                      label={option.label} 
                      value={option.value} 
                    />
                  ))}
                </Picker>
              </View>
            </View>
            
            {/* Additional Instructions Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Additional Instructions</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter additional instructions"
                value={formData.instructions}
                onChangeText={(text) => handleInputChange('instructions', text)}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                accessibilityLabel="Additional instructions input"
                accessibilityHint="Enter any additional instructions for taking the medication"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton,
              isFormValid ? styles.submitButtonActive : styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            accessibilityLabel="Submit form button"
            accessibilityHint="Submits the medication form"
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonActive: {
    backgroundColor: '#3498db',
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 