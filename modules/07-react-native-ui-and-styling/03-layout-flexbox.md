# 03: Layout with Flexbox 📐

Flexbox is the primary layout system in React Native, used to arrange components within a container. It provides a consistent way to structure UI across different screen sizes.

*   Enabled by default on all `<View>` components.
*   Based on the web CSS Flexbox spec, but with some differences.
*   Key properties: `flexDirection`, `justifyContent`, `alignItems`.
*   Default `flexDirection` is `column` (unlike web's `row`).

> Flexbox allows you to build responsive and adaptive layouts efficiently.

<blockquote><details>

Layout defines how components are positioned and sized on the screen. React Native exclusively uses Flexbox for this purpose. If you're familiar with Flexbox in web development (CSS), you'll find many similarities, but also some key distinctions. The most notable difference is the default main axis direction: React Native defaults to `flexDirection: 'column'` (top-to-bottom), whereas web CSS defaults to `row` (left-to-right). This default makes sense for mobile screens, which are typically portrait-oriented. Flexbox works by defining properties on a container (the "flex container") to control the arrangement of its direct children (the "flex items"). By manipulating properties like `flexDirection`, `justifyContent` (distribution along the main axis), and `alignItems` (alignment along the cross axis), you can achieve a wide variety of common mobile layouts with relative ease. All `View` components are implicitly flex containers.

</details></blockquote>

---

## Flexbox Concepts: Container & Items

*   **Flex Container:** A `View` (or other component) whose `style` includes `display: 'flex'` (which is implicit and default for `View`). It contains flex items.
*   **Flex Items:** The direct children of a flex container.
*   **Main Axis:** The primary direction along which items are laid out. Determined by `flexDirection` (`column` or `row`).
*   **Cross Axis:** The axis perpendicular to the main axis. 

```
flexDirection: 'column' (Default)
+-------------------+
| Main Axis (↓) |
| +-------+ Cross ->|
| | Item1 | Axis |
| +-------+ |
| +-------+ |
| | Item2 | |
| +-------+ |
+-------------------+
flexDirection: 'row'
+-------------------+
| Cross Axis (↓) |
| +-------++-------+|
| | Item1 || Item2 || Main Axis (->)
| +-------++-------+|
| |
+-------------------+
```

Understanding the main and cross axes is fundamental to using `justifyContent` and `alignItems` correctly.

<blockquote><details>

The core idea of Flexbox revolves around the relationship between a container and its items. You apply Flexbox properties to the container's style to dictate how its direct children are arranged. The `flexDirection` property establishes the main axis. If `flexDirection` is `'column'` (the default in React Native), the main axis runs vertically, and items are stacked top-to-bottom. The cross axis then runs horizontally. If `flexDirection` is `'row'`, the main axis runs horizontally, items are placed left-to-right, and the cross axis runs vertically. The properties `justifyContent` and `alignItems` work relative to these axes. `justifyContent` controls the distribution of items along the *main axis*, while `alignItems` controls their alignment along the *cross axis*. This axis-dependent behavior is key to mastering Flexbox layout. Remember that these properties only affect the *direct children* of the flex container.

</details></blockquote>

---

## `flexDirection`: Main Axis Direction

Determines the direction flex items are placed in the container.

*   `column` (Default): Items stack vertically (top to bottom). Main axis is vertical.
*   `row`: Items align horizontally (left to right). Main axis is horizontal.
*   `column-reverse`: Items stack vertically (bottom to top).
*   `row-reverse`: Items align horizontally (right to left).

```typescript
// Example StyleSheet
const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row', // Items side-by-side
    // ... other styles
  },
  containerColumn: {
    flexDirection: 'column', // Items stacked (default)
    // ... other styles
  },
});
```

> The default `column` direction is often suitable for the overall screen layout in mobile apps. `row` is common for elements within a component (e.g., icon next to text).

<blockquote><details>

The `flexDirection` property is one of the most fundamental Flexbox settings, as it defines the primary axis along which your flex items will be arranged. In React Native, the default value is `column`, meaning items placed inside a `View` will stack vertically by default. This is often convenient for the overall structure of a mobile screen. When you need items to sit side-by-side, such as an icon and its corresponding text label, or buttons in a toolbar, you'll set `flexDirection: 'row'`. The `*-reverse` options (`column-reverse`, `row-reverse`) work similarly but arrange items starting from the end of the container towards the beginning. Changing `flexDirection` swaps the main and cross axes, which subsequently affects how `justifyContent` and `alignItems` behave. Understanding this relationship is crucial for predictable layouts.

</details></blockquote>

---

## `justifyContent`: Alignment along Main Axis

Distributes space between and around flex items along the **main axis**.

*   `flex-start` (Default): Pack items towards the start.
*   `flex-end`: Pack items towards the end.
*   `center`: Pack items towards the center.
*   `space-between`: Distribute items evenly; first item at the start, last at the end.
*   `space-around`: Distribute items evenly with equal space around them (half-space at ends).
*   `space-evenly`: Distribute items evenly with equal space between them and at the ends.

> Think: How should extra space along the `flexDirection` be used?

<blockquote><details>

Once `flexDirection` sets the main axis, `justifyContent` controls how flex items are positioned along that axis, particularly when there's extra space available in the container. `flex-start` (the default) groups items at the beginning of the axis (top for `column`, left for `row`). `flex-end` groups them at the end. `center` places them in the middle. The `space-*` values are useful for distributing items: `space-between` places the first and last items at the very ends of the container and distributes the remaining space evenly between the items. `space-around` puts equal space *around* each item, meaning the space at the ends is half the space between items. `space-evenly` ensures the spacing between any two items, and the spacing before the first and after the last item, are all identical. Choosing the right `justifyContent` value is key to achieving desired spacing and alignment along the primary flow direction.

</details></blockquote>

---

## `alignItems`: Alignment along Cross Axis

Aligns flex items along the **cross axis**.

*   `stretch` (Default): Stretch items to fill the container's cross axis dimension. (Requires items to have no fixed dimension on the cross axis).
*   `flex-start`: Align items to the start of the cross axis.
*   `flex-end`: Align items to the end of the cross axis.
*   `center`: Align items to the center of the cross axis.
*   `baseline`: Align items based on their text baseline (relevant for `row` direction with text).

> Think: How should items line up perpendicular to the `flexDirection`?

<blockquote><details>

While `justifyContent` works along the main axis, `alignItems` controls the alignment of items along the *cross axis* (the axis perpendicular to `flexDirection`). The default value, `stretch`, makes flex items expand to fill the height of the container if `flexDirection` is `row`, or the width if `flexDirection` is `column`, provided the items don't have a fixed dimension specified for that axis (e.g., no `height` set for items in a `row` container). `flex-start` aligns items to the beginning of the cross axis (top for `row`, left for `column`). `flex-end` aligns them to the end. `center` places them in the middle of the cross axis. `baseline` is useful primarily in `row` layouts containing text elements, aligning them so their text baselines match up. Understanding `alignItems` is crucial for controlling how items are positioned perpendicular to the main flow.

</details></blockquote>

---

## Example: Medication Card Header (`row`)

Arranging an icon, title, and status badge horizontally using `flexDirection: 'row'`.

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MedicationStatusBadge from './MedicationStatusBadge'; // Assuming previous example
// Assume an Icon component exists, e.g., from react-native-vector-icons
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Header for a medication card with icon, title, and status.
 * @returns {JSX.Element} A styled View using Flexbox row layout.
 */
const MedicationCardHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* <Icon name="pill" size={24} color="#555" style={styles.icon} /> */}
      <View style={styles.iconPlaceholder} /> {/* Placeholder for Icon */}
      <Text style={styles.title}>Lisinopril 10mg</Text>
      <MedicationStatusBadge status="active" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically centered in the row
    justifyContent: 'space-between', // Space out items: Icon/Title on left, Badge on right
    marginBottom: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconPlaceholder: { // Placeholder style
      width: 24,
      height: 24,
      backgroundColor: '#ccc',
      borderRadius: 12,
      marginRight: 8,
  },
  // icon: { // Style if using a real icon component
  //   marginRight: 8,
  // },
  title: {
    flex: 1, // Allow title to take up remaining space
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8, // Add space before the badge
  },
  // MedicationStatusBadge styles assumed to be imported or defined elsewhere
});

export default MedicationCardHeader;
```

<blockquote><details>

This example demonstrates a common horizontal layout using `flexDirection: 'row'`. The `headerContainer` View acts as the flex container. `flexDirection: 'row'` places the children (Icon placeholder, Text title, Status Badge) side-by-side. `alignItems: 'center'` vertically centers these items within the row. `justifyContent: 'space-between'` pushes the first item (Icon/Title group) to the left and the last item (Badge) to the right, distributing the extra horizontal space between them. Notice the `title` Text component has `flex: 1`. This is a crucial Flexbox property for flex *items* (covered next) which allows the title to expand and occupy any available space in the row after the icon and badge have taken theirs. This prevents the title from being truncated unnecessarily and pushes the badge to the far right effectively when combined with `space-between`. We also added `marginRight` to the icon and title for spacing.

</details></blockquote>

---

## `flex`: Sizing Flex Items

The `flex` property is applied to **flex items** (children) to control how they grow or shrink along the main axis.

*   `flex: <number>`: Defines how much the item should grow relative to others.
    *   `flex: 1` means the item takes up all available space.
    *   If multiple items have `flex: 1`, they share the space equally.
    *   If ItemA has `flex: 2` and ItemB has `flex: 1`, ItemA takes 2/3 of the available space, ItemB takes 1/3.
*   `flex: 0`: Item sizes based on its content or explicit `width`/`height`. Does not grow. (Default if not specified).
*   `flex: -1`: Item sizes based on content, but can shrink if needed (less common).

> `flex: 1` on a single child is very common to make it fill the remaining space in a container.

<blockquote><details>

While `flexDirection`, `justifyContent`, and `alignItems` are set on the container, the `flex` property is set on the *items* themselves. It determines how items resize (specifically, grow or shrink) to fill the available space along the container's main axis. A positive number (`flex: 1`, `flex: 2`, etc.) makes the item "flexible". If a container has extra space along its main axis, that space is distributed among its flexible children according to their `flex` values. An item with `flex: 1` will grow to fill the available space. If multiple items have positive `flex` values, the space is divided proportionally. For example, if View A has `flex: 1` and View B has `flex: 3` inside a row container, View B will try to be three times wider than View A within the available space. The default value is effectively `flex: 0`, meaning the item sizes itself based on its content or styled dimensions (`width`/`height`) and doesn't grow to fill space. Using `flex: 1` is extremely common for creating components that expand to fill screen areas or remaining space within a layout.

</details></blockquote>

--

### Example: Flexible Content Area

Creating a layout with a fixed header/footer and a flexible content area in between using `flex: 1`.

```typescript
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * Demonstrates a layout with fixed header/footer and flexible content area.
 * @returns {JSX.Element} A screen layout using flex: 1.
 */
const FlexibleLayoutScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medication List</Text>
      </View>

      {/* The ScrollView takes up the remaining space */}
      <ScrollView style={styles.contentArea}>
        <Text style={styles.contentText}>Item 1...</Text>
        <Text style={styles.contentText}>Item 2...</Text>
        <Text style={styles.contentText}>Item 3...</Text>
        {/* ... more items ... */}
        <Text style={styles.contentText}>Last Item...</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Pharmacy App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // Make the main container fill the entire screen
    flexDirection: 'column', // Default, but explicit here
  },
  header: {
    height: 60, // Fixed height
    backgroundColor: '#A1C4FD', // Light blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1, // THIS makes the ScrollView take all available vertical space
    backgroundColor: '#f0f0f0',
  },
  contentText: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  footer: {
    height: 40, // Fixed height
    backgroundColor: '#B3E5FC', // Lighter blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 12,
  },
});

export default FlexibleLayoutScreen;
```

<blockquote><details>

This example showcases a very common mobile layout pattern: a fixed header, a fixed footer, and a content area that fills the space in between. The `screenContainer` View has `flex: 1` to ensure it fills the entire screen height and `flexDirection: 'column'` to stack its children vertically. The `header` and `footer` Views have fixed `height` values. The crucial part is the `ScrollView` (acting as the content area) which has `style={styles.contentArea}` containing `flex: 1`. Because the `screenContainer` is a flex container (`column` direction) and the `ScrollView` is the only child with a positive `flex` value, it automatically expands vertically to occupy all the space remaining after the fixed-height header and footer have been laid out. This ensures the content area adapts correctly regardless of screen height, and if the content within the `ScrollView` overflows, it becomes scrollable as expected. This use of `flex: 1` is fundamental for creating adaptive layouts.

</details></blockquote>

---

## `alignSelf`: Overriding `alignItems` for an Item

Allows a single flex item to override the `alignItems` value set by its parent container.

*   Applied to the **flex item**'s style.
*   Accepts the same values as `alignItems` (`auto`, `flex-start`, `flex-end`, `center`, `stretch`, `baseline`).
*   `auto` (Default): Inherits the `alignItems` value from the parent.

```typescript
// Example: Center most items, but align one to the end
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically by default
    height: 100,
    borderWidth: 1,
  },
  item: { /* Default item style */ },
  specialItem: {
    alignSelf: 'flex-end', // Align this specific item to the bottom
  },
});
```

> Useful for making specific items break the general alignment rule set by the container.

<blockquote><details>

While `alignItems` on the container sets a default cross-axis alignment for all its children, `alignSelf` provides a way for an individual child item to specify its own alignment, overriding the parent's `alignItems` rule just for itself. It accepts the same values as `alignItems` (`flex-start`, `flex-end`, `center`, `stretch`, `baseline`) plus `auto`. The default value `auto` simply makes the item respect the `alignItems` value of its parent container. By setting `alignSelf` to something else (e.g., `flex-start`, `flex-end`, `center`), you can position a specific item differently from its siblings along the cross axis. For instance, in a row container where `alignItems` is `center` (vertically centering all items), you could apply `alignSelf: 'flex-start'` to one specific item to force it to the top of the row, while the others remain centered. This offers fine-grained control over individual item positioning within the flex layout.

</details></blockquote>

---

## Summary: Flexbox Layout

*   📐 **Flexbox** is React Native's layout engine. Default `flexDirection` is `column`.
*   🔩 **Container Properties:**
    *   `flexDirection`: Sets the main axis (`column`, `row`).
    *   `justifyContent`: Aligns items along the main axis (`flex-start`, `center`, `space-between`, etc.).
    *   `alignItems`: Aligns items along the cross axis (`stretch`, `center`, `flex-start`, etc.).
*   🧸 **Item Properties:**
    *   `flex`: Controls how items grow/shrink along the main axis (`flex: 1` fills space).
    *   `alignSelf`: Overrides container's `alignItems` for a specific item.
*   ↔️ Main/Cross axes swap based on `flexDirection`.

> Combine these properties to build flexible and responsive UIs. Practice visualizing the axes! [Flexbox Froggy](https://flexboxfroggy.com/) is a great game to practice (uses web defaults, remember RN defaults to `column`).

<blockquote><details>

This section introduced Flexbox as the layout mechanism in React Native. We covered the core concepts of flex containers and items, and the importance of the main and cross axes determined by `flexDirection` (which defaults to `column`). We explored the key container properties: `flexDirection` itself, `justifyContent` for main-axis alignment/distribution, and `alignItems` for cross-axis alignment. We also looked at properties applied to flex items: `flex` for controlling flexible sizing along the main axis (with `flex: 1` being crucial for filling available space), and `alignSelf` for allowing individual items to override the container's `alignItems` setting. By combining these properties thoughtfully, you can create complex, adaptive, and responsive layouts that work well across various screen sizes and orientations. Remember the key difference from web CSS Flexbox: the default `flexDirection` is `column`.

</details></blockquote>
