# Module 2: React Native Architecture Explained

React Native allows you to build mobile apps using JavaScript and React, but how does that JavaScript code actually interact with the native platform (iOS or Android) to display UI and access device features? Understanding the underlying architecture is key to writing efficient, performant applications and troubleshooting effectively. This module delves into the core mechanisms that power React Native, comparing the original "Legacy Architecture" with the modern "New Architecture."

**(Target Audience Adaptation)**

This module is crucial for all developers, regardless of background.

- 🍏 **(iOS Developers):** You'll see parallels between the communication mechanisms discussed here and concepts like Objective-C bridging or Swift interoperability, but also key differences in how React Native manages the UI thread.
- 🤖 **(Android Developers):** Concepts like Java Native Interface (JNI) might come to mind, but React Native's approach, especially with the New Architecture, introduces different patterns for cross-language communication and UI rendering.
- 🌐 **(Web Developers - React/Angular):** While you're familiar with JavaScript controlling the UI, the way React Native interacts with distinct native platforms introduces complexities not found in the browser DOM, particularly around threading and native module communication. Understanding this bridge is vital.

**Learning Objectives**

By the end of this module, you will be able to:

- Describe the key components and limitations of React Native's Legacy Architecture (the Bridge).
- Explain the core concepts and benefits of the New Architecture (JSI, TurboModules, Fabric, Codegen).
- Compare and contrast how rendering works in the Legacy Architecture versus the New Architecture (Fabric).
- Discuss the practical implications of the New Architecture for performance and developer capabilities.
- Create a basic diagram illustrating the core components of both architectures.

**Prerequisites**

- Completion of [Module 1: The Landscape of Mobile Development](../module-01-mobile-landscape/module-introduction.md) (TODO: Update link when Module 1 file structure is finalized).

---

## Section 1: Legacy Architecture: The Bridge (Concepts, Limitations)

Welcome to the first step in understanding how React Native works under the hood. For many years, the "Legacy Architecture" was the standard way React Native enabled communication between your JavaScript code and the native platforms (iOS and Android). This architecture operated across three primary threads:

1.  **JavaScript (JS) Thread:** This is where your application's JavaScript code executed. All business logic, React component rendering logic, and API calls initiated from JavaScript ran here. Often, this execution was handled by the JavaScriptCore (JSC) engine, the same engine powering Safari.
2.  **Native/UI Thread (Main Thread):** This is the main application thread provided by the host operating system (Android or iOS). It was solely responsible for handling the native UI toolkit – creating, updating, and displaying native views, and processing user gestures (touches, scrolls) directly from the OS. Any direct manipulation of the native UI could only happen on this thread.
3.  **Shadow Thread:** To avoid blocking the UI thread with potentially complex layout calculations, the legacy architecture introduced this background thread. Its primary role was to take the layout information defined in JavaScript (using React Native's layout props) and calculate the exact positions and sizes of the native views. It constructed a "Shadow Tree," mirroring the UI hierarchy but containing computed layout attributes. The **Yoga Layout Engine**, a cross-platform layout engine implementing Flexbox, operated on this thread to translate your styles into a layout system the native platform could render.

At the heart of this multi-threaded architecture lies the **Bridge**.

**What is the Bridge?**

Think of the Bridge as a communication channel connecting the JavaScript Thread with the Native/UI and Shadow Threads. Since JavaScript and native code run in separate environments (different threads, different memory spaces), they couldn't directly interact. The Bridge acted as an intermediary, translating messages between them.

**How Communication Works:**

Communication across the Bridge was fundamentally **asynchronous**, **serialized**, and **batched**:

1.  **Asynchronous:** When your JavaScript code needed to interact with the native side (e.g., update a UI element, call a native module), it sent a message across the Bridge. It didn't wait for a response before continuing its execution. Similarly, native events (like a button press or device rotation) were sent asynchronously to the JavaScript realm.
2.  **Serialized:** Data sent across the Bridge needed to be converted into a format both sides could understand. This typically involved serializing the data into a JSON string. When the other side received the message, it would deserialize the JSON back into its native data structures (JavaScript objects or native dictionaries/maps).
3.  **Batched:** To avoid flooding the Bridge with too many small messages (which would be inefficient), React Native often batched multiple operations together into a single message sent across the Bridge, typically at the end of each iteration of the JavaScript event loop.

> 🤖 **(Android Developers):**
>
> **Comparison:** This asynchronous, message-passing approach is different from directly calling Java/Kotlin methods from C++ via JNI, which can be synchronous. The serialization step adds overhead not typically present in direct JNI calls.
>
> **Key Takeaway:** The Bridge introduces inherent latency due to its asynchronous nature and the need for serialization/deserialization, unlike potentially faster, synchronous JNI interactions.
>
> **Source:** [JNI Tips | Android Developers](https://developer.android.com/training/articles/perf-jni#jni-tips)

> 🍏 **(iOS Developers):**
>
> **Comparison:** While Objective-C/Swift bridging allows communication between languages, the React Native Bridge imposes a specific asynchronous, JSON-based protocol. Directly calling native APIs from JavaScript isn't possible in the way you might call Swift code from Objective-C.
>
> **Key Takeaway:** The Bridge acts as a necessary but potentially bottlenecking intermediary, unlike the more direct (though still rule-bound) interoperability between Objective-C and Swift.
>
> **Source:** [Swift and Objective-C Interoperability | Apple Developer Documentation](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift)

**Limitations of the Bridge:**

While functional, the Bridge architecture presented several challenges:

1.  **Performance Bottlenecks:** The asynchronous nature meant delays. Heavy traffic across the Bridge (e.g., rapid UI updates during animations, large data transfers) could lead to performance issues, dropped frames, and a less responsive feel. The serialization/deserialization process also added computational overhead.
2.  **The "Bridge Tax":** Every interaction between JS and native incurred the cost of serialization, crossing the asynchronous boundary, and deserialization.
3.  **Asynchronicity Constraints:** The inherently asynchronous nature made certain UI patterns difficult to implement correctly. For example, measuring a view's layout using `onLayout` was asynchronous. This meant the layout information might arrive _after_ the component had already rendered, sometimes causing a visual "jump" as the layout corrected itself.
4.  **Threading Issues & Single-Threaded JS:** JavaScript itself is single-threaded. Heavy computations running on the JS thread could block the processing of incoming messages from the native side or delay sending UI updates across the Bridge. Coordinating between these threads via the asynchronous Bridge could be complex and prone to synchronization problems.
5.  **Type Safety:** Passing data as JSON strings meant losing type information at the boundary, potentially leading to runtime errors if the data wasn't handled carefully on both sides.
6.  **Limited Synchronous Access:** It was difficult or impossible for JavaScript to synchronously call native methods and get an immediate result, which is sometimes necessary for certain calculations or initial setup.
7.  **Debugging Challenges:** Tracing data flow and pinpointing errors across the asynchronous boundary of the Bridge could be difficult, making it unclear whether a bug originated in JavaScript, native code, or the communication itself.

These limitations were key motivators for the development of React Native's New Architecture, which we'll explore in the next section. Understanding the Bridge provides crucial context for appreciating the advancements brought by the modern approach.
