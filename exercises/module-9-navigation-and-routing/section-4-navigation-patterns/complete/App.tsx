/**
 * @fileoverview Entry point for the Medication Tracking app with complex navigation patterns
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

/**
 * Root component that wraps the entire application
 * Sets up the NavigationContainer and renders the root navigator
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
} 