React Native Architecture Explained: From Legacy Bridge to Modern Fabric
I. Introduction: The Evolution of React Native Architecture
A. What is React Native Architecture?
React Native enables the development of mobile applications for platforms like Android and iOS using JavaScript and the React library. At its core, the architecture of React Native provides the fundamental structure that allows JavaScript code, where developers write the application logic and define the user interface (UI), to communicate and interact with the native platform code (Java/Kotlin for Android, Objective-C/Swift for iOS).1 This interaction is crucial because React Native applications render using actual native UI components, not web views, providing a user experience closer to that of purely native applications.2 The architecture dictates how these two distinct worlds – the JavaScript environment and the native environment – exchange information, manage UI updates, and handle user interactions.
B. The Need for Evolution: Limitations of the Legacy Architecture
The original architecture of React Native, while revolutionary for its time, relied heavily on a central component known as the "Bridge." This Bridge acted as the communication channel between the JavaScript and native threads. However, as React Native applications grew in complexity and performance demands increased, the limitations of this bridge-centric architecture became apparent.4 The asynchronous nature of the bridge, coupled with the need to serialize and deserialize data (typically as JSON) for every cross-thread communication, introduced performance bottlenecks.4 This could lead to issues like UI stuttering ("jank"), slow responses to user interactions, and difficulties in implementing features requiring tight synchronization between JavaScript and native code.1
C. Introducing the New Architecture: Goals and Vision
Recognizing the limitations of the legacy system, the React Native team embarked on a significant re-architecture effort, starting around 2018 and becoming the default in React Native 0.76.4 The "New Architecture" represents a fundamental rewrite of React Native's internals, driven by several key goals 4:
Improved Performance: Directly address the bottlenecks of the legacy bridge by introducing more efficient communication mechanisms.4
Enhanced Interoperability: Enable smoother and more direct interaction between JavaScript and native code, including synchronous operations when necessary.5
Concurrency Support: Align React Native with modern React features, particularly the concurrent rendering capabilities introduced in React 18, allowing for more responsive UIs and features like Suspense and Transitions.4
Better Developer Experience: Simplify native module creation, improve type safety, and provide more robust tooling.4
The vision behind the New Architecture is to create a more performant, flexible, and consistent framework that allows developers to build high-quality, native-feeling applications with JavaScript and React.8
D. Module Overview: What This Report Covers
This report provides a comprehensive exploration of React Native's architecture, designed to serve as foundational knowledge for developers. It delves into both the legacy and the new architectural paradigms. Key areas covered include:
Legacy Architecture: A detailed breakdown of its components (JS, Native, Shadow threads), the communication mechanism (Bridge, Yoga), and its inherent limitations.
New Architecture: An in-depth look at the motivations, core pillars (JSI, TurboModules, Fabric, Codegen), and the significant improvements it brings.
Communication Mechanisms: A comparative analysis of how JavaScript and native code interact in both architectures, including brief comparisons with platform-specific IPC/bridging.
Migration and Compatibility: Guidance on enabling the New Architecture, strategies for migrating existing projects and libraries, and considerations for backward compatibility.
Debugging: An overview of modern debugging tools and techniques relevant to the New Architecture.
The aim is to provide an exhaustive base of information, explaining the "under the hood" workings and empowering developers to understand and leverage React Native's architecture effectively.
II. The Legacy Architecture: Under the Hood (Pre-New Architecture)
Before the advent of the New Architecture, React Native operated on a distinct model involving multiple threads and a central communication bridge. Understanding this legacy system is crucial for appreciating the motivations and benefits of the new design, and for migrating older applications.
A. Core Components and Threads
The legacy architecture distributed its work across three primary threads 1:
JavaScript (JS) Thread: This thread was responsible for executing the application's JavaScript bundle. All business logic, React component rendering logic, and API calls initiated from JavaScript ran here.1 Initially, and often if the Hermes engine wasn't enabled, this execution was handled by the JavaScriptCore (JSC) engine, the same engine powering Safari.1
Native/UI Thread (Main Thread): This is the main application thread provided by the host operating system (Android or iOS). It was solely responsible for handling the native UI toolkit – creating, updating, and displaying native views, and processing user gestures (touches, scrolls) directly from the OS.1 Any direct manipulation of the native UI could only happen on this thread.
Shadow Thread: To avoid blocking the UI thread with potentially complex layout calculations, the legacy architecture introduced a background Shadow Thread.1 Its primary role was to take the layout information defined in JavaScript (using React Native's layout props) and calculate the exact positions and sizes of the native views. It constructed a "Shadow Tree," mirroring the UI hierarchy but containing computed layout attributes.1
A key component operating on the Shadow Thread was the Yoga Layout Engine.14 Yoga is a cross-platform layout engine developed by Meta that implements a subset of the Flexbox standard. Its critical function was to translate the Flexbox-based styles defined in JavaScript into a layout system that the host platform's UI thread could understand and render (e.g., translating Flexbox into Android's measurement and layout system or iOS's Auto Layout constraints).14 This abstraction allowed developers to use a consistent layout system (Flexbox) across platforms. The separation of layout calculation onto the Shadow Thread was a significant optimization, preventing potentially expensive layout computations from impacting the responsiveness of the main UI thread.
B. The Bridge: The Communication Hub
The cornerstone of the legacy architecture was the Bridge. It served as the intermediary facilitating all communication between the JavaScript thread and the Native (UI and Shadow) threads.1 Since JavaScript and native code run in separate environments (different threads, different memory spaces), they couldn't directly interact.
Mechanism: Communication across the Bridge was fundamentally asynchronous, batched, and relied on serialized JSON messages.1 When the JS thread needed to update the UI or call a native module, it would send a message containing the necessary instructions serialized as a JSON string. Similarly, native events (like button presses or device sensor readings) were serialized and sent back to the JS thread.1 To optimize performance, these messages were often batched together and sent across the bridge at the end of each iteration of the JavaScript event loop, reducing the frequency of cross-thread communication.17
Process: Data flowing from JavaScript to Native underwent serialization (conversion to JSON). Once received on the native side, it was deserialized (parsed from JSON) before being processed by the UI or Shadow threads.1 The reverse process occurred for data flowing from Native to JavaScript.
Role of JavaScriptCore (JSC): In this architecture, the JS thread required a JavaScript engine to execute the code. JavaScriptCore (JSC) was often the default engine, responsible for running the application's logic within the JS thread environment.1
C. Limitations and Bottlenecks
While functional, the legacy architecture's reliance on the asynchronous, serialized bridge introduced several limitations that became increasingly problematic for complex applications:
Performance Issues: The constant serialization and deserialization of JSON messages for every communication across the bridge created significant overhead.1 This overhead could become a major bottleneck, especially during high-frequency updates like scrolling through long lists or complex animations, leading to dropped frames, UI jank, and a less responsive feel.1 The bridge itself could become congested with messages.5
Asynchronicity Constraints: The inherently asynchronous nature of the bridge meant there was no straightforward way for JavaScript to synchronously call a native function and get an immediate result, or for the native side to synchronously access JavaScript state.6 This limitation made certain UI patterns difficult to implement correctly. For example, measuring a view's layout (onLayout) was asynchronous, meaning the layout information might arrive after the component had already rendered, causing a visual "jump" as the layout corrected itself.12
Single-Threaded JS: JavaScript itself is single-threaded.1 Heavy computations running on the JS thread could block the processing of incoming messages from the native side or delay sending UI updates across the bridge, potentially freezing the UI if the native side was waiting for instructions.4
Debugging Challenges: Tracing data flow and pinpointing errors across the asynchronous boundary of the bridge could be difficult. It was often unclear whether a bug originated in the JavaScript logic, the native module, or the communication process itself.1
The design choice of an asynchronous, serialized bridge, while enabling cross-platform development with JavaScript controlling native UI, inherently limited performance scalability and responsiveness as application complexity and user expectations grew. This fundamental trade-off was a primary driver for the development of the New Architecture.
III. The New Architecture: A Paradigm Shift
The New Architecture in React Native represents a fundamental redesign aimed at overcoming the limitations of the legacy bridge-based system. It introduces new core components and concepts that significantly enhance performance, enable modern React features, and improve the overall developer experience.
A. Motivations Revisited: Why the Change Was Necessary
The move to the New Architecture was driven by the need to address the inherent weaknesses of the legacy system 4:
Bridge Bottlenecks: The performance overhead associated with serializing/deserializing JSON messages across the asynchronous bridge was a primary concern, hindering smooth animations and responsive interactions.4
Synchronous Execution Needs: The inability to perform synchronous operations between JavaScript and native code prevented certain UI patterns (like synchronously measuring layout) and limited integration possibilities.12
Modern React Alignment: The legacy architecture struggled to efficiently support concurrent features introduced in React 18, such as Suspense for data fetching and Transitions for smoother state updates.4
Performance and Developer Experience: There was a clear need for faster startup times, lower memory consumption, improved type safety, and a more streamlined way to work with native modules.4
B. Core Pillars of the New Architecture
The New Architecture is built upon several interconnected pillars:
JavaScript Interface (JSI):
Role & Mechanism: JSI is arguably the most fundamental change, replacing the asynchronous bridge entirely.4 It's a lightweight, general-purpose interface, written in C++, that allows JavaScript code to hold direct references to C++ objects hosted in the native environment, and vice-versa.6 This enables direct, synchronous method invocation between the two realms without the need for serialization.4 Native methods are exposed to JavaScript via C++ "Host Objects," which JavaScript can interact with as if they were regular JS objects.18
Benefits: The elimination of serialization/deserialization overhead leads to significantly reduced latency and improved performance, especially for frequent or data-intensive communication.4 It crucially enables synchronous operations, allowing JavaScript to call native functions and get results immediately when needed.18
Interoperability: JSI is designed to be JavaScript engine-agnostic, meaning it can work with Hermes (React Native's optimized engine), V8, or JavaScriptCore.6
Use Cases for Synchronous Ops: A key benefit is the ability to synchronously access native layout information (e.g., using measure on a component ref). This prevents the layout "jumps" seen in the legacy architecture by ensuring layout calculations and updates happen within the same render cycle.12 It's also beneficial for high-frequency updates or scenarios requiring immediate feedback from native code.12
TurboModules:
Role: TurboModules are the evolution of legacy Native Modules, designed for the New Architecture.4 They provide access to platform-specific APIs.
Mechanism: TurboModules leverage JSI for communication, inheriting its performance benefits.18 A key feature is lazy loading: native modules are no longer initialized eagerly at app startup. Instead, they are loaded only when they are first accessed from JavaScript.4 JavaScript holds a reference to the native module via JSI, and the module is instantiated on demand.6
Benefits: Lazy loading significantly improves app startup time and reduces initial memory consumption, as unused modules aren't loaded.4 The use of JSI ensures better performance for module interactions compared to the bridge.22 TurboModules also enforce type safety through integration with Codegen.5
Fabric Renderer:
Role: Fabric is the new rendering system, replacing the legacy UI Manager.4 It's responsible for managing the UI tree and rendering native components.
Mechanism: Fabric features a unified C++ core, promoting consistency across platforms.4 It interacts directly with the native platform and JavaScript using JSI, enabling more efficient UI updates.18 Fabric supports concurrent rendering, aligning with React 18+ features.4
Render Pipeline: Fabric operates in three main phases 23:
Render Phase: React executes JS code, creating a React Element Tree. Fabric uses this to synchronously create a React Shadow Tree in C++.
Commit Phase: The Shadow Tree is finalized. Layout information is calculated (using Yoga), and the tree is promoted as the "next tree" to be mounted.
Mount Phase: The Shadow Tree (with layout data) is transformed into a Host View Tree (actual native views) on the native UI thread. This involves diffing against the previous tree and applying updates to the native views.
Benefits: Fabric delivers improved rendering performance through optimizations like more efficient tree diffing and reduced JSI overhead.5 It allows for better host platform interoperability and enables synchronous rendering when needed.11 Crucially, it unlocks the use of React 18 concurrent features like Suspense and Transitions for smoother UIs.4
CodeGen:
Role: Codegen automates the creation of the C++ "glue" code required for JSI to connect JavaScript with TurboModules and Fabric components.6
Mechanism: It runs at build time, parsing typed JavaScript (Flow) or TypeScript specification files that define the interface (props, methods, types) for native modules or components.18 Based on these specs, it generates the necessary C++ JSI bindings and platform-specific native code (Java interfaces/stubs for Android, Objective-C++ headers/implementations for iOS).25
Benefits: Codegen enforces type safety across the JS-Native boundary, catching errors at build time rather than runtime.5 It significantly reduces the amount of repetitive boilerplate code developers need to write manually, improving maintainability and reducing potential errors.11
These pillars work in concert. JSI provides the fast communication channel. TurboModules use JSI for efficient, lazy-loaded native functionality. Fabric uses JSI for high-performance, concurrent rendering. Codegen ensures type-safe and efficient integration between JavaScript and the native code required by TurboModules and Fabric. This interconnected system forms the foundation of the New Architecture's advantages. The shift towards a shared C++ core (JSI, Fabric) also enhances cross-platform consistency, although it introduces C++ as a more central part of the architecture, which might require developers to familiarize themselves with C++ concepts for advanced use cases or debugging.4
While performance benchmarks indicate significant potential gains with the New Architecture compared to the legacy system, and even show competitiveness (though sometimes lagging in specific areas like touch latency) against other frameworks like Lynx, achieving these gains often requires adopting the new patterns (like synchronous rendering where appropriate) and ensuring library dependencies also leverage the new capabilities.13
C. Comparison: Old vs. New Architecture Table
The following table summarizes the key differences between the legacy and new architectures:
Aspect
Old Architecture
New Architecture
Communication
Asynchronous bridge with JSON serialization
Direct, synchronous/asynchronous communication via JSI
Native Module Loading
Eager initialization (all at startup)
Lazy loading with TurboModules (on demand)
Rendering System
Legacy UI Manager (separate Shadow Thread/Yoga)
Fabric Renderer (unified C++ core, concurrent rendering)
JS <-> Native Type Safety
Manual bridging; prone to runtime errors
Automated Codegen ensuring type-safe interfaces (build time)
Performance
Bridge overhead, serialization costs, async delays
Reduced overhead, faster JSI calls, optimized rendering
React Feature Support
Limited support for concurrent features
Built for React 18+ (Suspense, Transitions, Concurrent Mode)

4
IV. Bridging the Gap: Native vs. JavaScript Communication
Understanding how React Native facilitates communication between the JavaScript environment and the underlying native platform is fundamental. The mechanism for this communication has evolved significantly with the New Architecture.
A. Legacy Bridge vs. JSI: A Deeper Dive
The core difference between the legacy and new architectures lies in how they handle communication across the JavaScript-native boundary.
Communication Flow:
Legacy Bridge: Operated as a message queue. JavaScript sent asynchronous messages (serialized as JSON strings) to the native side, and vice-versa. These messages were often batched to reduce overhead.1 This meant communication was always indirect and non-blocking by default.
JSI (New Architecture): Replaces the message queue with a direct interface.4 It allows JavaScript to obtain direct references to C++ objects (representing native functionality) and invoke their methods.18 Communication doesn't inherently require serialization into JSON; data can often be passed more directly (though complex objects might still involve some form of conversion or wrapping).18 Crucially, JSI supports both asynchronous and synchronous calls.4
Performance Impact:
Legacy Bridge: The serialization/deserialization of JSON for every message introduced significant performance overhead, especially for large data payloads or frequent communication (e.g., continuous gestures).1 The asynchronous nature also added latency.
JSI (New Architecture): By eliminating the need for JSON serialization in many cases and allowing direct method invocation, JSI drastically reduces communication overhead and latency.18 This leads to faster interactions, particularly noticeable when working with native modules or updating the UI frequently.
Synchronicity:
Legacy Bridge: Was inherently asynchronous. Achieving synchronous-like behavior was complex and often inefficient, leading to workarounds or acceptance of limitations like layout jumps.6
JSI (New Architecture): Provides the ability to make synchronous calls from JavaScript to native code.18 This is a powerful capability for scenarios where immediate results are needed, such as measuring UI elements before rendering or performing quick checks with native APIs.12
B. Platform-Specific Bridging Mechanisms (Brief Comparison)
It's useful to contrast React Native's bridging mechanisms (both old and new) with the native communication methods available on Android and iOS, although they serve different primary purposes.
Android: React Native Bridge/JSI vs. Android Binder IPC:
React Native Bridge/JSI: Facilitates communication between the JavaScript world and the native (Java/Kotlin) world within the same application process. Its primary goal is to allow JavaScript to control native UI and access native APIs.1
Android Binder IPC: This is Android's core Inter-Process Communication (IPC) mechanism.29 It's designed for communication between different processes – for example, between two different applications, or between an application and a system service. Binder uses a custom, highly optimized data serialization format called Parcel and leverages shared memory concepts for efficiency.29 While extremely efficient for IPC, its primary use case (inter-process) differs from React Native's primary need (intra-process JS-to-Native communication). Comparing their performance directly is nuanced as they solve different problems, though both aim for efficiency in their respective domains.
iOS: React Native Bridge/JSI vs. Swift/Objective-C Bridging:
React Native Bridge/JSI: Connects the JavaScript runtime to the native iOS (Objective-C/Swift) environment within the app.1
Swift/Objective-C Bridging: This refers to the mechanisms built into the iOS SDK that allow Swift code and Objective-C code to interoperate within the native environment.30 For example, it allows a Swift class to inherit from an Objective-C class or vice-versa, and enables calling methods across the language boundary natively. This is fundamentally different from the React Native bridge/JSI, which connects JavaScript to the entire native side (which might itself contain a mix of Swift and Objective-C). Performance comparisons are again complex due to the differing purposes; native Swift-ObjC bridging is highly optimized for native language interop, while JSI focuses on optimizing the JS-to-Native boundary.
The key takeaway is that while all these mechanisms involve some form of communication or bridging, they operate at different levels and address distinct technical challenges. React Native's Bridge/JSI specifically tackles the unique problem of enabling a JavaScript runtime to effectively interact with and control native mobile platform components and APIs within a single application.
V. Migration and Compatibility
Transitioning from the legacy architecture to the New Architecture involves several steps, from enabling the new system in existing projects to ensuring libraries remain compatible. Careful planning and execution are essential for a smooth migration.
A. Enabling the New Architecture in Projects
For projects initiated before React Native 0.76, the New Architecture needs to be explicitly enabled. Projects started with RN 0.76 or later have it enabled by default.8
Prerequisites: Ensure the project uses a React Native version that supports the New Architecture (ideally 0.68+ for opt-in, 0.76+ for default support).8 Verify that critical third-party dependencies are compatible with the New Architecture.32
Configuration Steps:
iOS: Modify the ios/Podfile. Set the environment variable RCT_NEW_ARCH_ENABLED to 1 before the require Pod::Executable line. Then, run bundle exec pod install (or pod install) in the ios directory.12
Ruby
# Example Podfile modification
ENV = '1'
require Pod::Executable
#... rest of Podfile


Android: Modify the android/gradle.properties file. Set the newArchEnabled property to true.19
Properties
# Example gradle.properties modification
newArchEnabled=true


After these changes, rebuild the application.
B. Migration Strategies and Tools
Upgrading an existing application, especially a large one, requires a strategic approach.
React Native Upgrade Helper: This web tool is invaluable for identifying the specific file changes required when moving between React Native versions.32 It compares the template files of two versions and highlights differences in package.json, native configuration files (iOS and Android), and other boilerplate code, often providing comments explaining the changes.35 Using this tool helps ensure that necessary configuration updates related to the New Architecture are applied correctly during a version upgrade.
Incremental Migration: A full rewrite is generally discouraged.4 The recommended approach is incremental migration.4 Start by enabling the New Architecture, then gradually update dependencies and custom native code, testing thoroughly at each stage. Begin with less critical components or modules to gain experience before tackling core functionalities.4
Dependency Management: A major hurdle in migration is ensuring third-party libraries are compatible.7 Use resources like the(https://reactnative.directory/) which allows filtering libraries based on New Architecture support.32 If a library is incompatible, check for updated versions, find compatible alternatives, or consider contributing to the library's migration efforts.32 The stability and feasibility of migrating an existing app often hinge on the readiness of its dependencies.28
Migrating Native Code: Custom native modules and components built for the legacy architecture need to be migrated to use the new APIs (TurboModules and Fabric Native Components) and communication mechanisms (JSI).32 This often involves defining JavaScript/TypeScript specifications and implementing new native interfaces generated by Codegen.36
C. Backward Compatibility for Libraries
Library maintainers may want their packages to work for users on both the legacy and new architectures simultaneously. This requires specific strategies:
Goal: Allow a single library version to function correctly regardless of whether the consuming application has the New Architecture enabled.37
Techniques:
Conditional Compilation (iOS): Use C preprocessor directives (#ifdef RCT_NEW_ARCH_ENABLED... #else... #endif) in Objective-C/Objective-C++ files (.h, .m, .mm). This allows including New Architecture-specific code (like importing generated headers or implementing getTurboModule) only when the New Architecture is enabled, while providing the legacy implementation otherwise.37
Separate Source Sets (Android): Configure Gradle to use different source directories based on the newArchEnabled flag. Typically, this involves creating src/oldarch and src/newarch directories. The oldarch directory contains the legacy ReactContextBaseJavaModule or ViewManager implementation, while newarch contains the TurboModule or Fabric component implementation.37 Gradle then compiles only the relevant source set based on the app's configuration.37
Shared Implementation Logic: To minimize code duplication, especially on Android where conditional compilation isn't as straightforward for entire classes, common logic can be extracted into a separate helper class (e.g., <MyModule>Impl.java). Both the legacy (oldarch) and new (newarch) implementations can then instantiate and delegate calls to this shared class.37
Considerations: Maintaining backward compatibility adds complexity. The separate source set approach on Android leads to some code duplication, while the shared implementation approach requires careful design to avoid tight coupling. Library authors must also decide whether to include Codegen artifacts within their package (includesGeneratedCode: true) or rely on the app to generate them. Including artifacts simplifies backward compatibility but ties the generated code to the library's React Native version, potentially causing issues if the app uses a different version.34
D. Developing Native Modules/Components: Legacy vs. New
The development process for native integrations differs significantly between architectures:
Legacy: Involved manually writing native classes (extending ReactContextBaseJavaModule on Android, implementing RCTBridgeModule on iOS) and explicitly exporting methods/props using annotations (@ReactMethod) or macros (RCT_EXPORT_METHOD, RCT_EXPORT_VIEW_PROPERTY).40 Data types across the bridge were handled manually, often leading to potential runtime errors if types didn't match.
New (TurboModules/Fabric): Starts with defining a strict specification in TypeScript or Flow (NativeSampleModule.ts or similar).22 Codegen reads this spec and generates native interface code (C++ headers, Java interfaces, Objective-C++ protocols).25 The developer then implements these generated interfaces in the platform-specific native language (or potentially C++ for cross-platform modules).33 Communication leverages JSI directly.18 Key differences include enforced type safety via Codegen, lazy loading for TurboModules, and the possibility of synchronous execution.6 Legacy native module/component APIs are considered deprecated.40
E. Preserving App Identity During Upgrades
When migrating an existing app, especially if moving to a new project structure or performing a major version upgrade, it's critical to preserve the app's identity to ensure app stores recognize new builds as updates, not new apps.45 Failure to do so, particularly with signing keys, can permanently prevent updates to the existing store listing.
Key identifiers to maintain:
Bundle Identifier (iOS) / Application ID (Android): Must exactly match the ID of the published app.45 Check Info.plist (iOS) and build.gradle (Android).
Versioning:
iOS: CFBundleShortVersionString (user-facing) and CFBundleVersion (build number) in Info.plist must be greater than the last submitted version.45
Android: versionName (user-facing) and versionCode (integer build number) in build.gradle. versionCode must be incremented for each release.45
App Name / Display Name: Keep consistent with the store listing (CFBundleDisplayName in Info.plist, android:label in AndroidManifest.xml).45
Signing Keys:
iOS: Use the same Apple Developer account, certificates, and provisioning profiles.45
Android: Crucially, use the exact same keystore file and signing credentials used for previous releases. Configure build.gradle and gradle.properties accordingly.45 Losing the keystore means losing the ability to update the app.
Permissions / Capabilities: Ensure the new build requests the same necessary permissions (Android AndroidManifest.xml) and capabilities (iOS Xcode project settings) as the previous version.45
Service Configurations: Carry over configuration files for services like Firebase (google-services.json, GoogleService-Info.plist), push notifications, etc..45
App Identity Checklist:
Platform
File/Setting
Required Action/Value
iOS
Info.plist (CFBundleIdentifier)
Match published Bundle ID exactly
Android
build.gradle (applicationId)
Match published Application ID exactly
Android
AndroidManifest.xml (package)
Match Application ID / old package name
iOS
Info.plist (CFBundleShortVersionString)
Greater than last submitted version
iOS
Info.plist (CFBundleVersion)
Greater than last submitted build number
Android
build.gradle (versionName)
Greater than last submitted version
Android
build.gradle (versionCode)
Must be greater than last submitted version code
iOS
Info.plist (CFBundleDisplayName)
Match published App Name
Android
AndroidManifest.xml (android:label)
Match published App Name
iOS
Apple Developer Account / Certificates / Profiles
Use same account and valid credentials as previous release
Android
Keystore file (.keystore)
Use identical keystore file as previous release
Android
build.gradle / gradle.properties (Signing)
Configure to use the correct, existing keystore
Both
App Icons / Launch Screens
Use consistent app branding assets
Both
Permissions / Capabilities
Match required permissions/capabilities of previous version
Both
Service Config Files (Firebase, etc.)
Copy and correctly integrate existing config files

45
This checklist provides a practical guide to avoid critical errors during migration that could impact app store deployment.
VI. Debugging in the Modern React Native Era
Debugging is an essential part of the development workflow. With the introduction of the New Architecture and associated tools like the Hermes engine, the debugging landscape in React Native has evolved.
A. Overview of Debugging Tools
Several tools are available to help developers diagnose issues in React Native applications:
React Native DevTools: This is the primary, built-in JavaScript debugger for modern React Native, especially when using the Hermes engine.46 It's based on the familiar Chrome DevTools interface and provides a reliable experience for 8:
JavaScript Debugging: Setting breakpoints, stepping through code, inspecting variables and the call stack.
Console: Viewing console.log outputs and interacting with the JS runtime.
React DevTools Integration: Inspecting the React component hierarchy, viewing/editing props and state, and profiling component rendering performance. It is accessed via the in-app Dev Menu ("Open DevTools") or by pressing 'j' in the Metro bundler terminal.46 It replaces older debugging frontends like the Flipper JS debugger, the experimental debugger, and direct Chrome debugging for Hermes.46 This shift signifies a move towards a more integrated and browser-aligned default debugging experience for JavaScript code.
Flipper: Developed by Meta, Flipper is a powerful extensible desktop debugging platform for iOS, Android, and React Native apps.47 While RN DevTools is now the primary JavaScript debugger, Flipper remains highly valuable for:
Native Layer Inspection: Inspecting native layouts, network requests, device logs, crash reports, databases, shared preferences, and cached images using its built-in plugins.47
Plugin Ecosystem: Leveraging a wide range of plugins for specific libraries (e.g., Redux, Zustand, React Navigation, Async Storage) or custom development needs.48
React DevTools: It also includes an integration for React DevTools.49 Flipper integration is included out-of-the-box for debug builds in React Native 0.62 and later.49 However, a known limitation is its lack of support for setting JavaScript breakpoints directly; this task is now handled by React Native DevTools.48
Other Tools:
Reactotron: A standalone desktop app specializing in inspecting application state (including Redux, Zustand, etc.), API requests, and custom log messages.47
Chrome Developer Tools (Direct): While superseded by RN DevTools for Hermes, direct debugging via Chrome (chrome://inspect) might still be applicable for apps using JavaScriptCore or older setups, though potentially slower.15
Editor-Integrated Tools: Tools like Radon IDE offer debugging directly within VS Code, aiming for a seamless workflow.47
B. Debugging Considerations with the New Architecture
The New Architecture introduces nuances to debugging:
Tool Compatibility: React Native DevTools is specifically designed for the New Architecture, particularly when using the Hermes engine.46 Flipper remains compatible (for RN 0.62+), but developers should ensure they are using compatible Flipper SDK versions, especially when upgrading React Native.49 The primary JS debugging flow is intended through RN DevTools.46
JSI/Native Debugging: Debugging issues that occur within the JSI layer, C++ code, TurboModules, or Fabric components often requires stepping beyond JavaScript debuggers. Developers must utilize the native platform debugging tools: Xcode for iOS (Swift/Objective-C/C++) and Android Studio for Android (Java/Kotlin/C++).46 This necessitates a hybrid debugging approach for complex problems spanning the JS-native boundary.
LogBox: React Native's in-app LogBox displays errors and warnings.46 However, fatal errors might halt execution, and warnings might be suppressed. For a comprehensive view of console output, the Console panel within React Native DevTools is recommended as the source of truth.46
C. Debugging Tools Comparison Table
Tool
Key Features
Primary Use Case
New Arch Compatibility Notes
Performance Impact
Setup Complexity
RN DevTools
JS Debugging (Breakpoints, Console, Stack), React Inspector/Profiler, Reliability
Core JavaScript & React Debugging (Hermes)
Default/Recommended for New Arch JS debugging
Low
Minimal (Built-in)
Flipper
Native Inspection (Layout, Network, DB, Logs, etc.), Plugin Ecosystem, React DevTools
Native Layer Inspection, Plugin-based Debugging
Compatible (RN 0.62+), Check SDK versions. No JS breakpoints.
Medium
Low-Medium
Reactotron
State Inspection (Redux, etc.), API Monitoring, Custom Logs, AsyncStorage Inspection
Application State & API Debugging
Generally compatible (check specific plugins)
Low
Medium
Chrome DevTools
JS Debugging, Console, Network
JS Debugging (JSC or older setups)
Superseded by RN DevTools for Hermes; potentially slower
Medium
Low
Xcode/Android Studio
Native Code Debugging (Swift/ObjC/C++, Java/Kotlin/C++), Memory Profiling, Native Layout Inspection, Build Logs
Deep Native Layer, JSI, TurboModule/Fabric Debugging
Essential for debugging native aspects of the New Architecture
N/A (Native)
Medium-High

46
Choosing the right tool depends on the nature of the problem. For JavaScript logic and React component issues, RN DevTools is the starting point. For inspecting native behavior, network traffic, or using specialized library plugins, Flipper is invaluable. For deep dives into native module or renderer issues, Xcode and Android Studio are indispensable. Effective debugging in the New Architecture often involves using these tools in combination.
VII. Conclusion: The Impact of the New Architecture
The introduction of the New Architecture marks a pivotal moment in the evolution of React Native. It moves beyond incremental improvements to address fundamental limitations of the original design, setting a new foundation for the framework's future.
A. Summary of Key Advancements
The core advancements revolve around replacing the performance-limiting asynchronous bridge with more efficient, modern components 4:
JavaScript Interface (JSI): Enables direct, low-latency communication (including synchronous calls) between JavaScript and native code, eliminating serialization overhead.4
Fabric Renderer: A modern rendering system with a shared C++ core, improving UI performance, consistency across platforms, and enabling integration with React's concurrent features.4
TurboModules: An optimized system for native modules featuring lazy loading for faster startup times and reduced memory usage, leveraging JSI for communication.4
CodeGen: Automates the generation of type-safe interface code, reducing boilerplate and improving developer experience when bridging JavaScript and native code.6
Collectively, these changes result in significant potential for improved application performance (smoother animations, faster interactions, quicker startup), better alignment with modern React capabilities (Concurrency, Suspense), enhanced type safety, and a more robust developer experience.2
B. Future Outlook
The New Architecture is more than just a performance upgrade; it's a strategic re-platforming designed for longevity and adaptability.4 By adopting a shared C++ core for rendering (Fabric) and communication (JSI), React Native enhances cross-platform consistency and potentially simplifies expansion to new platforms in the future.4
The tight integration with JSI and support for concurrent features ensures that React Native can readily adopt future advancements in the core React library.4 This shift moves React Native from being perceived as a collection of loosely coupled parts connected by a bridge towards a more cohesive, integrated framework.4 This foundational change positions React Native to remain a competitive and powerful tool for building high-quality, cross-platform native applications for years to come, capable of evolving alongside the rapidly changing landscape of mobile development and the React ecosystem itself.
Works cited
What is a bridge in React Native ? | GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/what-is-a-bridge-in-react-native/
How React Native Architecture Works: Components & Benefits - WPWeb Infotech, accessed May 12, 2025, https://wpwebinfotech.com/blog/react-native-architecture/
What Is React Native? A Beginner-friendly Guide - Brilworks, accessed May 12, 2025, https://www.brilworks.com/blog/what-is-react-native/
The New Architecture of React Native: All you need to know - DEV Community, accessed May 12, 2025, https://dev.to/rushi-patel/decoding-the-new-architecture-of-react-native-4hd5
Understanding React Native's New Architecture: Fabric and ..., accessed May 12, 2025, https://metadesignsolutions.com/understanding-react-natives-new-architecture-fabric-and-turbomodules-explained/
React Native — Ultimate Guide on New Architecture in depth - GitHub, accessed May 12, 2025, https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md
React Native Benefits & Limitations: What You Should Know Before ..., accessed May 12, 2025, https://dev.to/brilworks/react-native-benefits-limitations-what-you-should-know-before-you-build-5f2o
React Native 0.76 - New Architecture by default, React Native ..., accessed May 12, 2025, https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture
About the New Architecture · React Native, accessed May 12, 2025, https://reactnative.dev/docs/the-new-architecture/landing-page
React Native 0.76: The New Architecture That Takes Performance and Efficiency to the Next Level - DEV Community, accessed May 12, 2025, https://dev.to/abdulnasirolcan/react-native-076-the-new-architecture-that-takes-performance-and-efficiency-to-the-next-level-4jam
Fabric - React Native, accessed May 12, 2025, https://reactnative.dev/architecture/fabric-renderer
React Native's New Architecture: Sync and async rendering - DEV ..., accessed May 12, 2025, https://dev.to/leemeganj/react-natives-new-architecture-sync-and-async-rendering-1d7f
How does React Native's New Architecture affect performance ..., accessed May 12, 2025, https://dev.to/amazonappdev/how-does-react-natives-new-architecture-affect-performance-1dkf
Fabric - React Native Renderer | True Sparrow Blog, accessed May 12, 2025, https://truesparrow.com/blog/react-native-fabric/
JavaScript Environment - React Native, accessed May 12, 2025, https://reactnative.dev/docs/javascript-environment
Fabric Architecture in React Native - Tutorialspoint, accessed May 12, 2025, https://www.tutorialspoint.com/how-does-the-fabric-architecture-work-in-react-native
React Native Android: Bridging an Android Native Module - Approov, accessed May 12, 2025, https://approov.io/blog/react-native-bridging-an-android-native-module-for-app-authentication
Deep Dive into React Native's New Architecture: JSI, TurboModules ..., accessed May 12, 2025, https://www.sharepointeurope.com/deep-dive-into-react-natives-new-architecture-jsi-turbomodules-fabric-yoga/
React Native Rolls out New Architecture: Everything You Need to Know - SoftProdigy, accessed May 12, 2025, https://softprodigy.com/react-native-rolls-out-new-architecture-everything-you-need-to-know/
The New React Native Architecture - DEV Community, accessed May 12, 2025, https://dev.to/joaoalissonsilva/the-new-react-native-architecture-1jn9
react-native-sync-tasks: Blazing-fast background polling via JSI (C++/Rust) - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1jz9kyl/reactnativesynctasks_blazingfast_background/
Understanding Turbo Modules in React Native - Intertoons Internet ..., accessed May 12, 2025, https://intertoons.com/understanding-turbo-modules-in-react-native.html
React Native Fabric: How It Enhances Mobile Development?, accessed May 12, 2025, https://www.bacancytechnology.com/blog/react-native-fabric
Render, Commit, and Mount - React Native, accessed May 12, 2025, https://reactnative.dev/architecture/render-pipeline
What is Codegen? - React Native, accessed May 12, 2025, https://reactnative.dev/docs/the-new-architecture/what-is-codegen
How to Easily Create Native Libraries With Nitro and Turbo Modules | {callstack}, accessed May 12, 2025, https://www.callstack.com/blog/bridgeless-native-development
Lynx vs. React Native: Performance Implications and Benchmarking ..., accessed May 12, 2025, https://www.rutvikbhatt.com/lynx-vs-react-native-performance-implications-and-benchmarking/
Did the new React Native architecture make it faster/as fast as flutter ..., accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1aoz3kv/did_the_new_react_native_architecture_make_it/
What are the IPC mechanisms available in the Android OS? - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/5740324/what-are-the-ipc-mechanisms-available-in-the-android-os
React Native Under the Hood: How Your JS, iOS, and Android Code ..., accessed May 12, 2025, https://dev.to/nour_abdou/react-native-under-the-hood-how-your-js-ios-and-android-code-run-together-3k2e
React Native vs. Swift: A Detailed Comparison for iOS App Development - Moon Technolabs, accessed May 12, 2025, https://www.moontechnolabs.com/blog/react-native-vs-swift/
A Guide to Upgrade Your React Native Project to the New Architecture - DEV Community, accessed May 12, 2025, https://dev.to/ajmal_hasan/a-step-by-step-guide-to-upgrading-your-react-native-project-to-the-new-architecture-3o20
react-native-new-architecture/docs/turbo-modules-xplat.md at main - GitHub, accessed May 12, 2025, https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules-xplat.md
react-native-new-architecture/docs/codegen.md at main - GitHub, accessed May 12, 2025, https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md
Upgrading to new versions - React Native, accessed May 12, 2025, https://reactnative.dev/docs/upgrading
react-native-new-architecture/docs/enable-libraries-prerequisites.md at main - GitHub, accessed May 12, 2025, https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-libraries-prerequisites.md
react-native-new-architecture/docs/backwards-compat-turbo-modules.md at main - GitHub, accessed May 12, 2025, https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat-turbo-modules.md
react-native-new-architecture/docs/backwards-compat-fabric-component.md at main, accessed May 12, 2025, https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat-fabric-component.md
The Codegen CLI - React Native, accessed May 12, 2025, https://reactnative.dev/docs/the-new-architecture/codegen-cli
Native Modules Intro, accessed May 12, 2025, https://reactnative.dev/docs/legacy/native-modules-intro
React-Native Bridging with Native Code- Android/ios app development, accessed May 12, 2025, https://www.qsstechnosoft.com/blog/react-native-bridging-with-native-code-androidios
Android Native Modules, accessed May 12, 2025, https://reactnative.dev/docs/legacy/native-modules-android
iOS Native UI Components, accessed May 12, 2025, https://reactnative.dev/docs/legacy/native-components-ios
Fabric Native Components Introduction, accessed May 12, 2025, https://reactnative.dev/docs/fabric-native-components-introduction
Migrating an Old React Native App to a New Version – The Clean ..., accessed May 12, 2025, https://dev.to/ajmal_hasan/migrating-an-old-react-native-app-to-a-new-version-the-clean-way-3l60
Debugging Basics - React Native, accessed May 12, 2025, https://reactnative.dev/docs/debugging
React Native Debugging Tools (2025) - DEV Community, accessed May 12, 2025, https://dev.to/wafa_bergaoui/react-native-debugging-tools-2025-32f
React Native Debugger Showdown: Flipper vs. Debugger vs ..., accessed May 12, 2025, https://www.fullstack.com/labs/resources/blog/flipper-vs-react-native-debugger-vs-reactotron
React Native App - Automatic Setup - Flipper, accessed May 12, 2025, https://fbflipper.com/docs/getting-started/react-native/
React Native Support | Flipper, accessed May 12, 2025, https://fbflipper.com/docs/features/react-native/
