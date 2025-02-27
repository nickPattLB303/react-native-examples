/**
 * @fileoverview Sample medication data provider for pharmacy application examples
 * @author React Native Training Course
 */

/**
 * Collection of sample medication data for use in training examples
 * Provides realistic pharmacy data that follows the theme requirements
 */
const MEDICATIONS = [
  {
    id: 'med-001',
    name: 'Lisinopril',
    dosage: '10mg',
    instructions: 'Take one tablet by mouth once daily',
    refillsRemaining: 3,
    type: 'prescription',
    lastDispensed: '2023-02-15',
    prescribingDoctor: 'Dr. Sarah Chen',
    sideEffects: [
      'Dizziness',
      'Headache',
      'Dry cough'
    ]
  },
  {
    id: 'med-002',
    name: 'Atorvastatin',
    dosage: '20mg',
    instructions: 'Take one tablet by mouth at bedtime',
    refillsRemaining: 1,
    type: 'prescription',
    lastDispensed: '2023-02-20',
    prescribingDoctor: 'Dr. Michael Rodriguez',
    sideEffects: [
      'Muscle pain',
      'Digestive problems',
      'Liver enzyme abnormalities'
    ]
  },
  {
    id: 'med-003',
    name: 'Metformin',
    dosage: '500mg',
    instructions: 'Take one tablet by mouth twice daily with meals',
    refillsRemaining: 5,
    type: 'prescription',
    lastDispensed: '2023-01-30',
    prescribingDoctor: 'Dr. Elizabeth Taylor',
    sideEffects: [
      'Nausea',
      'Diarrhea',
      'Decreased vitamin B-12 levels'
    ]
  },
  {
    id: 'med-004',
    name: 'Albuterol Inhaler',
    dosage: '90mcg/actuation',
    instructions: 'Inhale 2 puffs every 4-6 hours as needed for shortness of breath',
    refillsRemaining: 0,
    type: 'prescription',
    lastDispensed: '2022-12-15',
    prescribingDoctor: 'Dr. James Wilson',
    sideEffects: [
      'Nervousness',
      'Increased heart rate',
      'Tremor'
    ]
  },
  {
    id: 'med-005',
    name: 'Acetaminophen',
    dosage: '500mg',
    instructions: 'Take two tablets by mouth every 6 hours as needed for pain',
    refillsRemaining: 6,
    type: 'OTC',
    lastDispensed: '2023-02-01',
    sideEffects: [
      'Liver damage (with long-term use)',
      'Nausea',
      'Rash'
    ]
  }
];

/**
 * Get all medications in the dataset
 * @returns {Array} Array of medication objects
 */
export const getAllMedications = () => {
  return [...MEDICATIONS];
};

/**
 * Get a single medication by ID
 * @param {string} id - The ID of the medication to retrieve
 * @returns {Object|null} The medication object or null if not found
 */
export const getMedicationById = (id) => {
  return MEDICATIONS.find(med => med.id === id) || null;
};

/**
 * Get medications that need refill (less than 2 refills remaining)
 * @returns {Array} Array of medications needing refill
 */
export const getMedicationsNeedingRefill = () => {
  return MEDICATIONS.filter(med => med.refillsRemaining < 2);
};

/**
 * Get medications by type (prescription or OTC)
 * @param {string} type - The type of medications to filter for
 * @returns {Array} Array of filtered medications
 */
export const getMedicationsByType = (type) => {
  return MEDICATIONS.filter(med => med.type === type);
};

/**
 * Simulate refilling a medication
 * @param {string} id - The ID of the medication to refill
 * @returns {Object} The updated medication object
 */
export const refillMedication = (id) => {
  const index = MEDICATIONS.findIndex(med => med.id === id);
  if (index !== -1) {
    MEDICATIONS[index] = {
      ...MEDICATIONS[index],
      refillsRemaining: MEDICATIONS[index].refillsRemaining + 3,
      lastDispensed: new Date().toISOString().split('T')[0]
    };
    return MEDICATIONS[index];
  }
  return null;
};

export default {
  getAllMedications,
  getMedicationById,
  getMedicationsNeedingRefill,
  getMedicationsByType,
  refillMedication
}; 