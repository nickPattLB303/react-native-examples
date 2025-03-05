/**
 * @fileoverview Component for displaying a single prescription item
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Prescription } from '../types';

interface PrescriptionItemProps {
  prescription: Prescription;
}

// Fixed component with optimized rendering and proper memory management
const PrescriptionItem: React.FC<PrescriptionItemProps> = ({ prescription }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Fixed: Memoize toggle function to prevent recreation on each render
  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);
  
  // Fixed: Calculate days until expiration with useMemo to prevent recalculation on every render
  const daysUntilExpiration = useMemo(() => {
    const today = new Date();
    const expiryDate = new Date(prescription.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [prescription.expiryDate]);
  
  // Fixed: Memoize the expiration status and color to prevent recalculation
  const { expirationStatus, statusColor } = useMemo(() => {
    if (daysUntilExpiration <= 0) {
      return { expirationStatus: 'Expired', statusColor: '#dc3545' };
    } else if (daysUntilExpiration <= 30) {
      return { expirationStatus: 'Expiring Soon', statusColor: '#ffc107' };
    } else {
      return { expirationStatus: 'Valid', statusColor: '#28a745' };
    }
  }, [daysUntilExpiration]);

  return (
    <Container>
      <MainContent>
        <MedicationName>{prescription.medication}</MedicationName>
        <DosageText>{prescription.dosage}</DosageText>
        
        <InfoRow>
          <InfoLabel>Refills:</InfoLabel>
          <InfoValue>{prescription.refillsRemaining}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Expires:</InfoLabel>
          <ExpirationValue style={{ color: statusColor }}>
            {prescription.expiryDate} ({expirationStatus}, {daysUntilExpiration} days)
          </ExpirationValue>
        </InfoRow>
        
        <ExpandButton onPress={toggleExpanded}>
          <ExpandButtonText>{expanded ? 'Hide Details' : 'Show Details'}</ExpandButtonText>
        </ExpandButton>
      </MainContent>
      
      {expanded && (
        <ExpandedContent>
          <DetailRow>
            <DetailLabel>Prescribed By:</DetailLabel>
            <DetailValue>{prescription.prescribedBy}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Pharmacy:</DetailLabel>
            <DetailValue>{prescription.pharmacy}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Last Filled:</DetailLabel>
            <DetailValue>{prescription.lastFilled}</DetailValue>
          </DetailRow>
          
          <InstructionsContainer>
            <DetailLabel>Instructions:</DetailLabel>
            <InstructionsText>{prescription.instructions}</InstructionsText>
          </InstructionsContainer>
        </ExpandedContent>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
  overflow: hidden;
`;

const MainContent = styled.View`
  padding: 16px;
`;

const MedicationName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 4px;
`;

const DosageText = styled.Text`
  font-size: 16px;
  color: #495057;
  margin-bottom: 8px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
  align-items: center;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  width: 70px;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: #212529;
`;

const ExpirationValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
`;

const ExpandButton = styled.TouchableOpacity`
  margin-top: 12px;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 4px;
`;

const ExpandButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
`;

const ExpandedContent = styled.View`
  padding: 16px;
  background-color: #f8f9fa;
  border-top-width: 1px;
  border-top-color: #e9ecef;
`;

const DetailRow = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const DetailLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  width: 120px;
`;

const DetailValue = styled.Text`
  font-size: 14px;
  color: #212529;
  flex: 1;
`;

const InstructionsContainer = styled.View`
  margin-top: 8px;
`;

const InstructionsText = styled.Text`
  font-size: 14px;
  color: #212529;
  margin-top: 4px;
  line-height: 20px;
`;

export default React.memo(PrescriptionItem); 