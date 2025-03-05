/**
 * @fileoverview Main application entry point for the Medication Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import MedicationList from './components/MedicationList';
import Header from './components/Header';
import { fetchMedications } from './api/medicationApi';
import { Medication } from './types';
import { PerformanceMonitor } from './utils/PerformanceMonitor';

// Create a performance monitor instance
const performanceMonitor = new PerformanceMonitor();

const App: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(60);

  // Use a stable reference for the performance callback
  const updateFps = useCallback((currentFps: number) => {
    setFps(Math.round(currentFps));
  }, []);

  useEffect(() => {
    // Start measuring app load time
    const endMeasure = performanceMonitor.startMeasure('AppLoadTime');

    const loadData = async () => {
      try {
        // Start measuring API fetch time
        const endFetchMeasure = performanceMonitor.startMeasure('FetchMedications');
        const data = await fetchMedications();
        endFetchMeasure();

        setMedications(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load medications');
        setLoading(false);
      } finally {
        // End measuring app load time
        endMeasure();
      }
    };

    loadData();

    // Start monitoring FPS
    const stopMonitoring = performanceMonitor.monitorFrameRate(updateFps);

    return () => {
      stopMonitoring();
    };
  }, [updateFps]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Medication Tracker" />
      <MainContent>
        {loading ? (
          <LoadingText>Loading medications...</LoadingText>
        ) : error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <MedicationList medications={medications} />
        )}
      </MainContent>
      <PerformanceIndicator>
        <Text style={styles.performanceText}>FPS: {fps} | Medications: {medications.length}</Text>
      </PerformanceIndicator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  performanceText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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

const ErrorText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
  color: #dc3545;
`;

const PerformanceIndicator = styled.View`
  padding: 8px;
  background-color: #e9ecef;
`;

export default App; 