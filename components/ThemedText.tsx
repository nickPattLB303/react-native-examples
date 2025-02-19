import { TextProps } from 'react-native';
import { BaseText, Title, Subtitle, SemiBoldText, Link } from '@/components/styled/text';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  color?: string;
};

export function ThemedText({ type = 'default', color, ...rest }: ThemedTextProps) {
  switch (type) {
    case 'title':
      return <Title color={color} {...rest} />;
    case 'subtitle':
      return <Subtitle color={color} {...rest} />;
    case 'defaultSemiBold':
      return <SemiBoldText color={color} {...rest} />;
    case 'link':
      return <Link {...rest} />;
    default:
      return <BaseText color={color} {...rest} />;
  }
}
