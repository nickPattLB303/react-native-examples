## Section 5: `useRef` Hook

The `useRef` Hook is a versatile tool in React that serves two main purposes: accessing underlying native component instances (or DOM elements in web React) and creating generic mutable containers that persist across renders without causing re-renders when their content changes. While direct DOM manipulation is less common in React Native, `useRef` is crucial for interacting with native component methods and managing values that shouldn't trigger the rendering lifecycle.

### Conceptual Content

**What is `useRef`?**

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

**Key Use Cases:**

1.  **Accessing Native Component Instances:** You can attach a ref to a React Native component (like `<TextInput>` or `<ScrollView>`) to get access to its underlying native instance. This allows you to call imperative methods on that instance (e.g., `textInputRef.current.focus()`, `scrollViewRef.current.scrollToEnd()`).
2.  **Storing Mutable Values:** Sometimes you need to keep track of a value that can change over time but whose change should _not_ trigger a re-render of the component. Examples include timer IDs, subscription objects, or previous state values.

**Important Characteristics:**

- **Persistence:** The ref object itself persists across renders.
- **Mutability:** You can change the `.current` property of the ref object directly.
- **No Re-render on Change:** Unlike state updated with `useState`, changing the `.current` property of a ref does _not_ cause the component to re-render. If you want to run some code when React attaches or detaches a ref to a native component instance, you should use a callback ref instead.

### Referential Content

- **`useRef<T>(initialValue: T | null): React.MutableRefObject<T | null>`** (for generic mutable containers or when `initialValue` is not a component)
- **`useRef<T>(initialValue: T): React.RefObject<T>`** (typically when `initialValue` is `null` and the ref is meant to hold a component instance - the type `T` would be the component type, e.g., `TextInput`)

  - **`initialValue`**: The initial value for the `.current` property of the ref object. Often set to `null` when the ref will hold a component instance, as the instance is only available after the initial render.
  - **Returns**: A ref object with a single property: `current`.
    - `ref.current`: Initially set to `initialValue`. You can later set it to something else. If you pass a ref object to React as a `ref` attribute on a component (e.g., `<TextInput ref={myRef} />`), React will set its `current` property to the corresponding native component instance when the component mounts, and back to `null` when it unmounts.

> 📚 **Official Documentation:**
>
> - [React Docs: `useRef`](https://react.dev/reference/react/useRef)
> - [React Docs: Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs) (Web-focused, but concepts apply to component instances)
> - [React Native Docs: Refs and the DOM](https://reactnative.dev/docs/refs-and-the-dom) (Explains differences from web DOM)

### Procedural Content

Let's explore `useRef` in the context of the SpeedyMeds app.

**1. Focusing a `TextInput` on Button Press**

In a form for adding a new medication, you might want to automatically focus the first input field or focus an input field when a user presses a specific button.

```tsx
import React, { useRef } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const MedicationInputForm: React.FC = () => {
  const medicationNameInputRef = useRef<TextInput>(null); // Specify TextInput type for the ref

  const handleFocusMedicationName = () => {
    // The ?.current is optional chaining, ensuring current exists
    medicationNameInputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Medication Name:</Text>
      <TextInput
        ref={medicationNameInputRef}
        style={styles.input}
        placeholder="e.g., Amoxicillin 250mg"
      />
      <Text style={styles.label}>Dosage:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 1 tablet three times a day"
      />
      <Button
        title="Focus Medication Name Input"
        onPress={handleFocusMedicationName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default MedicationInputForm;
```

In this example, `medicationNameInputRef` is created using `useRef<TextInput>(null)`. This ref is then passed to the `ref` prop of the first `TextInput`. When the button is pressed, `handleFocusMedicationName` calls `medicationNameInputRef.current?.focus()`. The `current` property holds the actual native `TextInput` instance, allowing us to call its `focus()` method imperatively.

**2. Storing a Timer ID**

Imagine you have a feature in SpeedyMeds that shows a temporary promotional message for a new pharmacy service, which disappears after a few seconds.

```tsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const PromotionalMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null); // To store the timer ID

  const showPromotion = () => {
    setIsVisible(true);

    // Clear any existing timer before setting a new one
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    // Set a new timer
    timerIdRef.current = setTimeout(() => {
      setIsVisible(false);
      console.log("Promotional message hidden.");
    }, 5000); // Hide after 5 seconds
  };

  useEffect(() => {
    // Cleanup: Clear the timer if the component unmounts while promotion is visible
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []); // Empty dependency array, so cleanup runs only on unmount

  return (
    <View style={styles.container}>
      <Button title="Show SpeedyMeds Plus Promo" onPress={showPromotion} />
      {isVisible && (
        <View style={styles.promoBox}>
          <Text style={styles.promoText}>
            Upgrade to SpeedyMeds Plus for faster refills and exclusive
            discounts!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 10 },
  promoBox: {
    backgroundColor: "#E3F2FD", // Light blue background
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#90CAF9",
  },
  promoText: { color: "#1E88E5", textAlign: "center" }, // Blue text
});

export default PromotionalMessage;
```

Here, `timerIdRef` stores the ID returned by `setTimeout`. We use a ref because changing the timer ID should not cause a re-render. If we used `useState` for `timerId`, setting it would trigger an unnecessary re-render. The `useEffect` cleanup function ensures that if the component unmounts while the timer is active, the timer is cleared, preventing potential errors or memory leaks.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** In native iOS (Swift/Objective-C), you might hold direct references to UI elements (like `UITextField` instances via `@IBOutlet` or programmatically). `useRef` for component instances is similar to having such a reference, allowing you to call methods on it. For mutable values not triggering UI updates, you'd use regular instance variables/properties.
>
> **Key Takeaway:** `useRef` provides a React-idiomatic way to get hold of these instance-like references within functional components and to manage mutable data outside the standard state rendering flow.

> 🌐 **(Web Developers):**
>
> **Comparison:** This is very similar to `useRef` in React for the web. You use it to get references to DOM elements (e.g., `<input ref={myRef} />`) to call methods like `focus()` or to store mutable values like animation IDs or subscription objects without causing re-renders.
>
> **Key Takeaway:** The concept and usage of `useRef` are largely consistent between React for web and React Native. The main difference lies in _what_ you are referencing – native component instances in React Native versus DOM elements in web React.

`useRef` is a powerful Hook for breaking out of the typical declarative React flow when you need to interact imperatively with components or manage mutable values without triggering re-renders. Use it judiciously where direct interaction or non-rendering state is genuinely required.
