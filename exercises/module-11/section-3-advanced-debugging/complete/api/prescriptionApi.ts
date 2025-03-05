/**
 * @fileoverview API for fetching prescription data
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Prescription } from '../types';

// Fixed: Simple delay function with proper typing
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Fixed: Properly managed network activity simulation
let networkActivityTimer: NodeJS.Timeout | null = null;
let networkActivityData: Array<any> = [];

// Fixed: Network activity simulation with proper cleanup
const simulateNetworkActivity = (iterations = 0): void => {
  // Limit iterations to prevent memory leaks
  if (iterations > 10) {
    console.log('Network activity simulation completed');
    return;
  }
  
  // Create a small object instead of a large one
  const activityData = {
    timestamp: new Date().toISOString(),
    iteration: iterations
  };
  
  networkActivityData.push(activityData);
  
  // Use a reference to the timeout for cleanup
  networkActivityTimer = setTimeout(() => {
    simulateNetworkActivity(iterations + 1);
  }, 5000);
};

// Fixed: Added cleanup function to prevent memory leaks
export const cleanupNetworkActivity = (): void => {
  if (networkActivityTimer) {
    clearTimeout(networkActivityTimer);
    networkActivityTimer = null;
  }
  
  // Clear the array to free memory
  networkActivityData = [];
  console.log('Network activity cleaned up');
};

// Fixed: Fetch prescriptions with proper error handling and memory management
export const fetchPrescriptions = async (): Promise<Prescription[]> => {
  console.log('Fetching prescriptions...');
  
  // Start network activity simulation if not already running
  if (!networkActivityTimer) {
    simulateNetworkActivity();
  }
  
  // Simulate network delay
  await delay(1000);
  
  // Return mock prescription data
  return [
    {
      id: '1',
      medication: 'Lisinopril',
      dosage: '10mg, once daily',
      refillsRemaining: 3,
      expiryDate: '2023-12-15',
      prescribedBy: 'Dr. Sarah Johnson',
      pharmacy: 'MedPlus Pharmacy',
      lastFilled: '2023-06-15',
      instructions: 'Take one tablet by mouth once daily for high blood pressure. Take with or without food.'
    },
    {
      id: '2',
      medication: 'Atorvastatin',
      dosage: '20mg, once daily',
      refillsRemaining: 2,
      expiryDate: '2023-09-30',
      prescribedBy: 'Dr. Michael Chen',
      pharmacy: 'HealthWay Drugs',
      lastFilled: '2023-06-01',
      instructions: 'Take one tablet by mouth at bedtime for high cholesterol. Avoid grapefruit juice while taking this medication.'
    },
    {
      id: '3',
      medication: 'Metformin',
      dosage: '500mg, twice daily',
      refillsRemaining: 5,
      expiryDate: '2024-01-20',
      prescribedBy: 'Dr. Sarah Johnson',
      pharmacy: 'MedPlus Pharmacy',
      lastFilled: '2023-07-01',
      instructions: 'Take one tablet by mouth twice daily with meals for diabetes. If you experience severe stomach upset, contact your doctor.'
    },
    {
      id: '4',
      medication: 'Levothyroxine',
      dosage: '75mcg, once daily',
      refillsRemaining: 1,
      expiryDate: '2023-08-15',
      prescribedBy: 'Dr. Robert Williams',
      pharmacy: 'Central Pharmacy',
      lastFilled: '2023-05-15',
      instructions: 'Take one tablet by mouth once daily on an empty stomach, 30-60 minutes before breakfast for hypothyroidism.'
    },
    {
      id: '5',
      medication: 'Sertraline',
      dosage: '50mg, once daily',
      refillsRemaining: 4,
      expiryDate: '2023-11-10',
      prescribedBy: 'Dr. Emily Rodriguez',
      pharmacy: 'HealthWay Drugs',
      lastFilled: '2023-06-10',
      instructions: 'Take one tablet by mouth once daily with food for depression/anxiety. May cause drowsiness.'
    },
    {
      id: '6',
      medication: 'Amlodipine',
      dosage: '5mg, once daily',
      refillsRemaining: 0,
      expiryDate: '2023-07-05',
      prescribedBy: 'Dr. Sarah Johnson',
      pharmacy: 'MedPlus Pharmacy',
      lastFilled: '2023-04-05',
      instructions: 'Take one tablet by mouth once daily for high blood pressure. May cause swelling in ankles or feet.'
    },
    {
      id: '7',
      medication: 'Omeprazole',
      dosage: '20mg, once daily',
      refillsRemaining: 6,
      expiryDate: '2024-02-28',
      prescribedBy: 'Dr. Michael Chen',
      pharmacy: 'Central Pharmacy',
      lastFilled: '2023-06-28',
      instructions: 'Take one capsule by mouth once daily before breakfast for acid reflux. Take the full course as prescribed.'
    },
    {
      id: '8',
      medication: 'Albuterol Inhaler',
      dosage: '90mcg, 2 puffs as needed',
      refillsRemaining: 2,
      expiryDate: '2023-10-15',
      prescribedBy: 'Dr. Robert Williams',
      pharmacy: 'HealthWay Drugs',
      lastFilled: '2023-05-15',
      instructions: 'Inhale 2 puffs by mouth every 4-6 hours as needed for shortness of breath or wheezing. Rinse mouth after use.'
    }
  ];
}; 