## Section 3: Components (Functional Components Focus, Class Components Brief Mention)

In React, UIs are built by combining small, reusable pieces called **components**. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This section focuses on creating and using components, primarily **functional components**, which are the modern standard in React development.

### What are Components?

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen. In React Native, these elements ultimately map to native UI views.

There are two main types of components in React:

1.  **Functional Components:** Defined as JavaScript functions. They are simpler, easier to read, and with the introduction of Hooks (which we'll cover soon), they can do everything class components can do.
2.  **Class Components:** Defined using ES6 classes that extend `React.Component`. They were the original way to create stateful components and use lifecycle methods before Hooks.

This course, and modern React development, primarily uses **functional components**. We will briefly mention class components for completeness, but all examples and exercises will use functional components.

### Functional Components

A functional component is a JavaScript function that accepts a single "props" (short for properties) object argument with data and returns a React element. Since we are using TypeScript, we can also define the type for these props.

Here's a simple functional component for our SpeedyMeds app:

```tsx
import React from "react";
import { Text, View } from "react-native"; // Import core React Native components

// Define the props type (optional, but good practice with TypeScript)
interface WelcomeMessageProps {
  userName: string;
}

// Define the functional component
const WelcomeMessage: React.FC<WelcomeMessageProps> = (props) => {
  return (
    <View>
      <Text>Hello, {props.userName}! Welcome to SpeedyMeds.</Text>
    </View>
  );
};

// Example of how to use the component
const AppScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <WelcomeMessage userName="Dr. Smith" />
      <WelcomeMessage userName="Patient X" />
    </View>
  );
};

export default AppScreen; // Or export WelcomeMessage if it's in its own file
```

**Explanation:**

1.  **Import `React`:** While not always strictly necessary for JSX in modern setups, it's good practice.
2.  **Import React Native Components:** We import `<Text>` and `<View>` from `react-native` to structure our UI.
3.  **`WelcomeMessageProps` Interface:** This TypeScript interface defines the expected shape and types of the `props` object that the `WelcomeMessage` component will receive. Here, it expects a `userName` prop of type `string`.
4.  **Component Definition:** `const WelcomeMessage: React.FC<WelcomeMessageProps> = (props) => { ... }`
    - `WelcomeMessage` is the name of our component. Component names MUST start with a capital letter. This convention is important because JSX uses this capitalization to distinguish between user-defined components (e.g., `<WelcomeMessage />`) and built-in HTML/Native elements (e.g., `<view />` or `<text />` - though in RN these are also capitalized like `<View />`).
    - `React.FC<WelcomeMessageProps>` is a TypeScript type for functional components. `FC` stands for Functional Component. It provides type checking for props and the return type.
    - `props` is the argument to the function. It's an object containing all the properties passed to the component when it's used.
5.  **Return JSX:** The function returns a JSX expression describing the UI. Here, it displays a welcome message using the `userName` prop.
6.  **Using the Component:** In `AppScreen`, we use `<WelcomeMessage userName="Dr. Smith" />`. This creates an instance of our `WelcomeMessage` component and passes the string "Dr. Smith" as the `userName` prop.

**Key Rules for Components:**

- **Always start component names with a capital letter.** React treats components starting with lowercase letters as DOM tags (e.g., `<div />` vs. `<WelcomeMessage />`).
- **Components must return a single root JSX element.** If you need multiple elements, wrap them in a `<View>` or a React Fragment (`<>...</>`).
- **Props are read-only.** A component must never modify its own props. This is a core principle of React known as "props are immutable."

### File Organization

It's a common practice to define each React component in its own file. For example, `WelcomeMessage.tsx`.

```tsx
// In a file named WelcomeMessage.tsx
import React from "react";
import { Text, View } from "react-native";

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  // Props can be destructured directly in the function parameters
  return (
    <View>
      <Text>Hello, {userName}! Welcome to SpeedyMeds.</Text>
    </View>
  );
};

export default WelcomeMessage;
```

Then, you can import and use it in another file:

```tsx
// In a file like App.tsx or a screen component
import React from "react";
import { View } from "react-native";
import WelcomeMessage from "./WelcomeMessage"; // Adjust path as needed

const PatientDashboard = () => {
  return (
    <View style={{ padding: 20 }}>
      <WelcomeMessage userName="Alice Wonderland" />
      {/* ... other dashboard elements ... */}
    </View>
  );
};

export default PatientDashboard;
```

### Class Components (Brief Mention)

Before Hooks, class components were the only way to have state and lifecycle methods in React. Here's a quick look at how a similar `WelcomeMessage` might look as a class component for context:

```tsx
import React, { Component } from "react";
import { Text, View } from "react-native";

interface WelcomeMessageProps {
  userName: string;
}

class WelcomeMessageClass extends Component<WelcomeMessageProps> {
  render() {
    return (
      <View>
        <Text>Hello, {this.props.userName}! Welcome from Class Component.</Text>
      </View>
    );
  }
}

export default WelcomeMessageClass;
```

Key differences:

- It extends `React.Component` (or `Component` if destructured from `React`).
- Props are accessed via `this.props`.
- It must have a `render()` method that returns JSX.

> 💡 **TIP:** While you might encounter class components in older React Native codebases or some third-party libraries, new development should favor functional components with Hooks for their conciseness and ease of use. This course will focus exclusively on functional components.

Components are the fundamental building blocks of React applications. By mastering how to create and compose them, you gain the power to build complex and interactive user interfaces for your SpeedyMeds app and beyond.

### Exercise 7.1: Creating Functional Components

Now it's time to practice creating your own functional components.

**Objective:** Create a simple `MedicationCard` component that displays the name and dosage of a medication.

**Instructions:**

1.  Open the CodeSandbox link provided.
2.  Create a new functional component named `MedicationCard`.
3.  This component should accept two props: `name` (string) and `dosage` (string, e.g., "250mg"). Define a TypeScript interface for these props.
4.  The component should render a `<View>` containing two `<Text>` elements: one for the medication name and one for the dosage.
5.  In the main `App` component (or a similar entry point in the sandbox), use your `MedicationCard` component at least twice with different medication details.

**(https://codesandbox.io)** (A pre-configured CodeSandbox with React and TypeScript should be set up for this exercise. For now, this is a placeholder link.)

> 📚 **Official Documentation:**
>
> - [React Docs - Your First Component](https://react.dev/learn/your-first-component)
> - [React Docs - Components and Props](https://react.dev/learn/passing-props-to-a-component)
> - [React Native Docs - Components](https://reactnative.dev/docs/components-and-apis)
