# Section 1: Core UI Components in React Native

## Learning Objectives
After completing this section, you will be able to:
- Identify and use the key built-in React Native components
- Understand the structure and purpose of each core UI component
- Compare React Native components to their web equivalents
- Implement basic UI layouts using core components
- Apply basic styling to React Native components
- Understand platform-specific component behavior

**Prerequisite Knowledge**: Basic React components from Module 6
**Estimated Time**: 45-60 minutes

## Core UI Components Overview

Unlike the web where we have HTML elements like `<div>`, `<span>`, `<p>`, and others, React Native provides a set of built-in components that map to native UI elements on each platform. This approach ensures that your application looks and feels native on each platform while maintaining a consistent API for developers.

### Key UI Components in React Native

#### View
The `View` component is the most fundamental building block in React Native. It's similar to a `<div>` in web development and is used for creating layouts, containers, and styling boundaries.

```jsx
import { View, StyleSheet } from 'react-native';

const SimpleContainer = () => {
  return (
    <View style={styles.container}>
      {/* Content goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
});
```

#### Text
The `Text` component is used to display text. Unlike the web where text can be placed directly inside many elements, in React Native, all text must be wrapped in a `<Text>` component.

```jsx
import { Text, StyleSheet } from 'react-native';

const MedicationName = ({ name, dosage }) => {
  return (
    <Text style={styles.title}>
      {name} <Text style={styles.dosage}>{dosage}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  dosage: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666666',
  },
});
```

#### Image
The `Image` component is used to display images from various sources including local assets, network resources, and even base64 encoded data.

```jsx
import { Image, StyleSheet } from 'react-native';

const MedicationImage = ({ uri }) => {
  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
```

#### ScrollView
The `ScrollView` component is a generic scrollable container that can contain multiple components and views.

```jsx
import { ScrollView, Text, StyleSheet } from 'react-native';

const MedicationList = ({ medications }) => {
  return (
    <ScrollView style={styles.container}>
      {medications.map((med) => (
        <Text key={med.id} style={styles.item}>
          {med.name}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
});
```

#### FlatList and SectionList
For more efficient rendering of large lists, React Native provides optimized components like `FlatList` and `SectionList`.

```jsx
import { FlatList, Text, StyleSheet } from 'react-native';

const OptimizedMedicationList = ({ medications }) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={styles.item}>{item.name}</Text>
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
});
```

#### Pressable
The `Pressable` component is a core component wrapper that can detect various stages of press interactions on any of its defined children.

```jsx
import { Pressable, Text, StyleSheet } from 'react-native';

const MedicationButton = ({ onPress, name }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : {}
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: '#0056B3',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
```

### Platform-Specific Components

Some components in React Native have platform-specific versions or behavior. For example:

```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
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
  },
});
```

## Web vs. React Native Component Comparison

| Web Element | React Native Equivalent | Key Differences |
|-------------|-------------------------|-----------------|
| `<div>` | `<View>` | No direct styling inheritance, no background transparency by default |
| `<span>`, `<p>`, `<h1>` | `<Text>` | All text must be inside a Text component |
| `<img>` | `<Image>` | Requires explicit dimensions, more loading states |
| `<button>` | `<Pressable>`, `<TouchableOpacity>` | Different press states, no built-in styling |
| `<input>` | `<TextInput>` | Different keyboard types, no built-in validation |
| `<select>` | `<Picker>` | Platform-specific appearance and behavior |
| `overflow: auto` | `<ScrollView>`, `<FlatList>` | Separate components for scrolling |
| CSS | StyleSheet API | JavaScript object-based styling with a subset of CSS properties |

## Exercise: Basic Pharmacy UI Layout

Create a basic medicine details screen using React Native core components. The screen should display:

1. A header with the medication name
2. An image of the medication
3. Basic details (dosage, form, etc.)
4. A description section
5. A button to add to cart

Use the following code as a starting point:

```jsx
import React from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';

const MedicationDetailScreen = () => {
  // Replace with your code
  return (
    <View style={styles.container}>
      <Text>Medication Detail Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  // Add your styles here
});

export default MedicationDetailScreen;
```

## Additional Resources

- [React Native Core Components Documentation](https://reactnative.dev/docs/components-and-apis)
- [Platform Specific Code Documentation](https://reactnative.dev/docs/platform-specific-code)
- [FlatList Performance Guide](https://reactnative.dev/docs/optimizing-flatlist-configuration) 