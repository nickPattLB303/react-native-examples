# Module 14: Working with Native Modules

React Native offers a vast array of components and APIs to build powerful cross-platform applications. However, there are times when you need to access platform-specific APIs or integrate existing native code that isn't available out-of-the-box. This is where native modules come into play. This module explores what native modules are, why they're essential, how to use existing ones, and provides a conceptual overview of creating your own. Understanding native modules unlocks the full potential of React Native, allowing you to bridge the gap between JavaScript and the underlying native platforms.

🍏🤖 **(Native Developers):** You're already familiar with writing code for iOS or Android. This module will show you how React Native allows your JavaScript code to interact with the native features you know, and how to leverage pre-built native functionalities within a React Native context. The concept of "bridging" will be key here, translating JavaScript calls into native operations.

🌐 **(Web Developers):** Coming from a web background, the idea of interacting directly with device hardware or platform-specific operating system features might be new. This module will introduce you to how React Native extends JavaScript's capabilities into the native realm. You'll learn that while React Native abstracts many platform differences, native modules are the gateway to deeper device integration.

## Learning Objectives

By the end of this module, you will be able to:

- Define native modules and explain their purpose in React Native.
- Describe scenarios where using native modules is necessary or beneficial.
- Utilize existing native modules from the Expo SDK and community libraries.
- Identify key Expo SDK modules and their common use cases.
- Explain the conceptual process of creating a new native module.
- Summarize the role of TurboModules in the New Architecture.
- Describe how JSI enables direct communication between JavaScript and native code.
- Understand the concept of bridging native UI components.

## Prerequisites

Before starting this module, you should have a good understanding of the following:

- Completion of [Module 1: The Landscape of Mobile Development](../module-01-the-landscape-of-mobile-development/section-00-introduction.md)
- Completion of [Module 2: React Native Architecture Explained](../module-02-react-native-architecture-explained/section-00-introduction.md)
- Completion of [Module 3: Setting Up Your React Native Environment with Expo](../module-03-setting-up-your-react-native-environment-with-expo/section-00-introduction.md)
- Completion of [Module 5: JavaScript Essentials for React Native](../module-05-javascript-essentials-for-react-native/section-00-introduction.md) (particularly Asynchronous JavaScript)
- Completion of [Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md)
- Completion of [Module 8: React Native Core Components](../module-08-react-native-core-components/section-00-introduction.md)

### Challenge 14: Research Native Module Alternatives

This challenge encourages you to think critically about when and why you might reach for a custom native module by researching existing solutions for a common problem.

**Objective:** Research and compare different approaches (Expo SDK modules, community libraries, or conceptual native module creation) for implementing a specific feature, such as background location tracking or advanced Bluetooth Low Energy (BLE) communication for the SpeedyMeds app (e.g., for a smart pill dispenser integration).

**Instructions:** This is a research-based challenge using Microsoft Forms. The Form will guide you through:

1.  Identifying a specific advanced native feature relevant to SpeedyMeds.
2.  Searching for existing Expo SDK modules that might address the feature.
3.  Searching for community-maintained React Native libraries.
4.  Conceptually outlining what native APIs (iOS/Android) would be involved if you had to build it from scratch.
5.  Summarizing the pros and cons of each approach (using existing vs. building new).

**(https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID_HERE)**_Replace YOUR_FORM_ID_HERE with the actual ID of the Microsoft Form for this challenge._

## Module Summary

This module provided a comprehensive overview of working with native modules in React Native. You learned what native modules are, why they are crucial for extending React Native's capabilities, and how to utilize existing modules from the Expo SDK and the broader community. We explored key Expo SDK modules and their common use cases, giving you a toolkit for accessing many common device features.

Furthermore, we introduced the conceptual process of creating your own native modules, setting the stage for more advanced development. Crucially, this module shed light on the New Architecture, explaining the roles of TurboModules for more performant and type-safe native code, JSI for direct JavaScript-to-native communication, and the concept of bridging native UI components with Fabric. While creating custom native code is an advanced topic, understanding these concepts is vital for any React Native developer looking to build deeply integrated and high-performing applications.

## Additional Resources

- [Awesome React Native - Native Modules Section](https://github.com/jondot/awesome-react-native#native-modules) (A curated list of community libraries)
- [Expo Blog](https://blog.expo.dev/) (Often features articles on new modules and native capabilities)
- [React Native New Architecture Working Group Discussions](https://github.com/react-native-community/discussions-and-proposals/labels/new-architecture) (For deep dives into the New Architecture evolution)
