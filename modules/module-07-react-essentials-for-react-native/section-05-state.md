## Section 5: State (`useState` Hook)

While props allow components to receive data from their parents, `state` allows components to manage their own internal data that can change over time. This section introduces the `useState` Hook, the primary way to add state to functional React components.

### What is State?

State is data that a component owns and can change during its lifecycle. When a component's state changes, React automatically re-renders the component (and potentially its children) to reflect the new state. This is key to creating interactive UIs.

**Key characteristics of state:**

- **Internal:** State is local and encapsulated within the component that defines it. It cannot be directly accessed or modified by parent or sibling components (though parents can pass down functions via props that can indirectly update a child's or parent's state).
- **Mutable:** Unlike props, state can be updated by the component itself, usually in response to user interactions or other events.
- **Triggers Re-renders:** Changes to state trigger React to re-render the component and its descendants.

### The `useState` Hook

The `useState` Hook is a function provided by React that allows you to add state to functional components. You call `useState` at the top level of your functional component.

**Syntax:**

```tsx
import React, { useState } from "react";

const [stateVariable, setStateFunction] = useState(initialState);
```

- `useState` takes one argument: the `initialState`. This can be a primitive value (string, number, boolean), an array, or an object.
- It returns an array with two elements:
  1.  `stateVariable`: The current value of the state.
  2.  `setStateFunction`: A function that you use to update the `stateVariable`.

**Example: A Simple Counter**

Let's build a basic counter component to illustrate `useState`.

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Counter = () => {
  const [count, setCount] = useState<number>(0); // Initialize count state to 0

  const increment = () => {
    setCount(count + 1); // Update the count state
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>
        Prescription Refills Available: {count}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Request Refill (+)" onPress={increment} />
        <Button
          title="Use Refill (-)"
          onPress={decrement}
          disabled={count === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  countText: {
    fontSize: 18,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default Counter;
```

In this `Counter` component (themed for SpeedyMeds as prescription refills):

- We initialize a state variable `count` to `0`.
- `setCount` is the function used to update `count`.
- When `increment` or `decrement` is called (e.g., by pressing a button), `setCount` updates the state, and React re-renders the `Counter` component, displaying the new `count`.

### Updating State

When you call the `setStateFunction` (e.g., `setCount`):

- **Batching:** React may batch multiple state updates for performance. Don't rely on the current state value immediately after calling the setter if you need the updated value synchronously for further logic within the same function call.
- **Functional Updates:** If your new state depends on the previous state, you can pass a function to the `setStateFunction`. This function receives the previous state as an argument and should return the new state. This is useful for ensuring updates are based on the most up-to-date previous state, especially if updates are batched or asynchronous.

  ```tsx
  const incrementSafely = () => {
    // setCount(count + 1); // This might be problematic if updates are batched
    setCount((prevCount) => prevCount + 1); // Safer: uses the previous state
  };
  ```

### Rules of Hooks

There are two important rules for using Hooks (including `useState`):

1.  **Only Call Hooks at the Top Level:** Don't call Hooks inside loops, conditions, or nested functions. Always use Hooks at the top level of your React function, before any early returns.
2.  **Only Call Hooks from React Functions:** Call Hooks from React functional components or from custom Hooks. Don't call Hooks from regular JavaScript functions.

ESLint plugins (like `eslint-plugin-react-hooks`) can help enforce these rules.

### Typing State with TypeScript

TypeScript can infer the type of the state variable from the `initialState` argument to `useState`.

```tsx
const [count, setCount] = useState(0); // TypeScript infers `count` is number, `setCount` is (value: number) => void
const [medicationName, setMedicationName] = useState("Amoxicillin"); // `medicationName` is string
```

If the initial state can be `null` or `undefined`, or if it's a complex object, you might want to provide an explicit type argument:

```tsx
interface PatientProfile {
  id: string;
  name: string;
  age: number;
}

const [patient, setPatient] = useState<PatientProfile | null>(null);

// Later...
// setPatient({ id: '123', name: 'Jane Doe', age: 34 });
```

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** `useState` and the rules of Hooks are identical in React Native and React for web. Your knowledge of managing local component state with `useState` is directly transferable.
>
> **Key Takeaway:** No new concepts here if you're proficient with `useState` in React.

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** State in React components is somewhat analogous to component properties in Angular that you might modify (e.g., via `this.propertyName = ...`). However, React enforces state updates through the setter function provided by `useState`. Direct mutation of state variables is not allowed and won't trigger re-renders. Angular's change detection is different from React's re-rendering mechanism triggered by state setters.
>
> **Key Takeaway:** Always use the setter function (e.g., `setCount`) to update state. This is how React knows to re-render the component. Understand the Rules of Hooks, especially calling them at the top level.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** State is similar to instance variables or properties in your `UIView` subclasses or `Activity`/`Fragment`/`UIViewController` classes that hold data determining the UI's appearance or behavior. When this data changes in native code, you often manually update the UI. With React's `useState`, you change the state variable using its setter, and React automatically handles the UI update.
>
> **Key Takeaway:** `useState` is the primary mechanism for making your components interactive and dynamic. Changes to state variables (via their setters) drive UI updates.

State is a fundamental concept in React that enables components to be dynamic and interactive. The `useState` Hook provides a simple and powerful way to manage state within your functional components.

> 📚 **Official Documentation:**
>
> - [React Docs: State - A Component's Memory (`useState`)](https://react.dev/learn/state-a-components-memory)
> - [React Docs: Hooks - Using the State Hook](https://react.dev/reference/react/useState)
> - [React Docs: Rules of Hooks](https://react.dev/warnings/rules-of-hooks)

---

### Exercise 7.3: Managing Component State

Let's get some practice using the `useState` Hook to manage component state.

**Objective:** Create a `NotesInput` component that allows a user to type in notes for a prescription and displays the current notes. It should also have a button to clear the notes.

**Instructions:**

1.  Define a functional component named `NotesInput`.
2.  Use `useState` to manage a `notes` state variable, initialized as an empty string (`''`).
3.  Render a `TextInput` component (from `react-native`) where the user can type. The `TextInput`'s value should be controlled by the `notes` state, and its `onChangeText` prop should update the `notes` state.
4.  Display the current `notes` state in a `<Text>` component below the `TextInput`.
5.  Add a `<Button>` labeled "Clear Notes". When pressed, it should reset the `notes` state to an empty string.
6.  (Optional) Add some basic styling.

**Tool:** CodeSandbox (Remember to import `TextInput`, `Button`, etc., from `react-native-web` if your CodeSandbox template is for React web, or use an Expo Snack if you want to use actual React Native components more easily for this exercise type, though the blueprint specifies CodeSandbox for this module. For fundamental React concepts, `react-native-web` can suffice.)

> [!NOTE]
> For this exercise in CodeSandbox, if you are using a standard React (web) template, you can use HTML input elements or import components like `TextInput` and `Button` from `react-native-web` to simulate the React Native environment for learning purposes. The core `useState` logic remains the same.

**(https://codesandbox.io)**

_A solution will be provided by your instructor or in the course materials._
