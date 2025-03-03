# Section 2: Styling Fundamentals

## Learning Objectives
After completing this section, you will be able to:
- Apply styles to React Native components using the StyleSheet API
- Understand the differences between React Native styles and CSS
- Implement component-level and application-wide styling strategies
- Use style inheritance appropriately
- Apply conditional styling based on props and state

**Prerequisite Knowledge**: React Native Core Components (Section 1)
**Estimated Time**: 1-1.5 hours

## Introduction to React Native Styling

React Native's styling system is inspired by CSS but implemented in JavaScript. Instead of using stylesheets or inline styles like in web development, React Native uses JavaScript objects to define styles. This approach provides type checking, validation, and improved performance through the StyleSheet API.

### The StyleSheet API

The `StyleSheet` API is a built-in utility for defining styles:

```jsx
import { StyleSheet, View, Text } from 'react-native';

const MedicationItem = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Medication Name</Text>
    <Text style={styles.description}>Medication description and dosage</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
```

#### Benefits of the StyleSheet API

1. **Performance**: `StyleSheet.create()` optimizes styles by transforming them into atomic IDs
2. **Validation**: Provides error messages for invalid styles during development
3. **Organization**: Centralizes styles for better maintainability
4. **Intellisense**: Enables better IDE autocomplete and error checking

> 💡 **Deep Dive**: Under the hood, `StyleSheet.create()` validates style properties and converts the JavaScript objects into optimized internal representations that are sent to the native platform for rendering.

### React Native Style Properties

React Native style properties are generally named like their CSS counterparts but use camelCase instead of kebab-case:

```jsx
// Web CSS
// .container {
//   background-color: #f0f0f0;
//   margin-top: 10px;
// }

// React Native StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
});
```

#### Notable Differences from CSS

1. **Units**: React Native doesn't use units like `px`, `em`, or `rem`. All dimension values are unitless and represent density-independent pixels.
2. **Flexbox Default**: Containers use flexbox by default with `flexDirection: 'column'` (unlike web's default `row`).
3. **Limited Properties**: Not all CSS properties are available (e.g., no `float`, limited `position` values).
4. **No Inheritance**: Most styles don't automatically inherit (except for text properties inside `Text` components).
5. **No CSS Selectors**: No support for CSS selectors like `:hover` or `:nth-child`.

### Applying Styles

There are multiple ways to apply styles to React Native components:

#### 1. Using style prop with objects:

```jsx
// Inline style
<View style={{ padding: 10, backgroundColor: '#fff' }}>
  <Text>Hello World</Text>
</View>
```

#### 2. Using StyleSheet.create:

```jsx
const styles = StyleSheet.create({
  container: {
    padding: 10, 
    backgroundColor: '#fff',
  },
});

<View style={styles.container}>
  <Text>Hello World</Text>
</View>
```

#### 3. Combining styles:

```jsx
// Arrays of styles (later styles override earlier ones)
<View style={[styles.container, styles.elevated]}>
  <Text>Hello World</Text>
</View>

// Combining with inline styles
<View style={[styles.container, { marginTop: 20 }]}>
  <Text>Hello World</Text>
</View>
```

#### 4. Conditional styling:

```jsx
// Conditional styles
<View style={[
  styles.pill,
  isActive ? styles.activePill : styles.inactivePill
]}>
  <Text>Status</Text>
</View>

// Or using spread operator
<View style={{
  ...styles.base,
  ...(isComplete ? styles.complete : styles.incomplete),
}}>
  <Text>Task</Text>
</View>
```

### Style Inheritance and Composition

Unlike web CSS, React Native has limited style inheritance. Most style properties aren't automatically inherited by child components, with some exceptions:

1. Text style properties are inherited within Text components:

```jsx
<Text style={{ fontSize: 16, color: 'blue' }}>
  This text is blue
  <Text style={{ fontWeight: 'bold' }}>
    This text is blue AND bold
  </Text>
</Text>
```

2. For other components, you need to explicitly pass styles:

```jsx
// This won't work - backgroundColor won't be inherited
<View style={{ backgroundColor: 'red' }}>
  <View>
    <Text>This view doesn't have red background</Text>
  </View>
</View>

// Correct approach - pass styles explicitly
<View style={{ backgroundColor: 'red' }}>
  <View style={{ backgroundColor: 'red' }}>
    <Text>This view has red background</Text>
  </View>
</View>
```

### Common Style Patterns

#### 1. Containers and Layout

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
});
```

#### 2. Typography

```jsx
const typography = StyleSheet.create({
  titleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: '#666',
  },
});
```

#### 3. Buttons and Interactive Elements

```jsx
const buttonStyles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#2196F3',
  },
});
```

### Organizing Styles

As applications grow, organizing styles becomes crucial for maintainability. Here are common patterns:

#### 1. Co-located Component Styles

Keep styles in the same file as the component:

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicationItem = ({ name, dosage }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.dosage}>{dosage}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { /* styles */ },
  name: { /* styles */ },
  dosage: { /* styles */ },
});

export default MedicationItem;
```

#### 2. Shared Theme Files

Create shared theme files for consistent styling:

```jsx
// theme.js
export const colors = {
  primary: '#4CAF50',
  secondary: '#2196F3',
  background: '#f5f5f5',
  text: '#212121',
  textLight: '#757575',
  error: '#F44336',
};

export const spacing = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
};

export const typography = {
  titleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Additional typography styles...
};
```

Then import in components:

```jsx
import { colors, spacing, typography } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  title: {
    ...typography.titleLarge,
    color: colors.primary,
  },
});
```

#### 3. Style Functions

For dynamic styles, use functions:

```jsx
const getStatusStyle = (status) => {
  switch (status) {
    case 'active':
      return { backgroundColor: colors.primary };
    case 'pending':
      return { backgroundColor: colors.secondary };
    case 'error':
      return { backgroundColor: colors.error };
    default:
      return { backgroundColor: colors.textLight };
  }
};

const MedicationStatus = ({ status }) => (
  <View style={[styles.statusIndicator, getStatusStyle(status)]}>
    <Text style={styles.statusText}>{status}</Text>
  </View>
);
```

## Best Practices for Styling

1. **Use StyleSheet.create()**: Always use this method for better performance and error checking
2. **Create a Theme System**: Define colors, spacing, and typography constants for consistency
3. **Avoid Deep Nesting**: Keep component hierarchy flat for better performance
4. **Platform-Specific Styles**: Use Platform.select() for platform-specific styling
5. **Dimensions API**: Use Dimensions for responsive layouts based on screen size
6. **Extract Reusable Styles**: Create shared style objects for common patterns
7. **Consider Component Libraries**: For complex UIs, consider UI libraries like React Native Paper or UI Kitten

## Summary

Understanding React Native's styling system is fundamental to creating beautiful and maintainable mobile applications. While inspired by CSS, React Native styling has its own rules and patterns that are optimized for mobile development. By properly organizing your styles and leveraging the StyleSheet API, you can create consistent, performant UIs across different devices.

In the next section, we'll dive deeper into layout with Flexbox, which is the primary layout system in React Native.

## Further Reading

- [Style - React Native Documentation](https://reactnative.dev/docs/style)
- [StyleSheet - React Native Documentation](https://reactnative.dev/docs/stylesheet)
- [Height and Width - React Native Documentation](https://reactnative.dev/docs/height-and-width)
- [Color Reference - React Native Documentation](https://reactnative.dev/docs/colors) 