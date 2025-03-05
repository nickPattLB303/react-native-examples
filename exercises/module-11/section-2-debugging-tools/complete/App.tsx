/**
 * @fileoverview Main application entry point for the Pharmacy Inventory app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';
import InventoryList from './components/InventoryList';
import Header from './components/Header';
import { fetchInventory } from './api/inventoryApi';
import { Inventory } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Logger } from './utils/Logger';

// Initialize logger
const logger = new Logger();

const App: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  // Fixed: Added proper cleanup function to prevent memory leaks
  useEffect(() => {
    logger.info('App mounted or refreshCount changed', { refreshCount });
    let isMounted = true;
    
    const loadData = async () => {
      try {
        logger.info('Fetching inventory data');
        // Fixed: Added proper error handling for API call
        const data = await fetchInventory();
        
        // This will not cause a warning if component unmounts before this completes
        if (isMounted) {
          logger.info('Inventory data fetched successfully', { count: data.length });
          setInventory(data);
          setLoading(false);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        // Fixed: Error state set properly
        logger.error('Failed to load inventory', { error: err instanceof Error ? err.message : String(err) });
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          setLoading(false);
        }
      }
    };

    loadData();
    
    // Fixed: Added cleanup function
    return () => {
      logger.info('App unmounting or refreshCount changing');
      isMounted = false;
    };
  }, [refreshCount]);

  // Fixed: This function now correctly increments refreshCount
  const handleRefresh = useCallback(() => {
    logger.info('Refresh requested');
    setLoading(true);
    // Fixed: Increment refreshCount to trigger the useEffect
    setRefreshCount(prevCount => prevCount + 1);
  }, []);

  // Fixed: This function now correctly calculates total items
  const calculateTotalItems = useCallback(() => {
    if (inventory.length === 0) return 0;
    
    logger.debug('Calculating total items', { inventoryLength: inventory.length });
    let total = 0;
    // Fixed: Corrected loop condition and added null/undefined check
    for (let i = 0; i < inventory.length; i++) {
      // Fixed: Safe access to quantity with fallback to 0
      total += inventory[i]?.quantity || 0;
    }
    return total;
  }, [inventory]);

  // Calculate total items
  const totalItems = calculateTotalItems();

  return (
    <ErrorBoundary>
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
                <StatsText>Total Items: {totalItems}</StatsText>
                <Button title="Refresh" onPress={handleRefresh} />
              </StatsView>
              <InventoryList inventory={inventory} />
            </>
          )}
        </MainContent>
      </SafeAreaView>
    </ErrorBoundary>
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