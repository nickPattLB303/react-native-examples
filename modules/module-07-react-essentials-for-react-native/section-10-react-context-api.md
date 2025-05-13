## Section 10: React Context API (Introduction for State Management)

As your React Native application grows, you might find yourself passing props through many levels of components, even if some intermediate components don't directly use those props. This is known as **prop drilling**. While manageable for small applications, it can become cumbersome and make code harder to maintain in larger ones.

The React **Context API** provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree. It's designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.

### Why Use Context?

Consider a scenario in our SpeedyMeds app where many components need access to the current user's profile information (e.g., name, patient ID, preferred language for UI text) or the app's current theme (e.g., light or dark mode).

Without Context, you might have to pass the `userProfile` or `theme` prop down from a top-level component (like `App.tsx`) through several intermediate components that don't care about this data, just to reach a deeply nested component that actually needs it.

Context API helps solve this by providing:

- A way to make data available to a tree of components.
- A way for any component in that tree to consume this data without explicit prop passing.

> 💡 **TIP:** Context is primarily used when some data needs to be accessible by _many_ components at different nesting levels. If you only need to pass data down one or two levels, prop drilling is often simpler and more explicit.

### Core Concepts of Context API

1.  **`React.createContext()`**

    - This function creates a Context object. When React renders a component that subscribes to this Context object, it will read the current context value from the closest matching `Provider` up in the tree.
    - It accepts an optional `defaultValue` argument. This default value is used when a component consuming the Context does not have a matching `Provider` above it in the tree.

    ```typescript
    // themeContext.ts
    import React from "react";

    export type ThemeMode = "light" | "dark";

    export interface AppTheme {
      mode: ThemeMode;
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
    }

    export const lightTheme: AppTheme = {
      mode: "light",
      primaryColor: "#007AFF", // Blue
      secondaryColor: "#FF9500", // Orange
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
    };

    export const darkTheme: AppTheme = {
      mode: "dark",
      primaryColor: "#0A84FF", // Lighter Blue for dark mode
      secondaryColor: "#FF9F0A", // Lighter Orange
      backgroundColor: "#1C1C1E", // Dark Gray
      textColor: "#FFFFFF",
    };

    // Context for theme data and a function to toggle it
    export interface ThemeContextType {
      theme: AppTheme;
      toggleTheme: () => void;
    }

    // Create the context with a default value
    // The default value here is mostly for type inference and fallback,
    // in a real app, the Provider will supply the actual value.
    export const ThemeContext = React.createContext<ThemeContextType>({
      theme: lightTheme,
      toggleTheme: () => console.warn("toggleTheme function not yet provided"),
    });
    ```

2.  **`<Context.Provider>`**

    - Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.
    - The Provider component accepts a `value` prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers.
    - Providers can be nested to override values deeper within the tree.
    - All consumers that are descendants of a Provider will re-render whenever the Provider's `value` prop changes.

    ```tsx
    // App.tsx (or a top-level component)
    import React, { useState, useMemo } from "react";
    import { View, Text, StyleSheet } from "react-native";
    import {
      ThemeContext,
      lightTheme,
      darkTheme,
      ThemeContextType,
      AppTheme,
      ThemeMode,
    } from "./themeContext"; // Assuming themeContext.ts is in the same folder
    import ThemedComponent from "./ThemedComponent"; // A component that will consume the context
    import ThemeToggleButton from "./ThemeToggleButton";

    const App: React.FC = () => {
      const [currentMode, setCurrentMode] = useState<ThemeMode>("light");

      // Function to toggle the theme
      const toggleTheme = () => {
        setCurrentMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      };

      // Determine the current theme object based on currentMode
      const activeTheme = currentMode === "light" ? lightTheme : darkTheme;

      // useMemo is used here to ensure the contextValue object is not recreated on every render
      // unless activeTheme or toggleTheme changes. This can prevent unnecessary re-renders of consumers.
      const themeContextValue: ThemeContextType = useMemo(
        () => ({
          theme: activeTheme,
          toggleTheme: toggleTheme,
        }),
        [activeTheme]
      ); // toggleTheme is stable due to useState/useCallback if it were more complex

      return (
        // Wrap the part of the app that needs access to the theme with the Provider
        <ThemeContext.Provider value={themeContextValue}>
          {/* ThemedComponent and its children can now access the theme */}
          <View
            style={[
              styles.appContainer,
              { backgroundColor: activeTheme.backgroundColor },
            ]}
          >
            <Text style={[styles.title, { color: activeTheme.textColor }]}>
              SpeedyMeds Theming
            </Text>
            <ThemedComponent />
            <ThemeToggleButton />
          </View>
        </ThemeContext.Provider>
      );
    };

    const styles = StyleSheet.create({
      appContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
    });

    export default App;
    ```

3.  **`useContext()` Hook**

    - The `useContext` Hook is the modern way for functional components to consume a context value.
    - It accepts a context object (the value returned from `React.createContext()`) and returns the current context value for that context.
    - The current context value is determined by the `value` prop of the nearest `<MyContext.Provider>` above the calling component in the tree.
    - When the nearest `<MyContext.Provider>` above the component updates, this Hook will trigger a re-render with the latest context `value`.

    ```tsx
    // ThemedComponent.tsx
    import React, { useContext } from "react";
    import { View, Text, StyleSheet } from "react-native";
    import { ThemeContext } from "./themeContext";

    const ThemedComponent: React.FC = () => {
      // Consume the ThemeContext
      const { theme } = useContext(ThemeContext);

      return (
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.secondaryColor,
              borderColor: theme.primaryColor,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.textColor }]}>
            This component uses the theme from Context!
          </Text>
          <Text style={[styles.text, { color: theme.textColor }]}>
            Current mode: {theme.mode}
          </Text>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        padding: 20,
        borderRadius: 8,
        borderWidth: 2,
        alignItems: "center",
        margin: 10,
      },
      text: {
        fontSize: 16,
        textAlign: "center",
      },
    });

    export default ThemedComponent;
    ```

    ```tsx
    // ThemeToggleButton.tsx
    import React, { useContext } from "react";
    import { Button } from "react-native"; // Using react-native Button for simplicity
    import { ThemeContext } from "./themeContext";

    const ThemeToggleButton: React.FC = () => {
      const { theme, toggleTheme } = useContext(ThemeContext);

      return (
        <Button
          title={`Switch to ${theme.mode === "light" ? "Dark" : "Light"} Mode`}
          onPress={toggleTheme}
          color={theme.primaryColor}
        />
      );
    };

    export default ThemeToggleButton;
    ```

### Context API Flow Diagram

```mermaid
graph TD
    A[App Component: Manages State (e.g., currentTheme)] --> B(Creates Context Value: { theme, toggleTheme });
    B --> C{ThemeContext.Provider value=contextValue};
    C ==> D[ThemedComponent Tree];
    C ==> E[ThemeToggleButton Tree];

    subgraph D
        D1[Any Nested Component]
    end

    subgraph E
        E1[Button Component]
    end

    D1 -- Uses useContext(ThemeContext) --> X((Receives theme object));
    E1 -- Uses useContext(ThemeContext) --> Y((Receives theme & toggleTheme));

    Y -- Calls toggleTheme() --> A;
```

**Diagram Explanation:**

1.  **App Component (`A`):** A top-level component (or any suitable parent) manages the state that needs to be shared (e.g., the `currentTheme` and the `toggleTheme` function).
2.  **Creates Context Value (`B`):** Based on its state, the App component prepares the `value` object that will be supplied to the Provider. This object contains the shared data and any functions to update it.
3.  **`<ThemeContext.Provider>` (`C`):** The App component wraps its children (or a part of its component tree) with `ThemeContext.Provider`, passing the `contextValue` to the `value` prop.
4.  **Component Trees (`D`, `E`):** Any component within the subtrees wrapped by the Provider (`ThemedComponent Tree`, `ThemeToggleButton Tree`) can now access the context.
5.  **`useContext(ThemeContext)` (`X`, `Y`):** Descendant components like `ThemedComponent` or `ThemeToggleButton` use the `useContext(ThemeContext)` Hook to subscribe to the context. They receive the current `value` (e.g., the `theme` object or the `toggleTheme` function).
6.  **Updates Flow:** If `ThemeToggleButton` calls `toggleTheme()`, it updates the state in the `App` component (`A`). This causes `App` to re-render, potentially creating a new `contextValue`. The `ThemeContext.Provider` receives this new value, and all consuming components (`ThemedComponent`, `ThemeToggleButton`) re-render with the updated context data.

### When to Use Context

- **Global Data:** For data that many components need, like user preferences, UI theme, authentication status, or current language.
- **Avoiding Prop Drilling:** When you find yourself passing the same props through many levels of intermediate components that don't use them.

### Context vs. State Management Libraries (like Zustand or Redux)

Context API is suitable for low-frequency updates of simple global state. For more complex state management scenarios, especially those involving frequent updates, complex state logic, or a need for more advanced features (like middleware, devtools integration for time-travel debugging), dedicated state management libraries like Zustand (which we will cover later) or Redux are often more appropriate.

Context can lead to performance issues if the `value` prop of the Provider changes frequently, as it causes all consuming components to re-render, even if they only use a small part of the context value that didn't change. Libraries like Zustand often offer more optimized ways to handle selective updates.

> ⚛️ **(Web Developers - React):**
>
> **Comparison:** The Context API (`React.createContext`, `<Provider>`, `useContext`) works identically in React for the web and React Native.
>
> **Key Takeaway:** Your understanding of React Context from web development is directly applicable.

Context API provides a clean way to manage and share global-like data within your React Native application, reducing prop drilling and making your component architecture more organized for certain types of state.

### Exercise 7.6: Basic Context Usage

**Objective:** Create a simple application that uses Context to manage a user's preferred language and display localized greetings.

**Instructions:**

1.  Open a CodeSandbox.
2.  **Create a Context:**
    - Define a `LanguageContext` using `React.createContext()`.
    - The context value should include `language` (string, e.g., 'en', 'es') and a function `setLanguage` to change it.
    - Provide a default value (e.g., `{ language: 'en', setLanguage: () => {} }`).
3.  **Create a Provider Component:**
    - Create a component (e.g., `LanguageProvider`) that uses `useState` to manage the current `language`.
    - This component should render `LanguageContext.Provider` and pass the current `language` and the `setLanguage` function as its `value`.
4.  **Create Consumer Components:**
    - Create a `Greeting` component that consumes the `LanguageContext` using `useContext()` and displays a greeting in the selected language (e.g., "Hello!" for 'en', "Hola!" for 'es').
    - Create a `LanguageSelector` component that also consumes the context. It should render two buttons (or `<Pressable>`s) to switch the language between 'en' and 'es' by calling the `setLanguage` function from the context.
5.  **Assemble the App:**
    - In your main `App` component, wrap the `Greeting` and `LanguageSelector` components with your `LanguageProvider`.
    - Test that changing the language via `LanguageSelector` updates the greeting in the `Greeting` component.

**(https://codesandbox.io)** (A pre-configured CodeSandbox with React and TypeScript should be set up for this exercise. For now, this is a placeholder link.)

> 📚 **Official Documentation:**
>
> - [React Docs - Context API](https://react.dev/learn/passing-data-deeply-with-context)
> - [React Docs - `useContext` Hook](https://react.dev/reference/react/useContext)
> - [React Docs - `React.createContext`](https://react.dev/reference/react/createContext)
> - [React Docs - `<Context.Provider>`](https://react.dev/reference/react/ artistique/Provider)
