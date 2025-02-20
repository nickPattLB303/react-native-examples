/**
 * @module app/NotFoundScreen
 * @description 404 Not Found screen component
 */

import React from 'react';
import { Link, Stack } from 'expo-router';
import styled from 'styled-components/native';
import type { CustomTheme } from '@/theme/types';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * @interface StyledProps
 * @description Props for styled components with theme support
 */
interface StyledProps {
  theme: CustomTheme;
}

/**
 * @component Container
 * @description Centered container for the not found screen content
 */
const Container = styled(ThemedView)<StyledProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }: StyledProps) => theme.spacing.lg}px;
`;

/**
 * @component StyledLink
 * @description Styled link component with consistent spacing
 */
const StyledLink = styled(Link)<StyledProps>`
  margin-top: ${({ theme }: StyledProps) => theme.spacing.md}px;
  padding-vertical: ${({ theme }: StyledProps) => theme.spacing.md}px;
`;

/**
 * 404 Not Found screen component
 * @component
 * @returns {JSX.Element} The not found screen component
 */
export default function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Oops!',
          headerShown: true,
        }} 
      />
      <Container>
        <ThemedText 
          type="title"
          accessibilityRole="header"
        >
          This screen doesn't exist.
        </ThemedText>
        <StyledLink 
          href="/"
          accessibilityRole="link"
          accessibilityLabel="Go to home screen"
        >
          <ThemedText type="link">Go to home screen!</ThemedText>
        </StyledLink>
      </Container>
    </>
  );
}
