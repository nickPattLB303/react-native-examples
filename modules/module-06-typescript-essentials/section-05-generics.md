## Section 5: Generics

Generics are a powerful feature in TypeScript that allow you to write reusable code components that can work with a variety of types, rather than being tied to a single one. This enhances flexibility and code reuse while maintaining type safety. This section explores how to define and use generic functions, interfaces, classes, and type aliases, which are invaluable for creating adaptable utilities and data structures, for instance, in our SpeedyMeds application for managing various types of medical data.

### Conceptual Content: Writing Reusable, Type-Safe Code with Generics

Imagine you need a function that returns the first element of an array. Without generics, you might have to write separate functions for an array of numbers and an array of strings, or resort to using `any`, which sacrifices type safety.

Generics solve this by allowing you to define a placeholder type, often denoted by `T` (for Type), which will be specified when the generic component is used.

**Key Aspects of Generics:**

- **Type Parameters:** These are placeholders for actual types, typically written as `<T>`, `<U>`, `<K, V>`, etc. You can use multiple type parameters if needed.
- **Generic Inference:** In many cases, TypeScript can infer the type argument for a generic from the context, so you don\'t always have to specify it explicitly (e.g., `getFirstElement(myArray)` vs. `getFirstElement<string>(myStringArray)`).
- **Default Type Parameters:** You can provide a default type for a generic type parameter, e.g., `<E = Error>` in `DataOrError<D, E = Error>`, which is used if no explicit type is provided for `E`.

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

#### Generic Classes

Classes can also be generic. This allows you to create classes that can work with a variety of types for their properties or methods.

A short, self-contained example of a generic class:

```typescript
class DataStore<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItem(index: number): T | undefined {
    return this.items[index];
  }

  getAllItems(): T[] {
    return [...this.items]; // Return a copy
  }
}

// Using DataStore for medication inventory (SpeedyMeds context)
interface Medication {
  name: string;
  dosage: string;
}
const medicationStore = new DataStore<Medication>();
medicationStore.addItem({ name: "Lisinopril", dosage: "10mg" });
medicationStore.addItem({ name: "Metformin", dosage: "500mg" });
console.log(medicationStore.getItem(0)); // Output: { name: 'Lisinopril', dosage: '10mg' }

// Using DataStore for patient IDs
const patientIdStore = new DataStore<string>();
patientIdStore.addItem("PAT001");
patientIdStore.addItem("PAT002");
console.log(patientIdStore.getAllItems()); // Output: [ 'PAT001', 'PAT002' ]
```

In this example, `DataStore<T>` is a generic class that can store a collection of items of type `T`. We can create an instance for `Medication` objects and another for `string` (patient IDs), reusing the same class structure while maintaining type safety.

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

#### Common Use Cases for Generics

Generics are fundamental for writing robust, reusable, and scalable TypeScript code. They are widely used for:

- **Creating Type-Safe Collections:** Like `Array<T>`, `Map<K, V>`, or custom data structures like the `DataStore<T>` example above.
- **Building Reusable Utility Functions:** Functions that operate on data of various types while preserving type information (e.g., `getFirstElement<T>`).
- **Defining Flexible API Structures:** Such as `PaginatedResponse<T>` for handling API responses with different data payloads.
- **Developing Abstract Data Structures and Algorithms:** Implementing stacks, queues, trees, sorting algorithms, etc., that can work with any data type conforming to necessary constraints.
- **Enhancing React Component Reusability:** Creating generic React components that can accept props or manage state of varying, but well-defined, types.

#### Applying Generics: Reusable React Native Components

Generics are incredibly useful for creating flexible and type-safe UI components in React Native. A common scenario is a custom list or picker component that needs to display different types of data while maintaining a consistent structure and behavior.

Consider a generic `Select` component that can handle various data sources, as long as each item in the source conforms to a basic shape (e.g., having an `id` for the value and a `label` for display).

**1. Define the Base Item Shape (Constraint):**
First, we define an interface that items must conform to if they are to be used with our generic select component.

```typescript
/**
 * Base shape required for items used in the GenericSelect component.
 * Each item must have a unique 'id' (string) and a 'label' (string) for display.
 * @interface SelectableItem
 */
interface SelectableItem {
  id: string; // Unique identifier, used as the value in the picker
  label: string; // Text to display in the picker for this item
}
```

**2. Define Props for the Generic Component:**
Next, we define the props for our `GenericSelect` component. It will use a type parameter `TItem` which is constrained by `SelectableItem`.

```typescript
/**
 * Props for the GenericSelect component.
 * @template TItem - The type of the items, must extend SelectableItem.
 */
type GenericSelectProps<TItem extends SelectableItem> = {
  /** The array of items to display in the picker. Each item must conform to TItem. */
  items: TItem[];
  /** Callback function invoked when an item is selected. Receives the full selected TItem object or undefined. */
  onValueChange: (item: TItem | undefined) => void;
  /** The ID of the currently selected item. */
  selectedValue: string | undefined;
  /** Optional prompt text to display as the first, unselectable item in the picker. */
  prompt?: string;
  /** Optional style for the Picker container. */
  style?: object; // Example: import { StyleProp, ViewStyle } from 'react-native'; style?: StyleProp<ViewStyle>;
};
```

**3. Implement the Generic Component:**
Now, we implement the `GenericSelect` component. We'll use the `Picker` component from `@react-native-picker/picker` (ensure this library is added to your project: `npx expo install @react-native-picker/picker`).

```typescript
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native"; // Assuming Text and View might be used around it
import { Picker } from "@react-native-picker/picker";

// Re-define SelectableItem and GenericSelectProps here for standalone example context
// (In a real project, they'd be imported or defined in a shared types file)
interface SelectableItem {
  id: string;
  label: string;
}

type GenericSelectProps<TItem extends SelectableItem> = {
  items: TItem[];
  onValueChange: (item: TItem | undefined) => void;
  selectedValue: string | undefined;
  prompt?: string;
  style?: object;
};

/**
 * A reusable, type-safe Select (Picker) component for React Native.
 * It uses generics to work with any data type that conforms to the SelectableItem interface.
 *
 * @template TItem - The type of items in the list, constrained by SelectableItem.
 * @param {GenericSelectProps<TItem>} props - The component props.
 * @returns {React.ReactElement} The rendered Picker component.
 */
export function GenericSelect<TItem extends SelectableItem>({
  items,
  onValueChange,
  selectedValue,
  prompt,
  style,
}: GenericSelectProps<TItem>): React.ReactElement {
  const handleValueChange = (itemValue: string | undefined) => {
    if (itemValue === undefined && prompt) {
      onValueChange(undefined); // Handle prompt selection if needed
      return;
    }
    // Find the full item object corresponding to the selected value (id)
    const selectedItem = items.find((item) => item.id === itemValue);
    onValueChange(selectedItem);
  };

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={handleValueChange}
      prompt={prompt} // Prompt for Android
      style={style}
    >
      {/* Optional prompt item for iOS (Picker.Item with value undefined often serves as a placeholder) */}
      {prompt && (
        <Picker.Item
          label={prompt}
          value={undefined}
          enabled={false}
          style={{ color: "grey" }}
        />
      )}

      {/* Map over the generic items array */}
      {items.map((item) => (
        // We know 'item' has 'id' and 'label' due to the TItem extends SelectableItem constraint
        <Picker.Item key={item.id} label={item.label} value={item.id} />
      ))}
    </Picker>
  );
}

// Minimal styles for demonstration if used directly
// const styles = StyleSheet.create({
//   pickerStyle: {
//     height: 50,
//     width: '100%',
//   }
// });
```

**4. Usage Example:**
Here's how you might use this `GenericSelect` component in a form within your SpeedyMeds application:

```typescript
// --- Assume this is in a component file like PrescriptionForm.tsx ---
// import React, { useState } from 'react'; // Already imported above
// import { View, Text, StyleSheet } from 'react-native'; // Already imported above
// import { GenericSelect, SelectableItem } from './GenericSelect'; // Assuming GenericSelect is in its own file

// Define specific data types that conform to SelectableItem, potentially with extra properties
interface MedicationOption extends SelectableItem {
  dosageForm: string; // Extra property specific to medications
  stock: number;
}

interface PatientOption extends SelectableItem {
  mrn: string; // Medical Record Number, extra property specific to patients
  age: number;
}

const availableMedications: MedicationOption[] = [
  { id: "med1", label: "Lisinopril 10mg", dosageForm: "Tablet", stock: 150 },
  { id: "med2", label: "Amoxicillin 250mg", dosageForm: "Capsule", stock: 80 },
  { id: "med3", label: "Salbutamol Inhaler", dosageForm: "Inhaler", stock: 0 },
];

const registeredPatients: PatientOption[] = [
  { id: "pat1", label: "Jane M. Doe (MRN123)", mrn: "MRN123", age: 45 },
  { id: "pat2", label: "John K. Smith (MRN456)", mrn: "MRN456", age: 62 },
];

function SpeedyMedsPrescriptionForm() {
  const [selectedMedId, setSelectedMedId] = useState<string | undefined>(
    availableMedications[0]?.id
  );
  const [selectedPatientId, setSelectedPatientId] = useState<
    string | undefined
  >(undefined);

  // Type safety: onValueChange receives the full MedicationOption object
  const handleMedicationChange = (medication: MedicationOption | undefined) => {
    setSelectedMedId(medication?.id);
    if (medication) {
      console.log(
        `Selected medication: ${medication.label}, Form: ${medication.dosageForm}, Stock: ${medication.stock}`
      );
    } else {
      console.log("Medication selection cleared.");
    }
  };

  // Type safety: onValueChange receives the full PatientOption object
  const handlePatientChange = (patient: PatientOption | undefined) => {
    setSelectedPatientId(patient?.id);
    if (patient) {
      console.log(
        `Selected patient: ${patient.label}, MRN: ${patient.mrn}, Age: ${patient.age}`
      );
    } else {
      console.log("Patient selection cleared.");
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Select Medication:
      </Text>
      <GenericSelect<MedicationOption>
        items={availableMedications.filter((med) => med.stock > 0)} // Example: filter out of stock meds
        onValueChange={handleMedicationChange}
        selectedValue={selectedMedId}
        prompt="Choose medication..."
        // style={styles.pickerStyle} // Apply styles if defined
      />

      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>
        Select Patient:
      </Text>
      <GenericSelect<PatientOption>
        items={registeredPatients}
        onValueChange={handlePatientChange}
        selectedValue={selectedPatientId}
        prompt="Choose patient..."
        // style={styles.pickerStyle} // Apply styles if defined
      />
      {/* Display selected info or further form fields */}
    </View>
  );
}

// To run this example, you would render <SpeedyMedsPrescriptionForm />
// e.g., in your App.tsx: export default SpeedyMedsPrescriptionForm;
```

This `GenericSelect` component demonstrates how generics, combined with constraints, enable the creation of highly reusable and type-safe UI elements. The `onValueChange` callback provides the fully-typed selected item, allowing access to all its properties (including those beyond `id` and `label`) in a type-safe manner. This is crucial for building complex and reliable applications like SpeedyMeds efficiently.

#### Under the Hood: Type Erasure

It\'s important to understand that generic type information in TypeScript is primarily a **compile-time construct**. During the compilation process, when TypeScript code is transpiled to JavaScript, these generic type parameters are typically **erased**. The resulting JavaScript code often uses `any` or relies on JavaScript\'s dynamic typing for the parts that were generic.

For example, `function identity<T>(arg: T): T { return arg; }` might compile down to `function identity(arg) { return arg; }` in JavaScript.

The crucial benefit of generics lies in the **static analysis and type safety** they provide during the development phase. The TypeScript compiler uses this information to catch errors, provide better autocompletion, and enable safer refactoring _before_ the code is executed. This compile-time checking is what makes generics so valuable, even though the type information isn\'t present in the final JavaScript bundle.

Understanding type constraints is particularly important, as it enables generic components to safely interact with the specific characteristics of the types they operate on, moving beyond simple pass-through behavior. This combination of flexibility and compile-time safety is a key advantage of TypeScript\'s type system.

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
