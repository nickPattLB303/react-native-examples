import {
  generateMockUserProfile,
  generateMockMedicationReminders,
  generateMockPrescriptions,
  generateMockOrders,
} from "./mockData";
import type {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
} from "../types";

// Simulate network delay
const networkDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const DEFAULT_DELAY = 500; // 0.5 seconds

/**
 * Simulates fetching the user profile.
 * @returns {Promise<UserProfile>} A promise resolving to the mock user profile.
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  await networkDelay(DEFAULT_DELAY);
  console.log("API: fetchUserProfile called");
  return generateMockUserProfile();
};

/**
 * Simulates fetching medication reminders.
 * @param {number} count - The number of reminders to fetch.
 * @returns {Promise<MedicationReminder[]>} A promise resolving to an array of mock reminders.
 */
export const fetchMedicationReminders = async (
  count: number = 2,
): Promise<MedicationReminder[]> => {
  await networkDelay(DEFAULT_DELAY);
  console.log("API: fetchMedicationReminders called");
  return generateMockMedicationReminders(count);
};

/**
 * Simulates fetching prescriptions.
 * @param {number} count - The number of prescriptions to fetch.
 * @returns {Promise<Prescription[]>} A promise resolving to an array of mock prescriptions.
 */
export const fetchPrescriptions = async (
  count: number = 5,
): Promise<Prescription[]> => {
  await networkDelay(DEFAULT_DELAY * 1.5); // Slightly longer delay for more data
  console.log("API: fetchPrescriptions called");
  return generateMockPrescriptions(count);
};

/**
 * Simulates fetching orders.
 * @param {number} count - The number of orders to fetch.
 * @returns {Promise<Order[]>} A promise resolving to an array of mock orders.
 */
export const fetchOrders = async (count: number = 3): Promise<Order[]> => {
  await networkDelay(DEFAULT_DELAY * 1.2);
  console.log("API: fetchOrders called");
  return generateMockOrders(count);
};
