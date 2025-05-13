## Section 1: Recap: `useState` and Prop Drilling Limitations

Welcome to the first section of our deep dive into state management in React Native! Before we explore more advanced techniques, it's essential to solidify our understanding of the foundational tools React provides for managing state and to recognize their limitations, especially as applications like our SpeedyMeds app begin to scale.

### Revisiting `useState`: The Building Block of Local State

As you learned in Module 7: React Essentials, the `useState` Hook is the primary way to introduce state into your functional components. It allows a component to remember information and re-render when that information changes.

Let's recall its basic usage:

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface MedicationReminderProps {
  medicationName: string;
}

const MedicationReminder: React.FC<MedicationReminderProps> = ({
  medicationName,
}) => {
  const [isTaken, setIsTaken] = useState<boolean>(false);

  const handleToggleTaken = () => {
    setIsTaken((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.medicationText}>
        {medicationName}: {isTaken ? "Taken" : "Not Taken"}
      </Text>
      <Button
        title={isTaken ? "Mark as Not Taken" : "Mark as Taken"}
        onPress={handleToggleTaken}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  medicationText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MedicationReminder;
```

In this `MedicationReminder` component, `useState(false)` initializes an `isTaken` state variable to `false`. The `setIsTaken` function is used to update this state, triggering a re-render of the component to reflect the change. This is perfect for managing state that is local and specific to a single component or a small group of closely related components.

This example demonstrates how `useState` efficiently manages the internal status of our `MedicationReminder`. The component independently tracks whether a medication has been marked as taken, updating its display and button text accordingly. This local state is self-contained and doesn't affect other parts of the application directly.

### The Challenge of Sharing State: Introducing Prop Drilling

What happens when state needs to be shared or accessed by components that are not directly connected in the component tree? This is a common scenario. For instance, imagine a `PatientDashboard` component in our SpeedyMeds app that needs to display a summary of medications, and a `MedicationList` component nested deep within it also needs access to this medication data, perhaps to allow individual medications to be updated.

One way to pass data down the component tree is through props. If a distant child component needs data from a high-level ancestor, each intermediary component in the chain must receive that prop and pass it down to the next component. This is known as **prop drilling**.

Let's illustrate with a simplified SpeedyMeds example:

Suppose we have a `PatientProfileScreen` that holds patient information, including a list of their prescribed medications. This screen renders a `MedicationOverview` component, which in turn renders a `MedicationDisplay` component that actually shows the medication name.

```tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Types
interface Medication {
  id: string;
  name: string;
  dosage: string;
}

interface Patient {
  id: string;
  name: string;
  medications: Medication[];
}

// Deeply Nested Component
interface MedicationDisplayProps {
  medicationName: string;
}

const MedicationDisplay: React.FC<MedicationDisplayProps> = ({
  medicationName,
}) => {
  return (
    <Text style={styles.medicationNameText}>Medication: {medicationName}</Text>
  );
};

// Intermediate Component
interface MedicationOverviewProps {
  medications: Medication[];
}

const MedicationOverview: React.FC<MedicationOverviewProps> = ({
  medications,
}) => {
  // Imagine this component also does other things with medications
  if (medications.length === 0) {
    return <Text>No medications prescribed.</Text>;
  }
  return (
    <View style={styles.overviewContainer}>
      <Text style={styles.overviewTitle}>Medication Overview:</Text>
      {/* We only need the name for MedicationDisplay, but we pass the whole medication object or just name */}
      {/* For this example, let's assume MedicationDisplay only needs the name of the first medication */}
      {medications[0] && (
        <MedicationDisplay medicationName={medications[0].name} />
      )}
      {/* In a real app, you'd likely map over medications and render multiple MedicationDisplay components */}
    </View>
  );
};

// Top-Level Component
const PatientProfileScreen: React.FC = () => {
  const [patientData, setPatientData] = useState<Patient>({
    id: "pat123",
    name: "Jane Doe",
    medications: [
      { id: "med001", name: "Amoxicillin", dosage: "250mg" },
      { id: "med002", name: "Lisinopril", dosage: "10mg" },
    ],
  });

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.patientName}>Patient: {patientData.name}</Text>
      <MedicationOverview medications={patientData.medications} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, padding: 20 },
  patientName: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  overviewContainer: { marginTop: 10, paddingLeft: 10 },
  overviewTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  medicationNameText: { fontSize: 14, fontStyle: "italic" },
});

export default PatientProfileScreen;
```

In this example, the `medications` array originates in `PatientProfileScreen`. To get the name of the first medication to `MedicationDisplay`, the `medications` prop is passed through `MedicationOverview`. `MedicationOverview` might not even directly use all aspects of the `medications` data that `MedicationDisplay` needs (though in this simple example it does use it to select the first medication). This is prop drilling. If `MedicationDisplay` needed a function to update a medication's status, that function would also need to be drilled down from `PatientProfileScreen` through `MedicationOverview`.

The key issue illustrated here is that `MedicationOverview` acts as a conduit for the `medications` prop (or parts of it, like `medications[0].name`) purely to serve `MedicationDisplay`. If the component tree were deeper, more components would be involved in this pass-through, even if they don't directly use the prop themselves.

### Limitations and Drawbacks of Prop Drilling

While prop drilling works for simple cases or shallow component trees, it quickly becomes cumbersome and presents several drawbacks in larger, more complex applications:

1.  **Code Verbosity & Boilerplate:** Components in the middle of the chain become cluttered with props they don't directly use, solely for passing them down. This increases boilerplate and makes component APIs less clear.
2.  **Maintenance Challenges:** Refactoring can be a nightmare. If a deeply nested component's prop requirements change (e.g., it needs a new piece of data, or a prop name changes), you might have to modify all intermediary components in the chain. This is error-prone and time-consuming.
3.  **Component Reusability:** Components become less reusable because they are tightly coupled to the specific props they are expected to pass down, even if those props are irrelevant to their own core logic.
4.  **Performance Issues (Potentially):** While not always a direct cause, passing down new object or function references as props through many layers can sometimes contribute to unnecessary re-renders of intermediate components if they are not carefully memoized (e.g., with `React.memo`). If an intermediate component re-renders, it will also re-render its children, potentially cascading down the tree.
5.  **Readability and Understanding:** It can become difficult to trace where data originates and how it flows through the application, making the codebase harder to understand and debug.

> [!IMPORTANT]
> Prop drilling isn't inherently an anti-pattern for very small component trees. However, recognizing when it's becoming a burden is key to knowing when to reach for more sophisticated state management solutions.

Consider our SpeedyMeds app: if user authentication status, theme preferences (like dark mode), or global notification messages need to be accessible by many disparate components, prop drilling would quickly become unmanageable. Imagine passing `isAuthenticated` or `theme` through dozens of intermediate components!

These limitations are precisely why more advanced state management patterns and libraries exist. They aim to provide more direct and efficient ways for components to access and update shared state without explicit manual prop passing through every level of the tree.

In the next sections, we'll explore solutions like the React Context API, Zustand, and TanStack Query, which offer different strategies to mitigate the challenges posed by prop drilling and manage global or remote state more effectively.

### Next Steps

Now that we've recapped the basics of `useState` and the challenges of prop drilling, we're ready to look at our first solution for more global state management. In the next section, we'll take a deeper dive into the React Context API.
