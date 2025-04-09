---
marp: true
theme: custom-theme
paginate: true
header: 'Module 04: JavaScript Essentials - Lesson 02: Control Flow'
footer: 'React Native Training'
---
<!-- Presenter notes for Title slide -->
<!-- Introduce control flow: how programs make decisions (conditionals) and repeat actions (loops). Essential for creating dynamic behavior. -->

<!-- _class: lead -->
# Lesson 02: Control Flow

Making decisions and repeating tasks based on conditions.

---
<!-- Presenter notes for Learning Objectives slide -->
<!-- Go through objectives. Emphasize choosing the right structure (if vs switch, different loop types). -->

## Learning Objectives

By the end of this lesson, you will be able to:

-   Implement conditional logic using `if`, `else if`, and `else` statements.
-   Use the `switch` statement for multi-way branching based on a single value.
-   Repeat actions using `for`, `while`, and `do...while` loops.
-   Iterate over arrays and object properties using `for...of` and `for...in`.

---
<!-- Presenter notes for Introduction slide -->
<!-- Explain that programs don't just run top-to-bottom. They need to react. Give a simple pharmacy example (e.g., checking stock before dispensing). -->

## Introduction

Programs rarely execute instructions sequentially from top to bottom. **Control flow** statements allow you to alter the execution path based on certain conditions or repeat blocks of code multiple times. This enables your application to make decisions, respond to different inputs, and handle repetitive tasks efficiently. For example, a pharmacy system needs to check if a medication is in stock before allowing it to be dispensed.

---
<!-- Presenter notes for If/Else slide -->
<!-- Explain the basic `if` structure, adding `else if` for multiple conditions, and `else` as the default fallback. -->

## Conditional Logic: `if...else if...else`

The most common way to execute code conditionally is using the `if` statement.

-   **`if (condition)`**: Executes a block of code *only if* the `condition` evaluates to `true`.
-   **`else if (anotherCondition)`**: Can follow an `if`. Executes *only if* the previous `if` condition was `false` AND `anotherCondition` is `true`. You can have multiple `else if` blocks.
-   **`else`**: Can follow an `if` or `else if`. Executes *only if* all preceding `if` and `else if` conditions were `false`.

---
<!-- Presenter notes for If/Else Example slide -->
<!-- Walk through the logic: Check age first, then check for allergy. Explain how only one block (the first one that matches) executes. -->

## `if...else if...else` Example (TypeScript)

```typescript
/**
 * Determines if a specific medication can be dispensed based on age and allergy status.
 * @param age - Patient's age in years.
 * @param medicationName - The name of the medication.
 * @param hasAllergy - Whether the patient has an allergy to this medication.
 * @returns A string indicating the dispensing status.
 */
function checkDispensingEligibility(age: number, medicationName: string, hasAllergy: boolean): string {
  const minimumAge: number = 12; // Example minimum age for this medication

  if (hasAllergy) {
    return `Cannot dispense ${medicationName}: Patient has allergy.`;
  } else if (age < minimumAge) {
    return `Cannot dispense ${medicationName}: Patient age (${age}) is below minimum (${minimumAge}).`;
  } else {
    // Only reaches here if no allergy AND age is sufficient
    return `OK to dispense ${medicationName}.`;
  }
}

// Example Usage
console.log(checkDispensingEligibility(25, "Ibuprofen", false)); // Output: OK to dispense Ibuprofen.
console.log(checkDispensingEligibility(10, "Ibuprofen", false)); // Output: Cannot dispense Ibuprofen: Patient age (10) is below minimum (12).
console.log(checkDispensingEligibility(30, "Penicillin", true)); // Output: Cannot dispense Penicillin: Patient has allergy.
```
**(Copy button available in top-right corner)**

**Explanation:**

This TypeScript function `checkDispensingEligibility` demonstrates the use of `if...else if...else` to implement decision-making logic for dispensing medication.

1.  **Purpose:** The function aims to determine if a patient is eligible for a specific medication based on two criteria: whether they have an allergy to it and whether they meet a minimum age requirement.
2.  **Parameters & Return Type:** It accepts the patient's `age` (number), the `medicationName` (string), and a boolean `hasAllergy` flag. It returns a `string` message indicating the outcome. Type annotations (`: number`, `: string`, `: boolean`) ensure these parameters are used correctly.
3.  **Conditional Logic Flow:**
    *   The **first `if` statement** checks `if (hasAllergy)`. If this condition is `true`, the function immediately returns a message indicating the allergy prevents dispensing, and no further checks are performed. This prioritizes the allergy check.
    *   If the first `if` condition is `false` (no allergy), the code proceeds to the **`else if (age < minimumAge)`** statement. This condition is checked *only* if there was no allergy. If the patient's `age` is less than the `minimumAge`, the function returns a message indicating the age restriction prevents dispensing.
    *   If both the `if` and `else if` conditions are `false` (meaning no allergy AND the patient meets the minimum age), the code execution falls through to the final **`else` block**. This block represents the successful scenario where dispensing is permitted, and it returns the corresponding "OK to dispense" message.
4.  **Block Scoping & Readability:** The code blocks associated with `if`, `else if`, and `else` clearly delineate the code executed for each condition. Using meaningful variable names (`minimumAge`, `hasAllergy`) enhances readability.
5.  **Efficiency:** The `else if` structure ensures that conditions are checked sequentially, and execution stops as soon as a `true` condition is found and its block is executed. This prevents unnecessary checks.

---
<!-- Presenter notes for Switch slide -->
<!-- Explain `switch` as an alternative to long `if/else if` chains when checking a single value against multiple possibilities. Explain `case`, `break`, and `default`. Emphasize the importance of `break`. -->

## Conditional Logic: `switch`

The `switch` statement provides an alternative way to execute different code blocks based on the value of a single expression. It's often cleaner than multiple `else if` statements when comparing against specific values.

-   **`switch (expression)`**: Evaluates the `expression`.
-   **`case value:`**: Compares the `expression`'s result to `value`. If they match (using strict equality `===`), the code block following the `case` is executed.
-   **`break;`**: **Crucial!** Exits the `switch` statement. If omitted, execution "falls through" to the next `case`, which is usually unintended.
-   **`default:`**: Optional. Executes if none of the `case` values match the `expression`.

---
<!-- Presenter notes for Switch Example slide -->
<!-- Walk through the example. Show how the `dosageForm` string is compared against each `case`. Explain what happens if `break` is removed (fall-through). Mention the `default` case handles unexpected inputs. -->

## `switch` Example (TypeScript)

```typescript
/**
 * Provides handling instructions based on the medication's dosage form.
 * @param dosageForm - The form of the medication (e.g., 'Tablet', 'Liquid', 'Capsule').
 * @returns A string with handling instructions.
 */
function getHandlingInstructions(dosageForm: string): string {
  let instructions: string;

  switch (dosageForm.toLowerCase()) { // Convert to lowercase for case-insensitive matching
    case 'tablet':
    case 'capsule': // Multiple cases can lead to the same block
      instructions = "Store in a cool, dry place. Keep container tightly closed.";
      break; // Exit the switch
    case 'liquid':
      instructions = "Shake well before use. Store refrigerated if indicated. Use measuring device.";
      break; // Exit the switch
    case 'cream':
    case 'ointment':
      instructions = "For external use only. Apply thinly to affected area.";
      break; // Exit the switch
    default: // Handle unexpected forms
      instructions = "Consult pharmacist for specific handling instructions.";
      // No break needed after default if it's the last case
  }

  return instructions;
}

// Example Usage
console.log(getHandlingInstructions("Tablet"));   // Output: Store in a cool, dry place...
console.log(getHandlingInstructions("Liquid"));   // Output: Shake well before use...
console.log(getHandlingInstructions("CAPSULE"));  // Output: Store in a cool, dry place... (due to toLowerCase)
console.log(getHandlingInstructions("Inhaler")); // Output: Consult pharmacist...
```
**(Copy button available in top-right corner)**

**Explanation:**

This TypeScript function `getHandlingInstructions` uses a `switch` statement to provide specific handling advice based on a medication's `dosageForm`.

1.  **Purpose:** To demonstrate how `switch` can efficiently handle multiple distinct cases based on the value of a single variable (`dosageForm`).
2.  **Case-Insensitive Matching:** The input `dosageForm` is converted to lowercase using `.toLowerCase()` before being evaluated by the `switch`. This ensures that the matching is case-insensitive (e.g., "Tablet", "tablet", and "TABLET" would all match the `'tablet'` case).
3.  **`case` and `break`:** Each `case` label represents a specific value to compare against the result of `dosageForm.toLowerCase()`.
    *   If a match occurs (e.g., the input is "Liquid", which becomes "liquid" and matches `case 'liquid':`), the code block following that `case` is executed (`instructions = "Shake well..."`).
    *   The `break;` statement is essential after each case's logic (except potentially the `default` if it's last). It terminates the execution of the `switch` statement, preventing "fall-through". Without `break`, if `case 'liquid'` matched, the code for `case 'cream'` would *also* execute, which is incorrect here.
4.  **Fall-through (Intentional):** Notice how `case 'tablet':` has no code block or `break` immediately following it. This is an intentional fall-through. If the input is "tablet", execution falls through to the next case (`case 'capsule':`), and the code associated with `'capsule'` is executed for both tablets and capsules. This is useful for grouping cases with identical outcomes.
5.  **`default` Case:** The `default:` case acts as a catch-all. If the evaluated expression (`dosageForm.toLowerCase()`) does not match any of the preceding `case` values (e.g., "Inhaler"), the code block under `default:` is executed. This is important for handling unexpected or unsupported inputs gracefully.
6.  **Readability:** For situations with many specific value checks against a single variable, `switch` can be more readable than a long chain of `if...else if` statements.

---
<!-- Presenter notes for Loops Intro slide -->
<!-- Introduce the concept of loops for repetition. Mention the main types: for, while, do...while. -->

## Loops: Repeating Actions

Loops are used to execute a block of code repeatedly until a specific condition is met.

-   **`for` loop**: Best when you know in advance how many times you want to iterate.
-   **`while` loop**: Best when you want to loop as long as a condition is true, and the number of iterations isn't known beforehand. The condition is checked *before* each iteration.
-   **`do...while` loop**: Similar to `while`, but the condition is checked *after* the loop body executes. Guarantees the loop body runs at least once.

---
<!-- Presenter notes for For Loop slide -->
<!-- Explain the three parts of the `for` loop syntax: initialization, condition, final-expression (increment/decrement). -->

## The `for` Loop

The `for` loop is ideal for iterating a known number of times.

**Syntax:**
`for (initialization; condition; finalExpression)`

1.  **`initialization`**: Executed once before the loop starts (e.g., `let i: number = 0`).
2.  **`condition`**: Evaluated before each iteration. If `true`, the loop body executes. If `false`, the loop terminates. (e.g., `i < 5`).
3.  **`finalExpression`**: Executed after each iteration (e.g., `i++`). Usually used to increment or decrement the loop counter.

---
<!-- Presenter notes for For Loop Example slide -->
<!-- Walk through the example. Show how `i` starts at 0, increments, and the loop stops when `i` is no longer less than `dosesToPrepare`. -->

## `for` Loop Example (TypeScript)

```typescript
/**
 * Prepares labels for a specific number of medication doses.
 * @param medicationName - The name of the medication.
 * @param dosesToPrepare - The total number of doses to label.
 */
function prepareDoseLabels(medicationName: string, dosesToPrepare: number): void {
  console.log(`Preparing ${dosesToPrepare} labels for ${medicationName}...`);

  // Loop from dose 1 up to dosesToPrepare
  for (let i: number = 1; i <= dosesToPrepare; i++) {
    // The code inside this block runs for each iteration
    console.log(` - Label prepared for ${medicationName} - Dose #${i}`);
  }

  console.log("Label preparation complete.");
}

// Example Usage
prepareDoseLabels("Metformin", 3);
// Output:
// Preparing 3 labels for Metformin...
//  - Label prepared for Metformin - Dose #1
//  - Label prepared for Metformin - Dose #2
//  - Label prepared for Metformin - Dose #3
// Label preparation complete.
```
**(Copy button available in top-right corner)**

**Explanation:**

This TypeScript function `prepareDoseLabels` uses a `for` loop to simulate preparing labels for a specified number of medication doses.

1.  **Purpose:** To demonstrate a common use case for `for` loops: performing an action a fixed number of times (`dosesToPrepare`).
2.  **Loop Initialization (`let i: number = 1`):** Before the loop begins, a counter variable `i` (explicitly typed as `number`) is declared and initialized to `1`. We start at 1 to represent the first dose number naturally.
3.  **Loop Condition (`i <= dosesToPrepare`):** Before each potential iteration, the condition `i <= dosesToPrepare` is checked. As long as the current dose number `i` is less than or equal to the total `dosesToPrepare`, the condition is `true`, and the loop body executes. When `i` becomes greater than `dosesToPrepare` (e.g., 4 in the example), the condition becomes `false`, and the loop terminates.
4.  **Loop Final Expression (`i++`):** After the code inside the loop block executes for a given iteration, the final expression `i++` is executed. This increments the counter `i` by 1 (`i = i + 1`), preparing it for the next condition check.
5.  **Loop Body:** The code inside the curly braces `{}` is the loop body. In this case, it's a `console.log` statement that prints a message indicating a label has been prepared for the current dose number `i`. This block executes repeatedly – once for `i = 1`, once for `i = 2`, and once for `i = 3` in the example call.
6.  **Execution Flow:** For `prepareDoseLabels("Metformin", 3)`:
    *   Initialize `i = 1`.
    *   Check `1 <= 3` (true). Execute body (print Dose #1). Increment `i` to 2.
    *   Check `2 <= 3` (true). Execute body (print Dose #2). Increment `i` to 3.
    *   Check `3 <= 3` (true). Execute body (print Dose #3). Increment `i` to 4.
    *   Check `4 <= 3` (false). Terminate loop.
    *   Execute `console.log("Label preparation complete.")`.

---
<!-- Presenter notes for While Loop slide -->
<!-- Explain `while`: condition checked *before* iteration. Good for loops where the number of iterations isn't fixed but depends on a changing condition. Warn about infinite loops if the condition never becomes false. -->

## The `while` Loop

The `while` loop executes a block of code as long as a specified condition remains `true`. The condition is checked *before* each iteration.

**Syntax:**
`while (condition)`

-   The loop continues as long as `condition` is `true`.
-   **Important:** Ensure the condition will eventually become `false` within the loop, otherwise you'll create an infinite loop!

---
<!-- Presenter notes for While Loop Example slide -->
<!-- Walk through the example. Show how `currentLevel` decreases in the loop body. The loop continues *while* the level is above the minimum. -->

## `while` Loop Example (TypeScript)

```typescript
/**
 * Simulates dispensing medication doses until a minimum stock level is reached.
 * @param medicationName - The name of the medication.
 * @param initialLevel - The starting stock level.
 * @param minLevel - The minimum desired stock level.
 * @param doseAmount - The amount used per dose.
 * @returns The final stock level.
 */
function dispenseUntilMinimum(medicationName: string, initialLevel: number, minLevel: number, doseAmount: number): number {
  let currentLevel: number = initialLevel;
  let dosesDispensed: number = 0;

  console.log(`Dispensing ${medicationName}. Initial stock: ${currentLevel}, Target min: ${minLevel}`);

  // Loop WHILE the current level is above the minimum required
  while (currentLevel > minLevel) {
    // Check if there's enough for one more dose BEFORE dispensing
    if (currentLevel >= doseAmount) {
        currentLevel -= doseAmount; // Dispense one dose
        dosesDispensed++;
        console.log(` - Dispensed dose ${dosesDispensed}. Current stock: ${currentLevel}`);
    } else {
        console.log(` - Not enough stock (${currentLevel}) for another full dose of ${doseAmount}. Stopping.`);
        break; // Exit the loop early if not enough stock for a full dose
    }
  }

  console.log(`Dispensing stopped. Final stock: ${currentLevel}. Total doses dispensed: ${dosesDispensed}`);
  return currentLevel;
}

// Example Usage
dispenseUntilMinimum("Syrup A", 25, 10, 5);
// Output:
// Dispensing Syrup A. Initial stock: 25, Target min: 10
//  - Dispensed dose 1. Current stock: 20
//  - Dispensed dose 2. Current stock: 15
//  - Dispensed dose 3. Current stock: 10
// Dispensing stopped. Final stock: 10. Total doses dispensed: 3
```
**(Copy button available in top-right corner)**

**Explanation:**

This function `dispenseUntilMinimum` uses a `while` loop to simulate dispensing medication until the stock reaches a predefined minimum level.

1.  **Purpose:** To demonstrate the `while` loop, which is suitable when the exact number of iterations isn't known beforehand, but depends on a condition (`currentLevel > minLevel`) being met.
2.  **Initialization:** Variables `currentLevel` and `dosesDispensed` are initialized before the loop starts.
3.  **Loop Condition (`while (currentLevel > minLevel)`):** Before each potential iteration, the condition `currentLevel > minLevel` is evaluated. If the current stock level is greater than the target minimum, the loop body executes. If it's not (i.e., `currentLevel` is less than or equal to `minLevel`), the loop terminates.
4.  **Loop Body:** Inside the loop:
    *   An `if` statement checks if there's enough stock (`currentLevel >= doseAmount`) for the next dose. This prevents dispensing partial doses if the remaining amount is too small.
    *   If sufficient stock exists, `currentLevel` is reduced by `doseAmount` (simulating dispensing), `dosesDispensed` is incremented, and a status message is logged.
    *   If there isn't enough stock for a full dose, a message is logged, and the `break` statement is used to exit the `while` loop prematurely.
5.  **Condition Update:** Crucially, the value of `currentLevel` is modified *inside* the loop (`currentLevel -= doseAmount`). This ensures that the loop condition (`currentLevel > minLevel`) will eventually become `false`, allowing the loop to terminate naturally (unless the `break` is hit first). Failure to modify the variable involved in the condition within the loop often leads to infinite loops.
6.  **Execution Flow:** For `dispenseUntilMinimum("Syrup A", 25, 10, 5)`:
    *   `currentLevel = 25`. Check `25 > 10` (true). Dispense (level=20).
    *   Check `20 > 10` (true). Dispense (level=15).
    *   Check `15 > 10` (true). Dispense (level=10).
    *   Check `10 > 10` (false). Terminate loop.
    *   Log final message.

---
<!-- Presenter notes for Do While Loop slide -->
<!-- Explain `do...while`: condition checked *after* iteration. Guarantees the body runs at least once. Useful for scenarios like prompting user input until valid. -->

## The `do...while` Loop

The `do...while` loop is similar to `while`, but the condition is checked *after* the loop body executes. This guarantees the loop body runs at least once, even if the condition is initially false.

**Syntax:**
`do {
  // code block to execute
} while (condition);`

---
<!-- Presenter notes for Do While Example slide -->
<!-- Explain the example: The log message inside the `do` block runs once *before* the `attempts < maxAttempts` condition is checked. -->

## `do...while` Loop Example (TypeScript)

```typescript
/**
 * Simulates attempting a task (e.g., connecting to a pharmacy service)
 * at least once, retrying up to a maximum number of attempts if needed.
 * @param maxAttempts - The maximum number of connection attempts.
 * @returns Boolean indicating if the connection was successful within attempts.
 */
function attemptConnection(maxAttempts: number): boolean {
  let attempts: number = 0;
  let connected: boolean = false;

  do {
    attempts++;
    console.log(`Attempt ${attempts}: Trying to connect to pharmacy service...`);

    // Simulate connection success/failure (e.g., succeed on the 3rd attempt)
    if (attempts === 3) {
      connected = true;
      console.log("Connection successful!");
    } else {
      console.log("Connection failed, will retry if attempts remain.");
    }

  } while (!connected && attempts < maxAttempts); // Continue WHILE NOT connected AND attempts remain

  if (!connected) {
    console.log(`Failed to connect after ${attempts} attempts.`);
  }
  return connected;
}

// Example Usage
attemptConnection(5);
// Output:
// Attempt 1: Trying to connect to pharmacy service...
// Connection failed, will retry if attempts remain.
// Attempt 2: Trying to connect to pharmacy service...
// Connection failed, will retry if attempts remain.
// Attempt 3: Trying to connect to pharmacy service...
// Connection successful!
```
**(Copy button available in top-right corner)**

**Explanation:**

This function `attemptConnection` uses a `do...while` loop to simulate trying to connect to a service, guaranteeing at least one attempt and retrying until successful or a maximum attempt limit is reached.

1.  **Purpose:** To illustrate the `do...while` loop, particularly its characteristic of executing the loop body *at least once* before checking the condition. This is suitable for scenarios where an initial action must always be performed, followed by potential repetitions.
2.  **Initialization:** `attempts` and `connected` variables are set up before the loop.
3.  **Loop Body (`do { ... }`):** The code inside the `do` block is executed first.
    *   `attempts` is incremented.
    *   A connection attempt is logged.
    *   A simulated success/failure is determined (here, success is forced on the 3rd attempt). `connected` is updated accordingly.
    *   Status messages are logged.
4.  **Loop Condition (`while (!connected && attempts < maxAttempts);`):** *After* the `do` block executes, the `while` condition is checked.
    *   `!connected`: Checks if the connection is *not* yet successful.
    *   `attempts < maxAttempts`: Checks if the number of attempts is still less than the allowed maximum.
    *   `&&`: Both conditions must be true for the loop to continue. If `connected` becomes `true` OR `attempts` reaches `maxAttempts`, the loop terminates.
5.  **Guaranteed First Execution:** Even if `maxAttempts` was 1 and the first attempt failed (making `!connected && attempts < maxAttempts` false immediately after the first run), the code inside the `do` block would still have executed that one time. This is the key difference from a standard `while` loop, which might not execute at all if its condition is initially false.
6.  **Post-Loop Check:** After the loop finishes (either by success or exceeding attempts), an additional `if` checks if the connection was ultimately unsuccessful and logs a final status message.

---
<!-- Presenter notes for For Of Loop slide -->
<!-- Explain `for...of` for iterating directly over the *values* of iterable objects like arrays (or strings, Maps, Sets). Simpler than traditional `for` loop for this purpose. -->

## Iterating with `for...of`

The `for...of` loop provides a simpler syntax for iterating over the *values* of iterable objects (like Arrays, Strings, Maps, Sets, etc.).

**Syntax:**
`for (const element of iterable)`

-   `element`: A variable that will hold the value of the current element in each iteration. Using `const` is common if you don't need to modify it within the loop.
-   `iterable`: The object to iterate over (e.g., an array).

---
<!-- Presenter notes for For Of Example slide -->
<!-- Show iterating over an array of medication names. Contrast with how you'd do this with a traditional `for` loop (using index). -->

## `for...of` Example (TypeScript)

```typescript
/**
 * Logs a list of medications currently in stock.
 * @param medications - An array of medication name strings.
 */
function logStockedMedications(medications: string[]): void {
  console.log("Medications currently in stock:");

  if (medications.length === 0) {
    console.log(" - None");
    return; // Exit function early if array is empty
  }

  // Iterate directly over the values (medication names) in the array
  for (const medication of medications) {
    console.log(` - ${medication}`);
  }
}

// Example Usage
const inventory: string[] = ["Aspirin", "Loratadine", "Simvastatin", "Metformin"];
logStockedMedications(inventory);
// Output:
// Medications currently in stock:
//  - Aspirin
//  - Loratadine
//  - Simvastatin
//  - Metformin

logStockedMedications([]); // Test with empty array
// Output:
// Medications currently in stock:
//  - None
```
**(Copy button available in top-right corner)**

**Explanation:**

This function `logStockedMedications` uses a `for...of` loop to iterate through an array of medication names and log each one.

1.  **Purpose:** To demonstrate the concise and readable syntax of `for...of` for iterating over the elements (values) of an array, compared to a traditional index-based `for` loop.
2.  **Iterable:** The loop operates on the `medications` parameter, which is explicitly typed as an array of strings (`string[]`). Arrays are built-in iterable objects in JavaScript.
3.  **Loop Variable (`const medication`):** In each iteration, the `medication` variable automatically receives the *value* of the current element from the `medications` array. We use `const` because we are only reading the value, not modifying the loop variable itself within the loop body.
4.  **Iteration:** The loop automatically handles iterating through each element of the `inventory` array passed in the example usage. It starts with "Aspirin", then "Loratadine", "Simvastatin", and finally "Metformin". The loop terminates once all elements have been processed.
5.  **Simplicity:** Compare this to a traditional `for` loop:
    ```typescript
    // Traditional for loop equivalent
    for (let i = 0; i < medications.length; i++) {
      const medication = medications[i]; // Need to access element by index
      console.log(` - ${medication}`);
    }
    ```
    The `for...of` loop eliminates the need to manage an index variable (`i`) and access elements via `medications[i]`, making the code cleaner and less prone to off-by-one errors when you only need the values.
6.  **Early Exit:** The function includes an initial check (`if (medications.length === 0)`) to handle the case of an empty array gracefully by logging "None" and returning early, avoiding unnecessary loop setup.

---
<!-- Presenter notes for For In Loop slide -->
<!-- Explain `for...in` for iterating over the *keys* (property names) of an object. Mention potential pitfalls (includes inherited properties, order not guaranteed) and why `for...of` with `Object.keys/values/entries` is often preferred for objects. -->

## Iterating with `for...in`

The `for...in` loop iterates over the *enumerable property names (keys)* of an object.

**Syntax:**
`for (const key in object)`

-   `key`: A variable that will hold the property name (key) as a string in each iteration.
-   `object`: The object whose properties you want to iterate over.

> **Warning:** `for...in` iterates over inherited properties as well and the iteration order is not guaranteed. For iterating over an object's *own* properties or its values, it's often safer and clearer to use `Object.keys(obj)`, `Object.values(obj)`, or `Object.entries(obj)` in combination with `for...of` or array methods like `forEach`.

---
<!-- Presenter notes for For In Example slide -->
<!-- Show iterating over object keys. Point out that `key` is a string. Briefly mention `hasOwnProperty` check if discussing inherited properties (though maybe skip for brevity unless asked). -->

## `for...in` Example (TypeScript)

```typescript
/**
 * Logs the properties and values of a medication details object.
 * @param details - An object containing medication details.
 */
function logMedicationDetails(details: { [key: string]: any }): void {
  console.log("Medication Details:");

  // Iterate over the property names (keys) of the object
  for (const key in details) {
    // It's good practice to check if the property belongs directly to the object
    // and not to its prototype chain, although less critical for simple data objects.
    if (Object.prototype.hasOwnProperty.call(details, key)) {
      const value = details[key]; // Access the value using the key
      console.log(` - ${key}: ${value}`);
    }
  }
}

// Example Usage
const medicationInfo = {
  name: "Omeprazole",
  dosageForm: "Capsule",
  strength: "20mg",
  quantity: 60,
  isOtc: false // Over-the-counter?
};

logMedicationDetails(medicationInfo);
// Output:
// Medication Details:
//  - name: Omeprazole
//  - dosageForm: Capsule
//  - strength: 20mg
//  - quantity: 60
//  - isOtc: false
```
**(Copy button available in top-right corner)**

**Explanation:**

This function `logMedicationDetails` uses a `for...in` loop to iterate over the properties of an object containing medication information.

1.  **Purpose:** To demonstrate how `for...in` can be used to access the *names (keys)* of an object's properties dynamically.
2.  **Object Iteration:** The loop operates on the `details` object. The type annotation `{ [key: string]: any }` indicates an object with string keys and values of any type.
3.  **Loop Variable (`const key`):** In each iteration, the `key` variable automatically receives the *name* of a property from the `details` object as a **string**. For example, in the first iteration, `key` would be `"name"`, then `"dosageForm"`, `"strength"`, and so on.
4.  **Accessing Values:** Inside the loop, `details[key]` is used to access the *value* associated with the current property name stored in `key`. Bracket notation (`object[keyVariable]`) is necessary here because the property name is dynamic (stored in a variable). Dot notation (`object.key`) would literally look for a property named "key".
5.  **`hasOwnProperty` Check:** The `if (Object.prototype.hasOwnProperty.call(details, key))` check is included as a standard safeguard. `for...in` loops can iterate over properties inherited from the object's prototype chain. This check ensures that we only process properties that belong *directly* to the `details` object itself, ignoring inherited ones. While less critical for simple data objects created like `medicationInfo`, it's crucial for ensuring correctness when dealing with more complex objects or objects created using constructor functions or classes.
6.  **Order:** It's important to remember that the order in which `for...in` iterates over properties is **not guaranteed** by the JavaScript specification, although modern engines often iterate in insertion order for non-integer keys. Do not rely on a specific order. If order matters, consider using `Object.keys()` (which gives an array of keys, often in insertion order) and then iterating over that array.

---
<!-- Presenter notes for Context slide -->
<!-- Native Devs: Syntax is different (e.g., for/while loops in Swift/Kotlin), but concepts (if/else, switch, loops) are universal. Web Devs: Identical concepts, emphasize TS benefits again. -->

## Context for Developers

> **Native Dev Context:** (For Android/iOS Developers)
> The core concepts of conditional execution (`if`/`else`, `switch`/`when`) and looping (`for`, `while`) are fundamental in native development too, though the syntax differs (e.g., Swift's `for item in array`, Kotlin's `for (item in list)`, Java's enhanced `for`). JavaScript's `switch` requires explicit `break` statements, unlike Swift's default behavior. The `for...of` loop is conceptually similar to Swift's `for...in` on sequences or Kotlin/Java's enhanced for loop. `for...in` for object keys is less common in strictly typed native languages where object structures are usually known at compile time.

> **Web Dev Context:** (For React/Angular/Vue Developers)
> These control flow structures are identical to standard JavaScript (ES6+). If you're comfortable with JavaScript `if`, `switch`, `for`, and `while` loops, you'll use them the same way here. `for...of` is the preferred modern way to iterate over array values, often replacing traditional `for` loops with index access. Remember the potential pitfalls of `for...in` for objects; using `Object.keys/values/entries` with `for...of` or array methods is often preferred. TypeScript adds type safety around the conditions and variables used within these structures.

---
<!-- Presenter notes for Summary slide -->
<!-- Recap: if/else/switch for decisions, for/while/do-while for known/unknown iterations, for-of for iterable values, for-in for object keys. -->

## Summary

In this lesson, we explored how to control the flow of execution:

-   **Conditionals:** `if...else if...else` for branching logic, and `switch` for multi-way branching based on a single value.
-   **Loops:**
    -   `for`: Iterating a known number of times.
    -   `while`: Iterating as long as a condition is true (checked before).
    -   `do...while`: Iterating as long as a condition is true (checked after, runs at least once).
    -   `for...of`: Iterating over values of iterables (e.g., arrays).
    -   `for...in`: Iterating over keys (property names) of objects.

---
<!-- Presenter notes for Next Steps slide -->
<!-- Point to functions lesson. Encourage practice combining loops and conditionals. -->

## Next Steps

Practice combining conditional statements and loops to solve simple problems. How would you loop through a list of patients and check eligibility for each?

Proceed to **Lesson 03: Functions & Scope** to learn how to organize your code into reusable blocks.

**Further Reading:**
-   [MDN: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
-   [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
-   [TypeScript Handbook: Narrowing (Type Guards)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) (Relevant for `if` checks)