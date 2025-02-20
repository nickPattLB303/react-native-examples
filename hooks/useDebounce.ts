/**
 * @module hooks/useDebounce
 * @description Custom hook for debouncing values
 */

import { useState, useEffect } from 'react';

/**
 * A hook that debounces a value by delaying updates
 * @template T The type of the value to debounce
 * @param {T} value The value to debounce
 * @param {number} delay The delay in milliseconds
 * @returns {T} The debounced value
 * 
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebounce(search, 300);
 *   
 *   // debouncedSearch will update 300ms after the last change to search
 *   useEffect(() => {
 *     // Handle search
 *   }, [debouncedSearch]);
 *   
 *   return (
 *     <TextInput
 *       value={search}
 *       onChangeText={setSearch}
 *     />
 *   );
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
} 