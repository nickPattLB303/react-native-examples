/**
 * @fileoverview Component for displaying a single medication item
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Medication } from '../types';

interface MedicationItemProps {
  medication: Medication;
  onPress: () => void;
}

// This component has performance issues to identify
const MedicationItem: React.FC<MedicationItemProps> = ({ medication, onPress }) => {
  // Expensive string operation on every render
  const formattedName = medication.name.toUpperCase() + ' - ' + medication.dosage;
  
  // Expensive date formatting on every render
  const lastRefill = new Date(medication.lastRefill);
  const formattedDate = `${lastRefill.getMonth() + 1}/${lastRefill.getDate()}/${lastRefill.getFullYear()}`;
  
  // Complex style calculations in render
  const dynamicStyle = {
    backgroundColor: medication.isLowStock ? '#fff3cd' : medication.isPrescription ? '#d1e7dd' : '#fff',
    borderColor: medication.isLowStock ? '#ffecb5' : medication.isPrescription ? '#badbcc' : '#dee2e6',
  };
  
  return (
    <ItemContainer style={dynamicStyle} onPress={onPress}>
      <Header>
        <NameText>{formattedName}</NameText>
        <DosageText>{medication.dosage}</DosageText>
      </Header>
      <DescriptionText>{medication.description}</DescriptionText>
      <Footer>
        <RefillText>Last Refill: {formattedDate}</RefillText>
        <CountText>Remaining: {medication.count}</CountText>
      </Footer>
    </ItemContainer>
  );
};

const ItemContainer = styled(TouchableOpacity)`
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-width: 1px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  flex: 1;
`;

const DosageText = styled.Text`
  font-size: 16px;
  color: #6c757d;
`;

const DescriptionText = styled.Text`
  font-size: 16px;
  color: #495057;
  margin-bottom: 12px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RefillText = styled.Text`
  font-size: 14px;
  color: #6c757d;
`;

const CountText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${props => (parseInt(props.children.split(' ')[1]) <= 5 ? '#dc3545' : '#212529')};
`;

export default MedicationItem; 