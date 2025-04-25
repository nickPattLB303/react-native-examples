# Module 5: Functions

**Introduction**

Functions are one of the fundamental building blocks in JavaScript. They are reusable blocks of code designed to perform a specific task. Functions allow you to organize your code, make it more readable, reduce repetition, and abstract complexity. Modern JavaScript introduced arrow functions (`=>`), which offer a more concise syntax and have different behavior regarding the `this` keyword compared to traditional functions.

**Learning Objectives**

*   Define functions using function declarations and function expressions.
*   Create concise functions using arrow function syntax (`=>`).
*   Understand the concept of parameters and arguments.
*   Use default parameters for function arguments.
*   Utilize the rest parameter (`...`) to handle an indefinite number of arguments.
*   Explain the difference in `this` binding between traditional functions and arrow functions.
*   Choose the appropriate function type based on the use case, especially within React Native components.

**Keywords**

*   Function Declaration: Defining a named function using the `function` keyword.
*   Function Expression: Assigning an anonymous or named function to a variable.
*   Arrow Function (`=>`): A concise syntax for writing functions (ES6+).
*   Parameter: A variable listed inside the parentheses in the function definition.
*   Argument: The actual value passed to the function when it is invoked.
*   Return Value: The value returned by a function using the `return` keyword.
*   `this` Keyword: A special keyword whose value is determined by how a function is called (invocation context).
*   Lexical `this`: Arrow functions inherit `this` from the surrounding (lexical) scope where they are defined.
*   Method: A function that is a property of an object.
*   Default Parameters: Assigning default values to parameters if no argument or `undefined` is passed.
*   Rest Parameter (`...`): Collects an indefinite number of arguments into an array.

---

## Defining Functions

There are several ways to define functions in JavaScript:

### Function Declarations

This is the classic way to define a named function.

**Syntax:**

```javascript
function functionName(parameter1, parameter2) {
  // Code block
  // return value; // Optional return statement
}
```

**Key Features:**

*   Uses the `function` keyword followed by the function name.
*   Function declarations are *hoisted*, meaning they can be called before they appear in the code.

**Example:**

```javascript
console.log(greet("Alice")); // Works due to hoisting

function greet(name) {
  return `Hello, ${name}!`;
}
```

### Function Expressions

A function expression defines a function as part of a larger expression, typically assigning it to a variable. The function can be named or anonymous.

**Syntax (Anonymous):**

```javascript
const variableName = function(parameter1, parameter2) {
  // Code block
  // return value;
};
```

**Syntax (Named):**

```javascript
const variableName = function functionName(parameter1, parameter2) {
  // Code block
  // 'functionName' is useful for debugging/recursion inside the function
  // return value;
};
```

**Key Features:**

*   Not fully hoisted like declarations. If assigned to `let` or `const`, the variable exists (due to its own hoisting) but the function assignment doesn't happen until that line, leading to errors if called before assignment (Temporal Dead Zone).
*   Often used for passing functions as arguments (callbacks) or creating closures.

**Example:**

```javascript
// console.log(add(2, 3)); // TypeError: add is not a function (or ReferenceError if using let/const in TDZ)

const add = function(a, b) {
  return a + b;
};

console.log(add(2, 3)); // 5
```

### Arrow Functions (ES6+)

Arrow functions provide a more concise syntax and have a significant difference in how they handle the `this` keyword.

**Syntax:**

```javascript
// Basic syntax
const functionName = (parameter1, parameter2) => {
  // Code block
  // return value;
};

// Concise body (implicit return) for single expressions
const multiply = (a, b) => a * b; // Implicitly returns a * b

// Single parameter doesn't need parentheses
const square = x => x * x;

// No parameters requires parentheses
const getRandom = () => Math.random();

// Returning an object literal requires wrapping in parentheses
const createUser = (name, age) => ({ name: name, age: age });
```

**Key Features:**

*   Concise syntax.
*   No `function` keyword.
*   Implicit `return` for single-expression bodies.
*   **Lexical `this` binding** (see below).
*   Cannot be used as constructors (with `new`).
*   Do not have their own `arguments` object (use rest parameters instead).

**Example:**

```javascript
const subtract = (a, b) => {
  const result = a - b;
  return result;
};

const double = num => num * 2;

console.log(subtract(10, 4)); // 6
console.log(double(5));      // 10
```

---

## Parameters and Arguments

*   **Parameters:** Variables defined in the function signature.
*   **Arguments:** Actual values passed to the function when it's called.

### Default Parameters (ES6+)

Allows you to specify default values for parameters if no argument (or `undefined`) is provided.

```javascript
function greetUser(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

greetUser("Bob", "Hi");   // Hi, Bob!
greetUser("Charlie");    // Hello, Charlie! (uses default greeting)
greetUser();             // Hello, Guest! (uses both defaults)
greetUser(undefined, "Welcome"); // Welcome, Guest! (undefined triggers default)
```

### Rest Parameters (ES6+)

Collects all remaining arguments passed to a function into an array. Must be the last parameter.

```javascript
function sum(...numbers) {
  // 'numbers' is an array containing all passed arguments
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(10, 20, 30, 40)); // 100
console.log(sum(5));           // 5
console.log(sum());            // 0
```

---

## The `this` Keyword

The value of `this` depends on *how* a function is called.

**Traditional Functions (`function` keyword):**

*   **Global Context:** When called directly (not as a method or with `new`), `this` usually refers to the global object (`window` in browsers, `global` in Node) in non-strict mode, or `undefined` in strict mode (`"use strict";`).
*   **Method Context:** When called as a method of an object (`object.method()`), `this` refers to the object the method was called on.
*   **Constructor Context:** When called with `new` (`new MyFunction()`), `this` refers to the newly created instance.
*   **Explicit Binding:** When called using `.call()`, `.apply()`, or `.bind()`, `this` is explicitly set.

**Arrow Functions (`=>`):**

*   **Lexical `this`:** Arrow functions do **not** have their own `this` binding. Instead, they *inherit* `this` from the surrounding (lexical) scope in which they were *defined*. The value of `this` inside an arrow function is the same as `this` outside of it.

**Why this matters in React/React Native:**

Before hooks and functional components became dominant, class components were common. Inside class methods, traditional functions often required manual binding (`.bind(this)`) in the constructor or using class property arrow functions to ensure `this` correctly referred to the component instance when used as event handlers (like `onPress`).

With **functional components and hooks**, this specific `this` binding issue is largely irrelevant because you typically don't use `this` in the same way. However, understanding lexical `this` is still important for general JavaScript and when working with older codebases or specific libraries.

**Example (Illustrating `this` difference):**

```javascript
// Scenario: Using setTimeout

// Traditional function losing 'this' context
const myObject = {
  value: 42,
  getValueRegular: function() {
    console.log("Regular function this:", this); // 'this' refers to myObject
    setTimeout(function() {
      // 'this' inside setTimeout's callback is typically the global object or undefined
      console.log("Timeout (regular):", this.value); // Often undefined or error
    }, 100);
  },

  // Arrow function retaining lexical 'this' context
  getValueArrow: function() {
    console.log("Arrow function container this:", this); // 'this' refers to myObject
    setTimeout(() => {
      // Arrow function inherits 'this' from getValueArrow scope
      console.log("Timeout (arrow):", this.value); // Correctly logs 42
    }, 200);
  }
};

myObject.getValueRegular();
myObject.getValueArrow();

// React Native Conceptual Example (Class Component Style - Less common now)
/*
class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Manual binding needed for traditional function
    // this.handleClickRegular = this.handleClickRegular.bind(this);
  }

  handleClickRegular() {
    // 'this' would be undefined here if not bound
    console.log('Regular click, this:', this);
    this.setState({ count: this.state.count + 1 });
  }

  // Arrow function automatically binds 'this' lexically
  handleClickArrow = () => {
    console.log('Arrow click, this:', this); // 'this' refers to component instance
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <Button
        title={`Arrow Click Count: ${this.state.count}`}
        onPress={this.handleClickArrow} // No binding needed
        // onPress={this.handleClickRegular} // Would need binding in constructor
      />
    );
  }
}
*/
```

**Choosing the Right Function Type:**

*   **Functional Components in React/RN:** Use standard function declarations or arrow functions. Arrow functions are very common due to their conciseness.
*   **Helper Functions:** Arrow functions are often preferred for their brevity.
*   **Object Methods:** Use traditional function syntax or shorthand method syntax (`methodName() { ... }`) if you need `this` to refer to the object itself. Use arrow functions for methods if you specifically need to inherit `this` from the surrounding scope (less common for typical methods).
*   **Event Handlers (Class Components):** Prefer arrow functions defined as class properties or bind traditional functions in the constructor.
*   **Callbacks requiring specific `this`:** Be mindful of whether the callback provider expects a traditional function (where it might set `this`) or if lexical `this` from an arrow function is appropriate.

**Conclusion**

Functions are essential for writing modular, reusable JavaScript code. Function declarations, expressions, and arrow functions offer different syntax and behavior, particularly regarding hoisting and the `this` keyword. Arrow functions, with their concise syntax and lexical `this`, are widely used in modern JavaScript and React Native, especially within functional components and for callbacks.

**Further Reading:**

*   MDN: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
*   MDN: [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
*   MDN: [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
*   MDN: [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
*   MDN: [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
*   React Docs: [Handling Events](https://react.dev/learn/responding-to-events)

**Next:** [Module 6: Objects](./06-objects.md) 