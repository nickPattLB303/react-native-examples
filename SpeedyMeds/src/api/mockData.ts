import { fakerEN as faker } from "@faker-js/faker";
import {
  UserProfile,
  Address,
  MedicationReminder,
  Prescription,
  PrescriptionSupplyStatus,
  PrescriptionAlert,
  Order,
  OrderStatus,
} from "../types";

/**
 * Generates a realistic street address using Faker.
 * @returns {Address} A mock Address object.
 */
const generateMockAddress = (): Address => ({
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  zip: faker.location.zipCode(),
});

/**
 * Generates a mock UserProfile.
 * @returns {UserProfile} A mock UserProfile object.
 */
export const generateMockUserProfile = (): UserProfile => {
  const firstName = faker.person.firstName();
  const lastNameInitial = faker.person.lastName().charAt(0);
  const birthYear = faker.date
    .birthdate({ min: 18, max: 80, mode: "year" })
    .getFullYear();

  return {
    firstName,
    lastNameInitial,
    birthYear,
    memberId: faker.string.numeric(9),
    balanceDue: faker.number.float({ min: 0, max: 150, multipleOf: 0.01 }),
  };
};

/**
 * Generates a list of mock MedicationReminders.
 * @param {number} count - The number of reminders to generate.
 * @returns {MedicationReminder[]} An array of mock MedicationReminder objects.
 */
export const generateMockMedicationReminders = (
  count: number,
): MedicationReminder[] => {
  const reminders: MedicationReminder[] = [];
  const times = ["9:00 AM", "12:00 PM", "5:00 PM", "8:00 PM"]; // Example times
  const names = [
    "Morning Medication",
    "Midday Dose",
    "Afternoon Pill",
    "Evening Medication",
    "Bedtime Meds",
  ];

  for (let i = 0; i < count; i++) {
    reminders.push({
      id: faker.string.uuid(),
      name:
        faker.helpers.arrayElement(names) +
        (count > names.length ? ` #${i + 1}` : ""), // Avoid duplicate names if count is high
      time: faker.helpers.arrayElement(times),
    });
  }
  // Ensure specific examples from mockups are present if needed
  if (count >= 2 && !reminders.find((r) => r.name === "Morning Medication")) {
    reminders[0] = {
      id: faker.string.uuid(),
      name: "Morning Medication",
      time: "9:00 AM",
    };
  }
  if (count >= 2 && !reminders.find((r) => r.name === "Evening Medication")) {
    reminders[1] = {
      id: faker.string.uuid(),
      name: "Evening Medication",
      time: "8:00 PM",
    };
  }
  return reminders.slice(0, count); // Return only the requested count
};

/**
 * Generates a list of mock Prescriptions.
 * @param {number} count - The number of prescriptions to generate.
 * @returns {Prescription[]} An array of mock Prescription objects.
 */
export const generateMockPrescriptions = (count: number): Prescription[] => {
  const prescriptions: Prescription[] = [];
  const drugNames = [
    "Aripiprazole",
    "HCTZ",
    "Lisinopril",
    "Metformin",
    "Simvastatin",
    "Welchol",
    "Zocor",
  ];
  const dosages = [
    "10 mg tablet",
    "20 mg tablet",
    "5 mg capsule",
    "500 mg tablet",
    "40 mg tablet",
  ];
  const patients = ["Terry (1974)", "Jerry (1969)", "User (Self)"];

  for (let i = 0; i < count; i++) {
    const daysSupply = faker.number.int({ min: 3, max: 90 });
    let supplyStatus = PrescriptionSupplyStatus.OK;
    if (daysSupply <= 7) {
      supplyStatus = PrescriptionSupplyStatus.CRITICAL;
    } else if (daysSupply <= 14) {
      supplyStatus = PrescriptionSupplyStatus.LOW;
    }

    const alertType = faker.helpers.arrayElement([
      PrescriptionAlert.NONE,
      PrescriptionAlert.PRICE_RISING,
      PrescriptionAlert.SAVINGS_AVAILABLE,
    ]);

    prescriptions.push({
      id: faker.string.uuid(),
      drugName: faker.helpers.arrayElement(drugNames),
      dosage: faker.helpers.arrayElement(dosages),
      daysSupplyRemaining: daysSupply,
      supplyStatus,
      patientName: faker.helpers.arrayElement(patients),
      refillsRemaining: faker.number.int({ min: 0, max: 6 }),
      alert: alertType,
      savingsAmount:
        alertType === PrescriptionAlert.SAVINGS_AVAILABLE
          ? faker.number.float({ min: 5, max: 50, multipleOf: 0.01 })
          : undefined,
    });
  }

  // Ensure specific examples from mockups are present
  if (count >= 1 && !prescriptions.find((p) => p.drugName === "Aripiprazole")) {
    prescriptions[0] = {
      ...prescriptions[0],
      drugName: "Aripiprazole",
      dosage: "10 mg tablet",
      daysSupplyRemaining: 21,
      supplyStatus: PrescriptionSupplyStatus.OK,
      patientName: "Terry (1974)",
      refillsRemaining: 1,
      alert: PrescriptionAlert.PRICE_RISING,
    };
  }
  if (count >= 2 && !prescriptions.find((p) => p.drugName === "HCTZ")) {
    prescriptions[1] = {
      ...prescriptions[1],
      drugName: "HCTZ",
      dosage: "10 mg tablet",
      daysSupplyRemaining: 5,
      supplyStatus: PrescriptionSupplyStatus.CRITICAL,
      patientName: "Jerry (1969)",
      refillsRemaining: 6,
      alert: PrescriptionAlert.SAVINGS_AVAILABLE,
      savingsAmount: 38.04,
    };
  }

  return prescriptions.slice(0, count);
};

/**
 * Generates a list of mock Orders.
 * @param {number} count - The number of orders to generate.
 * @returns {Order[]} An array of mock Order objects.
 */
export const generateMockOrders = (count: number): Order[] => {
  const orders: Order[] = [];
  const drugNames = ["Welchol", "Lisinopril", "Atorvastatin", "Metoprolol"];
  const dosages = ["40 mg", "10 mg", "20 mg", "50 mg"];
  const statuses = [
    OrderStatus.PLACED,
    OrderStatus.PROCESSING,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ];

  for (let i = 0; i < count; i++) {
    const status = faker.helpers.arrayElement(statuses);
    orders.push({
      id: faker.string.uuid(),
      drugName: faker.helpers.arrayElement(drugNames),
      dosage: faker.helpers.arrayElement(dosages),
      orderDate: faker.date.past({ years: 2 }),
      orderNumber: faker.string.numeric(9),
      status: status,
      trackingNumber:
        status === OrderStatus.SHIPPED || status === OrderStatus.DELIVERED
          ? `1Z${faker.string.alphanumeric(16).toUpperCase()}`
          : undefined,
      shippingAddress: generateMockAddress(),
    });
  }

  // Ensure specific example from mockup is present
  if (count >= 1 && !orders.find((o) => o.drugName === "Welchol")) {
    orders[0] = {
      ...orders[0],
      drugName: "Welchol",
      dosage: "40 mg",
      orderDate: new Date("2022-02-05T10:00:00Z"), // Set specific date
      orderNumber: "230084527",
      status: OrderStatus.DELIVERED,
      trackingNumber: "1Z1R034F01000000254",
      shippingAddress: {
        street: "2802 Pearce Rd",
        city: "Austin",
        state: "TX",
        zip: "78730",
      },
    };
  }

  return orders.slice(0, count);
};
