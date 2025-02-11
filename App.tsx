import React from 'react';
import { SafeAreaView } from 'react-native';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { ThemeProvider, useTheme, Theme } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';

/**
 * Styled component props interface
 * Provides type safety for theme-aware styled components
 */
interface StyledProps {
  theme: Theme;
}

/**
 * Theme-aware container component
 * Handles safe area insets and applies theme background
 */
const Container = styled(SafeAreaView)<StyledProps>`
  flex: 1;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
`;

/**
 * AppContent Component
 * 
 * Handles the styled-components theme integration.
 * Consumes theme from ThemeContext and provides it to styled-components.
 * 
 * Implementation Notes:
 * - Uses useTheme hook for theme access
 * - Wraps content in StyledThemeProvider
 * - Applies theme-aware container styling
 */
const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <StyledThemeProvider theme={theme}>
      <Container>
        <HomeScreen />
      </Container>
    </StyledThemeProvider>
  );
};

/**
 * Root App Component
 * 
 * Sets up the application's theme context and main navigation structure.
 * Demonstrates proper provider hierarchy and component organization.
 * 
 * Component Structure:
 * - ThemeProvider: Manages global theme state
 * - AppContent: Handles styled-components integration
 * - Container: Theme-aware SafeAreaView
 * - HomeScreen: Main content display
 * 
 * Implementation Notes:
 * - Ensures theme context is available to all child components
 * - Provides theme to styled-components
 * - Handles safe area on iOS devices
 * - Maintains proper provider ordering
 * 
 * @example
 * ```tsx
 * import App from './App';
 * 
 * // In index.js or similar
 * AppRegistry.registerComponent('AppName', () => App);
 * ```
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
