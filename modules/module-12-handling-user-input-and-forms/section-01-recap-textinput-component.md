## Section 1: Recap: TextInput Component

This section revisits the `TextInput` component, a fundamental building block for capturing user input in React Native. We previously introduced `TextInput` in Module 8, but a focused recap here is essential as it forms the basis for all text-based forms we'll be building. Understanding its core props and behavior is crucial before we dive into more advanced form handling techniques.

**Core Concept: What is `TextInput`?**

The `TextInput` component is a core React Native component that allows users to enter text into your application. It can be configured for single-line or multi-line input and supports a variety of features like placeholders, keyboard types, and event handling for text changes.

Think of it as the equivalent of an `<input type="text">` or `<textarea>` element in web development, but specifically designed for mobile interfaces.

**Key Properties Review:**

Here's a refresher on some of the most commonly used `TextInput` props. For a complete list, always refer to the official documentation.

- `value` (string): The actual text to display inside the input. To create a controlled component (which we'll discuss in detail soon), this prop is essential and is typically tied to a state variable.
- `onChangeText` ((text: string) => void): A callback function that is invoked when the text in the input changes. It receives the new text string as an argument. This is the primary way to capture user input.
- `placeholder` (string): Text that is displayed when the `TextInput` is empty. This is useful for giving users a hint about what kind of input is expected (e.g., "Enter patient name").
- `keyboardType` (enum): Controls which type of keyboard is displayed to the user. Common values include:
  - `'default'`: The standard keyboard.
  - `'numeric'`: A keyboard with numbers and punctuation.
  - `'email-address'`: A keyboard optimized for email input (often includes `@` and `.` keys).
  - `'phone-pad'`: A numeric keypad for phone numbers.
- `secureTextEntry` (boolean): If `true`, the text input obscures the text entered, which is useful for password fields.
- `multiline` (boolean): If `true`, the `TextInput` can accept multiple lines of text. Useful for comments or longer descriptions.
- `style`: Used to apply styling to the `TextInput` component, similar to how you style other React Native components using `StyleSheet`.
- `placeholderTextColor` (string): Sets the color of the placeholder text.
- `autoCapitalize` (enum: `'none'`, `'sentences'`, `'words'`, `'characters'`): Controls automatic capitalization behavior.
- `autoCorrect` (boolean): If `false`, disables automatic correction.
- `editable` (boolean): If `false`, text is not editable. Defaults to `true`.

**Basic Usage Example:**

Let's look at a very simple, uncontrolled `TextInput` for context. We will explore controlled inputs extensively in Section 4.

```tsx
import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View } from "react-native";

const SimpleInputScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Medication Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Amoxicillin 250mg"
          placeholderTextColor="#888"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default SimpleInputScreen;
```

This basic example renders a `TextInput`. However, it doesn't yet capture or manage the input's value. We'll cover that in the upcoming sections.

> 📚 **Official Documentation:**
>
> - [React Native Docs: `TextInput`](https://reactnative.dev/docs/textinput)
> - [Expo Docs: `TextInput`](https://docs.expo.dev/ui-programming/user-interface-libraries/#textinput) (Often links to React Native core docs for these components)

Understanding these `TextInput` basics is the first step towards building functional and interactive forms in your SpeedyMeds application.
