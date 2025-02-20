/**
 * @module components/styled/list
 * @description Shared styled list components for consistent list styling across the application
 */

import styled from 'styled-components/native';
import { List } from 'react-native-paper';
import type { CustomTheme } from '@/theme/types';
import type { ViewStyle } from 'react-native';

/**
 * Props for styled list components
 * @interface StyledListProps
 */
interface StyledListProps {
  /** Theme object for styling */
  theme: CustomTheme;
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
  padding: ${({ theme, compact }: ListItemProps) => 
    compact ? theme.spacing.xs : theme.spacing.sm}px;
  border-radius: ${({ theme }: ListItemProps) => theme.borderRadius.sm}px;
  background-color: ${({ theme }: ListItemProps) => theme.colors.background};
  margin-bottom: ${({ theme }: ListItemProps) => theme.spacing.xs}px;
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
  padding: ${({ theme }: StyledListProps) => theme.spacing.sm}px;
  gap: ${({ theme }: StyledListProps) => theme.spacing.sm}px;
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
  background-color: ${({ theme }: StyledListProps) => theme.colors.outline};
  margin: ${({ theme }: StyledListProps) => theme.spacing.xs}px 0;
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
  font-size: ${({ theme }: StyledListProps) => theme.typography.sizes.base}px;
  color: ${({ theme }: StyledListProps) => theme.colors.text};
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
  font-size: ${({ theme }: StyledListProps) => theme.typography.sizes.small}px;
  color: ${({ theme }: StyledListProps) => theme.colors.secondary};
`; 