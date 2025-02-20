/**
 * @module components/medications/MedicationFilters
 * @description A specialized filter component for medications
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FilterChips, FilterOption } from '../shared/FilterChips';

/** Available medication filter types */
export const MEDICATION_FILTERS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REQUIRES_REFILL: 'requires_refill',
  EXPIRING_SOON: 'expiring_soon',
  RECENTLY_ADDED: 'recently_added',
} as const;

/** Type for medication filter values */
export type MedicationFilterType = typeof MEDICATION_FILTERS[keyof typeof MEDICATION_FILTERS];

/** Default medication filter options */
export const DEFAULT_MEDICATION_FILTERS: FilterOption[] = [
  { id: MEDICATION_FILTERS.ACTIVE, label: 'Active', icon: 'check-circle' },
  { id: MEDICATION_FILTERS.INACTIVE, label: 'Inactive', icon: 'close-circle' },
  { id: MEDICATION_FILTERS.REQUIRES_REFILL, label: 'Needs Refill', icon: 'bell' },
  { id: MEDICATION_FILTERS.EXPIRING_SOON, label: 'Expiring Soon', icon: 'clock' },
  { id: MEDICATION_FILTERS.RECENTLY_ADDED, label: 'Recently Added', icon: 'plus-circle' },
];

/**
 * Props for the MedicationFilters component
 * @interface MedicationFiltersProps
 */
export interface MedicationFiltersProps {
  /** Array of selected filter IDs */
  selectedIds: MedicationFilterType[];
  /** Callback when a filter is selected or deselected */
  onToggle: (id: MedicationFilterType) => void;
  /** Whether the filters are loading */
  isLoading?: boolean;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * A specialized filter component for medications that provides predefined
 * filter options specific to medication management.
 * 
 * @component
 * @param {MedicationFiltersProps} props - The component props
 * @returns {JSX.Element} A medication-specific filter component
 * 
 * @example
 * ```tsx
 * function MedicationList() {
 *   const [selectedFilters, setSelectedFilters] = useState<MedicationFilterType[]>([]);
 *   
 *   const handleToggle = useCallback((id: MedicationFilterType) => {
 *     setSelectedFilters(prev => 
 *       prev.includes(id)
 *         ? prev.filter(f => f !== id)
 *         : [...prev, id]
 *     );
 *   }, []);
 *   
 *   return (
 *     <MedicationFilters
 *       selectedIds={selectedFilters}
 *       onToggle={handleToggle}
 *     />
 *   );
 * }
 * ```
 */
export const MedicationFilters = memo(function MedicationFilters({
  selectedIds,
  onToggle,
  isLoading = false,
  style,
  onError,
}: MedicationFiltersProps): JSX.Element {
  return (
    <FilterChips
      options={DEFAULT_MEDICATION_FILTERS}
      selectedIds={selectedIds}
      onToggle={onToggle}
      isLoading={isLoading}
      style={style}
      onError={onError}
      testID="medication-filters"
    />
  );
}); 