# Section 1: React Native Core Components

## Learning Objectives
After completing this section, you will be able to:
- Identify and use the essential React Native core components
- Understand the purpose and appropriate usage of each component
- Recognize the differences between React Native components and web equivalents
- Implement platform-specific component rendering
- Use props to customize component behavior and appearance

**Prerequisite Knowledge**: Basic understanding of React Components (Module 6)
**Estimated Time**: 1-1.5 hours

## Introduction to Core Components

React Native provides a set of built-in components that map directly to native UI elements on iOS and Android. These core components are the building blocks for all React Native applications. Unlike web development where you use HTML elements like `<div>`, `<span>`, and `<p>`, React Native uses its own set of components that are optimized for mobile.

### Essential Components Overview

Here's an overview of the most commonly used React Native core components:

#### View

The `View` component is the fundamental building block in React Native. It's similar to a `<div>` in web development and serves as a container for other components.

```jsx
import { View } from 'react-native';

const Container = () => (
  <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
    {/* Child components go here */}
  </View>
);
```

View components support flexbox layout, style properties, touch handling, and accessibility controls. They can be nested to create complex layouts.

> 💡 **Deep Dive**: Views in React Native directly map to `UIView` on iOS and `android.view` on Android, making them highly performant compared to web views that require DOM manipulation.

#### Text

The `Text` component is used for displaying text. Unlike web, where text can be placed directly in any element, in React Native, all text must be wrapped in a `Text` component.

```jsx
import { Text } from 'react-native';

const Greeting = () => (
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
    Hello, Pharmacist!
  </Text>
);
```

Text components can be nested, with parent styles affecting child text components.

#### Image

The `Image` component is used to display images from various sources: local assets, network resources, or even base64 encoded data.

```jsx
import { Image } from 'react-native';

// Local image
const LocalImage = () => (
  <Image 
    source={require('./assets/medication.png')} 
    style={{ width: 100, height: 100 }}
  />
);

// Network image
const NetworkImage = () => (
  <Image 
    source={{ uri: 'https://example.com/medication.png' }} 
    style={{ width: 100, height: 100 }}
  />
);
```

Images in React Native require explicit width and height styles, unlike web images that can inherit dimensions from the source file.

#### TextInput

The `TextInput` component allows users to input text. It's equivalent to the `<input>` and `<textarea>` elements in web development.

```jsx
import { TextInput } from 'react-native';
import { useState } from 'react';

const SearchInput = () => {
  const [text, setText] = useState('');
  
  return (
    <TextInput 
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
      value={text}
      onChangeText={setText}
      placeholder="Search medications..."
    />
  );
};
```

TextInput provides many props for customization, including keyboard type, auto-correction, and secure text entry for passwords.

#### ScrollView

The `ScrollView` is a container that allows content to be scrollable when it exceeds the screen size.

```jsx
import { ScrollView, Text } from 'react-native';

const MedicationList = () => (
  <ScrollView style={{ flex: 1 }}>
    <Text style={{ padding: 10 }}>Medication 1</Text>
    <Text style={{ padding: 10 }}>Medication 2</Text>
    {/* More items... */}
  </ScrollView>
);
```

ScrollView renders all its child components at once, which can impact performance with long lists. For large lists, use FlatList or SectionList instead.

#### Button

The `Button` component provides a simple way to create a touchable button with a title.

```jsx
import { Button, Alert } from 'react-native';

const OrderButton = () => (
  <Button
    title="Order Refill"
    onPress={() => Alert.alert('Refill ordered!')}
    color="#4CAF50"
  />
);
```

The Button component appearance follows platform conventions, looking different on iOS and Android by default.

#### TouchableOpacity / TouchableHighlight

These components are used to make views respond properly to touches with visual feedback:

```jsx
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = () => (
  <TouchableOpacity 
    style={{ 
      backgroundColor: '#2196F3', 
      padding: 10, 
      borderRadius: 5 
    }}
    onPress={() => console.log('Pressed!')}
  >
    <Text style={{ color: 'white' }}>Custom Button</Text>
  </TouchableOpacity>
);
```

TouchableOpacity reduces the opacity when pressed, while TouchableHighlight shows a highlight color.

### Platform-Specific Components

React Native allows you to render different components based on the platform using the `Platform` module:

```jsx
import { Platform, Text } from 'react-native';

const PlatformSpecificText = () => (
  <Text style={{ 
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
    marginTop: Platform.OS === 'ios' ? 20 : 10
  }}>
    Platform Adapted Text
  </Text>
);
```

You can also create platform-specific files by using the `.ios.js` and `.android.js` extensions:

```
MyComponent.ios.js
MyComponent.android.js
```

Then import normally:

```jsx
import MyComponent from './MyComponent'; // Automatically selects the right file
```

## Best Practices for Using Core Components

1. **Component Composition**: Break down complex UIs into smaller, reusable components
2. **Consistent Styling**: Establish and reuse style patterns for consistency
3. **Accessibility**: Use accessibility props like `accessibilityLabel` for screen readers
4. **Performance**: Be mindful of nesting too many components, especially in lists
5. **Platform Adaptation**: Use platform-specific components or styles when appropriate

## Summary

The core components in React Native provide the foundation for building mobile interfaces. Understanding their purpose, limitations, and appropriate usage is essential for creating well-structured applications. These components abstract away the complexities of native UI development, allowing you to create cross-platform applications with a single codebase.

In the next section, we'll explore how to style these components effectively using React Native's styling system.

## Further Reading

- [React Native Components and APIs](https://reactnative.dev/docs/components-and-apis)
- [Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Accessibility in React Native](https://reactnative.dev/docs/accessibility) 