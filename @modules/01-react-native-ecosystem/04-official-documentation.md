# Essential Resources: Mastering Official Documentation

## Introduction

In the rapidly evolving landscape of mobile development, relying on official documentation is paramount. For React Native and Expo development, the official websites [reactnative.dev](https://reactnative.dev) and [docs.expo.dev](https://docs.expo.dev) serve as the primary, most accurate, and consistently updated sources of truth. Treating these as indispensable resources is a critical skill for building and maintaining production-quality applications.

This section will guide you through these essential documentation resources, helping you understand their structure and how to effectively use them in your development workflow.

## React Native Docs (reactnative.dev)

[React Native's official documentation](https://reactnative.dev) is the definitive resource for the core React Native framework. Understanding its organization will help you navigate it efficiently.

### Structure

The React Native documentation is organized into several key sections:

#### Guides

The Guides section covers fundamental concepts and practical tutorials:

- **Fundamentals**: JSX, components, state, props, and the core concepts of React Native
- **Platform-specific code**: How to write code that targets specific platforms
- **Environment setup**: Detailed instructions for configuring your development environment
- **Styling**: Comprehensive coverage of styling approaches, including Flexbox
- **Advanced topics**: More complex aspects of React Native development

```jsx
// Example from the Guides section - Using state
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>You clicked {count} times</Text>
      <Button
        title="Click me!"
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
}
```

#### Components & APIs

This section provides detailed reference documentation for:

- **Built-in components**: Comprehensive documentation for core components like `<View>`, `<Text>`, `<Image>`, `<ScrollView>`, etc.
- **Core APIs**: Detailed information about APIs like `StyleSheet`, `PixelRatio`, and others
- **Props**: Exhaustive lists of props for each component
- **Methods**: Available methods and their parameters
- **Platform notes**: Platform-specific behaviors and limitations

![React Native Components Documentation](https://reactnative.dev/img/homepage/phones.png)

#### Architecture

The Architecture section explains React Native's inner workings:

- **New Architecture**: Detailed documentation on JSI, Fabric, and Turbo Modules
- **Rendering pipeline**: How React Native renders components to native views
- **Threading model**: How the different threads in React Native interact

#### Community & Blog

- **Community resources**: Links to forums, chat channels, and other community resources
- **Blog posts**: Official announcements and articles about React Native development

### Key Features

- **Interactive examples**: Many sections include interactive code examples using the Snack Player, allowing you to experiment directly in the browser
- **Versioned documentation**: The documentation is versioned to match different releases of React Native, ensuring you're looking at the correct information for your project's version

> **Pro Tip**: Always check the version selector in the documentation to ensure you're viewing documentation that matches your React Native version.

## Expo Docs (docs.expo.dev)

[Expo's documentation](https://docs.expo.dev) is the essential resource for the Expo framework, tooling, and services built around React Native.

### Structure

The Expo documentation is organized into several main sections:

#### Guides

- **Get started**: Creating projects, environment setup, and initial configuration
- **Develop**: Comprehensive guides on using Expo CLI, navigation, UI components, and debugging
- **Review**: Testing and quality assurance
- **Deploy**: Building and distributing your application

```bash
# Example from the Get Started section
npx create-expo-app my-app
cd my-app
npx expo start
```

#### EAS (Expo Application Services)

Detailed documentation on Expo's cloud services:

- **EAS Build**: Cloud service for building native binaries (Development Builds, production builds)
- **EAS Submit**: Service for submitting builds to app stores
- **EAS Update**: Over-the-Air update system

#### Reference

- **API documentation**: Comprehensive reference for all Expo SDK modules (e.g., `expo-location`, `expo-camera`, `expo-notifications`)
- **Configuration options**: Detailed information about configuration files and options

#### Troubleshooting

- **Common issues**: Guides for resolving issues related to Expo CLI, EAS Build, updates, and general development errors
- **Error codes**: Explanations and solutions for specific error codes

### Key Features

- **SDK versioning**: Expo documentation emphasizes SDK versioning, as compatibility between Expo SDK versions, React Native versions, and native dependencies is critical
- **Command reference**: Clear explanations of Expo-specific commands like `npx create-expo-app`, `npx expo start`, and the crucial `npx expo install`
- **Platform-specific guides**: Detailed setup guides for specific platforms, like using the iOS Simulator

## Effective Documentation Usage

### Navigation & Search

Effective use of the documentation involves leveraging the structured navigation sidebars and, critically, the search functionality available on both sites. Searching for specific terms is often the quickest way to find relevant information:

- **Component names**: e.g., "FlatList"
- **API modules**: e.g., "PermissionsAndroid"
- **CLI commands**: e.g., "expo install"
- **Concepts**: e.g., "Flexbox", "JSI"

### Self-Reliance

Developing the habit of consulting the official documentation first when encountering issues or needing information about a specific feature fosters self-reliance and ensures developers are working with the most accurate information. Community forums and Stack Overflow are valuable secondary resources, but the official docs should always be the starting point.

![Documentation Search](https://docs.expo.dev/static/images/header_search_bar.png)

## Knowing Which Resource to Use

Proficiency in React Native development, especially within the Expo ecosystem, requires familiarity with both documentation sites:

- **React Native Docs (reactnative.dev)**: For core framework concepts, fundamental components/APIs, and architectural details
- **Expo Docs (docs.expo.dev)**: For Expo-specific tooling (CLI commands, Expo Go, Development Builds), Expo Application Services (EAS), and Expo SDK module APIs

Knowing which resource governs which aspect of the technology stack is essential for efficient problem-solving and development.

## Key Documentation Links

### React Native
- [Getting Started](https://reactnative.dev/docs/getting-started)
- [Core Components and APIs](https://reactnative.dev/docs/components-and-apis)
- [Style Reference](https://reactnative.dev/docs/style)
- [Layout with Flexbox](https://reactnative.dev/docs/flexbox)
- [New Architecture](https://reactnative.dev/architecture/landing-page)

### Expo
- [Get Started with Expo](https://docs.expo.dev/get-started/create-a-project/)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo SDK](https://docs.expo.dev/versions/latest/)
- [Troubleshooting](https://docs.expo.dev/troubleshooting/overview/)

## Summary

The official documentation for React Native and Expo represents the most reliable, up-to-date, and comprehensive resources for developers. Mastering these documentation resources is a critical skill that will:

1. Accelerate your learning process
2. Help you solve problems more efficiently
3. Keep you informed about best practices and new features
4. Reduce dependency on potentially outdated third-party resources

As you progress through this course and beyond, make it a habit to consult the official documentation first when you encounter challenges or need to learn new aspects of React Native development.

In the next section, we'll summarize what we've learned about the React Native ecosystem and preview what's coming in Module 2.