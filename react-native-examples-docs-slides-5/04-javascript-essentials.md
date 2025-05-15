---
marp: true
headingDivider: 6
paginate: true
---

# **JavaScript Essentials (ES6+)**
**Variables, Types, Operators, & Control Flow**

![height:400px](./assets/images/partial-react-logo.png)

## **Overall Goal:**
Establish a strong foundation in modern JavaScript (ES6+) essential for effective React Native development.

## **Learning Path Guidance:**

This module is foundational. Instructor-led paths will cover it thoroughly. Self-led learners should ensure full comprehension. Asynchronous learners can use it as a reference for specific JS features. Developers already proficient in modern JS can skim for review, paying attention to the callouts comparing JS to other platforms.

> ⚠️ Callouts will guide learners based on path and background.

## **1.1 Variables & Scope**

### **Objective:**
Understand how variables are declared, their scope rules (var, let, const), and the implications of hoisting and the Temporal Dead Zone (TDZ).

#### **1.1.1 Introduction to Variables**

In JavaScript, variables serve as symbolic names for values used within an application. They allow developers to store and manipulate data, such as user input, calculation results, or references to application state. Before a variable can be used, it generally needs to be declared. While older JavaScript versions sometimes allowed assignment to undeclared variables (implicitly creating global variables), modern JavaScript, especially in strict mode (which is automatically enabled in modules), requires variables to be declared before use. This practice enhances code clarity and helps prevent accidental global variable creation.

JavaScript provides three keywords for declaring variables: var, let, and const. Understanding the differences between these keywords, particularly regarding their scope and hoisting behavior, is fundamental to writing correct and maintainable JavaScript code.

#### **1.1.2 The var Keyword (Legacy)**

The var keyword was the original way to declare variables in JavaScript. While still functional, its behavior has certain nuances that led to the introduction of let and const in modern JavaScript (ES6).

##### **Scope:**
Variables declared with var have either function scope or global scope.

*   If var is used inside a function, the variable is local to that function and accessible anywhere within it.

*   If var is used outside any function (at the top level of a script), the variable has global scope. In browsers, this also means it becomes a property of the global window object (globalThis in general).

*   Crucially, var is not block-scoped. If a var variable is declared inside a block like an if statement or a for loop, it is not confined to that block. Instead, it belongs to the surrounding function or global scope. This lack of block scope often led to bugs where variables "leaked" out of loops or conditional blocks, causing unexpected behavior.

##### **Hoisting:**
var declarations are hoisted. During the compilation phase, the JavaScript engine moves the declaration (but not the initialization) of var variables to the top of their scope (function or global). This means you can technically refer to a var variable before its declaration line in the code. However, because only the declaration is hoisted, the variable's value will be undefined until the line where it is actually assigned a value is executed. To improve clarity, it's considered best practice to declare all var variables at the top of their function scope.

##### **Redeclaration & Reassignment:**
var allows a variable to be redeclared within the same scope without causing an error, and its value can be reassigned freely.

```javascript
/**
 * Demonstrates the behavior of 'var'.
 * Note: 'var' is generally discouraged in modern JavaScript.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
 */
function demonstrateVar() {
  console.log(patientId); // Output: undefined (due to hoisting)
  var patientId = "P12345";
  console.log(patientId); // Output: P12345

  if (patientId === "P12345") {
    var diagnosis = "Common Cold"; // Declared inside block
    console.log(diagnosis); // Output: Common Cold
  }

  // 'diagnosis' is accessible here because 'var' is function-scoped, not block-scoped.
  console.log(diagnosis); // Output: Common Cold

  var patientId = "P67890"; // Redeclaration is allowed
  console.log(patientId); // Output: P67890
}

demonstrateVar();

// Example of global 'var'
console.log(globalVarMessage); // Output: undefined (hoisted to global scope)
var globalVarMessage = "This is global";
console.log(globalVarMessage); // Output: This is global
console.log(window.globalVarMessage); // Output: This is global (in browsers)
```

#### **1.1.3 The let Keyword**

Introduced in ES6, let is the modern standard for declaring variables whose values might need to be reassigned later. It addresses the scoping limitations of var.

##### **Scope:**
let variables have block scope. They are only accessible within the block of code (defined by curly braces {}) where they are declared. This includes if statements, for loops, while loops, switch cases (if enclosed in blocks), and standalone blocks. This confinement prevents variables from leaking into outer scopes, making code more predictable compared to var.

##### **Hoisting and Temporal Dead Zone (TDZ):**
Like var, let declarations are hoisted to the top of their block scope. However, unlike var, they are not initialized during hoisting. There is a period between the start of the block and the actual declaration statement called the Temporal Dead Zone (TDZ). Attempting to access a let variable within its TDZ (before the line let variableName =...; is executed) results in a ReferenceError. This TDZ enforces that variables are declared before they are used, preventing errors related to accessing uninitialized variables.

##### **Redeclaration & Reassignment:**
let allows a variable's value to be reassigned, but it does not allow the variable to be redeclared within the same scope. Attempting to redeclare a let variable (e.g., let x = 10; let x = 20;) will cause a SyntaxError.

##### **Global Object:**
Unlike var, declaring a variable with let at the top level of a script does not create a property on the global object (window or globalThis).

```javascript
/**
 * Demonstrates the behavior of 'let'.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */
function demonstrateLet() {
  // console.log(orderStatus); // ReferenceError: Cannot access 'orderStatus' before initialization (TDZ)
  let orderStatus = "Pending";
  console.log(orderStatus); // Output: Pending

  if (orderStatus === "Pending") {
    let confirmationCode = "C987"; // Block-scoped
    console.log(confirmationCode); // Output: C987
    orderStatus = "Confirmed"; // Reassignment is allowed
  }

  // console.log(confirmationCode); // ReferenceError: confirmationCode is not defined (outside its block scope)
  console.log(orderStatus); // Output: Confirmed

  // let orderStatus = "Shipped"; // SyntaxError: Identifier 'orderStatus' has already been declared
}

demonstrateLet();

let globalLetMessage = "This is also global";
console.log(globalLetMessage); // Output: This is also global
// console.log(window.globalLetMessage); // Output: undefined (in browsers)
```

#### **1.1.4 The const Keyword**

Also introduced in ES6, const is used to declare variables whose values are intended to remain constant after initialization; they cannot be reassigned. It is generally preferred over let when you know the variable's assignment should not change.

##### **Scope:**
const variables have block scope, identical to let.

##### **Hoisting and Temporal Dead Zone (TDZ):**
const declarations are hoisted but not initialized, and they are subject to the same TDZ rules as let. Accessing a const variable before its declaration results in a ReferenceError.

##### **Initialization:**
const variables must be initialized with a value at the time of declaration. Omitting the initializer will result in a SyntaxError.

##### **Reassignment vs. Mutation:**
const prevents reassignment of the variable itself. It does not make the value immutable. If a const variable holds an object or an array, the properties of that object or the elements of that array can still be modified (mutated). However, you cannot assign a completely new object or array to the variable.

##### **Redeclaration:**
Like let, const variables cannot be redeclared within the same scope.

##### **Global Object:**
Similar to let, top-level const declarations do not create properties on the global object.

```javascript
/**
 * Demonstrates the behavior of 'const'.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */
function demonstrateConst() {
  // console.log(API_ENDPOINT); // ReferenceError: Cannot access 'API_ENDPOINT' before initialization (TDZ)
  const API_ENDPOINT = "https://api.speedymeds.com/v1";
  console.log(API_ENDPOINT); // Output: https://api.speedymeds.com/v1

  // API_ENDPOINT = "https://api.speedymeds.com/v2"; // TypeError: Assignment to constant variable.

  const patientRecord = {
    id: "P7788",
    name: "Jane Doe",
    conditions: ["Hypertension"],
  };
  console.log(patientRecord.name); // Output: Jane Doe

  // Mutation is allowed for objects declared with const
  patientRecord.name = "Jane Smith";
  patientRecord.conditions.push("Asthma");
  console.log(patientRecord); // Output: { id: 'P7788', name: 'Jane Smith', conditions: [ 'Hypertension', 'Asthma' ] }

  // Reassignment is NOT allowed
  // patientRecord = { id: "P9900", name: "John Smith" }; // TypeError: Assignment to constant variable.

  if (true) {
    const MAX_REFILLS = 5; // Block-scoped
    console.log(MAX_REFILLS); // Output: 5
  }
  // console.log(MAX_REFILLS); // ReferenceError: MAX_REFILLS is not defined
}

demonstrateConst();

const MAX_LOGIN_ATTEMPTS = 3;
console.log(MAX_LOGIN_ATTEMPTS); // Output: 3
// console.log(window.MAX_LOGIN_ATTEMPTS); // Output: undefined (in browsers)
```

#### **1.1.5 Scope Explained**

Scope determines the accessibility (visibility) of variables. JavaScript has global scope, function scope, and block scope.

##### **Global Scope:**
Variables declared outside any function or block have global scope. In non-module scripts, var creates global variables that are properties of the global object (window or globalThis), while let and const create global variables that are not properties of the global object. Global variables are accessible from anywhere in your code, which can lead to naming conflicts and unintended modifications, so minimizing their use is generally recommended.

##### **Function Scope:**
Variables declared with var inside a function are scoped to that entire function, regardless of any blocks within it. Variables declared with let or const inside a function are also local to that function but are further restricted by block scope if declared within inner blocks.

##### **Block Scope:**
Introduced with let and const, block scope confines a variable's accessibility to the specific block ({...}) in which it is declared. This is the most granular scope and helps prevent variable leakage and naming collisions.

The introduction of let and const with block scope was a significant improvement, addressing common pitfalls associated with var's function scoping and hoisting behavior, making JavaScript code safer and more predictable. Block scoping aligns JavaScript more closely with scoping rules in languages like Java and Kotlin, potentially easing the transition for developers from those backgrounds.

![Diagram illustrating different scopes.](https://mermaid.ink/img/pako:eNp1kMFOwzAMhl_F5Q4o0gJt0iYkFNCu1FXTw6Z7aenBgReCYuxINummSf59DYSESl1KLSfP85y8ke3HETKZI1BwXTcVmRTrsuCpIMRssEJKBMoGcSm3N8AOsjaU5KxQmIpWuebyZ7ZhypDPTw1H16tCsd2GPLI9W2aq3BnydaOQ5c0uITP_ewprRtfMbQKQJ2SZIYm0hvCjowQ3Sr3qKV-YKfdomdVOChRGd3wU1vm3znNV5gVevOZXK3yxMUWBLuOmp7zl0PUa5k6GuQvdUxYyrznqa_bklt3se9Lzp7_EnvnEdd-fnnc5M6gt92QPoNt4Z5ft7kwfREYWqDUrUJ_IvK32R8I4t7Wk4SettFsOSR_3TfNe-bhsVSuWbW2t69QdgjlwbEqZ5FLRu4f2c8i65JzeBdP7oEHaKLnFHg90wf_p5n-WTZMgnns32QXfZMkbMcNk9hANdBc80AX_ogMHKlQVK3M7L8fGJYV2TFKgdpkztU0hFWfLY7WRS3tXQI2q0QEl62ID9jlwbVHdXvKH0s4Pq67VHRPfpKx6iYVAj_ACNAjDkRf7_jiKJuPA86LQgQPQKBz54fh-GseTMI79aXR24Fdr4I0mceRAoZqkXQD70FAlshYG6MR3APPSSLW4DH_7Dzi_AhJMQtY)

#### **1.1.6 Hoisting and the Temporal Dead Zone (TDZ)**

Hoisting is a JavaScript mechanism where variable and function declarations are conceptually moved to the top of their containing scope (global, function, or block) during compilation, before the code is executed.

##### **var:**
Declarations are hoisted and initialized with undefined. This allows accessing the variable before its declaration line, yielding undefined.

##### **let and const:**
Declarations are hoisted but not initialized. They enter the Temporal Dead Zone.

##### **Function Declarations:**
Both the name and the function body are hoisted, allowing calls before the definition.

##### **Function Expressions / Arrow Functions:**
Only the variable declaration (if using var/let/const) is hoisted, not the function assignment itself.

The Temporal Dead Zone (TDZ) applies specifically to let and const variables. It's the period from the start of the variable's scope until the line where it is declared and initialized. Attempting to access the variable within the TDZ results in a ReferenceError. The TDZ prevents the use of variables before they are properly initialized, a common source of errors with var where accessing before assignment yields undefined. This makes let and const behavior more predictable and helps catch errors early.

```javascript
/**
 * Demonstrates hoisting and the Temporal Dead Zone (TDZ).
 */
function hoistingAndTDZ() {
  // 'var' hoisting
  console.log(hoistedVar); // Output: undefined
  var hoistedVar = "Declared with var";

  // Function declaration hoisting
  hoistedFunction(); // Output: Function declared!

  function hoistedFunction() {
    console.log("Function declared!");
  }

  // 'let' and TDZ
  // console.log(letVar); // ReferenceError: Cannot access 'letVar' before initialization
  let letVar = "Declared with let";
  console.log(letVar); // Output: Declared with let

  // 'const' and TDZ
  // console.log(constVar); // ReferenceError: Cannot access 'constVar' before initialization
  const constVar = "Declared with const";
  console.log(constVar); // Output: Declared with const
}

hoistingAndTDZ();
```

#### **1.1.7 Variable Declaration Summary & Best Practices**

######
<style scoped>
table {
  font-size: 18px;
}
</style>

| Feature                   | var                   | let                       | const                     |
| :------------------------ | :-------------------- | :------------------------ | :------------------------ |
| Scope                     | Function / Global     | Block {}                  | Block {}                  |
| Hoisting                  | Declaration & undefined | Declaration only (TDZ)    | Declaration only (TDZ)    |
| Temporal Dead Zone        | No                    | Yes                       | Yes                       |
| Redeclaration (same scope) | Allowed               | Not Allowed               | Not Allowed               |
| Reassignment              | Allowed               | Allowed                   | Not Allowed               |
| Must Initialize?          | No                    | No                        | Yes                       |
| Global Object Prop?       | Yes (non-module)      | No                        | No                        |

##### **Best Practices:**

*   **Prefer const by default:** Use const for all variables unless you know you will need to reassign them later. This signals intent and prevents accidental reassignment.

*   **Use let for variables that need reassignment:** Examples include loop counters or variables holding values that change based on application state.

*   **Avoid var:** In modern JavaScript development (ES6+), there is rarely a need to use var. let and const offer superior scoping rules and help prevent common errors.

*   **Declare variables close to where they are used:** While hoisting exists, declaring variables at the top of their scope (block scope for let/const) improves readability.

*   **Understand the TDZ:** Be aware that let and const variables cannot be accessed before their declaration line within their scope.

> 📲 **Comparative Callout: Native Developers (Java/Kotlin)**
> *   **Scope:** let/const block scope ({}) is very similar to variable scope within methods, loops, or conditional blocks in Java and Kotlin. This should feel familiar. However, JavaScript's var (which you should generally avoid) has function scope, which is different and can be surprising.
> *   **Hoisting/TDZ:** Java and Kotlin do not have hoisting or a TDZ for local variables. You must declare and initialize a local variable before its first use. Attempting to use an uninitialized local variable results in a compile-time error, unlike JavaScript's var (runtime undefined) or let/const (runtime ReferenceError in TDZ).
> *   **Mutability:** Java variables are mutable unless marked final. Kotlin uses val for read-only (like const reassignment) and var for mutable (like let). Remember JS const only prevents reassignment, not mutation of object/array contents.

> 📝 **Exercise (CodeSandbox):** Predict the output of code snippets involving var, let, and const in different scopes (global, function, block) and demonstrate hoisting/TDZ effects. (Estimated time: 15-20 minutes)

> 🧗 **Challenge (CodeSandbox):** Refactor a provided JavaScript function that uses only var to use let and const appropriately. Add comments explaining why each choice (let or const) was made based on reassignment needs and scope. Ensure the refactored code behaves correctly and avoids TDZ errors. (Estimated time: 30-40 minutes)

##### **Further Reading:**

*   [MDN: var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
*   [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
*   [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
*   [MDN: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
*   [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
*   [MDN: Temporal Dead Zone (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
## **1.2 Data Types**

### **Objective:**
Differentiate between primitive and object types in JavaScript, understand primitive immutability, and recognize primitive wrapper objects.

#### **1.2.1 Overview: Primitives vs. Objects**

JavaScript defines two fundamental categories of data types: primitive types and objects. Understanding this distinction is crucial because they behave differently, especially concerning mutability and how they are passed around in your code.

*   **Primitive Types:** These are the most basic data types. They represent single, immutable values. JavaScript has seven primitive types.

*   **Objects:** Objects represent more complex data structures. They are collections of properties (key-value pairs) and are mutable. Arrays and Functions are also types of objects in JavaScript.

#### **1.2.2 Primitive Types**

Primitives are the fundamental building blocks for data in JavaScript. They are immutable, meaning their actual value cannot be changed once created.

##### **string:**
*   Represents sequences of characters, used for textual data. Strings are encoded using UTF-16.
*   Declared using single quotes ('...'), double quotes ("..."), or backticks (`...` - template literals).
*   Immutable: Methods like toUpperCase() or substring() do not modify the original string; they return a new string.
*   Example: `const medicationName = "Lisinopril";`

##### **number:**
*   Represents numeric values. JavaScript uses the double-precision 64-bit floating-point format (IEEE 754) for all numbers. There's no distinct integer type like in some other languages.
*   Includes special values: Infinity, -Infinity, and NaN (Not-a-Number). NaN often results from invalid mathematical operations (e.g., 0/0).
*   Immutable.
*   Example: `const dosage = 10; const temperature = 98.6;`

##### **bigint:**
*   Represents whole numbers larger than the maximum safe integer limit of the number type (Number.MAX_SAFE_INTEGER).
*   Created by appending n to an integer literal (e.g., `12345678901234567890n`) or using the `BigInt()` function.
*   Immutable.
*   Example: `const veryLargeId = 9007199254740991n;`

##### **boolean:**
*   Represents logical values: true or false.
*   Used extensively in conditional logic.
*   Immutable.
*   Example: `const isPrescriptionActive = true;`

##### **undefined:**
*   Represents the unintentional absence of a value. It's the default value of variables declared but not initialized, function parameters not provided, or non-existent object properties.
*   It is a type with only one value: undefined.
*   Immutable.
*   Example: `let patientNotes; console.log(patientNotes); // Output: undefined`

##### **symbol:**
*   Represents unique, anonymous identifiers.
*   Often used as keys for object properties to avoid naming collisions, especially when adding properties to objects from external sources or for internal metadata.
*   Created using the `Symbol()` function: `const uniqueId = Symbol("patientId");`.
*   Immutable.

##### **null:**
*   Represents the intentional absence of any object value.
*   It is a type with only one value: null.
*   Often assigned explicitly by developers to indicate "no value" or "empty".
*   Historical quirk: `typeof null` returns "object", though it is a primitive.
*   Immutable.
*   Example: `let selectedDoctor = null;`

#### **1.2.3 Immutability of Primitives**

A core characteristic of primitive types is their immutability. This means that once a primitive value (like the number 42 or the string "hello") is created, it cannot be internally changed.

Consider this:

```javascript
/**
 * Demonstrates primitive immutability.
 * @param {string} message - An initial message string.
 * @returns {void}
 */
function testImmutability(message) {
  /** @type {string} */
  let localMessage = message; // 'localMessage' now holds the same primitive value as 'message'

  // Attempting to "modify" the string
  localMessage.toUpperCase(); // This creates a NEW string "HELLO", but doesn't change localMessage
  console.log(localMessage); // Output: "hello" (original value unchanged)

  // Reassigning the variable
  localMessage = localMessage.toUpperCase(); // Assigns the NEW string to localMessage
  console.log(localMessage); // Output: "HELLO"
}

testImmutability("hello");
```

Operations that appear to modify primitives (like string methods) actually return new primitive values. The original value remains untouched in memory. Variables holding primitives can be reassigned to point to different primitive values, but the values themselves don't change.

This contrasts sharply with objects, which are mutable. Properties of an object can be changed after the object is created.

```javascript
/**
 * Demonstrates object mutability.
 * @returns {void}
 */
function testMutability() {
  /** @type {{ name: string, dosage: number }} */
  const medication = { name: "Atorvastatin", dosage: 20 };
  console.log(medication.dosage); // Output: 20

  // Modify a property of the object
  medication.dosage = 40; // The object itself is mutated
  console.log(medication.dosage); // Output: 40 (The original object has changed)
}

testMutability();
```

This difference is fundamental to understanding how data behaves when passed to functions or assigned to variables in JavaScript. Passing a primitive copies the value; passing an object copies the reference, meaning modifications inside a function can affect the original object.

#### **1.2.4 Objects (Non-Primitive Type)**

Objects are the only mutable type in JavaScript. They represent collections of key-value pairs, where keys are typically strings (or Symbols) and values can be any data type, including other objects, arrays, or functions.

```javascript
/**
 * Example of a JavaScript object representing a medication.
 * @type {{id: string, name: string, form: string, requiresRefrigeration: boolean, availableStrengths: number}}
 */
const medicationDetails = {
  id: "MED001",
  name: "Amoxicillin",
  form: "Capsule",
  requiresRefrigeration: false,
  availableStrengths: [], // Value is an array (which is also an object)
  getDescription: function() { // Value is a function (method)
    return `${this.name} (${this.form})`;
  }
};

console.log(medicationDetails.name); // Output: Amoxicillin
medicationDetails.requiresRefrigeration = true; // Mutating the object
console.log(medicationDetails.getDescription()); // Output: Amoxicillin (Capsule)
```

Objects are essential for modeling complex entities and data structures in applications.

#### **1.2.5 Primitive Wrapper Objects**

JavaScript provides built-in "wrapper" objects corresponding to most primitive types: String, Number, BigInt, Boolean, and Symbol. null and undefined do not have corresponding wrapper objects.

These wrappers provide methods for working with primitive values (e.g., `string.toUpperCase()`, `number.toFixed()`). Although primitives themselves don't have methods, JavaScript employs a mechanism called auto-boxing. When you try to access a property or method on a primitive value, JavaScript temporarily creates an instance of the corresponding wrapper object behind the scenes, performs the operation on that wrapper object, and then discards the wrapper.

```javascript
/** @type {string} */
const drugName = "warfarin";

// Accessing a property (.length) - Auto-boxing occurs
console.log(drugName.length); // Output: 8

// Calling a method (.toUpperCase()) - Auto-boxing occurs
console.log(drugName.toUpperCase()); // Output: WARFARIN

// The original primitive remains unchanged
console.log(drugName); // Output: warfarin
```

This auto-boxing makes working with primitives more convenient, allowing them to seemingly have methods without actually being objects. Understanding this mechanism clarifies why you can call methods on primitives but cannot, for instance, add custom properties directly to them that persist.

> 📲 **Comparative Callout: null vs. undefined**
> Developers coming from languages with a single null concept might find JavaScript's null and undefined confusing.
> *   **undefined:** Typically means a variable has been declared but not yet assigned a value, or an object property or array element doesn't exist. It often represents an unintentional absence of value.
> *   **null:** Represents the intentional absence of any object value. It's often assigned explicitly by developers to indicate that a variable should hold no object.
> While `null == undefined` is true (due to loose equality coercion), `null === undefined` is false. It's important to understand this distinction for accurate checks and debugging.

> 📲 **Comparative Callout: Native Developers**
> *   **Java:** JS has fewer primitive numeric types (number, bigint) compared to Java's specific types (byte, short, int, long, float, double). JS string is primitive and immutable, similar to Java String (though Java String is technically an object). JS boolean matches Java boolean. JS undefined and symbol have no direct Java equivalents. JS null is similar to Java null.
> *   **Kotlin:** Kotlin treats all types as objects, unlike JS's primitive/object split, though Kotlin optimizes basic types to JVM primitives. Basic types like Int, Double, Boolean, String correspond well to their JS counterparts. Kotlin uses nullable types (Type?) for handling absence of value, contrasting with JS null and undefined.
> *   **Swift:** Swift's basic types (Int, Double, Bool, String) are value types (structs), not primitives. They are copied on assignment/pass, similar conceptually to how primitives behave regarding immutability, but different from JS objects (reference types). Swift uses nil (similar to null) within its optional type system (Type?) to handle absence of value, contrasting with JS null and undefined.

> 📝 **Exercise (Microsoft Forms):** Quiz: Identify the data type (typeof result and conceptual type) of various JavaScript values (e.g., "hello", 5, true, null, undefined, {}, ``, Symbol(), 10n). (Estimated time: 10-15 minutes)

> 🧗 **Challenge (CodeSandbox):** Create a function `processPatient(patient)` that takes a patient object (which might have missing properties). Inside the function, demonstrate accessing properties, checking for undefined vs. null for optional fields (like middleName), and show the difference between reassigning a primitive variable holding the patient's age versus mutating a property within the patient object itself. Add JSDoc comments. (Estimated time: 30-40 minutes)

##### **Further Reading:**

*   [MDN: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
*   [MDN: Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
*   [MDN: null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)
*   [MDN: undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
## **1.3 Operators**

### **Objective:**
Understand and use common JavaScript operators for arithmetic, comparison, logic, and conditional evaluation.

Operators are special symbols or keywords used to perform operations on values (operands). JavaScript provides a rich set of operators.

#### **1.3.1 Assignment Operators**

Assignment operators assign a value to a variable. The most basic is the simple assignment operator (=).

```javascript
/** @type {number} */
let remainingStock = 100; // Assigns 100 to remainingStock
```

JavaScript also offers compound assignment operators as shorthand for combining an operation with assignment:

*   `+=` (Addition assignment): `x += 5` is `x = x + 5`
*   `-=` (Subtraction assignment): `x -= 10` is `x = x - 10`
*   `*=` (Multiplication assignment): `x *= 2` is `x = x * 2`
*   `/=` (Division assignment): `x /= 4` is `x = x / 4`
*   `%=` (Remainder assignment): `x %= 3` is `x = x % 3`
*   `**=` (Exponentiation assignment): `x **= 2` is `x = x ** 2`
*   (And others for bitwise and logical operations)

```javascript
/**
 * Updates the stock count after dispensing medication.
 * @param {number} dispensedQuantity - The quantity of medication dispensed.
 * @returns {number} The updated remaining stock.
 */
function updateStock(dispensedQuantity) {
  /** @type {number} */
  let currentStock = 50; // Initial stock
  currentStock -= dispensedQuantity; // Use subtraction assignment
  console.log(`Updated stock: ${currentStock}`);
  return currentStock;
}
updateStock(15); // Output: Updated stock: 35
```

#### **1.3.2 Arithmetic Operators**

These operators perform standard mathematical calculations on numerical operands.

*   `+` (Addition)
*   `-` (Subtraction)
*   `*` (Multiplication)
*   `/` (Division) - Note: Division by zero results in Infinity.
*   `%` (Remainder / Modulo)
*   `**` (Exponentiation - ES2016)
*   `++` (Increment) - Increases value by 1 (prefix `++x` or postfix `x++`)
*   `--` (Decrement) - Decreases value by 1 (prefix `--x` or postfix `x--`)
*   Unary `+` (Attempts to convert operand to number)
*   Unary `-` (Negates the operand)

```javascript
/**
 * Calculates the total cost including tax.
 * @param {number} price - The base price.
 * @param {number} quantity - The number of items.
 * @returns {number} The total cost.
 */
function calculateTotalCost(price, quantity) {
  const TAX_RATE = 0.08; // 8% tax
  /** @type {number} */
  const subTotal = price * quantity;
  /** @type {number} */
  const taxAmount = subTotal * TAX_RATE;
  /** @type {number} */
  const total = subTotal + taxAmount;
  return total;
}

console.log(calculateTotalCost(10, 3)); // Output: 32.4

/** @type {number} */
let refillCount = 2;
refillCount++; // Increment refill count
console.log(refillCount); // Output: 3
```

#### **1.3.3 Comparison Operators**

Comparison operators compare two operands and return a boolean value (true or false).

##### **Relational:**
*   `>` (Greater than)
*   `<` (Less than)
*   `>=` (Greater than or equal to)
*   `<=` (Less than or equal to)

##### **Equality:**
This is where JavaScript requires careful attention due to type coercion.

*   **Loose Equality (`==`):** Checks if operands are equal after attempting to convert them to a common type. This coercion can lead to non-intuitive results (e.g., `0 == false` is true, `"10" == 10` is true, `null == undefined` is true).
*   **Loose Inequality (`!=`):** Checks if operands are not equal, also performing type coercion.
*   **Strict Equality (`===`):** Checks if operands are equal without performing type coercion. Both value and type must be the same. This is the recommended equality operator in most cases as it's more predictable.
*   **Strict Inequality (`!==`):** Checks if operands are not equal, without type coercion.

##### **Handling NaN, +0, and -0:**
*   `NaN` is not equal to anything, including itself, using either `==` or `===` (`NaN == NaN` and `NaN === NaN` are both false). Use `Number.isNaN()` to check for `NaN`.
*   `+0` and `-0` are considered equal by both `==` and `===` (`+0 == -0` and `+0 === -0` are both true). (`Object.is(+0, -0)` is false).

The existence of both loose and strict equality is a common source of bugs. Implicit type coercion (`==`) can hide type-related issues. Using strict equality (`===`) makes comparisons explicit and safer.

```javascript
/**
 * Checks if a patient is eligible for a specific pediatric trial.
 * @param {number} age - The patient's age.
 * @param {boolean} hasConsent - Whether parental consent is given.
 * @returns {boolean} True if eligible, false otherwise.
 */
function isEligibleForPediatricTrial(age, hasConsent) {
  // Using strict equality (===) is recommended
  return age < 18 && age >= 5 && hasConsent === true;
}

console.log(isEligibleForPediatricTrial(10, true)); // Output: true
console.log(isEligibleForPediatricTrial(4, true)); // Output: false
console.log(isEligibleForPediatricTrial(10, false)); // Output: false

// Demonstrating loose vs. strict equality
console.log(10 == "10");   // Output: true (loose equality with type coercion)
console.log(10 === "10");  // Output: false (strict equality, types differ)
console.log(0 == false);   // Output: true (loose equality with type coercion)
console.log(0 === false);  // Output: false (strict equality, types differ)
console.log(null == undefined); // Output: true (special case for loose equality)
console.log(null === undefined); // Output: false (strict equality, types differ)
```

######
<style scoped>
table {
  font-size: 18px;
}
</style>

| Expression        | `==` Result | `===` Result | Explanation                                   |
| :---------------- | :---------- | :----------- | :-------------------------------------------- |
| `5 == "5"`        | `true`      | `false`      | `==` coerces string "5" to number 5.          |
| `0 == false`      | `true`      | `false`      | `==` coerces boolean false to number 0.       |
| `null == undefined` | `true`      | `false`      | `==` treats null and undefined as equal.      |
| `NaN == NaN`      | `false`     | `false`      | `NaN` is not equal to anything, including itself. |
| `+0 == -0`        | `true`      | `true`       | Both operators consider +0 and -0 equal.      |
| `"" == false`     | `true`      | `false`      | Complex coercion: `""` -> `""` -> `0`.        |
| `{}` == `{}`      | `false`     | `false`      | Objects are compared by reference, not value. |

#### **1.3.4 Logical Operators**

Logical operators are typically used with boolean values, but they can return non-boolean values based on their operands' "truthiness" or "falsiness".

*   `&&` (Logical AND): Returns the first falsy operand it encounters, or the last operand if all are truthy. It uses short-circuit evaluation: if the first operand is falsy, the second operand is not evaluated.
*   `||` (Logical OR): Returns the first truthy operand it encounters, or the last operand if all are falsy. It also uses short-circuit evaluation: if the first operand is truthy, the second operand is not evaluated.
*   `!` (Logical NOT): Inverts the boolean value of its operand. Converts the operand to boolean if necessary, then negates it.

##### **Truthy and Falsy Values:**

In JavaScript, values are considered "truthy" or "falsy" in boolean contexts.

*   **Falsy values:** `false`, `0`, `-0`, `""` (empty string), `null`, `undefined`, `NaN`, `0n` (BigInt zero).
*   **Truthy values:** Everything else, including non-empty strings, numbers other than 0, objects (`{}`), arrays (`[]`), `true`.

Logical operators `&&` and `||` are often used for conditional execution or providing default values due to their short-circuiting behavior and the fact they return operand values.

```javascript
/**
 * Determines if a prescription refill request can be processed.
 * @param {boolean} isActive - Is the prescription currently active?
 * @param {number} remainingRefills - Number of refills left.
 * @returns {boolean} True if the refill can be processed, false otherwise.
 */
function canRefill(isActive, remainingRefills) {
  // Refill possible only if active AND has remaining refills
  return isActive && remainingRefills > 0;
}

console.log(canRefill(true, 3));  // Output: true
console.log(canRefill(true, 0));  // Output: false
console.log(canRefill(false, 3)); // Output: false

/**
 * Gets the patient's preferred pharmacy, defaulting to a main branch.
 * @param {string | null | undefined} preferredPharmacy - The patient's preference.
 * @returns {string} The pharmacy name to use.
 */
function getPharmacy(preferredPharmacy) {
  // Use || to provide a default value if preferredPharmacy is falsy (null, undefined, "")
  return preferredPharmacy || "SpeedyMeds Main Branch";
}

console.log(getPharmacy("SpeedyMeds Downtown")); // Output: SpeedyMeds Downtown
console.log(getPharmacy(null));          // Output: SpeedyMeds Main Branch
console.log(getPharmacy(undefined));     // Output: SpeedyMeds Main Branch
console.log(getPharmacy(""));            // Output: SpeedyMeds Main Branch

/** @type {boolean} */
const hasAllergies = false;
console.log(!hasAllergies); // Output: true
```

#### **1.3.5 Conditional (Ternary) Operator**

The ternary operator is a concise way to write simple if...else statements.

Syntax: `condition ? valueIfTrue : valueIfFalse`

*   If `condition` evaluates to truthy, the expression evaluates to `valueIfTrue`.
*   If `condition` evaluates to falsy, the expression evaluates to `valueIfFalse`.

It handles falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`) in the condition by executing the `valueIfFalse` part.

While it can be chained (`condition1 ? val1 : condition2 ? val2 : val3`), this often hurts readability compared to if...else if...else structures. It's best used for simple conditional assignments.

```javascript
/**
 * Assigns a risk category based on patient age.
 * @param {number} age - The patient's age.
 * @returns {string} The risk category ('Pediatric', 'Adult', 'Geriatric').
 */
function getRiskCategory(age) {
  /** @type {string} */
  const category = age < 18 ? "Pediatric" : age >= 65 ? "Geriatric" : "Adult";
  return category;
}

console.log(getRiskCategory(12)); // Output: Pediatric
console.log(getRiskCategory(45)); // Output: Adult
console.log(getRiskCategory(70)); // Output: Geriatric
```

#### **1.3.6 Operator Precedence**

Operators have a predefined order of execution, known as precedence. For example, multiplication (`*`) has higher precedence than addition (`+`). Parentheses `()` can be used to override the default precedence and force an expression to be evaluated first. Consult the MDN Operator Precedence table for the complete order.

```javascript
/** @type {number} */
const cost = 5 + 2 * 10; // Multiplication happens first: 5 + 20
console.log(cost); // Output: 25

/** @type {number} */
const groupedCost = (5 + 2) * 10; // Addition happens first due to parentheses: 7 * 10
console.log(groupedCost); // Output: 70
```

> 📲 **Comparative Callout: Native Developers (Java/Kotlin/Swift)**
> *   Most arithmetic, relational, and logical operators (`+`, `-`, `*`, `/`, `%`, `>`, `<`, `&&`, `||`, `!`) behave very similarly to their counterparts in Java, Kotlin, and Swift.
> *   The key difference lies in equality comparison. JavaScript's loose equality (`==`) with its type coercion is unique and often problematic. Java, Kotlin, and Swift's primary equality checks (`equals()`/`==` in Java/Kotlin, `==` in Swift for equatable types) behave more like JavaScript's strict equality (`===`), comparing both value and type (or identity for reference types).
> *   The ternary operator (`condition ? value1 : value2`) exists with similar syntax and function in Java, Kotlin, and Swift.

> 📝 **Exercise (Microsoft Forms):** Evaluate the results of various JavaScript expressions involving different comparison operators (`==` vs `===`), logical operators (including short-circuiting), and the ternary operator. (Estimated time: 15-20 minutes)

> 🧗 **Challenge (CodeSandbox):** Write a function `checkMedicationAlerts(medication, patientAge, allergies)` that returns an alert message string. Use logical operators (`&&`, `||`) and the ternary operator (`? :`) to construct the message based on conditions like: if the medication requires age verification (`medication.requiresAgeCheck && patientAge < 18`), if the patient has allergies listed for the medication (`allergies.includes(medication.allergyGroup)`), or if the medication stock is low (`medication.stock < 10`). Return a specific alert or a default "No alerts" message. Include comprehensive JSDoc. (Estimated time: 30-45 minutes)

##### **Further Reading:**

*   [MDN: Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
*   [MDN: Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#comparison_operators)
*   [MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)
*   [MDN: Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#logical_operators)
*   [MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
*   [MDN: Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
## **1.4 Control Flow**

### **Objective:**
Implement conditional logic and loops using standard JavaScript control flow statements.

Control flow statements dictate the order in which instructions in a script are executed. JavaScript provides standard structures for conditional execution and repetition (loops).

#### **1.4.1 Conditional Statements**

Conditional statements execute different blocks of code based on whether a condition is true or false.

##### **if...else Statement:**
The most fundamental conditional statement. It executes one block of code if a condition is truthy, and an optional second block (else) if the condition is falsy.

```javascript
/**
 * Determines the dosage category based on patient weight.
 * @param {number} weightInKg - The patient's weight in kilograms.
 * @returns {string} The dosage category ('Standard', 'Reduced', 'Increased').
 */
function getDosageCategory(weightInKg) {
  /** @type {string} */
  let category;
  if (weightInKg < 50) {
    category = "Reduced";
  } else if (weightInKg > 100) {
    category = "Increased";
  } else {
    category = "Standard";
  }
  return category;
}

console.log(getDosageCategory(45));  // Output: Reduced
console.log(getDosageCategory(75));  // Output: Standard
console.log(getDosageCategory(110)); // Output: Increased
```

*   **else if:** Allows testing multiple conditions in sequence. Only the block associated with the first truthy condition is executed.
*   **Blocks {}:** It is strongly recommended to always use curly braces `{}` for if, else if, and else blocks, even if they contain only a single statement. This prevents ambiguity and potential errors, especially with nested conditions (the "dangling else" problem).

##### **switch Statement:**
Evaluates an expression and matches its value against a series of case labels. It executes the statements associated with the first matching case.

```javascript
/**
 * Provides handling instructions based on medication form.
 * @param {string} medicationForm - The form of the medication (e.g., 'Tablet', 'Liquid', 'Injection').
 * @returns {string} Handling instructions.
 */
function getHandlingInstructions(medicationForm) {
  /** @type {string} */
  let instructions;
  switch (medicationForm) {
    case "Tablet":
    case "Capsule": // Example of fall-through for similar cases
      instructions = "Store at room temperature. Keep dry.";
      break; // Exit the switch
    case "Liquid":
      instructions = "Store at room temperature. Shake well before use.";
      break;
    case "Injection":
      instructions = "Refrigerate. Do not freeze. Check expiration date.";
      break;
    default: // Optional: handles cases not explicitly listed
      instructions = "Follow specific instructions on packaging.";
      // No break needed here as it's the last clause
  }
  return instructions;
}

console.log(getHandlingInstructions("Liquid"));    // Output: Store at room temperature. Shake well before use.
console.log(getHandlingInstructions("Capsule"));   // Output: Store at room temperature. Keep dry.
console.log(getHandlingInstructions("Ointment"));  // Output: Follow specific instructions on packaging.
```

*   **Comparison:** switch uses strict equality (`===`) to compare the expression's value with the case labels. Type coercion does not occur.
*   **break:** Essential for preventing "fall-through". Without break, execution continues into the next case block(s) until a break or the end of the switch is reached. Fall-through can be used intentionally but requires careful commenting.
*   **default:** An optional clause that executes if no case matches the expression's value.

#### **1.4.2 Looping Statements**

Loops execute a block of code repeatedly as long as a condition remains true.

##### **for Loop:**
Ideal when the number of iterations is known beforehand or can be easily determined based on initialization, condition, and increment/decrement logic.

Syntax: `for (initialization; condition; afterthought) { ... }`

1.  **initialization:** Runs once before the loop starts (e.g., `let i = 0`).
2.  **condition:** Evaluated before each iteration. If true, the loop body executes. If false, the loop terminates (e.g., `i < 10`).
3.  **afterthought:** Runs after each iteration (e.g., `i++`).

```javascript
/**
 * Displays upcoming refill dates for the next few months.
 * @param {Date} lastRefillDate - The date of the last refill.
 * @param {number} numberOfRefills - How many future refill dates to calculate.
 * @returns {void} Logs the refill dates.
 */
function displayRefillSchedule(lastRefillDate, numberOfRefills) {
  console.log("Upcoming Refill Dates:");
  /** @type {Date} */
  let nextRefillDate = new Date(lastRefillDate);

  for (let i = 0; i < numberOfRefills; i++) {
    // Assuming monthly refills for simplicity
    nextRefillDate.setMonth(nextRefillDate.getMonth() + 1);
    console.log(`Refill ${i + 1}: ${nextRefillDate.toLocaleDateString()}`);
  }
}

displayRefillSchedule(new Date(2024, 10, 15), 3); // Example output starting from Nov 15, 2024
// Output:
// Upcoming Refill Dates:
// Refill 1: 12/15/2024
// Refill 2: 1/15/2025
// Refill 3: 2/15/2025
```

##### **while Loop:**
Executes a block of code as long as a specified condition evaluates to truthy. The condition is checked before each iteration. Suitable when the number of iterations isn't known in advance.

Syntax: `while (condition) { ... }`

```javascript
/**
 * Simulates dispensing medication until stock is below a threshold.
 * @param {number} initialStock - The starting stock level.
 * @param {number} dispenseAmount - Amount dispensed per cycle.
 * @param {number} minimumThreshold - The stock level at which to stop.
 * @returns {number} The final stock level.
 */
function dispenseUntilLow(initialStock, dispenseAmount, minimumThreshold) {
  /** @type {number} */
  let currentStock = initialStock;
  console.log(`Starting stock: ${currentStock}`);

  while (currentStock >= minimumThreshold + dispenseAmount) {
    currentStock -= dispenseAmount;
    console.log(`Dispensed ${dispenseAmount}. Remaining stock: ${currentStock}`);
  }

  console.log(`Dispensing stopped. Final stock: ${currentStock}`);
  return currentStock;
}

dispenseUntilLow(50, 8, 10);
// Output:
// Starting stock: 50
// Dispensed 8. Remaining stock: 42
// Dispensed 8. Remaining stock: 34
// Dispensed 8. Remaining stock: 26
// Dispensed 8. Remaining stock: 18
// Dispensing stopped. Final stock: 18
```

Caution: Ensure the condition eventually becomes false to avoid infinite loops.

##### **do...while Loop:**
Similar to while, but the condition is checked after the loop body executes. This guarantees the loop body runs at least once.

Syntax: `do { ... } while (condition);`

```javascript
/**
 * Prompts the user for confirmation at least once.
 * (Conceptual example - actual prompt requires environment-specific functions)
 * @returns {boolean} Whether the user confirmed.
 */
function requestConfirmation() {
  /** @type {boolean} */
  let confirmed = false;
  /** @type {number} */
  let attempts = 0;
  do {
    attempts++;
    console.log(`Attempt ${attempts}: Please confirm prescription details.`);
    // In a real app, you would get user input here.
    // For this example, let's simulate confirmation after 2 attempts.
    if (attempts >= 2) {
      confirmed = true; // Simulate user confirming
    }
  } while (!confirmed && attempts < 3); // Loop until confirmed or max attempts reached

  console.log(confirmed ? "Details Confirmed." : "Confirmation failed.");
  return confirmed;
}

requestConfirmation();
// Output:
// Attempt 1: Please confirm prescription details.
// Attempt 2: Please confirm prescription details.
// Details Confirmed.
```

##### **Best Practice: Using Blocks {}:**
As with if/else, always use curly braces `{}` for loop bodies, even for single statements, to enhance readability and prevent errors.

While these loops are fundamental, for iterating over arrays, modern JavaScript often favors array methods like forEach, map, filter, and reduce (covered in section 1.7), which can be more declarative and less prone to errors.

> 📲 **Comparative Callout: Native Developers (Java/Kotlin/Swift)**
> The syntax and fundamental behavior of if/else, switch, for, while, and do...while loops in JavaScript are highly similar to their counterparts in Java, Kotlin, and Swift.
> *   **switch:** Be mindful that JS switch uses strict (`===`) comparison and requires explicit break statements to prevent fall-through, which might differ slightly from default behaviors or syntax in other languages (e.g., Swift switch does not fall through by default).
> *   **for loop:** The classic C-style for loop (`for (init; condition; afterthought)`) is common across these languages. JavaScript also has `for...in` and `for...of` loops for iterating over object properties and iterable values, respectively, which have parallels in other languages (e.g., Kotlin's `for (item in collection)`, Swift's `for item in collection`).
> *   **while/do...while:** These loops function almost identically across the languages.

> 📝 **Exercise (CodeSandbox):** Write a switch statement that takes a medication type code (e.g., 'PAIN', 'ANTIBIOTIC', 'CARDIO') and returns the full category name. Include a default case for unknown codes. (Estimated time: 15 minutes)

> 🧗 **Challenge (Expo Snack):** Given an array representing daily pill counts for a week (e.g., `[2, 2, 3, 2, 3, 2, 2]`), use a for loop to calculate the total number of pills taken. Then, use a while loop to simulate taking pills from a bottle (start with 30 pills) based on the daily counts until the bottle runs out or the week ends, logging the remaining pills each day. Include comprehensive JSDoc. (Estimated time: 45-60 minutes)

##### **Further Reading:**

*   [MDN: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
*   [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
*   [MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
*   [MDN: for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
*   [MDN: while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
*   [MDN: do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)
## **1.5 Functions**

### **Objective:**
Define and invoke functions using different syntaxes, understand the behavior of this, and differentiate between function types.

Functions are fundamental building blocks in JavaScript, allowing you to encapsulate reusable blocks of code. JavaScript treats functions as first-class objects, meaning they can be assigned to variables, passed as arguments to other functions, and returned from functions.

#### **1.5.1 Function Declarations**

This is the traditional way to define a named function.

##### **Syntax:**

```javascript
function functionName(parameter1, parameter2 /*,...*/) {
  // Function body: statements to execute
  return value; // Optional return statement
}
```

##### **Hoisting:**
Function declarations are fully hoisted. This means the entire function definition (name and body) is moved to the top of its scope during compilation. Consequently, you can call a function declaration before it appears in your code.

```javascript
/**
 * Calculates the required dosage based on patient weight.
 * This function is declared using a function declaration.
 * @param {number} weightKg - Patient weight in kilograms.
 * @param {number} dosagePerKg - Required dosage per kilogram (e.g., in mg/kg).
 * @returns {number} The calculated total dosage.
 */
function calculateDosage(weightKg, dosagePerKg) {
  if (weightKg <= 0 || dosagePerKg <= 0) {
    return 0; // Basic validation
  }
  return weightKg * dosagePerKg;
}

// Can be called before or after definition due to hoisting
const requiredDose = calculateDosage(70, 5);
console.log(`Required dose: ${requiredDose}mg`); // Output: Required dose: 350mg
```

While hoisting offers flexibility, relying heavily on it can sometimes make code flow harder to follow.

#### **1.5.2 Function Expressions**

A function expression defines a function as part of an expression, typically assigning it to a variable.

##### **Syntax:**

```javascript
const variableName = function(parameter1, parameter2 /*,...*/) {
  // Function body
  return value;
}; // Note the semicolon often used here as it's an assignment statement
```

##### **Anonymous vs. Named:**
*   **Anonymous:** The function itself has no name after the `function` keyword (as shown above). This is the most common form.
*   **Named:** You can provide a name after `function` (e.g., `const factorial = function fact(n) { ... };). This name (`fact` in the example) is primarily useful for recursion or debugging purposes and is only accessible within the function's body.

##### **Hoisting:**
Function expressions are not hoisted in the same way as declarations. If assigned using `var`, the variable declaration (`var variableName;`) is hoisted and initialized to `undefined`, but the function assignment happens only when the execution reaches that line. If assigned using `let` or `const`, the variable is hoisted but remains in the TDZ until the assignment. In practice, you cannot call a function expression before its definition in the code. This enforces a more top-down code structure.

```javascript
// console.log(getPatientNotes(123)); // TypeError: getPatientNotes is not a function (if using var)
                                    // ReferenceError: Cannot access 'getPatientNotes' before initialization (if using let/const)

/**
 * Retrieves notes for a specific patient.
 * Defined using an anonymous function expression assigned to a const.
 * @param {string | number} patientId - The ID of the patient.
 * @returns {Promise<string>} A promise that resolves with the patient notes.
 * @throws {Error} If patient data cannot be fetched.
 */
const getPatientNotes = async function(patientId) {
  console.log(`Fetching notes for patient ${patientId}...`);
  // Simulate async fetch
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
  if (patientId === 123) {
    return "Patient reports mild headache.";
  } else {
    throw new Error("Patient not found");
  }
};

getPatientNotes(123)
.then(notes => console.log(notes)) // Output: Patient reports mild headache.
.catch(err => console.error(err.message));
```

#### **1.5.3 Arrow Functions (`=>`)**

Arrow functions, introduced in ES6, provide a more concise syntax for writing function expressions. They are always anonymous.

##### **Syntax Variations:**
*   Single parameter, implicit return: `param => expression`
*   Multiple parameters, implicit return: `(param1, param2) => expression`
*   No parameters, implicit return: `() => expression`
*   Single parameter, block body (explicit return): `param => { statements; return value; }`
*   Multiple parameters, block body (explicit return): `(param1, param2) => { statements; return value; }`
*   Returning object literals (requires parentheses): `() => ({ key: value })`

##### **Hoisting:**
Arrow functions are not hoisted, similar to function expressions.

##### **Limitations:**
Arrow functions have some key differences and limitations compared to traditional functions:
*   They do not have their own `this` binding (lexical `this`, explained below).
*   They cannot be used as constructors (calling with `new` throws a `TypeError`).
*   They do not have their own `arguments` object (use rest parameters `...args` instead).
*   They cannot be used as generator functions (cannot use `yield`).

```javascript
/**
 * Filters an array of medications to find those requiring refrigeration.
 * Uses an arrow function for the filter callback.
 * @param {Array<Object>} medications - An array of medication objects.
 * @param {string} medications.name - Name of the medication.
 * @param {boolean} medications.requiresRefrigeration - Whether refrigeration is needed.
 * @returns {Array<Object>} An array containing only refrigerated medications.
 */
const findRefrigeratedMeds = (medications) =>
  medications.filter(med => med.requiresRefrigeration === true);

const inventory = [
  { name: "Insulin", requiresRefrigeration: true },
  { name: "Lisinopril", requiresRefrigeration: false },
  { name: "Vaccine", requiresRefrigeration: true },
];

const refrigerated = findRefrigeratedMeds(inventory);
console.log(refrigerated);
// Output:
// [ { name: 'Insulin', requiresRefrigeration: true }, { name: 'Vaccine', requiresRefrigeration: true } ]

// Arrow function returning an object literal
/**
 * Creates a simple medication log entry.
 * @param {string} medName - The name of the medication.
 * @param {string} dosage - The dosage administered.
 * @returns {{medication: string, dosage: string, timestamp: number}} Log entry object.
 */
const createLogEntry = (medName, dosage) => ({
  medication: medName,
  dosage: dosage,
  timestamp: Date.now()
});

console.log(createLogEntry("Ibuprofen", "200mg"));
// Output: { medication: 'Ibuprofen', dosage: '200mg', timestamp: 17... }
```

#### **1.5.4 The `this` Keyword**

The `this` keyword is a source of frequent confusion in JavaScript. Its value refers to the execution context of a function, and it's determined by how the function is called, not where it's defined (except for arrow functions).

##### **Traditional Functions (`function` keyword): Dynamic `this`**
*   **Standalone Function Call:** When a function is called directly (e.g., `myFunction()`), `this` refers to the global object (`window` in browsers, `globalThis` everywhere) in non-strict mode, or `undefined` in strict mode (modules are always strict).
*   **Method Call:** When a function is called as a method of an object (e.g., `pharmacy.getLocation()`), `this` refers to the object the method was called on (`pharmacy` in this case).
*   **Constructor Call:** When a function is used as a constructor with `new` (e.g., `new Patient(...)`), `this` refers to the newly created instance being constructed.
*   **Explicit Binding (`call`, `apply`, `bind`):** When called using these methods, `this` is explicitly set to the object provided as the first argument.

##### **Arrow Functions (`=>`): Lexical `this`**
*   Arrow functions do not have their own `this` binding.
*   Instead, they inherit the `this` value from their surrounding (enclosing) lexical scope at the time they are defined.
*   The value of `this` inside an arrow function remains the same regardless of how the function is called.
*   This lexical `this` behavior is extremely useful for callbacks (like in `setTimeout`, event listeners, or array methods like `map`/`filter`), as it avoids the common problem of `this` losing its intended context.

![Diagram illustrating Dynamic vs. Lexical this.](https://mermaid.ink/img/pako:eNqdVMFuozAQ_BWXq65SiXSDCVB4WCkXVWrVRrtNdx-27IMLE0ABuzJ2u-nl39cmIeklqpYnz_icM-M52E8kFRmSmPT7_YSngi_KPE44gCqwxhg4ChtVQix3AVsJrWLIWC4x4S1zUYmHtGBSwfU04RZ1eAgXmLN0BWNZZjnCRNS15mXKVClaRKNvc8nuCrgYT24S8hma_LEEgPO5e3M-h-tCIss2ubHb621IPzRqPDra5On-_My9mRnVe_z682yntNWHfv_bswtzlCWrykeEKVPs2VTpqrUACqNmxVO4low3C5QGQLuyLcCDKTbvNGZu10ELGcJ3KVJsGvjyqtwVNrpSH_T8jwXfdhS8KdipmANZFPJs68oMH2Ak06JUmCotEXrn87OjT-yZjaw9_0Xb-UQ_-GTgPcuBC7ZCuXWDfuYG3bgxLaWpChNWVfZMZ1vFjRlrCbhEVYjMDJp24u3-FZqGOfxilcY9dKt6y9Kl3aLvpzVXqwqbdh52ZaedikrI-OC0_RxYlFUVH0QTGo4HjkFJscQufsWj-3k0CqiNOt463vFsk3uJw8no1H9VcB0Th9Qoa1Zm5k4_WZmEtFc5IbFZZkwuE5LwF4NjWom5-aVIrKRGh0ih84LEC1Y1JtJ3GVM4Lc0dZ_U2e8f4byHqjmJCEj-RvySmQ-84CKnnUn8wGIT-SeCQFYkD7ziKPI96wTD0o_AkDF4c8tgquMc0cv0BjXzqh35w4hlGLm3fm3aMCygnQnNF4ihyCGalEvJy_Vy1r9bLP219dng)

```javascript
/**
 * Demonstrates 'this' behavior in traditional vs. arrow functions.
 */
const pharmacy = {
  name: "Central Pharmacy",
  location: "Main Street",
  /**
   * Traditional function method - 'this' depends on how it's called.
   * @returns {void}
   */
  displayInfoTraditional: function() {
    console.log(`Traditional: ${this.name} at ${this.location}`); // 'this' refers to 'pharmacy' when called as pharmacy.displayInfoTraditional()

    setTimeout(function() {
      // Inside this traditional callback, 'this' is lost (points to global/undefined in strict mode)
      console.log(`Timeout Traditional (Lost this): ${this?.name}`);
    }, 10);
  },
  /**
   * Arrow function method - 'this' is lexically bound to the 'pharmacy' object.
   * @returns {void}
   */
  displayInfoArrow: function() {
    console.log(`Arrow Outer: ${this.name} at ${this.location}`); // 'this' refers to 'pharmacy'

    setTimeout(() => {
      // Inside this arrow function, 'this' is inherited from displayInfoArrow's scope
      console.log(`Timeout Arrow (Preserved this): ${this.name}`);
    }, 20);
  }
};

pharmacy.displayInfoTraditional();
// Expected Output:
// Traditional: Central Pharmacy at Main Street
// Timeout Traditional (Lost this): undefined (or error in strict mode if accessing this.name)

pharmacy.displayInfoArrow();
// Expected Output:
// Arrow Outer: Central Pharmacy at Main Street
// Timeout Arrow (Preserved this): Central Pharmacy
```

The lexical `this` of arrow functions elegantly solves the context loss issue often encountered with callbacks in traditional functions.

#### **1.5.5 Explicit `this` Binding: `call()`, `apply()`, `bind()`**

These methods, available on all functions, allow you to explicitly control the value of `this` when invoking a function.

*   **`function.call(thisArg, arg1, arg2,...)`:**
    *   Invokes the function immediately.
    *   Sets the `this` context inside the function to `thisArg`.
    *   Passes subsequent arguments (`arg1`, `arg2`, etc.) individually to the function.
*   **`function.apply(thisArg, [argsArray])`:**
    *   Invokes the function immediately.
    *   Sets the `this` context inside the function to `thisArg`.
    *   Passes arguments to the function as an array or array-like object (`argsArray`). Remember: Apply takes an Array.
*   **`function.bind(thisArg, arg1, arg2,...)`:**
    *   Does not invoke the function immediately.
    *   Returns a new function (a "bound function") where the `this` context is permanently set to `thisArg`.
    *   Optionally, you can "pre-load" arguments (`arg1`, `arg2`, etc.) which will be passed first when the bound function is eventually called (a technique called currying or partial application).

```javascript
/**
 * Represents a Pharmacist.
 * @typedef {Object} Pharmacist
 * @property {string} name - The pharmacist's name.
 * @property {function(string, string): void} dispense - Method to dispense medication.
 */

/** @type {Pharmacist} */
const pharmacist = {
  name: "Alice",
  dispense: function(patientName, medicationName) {
    console.log(`${this.name} is dispensing ${medicationName} for ${patientName}.`);
  }
};

/** @type {Pharmacist} */
const reliefPharmacist = {
  name: "Bob"
};

// Using call() to invoke dispense with 'reliefPharmacist' context
pharmacist.dispense.call(reliefPharmacist, "Charlie", "Lisinopril");
// Output: Bob is dispensing Lisinopril for Charlie.

// Using apply()
pharmacist.dispense.apply(reliefPharmacist, ["David", "Metformin"]);
// Output: Bob is dispensing Metformin for David.

// Using bind() to create a function bound to 'Alice' for a specific task
/** @type {function(string, string): void} */
const aliceDispenses = pharmacist.dispense.bind(pharmacist);
aliceDispenses("Eve", "Amlodipine");
// Output: Alice is dispensing Amlodipine for Eve.

// Using bind() for partial application (currying)
/** @type {function(string): void} */
const aliceDispensesWarfarin = pharmacist.dispense.bind(pharmacist, "Frank", "Warfarin");
aliceDispensesWarfarin(); // patientName and medicationName are pre-bound
// Output: Alice is dispensing Warfarin for Frank.
```

While still important, the need for `bind` in particular has decreased in contexts like React class components or event handlers due to the prevalence of arrow functions for preserving `this`.

> 📲 **Comparative Callout: Native Developers**
> *   **Java/Kotlin:** JS functions being first-class objects is a key difference. Java/Kotlin methods have an implicit `this` referring to the class instance. JS dynamic `this` is more complex. Arrow function lexical `this` helps in callbacks, a scenario often handled by lambdas or anonymous/inner classes in Java/Kotlin, where scope rules differ slightly. `call`/`apply`/`bind` allow explicit `this` setting, somewhat analogous to Java Reflection but used much more commonly for context control in JS.
> *   **Swift:** Swift functions/closures are also first-class. `self` in Swift methods is generally predictable. Swift closure capture lists (`[weak self]`) solve reference cycle issues, distinct from JS `this` context issues. Arrow function lexical `this` capture is conceptually similar to Swift closure capture of `self` but addresses different core language behaviors. Swift doesn't have direct equivalents to `call`/`apply`/`bind` for `self` manipulation.
> *   **Angular/React:** Developers in these frameworks frequently use arrow functions to handle `this` correctly, especially in React class components or when passing methods as callbacks. Understanding the underlying JS mechanics is beneficial.

> 📝 **Exercise (CodeSandbox):** Convert a function that uses a traditional function declaration into an equivalent arrow function. Discuss any potential changes in behavior related to `this`. (Estimated time: 15 minutes)

> 📝 **Exercise (Microsoft Whiteboard):** Given several code snippets with nested functions (traditional and arrow), diagram the value of `this` at various points within the code. (Estimated time: 20 minutes)

> 🧗 **Challenge (CodeSandbox):** You have an object representing a `DeliveryService` with a method `scheduleDelivery(patientId, address)`. This method uses `this` to access the service's name. You need to pass this method as a callback to a `processOrder` function, which calls the callback later. Fix the code so that `this` correctly refers to the `DeliveryService` instance when the callback is invoked. Implement the fix using both `.bind()` and by modifying the callback structure to use an arrow function. Include comprehensive JSDoc. (Estimated time: 30-45 minutes)

##### **Further Reading:**

*   [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
*   [MDN: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
*   [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
*   [MDN: Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
*   [MDN: Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
*   [MDN: Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
## **1.6 Objects**

### **Objective:**
Create, access, and manipulate objects using literals, properties, methods, destructuring, and the spread syntax.

Objects are fundamental in JavaScript, used to group related data and functionality. They are collections of key-value pairs, where keys are strings (or Symbols) and values can be any data type, including other objects, arrays, or functions.

#### **1.6.1 Object Literals**

The most common way to create objects is using the literal syntax with curly braces `{}`.

```javascript
/**
 * Represents a medication with its properties.
 * @typedef {Object} Medication
 * @property {string} id - Unique medication identifier.
 * @property {string} name - The brand or generic name.
 * @property {string} dosage - Dosage strength (e.g., '10mg', '500mg').
 * @property {string} form - The form factor (e.g., 'Tablet', 'Capsule', 'Liquid').
 * @property {number} stock - Current quantity in stock.
 */

/** @type {Medication} */
const medicationA = {
  id: "LNP10",
  name: "Lisinopril",
  dosage: "10mg",
  form: "Tablet",
  stock: 250
};

console.log(medicationA);
// Output: { id: 'LNP10', name: 'Lisinopril', dosage: '10mg', form: 'Tablet', stock: 250 }
```

#### **1.6.2 Accessing Properties**

You can access object properties using dot notation or bracket notation.

##### **Dot Notation (`object.propertyName`):**
*   Concise and readable.
*   Requires the property name to be a valid JavaScript identifier (no spaces, doesn't start with a number, etc.).
*   Example: `medicationA.name` returns "Lisinopril".

##### **Bracket Notation (`object["propertyName"]`):**
*   Requires the property name as a string (or a variable holding a string/Symbol).
*   Necessary when the property name is dynamic (stored in a variable) or not a valid identifier.
*   Example: `medicationA["dosage"]` returns "10mg".
*   Example: `const propToAccess = "stock"; console.log(medicationA[propToAccess]);` // Output: 250

```javascript
/** @type {Medication} */
const medicationB = {
  id: "AMX500",
  name: "Amoxicillin",
  dosage: "500mg",
  form: "Capsule",
  stock: 180,
  "requires-refrigeration": false // Property name not valid for dot notation
};

// Using dot notation
console.log(`Name: ${medicationB.name}`); // Output: Name: Amoxicillin

// Using bracket notation
console.log(`Form: ${medicationB["form"]}`); // Output: Form: Capsule
console.log(`Refrigeration: ${medicationB["requires-refrigeration"]}`); // Output: Refrigeration: false

/** @type {string} */
const propertyKey = "stock";
console.log(`Stock: ${medicationB[propertyKey]}`); // Output: Stock: 180
```

#### **1.6.3 Defining Methods**

Methods are functions stored as object properties. ES6 introduced a shorthand syntax.

*   Traditional Syntax: `methodName: function() { ... }`
*   Shorthand Syntax (ES6+): `methodName() { ... }` (Preferred)

```javascript
/**
 * Represents a pharmacy location.
 * @typedef {Object} PharmacyLocation
 * @property {string} name - Name of the pharmacy branch.
 * @property {string} address - Address of the branch.
 * @property {string[]} staff - List of pharmacist names.
 * @property {function(): string} getFullAddress - Method to get full address.
 * @property {(pharmacistName: string) => void} addStaff - Method to add staff (shorthand).
 */

/** @type {PharmacyLocation} */
const mainStreetPharmacy = {
  name: "SpeedyMeds Main St",
  address: "123 Main St",
  staff: [],
  getFullAddress: function() {
    return `${this.name}, ${this.address}`;
  },
  // Shorthand method syntax
  addStaff(pharmacistName) {
    this.staff.push(pharmacistName);
    console.log(`${pharmacistName} added to ${this.name} staff.`);
  }
};

console.log(mainStreetPharmacy.getFullAddress()); // Output: SpeedyMeds Main St, 123 Main St
mainStreetPharmacy.addStaff("Charlie"); // Output: Charlie added to SpeedyMeds Main St staff.
console.log(mainStreetPharmacy.staff); // Output: [ 'Charlie' ]
```

#### **1.6.4 Setting Object Members**

You can update existing properties or add new ones using assignment (`=`) with either dot or bracket notation.

```javascript
/** @type {Medication} */
const medicationC = {
  id: "MTF850",
  name: "Metformin",
  dosage: "850mg",
  form: "Tablet",
  stock: 300
};

// Update existing property
medicationC.stock -= 50;
console.log(medicationC.stock); // Output: 250

// Add a new property
medicationC.requiresPrescription = true;
console.log(medicationC.requiresPrescription); // Output: true

// Add a new property using bracket notation (dynamic key)
/** @type {string} */
const storageKey = "storageLocation";
medicationC[storageKey] = "Shelf A-3";
console.log(medicationC.storageLocation); // Output: Shelf A-3

console.log(medicationC);
// Output: { id: 'MTF850', name: 'Metformin', dosage: '850mg', form: 'Tablet', stock: 250, requiresPrescription: true, storageLocation: 'Shelf A-3' }
```

#### **1.6.5 Object Destructuring**

Destructuring assignment provides a concise syntax to extract properties from objects into distinct variables. This significantly improves readability when accessing multiple properties, especially from function parameters or API responses.

##### **Syntax Features:**
*   **Basic:** Variable names must match property keys. `const { name, stock } = medicationA;`
*   **Aliasing (Renaming):** Use `:` to assign to a different variable name. `const { name: medicationName, stock: inventoryCount } = medicationA;`
*   **Default Values:** Use `=` to provide a fallback value if the property is missing or `undefined`. `const { requiresRefrigeration = false } = medicationA;`
*   **Rest Syntax (`...`):** Collects all remaining own enumerable properties into a new object. `const { id, name, ...details } = medicationA;`
*   **Nested Destructuring:** Extract properties from nested objects. `const { patient: { name: patientName, age } } = prescriptionData;`
*   **Assignment Pattern:** Destructure into existing variables (requires parentheses). `let name, stock; ({ name, stock } = medicationA);`

```javascript
/**
 * Displays key information about a medication using destructuring.
 * @param {Medication} medication - The medication object.
 * @returns {void}
 */
function displayMedicationInfo({
  name: medName, // Aliasing
  dosage,
  form,
  stock = 0, // Default value
  ...otherDetails // Rest syntax
}) {
  console.log(`Medication: ${medName} (${dosage} ${form})`);
  console.log(`Stock: ${stock}`);
  if (stock < 50) {
    console.warn("Warning: Low stock!");
  }
  console.log("Other Details:", otherDetails); // Logs { id: '...' } if medicationA is passed
}

/** @type {Medication} */
const medicationD = { id: 'XYZ123', name: 'Simvastatin', dosage: '20mg', form: 'Tablet', stock: 35 };
displayMedicationInfo(medicationD);
// Output:
// Medication: Simvastatin (20mg Tablet)
// Stock: 35
// Warning: Low stock!
// Other Details: { id: 'XYZ123' }

/** @type {Medication} */
const medicationE = { id: 'ABC987', name: 'Omeprazole', dosage: '40mg', form: 'Capsule' }; // Missing stock
displayMedicationInfo(medicationE);
// Output:
// Medication: Omeprazole (40mg Capsule)
// Stock: 0  (Default value used)
// Warning: Low stock!
// Other Details: { id: 'ABC987' }
```

#### **1.6.6 Spread Syntax (`...`) for Objects**

The spread syntax (`...`) allows the own enumerable properties of an existing object to be expanded (or "spread") into a new object literal. This is extremely useful for creating copies or merging objects in an immutable way, which is important for state management in frameworks like React Native.

##### **Use Cases:**
*   **Cloning (Shallow Copy):** Creates a new object with the same properties as the original. Note: This is a shallow copy. Nested objects or arrays within the original object are copied by reference, not duplicated. Changes to nested structures will affect both the original and the clone.

######

```javascript
const originalPatient = { name: "Alice", address: { street: "1 Main St", city: "Anytown" } };
const patientClone = { ...originalPatient };
patientClone.name = "Alicia"; // Does not affect originalPatient.name
patientClone.address.city = "New City"; // DOES affect originalPatient.address.city
console.log(originalPatient.address.city); // Output: New City
```
*   **Merging Objects:** Combines properties from multiple objects into a new object. Properties from objects spread later in the sequence overwrite properties with the same key from earlier objects.
```javascript
const defaultMedConfig = { isOTC: false, requiresAuth: true };
const specificMedConfig = { requiresAuth: false, storageTemp: "Refrigerated" };
const finalConfig = { ...defaultMedConfig, ...specificMedConfig };
// finalConfig is { isOTC: false, requiresAuth: false, storageTemp: 'Refrigerated' }
console.log(finalConfig);
```
*   **Adding/Overriding Properties Immutably:** Create a new object based on an old one with added or updated properties.
```javascript
const baseRecord = { id: 1, status: "Pending" };
const updatedRecord = { ...baseRecord, status: "Complete", completionDate: Date.now() };
// updatedRecord is { id: 1, status: 'Complete', completionDate:... }
// baseRecord remains unchanged.
console.log(updatedRecord);
```

![Diagram illustrating Object Destructuring and Spread Syntax.](https://mermaid.ink/img/pako:eNqdVMFuozAQ_BWXq65SiXSDCVB4WCkXVWrVRrtNdx-27IMLE0ABuzJ2u-nl39cmIeklqpYnz_icM-M52E8kFRmSmPT7_YSngi_KPE44gCqwxhg4ChtVQix3AVsJrWLIWC4x4S1zUYmHtGBSwfU04RZ1eAgXmLN0BWNZZjnCRNS15mXKVClaRKNvc8nuCrgYT24S8hma_LEEgPO5e3M-h-tCIss2ubHb621IPzRqPDra5On-_My9mRnVe_z682yntNWHfv_bswtzlCWrykeEKVPs2VTpqrUACqNmxVO4low3C5QGQLuyLcCDKTbvNGZu10ELGcJ3KVJsGvjyqtwVNrpSH_T8jwXfdhS8KdipmANZFPJs68oMH2Ak06JUmCotEXrn87OjT-yZjaw9_0Xb-UQ_-GTgPcuBC7ZCuXWDfuYG3bgxLaWpChNWVfZMZ1vFjRlrCbhEVYjMDJp24u3-FZqGOfxilcY9dKt6y9Kl3aLvpzVXqwqbdh52ZaedikrI-OC0_RxYlFUVH0QTGo4HjkFJscQufsWj-3k0CqiNOt463vFsk3uJw8no1H9VcB0Th9Qoa1Zm5k4_WZmEtFc5IbFZZkwuE5LwF4NjWom5-aVIrKRGh0ih84LEC1Y1JtJ3GVM4Lc0dZ_U2e8f4byHqjmJCEj-RvySmQ-84CKnnUn8wGIT-SeCQFYkD7ziKPI96wTD0o_AkDF4c8tgquCc0cv0BjXzqh35w4hlGLm3fm3aMCygnQnNF4ihyCGalEvJy_Vy1r9bLP219dng)

> 📲 **Comparative Callout: Native Developers**
> *   **Java:** JS objects are dynamic property bags, unlike Java's static class instances. JS prototypal inheritance differs from Java's class inheritance. Destructuring/spread are unique JS syntaxes with no direct Java equivalent for object manipulation.
> *   **Kotlin:** JS object destructuring is name-based, while Kotlin data class destructuring is position-based - a critical difference. Kotlin's spread operator (`*`) is primarily for function varargs, not object merging like JS `...`. Kotlin's classes/objects offer different creation patterns.
> *   **Swift:** JS objects (reference types) contrast with Swift's classes (reference types) and structs (value types). Swift requires explicit type definitions and lacks direct object literal spread/destructuring, though tuple destructuring exists.
> *   **Angular/React:** Object destructuring and spread syntax are heavily used and should be familiar.

> 📝 **Exercise (CodeSandbox):** Create an object `pharmacyInfo` with properties like `name`, `address` (nested object with `street`, `city`, `zip`), and `phoneNumber`. Access properties using both dot and bracket notation. Add a method `displayAddress()` using shorthand syntax. (Estimated time: 15-20 minutes)

> 🧗 **Challenge (CodeSandbox):** Write a function `updatePatientRecord(patient, updates)` that takes an existing patient object and an `updates` object. Use object destructuring to extract relevant properties from `updates` (e.g., `address`, `phoneNumber`, `primaryDoctor`) with default values if needed. Use object spread syntax to create and return a new patient object incorporating the updates immutably (without modifying the original patient object). Add comprehensive JSDoc. (Estimated time: 40-50 minutes)

##### **Further Reading:**

*   [MDN: Object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics)
*   [MDN: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
*   [MDN: Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)
*   [MDN: Method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)
*   [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
*   [MDN: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)


## **1.7 Arrays**

### **Objective:**
Manipulate arrays effectively using key iteration methods, destructuring, and the spread syntax.

Arrays in JavaScript are ordered, zero-indexed collections of values. They are dynamic, meaning they can grow or shrink in size, and can hold values of mixed data types. Arrays are technically a specialized type of object.

#### **1.7.1 Key Array Iteration Methods**

Modern JavaScript provides powerful methods for iterating over and transforming arrays, often preferred over traditional for loops for their declarative nature and readability. These methods typically accept a callback function that is executed for each element.

##### **map()**
*   **Purpose:** Creates a new array populated with the results of calling a provided function on every element in the calling array. It transforms each element.
*   **Syntax:** `array.map((element, index, array) => { /* transformation logic */ return newValue; })`.
*   **Return Value:** A new array with the transformed elements. The original array is not modified.
*   **Sparse Arrays:** Skips empty slots; the resulting array will have empty slots at the same indices.

```javascript
/**
 * Extracts the names from an array of medication objects.
 * @param {Array<Medication>} medications - Array of medication objects.
 * @returns {Array<string>} An array containing only the names of the medications.
 */
function getMedicationNames(medications) {
  // Use map to transform each medication object into its name string
  return medications.map(med => med.name);
}

const medObjects = [
  { name: "Lisinopril", id: "LNP10" },
  { name: "Amoxicillin", id: "AMX500" },
  { name: "Metformin", id: "MTF850" },
];
const medNames = getMedicationNames(medObjects);
console.log(medNames); // Output: [ 'Lisinopril', 'Amoxicillin', 'Metformin' ]
console.log(medObjects); // Original array remains unchanged
```

##### **filter()**
*   **Purpose:** Creates a new array with all elements that pass the test implemented by the provided function. It selects a subset of elements.
*   **Syntax:** `array.filter((element, index, array) => { /* condition logic */ return booleanCondition; })`. The callback must return `true` to keep the element, `false` to discard it.
*   **Return Value:** A new array containing only the elements that passed the test. The original array is not modified.
*   **Sparse Arrays:** Skips empty slots.

```javascript
/**
 * Filters an array of prescriptions to find only the active ones.
 * @param {Array<Object>} prescriptions - Array of prescription objects.
 * @param {string} prescriptions.id - Prescription ID.
 * @param {string} prescriptions.medicationName - Name of the medication.
 * @param {boolean} prescriptions.isActive - Whether the prescription is active.
 * @returns {Array<Object>} An array containing only active prescriptions.
 */
function getActivePrescriptions(prescriptions) {
  // Use filter to keep only prescriptions where isActive is true
  return prescriptions.filter(p => p.isActive === true);
}

const allPrescriptions = [
  { id: "RX123", medicationName: "Lisinopril", isActive: true },
  { id: "RX456", medicationName: "Amoxicillin", isActive: false },
  { id: "RX789", medicationName: "Metformin", isActive: true },
];
const activeOnes = getActivePrescriptions(allPrescriptions);
console.log(activeOnes);
// Output:
// [ { id: 'RX123', medicationName: 'Lisinopril', isActive: true }, { id: 'RX789', medicationName: 'Metformin', isActive: true } ]
```

##### **reduce()**
*   **Purpose:** Executes a "reducer" function on each element of the array, resulting in a single output value (the accumulator). It's highly versatile for summarizing or transforming an array into one value (which could be a number, string, object, or another array).
*   **Syntax:** `array.reduce((accumulator, currentValue, currentIndex, array) => { /* reduction logic */ return newAccumulatorValue; }, initialValue)`.
*   **Parameters:**
    *   `accumulator`: The value resulting from the previous callback invocation, or `initialValue` on the first call.
    *   `currentValue`: The current element being processed.
    *   `currentIndex` (Optional): Index of the current element.
    *   `array` (Optional): The array `reduce` was called upon.
    *   `initialValue` (Optional but Recommended): The value to use as the first accumulator. If omitted, the first element of the array is used as the initial accumulator, and iteration starts from the second element. Providing `initialValue` is crucial when working with empty arrays (otherwise a `TypeError` is thrown) and often makes the logic clearer.
*   **Return Value:** The final, single value resulting from the reduction.
*   **Sparse Arrays:** Skips empty slots.

```javascript
/**
 * Calculates the total number of tablets in stock across multiple medications.
 * @param {Array<Medication>} inventory - Array of medication objects with a 'stock' property.
 * @returns {number} The total stock count.
 */
function calculateTotalStock(inventory) {
  // Use reduce to sum up the 'stock' property of each medication
  // Start with an initial accumulator value of 0
  return inventory.reduce((totalStock, medication) => {
    // Add the current medication's stock to the accumulator
    return totalStock + medication.stock;
  }, 0); // 0 is the initialValue for totalStock
}

const currentInventory = [
  { name: "Lisinopril", stock: 250 },
  { name: "Amoxicillin", stock: 180 },
  { name: "Metformin", stock: 300 },
];
const totalTablets = calculateTotalStock(currentInventory);
console.log(`Total tablets in stock: ${totalTablets}`); // Output: Total tablets in stock: 730
```

`reduce` is powerful but can sometimes be less readable than `map` or `filter` for tasks they are specifically designed for. Choose the method that best expresses the intent.

##### **forEach()**
*   **Purpose:** Executes a provided function once for each array element. Primarily used for its side effects (e.g., logging to console, updating UI, modifying external variables).
*   **Syntax:** `array.forEach((element, index, array) => { /* perform action with element */ })`.
*   **Return Value:** Always returns `undefined`.
*   **Not Chainable:** Because it returns `undefined`, you cannot chain other array methods after `forEach`.
*   **Cannot Be Stopped Easily:** There's no built-in way to break out of a `forEach` loop early, other than throwing an exception. If early termination is needed, use `for`, `for...of`, `some`, `every`, `find`, or `findIndex` instead.
*   **Sparse Arrays:** Skips empty slots.

```javascript
/**
 * Logs a warning message for each medication with low stock.
 * @param {Array<Medication>} inventory - Array of medication objects.
 * @param {number} lowStockThreshold - The stock level considered low.
 * @returns {void} Logs messages to the console.
 */
function logLowStockWarnings(inventory, lowStockThreshold) {
  console.log("Low Stock Warnings:");
  inventory.forEach(med => {
    if (med.stock < lowStockThreshold) {
      // Perform side effect: log a warning
      console.log(` - ${med.name} (${med.id}) stock is low: ${med.stock} units remaining.`);
    }
  });
}

logLowStockWarnings(currentInventory, 200);
// Output:
// Low Stock Warnings:
//  - Amoxicillin (AMX500) stock is low: 180 units remaining.
```

These iteration methods promote a more declarative style compared to imperative for loops, often leading to cleaner and more maintainable code.

#### **1.7.2 Array Destructuring**

Similar to object destructuring, array destructuring allows unpacking elements from arrays into variables based on their position.

##### **Syntax Features:**
*   **Basic:** `const [first, second] = myArray;`
*   **Skipping Elements:** Use commas to skip elements. `const [first, , third] = myArray;`
*   **Default Values:** Provide fallback values. `const [first, second = "default"] = myArray;`
*   **Rest Syntax (`...`):** Collect remaining elements into a new array. Must be the last element. `const [first, second, ...restOfArray] = myArray;`

```javascript
/**
 * Processes the first two medications and logs the rest.
 * @param {string[]} medicationList - An array of medication names.
 * @returns {void}
 */
function processTopMedications(medicationList) {
  // Destructure the array
  const [firstMed, secondMed = "None", ...otherMeds] = medicationList;

  console.log(`Primary Medication: ${firstMed}`);
  console.log(`Secondary Medication: ${secondMed}`);

  if (otherMeds.length > 0) {
    console.log(`Other medications: ${otherMeds.join(', ')}`);
  }
}

const patientMeds1 = ["Lisinopril", "Metformin", "Amlodipine", "Simvastatin"];
processTopMedications(patientMeds1);
// Output:
// Primary Medication: Lisinopril
// Secondary Medication: Metformin
// Other medications: Amlodipine, Simvastatin

const patientMeds2 = ["Aspirin"];
processTopMedications(patientMeds2);
// Output:
// Primary Medication: Aspirin
// Secondary Medication: None

const patientMeds3 = [];
processTopMedications(patientMeds3);
// Output:
// Primary Medication: None
// Secondary Medication: None
```

#### **1.7.3 Spread Syntax (`...`) for Arrays**

The spread syntax (`...`) expands the elements of an iterable (like an array) into places where multiple elements or arguments are expected.

##### **Use Cases:**
*   **Creating New Arrays / Copying (Shallow):** `const newArray = [...originalArray];` Creates a shallow copy.
*   **Concatenating Arrays:** A concise way to combine arrays. `const combined = [...array1, ...array2, ...array3];`.
*   **Adding Elements Immutably:** Create a new array with new elements added. `const updatedMeds = [...currentMeds, newMed];` (append) or `const updatedMeds = [newMed, ...currentMeds];` (prepend). This is preferred over mutating methods like `push` or `unshift` when immutability is desired.
*   **Function Arguments:** Pass array elements as individual arguments to a function. `Math.max(...arrayOfNumbers);`.

```javascript
/**
 * Adds a new medication to a patient's list immutably.
 * @param {string[]} currentMedList - The patient's current medication list.
 * @param {string} newMedication - The medication to add.
 * @returns {string[]} A new array with the added medication.
 */
function addMedication(currentMedList, newMedication) {
  // Use spread syntax to create a new array with the new medication appended
  const updatedList = [...currentMedList, newMedication];
  return updatedList;
}

const patientList = ["Lisinopril", "Metformin"];
const newList = addMedication(patientList, "Amlodipine");

console.log(patientList); // Output: [ 'Lisinopril', 'Metformin' ] (Original is unchanged)
console.log(newList);     // Output: [ 'Lisinopril', 'Metformin', 'Amlodipine' ] (New array created)

// Using spread for function arguments
/** @type {number[]} */
const dosages = [10, 20, 5, 40, 15];
/** @type {number} */
const maxDosage = Math.max(...dosages); // Spreads elements as arguments: Math.max(10, 20, 5, 40, 15)
console.log(`Maximum dosage: ${maxDosage}`); // Output: Maximum dosage: 40
```

Understanding the difference between methods that mutate arrays (e.g., `push`, `pop`, `splice`, `sort`) and those that return new arrays (`map`, `filter`, `reduce`, `slice`, spread syntax) is vital for predictable state management in React Native. Favor immutable operations when working with state.

![Diagram illustrating common array method flows.](https://mermaid.ink/img/pako:eNqdVMFuozAQ_BWXq65SiXSDCVB4WCkXVWrVRrtNdx-27IMLE0ABuzJ2u-nl39cmIeklqpYnz_icM-M52E8kFRmSmPT7_YSngi_KPE44gCqwxhg4ChtVQix3AVsJrWLIWC4x4S1zUYmHtGBSwfU04RZ1eAgXmLN0BWNZZjnCRNS15mXKVClaRKNvc8nuCrgYT24S8hma_LEEgPO5e3M-h-tCIss2ubHb621IPzRqPDra5On-_My9mRnVe_z682yntNWHfv_bswtzlCWrykeEKVPs2VTpqrUACqNmxVO4low3C5QGQLuyLcCDKTbvNGZu10ELGcJ3KVJsGvjyqtwVNrpSH_T8jwXfdhS8KdipmANZFPJs68oMH2Ak06JUmCotEXrn87OjT-yZjaw9_0Xb-UQ_-GTgPcuBC7ZCuXWDfuYG3bgxLaWpChNWVfZMZ1vFjRlrCbhEVYjMDJp24u3-FZqGOfxilcY9dKt6y9Kl3aLvpzVXqwqbdh52ZaedikrI-OC0_RxYlFUVH0QTGo4HjkFJscQufsWj-3k0CqiNOt463vFsk3uJw8no1H9VcB0Th9Qoa1Zm5k4_WZmEtFc5IbFZZkwuE5LwF4NjWom5-aVIrKRGh0ih84LEC1Y1JtJ3GVM4Lc0dZ_U2e8f4byHqjmJCEj-RvySmQ-84CKnnUn8wGIT-SeCQFYkD7ziKPI96wTD0o_AkDF4c8tgquCc0cv0BjXzqh35w4hlGLm3fm3aMCygnQnNF4ihyCGalEvJy_Vy1r9bLP219dng)

> 📲 **Comparative Callout: Native Developers**
> *   **Java:** JS `map`/`filter`/`reduce` are conceptually similar to Java Streams API equivalents. Java requires explicit stream creation (`.stream()`) and collection (`.collect()`), while JS methods work directly on arrays. Java Streams offer more operations and parallelism options.
> *   **Kotlin:** Kotlin's collection operations (`map`, `filter`, `reduce`, `forEach`, etc.) are very similar in syntax and function to JS methods. Kotlin's standard library is extensive, offering many specialized operations. Kotlin distinguishes read-only/mutable collections.
> *   **Swift:** Swift's higher-order functions (`map`, `filter`, `reduce`) on collections align closely with JS methods. Swift uses concise closure syntax. Swift's `compactMap` is a notable addition. Array/tuple destructuring in Swift differs from JS array destructuring.
> *   **Angular/React:** These methods are fundamental tools in modern web/app development and should be familiar.

> 📝 **Exercise (Expo Snack):** Given an array of prescription objects `[{ id: '...', medicationName: '...', quantity: 30, pricePerUnit: 0.5 }, ...]`, use `map` to create a new array where each object also includes a `totalCost` property (`quantity * pricePerUnit`). (Estimated time: 15-20 minutes)

> 📝 **Exercise (Expo Snack):** Given an array of patient temperatures `[98.6, 99.1, 101.3, 98.2, 100.5]`, use `filter` to create a new array containing only temperatures indicating a fever (e.g., `> 100.4`). (Estimated time: 15 minutes)

> 🧗 **Challenge (Expo Snack):** Given an array of medication objects `[{ name: '...', type: 'PAIN', ... }, { name: '...', type: 'ANTIBIOTIC', ... }, ...]`, use `reduce` to create an object where keys are the medication types ('PAIN', 'ANTIBIOTIC', etc.) and values are arrays of medication names belonging to that type. Include comprehensive JSDoc. (Estimated time: 45-60 minutes)
```
</append_to_file>