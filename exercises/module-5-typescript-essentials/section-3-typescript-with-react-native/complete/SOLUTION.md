# Medication Tracker Solution Guide

This guide explains the implementation of the Medication Tracker app, focusing on the TypeScript concepts used.

## Overview

The Medication Tracker app demonstrates how to use TypeScript with React Native to create a type-safe application. The app allows users to:

1. View a list of their medications
2. Mark medications as taken or untaken
3. See a summary of their medication progress

## TypeScript Implementation Details

### 1. Defining Interfaces

We start by defining a `Medication` interface that specifies the shape of our medication data:

```tsx
interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}
```

This interface ensures that all medication objects in our app have the required properties with the correct types.

### 2. Typed Component Props

For each component, we define explicit interfaces for their props:

```tsx
interface MedicationItemProps {
  medication: Medication;
  onToggle: (id: number) => void;
}
```

```tsx
interface MedicationListProps {
  medications: Medication[];
  onToggleMedication: (id: number) => void;
}
```

```tsx
interface SummaryProps {
  medications: Medication[];
}
```

These interfaces make it clear what props each component expects and their types.

### 3. Using React.FC for Component Types

For each component, we use the `React.FC` (FunctionComponent) generic type with our prop interfaces:

```tsx
const MedicationItem: React.FC<MedicationItemProps> = ({ medication, onToggle }) => {
  // Component implementation
};
```

This pattern provides proper type checking for the component props and ensures the component returns a valid React element.

### 4. Typed State Management

In the App component, we use the useState hook with TypeScript generics to ensure type safety for our state:

```tsx
const [medications, setMedications] = useState<Medication[]>(initialMedications);
```

This ensures that:
- `medications` will always be an array of objects matching the `Medication` interface
- `setMedications` only accepts values that match this type

### 5. Type-Safe Event Handlers

The `handleToggleMedication` function is explicitly typed with a return type:

```tsx
const handleToggleMedication = (id: number): void => {
  // Implementation
};
```

This makes it clear that the function takes a number parameter and doesn't return anything.

### 6. Explicit Types for Function Parameters

Throughout the code, we explicitly type function parameters to ensure type safety:

```tsx
keyExtractor={(item) => item.id.toString()}
```

```tsx
const taken = medications.filter(med => med.taken).length;
```

TypeScript automatically infers many of these types, but the explicit typing in our interfaces ensures everything is consistent.

## Key TypeScript Benefits in this Implementation

1. **Compiler-Checked Props**: TypeScript will catch errors if we try to pass incorrect props to components.

2. **Autocomplete Support**: TypeScript provides IDE autocomplete for component props and methods.

3. **Self-Documenting Code**: The interfaces serve as documentation for the data structures and component APIs.

4. **Refactoring Safety**: If we need to change the structure of our data or component props, TypeScript will help identify all the places that need to be updated.

5. **Null/Undefined Prevention**: TypeScript helps prevent common errors related to null or undefined values.

## Styling with TypeScript

While not explicitly using TypeScript for styles in this example, TypeScript can also be used to type StyleSheet properties:

```tsx
interface Styles {
  container: ViewStyle;
  title: TextStyle;
  // other style properties
}

const styles = StyleSheet.create<Styles>({
  // styles implementation
});
```

This approach adds type checking to your styles, preventing errors like using text-specific properties on View components.

## Conclusion

This implementation demonstrates how TypeScript can be used with React Native to create more robust applications with better developer experience. The explicit typing helps catch errors early, provides better tooling support, and makes the code more maintainable. 