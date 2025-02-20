/**
 * @module components/medications/MedicationForm
 * @description Form component for adding and editing medications
 */

import React, { useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import styled from 'styled-components/native';
import { FormProvider, useMedicationForm } from '@/contexts/MedicationFormContext';
import { Medication } from '@/hooks/queries/useMedications';
import { CustomTheme } from '@/theme/types';

/**
 * @interface MedicationFormProps
 * @description Props for the MedicationForm component
 */
interface MedicationFormProps {
  /** Initial form data */
  initialData?: Partial<Medication>;
  /** Whether the form is in edit mode */
  isEdit?: boolean;
  /** Whether the form is submitting */
  isSubmitting?: boolean;
  /** Callback when form is submitted */
  onSubmit: (data: Partial<Medication>) => Promise<void>;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional test ID */
  testID?: string;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

const FormContainer = styled.View<{ theme: CustomTheme }>`
  gap: ${({ theme }: { theme: CustomTheme }) => theme.spacing.md}px;
`;

const InputContainer = styled.View<{ theme: CustomTheme }>`
  gap: ${({ theme }: { theme: CustomTheme }) => theme.spacing.xs}px;
`;

/**
 * Form fields component
 */
function FormFields(): JSX.Element {
  const { state, dispatch } = useMedicationForm();

  const handleChange = useCallback((field: keyof Medication) => (value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
    dispatch({ type: 'TOUCH_FIELD', field });
  }, [dispatch]);

  return (
    <FormContainer>
      <InputContainer>
        <TextInput
          label="Medication Name"
          value={state.data.name}
          onChangeText={handleChange('name')}
          error={state.touched.name && !!state.errors.name}
          testID="medication-name-input"
        />
        <HelperText type="error" visible={state.touched.name && !!state.errors.name}>
          {state.errors.name}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Dosage"
          value={state.data.dosage}
          onChangeText={handleChange('dosage')}
          error={state.touched.dosage && !!state.errors.dosage}
          testID="medication-dosage-input"
        />
        <HelperText type="error" visible={state.touched.dosage && !!state.errors.dosage}>
          {state.errors.dosage}
        </HelperText>
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Frequency"
          value={state.data.frequency}
          onChangeText={handleChange('frequency')}
          error={state.touched.frequency && !!state.errors.frequency}
          testID="medication-frequency-input"
        />
        <HelperText type="error" visible={state.touched.frequency && !!state.errors.frequency}>
          {state.errors.frequency}
        </HelperText>
      </InputContainer>
    </FormContainer>
  );
}

/**
 * Form actions component
 */
function FormActions({ onSubmit, isEdit }: Pick<MedicationFormProps, 'onSubmit' | 'isEdit'>): JSX.Element {
  const { state, dispatch } = useMedicationForm();

  const handleSubmit = useCallback(async () => {
    dispatch({ type: 'VALIDATE_FORM' });
    if (Object.keys(state.errors).length === 0) {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
      try {
        await onSubmit(state.data);
        dispatch({ type: 'RESET_FORM' });
      } catch (error) {
        // Handle error
      } finally {
        dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
      }
    }
  }, [state.data, state.errors, dispatch, onSubmit]);

  return (
    <Button
      mode="contained"
      onPress={handleSubmit}
      loading={state.isSubmitting}
      disabled={state.isSubmitting || !state.isDirty}
      testID="medication-form-submit"
    >
      {isEdit ? 'Update Medication' : 'Add Medication'}
    </Button>
  );
}

/**
 * Medication form component for adding and editing medications
 * @param {MedicationFormProps} props - Component props
 * @returns {JSX.Element} A form component
 * 
 * @example
 * ```tsx
 * function AddMedication() {
 *   const handleSubmit = async (data) => {
 *     try {
 *       await createMedication(data);
 *       navigation.goBack();
 *     } catch (error) {
 *       console.error('Failed to create medication:', error);
 *     }
 *   };
 *   
 *   return (
 *     <MedicationForm
 *       onSubmit={handleSubmit}
 *       onError={(error) => console.error(error)}
 *     />
 *   );
 * }
 * ```
 */
export function MedicationForm({
  initialData,
  isEdit = false,
  onSubmit,
  style,
  testID,
}: MedicationFormProps): JSX.Element {
  return (
    <FormProvider initialData={initialData}>
      <FormContainer style={style} testID={testID}>
        <FormFields />
        <FormActions onSubmit={onSubmit} isEdit={isEdit} />
      </FormContainer>
    </FormProvider>
  );
} 