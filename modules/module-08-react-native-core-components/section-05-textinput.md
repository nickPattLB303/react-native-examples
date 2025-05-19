## Section 5: TextInput (`<TextInput>`) - User Input

Capturing user input is a fundamental requirement for most applications. In React Native, the `<TextInput>` component is the standard way to allow users to enter text. This section will cover its usage, common props, and how to handle text input for an app like SpeedyMeds, for instance, when a patient needs to enter their information.

### Conceptual Content: Understanding `<TextInput>`

The `<TextInput>` component is a foundational component that allows users to enter text into your app via a keyboard. It can be configured for single-line or multi-line input and supports various features like placeholders, password masking, and different keyboard types.

**Controlled Component Pattern:**
The standard and highly recommended way to use `<TextInput>` in React Native is as a **controlled component**. This pattern ensures that the component's value is driven by React state, providing a single source of truth for the input's content.

- A state variable (e.g., using `useState`) holds the current value of the input.
- This state variable is passed to the `value` prop of the `<TextInput>`.
- The `onChangeText` prop of the `<TextInput>` is set to a callback function that updates the state variable whenever the user types.

This approach makes the application state more predictable and easier to debug.

**Key Characteristics of `<TextInput>`:**

- **Text Entry:** Its primary purpose is to provide a field for users to type text.
- **State Management:** Best managed as a controlled component with its value tied to React state.
- **Event Handling:** Key props like `onChangeText` (to update state as the user types), `onSubmitEditing` (when the user presses the submit button on the keyboard), `onFocus`, and `onBlur` allow you to respond to user interactions.
- **Customization:** You can customize its appearance (placeholder text, borders, background) and behavior (keyboard type, auto-capitalization, secure text entry for passwords).
- **Styling:** `<TextInput>` can be styled using `StyleSheet`. Common styles include `height`, `borderColor`, `borderWidth`, `padding`, `fontSize`, and `color`.

> 📲 **(Native Developers):**
>
> **Comparison:** `<TextInput>` is analogous to `UITextField` or `UITextView` (for multi-line) on iOS, and `EditText` on Android. React Native provides a unified API for these native input elements. The controlled component pattern, where `value` is set from state and `onChangeText` updates that state, differs from typical native approaches of getting text directly (e.g., `editText.getText().toString()`) and listening for changes via delegates or watchers.
>
> **Key Takeaway:** `<TextInput>` is your primary tool for text input fields. Managing its value through state (controlled component) is a common React pattern.
>
> **Source:** [React Native Docs: TextInput](https://reactnative.dev/docs/textinput)

> 🌐 **(Web Developers):**
>
> **Comparison:** `<TextInput>` is similar to the HTML `<input type="text">` or `<textarea>` elements. The concept of a controlled component, where the input's value is managed by component state and updated via an `onChange` handler (`onChangeText` in React Native), is identical to how you'd manage form inputs in React for the web. The `multiline` prop differentiates between single-line and multi-line input.
>
> **Key Takeaway:** Use `<TextInput>` for all text input needs. The controlled component pattern is standard practice.
>
> **Source:** [MDN Web Docs: `<input type="text">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text), [MDN Web Docs: `<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

### Referential Content: Common `<TextInput>` Props and Methods

Below is a table summarizing important props for the `<TextInput>` component.

| Prop                   | Type                                                                     | Description                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------- | --------------------------------------------------------------------- |
| `style`                | `StyleProp<TextStyle>`                                                   | Custom styles for the text input.                                                                                                                                          |
| `value`                | `string`                                                                 | The current text value of the input (for controlled components).                                                                                                           |
| `onChangeText`         | `(text: string) => void`                                                 | Callback invoked with the new text string when the input's content changes.                                                                                                |
| `placeholder`          | `string`                                                                 | Text displayed in the input when it's empty.                                                                                                                               |
| `placeholderTextColor` | `ColorValue`                                                             | Sets the color of the placeholder text.                                                                                                                                    |
| `keyboardType`         | `KeyboardTypeOptions`                                                    | Specifies the type of keyboard to display (e.g., `'default'`, `'numeric'`, `'email-address'`, `'phone-pad'`).                                                              |
| `secureTextEntry`      | `boolean`                                                                | If `true`, obscures entered text (for passwords). Does not work with `multiline={true}`.                                                                                   |
| `autoCapitalize`       | `'none' \\                                                               | 'sentences' \\                                                                                                                                                             | 'words' \\          | 'characters'`        | Controls automatic capitalization behavior. Default is `'sentences'`. |
| `autoCorrect`          | `boolean`                                                                | Enables or disables the platform's auto-correction feature. Default is `true`.                                                                                             |
| `multiline`            | `boolean`                                                                | If `true`, allows multiple lines of input. Default is `false`.                                                                                                             |
| `numberOfLines`        | `number` (Android only for initial height)                               | Suggests the number of lines for a multiline input, primarily affecting its initial height on Android.                                                                     |
| `maxLength`            | `number`                                                                 | Restricts the input to a maximum number of characters.                                                                                                                     |
| `editable`             | `boolean`                                                                | If `false`, the text cannot be edited by the user. Default is `true`.                                                                                                      |
| `onSubmitEditing`      | `(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void` | Callback invoked when the user presses the keyboard's submit button. Not called on iOS for `keyboardType="phone-pad"`.                                                     |
| `onFocus`              | `(event: NativeSyntheticEvent<TextInputFocusEventData>) => void`         | Callback invoked when the input field gains focus.                                                                                                                         |
| `onBlur`               | `(event: NativeSyntheticEvent<TextInputBlurEventData>) => void`          | Callback invoked when the input field loses focus.                                                                                                                         |
| `selection`            | `{ start: number, end?: number }`                                        | Programmatically controls the cursor position and selected text range. `end` defaults to `start`. (Note: A bug was noted for RN 0.74 regarding initialization on Android). |
| `autoFocus`            | `boolean`                                                                | If `true`, the input field automatically gains focus when the component mounts. Default is `false`.                                                                        |
| `blurOnSubmit`         | `boolean`                                                                | For single-line inputs, if `true`, blurs input on submit. For multiline, `true` blurs and triggers `onSubmitEditing` instead of inserting a newline. Default `false`.      |
| `clearButtonMode`      | `'never' \\                                                              | 'while-editing' \\                                                                                                                                                         | 'unless-editing' \\ | 'always'` (iOS only) | Controls when the standard clear button appears in the text field.    |
| `returnKeyType`        | `ReturnKeyTypeOptions`                                                   | Specifies the label of the return key on the keyboard (e.g., `'done'`, `'go'`, `'next'`, `'search'`, `'send'`).                                                            |

**Methods:**

`<TextInput>` components expose several imperative methods that can be called on a ref to the component:

- `focus()`: Programmatically brings focus to the input field.
- `blur()`: Programmatically removes focus from the input field.
- `isFocused()`: Returns `true` if the input field is currently focused, `false` otherwise.
- `clear()`: Programmatically clears all text from the input field.

> 📚 **Official Documentation:**
>
> - [React Native Docs: TextInput](https://reactnative.dev/docs/textinput)
> - [React Native Docs: TextInput Props](https://reactnative.dev/docs/textinput#props)
> - [React Native Docs: Handling Text Input Guide](https://reactnative.dev/docs/handling-text-input)
> - [Expo Docs: TextInput](https://docs.expo.dev/ui-programming/text-input/)
> - [React Docs: Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
> - _(Native Docs)_ [Apple Developer: UITextField](https://developer.apple.com/documentation/uikit/uitextfield)
> - _(Native Docs)_ [Apple Developer: UITextView](https://developer.apple.com/documentation/uikit/uitextview) (for multiline)
> - _(Native Docs)_ [Android Developer: EditText](https://developer.android.com/reference/android/widget/EditText)

### "Under the Hood": `<TextInput>` Internals

**Native Mapping:**

- On iOS, `<TextInput>` typically maps to a native `UITextField` for single-line inputs. If `multiline={true}` is set, it maps to a `UITextView`.
- On Android, `<TextInput>` maps to the native `android.widget.EditText` component. Material Design components often wrap `EditText` (e.g., `com.google.android.material.textfield.TextInputEditText`) for enhanced features.

**Event Handling:**
User interactions with the native input element (keystrokes, focus changes, submission) generate native events. React Native's event system bridges these native events to the JavaScript side, where they trigger the corresponding callbacks like `onChangeText`, `onFocus`, `onBlur`, and `onSubmitEditing`.

**Fabric Architecture:**
In the Fabric architecture, a `TextInputShadowNode` would manage the properties, layout, and state of the text input. Communication with the native `UITextField`/`UITextView` or `EditText` for text manipulation, cursor updates, and keyboard event handling becomes more direct and potentially synchronous through JSI. This can lead to improved responsiveness for text input operations.

### Procedural Content: Basic `<TextInput>` Usage

Let's create a simple form for SpeedyMeds where a user can enter their name and age.

**Short, Self-Contained Example:**

```tsx
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function PatientDetailsForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = () => {
    if (name && age) {
      alert(`Patient Name: ${name}, Age: ${age}`);
      // In a real app, you would process this data (e.g., send to a server, store locally)
      setName("");
      setAge("");
    } else {
      alert(`Please enter both name and age.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Patient Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={name}
        onChangeText={setName} // Directly pass the state setter
        autoCapitalize="words"
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        maxLength={3}
      />

      <Button title="Submit Details" onPress={handleSubmit} color="#00796b" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
});
```

**Explanation of the Example:**

1.  **State Management:** We use `useState` to create two state variables: `name` and `age`, initialized as empty strings. These will hold the values entered by the user.
2.  **Controlled Components:**
    - The `value` prop of each `<TextInput>` is bound to its respective state variable (`name` or `age`).
    - The `onChangeText` prop is set to the state setter function (`setName` or `setAge`). This means that every time the user types a character, the corresponding state variable is updated, and the `<TextInput>` re-renders to show the new value. This is the controlled component pattern.
3.  **Customization:**
    - The first `<TextInput>` for the name uses `placeholder='Enter full name'` and `autoCapitalize='words'`.
    - The second `<TextInput>` for age uses `placeholder='Enter age'`, `keyboardType='numeric'` (to show a numeric keypad), and `maxLength={3}`.
4.  **Styling:** Both `<TextInput>` components share the `styles.input` style, which defines their background color, border, padding, and font size.
5.  **Submission:** A `<Button>` (covered in a later section) is used to trigger the `handleSubmit` function. This function currently shows an alert with the entered data and then clears the fields. In a real SpeedyMeds app, this data might be used to register a new patient or update patient records.

This example provides a solid foundation for creating forms and capturing user text input in your React Native applications. You'll frequently use `<TextInput>` in various parts of the SpeedyMeds app, such as patient registration, medication search, or feedback forms.

### Exercise 8.1: Basic Form with TextInput

Now it's time to practice! Create a simple form for the SpeedyMeds app where users can enter a "Medication Name" and "Dosage Instructions."

**Objective:** Implement a screen with two `<TextInput>` fields and a submit button.

**Instructions:**

1.  Create two state variables to hold the medication name and dosage instructions.
2.  Render two `<TextInput>` components, one for each piece of information.
    - Use appropriate `placeholder` text.
    - The dosage instructions input could be `multiline`.
3.  Style the inputs and the container `<View>` for a clean presentation.
4.  Add a `<Button>` that, when pressed, displays an alert showing the entered medication name and dosage.

**(https://snack.expo.dev/@speedymeds/rn-exercise-8-1-textinput-form)**

### Next Steps

Now that you can capture text input, the next step is to learn how to handle content that might exceed the screen's visible area using the `<ScrollView>` component. Proceed to [Section 6: ScrollView (`<ScrollView>`) - Enabling Scrolling](./section-06-scrollview.md).
