/**
 * @fileoverview Component for displaying a single prescription item
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Prescription } from '../types';

interface PrescriptionItemProps {
  prescription: Prescription & { lastViewed?: string };
  onPress: () => void;
}

// This component has complex issues to debug
const PrescriptionItem: React.FC<PrescriptionItemProps> = ({ prescription, onPress }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [detailsCache, setDetailsCache] = useState<string[]>([]);
  
  // Complex issue 1: Memory leak in useEffect
  useEffect(() => {
    // This array grows on every render
    setDetailsCache(prev => [...prev, `Viewed at ${new Date().toISOString()}`]);
    
    // Log details cache size to demonstrate the issue
    console.log(`Details cache size: ${detailsCache.length}`);
    
    // Missing cleanup function
  });
  
  // Complex issue 2: Expensive calculation on every render
  const calculateDaysRemaining = () => {
    const today = new Date();
    const expiryDate = new Date(prescription.expiryDate);
    const diffTime = Math.abs(expiryDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Simulate expensive calculation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    
    return diffDays;
  };
  
  // Calculate days remaining on every render
  const daysRemaining = calculateDaysRemaining();
  
  // Complex issue 3: This creates a new function on every render
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    onPress();
  };
  
  return (
    <ItemContainer onPress={toggleExpanded}>
      <Header>
        <MedicationText>{prescription.medication}</MedicationText>
        <RefillsText>Refills: {prescription.refillsRemaining}</RefillsText>
      </Header>
      <DetailsRow>
        <DetailText>Prescribed by: {prescription.prescribedBy}</DetailText>
        <DetailText>Dosage: {prescription.dosage}</DetailText>
      </DetailsRow>
      <Footer>
        <ExpiryText isExpiring={daysRemaining < 30}>
          Expires in: {daysRemaining} days
        </ExpiryText>
      </Footer>
      
      {isExpanded && (
        <ExpandedView>
          <InstructionsText>{prescription.instructions}</InstructionsText>
          <DetailText>Pharmacy: {prescription.pharmacy}</DetailText>
          <DetailText>Last Filled: {prescription.lastFilled}</DetailText>
          {prescription.lastViewed && (
            <DetailText>Last Viewed: {prescription.lastViewed}</DetailText>
          )}
          <DebugText>Cache Size: {detailsCache.length}</DebugText>
        </ExpandedView>
      )}
    </ItemContainer>
  );
};

const ItemContainer = styled(TouchableOpacity)`
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  background-color: white;
  border-color: #dee2e6;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MedicationText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  flex: 1;
`;

const RefillsText = styled.Text`
  font-size: 16px;
  color: #6c757d;
`;

const DetailsRow = styled.View`
  flex-direction: column;
  margin-bottom: 8px;
`;

const DetailText = styled.Text`
  font-size: 16px;
  color: #495057;
  margin-bottom: 4px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface ExpiryTextProps {
  isExpiring: boolean;
}

const ExpiryText = styled.Text<ExpiryTextProps>`
  font-size: 14px;
  color: ${props => props.isExpiring ? '#dc3545' : '#6c757d'};
`;

const ExpandedView = styled.View`
  margin-top: 12px;
  padding-top: 12px;
  border-top-width: 1px;
  border-top-color: #dee2e6;
`;

const InstructionsText = styled.Text`
  font-size: 16px;
  color: #212529;
  margin-bottom: 8px;
`;

const DebugText = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-top: 8px;
`;

export default PrescriptionItem; 