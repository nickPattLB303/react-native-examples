/**
 * @module hooks/queries/useOrders
 * @description Custom hook for fetching and managing order data
 */

import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

/**
 * @interface Order
 * @description Interface for order data
 */
export interface Order {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generates a fake order using Faker.js
 * @returns {Order} A fake order object
 */
function generateOrder(): Order {
  const status = faker.helpers.arrayElement([
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ] as Order['status'][]);

  const items = Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: parseFloat(faker.commerce.price()),
    })
  );

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    id: faker.string.uuid(),
    status,
    items,
    total,
    trackingNumber: status !== 'pending' ? faker.string.alphanumeric(10).toUpperCase() : undefined,
    estimatedDelivery: status !== 'cancelled' ? faker.date.future() : undefined,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

/**
 * Simulates fetching orders from an API
 * @param {number} count - Number of orders to generate
 * @returns {Promise<Order[]>} A promise that resolves to an array of orders
 */
async function fetchOrders(count: number = 10): Promise<Order[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Array.from({ length: count }, generateOrder);
}

/**
 * Custom hook for fetching and managing order data
 * @param {number} count - Number of orders to fetch
 * @returns {UseQueryResult<Order[]>} Query result containing orders data and status
 * 
 * @example
 * ```tsx
 * function OrderList() {
 *   const { data: orders, isLoading, error } = useOrders();
 *   
 *   if (isLoading) return <LoadingState message="Loading orders..." />;
 *   if (error) return <ErrorState error={error} />;
 *   
 *   return (
 *     <FlatList
 *       data={orders}
 *       renderItem={({ item }) => <OrderListItem {...item} />}
 *       keyExtractor={item => item.id}
 *     />
 *   );
 * }
 * ```
 */
export function useOrders(count: number = 10) {
  return useQuery(['orders', count], () => fetchOrders(count), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
} 