## Section 3: Components (Functional Components Focus, Class Components Brief Mention)

In this section, we delve deeper into React components, the fundamental building blocks of React applications. We will focus primarily on functional components, which are the modern standard, and briefly touch upon class components for context.

### What are Components?

As introduced earlier, components are independent, reusable pieces of code that describe a part of the user interface. They can be as simple as a button or as complex as an entire screen. Components can contain other components, allowing you to build a tree-like structure for your UI.

In React (and therefore React Native), there are two main types of components:

1.  **Functional Components:** These are JavaScript functions that accept an optional `props` object and return JSX to describe the UI.
2.  **Class Components:** These are ES6 classes that extend `React.Component`. They have a `render()` method that returns JSX, and can also use lifecycle methods and state (though Hooks now provide these for functional components).

For this course, and in modern React development, **we will primarily use functional components with Hooks.**

### Functional Components

Functional components are the simpler way to define components. They are just JavaScript functions.

Here's a basic functional component in TypeScript:

```tsx
import React from "react";
import { Text, View } from "react-native"; // Import React Native components

// Define a type for the component's props (optional, but good practice)
interface GreetingProps {
  name: string;
}

const Greeting = (props: GreetingProps) => {
  return (
    <View>
      <Text>Hello, {props.name} from SpeedyMeds!</Text>
    </View>
  );
};

// To use this component elsewhere:
// <Greeting name="Dr. Smith" />

export default Greeting; // Exporting for use in other files
```

**Key characteristics of functional components:**

- They are plain JavaScript functions.
- They accept `props` (properties) as an argument, which is an object containing data passed from a parent component.
- They return JSX that describes the UI structure.
- With Hooks (like `useState` and `useEffect`), they can have state and lifecycle features, making them as powerful as class components.
- They are generally more concise and easier to read and test.

**Example: A Simple MedicationDisplay Component**

Let's create a simple component for our SpeedyMeds theme to display a medication name.

```tsx
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface MedicationDisplayProps {
  medicationName: string;
  dosage: string;
}

const MedicationDisplay: React.FC<MedicationDisplayProps> = ({
  medicationName,
  dosage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Medication: {medicationName}</Text>
      <Text style={styles.dosageText}>Dosage: {dosage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
    borderRadius: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dosageText: {
    fontSize: 14,
    color: "#333",
  },
});

export default MedicationDisplay;

// How to use it:
// import MedicationDisplay from './MedicationDisplay';
// ...
// <MedicationDisplay medicationName="Amoxicillin" dosage="250mg" />
```

This example defines a `MedicationDisplay` component that accepts `medicationName` and `dosage` as props and displays them. It also includes some basic styling using `StyleSheet` (which we'll cover in detail later). Notice the use of `React.FC` (Functional Component) as a type for the component, which is a common pattern in TypeScript for React components that might include `children` props by default (though we aren't using `children` here explicitly).

### Class Components (Brief Mention)

Before Hooks were introduced in React 16.8, class components were the only way to have state and lifecycle methods within a component.

Here's what a similar `Greeting` component might look like as a class component:

```tsx
import React, { Component } from "react";
import { Text, View } from "react-native";

interface GreetingProps {
  name: string;
}

class GreetingClass extends Component<GreetingProps> {
  render() {
    return (
      <View>
        <Text>Hello, {this.props.name} from SpeedyMeds! (Class Component)</Text>
      </View>
    );
  }
}

export default GreetingClass;
```

While you might encounter class components in older codebases or some third-party libraries, **new development in React and React Native strongly favors functional components with Hooks.** Hooks provide a more direct and composable way to manage state and side effects.

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** The distinction and preference for functional components with Hooks over class components are the same in React Native as in React for web. If you've been working with modern React, this will be very familiar.
>
> **Key Takeaway:** Continue using functional components and Hooks. Class components are mainly for understanding legacy code.

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** Angular components are class-based (using TypeScript classes and decorators like `@Component`). React's functional components are a more lightweight approach. Think of them as functions that render UI based on input (props) and internal state (managed by Hooks).
>
> **Key Takeaway:** Embrace the functional programming paradigm for components in React. Logic that you might encapsulate in class methods in Angular will often be handled by Hooks or helper functions within or outside your functional components.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** In native development, UI elements or controllers often have a class-based structure (e.g., `UIViewController` in iOS, `Activity` or `Fragment` in Android). React's functional components might seem simpler. They don't inherit from a large base class by default; instead, they gain capabilities through composition and Hooks.
>
> **Key Takeaway:** Functional components are the primary way to define UI elements. Their "lifecycle" and state are managed using specific Hooks like `useEffect` and `useState`, which we will cover soon.

Understanding how to create and use components is central to React development. In the next sections, we'll explore how to pass data into components using props and how components can manage their own internal data using state.

> 📚 **Official Documentation:**
>
> - [React Docs: Your First Component](https://react.dev/learn/your-first-component)
> - [React Docs: Components and Props](https://react.dev/learn/passing-props-to-a-component) (Preview, as Props are covered next)
> - [React Native Docs: Core Components and Native Components](https://reactnative.dev/docs/intro-react-native-components) (Focuses more on _what_ components are available, but good context)

---

### Exercise 7.1: Creating Functional Components

Now it's time to practice creating your own functional components.

**Objective:** Create a simple `PatientInfoCard` functional component that accepts and displays a patient's name and age. Then, use this component to display information for two different patients.

**Instructions:**

1.  Define a functional component named `PatientInfoCard`.
2.  It should accept `name` (string) and `age` (number) as props.
3.  The component should render a `<View>` containing two `<Text>` elements: one for the patient's name and one for their age.
4.  Style the card and text elements minimally (e.g., a border for the card, different font sizes for name and age).
5.  In your main `App` component (or a similar entry point in CodeSandbox), render two instances of `PatientInfoCard` with different patient data.

**Tool:** CodeSandbox

**(https://codesandbox.io)** (You will need to create a new React TypeScript sandbox or use a provided template if available for the course.)

_A solution will be provided by your instructor or in the course materials._
