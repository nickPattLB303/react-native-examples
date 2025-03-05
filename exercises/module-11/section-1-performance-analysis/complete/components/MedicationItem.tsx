/**
 * @fileoverview Component for displaying a single medication item with performance optimizations
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Medication } from '../types';

interface MedicationItemProps {
  medication: Medication;
  onPress: () => void;
}

// Use React.memo to prevent re-renders when props haven't changed
const MedicationItem: React.FC<MedicationItemProps> = React.memo(
  ({ medication, onPress }) => {
    // Memoize expensive string operations
    const formattedName = useMemo(() => {
      return medication.name.toUpperCase() + ' - ' + medication.dosage;
    }, [medication.name, medication.dosage]);
    
    // Memoize expensive date formatting
    const formattedDate = useMemo(() => {
      const lastRefill = new Date(medication.lastRefill);
      return `${lastRefill.getMonth() + 1}/${lastRefill.getDate()}/${lastRefill.getFullYear()}`;
    }, [medication.lastRefill]);
    
    // Memoize complex style calculations
    const dynamicStyle = useMemo(() => ({
      backgroundColor: medication.isLowStock ? '#fff3cd' : medication.isPrescription ? '#d1e7dd' : '#fff',
      borderColor: medication.isLowStock ? '#ffecb5' : medication.isPrescription ? '#badbcc' : '#dee2e6',
    }), [medication.isLowStock, medication.isPrescription]);
    
    // Determine if count is low (memoize the calculation)
    const isLowCount = useMemo(() => medication.count <= 5, [medication.count]);
    
    return (
      <ItemContainer style={dynamicStyle} onPress={onPress}>
        <Header>
          <NameText>{formattedName}</NameText>
          <DosageText>{medication.dosage}</DosageText>
        </Header>
        <DescriptionText>{medication.description}</DescriptionText>
        <Footer>
          <RefillText>Last Refill: {formattedDate}</RefillText>
          <CountText isLow={isLowCount}>
            Remaining: {medication.count}
          </CountText>
        </Footer>
      </ItemContainer>
    );
  }
);

// Add display name for debugging
MedicationItem.displayName = 'MedicationItem';

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

// Use props for conditional styling instead of parsing children
interface CountTextProps {
  isLow: boolean;
}

const CountText = styled.Text<CountTextProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.isLow ? '#dc3545' : '#212529'};
`;

export default MedicationItem; 