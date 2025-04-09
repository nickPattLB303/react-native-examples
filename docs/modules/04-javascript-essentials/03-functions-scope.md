---
marp: true
theme: custom-theme
paginate: true
header: 'Module 04: JavaScript Essentials - Lesson 03: Functions & Scope'
footer: 'React Native Training'
---
<!-- Presenter notes for Title slide -->
<!-- Introduce functions as reusable blocks of code. Introduce scope as the concept defining where variables are accessible. Both are crucial for organizing code. -->

<!-- _class: lead -->
# Lesson 03: Functions & Scope

Organizing code into reusable blocks and understanding variable visibility.

---
<!-- Presenter notes for Learning Objectives slide -->
<!-- Review objectives. Highlight the different ways to define functions and the importance of scope rules (especially block scope with let/const). -->

## Learning Objectives

By the end of this lesson, you will be able to:

-   Define and call functions using various syntaxes (declaration, expression, arrow).
-   Pass arguments to functions and use parameters.
-   Return values from functions and understand the `void` return type.
-   Apply TypeScript type annotations to function parameters and return values.
-   Explain the difference between global, function, and block scope.
-   Understand the basic concept of closures.

---
<!-- Presenter notes for Introduction slide -->
<!-- Explain the "Don't Repeat Yourself" (DRY) principle. Functions allow us to write code once and call it multiple times. Scope prevents naming conflicts and controls data access. -->

## Introduction

As applications grow, simply writing code sequentially becomes unmanageable. **Functions** allow you to group related code into named, reusable blocks that can be executed (or "called") whenever needed. This promotes the "Don't Repeat Yourself" (DRY) principle.

**Scope** determines the accessibility or visibility of variables within different parts of your code. Understanding scope is essential for managing data and preventing unintended side effects or naming conflicts.

---
<!-- Presenter notes for Defining Functions slide -->
<!-- Introduce the three main ways: Declaration (hoisted), Expression (not hoisted), Arrow (concise, lexical `this` - mention `this` briefly if audience is familiar, otherwise maybe defer). -->

## Defining Functions

There are several ways to define functions in JavaScript/TypeScript:

1.  **Function Declaration:** The "classic" way using the `function` keyword. Declarations are "hoisted," meaning they can be called before they appear in the code (though this is often discouraged for readability).
2.  **Function Expression:** Assigning an anonymous (or named) function to a variable. Expressions are *not* hoisted.
3.  **Arrow Function (ES6):** A more concise syntax, especially for simple functions. Arrow functions have important differences regarding the `this` keyword (which we'll explore more in the React context).

---
<!-- Presenter notes for Function Declaration Example slide -->
<!-- Show the basic syntax. Explain hoisting (callable before definition). Walk through the simple calculation. -->

## Function Declaration Example (TypeScript)

```typescript
/**
 * Calculates the total cost of a medication order.
 * JSDoc comments explain the function's purpose, parameters, and return value.
 * @param unitPrice - The price per unit of the medication.
 * @param quantity - The number of units being ordered.
 * @param discountPercentage - An optional discount percentage (e.g., 10 for 10%). Defaults to 0.
 * @returns The calculated total cost after applying the discount.
 */
function calculateOrderTotal(unitPrice: number, quantity: number, discountPercentage: number = 0): number {
  const subtotal = unitPrice * quantity;
  const discountAmount = subtotal * (discountPercentage / 100);
  const totalCost = subtotal - discountAmount;
  return totalCost; // Return the calculated value
}

// Calling the function declaration
const pricePerTablet = 0.50;
const numberOfTablets = 60;
const orderTotal = calculateOrderTotal(pricePerTablet, numberOfTablets); // discount defaults to 0
const discountedTotal = calculateOrderTotal(pricePerTablet, numberOfTablets, 10); // 10% discount

console.log(`Order Subtotal: $${(pricePerTablet * numberOfTablets).toFixed(2)}`);
console.log(`Order Total (No Discount): $${orderTotal.toFixed(2)}`); // Output: $30.00
console.log(`Order Total (10% Discount): $${discountedTotal.toFixed(2)}`); // Output: $27.00

// Hoisting: Can technically call before definition (though not always best practice)
// const testTotal = calculateOrderTotal(1, 1);
// console.log(testTotal);
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates defining and using a function via a **Function Declaration** in TypeScript.

1.  **Purpose:** The `calculateOrderTotal` function encapsulates the logic for calculating the final cost of a medication order, potentially applying a discount. This makes the calculation reusable.
2.  **Syntax:** It uses the `function` keyword, followed by the function name (`calculateOrderTotal`), a list of parameters in parentheses, and the function body enclosed in curly braces `{}`.
3.  **Parameters & Types:**
    *   `unitPrice: number`, `quantity: number`: These parameters expect numeric values and are explicitly typed using TypeScript annotations.
    *   `discountPercentage: number = 0`: This parameter is also typed as a number, but it includes a **default value** (`= 0`). If the caller doesn't provide a third argument, `discountPercentage` will automatically be `0`. This makes the discount optional.
4.  **Return Type (`: number`):** The `: number` after the parameter list explicitly declares that this function is expected to return a numeric value (the total cost). TypeScript will check if the function actually returns a value compatible with this type.
5.  **Function Body:** Inside the function, local `const` variables (`subtotal`, `discountAmount`, `totalCost`) are used to perform the calculation step-by-step, improving readability.
6.  **`return` Statement:** The `return totalCost;` statement specifies the value that the function sends back to the code that called it. A function execution ends when a `return` statement is encountered.
7.  **Calling the Function:** The function is called (invoked) using its name followed by parentheses containing the arguments: `calculateOrderTotal(pricePerTablet, numberOfTablets)` and `calculateOrderTotal(pricePerTablet, numberOfTablets, 10)`. The values passed (`pricePerTablet`, `numberOfTablets`, `10`) are the arguments, which correspond to the parameters defined in the function signature.
8.  **Hoisting:** Function declarations are hoisted, meaning the JavaScript engine conceptually moves their definitions to the top of their scope before execution. This allows you to call `calculateOrderTotal` *before* its actual definition in the code, although placing definitions before calls generally leads to more readable code.
9.  **JSDoc:** The comment block before the function is a JSDoc comment, used to document the function's purpose, parameters (`@param`), and return value (`@returns`). This is excellent practice for code documentation and can be used by various tools.

---
<!-- Presenter notes for Function Expression Example slide -->
<!-- Show assigning a function to a const. Emphasize it's not hoisted - cannot call before assignment. Use case: passing functions as arguments, conditional function definition. -->

## Function Expression Example (TypeScript)

```typescript
/**
 * Logs a formatted message about a prescription refill.
 * @param patientName - The name of the patient.
 * @param medicationName - The name of the medication being refilled.
 */
const logRefillMessage = function(patientName: string, medicationName: string): void {
  // This function doesn't explicitly return a value, so its return type is 'void'.
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] Refill processed for ${patientName} - Medication: ${medicationName}`);
}; // Note the semicolon often used after expressions

// Calling the function expression
logRefillMessage("Alice Smith", "Lisinopril");
// Output: [8:23:12 AM] Refill processed for Alice Smith - Medication: Lisinopril (time will vary)

// Attempting to call before assignment would cause an error (not hoisted)
// logRefillMessage("Bob", "Test"); // ReferenceError: Cannot access 'logRefillMessage' before initialization
```
**(Copy button available in top-right corner)**

**Explanation:**

This example defines a function using a **Function Expression** in TypeScript.

1.  **Purpose:** The `logRefillMessage` function is designed to log a standardized message when a prescription refill is processed, including a timestamp.
2.  **Syntax:** Instead of starting with the `function` keyword followed by a name, we declare a constant variable (`const logRefillMessage`) and assign an anonymous function (a function without a name after the `function` keyword) to it. The entire `function(...) { ... }` part is the expression being assigned.
3.  **Parameters & Types:** It accepts `patientName` and `medicationName`, both explicitly typed as `string`.
4.  **Return Type (`: void`):** The `: void` annotation indicates that this function does not return any value. Functions primarily used for their side effects (like logging to the console, modifying external state, or updating UI) often have a `void` return type. If a function has no explicit `return` statement, or just `return;`, its inferred return type is `void`.
5.  **Function Body:** It gets the current time, formats it, and logs the message using `console.log`.
6.  **Calling the Function:** The function is called using the variable name it was assigned to: `logRefillMessage(...)`.
7.  **No Hoisting:** Unlike function declarations, function expressions are *not* hoisted. The variable `logRefillMessage` is hoisted (as all `let`/`const`/`var` are), but its value (the function definition) is only assigned at the line where the expression appears. Trying to call `logRefillMessage` *before* the `const logRefillMessage = ...` line results in a `ReferenceError` because the variable exists but doesn't hold the function yet.
8.  **Use Cases:** Function expressions are useful for assigning functions to object properties, passing functions as arguments to other functions (callbacks), or conditionally defining functions.

---
<!-- Presenter notes for Arrow Function Example slide -->
<!-- Show the concise syntax. Explain implicit return for single expressions. Show block body `{}` for multiple statements. Mention lexical `this` again briefly if relevant. -->

## Arrow Function Example (TypeScript)

Arrow functions (introduced in ES6) provide a more compact syntax.

```typescript
/**
 * Checks if a medication quantity is below a threshold. (Concise version)
 * @param currentQuantity - The current quantity in stock.
 * @param threshold - The low stock threshold.
 * @returns True if quantity is below threshold, false otherwise.
 */
const isLowStock = (currentQuantity: number, threshold: number): boolean => currentQuantity < threshold;

// Arrow function with multiple statements requires curly braces and explicit return
/**
 * Generates a simple patient alert message.
 * @param patientId - The patient's identifier.
 * @param alertType - The type of alert (e.g., 'Refill Due', 'Interaction Warning').
 * @returns A formatted alert string.
 */
const generatePatientAlert = (patientId: string, alertType: string): string => {
  const alertPrefix = `ALERT [Patient: ${patientId}]`;
  // Multiple statements require a block body {}
  return `${alertPrefix}: ${alertType}. Please review patient record.`; // Explicit return needed
};

// Calling arrow functions
const quantityOnHand = 15;
const lowStockLevel = 20;

console.log(`Is low stock (${quantityOnHand} < ${lowStockLevel})? ${isLowStock(quantityOnHand, lowStockLevel)}`); // Output: true
console.log(generatePatientAlert("P78901", "Refill Due"));
// Output: ALERT [Patient: P78901]: Refill Due. Please review patient record.
```
**(Copy button available in top-right corner)**

**Explanation:**

These examples showcase **Arrow Functions**, a modern and concise way to define functions in JavaScript/TypeScript.

1.  **Purpose:** To demonstrate the syntax and common patterns of arrow functions for both simple, single-expression functions and more complex multi-statement functions.
2.  **Basic Syntax:** `(parameters) => expression` or `(parameters) => { statements }`. The `function` keyword is omitted.
3.  **Concise Body / Implicit Return (`isLowStock`):**
    *   `const isLowStock = (currentQuantity: number, threshold: number): boolean => currentQuantity < threshold;`
    *   When the function body is a single expression (`currentQuantity < threshold`), the curly braces `{}` and the `return` keyword can be omitted. The result of the expression is implicitly returned. This makes simple functions very compact.
    *   Parameters (`currentQuantity`, `threshold`) and the return type (`: boolean`) are typed just like in other function forms.
4.  **Block Body / Explicit Return (`generatePatientAlert`):**
    *   `const generatePatientAlert = (patientId: string, alertType: string): string => { ... };`
    *   When the function requires multiple statements (like defining `alertPrefix` and then constructing the final string), the function body must be enclosed in curly braces `{}`.
    *   Inside a block body, the `return` keyword is **required** to specify the value the function should return. There is no implicit return with block bodies.
5.  **Calling:** Arrow functions are called identically to function expressions, using the variable name they were assigned to: `isLowStock(...)`, `generatePatientAlert(...)`.
6.  **`this` Binding (Lexical `this`):** A key difference (not shown in this simple example, but crucial in classes and React components) is that arrow functions do not have their own `this` binding. They inherit `this` from the surrounding (lexical) scope where they are defined. This often simplifies code compared to traditional functions where `this` can change depending on how the function is called. We'll see this benefit more clearly when working with React components.
7.  **Readability:** Arrow functions are often preferred for callbacks and simple transformations due to their brevity.

---
<!-- Presenter notes for Scope Intro slide -->
<!-- Define scope: where variables live. Introduce the main types: Global, Function, Block. -->

## Understanding Scope

Scope defines where variables and functions can be accessed within your code. Understanding scope helps prevent naming conflicts and control data visibility.

JavaScript has three main types of scope:

1.  **Global Scope:** Variables declared outside any function or block are globally accessible. Avoid polluting the global scope whenever possible.
2.  **Function Scope:** Variables declared with `var` inside a function are accessible anywhere within that function, but not outside.
3.  **Block Scope:** Variables declared with `let` and `const` inside a block (code enclosed in `{ }`, like in `if`, `for`, or just standalone blocks) are only accessible *within that block*. This is the most common and generally preferred scope in modern JavaScript.

---
<!-- Presenter notes for Scope Example slide -->
<!-- Walk through the example. Show `globalVar` accessible everywhere. Show `functionVar` only inside its function. Show `blockVar` only inside its block. Emphasize `let`/`const` block scoping. -->

## Scope Example (TypeScript)

```typescript
const globalApiUrl: string = "https://api.pharmacy.com"; // Global Scope

function processOrder(orderId: string): void {
  const functionScopedApiKey: string = "func_key_123"; // Function Scope (using const)
  console.log(`Processing order ${orderId} using API: ${globalApiUrl}`); // Can access global

  if (orderId.startsWith("PRIORITY")) {
    const blockScopedPriorityCode: string = "HIGH"; // Block Scope (using const)
    // Can access global, function, and block scope here
    console.log(` - Priority: ${blockScopedPriorityCode}, Key: ${functionScopedApiKey}`);

    // let blockScopedPriorityCode = "LOW"; // Error: Cannot redeclare block-scoped variable.
  } else {
    // console.log(blockScopedPriorityCode); // Error: Cannot find name 'blockScopedPriorityCode'.
    // blockScopedPriorityCode is not accessible here (outside its 'if' block)
  }

  // console.log(blockScopedPriorityCode); // Error: Cannot find name 'blockScopedPriorityCode'.
  console.log(`Finished processing ${orderId}. Key used: ${functionScopedApiKey}`); // Can access function scope
}

// console.log(functionScopedApiKey); // Error: Cannot find name 'functionScopedApiKey'. (Not accessible globally)
processOrder("ORDER1");
processOrder("PRIORITY_ORDER2");
```
**(Copy button available in top-right corner)**

**Explanation:**

This example illustrates the different types of scope in JavaScript/TypeScript.

1.  **Global Scope (`globalApiUrl`):**
    *   `globalApiUrl` is declared outside any function or block, making it a global variable.
    *   It can be accessed from anywhere in the code, including inside the `processOrder` function and its inner blocks.
    *   While convenient, excessive use of global variables should be avoided as they can lead to naming collisions and make code harder to reason about.
2.  **Function Scope (`functionScopedApiKey`):**
    *   `functionScopedApiKey` is declared using `const` directly inside the `processOrder` function. Variables declared with `let`, `const` (or the older `var`) inside a function are function-scoped (or more accurately, block-scoped within the function if using `let`/`const`).
    *   It is accessible anywhere *within* the `processOrder` function, including the `if` block.
    *   It cannot be accessed from outside the `processOrder` function (the commented-out `console.log` outside the function would cause an error).
3.  **Block Scope (`blockScopedPriorityCode`):**
    *   `blockScopedPriorityCode` is declared using `const` *inside* the `if` block.
    *   Variables declared with `let` and `const` are **block-scoped**. This means `blockScopedPriorityCode` is *only* accessible within the curly braces `{}` of that specific `if` block where it was defined.
    *   Attempting to access `blockScopedPriorityCode` in the `else` block or after the `if/else` statement (as shown by the commented-out `console.log` lines) results in a compile-time error because it's outside its scope.
    *   Block scoping helps prevent accidental variable reuse and keeps variable lifetimes shorter and more predictable, which is a major advantage over `var`'s function scoping. Attempting to redeclare it even with `let` within the same block also causes an error.

---
<!-- Presenter notes for Closures slide -->
<!-- Introduce closures simply: a function "remembering" its surrounding scope even after that scope has finished executing. Show the classic counter example. Explain that the inner function `increment` still has access to `count` from the outer `createCounter` scope. -->

## Closures (Brief Introduction)

A **closure** is formed when a function "remembers" the environment (scope) in which it was created, even after that outer scope has finished executing. This allows the inner function to access variables from its containing (enclosing) scope.

Closures are a fundamental concept in JavaScript and enable powerful patterns like data privacy and stateful functions.

```typescript
/**
 * Creates a counter function. Demonstrates closure.
 * @returns A function that increments and returns a private count.
 */
function createCounter(): () => number {
  let count: number = 0; // Variable in the outer function's scope

  // This inner function is returned and forms a closure
  const increment = (): number => {
    count++; // Accessing and modifying 'count' from the outer scope
    console.log("Current count:", count);
    return count;
  };

  return increment; // Return the inner function
}

// Create two independent counters
const counterA = createCounter();
const counterB = createCounter();

// Each counter has its own 'count' variable remembered via closure
counterA(); // Output: Current count: 1
counterA(); // Output: Current count: 2
counterB(); // Output: Current count: 1 (Independent count)
counterA(); // Output: Current count: 3
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates a **closure**.

1.  **Outer Function (`createCounter`):** This function defines a local variable `count` initialized to `0`. It then defines an inner arrow function called `increment`. Finally, `createCounter` *returns* the `increment` function itself.
2.  **Inner Function (`increment`):** This function doesn't have its own `count` variable. Instead, it accesses and modifies the `count` variable belonging to its *outer* function, `createCounter`.
3.  **Closure Formation:** When `createCounter()` is called (e.g., `const counterA = createCounter();`), it executes, creates the `count` variable (let's say in memory location #1), creates the `increment` function, and returns `increment`. Normally, when a function finishes executing, its local variables (like `count`) would be cleaned up. However, because the returned `increment` function *still needs access* to `count`, the JavaScript engine keeps `count` (at memory location #1) alive. The combination of the `increment` function and its "remembered" outer scope (containing `count`) is the closure.
4.  **Independent Scopes:** When `createCounter()` is called *again* (`const counterB = createCounter();`), a *new* execution context is created. A *separate* `count` variable (say, at memory location #2) is initialized to `0`, and a *new* `increment` function is created and returned, forming a *separate* closure that remembers the `count` at memory location #2.
5.  **State Preservation:** Each time `counterA()` is called, it accesses and increments the `count` variable from its specific closure (location #1). Each time `counterB()` is called, it accesses and increments the *different* `count` variable from *its* closure (location #2). This shows how closures allow inner functions to maintain state from their creation environment.

---
<!-- Presenter notes for Context slide -->
<!-- Native Devs: Functions are similar, but JS has first-class functions (treat like variables). Scope rules (esp block scope) are key. Closures exist (lambda captures in Kotlin/Swift) but syntax differs. Web Devs: Arrow functions and lexical `this` are important. Block scope is standard. Closures are fundamental JS. -->

## Context for Developers

> **Native Dev Context:** (For Android/iOS Developers)
> Functions/methods are universal, but JavaScript treats functions as "first-class citizens" – they can be assigned to variables, passed as arguments, and returned from other functions, which is more flexible than in traditional Java (though lambdas/method references add similar capabilities) and common in Swift/Kotlin. Scope rules are conceptually similar (local vs. wider scope), but JavaScript's block scope (`let`/`const`) is finer-grained than Java's method/block scope or Swift/Kotlin's block scope. Closures exist in Swift (capturing values) and Kotlin/Java (lambdas capturing final/effectively final variables), but the syntax and nuances differ.

> **Web Dev Context:** (For React/Angular/Vue Developers)
> You're likely familiar with these concepts. Arrow functions (`=>`) are ubiquitous in modern web frameworks, especially for their concise syntax and lexical `this` binding (crucial in React class components, though less so with Hooks). Understanding block scope (`let`/`const`) vs. `var`'s function scope is essential. Closures are a core JavaScript concept you've likely used implicitly or explicitly (e.g., in event handlers, useEffect hooks, private state patterns). TypeScript adds the layer of type safety for parameters and return values.

---
<!-- Presenter notes for Summary slide -->
<!-- Recap: Function types (decl, expr, arrow), params/args/return/void, scope types (global, func, block), closures remembering scope. -->

## Summary

In this lesson, we learned how to structure code using functions and manage variable visibility with scope:

-   **Functions:** Reusable code blocks defined using declarations, expressions, or arrow functions. They accept parameters and can return values (or `void`).
-   **TypeScript:** Enhances functions with type safety for parameters and return values.
-   **Scope:** Determines variable accessibility (Global, Function, Block). `let` and `const` provide essential block scoping.
-   **Closures:** Allow inner functions to access variables from their outer, creation scope, enabling state preservation and other patterns.

---
<!-- Presenter notes for Next Steps slide -->
<!-- Point to Objects/Arrays lesson. Encourage writing small functions and thinking about variable scope. -->

## Next Steps

Practice writing small functions for simple tasks. Think about what parameters they need, what they should return, and where the variables you declare inside them are accessible.

Proceed to **Lesson 04: Objects & Arrays** to learn about JavaScript's primary ways of grouping related data.

**Further Reading:**
-   [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
-   [MDN: Scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope)
-   [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
-   [TypeScript Handbook: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)