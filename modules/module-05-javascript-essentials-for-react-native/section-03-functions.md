## Section 3: Functions

Functions are fundamental building blocks in JavaScript. They are reusable blocks of code that perform a specific task or calculate a value. By encapsulating logic within functions, you can make your code more organized, readable, and maintainable. This section explores how to define and use functions, with a special focus on modern ES6 features like arrow functions, and important concepts like scope and closures.

### Defining and Calling Functions

There are several ways to define functions in JavaScript.

#### Function Declarations

A function declaration defines a named function. These declarations are **hoisted**, meaning the entire function definition (name and body) is conceptually moved to the top of its enclosing scope (function or global) by the JavaScript engine before the code is executed. This allows you to call a declared function _before_ its textual definition in the code.

```javascript
// Calling the function before declaration (hoisting makes this work)
let welcomeMessage = greetPatient("Maria Rodriguez");
console.log(welcomeMessage); // Output: Welcome to SpeedyMeds, Maria Rodriguez!

// Function Declaration
function greetPatient(patientName) {
  return `Welcome to SpeedyMeds, ${patientName}!`;
}

// Calling the function
console.log(greetPatient("Maria Rodriguez")); // Output: Welcome to SpeedyMeds, Maria Rodriguez!

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

**Hoisting Differences: Declarations vs. Expressions:**

- **Function Declarations:** Fully hoisted (name and body). Callable anywhere in their scope.
- **Function Expressions:** Only the variable declaration (`var`, `let`, or `const`) is hoisted, not the function assignment itself.
  - If assigned to `var`, the variable is initialized to `undefined` until the assignment line. Calling it before assignment results in a `TypeError` (`variable is not a function`).
  - If assigned to `let` or `const`, the variable enters the Temporal Dead Zone (TDZ) until the assignment line. Calling it before assignment results in a `ReferenceError`.

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

#### Rest Parameters (`...`) (ES6)

Rest parameters allow a function to accept an indefinite number of arguments as an **array**. This provides a cleaner way to handle variadic functions (functions that accept a variable number of arguments) compared to the older `arguments` object.

- **Syntax:** Use three dots (`...`) followed by the name of the array that will hold the arguments.
- **Position:** The rest parameter must be the **last** parameter in the function definition.
- **Type:** The collected parameter is a true `Array` instance, so you can use array methods like `map`, `filter`, `reduce` directly on it.

```javascript
function sumAll(...numbers) {
  // 'numbers' is an array containing all arguments passed
  console.log("Arguments received:", numbers); // e.g., [ 1, 5, 10, 3 ]
  return numbers.reduce((sum, current) => sum + current, 0);
}

console.log(sumAll(1, 5, 10, 3)); // Output: Arguments received: [ 1, 5, 10, 3 ] -> 19
console.log(sumAll(10, 20)); // Output: Arguments received: [ 10, 20 ] -> 30

// Can be used with other parameters
function logMedicationBatch(batchId, ...validationCodes) {
  console.log(`Processing Batch ID: ${batchId}`);
  console.log(`Validation Codes: ${validationCodes.join(", ")}`);
}

logMedicationBatch("B10X5", "VC01", "VC07", "VC12");
// Output:
// Processing Batch ID: B10X5
// Validation Codes: VC01, VC07, VC12
```

#### The `arguments` Object (Legacy)

Before rest parameters, the `arguments` object was the primary way to access all arguments passed to a **regular function** (not arrow functions).

- **Availability:** Available only inside **non-arrow** functions.
- **Type:** It's an **array-like** object, not a true array. This means it has a `length` property and indexed elements (e.g., `arguments[0]`), but it lacks standard array methods like `map`, `forEach`, `filter` directly (though they can be used via `Array.prototype.method.call(arguments, ...)`).
- **Content:** Contains _all_ arguments passed to the function, regardless of the number of named parameters defined.

```javascript
function logAllArgs() {
  console.log("Number of arguments:", arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    console.log(`Argument ${i}: ${arguments[i]}`);
  }
}

logAllArgs("hello", true, 100);
// Output:
// Number of arguments: 3
// Argument 0: hello
// Argument 1: true
// Argument 2: 100
```

> [!NOTE]
> In modern JavaScript (ES6+), **prefer rest parameters (`...`)** over the `arguments` object. Rest parameters are more explicit, provide a true array, and work in all function types including arrow functions.

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

**Key Differences from Traditional Functions (Recap & `this` Details):**

- **Lexical `this` Binding:** This is the most significant difference. Arrow functions **do not** have their own `this` value. Instead, `this` is **lexically inherited** from the surrounding (enclosing) non-arrow function scope at the time the arrow function is _defined_. The value of `this` inside an arrow function cannot be changed using methods like `call`, `apply`, or `bind`.
- **No `arguments` Object:** Use rest parameters (`...args`) instead.
- **Cannot be used as Constructors:** Arrow functions throw a `TypeError` if used with `new`.
- **No `prototype` Property:** Arrow functions do not have a `prototype` property.

### The `this` Keyword Explained

The `this` keyword is a common source of confusion in JavaScript because its value is determined dynamically by **how a function is called** (its invocation context), especially for traditional functions.

#### `this` in Regular Functions (Declarations & Expressions)

1.  **Global Context (Standalone Call):** When a regular function is called standalone (not as an object method, not with `new`), `this` usually refers to the global object (`window` in browsers, `global` in Node.js) in non-strict mode. In **strict mode (`'use strict';`)**, `this` will be `undefined` in this case.
    ```javascript
    function showThis() {
      console.log(this);
    }
    showThis(); // In browser (non-strict): Window object
    // In Node.js (non-strict): Global object
    // In strict mode: undefined
    ```
2.  **Method Invocation:** When a function is called as a method of an object (e.g., `myObject.myMethod()`), `this` inside that method is bound to the object the method was called on (`myObject`).
    ```javascript
    const pharmacy = {
      name: "Downtown Pharmacy",
      displayInfo: function () {
        console.log(`Pharmacy Name: ${this.name}`); // 'this' refers to the pharmacy object
      },
    };
    pharmacy.displayInfo(); // Output: Pharmacy Name: Downtown Pharmacy
    ```
3.  **Constructor Invocation:** When a function is used as a constructor with the `new` keyword (e.g., `new Patient('...')`), a new object is created, and `this` inside the constructor function is bound to this newly created object instance.
    ```javascript
    function Patient(name) {
      this.name = name;
      this.admissionDate = new Date();
      console.log("Creating new patient:", this); // 'this' refers to the new object being created
    }
    const patient1 = new Patient("Charles Xavier");
    // Output: Creating new patient: { name: 'Charles Xavier', admissionDate: [Date object] }
    ```
4.  **Explicit Binding (`call`, `apply`, `bind`):** You can manually set the value of `this` for a function call, regardless of how it's called.

    - `function.call(thisArg, arg1, arg2, ...)`: Calls the function with a specific `thisArg` and individual arguments.
    - `function.apply(thisArg, [argsArray])`: Calls the function with a specific `thisArg` and an array of arguments.
    - `function.bind(thisArg)`: Creates a **new function** where `this` is permanently bound to `thisArg`. Subsequent calls to the bound function always use the bound `this` value.

    ```javascript
    function logDetails(label) {
      console.log(`${label}: ${this.value}`);
    }
    const data1 = { value: 100 };
    const data2 = { value: 200 };

    logDetails.call(data1, "Data 1 Call"); // Output: Data 1 Call: 100
    logDetails.apply(data2, ["Data 2 Apply"]); // Output: Data 2 Apply: 200

    const boundLogData1 = logDetails.bind(data1);
    boundLogData1("Data 1 Bound"); // Output: Data 1 Bound: 100
    ```

#### `this` in Arrow Functions

Arrow functions behave differently: they **do not have their own `this` binding**. They inherit `this` lexically from their parent scope at the time they are defined.

This is often advantageous, especially in callbacks and frameworks like React/React Native:

```javascript
function Timer() {
  this.seconds = 0;

  // Using a regular function callback (this would be global/undefined in strict mode)
  // setInterval(function() {
  //   this.seconds++; // 'this' here is NOT the Timer instance
  //   console.log(this.seconds); // Would likely result in NaN or error
  // }, 1000);

  // Using an arrow function callback (inherits 'this' from Timer)
  setInterval(() => {
    this.seconds++; // 'this' here correctly refers to the Timer instance
    console.log(this.seconds);
  }, 1000);
}

// const myTimer = new Timer(); // Uncomment to run the timer
```

> [!IMPORTANT]
> The predictable lexical `this` of arrow functions eliminates many common bugs and the need for workarounds like `const self = this;` or `.bind(this)` that were prevalent with traditional function callbacks.

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

**Lexical Scoping (Static Scope):** JavaScript uses lexical scoping, which means that the scope of a variable is determined by its position within the nested structure of functions at the time the code is written (lexically), not when it's executed. Inner functions have access to variables and parameters of their outer functions. This chain of accessible scopes is known as the **scope chain**.

### Closures

A closure is a powerful JavaScript feature where an inner function has access to its outer (enclosing) function's variables and parameters, even after the outer function has finished executing and returned.

In essence, a closure "remembers" the environment (the lexical scope) in which it was created.

**How Closures Work (Under the Hood):**

When a function is created in JavaScript, it doesn't just store its code; it also keeps a hidden reference to the **Lexical Environment** of the scope in which it was created. A Lexical Environment consists of:

1.  **Environment Record:** An internal structure that stores local variable declarations, function parameters, and the value of `this` within that specific scope.
2.  **Reference to Outer Lexical Environment:** A pointer to the Lexical Environment of the enclosing (parent) scope. This creates the scope chain.

When an outer function finishes executing, its execution context might be gone, but if an inner function (the closure) is still accessible (e.g., it was returned or passed as a callback), the JavaScript engine ensures that the Lexical Environment (or at least the parts of it referenced by the closure) remains in memory. When the closure is later called, it uses its stored reference to its creation scope to look up variables in the scope chain.

**Practical Uses of Closures (Examples):**

- **Data Encapsulation/Privacy:** (As shown in `createPrescriptionTracker`)
- **Function Factories:** Creating configured functions.
  ```javascript
  function createMultiplier(factor) {
    return (number) => number * factor;
  }
  const double = createMultiplier(2);
  const triple = createMultiplier(3);
  console.log(double(5)); // Output: 10
  console.log(triple(5)); // Output: 15
  ```
- **Callbacks with State:** Attaching specific state to event handlers.
  ```javascript
  // Hypothetical button click example
  // function setupButton(buttonId, message) {
  //   const button = document.getElementById(buttonId);
  //   button.addEventListener('click', () => { // Arrow function is a closure
  //     console.log(message); // Accesses 'message' from outer scope
  //   });
  // }
  // setupButton("saveBtn", "Data saved successfully!");
  ```

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

#### Function Definition Comparison

| Feature                           | Function Declaration  | Function Expression            | Arrow Function            |
| :-------------------------------- | :-------------------- | :----------------------------- | :------------------------ |
| **Syntax Example**                | `function greet() {}` | `const greet = function() {};` | `const greet = () => {};` |
| **Hoisting Behavior**             | Fully hoisted         | Variable hoisted/TDZ only      | Variable hoisted/TDZ only |
| **`this` Binding**                | Dynamic               | Dynamic                        | Lexical                   |
| **`arguments` Object**            | Available             | Available                      | Not available             |
| **Usable as Constructor (`new`)** | Yes                   | Yes (if not arrow)             | No (`TypeError`)          |
| **`prototype` Property**          | Yes                   | Yes (if not arrow)             | No                        |

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
