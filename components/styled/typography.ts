/**
 * @module components/styled/typography
 * @description Typography components following Material Design principles
 */

import { TextProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';
import { ThemedText } from '@/components/ThemedText';

/**
 * @interface StyledTextProps
 * @description Base props for styled text components
 * @extends TextProps
 */
export interface StyledTextProps extends TextProps {
  theme: DefaultTheme;
  $variant?: 'display' | 'headline' | 'title' | 'body' | 'label' | 'caption';
  $weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  $color?: keyof DefaultTheme['colors'];
}

/**
 * Typography scale following Material Design principles
 */
const typographyScale = {
  display: css`
    font-size: 36px;
    line-height: 44px;
  `,
  headline: css`
    font-size: 24px;
    line-height: 32px;
  `,
  title: css`
    font-size: 20px;
    line-height: 28px;
  `,
  body: css`
    font-size: 16px;
    line-height: 24px;
  `,
  label: css`
    font-size: 14px;
    line-height: 20px;
  `,
  caption: css`
    font-size: 12px;
    line-height: 16px;
  `,
};

/**
 * Font weight scale
 */
const weightScale = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

/**
 * @component Text
 * @description Base text component with Material Design typography
 */
export const Text = styled(ThemedText)<StyledTextProps>`
  ${({ $variant = 'body' }) => typographyScale[$variant]};
  font-weight: ${({ $weight = 'regular' }) => weightScale[$weight]};
  color: ${({ theme, $color = 'text' }) => theme.colors[$color]};
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
 * @description Caption text component for auxiliary information
 */
export const Caption = styled(Text).attrs({ $variant: 'caption' })``; 