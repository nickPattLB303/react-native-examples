/**
 * Represents a user profile.
 */
export interface UserProfile {
  /** The user's first name. */
  firstName: string;
  /** The user's last name initial. */
  lastNameInitial: string;
  /** The user's birth year. */
  birthYear: number;
  /** The unique member identifier. */
  memberId: string;
  /** The user's current account balance due. */
  balanceDue: number;
}

/**
 * Represents a shipping or billing address.
 */
export interface Address {
  /** Street address line 1. */
  street: string;
  /** City name. */
  city: string;
  /** State abbreviation (e.g., "TX"). */
  state: string;
  /** ZIP code. */
  zip: string;
}

/**
 * Represents a medication reminder.
 */
export interface MedicationReminder {
  /** Unique identifier for the reminder. */
  id: string;
  /** Name or description of the reminder (e.g., "Morning Medication"). */
  name: string;
  /** The time for the reminder (e.g., "9:00 AM"). */
  time: string;
}

/**
 * Represents the status of a prescription based on days supply.
 */
export enum PrescriptionSupplyStatus {
  OK = "OK",
  LOW = "LOW",
  CRITICAL = "CRITICAL",
}

/**
 * Represents potential alerts or contextual info for a prescription.
 */
export enum PrescriptionAlert {
  NONE = "NONE",
  PRICE_RISING = "PRICE_RISING",
  SAVINGS_AVAILABLE = "SAVINGS_AVAILABLE",
}

/**
 * Represents a single prescription.
 */
export interface Prescription {
  /** Unique identifier for the prescription. */
  id: string;
  /** The name of the medication. */
  drugName: string;
  /** Dosage information (e.g., "10 mg tablet"). */
  dosage: string;
  /** Estimated number of days supply remaining. */
  daysSupplyRemaining: number;
  /** Status based on days supply. */
  supplyStatus: PrescriptionSupplyStatus;
  /** Name of the patient this prescription is for. */
  patientName: string;
  /** Number of refills remaining. */
  refillsRemaining: number;
  /** Any relevant alerts for this prescription. */
  alert: PrescriptionAlert;
  /** Potential savings amount, if alert is SAVINGS_AVAILABLE. */
  savingsAmount?: number;
}

/**
 * Represents the status of an order shipment.
 */
export enum OrderStatus {
  PLACED = "Placed",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
}

/**
 * Represents a medication order.
 */
export interface Order {
  /** Unique identifier for the order. */
  id: string;
  /** Name of the medication ordered. */
  drugName: string;
  /** Dosage information for the ordered medication. */
  dosage: string;
  /** Date the order was placed. */
  orderDate: Date;
  /** The order confirmation number. */
  orderNumber: string;
  /** Current status of the order shipment. */
  status: OrderStatus;
  /** Tracking number for the shipment, if available. */
  trackingNumber?: string;
  /** Shipping address for the order. */
  shippingAddress: Address;
}
