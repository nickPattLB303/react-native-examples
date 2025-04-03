/**
 * @fileoverview Defines TypeScript types for the SpeedyMeds application data.
 */

/**
 * Represents the user's account information.
 * @interface UserProfile
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  /** Year of birth */
  yob: number;
  avatarInitial: string; // Derived from name
}

/**
 * Represents a prescription medication.
 * @interface Prescription
 */
export interface Prescription {
  id: string;
  drugName: string;
  dosage: string; // e.g., "10 mg tablet"
  estimatedDaysSupply: number;
  patientName: string; // Should ideally link to a Patient ID/object
  refillsRemaining: number;
  /** Optional alert message, e.g., price rising, low supply */
  alert?: string;
  alertType?: "warning" | "info" | "error"; // Type of alert for UI styling
}

/**
 * Represents the status steps for an order.
 */
export type OrderStatus = "Placed" | "Processing" | "Shipped" | "Delivered";

/**
 * Represents a medication order.
 * @interface Order
 */
export interface Order {
  id: string;
  drugName: string;
  dosage: string;
  orderPlacedDate: string; // ISO date string preferred
  orderNumber: string;
  status: OrderStatus;
  trackingNumber?: string;
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
}

/**
 * Represents a medication reminder.
 * @interface Reminder
 */
export interface Reminder {
  id: string;
  medicationName: string; // Could be drug name or a custom label like "Morning Meds"
  time: string; // e.g., "9:00 AM"
}

/**
 * Represents the dashboard data.
 * @interface DashboardData
 */
export interface DashboardData {
  currentBalanceDue: number;
  reminders: Reminder[];
}
