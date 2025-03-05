/**
 * @fileoverview Medications list screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

// Sample medications data
const sampleMedications = [
  {
    id: '1',
    name: 'Aspirin',
    dosage: '81 mg',
    frequency: 'Daily',
    form: 'Tablet',
    nextDose: '8:00 AM',
    refillDate: '07/15/2023',
    instructions: 'Take with food',
  },
  {
    id: '2',
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'Daily',
    form: 'Capsule',
    nextDose: '9:00 AM',
    refillDate: '08/20/2023',
    instructions: 'Take with breakfast',
  },
  {
    id: '3',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Daily',
    form: 'Tablet',
    nextDose: '1:00 PM',
    refillDate: '06/30/2023',
    instructions: 'Take before lunch',
  },
  {
    id: '4',
    name: 'Simvastatin',
    dosage: '20 mg',
    frequency: 'Once daily',
    form: 'Tablet',
    nextDose: '8:00 PM',
    refillDate: '07/10/2023',
    instructions: 'Take in the evening',
  },
  {
    id: '5',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    form: 'Tablet',
    nextDose: '6:00 PM',
    refillDate: '07/05/2023',
    instructions: 'Take with meals',
  },
];

// Type for navigation props
type MedicationsScreenProps = StackScreenProps<
  MedicationsStackParamList,
  'MedicationsList'
>;

// Medication item component
const MedicationItem = ({ 
  item, 
  onPress 
}: { 
  item: typeof sampleMedications[0],
  onPress: () => void 
}) => (
  <MedicationCard onPress={onPress}>
    <MedicationInfo>
      <MedicationName>{item.name}</MedicationName>
      <MedicationDetails>
        {item.dosage} · {item.frequency}
      </MedicationDetails>
      <NextDoseContainer>
        <FontAwesome name="clock-o" size={14} color="#666" />
        <NextDoseText>Next dose: {item.nextDose}</NextDoseText>
      </NextDoseContainer>
    </MedicationInfo>
    <MedicationFormContainer form={item.form.toLowerCase()}>
      <MedicationFormText>{item.form}</MedicationFormText>
    </MedicationFormContainer>
    <ArrowContainer>
      <FontAwesome name="chevron-right" size={16} color="#999" />
    </ArrowContainer>
  </MedicationCard>
);

/**
 * Medications list screen component
 * Displays a list of medications and allows navigation to details
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Medications list screen component
 */
export default function MedicationsScreen({ navigation }: MedicationsScreenProps) {
  return (
    <Container>
      <FlatList
        data={sampleMedications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationItem
            item={item}
            onPress={() => 
              navigation.navigate('MedicationDetails', { 
                id: item.id,
                name: item.name
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
  padding: 0 20px;
`;

const MedicationCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const MedicationInfo = styled.View`
  flex: 1;
`;

const MedicationName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const MedicationDetails = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const NextDoseContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NextDoseText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-left: 6px;
`;

const MedicationFormContainer = styled.View<{ form: string }>`
  background-color: ${props => {
    switch (props.form) {
      case 'tablet':
        return '#e1f5fe';
      case 'capsule':
        return '#fff8e1';
      case 'liquid':
        return '#e0f2f1';
      case 'injection':
        return '#f3e5f5';
      default:
        return '#f5f5f5';
    }
  }};
  padding: 6px 12px;
  border-radius: 16px;
  margin-right: 12px;
`;

const MedicationFormText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #333;
`;

const ArrowContainer = styled.View`
  padding: 8px;
`; 