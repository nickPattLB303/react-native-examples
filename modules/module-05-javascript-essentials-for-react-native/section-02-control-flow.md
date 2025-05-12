## Section 2: Control Flow

Control flow statements are essential tools in JavaScript that allow you to dictate the order in which your code is executed. They enable your programs to make decisions, repeat actions, and respond dynamically to different situations. This section covers conditional statements for decision-making and looping statements for repetitive tasks.

### Conditional Statements

Conditional statements execute different blocks of code based on whether a specified condition evaluates to `true` or `false`.

> [!TIP]
> It's good practice to always use block statements (`{}`) for the code to be executed within an `if`, `else if`, or `else` construct, even if the block contains only a single line. This improves code readability and can prevent errors if more lines are added later.

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
- The value of the expression is compared with the values of each `case` using strict equality (`===`).
- If there is a match, the associated block of code is executed.
- The `break` keyword exits the `switch` block. If `break` is omitted, execution will continue into the next `case` (fall-through), which is usually unintended.
- The `default` keyword specifies the code to run if there is no `case` match.

```javascript
let dosageForm = "Tablet";
let instructions = "";

switch (dosageForm) {
  case "Tablet":
  case "Capsule": // Example of fall-through for shared logic
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

In JavaScript, conditions don't strictly need to be boolean values. JavaScript uses the concept of "truthy" and "falsy" to evaluate non-boolean values in a boolean context (like an `if` statement). Understanding these is critical for accurate conditional logic.

- **Falsy values** are values that coerce to `false` when evaluated in a Boolean context.
- **Truthy values** are all other values not in the falsy list.

##### Table 2.1: Truthy and Falsy Values in JavaScript

| Value          | Type      | Truthiness | Notes                                    |
| :------------- | :-------- | :--------- | :--------------------------------------- |
| `false`        | Boolean   | Falsy      |                                          |
| `0`            | Number    | Falsy      |                                          |
| `-0`           | Number    | Falsy      |                                          |
| `0n`           | BigInt    | Falsy      |                                          |
| `""`           | String    | Falsy      | Empty string                             |
| `null`         | Null      | Falsy      |                                          |
| `undefined`    | Undefined | Falsy      |                                          |
| `NaN`          | Number    | Falsy      | Not-a-Number                             |
| `true`         | Boolean   | Truthy     |                                          |
| `"hello"`      | String    | Truthy     | Non-empty string                         |
| `"0"`          | String    | Truthy     | Non-empty string (even if looks numeric) |
| `42`           | Number    | Truthy     | Non-zero number                          |
| `{}`           | Object    | Truthy     | Any object, including empty object       |
| `[]`           | Object    | Truthy     | Any array, including empty array         |
| `function(){}` | Function  | Truthy     | Any function                             |

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

The `for...of` loop iterates over the values of iterable objects, such as Arrays, Strings, Maps, Sets, etc. It's generally the preferred way to loop over arrays.

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

Objects themselves are not directly iterable with `for...of`. However, you can iterate over their properties using `for...of` in conjunction with methods like `Object.keys()`, `Object.values()`, or `Object.entries()`:

```javascript
const medicationStorage = {
  Amoxicillin: "Shelf A",
  Ibuprofen: "Shelf B",
  Paracetamol: "Shelf A",
};

console.log("\nMedication Locations (Keys):");
for (const medName of Object.keys(medicationStorage)) {
  console.log(medName); // Amoxicillin, Ibuprofen, Paracetamol
}

console.log("\nStorage Shelves (Values):");
for (const shelf of Object.values(medicationStorage)) {
  console.log(shelf); // Shelf A, Shelf B, Shelf A
}

console.log("\nMedication to Shelf Mapping (Entries):");
for (const [medName, shelf] of Object.entries(medicationStorage)) {
  console.log(`${medName} is on ${shelf}`);
}
```

#### `for...in` Loop

The `for...in` loop iterates over the enumerable string properties (keys) of an object, including inherited enumerable properties.

> [!CAUTION]
> `for...in` is generally not recommended for iterating over Arrays because it iterates over property names (indices as strings, and potentially other added properties) rather than values. The order of iteration is not guaranteed. Use `for...of` or array methods like `forEach()` for arrays.

```javascript
const patientRecord = {
  name: "Alice Wonderland",
  dob: "1995-07-16",
  insuranceProvider: "SpeedyHealth Inc.",
};

console.log("\nPatient Record Details (for...in):");
for (const propertyKey in patientRecord) {
  // It's good practice to check if the property belongs to the object itself (not inherited)
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
  console.log("\nChecking medication batches with break:");
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
  console.log("\nEligible adult patients for trial (age 18-60) with continue:");
  for (const age of patientAges) {
    if (age < 18 || age > 60) {
      // console.log(`Patient aged ${age} is not eligible, skipping.`);
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

#### Labeled Statements

Labels can be used with `break` or `continue` to control the flow of nested loops more precisely, by specifying which loop to break from or continue with. While powerful, they can make code harder to read and are used less frequently.

```javascript
/* Conceptual Example:
medicationBatchesLoop: // Label for the outer loop
for (const batch of allBatches) {
  inventoryCheckLoop: // Label for the inner loop
  for (const item of batch.items) {
    if (item.isExpired) {
      console.log(`Expired item found in batch ${batch.id}. Skipping entire batch.`);
      continue medicationBatchesLoop; // Continue to the next batch
    }
    if (item.quantity === 0) {
      break inventoryCheckLoop; // Stop checking this specific batch's inventory
    }
  }
}
*/
```

#### Table 2.2: Loop Comparison

| Loop Type    | Syntax                                 | Primary Use Case                                           | Condition Check         | Executes At Least Once? |
| :----------- | :------------------------------------- | :--------------------------------------------------------- | :---------------------- | :---------------------- |
| `for`        | `for (init; cond; afterthought) {...}` | Known number of iterations, iterating with a counter       | Before each iteration   | No (if cond is false)   |
| `while`      | `while (condition) {...}`              | Iterations based on a condition, number unknown            | Before each iteration   | No (if cond is false)   |
| `do...while` | `do {...} while (condition);`          | Iterations based on condition, body needs to run once      | After each iteration    | Yes                     |
| `for...in`   | `for (const key in object) {...}`      | Enumerating object property names (keys)                   | Implicit (for each key) | No (if obj empty)       |
| `for...of`   | `for (const value of iterable) {...}`  | Iterating over values of iterables (Arrays, Strings, etc.) | Implicit (for each val) | No (if iterable empty)  |

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
> - [MDN Web Docs: Labeled statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

### Next Steps

With a solid understanding of how to control the flow of your JavaScript code, you are now prepared to explore one of the most powerful features of the language: functions. Proceed to [Section 3: Functions](./section-03-functions.md) to learn how to create reusable blocks of code.
