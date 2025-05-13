## Section 7: Bridging Native UI Components (Conceptual Overview)

This section provides a conceptual overview of bridging native UI components. While creating custom native modules (APIs) is common, sometimes you need to integrate platform-specific UI elements that don't exist in React Native's core or community libraries.

### What are Bridged Native UI Components?

Bridged native UI components (often just called "Native UI Components") are actual native views (e.g., `UIView` subclasses on iOS, `View` subclasses on Android) that are made usable as React components within your JavaScript/TypeScript code. This allows you to embed custom, platform-specific user interface elements directly into your React Native application's component hierarchy.

While React Native provides a rich set of Core Components that render to native widgets, there are scenarios where you might need a truly custom native view that offers functionality or performance characteristics not achievable with standard components or by composing them.

### Why Bridge Native UI Components?

- **Highly Specialized UI Elements:** You might need a UI component that is very platform-specific or offers complex interactions not easily replicated with standard React Native components (e.g., a specialized mapping view, a complex charting library, a native ad banner).
- **Reusing Existing Native UI Code:** If you have existing native UI elements (e.g., a custom video player, a unique data visualization widget) written in Swift/Objective-C or Kotlin/Java, bridging them allows reuse within your React Native app.
- **Performance for Complex Views:** For very complex UIs that involve intricate drawing, gestures, or animations, a native implementation can sometimes offer better performance than a JavaScript-driven equivalent, especially if it leverages native graphics acceleration or gesture systems directly.
- **Access to Native View APIs:** Some native view functionalities or properties might not be exposed through React Native's default abstractions.

### Conceptual Process Overview

Similar to native modules, creating and bridging a native UI component involves several general steps:

1.  **Create the Native View:**

    - **For iOS:** Develop a `UIView` subclass in Swift or Objective-C.
    - **For Android:** Develop a `View` subclass (often extending `FrameLayout` or another suitable layout) in Kotlin or Java.
      This native view will encapsulate the appearance and behavior of your custom UI element.

2.  **Create a View Manager:**

    - **For iOS:** You create an `RCTViewManager` subclass (Objective-C) or conform to similar protocols if using Swift with helper libraries.
    - **For Android:** You create a class that extends `SimpleViewManager` or `ViewGroupManager`.
      The View Manager is responsible for creating instances of your native view and exposing its properties (props) to JavaScript.

3.  **Expose Props:**
    Within the View Manager, you define how JavaScript props map to native view properties. This allows your React component to control the appearance and behavior of the native view (e.g., setting a `color` prop in JS that changes the background color of the native view).

    - iOS: Uses macros like `RCT_EXPORT_VIEW_PROPERTY`.
    - Android: Uses annotations like `@ReactProp`.

4.  **Handle Events (Optional):**
    If your native view generates events (e.g., a button press within the native view, a specific gesture), you need to set up a mechanism to send these events from the native side to the JavaScript side, where they can be handled by your React component (e.g., via an `onCustomEvent` prop).

5.  **JavaScript/TypeScript Component:**
    On the JavaScript side, you'll typically use `requireNativeComponent` to get a reference to your native UI component. This allows you to use it in your JSX like any other React component, passing props to it.

    ```typescript
    // Conceptual example
    import { requireNativeComponent } from "react-native";

    // 'RNTMyCustomView' would be the name registered by your native ViewManager
    const MyCustomNativeView = requireNativeComponent("RNTMyCustomView");

    const App = () => {
      return (
        <MyCustomNativeView
          style={{ width: 200, height: 100 }}
          customText="Hello from Native View!"
          onCustomEvent={(event) => console.log(event.nativeEvent)}
        />
      );
    };

    export default App;
    ```

### Fabric Native Components (New Architecture)

With the New Architecture, the way native UI components are created and managed is also evolving with **Fabric Native Components**.

- Fabric is React Native's new rendering system.
- Fabric Native Components are designed to integrate more seamlessly with this new renderer, leveraging JSI for more direct communication and potentially better performance.
- Similar to TurboModules, Codegen plays a role in generating interface code for Fabric Native Components based on typed specifications (often in TypeScript).

This simplifies the process of defining props and events and ensures type safety between JavaScript and the native view manager.

> [!IMPORTANT]
> Creating custom native UI components is generally more complex than creating native modules (APIs). It requires a deeper understanding of each platform's UI system, layout, and event handling, in addition to the React Native bridging mechanisms.

> [!CAUTION]
> Before deciding to build a custom native UI component, thoroughly explore if the desired UI can be achieved by composing existing React Native Core Components, using community libraries like `react-native-svg` or `react-native-gesture-handler`, or leveraging UI toolkits like React Native Paper. Custom native UI adds significant maintenance overhead.

> 🍏 **(iOS Developers):**
>
> **Comparison:** This is like creating a custom `UIView` subclass and then wrapping it with an `RCTViewManager` so React Native can instantiate and manage it. Props passed from JavaScript are mapped to properties of your `UIView`.
>
> **Key Takeaway:** You're packaging your custom iOS views to be declaratively controlled by React Native's component system.

> 🤖 **(Android Developers):**
>
> **Comparison:** This involves creating a custom Android `View` (e.g., extending `TextView` or `ViewGroup`) and a corresponding `ViewManager` (e.g., extending `SimpleViewManager`). Props from JavaScript are applied to your custom view using methods annotated with `@ReactProp`.
>
> **Key Takeaway:** You are making your custom Android views behave like standard React components, configurable from JavaScript.

> 🌐 **(Web Developers):**
>
> **Comparison:** Imagine if you could create a custom HTML element using C++ (for performance or unique browser integration) and then use that element in your HTML and style it with CSS, with JavaScript able to set its attributes and listen to its events. Bridging native UI components in React Native is conceptually similar: you're creating a native visual block and making it behave like a standard React component.
>
> **Key Takeaway:** This is how you can incorporate truly native, platform-specific UI elements into your React Native app when the standard components or JavaScript-based solutions are insufficient.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Native UI Components (iOS)](https://reactnative.dev/docs/native-components-ios)
> - [React Native Docs: Native UI Components (Android)](https://reactnative.dev/docs/native-components-android)
> - [React Native New Architecture: Fabric Native Components](https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components)
