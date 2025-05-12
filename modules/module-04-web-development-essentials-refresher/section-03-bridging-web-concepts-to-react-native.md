## Section 3: Bridging Web Concepts to React Native

This section explains how the fundamental concepts of HTML structure and CSS styling, reviewed in the previous sections, translate to the React Native environment. Understanding this mapping is key to leveraging your web development knowledge (or understanding the web-inspired paradigms if you come from a native background).

### Conceptual Content

React Native allows you to build native mobile applications using React and JavaScript, but it does _not_ render HTML or use traditional CSS. Instead, it provides a set of **Core Components** that map conceptually to native UI widgets on iOS and Android, and a **JavaScript-based styling system (`StyleSheet`)** that borrows heavily from CSS, particularly Flexbox.

#### Mapping HTML Elements to React Native Components

There isn't a direct one-to-one mapping for every HTML element, but common web elements have clear counterparts in React Native's Core Components:

- `<div>`, `<span>`: Generally map to `<View>`. `<View>` is the fundamental building block for UI layouts, acting as a container that supports styling and Flexbox layout. It's analogous to a generic container view in native development (`UIView`/`ViewGroup`).
- `<p>`, `<h1>`-`<h6>`, `<span>` (for text): Map to `<Text>`. All text content in React Native **must** be wrapped within a `<Text>` component. Unlike HTML, you cannot place text directly inside a `<View>`.
- `<img>`: Maps to `<Image>`. Used for displaying various types of images, including network images, static resources, and temporary local images.
- `<input type="text">`: Maps to `<TextInput>`. Allows users to enter text.
- `<button>`: Maps to `<Button>` or `<Pressable>`. `<Button>` provides a basic platform-specific button, while `<Pressable>` is a more flexible component for detecting various types of touch interactions on its children.
- `<a>`: There's no direct equivalent. Hyperlinks are typically implemented using `<Text>` styled appropriately and an `onPress` handler using the `Linking` module to open URLs.
- `<ul>`, `<ol>`, `<li>`: Map to `<FlatList>` or `<SectionList>`. These components are optimized for displaying scrolling lists of data. You render list items using `<View>`, `<Text>`, and other components within the list's `renderItem` prop.

**Table: Conceptual Mapping of Common Web Elements to React Native Components**

This table summarizes the common conceptual mappings.

| HTML Element                   | React Native Core Component(s) | Notes                                                                     |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------------------- |
| `<div>`                        | `<View>`                       | Fundamental container for layout and grouping.                            |
| `<p>`, `<h1>`-`<h6>`, `<span>` | `<Text>`                       | Required for all text rendering.                                          |
| `<img>`                        | `<Image>`                      | Displays images (local/network).                                          |
| `<input type="text">`          | `<TextInput>`                  | For user text input.                                                      |
| `<button>`                     | `<Button>`, `<Pressable>`      | For user interactions (taps). `<Pressable>` is more customizable.         |
| `<a>` (link)                   | `<Text>` + `Linking`           | Styled `<Text>` with `onPress` handler using `Linking` API.               |
| `<ul>`, `<ol>`, `<li>`         | `<FlatList>`, `<SectionList>`  | Efficiently renders scrolling lists of data using custom item components. |

#### Mapping CSS Concepts to React Native StyleSheet

React Native uses JavaScript objects created via `StyleSheet.create` to style components. This approach offers performance benefits (sending styles over the bridge once) and better organization.

**Key Differences from Web CSS:**

1.  **Syntax:** Styles are defined in JavaScript objects, not separate `.css` files.
2.  **Property Names:** CSS properties are written in `camelCase` (e.g., `backgroundColor` instead of `background-color`, `flexDirection` instead of `flex-direction`).
3.  **Units:** Most dimensions (width, height, margin, padding, font size) are unitless numbers interpreted as density-independent pixels (dp). Strings with units (e.g., `'10%'`, `'5em'`) are generally not supported, except for percentages in some specific properties.
4.  **No Cascading:** Styles are not inherited from parent elements in the same way as web CSS. Text styles applied to a parent `<Text>` component are inherited by nested `<Text>` components, but layout styles applied to a `<View>` are not inherited by its children.
5.  **Limited Selectors:** There are no complex CSS selectors (e.g., descendant selectors, attribute selectors). Styles are applied directly to components via the `style` prop.
6.  **Flexbox Default:** Flexbox is the default layout model for `<View>`. You don't need `display: flex`. Furthermore, the default `flexDirection` is `column`, unlike the web's default of `row`.

> 📚 **Official Documentation:**
>
> - [React Native Docs: View](https://reactnative.dev/docs/view)
> - [React Native Docs: Text](https://reactnative.dev/docs/text)
> - [React Native Docs: Image](https://reactnative.dev/docs/image)
> - [React Native Docs: TextInput](https://reactnative.dev/docs/textinput)
> - [React Native Docs: Button](https://reactnative.dev/docs/button)
> - [React Native Docs: Pressable](https://reactnative.dev/docs/pressable)
> - [React Native Docs: FlatList](https://reactnative.dev/docs/flatlist)
> - [React Native Docs: StyleSheet](https://reactnative.dev/docs/stylesheet)
> - [React Native Docs: Style](https://reactnative.dev/docs/style)
> - [React Native Docs: Layout with Flexbox](https://reactnative.dev/docs/flexbox)

> 🌐 **(Web Developers):**
>
> **Comparison:** The mapping feels intuitive but requires adjusting to JavaScript syntax (camelCase, objects) and the absence of cascading/complex selectors. The biggest paradigm shift is often the `flexDirection: 'column'` default and the strict requirement to wrap all text in `<Text>`.
>
> **Key Takeaway:** Reuse your understanding of component structure and CSS properties (especially Flexbox), but adapt to the `StyleSheet` API, camelCase syntax, unitless dimensions, and React Native's specific defaults and component requirements.

> 📲 **(Native Developers):**
>
> **Comparison:** You'll recognize the mapping of elements to native views. The `StyleSheet` approach might feel different from XML layouts or programmatic constraints/frames. Think of `StyleSheet` as defining attributes for your views (like setting `backgroundColor`, `width`, `height` in native code), but centralized in JavaScript. Flexbox becomes your primary tool for positioning and sizing, replacing systems like Auto Layout or ConstraintLayout for most common scenarios.
>
> **Key Takeaway:** React Native uses web-inspired concepts (components analogous to HTML elements, styling analogous to CSS via `StyleSheet`) to define native UI. Embrace Flexbox as the core layout mechanism.

### Procedural Content

#### Example: Basic Card Layout (React Native)

Let's translate a simple HTML/CSS card concept into React Native using `<View>`, `<Text>`, and `StyleSheet` with Flexbox.

**Conceptual HTML/CSS:**

```html
<!-- Simple Card -->
<div class="card">
  <p class="title">Amoxicillin 500mg</p>
  <p class="details">Take one capsule every 8 hours.</p>
</div>
```

```css
.card {
  border: 1px solid gray;
  padding: 15px;
  margin: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
}
.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}
.details {
  font-size: 14px;
  color: #333;
}
```

**React Native Implementation (`tsx`):**

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Define props for type safety (assuming TypeScript)
interface MedicationCardProps {
  name: string;
  instructions: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ name, instructions }) => {
  return (
    <View style={styles.card}> // Equivalent to <div class="card">
      <Text style={styles.title}>{name}</Text> // Equivalent to <p class="title">
      <Text style={styles.details}>{instructions}</Text> // Equivalent to <p class="details">
    </View>
  );
};

// Create styles using StyleSheet.create
const styles = StyleSheet.create({
  card: { // Styles for the main container View
    borderWidth: 1, // border: 1px
    borderColor: 'gray', // border-color: gray
    padding: 15, // padding: 15px
    margin: 10, // margin: 10px
    backgroundColor: '#f0f0f0', // background-color: #f0f0f0
    borderRadius: 8, // border-radius: 8px
  },
  title: { // Styles for the name Text
    fontWeight: 'bold', // font-weight: bold
    fontSize: 16, // font-size: 16px (unitless)
    marginBottom: 5, // margin-bottom: 5px
  },
  details: { // Styles for the instructions Text
    fontSize: 14, // font-size: 14px (unitless)
    color: '#333', // color: #333
  },
});

export default MedicationCard;

// Example Usage (in another component):
// import MedicationCard from './MedicationCard';
// <MedicationCard name="Amoxicillin 500mg" instructions="Take one capsule every 8 hours." />
```

**Explanation (approx. 150 words):**

This example demonstrates the mapping. The HTML `div` with class `card` becomes a React Native `<View>` component. The HTML paragraphs (`<p>`) become `<Text>` components, as all text must be inside `<Text>`. Styles defined in CSS classes are translated into JavaScript objects within `StyleSheet.create`. Notice the direct mapping of properties: `border` becomes `borderWidth` and `borderColor`, `padding` remains `padding`, `background-color` becomes `backgroundColor` (camelCase), `font-weight` becomes `fontWeight`, and `font-size` becomes `fontSize` (using unitless numbers). The styles object (`styles`) is then referenced in the `style` prop of each component (e.g., `style={styles.card}`). This structure keeps styles organized and applies them directly to the corresponding elements.

### Challenge

Recreate a simple web layout using React Native components and StyleSheet based on provided HTML/CSS.

**(https://codesandbox.io/p/sandbox/module-4-challenge-simple-layout-recreation-placeholder-w6ztrx)** (Note: Replace with actual CodeSandbox link when created)

### Next Steps

Understanding this bridge between web concepts and React Native is crucial. You now have the foundational context for how React Native structures UI and applies styling. In the next module, we'll dive into JavaScript essentials, which form the core logic behind React Native applications.

---

## Module Summary

This module provided a concise refresher on essential web development concepts, focusing on their relevance to React Native. We reviewed core HTML structure and elements, fundamental CSS principles like the box model and selectors, and emphasized the Flexbox layout model. Critically, we explored how these web paradigms map conceptually to React Native's Core Components (like `<View>`, `<Text>`, `<Image>`) and its JavaScript-based `StyleSheet` API. Recognizing these parallels and differences, especially regarding Flexbox defaults and styling syntax, provides a solid foundation for building user interfaces in React Native.
