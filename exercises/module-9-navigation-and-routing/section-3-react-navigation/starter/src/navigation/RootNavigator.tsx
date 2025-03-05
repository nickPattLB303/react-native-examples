/**
 * @fileoverview Root navigator for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// TODO: Import screens
// import HomeScreen from '../screens/HomeScreen';
// import MedicationsNavigator from './MedicationsNavigator';
// import ProfileScreen from '../screens/ProfileScreen';

/**
 * Navigation parameter types for type safety
 */
export type RootTabParamList = {
  Home: undefined;
  Medications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

/**
 * Root tab navigator component
 * @returns Bottom tab navigator with Home, Medications, and Profile tabs
 */
export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // TODO: Implement tab icons based on route name
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Medications') {
            iconName = 'medkit-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0078D7',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* TODO: Add tab screens */}
      {/* 
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      */}
    </Tab.Navigator>
  );
} 