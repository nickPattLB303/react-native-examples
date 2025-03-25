# Module 7: React Native Components and User Input

<link rel="stylesheet" href="../../custom.css">

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

<blockquote><details>

React Native bridges the gap between React's component-based architecture and native mobile development, offering a powerful framework for building cross-platform mobile applications. This module explores the core building blocks of React Native applications: components and user input handling. Unlike web development where HTML elements form the foundation, React Native uses a set of specialized components that map to native UI elements on iOS and Android. Understanding these components, their TypeScript interfaces, and proper implementation patterns is essential for building professional-quality mobile applications that are both accessible and user-friendly. This knowledge directly builds upon your React fundamentals while introducing mobile-specific concepts and considerations.

</details></blockquote>

---

## Overview

In this module, we'll explore React Native's component system and user input handling. You'll learn how to use core components, handle user interactions, and build custom interfaces with TypeScript that look and feel native on both iOS and Android.

<blockquote><details>

React Native represents a paradigm shift in mobile development by allowing developers to build native mobile applications using JavaScript and React. Unlike hybrid approaches that render in WebViews, React Native translates your JavaScript code and React components into actual native UI elements, providing near-native performance with the development efficiency of React.

At the heart of React Native are its components—specialized building blocks that correspond to native UI elements. These components range from basic elements like View (similar to div in web) and Text, to interactive components like TextInput and Button, to complex components that handle scrolling, lists, and touch interactions.

Understanding these components and how they differ from web elements is crucial. For instance, in React Native, you can't use div, span, or p tags. Instead, you use View for layout containers and Text for displaying text content—you can't even put plain text directly inside a View! These fundamental differences reflect the constraints and capabilities of mobile platforms.

User input handling in React Native also differs from web development. Touch interactions replace mouse events, and specialized components like TouchableOpacity and Pressable provide control over how users interact with your application. Mastering these interaction patterns is essential for creating intuitive, responsive mobile experiences.

By the end of this module, you'll have a comprehensive understanding of React Native's component system and user input handling. You'll be equipped to build interfaces that not only look native but also behave naturally on iOS and Android platforms while maintaining the type safety and clarity that TypeScript provides.

</details></blockquote>

---

## Learning Objectives

By the end of this module, you will be able to:

- Understand and implement core React Native components with TypeScript
- Handle user input effectively through specialized components
- Build custom, reusable components with proper typing
- Implement forms with type-safe validation
- Create responsive touch interactions
- Apply accessibility best practices to all components
- Manage platform-specific components and behaviors

<blockquote><details>

These learning objectives are designed to build a comprehensive foundation in React Native component development, with each objective building upon the previous ones to create a complete skill set.

**Understanding core React Native components** is essential because these components replace the HTML elements you're familiar with from web development. Each component has specific props, behaviors, and limitations that you need to understand to build effective interfaces. TypeScript adds an additional layer by providing type definitions that help you use these components correctly.

**Handling user input** in mobile applications differs significantly from web applications. Mobile users interact primarily through touch, and React Native provides specialized components to handle these interactions. You'll learn not just how to capture input but how to provide appropriate feedback and ensure a smooth user experience.

**Building custom components** allows you to create reusable pieces of UI that maintain consistency throughout your application. You'll learn how to properly type these components using TypeScript interfaces, ensuring that other developers (or your future self) can use them correctly without digging through implementation details.

**Form implementation** is a common requirement in mobile applications, especially for data collection. You'll learn how to create type-safe forms that validate user input, provide clear feedback, and handle submission processes effectively.

**Touch interactions** are fundamental to mobile user experience. You'll learn how to implement various touch patterns, from simple taps to complex gestures, ensuring your application feels responsive and intuitive.

**Accessibility** is often overlooked but critical for creating inclusive applications. You'll learn how to make your components usable by people with disabilities, including those who rely on screen readers or have motor impairments.

**Platform-specific considerations** are necessary because iOS and Android have different design guidelines and user expectations. You'll learn strategies for adapting your components to provide a platform-appropriate experience while maintaining a shared codebase.

Together, these objectives will equip you with the knowledge and skills needed to build professional-quality React Native applications that are maintainable, accessible, and provide an excellent user experience across platforms.

</details></blockquote>

---

## Prerequisites

Before starting this module, you should have:

- Completed Module 5: TypeScript Essentials
- Completed Module 6: React Essentials
- Basic understanding of mobile UI concepts

<div class="web-dev">For web developers: Pay close attention to the differences between web and mobile components</div>
<div class="native-dev">For native developers: Focus on how React component patterns apply to native UI elements</div>

<blockquote><details>

This module builds directly upon the foundation established in previous modules, particularly TypeScript Essentials (Module 5) and React Essentials (Module 6). A solid understanding of these topics is crucial because React Native components combine React's component paradigm with TypeScript's type safety to create interfaces for native mobile platforms.

From **Module 5: TypeScript Essentials**, you should be comfortable with:
- Type annotations and interfaces
- Generic types
- Type inference
- Union and intersection types
- Type guards

These TypeScript skills are essential for properly typing components, props, state, and event handlers in React Native. Type safety becomes even more valuable in mobile applications, where runtime errors can be more difficult to debug and deploy fixes for.

From **Module 6: React Essentials**, you should understand:
- Component creation and composition
- Props and state management
- Hooks (especially useState and useEffect)
- Event handling
- Component lifecycle

React Native uses these same patterns but applies them to native components instead of DOM elements. Understanding how data flows through components and how to manage component state is fundamental to building React Native applications.

A **basic understanding of mobile UI concepts** will help you grasp why certain patterns exist in React Native. For example, understanding concepts like touch targets, keyboard behavior, and safe areas will help you build more usable mobile interfaces. You don't need detailed knowledge of iOS or Android development, but familiarity with how mobile apps typically behave will be beneficial.

**For web developers**, the transition to React Native involves learning new components and interaction patterns. While the component-based architecture will feel familiar, you'll need to adjust to the absence of HTML elements and CSS properties, as well as the different way mobile users interact with applications compared to web users.

**For native developers** (iOS or Android), the challenge will be adapting to React's declarative programming model and component lifecycle. While you'll recognize the native UI elements that React Native components map to, you'll need to understand how React manages component rendering and state to effectively build applications.

</details></blockquote>

---

# Section 1: Core React Native Components

---

## Introduction to React Native Components

React Native components map to native UI elements, providing a bridge between JavaScript and native platforms:

- Built on the same principles as React
- Render to native UI elements instead of DOM
- Provide consistent API across platforms
- Implement platform-specific behavior under the hood
- Use a subset of CSS properties for styling

<blockquote><details>

React Native components represent a fundamental shift from web development. While React for web translates your components into DOM elements, React Native translates them into actual native UI components on iOS and Android. This architectural difference means you're working with real native elements, not a web view or HTML/CSS approximation.

Each React Native component corresponds to a specific native UI element on each platform. For example, when you use a `Button` component, React Native creates a `UIButton` on iOS and a `Button` on Android. This "bridge" between JavaScript and native code is what enables React Native to achieve native performance while letting you write cross-platform code.

The component API is intentionally consistent across platforms, meaning you don't need to write separate code for iOS and Android in most cases. However, behind this consistent API, React Native implements platform-specific behavior to ensure components feel native on each platform. For instance, a `Button` might look different on iOS versus Android, matching each platform's design guidelines, even though you use the same component in your code.

Styling in React Native differs significantly from web CSS. React Native uses a subset of CSS properties that can be efficiently mapped to native styling systems, and these styles are applied using JavaScript objects rather than CSS selectors. Properties like `flex`, `margin`, and `padding` work similarly to web, but many web-specific properties are unavailable, and new mobile-specific properties are introduced.

Understanding these foundational differences helps you think in terms of native mobile development patterns rather than trying to force web patterns into a mobile context. As you learn each component, consider its native counterpart and how users expect it to behave on mobile devices rather than comparing it to its closest web equivalent.

</details></blockquote>

---

## View Component

The `View` component is the fundamental building block in React Native:

- Equivalent to `<div>` in web development
- Used for layout, styling, and grouping
- Supports flexbox layout by default
- Container for other components
- Cannot contain text directly (unlike HTML)

```tsx
interface ViewProps extends ViewPropsAndroid, ViewPropsIOS {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  // ... other props
}

// Basic usage
const MedicationCard: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Other components must go here; text must be in a Text component */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
});
```

<blockquote><details>

The `View` component is React Native's most fundamental UI building block and is analogous to a `div` in web development. However, there are significant differences in how it behaves and what it can contain.

A key distinction is that `View` components cannot contain text directly—all text must be wrapped in a `Text` component. This reflects how native platforms separate layout containers from text rendering. Attempting to put raw text directly in a `View` will result in an error:

```tsx
// ❌ Wrong - This will cause an error
<View>
  This text will cause an error
</View>

// ✅ Correct
<View>
  <Text>This text is properly contained</Text>
</View>
```

The `View` component's TypeScript interface reveals the extensive set of properties it accepts. Most importantly, it takes a `style` prop that accepts a `ViewStyle` object or array of style objects. The interface also extends platform-specific props through `ViewPropsAndroid` and `ViewPropsIOS`, allowing access to platform-specific features when needed.

Accessibility properties are crucial for making your application usable by people with disabilities. The `accessible` prop marks a component as an accessibility element, while `accessibilityLabel` provides a description that screen readers can announce. Always include these properties for interactive elements or components that convey important information.

When it comes to layout, `View` uses Flexbox by default, similar to web but with some differences:
- The default flex direction is `column` (not `row` as in web CSS)
- `flexDirection: 'row'` goes left-to-right in both LTR and RTL languages by default (use `relative` values for RTL support)
- All dimensions are unitless and represent density-independent pixels

For styling shadows, notice the platform differences: iOS uses `shadowColor`, `shadowOffset`, `shadowOpacity`, and `shadowRadius`, while Android uses the `elevation` property. This demonstrates a common pattern in React Native where you'll often need to provide different style properties for each platform to achieve the same visual effect.

The `View` component is highly optimized and should be your default choice for layout. While it's tempting to add too many nested `View` components, excessive nesting can impact performance. Consider flattening your component hierarchy when possible for better rendering performance.

</details></blockquote>

---

## Text Component

The `Text` component is used for displaying text:

- Required for any textual content
- Can be nested with different styles
- Supports limited inheritance of text styles
- Has specialized props for text handling

```tsx
interface TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  // ... other props
}

// Basic usage
const MedicationLabel: React.FC<{ 
  name: string; 
  dosage: string;
  instructions?: string;
}> = ({ name, dosage, instructions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name} accessibilityRole="header">
        {name}
      </Text>
      <Text style={styles.dosage}>
        Dosage: <Text style={styles.highlight}>{dosage}</Text>
      </Text>
      {instructions && (
        <Text style={styles.instructions} numberOfLines={2} ellipsizeMode="tail">
          Instructions: {instructions}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dosage: {
    fontSize: 16,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#0066cc',
  },
  instructions: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
});
```

<blockquote><details>

The `Text` component is essential in React Native as it's the only component that can directly render text strings. This is a major departure from web development, where text can be placed directly inside most HTML elements. In React Native, every piece of text must be wrapped in a `Text` component.

The TypeScript interface for `Text` reveals its specialized text-handling capabilities. The `style` prop accepts a `TextStyle` object, which extends `ViewStyle` with additional text-specific properties like `fontSize`, `fontWeight`, `lineHeight`, and `textAlign`. This inheritance means `Text` components can use both layout properties (like `margin` and `padding`) and text-specific properties.

One powerful feature of `Text` is the ability to nest it within other `Text` components to create complex formatted text:

```tsx
<Text>
  Normal text, <Text style={{ fontWeight: 'bold' }}>bold text</Text>, and
  <Text style={{ fontStyle: 'italic' }}>italic text</Text>.
</Text>
```

Unlike most other React Native components, `Text` allows limited style inheritance between parent and child `Text` components. For example, a `fontSize` set on a parent `Text` will affect all child `Text` components unless they override it with their own `fontSize`. This inheritance only works between `Text` components, not between `View` and `Text`.

The `numberOfLines` and `ellipsizeMode` props provide control over text truncation, which is common in mobile interfaces where space is limited. The example uses `numberOfLines={2}` to limit the instructions to two lines, with `ellipsizeMode="tail"` to add ellipsis at the end if the text is too long.

The `onPress` prop makes `Text` components touchable without needing to wrap them in a touchable component. This is useful for simple interactions like opening a link or showing more details, but for complex interactions or better visual feedback, wrapping in a `TouchableOpacity` is preferred.

Accessibility is crucial for text elements. The `accessibilityRole="header"` in the example tells screen readers that the medication name is a header, providing better context for visually impaired users. The `accessible` and `accessibilityLabel` props can also be used to provide custom descriptions for screen readers.

When working with `Text`, consider these best practices:
- Keep text components relatively shallow in nesting to maintain performance
- Use consistent text styles throughout your app for better readability
- Consider using a custom `Text` component that wraps the native one to enforce consistent styling and behavior
- Remember that text layout calculations are relatively expensive on mobile, so minimize text changes during animations

The example demonstrates a common pattern for medication labels, with a prominent title, structured dosage information, and conditionally rendered instructions that truncate if too long. This pattern works well for displaying structured text information in a space-efficient manner.

</details></blockquote>

---

## Image Component

The `Image` component displays images from various sources:

- Renders images from local or remote sources
- Requires explicit dimensions (width/height)
- Provides various resizing and scaling modes
- Supports loading indicators and fallbacks

```tsx
interface ImageProps {
  source: ImageSourcePropType; // { uri: string } or require('./image.png')
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  onLoad?: () => void;
  onError?: (error: any) => void;
  accessible?: boolean;
  accessibilityLabel?: string;
  // ... other props
}

// Using different image sources
const MedicationImage: React.FC<{
  medicationId: string;
  fallbackImage?: ImageSourcePropType;
}> = ({ medicationId, fallbackImage }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Remote image source (from API)
  const remoteSource = { 
    uri: `https://api.medications.example/images/${medicationId}.jpg`
  };
  
  // Local image source (bundled with app)
  const defaultSource = fallbackImage || require('./assets/default-medication.png');
  
  return (
    <View style={styles.container}>
      <Image
        source={error ? defaultSource : remoteSource}
        style={styles.image}
        resizeMode="contain"
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        accessible={true}
        accessibilityLabel={`Image of medication ${medicationId}`}
      />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#0066cc" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
```

<blockquote><details>

The `Image` component in React Native handles displaying images, but works quite differently from HTML's `<img>` tag. Understanding these differences is crucial for effective image handling in your applications.

A key distinction is that React Native requires you to explicitly set dimensions for images through the `style` prop. Without specified dimensions, images won't display properly because React Native can't automatically determine the image size before loading, unlike web browsers.

The `source` prop accepts either a remote image object with a URI or a local image reference. Local images must be imported using `require()`, which ensures they're included in your application bundle during the build process. This static approach means you can't use dynamic strings for local image paths:

```tsx
// ❌ Wrong - Dynamic paths don't work for local images
const imagePath = './assets/medications/' + medicationId + '.png';
<Image source={require(imagePath)} /> // This will fail!

// ✅ Correct - Use remote URI for dynamic paths
<Image source={{ uri: `https://api.example.com/medications/${medicationId}.png` }} />
```

The example demonstrates a robust pattern for handling remote images with loading states and fallbacks. It uses several key features:
- Loading indicators via `onLoadStart` and `onLoad` events
- Error handling with `onError` to show a fallback image
- The `resizeMode` prop to control how the image fits its container
- Proper accessibility properties to describe the image for screen readers

The `resizeMode` prop provides control over how images fit within their containers:
- `'cover'`: Scales the image to cover the entire container, potentially cropping parts
- `'contain'`: Scales the image to fit entirely within the container, potentially leaving empty space
- `'stretch'`: Stretches the image to fit exactly, potentially distorting it
- `'center'`: Centers the image without scaling (unless necessary)
- `'repeat'`: Repeats the image to fill the container (for pattern backgrounds)

For performance, React Native includes several optimizations in the `Image` component:
- Automatic image caching
- Prioritized loading of on-screen images
- Background downloading to prevent UI blocking

When working with images in production applications, consider these best practices:
- Provide appropriate image sizes for different device resolutions
- Consider using the `fastImage` library for advanced caching in production apps
- Use appropriate image formats (JPEG for photos, PNG for graphics with transparency)
- Include meaningful `accessibilityLabel` props for all images that convey information
- Set placeholder backgrounds or loading indicators to prevent layout shifts

The example uses a common pattern for medication images, providing a consistent container size with proper error handling and loading states, ensuring a smooth user experience even when network connectivity is unreliable or images are unavailable.

</details></blockquote>

---

## ScrollView Component

The `ScrollView` component provides a scrollable container:

- Used for scrollable content when the content size is known
- Renders all child components at once
- Supports both vertical and horizontal scrolling
- Provides scroll events and methods

```tsx
interface ScrollViewProps extends ScrollViewPropsAndroid, ScrollViewPropsIOS {
  contentContainerStyle?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEnabled?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  // ... other props
}

// Usage for medication information
const MedicationDetails: React.FC<{ medication: Medication }> = ({ medication }) => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      accessible={true}
      accessibilityLabel="Medication details"
    >
      <Text style={styles.title}>{medication.name}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dosage</Text>
        <Text>{medication.dosage} {medication.unit}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text>{medication.instructions}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Side Effects</Text>
        {medication.sideEffects.map((effect, index) => (
          <Text key={index} style={styles.listItem}>• {effect}</Text>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Warnings</Text>
        <Text>{medication.warnings}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text>{medication.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0066cc',
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 8,
  },
});
```

<blockquote><details>

The `ScrollView` component provides scrolling capabilities for content that exceeds the screen dimensions. Unlike web scrolling, which happens automatically when content overflows, React Native requires explicit use of scrollable containers. `ScrollView` is the most basic of these containers and is suitable for scenarios where the total content size is known and relatively small.

The TypeScript interface reveals important props that control scrolling behavior:
- `contentContainerStyle` applies styles specifically to the scrollable content container, while `style` applies to the outer scroll view wrapper
- `horizontal` enables horizontal scrolling instead of the default vertical orientation
- `showsHorizontalScrollIndicator` and `showsVerticalScrollIndicator` control the visibility of scroll indicators
- `onScroll` provides events as the user scrolls, allowing for custom animations or logic
- `scrollEnabled` lets you conditionally enable or disable scrolling

The example demonstrates a common pattern for displaying detailed medication information in a vertical scrollable container. Each section is clearly separated with consistent styling, making it easy for users to scan through different aspects of the medication.

Some important considerations when using `ScrollView`:
1. **Memory Usage**: `ScrollView` renders all its child components at once, even if they're not currently visible on screen. This makes it unsuitable for long lists or content of unknown size where `FlatList` would be more appropriate.

2. **Performance**: Because all content is rendered at once, complex ScrollViews with many components can impact performance, especially during initial loading. Consider breaking extremely large content into separate screens or using pagination.

3. **Nested ScrollViews**: Nesting ScrollViews (e.g., a horizontal ScrollView inside a vertical one) requires careful configuration of the `nestedScrollEnabled` prop to ensure proper gesture handling.

4. **Keyboard Handling**: When forms are within a ScrollView, use `keyboardShouldPersistTaps="handled"` to allow tapping on the ScrollView without dismissing the keyboard.

For optimal accessibility, the example includes the `accessible` and `accessibilityLabel` props. Screen readers can announce the presence of scrollable content and handle navigation appropriately. The `ScrollView` component allows users to navigate through page-sized chunks of content when using screen readers.

The styling approach shown separates the container styling (which controls the overall dimensions and background) from the content container styling (which controls padding and spacing). This separation is a common pattern in React Native to achieve scrollable content with appropriate padding without affecting the scroll view boundaries.

In production applications, you might enhance this pattern with:
- Pull-to-refresh functionality using the `refreshControl` prop
- Scroll performance optimizations like `removeClippedSubviews`
- Custom scroll behavior with `scrollEventThrottle` and `onScroll`
- Programmatic scrolling with methods like `scrollTo` accessed via refs

</details></blockquote>

---

## FlatList Component

The `FlatList` component efficiently renders large lists:

- Only renders items currently visible on screen
- Requires data array and renderItem function
- Optimized for performance with large datasets
- Provides built-in pull-to-refresh and load more functionality

```tsx
interface FlatListProps<ItemT> {
  data: ReadonlyArray<ItemT>;
  renderItem: ListRenderItem<ItemT>;
  keyExtractor?: (item: ItemT, index: number) => string;
  ItemSeparatorComponent?: React.ComponentType<any>;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement;
  onRefresh?: () => void;
  refreshing?: boolean;
  horizontal?: boolean;
  // ... other props
}

// Medication list with FlatList
interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  remaining: number;
}

const MedicationList: React.FC<{ 
  medications: Medication[];
  onSelectMedication: (medication: Medication) => void;
}> = ({ medications, onSelectMedication }) => {
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch updated medication data
    setTimeout(() => setRefreshing(false), 1500); // Simulate network request
  };
  
  const renderItem = ({ item }: { item: Medication }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => onSelectMedication(item)}
      accessible={true}
      accessibilityLabel={`${item.name}, ${item.dosage}, ${item.schedule}`}
      accessibilityRole="button"
    >
      <View style={styles.itemContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDetails}>{item.dosage} • {item.schedule}</Text>
      </View>
      <View style={[
        styles.remainingIndicator, 
        { backgroundColor: item.remaining <= 5 ? '#fa5035' : '#28c7fa' }
      ]}>
        <Text style={styles.remainingText}>{item.remaining}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={medications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No medications found</Text>
      }
      ListHeaderComponent={
        <Text style={styles.headerText}>Your Medications</Text>
      }
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  remainingIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#28c7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});
```

<blockquote><details>

The `FlatList` component is one of React Native's most important performance optimizations for mobile applications. Unlike `ScrollView`, which renders all items at once, `FlatList` only renders items that are currently visible on the screen (plus a small buffer for smooth scrolling). This "windowing" approach is crucial for efficiently displaying large lists without consuming excessive memory or degrading performance.

The TypeScript interface for `FlatList` is generic, allowing you to specify the type of items in your list. The two required props are:
- `data`: An array of items to render
- `renderItem`: A function that returns a component for each item

In addition, the example demonstrates several optional props that enhance the user experience:
- `keyExtractor`: Provides a unique key for each item (similar to React's key prop)
- `ItemSeparatorComponent`: Renders separators between items
- `ListHeaderComponent`: Renders a header above the list
- `ListEmptyComponent`: Renders when the data array is empty
- `refreshing` and `onRefresh`: Enable pull-to-refresh functionality

The medication list example demonstrates a real-world use case with several important patterns:
1. **Pull-to-refresh**: The `onRefresh` callback updates the `refreshing` state and would typically trigger an API call to fetch fresh data.
2. **Touchable list items**: Each medication is wrapped in a `TouchableOpacity` to handle selection.
3. **Visual indicators**: The remaining pill count uses color coding to highlight low quantities.
4. **Accessibility**: Each list item includes proper accessibility attributes for screen readers.

When working with `FlatList`, consider these best practices:
- Use `keyExtractor` consistently to provide stable, unique keys
- Keep `renderItem` functions lightweight to maintain smooth scrolling
- Avoid complex layouts or heavy computations within list items
- Memoize the `renderItem` function and item components with `React.memo` to prevent unnecessary re-renders
- For very large lists, consider setting `windowSize` and `maxToRenderPerBatch` to fine-tune performance

The styling approach in the example demonstrates:
- Using `contentContainerStyle` for padding without affecting scroll behavior
- Creating visual hierarchy with different text sizes and colors
- Using flexbox for horizontal layout of list items
- Implementing visual indicators with conditional styling based on data

One important benefit of `FlatList` over `ScrollView` is its ability to handle lists of unknown or changing length, making it ideal for displaying data fetched from APIs or databases. The performance advantage becomes more pronounced as the list grows, making `FlatList` the preferred choice for most list implementations in React Native applications.

For more complex scenarios, `FlatList` supports advanced features like:
- Horizontal lists with the `horizontal` prop
- Multi-column grids with the `numColumns` prop
- Infinite scrolling with `onEndReached` and `onEndReachedThreshold`
- Sticky headers with `stickyHeaderIndices`

</details></blockquote>

---

## SafeAreaView Component

The `SafeAreaView` component respects device-specific safe areas:

- Automatically respects notches, home indicators, and system bars
- Ensures content is visible and accessible
- Essential for full-screen applications
- Simple to implement but crucial for professional appearance

```tsx
interface SafeAreaViewProps extends ViewProps {
  // Inherits all View props
}

// Basic usage in a medication app
const MedicationApp: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Med Tracker</Text>
      </View>
      
      <View style={styles.content}>
        {/* Main app content goes here */}
        <Text style={styles.contentText}>Your medications will appear here</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  footerButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

<blockquote><details>

The `SafeAreaView` component is a critical yet simple component that addresses one of the most common UI challenges in modern mobile development: accounting for device-specific safe areas. These safe areas include notches (like on iPhone X and newer), home indicators, status bars, and navigation bars that could otherwise obscure your content.

While the TypeScript interface for `SafeAreaView` is straightforward (it extends `ViewProps` without adding new props), its importance shouldn't be underestimated. The component automatically adds padding or margins as needed to ensure your content doesn't overlap with system UI elements, which varies by device model.

Key characteristics of `SafeAreaView`:
1. **iOS Focus**: The component primarily addresses iOS safe areas. On Android, it currently acts as a regular `View` unless you're using a library like `react-native-safe-area-context` that extends its functionality.
2. **Nested Behavior**: You can nest `SafeAreaView` components, with each respecting the safe area insets at its level in the hierarchy.
3. **Style Inheritance**: Like `View`, it accepts all standard style properties and passes them through.

The example demonstrates a common app layout pattern with:
- A fixed header at the top
- Scrollable main content in the middle
- A fixed action button in the footer

This structure ensures that:
- The header respects the top safe area (avoiding notches and status bars)
- The footer respects the bottom safe area (avoiding home indicators)
- The main content area can scroll safely between these fixed elements

For more advanced safe area handling, especially for cross-platform consistency, consider using the `react-native-safe-area-context` library, which provides:
- More granular control over individual insets (top, bottom, left, right)
- Hooks like `useSafeAreaInsets()` to access inset values programmatically
- Equal functionality across iOS and Android
- Support for landscape mode and multitasking

When using `SafeAreaView` in production apps:
- Place it at the root of your screen components for consistent behavior
- Remember it only affects the padding in the direction of the safe area insets
- For colored safe areas, ensure your background colors extend to the edge of the screen
- Test on multiple device types, as safe areas vary significantly between models

The example medication app structure showcases how `SafeAreaView` integrates into a complete screen layout. The header and footer components are positioned at the extremes of the screen, where they would potentially encounter safe area issues, while the flexible content area fills the remaining space and can scroll if necessary.

</details></blockquote>

---

## Component Composition Patterns

Build complex UIs by combining core components:

- Nest components for layout hierarchy
- Combine multiple core components for complex interfaces
- Use consistent styling patterns
- Create reusable component compositions

```tsx
// Medication detail card combining multiple components
const MedicationDetailCard: React.FC<{
  medication: {
    id: string;
    name: string;
    dosage: string;
    description: string;
    imageUri?: string;
    schedule: { time: string; taken: boolean }[];
  }
}> = ({ medication }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.dosage}>{medication.dosage}</Text>
        </View>
        
        {medication.imageUri ? (
          <Image 
            source={{ uri: medication.imageUri }} 
            style={styles.image}
            accessibilityLabel={`Image of ${medication.name}`}
          />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>
              {medication.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      
      <Text style={styles.description}>{medication.description}</Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.scheduleTitle}>Today's Schedule</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scheduleContainer}
      >
        {medication.schedule.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.scheduleItem, 
              item.taken && styles.scheduleTaken
            ]}
          >
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <Text style={styles.scheduleStatus}>
              {item.taken ? 'Taken' : 'Due'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dosage: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholderImage: {
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288d1',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  scheduleContainer: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  scheduleItem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
    padding: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleTaken: {
    backgroundColor: '#e6f4ea',
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scheduleStatus: {
    fontSize: 12,
    color: '#666',
  },
});
```

<blockquote><details>

Component composition is a fundamental pattern in React Native development that involves combining smaller, focused components to build complex, feature-rich interfaces. The example demonstrates this principle by creating a comprehensive medication detail card that combines several core React Native components:
- `View` for layout structure
- `Text` for various content displays
- `Image` for the medication image
- `ScrollView` for the horizontal schedule list

This composite component showcases several important React Native patterns:

**1. Responsive Layouts with Flexbox**
The component uses `flexDirection: 'row'` in the header to position the title information and image side by side. The `flex: 1` on the title container ensures it takes up all available space not used by the image, making the layout responsive to different content lengths and screen sizes.

**2. Conditional Rendering**
The component conditionally renders either an image or a placeholder based on the availability of `imageUri`. This pattern ensures the UI remains consistent even when data is incomplete:
```tsx
{medication.imageUri ? (
  <Image source={{ uri: medication.imageUri }} style={styles.image} />
) : (
  <View style={[styles.image, styles.placeholderImage]}>
    <Text style={styles.placeholderText}>
      {medication.name.substring(0, 2).toUpperCase()}
    </Text>
  </View>
)}
```

**3. Dynamic Styling**
The schedule items change appearance based on their state (taken or due) through conditional style application:
```tsx
<View 
  style={[
    styles.scheduleItem, 
    item.taken && styles.scheduleTaken
  ]}
>
```
This pattern of combining base styles with conditional modifiers is both performant and maintainable.

**4. Nested Scrolling**
The horizontal `ScrollView` for the schedule demonstrates how scrollable areas can be nested within larger components. This allows for complex interaction patterns without overwhelming the main screen layout.

**5. Visual Hierarchy**
The component creates clear visual hierarchy through:
- Typography variation (size, weight, color)
- Spatial organization (grouping, spacing)
- Visual dividers
- Color coding for status indication

From an architectural perspective, this component demonstrates proper component encapsulation. It:
- Takes a clearly defined prop (`medication` with a specific shape)
- Manages its internal layout and styling
- Provides a complete UI element ready to be used in larger screen compositions

In production applications, you might extend this pattern by:
- Extracting reusable sub-components (like `ScheduleItem` or `MedicationImage`)
- Adding interaction handlers for various actions
- Implementing memoization with `React.memo` to prevent unnecessary re-renders
- Adding accessibility features like proper focus management and announcements

The styling approach uses a combination of design patterns:
- Card-based design with shadow/elevation for depth
- Consistent spacing through margin and padding
- Color coding for status indication (blue for upcoming, green for completed)
- Responsive layout that adapts to content size

This component exemplifies how composition allows you to build complex, maintainable interfaces in React Native while keeping individual components focused and reusable.

</details></blockquote>

---

# Section 2: User Input Components

---

## TextInput Component

The `TextInput` component handles text entry:

- Supports single and multi-line text input
- Provides various keyboard types and autocomplete behaviors
- Enables controlled input with state management
- Offers platform-specific features through props

```tsx
interface TextInputProps extends TextInputPropsAndroid, TextInputPropsIOS {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | /* other types */;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  style?: StyleProp<TextStyle>;
  // ... other props
}

// Medication search input
const MedicationSearch: React.FC<{
  onSearch: (query: string) => void;
}> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search medications..."
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing" // iOS only
          accessibilityLabel="Search medications"
          accessibilityHint="Enter medication name to search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => handleSearch('')}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
});
```

<blockquote><details>

The `TextInput` component is one of the most important and complex components in React Native as it handles all text entry in your application. Unlike web development where you have different input types like `<input>` and `<textarea>`, React Native uses a single `TextInput` component with various props to configure its behavior.

The TypeScript interface reveals the extensive configurability of `TextInput`, with dozens of props that control everything from appearance to behavior. The most essential props include:
- `value` and `onChangeText` for controlled input management
- `placeholder` and `placeholderTextColor` for input hints
- `secureTextEntry` for password fields
- `multiline` for multi-line input
- `keyboardType` for specialized keyboards (numeric, email, etc.)
- `autoCapitalize` and `autoCorrect` for text entry behavior

The example demonstrates a search input pattern common in medication applications. It implements the controlled component pattern, where the component's state (via `useState`) manages the input value. This approach gives you complete control over the input value, allowing for features like:
- Real-time filtering as the user types
- Input validation and formatting
- Conditional rendering based on input state

The code includes several platform-specific considerations:
- `clearButtonMode="while-editing"` for iOS, which adds a clear button inside the input
- A custom clear button for Android compatibility
- `returnKeyType="search"` to show a search action on the keyboard

Accessibility is crucial for text inputs, and the example includes:
- `accessibilityLabel` to describe the input's purpose
- `accessibilityHint` to provide additional context about the input's function
- Proper labeling for the clear button

When working with `TextInput` in production applications, consider these best practices:
1. **Always use controlled inputs** for predictable behavior and integration with form state
2. **Set appropriate keyboard types** to improve user experience (e.g., numeric keyboard for dosage input)
3. **Handle focus management** for form navigation, potentially using `useRef` and methods like `focus()`
4. **Implement proper validation** with visual feedback for user errors
5. **Consider platform differences**, especially for text selection, autocomplete, and keyboard behavior

Android and iOS have some notable differences in `TextInput` behavior:
- Android shows underline by default, iOS doesn't
- iOS has built-in clear button options, Android doesn't
- Android handles multiline differently than iOS
- Selection handling and cursors differ between platforms

For complex forms, consider extracting your input pattern to a reusable custom component that encapsulates:
- Consistent styling
- Label and error display
- Platform-specific adaptations
- Common validation patterns

The example's styling creates a modern search input with:
- Custom background and border radius
- Flexible width using flex layout
- Sufficient height and padding for touch targets
- Visually-distinct clear button with appropriate padding

This combination of controlled state, appropriate props, and careful styling creates a polished, user-friendly search input suitable for medication applications.

</details></blockquote>

---

## Switch Component

The `Switch` component provides a toggle input:

- Simple boolean on/off selection
- Follows platform-specific design guidelines
- Animates state transitions
- Supports custom colors (with platform differences)

```tsx
interface SwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  thumbColor?: string; // Android only
  trackColor?: { false: string; true: string }; // Different colors for on/off states
  ios_backgroundColor?: string; // iOS only - background when off
  accessibilityLabel?: string;
  // ... other props
}

// Medication reminder toggle
const MedicationReminder: React.FC<{
  medication: { id: string; name: string; };
  enabled: boolean;
  onToggle: (medicationId: string, enabled: boolean) => void;
}> = ({ medication, enabled, onToggle }) => {
  const handleToggle = (newValue: boolean) => {
    onToggle(medication.id, newValue);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>{medication.name}</Text>
        <Text style={styles.description}>
          Daily reminders {enabled ? 'enabled' : 'disabled'}
        </Text>
      </View>
      
      <Switch
        value={enabled}
        onValueChange={handleToggle}
        trackColor={{ false: "#ebebeb", true: "#bae6fd" }}
        thumbColor={enabled ? "#0284c7" : "#f5f5f5"}
        ios_backgroundColor="#ebebeb"
        accessibilityLabel={`${medication.name} reminders ${enabled ? 'enabled' : 'disabled'}`}
        accessibilityRole="switch"
        accessibilityState={{ checked: enabled }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
```

<blockquote><details>

The `Switch` component provides a simple boolean input that resembles a physical switch, ideal for toggling features or settings in your application. It follows platform-specific design guidelines, appearing as a sliding switch on iOS and a toggle switch on Android, ensuring your application looks and feels native on each platform.

The TypeScript interface reveals several key properties:
- `value` and `onValueChange` form the core controlled component pattern
- `disabled` allows you to prevent user interaction when needed
- `trackColor` and `thumbColor` customize the switch appearance
- Platform-specific props like `ios_backgroundColor` handle unique platform behaviors

The example implements a medication reminder toggle, a common use case in healthcare applications. The component:
1. Displays the medication name and current reminder status
2. Provides a switch that reflects and controls the enabled state
3. Communicates changes back to the parent component with a callback
4. Includes proper accessibility attributes for screen readers

When styling `Switch` components, note that the component itself has fixed dimensions that can't be changed through the style prop. Instead, as shown in the example, style the container around the switch to create the desired layout and spacing.

The `trackColor` prop accepts an object with `true` and `false` properties, allowing different colors for the on and off states. The `thumbColor` prop controls the color of the sliding thumb. These customizations help align the switch with your app's color scheme while maintaining the native look and feel.

Accessibility is particularly important for toggle controls. The example includes:
- `accessibilityLabel` to announce the purpose and current state
- `accessibilityRole="switch"` to indicate the component type
- `accessibilityState={{ checked: enabled }}` to communicate the current value

For production applications, consider these best practices:
1. **Provide immediate feedback** when a switch is toggled, beyond just the switch animation
2. **Consider debouncing** for switches that trigger expensive operations
3. **Use consistent colors** across all switches in your application
4. **Ensure sufficient contrast** between track and thumb colors for visibility
5. **Include descriptive text** alongside switches to clearly indicate what they control

The switch component is ideal for:
- Feature toggles (enable/disable features)
- Setting preferences (opt-in/out)
- Mode switches (light/dark mode)
- Boolean form fields (yes/no questions)

The example's layout uses flexbox to position the text content and switch, with the text taking up available space (`flex: 1`) and the switch maintaining its natural size. The container's `space-between` justification ensures clear separation between the text and switch, making the control's purpose and state clear to users.

</details></blockquote>

---

## Picker Component (React Native Picker)

The `Picker` component provides dropdown selection:

- Allows selection from a list of options
- Adapts to platform-specific UIs (dropdown on Android, wheel on iOS)
- Supports custom styling for items and container
- Requires community package (`@react-native-picker/picker`) as it was removed from core

```tsx
interface PickerProps {
  selectedValue?: any;
  onValueChange?: (itemValue: any, itemIndex: number) => void;
  enabled?: boolean;
  mode?: 'dialog' | 'dropdown'; // Android only
  itemStyle?: StyleProp<TextStyle>; // iOS only
  // ... other props
}

// Installing @react-native-picker/picker package:
// npm install @react-native-picker/picker

// Import statement
import { Picker } from '@react-native-picker/picker';

// Medication frequency picker
const DosageFrequencyPicker: React.FC<{
  frequency: string;
  onFrequencyChange: (frequency: string) => void;
}> = ({ frequency, onFrequencyChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dosage Frequency</Text>
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => onFrequencyChange(itemValue.toString())}
          style={styles.picker}
          mode="dropdown" // Android only
          accessibilityLabel="Select dosage frequency"
        >
          <Picker.Item label="Once daily" value="once_daily" />
          <Picker.Item label="Twice daily" value="twice_daily" />
          <Picker.Item label="Three times daily" value="three_times_daily" />
          <Picker.Item label="Four times daily" value="four_times_daily" />
          <Picker.Item label="Every other day" value="every_other_day" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="As needed" value="as_needed" />
        </Picker>
      </View>
      
      <Text style={styles.helperText}>
        How often this medication should be taken
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
```

<blockquote><details>

The `Picker` component provides a dropdown or wheel interface for selecting from a predefined list of options. It's important to note that this component has been moved from React Native core to a community package (`@react-native-picker/picker`), which means you need to install it separately with npm or yarn.

The TypeScript interface shows the core props:
- `selectedValue` and `onValueChange` for the controlled component pattern
- `enabled` to control whether the picker can be interacted with
- Platform-specific props like `mode` (Android) and `itemStyle` (iOS)

The `Picker` renders differently on each platform:
- On Android, it appears as a dropdown or dialog (controlled by the `mode` prop)
- On iOS, it displays as a spinning wheel that slides up from the bottom of the screen
- Both implementations follow platform standards, providing a native feel

The example creates a dosage frequency selector with several predefined options. It demonstrates:
1. Properly structuring a picker with a label and container
2. Setting up the controlled component pattern with `selectedValue` and `onValueChange`
3. Using `Picker.Item` components to define the available options
4. Adding appropriate accessibility attributes for screen readers

When working with pickers, keep these considerations in mind:
- The iOS wheel picker takes up significant screen space when active
- Android's dropdown is more compact but can be less intuitive for some users
- Both implementations may not provide enough visual customization for complex UIs

For production applications, consider these best practices:
1. **Always provide clear labels** to indicate what the picker is selecting
2. **Include sensible default values** rather than empty selections
3. **Consider alternative UIs** for very long option lists (e.g., searchable dropdowns)
4. **Test thoroughly on both platforms** as behavior and appearance differ significantly

The styling approach in the example:
- Wraps the picker in a container with a border for visual definition
- Provides a clear label above the picker
- Includes helper text below for additional context
- Uses consistent spacing and typography with other form elements

For more advanced selection interfaces, you might consider alternatives:
- Modal-based custom pickers for complex options
- Segmented controls for few options (2-5 choices)
- Radio button groups for more visible options
- Autocomplete inputs for very large option sets

The `Picker` component is ideal for:
- Selecting from predefined, limited options
- Form inputs with mutually exclusive choices
- Settings selectors
- Simple filter controls

When using TypeScript with the community picker package, you may need to adjust imports or add type definitions depending on your project configuration. The example uses strings for the values, but you could use enums or numeric codes for more type-safe option handling.

</details></blockquote>

---

## Slider Component

The `Slider` component allows selecting a value from a range:

- Visual slider control for numeric input
- Supports minimum and maximum values
- Provides callbacks for user interaction
- Now requires community package (@react-native-community/slider)

```tsx
interface SliderProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  // ... other props
}

// Installing @react-native-community/slider package:
// npm install @react-native-community/slider

// Import statement
import Slider from '@react-native-community/slider';

// Medication dosage slider
const DosageSlider: React.FC<{
  dosage: number;
  minDosage: number;
  maxDosage: number;
  step: number;
  unit: string;
  onDosageChange: (dosage: number) => void;
}> = ({ 
  dosage, 
  minDosage, 
  maxDosage, 
  step, 
  unit, 
  onDosageChange 
}) => {
  const [sliderValue, setSliderValue] = useState(dosage);
  
  const handleValueChange = (value: number) => {
    setSliderValue(value);
  };
  
  const handleSlidingComplete = (value: number) => {
    onDosageChange(value);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Dosage Amount</Text>
        <Text style={styles.valueLabel}>
          {sliderValue} {unit}
        </Text>
      </View>
      
      <Slider
        style={styles.slider}
        value={dosage}
        minimumValue={minDosage}
        maximumValue={maxDosage}
        step={step}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor="#0284c7"
        maximumTrackTintColor="#e5e7eb"
        thumbTintColor="#0284c7"
        accessibilityLabel={`Adjust dosage, current value ${sliderValue} ${unit}`}
      />
      
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabel}>{minDosage} {unit}</Text>
        <Text style={styles.rangeLabel}>{maxDosage} {unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0284c7',
  },
  slider: {
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  rangeLabel: {
    fontSize: 12,
    color: '#666',
  },
});
```

<blockquote><details>

The `Slider` component provides a visual control for selecting a value within a numeric range. Like the Picker, this component has been moved to a community package (`@react-native-community/slider`) and must be installed separately. This transition to community packages is part of React Native's move toward a more modular architecture.

The TypeScript interface shows the key properties:
- `value`, `minimumValue`, and `maximumValue` define the slider's range and position
- `step` controls value increments (for example, moving in steps of 5 or 0.5)
- `onValueChange` fires continuously as the slider moves
- `onSlidingComplete` fires when the user releases the slider
- Various color props allow styling the track and thumb

The example implements a dosage selector that would be common in medication applications, allowing precise adjustment within a predefined therapeutic range. It demonstrates:

1. **Two-way binding**: The component maintains both local state for immediate visual feedback and communicates completed changes back to the parent.
2. **Clear visual feedback**: The current value is prominently displayed and updates in real time.
3. **Range context**: Min and max labels help users understand the available range.
4. **Accessibility support**: The `accessibilityLabel` includes the current value for screen reader users.

The component uses two different callbacks:
- `onValueChange` updates the displayed value in real-time as the user drags
- `onSlidingComplete` only triggers when the user finishes, potentially reducing excessive backend updates

This pattern is particularly useful for:
- Reducing network requests or expensive computations while the user is still adjusting
