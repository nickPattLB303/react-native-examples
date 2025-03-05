/**
 * @fileoverview Exercise 3: Flexbox Layout Complete - Using styled-components
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';

/**
 * Enhanced medication card component with proper Flexbox layout using styled-components
 * @param {object} props - Component props
 * @param {string} props.name - Name of the medication
 * @param {string} props.dosage - Dosage information
 * @param {string} props.instructions - Usage instructions
 * @param {string} props.imageUrl - URL for the medication image
 * @returns {React.ReactElement} Medication card component
 */
interface MedicationCardProps {
  name: string;
  dosage: string;
  instructions: string;
  imageUrl: string;
}

// Card container with platform-specific shadow
const Card = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;

  /* Platform-specific shadow styling */
  ${Platform.OS === 'ios' ? `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
  ` : `
    elevation: 3;
  `}
`;

// Medication image
const MedicationImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin: 12px;
`;

// Content container
const ContentContainer = styled.View`
  flex: 1;
  padding-vertical: 12px;
  padding-right: 16px;
  justify-content: center;
`;

// Typography components with hierarchy
const MedicationName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 4px;
`;

const MedicationDosage = styled.Text`
  font-size: 16px;
  color: #495057;
  margin-bottom: 4px;
`;

const MedicationInstructions = styled.Text`
  font-size: 14px;
  color: #6c757d;
  line-height: 20px;
`;

// App container components
const AppContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const AppTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
  color: #212529;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export default function MedicationCard({ 
  name, 
  dosage, 
  instructions,
  imageUrl
}: MedicationCardProps) {
  return (
    <Card>
      <MedicationImage 
        source={{ uri: imageUrl }} 
        resizeMode="cover"
      />
      <ContentContainer>
        <MedicationName>{name}</MedicationName>
        <MedicationDosage>{dosage}</MedicationDosage>
        <MedicationInstructions>{instructions}</MedicationInstructions>
      </ContentContainer>
    </Card>
  );
}

/**
 * Main app component that demonstrates the MedicationCard
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    { 
      id: '1', 
      name: 'Amoxicillin', 
      dosage: '500mg - Every 8 hours', 
      instructions: 'Take with food. Complete full course.',
      imageUrl: 'https://www.drugs.com/images/pills/fio/ABM21510.JPG'
    },
    { 
      id: '2', 
      name: 'Lisinopril', 
      dosage: '10mg - Once daily', 
      instructions: 'Take in the morning. Avoid potassium supplements.',
      imageUrl: 'https://www.drugs.com/images/pills/fio/RDY12350.JPG'
    },
    { 
      id: '3', 
      name: 'Metformin', 
      dosage: '1000mg - Twice daily', 
      instructions: 'Take with meals to reduce stomach upset.',
      imageUrl: 'https://www.drugs.com/images/pills/fio/CIP00360.JPG'
    }
  ];

  return (
    <AppContainer>
      <AppTitle>
        My Medications
      </AppTitle>
      
      <ScrollContainer 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {medications.map(med => (
          <MedicationCard 
            key={med.id}
            name={med.name}
            dosage={med.dosage}
            instructions={med.instructions}
            imageUrl={med.imageUrl}
          />
        ))}
      </ScrollContainer>
    </AppContainer>
  );
}