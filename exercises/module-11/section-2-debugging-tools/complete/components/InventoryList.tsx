/**
 * @fileoverview Component for displaying a list of inventory items
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';
import InventoryItem from './InventoryItem';
import { Inventory } from '../types';
import { Logger } from '../utils/Logger';

interface InventoryListProps {
  inventory: Inventory[];
}

// Initialize logger
const logger = new Logger();

const InventoryList: React.FC<InventoryListProps> = ({ inventory }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Fixed: Efficient filtering with null/undefined checks
  const filteredInventory = useMemo(() => {
    logger.debug('Filtering inventory', { searchQuery, inventoryLength: inventory.length });
    
    return inventory.filter(item => {
      // Safe access to properties with null/undefined checks
      const nameMatch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      const categoryMatch = item.category?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      return nameMatch || categoryMatch;
    });
  }, [inventory, searchQuery]);
  
  // Fixed: Added type safety and proper error handling
  const renderInventoryItem = useCallback(({ item }: { item: Inventory }) => {
    return <InventoryItem item={item} onPress={() => handleItemPress(item.id)} />;
  }, []);
  
  // Fixed: Corrected typo in console.log
  const handleItemPress = useCallback((id: string) => {
    logger.info('Inventory item pressed', { id });
  }, []);
  
  // Fixed: Added keyExtractor with useCallback for optimization
  const keyExtractor = useCallback((item: Inventory) => item.id, []);
  
  // Handle search input change
  const handleSearchChange = useCallback((text: string) => {
    logger.debug('Search query changed', { text });
    setSearchQuery(text);
  }, []);
  
  return (
    <Container>
      <SearchInput
        placeholder="Search inventory..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      
      {/* Fixed: Added key extractor and performance optimizations */}
      <FlatList
        data={filteredInventory}
        renderItem={renderInventoryItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
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

export default InventoryList; 