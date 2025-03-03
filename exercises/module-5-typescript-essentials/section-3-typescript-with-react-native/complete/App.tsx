import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

// Define interface for medication reminder
interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

// Sample data - this would normally come from an API or storage
const initialMedications: Medication[] = [
  { id: 1, name: 'Aspirin', dosage: '100mg', time: '8:00 AM', taken: false },
  { id: 2, name: 'Vitamin D', dosage: '1000 IU', time: '9:00 AM', taken: true },
  { id: 3, name: 'Metformin', dosage: '500mg', time: '1:00 PM', taken: false },
  { id: 4, name: 'Lisinopril', dosage: '10mg', time: '7:00 PM', taken: false },
];

// Define props interface for MedicationItem
interface MedicationItemProps {
  medication: Medication;
  onToggle: (id: number) => void;
}

// Create a type-safe MedicationItem component
const MedicationItem: React.FC<MedicationItemProps> = ({ medication, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.medicationItem, 
        medication.taken ? styles.medicationTaken : {}
      ]} 
      onPress={() => onToggle(medication.id)}
    >
      <View style={styles.medicationInfo}>
        <Text style={styles.medicationName}>{medication.name}</Text>
        <Text style={styles.medicationDetails}>
          {medication.dosage} - {medication.time}
        </Text>
      </View>
      
      <View style={[
        styles.statusIndicator, 
        medication.taken ? styles.statusTaken : styles.statusPending
      ]}>
        <Text style={styles.statusText}>
          {medication.taken ? 'TAKEN' : 'PENDING'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Define props interface for MedicationList
interface MedicationListProps {
  medications: Medication[];
  onToggleMedication: (id: number) => void;
}

// Create a type-safe MedicationList component
const MedicationList: React.FC<MedicationListProps> = ({ medications, onToggleMedication }) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MedicationItem 
          medication={item} 
          onToggle={onToggleMedication} 
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Create a type-safe Summary component
interface SummaryProps {
  medications: Medication[];
}

const Summary: React.FC<SummaryProps> = ({ medications }) => {
  const total = medications.length;
  const taken = medications.filter(med => med.taken).length;
  
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>
        {taken} of {total} medications taken today
      </Text>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(taken / total) * 100}%` }
          ]} 
        />
      </View>
    </View>
  );
};

export default function App() {
  // State with TypeScript type
  const [medications, setMedications] = useState<Medication[]>(initialMedications);

  // Toggle medication taken status
  const handleToggleMedication = (id: number): void => {
    setMedications(currentMeds => 
      currentMeds.map(medication => 
        medication.id === id 
          ? { ...medication, taken: !medication.taken } 
          : medication
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medication Tracker</Text>
      
      <Summary medications={medications} />
      
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeader}>Today's Medications</Text>
      </View>
      
      <MedicationList 
        medications={medications} 
        onToggleMedication={handleToggleMedication} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0066cc',
    textAlign: 'center',
  },
  listHeaderContainer: {
    marginVertical: 10,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  listContainer: {
    paddingBottom: 20,
  },
  medicationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationTaken: {
    opacity: 0.7,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusTaken: {
    backgroundColor: '#4caf50',
  },
  statusPending: {
    backgroundColor: '#ff9800',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
}); 