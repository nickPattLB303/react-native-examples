/**
 * @fileoverview Accessible Medication Form Exercise - Complete Solution
 * @author React Native Training Course
 * @created 2023-07-20
 */

import React, { useState, useRef, useEffect } from 'react';
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
  Pressable,
  Alert,
  AccessibilityInfo
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
 * This form demonstrates best practices for accessibility in React Native forms:
 * - Proper accessibility labels, roles, and hints
 * - Accessible form validation with screen reader announcements
 * - Focus management for keyboard navigation
 * - Accessible custom components (checkbox)
 */
const AccessibleMedicationForm: React.FC = () => {
  // Reference to inputs for focus management
  const nameInputRef = useRef<TextInput>(null);
  const dosageInputRef = useRef<TextInput>(null);
  const frequencyInputRef = useRef<TextInput>(null);
  const startDateInputRef = useRef<TextInput>(null);
  const instructionsInputRef = useRef<TextInput>(null);
  
  // Reference to ScrollView for error scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Track whether a screen reader is enabled
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  
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
  
  // Initialize submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // Check if screen reader is enabled
  useEffect(() => {
    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setScreenReaderEnabled(isEnabled);
    };
    
    // Check on mount
    checkScreenReader();
    
    // Subscribe to changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setScreenReaderEnabled
    );
    
    return () => {
      // Clean up subscription
      // For React Native 0.65+, use subscription.remove()
      // For older versions, use AccessibilityInfo.removeEventListener
      if (typeof subscription.remove === 'function') {
        subscription.remove();
      } else {
        // @ts-ignore - For older RN versions
        AccessibilityInfo.removeEventListener('screenReaderChanged', setScreenReaderEnabled);
      }
    };
  }, []);
  
  /**
   * Announce a message to screen readers
   */
  const announceToScreenReader = (message: string) => {
    if (screenReaderEnabled) {
      AccessibilityInfo.announceForAccessibility(message);
    }
  };

  /**
   * Handle field change with validation
   */
  const handleChange = (field: keyof MedicationFormData, value: string | boolean) => {
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    // Reset submission feedback when user starts editing again
    if (submissionFeedback) {
      setSubmissionFeedback(null);
    }
    
    // Validate the field if it has been touched
    if (touched[field]) {
      // For boolean fields, we don't need validation errors
      if (typeof value !== 'boolean') {
        validateField(field, value);
      }
    }
  };

  /**
   * Handle field blur with accessibility
   */
  const handleBlur = (field: keyof MedicationFormData) => {
    // Mark the field as touched
    setTouched(prevTouched => ({
      ...prevTouched,
      [field]: true
    }));
    
    // Don't validate boolean fields
    if (field !== 'refillReminders') {
      // Validate the field
      const errorMessage = validateField(field, formData[field] as string);
      
      // Announce error to screen reader if present
      if (errorMessage && screenReaderEnabled) {
        announceToScreenReader(`${field} field error: ${errorMessage}`);
      }
    }
  };

  /**
   * Validate a single field
   */
  const validateField = (field: keyof MedicationFormData, value: string): string | undefined => {
    let errorMessage: string | undefined;
    
    switch (field) {
      case 'name':
        // Required validation
        if (!value || value.trim() === '') {
          errorMessage = 'Medication name is required';
        }
        break;
        
      case 'dosage':
        // Required validation
        if (!value || value.trim() === '') {
          errorMessage = 'Dosage is required';
        } else {
          // Numeric and positive value validation
          const dosageValue = parseFloat(value);
          if (isNaN(dosageValue) || dosageValue <= 0) {
            errorMessage = 'Dosage must be a positive number';
          }
        }
        break;
        
      case 'frequency':
        // Required validation
        if (!value || value.trim() === '') {
          errorMessage = 'Frequency is required';
        }
        break;
        
      case 'startDate':
        // Required validation
        if (!value || value.trim() === '') {
          errorMessage = 'Start date is required';
        } else {
          // Date format validation (MM/DD/YYYY)
          const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
          if (!dateRegex.test(value)) {
            errorMessage = 'Date must be in MM/DD/YYYY format';
          } else {
            // Check if the date is valid
            const [month, day, year] = value.split('/').map(Number);
            const date = new Date(year, month - 1, day);
            
            if (
              date.getFullYear() !== year ||
              date.getMonth() !== month - 1 ||
              date.getDate() !== day
            ) {
              errorMessage = 'Please enter a valid date';
            }
          }
        }
        break;
        
      case 'instructions':
        // Maximum length validation (not required)
        if (value.length > 200) {
          errorMessage = 'Instructions must be less than 200 characters';
        }
        break;
    }
    
    // Update errors state
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: errorMessage
    }));
    
    return errorMessage;
  };
  
  /**
   * Validate the entire form
   */
  const validateForm = (): boolean => {
    const fieldsToValidate: Array<keyof MedicationFormData> = [
      'name', 'dosage', 'frequency', 'startDate', 'instructions'
    ];
    
    const newErrors: FormErrors = {};
    
    // Validate each field
    for (const field of fieldsToValidate) {
      const errorMessage = validateField(field, formData[field] as string);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    }
    
    // Update errors state
    setErrors(newErrors);
    
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Reset the form to its initial state
   */
  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      startDate: '',
      instructions: '',
      refillReminders: false
    });
    setErrors({});
    setTouched({
      name: false,
      dosage: false,
      frequency: false,
      startDate: false,
      instructions: false,
      refillReminders: false
    });
    setSubmissionFeedback(null);
    
    // Focus back to first field
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  /**
   * Handle form submission with accessibility announcements
   */
  const handleSubmit = () => {
    // Mark all fields as touched
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, {} as Record<keyof MedicationFormData, boolean>);
    
    setTouched(allTouched);
    
    // Validate all fields
    setIsSubmitting(true);
    const isValid = validateForm();
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (isValid) {
        // If valid, show success message and reset form
        const successMessage = `Medication ${formData.name} has been added successfully.`;
        setSubmissionFeedback(successMessage);
        
        // Announce success to screen reader
        announceToScreenReader(successMessage);
        
        // Show alert
        Alert.alert(
          'Success',
          successMessage,
          [{ text: 'OK', onPress: resetForm }]
        );
      } else {
        // If invalid, show error message
        const errorMessage = 'Please correct the errors in the form before submitting.';
        setSubmissionFeedback(errorMessage);
        
        // Announce error to screen reader
        announceToScreenReader(errorMessage);
        
        // Find the first field with an error
        const errorFields = Object.keys(errors) as Array<keyof FormErrors>;
        if (errorFields.length > 0) {
          // Announce the first error
          announceToScreenReader(`First error: ${errors[errorFields[0]]}`);
          
          // Show alert
          Alert.alert(
            'Validation Error',
            errorMessage,
            [{ text: 'OK' }]
          );
          
          // Focus on the first error field
          switch (errorFields[0]) {
            case 'name':
              nameInputRef.current?.focus();
              break;
            case 'dosage':
              dosageInputRef.current?.focus();
              break;
            case 'frequency':
              frequencyInputRef.current?.focus();
              break;
            case 'startDate':
              startDateInputRef.current?.focus();
              break;
            case 'instructions':
              instructionsInputRef.current?.focus();
              break;
          }
          
          // Scroll to the top of the form
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
      }
    }, 500); // Simulate a short server call
  };

  /**
   * Toggle refill reminders with screen reader announcement
   */
  const toggleRefillReminders = () => {
    const newValue = !formData.refillReminders;
    handleChange('refillReminders', newValue);
    
    // Announce state change to screen reader
    announceToScreenReader(`Refill reminders ${newValue ? 'enabled' : 'disabled'}`);
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
            // Make sure scroll respects accessibility
            accessibilityRole="scrollview"
          >
            {/* Make sure screen readers understand this is a header */}
            <Text 
              style={styles.header}
              accessibilityRole="header"
            >
              Add Medication
            </Text>
            
            {/* Success or error message for screen readers */}
            {submissionFeedback && (
              <Text
                style={[
                  styles.feedbackMessage,
                  errors && Object.keys(errors).length > 0 
                    ? styles.errorFeedback 
                    : styles.successFeedback
                ]}
                accessibilityRole="alert"
                accessibilityLiveRegion="assertive"
              >
                {submissionFeedback}
              </Text>
            )}
            
            {/* Medication Name Field */}
            <View style={styles.fieldContainer}>
              <Text 
                style={styles.label}
                nativeID="medicationNameLabel"
              >
                Medication Name *
              </Text>
              <TextInput
                ref={nameInputRef}
                style={[
                  styles.input,
                  touched.name && errors.name && styles.errorInput
                ]}
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                onBlur={() => handleBlur('name')}
                placeholder="Enter medication name"
                returnKeyType="next"
                onSubmitEditing={() => dosageInputRef.current?.focus()}
                // Accessibility properties
                accessible={true}
                accessibilityLabel="Medication Name, required"
                accessibilityHint="Enter the name of your medication"
                accessibilityLabelledBy="medicationNameLabel"
                accessibilityState={{ 
                  required: true, 
                  invalid: !!(touched.name && errors.name) 
                }}
              />
              {/* Accessible error message */}
              {touched.name && errors.name && (
                <Text 
                  style={styles.errorText}
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {errors.name}
                </Text>
              )}
            </View>
            
            {/* Dosage Field */}
            <View style={styles.fieldContainer}>
              <Text 
                style={styles.label}
                nativeID="dosageLabel"
              >
                Dosage *
              </Text>
              <TextInput
                ref={dosageInputRef}
                style={[
                  styles.input,
                  touched.dosage && errors.dosage && styles.errorInput
                ]}
                value={formData.dosage}
                onChangeText={(text) => handleChange('dosage', text)}
                onBlur={() => handleBlur('dosage')}
                placeholder="Enter dosage (e.g., 500mg)"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onSubmitEditing={() => frequencyInputRef.current?.focus()}
                // Accessibility properties
                accessible={true}
                accessibilityLabel="Dosage, required"
                accessibilityHint="Enter the dosage amount, for example 500mg"
                accessibilityLabelledBy="dosageLabel"
                accessibilityState={{ 
                  required: true, 
                  invalid: !!(touched.dosage && errors.dosage) 
                }}
              />
              {/* Accessible error message */}
              {touched.dosage && errors.dosage && (
                <Text 
                  style={styles.errorText}
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {errors.dosage}
                </Text>
              )}
            </View>
            
            {/* Frequency Field */}
            <View style={styles.fieldContainer}>
              <Text 
                style={styles.label}
                nativeID="frequencyLabel"
              >
                Frequency *
              </Text>
              <TextInput
                ref={frequencyInputRef}
                style={[
                  styles.input,
                  touched.frequency && errors.frequency && styles.errorInput
                ]}
                value={formData.frequency}
                onChangeText={(text) => handleChange('frequency', text)}
                onBlur={() => handleBlur('frequency')}
                placeholder="Enter frequency (e.g., twice daily)"
                returnKeyType="next"
                onSubmitEditing={() => startDateInputRef.current?.focus()}
                // Accessibility properties
                accessible={true}
                accessibilityLabel="Frequency, required"
                accessibilityHint="Enter how often to take the medication, for example twice daily"
                accessibilityLabelledBy="frequencyLabel"
                accessibilityState={{ 
                  required: true, 
                  invalid: !!(touched.frequency && errors.frequency) 
                }}
              />
              {/* Accessible error message */}
              {touched.frequency && errors.frequency && (
                <Text 
                  style={styles.errorText}
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {errors.frequency}
                </Text>
              )}
            </View>
            
            {/* Start Date Field */}
            <View style={styles.fieldContainer}>
              <Text 
                style={styles.label}
                nativeID="startDateLabel"
              >
                Start Date *
              </Text>
              <TextInput
                ref={startDateInputRef}
                style={[
                  styles.input,
                  touched.startDate && errors.startDate && styles.errorInput
                ]}
                value={formData.startDate}
                onChangeText={(text) => handleChange('startDate', text)}
                onBlur={() => handleBlur('startDate')}
                placeholder="MM/DD/YYYY"
                keyboardType="numbers-and-punctuation"
                returnKeyType="next"
                onSubmitEditing={() => instructionsInputRef.current?.focus()}
                // Accessibility properties
                accessible={true}
                accessibilityLabel="Start Date, required"
                accessibilityHint="Enter the start date in month, day, year format. For example, 01/15/2023 for January 15, 2023"
                accessibilityLabelledBy="startDateLabel"
                accessibilityState={{ 
                  required: true, 
                  invalid: !!(touched.startDate && errors.startDate) 
                }}
              />
              {/* Accessible error message */}
              {touched.startDate && errors.startDate && (
                <Text 
                  style={styles.errorText}
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {errors.startDate}
                </Text>
              )}
            </View>
            
            {/* Instructions Field */}
            <View style={styles.fieldContainer}>
              <Text 
                style={styles.label}
                nativeID="instructionsLabel"
              >
                Special Instructions
              </Text>
              <TextInput
                ref={instructionsInputRef}
                style={[
                  styles.textArea,
                  touched.instructions && errors.instructions && styles.errorInput,
                  formData.instructions.length > 180 && formData.instructions.length <= 200 && styles.warningInput,
                  formData.instructions.length > 200 && styles.errorInput
                ]}
                value={formData.instructions}
                onChangeText={(text) => handleChange('instructions', text)}
                onBlur={() => handleBlur('instructions')}
                placeholder="Enter any special instructions (optional, max 200 characters)"
                multiline
                numberOfLines={4}
                // Accessibility properties
                accessible={true}
                accessibilityLabel="Special Instructions, optional"
                accessibilityHint="Enter any special instructions for taking this medication. Maximum 200 characters"
                accessibilityLabelledBy="instructionsLabel"
                accessibilityState={{ 
                  invalid: !!(touched.instructions && errors.instructions) 
                }}
              />
              {/* Accessible error message */}
              {touched.instructions && errors.instructions && (
                <Text 
                  style={styles.errorText}
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                >
                  {errors.instructions}
                </Text>
              )}
              {/* Character count with appropriate colors */}
              <Text 
                style={[
                  styles.characterCount,
                  formData.instructions.length > 180 && formData.instructions.length <= 200 && styles.warningText,
                  formData.instructions.length > 200 && styles.errorText
                ]}
                accessibilityLabel={`${formData.instructions.length} of 200 characters used`}
              >
                {formData.instructions.length}/200
              </Text>
            </View>
            
            {/* Refill Reminders Toggle - Accessible Checkbox */}
            <View 
              style={styles.checkboxContainer}
              accessible={true}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: formData.refillReminders }}
              accessibilityLabel="Enable Refill Reminders"
              accessibilityHint="Toggle to receive reminders when this medication needs to be refilled"
            >
              <Pressable 
                style={styles.checkbox}
                onPress={toggleRefillReminders}
              >
                {formData.refillReminders && <View style={styles.checkboxInner} />}
              </Pressable>
              <Text
                style={styles.checkboxLabel}
                onPress={toggleRefillReminders} // Allow pressing text to toggle checkbox too
              >
                Enable Refill Reminders
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button 
                title={isSubmitting ? "Adding..." : "Add Medication"}
                onPress={handleSubmit}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel={isSubmitting ? "Adding medication" : "Add Medication"}
                accessibilityHint="Submit the form to add this medication to your list"
                accessibilityState={{ 
                  disabled: isSubmitting,
                  busy: isSubmitting
                }}
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
  feedbackMessage: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorFeedback: {
    backgroundColor: '#FFE5E5',
    color: '#FF3B30',
  },
  successFeedback: {
    backgroundColor: '#E5FFF2',
    color: '#34C759',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    minHeight: 44, // Ensure touch target is at least 44x44
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
    minWidth: 44, // Min width for touch target
    minHeight: 44, // Min height for touch target
    padding: 10, // Extra padding for touch target
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
    flex: 1,
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