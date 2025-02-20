/**
 * @module contexts/MedicationFormContext
 * @description Context and reducer for medication form state management
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Medication } from '@/hooks/queries/useMedications';

/**
 * @interface FormState
 * @description Interface for form state
 */
export interface FormState {
  /** Form data */
  data: Partial<Medication>;
  /** Form validation errors */
  errors: Partial<Record<keyof Medication, string>>;
  /** Fields that have been touched */
  touched: Partial<Record<keyof Medication, boolean>>;
  /** Whether the form is being submitted */
  isSubmitting: boolean;
  /** Whether the form is dirty (has changes) */
  isDirty: boolean;
}

/**
 * @type FormAction
 * @description Union type for form actions
 */
type FormAction =
  | { type: 'SET_FIELD'; field: keyof Medication; value: any }
  | { type: 'SET_ERROR'; field: keyof Medication; error: string }
  | { type: 'TOUCH_FIELD'; field: keyof Medication }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET_FORM'; data?: Partial<Medication> }
  | { type: 'VALIDATE_FORM' };

/**
 * Initial state for the form
 */
const initialState: FormState = {
  data: {},
  errors: {},
  touched: {},
  isSubmitting: false,
  isDirty: false,
};

/**
 * Form state reducer
 */
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        isDirty: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        data: action.data || {},
      };
    case 'VALIDATE_FORM':
      const errors: Partial<Record<keyof Medication, string>> = {};
      // Add validation logic here
      if (!state.data.name) errors.name = 'Name is required';
      if (!state.data.dosage) errors.dosage = 'Dosage is required';
      if (!state.data.frequency) errors.frequency = 'Frequency is required';
      
      return {
        ...state,
        errors,
      };
    default:
      return state;
  }
}

/**
 * @interface FormContextValue
 * @description Interface for form context value
 */
interface FormContextValue {
  /** Form state */
  state: FormState;
  /** Form dispatch function */
  dispatch: React.Dispatch<FormAction>;
}

/**
 * Form context
 */
const FormContext = createContext<FormContextValue | undefined>(undefined);

/**
 * @interface FormProviderProps
 * @description Props for FormProvider component
 */
interface FormProviderProps {
  /** Initial form data */
  initialData?: Partial<Medication>;
  /** Child components */
  children: ReactNode;
}

/**
 * Form context provider component
 * @param {FormProviderProps} props - Component props
 * @returns {JSX.Element} Provider component
 * 
 * @example
 * ```tsx
 * function MedicationForm() {
 *   return (
 *     <FormProvider initialData={{ name: 'Aspirin' }}>
 *       <FormFields />
 *       <FormActions />
 *     </FormProvider>
 *   );
 * }
 * ```
 */
export function FormProvider({ initialData, children }: FormProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    data: initialData || {},
  });

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

/**
 * Custom hook for accessing form context
 * @returns {FormContextValue} Form context value
 * 
 * @example
 * ```tsx
 * function FormFields() {
 *   const { state, dispatch } = useMedicationForm();
 *   
 *   return (
 *     <TextInput
 *       value={state.data.name}
 *       onChangeText={(value) => 
 *         dispatch({ type: 'SET_FIELD', field: 'name', value })
 *       }
 *       error={state.touched.name && state.errors.name}
 *     />
 *   );
 * }
 * ```
 */
export function useMedicationForm(): FormContextValue {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useMedicationForm must be used within a FormProvider');
  }
  return context;
} 