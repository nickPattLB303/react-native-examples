## Section 5: TurboModules (New Architecture Native Modules)

This section delves into TurboModules, a key component of React Native's New Architecture. You'll learn what they are, how they differ from legacy native modules, and the benefits they bring, particularly in terms of performance and type safety.

### Introduction to the New Architecture

Before diving into TurboModules, it's essential to recall the context of React Native's New Architecture (first introduced conceptually in Module 2). The New Architecture is a significant overhaul aimed at addressing performance bottlenecks and improving the developer experience. Its main pillars include:

- **JavaScript Interface (JSI):** Replaces the asynchronous bridge with a direct, synchronous interface between JavaScript and native code. We'll cover JSI in more detail in the next section.
- **Fabric:** A new rendering system that improves UI performance and consistency.
- **TurboModules:** The new generation of native modules, built on top of JSI.
- **Codegen:** A tool that automates the generation of interface code between JavaScript/TypeScript and native modules.

### What are TurboModules?

TurboModules are the evolution of native modules in React Native's New Architecture. They leverage JSI to enable more efficient and direct communication between JavaScript and native code.

Unlike legacy native modules, which were often discovered and loaded at startup and communicated asynchronously over the bridge, TurboModules are designed to be:

- **Lazily Loaded:** Modules are loaded only when they are actually used by the JavaScript code, reducing app startup time.
- **Synchronous (where appropriate):** While many operations will still be asynchronous, JSI allows for synchronous execution of native methods when necessary, eliminating some of the overhead of the old bridge for certain types of calls.
- **Type-Safe:** Through a process called Codegen, TurboModules enforce type safety between JavaScript and native code.

### Key Benefits of TurboModules

1.  **Improved Performance:**
    - Direct JSI calls reduce the overhead associated with serializing data and sending messages across the bridge.
    - Lazy loading means apps don't pay the cost for modules they don't use at startup.
2.  **Enhanced Type Safety:**
    - Codegen generates interface code based on type definitions (typically written in TypeScript or Flow for the JavaScript side and specified in native code). This helps catch mismatches between JavaScript calls and native implementations at build time rather than runtime.
3.  **Better Developer Experience (in the long run):**
    - While the initial setup for creating a TurboModule can be more involved, the strongly-typed interfaces and improved performance characteristics aim to provide a more robust development experience.
    - The Expo Modules API is built with the New Architecture in mind and aims to simplify the creation of modern native modules that can leverage these benefits.

### The Role of Codegen

Codegen is a crucial part of the TurboModule system. Developers define the interface of their native module in a specific format, usually using TypeScript (for the JavaScript side). Codegen then reads this specification and automatically generates the C++ boilerplate code that connects the JavaScript world to the native (Java/Kotlin or Objective-C/Swift) implementation.

This generated code handles:

- Type checking and conversion between JavaScript and native types.
- Forwarding calls from JavaScript to the actual native methods.

By automating this interface generation, Codegen reduces the amount of manual boilerplate developers need to write and helps ensure consistency and type safety.

### Conceptual Differences from Legacy Modules

| Feature           | Legacy Native Modules                  | TurboModules (New Architecture)              |
| ----------------- | -------------------------------------- | -------------------------------------------- |
| **Communication** | Asynchronous Bridge                    | JSI (Synchronous & Asynchronous)             |
| **Loading**       | Eager (often at startup)               | Lazy (on first use)                          |
| **Type Safety**   | Runtime errors, manual type checking   | Build-time via Codegen, stronger typing      |
| **JS Interface**  | JavaScriptCore (iOS), V8/JSC (Android) | JSI (abstracts JS engine)                    |
| **Boilerplate**   | Manual bridging code                   | Less manual C++ via Codegen, more spec files |

> [!IMPORTANT]
> Adopting the New Architecture, including TurboModules, is an ongoing process for the React Native ecosystem. Many existing community libraries are still based on the legacy architecture. However, new libraries and updates are increasingly supporting or being built for the New Architecture. The Expo SDK is also progressively aligning with the New Architecture.

> 🍏 **(iOS Developers):**
>
> **Comparison:** With TurboModules, you still write Swift or Objective-C code, but the way it's exposed and interacts with JavaScript changes. You'll define your module's interface more explicitly, often using a JavaScript type definition (like TypeScript) that Codegen uses to generate bridging code. The interaction becomes more direct thanks to JSI, potentially allowing synchronous method calls where it makes sense.
>
> **Key Takeaway:** TurboModules represent a more modern, performant, and type-safe way to bridge your native iOS code, moving away from `RCT_EXPORT_METHOD` macros towards JSI-backed interactions facilitated by Codegen.

> 🤖 **(Android Developers):**
>
> **Comparison:** Similar to iOS, you'll write Kotlin or Java code. The interface for your module will be strictly defined, typically with TypeScript, which Codegen uses to create the JSI bindings. This offers more robust type checking than the traditional `@ReactMethod` annotations and allows for more direct native calls from JavaScript.
>
> **Key Takeaway:** TurboModules provide a more structured and efficient mechanism for exposing your Android native logic, with improved type safety and performance due to JSI and Codegen.

> 🌐 **(Web Developers):**
>
> **Comparison:** Think of the evolution from older server communication methods (like complex XMLHttpRequests with manual data parsing) to modern typed APIs (like GraphQL with generated client-side types or gRPC). TurboModules, with Codegen and JSI, bring a similar level of formality, type safety, and efficiency to the communication layer between JavaScript and native mobile code, compared to the older, more loosely typed bridge.
>
> **Key Takeaway:** TurboModules represent a significant step towards making JavaScript-to-native communication faster, more reliable, and easier to maintain due to build-time checks and more direct interaction.

> 📚 **Official Documentation:**
>
> - [React Native New Architecture: Why a new architecture?](https://reactnative.dev/docs/the-new-architecture/why)
> - [React Native New Architecture: TurboModules](https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules)
> - [Expo Docs: What is the New Architecture?](https://docs.expo.dev/new-architecture/overview/)
