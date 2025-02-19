/**
 * @module app/NotFoundScreen
 * @description 404 Not Found screen component
 */

import { Link, Stack } from 'expo-router';
import styled from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface StyledProps {
  theme: DefaultTheme;
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
 * @function NotFoundScreen
 * @description Screen component displayed when a route is not found
 * @returns {React.ReactElement} The not found screen component
 */
export default function NotFoundScreen(): React.ReactElement {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <StyledLink href="/">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </StyledLink>
      </Container>
    </>
  );
}
