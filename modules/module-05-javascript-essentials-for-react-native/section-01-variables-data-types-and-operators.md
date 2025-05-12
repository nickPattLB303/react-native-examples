## Section 1: Variables, Data Types, and Operators (ES6+ Focus: `let`, `const`)

Welcome to the foundational concepts of JavaScript! Variables, data types, and operators are the basic building blocks you'll use in every JavaScript program, including your React Native applications. Understanding them thoroughly is key to writing effective and bug-free code.

### Variables

In JavaScript, a variable is a named container for storing data values. Think of it as a label you can attach to a value, allowing you to refer to and manipulate that value throughout your code. In modern JavaScript (ES6 and later), we primarily use `let` and `const` to declare variables.

> 📲 **(Native Developers):**
> 
> **Comparison:** JavaScript's variable and type system differs significantly from Swift (iOS) and Kotlin/Java (Android). While Swift uses type inference but is statically typed (`var` and `let`), and Kotlin/Java use explicit type declarations, JavaScript is dynamically typed with no need to specify types when declaring variables. Types are associated with values, not variables.
>
> **Key Takeaway:** In JavaScript, a variable can hold any type of value, and that type can change during runtime - there's no compiler enforcing type safety like in native development.
>
> **Source:** [Swift Language Guide: The Basics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/) and [Kotlin Basic Syntax](https://kotlinlang.org/docs/basic-syntax.html#variables)
>
> **Example:**
>
> ```swift
> // Swift: Type is inferred but fixed
> let name: String = "John"
> // name = 42 // Error: Cannot assign value of type 'Int' to type 'String'
> ```
>
> ```kotlin
> // Kotlin: Type is required and fixed
> val name: String = "John"
> // name = 42 // Error: The integer literal does not conform to the expected type String
> ```
>
> ```javascript
> // JavaScript: No type declaration, type can change
> let name = "John";
> name = 42; // Valid in JavaScript
> ```

#### `let`

The `let` keyword declares a block-scoped local variable, optionally initializing it to a value. Block scope means the variable is only accessible within the block of code (typically defined by curly braces `{}`) where it is declared.

- **Re-assignable:** You can change the value of a `let` variable after it's declared.
- **Block-scoped:** Accessible only within the block it's defined in.

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

#### `const`

The `const` keyword declares a block-scoped local variable, similar to `let`, but with a crucial difference: its value cannot be reassigned after declaration. This makes `const` ideal for values that you know shouldn't change, promoting code predictability and preventing accidental modifications.

- **Not Re-assignable (for primitive types):** Once a primitive value is assigned to a `const` variable, it cannot be changed.
- **Block-scoped:** Accessible only within the block it's defined in.
- **Must be initialized:** You must assign a value when you declare a `const` variable.

```javascript
const birthYear = 1990;
console.log(birthYear); // Output: 1990
// birthYear = 1991; // This would cause an error: Assignment to constant variable.

const PI = 3.14159;
// PI = 3.14; // Error!
```

> [!IMPORTANT]
> When `const` is used with objects or arrays, the variable still cannot be reassigned to a _new_ object or array. However, the _contents_ of the object (its properties) or the array (its elements) can still be modified. We'll explore objects and arrays in detail later in this module.

```javascript
const medicationDetails = {
  name: "Lisinopril",
  dosage: "10mg",
};

// We can change a property of the object
medicationDetails.dosage = "20mg";
console.log(medicationDetails.dosage); // Output: 20mg

// But we cannot reassign medicationDetails to a new object
// medicationDetails = { name: 'Amoxicillin', dosage: '250mg' }; // This would cause an error
```

#### What about `var`?

You might encounter `var` in older JavaScript code or examples. `var` was the original way to declare variables before ES6 introduced `let` and `const`. It differs significantly in its scoping and hoisting behavior:

- **Scope:** `var` variables are either **function-scoped** or **globally-scoped**. They are _not_ block-scoped like `let` and `const`. This means a `var` declared inside an `if` block or `for` loop is still accessible outside of that block, within the enclosing function or global scope.
- **Hoisting:** `var` declarations are "hoisted" to the top of their scope (function or global) during compilation. However, only the declaration is hoisted, not the initialization. The variable is implicitly initialized with `undefined`. This allows you to reference a `var` variable before its textual declaration in the code, although its value will be `undefined` until the assignment line is reached.

  ```javascript
  console.log(oldVariable); // Output: undefined (due to hoisting)
  var oldVariable = "I am old";
  console.log(oldVariable); // Output: I am old

  // This behaves as if the code were:
  // var oldVariable; // Declaration hoisted, initialized to undefined
  // console.log(oldVariable);
  // oldVariable = "I am old"; // Assignment happens here
  // console.log(oldVariable);
  ```

- **Re-declaration:** `var` variables can be re-declared within the same scope without error.
  ```javascript
  var x = 10;
  var x = 20; // This is allowed with var
  console.log(x); // Output: 20
  ```

#### Hoisting and the Temporal Dead Zone (TDZ) with `let` and `const`

Like `var`, declarations using `let` and `const` are also technically hoisted to the top of their _block_ scope. However, they are **not** initialized with `undefined`. Instead, they enter a state known as the **Temporal Dead Zone (TDZ)**.

- **TDZ:** The TDZ starts at the beginning of the block and ends when the `let` or `const` declaration statement is evaluated. Attempting to access the variable within the TDZ (before its declaration) results in a `ReferenceError`.
  ```javascript
  {
    // Start of TDZ for myScopedVar
    // console.log(myScopedVar); // ReferenceError: Cannot access 'myScopedVar' before initialization
    let myScopedVar = "Now accessible"; // End of TDZ for myScopedVar
    console.log(myScopedVar); // Output: Now accessible
  }
  ```
- **Why TDZ?** This behavior prevents the use of variables before they are properly declared and initialized, leading to more reliable and less error-prone code compared to `var`'s hoisting behavior.

#### Best Practices for Variable Declaration (Modern JavaScript)

1.  **Prefer `const` by default:** Use `const` whenever you declare a variable whose value is not intended to change after initialization. This makes your intentions clear and prevents accidental reassignments.
2.  **Use `let` only when necessary:** Use `let` only for variables whose values you expect to reassign later in their scope (e.g., loop counters, state variables that change over time).
3.  **Avoid `var`:** In modern ES6+ codebases (including React Native), avoid using `var`. `let` and `const` offer superior block scoping and TDZ behavior, preventing common bugs associated with `var`.
4.  **Declare at the top:** Declare variables (`let` and `const`) at the top of their respective blocks for better readability, even though they are block-scoped regardless of position.

#### Comparison: `var` vs. `let` vs. `const`

| Feature                         | `var`                     | `let`                               | `const`                    |
| :------------------------------ | :------------------------ | :---------------------------------- | :------------------------- |
| **Scope**                       | Function or Global        | Block (`{}`)                        | Block (`{}`)               |
| **Hoisting (Declaration)**      | Yes                       | Yes                                 | Yes                        |
| **Hoisting (Initialization)**   | Yes (to `undefined`)      | No (in TDZ)                         | No (in TDZ)                |
| **Temporal Dead Zone (TDZ)**    | No                        | Yes                                 | Yes                        |
| **Re-declaration (same scope)** | Yes                       | No (`SyntaxError`)                  | No (`SyntaxError`)         |
| **Re-assignment**               | Yes                       | Yes                                 | No (`TypeError`)           |
| **Must be initialized?**        | No (defaults `undefined`) | No (defaults `undefined` after TDZ) | Yes (`SyntaxError` if not) |

> [!NOTE]
> For this course, and in modern React Native development, you should primarily use `let` for variables whose values might change and `const` for variables whose values should remain constant. Avoid `var`.

### Data Types

JavaScript is a dynamically typed language. This means you don't have to explicitly declare the data type of a variable; the type is determined automatically at runtime based on the value assigned. JavaScript has several built-in data types.

#### Primitive Data Types

Primitive types are immutable, meaning their values cannot be changed once created. When you operate on a primitive value, you get a new value. JavaScript has seven primitive data types:

1.  **String:** Represents textual data. Strings are enclosed in single quotes (`'...'`), double quotes (`"..."`), or backticks (`` `...` ``).

    ```javascript
    let pharmacyName = "SpeedyMeds Pharmacy";
    let greeting = "Welcome to " + pharmacyName;
    let message = `Order ready for ${patientName}`;
    console.log(message); // Example Output: Order ready for Jane Smith
    ```

    Backticks allow for template literals, which make embedding expressions in strings easier.

2.  **Number:** Represents both integer and floating-point numbers. JavaScript uses a single 64-bit floating-point format (IEEE 754 standard) for all numbers.

    Special numeric values include `Infinity`, `-Infinity`, and `NaN` (Not a Number).

    - `NaN` often results from invalid operations like `0 / 0` or `parseInt("hello")`.
    - **Quirk:** `NaN` is the only JavaScript value not equal to itself (`NaN === NaN` is `false`). To check if a value is `NaN`, use the global `isNaN()` function or the more reliable `Number.isNaN()` method.

    ```javascript
    let quantity = 100;
    let pricePerUnit = 1.25;
    let totalCost = quantity * pricePerUnit;
    console.log(totalCost); // Output: 125

    let notANumber = 0 / 0;
    console.log(notANumber); // Output: NaN
    console.log(NaN === NaN); // Output: false
    console.log(Number.isNaN(notANumber)); // Output: true
    ```

3.  **Boolean:** Represents a logical entity and can have two values: `true` or `false`.

    ```javascript
    let isPrescriptionRequired = true;
    let isOverTheCounter = false;
    console.log(isPrescriptionRequired); // Output: true
    ```

4.  **Undefined:** A variable that has been declared but not yet assigned a value has the type `undefined`. It also signifies the value returned by functions that don't explicitly return anything or the value of accessing a non-existent object property.

    ```javascript
    let deliveryAddress;
    console.log(deliveryAddress); // Output: undefined
    ```

5.  **Null:** Represents the intentional absence of any object value. It's a primitive value explicitly assigned by developers to signify "no value" or "empty".

    ```javascript
    let selectedMedication = null;
    // Later, this might be assigned an object: selectedMedication = { name: 'Ibuprofen', strength: '200mg' };
    console.log(selectedMedication); // Output: null
    ```

    **`null` vs. `undefined`:**

    - `undefined` usually means a value hasn't been assigned _yet_ (default state).
    - `null` usually means a variable _was explicitly assigned_ the value of "nothing".
    - **Quirk:** `typeof null` returns `"object"`. This is a long-standing historical bug. To check for `null`, use strict equality: `myVar === null`.

6.  **Symbol (ES6):** A unique and immutable primitive value that may be used as the key of an Object property. Symbols are primarily used to create unique property keys, helping avoid naming collisions, especially when dealing with third-party code or internal metaproperties.

    ```javascript
    const uniqueId = Symbol("patientRecordId");
    console.log(uniqueId.toString()); // Output: Symbol(patientRecordId)
    ```

7.  **BigInt (ES2020):** Represents whole numbers larger than 2<sup>53</sup> - 1 (the `Number.MAX_SAFE_INTEGER`), which is the largest integer JavaScript can reliably represent with the standard `Number` type.

    - Create `BigInt`s by appending `n` to an integer literal or using `BigInt()`.
    - Cannot be mixed directly with `Number`s in arithmetic operations; requires explicit conversion.

    ```javascript
    const veryLargeNumber = 9007199254740991n;
    const anotherLargeNumber = BigInt("9007199254740992");
    console.log(veryLargeNumber + 1n); // Output: 9007199254740992n
    // console.log(veryLargeNumber + 1); // TypeError: Cannot mix BigInt and other types
    ```

#### Non-Primitive Data Type (Reference Type)

1.  **Object:** Represents a collection of key-value pairs (properties and methods). Objects are mutable (their content can change) and are considered "reference types," meaning variables hold a reference (memory address) to the object, not the object itself.
    - Includes generic objects (`{}`), arrays (`[]`), functions (`function() {}`), `Date`, `RegExp`, etc.
    ```javascript
    let prescription = {
      patientId: "P1001",
      medication: "Atorvastatin",
      dosage: "40mg",
      refillsRemaining: 2,
    };
    console.log(prescription.medication); // Output: Atorvastatin
    ```
    We will cover objects in more detail in a later section.

### Operators

Operators are special symbols used to perform operations on operands (values and variables).

#### Assignment Operators

Assigns a value to its left operand based on the value of its right operand.

- `=` (Assignment): Assigns the value of the right operand to the left operand.
  `javascript
let stockLevel = 50;
stockLevel += 20; // equivalent to stockLevel = stockLevel + 20;
console.log(stockLevel); // Output: 70
`
  Other assignment operators include `+=`, `-=`, `*=`, `/=`, `%=`.

#### Arithmetic Operators

Perform arithmetic on numbers.

- `+` (Addition)
- `-` (Subtraction)
- `*` (Multiplication)
- `/` (Division)
- `%` (Modulus - remainder of division)
- `**` (Exponentiation - ES7)
- `++` (Increment)
- `--` (Decrement)

```javascript
let itemsInCart = 5;
itemsInCart++; // itemsInCart is now 6

let totalAmount = 120.75;
let discount = 10.5;
let finalAmount = totalAmount - discount;
console.log(finalAmount); // Output: 110.25

console.log(10 % 3); // Output: 1 (remainder of 10 divided by 3)
console.log(2 ** 3); // Output: 8 (2 to the power of 3)
```

#### Comparison Operators

Compare two operands and return a boolean value (`true` or `false`).

- `==` (Equal to - performs type coercion)
- `===` (Strictly equal to - no type coercion, compares value and type)
- `!=` (Not equal to - performs type coercion)
- `!==` (Strictly not equal to - no type coercion)
- `>` (Greater than)
- `<` (Less than)
- `>=` (Greater than or equal to)
- `<=` (Less than or equal to)

> [!IMPORTANT]
> Always prefer strict equality (`===`) and strict inequality (`!==`) operators over their loose counterparts (`==` and `!=`). Strict operators prevent unexpected behavior by not performing type coercion, meaning they check if both the value and the type are the same.

```javascript
let refillCount = 3;
console.log(refillCount === 3); // Output: true
console.log(refillCount === "3"); // Output: false (different types)
console.log(refillCount == "3"); // Output: true (type coercion happens)

let priceA = 15.0;
let priceB = 20.0;
console.log(priceA < priceB); // Output: true
```

#### Logical Operators

Perform logical operations, typically used with boolean values.

- `&&` (Logical AND): Returns `true` if both operands are true.
- `||` (Logical OR): Returns `true` if at least one operand is true.
- `!` (Logical NOT): Returns `true` if the operand is false, and vice versa.

```javascript
let hasValidPrescription = true;
let medicationInStock = false;

console.log(hasValidPrescription && medicationInStock); // Output: false
console.log(hasValidPrescription || medicationInStock); // Output: true
console.log(!medicationInStock); // Output: true
```

Logical operators can also work with non-boolean values (truthy/falsy values), often used for **short-circuiting**:

- `&&` (Logical AND): Returns the _first_ falsy operand it encounters, or the _last_ operand if all are truthy. If the first operand is falsy, the second operand is **not evaluated**. This is useful for conditional execution.

  ```javascript
  let userProfile = { name: "Alice" };
  let displayName = userProfile && userProfile.name; // If userProfile exists, get name
  console.log(displayName); // Output: Alice

  let settings = null;
  // settings.apply() is never called because settings is falsy
  let result = settings && settings.apply();
  console.log(result); // Output: null
  ```

- `||` (Logical OR): Returns the _first_ truthy operand it encounters, or the _last_ operand if all are falsy. If the first operand is truthy, the second operand is **not evaluated**. This is commonly used for providing default values.

  ```javascript
  let inputUsername = "";
  let username = inputUsername || "Guest"; // If input is empty (falsy), use 'Guest'
  console.log(username); // Output: Guest

  let configValue = { port: 8080 };
  let port = configValue || { port: 3000 }; // configValue is truthy, so it's used
  console.log(port); // Output: { port: 8080 }
  ```

#### String Operators

- `+` (Concatenation): Joins two strings together.
  ```javascript
  let firstName = "Sarah";
  let lastName = "Connor";
  let fullName = firstName + " " + lastName;
  console.log(fullName); // Output: Sarah Connor
  ```

#### Ternary Operator

Also known as the conditional operator, it's a shorthand for an `if...else` statement.

- `condition ? exprIfTrue : exprIfFalse`

```javascript
let patientAge = 25;
let ageCategory = patientAge >= 18 ? "Adult" : "Pediatric";
console.log(ageCategory); // Output: Adult
```

#### Type Operators

- `typeof`: Returns a string indicating the type of an unevaluated operand.
  ```javascript
  let drugName = "Aspirin";
  let dosageMg = 100;
  console.log(typeof drugName); // Output: string
  console.log(typeof dosageMg); // Output: number
  console.log(typeof { id: 1 }); // Output: object
  console.log(typeof null); // Output: object (this is a known quirk in JavaScript)
  ```
- `instanceof`: Returns `true` if the specified object is an instance of the specified constructor or any of its ancestors.
  ```javascript
  let anArray = [1, 2, 3];
  let aDate = new Date();
  console.log(anArray instanceof Array); // Output: true
  console.log(aDate instanceof Date); // Output: true
  ```

#### Other Operators

JavaScript includes other operators for more specific tasks:

- **Logical Assignment Operators (ES2021+):** Combine logical operations with assignment.
  - `&&=` (Logical AND assignment): `x &&= y` is like `x && (x = y)`. Assigns `y` to `x` only if `x` is truthy.
  - `||=` (Logical OR assignment): `x ||= y` is like `x || (x = y)`. Assigns `y` to `x` only if `x` is falsy.
  - `??=` (Nullish Coalescing assignment): `x ??= y` is like `x ?? (x = y)`. Assigns `y` to `x` only if `x` is `null` or `undefined`.
- **Unary Operators:**
  - `+` (Unary Plus): Tries to convert its operand to a number (e.g., `+"42"` results in `42`).
  - `-` (Unary Negation): Negates its numeric operand.
- **Bitwise Operators:** Perform operations on the binary representation of numbers (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`). Less common in typical application logic.
- **Comma Operator:** Evaluates multiple expressions left-to-right and returns the value of the last expression. Rarely used.
- **Relational Operators:**
  - `in`: Checks if an object has a given property (including inherited ones).
    ```javascript
    const car = { make: "Toyota", model: "Camry" };
    console.log("make" in car); // Output: true
    console.log("toString" in car); // Output: true (inherited from Object prototype)
    ```

### Operator Precedence and Associativity

When an expression contains multiple operators, JavaScript follows specific rules to determine the order of evaluation:

1.  **Precedence:** Which operations are performed first. Operators with higher precedence are evaluated before those with lower precedence. For example, multiplication (`*`) has higher precedence than addition (`+`).
    ```javascript
    let result = 3 + 5 * 2; // 5 * 2 is evaluated first (10), then 3 + 10
    console.log(result); // Output: 13
    ```
2.  **Associativity:** Which order operators with the _same_ precedence are evaluated in (left-to-right or right-to-left).
    - Most operators are **left-to-right** (e.g., `a - b + c` is evaluated as `(a - b) + c`).
    - Assignment (`=`, `+=`, etc.), ternary (`? :`), and exponentiation (`**`) operators are **right-to-left** (e.g., `a = b = 5` is evaluated as `a = (b = 5)`).

**Parentheses `()`** can always be used to override the default precedence and associativity rules and explicitly control the order of evaluation.

```javascript
let resultWithParens = (3 + 5) * 2; // 3 + 5 is evaluated first (8), then 8 * 2
console.log(resultWithParens); // Output: 16
```

Understanding precedence is crucial for writing correct code. Here's a simplified table of common operator precedence (higher number means higher precedence):

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

> [!TIP]
> When in doubt, use parentheses `()` to make the order of operations explicit and improve code readability.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
> - [MDN Web Docs: `let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
> - [MDN Web Docs: `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
> - [MDN Web Docs: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

### Next Steps

Now that you have a grasp of variables, data types, and operators, you're ready to learn how to control the flow of your JavaScript programs. Proceed to [Section 2: Control Flow](./section-02-control-flow.md) to explore conditional statements and loops.
