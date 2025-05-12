## Section 1: Variables, Data Types, and Operators (ES6+ Focus: `let`, `const`)

Welcome to the foundational concepts of JavaScript! Variables, data types, and operators are the basic building blocks you'll use in every JavaScript program, including your React Native applications. Understanding them thoroughly is key to writing effective and bug-free code.

### Variables

In JavaScript, a variable is a named container for storing data values. Think of it as a label you can attach to a value, allowing you to refer to and manipulate that value throughout your code. The process of using a variable typically involves declaration (introducing its name) and initialization (assigning an initial value).

#### `var` (Legacy)

The `var` keyword was the original method for declaring variables in JavaScript.

- **Scope:** Variables declared with `var` are function-scoped or globally-scoped. If declared within a function, they are accessible only within that function. If declared outside any function, they become global variables.
- **Hoisting:** `var` declarations are subject to hoisting. During compilation, the JavaScript engine moves `var` declarations to the top of their scope. However, only the declaration is hoisted, not the initialization. This means a `var` variable can be referenced before its textual declaration, but its value will be `undefined` until the assignment line is executed.
  - **Under the Hood:** The engine allocates memory and assigns `undefined` during the declaration phase. For example:
    ```javascript
    console.log(myVar); // Outputs: undefined
    var myVar = 5;
    console.log(myVar); // Outputs: 5
    // This behaves as if the code were:
    // var myVar; // Declaration hoisted and initialized to undefined
    // console.log(myVar);
    // myVar = 5; // Assignment happens here
    // console.log(myVar);
    ```
- **Re-declaration & Re-assignment:** `var` variables can be re-declared within the same scope without error and can be re-assigned new values.
- **Usage:** While functional, `var` is generally discouraged in modern JavaScript (ES6+) due to potential confusion caused by its scoping and hoisting rules. `let` and `const` offer more predictable behavior.

#### `let` (ES6+)

The `let` keyword, introduced in ES6, provides a more modern way to declare variables whose values might change.

- **Scope:** `let` variables are **block-scoped**. A block is any code enclosed in curly braces `{}`, like in `if` statements or `for` loops.
- **Hoisting and Temporal Dead Zone (TDZ):** `let` declarations are hoisted to the top of their block scope but are **not** initialized. They enter a state known as the Temporal Dead Zone (TDZ) from the start of the block until their declaration is encountered. Attempting to access a `let` variable within its TDZ results in a `ReferenceError`.
  - **Under the Hood:** The TDZ ensures variables are not accessed before they are properly declared. This prevents errors common with `var` where a variable might be used while holding `undefined` before its intended initialization.
    ```javascript
    // console.log(drugCategory); // ReferenceError: Cannot access 'drugCategory' before initialization
    let drugCategory = "Analgesic";
    console.log(drugCategory); // Output: Analgesic
    ```
- **Re-declaration:** Cannot be re-declared within the same scope (results in a `SyntaxError`).
- **Re-assignment:** Can be re-assigned new values after declaration.

This example demonstrates declaring and re-assigning a `let` variable:

```javascript
let patientName = "John Doe";
console.log(patientName); // Output: John Doe

patientName = "Jane Smith"; // Value can be changed
console.log(patientName); // Output: Jane Smith

if (true) {
  let age = 30; // age is block-scoped to this if-block
  console.log(age); // Output: 30
}
// console.log(age); // This would cause an error: age is not defined outside the block
```

#### `const` (ES6+)

The `const` keyword is used for declaring constants—variables whose values are not intended to change after initialization.

- **Scope:** `const` variables are block-scoped, like `let`.
- **Hoisting and TDZ:** Similar to `let`, `const` declarations are hoisted but remain in the TDZ until declared. Accessing them before declaration causes a `ReferenceError`.
- **Initialization:** Must be initialized at the time of declaration.
- **Re-declaration:** Cannot be re-declared within the same scope.
- **Re-assignment:** Cannot be re-assigned a new value after initialization (results in a `TypeError`). This enforces the immutability of the variable's binding.

```javascript
const birthYear = 1990;
console.log(birthYear); // Output: 1990
// birthYear = 1991; // This would cause a TypeError: Assignment to constant variable.

const MAX_REFILLS = 5;
// MAX_REFILLS = 6; // Error!
```

> [!IMPORTANT]
> When `const` is used with objects or arrays (which are reference types), the variable's binding is immutable (it cannot be made to point to a _new_ object or array). However, the _contents_ (properties or elements) of the referenced object or array can still be modified.

```javascript
const medicationDetails = {
  name: "Lisinopril",
  dosage: "10mg",
};

// We can change a property of the object
medicationDetails.dosage = "20mg";
medicationDetails.requiresPrescription = true; // Add new property
console.log(medicationDetails.dosage); // Output: 20mg

// But we cannot reassign medicationDetails to a new object
// medicationDetails = { name: 'Amoxicillin', dosage: '250mg' }; // This would cause a TypeError
```

#### Best Practices for Variable Declaration

- **Prefer `const` by default:** Use `const` for all declarations unless you explicitly know the variable's value will need to change. This promotes immutability and makes code more predictable.
- **Use `let` for re-assignable variables:** If a variable's value is expected to be updated, declare it using `let`.
- **Avoid `var`:** In ES6+ environments, minimize or avoid `var` to prevent issues related to its function-scoping and hoisting behavior.
- **Declare at the top of their scope:** For readability, declare variables at the beginning of the block (`let`, `const`) where they are used.

#### Table 1.1: `var` vs. `let` vs. `const`

| Feature                     | `var`                        | `let`                                  | `const`                    |
| --------------------------- | ---------------------------- | -------------------------------------- | -------------------------- |
| Scope                       | Function or Global           | Block (`{}`)                           | Block (`{}`)               |
| Hoisting (Declaration)      | Yes                          | Yes                                    | Yes                        |
| Hoisting (Initialization)   | Yes (to `undefined`)         | No (in TDZ)                            | No (in TDZ)                |
| Temporal Dead Zone (TDZ)    | No                           | Yes                                    | Yes                        |
| Re-declaration (same scope) | Yes                          | No (`SyntaxError`)                     | No (`SyntaxError`)         |
| Re-assignment               | Yes                          | Yes                                    | No (`TypeError`)           |
| Must be initialized?        | No (defaults to `undefined`) | No (defaults to `undefined` after TDZ) | Yes (`SyntaxError` if not) |

### Data Types

JavaScript is a dynamically-typed language. Variable types are determined at runtime based on the assigned value, and a variable can hold different types over its lifetime.

#### Primitive Data Types

Primitive types represent single, immutable values (the value itself cannot be changed, though a variable holding it can be reassigned to a new primitive value).

1.  **String:** Represents textual data. Strings are sequences of characters, enclosed in single quotes (`'...'`), double quotes (`"..."`), or backticks (`` `...` ``). Strings are immutable; operations that seem to modify a string actually create a new one.

    ```javascript
    let pharmacyName = "SpeedyMeds Pharmacy";
    let greeting = "Welcome to " + pharmacyName;
    let message = `Order for ${patientName} is ready.`; // Template literal
    console.log(message); // Example Output: Order for Jane Smith is ready.
    ```

2.  **Number:** Represents both integer and floating-point numbers using a 64-bit floating-point format (IEEE 754). Special values: `Infinity`, `-Infinity`, `NaN` (Not a Number).

    ```javascript
    let quantity = 100;
    let pricePerUnit = 1.25;
    console.log(Number.isNaN(0 / 0)); // true. Prefer Number.isNaN() over global isNaN().
    ```

3.  **Boolean:** Represents `true` or `false`. Used in logical operations.

    ```javascript
    let isPrescriptionRequired = true;
    ```

4.  **Undefined:** A variable declared but not assigned a value has the type and value `undefined`.

    ```javascript
    let deliveryAddress;
    console.log(deliveryAddress); // Output: undefined
    ```

5.  **Null:** Represents the intentional absence of any object value. It's a primitive value assigned by programmers to indicate "no value" or "empty."

    ```javascript
    let selectedMedication = null;
    console.log(typeof selectedMedication); // Output: "object" (a known quirk)
    console.log(selectedMedication === null); // true (correct way to check for null)
    ```

    **Distinction between `null` and `undefined`:** `undefined` typically means a value hasn't been provided (e.g., uninitialized variable). `null` is used to explicitly indicate an absence of value.

6.  **Symbol (ES6):** Unique and immutable identifiers, often used as unique property keys for objects.

    ```javascript
    const uniquePrescriptionId = Symbol("prescriptionID");
    ```

7.  **BigInt (ES2020):** Represents whole numbers larger than the `Number` type can safely store. Created by appending `n` or using `BigInt()`.
    ```javascript
    const veryLargeDose = 90071992547409912345n;
    ```

#### Non-Primitive Data Type (Reference Type)

1.  **Object:** A complex data structure representing a collection of key-value pairs (properties). Objects are mutable (their contents can change) and are reference types (variables store a reference to the object's location in memory).
    ```javascript
    let prescription = {
      patientId: "P1001",
      medication: "Atorvastatin",
      isOTC: false,
    };
    // Arrays and Functions are also types of objects.
    ```

### Operators

Operators perform operations on operands (values/variables).

#### Assignment Operators

- `=` (Assignment): Assigns right operand's value to left operand.
- Compound: `+=`, `-=`, `*=`, `/=`, `%=`, `**=` (ES2016 - exponentiation assignment).
  ```javascript
  let stockLevel = 50;
  stockLevel += 20; // stockLevel is now 70
  ```
- **Logical Assignment Operators (ES2021+):** Combine logical operations with assignment.
  - `&&=` (Logical AND assignment): `x &&= y` is `x && (x = y)`. Assigns if `x` is truthy.
  - `||=` (Logical OR assignment): `x ||= y` is `x || (x = y)`. Assigns if `x` is falsy.
  - `??=` (Nullish Coalescing assignment): `x ??= y` is `x ?? (x = y)`. Assigns if `x` is `null` or `undefined`.
  ```javascript
  let options = { defaultDosage: null };
  options.defaultDosage ??= "10mg"; // options.defaultDosage becomes '10mg'
  console.log(options.defaultDosage);
  ```

#### Arithmetic Operators

`+`, `-`, `*`, `/`, `%` (modulus), `**` (exponentiation - ES2016), `++` (increment), `--` (decrement). Unary `+` converts to number, unary `-` negates.

#### Comparison Operators

Return boolean: `==` (loose equality, type coercion), `===` (strict equality, no coercion - **preferred**), `!=`, `!==` (**preferred**), `>`, `<`, `>=`, `<=`.

#### Logical Operators

`&&` (logical AND), `||` (logical OR), `!` (logical NOT). Exhibit short-circuiting.

#### String Operators

`+` (concatenation).

#### Conditional (Ternary) Operator

`condition ? exprIfTrue : exprIfFalse`.

#### Type Operators

- `typeof`: Returns string indicating operand's type (e.g., `"string"`, `"number"`, `"object"`).
- `instanceof`: Checks if an object is an instance of a particular constructor/class.
- `void`: Evaluates an expression and returns `undefined`. Used to get `undefined` reliably or prevent an expression from returning a value.

#### Bitwise Operators

Treat operands as 32-bit sequences: `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`. Less common in typical application logic.

#### Operator Precedence and Associativity

When an expression contains multiple operators, JavaScript uses rules of precedence and associativity to determine the evaluation order.

- **Precedence:** Determines which operator is performed first. Higher precedence operators are evaluated before lower ones (e.g., `*` before `+`).
- **Associativity:** Determines the order for operators with the same precedence (left-to-right or right-to-left). Most are left-to-right (e.g., `a - b - c` is `(a - b) - c`). Assignment, conditional (ternary), and exponentiation are right-to-left.
- **Parentheses `()`:** Used to explicitly control the order of evaluation, overriding default rules.

Understanding these rules is crucial for writing correct code. For example, `3 + 10 * 2` evaluates `10 * 2` first (20), then `3 + 20` (23). Using parentheses, `(3 + 10) * 2` evaluates `3 + 10` first (13), then `13 * 2` (26).

#### Table 1.2: Operator Precedence and Associativity (Common Operators - Simplified)

|  Precedence  | Operator(s)                                                         | Description                                                | Associativity |
| :----------: | :------------------------------------------------------------------ | :--------------------------------------------------------- | :-----------: |
| 19 (Highest) | `()`                                                                | Grouping                                                   |      n/a      |
|      18      | `.` `?.` `[]` `new` (with args)                                     | Member Access, Optional Chaining, Call                     |      L-R      |
|      17      | `new` (without args)                                                | Instantiation                                              |      R-L      |
|      16      | `++` `--` (postfix)                                                 | Postfix Increment/Decrement                                |      n/a      |
|      15      | `!` `~` `+` `-` (unary) `++` `--` (prefix) `typeof` `void` `delete` | Logical/Bitwise NOT, Unary, Prefix Inc/Dec, Type Operators |  R-L (unary)  |
|      14      | `**`                                                                | Exponentiation                                             |      R-L      |
|      13      | `*` `/` `%`                                                         | Multiplication, Division, Remainder                        |      L-R      |
|      12      | `+` `-` (binary)                                                    | Addition, Subtraction                                      |      L-R      |
|      11      | `<<` `>>` `>>>`                                                     | Bitwise Shifts                                             |      L-R      |
|      10      | `<` `<=` `>` `>=` `in` `instanceof`                                 | Relational, `in`, `instanceof`                             |      L-R      |
|      9       | `==` `!=` `===` `!==`                                               | Equality                                                   |      L-R      |
|      8       | `&`                                                                 | Bitwise AND                                                |      L-R      |
|      7       | `^`                                                                 | Bitwise XOR                                                |      L-R      |
|      6       | `\|`                                                                | Bitwise OR                                                 |      L-R      |
|      5       | `&&`                                                                | Logical AND                                                |      L-R      |
|      4       | `\|\|`                                                              | Logical OR                                                 |      L-R      |
|      3       | `??`                                                                | Nullish Coalescing                                         |      L-R      |
|      2       | `? :`                                                               | Conditional (Ternary)                                      |      R-L      |
|      1       | `=` `+=` `-=` `**=` `*=`, etc. `&&=` `\|\|=` `??=`                  | Assignment, Logical Assignment                             |      R-L      |
|  0 (Lowest)  | `,`                                                                 | Comma                                                      |      L-R      |

_(Adapted from MDN Operator Precedence Table. For a complete list, always refer to the official MDN documentation.)_

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
> - [MDN Web Docs: `let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
> - [MDN Web Docs: `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
> - [MDN Web Docs: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
> - [MDN Web Docs: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

### Next Steps

Now that you have a grasp of variables, data types, and operators, you're ready to learn how to control the flow of your JavaScript programs. Proceed to [Section 2: Control Flow](./section-02-control-flow.md) to explore conditional statements and loops.
