## Section 7: Creating Custom Hooks

As your SpeedyMeds application grows, you'll often find yourself writing similar stateful logic in multiple components. Custom Hooks allow you to extract component logic into reusable functions. This is a powerful way to share logic between components without resorting to higher-order components or render props, leading to cleaner and more maintainable code.

### Conceptual Content

**What is a Custom Hook?**

A custom Hook is essentially a JavaScript function whose name starts with `"use"` and that can call other Hooks (like `useState`, `useEffect`, or even other custom Hooks). They let you encapsulate complex logic, including state and side effects, into a single, reusable unit.

**Why Create Custom Hooks?**

- **Reusability:** Share stateful logic across multiple components. For example, logic for handling form input and validation, managing network status, or subscribing to device sensor data can be extracted into a custom Hook and used wherever needed.
- **Readability & Simplicity:** By extracting complex logic, your components become cleaner and easier to understand, focusing more on the UI presentation.
- **Separation of Concerns:** Custom Hooks help separate concerns by isolating specific pieces of logic from the rendering responsibilities of components.
- **Testability:** Custom Hooks are just functions, making them easier to test in isolation compared to testing the same logic embedded within multiple components.

**Rules of Hooks (Apply to Custom Hooks Too!):**

Remember, the two main Rules of Hooks apply when creating custom Hooks:

1.  **Only Call Hooks at the Top Level:** Don't call Hooks inside loops, conditions, or nested functions. Call them at the top level of your React functional component or your custom Hook.
2.  **Only Call Hooks from React Functions:** Call Hooks from React functional components or from custom Hooks. Don't call Hooks from regular JavaScript functions.

**Naming Convention:**
Custom Hook names MUST start with `use` (e.g., `useFormInput`, `useScreenDimensions`, `useMedicationAPI`). This convention is important because it allows linters to automatically check for violations of the Rules of Hooks.

### Referential Content

Custom Hooks don't have a specific API signature like built-in Hooks. They are standard JavaScript functions that can internally use built-in Hooks.

- **Input:** They can accept any arguments, just like regular functions.
- **Output:** They can return any value (an array, an object, a primitive) that represents the shared state or logic.

> 📚 **Official Documentation:**
>
> - [React Docs: Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
> - [React Docs: Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)

### Procedural Content

Let's create a custom Hook for the SpeedyMeds app that provides device information, combining what we learned about `Platform` and `Dimensions`.

**Example: `useDeviceInformation` Custom Hook**

This custom Hook will provide the operating system, OS version, and current window dimensions. It will also update the dimensions when they change.

```tsx
import { useState, useEffect } from "react";
import { Platform, Dimensions, ScaledSize } from "react-native";

interface DeviceInformation {
  os: "ios" | "android" | string; // Platform.OS can be other strings
  osVersion: string | number;
  windowDimensions: ScaledSize;
  isPortrait: boolean;
  isTablet: boolean; // A simple heuristic for tablet
}

const useDeviceInformation = (): DeviceInformation => {
  const [windowDimensions, setWindowDimensions] = useState<ScaledSize>(
    Dimensions.get("window")
  );

  useEffect(() => {
    const handleChange = ({ window }: { window: ScaledSize }) => {
      setWindowDimensions(window);
    };

    const subscription = Dimensions.addEventListener("change", handleChange);

    return () => {
      if (subscription && typeof subscription.remove === "function") {
        subscription.remove();
      }
    };
  }, []);

  const os = Platform.OS;
  const osVersion = Platform.Version;
  const isPortrait = windowDimensions.height >= windowDimensions.width;
  // Simple heuristic: if shortest side is > 600, consider it a tablet
  // This is a basic example; more robust tablet detection might be needed for production.
  const isTablet =
    Math.min(windowDimensions.width, windowDimensions.height) > 600;

  return {
    os,
    osVersion,
    windowDimensions,
    isPortrait,
    isTablet,
  };
};

export default useDeviceInformation;
```

**Using the `useDeviceInformation` Hook in a Component:**

Now, any component in the SpeedyMeds app can use this Hook to get and display device information, or adapt its layout.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useDeviceInformation from "./useDeviceInformation"; // Assuming the hook is in this file

const DeviceInfoDisplayComponent: React.FC = () => {
  const { os, osVersion, windowDimensions, isPortrait, isTablet } =
    useDeviceInformation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpeedyMeds Device Info:</Text>
      <Text>Operating System: {os}</Text>
      <Text>OS Version: {osVersion}</Text>
      <Text>Window Width: {windowDimensions.width.toFixed(0)}</Text>
      <Text>Window Height: {windowDimensions.height.toFixed(0)}</Text>
      <Text>Orientation: {isPortrait ? "Portrait" : "Landscape"}</Text>
      <Text>Device Type: {isTablet ? "Tablet" : "Phone"}</Text>

      {isTablet && isPortrait && (
        <Text style={styles.tabletMessage}>
          This tablet is in portrait mode.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tabletMessage: {
    marginTop: 10,
    color: "purple",
    fontWeight: "bold",
  },
});

export default DeviceInfoDisplayComponent;
```

In this example:

1.  We defined `useDeviceInformation` which encapsulates the logic for getting `Platform.OS`, `Platform.Version`, and dynamic `Dimensions`.
2.  It uses `useState` to hold the `windowDimensions` and `useEffect` to subscribe to dimension changes and clean up the subscription.
3.  It returns an object containing all the relevant device information.
4.  The `DeviceInfoDisplayComponent` then calls `useDeviceInformation()` to get this data and render it. If the window dimensions change (e.g., due to device rotation), the Hook will update its state, causing `DeviceInfoDisplayComponent` to re-render with the new information.

This custom Hook can now be reused in any other component that needs access to this specific set of device information, keeping the component logic clean and the shared logic centralized and testable.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** Custom Hooks can be thought of as creating utility classes or helper functions that manage a specific piece of stateful behavior or data fetching/processing logic, which you might then instantiate or call from your ViewControllers (iOS) or Activities/Fragments (Android). The key difference is Hooks integrate directly into React's composition and lifecycle model.
>
> **Key Takeaway:** Custom Hooks provide a structured way to extract and reuse stateful logic within the React paradigm, promoting better code organization than scattering similar logic across multiple native UI components.

> 🌐 **(Web Developers - React):**
>
> **Comparison:** Custom Hooks in React Native are identical in concept and implementation to custom Hooks in React for the web. If you've built custom Hooks for web projects (e.g., for form handling, API calls, animations), you'll feel right at home.
>
> **Key Takeaway:** The power and patterns of custom Hooks are fully transferable. You can leverage this to share complex UI-independent logic between your React web and React Native projects if structured carefully.

### Exercise

Practice creating a custom Hook to encapsulate a common piece of UI logic.

- **Exercise 9.3: Building a Custom Hook**
  - **Objective:** Create a custom Hook `useToggle` that manages a boolean state (e.g., for a modal visibility, a switch state) and provides a function to toggle that state.
  - **Instructions:**
    1.  Define a custom Hook named `useToggle` that accepts an optional `initialValue` (boolean, defaults to `false`).
    2.  Inside `useToggle`, use `useState` to manage the boolean state.
    3.  The Hook should return an array or an object containing the current boolean state and a function to toggle it.
    4.  Create a simple component (e.g., `MedicationVisibilityToggle`) that uses your `useToggle` Hook to show/hide a mock medication detail section when a button is pressed.
  - **Tool:** [**(https://snack.expo.dev/)**](https://snack.expo.dev/) (A new Snack will need to be created for this exercise).
