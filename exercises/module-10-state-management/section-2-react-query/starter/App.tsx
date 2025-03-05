import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

// TODO: Import React Query components
// import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

// Mock API functions
const api = {
  // Fetch all medications
  fetchMedications: async (): Promise<Medication[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily', instructions: 'Take with food' },
      { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily', instructions: 'Take in the morning' },
      { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily', instructions: 'Take with meals' },
    ];
  },
  
  // Add a new medication
  addMedication: async (medication: Omit<Medication, 'id'>): Promise<Medication> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Date.now(),
      ...medication,
    };
  },
  
  // Delete a medication
  deleteMedication: async (id: number): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Medication with id ${id} deleted`);
  },
};

// TODO: Create a QueryClient instance
// const queryClient = new QueryClient();

// Medication List Component
function MedicationList() {
  // TODO: Implement React Query to fetch medications
  // Use the useQuery hook to fetch medications from the API
  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily', instructions: 'Take with food' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily', instructions: 'Take in the morning' },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily', instructions: 'Take with meals' },
  ];
  const isLoading = false;
  const isError = false;
  const error = null;

  // TODO: Implement React Query to add a new medication
  // Use the useMutation hook to add a new medication
  const handleAddMedication = () => {
    const newMedication = {
      name: 'Ibuprofen',
      dosage: '200mg',
      frequency: 'As needed',
      instructions: 'Take for pain',
    };
    console.log('Adding medication:', newMedication);
  };

  // TODO: Implement React Query to delete a medication
  // Use the useMutation hook to delete a medication
  const handleDeleteMedication = (id: number) => {
    console.log('Deleting medication with id:', id);
  };

  if (isLoading) {
    return <LoadingContainer><ActivityIndicator size="large" color="#0066cc" /></LoadingContainer>;
  }

  if (isError) {
    return <ErrorContainer><ErrorText>Error: {error?.toString()}</ErrorText></ErrorContainer>;
  }

  return (
    <Container>
      <Title>Medications</Title>
      <AddButton onPress={handleAddMedication}>
        <AddButtonText>Add Medication</AddButtonText>
      </AddButton>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicationCard>
            <MedicationName>{item.name}</MedicationName>
            <MedicationDetail>Dosage: {item.dosage}</MedicationDetail>
            <MedicationDetail>Frequency: {item.frequency}</MedicationDetail>
            <MedicationDetail>Instructions: {item.instructions}</MedicationDetail>
            <DeleteButton onPress={() => handleDeleteMedication(item.id)}>
              <DeleteButtonText>Delete</DeleteButtonText>
            </DeleteButton>
          </MedicationCard>
        )}
      />
    </Container>
  );
}

export default function App() {
  // TODO: Wrap the app with QueryClientProvider
  return (
    <>
      <StatusBar style="auto" />
      <MedicationList />
    </>
  );
}

// Styled components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
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

const AddButton = styled.TouchableOpacity`
  background-color: #0066cc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  align-items: center;
`;

const AddButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: #ff3b30;
  padding: 8px;
  border-radius: 5px;
  margin-top: 10px;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  color: #ff3b30;
  font-size: 16px;
  text-align: center;
`; 