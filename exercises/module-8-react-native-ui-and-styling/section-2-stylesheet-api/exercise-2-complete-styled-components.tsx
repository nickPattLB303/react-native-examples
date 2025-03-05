/**
 * @fileoverview Exercise 2: StyleSheet API Refactoring with Styled Components
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

/**
 * Component displaying a medication reminder with status
 * @param {object} props - Component props
 * @param {string} props.medication - Name of the medication
 * @param {string} props.time - Time the medication should be taken
 * @param {boolean} props.isOverdue - Whether the medication is overdue
 * @returns {React.ReactElement} Medication reminder component
 */
interface MedicationReminderProps {
  medication: string;
  time: string;
  isOverdue: boolean;
}

// Theme/design system
const theme = {
  colors: {
    primary: '#1890ff',
    error: '#ff4d4f',
    textPrimary: '#333',
    textSecondary: '#666',
    background: '#f5f5f5',
    card: 'white',
  },
  spacing: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
    xxlarge: 40,
  },
  borderRadius: {
    small: 4,
    medium: 8,
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    medicationName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    medicationTime: {
      fontSize: 16,
    },
    button: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
};

// Styled Components
const ReminderContainer = styled.View<{ isOverdue: boolean }>`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.medium}px;
  padding: ${theme.spacing.large}px;
  margin-bottom: ${theme.spacing.medium}px;
  border-left-width: 4px;
  border-left-color: ${props => props.isOverdue ? theme.colors.error : theme.colors.primary};
`;

const MedicationName = styled.Text<{ isOverdue: boolean }>`
  font-size: ${theme.typography.medicationName.fontSize}px;
  font-weight: ${theme.typography.medicationName.fontWeight};
  margin-bottom: ${theme.spacing.small}px;
  color: ${props => props.isOverdue ? theme.colors.error : theme.colors.textPrimary};
`;

const MedicationTime = styled.Text<{ isOverdue: boolean }>`
  font-size: ${theme.typography.medicationTime.fontSize}px;
  margin-bottom: ${theme.spacing.small + 2}px;
  color: ${props => props.isOverdue ? theme.colors.error : theme.colors.textSecondary};
`;

const ActionButton = styled.TouchableOpacity<{ isOverdue: boolean }>`
  background-color: ${props => props.isOverdue ? theme.colors.error : theme.colors.primary};
  padding-vertical: ${theme.spacing.small}px;
  padding-horizontal: ${theme.spacing.medium}px;
  border-radius: ${theme.borderRadius.small}px;
  align-self: flex-start;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: ${theme.typography.button.fontWeight};
  font-size: ${theme.typography.button.fontSize}px;
`;

const AppContainer = styled.View`
  flex: 1;
  padding: ${theme.spacing.xlarge}px;
  background-color: ${theme.colors.background};
`;

const AppTitle = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
  margin-bottom: ${theme.spacing.xlarge}px;
  margin-top: ${theme.spacing.xxlarge}px;
  color: ${theme.colors.textPrimary};
`;

export default function MedicationReminder({ 
  medication, 
  time, 
  isOverdue 
}: MedicationReminderProps) {
  return (
    <ReminderContainer isOverdue={isOverdue}>
      <MedicationName isOverdue={isOverdue}>
        {medication}
      </MedicationName>
      <MedicationTime isOverdue={isOverdue}>
        {time}
      </MedicationTime>
      <ActionButton isOverdue={isOverdue}>
        <ButtonText>
          {isOverdue ? 'Take Now' : 'Mark as Taken'}
        </ButtonText>
      </ActionButton>
    </ReminderContainer>
  );
}

/**
 * Main app component that demonstrates the MedicationReminder component
 * @returns {React.ReactElement} App component
 */
export function App() {
  const reminders = [
    { id: '1', medication: 'Amoxicillin', time: '8:00 AM', isOverdue: false },
    { id: '2', medication: 'Lisinopril', time: '12:00 PM', isOverdue: true },
    { id: '3', medication: 'Metformin', time: '6:00 PM', isOverdue: false }
  ];

  return (
    <AppContainer>
      <AppTitle>
        Medication Reminders
      </AppTitle>
      {reminders.map(reminder => (
        <MedicationReminder
          key={reminder.id}
          medication={reminder.medication}
          time={reminder.time}
          isOverdue={reminder.isOverdue}
        />
      ))}
    </AppContainer>
  );
}