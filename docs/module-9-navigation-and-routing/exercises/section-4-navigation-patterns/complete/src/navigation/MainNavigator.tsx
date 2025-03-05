/**
 * @fileoverview Main navigator for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

// Import navigators and screens
import HomeScreen from '../screens/HomeScreen';
import MedicationsNavigator from './MedicationsNavigator';
import SettingsNavigator from './SettingsNavigator';

/**
 * Navigation parameter types for the main bottom tabs
 */
export type MainTabParamList = {
  Home: undefined;
  Medications: undefined;
  Settings: { logout: () => void };
};

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main tab navigator component
 * Handles main application tabs (Home, Medications, Settings)
 * @param {object} route - Route object containing params passed from parent
 * @returns Main tab navigator
 */
export default function MainNavigator({ route }: any) {
  // Get logout function from params passed by RootNavigator
  const { logout } = route.params;
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#757575',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="medkit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        initialParams={{ logout }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 