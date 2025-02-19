/**
 * @module components/styled/form
 * @description Shared styled form components for consistent form styling
 */

import styled from 'styled-components/native';
import { TextInput, Switch } from 'react-native-paper';
import type { DefaultTheme } from 'styled-components/native';

interface StyledFormProps {
  theme: DefaultTheme;
  error?: boolean;
  fullWidth?: boolean;
}

/**
 * @component FormContainer
 * @description Container for form elements with consistent spacing
 */
export const FormContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * @component FormGroup
 * @description Group of related form elements
 */
export const FormGroup = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * @component FormLabel
 * @description Label for form inputs
 */
export const FormLabel = styled.Text<StyledFormProps>`
  font-size: ${({ theme }) => theme.typography.sizes.small}px;
  color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * @component FormInput
 * @description Styled text input for forms
 */
export const FormInput = styled(TextInput).attrs(({ theme }) => ({
  mode: 'outlined',
  outlineColor: theme.colors.outline,
  activeOutlineColor: theme.colors.primary,
}))<StyledFormProps>`
  background-color: ${({ theme }) => theme.colors.background};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * @component FormError
 * @description Error message for form inputs
 */
export const FormError = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.small}px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * @component FormSwitch
 * @description Styled switch for forms
 */
export const FormSwitch = styled(Switch).attrs(({ theme }) => ({
  color: theme.colors.primary,
}))`
  margin-vertical: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * @component FormRow
 * @description Horizontal row for form elements
 */
export const FormRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * @component FormDivider
 * @description Visual separator for form sections
 */
export const FormDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline};
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
`; 