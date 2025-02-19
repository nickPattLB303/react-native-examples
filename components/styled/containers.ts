/**
 * @module components/styled/containers
 * @description Shared styled container components for consistent layout and spacing
 */

import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';
import { ThemedView, ThemedViewProps } from '@/components/ThemedView';

/**
 * @interface StyledProps
 * @description Props interface for styled components with theme support
 * @extends ThemedViewProps
 */
interface StyledProps extends ThemedViewProps {
  /** The theme object provided by styled-components */
  theme: DefaultTheme;
}

/**
 * @component ScreenContainer
 * @description A screen container component with standardized layout and spacing
 * 
 * @example
 * ```tsx
 * <ScreenContainer>
 *   <ThemedText>Content goes here</ThemedText>
 * </ScreenContainer>
 * ```
 */
export const ScreenContainer = styled(ThemedView)<StyledProps>`
  flex: 1;
  padding: ${({ theme }: StyledProps) => theme.spacing.md}px;
  gap: ${({ theme }: StyledProps) => theme.spacing.md}px;
`; 