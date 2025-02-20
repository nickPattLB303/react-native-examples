/**
 * @module components/orders/OrderFilters
 * @description A specialized filter component for orders
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FilterChips, FilterOption } from '../shared/FilterChips';
import { ORDER_STATUS } from '../OrderListItem';

/** Available order filter types */
export const ORDER_FILTERS = {
  ...ORDER_STATUS,
  RECENT: 'recent',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
} as const;

/** Type for order filter values */
export type OrderFilterType = typeof ORDER_FILTERS[keyof typeof ORDER_FILTERS];

/** Default order filter options */
export const DEFAULT_ORDER_FILTERS: FilterOption[] = [
  { id: ORDER_FILTERS.PENDING, label: 'Pending', icon: 'clock.fill' },
  { id: ORDER_FILTERS.PROCESSING, label: 'Processing', icon: 'gear.fill' },
  { id: ORDER_FILTERS.SHIPPED, label: 'Shipped', icon: 'box.fill' },
  { id: ORDER_FILTERS.DELIVERED, label: 'Delivered', icon: 'checkmark' },
  { id: ORDER_FILTERS.CANCELLED, label: 'Cancelled', icon: 'xmark' },
  { id: ORDER_FILTERS.RECENT, label: 'Recent', icon: 'calendar' },
  { id: ORDER_FILTERS.THIS_MONTH, label: 'This Month', icon: 'calendar.badge.plus' },
  { id: ORDER_FILTERS.LAST_MONTH, label: 'Last Month', icon: 'calendar.badge.minus' },
];

/**
 * Props for the OrderFilters component
 * @interface OrderFiltersProps
 */
export interface OrderFiltersProps {
  /** Array of selected filter IDs */
  selectedIds: OrderFilterType[];
  /** Callback when a filter is selected or deselected */
  onToggle: (id: OrderFilterType) => void;
  /** Whether the filters are loading */
  isLoading?: boolean;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * A specialized filter component for orders that provides predefined
 * filter options specific to order management.
 * 
 * @component
 * @param {OrderFiltersProps} props - The component props
 * @returns {JSX.Element} An order-specific filter component
 * 
 * @example
 * ```tsx
 * function OrderList() {
 *   const [selectedFilters, setSelectedFilters] = useState<OrderFilterType[]>([]);
 *   
 *   const handleToggle = useCallback((id: OrderFilterType) => {
 *     setSelectedFilters(prev => 
 *       prev.includes(id)
 *         ? prev.filter(f => f !== id)
 *         : [...prev, id]
 *     );
 *   }, []);
 *   
 *   return (
 *     <OrderFilters
 *       selectedIds={selectedFilters}
 *       onToggle={handleToggle}
 *     />
 *   );
 * }
 * ```
 */
export const OrderFilters = memo(function OrderFilters({
  selectedIds,
  onToggle,
  isLoading = false,
  style,
  onError,
}: OrderFiltersProps): JSX.Element {
  return (
    <FilterChips
      options={DEFAULT_ORDER_FILTERS}
      selectedIds={selectedIds}
      onToggle={onToggle}
      isLoading={isLoading}
      style={style}
      onError={onError}
      testID="order-filters"
    />
  );
}); 