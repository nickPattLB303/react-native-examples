## Section 4: Layout with Flexbox (Comprehensive Guide)

Layout is a fundamental aspect of UI design, determining how components are arranged and sized on the screen. React Native uses Flexbox, a powerful and flexible layout module, to achieve this. This comprehensive guide will cover Flexbox concepts, its core properties, and how you can use them to build sophisticated and responsive layouts for your SpeedyMeds application.

### What is Flexbox?

Flexbox is a one-dimensional layout model designed to provide a more efficient way to arrange, align, and distribute space among items in a container, even when their size is unknown or dynamic. In React Native, Flexbox works similarly to how it does on the web (CSS Flexbox), but with some differences in default values and property names.

**Core Concepts:**

- **Flex Container:** Any `<View>` component can become a flex container by setting its `display` style property to `'flex'`. In React Native, `display: 'flex'` is the default for all `<View>` components, so you don't usually need to set it explicitly.
- **Flex Items:** Direct children of a flex container are called flex items.
- **Main Axis:** The primary axis along which flex items are laid out. This is determined by the `flexDirection` property. If `flexDirection` is `'row'`, the main axis is horizontal. If it's `'column'`, the main axis is vertical.
- **Cross Axis:** The axis perpendicular to the main axis. If the main axis is horizontal, the cross axis is vertical, and vice versa.

> 🌐 **(Web Developers): Key Differences: React Native Flexbox vs. Web CSS Flexbox**
>
> **Comparison:** While the core concepts of Flexbox (containers, items, main/cross axes) are identical to CSS Flexbox, React Native's implementation has some crucial differences, primarily in default values. Understanding these is key to translating your web layout skills effectively.
>
> | Property        | React Native Default/Behavior                               | Web CSS Default/Behavior                               | Key Difference Explanation                                                                                                                                                         |
> | --------------- | ----------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `flexDirection` | `'column'`                                                  | `'row'`                                                | React Native defaults to a vertical layout for items, aligning with common mobile portrait orientations. You must explicitly set `flexDirection: 'row'` for horizontal layouts.    |
> | `alignContent`  | `'flex-start'` (for multi-line wrapped content)             | `'stretch'`                                            | Affects alignment of multiple wrapped lines. In React Native, lines are packed to the start by default, whereas on the web, they stretch.                                          |
> | `flexShrink`    | `0` for column layout children, `1` for row layout children | `1`                                                    | React Native items in a default column layout _do not shrink_ by default. For row layouts, they _do_ shrink. Explicit `flexShrink: 1` (or `0`) may be needed.                      |
> | `flex`          | Single non-negative number (primarily sets `flexGrow`)      | Shorthand for `flex-grow`, `flex-shrink`, `flex-basis` | React Native's `flex` prop is simplified. `flex: N` sets `flexGrow: N`, `flexShrink: 1`, `flexBasis: '0%'`. Use `flexGrow`, `flexShrink`, `flexBasis` explicitly for more control. |
> | `display`       | Not applicable (`<View>` is implicitly `display: flex`)     | Requires `display: flex` or `inline-flex`              | Flexbox is automatically enabled on `<View>` components; no need to declare `display: 'flex'`.                                                                                     |
> | Property Names  | camelCased (e.g., `alignItems`)                             | kebab-cased (e.g., `align-items`)                      | Standard JavaScript convention for property naming.                                                                                                                                |
>
> **Key Takeaway:** Your CSS Flexbox knowledge is highly transferable. However, you MUST be mindful of React Native's default `flexDirection: 'column'`, the nuanced `flexShrink` defaults, the behavior of the `flex` shorthand, and camelCased property names to avoid common layout frustrations.

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

**6. `gap`, `rowGap`, `columnGap`**

These properties define the size of gutters (gaps) between flex items, simplifying spacing without relying solely on margins for each item. This is a more recent addition and aligns with the CSS gap property for Flexbox.

- `gap: <number>`: Sets both `rowGap` and `columnGap` to the same value.
- `rowGap: <number>`: Specifies the gap between rows when items wrap in a multi-row container.
- `columnGap: <number>`: Specifies the gap between columns.

```tsx
// SpeedyMeds: Displaying medication reminder chips with gaps
const styles = StyleSheet.create({
  remindersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10, // Uniform gap of 10 DIPs between rows and columns
    // Alternatively, for different gaps:
    // rowGap: 15,
    // columnGap: 5,
    marginTop: 10,
  },
  reminderChip: {
    backgroundColor: "#e7f3ff",
    padding: 8,
    borderRadius: 16,
    // No need for individual margins if using gap
  },
  chipText: {
    color: "#005fcc",
  },
});

// <View style={styles.remindersContainer}>
//   <View style={styles.reminderChip}><Text style={styles.chipText}>Morning Dose</Text></View>
//   <View style={styles.reminderChip}><Text style={styles.chipText}>After Lunch</Text></View>
//   <View style={styles.reminderChip}><Text style={styles.chipText}>Evening Dose</Text></View>
//   <View style={styles.reminderChip}><Text style={styles.chipText}>Bedtime</Text></View>
// </View>
```

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

Dictates how much an item will shrink relative to other items if there isn't enough space along the main axis.

- `flexShrink: <number>`: The default value is `0` for `<View>` components when their parent has `flexDirection: 'column'` (which is the default `flexDirection` for a `View`). However, if the parent `View` has `flexDirection: 'row'`, the default `flexShrink` for child `View` components becomes `1`.
- A value of `0` means the item will not shrink, even if it overflows the container. It will maintain its `flexBasis` or its computed `width`/`height`.
- A positive value allows the item to shrink. The amount it shrinks is proportional to this value relative to other items that can also shrink.

> [!NOTE]
> This default behavior (`0` for column layout children, `1` for row layout children) is important. If you have items in a row that you don't want to shrink, you might need to explicitly set `flexShrink: 0` on them if they are overflowing.

**4. `flexBasis`**

Defines the default size of an item before remaining space is distributed. It can be a percentage or an absolute value.

- `flexBasis: <string | number>` (e.g., `'50%'`, `100`).

> [!NOTE]
> In React Native, `flex: <positive_number>` is the most common way to make an item grow and fill space. It essentially sets `flexGrow` to that number, `flexShrink` to `1` (making it shrinkable by default when `flex` is positive), and `flexBasis` to `'0%'` (note: not `0` as an absolute number, but effectively starting from zero basis before growing).

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

/**
 * Props for the PrescriptionCard component.
 * @param name - The name of the medication.
 * @param strength - The strength or dosage of the medication (e.g., "10mg").
 * @param instructionsText - The instructions for taking the medication.
 */
interface PrescriptionCardProps {
  name: string;
  strength: string;
  instructionsText: string;
}

/**
 * A component that displays prescription details in a card format.
 * This component demonstrates a complex layout using various Flexbox properties
 * to arrange medication information, dosage, instructions, and a refill action.
 * @param {PrescriptionCardProps} props - The props for the component.
 * @returns {React.ReactElement} The PrescriptionCard component.
 */
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

### Under the Hood: The Yoga Layout Engine

It's beneficial to understand that React Native doesn't implement the Flexbox algorithm directly in JavaScript or within its native view systems (like UIKit for iOS or Android UI toolkit). Instead, it relies on **Yoga**, an open-source, cross-platform layout engine developed by Meta.

```mermaid
graph LR
    subgraph "JavaScript Realm"
        direction TB
        A[React Component Tree with Flexbox Styles] --> B{JSX / StyleSheet};
        B --> C[React Native Core Logic];
    end

    C -- Layout Information (Flexbox Props) --> D[Yoga Layout Engine (C++)];

    subgraph "Native Realm"
        direction TB
        D -- Computed Layout (x, y, width, height) --> E[Native UI Views (UIView, android.view.View)];
        E --> F[Screen Display];
    end

    subgraph "Yoga's Role"
        direction TB
        Y1[Receives Flexbox Styles from JS]
        Y2[Builds Internal Layout Tree]
        Y3[Calculates Node Positions & Sizes]
        Y4[Returns Results to Native Renderer]
        Y1 --> Y2 --> Y3 --> Y4
    end

    D -.-> Y1;

    classDef jsRealm fill:#D6EAF8,stroke:#2E86C1,stroke-width:2px;
    classDef nativeRealm fill:#D5F5E3,stroke:#28B463,stroke-width:2px;
    classDef yogaEngine fill:#FCF3CF,stroke:#F1C40F,stroke-width:2px;

    class A,B,C jsRealm;
    class D,Y1,Y2,Y3,Y4 yogaEngine;
    class E,F nativeRealm;
```

**Diagram Explanation: React Native Layout with Yoga**

- **JavaScript Realm**: Your React Native components define Flexbox styles using JavaScript (via `StyleSheet` or inline styles).
- **Yoga Layout Engine (C++)**: This is where the core layout computation happens. React Native passes the layout-related style properties from your JavaScript components to Yoga.
- **Native Realm**: Yoga returns the calculated positions and sizes for each element to the native platform, which then renders the actual native UI views on the screen.

**Yoga's Key Functions:**

1.  **Cross-Platform Consistency**: Yoga is written in C++ and has bindings for various platforms. This ensures that the Flexbox styles you write in JavaScript produce consistent visual results on both iOS (which uses AutoLayout or frames natively) and Android (which has its own layout systems). This fulfills a core promise of React Native: write once, render consistently.
2.  **Performance**: Being implemented in C++, Yoga is highly optimized for performance and has a small binary size, making it suitable for resource-constrained mobile devices. It performs the complex Flexbox calculations efficiently off the main JavaScript thread (though the coordination happens via the bridge/JSI).
3.  **Abstraction**: Yoga acts as an abstraction layer. Instead of React Native needing to implement Flexbox logic natively for each platform, it delegates this task to Yoga. This simplifies React Native's core and makes layout behavior more predictable.

**The Layout Process (Conceptual):**

The process of layout involving Yoga generally follows these phases:

1.  **Render Phase (JS):** React creates a tree of elements in JavaScript. In the New Architecture (Fabric), this corresponds to a "React Shadow Tree" created in C++ which holds the layout information.
2.  **Commit Phase (Layout Calculation with Yoga):**
    - During the commit phase, when the layout needs to be determined, React Native passes the layout-related styles (like `flexDirection`, `alignItems`, `width`, `padding`, etc.) from the Shadow Tree nodes (or legacy UI manager) to Yoga.
    - Yoga constructs its own internal layout tree based on these styles and the parent-child relationships.
    - It then performs the Flexbox calculations. For certain elements like `<Text>`, Yoga might need to call back to the host platform (iOS/Android) to accurately measure the content (e.g., how much space a piece of text will occupy with a given font size).
3.  **Mount Phase (Native Rendering):**
    - Yoga returns the computed layout (x, y coordinates, width, height) for each node back to the React Native renderer (Fabric in the New Architecture).
    - The renderer then uses this information to position and size the actual native views (`UIView` on iOS, `android.view.View` on Android) on the screen.

By using Yoga, React Native ensures that your Flexbox-based layouts are performant and consistent across platforms, without you needing to worry about the native layout intricacies of iOS or Android directly.

In the next section, we'll explore another powerful styling technique: Styled Components.

📚 **Official Documentation:**

- [React Native Docs: Layout with Flexbox](https://reactnative.dev/docs/flexbox)
- [React Native Docs: Height and Width](https://reactnative.dev/docs/height-and-width) (Related to sizing items within Flexbox)
- [A Complete Guide to Flexbox (CSS-Tricks)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) (Excellent resource for general Flexbox concepts, highly transferable)

### Next Steps

Mastering Flexbox is key to creating sophisticated layouts in React Native. Having covered `StyleSheet` and Flexbox, we'll now explore another popular approach to styling: CSS-in-JS libraries, specifically Styled Components. Proceed to [Section 5: Introduction to Styled Components](./section-05-introduction-to-styled-components.md).
