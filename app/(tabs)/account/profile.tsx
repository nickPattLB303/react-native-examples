/**
 * @module ProfileScreen
 * @description Profile screen component showing user profile information
 */

import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ScreenContainer } from '@/components/styled/containers';

/**
 * @function ProfileScreen
 * @description Displays the user's profile information
 * @returns {React.ReactElement} A screen component showing profile details
 */
export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <ThemedText type="title">Profile</ThemedText>
    </ScreenContainer>
  );
} 