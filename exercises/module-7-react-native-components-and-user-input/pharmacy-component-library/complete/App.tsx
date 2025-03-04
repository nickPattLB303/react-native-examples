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
  Alert,
} from 'react-native';

// Import components from the library
import {
  MedicationListItem,
  DosageScheduler,
  PrescriptionSummary,
  DosageSchedule,
  FillHistoryItem,
  MedicationStatus,
} from './components';

/**
 * Demo app for the pharmacy component library
 */
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // State for MedicationListItem demos
  const [medications] = useState<Array<{
    id: string;
    name: string;
    strength: string;
    status: MedicationStatus;
    daysRemaining: number;
  }>>([
    {
      id: '1',
      name: 'Lisinopril',
      strength: '10mg',
      status: 'active',
      daysRemaining: 12,
    },
    {
      id: '2',
      name: 'Atorvastatin',
      strength: '20mg',
      status: 'refill-needed',
      daysRemaining: 2,
    },
    {
      id: '3',
      name: 'Metformin',
      strength: '500mg',
      status: 'expired',
      daysRemaining: 0,
    },
  ]);
  
  // State for DosageScheduler
  const [schedule, setSchedule] = useState<DosageSchedule>({
    timesOfDay: ['morning', 'evening'],
    frequency: 'daily',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });
  
  // Data for PrescriptionSummary
  const prescriptionData = {
    patientName: 'John Smith',
    medicationName: 'Lisinopril 10mg',
    medicationDetails: 'Take 1 tablet by mouth daily for high blood pressure. Take with food to reduce risk of dizziness.',
    doctor: 'Dr. Sarah Johnson',
    pharmacy: 'Pharmacy Plus, 123 Main St, Anytown, USA',
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
      {
        date: '2023-03-15',
        quantity: 30,
        pharmacy: 'Central Pharmacy',
      },
    ],
  };
  
  // Event handlers
  const handleRefill = (medicationId: string) => {
    Alert.alert('Refill Requested', `Refill request submitted for medication ID: ${medicationId}`);
  };
  
  const handleDetails = (medicationId: string) => {
    Alert.alert('Details', `Viewing details for medication ID: ${medicationId}`);
  };
  
  const handlePrintDetails = () => {
    Alert.alert('Print Details', 'Sending prescription details to printer...');
  };
  
  const handleScheduleChange = (newSchedule: DosageSchedule) => {
    setSchedule(newSchedule);
    console.log('Schedule updated:', newSchedule);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Text style={styles.header}>Pharmacy Component Library</Text>
        
        {/* MedicationListItem Demo */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Medication List Items</Text>
          <Text style={styles.demoDescription}>
            Displays medications with status indicators and quick actions
          </Text>
          
          {medications.map(medication => (
            <MedicationListItem
              key={medication.id}
              medicationName={medication.name}
              strength={medication.strength}
              status={medication.status}
              daysRemaining={medication.daysRemaining}
              onPressRefill={() => handleRefill(medication.id)}
              onPressDetails={() => handleDetails(medication.id)}
            />
          ))}
        </View>
        
        {/* DosageScheduler Demo */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Dosage Scheduler</Text>
          <Text style={styles.demoDescription}>
            Allows scheduling medication doses by time and frequency
          </Text>
          
          <DosageScheduler
            onChange={handleScheduleChange}
            initialSchedule={schedule}
          />
        </View>
        
        {/* PrescriptionSummary Demo */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Prescription Summary</Text>
          <Text style={styles.demoDescription}>
            Displays comprehensive prescription information including fill history
          </Text>
          
          <PrescriptionSummary
            patientName={prescriptionData.patientName}
            medicationName={prescriptionData.medicationName}
            medicationDetails={prescriptionData.medicationDetails}
            doctor={prescriptionData.doctor}
            pharmacy={prescriptionData.pharmacy}
            fillHistory={prescriptionData.fillHistory as FillHistoryItem[]}
            onPressPrintDetails={handlePrintDetails}
          />
        </View>
        
        {/* Component Library Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About This Library</Text>
          <Text style={styles.infoText}>
            This pharmacy component library provides reusable UI components for
            medication management applications. The components are built with
            TypeScript and follow accessibility best practices.
          </Text>
          <Text style={styles.infoText}>
            Each component accepts custom styling and provides a clean, consistent
            API for integration into larger applications.
          </Text>
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
    paddingBottom: 40,
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  demoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  infoSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#E6F7FF',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0066CC',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default App; 