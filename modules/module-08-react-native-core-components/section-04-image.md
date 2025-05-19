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
  - **Lazy Loading:** For lists, ensure images load only when they are about to enter the viewport. `<FlatList>`
