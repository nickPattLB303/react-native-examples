/**
 * Medication Data
 * 
 * This file contains sample medication data for use in exercises and challenges
 * throughout the React Native Training Course.
 * 
 * Note: This data is fictional and for educational purposes only.
 */

export interface Medication {
  /** Unique identifier for the medication */
  id: string;
  /** Brand name of the medication */
  brandName: string;
  /** Generic name of the medication */
  genericName: string;
  /** Medication strength (e.g., "10mg", "100mg/5ml") */
  strength: string;
  /** Dosage form (e.g., tablet, capsule, liquid) */
  form: MedicationForm;
  /** Medication classification/category */
  category: MedicationCategory;
  /** Brief description of what the medication is used for */
  description: string;
  /** Detailed usage instructions */
  directions: string;
  /** Common side effects */
  sideEffects: string[];
  /** Warnings and precautions */
  warnings: string[];
  /** URL to the medication image */
  imageUrl: string;
  /** Whether the medication requires a prescription */
  requiresPrescription: boolean;
  /** Price in USD */
  price: number;
  /** Current stock level */
  inStock: number;
  /** Manufacturer name */
  manufacturer: string;
}

export enum MedicationForm {
  TABLET = "Tablet",
  CAPSULE = "Capsule",
  LIQUID = "Liquid",
  CREAM = "Cream",
  OINTMENT = "Ointment",
  PATCH = "Patch",
  INJECTION = "Injection",
  INHALER = "Inhaler",
  SPRAY = "Spray",
  DROPS = "Drops",
  POWDER = "Powder",
  SUPPOSITORY = "Suppository"
}

export enum MedicationCategory {
  ANALGESIC = "Analgesic",
  ANTIBIOTIC = "Antibiotic",
  ANTIHISTAMINE = "Antihistamine",
  ANTIHYPERTENSIVE = "Antihypertensive",
  ANTIINFLAMMATORY = "Anti-inflammatory",
  ANTIDEPRESSANT = "Antidepressant",
  ANTIDIABETIC = "Antidiabetic",
  ANTICOAGULANT = "Anticoagulant",
  BRONCHODILATOR = "Bronchodilator",
  DECONGESTANT = "Decongestant",
  DIURETIC = "Diuretic",
  HORMONE = "Hormone",
  IMMUNOSUPPRESSANT = "Immunosuppressant",
  SEDATIVE = "Sedative",
  STATIN = "Statin",
  SUPPLEMENT = "Supplement",
  VACCINE = "Vaccine"
}

export interface Prescription {
  /** Unique identifier for the prescription */
  id: string;
  /** Reference to the medication */
  medicationId: string;
  /** Patient information */
  patient: Patient;
  /** Prescribing doctor */
  doctor: string;
  /** Date the prescription was written */
  dateIssued: string;
  /** Date the prescription expires */
  dateExpires: string;
  /** Number of refills allowed */
  refills: number;
  /** Number of refills remaining */
  refillsRemaining: number;
  /** Special instructions from the doctor */
  instructions: string;
  /** Whether the prescription has been filled */
  isFilled: boolean;
  /** Date the prescription was last filled */
  lastFillDate?: string;
  /** Pharmacy where the prescription was filled */
  filledAt?: string;
}

export interface Patient {
  /** Unique identifier for the patient */
  id: string;
  /** Patient's first name */
  firstName: string;
  /** Patient's last name */
  lastName: string;
  /** Patient's date of birth */
  dateOfBirth: string;
  /** Patient's contact information */
  contact: {
    /** Phone number */
    phone: string;
    /** Email address */
    email: string;
    /** Physical address */
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  /** Patient's insurance information */
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  /** Patient's allergies */
  allergies: string[];
  /** Patient's current medications */
  currentMedications: string[];
}

export interface Pharmacy {
  /** Unique identifier for the pharmacy */
  id: string;
  /** Pharmacy name */
  name: string;
  /** Pharmacy location */
  location: {
    /** Street address */
    address: string;
    /** City */
    city: string;
    /** State */
    state: string;
    /** ZIP code */
    zipCode: string;
    /** Latitude */
    latitude: number;
    /** Longitude */
    longitude: number;
  };
  /** Contact information */
  contact: {
    /** Phone number */
    phone: string;
    /** Email address */
    email: string;
    /** Website URL */
    website: string;
  };
  /** Operating hours */
  hours: {
    /** Monday hours (e.g., "9:00 AM - 9:00 PM") */
    monday: string;
    /** Tuesday hours */
    tuesday: string;
    /** Wednesday hours */
    wednesday: string;
    /** Thursday hours */
    thursday: string;
    /** Friday hours */
    friday: string;
    /** Saturday hours */
    saturday: string;
    /** Sunday hours */
    sunday: string;
  };
  /** Services offered by the pharmacy */
  services: string[];
  /** Whether the pharmacy offers delivery */
  offersDelivery: boolean;
  /** Whether the pharmacy has a drive-through */
  hasDriveThrough: boolean;
  /** Whether the pharmacy is currently open */
  isOpen: boolean;
  /** Average rating (1-5) */
  rating: number;
}

/**
 * Sample medication data
 */
export const medications: Medication[] = [
  {
    id: "med-001",
    brandName: "Healix",
    genericName: "acetaminophen",
    strength: "500mg",
    form: MedicationForm.TABLET,
    category: MedicationCategory.ANALGESIC,
    description: "Pain reliever and fever reducer",
    directions: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    sideEffects: [
      "Nausea",
      "Stomach pain",
      "Loss of appetite",
      "Headache"
    ],
    warnings: [
      "Liver warning: This product contains acetaminophen. Severe liver damage may occur if you take more than the maximum daily amount",
      "Do not use with other drugs containing acetaminophen",
      "Consult a doctor if symptoms persist for more than 10 days"
    ],
    imageUrl: "https://example.com/images/healix.jpg",
    requiresPrescription: false,
    price: 8.99,
    inStock: 150,
    manufacturer: "PharmaCorp Inc."
  },
  {
    id: "med-002",
    brandName: "Antibioguard",
    genericName: "amoxicillin",
    strength: "500mg",
    form: MedicationForm.CAPSULE,
    category: MedicationCategory.ANTIBIOTIC,
    description: "Antibiotic used to treat a variety of bacterial infections",
    directions: "Take 1 capsule every 8 hours with food for 10 days. Complete the full course even if you feel better.",
    sideEffects: [
      "Diarrhea",
      "Stomach pain",
      "Nausea",
      "Vomiting",
      "Rash"
    ],
    warnings: [
      "Allergic reaction warning: Do not use if you are allergic to penicillin antibiotics",
      "May reduce the effectiveness of birth control pills",
      "Contact doctor immediately if you develop severe diarrhea"
    ],
    imageUrl: "https://example.com/images/antibioguard.jpg",
    requiresPrescription: true,
    price: 15.49,
    inStock: 75,
    manufacturer: "MediScience Labs"
  },
  {
    id: "med-003",
    brandName: "Allerclear",
    genericName: "cetirizine",
    strength: "10mg",
    form: MedicationForm.TABLET,
    category: MedicationCategory.ANTIHISTAMINE,
    description: "24-hour allergy relief medication",
    directions: "Take 1 tablet daily with or without food. Do not take more than 1 tablet in 24 hours.",
    sideEffects: [
      "Drowsiness",
      "Dry mouth",
      "Fatigue",
      "Headache"
    ],
    warnings: [
      "May cause drowsiness. Avoid driving or operating heavy machinery until you know how this medication affects you",
      "Avoid alcohol consumption while taking this medication",
      "Consult a doctor before use if you have liver or kidney disease"
    ],
    imageUrl: "https://example.com/images/allerclear.jpg",
    requiresPrescription: false,
    price: 12.99,
    inStock: 100,
    manufacturer: "AllergenRx"
  },
  {
    id: "med-004",
    brandName: "Cardiocare",
    genericName: "lisinopril",
    strength: "10mg",
    form: MedicationForm.TABLET,
    category: MedicationCategory.ANTIHYPERTENSIVE,
    description: "ACE inhibitor used to treat high blood pressure and heart failure",
    directions: "Take 1 tablet daily at the same time each day, with or without food.",
    sideEffects: [
      "Dizziness",
      "Headache",
      "Dry cough",
      "Fatigue",
      "Nausea"
    ],
    warnings: [
      "Do not use if pregnant or planning to become pregnant",
      "May cause a serious drop in blood pressure, especially when starting treatment",
      "Contact doctor immediately if you experience swelling of the face, lips, tongue, or throat"
    ],
    imageUrl: "https://example.com/images/cardiocare.jpg",
    requiresPrescription: true,
    price: 18.75,
    inStock: 60,
    manufacturer: "HeartHealth Pharmaceuticals"
  },
  {
    id: "med-005",
    brandName: "Glucobalance",
    genericName: "metformin",
    strength: "500mg",
    form: MedicationForm.TABLET,
    category: MedicationCategory.ANTIDIABETIC,
    description: "Oral diabetes medication that helps control blood sugar levels",
    directions: "Take 1 tablet twice daily with meals. Your doctor may gradually increase your dose.",
    sideEffects: [
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Stomach pain",
      "Metallic taste"
    ],
    warnings: [
      "Rare but serious side effect: lactic acidosis. Seek immediate medical attention if you experience unusual muscle pain, trouble breathing, or unusual tiredness",
      "Avoid excessive alcohol consumption",
      "Should be temporarily discontinued for procedures using iodinated contrast"
    ],
    imageUrl: "https://example.com/images/glucobalance.jpg",
    requiresPrescription: true,
    price: 14.50,
    inStock: 85,
    manufacturer: "DiabetaCare Inc."
  },
  {
    id: "med-006",
    brandName: "Respirease",
    genericName: "albuterol",
    strength: "90mcg/actuation",
    form: MedicationForm.INHALER,
    category: MedicationCategory.BRONCHODILATOR,
    description: "Bronchodilator that relaxes muscles in the airways to improve breathing",
    directions: "Inhale 2 puffs every 4-6 hours as needed. For prevention of exercise-induced bronchospasm, use 2 puffs 15-30 minutes before exercise.",
    sideEffects: [
      "Nervousness",
      "Tremor",
      "Headache",
      "Rapid heartbeat",
      "Throat irritation"
    ],
    warnings: [
      "Excessive use may lead to worsening symptoms or decreased effectiveness",
      "Seek immediate medical attention if breathing problems worsen or do not improve after using this medication",
      "Tell your doctor if you have heart disease, high blood pressure, or diabetes"
    ],
    imageUrl: "https://example.com/images/respirease.jpg",
    requiresPrescription: true,
    price: 45.99,
    inStock: 30,
    manufacturer: "RespiCare Therapeutics"
  },
  {
    id: "med-007",
    brandName: "Sleepwell",
    genericName: "diphenhydramine",
    strength: "25mg",
    form: MedicationForm.CAPSULE,
    category: MedicationCategory.SEDATIVE,
    description: "Nighttime sleep aid that helps with occasional sleeplessness",
    directions: "Take 1-2 capsules at bedtime if needed, or as directed by a doctor.",
    sideEffects: [
      "Drowsiness",
      "Dizziness",
      "Dry mouth",
      "Blurred vision",
      "Constipation"
    ],
    warnings: [
      "Do not drive or operate heavy machinery after taking this medication",
      "Avoid alcoholic beverages while taking this product",
      "Do not use with other products containing diphenhydramine",
      "Not for use in children under 12 years of age"
    ],
    imageUrl: "https://example.com/images/sleepwell.jpg",
    requiresPrescription: false,
    price: 9.99,
    inStock: 120,
    manufacturer: "RestoreSleep Labs"
  },
  {
    id: "med-008",
    brandName: "Cholestaway",
    genericName: "atorvastatin",
    strength: "20mg",
    form: MedicationForm.TABLET,
    category: MedicationCategory.STATIN,
    description: "Statin medication used to lower cholesterol and reduce the risk of heart disease",
    directions: "Take 1 tablet once daily, preferably in the evening. May be taken with or without food.",
    sideEffects: [
      "Muscle pain or weakness",
      "Joint pain",
      "Diarrhea",
      "Nausea",
      "Headache"
    ],
    warnings: [
      "Tell your doctor about all medications you are taking, as some may interact with this medication",
      "Avoid grapefruit juice while taking this medication",
      "Report any unexplained muscle pain, tenderness, or weakness to your doctor immediately",
      "May affect liver function"
    ],
    imageUrl: "https://example.com/images/cholestaway.jpg",
    requiresPrescription: true,
    price: 22.50,
    inStock: 45,
    manufacturer: "CardioHealth Pharmaceuticals"
  },
  {
    id: "med-009",
    brandName: "Dermacalm",
    genericName: "hydrocortisone",
    strength: "1%",
    form: MedicationForm.CREAM,
    category: MedicationCategory.ANTIINFLAMMATORY,
    description: "Topical corticosteroid that reduces skin inflammation, itching, and irritation",
    directions: "Apply a thin layer to affected area 2-4 times daily. Do not use for more than 7 days unless directed by a doctor.",
    sideEffects: [
      "Burning sensation",
      "Itching",
      "Dryness",
      "Redness",
      "Skin irritation"
    ],
    warnings: [
      "For external use only. Avoid contact with eyes",
      "Do not use on children under 2 years of age without doctor supervision",
      "Do not use on large areas of the body or for prolonged periods",
      "Stop use and consult a doctor if condition worsens or does not improve within 7 days"
    ],
    imageUrl: "https://example.com/images/dermacalm.jpg",
    requiresPrescription: false,
    price: 7.99,
    inStock: 90,
    manufacturer: "DermaSolutions Inc."
  },
  {
    id: "med-010",
    brandName: "Moodlift",
    genericName: "sertraline",
    strength: "50mg",
    form: MedicationForm.TABLET,
    category: MedicationCategory.ANTIDEPRESSANT,
    description: "Selective serotonin reuptake inhibitor (SSRI) used to treat depression, anxiety, and related conditions",
    directions: "Take 1 tablet once daily, morning or evening, with or without food.",
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Tremor",
      "Insomnia",
      "Decreased appetite",
      "Increased sweating"
    ],
    warnings: [
      "May increase risk of suicidal thoughts or behavior, especially in young adults and adolescents",
      "Do not stop taking abruptly without consulting your doctor",
      "Avoid alcohol consumption while taking this medication",
      "May interact with other medications including NSAIDs and blood thinners"
    ],
    imageUrl: "https://example.com/images/moodlift.jpg",
    requiresPrescription: true,
    price: 19.99,
    inStock: 55,
    manufacturer: "MindWell Therapeutics"
  }
];

/**
 * Sample patient data
 */
export const patients: Patient[] = [
  {
    id: "pat-001",
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "1975-05-15",
    contact: {
      phone: "555-123-4567",
      email: "john.smith@example.com",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "90210"
      }
    },
    insurance: {
      provider: "HealthPlus Insurance",
      policyNumber: "HP12345678",
      groupNumber: "GRP999"
    },
    allergies: ["Penicillin", "Sulfa drugs"],
    currentMedications: ["med-004", "med-008"]
  },
  {
    id: "pat-002",
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1988-11-30",
    contact: {
      phone: "555-987-6543",
      email: "sarah.johnson@example.com",
      address: {
        street: "456 Oak Ave",
        city: "Somewhere",
        state: "NY",
        zipCode: "10001"
      }
    },
    insurance: {
      provider: "MediCare Plus",
      policyNumber: "MP87654321",
      groupNumber: "GRP555"
    },
    allergies: ["Latex", "Shellfish"],
    currentMedications: ["med-003", "med-007"]
  },
  {
    id: "pat-003",
    firstName: "Michael",
    lastName: "Williams",
    dateOfBirth: "1962-08-22",
    contact: {
      phone: "555-456-7890",
      email: "michael.williams@example.com",
      address: {
        street: "789 Pine Rd",
        city: "Elsewhere",
        state: "TX",
        zipCode: "75001"
      }
    },
    insurance: {
      provider: "Blue Shield",
      policyNumber: "BS55667788",
      groupNumber: "GRP333"
    },
    allergies: ["Aspirin", "Ibuprofen"],
    currentMedications: ["med-004", "med-005", "med-008"]
  }
];

/**
 * Sample prescription data
 */
export const prescriptions: Prescription[] = [
  {
    id: "rx-001",
    medicationId: "med-004",
    patient: patients[0],
    doctor: "Dr. Emily Chen",
    dateIssued: "2023-01-15",
    dateExpires: "2024-01-15",
    refills: 12,
    refillsRemaining: 8,
    instructions: "Take one tablet daily in the morning with water.",
    isFilled: true,
    lastFillDate: "2023-05-10",
    filledAt: "pharm-001"
  },
  {
    id: "rx-002",
    medicationId: "med-008",
    patient: patients[0],
    doctor: "Dr. Emily Chen",
    dateIssued: "2023-02-20",
    dateExpires: "2024-02-20",
    refills: 12,
    refillsRemaining: 9,
    instructions: "Take one tablet daily in the evening with food.",
    isFilled: true,
    lastFillDate: "2023-05-10",
    filledAt: "pharm-001"
  },
  {
    id: "rx-003",
    medicationId: "med-003",
    patient: patients[1],
    doctor: "Dr. Robert Johnson",
    dateIssued: "2023-04-05",
    dateExpires: "2024-04-05",
    refills: 6,
    refillsRemaining: 5,
    instructions: "Take one tablet daily as needed for allergies.",
    isFilled: true,
    lastFillDate: "2023-04-06",
    filledAt: "pharm-002"
  },
  {
    id: "rx-004",
    medicationId: "med-007",
    patient: patients[1],
    doctor: "Dr. Robert Johnson",
    dateIssued: "2023-04-05",
    dateExpires: "2023-10-05",
    refills: 2,
    refillsRemaining: 2,
    instructions: "Take one capsule 30 minutes before bedtime as needed for insomnia.",
    isFilled: true,
    lastFillDate: "2023-04-06",
    filledAt: "pharm-002"
  },
  {
    id: "rx-005",
    medicationId: "med-004",
    patient: patients[2],
    doctor: "Dr. Maria Gonzalez",
    dateIssued: "2023-03-10",
    dateExpires: "2024-03-10",
    refills: 12,
    refillsRemaining: 10,
    instructions: "Take one tablet daily in the morning.",
    isFilled: true,
    lastFillDate: "2023-05-01",
    filledAt: "pharm-003"
  },
  {
    id: "rx-006",
    medicationId: "med-005",
    patient: patients[2],
    doctor: "Dr. Maria Gonzalez",
    dateIssued: "2023-03-10",
    dateExpires: "2024-03-10",
    refills: 12,
    refillsRemaining: 10,
    instructions: "Take one tablet twice daily with meals.",
    isFilled: true,
    lastFillDate: "2023-05-01",
    filledAt: "pharm-003"
  },
  {
    id: "rx-007",
    medicationId: "med-008",
    patient: patients[2],
    doctor: "Dr. Maria Gonzalez",
    dateIssued: "2023-03-10",
    dateExpires: "2024-03-10",
    refills: 12,
    refillsRemaining: 10,
    instructions: "Take one tablet daily in the evening with food.",
    isFilled: true,
    lastFillDate: "2023-05-01",
    filledAt: "pharm-003"
  }
];

/**
 * Sample pharmacy data
 */
export const pharmacies: Pharmacy[] = [
  {
    id: "pharm-001",
    name: "HealthMart Pharmacy",
    location: {
      address: "100 Health Blvd",
      city: "Anytown",
      state: "CA",
      zipCode: "90210",
      latitude: 34.0522,
      longitude: -118.2437
    },
    contact: {
      phone: "555-111-2222",
      email: "info@healthmartpharmacy.example.com",
      website: "https://www.healthmartpharmacy.example.com"
    },
    hours: {
      monday: "8:00 AM - 9:00 PM",
      tuesday: "8:00 AM - 9:00 PM",
      wednesday: "8:00 AM - 9:00 PM",
      thursday: "8:00 AM - 9:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    services: [
      "Prescription Filling",
      "Medication Counseling",
      "Immunizations",
      "Health Screenings",
      "Medication Therapy Management"
    ],
    offersDelivery: true,
    hasDriveThrough: true,
    isOpen: true,
    rating: 4.7
  },
  {
    id: "pharm-002",
    name: "QuickRx Pharmacy",
    location: {
      address: "200 Main Street",
      city: "Somewhere",
      state: "NY",
      zipCode: "10001",
      latitude: 40.7128,
      longitude: -74.0060
    },
    contact: {
      phone: "555-333-4444",
      email: "info@quickrx.example.com",
      website: "https://www.quickrx.example.com"
    },
    hours: {
      monday: "7:00 AM - 10:00 PM",
      tuesday: "7:00 AM - 10:00 PM",
      wednesday: "7:00 AM - 10:00 PM",
      thursday: "7:00 AM - 10:00 PM",
      friday: "7:00 AM - 10:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "9:00 AM - 6:00 PM"
    },
    services: [
      "Prescription Filling",
      "24-hour Prescription Dropoff",
      "Automated Refill System",
      "Medication Synchronization",
      "Compounding"
    ],
    offersDelivery: true,
    hasDriveThrough: false,
    isOpen: true,
    rating: 4.5
  },
  {
    id: "pharm-003",
    name: "Community Care Pharmacy",
    location: {
      address: "300 Oak Drive",
      city: "Elsewhere",
      state: "TX",
      zipCode: "75001",
      latitude: 32.7767,
      longitude: -96.7970
    },
    contact: {
      phone: "555-555-6666",
      email: "info@communitycarepharmacy.example.com",
      website: "https://www.communitycarepharmacy.example.com"
    },
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    services: [
      "Prescription Filling",
      "Medication Counseling",
      "Diabetes Education",
      "Blood Pressure Monitoring",
      "Medication Reviews"
    ],
    offersDelivery: false,
    hasDriveThrough: true,
    isOpen: true,
    rating: 4.9
  }
];

/**
 * Helper function to find a medication by ID
 * @param id The medication ID to search for
 * @returns The medication object or undefined if not found
 */
export function getMedicationById(id: string): Medication | undefined {
  return medications.find(med => med.id === id);
}

/**
 * Helper function to find a patient by ID
 * @param id The patient ID to search for
 * @returns The patient object or undefined if not found
 */
export function getPatientById(id: string): Patient | undefined {
  return patients.find(patient => patient.id === id);
}

/**
 * Helper function to find a prescription by ID
 * @param id The prescription ID to search for
 * @returns The prescription object or undefined if not found
 */
export function getPrescriptionById(id: string): Prescription | undefined {
  return prescriptions.find(rx => rx.id === id);
}

/**
 * Helper function to find a pharmacy by ID
 * @param id The pharmacy ID to search for
 * @returns The pharmacy object or undefined if not found
 */
export function getPharmacyById(id: string): Pharmacy | undefined {
  return pharmacies.find(pharmacy => pharmacy.id === id);
}

/**
 * Helper function to find prescriptions for a patient
 * @param patientId The patient ID to search for
 * @returns Array of prescriptions for the patient
 */
export function getPrescriptionsForPatient(patientId: string): Prescription[] {
  return prescriptions.filter(rx => rx.patient.id === patientId);
}

/**
 * Helper function to find prescriptions filled at a pharmacy
 * @param pharmacyId The pharmacy ID to search for
 * @returns Array of prescriptions filled at the pharmacy
 */
export function getPrescriptionsForPharmacy(pharmacyId: string): Prescription[] {
  return prescriptions.filter(rx => rx.filledAt === pharmacyId);
}
