/**
 * @fileoverview Multi-Step Medication Order Form Exercise - Complete Solution
 * @author React Native Training Course
 * @created 2023-07-20
 */

import React, { useState, useReducer } from 'react';
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
  ActivityIndicator,
} from 'react-native';

/**
 * Enum for form steps
 */
enum FormStep {
  PATIENT_INFO = 1,
  MEDICATION_SELECTION = 2,
  PRESCRIPTION_DETAILS = 3,
  REVIEW = 4,
}

/**
 * Type for form validation errors
 */
type FormErrors = {
  patientName?: string;
  patientId?: string;
  dateOfBirth?: string;
  medicationName?: string;
  medicationForm?: string;
  medicationStrength?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
};

/**
 * Action types for reducer
 */
type FormAction = 
  | { type: 'UPDATE_FIELD'; field: keyof MedicationOrderData; value: string }
  | { type: 'SET_ERRORS'; errors: FormErrors }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_FORM' };

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
 * Form state interface
 */
interface FormState {
  data: MedicationOrderData;
  errors: FormErrors;
}

/**
 * Initial form state
 */
const initialFormState: FormState = {
  data: {
    patientName: '',
    patientId: '',
    dateOfBirth: '',
    medicationName: '',
    medicationForm: '',
    medicationStrength: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  },
  errors: {},
};

/**
 * Form reducer function
 */
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined, // Clear error when field is updated
        },
      };
    
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {},
      };
    
    case 'RESET_FORM':
      return initialFormState;
    
    default:
      return state;
  }
};

/**
 * Multi-Step Medication Order Form Component
 * 
 * This component displays a multi-step form for ordering medication,
 * demonstrating form state management across multiple steps.
 * 
 * @returns {JSX.Element} A multi-step form for ordering medication
 */
const MedicationOrderForm: React.FC = () => {
  // Initialize the current step state
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PATIENT_INFO);
  
  // Initialize form state with reducer
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  // Form submission loading state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  /**
   * Handle field change
   * @param field - The field to update
   * @param value - The new value
   */
  const handleFieldChange = (field: keyof MedicationOrderData, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
    });
  };
  
  /**
   * Validate the current step
   * @returns Boolean indicating if the step is valid
   */
  const validateCurrentStep = (): boolean => {
    const { data } = formState;
    const errors: FormErrors = {};
    let isValid = true;
    
    switch (currentStep) {
      case FormStep.PATIENT_INFO:
        // Validate patient name
        if (!data.patientName.trim()) {
          errors.patientName = 'Patient name is required';
          isValid = false;
        }
        
        // Validate patient ID
        if (!data.patientId.trim()) {
          errors.patientId = 'Patient ID is required';
          isValid = false;
        } else if (!/^[A-Z0-9]{6,}$/i.test(data.patientId)) {
          errors.patientId = 'Patient ID must be at least 6 alphanumeric characters';
          isValid = false;
        }
        
        // Validate date of birth
        if (!data.dateOfBirth.trim()) {
          errors.dateOfBirth = 'Date of birth is required';
          isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(data.dateOfBirth)) {
          errors.dateOfBirth = 'Date must be in MM/DD/YYYY format';
          isValid = false;
        }
        break;
      
      case FormStep.MEDICATION_SELECTION:
        // Validate medication name
        if (!data.medicationName.trim()) {
          errors.medicationName = 'Medication name is required';
          isValid = false;
        }
        
        // Validate medication form
        if (!data.medicationForm.trim()) {
          errors.medicationForm = 'Medication form is required';
          isValid = false;
        }
        
        // Validate medication strength
        if (!data.medicationStrength.trim()) {
          errors.medicationStrength = 'Medication strength is required';
          isValid = false;
        }
        break;
      
      case FormStep.PRESCRIPTION_DETAILS:
        // Validate dosage
        if (!data.dosage.trim()) {
          errors.dosage = 'Dosage is required';
          isValid = false;
        }
        
        // Validate frequency
        if (!data.frequency.trim()) {
          errors.frequency = 'Frequency is required';
          isValid = false;
        }
        
        // Validate duration
        if (!data.duration.trim()) {
          errors.duration = 'Duration is required';
          isValid = false;
        }
        break;
    }
    
    // Set any errors found
    if (!isValid) {
      dispatch({ type: 'SET_ERRORS', errors });
    }
    
    return isValid;
  };
  
  /**
   * Move to the next step
   */
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(current => (current < FormStep.REVIEW ? current + 1 : current));
      dispatch({ type: 'CLEAR_ERRORS' });
    }
  };
  
  /**
   * Move to the previous step
   */
  const goToPreviousStep = () => {
    setCurrentStep(current => (current > FormStep.PATIENT_INFO ? current - 1 : current));
    dispatch({ type: 'CLEAR_ERRORS' });
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setIsSubmitting(false);
      Alert.alert(
        'Order Submitted',
        'Your medication order has been successfully submitted.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form and go back to first step
              dispatch({ type: 'RESET_FORM' });
              setCurrentStep(FormStep.PATIENT_INFO);
            } 
          }
        ]
      );
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert(
        'Submission Error',
        'There was an error submitting your order. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };
  
  /**
   * Render a field with label and error handling
   */
  const renderField = (
    label: string,
    field: keyof MedicationOrderData,
    placeholder: string,
    keyboardType: 'default' | 'numeric' | 'email-address' = 'default',
    multiline: boolean = false
  ) => {
    const { data, errors } = formState;
    
    return (
      <View>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          style={[
            styles.input,
            multiline && styles.textArea,
            errors[field] && styles.errorInput,
          ]}
          placeholder={placeholder}
          value={data[field]}
          onChangeText={(value) => handleFieldChange(field, value)}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
        {errors[field] && (
          <Text style={styles.errorText}>{errors[field]}</Text>
        )}
      </View>
    );
  };
  
  /**
   * Render Patient Information Step (Step 1)
   */
  const renderPatientInfoStep = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Patient Information</Text>
        
        {renderField(
          'Patient Name',
          'patientName',
          'Enter patient\'s full name'
        )}
        
        {renderField(
          'Patient ID',
          'patientId',
          'Enter patient ID number'
        )}
        
        {renderField(
          'Date of Birth',
          'dateOfBirth',
          'MM/DD/YYYY'
        )}
        
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }} />
          <Button title="Next" onPress={goToNextStep} />
        </View>
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
        
        {renderField(
          'Medication Name',
          'medicationName',
          'Enter medication name'
        )}
        
        {renderField(
          'Medication Form',
          'medicationForm',
          'e.g., Tablet, Capsule, Liquid'
        )}
        
        {renderField(
          'Medication Strength',
          'medicationStrength',
          'e.g., 500mg, 10mg/ml'
        )}
        
        <View style={styles.buttonContainer}>
          <Button title="Previous" onPress={goToPreviousStep} />
          <Button title="Next" onPress={goToNextStep} />
        </View>
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
        
        {renderField(
          'Dosage',
          'dosage',
          'e.g., 1 tablet, 10ml'
        )}
        
        {renderField(
          'Frequency',
          'frequency',
          'e.g., Twice daily, Every 8 hours'
        )}
        
        {renderField(
          'Duration',
          'duration',
          'e.g., 7 days, 2 weeks'
        )}
        
        {renderField(
          'Special Instructions',
          'instructions',
          'Enter any special instructions or notes',
          'default',
          true
        )}
        
        <View style={styles.buttonContainer}>
          <Button title="Previous" onPress={goToPreviousStep} />
          <Button title="Next" onPress={goToNextStep} />
        </View>
      </View>
    );
  };
  
  /**
   * Render a review section for a step
   */
  const renderReviewSection = (title: string, fields: { label: string; field: keyof MedicationOrderData }[]) => {
    const { data } = formState;
    
    return (
      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>{title}</Text>
        {fields.map(({ label, field }) => (
          <View key={field} style={styles.reviewField}>
            <Text style={styles.reviewLabel}>{label}</Text>
            <Text style={styles.reviewValue}>{data[field] || 'Not provided'}</Text>
          </View>
        ))}
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
        
        {renderReviewSection('Patient Information', [
          { label: 'Patient Name', field: 'patientName' },
          { label: 'Patient ID', field: 'patientId' },
          { label: 'Date of Birth', field: 'dateOfBirth' },
        ])}
        
        {renderReviewSection('Medication Selection', [
          { label: 'Medication Name', field: 'medicationName' },
          { label: 'Medication Form', field: 'medicationForm' },
          { label: 'Medication Strength', field: 'medicationStrength' },
        ])}
        
        {renderReviewSection('Prescription Details', [
          { label: 'Dosage', field: 'dosage' },
          { label: 'Frequency', field: 'frequency' },
          { label: 'Duration', field: 'duration' },
          { label: 'Special Instructions', field: 'instructions' },
        ])}
        
        <View style={styles.buttonContainer}>
          <Button title="Previous" onPress={goToPreviousStep} />
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Button title="Submit Order" onPress={handleSubmit} />
          )}
        </View>
      </View>
    );
  };
  
  /**
   * Render the current step based on step state
   */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.PATIENT_INFO:
        return renderPatientInfoStep();
      case FormStep.MEDICATION_SELECTION:
        return renderMedicationSelectionStep();
      case FormStep.PRESCRIPTION_DETAILS:
        return renderPrescriptionDetailsStep();
      case FormStep.REVIEW:
        return renderReviewStep();
      default:
        return renderPatientInfoStep();
    }
  };
  
  /**
   * Render progress indicator
   */
  const renderProgressIndicator = () => {
    return (
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressCircle, 
            currentStep >= FormStep.PATIENT_INFO && styles.activeProgressCircle
          ]}
        >
          <Text style={styles.progressStep}>1</Text>
        </View>
        <View 
          style={[
            styles.progressLine, 
            currentStep > FormStep.PATIENT_INFO && styles.activeProgressLine
          ]}
        />
        <View 
          style={[
            styles.progressCircle, 
            currentStep >= FormStep.MEDICATION_SELECTION && styles.activeProgressCircle
          ]}
        >
          <Text style={styles.progressStep}>2</Text>
        </View>
        <View 
          style={[
            styles.progressLine, 
            currentStep > FormStep.MEDICATION_SELECTION && styles.activeProgressLine
          ]}
        />
        <View 
          style={[
            styles.progressCircle, 
            currentStep >= FormStep.PRESCRIPTION_DETAILS && styles.activeProgressCircle
          ]}
        >
          <Text style={styles.progressStep}>3</Text>
        </View>
        <View 
          style={[
            styles.progressLine, 
            currentStep > FormStep.PRESCRIPTION_DETAILS && styles.activeProgressLine
          ]}
        />
        <View 
          style={[
            styles.progressCircle, 
            currentStep >= FormStep.REVIEW && styles.activeProgressCircle
          ]}
        >
          <Text style={styles.progressStep}>4</Text>
        </View>
      </View>
    );
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
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
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
    backgroundColor: '#f9f9f9',
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  progressCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeProgressCircle: {
    backgroundColor: '#007AFF',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e0e0e0',
  },
  activeProgressLine: {
    backgroundColor: '#007AFF',
  },
  progressStep: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  reviewSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  reviewField: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  reviewLabel: {
    flex: 1,
    fontWeight: '500',
    color: '#555',
  },
  reviewValue: {
    flex: 2,
    color: '#333',
  },
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <MedicationOrderForm />;
}

export default App;