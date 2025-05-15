## Section 2: Introduction to React Native Reanimated

This section introduces React Native Reanimated, a powerful library for creating fluid and high-performance animations. We will explore its core concepts, understand how it achieves its performance benefits, and walk through setting it up and creating a basic animation.

### Conceptual Content

React Native Reanimated (often referred to as "Reanimated") is a library that allows developers to create smooth animations that run directly on the native UI thread, bypassing the React Native bridge for frame-by-frame updates. This leads to animations that are less susceptible to JavaScript thread performance issues, resulting in a significantly better user experience.

**Core Philosophy: UI Thread Animations**

The primary goal of Reanimated is to perform animation logic entirely on the UI thread. This means that even if your JavaScript thread is busy with complex calculations or rendering, your animations remain fluid. It achieves this through a JSI (JavaScript Interface) based architecture, enabling more direct and synchronous communication between the JavaScript and native environments.

**Installation and Setup**

In an Expo project, adding Reanimated is straightforward. Expo manages much of the native configuration for you.

1.  **Install the library:**

    ```bash
    npx expo install react-native-reanimated
    ```

2.  **Add the Babel plugin:**
    Modify your `babel.config.js` file to include the Reanimated Babel plugin. This plugin is crucial as it transforms your JavaScript code (specifically worklets) into a format that can run on the UI thread.

    ```javascript
    // babel.config.js
    module.exports = function (api) {
      api.cache(true);
      return {
        presets: ["babel-preset-expo"],
        plugins: [
          // Required: 'react-native-reanimated/plugin' must be listed last.
          "react-native-reanimated/plugin",
        ],
      };
    };
    ```

> [!IMPORTANT]
> The `react-native-reanimated/plugin` MUST be the last item in the `plugins` array in your `babel.config.js`.

After installation and plugin configuration, you might need to restart your development server and clear the Metro bundler cache:

```bash
npx expo start --clear
```

### Referential Content

Reanimated introduces several core concepts that are fundamental to its usage:

**1. Worklets**

Worklets are small pieces of JavaScript code, marked with the `'worklet';` directive at the top, that Reanimated can execute synchronously on the UI thread. They are the building blocks for running animation logic off the JavaScript thread.

- **Purpose:** To define functions that can run on the UI thread, allowing direct manipulation of shared values and computation of styles without crossing the bridge for each frame.
- **Syntax:** A function becomes a worklet by adding the `'worklet';` string literal as the first statement in its body.

  ```typescript
  // Example of a worklet
  function myWorklet(greeting: string) {
    "worklet"; // This directive makes it a worklet
    console.log(greeting + " from the UI thread!");
  }
  ```

  Worklets have some restrictions: they can only call other worklets or JSI functions, and they capture variables from their surrounding scope similarly to JavaScript closures, but these captured values are copied, not shared by reference unless they are Shared Values.

**2. Shared Values (`useSharedValue`)**

Shared Values are reactive variables that can be read and modified by both JavaScript code (on the JS thread) and worklets (on the UI thread). They are the primary drivers for animations.

- **Purpose:** To hold data that changes over time to drive animations. Changes to shared values can trigger updates in animated styles.
- **Hook:** `useSharedValue(initialValue)`
- **Usage:** You create a shared value using the `useSharedValue` hook. Its `.value` property can be accessed and modified from both JS and UI threads.

  ```typescript
  import { useSharedValue } from "react-native-reanimated";

  // In a component
  const opacity = useSharedValue(0); // Initial opacity is 0

  // To change it (can be from JS or a worklet):
  // opacity.value = 1;
  ```

**3. Animated Styles (`useAnimatedStyle`)**

This hook is used to create style objects that depend on Shared Values. When a Shared Value changes, the style object is automatically recomputed on the UI thread, and the connected component re-renders with the new style.

- **Purpose:** To define styles that react to changes in shared values, allowing animated components to update their appearance smoothly.
- **Hook:** `useAnimatedStyle(() => { ... }, [dependencies])`
- **Usage:** It takes a worklet function as its first argument. This worklet returns a style object. The properties in this style object can be derived from shared values.

  ```typescript
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
  } from "react-native-reanimated";

  // const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value, // Style depends on the shared value
      transform: [{ translateX: opacity.value * 100 }],
    };
  });
  ```

  The optional second argument is a dependency array, similar to `React.useEffect` or `React.useMemo`, controlling when the style worklet itself is redefined.

**4. Animation Functions/Modifiers (e.g., `withTiming`, `withSpring`)**

Reanimated provides functions to update Shared Values over time, creating animations. These are typically used to change a shared value from its current state to a target state with a specific animation curve.

- **Purpose:** To apply timed or physics-based transitions to shared values.
- **Examples:**
  - `withTiming(targetValue, config?, callback?)`: Animates a shared value to a `targetValue` over a specified duration with an easing function.
  - `withSpring(targetValue, config?, callback?)`: Animates a shared value to a `targetValue` using spring physics.
  - `withRepeat(animation, numberOfReps?, reverse?, callback?)`: Repeats an animation a certain number of times or indefinitely.
  - `withSequence(animation1, animation2, ...)`: Runs animations one after another.
- **Usage:** These functions are used when assigning a new value to a shared value's `.value` property.

  ```typescript
  // const opacity = useSharedValue(0);
  // To animate opacity to 1 over 500ms:
  // opacity.value = withTiming(1, { duration: 500 });
  ```

**5. Animated Components**

To apply animated styles, you need to use special animated versions of React Native components. Reanimated provides these, or you can create your own.

- **Purpose:** Components whose style props can accept style objects generated by `useAnimatedStyle`.
- **Usage:** Reanimated exports animated versions of standard components, like `Animated.View`, `Animated.Text`, `Animated.ScrollView`, etc. You can also create animatable versions of your own components or third-party components using `Animated.createAnimatedComponent()`.

  ```typescript
  // <Animated.View style={animatedStyle} />
  ```

### Procedural Content

**Basic Animation Example: Fading In a View**

Let's create a simple component where a `View` (representing a notification for a new SpeedyMeds prescription) fades in when the component mounts.

This example shows how to use `useSharedValue` to store an opacity value, `useAnimatedStyle` to create a style object based on that shared value, and `withTiming` to animate the opacity when the component mounts.

```tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Create an animatable version of the View component
// const AnimatedView = Animated.createAnimatedComponent(View);
// Or simply use the pre-built Animated.View

/**
 * @component PrescriptionNotification
 * @description A component that displays a SpeedyMeds prescription alert with a fade-in animation on mount.
 * This component demonstrates the basic usage of React Native Reanimated's core concepts:
 * - `useSharedValue` for creating a reactive variable (opacity).
 * - `useAnimatedStyle` for creating a style object that depends on the shared value.
 * - `withTiming` for animating the shared value over a specific duration.
 * - `Animated.View` for applying the animated styles.
 * The animation is designed to run smoothly on the UI thread.
 */
const PrescriptionNotification = () => {
  // Shared value for opacity, starting at 0 (invisible)
  const opacity = useSharedValue(0);

  // Animated style that depends on the opacity shared value
  const animatedNotificationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // useEffect to trigger the animation when the component mounts
  useEffect(() => {
    // Animate opacity to 1 (fully visible) over 1000ms (1 second)
    opacity.value = withTiming(1, { duration: 1000 });
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.notificationContainer, animatedNotificationStyle]}
    >
      <Text style={styles.notificationText}>New Prescription Alert!</Text>
      <Text style={styles.detailsText}>
        Tap to view details for Amoxicillin.
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    padding: 20,
    margin: 15,
    backgroundColor: "#4CAF50", // A green color for the notification
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  detailsText: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
});

export default PrescriptionNotification;
```

**Explanation of the Example:**

This `PrescriptionNotification` component serves as a practical introduction to React Native Reanimated, demonstrating a common UI pattern: a fade-in animation for newly appearing content, themed for our SpeedyMeds application. The goal is to visually introduce an important alert, such as a new prescription being ready, in an engaging way.

The core of the animation lies in several Reanimated hooks working in concert:

1.  **`useSharedValue(0)`:** We initialize a `shared value` called `opacity` with a starting value of 0. Shared values are special reactive variables that can be accessed and modified from both the JavaScript thread and, crucially, directly from the UI thread via worklets. This `opacity` value will drive our animation, starting completely transparent.

2.  **`useAnimatedStyle(() => { ... })`:** This hook creates `animatedNotificationStyle`. The function passed to `useAnimatedStyle` is a worklet – a small piece of JavaScript that Reanimated executes on the UI thread. Inside this worklet, we return a style object: `{ opacity: opacity.value }`. Whenever `opacity.value` changes, this worklet re-runs on the UI thread, and a new style object is generated. This direct execution on the UI thread is key to Reanimated's performance, as it avoids sending style updates over the React Native bridge for each frame.

3.  **`useEffect(() => { ... }, [opacity])`:** This standard React hook is used here to trigger the animation once the component mounts. Inside `useEffect`, we update our shared value: `opacity.value = withTiming(1, { duration: 1000 });`.

    - `withTiming` is a Reanimated animation helper. It tells Reanimated to change `opacity.value` from its current state to the target value (1, fully opaque) over a specified `duration` (1000 milliseconds or 1 second). Reanimated handles the interpolation of values frame by frame on the UI thread.

4.  **`<Animated.View style={[styles.notificationContainer, animatedNotificationStyle]}>`:** Instead of a regular `<View>`, we use `Animated.View`. This special component from Reanimated is capable of accepting style objects generated by `useAnimatedStyle`. As `animatedNotificationStyle` changes (driven by `opacity.value`), the `Animated.View` smoothly updates its appearance.

**In summary:** When `PrescriptionNotification` mounts, `useEffect` initiates an animation using `withTiming` to change `opacity.value` from 0 to 1. The `useAnimatedStyle` worklet reacts to these changes in `opacity.value` on the UI thread, updating the styles of the `Animated.View`. This results in the notification container smoothly fading into full visibility over one second. This entire animation sequence for opacity is managed on the UI thread, ensuring a fluid user experience even if the JavaScript thread is busy with other tasks. This approach is fundamental for creating high-performance animations in React Native and is a core strength of the Reanimated library.

> [!TIP]
> In Expo Go, if you make changes to Reanimated code, especially in `babel.config.js` or install/update the library, it's often a good idea to restart the Metro bundler with the `--clear` flag (`npx expo start --clear`) to ensure changes are correctly applied.

### Section Exercise

Apply your understanding of these core concepts in the following exercise.

- **Exercise 17.1: Basic Reanimated Animation** `**(https://snack.expo.dev/--replace-this-with-actual-exercise-17.1-url--)**`

> 📚 **Official Documentation:**
>
> - [React Native Reanimated - Core Concepts](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/core-concepts)
> - [React Native Reanimated - `useSharedValue`](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/shared-values)
> - [React Native Reanimated - `useAnimatedStyle`](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/styles)
> - [React Native Reanimated - `withTiming`](https://docs.swmansion.com/react-native-reanimated/docs/animations/with-timing)
> - [React Native Reanimated - `withSpring`](https://docs.swmansion.com/react-native-reanimated/docs/animations/with-spring)

### Next Steps

Now that you have a basic understanding of React Native Reanimated, the next section will introduce React Native Gesture Handler, a library that works seamlessly with Reanimated to create sophisticated touch-based interactions.
