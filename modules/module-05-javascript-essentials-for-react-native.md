# Module 5: JavaScript Essentials for React Native

Welcome to Module 5! This module focuses on the fundamental JavaScript concepts essential for building robust React Native applications. While React Native provides a powerful framework, a solid understanding of modern JavaScript, particularly features introduced in ES6 and later, is the bedrock upon which your mobile development skills will be built. We will explore variables, data types, operators, control flow, functions, objects, arrays, asynchronous programming, and ES6 modules, all within the context of our SpeedyMeds pharmacy application theme.

Understanding these core JavaScript concepts is not just beneficial—it is crucial. They directly influence how you write effective React Native components, manage application state, interact with backend APIs to fetch data like medication lists or patient details, and efficiently debug problems when they inevitably arise.

This module aims to refresh your existing JavaScript knowledge or establish the required baseline proficiency needed for the rest of the course. We will focus specifically on the aspects of JavaScript most relevant to building production-level React Native applications.

> 🛣️ **All Learners:** This module covers foundational JavaScript concepts. Even if you have prior experience, a review is recommended to ensure familiarity with modern syntax and paradigms heavily used in React Native.

## Target Audience Adaptation

> 📲 **Native Developers:** Your experience with languages like Java, Kotlin, or Swift provides a strong programming foundation. However, JavaScript has unique characteristics. Key differences include its dynamic typing (variables do not have fixed types declared upfront, unlike static typing in Swift/Kotlin/Java) and prototype-based inheritance (objects inherit from other objects, unlike classical inheritance with classes). JavaScript's primary concurrency model relies on a single-threaded event loop, which differs significantly from the multi-threading models common in native development. This module will help bridge these conceptual gaps, introducing JavaScript's paradigms and syntax relevant to React Native.
>
> **Key Takeaway:** Embrace block scope with `let` and `const` as it aligns with your expectations. Use `let` for variables that will change value, and `const` for variables that will not be reassigned. Critically, remember that `const` does not guarantee immutability for object or array contents, only for the variable binding itself. Be mindful of JavaScript's dynamic typing.
>
> **Source:** [Java vs JavaScript: What to Choose for Your Project Development in 2023](https://mobisoftinfotech.com/resources/blog/java-vs-javascript)

> ⚛️ **React Developers:** You likely have a good grasp of JavaScript and possibly React itself. Consider this module a valuable reinforcement of core ES6+ concepts. Pay close attention to the detailed explanations and any nuances highlighted, particularly in the Background Bridge notes, as even familiar concepts can have subtle differences in the context of React Native or deeper engine mechanics.
>
> **Key Takeaway:** Focus on reinforcing your understanding of ES6+ features like destructuring, spread/rest, Promises, and `async`/`await`, as these are heavily used in modern React and React Native development.

> 🅰 **Angular Developers:** Your JavaScript background is a great starting point. Be aware that common patterns might differ. For instance, Angular heavily utilizes RxJS Observables for asynchronous operations, whereas React (and therefore React Native) often relies more directly on Promises and the `async`/`await` syntax. This module focuses on the standard JavaScript features essential for React Native, preparing you for React-specific concepts in later modules.
>
> **Key Takeaway:** Pay close attention to the sections on Promises and `async`/`await`, as these are the primary patterns for asynchronous operations in React Native, differing from the Observable-centric approach common in Angular.
>
> **Source:** [What is the difference between Promises and Observables?](https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables)

## Learning Objectives

Upon completing this module, you will be able to:

* Declare variables using `let` and `const` and explain their scope (block, function, global) and hoisting behavior.
* Identify and differentiate between JavaScript's primitive data types (`string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`) and the `Object` type, explaining primitive immutability.
* Apply common JavaScript operators (assignment, comparison, arithmetic, logical, ternary, `typeof`) to manipulate and evaluate data.
* Implement conditional logic using `if`/`else if`/`else` and `switch` statements, understanding truthy/falsy values.
* Control program flow using loop structures (`for`, `while`, `do...while`, `for...of`, `for...in`).
* Define functions using function declarations, function expressions, and arrow functions, explaining syntax differences and key characteristics like `this` binding and the `arguments` object.
* Explain lexical scoping, function scope, block scope, and the concept of closures, demonstrating their practical applications.
* Create and manipulate objects and arrays using literal syntax, common methods, property accessors, destructuring assignment, and spread/rest syntax.
* Explain the JavaScript event loop model and handle asynchronous operations effectively using callbacks, Promises (`.then`, `.catch`, `.finally`, `Promise.all`), and `async`/`await` syntax.
* Organize code into reusable modules using ES6 `import` and `export` statements (named and default).

## Prerequisites

* Basic programming concepts (variables, data types, loops, conditionals, functions) common across most programming languages.
* Completion of [Module 4: Web Development Essentials Refresher](../module-04-web-essentials-refresher.md).

## Section 1: Variables, Data Types, and Operators

Variables are the named containers we use to store and reference data within our programs. In JavaScript, the way we declare a variable using keywords like `let`, `const`, or the older `var` has significant consequences for its behavior, specifically its scope (where it can be accessed) and mutability (whether its value can be changed). Modern JavaScript (ES6 and later) strongly favors `let` and `const` over `var` due to their more predictable scoping rules. This section also covers the fundamental data types that variables can hold and the operators used to perform actions on these values.

### Variable Declaration (`let`, `const`, `var` comparison)

Understanding the differences between `let`, `const`, and `var` is crucial for writing clean and bug-free JavaScript.

#### `let`

Use `let` to declare variables when you anticipate that their value might need to be reassigned later in your code. The most significant feature of `let` is its block scope. This means a variable declared with `let` is only accessible within the specific block of code (enclosed by curly braces `{}`) where it is defined. This includes blocks associated with `if` statements, `for` loops, or even standalone blocks. If `let` is used outside any function or block, it has global scope. If used inside a function but outside any specific block within that function, it has function scope.

**Hoisting & Temporal Dead Zone (TDZ):** Variables declared with `let` are hoisted, meaning the JavaScript engine is aware of the variable declaration before it executes that line of code. However, unlike `var`, they are not initialized during hoisting. They exist in a state called the "Temporal Dead Zone" (TDZ) from the start of their containing block until the line where they are declared and initialized. Attempting to access a `let` variable within its TDZ results in a `ReferenceError`. This behavior encourages declaring variables before using them, leading to more organized code. This contrasts sharply with `var`, which is hoisted and automatically initialized to `undefined`, potentially masking errors where a variable is used before its intended assignment.

**Mutability:** Variables declared with `let` are mutable. You can change their value after the initial declaration using the assignment operator (`=`).

```javascript
// Example: Managing patient queue size
let patientQueueSize = 10; // Initial queue size

if (patientQueueSize > 5) {
  // This block creates its own scope for 'notificationMessage'
  let notificationMessage = "High patient volume alert!";
  console.log(notificationMessage); // Output: High patient volume alert!

  // Reassigning 'patientQueueSize' is allowed because it's declared with 'let'
  patientQueueSize = 15;
  console.log(`Queue size updated to: ${patientQueueSize}`); // Output: Queue size updated to: 15
}

// Trying to access 'notificationMessage' outside its block scope results in an error
// console.log(notificationMessage); // ReferenceError: notificationMessage is not defined

// 'patientQueueSize' is accessible here because it was declared in the outer scope
console.log(`Final queue size: ${patientQueueSize}`); // Output: Final queue size: 15

// Example of TDZ
try {
  // console.log(nextPatientId); // This would throw ReferenceError due to TDZ
  let nextPatientId = "P124";
  console.log(`Next patient ID: ${nextPatientId}`); // Output: Next patient ID: P124
} catch (e) {
  console.error(e);
}
```

This example demonstrates the block-scoping nature of `let`. The `notificationMessage` variable is strictly confined to the `if` block. Attempting to access it outside throws a `ReferenceError`. In contrast, `patientQueueSize`, declared in the outer scope, remains accessible both inside and outside the `if` block, and its value can be updated because it is mutable. The TDZ example (commented out) shows that accessing `nextPatientId` before its `let` declaration would cause a runtime error, enforcing declaration before use.

#### `const`

Use `const` (short for constant) to declare variables whose value is intended to remain fixed after initialization. Like `let`, `const` variables are block-scoped, meaning they are only accessible within the `{}` block where they are defined.

**Hoisting & TDZ:** `const` declarations are also hoisted but, like `let`, are not initialized and reside in the Temporal Dead Zone until the declaration line is executed. Accessing a `const` variable before its declaration results in a `ReferenceError`.

**Immutability:** This is the defining characteristic of `const`. Variables declared with `const` must be initialized with a value at the point of declaration, and their value cannot be reassigned afterwards. Attempting to reassign a `const` variable will result in a `TypeError`. However, it is crucial to understand that `const` creates an immutable *binding*, not necessarily an immutable *value*. If a `const` variable holds an object or an array, the object's properties or the array's elements can still be modified. What `const` prevents is assigning a completely new object or array (or any other value) to that variable.

```javascript
// Example: Defining a constant configuration value
const MAX_PRESCRIPTIONS_PER_PAGE = 20;

// Attempting to reassign MAX_PRESCRIPTIONS_PER_PAGE will cause an error
// MAX_PRESCRIPTIONS_PER_PAGE = 25; // TypeError: Assignment to constant variable.
console.log(`Max items per page: ${MAX_PRESCRIPTIONS_PER_PAGE}`); // Output: Max items per page: 20

// Example: const with an object
const pharmacyDetails = {
  name: "SpeedyMeds",
  city: "Healthville",
  operationalHours: { open: "08:00", close: "20:00" }
};

// Modifying a property of the const object IS allowed
pharmacyDetails.city = "Wellnesstown";
pharmacyDetails.operationalHours.close = "21:00"; // Modifying nested property
console.log(pharmacyDetails);
// Output: { name: 'SpeedyMeds', city: 'Wellnesstown', operationalHours: { open: '08:00', close: '21:00' } }

// Attempting to reassign the entire object IS NOT allowed
// pharmacyDetails = { name: "QuickMeds" }; // TypeError: Assignment to constant variable.

// Example: const requires initialization
// const API_KEY; // SyntaxError: Missing initializer in const declaration
```

This example illustrates that `MAX_PRESCRIPTIONS_PER_PAGE` cannot be reassigned. However, the `pharmacyDetails` object, although declared with `const`, is mutable. We can change its `city` property or even nested properties like `operationalHours.close`. What we cannot do is assign a completely new object to the `pharmacyDetails` variable. The final commented line shows that `const` declarations require an initializer.

#### `var` (Brief Comparison)

Use `var` is the traditional way to declare variables in JavaScript, predating ES6. Its key difference lies in scoping: `var` variables have function scope or global scope, but not block scope. This means a variable declared with `var` inside an `if` block or `for` loop is accessible throughout the entire function (or globally, if declared outside any function). `var` variables are also hoisted, but unlike `let`/`const`, they are initialized with the value `undefined` upon hoisting.

**Recommendation:** Due to the potential for confusion caused by function scoping (variables "leaking" out of blocks) and the `undefined` hoisting behavior, it is strongly recommended to avoid using `var` in modern JavaScript development. Always prefer `let` for variables that need reassignment and `const` for variables that should not be reassigned. This leads to more predictable, maintainable, and less error-prone code.

The introduction of `let` and `const` in ES6 was a significant step towards improving JavaScript's robustness. Block scoping aligns JavaScript more closely with the scoping rules found in many other programming languages, such as Java, Kotlin, and Swift, reducing a common source of confusion for developers transitioning from those backgrounds. It prevents variables declared within loops or conditional blocks from unintentionally affecting the outer scope, a frequent cause of bugs with `var`. Furthermore, the Temporal Dead Zone associated with `let` and `const` enforces the good practice of declaring variables before they are used, unlike `var` which allows access before declaration (yielding `undefined`), potentially hiding logical errors. By providing more granular control over scope and mutability, `let` and `const` enable developers to write code that is easier to reason about, debug, and maintain.

| Feature    | `let`                               | `const`                                  | `var`                               |
|------------|-------------------------------------|------------------------------------------|-------------------------------------|
| Scope      | Block, function, global             | Block, function, global                  | Function, global                    |
| Hoisting   | Hoisted, but not initialized (TDZ)  | Hoisted, but not initialized (TDZ)       | Hoisted, initialized to `undefined` |
| Reassignment| Allowed (mutable)                   | Not allowed (immutable binding)          | Allowed (mutable)                   |
| Initialization| Optional                            | Required at declaration                  | Optional                            |
| Redeclaration| Not allowed within the same scope | Not allowed within the same scope        | Allowed (can lead to issues)        |

> 📲 **Native Developers:** JavaScript's `let` and `const` introduce block scoping (`{}`), which feels familiar to variable scope within blocks in Java, Kotlin, and Swift. However, remember that JavaScript is dynamically typed. You declare variables with `let` or `const` without specifying their type (e.g., `let count = 10;` instead of Java's `int count = 10;` or Swift's `let count: Int = 10;`). The type is inferred from the assigned value and can technically change for `let` variables (though this is often discouraged). The `const` keyword prevents reassignment of the variable, similar to `final` in Java or `val` in Kotlin/`let` in Swift. A key difference is that `const` in JavaScript does not make objects or arrays immutable. You can still modify the properties of a `const` object or the elements of a `const` array. This contrasts with Swift, where value types (structs, enums) declared with `let` are truly immutable. The older `var` keyword has function scope, which is less common in modern native languages and can be a source of confusion.
>
> **Key Takeaway:** Embrace block scope with `let` and `const` as it aligns with your expectations. Use `let` for variables that will change value, and `const` for variables that will not be reassigned. Critically, remember that `const` does not guarantee immutability for object/array contents, only for the variable binding itself. Be mindful of JavaScript's dynamic typing.
>
> **Source:** [From JS to Swift: Key Differences Every Developer Should Know](https://dev.to/adrian_campos_4e442f872cc/from-js-to-swift-key-differences-every-developer-should-know-10h7)

### Data Types

JavaScript determines the type of data a variable holds dynamically at runtime. Understanding the different types is essential for performing correct operations.

**Dynamic Typing:** JavaScript is a dynamically typed language. This means you do not explicitly declare the type of a variable when you create it. The type is associated with the value the variable holds, and a single variable can hold values of different types throughout the program's execution. While this offers flexibility, it also means that type errors (like trying to call a string method on a number) are only caught when the code runs, not during a compilation step. This contrasts with statically typed languages like Swift or Kotlin, where types are checked before execution, catching many errors early. This runtime type checking in JavaScript underscores the importance of careful coding, thorough testing, and potentially using tools like TypeScript (covered in Module 6) to add a layer of static type safety.

```javascript
let medicationStatus = "Active"; // medicationStatus is a string
console.log(typeof medicationStatus); // "string"
medicationStatus = 1; // Now medicationStatus is a number
console.log(typeof medicationStatus); // "number"
```

**Primitives:** JavaScript has seven primitive data types. Primitives are fundamental data types that are not objects and have no methods themselves (though JavaScript provides wrapper objects that allow methods to be called on primitives). A key characteristic of primitives is that they are immutable – their value cannot be changed once created. Operations that appear to modify a primitive actually create a new primitive value.

*   `string`: Used to represent textual data. Strings are enclosed in single quotes (`'...`), double quotes (`"..."`), or backticks (```...``` - template literals). Examples: `"Lisinopril"`, `'Take 1 tablet daily'`, `` `Patient ID: ${patientId}` ``.
*   `number`: Represents both integer and floating-point numbers. JavaScript uses the IEEE 754 double-precision 64-bit format for all numbers. This includes special values like `Infinity`, `-Infinity`, and `NaN` (Not-a-Number). Examples: `10`, `20.5`, `NaN`.
*   `bigint`: Used to represent whole numbers larger than the maximum safe integer value that the `number` type can accurately represent (2<sup>53</sup>−1). BigInts are created by appending `n` to the end of an integer literal. Example: `9007199254740991n`.
*   `boolean`: Represents a logical entity and can have two values: `true` or `false`. Used extensively in conditional logic.
*   `undefined`: Represents a variable that has been declared but has not yet been assigned a value. Functions also return `undefined` if they do not explicitly return a value.
*   `null`: Represents the intentional absence of any object value. It is often explicitly assigned to indicate that a variable should contain "no value" or "no object".
*   `symbol`: Represents a unique and immutable identifier. Symbols are often used as keys for object properties when you want to avoid name collisions. Example: `Symbol('description')`.

**Object Type:** Anything that is not a primitive is an `Object`. Objects are collections of key-value pairs, where keys are strings (or Symbols) and values can be any data type, including other objects. Functions and arrays are specialized types of objects in JavaScript. Unlike primitives, objects are mutable, meaning their properties can be changed after creation.

```javascript
const patient = { name: "Bob", age: 45 }; // An object
const medications = ["Aspirin", "Metoprolol"]; // An array (special object)
function checkVitals() { /*... */ } // A function (special object)
```

**Immutability of Primitives vs. Mutability of Objects:** It is vital to grasp this distinction.

```javascript
let drugName = "Ibuprofen";
let upperDrugName = drugName.toUpperCase(); // Creates a NEW string "IBUPROFEN"
console.log(drugName); // "Ibuprofen" (original primitive string is unchanged)
console.log(upperDrugName); // "IBUPROFEN"

const patientRecord = { id: "P456", status: "Active" };
patientRecord.status = "Discharged"; // Modifies the EXISTING object
console.log(patientRecord); // { id: 'P456', status: 'Discharged' }
```

In the first part, `toUpperCase()` does not change `drugName`; it returns a new string. In the second part, assigning to `patientRecord.status` modifies the object that `patientRecord` refers to directly.

| Type Name | Description                                                              | Example                     |
|-----------|--------------------------------------------------------------------------|-----------------------------|
| `string`  | Represents textual data                                                  | `"Warfarin"`, `'Patient'`   |
| `number`  | Represents numeric values (integer and floating-point), `NaN`, `Infinity`| `100`, `12.5`, `NaN`        |
| `bigint`  | Represents integers larger than the safe range of `number`               | `12345678901234567890n`     |
| `boolean` | Represents logical values: `true` or `false`                             | `true`, `false`             |
| `undefined`| Represents a variable that has been declared but has not yet been assigned a value                 | `let x;` (value of `x`)     |
| `null`    | Represents the intentional absence of any object value                   | `null`                      |
| `symbol`  | Represents unique, immutable identifiers, often used as object property keys| `Symbol('uniqueId')`        |

> 📲 **Native Developers:** JavaScript's dynamic typing is a major departure from the static typing in Java, Kotlin, and Swift. Variables do not have a fixed type; their type depends on the value they hold at any given moment. This means you will not get compile-time errors for assigning a string to a variable that previously held a number. JavaScript's `number` type handles both integers and floating-point values using a single representation (IEEE 754 double-precision), unlike the distinct `int`, `long`, `float`, `double` types in native languages. The distinction between `undefined` (variable declared but not assigned) and `null` (intentionally assigned "no value") is specific to JavaScript and requires careful handling. Primitives (`string`, `number`, `boolean`, etc.) are immutable, similar to primitives in Java or value types in Swift/Kotlin, but objects (including arrays and functions) are mutable reference types.
>
> **Key Takeaway:** Prepare for the flexibility and potential pitfalls of dynamic typing. Runtime type checking (`typeof` or other methods) might be necessary in your logic. Understand the nuances of `number`, `null`, and `undefined`. Remember that objects and arrays are mutable, even when assigned to a `const` variable.
>
> **Source:** [Static vs. Dynamic Typing](https://amorserv.com/insights/static-vs-dynamic-typing)

### Operators

Operators are special symbols used to perform operations on operands (values or variables).

**Assignment Operators:** Assign values. The basic operator is `=`, but compound operators like `+=`, `-=`, `*=`, `/=`, `%=` combine an arithmetic operation with assignment for conciseness.

```javascript
let currentStock = 100;
currentStock -= 20; // Equivalent to currentStock = currentStock - 20; (currentStock is now 80)
```

**Comparison Operators:** Compare two values and return a boolean (`true` or `false`).

*   **Strict Equality (`===`) and Inequality (`!==`):** These operators check for equality without performing type coercion. They compare both the value and the type. It is strongly recommended to use strict comparison operators to avoid unexpected behavior caused by type coercion.
*   **Loose Equality (`==`) and Inequality (`!=`):** These operators do perform type coercion before comparing values. This can lead to non-intuitive results (e.g., `0 == false` is `true`, `null == undefined` is `true`). Avoid these unless you have a specific reason and fully understand the coercion rules.
*   **Relational Operators:** `>`, `<`, `>=`, `<=`. These compare the magnitude of operands (numerically or lexicographically for strings).

```javascript
const requiredDosage = 10;
let patientDosage = "10";

console.log(patientDosage == requiredDosage);  // true (loose equality performs type coercion)
console.log(patientDosage === requiredDosage); // false (strict equality checks type) - Recommended!
console.log(requiredDosage > 5); // true
```

**Arithmetic Operators:** Perform mathematical calculations: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division), `%` (remainder/modulo), `**` (exponentiation - ES2016). Also include `++` (increment) and `--` (decrement), which can be used prefix (`++x`) or postfix (`x++`), affecting the value returned by the expression. Unary negation (`-`) changes the sign, and unary plus (`+`) attempts to convert its operand to a number.

```javascript
let quantity = 2;
let totalUnits = quantity * 30; // 60
let remaining = 100 % 30; // 10
console.log(++quantity); // 3 (increments, then returns new value)
console.log(quantity++); // 3 (returns current value, then increments)
console.log(quantity);   // 4
console.log(+"15");      // 15 (unary plus converts string to number)
```

**Logical Operators:** Combine boolean expressions: `&&` (logical AND), `||` (logical OR), `!` (logical NOT). These operators use short-circuiting evaluation:

*   `expr1 && expr2`: If `expr1` is falsy, `expr1` is returned without evaluating `expr2`. Otherwise, `expr2` is evaluated and returned.
*   `expr1 || expr2`: If `expr1` is truthy, `expr1` is returned without evaluating `expr2`. Otherwise, `expr2` is evaluated and returned.
*   `!expr`: Returns `false` if `expr` is truthy, `true` if `expr` is falsy.

**Nullish Coalescing Operator (`??`) (ES2020):** Returns the right-hand operand only if the left-hand operand is `null` or `undefined`. Unlike `||`, it does not short-circuit on other falsy values like `0`, `""`, or `false`. This is often safer for providing default values.

```javascript
const hasAllergy = true;
const isHighRisk = false; // Assume this is defined elsewhere
const needsCaution = hasAllergy && isHighRisk; // false (Logical AND: &&)

const patientAge = 0;
const displayAge = patientAge || 30; // 30 (|| treats 0 as falsy)
const correctDisplayAge = patientAge ?? 30; // 0 (?? only checks for null/undefined)
console.log(displayAge); // 30
console.log(correctDisplayAge); // 0
```

**Conditional (Ternary) Operator:** A shorthand for `if`/`else`: `condition ? valueIfTrue : valueIfFalse`.

```javascript
const stock = 5;
const stockStatus = stock > 0 ? "In Stock" : "Out of Stock"; // "In Stock"
```

**`typeof` Operator:** Returns a string indicating the type of the unevaluated operand. Useful for basic type checking, but remember `typeof null` returns `"object"`.

```javascript
console.log(typeof 100); // "number"
console.log(typeof "Paracetamol"); // "string"
console.log(typeof null); // "object" (historical quirk)
console.log(typeof undefined); // "undefined"
```

**Operator Precedence:** Operators have a specific order of execution (e.g., `*` before `+`). Use parentheses `()` to control the order explicitly or improve readability.

```javascript
let stockLevel = 50;
const minimumThreshold = 20;
const isUrgent = true;

// Comparison and Logical Operators
const needsReorder = stockLevel < minimumThreshold; // false (Comparison: <)
const processImmediately = needsReorder || isUrgent; // true (Logical OR: ||)

// Ternary Operator
const orderPriority = processImmediately ? "High" : "Normal"; // "High"

// Arithmetic and Assignment Operators
let orderQuantity = orderPriority === "High" ? 50 : 0; // Uses strict equality (===)
const itemCost = 15.50;
let totalCost = orderQuantity * itemCost; // 775 (Arithmetic: *)
totalCost += 5.00; // Add shipping cost (Assignment: +=) -> 780

// typeof Operator
console.log(`Needs Reorder: ${needsReorder} (Type: ${typeof needsReorder})`); // boolean
console.log(`Order Priority: ${orderPriority} (Type: ${typeof orderPriority})`); // string
console.log(`Total Cost: ${totalCost} (Type: ${typeof totalCost})`); // number

// Nullish Coalescing
const patientNotes = null;
const displayNotes = patientNotes ?? "No notes available."; // "No notes available."
console.log(`Notes: ${displayNotes}`); // Notes: No notes available.
```

This example demonstrates various operators in a pharmacy context. `needsReorder` uses the less than operator (`<`). `processImmediately` uses the logical OR (`||`) to combine `needsReorder` with `isUrgent`. The ternary operator (`? :`) sets the `orderPriority`. Strict equality (`===`) is used to check the priority. Arithmetic (`*`) and compound assignment (`+=`) operators calculate the `totalCost`. The `typeof` operator checks the data types of variables. Finally, nullish coalescing (`??`) provides a default value for `patientNotes` only if it is `null` or `undefined`.

| Operator | Name                      | Example           |
|----------|---------------------------|-------------------|
| `=`      | Assignment                | `x = 5`           |
| `+=`     | Addition Assignment       | `x += 2`          |
| `-=`     | Subtraction Assignment    | `x -= 2`          |
| `*=`     | Multiplication Assignment | `x *= 2`          |
| `/=`     | Division Assignment       | `x /= 2`          |
| `===`    | Strict Equality           | `a === b`         |
| `!==`    | Strict Inequality         | `a !== b`         |
| `>`      | Greater Than              | `a > b`           |
| `<`      | Less Than                 | `a < b`           |
| `>=`     | Greater Than or Equal To  | `a >= b`          |
| `<=`     | Less Than or Equal To     | `a <= b`          |
| `&&`     | Logical AND               | `x && y`          |
| `||`     | Logical OR                | `x || y`          |
| `!`      | Logical NOT               | `!x`              |
| `??`     | Nullish Coalescing        | `a ?? b`          |
| `++`     | Increment                 | `++x` or `x++`    |
| `--`     | Decrement                 | `--x` or `x--`    |
| `+`      | Addition / Unary Plus     | `a + b` or `+x`   |
| `-`      | Subtraction / Unary Negation| `a - b` or `-x`   |
| `*`      | Multiplication            | `a * b`           |
| `/`      | Division                  | `a / b`           |
| `%`      | Remainder                 | `a % b`           |
| `**`     | Exponentiation            | `a ** b`          |
| `?:`     | Conditional (Ternary)     | `cond ? val1 : val2`|
| `typeof` | Typeof                    | `typeof x`        |

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
> *   [MDN Web Docs: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
> *   [MDN Web Docs: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

## Section 2: Control Flow

Control flow statements are essential constructs that allow us to direct the execution path of our program based on certain conditions or to repeat blocks of code multiple times. They enable decision-making and iteration, forming the backbone of program logic. JavaScript provides standard conditional statements (`if`/`else`, `switch`) and various looping statements (`for`, `while`, `do...while`, `for...of`, `for...in`).

### Conditional Statements

Conditional statements execute different blocks of code depending on whether a specified condition evaluates to `true` or `false`.

#### `if`/`else if`/`else`

**Syntax & Usage:** The `if` statement executes a block of code if its condition is `true`. It can be followed by zero or more `else if` blocks, each with its own condition, checked only if the preceding `if` or `else if` conditions were false. An optional final `else` block executes if none of the preceding `if` or `else if` conditions were true. The structure ensures that at most one block among the `if`, `else if`s, and `else` is executed.

**Block Statements:** It is strongly recommended to always enclose the code following `if`, `else if`, and `else` in curly braces `{}`. While JavaScript allows omitting braces for single statements, doing so can lead to ambiguity, hard-to-spot bugs (especially with nested conditionals), and reduced code readability.

**Truthy/Falsy Values:** JavaScript conditions evaluate expressions based on their "truthiness". Values that are considered false in a boolean context are called "falsy". The specific falsy values are: `false`, `0` (zero), `""` (empty string), `null`, `undefined`, and `NaN` (Not-a-Number). All other values, including any object (even empty ones like `{}` or `[]`), non-empty strings, and non-zero numbers, are considered "truthy" and will satisfy an `if` condition. Understanding this distinction is crucial for writing correct conditional logic.

```javascript
const medication = { name: "Lisinopril", quantity: 0, refillsRemaining: 0 };
let statusMessage = "";

// Check refill status first
if (medication.refillsRemaining > 0) {
  // This block executes if refillsRemaining is truthy (non-zero)
  statusMessage = `${medication.name} has ${medication.refillsRemaining} refills left.`;
} else if (medication.quantity > 0) {
  // This block executes if refillsRemaining is falsy (0) AND quantity is truthy (non-zero)
  statusMessage = `${medication.name} has no refills left, but ${medication.quantity} units remaining. Contact doctor for renewal.`;
} else {
  // This block executes if both refillsRemaining and quantity are falsy (0)
  statusMessage = `No ${medication.name} remaining and no refills left. Prescription needed.`;
}
console.log(statusMessage);
// Output: No Lisinopril remaining and no refills left. Prescription needed.
```

This code checks the status of a medication. First, it checks `refillsRemaining`. If that is greater than 0 (truthy), the first message is set. If not (falsy, i.e., 0), it proceeds to the `else if` and checks `quantity`. If `quantity` is greater than 0 (truthy), the second message is set. If both `refillsRemaining` and `quantity` are 0 (falsy), the final `else` block is executed, setting the "prescription needed" message. This demonstrates how the flow progresses through the conditions until one evaluates to true, or the final `else` is reached.

| Falsy Values | Truthy Values                                       |
|--------------|-----------------------------------------------------|
| `false`      | `true`                                              |
| `0` (zero)   | Any non-zero number (e.g., `1`, `-10`, `0.5`)       |
| `""` or `''` (empty string)| Any non-empty string (e.g., `"hello"`, `"false"`) |
| `null`       | Any object (including empty objects `{}` and empty arrays `[]`) |
| `undefined`  |                                                     |
| `NaN`        |                                                     |

#### `switch`

**Syntax & Usage:** The `switch` statement evaluates a single expression and matches its value against a series of `case value:` labels. When a match is found, the code block associated with that case is executed. The `break` statement is crucial; without it, execution will "fall through" to the next case block(s) regardless of whether their values match. An optional `default:` case handles situations where none of the specific case values match the expression.

**Comparison:** `switch` performs comparisons using strict equality (`===`), meaning both the value and the type must match between the expression and the `case value:`.

```javascript
const prescriptionStatus = "Filled"; // Could be "Filled", "Cancelled", "Pending", "Error"
let actionRequired = "";
let requiresPharmacist = false;

switch (prescriptionStatus) {
  case "Pending":
    actionRequired = "Pharmacist review required.";
    requiresPharmacist = true;
    break; // Prevents fall-through to "Filled"
  case "Filled":
    actionRequired = "Ready for pickup.";
    requiresPharmacist = false;
    break; // Prevents fall-through to "Cancelled"
  case "Cancelled":
    actionRequired = "Contact patient regarding cancellation.";
    requiresPharmacist = true;
    break; // Prevents fall-through to default
  case "Error":
    console.error("Error processing prescription!");
    // Fall-through intended to default case
  default: // Handles "Error" and any other unexpected status
    actionRequired = "Unknown status - investigate.";
    requiresPharmacist = true;
    // No break needed if default is the last case
}
console.log(`Status: ${prescriptionStatus} - Action: ${actionRequired} - Pharmacist Needed: ${requiresPharmacist}`);
// Output: Status: Filled - Action: Ready for pickup. - Pharmacist Needed: false
```

This example determines the required action based on a `prescriptionStatus`. The `switch` statement compares `prescriptionStatus` strictly against each case. Because the status is `"Filled"`, the code associated with `case "Filled":` executes, setting `actionRequired` and `requiresPharmacist`. The `break` statement then exits the switch. If `break` were omitted after `case "Filled":`, execution would incorrectly continue into `case "Cancelled":`. The `default` case catches any status not explicitly listed, including the `"Error"` case due to the intentional fall-through (lack of break).

> 📲 **Native Developers:** JavaScript's `if`/`else` structure is syntactically almost identical to Java, Kotlin, and Swift. The main difference lies in condition evaluation. While native languages typically require strict boolean expressions (`true` or `false`), JavaScript uses truthy/falsy evaluation. Values like `0`, `null`, `undefined`, `""`, and `NaN` are treated as false, while all other values (including objects and non-empty arrays) are treated as true. This can be convenient but also a source of bugs if not handled carefully. The `switch` statement also looks familiar, but remember that JavaScript's case comparison uses strict equality (`===`) and requires explicit `break` statements to prevent fall-through, which might differ from the default behavior or syntax (e.g., Swift's `switch` does not fall through by default).
>
> **Key Takeaway:** Be acutely aware of JavaScript's truthy/falsy rules when writing `if` conditions. Always use `break` statements within `switch` cases unless fall-through is explicitly intended.

### Looping Statements

Looping statements allow code blocks to be executed repeatedly based on certain criteria.

#### `for` loop

**Syntax & Usage:** The traditional `for` loop (`for (initialization; condition; final-expression) { ... }`) provides fine-grained control over iteration. The `initialization` part runs once before the loop starts (e.g., `let i = 0`). The `condition` is checked before each iteration (e.g., `i < 10`); if true, the loop body runs, otherwise the loop terminates. The `final-expression` runs after each iteration (e.g., `i++`). This loop is best suited when the number of iterations is known beforehand or depends on a simple counter.

```javascript
console.log("Administering medication doses:");
const totalDoses = 5;
for (let doseNumber = 1; doseNumber <= totalDoses; doseNumber++) {
  console.log(`Administering dose ${doseNumber} of ${totalDoses}.`);
}
// Output: Logs messages for doses 1 through 5.
```

This loop initializes `doseNumber` to 1, continues as long as `doseNumber` is less than or equal to `totalDoses`, and increments `doseNumber` after each iteration.

#### `while` loop

**Syntax & Usage:** The `while` loop (`while (condition) { ... }`) executes its body as long as the condition evaluates to true. The condition is checked before each iteration. This is ideal when the number of iterations is not known in advance, but depends on a condition that changes within the loop. It is crucial to ensure the condition eventually becomes false to prevent infinite loops.

```javascript
let remainingRefills = 3;
console.log("Processing available refills...");
while (remainingRefills > 0) {
  console.log(`Refill processed. ${remainingRefills - 1} refills left.`);
  remainingRefills--; // Modify the condition variable inside the loop
}
console.log("No refills remaining.");
// Output: Logs messages for refills 3, 2, 1, then the final message.
```

The loop continues as long as `remainingRefills` is greater than 0. The variable is decremented inside the loop, eventually making the condition false and terminating the loop.

#### `do...while` loop

**Syntax & Usage:** The `do...while` loop (`do { ... } while (condition);`) is similar to `while`, but the condition is checked after the loop body executes. This guarantees that the loop body runs at least once, even if the condition is initially false.

```javascript
let attempts = 0;
let pinEnteredCorrectly = false;
console.log("Attempting pharmacist PIN verification...");
do {
  attempts++;
  console.log(`Attempt ${attempts}...`);
  // Simulate PIN check - let's say it's correct on the 2nd attempt
  if (attempts === 2) {
    pinEnteredCorrectly = true;
    console.log("PIN verified.");
  } else {
     console.log("Incorrect PIN.");
  }
} while (!pinEnteredCorrectly && attempts < 3); // Check condition after the block

if (!pinEnteredCorrectly) {
    console.log("Verification failed after 3 attempts.");
}
// Output: Logs attempt 1 (incorrect), attempt 2 (correct), PIN verified.
```

The loop body runs once (attempt 1). Then the condition (`!pinEnteredCorrectly && attempts < 3`) is checked. If true, it loops again. This continues until the PIN is correct or attempts reach 3.

#### `for...of` loop

**Syntax & Usage:** The `for...of` loop (`for (const element of iterable) { ... }`) provides a modern, clean way to iterate over the *values* of iterable objects, such as Arrays, Strings, Maps, and Sets. It abstracts away index management and directly gives you each element in sequence. This is generally the preferred method for iterating over array elements.

```javascript
const medications = ["Lisinopril 10mg", "Metformin 500mg", "Simvastatin 20mg"];
console.log("Medications in current prescription:");
for (const med of medications) {
  // 'med' holds the actual string value from the array in each iteration
  console.log(`- ${med}`);
}
// Output: Lists each medication on a new line prefixed with '- '.
```

This loop iterates through the `medications` array. In each iteration, the `med` variable holds the current medication string (e.g., `"Lisinopril 10mg"`), making the code concise and focused on the data itself.

#### `for...in` loop

**Syntax & Usage:** The `for...in` loop (`for (const key in object) { ... }`) iterates over the *enumerable property names* (keys) of an object. It is primarily used for inspecting the properties of plain objects. It is not recommended for iterating over Arrays because:

*   It iterates over keys (which are strings, even for array indices) rather than values.
*   It may iterate over properties in an unexpected order.
*   It can include inherited properties from the object's prototype chain, not just the object's own properties. If you must use `for...in`, often you will pair it with `Object.prototype.hasOwnProperty.call(object, key)` to check if the property belongs directly to the object.

```javascript
const patientProfile = {
  patientId: "P7890",
  name: "Jane Smith",
  dateOfBirth: "1990-01-20",
  allergies: ["Penicillin"]
};
console.log("Patient Profile Properties:");
for (const propertyKey in patientProfile) {
  // 'propertyKey' holds the property name (string) in each iteration
  // e.g., "patientId", "name", "dateOfBirth", "allergies"
  if (Object.prototype.hasOwnProperty.call(patientProfile, propertyKey)) {
     // Access the value using bracket notation
     console.log(`  ${propertyKey}: ${patientProfile[propertyKey]}`);
  }
}
// Output: Lists each property name and its corresponding value.
```

This loop iterates through the keys of the `patientProfile` object. Inside the loop, `propertyKey` holds the name of the property (like `"name"`), and we use bracket notation `patientProfile[propertyKey]` to access the corresponding value. The `hasOwnProperty` check ensures we only log properties directly defined on `patientProfile`, ignoring any potentially inherited ones.

#### `break` and `continue`

**Explanation:** These statements provide control within loops. `break` immediately terminates the innermost loop it is contained within, transferring execution to the statement following the loop. `continue` skips the rest of the current iteration of the loop and proceeds to the next iteration (checking the condition again in `for`/`while` loops).

```javascript
const inventoryItems = ["Aspirin", "Ibuprofen", "EXPIRED_ITEM", "Paracetamol"];
console.log("Checking inventory...");
for (const item of inventoryItems) {
  if (item === "EXPIRED_ITEM") {
    console.log(`Found expired item: ${item}. Stopping check.`);
    break; // Exit the loop entirely
  }
  if (item === "Ibuprofen") {
    console.log(`Skipping check for common item: ${item}.`);
    continue; // Go to the next item without logging "Item OK"
  }
  console.log(`Item OK: ${item}`);
}
console.log("Inventory check finished.");
// Output:
// Checking inventory...
// Item OK: Aspirin
// Skipping check for common item: Ibuprofen.
// Found expired item: EXPIRED_ITEM. Stopping check.
// Inventory check finished.
```

When `"EXPIRED_ITEM"` is encountered, `break` stops the loop. When `"Ibuprofen"` is encountered, `continue` skips the "Item OK" log and moves to the next item.

Choosing the correct looping construct is important for code clarity and correctness. The introduction of `for...of` in ES6 significantly improved array iteration, making it the preferred choice over traditional `for` loops (which risk index errors) and `for...in` loops (which are unsuitable for arrays due to iterating over keys and potential prototype pollution). Using `for...of` clearly signals the intent to iterate over the values of an iterable collection, leading to more readable and robust code. `for...in` remains appropriate for its specific purpose: iterating over the keys of an object. `while` and `do...while` are best reserved for situations where the number of iterations depends on a condition evaluated during the loop's execution.

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
> *   [MDN Web Docs: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

**(URL_to_CodeSandbox_for_Exercise_5.1)**

## Section 3: Functions

Functions are a cornerstone of JavaScript, allowing you to group sequences of statements into reusable units. They enable code organization, abstraction, and modularity. Functions can accept input values (parameters), perform specific tasks or calculations using those inputs and other variables accessible within their scope, and optionally return an output value. Modern JavaScript offers several ways to define functions, each with distinct syntax and behavioral characteristics.

### Defining Functions

#### Function Declarations

**Syntax:** This is the traditional way to define a named function using the `function` keyword, followed by the function name, parentheses for parameters, and curly braces for the function body.

```javascript
function calculateDosage(weightKg, dosePerKg) {
  if (typeof weightKg !== 'number' || typeof dosePerKg !== 'number' || weightKg <= 0 || dosePerKg <= 0) {
    return 0; // Return 0 or throw an error for invalid input
  }
  // Simple calculation for demonstration
  const totalDosage = weightKg * dosePerKg;
  return totalDosage;
}
```

**Hoisting:** Function declarations are fully *hoisted*. This means the entire function definition (name and body) is conceptually moved to the top of its containing scope (function or global) by the JavaScript engine *before* the code is executed. Consequently, you can call a function declared this way *before* its actual definition appears in the source code.

```javascript
// Calling the function before its definition in the code
const patientWeight = 70; // kg
const dosageRate = 10; // mg/kg
const requiredDose = calculateDosage(patientWeight, dosageRate);
console.log(`Required dose for ${patientWeight}kg patient: ${requiredDose}mg`); // Works! Output: 700mg

// The actual function definition appears later
function calculateDosage(weightKg, dosePerKg) {
  //... (implementation as above)...
  return weightKg * dosePerKg;
}
```

Hoisting allows for a certain flexibility in code organization, such as defining utility functions at the bottom of a file while calling them earlier.

#### Function Expressions

**Syntax:** A function expression defines a function as part of a larger expression, typically an assignment to a variable. The function itself can be anonymous (most common) or named. Named function expressions are useful for recursion or clearer stack traces during debugging.

```javascript
// Anonymous function expression
const getPatientGreeting = function(patientName) {
  if (!patientName) {
    return "Welcome to SpeedyMeds.";
  }
  return `Hello, ${patientName}. Welcome to SpeedyMeds.`;
};

// Named function expression (name 'generateReport' primarily for internal use/debugging)
const createReport = function generateReport(data) {
  console.log("Generating report...");
  //... report generation logic...
  return `Report generated with ${data.length} entries.`;
};
```

**Hoisting:** Function expressions are not hoisted in the same way as declarations. If you use `var` to declare the variable, the variable declaration is hoisted and initialized to `undefined`. If you use `let` or `const`, the variable declaration is hoisted but remains in the Temporal Dead Zone (TDZ) until the assignment line. In either case, the function itself is only assigned to the variable when the execution reaches that line. Therefore, you cannot call a function expression before its definition in the code.

```javascript
// This would cause an error:
// console.log(getPatientGreeting("Alice")); // If using const/let: ReferenceError (TDZ)
                                         // If using var: TypeError (getPatientGreeting is undefined)

const getPatientGreeting = function(patientName) {
  //... (implementation as above)...
  return `Hello, ${patientName}. Welcome to SpeedyMeds.`;
};
console.log(getPatientGreeting("Alice")); // Works now
```

This behavior enforces a top-down code flow for function definitions.

#### Arrow Functions (ES6)

**Syntax:** Arrow functions provide a more concise syntax for writing function expressions, introduced in ES6. They are particularly well-suited for simple, inline functions.

*   Basic syntax: `(param1, param2) => { statements }`
*   Single parameter (parentheses optional): `param => { statements }`
*   No parameters: `() => { statements }`
*   Single expression body (implicit return, no curly braces needed): `(param1, param2) => expression`

```javascript
// Implicit return for a single expression
const isMedicationExpired = (expiryDateString) => new Date(expiryDateString) < new Date();

// Explicit return with a block body
const formatPrescription = (med, qty, instructions) => {
  if (!med || !qty || !instructions) {
    return "Invalid prescription data.";
  }
  const formattedString = `Medication: ${med}, Quantity: ${qty}, Instructions: ${instructions}`;
  // Example processing: convert to uppercase
  return formattedString.toUpperCase();
};

// No parameters
const getCurrentTimestamp = () => Date.now();

// Single parameter
const logMessage = message => console.log(message);
```

**Hoisting:** Arrow functions behave like function expressions regarding hoisting – the variable holding the arrow function follows `var`/`let`/`const` hoisting rules, but the function definition itself is not hoisted.

**`this` Binding (Lexical `this`):** This is a crucial difference. Arrow functions do not have their own `this` context. Instead, they inherit the `this` value from the enclosing lexical scope where the arrow function was defined. This behavior avoids common problems with `this` encountered in traditional functions, especially when used as callbacks within methods or in asynchronous code.

**`arguments` Object:** Arrow functions also do not have their own `arguments` object. If you need to access all arguments passed to an arrow function, you must use rest parameters (`...args`).

```javascript
// Example demonstrating lexical 'this' (conceptual - requires object context)
/*
const patientMonitor = {
  patientId: 'P123',
  checkStatusRegular: function() {
    setTimeout(function() {
      // 'this' here is likely the global object (window) or undefined (strict mode), NOT patientMonitor
      console.log('Regular function this:', this.patientId); // undefined or error
    }, 100);
  },
  checkStatusArrow: function() {
    setTimeout(() => {
      // 'this' here is inherited from checkStatusArrow's scope, which is patientMonitor
      console.log('Arrow function this:', this.patientId); // P123
    }, 100);
  }
};
patientMonitor.checkStatusRegular();
patientMonitor.checkStatusArrow();
*/

// Example using rest parameters instead of 'arguments'
const logMedicationBatch = (...medications) => {
  console.log("Logging batch:", medications); // 'medications' is a true array
  // console.log(arguments); // ReferenceError: arguments is not defined
};
logMedicationBatch("Aspirin", "Loratadine", "Omeprazole");
// Output: Logging batch: [ 'Aspirin', 'Loratadine', 'Omeprazole' ]
```

The lexical `this` behavior makes arrow functions very predictable when dealing with context, which is why they are widely used in frameworks like React.

### Function Parameters & Arguments

**Default Parameters (ES6):** You can provide default values for function parameters directly in the function signature. The default value is used if an argument for that parameter is not provided during the function call, or if the value `undefined` is explicitly passed.

```javascript
function recordPatientVisit(patientId, visitType = "Routine Checkup") {
  console.log(`Recording visit for ${patientId}. Type: ${visitType}`);
}

recordPatientVisit("P456"); // Output: Recording visit for P456. Type: Routine Checkup
recordPatientVisit("P789", "Consultation"); // Output: Recording visit for P789. Type: Consultation
recordPatientVisit("P101", undefined); // Output: Recording visit for P101. Type: Routine Checkup
```

**Rest Parameters (ES6):** Using the `...` syntax as the last parameter in a function definition allows you to capture an indefinite number of remaining arguments passed to the function into a single, true array. This is the modern replacement for the older, array-like `arguments` object (which is not a real array and is not available in arrow functions).

```javascript
function logMedicationInteractions(primaryMed, interactionCheckDate, ...secondaryMeds) {
  console.log(`Checking interactions for primary medication: ${primaryMed}`);
  console.log(`Check Date: ${interactionCheckDate}`);
  if (secondaryMeds.length > 0) {
    // secondaryMeds is a real array, we can use array methods like join()
    console.log(`With secondary medications: ${secondaryMeds.join(', ')}`);
  } else {
    console.log("No secondary medications listed.");
  }
}

logMedicationInteractions("Warfarin", "2024-01-15", "Aspirin", "Ibuprofen", "Ginkgo Biloba");
// Output:
// Checking interactions for primary medication: Warfarin
// Check Date: 2024-01-15
// With secondary medications: Aspirin, Ibuprofen, Ginkgo Biloba

logMedicationInteractions("Lisinopril", "2024-01-16");
// Output:
// Checking interactions for primary medication: Lisinopril
// Check Date: 2024-01-16
// No secondary medications listed.
```

### Scope Recap (Function vs. Block Scope)

As a reminder from Section 1, functions create their own scope. Variables declared with `var` inside a function are scoped to that entire function, regardless of any blocks (`{}`) they might be inside. In contrast, variables declared with `let` or `const` are scoped to the nearest enclosing block (`{}`), which could be the function block itself or a smaller block like an `if` statement or `for` loop body. This block scoping is generally preferred for its predictability.

### Closures

Closures are a fundamental and powerful concept in JavaScript, stemming directly from how lexical scoping works.

**Definition & Lexical Environment:** A closure occurs when a function "remembers" and continues to have access to variables from its lexical environment (its parent scope(s)) even after that parent scope has finished executing. Essentially, the function carries a reference to its "birthplace" scope.

**Mechanism:** Every time a function is defined in JavaScript, a closure is created. If this function accesses variables from its outer scope(s), the closure maintains a live link to those variables. These outer variables are not garbage collected (removed from memory) as long as the inner function that references them still exists and could potentially be called. This allows the inner function to read and even modify those outer variables later on.

**Practical Examples:**

*   **Data Encapsulation/Privacy:** Closures are the standard way to emulate private variables in JavaScript before the introduction of private class fields. An outer function defines variables and returns one or more inner functions. These inner functions have access to the outer variables (which are inaccessible from outside), providing controlled access.

```javascript
function createPatientRecord(name, initialCondition) {
  let condition = initialCondition; // 'condition' is "private" to the returned object
  let visitCount = 0;

  return {
    recordVisit: function(newCondition) {
      visitCount++;
      condition = newCondition; // Modify the "private" variable
      console.log(`${name} visited (${visitCount}). Condition updated to: ${condition}`);
    },
    getVisitCount: function() {
      return visitCount; // Read the "private" variable
    },
    getCurrentCondition: function() {
      return condition; // Read the "private" variable
    }
    // Cannot access 'condition' or 'visitCount' directly from outside
  };
}

const patientJane = createPatientRecord("Jane Doe", "Stable");
patientJane.recordVisit("Improving"); // Output: Jane Doe visited (1). Condition updated to: Improving
patientJane.recordVisit("Stable");   // Output: Jane Doe visited (2). Condition updated to: Stable
console.log(patientJane.getCurrentCondition()); // Output: Stable
// console.log(patientJane.condition); // undefined
```

Here, `condition` and `visitCount` are only accessible via the methods returned by `createPatientRecord`. The returned methods form closures over the outer scope containing these variables.

*   **Function Factories:** Closures enable the creation of "function factories" – functions that generate and return other functions, often customized based on the factory's arguments.

```javascript
function createDosageCalculator(dosePerKg) {
  // The returned function 'closes over' dosePerKg
  return function(weightKg) {
    if (weightKg <= 0) return 0;
    return weightKg * dosePerKg;
  }
}

const calculatePediatricDose = createDosageCalculator(5); // Creates a function with dosePerKg = 5 stored in its closure
const calculateAdultDose = createDosageCalculator(10);  // Creates a function with dosePerKg = 10 stored in its closure

console.log(`Pediatric dose for 15kg: ${calculatePediatricDose(15)}mg`); // Output: 75mg
console.log(`Adult dose for 70kg: ${calculateAdultDose(70)}mg`); // Output: 700mg
```

Each returned function remembers the specific `dosePerKg` value it was created with.

*   **Callbacks and Asynchronous Operations:** Closures are essential for callbacks used in asynchronous operations like `setTimeout`, `setInterval`, or event listeners. The callback function, when executed later, needs to access variables that were present when it was defined.

```javascript
function scheduleRefillReminder(patientName, medication, delayMs) {
  setTimeout(function() {
    // This callback function forms a closure over patientName and medication
    console.log(`Reminder for ${patientName}: Time to refill ${medication}.`);
  }, delayMs);
}

scheduleRefillReminder("Bob", "Lisinopril", 2000); // Logs the reminder after 2 seconds
```

The function inside `setTimeout` remembers `patientName` and `medication` even though `scheduleRefillReminder` finishes executing almost immediately.

*   **Loop Pitfall:** A common mistake involves creating functions inside a loop that uses `var`. Because `var` is function-scoped, all created functions close over the same variable, which will hold its final value after the loop finishes.

```javascript
// Incorrect behavior with var
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(`Processing item (var): ${i}`); // Logs 4, three times!
  }, i * 100);
}

// Correct behavior with let (creates a new binding per iteration)
for (let j = 1; j <= 3; j++) {
  setTimeout(function() {
    console.log(`Processing item (let): ${j}`); // Logs 1, 2, 3 correctly
  }, j * 100);
}
```

Using `let` solves this because it creates a new block-scoped variable `j` for each loop iteration, and each timeout callback closes over its respective `j`.

**Performance/Memory Implications:** Because closures keep references to their outer scopes, these scopes cannot be garbage collected (removed from memory) as long as the closure is reachable. If a closure inadvertently holds references to large data structures or DOM elements that are no longer needed elsewhere, it can lead to memory leaks. Creating many closures in tight loops can also have performance implications. While modern JavaScript engines are highly optimized for closures, it is good practice to be mindful of what variables are being closed over and to release references (e.g., set variables holding the closure function to `null`) when they are no longer needed, especially in long-running applications.

Closures are not an optional or obscure feature; they are a direct and fundamental consequence of JavaScript's lexical scoping rules. Every function potentially creates a closure. Understanding this mechanism is essential because it enables many powerful and common programming patterns. Data encapsulation via the module pattern (discussed in Section 6), the ability to create configurable functions (function factories), and the correct handling of state in asynchronous callbacks all rely heavily on the behavior of closures. Recognizing when a closure is formed and what variables it captures is key to writing effective JavaScript.

> 📲 **Native Developers:** The concept of closures—a function capturing its surrounding environment—is likely familiar. Java lambdas can capture final or effectively final local variables. Kotlin lambdas can capture and modify variables from their enclosing scope. Swift closures also capture variables from their surrounding context by reference by default. JavaScript closures operate similarly, maintaining a live link to the outer variables, allowing both reading and modification. The main differences often arise from JavaScript's dynamic typing and historical scoping rules with `var`, which could make certain closure behaviors (like the loop issue) seem less intuitive initially compared to the more explicit capture semantics or stricter scoping in native languages.
>
> **Key Takeaway:** JavaScript closures provide a powerful way for inner functions to maintain access to their outer scope's variables. This is similar to lambda/closure capture in native languages. Be mindful that this reference is live, and be aware of potential memory implications if closures unintentionally keep large objects alive.
>
> **Source:** [Closures | Documentation - Swift.org](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures/)

### The `this` Keyword (Brief Introduction)

**Explanation:** `this` is a special keyword in JavaScript that refers to the execution context of a function. Unlike variables, the value of `this` is not determined by where the function is defined (lexical scope) but rather by *how* the function is called. This dynamic nature makes `this` a common source of confusion for developers new to JavaScript.

**Function Calls vs. Arrow Functions:**

*   **Regular Functions (Declarations/Expressions):** The value of `this` is set dynamically at call time.
    *   **Standalone Call:** If called simply like `myFunction()`, `this` usually refers to the global object (`window` in browsers) in non-strict mode, or `undefined` in strict mode (`"use strict";`).
    *   **Method Call:** If called as a method of an object (`myObject.myMethod()`), `this` refers to the object the method was called on (`myObject`).
    *   **Constructor Call:** If called with `new` (`new MyFunction()`), `this` refers to the newly created instance object.
    *   **Explicit Binding:** Using methods like `.call()`, `.apply()`, or `.bind()`, you can explicitly set the value of `this`.
*   **Arrow Functions:** Arrow functions behave differently. They do not have their own `this` binding. They lexically inherit `this` from the surrounding function or scope in which they were defined. The value of `this` inside an arrow function is fixed at the time of its creation and cannot be changed by how it is called or by using `.call()`, `.apply()`, or `.bind()`.

**Relevance to React Native:** Understanding `this` was historically very important when using class-based components in React/React Native, especially for binding event handlers. In modern React Native development, which heavily favors functional components and Hooks, the use of `this` is much less frequent. Arrow functions are commonly used for callbacks and event handlers within functional components precisely because their lexical `this` binding avoids the complexities associated with traditional function `this` behavior. We will revisit `this` as needed in the context of React components later in the course.

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
> *   [MDN Web Docs: Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> *   [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
> *   [MDN Web Docs: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

**(URL_to_CodeSandbox_for_Exercise_5.2)**

## Section 4: Objects and Arrays

Objects and Arrays are JavaScript's primary tools for structuring and managing collections of data. Objects are versatile collections of key-value pairs, ideal for representing entities with named characteristics (properties) and associated actions (methods). Arrays provide ordered lists, perfect for storing sequences of items. Mastering their creation, manipulation, and modern ES6+ features like destructuring and spread syntax is fundamental for effective JavaScript development, especially in data-intensive applications like React Native apps often are.

### Objects

Objects are dynamic collections of properties.

**Object Literals:** The most common way to create objects is using the literal syntax: curly braces `{}` containing zero or more key-value pairs, separated by commas. Keys are usually strings (quoted if they contain spaces or special characters, otherwise quotes are optional for valid identifiers) or Symbols. Values can be any JavaScript type, including other objects or functions.

```javascript
const patient = {
  "patient-id": "P12345", // Quoted key
  name: "John Appleseed",
  dateOfBirth: "1985-03-14",
  isActive: true,
  address: { // Nested object
    street: "123 Health St",
    city: "Wellville"
  }
};
```

**Properties & Methods:** Properties store the data associated with an object. When a property's value is a function, it is called a method, representing an action the object can perform.

**Accessing Properties:** You can access properties using:

*   **Dot Notation (`.`):** `object.propertyName`. This is the most common way but only works if the property key is a valid JavaScript identifier (no spaces, does not start with a number, etc.).
*   **Bracket Notation (`[]`):** `object['propertyName']`. This is more versatile. It is required if the key is not a valid identifier (e.g., contains spaces, hyphens) or if the key is stored in a variable.

```javascript
console.log(patient.name); // "John Appleseed"
console.log(patient["patient-id"]); // "P12345" (Bracket notation needed)
console.log(patient.address.city); // "Wellville" (Accessing nested property)

const keyToAccess = "dateOfBirth";
console.log(patient[keyToAccess]); // "1985-03-14" (Accessing via variable)
```

**Adding/Modifying/Deleting Properties:** Objects are mutable. You can add new properties, change existing ones, or remove them after creation.

```javascript
patient.primaryDoctor = "Dr. Smith"; // Add new property
patient.isActive = false; // Modify existing property
delete patient.dateOfBirth; // Remove property
console.log(patient);
// Output: { 'patient-id': 'P12345', name: 'John Appleseed', isActive: false, address: { street: '123 Health St', city: 'Wellville' }, primaryDoctor: 'Dr. Smith' }
```

**Shorthand Syntax (ES6):** ES6 introduced convenient shorthands for object literals:

*   **Method Shorthand:** Define methods without the `function` keyword.

```javascript
const calculator = {
  add(a, b) { // Shorthand for add: function(a, b)
    return a + b;
  }
};
```

*   **Property Value Shorthand:** If a variable name in the surrounding scope matches the desired property key, you can just include the variable name.

```javascript
const medicationName = "Amoxicillin";
const dosage = 500; // mg
const medicationRecord = { medicationName, dosage, type: "Antibiotic" };
// Equivalent to: { medicationName: medicationName, dosage: dosage, type: "Antibiotic" }
console.log(medicationRecord);
// Output: { medicationName: 'Amoxicillin', dosage: 500, type: 'Antibiotic' }
```

**Object Destructuring (ES6):** This powerful syntax provides an easy way to extract properties from objects into distinct variables.

*   **Basic Extraction:** Extract properties into variables with the same name.

```javascript
const { name, isActive } = patient;
console.log(name); // "John Appleseed"
console.log(isActive); // false
```

*   **Renaming Variables:** Extract a property into a variable with a different name using a colon (`:`).

```javascript
const { "patient-id": patientId, address: patientAddress } = patient;
console.log(patientId); // "P12345"
console.log(patientAddress); // { street: '123 Health St', city: 'Wellville' }
```

*   **Default Values:** Provide a default value using `=` if the property might be missing or `undefined` in the object.

```javascript
const { primaryDoctor = "Unassigned", insuranceProvider } = patient;
console.log(primaryDoctor); // "Dr. Smith" (from the object)
console.log(insuranceProvider); // undefined (property doesn't exist)

const { emergencyContact = { name: "N/A", phone: "N/A" } } = patient;
console.log(emergencyContact); // { name: 'N/A', phone: 'N/A' }
```

*   **Rest Properties (`...`):** Collect all remaining enumerable own properties into a new object. Must be the last element in the pattern.

```javascript
const { name: pName, isActive: pIsActive, ...restOfPatientData } = patient;
console.log(pName); // "John Appleseed"
console.log(restOfPatientData);
// Output: { 'patient-id': 'P12345', address: { street: '123 Health St', city: 'Wellville' }, primaryDoctor: 'Dr. Smith' }
```

*   **Nested Destructuring:** Extract properties from nested objects directly.

```javascript
const { address: { city } } = patient;
console.log(city); // "Wellville"
```

**Example (SpeedyMeds Context - Prescription Object):**

```javascript
const medicationName = "Atorvastatin";
const dosage = 20; // mg
const patientInfo = { name: "Jane Doe", id: "P789", dob: "1975-11-02" };

const prescription = {
  prescriptionId: `RX${Math.floor(Math.random() * 10000)}`,
  medicationName, // Property shorthand
  dosage,         // Property shorthand
  patient: patientInfo, // Assigning another object
  quantity: 90,
  refills: 2,
  instructions: "Take 1 tablet daily in the evening.",

  // Method shorthand to generate label text
  getLabelText() {
    return `${this.medicationName} ${this.dosage}mg\nPatient: ${this.patient.name}\n${this.instructions}`;
  },

  // Method to update refills
  updateRefills(newCount) {
    if (typeof newCount === 'number' && newCount >= 0) {
      this.refills = newCount;
      console.log(`Refills updated to ${this.refills}`);
    } else {
      console.warn("Invalid refill count provided.");
    }
  }
};

// Using the object
console.log("--- Prescription Label ---");
console.log(prescription.getLabelText());
console.log("------------------------");
prescription.updateRefills(1); // Output: Refills updated to 1

// Destructuring for specific needs
const {
  medicationName: med,
  quantity,
  patient: { name: patientName, dob: patientDOB }, // Nested destructuring
  refills = 0, // Default value if refills was missing
 ...otherDetails // Rest property
} = prescription;

console.log(`Dispensing: ${med} (${quantity} units) for ${patientName} (DOB: ${patientDOB}). Refills left: ${refills}`);
// Output: Dispensing: Atorvastatin (90 units) for Jane Doe (DOB: 1975-11-02). Refills left: 1

console.log("Other prescription details:", otherDetails);
// Output: Other prescription details: { prescriptionId: 'RX...', dosage: 20, instructions: '...', getLabelText: [Function: getLabelText], updateRefills: [Function: updateRefills] }
```

This comprehensive example showcases object literal creation using shorthand properties. It includes methods defined with shorthand syntax (`getLabelText`, `updateRefills`). It demonstrates accessing properties via dot notation (`prescription.getLabelText()`) and calling methods. Finally, it extensively uses destructuring to extract various pieces of information: basic extraction (`quantity`), renaming (`medicationName: med`), nested extraction (`patient: { name: patientName, dob: patientDOB }`), default values (`refills = 0`), and collecting remaining properties using the rest syntax (`...otherDetails`).

> 📲 **Native Developers:** JavaScript objects created via literals `{}` are fundamentally different from class instances in statically-typed OOP languages. Think of them more like Maps (Java), Maps or data classes (Kotlin), or Dictionaries (Swift) – flexible containers for key-value pairs. JavaScript does not require a class definition to create an object. While ES6 introduced `class` syntax, it is primarily syntactic sugar over JavaScript's underlying prototype-based inheritance model. In prototypal inheritance, objects inherit directly from other objects (their prototype), forming a chain, rather than classes inheriting from other classes. This is a core difference from the classical inheritance you are used to. Object destructuring, however, might feel somewhat similar to destructuring declarations in Kotlin or pattern matching features in Swift for extracting values from data structures.
>
> **Key Takeaway:** Treat JavaScript objects as dynamic dictionaries initially. Do not expect the strictness of classes unless you explicitly use the ES6 `class` syntax, and even then, be aware that the underlying inheritance mechanism (prototypes) is different.
>
> **Source:** [How prototypal inheritance is practically different from classical inheritance?](https://softwareengineering.stackexchange.com/questions/99251/how-prototypal-inheritance-is-practically-different-from-classical-inheritance)

### Arrays

Arrays are ordered lists of values, indexed starting from zero.

**Array Literals:** The simplest way to create an array is using square brackets `[]` containing comma-separated values. Arrays can hold elements of mixed data types.

```javascript
const patientIds = ["P123", "P456", "P789"];
const mixedData = [10, "Metformin", true, null, { dose: 500 }];
```

**Accessing Elements:** Use bracket notation with the zero-based index: `array[index]`.

```javascript
console.log(patientIds[0]); // "P123"
console.log(mixedData[1]); // "Metformin"
console.log(patientIds[3]); // undefined (index out of bounds)
```

**Common Properties/Methods:**

*   `.length`: Returns the number of elements in the array.
*   `.push(item1, ...)`: Adds one or more elements to the end of the array and returns the new length.
*   `.pop()`: Removes the last element from the array and returns that element.
*   `.shift()`: Removes the first element from the array and returns that element.
*   `.unshift(item1, ...)`: Adds one or more elements to the beginning of the array and returns the new length.
*   `.slice(start, end)`: Returns a shallow copy of a portion of an array into a new array object. The original array is not modified. `end` index is exclusive.
*   `.splice(start, deleteCount, item1, ...)`: Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Modifies the original array. (Note: This is a brief overview. Array methods like `map`, `filter`, `reduce` are covered separately below).

**Array Destructuring (ES6):** Similar to object destructuring, but uses positions rather than keys.

*   **Basic Extraction:** Assign elements to variables based on their index.

```javascript
const [firstPatient, secondPatient] = patientIds;
console.log(firstPatient); // "P123"
console.log(secondPatient); // "P456"
```

*   **Skipping Elements:** Use commas to skip elements you do not need.

```javascript
const [ , , thirdPatient] = patientIds;
console.log(thirdPatient); // "P789"
```

*   **Default Values:** Provide defaults for elements that might not exist.

```javascript
const [p1, p2, p3, p4 = "P_DEFAULT"] = patientIds;
console.log(p4); // "P_DEFAULT"
```

*   **Rest Elements (`...`):** Collect remaining elements into a new array. Must be the last element.

```javascript
const [primaryId, ...secondaryIds] = patientIds;
console.log(primaryId); // "P123"
console.log(secondaryIds); // ["P456", "P789"]
```

**Spread Syntax (`...`) (ES6):** Used to expand iterable elements (like arrays or strings) into places where multiple elements/arguments are expected.

*   **In Array Literals:** Create new arrays by combining or copying existing ones.

```javascript
const highPriorityPatients = ["P123", "P456"];
const regularPatients = ["P789", "P101"];
const waitingList = ["P112"];

// Combine arrays
const allPatients = [...highPriorityPatients, ...regularPatients, ...waitingList];
console.log(allPatients); // ["P123", "P456", "P789", "P101", "P112"]

// Create a shallow copy
const patientsCopy = [...allPatients];
console.log(patientsCopy); // ["P123", "P456", "P789", "P101", "P112"]

// Add elements immutably
const newPatientList = [...allPatients, "P113"];
console.log(newPatientList); // ["P123", "P456", "P789", "P101", "P112", "P113"]
```

*   **In Function Calls:** Pass elements of an array as individual arguments to a function.

```javascript
function logPatientIds(id1, id2, id3) {
  console.log("Logging IDs:", id1, id2, id3);
}
const idsToLog = ["P123", "P456", "P789"];
logPatientIds(...idsToLog); // Equivalent to logPatientIds("P123", "P456", "P789")
// Output: Logging IDs: P123 P456 P789
```

**Example (SpeedyMeds Context - Managing Medication List):**

```javascript
let formulary = ["Lisinopril", "Metformin", "Simvastatin"];

// Add a new medication
formulary.push("Omeprazole");
console.log("Added Omeprazole:", formulary);
// Output: Added Omeprazole: [ 'Lisinopril', 'Metformin', 'Simvastatin', 'Omeprazole' ]

// Remove the first medication
const removedMed = formulary.shift();
console.log(`Removed ${removedMed}:`, formulary); // Removed Lisinopril
// Output: Removed Lisinopril: [ 'Metformin', 'Simvastatin', 'Omeprazole' ]

// Combine with another list using spread
const newMedications = ["Atorvastatin", "Amlodipine"];
const updatedFormulary = [...formulary, ...newMedications];
console.log("Updated Formulary:", updatedFormulary);
// Output: Updated Formulary: [ 'Metformin', 'Simvastatin', 'Omeprazole', 'Atorvastatin', 'Amlodipine' ]

// Destructuring the updated formulary
const [firstMed, secondMed, ...otherMeds] = updatedFormulary;
console.log(`First two meds: ${firstMed}, ${secondMed}`); // Metformin, Simvastatin
console.log(`Other meds count: ${otherMeds.length}`); // 3

// Using spread in a function call (e.g., logging)
function displayMeds(...medList) { // Rest parameter
  console.log("Displaying Meds:");
  medList.forEach((med, index) => console.log(`${index + 1}. ${med}`));
}
displayMeds(...updatedFormulary); // Spread syntax
// Output: Logs each medication with a number
```

This example demonstrates adding (`push`) and removing (`shift`) elements from an array. It uses the spread syntax (`...`) effectively to create a new, combined array (`updatedFormulary`) without modifying the original arrays. Array destructuring is then used to easily extract the first two elements and gather the rest into `otherMeds`. Finally, spread syntax is used again to pass the elements of `updatedFormulary` as individual arguments to the `displayMeds` function, which uses a rest parameter to collect them.

### Common Array Iteration Methods (Functional Approach)

Beyond traditional loops, JavaScript provides powerful array methods that align with functional programming principles. These methods often take a callback function and iterate over the array, performing transformations or calculations without directly mutating the original array.

#### `.forEach()`

**Explanation:** Executes a provided callback function once for each element in the array. It is primarily used for its side effects (e.g., logging each element, updating an external counter, making an API call for each item). `forEach` itself returns `undefined`, so it cannot be chained with other array methods like `map` or `filter` that expect an array return value.

**Syntax:** `array.forEach((element, index, array) => { /* perform action with element */ });` The `index` and `array` parameters are optional.

```javascript
const pendingPrescriptions = [ { id: 101, drug: "Lisinopril" }, { id: 102, drug: "Metformin" } ];
console.log("Processing pending prescriptions:");
pendingPrescriptions.forEach(order => {
  // Side effect: logging to console
  console.log(` - Processing order ID: ${order.id} for ${order.drug}`);
  // Could also call another function here, e.g., sendToVerificationQueue(order);
});
// Output: Logs processing message for each order.
```

Here, `forEach` iterates through each prescription object, logging a message for each one. No new array is created.

#### `.map()`

**Explanation:** This is one of the most frequently used array methods. It iterates over each element, applies a transformation function (the callback) to it, and returns a new array containing the transformed elements in the same order. The original array remains unchanged. It is essential for creating new data structures based on existing arrays.

**Syntax:** `const newArray = array.map((element, index, array) => { return transformation(element); });` The `index` and `array` parameters are optional. Arrow functions with implicit returns (`array.map(element => element * 2)`) are common for simple transformations.

```javascript
const prescriptions = [
  { id: 1, drug: "Lisinopril", quantity: 30 },
  { id: 2, drug: "Metformin", quantity: 60 },
  { id: 3, drug: "Simvastatin", quantity: 90 }
];
// Create an array containing only the drug names
const drugNames = prescriptions.map(p => p.drug);
console.log(drugNames); // Output: [ 'Lisinopril', 'Metformin', 'Simvastatin' ]

// Create an array of objects with drug name and quantity doubled
const doubledQuantityInfo = prescriptions.map(p => ({
   name: p.drug,
   doubledQty: p.quantity * 2
}));
console.log(doubledQuantityInfo);
// Output: [ { name: 'Lisinopril', doubledQty: 60 }, { name: 'Metformin', doubledQty: 120 }, { name: 'Simvastatin', doubledQty: 180 } ]
```

The first `map` extracts the `drug` property from each object. The second `map` transforms each prescription object into a new object with a different structure, demonstrating `map`'s power in reshaping data.

#### `.filter()`

**Explanation:** Iterates through an array and returns a new array containing only the elements for which the provided callback function returns a truthy value. It is used to select a subset of elements based on a condition, without modifying the original array.

**Syntax:** `const filteredArray = array.filter((element, index, array) => { return condition(element); });` The callback must return `true` to include the element or `false` to exclude it. `index` and `array` are optional.

```javascript
const inventory = [
  { name: "Aspirin", stock: 100, isControlled: false },
  { name: "Oxycodone", stock: 15, isControlled: true },
  { name: "Amoxicillin", stock: 50, isControlled: false },
  { name: "Fentanyl Patch", stock: 5, isControlled: true }
];

// Filter for items with low stock (< 20)
const lowStockItems = inventory.filter(item => item.stock < 20);
console.log("Low Stock Items:", lowStockItems);
// Output: Low Stock Items: [ { name: 'Oxycodone', stock: 15, isControlled: true }, { name: 'Fentanyl Patch', stock: 5, isControlled: true } ]

// Filter for controlled substances
const controlledSubstances = inventory.filter(item => item.isControlled);
console.log("Controlled Substances:", controlledSubstances);
// Output: Controlled Substances: [ { name: 'Oxycodone', stock: 15, isControlled: true }, { name: 'Fentanyl Patch', stock: 5, isControlled: true } ]
```

These examples show how `filter` selects specific items based on conditions related to `stock` and `isControlled` properties, creating new arrays containing only the matching items.

#### `.reduce()`

**Explanation:** This is arguably the most versatile array iteration method. It executes a "reducer" callback function on each element of the array, passing the result of the previous execution (the accumulator) to the next execution, ultimately resulting in a single output value. This single value can be anything – a number (like a sum or count), a string, an object, or even another array. It is powerful for summarizing or transforming an array into a completely different structure.

**Syntax:** `const result = array.reduce((accumulator, currentValue, currentIndex, array) => { /* return new accumulator value */ }, initialValue);`

*   `accumulator`: The value resulting from the previous callback invocation. On the first call, it is the `initialValue` if provided, otherwise it is the first element of the array.
*   `currentValue`: The current element being processed.
*   `currentIndex` (Optional): The index of the `currentValue`.
*   `array` (Optional): The array `reduce` was called upon.
*   `initialValue` (Optional): A value to use as the first argument to the first call of the callback. If omitted, the first element of the array is used as the initial accumulator, and iteration starts from the second element. Providing `initialValue` is often crucial, especially when working with objects or expecting a specific type for the result, or when the array might be empty.

```javascript
const orderCosts = [15.50, 22.00, 8.75, 35.25];

// Calculate the total cost of the order
const totalOrderCost = orderCosts.reduce((sum, cost) => {
  console.log(`Accumulator: ${sum}, Current Cost: ${cost}`); // To show the process
  return sum + cost;
}, 0); // Start the sum at 0
console.log(`Total cost: $${totalOrderCost.toFixed(2)}`); // Output: Total cost: $81.50

// Group prescriptions by medication name
const prescriptionsList = [
  { id: 1, drug: "Lisinopril", patient: "Alice" },
  { id: 2, drug: "Metformin", patient: "Bob" },
  { id: 3, drug: "Lisinopril", patient: "Charlie" },
  { id: 4, drug: "Simvastatin", patient: "Alice" }
];
const groupedByDrug = prescriptionsList.reduce((groups, prescription) => {
  const drug = prescription.drug;
  if (!groups[drug]) {
    groups[drug] = []; // Initialize array if drug key doesn't exist
  }
  groups[drug].push(prescription); // Add prescription to the group
  return groups; // Return the modified groups object for the next iteration
}, {}); // Start with an empty object as the initial value
console.log("Grouped Prescriptions:", groupedByDrug);
/* Output:
Grouped Prescriptions: {
  Lisinopril: [ { id: 1, drug: 'Lisinopril', patient: 'Alice' }, { id: 3, drug: 'Lisinopril', patient: 'Charlie' } ],
  Metformin: [ { id: 2, drug: 'Metformin', patient: 'Bob' } ],
  Simvastatin: [ { id: 4, drug: 'Simvastatin', patient: 'Alice' } ]
}
*/
```

The first example uses `reduce` to sum the `orderCosts`, starting with an `initialValue` of 0. The second, more complex example uses `reduce` to transform an array of prescription objects into an object where prescriptions are grouped by drug name. It starts with an empty object (`{}`) as the `initialValue` and builds up the groups within the reducer function.

The array methods `map`, `filter`, and `reduce` are fundamental tools in the functional programming style within JavaScript. They allow developers to express complex data transformations and manipulations in a declarative way, often resulting in code that is more concise and easier to understand than equivalent imperative code using traditional `for` loops. These methods operate immutably by default, returning new arrays (`map`, `filter`) or values (`reduce`) rather than modifying the original array, which helps prevent side effects and makes code easier to reason about. Chaining these methods together (e.g., `data.filter(...).map(...)`) creates elegant data processing pipelines. While potentially slightly less performant than highly optimized `for` loops in some micro-benchmarks, their benefits in readability and maintainability often outweigh minor performance differences in typical application code.

> 🌐 **Web Developers:** As a web developer using React or Angular, you are likely very familiar with these functional array methods. `map` is ubiquitous in React for transforming data arrays into lists of JSX elements. `filter` is commonly used for selecting data based on criteria before rendering or processing. `reduce` might be used for more complex state transformations or calculations. In Angular, while RxJS operators often handle stream transformations, these standard array methods are still essential for manipulating static array data within components or services.
>
> **Key Takeaway:** This section reinforces the importance and utility of these core methods. Ensure you have a solid grasp of how `map`, `filter`, and especially `reduce` (with its accumulator and initial value) work, as they form the basis for many data manipulation tasks in React Native development, just as they do in web development.
>
> **Source:** [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
> *   [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
> *   [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> *   [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> *   [MDN Web Docs: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
> *   [MDN Web Docs: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
> *   [MDN Web Docs: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Section 5: Asynchronous JavaScript

JavaScript, by its nature, is single-threaded, meaning it can only execute one piece of code at a time. In environments like web browsers or React Native applications, the main thread is also responsible for handling user interface updates and responding to user interactions. If a long-running operation (like fetching data from a network, reading a large file, or performing complex calculations) were executed synchronously on this main thread, the entire application would freeze, becoming unresponsive until the operation completed.

To overcome this limitation and maintain responsiveness, JavaScript heavily relies on asynchronous programming. Asynchronous operations allow the program to initiate a task that might take time (like an API call) and then continue executing other code without waiting for that task to finish. When the task eventually completes, a mechanism is needed to handle its result or error. This non-blocking behavior is orchestrated by the Event Loop, a core concept in JavaScript's concurrency model. We will explore the Event Loop conceptually and then delve into the primary patterns for managing asynchronous operations: Callbacks, Promises, and the modern `async`/`await` syntax.

### The Event Loop (Conceptual Overview)

The Event Loop is the mechanism that enables JavaScript's non-blocking asynchronous behavior despite being single-threaded. It coordinates the execution of code, the handling of events, and the processing of asynchronous callbacks.

**Single Thread:** JavaScript code execution happens on a single main thread.

**Components:** The model involves several key parts working together:

*   **Call Stack:** This is where synchronous function calls are tracked and executed (Last-In, First-Out). When you call a function, it is pushed onto the stack; when it returns, it is popped off. The stack must be empty for asynchronous tasks to run.
*   **Web APIs / Native Modules / Node APIs:** The surrounding environment (browser, React Native's bridge, Node.js) provides APIs for operations that can run outside the main JavaScript thread (e.g., `setTimeout`, `fetch`, native device interactions, file system access). These APIs handle the operation in the background.
*   **Callback Queue (Task Queue / Macrotask Queue):** When an asynchronous operation managed by a Web API/Native Module completes, its associated callback function (e.g., the function passed to `setTimeout` or an event handler) is placed in the Callback Queue (also called the Task Queue or Macrotask Queue). These tasks wait here in First-In, First-Out order.
*   **Microtask Queue:** This queue has higher priority than the Callback Queue. Callbacks associated with Promises (specifically, the functions passed to `.then()`, `.catch()`, `.finally()`) and functions queued via `queueMicrotask()` are placed here.
*   **Event Loop:** This is the conductor. It continuously checks if the Call Stack is empty.
    *   If the Call Stack is empty, it first processes the Microtask Queue. It takes all currently queued microtasks and executes them one by one until the Microtask Queue is empty. Importantly, if executing a microtask queues another microtask, that new microtask will also be executed before moving on.
    *   Only after the Microtask Queue is empty does the Event Loop check the Callback Queue (Task Queue).
    *   If the Callback Queue has tasks, the Event Loop takes the oldest task (FIFO), pushes its callback function onto the (now empty) Call Stack, and the engine executes it.
    *   Once that task finishes and the Call Stack is empty again, the loop repeats from step 1 (checking the Microtask Queue again).
*   **Rendering:** In browser environments, rendering updates (painting changes to the screen) typically happen after a task from the Callback Queue has finished and the Microtask Queue has been emptied, but before the next task from the Callback Queue begins. This ensures that long-running JavaScript does not block rendering indefinitely, but also means a single long task can still cause noticeable UI freezes.

**Visualization:**

```mermaid
graph TD
    A[Call Stack] --> B{Is Call Stack Empty?};
    B -- Yes --> C[Microtask Queue];
    C -- Process All Microtasks --> D{Is Microtask Queue Empty?};
    D -- Yes --> E[Callback Queue];
    E -- Take One Task --> A;
    B -- No --> A;
    F[Web APIs / Native Modules] -- Operation Complete --> G[Callback Queue];
    H[Promise Callbacks] -- Promise Settled --> I[Microtask Queue];

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#ff9,stroke:#333,stroke-width:2px
    style D fill:#ccf,stroke:#333,stroke-width:2px
    style E fill:#9cf,stroke:#333,stroke-width:2px
    style F fill:#cfc,stroke:#333,stroke-width:2px
    style G fill:#9cf,stroke:#333,stroke-width:2px
    style H fill:#ff9,stroke:#333,stroke-width:2px
    style I fill:#ff9,stroke:#333,stroke-width:2px

    linkStyle 1 stroke:#f66,stroke-width:2px
    linkStyle 2 stroke:#f66,stroke-width:2px
    linkStyle 3 stroke:#f66,stroke-width:2px
    linkStyle 4 stroke:#66f,stroke-width:2px
    linkStyle 5 stroke:#66f,stroke-width:2px
    linkStyle 6 stroke:#6f6,stroke-width:2px
    linkStyle 7 stroke:#6f6,stroke-width:2px
    linkStyle 8 stroke:#f66,stroke-width:2px
    linkStyle 9 stroke:#f66,stroke-width:2px
```

**Diagram Description:** The **Call Stack** executes synchronous code. When it is empty, the **Event Loop** checks the **Microtask Queue** (populated by **Promise Callbacks**) and runs all microtasks. Then, if the Microtask Queue is empty, it checks the **Callback Queue** (populated by **Web APIs / Native Modules** completing operations) and moves one task to the Call Stack for execution. This cycle repeats, allowing asynchronous operations to run without blocking the main thread.

> 📲 **Native Developers:** JavaScript's concurrency model, centered around a single thread and an event loop, is fundamentally different from the native multi-threading capabilities you might be used to on Android (e.g., AsyncTask, ThreadPoolExecutor, Kotlin Coroutines interacting with Dispatchers) or iOS (e.g., Grand Central Dispatch - GCD, OperationQueue). While native platforms have a dedicated main/UI thread (like Android's Looper-based main thread or iOS's main RunLoop) that must not be blocked, JavaScript achieves non-blocking behavior for I/O operations (network, file system) by delegating them to the environment (browser, Node.js, React Native bridge) and using the event loop to manage callbacks when these operations complete. You do not typically create and manage background threads directly in JavaScript application code; instead, you rely on asynchronous APIs like Promises and `async`/`await`. The concepts of distinct Macrotask (Callback) and Microtask queues, with the latter having priority, are specific to the JavaScript event loop.
>
> **Key Takeaway:** Concurrency in JavaScript is cooperative and event-driven, not preemptive via multiple threads you manage directly. Long-running synchronous JavaScript code will block the single main thread, just like blocking the UI thread in native development is detrimental. Therefore, mastering asynchronous patterns (Promises, `async`/`await`) is absolutely essential for building responsive applications.
>
> **Source:** [All About Looper, MessageQueue, and Handler in Android](https://namanh11611.github.io/p/looper-message-queue-handler/)

### Callbacks

The earliest pattern for handling asynchronous operations in JavaScript.

**Explanation:** A callback is simply a function passed as an argument to another function, with the intention of being executed ("called back") at a later time, typically when an asynchronous operation completes.

```javascript
// Conceptual Example
function fetchPatientDataFromServer(patientId, callback) {
  console.log(`Fetching data for ${patientId}...`);
  // Simulate network delay
  setTimeout(() => {
    const success = Math.random() > 0.2; // Simulate success/failure
    if (success) {
      const data = { id: patientId, name: "Alice", condition: "Stable" };
      callback(null, data); // Call back with null error and data
    } else {
      const error = new Error("Network error fetching data");
      callback(error, null); // Call back with error and null data
    }
  }, 1000);
}

fetchPatientDataFromServer("P123", (error, data) => {
  if (error) {
    console.error("Callback Error:", error.message);
  } else {
    console.log("Callback Success:", data);
  }
});
```

**Callback Hell:** When multiple asynchronous operations need to happen in sequence, relying solely on callbacks leads to deeply nested structures, often called "Callback Hell" or the "Pyramid of Doom". This nesting makes code difficult to read, debug, and manage error handling consistently.

```javascript
// Conceptual Callback Hell
/*
step1(value1, (error1, result1) => {
  if (error1) { // handle error1 }
  else {
    step2(result1, (error2, result2) => {
      if (error2) { // handle error2 }
      else {
        step3(result2, (error3, result3) => {
          if (error3) { // handle error3 }
          else {
            //...and so on...
          }
        });
      }
    });
  }
});
*/
```

Due to these drawbacks, while callbacks are still used in some APIs (especially older Node.js APIs), modern JavaScript heavily favors Promises and `async`/`await`.

### Promises (ES6)

Promises provide a cleaner, more structured way to handle asynchronous operations and avoid callback hell.

**Concept:** A Promise is an object that acts as a placeholder for a value that will be available later. It represents the eventual result of an asynchronous operation. A Promise is always in one of three states:

*   `pending`: The initial state; the operation has not completed yet.
*   `fulfilled` (or `resolved`): The operation completed successfully, and the Promise now has a resulting value.
*   `rejected`: The operation failed, and the Promise has a reason (usually an `Error` object) for the failure.

Once a Promise is fulfilled or rejected, it is considered *settled*, and its state cannot change again.

**`.then()`:** This method is attached to a Promise to schedule callback functions for when the Promise is fulfilled. It takes one or two arguments: the first is a callback for fulfillment (receives the resolved value), and the second (optional) is a callback for rejection. Crucially, `.then()` returns a *new* Promise. This allows chaining multiple `.then()` calls together to handle sequential asynchronous operations in a much flatter, more readable structure than nested callbacks. The value returned from a `.then()` callback becomes the resolved value of the promise returned by that `.then()`. If a callback returns another Promise, the chain waits for that Promise to settle.

**`.catch()`:** This method is specifically for handling rejected Promises. It takes a single callback function that receives the rejection reason (the error). It is syntactic sugar for `.then(undefined, rejectionCallback)`. Using `.catch()` at the end of a Promise chain is the standard way to handle errors from any preceding `.then()` in the chain.

**`.finally()` (ES2017):** This method is attached to a Promise to schedule a callback function that will be executed regardless of whether the Promise is fulfilled or rejected. It is useful for cleanup tasks (e.g., hiding a loading spinner). The `.finally()` callback does not receive the resolved value or rejection reason and does not affect the final outcome of the Promise chain.

**`Promise.all()`:** Takes an array of Promises and returns a *single* new Promise. This new Promise fulfills *only if all* the Promises in the input array fulfill. Its resolved value is an array containing the resolved values of the input Promises, in the same order. If *any* of the input Promises reject, the `Promise.all()` Promise immediately rejects with the reason of the first Promise that rejected. Useful for performing multiple independent asynchronous operations concurrently and waiting for all of them to complete.

**`Promise.race()`:** Takes an array of Promises and returns a *single* new Promise. This new Promise settles (fulfills or rejects) as soon as *any* of the Promises in the input array settles. Its outcome (resolved value or rejection reason) is the same as the first Promise that settled. Useful when you only care about the result of the fastest asynchronous operation.

**Example (SpeedyMeds Context - Fetching Patient Data):**

```javascript
// Simulate fetching patient data (returns a Promise)
function fetchPatientProfile(patientId) {
  console.log(`Fetching profile for ${patientId}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        const profile = { id: patientId, name: "Alice", age: 35 };
        resolve(profile); // Resolve with the data
      } else {
        reject(new Error(`Failed to fetch profile for ${patientId}`)); // Reject with an error
      }
    }, 800); // Simulate network delay
  });
}

// Simulate fetching patient medications (returns a Promise)
function fetchPatientMedications(patientId) {
    console.log(`Fetching medications for ${patientId}...`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
          const medications = ["Lisinopril", "Metformin"];
          resolve(medications); // Resolve with the data
        } else {
          reject(new Error(`Failed to fetch medications for ${patientId}`)); // Reject with an error
        }
      }, 600); // Simulate network delay
    });
  }


// Using Promises to fetch data sequentially
fetchPatientProfile("P456")
  .then(profile => {
    console.log("Profile fetched:", profile);
    // After fetching profile, fetch medications for this patient
    return fetchPatientMedications(profile.id); // Return the new Promise
  })
  .then(medications => {
    console.log("Medications fetched:", medications);
    // Process both profile and medications here if needed (though better with async/await)
  })
  .catch(error => {
    // Handles errors from either fetchPatientProfile or fetchPatientMedications
    console.error("Promise Chain Error:", error.message);
  })
  .finally(() => {
    console.log("Finished fetching patient data (Promise chain).");
    // Hide loading spinner, etc.
  });

// Using Promise.all to fetch multiple resources concurrently
Promise.all([
  fetchPatientProfile("P789"),
  fetchPatientMedications("P789")
])
.then(([profile, medications]) => { // Destructure the array of results
  console.log("Promise.all Success - Profile:", profile);
  console.log("Promise.all Success - Medications:", medications);
})
.catch(error => {
  // Handles the first error that occurs among the promises
  console.error("Promise.all Error:", error.message);
})
.finally(() => {
    console.log("Finished fetching patient data (Promise.all).");
});
```

The first part of the example shows a sequential fetch: fetch the profile, then use the profile's ID to fetch medications. Each `.then()` returns a new Promise, allowing chaining. The `.catch()` at the end handles errors from anywhere in the chain. The second part uses `Promise.all()` to fetch the profile and medications *at the same time*. The `.then()` callback receives an array of results once *both* promises fulfill. If either fails, the `.catch()` is triggered immediately. `.finally()` runs after the promise settles, regardless of outcome.

### `async`/`await` (ES2017)

`async`/`await` is modern JavaScript syntax built on top of Promises, providing a way to write asynchronous code that looks and behaves more like synchronous code, making it significantly easier to read and maintain, especially for complex sequences of operations.

**`async` Keyword:** The `async` keyword is placed before a function declaration or expression. It signifies that the function will always return a Promise. If the function returns a non-Promise value, it will be automatically wrapped in a resolved Promise. If the function throws an error, it will be automatically wrapped in a rejected Promise.

**`await` Keyword:** The `await` keyword can *only* be used inside an `async` function. It is placed before a Promise. When `await` encounters a Promise, it pauses the execution of the `async` function until that Promise settles (fulfills or rejects).
*   If the Promise fulfills, `await` returns the resolved value, and the `async` function's execution resumes.
*   If the Promise rejects, `await` throws the rejection reason (the error) as an exception, which can then be caught using a standard `try...catch` block.

**`try...catch`:** Standard `try...catch` blocks work seamlessly with `async`/`await` to handle errors from awaited Promises. If an awaited Promise rejects, the error is thrown and caught by the nearest enclosing `catch` block.

**Example (SpeedyMeds Context - Fetching Patient Data with `async`/`await`):**

```javascript
// Assume fetchPatientProfile and fetchPatientMedications are defined as above (returning Promises)

async function loadPatientData(patientId) {
  console.log(`Loading data for ${patientId} using async/await...`);
  try {
    // Await the profile fetch. Execution pauses here until the promise settles.
    const profile = await fetchPatientProfile(patientId);
    console.log("Profile loaded:", profile);

    // Await the medications fetch. Execution pauses here.
    const medications = await fetchPatientMedications(patientId);
    console.log("Medications loaded:", medications);

    // Return a combined object (implicitly wrapped in a resolved Promise by async)
    return { profile, medications };

  } catch (error) {
    // If any awaited promise rejected, the error is caught here
    console.error("Async/await Error:", error.message);
    // Re-throw the error or return a default value/handle it
    throw error; // Re-throwing the error
  } finally {
      console.log("Finished loading patient data (async/await).");
      // Hide loading spinner, etc.
  }
}

// Call the async function and handle its returned Promise
loadPatientData("P101")
  .then(data => {
    console.log("Load successful:", data);
  })
  .catch(error => {
    console.error("Load failed:", error.message);
  });

// Example with concurrent awaits (using Promise.all within async)
async function loadAllPatientData(patientId) {
    console.log(`Loading all data concurrently for ${patientId} using async/await and Promise.all...`);
    try {
        const [profile, medications] = await Promise.all([
            fetchPatientProfile(patientId),
            fetchPatientMedications(patientId)
        ]);
        console.log("All data loaded concurrently - Profile:", profile);
        console.log("All data loaded concurrently - Medications:", medications);
        return { profile, medications };
    } catch (error) {
        console.error("Concurrent load error:", error.message);
        throw error;
    } finally {
        console.log("Finished concurrent loading (async/await and Promise.all).");
    }
}

loadAllPatientData("P112");
```

The `async function loadPatientData` demonstrates sequential asynchronous operations using `await`. The code inside the `try` block looks almost synchronous. Execution pauses at the first `await` until `fetchPatientProfile` settles, then resumes to the second `await` for `fetchPatientMedications`. If either promise rejects, execution jumps directly to the `catch` block. The `finally` block runs after `try` or `catch` completes. The second `async` function `loadAllPatientData` shows how to combine `async`/`await` with `Promise.all` for concurrent operations, still using `await` to wait for the single Promise returned by `Promise.all`.

**Comparison: Callbacks vs. Promises vs. `async`/`await`**

*   **Callbacks:** Can lead to "Callback Hell" for sequential operations, making code hard to read and error handling complex.
*   **Promises:** Provide a more structured approach with `.then()` chaining and `.catch()` for error handling, improving readability over nested callbacks.
*   **`async`/`await`:** The most modern and generally preferred approach. Makes asynchronous code look and feel synchronous, significantly improving readability and simplifying error handling with `try...catch`. It is syntactic sugar over Promises.

In modern React Native development, you will primarily use `async`/`await` when dealing with asynchronous operations like fetching data, interacting with device APIs that return Promises, or any operation that returns a Promise.

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Asynchronous)
> *   [MDN Web Docs: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
> *   [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
> *   [MDN Web Docs: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
> *   [MDN Web Docs: Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
> *   [MDN Web Docs: Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

> 🗂️ **Additional Resources:**
>
> *   [JavaScript Visualized: The Event Loop](https://dev.to/lydiahallie/javascript-visualized-the-event-loop-3dif)
> *   [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

**(URL_to_CodeSandbox_for_Exercise_5.3)**

## Section 6: ES6 Modules

As applications grow, organizing code into reusable and maintainable units becomes essential. ES6 Modules provide a standardized system for structuring JavaScript code into separate files (modules) and controlling which parts of a module are accessible from outside (exporting) and how to use functionality from other modules (importing). This modularity is fundamental to modern JavaScript development, including React Native projects, where components, utilities, and logic are typically organized into distinct module files.

### Exporting Module Members

The `export` keyword is used within a module file to make variables, functions, classes, or constants available for use in other modules.

**Named Exports:** You can export multiple members from a single module using named exports. When importing, you must use the exact same names.

```javascript
// In a file like: src/utils/pharmacyCalculations.js

export const TAX_RATE = 0.08; // Named export of a constant

export function calculateTotalWithTax(subtotal) { // Named export of a function
  return subtotal * (1 + TAX_RATE);
}

export function formatCurrency(amount) { // Another named export
  return `$${amount.toFixed(2)}`;
}

// You can also list exports at the end:
// export { TAX_RATE, calculateTotalWithTax, formatCurrency };
```

**Default Exports:** A module can have at most one default export. This is often used to export the primary functionality or a single main component from a module. When importing a default export, you can give it any name you like during the import.

```javascript
// In a file like: src/components/MedicationCard.js

const MedicationCard = ({ medication }) => {
  // ... component implementation ...
  return (
    // JSX for the medication card
    null // Placeholder
  );
};

export default MedicationCard; // Default export of the component
```

**Combining Named and Default Exports:** A module can have both named exports and a default export.

```javascript
// In a file like: src/api/pharmacyApi.js

export const API_BASE_URL = "https://api.speedymeds.com"; // Named export

export async function fetchMedications() { // Named export
  // ... fetch logic ...
  return []; // Placeholder
}

const defaultApiConfig = { timeout: 5000 }; // Internal variable

export default defaultApiConfig; // Default export
```

### Importing Module Members

The `import` keyword is used in a module file to access members that have been exported from other modules.

**Importing Named Exports:** Use curly braces `{}` with the exact names of the members you want to import.

```javascript
// In a file like: src/screens/OrderSummaryScreen.js

import { calculateTotalWithTax, formatCurrency } from '../utils/pharmacyCalculations'; // Import named exports

const orderSubtotal = 100;
const orderTotal = calculateTotalWithTax(orderSubtotal);
console.log(`Order Total: ${formatCurrency(orderTotal)}`);
```

**Importing Default Exports:** Import the default export without curly braces, giving it a local name.

```javascript
// In a file like: src/App.js

import MedicationCard from './components/MedicationCard'; // Import the default export

// Use the imported component
// <MedicationCard medication={{ name: "Aspirin" }} />
```

**Importing Both Named and Default Exports:** Import the default export first, followed by a comma and the named exports in curly braces, all from the same module path.

```javascript
// In a file like: src/services/medicationService.js

import apiConfig, { API_BASE_URL, fetchMedications } from '../api/pharmacyApi'; // Import default and named exports

console.log("API Base URL:", API_BASE_URL);
console.log("API Config:", apiConfig);

async function getAvailableMedications() {
  const meds = await fetchMedications();
  // ... further processing ...
  return meds;
}
```

**Importing All Named Exports as an Object:** Use `* as name` to import all named exports from a module into a single object.

```javascript
// In a file like: src/utils/index.js

import * as pharmacyUtils from './pharmacyCalculations'; // Import all named exports into 'pharmacyUtils' object

const price = 50;
const total = pharmacyUtils.calculateTotalWithTax(price);
console.log(`Calculated total using imported utility: ${pharmacyUtils.formatCurrency(total)}`);
```

**Side-Effect Imports:** Import a module solely for its side effects (e.g., polyfills, global configurations). The module is executed, but no specific members are imported.

```javascript
// In a file like: src/setup.js

import 'react-native-gesture-handler'; // Import for side effects (initializes gesture handler)
```

### Module Paths

Module paths can be relative or absolute.

*   **Relative Paths:** Start with `./` (current directory) or `../` (parent directory). Used for importing modules within your project.
    ```javascript
    import { myFunction } from './myFile';
    import { anotherFunction } from '../utils/anotherFile';
    ```
*   **Absolute Paths (Module Specifiers):** Used for importing modules from installed packages (like React, React Native, or other libraries). These paths typically correspond to the package name in `node_modules`.
    ```javascript
    import React from 'react';
    import { View, Text } from 'react-native';
    import { Button } from 'react-native-paper';
    ```

**Expo Specifics:** Expo projects often use Babel or swc configurations that allow for absolute imports based on a root directory (e.g., `src/`). This means you might see imports like `import { myFunction } from 'src/utils/myFile';` instead of relative paths. This is configured in the Babel/swc configuration and provides a cleaner import syntax for internal modules.

ES6 Modules are the standard for organizing JavaScript code in modern applications, including React Native. They promote code reusability, maintainability, and prevent naming conflicts by keeping variables and functions scoped to their module unless explicitly exported. Understanding how to effectively use `import` and `export` is fundamental to working with any non-trivial JavaScript or React Native codebase.

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
> *   [MDN Web Docs: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
> *   [MDN Web Docs: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

## Module Challenge 5: Mini Pharmacy Data Processor

**(URL_to_CodeSandbox_for_Challenge_5)**

Objective: Apply your JavaScript essentials knowledge to build a small data processing script related to the SpeedyMeds theme.

Task: Within the provided CodeSandbox environment, write a JavaScript script that performs the following:

1.  Define an array of medication objects. Each object should have properties like `name` (string), `stock` (number), `price` (number), and `isControlled` (boolean).
2.  Use a loop (`for...of` recommended) to iterate through the medication array and log the name of each medication.
3.  Use the `.filter()` method to create a new array containing only medications with `stock` less than a certain threshold (e.g., 20). Log this new array.
4.  Use the `.map()` method to create a new array of strings, where each string is formatted as "Medication: [Name] - Value: $[Stock * Price]". Log this new array.
5.  Use the `.reduce()` method to calculate the total value of all non-controlled substances in the inventory. Log the total value.
6.  Define an `async` function `checkInventoryStatus` that simulates an asynchronous check (e.g., using `setTimeout`). This function should take a medication name as input and return a Promise that resolves with a status string ("In Stock", "Low Stock", "Out of Stock") based on a simulated lookup.
7.  Inside the `async function`, use `await` to call the simulated check for a few medications and log their statuses. Use a `try...catch` block to handle potential errors from the awaited Promise.

Follow the instructions in the README.md file in the sandbox.

## Module Summary

In this module, you have reinforced or learned the essential JavaScript concepts required for React Native development. We covered variable declaration with `let` and `const`, explored primitive and object data types, and practiced using various operators for data manipulation and evaluation. You learned about control flow with conditional statements and loops, and gained a solid understanding of functions, including modern arrow functions and the crucial concept of closures. We also delved into asynchronous JavaScript, demystifying the Event Loop and mastering the use of Promises and the `async`/`await` syntax for handling operations that take time. Finally, you learned how to organize your code effectively using ES6 Modules with `import` and `export`.

With this strong foundation in modern JavaScript, you are well-equipped to move on to the next modules, where we will build upon these concepts to explore TypeScript, React, and the specifics of React Native development.

## Further Resources

> 📚 **Official Documentation:**
>
> *   [MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
> *   [ECMAScript 2015 (ES6) and beyond](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support)
>
> 🗂️ **Additional Resources:**
>
> *   [JavaScript.info](https://javascript.info/): A comprehensive, modern JavaScript tutorial.
> *   [You Don't Know JS Yet (Book Series)](https://github.com/getify/You-Don't-Know-JS): Deep dives into core JavaScript concepts.