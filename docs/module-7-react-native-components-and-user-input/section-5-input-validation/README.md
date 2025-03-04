# Section 5: Input Validation Strategies

## Learning Objectives
After completing this section, you will be able to:
- Implement client-side validation for React Native forms with TypeScript
- Choose appropriate validation timing (real-time, on blur, on submit)
- Provide meaningful error feedback to users
- Implement different validation strategies for various data types
- Use validation libraries effectively in React Native with TypeScript
- Create reusable validation patterns for your application

**Prerequisite Knowledge**: Text Input and Form Management (Sections 2 and 4)
**Estimated Time**: 45-60 minutes

## Input Validation Overview

Validation ensures that user inputs meet the expected format and requirements before processing. In mobile applications, implementing effective validation is crucial for:

1. Preventing invalid data submission
2. Providing immediate feedback to users
3. Enhancing the user experience
4. Reducing server-side processing
5. Maintaining data integrity

## Validation Timing

When implementing validation, you need to consider when validation should occur:

### 1. Real-Time Validation

Validate as the user types:

```tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const validatePassword = (value: string): void => {
    setPassword(value);
    
    if (value.length === 0) {
      setError(null); // Don't show error for empty field
    } else if (value.length < 8) {
      setError('Password must be at least 8 characters');
    } else if (!/[A-Z]/.test(value)) {
      setError('Password must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(value)) {
      setError('Password must contain at least one number');
    } else {
      setError(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={password}
        onChangeText={validatePassword}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});
```

### 2. Blur Validation

Validate when the user moves away from the input field:

```tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  
  const validateEmail = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    } else if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  };
  
  const handleBlur = (): void => {
    setTouched(true);
    setError(validateEmail(email));
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, touched && error && styles.errorInput]}
        value={email}
        onChangeText={setEmail}
        onBlur={handleBlur}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});
```

### 3. Submit Validation

Validate all fields when the form is submitted:

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

interface PatientFormData {
  name: string;
  age: string;
  weight: string;
}

interface Errors {
  name?: string;
  age?: string;
  weight?: string;
}

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    age: '',
    weight: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  
  const handleChange = (field: keyof PatientFormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || parseInt(formData.age) <= 0) {
      newErrors.age = 'Please enter a valid age';
    }
    
    // Weight validation
    if (formData.weight && (isNaN(Number(formData.weight)) || parseFloat(formData.weight) <= 0)) {
      newErrors.weight = 'Please enter a valid weight';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (): void => {
    if (validateForm()) {
      console.log('Form is valid, submitting:', formData);
      // Submit form data
    } else {
      console.log('Form has errors, please fix them');
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholder="Patient Name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <TextInput
        style={[styles.input, errors.age && styles.errorInput]}
        value={formData.age}
        onChangeText={(value) => handleChange('age', value)}
        placeholder="Age"
        keyboardType="numeric"
      />
      {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
      
      <TextInput
        style={[styles.input, errors.weight && styles.errorInput]}
        value={formData.weight}
        onChangeText={(value) => handleChange('weight', value)}
        placeholder="Weight (kg, optional)"
        keyboardType="decimal-pad"
      />
      {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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

## Common Validation Patterns

### 1. Required Fields

```tsx
const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};
```

### 2. Numeric Values

```tsx
const validateNumeric = (value: string, fieldName: string): string | null => {
  if (!value) return null; // Skip if empty and not required
  
  if (isNaN(Number(value)) || parseFloat(value) <= 0) {
    return `${fieldName} must be a positive number`;
  }
  return null;
};
```

### 3. Email Validation

```tsx
const validateEmail = (value: string): string | null => {
  if (!value) return null; // Skip if empty and not required
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};
```

### 4. Phone Number Validation

```tsx
const validatePhone = (value: string): string | null => {
  if (!value) return null; // Skip if empty and not required
  
  // Simple phone format: at least 10 digits
  const phoneRegex = /^\d{10,}$/;
  if (!phoneRegex.test(value.replace(/\D/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return null;
};
```

### 5. Date Validation

```tsx
const validateDate = (value: string, format: string = 'MM/DD/YYYY'): string | null => {
  if (!value) return null; // Skip if empty and not required
  
  // Check if in MM/DD/YYYY format
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!dateRegex.test(value)) {
    return 'Please enter a valid date in MM/DD/YYYY format';
  }
  
  // Check if the date is valid
  const [month, day, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return 'Please enter a valid date';
  }
  
  return null;
};
```

## Validation Libraries

For more complex validation needs, consider using validation libraries:

### 1. Yup with Formik

Yup is a schema validation library that works well with Formik:

```tsx
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

// Define form values interface
interface MedicationFormValues {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

// Define validation schema
const MedicationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Medication name is required'),
  dosage: Yup.number()
    .required('Dosage is required')
    .positive('Dosage must be a positive number'),
  frequency: Yup.string()
    .required('Frequency is required'),
  duration: Yup.number()
    .integer('Duration must be a whole number')
    .positive('Duration must be a positive number')
    .required('Duration is required'),
});

const MedicationValidationForm: React.FC = () => {
  return (
    <Formik<MedicationFormValues>
      initialValues={{
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
      }}
      validationSchema={MedicationSchema}
      onSubmit={(values) => {
        console.log('Valid form submitted:', values);
      }}
    >
      {({ 
        values, 
        errors, 
        touched, 
        handleChange, 
        handleBlur, 
        handleSubmit 
      }: FormikProps<MedicationFormValues>) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              touched.name && errors.name && styles.errorInput
            ]}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            placeholder="Medication Name"
          />
          {touched.name && errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.dosage && errors.dosage && styles.errorInput
            ]}
            value={values.dosage}
            onChangeText={handleChange('dosage')}
            onBlur={handleBlur('dosage')}
            placeholder="Dosage (mg)"
            keyboardType="numeric"
          />
          {touched.dosage && errors.dosage && (
            <Text style={styles.errorText}>{errors.dosage}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.frequency && errors.frequency && styles.errorInput
            ]}
            value={values.frequency}
            onChangeText={handleChange('frequency')}
            onBlur={handleBlur('frequency')}
            placeholder="Frequency (e.g., Twice daily)"
          />
          {touched.frequency && errors.frequency && (
            <Text style={styles.errorText}>{errors.frequency}</Text>
          )}
          
          <TextInput
            style={[
              styles.input,
              touched.duration && errors.duration && styles.errorInput
            ]}
            value={values.duration}
            onChangeText={handleChange('duration')}
            onBlur={handleBlur('duration')}
            placeholder="Duration (days)"
            keyboardType="numeric"
          />
          {touched.duration && errors.duration && (
            <Text style={styles.errorText}>{errors.duration}</Text>
          )}
          
          <Button title="Submit" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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

## Creating a Reusable Validation System

For large applications, consider creating a reusable validation system:

```tsx
// validation.ts - Utility file with validation functions
type ValidationResult = string | null;

export const validate = {
  required: (value: string, fieldName: string): ValidationResult => 
    !value || value.trim() === '' ? `${fieldName} is required` : null,
    
  minLength: (value: string, min: number, fieldName: string): ValidationResult => 
    value && value.length < min ? `${fieldName} must be at least ${min} characters` : null,
    
  maxLength: (value: string, max: number, fieldName: string): ValidationResult => 
    value && value.length > max ? `${fieldName} must be at most ${max} characters` : null,
    
  numeric: (value: string, fieldName: string): ValidationResult => 
    value && (isNaN(Number(value)) || parseFloat(value) <= 0) ? `${fieldName} must be a positive number` : null,
    
  email: (value: string): ValidationResult => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : null;
  },
  
  phone: (value: string): ValidationResult => {
    if (!value) return null;
    const phoneRegex = /^\d{10,}$/;
    return !phoneRegex.test(value.replace(/\D/g, '')) ? 'Please enter a valid phone number' : null;
  },
  
  date: (value: string, format: string = 'MM/DD/YYYY'): ValidationResult => {
    if (!value) return null;
    
    // Implementation depends on format
    if (format === 'MM/DD/YYYY') {
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!dateRegex.test(value)) {
        return 'Please enter a valid date in MM/DD/YYYY format';
      }
    }
    
    return null;
  },
};

// Using the validation system
import { validate } from './validation';

interface PatientFormValues {
  name: string;
  age: string;
  email: string;
}

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
}

const validatePatientForm = (values: PatientFormValues): FormErrors => {
  const errors: FormErrors = {};
  
  // Validate name
  const nameError = validate.required(values.name, 'Name');
  if (nameError) errors.name = nameError;
  
  // Validate age
  const ageError = validate.required(values.age, 'Age') || 
                   validate.numeric(values.age, 'Age');
  if (ageError) errors.age = ageError;
  
  // Validate email
  const emailError = validate.required(values.email, 'Email') ||
                    validate.email(values.email);
  if (emailError) errors.email = emailError;
  
  return errors;
};
```

## User Feedback Best Practices

When providing validation feedback:

1. **Be Specific**: Clearly explain what's wrong and how to fix it
2. **Timely Feedback**: Provide feedback at the appropriate time (immediate for critical errors, on blur for most inputs)
3. **Positive Validation**: Consider showing positive feedback for correctly filled fields
4. **Clear Visuals**: Use color, icons, and positioning to make errors noticeable
5. **Accessible Feedback**: Ensure error messages are accessible to screen readers

```tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // If using Expo

interface ValidatedInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  validate: (value: string) => string | null;
  placeholder?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  validate, 
  placeholder, 
  ...props 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  
  const handleChangeText = (text: string): void => {
    onChangeText(text);
    
    if (touched) {
      const validationError = validate(text);
      setError(validationError);
      setValid(!validationError && text.length > 0);
    }
  };
  
  const handleBlur = (): void => {
    setTouched(true);
    const validationError = validate(value);
    setError(validationError);
    setValid(!validationError && value.length > 0);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.errorInput,
            valid && styles.validInput,
          ]}
          value={value}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...props}
        />
        
        {valid && (
          <MaterialIcons 
            name="check-circle" 
            size={24} 
            color="#34C759" 
            style={styles.icon} 
          />
        )}
        
        {error && touched && (
          <MaterialIcons 
            name="error" 
            size={24} 
            color="#FF3B30" 
            style={styles.icon} 
          />
        )}
      </View>
      
      {error && touched && (
        <Text 
          style={styles.errorText}
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  validInput: {
    borderColor: '#34C759',
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});
```

## Exercise: Pharmacy Form Validation

Create a prescription form with the following validated fields:

1. Patient name (required)
2. Patient ID (required, alphanumeric, minimum 6 characters)
3. Medication (required)
4. Dosage (required, numeric, positive value)
5. Frequency (required)
6. Duration (required, numeric, whole number)
7. Special instructions (optional, maximum 200 characters)

Implement appropriate validation timing and error feedback for each field.

Use the following code as a starting point:

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

// Define your interfaces
interface PrescriptionFormData {
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  specialInstructions: string;
}

interface FormErrors {
  patientName?: string;
  patientId?: string;
  medication?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  specialInstructions?: string;
}

const PrescriptionForm: React.FC = () => {
  // Implement form state and validation here
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Prescription Details</Text>
      
      {/* Implement your validated form fields here */}
      
      <Button title="Submit Prescription" onPress={() => {}} />
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

export default PrescriptionForm;
```

## Additional Resources

- [Yup Schema Validation](https://github.com/jquense/yup)
- [Formik Documentation](https://formik.org/docs/guides/validation)
- [React Hook Form Validation](https://react-hook-form.com/get-started#Applyvalidation)
- [Regular Expressions 101](https://regex101.com/) - Useful for testing regex patterns
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 