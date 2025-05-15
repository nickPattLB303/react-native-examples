# Section 1: Styling Fundamentals in React Native

## Learning Objectives
After completing this section, you will be able to:
- Understand how styling in React Native differs from web CSS
- Apply inline styles to React Native components
- Use the style prop effectively with different component types
- Combine and merge styles in React Native
- Identify supported style properties and their limitations
- Apply platform-specific styles when needed
- Use styled-components for React Native styling

**Prerequisite Knowledge**: React Native Components (Module 7)
**Estimated Time**: 45-60 minutes

## Introduction to React Native Styling

React Native uses a styling approach that is similar to CSS but with some important differences. Styles in React Native are written in JavaScript, using a subset of CSS properties with camelCase naming conventions.

> 💡 **Key Insight**: React Native styles are not actual CSS. They are JavaScript objects that resemble CSS, but with limitations and differences in behavior. Understanding these differences is crucial for effective styling in React Native.

## Style Objects in React Native

The most basic way to style a component in React Native is by passing a style object to the component's `style` prop:

```jsx
import { View, Text } from 'react-native';

function BasicStyling() {
  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>
        Hello, React Native Styling!
      </Text>
    </View>
  );
}
```

### Key Differences from Web CSS:

1. **Property Names**: Use camelCase instead of kebab-case
   - `background-color` → `backgroundColor`
   - `font-size` → `fontSize`
   - `border-radius` → `borderRadius`

2. **Value Units**: Most dimensions are unitless and represent density-independent pixels
   - `fontSize: 16` (not `16px`)
   - `margin: 10` (not `10px`)

3. **Limited Property Set**: Not all CSS properties are supported
   - No CSS Grid
   - Limited support for shadows (use `elevation` on Android)
   - No pseudo-classes like `:hover` or `:focus`

4. **No Cascading**: Styles don't cascade down to child components
   - Text styles only affect the specific `<Text>` component they're applied to
   - Parent container styles don't automatically apply to children

## Style Arrays

React Native allows you to pass an array of styles to a component. Later styles in the array will override earlier ones:

```jsx
import { Text } from 'react-native';

function StyleArrayExample() {
  const baseStyle = { fontSize: 16, color: 'black' };
  const highlightStyle = { color: 'blue', fontWeight: 'bold' };
  
  return (
    <Text style={[baseStyle, highlightStyle]}>
      This text uses combined styles
    </Text>
  );
}
```

This is particularly useful for:
- Applying conditional styles
- Extending base styles with specific variations
- Overriding specific properties while keeping others

## Conditional Styling

You can conditionally apply styles based on component state or props:

```jsx
import { View, Text } from 'react-native';

function ConditionalStyling({ isActive, isError }) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: isActive ? '#e6f7ff' : '#f0f0f0',
        borderWidth: 1,
        borderColor: isError ? 'red' : '#ddd',
      }}
    >
      <Text
        style={{
          color: isError ? 'red' : isActive ? 'blue' : 'black',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        Status: {isActive ? 'Active' : 'Inactive'}
      </Text>
    </View>
  );
}
```

You can also use the array approach for conditional styling:

```jsx
import { Text } from 'react-native';

function ConditionalStyleArray({ isImportant }) {
  return (
    <Text
      style={[
        { fontSize: 16, color: 'black' },
        isImportant && { fontWeight: 'bold', color: 'red' },
      ]}
    >
      {isImportant ? 'Important message!' : 'Regular message'}
    </Text>
  );
}
```

> 💡 **Tip**: When using the `&&` operator for conditional styles, be aware that falsy values like `false` will be ignored, but `0` might be interpreted as a valid style value in some cases. Use ternary operators when in doubt.

## Component-Specific Styling

Different React Native components accept different style properties:

### View Styling
Views accept layout properties, backgrounds, borders, and shadows:

```jsx
<View
  style={{
    width: 200,
    height: 100,
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 2,
  }}
/>
```

### Text Styling
Text components accept typography-related properties:

```jsx
<Text
  style={{
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  }}
>
  Styled Text Example
</Text>
```

### Image Styling
Image components accept layout properties and specific image-related styles:

```jsx
<Image
  source={require('./assets/medication.png')}
  style={{
    width: 200,
    height: 200,
    resizeMode: 'cover', // 'cover', 'contain', 'stretch', 'repeat', 'center'
    borderRadius: 100, // Makes a circular image if width and height are equal
  }}
/>
```

## Platform-Specific Styling

React Native provides the `Platform` module to apply different styles based on the operating system:

```jsx
import { Platform, View, Text } from 'react-native';

function PlatformSpecificStyling() {
  return (
    <View
      style={{
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
          },
        }),
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
          fontSize: 16,
        }}
      >
        This has platform-specific styling
      </Text>
    </View>
  );
}
```

You can also create platform-specific files:
- `MyComponent.ios.js` - Used only on iOS
- `MyComponent.android.js` - Used only on Android
- `MyComponent.js` - Fallback for other platforms

## Common Styling Patterns

### Card Component
```jsx
<View
  style={{
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }}
>
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
    Card Title
  </Text>
  <Text style={{ fontSize: 14, color: '#666' }}>
    Card content goes here
  </Text>
</View>
```

### Button Component
```jsx
<TouchableOpacity
  style={{
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  }}
  onPress={() => console.log('Button pressed')}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    Press Me
  </Text>
</TouchableOpacity>
```

### Form Input
```jsx
<View style={{ marginBottom: 15 }}>
  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>
    Email Address
  </Text>
  <TextInput
    style={{
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      padding: 10,
      fontSize: 16,
    }}
    placeholder="Enter your email"
    keyboardType="email-address"
  />
</View>
```

## Styled Components in React Native

[Styled Components](https://styled-components.com/) is a popular CSS-in-JS library that works well with React Native. It allows you to define your styles using tagged template literals and creates React components with those styles attached.

### Basic Usage

```jsx
import React from 'react';
import styled from 'styled-components/native';

// Create a styled component
const Container = styled.View`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Paragraph = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 20px;
`;

// Use the styled components
function StyledComponentExample() {
  return (
    <Container>
      <Title>Styled Components Example</Title>
      <Paragraph>
        This example uses styled-components to create styled React Native components.
        Notice how the styling is co-located with the component definition.
      </Paragraph>
    </Container>
  );
}
```

### Props-Based Styling

Styled components can adapt their styles based on props:

```jsx
import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  padding: 12px 24px;
  border-radius: 6px;
  align-items: center;
  background-color: ${props => props.primary ? '#1890ff' : '#f5f5f5'};
`;

const ButtonText = styled.Text`
  font-weight: bold;
  color: ${props => props.primary ? 'white' : '#333'};
`;

function StyledButton({ title, primary, onPress }) {
  return (
    <Button primary={primary} onPress={onPress}>
      <ButtonText primary={primary}>{title}</ButtonText>
    </Button>
  );
}

// Usage
function ButtonExample() {
  return (
    <View>
      <StyledButton title="Primary Button" primary onPress={() => {}} />
      <StyledButton title="Secondary Button" onPress={() => {}} />
    </View>
  );
}
```

### Extending Styles

You can extend existing styled components:

```jsx
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ElevatedCard = styled(Card)`
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 4;
`;
```

### Advantages of Styled Components

1. **Component-centric**: Styles are tied directly to components
2. **Dynamic styling**: Easily adapt styles based on props
3. **Theming support**: Built-in theming capabilities
4. **CSS-like syntax**: Familiar syntax for web developers
5. **No style collisions**: Styles are scoped to components
6. **Reusability**: Create a library of styled components

### Styled Components vs. StyleSheet API

| Feature | Styled Components | StyleSheet API |
|---------|------------------|----------------|
| Syntax | CSS-like template literals | JavaScript objects |
| Performance | Good, but slightly less optimized | Highly optimized with StyleSheet.create |
| Dynamic styling | Easy with props | Requires conditional logic |
| Theming | Built-in ThemeProvider | Requires custom implementation |
| Learning curve | Familiar for CSS developers | Requires learning new patterns |
| Bundle size | Adds library dependency | Built into React Native |

> 💡 **Best Practice**: Consider using styled-components for complex UI components and theme-heavy applications, while using StyleSheet API for performance-critical parts of your app.

## Common Pitfalls and Tips

- **Text Styling**: Text styles don't cascade automatically. Each `<Text>` component needs its own style.
- **Dimensions**: Use relative dimensions (percentages, flex) rather than fixed values when possible for better responsiveness.
- **Shadows**: Shadow implementation differs between iOS and Android. Use both `shadowX` properties and `elevation` for cross-platform shadows.
- **Nested Text**: Unlike web, React Native allows nesting `<Text>` components, and child text components will inherit styles from their parent text components.
- **Debugging**: Use the React Native Debugger or Flipper to inspect and modify styles during development.
- **Styled Components**: When using styled-components, remember that you need to import from 'styled-components/native', not just 'styled-components'.

## Exercise: Style Transformation

Take a basic unstyled component and transform it into a well-styled one:

1. Start with this unstyled medication list item:
```jsx
import { View, Text, Image } from 'react-native';

function MedicationItem({ name, dosage, schedule }) {
  return (
    <View>
      <Image source={require('./assets/pill-icon.png')} />
      <View>
        <Text>{name}</Text>
        <Text>{dosage}</Text>
        <Text>{schedule}</Text>
      </View>
    </View>
  );
}
```

2. Apply appropriate styling to create a visually appealing medication list item with:
   - Proper layout and spacing
   - Typography hierarchy
   - Visual separation (borders, shadows)
   - Platform-specific enhancements

## Additional Resources

- [React Native Style Documentation](https://reactnative.dev/docs/style)
- [React Native Layout Props](https://reactnative.dev/docs/layout-props)
- [React Native Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Styled Components Documentation](https://styled-components.com/docs/basics#react-native)
- [Styled Components for React Native](https://www.reactnative.guide/8-styling/8.2-styled-components-basics.html)

> 🔄 **For Web Developers**: Remember that React Native styles are JavaScript objects, not CSS. Many familiar CSS properties are unavailable or behave differently. Focus on learning the React Native equivalents for your common CSS patterns. If you're coming from a CSS-heavy background, styled-components might feel more familiar.

> 🔄 **For Android/iOS Developers**: React Native's styling system provides a unified way to style components across platforms, but you can still apply platform-specific styles when needed. Compare this approach to how you would style native components in Android (XML) or iOS (UIKit/SwiftUI).
