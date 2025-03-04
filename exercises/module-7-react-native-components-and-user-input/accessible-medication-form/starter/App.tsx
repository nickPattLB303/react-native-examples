/**
 * @fileoverview Accessible Medication Form Exercise - Starter
 * @author React Native Training Course
 * @created 2023-07-20
 */

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';

/**
 * Define the interface for form data
 */
interface MedicationFormData {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  instructions: string;
  refillReminders: boolean;
}

/**
 * Define the interface for form errors
 */
interface FormErrors {
  name?: string;
  dosage?: string;
  frequency?: string;
  startDate?: string;
  instructions?: string;
}

/**
 * Accessible Medication Form Component
 *
 * This form should be made fully accessible with:
 * - Proper accessibility labels, roles, and hints
 * - Accessible form validation
 * - Clear focus management
 * - Screen reader announcements
 */
const AccessibleMedicationForm: React.FC = () => {
  // Reference to inputs for focus management
  const dosageInputRef = useRef<TextInput>(null);
  const frequencyInputRef = useRef<TextInput>(null);
  const startDateInputRef = useRef<TextInput>(null);
  const instructionsInputRef = useRef<TextInput>(null);
  
  // Reference to ScrollView for error scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Initialize form state
  const [formData, setFormData] = useState<MedicationFormData>({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    instructions: '',
    refillReminders: false
  });

  // Initialize errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Initialize touched fields state
  const [touched, setTouched] = useState<Record<keyof MedicationFormData, boolean>>({
    name: false,
    dosage: false,
    frequency: false,
    startDate: false,
    instructions: false,
    refillReminders: false
  });

  /**
   * TODO: Implement field change handler
   */
  const handleChange = (field: keyof MedicationFormData, value: string | boolean) => {
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    // TODO: Validate the field if it has been touched
  };

  /**
   * TODO: Implement field blur handler for accessibility
   */
  const handleBlur = (field: keyof MedicationFormData) => {
    // TODO: Mark the field as touched
    
    // TODO: Validate the field
  };

  /**
   * TODO: Implement form validation with accessibility in mind
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // TODO: Validate medication name (required)

    // TODO: Validate dosage (required, numeric, positive value)

    // TODO: Validate frequency (required)

    // TODO: Validate start date (required, proper format)

    // TODO: Validate instructions (optional, maximum 200 characters)

    // Update errors state
    setErrors(newErrors);
    
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  /**
   * TODO: Implement accessibly form submission
   */
  const handleSubmit = () => {
    // TODO: Mark all fields as touched
    
    // TODO: Validate all fields
    
    // TODO: If valid, show success message and reset form
    
    // TODO: If invalid, show error message and focus on first error field
    
    // TODO: Make sure error messages are announced to screen readers
  };

  /**
   * TODO: Implement toggle for refill reminders with proper accessibility
   */
  const toggleRefillReminders = () => {
    handleChange('refillReminders', !formData.refillReminders);
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
            <Text style={styles.header}>Add Medication</Text>
            
            {/* Medication Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Medication Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                onBlur={() => handleBlur('name')}
                placeholder="Enter medication name"
                returnKeyType="next"
                onSubmitEditing={() => dosageInputRef.current?.focus()}
                // TODO: Add accessibility properties
              />
              {/* TODO: Make error message accessible */}
              {touched.name && errors.name && (
                <Text style={styles.errorText}>
                  {errors.name}
                </Text>
              )}
            </View>
            
            {/* Dosage Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Dosage *</Text>
              <TextInput
                ref={dosageInputRef}
                style={styles.input}
                value={formData.dosage}
                onChangeText={(text) => handleChange('dosage', text)}
                onBlur={() => handleBlur('dosage')}
                placeholder="Enter dosage (e.g., 500mg)"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onSubmitEditing={() => frequencyInputRef.current?.focus()}
                // TODO: Add accessibility properties
              />
              {/* TODO: Make error message accessible */}
              {touched.dosage && errors.dosage && (
                <Text style={styles.errorText}>
                  {errors.dosage}
                </Text>
              )}
            </View>
            
            {/* Frequency Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Frequency *</Text>
              <TextInput
                ref={frequencyInputRef}
                style={styles.input}
                value={formData.frequency}
                onChangeText={(text) => handleChange('frequency', text)}
                onBlur={() => handleBlur('frequency')}
                placeholder="Enter frequency (e.g., twice daily)"
                returnKeyType="next"
                onSubmitEditing={() => startDateInputRef.current?.focus()}
                // TODO: Add accessibility properties
              />
              {/* TODO: Make error message accessible */}
              {touched.frequency && errors.frequency && (
                <Text style={styles.errorText}>
                  {errors.frequency}
                </Text>
              )}
            </View>
            
            {/* Start Date Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Start Date *</Text>
              <TextInput
                ref={startDateInputRef}
                style={styles.input}
                value={formData.startDate}
                onChangeText={(text) => handleChange('startDate', text)}
                onBlur={() => handleBlur('startDate')}
                placeholder="MM/DD/YYYY"
                keyboardType="numbers-and-punctuation"
                returnKeyType="next"
                onSubmitEditing={() => instructionsInputRef.current?.focus()}
                // TODO: Add accessibility properties
              />
              {/* TODO: Make error message accessible */}
              {touched.startDate && errors.startDate && (
                <Text style={styles.errorText}>
                  {errors.startDate}
                </Text>
              )}
            </View>
            
            {/* Instructions Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Special Instructions</Text>
              <TextInput
                ref={instructionsInputRef}
                style={styles.textArea}
                value={formData.instructions}
                onChangeText={(text) => handleChange('instructions', text)}
                onBlur={() => handleBlur('instructions')}
                placeholder="Enter any special instructions (optional, max 200 characters)"
                multiline
                numberOfLines={4}
                // TODO: Add accessibility properties
              />
              {/* TODO: Make error message accessible */}
              {touched.instructions && errors.instructions && (
                <Text style={styles.errorText}>
                  {errors.instructions}
                </Text>
              )}
              <Text style={styles.characterCount}>
                {formData.instructions.length}/200
              </Text>
            </View>
            
            {/* Refill Reminders Toggle - Make this accessible */}
            <View style={styles.checkboxContainer}>
              <Pressable 
                style={styles.checkbox}
                onPress={toggleRefillReminders}
                // TODO: Add accessibility properties
              >
                {formData.refillReminders && <View style={styles.checkboxInner} />}
              </Pressable>
              <Text style={styles.checkboxLabel}>Enable Refill Reminders</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button 
                title="Add Medication" 
                onPress={handleSubmit} 
                // TODO: Add accessibility properties
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/**
 * Styles for the AccessibleMedicationForm component
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
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
  return <AccessibleMedicationForm />;
}

export default App; 