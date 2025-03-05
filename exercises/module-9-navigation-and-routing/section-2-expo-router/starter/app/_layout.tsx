/**
 * @fileoverview Root layout component for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

/**
 * Root layout component that defines the main tab navigation structure
 * @returns Root layout component with tab navigation
 */
export default function AppLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#2E8BC0' : '#0078D7',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      {/* TODO: Define tab screens here */}
      {/* Example:
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      */}
    </Tabs>
  );
} 