/**
 * @fileoverview API module for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { Medication, VitalReading, VitalType, Appointment, UserProfile } from '../types';

// BUG: This delay function doesn't properly handle errors
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data cache that grows indefinitely - memory leak
let dataCache: any[] = [];

// Timers that are never cleaned up - memory leak
const timers: NodeJS.Timeout[] = [];

// BUG: This function creates a memory leak by continuously adding data to the cache
const cacheData = (data: any) => {
  // Create a deep copy with unnecessary duplication 
  const dataCopy = JSON.parse(JSON.stringify(data));
  
  // Add metadata that's never used
  dataCopy.meta = {
    cached: new Date().toISOString(),
    accessed: 0,
    size: JSON.stringify(dataCopy).length
  };
  
  // Push to cache
  dataCache.push(dataCopy);
  
  // Set up recursive timer that's never cleaned up
  const timer = setTimeout(() => {
    dataCopy.meta.accessed += 1;
    // Create another object for no reason
    const accessLog = {
      data: dataCopy,
      accessedAt: new Date().toISOString()
    };
    dataCache.push(accessLog);
    cacheData(accessLog); // Recursive call creating more memory issues
  }, 60000);
  
  timers.push(timer);
};

// Mock medications data
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    purpose: 'Blood pressure control',
    refillsRemaining: 3,
    lastRefillDate: '2023-06-01',
    expiryDate: '2023-12-01',
    instructions: 'Take with or without food at the same time each day.',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
    interactions: ['Potassium supplements', 'NSAIDs'],
    isLowStock: false
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    purpose: 'Diabetes management',
    refillsRemaining: 1,
    lastRefillDate: '2023-05-15',
    expiryDate: '2023-08-15',
    instructions: 'Take with meals to minimize stomach upset.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach pain'],
    interactions: ['Alcohol', 'Certain contrast dyes'],
    isLowStock: true
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    purpose: 'Cholesterol reduction',
    refillsRemaining: 5,
    lastRefillDate: '2023-06-10',
    expiryDate: '2024-01-10',
    instructions: 'Take in the evening.',
    sideEffects: ['Muscle pain', 'Joint pain', 'Upset stomach'],
    interactions: ['Grapefruit juice', 'Certain antibiotics'],
    isLowStock: false
  },
  {
    id: '4',
    name: 'Levothyroxine',
    dosage: '75mcg',
    frequency: 'Once daily',
    purpose: 'Thyroid replacement',
    refillsRemaining: 0,
    lastRefillDate: '2023-04-01',
    expiryDate: '2023-07-01',
    instructions: 'Take on an empty stomach, 30-60 minutes before breakfast.',
    sideEffects: ['Insomnia', 'Nervousness', 'Weight loss'],
    interactions: ['Calcium supplements', 'Iron supplements'],
    isLowStock: true
  },
  {
    id: '5',
    name: 'Sertraline',
    dosage: '50mg',
    frequency: 'Once daily',
    purpose: 'Depression/anxiety',
    refillsRemaining: 2,
    lastRefillDate: '2023-05-20',
    expiryDate: '2023-11-20',
    instructions: 'May be taken with or without food.',
    sideEffects: ['Nausea', 'Dry mouth', 'Insomnia', 'Dizziness'],
    interactions: ['MAOIs', 'Alcohol', 'NSAIDs'],
    isLowStock: false
  }
];

// Mock vital readings data
const mockVitalReadings: VitalReading[] = [
  {
    id: '1',
    type: VitalType.BLOOD_PRESSURE,
    value: 120,
    unit: 'mmHg',
    timestamp: '2023-06-28T08:00:00Z',
    notes: 'Morning reading before breakfast',
    isNormal: true
  },
  {
    id: '2',
    type: VitalType.HEART_RATE,
    value: 72,
    unit: 'bpm',
    timestamp: '2023-06-28T08:05:00Z',
    isNormal: true
  },
  {
    id: '3',
    type: VitalType.BLOOD_GLUCOSE,
    value: 110,
    unit: 'mg/dL',
    timestamp: '2023-06-28T08:30:00Z',
    notes: 'Fasting',
    isNormal: true
  },
  {
    id: '4',
    type: VitalType.TEMPERATURE,
    value: 98.6,
    unit: '°F',
    timestamp: '2023-06-28T12:00:00Z',
    isNormal: true
  },
  {
    id: '5',
    type: VitalType.OXYGEN_SATURATION,
    value: 97,
    unit: '%',
    timestamp: '2023-06-28T12:05:00Z',
    isNormal: true
  },
  {
    id: '6',
    type: VitalType.WEIGHT,
    value: 160,
    unit: 'lbs',
    timestamp: '2023-06-28T07:30:00Z',
    isNormal: true
  },
  {
    id: '7',
    type: VitalType.BLOOD_PRESSURE,
    value: 135,
    unit: 'mmHg',
    timestamp: '2023-06-28T18:00:00Z',
    notes: 'Evening reading after exercise',
    isNormal: false
  }
];

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2023-07-15',
    time: '10:00 AM',
    location: 'Heart Health Clinic, 123 Medical Way',
    purpose: 'Annual heart checkup',
    notes: 'Bring recent EKG results',
    reminderSet: true
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Endocrinology',
    date: '2023-07-22',
    time: '2:30 PM',
    location: 'Diabetes Care Center, 456 Health Street',
    purpose: 'Diabetes management',
    reminderSet: true
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    date: '2023-08-05',
    time: '1:15 PM',
    location: 'Clear Skin Clinic, 789 Wellness Blvd',
    purpose: 'Skin examination',
    notes: 'Discuss new medication for eczema',
    reminderSet: false
  }
];

// Mock user profile
const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Jamie Smith',
  age: 42,
  gender: 'Non-binary',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts', 'Latex'],
  conditions: ['Hypertension', 'Type 2 Diabetes', 'Asthma'],
  emergencyContacts: [
    {
      id: '1',
      name: 'Alex Smith',
      relationship: 'Spouse',
      phoneNumber: '555-123-4567'
    },
    {
      id: '2',
      name: 'Jordan Smith',
      relationship: 'Child',
      phoneNumber: '555-987-6543'
    }
  ]
};

// BUG: API call with error simulation but no error handling
export const fetchMedications = async (): Promise<Medication[]> => {
  console.log('Fetching medications data...');
  
  // Simulate network delay
  await delay(1500);
  
  // 20% chance of error
  if (Math.random() < 0.2) {
    throw new Error('Failed to fetch medications');
  }
  
  // Cache the data (memory leak)
  cacheData(mockMedications);
  
  return mockMedications;
};

// BUG: API call with nested promises causing potential memory issues
export const fetchVitalReadings = async (): Promise<VitalReading[]> => {
  console.log('Fetching vital readings data...');
  
  // Problematic promise chain
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create unnecessary nested promise
      new Promise<VitalReading[]>((innerResolve) => {
        setTimeout(() => {
          // Cache the data (memory leak)
          cacheData(mockVitalReadings);
          innerResolve(mockVitalReadings);
        }, 800);
      }).then((data) => {
        // Process data unnecessarily
        const processedData = data.map(item => ({
          ...item,
          // Add processed flag that's never used
          processed: true
        }));
        
        // Cache processed data too (more memory leaks)
        cacheData(processedData);
        
        // Finally resolve
        resolve(mockVitalReadings);
      });
    }, 700);
  });
};

// BUG: API call that handles errors incorrectly
export const fetchAppointments = async (): Promise<Appointment[]> => {
  console.log('Fetching appointments data...');
  
  try {
    // Simulate network delay
    await delay(1000);
    
    // 30% chance of error
    if (Math.random() < 0.3) {
      throw new Error('Failed to fetch appointments');
    }
    
    // Cache the data (memory leak)
    cacheData(mockAppointments);
    
    return mockAppointments;
  } catch (error) {
    // BUG: This logs the error but doesn't properly propagate it
    console.error('Error fetching appointments:', error);
    // BUG: Returns empty array instead of propagating error
    return [];
  }
};

// BUG: API call that creates a memory leak with event listeners
export const fetchUserProfile = async (): Promise<UserProfile> => {
  console.log('Fetching user profile data...');
  
  // Create a fake event emitter for the 'progress' events
  const progressListeners: (() => void)[] = [];
  
  // BUG: Add event listeners that are never removed
  for (let i = 0; i < 5; i++) {
    const listener = () => {
      console.log(`Profile data loading: ${i * 20}%`);
      // Create large objects in each listener
      const progressData = {
        timestamp: new Date().toISOString(),
        progress: i * 20,
        details: new Array(10000).fill('x').join('')
      };
      // Cache these large objects
      dataCache.push(progressData);
    };
    
    progressListeners.push(listener);
    // Call each listener
    listener();
  }
  
  // Simulate network delay
  await delay(1200);
  
  // Cache the data (memory leak)
  cacheData(mockUserProfile);
  
  return mockUserProfile;
}; 