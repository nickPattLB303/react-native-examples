## Section 2: The New Architecture: JSI, TurboModules, Fabric, Codegen (Concepts, Benefits)

The limitations of the legacy Bridge architecture prompted a significant re-engineering effort, resulting in React Native's **New Architecture**. This modern approach aims to improve performance, enhance type safety, and provide more flexible communication between JavaScript and native code. It introduces several key components: JSI, TurboModules, Fabric, and Codegen. The New Architecture became the default in React Native version 0.76, marking a major step forward.

**1. JavaScript Interface (JSI)**

JSI is the foundational change in the New Architecture. Instead of the asynchronous, JSON-based Bridge, JSI provides a lightweight, general-purpose C++ interface that allows JavaScript code to directly hold references to C++ host objects and invoke methods on them **synchronously**.

- **Direct Communication:** JavaScript can now interact with native code more directly, bypassing the need for serialization and asynchronous message passing for many operations.
- **JavaScript Engine Agnostic:** JSI is designed to work with any modern JavaScript engine that provides C++ APIs, such as Hermes (React Native's optimized default engine), V8, or JavaScriptCore. This flexibility ensures broader compatibility.
- **Shared Ownership:** JSI enables shared ownership of objects between the JavaScript and Native realms, reducing the overhead of data transfer.
- **Enables Synchronous Operations:** A key benefit is the ability to synchronously access native functionality (e.g., layout information via `measure` on a component ref), preventing issues like layout jumps common in the legacy architecture.

> 🌐 **Web Developers:**
>
> **Comparison:** JSI brings the communication model slightly closer to how JavaScript interacts with browser APIs (which are often implemented in C++). While the browser sandbox provides security boundaries, JSI offers a more direct C++ interface than the legacy Bridge allowed, enabling faster interactions.
>
> **Key Takeaway:** JSI removes the primary bottleneck (the async, serialized Bridge) allowing for potentially faster and synchronous communication between JS and native code, something not directly possible with the old Bridge.
>
> **Source:** [An Deep Dive into React Native\'s New Architecture - JSI](https://blog.notesnook.com/an-deep-dive-into-react-native-new-architecture-jsi/)

**2. TurboModules**

Built on top of JSI, TurboModules are the new generation of Native Modules, providing access to platform-specific APIs.

- **Lazy Loading:** Unlike legacy Native Modules, which were often initialized eagerly at app startup, TurboModules are loaded only when they are first needed by your JavaScript code. This significantly improves app startup time and reduces initial memory consumption.
- **Strong Typing:** TurboModules leverage type definitions (often written in TypeScript or Flow and processed by Codegen) to ensure type safety across the JSI boundary.
- **Synchronous Access (Optional):** While asynchronous operations are still common, TurboModules can expose methods that can be called synchronously from JavaScript when necessary, thanks to JSI.
- **Performance:** Interactions with TurboModules are generally faster due to JSI, avoiding the Bridge overhead.

**3. Fabric**

Fabric is the New Architecture's rendering system, replacing the legacy UI Manager. It's responsible for managing the UI tree and rendering native components.

- **Direct UI Operations & C++ Core:** Fabric allows JavaScript to interact more directly and synchronously with the native UI thread via JSI. It features a unified C++ core, promoting consistency across platforms and enabling more efficient UI updates.
- **Prioritization & Concurrency:** Fabric introduces the ability to prioritize certain UI updates (e.g., user interactions) and is designed to work with React 18+ concurrent features (like Suspense and Transitions), leading to a more responsive user experience.
- **Conceptual Shadow Tree (in C++):** Like the legacy architecture, Fabric uses a "shadow tree" to represent the UI layout. However, this shadow tree is now created and managed in C++ and is directly accessible from both JavaScript and native code via JSI.
- **Render Pipeline:** Fabric operates in three main phases:
  1.  **Render Phase:** React executes JS code, creating a React Element Tree. Fabric uses this to synchronously create a React Shadow Tree in C++.
  2.  **Commit Phase:** The Shadow Tree is finalized. Layout information is calculated (using Yoga), and the tree is promoted as the "next tree" to be mounted.
  3.  **Mount Phase:** The Shadow Tree (with layout data) is transformed into a Host View Tree (actual native views) on the native UI thread. This involves diffing against the previous tree and applying updates to the native views.

**4. Codegen (Code Generation)**

To ensure type safety and reduce boilerplate code when creating TurboModules and Fabric components, the New Architecture utilizes Codegen.

- **Interface Generation:** Developers define the interface between JavaScript and native code using strictly typed JavaScript (Flow) or TypeScript specification files.
- **Automatic Code Creation:** Codegen runs at build time, reading these type definitions and automatically generating the C++ JSI bindings and platform-specific native interface code (e.g., Java interfaces for Android, Objective-C++ headers for iOS). This significantly reduces the amount of repetitive boilerplate code developers need to write manually and minimizes potential errors.

**Benefits of the New Architecture:**

- **Improved Performance:** Reduced serialization overhead, synchronous access capabilities, and optimized rendering lead to faster startup, smoother animations, and better responsiveness.
- **Enhanced Type Safety:** Codegen enforces type consistency between JavaScript and native code, catching errors at build time rather than runtime.
- **Increased Flexibility:** Direct JSI access opens up possibilities for more sophisticated native integrations and libraries.
- **Better Debugging & Tooling:** The streamlined architecture facilitates improved debugging tools and performance monitoring.
- **Modern React Alignment:** Enables the use of concurrent features from React 18+ for more advanced UI patterns.

It's worth noting that the shift towards a shared C++ core (JSI, Fabric) makes C++ a more central part of React Native's architecture. While many developers may not need to write C++ directly, familiarity with its concepts can be beneficial for advanced use cases or deep debugging.

**Diagram: Legacy Bridge Architecture**

```mermaid
graph LR
    subgraph JS Realm (JS Thread)
        A[React App JS Code] --> B(JS Bridge);
    end

    subgraph Native Realm
        subgraph Native UI Thread
            D(Native UI) --- E(Native Modules);
        end
        C(Native Bridge) --- E;
    end

    B -- Async, Serialized (JSON) --> C;
    C -- Async, Serialized (JSON) --> B;

    E -- Direct Calls --> D;
    D -- Native Events --> C;

    style JS Realm fill:#D6EAF8,stroke:#333,stroke-width:1px;
    style Native Realm fill:#D5F5E3,stroke:#333,stroke-width:1px;
    style B fill:#FADBD8,stroke:#C0392B;
    style C fill:#FADBD8,stroke:#C0392B;
    style A fill:#AED6F1;
    style D fill:#A9DFBF;
    style E fill:#A9DFBF;
```

> **Diagram Explanation (Legacy Bridge Architecture):**
>
> This diagram illustrates the core components of React Native's Legacy Architecture. It depicts two distinct environments: the JavaScript (JS) Realm, running on a dedicated JS thread (often with JavaScriptCore), and the Native Realm, which includes the main Native UI thread and a separate Shadow Thread for layout calculations (using Yoga).
>
> Communication between these realms is exclusively handled by the **Bridge**, shown here as two parts: the JS Bridge and the Native Bridge. Messages initiated from the **React App JS Code** (e.g., a request to update UI or call a native API) are sent to the **JS Bridge**. This bridge **serializes** the data (typically into JSON) and sends it **asynchronously** and in **batches** across the boundary to the **Native Bridge**. The Native Bridge then deserializes the message and dispatches it to the appropriate **Native Module** or UI update mechanism on the **Native UI Thread**.
>
> Conversely, events originating from the **Native UI** (like button taps) or **Native Modules** (like GPS updates) are sent to the Native Bridge, serialized, and asynchronously passed to the JS Bridge, which then notifies the React App JS Code. The key characteristics are the **asynchronous** nature, **batched communication**, and the **serialization/deserialization** overhead, represented by the red Bridge components and the labelled communication lines. This separation and communication method forms the basis of the performance limitations discussed previously.

**Diagram: New Architecture Overview**

```mermaid
graph LR
    subgraph JS Realm (JS Thread - Hermes)
        A[React App JS Code];
        B[JavaScript Interface (JSI) C++];
        A --> B;
    end

    subgraph Native Realm
        subgraph Native UI Thread
            E(Native UI - Fabric Managed);
        end
        C[C++ TurboModule];
        D[C++ Fabric Component / Renderer];
        F[Native Platform APIs];

        E --- D;
        C --> F;
        D --> F;
    end

    B -- Synchronous C++ Calls --> C;
    B -- Synchronous C++ Calls --> D;

    C -- Native Events via JSI --> B;
    D -- Native Events via JSI --> B;

    %% Styling
    style JS Realm fill:#D6EAF8,stroke:#333,stroke-width:1px;
    style Native Realm fill:#D5F5E3,stroke:#333,stroke-width:1px;
    style B fill:#AEB6BF,stroke:#34495E;
    style C fill:#A9DFBF,stroke:#1E8449;
    style D fill:#A9DFBF,stroke:#1E8449;
    style E fill:#A9DFBF,stroke:#1E8449;
    style F fill:#E8DAEF,stroke:#8E44AD;
    style A fill:#AED6F1;
```

> **Diagram Explanation (New Architecture Overview):**
>
> This diagram illustrates the fundamental shift introduced by React Native's New Architecture. While the JS Realm (running on the Hermes engine by default) and Native Realm still exist, the communication layer is drastically different.
>
> The central piece is the **JavaScript Interface (JSI)**, a C++ layer accessible directly by the **React App JS Code**. JSI eliminates the asynchronous, serialized Bridge bottleneck. JavaScript code can now obtain direct references to C++ objects and invoke methods on them **synchronously**.
>
> Native functionality is exposed through C++ modules: **TurboModules** (for native APIs) and **Fabric Components/Renderer** (for UI elements). The JS code interacts with these C++ objects directly via JSI calls. These C++ modules, in turn, interact with the underlying **Native Platform APIs** and manage the **Native UI** (rendering handled by Fabric).
>
> Crucially, the diagram shows direct, synchronous lines of communication between JSI and the C++ TurboModules/Fabric Components. Native events are also relayed back to the JS Realm via JSI, potentially more efficiently than through the old Bridge. This direct C++ layer allows for faster interactions, removes serialization overhead for many calls, and enables synchronous execution when needed, addressing the core limitations of the Legacy Architecture. **Codegen** (not explicitly shown as a runtime component but crucial at build time) plays a vital role by generating the necessary C++ bindings based on TypeScript/Flow definitions, ensuring type safety across the JSI boundary.

📚 **Official Documentation:**

- [Architecture Overview | React Native](https://reactnative.dev/architecture/overview)
- [The New Architecture | React Native](https://reactnative.dev/docs/new-architecture-intro)
- [JSI | React Native](https://reactnative.dev/docs/new-architecture-jsi)
- [TurboModules | React Native](https://reactnative.dev/docs/new-architecture-turbomodules)
- [Fabric | React Native](https://reactnative.dev/docs/new-architecture-fabric-components)
- [Codegen | React Native](https://reactnative.dev/docs/new-architecture-codegen)
