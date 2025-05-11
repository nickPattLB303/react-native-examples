## Section 2: Control Flow (Conditionals, Loops)

Control flow statements dictate the order in which JavaScript code is executed. They enable programs to make decisions based on conditions and to repeat blocks of code, forming the fundamental logic of any application. This section covers the essential conditional statements and looping constructs available in JavaScript.

> 🛣️ **All Learners:** Conditional statements and loops are core programming concepts present in almost all languages. Focus on understanding the specific JavaScript syntax and the nuances like truthy/falsy values and the behavior of different loop types.

### Conditional Statements

Conditional statements allow a program to execute different blocks of code based on whether a specified condition evaluates to `true` or `false`.

#### `if` Statement

The most basic conditional statement. It executes a block of code if its condition is true (or "truthy").

-   Syntax: `if (condition) { /* block of code to execute if condition is true */ }`

#### `if...else` Statement

Provides an alternative block of code to execute if the `if` statement's condition is false (or "falsy").

-   Syntax: `if (condition) { /* block for true condition */ } else { /* block for false condition */ }`

#### `if...else if...else` Statement

Allows for testing a sequence of multiple conditions. The first condition that evaluates to `true` will have its associated block executed. If none of the conditions are true, the final `else` block (if present) is executed.

-   Syntax:
    ```javascript
    if (condition1) {
      // block 1
    } else if (condition2) {
      // block 2
    } else if (conditionN) {
      // block N
    } else {
      // final else block (optional)
    }
    ```

> [!TIP]
> It's good practice to always use block statements (`{}`) for the code to be executed within `if`, `else if`, and `else` clauses, even if it's a single line. This improves readability and prevents potential errors, especially when adding more lines later or with nested conditionals.

This example uses `if`, `else if`, and `else` to determine a medication's status based on its quantity in stock:

```javascript
const stockQuantity = 15;

if (stockQuantity === 0) {
  console.log("Medication is out of stock.");
} else if (stockQuantity < 10) {
  console.log("Medication is low in stock.");
} else {
  console.log("Medication is in stock.");
}
// Outputs: Medication is in stock.
```

#### Truthy and Falsy Values

In JavaScript, the condition in an `if` statement does not strictly need to be a Boolean value. Any value can be used as a condition, and JavaScript will implicitly convert it to a Boolean (a process called type coercion) to determine whether it's "truthy" or "falsy".

-   **Falsy Values:** These are values that coerce to `false` in a Boolean context. The complete list of falsy values in JavaScript is: `false`, `0`, `-0`, `0n` (BigInt zero), `""` (an empty string), `null`, `undefined`, and `NaN` (Not-a-Number).
-   **Truthy Values:** All other values in JavaScript are considered truthy. This includes any non-empty string, any non-zero number, all objects (including empty objects `{}` and empty arrays `[]`), all functions, and all symbols.

A solid understanding of truthy and falsy values is critical for writing concise and accurate conditional logic. Many programming errors stem from incorrect assumptions about how non-Boolean values are evaluated in conditions.

This table lists common truthy and falsy values (revisiting from Section 1):

Table 2.1: Truthy and Falsy Values in JavaScript

| Value         | Type      | Truthiness | Notes                                   |
| :------------ | :-------- | :--------- | :-------------------------------------- |
| `false`       | Boolean   | Falsy      |                                         |
| `0`           | Number    | Falsy      |                                         |
| `-0`          | Number    | Falsy      |                                         |
| `0n`          | BigInt    | Falsy      |                                         |
| `""`          | String    | Falsy      | Empty string                            |
| `null`        | Null      | Falsy      |                                         |
| `undefined`   | Undefined | Falsy      |                                         |
| `NaN`         | Number    | Falsy      | Not-a-Number                            |
| `true`        | Boolean   | Truthy     |                                         |
| `"hello"`     | String    | Truthy     | Non-empty string                        |
| `"0"`         | String    | Truthy     | Non-empty string (even if looks numeric)|
| `42`          | Number    | Truthy     | Non-zero number                         |
| `-42`         | Number    | Truthy     | Non-zero number                         |
| `{}`          | Object    | Truthy     | Any object, including empty object      |
| `[]`          | Object    | Truthy     | Any array, including empty array        |
| `function(){}`| Function  | Truthy     | Any function                            |

This example shows how truthy and falsy values behave in conditional statements:

```javascript
const patientName = ""; // Falsy value
const patientRecord = { id: "P456" }; // Truthy value (object)
let medicationCount = 0; // Falsy value

if (patientName) {
  console.log("Patient name is provided.");
} else {
  console.log("Patient name is missing."); // Outputs: Patient name is missing.
}

if (patientRecord) {
  console.log("Patient record exists."); // Outputs: Patient record exists.
}

if (medicationCount) {
  console.log("Medication count is greater than zero.");
} else {
  console.log("Medication count is zero or less."); // Outputs: Medication count is zero or less.
}
```

#### `switch` Statement

Provides an alternative to long `if...else if...else` chains when comparing a single expression against multiple possible constant values (cases).

-   Syntax:
    ```javascript
    switch (expression) {
      case value1:
        // statements executed if expression === value1
        break; // Exits the switch
      case value2:
        // statements executed if expression === value2
        break;
      //... more cases
      default: // Optional
        // statements executed if no case matches
    }
    ```

The expression is evaluated once. Its value is then compared with the value of each `case` clause using strict equality (`===`).

> [!CAUTION]
> The `break` statement is crucial within `switch` cases. If `break` is omitted, execution "falls through" to the statements of the next `case` block, regardless of whether that next case matches the expression. This fall-through behavior can be intentional for grouping cases that share code, but it's a common source of bugs if `break` is accidentally forgotten.

The `default` clause is optional and is executed if none of the case values match the expression's value.

This example uses a `switch` statement to handle different medication types:

```javascript
const medicationType = "Tablet";
let administrationMethod;

switch (medicationType) {
  case "Tablet":
  case "Capsule":
    administrationMethod = "Oral";
    break;
  case "Injection":
    administrationMethod = "Parenteral";
    break;
  case "Topical":
    administrationMethod = "Cutaneous";
    break;
  default:
    administrationMethod = "Unknown";
}
console.log(`Administration method: ${administrationMethod}`); // Outputs: Administration method: Oral
```

> 🌐 **Web Developers:** Conditional statements (`if`, `else`, `switch`) are standard across most programming languages. The concept of truthy and falsy values might be slightly different depending on your background; ensure you know which values are falsy in JavaScript.
>
> 📲 **Native Developers:** The syntax for `if`, `else`, and `switch` will be familiar. Pay close attention to JavaScript's truthy/falsy evaluation, as this differs from languages where conditions strictly require boolean expressions. Remember that `switch` uses strict equality (`===`) for comparisons.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Making decisions in your code — conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals)
> - [MDN Web Docs: `if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
> - [MDN Web Docs: `switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
> - [MDN Web Docs: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
> - [MDN Web Docs: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

### Looping Constructs

Looping constructs allow for the repeated execution of a block of code.

#### `for` Loop

Ideal when the number of iterations is known or can be determined beforehand.

-   Syntax: `for (initialization; condition; afterthought) { /* loop body */ }`
    -   `initialization`: An expression or variable declaration executed once before the loop begins. Typically initializes a counter variable (e.g., `let i = 0`).
    -   `condition`: An expression evaluated before each loop iteration. If it evaluates to truthy, the loop body is executed. If falsy, the loop terminates.
    -   `afterthought` (also called final-expression or increment/decrement expression): An expression executed at the end of each iteration, after the loop body. Typically used to update the counter (e.g., `i++`).

This example uses a `for` loop to iterate through a list of medication names:

```javascript
const medicationList = ["Aspirin", "Ibuprofen", "Paracetamol"];

for (let i = 0; i < medicationList.length; i++) {
  console.log(`Medication ${i + 1}: ${medicationList[i]}`);
}
// Outputs:
// Medication 1: Aspirin
// Medication 2: Ibuprofen
// Medication 3: Paracetamol
```

#### `while` Loop

Repeats a block of code as long as a specified condition is true.

-   Syntax: `while (condition) { /* loop body */ }`

The condition is evaluated before each execution of the loop body. If the condition is initially false, the loop body will never execute.

> [!CAUTION]
> It's crucial to ensure that the statements within a `while` loop eventually cause the condition to become false to prevent infinite loops, which will freeze your program.

This example uses a `while` loop to process prescriptions until a certain count is reached:

```javascript
let processedCount = 0;
const totalPrescriptions = 5;

while (processedCount < totalPrescriptions) {
  console.log(`Processing prescription ${processedCount + 1}...`);
  processedCount++; // Important: update the condition variable
}
// Outputs:
// Processing prescription 1...
// Processing prescription 2...
// Processing prescription 3...
// Processing prescription 4...
// Processing prescription 5...
```

#### `do...while` Loop

Similar to a `while` loop, but the loop body is executed at least once, regardless of the condition's initial state.

-   Syntax: `do { /* loop body */ } while (condition);`

The condition is evaluated after the loop body has executed.

This example uses a `do...while` loop, which will run at least once even if the condition is initially false:

```javascript
let attemptCount = 0;
const maxAttempts = 0; // Condition is initially false

do {
  console.log(`Attempt number: ${attemptCount + 1}`);
  attemptCount++;
} while (attemptCount < maxAttempts);
// Outputs: Attempt number: 1
// The loop body ran once before the condition (0 < 0) was evaluated as false.
```

#### `break` Statement (in Loops)

Used to immediately terminate the innermost enclosing loop (`for`, `while`, `do...while`) or `switch` statement. Program execution continues at the statement immediately following the terminated loop or switch.

This example uses `break` to exit a loop early:

```javascript
const patientQueue = ["Alice", "Bob", "Charlie", "David"];
const targetPatient = "Charlie";

for (let i = 0; i < patientQueue.length; i++) {
  if (patientQueue[i] === targetPatient) {
    console.log(`Found ${targetPatient} in the queue.`);
    break; // Exit the loop once the target is found
  }
  console.log(`Checking patient: ${patientQueue[i]}`);
}
// Outputs:
// Checking patient: Alice
// Checking patient: Bob
// Found Charlie in the queue.
```

#### `continue` Statement (in Loops)

Skips the remaining statements in the current iteration of the loop and proceeds to the next iteration.

-   In a `for` loop, control jumps to the `afterthought` expression.
-   In a `while` or `do...while` loop, control jumps back to the evaluation of the condition.

This example uses `continue` to skip processing for a specific patient:

```javascript
const patientList = ["Alice", "Bob", "Charlie", "David"];
const skipPatient = "Bob";

for (let i = 0; i < patientList.length; i++) {
  if (patientList[i] === skipPatient) {
    console.log(`Skipping patient: ${skipPatient}`);
    continue; // Skip the rest of this iteration
  }
  console.log(`Processing patient: ${patientList[i]}`);
}
// Outputs:
// Processing patient: Alice
// Skipping patient: Bob
// Processing patient: Charlie
// Processing patient: David
```

#### Labeled Statements (with `break` and `continue`)

A label is an identifier followed by a colon (`:`), placed before a loop or block statement. It allows `break` and `continue` to refer to a specific enclosing loop, which is useful for controlling nested loops.

-   Syntax: `myLabel: while (condition) { ... break myLabel; ... }`

#### `for...in` Loop

Iterates over the enumerable property names (keys) of an object.

-   Syntax: `for (const key in object) { /* code using object[key] */ }`

> [!IMPORTANT]
> The order of iteration with `for...in` is not guaranteed and may vary across JavaScript engines. It iterates over an object's own properties as well as enumerable properties inherited from its prototype chain. To iterate only over an object's own properties, use `object.hasOwnProperty(key)` within the loop. Generally not recommended for iterating over arrays; use `for...of` or array methods instead.

This example uses `for...in` to iterate over object properties:

```javascript
const medicationDetails = {
  name: "Aspirin",
  strength: "81mg",
  form: "Tablet"
};

for (const key in medicationDetails) {
  // Use hasOwnProperty to avoid inherited properties
  if (medicationDetails.hasOwnProperty(key)) {
    console.log(`${key}: ${medicationDetails[key]}`);
  }
}
// Outputs (order may vary):
// name: Aspirin
// strength: 81mg
// form: Tablet
```

#### `for...of` Loop (ES6+)

Creates a loop iterating over the values of iterable objects. Iterable objects include built-in types like `Array`, `String`, `Map`, `Set`, and the `arguments` object, as well as user-defined iterables.

-   Syntax: `for (const value of iterable) { /* code using value */ }`

This loop provides a simpler and more direct way to access the values of elements in a collection compared to traditional `for` loops or `for...in`. Objects are not directly iterable by default with `for...of`. To iterate over an object's properties using `for...of`, one can use methods like `Object.keys(obj)`, `Object.values(obj)`, or `Object.entries(obj)`, which return iterables.

This example uses `for...of` to iterate over array values:

```javascript
const prescriptionItems = ["Item A", "Item B", "Item C"];

for (const item of prescriptionItems) {
  console.log(`Prescription item: ${item}`);
}
// Outputs:
// Prescription item: Item A
// Prescription item: Item B
// Prescription item: Item C
```

This table compares the different loop types:

Table 2.2: Loop Comparison

| Loop Type   | Syntax                               | Primary Use Case                                   | Condition Check          | Executes At Least Once? |
| :---------- | :----------------------------------- | :------------------------------------------------- | :----------------------- | :---------------------- |
| `for`       | `for (init; cond; afterthought) {...}`| Known number of iterations, iterating with a counter | Before each iteration    | No (if cond initially false)|
| `while`     | `while (condition) {...}`            | Iterations based on a condition, number unknown    | Before each iteration    | No (if cond initially false)|
| `do...while`| `do {...} while (condition);`        | Iterations based on a condition, body needs to run once| After each iteration     | Yes                     |
| `for...in`  | `for (const key in object) {...}`    | Enumerating object property names (keys)           | Implicit (for each key)  | No (if object has no enumerable properties)|
| `for...of`  | `for (const value of iterable) {...}`| Iterating over values of iterable objects (Arrays, Strings, etc.)| Implicit (for each value)| No (if iterable is empty)|

> 🌐 **Web Developers:** You are likely very familiar with `for`, `while`, and `do...while` loops. Pay attention to `for...in` and `for...of`, as their specific use cases and behaviors (especially regarding objects vs. arrays) are important in JavaScript.
>
> 📲 **Native Developers:** The concepts of loops and conditional execution are standard. The syntax might differ slightly from Java or Swift. Ensure you understand the distinction between `for...in` and `for...of` and when to use each, particularly for iterating over collections.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
> - [MDN Web Docs: `for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
> - [MDN Web Docs: `while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
> - [MDN Web Docs: `do...while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)
> - [MDN Web Docs: `break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
> - [MDN Web Docs: `continue`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)
> - [MDN Web Docs: `for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
> - [MDN Web Docs: `for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

### Next Steps

Continue to the next section to explore functions, including modern arrow function syntax, scope, and the powerful concept of closures.

- [Section 3: Functions (Arrow Functions, Scope, Closures)](./section-03-functions.md)
