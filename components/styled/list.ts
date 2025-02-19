/**
 * @module components/styled/list
 * @description Shared styled list components for consistent list styling across the application
 */

import styled from 'styled-components/native';
import { List } from 'react-native-paper';
import type { DefaultTheme } from 'styled-components/native';
import type { ViewStyle } from 'react-native';

/**
 * Props for styled list components
 * @interface StyledListProps
 */
interface StyledListProps {
  /** Theme object for styling */
  theme: DefaultTheme;
  /** Whether to use compact styling */
  compact?: boolean;
}

/**
 * Props for list item components
 * @interface ListItemProps
 * @extends {StyledListProps}
 */
interface ListItemProps extends StyledListProps {
  /** Custom styles to apply */
  style?: ViewStyle;
}

/**
 * Type-safe theme accessor function
 */
const getThemeValue = <T extends keyof DefaultTheme>(theme: DefaultTheme, path: T) => theme[path];

/**
 * Base styled list item with theme integration
 * @component
 * 
 * @example
 * ```tsx
 * <BaseListItem
 *   title="Item Title"
 *   description="Item description"
 *   compact={true}
 * />
 * ```
 */
export const BaseListItem = styled(List.Item)<ListItemProps>`
  padding: ${({ theme, compact }: StyledListProps) => 
    compact ? getThemeValue(theme, 'spacing').xs : getThemeValue(theme, 'spacing').sm}px;
  border-radius: ${({ theme }: StyledListProps) => getThemeValue(theme, 'borderRadius').sm}px;
  background-color: ${({ theme }: StyledListProps) => getThemeValue(theme, 'colors').background};
  margin-bottom: ${({ theme }: StyledListProps) => getThemeValue(theme, 'spacing').xs}px;
`;

/**
 * Container for list items with consistent spacing
 * @component
 * 
 * @example
 * ```tsx
 * <ListContainer>
 *   <BaseListItem />
 *   <BaseListItem />
 * </ListContainer>
 * ```
 */
export const ListContainer = styled.View<StyledListProps>`
  padding: ${({ theme }: StyledListProps) => getThemeValue(theme, 'spacing').sm}px;
  gap: ${({ theme }: StyledListProps) => getThemeValue(theme, 'spacing').sm}px;
`;

/**
 * Consistent separator between list items
 * @component
 * 
 * @example
 * ```tsx
 * <BaseListItem />
 * <ListSeparator />
 * <BaseListItem />
 * ```
 */
export const ListSeparator = styled.View<StyledListProps>`
  height: 1px;
  background-color: ${({ theme }: StyledListProps) => getThemeValue(theme, 'colors').outline};
  margin: ${({ theme }: StyledListProps) => getThemeValue(theme, 'spacing').xs}px 0;
`;

/**
 * Styled title for list items
 * @component
 * 
 * @example
 * ```tsx
 * <ListItemTitle>Item Title</ListItemTitle>
 * ```
 */
export const ListItemTitle = styled.Text<StyledListProps>`
  font-size: ${({ theme }: StyledListProps) => getThemeValue(theme, 'typography').sizes.base}px;
  color: ${({ theme }: StyledListProps) => getThemeValue(theme, 'colors').text};
`;

/**
 * Styled description for list items
 * @component
 * 
 * @example
 * ```tsx
 * <ListItemDescription>Item description</ListItemDescription>
 * ```
 */
export const ListItemDescription = styled.Text<StyledListProps>`
  font-size: ${({ theme }: StyledListProps) => getThemeValue(theme, 'typography').sizes.small}px;
  color: ${({ theme }: StyledListProps) => getThemeValue(theme, 'colors').secondary};
`; 