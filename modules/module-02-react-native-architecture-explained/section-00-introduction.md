# Module 2: React Native Architecture Explained

React Native allows you to build mobile apps using JavaScript and React, but how does that JavaScript code actually interact with the native platform (iOS or Android) to display UI and access device features? Understanding the underlying architecture is key to writing efficient, performant applications and troubleshooting effectively. This module delves into the core mechanisms that power React Native, comparing the original "Legacy Architecture" with the modern "New Architecture."

> 🍏 **(iOS Developers):**
>
> **Comparison:** You'll see parallels between the communication mechanisms discussed here and concepts like Objective-C bridging or Swift interoperability, but also key differences in how React Native manages the UI thread.
>
> **Key Takeaway:** React Native's architecture mediates between JavaScript and native code in ways that differ from traditional iOS development patterns.
>
> **Source:** [Swift and Objective-C Interoperability | Apple Developer Documentation](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift)

> 🤖 **(Android Developers):**
>
> **Comparison:** Concepts like Java Native Interface (JNI) might come to mind, but React Native's approach, especially with the New Architecture, introduces different patterns for cross-language communication and UI rendering.
>
> **Key Takeaway:** While JNI allows Java code to call native methods, React Native's architecture creates a more structured bridge that's evolving toward direct JavaScript-to-native communication.
>
> **Source:** [JNI Tips | Android Developers](https://developer.android.com/training/articles/perf-jni#jni-tips)

> 🌐 **(Web Developers):**
>
> **Comparison:** While you're familiar with JavaScript controlling the UI, the way React Native interacts with distinct native platforms introduces complexities not found in the browser DOM, particularly around threading and native module communication.
>
> **Key Takeaway:** Understanding this architecture is vital as it explains why some React patterns work differently in React Native and how performance considerations differ from web.
>
> **Source:** [React Native: Bridging in React Native](https://reactnative.dev/architecture/glossary#Bridge)

**Learning Objectives**

By the end of this module, you will be able to:

- Describe the key components and limitations of React Native's Legacy Architecture (the Bridge).
- Explain the core concepts and benefits of the New Architecture (JSI, TurboModules, Fabric, Codegen).
- Compare and contrast how rendering works in the Legacy Architecture versus the New Architecture (Fabric).
- Discuss the practical implications of the New Architecture for performance and developer capabilities.
- Create a basic diagram illustrating the core components of both architectures.

**Prerequisites**

- Completion of Module 1: The Landscape of Mobile Development
