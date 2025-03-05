/**
 * @fileoverview Type definitions for the Medication Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  description: string;
  count: number;
  lastRefill: string;
  isLowStock: boolean;
  isPrescription: boolean;
} 