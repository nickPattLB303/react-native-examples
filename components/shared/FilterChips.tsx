/**
 * @module components/shared/FilterChips
 * @description A reusable filter chips component for filtering content
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';
import styled from 'styled-components/native';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomTheme } from '@/theme/types';
import { FlexRow } from '../styled/containers';

/**
 * @interface FilterOption
 * @description Interface for filter options
 */
export interface FilterOption {
  /** Unique identifier for the filter */
  id: string;
  /** Label to display on the chip */
  label: string;
  /** Optional Material Community icon name */
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

/**
 * Props for the FilterChips component
 * @interface FilterChipsProps
 */
export interface FilterChipsProps {
  /** Array of filter options */
  options: FilterOption[];
  /** Array of selected filter IDs */
  selectedIds: string[];
  /** Callback when a filter is selected or deselected */
  onToggle: (id: string) => void;
  /** Whether the filters are loading */
  isLoading?: boolean;
  /** Whether the filters are disabled */
  disabled?: boolean;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Props for the styled chip component
 * @interface StyledChipProps
 */
interface StyledChipProps {
  theme: CustomTheme;
  selected?: boolean;
}

/**
 * Styled container for the filter chips
 */
const ChipsContainer = styled(FlexRow)<{ theme: CustomTheme }>`
  flex-wrap: wrap;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * Styled chip component with consistent theme integration
 */
const StyledChip = styled(Chip).attrs<StyledChipProps>(({ theme, selected }) => ({
  mode: selected ? 'flat' : 'outlined',
  selectedColor: theme.colors.primary,
  textColor: selected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
  style: {
    backgroundColor: selected ? theme.colors.primary : 'transparent',
  },
}))`
  margin-right: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  border-radius: 16px;
`;

/**
 * A reusable filter chips component that provides a row of selectable chips
 * for filtering content. Supports multiple selection, loading states, and
 * proper accessibility.
 * 
 * @component
 * @param {FilterChipsProps} props - The component props
 * @returns {JSX.Element} A filter chips component
 * 
 * @example
 * ```tsx
 * const filterOptions = [
 *   { id: 'active', label: 'Active', icon: 'check-circle' },
 *   { id: 'completed', label: 'Completed', icon: 'check-all' },
 *   { id: 'archived', label: 'Archived', icon: 'archive' },
 * ];
 * 
 * function FilterableList() {
 *   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
 *   
 *   const handleToggle = useCallback((id: string) => {
 *     setSelectedFilters(prev => 
 *       prev.includes(id)
 *         ? prev.filter(f => f !== id)
 *         : [...prev, id]
 *     );
 *   }, []);
 *   
 *   return (
 *     <FilterChips
 *       options={filterOptions}
 *       selectedIds={selectedFilters}
 *       onToggle={handleToggle}
 *     />
 *   );
 * }
 * ```
 */
export const FilterChips = memo(function FilterChips({
  options,
  selectedIds,
  onToggle,
  isLoading = false,
  disabled = false,
  style,
  onError,
}: FilterChipsProps): JSX.Element {
  const handlePress = React.useCallback((id: string) => {
    try {
      onToggle(id);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to toggle filter'));
    }
  }, [onToggle, onError]);

  return (
    <ChipsContainer style={style}>
      {options.map(({ id, label, icon }) => {
        const isSelected = selectedIds.includes(id);
        
        return (
          <StyledChip
            key={id}
            selected={isSelected}
            onPress={() => handlePress(id)}
            disabled={disabled || isLoading}
            loading={isLoading}
            icon={icon}
            compact
            testID={`filter-chip-${id}`}
            accessibilityLabel={`Filter by ${label}`}
            accessibilityState={{
              selected: isSelected,
              disabled: disabled || isLoading,
              busy: isLoading,
            }}
            accessibilityRole="button"
            accessibilityHint={
              isSelected
                ? `Double tap to remove ${label} filter`
                : `Double tap to add ${label} filter`
            }
          >
            {label}
          </StyledChip>
        );
      })}
    </ChipsContainer>
  );
}); 