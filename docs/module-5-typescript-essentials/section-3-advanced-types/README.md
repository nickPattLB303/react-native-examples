# Section 3: Advanced Type Features

## Learning Objectives
After completing this section, you will be able to:
- Work with generic types and constraints
- Use utility types for type manipulation
- Understand mapped and conditional types
- Apply advanced type features in React Native components

**Prerequisite Knowledge**: Basic Types and Interfaces (Section 2)
**Estimated Time**: 45-60 minutes

## Generic Types

Generic types allow you to write reusable code that works with different types while maintaining type safety.

### Basic Generic Function

```typescript
function createMedication<T>(name: string, dosage: T): { name: string; dosage: T } {
  return { name, dosage };
}

const medication1 = createMedication("Amoxicillin", 500);  // T is number
const medication2 = createMedication("Lisinopril", "10mg");  // T is string
```

### Generic Interface

```typescript
interface MedicationContainer<T> {
  id: number;
  medication: T;
  quantity: number;
}

const prescriptionContainer: MedicationContainer<Prescription> = {
  id: 1,
  medication: {
    id: 1,
    name: "Amoxicillin",
    dosage: 500,
    frequency: "3x daily",
    isActive: true
  },
  quantity: 30
};

const otcContainer: MedicationContainer<OverTheCounter> = {
  id: 2,
  medication: {
    id: 2,
    name: "Ibuprofen",
    dosage: 200,
    frequency: "as needed",
    isActive: true
  },
  quantity: 50
};
```

### Generic Constraints

```typescript
interface HasDosage {
  dosage: number;
}

function getDosage<T extends HasDosage>(medication: T): number {
  return medication.dosage;
}

// This works because both types have a dosage property
const prescriptionDosage = getDosage(prescriptionContainer.medication);
const otcDosage = getDosage(otcContainer.medication);
```

## Utility Types

TypeScript provides several utility types to help manipulate types.

### Partial<T>

Makes all properties of a type optional.

```typescript
interface Medication {
  id: number;
  name: string;
  dosage: number;
  frequency: string;
}

type PartialMedication = Partial<Medication>;
// Equivalent to:
// {
//   id?: number;
//   name?: string;
//   dosage?: number;
//   frequency?: string;
// }

function updateMedication(id: number, updates: PartialMedication): void {
  // Update medication with partial data
}
```

### Pick<T, K>

Selects specific properties from a type.

```typescript
type MedicationBasic = Pick<Medication, 'name' | 'dosage'>;
// Equivalent to:
// {
//   name: string;
//   dosage: number;
// }
```

### Omit<T, K>

Removes specific properties from a type.

```typescript
type MedicationWithoutId = Omit<Medication, 'id'>;
// Equivalent to:
// {
//   name: string;
//   dosage: number;
//   frequency: string;
// }
```

### Record<K, T>

Creates a type with properties of type K and values of type T.

```typescript
type MedicationInventory = Record<string, Medication>;
// Equivalent to:
// {
//   [key: string]: Medication;
// }

const inventory: MedicationInventory = {
  'AMOX-001': {
    id: 1,
    name: "Amoxicillin",
    dosage: 500,
    frequency: "3x daily"
  },
  'LIS-001': {
    id: 2,
    name: "Lisinopril",
    dosage: 10,
    frequency: "1x daily"
  }
};
```

## Mapped Types

Mapped types allow you to create new types based on existing ones by transforming their properties.

### Basic Mapped Type

```typescript
type ReadonlyMedication = {
  readonly [P in keyof Medication]: Medication[P];
};

// Makes all properties readonly
const readonlyMedication: ReadonlyMedication = {
  id: 1,
  name: "Amoxicillin",
  dosage: 500,
  frequency: "3x daily"
};
// readonlyMedication.name = "New Name"; // Error
```

### Conditional Types

Conditional types allow you to create types that depend on other types.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type MedicationName = NonNullable<string | null | undefined>; // string
type MedicationDosage = NonNullable<number | null | undefined>; // number

// In practice
function getMedicationName(medication: Medication | null): NonNullable<Medication['name']> {
  if (!medication) throw new Error('Medication is null');
  return medication.name;
}
```

## Advanced Type Features in React Native

### Generic Components

```typescript
interface ListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function GenericList<T>({ data, renderItem, keyExtractor }: ListProps<T>): React.ReactElement {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
    />
  );
}

// Usage
const MedicationList: React.FC = () => {
  const medications: Medication[] = [
    { id: 1, name: "Amoxicillin", dosage: 500, frequency: "3x daily", isActive: true },
    { id: 2, name: "Lisinopril", dosage: 10, frequency: "1x daily", isActive: true }
  ];

  return (
    <GenericList
      data={medications}
      renderItem={(item) => (
        <MedicationItem medication={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
```

### Type-Safe Event Handlers

```typescript
type MedicationEvent = {
  type: 'ADD' | 'UPDATE' | 'DELETE';
  payload: Medication;
};

interface MedicationContextType {
  medications: Medication[];
  dispatch: (event: MedicationEvent) => void;
}

const MedicationContext = React.createContext<MedicationContextType | undefined>(undefined);

function MedicationProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [medications, dispatch] = useReducer(medicationReducer, []);

  return (
    <MedicationContext.Provider value={{ medications, dispatch }}>
      {children}
    </MedicationContext.Provider>
  );
}
```

> 💡 **Deep Dive**: TypeScript's type system is Turing complete, meaning you can express complex computations at the type level. This is particularly useful for creating sophisticated type utilities and ensuring type safety in complex applications.

## Exercise: Create a Generic Medication Management System

Using Expo Snack, create a generic medication management system that includes:

1. Create a generic `MedicationContainer` component that can work with different types of medications
2. Implement utility types for medication updates and filtering
3. Create type-safe event handlers for medication actions
4. Use mapped types to create read-only versions of medication data

**CodePen Link**: [Generic Medication System Exercise](https://codepen.io/your-username/pen/create)

> 🚀 **Self-Led Learners**: After completing the exercise, try implementing more advanced type features like conditional types and type inference utilities.

## Key Takeaways

- Generic types enable reusable, type-safe code
- Utility types help manipulate and transform types
- Mapped types create new types based on existing ones
- Conditional types enable type-level decision making
- Advanced type features help create more robust React Native applications 