# Section 1: Introduction to TypeScript

## Learning Objectives
After completing this section, you will be able to:
- Explain what TypeScript is and its benefits
- Set up TypeScript in a React Native project
- Understand basic type annotations
- Use TypeScript with React Native components

**Prerequisite Knowledge**: JavaScript Essentials (Module 4)
**Estimated Time**: 45-60 minutes

## What is TypeScript?

TypeScript is a statically typed superset of JavaScript that adds optional type checking and other features to help you write more reliable code. It was developed by Microsoft and has become the de facto standard for large-scale JavaScript applications.

### Key Benefits

1. **Type Safety**
   ```typescript
   // JavaScript
   function calculateDosage(weight, concentration) {
     return weight * 0.001 * concentration;
   }
   
   // TypeScript
   function calculateDosage(weight: number, concentration: number): number {
     return weight * 0.001 * concentration;
   }
   ```

2. **Better IDE Support**
   - Autocomplete
   - Inline documentation
   - Error detection
   - Refactoring tools

3. **Enhanced Code Quality**
   - Catch errors at compile time
   - Self-documenting code
   - Easier maintenance
   - Better team collaboration

> 💡 **Deep Dive**: TypeScript's type system is structural, meaning it checks the shape of data rather than its explicit type. This makes it more flexible than traditional static typing while still providing type safety.

## Setting Up TypeScript in React Native

### 1. Install Dependencies

```bash
npm install --save-dev typescript @types/react @types/react-native
```

### 2. Create TypeScript Configuration

Create a `tsconfig.json` file in your project root:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2017"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

### 3. Rename Files

- Change `.js` files to `.tsx` for React components
- Change `.js` files to `.ts` for non-React files

## Basic Type Annotations

### Primitive Types

```typescript
// Basic types
let medicationName: string = "Amoxicillin";
let dosage: number = 500;
let isActive: boolean = true;

// Arrays
let medications: string[] = ["Amoxicillin", "Lisinopril", "Metformin"];
let dosages: number[] = [500, 10, 1000];

// Tuples
let medicationInfo: [string, number] = ["Amoxicillin", 500];
```

### Type Inference

TypeScript can often infer types automatically:

```typescript
// TypeScript infers these types
let medicationName = "Amoxicillin"; // string
let dosage = 500; // number
let medications = ["Amoxicillin", "Lisinopril"]; // string[]
```

> 🔄 **For Android Developers**: TypeScript's type inference is similar to Kotlin's type inference system, where the compiler can often determine types without explicit declarations.

## TypeScript with React Native Components

### Basic Component with Types

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MedicationProps {
  name: string;
  dosage: number;
  frequency: string;
}

const MedicationItem: React.FC<MedicationProps> = ({ name, dosage, frequency }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{dosage}mg, {frequency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: '#666'
  }
});

export default MedicationItem;
```

### Using the Component

```typescript
import React from 'react';
import { View } from 'react-native';
import MedicationItem from './MedicationItem';

const MedicationList: React.FC = () => {
  return (
    <View>
      <MedicationItem 
        name="Amoxicillin"
        dosage={500}
        frequency="3x daily"
      />
    </View>
  );
};

export default MedicationList;
```

> 💡 **Deep Dive**: The `React.FC` type (Function Component) is a generic type that includes the children prop type and other React-specific types. It's a convenient way to type React components.

## Exercise: Convert a Component to TypeScript

Using Expo Snack, convert the following JavaScript component to TypeScript:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicationCard = ({ name, dosage, frequency }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{dosage}mg, {frequency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: '#666'
  }
});

export default MedicationCard;
```

**CodePen Link**: [TypeScript Component Exercise](https://codepen.io/your-username/pen/create)

In this exercise, you'll:
1. Add type annotations for the component props
2. Use the `React.FC` type
3. Add proper type definitions for the styles
4. Export the component with proper typing

> 🚀 **Self-Led Learners**: After completing the exercise, try adding more props to the component with different types (arrays, objects, etc.) to practice TypeScript's type system.

## Key Takeaways

- TypeScript adds static typing to JavaScript
- Type annotations help catch errors early
- TypeScript provides better IDE support
- React Native components can be typed using interfaces and `React.FC`
- TypeScript's type inference reduces the need for explicit type annotations 