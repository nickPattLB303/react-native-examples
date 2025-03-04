// types.ts
// Define the core types for the medication tracking system

// Define medication category literals
type MedicationCategory = 'antibiotic' | 'analgesic' | 'antihistamine' | 'antidepressant' | 'other';

// Define dosage unit literals
type DosageUnit = 'mg' | 'ml' | 'mcg' | 'tablet' | 'capsule';

// TODO: Define the Medication interface
// Interface should include properties like:
// - id: string or number
// - name: string
// - manufacturer: string
// - dosage: number
// - dosageUnit: DosageUnit
// - category: MedicationCategory
// - description?: string
// - contraindications?: string[]

// TODO: Define the Prescription interface
// Interface should include properties like:
// - id: string or number
// - medicationId: reference to a Medication
// - doctorName: string
// - patientName: string
// - issueDate: Date
// - instructions: string

// TODO: Define the DosageSchedule interface
// Interface should include properties like:
// - frequency: string or a specific type
// - timesPerDay: number
// - specificTimes?: string[]
// - withFood: boolean
// - specialInstructions?: string

// TODO: Define medication status
// Create a type for active, discontinued, completed, on-hold

// TODO: Create a type for tracking medication history
// Interface should include properties like:
// - timestamp: Date
// - taken: boolean
// - notes?: string

// TODO: Create a type that extends Medication to include history
// Should include the base Medication properties plus:
// - history: array of dose history
// - status: medication status
// - currentPrescription?: reference to Prescription

// TODO: Create simplified types for different views
// Create a MedicationListItem type with just the essential properties for list display

// TODO: Create a type for form data when adding medications
// Similar to Medication but without id and with optional properties

// Export your types
export {
    MedicationCategory,
    DosageUnit,
    // Add your other type exports here
}; 