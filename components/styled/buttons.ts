/**
 * @module components/styled/buttons
 * @description Shared styled button components with consistent theming
 */

import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import type { DefaultTheme } from 'styled-components/native';

interface StyledButtonProps {
  theme: DefaultTheme;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * @component BaseButton
 * @description Base styled button with theme integration
 */
export const BaseButton = styled(Button)<StyledButtonProps>`
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme, size = 'medium' }) => 
    size === 'small' ? theme.spacing.xs : 
    size === 'large' ? theme.spacing.md : 
    theme.spacing.sm}px;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`;

/**
 * @component PrimaryButton
 * @description Primary action button with brand colors
 */
export const PrimaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

/**
 * @component SecondaryButton
 * @description Secondary action button with muted styling
 */
export const SecondaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
`;

/**
 * @component OutlineButton
 * @description Outlined button with transparent background
 */
export const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`; 