## Section 4: Controlled Components Pattern

In React, a "controlled component" is an input form element whose value is controlled by React state. This is the most common and recommended way to handle form inputs in both React and React Native. This section will explain the pattern in detail, demonstrate its implementation, and highlight its benefits for creating predictable and manageable forms.

**What Makes a Component "Controlled"?**

An input component (like `TextInput`) becomes a controlled component when you manage its value using React state and update that state via a callback function. Specifically:

1.  **State as the Source of Truth:** The component's `value` prop is set from a state variable (e.g., managed by `useState`).
2.  **State Updates on Change:** A function (typically passed to `onChangeText` for `TextInput`) updates this state variable whenever the user types or interacts with the input.

This creates a closed loop: user input triggers a state update, and the updated state then dictates what is displayed in the input field. React state becomes the single source of truth for the input's value.

**Benefits of Controlled Components:**

- **Predictable State:** The value of the input is always in sync with your component's state, making it easy to access and reason about.
- **Instant Validation:** You can validate the input on every keystroke because the value is available in the state immediately after each change.
- **Dynamic Manipulation:** You can format or transform user input in real-time (e.g., converting text to uppercase, restricting input length, formatting currency).
- **Conditional Logic:** Easily implement logic based on the input's value (e.g., enabling/disabling a submit button, showing/hiding other UI elements).
- **Simplified Data Handling:** When it's time to submit the form, all the data is already available in your component's state.

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

> [!IMPORTANT]
> The controlled components pattern is fundamental to building predictable and maintainable forms in React Native. Ensure you understand how state and input props (`value` and `onChangeText`) work together before moving to more complex form scenarios.

**Exercise 12.1: Building a Controlled Form Input**

Now it's time to put this pattern into practice.

- Objective: Create a new Expo Snack to build a controlled `TextInput` for a patient's email address.
- Requirements:
  1.  Use `useState` to manage the email input's value.
  2.  The `TextInput` should be a controlled component.
  3.  Display the entered email address below the input field in real-time.
  4.  Add basic styling for the input and text display.
  5.  Ensure the `keyboardType` is set to `'email-address'`.
  6.  Optionally, add a simple visual cue if the email contains an `@` symbol (e.g., change text color or show an icon).

**(URL_to_Tool)** _(Link to Expo Snack for Exercise 12.1)_

Refer to the `README.md` within the Snack for detailed instructions.

Mastering controlled components is a key step towards building complex forms. In the next sections, we'll see how libraries can help manage the state and validation for larger forms more efficiently.
