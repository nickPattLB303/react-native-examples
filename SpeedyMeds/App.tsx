import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator'; // Import the navigator

export default function App() {
  return (
    <>
      {/* The NavigationContainer is now inside AppNavigator */}
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
