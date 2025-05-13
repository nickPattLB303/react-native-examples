# Module 7: React Essentials for React Native

Welcome to Module 7! This module is your gateway to understanding React, the JavaScript library that powers React Native. While React Native allows you to build native mobile applications, its core principles, syntax, and development patterns are deeply rooted in React. Mastering these React essentials is crucial for building robust, scalable, and maintainable applications for iOS and Android. We'll explore concepts like JSX, components, props, state, event handling, conditional rendering, lists, keys, the component lifecycle, and the Context API, all tailored to their application in a React Native context.

## Target Audience Adaptation

This module is designed to build a strong React foundation, regardless of your prior development experience.

> 🍏 **(iOS Developers):** You'll find similarities between React's component-based architecture and UIKit's `UIView` system. Concepts like props for passing data might remind you of how you configure `UIViewController` properties. Pay close attention to how state management in React differs from imperative state handling in Swift or Objective-C.
>
> **Source:** [Apple Developer Documentation - Views](https://developer.apple.com/documentation/uikit/uiview)

> 🤖 **(Android Developers):** React's declarative approach to UI construction might seem different from Android's XML layouts and imperative View manipulation. Think of React components as analogous to reusable `ViewGroups` or custom Views. The concept of state will be key, contrasting with how you might manage state within Activities or Fragments.
>
> **Source:** [Android Developer Documentation - UI Overview](https://developer.android.com/guide/topics/ui/overview)

> ⚛️ **(Web Developers - React):**
>
> **Comparison:** Much of this module will feel familiar. Key concepts like JSX, components, props, state, `useEffect`, and Context are identical. The primary difference you'll notice is the set of available components (e.g., `<View>` instead of `<div>`, `<Text>` instead of `<p>`) and how styling is applied (StyleSheet API instead of CSS files, though the principles of Flexbox remain). Event handling will also map closely, with `onPress` being a common equivalent to `onClick`.
>
> **Key Takeaway:** Leverage your existing React knowledge. Focus on the subtle differences in component APIs, styling, and event names specific to the React Native environment.
>
> **Source:** [React Documentation - Main Concepts](https://react.dev/learn)

> 🅰️ **(Web Developers - Angular):**
>
> **Comparison:** You'll recognize the component-based architecture. Angular components, with their templates and TypeScript classes, have conceptual parallels to React functional components. Props are similar to `@Input()` decorators for passing data into components, and state management with `useState` can be compared to managing properties within an Angular component class that trigger change detection. Event handling (e.g., `(click)`) is analogous to React's `onPress`.
>
> **Key Takeaway:** Focus on JSX as the templating syntax (instead of HTML templates), the `useState` and `useEffect` Hooks for managing state and side effects (instead of class properties and lifecycle hooks like `ngOnInit` or `ngOnChanges`), and how data flows uni-directionally.
>
> **Source:** [Angular Documentation - Introduction to components](https://angular.io/guide/component-overview)

> 🌐 **(Web Developers - General):** If you have experience with other JavaScript frameworks or vanilla JavaScript DOM manipulation, you'll find React's approach to building UIs declarative and efficient. Focus on understanding the component model, how data flows through props and state, and the power of JSX for describing your UI structure.

## Learning Objectives

Upon completing this module, you will be able to:

- Describe React's declarative UI paradigm and component-based architecture.
- Write and understand JSX syntax for defining UI elements in React Native.
- Create and use functional components to build modular UIs.
- Pass data to components using props and define their types with TypeScript.
- Manage component-specific data using the `useState` Hook.
- Handle user interactions like presses using event handlers.
- Implement conditional rendering to show or hide UI elements based on conditions.
- Render lists of data efficiently using `map` and unique keys.
- Manage side effects, data fetching, and subscriptions using the `useEffect` Hook.
- Understand the basic concepts of the React Context API for global state management.

## Prerequisites

- Completion of [Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md).
- Familiarity with basic JavaScript concepts covered in [Module 5: JavaScript Essentials for React Native](../module-05-javascript-essentials-for-react-native/section-00-introduction.md).

## Module Challenge

At the end of this module, you will apply the concepts learned to build a simple medication list application:

- **Challenge 7: Simple Medication List App** ([Link to be provided - CodeSandbox](https://codesandbox.io))

## Module Summary

This module provides the essential React knowledge required for effective React Native development. You'll learn about building UIs with components, managing data with props and state, handling user interactions, and controlling component behavior with lifecycle methods and context. These foundational React concepts are directly transferable and form the bedrock of more advanced React Native topics.

## Additional Resources

> 📚 **Official Documentation:**
>
> - [React Documentation - Learn React](https://react.dev/learn)
> - [Thinking in React - React Documentation](https://react.dev/learn/thinking-in-react)
