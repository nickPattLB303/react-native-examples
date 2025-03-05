/**
 * @fileoverview Medications navigator for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// TODO: Import screens
// import MedicationsScreen from '../screens/MedicationsScreen';
// import MedicationDetailScreen from '../screens/MedicationDetailScreen';
// import AddMedicationScreen from '../screens/AddMedicationScreen';

/**
 * Navigation parameter types for the medications stack
 */
export type MedicationsStackParamList = {
  MedicationsList: undefined;
  MedicationDetails: { id: string; name: string };
  AddMedication: undefined;
};

const Stack = createNativeStackNavigator<MedicationsStackParamList>();

/**
 * Medications stack navigator component
 * Handles medication-related screens (list, details, add medication)
 * @returns Medications stack navigator
 */
export default function MedicationsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MedicationsList"
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
        headerStyle: {
          backgroundColor: '#f8f8f8',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* TODO: Add stack screens for medications */}
      {/* 
      <Stack.Screen
        name="MedicationsList"
        component={MedicationsScreen}
        options={({ navigation }) => ({
          title: 'My Medications',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('AddMedication')}
              style={{ marginRight: 10 }}
            >
              <FontAwesome name="plus" size={24} color="#6200ee" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MedicationDetails"
        component={MedicationDetailScreen}
        options={({ route }) => ({
          title: route.params.name || 'Medication Details',
        })}
      />
      <Stack.Screen
        name="AddMedication"
        component={AddMedicationScreen}
        options={{
          title: 'Add Medication',
          presentation: 'modal',
        }}
      />
      */}
    </Stack.Navigator>
  );
} 