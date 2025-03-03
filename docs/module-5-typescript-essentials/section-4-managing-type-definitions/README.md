# Section 4: Managing Type Definitions

## Learning Objectives
After completing this section, you will be able to:
- Install and use type definitions for third-party libraries
- Create your own type declaration files
- Resolve common type errors in React Native projects
- Implement proper module augmentation techniques
- Understand and use TypeScript configuration options
- Apply strategies for working with partially typed or untyped libraries
- Implement robust type organization patterns for React Native projects

**Prerequisite Knowledge**: TypeScript basics and its application in React Native
**Estimated Time**: 45-60 minutes

## Section Overview
This section addresses the practical challenges of working with TypeScript in a React Native ecosystem. You'll learn how to manage type definitions for both internal code and external libraries, resolve common typing issues, and establish best practices for organizing types in larger projects. These skills are essential for maintaining type safety and developer productivity in real-world React Native applications.

## Key Concepts

### Using DefinitelyTyped Packages

Many JavaScript libraries don't include TypeScript definitions out of the box. The DefinitelyTyped repository provides type definitions for thousands of JavaScript libraries through `@types` packages:

```bash
# Installing types for a third-party library
npm install --save-dev @types/lodash

# For React Native specific libraries
npm install --save-dev @types/react-native
```

### Creating Custom Declaration Files

When working with libraries that don't have type definitions, you can create your own:

```typescript
// types/medication-scheduler/index.d.ts

declare module 'medication-scheduler' {
  export interface ScheduleOptions {
    reminderTime: string;
    daysOfWeek: number[];
    patientTimezone: string;
    soundEnabled: boolean;
  }
  
  export interface ScheduleResult {
    success: boolean;
    scheduleId: string;
    nextReminder: Date;
  }
  
  export function scheduleReminder(
    medicationId: string, 
    options: ScheduleOptions
  ): Promise<ScheduleResult>;
  
  export function cancelReminder(scheduleId: string): Promise<{ success: boolean }>;
  
  export function listScheduledReminders(): Promise<{ 
    reminders: Array<{ 
      id: string; 
      medicationId: string; 
      nextReminder: Date 
    }> 
  }>;
}
```

Add the type declaration path to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    // Other options...
    "typeRoots": ["./node_modules/@types", "./types"]
  }
}
```

### Module Augmentation

You can extend existing types from libraries using module augmentation:

```typescript
// types/react-native-augmentation.d.ts

// Augment the React Navigation module
import 'react-navigation';

declare module 'react-navigation' {
  export interface NavigationParams {
    // Add your custom global navigation parameters
    medicationId?: string;
    returnToPharmacy?: boolean;
    prescriptionId?: string;
  }
}

// Augment React Native's StyleSheet
import 'react-native';

declare module 'react-native' {
  namespace StyleSheet {
    // Add a pharmacy-specific color palette
    interface PharmacyColors {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      error: string;
      success: string;
      warning: string;
    }
    
    export const pharmacyColors: PharmacyColors;
  }
}
```

### Managing Global Types

For application-wide types, create a central types file:

```typescript
// types/global.d.ts

// Global type definitions available throughout your app
declare global {
  // Global interfaces
  interface MedicationBase {
    id: string;
    name: string;
    genericName?: string;
    strength: string;
    form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'other';
  }
  
  // Global enums
  enum PrescriptionStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    ON_HOLD = 'on_hold',
    EXPIRED = 'expired'
  }
  
  // Global utility types
  type UUID = string;
  type ISO8601Date = string;
  type PhoneNumber = string;
  
  // Extend window or global objects if needed
  interface Window {
    medicationTracker: {
      track(medicationId: string, action: string): void;
      getStats(): { [key: string]: number };
    }
  }
}

// This export is necessary to make this a module
export {};
```

### Organizing Types in Larger Projects

For larger React Native projects, use a structured approach to types:

```
/src
  /types
    /api         # API response and request types
    /components  # Component prop and state types
    /models      # Business model types
    /navigation  # Navigation-related types
    /redux       # Redux state, action, and store types
    /utils       # Utility and helper types
    index.ts     # Re-exports for commonly used types
```

Example of a well-organized types structure:

```typescript
// src/types/models/medication.ts
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions?: string;
  sideEffects?: string[];
}

export interface ControlledMedication extends Medication {
  schedule: 1 | 2 | 3 | 4 | 5;
  prescriptionRequired: true;
}

export type MedicationForm = 'tablet' | 'capsule' | 'liquid' | 'cream' | 'injection';

// src/types/components/medication-list.ts
import { Medication } from '../models/medication';

export interface MedicationListProps {
  medications: Medication[];
  onSelectMedication: (medication: Medication) => void;
  isLoading?: boolean;
  error?: Error | null;
}

// src/types/index.ts
export * from './models/medication';
export * from './components/medication-list';
// ... other exports
```

### Handling Untyped Libraries

When working with untyped libraries, you have several options:

1. Use the `any` type as a temporary solution (not recommended for long-term):

```typescript
// Using any (avoid when possible)
const result = untypedLibrary.doSomething() as any;
```

2. Create minimal type definitions for just the parts you use:

```typescript
// Minimal type definitions
interface UntypedLibraryMethods {
  doSomething(): { success: boolean; data?: unknown };
  processData(input: string): Promise<unknown>;
}

// Type assertion for the library
const typedLibrary = untypedLibrary as UntypedLibraryMethods;
const result = typedLibrary.doSomething();
```

3. Use utility types to safely handle unknown data:

```typescript
import { z } from 'zod'; // A TypeScript-first schema validation library

// Define a schema for the expected data
const medicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  sideEffects: z.array(z.string()).optional()
});

// Type derived from the schema
type SafeMedication = z.infer<typeof medicationSchema>;

// Safely process data from untyped library
function processMedicationData(rawData: unknown): SafeMedication | null {
  try {
    return medicationSchema.parse(rawData);
  } catch (error) {
    console.error('Invalid medication data:', error);
    return null;
  }
}
```

## Practice Exercise: Third-Party Library Integration
Integrate a medication barcode scanning library into a React Native TypeScript project:

1. Create type definitions for the barcode scanning library
2. Implement module augmentation to add pharmacy-specific functionality
3. Create a custom hook with proper TypeScript definitions to use the scanner
4. Handle potential type errors and edge cases
5. Document your type definitions with JSDoc comments

## Additional Resources
- [DefinitelyTyped Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript Declaration Files Documentation](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [TypeScript Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
- [Zod: TypeScript-first schema validation](https://github.com/colinhacks/zod)

> 🔍 **Instructor Note**: This is often the most challenging aspect of using TypeScript in real-world projects. Allow extra time for questions and troubleshooting. Emphasize that type definitions are living documentation that should be maintained as the codebase evolves.

> 🚀 **Self-Led Learners**: When working with untyped libraries, start by creating minimal type definitions for just the functionality you need, then expand them as you use more features. Check GitHub and npm before creating your own types, as someone may have already created the definitions you need.

> 🔄 **For Android Developers**: The concept of type declarations is somewhat similar to creating interface definitions in Java, but TypeScript's declaration merging capabilities are more flexible. This might require some adjustment in your mental model.

> 🔄 **For iOS Developers**: TypeScript's declaration files serve a similar purpose to Swift's header files or interface declarations, but with the added benefit of being able to declare types for code you don't control. 