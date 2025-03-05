/**
 * @fileoverview Mock API for fetching inventory data
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Inventory } from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Bug 1: This function has a 50% chance of throwing an error
const fetchInventory = async (): Promise<Inventory[]> => {
  // Simulated network delay
  await delay(1000);
  
  // Bug 2: Randomly throw an error 50% of the time
  if (Math.random() < 0.5) {
    throw new Error('Network error: Failed to fetch inventory data');
  }
  
  // Generate inventory data with some items having missing or invalid data
  const inventory: Inventory[] = [
    {
      id: 'inv-1',
      name: 'Aspirin',
      category: 'Pain Relief',
      quantity: 45,
      price: 9.99,
      expiry: '2023-12-31',
    },
    {
      id: 'inv-2',
      name: 'Ibuprofen',
      category: 'Pain Relief',
      quantity: 30,
      price: 12.99,
      expiry: '2024-06-30',
    },
    {
      id: 'inv-3',
      name: 'Acetaminophen',
      category: 'Pain Relief',
      quantity: 5,
      price: 7.99,
      expiry: '2023-09-15',
    },
    {
      id: 'inv-4',
      name: 'Amoxicillin',
      category: 'Antibiotics',
      quantity: 15,
      price: 24.99,
      expiry: '2023-08-20',
    },
    // Bug 3: Missing price
    {
      id: 'inv-5',
      name: 'Lisinopril',
      category: 'Blood Pressure',
      quantity: 60,
      // @ts-ignore - intentional bug
      price: undefined,
      expiry: '2024-02-28',
    },
    // Bug 4: Missing quantity
    {
      id: 'inv-6',
      name: 'Metformin',
      category: 'Diabetes',
      // @ts-ignore - intentional bug
      quantity: undefined,
      price: 18.99,
      expiry: '2023-11-15',
    },
    // Bug 5: Invalid expiry date
    {
      id: 'inv-7',
      name: 'Atorvastatin',
      category: 'Cholesterol',
      quantity: 25,
      price: 32.99,
      // @ts-ignore - intentional bug
      expiry: null,
    },
    {
      id: 'inv-8',
      name: 'Albuterol',
      category: 'Respiratory',
      quantity: 8,
      price: 45.99,
      expiry: '2023-10-10',
    },
    // Bug 6: Missing category
    {
      id: 'inv-9',
      name: 'Omeprazole',
      // @ts-ignore - intentional bug
      category: null,
      quantity: 20,
      price: 15.99,
      expiry: '2024-01-15',
    },
    {
      id: 'inv-10',
      name: 'Levothyroxine',
      category: 'Thyroid',
      quantity: 90,
      price: 22.99,
      expiry: '2024-04-30',
    },
  ];
  
  return inventory;
};

export { fetchInventory }; 