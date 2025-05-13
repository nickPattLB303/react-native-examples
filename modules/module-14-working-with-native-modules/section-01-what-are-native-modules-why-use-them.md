## Section 1: What are Native Modules? Why Use Them?

This section introduces the fundamental concept of native modules in React Native. You'll learn what they are, how they facilitate communication between JavaScript and native code, and the key reasons and scenarios for incorporating them into your applications.

### What are Native Modules?

Native modules are custom pieces of native code—written in Java or Kotlin for Android, and Swift or Objective-C for iOS—that are "bridged" or exposed to your JavaScript/TypeScript code. This allows your React Native application to execute native platform-specific functionality that isn't available through standard React Native APIs or JavaScript itself.

In the **legacy React Native architecture**, communication between JavaScript and native code happens asynchronously across a "bridge." JavaScript would send messages to the native side, and native code would send messages back. While effective, this bridge had inherent overhead and limitations, especially for synchronous operations or high-frequency communication.

The **New Architecture** introduces the JavaScript Interface (JSI), which allows for direct, synchronous communication between JavaScript and native code. This significantly improves performance and opens up new possibilities for native module development. We'll touch more on JSI and TurboModules (the New Architecture's native modules) later in this module. For now, understand that native modules are the mechanism for this JavaScript-to-native interaction, regardless of the underlying architecture.

### Why Use Native Modules?

While React Native and Expo provide a rich set of APIs, there are several compelling reasons why you might need to use or create native modules:

1.  **Accessing Platform-Specific APIs and Features:**
    This is the most common reason. Mobile operating systems (iOS and Android) offer a vast range of APIs for device hardware (like specific sensors, Bluetooth Low Energy), system services (like calendars, contacts, alarms), or unique OS-level features that are not exposed by React Native's core components or common community libraries.

2.  **Reusing Existing Native Code or Libraries:**
    If you or your organization have existing native libraries (e.g., an SDK for an internal service, a complex business logic module written in Swift or Kotlin), native modules allow you to integrate this code directly into your React Native app, saving significant redevelopment effort.

3.  **Performance-Critical Operations:**
    For computationally intensive tasks like image processing, complex calculations, or real-time data manipulation, native code can sometimes offer better performance than JavaScript. While JavaScript engines are highly optimized (especially with Hermes), certain operations may benefit from being offloaded to the native side, particularly if they can leverage multi-threading or specialized hardware acceleration available natively. However, always profile first, as JavaScript is often surprisingly performant.

4.  **Integrating with Third-Party SDKs:**
    Many third-party services (analytics, payment gateways, mapping tools, etc.) provide native SDKs for iOS and Android. If a React Native wrapper doesn't exist or doesn't meet your needs, you'll need to create a native module to bridge the gap.

5.  **Background Tasks and Processes:**
    For tasks that need to run reliably in the background, even when the app isn't in the foreground (e.g., syncing data, tracking location for an extended period), native APIs often provide more robust and OS-compliant solutions than what can be achieved purely in JavaScript.

### Common Scenarios and Use Cases

Here are some practical examples where native modules are essential:

- **Device Hardware Access:**
  - Advanced camera controls beyond basic capture.
  - Interacting with Bluetooth Low Energy (BLE) peripherals.
  - Reading data from specific sensors (e.g., barometer, pedometer, ambient light sensor if not covered by Expo).
  - Implementing biometric authentication (Face ID, Touch ID, Android BiometricPrompt) if more granular control is needed than provided by `expo-local-authentication`.
- **Operating System Features:**
  - Deep integration with the native calendar or contacts.
  - Advanced file system operations or encrypted storage.
  - Custom push notification handling or local notification scheduling with platform-specific features.
  - Inter-app communication or handling custom URL schemes.
- **Specialized Libraries:**
  - Integrating a native charting library for complex visualizations.
  - Using a native PDF generation or manipulation tool.
  - Wrapping a native machine learning library (e.g., Core ML, TensorFlow Lite) for on-device inference.
- **Custom UI Components:**
  While this module focuses on native _modules_ (APIs), a related concept is bridging native _UI components_. If you need a highly specific native UI element not available in React Native (e.g., a platform-specific map view with custom annotations or a specialized video player), you'd create a native UI component. We'll briefly touch on this concept later.

> 🍏 **(iOS Developers):**
>
> **Comparison:** Think of native modules as similar to creating a Swift or Objective-C class that you want to make accessible from another part of your app. In React Native, you'll use specific macros (Objective-C) or attributes (Swift, with `expo-modules-core`) to expose your native methods and properties to the JavaScript runtime. The "bridge" or JSI acts as the intermediary.
>
> **Key Takeaway:** You're leveraging your existing iOS development skills to extend JavaScript's reach into the native iOS environment.
>
> **Source:** [Native Modules (iOS) | React Native](https://reactnative.dev/docs/native-modules-ios)

> 🤖 **(Android Developers):**
>
> **Comparison:** This is akin to creating a Java or Kotlin class with public methods. To expose these to React Native, you'll typically extend `ReactContextBaseJavaModule` or use annotations provided by `expo-modules-core`. These methods can then be invoked from JavaScript.
>
> **Key Takeaway:** Your Android development expertise is directly applicable in creating these Java/Kotlin counterparts to JavaScript functions.
>
> **Source:** [Native Modules (Android) | React Native](https://reactnative.dev/docs/native-modules-android)

> 🌐 **(Web Developers):**
>
> **Comparison:** Imagine if, in web development, you could define your own custom browser APIs (like `navigator.geolocation` or `window.localStorage`) that directly interact with the underlying operating system features of the user's computer. Native modules in React Native give you that power for mobile devices. JavaScript makes calls to these "custom APIs" you've defined, which then execute native code.
>
> **Key Takeaway:** Native modules are your toolkit for breaking out of the JavaScript sandbox and tapping into the rich native capabilities of iOS and Android when standard React Native or Expo APIs don't suffice.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Native Modules Introduction](https://reactnative.dev/docs/native-modules-intro)
> - [Expo Docs: Overview of Expo modules](https://docs.expo.dev/modules/overview/)
> - [Expo Docs: Why use Expo Modules API?](https://docs.expo.dev/modules/overview/#when-should-i-use-turbo-modules-and-when-should-i-use-the-expo-modules-api)
