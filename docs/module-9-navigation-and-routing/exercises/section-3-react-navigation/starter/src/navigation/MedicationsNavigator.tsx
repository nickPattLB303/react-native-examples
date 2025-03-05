/**
 * @fileoverview Navigation stack for medications screens
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TODO: Import medication screens
// import MedicationsScreen from '../screens/MedicationsScreen';
// import MedicationDetailScreen from '../screens/MedicationDetailScreen';
// import AddMedicationScreen from '../screens/AddMedicationScreen';

/**
 * Navigation parameter types for type safety
 */
export type MedicationsStackParamList = {
  MedicationsList: undefined;
  MedicationDetail: { id: string };
  AddMedication: undefined;
};

const Stack = createNativeStackNavigator<MedicationsStackParamList>();

/**
 * Stack navigator for medication-related screens
 * @returns Stack navigator with medications list, detail, and add screens
 */
export default function MedicationsNavigator() {
  return (
    <Stack.Navigator>
      {/* TODO: Add stack screens */}
      {/* 
      <Stack.Screen
        name="MedicationsList"
        component={MedicationsScreen}
        options={{ title: 'Medications' }}
      />
      <Stack.Screen
        name="MedicationDetail"
        component={MedicationDetailScreen}
        options={{ title: 'Medication Details' }}
      />
      <Stack.Screen
        name="AddMedication"
        component={AddMedicationScreen}
        options={{ 
          title: 'Add Medication',
          presentation: 'modal'
        }}
      />
      */}
    </Stack.Navigator>
  );
} 