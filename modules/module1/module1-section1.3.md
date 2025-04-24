# Module 1: The React Native Ecosystem

## 1.3 Deconstructing Modern React Native: JSI, Fabric, and Turbo Modules

Context: The performance and capability improvements of React Native's New Architecture are enabled by a set of interconnected core components that replace the legacy bridge system. Understanding these components conceptually is key to appreciating how modern React Native works.

JavaScript Interface (JSI):

-   Role: JSI stands as the foundational element of the New Architecture, completely replacing the old asynchronous bridge.10 It is fundamentally a C++ API 10 that acts as an interface layer, allowing JavaScript code to obtain and hold direct references to C++ objects hosted in the native environment, and conversely, allowing native code to hold references to JavaScript objects.10
-   Key Advantage: The most significant advantage of JSI is its ability to enable direct, synchronous method invocation between the JavaScript and native realms.9 Because JavaScript can directly call methods on the C++ objects it holds references to (and vice-versa), the need to serialize and deserialize data across an asynchronous boundary is eliminated.10 This removes the major performance bottleneck of the old bridge.
-   Impact: This direct, synchronous communication pathway is transformative. It unlocks significant performance gains for operations requiring frequent or low-latency interaction between JavaScript and native code. Examples include real-time processing of large data streams (like camera frames handled by libraries such as VisionCamera 16), smoother animations and gesture handling, and the ability to perform synchronous layout measurements directly from JavaScript.16 JSI also facilitates the creation of native modules written in C++, allowing for easier code sharing across platforms (iOS, Android, potentially others).11

Fabric (New Renderer):

-   Role: Fabric is React Native's modern rendering system, built upon the capabilities provided by JSI.9 It reimagines how the UI is managed and rendered on the native platform.9 Fabric unifies more of the rendering logic in C++, leveraging JSI for communication, making interactions between JavaScript and the native UI layer more efficient.10 It manages the view hierarchy using an immutable tree structure.17
-   Benefits: Fabric significantly enhances UI performance and responsiveness.13 It enables synchronous rendering operations when needed, allowing JavaScript to read layout information (e.g., component size and position) in the same render cycle using hooks like useLayoutEffect, preventing the visual "jumps" sometimes seen with the asynchronous bridge.16 Furthermore, Fabric integrates seamlessly with React 18's concurrent features, including Suspense for declarative loading states, Transitions for prioritizing UI updates, and automatic batching for more efficient state updates.9 This leads to smoother user experiences, especially in complex applications. While this architecture enables powerful features, the complete in-memory representation of the UI might lead to higher memory consumption compared to the old architecture in some scenarios.20

Turbo Modules (New Native Module System):

-   Role: Turbo Modules represent the next generation of native modules in React Native, replacing the legacy native module system.10 Like Fabric, they are built on top of JSI.10 They provide a more efficient way for JavaScript code to interact with platform-specific APIs (like Bluetooth, GPS, device sensors, etc.).
-   Benefits: A key advantage of Turbo Modules is lazy loading.9 Unlike legacy modules, which often had to be initialized eagerly at app startup, Turbo Modules are loaded only when they are first required by the JavaScript code. This can significantly improve application startup time, especially in apps with many native modules.12 Communication is also more efficient due to the direct invocation capabilities provided by JSI.10 Additionally, Turbo Modules work in conjunction with Codegen to enforce type safety between JavaScript and native code.9 For backward compatibility and easier migration, the legacy native module system remains supported alongside Turbo Modules.10

Codegen:

-   Role: Codegen is an essential build-time tool within the New Architecture ecosystem.11 Its purpose is to automate the generation of the necessary "glue" code that allows JavaScript (specifically, typed specifications written in TypeScript or Flow) to communicate seamlessly and type-safely with native code (C++, Java/Kotlin, Objective-C++) for both Fabric components and Turbo Modules.11
-   Benefit: By generating this interface code automatically based on the JavaScript specification, Codegen reduces the amount of boilerplate code developers need to write, minimizes the potential for manual errors in bridging code, and ensures type consistency across the JavaScript/native boundary.12

These components are not independent silos but form an integrated system. JSI provides the fundamental communication layer, replacing the bridge. Fabric utilizes JSI to enhance rendering performance and enable modern React features on the UI side. Turbo Modules leverage JSI to provide efficient, lazily-loaded access to native platform APIs. Codegen supports both Fabric and Turbo Modules by automatically generating the type-safe JSI-compatible interface code based on JavaScript specifications. This cohesive system is what delivers the performance and developer experience improvements of the New Architecture.

#### Works cited

9.  Understanding React Native's New Architecture: Fabric and TurboModules Explained, accessed April 24, 2025, <https://metadesignsolutions.com/understanding-react-natives-new-architecture-fabric-and-turbomodules-explained/>
10. React Native New Architecture: Turbo Modules, JSI, and Fabric Explained | OrangeLoops, accessed April 24, 2025, <https://orangeloops.com/2024/12/react-native-new-architecture-turbo-modules-jsi-and-fabric-explained/>
11. React Native New Architecture - DEV Community, accessed April 24, 2025, <https://dev.to/hellonehha/react-native-new-architecture-1hao>
12. A guide to Turbo Modules in React Native - DEV Community, accessed April 24, 2025, <https://dev.to/amazonappdev/a-guide-to-turbo-modules-in-react-native-5aa3>
13. Experiment With the New Architecture of React Native | {callstack}, accessed April 24, 2025, <https://www.callstack.com/blog/experiment-with-new-architecture-of-react-native>
16. About the New Architecture - React Native, accessed April 24, 2025, <https://reactnative.dev/architecture/landing-page>
17. New Architecture is here - React Native, accessed April 24, 2025, <https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here>
20. Performance benchmarks - reactwg react-native-new-architecture - Discussion #85 - GitHub, accessed April 24, 2025, <https://github.com/reactwg/react-native-new-architecture/discussions/85>