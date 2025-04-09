---
marp: true
theme: custom-theme
paginate: true
header: 'Module 04: JavaScript Essentials - Lesson 05: ES6+ Features'
footer: 'React Native Training'
---
<!-- Presenter notes for Title slide -->
<!-- Introduce ES6 (ECMAScript 2015) and subsequent versions as major updates to JS. Focus on features that make code more concise, readable, and powerful, especially relevant for React Native. -->

<!-- _class: lead -->
# Lesson 05: ES6+ Features

Modern JavaScript syntax for cleaner, more powerful code.

---
<!-- Presenter notes for Learning Objectives slide -->
<!-- Review objectives. Highlight destructuring, spread/rest, template literals, and modules as particularly important for daily development. -->

## Learning Objectives

By the end of this lesson, you will be able to:

-   Use Destructuring Assignment for arrays and objects.
-   Apply the Spread syntax (`...`) to arrays and objects.
-   Use Rest parameters (`...`) in function definitions.
-   Utilize Template Literals for easier string interpolation.
-   Understand the basics of ES6 Modules (`import`/`export`).
-   Recognize and use Default Parameters in functions.
-   (Briefly) Understand the role of Promises for asynchronous operations.

---
<!-- Presenter notes for Introduction slide -->
<!-- Explain that ES6 was a major turning point. These features aren't optional novelties; they are standard practice in modern JS/TS development, including React Native with Expo. -->

## Introduction

ECMAScript (ES) is the standard upon which JavaScript is based. Starting with ES6 (ECMAScript 2015), JavaScript received significant updates introducing features that make code more readable, concise, and powerful. These features are now standard in modern JavaScript development and are heavily used in frameworks like React Native and tools like Expo. We've already seen some (like `let`/`const` and arrow functions), but let's explore others crucial for efficient development.

---
<!-- Presenter notes for Destructuring Objects slide -->
<!-- Explain destructuring as extracting values from objects/arrays into distinct variables. Show the object syntax `{ key }`. Show renaming `{ key: newName }`. Show default values `{ key = defaultValue }`. -->

## Destructuring Assignment: Objects

Destructuring provides a concise way to extract properties from objects into distinct variables.

**Syntax:** `const { property1, property2 } = object;`

This creates new variables `property1` and `property2` containing the values of the corresponding properties from `object`.

You can also:
-   **Rename variables:** `{ property1: newName }`
-   **Assign default values:** `{ property1 = defaultValue }`
-   **Destructure nested objects:** `{ prop: { nestedProp } }`

---
<!-- Presenter notes for Destructuring Objects Example slide -->
<!-- Walk through the example. Show extracting `name`, `dosageMg`. Show renaming `form` to `dosageForm`. Show default value for `storageInstructions`. -->

## Destructuring Objects Example (TypeScript)

```typescript
// Assuming Medication interface from previous lesson:
interface Medication {
  id: string; name: string; dosageMg: number; form: string;
  requiresPrescription: boolean; storageInstructions?: string;
  displaySummary: () => string;
}

const currentMedication: Medication = {
  id: "MED004", name: "Sertraline", dosageMg: 50, form: "Tablet",
  requiresPrescription: true, /* storageInstructions omitted */
  displaySummary: function() { return `${this.name} ${this.dosageMg}mg`; }
};

// --- Destructuring ---

// 1. Basic extraction
const { name, dosageMg } = currentMedication;
console.log(`Med: ${name}, Dose: ${dosageMg}mg`); // Output: Med: Sertraline, Dose: 50mg

// 2. Renaming variables
const { form: dosageForm } = currentMedication;
console.log(`Form: ${dosageForm}`); // Output: Form: Tablet ('dosageForm' variable created)

// 3. Default values (useful for optional properties)
const { storageInstructions = "Store at room temperature." } = currentMedication;
console.log(`Storage: ${storageInstructions}`); // Output: Store at room temperature. (Default used)

// 4. Combining renaming and default values
const { requiresPrescription: needsRx = true } = currentMedication;
console.log(`Needs Rx? ${needsRx}`); // Output: Needs Rx? true (Value from object used)

// 5. Using in function parameters
/**
 * Logs medication details using destructuring in parameters.
 * @param medication - The medication object.
 */
function logMedDetails({ name, dosageMg, form }: Medication): void {
    console.log(`Logging Details: ${name} ${dosageMg}mg ${form}`);
}
logMedDetails(currentMedication); // Output: Logging Details: Sertraline 50mg Tablet
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates various ways to use **Object Destructuring** in TypeScript.

1.  **Purpose:** To show how destructuring simplifies extracting property values from an object (`currentMedication`) into separate variables, making the code potentially cleaner than repeated dot notation (e.g., `currentMedication.name`, `currentMedication.dosageMg`).
2.  **Basic Extraction (`{ name, dosageMg }`):** This creates two new constants, `name` and `dosageMg`, and initializes them with the values of the corresponding properties from `currentMedication`. It's shorthand for `const name = currentMedication.name; const dosageMg = currentMedication.dosageMg;`.
3.  **Renaming (`{ form: dosageForm }`):** Sometimes the property name isn't ideal for a variable name. This syntax extracts the value of the `form` property but assigns it to a new constant named `dosageForm`.
4.  **Default Values (`{ storageInstructions = "..." }`):** The `storageInstructions` property is optional in the `Medication` interface and was omitted when creating `currentMedication`. The destructuring assignment provides a default value ("Store at room temperature."). Since `currentMedication.storageInstructions` is `undefined`, this default value is assigned to the `storageInstructions` constant. If the property *had* existed on the object, its value would have been used instead of the default.
5.  **Combining (`{ requiresPrescription: needsRx = true }`):** You can combine renaming and default values. Here, `requiresPrescription` is extracted, renamed to `needsRx`, and a default of `true` is provided (though unnecessary in this specific case as the property exists).
6.  **Function Parameters (`logMedDetails({ name, dosageMg, form }: Medication)`):** Destructuring is extremely common in function parameters, especially in React components receiving props. Instead of receiving the whole `medication` object and accessing properties via `medication.name`, etc., inside the function, we destructure `name`, `dosageMg`, and `form` directly in the parameter list. The `: Medication` type annotation still applies to the *object being passed in*, ensuring type safety. This makes the function body cleaner as it can use `name`, `dosageMg`, etc., directly.

---
<!-- Presenter notes for Destructuring Arrays slide -->
<!-- Explain array destructuring `[ a, b ]`. Show skipping elements `[ a, , c ]`. Show rest pattern `[ a, ...rest ]`. Show default values `[ a = defaultValue ]`. -->

## Destructuring Assignment: Arrays

Destructuring also works for arrays, extracting values based on their position (index).

**Syntax:** `const [ element1, element2 ] = array;`

This creates new variables `element1` (from `array[0]`) and `element2` (from `array[1]`).

You can also:
-   **Skip elements:** `[ element1, , element3 ]` (skips the second element)
-   **Use Rest syntax:** `[ element1, ...remainingElements ]` (gathers the rest into a new array)
-   **Assign default values:** `[ element1 = defaultValue ]`

---
<!-- Presenter notes for Destructuring Arrays Example slide -->
<!-- Walk through the examples: basic extraction, skipping, rest pattern, default value. -->

## Destructuring Arrays Example (TypeScript)

```typescript
const patientQueue: string[] = ["Alice", "Bob", "Charlie", "David"];
const primaryColors: (string | undefined)[] = ["Red", undefined, "Blue"]; // Array might have undefined values

// --- Destructuring ---

// 1. Basic extraction by position
const [firstPatient, secondPatient] = patientQueue;
console.log(`Next patient: ${firstPatient}, Following: ${secondPatient}`); // Output: Next patient: Alice, Following: Bob

// 2. Skipping elements
const [ , , thirdPatient] = patientQueue; // Skip first two using commas
console.log(`Third patient: ${thirdPatient}`); // Output: Third patient: Charlie

// 3. Rest syntax (gathers remaining elements into a new array)
const [nextUp, ...waitingList] = patientQueue;
console.log(`Processing: ${nextUp}`); // Output: Processing: Alice
console.log(`Waiting: ${waitingList}`); // Output: Waiting: Bob,Charlie,David (waitingList is a new array)

// 4. Default values
const [primary = "Unknown", secondary = "Unknown", tertiary = "Unknown"] = primaryColors;
console.log(`Primary: ${primary}`); // Output: Primary: Red (Value from array used)
console.log(`Secondary: ${secondary}`); // Output: Secondary: Unknown (Default used as array element was undefined)
console.log(`Tertiary: ${tertiary}`); // Output: Tertiary: Blue (Value from array used)

// 5. Swapping variables (classic example)
let drugA: string = "Aspirin";
let drugB: string = "Ibuprofen";
[drugA, drugB] = [drugB, drugA]; // Swap values using array destructuring
console.log(`drugA is now: ${drugA}, drugB is now: ${drugB}`); // Output: drugA is now: Ibuprofen, drugB is now: Aspirin
```
**(Copy button available in top-right corner)**

**Explanation:**

This example illustrates **Array Destructuring** in TypeScript.

1.  **Purpose:** To show how to easily extract elements from an array into distinct variables based on their position (index), providing a cleaner alternative to index access like `patientQueue[0]`.
2.  **Basic Extraction (`[firstPatient, secondPatient]`):** This creates two new constants, `firstPatient` and `secondPatient`, assigning them the values of the first (`patientQueue[0]`) and second (`patientQueue[1]`) elements of the `patientQueue` array, respectively.
3.  **Skipping Elements (`[ , , thirdPatient]`):** By using commas `,` as placeholders, you can skip elements you don't need to assign to variables. Here, the first two elements are skipped, and the third element (`patientQueue[2]`) is assigned to the `thirdPatient` constant.
4.  **Rest Syntax (`[nextUp, ...waitingList]`):** The `...` syntax used within array destructuring is the **rest pattern**. It gathers all *remaining* elements of the array (after the explicitly destructured ones) into a *new* array. Here, `nextUp` gets the first element ("Alice"), and `waitingList` becomes a new array containing all subsequent elements `["Bob", "Charlie", "David"]`.
5.  **Default Values (`[primary = "Unknown", ...]`):** Similar to object destructuring, you can provide default values for array elements. If the element at the corresponding position in the array is `undefined` (or if the array is shorter than the number of destructured variables), the default value is used. In the `primaryColors` example, `primary` gets "Red", `secondary` gets the default "Unknown" because `primaryColors[1]` is `undefined`, and `tertiary` gets "Blue".
6.  **Swapping Variables:** Array destructuring provides an elegant way to swap the values of two variables without needing a temporary variable. `[drugA, drugB] = [drugB, drugA]` creates a temporary array `[drugB, drugA]` on the right and then destructures it back into the `drugA` and `drugB` variables in the swapped order.

---
<!-- Presenter notes for Spread Syntax slide -->
<!-- Explain spread `...` used in *creation* or *function calls*. Arrays: creates shallow copies, combines arrays. Objects: creates shallow copies, merges objects (later properties overwrite earlier ones). -->

## Spread Syntax (`...`)

The Spread syntax (`...`) looks similar to the Rest syntax but does the opposite: it *expands* an iterable (like an array) or an object's properties into places where multiple elements or key-value pairs are expected.

**Use Cases:**
-   **Arrays:** Creating shallow copies, concatenating arrays, passing array elements as individual arguments to functions.
-   **Objects:** Creating shallow copies, merging objects.

---
<!-- Presenter notes for Spread Syntax Example slide -->
<!-- Show array copying/concatenation. Show object copying/merging, emphasizing overwrite behavior. Show passing array elements as args. -->

## Spread Syntax Example (TypeScript)

```typescript
// --- Spread with Arrays ---
const morningMeds: string[] = ["Lisinopril", "Metformin"];
const eveningMeds: string[] = ["Simvastatin"];

// 1. Concatenating arrays
const allMeds: string[] = [...morningMeds, "Aspirin", ...eveningMeds];
console.log("All Meds:", allMeds); // Output: All Meds: [ 'Lisinopril', 'Metformin', 'Aspirin', 'Simvastatin' ]

// 2. Creating a shallow copy
const morningMedsCopy: string[] = [...morningMeds];
morningMedsCopy.push("Vitamin D"); // Modify the copy
console.log("Original Morning Meds:", morningMeds); // Output: Original Morning Meds: [ 'Lisinopril', 'Metformin' ] (Unaffected)
console.log("Copied Morning Meds:", morningMedsCopy); // Output: Copied Morning Meds: [ 'Lisinopril', 'Metformin', 'Vitamin D' ]

// 3. Passing array elements as function arguments
function logThreeMeds(med1: string, med2: string, med3: string): void {
    console.log(`Logging: ${med1}, ${med2}, ${med3}`);
}
const firstThree: string[] = ["MedA", "MedB", "MedC", "MedD"];
// logThreeMeds(firstThree[0], firstThree[1], firstThree[2]); // Old way
logThreeMeds(...firstThree.slice(0, 3)); // Spreads the first 3 elements as individual arguments
// Output: Logging: MedA, MedB, MedC

// --- Spread with Objects (ES2018+) ---
const basePatientInfo = { id: "P123", name: "Alice" };
const contactInfo = { email: "alice@example.com", phone: "555-1234" };
const medicalInfo = { allergies: ["Penicillin"], name: "Alice Smith" }; // Note duplicate 'name'

// 4. Merging objects (shallow copy)
const fullPatientRecord = { ...basePatientInfo, ...contactInfo, registered: true };
console.log("Full Record:", fullPatientRecord);
// Output: Full Record: { id: 'P123', name: 'Alice', email: 'alice@example.com', phone: '555-1234', registered: true }

// 5. Merging with overwrites (properties later in the spread overwrite earlier ones)
const mergedMedical = { ...basePatientInfo, ...medicalInfo };
console.log("Merged Medical:", mergedMedical);
// Output: Merged Medical: { id: 'P123', name: 'Alice Smith', allergies: [ 'Penicillin' ] } ('name' from medicalInfo overwrites basePatientInfo)
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates the **Spread Syntax (`...`)** for both arrays and objects in TypeScript.

1.  **Purpose:** To show how spread allows easy copying, merging, and expansion of array elements and object properties.
2.  **Array Concatenation (`[...morningMeds, "Aspirin", ...eveningMeds]`):** Spread syntax provides a readable way to combine multiple arrays and/or individual elements into a new array. `...morningMeds` expands the elements of `morningMeds` into the new array, followed by the literal `"Aspirin"`, followed by the expanded elements of `eveningMeds`.
3.  **Array Shallow Copy (`[...morningMeds]`):** Using spread syntax is a common way to create a *shallow copy* of an array. `morningMedsCopy` becomes a new array containing the same elements as `morningMeds`. Modifying the copy (`morningMedsCopy.push(...)`) does not affect the original array. (Note: "Shallow" means if the array elements were objects, the objects themselves would not be deeply copied, only their references).
4.  **Function Arguments (`logThreeMeds(...firstThree.slice(0, 3))`):** Spread can expand an array's elements into individual arguments when calling a function. `firstThree.slice(0, 3)` creates an array `["MedA", "MedB", "MedC"]`. The `...` then passes these as `logThreeMeds("MedA", "MedB", "MedC")`. This is useful when a function expects separate arguments, but you have them in an array.
5.  **Object Merging (`{ ...basePatientInfo, ...contactInfo, registered: true }`):** Spread syntax allows merging properties from multiple objects into a new object. Properties from objects appearing later in the sequence will overwrite properties with the same key from earlier objects. New properties (`registered: true`) can also be added. This creates a *shallow copy* of the properties.
6.  **Object Overwriting (`{ ...basePatientInfo, ...medicalInfo }`):** This demonstrates the overwrite behavior. Both `basePatientInfo` and `medicalInfo` have a `name` property. Since `...medicalInfo` comes later, its `name` ("Alice Smith") overwrites the `name` from `basePatientInfo` ("Alice") in the resulting `mergedMedical` object.

---
<!-- Presenter notes for Rest Parameters slide -->
<!-- Explain rest `...` used in *function parameters*. Gathers *remaining* arguments passed to a function into a single array. Must be the *last* parameter. -->

## Rest Parameters (`...`)

The Rest parameter syntax (`...`) looks identical to Spread but is used in *function parameter lists*. It allows a function to accept an indefinite number of arguments as an array.

**Syntax:** `function myFunc(param1, param2, ...restOfArgs)`

-   Gathers all remaining arguments passed to the function (after the explicitly named ones) into an array named `restOfArgs`.
-   Must be the **last** parameter in the function definition.

---
<!-- Presenter notes for Rest Parameters Example slide -->
<!-- Show a function summing numbers. `initialValue` is required, `...numbersToAdd` gathers any subsequent arguments into an array. -->

## Rest Parameters Example (TypeScript)

```typescript
/**
 * Calculates the sum of an initial value and any number of additional values.
 * @param initialValue - The starting value for the sum.
 * @param numbersToAdd - An array containing all additional numbers passed to the function.
 * @returns The total sum.
 */
function sumValues(initialValue: number, ...numbersToAdd: number[]): number {
  let total = initialValue;

  // 'numbersToAdd' is an array, so we can iterate over it
  for (const num of numbersToAdd) {
    total += num;
  }
  // Alternatively using reduce:
  // const total = numbersToAdd.reduce((acc, current) => acc + current, initialValue);

  return total;
}

// Example Usage
const sum1 = sumValues(10); // numbersToAdd will be []
console.log("Sum 1:", sum1); // Output: Sum 1: 10

const sum2 = sumValues(10, 5, 2); // numbersToAdd will be [5, 2]
console.log("Sum 2:", sum2); // Output: Sum 2: 17

const sum3 = sumValues(10, 1, 2, 3, 4, 5); // numbersToAdd will be [1, 2, 3, 4, 5]
console.log("Sum 3:", sum3); // Output: Sum 3: 25

// Using with spread syntax:
const extraValues = [100, 200];
const sum4 = sumValues(10, ...extraValues); // Spreads [100, 200] into arguments 100, 200
console.log("Sum 4:", sum4); // Output: Sum 4: 310
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates **Rest Parameters (`...`)** in a TypeScript function definition.

1.  **Purpose:** The `sumValues` function is designed to calculate the sum of a required `initialValue` plus any number of additional numeric arguments provided by the caller.
2.  **Syntax (`...numbersToAdd: number[]`):**
    *   The `...` before `numbersToAdd` indicates that this is a rest parameter.
    *   It must be the *last* parameter in the function signature.
    *   `numbersToAdd` will be an **array** containing all arguments passed to `sumValues` *after* the `initialValue`.
    *   `: number[]` is the TypeScript type annotation, specifying that `numbersToAdd` will be an array where each element is a number.
3.  **Gathering Arguments:**
    *   When `sumValues(10)` is called, only `initialValue` receives an argument (10). `numbersToAdd` becomes an empty array `[]`.
    *   When `sumValues(10, 5, 2)` is called, `initialValue` gets 10. The remaining arguments (5 and 2) are gathered into the `numbersToAdd` array: `[5, 2]`.
    *   When `sumValues(10, 1, 2, 3, 4, 5)` is called, `initialValue` gets 10, and `numbersToAdd` becomes `[1, 2, 3, 4, 5]`.
4.  **Using the Rest Array:** Inside the function, `numbersToAdd` is treated just like any other array. The example uses a `for...of` loop to iterate over the elements in `numbersToAdd` and add them to the `total`. An alternative using the `reduce` array method is also commented out.
5.  **Combining with Spread:** The last example (`sumValues(10, ...extraValues)`) shows how spread syntax can be used when *calling* a function that accepts rest parameters. The `...extraValues` spreads the elements of the `extraValues` array (`[100, 200]`) into individual arguments, which are then gathered by the `...numbersToAdd` rest parameter, resulting in `numbersToAdd` being `[100, 200]`.

---
<!-- Presenter notes for Template Literals slide -->
<!-- Explain backticks `` ` ``. Show embedding expressions `${...}`. Show multi-line strings without needing `\n`. -->

## Template Literals

Template literals provide an easier way to create strings, especially those containing variables or multiple lines.

-   **Syntax:** Enclosed by backticks (`` ` ``) instead of single (`'`) or double (`"`) quotes.
-   **Embedded Expressions:** Allow embedding expressions (variables, function calls, etc.) directly within the string using the `${expression}` syntax.
-   **Multiline Strings:** Strings can span multiple lines without needing special characters like `\n`.

---
<!-- Presenter notes for Template Literals Example slide -->
<!-- Show simple interpolation. Show multi-line string formatting. -->

## Template Literals Example (TypeScript)

```typescript
const patientName: string = "Charlie Day";
const medication: string = "Calcitriol";
const dose: number = 0.25;
const unit: string = "mcg";
const frequency: string = "once daily";

// 1. Simple Interpolation
const instruction = `Patient ${patientName} should take ${medication} ${dose}${unit} ${frequency}.`;
console.log(instruction);
// Output: Patient Charlie Day should take Calcitriol 0.25mcg once daily.

// 2. Multiline String
const notes = `
Patient Record: ${patientName}
-----------------------------
Medication: ${medication}
Dosage:     ${dose} ${unit}
Frequency:  ${frequency}
Status:     Active
`; // Line breaks inside the backticks are preserved
console.log(notes);
// Output:
// Patient Record: Charlie Day
// -----------------------------
// Medication: Calcitriol
// Dosage:     0.25 mcg
// Frequency:  once daily
// Status:     Active

// 3. Expressions inside placeholders
const quantity = 30;
const refillDays = 30;
const refillMessage = `Order ${quantity} ${medication} tablets. Next refill approx. in ${refillDays * 1} days.`; // Simple calculation inside
console.log(refillMessage);
// Output: Order 30 Calcitriol tablets. Next refill approx. in 30 days.
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates the use of **Template Literals** in TypeScript for creating strings more easily.

1.  **Purpose:** To show how template literals simplify string construction, especially when embedding variable values (interpolation) or creating strings that span multiple lines.
2.  **Syntax (Backticks `` ` ``):** Template literals are defined using backticks `` ` `` instead of single quotes `'` or double quotes `"`.
3.  **String Interpolation (`${expression}`):** Inside a template literal, you can embed any valid JavaScript expression (like a variable name, a calculation, or a function call) by wrapping it in `${...}`. The expression is evaluated, and its result is converted to a string and inserted directly into the main string. This is much more readable than traditional string concatenation using the `+` operator (e.g., `"Patient " + patientName + " should take..."`). Examples 1 and 3 show this.
4.  **Multiline Strings:** Any line breaks entered directly between the backticks are preserved in the resulting string, as shown in the `notes` example. This avoids the need for explicitly adding newline characters (`\n`) or concatenating multiple strings, making it much cleaner to define formatted text blocks or templates.
5.  **Readability & Maintainability:** Template literals significantly improve the readability and maintainability of code that involves constructing strings from multiple parts or variables.

---
<!-- Presenter notes for Modules slide -->
<!-- Explain modules for organizing code into separate files. `export` makes things available, `import` brings them in. Mention default vs named exports. Crucial for any non-trivial application. -->

## ES6 Modules (`import`/`export`)

Modules allow you to split your code into separate files, making it organized, reusable, and maintainable.

-   **`export`**: Makes variables, functions, classes, or objects available for use in *other* files (modules).
    -   **Named Exports:** Export multiple items using `export { item1, item2 }` or `export const item1 = ...`. Imported using `{ item1 }`.
    -   **Default Export:** Export a single primary item using `export default item;`. Imported using `import anyName from './file';`. A file can have only one default export.
-   **`import`**: Brings exported items from one module into another module where they are needed.

> **Note:** React Native (with Metro bundler) uses the ES6 module system extensively. Every `.js` or `.tsx` file is typically treated as a module.

---
<!-- Presenter notes for Modules Example slide -->
<!-- Show a simple `utils.ts` exporting functions (named and default). Show `main.ts` importing and using them. Explain the import syntax for named vs default. -->

## Modules Example (TypeScript)

```typescript
// --- File: src/utils/medicationUtils.ts ---

// Named export (constant)
export const MAX_SAFE_DOSAGE_MG = 1000;

// Named export (function)
export function formatMedicationName(name: string, strength?: number | string): string {
  return `${name}${strength ? ` (${strength})` : ''}`;
}

// Default export (function)
export default function logDispensingEvent(medName: string, quantity: number): void {
  console.log(`[LOG] Dispensed ${quantity} units of ${medName}.`);
}

// --- File: src/mainApp.ts ---
// Import named exports using curly braces {}
import { MAX_SAFE_DOSAGE_MG, formatMedicationName } from './utils/medicationUtils';

// Import the default export (can use any name, 'logEvent' here)
import logEvent from './utils/medicationUtils';

// Use the imported items
const medName = "Ibuprofen";
const medStrength = "200mg";
const quantityDispensed = 30;

const formattedName = formatMedicationName(medName, medStrength);
console.log(`Formatted Name: ${formattedName}`); // Output: Formatted Name: Ibuprofen (200mg)

if (200 < MAX_SAFE_DOSAGE_MG) { // Using imported constant
  logEvent(formattedName, quantityDispensed); // Using imported default function
  // Output: [LOG] Dispensed 30 units of Ibuprofen (200mg).
}
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates the basic principles of ES6 Modules in TypeScript, splitting code into two files.

1.  **Purpose:** To show how to organize code into separate, reusable modules (`medicationUtils.ts`) and how to use the exported functionality in another module (`mainApp.ts`). This is fundamental for building any non-trivial application.
2.  **`export` (`medicationUtils.ts`):**
    *   **Named Exports:** `export const MAX_SAFE_DOSAGE_MG = ...;` and `export function formatMedicationName(...) { ... }` make the constant `MAX_SAFE_DOSAGE_MG` and the function `formatMedicationName` available for other modules to import *by their specific names*. You can have multiple named exports per file.
    *   **Default Export:** `export default function logDispensingEvent(...) { ... }` designates `logDispensingEvent` as the primary or default export of this module. A module can have **at most one** default export.
3.  **`import` (`mainApp.ts`):**
    *   **Importing Named Exports:** `import { MAX_SAFE_DOSAGE_MG, formatMedicationName } from './utils/medicationUtils';` uses curly braces `{}` to specify which named exports are needed from the specified file path (`./utils/medicationUtils`). The names inside the braces must match the exported names.
    *   **Importing Default Export:** `import logEvent from './utils/medicationUtils';` imports the *default* export from the specified file. You can choose **any name** (`logEvent` in this case) for the imported default item; it doesn't have to match the original function name (`logDispensingEvent`).
    *   **File Paths:** The path `'./utils/medicationUtils'` is relative to the location of `mainApp.ts`. The `.ts` extension is usually omitted as the module resolver (like TypeScript or Metro) handles it.
4.  **Usage:** Once imported, `MAX_SAFE_DOSAGE_MG`, `formatMedicationName`, and `logEvent` can be used within `mainApp.ts` just like locally defined constants or functions.
5.  **Benefits:** Modules help avoid polluting the global scope, improve code organization, enable code reuse, and allow bundlers like Metro to perform optimizations.

---
<!-- Presenter notes for Other Features slide -->
<!-- Briefly recap Default Parameters (seen before) and mention Promises as the foundation for async/await (coming next). -->

## Other Useful Features

-   **Default Parameters:** (Seen in Function examples) Allow you to provide default values for function parameters if no argument (or `undefined`) is passed.
    ```typescript
    function setTimer(duration: number = 1000) { /* ... */ }
    setTimer(); // duration is 1000
    setTimer(500); // duration is 500
    ```
-   **Promises:** (Foundation for `async/await`) Objects representing the eventual completion (or failure) of an asynchronous operation and its resulting value. We'll dive deeper into handling asynchronous operations in the next lesson.

---
<!-- Presenter notes for Context slide -->
<!-- Native Devs: Destructuring/Spread similar to some Swift/Kotlin features but more flexible in JS. Modules are like packages/imports. Web Devs: These are standard, essential tools. -->

## Context for Developers

> **Native Dev Context:** (For Android/iOS Developers)
> Destructuring has parallels in Swift (tuples, enum cases) and Kotlin (destructuring declarations for data classes/pairs). Spread/Rest syntax is powerful for array/argument manipulation, similar in concept to Swift's variadic parameters or Kotlin's varargs/spread operator (`*`). Template literals are like Swift's string interpolation (`"\(variable)"`) or Kotlin's string templates (`"$variable"`), but JS template literals also handle multiline strings easily. ES6 Modules are analogous to Java packages/imports, Swift modules/imports, or Kotlin packages/imports for code organization.

> **Web Dev Context:** (For React/Angular/Vue Developers)
> These ES6+ features are your daily bread and butter. Destructuring is heavily used for props and state in React. Spread syntax is essential for immutably updating state and props, creating copies of objects/arrays, and passing props down. Rest parameters are useful for component composition (e.g., passing down remaining props). Template literals simplify string creation. Modules (`import`/`export`) are the foundation of modern web application structure.

---
<!-- Presenter notes for Summary slide -->
<!-- Recap the main features covered: Destructuring, Spread, Rest, Template Literals, Modules, Default Params. -->

## Summary

In this lesson, we explored key ES6+ features that enhance JavaScript development:

-   **Destructuring:** Extracts values from arrays or objects into variables.
-   **Spread (`...`):** Expands iterables/object properties (for copying, merging, function calls).
-   **Rest (`...`):** Gathers remaining arguments into an array in function parameters.
-   **Template Literals (`` ` ``):** Simplify string interpolation (`${...}`) and multiline strings.
-   **Modules (`import`/`export`):** Organize code into reusable files.
-   **Default Parameters:** Provide fallback values for function arguments.

---
<!-- Presenter notes for Next Steps slide -->
<!-- Point to Async lesson. Encourage practicing destructuring and spread with the objects/arrays from the previous lesson. -->

## Next Steps

Practice using destructuring and spread syntax with the object and array examples from the previous lesson. Try refactoring some of the earlier function examples to use arrow functions or default parameters.

Proceed to **Lesson 06: Asynchronous JavaScript** to understand how JavaScript handles operations that take time, like fetching data.

**Further Reading:**
-   [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
-   [MDN: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
-   [MDN: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
-   [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
-   [MDN: Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)