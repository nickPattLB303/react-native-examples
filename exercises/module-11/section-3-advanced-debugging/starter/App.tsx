/**
 * @fileoverview Main application entry point for the Prescription Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';
import PrescriptionList from './components/PrescriptionList';
import Header from './components/Header';
import { fetchPrescriptions } from './api/prescriptionApi';
import { Prescription } from './types';
import { NativeModules } from 'react-native';

// This app has complex issues to debug
const App: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);

  // Complex issue 1: Memory leak due to event listeners not being cleaned up
  useEffect(() => {
    // Subscribe to memory usage updates
    const memoryInterval = setInterval(() => {
      // This will cause increasing memory usage over time
      const newSubscribers = [...memorySubscribers, () => console.log('New subscriber')];
      memorySubscribers = newSubscribers;
      
      // Update memory usage display
      setMemoryUsage(newSubscribers.length);
    }, 1000);
    
    // Load prescriptions
    loadPrescriptions();
    
    // Missing cleanup for memoryInterval
  }, []);
  
  // Complex issue 2: Global variable causing memory leak
  let memorySubscribers: Array<() => void> = [];
  
  // Complex issue 3: Native module integration issue
  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      
      // Attempt to use native module (which may not be available)
      try {
        // This will throw an error if the native module is not properly linked
        const { PrescriptionTracker } = NativeModules;
        if (PrescriptionTracker) {
          await PrescriptionTracker.initialize();
        }
      } catch (nativeError) {
        console.error('Native module error:', nativeError);
        // Continue despite native module error
      }
      
      // Fetch prescriptions
      const data = await fetchPrescriptions();
      setPrescriptions(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load prescriptions:', err);
      setError('Failed to load prescriptions. Please try again.');
      setLoading(false);
    }
  };
  
  // Complex issue 4: This function has a recursive call that can cause a stack overflow
  const calculateTotalRefills = (items: Prescription[] = prescriptions, index: number = 0): number => {
    if (items.length === 0) return 0;
    if (index >= items.length) return 0;
    
    // Recursive call without proper base case
    return items[index].refillsRemaining + calculateTotalRefills(items, index + 1);
  };
  
  // Complex issue 5: This function creates a new large array on each call
  const handleRefresh = () => {
    // Create a large array that will be garbage collected
    const largeArray = new Array(1000000).fill('data');
    console.log('Large array created with length:', largeArray.length);
    
    // Refresh prescriptions
    loadPrescriptions();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Prescription Tracker" />
      <MainContent>
        {loading ? (
          <LoadingText>Loading prescriptions...</LoadingText>
        ) : error ? (
          <ErrorView>
            <ErrorText>{error}</ErrorText>
            <Button title="Retry" onPress={handleRefresh} />
          </ErrorView>
        ) : (
          <>
            <StatsView>
              <StatsText>Memory Usage: {memoryUsage} subscribers</StatsText>
              <StatsText>Total Refills: {calculateTotalRefills()}</StatsText>
              <Button title="Refresh" onPress={handleRefresh} />
            </StatsView>
            <PrescriptionList prescriptions={prescriptions} />
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
  flex-direction: column;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #e9ecef;
  border-radius: 8px;
`;

const StatsText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 8px;
`;

export default App; 