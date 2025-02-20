/**
 * @module components/styled/buttons
 * @description Shared styled button components with consistent theming
 */

import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import type { CustomTheme } from '@/theme/types';

type ButtonSize = 'small' | 'medium' | 'large';

/**
 * @interface StyledButtonProps
 * @description Props for styled button components
 */
interface StyledButtonProps {
  /** Theme object for styling */
  theme: CustomTheme;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Size variant of the button */
  size?: ButtonSize;
}

/**
 * @component BaseButton
 * @description Base styled button with theme integration
 */
export const BaseButton = styled(Button)<StyledButtonProps>`
  border-radius: ${({ theme }: StyledButtonProps) => theme.borderRadius.md}px;
  padding: ${({ theme, size = 'medium' }: StyledButtonProps) => 
    size === 'small' ? theme.spacing.xs : 
    size === 'large' ? theme.spacing.md : 
    theme.spacing.sm}px;
  width: ${({ fullWidth }: StyledButtonProps) => fullWidth ? '100%' : 'auto'};
`;

/**
 * @component PrimaryButton
 * @description Primary action button with brand colors
 */
export const PrimaryButton = styled(BaseButton)`
  background-color: ${({ theme }: StyledButtonProps) => theme.colors.primary};
`;

/**
 * @component SecondaryButton
 * @description Secondary action button with muted styling
 */
export const SecondaryButton = styled(BaseButton)`
  background-color: ${({ theme }: StyledButtonProps) => theme.colors.secondary};
`;

/**
 * @component OutlineButton
 * @description Outlined button with transparent background
 */
export const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  border-width: 1px;
  border-color: ${({ theme }: StyledButtonProps) => theme.colors.primary};
`; 