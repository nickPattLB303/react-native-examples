/**
 * @fileoverview Medication Types Exercise - TypeScript Fundamentals
 * @created 2023-08-15
 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import PatientCard from './components/PatientCard';
import MedicationList from './components/MedicationList';
import PrescriptionCard from './components/PrescriptionCard';

// Type alias for DosageUnit using union types
type DosageUnit = "mg" | "ml" | "µg" | "tablet";

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
// Using type assertions to ensure the string values match our DosageUnit type
const patientData: Patient = {
  id: 12345,
  name: "Sarah Johnson",
  dateOfBirth: new Date("1985-05-15"),
  allergies: ["Penicillin", "Peanuts"]
};

const medicationsData: Medication[] = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: 10,
    unit: "mg" as DosageUnit,
    sideEffects: ["Dizziness", "Cough", "Headache"]
  },
  {
    id: 2,
    name: "Metformin",
    dosage: 500,
    unit: "mg" as DosageUnit,
    sideEffects: ["Nausea", "Stomach upset"]
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: 1,
    unit: "tablet" as DosageUnit,
    sideEffects: []
  }
];

const prescriptionData: Prescription = {
  id: 98765,
  patient: patientData,
  medications: medicationsData,
  prescribedDate: new Date("2023-08-10"),
  refillsRemaining: 3,
  notes: "Take medications as directed."
};

export default function App() {
  // Adding proper type annotations to our variables
  const patient: Patient = patientData;
  const medications: Medication[] = medicationsData;
  const prescription: Prescription = prescriptionData;
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Medication Tracking System</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PatientCard patient={patient} />
        <MedicationList medications={medications} />
        <PrescriptionCard prescription={prescription} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#2a5ca5',
    color: 'white',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
}); 