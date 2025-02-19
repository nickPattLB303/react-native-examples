/**
 * @module AccountScreen
 * @description Main account screen component with navigation to profile and settings
 * @since 1.0.0
 */

import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * @function AccountScreen
 * @description Main account screen that provides navigation to profile and settings screens
 * @returns {React.ReactElement} A screen component with account navigation options
 */
export default function AccountScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Account</ThemedText>
      <Link href="/account/profile" asChild>
        <Button mode="contained">View Profile</Button>
      </Link>
      <Link href="/account/settings" asChild>
        <Button mode="contained">Settings</Button>
      </Link>
    </ThemedView>
  );
}

/**
 * @constant styles
 * @description StyleSheet for the AccountScreen component
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
}); 