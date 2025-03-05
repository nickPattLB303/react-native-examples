/**
 * @fileoverview Medication detail screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';
import { Ionicons } from '@expo/vector-icons';

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
  { 
    id: '3', 
    name: 'Metformin', 
    dosage: '1000mg', 
    frequency: '2x daily',
    form: 'Tablet',
    instructions: 'Take with meals to reduce stomach upset.',
    sideEffects: 'Nausea, diarrhea, stomach pain.',
    expiryDate: '03/15/2025'
  },
  { 
    id: '4', 
    name: 'Atorvastatin', 
    dosage: '20mg', 
    frequency: '1x daily',
    form: 'Tablet',
    instructions: 'Take in the evening.',
    sideEffects: 'Muscle pain, fatigue, joint pain.',
    expiryDate: '09/22/2024'
  },
  { 
    id: '5', 
    name: 'Levothyroxine', 
    dosage: '50mcg', 
    frequency: '1x daily',
    form: 'Tablet',
    instructions: 'Take on an empty stomach, 30-60 minutes before breakfast.',
    sideEffects: 'Headache, weight gain, anxiety.',
    expiryDate: '10/18/2024'
  },
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
  const { id } = route.params;
  const medication = sampleMedications.find(med => med.id === id);
  
  // Set the screen title to the medication name
  useLayoutEffect(() => {
    if (medication) {
      navigation.setOptions({
        title: medication.name,
        headerRight: () => (
          <HeaderIconButton onPress={() => handleShare(medication.name)}>
            <Ionicons name="share-outline" size={24} color="#0078D7" />
          </HeaderIconButton>
        ),
      });
    }
  }, [navigation, medication]);
  
  const handleShare = (name: string) => {
    Alert.alert('Share', `Sharing information about ${name}`, [
      { text: 'OK' }
    ]);
  };
  
  if (!medication) {
    return (
      <Container>
        <Title>Medication Not Found</Title>
        <BackButton onPress={() => navigation.goBack()}>
          <ButtonText>Go Back</ButtonText>
        </BackButton>
      </Container>
    );
  }
  
  return (
    <Container>
      <MedicationInfo>
        <InfoRow>
          <InfoLabel>Dosage:</InfoLabel>
          <InfoValue>{medication.dosage}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Frequency:</InfoLabel>
          <InfoValue>{medication.frequency}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Form:</InfoLabel>
          <InfoValue>{medication.form}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Instructions:</InfoLabel>
          <InfoValue>{medication.instructions}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Side Effects:</InfoLabel>
          <InfoValue>{medication.sideEffects}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Expires:</InfoLabel>
          <InfoValue>{medication.expiryDate}</InfoValue>
        </InfoRow>
      </MedicationInfo>
      
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

const HeaderIconButton = styled.Pressable`
  padding: 8px;
  margin-right: 4px;
`; 