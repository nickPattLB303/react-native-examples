/**
 * Pharmacy Component Library Demo App
 * 
 * This app demonstrates the custom components from the pharmacy component library
 */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

// Import components from the library
import {
  MedicationListItem,
  DosageScheduler,
  PrescriptionSummary,
  DosageSchedule,
  FillHistoryItem,
} from './components';

/**
 * Demo app for the pharmacy component library
 */
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Example data for MedicationListItem
  const medicationData = {
    medicationName: 'Lisinopril',
    strength: '10mg',
    status: 'active',
    daysRemaining: 12,
  };
  
  // Example data for PrescriptionSummary
  const prescriptionData = {
    patientName: 'John Smith',
    medicationName: 'Lisinopril 10mg',
    medicationDetails: 'Take 1 tablet by mouth daily for high blood pressure',
    doctor: 'Dr. Sarah Johnson',
    pharmacy: 'Pharmacy Plus, 123 Main St',
    fillHistory: [
      {
        date: '2023-05-15',
        quantity: 30,
        pharmacy: 'Pharmacy Plus',
      },
      {
        date: '2023-04-15',
        quantity: 30,
        pharmacy: 'Pharmacy Plus',
      },
    ],
  };
  
  // State for DosageScheduler
  const [schedule, setSchedule] = useState<DosageSchedule>({
    timesOfDay: ['morning'],
    frequency: 'daily',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Text style={styles.header}>Pharmacy Component Library</Text>
        
        {/* MedicationListItem Demo */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Medication List Item</Text>
          <MedicationListItem
            medicationName={medicationData.medicationName}
            strength={medicationData.strength}
            status={medicationData.status as any}
            daysRemaining={medicationData.daysRemaining}
            onPressRefill={() => console.log('Refill pressed')}
            onPressDetails={() => console.log('Details pressed')}
          />
        </View>
        
        {/* DosageScheduler Demo */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Dosage Scheduler</Text>
          <DosageScheduler
            onChange={setSchedule}
            initialSchedule={schedule}
          />
        </View>
        
        {/* PrescriptionSummary Demo */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Prescription Summary</Text>
          <PrescriptionSummary
            patientName={prescriptionData.patientName}
            medicationName={prescriptionData.medicationName}
            medicationDetails={prescriptionData.medicationDetails}
            doctor={prescriptionData.doctor}
            pharmacy={prescriptionData.pharmacy}
            fillHistory={prescriptionData.fillHistory as FillHistoryItem[]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  demoSection: {
    marginBottom: 32,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
});

export default App; 