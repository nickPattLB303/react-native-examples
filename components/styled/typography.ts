/**
 * @module components/styled/typography
 * @description Typography components following Material Design principles
 */

import { TextProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import type { CustomTheme } from '@/theme/types';
import { ThemedText } from '@/components/ThemedText';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TypographyVariant = 'display' | 'headline' | 'title' | 'body' | 'label' | 'caption';

/**
 * @interface StyledTextProps
 * @description Base props for styled text components
 * @extends TextProps
 */
export interface StyledTextProps extends TextProps {
  theme: CustomTheme;
  $variant?: TypographyVariant;
  $weight?: FontWeight;
  $color?: keyof CustomTheme['colors'];
}

/**
 * Typography scale following Material Design principles
 */
const getTypographyStyle = (theme: CustomTheme, variant: TypographyVariant = 'body') => {
  switch (variant) {
    case 'display':
      return css`
        font-size: ${theme.typography.sizes.title * 1.5}px;
        line-height: ${theme.typography.lineHeights.title * 1.5}px;
      `;
    case 'headline':
      return css`
        font-size: ${theme.typography.sizes.title}px;
        line-height: ${theme.typography.lineHeights.title}px;
      `;
    case 'title':
      return css`
        font-size: ${theme.typography.sizes.subtitle}px;
        line-height: ${theme.typography.lineHeights.title}px;
      `;
    case 'label':
      return css`
        font-size: ${theme.typography.sizes.small}px;
        line-height: ${theme.typography.lineHeights.base}px;
      `;
    case 'caption':
      return css`
        font-size: ${theme.typography.sizes.small * 0.85}px;
        line-height: ${theme.typography.lineHeights.base * 0.85}px;
      `;
    case 'body':
    default:
      return css`
        font-size: ${theme.typography.sizes.base}px;
        line-height: ${theme.typography.lineHeights.base}px;
      `;
  }
};

/**
 * Font weight scale
 */
const weightScale: Record<FontWeight, string> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * @component Text
 * @description Base text component with Material Design typography
 */
export const Text = styled(ThemedText)<StyledTextProps>`
  ${({ theme, $variant }: StyledTextProps) => getTypographyStyle(theme, $variant)};
  font-weight: ${({ $weight = 'regular' }: StyledTextProps) => weightScale[$weight]};
  color: ${({ theme, $color = 'text' }: StyledTextProps) => theme.colors[$color]};
`;

/**
 * @component Display
 * @description Display text component for large headlines
 */
export const Display = styled(Text).attrs({ $variant: 'display' })``;

/**
 * @component Headline
 * @description Headline text component for section headers
 */
export const Headline = styled(Text).attrs({ $variant: 'headline' })``;

/**
 * @component Title
 * @description Title text component for content headers
 */
export const Title = styled(Text).attrs({ $variant: 'title', $weight: 'medium' })``;

/**
 * @component Body
 * @description Body text component for main content
 */
export const Body = styled(Text).attrs({ $variant: 'body' })``;

/**
 * @component Label
 * @description Label text component for form labels and secondary text
 */
export const Label = styled(Text).attrs({ $variant: 'label' })``;

/**
 * @component Caption
 * @description Caption text component for supplementary information
 */
export const Caption = styled(Text).attrs({ $variant: 'caption' })``; 