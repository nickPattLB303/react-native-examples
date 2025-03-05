/**
 * @fileoverview Medication detail screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { ScrollView, Alert, Share, Platform } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

// Sample medications data - same as in MedicationsScreen, but would typically be from a shared data source
const sampleMedications = [
  {
    id: '1',
    name: 'Aspirin',
    dosage: '81 mg',
    frequency: 'Daily',
    form: 'Tablet',
    nextDose: '8:00 AM',
    refillDate: '07/15/2023',
    instructions: 'Take with food',
    description: 'Used to reduce pain, fever, or inflammation. This medication is known as a salicylate and a nonsteroidal anti-inflammatory drug (NSAID).',
    sideEffects: ['Upset stomach', 'Heartburn', 'Stomach pain', 'Nausea'],
    doctor: 'Dr. Smith',
    pharmacy: 'Walgreens',
    prescriptionNumber: 'RX-12345',
  },
  {
    id: '2',
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'Daily',
    form: 'Capsule',
    nextDose: '9:00 AM',
    refillDate: '08/20/2023',
    instructions: 'Take with breakfast',
    description: 'Vitamin D helps your body absorb calcium and phosphorus, important for building and maintaining strong bones.',
    sideEffects: ['Weakness', 'Dry mouth', 'Nausea', 'Vomiting'],
    doctor: 'Dr. Johnson',
    pharmacy: 'CVS',
    prescriptionNumber: 'RX-67890',
  },
  {
    id: '3',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Daily',
    form: 'Tablet',
    nextDose: '1:00 PM',
    refillDate: '06/30/2023',
    instructions: 'Take before lunch',
    description: 'Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure.',
    sideEffects: ['Dizziness', 'Cough', 'Headache', 'Fatigue'],
    doctor: 'Dr. Williams',
    pharmacy: 'Rite Aid',
    prescriptionNumber: 'RX-24680',
  },
  {
    id: '4',
    name: 'Simvastatin',
    dosage: '20 mg',
    frequency: 'Once daily',
    form: 'Tablet',
    nextDose: '8:00 PM',
    refillDate: '07/10/2023',
    instructions: 'Take in the evening',
    description: 'Simvastatin is used to lower cholesterol and triglycerides in the blood.',
    sideEffects: ['Constipation', 'Stomach pain', 'Headache', 'Memory problems'],
    doctor: 'Dr. Brown',
    pharmacy: 'Walgreens',
    prescriptionNumber: 'RX-13579',
  },
  {
    id: '5',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    form: 'Tablet',
    nextDose: '6:00 PM',
    refillDate: '07/05/2023',
    instructions: 'Take with meals',
    description: 'Metformin is used to treat high blood sugar levels caused by type 2 diabetes.',
    sideEffects: ['Nausea', 'Vomiting', 'Stomach upset', 'Diarrhea'],
    doctor: 'Dr. Davis',
    pharmacy: 'CVS',
    prescriptionNumber: 'RX-97531',
  },
];

// Type for navigation props
type MedicationDetailScreenProps = StackScreenProps<
  MedicationsStackParamList,
  'MedicationDetails'
>;

/**
 * Medication detail screen component
 * Displays detailed information about a specific medication
 * @param {object} route - Route object containing params
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Medication detail screen component
 */
export default function MedicationDetailScreen({ 
  route, 
  navigation 
}: MedicationDetailScreenProps) {
  const { id } = route.params;
  
  // Find medication details from sample data
  const medication = sampleMedications.find(med => med.id === id);
  
  // State for reminder toggle
  const [reminderEnabled, setReminderEnabled] = useState(true);
  
  // Handle share button press
  const handleShare = (name: string) => {
    Share.share({
      message: `I'm taking ${name} as prescribed by my doctor. Using the MedTrack app to keep track of my medications.`,
      title: 'Medication Information',
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type of result.activityType
          } else {
            // Shared
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  
  // Handle reminder toggle
  const toggleReminder = () => {
    setReminderEnabled(!reminderEnabled);
    Alert.alert(
      'Reminder Update',
      `Reminders for ${medication?.name} have been ${!reminderEnabled ? 'enabled' : 'disabled'}.`
    );
  };
  
  if (!medication) {
    return (
      <ErrorContainer>
        <ErrorText>Medication not found</ErrorText>
      </ErrorContainer>
    );
  }
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderCard>
          <MedicationTitle>{medication.name}</MedicationTitle>
          <MedicationSubtitle>{medication.dosage} · {medication.frequency}</MedicationSubtitle>
          
          <InfoRow>
            <InfoItem>
              <InfoIcon>
                <FontAwesome name="clock-o" size={18} color="#6200ee" />
              </InfoIcon>
              <InfoLabel>Next Dose</InfoLabel>
              <InfoValue>{medication.nextDose}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FontAwesome name="calendar" size={18} color="#6200ee" />
              </InfoIcon>
              <InfoLabel>Refill Date</InfoLabel>
              <InfoValue>{medication.refillDate}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FontAwesome name="medkit" size={18} color="#6200ee" />
              </InfoIcon>
              <InfoLabel>Form</InfoLabel>
              <InfoValue>{medication.form}</InfoValue>
            </InfoItem>
          </InfoRow>
          
          <ActionRow>
            <ActionButton onPress={toggleReminder}>
              <ActionButtonIcon>
                <FontAwesome 
                  name={reminderEnabled ? "bell" : "bell-slash"} 
                  size={20} 
                  color="#6200ee" 
                />
              </ActionButtonIcon>
              <ActionButtonText>
                {reminderEnabled ? 'Disable Reminder' : 'Enable Reminder'}
              </ActionButtonText>
            </ActionButton>
            
            <ActionButton onPress={() => handleShare(medication.name)}>
              <ActionButtonIcon>
                <FontAwesome name="share-alt" size={20} color="#6200ee" />
              </ActionButtonIcon>
              <ActionButtonText>Share</ActionButtonText>
            </ActionButton>
          </ActionRow>
        </HeaderCard>
        
        <DetailSection>
          <SectionTitle>Instructions</SectionTitle>
          <InstructionsText>{medication.instructions}</InstructionsText>
        </DetailSection>
        
        <DetailSection>
          <SectionTitle>Description</SectionTitle>
          <DescriptionText>{medication.description}</DescriptionText>
        </DetailSection>
        
        <DetailSection>
          <SectionTitle>Side Effects</SectionTitle>
          {medication.sideEffects.map((effect, index) => (
            <SideEffectItem key={index}>
              <SideEffectBullet>•</SideEffectBullet>
              <SideEffectText>{effect}</SideEffectText>
            </SideEffectItem>
          ))}
        </DetailSection>
        
        <DetailSection>
          <SectionTitle>Prescription Information</SectionTitle>
          <PrescriptionInfo>
            <PrescriptionRow>
              <PrescriptionLabel>Doctor:</PrescriptionLabel>
              <PrescriptionValue>{medication.doctor}</PrescriptionValue>
            </PrescriptionRow>
            <PrescriptionRow>
              <PrescriptionLabel>Pharmacy:</PrescriptionLabel>
              <PrescriptionValue>{medication.pharmacy}</PrescriptionValue>
            </PrescriptionRow>
            <PrescriptionRow>
              <PrescriptionLabel>Rx Number:</PrescriptionLabel>
              <PrescriptionValue>{medication.prescriptionNumber}</PrescriptionValue>
            </PrescriptionRow>
          </PrescriptionInfo>
        </DetailSection>
      </ScrollView>
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
`;

const HeaderCard = styled.View`
  background-color: white;
  padding: 20px;
  margin-bottom: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const MedicationTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const MedicationSubtitle = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InfoItem = styled.View`
  align-items: center;
  flex: 1;
`;

const InfoIcon = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #f0e6ff;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const InfoLabel = styled.Text`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`;

const ActionButtonIcon = styled.View`
  margin-right: 8px;
`;

const ActionButtonText = styled.Text`
  font-size: 14px;
  color: #6200ee;
`;

const DetailSection = styled.View`
  background-color: white;
  padding: 20px;
  margin-bottom: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

const InstructionsText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
`;

const DescriptionText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
`;

const SideEffectItem = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const SideEffectBullet = styled.Text`
  font-size: 16px;
  color: #6200ee;
  margin-right: 8px;
`;

const SideEffectText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const PrescriptionInfo = styled.View`
  margin-top: 8px;
`;

const PrescriptionRow = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const PrescriptionLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  width: 100px;
`;

const PrescriptionValue = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  font-size: 18px;
  color: #d32f2f;
  text-align: center;
`; 