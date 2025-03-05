/**
 * @fileoverview Add medication modal screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { Text, TextInput, Button } from 'react-native';
import { router } from 'expo-router';
import styled from 'styled-components/native';

/**
 * Add medication modal screen component for adding new medications
 * @returns Add medication modal screen component
 */
export default function AddMedicationScreen() {
  // TODO: Implement form state handling
  
  const handleSave = () => {
    // TODO: Implement saving the medication
    router.back();
  };
  
  return (
    <Container>
      <Header>
        <Title>Add Medication</Title>
        <CloseButton onPress={() => router.back()}>
          <CloseText>X</CloseText>
        </CloseButton>
      </Header>
      
      {/* TODO: Implement the add medication form */}
      <Text>Implement the add medication form here</Text>
      
      <SaveButton onPress={handleSave}>
        <SaveButtonText>Save Medication</SaveButtonText>
      </SaveButton>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
`;

const CloseButton = styled.Pressable`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #dee2e6;
  justify-content: center;
  align-items: center;
`;

const CloseText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #495057;
`;

const FormGroup = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: #495057;
  font-weight: 500;
`;

const StyledTextInput = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ced4da;
  font-size: 16px;
`;

const SaveButton = styled.Pressable`
  background-color: #0078D7;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 24px;
`;

const SaveButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`; 