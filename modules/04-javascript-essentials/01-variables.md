# Module 1: Variables & Scope

**Introduction**

Variables are fundamental building blocks in any programming language, acting as named containers for storing data. Modern JavaScript (ES6+) introduced new ways to declare variables (`let` and `const`) that offer significant advantages over the traditional `var` keyword, particularly regarding scope.

**Learning Objectives**

*   Declare variables using `let` and `const`.
*   Understand the concept of block scope introduced with `let` and `const`.
*   Explain the differences between `let`, `const`, and `var`.
*   Recognize the implications of variable scope in React Native components.
*   Choose the appropriate variable declaration keyword (`let` vs. `const`) based on intent.

**Keywords**

*   `let`: Declares a block-scoped variable that can be reassigned.
*   `const`: Declares a block-scoped variable that cannot be reassigned (must be initialized).
*   `var`: (Legacy) Declares a function-scoped or globally-scoped variable.
*   Scope: The context in which variables are accessible.
*   Block Scope: The scope created by curly braces `{}` (e.g., within `if` statements, `for` loops, or standalone blocks).
*   Function Scope: The scope created by a function.
*   Hoisting: (Applies mainly to `var`) A JavaScript mechanism where variable and function declarations are moved to the top of their scope before code execution.

---

## `let`

The `let` keyword declares a variable that is limited in scope to the block, statement, or expression on which it is used. Unlike `var`, variables declared with `let` are not hoisted to the top of their scope in the same way, and accessing them before declaration results in a `ReferenceError` (this is often called the "Temporal Dead Zone").

**Key characteristics of `let`:**

*   **Block-scoped:** Accessible only within the `{}` block where it's defined.
*   **Reassignable:** The value of a `let` variable can be changed after declaration.
*   **Not re-declarable:** You cannot declare the same `let` variable twice within the same scope.
*   **Temporal Dead Zone (TDZ):** Cannot be accessed before its declaration in the code.

**Example:**

```javascript
function checkLetScope() {
  let message = "Initial message";

  if (true) {
    let message = "Message inside if block"; // Different variable due to block scope
    console.log(message); // Output: Message inside if block

    let blockVar = "I am block-scoped";
    console.log(blockVar); // Output: I am block-scoped
  }

  console.log(message); // Output: Initial message
  // console.log(blockVar); // ReferenceError: blockVar is not defined (outside its block)

  message = "Reassigned message";
  console.log(message); // Output: Reassigned message

  // let message = "Trying to redeclare"; // SyntaxError: Identifier 'message' has already been declared
}

checkLetScope();

// console.log(y); // ReferenceError: Cannot access 'y' before initialization (TDZ)
let y = 10;
```

---

## `const`

The `const` keyword declares a variable whose value cannot be reassigned after initialization. Like `let`, `const` variables are block-scoped and are subject to the Temporal Dead Zone.

It's crucial to understand that `const` does **not** make the value *immutable* if the value is an object or array. It only prevents reassignment of the variable identifier itself.

**Key characteristics of `const`:**

*   **Block-scoped:** Accessible only within the `{}` block where it's defined.
*   **Not reassignable:** The variable cannot be pointed to a new value or reference.
*   **Must be initialized:** You must assign a value when declaring a `const` variable.
*   **Not re-declarable:** You cannot declare the same `const` variable twice within the same scope.
*   **Temporal Dead Zone (TDZ):** Cannot be accessed before its declaration.

**Example:**

```javascript
function checkConstScope() {
  const PI = 3.14159;
  console.log(PI); // Output: 3.14159

  // PI = 3.14; // TypeError: Assignment to constant variable.

  if (true) {
    const PI = "Different PI inside block"; // Okay, different block scope
    console.log(PI); // Output: Different PI inside block
  }

  // const E; // SyntaxError: Missing initializer in const declaration

  const user = {
    name: "Alice",
    age: 30
  };

  console.log(user.name); // Output: Alice

  // Although 'user' is const, its properties can be modified
  user.name = "Bob";
  user.age = 31;
  console.log(user.name); // Output: Bob

  // However, you cannot reassign the 'user' variable itself
  // user = { name: "Charlie", age: 40 }; // TypeError: Assignment to constant variable.
}

checkConstScope();
```

**Best Practice:** Prefer `const` by default. Use `let` only when you know a variable's value needs to change.

---

## `var` (Legacy)

Before ES6, `var` was the only way to declare variables. It has different scoping rules that can sometimes lead to unexpected behavior.

**Key characteristics of `var`:**

*   **Function-scoped (or global):** Variables declared with `var` are scoped to the nearest enclosing *function* or the global scope if declared outside any function. They are **not** block-scoped.
*   **Hoisted:** `var` declarations are conceptually moved to the top of their function scope during compilation, and initialized with `undefined`. This means you can access a `var` variable before its declaration without a `ReferenceError` (you'll just get `undefined`).
*   **Reassignable:** The value can be changed.
*   **Re-declarable:** You can declare the same `var` variable multiple times within the same scope without error.

**Example (Illustrating Scope Differences):**

```javascript
function checkVarScope() {
  console.log(hoistedVar); // Output: undefined (due to hoisting)

  if (true) {
    var message = "Message inside if block";
    console.log(message); // Output: Message inside if block
  }

  // 'message' is accessible here because var is function-scoped, not block-scoped
  console.log(message); // Output: Message inside if block

  var hoistedVar = "I am hoisted";
  console.log(hoistedVar); // Output: I am hoisted

  var message = "Redeclared message"; // No error, redeclaration is allowed
  console.log(message); // Output: Redeclared message
}

checkVarScope();

// If declared outside a function, 'x' becomes global
// var x = 5; 
// console.log(window.x); // In browsers, accessible via window object
```

**Why avoid `var`?** The function scoping and hoisting behavior of `var` can make code harder to reason about, especially in larger applications or within loops and closures. Block scoping with `let` and `const` generally leads to fewer bugs and more predictable code.

---

## Scope in React Native Components

Understanding variable scope is crucial when writing React Native components.

*   Variables declared directly inside the body of a functional component (but outside any specific block like an `if` or loop) are scoped to that component's render cycle.
*   Variables declared inside blocks (`if`, `for`, etc.) within a component are block-scoped using `let` and `const`.
*   State variables (using `useState`) and props have their own lifecycle and rules managed by React.

**Example (Conceptual):**

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const MyComponent = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount); // State variable
  const componentId = "Comp123"; // const, scoped to the component function

  let statusMessage = "Initialized"; // let, scoped to the component function

  const handlePress = () => {
    const pressTime = new Date().toLocaleTimeString(); // const, scoped to handlePress function
    console.log(`Button pressed at ${pressTime} by ${componentId}`);
    setCount(prevCount => prevCount + 1);
    statusMessage = "Button Pressed"; // Reassigning outer 'let' variable
    // Note: Reassigning 'statusMessage' here won't cause a re-render by itself.
    // Only state changes trigger re-renders in React.
  };

  if (count > 5) {
    let warningMessage = "Count is high!"; // let, scoped to this if block
    // console.log(statusMessage); // Accessible
    // console.log(warningMessage); // Accessible
  }

  // console.log(warningMessage); // ReferenceError: warningMessage is not defined

  return (
    <View>
      <Text>Component ID: {componentId}</Text>
      <Text>Count: {count}</Text>
      <Text>Status: {statusMessage}</Text> {/* Shows 'Initialized' initially */}
      <Button title="Increment" onPress={handlePress} />
    </View>
  );
};

export default MyComponent;
```

In this example:

*   `componentId` is constant for each render of `MyComponent`.
*   `statusMessage` can be reassigned within the component's scope (e.g., in `handlePress`), but changing it won't visually update the UI unless it triggers a state change.
*   `pressTime` is scoped only to the `handlePress` function.
*   `warningMessage` is scoped only to the `if` block.

**Conclusion**

Modern JavaScript provides `let` and `const` for declaring variables, offering block scope and more predictable behavior compared to the legacy `var` keyword. Always prefer `const` by default and use `let` only when reassignment is necessary. Understanding these scoping rules is essential for writing clear, maintainable, and bug-free React Native code.

**Further Reading:**

*   MDN: [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
*   MDN: [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
*   MDN: [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
*   MDN: [Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

**Next:** [Module 2: Data Types](./02-data-types.md) 