---
marp: true
theme: custom-theme
paginate: true
header: 'Module 04: JavaScript Essentials - Lesson 01: Variables, Data Types, and Operators'
footer: 'React Native Training'
---
<!-- Presenter notes for Title slide -->
<!-- Introduce the fundamental building blocks: variables for storing data, types for classifying data, and operators for manipulating data. Emphasize that while JS is dynamically typed, we'll use TypeScript for safety. -->

<!-- _class: lead -->
# Lesson 01: Variables, Data Types, and Operators

Understanding how to store, classify, and manipulate data is fundamental to programming.

---
<!-- Presenter notes for Learning Objectives slide -->
<!-- Briefly go over each objective. Highlight the importance of `let` vs `const` and the role of TypeScript types. -->

## Learning Objectives

By the end of this lesson, you will be able to:

-   Declare variables using `let` and `const`.
-   Identify and use common JavaScript primitive data types.
-   Understand basic TypeScript type annotations and type inference.
-   Utilize common operators for calculations, comparisons, and logic.

---
<!-- Presenter notes for Introduction slide -->
<!-- Explain that variables are like labeled containers. Mention JavaScript's dynamic typing history and why TypeScript is preferred in modern development, especially with React Native, for preventing type-related errors. -->

## Introduction

Variables are named containers for storing data values. JavaScript provides several ways to declare variables and handles different types of data. While JavaScript is dynamically typed (meaning variable types aren't fixed at declaration), we will use **TypeScript** throughout this course to add static typing, making our code safer and easier to understand, especially in larger applications like those built with React Native.

---
<!-- Presenter notes for Variables slide -->
<!-- Explain `let` for variables that might change and `const` for constants (preferred default). Show simple examples. Mention hoisting briefly but advise against relying on `var`. -->

## Declaring Variables: `let` and `const`

In modern JavaScript (and TypeScript), we primarily use `let` and `const` to declare variables.

-   **`let`**: Declares a block-scoped variable that can be reassigned later.
-   **`const`**: Declares a block-scoped variable whose value **cannot** be reassigned after initialization. It's generally preferred for variables that shouldn't change, improving code predictability.

> **Important:** Avoid using the older `var` keyword due to its function-scoping rules, which can lead to unexpected behavior. Stick to `let` and `const`.

---
<!-- Presenter notes for Variables Example slide -->
<!-- Walk through the code. Explain type inference (`medicationName` inferred as string) and explicit annotation (`dosageMg: number`). Emphasize the error when trying to reassign `patientId`. -->

## Variables Example (TypeScript)

```typescript
// Using let for a value that might change
let currentStockLevel: number = 50;
currentStockLevel = 45; // OK

// Using const for values that shouldn't change
const medicationName = "Amoxicillin"; // Type 'string' inferred by TypeScript
const dosageMg: number = 500; // Explicit type annotation
const isRefillable: boolean = true; // Type 'boolean' inferred
const patientId = "P12345"; // Type 'string' inferred

// Attempting to reassign a const variable results in an error:
// patientId = "P67890"; // Error: Cannot assign to 'patientId' because it is a constant.

console.log(`Medication: ${medicationName}, Dosage: ${dosageMg}mg`);
console.log(`Current Stock: ${currentStockLevel}, Refillable: ${isRefillable}`);
```
**(Copy button available in top-right corner)**

**Explanation:**

This code demonstrates variable declaration using `let` and `const` within a TypeScript context.

1.  **Purpose:** The primary goal is to show how to store different kinds of pharmacy-related information (stock level, medication details, patient ID) using variables and how TypeScript helps manage their types.
2.  **`let` vs. `const`:** `currentStockLevel` is declared with `let` because the stock level is expected to change over time. It's initialized to `50` and later successfully reassigned to `45`. In contrast, `medicationName`, `dosageMg`, `isRefillable`, and `patientId` are declared with `const` because these values are assumed to be fixed for this specific context (e.g., a particular prescription record). Attempting to reassign `patientId` correctly triggers a compile-time error from TypeScript, preventing accidental modification of constant values. This use of `const` by default enhances code safety and readability.
3.  **TypeScript Integration:** TypeScript's features are highlighted. For `currentStockLevel`, `dosageMg`, and `isRefillable`, we see explicit type annotations (`: number`, `: boolean`). This clearly defines the expected data type for the variable. For `medicationName` and `patientId`, TypeScript uses *type inference*. Since they are initialized with string literals, TypeScript automatically infers their type as `string` without needing an explicit annotation. This combination of explicit annotation and inference provides flexibility while maintaining type safety.
4.  **Block Scoping:** Although not explicitly shown changing scope here, `let` and `const` are block-scoped, meaning they are only accessible within the block (e.g., function, loop, `{}`) where they are defined. This prevents issues common with `var`'s function scoping.
5.  **Console Output:** The `console.log` statements demonstrate how to access and use the variable values, embedding them within template literals (backticks `` `${}` ``) for easy string formatting.

---
<!-- Presenter notes for Data Types slide -->
<!-- List the main primitive types. Briefly explain each one. Mention that objects/arrays are non-primitive and will be covered later. -->

## Primitive Data Types

JavaScript (and TypeScript) has several fundamental data types, known as primitives:

-   **`string`**: Represents textual data (e.g., `"Lisinopril"`, `'Take one tablet daily'`).
-   **`number`**: Represents numeric values, including integers and floating-point numbers (e.g., `100`, `12.5`, `NaN`, `Infinity`).
-   **`boolean`**: Represents logical values: `true` or `false`.
-   **`null`**: Represents the intentional absence of any object value. It's a value assigned explicitly.
-   **`undefined`**: Represents a variable that has been declared but not yet assigned a value.
-   **`symbol`** (ES6): Represents a unique and immutable identifier. Often used for object property keys.
-   **`bigint`** (ES2020): Represents integers with arbitrary precision (larger than `number` can safely handle).

> **Note:** Objects (including arrays and functions) are non-primitive types and will be covered in later lessons.

---
<!-- Presenter notes for Type Annotations slide -->
<!-- Explain *why* we use type annotations in TS - clarity, error prevention. Show basic syntax. Explain type inference as TS's way of helping out when types are obvious. -->

## TypeScript: Type Annotations & Inference

TypeScript enhances JavaScript by allowing you to specify types for variables, function parameters, and return values.

-   **Type Annotation:** Explicitly telling TypeScript the intended type using `: TypeName`.
  ```typescript
  let medicationId: string;
  medicationId = "M987"; // OK
  // medicationId = 987; // Error: Type 'number' is not assignable to type 'string'.
  ```
-   **Type Inference:** TypeScript can often figure out the type automatically based on the initial value assigned.
  ```typescript
  let quantity = 30; // TypeScript infers 'number'
  // quantity = "Thirty"; // Error: Type 'string' is not assignable to type 'number'.
  ```

Using types helps catch errors during development *before* your code runs.

---
<!-- Presenter notes for Operators slide -->
<!-- Introduce the categories: Arithmetic, Assignment, Comparison, Logical. Give simple examples for each. -->

## Operators

Operators are special symbols used to perform operations on values (operands).

-   **Arithmetic:** Perform mathematical calculations.
    `+` (Addition), `-` (Subtraction), `*` (Multiplication), `/` (Division), `%` (Modulo - remainder)
-   **Assignment:** Assign values to variables.
    `=` (Assign), `+=` (Add and assign), `-=` (Subtract and assign), `*=`, `/=`, `%=`
-   **Comparison:** Compare two values.
    `==` (Equal value), `===` (Equal value and type - **preferred**), `!=` (Not equal value), `!==` (Not equal value or type - **preferred**), `>`, `<`, `>=`, `<=`
-   **Logical:** Combine or invert boolean values.
    `&&` (Logical AND), `||` (Logical OR), `!` (Logical NOT)

---
<!-- Presenter notes for Operators Example slide -->
<!-- Walk through the examples. Emphasize `===` vs `==`. Explain short-circuiting for `&&` and `||`. -->

## Operators Example (TypeScript)

```typescript
let initialTablets: number = 90;
let tabletsPerDose: number = 2;
let dosesPerDay: number = 3;

// Arithmetic
let dailyIntake: number = tabletsPerDose * dosesPerDay; // 6
let remainingTablets: number = initialTablets - dailyIntake; // 84

// Assignment
remainingTablets -= dailyIntake; // remainingTablets = remainingTablets - dailyIntake; (78)

// Comparison (using preferred strict equality/inequality)
let lowStockThreshold: number = 30;
let isLowStock: boolean = remainingTablets <= lowStockThreshold; // false (78 <= 30)
let needsRefillSoon: boolean = remainingTablets === 78; // true

console.log(`Daily Intake: ${dailyIntake}`);
console.log(`Remaining Tablets: ${remainingTablets}`);
console.log(`Is Low Stock? ${isLowStock}`);

// Logical
let hasValidPrescription: boolean = true;
let isPastExpiryDate: boolean = false;
let canDispense: boolean = hasValidPrescription && !isPastExpiryDate; // true && !false -> true && true -> true

console.log(`Can Dispense Medication? ${canDispense}`);
```
**(Copy button available in top-right corner)**

**Explanation:**

This snippet demonstrates various JavaScript operators within a TypeScript context, using a pharmacy scenario.

1.  **Purpose:** To illustrate how arithmetic, assignment, comparison, and logical operators are used to perform calculations and make decisions based on variable values.
2.  **Arithmetic Operators:** `*` (multiplication) is used to calculate `dailyIntake` by multiplying `tabletsPerDose` and `dosesPerDay`. `-` (subtraction) calculates the `remainingTablets` after the first day's intake.
3.  **Assignment Operators:** The compound assignment operator `-=` is used to update `remainingTablets` concisely. `remainingTablets -= dailyIntake` is shorthand for `remainingTablets = remainingTablets - dailyIntake`. This is common for incrementing, decrementing, or modifying variables based on their current value.
4.  **Comparison Operators:** `<=` (less than or equal to) checks if the `remainingTablets` are at or below the `lowStockThreshold`, resulting in the boolean `isLowStock`. The strict equality operator `===` checks if `remainingTablets` is exactly equal to `78` in both value and type, setting `needsRefillSoon`. Using strict equality (`===` and `!==`) is highly recommended over loose equality (`==` and `!=`) to avoid unexpected type coercion issues.
5.  **Logical Operators:** `&&` (logical AND) and `!` (logical NOT) are used to determine if medication `canDispense`. The condition `hasValidPrescription && !isPastExpiryDate` evaluates to `true` only if *both* `hasValidPrescription` is `true` AND `isPastExpiryDate` is `false` (because `!false` becomes `true`). Logical operators like `&&` and `||` exhibit short-circuiting behavior: if the result can be determined from the first operand (e.g., if `hasValidPrescription` was `false` in the `&&` expression), the second operand (`!isPastExpiryDate`) would not even be evaluated.
6.  **TypeScript:** Type annotations (`: number`, `: boolean`) ensure that variables hold the expected data types, preventing errors like attempting arithmetic operations on strings.

---
<!-- Presenter notes for Callouts slide -->
<!-- Explain how these concepts relate to other languages. Native devs: Similar primitives, but JS number type is different, strict equality is key. Web devs: Very similar, but emphasize TS benefits over plain JS. -->

## Context for Developers

> **Native Dev Context:** (For Android/iOS Developers)
> JavaScript's primitive types are similar to those in Kotlin/Java/Swift (`String`, `Int`, `Float`, `Double`, `Boolean`). However, JavaScript traditionally only had one `number` type for both integers and floats (until `bigint`). Be mindful of `null` vs `undefined`. The strict equality (`===`) is crucial and differs from Java's `==` for objects or Swift's `==` which can be overloaded. `let`/`const` are similar to `var`/`let` in Swift or `var`/`val` in Kotlin regarding mutability.

> **Web Dev Context:** (For React/Angular/Vue Developers)
> If you've used JavaScript before, `let` and `const` are standard ES6 features. The primitive types are identical. The main addition here is **TypeScript**. While you *can* write React Native in plain JavaScript, using TypeScript for type annotations (`: number`, `: string`) and leveraging its type inference significantly reduces runtime errors, improves code maintainability, and enhances developer tooling (autocompletion, refactoring). Strongly typing is a best practice in modern React/React Native development.

---
<!-- Presenter notes for Summary slide -->
<!-- Quickly recap the key terms: let/const, primitive types, type annotations/inference, operator categories. -->

## Summary

In this lesson, we covered the fundamentals of storing and manipulating data in JavaScript/TypeScript:

-   Variables are declared using `let` (reassignable) and `const` (constant).
-   Core primitive data types include `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`.
-   TypeScript adds optional static typing via annotations (`: Type`) and type inference.
-   Operators allow performing arithmetic, assignment, comparison, and logical operations.

---
<!-- Presenter notes for Next Steps slide -->
<!-- Point to the next lesson on control flow. Encourage experimentation with the concepts learned. Provide links. -->

## Next Steps

Understanding these basics is crucial before moving on. Experiment with declaring variables, different types, and operators.

Proceed to **Lesson 02: Control Flow** to learn how to make decisions and repeat actions in your code.

**Further Reading:**
-   [MDN: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
-   [MDN: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
-   [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)