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

// TODO: Identify and analyze different types of state needed for a medication tracking app
// For each type of state, create an entry in the stateTypes array with the following information:
// - name: Name of the state (e.g., "User Authentication")
// - category: Whether it's local, shared, server, or persistent state
// - origin: Whether it originates from the client or server
// - persistence: Whether it's ephemeral (temporary) or persistent (needs to be saved)
// - recommendedApproach: The recommended state management approach (e.g., "Context API", "React Query")
// - description: A brief description of what this state is used for

const stateTypes: StateType[] = [
  // Example:
  {
    name: 'User Preferences',
    category: 'shared',
    origin: 'client',
    persistence: 'persistent',
    recommendedApproach: 'Context API + AsyncStorage',
    description: 'User preferences such as theme, notification settings, etc.'
  },
  // Add more state types here...
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

export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Title>MedTracker State Management Analysis</Title>
      <ScrollView>
        {stateTypes.map((stateType, index) => (
          <StateCard key={index}>
            <StateName>{stateType.name}</StateName>
            <StateProperty>Category: {stateType.category}</StateProperty>
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