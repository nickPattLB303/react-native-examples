/**
 * @fileoverview Medication Types Exercise - TypeScript Fundamentals
 * @created 2023-08-15
 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import PatientCard from './components/PatientCard';
import MedicationList from './components/MedicationList';
import PrescriptionCard from './components/PrescriptionCard';

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
// You will need to add type assertions for your DosageUnit type after implementing it
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
    unit: "mg", // You'll need to add 'as DosageUnit' after creating the type
    sideEffects: ["Dizziness", "Cough", "Headache"]
  },
  {
    id: 2,
    name: "Metformin",
    dosage: 500,
    unit: "mg", // You'll need to add 'as DosageUnit' after creating the type
    sideEffects: ["Nausea", "Stomach upset"]
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: 1,
    unit: "tablet", // You'll need to add 'as DosageUnit' after creating the type
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

export default function App() {
  // TODO: Add type annotations to the variables below
  const patient = patientData;
  const medications = medicationsData;
  const prescription = prescriptionData;
  
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