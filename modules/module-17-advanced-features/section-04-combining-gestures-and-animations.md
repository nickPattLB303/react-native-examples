## Section 4: Combining Gestures and Animations

This section explores the powerful synergy between React Native Gesture Handler and React Native Reanimated. By combining these libraries, you can create sophisticated, interactive animations that respond fluidly to user touch input, all running smoothly on the UI thread.

### Conceptual Content

The true potential of Reanimated and Gesture Handler is unlocked when they are used together. Gesture Handler captures user input and provides rich contextual data (like translation, scale, velocity), while Reanimated uses this data to drive animations in real-time on the UI thread. This combination allows for the creation of highly interactive and performant user experiences that feel native.

**Common Patterns for Combined Usage:**

1.  **Direct Manipulation:** Gesture data directly modifies shared values that control animated styles. For example, a pan gesture updates `translateX` and `translateY` shared values to drag an item.
2.  **Gesture-Triggered Animations:** A gesture event (like a tap or the end of a pan) triggers a predefined animation (`withTiming`, `withSpring`). For instance, tapping a card could make it flip over, or releasing a dragged item could make it spring back to its original position.
3.  **Continuous Feedback:** Animations respond continuously to gesture progress. For example, as a user pinches, an item scales accordingly; as they rotate their fingers, an item rotates.
4.  **Physics-Based Interactions:** Gesture velocity at the end of an interaction (e.g., a fling) can be used to initiate a decay animation or a spring animation with momentum.

**Workflow:**

1.  **Identify the Gesture:** Determine the type of user interaction you want to capture (tap, pan, pinch, etc.) and choose the appropriate `GestureHandler` component.
2.  **Define Shared Values:** Identify which style properties need to be animated (e.g., `opacity`, `transform: [{translateX: ...}, {scale: ...}]`) and create `useSharedValue` instances for them.
3.  **Create Animated Styles:** Use `useAnimatedStyle` to define a style object that depends on these shared values.
4.  **Handle Gestures:** Use `useAnimatedGestureHandler` to define worklets that respond to gesture events (`onStart`, `onActive`, `onEnd`, etc.). Inside these worklets, update the shared values based on the gesture event data.
5.  **Apply Styles:** Apply the animated styles to an `Animated` version of a component (e.g., `Animated.View`).
6.  **Wrap with Gesture Handler:** Wrap the `Animated` component with the chosen `GestureHandler` component and pass the animated gesture handler to its `onGestureEvent` prop.

> [!TIP]
> Start with simple interactions and gradually add complexity. Debugging combined gestures and animations can be tricky, so breaking down the problem into smaller parts is often helpful. Use `console.log` within your gesture handler worklets (they will log to the native console, visible in Xcode/Android Studio or via Flipper) to inspect event data and shared value states.

### Procedural Content

**Example: Draggable Card with Spring-Back and Rotation**

Let's enhance our SpeedyMeds theme by creating a `PrescriptionCard` component that can be dragged. When released, it will spring back to its original position. While dragging, it will also slightly rotate based on the horizontal drag distance.

This example demonstrates a `PanGestureHandler` combined with `useAnimatedGestureHandler` to update `translateX`, `translateY`, and `rotation` shared values. `withSpring` is used in the `onEnd` callback to animate the card back to its origin.

```tsx
import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");

// Define a context type for our gesture handler
type CardGestureContext = {
  startX: number;
  startY: number;
};

interface PrescriptionCardProps {
  medication: string;
  dosage: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  medication,
  dosage,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    CardGestureContext
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
      // No need to store initial rotation, as it's derived
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;

      // Rotate based on horizontal drag
      // Interpolate maps a range of input values to a range of output values
      rotation.value = interpolate(
        translateX.value,
        [-screenWidth / 2, 0, screenWidth / 2],
        [-10, 0, 10], // Output degrees of rotation
        Extrapolate.CLAMP // Clamp ensures output doesn't exceed -10 or 10 degrees
      );
    },
    onEnd: () => {
      // Spring back to origin and reset rotation
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      rotation.value = withSpring(0);
    },
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotation.value}deg` }, // Apply rotation
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
        <Text style={styles.medicationText}>{medication}</Text>
        <Text style={styles.dosageText}>{dosage}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: screenWidth * 0.8,
    padding: 20,
    backgroundColor: "#03A9F4", // Light blue for the card
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: 10,
  },
  medicationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  dosageText: {
    fontSize: 16,
    color: "white",
  },
});

// Example Usage (typically in your App.tsx or a screen component)
// const App = () => (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <PrescriptionCard medication="Lisinopril" dosage="10mg Daily" />
//     <PrescriptionCard medication="Metformin" dosage="500mg Twice Daily" />
//   </View>
// );

export default PrescriptionCard;
```

**Explanation of the Example:**

1.  **Shared Values:** `translateX`, `translateY`, and `rotation` are created to control the card's position and tilt.
2.  **Gesture Handling (`useAnimatedGestureHandler`):**
    - `onStart`: Records the initial `translateX` and `translateY` of the card when the drag begins.
    - `onActive`: Updates `translateX` and `translateY` based on the drag. It also calculates a `rotation` value using `interpolate`. The `interpolate` function maps the `translateX` (horizontal drag distance) to a rotation angle between -10 and 10 degrees. `Extrapolate.CLAMP` ensures the rotation doesn't exceed these bounds.
    - `onEnd`: When the drag gesture ends, `translateX`, `translateY`, and `rotation` are animated back to `0` using `withSpring`, creating a smooth spring-back effect.
3.  **Animated Styles (`useAnimatedStyle`):** The `animatedCardStyle` applies the `translateX`, `translateY`, and `rotateZ` transformations to the card.
4.  **Component Structure:** The `PrescriptionCard` is wrapped in a `PanGestureHandler`. The `animatedCardStyle` is applied to the `Animated.View` representing the card.

This example creates an engaging interaction where the card not only follows the user's finger but also tilts slightly and springs back into place when released.

> 📲 **(Native Developers):**
>
> **Comparison:** This pattern of capturing gesture data (like translation or velocity) and using it to drive animation parameters is very similar to how you might implement custom interactive animations on iOS (e.g., with `UIPanGestureRecognizer` and `UIViewPropertyAnimator`) or Android (e.g., `GestureDetector` and `ObjectAnimator` or spring physics).
>
> **Key Takeaway:** Reanimated and Gesture Handler provide a high-level, declarative way to achieve complex, physics-based interactions that feel native, managing the UI thread updates for you.

> 📚 **Official Documentation:**
>
> - [React Native Reanimated - Combining with Gesture Handler](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/events#using-usedeclarativegesturehandler)
> - [React Native Gesture Handler - Overview](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/overview)
> - [React Native Reanimated - `interpolate`](https://docs.swmansion.com/react-native-reanimated/docs/utilities/interpolate)
> - [React Native Reanimated - `withSpring`](https://docs.swmansion.com/react-native-reanimated/docs/animations/with-spring)

### Next Steps

Having explored animations and gestures, we will now shift our focus to another important aspect of UI development: working with Scalable Vector Graphics (SVGs) to include resolution-independent images and icons in your application.
