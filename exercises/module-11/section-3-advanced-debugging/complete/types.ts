/**
 * @fileoverview Type definitions for the Prescription Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  refillsRemaining: number;
  expiryDate: string;
  prescribedBy: string;
  pharmacy: string;
  lastFilled: string;
  instructions: string;
} 