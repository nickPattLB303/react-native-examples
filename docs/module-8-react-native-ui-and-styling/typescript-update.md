# TypeScript Integration in Module 8

## Overview of Changes

Module 8 has been updated to use TypeScript with styled-components, providing better type safety, improved developer experience, and following modern React Native development practices.

## Key TypeScript Features Added for Styling

1. **Typed Styled Components**
   - Added TypeScript interfaces for component props
   - Used generics with styled-components
   - Implemented type-safe theme access

2. **Type-Safe Style Props**
   - Created interfaces for style props
   - Added proper typing for dynamic styling based on props
   - Used TypeScript utility types for style composition

3. **Theme Type Safety**
   - Defined theme interface for type-safe theme access
   - Used TypeScript to ensure theme consistency
   - Implemented DefaultTheme interface extension

4. **Type-Safe Style Functions**
   - Added return type annotations for style utility functions
   - Typed style calculation functions
   - Implemented generics for reusable style functions

5. **StyleSheet API with TypeScript**
   - Added type annotations for StyleSheet objects
   - Used TypeScript to catch invalid style properties
   - Implemented interfaces for style objects

## TypeScript Benefits for Styling

1. **Compile-Time Style Validation**
   - Catches invalid style properties
   - Ensures proper style value types
   - Prevents common styling errors

2. **Better IntelliSense for Styles**
   - Improved autocompletion for style properties
   - Property value suggestions
   - Documentation for available style options

3. **Self-Documenting Style Code**
   - Types serve as inline documentation
   - Clearer component style APIs
   - Easier understanding of style props

4. **Safer Style Refactoring**
   - TypeScript catches breaking changes in styles
   - Provides confidence during style modifications
   - Helps maintain style contracts

## Examples of TypeScript with Styled Components

### Basic Typed Styled Component
```tsx
import styled from 'styled-components/native';

interface CardProps {
  isHighlighted?: boolean;
  backgroundColor?: string;
}

const Card = styled.View<CardProps>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.backgroundColor || 'white'};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  margin-vertical: 8px;
  ${props => props.isHighlighted && `
    border-left-width: 4px;
    border-left-color: #007bff;
  `}
`;

// Usage
function CardComponent({ title, isHighlighted }: { title: string; isHighlighted?: boolean }) {
  return (
    <Card isHighlighted={isHighlighted}>
      <Text>{title}</Text>
    </Card>
  );
}
```

### Type-Safe Theme
```tsx
// theme.ts
import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error: string;
      success: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    typography: {
      fontSizes: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
      };
      fontWeights: {
        normal: string;
        bold: string;
      };
    };
    borderRadius: {
      small: number;
      medium: number;
      large: number;
      round: number;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#f8f9fa',
    text: '#212529',
    error: '#dc3545',
    success: '#28a745',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSizes: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
    fontWeights: {
      normal: 'normal',
      bold: 'bold',
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    round: 9999,
  },
};
```

### Typed Styled Component with Theme
```tsx
import styled from 'styled-components/native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const getButtonBackground = (props: ButtonProps & { theme: DefaultTheme }) => {
  if (props.variant === 'secondary') return props.theme.colors.secondary;
  if (props.variant === 'outline') return 'transparent';
  return props.theme.colors.primary;
};

const getButtonSize = (props: ButtonProps & { theme: DefaultTheme }) => {
  switch (props.size) {
    case 'small':
      return props.theme.spacing.sm;
    case 'large':
      return props.theme.spacing.lg;
    default:
      return props.theme.spacing.md;
  }
};

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${getButtonBackground};
  padding-vertical: ${getButtonSize}px;
  padding-horizontal: ${props => getButtonSize(props) * 2}px;
  border-radius: ${props => props.theme.borderRadius.medium}px;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.6 : 1};
  ${props => props.variant === 'outline' && `
    border-width: 1px;
    border-color: ${props.theme.colors.primary};
  `}
`;

const ButtonText = styled.Text<ButtonProps>`
  color: ${props => 
    props.variant === 'outline' 
      ? props.theme.colors.primary 
      : 'white'
  };
  font-size: ${props => 
    props.size === 'large' 
      ? props.theme.typography.fontSizes.large 
      : props.size === 'small'
        ? props.theme.typography.fontSizes.small
        : props.theme.typography.fontSizes.medium
  }px;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

// Usage
function StyledButton({ 
  title, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onPress
}: {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Button 
      variant={variant} 
      size={size} 
      disabled={disabled}
      onPress={onPress}
    >
      <ButtonText variant={variant} size={size}>
        {title}
      </ButtonText>
    </Button>
  );
}
```

### Type-Safe StyleSheet
```tsx
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

## Educational Value Added

The TypeScript implementation in this module:

1. Introduces students to type-safe styling in React Native
2. Demonstrates how to properly type styled-components
3. Shows best practices for theme management with TypeScript
4. Prepares students for real-world development environments
5. Provides clearer examples with self-documenting style code

## Resources Added

New TypeScript-specific resources have been added to each section, including:

- Styled Components TypeScript Documentation
- React Native TypeScript Style Guide
- TypeScript-specific styling patterns and best practices

This update ensures that the module aligns with current industry standards while providing students with valuable experience using TypeScript with styled-components in React Native applications.
