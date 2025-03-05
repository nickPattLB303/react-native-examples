/**
 * @fileoverview Add medication modal screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import styled from 'styled-components/native';

/**
 * Add medication modal screen component for adding new medications
 * @returns Add medication modal screen component
 */
export default function AddMedicationScreen() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [form, setForm] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const handleSave = () => {
    // Validate form
    if (!name || !dosage || !frequency) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    // In a real app, we would save the medication to a database or state management
    Alert.alert('Success', 'Medication added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };
  
  return (
    <Container>
      <Header>
        <Title>Add Medication</Title>
        <CloseButton onPress={() => router.back()}>
          <CloseText>X</CloseText>
        </CloseButton>
      </Header>
      
      <FormGroup>
        <Label>Medication Name *</Label>
        <StyledTextInput
          placeholder="Enter medication name"
          value={name}
          onChangeText={setName}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Dosage *</Label>
        <StyledTextInput
          placeholder="e.g., 500mg"
          value={dosage}
          onChangeText={setDosage}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Frequency *</Label>
        <StyledTextInput
          placeholder="e.g., 2x daily"
          value={frequency}
          onChangeText={setFrequency}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Form</Label>
        <StyledTextInput
          placeholder="e.g., Tablet, Capsule, Liquid"
          value={form}
          onChangeText={setForm}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Instructions</Label>
        <StyledTextInput
          placeholder="e.g., Take with food"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: 'top' }}
        />
      </FormGroup>
      
      <SaveButton onPress={handleSave}>
        <SaveButtonText>Save Medication</SaveButtonText>
      </SaveButton>
    </Container>
  );
}

// Styled Components
const Container = styled.ScrollView`
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