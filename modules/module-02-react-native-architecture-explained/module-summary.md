# Module 2 Summary: React Native Architecture Explained

In this module, we delved into the core internals of React Native, contrasting its Legacy Architecture with the modern New Architecture. Understanding these foundational differences is key to building high-performance, robust React Native applications like SpeedyMeds.

## Key Takeaways

### Legacy Architecture: The Bridge

- The Legacy Architecture relied on the **Bridge** for asynchronous, serialized (JSON) communication between the **JavaScript Thread**, the **Native/UI Thread**, and the **Shadow Thread** (for Yoga layout calculations).
- Key **limitations** included performance bottlenecks due to serialization and asynchronous hops, the "Bridge tax," constraints in synchronous operations, eager loading of native modules, difficulties leveraging modern React concurrent features, and type safety issues at the boundary.

### The New Architecture: JSI, TurboModules, Fabric, Codegen

- The **New Architecture** (default in RN 0.76+ and Expo SDK 52+) fundamentally changes JS-native interaction.
- **JavaScript Interface (JSI):** A C++ layer enabling direct, potentially synchronous, communication between JavaScript and native code (C++ Host Objects). It eliminates serialization overhead for many operations and is JavaScript engine agnostic (works with Hermes).
- **TurboModules:** The new generation of native modules built on JSI, featuring **lazy loading** (improving app startup), strong typing (via Codegen), and the option for synchronous method calls.
- **Fabric:** The new rendering system, also built on JSI. It uses a C++ shared core, enables more direct UI operations, supports React 18+ concurrent features (Transitions, Suspense), and provides a more efficient render pipeline (Render, Commit, Mount phases).
- **Codegen:** A build-time tool that generates boilerplate interface code (JSI bindings, native stubs) from TypeScript/Flow specifications, ensuring type safety between JavaScript and native components (TurboModules, Fabric components).

### Rendering: Legacy vs. Fabric

- We compared the multi-step, Bridge-reliant rendering process of the legacy UI Manager with Fabric's more streamlined, JSI-driven approach.
- Fabric's direct C++ Shadow Tree creation, integrated Yoga layout, and efficient diffing/mounting lead to reduced overhead, faster updates, and smoother UI performance.

### Implications for Developers with the New Architecture

- **Performance:** Noticeable improvements in startup time (TurboModules, JSI), UI responsiveness and animation smoothness (Fabric), and native call efficiency (JSI).
- **Synchronous Operations:** JSI allows for necessary synchronous calls to native modules, though they should be used judiciously to avoid blocking the JS thread.
- **Developer Experience:** Enhanced type safety with Codegen, ability to leverage modern React features (with Fabric), and alignment with React Native's future.
- **Bridgeless Mode:** The eventual goal, completely disabling the legacy Bridge, further reducing overhead. Interop layers ensure backward compatibility.
- **Debugging:** Evolving tools (Hermes debugger, new experimental JS Debugger) and a better understanding of the synchronous/concurrent nature of the New Architecture aid in diagnostics.
- **Expo & The New Architecture:** Expo SDK 52+ enables the New Architecture by default, provides `expo-doctor` for compatibility checks, and ensures Expo modules work seamlessly, simplifying adoption.

## Moving Forward

A solid grasp of React Native's architecture empowers you to write more optimized code, make better decisions about libraries and patterns, and effectively troubleshoot issues. This knowledge is crucial as you begin to build out the features of the SpeedyMeds application in subsequent modules, where you will work directly with Core Components, styling, layout, and navigation, all running on this modern foundation.

> 🎯 **Remember the Tip for Learners:** Focus on the _benefits_ and _practical implications_ of the New Architecture (smoother UI, faster startup, modern React features, library compatibility) rather than getting bogged down in the deepest C++ details, unless you plan to develop custom advanced native components.
