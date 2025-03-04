# Section 5: Theming and Design Systems

## Learning Objectives
After completing this section, you will be able to:
- Understand the principles of design systems in React Native
- Create and implement a consistent theming solution
- Build reusable styled components based on design tokens
- Implement light and dark mode themes
- Use React's Context API for theme management
- Apply design system principles to a React Native application
- Evaluate and use third-party theming libraries

**Prerequisite Knowledge**: StyleSheet API and Performance (Section 2)
**Estimated Time**: 60-75 minutes

## Introduction to Design Systems

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build applications. In React Native, implementing a design system helps maintain consistency, improves development speed, and creates a cohesive user experience.

> 💡 **Key Insight**: A well-implemented design system reduces decision fatigue for developers, ensures visual consistency across the app, and makes it easier to implement design changes globally.

## Design Tokens

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. They are used in place of hard-coded values to ensure flexibility and consistency.

### Common Design Token Categories

```jsx
// designTokens.js
export const colors = {
  // Primary palette
  primary: '#007bff',
  primaryLight: '#4da3ff',
  primaryDark: '#0056b3',
  
  // Secondary palette
  secondary: '#6c757d',
  secondaryLight: '#9aa0a6',
  secondaryDark: '#494f54',
  
  // Semantic colors
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  
  // Neutrals
  white: '#ffffff',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};
```

## Creating a Theme

A theme combines design tokens into a cohesive system that can be applied throughout your application:

```jsx
// theme.js
import { colors, spacing, typography, borderRadius, shadows } from './designTokens';

export const lightTheme = {
  colors: {
    background: colors.white,
    surface: colors.gray100,
    text: colors.gray900,
    textSecondary: colors.gray600,
    border: colors.gray300,
    ...colors, // Include all base colors
  },
  spacing,
  typography,
  borderRadius,
  shadows,
};

export const darkTheme = {
  colors: {
    background: colors.gray900,
    surface: colors.gray800,
    text: colors.gray100,
    textSecondary: colors.gray400,
    border: colors.gray700,
    ...colors, // Include all base colors
  },
  spacing,
  typography,
  borderRadius,
  shadows: {
    ...shadows,
    // Adjust shadow values for dark theme if needed
  },
};
```

## Theme Context

Use React's Context API to make the theme available throughout your application:

```jsx
// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Update theme based on system preference
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

## Using the Theme

Apply the theme throughout your application:

```jsx
// App.js
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from './ThemeContext';
import MainScreen from './MainScreen';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, isDark } = useTheme();
  
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background 
    }}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background}
      />
      <MainScreen />
    </SafeAreaView>
  );
}
```

```jsx
// MainScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import Button from './components/Button';

function MainScreen() {
  const { theme, toggleTheme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.lg,
      ...theme.shadows.md,
      marginBottom: theme.spacing.lg,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    cardText: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.textSecondary,
      lineHeight: theme.typography.lineHeight.md,
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Application</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardText}>
          This card uses themed styles for consistent appearance.
        </Text>
      </View>
      
      <Button 
        title="Toggle Theme" 
        onPress={toggleTheme} 
        variant="primary"
      />
    </View>
  );
}

export default MainScreen;
```

## Building Themed Components

Create reusable components that use the theme:

```jsx
// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

function Button({ title, onPress, variant = 'primary', size = 'medium', disabled = false }) {
  const { theme } = useTheme();
  
  // Create styles based on the theme
  const styles = StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: size === 'small' ? theme.spacing.xs : size === 'large' ? theme.spacing.lg : theme.spacing.md,
      paddingHorizontal: size === 'small' ? theme.spacing.md : size === 'large' ? theme.spacing.xl : theme.spacing.lg,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    disabled: {
      opacity: 0.6,
    },
    buttonText: {
      fontWeight: theme.typography.fontWeight.medium,
      fontSize: size === 'small' ? theme.typography.fontSize.sm : size === 'large' ? theme.typography.fontSize.lg : theme.typography.fontSize.md,
    },
    primaryText: {
      color: theme.colors.white,
    },
    secondaryText: {
      color: theme.colors.white,
    },
    outlineText: {
      color: theme.colors.primary,
    },
  });
  
  // Determine which styles to apply based on props
  const buttonStyles = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
  ];
  
  const textStyles = [
    styles.buttonText,
    styles[`${variant}Text`],
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
```

```jsx
// components/Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

function Card({ children, variant = 'default', style }) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    card: {
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.md,
    },
    elevated: {
      ...theme.shadows.lg,
      backgroundColor: theme.colors.white,
    },
    flat: {
      ...theme.shadows.sm,
      backgroundColor: theme.colors.surface,
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
  });
  
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  );
}

export default Card;
```

## Component Library

Build a comprehensive component library based on your design system:

```jsx
// components/Typography.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

export function Heading({ children, level = 1, style }) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    heading1: {
      fontSize: theme.typography.fontSize.xxxl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    heading2: {
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    heading3: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    heading4: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    heading5: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    heading6: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
      textTransform: 'uppercase',
    },
  });
  
  return (
    <Text style={[styles[`heading${level}`], style]}>
      {children}
    </Text>
  );
}

export function Paragraph({ children, variant = 'default', style }) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    default: {
      fontSize: theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    small: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
    },
    large: {
      fontSize: theme.typography.fontSize.lg,
      lineHeight: theme.typography.lineHeight.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
  });
  
  return (
    <Text style={[styles[variant], style]}>
      {children}
    </Text>
  );
}

export function Label({ children, style }) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    label: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
  });
  
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  );
}
```

## Theme Switching

Implement a theme switcher component:

```jsx
// components/ThemeSwitcher.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

function ThemeSwitcher() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    },
    text: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Mode</Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: theme.colors.gray300, true: theme.colors.primaryLight }}
        thumbColor={isDark ? theme.colors.primary : theme.colors.white}
      />
    </View>
  );
}

export default ThemeSwitcher;
```

## Using Third-Party Theming Libraries

Several libraries can help with theming in React Native:

### 1. React Native Paper

[React Native Paper](https://callstack.github.io/react-native-paper/) is a Material Design implementation with built-in theming support:

```jsx
import React from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import App from './App';

export default function Main() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  
  // Customize the theme
  const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#007bff',
      accent: '#ff4081',
    },
  };
  
  return (
    <PaperProvider theme={customTheme}>
      <App />
    </PaperProvider>
  );
}
```

### 2. Styled Components for Theming

[Styled Components](https://styled-components.com/) provides a powerful theming solution for React Native with its `ThemeProvider` and theme-aware styled components:

```jsx
import React from 'react';
import { View, useColorScheme } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';

// Define theme tokens
const themeTokens = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontSizes: {
      small: '12px',
      medium: '16px',
      large: '20px',
      xlarge: '24px',
    },
  },
};

// Create light and dark themes
const lightTheme = {
  ...themeTokens,
  mode: 'light',
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#212529',
  textSecondary: '#6c757d',
  border: '#dee2e6',
};

const darkTheme = {
  ...themeTokens,
  mode: 'dark',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#f8f9fa',
  textSecondary: '#adb5bd',
  border: '#495057',
};

// Create styled components that use the theme
const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: ${props => props.theme.spacing.md};
`;

const Card = styled.View`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const Title = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.large};
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Paragraph = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.medium};
  color: ${props => props.theme.textSecondary};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.variant === 'primary' 
    ? props.theme.colors.primary 
    : props.theme.surface};
  padding-vertical: ${props => props.theme.spacing.sm};
  padding-horizontal: ${props => props.theme.spacing.md};
  border-radius: 4px;
  align-items: center;
  border-width: ${props => props.variant === 'primary' ? '0' : '1px'};
  border-color: ${props => props.theme.colors.primary};
`;

const ButtonText = styled.Text`
  color: ${props => props.variant === 'primary' 
    ? 'white' 
    : props.theme.colors.primary};
  font-weight: bold;
`;

// App component with theme switching
function App() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === 'dark');
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Styled Components Theming</Title>
        
        <Card>
          <Paragraph>
            This example demonstrates how to use styled-components for theming in React Native.
            The current theme is: {theme.mode}.
          </Paragraph>
        </Card>
        
        <Button variant="primary" onPress={toggleTheme}>
          <ButtonText variant="primary">Toggle Theme</ButtonText>
        </Button>
        
        <View style={{ height: 10 }} />
        
        <Button variant="outline" onPress={() => console.log('Button pressed')}>
          <ButtonText variant="outline">Outline Button</ButtonText>
        </Button>
      </Container>
    </ThemeProvider>
  );
}
```

### Advantages of Styled Components for Theming

1. **Declarative Styling**: CSS-like syntax makes styles more readable and maintainable
2. **Theme Access**: Direct access to theme values in component styles
3. **Dynamic Styling**: Easy to create styles that respond to props and theme changes
4. **Component Composition**: Extend existing styled components with additional styles
5. **Type Safety**: Can be used with TypeScript for type-safe themes
6. **Automatic Critical CSS**: Only the styles that are actually used are included

### Creating a Theme Provider with Styled Components

For larger applications, you can create a more structured theme provider:

```jsx
// theme.js
export const lightTheme = {
  // Theme values...
};

export const darkTheme = {
  // Theme values...
};

// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

## Design System Documentation

Document your design system to ensure consistent usage across the team:

```jsx
// DesignSystemDemo.js
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { Heading, Paragraph, Label } from './components/Typography';
import Button from './components/Button';
import Card from './components/Card';
import ThemeSwitcher from './components/ThemeSwitcher';

function DesignSystemDemo() {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    colorBox: {
      width: 100,
      height: 100,
      marginRight: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.sm,
    },
    spacingBox: {
      backgroundColor: theme.colors.primary,
      height: 20,
      marginBottom: theme.spacing.sm,
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.sm,
      gap: theme.spacing.md,
    },
  });
  
  return (
    <ScrollView style={styles.container}>
      <Heading level={1}>Design System</Heading>
      <ThemeSwitcher />
      
      {/* Typography */}
      <View style={styles.section}>
        <Heading level={2}>Typography</Heading>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
        <Paragraph>Default paragraph text</Paragraph>
        <Paragraph variant="small">Small paragraph text</Paragraph>
        <Paragraph variant="large">Large paragraph text</Paragraph>
        <Label>Form Label</Label>
      </View>
      
      {/* Colors */}
      <View style={styles.section}>
        <Heading level={2}>Colors</Heading>
        <Heading level={3}>Primary</Heading>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.primary }]}>
            <Label style={{ color: 'white' }}>Primary</Label>
          </View>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.primaryLight }]}>
            <Label style={{ color: 'white' }}>Primary Light</Label>
          </View>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.primaryDark }]}>
            <Label style={{ color: 'white' }}>Primary Dark</Label>
          </View>
        </View>
        
        <Heading level={3}>Semantic</Heading>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.success }]}>
            <Label style={{ color: 'white' }}>Success</Label>
          </View>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.danger }]}>
            <Label style={{ color: 'white' }}>Danger</Label>
          </View>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.warning }]}>
            <Label style={{ color: 'black' }}>Warning</Label>
          </View>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.info }]}>
            <Label style={{ color: 'white' }}>Info</Label>
          </View>
        </View>
      </View>
      
      {/* Spacing */}
      <View style={styles.section}>
        <Heading level={2}>Spacing</Heading>
        <View style={[styles.spacingBox, { width: theme.spacing.xs }]} />
        <Label>XS: {theme.spacing.xs}px</Label>
        <View style={[styles.spacingBox, { width: theme.spacing.sm }]} />
        <Label>SM: {theme.spacing.sm}px</Label>
        <View style={[styles.spacingBox, { width: theme.spacing.md }]} />
        <Label>MD: {theme.spacing.md}px</Label>
        <View style={[styles.spacingBox, { width: theme.spacing.lg }]} />
        <Label>LG: {theme.spacing.lg}px</Label>
        <View style={[styles.spacingBox, { width: theme.spacing.xl }]} />
        <Label>XL: {theme.spacing.xl}px</Label>
        <View style={[styles.spacingBox, { width: theme.spacing.xxl }]} />
        <Label>XXL: {theme.spacing.xxl}px</Label>
      </View>
      
      {/* Buttons */}
      <View style={styles.section}>
        <Heading level={2}>Buttons</Heading>
        <Heading level={3}>Variants</Heading>
        <View style={styles.buttonRow}>
          <Button title="Primary" variant="primary" onPress={() => {}} />
          <Button title="Secondary" variant="secondary" onPress={() => {}} />
          <Button title="Outline" variant="outline" onPress={() => {}} />
        </View>
        
        <Heading level={3}>Sizes</Heading>
        <View style={styles.buttonRow}>
          <Button title="Small" size="small" onPress={() => {}} />
          <Button title="Medium" size="medium" onPress={() => {}} />
          <Button title="Large" size="large" onPress={() => {}} />
        </View>
        
        <Heading level={3}>States</Heading>
        <View style={styles.buttonRow}>
          <Button title="Enabled" onPress={() => {}} />
          <Button title="Disabled" disabled onPress={() => {}} />
        </View>
      </View>
      
      {/* Cards */}
      <View style={styles.section}>
        <Heading level={2}>Cards</Heading>
        <Card style={{ marginBottom: theme.spacing.md }}>
          <Heading level={4}>Default Card
