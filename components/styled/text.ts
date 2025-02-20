/**
 * @module components/styled/text
 * @description Shared styled text components for consistent typography
 */

import styled from 'styled-components/native';
import { Text } from 'react-native';
import type { CustomTheme } from '@/theme/types';

/**
 * @interface StyledTextProps
 * @description Props for styled text components
 */
interface StyledTextProps {
  /** Theme object for styling */
  theme: CustomTheme;
  /** Optional color override */
  color?: string;
}

export const BaseText = styled(Text)<StyledTextProps>`
  color: ${({ theme, color }: StyledTextProps) => color || theme.colors.text};
  font-size: ${({ theme }: StyledTextProps) => theme.typography.sizes.base}px;
  line-height: ${({ theme }: StyledTextProps) => theme.typography.lineHeights.base}px;
`;

export const Title = styled(BaseText)`
  font-size: ${({ theme }: StyledTextProps) => theme.typography.sizes.title}px;
  font-weight: bold;
  line-height: ${({ theme }: StyledTextProps) => theme.typography.lineHeights.title}px;
`;

export const Subtitle = styled(BaseText)`
  font-size: ${({ theme }: StyledTextProps) => theme.typography.sizes.subtitle}px;
  font-weight: bold;
`;

export const SemiBoldText = styled(BaseText)`
  font-weight: 600;
`;

export const Link = styled(BaseText)`
  color: ${({ theme }: StyledTextProps) => theme.colors.primary};
  line-height: ${({ theme }: StyledTextProps) => theme.typography.lineHeights.link}px;
`; 