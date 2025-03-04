/**
 * @fileoverview Medication Types Exercise - TypeScript Fundamentals
 * @module module-5-typescript-essentials
 * @version 1.1.0
 * @created 2023-08-15
 * @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */

/**
 * Key Concept: Type Aliases
 * 
 * Type aliases create a new name for a type. They're similar to interfaces,
 * but can name primitive types, unions, tuples, and other types that you'd
 * otherwise have to write by hand.
 * 
 * @example
 * type ID = string | number;
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
 */

// TODO: Create a type alias for DosageUnit that only allows specific string values
// Hint: Use union types to allow only "mg", "ml", "ug", and "tablet"
// type DosageUnit = ...

/**
 * Key Concept: Interfaces
 * 
 * Interfaces are a powerful way to define contracts in your code as well as contracts
 * with code outside of your project. They're used to define object types with specific
 * properties and their corresponding types.
 * 
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   isActive: boolean;
 * }
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
 */

// TODO: Define an interface for a Patient with properties: id, name, dateOfBirth, and allergies
// interface Patient {
//   ...
// }

/**
 * Key Concept: Property Types
 * 
 * When defining interfaces, each property can have its own type.
 * Common types include:
 * - Primitive types: string, number, boolean
 * - Object types: Object, interface, class
 * - Array types: string[], Array<string>
 * - Special types: Date, any, unknown
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html
 */

// TODO: Create an interface for a Medication with properties: id, name, dosage, unit, and sideEffects
// interface Medication {
//   ...
// }

/**
 * Key Concept: Interface Composition
 * 
 * Interfaces can be composed to build more complex types by including
 * properties from multiple interfaces or nested objects.
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types
 */

// TODO: Define a Prescription interface that includes a patient, medications, and prescription details
// interface Prescription {
//   ...
// }

// Sample data - DO NOT MODIFY
const patientData = {
  id: 12345,
  name: "Sarah Johnson",
  dateOfBirth: new Date("1985-05-15"),
  allergies: ["Penicillin", "Peanuts"]
};

const medicationsData = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: 10,
    unit: "mg",
    sideEffects: ["Dizziness", "Cough", "Headache"]
  },
  {
    id: 2,
    name: "Metformin",
    dosage: 500,
    unit: "mg",
    sideEffects: ["Nausea", "Stomach upset"]
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: 1,
    unit: "tablet",
    sideEffects: []
  }
];

const prescriptionData = {
  id: 98765,
  patient: patientData,
  medications: medicationsData,
  prescribedDate: new Date("2023-08-10"),
  refillsRemaining: 3,
  notes: "Take medications as directed."
};

/**
 * Renders patient information to the DOM
 * 
 * This function takes a patient object and displays its properties
 * in the patient-details element of the DOM.
 * 
 * @param patient The patient object containing all patient details
 * @returns {void} Does not return a value
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/functions.html
 */
function renderPatient(patient: any): void {
  const patientEl = document.getElementById('patient-details');
  if (!patientEl) return;

  patientEl.innerHTML = `
    <div class="info-item">
      <span class="label">Name:</span> ${patient.name}
    </div>
    <div class="info-item">
      <span class="label">ID:</span> ${patient.id}
    </div>
    <div class="info-item">
      <span class="label">Date of Birth:</span> 
      <span class="date">${patient.dateOfBirth.toLocaleDateString()}</span>
    </div>
    <div class="info-item">
      <span class="label">Allergies:</span> 
      ${patient.allergies.length ? patient.allergies.join(', ') : 'None'}
    </div>
  `;
}

/**
 * Renders medication list to the DOM
 * 
 * Iterates through the medications array and creates HTML elements
 * for each medication with its details.
 * 
 * @param medications Array of medication objects
 * @returns {void} Does not return a value
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#array-types
 */
function renderMedications(medications: any[]): void {
  const medicationsEl = document.getElementById('medications');
  if (!medicationsEl) return;

  medicationsEl.innerHTML = medications.map(med => `
    <div class="medication-item">
      <h3>${med.name}</h3>
      <div>
        <span class="label">Dosage:</span> ${med.dosage} ${med.unit}
      </div>
      <div>
        <span class="label">Side Effects:</span> 
        ${med.sideEffects.length ? med.sideEffects.join(', ') : 'None reported'}
      </div>
    </div>
  `).join('');
}

/**
 * Renders prescription details to the DOM
 * 
 * Takes a prescription object and displays its properties
 * in the prescription-details element.
 * 
 * @param prescription The prescription object containing all details
 * @returns {void} Does not return a value
 * 
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces-vs-intersections
 */
function renderPrescription(prescription: any): void {
  const prescriptionEl = document.getElementById('prescription-details');
  if (!prescriptionEl) return;

  prescriptionEl.innerHTML = `
    <div class="info-item">
      <span class="label">Prescription ID:</span> ${prescription.id}
    </div>
    <div class="info-item">
      <span class="label">Prescribed Date:</span> 
      <span class="date">${prescription.prescribedDate.toLocaleDateString()}</span>
    </div>
    <div class="info-item">
      <span class="label">Refills Remaining:</span> ${prescription.refillsRemaining}
    </div>
    <div class="info-item">
      <span class="label">Notes:</span> ${prescription.notes}
    </div>
  `;
}

/**
 * Key Concept: Event Listeners
 * 
 * The DOMContentLoaded event fires when the initial HTML document has been
 * completely loaded and parsed, without waiting for stylesheets, images,
 * and subframes to finish loading.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 */
// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // TODO: Add type annotations to these variables using your interfaces
  const patient = patientData;
  const medications = medicationsData;
  const prescription = prescriptionData;
  
  // Render the data to the DOM
  renderPatient(patient);
  renderMedications(medications);
  renderPrescription(prescription);
});

/**
 * Learn more about TypeScript:
 * - TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
 * - TypeScript with React: https://www.typescriptlang.org/docs/handbook/react.html
 * - TypeScript Playground: https://www.typescriptlang.org/play
 * - TypeScript Type Declaration: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
 */ 