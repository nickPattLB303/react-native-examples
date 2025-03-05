/**
 * Home Stack Navigator
 * 
 * This file should implement the stack navigation for the Home tab.
 * It should include the Medication List screen and Medication Detail screen.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: Import createNativeStackNavigator from @react-navigation/native-stack
// TODO: Import screens

// TODO: Define the home stack navigator param list type

export default function HomeStackNavigator() {
  // TODO: Implement the stack navigator
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Stack Navigator Placeholder</Text>
      <Text style={styles.instructions}>
        Implement the stack navigation for the Home tab with Medication List and Medication Detail screens.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a8577',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
}); 