Module 13: State Management in React Native
Preliminary Note on Target Versions:
This module adheres to the following target versions for all technical information, API descriptions, and code examples:
React Native: 0.7x (specifically 0.76 as bundled with Expo SDK 52) 1
Expo SDK: 52+ 1
TanStack Query (React Query): v5 3
Zustand: v4+ 5
TypeScript: (Latest stable, used in all code examples)
React: (Version compatible with RN 0.76)
Stating these versions upfront is crucial for ensuring accuracy and relevance, as features and APIs can change between versions. Learners should always consult the official documentation corresponding to the specific versions used in their projects.
Section 1: Recap: useState and Prop Drilling Limitations
This section revisits the fundamental React Hook for managing local component state, useState, and explores the limitations that arise when trying to share state across components, leading to the pattern known as prop drilling.
Brief Review of useState Mechanics
The useState Hook is the cornerstone of state management within individual React functional components. Its primary purpose is to grant these components the ability to retain information across renders and update the UI in response to changes in that information.7 Without useState or similar mechanisms, functional components would be purely presentational, unable to manage dynamic data internally.
Declaration and Usage:
The hook is imported directly from React:

TypeScript


import { useState } from 'react';


Inside a functional component, useState is called to declare a state variable. It returns an array containing exactly two elements, which are typically destructured for ease of use 7:

TypeScript


const = useState(initialState);


stateVariable: Holds the current value of the state for the current render.
setStateFunction: A function used to update the stateVariable and trigger a re-render of the component.
initialState: The value assigned to stateVariable during the component's initial render. This argument is ignored on subsequent renders.8 For computationally expensive initial states, an initializer function can be passed: useState(() => computeInitialValue()). This function is executed only once, during the initial render, preventing costly recalculations on every render.8
"Under the Hood" - How useState Works:
React manages the state declared via useState internally. While variables declared directly within a function's scope are typically lost when the function execution completes, React associates useState variables with the specific component instance.7 It effectively "remembers" the state value between renders. When a component re-renders, React ensures that calls to useState return the most up-to-date value for that state variable.9 This persistence is achieved by React maintaining a data structure (conceptually, a list or array) for each component instance, storing the state values and their corresponding update functions in the order the useState hooks were called. This ordered tracking mechanism is why the Rules of Hooks (calling hooks at the top level and in the same order) are essential for React to correctly associate state with the right useState call across renders.
Setter Function (setStateFunction):
The setter function provides the mechanism to change the state. It can be used in two ways:
Direct Value: Pass the new state value directly: setCount(count + 1).7
Updater Function: Pass a function that receives the previous state and returns the new state: setCount(prevCount => prevCount + 1).8 This functional update form is recommended when the new state depends on the previous state, as it guarantees access to the correct previous value, even within batched updates.
It is critical to understand that state updates scheduled via the setter function are asynchronous relative to the currently executing code and are batched by React.8 This means the stateVariable will not reflect the updated value immediately after calling the setter function within the same render cycle. React processes these updates and triggers a re-render with the new state value later, often after the current event handler has finished executing. Batching multiple state updates together within a single event loop tick optimizes performance by minimizing the number of re-renders.
Furthermore, React includes an optimization: if the value passed to the setter function is identical to the current state (compared using the Object.is algorithm), React may skip the re-render process for that component and its children.8
Rules of Hooks (Recap):
Adherence to the Rules of Hooks is mandatory for useState (and all other hooks) to function correctly:
Top Level Only: Call Hooks only at the top level of a React functional component or a custom Hook.
No Conditions/Loops: Do not call Hooks inside loops, conditional statements (if/else), or nested functions.8
Violating these rules disrupts the order in which Hooks are called, preventing React from correctly associating state and effects with their respective Hook calls between renders.
Official Documentation Link Box
React useState Hook (Current):(https://react.dev/reference/react/useState) 8
React useState Hook (Legacy): https://legacy.reactjs.org/docs/hooks-state.html 7
How useState works internally: https://dev.to/nadim_ch0wdhury/how-does-reactjs-usestate-hook-work-under-the-hood-44lk 9
Detailed Explanation of Prop Drilling
While useState is effective for managing state within a component, applications often require data to be shared across multiple components, sometimes deeply nested within the component tree. When using only useState and basic prop passing, this leads to a pattern known as prop drilling.
Definition:
Prop drilling describes the process of passing data (props) from a higher-level component down through various intermediary components to reach a lower-level, deeply nested component that actually needs the data. The intermediary components in this chain may not use the props themselves; their sole purpose in this context is to forward the props further down the tree.10
Why it Occurs:
This pattern arises directly from React's fundamental principle of unidirectional data flow, where data naturally flows downwards from parent components to child components via props.11 In the absence of a dedicated mechanism for sharing state across arbitrary components (like Context API or a state management library), passing props down level by level is the default method for making data available where it's needed.
Illustrative Example:
Consider a component hierarchy: App -> Dashboard -> WidgetContainer -> Widget. If the Widget component needs access to the currentUser object, which is initially fetched or defined in the App component, the data flow would look like this:
App passes currentUser as a prop to Dashboard.
Dashboard (even if it doesn't use currentUser directly) passes it down as a prop to WidgetContainer.
WidgetContainer (again, possibly not using it) passes currentUser as a prop to Widget.
Finally, Widget receives and uses the currentUser prop.
Problematic Aspects & Limitations:
While functional, prop drilling introduces significant challenges, particularly as applications scale in complexity:
Code Complexity and Reduced Readability: Tracing the flow of data becomes increasingly difficult as the component tree deepens and the number of drilled props increases. Understanding where a specific prop originates and how it reaches its destination requires inspecting multiple intermediate components, making the codebase harder to navigate and comprehend.10
Maintainability Issues: Refactoring becomes a major pain point. If a prop's name or data structure needs to change, or if a new prop needs to be passed down, developers must modify every single component in the chain, even those that don't directly consume the prop.10 This process is tedious, error-prone, and makes the codebase resistant to change.
Tightly Coupled Components: Intermediary components become unnecessarily coupled to the props they are forwarding. Their interfaces are dictated not just by their own needs, but also by the needs of components far below them in the tree. This reduces the reusability of these intermediate components in different parts of the application where the drilled props might not be relevant.10
Unnecessary Re-renders and Potential Performance Impact: When a drilled prop changes value, all intermediate components in the chain might re-render, even if the prop change doesn't affect their own output.11 While React's reconciliation process is efficient, unnecessary re-renders caused by prop drilling in deep or wide component trees can contribute to performance degradation, especially if the props change frequently.
The limitations inherent in useState's local scope and the subsequent challenges introduced by prop drilling when sharing state more broadly are precisely what motivate the use of more advanced state management techniques. As applications grow, the pain points of prop drilling (decreased maintainability, readability, and potential performance issues) become more acute, pushing development teams towards solutions like React's Context API or dedicated state management libraries (Zustand, Redux, etc.) that allow components to access shared data without explicit, level-by-level prop passing. The complexity of the application and the nature of the shared data directly influence the severity of prop drilling issues, making scalable state solutions a necessity for larger projects.
Official Documentation Link Box
(Note: "Prop drilling" is a community term, not an official React concept with dedicated documentation. These articles provide excellent explanations.)
Geekster - Props Drilling in React: https://www.geekster.in/articles/props-drilling-in-react/ 10
AngularMinds - What is Prop Drilling in React: https://www.angularminds.com/blog/what-is-prop-drilling-in-react 11
Background Bridge Note: Data Flow in Native and Other Web Frameworks
Understanding how other platforms handle data flow helps contextualize React's approach and the prop drilling problem:
Native Android: Developers often pass data between Activities or Fragments using Intent extras or Fragment arguments. For sharing data across multiple screens or surviving configuration changes, the recommended pattern involves using ViewModels scoped to an Activity, Fragment, or Navigation graph. These ViewModels hold data (often using LiveData or StateFlow) which UI controllers can observe.12 This observer pattern avoids manually passing data through every intermediate UI element. However, if developers don't use shared ViewModels and instead pass data manually between fragments, it can lead to a situation analogous to prop drilling.12
Native iOS (SwiftUI): Data can be passed down explicitly through view initializers. While simple for shallow hierarchies, this becomes cumbersome for deep nesting. SwiftUI provides @EnvironmentObject, a mechanism where an ancestor view provides an ObservableObject, and any descendant view can subscribe to it without explicit passing through intermediates.14 This directly addresses the prop drilling issue, similar to React's Context API. Using @ObservedObject to pass an object down manually can still lead to prop drilling if that object isn't owned by a higher-level @StateObject or managed externally.14
Angular: Angular components use the @Input() decorator to receive data from parents. Passing data through multiple layers via @Input() is the Angular equivalent of prop drilling.16 However, Angular's strong emphasis on Dependency Injection encourages the use of Services to manage shared state. Components inject the required service and access shared data or methods directly, effectively bypassing the component hierarchy for state sharing and avoiding prop drilling.16 RxJS BehaviorSubject or Angular Signals within services are common patterns for reactive state management.
Section 2: Recap: React Context API Deep Dive
React's Context API provides a built-in mechanism to address the prop drilling problem. It allows data to be passed down the component tree without needing to manually thread props through every level.
Core API and Purpose
The primary purpose of the Context API is to share data that can be considered "global" or relevant to a large subtree of components, such as user authentication status, theme preferences, or the current language/locale.18 It effectively creates a channel through which data can be broadcast from a provider component to any consuming component within its subtree.
The API consists of several key parts:
React.createContext(defaultValue):
This function is called to create a Context object.
It accepts an optional defaultValue. This default value is only used by a consuming component if it cannot find a corresponding Context.Provider ancestor in the tree.18 It's primarily useful for testing components in isolation or providing a fallback.
The function returns a Context object, which typically contains two components: Provider and Consumer.
TypeScript
import React from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create context with a default value
const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}, // Default no-op function
});


Context.Provider:
This component is used higher up in the tree to make the context value available to all descendant components.
It accepts a value prop. This value is what consuming components will receive.18
Any component nested under a Provider can access its value. If multiple Providers for the same context are nested, a component will consume the value from the nearest ancestor Provider.
TypeScript
<ThemeContext.Provider value={{ currentTheme, toggleThemeFunction }}>
  {/* Components that can now access the theme context */}
</ThemeContext.Provider>


"Under the Hood": When the value prop passed to a Provider changes (compared using Object.is reference equality for objects/arrays), React triggers a re-render in all descendant components that are consuming that specific context.18 This re-render happens even if intermediate components are memoized using React.memo or shouldComponentUpdate, as context propagation bypasses these checks for consumers.18
Context.Consumer:
An older way to consume context values, primarily used in class components or before the introduction of hooks.
It requires a function as its child (the "render prop" pattern). This function receives the current context value as an argument and must return a React node.18
TypeScript
<ThemeContext.Consumer>
  {({ theme, toggleTheme }) => (
    <button onClick={toggleTheme} style={{ background: theme === 'light'? '#fff' : '#333' }}>
      Toggle Theme
    </button>
  )}
</ThemeContext.Consumer>


While still functional, useContext is preferred in modern functional components.
useContext(MyContext) Hook:
The standard and most convenient way to read context values within functional components.20
It accepts the Context object (e.g., ThemeContext) created by React.createContext as an argument.
It returns the current context value as determined by the nearest Provider ancestor.
If there's no matching Provider above, it returns the defaultValue specified during context creation.
Crucially, any component calling useContext will re-render whenever the context value provided by the corresponding Provider changes.
TypeScript
import React, { useContext } from 'react';
//... ThemeContext defined elsewhere

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  //... use theme and toggleTheme
}


Class.contextType:
A way for class components to consume context. Assign the Context object to a static contextType property on the class. The context value is then available as this.context.18 This only allows subscribing to a single context. (Mentioned briefly as the course focuses on functional components).
Use Case Example: Managing Global Theme
A common and effective use case for the Context API is managing application-wide themes (e.g., light mode/dark mode).
Define Themes: Create objects representing the styles for each theme.
TypeScript
// themes.ts
export const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonBg: '#eeeeee',
};

export const darkTheme = {
  backgroundColor: '#333333',
  textColor: '#ffffff',
  buttonBg: '#555555',
};

export type Theme = typeof lightTheme; // Define a type for the theme


Create Context and Provider:
TypeScript
// ThemeContext.tsx
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { lightTheme, darkTheme, Theme } from './themes';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => console.warn('ThemeProvider not found'),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prevMode =>!prevMode);
  },);

  const theme = isDarkMode? darkTheme : lightTheme;

  // Memoize the context value to prevent unnecessary re-renders of consumers
  // if the Provider itself re-renders for other reasons.
  const value = useMemo(() => ({ theme, toggleTheme }),);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook for convenience
export const useTheme = () => useContext(ThemeContext);

22
Wrap Application: In the main application file (e.g., App.tsx), wrap the component tree with the ThemeProvider.
TypeScript
// App.tsx
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from './ThemeContext';
import MyThemedComponent from './MyThemedComponent';

export default function App() {
  return (
    <ThemeProvider>
      <MyThemedComponent />
    </ThemeProvider>
  );
}


Consume Context in Components: Use the custom useTheme hook to access the theme and toggle function.
TypeScript
// MyThemedComponent.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const MyThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor,
    },
    text: {
      color: theme.textColor,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Theme: {theme === lightTheme? 'Light' : 'Dark'}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={theme.buttonBg} />
    </View>
  );
};

export default MyThemedComponent;


This setup allows any component within the ThemeProvider to access the current theme styles and the function to toggle the theme, without needing props passed down manually.
The Context API provides React's native solution for prop drilling, especially effective for data that changes infrequently, like themes or user authentication status. However, its default re-rendering behavior—updating all consumers when the provider's value changes—is a significant consideration. While this ensures consistency, it can lead to performance issues if the context value changes frequently or if the consuming components are complex. This characteristic necessitates careful optimization strategies, explored in the next section, and is a key reason why developers might choose alternative state management libraries for more dynamic or performance-critical state. The underlying mechanism connecting Context.Consumer and the useContext hook is the same subscription model to the provider; the hook simply offers a more ergonomic API for functional components.18
Official Documentation Link Box
React Context API (Legacy): https://legacy.reactjs.org/docs/context.html 18
React useContext Hook (Current): https://react.dev/reference/react/useContext
Smashing Magazine: Intro to React Context API: (Mentioned in 20) - Note: Find actual URL if possible or link to a similar reputable guide.
DocuReacten: Managing Global Styles and Themes:(https://docureacten.github.io/Style/9-6-Managing%20Global%20Styles%20and%20Themes) 22
Exercise 13.1: Managing Global Theme with Context (Expo Snack)
Goal: Implement a simple theme switcher (light/dark) using React Context API in a React Native environment.
Concepts: createContext, useState within a Provider component, useContext (or a custom hook) in consumer components, applying dynamic styles based on the theme context.
Task:
Create a new Expo Snack.
Define two theme objects (e.g., lightTheme, darkTheme) containing basic color properties (backgroundColor, textColor).
Create a ThemeContext using React.createContext, providing appropriate default values.
Implement a ThemeProvider component:
Use useState to manage the current theme mode (e.g., 'light' or 'dark').
Determine the current theme object based on the mode.
Create a toggleTheme function to switch the mode.
Memoize the context value object containing theme and toggleTheme.
Render ThemeContext.Provider with the memoized value, wrapping props.children.
Create a custom hook useTheme that simply calls useContext(ThemeContext).
In the main App component:
Wrap the main content with your ThemeProvider.
Create a child component (e.g., ThemedDisplay).
In the ThemedDisplay component:
Use the useTheme hook to get the current theme and toggleTheme function.
Render a View styled with backgroundColor from the theme.
Render a Text component styled with textColor from the theme.
Render a Button component that calls toggleTheme when pressed.
Section 3: Context API Performance Considerations
While the Context API effectively solves prop drilling, it introduces potential performance bottlenecks if not used carefully. Understanding these issues and how to mitigate them is crucial for building performant applications.
Deep Dive into Performance Issues
The primary performance concern with the Context API stems from its re-rendering behavior:
Unnecessary Re-renders: By default, whenever the value prop passed to a Context.Provider changes, all descendant components that consume that specific context via useContext or Context.Consumer will re-render.18 This happens even if a particular component is only interested in a small piece of the context value that didn't actually change.19
"Under the Hood" - Why Re-renders Occur: React determines if the context value has changed by comparing the previous value prop with the new value prop using the Object.is comparison algorithm.18 When the value prop is an object or an array (a common scenario, as context often holds multiple related values or functions), creating this object or array inline within the Provider component's render function generates a new reference on every render of the Provider. Even if the underlying data within the object/array is identical, the reference has changed, causing Object.is(oldValue, newValue) to return false. React interprets this as a change in the context value and dutifully re-renders all consumers.19 This reference instability is the most frequent cause of unexpected performance issues with Context API.
Impact of Deep Nesting: While not a direct performance cost for a single context lookup, having deeply nested component trees can make debugging context-related performance issues harder. Furthermore, if multiple contexts are nested, a change in a higher-level context could potentially trigger re-renders that cascade down through many levels, increasing the overall rendering workload.19 Poorly scoped contexts (placing providers too high in the tree when only a small subtree needs the data) exacerbate this, widening the "blast radius" of context updates.
Non-Stable Provider Values (The Common Pitfall): As highlighted above, passing unstable values (new object literals {} or array literals `` created directly in the render path) to the value prop is the most common mistake leading to excessive re-renders.19 Functions defined inline within the render function and passed in the context value also create new references on each render, triggering the same issue.
Optimization Techniques
Several strategies can be employed to mitigate Context API performance issues:
Memoization of Provider Value (useMemo, useCallback):
The most critical optimization is to ensure the value object passed to the Provider has a stable reference. Use React.useMemo to memoize the object containing the context data. The reference will only change if one of the dependencies listed in the useMemo dependency array changes.19
Similarly, if functions are included in the context value (like toggleTheme), wrap them in React.useCallback to ensure their references remain stable unless their own dependencies change.
TypeScript
// Inside ThemeProvider component
const toggleTheme = useCallback(() => {
  setIsDarkMode(prevMode =>!prevMode);
},); // Empty dependency array means function reference never changes

const value = useMemo(() => ({
  theme: isDarkMode? darkTheme : lightTheme,
  toggleTheme
}),); // Value only changes if isDarkMode or toggleTheme changes

return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;


Splitting Contexts:
Instead of creating one large context holding disparate pieces of state, break it down into multiple, smaller, more focused contexts.21 For example, have a separate ThemeContext, UserContext, and LocaleContext.
Components can then subscribe only to the specific contexts whose data they actually need. A change in UserContext will not trigger re-renders in components only consuming ThemeContext. This significantly reduces the scope of updates.
Memoizing Consumers (React.memo):
Wrapping consuming components in React.memo can prevent them from re-rendering if their props haven't changed.
While React.memo itself doesn't stop re-renders caused directly by useContext updates, it becomes useful when a context-consuming component passes parts of the context data down as props to its own children. If those children are wrapped in React.memo and the specific props derived from the context haven't changed, those children can avoid re-rendering, thus limiting the propagation of the context update further down the tree.23
Colocating State and Provider:
Avoid placing all context providers at the absolute root of the application if the context is only needed by a specific subtree. Place the Provider component as low in the tree as possible, just above the components that need access to its value.19 This minimizes the number of components nested within the provider and thus reduces the potential impact of its updates.
The performance characteristics of Context API are a direct result of how React handles rendering, state updates, and reference comparisons. Because React relies on reference equality (Object.is) for performance optimizations when comparing props and context values, passing unstable references (like newly created objects/arrays/functions on each render) breaks these optimizations and forces re-renders.18 Techniques like useMemo and useCallback directly address this by providing stable references unless the underlying data genuinely changes.19 Understanding this connection between React's rendering mechanism and context propagation is key to effectively optimizing Context API usage. The inherent challenges in optimizing Context API for frequent updates or complex state graphs were a significant factor driving the development and adoption of libraries like Zustand and Redux, which offer alternative subscription models designed for better performance in such scenarios.21
Official Documentation Link Box
React Docs - Optimizing Performance: https://legacy.reactjs.org/docs/optimizing-performance.html 23 (Covers React.memo, useMemo, etc.)
Codiga Blog: React Context Performance: https://www.codiga.io/blog/react-context-performance/ 19
Background Bridge Note: UI Update Mechanisms and Performance
Comparing React Context's update mechanism to other platforms highlights different approaches to performance:
Native Android: UI updates triggered by LiveData or StateFlow emissions are typically handled within observers or collectors. Performance often depends on how efficiently the UI updates are performed within these callbacks. Tools like RecyclerView.Adapter with DiffUtil provide highly optimized updates for lists by calculating minimal changes. StateFlow also offers operators like distinctUntilChanged() to prevent emissions (and thus potential UI updates) if the state value hasn't actually changed.
Native iOS (SwiftUI): SwiftUI's declarative system automatically re-renders views when dependencies (like properties marked with @State, @StateObject, @ObservedObject, or @EnvironmentObject) change. SwiftUI aims for efficiency by only recomputing the bodies of views whose dependencies have changed, but complex view structures or frequent data updates can still lead to performance considerations. View identity and structural changes play a significant role in SwiftUI's rendering performance.
Angular: Angular uses its change detection mechanism. With the default strategy (leveraging Zone.js), Angular checks components for changes more broadly. However, the OnPush change detection strategy offers significant performance benefits. OnPush components are only checked (and potentially re-rendered) if their @Input() references change, an event originates from within the component or its children, or an Observable subscribed to via the async pipe emits a new value. This is more comparable to React's React.memo combined with careful prop management.
Section 4: Introduction to Zustand (Client State)
Zustand emerges as a popular alternative for managing client-side state in React and React Native applications, offering a different approach compared to Context API or more complex libraries like Redux.
What is Zustand? Core Principles
Zustand presents itself as a small, fast, and scalable bearbones state management solution.5 Its core philosophy revolves around simplicity and performance, built upon a hook-based API. Key characteristics include:
Minimalism: It avoids excessive boilerplate and complex setup procedures.5
Unopinionated: While providing structure, it doesn't enforce rigid patterns like traditional Flux architectures, offering flexibility.5
Hook-Based API: Integration with functional components is seamless via custom hooks generated by the library.5
Performance Focus: Designed to address common performance pitfalls in React state management, such as unnecessary re-renders (the "zombie child problem") and ensuring compatibility with React's concurrent features.5
No Providers Needed: Unlike Context API or Redux, Zustand typically does not require wrapping the application in Provider components.5
Installation and Setup
Integrating Zustand is straightforward:
Install: Add the library to your project using npm or yarn.
Bash
npm install zustand
# or
yarn add zustand
5
Create Store: Define your state logic in a separate file (e.g., store.ts).
Creating a Store (create function)
The central piece of Zustand is the create function, which is used to build your state store.
Import: import { create } from 'zustand';.5
Usage: The create function takes a single argument: a setup function. This setup function receives helper functions (most importantly, set and optionally get) and must return the initial state object. This object defines the structure of your store, including state properties and action functions that modify the state.5

TypeScript


import { create } from 'zustand';

// Define the shape of the store's state and actions
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (newCount: number) => void;
}

// Create the store hook
const useCounterStore = create<CounterState>((set) => ({
  // Initial state
  count: 0,

  // Actions: functions that modify state using the 'set' function
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setCount: (newCount) => set({ count: newCount }),
}));

export default useCounterStore;



5
Using the Store Hook in Components
The value returned by create (e.g., useCounterStore) is itself a custom hook. This hook is used within your React Native components to access the store's state and actions.

TypeScript


import React from 'react';
import { View, Text, Button } from 'react-native';
import useCounterStore from './store'; // Import the hook

const CounterComponent = () => {
  // Use the hook to select specific state slices or actions
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
};

export default CounterComponent;


5
Selecting State Slices for Performance
A key feature of Zustand is its selector-based subscription model. When using the store hook, you provide a selector function (e.g., (state) => state.count). This tells Zustand precisely which part(s) of the state this component instance cares about.5
Crucially, the component calling the hook will only re-render if the value returned by its specific selector function changes.21 If other parts of the store are updated, but the selected slice remains the same (based on strict equality === comparison by default), the component will not re-render. This granular subscription mechanism is fundamental to Zustand's performance advantages over Context API's default behavior.
"Under the Hood": Zustand maintains a list of listeners (components using the hook) along with their associated selector functions and last selected values. When the set function is called to update the state, Zustand iterates through its listeners. For each listener, it re-runs the selector function with the new state, compares the newly selected value with the previously stored value, and only notifies (triggers a re-render) the component if the value has changed.
Updating State (set function, merging state)
Actions within the store modify the state using the set function provided by the create callback.
Merging State: By default, set performs a shallow merge. When you provide an object to set, it merges those properties into the existing state, leaving other properties untouched.5 This is similar to this.setState in React class components.
TypeScript
// Assuming state is { count: 0, user: 'guest' }
set({ count: 1 }); // State becomes { count: 1, user: 'guest' }


Functional Updates: For updates that depend on the previous state, pass a function to set. This function receives the current state and should return the partial state object to be merged.
TypeScript
set((state) => ({ count: state.count + 1 }));


Replacing State: To completely replace the state instead of merging, pass true as the second argument to set: set(newState, true). (Note: Verify this specific API detail in current Zustand v4+ docs if needed, as it wasn't explicitly in the provided snippets but is a common pattern).
The design philosophy behind Zustand, emphasizing minimalism, a hook-based API, and particularly the selector-based subscription model, directly targets the verbosity and potential performance issues observed with other state management approaches, including React Context for dynamic state.5 The default merging behavior of the set function also contributes to developer convenience by simplifying common update patterns, echoing the familiar behavior of this.setState from class components.5
Diagram: Zustand Store Interaction (Mermaid)
This diagram illustrates the typical flow of data and actions when using Zustand:

Code snippet


graph TD
    A -- "Calls useStore(state => state.slice)" --> H((Zustand Hook))
    H -- "Accesses Store" --> S
    S -- "Returns selected slice" --> H
    H -- "Provides slice to Component" --> A

    B[Event/Another Component] -- "Calls action (e.g., increment())" --> AF
    subgraph Store Internals
        AF -- "Calls set(newState)" --> SU(State Update Logic)
        SU -- "Updates State" --> S
    end
    S -- "Notifies Hook (if selected slice changed)" --> H
    H -- "Triggers Re-render" --> A


Official Documentation Link Box
Zustand GitHub (Main Repo/Docs): https://github.com/pmndrs/zustand 5
Zustand Docs Website: https://zustand.docs.pmnd.rs/ 6
Exercise 13.2: Implementing a Zustand Store (Expo Snack)
Goal: Create a simple counter application using Zustand for state management in React Native.
Concepts: Using create to define a store, implementing actions with set, selecting state slices with the store hook, triggering actions from UI events.
Task:
Set up a new Expo Snack and add zustand as a dependency.
Create a store.ts file.
Inside store.ts, use create from zustand to define a store:
Include a count property initialized to 0.
Include an increment action that uses set to increase the count by 1.
Include a decrement action that uses set to decrease the count by 1.
Include a reset action that uses set to reset the count to 0.
In the App.tsx component:
Import the useCounterStore hook created in store.ts.
Select the count value: const count = useCounterStore(state => state.count);.
Select the actions: const { increment, decrement, reset } = useCounterStore(state => ({ increment: state.increment, decrement: state.decrement, reset: state.reset })); (or select them individually).
Render the current count value using a <Text> component.
Render three <Button> components: "Increment", "Decrement", and "Reset".
Wire the onPress handlers of the buttons to call the corresponding increment, decrement, and reset actions obtained from the store hook.
Section 5: Zustand vs. Context API Comparison
Choosing the right tool for state management depends on the specific needs of the application. Both React Context API and Zustand offer ways to share state, but they differ significantly in their approach, performance characteristics, and complexity.
Direct Comparison Table

Feature
React Context API
Zustand
Setup Complexity
Built-in to React. Requires createContext and wrapping the tree with Provider. Can be verbose.21
External library (npm install zustand). Simpler setup, no Provider component typically needed.5
API Conciseness
Generally more verbose due to Provider/Consumer setup or useContext usage.21
More concise API using create and a single custom hook for access.5
Performance (Re-renders)
Prone to unnecessary re-renders of all consumers unless carefully optimized (e.g., memoization, splitting contexts).19
Optimized by default via selective subscriptions. Components only re-render if their selected state slice changes.5
Bundle Size
Zero additional bundle size (part of React).
Adds a small dependency (~1-2kB gzipped).
Boilerplate
Higher boilerplate (Provider component, context creation, potentially memoization code).
Lower boilerplate (store definition is relatively concise).
"Zombie Child" Problem
Can occur if consumers don't unsubscribe correctly (less common with hooks).
Specifically designed to mitigate common pitfalls like the zombie child problem.5
Primary Use Cases
Low-frequency updates (themes, locale, auth status), simple global state, avoiding external dependencies.
More complex client state, frequent updates, performance-critical state, preference for minimal boilerplate.

Key Differentiators Explained
Re-render Optimization: This is arguably the most significant difference. Context API's default behavior re-renders all consumers when the value prop of the Provider changes. Optimizing this requires manual effort (memoization, context splitting).19 Zustand, by contrast, uses selectors, ensuring components only subscribe to and re-render based on the specific state slices they need. This leads to more efficient updates out-of-the-box, especially for frequently changing state.5
Boilerplate and Ease of Use: Zustand generally involves less setup code. Defining a store and using the hook is often quicker and requires fewer lines of code compared to setting up Context Providers, potentially memoizing values, and consuming the context.5 The absence of a mandatory Provider component simplifies the application structure.
External Dependency vs. Built-in: Context API is part of the React library itself, requiring no additional dependencies.21 Zustand is an external library that needs to be installed and managed.21 This might be a factor for projects aiming to minimize external dependencies, although Zustand's small size often makes this a minor concern.
When to Choose Which
The decision often involves balancing simplicity, performance needs, and the nature of the state being managed:
Choose React Context API when:
The state changes infrequently (e.g., theme, user authentication status, locale).
The application's performance is not heavily impacted by the potential re-renders, or you are willing to implement optimizations manually.
Avoiding external dependencies is a high priority.
The state being shared is relatively simple.
Choose Zustand when:
Managing more complex client-side state structures.
The state updates frequently, and performance optimization is crucial.
Minimizing boilerplate code and simplifying setup is desired.
You need a solution that handles common edge cases like the "zombie child" problem more automatically.
Essentially, the choice reflects a trade-off. Context API offers the convenience of being built-in but demands more developer effort for performance tuning with dynamic state. Zustand requires adding a dependency but provides a more streamlined developer experience and built-in performance optimizations through its selector model, making it particularly well-suited for managing dynamic client-side application state. This distinction arises because Context API serves as a general dependency injection mechanism, whereas Zustand is specifically designed as a state management library.5
Official Documentation Link Box
Codedamn: Zustand vs React Context API: https://codedamn.com/news/reactjs/zustand-vs-react 21
Section 6: Introduction to Server State Management
While Context API and Zustand excel at managing state that originates and lives within the client application (UI state, user inputs, etc.), a significant portion of application state often comes from a backend server. This "server state" has distinct characteristics and challenges that warrant specialized management tools.
Defining Server State vs. Client State
Understanding the difference is fundamental:
Client State:
Definition: Data that exists solely within the frontend application's memory or local storage. It's managed directly by the client-side code.
Examples: UI theme ('light'/'dark'), modal visibility status, form input values before submission, router state, data explicitly cached in localStorage or AsyncStorage.
Characteristics: Synchronous access (usually), owned and controlled by the client, persistence depends on client-side mechanisms.
Server State:
Definition: Data that originates from, is persisted on, and is considered authoritative by a remote server.24 The client typically fetches this data asynchronously.
Examples: User profile data from a database, product catalogs from an e-commerce backend, API responses, content from a CMS.
Characteristics: Asynchronous fetching/updating, owned by the server (client has a temporary copy), can be shared and modified by multiple clients, can become stale (out-of-sync with the server), requires caching on the client for performance.3
Challenges of Managing Server State Manually
Attempting to manage server state using only client-state tools like useState, useEffect, Context API, or even Zustand quickly becomes complex and leads to re-implementing common patterns inefficiently:
Caching: Manually implementing client-side caching requires logic for storing data, deciding cache duration, and invalidating entries when data changes on the server.3
Stale Data Management: Determining when cached data is outdated and needs to be refetched is non-trivial.3
Background Updates: Automatically refreshing data in the background (e.g., on window focus or network reconnect) requires setting up listeners and triggers.3
Request Deduplication: Preventing multiple identical API requests from being fired simultaneously when several components need the same data requires coordination.
Pagination & Infinite Loading: Handling paginated API responses and implementing "load more" or infinite scroll features involves managing page parameters, appending data, and tracking loading states for subsequent pages.
Optimistic Updates: Implementing optimistic UI updates (showing changes immediately and rolling back on error) requires careful state management, error handling, and synchronization logic.28
Error Handling & Retries: Implementing robust error handling and automatic retry logic for failed network requests adds complexity.
Boilerplate Code: Each data-fetching scenario often requires repetitive useEffect hooks to manage loading states, error states, data storage, and cleanup logic.3
Treating server state merely as another piece of client state ignores its unique lifecycle and characteristics (asynchronicity, caching needs, staleness). This mismatch leads developers using client-state tools for server state to inevitably build complex, often buggy, and hard-to-maintain abstractions around useEffect and useState.26 The very existence and popularity of dedicated server state libraries like TanStack Query stem from the recognition that server state requires a different approach and specialized tooling.
Why Dedicated Libraries are Beneficial
Libraries like TanStack Query (formerly React Query) are specifically designed to tackle the challenges of server state management:
Abstraction: They abstract away the complexities of caching, background updates, synchronization, retries, etc..3
Declarative API: Provide a declarative way to specify data dependencies (useQuery) and mutations (useMutation), letting the library handle the imperative fetching logic.3
Built-in Features: Offer pre-built solutions for common problems like caching, stale-while-revalidate, window focus refetching, pagination, optimistic updates, and more.3
Reduced Boilerplate: Drastically reduce the amount of repetitive code needed compared to manual fetching approaches.3
Improved Developer Experience: Provide better tooling (like DevTools) and conventions, leading to faster development and easier debugging.
The shift towards Single Page Applications (SPAs) and complex client-side applications has significantly increased the amount of server state that needs to be managed on the client.26 This trend has amplified the challenges of manual server state management and driven the need for robust, specialized libraries like TanStack Query.
Official Documentation Link Box
(General Articles on Client vs. Server State) - Note: Include links to reputable blog posts or articles explaining this distinction.
TanStack Query Documentation: https://tanstack.com/query/v5 3
Section 7: Introduction to TanStack Query (React Query) v5
TanStack Query (often still referred to by its former name, React Query) has become a de facto standard for managing server state in React and React Native applications. It provides a powerful and efficient way to handle data fetching, caching, and synchronization.
What is TanStack Query? Core Purpose
TanStack Query is a library dedicated to managing server state. It simplifies the process of fetching, caching, synchronizing, and updating data that originates from a remote source (like an API).3 It is crucial to distinguish it from global client state managers like Redux or Zustand; TanStack Query focuses specifically on the lifecycle and challenges associated with asynchronous server data.
Benefits
Using TanStack Query offers numerous advantages over manual data fetching approaches:
Declarative Data Fetching: Instead of writing imperative code to fetch data (e.g., inside useEffect), you declaratively define your data requirements using hooks like useQuery. TanStack Query then handles the fetching logic automatically.3
Automatic Caching: Queries are automatically cached based on their query keys. Subsequent requests for the same data can be served instantly from the cache, significantly improving performance and reducing network load.3
Background Updates & Stale Data Handling: TanStack Query implements strategies like "stale-while-revalidate." It can serve stale data from the cache immediately for a fast UI response while automatically refetching fresh data in the background.3 It also automatically refetches data on events like window focus or network reconnection.31
Request Deduplication: If multiple components request the same data (using the same query key) simultaneously, TanStack Query will automatically deduplicate these requests, making only one actual network call.
Pagination and Infinite Loading: Provides built-in hooks (useInfiniteQuery) and helpers to simplify the implementation of pagination and infinite scroll features.
Optimistic Updates: Offers first-class support and patterns for implementing optimistic UI updates, making applications feel more responsive.28
DevTools: Comes with dedicated developer tools that allow inspection of the query cache, query states, and manual interaction with queries, greatly aiding debugging.3
Reduced Boilerplate: Significantly cuts down on the repetitive useEffect code typically needed for managing loading states, error states, data fetching, and cleanup.3
Installation and Setup
Integrating TanStack Query into a React Native project involves two main steps:
Install: Add the library package.
Bash
npm install @tanstack/react-query
# or
yarn add @tanstack/react-query


Provide QueryClient:
Create an instance of QueryClient. This object manages the cache and configurations for all queries and mutations. You can set default options here.
TypeScript
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Default stale time for all queries: 5 minutes
      gcTime: 10 * 60 * 1000,  // Default garbage collection time: 10 minutes
    },
  },
});
34
Wrap your application's root component (or the relevant part of the tree) with QueryClientProvider and pass the created queryClient instance via the client prop. This makes the client available to all descendant components via hooks.
TypeScript
import { QueryClientProvider } from '@tanstack/react-query';
//... queryClient instance from above

// In your App.tsx or root component
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your Navigation Container and Screens */}
    </QueryClientProvider>
  );
}
34
Key Changes/Notes for v5 (Object Syntax)
A significant change introduced in TanStack Query v5 is the standardization of API signatures. Most hooks (useQuery, useMutation, useInfiniteQuery, etc.) and queryClient methods now accept a single options object as their parameter, rather than multiple positional arguments or supporting various overloads as in v4.4
Example (useQuery):
v4 style: useQuery('todos', fetchTodos, { staleTime: 5000 });
v5 style: useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: 5000 }); 4
This change enhances API consistency, improves readability (especially for functions with many options), and simplifies usage with TypeScript.3 Developers migrating from v4 need to adapt their hook calls to this new object syntax. Codemods are often available to assist with this migration.
Another notable change in v5 is the renaming of cacheTime to gcTime (garbage collection time) to more accurately reflect its purpose: controlling how long inactive query data remains in memory before being garbage collected.35
The adoption of the single options object in v5 represents a significant improvement in developer experience. It moves away from potentially ambiguous function overloads towards a more explicit and self-documenting pattern, common in modern JavaScript libraries dealing with complex configurations.4 This shift also underscores TanStack Query's evolution towards a more mature and robust API. Fundamentally, TanStack Query encourages a paradigm shift from imperative data fetching (fetch on mount) to a declarative approach (this component depends on this data), allowing the library to manage the complex lifecycle of server state automatically.3
Official Documentation Link Box
TanStack Query v5 Docs (Homepage): https://tanstack.com/query/v5 3
TanStack Query - Why Use TanStack Query?: https://tanstack.com/query/v5/docs/framework/react/overview#why-use-tanstack-query
TanStack Query - Installation: https://tanstack.com/query/v5/docs/framework/react/installation
Blog Post (Example) - Migrating to v5: https://www.bigbinary.com/blog/migrating-to-tanstack-query-v5 4 (Note: Link to official migration guide if preferred.)
Section 8: Core Concepts: Queries (useQuery), Mutations (useMutation), Query Client
Understanding the three main pillars of TanStack Query—the QueryClient, queries (useQuery), and mutations (useMutation)—is essential for effectively managing server state.
QueryClient (Recap and Deeper Dive)
The QueryClient is the heart of TanStack Query. It acts as the central hub responsible for:
Cache Management: Storing all query data, managing stale times, and handling garbage collection.
Configuration: Holding default options for all queries and mutations (e.g., staleTime, gcTime, retry logic) which can be overridden on a per-query/mutation basis.34
API for Cache Interaction: Providing methods like invalidateQueries, setQueryData, getQueryData, removeQueries, cancelQueries, etc., allowing direct manipulation and interaction with the query cache when needed (e.g., after mutations or for optimistic updates).4
An instance of QueryClient is created and provided to the application via QueryClientProvider.34
useQuery
The useQuery hook is the primary tool for fetching, caching, and subscribing to server data (read operations). It establishes a declarative dependency on an asynchronous data source.36
Purpose: To retrieve data from a server, cache it, and keep it updated according to configured rules.
Key Options (v5 Object Syntax):
queryKey: QueryKey: Required. An array used to uniquely identify the query data. Must be serializable. Its uniqueness is fundamental for caching, refetching, and invalidation.36 Examples: ['todos'], ['todos', 5], ['todos', { type: 'active', page: 1 }].
queryFn: () => Promise<TData>: Required. An asynchronous function (must return a Promise) responsible for fetching the data. It should resolve with the data or throw an error if fetching fails.36
enabled?: boolean: (Default: true) If set to false, the query will not automatically fetch data on mount or when the key changes. It must be manually triggered via the refetch function returned by the hook. Useful for dependent queries.
staleTime?: number: (Default: 0) Duration in milliseconds that query data is considered fresh. See Section 9 for details.30
gcTime?: number: (Default: 5 * 60 * 1000) Duration in milliseconds inactive data stays in cache before garbage collection. See Section 9 for details.30
refetchOnWindowFocus?, refetchOnMount?, refetchOnReconnect?: Control automatic refetching triggers. See Section 9.
retry?: Configures automatic retries for failed queries.
Return Values: useQuery returns an object containing the query's state and data:
data: TData | undefined: The successfully fetched data for the query. undefined while pending or if an error occurred.
error: TError | null: The error object if the query failed, otherwise null.
status: 'pending' | 'error' | 'success': Represents the state of the data itself 36:
'pending': The query is currently fetching for the first time and has no data yet.
'error': The query failed.
'success': The query succeeded and data is available.
fetchStatus: 'fetching' | 'paused' | 'idle': Represents the state of the queryFn execution 36:
'fetching': The queryFn is currently running (initial fetch or background refetch).
'paused': The query attempted to fetch but was paused (e.g., offline).
'idle': The query is not currently fetching.
isPending: boolean: Derived from status === 'pending'. True only during the initial fetch before any data or error is available.35
isLoading: boolean: Derived from status === 'pending'. (Note: In v5, isLoading specifically refers to the initial loading state where status is 'pending'. The v4 isLoading which was true during background fetches is now covered by isFetching).
isFetching: boolean: Derived from fetchStatus === 'fetching'. True whenever the queryFn is executing.36
isError: boolean: Derived from status === 'error'.
isSuccess: boolean: Derived from status === 'success'.
refetch: () => Promise<UseQueryResult>: A function to manually trigger a refetch of the query.
And others like isStale, dataUpdatedAt, errorUpdatedAt.
The queryKey is the absolute foundation upon which TanStack Query's caching, deduplication, and automatic updates are built.36 Any change in the queryKey array triggers a new query execution or cache lookup. Its structure allows for granular data management; for example, ['todos'] might fetch all todos, while ['todos', { id: 5 }] fetches a specific todo, allowing both to coexist in the cache. The distinction between status (reflecting data availability) and fetchStatus (reflecting network activity) is crucial for building sophisticated UIs that can show stale data while indicating a background refresh is in progress, rather than always reverting to a full loading state.36
Diagram: useQuery Data Flow (Mermaid)
This diagram visualizes the decision-making process when useQuery is invoked:

Code snippet


sequenceDiagram
    participant C as React Component
    participant TQ as TanStack Query
    participant Cache
    participant Server

    C->>+TQ: useQuery({ queryKey, queryFn,... })
    TQ->>Cache: Check cache for queryKey
    alt Data Found in Cache
        Cache-->>TQ: Return cached data (data, lastUpdated)
        alt Data is Fresh (now < lastUpdated + staleTime)
            TQ-->>C: status: 'success', isFetching: false, data
        else Data is Stale (now >= lastUpdated + staleTime)
            TQ-->>C: status: 'success', isFetching: true, data (stale)
            Note right of TQ: Trigger background refetch
            TQ->>Server: queryFn()
            Server-->>TQ: New Data / Error
            TQ->>Cache: Update Cache
            TQ-->>C: status: 'success' / 'error', data (fresh) / error
        end
    else No Data in Cache
        TQ-->>C: status: 'pending', isFetching: true
        Note right of TQ: Trigger initial fetch
        TQ->>Server: queryFn()
        Server-->>TQ: Data / Error
        TQ->>Cache: Store in Cache
        TQ-->>C: status: 'success' / 'error', data / error
    end
    TQ-->>-C: (Returns query state object)



useMutation
The useMutation hook is used for performing asynchronous actions that intend to modify data on the server, such as Create, Update, or Delete (CUD) operations.28
Purpose: To execute side effects (usually API calls that change data) and manage the state of these operations (loading, error, success).
Key Options (v5 Object Syntax):
mutationFn: (variables: TVariables) => Promise<TData>: Required (unless a default is set). The async function performing the mutation. It receives variables passed to the mutate function and should return a Promise resolving with the result or rejecting with an error.28
onSuccess?: (data: TData, variables: TVariables, context: TContext) => void | Promise<void>: Callback fired upon successful mutation completion. Often used to invalidate relevant queries.28
onError?: (error: TError, variables: TVariables, context: TContext | undefined) => void | Promise<void>: Callback fired if the mutation fails. Used for error handling or rolling back optimistic updates.28
onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void | Promise<void>: Callback fired after the mutation finishes, regardless of success or error. Useful for cleanup or always invalidating queries.28
onMutate?: (variables: TVariables) => Promise<TContext | void> | TContext | void: Callback fired before mutationFn. Used for optimistic updates. Can return a context value passed to onError and onSettled.28
Return Values: useMutation returns an object to manage the mutation:
mutate: (variables: TVariables, options?: MutateOptions) => void: The primary function to trigger the mutation. Pass the required variables. Optionally pass per-mutation callbacks (onSuccess, onError, onSettled).28
mutateAsync: (variables: TVariables, options?: MutateOptions) => Promise<TData>: Similar to mutate, but returns a Promise that resolves/rejects based on the mutation outcome. Useful for awaiting completion.28
status: 'idle' | 'pending' | 'error' | 'success': Current status of the mutation.28
isPending: boolean: True if the mutation is currently executing.
isIdle: boolean, isSuccess: boolean, isError: boolean: Boolean flags derived from status.
data: TData | undefined: The data returned from the last successful mutation.
error: TError | null: The error from the last failed mutation.
reset: () => void: A function to reset the mutation state back to idle.
Table: TanStack Query Core Concepts Summary
Concept
Purpose
Key Options/Features (v5)
QueryClient
Central hub for cache, configurations, and cache interaction methods.
defaultOptions, getQueryData, setQueryData, invalidateQueries, cancelQueries
useQuery
Declaratively fetch, cache, and manage server data (read operations).
queryKey, queryFn, staleTime, gcTime, enabled, retry. Returns data, error, status, fetchStatus, isPending, isFetching.
useMutation
Perform asynchronous actions that modify server state (CUD operations).
mutationFn, onSuccess, onError, onSettled, onMutate. Returns mutate, mutateAsync, status, data, error, isPending.

This table serves as a quick reference, summarizing the distinct roles and primary features of the fundamental building blocks within TanStack Query, aiding learners in constructing a clear mental model of the library's architecture.
Official Documentation Link Box
TanStack Query - Queries Guide: https://tanstack.com/query/v5/docs/react/guides/queries 36
TanStack Query - Mutations Guide: https://tanstack.com/query/v5/docs/react/guides/mutations 37
TanStack Query - useMutation Reference: https://tanstack.com/query/v5/docs/react/reference/useMutation 28
TanStack Query - QueryClient Reference: https://tanstack.com/query/v5/docs/react/reference/QueryClient
Exercise 13.3: Fetching Data with useQuery (Expo Snack)
Goal: Fetch and display a list of data from a public API using useQuery in a React Native app.
Concepts: Setting up QueryClientProvider, defining queryKey and queryFn, using useQuery, handling loading (isPending), error (isError), and success (data) states.
Task:
Create a new Expo Snack. Add @tanstack/react-query as a dependency.
In App.tsx, import QueryClient, QueryClientProvider. Create a queryClient instance and wrap the main view component with <QueryClientProvider client={queryClient}>.
Create a component (e.g., PostList) responsible for fetching and displaying posts.
Inside PostList, define an asynchronous function fetchPosts that uses fetch to get data from a public API like https://jsonplaceholder.typicode.com/posts and returns the JSON response.
Use the useQuery hook within PostList:
TypeScript
const { data, error, isPending } = useQuery({
  queryKey: ['posts'], // Unique key for this query
  queryFn: fetchPosts, // The function to fetch data
});


Implement conditional rendering based on the query state:
If isPending is true, display a loading indicator (e.g., <ActivityIndicator /> or <Text>Loading...</Text>).
If error is truthy, display an error message (e.g., <Text>Error fetching posts: {error.message}</Text>).
If data is available, render the list of posts using a <FlatList> component, displaying the title of each post. Remember to handle the case where data might be undefined initially.
Section 9: Caching and Background Updates with TanStack Query
TanStack Query's power lies not just in fetching data, but in its intelligent caching and automatic background update mechanisms. These features work together to provide a seamless user experience, balancing data freshness with performance.
Caching Concepts
Two key configuration options govern TanStack Query's caching behavior:
staleTime: number (Default: 0)
Definition: Specifies the duration (in milliseconds) for which fetched data is considered "fresh." While data is fresh, TanStack Query will serve it directly from the cache without initiating a network request, even if the component re-mounts or the query key is accessed again.30
Behavior: Once staleTime has elapsed since the data was last fetched, the data becomes "stale." Stale data is still served immediately from the cache to ensure a fast UI response. However, if the query associated with the stale data is actively being observed (i.e., a component using useQuery for that key is mounted), TanStack Query will trigger a background refetch to get potentially updated data.30 The default of 0 means data becomes stale immediately after being fetched, ensuring background refetches happen on events like mount or window focus if the query is active. Setting a longer staleTime (e.g., 5 minutes) can reduce network requests if slightly outdated data is acceptable for a period.
"Under the Hood": TanStack Query stores a timestamp (dataUpdatedAt) with each cache entry. When a query instance becomes active, it compares Date.now() with dataUpdatedAt + staleTime. If now is less than the sum, the data is fresh; otherwise, it's stale.
gcTime: number (Default: 5 * 60 * 1000 - 5 minutes, formerly cacheTime)
Definition: Specifies the duration (in milliseconds) for which inactive cached data is kept in memory before being eligible for garbage collection.30 A query becomes inactive when it no longer has any active observers (e.g., all components using useQuery for that key have unmounted).
Behavior: When a query becomes inactive, a timer based on gcTime starts. If no component subscribes to that query again before the timer expires, the cached data for that query key is removed from memory.30 Setting gcTime to Infinity disables garbage collection (not generally recommended).
"Under the Hood": The Query Cache maintains reference counts for each query key. When the count drops to zero, the gcTime timer begins.
Interaction of staleTime and gcTime:
These two options work together:
Data can be stale (staleTime passed) but still present in the cache (gcTime not yet passed). This is the common scenario enabling the "stale-while-revalidate" pattern.
gcTime should generally be set to a value greater than or equal to staleTime. If gcTime were shorter, inactive data could be garbage collected before it even had a chance to become stale, which is usually not the desired behavior. The default gcTime of 5 minutes ensures that even if a user navigates away and quickly returns, the cached data is likely still available for an immediate display while a background refetch occurs (if the data is stale).
This sophisticated caching strategy, balancing freshness (staleTime) and memory management (gcTime), allows developers to fine-tune how their application handles server state, optimizing for perceived performance (instant cache reads) while ensuring data eventually becomes consistent and unused data is cleaned up.30
How Data is Served from Cache
When useQuery is mounted or its queryKey changes:
TanStack Query checks the cache for data associated with the queryKey.
If data exists:
It checks if the data is fresh (Date.now() < dataUpdatedAt + staleTime).
If fresh: The cached data is returned immediately. No network request is made. status is 'success', isFetching is false.
If stale: The stale cached data is returned immediately. A background refetch is triggered if the query is active. status is 'success', isFetching becomes true during the refetch, and the UI updates again when the refetch completes.30
If no data exists:
The query enters the 'pending' state. isPending is true, isFetching is true.
The queryFn is executed to fetch data from the server.
Once the fetch completes, the data is stored in the cache, and the component updates with status: 'success' and the data, or status: 'error' and the error.30
Background Updates (Automatic Refetching)
TanStack Query automatically attempts to keep cached data fresh through several background refetching mechanisms, primarily triggered when data is stale:
refetchOnMount: boolean | 'always' | ((query: Query) => boolean | 'always') (Default: true): When a component mounts and uses useQuery, if the data for that query key in the cache is already stale, TanStack Query will trigger a background refetch. Setting it to 'always' forces a refetch on mount regardless of staleness.
refetchOnWindowFocus: boolean | 'always' | ((query: Query) => boolean | 'always') (Default: true): If the application window or tab (or the app itself in React Native) regains focus, TanStack Query will automatically refetch any stale queries that are currently active.31 This helps ensure data is up-to-date when a user returns to the application.
refetchOnReconnect: boolean | 'always' | ((query: Query) => boolean | 'always') (Default: true): If the network connection is lost and then re-established, TanStack Query will automatically refetch stale active queries.
refetchInterval: number | false | ((query: Query) => number | false) (Default: false): Enables polling. The query will be automatically refetched at the specified interval (in milliseconds), regardless of staleness.
refetchIntervalInBackground: boolean (Default: false): If refetchInterval is set, this option determines whether polling continues even when the application window/tab is not focused.
These automatic refetching behaviours are key to TanStack Query's ability to maintain data freshness with minimal developer effort. They proactively update data based on common user interactions and application lifecycle events, contributing significantly to a better user experience compared to manual refetching strategies.31
Table: TanStack Query Caching and Refetching Options
Option
Default
Description
Impact on Behavior
staleTime
0
Duration (ms) data is considered fresh after fetch.
Prevents background refetches while data is fresh. 0 means data is always stale.
gcTime
300000 (5m)
Duration (ms) inactive cached data is kept before garbage collection.
Controls memory usage by removing unused data. Should be >= staleTime.
refetchOnMount
true
Refetch stale query when a new instance mounts.
Ensures component gets fresh data on mount if cached data is stale.
refetchOnWindowFocus
true
Refetch stale query on window/app focus.
Updates data when user returns to the app. Requires FocusManager setup in RN (See Section 11).
refetchOnReconnect
true
Refetch stale query on network reconnection.
Updates data after network interruptions. Requires OnlineManager setup in RN (See Section 11).
refetchInterval
false
Interval (ms) for automatic polling, or false to disable.
Continuously updates data at a fixed frequency (e.g., for real-time dashboards).

Official Documentation Link Box
TanStack Query - Caching: https://tanstack.com/query/latest/docs/framework/react/guides/caching 30
TanStack Query - Important Defaults: https://tanstack.com/query/v5/docs/framework/react/guides/important-defaults
TanStack Query - Background Fetching Indicators: https://tanstack.com/query/v5/docs/framework/react/guides/background-fetching-indicators
TanStack Query - Window Focus Refetching: https://tanstack.com/query/latest/docs/framework/react/guides/window-focus-refetching 32
Section 10: Handling Mutations and Invalidating Queries
While useQuery handles reading data, useMutation handles actions that modify server state (Create, Update, Delete). A crucial part of the mutation process is ensuring that the relevant cached query data is updated to reflect these changes. TanStack Query primarily achieves this through query invalidation.
Invalidating Queries after Mutations
Purpose: When a mutation successfully modifies data on the server (e.g., adds a new todo, updates a user profile), any cached data on the client related to that resource becomes outdated or "stale." Query invalidation is the mechanism to inform TanStack Query that this cached data is no longer accurate and should be refetched.38
queryClient.invalidateQueries({ queryKey,...filters }): This is the core method used for invalidation. It is accessed via the QueryClient instance (which can be obtained using the useQueryClient hook within components or mutation callbacks). Calling invalidateQueries marks all matching queries in the cache as stale.38
Triggering Refetches: Importantly, simply marking a query as stale doesn't necessarily trigger an immediate refetch. A refetch is only triggered if the invalidated query is currently active (i.e., being observed by a mounted useQuery instance).38 Inactive queries are marked stale but will only refetch the next time they become active (or via other triggers like refetchOnWindowFocus).
Common Usage: invalidateQueries is most commonly called within the onSuccess or onSettled callbacks of the useMutation hook to ensure data consistency after a successful mutation.

TypeScript


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from './api'; // Your API function

const AddTodoForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo, // API function to create a todo
    onSuccess: () => {
      // Invalidate the 'todos' query cache after successful creation
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      console.log('Todo added successfully, todos query invalidated.');
    },
  });

  const handleSubmit = (title: string) => {
    mutation.mutate({ title }); // Trigger the mutation
  };

  //... form JSX...
};


Query Matching for Invalidation (Filters)
invalidateQueries provides flexible ways to specify which queries should be invalidated using filters within the options object:
Prefix Matching (Default): If you only provide a queryKey (e.g., { queryKey: ['todos'] }), TanStack Query will invalidate all queries whose keys start with that array.38 This is useful for invalidating related data, like invalidating both the main todo list (['todos']) and individual todo details (['todos', 5]) after an update.
Exact Matching: To invalidate only a query with a specific, exact key, add exact: true to the options: { queryKey: ['todos'], exact: true }. This will invalidate ['todos'] but not ['todos', 5].38
Predicate Function: For complex scenarios, you can provide a predicate function. This function receives each Query object from the cache and should return true for queries that need invalidation: { predicate: (query) => query.queryKey === 'todos' && query.state.data?.length > 10 }.38
Other Filters: You can also filter by query state using options like active: true (only invalidate active queries), inactive: true, stale: true, or fetchStatus: 'fetching'.39
Query invalidation serves as TanStack Query's primary strategy for achieving eventual consistency after data modifications. Instead of requiring developers to manually update potentially complex cache structures, it provides a simpler mechanism: mark relevant data as stale and let the library handle refetching for active queries.38 This trades immediate, manual cache updates for a more automated, background-driven consistency model.
Optimistic Updates
Optimistic updates enhance perceived performance by updating the UI immediately based on the expected outcome of a mutation, without waiting for the server's confirmation. If the mutation ultimately fails, the UI changes are rolled back.
Concept: Provide instant feedback to the user, making the application feel faster and more responsive.
Pattern with useMutation (v5): TanStack Query provides specific callbacks within useMutation to facilitate this pattern 33:
onMutate: async (variables) => {... }: This function executes before the mutationFn. It's the ideal place to perform the optimistic update.28
Cancel Queries: Prevent ongoing fetches for the relevant data from overwriting the optimistic update using await queryClient.cancelQueries({ queryKey: [...] }).33
Snapshot Previous State: Get the current data from the cache using queryClient.getQueryData([...]) to enable rollback.33
Apply Optimistic Update: Modify the cache directly using queryClient.setQueryData([...], (oldData) => /* new optimistic data */).33
Return Context: Return an object containing the previousData (and potentially other useful info).28 This context object is crucial for the rollback mechanism.
onError: (error, variables, context) => {... }: If the mutationFn fails, this callback executes.
Rollback: Use the context object (specifically the previousData saved in onMutate) to revert the cache changes made optimistically: queryClient.setQueryData([...], context.previousData).33
onSettled: (data, error, variables, context) => {... }: This callback executes after the mutation completes, whether it succeeded or failed.
Ensure Consistency: Invalidate the relevant queries using queryClient.invalidateQueries({ queryKey: [...] }). This ensures that even after a successful optimistic update, the client eventually fetches the canonical state from the server, correcting any minor discrepancies (like server-generated IDs or timestamps) or confirming the rollback after an error.33
Example (Conceptual - Adding a Todo):
onMutate: Cancel ['todos'] query fetches. Get current todos list. Use setQueryData to add the new todo (with a temporary ID perhaps) to the list in the cache. Return the original list.
onError: Use the returned original list to setQueryData back to the state before the optimistic update.
onSettled: Invalidate ['todos'] query to refetch the true list from the server.
While optimistic updates significantly improve the user experience, they introduce a temporary state of inconsistency between the client and server. This makes the rollback mechanism (onError) and the eventual consistency step (onSettled with invalidation) absolutely critical for maintaining data integrity.33 This pattern of immediate feedback followed by reconciliation with a source of truth is a common strategy in distributed systems and UI development, and TanStack Query provides a structured framework for implementing it in React applications.
Official Documentation Link Box
TanStack Query - Query Invalidation: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation 38
TanStack Query - Optimistic Updates: https://tanstack.com/query/v5/docs/react/guides/optimistic-updates 33
TanStack Query - useMutation Reference: https://tanstack.com/query/v5/docs/react/reference/useMutation 28
Exercise 13.4: Posting Data with useMutation (Expo Snack)
Goal: Implement a feature to add a new item to a list fetched by useQuery, using useMutation and query invalidation to update the list.
Concepts: Using useMutation for POST requests, mutationFn, onSuccess callback, accessing QueryClient via useQueryClient, using queryClient.invalidateQueries.
Task:
Start with the Expo Snack from Exercise 13.3 (fetching posts).
Add a simple form (e.g., a <TextInput> and a <Button>) below the post list to allow adding a new post title. Use useState to manage the input field's value.
Import useMutation and useQueryClient from @tanstack/react-query.
Get the queryClient instance: const queryClient = useQueryClient();.
Define an asynchronous function addPost that takes the new post data (e.g., { title: string }), performs a POST request to https://jsonplaceholder.typicode.com/posts, and returns the response.
Implement the useMutation hook:
TypeScript
const addPostMutation = useMutation({
  mutationFn: addPost, // Your API function
  onSuccess: (data) => {
    console.log('Post added:', data);
    // Invalidate the 'posts' query to trigger a refetch of the list
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onError: (error) => {
    console.error('Error adding post:', error);
    // Handle error display if needed
  },
});


In the form's submission handler (e.g., the button's onPress):
Call addPostMutation.mutate({ title: /* value from TextInput */ });.
Optionally clear the input field.
Observe that after successfully adding a post, the list automatically refreshes (due to invalidation and refetching) to include the new item (Note: JSONPlaceholder might return a simulated response, but the invalidation/refetch mechanism will still work). Add loading/disabled states to the button based on addPostMutation.isPending.
Section 11: React Native Specifics for TanStack Query
While TanStack Query's core concepts are platform-agnostic, certain features rely on detecting the application's environment status (online/offline, focused/unfocused). In React Native, these detections require specific setup using native modules, as browser-based APIs are unavailable.
Online Manager (onlineManager)
Purpose: TanStack Query uses the onlineManager to track the network connectivity status. Queries and mutations can be configured to pause automatically when the application is detected as offline.40
Default Behavior: In a web browser environment, it listens to window.online and window.offline events. This default mechanism does not work in React Native.40
React Native Integration: The recommended approach is to use the @react-native-community/netinfo library, which provides reliable network status information from the native platform.
onlineManager.setEventListener: This TanStack Query function allows you to provide a custom setup for listening to online status changes. You integrate NetInfo by providing a listener function that calls the setOnline callback supplied by TanStack Query whenever the network state changes.40
Setup Code (typically in your app's entry point, e.g., App.tsx):
TypeScript
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

// Inside your root component or initialization logic
useEffect(() => {
  // Subscribe to network state updates
  const unsubscribe = NetInfo.addEventListener(state => {
    onlineManager.setOnline(state.isConnected!= null && state.isConnected && Boolean(state.isInternetReachable));
  });

  // Cleanup subscription on unmount
  return () => {
    unsubscribe();
  };
},);

Explanation: This code sets up a listener using NetInfo. When the network state changes, the listener calls onlineManager.setOnline() with true if the device is connected and internet is reachable, and false otherwise. The useEffect hook ensures this listener is set up once and cleaned up properly.
Focus Refetching (focusManager)
Purpose: The refetchOnWindowFocus feature automatically refetches stale queries when the application window regains focus. In React Native, "window focus" corresponds to the application becoming active (coming to the foreground).32
Default Behavior: In web browsers, it uses events like window.focus or document.visibilityState. These are not available in React Native.41
React Native Integration: The standard way to detect app focus state in React Native is using the built-in AppState module.
Using focusManager.setFocused: You can directly inform TanStack Query's focusManager about the app's focus state by listening to AppState changes and calling focusManager.setFocused().32
Setup Code (typically in your app's entry point, e.g., App.tsx):
TypeScript
import React, { useEffect } from 'react';
import { AppState, Platform, AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports detecting focus on web browser environments
  if (Platform.OS!== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

// Inside your root component or initialization logic
useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange);

  // Cleanup subscription on unmount
  return () => {
    subscription.remove();
  };
},);

Explanation: This code adds a listener to AppState. When the app state changes to 'active', it calls focusManager.setFocused(true). For other states ('inactive', 'background'), it implicitly calls focusManager.setFocused(false) (or relies on the default behavior if setFocused isn't called again). This setup allows refetchOnWindowFocus to work correctly in the React Native context.
The need to manually configure onlineManager and focusManager in React Native underscores the bridge architecture of the platform. While TanStack Query provides platform-agnostic core logic, features that interact with the environment require specific bindings to native capabilities (NetInfo, AppState).32 Setting these up correctly is crucial for leveraging TanStack Query's automatic refetching features, which are particularly important for mobile applications where network conditions and app focus change frequently. Ensuring data is refreshed appropriately upon returning to the app or reconnecting to the network is key to a good mobile user experience.
Platform Considerations for Background Updates
Background Execution Limits: Both iOS and Android impose restrictions on background network activity and execution time to preserve battery life. This means features like refetchInterval might not work reliably or consistently when the app is fully in the background (not just inactive but backgrounded by the OS). refetchIntervalInBackground: true might have limited effectiveness on mobile platforms compared to web.
OS-Specific Behavior: The exact behavior of AppState transitions (inactive vs. background) and network state reporting can sometimes differ slightly between iOS and Android, though NetInfo and AppState aim to provide a consistent API. Developers should be aware of potential platform nuances.
Official Documentation Link Box
TanStack Query - OnlineManager: https://tanstack.com/query/v5/docs/reference/onlineManager 40
TanStack Query - FocusManager: https://tanstack.com/query/v5/docs/reference/focusManager 41
React Native AppState: https://reactnative.dev/docs/appstate
React Native NetInfo: https://github.com/react-native-netinfo/react-native-netinfo
Challenge 13: Integrate Zustand and TanStack Query for Medication Data (Expo Snack)
Goal: Build a React Native screen that demonstrates the effective separation and integration of client-side UI state (managed by Zustand) and server-side data (managed by TanStack Query).
Scenario: Develop a simple medication list screen for a hypothetical "SpeedyMeds" app. The screen should display a list of medications fetched from an API, allow users to filter this list based on text input, sort the list, and open a modal to add a new medication.
Requirements/Steps:
Setup:
Create a new Expo Snack.
Add @tanstack/react-query and zustand as dependencies.
Set up QueryClient and QueryClientProvider in App.tsx.
Configure onlineManager and focusManager for React Native using NetInfo and AppState (as shown in Section 11).
Zustand Store (uiStore.ts):
Create a Zustand store (useUIStore) to manage UI-specific state:
searchTerm: string (initialized to '')
sortOrder: 'asc' | 'desc' | 'none' (initialized to 'none')
isAddModalVisible: boolean (initialized to false)
Include actions in the store to update these state variables: setSearchTerm, setSortOrder, toggleAddModal.
TanStack Query (medicationApi.ts & Component):
Define an async function fetchMedications to simulate fetching medication data (e.g., return a hardcoded array of medication objects after a short delay).
Define an async function addMedication that simulates adding a new medication (e.g., logs the data and resolves successfully after a delay).
In the main screen component (MedicationScreen.tsx):
Use useQuery({ queryKey: ['medications'], queryFn: fetchMedications }) to fetch the medication list. Handle isPending and error states.
Implement useMutation({ mutationFn: addMedication,... }). In onSuccess, invalidate the ['medications'] query using queryClient.invalidateQueries.
Integration (MedicationScreen.tsx):
Get searchTerm, sortOrder, isAddModalVisible, setSearchTerm, setSortOrder, toggleAddModal from useUIStore.
Get the medicationsData from the useQuery result.
Client-Side Filtering/Sorting: Before passing data to the FlatList, apply filtering based on searchTerm and sorting based on sortOrder to the medicationsData array using standard JavaScript array methods (.filter(), .sort()). This logic should be memoized using useMemo to avoid re-computation on every render unless medicationsData, searchTerm, or sortOrder changes.
Render a <TextInput> component whose value is controlled by searchTerm and whose onChangeText calls setSearchTerm.
Render sorting controls (e.g., buttons) that call setSortOrder.
Render the filtered and sorted list using <FlatList>.
Render a button that calls toggleAddModal.
Render a <Modal> component whose visibility is controlled by isAddModalVisible. Inside the modal, include a form to add a new medication, which triggers the addMedication mutation on submission.
Key Learning: This challenge emphasizes the crucial distinction between server state (the raw medication list fetched and cached by TanStack Query) and client state (UI controls like filters, sort order, modal visibility managed by Zustand). It demonstrates the common pattern where client state operates on or influences the presentation of server state, rather than duplicating it. Filtering and sorting fetched data on the client-side based on UI state is a practical application of this separation. This separation is vital for building scalable applications, as mixing responsibilities (e.g., storing server data directly in Zustand alongside TanStack Query) leads to synchronization issues and negates the benefits of using a dedicated server state library.
Conclusion
Effective state management is paramount in building robust and maintainable React Native applications. This module explored the progression from basic local state with useState to more sophisticated solutions addressing the challenges of sharing state across components and managing asynchronous server data.
useState remains essential for component-local state, but its limitations become apparent when data needs to span multiple components, leading to the cumbersome pattern of prop drilling. React's Context API offers a built-in solution to prop drilling, particularly suitable for low-frequency global data like themes or authentication status. However, its default re-rendering behavior necessitates careful performance optimization, especially with frequently changing or complex context values.
For more dynamic client-side state, libraries like Zustand provide a compelling alternative. Zustand's minimal boilerplate, hook-based API, and selector-driven subscription model offer significant performance benefits and an improved developer experience by ensuring components only re-render when the specific state they depend on changes.
Finally, recognizing the distinct nature of server state—data fetched asynchronously from an external source—is critical. Attempting to manage server state with client-state tools leads to complexity and boilerplate. TanStack Query provides a dedicated, powerful solution, abstracting away the intricacies of caching, background synchronization, stale data handling, and mutations. Its declarative approach simplifies data fetching logic and integrates seamlessly with React Native, provided platform-specific bindings for online and focus management are configured.
Choosing the right state management tool involves understanding these trade-offs: the simplicity of built-in solutions versus the performance and features of dedicated libraries, and the fundamental differences between managing client state and server state. Integrating tools like Zustand for UI state and TanStack Query for server state, as demonstrated in the challenge, represents a common and effective pattern for building scalable, performant, and maintainable React Native applications.
Works cited
Expo SDK 52 - Expo Changelog, accessed May 12, 2025, https://expo.dev/changelog/2024-11-12-sdk-52
WARNING: Do not update Expo Go if you have a SDK 52 project : r/reactnative - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1kfo1il/warning_do_not_update_expo_go_if_you_have_a_sdk/
TanStack Query, accessed May 12, 2025, https://tanstack.com/query/v5
Migrating to TanStack Query v5 - BigBinary, accessed May 12, 2025, https://www.bigbinary.com/blog/migrating-to-tanstack-query-v5
zustand/docs/getting-started/introduction.md at main · pmndrs ..., accessed May 12, 2025, https://github.com/pmndrs/zustand/blob/main/docs/getting-started/introduction.md
Zustand: Introduction, accessed May 12, 2025, https://zustand.docs.pmnd.rs/
Using the State Hook – React, accessed May 12, 2025, https://legacy.reactjs.org/docs/hooks-state.html
useState – React, accessed May 12, 2025, https://react.dev/reference/react/useState
How does React.js useState hook work under the hood? - DEV ..., accessed May 12, 2025, https://dev.to/nadim_ch0wdhury/how-does-reactjs-usestate-hook-work-under-the-hood-44lk
Props Drilling in React - Geekster, accessed May 12, 2025, https://www.geekster.in/articles/props-drilling-in-react/
What is Prop Drilling in react, and how do you avoid it?, accessed May 12, 2025, https://www.angularminds.com/blog/what-is-prop-drilling-in-react
StateFlow and SharedFlow | Kotlin | Android Developers, accessed May 12, 2025, https://developer.android.com/kotlin/flow/stateflow-and-sharedflow
Understanding State Management in ViewModels with Kotlin, accessed May 12, 2025, https://androidacademic.blogspot.com/2024/02/viewmodel-state-management.html.html
ObservedObject vs StateObject: Key Differences Explained - DhiWise, accessed May 12, 2025, https://www.dhiwise.com/post/understanding-observedobject-vs-stateobject-a-simple-guide
@StateObject vs. @ObservedObject: The differences explained ..., accessed May 12, 2025, https://www.avanderlee.com/swiftui/stateobject-observedobject-differences/
How to Use RxJS for Reactive State Management in Angular, accessed May 12, 2025, https://blog.pixelfreestudio.com/how-to-use-rxjs-for-reactive-state-management-in-angular/
State Management with RxJS in Angular (Undo Action) - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/79221218/state-management-with-rxjs-in-angular-undo-action
Context – React, accessed May 12, 2025, https://legacy.reactjs.org/docs/context.html
Improve React Context performance - Codiga, accessed May 12, 2025, https://www.codiga.io/blog/react-context-performance/
React resources - Learn web development | MDN, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_resources
React Context API vs Zustand – which one should you use?, accessed May 12, 2025, https://codedamn.com/news/reactjs/zustand-vs-react
Managing Global Styles and Themes | React.js: Learn Easily with ..., accessed May 12, 2025, https://docureacten.github.io/Style/9-6-Managing%20Global%20Styles%20and%20Themes
Optimizing Performance – React, accessed May 12, 2025, https://legacy.reactjs.org/docs/optimizing-performance.html
Adaptive Traffic-Based Techniques For Live Multimedia Streaming - CiteSeerX, accessed May 12, 2025, https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=9900e0739bc8dc263799989fba1e309385e48536
KB6252: What is the 'SetEmergencyReserveSize(): New size = 8388608' message in the MicroStrategy DSSErrors.log?, accessed May 12, 2025, https://community.microstrategy.com/s/article/KB6252-What-is-the-SetEmergencyReserveSize-New-size-8388608
How to Handle State Management in Client-Side Rendering, accessed May 12, 2025, https://blog.pixelfreestudio.com/how-to-handle-state-management-in-client-side-rendering/
Handling State and State Management | System Design - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/handling-state-and-state-management-system-design/
useMutation | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/react/reference/useMutation
Optimistic Updates | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
Mutations | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/latest/docs/framework/react/guides/caching
Window Focus Refetching | TanStack Query Vue Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/framework/vue/guides/window-focus-refetching
Window Focus Refetching | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/latest/docs/framework/react/guides/window-focus-refetching
Optimistic Updates | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/react/guides/optimistic-updates
useMutation | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/framework/react/reference/QueryClientProvider
Migrating to TanStack Query v5 | TanStack Query Vue Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/framework/vue/guides/migrating-to-v5
Server Rendering & Hydration | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/react/guides/queries
Mutations | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/react/guides/mutations
Query Invalidation | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
Filters | TanStack Query React Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/framework/react/guides/filters
OnlineManager | TanStack Query Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/reference/onlineManager
FocusManager | TanStack Query Docs, accessed May 12, 2025, https://tanstack.com/query/v5/docs/reference/focusManager
How to use React Global Context? - 4Geeks, accessed May 12, 2025, https://4geeks.com/how-to/react-global-context
