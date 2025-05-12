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