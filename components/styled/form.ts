/**
 * @module components/styled/form
 * @description Shared styled form components for consistent form styling
 */

import styled from 'styled-components/native';
import { TextInput, Switch } from 'react-native-paper';
import type { CustomTheme } from '@/theme/types';

/**
 * Base props for styled form components
 * @interface StyledFormProps
 */
interface StyledFormProps {
  /** Theme object for styling */
  theme: CustomTheme;
  /** Whether the component has an error */
  error?: boolean;
  /** Whether the component should take full width */
  fullWidth?: boolean;
}

/**
 * @component FormContainer
 * @description Container for form elements with consistent spacing
 */
export const FormContainer = styled.View<StyledFormProps>`
  gap: ${({ theme }: StyledFormProps) => theme.spacing.md}px;
  padding: ${({ theme }: StyledFormProps) => theme.spacing.md}px;
`;

/**
 * @component FormGroup
 * @description Group of related form elements
 */
export const FormGroup = styled.View<StyledFormProps>`
  gap: ${({ theme }: StyledFormProps) => theme.spacing.xs}px;
`;

/**
 * @component FormLabel
 * @description Label for form inputs
 */
export const FormLabel = styled.Text<StyledFormProps>`
  font-size: ${({ theme }: StyledFormProps) => theme.typography.sizes.small}px;
  color: ${({ theme, error }: StyledFormProps) => error ? theme.colors.error : theme.colors.text};
  margin-bottom: ${({ theme }: StyledFormProps) => theme.spacing.xs}px;
`;

/**
 * @component FormInput
 * @description Styled text input for forms
 */
export const FormInput = styled(TextInput).attrs(({ theme }: StyledFormProps) => ({
  mode: 'outlined',
  outlineColor: theme.colors.outline,
  activeOutlineColor: theme.colors.primary,
}))<StyledFormProps>`
  background-color: ${({ theme }: StyledFormProps) => theme.colors.background};
  width: ${({ fullWidth }: StyledFormProps) => fullWidth ? '100%' : 'auto'};
  margin-bottom: ${({ theme }: StyledFormProps) => theme.spacing.xs}px;
`;

/**
 * @component FormError
 * @description Error message for form inputs
 */
export const FormError = styled.Text<StyledFormProps>`
  font-size: ${({ theme }: StyledFormProps) => theme.typography.sizes.small}px;
  color: ${({ theme }: StyledFormProps) => theme.colors.error};
  margin-top: ${({ theme }: StyledFormProps) => theme.spacing.xs}px;
`;

/**
 * @component FormSwitch
 * @description Styled switch for forms
 */
export const FormSwitch = styled(Switch).attrs(({ theme }: StyledFormProps) => ({
  color: theme.colors.primary,
}))<StyledFormProps>`
  margin-vertical: ${({ theme }: StyledFormProps) => theme.spacing.xs}px;
`;

/**
 * @component FormRow
 * @description Horizontal row for form elements
 */
export const FormRow = styled.View<StyledFormProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }: StyledFormProps) => theme.spacing.sm}px;
`;

/**
 * @component FormDivider
 * @description Visual separator for form sections
 */
export const FormDivider = styled.View<StyledFormProps>`
  height: 1px;
  background-color: ${({ theme }: StyledFormProps) => theme.colors.outline};
  margin-vertical: ${({ theme }: StyledFormProps) => theme.spacing.md}px;
`; 