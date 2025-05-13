## Section 4: Layout with Flexbox (Comprehensive Guide)

Layout is a fundamental aspect of UI design, determining how components are arranged and sized on the screen. React Native uses Flexbox, a powerful and flexible layout module, to achieve this. This comprehensive guide will cover Flexbox concepts, its core properties, and how you can use them to build sophisticated and responsive layouts for your SpeedyMeds application.

### What is Flexbox?

Flexbox is a one-dimensional layout model designed to provide a more efficient way to arrange, align, and distribute space among items in a container, even when their size is unknown or dynamic. In React Native, Flexbox works similarly to how it does on the web (CSS Flexbox), but with some differences in default values and property names.

**Core Concepts:**

- **Flex Container:** Any `<View>` component can become a flex container by setting its `display` style property to `'flex'`. In React Native, `display: 'flex'` is the default for all `<View>` components, so you don't usually need to set it explicitly.
- **Flex Items:** Direct children of a flex container are called flex items.
- **Main Axis:** The primary axis along which flex items are laid out. This is determined by the `flexDirection` property. If `flexDirection` is `'row'`, the main axis is horizontal. If it's `'column'`, the main axis is vertical.
- **Cross Axis:** The axis perpendicular to the main axis. If the main axis is horizontal, the cross axis is vertical, and vice versa.

> 🌐 **(Web Developers):**
>
> **Comparison:** The concepts of flex containers, flex items, main axis, and cross axis are identical to CSS Flexbox. The main difference in React Native is that `flexDirection` defaults to `'column'` instead of `'row'` (CSS default). Also, property names are camelCased (e.g., `alignItems` instead of `align-items`).
>
> **Key Takeaway:** Your CSS Flexbox knowledge is highly transferable. Just be mindful of the default `flexDirection` and camelCasing.

### Flex Container Properties

These properties are applied to the parent `<View>` (the flex container) to control the layout of its children.

**1. `flexDirection`**

Defines the direction of the main axis. This determines how flex items are placed within the container.

- `'column'` (default): Stacks flex items vertically (top to bottom).
- `'row'`: Arranges flex items horizontally (left to right).
- `'column-reverse'`: Stacks flex items vertically (bottom to top).
- `'row-reverse'`: Arranges flex items horizontally (right to left).

```tsx
// SpeedyMeds: Arranging prescription summary items horizontally
const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row", // Items will be laid out left-to-right
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  // ... other styles
});
```

**2. `justifyContent`**

Aligns flex items along the main axis of the container. This property helps distribute extra space when items don't fill the entire main axis.

- `'flex-start'` (default): Items are packed toward the start of the main axis.
- `'flex-end'`: Items are packed toward the end of the main axis.
- `'center'`: Items are centered along the main axis.
- `'space-between'`: Items are evenly distributed; the first item is at the start, the last at the end, with equal space between them.
- `'space-around'`: Items are evenly distributed with equal space around them (half-size spaces at the ends).
- `'space-evenly'`: Items are distributed so that the spacing between any two items (and the space to the edges) is equal.

```tsx
// SpeedyMeds: Spacing out action buttons in a footer
const styles = StyleSheet.create({
  footerActions: {
    flexDirection: "row",
    justifyContent: "space-around", // Buttons will have space around them
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  // ... other styles
});
```

**3. `alignItems`**

Aligns flex items along the cross axis of the container.

- `'stretch'` (default, if items have no fixed dimension on cross axis): Items are stretched to fill the container's height (for `flexDirection: 'row'`) or width (for `flexDirection: 'column'`).
- `'flex-start'`: Items are aligned to the start of the cross axis.
- `'flex-end'`: Items are aligned to the end of the cross axis.
- `'center'`: Items are centered on the cross axis.
- `'baseline'`: Items are aligned such that their baselines align (relevant for text).

```tsx
// SpeedyMeds: Centering items vertically in a list item
const styles = StyleSheet.create({
  medicationListItem: {
    flexDirection: "row",
    alignItems: "center", // Vertically centers the icon and text
    padding: 10,
  },
  // ... other styles
});
```

**4. `flexWrap`**

Determines whether flex items are forced onto a single line or can wrap onto multiple lines if they exceed the container's space on the main axis.

- `'nowrap'` (default): Items are forced into a single line (may overflow).
- `'wrap'`: Items wrap onto multiple lines if needed, from top to bottom.
- `'wrap-reverse'`: Items wrap onto multiple lines if needed, from bottom to top.

```tsx
// SpeedyMeds: Wrapping a list of tags for a medication
const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Tags will wrap to the next line if they don't fit
    alignItems: "flex-start", // Align wrapped lines to the start
  },
  tag: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    margin: 4,
  },
});
```

**5. `alignContent`**

Aligns wrapped lines within the container when there is extra space on the cross axis. This property only has an effect when `flexWrap` is set to `'wrap'` or `'wrap-reverse'` and there are multiple lines of items.

- `'flex-start'`: Lines are packed to the start of the container.
- `'flex-end'`: Lines are packed to the end of the container.
- `'center'`: Lines are packed to the center of the container.
- `'stretch'` (default): Lines stretch to take up the remaining space.
- `'space-between'`: Lines are evenly distributed; the first line is at the start, the last at the end.
- `'space-around'`: Lines are evenly distributed with equal space around each line.

### Flex Item Properties

These properties are applied to the children (flex items) to control their behavior within the flex container.

**1. `flex`**

This is perhaps the most powerful property. It defines how a flex item will grow or shrink to fit the available space in the container along the main axis. It's a shorthand for `flexGrow`, `flexShrink`, and `flexBasis` (though React Native primarily uses `flex` as a single number for `flexGrow`).

- `flex: <number>`: If positive, the item becomes flexible and will grow proportionally to other flexible items to fill available space. For example, if one item has `flex: 2` and another has `flex: 1`, the first item will take up twice as much space as the second.
- `flex: 0`: The item is not flexible and will be sized based on its `width`/`height` (or content size).
- `flex: -1`: The item is sized based on its `width`/`height` (or content size), but if it's too large for the container, it will shrink to fit. This is not commonly used in React Native; `flexShrink` is preferred for explicit shrinking.

```tsx
// SpeedyMeds: Creating a header with a title that takes available space
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
  },
  backButton: {
    // Takes fixed width
    paddingHorizontal: 10,
  },
  headerTitle: {
    flex: 1, // Title takes up all remaining horizontal space
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    // Takes fixed width
    paddingHorizontal: 10,
  },
});
```

**2. `flexGrow`**

Dictates how much an item will grow relative to other items if there is extra space.

- `flexGrow: <number>` (default is 0). A positive number makes the item flexible.

**3. `flexShrink`**

Dictates how much an item will shrink relative to other items if there isn't enough space.

- `flexShrink: <number>` (default is 1 for items within a `flexDirection: 'row'` container, 0 otherwise in CSS, but React Native behavior can vary slightly, generally items do shrink). A value of 0 prevents shrinking.

**4. `flexBasis`**

Defines the default size of an item before remaining space is distributed. It can be a percentage or an absolute value.

- `flexBasis: <string | number>` (e.g., `'50%'`, `100`).

> [!NOTE]
> In React Native, `flex: <positive_number>` is the most common way to make an item grow and fill space. It essentially sets `flexGrow` to that number and `flexBasis` to 0.

**5. `alignSelf`**

Allows a single flex item to override the `alignItems` value set by the container for its own alignment on the cross axis.

- `'auto'` (default): Inherits the `alignItems` value from the parent.
- `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'`, `'baseline'`: Same behavior as `alignItems` but applied to a single item.

```tsx
// SpeedyMeds: Aligning a single notification badge to the top right of its parent
const styles = StyleSheet.create({
  medicationCard: {
    flexDirection: "row",
    padding: 15,
    // alignItems: 'center', // Other items might be centered
  },
  medicationDetails: {
    flex: 1,
  },
  refillBadge: {
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 10,
    alignSelf: "flex-start", // Overrides parent's alignItems for this badge
    position: "absolute", // Often used with alignSelf for precise positioning
    top: 5,
    right: 5,
  },
});
```

### Diagram: Flexbox Layout Examples

The following diagram illustrates some common Flexbox property effects:

```mermaid
graph TD
    subgraph Container [flexDirection: 'row']
        direction LR
        A[Item 1] --> B[Item 2] --> C[Item 3]
    end

    subgraph ContainerColumn [flexDirection: 'column' (Default)]
        direction TB
        D[Item 1] --> E[Item 2] --> F[Item 3]
    end

    subgraph JustifySpaceBetween [justifyContent: 'space-between']
        direction LR
        G[Start] --> H[...] --> I[End]
        style G fill:#ccf,stroke:#333,stroke-width:2px
        style I fill:#ccf,stroke:#333,stroke-width:2px
        style H fill:#fff,stroke:#ccc,stroke-width:1px,stroke-dasharray: 5 5
    end

    subgraph AlignCenter [alignItems: 'center']
        direction TB
        J((Item A)) --> K((Item B))
        subgraph CrossAxisContainer [Height: 100px]
            direction TB
            L[ ] --Centered on Cross Axis--> M[ ]
            style L fill:none, stroke:none
            style M fill:none, stroke:none
        end
        style J fill:#cfc,stroke:#333,stroke-width:2px,height:30px
        style K fill:#cfc,stroke:#333,stroke-width:2px,height:50px
        note right of K Vertically centered
    end

    subgraph FlexGrowExample [flexDirection: 'row', width: 300px]
        X[Fixed Width: 50px] -- No flex --> Y[flex: 1] -- Takes remaining --> Z[flex: 2]
        style Y fill:#fcc,stroke:#333,stroke-width:2px
        style Z fill:#fcc,stroke:#333,stroke-width:2px
    end
```

**Explanation of the Diagram:**

- **`flexDirection: 'row'`**: Shows items A, B, and C laid out horizontally from left to right.
- **`flexDirection: 'column'`**: Shows items D, E, and F laid out vertically from top to bottom. This is the default in React Native.
- **`justifyContent: 'space-between'`**: Illustrates how items (Start, End) are pushed to the edges of the main axis, with the space (...) distributed between them.
- **`alignItems: 'center'`**: Shows two items (Item A, Item B) of different heights, both centered along the cross axis (vertically in this column-direction container example).
- **`flexGrowExample`**: Demonstrates how `flex: 1` (Y) and `flex: 2` (Z) items share the remaining space after accounting for a fixed-width item (X). Item Z will take twice as much of the available flexible space as item Y.

### Building a Complex Layout: SpeedyMeds Prescription Card

Let's apply these concepts to build a layout for a `PrescriptionCard` component in SpeedyMeds.

```tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Allow name to take available space and wrap if necessary
  },
  dosage: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8, // Space from medication name if they are close
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#007bff", // Example tint color for a pill icon
  },
  instructions: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  bottomRow: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    alignItems: "flex-end", // Align refill button to the right
  },
  refillButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  refillButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

interface PrescriptionCardProps {
  name: string;
  strength: string;
  instructionsText: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  name,
  strength,
  instructionsText,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.topRow}>
        <Text style={styles.medicationName}>{name}</Text>
        <Text style={styles.dosage}>{strength}</Text>
      </View>
      <View style={styles.middleRow}>
        {/* Placeholder for an icon. You'd use <Image source={...} /> */}
        <View style={[styles.icon, { backgroundColor: "#ddd" }]} />
        <Text style={styles.instructions}>{instructionsText}</Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.refillButton}>
          <Text style={styles.refillButtonText}>Request Refill</Text>
        </View>
      </View>
    </View>
  );
};

// Example usage:
// <PrescriptionCard name="Lisinopril" strength="10mg" instructionsText="Take one tablet daily in the morning" />

export default PrescriptionCard;
```

**Explanation of the `PrescriptionCard` Layout:**

- **`cardContainer`**: The main container with padding, margin, and shadow.
- **`topRow`**: Uses `flexDirection: 'row'` and `justifyContent: 'space-between'` to place the medication name on the left and dosage on the right. `alignItems: 'center'` ensures they are vertically centered relative to each other. `medicationName` has `flex: 1` to allow it to grow and wrap if the name is long.
- **`middleRow`**: Also `flexDirection: 'row'` and `alignItems: 'center'` to align an icon (placeholder `View` for now) and the instructions text vertically.
- **`bottomRow`**: Uses `alignItems: 'flex-end'` to push the `refillButton` to the right side of the card.

This example demonstrates how combining various Flexbox properties allows you to create structured and visually appealing component layouts.

### Troubleshooting Flexbox

- **Check `flexDirection`**: This is the most common source of confusion, especially for web developers used to `row` as the default.
- **Parent vs. Child Properties**: Ensure you are applying container properties (`flexDirection`, `justifyContent`, `alignItems`) to the parent `View` and item properties (`flex`, `alignSelf`) to the children.
- **Use Background Colors for Debugging**: Temporarily add background colors to your `View` components to visually understand their boundaries and how Flexbox is affecting them.
- **Inspect Element**: Use the element inspector in React Native Debugger or Flipper to examine computed styles and layout properties.

> [!IMPORTANT]
> Mastering Flexbox is crucial for React Native development. Experiment with these properties in an Expo Snack to solidify your understanding. Small changes can have significant visual impact, so practice is key.

Flexbox is a deep topic, but with these core properties, you can achieve most layouts required in mobile applications. Its power lies in its ability to create responsive designs that adapt to different content sizes and screen dimensions.

### Exercise 10.1: Complex Flexbox Layout

Now it's time to put your Flexbox knowledge to the test. This exercise will challenge you to create a more intricate layout using various Flexbox properties.

**Objective:** Build a screen layout for the SpeedyMeds app that includes a header, a content area with multiple cards arranged in a specific way, and a footer.

**(https://snack.expo.dev/@course-materials/module-10-exercise-10.1)**

_Instructions and requirements for the exercise are provided within the Expo Snack linked above._

In the next section, we'll explore another powerful styling technique: Styled Components.

📚 **Official Documentation:**

- [React Native Docs: Layout with Flexbox](https://reactnative.dev/docs/flexbox)
- [React Native Docs: Height and Width](https://reactnative.dev/docs/height-and-width) (Related to sizing items within Flexbox)
- [A Complete Guide to Flexbox (CSS-Tricks)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) (Excellent resource for general Flexbox concepts, highly transferable)
