# Section 2: StyleSheet API and Performance

## Learning Objectives
After completing this section, you will be able to:
- Use the StyleSheet API to create and manage styles
- Understand the performance benefits of StyleSheet over inline styles
- Organize styles effectively in React Native applications
- Apply style composition and reuse patterns
- Implement naming conventions and style organization best practices
- Optimize styling for performance
- Compare StyleSheet API with styled-components

**Prerequisite Knowledge**: Styling Fundamentals in React Native (Section 1)
**Estimated Time**: 45-60 minutes

## Introduction to StyleSheet API

While inline styles are convenient for quick styling, React Native provides the `StyleSheet` API for creating and managing styles more efficiently. The `StyleSheet` API offers several advantages over inline styles, including performance optimizations and better code organization.

> 💡 **Key Insight**: The StyleSheet API is not just a convenience feature—it provides real performance benefits by creating style objects only once and reusing them across renders, rather than recreating style objects on each render.

## Creating Styles with StyleSheet

The basic usage of StyleSheet involves creating a styles object at the bottom of your component file:

```jsx
import { StyleSheet, View, Text } from 'react-native';

function StyledComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello StyleSheet</Text>
      <Text style={styles.paragraph}>
        This component uses StyleSheet for better performance and organization.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});

export default StyledComponent;
```

## Performance Benefits

The `StyleSheet.create()` method offers several performance advantages:

1. **Style Object Validation**: It validates style properties at creation time, catching errors early
2. **Style ID Optimization**: It converts style objects into atomic IDs for more efficient memory usage
3. **Single Creation**: Styles are created only once, not on every render
4. **Faster Native Bridge**: Optimized style objects are more efficiently passed to the native side

> 💡 **Performance Tip**: Always use `StyleSheet.create()` for styles that don't change based on component state or props. For dynamic styles, you can combine StyleSheet styles with inline styles.

## Combining StyleSheet Styles

You can combine multiple styles from your StyleSheet using arrays:

```jsx
import { StyleSheet, View, Text } from 'react-native';

function CombinedStyles({ isHighlighted }) {
  return (
    <View style={styles.card}>
      <Text style={[
        styles.cardText,
        isHighlighted && styles.highlighted
      ]}>
        {isHighlighted ? 'Highlighted Card' : 'Normal Card'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  highlighted: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});
```

## Style Organization Patterns

As your application grows, organizing styles becomes increasingly important. Here are some common patterns:

### 1. Component-Specific StyleSheets

Keep styles with their respective components:

```jsx
// MedicationCard.js
import { StyleSheet, View, Text } from 'react-native';

function MedicationCard({ name, dosage, schedule }) {
  return (
    <View style={styles.card}>
      <Text style={styles.medicationName}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.schedule}>{schedule}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dosage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  schedule: {
    fontSize: 14,
    color: '#888',
  },
});

export default MedicationCard;
```

### 2. Shared Style Modules

Create reusable style modules for common elements:

```jsx
// styles/buttons.js
import { StyleSheet } from 'react-native';
import { colors } from './theme';

export default StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    paddingVertical: 11,
    paddingHorizontal: 19,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});
```

Usage:
```jsx
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from '../styles/buttons';

function PrimaryButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.primary,
        disabled && buttonStyles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
```

### 3. Theme-Based Styling

Create a theme file with colors, typography, and spacing constants:

```jsx
// styles/theme.js
export const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  fontWeights: {
    normal: 'normal',
    medium: '500',
    bold: 'bold',
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};
```

Usage:
```jsx
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

function ThemedComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Themed Component</Text>
      <Text style={styles.body}>This component uses theme constants.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
  },
  heading: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
    color: colors.gray800,
  },
});
```

## StyleSheet API Methods

The StyleSheet API provides several useful methods:

### StyleSheet.create()

Creates an optimized style object:

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

### StyleSheet.flatten()

Flattens an array of styles into a single style object:

```jsx
const flattenedStyle = StyleSheet.flatten([
  styles.container,
  { backgroundColor: 'red' },
  isActive && styles.activeStyle,
]);
// Result: { flex: 1, padding: 20, backgroundColor: 'red', ... }
```

This is useful for:
- Debugging styles
- Creating derived styles
- Working with style-related libraries

### StyleSheet.hairlineWidth

Provides the thinnest possible line width on the current platform:

```jsx
const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
});
```

### StyleSheet.absoluteFill

A predefined style for absolutely positioning an element to fill its parent:

```jsx
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
```

Equivalent to:
```jsx
{
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}
```

## Performance Optimization Techniques

### 1. Memoize Dynamic Styles

For styles that depend on props or state, use `useMemo` to prevent unnecessary style recalculations:

```jsx
import { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function ProgressBar({ progress, color }) {
  const dynamicStyles = useMemo(() => ({
    fill: {
      width: `${progress}%`,
      backgroundColor: color || '#007bff',
    }
  }), [progress, color]);

  return (
    <View style={styles.container}>
      <View style={[styles.bar, dynamicStyles.fill]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
});
```

### 2. Avoid Inline Function Style Creation

Instead of creating style objects inside render functions, define them outside or use StyleSheet:

```jsx
// Avoid this:
function BadExample() {
  return (
    <View style={{ margin: 10, padding: 20 }}>
      <Text>This creates a new style object on every render</Text>
    </View>
  );
}

// Do this instead:
function GoodExample() {
  return (
    <View style={styles.container}>
      <Text>This uses a pre-defined style object</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
  },
});
```

### 3. Use StyleSheet for Static Styles, Inline for Dynamic

Combine both approaches for optimal performance:

```jsx
function OptimizedComponent({ isActive, customColor }) {
  return (
    <View
      style={[
        styles.container,
        isActive && styles.activeContainer,
        customColor && { borderColor: customColor },
      ]}
    >
      <Text style={styles.text}>
        Optimized Styling Approach
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  activeContainer: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
```

## Naming Conventions and Best Practices

### Naming Conventions

1. **Use descriptive names**: `headerContainer` instead of `hc`
2. **Follow a consistent pattern**:
   - Component part: `container`, `header`, `footer`, `title`
   - State variations: `active`, `disabled`, `highlighted`
   - Size variations: `small`, `large`

```jsx
const styles = StyleSheet.create({
  // Component parts
  container: { /* ... */ },
  header: { /* ... */ },
  title: { /* ... */ },
  content: { /* ... */ },
  
  // State variations
  activeButton: { /* ... */ },
  disabledInput: { /* ... */ },
  
  // Size variations
  largeText: { /* ... */ },
  smallIcon: { /* ... */ },
});
```

### Organization Best Practices

1. **Group related styles together**:
```jsx
const styles = StyleSheet.create({
  // Card container styles
  card: { /* ... */ },
  cardHeader: { /* ... */ },
  cardBody: { /* ... */ },
  cardFooter: { /* ... */ },
  
  // Button styles
  button: { /* ... */ },
  buttonText: { /* ... */ },
  
  // Form styles
  form: { /* ... */ },
  input: { /* ... */ },
  label: { /* ... */ },
});
```

2. **Extract common styles to shared modules**
3. **Keep component-specific styles with their components**
4. **Use a theme file for global constants**
5. **Comment complex style calculations or unusual properties**

## StyleSheet API vs. Styled Components

While the StyleSheet API is the built-in solution for styling in React Native, styled-components offers an alternative approach that many developers prefer, especially those coming from a web background.

### Comparison Table

| Feature | StyleSheet API | Styled Components |
|---------|---------------|-------------------|
| Syntax | JavaScript objects | CSS-like template literals |
| Performance | Optimized by default | Good, but requires some optimization |
| Dynamic styling | Requires conditional logic | Props-based styling |
| Component co-location | Separate styles object | Styles defined with component |
| Theming | Requires custom implementation | Built-in ThemeProvider |
| Debugging | StyleSheet names in React DevTools | Component names in React DevTools |
| Learning curve | New syntax for CSS developers | Familiar for CSS developers |
| Bundle size | Built into React Native | Additional library dependency |

### Same Component with Both Approaches

Let's compare the same component implemented with both StyleSheet API and styled-components:

#### StyleSheet API Implementation

```jsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Card({ title, content, onPress, isHighlighted }) {
  return (
    <View style={[styles.card, isHighlighted && styles.highlightedCard]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  highlightedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  content: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default Card;
```

#### Styled Components Implementation

```jsx
import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  padding: 16px;
  border-radius: 8px;
  background-color: white;
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

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const Content = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const Button = styled.TouchableOpacity`
  align-self: flex-start;
  background-color: #007bff;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 500;
`;

function Card({ title, content, onPress, isHighlighted }) {
  return (
    <CardContainer isHighlighted={isHighlighted}>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Button onPress={onPress}>
        <ButtonText>Learn More</ButtonText>
      </Button>
    </CardContainer>
  );
}

export default Card;
```

### Performance Considerations for Styled Components

When using styled-components in React Native, keep these performance tips in mind:

1. **Use memoization**: Wrap your styled components with `React.memo()` to prevent unnecessary re-renders
2. **Avoid creating styled components inside render functions**: Define them outside the component
3. **Be cautious with complex interpolations**: Complex prop-based styling can impact performance
4. **Consider using StyleSheet for performance-critical components**: You can mix both approaches

```jsx
// Optimized styled-components usage
import React, { memo } from 'react';
import styled from 'styled-components/native';

// Define styled components outside of render function
const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${props => props.theme.background};
`;

// Use memo for optimized re-rendering
const OptimizedComponent = memo(({ children }) => {
  return <Container>{children}</Container>;
});

export default OptimizedComponent;
```

### When to Choose StyleSheet API vs. Styled Components

**Choose StyleSheet API when:**
- Performance is a critical concern
- You prefer JavaScript object syntax
- You want to minimize dependencies
- You're working on a large team with varying CSS experience

**Choose styled-components when:**
- You prefer CSS-like syntax
- You want more dynamic styling capabilities
- You need a robust theming solution
- You're coming from a web development background with CSS experience
- Component co-location of styles is important to your workflow

## Exercise: Refactoring Inline Styles

Take the following component with inline styles and refactor it to use StyleSheet:

```jsx
import { View, Text, TouchableOpacity } from 'react-native';

function MedicationReminder({ medication, time, isOverdue }) {
  return (
    <View style={{
      padding: 15,
      borderRadius: 8,
      backgroundColor: isOverdue ? '#fff8f8' : 'white',
      borderLeftWidth: 4,
      borderLeftColor: isOverdue ? '#ff4d4f' : '#1890ff',
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
      }}>
        {medication}
      </Text>
      <Text style={{
        fontSize: 16,
        color: isOverdue ? '#ff4d4f' : '#666',
        marginBottom: 10,
      }}>
        {time}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: isOverdue ? '#ff4d4f' : '#1890ff',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 4,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
        }}>
          {isOverdue ? 'Take Now' : 'Mark as Taken'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

Refactor this component to:
1. Use StyleSheet.create()
2. Apply proper style naming conventions
3. Optimize for performance
4. Maintain all the same visual appearance and functionality

### Bonus Exercise: Refactor with Styled Components

As a bonus exercise, refactor the same component using styled-components:

```jsx
import React from 'react';
import styled from 'styled-components/native';

// Create your styled components here

function MedicationReminder({ medication, time, isOverdue }) {
  // Implement the component using styled components
}

export default MedicationReminder;
```

## Additional Resources

- [React Native StyleSheet API Documentation](https://reactnative.dev/docs/stylesheet)
- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [React Native Styling Cheat Sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet)
- [Styled Components Documentation](https://styled-components.com/docs/basics#react-native)
- [Styled Components vs StyleSheet Performance](https://medium.com/@jm90mm/styled-components-vs-stylesheets-a-performance-comparison-7a585486b302)

> 🔄 **For Web Developers**: The StyleSheet API might remind you of CSS-in-JS libraries like styled-components or emotion. However, StyleSheet is more performance-focused and has fewer features. If you're coming from a web background, styled-components might feel more familiar, but be aware of the performance implications.

> 🔄 **For Android/iOS Developers**: StyleSheet.create() is somewhat similar to defining styles in XML (Android) or UIKit (iOS), but with JavaScript syntax. The key difference is that React Native styles are applied directly to components rather than being referenced by ID or class. Styled-components might be a new concept, but it can provide a more component-centric approach to styling.
