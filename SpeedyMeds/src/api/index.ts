/**
 * Simulated API Layer for SpeedyMeds App
 *
 * This file acts as a *simulated* backend API for the application during development.
 * Instead of making real HTTP requests to a server, it uses the mock data generators
 * from `./mockData.ts` and introduces artificial network delays to mimic the
 * asynchronous nature of fetching data over a network.
 *
 * Key Goals:
 *   - Provide realistic-looking data structures (defined in `../types`).
 *   - Simulate the asynchronous behavior of network requests using Promises and delays.
 *   - Allow frontend development (UI, state management, data fetching logic) to proceed
 *     independently of a live backend.
 *   - Offer a clear separation point where real API calls would be implemented later.
 *
 * In a Production Application:
 *   - This file would be replaced or heavily modified.
 *   - Functions would use `fetch`, `axios`, or another HTTP client library to make
 *     requests to actual backend endpoints (e.g., `fetch('/api/user/profile')`).
 *   - Error handling for network issues, server errors (4xx, 5xx), and data parsing
 *     would be implemented.
 *   - Authentication tokens or credentials would likely be included in requests.
 *   - The `networkDelay` function would be removed.
 */

// Import the mock data generator functions.
import {
  generateMockUserProfile,
  generateMockMedicationReminders,
  generateMockPrescriptions,
  generateMockOrders,
} from "./mockData";

// Import the TypeScript types for the data structures we are simulating.
import type {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
} from "../types";

/**
 * @description Utility function to simulate network latency.
 * Creates a pause for a specified duration using `setTimeout` wrapped in a `Promise`.
 * This makes the simulated API functions behave asynchronously, like real network requests.
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const networkDelay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define a default delay time used by most simulated fetch functions.
const DEFAULT_DELAY = 500; // 0.5 seconds

// ============================================================================
// Simulated API Fetch Functions
// ============================================================================

/**
 * @description Simulates fetching the current user's profile data from a backend.
 * Introduces an artificial delay, then returns a generated mock UserProfile.
 *
 * `async/await` is used to handle the asynchronous `networkDelay` Promise gracefully.
 *
 * @returns {Promise<UserProfile>} A Promise that resolves with the mock UserProfile object
 *                                after the simulated delay. In a real app, this Promise
 *                                would resolve with data fetched from the server.
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  // Wait for the simulated network delay to complete.
  await networkDelay(DEFAULT_DELAY);
  // Log to the console when the simulated API call is made (useful for debugging).
  console.log("API_SIMULATION: fetchUserProfile called");
  // Generate and return the mock data.
  return generateMockUserProfile();
};

/**
 * @description Simulates fetching a list of medication reminders.
 * @param {number} [count=2] - The number of mock reminders to generate. Defaults to 2.
 * @returns {Promise<MedicationReminder[]>} A Promise resolving to an array of mock reminders.
 */
export const fetchMedicationReminders = async (
  count: number = 2,
): Promise<MedicationReminder[]> => {
  await networkDelay(DEFAULT_DELAY);
  console.log("API_SIMULATION: fetchMedicationReminders called");
  return generateMockMedicationReminders(count);
};

/**
 * @description Simulates fetching a list of prescriptions. Uses a slightly longer delay.
 * @param {number} [count=5] - The number of mock prescriptions to generate. Defaults to 5.
 * @returns {Promise<Prescription[]>} A Promise resolving to an array of mock prescriptions.
 */
export const fetchPrescriptions = async (
  count: number = 5,
): Promise<Prescription[]> => {
  // Using a slightly longer delay here just for demonstration purposes.
  await networkDelay(DEFAULT_DELAY * 1.5);
  console.log("API_SIMULATION: fetchPrescriptions called");
  return generateMockPrescriptions(count);
};

/**
 * @description Simulates fetching a list of orders. Uses a slightly different delay.
 * @param {number} [count=3] - The number of mock orders to generate. Defaults to 3.
 * @returns {Promise<Order[]>} A Promise resolving to an array of mock orders.
 */
export const fetchOrders = async (count: number = 3): Promise<Order[]> => {
  await networkDelay(DEFAULT_DELAY * 1.2);
  console.log("API_SIMULATION: fetchOrders called");
  return generateMockOrders(count);
};

// Add more simulated fetch functions here as needed for other data types.
// Example:
// export const fetchOrderDetail = async (orderId: string): Promise<Order | null> => {
//   await networkDelay(DEFAULT_DELAY);
//   console.log(`API_SIMULATION: fetchOrderDetail called for ID: ${orderId}`);
//   // In a real app, fetch the specific order. Here, we might find it in mock data or generate one.
//   const mockOrder = generateMockOrders(1)[0]; // Simplistic example
//   return { ...mockOrder, id: orderId }; // Return a modified mock or null if not found
// };
