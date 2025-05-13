## Section 2: Dimensions API

Creating responsive user interfaces that adapt to various screen sizes and orientations is a fundamental aspect of mobile app development. React Native's `Dimensions` API provides the tools to get information about the device's screen and window dimensions, enabling you to build layouts that look great on any device.

### Conceptual Content

The `Dimensions` API allows you to access the width and height of the device's screen and the application window. This is particularly useful for:

- **Responsive Styling:** Adjusting font sizes, margins, padding, or the size of elements based on screen real estate.
- **Conditional Rendering:** Showing or hiding components, or changing layout structures, based on available space or orientation.
- **Calculating Layouts:** Dynamically calculating the dimensions or positions of UI elements.

**Window vs. Screen Dimensions**

It's important to understand the difference:

- **`window` dimensions:** Refer to the size of the application window. On most mobile devices, this is usually the full screen minus any system elements like status bars or navigation bars (if translucent). `window` dimensions can change, for example, when the software keyboard appears or when the screen orientation changes.
- **`screen` dimensions:** Refer to the total physical screen size of the device. These dimensions generally do not change.

For most responsive layout calculations, you'll typically use `window` dimensions because they represent the actual space available to your application's UI.

### Referential Content

The `Dimensions` API has one primary method:

- **`Dimensions.get(dim)`**: This synchronous method retrieves the dimensions for the specified `dim` type.

  - `Dimensions.get('window')`: Returns an object `{ width: number, height: number, scale: number, fontScale: number }` representing the current application window dimensions.
  - `Dimensions.get('screen')`: Returns an object `{ width: number, height: number, scale: number, fontScale: number }` representing the physical screen dimensions.
  - `scale`: The pixel density of the screen.
  - `fontScale`: The global font scaling factor set by the user in the OS settings.

- **Event Listener for Dimension Changes**: Since window dimensions can change (e.g., on screen rotation or when the keyboard appears), the `Dimensions` API also allows you to subscribe to these changes.
  - `Dimensions.addEventListener('change', handler)`: Adds an event listener that fires when dimensions change. The `handler` function receives an object with the new `window` and `screen` dimensions: `({ window, screen }) => void`.
  - `Dimensions.removeEventListener('change', handler)`: Removes a previously added event listener. (Deprecated: `removeEventListener` is deprecated. Use the `remove()` method on the event subscription returned by `addEventListener` instead.)

> [!IMPORTANT]
> While `Dimensions.get()` is synchronous and convenient for initial rendering, relying solely on it for dynamic layouts can lead to issues if dimensions change after the component mounts. For truly responsive UIs that adapt to orientation changes or the appearance of a soft keyboard, you should use the event listener or a hook like `useWindowDimensions` (discussed later).

> 📚 **Official Documentation:**
>
> - [React Native Docs: `Dimensions`](https://reactnative.dev/docs/dimensions)
> - [React Native Docs: `useWindowDimensions` Hook](https://reactnative.dev/docs/usewindowdimensions) (A more modern approach for functional components)

### Procedural Content

Let's explore how to use the `Dimensions` API in the SpeedyMeds application.

**1. Getting Initial Window Dimensions**

This example demonstrates how to retrieve and display the initial window width and height.

```tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const DeviceInfoDisplay: React.FC = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Window Dimensions:</Text>
      <Text style={styles.text}>Width: {windowWidth.toFixed(2)} dp</Text>
      <Text style={styles.text}>Height: {windowHeight.toFixed(2)} dp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default DeviceInfoDisplay;
```

This component gets the dimensions when it mounts and displays them. This is useful for one-time calculations or initial layout decisions.

**2. Styling a Component Based on Screen Width**

Imagine you want a `PrescriptionCard` component in your SpeedyMeds app to occupy 90% of the screen width, with a maximum width for larger screens.

```tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

interface PrescriptionCardProps {
  medicationName: string;
  dosage: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  medicationName,
  dosage,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.medicationName}>{medicationName}</Text>
      <Text style={styles.dosage}>Dosage: {dosage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth * 0.9, // 90% of window width
    maxWidth: 400, // Max width for very large screens
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    alignSelf: "center",
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dosage: {
    fontSize: 14,
    color: "#555",
  },
});

export default PrescriptionCard;
```

Here, `windowWidth` is obtained once when the module loads (which is common for `StyleSheet` definitions). The card's width is then set as a percentage of this. This approach is fine for styles defined outside components but won't react to changes.

**3. Responding to Dimension Changes (Using Event Listener - Classic Approach)**

To make layouts truly dynamic, you need to listen for changes. This example shows how to update state when dimensions change.

> [!NOTE]
> For functional components, the `useWindowDimensions` Hook is generally preferred over manual event listeners as it handles cleanup automatically and integrates better with the React component lifecycle. This example is provided for completeness and understanding the underlying mechanism.

```tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScaledSize } from "react-native";

const ResponsiveLayoutInfo: React.FC = () => {
  const [dimensions, setDimensions] = useState<ScaledSize>(
    Dimensions.get("window")
  );

  useEffect(() => {
    const handleChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener("change", handleChange);

    // Cleanup function to remove the listener
    return () => {
      // Check if subscription.remove() is available (newer RN versions)
      if (subscription && typeof subscription.remove === "function") {
        subscription.remove();
      } else {
        // Fallback for older RN versions (deprecated)
        // Dimensions.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dimensions.width > 500 ? "lightgreen" : "lightblue",
        },
      ]}
    >
      <Text style={styles.text}>Dynamic Window Dimensions:</Text>
      <Text style={styles.text}>Width: {dimensions.width.toFixed(2)} dp</Text>
      <Text style={styles.text}>Height: {dimensions.height.toFixed(2)} dp</Text>
      <Text style={styles.text}>
        Layout is {dimensions.width > 500 ? "Wide" : "Narrow"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ResponsiveLayoutInfo;
```

This component initializes its `dimensions` state with the current window dimensions. The `useEffect` Hook sets up an event listener for `'change'` events on `Dimensions`. When the dimensions change (e.g., device rotation), the `handleChange` function is called, updating the state and causing the component to re-render with the new dimensions. The background color changes based on the width. The cleanup function in `useEffect` is crucial to remove the event listener when the component unmounts, preventing memory leaks.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** In native iOS (Swift/Objective-C), you might use `UIScreen.main.bounds` or listen for `UIDevice.orientationDidChangeNotification` and react to view controller lifecycle methods like `viewWillTransition(to:with:)`. In Android (Kotlin/Java), you would use `DisplayMetrics`, resource qualifiers for different screen sizes/orientations, or handle configuration changes.
>
> **Key Takeaway:** React Native's `Dimensions` API provides a JavaScript-centric way to access this information and react to changes, abstracting away some of the platform-specific APIs while offering a consistent approach.
>
> **Source:** [UIScreen (Apple Docs)](https://developer.apple.com/documentation/uikit/uiscreen), [Handle configuration changes (Android Docs)](https://developer.android.com/guide/topics/resources/runtime-changes)

> 🌐 **(Web Developers):**
>
> **Comparison:** In web development, you use `window.innerWidth`, `window.innerHeight`, and media queries in CSS (`@media (max-width: 600px)`) or JavaScript (`window.matchMedia`) to create responsive designs.
>
> **Key Takeaway:** The `Dimensions` API is React Native's equivalent for getting viewport information. While there isn't a direct CSS media query equivalent in `StyleSheet`, you achieve similar results by getting dimensions and applying styles conditionally in JavaScript. The `useWindowDimensions` Hook simplifies this for functional components, similar to how resize observers or custom hooks might be used in React for the web.

While the `Dimensions` API is powerful, always consider using Flexbox and percentage-based sizing first, as they can often create responsive layouts without needing to query screen dimensions directly. Use `Dimensions` when you need more explicit control or when element sizes depend on the absolute screen/window size.
