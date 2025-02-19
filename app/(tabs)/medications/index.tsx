/**
 * @module MedicationsScreen
 * @description Main medications list screen component
 * @since 1.0.0
 */

import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * @function MedicationsScreen
 * @description Displays a list of medications and provides navigation to medication details
 * @returns {React.ReactElement} A screen component showing the medications list
 */
export default function MedicationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Medications</ThemedText>
      <Link href="/medications/details" asChild>
        <Button mode="contained">View Details</Button>
      </Link>
    </ThemedView>
  );
}

/**
 * @constant styles
 * @description StyleSheet for the MedicationsScreen component
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
}); 