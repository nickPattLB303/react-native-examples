/**
 * @fileoverview Medication Tracker App - Completed Example
 * @author React Native Training Course
 * @created 2023-09-01
 */

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';

// Define interfaces for medication reminders and user settings
interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
}

interface UserSettings {
  enableNotifications: boolean;
  reminderTimes: string[];
}

// Define props interface for MedicationItem component
interface MedicationItemProps {
  medication: Medication;
  onTakeMedication: (id: number) => void;
  onSkipMedication: (id: number) => void;
}

/**
 * MedicationItem component displays a single medication with actions
 * @param medication - The medication to display
 * @param onTakeMedication - Callback for when medication is taken
 * @param onSkipMedication - Callback for when medication is skipped
 */
const MedicationItem: React.FC<MedicationItemProps> = ({ 
  medication, 
  onTakeMedication, 
  onSkipMedication 
}) => {
  return (
    <View style={[styles.medicationItem, medication.taken && styles.medicationTaken]}>
      <View>
        <Text style={styles.medicationName}>{medication.name}</Text>
        <Text style={styles.medicationDetails}>
          {medication.dosage}, {medication.frequency}
        </Text>
        <Text style={styles.medicationTime}>Time: {medication.time}</Text>
        {medication.taken && (
          <Text style={styles.takenText}>✓ Taken</Text>
        )}
      </View>
      
      {!medication.taken && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.takeButton]} 
            onPress={() => onTakeMedication(medication.id)}
          >
            <Text style={styles.buttonText}>Take</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.skipButton]}
            onPress={() => onSkipMedication(medication.id)}
          >
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Return type for the useMedications hook
interface UseMedicationsResult {
  medications: Medication[];
  isLoading: boolean;
  error: Error | null;
  addMedication: (medication: Omit<Medication, 'id' | 'taken'>) => void;
  takeMedication: (id: number) => void;
  skipMedication: (id: number) => void;
}

/**
 * Custom hook to fetch and manage medication data
 */
const useMedications = (): UseMedicationsResult => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Simulate fetching medications from an API
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockMedications: Medication[] = [
          { 
            id: 1, 
            name: 'Amoxicillin', 
            dosage: '500mg', 
            frequency: '3x daily', 
            time: '08:00 AM',
            taken: false 
          },
          { 
            id: 2, 
            name: 'Lisinopril', 
            dosage: '10mg', 
            frequency: '1x daily', 
            time: '09:00 AM',
            taken: false 
          },
          { 
            id: 3, 
            name: 'Metformin', 
            dosage: '1000mg', 
            frequency: '2x daily', 
            time: '07:30 PM',
            taken: true 
          }
        ];
        
        setMedications(mockMedications);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };
    
    fetchMedications();
  }, []);
  
  // Function to add a new medication
  const addMedication = (medicationData: Omit<Medication, 'id' | 'taken'>) => {
    const newMedication: Medication = {
      ...medicationData,
      id: Date.now(), // Simple ID generation
      taken: false
    };
    
    setMedications(prevMedications => [...prevMedications, newMedication]);
  };
  
  // Function to mark a medication as taken
  const takeMedication = (id: number) => {
    setMedications(prevMedications => 
      prevMedications.map(med => 
        med.id === id ? { ...med, taken: true } : med
      )
    );
  };
  
  // Function to skip a medication
  const skipMedication = (id: number) => {
    setMedications(prevMedications => 
      prevMedications.filter(med => med.id !== id)
    );
  };
  
  return {
    medications,
    isLoading,
    error,
    addMedication,
    takeMedication,
    skipMedication
  };
};

const App: React.FC = () => {
  // Use the custom hook for medication management
  const { 
    medications, 
    isLoading, 
    error, 
    addMedication, 
    takeMedication, 
    skipMedication 
  } = useMedications();
  
  // User settings with typed state
  const [settings, setSettings] = useState<UserSettings>({
    enableNotifications: true,
    reminderTimes: ['08:00', '12:00', '18:00']
  });
  
  // Handler for adding a new medication (simulated)
  const handleAddMedication = () => {
    // In a real app, this would open a form
    // For this example, we'll just add a hardcoded medication
    const newMedication = {
      name: 'Ibuprofen',
      dosage: '200mg',
      frequency: 'As needed',
      time: '12:00 PM'
    };
    
    addMedication(newMedication);
    Alert.alert('Medication Added', `${newMedication.name} has been added to your tracker.`);
  };
  
  // Render the component
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Medication Tracker</Text>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading medications...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      ) : medications.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No medications to display</Text>
        </View>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MedicationItem
              medication={item}
              onTakeMedication={takeMedication}
              onSkipMedication={skipMedication}
            />
          )}
          style={styles.list}
        />
      )}
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddMedication}
      >
        <Text style={styles.addButtonText}>+ Add Medication</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Type-safe styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0066cc',
  },
  list: {
    flex: 1,
  },
  medicationItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicationTaken: {
    backgroundColor: '#f0f9ff',
    borderColor: '#0066cc',
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
  medicationTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  takenText: {
    color: '#0066cc',
    fontWeight: 'bold',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
    marginBottom: 4,
  },
  takeButton: {
    backgroundColor: '#0066cc',
  },
  skipButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default App; 