/**
 * @fileoverview Entry point for the Medication Tracking app using React Navigation
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

// TODO: Import RootNavigator from './src/navigation/RootNavigator'

/**
 * Root component that wraps the entire application
 * Sets up the NavigationContainer and renders the root navigator
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* TODO: Add the RootNavigator component here */}
        {/* <RootNavigator /> */}
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
} 