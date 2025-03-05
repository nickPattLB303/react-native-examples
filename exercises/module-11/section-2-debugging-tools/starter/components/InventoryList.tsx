/**
 * @fileoverview Component for displaying a list of inventory items
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';
import InventoryItem from './InventoryItem';
import { Inventory } from '../types';

interface InventoryListProps {
  inventory: Inventory[];
}

// This component has several bugs to debug
const InventoryList: React.FC<InventoryListProps> = ({ inventory }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Bug 1: Inefficient filtering that doesn't handle null values
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Bug 2: This function doesn't handle the case when item is undefined
  const renderInventoryItem = ({ item }) => {
    // Bug 3: No type safety for item
    return <InventoryItem item={item} onPress={() => handleItemPress(item.id)} />;
  };
  
  // Bug 4: This function has a typo in the console.log
  const handleItemPress = (id: string) => {
    console.log(`Inventory item pressed: ${di}`);
  };
  
  return (
    <Container>
      <SearchInput
        placeholder="Search inventory..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {/* Bug 5: Missing key extractor */}
      <FlatList
        data={filteredInventory}
        renderItem={renderInventoryItem}
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

export default InventoryList; 