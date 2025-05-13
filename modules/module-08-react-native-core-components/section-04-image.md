## Section 4: Image (`<Image>`) - Displaying Images (Local and Network)

Images are a vital part of most mobile applications, and React Native provides the `<Image>` component for this purpose. This section covers how to display images bundled with your app, loaded from a network URL, or from other sources.

### Conceptual Content: Understanding `<Image>`

The `<Image>` component is used to display different types of images.

**Image Sources (The `source` prop):**

The `source` prop is central and its value type depends on the image origin:

1.  **Static Image Resources:**

    - For images bundled with your project (e.g., in an `assets` folder), use `require()`: `source={require('./path/to/image.png')}`.
    - **Density Suffixes:** React Native automatically selects the best image resolution for the device by looking for `@2x` or `@3x` suffixes (e.g., `my-icon.png`, `my-icon@2x.png`). This ensures crisp images on high-resolution displays.
    - The bundler can often determine dimensions, so explicit `width` and `height` might not always be needed unless for dynamic scaling.

2.  **Network Images:**

    - For remote URLs: `source={{ uri: 'https://example.com/image.jpg' }}`.
    - **Mandatory Dimensions:** You MUST manually specify `width` and `height` via the `style` prop. React Native cannot determine remote image dimensions before download.
    - Use `https` for URLs to comply with App Transport Security (ATS) on iOS.
    - You can send HTTP headers or a body: `source={{ uri: '...', method: 'POST', headers: { Authorization: 'Bearer ...' } }}`.

3.  **Temporary Local Images:**

    - For images on the device's file system (e.g., from camera roll): `source={{ uri: 'file:///path/to/local/image.jpg' }}`. Dimensions usually need to be specified.

4.  **Data URI Images (Base64 encoded):**

    - For embedding image data directly (e.g., from an API): `source={{ uri: 'data:image/png;base64,iVBORw0KGgo...' }}`.
    - Requires manual `width` and `height`. Generally for small, dynamic images due to Base64 string overhead.

5.  **Native Asset Images (Hybrid Apps):**
    - For images in an existing native project's resources (Xcode asset catalogs, Android drawables): `source={{ uri: 'app_icon_name' }}` (asset name without extension for drawables/catalogs) or `source={{ uri: 'asset:/image.png' }}` (Android assets folder).
    - Manual dimensions are also required.

**Key Characteristics of `<Image>`:**

- **Sizing:** As mentioned, `<Image>` components (especially network/data/local URI based) **must have a defined `width` and `height` style** to be visible.
- **Image Formats:** Supports PNG, JPEG, WebP, GIF, BMP. SVG support needs `react-native-svg`.
- **Resize Modes:** The `resizeMode` prop controls how the image is resized. Common values are `cover` (default), `contain`, `stretch`, `repeat` (iOS), and `center`.
- **Styling:** Can be styled using `StyleSheet` for borders, opacity, etc.

> 📲 **(Native Developers):**
>
> **Comparison:** `<Image>` is similar to `UIImageView` on iOS and `ImageView` on Android. React Native handles loading from various sources. The `resizeMode` prop unifies concepts like `contentMode` (iOS) and `ScaleType` (Android). Explicitly defining dimensions for most image sources is crucial.
>
> **Key Takeaway:** `<Image>` is your component for displaying all types of images. Always ensure you specify its dimensions for proper rendering, especially for non-static sources.
>
> **Source:** [React Native Docs: Image](https://reactnative.dev/docs/image)

> 🌐 **(Web Developers):**
>
> **Comparison:** `<Image>` is analogous to the `<img>` tag in HTML. The `source` prop is similar to the `src` attribute. A significant difference is that React Native images require explicit width and height styles for many sources, whereas HTML `<img>` tags often render based on intrinsic size. `resizeMode` is conceptually similar to CSS `object-fit`.
>
> **Key Takeaway:** Use `<Image>` for all image displays. Remember to set `width` and `height` styles, as images won't automatically size to their content like in HTML for many sources.
>
> **Source:** [MDN Web Docs: `<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

### Referential Content: Common `<Image>` Props

| Prop                          | Type                                                             | Description                                                                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `source`                      | `ImageSourcePropType`                                            | Specifies the image source (static `require()`, network URI object, local URI, data URI). See details above.                                                                             |
| `style`                       | `StyleProp<ImageStyle>`                                          | Applies styling. Crucially, **`width` and `height` are required** for network, local URI, and data URI images. Also supports `borderRadius`, `borderColor`, `opacity`, `tintColor`, etc. |
| `resizeMode`                  | `'cover'` (default) `\\                                          | 'contain' \\                                                                                                                                                                             | 'stretch' \\     | 'repeat' \\       | 'center'`                                             | Determines how the image is resized/scaled if its dimensions don't match the view. `repeat` is iOS only. |
| `defaultSource`               | `ImageSourcePropType` (static resource)                          | Placeholder image displayed while the main `source` is loading.                                                                                                                          |
| `loadingIndicatorSource`      | `ImageSourcePropType` (URI only or number)                       | Image source for a loading indicator displayed during download.                                                                                                                          |
| `blurRadius`                  | `number`                                                         | Applies a blur filter to the image (blur radius value).                                                                                                                                  |
| `onError`                     | `(event: {nativeEvent: {error: string}}) => void`                | Callback invoked if an error occurs during image loading.                                                                                                                                |
| `onLoad`                      | `(event: {nativeEvent: {source: {width, height, uri}}}) => void` | Callback invoked when the image has successfully loaded, providing image dimensions.                                                                                                     |
| `onLoadStart`                 | `() => void`                                                     | Callback invoked when the image load process begins.                                                                                                                                     |
| `onLoadEnd`                   | `() => void`                                                     | Callback invoked when the image load process finishes, regardless of success or failure.                                                                                                 |
| `accessibilityLabel`          | `string`                                                         | Alt text for screen readers.                                                                                                                                                             |
| `capInsets`                   | `Rect` (iOS only)                                                | Defines resizable regions for an image (e.g., for stretchable buttons).                                                                                                                  |
| `fadeDuration`                | `number` (Android only)                                          | Duration in milliseconds for a fade-in animation when the image loads (default 300ms).                                                                                                   |
| `progressiveRenderingEnabled` | `boolean` (Android only)                                         | Enables progressive JPEG streaming if the image supports it.                                                                                                                             |
| `source.cache` (iOS only)     | `'default' \\                                                    | 'reload' \\                                                                                                                                                                              | 'force-cache' \\ | 'only-if-cached'` | For network images on iOS, controls caching behavior. |

> 📚 **Official Documentation:**
>
> - [React Native Docs: Image](https://reactnative.dev/docs/image)
> - [React Native Docs: Images (Asset Handling)](https://reactnative.dev/docs/images)
> - [React Native Docs: Image Props](https://reactnative.dev/docs/image-props)
> - [React Native Docs: Image Style Props](https://reactnative.dev/docs/image-style-props)
> - [Expo Docs: Image](https://docs.expo.dev/ui-programming/image/) (Note: Expo Image is a separate, more powerful component)
> - _(Native Docs)_ [Apple Developer: UIImageView contentMode](https://developer.apple.com/documentation/uikit/uiview/contentmode)
> - _(Native Docs)_ [Android Developer: ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType)

### Image Caching & Performance

Effective image handling is crucial for app performance and user experience.

- **iOS `source.cache` Prop:** Provides fine-grained control over caching for network images on iOS (see props table).
- **General Strategies:**
  - **Caching Libraries:** For advanced caching (disk caching, preloading), consider libraries like `react-native-fast-image`.
  - **Image Compression/Optimization:** Always compress and optimize images (e.g., using ImageOptim, TinyPNG) to reduce file sizes.
  - **Appropriate Formats:** Use JPEGs for photos, PNGs for graphics with transparency. WebP often offers better compression.
  - **Resizing to Dimensions:** Serve images from your backend appropriately sized for the display context. Avoid client-side downscaling of very large images.
  - **Lazy Loading:** For lists, ensure images load only when they are about to enter the viewport. `<FlatList>` handles this for its items.
  - **Placeholders:** Use `defaultSource` or `loadingIndicatorSource` for immediate visual feedback.

### "Under the Hood": `<Image>` Internals

**Native Mapping:**

- On iOS, `<Image>` primarily maps to `UIImageView`.
- On Android, `<Image>` maps to `android.widget.ImageView`.

**`resizeMode` to Native Equivalents:**

- **iOS `UIImageView.contentMode`**:
  - `contain` maps to `UIView.ContentMode.scaleAspectFit`.
  - `cover` maps to `UIView.ContentMode.scaleAspectFill`.
  - `stretch` maps to `UIView.ContentMode.scaleToFill`.
  - `center` maps to `UIView.ContentMode.center`.
- **Android `ImageView.ScaleType`**:
  - `contain` maps to `ImageView.ScaleType.FIT_CENTER`.
  - `cover` maps to `ImageView.ScaleType.CENTER_CROP`.
  - `stretch` maps to `ImageView.ScaleType.FIT_XY`.
  - `center` can map to `ImageView.ScaleType.CENTER` or `ImageView.ScaleType.CENTER_INSIDE`.

**Image Loading & Caching Internals:**
React Native's internal image loader handles fetching and loading. On native platforms:

- **iOS:** Uses `NSURLSession` for network requests and can leverage `NSURLCache`. The `source.cache` prop influences these.
- **Android:** Historically used the Fresco library by Facebook for powerful image downloading, caching (memory and disk), and display, supporting features like progressive JPEGs. Specific implementations can evolve.

**Fabric Architecture:**
In Fabric, an `ImageShadowNode` manages props and layout. It instructs the native side (Mounting Layer) to create/update the native `UIImageView` or `android.widget.ImageView`. JSI facilitates more direct communication for events and control, aiming to improve UI responsiveness for image-heavy UIs.

### Procedural Content: Basic `<Image>` Usage

Let's illustrate how to use `<Image>` in our SpeedyMeds app. We'll show how to display a placeholder pill icon (local image) and a hypothetical network image for a medication.

**1. Adding Local Static Images:**

First, you need to place your image file (e.g., `pill-icon.png`) in your project, typically in an `assets` folder (e.g., `./assets/images/pill-icon.png`).

**Short, Self-Contained Example (Local and Network Image):**

```tsx
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

// Assume you have an image named 'pill-icon.png' in './assets/images/'
// For this example to run in a Snack, you'd need to upload the asset or use a network URL.
// We will use a placeholder network URL for the local icon for Snack compatibility.
const localPillIcon = { uri: "https://reactnative.dev/img/tiny_logo.png" }; // Placeholder for local
// const localPillIcon = require('./assets/images/pill-icon.png'); // Actual local usage

export default function MedicationDisplay() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medication Details</Text>

      <View style={styles.medicationItem}>
        <Image
          source={localPillIcon}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.medicationText}>Generic Pill Icon (Local)</Text>
      </View>

      <View style={styles.medicationItem}>
        <Image
          source={{ uri: "https://picsum.photos/seed/medication/100/100" }}
          style={styles.medicationImage}
          resizeMode="cover"
        />
        <Text style={styles.medicationText}>
          Atorvastatin 40mg (Network Image)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  medicationImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 8, // Rounded corners for the medication image
  },
  medicationText: {
    fontSize: 16,
    flexShrink: 1, // Allows text to shrink if container is too small
  },
});
```

**Explanation of the Example:**

1.  **Local Image (`localPillIcon`):**

    - Ideally, local images are loaded using `require('./path/to/image.png')`. The path is relative to the current file.
    - For the example to work seamlessly in an Expo Snack without asset bundling, a placeholder network URI is used for `localPillIcon`. In a real project, you would use `require()`.
    - The `<Image>` component's `source` prop is set to `localPillIcon`.
    - Crucially, `style={styles.icon}` provides `width` and `height` (40x40). Without these, the image might not appear.
    - `resizeMode="contain"` ensures the entire icon is visible within the 40x40 area, maintaining its aspect ratio.

2.  **Network Image:**

    - The second `<Image>` loads from a URL: `source={{ uri: 'https://picsum.photos/seed/medication/100/100' }}`. Note the double curly braces: the outer ones for JSX expression, and the inner ones for the JavaScript object `{ uri: '...' }`.
    - `style={styles.medicationImage}` defines `width` and `height` (60x60) and also adds a `borderRadius`.
    - `resizeMode="cover"` ensures the 60x60 area is filled by the image, potentially cropping parts of the image if its aspect ratio doesn't match, but maintaining the aspect ratio of the displayed portion.

3.  **Layout:** The `medicationItem` views use `flexDirection: 'row'` and `alignItems: 'center'` to position the image and text side-by-side.

This example demonstrates the fundamental usage of `<Image>` for both local static assets (conceptually) and network images, highlighting the mandatory `width` and `height` styling and the utility of `resizeMode`.

### Next Steps

Now that you can display text and images, it's time to learn how to capture user input using the `<TextInput>` component.

- [Next Section: TextInput (`<TextInput>`) - User Input](./section-05-textinput.md)
