/**
 * @module components/MedicationListItem
 * @description Specialized list item component for displaying medication information
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BaseListItem, ListItemTitle, ListItemDescription } from './styled/list';
import { IconSymbol } from './ui/IconSymbol';
import { useTheme } from 'styled-components/native';

export interface MedicationListItemProps {
  /** Medication name */
  name: string;
  /** Medication dosage */
  dosage: string;
  /** Medication frequency */
  frequency: string;
  /** Handler for when the item is pressed */
  onPress?: () => void;
  /** Whether to use compact styling */
  compact?: boolean;
}

/**
 * @function MedicationListItem
 * @description A list item component specifically designed for displaying medication information
 * 
 * @example
 * ```tsx
 * <MedicationListItem
 *   name="Aspirin"
 *   dosage="81mg"
 *   frequency="Once daily"
 *   onPress={() => {}}
 * />
 * ```
 */
export function MedicationListItem({
  name,
  dosage,
  frequency,
  onPress,
  compact = false,
}: MedicationListItemProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <BaseListItem
        compact={compact}
        title={<ListItemTitle>{name}</ListItemTitle>}
        description={
          <>
            <ListItemDescription>{dosage}</ListItemDescription>
            <ListItemDescription>{frequency}</ListItemDescription>
          </>
        }
        left={props => (
          <IconSymbol
            name="pills.fill"
            size={24}
            color={theme.colors.primary}
            {...props}
          />
        )}
        right={props => (
          <IconSymbol
            name="chevron.right"
            size={24}
            color={theme.colors.secondary}
            {...props}
          />
        )}
      />
    </TouchableOpacity>
  );
} 