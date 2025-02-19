/**
 * @module components/styled/containers
 * @description Shared styled container components for consistent layout and spacing
 */

import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';
import { ThemedView } from '@/components/ThemedView';

/**
 * @interface StyledContainerProps
 * @description Base props for styled container components
 * @extends ViewProps
 */
export interface StyledContainerProps extends ViewProps {
  /** The theme object provided by styled-components */
  theme: DefaultTheme;
  /** Whether the container should take full width */
  $fullWidth?: boolean;
  /** Custom padding override */
  $padding?: number;
  /** Custom gap override */
  $gap?: number;
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
export const ScreenContainer = styled(ThemedView)<StyledContainerProps>`
  flex: 1;
  padding: ${({ theme, $padding }: StyledContainerProps) => $padding ?? theme.spacing.md}px;
  gap: ${({ theme, $gap }: StyledContainerProps) => $gap ?? theme.spacing.md}px;
  width: ${({ $fullWidth }: StyledContainerProps) => $fullWidth ? '100%' : 'auto'};
`;

/**
 * @component FlexRow
 * @description A horizontal container with flex layout
 */
export const FlexRow = styled(ThemedView)<StyledContainerProps>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme, $gap }: StyledContainerProps) => $gap ?? theme.spacing.sm}px;
  padding: ${({ theme, $padding }: StyledContainerProps) => $padding ?? 0}px;
  width: ${({ $fullWidth }: StyledContainerProps) => $fullWidth ? '100%' : 'auto'};
`;

/**
 * @component Card
 * @description A card container with elevation and rounded corners
 */
export const Card = styled(ThemedView)<StyledContainerProps>`
  background-color: ${({ theme }: StyledContainerProps) => theme.colors.surface};
  border-radius: ${({ theme }: StyledContainerProps) => theme.borderRadius.md}px;
  padding: ${({ theme, $padding }: StyledContainerProps) => $padding ?? theme.spacing.md}px;
  gap: ${({ theme, $gap }: StyledContainerProps) => $gap ?? theme.spacing.sm}px;
  elevation: ${({ theme }: StyledContainerProps) => theme.elevation.low};
  shadow-color: ${({ theme }: StyledContainerProps) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  width: ${({ $fullWidth }: StyledContainerProps) => $fullWidth ? '100%' : 'auto'};
`; 