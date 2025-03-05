/**
 * @fileoverview Component for displaying a list of medications with performance optimizations
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import MedicationItem from './MedicationItem';
import { Medication } from '../types';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';

interface MedicationListProps {
  medications: Medication[];
}

const MedicationList: React.FC<MedicationListProps> = React.memo(({ medications }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const performanceMonitor = new PerformanceMonitor();
  
  // Memoize the filtered medications to avoid re-filtering on every render
  const filteredMedications = useMemo(() => {
    const start = performanceMonitor.startMeasure('FilterMedications');
    
    const result = medications.filter(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    start();
    return result;
  }, [medications, searchQuery]);
  
  // Memoize expensive calculation to avoid recalculating on every render
  const totalDosage = useMemo(() => {
    const start = performanceMonitor.startMeasure('CalculateTotalDosage');
    
    let total = 0;
    for (let i = 0; i < filteredMedications.length; i++) {
      const dosageStr = filteredMedications[i].dosage;
      const dosageValue = parseInt(dosageStr.replace(/[^0-9]/g, ''));
      if (!isNaN(dosageValue)) {
        total += dosageValue;
      }
    }
    
    start();
    return total;
  }, [filteredMedications]);
  
  // Use useCallback to maintain referential equality between renders
  const renderMedicationItem = useCallback(({ item }: { item: Medication }) => {
    return <MedicationItem medication={item} onPress={() => console.log(`Medication pressed: ${item.id}`)} />;
  }, []);
  
  // Use useCallback for the keyExtractor to maintain referential equality
  const keyExtractor = useCallback((item: Medication) => item.id, []);
  
  // Handle search input change
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);
  
  return (
    <Container>
      <SearchInput
        placeholder="Search medications..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      <TotalDosageText>Total Dosage: {totalDosage}mg</TotalDosageText>
      <FlatList
        data={filteredMedications}
        keyExtractor={keyExtractor}
        renderItem={renderMedicationItem}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        initialNumToRender={10}
      />
    </Container>
  );
});

MedicationList.displayName = 'MedicationList';

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