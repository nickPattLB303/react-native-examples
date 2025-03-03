/**
 * @fileoverview Medication Types Exercise - TypeScript Fundamentals
 * @created 2023-08-15
 */

// TODO: Create a type alias for DosageUnit that only allows specific string values
// Hint: Use union types to allow only "mg", "ml", "µg", and "tablet"
// type DosageUnit = ...

// TODO: Define an interface for a Patient with properties: id, name, dateOfBirth, and allergies
// interface Patient {
//   ...
// }

// TODO: Create an interface for a Medication with properties: id, name, dosage, unit, and sideEffects
// interface Medication {
//   ...
// }

// TODO: Define a Prescription interface that includes a patient, medications, and prescription details
// interface Prescription {
//   ...
// }

// Sample data - DO NOT MODIFY
// Note: For CodePen, the type assertions will be needed once you implement the types
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
    unit: "mg", // This will need a type assertion when you define DosageUnit
    sideEffects: ["Dizziness", "Cough", "Headache"]
  },
  {
    id: 2,
    name: "Metformin",
    dosage: 500,
    unit: "mg", // This will need a type assertion when you define DosageUnit
    sideEffects: ["Nausea", "Stomach upset"]
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: 1,
    unit: "tablet", // This will need a type assertion when you define DosageUnit
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
 * @param patient The patient object containing all patient details
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
 * @param medications Array of medication objects
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
 * @param prescription The prescription object containing all details
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