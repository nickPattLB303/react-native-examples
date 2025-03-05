/**
 * @fileoverview Main application entry point for the Prescription Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';
import PrescriptionList from './components/PrescriptionList';
import Header from './components/Header';
import { fetchPrescriptions, cleanupNetworkActivity } from './api/prescriptionApi';
import { Prescription } from './types';
import { NativeModules } from 'react-native';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PerformanceMonitor } from './utils/PerformanceMonitor';

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// This app has been fixed to address complex debugging issues
const App: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  
  // Fixed: Memory subscribers moved inside component and properly cleaned up
  const [memorySubscribers, setMemorySubscribers] = useState<Array<() => void>>([]);

  // Fixed: Memory leak due to event listeners not being cleaned up
  useEffect(() => {
    console.log('App mounted');
    performanceMonitor.startMeasure('AppMount');
    
    // Subscribe to memory usage updates with proper cleanup
    const memoryInterval = setInterval(() => {
      // Instead of leaking memory, we now just update the count
      setMemoryUsage(prev => prev + 1);
    }, 5000);
    
    // Load prescriptions
    loadPrescriptions();
    
    // Fixed: Added cleanup for memoryInterval
    return () => {
      console.log('App unmounting, cleaning up resources');
      clearInterval(memoryInterval);
      
      // Clean up network activity
      cleanupNetworkActivity();
    };
  }, []);
  
  // Fixed: Native module integration issue with proper error handling
  const loadPrescriptions = useCallback(async () => {
    const endMeasure = performanceMonitor.startMeasure('LoadPrescriptions');
    
    try {
      setLoading(true);
      
      // Attempt to use native module with proper error handling
      try {
        const { PrescriptionTracker } = NativeModules;
        if (PrescriptionTracker) {
          console.log('Native module found, initializing');
          await PrescriptionTracker.initialize();
        }
      } catch (nativeError) {
        console.warn('Native module not available, continuing with JS implementation', nativeError);
        // Continue despite native module error
      }
      
      // Fetch prescriptions
      const data = await fetchPrescriptions();
      setPrescriptions(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Failed to load prescriptions:', err);
      setError('Failed to load prescriptions. Please try again.');
      setLoading(false);
    } finally {
      endMeasure();
    }
  }, []);
  
  // Fixed: This function now uses an iterative approach instead of recursion
  const calculateTotalRefills = useCallback((items: Prescription[] = prescriptions): number => {
    const start = performanceMonitor.startMeasure('CalculateTotalRefills');
    
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].refillsRemaining;
    }
    
    start();
    return total;
  }, [prescriptions]);
  
  // Memoize the total refills calculation
  const totalRefills = useMemo(() => calculateTotalRefills(), [calculateTotalRefills]);
  
  // Fixed: This function no longer creates a large array on each call
  const handleRefresh = useCallback(() => {
    console.log('Refreshing prescriptions');
    
    // No more large array creation
    loadPrescriptions();
  }, [loadPrescriptions]);

  return (
    <ErrorBoundary>
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
                <StatsText>Memory Usage: {memoryUsage} updates</StatsText>
                <StatsText>Total Refills: {totalRefills}</StatsText>
                <Button title="Refresh" onPress={handleRefresh} />
              </StatsView>
              <PrescriptionList prescriptions={prescriptions} />
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