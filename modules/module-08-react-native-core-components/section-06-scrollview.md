## Section 6: ScrollView (`<ScrollView>`) - Enabling Scrolling

Often, content in your application will exceed the available screen space. The `<ScrollView>` component is designed to handle this by providing a scrolling container for other components. This section explores how to use `<ScrollView>` to make your UIs scrollable.

### Conceptual Content: Understanding `<ScrollView>`

A `<ScrollView>` is a generic scrolling container that can host multiple components and views. It allows users to scroll vertically or horizontally if the content within it is larger than the `<ScrollView>` itself. It's important to note that `<ScrollView>` renders all its child components at once, which can lead to performance issues if you have a very long list of items. For long, structured lists, `<FlatList>` or `<SectionList>` (covered later) are generally preferred.

**Key Characteristics of `<ScrollView>`:**

- **Scrollable Container:** Its primary purpose is to enable scrolling of its child components.
- **Direction:** Can scroll vertically (default) or horizontally (by setting the `horizontal={true}` prop).
- **Bounded Height (for vertical scroll):** For vertical scrolling to work, the `<ScrollView>` must have a bounded height. This can be achieved by giving it a fixed `height` style, or by ensuring its parent has a fixed height and the `<ScrollView>` uses `flex: 1` to fill that parent.
- **Renders All Children:** `<ScrollView>` renders all its React children simultaneously. This is fine for a small number of items but can be inefficient for long lists.
- **Styling:** Can be styled like a `<View>`, but also has specific content container styles.
- **Scroll Indicators:** Shows default scroll indicators (scrollbars) which can be customized or hidden.

> 📲 **(Native Developers):**
>
> **Comparison:** `<ScrollView>` is analogous to `UIScrollView` on iOS and `ScrollView` (or `HorizontalScrollView`) on Android. It provides the same fundamental capability of a scrollable viewport for content that doesn't fit on screen.
>
> **Key Takeaway:** Use `<ScrollView>` for generic scrollable content. Be mindful of performance with very large numbers of child components; consider `<FlatList>` for those cases.
>
> **Source:** [React Native Docs: ScrollView](https://reactnative.dev/docs/scrollview)

> 🌐 **(Web Developers):**
>
> **Comparison:** `<ScrollView>` is similar to setting `overflow: scroll` or `overflow: auto` on a `<div>` in CSS. It allows content to extend beyond the container's bounds and be scrolled into view. The performance consideration of rendering all children at once is akin to having a very long HTML page versus virtualized scrolling solutions.
>
> **Key Takeaway:** `<ScrollView>` enables scrolling. For optimal performance with lists, React Native offers specialized list components like `<FlatList>`.
>
> **Source:** [MDN Web Docs: `overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)

### Referential Content: Common `<ScrollView>` Props

- `style`: Styles for the `<ScrollView>` itself (the outer container).
  - _Type:_ `StyleProp<ViewStyle>`
- `contentContainerStyle`: Styles applied to the content wrapper inside the `<ScrollView>`. Useful for padding the scrollable content, for example.
  - _Type:_ `StyleProp<ViewStyle>`
- `horizontal`: (boolean) If `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column. Default is `false`.
- `showsHorizontalScrollIndicator`: (boolean) When `true`, shows a horizontal scroll indicator. Default is `true`.
- `showsVerticalScrollIndicator`: (boolean) When `true`, shows a vertical scroll indicator. Default is `true`.
- `keyboardDismissMode`: (enum: `'none'`, `'on-drag'`, `'interactive'`) Determines whether the keyboard gets dismissed in response to a drag gesture.
  - `'none'` (default): drags do not dismiss the keyboard.
  - `'on-drag'`: the keyboard is dismissed when a drag begins.
  - `'interactive'`: the keyboard is dismissed interactively with the drag and moves in synchrony with the touch; dragging upwards cancels the dismissal.
- `keyboardShouldPersistTaps`: (enum: `'always'`, `'never'`, `'handled'`) Determines when the keyboard should stay visible after a tap. Default is `'never'`.
- `onScroll`: (function) Fires at most once per frame during scrolling. The event has a `nativeEvent` object with properties like `contentOffset`, `contentInset`, `contentSize`, `layoutMeasurement`, and `zoomScale`.
- `pagingEnabled`: (boolean) If `true`, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.
- `refreshControl`: (Element) A `RefreshControl` component, used to provide pull-to-refresh functionality.

> 📚 **Official Documentation:**
>
> - [React Native Docs: ScrollView Props](https://reactnative.dev/docs/scrollview#props)
> - [Expo Docs: ScrollView](https://docs.expo.dev/ui-programming/scrollview/)

### Procedural Content: Basic `<ScrollView>` Usage

Let's imagine a section in the SpeedyMeds app that displays a long list of terms and conditions or detailed medication information that requires scrolling.

**Short, Self-Contained Example:**

```tsx
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";

const medicationDetails = [
  "Description: Atorvastatin is used to lower cholesterol and triglycerides (types of fat) in the blood.",
  "Dosage: Take exactly as prescribed by your doctor. Do not take in larger or smaller amounts or for longer than recommended.",
  "Side Effects: Common side effects may include joint pain, stuffy nose, sore throat, diarrhea, or pain in your arms or legs. Call your doctor if you have serious side effects.",
  "Precautions: Before taking atorvastatin, tell your doctor if you have liver disease, kidney disease, a thyroid disorder, or if you drink more than 2 alcoholic beverages daily.",
  "Interactions: Many drugs can interact with atorvastatin. Tell your doctor about all medications you use. This includes prescription, over-the-counter, vitamin, and herbal products.",
  "Storage: Store at room temperature away from moisture, heat, and light.",
  "Missed Dose: Take the missed dose as soon as you remember. Skip the missed dose if it is almost time for your next scheduled dose.",
  "Overdose: Seek emergency medical attention or call the Poison Help line at 1-800-222-1222.",
  "Pregnancy: Do not use atorvastatin if you are pregnant. It can harm an unborn baby.",
  "Breastfeeding: It is not known whether atorvastatin passes into breast milk or if it could harm a nursing baby. You should not breastfeed while using this drug.",
  "Disclaimer: This information is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
];

export default function MedicationInformationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Atorvastatin - Detailed Information
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} // Example: hiding scroll indicator
      >
        {medicationDetails.map((detail, index) => (
          <View key={index} style={styles.detailItem}>
            <Text style={styles.detailText}>{detail}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0, // Handles Android status bar
    backgroundColor: "#e8f0fe", // Light blue background for the screen
  },
  headerContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#c0d7ff",
    backgroundColor: "#f8f9fa", // Slightly off-white for header
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003366", // Dark blue for header text
  },
  scrollView: {
    flex: 1, // Ensures ScrollView takes available space within SafeAreaView
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  detailItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f8ff", // Alice blue for item background
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d6eaff",
  },
  detailText: {
    fontSize: 15,
    lineHeight: 22, // For better readability of long text
    color: "#333",
  },
});
```

**Explanation of the Example:**

1.  **`SafeAreaView`:** This component is used as the root to ensure content is displayed within the safe area boundaries of a device (important for notched iPhones, for example). It's given `flex: 1` to take up the full screen.
2.  **Bounded Height for `<ScrollView>`:** The `<ScrollView>` itself is styled with `flex: 1`. Since its parent (`SafeAreaView`) has `flex: 1` and thus fills the screen, the `<ScrollView>` now has a bounded height, which is necessary for vertical scrolling to work.
3.  **Content:** We have an array `medicationDetails` containing several strings. We map over this array to render a `<View>` and `<Text>` for each detail item.
4.  **`contentContainerStyle`:** The `paddingVertical` and `paddingHorizontal` styles are applied to the content _inside_ the `<ScrollView>` using `contentContainerStyle`. This is useful for adding space around the scrollable content itself, rather than styling the scrollbar area.
5.  **`showsVerticalScrollIndicator={false}`:** This prop is used to hide the vertical scrollbar for a cleaner look, though generally it's good for UX to show indicators.
6.  **Mapping Items:** Each detail string is rendered within its own styled `<View>` (`styles.detailItem`) and `<Text>` (`styles.detailText`) for better presentation and spacing.

This example demonstrates how `<ScrollView>` can be used to display content that might not fit on a single screen. If the `medicationDetails` array contained even more items, the user would be able to scroll down to see all of them.

Remember, for very long lists of items where performance is a concern (e.g., a list of hundreds of medications), `<FlatList>` is a more optimized solution because it only renders items that are currently visible on the screen (virtualization). We will cover `<FlatList>` in Section 9.

### Next Steps

Understanding how to group and style components with `<View>` and how to make content scrollable with `<ScrollView>` are crucial layout skills. Next, we'll dive deeper into styling by looking at the `StyleSheet` API.

- [Next Section: StyleSheet API - Basic Styling](./section-07-stylesheet-api.md)
