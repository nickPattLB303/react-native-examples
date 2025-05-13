## Section 4: Props (Passing Data Down)

Props (short for "properties") are how you pass data from a parent component to a child component in React. This is a fundamental concept for creating dynamic and reusable components. This section covers how to define, pass, and use props, including typing them with TypeScript.

### What are Props?

Props are read-only data that a component receives from its parent. Think of them like arguments to a function. A parent component can pass data down to its children by setting attributes on the child component's JSX tag. The child component then receives these attributes as an object, conventionally named `props`.

**Key characteristics of props:**

- **Read-Only:** A component should never modify its own props. Props are owned by the parent component that passes them. This principle is often referred to as "props are immutable" from the child's perspective.
- **Unidirectional Data Flow:** Data flows downwards from parent to child. This makes it easier to understand how data changes affect different parts of your application.
- **Configuration:** Props are used to configure and customize child components.

### Defining and Passing Props

You pass props to a component much like you set attributes on an HTML element.

```tsx
// ParentComponent.tsx
import React from "react";
import { View } from "react-native";
import MedicationDisplay from "./MedicationDisplay"; // Assuming MedicationDisplay from previous section

const PrescriptionList = () => {
  return (
    <View>
      <MedicationDisplay medicationName="Lisinopril" dosage="10mg" />
      <MedicationDisplay medicationName="Metformin" dosage="500mg" />
    </View>
  );
};

export default PrescriptionList;
```

In this example, `PrescriptionList` is the parent component. It renders two `MedicationDisplay` child components and passes `medicationName` and `dosage` as props to each.

### Accessing Props in a Child Component

A functional component receives props as the first argument to its function. It's common to destructure the props object for easier access to individual properties.

```tsx
// MedicationDisplay.tsx (modified for clarity)
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface MedicationDisplayProps {
  medicationName: string;
  dosage: string;
  notes?: string; // Optional prop
}

// Using React.FC for typing functional components and destructuring props
const MedicationDisplay: React.FC<MedicationDisplayProps> = ({
  medicationName,
  dosage,
  notes,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Medication: {medicationName}</Text>
      <Text style={styles.dosageText}>Dosage: {dosage}</Text>
      {notes && <Text style={styles.notesText}>Notes: {notes}</Text>}
      {/* Conditionally render notes if provided */}
    </View>
  );
};

// ... (styles remain the same)

export default MedicationDisplay;
```

Here, `MedicationDisplay` receives `medicationName`, `dosage`, and an optional `notes` prop. We destructure these from the `props` object in the function signature.

### Typing Props with TypeScript

Using TypeScript to define the shape of your props object is highly recommended. It provides type safety, autocompletion, and makes your components easier to understand and maintain.
You define an interface or a type alias for the props.

```tsx
interface PatientBannerProps {
  patientName: string;
  age: number;
  isPriority: boolean;
  lastVisitDate?: Date; // Optional prop
}

const PatientBanner: React.FC<PatientBannerProps> = (props) => {
  return (
    <View style={styles.banner}>
      <Text>
        Patient: {props.patientName} (Age: {props.age})
      </Text>
      {props.isPriority && (
        <Text style={styles.priorityText}>PRIORITY PATIENT</Text>
      )}
      {props.lastVisitDate && (
        <Text>Last Visit: {props.lastVisitDate.toLocaleDateString()}</Text>
      )}
    </View>
  );
};

// ... (styles for banner and priorityText)
```

Using `React.FC<PatientBannerProps>` is a common way to type a functional component. `React.FC` (or `React.FunctionComponent`) is a generic type that provides type checking for functional components, including implicit `children` props (though you can also type `children` explicitly if needed).

### Default Props

You can provide default values for props if they are not passed by the parent component. With functional components and TypeScript, you can achieve this using default parameter values during destructuring.

```tsx
interface PillReminderCardProps {
  medicationName: string;
  time: string;
  isTaken?: boolean; // Optional, will use default if not provided
}

const PillReminderCard: React.FC<PillReminderCardProps> = ({
  medicationName,
  time,
  isTaken = false, // Default value for isTaken
}) => {
  return (
    <View
      style={[styles.card, isTaken ? styles.takenCard : styles.pendingCard]}
    >
      <Text>
        {medicationName} - {time}
      </Text>
      <Text>{isTaken ? "Taken" : "Pending"}</Text>
    </View>
  );
};

// ... (styles for card, takenCard, pendingCard)
```

If `isTaken` is not provided when using `<PillReminderCard />`, it will default to `false`.

### `props.children`

A special prop, `props.children`, allows components to be composed. It contains any content passed between the opening and closing tags of a component instance.

```tsx
// Card.tsx - A generic Card component
import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface CardProps {
  children: ReactNode; // ReactNode can be any renderable content
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <View style={styles.cardContainer}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

// ... (styles for cardContainer, title)

export default Card;

// Usage in another component:
// import Card from './Card';
// ...
// <Card title="Patient Vitals">
//   <Text>Heart Rate: 72 bpm</Text>
//   <Text>Blood Pressure: 120/80 mmHg</Text>
// </Card>
```

In this `Card` component, `children` will be the `<Text>` elements passed within its tags.

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** Props work identically in React Native as they do in React for the web. The concepts of passing data down, read-only nature, `props.children`, default props, and prop typing with TypeScript (or PropTypes in older JavaScript projects) are all the same.
>
> **Key Takeaway:** Your understanding of React props is directly applicable here.

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** Props are similar to `@Input()` properties in Angular components. They are the primary way to pass data into a component from its parent. React's data flow is strictly unidirectional (parent to child via props), whereas Angular supports two-way data binding (though one-way is often preferred).
>
> **Key Takeaway:** Focus on the unidirectional data flow. Data comes into a component via props, and the component treats these props as read-only.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** Think of props as parameters you pass when initializing a View or ViewController, or data set on an object after its creation to configure it. For example, passing data to an Android Fragment via its arguments Bundle, or setting properties on a `UIView` subclass during its initialization.
>
> **Key Takeaway:** Props are how you configure and customize your reusable UI components from their parents. They are the input data that determines what a component renders and how it behaves.

Props are a cornerstone of building reusable and maintainable React components. By understanding how to effectively pass and utilize props, you can create a flexible and well-structured UI for your SpeedyMeds application.

> 📚 **Official Documentation:**
>
> - [React Docs: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
> - [React Docs: Typing Props (using TypeScript)](https://react.dev/learn/typescript#typing-props) (Part of the TypeScript with React page)

---

### Exercise 7.2: Passing and Using Props

Let's practice passing and using props to make components more dynamic.

**Objective:** Enhance the `PatientInfoCard` component from the previous exercise to accept more details via props and display them. Also, create a `MedicationReminder` component that uses props.

**Instructions:**

1.  **Enhance `PatientInfoCard`:**
    - Modify `PatientInfoCard` to accept an additional prop: `lastVisit` (string, optional).
    - Conditionally display the `lastVisit` information only if it's provided.
    - Update your `App` component to pass this new prop to at least one `PatientInfoCard` instance.
2.  **Create `MedicationReminder` component:**
    - Define a new functional component `MedicationReminder`.
    - It should accept `medicationName` (string), `dosage` (string), and `timeOfDay` (string, e.g., "Morning", "Evening") as props.
    - It should render this information in a styled way (e.g., in a `<View>` with `<Text>` elements).
3.  In your `App` component, render at least two instances of `MedicationReminder` with different data for the SpeedyMeds app.

**Tool:** CodeSandbox

**(https://codesandbox.io)**

_A solution will be provided by your instructor or in the course materials._
