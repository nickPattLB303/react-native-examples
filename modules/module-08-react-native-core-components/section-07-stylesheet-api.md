## Section 7: StyleSheet API - Basic Styling

Styling is a crucial aspect of creating visually appealing and user-friendly applications. React Native provides the `StyleSheet` API for defining and organizing styles for your components. This section introduces the basics of using `StyleSheet` to style Core Components.

### Conceptual Content: Understanding `StyleSheet`

In React Native, you don't use CSS directly as you would in web development. Instead, styles are defined using JavaScript objects. The `StyleSheet` API provides a way to create these style objects with several benefits:

- **Performance:** `StyleSheet.create()` can send styles to the native side only once during the initial render, potentially optimizing performance by avoiding passing new style objects on every render. It also helps in validating your style properties.
- **Organization:** It encourages you to define styles in a centralized place, separate from your component's render logic, leading to cleaner and more maintainable code.
- **Readability:** Using named styles (e.g., `styles.container`, `styles.title`) makes your component's JSX more readable than using inline style objects directly.
- **Validation:** `StyleSheet.create` can perform some validation of your style properties, helping catch typos or invalid values early.

Styles in React Native are similar to CSS, but property names are typically camelCased (e.g., `backgroundColor` instead of `background-color`, `fontSize` instead of `font-size`). Values can be strings (e.g., `'#FFF'`, `'center'`), numbers (e.g., `10`, `1.5`), or platform-specific constants.

**Key Characteristics of Styling in React Native:**

- **JavaScript Objects:** Styles are defined as plain JavaScript objects.
- **CamelCase Properties:** CSS property names are converted to camelCase (e.g., `background-color` becomes `backgroundColor`).
- **No Cascading (Mostly):** Unlike CSS on the web, styles are not inherited from parent `<View>` components to child `<View>` or `<Text>` components in the same way (except for text properties within nested `<Text>` components, as discussed in Section 3). Each component typically needs its styles applied directly or through props.
- **Flexbox by Default:** `<View>` components use Flexbox for layout by default. This is the primary layout system in React Native (covered in detail in Module 10).
- **Units:** Dimension values (like `width`, `height`, `margin`, `padding`, `fontSize`) are generally unitless and represent density-independent pixels (dp).

> 📲 **(Native Developers):**
>
> **Comparison:** Styling in React Native with `StyleSheet` is different from using XML layouts (Android) or Interface Builder/programmatic constraints (iOS). You define styles in JavaScript. Flexbox for layout is a key concept to grasp, which might differ from native layout systems like Auto Layout or ConstraintLayout.
>
> **Key Takeaway:** Styles are JavaScript objects. `StyleSheet.create` is the preferred way to define them for organization and potential performance benefits.
>
> **Source:** [React Native Docs: StyleSheet](https://reactnative.dev/docs/stylesheet)

> 🌐 **(Web Developers):**
>
> **Comparison:** While you use JavaScript for styling instead of CSS files, many CSS concepts apply. Property names are camelCased. Flexbox is the dominant layout model. The biggest difference is the lack of global CSS cascading and selectors. Styles are scoped to components.
>
> **Key Takeaway:** Think of `StyleSheet` objects as similar to CSS rules, but written in JavaScript and scoped locally. Flexbox knowledge is highly transferable.
>
> **Source:** [React Native Docs: Style](https://reactnative.dev/docs/style)

### Referential Content: Using `StyleSheet.create()`

The most common way to define styles is using `StyleSheet.create()`:

```typescript
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  // Add more named styles here
});
```

- You import `StyleSheet` from `react-native`.
- You call `StyleSheet.create()` with an object where keys are style names (e.g., `container`, `title`) and values are style objects containing the actual style properties.
- You then apply these styles to your components using the `style` prop: `<View style={styles.container}>` or `<Text style={styles.title}>`.

**Applying Multiple Styles:**
You can apply multiple styles to a component by passing an array to the `style` prop. Styles later in the array will override earlier ones if they have conflicting properties.

```tsx
<Text style={[styles.baseText, styles.highlightedText]}>Important Info</Text>
```

**Conditional Styles:**
You can also apply styles conditionally:

```tsx
<View style={[styles.card, isActive && styles.activeCard]}>...</View>
// or
<View style={isUrgent ? styles.urgentItem : styles.normalItem}>...</View>
```

> 📚 **Official Documentation:**
>
> - [React Native Docs: StyleSheet API](https://reactnative.dev/docs/stylesheet)
> - [React Native Docs: View Style Props](https://reactnative.dev/docs/view-style-props)
> - [React Native Docs: Text Style Props](https://reactnative.dev/docs/text-style-props)
> - [React Native Docs: Image Style Props](https://reactnative.dev/docs/image-style-props)
> - [Expo Docs: Styling](https://docs.expo.dev/ui-programming/styling/)

### Procedural Content: Basic Styling Example

Let's style a simple "Patient Greeting Card" for the SpeedyMeds app, applying various styles to `<View>` and `<Text>` components.

**Short, Self-Contained Example:**

```tsx
import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface PatientGreetingCardProps {
  patientName: string;
  appointmentTime?: string;
}

export default function PatientGreetingCard({
  patientName,
  appointmentTime,
}: PatientGreetingCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.greetingText}>
        Hello, <Text style={styles.patientNameText}>{patientName}</Text>!
      </Text>
      {appointmentTime ? (
        <Text style={styles.appointmentInfo}>
          Your next appointment is at: {appointmentTime}
        </Text>
      ) : (
        <Text style={styles.appointmentInfo}>No upcoming appointments.</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          SpeedyMeds - Your Health, Our Priority.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#e3f2fd", // Light blue background
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3, // for Android shadow
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "600", // Semi-bold
    color: "#0d47a1", // Darker blue
    marginBottom: 10,
    textAlign: "center",
  },
  patientNameText: {
    fontWeight: "bold", // Make patient name stand out
    fontStyle: "italic",
  },
  appointmentInfo: {
    fontSize: 16,
    color: "#1565c0", // Medium blue
    marginBottom: 15,
    textAlign: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#bbdefb", // Lighter blue for separator
    paddingTop: 10,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#42a5f5", // Lighter, friendly blue
    textAlign: "center",
    fontStyle: "italic",
  },
});

// To use this component in an App.tsx or another file:
// <PatientGreetingCard patientName='Sarah Connor' appointmentTime='2:30 PM' />
// <PatientGreetingCard patientName='John Doe' />
```

**Explanation of the Example:**

1.  **`StyleSheet.create`:** All styles are defined within the `styles` object created by `StyleSheet.create()`.
2.  **`cardContainer`:** This style defines the main card's appearance: background color, rounded corners (`borderRadius`), padding around its content, margins to space it from other elements, and shadow effects (`shadow*` props for iOS, `elevation` for Android).
3.  **`greetingText` & `patientNameText`:** The `greetingText` has its own styles. The patient's name within it is wrapped in another `<Text>` component and styled with `styles.patientNameText` to make it bold and italic, demonstrating style inheritance and overriding within nested `<Text>` components.
4.  **`appointmentInfo`:** Styles the text for appointment details.
5.  **`footer` & `footerText`:** The `footer` style creates a separated section at the bottom of the card with a top border. The `footerText` within it is styled accordingly.
6.  **Props:** The `PatientGreetingCard` component accepts `patientName` and an optional `appointmentTime` as props, making it reusable.

This example showcases how `StyleSheet` helps in organizing styles and how different style properties can be combined to create a visually structured and appealing UI component. This approach is fundamental to styling any Core Component in React Native.

### Exercise 8.2: Applying Styles with StyleSheet

Practice using `StyleSheet` to style a basic prescription information card for the SpeedyMeds app.

**Objective:** Create a styled card component to display medication name, dosage, and quantity.

**Instructions:**

1.  Create a new component (e.g., `PrescriptionCard`).
2.  The component should accept props for `medicationName` (string), `dosage` (string), and `quantity` (string or number).
3.  Use `<View>` for the card container and `<Text>` components to display the information.
4.  Define all styles using `StyleSheet.create()`.
    - Style the card container with a background color, padding, rounded corners, and a light shadow.
    - Style the medication name to be larger and bold.
    - Style the dosage and quantity texts appropriately.
    - Arrange the elements within the card in a clear and readable manner.
5.  Render an instance of your `PrescriptionCard` with sample data.

\*\*(https://snack.expo.dev/)

_Note: You will need to create a new Snack or use a local Expo project for this exercise. The solution will be provided separately._
