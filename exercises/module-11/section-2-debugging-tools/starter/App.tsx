/**
 * @fileoverview Main application entry point for the Pharmacy Inventory app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';
import InventoryList from './components/InventoryList';
import Header from './components/Header';
import { fetchInventory } from './api/inventoryApi';
import { Inventory } from './types';

// This app has several bugs to debug
const App: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  // Bug 1: Memory leak in useEffect cleanup
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        // Bug 2: No error handling for API call
        const data = await fetchInventory();
        
        // This will cause a warning if component unmounts before this completes
        if (isMounted) {
          setInventory(data);
          setLoading(false);
        }
      } catch (err) {
        // Bug 3: Error state not set properly
        console.error('Failed to load inventory', err);
      }
    };

    loadData();
    
    // Bug 4: Missing cleanup function
  }, [refreshCount]);

  // Bug 5: This function has a logical error
  const handleRefresh = () => {
    setLoading(true);
    // This should increment refreshCount to trigger the useEffect
    setRefreshCount(refreshCount);
  };

  // Bug 6: Infinite loop potential in this function
  const calculateTotalItems = () => {
    if (inventory.length === 0) return 0;
    
    let total = 0;
    for (let i = 0; i <= inventory.length; i++) {
      // Bug: Off-by-one error in loop condition and potential undefined access
      total += inventory[i]?.quantity || 0;
    }
    return total;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Pharmacy Inventory" />
      <MainContent>
        {loading ? (
          <LoadingText>Loading inventory...</LoadingText>
        ) : error ? (
          <ErrorView>
            <ErrorText>{error}</ErrorText>
            <Button title="Retry" onPress={handleRefresh} />
          </ErrorView>
        ) : (
          <>
            <StatsView>
              <StatsText>Total Items: {calculateTotalItems()}</StatsText>
              <Button title="Refresh" onPress={handleRefresh} />
            </StatsView>
            <InventoryList inventory={inventory} />
          </>
        )}
      </MainContent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

const MainContent = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f8f9fa;
`;

const LoadingText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
  color: #6c757d;
`;

const ErrorView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const ErrorText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 16px;
  color: #dc3545;
`;

const StatsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #e9ecef;
  border-radius: 8px;
`;

const StatsText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #495057;
`;

export default App; 