/**
 * @module MedicationsScreen
 * @description Main medications list screen component
 * @since 1.0.0
 */

import { Link } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function MedicationsScreen
 * @description Displays a list of medications and provides navigation to medication details
 * @returns {React.ReactElement} A screen component showing the medications list
 */
export default function MedicationsScreen() {
  return (
    <ScreenContainer>
      <ThemedText type="title">Medications</ThemedText>
      <Link href="/medications/details" asChild>
        <Button mode="contained">View Details</Button>
      </Link>
    </ScreenContainer>
  );
} 