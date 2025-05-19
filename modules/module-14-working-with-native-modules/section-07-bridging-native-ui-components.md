## Section 7: Bridging Native UI Components (Conceptual Overview)

This section provides a conceptual overview of bridging native UI components. While React Native offers a rich set of Core Components, there are times when you need to integrate truly native, platform-specific UI elements or reuse existing native views within your React Native application.

### Purpose: Why Bridge Native UI Components?

Bridging Native UI Components allows developers to embed native views directly within their React Native application's component hierarchy, manage their lifecycle, and communicate with them from JavaScript. You might consider this when:

- **Embedding Complex Native Views:** Integrating sophisticated native elements like advanced map views (MapKit on iOS, Google Maps on Android with full features), specialized video players/editors, or native advertising banners from third-party SDKs.
- **Reusing Existing Native UI Code:** If you have existing native UI elements (e.g., a custom chart, a unique data visualization widget) written in Swift/Objective-C or Kotlin/Java.
- **Performance for Highly Specialized UI:** For UI that involves intricate drawing, unique gesture handling, or deep integration with platform frameworks where native implementation offers tangible performance benefits.
- **Accessing Unique Native View APIs:** When specific functionalities or properties of a native view aren't exposed through React Native's default abstractions.

### Legacy Architecture Approach (UIManager, ViewManagers - Brief Context)

In the legacy architecture (pre-New Architecture), bridging native UI components involved several key pieces:

1.  **Native View Implementation:** Creating the custom native view class (e.g., extending `View` or `ViewGroup` on Android, `UIView` on iOS).
2.  **ViewManager:** Creating a corresponding manager class (e.g., extending `SimpleViewManager<T>` on Android, `RCT_EXPORT_VIEW_PROPERTY` on iOS). This manager was responsible for:
    - Creating instances of the native view.
    - Exposing its properties (props) to JavaScript, typically using annotations (`@ReactProp` on Android) or macros (`RCT_EXPORT_VIEW_PROPERTY` on iOS).
3.  **UIManager:** On the JavaScript side, React Native's `UIManager` module communicated with the native ViewManagers via the asynchronous Bridge. When a React Native component representing the native view was rendered or updated, `UIManager` would send messages across the Bridge to create the view or update its props.
4.  **Communication Issues:** All communication (updating props, sending commands, receiving events) flowed through the asynchronous Bridge. This could lead to noticeable latency and synchronization issues, sometimes referred to as the "layout jump" problem, where the JS state and the native UI state could briefly diverge. Gesture handling requiring tight coordination also suffered.

### New Architecture: Fabric Native Components (Under the Hood)

The New Architecture introduces **Fabric**, React Native's new rendering system, which fundamentally changes how native UI components are integrated. **Fabric Native Components** are the modern way to bridge native UI.

Key concepts underpinning Fabric Components include:

1.  **JSI (JavaScript Interface):** Fabric relies heavily on JSI for communication. This enables more direct and potentially synchronous interaction between the JavaScript logic controlling the component and the native view itself. Prop updates and event dispatches can bypass the Bridge's serialization and queuing overhead.
2.  **Specification (Spec) File (TypeScript/Flow):** Similar to TurboModules, the interface for a Fabric Native Component is defined in a JavaScript spec file using TypeScript or Flow. This spec explicitly declares the props the native component accepts from JavaScript and the events (callbacks, like `onChange`) it can emit back to JavaScript.

    ```typescript
    // Example: MyFabricComponentSpec.ts (Illustrative)
    import type { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
    import type { HostComponent } from "react-native";

    export interface NativeProps extends ViewProps {
      customText?: string;
      opacity?: number;
      // Declare events as functions in the spec
      onCustomEvent?: (event: { value: string }) => void;
    }

    export default "RNTMyFabricView" as HostComponent<NativeProps>;
    ```

    This TypeScript interface, `MyFabricComponentSpec.ts`, defines the props that the native UI component `RNTMyFabricView` will accept from JavaScript. It extends `ViewProps` for common properties and adds custom ones like `customText` and `opacity`. It also declares an event callback `onCustomEvent`. This spec file is crucial for Codegen to generate the necessary C++ and native interface code, ensuring type safety and consistent communication between JavaScript and the native view.

3.  **Codegen (Code Generation):** The React Native Codegen tool processes this spec file. For Fabric Components, it generates:
    - **C++ Shadow Node definitions:** Fabric maintains a UI tree in C++, called the "Shadow Tree," which mirrors the React component tree. Codegen generates C++ classes representing the shadow nodes for the custom native component. These shadow nodes hold the component's props and layout information.
    - **Native ViewManager interfaces/protocols:** Ensures the native ViewManager implementation conforms to the spec, guaranteeing type consistency for props and event handling.
4.  **Fabric Renderer:** This is the core of the new rendering system. It uses JSI to communicate between JavaScript and the C++ Shadow Tree. When React updates a component, Fabric can efficiently update the corresponding C++ Shadow Node. Fabric then calculates the layout (using Yoga, also in C++) and orchestrates the creation and updating of the actual native views on the main thread based on the information in the Shadow Tree.

    ```mermaid
    graph TD
        A[React JS Component Tree] -->|Updates| B(Fabric Bridge - JSI);
        B --> C{C++ Shadow Tree};
        C -->|Layout via Yoga| C;
        C -->|Diffing & Batching| D[Native View Manager Platform Specific];
        D --> E[Native UI View iOS/Android];

        subgraph JavaScript Realm
            A
        end

        subgraph Bridging & Core Logic C++
            B
            C
        end

        subgraph Native Realm
            D
            E
        end

        style A fill:#ccf,stroke:#333,stroke-width:2px
        style E fill:#cfc,stroke:#333,stroke-width:2px
        style C fill:#fcf,stroke:#333,stroke-width:2px
    ```

    This diagram illustrates the high-level architecture of Fabric, React Native's new rendering system. When your React application's JavaScript component tree updates, these changes are communicated via the Fabric Bridge (which utilizes JSI) to the C++ Shadow Tree. The Shadow Tree is a lightweight representation of the UI, existing entirely in C++. It's responsible for managing the layout (using the Yoga layout engine, also in C++) and calculating what has changed (diffing).

    Once the updates and layout are processed in the C++ Shadow Tree, Fabric efficiently batches these changes and communicates them to the platform-specific Native View Managers. These managers are then responsible for creating, updating, or deleting the actual native UI views (UIView on iOS, View on Android) on the main thread. This architecture minimizes the overhead of JS-to-native communication for UI operations and enables better synchronization, leading to improved performance and responsiveness compared to the legacy UIManager.

Fabric, by addressing the UI rendering and interaction bottlenecks inherent in the legacy `UIManager`/Bridge system, aims to deliver UI performance and responsiveness much closer to that of purely native applications.

### Benefits of Fabric Components

Integrating native UI using Fabric Components offers significant advantages:

- **Performance:** More efficient rendering pipeline. Prop updates and event handling benefit from JSI's lower latency, leading to smoother animations and more responsive interactions.
- **Synchronization:** The architecture inherently provides better synchronization between the JavaScript state and the native UI, reducing issues like layout jumps. Fabric has mechanisms to ensure consistency between the JS and Native UI threads.
- **Type Safety:** Codegen enforces type consistency for props and events between the JavaScript spec and the native implementation at build time.
- **Architectural Integration:** Designed to work seamlessly with the other pillars of the New Architecture (JSI, TurboModules).

### Development Workflow for Fabric Components (Conceptual)

Creating a Fabric Native Component follows a pattern similar to TurboModules, but with a focus on UI:

1.  **Write the Spec:** Define the component's props and event callbacks in a TypeScript (or Flow) spec file.
2.  **Configure Codegen:** Set up the build to run Codegen for the Fabric component spec.
3.  **Run Codegen:** Generate the C++ Shadow Node code and native ViewManager interfaces/protocols.
4.  **Implement Native View:** Create the actual native UI component (Android `View`/`ViewGroup`, iOS `UIView`).
5.  **Implement Native ViewManager:** Write the ViewManager code (Java/Kotlin, Objective-C++/Swift) that creates instances of the native view and handles prop updates and event emissions, conforming to the Codegen-generated interfaces.
6.  **Implement C++ Shadow Node Logic (Optional but often needed):** Sometimes, custom C++ logic is needed for the shadow node, especially for complex layout or state handling, although Codegen handles much of the basics.
7.  **Register & Integrate:** Register the component and integrate its native code into the app build.

> [!IMPORTANT]
> Creating custom native UI components (Fabric or legacy) is generally more complex than creating native modules (APIs). It requires a deeper understanding of each platform's UI system, layout, event handling, and the React Native bridging/Fabric mechanisms.

> [!CAUTION]
> Before deciding to build a custom native UI component, thoroughly explore if the desired UI can be achieved by composing existing React Native Core Components, using community libraries like `react-native-svg` or `react-native-gesture-handler`, or leveraging UI toolkits like React Native Paper. Custom native UI adds significant maintenance overhead.

### Legacy vs. New Architecture Native Integration Comparison

The following table summarizes the key differences between the legacy and New Architecture approaches for native integration:

| Aspect                  | Legacy Architecture Method                                        | New Architecture Method                                | Key Differences                                                                   |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **JS-Native Calls**     | Bridge (Message Queue)                                            | JSI (JavaScript Interface)                             | Performance: JSI is faster (direct C++).<br>Synchronicity: JSI allows sync calls. |
| **Data Transfer**       | JSON Serialization/Deserialization                                | Direct C++ interaction (less serialization overhead)   | Efficiency: JSI reduces data conversion bottleneck.                               |
| **Native Module Logic** | `RCTBridgeModule` (iOS)<br>`ReactContextBaseJavaModule` (Android) | TurboModules (Spec + Codegen + JSI)                    | Type Safety: Build-time checks via Spec/Codegen.<br>Loading: Lazy loading.        |
| **Native UI Bridging**  | `UIManager`<br>`RCTViewManager` (iOS)<br>`ViewManager` (Android)  | Fabric Components (Spec + Codegen + JSI + Shadow Tree) | Rendering: More efficient pipeline.<br>Sync: Better JS/Native UI sync.            |
| **Type System**         | Runtime checks, Naming conventions, Manual conversion             | Build-time via Codegen based on TypeScript/Flow Spec   | Robustness: Errors caught earlier.<br>Reliability: Enforced contracts.            |
| **Architecture Core**   | Asynchronous Bridge                                               | Synchronous-capable JSI + C++ Layer                    | Foundation: Performance, capabilities.                                            |

This table highlights the comprehensive nature of the New Architecture's improvements. By replacing the Bridge with JSI and introducing interface-driven development with Codegen for both TurboModules and Fabric Components, React Native aims to provide a more performant, reliable, and type-safe foundation for all forms of native integration.

> 🍏 **(iOS Developers):**
>
> **Comparison:** For Fabric, this is like creating a custom `UIView` subclass. The interaction is managed through a more formalized contract (the spec file) and Codegen, with JSI enabling more direct communication than the old `RCTViewManager` and Bridge system. The C++ Shadow Node is a new layer for managing UI state and layout efficiently.
>
> **Key Takeaway:** You're packaging your custom iOS views to be declaratively controlled by React Native's modern rendering system, Fabric, for better performance and type safety.

> 🤖 **(Android Developers):**
>
> **Comparison:** This involves creating a custom Android `View` and a `ViewManager`. With Fabric, the `ViewManager` conforms to interfaces generated by Codegen from a TypeScript spec. JSI and the C++ Shadow Tree replace the older `UIManager` and Bridge for prop updates and event handling.
>
> **Key Takeaway:** You are making your custom Android views integrate with React Native's Fabric renderer, providing a more efficient and robust bridge than the legacy system.

> 🌐 **(Web Developers):**
>
> **Comparison:** Imagine defining a custom web component with a strict TypeScript interface for its properties and events. Codegen would then generate the necessary bindings to make this component work seamlessly within a high-performance rendering engine (Fabric). This is a step beyond standard web components, offering deeper integration and type safety for UI elements.
>
> **Key Takeaway:** Fabric Native Components allow you to incorporate truly native, platform-specific UI elements into your React Native app with a more modern, performant, and type-safe architecture.

> 📚 **Official Documentation:**
>
> - [React Native New Architecture: Fabric Native Components](https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components)
> - [React Native New Architecture: Fabric Renderer](https://reactnative.dev/docs/the-new-architecture/pillars-fabric-renderer)
> - [React Native New Architecture: Codegen](https://reactnative.dev/docs/the-new-architecture/modules-codegen) (Sections relevant to Fabric Components)
> - [Legacy Native UI Components (iOS)](https://reactnative.dev/docs/native-components-ios)
> - [Legacy Native UI Components (Android)](https://reactnative.dev/docs/native-components-android)

### Next Steps

This section concludes our conceptual overview of bridging native UI components using Fabric. Understanding this, along with TurboModules and JSI, provides a solid grasp of how React Native's New Architecture enhances native integration.

It's now time to apply your understanding from this module in the **Challenge 14: Research Native Module Alternatives**, which is linked in the main introduction file for this module ([Section 0: Introduction](./section-00-introduction.md)).

After completing the challenge, you will be ready to tackle [Module 15: Performance and Debugging](../module-15-performance-and-debugging/section-00-introduction.md).
