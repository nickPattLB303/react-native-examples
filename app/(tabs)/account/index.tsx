/**
 * @module AccountScreen
 * @description Main account screen component with navigation to profile and settings
 * @since 1.0.0
 */

import { Link } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function AccountScreen
 * @description Main account screen that provides navigation to profile and settings screens
 * @returns {React.ReactElement} A screen component with account navigation options
 */
export default function AccountScreen() {
  return (
    <ScreenContainer>
      <ThemedText type="title">Account</ThemedText>
      <Link href="/account/profile" asChild>
        <Button mode="contained">View Profile</Button>
      </Link>
      <Link href="/account/settings" asChild>
        <Button mode="contained">Settings</Button>
      </Link>
    </ScreenContainer>
  );
} 