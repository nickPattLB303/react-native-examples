## Section 10: Responsive Design Techniques

Mobile devices come in a variety of screen sizes, aspect ratios, and resolutions. A well-crafted application should provide a good user experience across this diverse range of devices. Responsive design in React Native involves creating layouts and styles that adapt gracefully to these variations. This section explores techniques to make your SpeedyMeds application responsive.

### Why Responsive Design Matters

- **User Experience:** A responsive UI feels more professional and is easier to use, regardless of the device.
- **Accessibility:** Ensures that content is readable and interactive on both small and large screens.
- **Future-Proofing:** New devices with different screen dimensions are constantly released. Responsive design helps your app adapt without requiring a complete overhaul for each new device.

### Core Techniques for Responsive Design

**1. Flexbox (Recap)**

Flexbox, as covered in Section 4, is inherently designed for creating flexible and adaptive layouts. Properties like `flex`, `flexGrow`, `flexShrink`, and percentage-based `flexBasis` allow components to distribute space dynamically. This is your primary tool for responsive layouts.

**2. `Dimensions` API**

The `Dimensions` API from `react-native` allows you to get the width and height of the device screen or the application window.

```tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// 'window' gives the visible application window size, excluding status/navigation bars on some platforms.
// 'screen' gives the full screen size.

const ResponsiveCard = () => {
  const cardWidth = screenWidth * 0.9; // Card takes 90% of the screen width
  const imageHeight = screenHeight * 0.2; // Image takes 20% of the screen height

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={[styles.imagePlaceholder, { height: imageHeight }]} />
      <Text style={styles.cardTitle}>Medication Reminder</Text>
      <Text>Take your Amoxicillin 250mg now.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 10,
    alignSelf: "center", // Center the card on the screen
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imagePlaceholder: {
    backgroundColor: "#e0e0e0",
    marginBottom: 12,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ResponsiveCard;
```

**Explanation:**

- `Dimensions.get('window')` retrieves the width and height of the app window.
- These dimensions can then be used to calculate sizes for components dynamically (e.g., `cardWidth = screenWidth * 0.9`).

> [!IMPORTANT] > `Dimensions.get()` provides initial dimensions. If the screen size or orientation changes (e.g., device rotation), these values will not update automatically. For dynamic updates, you should use the `useWindowDimensions` hook or add an event listener for dimension changes.

**`useWindowDimensions` Hook (Recommended for dynamic updates):**

This hook, available from `react-native`, automatically updates when screen dimensions change.

```tsx
import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

const DynamicResponsiveCard = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const cardWidth = windowWidth * 0.85; // 85% of current window width
  const titleFontSize = windowWidth > 400 ? 20 : 16; // Larger font on wider screens

  return (
    <View style={[styles.dynamicCard, { width: cardWidth }]}>
      <Text style={[styles.dynamicCardTitle, { fontSize: titleFontSize }]}>
        Refill Due: Metformin
      </Text>
      {/* ... other content ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  dynamicCard: {
    backgroundColor: "#e9f5ff",
    padding: 16,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 8,
  },
  dynamicCardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#00529B",
  },
});

export default DynamicResponsiveCard;
```

**3. `Platform` Module**

The `Platform` module from `react-native` helps you write platform-specific code, which can include styles.

```tsx
import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const PlatformSpecificHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {Platform.OS === "ios" && (
        <Text style={styles.platformHint}>Styled for iOS elegance</Text>
      )}
      {Platform.OS === "android" && (
        <Text style={styles.platformHint}>Material look for Android</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: Platform.select({
      ios: 20, // More padding on iOS
      android: 15, // Less padding on Android
      default: 10, // Fallback for other platforms (e.g., web)
    }),
    paddingHorizontal: 16,
    backgroundColor: Platform.OS === "ios" ? "#f0f0f0" : "#007bff",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Platform.OS === "ios" ? "#333" : "#fff",
  },
  platformHint: {
    fontSize: 12,
    color: Platform.OS === "ios" ? "#555" : "#eee",
    marginTop: 4,
  },
});

export default PlatformSpecificHeader;
```

**Explanation:**

- `Platform.OS` can be `'ios'`, `'android'`, `'windows'`, `'macos'`, or `'web'`.
- `Platform.select()` is a utility that takes an object with platform keys and returns the value for the current platform. This is very useful for defining platform-specific style values.

**4. Percentage-Based Dimensions**

Style properties like `width`, `height`, `margin`, and `padding` can accept percentage values as strings (e.g., `'50%'`). These percentages are relative to the parent container's dimension along the same axis.

```tsx
const styles = StyleSheet.create({
  parentContainer: {
    width: 300,
    height: 200,
    backgroundColor: "lightgrey",
  },
  childItem: {
    width: "50%", // 50% of parent's width (150px)
    height: "80%", // 80% of parent's height (160px)
    backgroundColor: "skyblue",
    margin: "5%", // Margin is 5% of parent's width (15px)
  },
});
```

> [!CAUTION]
> Percentage-based margins and paddings can sometimes behave unexpectedly, especially with nested components or when combined with Flexbox. Test thoroughly. For `marginHorizontal` or `paddingHorizontal`, percentage is relative to parent width; for `marginVertical` or `paddingVertical`, it's relative to parent height (though this can be inconsistent, often parent width is used for all percentage margins/paddings in React Native. Always verify).

**5. Aspect Ratio**

The `aspectRatio` style property allows you to maintain a component's aspect ratio if one dimension (width or height) is set or determined by Flexbox, and the other is not.

```tsx
// SpeedyMeds: Displaying a medication image with a fixed aspect ratio
const MedicationImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <View style={styles.imageContainer}>
      {/* In a real app, use <Image source={{uri: imageUrl}} style={styles.image} /> */}
      <View style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%", // Take full width of parent
    marginBottom: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9, // Maintain a 16:9 aspect ratio
    backgroundColor: "#ccc", // Placeholder
  },
});
```

**6. Orientation Changes**

When a device rotates, the width and height swap. `useWindowDimensions` will automatically provide the updated values. You might need to adjust your layout logic based on whether `width > height` (landscape) or `height > width` (portrait).

```tsx
const OrientationAwareLayout = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View
      style={{
        flexDirection: isLandscape ? "row" : "column",
        // ... other styles that change based on orientation
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#add8e6" }}>
        <Text>Section 1</Text>
      </View>
      <View style={{ flex: isLandscape ? 2 : 1, backgroundColor: "#90ee90" }}>
        <Text>Section 2</Text>
      </View>
    </View>
  );
};
```

### Strategies for Responsive UI

- **Mobile-First (or Smallest Screen First):** Design for the smallest target screen size first, then adapt for larger screens. This often leads to cleaner, more focused designs.
- **Breakpoints:** While React Native doesn't have CSS-style media queries out-of-the-box, you can define your own breakpoints using `Dimensions` or `useWindowDimensions` and apply different styles or even render different component trees.

  ```tsx
  const { width } = useWindowDimensions();
  const SMALL_DEVICE_WIDTH = 380;
  const isSmallDevice = width < SMALL_DEVICE_WIDTH;

  // ... in your component
  // style={isSmallDevice ? styles.smallButton : styles.largeButton}
  ```

- **Dynamic Font Sizes:** Adjust font sizes based on screen width or height to maintain readability.
- **Image Optimization:** Use appropriate image sizes for different screen densities and dimensions. Libraries like `expo-image` can help with this.
- **Test on Multiple Devices/Simulators:** Always test your UI on a range of physical devices and simulators (different sizes, iOS/Android) to catch layout issues.

Responsive design is an ongoing process of testing and refinement. By leveraging Flexbox, the `Dimensions` API, `useWindowDimensions`, and the `Platform` module, you can build adaptive and user-friendly interfaces for SpeedyMeds that work well across the diverse landscape of mobile devices.

This concludes Module 10 on Styling in React Native. You should now have a solid understanding of various styling techniques, from basic `StyleSheet` usage and Flexbox layouts to advanced theming with Styled Components and UI libraries like React Native Paper, as well as how to make your designs responsive.

📚 **Official Documentation:**

- [React Native Docs: Dimensions](https://reactnative.dev/docs/dimensions)
- [React Native Docs: `useWindowDimensions` hook](https://reactnative.dev/docs/usewindowdimensions)
- [React Native Docs: Platform Module](https://reactnative.dev/docs/platform-specific-code)
- [React Native Docs: PixelRatio (for density-specific resources)](https://reactnative.dev/docs/pixelratio)
