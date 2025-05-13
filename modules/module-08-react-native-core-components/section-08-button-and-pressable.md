## Section 8: Button and Pressable (`<Button>`, `<Pressable>`) - Handling Taps

User interaction is at the heart of mobile applications. The `<Button>` and `<Pressable>` components are React Native's primary tools for capturing tap gestures and triggering actions. This section explores both, highlighting their differences and use cases.

### Conceptual Content: Understanding `<Button>` and `<Pressable>`

Both components allow users to trigger an action by tapping them, but they offer different levels of customization and platform consistency.

**`<Button>` Component:**

The `<Button>` component is a simple, pre-styled button that renders with a look and feel native to the platform (iOS or Android). It's convenient for quick use when you don't need much customization.

**Key Characteristics of `<Button>`:**

- **Platform-Native Look:** It renders as a standard native button, meaning its appearance will differ between iOS and Android to match the respective OS design guidelines.
- **Limited Styling:** Customization options for `<Button>` are very limited. You can set a `title` (the text on the button), a `color` (which affects the text color on iOS and the background color on Android for some styles), and an `onPress` handler. You cannot style it with the `style` prop like other components, nor can you embed other components (like an icon) inside it.
- **Accessibility:** It comes with built-in accessibility features appropriate for a native button.
- **Simplicity:** Easy to use for basic actions where the default platform styling is acceptable.

**`<Pressable>` Component:**

The `<Pressable>` component is a more generic and highly customizable touch responder. It was introduced to provide a more flexible way to handle various states of user interaction (e.g., when a press begins, ends, or is held long) and to give developers full control over the visual feedback.

**Key Characteristics of `<Pressable>`:**

- **Highly Customizable:** You can wrap any `<View>`, `<Text>`, `<Image>`, or custom component(s) within a `<Pressable>` and define how it looks and responds to touch events. It fully supports the `style` prop.
- **Interaction Feedback:** Provides props to detect different phases of a press gesture (`onPressIn`, `onPressOut`, `onLongPress`).
- **State-Dependent Styling:** The `style` prop can be a function that receives an object with a `pressed` boolean state (e.g., `style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1.0 })}`). This allows you to change the style dynamically when the component is pressed.
- **No Default Styling:** Unlike `<Button>`, `<Pressable>` has no default visual appearance. It's up to you to style it and its children.
- **Accessibility:** Provides props like `accessibilityRole="button"` to ensure it's treated as a button by assistive technologies.
- **HitRect (Hit Slop):** The `hitSlop` prop allows you to extend the touchable area of the `<Pressable>` beyond its visual bounds, making it easier for users to tap small elements.

**When to Use Which:**

- Use `<Button>` when:
  - You need a very simple button with standard platform styling.
  - Minimal customization is required.
  - Quick implementation is prioritized.
- Use `<Pressable>` when:
  - You need custom styling, layout, or content (e.g., a button with an icon and text).
  - You need to provide specific visual feedback for different press states (e.g., change opacity, background color on press).
  - You require more advanced touch interactions like `onLongPress`.
  - You need to control the hit area with `hitSlop`.
  - You want a consistent look and feel across both iOS and Android that you define yourself.

In most modern React Native development, `<Pressable>` is often preferred for its flexibility and control, especially when building custom-designed UIs like those in the SpeedyMeds app.

> 📲 **(Native Developers):**
>
> **Comparison:**
>
> - `<Button>` is like a basic `UIButton` (iOS) or `android.widget.Button` (Android) with its default system appearance. Customization is limited, similar to trying to heavily modify a default system button without subclassing or creating a custom view.
> - `<Pressable>` is more like creating a custom `UIControl` (iOS) or a custom `View` with touch handling (Android). It gives you a blank slate to define the appearance and behavior of a tappable element.
>
> **Key Takeaway:** `<Button>` for quick, standard buttons. `<Pressable>` for all custom button needs and advanced interaction feedback.
>
> **Source:** [React Native Docs: Button](https://reactnative.dev/docs/button), [React Native Docs: Pressable](https://reactnative.dev/docs/pressable)

> 🌐 **(Web Developers):**
>
> **Comparison:**
>
> - `<Button title="Click Me" />` is somewhat analogous to a basic HTML `<button>Click Me</button>` that largely inherits browser/OS default styling.
> - `<Pressable>` is like a `<div>` or `<span>` that you've made interactive with JavaScript event listeners (`onClick`, `onMouseDown`, `onMouseUp`) and styled with CSS, including pseudo-classes like `:hover` or `:active` (though React Native uses a function for `style` to achieve state-dependent styling).
>
> **Key Takeaway:** `<Button>` is for simple use cases. `<Pressable>` offers the power to create any kind of tappable UI element with full style control, much like building custom interactive elements on the web.
>
> **Source:** [MDN Web Docs: `<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

### Referential Content: Common Props

**Common `<Button>` Props:**

- `title`: (string, **required**) Text to display inside the button.
- `onPress`: (function, **required**) Handler to be called when the user taps the button.
- `color`: (string) Color of the text on iOS, background color on Android (for default button style). On Android, the color control can be limited for some button styles.
- `disabled`: (boolean) If `true`, disable all interactions for this component. Default is `false`.
- `accessibilityLabel`: (string) Text that screen readers will speak.

**Common `<Pressable>` Props:**

- `children`: (React.ReactNode | function) The content to render inside the `Pressable`. Can be a function that receives an object with `pressed` state: `({ pressed }) => <Text>{pressed ? 'Pressed!' : 'Press Me'}</Text>`.
- `onPress`: (function) Handler called when a press is released.
- `onPressIn`: (function) Handler called when a press gesture has started.
- `onPressOut`: (function) Handler called when the press gesture is deactivated (e.g., finger lifted).
- `onLongPress`: (function) Handler called after a long press (duration can be configured via `delayLongPress`).
- `style`: (StyleProp<ViewStyle> | function) Styles for the `Pressable` container. Can be a function `({ pressed }) => StyleProp<ViewStyle>` to apply styles based on pressed state.
- `disabled`: (boolean) If `true`, disable all interactions.
- `hitSlop`: (number | Insets) Defines how far a touch can start away from the `Pressable` and still activate it.
  - _Type Insets:_ `{ top?: number, bottom?: number, left?: number, right?: number }`
- `accessibilityRole`: (string) e.g., `'button'`, `'link'`, `'checkbox'`.
- `android_ripple`: (object) Configuration for Android's ripple effect. E.g., `{ color: 'grey', borderless: false }`.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Button Props](https://reactnative.dev/docs/button#props)
> - [React Native Docs: Pressable Props](https://reactnative.dev/docs/pressable#props)
> - [Expo Docs: Button](https://docs.expo.dev/ui-programming/button/)
> - [Expo Docs: Pressable](https://docs.expo.dev/ui-programming/pressable/)

### Procedural Content: Basic Usage

Let's see examples of both in the context of SpeedyMeds.

**1. `<Button>` Example: Simple Action**

Imagine a simple "Log Out" button in SpeedyMeds.

```tsx
import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";

export default function SettingsScreen_Button() {
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out from SpeedyMeds?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          onPress: () => console.log("User logged out"),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Log Out from SpeedyMeds"
        onPress={handleLogout}
        color="#c0392b" // A reddish color for a destructive action
        accessibilityLabel="Tap to log out of your SpeedyMeds account"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
});
```

**Explanation of `<Button>` Example:**

- A `<Button>` is used with a `title`, an `onPress` handler (`handleLogout`), and a `color`.
- The `handleLogout` function uses `Alert.alert` to show a confirmation dialog.
- The styling of the button itself is minimal and platform-dependent. The `color` prop primarily affects the text on iOS and can influence the background on Android (behavior can vary based on Android themes/versions).

**2. `<Pressable>` Example: Custom Styled Button with Feedback**

Let's create a custom "Add to Cart" button for a medication item in SpeedyMeds.

```tsx
import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";

interface MedicationItemProps {
  medicationName: string;
}

export default function MedicationAddToCartButton({
  medicationName,
}: MedicationItemProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      Alert.alert("Success", `${medicationName} added to cart!`);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.medicationTitle}>{medicationName}</Text>
      <Pressable
        onPress={handleAddToCart}
        disabled={isAdding}
        style={({ pressed }) => [
          styles.buttonBase,
          isAdding ? styles.buttonDisabled : styles.buttonEnabled,
          pressed && !isAdding ? styles.buttonPressed : null,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Add ${medicationName} to cart`}
      >
        {({ pressed }) => (
          <Text style={styles.textStyle}>
            {isAdding ? "Adding..." : `Add ${medicationName} to Cart`}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  medicationTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 3,
  },
  buttonEnabled: {
    backgroundColor: "#28a745", // Green for enabled
  },
  buttonDisabled: {
    backgroundColor: "#cccccc", // Grey for disabled
  },
  buttonPressed: {
    backgroundColor: "#218838", // Darker green for pressed state
    opacity: 0.9,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
```

**Explanation of `<Pressable>` Example:**

- **Custom Content:** The `<Pressable>` wraps a `<Text>` component, allowing full control over the button's content.
- **Stateful Styling:** The `style` prop of `<Pressable>` is a function: `({ pressed }) => [...]`.
  - It takes an object with a `pressed` boolean as an argument.
  - It returns an array of styles: `styles.buttonBase` (common styles), then conditional styles for enabled/disabled state (`isAdding ? styles.buttonDisabled : styles.buttonEnabled`), and finally a style for the pressed state (`pressed && !isAdding ? styles.buttonPressed : null`).
- **Interaction Feedback:** When pressed, the button's background color changes due to `styles.buttonPressed`.
- **Disabled State:** The `disabled={isAdding}` prop prevents multiple presses while an action is in progress. The button style also changes to reflect this disabled state.
- **Accessibility:** `accessibilityRole="button"` ensures it's recognized as a button.
- **Children as a Function:** The child of `<Pressable>` is also a function `({ pressed }) => <Text>...</Text>`. This allows the text itself to change based on the pressed state if needed, though in this example, it changes based on the `isAdding` state.

This `<Pressable>` example demonstrates the flexibility needed to create custom-designed, interactive elements for SpeedyMeds, matching a specific visual theme and providing clear user feedback.

### Exercise 8.3: Creating a Custom Button with Pressable

Let's get hands-on with `<Pressable>` to create a custom interactive element for SpeedyMeds.

**Objective:** Build a custom "Request Refill" button using `<Pressable>` that changes style when pressed.

**Instructions:**

1.  Create a new component (e.g., `RefillButton`).
2.  Use `<Pressable>` as the main component.
3.  Inside the `<Pressable>`, include a `<Text>` component that says 'Request Refill'.
4.  Define styles using `StyleSheet.create()`:
    - A base style for the button (e.g., background color, padding, rounded corners).
    - A style for when the button is pressed (e.g., a slightly darker background color or reduced opacity).
5.  Use the function form of the `style` prop on `<Pressable>` to apply the different styles based on the `pressed` state.
6.  When the button is pressed (`onPress` event), show an `Alert` saying 'Refill requested!'.
7.  Render your `RefillButton` in your app.

\*\*(https://snack.expo.dev/)

_Note: You will need to create a new Snack or use a local Expo project for this exercise. The solution will be provided separately._

### Next Steps

Having covered basic interactive elements, we'll now look at how to display lists of data efficiently using `<FlatList>` and `<SectionList>`.

- [Next Section: FlatList and SectionList - Efficient List Rendering](./section-09-flatlist-and-sectionlist.md)
