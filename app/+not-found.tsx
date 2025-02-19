import { Link, Stack } from 'expo-router';
import styled from 'styled-components/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Container = styled(ThemedView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const StyledLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
`;

export default function NotFoundScreen() {
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
