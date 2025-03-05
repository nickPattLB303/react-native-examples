import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

// Types for our state management analysis
interface StateType {
  name: string;
  category: 'local' | 'shared' | 'server' | 'persistent';
  origin: 'client' | 'server';
  persistence: 'ephemeral' | 'persistent';
  recommendedApproach: string;
  description: string;
}

// Comprehensive analysis of state types for a medication tracking app
const stateTypes: StateType[] = [
  {
    name: 'User Authentication',
    category: 'shared',
    origin: 'server',
    persistence: 'persistent',
    recommendedApproach: 'Zustand + AsyncStorage',
    description: 'User login state, authentication tokens, and user profile information.'
  },
  {
    name: 'Medication List',
    category: 'server',
    origin: 'server',
    persistence: 'persistent',
    recommendedApproach: 'React Query',
    description: 'List of medications fetched from the server API.'
  },
  {
    name: 'Medication Details',
    category: 'server',
    origin: 'server',
    persistence: 'persistent',
    recommendedApproach: 'React Query',
    description: 'Detailed information about specific medications.'
  },
  {
    name: 'Medication Schedule',
    category: 'server',
    origin: 'server',
    persistence: 'persistent',
    recommendedApproach: 'React Query + Local Cache',
    description: 'Schedule of when medications should be taken.'
  },
  {
    name: 'Medication Adherence',
    category: 'server',
    origin: 'client',
    persistence: 'persistent',
    recommendedApproach: 'React Query (Mutations)',
    description: 'Records of when medications were taken or missed.'
  },
  {
    name: 'Form Input State',
    category: 'local',
    origin: 'client',
    persistence: 'ephemeral',
    recommendedApproach: 'useState/useReducer',
    description: 'Temporary state for form inputs when adding or editing medications.'
  },
  {
    name: 'UI State',
    category: 'local',
    origin: 'client',
    persistence: 'ephemeral',
    recommendedApproach: 'useState/useReducer',
    description: 'UI state such as loading indicators, error messages, modal visibility, etc.'
  },
  {
    name: 'Filter/Sort Preferences',
    category: 'local',
    origin: 'client',
    persistence: 'ephemeral',
    recommendedApproach: 'useState/useReducer',
    description: 'User preferences for filtering and sorting medication lists.'
  },
  {
    name: 'Navigation State',
    category: 'shared',
    origin: 'client',
    persistence: 'ephemeral',
    recommendedApproach: 'React Navigation',
    description: 'Current screen, navigation history, and route parameters.'
  },
  {
    name: 'App Settings',
    category: 'shared',
    origin: 'client',
    persistence: 'persistent',
    recommendedApproach: 'Context API + AsyncStorage',
    description: 'User preferences such as theme, notification settings, etc.'
  },
  {
    name: 'Offline Data',
    category: 'persistent',
    origin: 'server',
    persistence: 'persistent',
    recommendedApproach: 'React Query + AsyncStorage',
    description: 'Cached data for offline use when the app is not connected to the internet.'
  },
  {
    name: 'Notification State',
    category: 'shared',
    origin: 'client',
    persistence: 'persistent',
    recommendedApproach: 'Zustand + AsyncStorage',
    description: 'State related to medication reminders and notifications.'
  }
];

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const StateCard = styled.View`
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

const StateName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const StateProperty = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 3px;
`;

const StateDescription = styled.Text`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  font-style: italic;
`;

// Category badges with different colors
const CategoryBadge = styled.View<{ category: string }>`
  background-color: ${props => {
    switch (props.category) {
      case 'local': return '#E3F2FD';
      case 'shared': return '#E8F5E9';
      case 'server': return '#FFF3E0';
      case 'persistent': return '#F3E5F5';
      default: return '#EEEEEE';
    }
  }};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-bottom: 8px;
`;

const CategoryText = styled.Text<{ category: string }>`
  color: ${props => {
    switch (props.category) {
      case 'local': return '#1565C0';
      case 'shared': return '#2E7D32';
      case 'server': return '#E65100';
      case 'persistent': return '#7B1FA2';
      default: return '#616161';
    }
  }};
  font-size: 12px;
  font-weight: bold;
`;

export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Title>MedTracker State Management Analysis</Title>
      <ScrollView>
        {stateTypes.map((stateType, index) => (
          <StateCard key={index}>
            <CategoryBadge category={stateType.category}>
              <CategoryText category={stateType.category}>{stateType.category.toUpperCase()}</CategoryText>
            </CategoryBadge>
            <StateName>{stateType.name}</StateName>
            <StateProperty>Origin: {stateType.origin}</StateProperty>
            <StateProperty>Persistence: {stateType.persistence}</StateProperty>
            <StateProperty>Recommended Approach: {stateType.recommendedApproach}</StateProperty>
            <StateDescription>{stateType.description}</StateDescription>
          </StateCard>
        ))}
      </ScrollView>
    </Container>
  );
} 