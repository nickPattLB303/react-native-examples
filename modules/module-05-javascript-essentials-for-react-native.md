# Module 5: JavaScript Essentials for React Native

JavaScript is the foundation of React Native development. This module provides a thorough understanding of modern JavaScript features that are crucial for writing efficient, maintainable React Native applications. We'll focus on ES6+ (ECMAScript 2015 and newer) concepts that you'll use daily in your React Native projects.

> 🛣️ **(All Learners):** This module serves as both a refresher and a focused guide to the JavaScript concepts most relevant to React Native development. If you're already comfortable with modern JavaScript, feel free to skim through the content while paying special attention to the practical examples and React Native-specific applications.

## Learning objectives

- Implement modern variable declarations using `let` and `const` instead of legacy `var`
- Apply control flow statements like conditionals and loops to create dynamic application logic
- Create functions using both traditional and arrow syntax while understanding scope and closures
- Manipulate objects and arrays using destructuring and spread/rest operators
- Implement asynchronous operations with callbacks, promises, and async/await
- Structure your code using ES6 modules with import and export statements

## Prerequisites

- Basic familiarity with programming concepts (variables, functions, loops)
- A working JavaScript environment (browser console or Node.js)
- For the exercises: Access to CodeSandbox (free account)

## Section 1: Variables, data types, and operators (ES6+ focus: let, const)

This section introduces how data is declared, stored, classified, and manipulated in JavaScript, with special emphasis on the modern ES6+ approaches to variable declaration.

### Introduction to variables

In JavaScript, variables serve as named containers for storing data values that can be referenced and manipulated throughout your program. Using variables allows you to work with data that may change during execution or needs to be accessed multiple times. Working with variables typically involves two steps:

1. Declaration: Introducing the variable name to the JavaScript engine
2. Initialization: Assigning an initial value to the variable

JavaScript offers three ways to declare variables: `var`, `let`, and `const`. While `var` was the original method, modern JavaScript (and React Native development) strongly favors `let` and `const`.

### The var keyword (legacy approach)

The `var` keyword was JavaScript's original method for declaring variables.

```javascript
var patientName = "John Doe";
var medicationCount;
```

`var` has several characteristics that make it problematic in modern applications:

- **Function or global scope**: Variables declared with `var` are either function-scoped (if declared within a function) or global-scoped (if declared outside any function).
- **Hoisting behavior**: `var` declarations are "hoisted" to the top of their scope. The variable exists throughout its entire scope, even before the declaration line.

```javascript
console.log(medication); // Outputs: undefined (not an error)
var medication = "Aspirin";
```

This behaves as if the code were written:

```javascript
var medication; // Declaration hoisted, initialized with undefined
console.log(medication); // Outputs: undefined
medication = "Aspirin"; // Assignment happens here
```

- **Re-declaration allowed**: You can declare the same variable multiple times without errors.

```javascript
var dosage = 10;
var dosage = 20; // No error, just overwrites the previous declaration
```

Due to these behaviors, `var` can lead to unexpected bugs and is generally avoided in modern JavaScript and React Native development.

### The let keyword (ES6+)

Introduced in ES6, `let` provides a more predictable way to declare variables:

```javascript
let patientCount = 5;
let nextAppointment;
```

Key features of `let`:

- **Block scope**: Variables declared with `let` are only accessible within the block (`{}`) in which they're defined.

```javascript
if (isPrescriptionValid) {
  let medicationName = "Lisinopril";
  console.log(medicationName); // Works fine
}
console.log(medicationName); // Error: medicationName is not defined
```

- **Temporal Dead Zone (TDZ)**: Unlike `var`, `let` variables cannot be accessed before their declaration.

```javascript
console.log(medicationDosage); // Error: Cannot access 'medicationDosage' before initialization
let medicationDosage = "20mg";
```

- **No re-declaration**: You cannot declare the same variable multiple times in the same scope.

```javascript
let patientAge = 25;
let patientAge = 30; // Error: Identifier 'patientAge' has already been declared
```

- **Re-assignment allowed**: You can change the value of a `let` variable after declaration.

```javascript
let pillCount = 30;
pillCount = 25; // This works fine
```

### The const keyword (ES6+)

Also introduced in ES6, `const` is used for variables whose values should not change after initialization:

```javascript
const PHARMACY_NAME = "SpeedyMeds";
const MAX_DOSAGE = 500;
```

Key features of `const`:

- **Block scope**: Like `let`, `const` variables are block-scoped.
- **Must be initialized**: You must provide a value when declaring a `const` variable.

```javascript
const PHARMACY_ID; // Error: Missing initializer in const declaration
```

- **No re-assignment**: The value cannot be changed through reassignment.

```javascript
const PRESCRIPTION_ID = "RX12345";
PRESCRIPTION_ID = "RX67890"; // Error: Assignment to constant variable
```

- **Mutable values**: While the binding is immutable, the content of objects and arrays can still be modified.

```javascript
const patient = { name: "Jane Doe", age: 45 };
patient.age = 46; // This works - we're modifying a property, not reassigning 'patient'

const medications = ["Lisinopril", "Atorvastatin"];
medications.push("Metformin"); // This works - we're modifying the array, not reassigning 'medications'
```

### Best practices for variable declarations

In modern JavaScript and React Native development:

- Use `const` by default for all variables
- Use `let` only when you need to reassign a value
- Avoid `var` completely
- Declare variables at the top of their scope for better readability
- Use meaningful, descriptive variable names

The shift from `var` to `let` and `const` represents one of the most significant improvements in JavaScript. The block-scoping and TDZ features make code more predictable and help catch errors earlier.

> 🌐 **(Web Developers):**
> **Comparison:** If you're coming from a React web background, the variable declaration concepts are identical. However, in React Native, you'll find yourself using these same patterns in a mobile context, often to manage component state, navigation parameters, and native module interactions.
>
> **Key Takeaway:** The same best practices apply: prefer `const`, use `let` when needed, and never use `var`.
>
> **Source:** [MDN Web Docs: Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)

The following table summarizes the differences between these three variable declaration keywords:

| Feature | `var` | `let` | `const` |
| ------- | ----- | ----- | ------- |
| Scope | Function or Global | Block (`{}`) | Block (`{}`) |
| Hoisting (Declaration) | Yes | Yes | Yes |
| Hoisting (Initialization) | Yes (to `undefined`) | No (in TDZ) | No (in TDZ) |
| Temporal Dead Zone (TDZ) | No | Yes | Yes |
| Re-declaration (same scope) | Yes | No (SyntaxError) | No (SyntaxError) |
| Re-assignment | Yes | Yes | No (TypeError) |
| Must be initialized? | No (defaults to `undefined`) | No | Yes (SyntaxError if not) |

### JavaScript data types

JavaScript is a dynamically-typed language, meaning variable types are determined at runtime based on their assigned values. Understanding JavaScript's data types is essential for effective React Native development.

Data types in JavaScript fall into two broad categories:

#### Primitive data types

Primitive types represent single, immutable values (though the variables holding them can be reassigned):

- **String**: Represents textual data.
  ```javascript
  const patientName = "John Smith";
  const medication = 'Lisinopril';
  const instructions = `Take ${dosage} tablet(s) daily`;  // Template literal (ES6+)
  ```
  Strings are immutable—operations like concatenation create new strings rather than modifying existing ones.

- **Number**: Represents both integers and floating-point numbers using a 64-bit format.
  ```javascript
  const dosage = 10;
  const temperature = 98.6;
  const negativeValue = -42;
  ```
  Special numeric values include `Infinity`, `-Infinity`, and `NaN` (Not-a-Number).

- **Boolean**: Represents logical values `true` or `false`.
  ```javascript
  const isPrescriptionValid = true;
  const isExpired = false;
  const isEligible = age > 18;  // Expression that evaluates to a boolean
  ```

- **Null**: Represents the intentional absence of any value.
  ```javascript
  const primaryPhysician = null;  // Patient has no assigned physician
  ```
  Note: `typeof null` returns `"object"` due to a historical JavaScript bug.

- **Undefined**: Represents a variable that has been declared but not assigned a value.
  ```javascript
  let nextAppointment;  // Value is undefined
  console.log(nextAppointment);  // undefined
  ```

- **Symbol** (ES6+): Represents a unique identifier, useful for object properties.
  ```javascript
  const patientIdSymbol = Symbol("patientId");
  const medicalRecordMap = {
    [patientIdSymbol]: "12345"
  };
  ```

- **BigInt** (ES2020+): Represents integers of arbitrary precision.
  ```javascript
  const largeInventoryCount = 9007199254740991n;
  ```

#### Object type (reference type)

Objects are collections of properties and methods:

```javascript
const patient = {
  name: "Maria Garcia",
  age: 42,
  medications: ["Metformin", "Atorvastatin"],
  isAllergic: false,
  updateAge: function(newAge) {
    this.age = newAge;
  }
};
```

The object type encompasses:
- Regular objects (`{}`)
- Arrays (`[]`)
- Functions
- Dates
- Regular expressions
- Many more specialized types

Unlike primitive values, objects are stored by reference. When you assign an object to a variable, you're storing a reference to the object's location in memory, not the object itself.

```javascript
const patient1 = { name: "John", age: 45 };
const patient2 = patient1;  // Both variables reference the same object

patient2.age = 46;
console.log(patient1.age);  // 46 - the change affects both variables
```

Understanding this distinction is crucial in React Native development, particularly when working with component state and props.

### JavaScript operators

JavaScript provides various operators for performing operations on values:

#### Assignment operators

Used to assign values to variables:

```javascript
let dosage = 10;  // Basic assignment
dosage += 5;      // Same as: dosage = dosage + 5;
dosage -= 2;      // Same as: dosage = dosage - 2;
dosage *= 2;      // Same as: dosage = dosage * 2;
dosage /= 4;      // Same as: dosage = dosage / 4;
```

ES2021+ adds logical assignment operators:
```javascript
let patientName = inputName || "Unknown";  // Assign "Unknown" if inputName is falsy
let quantity ||= 1;  // Assign 1 only if quantity is falsy
let count ??= 0;  // Assign 0 only if count is null or undefined
```

#### Comparison operators

Used to compare values:

```javascript
const isDosageSafe = prescribedDosage <= MAX_DOSAGE;

// Equality operators
"5" == 5;   // true (loose equality, converts types)
"5" === 5;  // false (strict equality, checks both value and type)

// Inequality operators
"5" != 5;   // false (loose inequality)
"5" !== 5;  // true (strict inequality)
```

Always prefer `===` and `!==` over `==` and `!=` to avoid unexpected behavior due to type coercion.

#### Arithmetic operators

Used for mathematical operations:

```javascript
const totalDosage = dailyDosage * daysSupplied;
const remainingPills = startingCount - pillsTaken;
const combinedDosage = morningDose + eveningDose;
const hourlyRate = totalDose / 24;
const remainder = pillCount % bottleSize;  // Modulus (remainder)
const area = side ** 2;  // Exponentiation (ES2016+)
```

#### Logical operators

Used primarily with boolean values:

```javascript
const canPrescribe = isLicensed && hasAuthority;  // Logical AND
const needsRefill = isLow || isEmpty;  // Logical OR
const isNotExpired = !isExpired;  // Logical NOT
```

`&&` and `||` exhibit short-circuit behavior—the second operand is evaluated only if necessary.

#### Conditional (ternary) operator

Provides a concise way to write simple if-else statements:

```javascript
const message = isEligible ? "Approved" : "Denied";

// Equivalent to:
let message;
if (isEligible) {
  message = "Approved";
} else {
  message = "Denied";
}
```

#### typeof operator

Returns a string indicating the data type:

```javascript
typeof "Aspirin"  // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof { name: "John" }  // "object"
typeof []         // "object" (arrays are objects)
typeof function() {}  // "function"
```

Note the quirk that `typeof null` returns `"object"`, not `"null"`.

When working in React Native, you'll use these operators extensively for conditional rendering, calculating values for layouts, checking prop types, and more.

## Section 2: Control flow (conditionals, loops)

Control flow statements determine the order in which code is executed, enabling your application to make decisions and repeat operations based on different conditions.

### Conditional statements

Conditional statements execute different code blocks based on specified conditions.

#### The if statement

The simplest conditional, executing code only when a condition is true:

```javascript
if (patientAge >= 18) {
  console.log("Adult prescription protocol");
}
```

#### The if...else statement

Executes one block if the condition is true, and another if it's false:

```javascript
if (patientTemperature > 100.4) {
  console.log("Fever detected");
} else {
  console.log("Temperature normal");
}
```

#### The if...else if...else statement

Tests multiple conditions in sequence:

```javascript
if (bmi < 18.5) {
  console.log("Underweight");
} else if (bmi < 25) {
  console.log("Normal weight");
} else if (bmi < 30) {
  console.log("Overweight");
} else {
  console.log("Obese");
}
```

> [!TIP]
> Always use block statements (`{}`) for conditional code, even for single-line statements. This improves readability and prevents errors when adding more lines later.

#### Truthy and falsy values

In JavaScript, conditions aren't limited to boolean expressions. Any value can be used as a condition through type coercion to a boolean:

**Falsy values** (convert to `false`):
- `false`
- `0`, `-0`
- `0n` (BigInt zero)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Truthy values** (convert to `true`):
- Everything else, including:
  - All non-empty strings
  - All numbers except 0, -0
  - All objects (even empty objects `{}`)
  - All arrays (even empty arrays `[]`)
  - All functions

This behavior enables convenient conditionals like:

```javascript
// Check if array has items
if (medicationList.length) {
  // Only runs if length is not 0 (truthy)
  displayMedications(medicationList);
}

// Check if variable has a value
if (patientName) {
  // Only runs if patientName is not empty, null, or undefined
  greetPatient(patientName);
}
```

#### The switch statement

Used when comparing a single expression against multiple possible values:

```javascript
switch (medicationStatus) {
  case "active":
    console.log("Medication is currently prescribed");
    break;
  case "discontinued":
    console.log("Medication has been stopped");
    break;
  case "pending":
    console.log("Prescription is awaiting approval");
    break;
  default:
    console.log("Unknown medication status");
}
```

The `break` statement is critical—without it, execution would "fall through" to the next case, regardless of whether it matches. This behavior can be useful in some cases:

```javascript
switch (severity) {
  case "severe":
    notifyPhysician();
    // Fall through (no break)
  case "moderate":
    scheduleLab();
    // Fall through
  case "mild":
    documentSymptoms();
    break;
  default:
    requestMoreInfo();
}
```

In this example, "severe" cases will execute all three functions, "moderate" cases will execute two, and "mild" cases just one.

The following table summarizes JavaScript's truthy and falsy values:

| Value | Type | Truthiness | Notes |
| ----- | ---- | ---------- | ----- |
| `false` | Boolean | Falsy | |
| `0` | Number | Falsy | |
| `-0` | Number | Falsy | |
| `0n` | BigInt | Falsy | |
| `""` | String | Falsy | Empty string |
| `null` | Null | Falsy | |
| `undefined` | Undefined | Falsy | |
| `NaN` | Number | Falsy | Not-a-Number |
| `true` | Boolean | Truthy | |
| `"hello"` | String | Truthy | Non-empty string |
| `"0"` | String | Truthy | Non-empty string (even if looks numeric) |
| `42` | Number | Truthy | Non-zero number |
| `-42` | Number | Truthy | Non-zero number |
| `{}` | Object | Truthy | Any object, including empty object |
| `[]` | Object | Truthy | Any array, including empty array |
| `function(){}` | Function | Truthy | Any function |

### Looping constructs

Loops repeat a block of code based on specified conditions, allowing you to process collections of data or execute code until a condition is met.

#### The for loop

Ideal when you know the number of iterations in advance:

```javascript
// Display medication schedule for the week
for (let day = 1; day <= 7; day++) {
  console.log(`Day ${day}: Take medication at 8:00 AM`);
}
```

The `for` loop has three parts:
1. **Initialization**: Executed once before the loop begins (`let day = 1`)
2. **Condition**: Evaluated before each iteration; the loop continues as long as it's true (`day <= 7`)
3. **Afterthought**: Executed at the end of each iteration (`day++`)

#### The while loop

Repeats as long as a specified condition is true:

```javascript
let remainingRefills = 3;

while (remainingRefills > 0) {
  console.log(`Refills remaining: ${remainingRefills}`);
  remainingRefills--;
}
```

The condition is checked before each iteration, so if it's initially false, the loop body never executes.

#### The do...while loop

Similar to `while`, but guarantees the loop body executes at least once:

```javascript
let dosage = calculateInitialDosage();

do {
  administerdosage(dosage);
  dosage = adjustDosage(dosage, patientResponse);
} while (patientResponse !== "optimal" && dosage <= maxDosage);
```

The condition is checked after the loop body executes, ensuring the loop runs at least once regardless of the initial condition.

#### The break and continue statements

- `break`: Immediately exits the loop
- `continue`: Skips to the next iteration

```javascript
// Check medication inventory
for (let i = 0; i < medications.length; i++) {
  if (medications[i].isExpired) {
    console.log(`${medications[i].name} is expired - skipping`);
    continue; // Skip to next iteration
  }
  
  if (medications[i].stock <= 0) {
    console.log("Found medication out of stock - alerting inventory");
    break; // Exit the loop entirely
  }
  
  addToAvailableList(medications[i]);
}
```

#### Labeled statements (with break and continue)

Useful for controlling nested loops:

```javascript
patientLoop: for (let p = 0; p < patients.length; p++) {
  medicationLoop: for (let m = 0; m < patients[p].medications.length; m++) {
    if (patients[p].medications[m].isRecalled) {
      console.log(`Found recalled medication for patient ${patients[p].name}`);
      break patientLoop; // Exits both loops
    }
  }
}
```

#### The for...in loop

Iterates over the enumerable property names (keys) of an object:

```javascript
const patient = {
  name: "Sarah Johnson",
  age: 65,
  conditions: ["hypertension", "arthritis"],
  activeMedications: true
};

for (const key in patient) {
  console.log(`${key}: ${patient[key]}`);
}
// Outputs:
// name: Sarah Johnson
// age: 65
// conditions: hypertension,arthritis
// activeMedications: true
```

Important considerations for `for...in`:
- The order of iteration is not guaranteed
- It iterates over inherited properties as well (use `hasOwnProperty()` to filter)
- Not recommended for arrays, as it can include non-index properties

#### The for...of loop (ES6+)

Iterates over the values of iterable objects (arrays, strings, etc.):

```javascript
const medications = ["Lisinopril", "Metformin", "Simvastatin"];

for (const medication of medications) {
  console.log(`Checking inventory for: ${medication}`);
}
```

To iterate over object properties with `for...of`, you can use methods like `Object.keys()`, `Object.values()`, or `Object.entries()`:

```javascript
const prescription = {
  medication: "Amoxicillin",
  dosage: "500mg",
  frequency: "3 times daily"
};

// Iterate over keys
for (const key of Object.keys(prescription)) {
  console.log(key);
}

// Iterate over values
for (const value of Object.values(prescription)) {
  console.log(value);
}

// Iterate over key-value pairs
for (const [key, value] of Object.entries(prescription)) {
  console.log(`${key}: ${value}`);
}
```

The following table summarizes the different loop types:

| Loop Type | Syntax | Primary Use Case | Condition Check | Executes At Least Once? |
| --------- | ------ | ---------------- | --------------- | ----------------------- |
| `for` | `for (init; cond; afterthought) {...}` | Known number of iterations | Before each iteration | No (if cond is initially false) |
| `while` | `while (condition) {...}` | Iterations based on a condition | Before each iteration | No (if cond is initially false) |
| `do...while` | `do {...} while (condition);` | Iterations based on a condition | After each iteration | Yes |
| `for...in` | `for (const key in object) {...}` | Iterating over object property names | Implicit (for each key) | No (if object has no enumerable properties) |
| `for...of` | `for (const value of iterable) {...}` | Iterating over values of iterables | Implicit (for each value) | No (if iterable is empty) |

> 🌐 **(Web Developers):**
> **Comparison:** While these control flow constructs work identically in React Native and web React, the applications differ. In React Native, loops are commonly used for rendering lists of components like medications in a pharmacy app, while conditionals often determine which native UI components to display based on platform or user permissions.
>
> **Key Takeaway:** Prefer declarative patterns like `Array.map()` and conditional rendering over imperative loops and conditions when creating UI in React Native.
>
> **Source:** [React Native Docs: FlatList](https://reactnative.dev/docs/flatlist)

## Section 3: Functions (arrow functions, scope, closures)

Functions are fundamental building blocks in JavaScript, allowing you to encapsulate, reuse, and organize code. This section covers modern function syntax, parameter handling, scope, and closures—concepts that are essential for effective React Native development.

### Function definition methods

JavaScript offers several ways to define functions, each with distinct characteristics.

#### Function declarations

The traditional way to define a named function:

```javascript
function calculateDosage(weight, factor) {
  return weight * factor / 50;
}

// Can be called anywhere in the same scope, even before the declaration
const pediatricDose = calculateDosage(25, 0.8);
```

Key features:
- **Function name is required**
- **Fully hoisted**: The entire function (name and body) is moved to the top of its scope during compilation
- Can be called anywhere in its scope, even before the declaration in the code

#### Function expressions

Defines a function as part of an expression, typically assigned to a variable:

```javascript
const calculateBMI = function(weight, height) {
  return weight / (height * height);
};

// Named function expression - name is only accessible inside the function
const factorial = function calcFactorial(n) {
  if (n <= 1) return 1;
  return n * calcFactorial(n - 1); // Recursion using the function name
};

// Must be called after declaration
const patientBMI = calculateBMI(70, 1.75);
```

Key features:
- **Can be anonymous** or have a name (named function expressions)
- **Not hoisted** like declarations (only the variable is hoisted, not the function assignment)
- Must be defined before being called

#### Arrow functions (ES6+)

Introduced in ES6, arrow functions provide a more concise syntax for writing functions:

```javascript
// Basic arrow function
const multiply = (a, b) => a * b;

// With multiple statements, use curly braces and explicit return
const checkDosage = (prescribed, max) => {
  const isValid = prescribed <= max;
  return isValid ? "Dosage OK" : "Exceeds maximum";
};

// Single parameter - parentheses can be omitted
const double = x => x * 2;

// No parameters - empty parentheses required
const getDefaultDosage = () => 500;

// Returning an object literal - wrap in parentheses
const createPatient = (name, age) => ({ name, age });
```

Key features:
- **Concise syntax**: Often shorter than traditional functions
- **Implicit return**: With single expressions (no curly braces), the result is automatically returned
- **Lexical `this`**: `this` is inherited from the surrounding code (explained in detail later)
- **Cannot be used as constructors** with `new`
- **No `arguments` object**: Use rest parameters instead

> [!NOTE]
> For simple, short functions (especially callbacks), arrow functions are preferred in modern JavaScript. For methods on objects or constructor functions, traditional function syntax is often more appropriate.

### Function parameters

Parameters are placeholders for values that a function expects to receive when called.

#### Basic parameters and arguments

```javascript
function administerMedication(patientName, medicationName, dosage) {
  console.log(`Administering ${dosage} of ${medicationName} to ${patientName}`);
}

// Call with arguments
administerMedication("Jane Smith", "Ibuprofen", "400mg");
```

If fewer arguments are passed than parameters defined, the unpassed parameters have the value `undefined`:

```javascript
administerMedication("Jane Smith", "Ibuprofen");
// Outputs: "Administering undefined of Ibuprofen to Jane Smith"
```

#### Default parameters (ES6+)

Allow you to specify fallback values for parameters that aren't provided:

```javascript
function createPrescription(medication, dosage = "100mg", quantity = 30, refills = 0) {
  return {
    medication,
    dosage,
    quantity,
    refills
  };
}

// Only the first parameter is provided, others use defaults
const prescription = createPrescription("Lisinopril");
console.log(prescription);
// Output: { medication: "Lisinopril", dosage: "100mg", quantity: 30, refills: 0 }
```

Default parameters are evaluated at call time, not when the function is defined:

```javascript
function logAppointment(patientId, date = new Date()) {
  console.log(`Appointment for patient ${patientId} at ${date}`);
}

// Each call gets the current time
logAppointment("P12345"); // Uses current date/time
```

Default parameters can also reference earlier parameters:

```javascript
function calculateTotalDosage(dosePerDay, days = 7, total = dosePerDay * days) {
  return { dosePerDay, days, total };
}

console.log(calculateTotalDosage(2));
// Output: { dosePerDay: 2, days: 7, total: 14 }
```

#### Rest parameters (ES6+)

Allow a function to accept an indefinite number of arguments as an array:

```javascript
function trackMedications(patientId, ...medications) {
  console.log(`Patient ${patientId} is taking:`);
  medications.forEach(med => console.log(`- ${med}`));
}

trackMedications("P12345", "Lisinopril", "Metformin", "Aspirin");
// Output:
// Patient P12345 is taking:
// - Lisinopril
// - Metformin
// - Aspirin
```

Key features of rest parameters:
- Must be the last parameter in the function definition
- Collects all remaining arguments into a proper Array
- Preferable to the older `arguments` object, which is array-like but not a true array

### Return values

Functions can return a value to the caller using the `return` statement:

```javascript
function calculateBMI(weight, height) {
  return weight / (height * height);
}

const bmi = calculateBMI(70, 1.75);
console.log(bmi); // 22.86
```

Key points about return values:

- Functions can return any JavaScript type (primitives, objects, arrays, or even other functions)
- A function can only return a single value. To return multiple values, group them in an object or array:

```javascript
function analyzeBloodPressure(systolic, diastolic) {
  let category;
  if (systolic < 120 && diastolic < 80) {
    category = "Normal";
  } else if (systolic < 130 && diastolic < 80) {
    category = "Elevated";
  } else {
    category = "High";
