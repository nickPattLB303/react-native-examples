## Section 7: Creating Custom Hooks

As your SpeedyMeds application grows, you'll often find yourself writing similar stateful logic in multiple components. Custom Hooks allow you to extract component logic into reusable functions. This is a powerful way to share logic between components without resorting to higher-order components or render props, leading to cleaner and more maintainable code.

### Conceptual Content

**What is a Custom Hook?**

A custom Hook is essentially a JavaScript function whose name starts with `"use"` and that can call other Hooks (like `useState`, `useEffect`, `useCallback`, `useMemo`, or even other custom Hooks). They let you encapsulate complex logic, including state and side effects, into a single, reusable unit.

**Why Create Custom Hooks?**

- **Reusability:** Share stateful logic across multiple components. For example, logic for handling form input and validation, managing network status, or subscribing to device sensor data can be extracted into a custom Hook and used wherever needed.
- **Readability & Simplicity:** By extracting complex logic, your components become cleaner and easier to understand, focusing more on the UI presentation.
- **Separation of Concerns:** Custom Hooks help separate concerns by isolating specific pieces of logic from the rendering responsibilities of components.
- **Testability:** Custom Hooks are just functions, making them easier to test in isolation compared to testing the same logic embedded within multiple components.

**Key Principles of Custom Hooks:**

- **Naming Convention:** Custom Hook names MUST start with `use` (e.g., `useFormInput`, `useScreenDimensions`, `useMedicationAPI`). This convention is important because it allows linters to automatically check for violations of the Rules of Hooks.
- **Call Other Hooks:** Custom Hooks can, and often do, call built-in React Hooks or other custom Hooks.
- **Rules of Hooks Apply:** The two main Rules of Hooks apply when creating and using custom Hooks:
  1.  **Only Call Hooks at the Top Level:** Don't call Hooks inside loops, conditions, or nested functions. Call them at the top level of your React functional component or your custom Hook.
  2.  **Only Call Hooks from React Functions:** Call Hooks from React functional components or from custom Hooks. Don't call Hooks from regular JavaScript functions.
- **State and Effects are Isolated:** Each time you use a custom Hook in a component, all state (`useState`) and side effects (`useEffect`) declared inside that custom Hook are fully isolated to that specific component instance. Custom Hooks share logic, not state itself. If you want to share state between components, you should use context or a state management library like Zustand.

### How to Build a Custom Hook (General Steps)

1.  **Identify Reusable Logic:** Look for patterns in your components where the same stateful logic (managing some state with `useState`) or side effect management (`useEffect`) is repeated.
2.  **Create a Function:** Define a JavaScript function with a name starting with `use` (e.g., `useToggle`, `useFetchData`).
3.  **Move Logic:** Extract the relevant `useState`, `useEffect`, and other Hook calls, along with any related helper functions, into this new custom Hook function.
4.  **Define Inputs (Arguments):** Determine what parameters your custom Hook needs to receive from the component using it (e.g., an initial value for state, a URL for data fetching, configuration options).
5.  **Define Outputs (Return Value):** Decide what values or functions your custom Hook should return to the component. This could be state variables, functions to update that state, loading/error statuses, etc. You can return these as an array (like `useState`) or an object (often preferred for multiple return values for better readability).
6.  **Use the Custom Hook:** Call your custom Hook from your functional components just like any built-in Hook, and use its returned values/functions.

### Referential Content

Custom Hooks don't have a specific API signature like built-in Hooks. They are standard JavaScript functions that can internally use built-in Hooks.

- **Input:** They can accept any arguments, just like regular functions.
- **Output:** They can return any value (an array, an object, a primitive) that represents the shared state or logic.

> 📚 **Official Documentation:**
>
> - [React Docs: Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
> - [React Docs: Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)

### Procedural Content

Let's create a simple and common custom Hook for managing a boolean toggle state, which could be used in various parts of the SpeedyMeds app (e.g., for modals, switches, expanding sections).

**Example: `useToggle` Custom Hook**

This custom Hook will manage a boolean state and provide a function to toggle it.

```tsx
import { useState, useCallback } from "react";

// Custom Hook: useToggle
// initialState: The initial boolean state (defaults to false)
// Returns: A tuple [booleanState, toggleFunction]
function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialState);

  // useCallback ensures the toggle function has a stable reference
  // across re-renders, which is good practice if it were passed to memoized children.
  // Here, an empty dependency array is appropriate as toggle's definition doesn't depend on external variables
  // that change over the component's lifecycle in a way that would require toggle to be redefined.
  // setState from useState is guaranteed to be stable.
  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []); // No dependencies needed as setState is stable and it uses a functional update.

  return [state, toggle];
}

export default useToggle;
```

**Using the `useToggle` Hook in a SpeedyMeds Component (e.g., `FaqItem`):**

```tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import useToggle from "./useToggle"; // Assuming useToggle is in this file or imported

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isExpanded, toggleExpanded] = useToggle(false); // Using the custom hook

  return (
    <View style={styles.faqContainer}>
      <TouchableOpacity
        onPress={toggleExpanded}
        style={styles.questionContainer}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Text>{isExpanded ? "➖" : "➕"}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

// Example of using FaqItem in a screen
const SpeedyMedsFAQScreen: React.FC = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>
        SpeedyMeds - Frequently Asked Questions
      </Text>
      <FaqItem
        question="How do I request a prescription refill through the app?"
        answer="Navigate to the 'My Prescriptions' section, select the medication, and tap the 'Request Refill' button. Ensure your pharmacy details are up to date."
      />
      <FaqItem
        question="Can I track my medication delivery?"
        answer="Yes, once your refill is processed and shipped, you will receive a tracking number in the app under 'Order History'."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, padding: 10 },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  faqContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1, // Allow text to wrap if long
  },
  answerContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  answerText: {
    fontSize: 14,
    color: "#555",
  },
});

export default SpeedyMedsFAQScreen; // Exporting the screen component for example usage
```

In this example:

1.  We defined `useToggle`, a custom Hook that encapsulates the logic for managing and toggling a boolean state.
2.  The `FaqItem` component calls `useToggle()` to manage its expanded/collapsed state.
3.  This `useToggle` Hook can now be reused in any other SpeedyMeds component that needs simple boolean toggle functionality (e.g., for showing/hiding a modal, a detailed view, or controlling a switch that isn't tied to a form library).

### Other Potential Custom Hook Examples for SpeedyMeds

- **`useFormInput(initialValue)`**: Manages the state and `onChangeText` handler for a `TextInput`, potentially including basic validation logic.
- **`useKeyboardStatus()`**: Uses the `Keyboard` module's listeners to provide keyboard visibility status and height, useful for adjusting layouts when the keyboard appears.
- **`useScreenOrientation()`**: Uses the `Dimensions` API or `expo-screen-orientation` to provide the current screen orientation (portrait/landscape).
- **`useDebounce(value, delay)`**: Returns a debounced version of a value. Useful for delaying API calls (e.g., for search suggestions in a medication search bar) until the user stops typing for a specified `delay`.
- **`useFetchMedicationDetails(medicationId)`**: Encapsulates logic for fetching specific medication details from an API, managing loading and error states related to that fetch operation.

Custom Hooks are a fundamental pattern for building scalable and maintainable React and React Native applications by promoting logic reuse and separation of concerns.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** Custom Hooks can be thought of as creating utility classes or helper functions that manage a specific piece of stateful behavior or data fetching/processing logic, which you might then instantiate or call from your ViewControllers (iOS) or Activities/Fragments (Android). The key difference is Hooks integrate directly into React's composition and lifecycle model.
>
> **Key Takeaway:** Custom Hooks provide a structured way to extract and reuse stateful logic within the React paradigm, promoting better code organization than scattering similar logic across multiple native UI components.

> 🌐 **(Web Developers - React):**
>
> **Comparison:** Custom Hooks in React Native are identical in concept and implementation to custom Hooks in React for the web. If you've built custom Hooks for web projects (e.g., for form handling, API calls, animations), you'll feel right at home.
>
> **Key Takeaway:** The power and patterns of custom Hooks are fully transferable. You can leverage this to share complex UI-independent logic between your React web and React Native projects if structured carefully.

### Exercise

- **Exercise 9.3: Building a Custom Hook (`useTimer`)**

  - **Objective:** Create a custom Hook `useTimer` that encapsulates timer logic (start, stop, reset, and current time), suitable for features like a medication adherence reminder countdown in SpeedyMeds.
  - **Instructions:**
    1.  Define a custom Hook named `useTimer` that accepts `initialSeconds: number = 0` and an optional `isCountdown: boolean = false`.
    2.  Inside `useTimer`:
        - Use `useState` to manage `seconds` (initialized with `initialSeconds`).
        - Use `useState` to manage `isActive` (boolean, initially `false`).
        - Use `useRef` to store the interval ID (e.g., `intervalRef.current`).
    3.  Implement a `useEffect` Hook to handle the `setInterval` logic:
        - The effect should run when `isActive` changes (and potentially `isCountdown` or `initialSeconds` if reset behavior depends on them changing, though `reset` function is better for `initialSeconds`).
        - If `isActive` is `true`, set up an interval that decrements `seconds` every 1000ms if `isCountdown` is `true` and `seconds > 0`, or increments `seconds` if `isCountdown` is `false` (stopwatch mode).
        - If `isCountdown` is `true` and `seconds` reaches `0`, the timer should stop (set `isActive` to `false` and clear the interval).
        - The `useEffect` cleanup function MUST clear the interval (`clearInterval(intervalRef.current)`) to prevent memory leaks when the component unmounts or before the effect re-runs.
    4.  Implement `start`, `stop`, and `reset` functions within the hook:
        - `start()`: Sets `isActive` to `true` (and potentially resets `seconds` to `initialSeconds` if it's a fresh start for a countdown that had reached zero, depending on desired behavior).
        - `stop()`: Sets `isActive` to `false`.
        - `reset()`: Calls `stop()` and sets `seconds` back to `initialSeconds` (or the passed `initialSeconds` if the hook is designed to be re-configurable).
    5.  Wrap `start`, `stop`, and `reset` in `useCallback` to ensure they have stable references.
    6.  The `useTimer` hook should return an object: `{ seconds, isActive, start, stop, reset }`. Define an interface for this return type (e.g., `TimerHookResult`).
    7.  Create a `TimerDisplayComponent` that uses your `useTimer` hook. For example, instantiate it for a 60-second countdown: `const { seconds, isActive, start, stop, reset } = useTimer(60, true);`.
    8.  The component should render the `seconds` and `isActive` status.
    9.  Render "Start", "Stop", and "Reset" buttons that call the respective functions from the hook.
    10. Test thoroughly to ensure the timer starts, stops, resets correctly, and handles countdown completion. Also, verify that the interval is cleared if the component were to unmount (conceptually, as direct unmount testing in Snack is tricky without navigation).
  - **Tool:** [**(https://snack.expo.dev/)**](https://snack.expo.dev/)
  - **Conceptual Code for `useTimer.ts` (Guidance - implement your own version):**

    ```tsx
    import { useState, useEffect, useRef, useCallback } from "react";

    export interface TimerHookResult {
      seconds: number;
      isActive: boolean;
      start: () => void;
      stop: () => void;
      reset: () => void;
    }

    function useTimer(
      initialSeconds: number = 0,
      isCountdown: boolean = false
    ): TimerHookResult {
      const [seconds, setSeconds] = useState<number>(initialSeconds);
      const [isActive, setIsActive] = useState<boolean>(false);
      const intervalRef = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
        if (isActive) {
          intervalRef.current = setInterval(() => {
            if (isCountdown) {
              setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                  return prevSeconds - 1;
                } else {
                  setIsActive(false); // Stop timer
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  return 0;
                }
              });
            } else {
              // Stopwatch mode
              setSeconds((prevSeconds) => prevSeconds + 1);
            }
          }, 1000);
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        return () => {
          // Cleanup function
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }, [isActive, isCountdown]); // Effect dependencies

      const start = useCallback(
        () => {
          // Optional: if already at 0 in countdown, reset before starting
          // if (isCountdown && seconds === 0) setSeconds(initialSeconds);
          setIsActive(true);
        },
        [
          /* isCountdown, initialSeconds, seconds (if reset logic is here) */
        ]
      );

      const stop = useCallback(() => {
        setIsActive(false);
      }, []);

      const reset = useCallback(() => {
        setIsActive(false);
        setSeconds(initialSeconds);
      }, [initialSeconds]);

      return { seconds, isActive, start, stop, reset };
    }

    export default useTimer;
    ```

  - **Conceptual Code for `TimerDisplayComponent.tsx` (Guidance):**

    ```tsx
    import React from "react";
    import { View, Text, Button, StyleSheet } from "react-native";
    import useTimer from "./useTimer"; // Adjust path as needed

    const TimerDisplayComponent = () => {
      const { seconds, isActive, start, stop, reset } = useTimer(30, true); // 30-sec countdown

      return (
        <View style={styles.container}>
          <Text style={styles.timerText}>Time: {seconds}s</Text>
          <Text>Status: {isActive ? "Running" : "Stopped"}</Text>
          <View style={styles.buttonContainer}>
            {!isActive ? (
              <Button title="Start Countdown" onPress={start} />
            ) : (
              <Button title="Stop Countdown" onPress={stop} />
            )}
            <Button title="Reset Countdown" onPress={reset} />
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: { flex: 1, justifyContent: "center", alignItems: "center" },
      timerText: { fontSize: 30, marginBottom: 10 },
      buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-around",
        width: "90%",
      },
    });

    export default TimerDisplayComponent;
    ```
