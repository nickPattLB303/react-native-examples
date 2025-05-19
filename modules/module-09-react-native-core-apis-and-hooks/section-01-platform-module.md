## Section 1: Platform Module

React Native allows you to build applications for multiple platforms from a single codebase. However, there are often times when you need to apply platform-specific styles, implement different logic, or even render entirely different components based on whether the app is running on iOS or Android. The `Platform` module is React Native's built-in solution for handling these scenarios.

### Conceptual Content

The `Platform` module provides information about the platform your application is currently running on. This is crucial for tailoring the user experience to meet platform conventions and for accessing platform-specific functionalities when necessary. For instance, UI patterns often differ between iOS and Android; iOS apps might have a certain type of header, while Android apps might use Material Design components with different navigation patterns. The `Platform` module helps you gracefully manage these differences.

**Why use the `Platform` module?**

- **Platform-Specific Styling:** Apply different styles (e.g., padding, fonts, colors) to components depending on the OS. For example, the status bar height on iOS might require additional top padding for your content, which is not needed on Android.
- **Conditional Logic:** Execute different pieces of code based on the platform. This could involve calling different functions, setting different default values, or handling user interactions in a platform-aware manner.
- **Rendering Platform-Specific Components:** Sometimes, a UI element or behavior is so distinct that it warrants using a completely different component for each platform. `Platform.select()` can help manage this.

### Referential Content

The `Platform` module exposes several key properties and methods:

- **`Platform.OS`**: A string that indicates the operating system. It returns:

  - `'ios'` when the app is running on iOS.
  - `'android'` when the app is running on Android.
  - `'web'` when the app is running on the web (though our primary focus is native mobile).
  - Other values like `'macos'` or `'windows'` might appear if you are targeting desktop platforms with React Native extensions.

- **`Platform.Version`**: A string or number representing the version of the operating system.

  - On Android, `Platform.Version` is a number representing the Android API level (e.g., `33` for Android 13).
  - On iOS, `Platform.Version` is a string representing the OS version (e.g., `"16.4"`).
  - It can also return version information for other platforms like `web`, `windows`, or `macos`.

- **`Platform.constants`**: An object containing various platform-specific constants. This is particularly useful for finer-grained device-specific logic or analytics. Some key constants are detailed below, and a summary of important ones is provided in the table.
  - `isTesting` (boolean): Indicates if the app is running in a test environment.
  - `reactNativeVersion` (object): Contains `major`, `minor`, `patch`, and optional `prerelease` numbers for the React Native version.
  - **Android-specific constants:**
    - `Version` (number): Android API Level.
    - `Release` (string): Android OS release name (e.g., "12").
    - `Serial` (string): Hardware serial number.
    - `Fingerprint` (string): Build fingerprint.
    - `Model` (string): End-user-visible device name.
    - `Brand` (string): Consumer-visible brand.
    - `Manufacturer` (string): Device manufacturer.
    - `uiMode` (string): UI mode (e.g., 'normal', 'tv', 'car').
  - **iOS-specific constants:**
    - `forceTouchAvailable` (boolean): Indicates if 3D Touch is available.
    - `interfaceIdiom` (string): Interface type (e.g., 'phone', 'pad', 'vision').
    - `osVersion` (string): OS version string.
    - `systemName` (string): OS name (e.g., "iOS").
  - **Other useful constants (may be on one or both platforms):**
    - `isPad` (boolean, iOS only): True if the device is an iPad.
    - `isTV` (boolean): True if the device is an Apple TV or Android TV.
    - `isVision` (boolean, iOS only): True if the device is an Apple Vision Pro.

> [!NOTE]
> The availability of specific constants can vary slightly between React Native versions. Always consult the latest official documentation for the most current list of all available constants.

The following table summarizes some of the key `Platform.constants` properties.

**Table: Key `Platform.constants` Properties**

| Constant Name         | Type    | Description                                     | Platform(s) |
| --------------------- | ------- | ----------------------------------------------- | ----------- |
| `isTesting`           | boolean | True if app is in a test environment            | Both        |
| `reactNativeVersion`  | object  | {major, minor, patch, prerelease?} of RN        | Both        |
| `Version`             | number  | Android API Level                               | Android     |
| `Release`             | string  | Android OS Release (e.g., "12")                 | Android     |
| `Model`               | string  | End-user visible device name                    | Android     |
| `Brand`               | string  | Consumer-visible brand                          | Android     |
| `Manufacturer`        | string  | Device manufacturer                             | Android     |
| `uiMode`              | string  | UI mode (e.g., 'normal', 'tv')                  | Android     |
| `forceTouchAvailable` | boolean | True if 3D Touch is available                   | iOS         |
| `interfaceIdiom`      | string  | Interface type (e.g., 'phone', 'pad', 'vision') | iOS         |
| `osVersion`           | string  | OS version string                               | iOS         |
| `systemName`          | string  | OS name (e.g., "iOS")                           | iOS         |
| `isPad`               | boolean | True if the device is an iPad                   | iOS         |
| `isTV`                | boolean | True if the device is a TV (Apple/Android)      | Both        |
| `isVision`            | boolean | True if the device is an Apple Vision Pro       | iOS         |

- **`Platform.select(config)`**: This is a utility function that takes an object `config` where keys are platform names (`'ios'`, `'android'`, `'native'`, `'default'`) and values are the corresponding values to return for that platform. It returns the value associated with the current platform (`Platform.OS`).
  - The resolution order is:
    1.  Platform-specific key (e.g., `ios`, `android`).
    2.  `native` (if the platform is iOS or Android and the specific key isn't found).
    3.  `default` (if no other key matches, or for other platforms like web).
  - If none of the above conditions are met, `undefined` is returned.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Platform Specific Code](https://reactnative.dev/docs/platform-specific-code) (Covers `Platform.OS`, `Platform.select`, and platform-specific file extensions)
> - [React Native Docs: Platform API](https://reactnative.dev/docs/platform) (Covers `Platform.Version` and `Platform.constants`)

### Procedural Content

Let's look at some common ways to use the `Platform` module in your SpeedyMeds application.

**1. Displaying Different Text Based on OS**

This example shows how to display a different welcome message for iOS and Android users using `Platform.OS`.

```tsx
import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";

const WelcomeMessage: React.FC = () => {
  const message =
    Platform.OS === "ios"
      ? "Welcome, SpeedyMeds iOS User!"
      : "Welcome, SpeedyMeds Android User!";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeMessage;
```

This code checks `Platform.OS`. If it's `'ios'`, one message is assigned; otherwise, the Android message is assigned. This is a straightforward way to implement simple conditional logic for small pieces of content.

**2. Checking Platform Version**

This example demonstrates how to check `Platform.Version` for more specific logic.

```tsx
import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

const OSVersionInfo: React.FC = () => {
  let versionInfoMessage: string = "";
  let actionMessage: string = "";

  if (Platform.OS === "ios") {
    const majorVersionIOS = parseInt(String(Platform.Version), 10);
    versionInfoMessage = `iOS Version: ${Platform.Version} (Major: ${majorVersionIOS})`;
    if (majorVersionIOS < 15) {
      actionMessage =
        "This iOS version is older than 15. Some SpeedyMeds features might be limited.";
    } else {
      actionMessage = "This iOS version supports all SpeedyMeds features.";
    }
  } else if (Platform.OS === "android") {
    const apiLevel = Platform.Version as number; // Platform.Version is number for Android
    versionInfoMessage = `Android API Level: ${apiLevel}`;
    if (apiLevel < 26) {
      // Android Oreo
      actionMessage =
        "This Android API level is older than Oreo. Some SpeedyMeds features might be limited.";
    } else {
      actionMessage =
        "This Android API level supports all SpeedyMeds features.";
    }
  } else {
    versionInfoMessage = `OS: ${Platform.OS}, Version: ${Platform.Version}`;
    actionMessage =
      "SpeedyMeds feature compatibility unknown for this platform.";
  }

  return (
    <View style={stylesForVersion.container}>
      <Text style={stylesForVersion.text}>{versionInfoMessage}</Text>
      <Text style={stylesForVersion.text}>{actionMessage}</Text>
    </View>
  );
};

const stylesForVersion = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#e8e8e8",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default OSVersionInfo;
```

This snippet shows how to parse the iOS version string to get a major version number and how to directly use the Android API level for conditional logic relevant to app features.

**3. Using Platform Constants**

This example demonstrates accessing various constants from `Platform.constants`.

```tsx
import React from "react";
import { Platform, Text, View, StyleSheet, ScrollView } from "react-native";

const DeviceConstantsInfo: React.FC = () => {
  const rnVersion = Platform.constants.reactNativeVersion;
  const rnVersionString = `${rnVersion.major}.${rnVersion.minor}.${
    rnVersion.patch
  }${rnVersion.prerelease ? `-${rnVersion.prerelease}` : ""}`;

  return (
    <ScrollView contentContainerStyle={stylesForConstants.container}>
      <Text style={stylesForConstants.title}>SpeedyMeds Device Info</Text>
      <Text style={stylesForConstants.text}>
        React Native Version: {rnVersionString}
      </Text>
      <Text style={stylesForConstants.text}>OS: {Platform.OS}</Text>
      <Text style={stylesForConstants.text}>
        OS Version/API Level: {Platform.Version}
      </Text>

      {Platform.OS === "android" && (
        <>
          <Text style={stylesForConstants.text}>
            Android Model: {Platform.constants.Model}
          </Text>
          <Text style={stylesForConstants.text}>
            Android Brand: {Platform.constants.Brand}
          </Text>
          <Text style={stylesForConstants.text}>
            Android Manufacturer: {Platform.constants.Manufacturer}
          </Text>
          <Text style={stylesForConstants.text}>
            Android UI Mode: {Platform.constants.uiMode}
          </Text>
        </>
      )}

      {Platform.OS === "ios" && (
        <>
          <Text style={stylesForConstants.text}>
            iOS System Name: {Platform.constants.systemName}
          </Text>
          <Text style={stylesForConstants.text}>
            iOS Interface Idiom: {Platform.constants.interfaceIdiom}
          </Text>
          <Text style={stylesForConstants.text}>
            Is iPad: {Platform.isPad ? "Yes" : "No"}
          </Text>
          <Text style={stylesForConstants.text}>
            Force Touch Available:{" "}
            {Platform.constants.forceTouchAvailable ? "Yes" : "No"}
          </Text>
        </>
      )}

      <Text style={stylesForConstants.text}>
        Is TV: {Platform.isTV ? "Yes" : "No"}
      </Text>
      {Platform.OS === "ios" && (
        <Text style={stylesForConstants.text}>
          Is Vision Pro: {Platform.isVision ? "Yes" : "No"}
        </Text>
      )}
      <Text style={stylesForConstants.text}>
        Is Testing Environment: {Platform.constants.isTesting ? "Yes" : "No"}
      </Text>
    </ScrollView>
  );
};

const stylesForConstants = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f0f8ff", // AliceBlue
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
    color: "#2c3e50", // MidnightBlue
  },
});

export default DeviceConstantsInfo;
```

This component dynamically displays several pieces of information sourced from `Platform.constants`, tailoring some output based on the OS.

**4. Applying Platform-Specific Styles with `Platform.select()`**

Often, you need to adjust styles. For example, iOS typically requires more top padding to account for the status bar, especially if you are not using a library that handles safe areas automatically.

```tsx
import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";

const HeaderComponent: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>SpeedyMeds Patient List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#007AFF", // A common blue for headers
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        paddingTop: 44, // Approximate status bar height on notched iPhones
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        paddingTop: 20, // More typical padding on Android
        paddingBottom: 20,
        elevation: 4, // Android-specific shadow
      },
      default: {
        paddingVertical: 20,
      },
    }),
  },
  headerText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HeaderComponent;
```

In this `HeaderComponent`, the `paddingTop` and shadow styles are different for iOS and Android. `Platform.select()` makes it clean to define these variations directly within the `StyleSheet` object. The `'default'` case ensures some padding is applied if the platform isn't explicitly iOS or Android (though less common in pure mobile development).

**5. Rendering Different Components with `Platform.select()` (Conceptual)**

Sometimes, styling isn't enough, and you need entirely different components. Imagine a date picker: iOS has a native wheel-style picker, while Android has a Material Design calendar picker. `Platform.select()` can return component constructors.

```tsx
import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";

// Assume these are two distinct custom components you've created:
// import IOSDatePicker from './IOSDatePicker';
// import AndroidDatePicker from './AndroidDatePicker';

// For demonstration, let's use simple Text components:
const IOSDatePicker = () => <Text style={styles.text}>iOS Date Picker UI</Text>;
const AndroidDatePicker = () => (
  <Text style={styles.text}>Android Date Picker UI</Text>
);

const PlatformSpecificDatePicker: React.FC = () => {
  const SpecificDatePicker = Platform.select({
    ios: () => IOSDatePicker,
    android: () => AndroidDatePicker,
    default: () => () => <Text style={styles.text}>Default Picker</Text>, // Fallback component
  })(); // Immediately invoke the function returned by Platform.select

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Refill Date:</Text>
      <SpecificDatePicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    padding: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

export default PlatformSpecificDatePicker;
```

This example conceptually shows how `Platform.select` can return a function that resolves to the correct component. For real date pickers, you'd typically use a library that handles this abstraction for you (like `react-native-datetimepicker`), but this illustrates the pattern for custom components.

### "Under the Hood": How `Platform` Works

The `Platform` module is a native module. This means that its core logic for determining the OS and its properties resides in native code (Java/Kotlin for Android, Objective-C/Swift for iOS).

- **Initialization:** When your React Native application starts, the native side gathers relevant platform information from the device (like OS type, version, device model, screen density, etc.).
- **Exporting Constants:** This information is then exposed to the JavaScript environment as constants. `Platform.OS`, `Platform.Version`, and all the values within `Platform.constants` are essentially JavaScript representations of these natively-derived values.
- **Access in JS:** When your JavaScript code accesses `Platform.OS` or `Platform.constants.Model`, it's reading a pre-populated value that was determined natively during the app's startup. There isn't a dynamic "check" to the native side for every access of these basic properties; rather, these are constants available in the JS context after the native module initializes.
  - On Android, native code might use `android.os.Build.VERSION.SDK_INT` for `Platform.Version`, `android.os.Build.MODEL` for `Platform.constants.Model`, etc.
  - On iOS, native code might use `UIDevice.current.systemName` for `Platform.constants.systemName`, `UIDevice.current.systemVersion` for `Platform.Version`, and `UIDevice.current.userInterfaceIdiom` to determine `Platform.isPad` or `Platform.constants.interfaceIdiom`.

This native sourcing ensures accuracy, as the information comes directly from the operating system's APIs. The `Platform.select()` method is a JavaScript utility that uses the already available `Platform.OS` value to pick the correct configuration from the object you provide.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:**
>
> - In native iOS development, you might use compiler directives like `#if os(iOS)` or `#if targetEnvironment(simulator)`, or runtime checks like `UIDevice.current.systemName` or `if #available(iOS 15, *) { ... }`. `Platform.constants.osVersion` is similar to `UIDevice.current.systemVersion`, and `Platform.isPad` corresponds to checking `UIDevice.current.userInterfaceIdiom == .pad`.
> - For Android, you'd use `Build.VERSION.SDK_INT` for API level checks (like `Platform.Version`), `Build.MODEL` for device model (`Platform.constants.Model`), and resource qualifiers (e.g., `layout-sw600dp`, `values-v21`) for layouts/styles. Android Build Flavors allow for even more extensive build-time code/resource variations, which is a more powerful version of what React Native's platform-specific file extensions (`.android.tsx`) achieve.
>
> **Key Takeaway:** React Native's `Platform` module centralizes this logic in JavaScript, providing a unified API to query platform information. This simplifies cross-platform logic compared to managing separate native code checks for many common scenarios. However, for deep native integrations or extensive build-time variations, platform-specific files or native modules might still be necessary.
>
> **Source:** [Swift Conditional Compilation](https://docs.swift.org/swift-book/ReferenceManual/Statements.html#grammar_conditional-compilation-block), [Android Build Variants](https://developer.android.com/studio/build/build-variants), [Android Providing Resources](https://developer.android.com/guide/topics/resources/providing-resources)

> 🌐 **(Web Developers):**
>
> **Comparison:** Web developers often resort to parsing the `navigator.userAgent` string to detect browsers or operating systems, which can be unreliable and complex. The `Platform` module in React Native is more robust and explicit for its supported native platforms. Platform-specific file extensions (`.ios.tsx`, `.android.tsx`) are conceptually similar to having different entry points or using conditional imports managed by a web bundler (like Webpack or Rollup) based on environment variables. Furthermore, bundlers like Metro can perform "platform shaking" by statically analyzing `Platform.OS` checks. This process can remove dead code paths intended for other platforms from the final bundle, an optimization akin to tree-shaking in web bundlers.
>
> **Key Takeaway:** `Platform.OS` and `Platform.select()` offer a cleaner, more reliable way to handle platform differences than user-agent sniffing. It's specifically tailored for the React Native environment, with build-time optimizations possible.
>
> **Source:** [Expo Tree Shaking](https://docs.expo.dev/guides/tree-shaking/)

Using the `Platform` module effectively allows you to embrace the unique strengths and conventions of each platform while maintaining a largely shared codebase for your SpeedyMeds application.

### Next Steps

Understanding the `Platform` module allows you to tailor your application to different operating systems. Next, you'll learn how to get information about the device's screen dimensions to create responsive UIs using the `Dimensions` API. Proceed to [Section 2: Dimensions API](./section-02-dimensions-api.md).
