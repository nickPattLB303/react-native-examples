## Section 5: TextInput (`<TextInput>`) - User Input

Capturing user input is a fundamental requirement for most applications. In React Native, the `<TextInput>` component is the standard way to allow users to enter text. This section will cover its usage, common props, and how to handle text input for an app like SpeedyMeds, for instance, when a patient needs to enter their information.

### Conceptual Content: Understanding `<TextInput>`

The `<TextInput>` component is a foundational component that allows users to enter text into your app via a keyboard. It can be configured for single-line or multi-line input and supports various features like placeholders, password masking, and different keyboard types.

**Key Characteristics of `<TextInput>`:**

- **Text Entry:** Its primary purpose is to provide a field for users to type text.
- **State Management:** Typically, you'll manage the value of a `<TextInput>` using component state (e.g., with the `useState` Hook). This is known as a "controlled component" pattern.
- **Event Handling:** Key props like `onChangeText` (to update state as the user types) and `onSubmitEditing` (when the user presses the submit button on the keyboard) allow you to respond to user interactions.
- **Customization:** You can customize its appearance (placeholder text, borders, background) and behavior (keyboard type, auto-capitalization, secure text entry for passwords).
- **Styling:** `<TextInput>` can be styled using `StyleSheet`, similar to `<View>` and `<Text>`. Common styles include `height`, `borderColor`, `borderWidth`, `padding`, `fontSize`, and `color`.

> 📲 **(Native Developers):**
>
> **Comparison:** `<TextInput>` is analogous to `UITextField` or `UITextView` (for multi-line) on iOS, and `EditText` on Android. React Native provides a unified API for these native input elements, simplifying cross-platform form development.
>
> **Key Takeaway:** `<TextInput>` is your primary tool for text input fields. Managing its value through state is a common React pattern.
>
> **Source:** [React Native Docs: TextInput](https://reactnative.dev/docs/textinput)

> 🌐 **(Web Developers):**
>
> **Comparison:** `<TextInput>` is similar to the HTML `<input type="text">` or `<textarea>` elements. The concept of a controlled component, where the input's value is managed by component state and updated via an `onChange` handler (`onChangeText` in React Native), is identical to how you'd manage form inputs in React for the web.
>
> **Key Takeaway:** Use `<TextInput>` for all text input needs. The controlled component pattern is standard practice.
>
> **Source:** [MDN Web Docs: `<input type="text">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text), [MDN Web Docs: `<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

### Referential Content: Common `<TextInput>` Props

- `style`: Accepts a style object. Common styles include `height`, `width`, `borderColor`, `borderWidth`, `borderRadius`, `padding`, `fontSize`, `color`.
  - _Type:_ `StyleProp<TextStyle>` (Note: `TextInput` styles often overlap with `Text` styles, but also include layout properties).
- `value`: (string) The value of the text input. For a controlled component, this is typically linked to a state variable.
- `onChangeText`: (function `(text: string) => void`) Callback that is called when the text input's text changes. This is where you update your state.
- `placeholder`: (string) The string that is displayed when there is no value in the text input.
- `placeholderTextColor`: (string) The text color of the placeholder string.
- `keyboardType`: (enum: `'default'`, `'numeric'`, `'email-address'`, `'phone-pad'`, etc.) Determines which keyboard to open (e.g., numeric keyboard for entering numbers).
- `secureTextEntry`: (boolean) If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure. Default is `false`.
- `autoCapitalize`: (enum: `'none'`, `'sentences'`, `'words'`, `'characters'`) Controls how text input should be automatically capitalized.
- `autoCorrect`: (boolean) If `false`, disables auto-correct. Default is `true`.
- `multiline`: (boolean) If `true`, the text input can be multiple lines. Default is `false`.
- `onSubmitEditing`: (function) Callback that is called when the text input's submit button is pressed (e.g., "Return" or "Done" on the keyboard).
- `editable`: (boolean) If `false`, text is not editable. Default is `true`.
- `maxLength`: (number) Limits the maximum number of characters that can be entered.

> 📚 **Official Documentation:**
>
> - [React Native Docs: TextInput Props](https://reactnative.dev/docs/textinput#props)
> - [Expo Docs: TextInput](https://docs.expo.dev/ui-programming/text-input/)

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

\*\*(https://snack.expo.dev/)

_Note: You will need to create a new Snack or use a local Expo project for this exercise. The solution will be provided separately._
