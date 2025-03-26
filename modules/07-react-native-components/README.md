# Module 7: React Native UI and Styling

<style>
.note {
  background-color: coral;
  padding: 0.5em 1em;
  margin: 1em 0;
}

.warning {
  background-color: darkgoldenrod;
  padding: 0.5em 1em;
  margin: 1em 0;
}

.platform-specific {
  background-color: darkcyan;
  padding: 0.5em 1em;
  margin: 1em 0;
}

.exercise {
  font-size: 16px;
  padding: 0.5em 1em;
  margin: 1em 0;
}

.challenge {
  font-size: 16px;
  padding: 0.5em 1em;
  margin: 1em 0;
}

.instructor-led {
  background-color: aquamarine;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0;
}

.self-led {
  background-color: cornflowerblue;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0;
}

.asynchronous {
  background-color: royalblue;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0; 
}


.android-dev {
  background-color: green;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0;
}

.ios-dev {
  background-color: black;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0;
}

.react-dev {
  background-color: cadetblue;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0;
}

.angular-dev {
  background-color: darkred;
  border-radius: 3px;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin: 1em 0;
}
</style>

--

## Learning Paths

This Module is recommended for all learning paths.

<div class="instructor-led">Instructor-led content</div>
<div class="self-led">Self-led content</div>
<div class="asynchronous">Asynchronous learning</div>

--

## Development Backgrounds

This Module is recommended for all development backgrounds.

<div class="android-dev">🤖 Android Developers</div>
<div class="ios-dev">🍏 iOS Developers</div>
<div class="angular-dev">𝐀 Angular Developers</div>
<div class="react-dev">⚛ React Developers</div>

---

## Overview

In this module, we'll explore how to create visually appealing and responsive user interfaces in React Native using various styling techniques and UI components.

> 🎨 This module covers both the foundational styling mechanisms in React Native like StyleSheet and more advanced approaches like styled-components.

--

<div class="android-dev">🤖 Android Developers</div>
<div class="ios-dev">🍏 iOS Developers</div>

Native mobile developers will learn how React Native's declarative approach differs from imperative UI programming.

> 📲 Unlike traditional mobile development where UI is defined separately for each platform, React Native allows developers to create a unified UI codebase while still respecting platform-specific behaviors and aesthetics.

--

<div class="angular-dev">𝐀 Angular Developers</div>
<div class="react-dev">⚛ React Developers</div>

Web developers will see similarities to CSS but with mobile-specific adaptations

> 🎨 While React Native styling is based on CSS, it has important differences that mobile developers need to master. The styling system is implemented in JavaScript and uses a subset of CSS properties with some mobile-specific additions.

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

> 🚨 Before diving into React Native UI and styling, certain foundational knowledge is necessary to ensure you can effectively apply the concepts presented in this module.

<blockquote><details>

A **basic understanding of React components** is essential, as React Native builds directly on React's component model. You should be comfortable with concepts like props, state, and component lifecycle. The previous module on React Essentials covers these topics in detail, making it an important prerequisite.

**Familiarity with CSS concepts** provides helpful context, as React Native's styling system is inspired by CSS. Understanding properties like margin, padding, color, and flexbox will make the transition to React Native styling more intuitive. However, it's important to note that React Native implements only a subset of CSS, with some properties renamed and others omitted entirely.

**TypeScript fundamentals** become increasingly important when defining prop types for UI components and creating type-safe styles. TypeScript helps catch styling errors at compile time rather than runtime, which is particularly valuable when working with dynamic styles that depend on props or state.

This module builds directly on the foundation established in Module 6: React Essentials, extending those concepts to mobile-specific UI development. While participants can be successful with varying levels of prerequisite knowledge, a solid understanding of these fundamentals will ensure a smoother learning experience.

</details></blockquote>

--

<div class="android-dev">
<strong>Android developers</strong> will recognize similarities to Android's layout systems (particularly ConstraintLayout and LinearLayout), but should focus on adapting to React Native's declarative approach instead of the imperative style common in native Android development. The component reuse patterns and styling approaches differ significantly from traditional Android development.
</div>

<div class="ios-dev">
<strong>iOS developers</strong> will see familiar concepts mapped from UIKit components but implemented through React Native's cross-platform abstractions. Understanding how React Native components translate to native UIKit elements helps leverage existing iOS knowledge while adapting to the React Native paradigm.
</div>

<div class="react-dev">
<strong>Web developers</strong> have an advantage with CSS knowledge but need to pay careful attention to mobile-specific concerns such as touch interactions, screen size variations, and platform-specific UI conventions. The absence of certain CSS features (like cascading) and the addition of mobile-specific properties represent important differences from web styling.
</div>

---

## Introduction to React Native UI

React Native provides a set of built-in UI components that render to native platform UI elements, offering better performance than WebView-based solutions.

> 📢 React Native represents a paradigm shift in mobile development by enabling developers to build mobile applications using React's component-based architecture while rendering to truly native UI elements.

--

### Key Takeaways

- Core components map to native UI controls
- Cross-platform consistency with platform-specific adaptations
- Declarative UI instead of imperative manipulation
- Component-based architecture for reusability

> 📲 At the heart of React Native's UI system is a set of built-in components that map directly to platform-specific native UI controls. When you use a `<Text>` component in React Native, it renders as a `UILabel` on iOS and a `TextView` on Android.

<blockquote><details>

React Native strikes a balance between cross-platform consistency and platform-specific authenticity. While the same component API works across platforms, React Native respects platform conventions by adapting certain behaviors and appearances automatically. For example, a `<Button>` component will look and behave differently on iOS and Android without requiring developer intervention, matching user expectations on each platform.

React Native's component-based architecture encourages reusability and separation of concerns. UI elements are broken down into components that can be composed to create complex interfaces. This modularity makes code easier to understand, test, and maintain, especially as applications grow in complexity.

Understanding these foundational concepts is crucial for effectively working with React Native UI. The mental model differs significantly from both web development and traditional native development, though it borrows concepts from both. Embracing this component-oriented, declarative approach enables developers to create sophisticated mobile interfaces with less code and fewer platform-specific adaptations.

</details></blockquote>

--

<div class="android-dev">🤖 Android Developers</div>
<div class="ios-dev">🍏 iOS Developers</div>

The declarative nature of React Native UI is a fundamental shift for developers accustomed to imperative UI programming in traditional native development. Instead of directly manipulating UI elements (like `view.setBackgroundColor(red)`), React Native developers describe what the UI should look like for a given state, and the framework handles the updates when state changes. This declarative approach leads to more predictable code with fewer UI-related bugs.

---

## Section 1: Core Components

React Native provides several essential built-in components for building UIs

--

### React Native Core Components
<div style="font-size: 0.7em;">

| Web                | React Native       | Android               | iOS                   |
|--------------------|--------------------|----------------------|------------------------|
| `<div>`            | `<View>`           | `ViewGroup`          | `UIView`              |
| `<span>`, `<p>`    | `<Text>`           | `TextView`           | `UILabel`             |
| `<img>`            | `<Image>`          | `ImageView`          | `UIImageView`         |
| `<input>`, `<button>` | `<TextInput>`, `<Button>` | `EditText`, `Button` | `UITextField`, `UIButton` |
| `<ul>`, `<ol>`, `<li>` | `<FlatList>`, `<SectionList>` | `RecyclerView` | `UITableView` |
| `<a>`              | `<Pressable>`, `<TouchableOpacity>` | `View` with click listener | `UIControl` |
| `<div class="scrollable">` | `<ScrollView>` | `ScrollView`      | `UIScrollView`       |

</div>

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

### View Component

The `<View>` component is the fundamental building block of UI in React Native.

--

#### Key Takeaways

- React Native's primary container element
- Similar to a `<div>` in web development
- Translated to platform-specific native UI elements:
  - `UIView` on iOS and `android.view` on Android
- Used to build layouts, group content, and apply styles
- Supports Flexbox, touch handling, and accessibility controls
- Can be nested to create complex hierarchies
- Foundation of most React Native layouts

<blockquote><details>

Views by themselves don't render any visible content unless styled with background colors or borders. They're invisible containers by default, focusing on layout and structure rather than presentation. This is different from web divs which might have browser-specific default styling.

One important distinction from web development is that Views don't have scrolling capabilities by default. If content might exceed the available space, you'll need to wrap Views in a ScrollView or use a list component like FlatList.

Views also don't directly display text content - all text must be wrapped in Text components, even if the View has other styling applied. This strict separation is part of React Native's optimization strategy and reflects how native UI elements work.

Like all React Native components, Views are translated to platform-specific native UI elements: `UIView` on iOS and `android.view` on Android. This ensures optimal performance while maintaining a consistent developer experience across platforms.

</details></blockquote>

--

#### Code Example

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

In the provided example, we see a `MedicationCard` component that uses nested Views to create a structured card layout with a header, content area (with two columns), and footer. This hierarchical structure demonstrates how Views are used to organize the visual elements of an interface.

The nested structure of Views in this example demonstrates React Native's compositional approach to building interfaces, allowing complex UI to be broken down into manageable, reusable pieces.

</details></blockquote>

--

The example illustrates several important styling capabilities:

1. **Shape and appearance**: The outer card View has rounded corners (`borderRadius`), background color, and shadow effects.

2. **Borders**: The header and footer Views use border properties to create separator lines.

3. **Layout**: The content View uses `flexDirection: 'row'` to arrange its children horizontally instead of the default vertical stacking.

4. **Spacing**: Various padding and margin properties create appropriate spacing between elements.

5. **Platform-specific styling**: Notice the use of both `shadowProperties` (for iOS) and `elevation` (for Android) to create consistent card shadowing across platforms.

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

--

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

---

## Responsive Design

Make your React Native UI adapt to different screen sizes and orientations:

```tsx
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Dimensions, 
  ScrollView, useWindowDimensions, 
  Platform, PixelRatio 
} from 'react-native';

// Get the screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base on a design for 375pt width screen (iPhone X)
const baseWidth = 375;

// Scale factor
const scale = SCREEN_WIDTH / baseWidth;

// Function to normalize font sizes
const normalize = (size) => {
  const newSize = size * scale;
  // Pixel ratio is different on iOS and Android
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

function ResponsiveDesignExample() {
  // Use hook for dimensions (responds to orientation changes)
  const window = useWindowDimensions();
  
  // Calculate dynamic grid columns based on screen width
  const numColumns = Math.max(1, Math.floor(window.width / 150));
  
  // Track orientation changes
  const [isLandscape, setIsLandscape] = useState(window.width > window.height);
  
  useEffect(() => {
    setIsLandscape(window.width > window.height);
  }, [window.width, window.height]);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Responsive Design Example</Text>
      
      <Text style={styles.sectionTitle}>Screen Information</Text>
      <View style={styles.infoContainer}>
        <Text>Width: {window.width}pt</Text>
        <Text>Height: {window.height}pt</Text>
        <Text>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</Text>
        <Text>Pixel Ratio: {PixelRatio.get()}</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Responsive Typography</Text>
      <View style={styles.typographyContainer}>
        <Text style={styles.largeText}>Large Text ({normalize(24)}pt)</Text>
        <Text style={styles.mediumText}>Medium Text ({normalize(16)}pt)</Text>
        <Text style={styles.smallText}>Small Text ({normalize(12)}pt)</Text>
      </View>
      
      <Text style={styles.sectionTitle}>
        Responsive Grid ({numColumns} columns)
      </Text>
      <View style={[
        styles.gridContainer,
        isLandscape && styles.landscapeGrid
      ]}>
        {Array(6).fill(0).map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.gridItem,
              { width: `${100 / numColumns - 4}%` }
            ]}
          >
            <Text style={styles.gridItemText}>Item {i + 1}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Adaptive Layout</Text>
      <View style={[
        styles.adaptiveContainer,
        isLandscape && styles.adaptiveLandscape
      ]}>
        <View style={[
          styles.adaptiveSection,
          isLandscape && styles.adaptiveSectionLandscape
        ]}>
          <Text style={styles.adaptiveTitle}>Section 1</Text>
          <Text>This section adapts to orientation changes</Text>
        </View>
        <View style={[
          styles.adaptiveSection,
          isLandscape && styles.adaptiveSectionLandscape
        ]}>
          <Text style={styles.adaptiveTitle}>Section 2</Text>
          <Text>Layout changes based on available space</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
  },
  typographyContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
  },
  largeText: {
    fontSize: normalize(24),
    marginBottom: 10,
  },
  mediumText: {
    fontSize: normalize(16),
    marginBottom: 10,
  },
  smallText: {
    fontSize: normalize(12),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  landscapeGrid: {
    marginHorizontal: -10,
  },
  gridItem: {
    backgroundColor: '#e1f5fe',
    borderRadius: 5,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  gridItemText: {
    fontWeight: '500',
  },
  adaptiveContainer: {
    flexDirection: 'column',
  },
  adaptiveLandscape: {
    flexDirection: 'row',
  },
  adaptiveSection: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  adaptiveSectionLandscape: {
    marginHorizontal: 5,
    marginBottom: 0,
  },
  adaptiveTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
```

<blockquote><details>

Responsive design in React Native ensures your application looks and functions well across a wide variety of devices, screen sizes, and orientations. This example demonstrates several essential techniques for creating responsive UIs in React Native applications.

**Dynamic Dimension Tracking** is demonstrated through two approaches:
1. The static `Dimensions.get('window')` API provides an initial screen size at app launch
2. The `useWindowDimensions()` hook offers real-time updates when dimensions change (e.g., during rotation)

The latter is preferred for components that need to respond to orientation changes, as shown in this example where the layout adapts when the device rotates.

**Font Scaling** is handled through the `normalize()` function, which scales font sizes proportionally based on screen width while accounting for platform-specific pixel density differences. This technique ensures text remains readable across devices with different screen sizes and resolutions. The example standardizes design around a 375pt base width (common for iPhone designs) and adjusts sizes proportionally.

**Pixel Ratio Handling** accounts for the different pixel densities across devices. The `PixelRatio` API helps convert between device-independent points (used in React Native) and physical pixels. The example shows slightly different handling for iOS and Android, acknowledging the platform differences in how text renders.

**Responsive Grids** adapt the number of columns based on available width. By calculating `numColumns` dynamically based on screen width, the grid maintains appropriately sized items regardless of device orientation or size. Each item also uses percentage-based widths to fill the available space proportionally.

**Adaptive Layouts** change their structure based on orientation. When in portrait mode, sections stack vertically; in landscape, they display side by side. This pattern is implemented by:
1. Tracking orientation with the `isLandscape` state
2. Applying different style objects conditionally based on this state
3. Using flexbox direction (`column` vs `row`) to change the layout flow

**Orientation Detection** is handled by comparing width and height values and updating when they change:
```javascript
const [isLandscape, setIsLandscape] = useState(window.width > window.height);
  
useEffect(() => {
  setIsLandscape(window.width > window.height);
}, [window.width, window.height]);
```

This approach is more reliable than platform-specific orientation APIs, as it directly responds to the actual dimensions available to your application.

The example also demonstrates several best practices for responsive design:
1. **Avoiding fixed dimensions** where possible, using flex, percentages, and proportional sizing instead
2. **Using aspect ratios** to maintain consistent proportions (for the grid items)
3. **Flexible margin and padding** that adapts to different screen sizes
4. **Platform-specific adjustments** to account for rendering differences
5. **Scrollable containers** to handle content that might not fit on smaller screens

These techniques collectively ensure that applications maintain visual consistency and usability across the wide range of devices that React Native supports, from small phones to tablets and even foldable devices with dynamic screen sizes.

</details></blockquote>

---

## Platform-Specific Styling

Customize your UI for different platforms:

```tsx
import React from 'react';
import { 
  View, Text, StyleSheet, Platform, 
  TouchableOpacity, TouchableNativeFeedback 
} from 'react-native';

// Platform-specific component
const TouchableFeedback = Platform.select({
  ios: props => <TouchableOpacity {...props} />,
  android: props => <TouchableNativeFeedback {...props} />
});

function MedicationButton({ title, onPress }) {
  // Platform specific component rendering
  return Platform.OS === 'ios' ? (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#d4d4d4', false)}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function PlatformStyleExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Platform-Specific Styling</Text>
      
      {/* Platform-specific values */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Using Platform-Specific Values</Text>
        <Text style={styles.platformText}>
          This text uses platform-specific font family and size
        </Text>
      </View>
      
      {/* Platform.select for styles */}
      <View style={styles.platformCard}>
        <Text style={styles.cardTitle}>Using Platform.select</Text>
        <Text>
          This card has platform-optimized styling for shadows and elevation
        </Text>
      </View>
      
      {/* Platform-specific components */}
      <Text style={styles.sectionTitle}>Platform-Specific Buttons:</Text>
      
      <MedicationButton 
        title="Take Medication"
        onPress={() => console.log('Button pressed')}
      />
      
      {/* Generic touchable with platform adaptation */}
      <Text style={styles.sectionTitle}>Using TouchableFeedback:</Text>
      <TouchableFeedback onPress={() => console.log('Touchable pressed')}>
        <View style={styles.genericButton}>
          <Text style={styles.buttonText}>Record Symptoms</Text>
        </View>
      </TouchableFeedback>
      
      {/* Platform-specific file extension */}
      <Text style={styles.note}>
        Note: You can also create platform-specific files with
        .ios.js and .android.js extensions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  platformCard: {
    backgroundColor: Platform.OS === 'ios' ? '#f8f8f8' : '#e8f5e9',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Platform.OS === 'ios' ? '#007aff' : '#1976d2',
  },
  platformText: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    lineHeight: Platform.OS === 'ios' ? 22 : 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Platform.OS === 'ios' ? '#007aff' : '#1976d2',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  genericButton: {
    backgroundColor: Platform.OS === 'ios' ? '#34c759' : '#43a047',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
  },
  note: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
});
```

<blockquote><details>

Platform-specific styling is a crucial aspect of creating native-feeling applications in React Native. While the framework's philosophy is "learn once, write anywhere," respecting platform conventions leads to better user experiences. This example demonstrates several techniques for implementing platform-specific adaptations while maintaining a clean, maintainable codebase.

**Platform Module** is React Native's primary tool for platform-specific code. The example showcases three key methods:

1. **Platform.OS** provides a simple conditional check to apply different styles or render different components based on platform. The `cardTitle` style uses this approach to apply iOS blue vs. Android blue material colors, while the `MedicationButton` component uses it to render completely different touchable implementations.

2. **Platform.select()** offers a more concise syntax for platform-specific values, returning the value for the current platform from an object. This method is used for the `platformText` style to apply appropriate font families (System for iOS, Roboto for Android) and in the `card` style to implement platform-appropriate shadow effects (shadowProperties for iOS vs. elevation for Android).

3. **Platform-specific components** can be created by wrapping platform-specific implementations in a unified interface. The `TouchableFeedback` component demonstrates this pattern, selecting either `TouchableOpacity` (iOS) or `TouchableNativeFeedback` (Android) to provide platform-appropriate touch feedback while maintaining a consistent API.

**Platform-Specific Design Patterns** are applied throughout the example:

1. **Visual styling** follows platform conventions with rounded corners (more pronounced on iOS), appropriate color schemes, and native shadow implementations.

2. **Touch feedback** differs between platforms - iOS uses opacity changes while Android uses the material design ripple effect, each providing the tactile feedback users expect on their platform.

3. **Typography** adaptations include platform-specific font families, sizes, and line heights to match each platform's text rendering characteristics.

4. **Visual hierarchy** is maintained across platforms while respecting platform-specific aesthetics - notice how both platforms use blue for primary actions but with platform-appropriate hues.

The example also references **platform-specific file extensions** (.ios.js and .android.js), another powerful approach not explicitly demonstrated in the code. This technique allows you to maintain separate implementations for each platform while importing them with the same path, letting React Native automatically select the appropriate version.

These platform-specific adaptations enhance the native feel of applications without sacrificing the productivity benefits of cross-platform development. Users expect applications to follow platform conventions, and these techniques allow you to meet those expectations while sharing the majority of your codebase across platforms.

When implementing platform-specific styling, consider these best practices:

1. Use platform-specific adaptations for visual elements and interactions, not core business logic
2. Apply platform conventions judiciously - focus on established patterns users will notice
3. Consider extracting platform-specific code into separate files for complex differences
4. Test thoroughly on both platforms to ensure appropriate behavior and appearance
5. Use design systems that account for platform differences while maintaining brand consistency

By thoughtfully applying these platform-specific styling techniques, you can create applications that feel at home on both iOS and Android while maximizing code reuse between platforms.

</details></blockquote>

---

## Dimensions and Responsive Units

Understanding screen dimensions and how to work with responsive units:

```tsx
import React from 'react';
import { 
  View, Text, StyleSheet, 
  Dimensions, PixelRatio, 
  SafeAreaView, ScrollView
} from 'react-native';

// Get screen dimensions
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

// Calculate pixel ratio
const pixelRatio = PixelRatio.get();

// Function to convert dp to px
const dpToPx = (dp: number) => PixelRatio.getPixelSizeForLayoutSize(dp);

// Function to convert px to dp
const pxToDp = (px: number) => PixelRatio.roundToNearestPixel(px);

// Responsive width and height percentages
const widthPercentage = (percentage: number) => {
  return windowDimensions.width * (percentage / 100);
};

const heightPercentage = (percentage: number) => {
  return windowDimensions.height * (percentage / 100);
};

function DimensionsExample() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Understanding Dimensions</Text>
        
        {/* Screen Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Device Information</Text>
          <Text>Window Width: {windowDimensions.width}dp</Text>
          <Text>Window Height: {windowDimensions.height}dp</Text>
          <Text>Screen Width: {screenDimensions.width}dp</Text>
          <Text>Screen Height: {screenDimensions.height}dp</Text>
          <Text>Pixel Ratio: {pixelRatio}</Text>
          <Text>1dp = {pixelRatio}px on this device</Text>
        </View>
        
        {/* Responsive Units Demo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Responsive Units</Text>
          
          <View style={styles.demoRow}>
            <View style={styles.demoItem}>
              <Text style={styles.demoLabel}>100dp Width</Text>
              <View style={[styles.box, {width: 100}]} />
              <Text>= {dpToPx(100)}px</Text>
            </View>
            
            <View style={styles.demoItem}>
              <Text style={styles.demoLabel}>25% Width</Text>
              <View style={[styles.box, {width: widthPercentage(25)}]} />
              <Text>= {widthPercentage(25).toFixed(1)}dp</Text>
            </View>
          </View>
        </View>
        
        {/* Responsive Examples */}
        <Text style={styles.title}>Responsive Layout Examples</Text>
        
        {/* Fixed vs Responsive */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cardTitle}>Fixed</Text>
            <View style={styles.fixedBox}>
              <Text style={styles.boxText}>200dp</Text>
            </View>
          </View>
          
          <View style={styles.column}>
            <Text style={styles.cardTitle}>Responsive</Text>
            <View style={styles.responsiveBox}>
              <Text style={styles.boxText}>50%</Text>
            </View>
          </View>
        </View>
        
        {/* Medication List Example */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medication List (Responsive)</Text>
          
          {['Amoxicillin', 'Lisinopril', 'Metformin'].map((med, index) => (
            <View key={index} style={styles.medicationItem}>
              <View style={styles.medIconContainer}>
                <Text style={styles.medIcon}>💊</Text>
              </View>
              <View style={styles.medDetails}>
                <Text style={styles.medName}>{med}</Text>
                <Text style={styles.medInfo}>Take 1 tablet daily</Text>
              </View>
              <View style={[
                styles.dosageIndicator,
                {width: widthPercentage(15)}
              ]}>
                <Text style={styles.dosageText}>10mg</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3498db',
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  demoItem: {
    alignItems: 'center',
  },
  demoLabel: {
    marginBottom: 8,
  },
  box: {
    height: 50,
    backgroundColor: '#3498db',
    marginVertical: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  fixedBox: {
    width: 200,
    height: 100,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  responsiveBox: {
    width: widthPercentage(50),
    height: 100,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  medIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medIcon: {
    fontSize: 20,
  },
  medDetails: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
  },
  medInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  dosageIndicator: {
    backgroundColor: '#f0f8ff',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
  },
  dosageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3498db',
  },
});
```

<blockquote><details>

Dimensions and responsive units are fundamental concepts in React Native development that enable applications to adapt gracefully to various device sizes and orientations. Unlike web development where CSS units like pixels, percentages, and viewport units are common, React Native uses a platform-agnostic approach with density-independent pixels (dp in Android, points in iOS) as its primary unit.

The `Dimensions` API provides access to screen and window metrics, offering crucial information for responsive layouts. The distinction between `window` and `screen` dimensions is significant on some devices:
- `window` dimensions represent the app's visible area (excluding system UI elements like status bars or navigation bars)
- `screen` dimensions represent the entire physical screen size

This example demonstrates how to access these values through `Dimensions.get('window')` and `Dimensions.get('screen')`. For most UI calculations, window dimensions are preferred as they represent the actual space available to your application.

Pixel ratio, accessed via `PixelRatio.get()`, represents the relationship between physical pixels and logical pixels (dp/points). For example, a device with a pixel ratio of 3 will have 3 physical pixels for every 1 logical pixel. This abstraction allows developers to work with a consistent coordinate system across devices with vastly different pixel densities.

The example demonstrates two utility functions for working with pixel ratios:
1. `dpToPx` converts density-independent pixels to physical pixels
2. `pxToDp` converts physical pixels to density-independent pixels

These conversions are occasionally needed when interfacing with APIs that work with physical pixels or when implementing precise visual designs.

For responsive layouts, the example implements percentage-based sizing through the `widthPercentage` and `heightPercentage` helper functions. These calculate dimensions as a percentage of the screen width or height, similar to CSS percentage units. This approach ensures elements scale proportionally across different screen sizes.

The "Fixed vs Responsive" comparison demonstrates a key advantage of responsive units. The fixed box remains 200dp wide regardless of screen size, which may be too large on small devices or too small on tablets. In contrast, the responsive box uses 50% of the screen width, ensuring it maintains an appropriate size proportion across all devices.

The medication list showcases a practical application of responsive design principles. The list items use a flexible layout with:
- Fixed-size elements for the medication icon (40dp × 40dp)
- Flexible text area that expands to fill available space (`flex: 1`)
- Responsive dosage indicator that uses a percentage of screen width for consistent visual balance

This component structure enables the UI to adapt to different screen widths while maintaining both readability and visual hierarchy. The approach combines fixed dimensions where appropriate (icon size) with flexible layouts (expandable text area) and proportional sizing (percentage-based dosage indicator width).

When implementing responsive layouts in React Native, consider these best practices:
1. Use flexbox for layouts that need to adapt to available space
2. Apply percentage-based dimensions for elements that should scale with screen size
3. Maintain fixed dimensions for elements where size consistency is important (like touch targets)
4. Account for different aspect ratios, not just screen sizes
5. Test on multiple device sizes to verify responsive behavior

By thoughtfully applying these dimensions and responsive units, your applications can deliver consistent user experiences across the diverse range of devices in the mobile ecosystem.

</details></blockquote>

---

## Styled Components in React Native

Using styled-components for more maintainable styling:

```tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// Basic styled components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

// Styled component with props
const Button = styled.TouchableOpacity<{ primary?: boolean }>`
  background-color: ${props => props.primary ? '#3498db' : '#95a5a6'};
  padding: 12px 16px;
  border-radius: 6px;
  align-items: center;
  margin-vertical: 8px;
`;

const ButtonText = styled.Text<{ primary?: boolean }>`
  color: white;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  font-size: 16px;
`;

// Extended component
const PrimaryButton = styled(Button).attrs({ primary: true })`
  margin-top: 16px;
`;

// Component with multiple variations
interface PillProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
}

const Pill = styled.View<PillProps>`
  border-radius: 20px;
  padding: 6px 12px;
  margin-right: 8px;
  background-color: ${props => {
    switch(props.variant) {
      case 'success': return '#2ecc71';
      case 'warning': return '#f1c40f';
      case 'danger': return '#e74c3c';
      case 'info':
      default: return '#3498db';
    }
  }};
`;

const PillText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

// Medication list item with styled-components
const MedicationItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const MedicationIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f8ff;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const MedicationIconText = styled.Text`
  font-size: 20px;
`;

const MedicationDetails = styled.View`
  flex: 1;
`;

const MedicationName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const MedicationDosage = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const PillRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

function StyledComponentsExample() {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Pharmacy App</Title>
        
        <Card>
          <Title style={{ fontSize: 18, marginBottom: 8 }}>My Medications</Title>
          
          <MedicationItem>
            <MedicationIcon>
              <MedicationIconText>💊</MedicationIconText>
            </MedicationIcon>
            <MedicationDetails>
              <MedicationName>Amoxicillin</MedicationName>
              <MedicationDosage>Take 1 tablet three times daily</MedicationDosage>
              <PillRow>
                <Pill variant="info">
                  <PillText>Antibiotic</PillText>
                </Pill>
                <Pill variant="warning">
                  <PillText>With food</PillText>
                </Pill>
              </PillRow>
            </MedicationDetails>
          </MedicationItem>
          
          <MedicationItem>
            <MedicationIcon>
              <MedicationIconText>💊</MedicationIconText>
            </MedicationIcon>
            <MedicationDetails>
              <MedicationName>Lisinopril</MedicationName>
              <MedicationDosage>Take 1 tablet daily in the morning</MedicationDosage>
              <PillRow>
                <Pill variant="danger">
                  <PillText>Blood Pressure</PillText>
                </Pill>
              </PillRow>
            </MedicationDetails>
          </MedicationItem>
          
          <Button primary onPress={() => console.log('Add medication')}>
            <ButtonText primary>Add Medication</ButtonText>
          </Button>
        </Card>
        
        <Card>
          <Title style={{ fontSize: 18, marginBottom: 8 }}>Actions</Title>
          <Button primary onPress={() => console.log('Refill prescriptions')}>
            <ButtonText primary>Refill Prescriptions</ButtonText>
          </Button>
          <Button onPress={() => console.log('Set reminders')}>
            <ButtonText>Set Medication Reminders</ButtonText>
          </Button>
          <Button onPress={() => console.log('Contact pharmacy')}>
            <ButtonText>Contact Pharmacy</ButtonText>
          </Button>
        </Card>
        
        <PrimaryButton onPress={() => console.log('Emergency')}>
          <ButtonText primary>Emergency Contact</ButtonText>
        </PrimaryButton>
      </ScrollView>
    </Container>
  );
}

export default StyledComponentsExample;
```

<blockquote><details>

Styled Components offers a powerful alternative to React Native's built-in StyleSheet API by bringing CSS-in-JS styling to mobile development. This library enables developers to create component-specific styles with the full power of JavaScript, resulting in more maintainable and reusable UI code. The example demonstrates how styled-components can enhance the styling experience in React Native applications using a pharmacy app interface.

The fundamental concept of styled-components is the creation of styled UI elements that encapsulate their appearance and behavior. The example begins by defining basic building blocks like `Container`, `Title`, and `Card` - each combining a React Native component with its associated styles. This approach creates a clear connection between components and their styles, eliminating the need to manually match style objects with components as in the traditional StyleSheet approach.

One of the most powerful features demonstrated is the ability to create components that accept props to modify their appearance. The `Button` component uses a `primary` prop to conditionally apply different background colors. This dynamic styling capability enables the creation of versatile components that can adapt to different contexts while maintaining a consistent API. The TypeScript integration with `<{ primary?: boolean }>` ensures type safety for these props.

The example also showcases component composition and extension through:

1. **Component inheritance**: `PrimaryButton` extends the base `Button` component, inheriting all its styles and behavior while adding additional styling and default props through the `.attrs()` method.

2. **Prop-based variations**: The `Pill` component demonstrates how to create a single component with multiple visual variations based on a `variant` prop. This approach is particularly valuable for design systems where you need multiple visually distinct versions of the same basic component.

The medication list implementation demonstrates how styled-components can create semantic, meaningful component hierarchies with tailored styles. Each part of the medication item has a dedicated styled component (`MedicationItem`, `MedicationIcon`, `MedicationDetails`, etc.), making the structure clear and maintainable. This approach also allows for easy reuse throughout the application.

There are several key advantages of using styled-components in React Native development:

1. **Component-centric styling**: Styles are defined alongside the components they affect, creating a clear connection between UI elements and their appearance.

2. **Dynamic styling with props**: Components can adapt their appearance based on props, enabling more flexible and reusable components.

3. **Theming support**: While not shown in this example, styled-components provides robust theming capabilities, allowing applications to implement dark/light modes or other theme variations.

4. **Composable styles**: Styled components can extend other styled components, enabling the creation of component hierarchies with inherited styles.

5. **Cleaner components**: By extracting styling into styled components, the main component logic becomes cleaner and more focused on behavior rather than appearance.

6. **CSS-like syntax**: The template literal syntax will be familiar to web developers accustomed to CSS, making the transition to React Native styling more intuitive.

It's worth noting some important considerations when using styled-components in React Native:

1. **Performance**: While performance has improved in recent versions, deeply nested styled components can impact render performance. In performance-critical screens, traditional StyleSheet may still be preferred.

2. **Bundle size**: Styled-components adds to your application bundle size, though this is typically outweighed by the maintainability benefits.

3. **React Native specificity**: Always ensure you're importing from 'styled-components/native' rather than the base package to get components specifically designed for React Native.

The pharmacy app example demonstrates how styled-components can enhance the development experience by creating a more intuitive relationship between components and their styles while enabling greater flexibility through prop-based styling variations.

</details></blockquote>

---

## Shadow and Elevation

Creating depth in your UI with platform-specific shadows:

```tsx
import React from 'react';
import { 
  View, Text, StyleSheet, 
  ScrollView, Platform
} from 'react-native';

function ShadowExample() {
  // Shadow utility function
  const createShadow = (elevation: number) => {
    return Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: elevation/2 },
        shadowOpacity: 0.3,
        shadowRadius: elevation,
      },
      android: {
        elevation,
      },
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shadow and Elevation</Text>
      
      <View style={styles.row}>
        <View style={[styles.card, styles.shadowSmall]}>
          <Text style={styles.cardTitle}>Low Shadow</Text>
          <Text style={styles.pill}>Ibuprofen</Text>
        </View>
        
        <View style={[styles.card, styles.shadowMedium]}>
          <Text style={styles.cardTitle}>Medium Shadow</Text>
          <Text style={styles.pill}>Metformin</Text>
        </View>
      </View>
      
      <View style={[styles.card, styles.shadowLarge]}>
        <Text style={styles.cardTitle}>Large Shadow</Text>
        <Text>Medication information card with pronounced shadow for emphasis</Text>
      </View>
      
      {/* Shadow examples with different elevations */}
      <Text style={styles.sectionTitle}>Elevation Examples</Text>
      <View style={styles.elevationRow}>
        {[1, 2, 4, 8, 16, 24].map(elevation => (
          <View 
            key={elevation}
            style={[
              styles.elevationBox,
              createShadow(elevation)
            ]}
          >
            <Text style={styles.elevationText}>{elevation}</Text>
          </View>
        ))}
      </View>
      
      {/* Medical card with proper shadows */}
      <Text style={styles.sectionTitle}>Medical Card Example</Text>
      <View style={[styles.medCard, styles.shadowMedium]}>
        <View style={styles.medCardHeader}>
          <Text style={styles.medCardTitle}>Prescription</Text>
        </View>
        <View style={styles.medCardBody}>
          <Text style={styles.medName}>Amoxicillin 500mg</Text>
          <Text style={styles.medInstructions}>
            Take 1 capsule by mouth 3 times daily for 10 days
          </Text>
          <View style={styles.divider} />
          <View style={styles.medMetaRow}>
            <Text style={styles.medMeta}>Qty: 30</Text>
            <Text style={styles.medMeta}>Refills: 0</Text>
          </View>
        </View>
        <View style={[styles.medCardFooter, styles.shadowSmall]}>
          <Text style={styles.footerText}>Expires: 12/31/2023</Text>
        </View>
      </View>
      
      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <View style={[styles.fab, styles.shadowLarge]}>
          <Text style={styles.fabIcon}>+</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '48%',
  },
  shadowSmall: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 2,
    },
  }),
  shadowMedium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
  shadowLarge: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
    android: {
      elevation: 10,
    },
  }),
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1f5fe',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: '#0288d1',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  elevationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  elevationBox: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  medCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  medCardHeader: {
    backgroundColor: '#3498db',
    padding: 16,
  },
  medCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  medCardBody: {
    padding: 16,
  },
  medName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  medInstructions: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  medMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medMeta: {
    color: '#777',
    fontSize: 14,
  },
  medCardFooter: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  fabContainer: {
    position: 'relative',
    height: 70,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
```

<blockquote><details>

Shadow and elevation effects are essential design elements that create depth and hierarchy in mobile interfaces, helping users understand the relationship between different UI components. However, implementing consistent shadows across iOS and Android presents challenges due to fundamental differences in how these platforms handle depth effects. This example demonstrates effective approaches for creating cross-platform shadow effects in React Native.

The key difference between platforms is that iOS uses a true shadow rendering system with properties like `shadowColor`, `shadowOffset`, `shadowOpacity`, and `shadowRadius` to create realistic shadows, while Android uses a simpler `elevation` property that applies a uniform shadow effect. The example addresses this through platform-specific styling using `Platform.select()`.

The `createShadow` utility function demonstrates a reusable approach to shadow creation, taking a numeric elevation value and returning appropriate shadow properties for each platform. This approach allows developers to think in terms of a unified "elevation" concept while letting the function handle the platform-specific implementation details. For iOS, it calculates proportional shadow values, while for Android it directly applies the elevation value.

The example showcases three standard shadow intensities:
- **Low Shadow** (`shadowSmall`): Subtle shadows suitable for less prominent UI elements
- **Medium Shadow** (`shadowMedium`): Moderate shadows appropriate for most cards and containers
- **Large Shadow** (`shadowLarge`): Pronounced shadows for elements that need to appear elevated or interactive, like the floating action button

The "Elevation Examples" section displays a progression of elevation values from 1 to 24, showing how increasing elevation creates a stronger sense of height above the surface. This visual demonstration helps designers and developers choose appropriate elevation values for different UI components.

The medical prescription card demonstrates how shadows enhance the visual hierarchy of complex components:
1. The card itself uses a medium shadow to stand out from the background
2. The footer has a subtle shadow to create a sense of layering within the card
3. The rounded corners complement the shadow effect, enhancing the card-like appearance

The Floating Action Button (FAB) showcases how significant elevation creates a hovering effect, signaling to users that this is an important, interactive element that floats above the rest of the interface. The large shadow differentiates it from standard UI elements.

Some key best practices for shadow implementation demonstrated in this example:

1. **Platform adaptation**: Always use `Platform.select()` to provide appropriate shadow implementations for each platform
2. **Shadow consistency**: Create a system of standard shadow levels and reuse them consistently
3. **Purposeful elevation**: Apply shadow depth intentionally to reflect the information hierarchy
4. **Material Design inspiration**: The elevation values (2, 5, 10) follow principles from Material Design guidelines
5. **Performance consideration**: Shadows can impact rendering performance, so use them judiciously

Shadow effects can significantly enhance the usability of an application by:
- Creating visual hierarchy, helping users understand what elements are most important
- Providing depth cues that separate interactive elements from static content
- Defining spatial relationships between components
- Improving the perceived quality and polish of the user interface

The prescription card example specifically demonstrates how shadows can improve medical application interfaces by creating clear visual separation between different medications and emphasizing important information. The card's elevated appearance makes it easy to distinguish from the background, improving information scanning and readability.

When implementing shadows in your own applications, remember that the goal is to create subtle, realistic effects that enhance usability rather than distracting decorations. Well-implemented shadows should support the user experience without calling attention to themselves.

</details></blockquote>

---

## Advanced Styling Techniques

Combining multiple styling approaches for complex UIs:

```tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput, Switch, Platform
} from 'react-native';
import styled from 'styled-components/native';

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  padding: 16px;
  background-color: #3498db;
  align-items: center;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

// Theme constants
const THEME = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
    text: '#333',
    lightText: '#777',
    border: '#ddd',
    background: '#f5f5f5',
    card: '#fff',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  shadow: {
    small: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
    medium: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },
};

function AdvancedStylingExample() {
  const [darkMode, setDarkMode] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  
  // Dynamic theme based on dark mode state
  const theme = {
    ...THEME,
    colors: {
      ...THEME.colors,
      background: darkMode ? '#121212' : THEME.colors.background,
      card: darkMode ? '#1e1e1e' : THEME.colors.card,
      text: darkMode ? '#f5f5f5' : THEME.colors.text,
      lightText: darkMode ? '#bbbbbb' : THEME.colors.lightText,
      border: darkMode ? '#333' : THEME.colors.border,
    }
  };
  
  // Medication data
  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', schedule: 'Every 8 hours', color: '#e74c3c' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', color: '#3498db' },
    { id: 3, name: 'Metformin', dosage: '1000mg', schedule: 'Twice daily with meals', color: '#2ecc71' },
  ];
  
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <Header>
        <HeaderText>My Medications</HeaderText>
      </Header>
      
      <ScrollView style={styles.content}>
        {/* Settings Card - StyleSheet + Inline + Theme */}
        <View style={[
          styles.card, 
          { backgroundColor: theme.colors.card },
          theme.shadow.medium
        ]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Settings
          </Text>
          
          <View style={styles.setting}>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#3498db' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.setting}>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Medication Reminders
            </Text>
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={reminderEnabled ? '#3498db' : '#f4f3f4'}
            />
          </View>
        </View>
        
        {/* Search - StyleSheet + Theme */}
        <View style={[
          styles.searchContainer, 
          { backgroundColor: theme.colors.card },
          theme.shadow.small
        ]}>
          <TextInput
            style={[styles.searchInput, { 
              backgroundColor: darkMode ? '#333' : '#f0f0f0',
              color: theme.colors.text,
              borderColor: theme.colors.border
            }]}
            placeholder="Search medications..."
            placeholderTextColor={theme.colors.lightText}
          />
        </View>
        
        {/* Medication Cards - Mixed Styling */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Current Medications
        </Text>
        
        {medications.map(med => (
          <View 
            key={med.id}
            style={[
              styles.medCard, 
              { backgroundColor: theme.colors.card },
              theme.shadow.small
            ]}
          >
            <View style={[styles.medColor, { backgroundColor: med.color }]} />
            <View style={styles.medContent}>
              <Text style={[styles.medName, { color: theme.colors.text }]}>
                {med.name}
              </Text>
              <Text style={[styles.medDetails, { color: theme.colors.lightText }]}>
                {med.dosage} • {med.schedule}
              </Text>
              
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: THEME.colors.primary }]}
                >
                  <Text style={styles.buttonText}>Take</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: THEME.colors.secondary }]}
                >
                  <Text style={styles.buttonText}>Remind</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: THEME.colors.warning }]}
                >
                  <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: THEME.spacing.medium,
  },
  card: {
    borderRadius: THEME.borderRadius.medium,
    padding: THEME.spacing.medium,
    marginBottom: THEME.spacing.medium,
  },
  cardTitle: {
    fontSize: THEME.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: THEME.spacing.medium,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.small,
  },
  settingText: {
    fontSize: THEME.fontSizes.medium,
  },
  searchContainer: {
    borderRadius: THEME.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: THEME.spacing.medium,
  },
  searchInput: {
    padding: THEME.spacing.medium,
    fontSize: THEME.fontSizes.medium,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: THEME.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: THEME.spacing.medium,
  },
  medCard: {
    borderRadius: THEME.borderRadius.medium,
    marginBottom: THEME.spacing.medium,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  medColor: {
    width: 12,
  },
  medContent: {
    flex: 1,
    padding: THEME.spacing.medium,
  },
  medName: {
    fontSize: THEME.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medDetails: {
    fontSize: THEME.fontSizes.small,
    marginBottom: THEME.spacing.medium,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.small,
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: THEME.fontSizes.small,
    fontWeight: '500',
  },
});
```

<blockquote><details>

Advanced styling in React Native often combines multiple approaches to achieve complex, maintainable, and flexible UI systems. This example demonstrates how to create a sophisticated medication tracking interface by integrating StyleSheet objects, styled-components, theming, dynamic styling, and conditional rendering. Each technique has specific strengths, and using them in combination allows developers to leverage the best approach for each UI challenge.

The example is organized around a central theme system implemented as a JavaScript object (`THEME`). This theme-based approach provides several advantages:

1. **Centralized design tokens**: Core values like colors, spacing, font sizes, and border radii are defined in one place, making it easy to maintain design consistency throughout the application.

2. **Design system implementation**: By referencing theme values rather than hardcoding style values, the interface naturally follows design system principles, ensuring visual coherence.

3. **Easy customization**: The theme system makes it simple to implement features like dark mode by swapping out color palettes while maintaining the same component structure.

The dark mode implementation demonstrates dynamic theming in action. When a user toggles the dark mode switch:
1. A new theme object is created that overrides specific color values
2. Components reference this dynamic theme object for their styling
3. The interface updates to reflect the new color scheme while maintaining layout and structure

Several styling approaches are showcased in the example:

**Styled Components** are used for the container and header elements, demonstrating how this library creates reusable, styled building blocks with CSS-like syntax. These components encapsulate their styling and can be composed to create complex interfaces.

**StyleSheet API** powers most of the component styles, organized in a traditional React Native styles object. This approach offers excellent performance and static typing benefits. The styles reference theme constants rather than hardcoded values, connecting them to the design system.

**Inline Styles** are used sparingly for dynamic properties that need to change based on state (like dark mode). By combining StyleSheet styles with inline overrides through array syntax (`[styles.card, { backgroundColor: theme.colors.card }]`), the example achieves both performance and flexibility.

**Conditional Styling** is applied throughout the interface, particularly in the dark mode implementation. The switch between light and dark themes demonstrates how React Native can create adaptive interfaces that respond to user preferences.

**Platform-Specific Styling** is handled through the theme's shadow implementation, which provides different shadow properties for iOS and Android platforms, ensuring consistent appearance across devices.

The medication card components showcase how these approaches can be combined in a single component:
1. The card structure uses StyleSheet styles for layout
2. Theme values provide colors and spacing
3. Conditional styling changes appearance based on the dark mode state
4. Each medication has a color-coded indicator, demonstrating component-specific styling

This example also demonstrates several best practices for React Native styling:

1. **Component-based organization**: Each logical UI section is implemented as a discrete component with its own styling.

2. **Responsive layout**: Flexbox is used extensively to create layouts that adapt to available space.

3. **Visual hierarchy**: Colors, shadows, and spacing work together to create clear visual relationships between elements.

4. **Performance considerations**: StyleSheet is used for static styles, while inline styles are limited to dynamic properties.

5. **Maintainability**: By centralizing style values in a theme object, the code becomes more maintainable as changes can be made in one place.

In a production application, this approach could be extended further with:
- A more sophisticated theming system that supports multiple theme variants
- Context API integration to make theme values available throughout the component tree
- A comprehensive style guide component library
- Integration with design token systems from tools like Figma

The combination of these styling approaches creates a flexible, maintainable system that can evolve with the application while maintaining visual consistency and performance. By thoughtfully choosing the right styling technique for each situation, developers can create sophisticated interfaces that are both beautiful and functional across the diverse ecosystem of mobile devices.

</details></blockquote>

---

## Animation in React Native

Creating fluid and responsive animations to enhance user experience:

```tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing,
  TouchableOpacity, ScrollView, Dimensions,
  PanResponder
} from 'react-native';

const { width } = Dimensions.get('window');

function AnimationExample() {
  // Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Slide animation
  const slideAnim = useRef(new Animated.Value(-100)).current;
  
  // Spinner animation
  const spinAnim = useRef(new Animated.Value(0)).current;
  
  // Progress animation
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Sequence counter for medication reminder
  const [sequence, setSequence] = useState(0);
  
  // Interpolated values
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  
  // Drag animation for pill
  const pillPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [pillTaken, setPillTaken] = useState(false);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pillPosition.x, dy: pillPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gesture) => {
      // Check if pill is dragged to "taken" zone (right side)
      if (gesture.moveX > width * 0.7) {
        Animated.spring(pillPosition, {
          toValue: { x: width - 120, y: 0 },
          useNativeDriver: false,
        }).start();
        setPillTaken(true);
        triggerSuccessAnimation();
      } else {
        // Return to original position
        Animated.spring(pillPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    }
  });
  
  // Start basic animations
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true
    }).start();
    
    // Start spinner animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
    
    // Progress animation
    animateProgress(0, 100, 3000);
  }, []);
  
  // Function to animate progress bar
  const animateProgress = (from, to, duration) => {
    setProgress(to);
    progressAnim.setValue(from);
    Animated.timing(progressAnim, {
      toValue: to,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start();
  };
  
  // Scale up and down animation
  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Trigger a success animation sequence when pill is taken
  const triggerSuccessAnimation = () => {
    // Reset progress for demo purposes
    animateProgress(0, 100, 1500);
    
    // Increment sequence counter for medication reminder
    setSequence(prev => (prev + 1) % 3);
  };
  
  // Animation sequence for medication reminder
  useEffect(() => {
    if (sequence > 0) {
      // Create staggered animations for medication reminders
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ];
      
      Animated.sequence(animations).start();
    }
  }, [sequence]);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Animation in React Native</Text>
      
      {/* Basic animations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Animations</Text>
        
        <Animated.View 
          style={[
            styles.animationBox,
            {
              opacity: fadeAnim,
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={styles.animationText}>Fade & Slide</Text>
        </Animated.View>
        
        <TouchableOpacity onPress={pulseAnimation} style={styles.button}>
          <Text style={styles.buttonText}>Pulse Animation</Text>
        </TouchableOpacity>
      </View>
      
      {/* Loading and progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading & Progress</Text>
        
        <View style={styles.row}>
          <Animated.View style={[
            styles.spinner,
            { transform: [{ rotate: spin }] }
          ]}>
            <Text style={styles.spinnerText}>💊</Text>
          </Animated.View>
          
          <View style={styles.progressContainer}>
            <Animated.View 
              style={[
                styles.progressBar, 
                { width: progressWidth }
              ]} 
            />
            <Text style={styles.progressText}>{`${progress}%`}</Text>
          </View>
        </View>
      </View>
      
      {/* Interactive animations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Animation</Text>
        <Text style={styles.instructions}>
          Drag the pill to the right to mark as taken
        </Text>
        
        <View style={styles.pillTrack}>
          <View style={styles.pillZone}>
            <Text style={styles.zoneText}>Drag Here</Text>
          </View>
          
          <Animated.View 
            {...panResponder.panHandlers}
            style={[
              styles.draggablePill,
              pillPosition.getLayout(),
              pillTaken && styles.pillTaken
            ]}
          >
            <Text style={styles.pillText}>Amoxicillin</Text>
          </Animated.View>
        </View>
        
        {pillTaken && (
          <Animated.View 
            style={[
              styles.takenMessage,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.takenText}>
              Medication taken! Next dose in 8 hours.
            </Text>
          </Animated.View>
        )}
        
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={() => {
            setPillTaken(false);
            Animated.spring(pillPosition, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }}
        >
          <Text style={styles.resetButtonText}>Reset Demo</Text>
        </TouchableOpacity>
      </View>
      
      {/* Staggered animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminder Animation</Text>
        
        <View style={styles.reminderContainer}>
          {['Morning', 'Afternoon', 'Evening'].map((time, index) => (
            <Animated.View 
              key={time}
              style={[
                styles.reminderItem,
                sequence > index && { backgroundColor: '#e3f2fd' },
                sequence === index && {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Text style={styles.reminderTime}>{time}</Text>
              <Text style={styles.reminderMed}>Lisinopril 10mg</Text>
              <View style={[
                styles.reminderStatus,
                sequence > index && styles.reminderTaken
              ]}>
                <Text style={styles.reminderStatusText}>
                  {sequence > index ? 'Taken' : 'Pending'}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#3498db',
  },
  animationBox: {
    backgroundColor: '#3498db',
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  animationText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  spinnerText: {
    fontSize: 24,
  },
  progressContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 20,
  },
  pillTrack: {
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    marginVertical: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  pillZone: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '30%',
    backgroundColor: '#e3f2fd',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneText: {
    color: '#3498db',
    fontWeight: '500',
    fontSize: 12,
  },
  draggablePill: {
    width: 120,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  pillTaken: {
    backgroundColor: '#2ecc71',
  },
  pillText: {
    color: 'white',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  takenMessage: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  takenText: {
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 14,
  },
  reminderContainer: {
    marginTop: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reminderTime: {
    fontWeight: 'bold',
    width: 80,
  },
  reminderMed: {
    flex: 1,
  },
  reminderStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  reminderTaken: {
    backgroundColor: '#e8f5e9',
  },
  reminderStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
});

export default AnimationExample;
```

<blockquote><details>

Animations are a critical component of modern mobile applications, enhancing user experience by providing visual feedback, guiding attention, and making interfaces feel more responsive and engaging. This example demonstrates several animation techniques in React Native, focusing on practical applications in a medication management context.

React Native's `Animated` API is the cornerstone of animation implementation in the framework, providing a powerful yet efficient way to create fluid animations that run on the native thread for optimal performance. The example demonstrates multiple animation types and techniques:

**Basic Value Animations** form the foundation of React Native's animation system. The example uses several `Animated.Value` instances to control different properties:
- `fadeAnim` manages opacity transitions
- `scaleAnim` handles size changes
- `slideAnim` controls horizontal position
- `spinAnim` drives rotation

These values are connected to component properties through style transformations, allowing precise control over how elements appear and move.

**Animation Timing and Easing** control the pace and feel of animations. The example demonstrates various timing configurations:
- Standard timing with `Animated.timing` for smooth, predictable transitions
- Spring physics with `Animated.spring` for more natural, bouncy movements (used in the pill drag interaction)
- Custom easing with functions like `Easing.back` to create more engaging motion patterns

**Value Interpolation** transforms animation values into different ranges or types. The example shows two key interpolations:
- Converting a 0-1 value to "0deg"-"360deg" for the spinner rotation
- Mapping progress values from 0-100 to "0%"-"100%" for the progress bar width

**Composition of Animations** enables complex sequences and parallel movements. The example demonstrates:
- `Animated.sequence` to run animations one after another (in the pulse effect)
- `Animated.loop` for continuous repetition (spinner)
- Gesture-driven animations with `PanResponder` (pill dragging)

**Practical Applications in Medication Management:**

1. **Progress Indicators**: The circular spinner and progress bar visualize loading states or progress toward taking all daily medications. These animations provide reassurance that the system is working and help users understand their medication adherence.

2. **Interactive Elements**: The draggable pill demonstrates how animation can create engaging interactions. The natural-feeling spring physics when releasing the pill provides satisfying feedback to the user's actions, making the task of marking medications as taken more engaging.

3. **Status Changes**: The success animation when a pill is "taken" provides immediate positive feedback, reinforcing the user's action with visual cues. The color change and message appearance create a rewarding experience.

4. **Attention Direction**: The pulsing animation on medication reminders draws users' attention to important information, particularly the current dose that needs to be taken.

5. **Sequential Guidance**: The staggered animations in the medication reminder section help users understand the sequence of doses throughout the day, with clear visual differentiation between taken, current, and upcoming doses.

**Implementation Considerations:**

The example demonstrates several important practices for animation in React Native:

1. **Performance Optimization**: The code uses `useNativeDriver: true` wherever possible, which offloads animations to the native thread for smoother performance. For animations that can't use the native driver (like layout measurements), it falls back to JavaScript-driven animations.

2. **State Management**: The animations are tied to component state through `useRef` and `useState` hooks, ensuring that animations respond appropriately to state changes and user interactions.

3. **Gesture Handling**: The `PanResponder` integration shows how to create draggable elements with appropriate feedback based on user gestures.

4. **Conditional Animation**: Different animations are triggered based on application state, like the pill being marked as taken or the progression through medication reminders.

5. **Reset Capabilities**: The example includes mechanisms to reset animations, allowing users to see them again or practice interactions multiple times.

Animations should enhance the user experience without being distracting. In this medication management example, the animations serve clear purposes: they provide feedback, guide attention to important elements, make interactions more intuitive, and create a more engaging user experience. These principles can be applied to any React Native application to create interfaces that are not only functional but also delightful to use.

</details></blockquote>

---

## Custom UI Components

Building reusable, styled components for consistent UI:

```tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, 
  TextInput, ScrollView, Switch, Platform,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ========= Custom UI Components =========

// Custom button with multiple variants
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  // Size maps
  const sizeStyles = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
    },
  };
  
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3498db',
          textColor: 'white',
          borderColor: '#3498db',
        };
      case 'secondary':
        return {
          backgroundColor: '#2ecc71',
          textColor: 'white',
          borderColor: '#2ecc71',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          textColor: '#3498db',
          borderColor: '#3498db',
        };
      case 'danger':
        return {
          backgroundColor: '#e74c3c',
          textColor: 'white',
          borderColor: '#e74c3c',
        };
      default:
        return {
          backgroundColor: '#3498db',
          textColor: 'white',
          borderColor: '#3498db',
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          paddingVertical: sizeStyles[size].paddingVertical,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          opacity: disabled ? 0.6 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
        variant === 'outline' && styles.buttonOutline,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.buttonIcon}>{icon}</View>}
        <Text
          style={[
            styles.buttonText,
            {
              color: variantStyles.textColor,
              fontSize: sizeStyles[size].fontSize,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Custom card component
interface CardProps {
  title?: string;
  children: React.ReactNode;
  elevation?: number;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  elevation = 2,
  onPress,
}) => {
  const cardStyles = [
    styles.card,
    Platform.select({
      ios: {
        shadowOpacity: 0.1 + elevation * 0.05,
        shadowRadius: elevation,
        shadowOffset: { width: 0, height: elevation / 2 },
      },
      android: {
        elevation,
      },
    }),
  ];
  
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent
      style={cardStyles}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
    >
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {children}
    </CardComponent>
  );
};

// Custom input component
interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  secureTextEntry?: boolean;
  error?: string;
  info?: string;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  error,
  info,
  disabled = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {info && <Text style={styles.infoText}>{info}</Text>}
    </View>
  );
};

// Custom medication item component
interface MedicationItemProps {
  name: string;
  dosage: string;
  schedule: string;
  color?: string;
  onTaken?: () => void;
  onInfo?: () => void;
  taken?: boolean;
}

const MedicationItem: React.FC<MedicationItemProps> = ({
  name,
  dosage,
  schedule,
  color = '#3498db',
  onTaken,
  onInfo,
  taken = false,
}) => {
  return (
    <Card elevation={2}>
      <View style={styles.medicationItem}>
        <View style={[styles.medicationColor, { backgroundColor: color }]} />
        <View style={styles.medicationContent}>
          <Text style={styles.medicationName}>{name}</Text>
          <Text style={styles.medicationDosage}>
            {dosage} • {schedule}
          </Text>
          
          <View style={styles.medicationActions}>
            <CustomButton
              title={taken ? "Taken" : "Take Now"}
              variant={taken ? "outline" : "primary"}
              size="small"
              onPress={onTaken}
              disabled={taken}
            />
            <CustomButton
              title="Info"
              variant="outline"
              size="small"
              onPress={onInfo}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

// Custom toggle component
interface ToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <View style={styles.toggleContainer}>
      <Text style={[styles.toggleLabel, disabled && { color: '#999' }]}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#767577', true: '#bde0fe' }}
        thumbColor={value ? '#3498db' : '#f4f3f4'}
      />
    </View>
  );
};

// Header with gradient
interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, action }) => {
  return (
    <LinearGradient
      colors={['#3498db', '#2980b9']}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          )}
        </View>
        {action && <View style={styles.headerAction}>{action}</View>}
      </View>
    </LinearGradient>
  );
};

// Badge component for status indications
interface BadgeProps {
  text: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = 'default',
  size = 'medium',
}) => {
  // Badge background colors by type
  const getBadgeColor = () => {
    switch (type) {
      case 'success': return '#e8f5e9';
      case 'warning': return '#fff8e1';
      case 'error': return '#ffebee';
      case 'info': return '#e3f2fd';
      default: return '#f5f5f5';
    }
  };

  // Badge text colors by type
  const getTextColor = () => {
    switch (type) {
      case 'success': return '#2e7d32';
      case 'warning': return '#f57f17';
      case 'error': return '#c62828';
      case 'info': return '#1565c0';
      default: return '#616161';
    }
  };

  // Size variations
  const getSize = () => {
    return size === 'small' ? {
      paddingVertical: 2,
      paddingHorizontal: 6,
      fontSize: 10,
    } : {
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: 12,
    };
  };

  const sizeStyle = getSize();
  
  return (
    <View style={[
      styles.badge,
      { backgroundColor: getBadgeColor() },
      { 
        paddingVertical: sizeStyle.paddingVertical, 
        paddingHorizontal: sizeStyle.paddingHorizontal 
      }
    ]}>
      <Text style={[
        styles.badgeText, 
        { color: getTextColor() },
        { fontSize: sizeStyle.fontSize }
      ]}>
        {text}
      </Text>
    </View>
  );
};

// Main component showcasing custom UI
function CustomComponentsExample() {
  const [selectedMedication, setSelectedMedication] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const medications = [
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      schedule: 'Every 8 hours',
      color: '#e74c3c',
      taken: true,
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      schedule: 'Once daily',
      color: '#3498db',
      taken: false,
    },
    {
      id: 3,
      name: 'Metformin',
      dosage: '1000mg',
      schedule: 'Twice daily with meals',
      color: '#2ecc71',
      taken: false,
    },
  ];
  
  const handleMedicationTaken = (id) => {
    // In a real app, you would update state here
    console.log(`Medication ${id} marked as taken`);
  };
  
  return (
    <View style={styles.container}>
      <Header
        title="MediTrack"
        subtitle="Your medication companion"
        action={
          <CustomButton
            title="Profile"
            variant="outline"
            size="small"
            onPress={() => console.log('Profile')}
          />
        }
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Custom Components</Text>
        
        <Card title="My Medications">
          {medications.map((med) => (
            <MedicationItem
              key={med.id}
              name={med.name}
              dosage={med.dosage}
              schedule={med.schedule}
              color={med.color}
              taken={med.taken}
              onTaken={() => handleMedicationTaken(med.id)}
              onInfo={() => setSelectedMedication(med.id)}
            />
          ))}
        </Card>
        
        <Card title="Medication Status">
          <View style={styles.statusRow}>
            <Badge text="Active" type="success" />
            <Badge text="Expiring Soon" type="warning" />
            <Badge text="Needs Refill" type="error" />
            <Badge text="New" type="info" />
            <Badge text="Other" type="default" size="small" />
          </View>
        </Card>
        
        <Card title="Reminder Settings">
          <Toggle
            label="Enable Notifications"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          
          <CustomInput
            label="Reminder Time"
            value={reminderTime}
            onChangeText={setReminderTime}
            placeholder="e.g., 8:00 AM"
            disabled={!notificationsEnabled}
            info={notificationsEnabled ? "When should we remind you?" : "Enable notifications first"}
          />
          
          <Toggle
            label="Show Advanced Options"
            value={showAdvanced}
            onValueChange={setShowAdvanced}
          />
          
          {showAdvanced && (
            <View style={styles.advancedOptions}>
              <Text style={styles.advancedTitle}>Advanced Options</Text>
              
              <Toggle
                label="Sound Alerts"
                value={true}
                onValueChange={() => {}}
              />
              
              <Toggle
                label="Vibration"
                value={true}
                onValueChange={() => {}}
              />
              
              <Toggle
                label="Reminder Persistence"
                value={false}
                onValueChange={() => {}}
              />
            </View>
          )}
        </Card>
        
        <Card title="Button Examples">
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Primary"
              variant="primary"
              onPress={() => console.log('Primary')}
            />
            <CustomButton
              title="Secondary"
              variant="secondary"
              onPress={() => console.log('Secondary')}
            />
            <CustomButton
              title="Outline"
              variant="outline"
              onPress={() => console.log('Outline')}
            />
            <CustomButton
              title="Danger"
              variant="danger"
              onPress={() => console.log('Danger')}
            />
          </View>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Small"
              size="small"
              onPress={() => {}}
            />
            <CustomButton
              title="Medium"
              size="medium"
              onPress={() => {}}
            />
            <CustomButton
              title="Large"
              size="large"
              onPress={() => {}}
            />
            <CustomButton
              title="Disabled"
              disabled
              onPress={() => {}}
            />
          </View>
          
          <CustomButton
            title="Full Width Button"
            fullWidth
            onPress={() => console.log('Full width')}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 44 : 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitles: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  headerAction: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: '600',
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  inputDisabled: {
    backgroundColor: '#f9f9f9',
    borderColor: '#eee',
    color: '#999',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  infoText: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
  },
  medicationItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  medicationColor: {
    width: 8,
    backgroundColor: '#3498db',
  },
  medicationContent: {
    flex: 1,
    paddingLeft: 12,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  medicationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  advancedOptions: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  advancedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  badge: {
    borderRadius: 16,
    marginRight: 8,
  },
  badgeText: {
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
});

export default CustomComponentsExample;
```

<blockquote><details>

Creating reusable UI components is a cornerstone of modern React Native development, enabling consistent design, improved maintainability, and increased development speed. This example demonstrates the implementation of a comprehensive component library tailored for a medication tracking application, showcasing best practices for component design and organization.

The custom component system in this example follows several key design principles:

**1. Composition and Reusability**

The components are designed with composability in mind, allowing them to be combined in various ways to create complex interfaces. For example, the `MedicationItem` component internally uses the `Card` and `CustomButton` components, demonstrating how well-designed components can be nested to create more specialized UI elements without duplicating code.

**2. Consistent Props API**

Each component follows a consistent pattern for props:
- Common properties like `disabled` are implemented consistently across components
- Size variants (`small`, `medium`, `large`) use the same naming convention
- Event handlers follow the React naming convention (`onPress`, `onValueChange`)

This consistency creates a predictable interface for developers, making the components intuitive to use and reducing the learning curve.

**3. TypeScript Integration**

The components leverage TypeScript through detailed interfaces (e.g., `CustomButtonProps`, `CardProps`) that define the expected props and their types. This provides several benefits:
- Type checking at development time
- Improved IDE autocomplete and documentation
- Clear documentation of the component API
- Enforcement of required props

**4. Variant Support**

The `CustomButton` component demonstrates how to implement variants (primary, secondary, outline, danger) and sizes (small, medium, large) through configurable props. This approach enables a single component to satisfy multiple design requirements, reducing the need for specialized one-off components while maintaining design consistency.

**5. Platform Adaptation**

The components account for platform differences where needed. For example, the `Card` component uses `Platform.select()` to implement appropriate shadow properties for iOS and elevation for Android, while the `Header` component adjusts its top padding based on the platform to account for iOS status bar height.

**6. Visual Feedback**

Interactive components include visual feedback mechanisms:
- The `CustomButton` uses `activeOpacity` to provide tap feedback
- The `Toggle` component visualizes its state through color and position
- Error and disabled states are visually distinct in the `CustomInput` component

**7. Accessibility Considerations**

The components are designed with accessibility in mind:
- Touchable areas are appropriately sized for easy interaction
- Text has sufficient contrast against backgrounds
- Disabled states are visually distinguishable
- Interactive elements provide feedback

**Component Highlights:**

The **`CustomButton`** component demonstrates advanced styling techniques:
- Computed styles based on props (variant, size, disabled state)
- Style composition using arrays to combine base styles with variant-specific ones
- Support for icons and text in a flexible layout

The **`Card`** component shows how to create a versatile container:
- Configurable elevation for visual hierarchy
- Support for both interactive (touchable) and static usage
- Consistent styling with optional title

The **`CustomInput`** component handles various input scenarios:
- Label and input field grouping
- Error and info message display
- Disabled state styling
- Various keyboard types for different input needs

The **`Header`** component uses Expo's `LinearGradient` to create a visually appealing gradient background, demonstrating integration with external UI libraries.

The **`Badge`** component provides a lightweight way to display status indicators:
- Multiple semantic variants (success, warning, error, info)
- Size variations for different contexts
- Consistent styling with appropriate colors for each status type

The **`MedicationItem`** component demonstrates composition by combining other components:
- Uses the Card component as a container
- Incorporates CustomButton components for actions
- Features a colored strip for visual categorization
- Maintains consistent spacing and typography

The **`Toggle`** component wraps the native Switch component:
- Adds a label with consistent styling
- Handles the disabled state for both the switch and label
- Uses custom colors that match the application theme

**Benefits of Component-Based Architecture:**

1. **Design Consistency**: By centralizing styling decisions in reusable components, the application maintains visual consistency across screens.

2. **Development Efficiency**: Developers can quickly assemble interfaces from pre-built components rather than implementing common UI patterns repeatedly.

3. **Maintenance Advantages**: When design changes are needed, they can be implemented in a single component rather than across multiple screens.

4. **Testing Simplification**: Components can be tested in isolation, making it easier to ensure they work correctly in all scenarios.

5. **Documentation**: Well-defined props interfaces serve as documentation for how to use each component.

**Real-World Application:**

In the medication management context, this component library addresses specific user needs:

- Clear presentation of medication information through the MedicationItem component
- Quick actions to mark medications as taken
- Visual status indicators through badges
- Configurable notification preferences
- Adaptive UI elements that work across device sizes

The `CustomComponentsExample` demonstrates how these components work together to create a cohesive interface. It shows real-world implementation patterns like:

- Conditional rendering based on state (advanced options)
- Handling user interactions (medication taken, toggles)
- Organization of related UI elements into logical sections
- Responsive layouts using flexbox

This approach to building a custom component library is scalable and can evolve with the application's needs. As new design requirements emerge, the component system can be extended with new components or enhanced with additional variants and props.

</details></blockquote>

---

## Theme Systems in React Native

Implementing a consistent theme across your application:

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define our theme structure
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  success: string;
  warning: string;
  error: string;
  disabled: string;
}

interface ThemeSpacing {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

interface ThemeTypography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
}

interface ThemeBorderRadius {
  xs: number;
  s: number;
  m: number;
  l: number;
  round: number;
}

interface ThemeShadows {
  light: object;
  medium: object;
  heavy: object;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
}

// Create light and dark themes
const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    border: '#dddddd',
    notification: '#f39c12',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    disabled: '#bdc3c7',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  },
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16, 
    round: 9999,
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 6,
    },
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#121212',
    card: '#1e1e1e',
    text: '#f5f5f5',
    border: '#333333',
    notification: '#f39c12',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    disabled: '#636e72',
  },
  spacing: { ...lightTheme.spacing },
  typography: { ...lightTheme.typography },
  borderRadius: { ...lightTheme.borderRadius },
  shadows: { 
    light: {
      ...lightTheme.shadows.light,
      shadowColor: '#222',
    },
    medium: {
      ...lightTheme.shadows.medium,
      shadowColor: '#222',
    },
    heavy: {
      ...lightTheme.shadows.heavy,
      shadowColor: '#222',
    },
  },
};

// Create a custom pharmacy theme
const pharmacyTheme: Theme = {
  dark: false,
  colors: {
    primary: '#5e35b1', // Deep purple
    secondary: '#00acc1', // Cyan
    background: '#f5f7fa',
    card: '#ffffff',
    text: '#37474f',
    border: '#eceff1',
    notification: '#ff9800',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    disabled: '#cfd8dc',
  },
  spacing: { ...lightTheme.spacing },
  typography: {
    ...lightTheme.typography,
    fontFamily: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
  },
  borderRadius: { ...lightTheme.borderRadius },
  shadows: { ...lightTheme.shadows },
};

// Create context
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: 'light' | 'dark' | 'pharmacy') => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>(
    colorScheme === 'dark' ? darkTheme : lightTheme
  );

  // Update theme when system theme changes
  useEffect(() => {
    if (colorScheme === 'dark') {
      setThemeState(darkTheme);
    } else {
      setThemeState(lightTheme);
    }
  }, [colorScheme]);

  // Set theme explicitly
  const setTheme = (themeName: 'light' | 'dark' | 'pharmacy') => {
    switch (themeName) {
      case 'light':
        setThemeState(lightTheme);
        break;
      case 'dark':
        setThemeState(darkTheme);
        break;
      case 'pharmacy':
        setThemeState(pharmacyTheme);
        break;
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeState(theme.dark ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Example usage:
// 
// // Wrap your app with the provider
// const App = () => {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// };
// 
// // Use the theme in components
// const AppContent = () => {
//   const { theme, toggleTheme } = useTheme();
//
//   return (
//     <View style={{ 
//       flex: 1, 
//       backgroundColor: theme.colors.background,
//       padding: theme.spacing.m 
//     }}>
//       <Text style={{ 
//         color: theme.colors.text,
//         fontSize: theme.typography.fontSize.l,
//         fontFamily: theme.typography.fontFamily.bold 
//       }}>
//         Themed Component
//       </Text>
//       <TouchableOpacity 
//         style={{ 
//           backgroundColor: theme.colors.primary,
//           padding: theme.spacing.m,
//           borderRadius: theme.borderRadius.m,
//           ...theme.shadows.medium
//         }}
//         onPress={toggleTheme}
//       >
//         <Text style={{ color: 'white' }}>
//           Toggle Theme
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
```

<blockquote><details>

Implementing a cohesive theme system is essential for creating polished, professional React Native applications with consistent visual language and behavior. A well-structured theme system centralizes design decisions, simplifies dark mode support, and makes applications more maintainable. This example demonstrates a comprehensive approach to theming in React Native using React's Context API.

### Theme System Architecture

The example implements a complete theme system with several key components:

**1. Theme Definition**

The theme structure is defined through TypeScript interfaces that clearly specify the available design tokens:

- `ThemeColors`: Defines the color palette including primary, secondary, background, and semantic colors like success and error
- `ThemeSpacing`: Establishes a consistent spacing scale for margins, padding, and layout
- `ThemeTypography`: Specifies font families and a typographic scale for consistent text styling
- `ThemeBorderRadius`: Provides standardized border radius values for UI elements
- `ThemeShadows`: Defines shadow presets for creating depth in the interface

This structured approach to design tokens ensures consistency throughout the application and makes it easy to update values in a single location.

**2. Theme Variants**

The system supports multiple theme variants:

- `lightTheme`: A standard light mode theme with a bright background and dark text
- `darkTheme`: A dark mode theme with dark backgrounds and light text
- `pharmacyTheme`: A domain-specific theme with colors and styling suited to pharmacy applications

The dark theme reuses many values from the light theme (spacing, typography, etc.) while changing colors and adjusting shadows to work well on dark backgrounds. This demonstrates how to efficiently create theme variants without duplicating shared values.

**3. Context and Provider**

The theme is made available throughout the application using React's Context API:

- `ThemeContext`: Creates a context to store the current theme and theme-changing functions
- `ThemeProvider`: Wraps the application and provides theme values to all child components
- System theme detection with `useColorScheme()` automatically applies the appropriate theme based on device settings

**4. Theme Access and Manipulation**

The system provides intuitive ways to access and change the theme:

- `useTheme()`: A custom hook that provides easy access to the current theme and theme functions
- `setTheme()`: Allows explicitly setting a specific theme variant
- `toggleTheme()`: Provides a convenient way to switch between light and dark themes

### Best Practices Demonstrated

This implementation showcases several theming best practices:

**1. Semantic Naming**

The theme uses semantic names for colors (like 'primary' and 'error') rather than visual names (like 'blue' or 'red'). This makes it easier to maintain consistent meaning when changing the color palette.

**2. Systematic Scaling**

The spacing, typography, and border radius values follow a systematic scale rather than arbitrary values. This creates visual rhythm and consistency throughout the interface.

**3. Platform Adaptation**

The shadow implementation acknowledges platform differences, using a combination of shadow properties for iOS and elevation for Android.

**4. Type Safety**

TypeScript interfaces provide strong typing for the theme, helping catch errors during development and providing excellent IDE support.

**5. System Integration**

The theme respects system preferences by default through `useColorScheme()`, following platform conventions while still allowing user override.

**6. Composition and Inheritance**

Theme variants inherit and compose properties from other themes, reducing duplication and ensuring consistency across variants.

### Practical Applications in a Pharmacy App

In a medication tracking application, a theme system like this enables:

1. **Branding Consistency**: The pharmacy theme applies consistent brand colors across all screens and components

2. **Accessibility Support**: The dark theme provides a comfortable viewing option for low-light environments or users with visual sensitivities

3. **Visual Hierarchy**: Semantic colors clearly indicate the purpose of interface elements (success for completed actions, warning for alerts, etc.)

4. **Maintenance Efficiency**: Design changes can be implemented by updating the theme values rather than modifying individual components

5. **Responsive Design**: Using theme-based spacing values rather than hard-coded dimensions supports better responsive layouts

### Implementation Approach

To use this theme system in an application:

1. Wrap the root component with `ThemeProvider` to make the theme available throughout the app
2. Use the `useTheme()` hook in components to access the current theme values
3. Apply theme values to component styles instead of hard-coded values
4. Provide theme-switching controls for users who prefer a specific theme

The commented example at the bottom of the code shows how components would consume this theme system, applying theme-based styling for colors, typography, spacing, borders, and shadows.

By implementing a comprehensive theme system like this, React Native applications can achieve professional polish, maintain consistency across features, and adapt to different user preferences and platform conventions.

</details></blockquote>

---

## Exercise: Creating a Responsive Pharmacy Card Component

Create a responsive pharmacy card component with styling that adapts to different screen sizes. Use both StyleSheet and styled-components approaches.

1. Card should display medication details.
2. Card should have different layouts for portrait and landscape orientations.
3. Use shadows and proper typography.
4. Implement touch feedback for interactive elements.
5. Add stylish visual elements like color-coded categories or status indicators.

This exercise will help you practice the styling concepts covered in this module.

---

## Challenge: Medication Tracker App UI

Build a complete medication tracker app UI with the following components:

1. A responsive dashboard showing medication schedules for the day
2. A detail view for medication information
3. A form for adding new medications with proper styling
4. Dark mode support
5. Platform-specific adaptations for iOS and Android

Apply all the styling techniques covered in this module to create a cohesive, well-designed UI.

Bonus: Add animations to enhance the user experience.

---

## Summary and Key Takeaways

This module covered the essential concepts and techniques for styling React Native applications to create professional, responsive, and visually appealing user interfaces.

---

## Module Overview

In this module, we explored:

- Styling fundamentals in React Native
- Flexbox layout system
- Responsive design techniques
- Platform-specific styling
- Shadow and elevation
- Advanced styling approaches
- Animation techniques
- Custom UI components
- Theme systems

---

## Key Takeaways: Styling Fundamentals

- React Native uses a subset of CSS properties with JavaScript syntax
- Styles are defined using JavaScript objects, typically with StyleSheet.create()
- No CSS inheritance in React Native (styles don't cascade down to children)
- Units are unitless (no px, em, rem, etc.) - numbers represent density-independent pixels
- Some style properties are platform-specific

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  }
});
```

<blockquote><details>
The styling approach in React Native differs significantly from web development. By using JavaScript objects for styles, React Native provides type safety and better performance compared to CSS strings. The StyleSheet API offers several advantages: it validates styles at compile time, optimizes the styles by ID rather than recomputing them on each render, and provides clearer error messages.

The absence of style inheritance promotes explicit styling, which makes components more predictable and self-contained. This approach aligns with React's component-based architecture, where each component should ideally be responsible for its own appearance.

The unitless measurement system simplifies cross-platform development by abstracting away device pixel densities. Instead of dealing with physical pixels, developers work with logical pixels (or "density-independent pixels") that automatically adapt to different screen densities.
</details></blockquote>

---

## Key Takeaways: Flexbox Layout

- Flexbox is the primary layout system in React Native
- Default flexDirection is 'column' (unlike web CSS's 'row')
- Use flex: 1 to make components expand to fill available space
- justifyContent controls alignment along the main axis
- alignItems controls alignment along the cross axis
- flexWrap: 'wrap' allows items to flow to the next line

<blockquote><details>
Flexbox is particularly well-suited for mobile interfaces as it allows for flexible layouts that can adapt to different screen sizes. Understanding the core concepts of flex direction, justification, and alignment is essential for creating responsive layouts in React Native.

A key difference from web development is the default flex direction being 'column' rather than 'row'. This change reflects the typical mobile interface pattern of stacking elements vertically rather than horizontally.

The flex property is one of the most commonly used properties in React Native layouts. Setting a component's flex value to 1 makes it expand to fill all available space in its container. When multiple siblings have flex values, they divide the space proportionally according to their flex values.

React Native's implementation of Flexbox is largely consistent with the web standard, but with some optimizations for mobile. Learning these differences helps prevent confusion when transitioning between web and mobile development.
</details></blockquote>

---

## Key Takeaways: Responsive Design

- Use Dimensions API to get screen dimensions (`Dimensions.get('window')`)
- Use useWindowDimensions hook for dynamic updates on orientation changes
- Calculate sizes proportionally rather than using fixed values
- Create utility functions for responsive sizing
- Test on multiple screen sizes and orientations
- Use flexbox for layouts that need to adapt to available space

<blockquote><details>
Responsive design is critical in React Native due to the wide variety of mobile device screen sizes and orientations. The Dimensions API and useWindowDimensions hook provide tools to adapt layouts based on the current screen dimensions.

The useWindowDimensions hook is particularly valuable as it automatically updates when dimensions change (such as during device rotation), while the Dimensions API provides a static snapshot at the time it's called.

Percentage-based calculations (like calculating a width as 80% of the screen width) are a powerful technique for creating elements that scale proportionally across different device sizes. Creating utility functions that handle these calculations makes responsive design more systematic and maintainable.

When building responsive interfaces, consider three key approaches:
1. Relative sizing using percentages of screen dimensions
2. Flexible layouts using flexbox
3. Conditional layouts that change structure based on available space

A systematic approach to responsive design ensures your application provides a consistent user experience across the diverse ecosystem of mobile devices.
</details></blockquote>

---

## Key Takeaways: Platform-Specific Styling

- Use Platform.OS to conditionally apply styles
- Use Platform.select() for cleaner multi-platform styles
- Create platform-specific files with .ios.js and .android.js extensions
- Follow platform UI guidelines for native look and feel
- Consider platform differences in shadows, typography, and animations

```tsx
const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

<blockquote><details>
While React Native's philosophy is "learn once, write anywhere," respecting platform-specific design conventions leads to applications that feel native on each platform. The Platform module provides tools to customize components and styles for different platforms.

Platform-specific styling is particularly important for elements like buttons, form inputs, and navigation patterns, where users have strong expectations based on their platform's conventions. iOS users expect certain visual cues and behaviors that differ from Android users' expectations.

Shadows are a notable area of platform difference. iOS uses a true shadow system with shadowColor, shadowOffset, shadowOpacity, and shadowRadius properties, while Android uses a simpler elevation property. Using Platform.select() allows you to implement appropriate shadows for each platform.

The platform-specific file extension approach (.ios.js/.android.js) is powerful for components that need significantly different implementations on each platform. When importing these components, React Native automatically selects the right version based on the platform, keeping your component usage consistent throughout your codebase.

Finding the right balance between cross-platform consistency and platform-specific adaptation is key to creating applications that are both efficient to develop and pleasant to use.
</details></blockquote>

---

## Key Takeaways: Shadows and Elevation

- Shadows implementation differs significantly between iOS and Android
- Use Platform.select() to apply appropriate shadows per platform
- Create shadow utility functions for consistent usage
- Consider shadow intensity for visual hierarchy
- Test shadows on both platforms - they may need adjustments
- Combine shadows with borderRadius for best visual effect

<blockquote><details>
Shadows are essential for creating depth and establishing visual hierarchy in mobile interfaces. However, their implementation differs significantly between platforms.

For iOS, shadows are created using a combination of shadowColor, shadowOffset, shadowOpacity, and shadowRadius properties. These properties give fine-grained control over the shadow appearance but require more configuration.

For Android, the elevation property provides a simpler way to create shadows, where higher values create more pronounced shadows. The actual shadow rendering is handled by the Android system according to Material Design guidelines.

When implementing shadows, consider their purpose in your interface - they should guide users by indicating which elements are interactive or prominent. Too many shadows can create visual noise, while too subtle shadows may not effectively convey depth.

A common pattern is to create shadow utility functions or objects that provide consistent shadow levels (light, medium, heavy) across your application, implemented appropriately for each platform.

Performance is also an important consideration with shadows, especially on Android where elevation can impact rendering performance. Use shadows judiciously, particularly in lists or scrolling interfaces.
</details></blockquote>

---

## Key Takeaways: Animation

- Use the Animated API for most animation needs
- Enable useNativeDriver where possible for performance
- Master core animation types: timing, spring, and decay
- Combine animations with Animated.sequence and Animated.parallel
- Use interpolation to transform animation values
- PanResponder enables gesture-driven animations
- Consider performance implications, especially for complex animations

<blockquote><details>
Animations add life to mobile interfaces, providing feedback, guiding attention, and creating engaging user experiences. React Native's Animated API provides a powerful system for creating fluid animations.

The useNativeDriver option is critical for animation performance. When enabled, it allows animations to run on the native thread rather than the JavaScript thread, resulting in smoother animations that aren't affected by JavaScript thread blocking. However, it only works with non-layout properties like opacity and transforms.

Different animation types serve different purposes:
- Timing animations (with Animated.timing) provide precise control over duration and easing
- Spring animations (with Animated.spring) create natural-feeling motion with bounce and tension
- Decay animations (with Animated.decay) simulate momentum and gradual slowing

Interpolation is a powerful feature that transforms animation values from one range to another, enabling complex effects like color transitions, rotation, or non-linear scaling.

In medication tracking applications, animations can serve important functional purposes:
- Highlighting when a medication is due or has been taken
- Providing satisfying feedback when completing important actions
- Drawing attention to critical information
- Creating intuitive gesture interactions (like swipe-to-mark-complete)

The key to effective animation is subtlety - animations should enhance the user experience without becoming distracting or delaying interaction.
</details></blockquote>

---

## Key Takeaways: Custom UI Components

- Build reusable components with consistent props APIs
- Use TypeScript interfaces to define component props
- Implement variants through props (size, color, etc.)
- Compose complex components from simpler ones
- Handle platform differences inside components
- Document components with examples and prop descriptions
- Consider accessibility in component design

<blockquote><details>
Custom UI components are the building blocks of React Native applications. A well-designed component library improves development speed, maintains consistency, and enhances user experience.

The key to effective component design is finding the right balance between flexibility and simplicity. Components should be flexible enough to handle various use cases but simple enough to use without excessive configuration.

TypeScript interfaces provide significant benefits for component libraries by:
- Clearly documenting the expected props and their types
- Providing autocompletion in code editors
- Catching type errors during development
- Making refactoring safer

Variant props (like size="small" or variant="primary") allow a single component to adapt to different contexts while maintaining a consistent API. This approach reduces the number of similar components needed and makes the component library easier to learn and use.

Composition is a powerful pattern where complex components are built from simpler ones. For example, a MedicationCard component might compose Button, Badge, and Text components. This approach promotes reuse and maintainability.

Accessibility considerations should be built into components from the start, including:
- Appropriate touch target sizes
- Semantic accessibilityLabel and accessibilityHint values
- Support for screen readers
- Sufficient color contrast

In a pharmacy application context, well-designed components ensure that critical medication information is clearly presented, interactive elements are intuitive, and the interface adapts appropriately to different devices and user preferences.
</details></blockquote>

---

## Key Takeaways: Theme Systems

- Centralize design tokens (colors, spacing, typography)
- Use React Context API for theme distribution
- Support light/dark modes and custom themes
- Use semantic naming for colors (primary, error) not visual names (blue, red)
- Create theme-aware components that adapt to theme changes
- Consider system theme preferences with useColorScheme()

<blockquote><details>
A theme system centralizes design decisions and ensures consistency throughout an application. In React Native, implementing a theme involves creating a structure of design tokens and a mechanism to distribute those tokens to components.

Design tokens are named values that represent design decisions - like colors, spacing, typography, and border radii. By referencing tokens instead of hard-coded values, components maintain consistency and can adapt to theme changes.

The React Context API provides an efficient way to distribute theme values throughout an application without prop drilling. When the theme changes, all components that consume the theme context will automatically update.

Supporting both light and dark modes is increasingly important for user experience and accessibility. A well-designed theme system makes this relatively straightforward by swapping color palettes while maintaining the same structure.

Semantic naming is crucial for maintainable themes. Names like "primary" or "error" communicate purpose rather than appearance, making it easier to change the visual design without updating references throughout the codebase.

In healthcare applications like medication trackers, theming can serve important purposes beyond aesthetics:
- Differentiating medication types through consistent color coding
- Using appropriate colors for alerts, warnings, and confirmations
- Providing high-contrast options for users with visual impairments
- Supporting dark mode for nighttime medication tracking

A robust theme system is an investment that pays dividends throughout the application lifecycle, making both initial development and future redesigns more efficient.
</details></blockquote>

---

## Best Practices for React Native Styling

1. **Create a design system** with consistent tokens for colors, spacing, and typography

2. **Compose styles with arrays** to combine and override styles dynamically
   ```tsx
   <View style={[styles.base, isActive && styles.active]} />
   ```

3. **Extract reusable styles** into their own StyleSheet objects or components

4. **Apply responsive patterns** to adapt to different screen sizes and orientations

5. **Handle platform differences** with Platform-specific code

6. **Use flexbox** for layout rather than absolute positioning when possible

7. **Implement a theme system** early in development

8. **Optimize animations** with useNativeDriver where possible

9. **Test on multiple devices** to ensure consistent appearance

10. **Consider accessibility** in your styling choices (contrast, touch targets)

<blockquote><details>
These best practices represent lessons learned from real-world React Native development. Following them can help avoid common pitfalls and create more maintainable applications.

Building on a solid design system from the start prevents inconsistencies that become harder to fix as an application grows. It's much easier to establish patterns early than to refactor them later.

Style composition through arrays is a powerful pattern that enables conditional styling without complex logic. It keeps the styling code clean and readable while providing flexibility.

Responsive design should be a core consideration from the beginning, not an afterthought. Testing on various device sizes throughout development helps catch layout issues early.

The differences between iOS and Android can be subtle but important. Taking the time to handle platform-specific styling creates a more polished, native-feeling application on each platform.

Performance considerations are particularly important for animations and complex interfaces. Using techniques like useNativeDriver for animations and avoiding unnecessary re-renders can significantly impact the user experience.

Accessibility is often overlooked but is essential for reaching all users. Simple considerations like sufficient color contrast, appropriate text sizing, and adequate touch targets make your application usable by people with different abilities.

In a medication tracking application context, these best practices ensure that critical health information is presented clearly and consistently across devices, that interactions are intuitive and responsive, and that the application is usable by people with diverse needs and preferences.
</details></blockquote>

---

## Common Pitfalls to Avoid

1. **Hardcoding dimensions** instead of using responsive approaches

2. **Overusing absolute positioning** which can break on different screen sizes

3. **Neglecting platform differences** in shadows, typography, and interaction patterns

4. **Creating deeply nested styles** that become hard to maintain

5. **Ignoring performance implications** of complex styles and animations

6. **Inconsistent styling** across components due to lack of a design system

7. **Poor color contrast** that affects readability and accessibility

8. **Fixed layouts** that don't adapt to orientation changes

<blockquote><details>
These common pitfalls represent challenges that many React Native developers encounter. Being aware of them can help you avoid these issues in your own projects.

Hardcoded dimensions are one of the most common styling mistakes. A component that looks perfect on one device may be cut off or disproportionate on another if dimensions are fixed rather than responsive.

Absolute positioning can be appropriate for certain UI elements, but overusing it often leads to layouts that don't adapt well to different screen sizes or orientations. Flexbox provides a more robust approach for most layout needs.

Platform differences may seem subtle but significantly impact the user experience. Users have built-in expectations about how interfaces should look and behave on their platform, and violating these expectations can create friction.

Style organization becomes increasingly important as applications grow. Deeply nested or overly complex styles become difficult to understand and maintain. Breaking styles into logical, reusable pieces helps manage this complexity.

Performance issues often arise from expensive style calculations or animations running on the JavaScript thread. Testing on lower-end devices can reveal performance problems that might not be apparent during development on high-end devices.

In health-related applications like medication trackers, these pitfalls can have more serious consequences. Poor readability might cause medication dosage mistakes, while inconsistent UI patterns could lead to confusion for users who rely on the application for health management.
</details></blockquote>

---

## Resources for Further Learning

- [React Native Official Documentation - Style](https://reactnative.dev/docs/style)
- [React Native Official Documentation - Flexbox](https://reactnative.dev/docs/flexbox)
- [React Native Official Documentation - Animations](https://reactnative.dev/docs/animations)
- [Styled Components Documentation](https://styled-components.com/docs/basics#react-native)
- [React Native Paper (Material Design components)](https://callstack.github.io/react-native-paper/)
- [React Native Elements](https://reactnativeelements.com/)
- [Human Interface Guidelines (iOS)](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Guidelines (Android)](https://material.io/design)

<blockquote><details>
Continuing your learning journey in React Native styling is important as the ecosystem evolves and new best practices emerge. These resources provide in-depth information on specific aspects of React Native styling and UI development.

The official React Native documentation should be your first stop for authoritative information on core concepts like style properties, flexbox, and the Animated API. It provides comprehensive explanations and examples.

Component libraries like React Native Paper and React Native Elements offer pre-built, customizable components that follow platform design guidelines. These can accelerate development while maintaining a professional appearance.

Platform design guidelines from Apple and Google provide valuable insights into platform-specific conventions and user expectations. Understanding these guidelines helps create interfaces that feel native and intuitive to users.

Styled Components offers an alternative styling approach that many developers prefer for its CSS-like syntax and component-centric nature. Its documentation covers React Native-specific usage and patterns.

Beyond these resources, the React Native community is active and helpful. Platforms like GitHub, Stack Overflow, and various Discord communities can provide assistance with specific styling challenges.

Continuous learning and experimentation are key to mastering React Native styling. The landscape evolves as new versions are released and community patterns emerge, making ongoing education an important part of React Native development.
</details></blockquote>

---

## Conclusion

Styling in React Native combines concepts from web development with mobile-specific patterns to create interfaces that are both visually appealing and performant across devices.

By mastering the core concepts covered in this module:
- Flexbox layouts
- Responsive design
- Platform-specific adaptations
- Custom components
- Theming systems
- Animation techniques

You'll be equipped to create professional, user-friendly interfaces for your React Native applications.

Remember that great UIs combine technical implementation with thoughtful design - focus on creating interfaces that serve user needs while maintaining consistency, responsiveness, and platform appropriateness.

<blockquote><details>
The journey to mastering React Native styling is ongoing, as the platform continues to evolve and user expectations advance. The most successful React Native developers combine technical knowledge with design sensibility, creating interfaces that are not only functional but also delightful to use.

When approaching a new React Native project, start by establishing a solid foundation:
1. Define a design system with consistent tokens
2. Create base components that implement your design language
3. Build responsive layouts that adapt to different devices
4. Implement a theme system that supports user preferences
5. Add thoughtful animations that enhance rather than distract

In healthcare applications like medication trackers, effective styling is not just about aesthetics - it directly impacts the application's usefulness and potentially affects health outcomes. Clear typography enhances readability of critical medication information, consistent interactive patterns reduce mistakes, and appropriate use of color helps users quickly identify medication types or statuses.

As you apply the concepts from this module, remember that the best interfaces often feel invisible - they allow users to accomplish their tasks efficiently without drawing attention to the interface itself. This is especially true in healthcare applications where the focus should be on managing health, not figuring out the application.

By combining technical excellence in React Native styling with user-centered design thinking, you can create applications that stand out in the marketplace and truly serve user needs.
</details></blockquote>