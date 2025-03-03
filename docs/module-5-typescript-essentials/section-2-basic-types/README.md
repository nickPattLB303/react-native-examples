# Section 2: Basic Types and Interfaces

## Learning Objectives
After completing this section, you will be able to:
- Define and use interfaces for component props and data structures
- Work with union and intersection types
- Understand type aliases and their use cases
- Apply type guards and type assertions

**Prerequisite Knowledge**: Introduction to TypeScript (Section 1)
**Estimated Time**: 45-60 minutes

## Interfaces

Interfaces define the shape of objects and are a powerful way to describe the structure of your data.

### Basic Interface

```typescript
interface Medication {
  id: number;
  name: string;
  dosage: number;
  frequency: string;
  isActive: boolean;
}

const medication: Medication = {
  id: 1,
  name: "Amoxicillin",
  dosage: 500,
  frequency: "3x daily",
  isActive: true
};
```

### Optional Properties

```typescript
interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: number;
  refills?: number;  // Optional property
  notes?: string;    // Optional property
}

const prescription: Prescription = {
  id: 1,
  patientName: "John Doe",
  medication: "Lisinopril",
  dosage: 10
  // refills and notes are optional
};
```

### Read-only Properties

```typescript
interface PharmacyOrder {
  readonly orderId: string;  // Cannot be modified after creation
  readonly createdAt: Date;  // Cannot be modified after creation
  status: 'pending' | 'processing' | 'completed';
  items: Medication[];
}

const order: PharmacyOrder = {
  orderId: "ORD123",
  createdAt: new Date(),
  status: "pending",
  items: []
};
// order.orderId = "ORD456"; // Error: Cannot assign to 'orderId' because it is a read-only property
```

## Type Aliases

Type aliases provide a way to create custom types using the `type` keyword.

### Basic Type Alias

```typescript
type DosageUnit = 'mg' | 'ml' | 'g';
type Frequency = 'once' | 'twice' | 'three times' | 'four times';

interface MedicationDosage {
  amount: number;
  unit: DosageUnit;
  frequency: Frequency;
}

const dosage: MedicationDosage = {
  amount: 500,
  unit: 'mg',
  frequency: 'three times'
};
```

### Union Types

```typescript
type MedicationStatus = 'active' | 'discontinued' | 'on-hold';
type MedicationType = 'prescription' | 'over-the-counter' | 'supplement';

interface Medication {
  id: number;
  name: string;
  status: MedicationStatus;
  type: MedicationType;
  dosage: MedicationDosage;
}
```

### Intersection Types

```typescript
interface BaseMedication {
  id: number;
  name: string;
  dosage: number;
}

interface PrescriptionDetails {
  prescriptionNumber: string;
  prescribingDoctor: string;
  refills: number;
}

type PrescriptionMedication = BaseMedication & PrescriptionDetails;

const prescription: PrescriptionMedication = {
  id: 1,
  name: "Amoxicillin",
  dosage: 500,
  prescriptionNumber: "RX123",
  prescribingDoctor: "Dr. Smith",
  refills: 2
};
```

> 💡 **Deep Dive**: Union types (`|`) represent values that can be one of several types, while intersection types (`&`) combine multiple types into one. This is similar to how set theory works with unions and intersections.

## Type Guards

Type guards help TypeScript narrow down the type of a variable within a conditional block.

### Typeof Guards

```typescript
function processMedication(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}
```

### Instanceof Guards

```typescript
class Prescription {
  constructor(
    public id: number,
    public medication: string,
    public dosage: number
  ) {}
}

class OverTheCounter {
  constructor(
    public id: number,
    public medication: string,
    public dosage: number
  ) {}
}

function processMedication(item: Prescription | OverTheCounter): string {
  if (item instanceof Prescription) {
    return `Prescription: ${item.medication}`;
  } else {
    return `OTC: ${item.medication}`;
  }
}
```

### Custom Type Guards

```typescript
interface Prescription {
  type: 'prescription';
  prescriptionNumber: string;
  medication: string;
}

interface OverTheCounter {
  type: 'otc';
  medication: string;
}

function isPrescription(item: Prescription | OverTheCounter): item is Prescription {
  return item.type === 'prescription';
}

function processMedication(item: Prescription | OverTheCounter): string {
  if (isPrescription(item)) {
    return `Prescription #${item.prescriptionNumber}: ${item.medication}`;
  } else {
    return `OTC: ${item.medication}`;
  }
}
```

## Type Assertions

Type assertions tell TypeScript that you know more about a type than it can infer.

### Basic Type Assertion

```typescript
const medicationData = {
  name: "Amoxicillin",
  dosage: 500,
  frequency: "3x daily"
} as const;  // Makes all properties readonly

// Without type assertion
const dosage = medicationData.dosage as number;

// With type assertion
const dosage = medicationData.dosage;  // TypeScript knows it's a number
```

### Type Assertion with Generics

```typescript
interface MedicationResponse {
  data: {
    medications: Medication[];
  };
}

async function fetchMedications(): Promise<MedicationResponse> {
  const response = await fetch('/api/medications');
  return response.json() as Promise<MedicationResponse>;
}
```

> 🔄 **For Android Developers**: Type assertions in TypeScript are similar to type casting in Java/Kotlin, but they're more flexible and don't perform runtime checks.

## Exercise: Create a Type-Safe Medication System

Using Expo Snack, create a type-safe medication management system that includes:

1. Define interfaces for:
   - Medication
   - Prescription
   - Pharmacy Order
   - Patient

2. Create type guards to handle different types of medications

3. Implement a function that processes different types of medications

4. Use type assertions where appropriate

**CodePen Link**: [Type-Safe Medication System Exercise](https://codepen.io/your-username/pen/create)

> 🚀 **Self-Led Learners**: After completing the exercise, try adding more complex types like generics and utility types to make the system more flexible.

## Key Takeaways

- Interfaces define the shape of objects
- Type aliases create custom types
- Union and intersection types combine types in different ways
- Type guards help narrow down types in conditional blocks
- Type assertions tell TypeScript about types it can't infer 