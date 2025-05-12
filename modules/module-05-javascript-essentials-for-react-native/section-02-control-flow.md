## Section 2: Control Flow

Control flow statements are essential tools in JavaScript that allow you to dictate the order in which your code is executed. They enable your programs to make decisions, repeat actions, and respond dynamically to different situations. This section covers conditional statements for decision-making and looping statements for repetitive tasks.

### Conditional Statements

Conditional statements execute different blocks of code based on whether a specified condition evaluates to `true` or `false`.

#### `if` Statement

The `if` statement executes a block of code only if a specified condition is true.

```javascript
let patientAge = 17;
let needsGuardianConsent = false;

if (patientAge < 18) {
  needsGuardianConsent = true;
  console.log("Patient is a minor and requires guardian consent.");
}

console.log(`Needs Consent: ${needsGuardianConsent}`); // Output: Needs Consent: true
```

#### `else if` Statement

Use `else if` to specify a new condition to test, if the first `if` condition is false.

```javascript
let medicationStock = 15;

if (medicationStock <= 0) {
  console.log("Medication is out of stock.");
} else if (medicationStock < 20) {
  console.log("Medication stock is low. Reorder soon."); // This block executes
} else {
  console.log("Medication is in sufficient stock.");
}
```

#### `else` Statement

The `else` statement executes a block of code if all preceding `if` and `else if` conditions are false.

```javascript
let temperatureCelsius = 37.5;

if (temperatureCelsius > 38) {
  console.log("Patient may have a fever.");
} else {
  console.log("Patient temperature is within normal range."); // This block executes
}
```

#### `switch` Statement

The `switch` statement is used to perform different actions based on different conditions (cases). It's often a more elegant way to handle multiple `else if` scenarios when checking a single variable against multiple values.

- The `switch` expression is evaluated once.
- The value of the expression is compared with the values of each `case`.
- If there is a match, the associated block of code is executed.
- The `break` keyword exits the `switch` block. If `break` is omitted, execution will continue into the next `case` (fall-through), which is usually unintended.
- The `default` keyword specifies the code to run if there is no `case` match.
- **Important:** `switch` uses **strict equality (`===`)** for comparisons, similar to the `===` operator. No type coercion is performed.

```javascript
let dosageForm = "Tablet";
let instructions = "";

switch (dosageForm) {
  case "Tablet":
  case "Capsule":
    instructions = "Swallow whole with water. Do not crush or chew.";
    break;
  case "Liquid":
    instructions = "Shake well before use. Use measuring spoon provided.";
    break;
  case "Injection":
    instructions = "To be administered by a healthcare professional.";
    break;
  default:
    instructions = "Follow specific instructions on the packaging.";
}
console.log(`Instructions for ${dosageForm}: ${instructions}`);
// Output: Instructions for Tablet: Swallow whole with water. Do not crush or chew.
```

#### Truthy and Falsy Values

In JavaScript, conditions don't strictly need to be boolean values. JavaScript uses the concept of "truthy" and "falsy" to evaluate non-boolean values in a boolean context (like an `if` statement).

- **Falsy values** are values that translate to `false` when evaluated in a Boolean context. The falsy values in JavaScript are:
  - `false`
  - `0` (zero)
  - `-0` (minus zero)
  - `0n` (BigInt zero)
  - `''` or `""` (empty string)
  - `null`
  - `undefined`
  - `NaN` (Not a Number)
- **Truthy values** are all other values, including objects, arrays, non-empty strings, numbers other than zero, etc.

```javascript
let patientNotes = ""; // Falsy
if (patientNotes) {
  console.log("Patient has notes."); // This will not run
} else {
  console.log("No patient notes found."); // This will run
}

let appointments = []; // Truthy (even an empty array/object is truthy)
if (appointments) {
  console.log("Appointments object exists."); // This will run
}
```

### Looping Statements

Loops are used to execute a block of code repeatedly, based on a condition or for a specific number of iterations.

#### `for` Loop

The `for` loop repeats a block of code as long as a specified condition evaluates to true. It's commonly used when you know the number of iterations beforehand.

It consists of three optional expressions, followed by a code block:

1.  **Initialization:** Executed once before the loop starts (e.g., `let i = 0`).
2.  **Condition:** Evaluated before each iteration. If `true`, the loop continues. If `false`, the loop ends.
3.  **Final Expression (Increment/Decrement):** Executed at the end of each iteration (e.g., `i++`).

```javascript
console.log("Printing prescription refill reminders:");
for (let i = 1; i <= 3; i++) {
  console.log(`Refill reminder #${i} sent.`);
}
// Output:
// Refill reminder #1 sent.
// Refill reminder #2 sent.
// Refill reminder #3 sent.
```

#### `while` Loop

The `while` loop executes a block of code as long as a specified condition is true. The condition is evaluated _before_ each iteration.

```javascript
let patientQueue = ["Patient A", "Patient B", "Patient C"];
console.log("Processing patient queue:");
while (patientQueue.length > 0) {
  let currentPatient = patientQueue.shift(); // .shift() removes the first element and returns it
  console.log(`Now serving: ${currentPatient}`);
}
console.log("Queue is empty.");
// Output:
// Now serving: Patient A
// Now serving: Patient B
// Now serving: Patient C
// Queue is empty.
```

#### `do...while` Loop

The `do...while` loop is similar to the `while` loop, but the code block is executed _at least once_ before the condition is checked. The condition is evaluated _after_ each iteration.

```javascript
let confirmationCode;
let attempt = 0;
do {
  attempt++;
  confirmationCode = Math.floor(Math.random() * 10); // Simulate generating a code (0-9)
  console.log(`Attempt ${attempt}: Generated code ${confirmationCode}`);
} while (confirmationCode !== 7); // Loop until code 7 is generated

console.log(`Confirmation code 7 generated after ${attempt} attempts.`);
```

#### `for...of` Loop (ES6)

The `for...of` loop iterates over the **values** of iterable objects. Iterable objects include built-in types like `Array`, `String`, `Map`, `Set`, etc. It provides a simple and direct way to access the elements of a collection.

```javascript
const medications = ["Amoxicillin", "Ibuprofen", "Paracetamol"];
console.log("Available medications:");
for (const medication of medications) {
  console.log(medication);
}
// Output:
// Amoxicillin
// Ibuprofen
// Paracetamol
```

#### `for...in` Loop

The `for...in` loop iterates over the enumerable string **property names (keys)** of an object. The order of iteration is not guaranteed.

> [!CAUTION]
>
> - **Use with Objects:** `for...in` is intended for iterating over the keys of plain objects.
> - **Avoid with Arrays:** Do not use `for...in` to iterate over Arrays. It iterates over indices (as strings) and potentially any other added properties, including inherited ones. The order is not guaranteed. Use `for...of` or array methods (`forEach`, `map`, etc.) for arrays.
> - **Check `hasOwnProperty`:** When using `for...in` with objects, it's often wise to check if the property belongs directly to the object and is not inherited from its prototype chain, using `Object.prototype.hasOwnProperty.call(object, key)` or `object.hasOwnProperty(key)`.

```javascript
const patientRecord = {
  name: "Alice Wonderland",
  dob: "1995-07-16",
  insuranceProvider: "SpeedyHealth Inc.",
};

console.log("Patient Record Details:");
for (const propertyKey in patientRecord) {
  // It's good practice to check if the property belongs to the object itself
  if (Object.prototype.hasOwnProperty.call(patientRecord, propertyKey)) {
    console.log(`${propertyKey}: ${patientRecord[propertyKey]}`);
  }
}
// Output:
// name: Alice Wonderland
// dob: 1995-07-16
// insuranceProvider: SpeedyHealth Inc.
```

#### Loop Control Statements

- **`break`:** Terminates the current loop (or `switch` statement) and transfers program control to the statement following the terminated statement.

  ```javascript
  const medicationBatchNumbers = [101, 102, 0, 104, 105]; // 0 indicates an error/end of valid batches
  console.log("Checking medication batches:");
  for (const batchNum of medicationBatchNumbers) {
    if (batchNum === 0) {
      console.log("Invalid batch number found. Stopping process.");
      break; // Exit the loop
    }
    console.log(`Processing batch: ${batchNum}`);
  }
  // Output:
  // Processing batch: 101
  // Processing batch: 102
  // Invalid batch number found. Stopping process.
  ```

- **`continue`:** Terminates execution of the statements in the current iteration of the current loop, and continues execution of the loop with the next iteration.

  ```javascript
  const patientAges = [25, 17, 65, 12, 40]; // Ages for a clinical trial
  console.log("Eligible adult patients for trial (age 18-60):");
  for (const age of patientAges) {
    if (age < 18 || age > 60) {
      console.log(`Patient aged ${age} is not eligible, skipping.`);
      continue; // Skip to the next patient
    }
    console.log(`Patient aged ${age} is eligible.`);
  }
  // Output:
  // Patient aged 25 is eligible.
  // Patient aged 17 is not eligible, skipping.
  // Patient aged 65 is not eligible, skipping.
  // Patient aged 12 is not eligible, skipping.
  // Patient aged 40 is eligible.
  ```

- **Labeled Statements (Advanced):** JavaScript allows you to label loops. You can then use `break labelName;` or `continue labelName;` to control nested loops more precisely, jumping to the statement after the labeled loop (`break`) or starting the next iteration of the labeled loop (`continue`). This is less common but useful in specific complex scenarios.
  ```javascript
  // Example (Conceptual)
  outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
        console.log(`Continuing outer loop at i=${i}, j=${j}`);
        continue outerLoop; // Skips rest of inner loop and starts next outer loop iteration
      }
      if (i === 2 && j === 0) {
        console.log(`Breaking outer loop at i=${i}, j=${j}`);
        break outerLoop; // Exits both loops
      }
      console.log(`i=${i}, j=${j}`);
    }
  }
  console.log("Loop finished");
  ```

#### Loop Comparison Summary

| Loop Type    | Syntax                          | Primary Use Case                                                      | Condition Check       | Executes At Least Once? |
| :----------- | :------------------------------ | :-------------------------------------------------------------------- | :-------------------- | :---------------------- |
| `for`        | `for (init; cond; final)`       | Known number of iterations, iterating with a counter                  | Before each iteration | No                      |
| `while`      | `while (condition)`             | Iterations based on a condition, number unknown                       | Before each iteration | No                      |
| `do...while` | `do {...} while (condition);`   | Iterations based on a condition, body _must_ run at least once        | After each iteration  | Yes                     |
| `for...in`   | `for (const key in object)`     | Enumerating object **property names (keys)**                          | Implicit (each key)   | No (if 0 properties)    |
| `for...of`   | `for (const value of iterable)` | Iterating over **values** of iterable objects (Arrays, Strings, etc.) | Implicit (each value) | No (if empty iterable)  |

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
> - [MDN Web Docs: `if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
> - [MDN Web Docs: `switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
> - [MDN Web Docs: `for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
> - [MDN Web Docs: `while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
> - [MDN Web Docs: `do...while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)
> - [MDN Web Docs: `for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
> - [MDN Web Docs: `for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
> - [MDN Web Docs: `break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
> - [MDN Web Docs: `continue`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)

### Next Steps

With a solid understanding of how to control the flow of your JavaScript code, you are now prepared to explore one of the most powerful features of the language: functions. Proceed to [Section 3: Functions](./section-03-functions.md) to learn how to create reusable blocks of code.
