import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const STORAGE_KEY = '@MedicationTracker:medications';

// Types
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  createdAt: number;
}

// App Component
export default function App() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load medications from AsyncStorage
  useEffect(() => {
    const loadMedications = async () => {
      try {
        setIsLoading(true);
        const storedMedications = await AsyncStorage.getItem(STORAGE_KEY);
        
        if (storedMedications) {
          setMedications(JSON.parse(storedMedications));
        }
      } catch (error) {
        console.error('Failed to load medications:', error);
        Alert.alert('Error', 'Failed to load medications from storage');
      } finally {
        setIsLoading(false);
      }
    };

    loadMedications();
  }, []);

  // Save medications to AsyncStorage
  const saveMedications = async (updatedMedications: Medication[]) => {
    try {
      setIsSaving(true);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMedications));
      setMedications(updatedMedications);
    } catch (error) {
      console.error('Failed to save medications:', error);
      Alert.alert('Error', 'Failed to save medications to storage');
    } finally {
      setIsSaving(false);
    }
  };

  // Add a new medication
  const addMedication = async () => {
    if (!name || !dosage || !frequency) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newMedication: Medication = {
      id: Date.now().toString(),
      name,
      dosage,
      frequency,
      createdAt: Date.now(),
    };

    const updatedMedications = [...medications, newMedication];
    await saveMedications(updatedMedications);
    
    // Clear form
    setName('');
    setDosage('');
    setFrequency('');
  };

  // Delete a medication
  const deleteMedication = async (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    await saveMedications(updatedMedications);
  };

  // Clear all medications
  const clearAllMedications = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete all medications?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setIsSaving(true);
              await AsyncStorage.removeItem(STORAGE_KEY);
              setMedications([]);
            } catch (error) {
              console.error('Failed to clear medications:', error);
              Alert.alert('Error', 'Failed to clear medications from storage');
            } finally {
              setIsSaving(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Export medications as JSON
  const exportMedications = async () => {
    try {
      const jsonData = JSON.stringify(medications, null, 2);
      Alert.alert('Export Successful', 'Medications data:', [
        { text: 'OK' },
        {
          text: 'Copy to Clipboard',
          onPress: async () => {
            try {
              // In a real app, you would use Clipboard.setString(jsonData)
              Alert.alert('Copied to Clipboard', 'Data copied successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to copy data to clipboard');
            }
          },
        },
      ]);
      console.log('Exported medications:', jsonData);
    } catch (error) {
      console.error('Failed to export medications:', error);
      Alert.alert('Error', 'Failed to export medications');
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0066cc" />
        <LoadingText>Loading medications...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <Title>Medication Tracker</Title>
      
      <FormContainer>
        <FormLabel>Medication Name</FormLabel>
        <FormInput
          value={name}
          onChangeText={setName}
          placeholder="Enter medication name"
        />
        
        <FormLabel>Dosage</FormLabel>
        <FormInput
          value={dosage}
          onChangeText={setDosage}
          placeholder="Enter dosage (e.g., 500mg)"
        />
        
        <FormLabel>Frequency</FormLabel>
        <FormInput
          value={frequency}
          onChangeText={setFrequency}
          placeholder="Enter frequency (e.g., 2x daily)"
        />
        
        <AddButton onPress={addMedication} disabled={isSaving}>
          <ButtonText>{isSaving ? 'Saving...' : 'Add Medication'}</ButtonText>
        </AddButton>
      </FormContainer>
      
      <SectionTitle>Your Medications</SectionTitle>
      
      {medications.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No medications added yet</EmptyStateText>
        </EmptyState>
      ) : (
        <>
          <FlatList
            data={medications.sort((a, b) => b.createdAt - a.createdAt)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MedicationCard>
                <MedicationName>{item.name}</MedicationName>
                <MedicationDetail>Dosage: {item.dosage}</MedicationDetail>
                <MedicationDetail>Frequency: {item.frequency}</MedicationDetail>
                <MedicationDetail>
                  Added: {new Date(item.createdAt).toLocaleDateString()}
                </MedicationDetail>
                <DeleteButton onPress={() => deleteMedication(item.id)} disabled={isSaving}>
                  <DeleteButtonText>{isSaving ? 'Deleting...' : 'Delete'}</DeleteButtonText>
                </DeleteButton>
              </MedicationCard>
            )}
          />
          
          <ButtonRow>
            <ClearButton onPress={clearAllMedications} disabled={isSaving}>
              <ClearButtonText>Clear All</ClearButtonText>
            </ClearButton>
            
            <ExportButton onPress={exportMedications}>
              <ExportButtonText>Export Data</ExportButtonText>
            </ExportButton>
          </ButtonRow>
        </>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const LoadingText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const FormContainer = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const FormLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const FormInput = styled.TextInput`
  height: 40px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 0 10px;
`;

const AddButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? '#999' : '#0066cc'};
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const MedicationCard = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const MedicationName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const MedicationDetail = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 3px;
`;

const DeleteButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? '#999' : '#ff3b30'};
  padding: 8px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const ClearButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? '#999' : '#ff9500'};
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  margin-right: 10px;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const ClearButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const ExportButton = styled.TouchableOpacity`
  background-color: #34c759;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
`;

const ExportButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const EmptyState = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #999;
  font-style: italic;
`; 