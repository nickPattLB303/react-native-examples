## Section 3: Functions

Functions are fundamental building blocks in JavaScript. They are reusable blocks of code that perform a specific task or calculate a value. By encapsulating logic within functions, you can make your code more organized, readable, and maintainable. This section explores how to define and use functions, with a special focus on modern ES6 features like arrow functions, and important concepts like scope and closures.

### Defining and Calling Functions

There are several ways to define functions in JavaScript.

#### Function Declarations

A function declaration defines a named function. These declarations are hoisted, meaning they can be called before they are defined in the code.

```javascript
// Function Declaration
function greetPatient(patientName) {
  return `Welcome to SpeedyMeds, ${patientName}!`;
}

// Calling the function
let welcomeMessage = greetPatient("Maria Rodriguez");
console.log(welcomeMessage); // Output: Welcome to SpeedyMeds, Maria Rodriguez!
```

#### Function Expressions

A function can also be defined as part of an expression, typically by assigning an anonymous function (a function without a name) or a named function to a variable. Function expressions are not hoisted.

```javascript
// Function Expression (anonymous)
const calculateDosage = function (weightKg, dosagePerKg) {
  return weightKg * dosagePerKg;
};

let requiredDosage = calculateDosage(70, 2); // 70kg patient, 2mg/kg dosage
console.log(`Required dosage: ${requiredDosage}mg`); // Output: Required dosage: 140mg

// Function Expression (named - useful for debugging)
const getMedicationInfo = function medicationInfo(medicationId) {
  // Imagine fetching info from a database
  if (medicationId === "AMX250") {
    return "Amoxicillin 250mg";
  }
  return "Medication not found";
};
console.log(getMedicationInfo("AMX250")); // Output: Amoxicillin 250mg
```

### Parameters and Arguments

- **Parameters:** These are the names listed in the function definition. They act as placeholders for the values that will be passed to the function when it's called.
- **Arguments:** These are the actual values passed to the function when it is invoked.

#### Default Parameters (ES6)

You can assign default values to function parameters. If an argument for that parameter is not provided when the function is called, the default value is used.

```javascript
function scheduleRefill(patientId, medicationName, daysSupply = 30) {
  console.log(
    `Scheduling a ${daysSupply}-day refill for ${medicationName} for patient ${patientId}.`
  );
}

scheduleRefill("P001", "Lisinopril");
// Output: Scheduling a 30-day refill for Lisinopril for patient P001.
scheduleRefill("P002", "Metformin", 90);
// Output: Scheduling a 90-day refill for Metformin for patient P002.
```

### Return Values

A function can return a value using the `return` statement. If a function doesn't have a `return` statement, or has a `return` statement without an expression, it implicitly returns `undefined`.

```javascript
function isMedicationInStock(medicationName) {
  // Simplified stock check
  const stock = {
    Amoxicillin: 100,
    Ibuprofen: 50,
  };
  if (stock[medicationName] > 0) {
    return true;
  }
  // No explicit else return, implies return undefined if not in stock, but better to be explicit:
  return false;
}

console.log(`Is Amoxicillin in stock? ${isMedicationInStock("Amoxicillin")}`); // Output: Is Amoxicillin in stock? true
console.log(`Is Aspirin in stock? ${isMedicationInStock("Aspirin")}`); // Output: Is Aspirin in stock? false
```

### Arrow Functions (ES6)

Arrow functions provide a more concise syntax for writing function expressions. They are particularly useful for simple functions and have a significant difference in how they handle the `this` keyword, which is crucial in React and React Native.

**Syntax Variations:**

- No parameters: `() => expression`
- One parameter: `param => expression` or `(param) => expression`
- Multiple parameters: `(param1, param2) => expression`
- With a function body (multiple statements): `(param1, param2) => { statements; return value; }`
- Implicit return (for single expression): `(param1, param2) => param1 + param2` (returns the sum)
- Returning an object literal: `() => ({ key: 'value' })` (note the parentheses around the object)

```javascript
// Traditional function expression
const add = function (a, b) {
  return a + b;
};

// Arrow function equivalent
const addArrow = (a, b) => a + b;
console.log(addArrow(5, 3)); // Output: 8

const getPatientSummary = (patientName, age) =>
  `Patient: ${patientName}, Age: ${age}`;
console.log(getPatientSummary("David Lee", 45)); // Output: Patient: David Lee, Age: 45

const processOrder = (orderId) => {
  console.log(`Processing order ${orderId}...`);
  // ... more logic
  return { orderId: orderId, status: "Processed" };
};
console.log(processOrder("ORD123")); // Output: Processing order ORD123... { orderId: 'ORD123', status: 'Processed' }
```

**Key Differences from Traditional Functions:**

- **Lexical `this` Binding:** Arrow functions do not have their own `this` context. Instead, `this` is inherited from the enclosing (lexical) scope. This behavior is very helpful in object methods and especially in React components when dealing with event handlers, as it avoids the common confusion with `this` in traditional functions.
- **No `arguments` Object:** Arrow functions do not have access to the `arguments` object (an array-like object containing all arguments passed to the function). You can use ES6 rest parameters (`...params`) instead.
- **Cannot be used as Constructors:** You cannot use an arrow function with the `new` keyword to create objects.
- **No `prototype` Property:** Arrow functions do not have a `prototype` property.

> [!IMPORTANT]
> The lexical `this` binding of arrow functions is a significant advantage in many scenarios, especially in event handlers within frameworks like React and React Native, as it often simplifies context management.

### Scope

Scope determines the accessibility (visibility) of variables and functions at various parts of your code during runtime.

- **Global Scope:** Variables declared outside any function or block have global scope. They can be accessed from anywhere in your JavaScript code. It's generally good practice to minimize the use of global variables to avoid naming conflicts.
- **Function Scope (Local Scope):** Variables declared within a function (using `var`, or `let`/`const` before ES6 behavior was common) are only accessible within that function.
- **Block Scope (ES6):** Variables declared with `let` and `const` inside a block (e.g., within an `if` statement or a `for` loop, denoted by `{}`) are only accessible within that block.

```javascript
let pharmacyLocation = "Main Street Branch"; // Global scope

function dispenseMedication(medication) {
  let dispensingStation = "Counter 3"; // Function scope (local to dispenseMedication)
  console.log(
    `Dispensing ${medication} from ${dispensingStation} at ${pharmacyLocation}.`
  );

  if (medication === "ControlledSubstance") {
    let requiresPharmacistApproval = true; // Block scope (local to if block)
    console.log(`Pharmacist approval required: ${requiresPharmacistApproval}`);
  }
  // console.log(requiresPharmacistApproval); // Error: requiresPharmacistApproval is not defined here
}

dispenseMedication("Amoxicillin");
// console.log(dispensingStation); // Error: dispensingStation is not defined here
```

**Lexical Scoping (Static Scope):** JavaScript uses lexical scoping, which means that the scope of a variable is determined by its position within the nested structure of functions at the time the code is written (lexically), not when it's executed. Inner functions have access to variables and parameters of their outer functions.

### Closures

A closure is a powerful JavaScript feature where an inner function has access to its outer (enclosing) function's variables and parameters, even after the outer function has finished executing and returned.

In essence, a closure "remembers" the environment (the lexical scope) in which it was created.

**How Closures Work:**

1.  An outer function defines an inner function.
2.  The inner function has access to the outer function's variables and parameters.
3.  The outer function returns the inner function (or otherwise makes it available to be called later).
4.  When the inner function is eventually called (even if the outer function has completed), it can still access and use the variables from its original lexical scope (the outer function's scope).

**Practical Uses of Closures:**

- **Data Encapsulation and Privacy:** Creating private variables that can only be accessed through specific methods.
- **Creating Functions with Persistent State:** Useful for counters, generators, or maintaining state between function calls without using global variables.
- **Event Handlers and Callbacks:** Often used in scenarios where a function needs to access variables from its surrounding context when it's executed later (e.g., in response to an event).

```javascript
function createPrescriptionTracker(medicationName) {
  let prescriptionsFilled = 0; // This variable is private to the closure

  return function fillPrescription(patientName) {
    prescriptionsFilled++;
    console.log(
      `${medicationName} prescription #${prescriptionsFilled} filled for ${patientName}.`
    );
    return prescriptionsFilled;
  };
}

// Create a specific tracker for Amoxicillin
const trackAmoxicillin = createPrescriptionTracker("Amoxicillin");

trackAmoxicillin("John Doe"); // Output: Amoxicillin prescription #1 filled for John Doe.
trackAmoxicillin("Jane Smith"); // Output: Amoxicillin prescription #2 filled for Jane Smith.
let totalAmoxicillinFilled = trackAmoxicillin("Robert Brown"); // Output: Amoxicillin prescription #3 filled for Robert Brown.
console.log(`Total Amoxicillin filled: ${totalAmoxicillinFilled}`); // Output: Total Amoxicillin filled: 3

// Create another independent tracker for Lisinopril
const trackLisinopril = createPrescriptionTracker("Lisinopril");
trackLisinopril("Alice Green"); // Output: Lisinopril prescription #1 filled for Alice Green.

// prescriptionsFilled directly is not accessible here:
// console.log(prescriptionsFilled); // Error: prescriptionsFilled is not defined
```

In this example, `fillPrescription` is a closure. It has access to `medicationName` and `prescriptionsFilled` from its lexical scope (the `createPrescriptionTracker` function), even after `createPrescriptionTracker` has returned. Each call to `createPrescriptionTracker` creates a new, independent closure with its own `prescriptionsFilled` counter.

### Higher-Order Functions

A higher-order function is a function that either:

1.  Takes one or more functions as arguments, OR
2.  Returns a function as its result.

Closures are often created by higher-order functions (like `createPrescriptionTracker` above, which returns a function). Many built-in JavaScript array methods like `map()`, `filter()`, and `reduce()` are also higher-order functions because they take a callback function as an argument. We will explore these array methods in the next section.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
> - [MDN Web Docs: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> - [MDN Web Docs: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
> - [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

### Exercise 5.1: Function Practice

Apply your understanding of JavaScript functions by completing the exercises in CodeSandbox. This exercise will involve creating functions related to pharmacy operations, practicing parameters, return values, and potentially closures.

**(https://codesandbox.io/s/module-5-exercise-1-function-practice-placeholder-g9x2z)**

_(Note: The CodeSandbox link is a placeholder. A functional CodeSandbox with the exercise prompt will be provided in the actual course materials.)_

**Instructions for Exercise 5.1 (to be placed in CodeSandbox `README.md`):**

```markdown
# Exercise 5.1: Function Practice - SpeedyMeds Pharmacy

## Objective

Practice defining and using various types of JavaScript functions, including parameters, return values, arrow functions, and a simple closure, all within the context of the SpeedyMeds pharmacy theme.

## Tasks

1.  **`getMedicationLabel(medicationName, patientName, dosage)`**

    - Define a traditional function declaration named `getMedicationLabel`.
    - It should accept three parameters: `medicationName` (string), `patientName` (string), and `dosage` (string, e.g., "10mg").
    - The function should return a formatted string for a medication label, for example: "Medication: Amoxicillin - Patient: John Doe - Dosage: 250mg".
    - Call this function with sample data and log the result to the console.

2.  **`isEligibleForRefill(lastFilledDate, daysSupply)`**

    - Define an arrow function named `isEligibleForRefill`.
    - It should accept two parameters: `lastFilledDate` (a JavaScript `Date` object) and `daysSupply` (number).
    - The function should determine if a refill is due. A refill is due if the `lastFilledDate` plus `daysSupply` is before or on the current date.
    - Return `true` if eligible, `false` otherwise.
    - _Hint:_ You can create a `Date` object for today: `new Date()`. To add days to `lastFilledDate`, you might create a new date object from it and use `setDate(lastFilledDate.getDate() + daysSupply)`.
    - Call this function with sample data (e.g., a `lastFilledDate` that is 35 days ago for a 30-day supply) and log the result.

3.  **`createPatientIdGenerator(prefix)`**
    - Define a function named `createPatientIdGenerator` that demonstrates a closure.
    - This function should accept one parameter: `prefix` (string, e.g., "SM").
    - It should return _another function_. This inner function, when called, should generate a patient ID by concatenating the `prefix`, a hyphen, and an incrementing number (starting from 1).
    - Each call to the _returned_ function should generate the next ID in the sequence for that specific prefix.
    - Create two separate ID generators with different prefixes (e.g., `smGenerator` for "SM" and `phGenerator` for "PH").
    - Call each generator a few times and log the generated IDs to show they maintain their own sequence.

## Getting Started

1.  Open the `index.js` file.
2.  Implement the functions as described above.
3.  Use `console.log()` to display the outputs of your function calls.
4.  Check the console in CodeSandbox to see your results.

Good luck!
```

### Next Steps

Functions are a cornerstone of JavaScript. Now that you can create and manage them effectively, let's move on to another crucial aspect: working with complex data structures. Proceed to [Section 4: Objects and Arrays](./section-04-objects-and-arrays.md) to learn how to organize and manipulate collections of data.
