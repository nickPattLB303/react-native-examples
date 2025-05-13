## Section 5: Generics

Generics are a powerful feature in TypeScript that allow you to write reusable code that can work with a variety of types while maintaining type safety. Instead of using `any` and losing type information, generics allow you to create components (like functions, classes, or interfaces) that can operate on different types, where the actual type is specified when the component is used.

### Conceptual Content: Writing Reusable, Type-Safe Code

Imagine you need a function that returns the first element of an array. Without generics, you might write it like this:

```typescript
function getFirstElementAny(arr: any[]): any {
  return arr[0];
}

const firstNum = getFirstElementAny([1, 2, 3]); // firstNum is 'any'
const firstStr = getFirstElementAny(["a", "b", "c"]); // firstStr is 'any'
```

This works, but you lose type information. `firstNum` and `firstStr` are both of type `any`. Generics solve this problem.

**1. Generic Functions**

A generic function uses a type variable (conventionally `T`, `U`, `K`, `V`, etc.) to represent a type that will be specified later.

- **Syntax:**

  ```typescript
  function functionName<T>(param: T): T {
    // ...
    return param;
  }
  ```

  Here, `<T>` declares a type variable `T`. This `T` can then be used to type parameters and return values.

- **SpeedyMeds Example: Identity Function & Data Logger**

  Let's rewrite the `getFirstElement` function using generics:

  ```typescript
  function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
  }

  // Type inference: TypeScript infers T as number
  const firstPrescriptionId = getFirstElement([101, 102, 103]);
  console.log(firstPrescriptionId); // Type is number | undefined

  // Type inference: TypeScript infers T as string
  const firstPatientName = getFirstElement(["Alice Smith", "Bob Johnson"]);
  console.log(firstPatientName); // Type is string | undefined

  // Explicitly specifying the type
  const firstMedicationObject = getFirstElement<{
    name: string;
    dosage: string;
  }>([
    { name: "Amoxicillin", dosage: "250mg" },
    { name: "Ibuprofen", dosage: "200mg" },
  ]);
  console.log(firstMedicationObject?.name); // Type is { name: string; dosage: string; } | undefined
  ```

  Notice how `firstPrescriptionId` is correctly typed as `number | undefined` and `firstPatientName` as `string | undefined`. The type of `T` is inferred from the arguments passed, or it can be explicitly provided.

  Another example: a generic data logger for SpeedyMeds records.

  ```typescript
  interface PatientRecord {
    patientId: string;
    lastVisit: Date;
  }

  interface MedicationInventory {
    medicationId: string;
    name: string;
    stockLevel: number;
  }

  function logItemDetails<T>(item: T): void {
    console.log("Logging item details:");
    // For demonstration, we just stringify. In a real app, you might send this to a logging service.
    // You could add type guards here if you needed to access specific properties of T.
    console.log(JSON.stringify(item, null, 2));
  }

  const patientLog: PatientRecord = {
    patientId: "P001",
    lastVisit: new Date(),
  };
  const medicationLog: MedicationInventory = {
    medicationId: "M001",
    name: "Lisinopril",
    stockLevel: 500,
  };

  logItemDetails<PatientRecord>(patientLog);
  logItemDetails<MedicationInventory>(medicationLog);
  logItemDetails("Simple string log"); // T is inferred as string
  ```

**2. Generic Interfaces**

You can also create generic interfaces. This is useful for defining shapes for objects that can hold or operate on data of various types.

- **SpeedyMeds Example: `ApiResponse` Interface**

  Imagine an API that returns different types of data, but always wrapped in a common response structure.

  ```typescript
  interface ApiResponse<TData> {
    statusCode: number;
    message: string;
    data: TData; // The actual data payload will vary
    timestamp: Date;
  }

  interface Patient {
    id: string;
    name: string;
    age: number;
  }

  interface Medication {
    id: string;
    name: string;
    dosageForm: string;
  }

  // Example usage:
  const patientApiResponse: ApiResponse<Patient> = {
    statusCode: 200,
    message: "Patient data fetched successfully.",
    data: {
      id: "PAT123",
      name: "John Doe",
      age: 30,
    },
    timestamp: new Date(),
  };

  const medicationApiResponse: ApiResponse<Medication[]> = {
    statusCode: 200,
    message: "Medications list fetched.",
    data: [
      { id: "MED001", name: "Amoxicillin", dosageForm: "Capsule" },
      { id: "MED002", name: "Ibuprofen", dosageForm: "Tablet" },
    ],
    timestamp: new Date(),
  };

  console.log(`Patient: ${patientApiResponse.data.name}`);
  console.log(`First medication: ${medicationApiResponse.data[0].name}`);
  ```

**3. Generic Type Aliases**

Similar to interfaces, type aliases can also be generic.

- **SpeedyMeds Example: `Nullable` Type**

  ```typescript
  type Nullable<T> = T | null | undefined;

  let patientPhoneNumber: Nullable<string> = "555-1234";
  patientPhoneNumber = null;
  patientPhoneNumber = undefined;
  // patientPhoneNumber = 123; // Error: Type 'number' is not assignable to type 'Nullable<string>'.

  let medicationBatchId: Nullable<number> = 78901;
  medicationBatchId = null;

  console.log(patientPhoneNumber);
  console.log(medicationBatchId);
  ```

**4. Generic Classes**

Classes can also be generic. This allows you to create classes that can work with different types for their properties or methods.

- **SpeedyMeds Example: `DataCache<TItem>` Class**

  ```typescript
  interface Cacheable {
    id: string | number;
  }

  class DataCache<TItem extends Cacheable> {
    private cache: Map<string | number, TItem> = new Map();

    addItem(item: TItem): void {
      this.cache.set(item.id, item);
      console.log(`Cached item with ID: ${item.id}`);
    }

    getItem(id: string | number): TItem | undefined {
      return this.cache.get(id);
    }

    clearCache(): void {
      this.cache.clear();
      console.log("Cache cleared.");
    }

    listCachedIds(): (string | number)[] {
      return Array.from(this.cache.keys());
    }
  }

  // Usage with Patient data
  interface PatientProfile {
    id: string;
    name: string;
    lastConsultation: Date;
  }
  const patientCache = new DataCache<PatientProfile>();
  patientCache.addItem({
    id: "P001",
    name: "Alice Ray",
    lastConsultation: new Date(),
  });
  patientCache.addItem({
    id: "P002",
    name: "Bob Sanders",
    lastConsultation: new Date(),
  });
  console.log("Patient P001:", patientCache.getItem("P001"));

  // Usage with Medication data
  interface MedicationDetail {
    id: string; // NDC Code for example
    genericName: string;
    strength: string;
  }
  const medicationCache = new DataCache<MedicationDetail>();
  medicationCache.addItem({
    id: "NDC54321",
    genericName: "Metformin",
    strength: "500mg",
  });
  console.log("Medication NDC54321:", medicationCache.getItem("NDC54321"));
  console.log("Cached medication IDs:", medicationCache.listCachedIds());
  ```

**5. Generic Constraints**

Sometimes you want to constrain the types that can be used with a generic type variable. You can use the `extends` keyword to require that the type variable implements a certain interface or has certain properties.

- **SpeedyMeds Example: Logging items with an ID**

  ```typescript
  interface Identifiable {
    id: string | number; // Items must have an id property
  }

  function logItemId<T extends Identifiable>(item: T): void {
    console.log(`Item ID: ${item.id}`);
  }

  interface Pharmacy {
    id: string;
    name: string;
    location: string;
  }

  const myPharmacy: Pharmacy = {
    id: "PHARM001",
    name: "SpeedyMeds Downtown",
    location: "123 Main St",
  };
  const somePatient = { id: 101, patientName: "Jane Doe" }; // This object satisfies Identifiable
  const someOrder = { orderNumber: "ORD555", totalAmount: 50.25 }; // Error if passed: Property 'id' is missing

  logItemId(myPharmacy);
  logItemId(somePatient);
  // logItemId(someOrder); // Argument of type '{ orderNumber: string; }' is not assignable to parameter of type 'Identifiable'.
  // Property 'id' is missing in type '{ orderNumber: string; }' but required in type 'Identifiable'.
  ```

  In this example, `logItemId` can only be called with objects that have an `id` property of type `string` or `number`.

Generics are a cornerstone of creating flexible and type-safe libraries and utilities. They allow you to write code that is abstract over types, providing a good balance between reusability and static type checking.

**Common Use Cases for Generics:**

- Creating type-safe collections (e.g., `Array<T>`, `Map<K, V>`, custom cache classes like `DataCache<TItem>` above).
- Building reusable utility functions that operate on various data types (e.g., `getFirstElement<T>`).
- Defining flexible API response structures (e.g., `ApiResponse<TData>`) or data mappers.
- Developing abstract data structures (like trees, linked lists) and algorithms that can work with different data types.

> [!NOTE] > **`Under the Hood`: Type Erasure and Generics**
> An important aspect to understand about generics in TypeScript is **type erasure**. Generic type information is primarily a compile-time construct. During the compilation process, when TypeScript code is transpiled to JavaScript, these generic type parameters are typically erased. The resulting JavaScript code often uses `any` or relies on JavaScript's dynamic typing for the parts that were generic.
>
> For example, `function getFirstElement<T>(arr: T[]): T | undefined { /* ... */ }` might compile down to something like `function getFirstElement(arr) { /* ... */ }` in JavaScript.
>
> The crucial benefit of generics lies in the **static analysis and type safety they provide during the development phase**. The TypeScript compiler uses the generic information to catch errors and provide better tooling support _before_ the code is executed. This compile-time checking is what makes generics powerful, not any runtime generic type information (which generally doesn't exist in the output JavaScript).

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Exercise 6.2: Generic Function

Let's put your understanding of generics into practice.

**Objective:** Create a generic function that can process and return an array of items, adding a timestamp to each item.

**Instructions:**

1.  Define an interface `TimestampedItem<T>` that has two properties:
    - `originalItem` of type `T` (the generic type variable).
    - `timestamp` of type `Date`.
2.  Create a generic function called `addTimestampToItems<T>`:
    - It should take one argument: `items` (an array of type `T[]`).
    - It should return a new array where each element is of type `TimestampedItem<T>`.
    - For each item in the input `items` array, the function should create an object that includes the `originalItem` and the current `timestamp` (when the function processed it).
3.  Test your function with arrays of different types (e.g., an array of `string`s representing medication names, and an array of objects representing simple `PrescriptionRefillRequest`s).
    - Define a simple `PrescriptionRefillRequest` interface (e.g., `{ prescriptionId: string; patientName: string; }`).
4.  Log the resulting timestamped arrays to the console.

**Access the Exercise:**

**[INSERT_ACTUAL_CODESANDBOX_LINK_FOR_EXERCISE_6.2_HERE]**

---
