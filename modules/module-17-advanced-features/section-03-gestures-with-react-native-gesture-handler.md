## Section 3: Gestures with React Native Gesture Handler

This section introduces React Native Gesture Handler, a library that provides a more comprehensive and reliable way to handle touch gestures in React Native compared to the built-in gesture responder system. We will explore its core concepts, different types of gesture handlers, and how to integrate them into your application.

### Conceptual Content

User interactions are at the heart of mobile applications. React Native Gesture Handler offers a powerful and flexible system for detecting and responding to various touch gestures. It aims to provide native-quality gesture handling by running gesture recognition logic on the UI thread, leading to more responsive and interruptible interactions, especially when used in conjunction with React Native Reanimated.

**Why a Dedicated Gesture Library?**

React Native's built-in gesture responder system can sometimes be complex to manage, especially for intricate interactions or when multiple gestures need to coexist. React Native Gesture Handler addresses these challenges by:

- **Native Performance:** Gesture recognition logic runs on the UI thread, ensuring that gestures are responsive even if the JavaScript thread is busy.
- **Declarative API:** Provides a set of components to define gestures declaratively in your JSX.
- **Rich Gesture Set:** Supports a wide variety of common gestures out of the box (tap, pan, pinch, rotate, fling, long press).
- **Composability:** Allows gestures to be composed and to define relationships between them (e.g., wait for another gesture to fail).
- **Cross-Platform Consistency:** Aims to provide consistent gesture behavior across iOS and Android.

**Installation and Setup**

In an Expo project, React Native Gesture Handler is typically included by default or easily added:

1.  **Install the library:**

    ```bash
    npx expo install react-native-gesture-handler
    ```

2.  **Import at the top level:**
    Ensure that `react-native-gesture-handler` is imported at the very top of your application's entry file (usually `App.tsx` or `index.js`) before any other code.

    ```typescript
    // App.tsx or index.js
    import "react-native-gesture-handler"; // Must be at the top
    import React from "react";
    // ... rest of your App.tsx code
    ```

> [!IMPORTANT]
> The import of `react-native-gesture-handler` must be the very first line in your application's entry point to ensure it initializes correctly.

### Referential Content

React Native Gesture Handler is built around the concept of **Gesture Handler Components**. Each component is responsible for recognizing a specific type of gesture.

**Core Concepts:**

1.  **Gesture Handler Components:** These are React components that you wrap around the `View` or `Animated.View` you want to attach a gesture to. Examples include `TapGestureHandler`, `PanGestureHandler`, `PinchGestureHandler`, etc.
2.  **Gesture State:** Each gesture handler transitions through several states (e.g., `BEGAN`, `ACTIVE`, `ENDED`, `FAILED`, `CANCELLED`). You can listen to these state changes to react accordingly.
3.  **Event Payload:** When a gesture's state changes or it progresses, it emits an event. This event contains contextual information about the gesture, such as translation, velocity, scale, or coordinates.
4.  **`onGestureEvent` Prop:** This prop is used to receive continuous updates as the gesture progresses. It's typically connected to an animated value (like a Reanimated Shared Value) to drive animations.
5.  **`onHandlerStateChange` Prop:** This prop is used to receive updates when the gesture handler's state changes.

**Common Gesture Handler Components:**

- **`TapGestureHandler`:** Recognizes tap gestures.
  - Key props: `onHandlerStateChange`, `numberOfTaps`, `maxDurationMs`.
- **`LongPressGestureHandler`:** Recognizes long press gestures.
  - Key props: `onHandlerStateChange`, `minDurationMs`.
- **`PanGestureHandler`:** Recognizes panning or dragging gestures.
  - Key props: `onGestureEvent`, `onHandlerStateChange`, `activeOffsetX`, `activeOffsetY`.
  - Event context typically provides `translationX`, `translationY`, `velocityX`, `velocityY`.
- **`PinchGestureHandler`:** Recognizes pinch-to-zoom gestures.
  - Key props: `onGestureEvent`, `onHandlerStateChange`.
  - Event context typically provides `scale`, `focalX`, `focalY`.
- **`RotationGestureHandler`:** Recognizes rotation gestures.
  - Key props: `onGestureEvent`, `onHandlerStateChange`.
  - Event context typically provides `rotation`, `anchorX`, `anchorY`.
- **`FlingGestureHandler`:** Recognizes fling gestures (a swipe with velocity).
  - Key props: `onHandlerStateChange`, `direction`.

**Using Gesture Handlers with Reanimated Hooks**

For fluid, UI-thread-driven interactions, Gesture Handler is commonly used with Reanimated's `useAnimatedGestureHandler` hook. This hook simplifies connecting gesture events directly to Shared Values.

- **`useAnimatedGestureHandler`:** This hook takes an object with optional worklet functions corresponding to different gesture states or events (e.g., `onStart`, `onActive`, `onEnd`).

  ```typescript
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
  } from "react-native-reanimated";
  import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
  } from "react-native-gesture-handler";

  // type ContextType = { startX: number; startY: number; }; // Optional context for pan

  // const translationX = useSharedValue(0);
  // const translationY = useSharedValue(0);

  // const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
  //   onStart: (event, context) => {
  //     context.startX = translationX.value;
  //     context.startY = translationY.value;
  //   },
  //   onActive: (event, context) => {
  //     translationX.value = context.startX + event.translationX;
  //     translationY.value = context.startY + event.translationY;
  //   },
  //   onEnd: (event) => {
  //     // Optionally snap back or handle velocity
  //   },
  // });
  ```

  The first type argument to `useAnimatedGestureHandler` is the type of the event object for that specific gesture (e.g., `PanGestureHandlerGestureEvent`), and the second (optional) is the type for a `context` object that can be used to store state across gesture event callbacks.

### Procedural Content

**Basic Gesture Example: Draggable View**

Let's create a simple `View` representing a SpeedyMeds pill that can be dragged around the screen using `PanGestureHandler` and Reanimated.

This example demonstrates using `PanGestureHandler` to track drag movements and `useAnimatedGestureHandler` to update `SharedValue`s for the `translateX` and `translateY` properties of an `Animated.View`.

```tsx
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

// A simple pill shape for our draggable item
const Pill = () => <Animated.View style={styles.pill} />;

// Define a context type for our gesture handler to store starting positions
type DraggableContext = {
  startX: number;
  startY: number;
};

const DraggablePill = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    DraggableContext
  >({
    onStart: (event, context) => {
      // Store the starting position of the pill
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      // Update the translation based on the drag gesture
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      // Optionally, you could add logic here, e.g., snap back to origin
      // For now, we'll let it stay where it's dragged.
      // Or, for a bit of fun, let's make it spring back slightly towards center
      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
    },
  });

  const animatedPillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.draggableContainer, animatedPillStyle]}>
        <Pill />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  draggableContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    width: 100,
    height: 50,
    backgroundColor: "#2196F3", // A blue color for the pill
    borderRadius: 25, // Make it pill-shaped
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default DraggablePill;
```

**Explanation of the Example:**

The `DraggablePill` component uses a `PanGestureHandler` to detect drag gestures. The `useAnimatedGestureHandler` hook processes these gestures: `onStart` records the initial position, `onActive` updates the `translateX` and `translateY` shared values based on the finger's movement, and `onEnd` could be used for final adjustments (like snapping). The `useAnimatedStyle` then applies these translations to the `Animated.View`, making the pill follow the user's finger. This interaction is smooth because the gesture processing and style updates all happen on the UI thread.

> [!TIP]
> When working with gestures, especially `PanGestureHandler`, always test on a physical device if possible, as simulator performance for gestures can sometimes differ from real-world behavior.

### Section Exercise

Practice using `GestureHandler` components to create interactive elements.

- **Exercise 17.2: Implementing a Basic Gesture** `**(URL_to_Expo_Snack_Exercise_17.2)**`

> 📚 **Official Documentation:**
>
> - [React Native Gesture Handler - Getting Started](https://docs.swmansion.com/react-native-gesture-handler/docs/)
> - [React Native Gesture Handler - API](https://docs.swmansion.com/react-native-gesture-handler/docs/api)
> - [React Native Gesture Handler - `PanGestureHandler`](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/pan-gesture)
> - [React Native Reanimated - `useAnimatedGestureHandler`](https://docs.swmansion.com/react-native-reanimated/docs/ событий/use-animated-gesture-handler) (Note: Official Reanimated docs cover its integration with Gesture Handler)

### Next Steps

With a foundational understanding of both Reanimated for animations and Gesture Handler for touch interactions, the next section will explore how to combine these two powerful libraries to create even more sophisticated and engaging user experiences.
