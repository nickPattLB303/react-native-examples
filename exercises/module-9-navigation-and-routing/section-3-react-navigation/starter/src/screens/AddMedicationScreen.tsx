/**
 * @fileoverview Add medication screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

/**
 * Type definition for navigation props
 */
type AddMedicationScreenProps = StackScreenProps<
  MedicationsStackParamList,
  'AddMedication'
>;

/**
 * Add medication screen component for adding new medications
 * @param navigation Navigation object for moving between screens
 * @returns Add medication screen component
 */
export default function AddMedicationScreen({ navigation }: AddMedicationScreenProps) {
  const handleSave = () => {
    // TODO: Implement form validation and saving logic
    
    // Navigate back to the list
    navigation.goBack();
  };
  
  return (
    <Container>
      <Header>
        <Title>Add Medication</Title>
        <CloseButton onPress={() => navigation.goBack()}>
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