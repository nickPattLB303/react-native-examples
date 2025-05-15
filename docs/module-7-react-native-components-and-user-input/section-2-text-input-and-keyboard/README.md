# Section 2: Text Input and Keyboard Management

## Learning Objectives
After completing this section, you will be able to:
- Implement text input fields with appropriate configurations
- Select the correct keyboard type for different input needs
- Manage keyboard appearance and dismissal
- Handle text input focus and blur events
- Apply proper validation techniques for input fields
- Create accessible text input components

**Prerequisite Knowledge**: Core UI Components (Section 1)
**Estimated Time**: 45-60 minutes

## TextInput Component Overview

The `TextInput` component is one of the most commonly used components for capturing user input in React Native applications. Unlike web input elements, mobile text inputs have additional considerations such as keyboard types, auto-capitalization, and keyboard management.

### Basic TextInput Implementation

```jsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const PatientNameInput = () => {
  const [name, setName] = useState('');
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Patient Name"
        placeholderTextColor="#888"
      />
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
    fontSize: 16,
  },
});
```

### TextInput Props and Configuration

The `TextInput` component offers many props to customize its behavior:

#### Keyboard Types

React Native provides different keyboard types optimized for specific input needs:

```jsx
<TextInput
  keyboardType="numeric" // For numbers only
  // Other options: 'default', 'email-address', 'phone-pad', 'decimal-pad', etc.
/>
```

Common keyboard types include:
- `default`: Standard keyboard
- `numeric`: Number keyboard
- `email-address`: Keyboard optimized for email entry
- `phone-pad`: Phone number input keyboard
- `decimal-pad`: Numeric keyboard with decimal
- `url`: URL entry keyboard with "/" and ".com" keys

#### Text Entry Behavior

Control how text appears as it's entered:

```jsx
<TextInput
  autoCapitalize="words" // Capitalize first letter of each word
  autoCorrect={false} // Disable auto-correction
  secureTextEntry={true} // For password fields
/>
```

Auto-capitalize options:
- `none`: No auto capitalization
- `sentences`: Capitalize first letter of each sentence
- `words`: Capitalize first letter of each word
- `characters`: Capitalize all characters

#### Visual Configuration

Customize the appearance of the input:

```jsx
<TextInput
  placeholder="Enter medication dosage"
  placeholderTextColor="#888888"
  selectionColor="#007AFF"
  maxLength={50}
  multiline={true}
  numberOfLines={4}
/>
```

## Keyboard Management

One crucial aspect of text input on mobile devices is managing the keyboard. Unlike web applications, the virtual keyboard on mobile devices takes up significant screen space.

### Keyboard Awareness

To ensure your input fields aren't hidden by the keyboard, you can use libraries like `KeyboardAvoidingView` or `react-native-keyboard-aware-scroll-view`:

```jsx
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const InputForm = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        {/* Your input fields here */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
```

### Dismissing the Keyboard

Users expect to be able to dismiss the keyboard by tapping outside of an input field:

```jsx
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

const DismissibleKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
```

### Handling Input Focus

Managing focus between multiple inputs can improve the user experience:

```jsx
import React, { useRef } from 'react';
import { View, TextInput, Button } from 'react-native';

const MultipleInputs = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  
  return (
    <View>
      <TextInput
        ref={firstNameRef}
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current.focus()}
        blurOnSubmit={false}
      />
      
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => dobRef.current.focus()}
        blurOnSubmit={false}
      />
      
      <TextInput
        ref={dobRef}
        placeholder="Date of Birth"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
};
```

## Input Validation and Feedback

Providing immediate feedback for text input is essential for a good user experience:

```jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const MedicationDosageInput = () => {
  const [dosage, setDosage] = useState('');
  const [error, setError] = useState(null);
  
  const validateDosage = (value) => {
    setDosage(value);
    
    if (!value) {
      setError('Dosage is required');
    } else if (isNaN(value)) {
      setError('Dosage must be a number');
    } else if (parseInt(value) <= 0) {
      setError('Dosage must be greater than 0');
    } else {
      setError(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError
        ]}
        value={dosage}
        onChangeText={validateDosage}
        placeholder="Dosage (mg)"
        keyboardType="numeric"
      />
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});
```

## Accessibility Considerations

Making text input accessible is essential for all users:

```jsx
<TextInput
  accessible={true}
  accessibilityLabel="Patient first name input field"
  accessibilityHint="Enter the patient's first name"
  // Other props...
/>
```

For more complex inputs with labels, ensure proper relationships:

```jsx
import { View, Text, TextInput } from 'react-native';

const AccessibleInput = () => {
  return (
    <View>
      <Text accessibilityRole="text" nativeID="dosageLabel">
        Medication Dosage (mg)
      </Text>
      <TextInput
        accessibilityLabelledBy="dosageLabel"
        keyboardType="numeric"
        // Other props...
      />
    </View>
  );
};
```

## Exercise: Patient Information Input Form

Create a patient information input form with the following fields:

1. First Name (text input)
2. Last Name (text input)
3. Date of Birth (text input with appropriate format)
4. Phone Number (text input with phone keyboard)
5. Email Address (text input with email keyboard)
6. Patient ID (text input with auto-capitalization for characters)
7. Notes (multiline text input)

Implement proper keyboard management and focus handling between fields.

Use the following code as a starting point:

```jsx
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
} from 'react-native';

const PatientInformationForm = () => {
  // Define your state variables and refs here
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.header}>Patient Information</Text>
          
          {/* Implement your form fields here */}
          
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  // Add additional styles here
});

export default PatientInformationForm;
```

## Additional Resources

- [TextInput Component Documentation](https://reactnative.dev/docs/textinput)
- [Keyboard API Documentation](https://reactnative.dev/docs/keyboard)
- [KeyboardAvoidingView Documentation](https://reactnative.dev/docs/keyboardavoidingview)
- [React Native Accessibility Documentation](https://reactnative.dev/docs/accessibility) 