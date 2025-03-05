/**
 * Sample order data
 * 
 * This file contains sample order data to use in the app.
 */

export interface OrderItem {
  medicationId: string;
  medicationName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
}

const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-06-15',
    items: [
      {
        medicationId: '1',
        medicationName: 'Aspirin',
        quantity: 2,
        price: 5.99,
      },
      {
        medicationId: '4',
        medicationName: 'Ibuprofen',
        quantity: 1,
        price: 4.99,
      },
    ],
    total: 16.97,
    status: 'delivered',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-002',
    date: '2023-07-02',
    items: [
      {
        medicationId: '3',
        medicationName: 'Lisinopril',
        quantity: 1,
        price: 8.50,
      },
    ],
    total: 8.50,
    status: 'shipped',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-003',
    date: '2023-07-10',
    items: [
      {
        medicationId: '2',
        medicationName: 'Amoxicillin',
        quantity: 1,
        price: 12.99,
      },
      {
        medicationId: '5',
        medicationName: 'Metformin',
        quantity: 1,
        price: 7.25,
      },
    ],
    total: 20.24,
    status: 'processing',
  },
];

export default orders; 