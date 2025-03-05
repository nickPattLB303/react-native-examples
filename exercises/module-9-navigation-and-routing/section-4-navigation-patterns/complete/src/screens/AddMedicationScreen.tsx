/**
 * @fileoverview Add Medication screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { ScrollView, Alert, Platform } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

// Type for navigation props
type AddMedicationScreenProps = StackScreenProps<
  MedicationsStackParamList,
  'AddMedication'
>;

// Medication form options
const medicationForms = ['Tablet', 'Capsule', 'Liquid', 'Injection', 'Other'];
const frequencyOptions = ['Once daily', 'Twice daily', 'Three times daily', 'Every 12 hours', 'Weekly', 'As needed'];

/**
 * Add Medication screen component
 * Allows users to add a new medication to their list
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Add Medication screen component
 */
export default function AddMedicationScreen({ navigation }: AddMedicationScreenProps) {
  // State for form fields
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [form, setForm] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // Handle save button press
  const handleSave = () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a medication name');
      return;
    }
    
    if (!dosage.trim()) {
      Alert.alert('Error', 'Please enter a dosage');
      return;
    }
    
    if (!frequency) {
      Alert.alert('Error', 'Please select a frequency');
      return;
    }
    
    if (!form) {
      Alert.alert('Error', 'Please select a medication form');
      return;
    }
    
    // In a real app, this would save to a database
    // For now, we'll just show a success message and go back
    Alert.alert(
      'Success',
      `${name} added to your medications`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };
  
  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <FormGroup>
          <Label>Medication Name</Label>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter medication name"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Dosage</Label>
          <Input
            value={dosage}
            onChangeText={setDosage}
            placeholder="e.g., 10 mg"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Form</Label>
          <PickerContainer>
            {medicationForms.map((option) => (
              <PickerOption 
                key={option} 
                selected={form === option}
                onPress={() => setForm(option)}
              >
                <PickerOptionText selected={form === option}>
                  {option}
                </PickerOptionText>
              </PickerOption>
            ))}
          </PickerContainer>
        </FormGroup>
        
        <FormGroup>
          <Label>Frequency</Label>
          <PickerContainer>
            {frequencyOptions.map((option) => (
              <PickerOption 
                key={option} 
                selected={frequency === option}
                onPress={() => setFrequency(option)}
              >
                <PickerOptionText selected={frequency === option}>
                  {option}
                </PickerOptionText>
              </PickerOption>
            ))}
          </PickerContainer>
        </FormGroup>
        
        <FormGroup>
          <Label>Instructions</Label>
          <TextArea
            value={instructions}
            onChangeText={setInstructions}
            placeholder="e.g., Take with food"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </FormGroup>
      </ScrollView>
      
      <ButtonContainer>
        <SaveButton onPress={handleSave}>
          <SaveButtonText>Save Medication</SaveButtonText>
        </SaveButton>
        <CancelButton onPress={() => navigation.goBack()}>
          <CancelButtonText>Cancel</CancelButtonText>
        </CancelButton>
      </ButtonContainer>
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
  padding: 20px;
`;

const FormGroup = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  border-width: 1px;
  border-color: #ddd;
`;

const TextArea = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  border-width: 1px;
  border-color: #ddd;
  min-height: 100px;
`;

const PickerContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: -5px;
`;

const PickerOption = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${props => props.selected ? '#6200ee' : 'white'};
  border-radius: 20px;
  padding: 8px 16px;
  margin: 5px;
  border-width: 1px;
  border-color: ${props => props.selected ? '#6200ee' : '#ddd'};
`;

const PickerOptionText = styled.Text<{ selected: boolean }>`
  color: ${props => props.selected ? 'white' : '#333'};
  font-size: 14px;
`;

const ButtonContainer = styled.View`
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: #ddd;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-bottom: 12px;
`;

const SaveButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`;

const CancelButtonText = styled.Text`
  color: #6200ee;
  font-size: 16px;
  font-weight: 500;
`; 