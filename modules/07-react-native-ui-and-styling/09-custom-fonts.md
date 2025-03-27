# 09: Custom Fonts 🖋️

Using custom fonts allows you to maintain brand consistency and achieve specific typographic aesthetics in your React Native application, going beyond the default system fonts. Expo provides a straightforward way to load and use custom fonts.

*   **Purpose:** Branding, unique UI style, improved typography.
*   **Formats:** Supports `.ttf` (TrueType) and `.otf` (OpenType) font files.
*   **Loading:** Use the `expo-font` package (`useFonts` hook or `Font.loadAsync`).
*   **Usage:** Apply via the `fontFamily` style property.

> Custom fonts enhance the visual identity and readability of your app.

<div class="android-dev">🤖 **Android Devs:** Similar to adding `.ttf` or `.otf` files to `res/font` and referencing them using `@font/my_font` or programmatically via `Typeface`. Expo abstracts the loading process.</div>
<div class="ios-dev">🍏 **iOS Devs:** Analogous to adding font files to your project, ensuring they're listed in `Info.plist` (under `UIAppFonts`), and then referencing them by their PostScript name. Expo handles the setup.</div>
<div class="react-dev">⚛ **React Devs:** Like using `@font-face` in CSS to declare custom fonts and then applying them with `font-family`. The loading mechanism (`useFonts`) is specific to Expo/React Native.</div>
<div class="angular-dev">🅰 **Angular Devs:** Similar to defining `@font-face` rules in your global CSS/SCSS and using the `font-family` property. Expo provides the loading mechanism.</div>

<blockquote><details>

While system fonts provide a good baseline, custom fonts are often essential for aligning a mobile application with specific brand guidelines or achieving a desired visual tone. React Native, particularly within the Expo ecosystem, makes incorporating custom fonts relatively simple. You'll need the font files themselves, typically in `.ttf` or `.otf` format. These files are added to your project assets, usually in a dedicated `assets/fonts` directory. The core mechanism for making these fonts available to your application is the `expo-font` library. This library provides functions (like `Font.loadAsync`) and hooks (`useFonts`) to load the font files from your assets into memory when the app starts. Once loaded, you can reference the font by a specific name (which you define during loading) within the `fontFamily` style property applied to your `<Text>` components. It's crucial to ensure fonts are fully loaded *before* attempting to use them in your UI to prevent errors or visual glitches.

</details></blockquote>

---

## Loading Fonts with `expo-font`

Expo simplifies font loading using the `expo-font` library.

**1. Installation:**

```bash
npx expo install expo-font
```

**2. Add Font Files:**
Place your `.ttf` or `.otf` files in an assets directory (e.g., `assets/fonts/`). 