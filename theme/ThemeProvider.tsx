/**
 * @module theme/ThemeProvider
 * @description Unified theme provider that combines styled-components, React Native Paper, and Navigation theming
 */

import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { lightTheme, darkTheme } from './theme';

/**
 * @interface ThemeProviderProps
 * @description Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** React child components */
  children: React.ReactNode;
}

/**
 * @function ThemeProvider
 * @description A unified theme provider that wraps the application with styled-components, React Native Paper, and Navigation themes
 * @param {ThemeProviderProps} props - Component props
 * @returns {React.ReactElement} A theme provider component
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <PaperProvider theme={theme}>
        <NavigationThemeProvider value={theme}>
          {children}
        </NavigationThemeProvider>
      </PaperProvider>
    </StyledThemeProvider>
  );
} 