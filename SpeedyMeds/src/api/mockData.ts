/**
 * Mock Data Generation for SpeedyMeds App
 *
 * This file uses the Faker.js library to generate realistic-looking mock data
 * for various parts of the application (user profiles, prescriptions, orders, etc.).
 * This is crucial during development and testing phases when a real backend API
 * might not be available or desirable to use. It allows developers to build and
 * test UI components with data that resembles the structure and format of real data.
 *
 * Note: This data is entirely fake and generated on the fly. It is intended for
 * development purposes only and should be replaced by actual API calls in a
 * production environment.
 *
 * @see https://fakerjs.dev/ - Official Faker.js Documentation
 */

// Import the English locale specifically from Faker.js.
// This is a performance optimization recommended by Faker.js to reduce bundle size,
// as it avoids including data for all locales if only one is needed.
// We alias `fakerEN` to `faker` for convenience.
import { fakerEN as faker } from "@faker-js/faker";

// Import the TypeScript types defined for our application data structures.
// This ensures that the generated mock data conforms to the expected shapes.
import {
  UserProfile,
  Address,
  MedicationReminder,
  Prescription,
  PrescriptionSupplyStatus,
  PrescriptionAlert,
  Order,
  OrderStatus,
} from "../types"; // Assuming types are in '../types/index.ts' or similar

// ============================================================================
// Mock Data Generator Functions
// ============================================================================

/**
 * @description Generates a single, realistic-looking mock US address object using Faker.js.
 * @returns {Address} A mock Address object conforming to the `Address` type.
 * @example
 * const mockAddress = generateMockAddress();
 * // mockAddress might be: { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210' }
 */
const generateMockAddress = (): Address => ({
  // `faker.location.streetAddress()` generates a full street address (number + name + type).
  street: faker.location.streetAddress(),
  // `faker.location.city()` generates a random city name.
  city: faker.location.city(),
  // `faker.location.state({ abbreviated: true })` generates a random US state abbreviation (e.g., 'CA').
  state: faker.location.state({ abbreviated: true }),
  // `faker.location.zipCode()` generates a standard 5-digit zip code.
  zip: faker.location.zipCode(),
});

/**
 * @description Generates a single mock UserProfile object with realistic fake data.
 * @returns {UserProfile} A mock UserProfile object conforming to the `UserProfile` type.
 */
export const generateMockUserProfile = (): UserProfile => {
  // Generate a first name.
  const firstName = faker.person.firstName();
  // Generate a last name and take only the first initial.
  const lastNameInitial = faker.person.lastName().charAt(0);
  // Generate a birth date for someone between 18 and 80 years old, then extract the year.
  const birthYear = faker.date
    .birthdate({ min: 18, max: 80, mode: "year" })
    .getFullYear();

  // Construct and return the UserProfile object.
  return {
    firstName,
    lastNameInitial,
    birthYear,
    // `faker.string.numeric(9)` generates a 9-digit numeric string.
    memberId: faker.string.numeric(9),
    // `faker.number.float()` generates a floating-point number within the specified range.
    balanceDue: faker.number.float({ min: 0, max: 150, multipleOf: 0.01 }),
  };
};

/**
 * @description Generates a specified number of mock MedicationReminder objects.
 * Includes logic to ensure specific examples from UI mockups are present if requested count allows.
 * @param {number} count - The desired number of reminder objects to generate.
 * @returns {MedicationReminder[]} An array of mock MedicationReminder objects.
 */
export const generateMockMedicationReminders = (
  count: number,
): MedicationReminder[] => {
  // Initialize an empty array to hold the generated reminders.
  const reminders: MedicationReminder[] = [];
  // Define some plausible reminder times and names.
  const times = ["9:00 AM", "12:00 PM", "5:00 PM", "8:00 PM"];
  const names = [
    "Morning Medication",
    "Midday Dose",
    "Afternoon Pill",
    "Evening Medication",
    "Bedtime Meds",
  ];

  // Loop `count` times to generate the requested number of reminders.
  for (let i = 0; i < count; i++) {
    reminders.push({
      // `faker.string.uuid()` generates a unique identifier.
      id: faker.string.uuid(),
      // `faker.helpers.arrayElement()` randomly picks one element from the provided array.
      // Add a number suffix if generating more reminders than available unique names to avoid duplicates.
      name:
        faker.helpers.arrayElement(names) +
        (count > names.length ? ` #${i + 1}` : ""),
      time: faker.helpers.arrayElement(times),
    });
  }

  // --- Mockup Consistency Logic ---
  // This section ensures that specific reminders shown in the UI mockups
  // are included in the generated data, making development/testing easier.
  // It replaces the first few generated items if the specific ones aren't already present.
  if (count >= 2 && !reminders.find((r) => r.name === "Morning Medication")) {
    reminders[0] = {
      id: faker.string.uuid(), // Generate new ID
      name: "Morning Medication",
      time: "9:00 AM",
    };
  }
  if (count >= 2 && !reminders.find((r) => r.name === "Evening Medication")) {
    reminders[1] = {
      id: faker.string.uuid(), // Generate new ID
      name: "Evening Medication",
      time: "8:00 PM",
    };
  }
  // --- End Mockup Consistency ---

  // Return only the exact number of reminders requested.
  // `slice(0, count)` handles cases where the consistency logic might have
  // temporarily added more items than requested if count was small (e.g., count=1).
  return reminders.slice(0, count);
};

/**
 * @description Generates a specified number of mock Prescription objects.
 * Includes logic to set supply status based on days remaining and ensures
 * specific examples from UI mockups are present.
 * @param {number} count - The desired number of prescription objects to generate.
 * @returns {Prescription[]} An array of mock Prescription objects.
 */
export const generateMockPrescriptions = (count: number): Prescription[] => {
  const prescriptions: Prescription[] = [];
  // Define plausible drug names, dosages, and patient names.
  const drugNames = [
    "Aripiprazole",
    "HCTZ",
    "Lisinopril",
    "Metformin",
    "Simvastatin",
    "Welchol",
    "Zocor",
    "Amoxicillin",
    "Ibuprofen",
  ];
  const dosages = [
    "10 mg tablet",
    "20 mg tablet",
    "5 mg capsule",
    "500 mg tablet",
    "40 mg tablet",
    "250 mg/5 mL suspension",
    "200 mg tablet",
  ];
  const patients = ["Terry (1974)", "Jerry (1969)", "User (Self)"]; // Example patient identifiers

  for (let i = 0; i < count; i++) {
    // Generate random days supply remaining.
    const daysSupply = faker.number.int({ min: 3, max: 90 });

    // Determine supply status based on days remaining.
    let supplyStatus = PrescriptionSupplyStatus.OK; // Default status
    if (daysSupply <= 7) {
      supplyStatus = PrescriptionSupplyStatus.CRITICAL;
    } else if (daysSupply <= 14) {
      supplyStatus = PrescriptionSupplyStatus.LOW;
    }

    // Randomly assign an alert type.
    const alertType = faker.helpers.arrayElement([
      PrescriptionAlert.NONE,
      PrescriptionAlert.PRICE_RISING,
      PrescriptionAlert.SAVINGS_AVAILABLE,
      PrescriptionAlert.NONE, // Add NONE again to make it more frequent
    ]);

    // Create the prescription object.
    prescriptions.push({
      id: faker.string.uuid(),
      drugName: faker.helpers.arrayElement(drugNames),
      dosage: faker.helpers.arrayElement(dosages),
      daysSupplyRemaining: daysSupply,
      supplyStatus, // Use the calculated status
      patientName: faker.helpers.arrayElement(patients),
      refillsRemaining: faker.number.int({ min: 0, max: 6 }),
      alert: alertType, // Use the randomly selected alert
      // Only add a savings amount if the alert type indicates savings are available.
      savingsAmount:
        alertType === PrescriptionAlert.SAVINGS_AVAILABLE
          ? faker.number.float({ min: 5, max: 50, multipleOf: 0.01 })
          : undefined, // Otherwise, savingsAmount is undefined
    });
  }

  // --- Mockup Consistency Logic ---
  // Ensure specific prescriptions from mockups are included.
  if (count >= 1 && !prescriptions.find((p) => p.drugName === "Aripiprazole")) {
    // Replace the first item with the specific Aripiprazole data.
    prescriptions[0] = {
      ...prescriptions[0], // Keep the generated ID and potentially other random fields
      drugName: "Aripiprazole",
      dosage: "10 mg tablet",
      daysSupplyRemaining: 21,
      supplyStatus: PrescriptionSupplyStatus.OK,
      patientName: "Terry (1974)",
      refillsRemaining: 1,
      alert: PrescriptionAlert.PRICE_RISING,
      savingsAmount: undefined, // Ensure savings amount is undefined if alert isn't SAVINGS_AVAILABLE
    };
  }
  if (count >= 2 && !prescriptions.find((p) => p.drugName === "HCTZ")) {
    // Replace the second item with the specific HCTZ data.
    prescriptions[1] = {
      ...prescriptions[1], // Keep the generated ID
      drugName: "HCTZ",
      dosage: "10 mg tablet",
      daysSupplyRemaining: 5,
      supplyStatus: PrescriptionSupplyStatus.CRITICAL,
      patientName: "Jerry (1969)",
      refillsRemaining: 6,
      alert: PrescriptionAlert.SAVINGS_AVAILABLE,
      savingsAmount: 38.04, // Specific savings amount from mockup
    };
  }
  // --- End Mockup Consistency ---

  return prescriptions.slice(0, count);
};

/**
 * @description Generates a specified number of mock Order objects.
 * Includes logic to conditionally generate tracking numbers based on status
 * and ensures a specific example from UI mockups is present.
 * @param {number} count - The desired number of order objects to generate.
 * @returns {Order[]} An array of mock Order objects.
 */
export const generateMockOrders = (count: number): Order[] => {
  const orders: Order[] = [];
  // Define plausible drug names, dosages, and statuses for orders.
  const drugNames = [
    "Welchol",
    "Lisinopril",
    "Atorvastatin",
    "Metoprolol",
    "Ozempic",
  ];
  const dosages = ["40 mg", "10 mg", "20 mg", "50 mg", "1 mg"];
  const statuses = [
    OrderStatus.PLACED,
    OrderStatus.PROCESSING,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED, // Added cancelled status
  ];

  for (let i = 0; i < count; i++) {
    // Randomly select an order status.
    const status = faker.helpers.arrayElement(statuses);
    // Create the order object.
    orders.push({
      id: faker.string.uuid(),
      drugName: faker.helpers.arrayElement(drugNames),
      dosage: faker.helpers.arrayElement(dosages),
      // `faker.date.past({ years: 2 })` generates a date within the last 2 years.
      orderDate: faker.date.past({ years: 2 }),
      orderNumber: faker.string.numeric(9),
      status: status, // Use the randomly selected status
      // Generate a tracking number only if the order status is SHIPPED or DELIVERED.
      trackingNumber:
        status === OrderStatus.SHIPPED || status === OrderStatus.DELIVERED
          ? `1Z${faker.string.alphanumeric(16).toUpperCase()}` // Example UPS-like format
          : undefined, // Otherwise, trackingNumber is undefined
      // Generate a mock shipping address for the order.
      shippingAddress: generateMockAddress(),
    });
  }

  // --- Mockup Consistency Logic ---
  // Ensure the specific Welchol order from the mockup is included.
  if (count >= 1 && !orders.find((o) => o.drugName === "Welchol")) {
    // Replace the first item with the specific Welchol order data.
    orders[0] = {
      ...orders[0], // Keep the generated ID
      drugName: "Welchol",
      dosage: "40 mg",
      orderDate: new Date("2022-02-05T10:00:00Z"), // Use a specific date for consistency
      orderNumber: "230084527",
      status: OrderStatus.DELIVERED,
      trackingNumber: "1Z1R034F01000000254", // Specific tracking number from mockup
      shippingAddress: {
        // Specific address from mockup
        street: "2802 Pearce Rd",
        city: "Austin",
        state: "TX",
        zip: "78730",
      },
    };
  }
  // --- End Mockup Consistency ---

  return orders.slice(0, count);
};
