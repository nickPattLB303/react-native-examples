# Exercise: Typed Medication Component

**Duration:** 15-20 minutes  
**Module:** 5 - TypeScript Essentials  
**Section:** TypeScript with React Native Components

## Objective

Practice using TypeScript with React Native components by creating a properly typed medication detail component that displays comprehensive information about a medication.

## Prerequisites

- Understanding of TypeScript basics (types, interfaces)
- Familiarity with React Native components
- Basic knowledge of React hooks

## Instructions

1. Create a TypeScript interface for a `Medication` type with the following properties:
   - `id`: string
   - `name`: string
   - `dosage`: number
   - `unit`: string (e.g., "mg", "mcg", "mL")
   - `frequency`: string (e.g., "twice daily", "every 8 hours")
   - `instructions`: string
   - `sideEffects`: string[]
   - `isActive`: boolean
   - `expirationDate`: Date

2. Create an interface for the component props that includes:
   - `medication`: Medication
   - `onPrescribe`: optional callback function that takes no arguments and returns void
   - `onMarkDiscontinued`: optional callback function that takes an id (string) and returns void

3. Implement a `MedicationDetail` component with proper TypeScript annotations:

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Your interfaces here

/**
 * MedicationDetail displays comprehensive information about a medication
 * 
 * @param props - Component properties containing medication data and callbacks
 * @returns A React Native component displaying medication details
 */
const MedicationDetail: React.FC<MedicationDetailProps> = ({ 
  medication,
  onPrescribe,
  onMarkDiscontinued
}) => {
  // Format the expiration date
  const formattedDate = medication.expirationDate.toLocaleDateString();
  
  // Implement the component UI here
  return (
    <View style={[styles.container, !medication.isActive && styles.inactive]}>
      {/* Implement the component UI */}
    </View>
  );
};

// Create StyleSheet here

export default MedicationDetail;
```

4. Complete the component implementation with:
   - Display all medication properties in a well-organized layout
   - Add conditional styling based on the `isActive` property
   - Implement buttons that call the callback functions when pressed
   - Add proper JSDoc documentation for the component and its props

5. Create a simple demo component that uses your `MedicationDetail` component with sample data:

```typescript
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MedicationDetail from './MedicationDetail';

// Create a demo component that uses MedicationDetail with sample data
const MedicationDemo: React.FC = () => {
  // Create sample data and implement state management
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Medication Details</Text>
      {/* Render MedicationDetail components with sample data */}
    </ScrollView>
  );
};

// Create StyleSheet here

export default MedicationDemo;
```

## Expected Output

Your completed exercise should:

1. Have properly typed interfaces for both the `Medication` type and component props
2. Display a well-styled medication detail component that shows all medication information
3. Include conditional styling for active/inactive medications
4. Implement functional buttons that call the provided callbacks
5. Include comprehensive JSDoc documentation
6. Have a demo component that showcases the `MedicationDetail` component with sample data

## Tips

- Use TypeScript's optional property syntax (`?`) for the callback functions
- Consider using a type alias for the dosage unit (e.g., `type DosageUnit = "mg" | "mcg" | "mL" | "tablet"`)
- Use React Native's `TouchableOpacity` for buttons with proper type-safe onPress handlers
- Remember to handle the case where a medication might be inactive
- Use conditional rendering to show/hide certain UI elements based on the medication's properties

## Platform-Specific Notes

### Android Developers
TypeScript interfaces are similar to Java interfaces but are more flexible. They're used for type checking at compile time but don't exist at runtime.

### iOS Developers
TypeScript's optional properties (using `?`) are similar to Swift's optional types. The component props pattern is comparable to passing a model object to a UIView.

### React Developers
This exercise replaces PropTypes with TypeScript interfaces for more robust type checking. The component structure remains the same as what you're used to in React.

### Angular Developers
React components with TypeScript will feel familiar if you've used Angular's typed components. The main difference is React's props vs. Angular's input properties.

## Learning Path Notes

### Instructor-Led
Demonstrate the creation of the interfaces first, then walk through the component implementation step by step. Highlight how TypeScript catches type errors during development.

### Self-Led
Try implementing the component without looking at the solution first. If you get stuck, refer to the TypeScript documentation or the React TypeScript Cheatsheet.

### Asynchronous
Focus on understanding how TypeScript interfaces define the shape of your data and component props. This pattern will be used throughout the rest of the course.

## Additional Resources

- [TypeScript Documentation - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Native TypeScript Documentation](https://reactnative.dev/docs/typescript)
