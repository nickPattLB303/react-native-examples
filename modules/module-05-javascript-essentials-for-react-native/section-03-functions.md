## Section 3: Functions

Functions are fundamental building blocks in JavaScript. They are reusable blocks of code that perform a specific task or calculate a value. By encapsulating logic within functions, you can make your code more organized, readable, and maintainable. This section explores how to define and use functions, with a special focus on modern ES6 features like arrow functions, and important concepts like `this`, scope, and closures.

### Defining and Calling Functions

JavaScript offers several ways to define functions, each with distinct characteristics.

#### Function Declarations (Statements)

A function declaration defines a named function.

```javascript
// Function Declaration
function greetPatient(patientName) {
  return `Welcome to SpeedyMeds, ${patientName}!`;
}

// Calling the function
let welcomeMessage = greetPatient("Maria Rodriguez");
console.log(welcomeMessage); // Output: Welcome to SpeedyMeds, Maria Rodriguez!
```

- **Hoisting:** Function declarations are fully hoisted. This means the entire function definition (name and body) is moved to the top of its enclosing scope by the JavaScript engine during compilation. Thus, a function declared this way can be called _before_ its textual appearance in the code.

#### Function Expressions

A function can also be defined as part of an expression, typically by assigning it to a variable. The function can be anonymous (unnamed) or named.

```javascript
// Function Expression (anonymous)
const calculateDosage = function (weightKg, dosagePerKg) {
  return weightKg * dosagePerKg;
};
let requiredDosage = calculateDosage(70, 2);
console.log(`Required dosage: ${requiredDosage}mg`);

// Function Expression (named - useful for debugging and recursion)
const getMedicationInfo = function actualMedicationInfo(medicationId) {
  if (medicationId === "AMX250") return "Amoxicillin 250mg";
  // actualMedicationInfo can be called recursively here if needed
  return "Medication not found";
};
console.log(getMedicationInfo("AMX250"));
```

- **Hoisting:** Function expressions are not hoisted in the same way. If assigned to a `var` variable, the variable declaration is hoisted and initialized with `undefined`, so calling it before assignment results in a `TypeError`. If assigned to `let` or `const`, the variable is hoisted but remains in the Temporal Dead Zone (TDZ) until the assignment, making it inaccessible before that point.
- **Named Function Expressions:** The name (e.g., `actualMedicationInfo` above) is primarily for debugging stack traces and for the function to refer to itself recursively. It is not accessible outside the function's body.

#### Arrow Functions (ES6+)

Arrow functions offer a concise syntax for writing function expressions.

```javascript
const addArrow = (a, b) => a + b;
const getPatientSummary = (patientName, age) =>
  `Patient: ${patientName}, Age: ${age}`;
const processOrder = (orderId) => {
  console.log(`Processing order ${orderId}...`);
  return { orderId: orderId, status: "Processed" };
};
```

- **Hoisting:** Behave like function expressions regarding hoisting; the variable they are assigned to follows `var`/`let`/`const` hoisting rules.
- Key differences regarding `this`, `arguments`, constructors, and `prototype` are discussed later.

### Parameters and Arguments

- **Parameters:** Names listed in a function definition (placeholders).
- **Arguments:** Actual values passed to the function when invoked.

#### Default Parameters (ES6)

Allows parameters to be initialized with default values if no value or `undefined` is passed. Default parameter values are evaluated at the time the function is called.

```javascript
function scheduleRefill(
  patientId,
  medicationName,
  daysSupply = 30,
  notificationDate = new Date()
) {
  console.log(
    `Scheduling a ${daysSupply}-day refill for ${medicationName} for patient ${patientId}. Notify on: ${notificationDate.toLocaleDateString()}`
  );
}
scheduleRefill("P001", "Lisinopril");
```

#### Rest Parameters (ES6)

Allows a function to accept an indefinite number of arguments as an array. Must be the last parameter and cannot have a default value itself.

```javascript
function logPrescribedMedications(patientId, ...medications) {
  console.log(
    `Patient ${patientId} is prescribed: ${medications.join(", ") || "None"}`
  );
}
logPrescribedMedications("P007", "Loratadine", "Salbutamol");
```

Rest parameters are preferred over the older `arguments` object.

### Return Values

Functions use the `return` statement to send a value back to the caller. If omitted, or `return;` is used, the function implicitly returns `undefined`.

### The `this` Keyword

The value of `this` is determined by how a function is called (its execution context).

- **Regular Functions (Declarations/Expressions):**

  - **Global Context (Standalone Call):** In non-strict mode, `this` refers to the global object (`window` in browsers). In strict mode, `this` is `undefined`.
  - **Method Invocation:** When called as a method of an object (`myObject.myMethod()`), `this` is bound to `myObject`.
  - **Constructor Invocation:** When used with `new` (`new MyConstructor()`), `this` is bound to the newly created object instance.
  - **Explicit Binding:**
    - `function.call(thisArg, arg1, ...)`: Calls the function with a specified `thisArg` and individual arguments.
    - `function.apply(thisArg, [argsArray])`: Similar to `call`, but arguments are passed as an array.
    - `function.bind(thisArg)`: Creates a new function where `this` is permanently bound to `thisArg`.
    ```javascript
    const pharmacy = { name: "SpeedyMeds Downtown" };
    function getPharmacyName() {
      return this.name;
    }
    console.log(getPharmacyName.call(pharmacy)); // Output: SpeedyMeds Downtown
    const boundGetName = getPharmacyName.bind(pharmacy);
    console.log(boundGetName()); // Output: SpeedyMeds Downtown
    ```

- **Arrow Functions:**
  - Do not have their own `this` binding. They lexically inherit `this` from their surrounding non-arrow function's scope at the time they are defined.
  - The value of `this` inside an arrow function cannot be changed by `call`, `apply`, or `bind`.

> [!IMPORTANT]
> The lexical `this` of arrow functions simplifies context management, especially for callbacks and in React/React Native event handlers.

### Scope

Scope determines the accessibility of variables and functions.

- **Global Scope:** Declared outside any function/block.
- **Function Scope:** `var` declarations inside a function.
- **Block Scope (ES6):** `let` and `const` declarations inside a block (`{}`).
- **Lexical Scoping (Static Scope):** Scope is determined by the physical placement in code. Inner functions can access variables of outer functions (forming a scope chain).

### Closures

A closure is a function combined with its lexical environment (the scope in which it was declared). It "remembers" and has access to its outer function's variables even after the outer function has returned.

- **Under the Hood (Lexical Environment):** When a function is created, it keeps a reference to its parent scope's lexical environment. This environment consists of an environment record (local variables, parameters, `this`) and a reference to the outer lexical environment. When the closure is called later, it can still access these remembered variables.
- **Practical Uses:** Data encapsulation/privacy, creating functions with persistent state (counters, generators), event handlers, callbacks, currying, and partial application.

```javascript
function createPrescriptionTracker(medicationName) {
  let prescriptionsFilled = 0; // Private to the closure
  return function fillPrescription(patientName) {
    prescriptionsFilled++;
    console.log(
      `${medicationName} #${prescriptionsFilled} for ${patientName}.`
    );
    return prescriptionsFilled;
  };
}
const trackAmoxicillin = createPrescriptionTracker("Amoxicillin");
trackAmoxicillin("John Doe"); // Amoxicillin #1 for John Doe.
```

### The `arguments` Object

An array-like object accessible inside _regular functions_ (not arrow functions) that contains the values of all arguments passed.

- It has a `length` property.
- It is not a true array (lacks array methods directly, though `Array.prototype.method.call(arguments, ...)` can be used).
- **Modern Practice:** Rest parameters (`...args`) are preferred as they provide a true array and are more explicit.

### Table 3.1: Function Types Comparison

| Feature               | Function Declaration        | Function Expression                      | Arrow Function                           |
| :-------------------- | :-------------------------- | :--------------------------------------- | :--------------------------------------- |
| Syntax Example        | `function greet() {}`       | `const g = function() {};`               | `const g = () => {};`                    |
| Hoisting Behavior     | Fully hoisted (name & body) | Variable hoisted (TDZ for `let`/`const`) | Variable hoisted (TDZ for `let`/`const`) |
| `this` Binding        | Dynamic                     | Dynamic                                  | Lexical (inherits)                       |
| `arguments` Object    | Available                   | Available                                | Not available (use rest parameters)      |
| Usable as Constructor | Yes                         | Yes                                      | No (`TypeError`)                         |
| `prototype` Property  | Yes                         | Yes                                      | No                                       |

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
> - [MDN Web Docs: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> - [MDN Web Docs: `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
> - [MDN Web Docs: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
> - [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
> - [MDN Web Docs: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
> - [MDN Web Docs: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

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
