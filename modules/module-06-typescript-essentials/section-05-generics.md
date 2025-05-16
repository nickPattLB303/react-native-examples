## Section 5: Generics

Generics are a powerful feature in TypeScript that allow you to write reusable code components that can work with a variety of types, rather than being tied to a single one. This enhances flexibility and code reuse while maintaining type safety. This section explores how to define and use generic functions, interfaces, and classes, which are invaluable for creating adaptable utilities and data structures, for instance, in our SpeedyMeds application for managing various types of medical data.

### Conceptual Content: Writing Reusable, Type-Safe Code with Generics

Imagine you need a function that returns the first element of an array. Without generics, you might have to write separate functions for an array of numbers and an array of strings, or resort to using `any`, which sacrifices type safety.

Generics solve this by allowing you to define a placeholder type, often denoted by `T` (for Type), which will be specified when the generic component is used.

#### Generic Functions

A generic function uses a type parameter (e.g., `<T>`) in its signature. This type parameter can then be used to type the function's parameters, return value, or internal variables.

A short, self-contained example of a generic function:

```typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// Usage with numbers
const numbers: number[] = [10, 20, 30];
const firstNumber = getFirstElement(numbers);
console.log(`First number: ${firstNumber}`); // Output: First number: 10

// Usage with strings (related to SpeedyMeds)
const medicationSideEffects: string[] = ["Drowsiness", "Nausea", "Headache"];
const firstSideEffect = getFirstElement(medicationSideEffects);
console.log(`First side effect: ${firstSideEffect}`); // Output: First side effect: Drowsiness

// Usage with an array of objects
interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}
const inventory: InventoryItem[] = [
  { id: "MED101", name: "Aspirin", quantity: 200 },
  { id: "SUPP203", name: "Band-Aids", quantity: 500 },
];
const firstInventoryItem = getFirstElement(inventory);
console.log(`First inventory item: ${firstInventoryItem?.name}`); // Output: First inventory item: Aspirin

const emptyArray: [] = [];
const noElement = getFirstElement(emptyArray);
console.log(`Element from empty array: ${noElement}`); // Output: Element from empty array: undefined
```

In this example, `getFirstElement<T>` is a generic function. `T` is a type parameter that represents the type of elements in the array `arr`. When we call `getFirstElement(numbers)`, TypeScript infers that `T` is `number`. When called with `medicationSideEffects`, `T` is inferred as `string`. Similarly for `inventory`, `T` is `InventoryItem`. The function returns a value of type `T` or `undefined` if the array is empty, maintaining type safety regardless of the array's element type.

#### Generic Interfaces

Interfaces can also be generic. This is useful for defining structures that can hold or operate on data of various types.

A short, self-contained example of a generic interface:

```typescript
interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  items: T[]; // The actual data items of type T
}

// Example for a list of Patients (SpeedyMeds context)
interface Patient {
  patientId: string;
  name: string;
  age: number;
}

const patientApiResponse: PaginatedResponse<Patient> = {
  page: 1,
  pageSize: 10,
  totalItems: 100,
  items: [
    { patientId: "P001", name: "John Doe", age: 34 },
    { patientId: "P002", name: "Jane Smith", age: 45 },
    // ... more patient objects
  ],
};

console.log(`Current page of patients: ${patientApiResponse.page}`);
// Output: Current page of patients: 1
console.log(`First patient on page: ${patientApiResponse.items[0].name}`);
// Output: First patient on page: John Doe

// Example for a list of Medication orders
interface MedicationOrder {
  orderId: string;
  medicationName: string;
  quantity: number;
}

const orderApiResponse: PaginatedResponse<MedicationOrder> = {
  page: 3,
  pageSize: 5,
  totalItems: 25,
  items: [
    { orderId: "ORD789", medicationName: "Lisinopril", quantity: 30 },
    // ... more order objects
  ],
};
console.log(`Order data items: ${orderApiResponse.items.length}`);
// Output: Order data items: 1
```

Here, `PaginatedResponse<T>` is a generic interface that can describe a paginated API response for any type of data. `T` is the placeholder for the type of items in the `items` array. We then use it to create `patientApiResponse` where `T` is `Patient`, and `orderApiResponse` where `T` is `MedicationOrder`. This allows us to reuse the `PaginatedResponse` structure for different data entities in SpeedyMeds.

#### Generic Type Aliases

Type aliases can also be generic. This is useful for creating reusable names for complex generic types.

A short, self-contained example of a generic type alias:

```typescript
type DataOrError<D, E = Error> = {
  // E has a default type of Error
  data: D | null;
  error: E | null;
};

interface User {
  id: string;
  username: string;
}

interface ApiError {
  code: number;
  message: string;
}

// Using the generic type alias for a user fetch operation
const successfulUserData: DataOrError<User, ApiError> = {
  data: { id: "user123", username: "coderGal" },
  error: null,
};

// Using it for a failed operation with a custom error type
const failedUserData: DataOrError<User, ApiError> = {
  data: null,
  error: { code: 404, message: "User not found" },
};

// Using it with the default error type
const genericError: DataOrError<null> = {
  data: null,
  error: new Error("A generic error occurred"),
};

console.log("Successful user: " + successfulUserData.data?.username);
// Output: Successful user: coderGal
console.log("Failed user error: " + failedUserData.error?.message);
// Output: Failed user error: User not found
```

In this example, `DataOrError<D, E>` is a generic type alias that represents a common pattern for handling operations that can either succeed with data of type `D` or fail with an error of type `E`. The `E` type parameter has a default value of `Error`. This allows for creating a standardized way to represent API call results or any fallible operation for various data types `D` and error types `E`.

#### Generic Constraints

Sometimes you want to restrict the types that can be used as a type parameter. You can do this using generic constraints with the `extends` keyword.

A short, self-contained example of generic constraints:

```typescript
interface Loggable {
  log: () => void; // Requires a method named 'log' that returns void
}

interface Lengthwise {
  length: number;
}

// Constraint: T must have a 'length' property of type number
function logLength<T extends Lengthwise>(arg: T): void {
  console.log(`Length is: ${arg.length}`);
}

logLength("Hello, SpeedyMeds!"); // Strings have a length property. Output: Length is: 19
logLength([1, 2, 3, 4, 5]); // Arrays have a length property. Output: Length is: 5
// logLength(123); // Error: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
// logLength({ name: "Test" }); // Error: Argument of type '{ name: string; }' is not assignable to parameter of type 'Lengthwise'.

// Constraint: T must be an object that has a 'log' method.
function processLoggableItem<T extends Loggable>(item: T): void {
  console.log("Processing item...");
  item.log(); // We know 'item' has a 'log' method due to the constraint
}

class Prescription {
  constructor(public id: string, public medication: string) {}
  log() {
    console.log(`Prescription ID: ${this.id}, Medication: ${this.medication}`);
  }
}

const myPrescription = new Prescription("RX123", "Amoxicillin");
processLoggableItem(myPrescription);
// Output:
// Processing item...
// Prescription ID: RX123, Medication: Amoxicillin

// class PatientRecord { name: string = "John"; } // Does not have a log method
// processLoggableItem(new PatientRecord()); // Error: Property 'log' is missing in type 'PatientRecord'...
```

In the `logLength` function, `T extends Lengthwise` constrains `T` to be any type that has a `length` property of type `number`. This allows us to safely access `arg.length`. Calls with types not meeting this constraint (like a plain number or an object without `length`) would result in a compile-time error.
Similarly, `processLoggableItem<T extends Loggable>` ensures that `item` will have a `log` method. This makes the function more robust and its usage clearer.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
> - [TypeScript Handbook: Constraints (Generic Constraints)](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

### Exercise 6.2: Generic Function

Time to apply your knowledge of generics by creating a versatile function.

**Objective:** Create a generic function that can take an array of any type and an item of that same type, and return a new array with the item added to the end. This function will be useful in SpeedyMeds for managing various lists, like adding a new medication to an inventory list or a new allergy to a patient's record.

**Instructions:**

1.  Define a generic function named `addItemToArray`.
2.  This function should accept two arguments:
    - `array`: An array of type `T[]` (where `T` is the generic type parameter).
    - `item`: An item of type `T`.
3.  The function should return a new array of type `T[]` containing all elements from the original array plus the new item at the end. It should not modify the original array.
4.  Test your function with:
    - An array of numbers and a new number.
    - An array of strings and a new string.
    - An array of objects (e.g., simple objects like `{ id: number, name: string }`) and a new object of the same structure.
5.  Log the results to the console to verify.

**Tool:** CodeSandbox

**(https://codesandbox.io)** (_Note: You will need to create a new TypeScript sandbox or use a provided template._)

This exercise will help you understand how to create flexible and type-safe functions using generics, a common pattern for utility functions.
