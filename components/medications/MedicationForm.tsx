/**
 * @module components/medications/MedicationForm
 * @description A form component for adding and editing medication information
 */

import React, { memo, useCallback, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { TextInput, HelperText } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { ThemedText } from '../ThemedText';
import { Card, FlexRow } from '../styled/containers';
import { MedicationStatus, MEDICATION_STATUS } from './MedicationStatusBadge';

/**
 * Props for the MedicationForm component
 * @interface MedicationFormProps
 */
export interface MedicationFormProps {
  /** Initial medication data */
  initialData?: MedicationFormData;
  /** Whether the form is in edit mode */
  isEdit?: boolean;
  /** Whether the form is submitting */
  isSubmitting?: boolean;
  /** Callback when form is submitted */
  onSubmit: (data: MedicationFormData) => Promise<void>;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional test ID for testing */
  testID?: string;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Form data interface
 * @interface MedicationFormData
 */
export interface MedicationFormData {
  /** Medication name */
  name: string;
  /** Medication dosage */
  dosage: string;
  /** Medication frequency */
  frequency: string;
  /** Days supply */
  daysSupply: string;
  /** Next refill date */
  nextRefillDate: string;
  /** Medication status */
  status: MedicationStatus;
  /** Additional notes */
  notes?: string;
}

/**
 * Default form values
 */
const DEFAULT_FORM_DATA: MedicationFormData = {
  name: '',
  dosage: '',
  frequency: '',
  daysSupply: '',
  nextRefillDate: '',
  status: MEDICATION_STATUS.ACTIVE,
  notes: '',
};

/**
 * Styled form container
 */
const FormContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * Styled input container
 */
const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * Styled button container
 */
const ButtonContainer = styled(FlexRow)`
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

/**
 * Validates form data
 */
function validateForm(data: MedicationFormData): Record<keyof MedicationFormData, string> {
  const errors: Partial<Record<keyof MedicationFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.dosage.trim()) {
    errors.dosage = 'Dosage is required';
  }

  if (!data.frequency.trim()) {
    errors.frequency = 'Frequency is required';
  }

  if (!data.daysSupply.trim()) {
    errors.daysSupply = 'Days supply is required';
  } else if (isNaN(Number(data.daysSupply)) || Number(data.daysSupply) <= 0) {
    errors.daysSupply = 'Days supply must be a positive number';
  }

  if (!data.nextRefillDate.trim()) {
    errors.nextRefillDate = 'Next refill date is required';
  } else {
    const date = new Date(data.nextRefillDate);
    if (isNaN(date.getTime())) {
      errors.nextRefillDate = 'Invalid date format';
    }
  }

  return errors as Record<keyof MedicationFormData, string>;
}

/**
 * A form component for adding and editing medication information. It includes
 * validation, error handling, and proper accessibility support.
 * 
 * @component
 * @param {MedicationFormProps} props - The component props
 * @returns {JSX.Element} A medication form component
 * 
 * @example
 * ```tsx
 * function AddMedication() {
 *   const handleSubmit = useCallback(async (data: MedicationFormData) => {
 *     try {
 *       await createMedication(data);
 *       navigation.goBack();
 *     } catch (error) {
 *       console.error('Failed to create medication:', error);
 *     }
 *   }, [navigation]);
 * 
 *   return (
 *     <MedicationForm
 *       onSubmit={handleSubmit}
 *       onError={error => console.error(error)}
 *     />
 *   );
 * }
 * 
 * @example
 * // Edit mode
 * function EditMedication({ medication }) {
 *   const handleSubmit = useCallback(async (data: MedicationFormData) => {
 *     try {
 *       await updateMedication(medication.id, data);
 *       navigation.goBack();
 *     } catch (error) {
 *       console.error('Failed to update medication:', error);
 *     }
 *   }, [medication, navigation]);
 * 
 *   return (
 *     <MedicationForm
 *       initialData={medication}
 *       isEdit
 *       onSubmit={handleSubmit}
 *       onError={error => console.error(error)}
 *     />
 *   );
 * }
 * ```
 */
export const MedicationForm = memo(function MedicationForm({
  initialData = DEFAULT_FORM_DATA,
  isEdit = false,
  isSubmitting = false,
  onSubmit,
  style,
  testID,
  onError,
}: MedicationFormProps): JSX.Element {
  const theme = useTheme();
  const [formData, setFormData] = useState<MedicationFormData>(initialData);
  const [errors, setErrors] = useState<Record<keyof MedicationFormData, string>>({} as Record<keyof MedicationFormData, string>);
  const [touched, setTouched] = useState<Record<keyof MedicationFormData, boolean>>({} as Record<keyof MedicationFormData, boolean>);

  const handleChange = useCallback((field: keyof MedicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const validationErrors = validateForm(formData);
      const hasErrors = Object.values(validationErrors).some(Boolean);

      if (hasErrors) {
        setErrors(validationErrors);
        setTouched(Object.keys(formData).reduce((acc, key) => ({
          ...acc,
          [key]: true,
        }), {} as Record<keyof MedicationFormData, boolean>));
        return;
      }

      await onSubmit(formData);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to submit form'));
    }
  }, [formData, onSubmit, onError]);

  return (
    <FormContainer
      style={style}
      testID={testID || 'medication-form'}
    >
      <ThemedText type="title">
        {isEdit ? 'Edit Medication' : 'Add Medication'}
      </ThemedText>

      <InputContainer>
        <TextInput
          label="Medication Name"
          value={formData.name}
          onChangeText={value => handleChange('name', value)}
          error={touched.name && !!errors.name}
          disabled={isSubmitting}
          testID="medication-name-input"
          accessibilityLabel="Medication name"
          accessibilityHint="Enter the name of the medication"
        />
        <HelperText type="error" visible={touched.name && !!errors.name}>
          {errors.name}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Dosage"
          value={formData.dosage}
          onChangeText={value => handleChange('dosage', value)}
          error={touched.dosage && !!errors.dosage}
          disabled={isSubmitting}
          testID="medication-dosage-input"
          accessibilityLabel="Medication dosage"
          accessibilityHint="Enter the dosage of the medication"
        />
        <HelperText type="error" visible={touched.dosage && !!errors.dosage}>
          {errors.dosage}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Frequency"
          value={formData.frequency}
          onChangeText={value => handleChange('frequency', value)}
          error={touched.frequency && !!errors.frequency}
          disabled={isSubmitting}
          testID="medication-frequency-input"
          accessibilityLabel="Medication frequency"
          accessibilityHint="Enter how often to take the medication"
        />
        <HelperText type="error" visible={touched.frequency && !!errors.frequency}>
          {errors.frequency}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Days Supply"
          value={formData.daysSupply}
          onChangeText={value => handleChange('daysSupply', value)}
          error={touched.daysSupply && !!errors.daysSupply}
          disabled={isSubmitting}
          keyboardType="numeric"
          testID="medication-supply-input"
          accessibilityLabel="Days supply"
          accessibilityHint="Enter the number of days the supply will last"
        />
        <HelperText type="error" visible={touched.daysSupply && !!errors.daysSupply}>
          {errors.daysSupply}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Next Refill Date"
          value={formData.nextRefillDate}
          onChangeText={value => handleChange('nextRefillDate', value)}
          error={touched.nextRefillDate && !!errors.nextRefillDate}
          disabled={isSubmitting}
          placeholder="YYYY-MM-DD"
          testID="medication-refill-date-input"
          accessibilityLabel="Next refill date"
          accessibilityHint="Enter the date of the next refill"
        />
        <HelperText type="error" visible={touched.nextRefillDate && !!errors.nextRefillDate}>
          {errors.nextRefillDate}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Notes (Optional)"
          value={formData.notes}
          onChangeText={value => handleChange('notes', value)}
          disabled={isSubmitting}
          multiline
          numberOfLines={3}
          testID="medication-notes-input"
          accessibilityLabel="Notes"
          accessibilityHint="Enter any additional notes about the medication"
        />
      </InputContainer>

      <ButtonContainer>
        <ThemedText
          type="link"
          color={theme.colors.error}
          onPress={() => {
            setFormData(DEFAULT_FORM_DATA);
            setErrors({} as Record<keyof MedicationFormData, string>);
            setTouched({} as Record<keyof MedicationFormData, boolean>);
          }}
          accessibilityRole="button"
          accessibilityHint="Double tap to reset form"
          disabled={isSubmitting}
        >
          Reset
        </ThemedText>
        <ThemedText
          type="link"
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityHint={`Double tap to ${isEdit ? 'update' : 'add'} medication`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Add'}
        </ThemedText>
      </ButtonContainer>
    </FormContainer>
  );
}); 