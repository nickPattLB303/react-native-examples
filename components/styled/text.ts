/**
 * @module components/styled/text
 * @description Shared styled text components for consistent typography
 */

import styled from 'styled-components/native';
import { Text } from 'react-native';
import type { DefaultTheme } from 'styled-components/native';

interface StyledTextProps {
  theme: DefaultTheme;
  color?: string;
}

export const BaseText = styled(Text)<StyledTextProps>`
  color: ${({ theme, color }) => color || theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.base}px;
  line-height: ${({ theme }) => theme.typography.lineHeights.base}px;
`;

export const Title = styled(BaseText)`
  font-size: ${({ theme }) => theme.typography.sizes.title}px;
  font-weight: bold;
  line-height: ${({ theme }) => theme.typography.lineHeights.title}px;
`;

export const Subtitle = styled(BaseText)`
  font-size: ${({ theme }) => theme.typography.sizes.subtitle}px;
  font-weight: bold;
`;

export const SemiBoldText = styled(BaseText)`
  font-weight: 600;
`;

export const Link = styled(BaseText)`
  color: ${({ theme }) => theme.colors.primary};
  line-height: ${({ theme }) => theme.typography.lineHeights.link}px;
`; 