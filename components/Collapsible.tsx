import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { DefaultTheme } from 'styled-components/native';

/** Props for styled components with theme */
interface StyledProps {
  theme: DefaultTheme;
}

/** Styled header component for the collapsible section */
const CollapsibleHeader = styled(TouchableOpacity)<StyledProps>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

/** Styled content container for the collapsible section */
const CollapsibleContent = styled(ThemedView)<StyledProps>`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;

/**
 * Props for the Collapsible component
 * @interface CollapsibleProps
 * @extends {PropsWithChildren}
 */
interface CollapsibleProps extends PropsWithChildren {
  /** Title to display in the collapsible header */
  title: string;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Initial state of the collapsible section */
  defaultOpen?: boolean;
}

/**
 * A collapsible section component with an animated chevron icon
 * 
 * @component
 * @param {CollapsibleProps} props - The component props
 * @returns {JSX.Element} A collapsible section component
 * 
 * @example
 * ```tsx
 * <Collapsible title="Section Title" defaultOpen={true}>
 *   <Text>Collapsible content goes here</Text>
 * </Collapsible>
 * ```
 */
export function Collapsible({ 
  children, 
  title,
  style,
  defaultOpen = false,
}: CollapsibleProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const colorScheme = useColorScheme() ?? 'light';
  const iconColor = Colors[colorScheme].icon;

  return (
    <ThemedView style={style}>
      <CollapsibleHeader
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={iconColor}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </CollapsibleHeader>
      {isOpen && <CollapsibleContent>{children}</CollapsibleContent>}
    </ThemedView>
  );
}
