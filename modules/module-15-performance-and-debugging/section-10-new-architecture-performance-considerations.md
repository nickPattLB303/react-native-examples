## Section 10: New Architecture Performance Considerations

React Native's New Architecture marks a significant evolution, aiming to address performance bottlenecks and improve the developer experience. This section provides an overview of the New Architecture's components—JSI, Fabric, and TurboModules—and discusses their performance implications for apps like SpeedyMeds.

> 🛣️ **(All Learners):** While migrating to the New Architecture is a significant step, understanding its performance benefits can help you appreciate its long-term advantages and make informed decisions as the ecosystem matures around it.

### Conceptual Content: Pillars of the New Architecture

As briefly introduced in Module 2, the New Architecture fundamentally changes how JavaScript interacts with the native side and how UI is rendered. Let's recap its core components:

- **JSI (JavaScript Interface):** A lightweight, general-purpose C++ API that allows JavaScript to hold references to C++ host objects and invoke their methods directly. This replaces the asynchronous, message-based Bridge from the legacy architecture.
- **Fabric:** The new rendering system that leverages JSI to create and manage UI elements more efficiently. It enables more direct and synchronous communication between JavaScript and native UI rendering.
- **TurboModules:** The next generation of Native Modules, also leveraging JSI. They offer benefits like lazy loading and type safety through code generation (CodeGen).

#### Performance Implications of the New Architecture

The New Architecture is designed to bring substantial performance improvements:

1.  **JSI (JavaScript Interface):**

    - **Synchronous Execution:** JSI allows for direct, synchronous calls between JavaScript and native code. This eliminates the latency and overhead of the asynchronous bridge used in the legacy architecture. For SpeedyMeds, this could mean faster interactions with native device features like a barcode scanner for medications.
    - **Faster Native Module Calls:** By enabling direct C++ interop from JavaScript, calls to native modules (especially TurboModules) are significantly faster as they bypass the serialization/deserialization costs of the old bridge.
    - **Reduced Serialization Costs:** Data no longer needs to be serialized into JSON strings to be passed across the bridge. JSI allows for more direct data exchange.

2.  **Fabric (New Rendering System):**

    - **More Responsive UI:** Fabric can move UI rendering work to a higher-priority native thread, separate from the JavaScript thread. This means that even if the JS thread is busy, the UI can remain more responsive to user gestures.
    - **Concurrent React Features:** Fabric is designed to integrate seamlessly with React 18+ concurrent features (like `startTransition`, `useDeferredValue`). This allows React to work on multiple rendering tasks simultaneously, prioritizing important updates and making UIs feel smoother during complex state changes (e.g., filtering a large list of patient records in SpeedyMeds).
    - **Simplified View Tree:** Fabric can lead to a less complex native view hierarchy under the hood, which can improve rendering performance and memory usage.
    - **Improved Gesture Handling:** Interactions with gestures can be handled more directly and efficiently.

3.  **TurboModules (New Native Modules):**
    - **Lazy Loading:** TurboModules are loaded into memory only when they are first used by your JavaScript code. This reduces the initial memory footprint and startup time of your app, as not all native modules need to be initialized at launch.
    - **Type Safety & CodeGen:** While not a direct runtime performance benefit, the use of CodeGen to generate typed interfaces between JS and native code reduces the likelihood of runtime errors and improves developer efficiency, indirectly leading to more stable and performant modules.
    - **More Efficient Initialization:** TurboModules are designed for more efficient initialization compared to legacy native modules.

#### Addressing Legacy Bottlenecks

The New Architecture directly tackles several performance pain points of the legacy system:

- **Bridge Congestion:** JSI eliminates the bridge, so there's no more bottleneck from too many messages or large payloads crossing it.
- **Asynchronous UI Updates:** Fabric allows for more synchronous and predictable UI updates, reducing issues like "jumping" UI elements or delays in reflecting state changes.
- **Context Switching:** JSI reduces the overhead associated with context switching between the JavaScript and native realms.

#### Visualizing the Change: Bridge vs. JSI

This diagram illustrates the conceptual difference in communication:

```mermaid
graph TD
    subgraph Legacy Architecture
        JS[JavaScript Thread] -- JSON Messages --> Bridge[Async Bridge] -- JSON Messages --> Native[Native Modules/UI]
    end

    subgraph New Architecture
        JS_NA[JavaScript Thread] <== JSI ==> Native_NA[Native Modules/UI (Fabric/TurboModules)]
    end

    style Bridge fill:#f96,stroke:#333,stroke-width:2px
    style JSI fill:#9cf,stroke:#333,stroke-width:2px
```

**Description:** In the Legacy Architecture, the JavaScript thread communicates with Native Modules and UI by sending JSON messages asynchronously across the Bridge. This introduces latency and serialization overhead. In the New Architecture, the JavaScript thread, through JSI (JavaScript Interface), can communicate more directly and often synchronously with Native Modules (TurboModules) and the UI rendering system (Fabric). This direct path reduces overhead and improves responsiveness.

#### Potential New Considerations

While the New Architecture brings many benefits, developers should be mindful of:

- **Migration Complexity:** Transitioning existing apps, especially those with many custom native modules, can be a significant effort.
- **Ecosystem Maturity:** While rapidly evolving, some third-party libraries may still be in the process of fully adopting the New Architecture. Compatibility needs to be checked.
- **Synchronous Nature of JSI:** While powerful, synchronous calls from JS to native, if misused for long-running native tasks, could potentially block the JS thread. Proper design of native module APIs remains important.

> 📲 **(Native Developers):**
> **Comparison:** The New Architecture, particularly with JSI enabling direct C++ interop, moves React Native closer to how native components often interact with the system or each other—more directly and with less marshaling or serialization overhead than the old bridge. Fabric\'s approach to rendering off the main JS thread and allowing for prioritized updates shares principles with how native UI frameworks (like UIKit on iOS or Android\'s UI toolkit) manage their rendering pipelines to ensure responsiveness.
> **Key Takeaway:** The New Architecture aims to make React Native feel more "native" in its performance characteristics by reducing indirection and overhead in the communication between JavaScript and native code, leading to potentially smoother UIs and faster interactions.
> **Source:** `[React Native Docs: The New Architecture - JSI](https://reactnative.dev/docs/the-new-architecture/jsi)`, `[React Native Docs: The New Architecture - Fabric](https://reactnative.dev/docs/the-new-architecture/fabric-renderer)`

> 🌐 **(Web Developers):**
> **Comparison:** JSI enabling direct calls between JavaScript and C++ is somewhat analogous to how WebAssembly (Wasm) allows near-native performance for compiled C++/Rust/etc. code running in the browser, or how Node.js C++ addons can be called synchronously or asynchronously from JavaScript. Fabric\'s concurrency features, designed to work with React 18+, align with modern React\'s capabilities for smoother, non-blocking rendering updates on the web (e.g., `startTransition`).
> **Key Takeaway:** The New Architecture brings a more sophisticated and performant execution model to React Native, addressing limitations that were more apparent when comparing the legacy bridge architecture to typical web or native execution models. It allows for more direct interop and better UI rendering strategies.
> **Source:** `[WebAssembly.org](https://webassembly.org/)`, `[React Docs: Concurrent Rendering](https://react.dev/blog/2022/03/29/react-v18#new-features-automatic-batching)`

### Procedural Content: Enabling the New Architecture

Enabling the New Architecture involves several steps and can vary slightly between React Native versions and project types (standard RN CLI vs. Expo).

1.  **Update React Native:** Ensure your project is on a React Native version that supports the New Architecture (generally 0.68+ for initial support, 0.70+ for more widespread adoption and Hermes on iOS as default with it).
2.  **Android Configuration:**
    - In `android/gradle.properties`, set `newArchEnabled=true`.
    - Rebuild your Android app (`cd android && ./gradlew clean && cd .. && npx react-native run-android`).
3.  **iOS Configuration:**
    - In your `ios` directory, run `RCT_NEW_ARCH_ENABLED=1 pod install`.
    - Rebuild your iOS app from Xcode or using `npx react-native run-ios`.
4.  **Expo Projects:**
    - For projects using `expo-dev-client` or bare workflow, you typically follow the standard React Native instructions. Expo managed workflow support for the New Architecture is evolving; check the latest Expo SDK documentation.
    - Expo often simplifies enabling the New Architecture through build profiles or configuration in `eas.json` or `app.json` for EAS Builds.

> [!IMPORTANT]
> Migrating an existing application, especially one with custom native modules, requires careful planning and testing. Native modules need to be adapted or rewritten as TurboModules to be fully compatible and leverage JSI benefits. Consult the official React Native migration guide for detailed steps.

> 📚 **Official Documentation & Resources:**
>
> - [React Native New Architecture Working Group](https://github.com/react-native-community/new-architecture-working-group)
> - [React Native Docs: The New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
> - [React Native Docs: Migrating to the New Architecture](https://reactnative.dev/docs/new-architecture-migration)
> - [Expo Docs on New Architecture (Search for latest guides)](https://docs.expo.dev/)

The New Architecture represents the future of React Native performance. As it matures and library support becomes ubiquitous, apps like SpeedyMeds will be able to deliver even smoother and more responsive user experiences.
