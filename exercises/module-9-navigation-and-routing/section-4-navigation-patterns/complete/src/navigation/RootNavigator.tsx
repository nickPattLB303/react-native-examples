/**
 * @fileoverview Root navigator for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';

/**
 * Navigation parameter types for type safety
 */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigator component
 * Handles switching between authentication, onboarding, and main app flows
 * @returns Root stack navigator
 */
export default function RootNavigator() {
  // For this exercise, we'll use state to simulate authentication and onboarding status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate checking auth state - in a real app, this would check an auth provider or secure storage
  useEffect(() => {
    // Simulate API call to check authentication status
    setTimeout(() => {
      setIsAuthenticated(false);
      setHasCompletedOnboarding(false);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Don't render anything while checking authentication status
  if (isLoading) {
    return null;
  }
  
  // Mock functions to pass to child navigators
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const completeOnboarding = () => setHasCompletedOnboarding(true);
  
  // Determine which navigator to show based on authentication state
  const getInitialRouteName = () => {
    if (!isAuthenticated) return 'Auth';
    if (!hasCompletedOnboarding) return 'Onboarding';
    return 'Main';
  };
  
  return (
    <Stack.Navigator 
      initialRouteName={getInitialRouteName()}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen 
        name="Auth" 
        component={AuthNavigator} 
        initialParams={{ login }} 
      />
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingNavigator} 
        initialParams={{ completeOnboarding }} 
      />
      <Stack.Screen 
        name="Main" 
        component={MainNavigator} 
        initialParams={{ logout }}
      />
    </Stack.Navigator>
  );
} 