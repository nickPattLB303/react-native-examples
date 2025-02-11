import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';

const Container = styled(SafeAreaView)`
  flex: 1;
`;

/**
 * Root App Component
 * 
 * Sets up the theme provider and demonstrates proper context
 * provider hierarchy.
 */
export default function App() {
  return (
    <ThemeProvider>
      <Container>
        <HomeScreen />
      </Container>
    </ThemeProvider>
  );
}
