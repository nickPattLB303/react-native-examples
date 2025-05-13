## Section 4: Controlled Components Pattern

In React, a "controlled component" is an input form element whose value is controlled by React state. This is the most common and recommended way to handle form inputs in both React and React Native. This section will explain the pattern in detail, demonstrate its implementation, and highlight its benefits and performance considerations for creating predictable and manageable forms.

**What Makes a Component "Controlled"?**

An input component (like `TextInput`) becomes a controlled component when you manage its value using React state and update that state via a callback function. Specifically:

1.  **State as the Source of Truth:** The component's `value` prop is set from a state variable (e.g., managed by `useState`).
2.  **State Updates on Change:** A function (typically passed to `onChangeText` for `TextInput`) updates this state variable whenever the user types or interacts with the input.

This creates a closed loop: user input triggers a state update, and the updated state then dictates what is displayed in the input field. React state becomes the single source of truth for the input's value.

**Benefits of Controlled Components:**

- **Single Source of Truth:** The React state is the definitive source for the input's value. This centralizes data management and makes it easier to reason about the data flow and debug issues.
- **Predictable Behavior:** Because the state controls the value, the input's behavior is highly predictable. The value can be programmatically changed by modifying the state.
- **Instant Validation & Formatting:** You can validate or format input on every keystroke because the value is available in the state immediately after each change (e.g., converting text to uppercase, restricting input length, formatting currency).
- **Conditional Logic:** Easily implement logic based on the input's value (e.g., enabling/disabling a submit button, showing/hiding other UI elements).
- **Integration with React State Management:** This pattern integrates seamlessly with React's built-in state management hooks (`useState`, `useReducer`) and can also be used with more comprehensive state management libraries.

**Implementation Steps:**

Let's consider a `TextInput` for a patient's age in our SpeedyMeds app.

1.  **Initialize State:** Use `useState` to create a state variable for the input's value.
    ```typescript
    const [patientAge, setPatientAge] = useState<string>("");
    ```
2.  **Set `value` Prop:** Bind the `TextInput`'s `value` prop to this state variable.
    ```tsx
    <TextInput value={patientAge} /* ...other props */ />
    ```
3.  **Handle Changes with `onChangeText`:** Provide a callback to `onChangeText` that updates the state.
    ```tsx
    <TextInput
      value={patientAge}
      onChangeText={(newAge) => setPatientAge(newAge)}
      // ...other props
    />
    ```

**Short, Self-Contained Example: A Controlled `TextInput`**

This example demonstrates a controlled `TextInput` for capturing a patient's contact number. It enforces that only numbers can be entered and displays the current value.

```tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Platform, // For platform-specific styling if needed
} from "react-native";

const ControlledInputDemoScreen = () => {
  const [patientContact, setPatientContact] = useState<string>("");

  const handleContactChange = (text: string) => {
    // Allow only numbers and limit length (simple validation example)
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length <= 10) {
      setPatientContact(numericText);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formElementContainer}>
        <Text style={styles.label}>
          Patient Contact Number (Max 10 digits):
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit mobile number"
          value={patientContact} // Value is controlled by state
          onChangeText={handleContactChange} // State is updated on change
          keyboardType="phone-pad" // Use phone-pad for numeric input
          placeholderTextColor="#aaa"
          maxLength={10} // Enforced by the component as well
        />
        <Text style={styles.displayValue}>
          Current Contact: {patientContact || "(empty)"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#eef2f5",
  },
  formElementContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 15,
  },
  displayValue: {
    fontSize: 15,
    color: "#475569",
    marginTop: 10,
    fontStyle: "italic",
  },
});

export default ControlledInputDemoScreen;
```

**Explanation of the Example:**

1.  `patientContact` state is initialized as an empty string.
2.  The `TextInput`'s `value` prop is bound to `patientContact`.
3.  The `onChangeText` prop calls `handleContactChange`.
4.  `handleContactChange` processes the input text:
    - It uses a regular expression (`/[^0-9]/g`) to remove any non-numeric characters.
    - It checks if the length of the numeric text is 10 or less before updating the state.
    - This demonstrates how controlled components allow for real-time input validation and transformation.
5.  The `keyboardType="phone-pad"` prop suggests a numeric keyboard to the user.
6.  `maxLength={10}` provides an additional constraint directly on the `TextInput`.
7.  The current value of `patientContact` is displayed below the input field, showing the effect of the controlled pattern and the validation logic.

This pattern ensures that `patientContact` state always holds a valid (numeric, up to 10 digits) representation of the user's input, making it reliable for further processing or submission.

While this example uses a simple string for state, you could also manage multiple related form inputs within a single state object:

```typescript
const [patientDetails, setPatientDetails] = useState({ name: '', age: '' });

// Then, in onChangeText for the name input:
onChangeText={(newName) => setPatientDetails(prevDetails => ({ ...prevDetails, name: newName }))}
```

This approach can be useful for grouping related data but requires careful handling of state updates (using the spread operator to preserve other fields).

**"Under the Hood": React's Enforcement and Performance Nuances**

When you use a controlled `TextInput` in React Native, React effectively enforces that the native input element's displayed value matches the `value` prop passed from JavaScript. If the `value` prop is set, but no `onChangeText` handler (or an incorrect one) is provided to update the corresponding state variable, the input field will appear to be read-only from the user's perspective. They can type, but the input will revert to the value dictated by the state on each render.

**Performance Considerations:**

A key characteristic of controlled components is that every keystroke triggers a state update, which in turn causes a re-render of the component (and potentially its children).

- For simple inputs and forms, this re-render overhead is usually negligible and perfectly acceptable.
- However, for complex forms with many inputs, or for inputs that perform intensive computations (like complex validation or formatting) on every `onChangeText` call, this frequent re-rendering can lead to performance bottlenecks, perceived lag, or a flickering effect.

This performance sensitivity is particularly relevant in React Native. Although the New Architecture with JSI has optimized the communication between JavaScript and the native layers, the fundamental cycle of: native event -> JS handler -> state update -> React re-render -> native UI update still exists. This round trip, even if each step is faster, is not instantaneous. The inherent loop in the controlled component pattern is the primary source of potential performance issues like lag or flicker, especially when combined with computationally expensive operations within the `onChangeText` handler. This is a significant reason why form libraries like React Hook Form often advocate for or default to uncontrolled components (or strategies that minimize JS-driven updates) for performance-critical scenarios.

The benefits of controlled components—such as having a single source of truth and enabling immediate validation and formatting—often outweigh the minor performance costs for many standard forms. However, when performance is paramount or inputs involve complex real-time processing, this trade-off becomes more critical.

**Comparison with Uncontrolled Components**

In contrast to controlled components, uncontrolled components allow the form data to be handled by the native component itself, rather than by React state. The values are typically read from the input field using a `ref` when needed, such as during form submission.

- **Pros of Uncontrolled Components:**
  - Can be simpler for very basic forms where real-time state tracking isn't necessary.
  - Potentially better performance by avoiding re-renders on every keystroke, as React isn't managing the input's value in its state.
- **Cons of Uncontrolled Components:**
  - Harder to implement real-time validation or dynamic formatting, as the value isn't readily available in React state.
  - Managing data flow can become more complex if you need to react to input changes programmatically.

While React Hook Form (which we will cover later) cleverly uses refs for performance similar to uncontrolled components, it provides an API that often makes working with inputs feel like they are controlled.

> 📱 **Background Bridge Notes:**
>
> **For Native Developers (Android/iOS):**
>
> - **Android `EditText`:** The controlled component pattern in React Native is akin to continuously calling `EditText.setText()` in response to a `TextWatcher.afterTextChanged()` event. Typically, in native Android development, an `EditText` manages its own text content internally unless explicitly manipulated.
> - **iOS `UITextField`:** This is similar to programmatically setting the `textField.text` property within the `textField(_:shouldChangeCharactersIn:replacementString:)` delegate method or in response to a `UIControl.Event.editingChanged` event. Native iOS also allows `UITextField` to manage its own text by default.
>   The core difference lies in React's declarative paradigm: the UI is a direct function of its state. Changes to the state automatically propagate to the UI, including the value of input fields.
>
> **For Web Developers (React):**
> The controlled component pattern is identical to its counterpart in React for web development. The concepts of binding `value` to state and updating state via `onChange` (or `onChangeText` in RN) are the same.
>
> **For Web Developers (Angular):**
>
> - **Template-Driven Forms:** Angular's `[(ngModel)]="property"` syntax provides two-way data binding, which is conceptually similar to controlled components. Changes in the input update the component property, and changes to the property update the input's display.
> - **Reactive Forms:** Binding an input using `[formControl]="controlName"` links it to a `FormControl` instance in the component class. The `FormControl`'s value acts as the source of truth, and its state is managed programmatically, which aligns closely with the principles of React's controlled components.

Mastering controlled components is a key step towards building complex forms. In the next sections, we'll see how libraries can help manage the state and validation for larger forms more efficiently.

> 📚 **Official Documentation:**
>
> - [React Docs: Controlled Components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
> - [React Native Docs: `TextInput` (value prop)](https://reactnative.dev/docs/textinput#value)
