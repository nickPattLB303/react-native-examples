/**
 * @fileoverview Component for displaying a list of prescriptions
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';
import PrescriptionItem from './PrescriptionItem';
import { Prescription } from '../types';

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

// This component has complex issues to debug
const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [renderCount, setRenderCount] = useState<number>(0);
  
  // Complex issue 1: Inefficient filtering in useEffect causing unnecessary renders
  useEffect(() => {
    // This will run on every render, not just when prescriptions or searchQuery change
    const filtered = prescriptions.filter(item => 
      item.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredPrescriptions(filtered);
    
    // Increment render count to demonstrate the issue
    setRenderCount(prev => prev + 1);
  });
  
  // Complex issue 2: This function creates a closure over the current state
  // and doesn't update when the state changes
  const handleItemPress = (id: string) => {
    console.log(`Prescription pressed: ${id}`);
    console.log(`Current search query: ${searchQuery}`);
    console.log(`Current render count: ${renderCount}`);
    
    // This will always log the initial value of filteredPrescriptions
    console.log(`Number of filtered prescriptions: ${filteredPrescriptions.length}`);
  };
  
  // Complex issue 3: This function is recreated on every render
  const renderPrescriptionItem = ({ item }: { item: Prescription }) => {
    // Create a new object on every render, causing unnecessary re-renders
    const itemWithExtra = {
      ...item,
      lastViewed: new Date().toISOString(),
    };
    
    return (
      <PrescriptionItem 
        prescription={itemWithExtra} 
        onPress={() => handleItemPress(item.id)} 
      />
    );
  };
  
  // Complex issue 4: Missing key extractor causing performance issues
  
  return (
    <Container>
      <SearchInput
        placeholder="Search prescriptions..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <DebugText>Render Count: {renderCount}</DebugText>
      <FlatList
        data={filteredPrescriptions}
        renderItem={renderPrescriptionItem}
        contentContainerStyle={styles.listContent}
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

const DebugText = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 8px;
`;

export default PrescriptionList; 