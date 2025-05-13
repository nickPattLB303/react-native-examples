## Section 8: Lists and Keys

Displaying lists of data is a very common requirement in mobile applications. Whether it's a list of medications, patient appointments, or pharmacy branches, React provides a straightforward way to render collections of items. This section covers how to render lists using JavaScript's `map()` method and the crucial role of `key` props for list item identification.

### Rendering Lists with `map()`

To render a list of items in React, you typically take an array of data and transform it into an array of React elements using the JavaScript `map()` array method. Each item in the data array is mapped to a JSX element that represents it in the UI.

```tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Medication {
  id: string; // Unique identifier for the key prop
  name: string;
  dosage: string;
  form: "Tablet" | "Capsule" | "Syrup";
}

const medications: Medication[] = [
  { id: "med1", name: "Amoxicillin", dosage: "250mg", form: "Capsule" },
  { id: "med2", name: "Ibuprofen", dosage: "200mg", form: "Tablet" },
  { id: "med3", name: "Loratadine", dosage: "10mg", form: "Tablet" },
  { id: "med4", name: "Cough Syrup RX", dosage: "10ml", form: "Syrup" },
];

const MedicationList: React.FC = () => {
  // Use map to transform the medications array into an array of <Text> elements
  const medicationItems = medications.map((medication) => {
    return (
      <View key={medication.id} style={styles.medicationItem}>
        <Text style={styles.medicationName}>
          {medication.name} ({medication.form})
        </Text>
        <Text>Dosage: {medication.dosage}</Text>
      </View>
    );
  });

  return (
    <ScrollView style={styles.container}>
      {/* ScrollView is used to make the list scrollable if it exceeds screen height */}
      <Text style={styles.title}>Current Medications</Text>
      {medicationItems}
      {/* Render the array of JSX elements */}
    </ScrollView>
  );
};

// It's also common to inline the map() call directly in the JSX
const InlineMedicationList: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Medications (Inline Map)</Text>
      {medications.map((medication) => (
        <View key={medication.id} style={styles.medicationItem}>
          <Text style={styles.medicationName}>
            {medication.name} ({medication.form})
          </Text>
          <Text>Dosage: {medication.dosage}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Important for ScrollView to take up available space
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  medicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "500",
  },
});

// You can export one of them to be rendered in your App.js or main screen
export default MedicationList;
// export default InlineMedicationList;
```

**Explanation:**

1.  **Data Array:** We have an array `medications`, where each object represents a medication with an `id`, `name`, `dosage`, and `form`.
2.  **`map()` Method:** `medications.map((medication) => { ... })` iterates over the `medications` array. For each `medication` object, the arrow function returns a JSX `<View>` element representing that medication.
3.  **Rendering the List:** The resulting array of JSX elements (`medicationItems`) is then embedded directly within the parent `<ScrollView>` using curly braces `{medicationItems}`.
4.  **Inline `map()`:** The `InlineMedicationList` component shows a more common pattern where the `map()` call is done directly inside the JSX.
5.  **`<ScrollView>`:** In React Native, if your list might exceed the screen height, you need to wrap it in a component that supports scrolling, like `<ScrollView>` or more optimized list views like `<FlatList>` (covered in a later module).

### The Importance of `key` Props

When you render a list of items using `map()`, React needs a way to uniquely identify each item in the list so it can efficiently update, reorder, or remove items when the list changes. This is where the `key` prop comes in.

**Keys help React identify which items have changed, are added, or are removed.**

In the example above, we used `key={medication.id}` for each `<View>` returned by `map()`.

**Rules for Keys:**

1.  **Unique Among Siblings:** Keys only need to be unique among their sibling elements in the list, not globally unique across your entire application.
2.  **Stable:** A key for a particular item should not change between re-renders. Using a stable, unique ID from your data (like `medication.id`) is the best approach.
3.  **Not for Data Passing:** Keys are used internally by React. You cannot access the `key` prop directly in your component (i.e., `props.key` will be `undefined`). If you need the ID value inside your component, pass it as a separate prop (e.g., `<MyComponent id={item.id} key={item.id} />`).

**What Happens if You Don't Provide Keys?**

If you don't provide keys for list items, React will still render the list, but it will issue a warning in the console. More importantly, without keys, React might have to re-render the entire list or make incorrect assumptions when items are added, removed, or reordered, leading to potential performance issues or bugs with component state.

**Using Array Index as a Key (Caution):**

You _can_ use the array index as a key if your list items have no stable IDs: `items.map((item, index) => <li key={index}>{item}</li>)`.

However, this is generally **not recommended if the order of items might change**. If items are reordered, inserted, or deleted from the middle of the list, using the index as a key can lead to problems with component state and incorrect updates because the item associated with a particular index might change.

> ⚠️ **CAUTION:** Only use the array index as a `key` if:
>
> 1. The list and items are static – they are not computed and do not change.
> 2. The items in the list have no IDs.
> 3. The list is never reordered or filtered.

It's always best to use a unique, stable ID from your data if available.

### Extracting List Item Components

For more complex list items, it's a good practice to extract the rendering logic for a single item into its own component.

```tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  form: "Tablet" | "Capsule" | "Syrup";
}

// Sample data (same as before)
const medicationsData: Medication[] = [
  { id: "med101", name: "Metformin XR", dosage: "500mg", form: "Tablet" },
  { id: "med102", name: "Atorvastatin", dosage: "20mg", form: "Tablet" },
  {
    id: "med103",
    name: "Children's Ibuprofen",
    dosage: "100mg/5ml",
    form: "Syrup",
  },
];

// New component for a single medication item
interface MedicationListItemProps {
  medication: Medication;
}

const MedicationListItem: React.FC<MedicationListItemProps> = ({
  medication,
}) => {
  return (
    <View style={styles.medicationItemExtracted}>
      {" "}
      // Key is applied where the component is used
      <Text style={styles.medicationNameExtracted}>
        {medication.name}{" "}
        <Text style={styles.formText}>({medication.form})</Text>
      </Text>
      <Text style={styles.dosageTextExtracted}>Dosage: {medication.dosage}</Text>
    </View>
  );
};

// Main list component using MedicationListItem
const RefactoredMedicationList: React.FC = () => {
  return (
    <ScrollView style={styles.containerExtracted}>
      <Text style={styles.titleExtracted}>Prescribed Medications</Text>
      {medicationsData.map((med) => (
        // The key should be here, on the list item component itself
        <MedicationListItem key={med.id} medication={med} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerExtracted: { flex: 1, padding: 10, backgroundColor: "#f0f8ff" },
  titleExtracted: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  medicationItemExtracted: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dcedc8",
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    elevation: 1,
  },
  medicationNameExtracted: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2e7d32",
  },
  formText: { fontSize: 14, color: "#757575", fontStyle: "italic" },
  dosageTextExtracted: { fontSize: 15, color: "#424242", marginTop: 4 },
});

export default RefactoredMedicationList;
```

In this refactored example:

- `MedicationListItem` is a new component responsible for rendering a single medication.
- The `key` prop is now applied to the `<MedicationListItem />` component when it's used within the `map` function in `RefactoredMedicationList`.

This approach makes your code more modular, readable, and maintainable, especially for lists with complex items.

> ⚛️ **(Web Developers - React):**
>
> **Comparison:** Rendering lists with `map()` and the rules for `key` props are identical in React for the web and React Native.
>
> **Key Takeaway:** Your understanding of list rendering and keys in web React directly applies here. Remember to use scrollable components like `<ScrollView>` or `<FlatList>` for lists in React Native.

Rendering lists effectively and efficiently is crucial for many applications. Always provide stable keys to your list items to ensure React can manage updates correctly.

### Exercise 7.4: Rendering Lists

**Objective:** Create a component that renders a list of patient appointments using the `map()` function and appropriate `key` props.

**Instructions:**

1.  Open a CodeSandbox (or continue from a previous exercise).
2.  Define a TypeScript interface for an `Appointment` object, which should include at least `id` (string), `patientName` (string), `time` (string, e.g., "10:30 AM"), and `reason` (string).
3.  Create an array of at least 3 sample `Appointment` objects.
4.  Create a functional component named `AppointmentsList`.
5.  Inside `AppointmentsList`, use the `map()` method to render each appointment. Each appointment should be displayed in a `<View>` and show the patient's name, appointment time, and reason.
6.  Ensure each list item has a unique and stable `key` prop.
7.  Render your `AppointmentsList` component within a `<ScrollView>` in the main `App` component.

**(https://codesandbox.io)** (A pre-configured CodeSandbox with React and TypeScript should be set up for this exercise. For now, this is a placeholder link.)

> 📚 **Official Documentation:**
>
> - [React Docs - Rendering Lists](https://react.dev/learn/rendering-lists)
> - [React Docs - Keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
> - [React Native Docs - `ScrollView`](https://reactnative.dev/docs/scrollview)
