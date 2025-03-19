# Module 5 Challenge: TypeScript Pharmacy Management System

**Duration:** 30-60 minutes  
**Module:** 5 - TypeScript Essentials

## Objective

Apply your TypeScript knowledge to create a comprehensive pharmacy management system that demonstrates strong typing, interfaces, and type-safe React Native components.

## Challenge Description

In this challenge, you'll build a small pharmacy management system that allows users to:

1. View a list of medications with detailed type information
2. Add new medications with proper type validation
3. Track medication inventory with TypeScript generics
4. Implement type-safe state management
5. Create reusable, typed components for the pharmacy interface

This challenge will test your understanding of TypeScript fundamentals and how to apply them in a React Native application.

## Requirements

### 1. Type Definitions

Create a `types.ts` file with the following type definitions:

- `Medication` interface with comprehensive properties (id, name, dosage, etc.)
- `Prescription` interface that extends `Medication` with additional properties
- `Inventory` generic type that can track quantities of any item type
- `PharmacyUser` type with union types for different user roles
- At least one enum for categorizing medications
- A discriminated union type for different medication actions

### 2. Components

Create the following React Native components with proper TypeScript annotations:

- `MedicationList`: A component that displays a list of medications
- `MedicationForm`: A form component for adding new medications
- `InventoryTracker`: A component that uses generics to track inventory
- `PharmacyDashboard`: A main component that combines the other components

### 3. State Management

Implement type-safe state management using:

- Typed `useState` hooks
- Properly typed context (optional)
- Type-safe event handlers for user interactions

### 4. Advanced TypeScript Features

Demonstrate at least three of the following TypeScript features:

- Generic functions
- Type guards
- Mapped types
- Conditional types
- Utility types (Pick, Omit, Partial, etc.)
- Type assertions with proper constraints

### 5. Documentation

Add comprehensive JSDoc comments to:

- All interfaces and types
- Component props
- Functions and methods
- Complex type definitions

## Getting Started

1. Create a new directory for your challenge solution
2. Set up the basic file structure:
   - `types.ts` - For all type definitions
   - `components/` - For React Native components
   - `hooks/` - For custom hooks (if needed)
   - `utils/` - For utility functions
   - `App.tsx` - Main application component

3. Start by defining your types, then build components that use those types
4. Implement the state management with proper type annotations
5. Add comprehensive JSDoc documentation

## Example Type Definitions

Here's a starting point for your type definitions:

```typescript
/**
 * Represents a medication in the pharmacy system
 */
export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  dosage: number;
  dosageUnit: DosageUnit;
  medicationType: MedicationType;
  manufacturer: string;
  expirationDate: Date;
  inStock: boolean;
  sideEffects: string[];
}

/**
 * Valid dosage units for medications
 */
export type DosageUnit = 'mg' | 'mcg' | 'mL' | 'tablet' | 'capsule';

/**
 * Enum for medication types
 */
export enum MedicationType {
  OTC = 'Over the counter',
  PRESCRIPTION = 'Prescription only',
  CONTROLLED = 'Controlled substance'
}

/**
 * Generic inventory tracker
 * @template T - The type of item being tracked
 */
export interface Inventory<T> {
  item: T;
  quantity: number;
  location: string;
  lastUpdated: Date;
  updateStock: (newQuantity: number) => void;
}

// Add more types as needed...
```

## Example Component

Here's an example of a typed component:

```typescript
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Medication } from '../types';

/**
 * Props for the MedicationList component
 */
interface MedicationListProps {
  medications: Medication[];
  onSelectMedication?: (medication: Medication) => void;
  showOutOfStock?: boolean;
}

/**
 * Displays a list of medications with filtering options
 * 
 * @param props - Component properties
 * @returns A React Native component
 */
const MedicationList: React.FC<MedicationListProps> = ({
  medications,
  onSelectMedication,
  showOutOfStock = true
}) => {
  // Filter medications based on props
  const filteredMedications = showOutOfStock 
    ? medications 
    : medications.filter(med => med.inStock);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication List</Text>
      <FlatList
        data={filteredMedications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            {/* Implement your medication item UI */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default MedicationList;
```

## Platform-Specific Considerations

### Android Developers
Focus on how TypeScript interfaces compare to Java interfaces, and how TypeScript's structural typing differs from Java's nominal typing.

### iOS Developers
Pay attention to how TypeScript's optional types and interfaces compare to Swift's optionals and protocols.

### React Developers
Compare TypeScript's static typing to PropTypes, noting the enhanced developer experience and error catching.

### Angular Developers
Leverage your existing TypeScript knowledge, focusing on the differences in how React components use types compared to Angular.

## Evaluation Criteria

Your solution will be evaluated based on:

1. **Type Safety**: Proper use of TypeScript features to ensure type safety
2. **Code Organization**: Clear separation of types, components, and logic
3. **Component Design**: Well-designed, reusable components with proper props typing
4. **Documentation**: Comprehensive JSDoc comments
5. **Functionality**: Working implementation of the required features
6. **Advanced Features**: Effective use of advanced TypeScript features

## Submission

Create a zip file containing your solution and submit it according to the course instructions.

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
