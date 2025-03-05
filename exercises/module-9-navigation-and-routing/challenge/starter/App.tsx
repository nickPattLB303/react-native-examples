/**
 * PharmEasy App - Navigation Challenge Starter
 * 
 * This is the entry point for the PharmEasy app navigation challenge.
 * Your task is to implement a tab-based navigation structure with nested stack navigation.
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';

// TODO: Import NavigationContainer from @react-navigation/native
// TODO: Import your root navigator component

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to PharmEasy!</Text>
        <Text style={styles.instructions}>
          To get started, implement the navigation structure as described in the challenge.
        </Text>
        <Text style={styles.hint}>
          Hint: Start by creating your tab navigator in the navigation folder.
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a8577', // Pharmacy green color
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
}); 