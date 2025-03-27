# 10: Animations ✨

Animations bring UIs to life, provide visual feedback, and guide user attention. React Native provides two complementary animation systems: the granular `Animated` API for detailed control, and `LayoutAnimation` for simple automated layout transitions.

*   **`Animated` API:** Powerful, imperative API for fine-grained control over animated values.
    *   Core concepts: `Animated.Value`, `Animated.timing`, `Animated.spring`, interpolation, composition.
    *   Use `useNativeDriver: true` for performance.
*   **`LayoutAnimation`:** Simpler API for animating layout changes automatically on the *next* render. Less flexible.
*   **Third-Party Libraries:** Libraries like `react-native-reanimated` offer even more performant and declarative animation capabilities (often used for gesture-based animations).

> Animations enhance user experience but should be used purposefully and performantly.

<div class="android-dev">🤖 **Android Devs:** `Animated` is like using `ValueAnimator` or `ObjectAnimator`. `LayoutAnimation` is similar to enabling `android:animateLayoutChanges="true"` on a ViewGroup. `react-native-reanimated` aims for performance closer to native rendering thread animations.</div>
<div class="ios-dev">🍏 **iOS Devs:** `Animated` is conceptually similar to `UIView.animate` or Core Animation (`CABasicAnimation`). `LayoutAnimation` provides effects like `UIView.animateLayoutChanges`. `react-native-reanimated` tries to match the performance of native animations run off the main thread.</div>
<div class="react-dev">⚛ **React Devs:** `Animated` feels different from CSS Transitions/Animations. It's more imperative. `react-native-reanimated` (especially v2+) introduces hooks and worklets, feeling closer to React paradigms while aiming for high performance.</div>
<div class="angular-dev">🅰 **Angular Devs:** `Animated` is like programmatically controlling animations, perhaps similar to using Angular's `AnimationBuilder`. `LayoutAnimation` is simpler, like basic CSS transitions triggered by state changes.</div>

<blockquote><details>

Animations are crucial for creating modern, engaging mobile interfaces. They can smooth transitions, provide feedback on user interactions, and draw attention to important elements. React Native's primary tool for this is the `Animated` API. It allows you to define animated values (`Animated.Value` or `Animated.ValueXY`) and drive changes to these values over time using functions like `Animated.timing` (for time-based easing) or `Animated.spring` (for physics-based bouncing). You then map these animated values to style properties (like `opacity`, `transform`, `width`, `height`) of special `Animated.` components (e.g., `Animated.View`). A key performance optimization is using `useNativeDriver: true`, which sends the animation details to the native side, allowing the animation to run smoothly even if the JavaScript thread is busy. `LayoutAnimation` offers a simpler way to animate changes triggered by state updates that affect layout, but offers less control. For complex or gesture-driven animations, the community often turns to `react-native-reanimated`.

</details></blockquote>

---

## `Animated` API Basics

The core idea is to create animated values and map them to styles.

1.  **Create Animated Value:** Use `useRef` with `new Animated.Value(initialValue)`.
2.  **Define Animation:** Use `Animated.timing`, `Animated.spring`, etc., to change the value. Call `.start()` to begin.
3.  **Apply to Style:** Use the animated value in the `style` prop of an `Animated.` component (e.g., `Animated.View`, `Animated.Text`).
4.  **Use Native Driver:** Add `useNativeDriver: true` for performance (works for non-layout properties like `opacity`, `transform`).

```typescript
import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Button, Easing } from 'react-native';

// Use Animated components for styles driven by Animated.Value
const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * A component that fades in when mounted.
 * @returns {JSX.Element} An Animated.View that fades in.
 */
const FadeInView = ({ children }: { children: React.ReactNode }) => {
  // 1. Create Animated Value (opacity starts at 0)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Define Animation (fade in to opacity 1 over 1 second)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true, // Use native driver for opacity animation
    }).start(); // 2a. Start the animation
  }, [fadeAnim]); // Re-run effect if fadeAnim changes (though it won't here)

  return (
    // 3. Apply Animated Value to Style
    <AnimatedView style={{ opacity: fadeAnim }}>
      {children}
    </AnimatedView>
  );
};

// Example Usage:
const AnimationScreen = () => {
  return (
    <View style={styles.container}>
      <FadeInView>
        <View style={styles.box}>
            <Text style={styles.text}>Fading In!</Text>
        </View>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    box: { width: 150, height: 150, backgroundColor: '#61dafb', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    text: { color: 'white', fontWeight: 'bold' }
});

export default AnimationScreen;

```

> Wrap components you want to animate with `Animated.createAnimatedComponent` or use built-ins like `Animated.View`.

<blockquote><details>

Let's break down the `Animated` API workflow shown in the `FadeInView` example. First, we need a value that can be animated. We create this using `useRef(new Animated.Value(0)).current`. `useRef` ensures we keep the same `Animated.Value` instance across re-renders. We initialize it to `0`, representing the starting opacity. Second, inside a `useEffect` hook (so it runs after the component mounts), we define the animation using `Animated.timing`. This function takes the animated value (`fadeAnim`) and a configuration object. We specify the `toValue` (target opacity `1`), the `duration` (1000ms), an optional `easing` function, and crucially, `useNativeDriver: true`. Using the native driver offloads the animation work from the JS thread to the native UI thread, resulting in much smoother animations, especially for `opacity` and `transform` styles. Finally, we call `.start()` on the animation definition to initiate it. Third, we apply the animated value to the component's style. We use `<AnimatedView>` (or any `Animated.` component) and set its `opacity` style directly to our `fadeAnim` value: `style={{ opacity: fadeAnim }}`. `Animated` knows how to bind this value to the native view's property, updating it frame by frame as the animation runs.

</details></blockquote>

---

## Interpolation

Map an animated value's range to a different output range, often used for complex transformations or color changes.

*   `Animated.Value.interpolate(config)`
*   `config`: `{ inputRange: number[], outputRange: number[] | string[] }`
*   `inputRange`: Values from the source `Animated.Value`. Must be increasing.
*   `outputRange`: Corresponding output values (can be numbers or strings like colors, degrees).

```typescript
import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Button, Text } from 'react-native';

const InterpolationExample = () => {
  const animValue = useRef(new Animated.Value(0)).current; // Value from 0 to 1

  const startAnimation = () => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false, // NOTE: Interpolating color often requires useNativeDriver: false
                              // Transform interpolations CAN use native driver
    }).start(() => animValue.setValue(0)); // Reset after animation
  };

  // Interpolate 0..1 => 0..100 (for moving right)
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Move 100dp to the right
  });

  // Interpolate 0..1 => 0..360deg (for rotation)
  const rotate = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'],
  });

  // Interpolate 0..1 => blue..red (for background color)
  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(0, 0, 255)', 'rgb(255, 0, 0)'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor, // Apply interpolated color
            transform: [
              { translateX }, // Apply interpolated translation
              { rotate },      // Apply interpolated rotation
            ],
          },
        ]}
      >
          <Text style={styles.text}>Whee!</Text>
      </Animated.View>
      <Button title="Animate" onPress={startAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    box: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center' },
    text: { color: 'white' }
});

export default InterpolationExample;
```

> Interpolation allows complex effects by mapping a single animated value to multiple style properties with different ranges or units. Be mindful of `useNativeDriver` compatibility (color/layout props often require `false`).

<blockquote><details>

Interpolation is a powerful feature of the `Animated` API that lets you map the progression of a single `Animated.Value` to various different output ranges or formats. You call the `.interpolate()` method on an `Animated.Value` instance, passing a configuration object. This object requires `inputRange` and `outputRange` arrays. The `inputRange` defines key points in the animated value's progression (e.g., `[0, 1]`), and `outputRange` defines the corresponding values you want at those points. `Animated` then calculates intermediate values smoothly.

In the example, a single `animValue` goes from 0 to 1.
1.  `translateX`: We map `0..1` to `0..100`. As `animValue` increases, the output goes from 0dp to 100dp, moving the box right.
2.  `rotate`: We map `0..0.5..1` to `'0deg'..'180deg'..'360deg'`. The box rotates 360 degrees over the animation duration.
3.  `backgroundColor`: We map `0..1` to `'rgb(0, 0, 255)'` (blue) and `'rgb(255, 0, 0)'` (red). The background color transitions from blue to red.

These interpolated values are then used directly in the style object. Note that interpolating certain properties, especially colors or layout properties (`width`, `height`, `margin`, etc.), often requires setting `useNativeDriver: false` in the animation config, as these cannot always be handled purely on the native UI thread. Interpolations applied to `transform` properties (`translateX`, `rotate`, `scale`) and `opacity` *can* typically use the native driver.

</details></blockquote>

---

## Composition: Combining Animations

`Animated` provides functions to orchestrate multiple animations.

*   `Animated.sequence(animations)`: Runs animations one after another.
*   `Animated.parallel(animations)`: Runs animations simultaneously.
*   `Animated.stagger(delay, animations)`: Runs animations in parallel but with a specified delay between the start of each subsequent animation.
*   `Animated.delay(duration)`: Creates an animation that simply waits for a duration.

```typescript
import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Button } from 'react-native';

const CompositionExample = () => {
  const anim1 = useRef(new Animated.Value(0)).current; // Opacity
  const anim2 = useRef(new Animated.Value(1)).current; // Scale

  const startSequence = () => {
    // Fade in, then scale up
    Animated.sequence([
      Animated.timing(anim1, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(anim2, { toValue: 1.5, friction: 3, useNativeDriver: true }),
    ]).start(() => { // Reset after sequence
        anim1.setValue(0);
        anim2.setValue(1);
    });
  };

  const startParallel = () => {
    // Fade in AND scale up simultaneously
    Animated.parallel([
      Animated.timing(anim1, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(anim2, { toValue: 1.5, friction: 3, useNativeDriver: true }),
    ]).start(() => { // Reset after parallel
        anim1.setValue(0);
        anim2.setValue(1);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { opacity: anim1, transform: [{ scale: anim2 }] }]} />
      <View style={styles.buttonRow}>
        <Button title="Sequence" onPress={startSequence} />
        <Button title="Parallel" onPress={startParallel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    box: { width: 100, height: 100, backgroundColor: 'tomato', borderRadius: 8 },
    buttonRow: { flexDirection: 'row', marginTop: 20 }
});

export default CompositionExample;
```

> Composition functions allow you to build complex animation sequences from simpler `timing` or `spring` animations.

<blockquote><details>

Often, you need to coordinate multiple animations. The `Animated` API provides compositing functions for this. `Animated.sequence` takes an array of animation definitions and runs them sequentially – the second animation starts only after the first one finishes, and so on. `Animated.parallel` also takes an array of animations but starts all of them at the same time. `Animated.stagger` is useful for creating cascading effects; it starts animations in parallel but introduces a fixed delay between the start of each consecutive animation in the array. `Animated.delay` can be used within a sequence to introduce pauses.

The example demonstrates `sequence` and `parallel`. `startSequence` first fades the box in (`anim1` opacity 0 to 1) using `timing`, and *then* scales it up (`anim2` scale 1 to 1.5) using `spring`. `startParallel` fades the box in *while simultaneously* scaling it up. These composition functions return a new animation control object that has its own `.start()` method, allowing you to coordinate the entire group. Callbacks can be added to the `.start()` method of composite animations to run code after the entire sequence or parallel group completes.

</details></blockquote>

---

## `LayoutAnimation`

A simpler API for automatically animating layout changes triggered by state/prop updates.

1.  **Enable:** Call `LayoutAnimation.configureNext(config)` *before* the state change that causes a re-render with layout changes. Often requires `UIManager.setLayoutAnimationEnabledExperimental(true)` on Android.
2.  **Update State:** Set state that affects component layout (size, position, flex properties, adding/removing components).
3.  **Observe:** React Native automatically animates views to their new positions/sizes.

```typescript
import React, { useState } from 'react';
import { View, Button, StyleSheet, LayoutAnimation, Platform, UIManager, Text } from 'react-native';

// Enable LayoutAnimation on Android (put this in your app's entry point or relevant component)
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LayoutAnimationExample = () => {
  const [boxSize, setBoxSize] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  const toggleSize = () => {
    // 1. Configure the *next* layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Or use LayoutAnimation.Presets.linear or LayoutAnimation.Presets.easeInEaseOut
    // Or create a custom config: LayoutAnimation.create(duration, type, creationProp)

    // 2. Update state causing layout change
    setBoxSize(boxSize === 100 ? 150 : 100);
  };

  const toggleVisibility = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsVisible(!isVisible); // Adding/removing component triggers layout animation
  }

  return (
    <View style={styles.container}>
      <Button title="Toggle Size (Spring)" onPress={toggleSize} />
      <Button title="Toggle Visibility (Ease)" onPress={toggleVisibility} />
      <View style={styles.boxContainer}>
        {isVisible && (
            <View style={[styles.box, { width: boxSize, height: boxSize }]}>
                <Text style={styles.text}>Box</Text>
            </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  boxContainer: { marginTop: 20, height: 200, width: 200, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  box: { backgroundColor: 'coral', alignItems: 'center', justifyContent: 'center' },
  text: { color: 'white' }
});

export default LayoutAnimationExample;
```

> `LayoutAnimation` is easy for simple transitions like list item additions/removals or size changes, but offers less control than `Animated`. Requires setup on Android.

<blockquote><details>

`LayoutAnimation` provides a different approach focused on automatically animating transitions between layout states. Instead of manually defining animated values and mapping them to styles, you simply tell React Native *how* you want the *next* layout change to be animated, and then you update your component's state or props in a way that causes a layout change (e.g., changing dimensions, adding/removing elements).

The process is:
1.  **Enable (Android):** For Android, you typically need to enable the experimental flag `UIManager.setLayoutAnimationEnabledExperimental(true)` once, usually near your app's entry point.
2.  **Configure:** *Before* the state update that triggers the layout change, call `LayoutAnimation.configureNext()`. You can pass predefined configurations like `LayoutAnimation.Presets.spring`, `linear`, or `easeInEaseOut`, or create a custom configuration specifying duration, animation type (`spring`, `linear`, `easeIn`, etc.), and the property to animate (`opacity`, `scaleXY`).
3.  **Update State:** Perform the state update (e.g., `setState`, `useState` setter).

React Native then calculates the difference between the layout before and after the state update and automatically animates all affected views to their new positions and sizes using the configuration you provided. It's great for simple effects like animating list item additions/removals or basic size/position changes triggered by state, but it lacks the fine-grained control, interruptibility, and complex mapping capabilities of the `Animated` API.

</details></blockquote>

---

## Summary: Animations

*   ✨ **Purpose:** Improve UX, provide feedback, guide attention.
*   ⚙️ **`Animated` API:** Granular control via `Animated.Value`.
    *   Drive with `timing`, `spring`, etc. Call `.start()`.
    *   Apply to `Animated.` components' styles.
    *   Use `useNativeDriver: true` for `opacity`/`transform` performance.
    *   Use `interpolate` to map value ranges to different outputs.
    *   Use `sequence`, `parallel`, `stagger` to compose animations.
*   📐 **`LayoutAnimation`:** Simpler API for automatic layout transitions.
    *   Call `configureNext` *before* state update causing layout change.
    *   Requires setup on Android. Less flexible.
*   🚀 **Performance:** Prioritize `useNativeDriver: true` with `Animated`. Consider `react-native-reanimated` for complex/gesture-based needs.

> Choose the right animation API for your needs: `Animated` for control, `LayoutAnimation` for simplicity, and explore `reanimated` for advanced performance.

<blockquote><details>

This section introduced the fundamentals of animation in React Native. We focused primarily on the powerful `Animated` API, covering its core concepts: creating `Animated.Value` instances, driving them with `Animated.timing` or `Animated.spring`, applying these values to the styles of `Animated.` components, and using interpolation (`value.interpolate()`) to create complex mappings. The importance of `useNativeDriver: true` for offloading animations to the native thread for better performance (especially for `opacity` and `transform`) was emphasized. We also looked at composing multiple animations using `sequence`, `parallel`, and `stagger`. As a simpler alternative, `LayoutAnimation` was presented for automatically animating layout changes triggered by state updates, noting its ease of use for certain scenarios but also its limitations and the required Android setup. Finally, we briefly mentioned `react-native-reanimated` as a more advanced library often preferred for high-performance or gesture-driven animations. Effective animation requires choosing the right tool and prioritizing performance.

</details></blockquote> 