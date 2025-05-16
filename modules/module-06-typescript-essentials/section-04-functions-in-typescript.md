## Section 4: Functions in TypeScript

Functions are fundamental building blocks in JavaScript and TypeScript. TypeScript enhances functions by allowing you to explicitly define types for parameters and return values. This brings clarity and predictability to your function signatures, reducing errors and making your code easier to understand and maintain. This section covers how to type functions, including various parameter types, return type annotations, function overloading, and handling `this`, crucial for writing robust logic in applications like SpeedyMeds.

### Conceptual Content: Typing Functions

TypeScript allows you to specify the types of data that a function accepts (its parameters) and the type of data it will output (its return value).

#### Typing Parameters and Return Values

You can add type annotations after each parameter name and after the function's closing parenthesis for the return value.

A short, self-contained example of a typed function:

```typescript
// Using the Medication interface from the previous section
interface Medication {
  name: string;
  dosage: string;
  quantity: number;
}

/**
 * Generates a summary string for a given medication.
 * Includes details such as name and dosage, and optionally quantity.
 * @param {Medication} medication - The medication object containing details like name, dosage, and quantity.
 * @param {boolean} includeQuantity - A flag to determine if the medication quantity should be included in the summary.
 * @returns {string} A descriptive summary string of the medication.
 */
function getMedicationSummary(
  medication: Medication,
  includeQuantity: boolean
): string {
  let summary = `Medication: ${medication.name} (${medication.dosage})`;
  if (includeQuantity) {
    summary += `, Quantity: ${medication.quantity}`;
  }
  return summary;
}

const paracetamol: Medication = {
  name: "Paracetamol",
  dosage: "500mg",
  quantity: 50,
};

const summary1 = getMedicationSummary(paracetamol, true);
console.log(summary1); // Output: Medication: Paracetamol (500mg), Quantity: 50

const summary2 = getMedicationSummary(paracetamol, false);
console.log(summary2); // Output: Medication: Paracetamol (500mg)

// const invalidCall = getMedicationSummary("Aspirin", "10"); // Error: Argument of type 'string' is not assignable to parameter of type 'Medication'.
```

In this example, `getMedicationSummary` takes a `medication` object (typed with the `Medication` interface) and a boolean `includeQuantity`. It explicitly returns a `string`. TypeScript will check that arguments passed to this function match the specified types and that the function indeed returns a string. The commented-out `invalidCall` shows how TypeScript would flag incorrect argument types.

**Return Type Inference:** If you don't explicitly annotate the return type, TypeScript will try to infer it based on the `return` statements within the function. While this can be convenient, explicitly stating the return type is often a good practice for clarity, especially for public APIs or complex functions.

#### Arrow Functions

The syntax for typing arrow functions is similar. Type annotations for parameters go inside the parentheses, and the return type annotation goes after the parameter list, before the `=>`.

A short, self-contained example of a typed arrow function:

```typescript
interface Patient {
  patientId: string;
  fullName: string;
}

const formatPatientGreeting = (patient: Patient, greeting: string): string => {
  return `${greeting}, ${patient.fullName} (ID: ${patient.patientId})!`;
};

const currentPatient: Patient = {
  patientId: "P00123",
  fullName: "Alice Wonderland",
};

const message = formatPatientGreeting(currentPatient, "Welcome back");
console.log(message);
// Output: Welcome back, Alice Wonderland (ID: P00123)!
```

This `formatPatientGreeting` arrow function clearly defines its parameter types (`Patient` and `string`) and its return type (`string`). This ensures type safety for its inputs and output.

**Arrow Functions and Lexical `this`:**
Arrow functions (`=>`) do not have their own `this` binding. Instead, they capture the `this` value of the enclosing lexical scope at the time they are created. This behavior is identical to JavaScript arrow functions and is often beneficial for callbacks and methods within classes to avoid issues with `this` rebinding, ensuring `this` refers to what you expect.

#### Optional and Default Parameters

Just like in JavaScript, you can have optional and default-initialized parameters in TypeScript functions.

- **Optional Parameters:** Add a `?` after the parameter name to make it optional. Optional parameters must come after required parameters or have a default value.
- **Default-Initialized Parameters:** Provide a default value for a parameter using `= value`. If an argument is not provided for a default parameter (or if `undefined` is passed), it will take its default value. Default parameters are implicitly optional.

A short, self-contained example illustrating optional and default parameters:

```typescript
/**
 * Records a patient visit with optional notes and a default visit type.
 * This function logs the details of a patient's visit to the console.
 * @param {string} patientId - The unique identifier for the patient.
 * @param {string} [visitType="Routine Checkup"] - The type of the visit (e.g., "Follow-up", "Emergency"). Defaults to "Routine Checkup".
 * @param {string} [notes] - Optional notes or comments about the visit.
 * @returns {void} This function does not return any value.
 */
function recordPatientVisit(
  patientId: string,
  visitType: string = "Routine Checkup", // Default parameter
  notes?: string // Optional parameter
): void {
  console.log(`Recording visit for patient: ${patientId}`);
  console.log(`Visit Type: ${visitType}`);
  if (notes) {
    console.log(`Notes: ${notes}`);
  }
  console.log("---");
}

recordPatientVisit("PAT001");
// Output:
// Recording visit for patient: PAT001
// Visit Type: Routine Checkup
// ---

recordPatientVisit("PAT002", "Follow-up");
// Output:
// Recording visit for patient: PAT002
// Visit Type: Follow-up
// ---

recordPatientVisit("PAT003", "Emergency", "Patient reports high fever.");
// Output:
// Recording visit for patient: PAT003
// Visit Type: Emergency
// Notes: Patient reports high fever.
// ---
```

In `recordPatientVisit`, `visitType` defaults to "Routine Checkup" if not provided, and `notes` is entirely optional. This flexibility is useful for functions with varying input requirements, common in our SpeedyMeds patient management scenarios.

#### Rest Parameters

Rest parameters allow a function to accept an indefinite number of arguments as an array. In TypeScript, you type rest parameters as an array of a specific type.

A short, self-contained example using rest parameters:

```typescript
/**
 * Logs a prescription order for a patient, listing multiple medications.
 * @param {string} patientId - The unique identifier for the patient.
 * @param {...string} medicationNames - A list of medication names to be prescribed.
 * @returns {void} This function does not return any value.
 */
function prescribeMedications(
  patientId: string,
  ...medicationNames: string[]
): void {
  console.log(`Prescribing for patient ${patientId}:`);
  medicationNames.forEach((medName, index) => {
    console.log(`${index + 1}. ${medName}`);
  });
  console.log("Total medications prescribed: " + medicationNames.length);
}

prescribeMedications("PAT004", "Lisinopril", "Metformin", "Atorvastatin");
// Output:
// Prescribing for patient PAT004:
// 1. Lisinopril
// 2. Metformin
// 3. Atorvastatin
// Total medications prescribed: 3

prescribeMedications("PAT005", "Amoxicillin");
// Output:
// Prescribing for patient PAT005:
// 1. Amoxicillin
// Total medications prescribed: 1
```

Here, `...medicationNames: string[]` allows the `prescribeMedications` function to accept any number of medication names after the `patientId`. Inside the function, `medicationNames` is treated as an array of strings.

#### Function Type Expressions (Function Types)

Sometimes, you need to describe the type of a function itself, for example, when passing a function as a callback or assigning it to a variable. This is done using a function type expression.

The syntax looks similar to an arrow function definition:
`(param1: type1, param2: type2) => returnType`

A short, self-contained example of a function type expression:

```typescript
interface Order {
  orderId: string;
  totalAmount: number;
  isPaid: boolean;
}

// Define a function type for processing orders
type OrderProcessor = (order: Order) => boolean;

const processPayment: OrderProcessor = (order) => {
  if (!order.isPaid && order.totalAmount > 0) {
    console.log(
      `Processing payment of $${order.totalAmount} for order ${order.orderId}...`
    );
    // Simulate payment processing
    order.isPaid = true;
    return true;
  }
  if (order.isPaid) {
    console.log(`Order ${order.orderId} is already paid.`);
    return true;
  }
  return false;
};

const sendConfirmationEmail: OrderProcessor = (order) => {
  if (order.isPaid) {
    console.log(`Sending confirmation email for order ${order.orderId}.`);
    return true;
  }
  console.log(`Cannot send confirmation for unpaid order ${order.orderId}.`);
  return false;
};

const myOrder: Order = { orderId: "ORD123", totalAmount: 49.99, isPaid: false };

processPayment(myOrder);
// Output: Processing payment of $49.99 for order ORD123...
sendConfirmationEmail(myOrder);
// Output: Sending confirmation email for order ORD123.

// const invalidProcessor: OrderProcessor = (orderId: string) => true;
// Error: Type '(orderId: string) => boolean' is not assignable to type 'OrderProcessor'.
// Types of parameters 'orderId' and 'order' are incompatible.
```

In this SpeedyMeds-related example, `OrderProcessor` is a type alias defining a function that takes an `Order` object and returns a `boolean`. Both `processPayment` and `sendConfirmationEmail` conform to this `OrderProcessor` type. TypeScript ensures that any function assigned to a variable of type `OrderProcessor` matches the specified signature, as shown by the `invalidProcessor` error.

#### Function Overloading

Sometimes a function can be called with different numbers or types of arguments and may return different types based on the input. TypeScript allows you to define multiple function signatures for a single function name. This is called function overloading.

- The compiler will try to match a function call with one of the overload signatures from top to bottom.
- You provide a single implementation function whose signature must be general enough to be compatible with all the overload signatures.
- The implementation signature itself is not directly visible or callable from the outside; only the overload signatures are.

A short, self-contained example of function overloading:

```typescript
// Overload signatures for finding a patient
function findPatient(id: number): Patient | undefined;
function findPatient(
  name: string,
  includeInactive?: boolean
): Patient[] | undefined;

// Implementation signature (must encompass all overloads)
function findPatient(
  param1: number | string,
  param2?: boolean
): Patient | Patient[] | undefined {
  const mockPatients: Patient[] = [
    { patientId: "P001", fullName: "Alice Wonderland", isActive: true },
    { patientId: "P002", fullName: "Bob The Builder", isActive: true },
    { patientId: "P003", fullName: "Alice Smith", isActive: false },
  ];

  if (typeof param1 === "number") {
    // Simulating find by ID (which is a string in our Patient interface, so let's adapt)
    return mockPatients.find((p) => p.patientId === `P00${param1}`);
  }
  if (typeof param1 === "string") {
    // Simulating find by name
    const includeInactive = param2 === undefined ? true : param2;
    return mockPatients.filter(
      (p) =>
        p.fullName.toLowerCase().includes(param1.toLowerCase()) &&
        (includeInactive || p.isActive)
    );
  }
  return undefined; // Should not happen if overloads are correct
}

// Example Patient interface for context (can be augmented)
interface Patient {
  patientId: string;
  fullName: string;
  isActive?: boolean; // Added for the example
}

const patientById = findPatient(1); // patientId P001
console.log(patientById ? patientById.fullName : "Patient not found by ID");
// Output: Alice Wonderland

const patientsByName = findPatient("Alice");
console.log(
  patientsByName
    ? patientsByName.map((p) => p.fullName)
    : "Patients not found by name"
);
// Output: [ 'Alice Wonderland', 'Alice Smith' ]

const activePatientsByName = findPatient("Alice", false);
console.log(
  activePatientsByName
    ? activePatientsByName.map((p) => p.fullName)
    : "Active patients not found"
);
// Output: [ 'Alice Wonderland' ]
```

In this SpeedyMeds scenario, `findPatient` has two overload signatures: one to find a patient by a numeric ID (returning a single `Patient` or `undefined`), and another to find patients by name (a string), optionally including inactive patients (returning an array of `Patient` or `undefined`). The implementation function handles both cases.

#### Typing `this`

TypeScript allows you to explicitly specify the type of `this` within a function by adding a `this` parameter as the first parameter in the function definition. This `this` parameter is a compile-time construct only; it's erased during transpilation to JavaScript and doesn't affect the runtime behavior or parameter list.

It is particularly useful for ensuring that methods are called with the correct context, especially with callbacks or when functions are passed around.

A short, self-contained example illustrating `this` typing:

```typescript
interface PharmacyInventory {
  pharmacyName: string;
  medications: Medication[]; // Using Medication from previous example
  getMedicationCount(this: PharmacyInventory): number;
  getFormattedInventory(this: PharmacyInventory): string;
}

const mainStreetPharmacyInventory: PharmacyInventory = {
  pharmacyName: "Main Street Pharmacy",
  medications: [
    { name: "Lisinopril", dosage: "10mg", quantity: 200 },
    { name: "Metformin", dosage: "500mg", quantity: 150 },
  ],
  getMedicationCount: function (this: PharmacyInventory) {
    return this.medications.length;
  },
  getFormattedInventory: function (this: PharmacyInventory) {
    let inventoryList = `${this.pharmacyName} Inventory:\n`;
    this.medications.forEach((med) => {
      inventoryList += `- ${med.name} (${med.dosage}): ${med.quantity} units\n`;
    });
    return inventoryList;
  },
};

console.log(mainStreetPharmacyInventory.getMedicationCount()); // Output: 2
console.log(mainStreetPharmacyInventory.getFormattedInventory());
// Output:
// Main Street Pharmacy Inventory:
// - Lisinopril (10mg): 200 units
// - Metformin (500mg): 150 units

const countGetter = mainStreetPharmacyInventory.getMedicationCount;
// console.log(countGetter()); // Error at runtime if not bound, TypeScript might not catch if `this` isn't typed
// With `this` typed, TypeScript might warn if `noImplicitThis` is on and it can't infer context.

// To correctly call it if detached:
const boundCountGetter = countGetter.bind(mainStreetPharmacyInventory);
console.log(boundCountGetter()); // Output: 2
```

Here, `getMedicationCount` and `getFormattedInventory` in the `PharmacyInventory` interface explicitly type `this` as `PharmacyInventory`. This ensures that within these methods, `this` correctly refers to an instance of `PharmacyInventory`. If you try to call `countGetter` directly (after detaching it from its object), `this` would be `undefined` in strict mode, leading to a runtime error. Typing `this` helps prevent such errors or highlights them during development, especially with compiler options like `noImplicitThis`.

> **Quick Note on Function Type Checking (Advanced):**
> TypeScript determines if one function type is assignable to another based on their structure (structural typing). This involves checking parameter compatibility (parameters are generally checked contravariantly or bivariantly depending on `strictFunctionTypes` setting) and return type compatibility (return types are checked covariantly). This means a function can be used where another is expected if its "shape" (parameters and return type) is compatible, promoting flexibility.

> 🍏 **(iOS Developers - Swift Background):**
>
> **Comparison:** Swift functions have clearly defined parameter types and return types (e.g., `func greet(person: String) -> String`). TypeScript mirrors this by allowing explicit type annotations for function parameters and return values. Swift's concept of function types (e.g., `(Int, Int) -> Int`) is similar to TypeScript's function type expressions.
>
> **Key Takeaway:** Typing functions in TypeScript provides a level of explicitness and safety similar to Swift, making function signatures clear and predictable.
>
> **Source:** [Swift Language Guide - Functions](https://docs.swift.org/swift-book/LanguageGuide/Functions.html)

> 🤖 **(Android Developers - Kotlin/Java Background):**
>
> **Comparison:** In Kotlin and Java, method signatures explicitly declare parameter types and return types. TypeScript brings this same discipline to JavaScript functions. Kotlin's lambda expressions with explicit types (e.g., `val sum: (Int, Int) -> Int = { x, y -> x + y }`) are analogous to TypeScript's typed arrow functions and function type expressions.
>
> **Key Takeaway:** TypeScript allows for the same kind of strongly-typed function definitions you are used to in Kotlin/Java, improving code reliability and understandability.
>
> **Source:** [Kotlin Docs - Functions](https://kotlinlang.org/docs/functions.html), [Kotlin Docs - Lambdas](https://kotlinlang.org/docs/lambdas.html)

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
> - [TypeScript Handbook: More on Functions (covers optional, default, rest params, etc.)](https://www.typescriptlang.org/docs/handbook/2/functions.html#more-on-functions)

Properly typing functions is a cornerstone of writing robust TypeScript code. It not only catches errors early but also makes your code self-documenting, greatly aiding collaboration and long-term maintenance.
