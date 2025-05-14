# Module 9: React Native Core APIs and Hooks

This module delves into essential React Native Core APIs and Hooks that empower you to interact with device features, manage component behavior, and optimize performance. You'll learn to write platform-specific code, access device dimensions, display alerts, and master advanced Hook patterns like `useRef`, `useCallback`, `useMemo`, and custom Hooks. By the end of this module, you'll be able to leverage these powerful tools to build more dynamic, responsive, and efficient SpeedyMeds application features.

## Target Audience Adaptation

Understanding how to interact with the underlying platform and manage component logic efficiently is crucial for all developers. Here's how this module connects to various backgrounds:

> 🍏 **(iOS Developers):**
>
> **Comparison:** You will find parallels between native APIs (like UIKit alerts or `UIDevice` information) and their React Native counterparts, such as the `Alert` API or `Platform` module. The Hooks discussed will offer a new perspective on managing component lifecycle and state compared to traditional Swift or Objective-C patterns.
>
> **Key Takeaway:** React Native provides abstracted APIs for common native functionalities, and Hooks offer a declarative approach to state and lifecycle distinct from imperative native patterns.

> 🤖 **(Android Developers):**
>
> **Comparison:** You will recognize concepts from the Android SDK, such as accessing platform-specific features (like `Build.VERSION`) or device metrics, now accessible through React Native's `Platform` and `Dimensions` APIs. React Hooks will provide a declarative way to handle component logic, which you can compare to Kotlin/Java lifecycle methods and state management.
>
> **Key Takeaway:** React Native offers JavaScript-based access to familiar Android capabilities, with Hooks providing a unified model for component logic that differs from Android's Activity/Fragment lifecycles.

> ⚛️ **(React Web Developers):**
>
> **Comparison:** You will build upon your existing knowledge of core React Hooks (`useState`, `useEffect`, `useContext`) and explore new ones like `useRef` for direct native component interaction. You'll also see how `useCallback` and `useMemo` are applied for performance optimization in a mobile context, and how custom Hooks can be particularly powerful for encapsulating mobile-specific logic within the SpeedyMeds app.
>
> **Key Takeaway:** Core React Hook knowledge is directly transferable, but you'll learn mobile-specific applications, performance nuances, and direct native interaction capabilities unique to React Native.

> 🅰 **(Angular Web Developers):**
>
> **Comparison:** You will discover React Native's approach to component logic, side effects, and performance optimization through Hooks. This can be compared to Angular's services, lifecycle hooks, and change detection strategies. Understanding these Hooks will be key to building performant and maintainable components in React Native.
>
> **Key Takeaway:** React Native utilizes a Hook-based system for component logic and state, contrasting with Angular's more structured approach using decorators, services, and specific lifecycle methods.

## Learning Objectives

Upon successful completion of this module, you will be able to:

- Detect the user's platform (iOS or Android) and apply platform-specific styles or logic using the `Platform` module.
- Retrieve device screen dimensions using the `Dimensions` API to create responsive layouts for the SpeedyMeds app.
- Display native system alerts for user feedback and important messages using the `Alert` API.
- Differentiate and apply core React Hooks (`useState`, `useEffect`, `useContext`) effectively within React Native components.
- Utilize the `useRef` Hook to gain direct access to native component instances or manage mutable values without triggering re-renders.
- Optimize component rendering performance and prevent unnecessary computations using `useCallback` and `useMemo`.
- Design and implement custom Hooks to encapsulate and reuse stateful logic across various components in the SpeedyMeds application.

## Prerequisites

Before starting this module, ensure you have a good understanding of the following:

- Completion of [Module 5: JavaScript Essentials for React Native](../module-05-javascript-essentials-for-react-native/section-00-introduction.md)
- Completion of [Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md)
- Completion of [Module 7: React Essentials for React Native](../module-07-react-essentials-for-react-native/section-00-introduction.md)
- Completion of [Module 8: React Native Core Components](../module-08-react-native-core-components/section-00-introduction.md)
- Familiarity with creating and styling basic React Native components.

## Module Sections

- [Section 1: Platform Module](./section-01-platform-module.md)
- [Section 2: Dimensions API](./section-02-dimensions-api.md)
- [Section 3: Alert API](./section-03-alert-api.md)
- [Section 4: Core React Hooks Recap](./section-04-core-react-hooks-recap.md)
- [Section 5: \`useRef\` Hook](./section-05-useref-hook.md)
- [Section 6: \`useCallback\` and \`useMemo\` Hooks](./section-06-usecallback-and-usememo-hooks.md)
- [Section 7: Creating Custom Hooks](./section-07-creating-custom-hooks.md)

## Module Challenge

Throughout this module, you've learned about various core APIs and Hooks. Now it's time to combine this knowledge.

- **Challenge 9: Custom Hook for Device Information**
  - **Objective:** Create a custom Hook named `useScreenGuard` that provides information about the current screen orientation (portrait or landscape) and whether a minimum screen width for the SpeedyMeds app (e.g., 320dp) is met. If the screen width is below the minimum, the hook should also provide a function to show an `Alert` recommending a better viewing experience.
  - **Instructions:** You will need to create a new Expo Snack for this challenge. Your Snack should demonstrate the `useScreenGuard` hook in action. Consider building upon the `useDeviceInformation` custom hook concepts from Section 7 or developing it from scratch.
  - **Tool:** **(https://snack.expo.dev/)**

## Module Summary

In this module, you explored key React Native Core APIs and advanced Hook patterns. You learned how to use the `Platform` module to write OS-specific code and the `Dimensions` API to create responsive layouts. You also mastered displaying native alerts with the `Alert` API. We recapped essential React Hooks (`useState`, `useEffect`, `useContext`) and then delved deeper into `useRef` for accessing component instances and managing mutable values, and `useCallback` and `useMemo` for crucial performance optimizations. Finally, you learned the power of creating custom Hooks to encapsulate and reuse complex stateful logic, making your SpeedyMeds application code more modular, readable, and maintainable. These tools are fundamental for building sophisticated and high-performing mobile applications.

## Additional Resources (Optional)

- [React Native Performance](https://reactnative.dev/docs/performance) - Official documentation on various performance considerations.
- [Understanding React's key prop](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) - Essential for list performance, often related to `useCallback` and `useMemo` in list items.
- [A Visual Guide to React Rendering - It Always Re-renders? by Alex Sidorenko](https://alexsidorenko.com/blog/react-render-always/) - A blog post that can help understand React's rendering behavior, which is context for optimization Hooks.
