## Section 2: Basic Types

This section introduces the fundamental data types in TypeScript. Understanding these basic types is the first step towards leveraging TypeScript's type system to write safer and more predictable code. We'll cover common types like `string`, `number`, and `boolean`, as well as special types like `any`, `unknown`, `void`, `null`, `undefined`, `never`, `tuple`, `bigint`, and the generic `object` type.

### Conceptual Content: Everyday Types in TypeScript

TypeScript extends JavaScript's set of types with a static type system. When you declare a variable, you can (and often should) provide a type annotation to specify what kind of values it can hold.

> [!NOTE] > **Type Casing:** It's a common convention and best practice to use lowercase type names for primitives (e.g., `string`, `number`, `boolean`) instead of their capitalized counterparts (`String`, `Number`, `Boolean`). The latter refer to special built-in JavaScript constructor functions for objects that wrap primitives and are rarely used directly in type annotations.

#### Core Primitive Types

These are the most basic data types available in JavaScript and, by extension, TypeScript.

- **`string`**: Represents textual data. Enclosed in single quotes (`' '`), double quotes (`" "`), or backticks (`` ` ``) for template literals.
  A short, self-contained example of using the `string` type:

  ```typescript
  let medicationName: string = "Amoxicillin";
  let dosageForm: string = "Tablet";
  let instruction: string = `Take ${medicationName} (${dosageForm}) twice a day.`;

  console.log(instruction);
  // Output: Take Amoxicillin (Tablet) twice a day.

  // medicationName = 123; // Error: Type 'number' is not assignable to type 'string'.
  ```

  This example declares three string variables related to our SpeedyMeds app. `medicationName` and `dosageForm` use simple string assignments, while `instruction` uses a template literal to embed other variables. The commented-out line shows how TypeScript would prevent assigning a number to a variable explicitly typed as a string.

- **`number`**: Represents all numbers, including integers and floating-point values. There's no separate `int` or `float` type as in some other languages.
  A short, self-contained example of using the `number` type:

  ```typescript
  let quantityInStock: number = 150;
  let pricePerUnit: number = 25.99;
  let discountPercentage: number = 0.1; // 10%

  let finalPrice: number = pricePerUnit * (1 - discountPercentage);
  console.log(
    `Pills available: ${quantityInStock}, Final price: $${finalPrice.toFixed(
      2
    )}`
  );
  // Output: Pills available: 150, Final price: $23.39

  // quantityInStock = "many"; // Error: Type 'string' is not assignable to type 'number'.
  ```

  Here, `quantityInStock`, `pricePerUnit`, and `discountPercentage` are all declared as numbers. A calculation for `finalPrice` is performed, and its result is logged. The `.toFixed(2)` method is a standard JavaScript number method. The commented-out line demonstrates a type error if a string were assigned to `quantityInStock`.

- **`boolean`**: Represents a logical value, either `true` or `false`.
  A short, self-contained example of using the `boolean` type:

  ```typescript
  let requiresPrescription: boolean = true;
  let isGenericAvailable: boolean = false;

  if (requiresPrescription) {
    console.log("This medication requires a prescription.");
  } else {
    console.log("This medication is available over-the-counter.");
  }
  // Output: This medication requires a prescription.

  // isGenericAvailable = "yes"; // Error: Type 'string' is not assignable to type 'boolean'.
  ```

  This example shows two boolean variables relevant to SpeedyMeds. The `if` statement demonstrates conditional logic based on `requiresPrescription`. Attempting to assign a non-boolean value would result in a TypeScript error.

- **`bigint`**: Represents whole numbers larger than 2<sup>53</sup> - 1. `bigint` literals are created by appending `n` to the end of an integer.
  A short, self-contained example of using the `bigint` type:

  ```typescript
  let veryLargeInventoryItemCount: bigint = 9007199254740991n;
  let anotherLargeNumber: bigint = veryLargeInventoryItemCount + 1n;

  console.log(`Large item count: ${veryLargeInventoryItemCount}`);
  console.log(`Another large number: ${anotherLargeNumber}`);
  // Output: Large item count: 9007199254740991
  // Output: Another large number: 9007199254740992

  // veryLargeInventoryItemCount = 123; // Error: Type 'number' is not assignable to type 'bigint'.
  ```

  This example shows `bigint` used for very large integer values. Note the `n` suffix. Regular numbers cannot be assigned to `bigint` variables directly without conversion.

#### Arrays

TypeScript allows you to define arrays of values. You can specify the type of elements the array can hold using two syntaxes:

- `type[]`: e.g., `number[]` for an array of numbers.
- `Array<type>`: e.g., `Array<string>` for an array of strings.

A short, self-contained example of using array types:

```typescript
let activeIngredients: string[] = ["Simvastatin", "Ezetimibe"];
let batchNumbers: Array<number> = [10234, 20589, 30112];

console.log(`Primary ingredient: ${activeIngredients[0]}`);
// Output: Primary ingredient: Simvastatin

activeIngredients.push("Inactive binder");
// batchNumbers.push("Batch-A"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(batchNumbers);
// Output: [ 10234, 20589, 30112 ]
```

This example demonstrates both syntaxes for declaring typed arrays. `activeIngredients` is an array of strings, and `batchNumbers` is an array of numbers. Standard array operations like `push` work as expected, but TypeScript enforces that only elements of the declared type can be added, as shown by the commented-out error line.

#### Tuples

Tuples allow you to express an array with a fixed number of elements whose types are known, but need not be the same. They're useful for representing a structure where the order and type of each element matter.

A short, self-contained example of using a `tuple` type:

```typescript
// Declare a tuple type for a medication lot: [batchNumber: number, expiryDate: string, quantity: number]
let medicationLot: [number, string, number];

// Initialize it
medicationLot = [10234, "2025-12-31", 1000];

// Access elements by index
console.log(
  `Batch Number: ${medicationLot[0]}, Expires: ${medicationLot[1]}, Quantity: ${medicationLot[2]}`
);
// Output: Batch Number: 10234, Expires: 2025-12-31, Quantity: 1000

// medicationLot = ["Batch-A", "2025-12-31", 1000]; // Error: Type 'string' is not assignable to type 'number' at index 0.
// medicationLot = [10234, "2025-12-31"]; // Error: Type '[number, string]' is not assignable to type '[number, string, number]'. Source has 2 element(s) but target requires 3.

// Destructuring a tuple
const [batchNo, expiry, qty] = medicationLot;
console.log(`Destructured: ${batchNo}, ${expiry}, ${qty}`);
// Output: Destructured: 10234, 2025-12-31, 1000
```

In this example, `medicationLot` is defined as a tuple that must contain a number, then a string, then a number. Attempting to assign values of incorrect types or an incorrect number of elements will result in a TypeScript error.

#### Objects

To define the shape of an object, you can use an object type literal. This specifies the names of properties and their types.

A short, self-contained example of using an object type:

```typescript
let patientProfile: {
  patientId: string;
  name: string;
  age: number;
  hasInsurance: boolean;
  allergies?: string[]; // Optional property
};

patientProfile = {
  patientId: "P789012",
  name: "Jane Doe",
  age: 42,
  hasInsurance: true,
  allergies: ["Penicillin", "Sulfa"],
};

console.log(`Patient: ${patientProfile.name}, Age: ${patientProfile.age}`);
// Output: Patient: Jane Doe, Age: 42

// patientProfile.age = "forty-two"; // Error: Type 'string' is not assignable to type 'number'.
// patientProfile.contact = "555-1234"; // Error: Property 'contact' does not exist on type '...'.
```

Here, `patientProfile` is an object whose structure is explicitly defined. It must have `patientId`, `name`, `age`, and `hasInsurance` properties with specified types. The `allergies` property is marked as optional with `?`. Assigning a value of the wrong type to a property or adding an undefined property will result in TypeScript errors.

Later in Section 3, we'll explore more powerful ways to define object shapes using `interfaces` and `type` aliases.

#### Special Types

TypeScript has a few special types that are important to understand:

- **`any`**: Represents any JavaScript value. Using `any` effectively disables type checking for that variable. It should be used sparingly, as it undermines the benefits of TypeScript.
  A short, self-contained example illustrating `any`:

  ```typescript
  let flexibleData: any = "Could be a string";
  console.log(flexibleData.toUpperCase()); // Works if it's a string

  flexibleData = 12345;
  console.log(flexibleData.toFixed(2)); // Works if it's a number

  flexibleData = { description: "Or an object" };
  console.log(flexibleData.description); // Works if it has this property

  // No compile-time errors, but potential runtime errors if used incorrectly:
  // console.log(flexibleData.nonExistentProperty.anotherCall());
  ```

  This example shows `flexibleData` assigned values of different types without TypeScript raising an error. While `any` provides flexibility, it sacrifices type safety. Accessing `nonExistentProperty` wouldn't cause a compile-time error but would likely lead to a runtime error. It's often a sign that you might need to define a more specific type or use `unknown`.

  **Best Practices for `any`:**

  - Avoid `any` whenever possible. It should be a last resort.
  - Reserve it for situations where type checking is genuinely impossible (e.g., highly dynamic content, third-party libraries without types during initial integration).
  - If you must use `any`, consider it a temporary solution and aim to replace it with more specific types or `unknown` as you refactor.
  - Enable the `noImplicitAny` compiler option in `tsconfig.json` to prevent variables from defaulting to `any` if their type isn't inferred or explicitly set.

- **`unknown`**: Similar to `any`, `unknown` can represent any value. However, it's significantly safer because TypeScript enforces that you must perform type checking or type assertion before you can perform any operations on a value of type `unknown`. This forces you to explicitly handle the uncertainty of the type.

  **Why `unknown` is Safer than `any`:**
  `unknown` forces developers to acknowledge and address the ambiguity of a variable's type. Before performing operations that assume a specific type (e.g., calling a method, accessing a property), you must use a type guard (like `typeof`, `instanceof`) or a type assertion to convince the TypeScript compiler that the operation is safe for the current value. This prevents many common errors arising from incorrect assumptions, especially with external API data or user input.

  A short, self-contained example illustrating `unknown`:

  ```typescript
  let userInput: unknown = "123 Main St"; // Simulating user input for SpeedyMeds delivery

  // console.log(userInput.toUpperCase()); // Error: 'userInput' is of type 'unknown'.

  if (typeof userInput === "string") {
    // It's safe to use string methods here
    console.log(userInput.toUpperCase()); // OK: userInput is now known to be a string
    // Output: 123 MAIN ST
  }

  let responseCode: unknown = 404;
  if (typeof responseCode === "number") {
    // And number properties/methods here
    console.log(`API Response Code: ${responseCode}`);
    // Output: API Response Code: 404
  }
  ```

  **Best Practices for `unknown`:**

  - Prefer `unknown` over `any` when dealing with values whose types are genuinely not known at compile time (e.g., API responses, user input).
  - Always use type guards (e.g., `typeof value === 'string'`) or type assertions (e.g., `value as string`) to narrow an `unknown` type to a more specific type before performing operations on it.

- **`void`**: Used as the return type for functions that do not return a value. It signifies that the function's return value, if any, should be ignored. While a JavaScript function without an explicit `return` statement implicitly returns `undefined`, `void` as a type annotation in TypeScript is more about signaling the absence of an intended, usable return value. A function declared to return `void` can technically return `undefined` or even another value, but TypeScript will generally ensure this returned value isn't meant to be used by the caller.
  A short, self-contained example illustrating `void`:

  ```typescript
  /**
   * Logs medication order details to the console.
   * Doesn't return any value.
   * @param orderId - The unique identifier for the order.
   * @param medication - The name of the medication ordered.
   */
  function logMedicationOrder(orderId: string, medication: string): void {
    console.log(`Order ${orderId} placed for ${medication}. No return value.`);
    // No return statement, or an empty return (return;)
  }

  logMedicationOrder("ORD789", "Lisinopril");
  // Output: Order ORD789 placed for Lisinopril. No return value.
  ```

  The `logMedicationOrder` function performs an action (logging to console) but doesn't return any specific value, so its return type is `void`.

- **`null` and `undefined`**: In TypeScript, `null` and `undefined` are actual types that represent the absence of a value. By default, `null` and `undefined` can be assigned to any other type. However, when the `strictNullChecks` compiler option is enabled (which is highly recommended and often default in modern setups like Expo), you must explicitly indicate if a variable can be `null` or `undefined` using a union type (e.g., `string | null`).
  A short, self-contained example illustrating `null` and `undefined` (assuming `strictNullChecks` is on):

  ```typescript
  let prescribingDoctor: string | null = "Dr. Alice Wonderland";
  prescribingDoctor = null; // Allowed because type includes null

  let patientNotes: string | undefined;
  // patientNotes is currently undefined
  patientNotes = "Patient reports mild headache.";
  patientNotes = undefined; // Allowed because type includes undefined (implicitly or explicitly)

  console.log(`Doctor: ${prescribingDoctor}, Notes: ${patientNotes}`);
  // Output: Doctor: null, Notes: undefined

  // let patientAge: number = null; // Error: Type 'null' is not assignable to type 'number' (if strictNullChecks is on)
  let refillCount: number | null = 5;
  refillCount = null;
  ```

  > 📲 **Native Developer Context:** Enabling `strictNullChecks` aligns TypeScript more closely with the explicit null-safety features found in Kotlin (`?` for nullable types) and Swift (`Optional<T>`), making the transition smoother by enforcing familiar safe coding practices.

  This demonstrates how to explicitly allow `null` or `undefined` for variables using union types. If `strictNullChecks` is enabled (as it should be for robust code), assigning `null` or `undefined` to a type that doesn't explicitly include it will cause an error. This helps prevent unexpected `null` or `undefined` errors at runtime. `strictNullChecks` forces developers to explicitly account for potential null or undefined values, significantly enhancing code reliability.

- **`never`**: Represents the type of values that never occur. This is different from `void`, which means "no meaningful return value." `never` indicates that a function will not reach its normal completion point, or that a variable can never have a value under certain type constraints.

  **Common Use Cases for `never`:**

  1.  **Functions that always throw an exception:**
      ```typescript
      /**
       * Reports an error by throwing an exception.
       * This function never returns normally.
       * @param message - The error message to report.
       * @throws Error with the provided message.
       */
      function reportError(message: string): never {
        throw new Error(message);
        // This function never successfully returns
      }
      ```
  2.  **Functions with infinite loops:**
      ```typescript
      /**
       * Represents a function that enters an infinite processing loop.
       * This function never returns normally.
       */
      function infiniteProcessingLoop(): never {
        while (true) {
          // ... processing ...
        }
        // This function never exits normally
      }
      ```
  3.  **Exhaustive type checking in control flow (e.g., `switch` statements):** When checking all possible cases of a union type, the `default` case might correctly result in a type of `never`, indicating all valid paths have been handled. If a new member is added to the union without updating the `switch`, the type in the `default` case would no longer be `never`, signaling a compile-time error.
      ```typescript
      type Vehicle = "car" | "truck" | "bike";
      /**
       * Gets the sound a vehicle makes.
       * Demonstrates exhaustive checking with 'never'.
       * @param vehicle - The type of vehicle.
       * @returns The sound the vehicle makes as a string.
       * @throws Error if an unhandled vehicle type is provided (caught by 'never' type check).
       */
      function getVehicleSound(vehicle: Vehicle): string {
        switch (vehicle) {
          case "car":
            return "vroom";
          case "truck":
            return "honk";
          case "bike":
            return "ring-ring";
          default:
            // If all cases are handled, 'exhaustiveCheck' will be 'never'
            const exhaustiveCheck: never = vehicle;
            return exhaustiveCheck; // This line would error if a new vehicle type was added
        }
      }
      ```

- **`object` (lowercase `o`)**: Represents any value that is not a primitive type (`string`, `number`, `boolean`, `bigint`, `symbol`, `null`, or `undefined`). This includes user-defined objects, arrays, functions, etc.

  It's important to distinguish `object` from:

  - **`Object` (uppercase `O`)**: This refers to the JavaScript global `Object` type. All values (including primitives, due to JavaScript's auto-boxing) are assignable to `Object`. It's generally too broad and less useful for specific typing than lowercase `object`.
  - **`{}` (empty object type)**: This type represents an object with no properties. While any non-null, non-undefined value can be assigned to `{}`, it doesn't provide much type safety as it doesn't describe any specific structure or allow access to any properties without type assertion.

A short, self-contained example illustrating the `object` type:

```typescript
/**
 * Logs any non-primitive data to the console.
 * @param data - The non-primitive data to log. Must be an object.
 */
function logNonPrimitive(data: object): void {
  console.log("Received a non-primitive:", data);
}

logNonPrimitive({ name: "Ibuprofen", form: "tablet" }); // OK
logNonPrimitive([1, 2, 3]); // OK (arrays are objects)
logNonPrimitive(() => console.log("Function")); // OK (functions are objects)

// logNonPrimitive("a string"); // Error: Argument of type 'string' is not assignable to parameter of type 'object'.
// logNonPrimitive(123);      // Error: Argument of type 'number' is not assignable to parameter of type 'object'.
// logNonPrimitive(null);      // Error: Argument of type 'null' is not assignable to parameter of type 'object'.
```

The `object` type should be used when a function or variable is expected to hold any non-primitive value, but the specific shape or properties of that object are not known or not relevant to the current context. However, for better type safety and code clarity, it's generally preferable to use more specific types like interfaces, type aliases (covered in Section 3), or `Record<string, unknown>` when the structure of the object is known or needs to be constrained.

### Understanding Type Inference

TypeScript is smart. In many cases, it can automatically determine the type of a variable without you needing to write an explicit type annotation. This is called **type inference**.

- **Variable Initialization:** When you declare a variable and initialize it with a value, TypeScript will infer its type from the value.
  ```typescript
  let inferredMedication = "Paracetamol"; // TypeScript infers 'string'
  let inferredDosage = 500; // TypeScript infers 'number'
  let isInStock = true; // TypeScript infers 'boolean'
  ```
- **Function Return Types:** TypeScript can often infer the return type of a function by looking at its `return` statements.
  ```typescript
  /**
   * Calculates the area of a circle.
   * @param radius - The radius of the circle.
   * @returns The area of the circle.
   */
  function calculateArea(radius: number) {
    // Return type inferred as 'number'
    return Math.PI * radius * radius;
  }
  ```
- **Contextual Typing:** In some cases, the type of an expression is inferred from its location or context. For example, the type of a parameter in a callback function might be inferred from the function signature it's being passed to.

**When to Use Explicit Annotations vs. Relying on Inference:**

While type inference is convenient, it's not always best to rely on it. Here's a general guide:

- **Rely on inference for:**
  - Local variables within functions where the assigned value makes the type obvious.
  - Simple function return types where the logic is straightforward.
- **Use explicit annotations for:**
  - **Function parameters:** Always type function parameters to ensure the function receives the correct input types. This forms the function's contract.
  - **Function return types (for public APIs or complex functions):** Explicitly typing the return value of functions, especially those part of a module's public API or complex functions, makes the contract clear and helps prevent unintentional changes to the return type if the function's internal logic is modified.
  - **Object literals that are not immediately assigned to a typed variable:** If you create an object that will be used later, or whose shape isn't immediately obvious, providing a type or interface is beneficial.
  - **Variables initialized with `null` or `undefined` if they will later hold a specific type:** e.g., `let currentUser: User | null = null;`
  - **Properties in classes or interfaces.**
  - **When TypeScript can't infer the type or infers `any`** (and `noImplicitAny` is off).

**Type Widening and `as const`:**

When TypeScript infers a type from a literal value (like a string or number), it sometimes "widens" the type. For example:

```typescript
let medicationStatus = "active"; // Type inferred as 'string', not the literal 'active'
```

This means `medicationStatus` can later be assigned any string. If you want TypeScript to infer the most specific literal type, you can use a `const` assertion:

```typescript
const preciseStatus = "pending" as const; // Type inferred as literal 'pending'
// preciseStatus = "active"; // Error: Type '"active"' is not assignable to type '"pending"'.

let medicationDetails = {
  name: "Lisinopril",
  form: "Tablet",
} as const; // All properties become readonly and have literal types

// medicationDetails.name = "Enalapril"; // Error: Cannot assign to 'name' because it is a read-only property.
```

`as const` is useful for creating true constants or when you need exact literal types for discriminated unions or API contracts.

**Type Inference Code Example (from legacy docs):**

```typescript
// TypeScript infers these types automatically
let patientName = "John Smith"; // inferred as string
let patientAge = 45; // inferred as number
let isAllergic = false; // inferred as boolean
let medications = ["Aspirin", "Ibuprofen"]; // inferred as string[]

// Type inference with functions
/**
 * Calculates dosage based on weight and a multiplier.
 * Return type is inferred as number.
 * @param weight - The patient's weight.
 * @param multiplier - The dosage multiplier.
 * @returns The calculated dosage.
 */
const calculateDosage = (weight: number, multiplier: number) => {
  // 'result' is inferred as number because 'weight' and 'multiplier' are numbers
  const result = weight * multiplier;
  return result; // Return type of calculateDosage is inferred as 'number'
};

const dosageForPatient = calculateDosage(70, 1.5);
// dosageForPatient is inferred as number
```

This example further illustrates TypeScript's ability to infer types for both simple variables and function return values, reducing verbosity while maintaining type safety.

#### Deep Dive: Contextual Typing

Type inference can also work "backwards." Contextual typing occurs when the type of an expression is inferred based on its **location** or the context in which it's used. This is a powerful feature that reduces the need for explicit annotations in many common JavaScript patterns, making TypeScript code cleaner while still ensuring type safety.

This is common in scenarios like:

- **Callback Functions:** The types of parameters in a callback function are often inferred from the function signature it's being passed to.

  ```typescript
  // Assume Prescription type is defined elsewhere (e.g., in interfaces/types section)
  type Prescription = { id: number; name: string; dosage: string };
  const prescriptions: Prescription[] = [
    { id: 1, name: "Lisinopril", dosage: "10mg" },
    { id: 2, name: "Amoxicillin", dosage: "250mg" },
  ];

  // TypeScript infers 'rx' as type 'Prescription'
  // based on the 'forEach' signature for 'Prescription[]'
  prescriptions.forEach((rx) => {
    // 'rx' is contextually typed as Prescription
    // It's good practice to ensure rx and its properties are what you expect
    console.log(rx.name.toUpperCase()); // Accessing 'name' is safe
  });
  ```

- **Assignments:** When assigning a value (like a function or object literal) to a variable or property with a known type, TypeScript uses that known type as context.

  ```typescript
  // Define the expected type for an event handler
  // React and MouseEvent would typically be imported
  // For now, let's define a simplified event structure for illustration
  type SimplifiedMouseEvent = { currentTarget: { id: string } };
  type ButtonClickHandler = (event: SimplifiedMouseEvent) => void;

  // Assigning a function to a variable with the ButtonClickHandler type
  const handleRefillClick: ButtonClickHandler = (event) => {
    // 'event' is contextually typed as SimplifiedMouseEvent
    console.log(`Button ID: ${event.currentTarget.id}`);
  };

  // For object literals
  type PatientRecord = { name: string; age: number };
  const newPatient: PatientRecord = {
    // Contextually typed
    name: "Alice",
    age: 30,
    // specialty: "Cardiology" // Error: Object literal may only specify known properties...
  };
  ```

- **Function Return Statements:** The expected return type of a function (if explicitly annotated) can provide context for the `return` statements within it, ensuring they conform to the declared return type.
  ```typescript
  function getPatientSummary(patientId: number): string | null {
    if (patientId < 0) {
      return null; // OK, as null is part of the return type
    }
    // const summary = { id: patientId, notes: "All clear" };
    // return summary; // Error: Type '{ id: number; notes: string; }' is not assignable to type 'string | null'.
    return `Patient ID: ${patientId}, Status: Healthy`; // OK
  }
  ```

Understanding when TypeScript can reliably infer types and when explicit annotations are necessary is key. While inference is powerful for local variables and simple cases, explicit types are crucial for defining clear contracts at function boundaries (parameters, return types) and for complex data structures.

### Union Types (`|`)

A union type allows a variable, parameter, or return value to hold a value of **one of several possible types**. It's created using the pipe symbol (`|`) between type options. This is extremely useful for modeling situations where a value can legitimately be one of a few different things.

```typescript
/**
 * Represents an identifier which could be a numeric patient ID
 * or an alphanumeric Medical Record Number (MRN).
 * @typedef {number | string} PatientIdentifier
 */
type PatientIdentifier = number | string;

let patientRef: PatientIdentifier = 12345; // OK
console.log(`Patient Ref (ID): ${patientRef}`);

patientRef = "MRN67890"; // OK
console.log(`Patient Ref (MRN): ${patientRef}`);

// patientRef = true; // Error: Type 'boolean' is not assignable to type 'PatientIdentifier'.

/**
 * Finds a patient record using either their ID (number) or MRN (string).
 * This function demonstrates type narrowing within its body.
 * @param id - The patient's identifier, which can be a number (Patient ID) or a string (MRN).
 * @returns A message indicating the search method and the identifier used.
 */
function findPatient(id: PatientIdentifier): string {
  // To operate on 'id', we often need to narrow down its type
  if (typeof id === "string") {
    // Inside this block, TypeScript knows 'id' is a string (MRN)
    // We can safely use string-specific methods
    return `Searching by MRN: ${id.toUpperCase()}`;
  } else {
    // Inside this block, TypeScript knows 'id' is a number (Patient ID)
    // We can safely use number-specific methods/operations
    return `Searching by Patient ID: ${id.toFixed(0)}`;
  }
}

console.log(findPatient(12345));
console.log(findPatient("MRNXYZ"));
```

**Working with Union Types:**

When you have a value of a union type, TypeScript will only allow you to access members that are **common to all types** in the union. To use type-specific members, you must first narrow down the type using a **type guard**. Common type guards include:

- `typeof variable === "string"` (or "number", "boolean", "function", etc.)
- `variable instanceof ClassName`
- Property checks using the `in` operator (e.g., `'propertyName' in object`)
- Equality checks against literal values (especially in discriminated unions, covered next).

This process of using type guards to determine a more specific type within a block of code is called **narrowing**.

### Intersection Types (`&`)

An intersection type, created using the ampersand symbol (`&`), combines multiple types into a **single type that possesses all the properties and methods of each constituent type**. This is extremely useful for composing new types from smaller, reusable pieces, promoting modularity and the DRY (Don't Repeat Yourself) principle.

```typescript
/** Base properties common to all orders in SpeedyMeds */
interface BaseOrder {
  orderId: string;
  orderDate: Date;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"; // Using a literal union
}

/** Details specific to prescription refills */
interface PrescriptionRefillDetails {
  prescriptionId: number;
  medicationName: string;
  patientId: number;
  refillsRemaining: number;
}

/** Details specific to over-the-counter (OTC) supply orders */
interface SupplyOrderDetails {
  items: { itemName: string; quantity: number; price: number }[];
  deliveryAddress: string;
  isGift: boolean;
}

// Combine base properties with specific details using intersection types
type PrescriptionRefillOrder = BaseOrder & PrescriptionRefillDetails;
type SupplyOrder = BaseOrder & SupplyOrderDetails;

// Example Usage
let refillOrder: PrescriptionRefillOrder = {
  orderId: "RXRF1122",
  orderDate: new Date(),
  status: "Processing",
  prescriptionId: 9876,
  medicationName: "Lisinopril",
  patientId: 12345,
  refillsRemaining: 2,
};

let otcOrder: SupplyOrder = {
  orderId: "SUPP3344",
  orderDate: new Date(),
  status: "Shipped",
  items: [{ itemName: "Vitamin C", quantity: 1, price: 10.99 }],
  deliveryAddress: "123 Wellness Ave, Healthtown",
  isGift: false,
};

// Accessing properties from all intersected types is possible and type-safe
console.log(
  `Refill Order ${refillOrder.orderId} for ${refillOrder.medicationName}`
);
console.log(`OTC Order ${otcOrder.orderId} to ${otcOrder.deliveryAddress}`);
```

Think of intersection types as a way to "mix in" capabilities or properties from multiple type definitions to create a more comprehensive one.

### Discriminating Unions (Tagged Unions)

Discriminating unions are a very common and powerful pattern in TypeScript for working with union types, especially for modeling different states, events, or action types (e.g., in state management like Redux or Zustand, or handling variant API responses). This pattern makes it easier and safer to work with objects that can take one of several distinct forms.

It involves three key components:

1.  A **common, literal-typed property** (the _discriminant_ or _tag_). This property must exist on every type within the union, and its type is typically a string literal, number literal, or enum member.
2.  A **union of types**, where each type has a different literal value for the discriminant property.
3.  **Type narrowing** using `switch` statements or `if/else if` chains on the discriminant property. TypeScript can then correctly infer the specific type of the object within each corresponding code block.

```typescript
// Define different types of pharmacy actions, each with a 'type' property as the discriminant
type AddMedicationAction = {
  type: "ADD_MEDICATION"; // Discriminant
  payload: {
    medicationId: string;
    name: string;
    dosage: string;
    quantity: number;
  };
};

type UpdateStockAction = {
  type: "UPDATE_STOCK"; // Discriminant
  payload: { medicationId: string; newStockLevel: number };
};

type ProcessSaleAction = {
  type: "PROCESS_SALE"; // Discriminant
  payload: {
    transactionId: string;
    items: { medicationId: string; quantitySold: number }[];
  };
};

// Create the union type representing all possible pharmacy actions
type PharmacyAction =
  | AddMedicationAction
  | UpdateStockAction
  | ProcessSaleAction;

/**
 * Processes different pharmacy actions based on their type.
 * Demonstrates type narrowing using a discriminated union.
 * @param action - The pharmacy action to process.
 */
function handlePharmacyAction(action: PharmacyAction): void {
  switch (action.type) {
    case "ADD_MEDICATION":
      // TypeScript knows 'action' is AddMedicationAction here
      console.log(
        `Adding medication: ${action.payload.name} (ID: ${action.payload.medicationId})`
      );
      // Safely access action.payload.dosage, action.payload.quantity
      break;

    case "UPDATE_STOCK":
      // TypeScript knows 'action' is UpdateStockAction here
      console.log(
        `Updating stock for med ID ${action.payload.medicationId} to ${action.payload.newStockLevel}`
      );
      break;

    case "PROCESS_SALE":
      // TypeScript knows 'action' is ProcessSaleAction here
      console.log(
        `Processing sale for transaction ID: ${action.payload.transactionId}`
      );
      action.payload.items.forEach((item) => {
        console.log(
          `  Sold ${item.quantitySold} of med ID ${item.medicationId}`
        );
      });
      break;

    // Optional but recommended: Exhaustiveness Check using 'never'
    default:
      // If a new action type is added to PharmacyAction but not handled in the switch,
      // this line will cause a compile-time error because 'action' can't be assigned to 'never'.
      const _exhaustiveCheck: never = action;
      console.error(`Unhandled action type: ${(_exhaustiveCheck as any).type}`);
      return _exhaustiveCheck; // Ensures all cases are handled
  }
}

// Example Usage:
handlePharmacyAction({
  type: "ADD_MEDICATION",
  payload: {
    medicationId: "med001",
    name: "Loratadine",
    dosage: "10mg",
    quantity: 100,
  },
});
handlePharmacyAction({
  type: "UPDATE_STOCK",
  payload: { medicationId: "med002", newStockLevel: 150 },
});
```

Discriminating unions provide a robust and type-safe way to model variants and ensure all possible cases are handled, especially when combined with exhaustiveness checks using the `never` type. This pattern significantly reduces the chances of runtime errors when dealing with varied object structures.

### Type Assertions

Type assertions are a mechanism to tell the TypeScript compiler, "Trust me, I know the type of this value better than you do right now." They allow you to override the compiler's inferred type or treat a value as a more specific or different type, effectively casting it.

**Crucially, type assertions only affect the compile-time type checking; they have no impact on the runtime behavior of your JavaScript code.** They do not perform any type conversion, validation, or restructuring of data at runtime. If your assertion is incorrect, the compiler won't warn you, but your application might crash or behave unexpectedly.

**Syntax:**

TypeScript provides two syntaxes for type assertions:

1.  **`as` Syntax (Preferred):** This is the generally recommended syntax, especially in React Native projects using JSX/TSX files, because it avoids ambiguity with JSX tags.

    ```typescript
    let someValue: unknown = "this is a string from an API";
    // Assert 'someValue' to be a string to access string properties
    let strLength: number = (someValue as string).length;
    console.log(`String length: ${strLength}`);
    ```

2.  **Angle-Bracket Syntax:** This older syntax (`<Type>value`) works similarly but can cause parsing conflicts in `.tsx` files.
    ```typescript
    // let strLengthAngleBracket: number = (<string>someValue).length; // Avoid in .tsx files
    ```
    Due to potential conflicts with JSX syntax, the `as` syntax is strongly preferred.

**Common Use Cases:**

While assertions should be used judiciously, they're sometimes necessary:

- **Working with `any` or `unknown`:** After receiving data typed as `any` or `unknown` (e.g., from `JSON.parse`, a legacy API, or weakly-typed third-party library), if you have performed runtime checks or are certain of the actual type, you can assert it to a more specific type.

  ```typescript
  /**
   * Fetches application configuration.
   * In a real scenario, this would fetch data from an API.
   * @returns A promise that resolves to the configuration data (of unknown type).
   */
  async function fetchConfiguration(): Promise<unknown> {
    // In a real scenario, this would fetch data
    return { theme: "dark", version: "1.2.0", features: ["A", "B"] };
  }

  type AppConfig = { theme: string; version: string; features: string[] };

  /**
   * Fetches and applies application configuration.
   * Demonstrates type assertion after fetching unknown data.
   */
  async function applyConfig() {
    const configData = await fetchConfiguration();
    // We assert because we 'know' the shape of the data after fetching
    // It's crucial that this assertion is correct to avoid runtime errors.
    const appConfig = configData as AppConfig;
    console.log(`Theme: ${appConfig.theme}, Version: ${appConfig.version}`);
  }
  ```

- **Interfacing with DOM APIs (Conceptual for React Native):** In web development, assertions are common when `document.getElementById` returns a generic `HTMLElement`, and you know it's a more specific type like `HTMLInputElement`. While React Native abstracts the DOM, similar situations can arise with native module calls or less-typed libraries.
  ```typescript
  // Conceptual example, not direct React Native
  // const myInput = document.getElementById('user-input') as HTMLInputElement;
  // console.log(myInput.value); // Access 'value' safely after assertion
  ```
- **When TypeScript's inference is too conservative or incorrect:** In rare complex scenarios, TypeScript might not be able to infer the most precise type, and an assertion can guide it.

**Use with Extreme Caution!**

Type assertions are a powerful tool, but they're also potentially dangerous because they bypass TypeScript's static analysis for the asserted type. If your assertion is incorrect, the compiler won't catch it, and you might introduce runtime errors.

**Best Practices for Type Assertions:**

- **Use Sparingly:** Only use assertions when you're absolutely certain about the type, and TypeScript cannot infer it or validate it through type guards.
- **Prefer Type Guards:** Whenever possible, use type guards (`typeof`, `instanceof`, `in` operator, custom predicate functions) to narrow types. Type guards perform runtime checks, making your code inherently safer than assertions.
  ```typescript
  /**
   * Processes a value that could be a string or something else.
   * Demonstrates safe type handling using a type guard instead of assertion.
   * @param val - The value to process, of unknown type.
   */
  function processValue(val: unknown) {
    if (typeof val === "string") {
      // No assertion needed, val is string here
      // It's safe to use string methods.
      console.log(val.toUpperCase());
    } else {
      console.log("Value is not a string.");
    }
  }
  ```
- **Avoid Asserting to `any` if Possible:** Asserting to `any` (e.g., `value as any`) completely defeats the purpose of TypeScript for that expression. If you must assert, assert to the most specific and accurate type possible.
- **Double Assertions (`value as unknown as TargetType`):** Sometimes, to assert between two types that TypeScript believes are completely unrelated, you might need a double assertion (first to `unknown`, then to the target type). This is an even stronger signal that your types might be mismatched or your design could be improved. Use with extreme caution and only if absolutely necessary after careful consideration.
  ```typescript
  // type Point2D = { x: number; y: number };
  // type Point3D = { x: number; y: number; z: number };
  // let p2d: Point2D = {x:1, y:1};
  // If you are absolutely sure p2d is actually a Point3D from some external source:
  // let p3d = p2d as unknown as Point3D; // Highly risky if not true!
  ```

Think of type assertions as a last resort, an escape hatch for situations where you, the developer, have more information about a value's type than the compiler can statically determine. Always prioritize safer alternatives like type guards and well-defined type structures.

#### Summary Table: Basic TypeScript Types

Here's a quick reference table comparing TypeScript basic types with their JavaScript equivalents and typical usage.

| TypeScript Type               | JavaScript Equivalent/Concept                                | Notes                                                                                                     |
| :---------------------------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| `string`                      | `string` primitive                                           | Textual data.                                                                                             |
| `number`                      | `number` primitive (includes integers and floats)            | All numbers are floating-point in JS.                                                                     |
| `boolean`                     | `boolean` primitive                                          | `true` or `false`.                                                                                        |
| `bigint`                      | `bigint` primitive                                           | For arbitrarily large integers (e.g., `100n`). TS specific type.                                          |
| `symbol`                      | `symbol` primitive                                           | For unique identifiers. (Not explicitly covered in examples, but good to know)                            |
| `Type[]` or `Array<Type>`     | `Array` object                                               | Ordered list of values of type `Type`.                                                                    |
| `[Type1, Type2, ...]` (Tuple) | `Array` object (conventionally)                              | Fixed-size, ordered list with potentially different types at each position. TS specific.                  |
| `any`                         | Any JavaScript value (type checking disabled)                | Use sparingly; undermines type safety.                                                                    |
| `unknown`                     | Any JavaScript value (type checking enforced before use)     | Safer alternative to `any`. Requires narrowing. TS specific.                                              |
| `void`                        | `undefined` (for function returns that don't return a value) | Indicates no intended return value.                                                                       |
| `null`                        | `null` primitive                                             | Represents intentional absence of value. Treat as distinct type with `strictNullChecks`.                  |
| `undefined`                   | `undefined` primitive                                        | Represents uninitialized variables or missing properties. Treat as distinct type with `strictNullChecks`. |
| `never`                       | No direct equivalent (conceptually, a non-terminating path)  | Represents values that never occur. Useful for exhaustive checks. TS specific.                            |
| `object`                      | Any non-primitive value (`typeof x === 'object'`             |                                                                                                           | 'function'`) | More specific than `any`, but less specific than an interface or `Record<string, unknown>`. TS specific. |

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
> - [TypeScript Handbook: Everyday Types (covers primitives, arrays, any, unknown, etc.)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
> - [TypeScript Handbook: `null` and `undefined`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)
> - [TypeScript Handbook: `unknown` type](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)

Mastering these basic types is crucial as they form the building blocks for more complex type definitions and patterns you'll encounter in TypeScript and React Native development. The next section will build upon this foundation by introducing interfaces and type aliases for creating more structured and reusable types.
