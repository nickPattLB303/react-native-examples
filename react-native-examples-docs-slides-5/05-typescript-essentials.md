---
marp: true
headingDivider: 6
paginate: true
---

# **TypeScript Essentials**

## **1. Introduction: Why TypeScript for React Native?**

Welcome to the essential foundation for modern React Native development: TypeScript. While React Native can be written using standard JavaScript, this course mandates the use of TypeScript for all React Native code, aligning with current industry best practices and the default setup for new React Native projects. Understanding *why* TypeScript is crucial will set the stage for building robust, maintainable, and scalable mobile applications like the "SpeedyMeds" capstone project.

The shift towards TypeScript in the JavaScript ecosystem, especially for complex applications like those built with React Native, isn't accidental. It addresses fundamental challenges inherent in large-scale development with dynamically typed languages. The increasing complexity of mobile applications demands more rigorous development practices, and TypeScript provides a powerful toolset to meet these demands.

### **1.1 The Core Value: Static Typing**

JavaScript is **dynamically typed**, meaning the type of a variable (e.g., string, number, object) is checked only when the code runs (at runtime). This offers flexibility but can lead to unexpected errors that only surface during execution, potentially crashing your app or causing subtle bugs.

TypeScript introduces **static typing** to JavaScript. You can explicitly define the types of variables, function parameters, and return values. The TypeScript compiler then checks these types *before* you run the code (at compile-time).

*   **Benefit:** Catch errors early! Type mismatches, typos in property names, incorrect function arguments -- TypeScript flags these during development, long before they reach your users. This leads to more reliable and robust applications. Think of it as adding a safety net to your JavaScript code.

### **1.2 Enhanced Developer Experience (DX)**

Static types unlock powerful features in modern code editors like Visual Studio Code:

*   **IntelliSense & Autocompletion:** The editor understands the shape of your objects and functions, providing accurate suggestions as you type.
*   **Code Navigation:** Easily jump to definitions or find all references of variables and functions.
*   **Refactoring:** Rename variables or restructure code with greater confidence, knowing the compiler will catch related errors.

*   **Benefit:** These features significantly boost productivity, reduce guesswork, and make navigating complex codebases much easier, especially in team environments.

### **1.3 Code Maintainability & Scalability**

Explicit types act as living documentation. They make the intent of the code clearer and define the "contracts" between different parts of your application.

*   **Benefit:** As projects grow (like the SpeedyMeds capstone) or when new developers join, TypeScript makes the codebase easier to understand, maintain, and scale. Refactoring becomes less risky, and collaboration is smoother.

### **1.4 Adaptation Notes: Connecting to Your Background**

Your prior experience will shape how you approach TypeScript:

> 📲 **For Native Developers (Android - Java/Kotlin; iOS - Swift/Objective-C):**
>
> The concept of static typing will be familiar. You'll recognize similarities in classes, interfaces (protocols in Swift), and generics.
>
> **Key Differences:**
>
> *   **Structural vs. Nominal Typing:** This is a fundamental shift. Java/Kotlin/Swift use *nominal* typing (types match based on declared names/inheritance). TypeScript uses *structural* typing (types match if they have the same *shape* or structure, regardless of name). This means an object can satisfy an interface simply by having the required properties, without explicitly declaring `implements InterfaceName`. Understanding this is crucial for grasping type compatibility in TypeScript.
> *   **Type Erasure:** TypeScript types exist only at compile-time and are erased when compiled to JavaScript. Java/Swift often retain type information at runtime.
> *   **Null Handling:** TypeScript's `strictNullChecks` (enabled by default) brings it closer to Swift's optionals or Kotlin's nullable types (`?`), forcing explicit handling of `null` and `undefined`.

> ⚛️ **For React Developers (JavaScript):**
>
> View TypeScript as JavaScript with superpowers. It adds a safety layer, catching errors you might only find during runtime in plain JS. The improved tooling (autocompletion, error highlighting) will significantly enhance your development workflow. Focus on understanding type annotations and how they prevent common JavaScript pitfalls.

> 🅰️ **For Angular Developers:**
>
> You're already familiar with TypeScript! The core language concepts (types, interfaces, generics, etc.) are identical. The main difference lies in the application of TypeScript within the framework context. React Native uses TypeScript for typing component props, state, and interacting with JSX, which differs from Angular's use of decorators (@Component, @Injectable), modules (NgModule), and dependency injection patterns.

### **1.5 Course Standard: TypeScript + JSDoc**

This course requires not only TypeScript for type safety but also comprehensive JSDoc comments for documentation. While TypeScript defines the *structure* and *contract* of your code for the compiler, JSDoc describes the *purpose*, *intent*, *usage*, and *nuances* for human developers.

*   **Why Both?** This dual approach ensures maximum clarity and maintainability. Types guarantee structural correctness, while JSDoc provides essential context, explanations, and usage examples, especially for complex logic or public APIs within the SpeedyMeds application. We will demonstrate this combination throughout the examples.

## **2. Fundamentals: Basic & Special Types**

Let's dive into the fundamental building blocks of TypeScript's type system. These types correspond closely to JavaScript's primitive values but with explicit annotations.

### **2.1 Primitives: `string`, `number`, `boolean`**

These are the most common basic types:

*   **`string`**: Represents textual data, enclosed in single (`'`) or double (`"`) quotes, or template literals (```).

```typescript
let medicationName: string = "Lisinopril";
let pharmacyName: string = `SpeedyMeds Branch #${12}`;
```

*   **`number`**: Represents all numeric values, including integers and floating-point numbers. Unlike languages like Java or Swift, TypeScript does not differentiate between `int`, `float`, `double`, etc..

```typescript
let dosage: number = 10; // Represents mg
let price: number = 15.99;
let quantity: number = 100;
```

*   **`boolean`**: Represents logical `true` or `false` values.

```typescript
let requiresPrescription: boolean = true;
let isGenericAvailable: boolean = false;
```

> 💡 **Note:** Always use the lowercase type names (`string`, `number`, `boolean`). The capitalized versions (`String`, `Number`, `Boolean`) refer to built-in JavaScript constructor functions and should generally be avoided as type annotations.

### **2.2 `null` & `undefined`**

These two types represent "empty" or "uninitialized" values in JavaScript and TypeScript:

*   **`null`**: Represents the intentional absence of an object value.
*   **`undefined`**: Represents a variable that has been declared but not yet assigned a value.

By default, in older TypeScript setups or if explicitly configured, `null` and `undefined` could be assigned to variables of *any* type (like `string` or `number`), which was a common source of errors.

**`strictNullChecks`:** This crucial compiler option changes the behavior.

*   **Enabled (`true`)**: (Recommended and default in modern setups like `@tsconfig/react-native`) `null` and `undefined` are treated as distinct types. You cannot assign them to variables of other types unless you explicitly allow it using a **union type** (covered later). This forces you to handle potential null/undefined values, preventing runtime errors like "Cannot read property 'x' of undefined".
*   **Disabled (`false`)**: `null` and `undefined` can be assigned to any type, effectively hiding potential errors until runtime.

```typescript
// With strictNullChecks: true (Recommended)
let patientNotes: string | null = null; // OK - Explicitly allowed null via union type
let doctorName: string = "Dr. Smith";
// doctorName = null; // Error: Type 'null' is not assignable to type 'string'.

let supervisor: string | undefined; // OK - Can be string or undefined
```

> 📲 **Native Developer Context:** Enabling `strictNullChecks` aligns TypeScript more closely with the explicit null-safety features found in Kotlin (`?`) and Swift (`Optional`), making the transition smoother and enforcing safer coding practices familiar from native development.

### **2.3 Array Types**

Arrays are ordered collections of values. TypeScript allows you to specify the type of elements an array can hold.

There are two equivalent syntaxes:

1.  **`Type[]`**: The element type followed by `[]`.
2.  **`Array<Type>`**: The generic `Array` type with the element type in angle brackets.

```typescript
/** Array of prescription IDs */
let prescriptionIds: number[] = [];

/** Array of active ingredients */
let activeIngredients: Array<string> = [];

/** Array of patient objects (assuming 'Patient' type is defined) */
let waitingList: Patient[] = [ /*... patient objects... */ ];
```

### **2.4 Basic Object Types**

Objects are collections of key-value pairs (properties). You can define the "shape" of an object inline by listing its properties and their types within curly braces `{}`.

```typescript
/** Represents a specific medication */
let medication: {
  name: string;
  dosageMg: number;
  form: string; // e.g., "Tablet", "Capsule"
  ndcCode?: string; // Optional property indicated by '?'
} = {
  name: "Atorvastatin",
  dosageMg: 20,
  form: "Tablet"
  // ndcCode is optional, so omitting it is fine
};

// Accessing properties (type-safe)
console.log(medication.name);
// console.log(medication.manufacturer); // Error: Property 'manufacturer' does not exist...
```

*   **Optional Properties:** Use a `?` after the property name to mark it as optional. The property can either exist with the specified type or be omitted entirely.

### **2.5 Special Type: `any`**

The `any` type is TypeScript's escape hatch. It tells the compiler to essentially **turn off type checking** for a particular variable or expression. A variable of type `any` can hold *any* kind of value, and you can perform *any* operation on it without compile-time errors.

```typescript
let flexibleVar: any = "I am a string";
flexibleVar = 123; // OK
flexibleVar = true; // OK
flexibleVar.someMethodThatMightNotExist(); // No compile error! Might crash at runtime.
flexibleVar.propertyThatDoesNotExist = 'assigned'; // No compile error!
```

**Use any with Extreme Caution!**

While any provides flexibility, it undermines the core benefit of using TypeScript -- static type safety. It should be avoided whenever possible. Its legitimate uses are typically limited to:

*   Gradually migrating existing JavaScript codebases.
*   Interfacing with third-party libraries that lack proper type definitions.

> ⚠️ The `noImplicitAny` compiler option helps prevent accidental use of `any` by flagging variables whose types cannot be inferred and default to `any`.

### **2.6 Special Type: `unknown`**

Introduced as a **type-safe alternative to `any`**, `unknown` can also hold any value. However, TypeScript **prevents you from performing most operations** on an `unknown` value until you narrow down its type using type checks or assertions.

```typescript
let uncertainInput: unknown = receiveExternalData(); // Could be anything

// console.log(uncertainInput.length); // Error: Object is of type 'unknown'.

if (typeof uncertainInput === 'string') {
  // OK: Inside this block, TypeScript knows uncertainInput is a string
  console.log(uncertainInput.toUpperCase());
} else if (Array.isArray(uncertainInput)) {
  // OK: Inside this block, TypeScript knows uncertainInput is an array
  console.log(`Received array with ${uncertainInput.length} items.`);
}
```

**Prefer `unknown` over `any`** when dealing with values whose types are genuinely unpredictable (e.g., API responses, user input). It forces you to handle the uncertainty safely.

The distinction between `any` and `unknown` highlights a core TypeScript design principle: providing safety mechanisms (`unknown`) while still offering an escape hatch (`any`) for flexibility and JavaScript interoperability. `unknown` encourages safer coding patterns by default.

### **2.7 Special Type: `void`**

The `void` type signifies the **absence of a return value**. It's primarily used to annotate functions that do not return anything meaningful.

```typescript
/**
 * Logs a prescription refill request to the console.
 * Does not return any value.
 * @param prescriptionId - The ID of the prescription being refilled.
 * @returns {void}
 */
function logRefillRequest(prescriptionId: number): void {
  console.log(`Refill requested for prescription ID: ${prescriptionId}`);
  // No 'return' statement, or 'return;' or 'return undefined;'
}
```

You can declare variables of type `void`, but they can only be assigned `undefined` (or `null` if `strictNullChecks` is off), making them rarely useful outside of function return types.

## **3. Fundamentals: Type Inference & Contextual Typing**

TypeScript aims to provide type safety without excessive verbosity. Two key mechanisms help achieve this: Type Inference and Contextual Typing. These features allow the compiler to figure out types automatically in many situations, reducing the need for explicit annotations. This balance between safety and developer convenience is a major reason for TypeScript's popularity, especially compared to more verbose languages like older versions of Java.

### **3.1 Type Inference**

When you declare and initialize a variable without an explicit type annotation, TypeScript often **infers** its type based on the initial value.

```typescript
let patientId = 12345; // Inferred type: number
let isCoveredByInsurance = true; // Inferred type: boolean
let defaultMedication = "Ibuprofen"; // Inferred type: string
let commonDosages = [200, 400, 600]; // Inferred type: number[]
```

**Best Common Type:** When inference involves multiple expressions (like elements in an array), TypeScript tries to find the "best common type" that fits all expressions. If a single best type exists (e.g., all elements are numbers), that type is used. If not, TypeScript infers a union type.

```typescript
// All elements are numbers or null
let readings = [120, 122, null, 118]; // Inferred type: (number | null)[]

// Elements are different primitive types
let mixedData = [10, "pending", true]; // Inferred type: (number | string | boolean)[]

// Elements are instances of different classes with no common base class explicitly provided
// let zoo = [new Rhino(), new Elephant(), new Snake()]; // Inferred type: (Rhino | Elephant | Snake)[]
// To get Animal, you'd need to explicitly annotate: let zoo: Animal[] = [...]
```

### **3.2 Contextual Typing**

Type inference can also work "backwards." Contextual typing occurs when the type of an expression is inferred based on its **location** or the context in which it's used.

This is common in scenarios like:

*   **Callback Functions:** The types of parameters in a callback function are often inferred from the function signature it's being passed to.

```typescript
type Prescription = { id: number; name: string; /*... */ };
const prescriptions: Prescription[] = [/*... */];

// TypeScript infers 'rx' as type 'Prescription' based on the 'forEach' signature for 'Prescription[]'
prescriptions.forEach((rx) => {
  console.log(rx.name.toUpperCase()); // Accessing 'name' is safe
});
```

*   **Assignments:** When assigning a value (like a function) to a variable or property with a known type, TypeScript uses that known type as context.

```typescript
// Define the expected type for an event handler
type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

// Assigning a function to a variable with the ButtonClickHandler type
const handleRefillClick: ButtonClickHandler = (event) => {
  // 'event' is contextually typed as React.MouseEvent<HTMLButtonElement>
  // We can safely access properties like 'currentTarget'
  console.log(`Button ID: ${event.currentTarget.id}`);
};
```

*   **Function Return Statements:** The expected return type of a function can provide context for the `return` statements within it.

Contextual typing significantly reduces the need for explicit type annotations in many common JavaScript patterns, making TypeScript code cleaner while still ensuring type safety.

Understanding when TypeScript can reliably infer types and when explicit annotations are necessary is key to writing effective TypeScript. While inference is powerful for local variables and simple cases, explicit types are crucial for defining clear contracts at function boundaries (parameters, return types) and for complex data structures, ensuring both compiler safety and human readability.

## **4. Fundamentals: Interfaces vs. Types**

TypeScript offers two primary ways to name and define the shape of objects or other data structures: `interface` and `type` (type aliases). While they often overlap in functionality, especially for basic object shapes, they have distinct characteristics and use cases. The choice between them can sometimes be a matter of style or convention, but understanding their differences is important, particularly declaration merging for interfaces.

### **4.1 `interface`**

An `interface` declaration is primarily used to define the structure or "shape" that an object must conform to. It lists the required or optional properties and methods an object should have.

```typescript
/**
 * Defines the structure for a prescription record.
 * @interface Prescription
 */
interface Prescription {
  /** Unique identifier for the prescription */
  id: number;
  /** Name of the prescribed medication */
  medicationName: string;
  /** Dosage information (e.g., "10mg", "5ml") */
  dosage: string;
  /** How often the medication should be taken (e.g., "Once daily") */
  frequency: string;
  /** ID of the patient this prescription belongs to */
  patientId: number;
  /** Number of refills remaining */
  refillsRemaining: number;
  /** Name of the prescribing doctor (optional) */
  prescriber?: string;
  /** Method to check if refills are available */
  hasRefills(): boolean;
}

/**
 * Displays prescription details.
 * @param {Prescription} rx - The prescription object.
 * @returns {void}
 */
function displayPrescription(rx: Prescription): void {
  console.log(`Medication: ${rx.medicationName} (${rx.dosage})`);
  console.log(`Refills left: ${rx.refillsRemaining}`);
  if (rx.hasRefills()) {
    console.log("Eligible for refill.");
  }
  if (rx.prescriber) {
    console.log(`Prescribed by: ${rx.prescriber}`);
  }
}

// Example usage:
const sampleRx: Prescription = {
  id: 101,
  medicationName: "Amoxicillin",
  dosage: "500mg",
  frequency: "Twice daily",
  patientId: 12345,
  refillsRemaining: 2,
  hasRefills: function() { return this.refillsRemaining > 0; }
};

displayPrescription(sampleRx);
```

Interfaces can also be implemented by classes using the `implements` keyword, enforcing that the class adheres to the interface's contract (though this is less central in functional React Native development).

### **4.2 `type` (Type Alias)**

A type alias, declared using the `type` keyword, creates a new name for *any* type. This is more versatile than `interface` as it's not limited to object shapes.

```typescript
/**
 * Represents a patient record.
 * @typedef {object} Patient
 * @property {number} id - Unique patient identifier.
 * @property {string} name - Patient's full name.
 * @property {string} dateOfBirth - Patient's date of birth (YYYY-MM-DD).
 * @property {string} [allergies] - Optional list of known allergies.
 */
type Patient = {
  id: number;
  name: string;
  dateOfBirth: string; // Consider using Date type in real scenarios
  allergies?: string;
};

/**
 * Represents the possible statuses of a medication order.
 * @typedef {"Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"} OrderStatus
 */
type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

/**
 * Type alias for a patient's unique ID.
 * @typedef {number} PatientID
 */
type PatientID = number;

let currentStatus: OrderStatus = "Processing";
let patientIdentifier: PatientID = 12345;
```

Type aliases are powerful for creating unions (`|`), intersections (`&`), naming primitive types, defining tuples, and working with advanced mapped or conditional types.

### **4.3 Key Differences**

The most significant difference lies in **extensibility**:

*   **Declaration Merging (`interface` only):** You can declare the same interface multiple times, and TypeScript will merge their definitions into a single one. This is useful for augmenting existing interfaces, perhaps from third-party libraries.

```typescript
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
  // You can even add methods
  getArea(): number;
}
// Merged Box has height, width, scale, and getArea()
const box: Box = { height: 5, width: 6, scale: 10, getArea: () => box.height * box.width };
```

*   **Non-Extendable (`type`):** Type aliases cannot be declared more than once with the same name in the same scope. They are "closed" once defined.

```typescript
type Window = { title: string };
// type Window = { size: number }; // Error: Duplicate identifier 'Window'.
```

Other differences include:

*   **Versatility:** `type` can name any type; `interface` is primarily for object shapes.
*   **Syntax:** Extending uses `extends` for interfaces, while combining types often uses intersection (`&`) for type aliases.

### **4.4 When to Use Which (`interface` vs. `type`)**

While there's overlap, here's common guidance:

*   **Use `interface` when:**
    *   Defining the shape of objects or class contracts.
    *   You need or anticipate needing declaration merging (common for library authors allowing augmentation).
    *   You prefer the `extends` keyword for inheritance-like patterns (can be slightly more performant for the compiler than type intersections).
    *   Some style guides mandate interfaces for object shapes.
*   **Use `type` when:**
    *   Defining unions, intersections, tuples, or aliases for primitives.
    *   Working with advanced mapped or conditional types.
    *   Defining types for React component props and state (often preferred as they are generally more constrained and don't need merging).
    *   You want to ensure a type cannot be implicitly extended via declaration merging.

**Consistency is Key:** Choose a convention for your project (e.g., "use `interface` for object shapes unless a `type` feature is needed" or "use `type` for component props/state") and apply it consistently.

######
<style scoped>
table {
  font-size: 18px;
}
</style>

| **Feature**         | **interface**                     | **type alias**                                   |
| :------------------ | :-------------------------------- | :----------------------------------------------- |
| **Primary Use**     | Defining object shapes, contracts | Naming **any** type (objects, unions, primitives, etc.) |
| **Extensibility**   | Yes (Declaration Merging)         | No (Cannot be re-opened)                         |
| **Inheritance**     | `extends InterfaceB`              | Intersection (`& TypeB`)                         |
| **Union/Intersection** | Less direct (use `type` for these) | Direct (`| TypeB`)                                |
| **Primitives/Tuples** | Cannot directly name              | Can name primitives, tuples, etc.                |
| **Mapped/Conditional** | Cannot directly represent         | Can represent mapped/conditional types           |
| **Recommendation**  | Public APIs, Object Shapes (if extensible) | Unions, Intersections, Primitives, Component Props/State (often preferred) |

The flexibility of `type` aliases, particularly for unions and intersections, aligns well with the compositional and functional patterns often seen in modern React development, making them a frequent choice for component props and state.

## **5. Fundamentals: Typing Functions**

Functions are fundamental building blocks. TypeScript allows you to precisely define the types of data functions expect as input (parameters) and the type of data they produce as output (return value). This acts as a clear contract, improving safety and understandability.

### **5.1 Parameter Types**

You annotate function parameters by adding `: Type` after the parameter name.

*   **Required Parameters:** By default, all declared parameters are required. Calling the function without them (or with `undefined` unless the type includes `undefined`) will cause a compile-time error.

```typescript
/**
 * Dispenses a specific medication to a patient.
 * @param {number} patientId - The ID of the patient.
 * @param {string} medicationName - The name of the medication.
 * @param {number} quantity - The quantity to dispense.
 * @returns {void}
 */
function dispenseMedication(patientId: number, medicationName: string, quantity: number): void {
  console.log(`Dispensing ${quantity} units of ${medicationName} to patient ${patientId}`);
  //... dispensing logic...
}
dispenseMedication(12345, "Metformin", 90); // OK
// dispenseMedication(12345, "Metformin"); // Error: Expected 3 arguments, but got 2.
```

*   **Optional Parameters:** Add a `?` after the parameter name to make it optional. Optional parameters must come *after* all required parameters.

```typescript
/**
 * Records patient vital signs. Temperature and blood pressure are optional.
 * @param {number} patientId - The patient's ID.
 * @param {number} [temperature] - Optional temperature reading (Celsius).
 * @param {string} [bloodPressure] - Optional blood pressure reading (e.g., "120/80").
 * @returns {void}
 */
function recordVitals(patientId: number, temperature?: number, bloodPressure?: string): void {
  console.log(`Recording vitals for patient ${patientId}`);
  if (temperature !== undefined) {
    console.log(` Temperature: ${temperature}°C`);
  }
  if (bloodPressure !== undefined) {
    console.log(` Blood Pressure: ${bloodPressure}`);
  }
}
recordVitals(12345); // OK
recordVitals(12345, 37.2); // OK
recordVitals(12345, 37.2, "120/80"); // OK
```

*   **Default Parameters:** Assign a default value using `=`. This makes the parameter implicitly optional. If a default parameter comes before a required one, you must pass `undefined` explicitly to use the default.

```typescript
/**
 * Schedules a patient appointment. Defaults to "Follow-up".
 * @param {number} patientId - The patient's ID.
 * @param {string} [appointmentType="Follow-up"] - The type of appointment.
 * @returns {string} Confirmation message.
 */
function scheduleAppointment(patientId: number, appointmentType: string = "Follow-up"): string {
  return `Scheduled ${appointmentType} for patient ${patientId}.`;
}
scheduleAppointment(12345); // Returns "Scheduled Follow-up for patient 12345."
scheduleAppointment(12345, "Initial Consultation"); // Returns "Scheduled Initial Consultation for patient 12345."
```

*   **Rest Parameters:** Use the spread syntax (`...`) to gather an indefinite number of arguments into a single array. The rest parameter must be the *last* parameter in the function signature.

```typescript
/**
 * Logs reported symptoms for a patient.
 * @param {number} patientId - The patient's ID.
 * @param {...string} symptoms - A list of reported symptoms.
 * @returns {void}
 */
function logSymptoms(patientId: number,...symptoms: string[]): void {
  console.log(`Patient ${patientId} reports symptoms: ${symptoms.join(', ')}`);
}
logSymptoms(12345, "Cough", "Fever", "Headache");
```

### **5.2 Return Types**

Specify the function's return type after the parameter list using `: Type`.

```typescript
/**
 * Checks if a prescription object has any remaining refills.
 * @param {Prescription} rx - The prescription object (assuming Prescription interface exists).
 * @returns {boolean} True if refills > 0, false otherwise.
 */
function hasRefills(rx: Prescription): boolean {
  return rx.refillsRemaining > 0;
}

/**
 * Calculates the total cost of an order.
 * @param {OrderItem[]} items - An array of items in the order.
 * @returns {number} The calculated total cost.
 */
function calculateOrderTotal(items: OrderItem[]): number {
  let total = 0;
  items.forEach(item => total += item.price * item.quantity);
  return total;
}
```

*   **Inferred Return Types:** TypeScript can often infer the return type from the `return` statements within the function. While convenient, explicitly annotating return types is good practice for clarity and ensuring the function adheres to its intended contract, especially for complex functions or those part of a public API.
*   **`void` Return Type:** Use `: void` for functions that do not return a value.

TypeScript's support for optional and default parameters mirrors modern JavaScript features, providing a familiar syntax for developers while adding the benefit of type safety.

### **5.3 Function Type Expressions**

You can describe the *type* of a function itself using a syntax similar to arrow functions: `(param1: Type1, param2: Type2) => ReturnType`. This defines the expected parameter types and the return type.

This is useful for:

1.  Typing variables that will hold functions.
2.  Typing callback parameters passed to other functions.

```typescript
/**
 * Type definition for a function that checks if a medication is in stock.
 * @callback MedicationStockChecker
 * @param {string} medicationName - The name of the medication.
 * @param {number} requiredQuantity - The quantity needed.
 * @returns {boolean} True if sufficient stock exists, false otherwise.
 */
type MedicationStockChecker = (medicationName: string, requiredQuantity: number) => boolean;

// Example implementation of the checker
const checkPharmacyDatabase: MedicationStockChecker = (name, quantity) => {
  console.log(`Checking stock for ${quantity} of ${name}...`);
  //... logic to query database...
  const stockAvailable = Math.random() > 0.2; // Placeholder
  return stockAvailable;
};

/**
 * Processes a list of medications using a provided stock checking function.
 * @param {string[]} medications - List of medication names.
 * @param {MedicationStockChecker} checker - The function used to check stock.
 * @returns {void}
 */
function checkInventory(medications: string[], checker: MedicationStockChecker): void {
  medications.forEach(med => {
    const needed = 10; // Example quantity
    if (checker(med, needed)) {
      console.log(`${med} is in stock.`);
    } else {
      console.log(`${med} needs restocking.`);
    }
  });
}

// Using the function with the typed checker
checkInventory(["Aspirin", "Loratadine"], checkPharmacyDatabase);
```

## **6. Fundamentals: Generics**

Generics are one of TypeScript's most powerful features for creating **reusable** and **type-safe** components. They allow you to write functions, classes, interfaces, or type aliases that can operate on a variety of types without sacrificing type checking. Without generics, you'd often resort to using `any` (losing type safety) or writing duplicated code for different types.

### **6.1 The Concept: Placeholders for Types**

Imagine you need a function that fetches data from an API. The *structure* of the fetching logic is the same regardless of whether you're fetching patient data, prescription data, or inventory data. Generics let you write *one* function that can handle all these cases while still knowing the specific type of data being returned in each case.

Generics use **type variables** (conventionally single uppercase letters like `T`, or descriptive names like `TItem`, `TData`) enclosed in angle brackets `<>` as placeholders for types that will be specified later when the generic component is used.

### **6.2 Generic Functions**

You define a generic function by adding the type variable declaration after the function name.

```typescript
/**
 * Fetches data from a specified API endpoint.
 * Uses a generic type parameter 'T' to represent the expected data structure.
 *
 * @template T - The expected type of the data in the response.
 * @param {string} url - The URL of the API endpoint.
 * @returns {Promise<T>} A promise that resolves with the fetched data, typed as T.
 * @throws {Error} Throws an error if the network response is not ok.
 */
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    // Basic error handling
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // Assume the response is JSON and parse it
  // We assert the parsed data is of type T
  const data = await response.json();
  return data as T; // Using type assertion here, validation might be needed in real apps
}

// --- Usage Example ---
// Assume Patient and Prescription types are defined elsewhere
// type Patient = { id: number; name: string; /*... */ };
// type Prescription = { id: number; medicationName: string; /*... */ };

async function loadPatientAndPrescriptions(patientId: number) {
  try {
    // Explicitly specify the type argument for Patient
    const patientData = await fetchData<Patient>(`/api/patients/${patientId}`);
    console.log(`Fetched Patient: ${patientData.name}`); // Access patient properties safely

    // Explicitly specify the type argument for an array of Prescriptions
    const prescriptionData = await fetchData<Prescription[]>(`/api/patients/${patientId}/prescriptions`);
    console.log(`Fetched ${prescriptionData.length} prescriptions.`); // Access array properties safely

  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}
```

In the `fetchData` function, `T` is the type variable. When we call `fetchData<Patient>(...)`, we tell TypeScript that `T` should be `Patient` for this specific call, so the function returns a `Promise<Patient>`.

### **6.3 Generic Interfaces & Types**

Interfaces and type aliases can also be generic, allowing you to define reusable shapes.

```typescript
/**
 * Generic interface for a standardized API response structure.
 * @template TData - The type of the data payload.
 */
interface ApiResponse<TData> {
  success: boolean;
  data: TData; // The actual data, type depends on TData
  timestamp: Date;
  error?: { code: number; message: string };
}

/**
 * Generic type alias for representing a paginated list result.
 * @template TItem - The type of items within the list.
 */
type PaginatedResult<TItem> = {
  items: TItem[]; // An array of items of type TItem
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

// Usage examples:
let patientResponse: ApiResponse<Patient>; // Response containing a single Patient object
let medicationList: PaginatedResult<Medication>; // Paginated list of Medication objects
let orderHistory: ApiResponse<PaginatedResult<Order>>; // Response containing paginated Orders
```

### **6.4 Generic Classes**

Classes can also use generics, often used for creating generic data structures or factories.

```typescript
/**
 * A simple generic class to hold a value and its timestamp.
 * @template TValue - The type of the value being stored.
 */
class TimestampedValue<TValue> {
  public readonly timestamp: Date;

  constructor(public value: TValue) {
    this.timestamp = new Date();
  }

  getValue(): TValue {
    return this.value;
  }
}

// Usage:
const lastLogin = new TimestampedValue<Date>(new Date());
const patientRecord = new TimestampedValue<Patient>(fetchedPatientData);

console.log(lastLogin.getValue()); // Returns a Date
console.log(patientRecord.getValue().name); // Returns the patient's name (string)
```

### **6.5 Type Constraints (`extends`)**

Sometimes, you need to ensure that the type variable `T` has certain properties or methods. **Type constraints**, using the `extends` keyword, allow you to restrict the types that can be used with your generic component.

```typescript
/**
 * Interface requiring an 'id' property.
 * @interface Identifiable
 */
interface Identifiable {
  id: string | number; // Item must have an id (string or number)
}

/**
 * Processes an array of items, requiring each item to have an 'id'.
 * @template TItem - The type of item, constrained to be Identifiable.
 * @param {TItem[]} items - An array of items conforming to the Identifiable interface.
 * @returns {void}
 */
function processItemsById<TItem extends Identifiable>(items: TItem[]): void {
  items.forEach(item => {
    // We can safely access 'item.id' because of the constraint TItem extends Identifiable
    console.log(`Processing item with ID: ${item.id}`);
  });
}

// Usage:
processItemsById([{ id: 1, name: "Item A" }, { id: "b", name: "Item B" }]); // OK
// processItemsById([{ name: "Item C" }, { name: "Item D" }]); // Error: Type '{ name: string; }' does not satisfy the constraint 'Identifiable'. Property 'id' is missing.
```

Constraints are essential for writing generic code that performs meaningful operations on the generic type, as they guarantee the presence of necessary members.

### **6.6 Generics in React Native Components**

Generics are incredibly useful for creating flexible and type-safe UI components. Consider a generic `Select` component that can handle different types of data.

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
// Assuming Picker is imported from a library like '@react-native-picker/picker'
import { Picker } from '@react-native-picker/picker';

/**
 * Base shape required for items used in the GenericSelect component.
 * @interface SelectableItem
 */
interface SelectableItem {
  id: string; // Unique identifier, used as the value
  label: string; // Text to display in the picker
}

/**
 * Props for the GenericSelect component.
 * @template TItem - The type of the items, must extend SelectableItem.
 */
type GenericSelectProps<TItem extends SelectableItem> = {
  /** The array of items to display in the picker. */
  items: TItem[];
  /** Callback function invoked when an item is selected. Receives the full selected item object. */
  onValueChange: (item: TItem | undefined) => void;
  /** The currently selected item's ID. */
  selectedValue: string | undefined;
  /** Optional prompt text to display when no item is selected. */
  prompt?: string;
};

/**
 * A reusable, type-safe Select (Picker) component for React Native.
 * It uses generics to work with any data type that conforms to the SelectableItem interface.
 *
 * @template TItem - The type of items in the list, constrained by SelectableItem.
 * @param {GenericSelectProps<TItem>} props - The component props.
 * @returns {React.ReactElement} The rendered Picker component.
 */
export function GenericSelect<TItem extends SelectableItem>(
  { items, onValueChange, selectedValue, prompt }: GenericSelectProps<TItem>
): React.ReactElement {

  const handleValueChange = (itemValue: string) => {
    // Find the full item object corresponding to the selected value (id)
    const selectedItem = items.find(item => item.id === itemValue);
    onValueChange(selectedItem); // Pass the full object back
  };

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={handleValueChange}
      prompt={prompt}
    >
      {/* Optional prompt item */}
      {prompt && <Picker.Item label={prompt} value={undefined} enabled={false} />}

      {/* Map over the generic items array */}
      {items.map((item) => (
        // We know 'item' has 'id' and 'label' due to the TItem extends SelectableItem constraint
        <Picker.Item key={item.id} label={item.label} value={item.id} />
      ))}
    </Picker>
  );
}

// --- Usage Example in a React Native Component ---

// Define specific data types that conform to SelectableItem
type MedicationOption = { id: string; label: string; dosageForm: string; };
type PatientOption = { id: string; label: string; mrn: string; };

const medications: MedicationOption[] = [
  { id: 'med1', label: 'Lisinopril', dosageForm: 'Tablet' },
  { id: 'med2', label: 'Amoxicillin', dosageForm: 'Capsule' },
];

const patients: PatientOption[] = [
  { id: 'pat1', label: 'Jane Doe', mrn: 'MRN123' },
  { id: 'pat2', label: 'John Smith', mrn: 'MRN456' },
];

function PrescriptionForm() {
  const [selectedMedId, setSelectedMedId] = useState<string | undefined>(undefined);
  const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined);

  // Type safety: onValueChange receives the full MedicationOption object
  const handleMedicationChange = (medication: MedicationOption | undefined) => {
    setSelectedMedId(medication?.id);
    if (medication) {
      console.log(`Selected medication form: ${medication.dosageForm}`);
    }
  };

  // Type safety: onValueChange receives the full PatientOption object
  const handlePatientChange = (patient: PatientOption | undefined) => {
    setSelectedPatientId(patient?.id);
    if (patient) {
      console.log(`Selected patient MRN: ${patient.mrn}`);
    }
  };

  return (
    <View>
      <Text>Select Medication:</Text>
      <GenericSelect<MedicationOption>
        items={medications}
        onValueChange={handleMedicationChange}
        selectedValue={selectedMedId}
        prompt="Choose medication..."
      />

      <Text>Select Patient:</Text>
      <GenericSelect<PatientOption>
        items={patients}
        onValueChange={handlePatientChange}
        selectedValue={selectedPatientId}
        prompt="Choose patient..."
      />
    </View>
  );
}
```

This `GenericSelect` component demonstrates how generics, combined with constraints, enable the creation of highly reusable and type-safe UI elements, crucial for building complex applications like SpeedyMeds efficiently.

## **7. Fundamentals: Enums & Literal Types**

TypeScript provides ways to define types that represent a fixed set of named constants (`enum`) or specific, exact values (`literal types`). These are useful for making code more readable and preventing errors related to magic strings or numbers.

### **7.1 Enums**

Enums (`enum`) allow you to define a collection of related named constants.

*   **Numeric Enums:** Assign numeric values to names. By default, they auto-increment starting from 0, but you can assign explicit values. Numeric enums have a *reverse mapping* feature, allowing you to get the name from the value at runtime.

```typescript
/**
 * Represents the status of a medication order using numeric values.
 */
enum OrderStatusNumeric {
  Pending,          // 0 (default)
  Processing,       // 1 (auto-incremented)
  Shipped = 5,      // 5 (explicitly assigned)
  Delivered,        // 6 (auto-incremented from Shipped)
  Cancelled = 99    // 99 (explicitly assigned)
}

let orderState: OrderStatusNumeric = OrderStatusNumeric.Processing;
console.log(orderState); // Output: 1

// Reverse mapping
console.log(OrderStatusNumeric[1]); // Output: Delivered
```

*   **String Enums:** Assign string values to names. Each member *must* be explicitly initialized with a string literal. String enums do not have auto-incrementing or reverse mapping. They are often preferred for their readability, especially when values are logged or serialized (e.g., in JSON).

```typescript
/**
 * Represents the status of a prescription using descriptive string values.
 */
enum PrescriptionStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Expired = "EXPIRED",
  OnHold = "ON_HOLD",
  Transferred = "TRANSFERRED"
}

let currentRxStatus: PrescriptionStatus = PrescriptionStatus.Active;
console.log(currentRxStatus); // Output: "ACTIVE"

// No reverse mapping for string enums
// console.log(PrescriptionStatus); // Error or undefined depending on context
```

*   **Use Cases:** Ideal for managing fixed sets of related constants like status codes, action types in state management, user roles, or predefined categories.

```typescript
/**
 * Represents different forms a medication can take.
 */
enum DosageForm {
  Tablet = "TABLET",
  Capsule = "CAPSULE",
  Liquid = "LIQUID",
  Injection = "INJECTION",
  Cream = "CREAM",
  Patch = "PATCH"
}
```

*   **`const enum`:** A `const enum` is completely removed during compilation, and its values are inlined directly into the JavaScript code. This can improve performance but has limitations (e.g., cannot have computed members) and potential pitfalls, especially with the `isolatedModules` compiler option often used in React Native setups. Use with caution.

> 💡 **Preference Note:** In modern TypeScript, string enums or string literal unions (see below) are often favored over numeric enums, particularly when the values might be serialized or need to be easily understood during debugging, as the string value itself carries meaning.

### **7.2 Literal Types**

Literal types allow you to restrict a variable to *specific, exact values* rather than a general type like `string` or `number`. They are most powerful when combined with union types (`|`).

*   **String Literal Types:** Restrict a variable to a specific set of predefined strings. This is often a more lightweight alternative to string enums.

```typescript
/**
 * Type representing allowed dosage forms using string literals.
 * Often preferred over string enums for simple cases.
 */
type DosageFormLiteral = "Tablet" | "Capsule" | "Liquid" | "Injection" | "Cream" | "Patch";

let medForm: DosageFormLiteral = "Tablet";
// medForm = "Powder"; // Error: Type '"Powder"' is not assignable to type 'DosageFormLiteral'.
```

*   **Numeric Literal Types:** Restrict a variable to specific numbers.

```typescript
/** Type representing allowed refill counts for a specific promotion */
type AllowedRefills = 0 | 1 | 2 | 3;

let refillsAllowed: AllowedRefills = 2;
// refillsAllowed = 5; // Error: Type '5' is not assignable to type 'AllowedRefills'.
```

*   **Boolean Literal Types:** Restrict a variable to `true` or `false`. Often used in discriminated unions to enforce relationships between properties.

```typescript
/** Represents a successful API response */
type ApiResponseSuccess<T> = { success: true; data: T };
/** Represents a failed API response */
type ApiResponseError = { success: false; error: { code: number; message: string } };
/** Union type for any API response */
type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

function handleResponse<T>(response: ApiResponse<T>) {
  if (response.success) {
    // TypeScript knows response is ApiResponseSuccess<T> here
    console.log("Data received:", response.data);
  } else {
    // TypeScript knows response is ApiResponseError here
    console.error(`API Error (${response.error.code}): ${response.error.message}`);
  }
}
```

*   **Literal Narrowing:** When you declare a variable using `const`, TypeScript infers the most specific literal type possible because the value cannot change. If you use `let`, it infers the broader primitive type (`string`, `number`, etc.).

```typescript
const defaultStatus = "Pending"; // Type is "Pending" (literal type)
let currentStatus = "Pending"; // Type is string
```

Literal types combined with unions offer a flexible and type-safe way to handle fixed sets of values, often feeling more aligned with JavaScript's nature than traditional enums while providing strong compile-time guarantees.

## **8. Fundamentals: Union (`|`) & Intersection (`&`) Types**

TypeScript allows you to combine existing types to create new ones using union and intersection operators. These are fundamental tools for modeling complex data structures and variations in your application.

### **8.1 Union Types (`|`)**

A union type, created using the pipe symbol (`|`), allows a variable or parameter to hold a value of **one of several possible types**.

```typescript
/**
 * Represents an identifier which could be a numeric patient ID
 * or an alphanumeric Medical Record Number (MRN).
 * @typedef {number | string} PatientIdentifier
 */
type PatientIdentifier = number | string;

let patientRef: PatientIdentifier = 12345; // OK
patientRef = "MRN67890"; // OK
// patientRef = true; // Error: Type 'boolean' is not assignable to type 'PatientIdentifier'.

/**
 * Finds a patient record using either their ID or MRN.
 * Demonstrates type narrowing within the function.
 * @param {PatientIdentifier} id - The patient's ID or MRN.
 * @returns {Patient | undefined} The found patient or undefined.
 */
function findPatient(id: PatientIdentifier): Patient | undefined {
  if (typeof id === 'string') {
    // Inside this block, TypeScript knows 'id' is a string (MRN)
    console.log(`Searching by MRN: ${id.toUpperCase()}`);
    //... search logic using string id...
  } else {
    // Inside this block, TypeScript knows 'id' is a number (Patient ID)
    console.log(`Searching by Patient ID: ${id}`);
    //... search logic using number id...
  }
  return undefined; // Placeholder
}
```

**Accessing Members:** You can only access properties or methods that are **common to all types** within the union *unless* TypeScript can narrow the type down within a specific code block (using type guards like `typeof`, `instanceof`, `in`, or discriminated unions).

### **8.2 Intersection Types (`&`)**

An intersection type, created using the ampersand symbol (`&`), combines multiple types into a **single type that possesses all the properties** of each constituent type. This is extremely useful for composing types from smaller, reusable pieces.

```typescript
/** Base properties common to all orders */
interface BaseOrder {
  orderId: string;
  orderDate: Date;
  status: OrderStatus; // Using the OrderStatus literal union type
}

/** Details specific to prescription refills */
interface PrescriptionRefillDetails {
  prescriptionId: number;
  medicationName: string;
  patientId: number;
}

/** Details specific to over-the-counter (OTC) supply orders */
interface SupplyOrderDetails {
  items: { itemName: string; quantity: number; price: number }[];
  deliveryAddress: string;
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
  patientId: 12345
};

let otcOrder: SupplyOrder = {
  orderId: "SUPP3344",
  orderDate: new Date(),
  status: "Shipped",
  items: [{ itemName: "Band-Aids", quantity: 1, price: 5.99 }],
  deliveryAddress: "123 Main St"
};

// Accessing properties from both intersected types is possible
console.log(refillOrder.orderId); // From BaseOrder
console.log(refillOrder.medicationName); // From PrescriptionRefillDetails
console.log(otcOrder.status); // From BaseOrder
console.log(otcOrder.deliveryAddress); // From SupplyOrderDetails
```

Intersection types promote modularity in type definitions, allowing you to build complex structures by combining smaller, focused interfaces or types, adhering to the DRY (Don't Repeat Yourself) principle.

### **8.3 Discriminating Unions**

This is a very common and powerful pattern in TypeScript for working with union types, especially for modeling different states or action types (e.g., in state management like Redux or Zustand). It involves:

1.  Having a **common property** (the *discriminant*) in all types within the union.
2.  This discriminant property has a **literal type** (usually a string literal) that is unique for each type in the union.
3.  Using `switch` or `if/else if` statements on the discriminant property allows TypeScript to **narrow** the object's type within each corresponding code block.

```typescript
// Define the different action types with a common 'type' property (discriminant)
type AddItemAction = { type: "ADD_ITEM"; payload: { itemId: string; name: string; quantity: number } };
type RemoveItemAction = { type: "REMOVE_ITEM"; payload: { itemId: string } };
type UpdateQuantityAction = { type: "UPDATE_QUANTITY"; payload: { itemId: string; newQuantity: number } };
type CheckoutAction = { type: "CHECKOUT"; payload: { paymentMethod: string } };

// Create the union type representing all possible actions
type CartAction = AddItemAction | RemoveItemAction | UpdateQuantityAction | CheckoutAction;

/**
 * Processes different shopping cart actions based on their type.
 * Demonstrates type narrowing using a discriminated union.
 * @param {CartAction} action - The cart action to process.
 * @returns {void}
 */
function handleCartAction(action: CartAction): void {
  switch (action.type) {
    case "ADD_ITEM":
      // TypeScript knows 'action' is AddItemAction here
      console.log(`Adding item: ${action.payload.name} (ID: ${action.payload.itemId})`);
      // Access action.payload.quantity safely
      break;

    case "REMOVE_ITEM":
      // TypeScript knows 'action' is RemoveItemAction here
      console.log(`Removing item ID: ${action.payload.itemId}`);
      break;

    case "UPDATE_QUANTITY":
      // TypeScript knows 'action' is UpdateQuantityAction here
      console.log(`Updating quantity for item ID: ${action.payload.itemId} to ${action.payload.newQuantity}`);
      break;

    case "CHECKOUT":
      // TypeScript knows 'action' is CheckoutAction here
      console.log(`Checking out using: ${action.payload.paymentMethod}`);
      break;

    // Optional: Exhaustiveness Check using 'never'
    default:
      const _exhaustiveCheck: never = action; // If a new action type is added but not handled, this line will cause a compile error
      console.error(`Unhandled action type: ${(_exhaustiveCheck as any).type}`);
      return _exhaustiveCheck;
  }
}

// Example Usage:
handleCartAction({ type: "ADD_ITEM", payload: { itemId: "med101", name: "Lisinopril", quantity: 1 } });
handleCartAction({ type: "UPDATE_QUANTITY", payload: { itemId: "med101", newQuantity: 2 } });
```

Discriminating unions provide a robust and type-safe way to model variants and ensure all possible cases are handled, especially when combined with exhaustiveness checks.

## **9. Fundamentals: Type Assertions**

Type assertions are a mechanism to tell the TypeScript compiler, "Trust me, I know the type of this value better than you do." They allow you to override the compiler's inferred type or treat a value as a more specific type.

Crucially, type assertions **only affect the compile-time type checking**; they have **no impact on the runtime behavior** of your JavaScript code. They do not perform any type conversion or validation at runtime.

### **9.1 Syntax**

TypeScript provides two syntaxes for type assertions:

1.  **`as` Syntax (Preferred):** This is the recommended syntax, especially in React Native projects using JSX/TSX files.

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

2.  **Angle-Bracket Syntax:** This older syntax (`<Type>value`) works similarly but can cause parsing conflicts in `.tsx` files, as the angle brackets can be misinterpreted as JSX tags. Therefore, it's generally avoided in React/React Native.

```typescript
// Avoid this syntax in.tsx files
// let strLength: number = (<string>someValue).length;
```

### **9.2 Common Use Cases**

While assertions should be used sparingly, they are sometimes necessary:

*   **Working with `any` or `unknown`:** After receiving data typed as `any` or `unknown` (e.g., from a legacy API or `JSON.parse`), if you have performed checks or are certain of the type, you can assert it to a more specific type to enable further type-safe operations.

```typescript
/**
 * Fetches data from a legacy endpoint returning 'any'.
 * @returns {Promise<any>}
 */
async function fetchLegacyPatientData(): Promise<any> {
  //... fetch logic...
  return { patient_id: 123, full_name: "Jane Doe", dob: "1985-03-14" }; // Example response
}

async function displayPatientName() {
  const data = await fetchLegacyPatientData();

  // Assuming we know the structure matches the Patient type
  // This assertion tells TypeScript to treat 'data' as 'Patient'
  const patient = data as Patient;

  // Now we can access properties known to exist on 'Patient' without compiler errors
  console.log(`Patient Name: ${patient.name}`);
}
```

*   **Interfacing with DOM APIs (Conceptual Example):** Although less direct in React Native, type assertions are common when working with browser DOM APIs that return generic element types.

```typescript
// Example for illustration (not typical RN)
// const myCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
// if (myCanvas) {
//   const context = myCanvas.getContext('2d'); // Allowed because we asserted it's a canvas
// }
```

### **9.3 Use with Caution!**

**Type assertions are potentially dangerous.** They bypass TypeScript's static analysis. If your assertion is incorrect, the compiler won't warn you, but your application will likely crash or behave unexpectedly at runtime when you try to access properties or methods that don't actually exist on the value.

**Best Practices:**

*   **Use Sparingly:** Only use assertions when you are absolutely certain about the type, and TypeScript cannot infer it.
*   **Prefer Type Guards:** Whenever possible, use type guards (`typeof`, `instanceof`, `in` operator, custom predicate functions) instead of assertions. Type guards perform runtime checks, making your code safer.
*   **Avoid Asserting to `any`:** Asserting to `any` completely defeats the purpose of TypeScript. If you need to assert, assert to the most specific type possible.
*   **Double Assertions (`value as unknown as TargetType`):** Sometimes needed to assert between incompatible types, but this is even riskier and indicates a potential flaw in your type design. Use with extreme caution.

Think of type assertions as a necessary escape hatch for specific situations where you must bridge the gap between compile-time knowledge and runtime reality, particularly when dealing with untyped external data or legacy code. Always prioritize safer alternatives like type guards when feasible.

## **10. Configuration (`tsconfig.json`)**

The `tsconfig.json` file is the heart of a TypeScript project. Its presence in a directory signifies the root of the project, and it contains crucial settings that control how the TypeScript compiler (`tsc`) behaves. It dictates which files are part of the project, how they should be type-checked, and how the final JavaScript output should be generated.

The configuration file allows for project-specific customization while also enabling the use of shared, community-vetted base configurations, demonstrating the maturity and flexibility of the TypeScript ecosystem.

### **10.1 Role of `@tsconfig/react-native`**

Setting up `tsconfig.json` from scratch can be complex. Fortunately, the React Native ecosystem provides base configurations. New React Native projects initialized with TypeScript typically include this line in their `tsconfig.json`:

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json"
  //... potentially other project-specific overrides...
}
```

The `extends` property inherits settings from the specified base configuration file (`@tsconfig/react-native/tsconfig.json` in this case). This package provides a set of sensible default compiler options tailored specifically for React Native development.

Benefits of using the base config:

*   **Simplifies Setup:** Avoids manual configuration of many common options.
*   **Ensures Compatibility:** Includes settings needed for JSX, module resolution, and other React Native specifics.
*   **Promotes Consistency:** Aligns project settings with community best practices.

You can (and often will) override specific options from the base configuration by defining them directly in your project's `tsconfig.json`.

### **10.2 Key Compiler Options for React Native**

While the base configuration handles many settings, understanding key options is important:

*   **`target`**: Specifies the ECMAScript version the output JavaScript should target (e.g., `"es2017"`, `"esnext"`). React Native's JavaScript engines (like Hermes) support modern features, so newer targets are common.
*   **`jsx`**: Crucial for React Native. Set to `"react-native"` to preserve JSX syntax in the output, allowing the Metro bundler to handle its transformation.
*   **`module`**: Defines the module system for the output JavaScript (e.g., `"esnext"`, `"commonjs"`). `"esnext"` is often used with modern bundlers.
*   **`moduleResolution`**: Determines how TypeScript finds modules (e.g., `"node"`, `"bundler"`). Should align with how your bundler (Metro) resolves modules. The `"bundler"` option is newer and often recommended for modern tooling.
*   **`lib`**: Lists the built-in TypeScript library declaration files to include (e.g., `["esnext", "dom"]`). `dom` types are often needed for React/React Native type compatibility, even though you aren't targeting a browser directly.
*   **`allowJs`**: Set to `true` to allow importing `.js` files into `.ts`/`.tsx` files. Essential for gradual migration from JavaScript to TypeScript.
*   **`esModuleInterop`**: Set to `true` to enable better compatibility when importing CommonJS modules into ES modules. Highly recommended for avoiding import issues with various libraries.
*   **`isolatedModules`**: Set to `true`. Enforces constraints ensuring files can be transpiled independently by tools like Babel (used by Metro). Prevents features like `const enum` that require cross-file information.
*   **`strict`**: Set to `true`. Enables a suite of strict type-checking options, providing maximum type safety. This is highly recommended and usually enabled by the base config.
*   **`strictNullChecks`**: Set to `true` (usually included in `strict: true`). Forces explicit handling of `null` and `undefined`, preventing a major class of runtime errors.
*   **`skipLibCheck`**: Set to `true` to speed up compilation by skipping type checking of declaration files (`.d.ts`) in `node_modules`. Generally safe.
*   **`forceConsistentCasingInFileNames`**: Set to `true` to prevent errors caused by inconsistent file casing across different operating systems.
*   **`baseUrl` & `paths`**: Used to configure absolute imports and path aliases (e.g., mapping `@components/*` to `src/components/*`) for cleaner import statements.

Enabling options like `strict`, `strictNullChecks`, `esModuleInterop`, and `isolatedModules` reflects a commitment to writing high-quality, robust, and compatible TypeScript code, which is essential for building reliable React Native applications.

## **11. Best Practices in React Native**

Applying TypeScript effectively in React Native involves adopting specific patterns and practices, especially when dealing with components, state, and project organization.

### **11.1 Typing Props & State**

Defining clear types for component props and state is fundamental.

*   **Explicit Prop/State Types:** Always use `interface` or `type` to define the expected shape of props and state. This serves as a contract for how the component should be used. Consistency in choosing `interface` or `type` for props/state within a project is recommended. Many prefer `type` for props/state as they are typically more constrained and don't require merging.

*   **`React.FC` vs. Alternatives:**
    *   Historically, `React.FC` (or `React.FunctionComponent`) was used to type functional components, providing types for props and implicitly including `children`.
    *   **Current Recommendation:** With React 18 types, `React.FC` is often considered unnecessary and potentially problematic (e.g., with `defaultProps`). The preferred approach is to type props directly on the function signature. This makes the component's contract more explicit, especially regarding whether it accepts `children`.

```typescript
// Preferred way to type component props
import React from 'react';
import { Text, View } from 'react-native';

/**
 * Props for the PatientBanner component.
 * @property {string} name - The patient's name to display.
 * @property {number} age - The patient's age.
 * @property {string} [status] - Optional status indicator (e.g., "In Observation").
 */
type PatientBannerProps = {
  name: string;
  age: number;
  status?: string;
  // If children were expected: children: React.ReactNode;
};

/**
 * Displays basic patient information.
 * @param {PatientBannerProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
const PatientBanner = ({ name, age, status }: PatientBannerProps): React.JSX.Element => {
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      {status && <Text>Status: {status}</Text>}
    </View>
  );
};

export default PatientBanner;
```

*   **State Typing (`useState`, `useReducer`):**
    *   TypeScript usually infers the state type from the initial value provided to `useState`.
    *   Provide an explicit type argument (`useState<MyType>(...)`) when the initial value is `null`, `undefined`, or when the state can hold a union of types.

```typescript
import React, { useState } from 'react';
import { Text, View } from 'react-native'; // Added imports for Text and View

type LoadingStatus = "idle" | "loading" | "success" | "error";
type UserProfile = { id: string; name: string; /*... */ };

function UserProfileLoader() {
  // Explicit type needed because initial state could be UserProfile or null
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Explicit type needed for the union type
  const [status, setStatus] = useState<LoadingStatus>("idle"); // Corrected variable name

  //... fetching logic that updates profile and status...

  if (status === 'loading') return <Text>Loading...</Text>;
  if (status === 'error') return <Text>Error loading profile.</Text>;
  if (!profile) return <Text>No profile data.</Text>; // Handles null case

  return <PatientBanner name={profile.name} age={/* calculate age */} />;
}
```

*   For `useReducer`, types are inferred from the initial state and the reducer function's signature. Explicitly typing the initial state or the reducer function itself ensures correctness.

The evolution away from implicit `children` in `React.FC` reflects the ecosystem's preference for explicitness in component APIs, making contracts clearer.

### **11.2 Balancing Inference and Explicit Types**

As discussed earlier, strike a balance:

*   **Infer:** Simple, locally scoped variables where the type is obvious from initialization.
*   **Explicit:** Function/method signatures (including component props/return types), complex object structures, API boundaries, state involving unions or initial null/undefined.

Component props are a critical boundary and should always be explicitly typed.

### **11.3 Type Organization Strategies**

Organizing types becomes crucial as projects grow. Poor organization hinders navigation, understanding, and refactoring.

*   **Co-location:** Place type definitions (`types.ts` or directly in the component file for very simple types) within the component/feature directory. Best for types tightly coupled to that specific module.

```
src/
└── components/
    └── MedicationCard/
        ├── MedicationCard.tsx
        └── types.ts // Defines MedicationCardProps
```

*   **Global `types/` Folder:** Create `src/types/` for types shared across the application (e.g., API response structures, core data models like `Patient`, `Prescription`, `Order`).

```
src/
└── types/
    ├── api.ts       // ApiResponse<T>, etc.
    ├── models.ts    // Patient, Prescription, etc.
    └── index.ts     // Barrel file
```

*   **Feature-Based:** For larger apps, group types within feature directories (e.g., `src/features/authentication/types.ts`).
*   **Barrel Files (`index.ts`):** Use `index.ts` within type directories to re-export types, allowing cleaner imports from a single path (e.g., `import { Patient, Order } from '@/types';`).

**Recommendation:** Start with co-location. As types become shared, move them to a global `types/` folder or feature-specific type files. Use barrel files for convenience.

### **11.4 Importance of `strictNullChecks`**

Enabling `"strictNullChecks": true` (part of `"strict": true`) in `tsconfig.json` is paramount for robust React Native apps.

*   **Why?** It forces you to explicitly handle `null` and `undefined`, preventing crashes when trying to access properties or render data that might not exist (e.g., data still loading from an API).
*   **Handling:** Use common patterns:
    *   **Conditional Rendering:** `data && <MyComponent data={data} />` or `status === 'success'? <DataDisplay data={data} /> : <Loading />`
    *   **Optional Chaining (`?.`):** Safely access nested properties: `const prescriberName = order?.prescription?.prescriber?.name;`
    *   **Nullish Coalescing (`??`):** Provide default values for `null` or `undefined`: `const displayName = user?.name ?? 'Guest';`

### **11.5 Using JSDoc with TypeScript**

As required by this course, use JSDoc comments alongside TypeScript to provide descriptive context that types alone cannot convey.

*   **Purpose:** Document the *why* behind the code, explain complex logic, clarify parameter meanings, describe side effects, and provide usage examples.
*   **Tags:** Use tags like `@param`, `@returns`, `@typedef`, `@property` (`@prop`), `@template`, `@throws`, `@deprecated`, etc., to structure documentation.
*   **Integration:** JSDoc comments complement TypeScript types, enhancing readability and maintainability for human developers.

```typescript
import { BaseOrder, PrescriptionOrderDetails } from './models'; // Assuming types are defined
import { OrderStatus } from './enums'; // Assuming enum is defined
import { ApiResponse } from './api'; // Assuming generic type is defined

/**
 * Represents a complete prescription order by combining base order info
 * with prescription-specific details.
 * @typedef {BaseOrder & PrescriptionOrderDetails} PrescriptionOrder
 * @property {string} orderId - Unique identifier for the order. (Inherited from BaseOrder)
 * @property {Date} orderDate - Timestamp when the order was placed. (Inherited from BaseOrder)
 * @property {OrderStatus} status - Current status of the order. (Inherited from BaseOrder)
 * @property {number} prescriptionId - ID of the primary prescription being refilled or ordered. (From PrescriptionOrderDetails)
 * @property {string} medicationName - Name of the medication. (From PrescriptionOrderDetails)
 * @property {number} patientId - Identifier for the associated patient. (From PrescriptionOrderDetails)
 */
type PrescriptionOrder = BaseOrder & PrescriptionOrderDetails;

/**
 * Attempts to submit a prescription order to the pharmacy backend system.
 * Handles potential network errors and returns a standardized API response.
 *
 * @async
 * @param {PrescriptionOrder} order - The complete order object to be submitted.
 * @param {string} authToken - The user's authentication token for the API request.
 * @returns {Promise<ApiResponse<{ success: boolean; orderId?: string }>>} A promise resolving to the API response,
 * indicating success status and potentially the confirmed order ID.
 * @throws {Error} Throws a generic error for unexpected issues during submission (e.g., network failure).
 *                 Specific API errors should be checked within the 'error' property of the returned ApiResponse.
 */
async function submitPrescriptionOrder(
  order: PrescriptionOrder,
  authToken: string
): Promise<ApiResponse<{ success: boolean; orderId?: string }>> {
  console.log(`Submitting order ${order.orderId} for patient ${order.patientId}`);
  // --- Actual implementation would go here ---
  // Example: Use fetch API with appropriate headers and body
  // const response = await fetch('/api/orders/prescription', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${authToken}`,
  //   },
  //   body: JSON.stringify(order),
  // });
  // if (!response.ok) { /* Handle HTTP errors */ }
  // const result = await response.json();
  // return result as ApiResponse<{ success: boolean; orderId?: string }>;
  // --- End of actual implementation example ---

  // Placeholder implementation:
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  if (Math.random() > 0.1) { // Simulate success
    return { success: true, data: { success: true, orderId: order.orderId }, timestamp: new Date() };
  } else { // Simulate API error
    return { success: false, data: { success: false }, timestamp: new Date(), error: { code: 500, message: "Failed to submit order due to backend issue." } };
  }
}
```

This combination of TypeScript for structural safety and JSDoc for descriptive documentation provides a comprehensive approach to code clarity.

## **12. Adaptation Summary & Key Takeaways**

This module introduced the fundamentals of TypeScript and its application within the React Native context.

### **12.1 Adaptation Summary**

*   **For Native Developers (Android/iOS):** You'll find the static typing concepts familiar, but pay close attention to TypeScript's *structural* typing (vs. nominal typing in Java/Swift/Kotlin), its runtime type erasure, and the nuances of `strictNullChecks`. Generics and interfaces/types offer similar capabilities to their native counterparts but with different syntax.
*   **For React Developers (JavaScript):** TypeScript adds a crucial layer of safety, catching errors at compile-time that would only appear at runtime in JavaScript. Focus on leveraging type annotations for props, state, and functions to improve code quality, tooling (DX), and maintainability.
*   **For Angular Developers:** The core TypeScript language remains the same. Your focus will be on applying TypeScript within React Native's patterns: typing props/state for components (often functional), working with JSX, and integrating with React-specific state management, rather than Angular's decorators, modules, and DI system.

### **12.2 Key Takeaways**

*   **TypeScript = Safety + Productivity:** It enhances JavaScript with static typing, catching errors early, improving tooling, and making code more maintainable, especially for larger React Native apps.
*   **Core Concepts:** Master basic types (`string`, `number`, `boolean`), special types (`any`, `unknown`, `void`), defining object shapes (`interface`, `type`), typing functions (parameters, return values), and creating reusable code with generics (`<T>`, `extends`).
*   **Inference vs. Explicit:** Leverage TypeScript's type inference for simple cases, but always explicitly type function signatures, component props, and complex data structures.
*   **Safety First:** Use `unknown` instead of `any` when types are uncertain. Enable `strictNullChecks` and handle `null`/`undefined` explicitly using type guards, optional chaining (`?.`), or nullish coalescing (`??`). Use type assertions (`as`) sparingly and with caution.
*   **Organization Matters:** Structure your types using co-location, shared folders (`types/`), or feature-based organization as your project grows.
*   **Clarity is King:** Use JSDoc comments alongside TypeScript types to document intent, purpose, and usage, fulfilling the course standard for comprehensive documentation.

### **12.3 Next Steps**

Continue practicing these TypeScript concepts. You will apply them extensively in subsequent modules focusing on React Native components, state management, navigation, and throughout the development of the SpeedyMeds capstone project. Pay close attention to how types define the contracts between different parts of the application.

---

![height:400px](./assets/images/partial-react-logo.png)

This concludes the TypeScript Essentials module. You now have a foundational understanding of TypeScript's core concepts, its benefits for React Native development, and how to apply it effectively. The next modules will build upon this foundation, integrating TypeScript into practical React Native component development, state management, and more.