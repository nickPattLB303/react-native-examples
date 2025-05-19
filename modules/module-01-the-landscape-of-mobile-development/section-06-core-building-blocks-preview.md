## Section 6: Core Building Blocks (A Preview)

React Native provides a set of essential, pre-built components that work across both iOS and Android. These **Core Components** are the basic tools in your UI toolkit, each mapping to corresponding native UI elements for optimal performance and look-and-feel. This section offers a brief preview of some fundamental ones. Later modules will delve much deeper into each component, exploring their props, styling, layout, and interactions.

### Key Core Components

Here are a few of the most commonly used Core Components:

#### `<View>`

- **Role:** The most basic container component. Use it to group other components, apply styles, and control layout using Flexbox.
- **Analogy:** Think of it like a `<div>` in web development, or `UIView` on iOS / `ViewGroup` on Android.
- **Example:**

  ```tsx
  import React from "react";
  import { View, Text, StyleSheet } from "react-native";

  const MedicationInfoBox = () => (
    <View style={styles.infoBoxContainer}>
      <Text style={styles.infoText}>Aspirin 100mg</Text>
      <Text style={styles.subText}>Take one daily</Text>
    </View>
  );

  const styles = StyleSheet.create({
    infoBoxContainer: {
      padding: 10,
      backgroundColor: "#eef",
      borderWidth: 1,
      borderColor: "#ccd",
    },
    infoText: { fontSize: 16, fontWeight: "bold" },
    subText: { fontSize: 14, color: "gray" },
  });
  ```

#### `<Text>`

- **Role:** Used for displaying all text content. Any text string in your JSX _must_ be wrapped within a `<Text>` component.
- **Features:** Supports nesting `<Text>` components for varied styling and can handle touch events.
- **Analogy:** Similar to `<p>` or `<span>` in web development, or `UILabel`/`UITextView` on iOS / `TextView` on Android.
- **Example:**

  ```tsx
  import React from "react";
  import { Text, StyleSheet } from "react-native";

  const PatientWelcomeMessage = () => (
    <Text style={styles.welcomeMessage}>
      Welcome, <Text style={styles.patientName}>Jane Doe</Text>!{"\\n"}Check
      your medication schedule.
    </Text>
  );

  const styles = StyleSheet.create({
    welcomeMessage: { fontSize: 18, textAlign: "center", marginVertical: 10 },
    patientName: { fontWeight: "bold", color: "#007bff" },
  });
  ```

#### `<Image>`

- **Role:** Displays images from various sources: network URLs, static project resources (using `require('./path/to/image.png')`), or local device storage.
- **Requirement:** Network images _must_ have `width` and `height` styles specified.
- **Analogy:** Like `<img>` in web development, or `UIImageView` on iOS / `ImageView` on Android.
- **Example:**

  ```tsx
  import React from "react";
  import { Image, StyleSheet, View, Text } from "react-native";

  const PharmacyBrandImage = () => (
    <View style={styles.imageContainer}>
      <Text style={styles.imageCaption}>SpeedyMeds Pharmacy</Text>
      <Image
        style={styles.pharmacyLogo}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} // Placeholder for a pharmacy/health logo
        accessibilityLabel="SpeedyMeds Pharmacy Logo"
      />
      {/* <Image style={styles.localImage} source={require('./assets/my-icon.png')} /> */}
    </View>
  );

  const styles = StyleSheet.create({
    imageContainer: { alignItems: "center", marginVertical: 10 },
    pharmacyLogo: { width: 60, height: 60, resizeMode: "contain" },
    imageCaption: { fontSize: 12, color: "gray", marginBottom: 5 },
    // localImage: { width: 100, height: 100 },
  });
  ```

#### `<StyleSheet>`

- **Role:** An API (not a component itself) used to define reusable style objects in JavaScript. `StyleSheet.create()` is used to centralize style definitions.
- **Benefits:** Improves code organization by separating styles from rendering logic and can offer performance optimizations by sending styles over the bridge only once.
- **Analogy:** Conceptually similar to creating CSS rules in a `<style>` tag or `.css` file on the web.
- **Example:** (See `styles` objects in the examples above and below – they all use `StyleSheet.create`)

#### `<Button>`

- **Role:** A simple, cross-platform button component for basic user interactions.
- **Props:** Requires `title` (string for button text) and `onPress` (function to call when tapped). Optional `color` and `disabled` props.
- **Customization:** Offers minimal styling customization. For more control, use `<Pressable>` or build custom touchable components.
- **Analogy:** Like `<button>` in web development, or `UIButton` on iOS / `Button` on Android.
- **Example:**

  ```tsx
  import React from "react";
  import { Button, Alert, View, StyleSheet } from "react-native";

  const RefillRequestButton = () => (
    <View style={styles.buttonWrapper}>
      <Button
        title="Request Refill"
        onPress={() =>
          Alert.alert(
            "Refill Requested",
            "Your request for Amoxicillin has been submitted."
          )
        }
        color="#007bff"
      />
    </View>
  );
  const styles = StyleSheet.create({
    buttonWrapper: { marginVertical: 10, marginHorizontal: 20 },
  });
  ```

### Component Mapping Reference

This table helps visualize how common React Native Core Components relate to their native counterparts and web equivalents:

| React Native Component | Android Native View         | iOS Native View        | Web Analog              | Description                                                                   |
| :--------------------- | :-------------------------- | :--------------------- | :---------------------- | :---------------------------------------------------------------------------- |
| `<View>`               | `android.view.ViewGroup`    | `UIView`               | `<div>`                 | Fundamental container supporting Flexbox layout, styling, and touch handling. |
| `<Text>`               | `android.widget.TextView`   | `UILabel`/`UITextView` | `<p>`, `<span>`         | Displays styled text; must wrap all text nodes.                               |
| `<Image>`              | `android.widget.ImageView`  | `UIImageView`          | `<img>`                 | Displays network or static images.                                            |
| `<TextInput>`          | `android.widget.EditText`   | `UITextField`          | `<input type="text">`   | Allows user text input via keyboard.                                          |
| `<ScrollView>`         | `android.widget.ScrollView` | `UIScrollView`         | `<div>` (with overflow) | Generic scrolling container for heterogeneous content.                        |
| `<Button>`             | `android.widget.Button`     | `UIButton`             | `<button>`              | Basic, minimally customizable button.                                         |
| `StyleSheet` (API)     | N/A (Style System)          | N/A (Style System)     | CSS                     | JavaScript API for defining optimized style objects.                          |

_(Note: This mapping is conceptual; the underlying implementation involves complex bridging and rendering logic, especially with the New Architecture.)_

This preview is just the tip of the iceberg. Subsequent modules will explore these and other Core Components (like `<TextInput>`, `<ScrollView>`, `<FlatList>`, `<Pressable>`) in much greater detail, including their full range of props, advanced usage patterns, styling techniques, layout with Flexbox, and handling user interactions.
