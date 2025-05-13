## Section 4: Props (Passing Data Down)

Props (short for "properties") are how you pass data from a parent component to a child component in React. This is a fundamental concept for creating dynamic and reusable components. This section covers how to define, pass, and use props, including typing them with TypeScript.

### What are Props?

Props are read-only data that a component receives from its parent. Think of them like arguments to a function. A parent component can pass data down to its children by setting attributes on the child component's JSX tag. The child component then receives these attributes as an object, conventionally named `props`.

**Key characteristics of props:**

- **Read-Only:** A component should never modify its own props. Props are owned by the parent component that passes them. This principle is often referred to as "props are immutable" from the child's perspective. Components should act like "pure functions" with respect to their props: given the same set of props, a component should always produce the same UI output and should not cause any side effects by altering its inputs.
- **Unidirectional Data Flow:** Data flows downwards from parent to child. This makes it easier to understand how data changes affect different parts of your application. If a child component needs to communicate a change or trigger an action in its parent (e.g., based on a user interaction within the child), this is achieved by the parent passing a callback function as a prop to the child. The child then calls this function when appropriate, effectively sending information or a request back up to the parent, which owns and manages the actual state and the function to modify it.
- **Configuration:** Props are used to configure and customize child components.

Props are fundamental to creating predictable and maintainable applications. Because data flows in only one direction and props cannot be altered by the receiving child components, tracing the origin of data and understanding how changes propagate becomes significantly easier. This simplifies debugging and reduces unintended side effects. Props also play a vital role in component decoupling, as child components operate based on the props they receive, without needing to know the internal workings of their parents.

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

### Passing Different Data Types as Props

Props in React are highly flexible and can accept any valid JavaScript value. Here are common examples:

- **Strings:** Directly in quotes or in curly braces.
  ```tsx
  <UserProfile bio="Loves React Native" details={"Enjoys coding"} />
  ```
- **Numbers:** In curly braces.
  ```tsx
  <MedicationOrder quantity={2} refillsRemaining={5} />
  ```
- **Booleans:** In curly braces, or using shorthand for `true`.
  ```tsx
  <AppointmentCard isConfirmed={true} needsFollowUp />;
  {
    /* needsFollowUp is true. For false, use needsFollowUp={false} */
  }
  ```
- **Arrays:** In curly braces.
  ```tsx
  const allergies = ["Peanuts", "Dust"];
  <PatientAlerts allergyList={allergies} />;
  ```
- **Objects:** In curly braces, with an inner pair for the object literal.
  ```tsx
  const patientContact = { phone: '555-1234', email: 'patient@example.com' };
  <ContactInfo details={patientContact} />
  // Or inline:
  <ContactInfo details={{ phone: '555-1234', email: 'patient@example.com' }} />
  ```
- **Functions (Callbacks):** In curly braces. This is key for child-to-parent communication.
  ```tsx
  const handleSelectMedication = (medId: string) => {
    console.log("Selected medication:", medId);
  };
  <MedicationSelector onMedicationSelect={handleSelectMedication} />;
  ```
- **React Elements/JSX:** You can pass entire JSX structures as props for flexible composition.
  ```tsx
  const CustomHeader = (
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Patient Dashboard</Text>
  );
  <PageLayout headerSlot={CustomHeader} />;
  ```

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

Using `React.FC<PatientBannerProps>` (or its full form `React.FunctionComponent<PatientBannerProps>`) is a common way to type a functional component. It provides type checking for the props and implicitly includes `children` as an optional prop (typed as `React.ReactNode`). Alternatively, you can type the props argument directly: `(props: PatientBannerProps) => { ... }`.

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

If `isTaken` is not provided when using `<PillReminderCard />`, it will default to `false` due to the default parameter value in the destructuring assignment.

### `props.children`

A special prop, `props.children`, allows components to be composed. It contains any content passed between the opening and closing tags of a component instance. The content of `props.children` can be a single element, multiple elements (which React treats as an array), text nodes, or any other renderable React node type.

```tsx
// Card.tsx - A generic Card component
import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native"; // Added Text and StyleSheet for the title

interface CardProps {
  children?: ReactNode; // ReactNode can be any renderable content; make it optional if cards can be empty
  title?: string;
}

// Using PropsWithChildren utility type can also be an option for components expecting children
// import React, { PropsWithChildren } from 'react';
// type CardProps = PropsWithChildren<{
//   title?: string;
// }>;

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <View style={styles.cardContainer}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      {/* Changed style name for clarity */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  // Added StyleSheet definition
  cardContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
  },
  titleText: {
    // Changed style name
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Card;

// Usage in another component:
// import Card from './Card';
// ...
// <Card title="Patient Vitals">
//   <Text>Heart Rate: 72 bpm</Text>
//   <Text>Blood Pressure: 120/80 mmHg</Text>
// </Card>
```

In this `Card` component, `children` will be the `<Text>` elements passed within its tags. You can also use TypeScript's `PropsWithChildren` utility type if preferred: `type CardProps = PropsWithChildren<{ title?: string; }>;` which automatically adds `children?: ReactNode;` to your props type.

### How Props are Passed: Under the Hood

When React's JSX transpiler (like Babel) processes a component tag such as `<MyComponent propA="valueA" propB={valueB} />`, it transforms this into a function call (e.g., `React.createElement` in older setups or the newer `_jsx` runtime equivalent from `react/jsx-runtime`).

As part of this transformation, all the attributes (like `propA` and `propB`) and their corresponding values are collected into a single JavaScript object. This object _is_ the `props` object. It is then passed as the first argument to the `MyComponent` function (if it's a functional component) or made available as `this.props` on the instance of `MyComponent` (if it's a class component). This mechanism is how components receive their configuration and data from their parents.

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
> **Comparison:** Props in React are how you pass data to configure your UI components. This is conceptually similar to how you might pass data when initializing a View or ViewController in native development, or how you set properties on an object to configure it after creation.
>
> - 🤖 **Android Developers:** Think of props like the arguments you pass in a `Bundle` to a `Fragment` using `fragment.setArguments(bundle)`, or data passed to an `Activity` via `Intent extras`. When you inflate a custom View from XML, attributes you define in XML are like initial props for that View.
> - 🍏 **iOS Developers:** This is similar to passing parameters during the initialization of a `UIViewController` (e.g., in a custom `init` method) or setting properties on a `UIView` subclass after creating it. When using Segues, the `prepare(for:sender:)` method is where you'd typically access the destination view controller and set its properties (pass data).
>
> The key difference is React's strict unidirectional data flow (parent to child) for props. For child-to-parent communication, React uses a pattern where the parent passes a callback function as a prop to the child.
>
> **Key Takeaway:** Props are the input data that determines what a component renders and how it behaves. They are the primary way to customize and configure reusable UI components from their parents in React Native.

Here's a table summarizing how React props compare to some common native data passing mechanisms:

| Feature                  | React Props                                                                  | Android (Intents / Fragment Bundles)                                                  | iOS (Segues / Direct Property Setting / Delegates)                                      |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Primary Use**          | Parent-to-child UI data/config within the component tree.                    | Inter-Activity/Fragment communication, navigation, starting Services.                 | ViewController transitions (Segues); Object configuration; Child-to-parent (Delegates). |
| **Data Flow Direction**  | Strictly unidirectional (parent to child). Callbacks for child-to-parent.    | Can be bidirectional (e.g., `startActivityForResult`). Bundles are typically one-way. | Unidirectional for Segues/property setting. Callback-style for Delegates.               |
| **Mutability**           | Immutable (read-only) from child's perspective.                              | Data in Bundles/Intents is typically copied (new instances).                          | Properties set can be mutable. Delegate parameters are passed.                          |
| **How Data is Sent**     | JSX attributes on component tag.                                             | `intent.putExtra()`, `bundle.putType()`.                                              | `destinationVC.property = value` in `prepareForSegue`; Calling delegate method.         |
| **How Data is Received** | Function argument / `this.props` object.                                     | `getIntent().getExtra()`, `getArguments().getType()`.                                 | Accessing property on `self`; Implementing delegate method parameters.                  |
| **Typical Data Types**   | Any JavaScript value (primitives, objects, arrays, functions, JSX elements). | Primitives, Serializable, Parcelable in a `Bundle`.                                   | Any Swift/Objective-C type.                                                             |

Props are a cornerstone of building reusable and maintainable React components. By understanding how to effectively pass and utilize props, you can create a flexible and well-structured UI for your SpeedyMeds application.

> 📚 **Official Documentation:**
>
> - [React Docs: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
> - [React Docs: Typing Props (using TypeScript)](https://react.dev/learn/typescript#typing-props)
> - [React Docs: `React.Children` Utilities](https://react.dev/reference/react/Children) (For advanced manipulation of `props.children`)

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
