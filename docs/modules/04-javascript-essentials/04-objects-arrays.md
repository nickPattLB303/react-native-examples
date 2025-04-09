---
marp: true
theme: custom-theme
paginate: true
header: 'Module 04: JavaScript Essentials - Lesson 04: Objects & Arrays'
footer: 'React Native Training'
---
<!-- Presenter notes for Title slide -->
<!-- Introduce Objects (collections of related data/functionality - key/value pairs) and Arrays (ordered lists of items). These are the primary ways to structure complex data in JS. -->

<!-- _class: lead -->
# Lesson 04: Objects & Arrays

Grouping related data using key-value pairs and ordered lists.

---
<!-- Presenter notes for Learning Objectives slide -->
<!-- Review objectives. Emphasize literal syntax, accessing methods, common array methods, and TS typing. -->

## Learning Objectives

By the end of this lesson, you will be able to:

-   Create objects using literal syntax to store key-value pairs.
-   Access and modify object properties using dot and bracket notation.
-   Define object types using TypeScript interfaces or type aliases.
-   Create arrays using literal syntax to store ordered lists of values.
-   Access and modify array elements using index notation.
-   Use common array properties (`length`) and methods (e.g., `push`, `pop`, `forEach`, `map`, `filter`).
-   Define array types in TypeScript.

---
<!-- Presenter notes for Introduction slide -->
<!-- Explain why primitives aren't enough. We need ways to group data. Object for structured data (like a medication record), Array for lists (like a list of patient names). -->

## Introduction

While primitive data types (string, number, boolean, etc.) are essential, most real-world applications require more complex data structures. JavaScript provides two primary structures for grouping data:

-   **Objects:** Collections of related data and/or functionality represented as **key-value pairs**. Ideal for describing entities with multiple properties (e.g., a patient, a medication).
-   **Arrays:** Ordered lists of values. Ideal for storing sequences of items where the order matters (e.g., a list of prescribed medications, steps in a process).

We'll use TypeScript to define the structure (shape) of our objects and the type of elements in our arrays.

---
<!-- Presenter notes for Objects slide -->
<!-- Explain key-value pairs. Show literal syntax `{}`. Keys are usually strings (or Symbols), values can be any type (including other objects or functions - methods). -->

## Objects

Objects group related data under named keys.

-   **Literal Syntax:** Created using curly braces `{}`.
-   **Key-Value Pairs:** Consist of `key: value`, separated by commas.
    -   Keys are typically strings (implicitly or explicitly quoted) or Symbols.
    -   Values can be any JavaScript data type, including other objects, arrays, or functions (called **methods** when they are properties of an object).

---
<!-- Presenter notes for Object Example slide -->
<!-- Walk through the medication object. Explain dot notation for access/modification. Explain bracket notation, especially for dynamic keys or keys with special characters. Introduce the TS Interface for defining the object's shape. -->

## Object Example (TypeScript)

```typescript
// Define the 'shape' of a Medication object using a TypeScript interface
interface Medication {
  id: string; // Unique identifier
  name: string;
  dosageMg: number;
  form: 'Tablet' | 'Capsule' | 'Liquid' | 'Cream'; // Literal types for specific forms
  requiresPrescription: boolean;
  // Optional property (indicated by '?')
  storageInstructions?: string;
  // A method (function as a property)
  displaySummary: () => string; // Function that takes no args and returns a string
}

// Create an object matching the Medication interface
const medicationA: Medication = {
  id: "MED001",
  name: "Loratadine",
  dosageMg: 10,
  form: "Tablet",
  requiresPrescription: false,
  storageInstructions: "Store at room temperature.",
  // Implement the method
  displaySummary: function() { // Using traditional function expression
    return `${this.name} ${this.dosageMg}mg ${this.form}`; // 'this' refers to the object itself
  }
};

// Accessing properties using Dot Notation
console.log(`Medication Name: ${medicationA.name}`); // Output: Loratadine
console.log(`Dosage: ${medicationA.dosageMg}mg`); // Output: 10mg

// Accessing properties using Bracket Notation (useful for dynamic keys)
const propertyToAccess: string = 'form';
console.log(`Form: ${medicationA[propertyToAccess]}`); // Output: Tablet

// Modifying a property
medicationA.dosageMg = 5; // Changed dosage
console.log(`Updated Dosage: ${medicationA.dosageMg}mg`); // Output: 5mg

// Calling an object method
console.log(`Summary: ${medicationA.displaySummary()}`); // Output: Summary: Loratadine 5mg Tablet

// Example of accessing an optional property
console.log(`Storage: ${medicationA.storageInstructions ?? 'N/A'}`); // Output: Store at room temperature. (Uses nullish coalescing)

// Another medication object (using arrow function for method)
const medicationB: Medication = {
    id: "MED002",
    name: "Amoxicillin",
    dosageMg: 500,
    form: "Capsule",
    requiresPrescription: true,
    // storageInstructions is omitted (optional)
    displaySummary: () => {
        // Arrow functions handle 'this' differently - be careful using 'this' here
        // In this simple case it might work, but generally prefer function expressions for methods using 'this'
        // Or avoid 'this' if possible within arrow function methods if state isn't needed.
        // Let's reconstruct without 'this' for safety in this arrow function context:
        return `${medicationB.name} ${medicationB.dosageMg}mg ${medicationB.form}`;
    }
};
console.log(`Summary B: ${medicationB.displaySummary()}`); // Output: Summary B: Amoxicillin 500mg Capsule
console.log(`Storage B: ${medicationB.storageInstructions ?? 'N/A'}`); // Output: Storage B: N/A
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates creating, typing, accessing, modifying, and using methods of JavaScript objects, enhanced with TypeScript interfaces.

1.  **TypeScript Interface (`Medication`):** An `interface` defines a contract or "shape" that an object must adhere to. It lists the expected properties (`id`, `name`, `dosageMg`, etc.) and their types (`string`, `number`, literal types like `'Tablet'`, optional types `?`, function types `() => string`). This provides strong type checking – TypeScript will error if an object assigned to `Medication` is missing required properties or has properties of the wrong type. Using interfaces (or `type` aliases) is crucial for managing complex data structures.
2.  **Object Literal (`medicationA`):** An object is created using curly braces `{}` with key-value pairs. `medicationA` is declared with the type `Medication`, ensuring it conforms to the interface.
3.  **Properties:** Keys like `id`, `name`, `dosageMg` hold corresponding values. `storageInstructions?` is marked optional in the interface, meaning it doesn't *have* to be present (though it is in `medicationA`). `form` uses literal types (`'Tablet' | ...`) restricting its value to only those specific strings.
4.  **Methods (`displaySummary`):** A function assigned as a property value is called a method. `medicationA.displaySummary` uses a traditional `function` expression. Inside such functions, the `this` keyword typically refers to the object the method was called on (`medicationA` in this case), allowing access to other properties like `this.name`. `medicationB.displaySummary` uses an arrow function. Arrow functions handle `this` differently (lexical scoping), which can be complex. For object methods that need to refer to the object's own properties, traditional function expressions are often safer unless you specifically need the lexical `this` behavior. The example for `medicationB` avoids `this` for simplicity within the arrow function.
5.  **Accessing Properties:**
    *   **Dot Notation (`medicationA.name`):** The most common way. Simple and readable when the property key is a valid identifier.
    *   **Bracket Notation (`medicationA[propertyToAccess]`):** Required when the property key is dynamic (stored in a variable, like `propertyToAccess`) or if the key contains spaces or special characters (e.g., `medicationA['requires-prescription']`).
6.  **Modifying Properties:** Existing property values can be updated using assignment with either dot or bracket notation (`medicationA.dosageMg = 5;`).
7.  **Calling Methods:** Methods are called like functions, using parentheses `()` after accessing the method property (`medicationA.displaySummary()`).
8.  **Optional Properties & Nullish Coalescing:** When accessing an optional property like `storageInstructions`, it might be `undefined`. The nullish coalescing operator (`??`) provides a default value (`'N/A'`) only if the left-hand side is `null` or `undefined`.

---
<!-- Presenter notes for Arrays slide -->
<!-- Explain arrays as ordered lists. Zero-based indexing. Literal syntax `[]`. Can hold mixed types (but TS encourages typed arrays). -->

## Arrays

Arrays store ordered lists of values.

-   **Literal Syntax:** Created using square brackets `[]`.
-   **Ordered:** Elements are stored in a specific sequence.
-   **Zero-Indexed:** The first element is at index `0`, the second at index `1`, and so on.
-   **Elements:** Can hold values of any data type, including other arrays or objects. TypeScript allows us to specify the type of elements an array should hold.

---
<!-- Presenter notes for Array Example slide -->
<!-- Show array creation. Explain index access `[0]`. Show `length`. Demonstrate `push` (add to end), `pop` (remove from end). Briefly mention `forEach`, `map`, `filter` as powerful iteration/transformation methods to be covered more later. Explain TS array typing (`string[]`, `Medication[]`). -->

## Array Example (TypeScript)

```typescript
// Define an array holding strings (medication names)
const activePrescriptions: string[] = ["Lisinopril", "Metformin", "Atorvastatin"];

// Define an array holding Medication objects (using the interface from before)
// (Assuming Medication interface is defined as in the previous example)
const patientMedications: Medication[] = [
  { id: "MED003", name: "Albuterol Inhaler", dosageMg: 90, form: "Liquid", requiresPrescription: true, displaySummary: function() { return `${this.name} ${this.dosageMg}mcg`; } }, // Note: dosage unit might differ
  { id: "MED001", name: "Loratadine", dosageMg: 10, form: "Tablet", requiresPrescription: false, displaySummary: function() { return `${this.name} ${this.dosageMg}mg`; } }
];

// Accessing elements by index (zero-based)
console.log(`First prescription: ${activePrescriptions[0]}`); // Output: Lisinopril
console.log(`Second medication name: ${patientMedications[1].name}`); // Output: Loratadine

// Getting the length (number of elements)
console.log(`Number of active prescriptions: ${activePrescriptions.length}`); // Output: 3

// Modifying an element
activePrescriptions[2] = "Simvastatin"; // Replaced Atorvastatin
console.log(`Updated list: ${activePrescriptions}`); // Output: Lisinopril,Metformin,Simvastatin

// Adding elements (Array Methods)
activePrescriptions.push("Omeprazole"); // Adds to the end
console.log(`After push: ${activePrescriptions}`); // Output: Lisinopril,Metformin,Simvastatin,Omeprazole

// Removing elements (Array Methods)
const removedMedication = activePrescriptions.pop(); // Removes from the end and returns it
console.log(`Removed: ${removedMedication}`); // Output: Omeprazole
console.log(`After pop: ${activePrescriptions}`); // Output: Lisinopril,Metformin,Simvastatin

// Iterating with forEach (Array Method)
console.log("Patient Medications Summary:");
patientMedications.forEach((med, index) => {
  // 'med' is the current element, 'index' is its index
  console.log(` - Item ${index + 1}: ${med.displaySummary()}`);
});
// Output:
// Patient Medications Summary:
//  - Item 1: Albuterol Inhaler 90mcg
//  - Item 2: Loratadine 10mg

// Other common methods (we'll explore more later):
// - map: Create a new array by transforming each element.
// - filter: Create a new array with only elements that pass a test.
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates the creation, typing, and manipulation of JavaScript arrays using TypeScript.

1.  **Array Literals:** Arrays are created using square brackets `[]`, with elements separated by commas. `activePrescriptions` holds strings, while `patientMedications` holds objects conforming to the `Medication` interface.
2.  **TypeScript Array Typing:**
    *   `string[]`: This annotation specifies that `activePrescriptions` is an array where *every* element must be a string.
    *   `Medication[]`: This specifies that `patientMedications` is an array where *every* element must be an object conforming to the `Medication` interface. Typing arrays ensures that you don't accidentally put incompatible data types into them.
3.  **Accessing Elements:** Elements are accessed using zero-based index notation within square brackets (e.g., `activePrescriptions[0]` gets the first element, `patientMedications[1]` gets the second). You can chain access, like `patientMedications[1].name`, to get a property of an object within the array.
4.  **`length` Property:** `array.length` returns the number of elements currently in the array.
5.  **Modifying Elements:** You can change the value of an element at a specific index using assignment (`activePrescriptions[2] = "Simvastatin";`).
6.  **Common Array Methods:** JavaScript provides many built-in methods to work with arrays:
    *   **`push(element)`:** Adds one or more elements to the *end* of the array and returns the new length.
    *   **`pop()`:** Removes the *last* element from the array and returns that removed element.
    *   **`forEach((element, index) => { ... })`:** Executes a provided function once for each array element. It's useful for iterating when you don't need to create a new array. The callback function receives the current element and its index (optional).
    *   **`map()` and `filter()` (Mentioned):** These are extremely common and powerful functional methods. `map` creates a *new* array by applying a function to each element, while `filter` creates a *new* array containing only elements that satisfy a condition. These will be explored further.
7.  **Mutability:** Methods like `push` and `pop` *modify* the original array directly (they are mutable). Methods like `map` and `filter` typically return *new* arrays, leaving the original unchanged (immutable pattern). Understanding mutability is important, especially in frameworks like React.

---
<!-- Presenter notes for Context slide -->
<!-- Native Devs: Objects are like Dictionaries/Maps/Structs. Arrays are like Lists/Arrays. JS methods (`map`, `filter`) are similar to functional concepts in Swift/Kotlin/Java Streams. Web Devs: Standard JS. Emphasize TS interfaces/types for structure. -->

## Context for Developers

> **Native Dev Context:** (For Android/iOS Developers)
> JavaScript objects are analogous to Dictionaries (`Map` in Java/Kotlin, `Dictionary` in Swift) or simple data structures (`struct` in Swift, data classes in Kotlin, or simple classes in Java). They provide flexible key-value storage. JavaScript arrays are similar to dynamic arrays or lists (`ArrayList` in Java, `MutableList` in Kotlin, `Array` in Swift). Key differences include JavaScript's dynamic typing (mitigated by TypeScript interfaces/types) and the rich set of built-in array methods (`forEach`, `map`, `filter`, `reduce`, etc.), which mirror functional programming concepts found in Swift's collection APIs, Kotlin's extension functions, and Java Streams.

> **Web Dev Context:** (For React/Angular/Vue Developers)
> Objects and Arrays are fundamental JavaScript structures you use constantly. TypeScript enhances this by allowing you to define clear `interface` or `type` definitions for your objects (like API responses, component props, state) and strongly type your arrays (`string[]`, `User[]`, etc.). This significantly improves code reliability and maintainability compared to plain JavaScript. You're likely familiar with methods like `map` (essential for rendering lists in React), `filter`, and `forEach`.

---
<!-- Presenter notes for Summary slide -->
<!-- Recap: Objects (key-value, `{}`), Arrays (ordered list, `[]`, zero-indexed), access methods (dot/bracket, index), TS typing (interface, `Type[]`), common methods (`push`, `pop`, `forEach`). -->

## Summary

In this lesson, we explored JavaScript's core data structures for grouping data:

-   **Objects:** Store data as key-value pairs using `{}`. Accessed via dot (`.`) or bracket (`[]`) notation. TypeScript interfaces/types define their shape.
-   **Arrays:** Store ordered lists of values using `[]`. Accessed via zero-based index (`[0]`). TypeScript defines the element type (`string[]`, `MyObject[]`).
-   **Common Methods:** Arrays come with useful methods like `.length`, `.push()`, `.pop()`, `.forEach()`, `.map()`, and `.filter()` for manipulation and iteration.

---
<!-- Presenter notes for Next Steps slide -->
<!-- Point to ES6+ features. Encourage creating simple objects/arrays and practicing access/methods. -->

## Next Steps

Practice creating objects to represent real-world things (like a prescription with properties) and arrays to hold lists (like patient names). Experiment with accessing elements/properties and using basic array methods like `push` and `forEach`.

Proceed to **Lesson 05: ES6+ Features** to learn about more modern JavaScript syntax enhancements relevant to objects and arrays.

**Further Reading:**
-   [MDN: Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
-   [MDN: Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
-   [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
-   [TypeScript Handbook: More on Functions (Array methods often use function callbacks)](https://www.typescriptlang.org/docs/handbook/2/functions.html)