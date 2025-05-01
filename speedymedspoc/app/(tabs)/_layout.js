import { Tabs } from 'expo-router';
import React from 'react';

// Assuming FontAwesome is installed (@expo/vector-icons)
// If not: npx expo install @expo/vector-icons react-native-vector-icons
// Also ensure fonts are loaded, which Expo Go usually handles.
// If using custom builds, you might need: https://docs.expo.dev/guides/using-custom-fonts/
import { FontAwesome } from '@expo/vector-icons';

/**
 * Tab Navigator Layout for the main sections of the SpeedyMedsPOC App.
 *
 * This component defines the bottom tab bar interface using Expo Router's Tabs navigator.
 * Each <Tabs.Screen> corresponds to a file in the 'app/(tabs)/' directory
 * (or index.js for the root).
 *
 * Includes FontAwesome icons for each tab.
 *
 * @see https://docs.expo.dev/router/layouts/ - Expo Router Layouts Documentation
 * @see https://docs.expo.dev/router/navigating/tabs/ - Expo Router Tabs Navigator Documentation
 * @see https://icons.expo.fyi/ - Browse available icons
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Example: Set the color for active tabs
        // tabBarActiveTintColor: '#007AFF', // Example iOS blue
        // headerShown: true, // Show headers for screens in tabs by default
      }}>
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="index" // Corresponds to app/(tabs)/index.js
        options={{
          title: 'Dashboard', // Title shown in the header and tab label
          // tabBarIcon: Function that returns the icon component.
          // 'color' and 'size' are passed down by the Tabs navigator.
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Prescriptions Tab */}
      <Tabs.Screen
        name="prescriptions" // Corresponds to app/(tabs)/prescriptions.js
        options={{
          title: 'Prescriptions',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-alt" size={size} color={color} />
          ),
        }}
      />

      {/* Orders Tab - This will contain a nested Stack Navigator */}
      <Tabs.Screen
        name="orders" // Corresponds to app/(tabs)/orders/_layout.js and its screens
        options={{
          title: 'Orders',
          headerShown: false, // Hide header here; let the nested stack manage it
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />

      {/* Account Tab */}
      <Tabs.Screen
        name="account" // Corresponds to app/(tabs)/account.js
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 