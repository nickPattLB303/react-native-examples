## Section 9: Component Lifecycle (`useEffect` Hook)

Components in React have a lifecycle: they are created (mounted), they update when their props or state change, and eventually, they are destroyed (unmounted). The `useEffect` Hook allows you to perform "side effects" in your functional components, which are operations that happen outside the normal rendering flow, often related to these lifecycle events.

### What are Side Effects?

Side effects are actions that your component performs that interact with the outside world, beyond just rendering UI based on props and state. Common side effects include:

- Fetching data from an API.
- Setting up or clearing subscriptions (e.g., to event listeners, timers).
- Manually changing the DOM (less common in React Native, but possible).
- Logging.

### The `useEffect` Hook

The `useEffect` Hook lets you synchronize a component with an external system. You pass it a function (the "effect") and an optional array of dependencies.

**Syntax:**

```tsx
import React, { useEffect, useState } from "react";

useEffect(() => {
  // Your effect function: runs after every render by default
  // (if no dependency array is provided)
  console.log("Component rendered or updated");

  // Optional: Return a cleanup function
  return () => {
    console.log("Cleanup before next effect or on unmount");
  };
}, [dependency1, dependency2]); // Optional dependency array
```

- **Effect Function:** The first argument to `useEffect` is a function that contains the side effect logic. This function will run _after_ React has committed changes to the screen.
- **Dependency Array (Optional):** The second argument is an array of dependencies.
  - If you **omit** the dependency array, the effect function runs after _every_ render.
  - If you provide an **empty array `[]`**, the effect runs only _once_ after the initial render (component did mount) and the cleanup function runs only when the component unmounts (component will unmount).
  - If you provide an array with **variables `[propA, stateB]`**, the effect runs after the initial render and _anytime_ any of the values in the dependency array change.
- **Cleanup Function (Optional):** The effect function can optionally return another function. This is the cleanup function. React will run this cleanup function before running the effect again (if dependencies change) and also when the component is unmounted from the UI.

### Simulating Lifecycle Events with `useEffect`

**1. Running an Effect Once (Component Did Mount):**
To run an effect only once after the component mounts (similar to `componentDidMount` in class components), provide an empty dependency array `[]`.

```tsx
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const PharmacyWelcomeMessage = () => {
  const [message, setMessage] = useState("Loading welcome message...");

  useEffect(() => {
    // This effect runs only once after the initial render
    console.log("PharmacyWelcomeMessage: Mounted");
    // Simulate fetching a welcome message for SpeedyMeds
    const timerId = setTimeout(() => {
      setMessage("Welcome to SpeedyMeds! Your health, our priority.");
    }, 2000);

    // Cleanup function: runs when the component unmounts
    return () => {
      console.log("PharmacyWelcomeMessage: Unmounting, clearing timer.");
      clearTimeout(timerId);
    };
  }, []); // Empty dependency array

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
};
// ... styles
```

**2. Running an Effect When Dependencies Change (Component Did Update):**
To run an effect after the initial render and whenever specific props or state values change (similar to `componentDidUpdate`), include those values in the dependency array.

```tsx
import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

interface PatientDetailsProps {
  patientId: string;
}

const PatientDetailsFetcher: React.FC<PatientDetailsProps> = ({
  patientId,
}) => {
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(`PatientDetailsFetcher: Effect for patientId: ${patientId}`);
    setLoading(true);
    // Simulate fetching patient data for SpeedyMeds
    const fetchPatientData = async () => {
      // In a real app, this would be an API call: fetch(`/api/patients/${patientId}`)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setPatientData({
        id: patientId,
        name: `Patient ${patientId.slice(-3)}`,
        condition: "Stable",
      });
      setLoading(false);
    };

    fetchPatientData();

    // No cleanup needed for this specific example, but could be added
    // if there was something to clean up (e.g., aborting a fetch request)
  }, [patientId]); // Dependency: effect runs if patientId changes

  if (loading) {
    return <Text>Loading patient details for ID: {patientId}...</Text>;
  }

  if (!patientData) {
    return <Text>No patient data found for ID: {patientId}.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Patient ID: {patientData.id}</Text>
      <Text>Name: {patientData.name}</Text>
      <Text>Condition: {patientData.condition}</Text>
    </View>
  );
};
// ... styles
```

In this example, if the `patientId` prop changes, the effect will re-run, fetching data for the new patient.

**3. Cleanup (Component Will Unmount):**
The cleanup function returned by the effect is crucial for preventing memory leaks and issues. It runs when the component is about to be removed from the UI (unmounted) or before the effect runs again.
Common use cases for cleanup:

- Clearing timers (`clearTimeout`, `clearInterval`).
- Removing event listeners.
- Canceling API subscriptions or aborting fetch requests.

Refer back to the `PharmacyWelcomeMessage` example for a `clearTimeout` cleanup.

### Diagram: `useEffect` Lifecycle

The following diagram illustrates the basic flow of the `useEffect` Hook in relation to component rendering and updates.

```mermaid
graph TD
    A[Component Renders / Re-renders] --> B{Dependencies Changed?};
    B -- Yes --> C[Run Cleanup (if previous effect ran)];
    C --> D[Run Effect Function];
    B -- No --> E[Do Nothing];
    F[Component Mounts] --> D;
    G[Component Unmounts] --> H[Run Cleanup (if effect ran)];
    D --> A; % Effect might cause re-render if state is set
```

This diagram shows that when a component mounts, the effect function runs. On subsequent re-renders, React checks if the dependencies (if specified) have changed. If they have, the cleanup function from the previous effect runs, followed by the new effect function. When the component unmounts, the cleanup function for the last effect runs.

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** `useEffect` works exactly the same way in React Native as it does in React for the web. The concepts of the effect function, dependency array, and cleanup function are identical.
>
> **Key Takeaway:** Your existing understanding of `useEffect` is directly applicable.

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** `useEffect` covers functionalities similar to Angular's lifecycle hooks like `ngOnInit`, `ngOnChanges`, and `ngOnDestroy`. However, `useEffect` is more flexible and unified. The dependency array is key to controlling when the effect runs, mimicking different lifecycle events.
>
> **Key Takeaway:** `useEffect` is the go-to Hook for handling side effects. Master the use of the dependency array to control its execution precisely.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** `useEffect` can be compared to lifecycle methods like `onCreate`/`onResume`/`onPause`/`onDestroy` in Android Activities/Fragments, or `viewDidLoad`/`viewWillAppear`/`viewWillDisappear` in iOS ViewControllers. The empty dependency array `[]` provides behavior similar to `onCreate` or `viewDidLoad` for setup, and the cleanup function to `onDestroy` or `viewDidDisappear` for teardown. Effects with dependencies relate to updates based on data changes.
>
> **Key Takeaway:** Use `useEffect` to manage operations that need to happen at specific points in your component's existence on the screen, such as data fetching when it appears, or cleaning up resources when it disappears.

The `useEffect` Hook is a powerful tool for managing side effects and synchronizing your components with the outside world. Understanding its dependency array and cleanup mechanism is crucial for writing correct and efficient React Native applications.

> 📚 **Official Documentation:**
>
> - [React Docs: Hooks - Using the Effect Hook (`useEffect`)](https://react.dev/reference/react/useEffect)
> - [React Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
> - [React Docs: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) (Important considerations for when _not_ to use `useEffect`)

---

### Exercise 7.5: Using `useEffect` for Side Effects

Let's practice using `useEffect` to perform a side effect, such as fetching data (simulated).

**Objective:** Create a `UserProfile` component that simulates fetching user data when it mounts and displays a welcome message.

**Instructions:**

1.  Define a functional component named `UserProfile`.
2.  Use `useState` to manage `userName`, initialized to `null` or an empty string.
3.  Use `useState` to manage `isLoading`, initialized to `true`.
4.  Use `useEffect` to simulate fetching user data when the component mounts (i.e., run the effect only once):
    - Inside the effect, set `isLoading` to `true` (though it's already true, good practice if fetch could be re-triggered).
    - Use `setTimeout` to simulate a network request delay (e.g., 1.5 seconds).
    - After the timeout, set `userName` to a sample name (e.g., "SpeedyMeds User").
    - Set `isLoading` to `false`.
5.  Conditionally render:
    - If `isLoading` is true, display a `<Text>` component showing "Loading profile...".
    - If `isLoading` is false and `userName` is available, display a welcome message like "Welcome, [userName]!".
6.  (Optional) Ensure your `useEffect` has an empty dependency array `[]` so it only runs on mount.

**Tool:** CodeSandbox

**(https://codesandbox.io)**

_A solution will be provided by your instructor or in the course materials._
