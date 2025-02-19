import { TextProps } from 'react-native';
import { BaseText, Title, Subtitle, SemiBoldText, Link } from '@/components/styled/text';

/**
 * Available text types for ThemedText component
 */
export const TEXT_TYPES = {
  DEFAULT: 'default',
  TITLE: 'title',
  DEFAULT_SEMIBOLD: 'defaultSemiBold',
  SUBTITLE: 'subtitle',
  LINK: 'link',
} as const;

export type TextType = typeof TEXT_TYPES[keyof typeof TEXT_TYPES];

/**
 * Props for the ThemedText component
 * @interface ThemedTextProps
 * @extends {TextProps}
 */
export interface ThemedTextProps extends TextProps {
  /** The type of text to display */
  type?: TextType;
  /** Optional color override for the text */
  color?: string;
}

/**
 * A themed text component that provides consistent text styling across the app
 * @component
 * @param {ThemedTextProps} props - The component props
 * @returns {JSX.Element} A themed text component
 */
export function ThemedText({ type = TEXT_TYPES.DEFAULT, color, ...rest }: ThemedTextProps): JSX.Element {
  switch (type) {
    case TEXT_TYPES.TITLE:
      return <Title color={color} {...rest} />;
    case TEXT_TYPES.SUBTITLE:
      return <Subtitle color={color} {...rest} />;
    case TEXT_TYPES.DEFAULT_SEMIBOLD:
      return <SemiBoldText color={color} {...rest} />;
    case TEXT_TYPES.LINK:
      return <Link {...rest} />;
    default:
      return <BaseText color={color} {...rest} />;
  }
}
