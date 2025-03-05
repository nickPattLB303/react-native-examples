/**
 * @fileoverview Component for displaying a list of medications
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import MedicationItem from './MedicationItem';
import { Medication } from '../types';

interface MedicationListProps {
  medications: Medication[];
}

// This component has several performance issues to identify and fix
const MedicationList: React.FC<MedicationListProps> = ({ medications }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Inefficient filtering implementation that runs on every render
  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Expensive calculation that runs on every render
  const calculateTotalDosage = () => {
    let total = 0;
    for (let i = 0; i < filteredMedications.length; i++) {
      // Parse dosage assuming format like "10mg"
      const dosageStr = filteredMedications[i].dosage;
      const dosageValue = parseInt(dosageStr.replace(/[^0-9]/g, ''));
      if (!isNaN(dosageValue)) {
        total += dosageValue;
      }
    }
    return total;
  };
  
  // This calculation runs on every render
  const totalDosage = calculateTotalDosage();
  
  // Inline function creation in render causes unnecessary rerenders
  const renderMedicationItem = ({ item }: { item: Medication }) => {
    return <MedicationItem medication={item} onPress={() => console.log(`Medication pressed: ${item.id}`)} />;
  };
  
  return (
    <Container>
      <SearchInput
        placeholder="Search medications..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TotalDosageText>Total Dosage: {totalDosage}mg</TotalDosageText>
      <FlatList
        data={filteredMedications}
        keyExtractor={item => item.id}
        renderItem={renderMedicationItem}
        contentContainerStyle={styles.listContent}
        // Missing key optimizations for FlatList
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});

const Container = styled.View`
  flex: 1;
`;

const SearchInput = styled.TextInput`
  height: 50px;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  background-color: white;
  border: 1px solid #ced4da;
  margin-bottom: 16px;
`;

const TotalDosageText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 12px;
`;

export default MedicationList; 