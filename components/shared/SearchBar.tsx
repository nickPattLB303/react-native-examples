/**
 * @module components/shared/SearchBar
 * @description A reusable search bar component that extends react-native-paper's Searchbar
 */

import React, { memo, useCallback, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from '../ui/IconSymbol';

/**
 * Props for the SearchBar component
 * @interface SearchBarProps
 */
export interface SearchBarProps {
  /** The current search query */
  value: string;
  /** Callback when search query changes */
  onChangeText: (query: string) => void;
  /** Callback when search is submitted */
  onSubmit?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the search bar is loading */
  isLoading?: boolean;
  /** Whether the search bar is disabled */
  disabled?: boolean;
  /** Optional test ID for testing */
  testID?: string;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Styled Searchbar component with consistent theme integration
 */
const StyledSearchbar = styled(Searchbar).attrs(({ theme }) => ({
  elevation: 0,
  mode: 'view',
  inputStyle: {
    fontSize: 16,
    lineHeight: 24,
  },
}))`
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * A themed search bar component that provides consistent search functionality
 * across the app. It handles loading states, errors, and provides proper
 * accessibility support.
 * 
 * @component
 * @param {SearchBarProps} props - The component props
 * @returns {JSX.Element} A themed search bar component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function SearchableList() {
 *   const [query, setQuery] = useState('');
 *   
 *   return (
 *     <SearchBar
 *       value={query}
 *       onChangeText={setQuery}
 *       placeholder="Search items..."
 *     />
 *   );
 * }
 * 
 * @example
 * // With loading state and error handling
 * function SearchWithLoading() {
 *   const [query, setQuery] = useState('');
 *   const { isLoading, error } = useSearch(query);
 *   
 *   return (
 *     <SearchBar
 *       value={query}
 *       onChangeText={setQuery}
 *       isLoading={isLoading}
 *       onError={error => console.error(error)}
 *       placeholder="Search with loading..."
 *     />
 *   );
 * }
 */
export const SearchBar = memo(function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search...',
  isLoading = false,
  disabled = false,
  testID,
  style,
  onError,
}: SearchBarProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleChangeText = useCallback((text: string) => {
    try {
      onChangeText(text);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to update search text'));
    }
  }, [onChangeText, onError]);

  const handleSubmit = useCallback(() => {
    try {
      onSubmit?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to submit search'));
    }
  }, [onSubmit, onError]);

  return (
    <StyledSearchbar
      placeholder={placeholder}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmit}
      value={value}
      loading={isLoading}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      icon={() => (
        <IconSymbol
          name="magnifyingglass"
          size={24}
          color={isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant}
        />
      )}
      clearIcon={() => (
        value ? (
          <IconSymbol
            name="xmark"
            size={24}
            color={theme.colors.onSurfaceVariant}
          />
        ) : undefined
      )}
      style={style}
      testID={testID}
      accessibilityLabel={placeholder}
      accessibilityRole="search"
      accessibilityState={{
        disabled,
        busy: isLoading
      }}
    />
  );
}); 