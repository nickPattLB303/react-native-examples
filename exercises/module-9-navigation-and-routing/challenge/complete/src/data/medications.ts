/**
 * Sample medication data
 * 
 * This file contains sample medication data to use in the app.
 */

export interface Medication {
  id: string;
  name: string;
  description: string;
  price: number;
  dosage: string;
  manufacturer: string;
  requiresPrescription: boolean;
  inStock: boolean;
  imageUrl?: string;
}

const medications: Medication[] = [
  {
    id: '1',
    name: 'Aspirin',
    description: 'Pain reliever and fever reducer. Used to treat mild to moderate pain, and also to reduce fever and inflammation.',
    price: 5.99,
    dosage: '325mg tablets',
    manufacturer: 'Bayer',
    requiresPrescription: false,
    inStock: true,
  },
  {
    id: '2',
    name: 'Amoxicillin',
    description: 'Antibiotic used to treat a number of bacterial infections. It is a penicillin antibiotic.',
    price: 12.99,
    dosage: '500mg capsules',
    manufacturer: 'Pfizer',
    requiresPrescription: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Lisinopril',
    description: 'Used to treat high blood pressure (hypertension) and heart failure. It is an ACE inhibitor.',
    price: 8.50,
    dosage: '10mg tablets',
    manufacturer: 'Merck',
    requiresPrescription: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Ibuprofen',
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) used for treating pain, fever, and inflammation.',
    price: 4.99,
    dosage: '200mg tablets',
    manufacturer: 'Advil',
    requiresPrescription: false,
    inStock: true,
  },
  {
    id: '5',
    name: 'Metformin',
    description: 'First-line medication for the treatment of type 2 diabetes. It helps reduce blood sugar levels.',
    price: 7.25,
    dosage: '500mg tablets',
    manufacturer: 'Glucophage',
    requiresPrescription: true,
    inStock: false,
  },
];

export default medications; 