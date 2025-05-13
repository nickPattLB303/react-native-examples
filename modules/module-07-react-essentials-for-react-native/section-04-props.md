## Section 4: Props (Passing Data Down)

Welcome to Section 4! Here, you'll learn about one of the most fundamental concepts in React: **props**. Props are how components talk to each other, allowing you to build dynamic and reusable user interfaces.

### Conceptual Content: Understanding Props

Props, short for "properties," are a core mechanism in React for passing data from a parent component to a child component. Think of them like arguments you pass to a JavaScript function. They enable you to customize and configure child components, making your UI dynamic and data-driven.

**Unidirectional Data Flow**

A key principle in React is unidirectional data flow. This means that data (via props) flows in one direction: from parent components down to their children. This top-down data flow makes it easier to understand how data changes in your application and helps in debugging. The parent component owns and manages the data, and the child component receives it as props.

**Props are Read-Only**

A critical characteristic of props is that they are **read-only**. A child component should never attempt to modify the props it receives from its parent. This immutability ensures that the data flow remains predictable and that components don't inadvertently cause side effects in their parents or siblings. If a component needs to manage data that changes over time, it should use its own internal state (which we'll cover in Section 5).

**The `children` Prop**

React provides a special prop called `children`. This prop is used to pass content directly between the opening and closing tags of a component. For example, if you have a `Card` component, you might use it like this: `<Card>This is some content inside the card</Card>`. The text "This is some content inside the card" would be available inside the `Card` component as `props.children`.

> 🍏 **(iOS Developers):**
>
> **Comparison:** Passing props in React is conceptually similar to how you might pass data to a `UIViewController` during its initialization (e.g., through a custom `init` method or by setting properties after instantiation) or how you pass parameters to a SwiftUI `View` struct during its creation.
>
> **Key Takeaway:** In React, props are the primary way to configure a component from its parent, much like setting up a view or controller with its necessary data before it's displayed.
>
> **Source:** [SwiftUI Views - Initializers](https://developer.apple.com/documentation/swiftui/view)

> 🤖 **(Android Developers):**
>
> **Comparison:** Props are analogous to passing data to an `Activity` or `Fragment` using an `Intent`'s extras, or passing arguments to a Jetpack Compose composable function.
>
> **Key Takeaway:** Just as you'd bundle data to configure an Android UI component, props serve to provide child components with the information they need to render correctly.
>
> **Source:** [Pass data between composables](https://developer.android.com/jetpack/compose/state#pass-data-between-composables)

> ⚛️ **(React Developers):**
>
> **Comparison:** You're already familiar with props! In this course, we'll emphasize using TypeScript to define and type props for better code quality and maintainability, which is crucial for larger React Native applications.
>
> **Key Takeaway:** The core concept remains the same, but strong typing with TypeScript enhances the robustness of your components.

> 🅰 **(Angular Developers):**
>
> **Comparison:** Props are similar to `@Input()` decorators in Angular. An `@Input()` allows a parent component to bind data to a property of a child component.
>
> **Key Takeaway:** Both props in React and `@Input()` in Angular facilitate parent-to-child data communication, though the syntax and underlying mechanisms differ.
>
> **Source:** [Angular Component Interaction - @Input()](https://angular.io/guide/inputs-outputs)

### Referential Content: Defining and Using Props

Let's look at how to define and use props, especially with TypeScript for type safety.

**Typing Props with TypeScript**

When using TypeScript, it's essential to define the shape of your props using an interface or a type alias. This provides autocompletion, type checking at compile time, and makes your components easier to understand.

You can type a functional component and its props using `React.FC` (Functional Component) or by directly typing the function's props argument.

```typescript
interface GreetingProps {
  name: string;
  enthusiasmLevel?: number; // Optional prop
}

// Using React.FC
const Greeting: React.FC<GreetingProps> = (props) => {
  // ...
};

// Or directly typing the props argument
const AnotherGreeting = (props: GreetingProps) => {
  // ...
};
```

In the `GreetingProps` interface, `name` is a required string prop, and `enthusiasmLevel` is an optional number prop (indicated by the `?`).

**Destructuring Props**

To make your code cleaner, you can destructure props directly in the function parameters or within the component body.

```typescript
interface PatientInfoProps {
  patientName: string;
  age: number;
}

const PatientInfo = ({ patientName, age }: PatientInfoProps) => {
  return (
    <p>
      {patientName} is {age} years old.
    </p>
  );
};
```

Here, `patientName` and `age` are destructured from the `props` object.

**Default Prop Values**

You can provide default values for props using ES6 default parameters. This is useful for props that are optional but should have a sensible default if not provided by the parent.

```typescript
interface MedicationReminderProps {
  medicationName: string;
  timesPerDay?: number;
}

const MedicationReminder = ({
  medicationName,
  timesPerDay = 1,
}: MedicationReminderProps) => {
  return (
    <p>
      Remember to take {medicationName} {timesPerDay} time(s) a day.
    </p>
  );
};
```

If `timesPerDay` is not passed to `MedicationReminder`, it will default to `1`.

> 📚 **Official Documentation:**
>
> - [React Docs: Components and Props](https://react.dev/learn/passing-props-to-a-component)
> - [React Docs: Composing Components (mentions `children` prop)](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
> - [TypeScript Handbook: Everyday Types (for interfaces and types)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Procedural Content: Passing and Accessing Props

Now, let's see the flow of defining, passing, and accessing props in action.

**1. Define Props in the Child Component (with TypeScript)**

First, create an interface for the props your child component expects. Then, use this interface to type the props argument of your functional component.

**2. Pass Props from the Parent Component**

In the parent component, when you use the child component, pass the data as attributes. The attribute names must match the prop names defined in the child.

**3. Access Props Within the Child Component**

Inside the child component, you can access the passed data via the `props` object or by destructuring the props.

**Short, Self-Contained Example 1: Simple Medication Display**

This example demonstrates a `MedicationDisplay` component that receives a `name` prop and displays it. This component is designed for our SpeedyMeds app theme.

```tsx
// MedicationDisplay.tsx (Child Component)
import React from "react";

interface MedicationDisplayProps {
  name: string;
  dosage: string;
}

const MedicationDisplay: React.FC<MedicationDisplayProps> = ({
  name,
  dosage,
}) => {
  return (
    <div>
      <h2>Medication: {name}</h2>
      <p>Dosage: {dosage}</p>
    </div>
  );
};

export default MedicationDisplay;

// App.tsx (Parent Component - conceptual for CodeSandbox)
import React from "react";
import MedicationDisplay from "./MedicationDisplay"; // Assuming MedicationDisplay is in a separate file

const App = () => {
  return (
    <div>
      <h1>SpeedyMeds Reminders</h1>
      <MedicationDisplay name="Amoxicillin" dosage="250mg" />
      <MedicationDisplay name="Ibuprofen" dosage="200mg every 4-6 hours" />
    </div>
  );
};

export default App;
```

This example shows how the `MedicationDisplay` component receives `name` and `dosage` props. The `App` component passes different values for these props to render distinct medication details. This pattern is very common for displaying lists of items or varied content.

**Short, Self-Contained Example 2: Patient Information Card with `children`**

This example illustrates a `PatientInfoCard` component that accepts various props for patient details and also utilizes the `children` prop to display additional information passed by the parent.

```tsx
// PatientInfoCard.tsx (Child Component)
import React from "react";

interface PatientInfoCardProps {
  patientId: string;
  name: string;
  age: number;
  children?: React.ReactNode; // To accept any valid React child
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patientId,
  name,
  age,
  children,
}) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>
        Patient: {name} (ID: {patientId})
      </h3>
      <p>Age: {age}</p>
      {children && (
        <div>
          <strong>Notes:</strong>
          {children}
        </div>
      )}
    </div>
  );
};

export default PatientInfoCard;

// App.tsx (Parent Component - conceptual for CodeSandbox)
import React from "react";
import PatientInfoCard from "./PatientInfoCard";

const App = () => {
  return (
    <div>
      <h1>Patient Records</h1>
      <PatientInfoCard patientId="P001" name="John Doe" age={42}>
        <p>Allergic to penicillin.</p>
        <p>Next appointment: 2023-10-15</p>
      </PatientInfoCard>
      <PatientInfoCard patientId="P002" name="Jane Smith" age={35} />
    </div>
  );
};

export default App;
```

In this `PatientInfoCard` example, props like `patientId`, `name`, and `age` are passed to customize the card. The content nested within the `<PatientInfoCard>` tags in `App.tsx` (the two `<p>` elements) is passed as `props.children` and rendered conditionally if present. This demonstrates how `props.children` allows for flexible component composition.

### Troubleshooting Common Prop Issues

- **Type Mismatches:** If you pass a prop with a type different from what's defined in the child's prop interface (e.g., a number for a string), TypeScript will give you a compile-time error. Always check your types.
- **Missing Required Props:** If a required prop (one not marked with `?` in the interface and without a default value) is not passed, TypeScript will complain. Ensure all required props are provided.
- **Typos in Prop Names:** Ensure the prop names you use when passing from the parent exactly match the names defined in the child component's props interface. TypeScript helps catch these, but it's good to be mindful. `patientName` is different from `patientname`.

With props, you can create a flexible and robust component architecture. Understanding how to pass and type them effectively is key to building maintainable React Native applications.

### Exercise

Now, it's time to practice using props.

- **Exercise 7.2: Passing and Using Props**
  - **(https://codesandbox.io/TODO-EXERCISE-7.2-LINK)**

### Next Steps

You've learned how to pass data down from parent to child components using props. Next, we'll explore how components can manage their own internal data that can change over time using **State**.
