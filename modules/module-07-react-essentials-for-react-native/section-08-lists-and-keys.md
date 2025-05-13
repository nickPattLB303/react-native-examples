## Section 8: Lists and Keys

Displaying lists of data is a common requirement in applications. React provides a straightforward way to render lists of components from an array of data. A crucial aspect of this process is the use of "keys," which help React identify and manage list items efficiently. This section covers how to render lists and the importance of keys.

### Rendering Lists with `.map()`

To render a list of items in React, you typically iterate over an array of data using the JavaScript `.map()` method. Inside the `.map()` callback, you return a JSX element for each item in the array.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Medication {
  id: string;
  name: string;
  dosage: string;
}

const medications: Medication[] = [
  { id: "m001", name: "Lisinopril", dosage: "10mg" },
  { id: "m002", name: "Metformin", dosage: "500mg" },
  { id: "m003", name: "Simvastatin", dosage: "20mg" },
];

const MedicationListSimple = () => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Current Prescriptions:</Text>
      {medications.map((medication) => (
        // IMPORTANT: We will add a key prop next!
        <View style={styles.medicationItem}>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text>Dosage: {medication.dosage}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { padding: 10 },
  listTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  medicationItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
  medicationName: { fontWeight: "bold" },
});

export default MedicationListSimple;
```

In this example, we map over the `medications` array and return a `<View>` with medication details for each item. However, this example is missing a crucial piece: the `key` prop.

### The Importance of `key` Prop

When you render a list of elements, React needs a way to uniquely identify each list item to efficiently update the UI when the list changes (e.g., items are added, removed, or reordered). This is where the `key` prop comes in.

**Keys must be:**

- **Strings:** Keys should be strings that uniquely identify a list item among its siblings.
- **Stable:** The key for a specific item should not change between renders. If a key changes, React will destroy the old component instance and create a new one, meaning any internal state of that component will be lost.
- **Unique (among siblings):** Keys only need to be unique among the direct children in the list, not globally unique in your entire application.

**Why are keys necessary?**

- **Efficient Updates:** Keys are React's primary mechanism for identifying list items. When a list is updated (items added, removed, or reordered), React uses these keys to determine the minimal changes needed for the UI. If keys are stable and unique, React can efficiently reuse existing component instances by just updating their props if the data changed, or correctly reorder/add/remove component instances.
- **Preserving State:** If list items have their own internal state (e.g., an input field in a to-do item, a toggle switch), stable keys ensure that React correctly associates the state with the specific item. Without proper keys, or if keys change unnecessarily, this state can be lost or incorrectly assigned to another item during re-renders, especially if the list order changes.

If you don't provide keys, React will default to using array indices as keys, which can lead to performance issues and bugs with component state if the list items can be reordered, added to, or removed from anywhere but the end. React will also log a warning in the console in such cases.

**Adding Keys:**

Let's update our `MedicationListSimple` component to include keys. Often, data from an API or database will have a unique `id` field that is perfect for a key.

If you're generating data locally (e.g., for a to-do list or items in a cart before saving), you should add a unique ID to your items during creation. This can be an auto-incrementing counter (be cautious if items can be deleted and re-added, as IDs might clash if not managed carefully), or more robustly, use `crypto.randomUUID()` (available in modern JavaScript environments including React Native) or a library like `uuid` to generate unique identifiers.

```tsx
// ... (imports and medications array remain the same)

const MedicationListWithKeys = () => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Current Prescriptions (with Keys):</Text>
      {medications.map((medication) => (
        <View key={medication.id} style={styles.medicationItem}>
          {/* `medication.id` is used as the key */}
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text>Dosage: {medication.dosage}</Text>
        </View>
      ))}
    </View>
  );
};

// ... (styles remain the same)
export default MedicationListWithKeys;
```

Here, `key={medication.id}` is added to the root `<View>` element returned by the `.map()` callback.

> [!IMPORTANT]
> The `key` prop should be placed on the outermost element returned by the `.map()` callback.

**Using Array Index as a Key (Last Resort):**

If your data does not have stable IDs, you might be tempted to use the array index as a key:

```tsx
// Anti-pattern if list can change order or items can be added/removed from the middle
// items.map((item, index) => (
//   <MyComponent key={index} ... />
// ));
```

Using the index as a key is generally **not recommended** if:

- The order of items in the list can change.
- Items can be added or removed from the middle of the list.

If these conditions apply, using the index as a key can lead to performance issues and problems with component state because the key itself changes when the item's position changes.

Use the index as a key only if the list is static (never reorders, items are not added/removed from the middle) and you have no other stable ID.

### Extracting List Items into Components

For more complex list items, it's good practice to extract the item rendering logic into its own component. This makes your code cleaner and promotes reusability.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions?: string;
}

// New component for a single medication item
interface MedicationListItemProps {
  medication: Medication;
}

const MedicationListItem: React.FC<MedicationListItemProps> = ({
  medication,
}) => {
  return (
    <View style={styles.medicationItem}>
      <Text style={styles.medicationName}>{medication.name}</Text>
      <Text>Dosage: {medication.dosage}</Text>
      {medication.instructions && (
        <Text style={styles.instructions}>
          Instructions: {medication.instructions}
        </Text>
      )}
    </View>
  );
  // If MedicationListItem returned only a React.Fragment as its single root element,
  // you could place the key on the Fragment like so:
  // return (
  //   <React.Fragment key={medication.id}> // Key on the Fragment
  //     <Text style={styles.medicationName}>{medication.name}</Text>
  //     <Text>Dosage: {medication.dosage}</Text>
  //     {/* Other elements ... */}
  //   </React.Fragment>
  // );
  // However, for list items that have their own distinct visual container or Pressable behavior,
  // a root <View> or <Pressable> is more common than a root Fragment.
};

const prescriptionData: Medication[] = [
  {
    id: "rx001",
    name: "Amoxicillin",
    dosage: "250mg",
    instructions: "Take with food",
  },
  { id: "rx002", name: "Ibuprofen", dosage: "200mg" },
  {
    id: "rx003",
    name: "Levothyroxine",
    dosage: "50mcg",
    instructions: "Take in the morning",
  },
];

const PatientPrescriptionList = () => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Patient Medications:</Text>
      {prescriptionData.map((med) => (
        // Key is still needed here, on the MedicationListItem component itself
        <MedicationListItem key={med.id} medication={med} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { padding: 10 },
  listTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  medicationItem: {
    backgroundColor: "#e9f5ff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  medicationName: { fontWeight: "bold", fontSize: 16 },
  instructions: { fontStyle: "italic", color: "#555", marginTop: 4 },
});

export default PatientPrescriptionList;
```

In this improved example:

- `MedicationListItem` is a separate component responsible for rendering a single medication.
- The `key` prop is now passed to the `<MedicationListItem />` component within the `.map()`.

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** Rendering lists using `.map()` and the rules for `key` props are identical in React Native and React for web.
>
> **Key Takeaway:** Your existing knowledge of list rendering and keys in React applies directly.

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** Angular uses `*ngFor` directive to iterate over lists (e.g., `<li *ngFor="let item of items; trackBy: trackByFn">`). React uses the standard JavaScript `.map()` method within JSX. The `key` prop in React serves a similar purpose to Angular's `trackBy` function for optimizing list updates.
>
> **Key Takeaway:** Use `.map()` for list rendering and always provide a stable, unique `key` prop for each list item to ensure efficient rendering and state preservation.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** This is analogous to populating a `RecyclerView` in Android (using an Adapter) or a `UITableView`/`UICollectionView` in iOS (using a DataSource). React's `.map()` and `key` system is its declarative way of achieving this. React Native's `<FlatList>` and `<SectionList>` components (covered later) are more optimized for long lists and are closer to `RecyclerView` or `UITableView` in terms of performance features like virtualization.
>
> **Key Takeaway:** For simple lists, `.map()` with keys is sufficient. React uses these keys to efficiently update the underlying native views when the list data changes.

Properly rendering lists with unique and stable keys is essential for performance and correctness in React applications. For very long lists or performance-critical scenarios, React Native provides more advanced list components like `<FlatList>` and `<SectionList>`, which we will cover in a later module.

> 📚 **Official Documentation:**
>
> - [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists)
> - [React Docs: Lists and Keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

---

### Exercise 7.4: Rendering Lists

Time to practice rendering lists of data with keys.

**Objective:** Create a component that displays a list of patient appointments for the SpeedyMeds app.

**Instructions:**

1.  Define an interface for an `Appointment` object (e.g., with properties like `id` (string), `patientName` (string), `time` (string), `reason` (string)).
2.  Create an array of at least 3-4 sample `Appointment` objects.
3.  Create a functional component called `AppointmentList`.
4.  Inside `AppointmentList`, use the `.map()` method to iterate over your array of appointments.
5.  For each appointment, render a component (you can create a simple inline structure or a separate `AppointmentItem` component) that displays the appointment details (patient name, time, reason).
6.  **Crucially, ensure each rendered appointment item has a unique `key` prop using the appointment's `id`.**
7.  Add some basic styling to make the list readable.

**Tool:** CodeSandbox

**(https://codesandbox.io)**

_A solution will be provided by your instructor or in the course materials._
