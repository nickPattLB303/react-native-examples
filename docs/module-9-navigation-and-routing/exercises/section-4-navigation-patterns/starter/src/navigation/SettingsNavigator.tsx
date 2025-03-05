/**
 * @fileoverview Settings navigator for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TODO: Import screens
// import SettingsScreen from '../screens/SettingsScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import NotificationsSettingsScreen from '../screens/NotificationsSettingsScreen';
// import AboutScreen from '../screens/AboutScreen';

/**
 * Navigation parameter types for the settings stack
 */
export type SettingsStackParamList = {
  SettingsList: { logout: () => void };
  Profile: undefined;
  NotificationsSettings: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

/**
 * Settings stack navigator component
 * Handles settings-related screens (main settings, profile, notifications, about)
 * @param {object} route - Route object containing params passed from parent
 * @returns Settings stack navigator
 */
export default function SettingsNavigator({ route }: any) {
  // Get logout function from params passed by MainNavigator
  const { logout } = route.params;
  
  return (
    <Stack.Navigator
      initialRouteName="SettingsList"
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
      {/* TODO: Add stack screens for settings */}
      {/* 
      <Stack.Screen
        name="SettingsList"
        component={SettingsScreen}
        initialParams={{ logout }}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettingsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
        }}
      />
      */}
    </Stack.Navigator>
  );
} 