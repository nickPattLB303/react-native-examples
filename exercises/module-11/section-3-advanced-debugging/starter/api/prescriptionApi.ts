/**
 * @fileoverview Mock API for fetching prescription data
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Prescription } from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Complex issue: This function has a memory leak due to recursive setTimeout
let timeoutIds: NodeJS.Timeout[] = [];
const simulateNetworkActivity = () => {
  const timeoutId = setTimeout(() => {
    console.log('Network activity simulation');
    
    // Create a large object that won't be garbage collected
    const largeObject = new Array(10000).fill('data');
    
    // Store a reference to the large object
    networkActivityData.push(largeObject);
    
    // Recursive call without cleanup
    simulateNetworkActivity();
  }, 5000);
  
  timeoutIds.push(timeoutId);
};

// Start network activity simulation
simulateNetworkActivity();

// Store network activity data
const networkActivityData: any[] = [];

// Fetch prescriptions
export const fetchPrescriptions = async (): Promise<Prescription[]> => {
  // Simulated network delay
  await delay(1000);
  
  // Generate prescription data
  const prescriptions: Prescription[] = [
    {
      id: 'rx-1',
      medication: 'Lisinopril',
      dosage: '10mg daily',
      refillsRemaining: 3,
      expiryDate: '2023-12-31',
      prescribedBy: 'Dr. Smith',
      pharmacy: 'City Pharmacy',
      lastFilled: '2023-06-15',
      instructions: 'Take one tablet by mouth once daily for high blood pressure.',
    },
    {
      id: 'rx-2',
      medication: 'Atorvastatin',
      dosage: '20mg daily',
      refillsRemaining: 5,
      expiryDate: '2024-03-15',
      prescribedBy: 'Dr. Johnson',
      pharmacy: 'MedPlus',
      lastFilled: '2023-07-01',
      instructions: 'Take one tablet by mouth at bedtime for cholesterol.',
    },
    {
      id: 'rx-3',
      medication: 'Metformin',
      dosage: '500mg twice daily',
      refillsRemaining: 2,
      expiryDate: '2023-09-30',
      prescribedBy: 'Dr. Smith',
      pharmacy: 'City Pharmacy',
      lastFilled: '2023-06-30',
      instructions: 'Take one tablet by mouth twice daily with meals for diabetes.',
    },
    {
      id: 'rx-4',
      medication: 'Levothyroxine',
      dosage: '75mcg daily',
      refillsRemaining: 6,
      expiryDate: '2024-01-15',
      prescribedBy: 'Dr. Williams',
      pharmacy: 'Health Mart',
      lastFilled: '2023-07-10',
      instructions: 'Take one tablet by mouth once daily on an empty stomach for thyroid.',
    },
    {
      id: 'rx-5',
      medication: 'Amlodipine',
      dosage: '5mg daily',
      refillsRemaining: 1,
      expiryDate: '2023-08-20',
      prescribedBy: 'Dr. Smith',
      pharmacy: 'City Pharmacy',
      lastFilled: '2023-05-20',
      instructions: 'Take one tablet by mouth once daily for high blood pressure.',
    },
    {
      id: 'rx-6',
      medication: 'Omeprazole',
      dosage: '20mg daily',
      refillsRemaining: 4,
      expiryDate: '2023-11-30',
      prescribedBy: 'Dr. Johnson',
      pharmacy: 'MedPlus',
      lastFilled: '2023-06-01',
      instructions: 'Take one capsule by mouth once daily before breakfast for acid reflux.',
    },
    {
      id: 'rx-7',
      medication: 'Sertraline',
      dosage: '50mg daily',
      refillsRemaining: 2,
      expiryDate: '2023-10-15',
      prescribedBy: 'Dr. Williams',
      pharmacy: 'Health Mart',
      lastFilled: '2023-07-15',
      instructions: 'Take one tablet by mouth once daily for depression/anxiety.',
    },
    {
      id: 'rx-8',
      medication: 'Albuterol',
      dosage: '2 puffs as needed',
      refillsRemaining: 3,
      expiryDate: '2024-02-28',
      prescribedBy: 'Dr. Smith',
      pharmacy: 'City Pharmacy',
      lastFilled: '2023-06-10',
      instructions: 'Inhale 2 puffs by mouth every 4-6 hours as needed for shortness of breath.',
    },
    {
      id: 'rx-9',
      medication: 'Hydrochlorothiazide',
      dosage: '25mg daily',
      refillsRemaining: 0,
      expiryDate: '2023-07-31',
      prescribedBy: 'Dr. Johnson',
      pharmacy: 'MedPlus',
      lastFilled: '2023-04-30',
      instructions: 'Take one tablet by mouth once daily for high blood pressure.',
    },
    {
      id: 'rx-10',
      medication: 'Gabapentin',
      dosage: '300mg three times daily',
      refillsRemaining: 5,
      expiryDate: '2024-01-31',
      prescribedBy: 'Dr. Williams',
      pharmacy: 'Health Mart',
      lastFilled: '2023-07-05',
      instructions: 'Take one capsule by mouth three times daily for nerve pain.',
    },
  ];
  
  return prescriptions;
}; 