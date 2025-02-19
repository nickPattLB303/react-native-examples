/**
 * @module MedicationDetailsScreen
 * @description Medication details screen component
 * @since 1.0.0
 */

import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function MedicationDetailsScreen
 * @description Displays detailed information about a specific medication
 * @returns {React.ReactElement} A screen component showing medication details
 */
export default function MedicationDetailsScreen() {
  return (
    <ScreenContainer>
      <ThemedText type="title">Medication Details</ThemedText>
    </ScreenContainer>
  );
} 