## Section 6: `useCallback` and `useMemo` Hooks

Performance is a critical aspect of mobile application development. React's `useCallback` and `useMemo` Hooks are powerful tools for optimizing functional components by memoizing functions and values, respectively. This helps prevent unnecessary re-renders and expensive recalculations, leading to smoother user experiences in your SpeedyMeds app.

### Conceptual Content

**Why Optimize?**

In React, components re-render when their state or props change. If a parent component re-renders, its child components typically re-render as well, even if their props haven't actually changed in value. This can lead to performance issues, especially with complex components or long lists.

- **`useCallback`**: Returns a memoized version of a callback function. This memoized callback only changes if one of its dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g., child components wrapped in `React.memo`).

- **`useMemo`**: Returns a memoized value. It recomputes the memoized value only when one of its dependencies has changed. This is useful for avoiding expensive calculations on every render.

**`React.memo`**

It's important to also mention `React.memo`. This is a higher-order component that memoizes a component. If your component renders the same result given the same props, you can wrap it in `React.memo` for a performance boost in some cases by skipping the render. `useCallback` and `useMemo` are often used in conjunction with `React.memo`.

> [!IMPORTANT]
> Optimization Hooks like `useCallback` and `useMemo` should be used judiciously. They are not free – they add a small overhead for dependency checking and memoization. Profile your application first to identify performance bottlenecks before applying these Hooks. Premature optimization can sometimes make code more complex without significant performance gains.

### Referential Content

- **`useCallback(fn, deps)`**

  - **`fn`**: The function to memoize.
  - **`deps`**: An array of dependencies. `useCallback` will return a new memoized function if any dependency has changed. If the dependencies array is empty (`[]`), the returned function instance will never change.
  - **Returns**: A memoized version of the callback function `fn`.

- **`useMemo(computeExpensiveValue, deps)`**
  - **`computeExpensiveValue`**: A function that computes a value.
  - **`deps`**: An array of dependencies. `useMemo` will recompute the memoized value only if any dependency has changed.
  - **Returns**: A memoized value.

> 📚 **Official Documentation:**
>
> - [React Docs: `useCallback`](https://react.dev/reference/react/useCallback)
> - [React Docs: `useMemo`](https://react.dev/reference/react/useMemo)
> - [React Docs: `React.memo`](https://react.dev/reference/react/memo)

### Procedural Content

Let's illustrate with examples relevant to the SpeedyMeds application.

**1. `useCallback` for Stable Event Handlers**

Imagine a `MedicationListItem` component that takes an `onSelectMedication` prop. If the parent component re-renders often, it might create a new `onSelectMedication` function instance on each render. If `MedicationListItem` is wrapped in `React.memo`, it would still re-render because the `onSelectMedication` prop (a function) is a new reference each time.

```tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Medication {
  id: string;
  name: string;
  dosage: string;
}

interface MedicationListItemProps {
  item: Medication;
  onSelectMedication: (id: string) => void;
}

// Optimized child component
const MedicationListItem = React.memo<MedicationListItemProps>(
  ({ item, onSelectMedication }) => {
    console.log(`Rendering MedicationListItem: ${item.name}`);
    return (
      <TouchableOpacity
        onPress={() => onSelectMedication(item.id)}
        style={styles.listItem}
      >
        <Text style={styles.medName}>{item.name}</Text>
        <Text style={styles.medDosage}>{item.dosage}</Text>
      </TouchableOpacity>
    );
  }
);

const initialMedications: Medication[] = [
  { id: "1", name: "Lisinopril", dosage: "10mg" },
  { id: "2", name: "Metformin", dosage: "500mg" },
  { id: "3", name: "Simvastatin", dosage: "20mg" },
];

const MedicationListScreen: React.FC = () => {
  const [medications, setMedications] =
    useState<Medication[]>(initialMedications);
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
  const [counter, setCounter] = useState(0); // To trigger parent re-renders

  // Without useCallback, a new instance of this function is created on every re-render of MedicationListScreen
  // const handleSelectMedication = (id: string) => {
  //   console.log('Selected medication:', id);
  //   setSelectedMedicationId(id);
  // };

  // With useCallback, handleSelectMedication is memoized
  // It only changes if its dependencies change (none in this case, as setSelectedMedicationId is stable)
  const handleSelectMedication = useCallback((id: string) => {
    console.log("Selected medication:", id);
    setSelectedMedicationId(id);
  }, []); // Empty dependency array: function instance is stable

  return (
    <View style={styles.container}>
      <Button
        title={`Force Parent Re-render (${counter})`}
        onPress={() => setCounter((c) => c + 1)}
      />
      {selectedMedicationId && <Text>Selected ID: {selectedMedicationId}</Text>}
      <FlatList
        data={medications}
        renderItem={({ item }) => (
          <MedicationListItem
            item={item}
            onSelectMedication={handleSelectMedication}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  medName: { fontSize: 16, fontWeight: "bold" },
  medDosage: { fontSize: 14, color: "#555" },
});

export default MedicationListScreen;
```

In this example, `MedicationListItem` is wrapped in `React.memo`. The `handleSelectMedication` function is memoized using `useCallback`. Now, even if `MedicationListScreen` re-renders (e.g., due to the `counter` state changing), the `MedicationListItem` components will not re-render unnecessarily because the `onSelectMedication` prop they receive is the same function instance (unless its dependencies change, which are none here as `setSelectedMedicationId` is stable).

**2. `useMemo` for Expensive Calculations**

Suppose you have a list of patient records in your SpeedyMeds app, and you need to compute some derived data, like the number of patients with overdue prescriptions. This calculation could be expensive if the list is long.

```tsx
import React, { useState, useMemo } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

interface Patient {
  id: string;
  name: string;
  lastRefillDate: Date;
  refillCycleDays: number; // e.g., 30 days
}

const initialPatients: Patient[] = [
  {
    id: "p1",
    name: "John Doe",
    lastRefillDate: new Date(2023, 0, 15),
    refillCycleDays: 30,
  }, // Jan 15, 2023
  {
    id: "p2",
    name: "Jane Smith",
    lastRefillDate: new Date(2023, 2, 1),
    refillCycleDays: 60,
  }, // Mar 1, 2023
  {
    id: "p3",
    name: "Alice Brown",
    lastRefillDate: new Date(2024, 0, 20),
    refillCycleDays: 30,
  }, // Jan 20, 2024
];

// Mock today's date for consistent calculation in example
const MOCK_TODAY = new Date(2024, 1, 25); // Feb 25, 2024

const calculateOverduePrescriptions = (patients: Patient[]): number => {
  console.log("Calculating overdue prescriptions..."); // To see when it runs
  let overdueCount = 0;
  patients.forEach((patient) => {
    const dueDate = new Date(patient.lastRefillDate);
    dueDate.setDate(dueDate.getDate() + patient.refillCycleDays);
    if (dueDate < MOCK_TODAY) {
      overdueCount++;
    }
  });
  return overdueCount;
};

const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [refreshKey, setRefreshKey] = useState(0); // To force re-render for demo

  // Without useMemo, this calculation would run on every render of PatientDashboard
  // const overdueCount = calculateOverduePrescriptions(patients);

  // With useMemo, the calculation only runs if 'patients' array changes
  const overdueCount = useMemo(
    () => calculateOverduePrescriptions(patients),
    [patients]
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>SpeedyMeds Patient Dashboard</Text>
      <Button
        title="Refresh View (Force Re-render)"
        onPress={() => setRefreshKey((k) => k + 1)}
      />
      <Text style={styles.infoText}>Total Patients: {patients.length}</Text>
      <Text style={styles.infoText}>Overdue Prescriptions: {overdueCount}</Text>

      {/* Imagine a list of patients here */}
      {patients.map((p) => (
        <Text key={p.id} style={styles.patientName}>
          {p.name}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: { fontSize: 16, marginVertical: 5 },
  patientName: { fontSize: 14, paddingVertical: 3, color: "#444" },
});

export default PatientDashboard;
```

In `PatientDashboard`, `calculateOverduePrescriptions` is an expensive function. By wrapping its invocation in `useMemo`, the `overdueCount` is only recalculated if the `patients` array (its dependency) changes. Re-renders caused by other state changes (like `refreshKey`) will use the memoized `overdueCount` value, saving computation.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** The concept of memoization to avoid redundant work is universal. In native development, you might achieve similar outcomes by caching calculation results in properties and only invalidating/recalculating them when underlying data changes, or by carefully managing UI updates to avoid redrawing unchanged parts of the screen.
>
> **Key Takeaway:** `useCallback` and `useMemo` provide React-specific Hooks to declare these optimizations directly within your functional components, integrating with React's rendering model.

> 🌐 **(Web Developers - React):**
>
> **Comparison:** `useCallback` and `useMemo` work identically in React Native as they do in React for the web. The scenarios where they are beneficial (passing stable callbacks to memoized children, memoizing expensive calculations) are also the same.
>
> **Key Takeaway:** Your existing knowledge of these Hooks from React web development is directly transferable to React Native.

### Exercise

Apply `useCallback` to optimize a component that passes a function to a memoized child.

- **Exercise 9.2: Optimizing with `useCallback`**
  - **Objective:** You are given a parent component that lists medication reminders and a memoized child component `ReminderItem` that displays each reminder and has a delete button. The `ReminderItem` re-renders unnecessarily when the parent re-renders due to other state changes. Optimize this using `useCallback` for the delete handler.
  - **Instructions:**
    1. Create a simple `ReminderItem` component that accepts `reminderText` and an `onDelete` function prop. Wrap it with `React.memo`.
    2. In the parent component, manage a list of reminder strings in state.
    3. Provide an `onDelete` function to `ReminderItem` to remove a reminder from the list.
    4. Add a button or other state in the parent that causes it to re-render without changing the reminders list.
    5. Observe (e.g., with `console.log` in `ReminderItem`) that `ReminderItem` re-renders on parent re-render.
    6. Apply `useCallback` to the `onDelete` handler in the parent component to prevent unnecessary re-renders of `ReminderItem`.
  - **Tool:** [**(https://snack.expo.dev/)**](https://snack.expo.dev/) (A new Snack will need to be created for this exercise).
