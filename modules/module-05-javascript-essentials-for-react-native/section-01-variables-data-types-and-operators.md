## Section 1: Variables, Data Types, and Operators (ES6+ Focus: let, const)

This section establishes the groundwork for comprehending how data is declared, stored, classified, and manipulated within JavaScript. It places a strong emphasis on contemporary ES6+ practices for variable declaration and provides a comprehensive overview of the fundamental data types and operators you will use daily in React Native development.

> 🛣️ **All Learners:** A solid understanding of JavaScript fundamentals is crucial for success in React Native. Take your time with this section, even if some concepts seem familiar. Pay close attention to the nuances of modern JavaScript features like `let`, `const`, destructuring, and the spread/rest operators, as these are heavily used in React and React Native codebases.

### Variables, Declarations, and Scope

In JavaScript, variables serve as named containers for storing data values that can be referenced and manipulated throughout a program. Their use is fundamental for holding data that may change during program execution or needs to be accessed multiple times. The process of using a variable typically involves two steps: declaration, which introduces the variable's name to the JavaScript engine, and initialization, which assigns an initial value to the variable.

Historically, the `var` keyword was the primary way to declare variables. However, modern JavaScript (ES6 and later) introduced `let` and `const`, which offer improved scoping and predictability.

#### `var` Keyword (Legacy)

The `var` keyword was the original method for declaring variables in JavaScript.

-   **Scope:** Variables declared with `var` possess either function scope or global scope. If declared within a function, they are accessible only within that function. If declared outside any function, they become global variables, accessible from anywhere in the program. This scoping rule can sometimes lead to unexpected behavior, especially in larger applications, as variables might unintentionally overwrite others or be accessible in broader contexts than intended.
-   **Hoisting:** `var` declarations are subject to a behavior known as hoisting. During the compilation phase, the JavaScript engine moves the declarations of `var` variables to the top of their respective scope (either function or global). However, only the declaration is hoisted, not the initialization. This means a variable declared with `var` can be referenced before its textual declaration in the code, but its value will be `undefined` until the line where it is assigned a value is executed.

> [!CAUTION]
> The hoisting behavior of `var` can lead to unexpected results and bugs, as a variable can be used before it is explicitly declared in the code, resulting in an `undefined` value rather than an error.

**Under the Hood:** The JavaScript engine processes variable declarations before executing any code. For `var` declarations, it allocates memory and assigns `undefined` as the initial value.

This example shows `var` hoisting:

```javascript
console.log(medicationName); // Outputs: undefined
var medicationName = "Aspirin";
console.log(medicationName); // Outputs: Aspirin
```

This behaves as if the code were:

```javascript
var medicationName; // Declaration hoisted and initialized to undefined
console.log(medicationName); // Outputs: undefined
medicationName = "Aspirin"; // Assignment happens here
console.log(medicationName); // Outputs: Aspirin
```

-   **Re-declaration:** Variables declared with `var` can be re-declared within the same scope without generating an error. For instance, `var count = 10; var count = 20;` is valid.
-   **Re-assignment:** `var` variables can be re-assigned new values after their initial declaration.
-   **Legacy Status:** While `var` is still functional, its use is generally discouraged in modern JavaScript (ES6 and beyond) development. The introduction of `let` and `const` provides more predictable scoping and helps avoid common pitfalls associated with `var`.

#### `let` Keyword (ES6+)

The `let` keyword, introduced in ES6, provides a more modern and robust way to declare variables.

-   **Scope:** `let` variables are block-scoped. A block is defined by any code enclosed in curly braces `{}`, such as in `if` statements, `for` loops, or even standalone blocks of code. This means a `let` variable is only accessible within the specific block in which it is defined, which significantly reduces the risk of accidental variable name collisions and improves code modularity.
-   **Hoisting and Temporal Dead Zone (TDZ):** `let` declarations are also hoisted to the top of their block scope, but unlike `var`, they are not initialized with `undefined`. Instead, they enter a state known as the Temporal Dead Zone (TDZ). Attempting to access a `let` variable before its declaration in the code results in a `ReferenceError`.

**Under the Hood:** The TDZ begins at the start of the block and ends when the `let` declaration is encountered and evaluated. During this period, the variable exists in memory but is inaccessible. This behavior is a deliberate design choice to prevent the use of variables before they are properly declared and initialized, leading to more reliable code.

This example shows the Temporal Dead Zone for `let`:

```javascript
{
  // console.log(patientId); // This would cause a ReferenceError: Cannot access 'patientId' before initialization
  let patientId = "P123";
  console.log(patientId); // Outputs: P123
}
```

-   **Re-declaration:** `let` variables cannot be re-declared within the same scope. Attempting to do so will result in a `SyntaxError`. For example, `let quantity = 10; let quantity = 20;` is invalid.
-   **Re-assignment:** `let` variables can be re-assigned new values after their declaration.
-   **Modern Practice:** `let` is the preferred keyword for declaring variables whose values are expected to change during the program's execution.

#### `const` Keyword (ES6+)

The `const` keyword, also introduced in ES6, is used for declaring constants, i.e., variables whose values are not intended to change after initialization.

-   **Syntax:** `const variableName = value;`. Variables declared with `const` must be initialized at the time of declaration. Omitting the initializer will result in a `SyntaxError`.
-   **Scope:** `const` variables are block-scoped, identical to `let` variables.
-   **Hoisting and Temporal Dead Zone (TDZ):** Similar to `let`, `const` declarations are hoisted to the top of their block but are not initialized. They are also subject to the TDZ, and accessing them before their declaration results in a `ReferenceError`. The TDZ for `const` is particularly important as it ensures that a constant cannot be accessed before its mandatory initial value is assigned, upholding its immutability principle from the point of declaration.
-   **Re-declaration:** `const` variables cannot be re-declared within the same scope, similar to `let`.
-   **Re-assignment:** `const` variables cannot be re-assigned a new value after they have been initialized. Attempting to do so will result in a `TypeError`. This enforces the immutability of the variable's binding.

> [!IMPORTANT]
> It is crucial to understand that `const` makes the variable *binding* immutable, not necessarily the *value* it holds if that value is an object or an array. If a `const` variable references an object or an array, the properties of that object or the elements of that array can still be modified.

This example shows that while the `const` variable itself cannot be reassigned, the contents of an object or array assigned to it can be modified:

```javascript
const medication = { name: "Ibuprofen", strength: "200mg" };
medication.strength = "400mg"; // This is allowed - modifying a property of the object
console.log(medication.strength); // Outputs: 400mg

const dosageSchedule = ["Morning", "Evening"];
dosageSchedule.push("Afternoon"); // This is allowed - adding an element to the array
console.log(dosageSchedule); // Outputs: ["Morning", "Evening", "Afternoon"]

// medication = { name: "Naproxen" }; // This would cause a TypeError: Assignment to constant variable.
// dosageSchedule = []; // This would also cause a TypeError: Assignment to constant variable.
```

-   **Modern Practice:** `const` is the preferred keyword for declaring variables whose values should remain unchanged after initialization. This practice promotes code predictability and helps prevent accidental modifications. It is advisable to use `const` by default and switch to `let` only when it is clear that the variable's value needs to be reassigned.

#### Best Practices for Variable Declaration

In modern JavaScript development, adhering to certain best practices for variable declaration can significantly improve code quality:

-   **Prefer `const` by default:** Use `const` for all variable declarations unless you explicitly know that the variable's value will need to change. This helps in creating more predictable and less error-prone code.
-   **Use `let` for re-assignable variables:** If a variable's value is expected to be updated later in its scope, declare it using `let`.
-   **Avoid `var`:** In ES6+ environments, the use of `var` should be avoided to prevent issues related to its function-scoping and hoisting behavior, which can lead to confusion and bugs. The introduction of `let` and `const` with block scope and the TDZ directly addresses these historical pitfalls, offering more refined control over variable lifecycles. The TDZ, for instance, by throwing a `ReferenceError` on premature access, forces developers to declare variables before use, which is a safer practice.
-   **Declare variables at the top of their scope:** For better readability, declare variables at the beginning of the block (for `let` and `const`) or function (if still using `var`) where they are used. While hoisting moves declarations, explicit declaration at the top makes the code easier to follow.

> 🌐 **Web Developers:** If you are coming from a web development background, particularly with modern frameworks, you are likely already familiar with `let` and `const` and block scoping. The concepts of hoisting and the TDZ might be slightly different depending on your prior experience, so ensure you understand these JavaScript-specific behaviors.
>
> 📲 **Native Developers:** In languages like Java (Android) or Swift (iOS), you are used to explicitly declaring variable types and their mutability (`final` in Java, `let`/`var` in Swift). JavaScript's dynamic typing and the distinction between `let` (mutable reference) and `const` (immutable reference, but potentially mutable value for objects/arrays) are key differences to grasp. Pay attention to how scope works differently with `var` (function scope) compared to `let`/`const` (block scope).

This table summarizes the key differences between `var`, `let`, and `const`:

Table 1.1: `var` vs. `let` vs. `const`

| Feature                 | `var`                 | `let`                 | `const`                 |
| :---------------------- | :-------------------- | :-------------------- | :---------------------- |
| Scope                   | Function or Global    | Block (`{}`)          | Block (`{}`)            |
| Hoisting (Declaration)  | Yes                   | Yes                   | Yes                     |
| Hoisting (Initialization)| Yes (to `undefined`)  | No (in TDZ)           | No (in TDZ)             |
| Temporal Dead Zone (TDZ)| No                    | Yes                   | Yes                     |
| Re-declaration (scope)  | Yes                   | No (`SyntaxError`)    | No (`SyntaxError`)      |
| Re-assignment           | Yes                   | Yes                   | No (`TypeError`)        |
| Must be initialized?    | No (defaults to `undefined`)| No (defaults to `undefined` after TDZ)| Yes (`SyntaxError` if not)|

### Data Types

Data types are fundamental classifications that specify the kind of value a variable can hold and the operations that can be performed on that value. JavaScript is a dynamically-typed language, which means that variable types are determined at runtime based on the value assigned to them, rather than being explicitly declared by the programmer in the code. A single variable can hold different data types over its lifetime.

JavaScript data types are broadly categorized into two main groups: Primitive Data Types and the Object Type.

#### Primitive Data Types

Primitive data types represent single, immutable values. "Immutable" means that the value itself cannot be changed once it's created; however, a variable holding a primitive value can be reassigned to a new primitive value. JavaScript has seven primitive data types:

-   **String:** Represents textual data. Strings are sequences of characters. They can be enclosed in single quotes (e.g., `'hello'`), double quotes (e.g., `"world"`), or backticks (e.g., `` `template literal` ``). Backticks enable template literals, which allow for embedded expressions and multi-line strings. Strings are immutable; operations on strings create new strings.

    ```javascript
    const patientName = "Alice Smith";
    const medicationDosage = `Take ${250}mg daily.`; // Template literal with embedded expression
    console.log(patientName); // Outputs: Alice Smith
    console.log(medicationDosage); // Outputs: Take 250mg daily.
    ```

-   **Number:** Represents both integer and floating-point numbers. JavaScript uses a 64-bit floating-point format (IEEE 754 standard) to store all numbers. This single representation means there's no distinct integer type as in some other languages. Special numeric values include `Infinity`, `-Infinity`, and `NaN` (Not-a-Number).

    ```javascript
    const quantity = 100; // Integer
    const price = 15.75; // Floating-point
    const result = 0 / 0; // NaN
    console.log(quantity); // Outputs: 100
    console.log(price); // Outputs: 15.75
    console.log(result); // Outputs: NaN
    console.log(typeof quantity); // Outputs: number
    ```

-   **Boolean:** Represents logical entities and can have only two values: `true` or `false`. Booleans are extensively used in conditional statements and control flow logic.

    ```javascript
    const isPrescriptionValid = true;
    const needsRefill = false;
    console.log(isPrescriptionValid); // Outputs: true
    console.log(typeof isPrescriptionValid); // Outputs: boolean
    ```

-   **Null:** Represents the intentional absence of any object value. It is a primitive value that signifies "no value" or "empty".

    > [!IMPORTANT]
    > A long-standing quirk in JavaScript is that `typeof null` returns `"object"`. This is a historical bug and should not be interpreted as `null` being an object. To check for `null`, one should use strict equality: `myVar === null`.

    ```javascript
    let activePatient = null; // Explicitly indicating no patient object yet
    console.log(activePatient); // Outputs: null
    console.log(typeof activePatient); // Outputs: object (due to the historical bug)
    console.log(activePatient === null); // Outputs: true (correct way to check for null)
    ```

-   **Undefined:** Represents a variable that has been declared but has not yet been assigned a value. It also signifies the value returned by functions that do not explicitly return a value, or the value of a non-existent object property. The `typeof undefined` correctly returns `"undefined"`.

    ```javascript
    let futureAppointment; // Declared but not initialized - value is undefined
    console.log(futureAppointment); // Outputs: undefined
    console.log(typeof futureAppointment); // Outputs: undefined

    const patient = { name: "Bob" };
    console.log(patient.address); // Property 'address' does not exist - outputs undefined
    ```

    **Distinction between `null` and `undefined`:** While both can represent an absence of value, they have different semantic meanings and origins. `undefined` typically signifies that a value is missing by default or has not been provided by the system (e.g., an uninitialized variable, a missing function argument). `null` is generally used by programmers to explicitly indicate that a variable should have no value or that an object reference is intentionally empty.

-   **Symbol (ES6+):** Represents unique and immutable identifiers. Symbols are typically used to create unique property keys for objects, helping to avoid naming collisions, especially when adding properties to objects from external sources or for internal metaproperties.

    ```javascript
    const prescriptionId = Symbol("prescription");
    const anotherPrescriptionId = Symbol("prescription");
    console.log(prescriptionId === anotherPrescriptionId); // Outputs: false (Symbols are unique)

    const medicationRecord = {
      name: "Amoxicillin",
      [prescriptionId]: "RX12345" // Using a Symbol as a property key
    };
    console.log(medicationRecord[prescriptionId]); // Outputs: RX12345
    console.log(typeof prescriptionId); // Outputs: symbol
    ```

-   **BigInt (ES2020+):** Represents whole numbers that can be arbitrarily large, exceeding the safe integer limit of the standard `Number` type (which is 2<sup>53</sup> - 1). `BigInt` values are created by appending `n` to an integer literal (e.g., `12345678901234567890n`) or by calling the `BigInt()` constructor. `BigInt`s cannot be mixed directly with `Number`s in arithmetic operations; explicit conversion is required.

    ```javascript
    const largePatientCount = 9007199254740991n + 10n; // Using BigInt for large numbers
    console.log(largePatientCount); // Outputs: 9007199254741001n
    console.log(typeof largePatientCount); // Outputs: bigint
    ```

#### Object Type (Reference Type)

The Object type is the second main category of data types in JavaScript. Unlike primitive types, objects are complex data structures that can store collections of key-value pairs. These pairs are known as properties (if the value is data) or methods (if the value is a function).

-   Objects are mutable, meaning their content (properties and methods) can be changed after they are created.
-   Variables that hold objects actually store a reference (or a memory address) to the location where the object is stored in memory, rather than the object itself. This has implications for how objects are copied and passed to functions (covered in more detail in Section 4).
-   The Object type encompasses various built-in constructs, including generic objects (`{}`), Arrays (`[]`), Functions, Date objects, Regular Expressions, and many more.

```javascript
const patientProfile = {
  name: "Jane Doe",
  age: 45,
  medications: ["Lisinopril", "Metformin"],
  address: {
    street: "123 Pharmacy Ln",
    city: "Medville"
  },
  isActive: true,
  greet: function() { // A method
    console.log("Hello, " + this.name);
  }
};

console.log(patientProfile.name); // Accessing a property
patientProfile.age = 46; // Modifying a property
patientProfile.greet(); // Calling a method
console.log(typeof patientProfile); // Outputs: object
console.log(typeof patientProfile.greet); // Outputs: function (Functions are a special type of object)
```

> 🌐 **Web Developers:** If you are familiar with JSON (JavaScript Object Notation), JavaScript objects are very similar in structure, using key-value pairs. The concept of objects as mutable, reference types is common across many programming languages.
>
> 📲 **Native Developers:** JavaScript's dynamic typing means you don't declare the type of a variable when you create it. This is a significant difference from statically typed languages like Java or Swift. Also, be mindful that JavaScript's `Number` type handles all numbers (integers and floats), unlike languages with distinct integer and floating-point types. The `typeof null` quirk is unique to JavaScript.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
> - [MDN Web Docs: `typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
> - [MDN Web Docs: `null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
> - [MDN Web Docs: `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
> - [MDN Web Docs: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
> - [MDN Web Docs: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

### Operators

Operators in JavaScript are special symbols or keywords that perform operations on one or more values, called operands, to produce a result. They are the building blocks for expressions and performing computations, comparisons, and assignments.

#### Assignment Operators

Assignment operators are used to assign values to JavaScript variables.

-   `=` (Assignment): The basic assignment operator. It assigns the value of its right-hand operand to its left-hand operand.
    ```javascript
    let totalCost = 50;
    ```
-   Compound Assignment Operators: Provide a shorthand to perform an operation and assign the result.
    -   `+=` (Addition assignment): `x += y` is equivalent to `x = x + y`.
    -   `-=` (Subtraction assignment): `x -= y` is equivalent to `x = x - y`.
    -   `*=` (Multiplication assignment): `x *= y` is equivalent to `x = x * y`.
    -   `/=` (Division assignment): `x /= y` is equivalent to `x = x / y`.
    -   `%=` (Remainder assignment): `x %= y` is equivalent to `x = x % y`.
    -   `**=` (Exponentiation assignment, ES2016+): `x **= y` is equivalent to `x = x ** y`.
    ```javascript
    let quantityInStock = 20;
    quantityInStock += 5; // quantityInStock is now 25
    ```
-   Logical Assignment Operators (ES2021+): Combine a logical operation with an assignment.
    -   `&&=` (Logical AND assignment): `x &&= y` assigns `y` to `x` only if `x` is truthy.
    -   `||=` (Logical OR assignment): `x ||= y` assigns `y` to `x` only if `x` is falsy.
    -   `??=` (Nullish Coalescing assignment): `x ??= y` assigns `y` to `x` only if `x` is `null` or `undefined`.
    ```javascript
    let patientStatus = "";
    patientStatus ||= "Active"; // patientStatus is now "Active" because "" is falsy

    let medicationNotes = null;
    medicationNotes ??= "No notes provided."; // medicationNotes is now "No notes provided." because null is nullish
    ```

#### Comparison Operators

Comparison operators compare their operands and return a Boolean value (`true` or `false`).

-   `==` (Loose Equality / Equal): Compares two operands for equality after performing type coercion if they are of different types.
-   `!=` (Loose Inequality / Not Equal): Compares for inequality, also performing type coercion.

> [!CAUTION]
> The loose equality (`==`) and inequality (`!=`) operators perform type coercion, which can lead to unexpected results. For example, `"5" == 5` is `true`, `0 == false` is `true`, and `"" == false` is `true`. It is strongly recommended to use the strict comparison operators (`===` and `!==`) instead to avoid these pitfalls.

-   `===` (Strict Equality / Identical): Compares two operands for equality *without* performing type coercion. Both the value and the type must be the same for the result to be `true`. This is the preferred equality operator.
-   `!==` (Strict Inequality / Not Identical): Compares for inequality without type coercion. It's the negation of `===`.
-   `>` (Greater than)
-   `<` (Less than)
-   `>=` (Greater than or equal to)
-   `<=` (Less than or equal to)

```javascript
const dose1 = 10;
const dose2 = "10";

console.log(dose1 == dose2); // Outputs: true (loose equality, type coercion)
console.log(dose1 === dose2); // Outputs: false (strict equality, different types)
console.log(dose1 !== dose2); // Outputs: true
console.log(dose1 > 5); // Outputs: true
```

#### Arithmetic Operators

Arithmetic operators perform mathematical calculations on numerical operands.

-   `+` (Addition): Adds two numbers. If one or both operands are strings, it performs string concatenation.
-   `-` (Subtraction)
-   `*` (Multiplication)
-   `/` (Division)
-   `%` (Remainder / Modulo): Returns the remainder of an integer division.
-   `**` (Exponentiation, ES2016+): Raises the left operand to the power of the right operand (e.g., `2 ** 3` is 8).
-   `++` (Increment): Increases its operand by 1 (`++x` or `x++`).
-   `--` (Decrement): Decreases its operand by 1 (`--x` or `x--`).
-   `+` (Unary Plus): Tries to convert its operand into a number.
-   `-` (Unary Negation): Negates its operand.

```javascript
let count = 5;
let total = count * 2; // total is 10
count++; // count is now 6
let remainder = 10 % 3; // remainder is 1
let power = 4 ** 2; // power is 16
console.log(+"100"); // Outputs: 100 (number)
```

#### Bitwise Operators

Bitwise operators treat their operands as a sequence of 32 bits and perform operations at the binary level. Less common in typical application logic.

-   `&` (Bitwise AND)
-   `|` (Bitwise OR)
-   `^` (Bitwise XOR)
-   `~` (Bitwise NOT)
-   `<<` (Left Shift)
-   `>>` (Sign-propagating Right Shift)
-   `>>>` (Zero-fill Right Shift)

#### Logical Operators

Logical operators are typically used with Boolean values, returning a Boolean. However, `&&` and `||` can return non-Boolean values based on short-circuiting.

-   `&&` (Logical AND): Returns the first falsy operand or the last operand if all are truthy. Short-circuits if the first operand is falsy.
-   `||` (Logical OR): Returns the first truthy operand or the last operand if all are falsy. Short-circuits if the first operand is truthy.
-   `!` (Logical NOT): Inverts the Boolean value of its operand.

```javascript
const isAvailable = true;
const hasStock = false;

console.log(isAvailable && hasStock); // Outputs: false
console.log(isAvailable || hasStock); // Outputs: true
console.log(!isAvailable); // Outputs: false

// Short-circuiting example
let result = hasStock && checkInventory(); // checkInventory() is NOT called because hasStock is false

let patientName = "";
let display = patientName || "Guest Patient"; // display is "Guest Patient" because patientName is falsy
```

**Truthy and Falsy Values:** In JavaScript, values that are not strictly `true` or `false` are evaluated as either "truthy" or "falsy" in a boolean context (like in `if` statements or with logical operators). The falsy values are `false`, `0`, `-0`, `0n` (BigInt zero), `""` (empty string), `null`, `undefined`, and `NaN`. All other values are truthy.

This table lists common truthy and falsy values:

Table 2.1: Truthy and Falsy Values in JavaScript

| Value         | Type      | Truthiness | Notes                                   |
| :------------ | :-------- | :--------- | :-------------------------------------- |
| `false`       | Boolean   | Falsy      |                                         |
| `0`           | Number    | Falsy      |                                         |
| `-0`          | Number    | Falsy      |                                         |
| `0n`          | BigInt    | Falsy      |                                         |
| `""`          | String    | Falsy      | Empty string                            |
| `null`        | Null      | Falsy      |                                         |
| `undefined`   | Undefined | Falsy      |                                         |
| `NaN`         | Number    | Falsy      | Not-a-Number                            |
| `true`        | Boolean   | Truthy     |                                         |
| `"hello"`     | String    | Truthy     | Non-empty string                        |
| `"0"`         | String    | Truthy     | Non-empty string (even if looks numeric)|
| `42`          | Number    | Truthy     | Non-zero number                         |
| `-42`         | Number    | Truthy     | Non-zero number                         |
| `{}`          | Object    | Truthy     | Any object, including empty object      |
| `[]`          | Object    | Truthy     | Any array, including empty array        |
| `function(){}`| Function  | Truthy     | Any function                            |

#### String Operators

-   `+` (Concatenation): When one or both operands are strings, the `+` operator performs string concatenation.
-   `+=` (Concatenation assignment): Appends the right operand string to the left operand string and assigns the result.

```javascript
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // fullName is "John Doe"

let message = "Patient: ";
message += fullName; // message is "Patient: John Doe"
```

#### Conditional (Ternary) Operator

The conditional operator is the only JavaScript operator that takes three operands: a condition, an expression if true, and an expression if false. It's a concise way to write simple `if...else` statements.

-   Syntax: `condition ? expressionIfTrue : expressionIfFalse`

```javascript
const isUrgent = true;
const deliveryTime = isUrgent ? "within 1 hour" : "within 24 hours";
console.log(deliveryTime); // Outputs: within 1 hour
```

#### Comma Operator

The comma operator evaluates each of its operands (left to right) and returns the value of the last operand. Rarely used in typical code.

-   Example: `let x = (1 + 2, 3 + 4); // x will be assigned 7`

#### Unary Operators (Recap)

Operators that operate on a single operand. Includes `++`, `--`, unary `+`, unary `-`, `!`, `~`, `delete`, `void`, `typeof`.

-   `delete`: Removes a property from an object.
-   `typeof`: Returns a string indicating the type of its operand.

```javascript
const patient = { name: "Sam" };
delete patient.name; // Removes the 'name' property
console.log(patient.name); // Outputs: undefined
```

#### Relational Operators

Test for a relationship between two operands.

-   `in`: Returns `true` if the specified property is in the specified object or its prototype chain.
-   `instanceof`: Returns `true` if the specified object is an instance of the specified constructor or a class that inherits from it.

```javascript
const medication = { name: "Paracetamol" };
console.log("name" in medication); // Outputs: true

const today = new Date();
console.log(today instanceof Date); // Outputs: true
```

#### `typeof` Operator

The `typeof` operator returns a string indicating the data type of its operand.

-   Possible return values: `"undefined"`, `"boolean"`, `"number"`, `"bigint"`, `"string"`, `"symbol"`, `"function"`, `"object"`.
-   Quirks: `typeof null` returns `"object"`, `typeof []` (an array) returns `"object"`.

```javascript
console.log(typeof 10); // Outputs: number
console.log(typeof "hello"); // Outputs: string
console.log(typeof true); // Outputs: boolean
console.log(typeof undefined); // Outputs: undefined
console.log(typeof {}); // Outputs: object
console.log(typeof []); // Outputs: object
console.log(typeof null); // Outputs: object (quirk)
console.log(typeof function() {}); // Outputs: function
```

#### Operator Precedence and Associativity

When an expression contains multiple operators, JavaScript uses rules of precedence and associativity to determine the order of evaluation.

-   **Precedence:** Determines which operator is performed first (e.g., multiplication before addition).
-   **Associativity:** Determines the order when operators have the same precedence (e.g., left-to-right for addition/subtraction, right-to-left for assignment).
-   Parentheses `()` can be used to explicitly control the order of evaluation, overriding default rules.

**Under the Hood:** The JavaScript engine parses expressions and builds an internal representation (like an Abstract Syntax Tree) that respects operator precedence and associativity to ensure operations are performed in the correct order.

Understanding operator precedence and associativity is crucial for writing correct and predictable code, especially in complex expressions. Without this knowledge, expressions might yield unexpected results due to the implicit evaluation order defined by the language.

This table summarizes the precedence and associativity of common operators (higher numbers mean higher precedence):

Table 1.2: Operator Precedence and Associativity (Common Operators)

| Precedence | Operator(s)                                                                 | Description                                                                 | Associativity |
| :--------- | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :------------ |
| 19         | `(...)`                                                                     | Grouping                                                                    | n/a           |
| 18         | `.` `?.` `[]` `new` (with args)                                             | Member Access, Optional Chaining, Computed Member Access, Instantiation     | L-R           |
| 17         | `new` (without args)                                                        | Instantiation                                                               | R-L           |
| 16         | `++` (postfix) `--` (postfix)                                              | Postfix Increment/Decrement                                                 | n/a (unary)   |
| 15         | `!` `~` `+` (unary) `-` (unary) `++` (prefix) `--` (prefix) `typeof` `void` `delete` | Logical NOT, Bitwise NOT, Unary Plus/Negation, Prefix Increment/Decrement, Typeof, Void, Delete | R-L (unary)   |
| 14         | `**`                                                                        | Exponentiation                                                              | R-L           |
| 13         | `*` `/` `%`                                                                 | Multiplication, Division, Remainder                                         | L-R           |
| 12         | `+` (binary) `-` (binary)                                                   | Addition, Subtraction                                                       | L-R           |
| 11         | `<<` `>>` `>>>`                                                             | Bitwise Shifts                                                              | L-R           |
| 10         | `<` `<=` `>` `>=` `in` `instanceof`                                         | Relational, `in`, `instanceof`                                              | L-R           |
| 9          | `==` `!=` `===` `!==`                                                       | Equality                                                                    | L-R           |
| 8          | `&`                                                                         | Bitwise AND                                                                 | L-R           |
| 7          | `^`                                                                         | Bitwise XOR                                                                 | L-R           |
| 6          | `|`                                                                         | Bitwise OR                                                                  | L-R           |
| 5          | `&&`                                                                        | Logical AND                                                                 | L-R           |
| 4          | `||`                                                                        | Logical OR                                                                  | L-R           |
| 3          | `??`                                                                        | Nullish Coalescing                                                          | L-R           |
| 2          | `? :`                                                                       | Conditional (Ternary)                                                       | R-L           |
| 1          | `=` `+=` `-=` `*=` `/=` `%=` `**=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `&&=` `||=` `??=` | Assignment                                                                  | R-L           |
| 0          | `,`                                                                         | Comma                                                                       | L-R           |

> 🌐 **Web Developers:** Operator precedence and associativity rules are similar across many C-like languages, including those you might be familiar with. Pay attention to JavaScript-specific operators like `??` (Nullish Coalescing) and the nuances of `==` vs `===`.
>
> 📲 **Native Developers:** The concept of operator precedence exists in languages like Java and Swift. The specific operators and their precedence levels might differ slightly. Ensure you understand the behavior of logical operators (`&&`, `||`) which can return non-boolean values due to short-circuiting, and the unique `typeof` operator.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
> - [MDN Web Docs: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
> - [MDN Web Docs: Assignment operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_operators)
> - [MDN Web Docs: Comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_operators)
> - [MDN Web Docs: Arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_operators)
> - [MDN Web Docs: Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_operators)
> - [MDN Web Docs: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
> - [MDN Web Docs: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

### Next Steps

Continue to the next section to learn about controlling the flow of your JavaScript code using conditionals and loops.

- [Section 2: Control Flow (Conditionals, Loops)](./section-02-control-flow.md)
