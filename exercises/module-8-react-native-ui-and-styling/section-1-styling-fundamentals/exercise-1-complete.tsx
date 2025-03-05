/**
 * @fileoverview Exercise 1: Style Transformation Complete - Using styled-components
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import styled from 'styled-components/native';

/**
 * Component that displays styled information about a medication
 * @param {object} props - Component props
 * @param {string} props.name - Name of the medication
 * @param {string} props.dosage - Dosage of the medication
 * @param {string} props.schedule - Schedule for taking the medication
 * @returns {React.ReactElement} Styled medication item component
 */
interface MedicationItemProps {
  name: string;
  dosage: string;
  schedule: string;
}

// Styled container with platform-specific shadows
const ItemContainer = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  
  /* Platform-specific styling for shadows */
  ${Platform.OS === 'ios' ? `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
  ` : `
    elevation: 2;
  `}
`;

// Styled components for the medication icon
const MedicationIconContainer = styled.View`
  margin-right: 12px;
  border-radius: 20px;
  background-color: #f0f8ff;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const MedicationIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

// Styled components for the text content
const ContentContainer = styled.View`
  flex: 1;
`;

const MedicationName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const MedicationDosage = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 4px;
`;

const MedicationSchedule = styled.Text`
  font-size: 14px;
  color: #888;
`;

export default function MedicationItem({ name, dosage, schedule }: MedicationItemProps) {
  return (
    <ItemContainer>
      <MedicationIconContainer>
        <MedicationIcon 
          source={{ 
            uri: 'https://cdn-icons-png.flaticon.com/512/822/822163.png' 
          }}
        />
      </MedicationIconContainer>
      <ContentContainer>
        <MedicationName>{name}</MedicationName>
        <MedicationDosage>{dosage}</MedicationDosage>
        <MedicationSchedule>{schedule}</MedicationSchedule>
      </ContentContainer>
    </ItemContainer>
  );
}

// Styled components for the App container and title
const AppContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const AppTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px;
`;

/**
 * Main app component that demonstrates the styled MedicationItem
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: '3x daily' },
    { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: '1x daily' },
    { id: '3', name: 'Metformin', dosage: '1000mg', schedule: '2x daily' }
  ];

  return (
    <AppContainer>
      <AppTitle>My Medications</AppTitle>
      {medications.map(med => (
        <MedicationItem 
          key={med.id}
          name={med.name}
          dosage={med.dosage}
          schedule={med.schedule}
        />
      ))}
    </AppContainer>
  );
}