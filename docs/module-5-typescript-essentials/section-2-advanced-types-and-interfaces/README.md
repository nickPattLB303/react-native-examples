# Section 2: Advanced Types and Interfaces

## Learning Objectives
After completing this section, you will be able to:
- Implement advanced TypeScript interfaces with optional and readonly properties
- Create and use interface extension and implementation
- Work with intersection and union types for complex type relationships
- Apply type guards and type assertions to ensure type safety
- Implement generic types for reusable, type-safe components
- Use utility types to transform existing types in useful ways
- Apply literal types and type narrowing techniques

**Prerequisite Knowledge**: Basic TypeScript types and interfaces
**Estimated Time**: 45-60 minutes

## Section Overview
This section builds upon the TypeScript fundamentals by exploring more advanced typing features that are particularly useful in React Native development. You'll learn how to create sophisticated type definitions that can model complex data structures, enhance code reusability with generics, and ensure type safety throughout your application.

## Key Concepts

### Advanced Interface Features
```typescript
interface Medication {
  id: number;
  name: string;
  dosage: number;
  unit: string;
  frequency: string;
  
  // Optional properties (may not always be present)
  instructions?: string;
  sideEffects?: string[];
  
  // Readonly properties (cannot be modified after creation)
  readonly ndc: string;
  
  // Index signature for additional properties
  [key: string]: any;
}

// Interface extension
interface ControlledMedication extends Medication {
  controlledSubstanceSchedule: 1 | 2 | 3 | 4 | 5;
  prescriptionRequired: true;
  quantityLimit?: number;
}
```

### Union and Intersection Types
```typescript
// Union type (can be one of several types)
type MedicationIdentifier = number | string;

// Function that accepts a union type
function getMedication(id: MedicationIdentifier): Medication {
  // Implementation...
  return medication;
}

// Intersection type (combines multiple types)
type AdministrativePerson = Employee & MedicalProfessional;

// This object must satisfy both Employee and MedicalProfessional interfaces
const pharmacist: AdministrativePerson = {
  employeeId: "E123",
  department: "Pharmacy",
  hireDate: new Date("2020-01-15"),
  licenseNumber: "RX12345",
  specialty: "Clinical Pharmacy",
  certifications: ["Board Certified Pharmacotherapy Specialist"]
};
```

### Type Guards and Type Assertions
```typescript
// Type guard using typeof
function processIdentifier(id: string | number) {
  if (typeof id === "string") {
    // In this block, TypeScript knows id is a string
    return id.toUpperCase();
  } else {
    // In this block, TypeScript knows id is a number
    return id.toFixed(0);
  }
}

// Type guard using instanceof
function processMedication(medication: Medication | ControlledMedication) {
  if ("controlledSubstanceSchedule" in medication) {
    // In this block, TypeScript treats medication as ControlledMedication
    console.log(`Schedule ${medication.controlledSubstanceSchedule} controlled substance`);
  }
}

// Custom type guard function
function isControlledMedication(medication: Medication): medication is ControlledMedication {
  return (medication as ControlledMedication).controlledSubstanceSchedule !== undefined;
}

// Type assertion
const medicationData: any = fetchMedicationFromAPI();
const medication = medicationData as Medication;
```

### Generic Types
```typescript
// Generic interface
interface MedicationContainer<T> {
  data: T;
  lastUpdated: Date;
  status: "active" | "discontinued" | "recalled";
}

// Using the generic interface
const antibioticData: MedicationContainer<Medication> = {
  data: {
    id: 1,
    name: "Amoxicillin",
    dosage: 500,
    unit: "mg",
    frequency: "3 times daily",
    ndc: "68462-135"
  },
  lastUpdated: new Date(),
  status: "active"
};

// Generic function
function getFirstItem<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

const firstMedication = getFirstItem<Medication>(medications);
```

### Utility Types
```typescript
// Partial - makes all properties optional
function updateMedication(id: number, changes: Partial<Medication>) {
  // Implementation updates only the provided fields
}

// Readonly - makes all properties readonly
const fixedMedicationList: Readonly<Medication[]> = getMedicationList();

// Pick - creates a type with only the specified properties
type MedicationBasicInfo = Pick<Medication, "id" | "name" | "dosage" | "unit">;

// Omit - creates a type without the specified properties
type MedicationWithoutMetadata = Omit<Medication, "createdAt" | "updatedAt">;

// Record - creates a type with properties from Keys and values of Type
type MedicationSchedule = Record<string, Medication[]>;
```

### Literal Types and Type Narrowing
```typescript
// String literal types
type DosageUnit = "mg" | "ml" | "ug" | "tablet" | "capsule";

// Numeric literal types
type ControlledSubstanceSchedule = 1 | 2 | 3 | 4 | 5;

// Combining with other types
interface MedicationDosage {
  value: number;
  unit: DosageUnit;
  route: "oral" | "topical" | "intravenous" | "intramuscular";
}

// Type narrowing
function getAdministrationInstructions(dosage: MedicationDosage): string {
  let instructions = `Take ${dosage.value} ${dosage.unit}`;
  
  switch (dosage.route) {
    case "oral":
      instructions += " by mouth";
      break;
    case "topical":
      instructions += " applied to affected area";
      break;
    case "intravenous":
      instructions += " administered via IV";
      break;
    case "intramuscular":
      instructions += " administered via injection";
      break;
  }
  
  return instructions;
}
```

## Practice Exercise: Pharmacy Inventory System
Implement a TypeScript-based pharmacy inventory system with the following requirements:

1. Create a generic `InventoryItem<T>` interface that can work with different types of products
2. Implement interfaces for different product types (medications, medical supplies, etc.)
3. Create a type union for different inventory actions (restock, dispense, adjust)
4. Implement type guards to handle different inventory actions appropriately
5. Use utility types to create specialized views of your inventory data

## Additional Resources
- [TypeScript Advanced Types Documentation](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/generics.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

> 🔍 **Instructor Note**: When teaching advanced types, focus on practical use cases in React Native development. Show how these typing features solve real problems, such as dealing with API responses, component props, and state management.

> 🚀 **Self-Led Learners**: Experiment with combining different type features to create increasingly sophisticated type definitions. Try to understand the "why" behind each feature rather than just the syntax.

> 🔄 **For Android Developers**: TypeScript generics are similar to Java generics but have subtle differences. Pay attention to how TypeScript's structural typing affects how generics work.

> 🔄 **For iOS Developers**: TypeScript's advanced type features like union types and intersection types may be unfamiliar even if you know Swift. These powerful features enable patterns that might be implemented differently in Swift. 