/**
 * @fileoverview Type definitions for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

// Medication data structure
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  refillsRemaining: number;
  lastRefillDate: string;
  expiryDate: string;
  instructions: string;
  sideEffects: string[];
  interactions: string[];
  isLowStock: boolean;
}

// Health vitals data structure
export interface VitalReading {
  id: string;
  type: VitalType;
  value: number;
  unit: string;
  timestamp: string;
  notes?: string;
  isNormal: boolean;
}

// Types of health vitals
export enum VitalType {
  BLOOD_PRESSURE = 'Blood Pressure',
  HEART_RATE = 'Heart Rate',
  BLOOD_GLUCOSE = 'Blood Glucose',
  TEMPERATURE = 'Temperature',
  OXYGEN_SATURATION = 'Oxygen Saturation',
  WEIGHT = 'Weight'
}

// Appointment data structure
export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  purpose: string;
  notes?: string;
  reminderSet: boolean;
}

// User profile data structure
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  emergencyContacts: EmergencyContact[];
}

// Emergency contact data structure
export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
} 