## Section 3: Functions (Arrow Functions, Scope, Closures)

Functions are fundamental building blocks in JavaScript, enabling code organization, reusability, and the implementation of complex patterns such as closures. This section focuses on modern function syntax, parameter handling, the behavior of the `this` keyword, and the critical concepts of scope and closures.

> 🛣️ **All Learners:** Functions are central to JavaScript and React Native. Pay special attention to arrow functions and the `this` keyword, as their behavior is crucial for understanding React components and hooks. Closures can be a challenging concept initially, but they are powerful and underpin many common JavaScript patterns.

### Function Definition Mechanisms

JavaScript offers several ways to define functions, each with distinct characteristics regarding syntax, hoisting, and behavior.

#### Function Declarations (Statements)

This is a traditional way to define a named function.

-   Syntax: `function functionName(parameter1, parameter2) { /* function body */ return value; }`
-   **Hoisting:** Function declarations are fully hoisted. This means the entire function definition (both its name and body) is moved to the top of its enclosing scope by the JavaScript engine during the compilation phase. As a result, a function declared this way can be called before its actual textual appearance in the code.

This example shows a function declaration and its hoisting behavior:

```javascript
greetPatient("Alice"); // Outputs: Hello, Alice! (Function is hoisted)

function greetPatient(name) {
  console.log(`Hello, ${name}!`);
}

greetPatient("Bob"); // Outputs: Hello, Bob!
```

#### Function Expressions

A function expression defines a function as part of a larger expression, typically an assignment to a variable.

-   Syntax (anonymous): `const myFunction = function(parameter1, parameter2) { /* function body */ return value; };`
-   Syntax (named): `const myFunction = function actualFunctionName(param1, param2) { /* body */ return value; };` (The name `actualFunctionName` is only accessible inside the function itself).
-   **Hoisting:** Function expressions are not hoisted in the same way as function declarations. If assigned to a variable declared with `var`, the variable declaration is hoisted but initialized with `undefined`. If assigned with `let` or `const`, the variable is in the Temporal Dead Zone (TDZ) until the assignment line is reached. The function itself is not callable before the line where the expression is evaluated.

This example shows a function expression and its hoisting behavior:

```javascript
// sayHello("World"); // This would cause a TypeError or ReferenceError

const sayHello = function(target) {
  console.log(`Hello, ${target}!`);
};

sayHello("World"); // Outputs: Hello, World!
```

#### Arrow Functions (ES6+)

Introduced in ES6, arrow functions provide a more concise syntax for writing functions, particularly for anonymous functions or simple one-liners.

-   Syntax Variations:
    -   Single parameter, single expression (implicit return): `const increment = x => x + 1;`
    -   Multiple parameters, single expression (implicit return): `const sum = (a, b) => a + b;`
    -   No parameters, single expression (implicit return): `const sayHello = () => "Hello";`
    -   Single parameter, block body (requires explicit `return`):
        ```javascript
        const processValue = value => {
          const result = value * 2;
          return result;
        };
        ```
    -   Multiple parameters, block body (requires explicit `return`):
        ```javascript
        const multiply = (a, b) => {
          const product = a * b;
          return product;
        };
        ```
    -   Returning an object literal directly requires wrapping the object in parentheses: `const createPerson = (name, age) => ({ name: name, age: age });`
-   **Hoisting:** Arrow functions behave like function expressions concerning hoisting. If assigned to a variable, the hoisting rules of that variable (`var`, `let`, or `const`) apply. The function itself is not callable before its definition is reached.

This example shows various arrow function syntaxes:

```javascript
const calculateTotal = (price, quantity) => price * quantity; // Implicit return
console.log(calculateTotal(10, 3)); // Outputs: 30

const getPatientInfo = id => { // Single parameter, block body
  // Assume fetching logic here
  return `Patient ID: ${id}`;
};
console.log(getPatientInfo("P789")); // Outputs: Patient ID: P789

const createMedication = (name, dosage) => ({ name, dosage }); // Returning object literal
console.log(createMedication("Amoxicillin", "500mg")); // Outputs: { name: 'Amoxicillin', dosage: '500mg' }
```

> 🌐 **Web Developers:** You are likely very familiar with function declarations and expressions. Arrow functions are a key ES6 feature widely used in modern web development, especially with React. Pay attention to the differences in `this` binding compared to regular functions.
>
> 📲 **Native Developers:** The concept of defining functions or methods will be familiar. JavaScript's flexible syntax for functions (declarations, expressions, arrow functions) might be new. Understand the implications of hoisting and the concise syntax of arrow functions.

### Function Parameters

Parameters are placeholders for values that a function expects to receive when it is called. Arguments are the actual values passed to the function during invocation.

-   **Argument Passing:** When a function is called, arguments are passed to its parameters. If fewer arguments are passed than parameters defined, the remaining parameters will typically be `undefined` (unless they have default values). If more arguments are passed, the extra arguments can be accessed via the `arguments` object (in regular functions) or rest parameters.

#### Default Parameters (ES6+)

Allow named parameters to be initialized with default values if no value or `undefined` is passed for that parameter during the function call.

-   Syntax: `function greet(name = "Guest", message = "Welcome") { console.log(`${message}, ${name}!`); }`

Default parameter values are evaluated at the time the function is called. This means you can use expressions or even other parameters as default values (provided the other parameters are declared earlier).

This example uses default parameters:

```javascript
function logEvent(message, timestamp = Date.now()) {
  console.log(`[${timestamp}]: ${message}`);
}

logEvent("Application started"); // Uses default timestamp
logEvent("User logged in", 1678886400000); // Provides a specific timestamp
```

#### Rest Parameters (ES6+)

Provide a way for a function to accept an indefinite number of arguments as an array.

-   Syntax: `function sumAll(...numbers) { /* 'numbers' is now an array of all arguments passed */ }`

The rest parameter must be the last parameter in the function definition. Any parameters after a rest parameter will cause a `SyntaxError`. A rest parameter cannot have a default value itself. It gathers all remaining arguments passed to the function into a genuine `Array` instance.

This example uses rest parameters to sum an arbitrary number of values:

```javascript
function calculateSum(...values) {
  let total = 0;
  for (const value of values) {
    total += value;
  }
  return total;
}

console.log(calculateSum(10, 20)); // Outputs: 30
console.log(calculateSum(5, 10, 15, 20)); // Outputs: 50
```

Rest parameters are generally preferred over the older `arguments` object for handling a variable number of arguments due to their clarity and true array nature.

> 🌐 **Web Developers:** Default and rest parameters are standard ES6 features you've likely encountered. They simplify function signatures compared to older techniques.
>
> 📲 **Native Developers:** Accepting a variable number of arguments might be handled differently (e.g., varargs in Java). JavaScript's rest parameters provide a clean syntax that results in a standard array.

### Return Values from Functions

Functions in JavaScript can return a value to the caller using the `return` statement.

-   A function can return only a single value. If multiple values need to be returned, they are typically grouped into an object or an array.
-   The `return` statement immediately exits the function, and any code after the `return` statement within the function will not be executed.
-   If a function does not have an explicit `return` statement, or if it has a `return` statement with no value (`return;`), it implicitly returns `undefined`.
-   Functions can return any JavaScript data type, including primitives, objects, arrays, or even other functions.

This example shows functions returning different types of values:

```javascript
function getMedicationName() {
  return "Aspirin"; // Returns a string
}

function getMedicationDetails() {
  return { name: "Ibuprofen", dosage: "200mg" }; // Returns an object
}

function isStockAvailable(quantity) {
  if (quantity > 0) {
    return true; // Returns a boolean
  }
  // No explicit return for quantity <= 0, implicitly returns undefined
}

console.log(getMedicationName()); // Outputs: Aspirin
console.log(getMedicationDetails()); // Outputs: { name: 'Ibuprofen', dosage: '200mg' }
console.log(isStockAvailable(5)); // Outputs: true
console.log(isStockAvailable(0)); // Outputs: undefined
```

### The `this` Keyword

The `this` keyword in JavaScript is a frequent source of confusion. Its value is not static but is determined dynamically by how a function is called (its execution context).

#### Regular Functions (Declarations and Expressions)

-   **Global Context (Standalone Invocation):** When a regular function is called standalone (e.g., `myFunction()`), `this` typically refers to the global object (`window` in browsers, `global` in Node.js) in non-strict mode. In strict mode (`'use strict';`), `this` will be `undefined`.
-   **Method Invocation:** When a function is called as a method of an object (e.g., `myObject.myMethod()`), `this` inside the method is bound to `myObject` (the object on which the method was called).
-   **Constructor Invocation:** When a function is used as a constructor with `new` (e.g., `const instance = new MyConstructor();`), a new object is created, and `this` inside the constructor is bound to this newly created object instance.
-   **Explicit Binding:** The value of `this` can be explicitly set using `call()`, `apply()`, or `bind()`.

This example shows `this` in a regular function used as a method:

```javascript
const pharmacy = {
  name: "SpeedyMeds",
  describe: function() {
    console.log(`Welcome to ${this.name}!`); // `this` refers to the pharmacy object
  }
};

pharmacy.describe(); // Outputs: Welcome to SpeedyMeds!
```

#### Arrow Functions

Arrow functions exhibit a fundamentally different behavior regarding `this`: they do not have their own `this` binding.

-   Instead, they lexically inherit the `this` value from their surrounding (enclosing) non-arrow function's scope at the time they are defined. This means `this` inside an arrow function always refers to whatever `this` was in its outer lexical environment.
-   The value of `this` inside an arrow function cannot be changed using `call`, `apply`, or `bind`.

This lexical `this` binding is a major advantage of arrow functions, especially in scenarios like callbacks (e.g., for `setTimeout`, event listeners, or array methods like `map` and `filter`) and when defining methods in class components in React. It often eliminates the need for older patterns like `var self = this;` or explicitly binding methods.

This example contrasts `this` in a regular function vs. an arrow function within the same object context:

```javascript
const timerExample = {
  message: "Timer finished!",
  // Regular function: `this` will refer to the global object in setTimeout callback
  startRegularTimer: function() {
    setTimeout(function() {
      console.log(this.message); // `this` is likely global/undefined here
    }, 1000);
  },
  // Arrow function: `this` lexically inherits from startArrowTimer's scope (the timerExample object)
  startArrowTimer: function() {
    setTimeout(() => {
      console.log(this.message); // `this` refers to timerExample
    }, 1000);
  }
};

console.log("Starting regular timer...");
timerExample.startRegularTimer(); // May output undefined or cause error in strict mode

console.log("Starting arrow timer...");
timerExample.startArrowTimer(); // Outputs: Timer finished! (after 1 second)
```

> [!IMPORTANT]
> Understanding the difference in `this` binding between regular functions and arrow functions is critical for working with React and React Native, particularly when dealing with event handlers and callbacks where you need to preserve the context of a component or object.

> 🌐 **Web Developers:** The behavior of `this` in JavaScript is notoriously complex and differs from how `this` or `self` works in many other languages. Arrow functions' lexical `this` is a key feature that simplifies common patterns in React.
>
> 📲 **Native Developers:** Concepts like `this` or `self` in Java/Swift usually refer to the current instance of a class. JavaScript's dynamic `this` binding in regular functions is a significant difference. Arrow functions provide a more predictable `this` that aligns better with how you might expect instance context to be preserved.

### Scope and Closures

Scope and closures are powerful concepts in JavaScript that govern variable accessibility and enable sophisticated programming patterns.

#### Scope Recap

Scope defines the accessibility of variables. JavaScript has:

-   **Global Scope:** Variables declared outside any function or block.
-   **Function Scope:** Variables declared with `var` inside a function are accessible only within that function.
-   **Block Scope:** Variables declared with `let` or `const` inside a block (`{...}`) are accessible only within that block.

#### Lexical Scoping (Static Scope)

JavaScript uses lexical scoping, meaning the scope of a variable is determined by its physical placement within the source code at the time the code is written, not by how or where the function is called at runtime. An inner function has access to the variables and parameters of its outer (parent) function, and this continues up the chain of outer functions to the global scope. This chain of accessible scopes is known as the scope chain.

#### Closures

A closure is formed when a function is defined. It is the combination of the function itself and the lexical environment (the scope) in which that function was declared. This means a function "remembers" and retains access to its lexical scope (variables, parameters of its outer functions) even if the function is executed outside of that original lexical scope. Closures are not something explicitly created with a keyword; they are a natural consequence of lexical scoping in languages with first-class functions.

**Under the Hood (Lexical Environment):** When a function is created, an internal property is associated with it, holding a reference to the lexical environment of its creation. A lexical environment stores local variables, function parameters, and the value of `this` for that scope, along with a reference to the outer lexical environment. When a function is called, a new lexical environment is created for that call. If a function (the closure) is still accessible even after its outer function has finished executing, the JavaScript engine ensures that the lexical environment (or the parts of it that the closure uses) remains in memory.

#### Practical Applications of Closures

-   **Data Encapsulation and Privacy:** Creating "private" variables and methods not accessible from outside a function, but accessible to inner functions.
-   **Creating Functions with Persistent State:** For example, a counter function that remembers its previous value across multiple calls.
-   **Callbacks and Event Handlers:** Maintaining context or state for when the callback is eventually executed.
-   **Currying and Partial Application:** Creating new functions by pre-filling some arguments of an existing function.

This example demonstrates a closure creating a private counter:

```javascript
function createMedicationCounter() {
  let count = 0; // `count` is a private variable within the closure

  return function() {
    count++;
    console.log(`Medication dispensed count: ${count}`);
  };
}

const dispenseMedication = createMedicationCounter(); // Get the inner function (the closure)

dispenseMedication(); // Outputs: Medication dispensed count: 1
dispenseMedication(); // Outputs: Medication dispensed count: 2
// `count` is not accessible directly from outside
// console.log(count); // ReferenceError
```

### The `arguments` Object

The `arguments` object is an array-like object accessible inside regular functions (function declarations and function expressions) that contains the values of the arguments passed to that function.

-   It allows access to all arguments passed, regardless of whether corresponding parameters were formally defined.
-   It has a `length` property.
-   Arguments can be accessed by index (e.g., `arguments[0]`).
-   Crucially, the `arguments` object is **not** available in arrow functions. Arrow functions must rely on rest parameters (`...args`) to capture a variable number of arguments as a true array.

> [!TIP]
> In modern JavaScript, rest parameters (`...args`) are generally preferred over the `arguments` object. They provide a cleaner, more explicit syntax and result in a true array, making them easier to work with.

This example shows the `arguments` object in a regular function:

```javascript
function logArguments() {
  console.log("Number of arguments:", arguments.length);
  console.log("First argument:", arguments[0]);
  console.log("All arguments:", arguments); // Note: arguments is array-like, not a true array
}

logArguments("Medication A", "Medication B", "Medication C");
// Outputs:
// Number of arguments: 3
// First argument: Medication A
// All arguments: [Arguments] { '0': 'Medication A', '1': 'Medication B', '2': 'Medication C' }
```

This table summarizes the key differences between function definition mechanisms:

Table 3.1: Function Declarations vs. Function Expressions vs. Arrow Functions

| Feature                 | Function Declaration              | Function Expression               | Arrow Function                    |
| :---------------------- | :--------------------------------| :--------------------------------| :--------------------------------|
| Syntax Example          | `function greet() {}`             | `const greet = function() {};`    | `const greet = () => {};`         |
| Hoisting Behavior       | Fully hoisted (name and body)     | Variable hoisted (if `var`), TDZ (if `let`/`const`); function value not hoisted | Variable hoisted (if `var`), TDZ (if `let`/`const`); function value not hoisted |
| `this` Binding          | Dynamic (depends on invocation)   | Dynamic (depends on invocation)   | Lexical (inherits from surrounding scope) |
| `arguments` Object      | Available                         | Available                         | Not available (use rest parameters `...args`) |
| Usable as Constructor (`new`)| Yes                           | Yes (if not an arrow function)    | No (`TypeError`)                  |
| Typical Use Cases       | General purpose functions, when hoisting is desired | Callbacks, IIFEs, functions assigned to properties | Callbacks (especially with `this` preservation), concise functions |

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
> - [MDN Web Docs: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> - [MDN Web Docs: `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
> - [MDN Web Docs: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
> - [MDN Web Docs: Closure](https://developer.mozilla.org/en-US/docs/Glossary/Closure)
> - [MDN Web Docs: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
> - [MDN Web Docs: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
> - [MDN Web Docs: `arguments` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

### Section Exercise

Practice working with different function types, parameters, and return values in this coding exercise.

**(TODO: Add link to Exercise 5.1: Function Practice - CodeSandbox)**

### Next Steps

Continue to the next section to learn about working with JavaScript's fundamental data structures: objects and arrays, including powerful ES6+ features like destructuring and spread/rest operators.

- [Section 4: Objects and Arrays (Methods, Destructuring, Spread/Rest Operators)](./section-04-objects-and-arrays.md)
