/**
 * @module components/medications/MedicationSearchBar
 * @description A specialized search bar component for searching medications
 */

import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SearchBar } from '../shared/SearchBar';

/**
 * Props for the MedicationSearchBar component
 * @interface MedicationSearchBarProps
 */
export interface MedicationSearchBarProps {
  /** The current search query */
  value: string;
  /** Callback when search query changes */
  onChangeText: (query: string) => void;
  /** Whether the search is currently loading */
  isLoading?: boolean;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * A specialized search bar component for searching medications. It provides
 * medication-specific placeholder text and will be extended with medication-specific
 * search functionality as needed.
 * 
 * @component
 * @param {MedicationSearchBarProps} props - The component props
 * @returns {JSX.Element} A medication-specific search bar component
 * 
 * @example
 * ```tsx
 * function MedicationList() {
 *   const [query, setQuery] = useState('');
 *   const { isLoading, error, medications } = useMedicationSearch(query);
 *   
 *   return (
 *     <>
 *       <MedicationSearchBar
 *         value={query}
 *         onChangeText={setQuery}
 *         isLoading={isLoading}
 *         onError={error => console.error('Search error:', error)}
 *       />
 *       {medications.map(med => (
 *         <MedicationListItem key={med.id} {...med} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export const MedicationSearchBar = memo(function MedicationSearchBar({
  value,
  onChangeText,
  isLoading = false,
  style,
  onError,
}: MedicationSearchBarProps): JSX.Element {
  const handleSubmit = useCallback(() => {
    // TODO: Implement medication-specific search submit logic
    // This could include things like:
    // - Triggering a more detailed search
    // - Updating search history
    // - Logging search analytics
  }, []);

  return (
    <SearchBar
      value={value}
      onChangeText={onChangeText}
      onSubmit={handleSubmit}
      placeholder="Search medications..."
      isLoading={isLoading}
      style={style}
      onError={onError}
      testID="medication-search-bar"
      searchIcon="magnify"
      clearIcon="close"
    />
  );
}); 