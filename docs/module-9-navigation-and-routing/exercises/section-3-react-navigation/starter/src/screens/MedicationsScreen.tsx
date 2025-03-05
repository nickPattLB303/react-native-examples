/**
 * @fileoverview Medications list screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

// Sample medication data - would usually come from an API or local storage
const sampleMedications = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
  { id: '2', name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
  { id: '3', name: 'Metformin', dosage: '1000mg', frequency: '2x daily' },
  { id: '4', name: 'Atorvastatin', dosage: '20mg', frequency: '1x daily' },
  { id: '5', name: 'Levothyroxine', dosage: '50mcg', frequency: '1x daily' },
];

/**
 * Type definition for navigation props
 */
type MedicationsScreenProps = StackScreenProps<
  MedicationsStackParamList,
  'MedicationsList'
>;

/**
 * Medications list screen component
 * @param navigation Navigation object for moving between screens
 * @returns Medications list screen component
 */
export default function MedicationsScreen({ navigation }: MedicationsScreenProps) {
  return (
    <Container>
      <Header>
        <Title>Medications</Title>
        <AddButton onPress={() => {
          // TODO: Navigate to the AddMedication screen
        }}>
          <AddButtonText>+ Add</AddButtonText>
        </AddButton>
      </Header>
      
      {/* TODO: Implement the FlatList with MedicationItem components */}
      <Text>Implement the medication list here</Text>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
`;

const AddButton = styled.Pressable`
  background-color: #0078D7;
  padding: 8px 16px;
  border-radius: 8px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const MedicationCard = styled.Pressable`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const MedicationName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 4px;
`;

const MedicationInfo = styled.Text`
  font-size: 14px;
  color: #6c757d;
`; 