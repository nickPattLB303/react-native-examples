# Module 7: React Native UI and Styling

<link rel="stylesheet" href="../../custom.css">

---

## Overview

<div class="instructor-led">Instructor-led content</div>
<div class="self-led">Self-led content</div>
<div class="asynchronous">Asynchronous learning</div>

In this module, we'll explore how to create visually appealing and responsive user interfaces in React Native using various styling techniques and UI components.

<blockquote><details>

React Native provides a powerful and flexible approach to building mobile user interfaces that work consistently across both iOS and Android platforms. Unlike traditional mobile development where UI is defined separately for each platform, React Native allows developers to create a unified UI codebase while still respecting platform-specific behaviors and aesthetics.

Understanding React Native's styling and UI approach is essential for creating professional-quality mobile applications. While React Native styling is based on CSS, it has important differences that mobile developers need to master. The styling system is implemented in JavaScript and uses a subset of CSS properties with some mobile-specific additions.

This module covers both the foundational styling mechanisms in React Native (like StyleSheet) and more advanced approaches (like styled-components). You'll learn how to handle different screen sizes, orientations, and platform-specific adaptations to ensure your applications look great on any device.

For developers coming from different backgrounds, this module provides important connections:
- Web developers will see similarities to CSS but with mobile-specific adaptations
- Native mobile developers will learn how React Native's declarative approach differs from imperative UI programming
- React developers will understand how React Native's component model extends to mobile platforms with specific UI primitives

By the end of this module, you'll have comprehensive knowledge of React Native's UI capabilities and styling approaches, enabling you to create visually consistent, responsive, and platform-appropriate mobile interfaces.

</details></blockquote>

---

## Learning Objectives

By the end of this module, you will be able to:

- Understand React Native's core UI components and their use cases
- Apply styles using StyleSheet API effectively
- Create responsive layouts with Flexbox
- Adapt UI for different screen sizes and orientations
- Implement platform-specific styling
- Use third-party UI libraries and styled-components
- Apply theming and design systems principles

<blockquote><details>

These learning objectives are carefully structured to build upon each other, creating a comprehensive foundation in React Native UI development.

Understanding React Native's core UI components is essential as they are the building blocks for all mobile interfaces. Unlike the DOM elements in web development, React Native provides a set of built-in components that map to native UI controls. Mastering when and how to use components like View, Text, Image, TouchableOpacity, and ScrollView is fundamental to React Native development.

The StyleSheet API is React Native's primary styling mechanism, offering better performance than inline styles while providing a familiar CSS-like approach. Learning to organize, reuse, and optimize styles using this API is crucial for maintaining clean, performant code.

Flexbox in React Native forms the backbone of layout design. While similar to web Flexbox, there are mobile-specific considerations and default behaviors that differ slightly. Mastering Flexbox enables developers to create complex, responsive layouts that work consistently across different screen sizes and orientations.

Responsiveness is particularly important in mobile development given the wide variety of device sizes in the market. This objective focuses on techniques for adapting layouts, font sizes, and spacing based on screen dimensions, ensuring a consistent user experience across devices.

Platform-specific styling addresses the UI expectations and conventions of iOS and Android users. While React Native promotes code sharing, respecting platform-specific design patterns improves user experience by providing familiar interfaces on each platform.

Third-party UI libraries and styling solutions like styled-components extend React Native's built-in capabilities. These tools can accelerate development, improve code organization, and enable more sophisticated styling approaches.

Theming and design systems round out the module by introducing systematic approaches to styling that ensure consistency across an entire application. These principles help teams scale their UI development while maintaining a cohesive look and feel.

Together, these objectives provide a comprehensive skill set for creating professional, polished user interfaces in React Native applications.

</details></blockquote>

---

## Prerequisites

- Basic understanding of React components
- Familiarity with CSS concepts
- Completion of Module 6: React Essentials
- TypeScript fundamentals

<div class="android-dev">Android developers will recognize some UI patterns but should focus on the declarative paradigm</div>
<div class="ios-dev">iOS developers should note the cross-platform abstractions of common UIKit components</div>
<div class="web-dev">Web developers will find similarities to CSS but should pay attention to mobile-specific differences</div>

<blockquote><details>

Before diving into React Native UI and styling, certain foundational knowledge is necessary to ensure you can effectively apply the concepts presented in this module.

A **basic understanding of React components** is essential, as React Native builds directly on React's component model. You should be comfortable with concepts like props, state, and component lifecycle. The previous module on React Essentials covers these topics in detail, making it an important prerequisite.

**Familiarity with CSS concepts** provides helpful context, as React Native's styling system is inspired by CSS. Understanding properties like margin, padding, color, and flexbox will make the transition to React Native styling more intuitive. However, it's important to note that React Native implements only a subset of CSS, with some properties renamed and others omitted entirely.

**TypeScript fundamentals** become increasingly important when defining prop types for UI components and creating type-safe styles. TypeScript helps catch styling errors at compile time rather than runtime, which is particularly valuable when working with dynamic styles that depend on props or state.

For participants with different backgrounds, certain aspects of the module may require more attention:

**Android developers** will recognize similarities to Android's layout systems (particularly ConstraintLayout and LinearLayout), but should focus on adapting to React Native's declarative approach instead of the imperative style common in native Android development. The component reuse patterns and styling approaches differ significantly from traditional Android development.

**iOS developers** will see familiar concepts mapped from UIKit components but implemented through React Native's cross-platform abstractions. Understanding how React Native components translate to native UIKit elements helps leverage existing iOS knowledge while adapting to the React Native paradigm.

**Web developers** have an advantage with CSS knowledge but need to pay careful attention to mobile-specific concerns such as touch interactions, screen size variations, and platform-specific UI conventions. The absence of certain CSS features (like cascading) and the addition of mobile-specific properties represent important differences from web styling.

This module builds directly on the foundation established in Module 6: React Essentials, extending those concepts to mobile-specific UI development. While participants can be successful with varying levels of prerequisite knowledge, a solid understanding of these fundamentals will ensure a smoother learning experience.

</details></blockquote>

---

## Introduction to React Native UI

React Native provides a set of built-in UI components that render to native platform UI elements, offering better performance than WebView-based solutions.

Key concepts:
- Core components map to native UI controls
- Cross-platform consistency with platform-specific adaptations
- Declarative UI instead of imperative manipulation
- Component-based architecture for reusability

<blockquote><details>

React Native represents a paradigm shift in mobile development by enabling developers to build mobile applications using React's component-based architecture while rendering to truly native UI elements rather than WebViews. This approach combines the development efficiency of JavaScript with the performance and feel of native applications.

At the heart of React Native's UI system is a set of built-in components that map directly to platform-specific native UI controls. When you use a `<Text>` component in React Native, it renders as a `UILabel` on iOS and a `TextView` on Android. This mapping to native components is what distinguishes React Native from hybrid solutions that render HTML in a WebView, resulting in better performance and a more authentic native feel.

React Native strikes a balance between cross-platform consistency and platform-specific authenticity. While the same component API works across platforms, React Native respects platform conventions by adapting certain behaviors and appearances automatically. For example, a `<Button>` component will look and behave differently on iOS and Android without requiring developer intervention, matching user expectations on each platform.

The declarative nature of React Native UI is a fundamental shift for developers accustomed to imperative UI programming in traditional native development. Instead of directly manipulating UI elements (like `view.setBackgroundColor(red)`), React Native developers describe what the UI should look like for a given state, and the framework handles the updates when state changes. This declarative approach leads to more predictable code with fewer UI-related bugs.

React Native's component-based architecture encourages reusability and separation of concerns. UI elements are broken down into components that can be composed to create complex interfaces. This modularity makes code easier to understand, test, and maintain, especially as applications grow in complexity.

Understanding these foundational concepts is crucial for effectively working with React Native UI. The mental model differs significantly from both web development and traditional native development, though it borrows concepts from both. Embracing this component-oriented, declarative approach enables developers to create sophisticated mobile interfaces with less code and fewer platform-specific adaptations.

</details></blockquote>

---

## Core Components Overview

React Native provides several essential built-in components for building UIs:

| Web                | React Native       | Description                               |
|--------------------|--------------------|-------------------------------------------|
| `<div>`            | `<View>`           | Container for other components            |
| `<span>`, `<p>`    | `<Text>`           | Displays text                             |
| `<img>`            | `<Image>`          | Displays images                           |
| `<input>`, `<button>` | `<TextInput>`, `<Button>` | User input controls             |
| `<ul>`, `<ol>`, `<li>` | `<FlatList>`, `<SectionList>` | Efficient list rendering   |
| `<a>`              | `<Pressable>`, `<TouchableOpacity>` | Handles touch interactions |
| `<div class="scrollable">` | `<ScrollView>` | Scrollable container                  |

<blockquote><details>

Understanding React Native's core components is essential for building any mobile application. These components serve as the fundamental building blocks of your UI, each designed to fulfill specific roles while mapping to native controls for optimal performance.

The `<View>` component is React Native's primary container element, similar to a `<div>` in web development. It's used to build layouts, group content, and apply styles. Views can be nested to create complex hierarchies and are the foundation of most React Native layouts. Unlike divs, Views don't have text flow or built-in scrolling capabilities by default.

The `<Text>` component is the only component that can display text in React Native - a significant difference from web development where text can exist directly inside many elements. All text must be wrapped in a Text component, and Text components can be nested to apply different styles to substrings. This strict containment is part of React Native's optimization strategy.

The `<Image>` component handles displaying images from various sources, including local assets, network resources, and even base64 encoded data. Unlike web img tags, React Native Images require explicit dimensions or they won't be displayed. The Image component also offers performance optimizations like caching and progressive loading.

For user input, React Native provides specialized components like `<TextInput>` and `<Button>`. TextInput offers capabilities similar to web input elements with mobile-specific features like keyboard types and auto-correction. The Button component provides a simple, platform-appropriate button implementation, though many developers prefer using Pressable or TouchableOpacity for more customization.

List rendering gets special treatment in React Native with the `<FlatList>` and `<SectionList>` components. Unlike simply mapping arrays to components (as is common in React for web), these specialized components implement virtualization - rendering only items currently visible on screen. This optimization is crucial for mobile performance when dealing with long lists of data.

Touch handling in React Native is implemented through components like `<Pressable>` and `<TouchableOpacity>`, which provide touch feedback appropriate to each platform. Pressable is the newer, more flexible API that gives fine-grained control over touch states, while TouchableOpacity provides a simple opacity feedback effect when pressed.

The `<ScrollView>` component enables scrolling content that exceeds the screen dimensions. Unlike View, it renders all its child components at once, making it appropriate for a limited number of items. For longer lists, FlatList is more performance-efficient.

These core components form the foundation of React Native UI development. While they map conceptually to web elements, they're optimized for mobile interactions and performance considerations. Understanding their behaviors, limitations, and appropriate use cases is essential for effective React Native development.

</details></blockquote>

---

## View Component

The `View` component is the fundamental building block for UI in React Native:

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

function MedicationCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}></View>
      <View style={styles.content}>
        <View style={styles.leftColumn}></View>
        <View style={styles.rightColumn}></View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  header: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flexDirection: 'row',
    padding: 10,
  },
  leftColumn: {
    width: 100,
    backgroundColor: '#f9f9f9',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
  },
  footer: {
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
```

<blockquote><details>

The `View` component is the fundamental building block of UI in React Native, serving as the equivalent to `div` elements in web development. It's a container that supports layout with Flexbox, style, touch handling, and accessibility controls. Understanding View is essential as it forms the structural foundation of nearly every React Native interface.

In the provided example, we see a `MedicationCard` component that uses nested Views to create a structured card layout with a header, content area (with two columns), and footer. This hierarchical structure demonstrates how Views are used to organize the visual elements of an interface.

Views are highly flexible and can be styled extensively. The example illustrates several important styling capabilities:

1. **Shape and appearance**: The outer card View has rounded corners (`borderRadius`), background color, and shadow effects.

2. **Borders**: The header and footer Views use border properties to create separator lines.

3. **Layout**: The content View uses `flexDirection: 'row'` to arrange its children horizontally instead of the default vertical stacking.

4. **Spacing**: Various padding and margin properties create appropriate spacing between elements.

5. **Platform-specific styling**: Notice the use of both `shadowProperties` (for iOS) and `elevation` (for Android) to create consistent card shadowing across platforms.

Views by themselves don't render any visible content unless styled with background colors or borders. They're invisible containers by default, focusing on layout and structure rather than presentation. This is different from web divs which might have browser-specific default styling.

One important distinction from web development is that Views don't have scrolling capabilities by default. If content might exceed the available space, you'll need to wrap Views in a ScrollView or use a list component like FlatList.

Views also don't directly display text content - all text must be wrapped in Text components, even if the View has other styling applied. This strict separation is part of React Native's optimization strategy and reflects how native UI elements work.

Like all React Native components, Views are translated to platform-specific native UI elements: `UIView` on iOS and `android.view` on Android. This ensures optimal performance while maintaining a consistent developer experience across platforms.

The nested structure of Views in this example demonstrates React Native's compositional approach to building interfaces, allowing complex UI to be broken down into manageable, reusable pieces.

</details></blockquote>

---

## Text Component

The `Text` component is the only way to display text in React Native:

```tsx
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

function MedicationLabel() {
  return (
    <View style={styles.container}>
      <Text style={styles.drugName}>Amoxicillin</Text>
      <Text style={styles.dosage}>500mg <Text style={styles.frequency}>(Take 3 times daily)</Text></Text>
      
      <Text style={styles.warning}>
        Common side effects include: 
        <Text style={styles.sideEffect}> diarrhea</Text>,
        <Text style={styles.sideEffect}> nausea</Text>,
        <Text style={styles.sideEffect}> vomiting</Text>
      </Text>
      
      <Text style={styles.instructions}>
        Take with food. Complete the full course of treatment even if you feel better.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  drugName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  dosage: {
    fontSize: 18,
    marginBottom: 10,
  },
  frequency: {
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  warning: {
    marginVertical: 10,
    color: '#e74c3c',
  },
  sideEffect: {
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: 10,
    lineHeight: 20,
  },
});
```

<blockquote><details>

The `Text` component is a fundamental building block in React Native that serves as the only way to display textual content in your applications. Unlike web development where text can exist directly inside many HTML elements, in React Native all text must be wrapped in a Text component. This strict requirement reflects the architecture of native mobile platforms and helps React Native optimize rendering.

In the provided example, we see a `MedicationLabel` component that showcases several important features of the Text component:

**Nesting Text components** is a powerful pattern uniquely supported in React Native. In the example, we nest Text components to apply different styles to portions of text within the same paragraph. For instance, the frequency "(Take 3 times daily)" has a different style from the dosage it's attached to, and the side effects are bold while the rest of the warning text is not. This nesting capability is similar to how `<span>` elements might be used within paragraphs in HTML.

**Text-specific styling properties** are demonstrated throughout the example. Properties like `fontSize`, `fontWeight`, `fontStyle`, `color`, and `lineHeight` control the appearance of text. These properties are applied specifically to the Text component and its nested children. Text also inherits styles from parent Text components, but not from View components - an important distinction from web development's CSS inheritance.

**Layout and spacing** for Text follows the same Flexbox rules as other components, but with some text-specific behaviors. The example shows how marginVertical creates space before and after paragraphs, while lineHeight controls the spacing between lines of text within a paragraph.

**Platform considerations** are important when working with Text. While not explicitly shown in the example, fonts and text rendering behave differently between iOS and Android. React Native handles many of these differences automatically, but for perfect text rendering across platforms, you might need platform-specific adjustments.

Text components also support important functionality not shown in this basic example:

1. **Accessibility features** like adjustable font sizes for users with visual impairments
2. **Text selection** controls to enable or disable user selection
3. **Number of lines** limitations with ellipsis truncation
4. **Press handling** directly on Text components for interactive text
5. **Text breaking strategies** for different languages and writing systems

Unlike some other React Native components, Text has built-in support for limited nested styling without requiring additional container elements. This makes it particularly flexible for creating rich text layouts like the medication label shown in the example.

Understanding Text is essential for React Native development as virtually every screen will contain textual elements, from simple labels to complex formatted content. Mastering Text styling and nesting patterns enables the creation of readable, accessible, and visually consistent textual interfaces.

</details></blockquote>

---

## Image Component

The `Image` component handles displaying various types of images:

```tsx
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

function PharmacyProduct() {
  return (
    <View style={styles.container}>
      {/* Local static image */}
      <Image 
        source={require('../assets/medication.png')}
        style={styles.productImage}
      />
      
      {/* Remote image with resize mode */}
      <Image
        source={{ uri: 'https://example.com/medication-photo.jpg' }}
        style={styles.productPhoto}
        resizeMode="cover"
        // Loading indicator
        loadingIndicatorSource={require('../assets/image-loading.gif')}
      />
      
      {/* Background image pattern */}
      <Image 
        source={require('../assets/pill-pattern.png')}
        style={styles.backgroundPattern}
        resizeMode="repeat"
      >
        <Text style={styles.overlayText}>Medication Information</Text>
      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productPhoto: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 15,
  },
  backgroundPattern: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  }
});
```

<blockquote><details>

The `Image` component in React Native is essential for displaying visual content in your applications. It handles rendering various types of images, from local assets to remote network resources. Understanding the Image component is crucial for creating visually engaging mobile interfaces.

The example demonstrates three common use cases for the Image component:

**1. Local static images** are included in your application bundle during the build process. Using `require('../assets/medication.png')` with a relative path referencing the image file is the recommended approach for static assets. These images are available immediately without network requests and work offline. The require statement is evaluated at build time, so the path must be a string literal, not a variable.

**2. Remote images** must be loaded from a network source using the `{ uri: 'https://example.com/image.jpg' }` format. Unlike web development, React Native requires you to explicitly specify dimensions for remote images - they won't automatically size themselves based on content. The example shows how to display a loading indicator while the remote image is being fetched, enhancing the user experience during loading states.

**3. Background images with content** can be created by nesting other components inside an Image component. In the example, a repeating pill pattern serves as the background for text content. This pattern is common for headers, cards, or promotional sections that need visually rich backgrounds with overlaid content.

The example also demonstrates several important Image properties:

**`resizeMode`** controls how the image should be resized to fit its container:
- `'cover'`: (used for the product photo) scales the image to cover the entire container, potentially cropping parts of the image
- `'repeat'`: (used for the background pattern) tiles the image to fill the container
- Other options include `'contain'`, `'stretch'`, and `'center'`

**Styling images** follows general React Native styling patterns with some image-specific considerations:
- `width` and `height` are required for most images
- `borderRadius` creates rounded corners (particularly common in mobile UIs)
- Percentage widths (like `width: '100%'`) make images responsive to container size

Important considerations not explicitly shown in the example include:

1. **Performance optimization**: Large or numerous images can impact performance. React Native provides tools like caching and progressive loading to optimize image display.

2. **Platform differences**: Image rendering can vary slightly between iOS and Android, particularly for tinted images or certain resize modes.

3. **Accessibility**: Images should include appropriate accessibility attributes to support screen readers and other assistive technologies.

4. **Error handling**: The Image component can specify a fallback for when images fail to load using the `onError` prop.

5. **Animation**: Images can be animated using the Animated API, allowing for fade-ins, transitions, and other visual effects.

Effective use of the Image component is key to creating polished, professional-looking React Native applications. Whether displaying product photos, user avatars, icons, or background patterns, understanding image handling ensures optimal performance and visual quality.

</details></blockquote>

---

## Touchable Components

React Native provides several components for handling touch interactions:

```tsx
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableHighlight, 
  TouchableOpacity, TouchableWithoutFeedback, Pressable 
} from 'react-native';

function MedicationActions() {
  const [selectedDosage, setSelectedDosage] = useState<string | null>(null);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Actions</Text>
      
      {/* TouchableOpacity - fades when pressed */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => console.log('Take medication now')}
        activeOpacity={0.6}
      >
        <Text style={styles.buttonText}>Take Now</Text>
      </TouchableOpacity>
      
      {/* TouchableHighlight - changes background when pressed */}
      <TouchableHighlight
        style={styles.button}
        onPress={() => console.log('Skipping dose')}
        underlayColor="#d63031"
      >
        <Text style={styles.buttonText}>Skip Dose</Text>
      </TouchableHighlight>
      
      {/* TouchableWithoutFeedback - no visual feedback */}
      <TouchableWithoutFeedback
        onPress={() => console.log('Setting reminder')}
        onLongPress={() => console.log('Clearing all reminders')}
      >
        <View style={styles.subtleButton}>
          <Text style={styles.subtleButtonText}>Set Reminder</Text>
        </View>
      </TouchableWithoutFeedback>
      
      {/* Pressable - the most configurable option */}
      <Text style={styles.sectionTitle}>Select Dosage:</Text>
      <View style={styles.dosageContainer}>
        {['50mg', '100mg', '200mg'].map(dosage => (
          <Pressable
            key={dosage}
            style={({ pressed }) => [
              styles.dosageButton,
              { opacity: pressed ? 0.8 : 1 },
              selectedDosage === dosage && styles.selectedDosage
            ]}
            onPress={() => setSelectedDosage(dosage)}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.dosageText,
                  pressed && { color: '#0984e3' },
                  selectedDosage === dosage && styles.selectedDosageText
                ]}
              >
                {dosage}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtleButton: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subtleButtonText: {
    color: '#3498db',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  dosageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dosageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  selectedDosage: {
    backgroundColor: '#e8f5fe',
    borderColor: '#0984e3',
  },
  dosageText: {
    fontSize: 16,
  },
  selectedDosageText: {
    color: '#0984e3',
    fontWeight: 'bold',
  }
});
```

<blockquote><details>

Touch interaction is a core aspect of mobile user experience, and React Native provides several specialized components to handle different types of touch behaviors. Unlike web development where most elements can be made clickable with event listeners, React Native requires explicit touchable components to create interactive elements. This example demonstrates the main touchable components and their distinct use cases.

**TouchableOpacity** is perhaps the most commonly used touchable component due to its simple yet effective feedback mechanism. When pressed, it reduces the opacity of its child components, creating a fade effect that provides clear visual feedback without being too intrusive. The `activeOpacity` prop (ranging from 0 to 1) controls how transparent the component becomes when pressed. This component is ideal for most buttons and interactive elements where a subtle feedback is sufficient.

**TouchableHighlight** provides a more pronounced visual feedback by changing the background color when pressed. The `underlayColor` prop specifies what color appears "beneath" the component when pressed. This component is useful for actions that require more noticeable feedback, such as primary actions or destructive operations like the "Skip Dose" button in the example. It's worth noting that TouchableHighlight only works properly with a single child element.

**TouchableWithoutFeedback** provides no visual feedback by itself, making it suitable for interactions where custom feedback is implemented or when no visual indication is desired. It's often used for subtle interactions, background presses, or when you want to implement custom visual feedback. The example demonstrates both `onPress` and `onLongPress` handlers, showing how different touch durations can trigger different actions.

**Pressable** is the newest and most flexible touchable component, introduced to eventually replace the other touchable components. Its key advantage is the ability to access the pressed state directly in render props and style functions. The example shows this powerful feature by:
1. Dynamically adjusting the opacity when pressed
2. Changing text color during press
3. Maintaining selected state separately from press state

The dosage selection interface demonstrates a common pattern in mobile apps where users select from multiple options, with the selected item visually distinguished. Using Pressable's state-based styling, the component handles both temporary press states and persistent selection states.

All touchable components support a range of touch events beyond simple presses:
- `onPressIn`: Triggered when a press is activated
- `onPressOut`: Triggered when a press is deactivated
- `onLongPress`: Triggered when the press is held for a specified duration
- `delayLongPress`: Customizes the timing for long press detection

The combination of these touchable components gives React Native developers precise control over touch interactions, allowing for intuitive and responsive user interfaces. Choosing the right touchable component depends on the desired feedback style, the complexity of the interaction, and the overall design language of your application.

</details></blockquote>

---

## Introduction to Styling

React Native provides several approaches to styling components:

- **StyleSheet API**: The preferred method for performance reasons
- **Inline styles**: Simple but less performant
- **Platform-specific styles**: Customize for iOS and Android
- **Third-party solutions**: Styled-components, Emotion, etc.

```tsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

function MedicationHeader() {
  return (
    <View>
      {/* StyleSheet API approach (recommended) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Medication Tracker</Text>
      </View>
      
      {/* Inline styles approach */}
      <View style={{ 
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef'
      }}>
        <Text style={{ fontSize: 16, color: '#495057' }}>
          Inline styles example
        </Text>
      </View>
      
      {/* Mixed approach with multiple styles */}
      <View style={[styles.card, styles.elevated]}>
        <Text style={[
          styles.cardText, 
          { color: '#1e88e5' }
        ]}>
          Combined styles
        </Text>
      </View>
      
      {/* Platform-specific styles */}
      <View style={styles.platformContainer}>
        <Text style={styles.platformText}>
          Platform-adapted component
        </Text>
      </View>
    </View>
  );
}

// StyleSheet API for better performance
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4caf50',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  platformContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: Platform.OS === 'ios' ? '#f8f9fa' : '#e1f5fe',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
  },
  platformText: {
    color: Platform.OS === 'ios' ? '#212529' : '#0277bd',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontSize: 16,
  }
});
```

<blockquote><details>

React Native's approach to styling combines the flexibility of CSS with the performance needs of mobile applications. This introduction demonstrates the primary styling methodologies available in React Native, each with its own use cases and trade-offs.

The **StyleSheet API** is React Native's recommended approach for defining styles. The `StyleSheet.create()` method creates an optimized style object with several benefits:
1. **Performance optimization**: Styles are processed once when the component loads rather than on every render
2. **Validation**: The API checks for invalid style properties at compilation time
3. **Organization**: It keeps styles separated from component logic, improving readability
4. **Reusability**: Defined styles can be reused across multiple components

In the example, `styles.headerContainer` and `styles.headerText` demonstrate this approach, defining a green header with white bold text.

**Inline styles** are defined directly within the component using JavaScript objects. While convenient for quick prototyping or dynamic styles, they lack the performance optimizations of StyleSheet. The second section of the example shows inline styles defining a light gray container with darker text. This approach is acceptable for styles that need to be calculated dynamically but should be avoided for static styles.

**Combining multiple styles** is possible by providing an array of style objects to the `style` prop. React Native merges these styles from left to right, with later styles taking precedence when properties conflict. The third section demonstrates this by combining predefined styles (`styles.card` and `styles.elevated`) with an inline style modification for the text color. This pattern is particularly useful for component variants or conditional styling.

**Platform-specific styling** addresses the unique design requirements of iOS and Android. React Native provides two main approaches for platform adaptation:
1. **Platform.select()**: Returns the value from an object based on the current platform, as shown in the `elevated` style which applies either shadows (iOS) or elevation (Android)
2. **Platform.OS conditional logic**: Directly checks the platform in style definitions or component logic, as shown in the `platformContainer` and `platformText` styles

The example also demonstrates proper organization of complex component styling:
- **Component structure**: Breaking the UI into logical sections
- **Style reusability**: Defining common styles that can be shared (like `card`)
- **Separation of concerns**: Keeping platform-specific adaptations isolated
- **Style composition**: Building complex styles from simpler building blocks

It's worth noting several important aspects of React Native styling not explicitly shown:
1. React Native uses a subset of CSS properties, renamed to follow JavaScript camelCase conventions (e.g., `backgroundColor` instead of `background-color`)
2. Styles don't cascade like CSS - parent styles don't automatically apply to children
3. Dimensions are unitless and generally represent density-independent pixels
4. Percentage values work for width and height but have limitations for other properties
5. Flexbox is the primary layout mechanism and behaves similarly to web flexbox with a few differences

Understanding these styling approaches enables developers to create visually consistent, performant, and platform-appropriate interfaces in React Native.

</details></blockquote>

---

## StyleSheet API

The StyleSheet API is React Native's recommended approach for defining styles:

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MedicationListItem({ name, dosage, timing, isOverdue = false }) {
  return (
    <View style={[
      styles.container,
      isOverdue && styles.overdueContainer
    ]}>
      <View style={styles.leftColumn}>
        <View style={[
          styles.indicatorDot,
          isOverdue ? styles.overdueIndicator : styles.regularIndicator
        ]} />
      </View>
      
      <View style={styles.contentColumn}>
        <Text style={styles.medicationName}>{name}</Text>
        <Text style={styles.dosageText}>{dosage}</Text>
      </View>
      
      <View style={styles.rightColumn}>
        <Text style={[
          styles.timingText,
          isOverdue && styles.overdueText
        ]}>
          {timing}
        </Text>
      </View>
    </View>
  );
}

// Create optimized StyleSheet object
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  overdueContainer: {
    backgroundColor: '#fff8f8',
  },
  leftColumn: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentColumn: {
    flex: 1,
    paddingLeft: 10,
  },
  rightColumn: {
    width: 80,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  indicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  regularIndicator: {
    backgroundColor: '#4caf50',
  },
  overdueIndicator: {
    backgroundColor: '#ff5252',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 14,
    color: '#757575',
  },
  timingText: {
    fontSize: 14,
    color: '#757575',
  },
  overdueText: {
    color: '#ff5252',
    fontWeight: 'bold',
  },
});
```

<blockquote><details>

The StyleSheet API is the recommended approach for defining styles in React Native applications. This example demonstrates a common UI pattern—a medication list item with conditional styling based on whether a dose is overdue—while showcasing the features and best practices of the StyleSheet API.

**StyleSheet.create()** transforms a regular JavaScript object of styles into an optimized, immutable style reference. This optimization occurs during app initialization rather than on every render, improving performance. The create method also validates style properties at compile time, helping catch typos and incorrect property types early.

The example demonstrates several **StyleSheet best practices**:

1. **Logical organization**: Styles are grouped by component section (container, columns, text elements) making them easier to find and maintain.

2. **Semantic naming**: Style names like `overdueContainer` and `medicationName` clearly communicate their purpose rather than using generic names like "redBox" or "largeText".

3. **Style composition**: The component combines multiple style objects using arrays. For instance, `[styles.container, isOverdue && styles.overdueContainer]` applies the base container style to all items, then conditionally adds the overdue styling. The second expression uses short-circuit evaluation—if `isOverdue` is false, it evaluates to false and is ignored in the array.

4. **Conditional styling**: The component uses the same pattern in several places to apply different styles based on the `isOverdue` prop. This creates visual indicators (red dot, background color, text color) that communicate the overdue status.

5. **Separation of concerns**: All styles are defined outside the component, keeping the render function focused on structure and logic rather than appearance details.

The layout uses **flexbox patterns** that are common in React Native:

1. `flexDirection: 'row'` arranges the columns horizontally
2. `flex: 1` allows the content column to expand and fill available space
3. Fixed widths (`width: 20` and `width: 80`) constrain the side columns
4. `alignItems` and `justifyContent` position content within each column

Beyond what's visible in the example, the StyleSheet API offers additional benefits:

1. **Code completion**: IDEs can provide better autocomplete for StyleSheet properties
2. **Error prevention**: Invalid style properties are reported as errors
3. **Performance**: React Native can optimize rendering with statically defined styles
4. **Maintainability**: Centralized style definitions make design changes easier to implement
5. **Dead code elimination**: Unused styles can be identified and removed

While inline styles and other styling approaches have their place in React Native development, the StyleSheet API should be the default choice for most styling needs. It combines the flexibility of CSS-like styling with optimizations specific to React Native's architecture, resulting in more performant and maintainable code.

</details></blockquote>

---

## Flexbox in React Native

React Native uses Flexbox for layout, with some differences from web CSS:

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FlexboxExamples() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Basic Row Layout</Text>
      <View style={styles.rowContainer}>
        <View style={[styles.box, styles.redBox]} />
        <View style={[styles.box, styles.greenBox]} />
        <View style={[styles.box, styles.blueBox]} />
      </View>
      
      <Text style={styles.sectionTitle}>Flex Grow (flex: 1, 2, 1)</Text>
      <View style={styles.rowContainer}>
        <View style={[styles.flexBox, styles.redBox, { flex: 1 }]} />
        <View style={[styles.flexBox, styles.greenBox, { flex: 2 }]} />
        <View style={[styles.flexBox, styles.blueBox, { flex: 1 }]} />
      </View>
      
      <Text style={styles.sectionTitle}>Justify Content</Text>
      <View style={[styles.rowContainer, { justifyContent: 'space-between' }]}>
        <View style={[styles.smallBox, styles.redBox]} />
        <View style={[styles.smallBox, styles.greenBox]} />
        <View style={[styles.smallBox, styles.blueBox]} />
      </View>
      
      <Text style={styles.sectionTitle}>Align Items</Text>
      <View style={[styles.rowContainer, { height: 100, alignItems: 'flex-end' }]}>
        <View style={[styles.smallBox, styles.redBox]} />
        <View style={[styles.smallBox, styles.greenBox, { height: 60 }]} />
        <View style={[styles.smallBox, styles.blueBox]} />
      </View>
      
      <Text style={styles.sectionTitle}>Nested Flex Layout</Text>
      <View style={styles.nestedContainer}>
        <View style={styles.leftPanel}>
          <View style={[styles.innerBox, styles.redBox]} />
          <View style={[styles.innerBox, styles.greenBox]} />
        </View>
        <View style={styles.rightPanel}>
          <View style={[styles.innerBox, styles.blueBox, { flex: 1 }]} />
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Absolute Positioning</Text>
      <View style={styles.positionContainer}>
        <View style={[styles.absoluteBox, styles.redBox, styles.topLeft]} />
        <View style={[styles.absoluteBox, styles.greenBox, styles.center]} />
        <View style={[styles.absoluteBox, styles.blueBox, styles.bottomRight]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 5,
  },
  box: {
    width: 50,
    height: 50,
    margin: 5,
  },
  flexBox: {
    height: 50,
    margin: 5,
  },
  smallBox: {
    width: 40,
    height: 40,
    margin: 5,
  },
  redBox: {
    backgroundColor: '#f44336',
  },
  greenBox: {
    backgroundColor: '#4caf50',
  },
  blueBox: {
    backgroundColor: '#2196f3',
  },
  nestedContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 5,
    height: 120,
  },
  leftPanel: {
    flex: 1,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  rightPanel: {
    flex: 1,
    marginLeft: 5,
  },
  innerBox: {
    height: 50,
  },
  positionContainer: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    position: 'relative',
  },
  absoluteBox: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  topLeft: {
    top: 10,
    left: 10,
  },
  center: {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
});
```

<blockquote><details>

Flexbox is the primary layout system in React Native, providing a powerful way to create flexible, responsive layouts across different screen sizes. While React Native's implementation of Flexbox is largely similar to the web standard, there are important differences and default behaviors that developers need to understand.

This comprehensive example demonstrates the key concepts of Flexbox in React Native through a series of visual layout patterns:

**Basic Row Layout** shows the fundamental building block of Flexbox - arranging items in a row. By default, React Native sets `flexDirection: 'column'` (unlike web CSS which defaults to row), but here we override it with `flexDirection: 'row'` to place the colored boxes horizontally. The fixed-width boxes appear in sequence as defined.

**Flex Grow** demonstrates how the `flex` property allows components to grow proportionally to fill available space. With values of 1, 2, and 1 respectively, the green box takes twice as much space as the red and blue boxes. This is particularly useful for creating responsive layouts that adapt to different screen sizes. In React Native, `flex: 1` is commonly used to make a component expand to fill its container.

**Justify Content** controls how items are spaced along the primary axis (horizontal in this case). The example uses `justifyContent: 'space-between'`, which places items with maximum spacing between them. Other options include `'flex-start'` (default), `'flex-end'`, `'center'`, `'space-around'`, and `'space-evenly'`, each offering different distribution patterns.

**Align Items** controls positioning along the cross axis (vertical in this row example). Setting `alignItems: 'flex-end'` aligns the boxes at the bottom of the container, while the middle box has a custom height to demonstrate the alignment effect. Other options include `'flex-start'`, `'center'`, `'stretch'` (default), and `'baseline'`.

**Nested Flex Layout** shows how flexbox containers can be nested to create complex layouts. The container divides into left and right panels (each with `flex: 1`), and then the left panel uses `justifyContent: 'space-between'` to place boxes at the top and bottom, while the right panel's blue box uses `flex: 1` to fill the available height.

**Absolute Positioning** demonstrates how items can break out of the flexbox flow with `position: 'absolute'`. This allows precise placement using `top`, `right`, `bottom`, and `left` properties. The example places boxes in the top-left corner, center (using all four position properties), and bottom-right corner of the container.

Key differences from web CSS Flexbox include:

1. **Default values** - React Native defaults to `flexDirection: 'column'` rather than `'row'`
2. **Flex simplification** - The `flex` property is most commonly used, while `flex-basis`, `flex-grow`, and `flex-shrink` are less frequently used
3. **All dimensions are unitless** - No px, em, % units needed
4. **No flex-wrap by default** - React Native defaults to `flexWrap: 'nowrap'`
5. **Limited styling inheritance** - Child elements don't inherit styles from parents

Understanding these Flexbox concepts is essential for React Native development, as they form the foundation of virtually all layout work. With these patterns, developers can create interfaces that adapt gracefully to the wide variety of screen sizes encountered in mobile development.

</details></blockquote>


