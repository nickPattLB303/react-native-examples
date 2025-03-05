/**
 * @fileoverview Onboarding navigator for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import onboarding screens
import WelcomeScreen from '../screens/WelcomeScreen';
import NotificationPermissionScreen from '../screens/NotificationPermissionScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';

/**
 * Navigation parameter types for the onboarding stack
 */
export type OnboardingStackParamList = {
  Welcome: { completeOnboarding: () => void };
  NotificationPermission: undefined;
  PrivacySettings: { completeOnboarding: () => void };
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

/**
 * Onboarding navigator component
 * Handles first-time user onboarding flow screens
 * @param {object} route - Route object containing params passed from parent
 * @returns Onboarding stack navigator
 */
export default function OnboardingNavigator({ route }: any) {
  // Get completeOnboarding function from params passed by RootNavigator
  const { completeOnboarding } = route.params;
  
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swiping back during onboarding
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        initialParams={{ completeOnboarding }}
      />
      <Stack.Screen 
        name="NotificationPermission" 
        component={NotificationPermissionScreen} 
      />
      <Stack.Screen 
        name="PrivacySettings" 
        component={PrivacySettingsScreen} 
        initialParams={{ completeOnboarding }}
      />
    </Stack.Navigator>
  );
} 