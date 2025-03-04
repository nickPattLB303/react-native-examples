# Section 1: TypeScript Fundamentals

## Learning Objectives
After completing this section, you will be able to:
- Explain the primary benefits of TypeScript in React Native development
- Set up a TypeScript environment for React Native projects
- Understand basic TypeScript types and type annotations
- Define variables with explicit and implicit typing
- Create and use interfaces for object typing
- Implement type aliases for complex or reused types
- Configure TypeScript compiler options for React Native

**Prerequisite Knowledge**: JavaScript variables, functions, and objects
**Estimated Time**: 45-60 minutes

## Section Overview
This section introduces the fundamentals of TypeScript and how it enhances JavaScript with static typing. You'll learn why TypeScript is valuable for React Native development and how to implement basic types to make your code more robust. We'll cover the TypeScript features most relevant to React Native development while focusing on practical applications rather than theoretical concepts.

## Key Concepts

### Why TypeScript for React Native?
- **Early Error Detection**: Catches type-related errors during development instead of runtime
- **Improved IDE Support**: Better code completion, navigation, and refactoring tools
- **Enhanced Code Documentation**: Types serve as living documentation of your code
- **Safer Refactoring**: Type checking helps ensure changes don't break existing functionality
- **Team Collaboration**: Makes code intent clearer and helps new developers understand the codebase

### Basic TypeScript Types
```tsx
// Primitive types
const patientName: string = "Sarah Johnson";
const medicationCount: number = 3;
const isPrescriptionFilled: boolean = true;

// Arrays
const medicationNames: string[] = ["Lisinopril", "Metformin", "Atorvastatin"];
const dosages: Array<number> = [10, 500, 20]; // Alternative syntax

// Tuples (fixed-length arrays with different types)
const medicationInfo: [string, number, string] = ["Amoxicillin", 500, "mg"];

// Enums
enum MedicationCategory {
  ANTIBIOTIC,
  ANALGESIC,
  ANTIHYPERTENSIVE,
  ANTIDIABETIC
}
const category: MedicationCategory = MedicationCategory.ANTIBIOTIC;

// Any type (avoid when possible)
let userData: any = JSON.parse(dataFromApi);

// Void type (no return value)
function logMedication(name: string): void {
  console.log(`Medication logged: ${name}`);
}

// Union types
type DosageUnit = "mg" | "ml" | "ug" | "tablet";
const amoxicillinUnit: DosageUnit = "mg";
```

### Interfaces for Object Typing
```tsx
interface Medication {
  id: number;
  name: string;
  dosage: number;
  unit: string;
  frequency: string;
  isControlled: boolean;
}

const lisinopril: Medication = {
  id: 1,
  name: "Lisinopril",
  dosage: 10,
  unit: "mg",
  frequency: "once daily",
  isControlled: false
};
```

### Type Aliases
```tsx
// Simple type alias
type MedicationId = number;

// Complex type alias
type Prescription = {
  id: MedicationId;
  patientId: number;
  medications: Medication[];
  prescribedDate: Date;
  refillsRemaining: number;
};
```

### TypeScript Configuration for React Native
The `tsconfig.json` file configures the TypeScript compiler options:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2019"],
    "jsx": "react-native",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

## Practice Exercise: Medication Types
Create TypeScript interfaces and types for a medication tracking system:

1. Define an interface for a `Patient` with properties: `id`, `name`, `dateOfBirth`, and `allergies`
2. Create an interface for a `Medication` with properties: `id`, `name`, `dosage`, `unit`, and `sideEffects`
3. Define a `Prescription` interface that includes a patient, medications, and prescription details
4. Create a type alias for `DosageUnit` that allows only specific string values
5. Implement these types in a simple medication tracking system

## Additional Resources
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)
- [TypeScript Playground](https://www.typescriptlang.org/play)

> 🔍 **Instructor Note**: When teaching this section, use real examples from React Native codebases to demonstrate how TypeScript improves the development experience. Show how TypeScript catches common errors that would be runtime issues in plain JavaScript.

> 🚀 **Self-Led Learners**: Use the TypeScript Playground to experiment with different types and see how the compiler responds to errors. Try converting JavaScript examples from previous modules to TypeScript.

> 🔄 **For Android/iOS Developers**: TypeScript's type system should feel somewhat familiar if you're coming from a statically typed language like Java, Kotlin, or Swift. Pay attention to the differences, particularly TypeScript's structural typing system versus nominal typing in Java/Kotlin/Swift. 