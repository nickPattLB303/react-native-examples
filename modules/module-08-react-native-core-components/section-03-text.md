## Section 3: Text (`<Text>`) - Displaying Text

This section focuses on the `<Text>` component, the primary way to display text in your React Native applications. All text content you want to show to the user must be wrapped within a `<Text>` component.

### Conceptual Content: Understanding `<Text>`

The `<Text>` component is used to render strings of text. Unlike on the web where text can appear standalone or within various HTML elements like `<p>`, `<h1>-<h6>`, or `<span>`, in React Native, any text string you want to display must be a child of a `<Text>` component. You cannot render text directly within a `<View>` without wrapping it in `<Text>`.

**Key Characteristics of `<Text>`:**

- **Text Rendering:** Its sole purpose is to display text content.
- **Styling:** `<Text>` components can be styled using the `StyleSheet` API to control font size, color, font family, weight, alignment, line height, and more.
- **Nesting:** `<Text>` components can be nested within each other. This is powerful because style inheritance works within nested `<Text>` components. For example, if an outer `<Text>` has a default font color, an inner `<Text>` will inherit that color unless explicitly overridden. This inheritance does _not_ apply from `<View>` to `<Text>`.
- **Text-Specific Props:** It supports various props for text layout and interaction, such as `numberOfLines`, `ellipsizeMode`, and `onPress` (to make text tappable).
- **Accessibility:** Text content within `<Text>` components is automatically accessible to screen readers.

> 📲 **(Native Developers):**
>
> **Comparison:** `<Text>` in React Native is analogous to `UILabel` on iOS and `TextView` on Android. These native elements are the standard way to display text in their respective platforms. React Native's `<Text>` component provides a unified API to control text properties that then get translated to the appropriate native text rendering.
>
> **Key Takeaway:** `<Text>` is your go-to component for all textual content, providing features similar to native text display widgets.
>
> **Source:** [React Native Docs: Text](https://reactnative.dev/docs/text)

> 🌐 **(Web Developers):**
>
> **Comparison:** While on the web, text can exist within many elements (`<p>`, `<span>`, `<h1>`, etc.) or even as bare text nodes within a `<div>`, React Native is stricter. All text _must_ be inside a `<Text>` component. Think of `<Text>` as a universal text container. Style inheritance for text properties (like `color` or `fontSize`) only works between nested `<Text>` components, not from a parent `<View>` to a child `<Text>` as it might with CSS inheritance from a `<div>` to a `<p>`.
>
> **Key Takeaway:** Always wrap your text in `<Text>`. Nested `<Text>` components allow for rich text styling through inheritance.
>
> **Source:** [MDN Web Docs: Text-level semantics](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text-content)

### Referential Content: Common `<Text>` Props

Here are some common props for the `<Text>` component:

- `style`: Accepts a style object (or an array of style objects) to define the text's appearance. Common text-specific style properties include `color`, `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`, `letterSpacing`, `lineHeight`, `textAlign`, `textDecorationLine`, `textShadowColor`, `textShadowOffset`, `textShadowRadius`, `textTransform`.
  - _Type:_ `StyleProp<TextStyle>`
- `children`: The text string or other nested `<Text>` components to display.
  - _Type:_ `React.ReactNode`
- `numberOfLines`: (number) Used to truncate the text with an ellipsis after a specific number of lines.
- `ellipsizeMode`: (enum: `'head'`, `'middle'`, `'tail'`, `'clip'`) Specifies how text should be truncated if `numberOfLines` is set. Default is `'tail'`.
- `onPress`: (function) A handler to be called when the text is pressed. This makes the text behave like a button or link.
- `selectable`: (boolean) When `true`, the text can be selected and copied by the user. Default is `false`.
- `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`: Similar to `<View>`, these props enhance accessibility.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Text Props](https://reactnative.dev/docs/text-props)
> - [React Native Docs: Text Style Props](https://reactnative.dev/docs/text-style-props)
> - [Expo Docs: Text](https://docs.expo.dev/ui-programming/text/)

### Procedural Content: Basic `<Text>` Usage

Let's enhance our SpeedyMeds medication card example from the previous section by adding more styled text.

**Short, Self-Contained Example:**

This example demonstrates using `<Text>` with various styles and nesting for a medication item.

```tsx
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MedicationInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.medicationName}>Lipitor 20mg Tablets</Text>
      <Text style={styles.prescriptionDetails}>Patient: John Doe</Text>
      <Text style={styles.instructions}>
        Instructions: Take <Text style={styles.boldInstruction}>1 tablet</Text>{" "}
        by mouth <Text style={styles.boldInstruction}>once daily</Text> in the
        evening.
      </Text>
      <Text style={styles.refillInfo} numberOfLines={1} ellipsizeMode="tail">
        Refills remaining: 2 (Valid until 12/31/2025). Contact pharmacy for more
        refills if needed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f7", // Light blue-grey background
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  medicationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50", // Dark blue-grey
    marginBottom: 8,
  },
  prescriptionDetails: {
    fontSize: 14,
    color: "#34495e", // Slightly lighter blue-grey
    marginBottom: 4,
  },
  instructions: {
    fontSize: 14,
    color: "#7f8c8d", // Grey for general instructions
    lineHeight: 20, // Improved readability
    marginBottom: 8,
  },
  boldInstruction: {
    fontWeight: "bold",
    color: "#2c3e50", // Match medication name color for emphasis
  },
  refillInfo: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#95a5a6", // Lighter grey for less critical info
  },
});
```

**Explanation of the Example:**

In this `MedicationInfo` component, we have several `<Text>` elements wrapped in a parent `<View>`.

1.  `medicationName`: Displays the drug name with a larger font size and bold weight.
2.  `prescriptionDetails`: Shows patient information with a standard font size.
3.  `instructions`: This demonstrates **nested `<Text>` components**. The general instruction text inherits the style from `styles.instructions`. However, specific parts like "1 tablet" and "once daily" are wrapped in their own `<Text>` components with `styles.boldInstruction` to make them bold and a different color, showcasing style inheritance and overriding.
4.  `refillInfo`: This `<Text>` component uses the `numberOfLines={1}` and `ellipsizeMode="tail"` props. If the refill information is too long to fit on a single line, it will be truncated with an ellipsis (...) at the end.

The example effectively uses various text styling props like `fontSize`, `fontWeight`, `color`, `lineHeight`, and `fontStyle` to create a clear and readable medication information display. The `StyleSheet` at the bottom defines these styles in an organized manner.

Remember, correct usage and styling of the `<Text>` component are key to presenting information clearly and effectively to your users in the SpeedyMeds app, whether it's medication details, patient instructions, or refill reminders.

### Next Steps

After learning about displaying text, the next logical step is to understand how to incorporate images into your application using the `<Image>` component.

- [Next Section: Image (`<Image>`) - Displaying Images](./section-04-image.md)
