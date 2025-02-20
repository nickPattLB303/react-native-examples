/**
 * @module components/orders/OrderSearchBar
 * @description A specialized search bar component for searching orders
 */

import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SearchBar } from '../shared/SearchBar';

/**
 * Props for the OrderSearchBar component
 * @interface OrderSearchBarProps
 */
export interface OrderSearchBarProps {
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
 * A specialized search bar component for searching orders. It provides
 * order-specific placeholder text and will be extended with order-specific
 * search functionality as needed.
 * 
 * @component
 * @param {OrderSearchBarProps} props - The component props
 * @returns {JSX.Element} An order-specific search bar component
 * 
 * @example
 * ```tsx
 * function OrderList() {
 *   const [query, setQuery] = useState('');
 *   const { isLoading, error, orders } = useOrderSearch(query);
 *   
 *   return (
 *     <>
 *       <OrderSearchBar
 *         value={query}
 *         onChangeText={setQuery}
 *         isLoading={isLoading}
 *         onError={error => console.error('Search error:', error)}
 *       />
 *       {orders.map(order => (
 *         <OrderListItem key={order.id} {...order} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export const OrderSearchBar = memo(function OrderSearchBar({
  value,
  onChangeText,
  isLoading = false,
  style,
  onError,
}: OrderSearchBarProps): JSX.Element {
  const handleSubmit = useCallback(() => {
    // TODO: Implement order-specific search submit logic
    // This could include things like:
    // - Searching by order number
    // - Filtering by order status
    // - Searching order history
    // - Logging search analytics
  }, []);

  return (
    <SearchBar
      value={value}
      onChangeText={onChangeText}
      onSubmit={handleSubmit}
      placeholder="Search orders by ID or status..."
      isLoading={isLoading}
      style={style}
      onError={onError}
      testID="order-search-bar"
    />
  );
}); 