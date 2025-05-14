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

The `Dimensions` API from `react-native` allows you to get the width and height of the device screen or the application window. It's a way to get static dimension values at the time of invocation.

- **`Dimensions.get(dim)`**: Synchronously retrieves the dimensions.
  - `dim`: Can be `'window'` (the visible application window, excluding status/navigation bars on some Android versions) or `'screen'` (the entire physical screen size).
  - Returns a `ScaledSize` object: `{ width: number, height: number, scale: number, fontScale: number }`.
    - `scale`: The pixel density of the screen.
    - `fontScale`: The scaling factor for fonts chosen by the user.

```tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: windowWidthInitial, height: windowHeightInitial } =
  Dimensions.get("window");
const { width: screenWidthInitial, height: screenHeightInitial } =
  Dimensions.get("screen");

console.log(
  `Initial Window: ${windowWidthInitial}x${windowHeightInitial}, Scale: ${
    Dimensions.get("window").scale
  }`
);
console.log(
  `Initial Screen: ${screenWidthInitial}x${screenHeightInitial}, Scale: ${
    Dimensions.get("screen").scale
  }`
);

/**
 * A component demonstrating responsive width and height calculations based on
 * initial screen dimensions obtained via `Dimensions.get()`. This approach is
 * suitable for one-time calculations as these dimensions do not update on changes.
 * @returns {React.ReactElement} The ResponsiveCard component.
 */
const ResponsiveCard = () => {
  const cardWidth = windowWidthInitial * 0.9; // Card takes 90% of the initial window width
  const imageHeight = windowHeightInitial * 0.2; // Image takes 20% of the initial window height

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

- `Dimensions.get('window')` retrieves the width, height, scale, and fontScale of the app window at the moment it is called.
- These dimensions can then be used to calculate sizes for components dynamically (e.g., `cardWidth = windowWidthInitial * 0.9`).

**Limitations of `Dimensions` API:**

- **Static Values:** `Dimensions.get()` only provides the dimensions at the time it's called. It does not update automatically if the screen size or orientation changes.
- **Manual Updates for Changes:** To react to dimension changes (e.g., device rotation), you would need to manually set up event listeners using `Dimensions.addEventListener('change', handler)` and manage state updates yourself. This `handler` receives an object like `{ window: ScaledSize, screen: ScaledSize }`. This imperative approach is less aligned with React's declarative model.
- **No Automatic Re-renders:** Components using values from `Dimensions.get()` won't automatically re-render when dimensions change unless you implement the event listener and state update logic.
- **Caching Discouraged:** Caching values from `Dimensions.get()` is unreliable as dimensions can change at any time.

For these reasons, while `Dimensions.get()` can be useful for one-time measurements (e.g., outside of component render lifecycles), the `useWindowDimensions` hook is generally preferred for responsive UI in functional components.

**`useWindowDimensions` Hook (Recommended for dynamic updates):**

This hook, available from `react-native`, automatically updates when screen dimensions or font scale change, triggering re-renders in components that use it.

```tsx
import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

/**
 * A component demonstrating dynamic responsive sizing using the `useWindowDimensions` hook.
 * The card width and title font size adapt to changes in window dimensions and font scale,
 * ensuring the UI remains responsive (e.g., on device rotation).
 * @returns {React.ReactElement} The DynamicResponsiveCard component.
 */
const DynamicResponsiveCard = () => {
  const {
    width: windowWidth,
    height: windowHeight,
    scale,
    fontScale,
  } = useWindowDimensions();

  const cardWidth = windowWidth * 0.85; // 85% of current window width
  const titleFontSize = windowWidth > 400 ? 20 / fontScale : 16 / fontScale; // Adjust font based on width and user's font scale preference

  console.log(
    `Current Window: ${windowWidth}x${windowHeight}, Scale: ${scale}, FontScale: ${fontScale}`
  );

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
    // Example of using scale for a hairline border if StyleSheet.hairlineWidth is not preferred
    // borderWidth: 1 / scale,
    // borderColor: '#00529B',
  },
  dynamicCardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#00529B",
  },
});

export default DynamicResponsiveCard;
```

**Explanation & Benefits of `useWindowDimensions`:**

- **Reactive:** Automatically provides the current `width`, `height`, `scale`, and `fontScale` of the application window.
- **Automatic Re-renders:** Components using this hook will re-render whenever these dimension values change (e.g., due to device rotation or foldable screen state change), ensuring your UI adapts.
- **Declarative:** Fits seamlessly into the React hook paradigm, eliminating the need for manual event listener setup and state management for dimensions.
- **Simplicity:** Offers a cleaner and more intuitive API for building responsive layouts compared to the `Dimensions` API for dynamic scenarios.

**3. `Platform` Module**

The `Platform` module from `react-native` helps you write platform-specific code, which can include styles or even different component logic.

**`Platform.OS` and `Platform.Version`**

- `Platform.OS`: A string that can be `'ios'`, `'android'`, `'windows'`, `'macos'`, or `'web'`. This is commonly used for simple conditional checks.
- `Platform.Version`:
  - On Android, this returns the Android API level as a number (e.g., `21` for Lollipop, `30` for Android 11).
  - On iOS, this returns the iOS version as a string (e.g., `"15.4"`). You might need to parse it if you need to check major/minor versions.

```tsx
import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

console.log(`Running on: ${Platform.OS}, Version: ${Platform.Version}`);

if (
  Platform.OS === "android" &&
  typeof Platform.Version === "number" &&
  Platform.Version >= 23
) {
  console.log("Android Marshmallow (API 23) or newer.");
}

if (Platform.OS === "ios") {
  const majorVersionIOS = parseInt(String(Platform.Version), 10);
  if (majorVersionIOS >= 14) {
    console.log("iOS 14 or newer.");
  }
}

/**
 * Props for the PlatformSpecificHeader component.
 * @param title - The title to display in the header.
 */
interface PlatformSpecificHeaderProps {
  title: string;
}

/**
 * A component that demonstrates platform-specific styling using `Platform.OS`
 * and `Platform.select()` for padding, background color, and text color.
 * It also shows conditional rendering of text based on the platform.
 * @param {PlatformSpecificHeaderProps} props - The props for the component.
 * @returns {React.ReactElement} The PlatformSpecificHeader component.
 */
const PlatformSpecificHeader: React.FC<PlatformSpecificHeaderProps> = ({
  title,
}) => {
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
- `Platform.select()` is a utility that takes an object with platform keys (`ios`, `android`, `native`, `default`) and returns the value for the current platform. It follows a specific precedence for selecting the value: `ios`/`android` (most specific) > `native` (matches both iOS and Android, useful if not web) > `default` (fallback if no other platform-specific key matches or if the current platform is not `ios` or `android`). This is very useful for defining platform-specific style values or configurations.

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
/**
 * Props for the MedicationImage component.
 * @param imageUrl - The URL of the medication image to display (currently unused by placeholder).
 */
interface MedicationImageProps {
  imageUrl: string;
}

/**
 * A component that displays a placeholder for a medication image, maintaining a 16:9 aspect ratio.
 * It demonstrates the use of the `aspectRatio` style property.
 * @param {MedicationImageProps} props - The props for the component.
 * @returns {React.ReactElement} The MedicationImage component.
 */
const MedicationImage: React.FC<MedicationImageProps> = ({ imageUrl }) => {
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

export default MedicationImage;
```

**6. Orientation Changes**

When a device rotates, the width and height swap. `useWindowDimensions` will automatically provide the updated values. You might need to adjust your layout logic based on whether `width > height` (landscape) or `height > width` (portrait).

```tsx
/**
 * A component that demonstrates an orientation-aware layout.
 * It changes its `flexDirection` based on whether the device is in landscape or portrait mode,
 * utilizing the `useWindowDimensions` hook to detect orientation changes.
 * @returns {React.ReactElement} The OrientationAwareLayout component.
 */
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

### Platform-Specific File Extensions

For more substantial differences where entire components or large sections of code vary between platforms, React Native's bundler (Metro) supports platform-specific file extensions. This approach helps keep your codebase cleaner and more manageable by separating platform-specific logic into distinct files.

- **`.ios.tsx` / `.ios.js`**: Files with this extension will only be bundled for iOS.
- **`.android.tsx` / `.android.js`**: Files with this extension will only be bundled for Android.
- **`.native.tsx` / `.native.js`**: Files with this extension will be bundled for both iOS and Android, but not for web or other platforms.

**Example:**

Suppose you have a custom map component that uses different underlying native map libraries for iOS and Android.

```typescript
// SpeedyMedsMap.ios.tsx - Uses MapKitView (hypothetical)
import React from "react";
import { Text } from "react-native"; // Placeholder for an iOS-specific map view
const SpeedyMedsMapIOS = () => <Text>iOS Map View (e.g., MapKit)</Text>;
export default SpeedyMedsMapIOS;

// SpeedyMedsMap.android.tsx - Uses GoogleMapsView (hypothetical)
import React from "react";
import { Text } from "react-native"; // Placeholder for an Android-specific map view
const SpeedyMedsMapAndroid = () => (
  <Text>Android Map View (e.g., Google Maps)</Text>
);
export default SpeedyMedsMapAndroid;

// SpeedyMedsMap.tsx (Optional common interface or web fallback)
// If you also had a SpeedyMedsMap.tsx, it would be used for platforms
// not covered by .ios or .android (e.g., web, or if those files didn't exist).
// Often, you might just have the platform-specific files.
```

When you import this component in your application:

```typescript
import SpeedyMedsMap from "./components/SpeedyMedsMap"; // No extension needed

// On iOS, SpeedyMedsMap.ios.tsx is loaded.
// On Android, SpeedyMedsMap.android.tsx is loaded.
```

**When to Use:**

- **`Platform.OS` / `Platform.select()`**: Best for small, inline differences in styles, simple logic branching, or minor configuration changes.
- **Platform-Specific File Extensions**: Ideal when the implementation of a component or module differs significantly between platforms, or when you want to include platform-exclusive native module integrations.

### Handling Safe Area Insets

Modern mobile devices often feature elements like camera notches (common on iOS), status bars, rounded screen corners, and home indicators (the horizontal bar at the bottom of newer iPhones) that can overlap with your application's UI if content is placed at the very edges of the screen. Safe Area APIs help you position your content within the visible, unobstructed portions of the screen.

**1. Built-in `<SafeAreaView>` (iOS Only, Limited)**

React Native provides a built-in `<SafeAreaView>` component. However, it has limitations:

- It only works on iOS 11+ devices.
- It can sometimes cause jumpy behavior during screen transitions or with animations.
- It might ignore explicit padding styles applied to it.

For these reasons, it's generally **not recommended** for comprehensive safe area management.

**2. `react-native-safe-area-context` (Recommended Cross-Platform Solution)**

This community library provides a more robust and flexible cross-platform solution for handling safe areas on both iOS and Android.

**Installation:**

```bash
# Using npm
npm install react-native-safe-area-context

# Or using yarn
yarn add react-native-safe-area-context
```

Expo projects often include this, but it's good to ensure it's in your `package.json`.

**Setup: `SafeAreaProvider`**

You must wrap the root of your application (or at least the navigator or screen that needs safe area context) with `SafeAreaProvider`. This component provides the inset data to all descendant consumers.

```tsx
// App.tsx (or your root navigator setup)
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainAppContent from "./MainAppContent"; // Your actual app

export default function App() {
  return (
    <SafeAreaProvider>
      <MainAppContent />
    </SafeAreaProvider>
  );
}
```

**Consuming Insets with `useSafeAreaInsets()` Hook (Recommended)**

The most flexible way to use the insets is via the `useSafeAreaInsets()` hook. This hook returns an object `{ top, right, bottom, left }` containing the inset values in DIPs for each edge of the screen.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * A component demonstrating how to apply custom padding based on safe area insets.
 * It uses the `useSafeAreaInsets` hook from `react-native-safe-area-context`
 * to ensure content is not obscured by device notches or system UI elements.
 * @returns {React.ReactElement} The ScreenWithCustomSafePadding component.
 */
const ScreenWithCustomSafePadding = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        // Apply padding an all sides using the inset values
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#f0f8ff", // AliceBlue for visibility
      }}
    >
      <Text style={styles.title}>SpeedyMeds Patient Portal</Text>
      <Text style={styles.content}>
        This content is perfectly padded within the safe areas of your device.
        The status bar, notch, and home indicator (if any) should not overlap.
      </Text>
      {/* Your screen content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default ScreenWithCustomSafePadding;
```

**Explanation:**

- The `useSafeAreaInsets()` hook provides the `top`, `bottom`, `left`, and `right` inset values.
- You can then use these values to apply `paddingTop`, `paddingBottom`, etc., to your main screen container `View`.
- This approach gives you precise control over how safe areas are handled and integrates well with existing layout styles.

**Using the `<SafeAreaView>` Component from the Library (Alternative)**

`react-native-safe-area-context` also exports its own `<SafeAreaView>` component. While available, the React Navigation documentation often advises caution with it due to potential flickering or animation issues similar to the built-in version, especially during screen transitions. The `useSafeAreaInsets()` hook generally offers more consistent behavior.

If you do use the library's `<SafeAreaView>`:

- `edges`: An array prop to control which sides apply the insets (e.g., `edges={['top', 'left', 'right']}`).
- `mode`: Specifies whether insets are applied as `'padding'` (default) or `'margin'`.

For most cases, using `useSafeAreaInsets()` and manually applying padding to your root view of a screen provides the best control and reliability.

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
