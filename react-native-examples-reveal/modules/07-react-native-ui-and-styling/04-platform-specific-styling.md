# 04: Platform-Specific Styling 📱

While React Native aims for cross-platform consistency, sometimes you need to apply different styles or even use different components based on whether the app is running on iOS or Android. This might be due to platform design guidelines, differing component behaviors, or specific API availability.

*   Use the `Platform` module to detect the current OS.
*   Apply conditional styles using `Platform.OS` or `Platform.select`.
*   Utilize platform-specific file extensions (`.ios.js`, `.android.js`) for larger differences.

> Applying platform-specific styles helps create a more native look and feel on each platform.

<blockquote><details>

React Native's philosophy is "Learn once, write anywhere," but achieving a truly native user experience often requires acknowledging and adapting to the subtle (and sometimes not-so-subtle) differences between iOS and Android design languages and capabilities. Blindly applying identical styles across both platforms can sometimes lead to an app feeling slightly "off" or unnatural to users accustomed to their platform's conventions. React Native provides several mechanisms to handle these differences gracefully. The primary tool is the built-in `Platform` module, which allows your JavaScript code to query the operating system it's currently running on. This enables conditional logic within your styling definitions or component rendering. For more significant divergences, React Native's bundler (Metro) supports platform-specific file extensions, allowing you to create entirely separate versions of a component or module for iOS and Android.

</details></blockquote>

---

## The `Platform` Module

React Native provides a `Platform` module that exposes platform-specific information.

*   `Platform.OS`: Returns `'ios'` or `'android'` (or others like `'web'`, `'windows'`, `'macos'`).
*   `Platform.Version`: Returns the OS version (e.g., Android API level as a number, iOS version as a string).
*   `Platform.select(config)`: A helper function to select a value based on the current platform.

```typescript
import { Platform, StyleSheet } from 'react-native';

console.log(`Running on: ${Platform.OS}`); // Outputs 'ios' or 'android'
console.log(`OS Version: ${Platform.Version}`);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Add padding only on iOS
  },
});
```

> `Platform.OS` is commonly used for simple conditional checks in styles or logic.

<blockquote><details>

The `Platform` module is your main entry point for writing platform-aware code. You can import it directly from `react-native`. The most frequently used property is `Platform.OS`, which simply returns a string identifying the current operating system. This allows for straightforward conditional checks using standard JavaScript `if` statements or ternary operators, as shown in the example where `paddingTop` is applied only if `Platform.OS` equals `'ios'`. This is often used to account for the iOS status bar area. `Platform.Version` can be useful if you need to target specific OS versions, for example, to use a newer API or work around a bug present only in older versions. Be mindful that `Platform.Version` returns different types for iOS (string like `'15.4'`) and Android (number like `31`). The `Platform.select` method, covered next, provides a more structured way to handle platform-specific values.

</details></blockquote>

---

## `Platform.select()`

A convenient way to define platform-specific values within style objects or component logic.

*   Takes a configuration object with keys like `ios`, `android`, `native`, `default`.
*   Returns the value corresponding to the current `Platform.OS`.
*   `native` key applies to both `ios` and `android`.
*   `default` key is used if the current OS doesn't match any other key.

```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.select({
      ios: '#F0F0F0', // Lighter gray for iOS
      android: '#FFFFFF', // White for Android
      default: '#FFFFFF', // Fallback
    }),
    paddingVertical: 10,
  },
  headerText: {
    fontSize: Platform.select({
      ios: 17,
      android: 18,
      default: 16,
    }),
    fontWeight: Platform.select({
      ios: '600', // Semibold on iOS
      android: 'bold', // Bold on Android
      default: 'normal',
    }),
  },
  // Example using 'native'
  shadow: Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
      },
      android: {
          elevation: 4,
      },
      // 'native' could be used if some style applied to both
  }),
});
```

> `Platform.select` keeps platform-specific variations clean and colocated within the style definition.

<blockquote><details>

`Platform.select()` offers a structured and readable alternative to multiple ternary operators or `if` statements when defining values that differ across platforms. You provide an object where keys are platform names (`ios`, `android`, etc.) and values are the desired outputs for those platforms. `Platform.select` automatically picks the value associated with the current `Platform.OS`. The example demonstrates using it for `backgroundColor`, `fontSize`, and `fontWeight`. It's particularly useful for handling properties that are entirely different between platforms, like shadows (`shadow*` properties on iOS vs. `elevation` on Android). By defining the platform variations directly within the `StyleSheet` using `Platform.select`, you make the platform-specific logic explicit and easy to understand right where the style is defined. The `native` key can be a shortcut if a value applies to both mobile platforms but not others (like web), and `default` provides a necessary fallback.

</details></blockquote>

---

## Example: Platform-Specific Button Styling

Applying different padding and text weight for a "Refill Prescription" button.

```typescript
import React from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';

/**
 * A button for refilling prescriptions with platform-specific styling.
 * @param {object} props - Component props.
 * @param {() => void} props.onPress - Function to call on press.
 * @returns {JSX.Element} A styled Pressable component.
 */
const RefillButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonBase,
        pressed ? styles.buttonPressed : styles.buttonIdle,
      ]}
    >
      <Text style={styles.buttonText}>Refill Prescription</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    backgroundColor: '#2E7D32', // Green color for action
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // Platform-specific padding using Platform.select
    paddingVertical: Platform.select({
      ios: 12,
      android: 10,
      default: 10,
    }),
    paddingHorizontal: 20,
    // Platform-specific shadow/elevation
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
        },
        android: {
            elevation: 3,
        },
    }),
  },
  buttonIdle: {
    opacity: 1,
  },
  buttonPressed: {
    opacity: 0.8, // Dim slightly when pressed
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    // Platform-specific font weight
    fontWeight: Platform.select({
      ios: '500', // Medium weight on iOS
      android: 'bold', // Bold on Android (often renders heavier)
      default: 'bold',
    }),
  },
});

export default RefillButton;
```

<blockquote><details>

This example demonstrates applying platform-specific styles to a custom `RefillButton` component built with `Pressable`. We use `Platform.select` within the `StyleSheet.create` definition for several properties. `paddingVertical` is slightly larger on iOS (12) than on Android (10) to better match typical platform button heights. The `fontWeight` of the button text is set to `'500'` (medium) on iOS but `'bold'` on Android; this is a common adjustment because Android's default bold often appears heavier than iOS's, and `'500'` might look too light on Android. We also use the spread syntax (`...`) with `Platform.select` to apply the entire shadow/elevation style object conditionally. This keeps the platform-specific shadow implementation details neatly contained. The base styles (background color, border radius, alignment) remain common, while specific visual tweaks are applied per platform, leading to a button that feels more integrated into its respective OS environment.

</details></blockquote>

---

## Platform-Specific File Extensions (`.ios.js`, `.android.js`)

For more significant differences where conditional logic becomes complex, or when using platform-specific components/APIs, you can create separate files for each platform.

*   Create `MyComponent.ios.tsx` and `MyComponent.android.tsx`.
*   React Native's bundler (Metro) automatically picks the correct file based on the platform.
*   Import the component as usual: `import MyComponent from './MyComponent';`

**Example File Structure:** 

```
/components
/DatePicker
DatePicker.ios.tsx # iOS implementation (e.g., using UIDatePicker)
DatePicker.android.tsx # Android implementation (e.g., using @react-native-community/datetimepicker)
```


> Use this approach when the component implementation differs significantly between platforms, not just for minor style tweaks.

<div class="android-dev">🤖 **Android Devs:** Think of this like having different layout XML files in `layout/` vs `layout-land/` or using resource qualifiers, but at the code file level.</div>
<div class="ios-dev">🍏 **iOS Devs:** Similar to using `#if os(iOS)` checks in Swift, but abstracted by the build system selecting the entire file.</div>
<div class="react-dev">⚛ **React Devs:** This is a build-time feature specific to React Native, allowing code splitting based on the target platform.</div>
<div class="angular-dev">🅰 **Angular Devs:** Conceptually similar to using environment files or build configurations to include different modules/components, but integrated directly into the module resolution system.</div>

<blockquote><details>

When the differences between platforms go beyond simple style adjustments – for instance, if you need to use entirely different native modules, render fundamentally different component trees, or implement complex platform-specific logic – using the `Platform` module for inline checks can make your code messy and hard to maintain. React Native offers a powerful solution via its bundler: platform-specific file extensions. If you create files like `MyComponent.ios.tsx` and `MyComponent.android.tsx` alongside a base `MyComponent.tsx` (or instead of it), Metro will automatically resolve `import MyComponent from './MyComponent'` to the platform-appropriate file during the build process. This allows you to completely separate the implementations. The iOS build will bundle `MyComponent.ios.tsx`, and the Android build will bundle `MyComponent.android.tsx`. This is ideal for wrapping native UI components (like date pickers, maps, etc.) that have distinct APIs or appearances on each platform, keeping your cross-platform code clean and delegating platform specifics to dedicated files.

</details></blockquote>

---

## Summary: Platform-Specific Styling

*   📱 Acknowledge platform differences for a better native feel.
*   🔧 Use `Platform.OS` for simple conditional checks (e.g., `Platform.OS === 'ios'`).
*   ✨ Use `Platform.select({...})` for clean, colocated platform variations within styles or logic.
*   影 Apply platform-specific shadows/elevation using `Platform.select`.
*   📄 Use platform-specific file extensions (`.ios.tsx`, `.android.tsx`) for significant implementation differences or platform-specific components/APIs.
*   ⚖️ Balance cross-platform consistency with native conventions.

> Choose the right technique based on the complexity of the platform difference. Start with `Platform.select` for styles, and consider file extensions for larger divergences.

<blockquote><details>

This section covered the essential techniques for handling platform differences in React Native styling and component implementation. We introduced the `Platform` module, focusing on `Platform.OS` for basic checks and `Platform.select` as a structured way to define platform-specific values, especially useful within `StyleSheet` definitions for properties like padding, font weights, or shadows/elevation. We also discussed the use of platform-specific file extensions (`.ios.js`/`.android.js`) as a powerful mechanism provided by the Metro bundler to completely separate component implementations when necessary. The key takeaway is to be aware of platform conventions and use these tools judiciously to enhance the user experience by making your app feel more at home on both iOS and Android, without sacrificing the efficiency of a shared codebase where possible.

</details></blockquote>