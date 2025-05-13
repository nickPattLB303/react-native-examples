## Section 2: Basic Types

TypeScript extends JavaScript by adding types. Understanding these basic types is the first step towards leveraging TypeScript's power. These types allow you to declare the expected data shape for your variables, function parameters, and object properties, enabling the TypeScript compiler to catch errors early.

### Conceptual Content: Core Data Types in TypeScript

Let's explore the most commonly used basic types in TypeScript. Many of these will feel familiar if you have experience with JavaScript, but TypeScript provides explicit ways to work with them.

> [!NOTE]
> It is a common convention and best practice in TypeScript to use lowercase type names for primitives (e.g., `string`, `number`, `boolean`) instead of their capitalized counterparts (`String`, `Number`, `Boolean`). The capitalized versions refer to special built-in JavaScript wrapper objects that behave differently and are rarely used directly in type annotations.

**1. `string`**

Represents textual data, enclosed in single quotes (`'`), double quotes (`"`), or backticks (`` ` `` for template literals).

- **SpeedyMeds Example:**

```typescript
let patientName: string = "John Doe";
let medicationName: string = "Amoxicillin";
let dosageInstructions: string = `${medicationName} 250mg - Take one tablet twice a day.`;

console.log(patientName);
console.log(dosageInstructions);
```

**2. `number`**

Represents all numeric values, including integers and floating-point numbers. TypeScript does not differentiate between `int`, `float`, `double`, etc., as some other languages do.

- **SpeedyMeds Example:**

```typescript
let patientAge: number = 45;
let medicationDosageMg: number = 250.5;
let pillsPerPack: number = 30;

console.log(`Patient Age: ${patientAge}`);
console.log(`Dosage: ${medicationDosageMg}mg`);
```

**3. `boolean`**

Represents a logical value, either `true` or `false`.

- **SpeedyMeds Example:**

```typescript
let requiresPrescription: boolean = true;
let isRefillAvailable: boolean = false;

if (requiresPrescription) {
  console.log("A prescription is required for this medication.");
}
```

**4. `array`**

Represents an ordered list of values. You can define array types in two ways:

- `typeName[]`: (e.g., `string[]` for an array of strings)
- `Array<typeName>`: (e.g., `Array<number>` for an array of numbers)

* **SpeedyMeds Example:**

```typescript
let allergies: string[] = ["Penicillin", "Sulfa"];
let vitalSignsBPM: Array<number> = [72, 75, 68];
// let prescriptionHistory: any[] = ["Lisinopril", 10, new Date(2023, 0, 15)]; // Example of using any, better to use tuples for fixed structure, see below.

console.log(`Patient Allergies: ${allergies.join(", ")}`);
console.log(`Recent Heart Rates: ${vitalSignsBPM}`);
```

**5. `object`**

Represents any non-primitive type (i.e., not `string`, `number`, `boolean`, `symbol`, `null`, or `undefined`). It's a general type; for more specific object shapes, you'll use interfaces or type aliases (covered in the next section).

It's important to distinguish the lowercase `object` type from:

- `Object` (uppercase 'O'): This refers to the JavaScript global `Object` type. Almost all values (including primitives, due to autoboxing) are assignable to `Object`. It is generally too broad and less useful for specific typing.
- `{}` (empty object type): This type represents an object with no properties. While many non-null, non-undefined values can be assigned to `{}`, it doesn't provide much type safety as it doesn't describe any specific structure.

While `object` is more specific than `any`, it still offers limited information about the value's properties and methods. Prefer interfaces or type aliases for defining specific object structures.

- **SpeedyMeds Example:**

```typescript
let patientProfile: object;

patientProfile = {
  name: "Jane Doe",
  age: 32,
  contact: {
    email: "jane.doe@example.com",
    phone: "555-0102",
  },
};

console.log(patientProfile);
// console.log(patientProfile.name); // TypeScript might warn here if 'object' type doesn't know about 'name'
// More specific types (interfaces/type aliases) are better for this.
```

**6. `any`**

Represents a dynamic type. Using `any` essentially opts out of type checking for that particular variable. It can be useful during migration from JavaScript or when working with truly dynamic data, but it should be used sparingly as it sacrifices type safety. Overuse of `any` can lead to runtime errors that TypeScript would otherwise have caught.

- **SpeedyMeds Example:**

```typescript
let medicationDetails: any = "Ibuprofen 200mg";
console.log(medicationDetails.toUpperCase()); // Works, as string has toUpperCase

medicationDetails = { name: "Paracetamol", strength: 500 };
// console.log(medicationDetails.toUpperCase()); // This would cause a runtime error if medicationDetails is now an object.
// TypeScript won't catch this if type is 'any'.

let someValue: any;
someValue = 10;
someValue = "Hello";
someValue = true;
```

> [!CAUTION]
> While `any` provides flexibility, it undermines the core benefit of TypeScript – type safety. Strive to use more specific types whenever possible. Consider `unknown` as a safer alternative if the type is truly unknown.
>
> **Best Practices for `any` and `unknown`:**
>
> - **Avoid `any` where possible:** Reserve `any` for situations where type checking is genuinely impossible or during incremental migration of JavaScript codebases. Ensure the `noImplicitAny` compiler option is enabled to prevent variables from defaulting to `any`.
> - **Prefer `unknown` for uncertain types:** When a value's type is truly unknown (e.g., API responses, user input), use `unknown`. `unknown` is safer because it forces you to acknowledge and address the ambiguity of a variable's type before performing operations.
> - **Narrow `unknown` types:** Always use type guards (like `typeof`, `instanceof`, `in` operator, or user-defined type guards) or type assertions to narrow an `unknown` type to a more specific type before performing operations on it. This explicit checking is what makes `unknown` a much safer choice than `any`.

**7. `unknown`**

A type-safe counterpart to `any`. When a value is of type `unknown`, you cannot perform most operations on it without first performing some form of type checking (like using a type guard or type assertion) to narrow down its type. This forces you to explicitly handle the uncertainty of the type before using it, preventing accidental unsafe operations.

- **SpeedyMeds Example:**

```typescript
let externalDrugInfo: unknown;

externalDrugInfo = "Retrieved from external API as a string";
// externalDrugInfo = { name: "DrugX", interactions: ["DrugY"] }; // Could also be an object

// console.log(externalDrugInfo.toUpperCase()); // Error: Object is of type 'unknown'.

if (typeof externalDrugInfo === "string") {
  console.log(externalDrugInfo.toUpperCase()); // OK, type is narrowed to string
} else if (
  typeof externalDrugInfo === "object" &&
  externalDrugInfo !== null &&
  "name" in externalDrugInfo
) {
  // Assuming 'name' would be a string if it exists.
  const drugObject = externalDrugInfo as {
    name: string;
    interactions?: string[];
  };
  console.log(`Drug Name: ${drugObject.name}`); // OK, type narrowed via assertion after checks
} else {
  console.log("External drug info is of an unexpected type.");
}
```

**8. `void`**

Represents the absence of a return value, typically used as the return type for functions that do not return a value. While a JavaScript function without an explicit `return` statement implicitly returns `undefined`, `void` as a type annotation in TypeScript emphasizes that the function's return value, if any, is not intended to be used by the caller.

- **SpeedyMeds Example:**

```typescript
function logPrescription(medication: string, dosage: number): void {
  console.log(`Prescription logged: ${medication}, ${dosage}mg`);
  // No return statement, or could explicitly return undefined.
  // return undefined; // This is permissible
}

let result = logPrescription("Metformin", 500); // result is of type void (effectively undefined)
// console.log(result.something); // Error: Property 'something' does not exist on type 'void'.
```

**9. `null` and `undefined`**

In TypeScript, both `null` and `undefined` have their own types, named `null` and `undefined` respectively.
By default (without `strictNullChecks` enabled), `null` and `undefined` are subtypes of all other types. However, with the **`strictNullChecks` compiler option enabled (highly recommended and default in many setups like Expo's `tsconfig.base`)**:

- `null` and `undefined` can only be assigned to `any`, `unknown`, or their respective types.
- `undefined` can also be assigned to `void`.
- To allow a variable to hold a specific type OR `null` / `undefined`, you MUST use union types (e.g., `string | null`, `number | undefined`). This forces you to explicitly account for potential `null` or `undefined` values, significantly reducing common runtime errors like "Cannot read property 'x' of undefined."

- **SpeedyMeds Example (with `strictNullChecks` in mind):**

```typescript
let patientMiddleName: string | null = null; // Can be a string or null
let nextAppointmentDate: Date | undefined;

patientMiddleName = "Robert";
// patientMiddleName = undefined; // Error if type is string | null (unless also | undefined)

if (nextAppointmentDate) {
  console.log(`Next appointment: ${nextAppointmentDate.toLocaleDateString()}`);
} else {
  console.log("No upcoming appointment scheduled.");
}
```

**10. `never`**

The `never` type represents the type of values that never occur. It indicates that a function will not reach its normal completion point.
Common use cases for `never` include:

- Functions that always throw an error.
- Functions that have infinite loops.
- **Exhaustive type checking:** In conditional logic (e.g., a `switch` statement covering all cases of a union type), the `default` case might assert a variable to be of type `never`. If a new member is added to the union without updating the `switch`, the `default` case would no longer be `never`, signaling a compile-time error. This ensures all valid paths are handled.

- **SpeedyMeds Example:**

```typescript
function criticalErrorHandler(message: string): never {
  throw new Error(`Critical System Error in SpeedyMeds: ${message}`);
}

function infiniteProcessingLoop(): never {
  while (true) {
    // Process background tasks...
  }
}

// Example of exhaustive check with 'never'
type ReportStatus = "Pending" | "Complete" | "Failed";

function handleReportStatus(status: ReportStatus): string {
  switch (status) {
    case "Pending":
      return "Report is pending generation.";
    case "Complete":
      return "Report successfully generated.";
    case "Failed":
      return "Report generation failed.";
    default:
      // If a new status is added to ReportStatus (e.g., "Archived")
      // and this switch is not updated, 'status' here would no longer be 'never'.
      // The TypeScript compiler would then flag an error on the next line,
      // because a value of the new status type cannot be assigned to 'never'.
      const _exhaustiveCheck: never = status;
      return `Unknown status: ${_exhaustiveCheck}`; // This line theoretically unreachable
  }
}

console.log(handleReportStatus("Complete"));
// criticalErrorHandler("Example critical error"); // Uncomment to test
```

**11. `tuple`**

Represents an array with a fixed number of elements whose types are known, but need not be the same. This provides more structure than a general array of mixed types.

- **SpeedyMeds Example:**

```typescript
// A patient's vital sign reading: [measurementName: string, value: number, unit: string]
let bloodPressureReading: [string, number, string];
bloodPressureReading = ["Systolic", 120, "mmHg"];

// Accessing tuple elements
console.log(
  `Measurement: ${bloodPressureReading[0]}, Value: ${bloodPressureReading[1]} ${bloodPressureReading[2]}`
);

// bloodPressureReading = [120, "Systolic", "mmHg"]; // Error: Type 'number' is not assignable to type 'string'.
// bloodPressureReading = ["Diastolic", 90]; // Error: Tuple type '[string, number, string]' of length '3' has no element at index '2'.

// Using a tuple for prescription history item
type PrescriptionEntry = [
  medicationName: string,
  dosageMg: number,
  datePrescribed: Date,
  refillsRemaining: number
];
let prescriptionHistoryEntry: PrescriptionEntry = [
  "Lisinopril",
  10,
  new Date(2023, 0, 15),
  2,
];

console.log(
  `Prescribed ${prescriptionHistoryEntry[0]} (${
    prescriptionHistoryEntry[1]
  }mg) on ${prescriptionHistoryEntry[2].toLocaleDateString()}, ${
    prescriptionHistoryEntry[3]
  } refills left.`
);
```

**12. `bigint`**

Represents whole numbers larger than 2<sup>53</sup> - 1. `bigint` literals are created by appending `n` to the end of an integer.

- **SpeedyMeds Example:** (While less common in typical UI scenarios, imagine a scenario with very large batch IDs or unique identifiers from a legacy system)

```typescript
let veryLargeBatchId: bigint = 900719925474099100n;
let anotherLargeId: bigint = BigInt("900719925474099101"); // Can also be created from a string

console.log(`Batch ID: ${veryLargeBatchId}`);
// let result = veryLargeBatchId + 10; // Error: Operator '+' cannot be applied to types 'bigint' and 'number'.
// Must use BigInt for operations:
let incrementedId = veryLargeBatchId + 10n;
console.log(`Incremented ID: ${incrementedId}`);
```

> [!IMPORTANT] > `bigint` and `number` are not interchangeable. You cannot mix them in arithmetic operations without explicit conversion. `bigint` also behaves differently with `Math` object methods.

**13. `symbol`**

Represents a primitive data type that is always unique and immutable. Symbols are often used to add unique property keys to an object to avoid name collisions, especially when dealing with object extension or metadata. They are created using the global `Symbol()` function.

- **SpeedyMeds Example:** (Useful for unique identifiers or internal properties)

```typescript
const uniquePatientIdSymbol = Symbol("uniquePatientId");
const internalNotesSymbol = Symbol("internalNotes");

interface PatientRecord {
  name: string;
  [uniquePatientIdSymbol]: string; // Using a symbol as a property key
  [internalNotesSymbol]?: string;
}

let patient1: PatientRecord = {
  name: "Alice Johnson",
  [uniquePatientIdSymbol]: "SYMBOL_P001",
};

patient1[internalNotesSymbol] = "Patient is allergic to penicillin.";

console.log(patient1.name);
console.log(patient1[uniquePatientIdSymbol]); // Access using the symbol

// Symbols are not enumerated in for...in loops or Object.keys()
for (const key in patient1) {
  console.log(`Key in loop: ${key}`); // Will log 'name' but not the symbols
}
console.log(Object.getOwnPropertySymbols(patient1)); // [Symbol(uniquePatientId), Symbol(internalNotes)]
```

Symbol keys are a good way to define "private" or metadata properties on objects that won't accidentally clash with string-based keys.

### TypeScript Basic Types vs. JavaScript Equivalents

The following table summarizes TypeScript's basic types and their relationship to JavaScript's primitives and concepts.

| TypeScript Type               | JavaScript Equivalent/Concept                                     | Notes                                                                                            |
| ----------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `boolean`                     | `boolean` primitive                                               | `true` or `false`.                                                                               |
| `number`                      | `number` primitive (includes integers and floats)                 | All numbers are floating-point in JS.                                                            |
| `string`                      | `string` primitive                                                | Textual data.                                                                                    |
| `bigint`                      | `bigint` primitive                                                | For arbitrarily large integers. Ends with `n`.                                                   |
| `symbol`                      | `symbol` primitive                                                | For unique identifiers (less common in basic examples).                                          |
| `null`                        | `null` primitive                                                  | Represents intentional absence of value. Treated as a distinct type with `strictNullChecks`.     |
| `undefined`                   | `undefined` primitive                                             | Represents uninitialized variables or missing properties. Distinct type with `strictNullChecks`. |
| `Type[]` or `Array<Type>`     | `Array` object                                                    | Ordered list of values of type `Type`.                                                           |
| `[Type1, Type2, ...]` (Tuple) | `Array` object (conventionally)                                   | Fixed-size, ordered list with potentially different types at each position. TS specific.         |
| `enum`                        | Typically objects or constants in JS                              | Set of named constants. TS specific feature (covered in detail later).                           |
| `any`                         | Any JavaScript value (type checking disabled)                     | Use sparingly; opts out of type safety.                                                          |
| `unknown`                     | Any JavaScript value (type checking enforced)                     | Safer alternative to `any`. Requires narrowing before use. TS specific.                          |
| `void`                        | `undefined` (for function returns not returning value)            | Indicates no meaningful return value.                                                            |
| `never`                       | No direct equivalent (conceptually, a non-terminating path)       | Represents values that never occur. TS specific.                                                 |
| `object`                      | Any non-primitive value (`typeof x === 'object'` or `'function'`) | More specific than `any`, but less specific than an interface or `Record<string, unknown>`.      |

### 14. Literal Types

Literal types allow you to define types that represent exact, specific values. TypeScript supports string literal types, numeric literal types, and boolean literal types. They are most powerful when combined with union types (`|`) to constrain a variable to one of several specific values.

- **String Literal Types:** Constrain a variable to a specific string.

  - _SpeedyMeds Example:_

  ```typescript
  type MedicationForm = "Tablet" | "Capsule" | "Syrup" | "Injection";
  let prescriptionForm: MedicationForm = "Tablet";

  // prescriptionForm = "Powder"; // Error: Type '"Powder"' is not assignable to type 'MedicationForm'.

  function setDispenseMethod(form: MedicationForm): string {
    if (form === "Tablet" || form === "Capsule") {
      return "Dispense in bottle.";
    }
    return "Follow specific instructions.";
  }
  console.log(setDispenseMethod("Capsule"));
  ```

- **Numeric Literal Types:** Constrain a variable to a specific number.

  - _SpeedyMeds Example:_

  ```typescript
  type AllowedRefills = 0 | 1 | 2 | 3 | 5;
  let refillCount: AllowedRefills = 2;

  // refillCount = 4; // Error: Type '4' is not assignable to type 'AllowedRefills'.
  ```

- **Boolean Literal Types:** The types `true` and `false` are themselves literal types. The `boolean` type is effectively an alias for the union `true | false`.

Literal types provide a more precise way to define expectations than general primitive types, enhancing type safety and self-documentation, especially for things like status codes, action types, or predefined options.

### 15. Understanding Structural Typing (Duck Typing)

Type compatibility in TypeScript is based on **structural subtyping**, often referred to as "duck typing" at compile time. This means that types are related based on their members (properties and methods), not on explicit declarations or names. If an object `x` possesses at least the same members (with compatible types) as an object `y` requires, then `x` is considered compatible with `y` and can be assigned to `y`.

**Core Principle:** If it walks like a duck and quacks like a duck, TypeScript considers it a duck (for type-checking purposes).

- **Example:**

```typescript
interface Patient {
  patientId: string;
  name: string;
}

function logPatientName(patient: Patient): void {
  console.log(`Patient Name: ${patient.name}`);
}

let newPatient = { patientId: "P1001", name: "Alice Wonderland", age: 30 };
logPatientName(newPatient); // OK! newPatient has patientId and name properties with correct types.
// The extra 'age' property does not prevent compatibility here.

let minimalPatient = { name: "Bob The Builder", patientId: "P1002" };
logPatientName(minimalPatient); // OK!

// let notAPatient = { firstName: "Charlie Brown" };
// logPatientName(notAPatient); // Error: Property 'patientId' is missing and 'name' type might mismatch if not string.
```

**Implications:**

- **Flexibility:** Allows for more decoupled code because components interact based on the structure of data they expect, not on specific, named types from a particular hierarchy.
- **Easier Integration with JavaScript:** TypeScript can easily type existing JavaScript objects and libraries based on their shapes.

> 🤖 **(Native Android/iOS Developers - Java/Kotlin/Swift):** This is a key difference from **nominal typing** systems used in languages like Java, Kotlin, and Swift. In nominal systems, type compatibility is determined by explicit declarations (e.g., class `Dog` explicitly `implements` `AnimalInterface` or extends `AnimalBase`). In TypeScript, if an object has the same _structure_ as an interface, it's compatible, even without an explicit `implements` clause (though classes _can_ use `implements` to ensure they adhere to an interface contract).

Understanding structural typing is fundamental to working effectively with TypeScript, especially when defining and using interfaces and object types.

### 16. Type Annotations with Destructuring

TypeScript extends JavaScript's destructuring capabilities by allowing type annotations, enhancing type safety when extracting values from arrays or properties from objects.

- **Array Destructuring with Types:**

  - _SpeedyMeds Example:_

  ```typescript
  type MedicationTuple = [name: string, dosage: number, unit: string];
  const medicationInfo: MedicationTuple = ["Amoxicillin", 250, "mg"];

  const [medName, medDosage, medUnit]: [string, number, string] =
    medicationInfo;
  // medName: string, medDosage: number, medUnit: string

  console.log(`Medication: ${medName}, Dosage: ${medDosage}${medUnit}`);

  const [firstAllergy, ...remainingAllergies]: [string, ...string[]] = [
    "Penicillin",
    "Sulfa",
    "Aspirin",
  ];
  console.log(
    `Primary Allergy: ${firstAllergy}, Others: ${remainingAllergies.join(", ")}`
  );
  ```

  The type annotation applies to the variables being created from the array.

- **Object Destructuring with Types:**

  - _SpeedyMeds Example:_

  ```typescript
  interface Prescription {
    medicationName: string;
    quantity: number;
    refillsLeft?: number;
  }

  const currentPrescription: Prescription = {
    medicationName: "Lisinopril",
    quantity: 30,
    refillsLeft: 2,
  };

  const {
    medicationName,
    quantity,
    refillsLeft = 0,
  }: Prescription = currentPrescription;
  // medicationName: string, quantity: number, refillsLeft: number

  console.log(
    `Prescription for ${medicationName}, Qty: ${quantity}, Refills: ${refillsLeft}`
  );
  ```

  Type annotations on destructuring assignments provide immediate clarity about the expected structure and types, allowing the TypeScript compiler to catch errors if the source data doesn't conform.

These basic types and foundational concepts form the building blocks for more complex type definitions you'll encounter and create in TypeScript. Mastering them is essential for writing type-safe and maintainable code.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
> - [TypeScript Handbook - Everyday Types (covers primitives, arrays, any, etc.)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

In the next section, we'll explore how to define more complex shapes for our data using interfaces and type aliases.

---
