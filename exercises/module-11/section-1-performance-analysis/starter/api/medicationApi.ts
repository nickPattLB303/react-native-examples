/**
 * @fileoverview Mock API for fetching medication data
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Medication } from '../types';

// Simulated API delay - inefficient implementation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a large dataset of medications
const generateMedications = (count: number): Medication[] => {
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
  
  return medications;
};

// Inefficient API call that generates a large dataset every time
export const fetchMedications = async (): Promise<Medication[]> => {
  // Simulated network delay
  await delay(1000);
  
  // Generate a large dataset
  const medications = generateMedications(500);
  
  return medications;
}; 