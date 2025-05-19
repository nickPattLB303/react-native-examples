# Module 2: React Native Architecture Explained

![React Native architecture showing JavaScript thread and native components connected via bridges and interfaces](./assets/images/module-02/architecture-overview-banner.png)

A conceptual overview of React Native's architecture, showing the interplay of its core components.

React Native allows you to build mobile apps using JavaScript and React, but how does that JavaScript code actually interact with the native platform (iOS or Android) to display UI and access device features? Understanding the underlying architecture is key to writing efficient, performant applications and troubleshooting effectively. This module delves into the core mechanisms that power React Native, comparing the original "Legacy Architecture" with the modern "New Architecture."

One of the key benefits of understanding React Native's architecture is the ability to make better decisions for our SpeedyMeds pharmacy application. For instance, knowing how the Bridge affects performance can help us optimize areas like medication list rendering or patient form handling, ensuring a smooth user experience even with large datasets.

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
> **Source:** [React Native: Bridging in React Native](https://reactnative.dev/architecture/glossary#bridge)

## Learning Objectives

By the end of this module, you will be able to:

- Describe the key components and limitations of React Native's Legacy Architecture (the Bridge).
- Explain the core concepts and benefits of the New Architecture (JSI, TurboModules, Fabric, Codegen).
- Compare and contrast how rendering works in the Legacy Architecture versus the New Architecture (Fabric).
- Discuss the practical implications of the New Architecture for performance and developer capabilities.
- Create a basic diagram illustrating the core components of both architectures.
- Apply architectural understanding to make informed decisions for the SpeedyMeds application development.

## Prerequisites

- Completion of [Module 1: The Landscape of Mobile Development](../module-01-the-landscape-of-mobile-development/section-00-introduction.md)
- Basic understanding of JavaScript and React concepts
- Familiarity with general application development principles

## Module Sections

- [Section 1: Legacy Architecture: The Bridge (Concepts, Limitations)](./section-01-legacy-architecture.md)
- [Section 2: The New Architecture: JSI, TurboModules, Fabric, Codegen (Concepts, Benefits)](./section-02-new-architecture.md)
- [Section 3: How Rendering Works (Legacy vs. Fabric)](./section-03-rendering.md)
- [Section 4: Implications for Developers (Performance, Synchronous Operations)](./section-04-implications.md)

## Module Challenge

After completing all sections, you'll test your understanding by creating architectural diagrams in the module challenge:

**(https://whiteboard.microsoft.com/architecture-diagramming)**

## Module Summary

This module explores the evolution of React Native's architecture from the Legacy Bridge model to the modern New Architecture. You'll gain insight into how JavaScript code communicates with native platforms, the rendering process for UI components, and the practical implications of these architectural designs on performance and development. This knowledge forms a crucial foundation for building efficient React Native applications, including our SpeedyMeds pharmacy app, where understanding these principles will help us make better technical decisions throughout development.

## Additional Resources

- [React Native Architecture Documentation](https://reactnative.dev/architecture/overview)
- [Hermes Engine: Improving React Native Performance](https://hermesengine.dev/)
- [React Native New Architecture Working Group Discussions](https://github.com/react-native-community/discussions-and-proposals/labels/new%20architecture)
- [React Native New Architecture - Deep Dive Blog Post](https://medium.com/@DhruvHarsora/deep-dive-into-react-natives-new-architecture-jsi-turbomodules-fabric-yoga-234bbdf853b4)
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
