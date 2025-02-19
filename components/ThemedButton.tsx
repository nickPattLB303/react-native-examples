/**
 * @module components/ThemedButton
 * @description Themed button component with multiple variants
 */

import React from 'react';
import { ButtonProps } from 'react-native-paper';
import { PrimaryButton, SecondaryButton, OutlineButton } from './styled/buttons';

export interface ThemedButtonProps extends Omit<ButtonProps, 'children'> {
  /** Button variant type */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button content */
  children: React.ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Button size */
  size?: 'small' | 'medium' | 'large';
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
  ...props
}: ThemedButtonProps) {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton fullWidth={fullWidth} size={size} {...props} />;
    case 'outline':
      return <OutlineButton fullWidth={fullWidth} size={size} {...props} />;
    default:
      return <PrimaryButton fullWidth={fullWidth} size={size} {...props} />;
  }
} 