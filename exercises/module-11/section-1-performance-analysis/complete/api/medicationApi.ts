/**
 * @fileoverview Mock API for fetching medication data with performance optimization
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Medication } from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for medications to prevent regenerating data on each call
let medicationsCache: Medication[] | null = null;

// Generate a large dataset of medications
const generateMedications = (count: number): Medication[] => {
  // If we have a cache, return it
  if (medicationsCache !== null) {
    return medicationsCache;
  }
  
  console.time('generateMedications');
  
  const medications: Medication[] = [];
  
  const medicationNames = [
    'Amoxicillin', 'Lisinopril', 'Metformin', 'Atorvastatin', 
    'Amlodipine', 'Metoprolol', 'Omeprazole', 'Losartan', 
    'Albuterol', 'Gabapentin', 'Hydrochlorothiazide', 'Sertraline'
  ];
  
  const dosages = ['5mg', '10mg', '20mg', '25mg', '50mg', '100mg', '500mg', '1000mg'];
  
  const descriptions = [
    'For treatment of bacterial infections',
    'For high blood pressure management',
    'For diabetes management',
    'For cholesterol management',
    'For chest pain and high blood pressure',
    'For high blood pressure and chest pain',
    'For heartburn and acid reflux',
    'For high blood pressure and heart failure',
    'For asthma and COPD',
    'For seizures and nerve pain',
    'For high blood pressure and fluid retention',
    'For depression and anxiety'
  ];
  
  // Use a more efficient loop structure
  for (let i = 0; i < count; i++) {
    const nameIndex = i % medicationNames.length;
    const descIndex = i % descriptions.length;
    
    medications.push({
      id: `med-${i + 1}`,
      name: `${medicationNames[nameIndex]} ${String.fromCharCode(65 + (i % 26))}`,
      dosage: dosages[i % dosages.length],
      description: descriptions[descIndex],
      count: Math.floor(Math.random() * 30) + 1,
      lastRefill: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      isLowStock: Math.random() > 0.7,
      isPrescription: Math.random() > 0.4,
    });
  }
  
  // Cache the result
  medicationsCache = medications;
  
  console.timeEnd('generateMedications');
  
  return medications;
};

// Optimized API call that uses caching
export const fetchMedications = async (): Promise<Medication[]> => {
  console.time('fetchMedications');
  
  // Simulated network delay
  await delay(300); // Reduced delay for better performance
  
  // Generate or retrieve from cache
  const medications = generateMedications(500);
  
  console.timeEnd('fetchMedications');
  
  return medications;
}; 