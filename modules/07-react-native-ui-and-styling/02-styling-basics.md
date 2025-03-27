# 02: Styling Basics 🎨

Styling in React Native allows you to control the visual appearance and layout of your components. Unlike web development which primarily uses CSS files, React Native styling is done using JavaScript objects.

*   Styles are defined as JS objects (camelCase keys, e.g., `backgroundColor`).
*   Passed via the `style` prop to components.
*   Uses a subset of CSS properties, plus some React Native specifics.
*   `StyleSheet.create` API is recommended for defining styles.

> Mastering styling is key to creating visually appealing and platform-consistent applications.

<blockquote><details>

React Native employs a styling paradigm that leverages JavaScript. Instead of writing CSS rules in separate files, you define style rules as plain JavaScript objects. Property names are written in camelCase (e.g., `backgroundColor` instead of `background-color`, `fontSize` instead of `font-size`) to align with JavaScript conventions. These style objects are then passed directly to components via their `style` prop. While many property names and concepts are borrowed from CSS (like `margin`, `padding`, `color`, `flex`), the set of available properties is specific to React Native and tailored for mobile UI development. It doesn't support everything CSS does (e.g., complex selectors, pseudo-classes like `:hover` directly in StyleSheet, though `Pressable` handles states). The recommended way to define styles is using the `StyleSheet.create` method, which offers performance benefits and better organization compared to defining style objects inline within your component's render method.

</details></blockquote>

---

## `StyleSheet.create` vs. Inline Styles

There are two primary ways to apply styles:

1.  **`StyleSheet.create` (Recommended):**
    *   Define styles outside the render function.
    *   Styles are created once and referenced by ID.
    *   Performance benefits (sent over the bridge only once).
    *   Better organization and reusability.
    *   Provides validation (warns about invalid style properties).

2.  **Inline Styles:**
    *   Define style objects directly in the `style` prop (e.g., `style={{ color: 'blue' }}`).
    *   Convenient for dynamic styles or quick prototyping.
    *   Can lead to performance issues if objects are recreated on every render.
    *   Less organized for complex styling.

> Always prefer `StyleSheet.create` for static styles. Use inline styles sparingly, primarily for dynamic values.

<blockquote><details>

The choice between `StyleSheet.create` and inline styles impacts performance and maintainability. `StyleSheet.create` takes an object where keys are style names and values are style objects. It returns an object where the values are opaque identifiers. React Native optimizes this by sending the style definitions over the native bridge only once during initialization. When you use `styles.myStyle`, you're passing this identifier, which is more efficient than sending a potentially large JavaScript object on every render. It also helps catch typos or invalid style properties early. Inline styles, like `<Text style={{ fontSize: 16, color: 'red' }}>`, create a new style object on every render cycle. While convenient for styles that depend directly on component state or props, overuse can lead to performance degradation because these objects need to be processed and potentially sent over the bridge repeatedly. A common practice is to use `StyleSheet.create` for the bulk of styling and combine it with inline styles for dynamic parts, e.g., `style={[styles.base, { backgroundColor: dynamicColor }]}`.

</details></blockquote>

--

### Example: `StyleSheet.create`

Defining and applying styles for a medication label using `StyleSheet`.

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Displays a styled medication label.
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the medication.
 * @returns {JSX.Element} A styled Text component within a View.
 */
const MedicationLabel = ({ name }: { name: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{name}</Text>
    </View>
  );
};

// Define styles using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F0FE', // Light blue background
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15, // Rounded corners
    marginVertical: 5,
    alignSelf: 'flex-start', // Prevent stretching full width
  },
  labelText: {
    color: '#1967D2', // Darker blue text
    fontSize: 14,
    fontWeight: '500', // Medium weight
  },
});

export default MedicationLabel;

// Usage: <MedicationLabel name="Aspirin 81mg" />
```

<blockquote><details>

This example demonstrates the standard practice of using `StyleSheet.create`. We define a `styles` object outside the `MedicationLabel` component function. This object contains two style definitions: `container` and `labelText`. Inside the component, we apply these styles using the `style` prop, referencing them as `styles.container` and `styles.labelText`. Notice the property names are camelCased (`backgroundColor`, `paddingVertical`, `borderRadius`, `alignSelf`, `fontSize`, `fontWeight`). The styles define a light blue, rounded container with darker blue text, suitable for a label or tag. Because `styles` is defined outside the component, the `StyleSheet.create` function runs only once when the module is loaded, not on every render. React Native optimizes the handling of these registered styles. This approach keeps the component's render logic clean and separates styling concerns, making the code more readable and maintainable. The `alignSelf: 'flex-start'` style prevents the container `View` from stretching to the full width of its parent if the parent is a flex container.

</details></blockquote>

--

### Example: Inline Styles (Use Sparingly)

Applying a dynamic background color based on props using inline styles combined with `StyleSheet`.

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Status = 'active' | 'inactive' | 'pending';

/**
 * Displays a medication status badge with dynamic background color.
 * @param {object} props - Component props.
 * @param {Status} props.status - The status of the medication.
 * @returns {JSX.Element} A styled View component with dynamic background.
 */
const MedicationStatusBadge = ({ status }: { status: Status }) => {
  // Determine background color based on status prop
  const getBackgroundColor = (currentStatus: Status): string => {
    switch (currentStatus) {
      case 'active':
        return '#E6F4EA'; // Light green
      case 'inactive':
        return '#FDECEA'; // Light red
      case 'pending':
        return '#FEF3E0'; // Light yellow
      default:
        return '#F1F3F4'; // Light gray
    }
  };

  const dynamicBackgroundColor = getBackgroundColor(status);

  return (
    // Combine StyleSheet and inline style for dynamic background
    <View style={[styles.badgeBase, { backgroundColor: dynamicBackgroundColor }]}>
      <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeBase: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    margin: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3C4043', // Dark gray text for contrast
    textAlign: 'center',
  },
});

export default MedicationStatusBadge;

// Usage: <MedicationStatusBadge status="active" />
```

<blockquote><details>

This example illustrates a valid use case for combining `StyleSheet.create` with inline styles. We want the background color of the `MedicationStatusBadge` to change based on the `status` prop. The base styling (padding, border radius, etc.) is defined in `styles.badgeBase` using `StyleSheet.create` for efficiency and organization. Inside the component, we calculate the `dynamicBackgroundColor` based on the `status` prop. Then, in the `style` prop of the `View`, we pass an array: `[styles.badgeBase, { backgroundColor: dynamicBackgroundColor }]`. React Native merges styles passed in an array, with later styles overriding earlier ones if properties conflict. Here, the inline style `{ backgroundColor: dynamicBackgroundColor }` overrides any `backgroundColor` potentially set in `styles.badgeBase` (though none was set here). This pattern is efficient because the base styles are registered once, and only the small inline object containing the dynamic property is processed on each render. It keeps the dynamic part isolated while leveraging `StyleSheet` for the static parts.

</details></blockquote>

---

## Common Style Properties

React Native supports many CSS-like properties:

*   **Dimensions:** `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`
*   **Margin & Padding:** `margin`, `padding` (and specific sides: `marginTop`, `paddingHorizontal`, etc.)
*   **Colors:** `color` (text), `backgroundColor`, `borderColor`, `tintColor` (Image)
*   **Borders:** `borderWidth`, `borderColor`, `borderRadius` (and specific sides/corners)
*   **Typography (`Text` only):** `fontSize`, `fontWeight`, `fontStyle`, `textAlign`, `lineHeight`, `fontFamily`
*   **Layout (Flexbox):** `flex`, `flexDirection`, `justifyContent`, `alignItems`, etc. (Covered next!)
*   **Positioning:** `position` (`relative` (default), `absolute`), `top`, `bottom`, `left`, `right`
*   **Transforms:** `transform: [{ rotate: '45deg' }, { scale: 1.1 }]`
*   **Shadows (Platform Specific):**
    *   iOS: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
    *   Android: `elevation`

> Refer to the [React Native Style Props Docs](https://reactnative.dev/docs/style) for a full list.

<blockquote><details>

React Native provides a rich set of style properties, many of which will be familiar to web developers. Dimension properties (`width`, `height`) control the size of components. Margins create space *outside* a component's border, while padding creates space *inside* the border, around the content. Color properties accept standard color formats like hex (`#RRGGBB`, `#RGB`), `rgb()`, `rgba()`, `hsl()`, `hsla()`, and named colors. Border properties allow you to define the appearance of the component's outline. Typography styles are specific to the `Text` component and control font appearance and text layout. Layout properties, primarily Flexbox, are crucial for arranging components on the screen and will be detailed in the next section. Positioning allows for absolute placement relative to a parent or the screen. Transforms enable effects like rotation, scaling, and translation. Shadow effects differ between platforms: iOS uses `shadow*` properties, while Android uses the `elevation` property to create material design-like shadows. Always consult the official documentation for the exact properties available and their behavior.

</details></blockquote>

---

## Units and Density-Independent Pixels (dp)

React Native uses **density-independent pixels (dp)** for all dimensions and positions.

*   Sizes are specified as unitless numbers (e.g., `width: 100`).
*   These numbers represent dp, which scale automatically based on screen density.
*   Ensures components have roughly the same physical size across different devices.
*   `1dp` ≈ `1px` on a `160 dpi` screen.

<div class="android-dev">🤖 **Android Devs:** You are already familiar with `dp` (density-independent pixels) from Android XML layouts. React Native uses the same concept.</div>
<div class="ios-dev">🍏 **iOS Devs:** This is analogous to `points` in iOS development, which abstract away the pixel density of Retina vs. non-Retina displays.</div>
<div class="react-dev">⚛ **React Devs:** Unlike web CSS where you use `px`, `em`, `rem`, `%`, etc., React Native primarily uses unitless numbers representing dp. Percentages are supported for some properties (e.g., `width: '50%'`).</div>
<div class="angular-dev">🅰 **Angular Devs:** Similar to web, but the primary unit is dp (represented by unitless numbers), not `px` or other CSS units.</div>

<blockquote><details>

A key aspect of React Native styling is its unit system. All dimensions, margins, paddings, font sizes, and positions are specified using unitless numbers. These numbers are interpreted as density-independent pixels (dp). The concept of dp is crucial for mobile development because device screens have varying pixel densities (pixels per inch, or PPI/DPI). If you specified sizes in raw pixels (`px`), a component might appear large on a low-density screen and tiny on a high-density (Retina) screen. Density-independent pixels solve this by providing an abstract unit that scales with the screen's density. A component defined with `width: 100` (meaning 100dp) will occupy roughly the same physical width on both low and high-density displays, ensuring a more consistent user experience across devices. This abstraction simplifies layout design significantly compared to manually calculating pixel values for different screen densities. While percentages are supported for certain properties like `width` and `height`, dp is the standard unit for most sizing and positioning tasks.

</details></blockquote>

---

## Style Inheritance

Style inheritance in React Native is much more limited than in CSS.

*   **General Rule:** Styles are **NOT** inherited from parent components by default.
    *   A `View` with `color: 'blue'` does **not** make `Text` inside it blue.
*   **Exception:** Nested `<Text>` components **DO** inherit typographic styles from their parent `<Text>` component.
    *   Font size, weight, color, style, etc., are inherited down the `Text` tree.

```typescript
// Example of Text inheritance
<Text style={{ color: 'blue', fontSize: 18 }}>
  This is blue and size 18.
  <Text style={{ fontWeight: 'bold' }}>
    {' '}This is also blue/18 and bold. {/* Inherits color/size */}
  </Text>
</Text>

// Example of NO inheritance from View
<View style={{ color: 'red' }}> {/* This color style has NO effect */}
  <Text>This text is NOT red (uses default color).</Text>
</View>
```

> Apply styles directly to the components you want to affect, except for leveraging `<Text>` nesting for typographic inheritance.

<blockquote><details>

Understanding style inheritance is crucial to avoid confusion, especially for those coming from web development. In CSS, many properties (like `color`, `font-size`, `font-family`) naturally inherit down the DOM tree unless overridden. In React Native, this is generally **not** the case. Styles applied to a container component like `View` typically only affect that `View` itself and its layout properties; they do not cascade down to its children. For example, setting `color` or `fontSize` on a `View` will have no effect on the `Text` components inside it. You must apply text-related styles directly to the `Text` components. The significant exception is nesting `Text` components within other `Text` components. In this specific scenario, typographic styles (like `color`, `fontSize`, `fontWeight`, `fontFamily`, `fontStyle`, `lineHeight`, `textAlign`, etc.) *are* inherited from the parent `Text` to the child `Text`. This allows for convenient formatting of text segments with slight variations, as shown in the example where the bolded text inherits the blue color and size 18 from its parent `Text`. Remember this limited inheritance model when applying styles.

</details></blockquote>

---

## Summary: Styling Basics

*   🎨 Styles are defined using **JavaScript objects** with camelCase properties.
*   ⚙️ Use **`StyleSheet.create`** for performance, organization, and validation (preferred).
*   💧 Use **inline styles** (`style={{...}}`) sparingly for dynamic values. Combine with `StyleSheet` using arrays: `style={[styles.base, { dynamicStyle }]}`.
*   📏 Dimensions and positions use unitless **density-independent pixels (dp)**.
*   🚫 Style **inheritance is limited**, primarily occurring only between nested `<Text>` components for typographic styles.
*   📚 Refer to **official docs** for available style properties.

> Apply styles directly and leverage `StyleSheet` for clean, performant UI code.

<blockquote><details>

This section covered the fundamentals of applying styles in React Native. We learned that styles are JavaScript objects, preferably defined using `StyleSheet.create` for performance and maintainability, although inline styles have their place for dynamic properties. We discussed common style properties, emphasizing the camelCase naming convention and the platform differences for shadows (iOS `shadow*` vs. Android `elevation`). The concept of density-independent pixels (dp) as the standard unit was explained, highlighting its role in achieving consistent physical sizes across devices with varying screen densities. Finally, we clarified React Native's limited style inheritance model, noting that styles generally don't cascade from parent to child, with the main exception being typographic styles within nested `Text` components. These foundational concepts are essential before diving into layout with Flexbox.

</details></blockquote> 