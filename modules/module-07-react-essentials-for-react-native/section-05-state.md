## Section 5: State (`useState` Hook)

While props allow parent components to pass data down to their children, components often need to manage their own internal data that can change over time due to user interaction, network responses, or other events. This internal, mutable data is called **state**.

In modern React, state in functional components is primarily managed using the `useState` Hook.

### What is State?

State is data that a component owns and can change during its lifecycle. Unlike props, which are passed in from the parent and are read-only for the receiving component, state is managed internally by the component itself.

**Key Characteristics of State:**

- **Internal to Component:** State is encapsulated within the component that defines it. It's not directly accessible by parent or sibling components (though it can be passed down as props if needed).
- **Mutable:** A component can change its own state.
- **Triggers Re-renders:** When a component's state changes, React automatically re-renders the component (and potentially its children) to reflect the new state in the UI. This is the core of React's declarative nature – you change the state, and React updates the view.

Think of state as a component's memory. It remembers information that can affect how it renders and behaves.

### The `useState` Hook

The `useState` Hook is a special function provided by React that lets you add state to your functional components.

**How to use `useState`:**

1.  **Import it:** `import React, { useState } from 'react';`
2.  **Call it:** Inside your functional component, call `useState` with an initial value for your state variable.
3.  **It returns:** `useState` returns an array with two elements:
    - The current state value.
    - A function to update that state value.

We typically use array destructuring to get these two elements.

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RefillRequestButton: React.FC = () => {
  // Declare a state variable called 'isRequested', initialized to false
  // setIsRequested is the function to update isRequested
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [requestCount, setRequestCount] = useState<number>(0);

  const handlePress = () => {
    // Update the state
    setIsRequested(true);
    // When updating state based on the previous state, use the functional update form
    setRequestCount((prevCount) => prevCount + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Medication Refill Status: {isRequested ? "Requested" : "Not Requested"}
      </Text>
      <Text style={styles.countText}>Times Requested: {requestCount}</Text>
      <Button
        title={isRequested ? "Refill Requested!" : "Request Refill"}
        onPress={handlePress}
        disabled={isRequested} // Disable button if already requested
      />
      {isRequested && (
        <Button
          title="Reset Request"
          onPress={() => {
            setIsRequested(false);
            // setRequestCount(0); // Optionally reset count too
          }}
          color="#FF6347" // Tomato color
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
  },
  countText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
});

export default RefillRequestButton;
```

**Explanation:**

1.  `const [isRequested, setIsRequested] = useState<boolean>(false);`
    - We call `useState` with `false` as the initial value for `isRequested`. This means when the component first renders, `isRequested` will be `false`.
    - `useState<boolean>`: We explicitly tell TypeScript that this state variable will hold a boolean.
    - `isRequested`: This is our state variable. Its current value is `false`.
    - `setIsRequested`: This is the function we use to update the `isRequested` state. Calling this function will trigger a re-render of the `RefillRequestButton` component.
2.  `const [requestCount, setRequestCount] = useState<number>(0);`
    - Another state variable, `requestCount`, initialized to `0` and typed as a number.
3.  `handlePress` Function:
    - When the "Request Refill" button is pressed, `handlePress` is called.
    - `setIsRequested(true);`: This updates the `isRequested` state to `true`.
    - `setRequestCount(prevCount => prevCount + 1);`: This updates `requestCount`. When the new state depends on the previous state, it's recommended to pass a function to the state setter. This function receives the previous state value as an argument and returns the new state value. This ensures you're working with the most up-to-date state, especially if updates are batched.
4.  **Conditional Rendering & Behavior:**
    - The text displays "Requested" or "Not Requested" based on the `isRequested` state.
    - The button's title and `disabled` prop also change based on `isRequested`.
    - A "Reset Request" button appears only if `isRequested` is true.

### Rules of Hooks (Including `useState`)

Hooks are JavaScript functions, but they have two important rules you must follow:

1.  **Only Call Hooks at the Top Level:** Don't call Hooks inside loops, conditions, or nested functions. Always use Hooks at the top level of your React function, before any early returns.
2.  **Only Call Hooks from React Functions:** Don't call Hooks from regular JavaScript functions. Only call them from React functional components or from custom Hooks (which we'll learn about later).

ESLint plugins (like `eslint-plugin-react-hooks`) can help enforce these rules automatically.

### State Updates are Asynchronous (Conceptually)

When you call a state setter function (like `setIsRequested`), React doesn't immediately change the state and re-render. Instead, it schedules an update. This allows React to batch multiple state updates for performance.

This means you should **not** rely on the state variable being updated immediately after calling the setter function within the same synchronous block of code.

```tsx
// ... inside a component
const [count, setCount] = useState(0);

const handleIncrement = () => {
  setCount(count + 1); // Request an update
  // console.log(count); // ⚠️ This might log the OLD count, not count + 1
  // React processes state updates after the current event handler has finished.
};
```

If you need to perform an action _after_ the state has been updated and the component re-rendered, you'll use the `useEffect` Hook, which is covered in a later section.

> ⚛️ **(Web Developers - React):**
>
> **Comparison:** `useState` works identically in React for the web and React Native. The principles of initializing state, updating it, and the rules of Hooks are exactly the same.
>
> **Key Takeaway:** Your existing knowledge of `useState` is directly applicable.

> 🅰️ **(Web Developers - Angular):**
>
> **Comparison:** In Angular, component properties often serve as state. When these properties change, Angular's change detection mechanism updates the view. `useState` is React's explicit way to declare that a piece of data is stateful and should trigger re-renders upon modification. The setter function (e.g., `setIsRequested`) is how you signal these changes, somewhat analogous to reassigning a property that Angular is watching.
>
> **Key Takeaway:** `useState` provides a clear and functional way to manage component-local data that drives UI changes, distinct from simple class properties.

State is what makes your components dynamic and interactive. Mastering `useState` is a critical step in becoming proficient with React and React Native.

### Exercise 7.3: Managing Component State

**Objective:** Create a simple counter component that uses `useState` to manage its count.

**Instructions:**

1.  Open a CodeSandbox (or continue from the previous exercise).
2.  Create a new functional component named `MedicationDoseCounter`.
3.  This component should display:
    - A `<Text>` element showing the current dose count (e.g., "Doses Taken: 0").
    - A `<Button>` with the title "Take Dose".
    - A `<Button>` with the title "Reset Doses".
4.  Use `useState` to manage the `doseCount`, initialized to `0`.
5.  When "Take Dose" is pressed, increment the `doseCount`.
6.  When "Reset Doses" is pressed, set the `doseCount` back to `0`.
7.  Display your `MedicationDoseCounter` in the `App` component.

**(https://codesandbox.io)** (A pre-configured CodeSandbox with React and TypeScript should be set up for this exercise. For now, this is a placeholder link.)

> 📚 **Official Documentation:**
>
> - [React Docs - `useState` Hook](https://react.dev/reference/react/useState)
> - [React Docs - State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
> - [React Docs - Rules of Hooks](https://react.dev/warnings/rules-of-hooks)
