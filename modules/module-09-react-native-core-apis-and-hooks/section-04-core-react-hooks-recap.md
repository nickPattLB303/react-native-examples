## Section 4: Core React Hooks Recap

Before diving into more specialized React Native APIs and Hooks, it's essential to have a solid understanding of the core React Hooks: `useState`, `useEffect`, and `useContext`. These Hooks are the bedrock of managing state, side effects, and global data in modern React applications, including those built with React Native. This section serves as a brief recap; for a comprehensive introduction, please refer to Module 7: React Essentials for React Native.

### Conceptual Content

**Why Recap Core Hooks?**

In React Native development, just as in React for the web, these core Hooks are used extensively:

- **`useState`:** For managing local component state. This could be anything from tracking user input in a medication search bar to the visibility of a custom modal for patient details in the SpeedyMeds app.
- **`useEffect`:** For handling side effects. Common use cases in React Native include fetching data (e.g., a patient's prescription list), setting up subscriptions (like to `Dimensions` changes), or manually interacting with native modules when a component mounts or updates.
- **`useContext`:** For accessing global state or shared data without prop drilling. This is invaluable for themes (dark/light mode for SpeedyMeds), user authentication status, or perhaps a shared configuration across different parts of the application.

Understanding their behavior, dependencies, and cleanup mechanisms is crucial for building robust and performant React Native applications.

> [!TIP]
> If you are already very comfortable with `useState`, `useEffect`, and `useContext` from React web development, you can skim this section. However, pay attention to any examples or notes that highlight their application specifically within a React Native context, such as interaction with native APIs or UI elements.

### Referential Content

Here's a quick reminder of each Hook's purpose and basic syntax:

- **`useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]`**

  - **Purpose:** Adds state to functional components.
  - **Returns:** A stateful value and a function to update it.
  - **Example:** `const [medicationName, setMedicationName] = useState('');`

- **`useEffect(didUpdate: () => (() => void) | void, dependencies?: DependencyList)`**

  - **Purpose:** Performs side effects after rendering.
  - **`didUpdate` function:** Can optionally return a cleanup function.
  - **`dependencies` array (optional):** Controls when the effect re-runs. An empty array `[]` means it runs once after the initial render and cleans up on unmount. No array means it runs after every render.
  - **Example:** `useEffect(() => { console.log('Component mounted'); return () => console.log('Component unmounted'); }, []);`

- **`useContext<T>(context: Context<T>): T`**
  - **Purpose:** Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context.
  - **Example:** `const theme = useContext(ThemeContext);`

> 📚 **Official Documentation:**
>
> - [React Docs: Using the State Hook](https://react.dev/reference/react/useState)
> - [React Docs: Using the Effect Hook](https://react.dev/reference/react/useEffect)
> - [React Docs: `useContext`](https://react.dev/reference/react/useContext)
> - [Module 7: React Essentials for React Native](../module-07-react-essentials-for-react-native/section-00-introduction.md) (for in-depth explanations and initial examples)

### Procedural Content (Illustrative Recap Examples)

Let's briefly see these Hooks in a simplified SpeedyMeds context.

**1. `useState` for Managing Patient Search Input**

```tsx
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const PatientSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a patient..."
        value={searchTerm}
        onChangeText={setSearchTerm} // Directly updates the state
      />
      <Text style={styles.searchText}>Searching for: {searchTerm}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  searchText: { fontSize: 14 },
});

export default PatientSearch;
```

This example uses `useState` to manage the `searchTerm` for a patient search input field. The `TextInput` updates the state on every keystroke.

**2. `useEffect` for Logging a Screen View**

Imagine you want to log when a specific screen, like `PrescriptionDetailsScreen`, is viewed.

```tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface PrescriptionDetailsScreenProps {
  prescriptionId: string;
}

const PrescriptionDetailsScreen: React.FC<PrescriptionDetailsScreenProps> = ({
  prescriptionId,
}) => {
  useEffect(() => {
    // In a real app, this could be an analytics call
    console.log(
      `SpeedyMeds: Viewing details for prescription ID: ${prescriptionId}`
    );

    // No cleanup needed for this simple log
  }, [prescriptionId]); // Re-run if prescriptionId changes

  return (
    <View style={styles.container}>
      <Text>Details for Prescription: {prescriptionId}</Text>
      {/* ... more details ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
});

export default PrescriptionDetailsScreen;
```

Here, `useEffect` logs a message when the component mounts or when `prescriptionId` changes. The dependency array `[prescriptionId]` ensures the effect re-runs if the viewed prescription changes.

**3. `useContext` for Accessing a Theme**

Assuming a `ThemeContext` is set up higher in the component tree for SpeedyMeds app styling.

```tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// Assume ThemeContext is defined elsewhere and provides: e.g., { colors: { text: 'black', background: 'white' } }
interface Theme {
  colors: { text: string; background: string; primary: string };
  spacing: { unit: number };
}
const defaultTheme: Theme = {
  colors: { text: "#333", background: "#FFF", primary: "#007AFF" },
  spacing: { unit: 8 },
};
export const ThemeContext = React.createContext<Theme>(defaultTheme);

const ThemedGreeting: React.FC = () => {
  const theme = useContext(ThemeContext); // Access the current theme

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.greetingText, { color: theme.colors.text }]}>
        Welcome to SpeedyMeds!
      </Text>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: (12 * theme.spacing.unit) / 8,
        }}
      >
        Your health, managed efficiently.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, // Will use theme.spacing.unit * 2.5 in a real themed app
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
  greetingText: {
    fontSize: 20, // Will use theme.typography.h1FontSize in a real themed app
    fontWeight: "bold",
  },
});

export default ThemedGreeting;
```

This component uses `useContext` to access `theme` properties (like `colors.background` and `colors.text`) to style itself, making it adaptable to different themes provided by `ThemeContext.Provider` higher up.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** `useState` is somewhat analogous to managing instance variables or properties that affect a View's rendering. `useEffect` combines aspects of lifecycle methods like `viewDidLoad`/`viewDidAppear` (iOS) or `onCreate`/`onResume` (Android) for setup, and `viewWillDisappear`/`onPause` for cleanup. `useContext` can be compared to dependency injection or accessing singleton services that provide shared data.
>
> **Key Takeaway:** React Hooks offer a more declarative and composable way to manage state and lifecycle logic within functional components, which can be a shift from the more imperative or class-based approaches in native development.

> 🌐 **(Web Developers - Angular specific):**
>
> **Comparison:** Angular developers can relate `useState` to component class properties that are part of change detection. `useEffect` is similar to lifecycle hooks like `ngOnInit`, `ngAfterViewInit`, and `ngOnDestroy`, particularly when dealing with subscriptions or direct DOM manipulations (though direct DOM manipulation is less common in React Native). `useContext` shares similarities with using Angular Services injected into components to share data or state across different parts of the application.
>
> **Key Takeaway:** While the syntax and paradigms differ, the core challenges of state management, side effect handling, and data sharing are addressed by these Hooks in React, just as services and lifecycle hooks address them in Angular.

Mastering these core Hooks is foundational. The subsequent sections in this module will build upon this knowledge by introducing more specific Hooks and APIs pertinent to React Native development.
