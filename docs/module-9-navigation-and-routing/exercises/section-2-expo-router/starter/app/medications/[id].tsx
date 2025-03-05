/**
 * @fileoverview Medication detail screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import styled from 'styled-components/native';

/**
 * Medication detail screen component displaying detailed information about a specific medication
 * @returns Medication detail screen component
 */
export default function MedicationDetailScreen() {
  // TODO: Use useLocalSearchParams to get the medication ID from the URL
  // const { id } = useLocalSearchParams();
  
  return (
    <Container>
      <Title>Medication Details</Title>
      
      {/* TODO: Display medication details based on the ID */}
      <Text>Implement the medication details here</Text>
      
      <BackButton onPress={() => router.back()}>
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