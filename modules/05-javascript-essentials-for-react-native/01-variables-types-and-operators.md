## Section 1: Variables, Data Types, and Operators (ES6+ Focus: let, const)

Welcome to the practical world of JavaScript! Variables, data types, and operators are the absolute fundamentals, the atoms of the language. Think of variables as labeled containers for information, data types as the kind of information a container can hold (like text, numbers, or true/false values), and operators as the tools you use to work with that information (like adding numbers or comparing values). Mastering these core concepts, especially the modern ES6+ approaches (`let` and `const`), is essential before building any React Native application, including our SpeedyMeds pharmacy app.

### Variable Declaration: `let`, `const`, and the legacy `var`

In JavaScript, variables are declared using specific keywords. Modern JavaScript (ES6 and later) introduced `let` and `const`, which offer significant improvements in predictability and safety compared to the older `var` keyword. Understanding their differences, particularly regarding scope and mutability, is crucial for writing robust code.

#### `let`

Use `let` when you need to declare a variable whose value might change later. `let` variables are **block-scoped**, meaning they are only accessible within the specific block of code (defined by curly braces `{}`) where they are declared. This includes `if` blocks, `for` loops, or even standalone blocks. If declared outside any function or block, `let` has global scope; if declared inside a function but outside a specific block, it has function scope.

Variables declared with `let` are *hoisted* (the engine knows about them before executing the declaration line) but are **not initialized** during hoisting. They exist in a "Temporal Dead Zone" (TDZ) from the start of their block until the declaration line. Accessing them in the TDZ throws a `ReferenceError`, encouraging declaration before use.

```javascript
// Example: Managing patient queue size using let

let patientQueueSize = 10; // Initial queue size, declared in the outer scope

console.log(`Initial queue size: ${patientQueueSize}`); // Output: Initial queue size: 10

if (patientQueueSize > 5) {
  // This block creates its own scope for 'notificationMessage'
  let notificationMessage = "High patient volume alert!";
  console.log(notificationMessage); // Output: High patient volume alert!

  // Reassigning 'patientQueueSize' is allowed because it's declared with 'let'
  // It's accessible here as it was declared in an outer scope.
  patientQueueSize = 15;
  console.log(`Queue size updated inside block: ${patientQueueSize}`); // Output: Queue size updated inside block: 15

  let blockScopedVar = "Only visible here";
  console.log(blockScopedVar); // Output: Only visible here
}

// Trying to access 'notificationMessage' or 'blockScopedVar' outside their block scope results in an error
// console.log(notificationMessage); // ReferenceError: notificationMessage is not defined
// console.log(blockScopedVar);      // ReferenceError: blockScopedVar is not defined

// 'patientQueueSize' is accessible here because it was declared in the outer scope
console.log(`Final queue size: ${patientQueueSize}`); // Output: Final queue size: 15

// Example of Temporal Dead Zone (TDZ)
try {
  // console.log(nextPatientId); // This would throw ReferenceError: Cannot access 'nextPatientId' before initialization
  let nextPatientId = "P124";
  console.log(`Next patient ID: ${nextPatientId}`); // Output: Next patient ID: P124
} catch (e) {
  console.error("TDZ Error demonstration:", e.message);
}
```

This example clearly demonstrates the block-scoping nature of `let`. The `notificationMessage` and `blockScopedVar` variables are strictly confined to the `if` block where they were defined. Attempting to access them outside this block results in a `ReferenceError`, preventing accidental variable leakage which could happen with `var`. In contrast, `patientQueueSize`, declared in the outer scope, remains accessible both inside and outside the `if` block. Its value can be updated within the block because `let` variables are mutable (their value can be reassigned). The Temporal Dead Zone (TDZ) concept is also illustrated; uncommenting the `console.log(nextPatientId)` line before the `let` declaration would cause a `ReferenceError` because the variable, while hoisted, is not initialized until the `let` statement is executed. This behavior prevents bugs arising from using a variable before it's properly declared and assigned a value. Understanding block scope and TDZ is fundamental for writing predictable and maintainable JavaScript code, especially as applications grow in complexity.

#### `const`

Use `const` (short for constant) when you declare a variable whose value should **not** be reassigned after it's initialized. Like `let`, `const` variables are **block-scoped** and exist in the **Temporal Dead Zone (TDZ)** until declared.

The defining feature of `const` is that it creates an **immutable binding**. This means the variable identifier cannot be reassigned to a new value. You *must* initialize a `const` variable when you declare it.

> **IMPORTANT**
> `const` does **not** make the *value* itself immutable if the value is an object or an array. It only prevents the variable from being reassigned to a *different* object or array. You can still modify the properties of a `const` object or the elements of a `const` array.

```javascript
// Example: Defining constant configuration values and patient records

// Defining a configuration value that shouldn't change
const MAX_CONCURRENT_REQUESTS = 5;
console.log(`Maximum concurrent requests allowed: ${MAX_CONCURRENT_REQUESTS}`);

// Attempting to reassign MAX_CONCURRENT_REQUESTS will cause a TypeError
// MAX_CONCURRENT_REQUESTS = 10; // TypeError: Assignment to constant variable.

// Example: const with an object (pharmacy details)
const pharmacyDetails = {
  name: "SpeedyMeds Central",
  city: "Healthville",
  contact: {
    phone: "555-1234",
    email: "info@speedymeds.com"
  },
  operationalHours: { open: "08:00", close: "20:00" }
};

// Modifying a property of the const object IS allowed
pharmacyDetails.city = "Wellnesstown";
console.log(`Pharmacy city updated to: ${pharmacyDetails.city}`); // Output: Wellnesstown

// Modifying a nested property is also allowed
pharmacyDetails.contact.email = "support@speedymeds.com";
console.log(`Contact email updated to: ${pharmacyDetails.contact.email}`); // Output: support@speedymeds.com

// Attempting to reassign the entire object IS NOT allowed
// pharmacyDetails = { name: "QuickMeds" }; // TypeError: Assignment to constant variable.

// Example: const requires initialization
// const API_KEY; // SyntaxError: Missing initializer in const declaration
const API_ENDPOINT = "/api/v1/medications";
console.log(`API Endpoint: ${API_ENDPOINT}`);

// Example: const with an array
const CRITICAL_MEDICATIONS = ["Warfarin", "Insulin", "Epinephrine"];
console.log("Initial critical medications:", CRITICAL_MEDICATIONS);

// Modifying the contents of the const array IS allowed
CRITICAL_MEDICATIONS.push("Digoxin"); // Add an item
CRITICAL_MEDICATIONS[0] = "Heparin";   // Change an item
console.log("Updated critical medications:", CRITICAL_MEDICATIONS);
// Output: Updated critical medications: [ 'Heparin', 'Insulin', 'Epinephrine', 'Digoxin' ]

// Attempting to reassign the entire array IS NOT allowed
// CRITICAL_MEDICATIONS = ["Aspirin"]; // TypeError: Assignment to constant variable.
```

This example highlights the core behavior of `const`. `MAX_CONCURRENT_REQUESTS` is a primitive value (a number), and its value cannot be changed after declaration. The `pharmacyDetails` object and `CRITICAL_MEDICATIONS` array, however, demonstrate the crucial nuance of `const` with mutable types. Although declared with `const`, preventing reassignment of the `pharmacyDetails` or `CRITICAL_MEDICATIONS` variables themselves, their *internal content* can be freely modified. We successfully changed the `city` and `contact.email` properties of the object and added/modified elements in the array. This immutability applies only to the variable's *binding* to its initial value, not necessarily the value's internal state if it's an object or array. Understanding this distinction is vital for preventing misconceptions about `const` guaranteeing full immutability. It ensures data structures remain referenced consistently while allowing their contents to evolve as needed. Finally, the example shows that `const` declarations always require an initial value, unlike `let`.

#### `var` (Legacy - Avoid)

`var` is the older way to declare variables. It differs significantly from `let` and `const`:

1.  **Scope:** `var` has **function scope** or global scope, but **not block scope**. A `var` declared inside an `if` or `for` block is accessible throughout the entire function containing that block.
2.  **Hoisting:** `var` variables are hoisted and initialized with `undefined`. This means you can access a `var` variable before its declaration line without an error, but its value will be `undefined`.

> **IMPORTANT**
> Due to its non-block scoping and hoisting behavior (which can lead to confusing bugs and less predictable code), **avoid using `var` in modern JavaScript development**. Always prefer `let` for variables that need reassignment and `const` for variables that should not be reassigned.

Table: `let` vs. `const` vs. `var` Comparison

| Feature          | `let`                                | `const`                              | `var`                                |
| :--------------- | :----------------------------------- | :----------------------------------- | :----------------------------------- |
| **Scope**        | Block (`{}`)                         | Block (`{}`)                         | Function or Global                   |
| **Hoisting**     | Hoisted, but not initialized (TDZ) | Hoisted, but not initialized (TDZ) | Hoisted, initialized to `undefined`  |
| **Reassignment** | Allowed (mutable)                  | **Not** allowed (immutable binding)  | Allowed (mutable)                  |
| **Initialization**| Optional                             | **Required** at declaration          | Optional                             |
| **Redeclaration** | **Not** allowed in same scope      | **Not** allowed in same scope      | Allowed (can cause issues)         |

> **Background Bridge:** (Native Developers - Java/Kotlin/Swift)
> **Comparison:** JavaScript's `let` and `const` introduce block scoping (`{}`), which feels familiar to variable scope within blocks in Java, Kotlin (`val`/`var`), and Swift (`let`/`var`). However, remember that JavaScript is **dynamically typed**. You declare variables with `let` or `const` without specifying their type (e.g., `let count = 10;` instead of Java's `int count = 10;` or Swift's `let count: Int = 10;`). The type is inferred from the assigned value and can technically change for `let` variables (though this is often discouraged). The `const` keyword prevents reassignment of the variable, similar to `final` in Java or `val` in Kotlin / `let` in Swift. A key difference is that `const` in JavaScript does **not** make objects or arrays immutable; you can still modify the properties of a `const` object or the elements of a `const` array. This contrasts with Swift, where value types (structs, enums) declared with `let` are truly immutable, or Kotlin `val` with immutable collections. The older `var` keyword has function scope, which is less common in modern native languages and can be a source of confusion.
> **Key Takeaway:** Embrace block scope with `let` and `const` as it aligns with your expectations. Use `let` for variables that will change value, and `const` for variables that won't be reassigned (the common case). Critically, remember that `const` does not guarantee immutability for object/array *contents*, only for the variable *binding* itself. Be mindful of JavaScript's dynamic typing.

### Data Types

JavaScript variables can hold different types of data. JavaScript is **dynamically typed**, meaning you don't explicitly declare the type of a variable. The type is determined automatically based on the value assigned, and a variable can hold different types over its lifetime.

```javascript
// Example of Dynamic Typing
let medicationStatus = "Active"; // medicationStatus is inferred as a string
console.log(`Status: ${medicationStatus}, Type: ${typeof medicationStatus}`); // Output: Status: Active, Type: string

medicationStatus = 5; // Now assigned a number, type changes
console.log(`Status: ${medicationStatus}, Type: ${typeof medicationStatus}`); // Output: Status: 5, Type: number

medicationStatus = true; // Now assigned a boolean
console.log(`Status: ${medicationStatus}, Type: ${typeof medicationStatus}`); // Output: Status: true, Type: boolean
```

This dynamic typing offers flexibility but means type errors (like trying to use a string method on a number) are only caught at runtime. This makes careful coding and testing important, and it's a key reason why TypeScript (covered in Module 6) is highly beneficial for larger React Native projects, as it adds a layer of static type checking during development.

> **IMPORTANT**
> While JavaScript's dynamic typing offers flexibility, it can also lead to runtime errors if you're not careful about the type of data a variable holds at any given time. Tools like TypeScript are often used in production React Native development to mitigate these risks by adding static type checking.

JavaScript has two main categories of types: Primitives and Objects.

#### Primitive Types

Primitives are the most basic data types. They are **immutable**, meaning their actual value cannot be changed once created. Operations that appear to modify a primitive (like converting a string to uppercase) actually create and return a *new* primitive value, leaving the original unchanged.

1.  **`string`**: Represents textual data. Enclosed in single quotes (`'...'`), double quotes (`"..."`), or backticks (`` `...` `` - template literals, which allow embedded expressions like `${variable}`).
    ```javascript
    const drugName = "Lisinopril";
    const instructions = 'Take 1 tablet daily.';
    const patientId = "P987";
    const logEntry = `Processing prescription for patient ${patientId}.`;
    console.log(logEntry); // Output: Processing prescription for patient P987.
    ```

2.  **`number`**: Represents both integer and floating-point numbers (using 64-bit IEEE 754 format). Includes special values `Infinity`, `-Infinity`, and `NaN` (Not-a-Number, often results from invalid math operations like `0/0`).
    ```javascript
    const dosage = 10; // Integer
    const price = 25.99; // Floating-point
    const invalidCalculation = 0 / 0; // NaN
    console.log(`Dosage: ${dosage}, Price: ${price}, Invalid: ${invalidCalculation}`);
    ```

3.  **`bigint`**: Represents whole numbers larger than the maximum safe integer that `number` can accurately represent (2<sup>53</sup> - 1). Created by appending `n` to an integer literal. Useful for very large IDs or calculations.
    ```javascript
    const veryLargeId = 9007199254740991n;
    const anotherLargeId = veryLargeId + 1n; // Operations require both operands to be BigInts
    console.log(anotherLargeId); // Output: 9007199254740992n
    ```

4.  **`boolean`**: Represents logical values: `true` or `false`. Essential for conditional logic.
    ```javascript
    const isPrescriptionActive = true;
    const requiresSignature = false;
    ```

5.  **`undefined`**: Represents a variable that has been declared but has not yet been assigned a value. Also the default return value of functions that don't explicitly return anything.
    ```javascript
    let patientNotes;
    console.log(patientNotes); // Output: undefined
    ```

6.  **`null`**: Represents the intentional absence of any object value. It's often explicitly assigned to indicate that a variable should contain "no value" or "no object". Note: `typeof null` strangely returns `"object"`, a historical quirk.
    ```javascript
    let selectedPatient = null; // Intentionally no patient selected yet
    console.log(selectedPatient); // Output: null
    console.log(typeof selectedPatient); // Output: object (historical quirk)
    ```

7.  **`symbol`**: Represents a unique and immutable identifier. Often used as keys for object properties to avoid naming conflicts.
    ```javascript
    const uniqueLogId = Symbol('transactionId');
    const logData = {
      [uniqueLogId]: "TXN12345", // Using symbol as a key
      message: "Prescription filled"
    };
    console.log(logData[uniqueLogId]); // Output: TXN12345
    ```

**Immutability Example:**

```javascript
let medication = "Ibuprofen";
let upperMedication = medication.toUpperCase(); // Creates a NEW string "IBUPROFEN"

console.log(medication);      // Output: "Ibuprofen" (Original string is unchanged)
console.log(upperMedication); // Output: "IBUPROFEN" (New string was created)
```
The `toUpperCase()` method doesn't alter the original `medication` string. It returns a new string which is then assigned to `upperMedication`. This demonstrates the immutability of primitives.

#### Object Type

Anything in JavaScript that is not a primitive is an **Object**. Objects are collections of key-value pairs (properties). Keys are typically strings (or Symbols), and values can be any data type, including other objects or functions (which are called methods when associated with an object).

Unlike primitives, objects are **mutable**. Their properties can be changed after the object is created. Arrays and Functions are specialized types of objects in JavaScript.

```javascript
// Object Literal
const patientRecord = {
  id: "P456",
  name: "Bob Smith",
  status: "Active"
};

// Array (Specialized Object)
const allergies = ["Penicillin", "Sulfa"];

// Function (Specialized Object)
function checkAllergies(patient, medication) {
  // ... allergy checking logic ...
  console.log(`Checking ${patient.name} for allergy to ${medication}`);
}

// Mutability Example: Modifying an object
console.log("Original status:", patientRecord.status); // Output: Active
patientRecord.status = "Discharged"; // Modifies the EXISTING object directly
console.log("Updated status:", patientRecord.status); // Output: Discharged

// Mutability Example: Modifying an array
console.log("Original allergies:", allergies); // Output: [ 'Penicillin', 'Sulfa' ]
allergies.push("Aspirin"); // Modifies the EXISTING array directly
console.log("Updated allergies:", allergies); // Output: [ 'Penicillin', 'Sulfa', 'Aspirin' ]
```
In this example, we directly change the `status` property of the `patientRecord` object and add an element to the `allergies` array. This is possible because objects (including arrays) are mutable reference types. The `patientRecord` variable holds a reference to the object in memory, and modifications happen to that object directly.

Table: JavaScript Primitive Data Types Summary

| Type Name     | Description                                                         | Example                       | Mutable? |
| :------------ | :------------------------------------------------------------------ | :---------------------------- | :------- |
| `string`      | Represents textual data                                             | `"Warfarin"`, `'Patient'`     | No       |
| `number`      | Represents numeric values (integer, float), `NaN`, `Infinity`       | `100`, `12.5`, `NaN`          | No       |
| `bigint`      | Represents integers larger than the safe range of `number`          | `12345678901234567890n`       | No       |
| `boolean`     | Represents logical values: `true` or `false`                      | `true`, `false`             | No       |
| `undefined`   | Represents a variable that has not been assigned a value            | `let x;` (value of `x`)       | No       |
| `null`        | Represents the intentional absence of any object value            | `null`                        | No       |
| `symbol`      | Represents unique, immutable identifiers for object property keys | `Symbol('uniqueId')`          | No       |
| **Object**    | Collection of properties (key-value pairs), includes Arrays, Functions | `{ key: 'value' }`, `[1, 2]` | **Yes**  |

> **Background Bridge:** (Native Developers - Java/Kotlin/Swift)
> **Comparison:** JavaScript's dynamic typing is a major departure from the static typing in Java/Kotlin/Swift. Variables don't have a fixed type declared; their type depends on the value they hold. You won't get compile-time type errors. JavaScript's `number` type handles both integers and floats using a single 64-bit representation, unlike the distinct `int`/`long`/`float`/`double` in native languages. The distinction between `undefined` (unassigned) and `null` (assigned no value) is unique to JavaScript. Primitive types (`string`, `number`, `boolean`, etc.) are **immutable**, similar to primitives in Java or **value types** (like `struct`, `enum`) in Swift/Kotlin. Objects (`Object`, `Array`, `Function`) are **mutable reference types**, behaving similarly to class instances or reference types in native languages.
> **Key Takeaway:** Prepare for the flexibility and potential pitfalls of dynamic typing; runtime type checks (`typeof`, `instanceof`) might be needed. Understand the single `number` type and the nuances of `null` vs. `undefined`. Critically, remember the distinction: primitives are immutable (operations create new values), while objects/arrays are mutable (operations can change the object directly). This impacts how you manage state and data updates.

### Operators

Operators are special symbols used to perform operations on values (operands). JavaScript has a wide range of operators for various tasks.

#### Assignment Operators

Assign values to variables. The basic operator is `=`, but compound operators provide shorthand for common operations.

-   `=` : Basic assignment. `x = 5;`
-   `+=` : Addition assignment. `x += 2;` (equivalent to `x = x + 2;`)
-   `-=` : Subtraction assignment. `x -= 2;`
-   `*=` : Multiplication assignment. `x *= 2;`
-   `/=` : Division assignment. `x /= 2;`
-   `%=` : Remainder assignment. `x %= 2;`
-   `**=` : Exponentiation assignment. `x **= 2;` (`x = x ** 2;`)

```javascript
let currentStock = 100;
let itemsSold = 25;
currentStock -= itemsSold; // currentStock is now 75
console.log(`Stock after sale: ${currentStock}`);

let totalPrice = 50;
const taxRate = 0.1;
totalPrice *= (1 + taxRate); // Add tax. totalPrice is now 55
console.log(`Total price with tax: ${totalPrice.toFixed(2)}`);
```

#### Comparison Operators

Compare two values and return a boolean (`true` or `false`).

-   **Strict Equality (`===`) and Inequality (`!==`)**: Compare both value and type **without** type coercion. This is the **recommended** way to check equality.
-   **Loose Equality (`==`) and Inequality (`!=`)**: Compare values **after** performing type coercion. This can lead to unexpected results (e.g., `0 == false` is `true`). Avoid unless you have a specific reason and understand the coercion rules deeply.
-   **Relational Operators**: `>` (Greater than), `<` (Less than), `>=` (Greater than or equal to), `<=` (Less than or equal to). Compare magnitude numerically or lexicographically (alphabetically for strings).

```javascript
const requiredDosageMg = 10;
let patientAdministeredDosage = "10"; // String value

// Loose equality (Avoid)
console.log(`Loose (==): ${patientAdministeredDosage == requiredDosageMg}`); // Output: true (string "10" coerced to number 10)

// Strict equality (Recommended)
console.log(`Strict (===): ${patientAdministeredDosage === requiredDosageMg}`); // Output: false (string !== number)

const minimumStockLevel = 20;
let currentInventory = 15;
console.log(`Is stock low? ${currentInventory < minimumStockLevel}`); // Output: true
```

> **IMPORTANT**
> Always prefer strict equality (`===`) and strict inequality (`!==`) over loose equality (`==`, `!=`). Strict comparison prevents bugs caused by unexpected automatic type conversions.

#### Arithmetic Operators

Perform mathematical calculations.

-   `+` : Addition (also used for string concatenation)
-   `-` : Subtraction
-   `*` : Multiplication
-   `/` : Division
-   `%` : Remainder (Modulo)
-   `**` : Exponentiation (ES2016)
-   `++` : Increment (increases by 1, prefix `++x` or postfix `x++`)
-   `--` : Decrement (decreases by 1, prefix `--x` or postfix `x--`)
-   Unary `+` : Tries to convert operand to a number. `+"5"` becomes `5`.
-   Unary `-` : Negates the operand. `-5`.

```javascript
let quantity = 2;
const pricePerUnit = 15.50;
let subTotal = quantity * pricePerUnit; // 31.00

console.log(`Subtotal: ${subTotal}`);
console.log(`Postfix Increment: ${quantity++}`); // Output: 2 (returns original value, then increments quantity to 3)
console.log(`Quantity after postfix: ${quantity}`); // Output: 3
console.log(`Prefix Increment: ${++quantity}`); // Output: 4 (increments quantity to 4, then returns new value)

let boxes = 100;
let itemsPerBox = 12;
let remainingItems = boxes % itemsPerBox; // 100 % 12 = 4
console.log(`Remaining items: ${remainingItems}`);

console.log(`String to number: ${+"50"} + ${+true}`); // Output: 51 (true becomes 1)
```

#### Logical Operators

Combine boolean expressions. They use short-circuiting evaluation.

-   `&&` (Logical AND): Returns the first falsy operand, or the last operand if all are truthy. Short-circuits: if the first operand is falsy, the second is not evaluated.
-   `||` (Logical OR): Returns the first truthy operand, or the last operand if all are falsy. Short-circuits: if the first operand is truthy, the second is not evaluated.
-   `!` (Logical NOT): Reverses the boolean value of its operand (`!true` is `false`, `!false` is `true`).

```javascript
const hasValidPrescription = true;
const isMedicationInStock = false;
const canDispense = hasValidPrescription && isMedicationInStock; // false (AND requires both to be true)
console.log(`Can dispense? ${canDispense}`);

const isUrgent = true;
const requiresConsult = false;
const needsAttention = isUrgent || requiresConsult; // true (OR requires at least one to be true)
console.log(`Needs attention? ${needsAttention}`);

console.log(`Not urgent: ${!isUrgent}`); // Output: false
```

#### Nullish Coalescing Operator (`??`) (ES2020)

Returns the right-hand operand **only if** the left-hand operand is `null` or `undefined`. Unlike `||`, it does **not** short-circuit on other falsy values like `0`, `""`, or `false`. This makes it safer for providing default values when `0` or `""` are valid inputs.

```javascript
let patientAgeInput = 0; // 0 is a valid age, but falsy

// Using || would incorrectly provide the default
let displayAgeWithOR = patientAgeInput || 30; // Output: 30 (incorrect default)
console.log(`Display Age (using ||): ${displayAgeWithOR}`);

// Using ?? correctly preserves 0
let displayAgeWithNullish = patientAgeInput ?? 30; // Output: 0 (correctly uses 0)
console.log(`Display Age (using ??): ${displayAgeWithNullish}`);

let patientNotes = null;
let notesToDisplay = patientNotes ?? "No notes provided."; // Output: No notes provided.
console.log(`Notes: ${notesToDisplay}`);
```

#### Conditional (Ternary) Operator

A shorthand for `if/else`. Syntax: `condition ? valueIfTrue : valueIfFalse`.

```javascript
const stockLevel = 5;
const stockStatus = stockLevel > 0 ? "In Stock" : "Out of Stock";
console.log(`Medication Status: ${stockStatus}`); // Output: Medication Status: In Stock
```

#### `typeof` Operator

Returns a string indicating the type of the operand. Useful for basic type checking, but remember its quirks (e.g., `typeof null` is `"object"`).

```javascript
console.log(typeof 100);           // "number"
console.log(typeof "Paracetamol"); // "string"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof { name: "Rx" }); // "object"
console.log(typeof [1, 2]);        // "object" (Arrays are objects)
console.log(typeof null);          // "object" (Historical quirk)
console.log(typeof function(){}); // "function" (Functions are special objects)
```

#### Operator Precedence

Operators have a specific order of execution (e.g., multiplication `*` happens before addition `+`). Use parentheses `()` to explicitly control the order or to improve readability when combining multiple operators. Refer to the MDN documentation for the complete precedence table.

```javascript
let cost = 10 + 5 * 2; // Multiplication first: 10 + 10 = 20
let controlledCost = (10 + 5) * 2; // Parentheses first: 15 * 2 = 30
console.log(`Calculated Cost: ${cost}`); // Output: 20
console.log(`Controlled Cost: ${controlledCost}`); // Output: 30
```

Table: Common JavaScript Operators Summary

| Operator | Name                     | Example                       |
| :------- | :----------------------- | :---------------------------- |
| `=`      | Assignment               | `x = 5`                       |
| `+=`     | Addition Assignment      | `x += 2`                      |
| `===`    | Strict Equality          | `a === b`                     |
| `!==`    | Strict Inequality        | `a !== b`                     |
| `>`      | Greater Than             | `a > b`                       |
| `<`      | Less Than                | `a < b`                       |
| `>=`     | Greater Than or Equal To | `a >= b`                      |
| `<=`     | Less Than or Equal To    | `a <= b`                      |
| `&&`     | Logical AND              | `x && y`                      |
| `||`     | Logical OR               | ``x || y``                    |
| `!`      | Logical NOT              | `!x`                          |
| `??`     | Nullish Coalescing       | `a ?? b`                      |
| `++`     | Increment                | `++x` or `x++`                |
| `--`     | Decrement                | `--x` or `x--`                |
| `+`      | Addition / Unary Plus    | `a + b` or `+x`               |
| `-`      | Subtraction / Unary Negation | `a - b` or `-x`               |
| `*`      | Multiplication           | `a * b`                       |
| `/`      | Division                 | `a / b`                       |
| `%`      | Remainder                | `a % b`                       |
| `**`     | Exponentiation           | `a ** b`                      |
| `?:`     | Conditional (Ternary)    | `cond ? val1 : val2`          |
| `typeof` | Typeof                   | `typeof x`                    |

> **Official Documentation:**
> *   [MDN: Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
> *   [MDN: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
> *   [MDN: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
> *   [MDN: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
