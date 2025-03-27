# Core Components 🏗️

React Native provides a set of essential, ready-to-use components for building your UI. These are the fundamental building blocks, analogous to native UI elements on Android and iOS.

--

*   `View`: The fundamental container component.
*   `Text`: For displaying text content.
*   `Image`: For displaying images.
*   `TextInput`: For user text input.
*   `ScrollView`: A generic scrolling container.
*   `Button`, `Pressable`, `TouchableOpacity`: For handling user interactions.

> 🧱 React Native's core components are designed to abstract away the platform-specific implementations (like `UIView` on iOS or `View` on Android) while providing a unified API for developers. Think of them as the basic Lego bricks for your app's interface. 

<blockquote><details>

- `View` acts like a `div` in web development or a `ViewGroup` in Android, serving as a container for other components and enabling layout structuring using Flexbox (which we'll cover soon).
- `Text` is specifically designed for rendering text strings, handling text styling and layout nuances. 
- `Image` handles loading and displaying images from various sources. 
- `TextInput` provides the standard text field for user input. `ScrollView` allows content that exceeds the screen dimensions to be scrollable. 
- Finally, components like `Button` and the more flexible `Pressable` (and its predecessors like `TouchableOpacity`) are crucial for capturing user taps and gestures. 

Mastering these is essential before moving on to more complex UI patterns or third-party libraries.

</details></blockquote>

---

## `View` Component 🖼️

The most fundamental component for building UI. It's a container that supports layout with Flexbox, styling, touch handling, and accessibility controls.

*   Maps directly to native views (`UIView`, `android.view.View`).
*   Doesn't display anything by itself; it's a container.
*   Primary element for structuring layouts.

--

<div class="android-dev">🤖 <strong>Android Devs:</strong> Think of <code>View</code> as similar to <code>ViewGroup</code> (like <code>LinearLayout</code>, <code>RelativeLayout</code>, <code>ConstraintLayout</code>), acting as a container for other views and controls.</div>
<div class="ios-dev">🍏 <strong>iOS Devs:</strong> <code>View</code> is analogous to <code>UIView</code>. It's the basic building block you use to create hierarchies and structure your interface.</div>
<div class="react-dev">⚛ <strong>React Devs:</strong> Similar to a <code>div</code> element in HTML, used for grouping elements and applying styles/layout.</div>
<div class="angular-dev">🅰 <strong>Angular Devs:</strong> Conceptually like a <code>div</code> or a custom component's template container used for structure and grouping.</div>

--

### `View` Example: Basic Structure

Let's create a simple card structure for displaying medication information.

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Represents a simple card container.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Content to display inside the card.
 * @returns {JSX.Element} A styled View component.
 */
const MedicationCard = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
});

// Usage within another component:
// <MedicationCard>
//   <Text>Medication Details Here</Text>
// </MedicationCard>
```

<blockquote><details>

This example demonstrates a common use case for the `View` component: creating a reusable container element, here named `MedicationCard`. 

The `View` is styled using the `StyleSheet.create` API to give it a card-like appearance with a white background, rounded corners, padding, margins, and platform-appropriate shadows (`shadow*` properties for iOS, `elevation` for Android). 

The `children` prop allows any other components (like `Text`, `Image`, etc.) to be nested inside this styled `View`. 

This promotes component reusability and separation of concerns. Notice how styles are defined in a separate `StyleSheet` object, which is the recommended approach for performance and organization compared to inline styles, especially for static styles. 

</details></blockquote>

---

## `Text` Component ✍️

Used to display text strings. Supports nesting, styling, and touch handling.

*   All text in React Native **must** be inside a `<Text>` component.
*   Supports text-specific styles (e.g., `fontSize`, `fontWeight`, `color`, `textAlign`).
*   Can be nested to inherit styles.

--

<div class="android-dev">🤖 <strong>Android Devs:</strong> This is your <code>TextView</code>. You must wrap all display text within it.</div>
<div class="ios-dev">🍏 <strong>iOS Devs:</strong> Equivalent to <code>UILabel</code>. All string content needs to be rendered inside a <code>Text</code> component.</div>
<div class="react-dev">⚛ <strong>React Devs:</strong> Unlike HTML where text can exist outside tags like <code>&lt;p&gt;</code> or <code>&lt;span&gt;</code>, React Native strictly requires <code>&lt;Text&gt;</code> for all text rendering.</div>
<div class="angular-dev">🅰 <strong>Angular Devs:</strong> Similar to using interpolation <code>{{ myText }}</code> within an element, but the text itself must be enclosed in <code>&lt;Text&gt;</code>.</div>

<blockquote><details>

- The `Text` component is indispensable for rendering any text content in your application. 
- A key difference from web development is the strict requirement that all text nodes must be wrapped within a `<Text>` component; 
  - placing raw text directly inside a `<View>`, for instance, will result in an error. 
  - This design choice allows React Native to manage text layout and rendering efficiently, leveraging native text rendering capabilities.
- `Text` components support a range of text-specific styling properties beyond basic layout styles, including font families, weights, sizes, colors, line heights, and alignment.
- Nested `Text` components inherit typographic styles from their parent `Text` components, similar to CSS inheritance, allowing for complex text formatting. 
  - They can also respond to touch events using the `onPress` prop, making text elements interactive like links or buttons.

</details></blockquote>

--

### `Text` Example: Medication Details

Displaying medication name and dosage using nested `Text` components.

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Displays medication name and dosage with specific styling.
 * @returns {JSX.Element} A View containing styled Text components.
 */
const MedicationInfo = () => {
  const medicationName = 'Lisinopril';
  const dosage = '10mg Tablet';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Medication:</Text>
      <Text style={styles.medicationName}>
        {medicationName} -{' '}
        <Text style={styles.dosage}>{dosage}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dosage: {
    fontSize: 16,
    fontWeight: 'normal', // Override bold from parent
    color: '#555',
  },
});

export default MedicationInfo;
```

<blockquote><details>

This example showcases the `Text` component's usage and nesting capabilities. We have a main `Text` component displaying the `medicationName`. Inside it, we nest another `Text` component for the `dosage`. 

Notice how the `dosage` text inherits the `fontSize` and `color` from its parent (`medicationName`) unless explicitly overridden. Here, we override `fontWeight` to `normal` and set a slightly different `color` and `fontSize` for the dosage, demonstrating style inheritance and overriding within nested `Text` elements. This allows for fine-grained control over text appearance. The `label` is a separate `Text` component. All text content is correctly wrapped. 

The styles are defined using `StyleSheet.create` for clarity and performance. This pattern is common for displaying related pieces of information with different visual emphasis, like a product name and its price, or in our case, a medication and its dosage details. The surrounding `View` provides padding and structure.

</details></blockquote>

---

## `Image` Component 🏞️

For displaying different types of images, including network images, static resources, temporary local images, and images from the camera roll.

*   Requires `source` prop (e.g., `{uri: '...'}`, `require('...')`).
*   Must specify dimensions (`width`, `height`) for network images.
*   Supports `resizeMode` (e.g., `cover`, `contain`, `stretch`).

--

<div class="android-dev">🤖 <strong>Android Devs:</strong> Similar to <code>ImageView</code>. You'll need to manage image sources and scaling.</div>
<div class="ios-dev">🍏 <strong>iOS Devs:</strong> Analogous to <code>UIImageView</code>. Handles image loading and display modes.</div>
<div class="react-dev">⚛ <strong>React Devs:</strong> Like the <code>&lt;img&gt;</code> tag, but requires explicit dimensions for remote images and uses a different source format.</div>
<div class="angular-dev">🅰 <strong>Angular Devs:</strong> Similar to using an <code>&lt;img&gt;</code> tag with <code>[src]</code> binding. Dimension requirements are specific to React Native.</div>

<blockquote><details>

The `Image` component is React Native's solution for rendering images. It's versatile, supporting various sources. 

For static images bundled with your app, you use the `require('./path/to/image.png')` syntax. React Native's packager handles bundling these assets. 

For images fetched from a network URL, you use the `source={{ uri: 'https://example.com/image.jpg' }}` format. Crucially, for network images, you **must** explicitly define `width` and `height` styles, as React Native cannot determine the dimensions beforehand. Failure to do so will result in the image not being displayed. 

The `resizeMode` prop controls how the image should be resized to fit its container dimensions, similar to CSS's `background-size` or `object-fit` properties (`cover`, `contain`, `stretch`, `repeat`, `center`). Proper image handling, including specifying dimensions and choosing the right `resizeMode`, is key for performance and correct UI rendering.

</details></blockquote>

--

### `Image` Example: Medication Visual

Displaying a placeholder image for a medication.

```typescript
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

/**
 * Displays a placeholder image for a medication.
 * @returns {JSX.Element} A View containing a styled Image component.
 */
const MedicationImage = () => {
  // Placeholder image URI (replace with actual image source)
  const imageUri = 'https://via.placeholder.com/150/0000FF/808080?text=Med+Image';
  // Example using a local image (assuming 'assets/pill.png' exists)
  // const localImage = require('../assets/pill.png');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        // source={localImage} // Uncomment to use local image
        style={styles.image}
        resizeMode="contain" // Adjusts image size to fit within the container
      />
      <Text style={styles.caption}>Medication Placeholder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center image horizontally
    marginVertical: 10,
  },
  image: {
    width: 100, // Explicit width required for network images
    height: 100, // Explicit height required for network images
    backgroundColor: '#eee', // Background color while loading/if transparent
    borderRadius: 8, // Optional: rounds the corners
  },
  caption: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default MedicationImage;
```

<blockquote><details>

This example demonstrates how to use the `Image` component to display a network image. We define a `source` prop using the `{ uri: '...' }` format. Crucially, we provide explicit `width` and `height` values in the `styles.image` object; without these, the network image would not render. We also set a `backgroundColor` which can be useful as a placeholder while the image loads or if the image has transparency. 

The `resizeMode="contain"` prop ensures the entire image is visible within the specified dimensions, potentially leaving empty space if the aspect ratios don't match. Alternatively, `resizeMode="cover"` would fill the dimensions, potentially cropping the image. 

The example also includes a commented-out line showing how to use a local image with `require()`. Local images bundled via `require()` often don't need explicit dimensions as Metro (the bundler) can determine them, but it's still good practice. The surrounding `View` uses `alignItems: 'center'` to center the image horizontally.

</details></blockquote>

---

## `TextInput` Component ⌨️

Allows the user to enter text. It has props to configure keyboard behavior, handle text changes, and more.

*   Controlled component pattern is common (using `value` and `onChangeText`).
*   Props like `placeholder`, `keyboardType`, `secureTextEntry`, `multiline`.
*   Styling is necessary to make it visible and usable.

--

<div class="android-dev">🤖 <strong>Android Devs:</strong> This is your <code>EditText</code>. You'll manage its state and handle input changes.</div>
<div class="ios-dev">🍏 <strong>iOS Devs:</strong> Corresponds to <code>UITextField</code> or <code>UITextView</code> (for multiline).</div>
<div class="react-dev">⚛ <strong>React Devs:</strong> Similar to <code>&lt;input type="text"&gt;</code> or <code>&lt;textarea&gt;</code>, typically used as a controlled component.</div>
<div class="angular-dev">🅰 <strong>Angular Devs:</strong> Like <code>&lt;input&gt;</code> or <code>&lt;textarea&gt;</code> with <code>[(ngModel)]</code> for two-way binding, but in React Native, you manage state explicitly.</div>

<blockquote><details>

The `TextInput` component is the standard way to capture text input from the user in React Native. It's highly configurable through various props. 

The most common pattern for using `TextInput` is as a controlled component. This means the component's `value` is tied to a state variable in your React component, and the `onChangeText` prop is used to update that state variable whenever the user types. This gives you full control over the input's value. 

Other useful props include `placeholder` (for hint text), `keyboardType` (e.g., `'numeric'`, `'email-address'`), `secureTextEntry` (for password fields), `autoCapitalize`, `autoCorrect`, and `multiline` (to create a text area). 

Unlike web inputs, `TextInput` requires explicit styling (like borders, padding, height) to be visually apparent and have a defined interactive area. Without styling, it might be invisible or difficult to interact with.

</details></blockquote>

--

### `TextInput` Example: Dosage Notes

A simple input field for adding notes about medication dosage.

```typescript
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

/**
 * A controlled TextInput component for entering dosage notes.
 * @returns {JSX.Element} A View containing a label and a TextInput.
 */
const DosageNotesInput = () => {
  const [notes, setNotes] = useState<string>('');

  /**
   * Handles changes in the TextInput.
   * @param {string} text - The current text in the input field.
   */
  const handleNotesChange = (text: string): void => {
    setNotes(text);
    // Here you might add validation or other logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dosage Notes:</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={handleNotesChange}
        placeholder="e.g., Take with food"
        placeholderTextColor="#999"
        multiline={true} // Allows multiple lines
        numberOfLines={3} // Suggests initial height (Android specific)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    minHeight: 60, // Ensure minimum height for multiline
    textAlignVertical: 'top', // Align text to top in multiline (Android)
  },
});

export default DosageNotesInput;
```

<blockquote><details>

This example implements a controlled `TextInput` component. 

We use the `useState` hook to manage the input's value (`notes`). 

The `value` prop of the `TextInput` is bound to the `notes` state variable. 

The `onChangeText` prop is set to the `handleNotesChange` function, which updates the `notes` state whenever the text changes, ensuring the component's state is always synchronized with the input field's content. 

We've added styling via `StyleSheet` to make the input visible and usable, including a border, padding, and rounded corners. The `placeholder` prop provides hint text, and `placeholderTextColor` customizes its color. 

We've also set `multiline={true}` to allow multi-line input, making it suitable for notes. `numberOfLines` provides a hint for the initial height on Android, while `minHeight` ensures a minimum vertical space. 

`textAlignVertical: 'top'` is useful for aligning placeholder and input text to the top in multiline inputs, especially on Android. This setup provides a robust foundation for handling user text input.

</details></blockquote>

---

## `ScrollView` Component 📜

A generic scrolling container that can host multiple components and views.

*   Wraps content that might exceed screen height.
*   Loads all children at once (can be inefficient for long lists).
*   Use `FlatList` or `SectionList` for long, dynamic lists.
*   Supports vertical (`contentContainerStyle`) and horizontal scrolling (`horizontal={true}`).

--

<div class="android-dev">🤖 <strong>Android Devs:</strong> Similar to <code>ScrollView</code>. Use it when content size is unpredictable or larger than the screen.</div>
<div class="ios-dev">🍏 <strong>iOS Devs:</strong> Analogous to <code>UIScrollView</code>. Provides basic scrolling capabilities.</div>
<div class="react-dev">⚛ <strong>React Devs:</strong> Conceptually like setting <code>overflow: scroll;</code> on a container, but it's a dedicated component.</div>
<div class="angular-dev">🅰 <strong>Angular Devs:</strong> Similar to applying CSS <code>overflow: auto;</code> or using specific scrolling directives/components.</div>

<blockquote><details>

`ScrollView` provides a simple way to enable scrolling for content that doesn't fit on the screen. You wrap the content you want to be scrollable within a `ScrollView` component. 

By default, it scrolls vertically. You can enable horizontal scrolling by setting the `horizontal={true}` prop. 

It's important to understand `ScrollView`'s rendering behavior: it renders all its child components at once, even those currently off-screen. This can lead to performance issues if you have a very long list of items. 

For long lists or data that changes frequently, React Native provides more optimized components like `FlatList` and `SectionList`, which implement virtualization (rendering only the items currently visible or nearby). Therefore, `ScrollView` is best suited for shorter content where the number of items is limited, such as forms, articles, or settings screens. 

Use the `contentContainerStyle` prop to style the container *within* the scroll view, affecting how the child elements are laid out inside the scrollable area.

</details></blockquote>

--

### `ScrollView` Example: Medication Form

Wrapping multiple input fields and information sections in a `ScrollView`.

```typescript
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MedicationInfo from './MedicationInfo'; // Assuming previous example
import MedicationImage from './MedicationImage'; // Assuming previous example
import DosageNotesInput from './DosageNotesInput'; // Assuming previous example

/**
 * A screen component demonstrating ScrollView with various content.
 * @returns {JSX.Element} A ScrollView containing medication details.
 */
const MedicationDetailScreen = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled" // Ensures taps outside input dismiss keyboard
    >
      <MedicationImage />
      <MedicationInfo />
      <DosageNotesInput />
      {/* Add more components here - they will scroll if needed */}
      <View style={styles.spacer} />{/* Example spacer */}
      <View style={styles.spacer} />
      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Takes up available space
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    paddingBottom: 20, // Add padding at the bottom of the scrollable content
    paddingHorizontal: 16,
  },
  spacer: { // Just for demonstrating scrollable content
    height: 100,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default MedicationDetailScreen;
```

<blockquote><details>

This example demonstrates wrapping various components (`MedicationImage`, `MedicationInfo`, `DosageNotesInput`, and some placeholder `View`s) inside a `ScrollView`. 

The `ScrollView` itself is styled with `flex: 1` to take up the available screen space and given a background color. 

The `contentContainerStyle` prop is used to add padding *inside* the scrollable area, ensuring content isn't flush against the edges or the bottom when scrolled.

The `keyboardShouldPersistTaps="handled"` prop is a useful addition for forms within `ScrollView`s; it allows users to tap buttons or other elements outside the focused `TextInput` to dismiss the keyboard without triggering the tap action on the element behind the keyboard, providing a smoother user experience. 

If the combined height of the child components exceeds the `ScrollView`'s height, the content becomes vertically scrollable. This pattern is ideal for detail screens or forms where the content length might vary or potentially overflow the screen.

Remember, for very long lists, `FlatList` is preferred.

</details></blockquote>

---

## Touchables & `Pressable` 👋

Components for capturing touch events (taps, long presses).

*   `Button`: Simple, opinionated, platform-specific button. Limited customization.
*   `TouchableOpacity`: Wraps views, dims opacity on press. Highly customizable.
*   `TouchableHighlight`: Wraps views, darkens background on press. Requires `underlayColor`.
*   `TouchableWithoutFeedback`: Detects taps without visual feedback. Use sparingly (accessibility).
*   **`Pressable` (Recommended):** The modern, most flexible API for handling interactions, including hover, focus (web/TV), and press states.

> 🚨 Use `Pressable` for most custom interaction needs. Use `Button` for standard, simple actions.

<blockquote><details>

Handling user interaction is fundamental. React Native offers several components for this. `Button` provides a basic, platform-styled button suitable for simple actions like "OK" or "Cancel". However, it offers very limited styling customization. 

For more control, `TouchableOpacity` (dims opacity on touch), `TouchableHighlight` (changes background color on touch, requires `underlayColor` prop), and `TouchableWithoutFeedback` (no visual feedback, use carefully for accessibility) were common choices. However, the modern and recommended approach is to use the `Pressable` component. 

`Pressable` provides a more comprehensive API to detect various interaction phases (press in, press out, long press) and states (hovered, focused). It allows you to define styles or render different children based on the interaction state (e.g., change background color when pressed). This makes it incredibly versatile for creating custom buttons, interactive list items, or any element that needs to respond to touch input with specific visual feedback.

</details></blockquote>

--

### `Pressable` Example: Add Reminder Button

Creating a custom button using `Pressable`.

```typescript
import React from 'react';
import { Pressable, Text, StyleSheet, View, Alert } from 'react-native';

/**
 * A custom button component using Pressable for adding a reminder.
 * @returns {JSX.Element} A Pressable component styled as a button.
 */
const AddReminderButton = () => {
  /**
   * Handles the press event for the button.
   */
  const handlePress = (): void => {
    Alert.alert('Reminder', 'Add reminder functionality to be implemented.');
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.buttonBase,
          pressed ? styles.buttonPressed : styles.buttonIdle,
        ]}
        // android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }} // Optional Android ripple
      >
        {({ pressed }) => (
          <Text style={styles.buttonText}>
            {pressed ? 'Adding...' : 'Add Medication Reminder'}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center', // Center button in the container
  },
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Make it pill-shaped
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  buttonIdle: {
    backgroundColor: '#007AFF', // Blue background
  },
  buttonPressed: {
    backgroundColor: '#0056B3', // Darker blue when pressed
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddReminderButton;
```

<blockquote><details>

This example demonstrates the power and flexibility of the `Pressable` component for creating custom buttons. 

We define a `Pressable` element and attach an `onPress` handler (`handlePress`) which currently shows an `Alert`. The key feature here is the `style` prop, which accepts a function. 

This function receives an object indicating the interaction state (e.g., `{ pressed: true }`). We use this to apply different styles based on whether the button is currently being pressed. 

`styles.buttonBase` contains common styles, while `styles.buttonPressed` (darker background) is applied conditionally when `pressed` is true, otherwise `styles.buttonIdle` (normal background) is used. This provides immediate visual feedback to the user. 

The `Pressable` component can also render different children based on the state, as shown with the `Text` changing content when pressed. 

We've also included a commented-out example of `android_ripple` for native ripple feedback on Android. This approach offers far more customization than the standard `Button` component.

</details></blockquote>

---

## Summary: Core Components

We've covered the essential building blocks:

*   🧱 **`View`:** The primary container for layout and structure.
*   ✍️ **`Text`:** Required for displaying all text content.
*   🏞️ **`Image`:** For displaying local and network images.
*   ⌨️ **`TextInput`:** For capturing user text input (use controlled components).
*   📜 **`ScrollView`:** For making content scrollable (use `FlatList` for long lists).
*   👋 **`Pressable`:** The recommended way to handle user interactions and create custom buttons/touchables.

> These components form the foundation upon which all React Native UIs are built. Practice using them together to create basic layouts.

<blockquote><details>

This section provided an overview of the most fundamental UI components in React Native.

- `View` and `Text` are ubiquitous, forming the basic structure and content display mechanisms.
- `Image` and `TextInput` handle common needs for visual media and user input, respectively.
- `ScrollView` addresses content overflow, though its limitations necessitate alternatives like `FlatList` for larger datasets.
- Finally, `Pressable` (along with its predecessors) enables user interaction.

Understanding the purpose, basic props, and common patterns for each of these components is crucial. Remember the strict requirement for `Text` wrappers, the need for dimensions on network `Image`s, the controlled component pattern for `TextInput`, and the performance implications of `ScrollView` versus `FlatList`. Mastering these core components prepares you for the next steps: styling and layout.

</details></blockquote> 