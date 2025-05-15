# Section 4: Form Management in React Native

## Learning Objectives
After completing this section, you will be able to:
- Implement structured form state management in React Native
- Organize complex multi-step forms with proper state handling
- Use various approaches for managing form state (local state, useReducer, form libraries)
- Navigate between form steps while preserving data
- Implement form submission and error handling
- Create consistent form patterns for your application

**Prerequisite Knowledge**: Basic React hooks (useState, useEffect) from Module 6
**Estimated Time**: 45-60 minutes

## Form Management Challenges in React Native

Managing forms in React Native presents unique challenges compared to web development:

1. No native HTML form element equivalent
2. Multiple input types with different behaviors
3. Mobile-specific considerations (keyboard management, screen size)
4. Complex validation requirements
5. Multi-step forms common in mobile applications

## Basic Form State Management

For simple forms, using local state with `useState` is often sufficient:

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SimplePatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
  });
  
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Process form submission
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patient Information</Text>
      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (MM/DD/YYYY)"
        value={formData.dob}
        onChangeText={(value) => handleChange('dob', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
```

## Form Management with useReducer

For more complex forms, using `useReducer` can help manage form state more effectively:

```jsx
import React, { useReducer } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Define initial state
const initialState = {
  medication: {
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
  },
  errors: {},
  isSubmitting: false,
};

// Define reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        medication: {
          ...state.medication,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: null, // Clear field error when updated
        },
      };
    case 'VALIDATE':
      const errors = {};
      // Perform validation
      if (!state.medication.name) errors.name = 'Medication name is required';
      if (!state.medication.dosage) errors.dosage = 'Dosage is required';
      if (!state.medication.frequency) errors.frequency = 'Frequency is required';
      
      return {
        ...state,
        errors,
        isValid: Object.keys(errors).length === 0,
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        medication: initialState.medication, // Reset form
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error,
      };
    default:
      return state;
  }
};

const MedicationForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { medication, errors, isSubmitting } = state;
  
  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
    });
  };
  
  const handleSubmit = async () => {
    // Validate form
    dispatch({ type: 'VALIDATE' });
    
    // Check if form is valid
    if (Object.keys(errors).length === 0) {
      try {
        dispatch({ type: 'SUBMIT_START' });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Handle successful submission
        dispatch({ type: 'SUBMIT_SUCCESS' });
        
      } catch (error) {
        dispatch({ 
          type: 'SUBMIT_ERROR',
          error: error.message || 'Failed to submit medication information'
        });
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Medication</Text>
      
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Medication Name"
        value={medication.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <TextInput
        style={[styles.input, errors.dosage && styles.errorInput]}
        placeholder="Dosage (e.g., 500mg)"
        value={medication.dosage}
        onChangeText={(value) => handleChange('dosage', value)}
      />
      {errors.dosage && <Text style={styles.errorText}>{errors.dosage}</Text>}
      
      <TextInput
        style={[styles.input, errors.frequency && styles.errorInput]}
        placeholder="Frequency (e.g., Twice daily)"
        value={medication.frequency}
        onChangeText={(value) => handleChange('frequency', value)}
      />
      {errors.frequency && <Text style={styles.errorText}>{errors.frequency}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder="Duration (e.g., 10 days)"
        value={medication.duration}
        onChangeText={(value) => handleChange('duration', value)}
      />
      
      <Button 
        title={isSubmitting ? "Submitting..." : "Add Medication"}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 16,
  },
});
```

## Multi-Step Forms

Mobile applications often use multi-step forms to break complex forms into manageable sections:

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MultiStepMedicationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: '',
    dosage: '',
    
    // Step 2: Schedule
    frequency: '',
    timeOfDay: '',
    
    // Step 3: Additional Details
    startDate: '',
    endDate: '',
    notes: '',
  });
  
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };
  
  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };
  
  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Process form submission
  };
  
  // Render different form steps based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Basic Information</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Dosage (e.g., 500mg)"
              value={formData.dosage}
              onChangeText={(value) => handleChange('dosage', value)}
            />
            
            <Button title="Next" onPress={nextStep} />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Schedule</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Frequency (e.g., Twice daily)"
              value={formData.frequency}
              onChangeText={(value) => handleChange('frequency', value)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Time of Day (e.g., Morning/Evening)"
              value={formData.timeOfDay}
              onChangeText={(value) => handleChange('timeOfDay', value)}
            />
            
            <View style={styles.buttonRow}>
              <Button title="Previous" onPress={prevStep} />
              <Button title="Next" onPress={nextStep} />
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>Additional Details</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Start Date (MM/DD/YYYY)"
              value={formData.startDate}
              onChangeText={(value) => handleChange('startDate', value)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="End Date (MM/DD/YYYY)"
              value={formData.endDate}
              onChangeText={(value) => handleChange('endDate', value)}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes"
              value={formData.notes}
              onChangeText={(value) => handleChange('notes', value)}
              multiline
              numberOfLines={4}
            />
            
            <View style={styles.buttonRow}>
              <Button title="Previous" onPress={prevStep} />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Medication</Text>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, step >= 1 && styles.activeDot]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressDot, step >= 2 && styles.activeDot]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressDot, step >= 3 && styles.activeDot]} />
      </View>
      
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
});
```

## Using Form Libraries

For complex forms, consider using form libraries like Formik or React Hook Form:

### Formik Example

```jsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const PatientSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  dob: Yup.string().matches(
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    'Date must be in MM/DD/YYYY format'
  ).required('Date of birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const FormikPatientForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
      }}
      validationSchema={PatientSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log('Form submitted:', values);
          setSubmitting(false);
          resetForm();
        }, 1000);
      }}
    >
      {({ 
        values, 
        errors, 
        touched, 
        handleChange, 
        handleBlur, 
        handleSubmit, 
        isSubmitting 
      }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Patient Registration</Text>
          
          <TextInput
            style={[
              styles.input,
              touched.firstName && errors.firstName && styles.errorInput
            ]}
            placeholder="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
          />
          {touched.firstName && errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.lastName && errors.lastName && styles.errorInput
            ]}
            placeholder="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
          />
          {touched.lastName && errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.dob && errors.dob && styles.errorInput
            ]}
            placeholder="Date of Birth (MM/DD/YYYY)"
            value={values.dob}
            onChangeText={handleChange('dob')}
            onBlur={handleBlur('dob')}
          />
          {touched.dob && errors.dob && (
            <Text style={styles.errorText}>{errors.dob}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.email && errors.email && styles.errorInput
            ]}
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          
          <Button 
            title={isSubmitting ? "Submitting..." : "Register Patient"}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 16,
  },
});
```

## Form Submission and Error Handling

Proper form submission includes loading states and error handling:

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';

const FormWithSubmission = () => {
  const [formData, setFormData] = useState({
    medicationName: '',
    prescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
    
    // Clear error when user starts typing again
    if (error) setError(null);
  };
  
  const handleSubmit = async () => {
    // Basic validation
    if (!formData.medicationName.trim() || !formData.prescription.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random error for demonstration
      if (Math.random() < 0.3) {
        throw new Error('Network error. Please try again.');
      }
      
      // Success
      setLoading(false);
      Alert.alert(
        'Success',
        'Prescription submitted successfully',
        [{ text: 'OK', onPress: () => resetForm() }]
      );
      
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An error occurred');
    }
  };
  
  const resetForm = () => {
    setFormData({
      medicationName: '',
      prescription: '',
    });
    setError(null);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Submit Prescription</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={formData.medicationName}
        onChangeText={(value) => handleChange('medicationName', value)}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Prescription Details"
        value={formData.prescription}
        onChangeText={(value) => handleChange('prescription', value)}
        multiline
        numberOfLines={4}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <Button title="Submit Prescription" onPress={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  loader: {
    marginVertical: 16,
  },
});
```

## Exercise: Multi-Step Medication Order Form

Create a multi-step medication order form with the following steps:

1. Patient information (name, ID, DOB)
2. Medication selection (medication name, form, strength)
3. Prescription details (dosage, frequency, duration)
4. Review and submit

Use either useState, useReducer, or a form library of your choice.

Use the following code as a starting point:

```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const MedicationOrderForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Add your initial form state here
  });
  
  // Implement your form logic here
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Medication Order</Text>
      
      {/* Implement the multi-step form here */}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  // Add your styles here
});

export default MedicationOrderForm;
```

## Additional Resources

- [Formik Documentation](https://formik.org/docs/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Yup Validation](https://github.com/jquense/yup)
- [React Navigation](https://reactnavigation.org/) - Useful for multi-step forms with screen navigation 