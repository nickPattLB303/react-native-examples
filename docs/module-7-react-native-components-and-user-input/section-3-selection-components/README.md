# Section 3: Selection Components and Pickers

## Learning Objectives
After completing this section, you will be able to:
- Implement various selection components in React Native with TypeScript
- Choose the appropriate selection component for different use cases
- Handle state management for selection components using TypeScript
- Create custom selection components when needed
- Implement platform-specific solutions for selection UI
- Ensure selection components are accessible

**Prerequisite Knowledge**: Core UI Components (Section 1)
**Estimated Time**: 45-60 minutes

## Selection Components Overview

Selection components allow users to choose options from a predefined set. In web development, we have elements like `<select>`, `<input type="checkbox">`, and `<input type="radio">`. In React Native, these elements are implemented differently, and often with platform-specific variations.

## Picker Component

The `Picker` component provides a dropdown selection interface. However, the implementation varies significantly between iOS and Android.

> Note: As of React Native 0.63, the `Picker` component was moved to a separate package. You'll need to install `@react-native-picker/picker`.

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type MedicationForm = 'tablet' | 'capsule' | 'liquid' | 'injection' | 'topical' | 'inhaler';

const MedicationFormPicker: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<MedicationForm>('tablet');
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Medication Form</Text>
      <View style={styles.pickerContainer}>
        <Picker<MedicationForm>
          selectedValue={selectedForm}
          onValueChange={(itemValue) => setSelectedForm(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tablet" value="tablet" />
          <Picker.Item label="Capsule" value="capsule" />
          <Picker.Item label="Liquid" value="liquid" />
          <Picker.Item label="Injection" value="injection" />
          <Picker.Item label="Topical" value="topical" />
          <Picker.Item label="Inhaler" value="inhaler" />
        </Picker>
      </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
```

### Platform Differences

The `Picker` component behaves differently on iOS and Android:

- **iOS**: Displays a wheel-style picker that slides up from the bottom of the screen when tapped
- **Android**: Shows a dropdown menu similar to the web `<select>` element

### Customizing the Picker Appearance

The basic `Picker` can be styled, but for more customized UI, you might need to create platform-specific implementations:

```tsx
import { Platform, StyleSheet } from 'react-native';

// Platform-specific styling
const pickerStyles = StyleSheet.create({
  container: Platform.select({
    ios: {
      // iOS-specific styling
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    android: {
      // Android-specific styling
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  }),
});
```

## Switch Component

The `Switch` component provides a toggle switch interface, similar to `<input type="checkbox">` but with a different visual representation.

```tsx
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface PrescriptionRefillProps {
  initialValue?: boolean;
  onValueChange?: (value: boolean) => void;
}

const PrescriptionRefill: React.FC<PrescriptionRefillProps> = ({ 
  initialValue = false, 
  onValueChange 
}) => {
  const [isAutoRefill, setIsAutoRefill] = useState<boolean>(initialValue);
  
  const handleValueChange = (value: boolean): void => {
    setIsAutoRefill(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Auto-Refill Prescription</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isAutoRefill ? "#1E90FF" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleValueChange}
        value={isAutoRefill}
      />
      <Text style={styles.description}>
        {isAutoRefill ? 'Auto-refill enabled' : 'Auto-refill disabled'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  description: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});
```

## Radio Buttons

React Native doesn't have a built-in radio button component. You'll need to create your own or use a community package like `react-native-radio-buttons` or implement a custom solution:

```tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface RadioOptionProps {
  label: string;
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ 
  label, 
  value, 
  selectedValue, 
  onSelect 
}) => {
  const isSelected = value === selectedValue;
  
  return (
    <Pressable 
      style={styles.optionContainer} 
      onPress={() => onSelect(value)}
    >
      <View style={[styles.outerCircle, isSelected && styles.selectedOuterCircle]}>
        {isSelected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
  );
};

type FrequencyOption = 'daily' | 'twice_daily' | 'thrice_daily' | 'four_daily' | 'as_needed';

const MedicationFrequency: React.FC = () => {
  const [frequency, setFrequency] = useState<FrequencyOption>('daily');
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Medication Frequency</Text>
      
      <RadioOption 
        label="Once daily" 
        value="daily" 
        selectedValue={frequency} 
        onSelect={(value) => setFrequency(value as FrequencyOption)} 
      />
      
      <RadioOption 
        label="Twice daily" 
        value="twice_daily" 
        selectedValue={frequency} 
        onSelect={(value) => setFrequency(value as FrequencyOption)} 
      />
      
      <RadioOption 
        label="Three times daily" 
        value="thrice_daily" 
        selectedValue={frequency} 
        onSelect={(value) => setFrequency(value as FrequencyOption)} 
      />
      
      <RadioOption 
        label="Four times daily" 
        value="four_daily" 
        selectedValue={frequency} 
        onSelect={(value) => setFrequency(value as FrequencyOption)} 
      />
      
      <RadioOption 
        label="As needed" 
        value="as_needed" 
        selectedValue={frequency} 
        onSelect={(value) => setFrequency(value as FrequencyOption)} 
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuterCircle: {
    borderColor: '#007AFF',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
});
```

## Checkbox Components

Like radio buttons, React Native doesn't provide a built-in checkbox component. You can create a custom checkbox:

```tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // If using Expo

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
  return (
    <Pressable 
      style={styles.checkboxContainer} 
      onPress={() => onChange(!value)}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <MaterialIcons name="check" size={16} color="white" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
};

interface AllergyState {
  penicillin: boolean;
  sulfa: boolean;
  nsaids: boolean;
  latex: boolean;
  nuts: boolean;
}

const AllergyForm: React.FC = () => {
  const [allergies, setAllergies] = useState<AllergyState>({
    penicillin: false,
    sulfa: false,
    nsaids: false,
    latex: false,
    nuts: false,
  });
  
  const toggleAllergy = (key: keyof AllergyState): void => {
    setAllergies({
      ...allergies,
      [key]: !allergies[key],
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Known Allergies</Text>
      
      <Checkbox 
        label="Penicillin" 
        value={allergies.penicillin} 
        onChange={() => toggleAllergy('penicillin')} 
      />
      
      <Checkbox 
        label="Sulfa Drugs" 
        value={allergies.sulfa} 
        onChange={() => toggleAllergy('sulfa')} 
      />
      
      <Checkbox 
        label="NSAIDs (Aspirin, Ibuprofen)" 
        value={allergies.nsaids} 
        onChange={() => toggleAllergy('nsaids')} 
      />
      
      <Checkbox 
        label="Latex" 
        value={allergies.latex} 
        onChange={() => toggleAllergy('latex')} 
      />
      
      <Checkbox 
        label="Nuts" 
        value={allergies.nuts} 
        onChange={() => toggleAllergy('nuts')} 
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
});
```

## DateTimePicker

For date and time selection, you can use the `@react-native-community/datetimepicker` package:

```tsx
import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface PrescriptionDatePickerProps {
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
}

const PrescriptionDatePicker: React.FC<PrescriptionDatePickerProps> = ({
  onDateChange,
  initialDate
}) => {
  const [date, setDate] = useState<Date>(initialDate || new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  
  const onChange = (event: any, selectedDate?: Date): void => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    
    if (onDateChange && selectedDate) {
      onDateChange(selectedDate);
    }
  };
  
  const showDatepicker = (): void => {
    setShowPicker(true);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prescription Date</Text>
      
      <Text style={styles.dateText}>
        {date.toLocaleDateString()}
      </Text>
      
      <Button onPress={showDatepicker} title="Select Date" />
      
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
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
  dateText: {
    fontSize: 16,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
```

## Accessibility Considerations

When working with selection components, ensure they're accessible:

```tsx
// Picker with accessibility
<Picker
  accessibilityLabel="Select medication form"
  accessibilityHint="Opens a dropdown to select the form of medication"
  // Other props
/>

// Custom radio button with accessibility
<Pressable 
  accessibilityRole="radio"
  accessibilityState={{ checked: isSelected }}
  accessibilityLabel={`${label}, ${isSelected ? 'selected' : 'not selected'}`}
  onPress={() => onSelect(value)}
>
  {/* Radio button content */}
</Pressable>

// Custom checkbox with accessibility
<Pressable 
  accessibilityRole="checkbox"
  accessibilityState={{ checked: value }}
  accessibilityLabel={`${label}, ${value ? 'checked' : 'not checked'}`}
  onPress={() => onChange(!value)}
>
  {/* Checkbox content */}
</Pressable>
```

## Exercise: Medication Schedule Form

Create a medication schedule form that includes the following selection components:

1. A picker for selecting medication (dropdown with various medications)
2. Radio buttons for selecting the time of day (Morning, Afternoon, Evening, Bedtime)
3. Checkboxes for selecting days of the week (Monday through Sunday)
4. A switch for toggling reminder notifications
5. A date picker for selecting start date

Use the following code as a starting point:

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// Import any additional components you need

// Define your interfaces
interface MedicationScheduleFormProps {
  // Add any props needed
}

// Create types for your state
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'bedtime';
type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const MedicationScheduleForm: React.FC<MedicationScheduleFormProps> = () => {
  // Implement your state and handlers here
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Medication Schedule</Text>
      
      {/* Implement your selection components here */}
      
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
  // Add additional styles here
});

export default MedicationScheduleForm;
```

## Additional Resources

- [Picker Documentation](https://github.com/react-native-picker/picker)
- [Switch Documentation](https://reactnative.dev/docs/switch)
- [DateTimePicker Documentation](https://github.com/react-native-datetimepicker/datetimepicker)
- [React Native Elements UI Library](https://reactnativeelements.com/) - Provides pre-built selection components
- [React Native Paper](https://callstack.github.io/react-native-paper/) - Material Design components for React Native 
- [TypeScript React Native Cheatsheet](https://github.com/typescript-cheatsheets/react) - Helpful TypeScript patterns for React Native 