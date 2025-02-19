/**
 * @module components/styled/list
 * @description Shared styled list components for consistent list styling
 */

import styled from 'styled-components/native';
import { List } from 'react-native-paper';
import type { DefaultTheme } from 'styled-components/native';

interface StyledListProps {
  theme: DefaultTheme;
  compact?: boolean;
}

/**
 * @component BaseListItem
 * @description Base styled list item with theme integration
 */
export const BaseListItem = styled(List.Item)<StyledListProps>`
  padding: ${({ theme, compact }) => compact ? theme.spacing.xs : theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * @component ListContainer
 * @description Container for list items with consistent spacing
 */
export const ListContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * @component ListSeparator
 * @description Consistent separator between list items
 */
export const ListSeparator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline};
  margin: ${({ theme }) => theme.spacing.xs}px 0;
`;

/**
 * @component ListItemTitle
 * @description Styled title for list items
 */
export const ListItemTitle = styled(List.Item.Title)`
  font-size: ${({ theme }) => theme.typography.sizes.base}px;
  color: ${({ theme }) => theme.colors.text};
`;

/**
 * @component ListItemDescription
 * @description Styled description for list items
 */
export const ListItemDescription = styled(List.Item.Description)`
  font-size: ${({ theme }) => theme.typography.sizes.small}px;
  color: ${({ theme }) => theme.colors.secondary};
`; 