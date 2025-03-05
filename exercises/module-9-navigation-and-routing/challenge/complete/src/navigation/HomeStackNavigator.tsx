/**
 * Home Stack Navigator
 * 
 * This file implements the stack navigation for the Home tab.
 * It includes the Medication List screen and Medication Detail screen.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import MedicationDetailScreen from '../screens/MedicationDetailScreen';

// Import types
import { Medication } from '../data/medications';

// Define the home stack navigator param list type
export type HomeStackParamList = {
  MedicationsList: undefined;
  MedicationDetail: { medication: Medication };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MedicationsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4a8577',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="MedicationsList"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'PharmEasy',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // In a real app, this would navigate to a search screen
                alert('Search functionality would go here');
              }}
              style={{ marginRight: 15 }}
            >
              <FontAwesome name="search" size={22} color="#ffffff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MedicationDetail"
        component={MedicationDetailScreen}
        options={({ route }) => ({
          title: route.params.medication.name,
        })}
      />
    </Stack.Navigator>
  );
} 