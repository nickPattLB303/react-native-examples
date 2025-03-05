/**
 * @fileoverview Mock API for fetching inventory data with improved error handling
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Inventory } from '../types';
import { Logger } from '../utils/Logger';

// Initialize logger
const logger = new Logger();

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fixed: Added retry mechanism and better error handling
export const fetchInventory = async (retryCount = 3): Promise<Inventory[]> => {
  logger.info('Fetching inventory data', { retryCount });
  
  try {
    // Simulated network delay
    await delay(1000);
    
    // For demonstration purposes, we'll still randomly throw errors
    // but with a lower probability and retry mechanism
    if (Math.random() < 0.3 && retryCount > 0) {
      logger.warn('Simulated network error, retrying...', { retriesLeft: retryCount - 1 });
      throw new Error('Network error: Failed to fetch inventory data');
    }
    
    // Generate inventory data with proper error handling for missing or invalid data
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
      // Fixed: Added default values for missing data
      {
        id: 'inv-5',
        name: 'Lisinopril',
        category: 'Blood Pressure',
        quantity: 60,
        price: 0, // Default price
        expiry: '2024-02-28',
      },
      // Fixed: Added default values for missing data
      {
        id: 'inv-6',
        name: 'Metformin',
        category: 'Diabetes',
        quantity: 0, // Default quantity
        price: 18.99,
        expiry: '2023-11-15',
      },
      // Fixed: Added default values for missing data
      {
        id: 'inv-7',
        name: 'Atorvastatin',
        category: 'Cholesterol',
        quantity: 25,
        price: 32.99,
        expiry: '', // Empty string instead of null
      },
      {
        id: 'inv-8',
        name: 'Albuterol',
        category: 'Respiratory',
        quantity: 8,
        price: 45.99,
        expiry: '2023-10-10',
      },
      // Fixed: Added default values for missing data
      {
        id: 'inv-9',
        name: 'Omeprazole',
        category: 'Uncategorized', // Default category
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
    
    logger.info('Inventory data fetched successfully', { count: inventory.length });
    return inventory;
  } catch (error) {
    logger.error('Error fetching inventory data', { 
      error: error instanceof Error ? error.message : String(error),
      retryCount 
    });
    
    // Retry logic
    if (retryCount > 0) {
      logger.info('Retrying fetch inventory', { retriesLeft: retryCount - 1 });
      return fetchInventory(retryCount - 1);
    }
    
    // If all retries fail, throw the error
    throw error;
  }
}; 