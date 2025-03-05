/**
 * @fileoverview Medication detail screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

// Sample medication data - would usually come from an API or local storage
const sampleMedications = [
  { 
    id: '1', 
    name: 'Amoxicillin', 
    dosage: '500mg', 
    frequency: '3x daily',
    form: 'Capsule',
    instructions: 'Take with food.',
    sideEffects: 'Diarrhea, nausea, vomiting, rash.',
    expiryDate: '12/31/2024'
  },
  { 
    id: '2', 
    name: 'Lisinopril', 
    dosage: '10mg', 
    frequency: '1x daily',
    form: 'Tablet',
    instructions: 'Take in the morning with or without food.',
    sideEffects: 'Dizziness, headache, cough, fatigue.',
    expiryDate: '06/30/2025'
  },
  // Other medications...
];

/**
 * Type definition for navigation props
 */
type MedicationDetailScreenProps = StackScreenProps<
  MedicationsStackParamList,
  'MedicationDetail'
>;

/**
 * Medication detail screen component displaying detailed information about a specific medication
 * @param route Route object containing parameters
 * @param navigation Navigation object for moving between screens
 * @returns Medication detail screen component
 */
export default function MedicationDetailScreen({ 
  route, 
  navigation 
}: MedicationDetailScreenProps) {
  // TODO: Get the medication ID from route.params and find the corresponding medication
  // const { id } = route.params;
  // const medication = sampleMedications.find(med => med.id === id);
  
  return (
    <Container>
      <Title>Medication Details</Title>
      
      {/* TODO: Display medication details */}
      <Text>Implement the medication details here</Text>
      
      <BackButton onPress={() => navigation.goBack()}>
        <ButtonText>Go Back</ButtonText>
      </BackButton>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 20px;
`;

const MedicationInfo = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  width: 100px;
  color: #6c757d;
`;

const InfoValue = styled.Text`
  font-size: 16px;
  flex: 1;
  color: #212529;
`;

const BackButton = styled.Pressable`
  background-color: #0078D7;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`; 