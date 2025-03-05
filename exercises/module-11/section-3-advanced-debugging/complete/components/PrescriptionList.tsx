/**
 * @fileoverview Component for displaying a list of prescriptions with search functionality
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FlatList, TextInput, View, Text } from 'react-native';
import styled from 'styled-components/native';
import PrescriptionItem from './PrescriptionItem';
import { Prescription } from '../types';

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

// Fixed component with optimized rendering and proper state management
const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const renderCount = useRef(0);
  
  // Increment render count on each render
  useEffect(() => {
    renderCount.current += 1;
  });
  
  // Fixed: Memoize the filtered prescriptions to prevent unnecessary recalculations
  const filteredPrescriptions = useMemo(() => {
    console.log('Filtering prescriptions');
    if (!searchQuery.trim()) {
      return prescriptions;
    }
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return prescriptions.filter(prescription => 
      prescription.medication.toLowerCase().includes(lowerCaseQuery) ||
      prescription.prescribedBy.toLowerCase().includes(lowerCaseQuery)
    );
  }, [prescriptions, searchQuery]);
  
  // Fixed: Memoize the handleSearch function to prevent recreating on each render
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);
  
  // Fixed: Memoize the renderItem function to prevent recreating on each render
  const renderItem = useCallback(({ item }: { item: Prescription }) => (
    <PrescriptionItem prescription={item} />
  ), []);
  
  // Fixed: Memoize the keyExtractor function
  const keyExtractor = useCallback((item: Prescription) => item.id, []);
  
  // Fixed: Memoize the ListEmptyComponent to prevent recreating on each render
  const ListEmptyComponent = useMemo(() => (
    <EmptyListContainer>
      <EmptyListText>No prescriptions found</EmptyListText>
    </EmptyListContainer>
  ), []);

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          placeholder="Search medications or doctors..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </SearchContainer>
      
      <RenderCountContainer>
        <RenderCountText>Render count: {renderCount.current}</RenderCountText>
        <RenderCountText>Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions</RenderCountText>
      </RenderCountContainer>
      
      <FlatList
        data={filteredPrescriptions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const SearchContainer = styled.View`
  padding: 8px 16px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  font-size: 16px;
  color: #212529;
`;

const RenderCountContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  margin-bottom: 8px;
  background-color: #e9ecef;
  border-radius: 8px;
`;

const RenderCountText = styled.Text`
  font-size: 14px;
  color: #6c757d;
`;

const EmptyListContainer = styled.View`
  padding: 32px 16px;
  align-items: center;
  justify-content: center;
`;

const EmptyListText = styled.Text`
  font-size: 18px;
  color: #6c757d;
  text-align: center;
`;

export default React.memo(PrescriptionList); 