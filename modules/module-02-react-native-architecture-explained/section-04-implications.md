## Section 4: Implications for Developers (Performance, Synchronous Operations)

The introduction of the New Architecture—a significant re-architecture effort that began around 2018 and became the default in React Native 0.76—with JSI, TurboModules, and Fabric, isn't just an internal refactoring; it has tangible implications for React Native developers. Understanding these changes can help you write more performant apps and leverage new capabilities, which is particularly relevant for developing a responsive healthcare application like SpeedyMeds.

> 🛣️ **(All Learners):** This section is particularly important as it translates the theoretical architecture concepts into practical implications for your daily development work with React Native.

### Performance Improvements:

- **Smoother Animations and Interactions:** One of the most noticeable benefits is improved UI performance. Fabric's more direct rendering path and better threading model mean animations (especially those driven by JavaScript) and gesture responses feel smoother and are less prone to jank or dropped frames. For SpeedyMeds, this means smoother transitions when navigating between medication lists, patient profiles, and prescription details.
- **Faster Startup:** While TurboModules' lazy loading contributes to faster app startup by initializing native modules only when needed, the overall reduction in Bridge overhead during the initial rendering phase also helps. This is crucial for a healthcare app like SpeedyMeds where users may need quick access to medication information in time-sensitive situations.
- **Reduced Overhead for Native Calls:** Communicating with native modules via JSI and TurboModules is generally more efficient than through the legacy Bridge, reducing the "Bridge tax" for each call. This is particularly beneficial for SpeedyMeds since we'll be frequently accessing device features like camera (for scanning prescriptions), secure storage (for patient data), and potentially health monitoring integrations.

> 🍏 **(iOS Developers):**
>
> **Comparison:** The performance improvements in the New Architecture might remind you of Swift's performance benefits over Objective-C. Similar to how Swift's direct memory access and value types reduce overhead compared to Objective-C's message dispatch, JSI provides more direct access to native functionality compared to the Bridge's message-passing approach.
>
> **Key Takeaway:** The New Architecture's performance optimizations allow for UI responsiveness closer to what you'd expect from a pure native iOS app, particularly for animations and gestures.
>
> **Source:** [Swift Performance: High Performance Swift Code](https://developer.apple.com/videos/play/wwdc2016/416/)

> 🤖 **(Android Developers):**
>
> **Comparison:** The performance benefits of the New Architecture are similar to moving from reflection-based APIs to more direct method calls in Android. Just as Android's ViewBinding eliminated the performance overhead of findViewById() with direct property access, JSI eliminates serialization overhead with direct C++ function calls.
>
> **Key Takeaway:** The New Architecture significantly reduces the performance gap between React Native and pure native Android development, especially for UI-intensive operations.
>
> **Source:** [Android Performance Patterns](https://developer.android.com/topic/performance)

### Synchronous Operations:

- **Access to Synchronous Native Methods:** With JSI, JavaScript can now call native module methods synchronously when necessary. This was a significant limitation in the legacy architecture.
  - **Use Cases:** This is useful for scenarios where JavaScript needs an immediate result from a native API before it can proceed, such as:
    - Querying the dimensions of a native UI component before the first render using `measure()`.
    - Accessing small, critical pieces of data from native storage synchronously during initialization.
    - Certain types of complex calculations that are more efficiently performed in native code.
  - **SpeedyMeds Example:** In our pharmacy app, synchronous operations could allow us to immediately validate patient credentials or prescription details against secure storage before proceeding with critical operations, providing a more seamless user experience.
- **Caution with Synchronous Calls:** While powerful, synchronous calls from JavaScript to native code should be used judiciously. Long-running synchronous native methods can block the JavaScript thread, leading to UI freezes and a poor user experience. Always prefer asynchronous operations for tasks that might take time (e.g., network requests, file I/O, complex computations).

> 🧑‍🏫 **(Instructor-Led):** During live sessions, we can discuss specific scenarios where a synchronous call might be tempting but an asynchronous approach remains superior for maintaining UI responsiveness.

### Developer Experience:

- **Type Safety with Codegen:** The use of Codegen with TypeScript or Flow for defining the interfaces of TurboModules and Fabric components brings improved type safety. This helps catch errors at build time rather than runtime, leading to more robust code and easier refactoring. For SpeedyMeds, this means fewer bugs in production related to data format mismatches when handling medication records or patient information.
- **Simplified Native Module Creation:** While creating native modules still requires native code (Swift/Kotlin/C++), Codegen and JSI can simplify the boilerplate and the JS-native communication layer.
- **Future-Proofing:** Adopting the New Architecture aligns your app with the future direction of React Native, ensuring compatibility with new React features (like Concurrent React) and ongoing performance enhancements.

> 🌐 **(Web Developers):**
>
> **Comparison:** The type safety improvements from Codegen are similar to the benefits TypeScript brings to JavaScript development. Just as TypeScript catches type-related errors at compile time rather than runtime, Codegen ensures type consistency between your JavaScript and native code.
>
> **Key Takeaway:** While requiring a bit more upfront work defining interfaces, the New Architecture's type system can significantly reduce debugging time by catching issues at build time rather than during testing or production.
>
> **Source:** [TypeScript Handbook: Type Checking](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)

> 📚 **Official Documentation:**
>
> - [React Native: New Architecture Benefits](https://reactnative.dev/docs/the-new-architecture/landing-page)
> - [React Native: TurboModules](https://reactnative.dev/docs/new-architecture-turbomodules)
> - [React Native: Fabric Components](https://reactnative.dev/docs/new-architecture-fabric-components)
> - [React Native: Migration to New Architecture](https://reactnative.dev/docs/new-architecture-intro)
>
> 🗂️ **Additional Resources:**
>
> - [React Native at Scale with the New Architecture](https://blog.nativebits.com/posts/react-native-new-architecture-at-scale)
> - [Performance Improvements in the New Architecture](https://callstack.com/blog/what-are-the-benefits-of-the-new-architecture/)

### Adopting and Migrating to the New Architecture

The New Architecture is enabled by default in new projects created with React Native 0.76 and later. For older projects (typically 0.68+ for opt-in), it needs to be explicitly enabled:

- **iOS:** Set `ENV['RCT_NEW_ARCH_ENABLED'] = '1'` in your `ios/Podfile` before `require Pod::Executable` and run `pod install`.
  ```ruby
  # ios/Podfile
  # ... other config ...
  ENV['RCT_NEW_ARCH_ENABLED'] = '1'
  require_relative '../node_modules/react-native/scripts/react_native_pods'
  require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
  # ... rest of Podfile ...
  ```
- **Android:** Set `newArchEnabled=true` in your `android/gradle.properties` file.
  ```groovy
  # android/gradle.properties
  # ... other properties ...
  newArchEnabled=true
  ```

Migrating existing applications requires careful planning:

- **React Native Upgrade Helper:** This web tool is very useful for identifying changes needed when upgrading React Native versions, including those related to the New Architecture.
- **Incremental Migration:** Start by enabling the New Architecture, then gradually update dependencies and custom native code, testing thoroughly. Begin with less critical parts of your application.
- **Dependency Management:** A significant aspect of migration is ensuring third-party libraries are compatible. Check resources like the [React Native Directory](https://reactnative.directory/) for New Architecture support. Incompatible libraries may need to be updated, replaced, or you might consider contributing to their migration.
- **Backward Compatibility for Libraries:** Library maintainers can support both architectures by using conditional compilation (#ifdef) on iOS and separate source sets (oldarch/newarch) on Android to provide different implementations based on whether the New Architecture is active.

> 🧗‍♀️ **(Self-Led):**
> If you're currently working on a React Native project, take a moment to check its version and whether it's using the New Architecture. Understanding where your project stands will help contextualize the material in this module.

### Developing Native Modules and Components: Legacy vs. New

The process for creating native integrations has evolved:

- **Legacy:** Involved manually writing native classes (e.g., `ReactContextBaseJavaModule` on Android, `RCTBridgeModule` on iOS) and using annotations or macros to export methods/props. Type matching between JS and native was manual and error-prone.
- **New Architecture (TurboModules/Fabric):** Starts with a strict interface definition in TypeScript or Flow. Codegen uses this spec to generate native interface code (C++ headers, Java interfaces, Objective-C++ protocols). Developers then implement these generated interfaces. This approach enforces type safety, enables lazy loading for TurboModules, and allows for synchronous execution via JSI.

### SpeedyMeds Architecture Considerations

For our SpeedyMeds pharmacy application, these architectural considerations have direct implications:

- **Medication List Performance:** The medication list will benefit significantly from Fabric's rendering optimizations, especially when filtering or searching through large datasets.
- **Secure Native Modules:** We'll be implementing TurboModules for secure storage of sensitive patient information, benefiting from the improved type safety and synchronous access when needed.
- **Barcode Scanning:** Our prescription scanning feature will leverage the camera module, which performs better under the New Architecture with reduced overhead for data transfer between the native camera API and our JavaScript application code.
- **Offline Support:** The SpeedyMeds app requires robust offline capabilities, and the improved performance of native database access via TurboModules will provide a smoother experience when syncing prescription data.

As a developer, while you might not always directly interact with the low-level details of JSI or Fabric, understanding their principles helps in:

- Making informed decisions about library choices for SpeedyMeds.
- Debugging performance issues more effectively in complex screens like the medication interaction checker.
- Writing JavaScript code that works harmoniously with the new paradigms.

The New Architecture represents a significant leap forward, aiming to bridge the gap between JavaScript's developer experience and native application performance.

---

## Module Challenge: Architecture Diagramming

In this challenge, you'll create diagrams illustrating both the Legacy and New Architectures of React Native, focusing on the communication flow between JavaScript and native components. This exercise will reinforce your understanding of the key architectural differences.

**(https://whiteboard.microsoft.com/architecture-diagramming)**

### Module Summary

In this module, we explored the evolution of React Native's architecture. We started with the **Legacy Architecture**, identifying its core component, the **Bridge**, and the limitations imposed by its asynchronous, serialized communication model across the JS, Native, and Shadow threads. This led to performance bottlenecks and challenges in complex interactions.

We then dived into the **New Architecture**, a significant overhaul designed to address these issues. Key components like the **JavaScript Interface (JSI)** enable direct, potentially synchronous communication between JavaScript and C++ objects, eliminating much of the Bridge's overhead. **TurboModules** offer lazily-loaded, type-safe native modules, while **Fabric** provides a more efficient, C++ based rendering system that supports modern React features like concurrency. **Codegen** automates the creation of boilerplate interface code, enhancing type safety.

Understanding these architectural differences is crucial for building high-performing, modern React Native applications like SpeedyMeds. The New Architecture's performance improvements, type safety, and synchronous capabilities will allow us to create a responsive, reliable pharmacy application that handles medication data efficiently and provides a smooth user experience.

### Additional Resources

- [React Native New Architecture Working Group Discussions](https://github.com/react-native-community/discussions-and-proposals/labels/new%20architecture)
- [React Native New Architecture - Deep Dive Blog Post](https://medium.com/@DhruvHarsora/deep-dive-into-react-natives-new-architecture-jsi-turbomodules-fabric-yoga-234bbdf853b4)
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
