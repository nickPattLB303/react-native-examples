# Section 6: Accessibility in Forms

## Learning Objectives
After completing this section, you will be able to:
- Implement accessible form components in React Native with TypeScript
- Understand the importance of accessibility in mobile applications
- Apply proper accessibility labels, roles, and hints to form elements
- Create forms that work well with screen readers
- Test your form's accessibility
- Address common accessibility issues in React Native forms

**Prerequisite Knowledge**: React Native Components and Text Input (Sections 1 and 2)
**Estimated Time**: 45-60 minutes

## Accessibility Overview

Accessibility ensures that applications are usable by everyone, including people with disabilities. In healthcare applications like our pharmacy app, accessibility is particularly important as users may have diverse needs and abilities.

React Native provides built-in APIs to make your app accessible to screen readers and other assistive technologies.

## Why Accessibility Matters

- **Legal Requirements**: Many countries require applications to be accessible
- **Wider User Base**: Accessible apps reach more users
- **Better UX for Everyone**: Accessibility improvements benefit all users
- **Ethical Responsibility**: Making technology inclusive is the right thing to do

## Basic Accessibility Properties

React Native provides several properties to make components accessible:

### 1. `accessible`

Makes a component accessible to assistive technology:

```tsx
<View accessible={true}>
  {/* Content */}
</View>
```

### 2. `accessibilityLabel`

Provides a description of the element for screen readers:

```tsx
<TextInput
  accessible={true}
  accessibilityLabel="Enter your medication dosage"
  // Other props
/>
```

### 3. `accessibilityHint`

Provides additional context about what will happen when the user interacts with the component:

```tsx
<Pressable
  accessible={true}
  accessibilityLabel="Submit medication order"
  accessibilityHint="Submits your medication order and navigates to the confirmation screen"
  onPress={handleSubmit}
>
  <Text>Submit</Text>
</Pressable>
```

### 4. `accessibilityRole`

Tells the screen reader what kind of UI element it is:

```tsx
<Text accessibilityRole="header">Medication Details</Text>

<Pressable 
  accessibilityRole="button"
  onPress={handlePress}
>
  <Text>Add to Cart</Text>
</Pressable>

<View accessibilityRole="alert">
  <Text>Your prescription has been submitted successfully</Text>
</View>
```

Common accessibility roles include:
- `button`
- `header`
- `link`
- `search`
- `image`
- `text`
- `adjustable` (e.g., sliders)
- `checkbox`
- `radio`
- `alert`
- `combobox`

### 5. `accessibilityState`

Communicates the state of a component to the screen reader:

```tsx
<Pressable
  accessibilityRole="checkbox"
  accessibilityState={{ checked: isChecked }}
  onPress={() => setIsChecked(!isChecked)}
>
  <Text>Auto-refill prescription</Text>
</Pressable>
```

Available states include:
- `disabled`
- `selected`
- `checked`
- `busy`
- `expanded`

## Making Forms Accessible

### 1. Label Association

In React Native, you can associate labels with inputs using the `nativeID` and `accessibilityLabelledBy` props:

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const AccessibleInput: React.FC = () => {
  const [value, setValue] = useState<string>('');
  
  return (
    <View style={styles.container}>
      <Text 
        nativeID="medicationNameLabel"
        style={styles.label}
      >
        Medication Name
      </Text>
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        accessibilityLabelledBy="medicationNameLabel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
```

### 2. Grouping Related Elements

Group related form elements to help screen reader users understand the structure:

```tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type FrequencyOption = 'daily' | 'twice_daily' | 'three_times';

interface FrequencySelectorProps {
  onChange?: (value: FrequencyOption) => void;
  defaultValue?: FrequencyOption;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({ 
  onChange,
  defaultValue = 'daily'
}) => {
  const [selected, setSelected] = useState<FrequencyOption>(defaultValue);
  
  const options: Array<{id: FrequencyOption; label: string}> = [
    { id: 'daily', label: 'Once Daily' },
    { id: 'twice_daily', label: 'Twice Daily' },
    { id: 'three_times', label: 'Three Times Daily' },
  ];
  
  const handleSelect = (value: FrequencyOption): void => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };
  
  return (
    <View 
      style={styles.container}
      accessibilityRole="radiogroup"
      accessibilityLabel="Medication frequency selection"
    >
      <Text style={styles.label}>Frequency</Text>
      
      {options.map((option) => {
        const isSelected = selected === option.id;
        
        return (
          <Pressable
            key={option.id}
            style={styles.option}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            accessibilityLabel={option.label}
            onPress={() => handleSelect(option.id)}
          >
            <View style={[
              styles.radioOuter,
              isSelected && styles.radioOuterSelected
            ]}>
              {isSelected && (
                <View style={styles.radioInner} />
              )}
            </View>
            <Text style={styles.optionLabel}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  optionLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});
```

### 3. Error Feedback

Make error messages accessible to screen readers:

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface AccessibleInputWithErrorProps {
  label: string;
  initialValue?: string;
  onChangeText?: (text: string) => void;
  required?: boolean;
}

const AccessibleInputWithError: React.FC<AccessibleInputWithErrorProps> = ({ 
  label,
  initialValue = '',
  onChangeText,
  required = false
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  
  const validateInput = (text: string): void => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
    
    if (required && !text.trim()) {
      setError('This field is required');
    } else {
      setError(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text 
        nativeID="patientNameLabel"
        style={styles.label}
      >
        {label}
      </Text>
      
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={value}
        onChangeText={validateInput}
        accessibilityLabelledBy="patientNameLabel"
        accessibilityInvalid={!!error}
      />
      
      {error && (
        <Text 
          style={styles.errorText}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
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

### 4. Focus Management

Proper focus management helps users navigate forms with a keyboard or assistive technology:

```tsx
import React, { useRef } from 'react';
import { View, TextInput, Button, StyleSheet, TextInputProps } from 'react-native';

interface FocusManagementFormProps {
  onSubmit?: (data: { name: string; email: string; phone: string }) => void;
}

const FocusManagementForm: React.FC<FocusManagementFormProps> = ({ onSubmit }) => {
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const handleChange = (field: 'name' | 'email' | 'phone', value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (): void => {
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Reset form and focus back to first field
    setFormData({ name: '', email: '', phone: '' });
    nameInputRef.current?.focus();
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        ref={nameInputRef}
        style={styles.input}
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholder="Name"
        returnKeyType="next"
        onSubmitEditing={() => emailInputRef.current?.focus()}
        blurOnSubmit={false}
        accessibilityLabel="Name input"
        accessibilityHint="Enter your name, then press next to move to email"
      />
      
      <TextInput
        ref={emailInputRef}
        style={styles.input}
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => phoneInputRef.current?.focus()}
        blurOnSubmit={false}
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email, then press next to move to phone"
      />
      
      <TextInput
        ref={phoneInputRef}
        style={styles.input}
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
        placeholder="Phone"
        keyboardType="phone-pad"
        returnKeyType="done"
        accessibilityLabel="Phone input"
        accessibilityHint="Enter your phone number, then press done"
      />
      
      <Button 
        title="Submit" 
        onPress={handleSubmit} 
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
    marginBottom: 16,
  },
});
```

## Creating Accessible Custom Form Components

When creating custom form components, ensure they're accessible:

```tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type OptionType = {
  label: string;
  value: string;
};

interface AccessibleSegmentedControlProps {
  options: OptionType[];
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const AccessibleSegmentedControl: React.FC<AccessibleSegmentedControlProps> = ({ 
  options, 
  onChange, 
  defaultValue 
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || options[0].value);
  
  const handleSelect = (value: string): void => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };
  
  return (
    <View 
      style={styles.container}
      accessibilityRole="radiogroup"
      accessibilityLabel="Select an option"
    >
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        
        return (
          <Pressable
            key={option.value}
            style={[
              styles.option,
              isSelected && styles.selectedOption
            ]}
            onPress={() => handleSelect(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            accessibilityLabel={`${option.label}, ${isSelected ? 'selected' : 'not selected'}`}
          >
            <Text style={[
              styles.optionText,
              isSelected && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: 'white',
  },
});
```

## Platform-Specific Considerations

### iOS

- VoiceOver is the built-in screen reader
- Supports dynamic type for font scaling
- Has specific gestures for navigation

### Android

- TalkBack is the built-in screen reader
- Supports font scaling through system settings
- Has different navigation gestures than iOS

When possible, test your app with both VoiceOver and TalkBack.

## Testing Accessibility

### Manual Testing

1. **Enable Screen Readers**:
   - iOS: Settings > Accessibility > VoiceOver
   - Android: Settings > Accessibility > TalkBack

2. **Navigate Your App**:
   - Swipe to navigate between elements
   - Double-tap to activate buttons
   - Three-finger swipe to scroll

3. **Check for Issues**:
   - Can all interactive elements be reached and activated?
   - Are all elements properly labeled?
   - Is the reading order logical?
   - Are form validations announced properly?

### Automated Testing

Use the Accessibility Inspector tools:
- iOS: Xcode > Open Developer Tool > Accessibility Inspector
- Android: Settings > Accessibility > Accessibility Scanner

## Accessible Form Best Practices

1. **Provide Clear Labels**: Every input should have a clear, descriptive label
2. **Use Proper Input Types**: Use the right input type (e.g., numeric keyboard for numbers)
3. **Group Related Elements**: Group related form controls together
4. **Provide Sufficient Contrast**: Ensure text has sufficient contrast against backgrounds
5. **Make Touch Targets Large**: Make touchable elements at least 44×44 points
6. **Use Descriptive Button Text**: Avoid vague button labels like "Click Here"
7. **Provide Error Feedback**: Make error messages clear and accessible
8. **Support Keyboard Navigation**: Ensure proper tab order and focus management
9. **Test with Screen Readers**: Use VoiceOver and TalkBack to test your forms

## Exercise: Create an Accessible Medication Form

Create an accessible medication intake form with the following requirements:

1. All form controls should have proper accessibility labels, roles, and hints
2. Form validation errors should be announced to screen readers
3. Focus management should allow for easy navigation between fields
4. The form should be usable with just a screen reader

Use the following code as a starting point:

```tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TextInputProps } from 'react-native';

// Define the interface for form data
interface MedicationFormData {
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

// Define the interface for form errors
interface FormErrors {
  name?: string;
  dosage?: string;
  frequency?: string;
  instructions?: string;
}

const AccessibleMedicationForm: React.FC = () => {
  // Add your state and logic here
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Medication</Text>
      
      {/* Implement your accessible form here */}
      
      <Button title="Submit" onPress={() => {}} />
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

export default AccessibleMedicationForm;
```

## Additional Resources

- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [iOS Accessibility](https://developer.apple.com/accessibility/ios/)
- [Android Accessibility](https://developer.android.com/guide/topics/ui/accessibility)
- [React Native Accessibility Demo App](https://github.com/FormidableLabs/react-native-accessibility-demo)
- [React Native with TypeScript Accessibility Guide](https://medium.com/react-native-accessibility/react-native-accessibility-in-typescript-1163a19c3ff6) 