/**
 * @module components/ThemedButton
 * @description Themed button component with multiple variants
 */

import React from 'react';
import { ButtonProps } from 'react-native-paper';
import { PrimaryButton, SecondaryButton, OutlineButton } from './styled/buttons';
import type { CustomTheme } from '@/theme/types';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ThemedButtonProps extends Omit<ButtonProps, 'children'> {
  /** Button variant type */
  variant?: ButtonVariant;
  /** Button content */
  children: React.ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Button size */
  size?: ButtonSize;
  /** Loading state */
  isLoading?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Theme object */
  theme?: CustomTheme;
}

/**
 * A themed button component with multiple style variants
 * @component
 * @param {ThemedButtonProps} props - Component props
 * @returns {JSX.Element} A themed button component
 * 
 * @example
 * ```tsx
 * <ThemedButton 
 *   variant="primary" 
 *   onPress={handlePress}
 *   size="large"
 *   fullWidth
 * >
 *   Click Me
 * </ThemedButton>
 * ```
 */
export function ThemedButton({
  variant = 'primary',
  fullWidth = false,
  size = 'medium',
  isLoading = false,
  accessibilityLabel,
  disabled,
  ...props
}: ThemedButtonProps): JSX.Element {
  const commonProps = {
    fullWidth,
    size,
    loading: isLoading,
    disabled: isLoading || disabled,
    accessibilityLabel: accessibilityLabel || (typeof props.children === 'string' ? props.children : undefined),
    accessibilityState: {
      disabled: isLoading || disabled,
      busy: isLoading,
    },
    accessibilityRole: 'button',
    ...props,
  };

  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...commonProps} />;
    case 'outline':
      return <OutlineButton {...commonProps} />;
    default:
      return <PrimaryButton {...commonProps} />;
  }
} 