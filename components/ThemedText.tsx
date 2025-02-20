import { TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { memo } from 'react';
import { BaseText, Title, Subtitle, SemiBoldText, Link } from '@/components/styled/text';

/**
 * Available text types for ThemedText component
 * @readonly
 * @enum {string}
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
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ThemedText>Hello World</ThemedText>
 * 
 * // With custom color
 * <ThemedText color="#FF0000">Red Text</ThemedText>
 * 
 * // As a title
 * <ThemedText type="title">Page Title</ThemedText>
 * 
 * // As a link
 * <ThemedText type="link" onPress={() => {}}>Click Me</ThemedText>
 * 
 * // With custom style
 * <ThemedText style={{ marginBottom: 8 }}>Styled Text</ThemedText>
 * 
 * // With numberOfLines
 * <ThemedText numberOfLines={2}>
 *   This is a very long text that will be truncated after two lines...
 * </ThemedText>
 * ```
 */
export interface ThemedTextProps extends TextProps {
  /** The type of text to display */
  type?: TextType;
  /** Optional color override for the text */
  color?: string;
  /** Whether the text is selectable */
  selectable?: boolean;
  /** Accessibility role for the text */
  accessibilityRole?: 'text' | 'header' | 'link';
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * A themed text component that provides consistent text styling across the app.
 * This component automatically handles text styling based on the current theme and
 * provides various text types for different use cases.
 * 
 * @component
 * @param {ThemedTextProps} props - The component props
 * @returns {JSX.Element} A themed text component
 * 
 * @example
 * // In a list item
 * function ListItem({ title, description }) {
 *   return (
 *     <View>
 *       <ThemedText type="title">{title}</ThemedText>
 *       <ThemedText type="default">{description}</ThemedText>
 *     </View>
 *   );
 * }
 * 
 * @example
 * // In a form
 * function FormField({ label, error }) {
 *   return (
 *     <View>
 *       <ThemedText type="defaultSemiBold">{label}</ThemedText>
 *       <TextInput />
 *       {error && (
 *         <ThemedText color={theme.colors.error}>
 *           {error}
 *         </ThemedText>
 *       )}
 *     </View>
 *   );
 * }
 * 
 * @example
 * // In a card header
 * function CardHeader({ title, subtitle }) {
 *   return (
 *     <View>
 *       <ThemedText 
 *         type="title"
 *         accessibilityRole="header"
 *         accessibilityLabel={`Section: ${title}`}
 *       >
 *         {title}
 *       </ThemedText>
 *       {subtitle && (
 *         <ThemedText type="subtitle">{subtitle}</ThemedText>
 *       )}
 *     </View>
 *   );
 * }
 */
export const ThemedText = memo(function ThemedText({ 
  type = TEXT_TYPES.DEFAULT, 
  color,
  selectable = false,
  accessibilityRole = 'text',
  accessibilityLabel,
  ...rest 
}: ThemedTextProps): JSX.Element {
  const theme = useTheme();
  const textColor = color || theme.colors.onSurface;

  const commonProps = {
    selectable,
    accessibilityRole,
    accessibilityLabel,
    color: textColor,
    ...rest,
  };

  switch (type) {
    case TEXT_TYPES.TITLE:
      return <Title {...commonProps} accessibilityRole="header" />;
    case TEXT_TYPES.SUBTITLE:
      return <Subtitle {...commonProps} accessibilityRole="header" />;
    case TEXT_TYPES.DEFAULT_SEMIBOLD:
      return <SemiBoldText {...commonProps} />;
    case TEXT_TYPES.LINK:
      return <Link {...commonProps} accessibilityRole="link" />;
    default:
      return <BaseText {...commonProps} />;
  }
});
