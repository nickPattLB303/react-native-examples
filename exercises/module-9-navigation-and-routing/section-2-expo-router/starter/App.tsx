/**
 * @fileoverview Entry point for the Medication Tracking app using Expo Router
 * @author React Native Training Course
 * @created 2023-06-01
 */

import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Root layout component that wraps the entire application
 * The Slot component is used by Expo Router to render the current route
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Slot />
    </SafeAreaProvider>
  );
} 