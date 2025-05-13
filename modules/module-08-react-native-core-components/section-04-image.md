## Section 4: Image (`<Image>`) - Displaying Images (Local and Network)

Images are a vital part of most mobile applications, and React Native provides the `<Image>` component for this purpose. This section covers how to display both images bundled with your app (local images) and images loaded from a network URL.

### Conceptual Content: Understanding `<Image>`

The `<Image>` component is used to display different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.

**Key Characteristics of `<Image>`:**

- **Source Specification:** You specify the image source using the `source` prop. This prop can accept a URI for network images or a `require()` call for local static images.
- **Sizing:** Unlike on the web, an `<Image>` component in React Native **must have a defined size** (width and height) to be visible, unless it's an SVG or uses `aspectRatio`. If you don't provide explicit dimensions, the image might not render or render with a zero size.
- **Image Formats:** Supports common image formats like PNG, JPEG, WebP, GIF, and BMP. SVG support can be added with libraries like `react-native-svg`.
- **Resize Modes:** The `resizeMode` prop controls how the image should be resized to fit its container when the image dimensions do not match the container dimensions. Common values include `cover`, `contain`, `stretch`, `repeat`, and `center`.
- **Styling:** `<Image>` components can be styled using the `StyleSheet` API, allowing you to control borders, opacity, background color (visible if the image has transparency), and layout.

> 📲 **(Native Developers):**
>
> **Comparison:** `<Image>` is similar to `UIImageView` on iOS and `ImageView` on Android. React Native handles the loading and display of images from various sources (network, local assets) and provides a consistent API. The need to explicitly define dimensions for images is a key point to remember, as native image views might sometimes infer size from the image content itself.
>
> **Key Takeaway:** `<Image>` is your component for displaying all types of images. Always ensure you specify its dimensions for proper rendering.
>
> **Source:** [React Native Docs: Image](https://reactnative.dev/docs/image)

> 🌐 **(Web Developers):**
>
> **Comparison:** `<Image>` is analogous to the `<img>` tag in HTML. The `source` prop is similar to the `src` attribute. A significant difference is that React Native images require explicit width and height styles to render, whereas HTML `<img>` tags often render based on the image's intrinsic size if dimensions aren't specified.
>
> **Key Takeaway:** Use `<Image>` for all image displays. Remember to set `width` and `height` styles, as images won't automatically size to their content like in HTML.
>
> **Source:** [MDN Web Docs: `<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

### Referential Content: Common `<Image>` Props

- `source`: (ImageSourcePropType) The source of the image. This can be an object with a `uri` key for network images (e.g., `{ uri: 'https://example.com/image.png' }`) or the result of a `require()` call for local static images (e.g., `require('./my-icon.png')`).
- `style`: Accepts a style object. For `<Image>`, you MUST provide `width` and `height` in the style for the image to be visible. Other common style props include `borderRadius`, `borderColor`, `borderWidth`, `opacity`, etc.
  - _Type:_ `StyleProp<ImageStyle>`
- `resizeMode`: (enum: `'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) Determines how to resize the image when the frame doesn't match the raw image dimensions.
  - `cover`: Scales the image uniformly (maintaining aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view. The image is then centered within the view.
  - `contain`: Scales the image uniformly (maintaining aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view. The entire image is visible.
  - `stretch`: Scales width and height independently, this may change the aspect ratio of the src.
  - `center`: Centers the image within the view, without scaling.
  - `repeat`: Repeats the image to cover the frame of the view. (iOS only)
- `defaultSource`: (ImageURISource) A static image to display while the image `source` is loading. Requires `width` and `height` to be set.
- `loadingIndicatorSource`: (ImageURISource | ImageURISource[] | number) Similar to `defaultSource`, but an indicator image to display while the primary image is loading.
- `onError`: (function) Invoked on load error. The parameter is an event containing `{ nativeEvent: { error } }`.
- `onLoad`: (function) Invoked when load completes successfully.
- `onLoadEnd`: (function) Invoked when load either succeeds or fails.
- `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`: For accessibility.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Image Props](https://reactnative.dev/docs/image-props)
> - [React Native Docs: Image Style Props](https://reactnative.dev/docs/image-style-props)
> - [Expo Docs: Image](https://docs.expo.dev/ui-programming/image/)

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
