# Section 4: Advanced UI Components

## Learning Objectives
After completing this section, you will be able to:
- Implement advanced UI components for lists, forms, and navigation
- Customize and style complex interactive components
- Create reusable UI component libraries for consistent design
- Choose the appropriate component for different UI requirements
- Implement platform-specific component variations

**Prerequisite Knowledge**: React Native Core Components (Section 1), Layout with Flexbox (Section 3)
**Estimated Time**: 1.5-2 hours

## Introduction to Advanced UI Components

While React Native provides essential core components, building modern mobile applications often requires more sophisticated UI elements. In this section, we'll explore advanced components for handling common UI patterns, such as complex lists, form inputs, and interactive elements.

### List Components

#### FlatList

The `FlatList` component is optimized for rendering large lists efficiently. Unlike `ScrollView`, it only renders items that are currently visible on the screen.

```jsx
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MedicationList = () => {
  const medications = [
    { id: '1', name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily' },
    { id: '2', name: 'Metformin', dosage: '500mg', schedule: 'Twice daily' },
    { id: '3', name: 'Atorvastatin', dosage: '20mg', schedule: 'Once daily' },
    // More medications...
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.medicationName}>{item.name}</Text>
      <Text style={styles.medicationDetails}>{item.dosage} - {item.schedule}</Text>
    </View>
  );

  return (
    <FlatList
      data={medications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
  },
});
```

Key properties of `FlatList`:
- `data`: The array of items to display
- `renderItem`: Function that returns components for each item
- `keyExtractor`: Function to extract a unique key for each item
- `contentContainerStyle`: Style for the content container
- `ItemSeparatorComponent`: Component to render between items
- `ListHeaderComponent` and `ListFooterComponent`: Components for header and footer
- `onEndReached`: Called when scrolled to the end (useful for pagination)

> 💡 **Deep Dive**: FlatList uses a technique called "windowing" to only render items that are currently visible or about to become visible. This significantly improves performance for long lists.

#### SectionList

The `SectionList` component is similar to `FlatList` but allows you to render data in sections with headers.

```jsx
import React from 'react';
import { SectionList, View, Text, StyleSheet } from 'react-native';

const MedicationsByCategory = () => {
  const DATA = [
    {
      title: 'Heart Medications',
      data: [
        { id: '1', name: 'Lisinopril', dosage: '10mg' },
        { id: '2', name: 'Metoprolol', dosage: '25mg' },
      ],
    },
    {
      title: 'Diabetic Medications',
      data: [
        { id: '3', name: 'Metformin', dosage: '500mg' },
        { id: '4', name: 'Glipizide', dosage: '5mg' },
      ],
    },
    {
      title: 'Cholesterol Medications',
      data: [
        { id: '5', name: 'Atorvastatin', dosage: '20mg' },
        { id: '6', name: 'Rosuvastatin', dosage: '10mg' },
      ],
    },
  ];

  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationDosage}>{item.dosage}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '500',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

### Form Components

#### TextInput with Validation

Building on the basic `TextInput`, here's an enhanced version with validation:

```jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const ValidatedInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  validator, 
  errorMessage,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  const [touched, setTouched] = useState(false);
  const isValid = !validator || validator(value);
  const showError = touched && !isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          showError && styles.inputError
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => setTouched(true)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {showError && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

// Example usage
const MedicationDosageForm = () => {
  const [dosage, setDosage] = useState('');
  
  const validateDosage = (value) => {
    // Simple validation: must be a number followed by units (mg, ml, etc.)
    return /^\d+(\.\d+)?\s*(mg|ml|g|mcg)$/i.test(value);
  };
  
  return (
    <ValidatedInput
      label="Dosage"
      placeholder="e.g. 10mg"
      value={dosage}
      onChangeText={setDosage}
      validator={validateDosage}
      errorMessage="Please enter a valid dosage (e.g. 10mg, 5ml)"
      keyboardType="default"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginTop: 4,
  },
});
```

#### Custom Picker

Creating a custom picker component with enhanced styling:

```jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Requires expo or appropriate icon library

const CustomPicker = ({ 
  label, 
  value, 
  onValueChange, 
  items, 
  placeholder = 'Select an option',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder;
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={[
          styles.pickerText, 
          !selectedItem && styles.placeholderText
        ]}>
          {displayText}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>{label}</Text>
            
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === value && styles.selectedOption
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons name="checkmark" size={20} color="#2196F3" />
                  )}
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.optionsList}
            />
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Example usage
const FrequencyPicker = () => {
  const [frequency, setFrequency] = useState(null);
  
  const frequencyOptions = [
    { label: 'Once daily', value: 'daily' },
    { label: 'Twice daily', value: 'twice_daily' },
    { label: 'Three times daily', value: 'thrice_daily' },
    { label: 'Every other day', value: 'alternate_days' },
    { label: 'Weekly', value: 'weekly' },
  ];
  
  return (
    <CustomPicker
      label="Frequency"
      value={frequency}
      onValueChange={setFrequency}
      items={frequencyOptions}
      placeholder="Select frequency"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  optionsList: {
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: '500',
  },
});
```

### Interactive Components

#### Custom Checkbox

A custom checkbox component with better styling than the default:

```jsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Requires expo or appropriate icon library

const CustomCheckbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.disabledContainer
      ]}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
    >
      <View style={[
        styles.checkbox,
        checked && styles.checked,
        disabled && styles.disabledCheckbox
      ]}>
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text style={[
        styles.label,
        disabled && styles.disabledLabel
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Example usage
const MedicationReminders = () => {
  const [reminders, setReminders] = useState({
    morning: true,
    afternoon: false,
    evening: true,
    bedtime: false,
  });
  
  const toggleReminder = (time) => {
    setReminders(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };
  
  return (
    <View style={styles.reminderSection}>
      <Text style={styles.sectionTitle}>Medication Reminders</Text>
      
      <CustomCheckbox
        label="Morning (8:00 AM)"
        checked={reminders.morning}
        onChange={() => toggleReminder('morning')}
      />
      
      <CustomCheckbox
        label="Afternoon (1:00 PM)"
        checked={reminders.afternoon}
        onChange={() => toggleReminder('afternoon')}
      />
      
      <CustomCheckbox
        label="Evening (6:00 PM)"
        checked={reminders.evening}
        onChange={() => toggleReminder('evening')}
      />
      
      <CustomCheckbox
        label="Bedtime (10:00 PM)"
        checked={reminders.bedtime}
        onChange={() => toggleReminder('bedtime')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#2196F3',
  },
  disabledCheckbox: {
    borderColor: '#bbb',
    backgroundColor: checked ? '#bbb' : 'transparent',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  disabledLabel: {
    color: '#999',
  },
  reminderSection: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

#### Custom Switch

A custom switch component with enhanced styling:

```jsx
import React from 'react';
import { TouchableOpacity, View, Text, Animated, StyleSheet } from 'react-native';

const CustomSwitch = ({ 
  value, 
  onValueChange, 
  label,
  disabled = false,
  activeColor = '#4CAF50',
  inactiveColor = '#f5f5f5'
}) => {
  // Animation value for the position of the thumb
  const thumbPosition = React.useRef(new Animated.Value(value ? 28 : 2)).current;
  
  // Animation function
  const toggleSwitch = () => {
    if (disabled) return;
    
    Animated.timing(thumbPosition, {
      toValue: value ? 2 : 28,
      duration: 250,
      useNativeDriver: true,
    }).start();
    
    onValueChange(!value);
  };
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleSwitch}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.label,
        disabled && styles.disabledLabel
      ]}>
        {label}
      </Text>
      
      <View style={[
        styles.track,
        { backgroundColor: value ? activeColor : inactiveColor },
        disabled && styles.disabledTrack
      ]}>
        <Animated.View
          style={[
            styles.thumb,
            disabled && styles.disabledThumb,
            { transform: [{ translateX: thumbPosition }] }
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

// Example usage
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: false,
    smsReminders: true,
  });
  
  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  return (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      
      <CustomSwitch
        label="Push Notifications"
        value={settings.pushNotifications}
        onValueChange={() => toggleSetting('pushNotifications')}
      />
      
      <CustomSwitch
        label="Email Alerts"
        value={settings.emailAlerts}
        onValueChange={() => toggleSetting('emailAlerts')}
      />
      
      <CustomSwitch
        label="SMS Reminders"
        value={settings.smsReminders}
        onValueChange={() => toggleSetting('smsReminders')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  disabledLabel: {
    color: '#999',
  },
  track: {
    width: 50,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  disabledTrack: {
    opacity: 0.5,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledThumb: {
    backgroundColor: '#e0e0e0',
  },
  settingsSection: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

### Card Components

#### Information Card

A versatile card component for displaying structured information:

```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Requires expo or appropriate icon library

const InfoCard = ({ 
  title, 
  subtitle, 
  content, 
  icon,
  iconColor = '#2196F3',
  action,
  actionLabel,
  onPress,
  style
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
            <Ionicons name={icon} size={24} color={iconColor} />
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <View style={styles.cardContent}>
        {typeof content === 'string' ? (
          <Text style={styles.contentText}>{content}</Text>
        ) : (
          content
        )}
      </View>
      
      {action && (
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={16} color="#2196F3" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Example usage
const MedicationInfo = () => {
  return (
    <InfoCard
      title="Lisinopril"
      subtitle="10mg - Once daily"
      icon="heart"
      iconColor="#F44336"
      content="Used to treat high blood pressure and heart failure. Helps protect your kidneys if you have diabetes."
      action
      actionLabel="View Details"
      onPress={() => console.log('View medication details')}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardContent: {
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
    marginRight: 4,
  },
});
```

### Creating a Component Library

As your application grows, it's beneficial to create a component library for consistent UI across your app:

```jsx
// theme.js - Define your theme constants
export const colors = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  accent: '#FF9800',
  error: '#F44336',
  warning: '#FFEB3B',
  info: '#2196F3',
  success: '#4CAF50',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
    hint: '#9E9E9E',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
  },
  divider: '#EEEEEE',
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    small: 14,
    medium: 16,
    large: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  lineHeight: {
    xs: 16,
    small: 20,
    medium: 24,
    large: 28,
    xl: 30,
    xxl: 36,
  },
};

export const spacing = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xl: 16,
  round: 9999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 4,
  },
};
```

Using your theme in components:

```jsx
// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const Button = ({
  title,
  onPress,
  variant = 'contained', // 'contained', 'outlined', 'text'
  color = 'primary', // 'primary', 'secondary', 'error', etc.
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button, styles[size]];
    
    if (variant === 'contained') {
      buttonStyle.push({
        backgroundColor: colors[color],
      });
    } else if (variant === 'outlined') {
      buttonStyle.push({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors[color],
      });
    }
    
    if (fullWidth) {
      buttonStyle.push(styles.fullWidth);
    }
    
    if (disabled) {
      buttonStyle.push(styles.disabled);
    }
    
    if (style) {
      buttonStyle.push(style);
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleArray = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'contained') {
      textStyleArray.push({ color: 'white' });
    } else {
      textStyleArray.push({ color: colors[color] });
    }
    
    if (disabled) {
      textStyleArray.push(styles.disabledText);
    }
    
    if (textStyle) {
      textStyleArray.push(textStyle);
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'contained' ? 'white' : colors[color]} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.medium,
    minWidth: 80,
  },
  medium: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    minWidth: 100,
  },
  large: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.xl,
    minWidth: 130,
  },
  smallText: {
    fontSize: typography.fontSize.small,
  },
  mediumText: {
    fontSize: typography.fontSize.medium,
  },
  largeText: {
    fontSize: typography.fontSize.large,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.disabled,
  },
});

export default Button;
```

Using your custom components:

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';

const MedicationActions = () => {
  return (
    <View style={styles.container}>
      <Button
        title="View Details"
        onPress={() => console.log('View details')}
        variant="outlined"
        color="primary"
        size="medium"
      />
      
      <Button
        title="Refill Prescription"
        onPress={() => console.log('Refill')}
        variant="contained"
        color="secondary"
        size="medium"
      />
      
      <Button
        title="Cancel"
        onPress={() => console.log('Cancel')}
        variant="text"
        color="error"
        size="medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});
```

## Best Practices for UI Components

1. **Create Consistent Theme**: Define color palettes, typography, spacing, and border radius constants
2. **Build Reusable Components**: Create a library of reusable components with clear props API
3. **Separate Logic from Presentation**: Use container/presenter pattern or custom hooks for complex components
4. **Accessibility**: Make all components accessible with appropriate props
5. **Performance**: Optimize render performance with memoization and virtualized lists
6. **Platform Adaptation**: Provide platform-specific variants when appropriate
7. **Documentation**: Document component usage, props, and examples

## Summary

Advanced UI components are essential for creating polished and performant React Native applications. By building reusable components that follow design best practices, you can create a consistent user experience while speeding up development. The components demonstrated in this section provide a foundation for building complex interfaces that are both functional and visually appealing.

In the next section, we'll focus on responsive design techniques to ensure your application works well across different device sizes and orientations.

## Further Reading

- [FlatList Documentation](https://reactnative.dev/docs/flatlist)
- [SectionList Documentation](https://reactnative.dev/docs/sectionlist)
- [React Native Elements](https://reactnativeelements.com/) - A popular UI library
- [React Native Paper](https://callstack.github.io/react-native-paper/) - Material Design components 