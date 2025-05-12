## Section 4: Implications for Developers (Performance, Synchronous Operations)

The introduction of the New Architecture—a significant re-architecture effort that began around 2018 and became the default in React Native 0.76—with JSI, TurboModules, and Fabric, isn't just an internal refactoring; it has tangible implications for React Native developers. Understanding these changes can help you write more performant apps and leverage new capabilities.

> 🛣️ **(All Learners):** This section is particularly important as it translates the theoretical architecture concepts into practical implications for your daily development work with React Native.

**Performance Improvements:**

- **Smoother Animations and Interactions:** One of the most noticeable benefits is improved UI performance. Fabric's more direct rendering path and better threading model mean animations (especially those driven by JavaScript) and gesture responses feel smoother and are less prone to jank or dropped frames.
- **Faster Startup:** While TurboModules' lazy loading contributes to faster app startup by initializing native modules only when needed, the overall reduction in Bridge overhead during the initial rendering phase also helps.
- **Reduced Overhead for Native Calls:** Communicating with native modules via JSI and TurboModules is generally more efficient than through the legacy Bridge, reducing the "Bridge tax" for each call. This is particularly beneficial for apps that frequently interact with native device features.

**Synchronous Operations:**

- **Access to Synchronous Native Methods:** With JSI, JavaScript can now call native module methods synchronously when necessary. This was a significant limitation in the legacy architecture.
  - **Use Cases:** This is useful for scenarios where JavaScript needs an immediate result from a native API before it can proceed, such as:
    - Querying the dimensions of a native UI component before the first render using `measure()`.
    - Accessing small, critical pieces of data from native storage synchronously during initialization.
    - Certain types of complex calculations that are more efficiently performed in native code.
- **Caution with Synchronous Calls:** While powerful, synchronous calls from JavaScript to native code should be used judiciously. Long-running synchronous native methods can block the JavaScript thread, leading to UI freezes and a poor user experience. Always prefer asynchronous operations for tasks that might take time (e.g., network requests, file I/O, complex computations).

> 🧑‍🏫 **(Instructor-Led):** During live sessions, we can discuss specific scenarios where a synchronous call might be tempting but an asynchronous approach remains superior for maintaining UI responsiveness.

**Developer Experience:**

- **Type Safety with Codegen:** The use of Codegen with TypeScript or Flow for defining the interfaces of TurboModules and Fabric components brings improved type safety. This helps catch errors at build time rather than runtime, leading to more robust code and easier refactoring.
- **Simplified Native Module Creation:** While creating native modules still requires native code (Swift/Kotlin/C++), Codegen and JSI can simplify the boilerplate and the JS-native communication layer.
- **Future-Proofing:** Adopting the New Architecture aligns your app with the future direction of React Native, ensuring compatibility with new React features (like Concurrent React) and ongoing performance enhancements.

**Adopting and Migrating to the New Architecture**

The New Architecture is enabled by default in new projects created with React Native 0.76 and later. For older projects (typically 0.68+ for opt-in), it needs to be explicitly enabled:

- **iOS:** Set `ENV['RCT_NEW_ARCH_ENABLED'] = '1'` in your `ios/Podfile` before `require Pod::Executable` and run `pod install`.
- **Android:** Set `newArchEnabled=true` in your `android/gradle.properties` file.

Migrating existing applications requires careful planning:

- **React Native Upgrade Helper:** This web tool is very useful for identifying changes needed when upgrading React Native versions, including those related to the New Architecture.
- **Incremental Migration:** Start by enabling the New Architecture, then gradually update dependencies and custom native code, testing thoroughly. Begin with less critical parts of your application.
- **Dependency Management:** A significant aspect of migration is ensuring third-party libraries are compatible. Check resources like the [React Native Directory](https://reactnative.directory/) for New Architecture support. Incompatible libraries may need to be updated, replaced, or you might consider contributing to their migration.
- **Backward Compatibility for Libraries:** Library maintainers can support both architectures by using conditional compilation (#ifdef) on iOS and separate source sets (oldarch/newarch) on Android to provide different implementations based on whether the New Architecture is active.

> 🧗‍♀️ **(Self-Led):** If you're currently working on a React Native project, take a moment to check its version and whether it's using the New Architecture. Understanding where your project stands will help contextualize the material in this module.

**Developing Native Modules and Components: Legacy vs. New**

The process for creating native integrations has evolved:

- **Legacy:** Involved manually writing native classes (e.g., `ReactContextBaseJavaModule` on Android, `RCTBridgeModule` on iOS) and using annotations or macros to export methods/props. Type matching between JS and native was manual and error-prone.
- **New Architecture (TurboModules/Fabric):** Starts with a strict interface definition in TypeScript or Flow. Codegen uses this spec to generate native interface code (C++ headers, Java interfaces, Objective-C++ protocols). Developers then implement these generated interfaces. This approach enforces type safety, enables lazy loading for TurboModules, and allows for synchronous execution via JSI.

As a developer, while you might not always directly interact with the low-level details of JSI or Fabric, understanding their principles helps in:

- Making informed decisions about library choices.
- Debugging performance issues more effectively.
- Writing JavaScript code that works harmoniously with the new paradigms.

The New Architecture represents a significant leap forward, aiming to bridge the gap between JavaScript's developer experience and native application performance.

---

**Module Challenge**

**(https://whiteboard.microsoft.com/architecture-diagramming)**

In this challenge, you'll create diagrams illustrating both the Legacy and New Architectures of React Native, focusing on the communication flow between JavaScript and native components. This exercise will reinforce your understanding of the key architectural differences.

**Module Summary**

In this module, we explored the evolution of React Native's architecture. We started with the **Legacy Architecture**, identifying its core component, the **Bridge**, and the limitations imposed by its asynchronous, serialized communication model across the JS, Native, and Shadow threads. This led to performance bottlenecks and challenges in complex interactions.

We then dived into the **New Architecture**, a significant overhaul designed to address these issues. Key components like the **JavaScript Interface (JSI)** enable direct, potentially synchronous communication between JavaScript and C++ objects, eliminating much of the Bridge's overhead. **TurboModules** offer lazily-loaded, type-safe native modules, while **Fabric** provides a more efficient, C++ based rendering system that supports modern React features like concurrency. **Codegen** automates the creation of boilerplate interface code, enhancing type safety.

Understanding these architectural differences is crucial for building high-performing, modern React Native applications. The New Architecture is a foundational change positioning React Native for future advancements in the React ecosystem and continued improvements in cross-platform development.

**Additional Resources**

- [React Native New Architecture Working Group Discussions](https://github.com/react-native-community/discussions-and-proposals/labels/new%20architecture)
- [React Native New Architecture - Deep Dive Blog Post](https://medium.com/@DhruvHarsora/deep-dive-into-react-natives-new-architecture-jsi-turbomodules-fabric-yoga-234bbdf853b4)
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
