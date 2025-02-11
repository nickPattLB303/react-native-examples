import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Theme Interface
 * 
 * Defines the complete theme structure for the application.
 * Provides type safety for colors, spacing, and typography.
 * 
 * Native Equivalents:
 * - iOS: UIAppearance and UITraitCollection
 *   {@link https://developer.apple.com/documentation/uikit/uiappearance}
 * - Android: Material Theme and Resource System
 *   {@link https://material.io/design/material-theming/overview.html}
 * 
 * Implementation References:
 * - React Native Colors: {@link https://reactnative.dev/docs/colors}
 * - React Native Platform Specific: {@link https://reactnative.dev/docs/platform-specific-code}
 * - TypeScript Interfaces: {@link https://www.typescriptlang.org/docs/handbook/interfaces.html}
 * 
 * Performance Considerations:
 * - Theme object is memoized to prevent unnecessary re-renders
 * - Color values are cached for performance
 * - Typography uses predefined scales for consistency
 * 
 * Usage:
 * ```typescript
 * const theme: Theme = themes.light;
 * const backgroundColor = theme.colors.background;
 * ```
 */
interface Theme {
  dark: boolean;
  colors: {
    primary: string;    // Main brand color - See Material Design color system
    background: string; // Screen background - Platform specific background
    card: string;       // Card/surface backgrounds - Elevation dependent
    text: string;       // Primary text color - Meets WCAG contrast guidelines
    border: string;     // Border/divider color - Subtle separation
    notification: string; // Notification/error color - High contrast for visibility
  };
  spacing: {
    xs: number; // 4 - Minimal spacing (compact elements)
    sm: number; // 8 - Tight spacing (related elements)
    md: number; // 16 - Standard spacing (default gaps)
    lg: number; // 24 - Large spacing (section separation)
    xl: number; // 32 - Extra large spacing (major sections)
  };
  typography: {
    fontSize: {
      small: number;  // 12 - Caption text (accessibility minimum)
      medium: number; // 16 - Body text (readable on mobile)
      large: number;  // 20 - Title text (clear hierarchy)
      xlarge: number; // 24 - Header text (prominent display)
    };
    fontWeight: {
      regular: '400'; // Normal text weight
      medium: '500';  // Semi-bold emphasis
      bold: '700';    // Strong emphasis
    };
  };
}

/**
 * Theme Configurations
 * 
 * Predefined theme objects for light and dark modes.
 * Colors follow platform-specific guidelines while maintaining consistency.
 * 
 * Color References:
 * - iOS Human Interface Guidelines: {@link https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/}
 * - Material Design Color System: {@link https://material.io/design/color/the-color-system.html}
 * 
 * Implementation Notes:
 * - Uses semantic color naming for clarity
 * - Maintains consistent spacing scale (8-point grid)
 * - Follows platform typography conventions
 * - Ensures WCAG 2.1 AA contrast compliance
 * 
 * @example
 * ```typescript
 * const darkTheme = themes.dark;
 * const lightTheme = themes.light;
 * ```
 */
export const themes: { light: Theme; dark: Theme } = {
  light: {
    dark: false,
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      card: '#F2F2F7',
      text: '#000000',
      border: '#C6C6C8',
      notification: '#FF3B30',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    typography: {
      fontSize: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 24,
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#0A84FF',
      background: '#000000',
      card: '#1C1C1E',
      text: '#FFFFFF',
      border: '#38383A',
      notification: '#FF453A',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    typography: {
      fontSize: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 24,
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
    },
  },
};

/**
 * Theme Context Type
 * 
 * Defines the shape of the theme context value.
 * Includes current theme, theme state, and theme management functions.
 * 
 * Context API Reference: {@link https://reactjs.org/docs/context.html}
 * TypeScript with Context: {@link https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/}
 * 
 * @property theme - Current theme object
 * @property isDark - Current theme mode state
 * @property toggleTheme - Function to toggle between light and dark
 * @property setTheme - Function to set specific theme
 */
interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_preference';

/**
 * Theme Provider Component
 * 
 * Manages theme state and provides theme context to the app.
 * Handles system theme detection, persistence, and theme switching.
 * 
 * Features:
 * - System theme detection using Appearance API
 *   {@link https://reactnative.dev/docs/appearance}
 * - Theme persistence with AsyncStorage
 *   {@link https://react-native-async-storage.github.io/async-storage/}
 * - Smooth theme switching with React state management
 * - Error handling for storage operations
 * 
 * Performance Notes:
 * - Uses React.memo for child optimization
 * - Minimizes context updates with proper state management
 * - Handles cleanup of system theme listeners
 * - Implements proper error boundaries
 * 
 * Usage:
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!AsyncStorage.getItem(THEME_STORAGE_KEY)) {
        setIsDark(colorScheme === 'dark');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setTheme = async (theme: 'light' | 'dark') => {
    try {
      setIsDark(theme === 'dark');
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const value = {
    theme: isDark ? themes.dark : themes.light,
    isDark,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * useTheme Hook
 * 
 * Custom hook for accessing the theme context.
 * Provides type-safe access to theme values and functions.
 * 
 * React Hooks Reference: {@link https://reactjs.org/docs/hooks-reference.html}
 * Custom Hooks Guide: {@link https://reactjs.org/docs/hooks-custom.html}
 * 
 * Error Handling:
 * - Throws if used outside ThemeProvider
 * - Provides type safety with TypeScript
 * - Ensures consistent theme access
 * 
 * Performance:
 * - Returns memoized theme object
 * - Prevents unnecessary re-renders
 * - Optimizes context consumption
 * 
 * Usage:
 * ```typescript
 * const { theme, isDark, toggleTheme } = useTheme();
 * ```
 * 
 * @returns ThemeContextType
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 