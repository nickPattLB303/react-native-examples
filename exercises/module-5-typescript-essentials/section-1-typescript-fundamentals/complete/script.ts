/**
 * @fileoverview Medication Types Exercise - TypeScript Fundamentals
 * @created 2023-08-15
 */

// Type alias for DosageUnit using union types
type DosageUnit = "mg" | "ml" | "ug" | "tablet";

// Interface for Patient with required properties
interface Patient {
  id: number;
  name: string;
  dateOfBirth: Date;
  allergies: string[];
}

// Interface for Medication with required properties
interface Medication {
  id: number;
  name: string;
  dosage: number;
  unit: DosageUnit;
  sideEffects: string[];
}

// Interface for Prescription that includes patient, medications, and other details
interface Prescription {
  id: number;
  patient: Patient;
  medications: Medication[];
  prescribedDate: Date;
  refillsRemaining: number;
  notes: string;
}

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
 * @param patient The patient object containing all patient details
 */
function renderPatient(patient: Patient): void {
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
function renderMedications(medications: Medication[]): void {
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
function renderPrescription(prescription: Prescription): void {
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
  // Adding proper type annotations to our variables
  const patient: Patient = patientData;
  const medications: Medication[] = medicationsData;
  const prescription: Prescription = prescriptionData;
  
  // Render the data to the DOM
  renderPatient(patient);
  renderMedications(medications);
  renderPrescription(prescription);
}); 