/**
 * @fileoverview Medication Schedule Form Exercise - Complete Solution
 * @author React Native Training Course
 * @created 2023-07-15
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Platform,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Available medications for selection
 */
const MEDICATIONS = [
  { label: 'Select a medication', value: '' },
  { label: 'Aspirin 81mg', value: 'aspirin-81' },
  { label: 'Lisinopril 10mg', value: 'lisinopril-10' },
  { label: 'Atorvastatin 20mg', value: 'atorvastatin-20' },
  { label: 'Metformin 500mg', value: 'metformin-500' },
  { label: 'Levothyroxine 50mcg', value: 'levothyroxine-50' },
  { label: 'Amlodipine 5mg', value: 'amlodipine-5' },
  { label: 'Omeprazole 20mg', value: 'omeprazole-20' },
  { label: 'Albuterol Inhaler', value: 'albuterol-inhaler' },
];

/**
 * Type definitions for form data and selections
 */
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'bedtime';
type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Interface for medication schedule form data
 */
interface MedicationScheduleData {
  medication: string;
  timeOfDay: TimeOfDay;
  daysOfWeek: Record<WeekDay, boolean>;
  enableReminders: boolean;
  startDate: Date;
}

/**
 * Interface for form validation errors
 */
interface FormErrors {
  medication?: string;
  timeOfDay?: string;
  daysOfWeek?: string;
  startDate?: string;
}

/**
 * RadioButton component props
 */
interface RadioButtonProps {
  label: string;
  value: TimeOfDay;
  selected: boolean;
  onSelect: (value: TimeOfDay) => void;
}

/**
 * Checkbox component props
 */
interface CheckboxProps {
  label: string;
  value: WeekDay;
  checked: boolean;
  onToggle: (value: WeekDay) => void;
}

/**
 * MedicationScheduleForm Component
 * 
 * This component displays a form for scheduling medication, demonstrating
 * various selection components in React Native.
 * 
 * @returns {JSX.Element} A form for scheduling medication
 */
const MedicationScheduleForm: React.FC = () => {
  // Initialize form state
  const [formData, setFormData] = useState<MedicationScheduleData>({
    medication: '',
    timeOfDay: 'morning',
    daysOfWeek: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    enableReminders: false,
    startDate: new Date(),
  });

  // State for error messages
  const [errors, setErrors] = useState<FormErrors>({});
  
  // State for date picker visibility (needed for Android)
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * Handle medication selection
   * @param value The selected medication value
   */
  const handleMedicationChange = (value: string) => {
    setFormData(prev => ({ ...prev, medication: value }));
    // Clear error when user makes a selection
    if (errors.medication) {
      setErrors(prev => ({ ...prev, medication: undefined }));
    }
  };

  /**
   * Handle time of day selection
   * @param value The selected time of day
   */
  const handleTimeOfDaySelect = (value: TimeOfDay) => {
    setFormData(prev => ({ ...prev, timeOfDay: value }));
    // Clear error when user makes a selection
    if (errors.timeOfDay) {
      setErrors(prev => ({ ...prev, timeOfDay: undefined }));
    }
  };

  /**
   * Handle day of week toggle
   * @param day The day of week to toggle
   */
  const handleDayToggle = (day: WeekDay) => {
    setFormData(prev => ({
      ...prev,
      daysOfWeek: {
        ...prev.daysOfWeek,
        [day]: !prev.daysOfWeek[day],
      },
    }));
    // Clear error when user makes a selection
    if (errors.daysOfWeek) {
      setErrors(prev => ({ ...prev, daysOfWeek: undefined }));
    }
  };

  /**
   * Handle reminder toggle
   * @param value The new value for enableReminders
   */
  const handleReminderToggle = (value: boolean) => {
    setFormData(prev => ({ ...prev, enableReminders: value }));
  };

  /**
   * Handle date selection
   * @param event The event object
   * @param selectedDate The selected date
   */
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate) {
      setFormData(prev => ({ ...prev, startDate: selectedDate }));
      // Clear error when user makes a selection
      if (errors.startDate) {
        setErrors(prev => ({ ...prev, startDate: undefined }));
      }
    }
  };

  /**
   * Show the date picker (Android)
   */
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  /**
   * Validate the form
   * @returns True if the form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate medication
    if (!formData.medication) {
      newErrors.medication = 'Please select a medication';
      isValid = false;
    }

    // Validate days of week
    const anyDaySelected = Object.values(formData.daysOfWeek).some(day => day);
    if (!anyDaySelected) {
      newErrors.daysOfWeek = 'Please select at least one day';
      isValid = false;
    }

    // Validate start date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Clone the date and set hours to 0 for comparison
    const startDate = new Date(formData.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    if (startDate < today) {
      newErrors.startDate = 'Start date cannot be in the past';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would submit to a server here
      Alert.alert(
        'Schedule Submitted',
        `Your ${findMedicationLabel(formData.medication)} schedule has been set!`,
        [{ text: 'OK' }]
      );
      
      // Reset the form
      setFormData({
        medication: '',
        timeOfDay: 'morning',
        daysOfWeek: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
        enableReminders: false,
        startDate: new Date(),
      });
    }
  };

  /**
   * Find the label for a medication by its value
   * @param value The medication value
   * @returns The medication label or a default message
   */
  const findMedicationLabel = (value: string): string => {
    const medication = MEDICATIONS.find(med => med.value === value);
    return medication ? medication.label : 'selected medication';
  };

  /**
   * Custom RadioButton component for time of day selection
   */
  const RadioButton: React.FC<RadioButtonProps> = ({ 
    label, value, selected, onSelect 
  }) => {
    return (
      <Pressable 
        style={styles.radioOption}
        onPress={() => onSelect(value)}
        accessibilityRole="radio"
        accessibilityState={{ checked: selected }}
        accessibilityLabel={`${label} ${selected ? 'selected' : 'not selected'}`}
      >
        <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
          {selected && <View style={styles.radioInnerCircle} />}
        </View>
        <Text style={styles.radioLabel}>{label}</Text>
      </Pressable>
    );
  };

  /**
   * Custom Checkbox component for day of week selection
   */
  const Checkbox: React.FC<CheckboxProps> = ({ 
    label, value, checked, onToggle 
  }) => {
    return (
      <Pressable 
        style={styles.checkboxOption}
        onPress={() => onToggle(value)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={`${label} ${checked ? 'checked' : 'unchecked'}`}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </Pressable>
    );
  };

  /**
   * Format a date as a string
   * @param date The date to format
   * @returns The formatted date string
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Medication Schedule</Text>
        
        {/* Medication Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Medication</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.medication}
              onValueChange={handleMedicationChange}
              style={styles.picker}
              accessibilityLabel="Select medication"
            >
              {MEDICATIONS.map(med => (
                <Picker.Item 
                  key={med.value} 
                  label={med.label} 
                  value={med.value} 
                />
              ))}
            </Picker>
          </View>
          {errors.medication && (
            <Text style={styles.errorText}>{errors.medication}</Text>
          )}
        </View>
        
        {/* Time of Day Radio Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time of Day</Text>
          <RadioButton 
            label="Morning" 
            value="morning" 
            selected={formData.timeOfDay === 'morning'} 
            onSelect={handleTimeOfDaySelect} 
          />
          <RadioButton 
            label="Afternoon" 
            value="afternoon" 
            selected={formData.timeOfDay === 'afternoon'} 
            onSelect={handleTimeOfDaySelect} 
          />
          <RadioButton 
            label="Evening" 
            value="evening" 
            selected={formData.timeOfDay === 'evening'} 
            onSelect={handleTimeOfDaySelect} 
          />
          <RadioButton 
            label="Bedtime" 
            value="bedtime" 
            selected={formData.timeOfDay === 'bedtime'} 
            onSelect={handleTimeOfDaySelect} 
          />
          {errors.timeOfDay && (
            <Text style={styles.errorText}>{errors.timeOfDay}</Text>
          )}
        </View>
        
        {/* Days of Week Checkboxes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Days of Week</Text>
          <Checkbox 
            label="Monday" 
            value="monday" 
            checked={formData.daysOfWeek.monday} 
            onToggle={handleDayToggle} 
          />
          <Checkbox 
            label="Tuesday" 
            value="tuesday" 
            checked={formData.daysOfWeek.tuesday} 
            onToggle={handleDayToggle} 
          />
          <Checkbox 
            label="Wednesday" 
            value="wednesday" 
            checked={formData.daysOfWeek.wednesday} 
            onToggle={handleDayToggle} 
          />
          <Checkbox 
            label="Thursday" 
            value="thursday" 
            checked={formData.daysOfWeek.thursday} 
            onToggle={handleDayToggle} 
          />
          <Checkbox 
            label="Friday" 
            value="friday" 
            checked={formData.daysOfWeek.friday} 
            onToggle={handleDayToggle} 
          />
          <Checkbox 
            label="Saturday" 
            value="saturday" 
            checked={formData.daysOfWeek.saturday} 
            onToggle={handleDayToggle} 
          />
          <Checkbox 
            label="Sunday" 
            value="sunday" 
            checked={formData.daysOfWeek.sunday} 
            onToggle={handleDayToggle} 
          />
          {errors.daysOfWeek && (
            <Text style={styles.errorText}>{errors.daysOfWeek}</Text>
          )}
        </View>
        
        {/* Reminder Switch */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enable Reminders</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={formData.enableReminders ? "#1E90FF" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleReminderToggle}
              value={formData.enableReminders}
              accessibilityLabel="Enable reminders"
              accessibilityHint="Toggles notification reminders for this medication"
            />
            <Text style={styles.switchLabel}>
              {formData.enableReminders ? 'Reminders are enabled' : 'Reminders are disabled'}
            </Text>
          </View>
        </View>
        
        {/* Start Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start Date</Text>
          <Text style={styles.dateDisplay}>
            {formatDate(formData.startDate)}
          </Text>
          
          {Platform.OS === 'android' ? (
            <Button 
              title="Select Date" 
              onPress={showDatepicker} 
            />
          ) : null}
          
          {(showDatePicker || Platform.OS === 'ios') && (
            <DateTimePicker
              value={formData.startDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
              accessibilityLabel="Select start date"
            />
          )}
          
          {errors.startDate && (
            <Text style={styles.errorText}>{errors.startDate}</Text>
          )}
        </View>
        
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Schedule Medication</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Styles for the MedicationScheduleForm component
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
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#1E90FF',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#1E90FF',
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1E90FF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  dateDisplay: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: 24,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonPressed: {
    backgroundColor: '#0066CC',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <MedicationScheduleForm />;
}

export default App; 