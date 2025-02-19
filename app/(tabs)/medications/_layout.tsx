/**
 * @module MedicationsLayout
 * @description Stack navigation layout for the Medications section
 * @since 1.0.0
 */

import { Stack } from 'expo-router';
import React from 'react';

/**
 * @function MedicationsLayout
 * @description Manages the stack navigation for the Medications tab, including list and detail views
 * @returns {React.ReactElement} A stack navigator component for medication-related screens
 */
export default function MedicationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Medications',
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Medication Details',
        }}
      />
    </Stack>
  );
} 