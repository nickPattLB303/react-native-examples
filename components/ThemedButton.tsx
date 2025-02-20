/**
 * @module components/ThemedButton
 * @description Themed button component with multiple variants
 */

import React from 'react';
import { ButtonProps, useTheme } from 'react-native-paper';
import { PrimaryButton, SecondaryButton, OutlineButton } from './styled/buttons';

const BUTTON_VARIANTS = ['primary', 'secondary', 'outline'] as const;
const BUTTON_SIZES = ['small', 'medium', 'large'] as const;

type ButtonVariant = typeof BUTTON_VARIANTS[number];
type ButtonSize = typeof BUTTON_SIZES[number];

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
}

/**
 * @function ThemedButton
 * @description A themed button component with multiple style variants
 * 
 * @example
 * ```tsx
 * <ThemedButton variant="primary" onPress={handlePress}>
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
}: ThemedButtonProps) {
  const theme = useTheme();

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