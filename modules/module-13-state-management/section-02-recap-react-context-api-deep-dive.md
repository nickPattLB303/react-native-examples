## Section 2: Recap: React Context API Deep Dive

In the previous section, we discussed the limitations of `useState` and prop drilling for managing state that needs to be shared across many components in your application. Prop drilling can make your code verbose and hard to maintain. React provides a built-in solution to this problem: the **Context API**.

This section revisits the React Context API, which you were briefly introduced to in Module 7. We'll take a deeper look at how it works, its core components (`Provider`, `Consumer`, and the `useContext` Hook), and how it can help us manage global state more effectively in our SpeedyMeds application.

### What is the React Context API?

The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme preferences (like light/dark mode), or preferred language.

Think of it as a global data store for a specific part of your component tree. Any component within that part of the tree can access this data directly, no matter how deeply nested it is.

> [!NOTE]
> While Context is powerful for avoiding prop drilling, it's not a replacement for all state management. For very complex state logic or high-frequency updates, other libraries (which we'll cover later in this module) might be more suitable due to performance considerations.

### Core Concepts of the Context API

There are three main parts to understanding and using the Context API:

1.  **`React.createContext()`**: This function creates a Context object. When React renders a component that subscribes to this Context object, it will read the current context value from the closest matching `Provider` above it in the tree.
    It accepts an optional `defaultValue` argument. This default value is used only when a component does not have a matching `Provider` above it in the tree. This can be useful for testing components in isolation without wrapping them.

2.  **`Context.Provider`**: Every Context object comes with a Provider component. This component allows consuming components to subscribe to context changes. The `Provider` component accepts a `value` prop to be passed to consuming components that are descendants of this `Provider`. One `Provider` can be connected to many consumers. Providers can be nested to override values deeper within the tree.
    All consumers that are descendants of a `Provider` will re-render whenever the `Provider`'s `value` prop changes.

3.  **Consuming the Context**: There are two ways to consume a context value:
    - **`Context.Consumer`**: (Primarily for class components or older functional components) This component requires a function as a child. The function receives the current context value and returns a React node. This approach is less common with the advent of Hooks.
    - **`useContext` Hook**: (The modern and preferred way in functional components) This Hook accepts a context object (the result of `React.createContext`) and returns the current context value for that context. The `useContext` Hook makes consuming context cleaner and more straightforward within functional components.

### Implementing Context API: SpeedyMeds Theme Example

Let's create a simple example for our SpeedyMeds app to manage theme preferences (e.g., switching between light and dark mode). This is a classic use case for Context API because the theme is often needed by many components throughout the application.

First, we define the types and create our context:

```tsx
// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { StatusBar } from "expo-status-bar";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    cardBackground: string;
  };
}

const lightColors = {
  background: "#FFFFFF",
  text: "#121212",
  primary: "#007AFF", // iOS Blue
  cardBackground: "#F0F0F0",
};

const darkColors = {
  background: "#121212",
  text: "#FFFFFF",
  primary: "#0A84FF", // iOS Blue for dark mode
  cardBackground: "#1E1E1E",
};

// Create the context with a default value
// The default value here is more for type safety and direct import if not using a provider
// but in a real app, the provider will always supply the actual value.
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => console.warn("ThemeProvider not found"),
  colors: lightColors,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

**Explanation of `ThemeContext.tsx`:**

1.  **Types and Defaults**: We define `ThemeMode` and `ThemeContextType` to ensure type safety. We also define `lightColors` and `darkColors` objects.
2.  **`createContext`**: `ThemeContext` is created. We provide a default value that includes a `toggleTheme` function which logs a warning. This is helpful for cases where a component tries to use the context without a `ThemeProvider` ancestor, though our `useTheme` hook also provides a more explicit error.
3.  **`ThemeProvider`**: This component is crucial. It manages the actual theme state (`light` or `dark`) using `useState`. It provides the `theme`, `toggleTheme` function, and the appropriate `colors` object via the `ThemeContext.Provider`'s `value` prop.
4.  **`useTheme` Hook**: This custom Hook simplifies consuming the context. It calls `useContext(ThemeContext)` and also includes a check to ensure it's used within a `ThemeProvider`.
5.  **StatusBar**: We also update the `StatusBar` style based on the current theme for a more integrated look and feel.

Now, let's wrap our root application component with `ThemeProvider`:

```tsx
// App.tsx (or your main app file)
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext"; // Adjust path as needed
import PatientDashboard from "./src/components/PatientDashboard"; // Example component

const AppContent: React.FC = () => {
  const { colors } = useTheme(); // Consume theme colors

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Your app components go here */}
      <PatientDashboard />
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
```

And finally, how a deeply nested component might consume this context:

```tsx
// src/components/PatientDashboard.tsx (Example component)
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext"; // Adjust path

const PatientDashboard: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View
      style={[
        styles.dashboardContainer,
        { backgroundColor: colors.cardBackground },
      ]}
    >
      <Text style={[styles.dashboardText, { color: colors.text }]}>
        Current Theme: {theme}
      </Text>
      <Text style={[styles.infoText, { color: colors.text }]}>
        Welcome to your SpeedyMeds Dashboard!
      </Text>
      <Button
        title="Toggle Theme"
        onPress={toggleTheme}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    padding: 20,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 20,
  },
});

export default PatientDashboard;
```

**Explanation of Usage:**

1.  **`App.tsx`**: The entire application (or relevant part) is wrapped with `<ThemeProvider>`. This makes the theme context available to all descendant components.
2.  **`AppContent.tsx`**: This component, even if it's the direct child, can use `useTheme()` to access `colors` and apply them. We use `AppContent` to ensure `useTheme` is called within the `ThemeProvider`.
3.  **`PatientDashboard.tsx`**: This component, potentially nested deep within the app, can directly access `theme`, `toggleTheme`, and `colors` using the `useTheme` custom Hook without any props being passed down through intermediate components. It can display the current theme, use theme-specific colors, and trigger a theme change.

This `ThemeContext` example illustrates a common and effective use of the Context API. It centralizes theme logic and makes theme-related data and functions easily accessible throughout the application, significantly reducing the need for prop drilling. The code is cleaner, more maintainable, and components like `PatientDashboard` only subscribe to the data they truly need from the context.

> 🍏 **(iOS Developers):**
>
> **Comparison:** The Context API's `Provider` concept is somewhat analogous to how you might use an `EnvironmentObject` in SwiftUI. You provide a value at a higher level in the view hierarchy, and descendant views can subscribe to it. The custom `useTheme` hook is a common pattern in React to make context consumption cleaner, similar to how you might define helper methods or computed properties in Swift.
>
> **Key Takeaway:** Context API offers a reactive way to share global data, which updates consuming components when the `value` prop of the `Provider` changes.

> 🤖 **(Android Developers):**
>
> **Comparison:** If you've used Dagger or Hilt for dependency injection to provide application-wide singletons (like a `ThemeManager`), Context API serves a similar purpose for React component trees. The `Provider` makes the "dependency" (the context value) available, and `useContext` "injects" it into components. The reactive nature means components update automatically when the context value changes, similar to observing `LiveData` or `Flow`.
>
> **Key Takeaway:** Context provides a declarative way to propagate data down the component tree without manual DI boilerplate in every component.

> 📚 **Official Documentation:**
>
> - [React Docs: Context API](https://react.dev/learn/passing-data-deeply-with-context)
> - [React Docs: `createContext`](https://react.dev/reference/react/createContext)
> - [React Docs: `useContext` Hook](https://react.dev/reference/react/useContext)

### Exercise 13.1: Managing Global Theme with Context

Now it's time to put this into practice. In this exercise, you'll implement a similar theme management system for a simplified SpeedyMeds settings screen.

- **Objective:** Create a `ThemeContext` to manage and toggle between light and dark themes.
- **Task:** You will build a `SettingsScreen` component where a user can tap a button to switch the application's theme. Apply the theme colors to text and background elements.

**(https://snack.expo.dev/YOUR_SNACK_ID_HERE)**

In the next section, we will discuss some important performance considerations when using the Context API, especially in larger applications.
