## Section 6: Handling Events (Press Events)

React components often need to respond to user interactions, such as taps, swipes, or text input. React uses an event handling system similar to how events are handled on DOM elements in web development, but with some syntactic differences and considerations specific to React Native.

This section will focus on handling common touch events, particularly "press" events, which are fundamental for buttons, list items, and other interactive elements in mobile applications.

### Event Handling in React

Handling events with React elements is very similar to handling events on DOM elements, but with a few key differences:

1.  **CamelCase Naming:** React event handlers are named using camelCase, rather than lowercase. For example, the `onclick` attribute in HTML becomes `onClick` in React (for web) and typically `onPress` for pressable elements in React Native.
2.  **Function References:** With JSX, you pass a function as the event handler, rather than a string.

```html
<!-- HTML -->
<button onclick="handleHtmlClick()">Click Me</button>
```

```tsx
// React (for web, example)
// <button onClick={handleReactClick}>Click Me</button>

// React Native (using a Pressable component)
// <Pressable onPress={handleReactNativePress}>
//  <Text>Press Me</Text>
// </Pressable>
```

### Common Press Event Handlers in React Native

React Native provides several components that can respond to touch interactions. The most common prop for handling a tap or press is `onPress`.

- **`<Button>`:** A basic, pre-styled button component.
- **`<Pressable>`:** A more generic component that can detect various stages of press interactions (e.g., `onPressIn`, `onPressOut`, `onLongPress`). It gives you more control over the visual feedback during these interactions. This is often preferred for custom interactive elements.
- **`<TouchableOpacity>`:** (Still common, but `Pressable` is often recommended for new development) A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.
- **`<TouchableHighlight>`:** (Similar to `TouchableOpacity`) A wrapper for making views respond to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.

Let's look at an example using `<Button>` and `<Pressable>`:

```tsx
import React, { useState } from "react";
import { View, Text, Button, Pressable, Alert, StyleSheet } from "react-native";

const PrescriptionActions: React.FC = () => {
  const [status, setStatus] = useState<string>("Pending Approval");

  const handleApprove = () => {
    setStatus("Approved by Dr. Casey");
    Alert.alert(
      "Prescription Approved",
      "The prescription has been marked as approved."
    );
  };

  const handleReject = (reason: string) => {
    setStatus(`Rejected: ${reason}`);
    Alert.alert("Prescription Rejected", `Reason: ${reason}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Status: {status}</Text>

      {/* Using Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Approve Prescription"
          onPress={handleApprove} // Pass the function reference
          color="#4CAF50" // Green
        />
      </View>

      {/* Using Pressable for more custom interaction */}
      <Pressable
        onPress={() => handleReject("Dosage too high")} // Inline arrow function for passing arguments
        style={({ pressed }) => [
          // Style can be a function of pressed state
          styles.pressableButton,
          {
            backgroundColor: pressed ? "#D32F2F" : "#F44336", // Darker red when pressed
          },
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.pressableButtonText}>
            {pressed ? "Rejecting..." : "Reject Prescription"}
          </Text>
        )}
      </Pressable>

      <Pressable
        onPressIn={() => console.log("Patient card pressed in")}
        onPressOut={() => console.log("Patient card pressed out")}
        onLongPress={() =>
          Alert.alert("Patient Details", "Show detailed patient history...")
        }
      >
        <View style={styles.patientCard}>
          <Text>Patient: John Q. Public</Text>
          <Text>Medication: Amoxicillin</Text>
          <Text style={styles.longPressHint}>(Long press for details)</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
  pressableButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2, // For Android shadow
    marginVertical: 10,
    alignItems: "center",
  },
  pressableButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  patientCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  longPressHint: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
});

export default PrescriptionActions;
```

**Explanation:**

1.  **`handleApprove` Function:** This function is defined to handle the press event of the "Approve Prescription" button. It updates the `status` state and shows an alert. It's passed directly as `onPress={handleApprove}`.
2.  **`handleReject` Function:** This function needs to accept an argument (`reason`).
3.  **Passing Arguments to Event Handlers:**
    - If your event handler needs arguments (like `handleReject`), you can't just pass `onPress={handleReject('Dosage too high')}` because that would _call_ the function immediately when the component renders, not when it's pressed.
    - Instead, you use an inline arrow function: `onPress={() => handleReject('Dosage too high')}`. This creates a new function that, when called (on press), will then call `handleReject` with your desired argument.
4.  **`<Pressable>` Component:**
    - It uses the `onPress` prop similarly.
    - The `style` prop of `<Pressable>` can be a function that receives an object with a `pressed` boolean. This allows you to change the style when the element is being pressed, providing visual feedback (e.g., changing background color).
    - The children of `<Pressable>` can also be a render prop (a function) that receives the `pressed` state, allowing you to change the content (e.g., button text) during a press.
    - It also demonstrates `onPressIn`, `onPressOut`, and `onLongPress` for more nuanced interactions.

### Preventing Default Behavior

In web development, you often call `event.preventDefault()` to stop the browser's default action for an event (e.g., preventing a form submission). In React, you generally don't need to call `preventDefault()`. React handles this for you. For example, if you have an `onPress` handler on a component, React already prevents the default browser behavior if it were a web link.

> 📲 **(Native Developers - iOS/Android):**
>
> **Comparison:** Handling `onPress` in React Native is analogous to setting up target-action patterns (iOS: `addTarget(_:action:for:)` on `UIButton`) or attaching `OnClickListener`s (Android: `setOnClickListener{}` on a `Button`). The core idea of defining a function to execute in response to a user interaction is the same. React Native abstracts away the platform-specific details.
>
> **Key Takeaway:** Use the `onPress` prop (and related props like `onLongPress` from `<Pressable>`) to make your components interactive. Pass a function reference to these props to define what happens when the user interacts.

> 🅰️ **(Web Developers - Angular):**
>
> **Comparison:** In Angular, you might use event binding like `(click)="myHandler()"`. React's `onPress={myHandler}` is very similar. If you need to pass arguments, Angular allows `(click)="myHandler(arg)"`, while React typically uses an inline arrow function `onPress={() => myHandler(arg)}`.
>
> **Key Takeaway:** The concept of binding event names to handler functions is directly transferable. Pay attention to the specific event prop names used by React Native components (e.g., `onPress`).

Understanding how to handle events is crucial for creating applications that users can interact with. The `onPress` prop on components like `<Button>` and `<Pressable>` will be your primary tool for responding to taps in your SpeedyMeds application.

_(No exercise is defined for this section in the blueprint, but a natural follow-up would be to add buttons to the `MedicationDoseCounter` from Exercise 7.3 or to the `MedicationCard` from Exercise 7.2 to perform actions.)_

> 📚 **Official Documentation:**
>
> - [React Docs - Handling Events](https://react.dev/learn/responding-to-events)
> - [React Native Docs - Handling Touches](https://reactnative.dev/docs/handling-touches)
> - [React Native Docs - `Pressable`](https://reactnative.dev/docs/pressable)
> - [React Native Docs - `Button`](https://reactnative.dev/docs/button)
