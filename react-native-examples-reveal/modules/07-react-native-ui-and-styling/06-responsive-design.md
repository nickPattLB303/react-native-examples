# 06: Responsive Design ↔️

Responsive design in React Native involves creating layouts and UIs that adapt gracefully to different screen sizes, orientations (portrait/landscape), and aspect ratios. Unlike the web, which deals with a vast range of browser window sizes, React Native primarily targets phone and tablet screen dimensions.

*   **Leverage Flexbox:** Use `flex` properties for fluid layouts.
*   **Percentage Dimensions:** Use percentage strings (`'50%'`) for relative sizing.
*   **`Dimensions` API:** Get screen/window width and height dynamically.
*   **Orientation Changes:** Detect and adapt to portrait/landscape modes.
*   **Platform Differences:** Consider tablet vs. phone layouts.

> Building responsive UIs ensures a consistent and usable experience across the diverse range of mobile devices.

<div class="react-dev">⚛ **React Devs:** Similar concepts to responsive web design (media queries, fluid layouts), but using React Native's specific tools like Flexbox, Dimensions API, and percentage units instead of CSS media queries.</div>
<div class="angular-dev">🅰 **Angular Devs:** Analogous to using CSS grid/flexbox, percentage units, and potentially libraries like Flex-Layout or CDK BreakpointObserver, but within the React Native ecosystem.</div>
<div class="android-dev">🤖 **Android Devs:** Corresponds to using `ConstraintLayout`, `LinearLayout` weights, `match_parent`, resource qualifiers (`sw600dp`, `layout-land`), and dimension resources (`dimens.xml`) to create adaptive layouts.</div>
<div class="ios-dev">🍏 **iOS Devs:** Similar to using Auto Layout constraints, Size Classes, `UIStackView`, and handling orientation changes to adapt layouts for different iPhones and iPads.</div>

<blockquote><details>

Ensuring your React Native application looks and functions well on various devices is crucial for reaching a wide audience. Mobile devices come in many shapes and sizes, from small phones to large tablets, and users can switch between portrait and landscape orientations. Responsive design techniques allow your UI to adapt dynamically. Flexbox, covered earlier, is the cornerstone, enabling components to grow, shrink, and reflow naturally. Using percentage dimensions allows elements to size themselves relative to their parent container. For more explicit control based on screen size, React Native provides the `Dimensions` API to get the current screen or window dimensions in density-independent pixels (dp). Handling orientation changes is also key, as layouts might need significant adjustments between portrait and landscape modes. Finally, designing distinct layouts for phones versus tablets often requires combining these techniques.

</details></blockquote>

---

## Flexbox for Fluidity

Flexbox is inherently designed for creating flexible layouts.

*   `flex: 1` allows components to expand and fill available space.
*   `flexWrap: 'wrap'` allows items in a `row` or `column` to wrap onto the next line if they don't fit.
*   Combining `flexDirection`, `justifyContent`, and `alignItems` helps distribute components adaptively.

```typescript
import styled from 'styled-components/native';

// Container where items wrap
const WrappingContainer = styled.View`
  flex-direction: row; /* Arrange items horizontally */
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: center; /* Center items horizontally */
  padding: 10px;
`;

// Items within the container
const PillTag = styled.Text`
  background-color: #e0e0e0;
  color: #333;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 4px; /* Spacing between tags */
  font-size: 14px;
`;

// Usage: Displaying medication side effects as wrapping tags
const SideEffectTags = ({ effects }: { effects: string[] }) => (
  <WrappingContainer>
    {effects.map((effect) => (
      <PillTag key={effect}>{effect}</PillTag>
    ))}
  </WrappingContainer>
);

// Example Usage:
// <SideEffectTags effects={['Drowsiness', 'Headache', 'Nausea', 'Dry Mouth', 'Dizziness']} />
```

> Use `flexWrap: 'wrap'` when you have a variable number of items that should flow nicely within the available width.

<blockquote><details>

Flexbox is your primary tool for building responsive layouts without explicitly querying screen dimensions. Properties like `flex: 1` are fundamental for creating sections that grow to fill remaining space, naturally adapting to different screen heights or widths. The `flexWrap: 'wrap'` property is particularly useful for responsiveness. When applied to a flex container (usually one with `flexDirection: 'row'`), it allows child items that would normally overflow the container's width to wrap onto subsequent lines. This is perfect for displaying lists of tags, chips, or small cards that should arrange themselves neatly regardless of the screen width. The example shows a `WrappingContainer` using `flexDirection: 'row'` and `flexWrap: 'wrap'` to display medication side effect tags (`PillTag`). On narrower screens, fewer tags will fit per line, and they will wrap automatically. This creates a fluid layout without needing complex calculations.

</details></blockquote>

---

## Percentage Dimensions

Specify `width` or `height` as percentage strings relative to the parent container.

*   Example: `width: '50%'` makes the component take up half of its parent's width.
*   Useful for creating columns or sections that maintain relative proportions.
*   Combine with `minWidth`, `maxWidth`, `minHeight`, `maxHeight` for constraints.

```typescript
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row; /* Side-by-side layout */
  width: 100%; /* Ensure container takes full width */
  padding: 10px;
`;

const LeftColumn = styled.View`
  width: 60%; /* Takes 60% of the container width */
  padding-right: 10px; /* Space between columns */
  background-color: #f0f8ff; /* AliceBlue */
`;

const RightColumn = styled.View`
  width: 40%; /* Takes 40% of the container width */
  background-color: #f5f5dc; /* Beige */
`;

const ColumnText = styled.Text`
  padding: 15px;
  font-size: 16px;
`;

// Usage: Two-column layout for medication details
const TwoColumnLayout = () => (
  <Container>
    <LeftColumn>
      <ColumnText>Main Details (60%)... Dosage, Instructions, etc.</ColumnText>
    </LeftColumn>
    <RightColumn>
      <ColumnText>Side Info (40%)... Image, Refills, etc.</ColumnText>
    </RightColumn>
  </Container>
);
```

> Percentages are relative to the parent. Ensure the parent has a defined size or is flexible (`flex: 1`) for percentages to work predictably.

<blockquote><details>

Using percentage values for `width` and `height` provides another way to create layouts that adapt to different screen sizes. When you set `width: '50%'` on a component, its width will be calculated as half of its parent container's width. This allows you to define proportional relationships between sibling components, like creating a two-column layout where one column always takes 60% of the width and the other takes 40%, regardless of the actual screen width. This technique is effective for maintaining relative visual balance across devices. However, it's crucial that the parent container has a defined width for percentage widths to work correctly (e.g., the parent itself has `width: '100%'` or is part of a flex layout where its size is determined). You can also combine percentages with `minWidth`/`maxWidth` to prevent elements from becoming too small or too large on extreme screen sizes.

</details></blockquote>

---

## `Dimensions` API

Provides access to the device's screen and window dimensions.

*   `Dimensions.get('window')`: Gets the dimensions of the application window (excludes status bar on iOS, includes software navigation bar on Android sometimes). Generally preferred for layout calculations.
*   `Dimensions.get('screen')`: Gets the physical screen dimensions.
*   Returns an object: `{ width: number, height: number, scale: number, fontScale: number }`.
*   `width` and `height` are in dp.

**Note:** Values from `Dimensions.get()` **do not update automatically** on orientation change or window resize (e.g., split-screen on tablets). Use event listeners or hooks for dynamic updates.

```typescript
import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log(`Window Width: ${windowWidth}dp, Height: ${windowHeight}dp`);

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8, // 80% of window width
    height: windowHeight / 2, // 50% of window height
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'lightblue',
  },
  // Example: Conditional styling based on width
  title: {
    fontSize: windowWidth > 400 ? 24 : 18, // Larger font on wider screens
  },
});
```

> Use `Dimensions` for initial layout or when styles depend directly on screen size, but be aware of its static nature.

<blockquote><details>

When Flexbox and percentages aren't sufficient, or you need explicit knowledge of the screen size (e.g., to calculate image sizes, determine breakpoints for different layouts), the `Dimensions` API is the tool to use. You import it from `react-native`. Calling `Dimensions.get('window')` returns the available width and height for your application's layout in density-independent pixels (dp). `Dimensions.get('screen')` provides the total physical screen dimensions, which might differ slightly. For layout purposes, `'window'` is usually more relevant. The returned object also includes `scale` (pixel density) and `fontScale` (user's preferred font size multiplier). A critical point is that `Dimensions.get()` provides a snapshot of the dimensions *at the time it's called*. It does **not** automatically update if the user rotates the device or if the window size changes (like in tablet split-screen modes). Therefore, it's best used for initial setup or calculations that don't need to react instantly to dimension changes. For dynamic updates, you need hooks or event listeners, discussed next.

</details></blockquote>

---

## Handling Dynamic Updates & Orientation

Since `Dimensions.get()` is static, use hooks or event listeners for responsive updates.

*   **`useWindowDimensions` Hook (Recommended):**
    *   Provides `width`, `height`, `scale`, `fontScale`.
    *   Automatically updates when dimensions or orientation change.
    *   Must be used within a React component body.

*   **`Dimensions` Event Listener (Less common now):**
    *   `Dimensions.addEventListener('change', handler)`
    *   Requires manual setup and cleanup of listeners.

```typescript
import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';

/**
 * A component that adapts its layout based on window dimensions using the hook.
 * @returns {JSX.Element} A View with adaptive styles.
 */
const AdaptiveComponent = () => {
  // Hook provides dimensions and updates automatically
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const containerStyle = {
    width: width * 0.9, // 90% of current width
    marginTop: 20,
    padding: 15,
    backgroundColor: isLandscape ? 'lightcoral' : 'lightskyblue',
    alignSelf: 'center',
  };

  const textStyle = {
    fontSize: width > 500 ? 20 : 16, // Adjust font size based on width
    textAlign: 'center',
    color: 'white',
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {isLandscape ? 'Landscape Mode' : 'Portrait Mode'} (Width: {width.toFixed(0)}dp)
      </Text>
      {/* Conditionally render different layouts */}
      {isLandscape ? <LandscapeLayout /> : <PortraitLayout />}
    </View>
  );
};

// Placeholder layouts for demonstration
const LandscapeLayout = () => <Text style={styles.layoutText}>Landscape Specific Layout</Text>;
const PortraitLayout = () => <Text style={styles.layoutText}>Portrait Specific Layout</Text>;

const styles = StyleSheet.create({
    layoutText: { marginTop: 10, textAlign: 'center', fontStyle: 'italic' }
})

export default AdaptiveComponent;
```

> The `useWindowDimensions` hook is the modern and preferred way to get dimensions that automatically update on changes.

<blockquote><details>

The static nature of `Dimensions.get()` makes it unsuitable for layouts that need to react immediately to orientation changes or window resizing. React Native provides the `useWindowDimensions` hook specifically for this purpose. When used inside a functional component, this hook returns the same dimension object (`{ width, height, scale, fontScale }`) but automatically triggers a re-render of your component whenever these values change. This makes it easy to create truly dynamic layouts. In the `AdaptiveComponent` example, we get `width` and `height` from the hook. We then calculate `isLandscape` and use these values directly in inline style objects (`containerStyle`, `textStyle`) or conditional rendering logic. When the user rotates the device, the hook provides the new dimensions, the component re-renders, and the styles/layout update accordingly (e.g., background color changes, different child components like `LandscapeLayout` or `PortraitLayout` are rendered). This hook significantly simplifies handling dynamic dimension changes compared to the older `Dimensions.addEventListener` approach, which required manual listener management.

</details></blockquote>

---

## Strategies for Different Screen Sizes (Phone vs. Tablet)

*   **Breakpoints:** Define width/height thresholds to switch layouts or styles (e.g., using `useWindowDimensions`).
*   **Conditional Rendering:** Render different components or component structures based on size/orientation.
*   **Adjust Spacing/Typography:** Increase padding, margins, and font sizes on larger screens.
*   **Platform & Size:** Combine `Platform.OS` with dimension checks for specific cases (e.g., iPad layout).

```typescript
import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';

const TABLET_BREAKPOINT = 768; // Example breakpoint width in dp

const ResponsiveScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  return (
    <View style={[styles.container, isTablet && styles.containerTablet]}>
      <Text style={[styles.title, isTablet && styles.titleTablet]}>
        {isTablet ? 'Tablet Medication View' : 'Phone Medication View'}
      </Text>

      {/* Example: Render a different layout structure for tablets */}
      {isTablet ? (
        <TabletMedicationLayout />
      ) : (
        <PhoneMedicationLayout />
      )}
    </View>
  );
};

// Placeholder layouts
const PhoneMedicationLayout = () => <Text>List View...</Text>;
const TabletMedicationLayout = () => <Text>Grid View or Master-Detail View...</Text>;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  containerTablet: { padding: 20 }, // More padding on tablets
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  titleTablet: { fontSize: 28, marginBottom: 20 }, // Larger title on tablets
});

export default ResponsiveScreen;
```

> Designing distinct experiences for phones and tablets often involves defining breakpoints and conditionally applying styles or rendering different component trees.

<blockquote><details>

While phones are the primary target for many React Native apps, supporting tablets effectively often requires more than just scaling up the phone UI. Tablet screens offer significantly more real estate, enabling richer layouts like multi-column views, master-detail interfaces, or grids instead of simple lists. A common strategy is to define breakpoints – specific width or height values (like `TABLET_BREAKPOINT = 768dp`) that trigger layout changes. Using the `useWindowDimensions` hook, you can check if the current width exceeds a breakpoint. Based on this check (`isTablet` in the example), you can conditionally apply different styles (e.g., increased padding and font sizes using array styles like `[styles.title, isTablet && styles.titleTablet]`) or even render entirely different component structures (`TabletMedicationLayout` vs. `PhoneMedicationLayout`). This allows you to tailor the user experience significantly, making better use of the available space on larger devices while keeping the UI optimized for smaller phone screens.

</details></blockquote>

---

## Summary: Responsive Design

*   ↔️ **Goal:** Adapt UI to various screen sizes and orientations.
*   💪 **Flexbox:** Use `flex` and `flexWrap` for fluid layouts.
*   ⚖️ **Percentages:** Use `width: '%'` for proportional sizing relative to parent.
*   📏 **`Dimensions` API:** Get static screen/window dimensions (`Dimensions.get('window')`).
*   🎣 **`useWindowDimensions` Hook:** Get dimensions that **update automatically** on changes (Recommended).
*   🔄 **Orientation:** Detect landscape/portrait using `width` and `height` from the hook.
*   📱 **Breakpoints:** Define thresholds (e.g., `width > 768`) to switch layouts/styles for different device classes (phone/tablet).
*   ✨ **Combine Techniques:** Use Flexbox, percentages, dimension checks, and conditional rendering together.

> Employ these techniques to create React Native applications that provide a great user experience on any device.

<blockquote><details>

This section explored essential techniques for building responsive user interfaces in React Native. We emphasized the foundational role of Flexbox (`flex`, `flexWrap`) in creating fluid layouts that naturally adapt. Percentage dimensions were introduced as a way to maintain proportional sizing relative to parent containers. We covered the `Dimensions` API for getting screen/window size information, highlighting its static nature, and strongly recommended using the `useWindowDimensions` hook for obtaining dimensions that update dynamically upon screen size or orientation changes. Strategies for handling different device classes, like phones versus tablets, involve defining breakpoints based on dimensions and using conditional styling or rendering to optimize the layout for the available space. By combining these approaches – fluid Flexbox layouts, relative sizing with percentages, dynamic dimension awareness via hooks, and conditional logic based on breakpoints – you can build robust and user-friendly applications that adapt effectively across the diverse landscape of mobile devices.

</details></blockquote> 