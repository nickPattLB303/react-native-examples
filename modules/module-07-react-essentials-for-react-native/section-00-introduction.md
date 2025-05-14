# Module 7: React Essentials for React Native

Welcome to Module 7! Now that you have a solid understanding of JavaScript and TypeScript, it's time to dive into the core concepts of React. React is the JavaScript library that powers React Native, and mastering its fundamentals is essential for building robust and efficient mobile applications. This module will equip you with the foundational React knowledge you'll need to start creating dynamic user interfaces in React Native.

> 🛣️ **(All Learners):** This module is crucial for everyone, regardless of your background. While the concepts might seem familiar to those with web React experience, pay close attention to how these fundamentals apply within the React Native context and any differences highlighted.

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** You'll find many concepts like JSX, components, props, and state very familiar. Key differences in React Native include the set of available UI elements (Core Components like `<View>`, `<Text>` instead of HTML DOM elements like `<div>`, `<p>`) and event handling (e.g., `onPress` for touch events instead of `onClick` for mouse clicks).
>
> **Key Takeaway:** While the core React philosophy remains, adapt your knowledge to mobile-specific UI components and interaction patterns.
>
> **Source:** [React Native Docs: Core Components](https://reactnative.dev/docs/intro-react-native-components), [React Native Docs: Handling Touches](https://reactnative.dev/docs/handling-touches)

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** React uses JSX for templating, which integrates HTML-like syntax directly within JavaScript, differing from Angular's separate HTML templates. State management often starts with the `useState` Hook for local component state, and React generally follows a unidirectional data flow, contrasting with Angular's two-way data binding capabilities with `ngModel`.
>
> **Key Takeaway:** Embrace JSX for UI definition and understand React's approach to state and data flow, which might be more explicit than what you're used to.
>
> **Source:** [React Docs: Introducing JSX](https://react.dev/learn/writing-markup-with-jsx), [React Docs: State - A Component's Memory](https://react.dev/learn/state-a-components-memory)

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** React Native employs a declarative UI paradigm where you describe _what_ the UI should look like based on the current state, unlike the imperative approach often used in native development (e.g., manually updating UI elements in UIKit or Android Views). Component lifecycle events, managed with the `useEffect` Hook, are analogous to `UIViewController` lifecycles (e.g., `viewDidLoad`, `viewWillAppear`) or Android `Activity` lifecycles (e.g., `onCreate`, `onResume`), but are handled within a JavaScript context.
>
> **Key Takeaway:** Shift your thinking from direct manipulation of UI elements to describing UI based on state, and learn how `useEffect` manages component behavior over time.
>
> **Source:** [React Docs: Describing the UI](https://react.dev/learn/describing-the-ui), [React Docs: Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)

## Learning Objectives

By the end of this module, you will be able to:

- Describe React's declarative UI paradigm and component-based architecture.
- Write and understand JSX syntax for defining UI structures.
- Create functional React components.
- Pass data to components using props and manage their types with TypeScript.
- Manage component-specific data using the `useState` Hook.
- Handle user interactions, such as press events.
- Implement conditional rendering to dynamically display UI elements.
- Render lists of data efficiently using keys.
- Manage component side effects and lifecycle events using the `useEffect` Hook.
- Understand and use the React Context API for basic global state management.

## Prerequisites

Before starting this module, ensure you have a good understanding of the following:

- Completion of **Module 4: Web Development Essentials Refresher** (especially HTML and CSS concepts)
- Completion of **Module 5: JavaScript Essentials for React Native** (especially ES6+ features like arrow functions, destructuring, and asynchronous JavaScript)
- Completion of **Module 6: TypeScript Essentials** (all subsequent code examples in this course will use TypeScript)

With these prerequisites, you're ready to explore the powerful world of React! Let's begin.

---

## Module Sections

This module is divided into the following sections. You can navigate to them directly if you are looking for specific information, or proceed sequentially for a comprehensive understanding.

- [Section 1: Introduction to React (Declarative UI, Component-Based)](./section-01-introduction-to-react.md)
- [Section 2: JSX (Syntax, Embedding Expressions, Attributes)](./section-02-jsx.md)
- [Section 3: Components (Functional Components Focus, Class Components Brief Mention)](./section-03-components.md)
- [Section 4: Props (Passing Data Down)](./section-04-props.md)
- [Section 5: State (`useState` Hook)](./section-05-state.md)
- [Section 6: Handling Events (Press Events)](./section-06-handling-events.md)
- [Section 7: Conditional Rendering](./section-07-conditional-rendering.md)
- [Section 8: Lists and Keys](./section-08-lists-and-keys.md)
- [Section 9: Component Lifecycle (`useEffect` Hook)](./section-09-component-lifecycle.md)
- [Section 10: React Context API (Introduction for State Management)](./section-10-react-context-api.md)

---

## Module Challenge

After completing all sections, put your knowledge to the test with this module's challenge!

**Challenge 7: Simple Medication List App**

**Objective:** Build a simple application that displays a list of medications. Users should be able to mark medications as "taken" and see the UI update accordingly. This challenge will combine your knowledge of components, props, state, lists, keys, and event handling.

**Tool:** CodeSandbox

**(TODO: Link to Specific CodeSandbox for Challenge 7: Simple Medication List App)**

---

## Module Summary

In this module, you've covered the essential concepts of React that form the bedrock of React Native development. You started with an understanding of React's declarative nature and component-based architecture. You then learned JSX, the syntax for building UIs, and how to create functional components.

We explored how data flows in React applications: passing data down from parent to child using `props`, and managing internal component data with the `useState` Hook. You learned how to make your applications interactive by handling events, and how to dynamically render UI elements using various conditional rendering techniques. Displaying lists of data using `.map()` and the critical importance of `key` props were also covered.

Finally, you were introduced to the `useEffect` Hook for managing side effects and component lifecycle events, and the React Context API for sharing global-like data across your component tree, helping to avoid prop drilling.

These core React concepts are fundamental. As you move into subsequent modules focusing on React Native specific components and APIs, you will continuously apply and build upon this foundational knowledge.

## Additional Resources (Optional)

- [The Official React Documentation](https://react.dev/learn): An excellent and comprehensive resource for all things React. It includes tutorials, guides, and an API reference.
- [Egghead.io - React Courses](https://egghead.io/q/react): Offers many high-quality, concise video tutorials on React concepts, often by well-known developers in the community.
- [Kent C. Dodds - Blog & Courses](https://kentcdodds.com/): A highly respected voice in the React community, offering deep insights and practical advice on React development best practices.
