/**
 * @module AccountLayout
 * @description Stack navigation layout for the Account section
 * @since 1.0.0
 */

import { Stack } from 'expo-router';
import React from 'react';

/**
 * @function AccountLayout
 * @description Manages the stack navigation for the Account tab, including profile and settings views
 * @returns {React.ReactElement} A stack navigator component for account-related screens
 */
export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Account',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Stack>
  );
} 