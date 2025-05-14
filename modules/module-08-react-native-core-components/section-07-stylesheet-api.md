## Section 7: StyleSheet API - Basic Styling

Styling is a crucial aspect of creating visually appealing and user-friendly applications. React Native provides the `StyleSheet` API for defining and organizing styles for your components. This section introduces the basics of using `StyleSheet` to style Core Components.

### Conceptual Content: Understanding `StyleSheet`

In React Native, you don't use CSS directly as you would in web development. Instead, styles are defined using JavaScript objects. The `StyleSheet` API provides a way to create these style objects with several benefits:

- **Performance:** `StyleSheet.create()` can send styles to the native side only once during the initial render (by assigning them an ID), potentially optimizing performance by avoiding passing new style objects on every render.
- **Organization:** It encourages you to define styles in a centralized place, separate from your component's render logic, leading to cleaner and more maintainable code.
- **Readability:** Using named styles (e.g., `styles.container`, `styles.title`) makes your component's JSX more readable than using inline style objects directly.
- **Validation and Static Analysis:** `StyleSheet.create()` helps in catching errors related to style properties or values during development. When used with type systems like TypeScript or Flow, it can provide static type checking and autocompletion.

Styles in React Native are similar to CSS, but property names are typically camelCased (e.g., `backgroundColor` instead of `background-color`, `fontSize` instead of `font-size`). Values can be strings (e.g., `'#FFF'`, `'center'`), numbers (e.g., `10`, `1.5`), or platform-specific constants.

**Key Characteristics of Styling in React Native:**

- **JavaScript Objects:** Styles are defined as plain JavaScript objects.
- **CamelCase Properties:** CSS property names are converted to camelCase.
- **No Cascading (Mostly):** Unlike CSS on the web, styles are not inherited from parent `<View>` components to child `<View>` or `<Text>` components in the same way (except for text properties within nested `<Text>` components). Each component typically needs its styles applied directly.
- **Flexbox by Default:** `<View>` components use Flexbox for layout by default (covered in Module 10).
- **Units:** Dimension values (like `width`, `height`, `margin`, `padding`, `fontSize`) are generally unitless and represent density-independent pixels (dp).

> 📲 **(Native Developers):**
>
> **Comparison:** Styling in React Native with `StyleSheet` is different from using XML layouts and `<style>` resources (Android) or Interface Builder/programmatic constraints (iOS). You define styles in JavaScript. Flexbox for layout is a key concept. There's no direct equivalent to Android's theme system for global styling; theming is custom-built.
>
> **Key Takeaway:** Styles are JavaScript objects. `StyleSheet.create` is the preferred way for organization and potential performance benefits. Units are density-independent pixels by default.
>
> **Source:** [React Native Docs: StyleSheet](https://reactnative.dev/docs/stylesheet)

> 🌐 **(Web Developers):**
>
> **Comparison:** While you use JavaScript for styling instead of CSS files, many CSS concepts apply. Property names are camelCased. Flexbox is the dominant layout model. The biggest difference is the lack of global CSS cascading and selectors. Styles are scoped to components.
>
> **Key Takeaway:** Think of `StyleSheet` objects as similar to CSS rules, but written in JavaScript and scoped locally. Flexbox knowledge is highly transferable. React Native uses unitless numbers for density-independent pixels, differing from CSS units like `px`, `em`, `rem`.
>
> **Source:** [React Native Docs: Style](https://reactnative.dev/docs/style)

### Referential Content: `StyleSheet` API

**1. `StyleSheet.create(styles)`:**

The most common way to define styles:

```typescript
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    /* ... */
  },
  title: {
    /* ... */
  },
});
```

- Call `StyleSheet.create()` with an object where keys are style names and values are style objects.
- Apply with `style={styles.container}`.

**2. Applying Multiple Styles:**
Pass an array to the `style` prop. Later styles override earlier ones.
`false`, `null`, or `undefined` values in the array are ignored.

```tsx
<Text
  style={[
    styles.baseText,
    styles.highlightedText,
    isActive && styles.activeStyle,
  ]}
/>
```

**3. Other `StyleSheet` Utilities:**

| API Element                     | Description                                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `StyleSheet.flatten(style)`     | Merges an array of style objects (or registered style IDs) into a single plain JavaScript object. Useful for debugging or introspection. |
| `StyleSheet.compose(s1, s2)`    | Combines two styles, with `s2` overriding `s1`. Returns one style if the other is falsy, avoiding array allocation.                      |
| `StyleSheet.absoluteFill`       | A pre-registered style object for `{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }`.                                      |
| `StyleSheet.absoluteFillObject` | A plain object version of `absoluteFill`.                                                                                                |
| `StyleSheet.hairlineWidth`      | A constant for the thinnest possible line width on the current device (typically 1 physical pixel, as a density-independent value).      |

**Table: React Native Style Property vs. CSS Equivalent (Common Examples)**

| React Native Style (camelCase)    | CSS Equivalent (kebab-case)    | Notes                                                                                                                              |
| --------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`                 | `background-color`             |                                                                                                                                    |
| `color`                           | `color`                        | (For `<Text>` components)                                                                                                          |
| `fontSize`                        | `font-size`                    | Unitless number in RN (dp), various units in CSS (px, em, rem).                                                                    |
| `fontWeight`                      | `font-weight`                  | Supports `'normal'`, `'bold'`, and string/number weights like `'400'`, `500`.                                                      |
| `margin`                          | `margin`                       | Single value for all sides. Specific sides: `marginTop`, `marginLeft`, etc.                                                        |
| `padding`                         | `padding`                      | Single value for all sides. Specific sides: `paddingTop`, `paddingLeft`, etc.                                                      |
| `width`, `height`                 | `width`, `height`              | Unitless number (dp) or percentage string (e.g., `'50%'`) in RN.                                                                   |
| `flex`                            | `flex`                         | In RN, typically a single number (e.g., `flex: 1`).                                                                                |
| `flexDirection`                   | `flex-direction`               | Default is `'column'` in RN, `'row'` in web CSS.                                                                                   |
| `alignItems`                      | `align-items`                  |                                                                                                                                    |
| `justifyContent`                  | `justify-content`              |                                                                                                                                    |
| `borderRadius`                    | `border-radius`                | Single value for all corners. Specific corners: `borderTopLeftRadius`, etc.                                                        |
| `borderWidth`                     | `border-width`                 | Single value for all sides. Specific sides: `borderTopWidth`, etc.                                                                 |
| `position: 'absolute'`            | `position: absolute;`          |                                                                                                                                    |
| `transform: [{ translateX: 10 }]` | `transform: translateX(10px);` | RN `transform` is an array of objects. CSS `transform` is a space-separated list of functions. Angles as strings (e.g. `'45deg'`). |

> 📚 **Official Documentation:**
>
> - [React Native Docs: StyleSheet API](https://reactnative.dev/docs/stylesheet)
> - [React Native Docs: Style Prop](https://reactnative.dev/docs/style)
> - [React Native Docs: View Style Props](https://reactnative.dev/docs/view-style-props)
> - [React Native Docs: Text Style Props](https://reactnative.dev/docs/text-style-props)
> - [React Native Docs: Image Style Props](https://reactnative.dev/docs/image-style-props)
> - [React Native Docs: Layout Props (Flexbox)](https://reactnative.dev/docs/layout-props)
> - [React Native Docs: Transforms](https://reactnative.dev/docs/transforms)
> - [Expo Docs: Styling](https://docs.expo.dev/ui-programming/styling/)
> - _(Web Reference)_ [MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)

### "Under the Hood": How StyleSheet Translates to Native Styles

When `StyleSheet.create()` is used, React Native processes these JavaScript style objects:

1.  **ID Assignment & Caching:** For styles defined in `StyleSheet.create()`, React Native typically assigns a unique ID to each style rule object. These style objects and their IDs are registered.
2.  **Bridge Transmission (Legacy Architecture):** When a component renders with a style like `styles.myStyle`, instead of sending the entire JavaScript style object over the bridge for every instance, React Native often sent just the pre-computed ID. The native side (UIManager) maintained a registry and looked up the full style definition using the ID. This significantly reduced data transfer.
3.  **Native Translation:** The native rendering system (UIManager in legacy, or Fabric's rendering pipeline in the New Architecture) takes these style definitions (resolved by ID or passed as inline objects for dynamic styles) and translates them into the corresponding native view properties or layout parameters. For example, `{ backgroundColor: 'blue', width: 100 }` applied to a `<View>` would instruct the native side to create/update a `UIView` (iOS) or `android.view.View` (Android) and set its background color and width.
4.  **Layout with Yoga:** Flexbox styles (e.g., `flex: 1`, `alignItems: 'center'`) are interpreted by the Yoga layout engine. Yoga calculates the positions and sizes (frames: x, y, width, height) of all elements. These results are then applied to the native views.

Even with the New Architecture's JSI (which largely eliminates the bridge bottleneck), the principle of efficiently defining and referencing styles remains important for performance. Styles are processed and applied to shadow nodes, which then inform the native view updates.

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

**(https://snack.expo.dev/@speedymeds/rn-exercise-8-2-stylesheet-styling)**
