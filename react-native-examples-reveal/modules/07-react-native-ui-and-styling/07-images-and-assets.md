# 07: Images and Assets 🖼️

Images are a vital part of mobile UIs. React Native's `<Image>` component handles displaying images from various sources, and the build system helps manage static assets like image files.

*   **`<Image>` Component:** The core component for displaying images.
*   **Static Images:** Bundled with the app using `require()`.
*   **Network Images:** Loaded from URLs using `{ uri: '...' }`.
*   **Asset Management:** Organizing image files within your project.
*   **Density Variants:** Providing `@2x`, `@3x` versions for different screen densities.

> Effectively managing and displaying images is crucial for both visual appeal and performance.

<div class="android-dev">🤖 **Android Devs:** Similar to using `ImageView` and managing drawables in `res/drawable` folders (e.g., `drawable-mdpi`, `drawable-xhdpi`). `require` is like referencing `@drawable/my_image`.</div>
<div class="ios-dev">🍏 **iOS Devs:** Analogous to `UIImageView` and managing images in Asset Catalogs (`.xcassets`), which handle different scale factors (@1x, @2x, @3x). `require` simplifies this process.</div>
<div class="react-dev">⚛ **React Devs:** Like the `<img>` tag, but with specific source handling (`require` vs `uri`) and mandatory dimensions for network images. Asset bundling is handled by Metro.</div>
<div class="angular-dev">🅰 **Angular Devs:** Similar to using `<img>` tags with `[src]` binding. Asset handling via `require` and density variants are React Native specifics.</div>

<blockquote><details>

Integrating visual elements like images and icons is fundamental to creating engaging user interfaces. React Native provides the versatile `<Image>` component to handle image rendering. You can load images that are bundled directly with your application package (static images) using the `require()` function, or you can load images dynamically from remote URLs (network images). Understanding how React Native's packager, Metro, handles static assets is important. It automatically bundles required images and can even select the appropriate resolution variant (`@2x`, `@3x`) based on the device's screen density, simplifying cross-device compatibility. We'll explore how to use the `<Image>` component effectively, including essential props like `source`, `style` (especially `width` and `height`), and `resizeMode`, and discuss best practices for organizing your image assets.

</details></blockquote>

---

## Static Images with `require()`

Include images directly in your source code using `require()`. The path is relative to the current file.

*   Metro bundler includes the image in your app package.
*   Image dimensions are determined automatically (usually).
*   Supports density variants (`@2x`, `@3x`).

**Project Structure:**

```
/src
/components
MedicationCard.tsx
/assets
/images
pill-icon.png
pill-icon@2x.png
```


**Usage:**

```typescript
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

// Path is relative to this file
// Assuming this file is in /src/components/
const pillIcon = require('../assets/images/pill-icon.png');

const MedicationIcon = () => {
  return (
    <View style={styles.iconContainer}>
      {/* source prop uses the required asset */}
      <Image source={pillIcon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
  },
  icon: {
    width: 30, // Can still specify size if needed
    height: 30,
    // resizeMode: 'contain', // Optional: control scaling
  },
});

export default MedicationIcon;
```

> `require()` is the standard way to include static image assets bundled with your app. Metro handles the path resolution and bundling.

<blockquote><details>

Using `require()` is the recommended method for images that are part of your application's design, like icons, logos, or background patterns. When you use `require('./path/to/image.png')`, React Native's bundler (Metro) analyzes this call during the build process. It finds the image file, determines its dimensions, handles density variants (see next slide), and packages the image asset appropriately for each platform (iOS/Android). The return value of `require()` is an opaque object or number that you pass directly to the `<Image>` component's `source` prop. A significant advantage is that Metro knows the image dimensions, so you often don't *need* to specify `width` and `height` in the style for static images (though it's often good practice for layout predictability). The path provided to `require` must be a static string literal; dynamic paths or variables are not supported because the analysis happens at build time. Keep your image assets organized, typically within an `/assets` or `/src/assets` directory.

</details></blockquote>

---

## Density Variants (`@2x`, `@3x`)

Provide different resolution versions of static images for different screen densities.

*   Name files like `my_icon.png` (baseline, 1x), `my_icon@2x.png`, `my_icon@3x.png`.
*   Place them in the same directory.
*   Use `require('.../my_icon.png')` (referencing the baseline image).
*   React Native automatically selects the best variant for the device's screen density (`scale`).

```
/assets/images
logo.png (100x100 px, for 1x density)
logo@2x.png (200x200 px, for 2x density - e.g., iPhone 8)
logo@3x.png (300x300 px, for 3x density - e.g., iPhone 13 Pro)
```


```typescript
// Always require the baseline (1x) image name
const logoImage = require('../assets/images/logo.png');

// <Image source={logoImage} style={{ width: 100, height: 100 }} />
// RN will load logo@2x.png on a 2x device, logo@3x.png on a 3x device,
// but it will still render in a 100x100 dp area.
```

> This ensures images look sharp on high-resolution displays (Retina, high-DPI Android) without needing manual checks.

<div class="android-dev">🤖 **Android Devs:** This automates the process handled by `drawable-mdpi`, `drawable-hdpi`, `drawable-xhdpi`, etc. Just name files with `@2x`/`@3x` and `require` the base.</div>
<div class="ios-dev">🍏 **iOS Devs:** This directly mirrors the `@2x`/`@3x` naming convention used in Xcode Asset Catalogs. React Native leverages the same underlying mechanism.</div>

<blockquote><details>

Modern mobile devices feature high-resolution displays (often called "Retina" on iOS or high-DPI on Android). To ensure your static images appear crisp and not pixelated on these screens, you should provide higher-resolution versions. React Native adopts the convention established by iOS: create image files suffixed with `@2x` and `@3x` for double and triple density screens, respectively, alongside the baseline `@1x` image (which might not have a suffix). For example, if your baseline `logo.png` is 100x100 pixels, `logo@2x.png` should be 200x200 pixels, and `logo@3x.png` should be 300x300 pixels. Place all these variants in the same folder. When you write `require('../assets/images/logo.png')`, you only reference the base image name. At runtime, React Native automatically detects the device's screen density (scale factor) and loads the most appropriate image variant (`logo@3x.png` on a 3x device, `logo@2x.png` on a 2x device, etc.). The image will still render according to the layout dimensions you specify in dp (e.g., `width: 100`), but it will use the higher-resolution asset for rendering, resulting in a sharp image.

</details></blockquote>

---

## Network Images with `uri`

Load images from the internet by providing a URI in the `source` prop.

*   `source={{ uri: 'https://example.com/image.jpg' }}`
*   **Crucial:** You **MUST** specify `width` and `height` styles for network images. React Native cannot determine the dimensions beforehand.
*   Supports `http://`, `https://`, and local file URIs (`file://`).
*   Consider caching strategies for performance.

```typescript
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

interface MedicationImageProps {
  imageUrl?: string; // Optional image URL
}

const DefaultMedImage = require('../assets/images/default-pill.png'); // Fallback static image

const NetworkMedicationImage = ({ imageUrl }: MedicationImageProps) => {
  // Determine the source: use network URI if available, otherwise use default static image
  const imageSource = imageUrl ? { uri: imageUrl } : DefaultMedImage;

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image} // MUST contain width and height
        resizeMode="cover"
        // Optional: Add loading indicators or error handling
        // loadingIndicatorSource={...}
        // onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
      />
      {!imageUrl && <Text style={styles.fallbackText}>No Image</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', // Center fallback text if image fails/missing
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden', // Ensure image respects border radius
    width: 120, // Set container size
    height: 120,
  },
  image: {
    width: '100%', // Make image fill container
    height: '100%', // Make image fill container
    // Explicit width/height are MANDATORY for network images.
    // Here, they are implicitly set by the container's size via '100%'.
    // Alternatively, set fixed width/height directly: width: 120, height: 120
  },
  fallbackText: {
      position: 'absolute',
      color: '#888',
      fontSize: 12,
  }
});

export default NetworkMedicationImage;

// Usage:
// <NetworkMedicationImage imageUrl="https://example.com/path/to/lisinopril.jpg" />
// <NetworkMedicationImage /> // Uses default static image
```

> Failure to provide `width` and `height` for network images will result in the image not being displayed (rendered with zero dimensions).

<blockquote><details>

When you need to display images loaded from a remote server, you use the `uri` property within the `source` prop object: `source={{ uri: 'https://...' }}`. Unlike static images bundled via `require()`, React Native has no way of knowing the dimensions of a network image before it starts downloading it. Therefore, you **must** provide explicit `width` and `height` values in the `<Image>` component's style. If you omit these, the image will render with zero width and height and will be invisible. In the example, the `NetworkMedicationImage` component takes an optional `imageUrl`. If provided, it sets the `source` to `{ uri: imageUrl }`. If not, it falls back to a static `DefaultMedImage`. The `style={styles.image}` is applied, which uses `width: '100%'` and `height: '100%'`. This works because the *parent* `View` (`styles.container`) has fixed `width` and `height` (120x120). The percentage values make the image fill its container. Alternatively, we could have set `width: 120, height: 120` directly on `styles.image`. Remember to handle potential loading states or errors when dealing with network resources. Libraries like `react-native-fast-image` can offer more advanced caching and performance features for network images.

</details></blockquote>

---

## `resizeMode` Prop

Controls how the image should be resized to fit its container dimensions when the image's aspect ratio doesn't match the container's `width` and `height`.

*   `cover` (Default): Scale the image uniformly (maintaining aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view. The image is cropped if necessary.
*   `contain`: Scale the image uniformly (maintaining aspect ratio) so that both dimensions are equal to or less than the view's dimensions. The entire image is visible, potentially leaving empty space (letterboxing/pillarboxing).
*   `stretch`: Scale width and height independently, potentially distorting the image's aspect ratio to match the container.
*   `repeat`: Repeat the image to cover the frame (iOS only).
*   `center`: Center the image within the view; if smaller, it stays centered; if larger, it's clipped similarly to `cover` but centered.

```typescript
// <Image source={...} style={{ width: 100, height: 50 }} resizeMode="contain" />
// <Image source={...} style={{ width: 100, height: 50 }} resizeMode="cover" />
// <Image source={...} style={{ width: 100, height: 50 }} resizeMode="stretch" />
```

> Choose `resizeMode` based on whether you need the full image visible (`contain`) or need the container fully covered (`cover`), avoiding distortion (`stretch`).

<blockquote><details>

The `resizeMode` prop is essential for controlling how an image adapts when its intrinsic aspect ratio differs from the `width` and `height` specified in its style. The default, `cover`, ensures the entire container area is filled with the image, maintaining the image's aspect ratio but potentially cropping parts of the image that extend beyond the container bounds. `contain` ensures the *entire* image is visible within the container, again maintaining the aspect ratio, but this might leave empty space within the container if the aspect ratios don't match (like black bars on a widescreen movie shown on a square screen). `stretch` forces the image to exactly match the container's dimensions, which will distort the image if the aspect ratios are different – use this cautiously. `center` positions the image in the middle of the container; if the image is smaller than the container, it's shown at its original size centered; if larger, it behaves somewhat like `cover` but ensures the center of the image is visible. `repeat` tiles the image and is only available on iOS. Selecting the appropriate `resizeMode` is crucial for correct visual presentation.

</details></blockquote>

---

## `ImageBackground` Component

A component that allows you to display an image as the background for other child components.

*   Renders children nested inside it, on top of the image.
*   Accepts the same props as `<Image>` (`source`, `style`, `resizeMode`, etc.).
*   Useful for background images for screens or cards.

```typescript
import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

const backgroundImage = require('../assets/images/pharmacy-background.png');

const ScreenWithBackground = () => {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover" // Cover the entire background area
    >
      {/* Children are rendered on top of the background image */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Your Medication Schedule</Text>
        {/* ... other content ... */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Make background fill the screen
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white overlay
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default ScreenWithBackground;
```

> `ImageBackground` is essentially an `<Image>` component that accepts children, simplifying the creation of background image effects.

<blockquote><details>

Sometimes, you need an image to serve as the background for a section of your UI or even the entire screen. While you could achieve this using an `<Image>` component with `position: 'absolute'` and placing other components on top with careful styling, React Native provides the `ImageBackground` component as a more convenient abstraction. You use it much like a `View`, placing child components inside it. It takes the same props as the standard `Image` component, including `source`, `style`, and `resizeMode`. The child components are rendered normally within the `ImageBackground`, appearing visually on top of the image. In the example, `ScreenWithBackground` uses `ImageBackground` with a static `backgroundImage`. The `style={styles.background}` ensures it fills the available space (`flex: 1`). The `resizeMode="cover"` makes the image cover this area. An overlay `View` with a semi-transparent background is placed inside to improve the readability of the `Text` rendered on top. This component simplifies the common pattern of using background images.

</details></blockquote>

---

## Summary: Images and Assets

*   🖼️ **`<Image>`:** Core component for displaying images.
*   📦 **Static Images:** Use `require('./path/to/image.png')`. Bundled by Metro.
    *   Density variants (`@2x`, `@3x`) handled automatically.
    *   Dimensions often inferred, but explicit `width`/`height` recommended.
*   🌐 **Network Images:** Use `source={{ uri: '...' }}`.
    *   **MUST** provide `width` and `height` styles.
*   📐 **`resizeMode`:** Controls scaling (`cover`, `contain`, `stretch`, etc.).
*   🌇 **`<ImageBackground>`:** Use for displaying children on top of a background image.
*   📁 **Organization:** Keep assets in a dedicated folder (e.g., `/assets/images`).

> Handle static and network images appropriately, always providing dimensions for network sources, and use density variants for sharp static assets.

<blockquote><details>

This section covered the essentials of working with images in React Native. We learned about the `<Image>` component and its two main source types: static images included via `require()`, which are bundled with the app and benefit from automatic density variant selection (`@2x`, `@3x`), and network images loaded via `{ uri: '...' }`, which crucially require explicit `width` and `height` styles to be set. We discussed the `resizeMode` prop (`cover`, `contain`, `stretch`) for controlling how images scale within their defined dimensions. We also introduced the `ImageBackground` component as a convenient way to render content on top of a background image. Proper asset organization and providing density variants for static images are key practices for maintainability and visual quality across different devices. Understanding these concepts allows you to effectively incorporate visual elements into your application.

</details></blockquote>