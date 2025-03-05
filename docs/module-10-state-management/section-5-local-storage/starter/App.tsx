import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

// TODO: Import AsyncStorage
// import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // TODO: Implement loading medications from AsyncStorage
  useEffect(() => {
    // Load medications from AsyncStorage
    const loadMedications = async () => {
      try {
        setIsLoading(true);
        // Mock data for now
        setMedications([
          {
            id: '1',
            name: 'Amoxicillin',
            dosage: '500mg',
            frequency: '3x daily',
            createdAt: Date.now(),
          },
          {
            id: '2',
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: '1x daily',
            createdAt: Date.now(),
          },
        ]);
      } catch (error) {
        console.error('Failed to load medications:', error);
        Alert.alert('Error', 'Failed to load medications');
      } finally {
        setIsLoading(false);
      }
    };

    loadMedications();
  }, []);

  // TODO: Implement saving medications to AsyncStorage
  const saveMedications = async (updatedMedications: Medication[]) => {
    // Save medications to AsyncStorage
    console.log('Saving medications:', updatedMedications);
    setMedications(updatedMedications);
  };

  const addMedication = () => {
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
    saveMedications(updatedMedications);
    
    // Clear form
    setName('');
    setDosage('');
    setFrequency('');
  };

  const deleteMedication = (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    saveMedications(updatedMedications);
  };

  // TODO: Implement clearing all medications from AsyncStorage
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
          onPress: () => {
            saveMedications([]);
          },
          style: 'destructive',
        },
      ]
    );
  };

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
        
        <AddButton onPress={addMedication}>
          <ButtonText>Add Medication</ButtonText>
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
            data={medications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MedicationCard>
                <MedicationName>{item.name}</MedicationName>
                <MedicationDetail>Dosage: {item.dosage}</MedicationDetail>
                <MedicationDetail>Frequency: {item.frequency}</MedicationDetail>
                <DeleteButton onPress={() => deleteMedication(item.id)}>
                  <DeleteButtonText>Delete</DeleteButtonText>
                </DeleteButton>
              </MedicationCard>
            )}
          />
          
          <ClearButton onPress={clearAllMedications}>
            <ClearButtonText>Clear All Medications</ClearButtonText>
          </ClearButton>
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

const AddButton = styled.TouchableOpacity`
  background-color: #0066cc;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
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

const DeleteButton = styled.TouchableOpacity`
  background-color: #ff3b30;
  padding: 8px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const ClearButton = styled.TouchableOpacity`
  background-color: #ff9500;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

const ClearButtonText = styled.Text`
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