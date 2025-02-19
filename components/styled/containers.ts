/**
 * @module components/styled/containers
 * @description Shared styled container components
 */

import styled from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';
import { ThemedView } from '@/components/ThemedView';

/**
 * @interface StyledProps
 * @description Props interface for styled components
 */
interface StyledProps {
  theme: DefaultTheme;
}

/**
 * @component
 * @description A screen container with standard padding and spacing
 */
export const ScreenContainer = styled(ThemedView)<StyledProps>`
  flex: 1;
  padding: ${(props: StyledProps) => props.theme.spacing.md}px;
  gap: ${(props: StyledProps) => props.theme.spacing.md}px;
`; 