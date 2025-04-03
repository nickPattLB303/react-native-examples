/**
 * @fileoverview Simulates API calls using Faker.js to generate mock data.
 */

import { faker } from "@faker-js/faker";
import {
  DashboardData,
  Order,
  OrderStatus,
  Prescription,
  Reminder,
  UserProfile,
} from "../types";

// --- Helper Functions ---

/**
 * Simulates network latency.
 * @param {number} [duration=500] - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
const delay = (duration: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));

// --- Mock Data Generators ---

/**
 * Generates a mock UserProfile.
 * @returns {UserProfile} A mock user profile object.
 */
const generateUserProfile = (): UserProfile => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const yob = faker.number.int({ min: 1940, max: 2005 });
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    yob,
    avatarInitial: firstName.charAt(0).toUpperCase(),
  };
};

/**
 * Generates a mock Prescription.
 * @param {string} patientName - The name of the patient.
 * @returns {Prescription} A mock prescription object.
 */
const generatePrescription = (patientName: string): Prescription => {
  const drugName = faker.commerce.productName(); // Using commerce for variety
  const dosage = `${faker.number.int({ min: 5, max: 100 })} mg ${faker.helpers.arrayElement(["tablet", "capsule"])}`;
  const daysSupply = faker.number.int({ min: 5, max: 90 });
  const refills = faker.number.int({ min: 0, max: 6 });
  const hasAlert = faker.datatype.boolean(0.3); // 30% chance of an alert

  let alert: string | undefined;
  let alertType: "warning" | "info" | "error" | undefined;

  if (hasAlert) {
    const alertCase = faker.number.int({ min: 1, max: 3 });
    switch (alertCase) {
      case 1:
        alert = "Price rising";
        alertType = "warning";
        break;
      case 2:
        alert = `Save $${faker.finance.amount(5, 50, 2)} with delivery`;
        alertType = "info";
        break;
      case 3:
      default:
        alert = "Refill due soon";
        alertType = "error"; // Using error style for urgency like mockup
        break;
    }
  }

  return {
    id: faker.string.uuid(),
    drugName,
    dosage,
    estimatedDaysSupply: daysSupply,
    patientName: patientName,
    refillsRemaining: refills,
    alert,
    alertType,
  };
};

/**
 * Generates a mock Order.
 * @returns {Order} A mock order object.
 */
const generateOrder = (): Order => {
  const statusOptions: OrderStatus[] = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];
  const status = faker.helpers.arrayElement(statusOptions);
  const isShippedOrDelivered = status === "Shipped" || status === "Delivered";

  return {
    id: faker.string.uuid(),
    drugName: faker.commerce.productName(),
    dosage: `${faker.number.int({ min: 5, max: 100 })} mg ${faker.helpers.arrayElement(["tablet", "capsule"])}`,
    orderPlacedDate: faker.date.past({ years: 1 }).toISOString(),
    orderNumber: faker.string.numeric(9),
    status: status,
    trackingNumber: isShippedOrDelivered
      ? `1Z${faker.string.alphanumeric(16).toUpperCase()}`
      : undefined,
    shippingAddress: {
      line1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zip: faker.location.zipCode(),
    },
  };
};

/**
 * Generates mock Reminders.
 * @returns {Reminder[]} An array of mock reminder objects.
 */
const generateReminders = (): Reminder[] => {
  return [
    {
      id: faker.string.uuid(),
      medicationName: "Morning Medication",
      time: "9:00 AM",
    },
    {
      id: faker.string.uuid(),
      medicationName: "Evening Medication",
      time: "8:00 PM",
    },
    // Add more specific reminders if needed
    // {
    //   id: faker.string.uuid(),
    //   medicationName: faker.commerce.productName(),
    //   time: `${faker.number.int({ min: 1, max: 12 })}:00 ${faker.helpers.arrayElement(['AM', 'PM'])}`,
    // },
  ];
};

/**
 * Generates mock DashboardData.
 * @returns {DashboardData} Mock dashboard data.
 */
const generateDashboardData = (): DashboardData => ({
  currentBalanceDue: faker.datatype.boolean(0.7)
    ? 0.0
    : parseFloat(faker.finance.amount(5, 150, 2)),
  reminders: generateReminders(),
});

// --- Simulated API Fetch Functions ---

// Store generated user profile to ensure consistency across calls
let mockUserProfile: UserProfile | null = null;

/**
 * Fetches the mock user profile.
 * Generates it once and returns the same profile on subsequent calls.
 * @returns {Promise<UserProfile>} A promise resolving to the mock user profile.
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  console.log("[Mock API] Fetching user profile...");
  await delay();
  if (!mockUserProfile) {
    mockUserProfile = generateUserProfile();
    console.log("[Mock API] Generated new user profile:", mockUserProfile);
  }
  console.log("[Mock API] Returning user profile.");
  return mockUserProfile;
};

/**
 * Fetches a list of mock prescriptions for the current user.
 * @returns {Promise<Prescription[]>} A promise resolving to an array of mock prescriptions.
 */
export const fetchPrescriptions = async (): Promise<Prescription[]> => {
  console.log("[Mock API] Fetching prescriptions...");
  const user = await fetchUserProfile(); // Ensure user exists
  const patientName = `${user.firstName} (${user.yob})`;
  const numPrescriptions = faker.number.int({ min: 2, max: 5 });
  await delay();
  const prescriptions = Array.from({ length: numPrescriptions }, () =>
    generatePrescription(patientName),
  );
  console.log(`[Mock API] Returning ${prescriptions.length} prescriptions.`);
  return prescriptions;
};

/**
 * Fetches a list of mock orders.
 * @returns {Promise<Order[]>} A promise resolving to an array of mock orders.
 */
export const fetchOrders = async (): Promise<Order[]> => {
  console.log("[Mock API] Fetching orders...");
  const numOrders = faker.number.int({ min: 1, max: 4 });
  await delay();
  const orders = Array.from({ length: numOrders }, generateOrder);
  console.log(`[Mock API] Returning ${orders.length} orders.`);
  return orders;
};

/**
 * Fetches mock dashboard data.
 * @returns {Promise<DashboardData>} A promise resolving to mock dashboard data.
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  console.log("[Mock API] Fetching dashboard data...");
  await delay();
  const data = generateDashboardData();
  console.log("[Mock API] Returning dashboard data.");
  return data;
};
