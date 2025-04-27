Module 5: JavaScript Essentials for React Native
================================================

(Optional Banner Image: Consider an image blending the JavaScript logo with a subtle medical/pharmacy graphic related to SpeedyMeds)

JavaScript is the engine that powers React Native development. While React Native provides a powerful abstraction layer over native platform specifics, a solid understanding of modern JavaScript, particularly ES6 (ECMAScript 2015) and later features, is absolutely essential for building anything beyond trivial applications. This module serves as a critical foundation, ensuring you have the necessary JavaScript proficiency before we delve into the intricacies of React and React Native components, state management, and navigation. Throughout this module, we'll use examples related to our course's capstone project theme, SpeedyMeds, a fictional pharmacy application, to provide practical context.

Understanding core JavaScript concepts like variable scope, closures, asynchronous operations, and modern syntax is not just beneficial---it's crucial. These concepts directly influence how you write effective React Native components, manage application state, interact with backend APIs to fetch data like medication lists or patient details, and efficiently debug problems when they inevitably arise.

This module aims to refresh your existing JavaScript knowledge or establish the required baseline proficiency needed for the rest of the course. We will focus specifically on the aspects of JavaScript most relevant to building production-level React Native applications.

Target Audience Adaptation

-   For Native Developers (Android/iOS): Your experience with languages like Java, Kotlin, or Swift provides a strong programming foundation. However, JavaScript has unique characteristics. Key differences include its dynamic typing (variables don't have fixed types declared upfront, unlike static typing in Swift/Kotlin/Java) and prototype-based inheritance (objects inherit from other objects, unlike classical inheritance with classes). JavaScript's primary concurrency model relies on a single-threaded event loop, which differs significantly from the multi-threading models common in native development.1 This module will help bridge these conceptual gaps, introducing JavaScript's paradigms and syntax relevant to React Native.

-   For Web Developers (React): You likely have a good grasp of JavaScript and possibly React itself. Consider this module a valuable reinforcement of core ES6+ concepts. Pay close attention to the detailed explanations and any nuances highlighted, particularly in the Background Bridge notes, as even familiar concepts can have subtle differences in the context of React Native or deeper engine mechanics.

-   For Web Developers (Angular): Your JavaScript background is a great starting point. Be aware that common patterns might differ. For instance, Angular heavily utilizes RxJS Observables for asynchronous operations, whereas React (and therefore React Native) often relies more directly on Promises and the async/await syntax.37 This module focuses on the standard JavaScript features essential for React Native, preparing you for React-specific concepts in later modules.

Learning Objectives

Upon completing this module, you will be able to:

-   Declare variables using let and const and explain their scope (block, function, global) and hoisting behavior.

-   Identify and differentiate between JavaScript's primitive data types (string, number, bigint, boolean, undefined, null, symbol) and the Object type, explaining primitive immutability.

-   Apply common JavaScript operators (assignment, comparison, arithmetic, logical, ternary, typeof) to manipulate and evaluate data.

-   Implement conditional logic using if/else if/else and switch statements, understanding truthy/falsy values.

-   Control program flow using loop structures (for, while, do...while, for...of, for...in).

-   Define functions using function declarations, function expressions, and arrow functions, explaining syntax differences and key characteristics like this binding and the arguments object.

-   Explain lexical scoping, function scope, block scope, and the concept of closures, demonstrating their practical applications.

-   Create and manipulate objects and arrays using literal syntax, common methods, property accessors, destructuring assignment, and spread/rest syntax.

-   Explain the JavaScript event loop model and handle asynchronous operations effectively using callbacks, Promises (.then, .catch, .finally, Promise.all), and async/await syntax.

-   Organize code into reusable modules using ES6 import and export statements (named and default).

Prerequisites

-   Basic programming concepts (variables, data types, loops, conditionals, functions) common across most programming languages.

-   Completion of(./module-4-web-essentials.md). (Note: Actual link path TBD)

* * * * *

Section 1: Variables, Data Types, and Operators
------------------------------------------------------------

Variables are the named containers we use to store and reference data within our programs. In JavaScript, the way we declare a variable using keywords like let, const, or the older var has significant consequences for its behavior, specifically its scope (where it can be accessed) and mutability (whether its value can be changed). Modern JavaScript (ES6 and later) strongly favors let and const over var due to their more predictable scoping rules. This section also covers the fundamental data types that variables can hold and the operators used to perform actions on these values.

Variable Declaration (let, const, var comparison)

Understanding the differences between let, const, and var is crucial for writing clean and bug-free JavaScript.

-   let

-   Explanation: Use let to declare variables when you anticipate that their value might need to be reassigned later in your code. The most significant feature of let is its block scope. This means a variable declared with let is only accessible within the specific block of code (enclosed by curly braces {}) where it is defined. This includes blocks associated with if statements, for loops, or even standalone blocks. If let is used outside any function or block, it has global scope. If used inside a function but outside any specific block within that function, it has function scope.84

-   Hoisting & Temporal Dead Zone (TDZ): Variables declared with let are hoisted, meaning the JavaScript engine is aware of the variable declaration before it executes that line of code. However, unlike var, they are not initialized during hoisting. They exist in a state called the "Temporal Dead Zone" (TDZ) from the start of their containing block until the line where they are declared and initialized.84 Attempting to access a let variable within its TDZ results in a ReferenceError. This behavior encourages declaring variables before using them, leading to more organized code. This contrasts sharply with var, which is hoisted and automatically initialized to undefined, potentially masking errors where a variable is used before its intended assignment.84

-   Mutability: Variables declared with let are mutable. You can change their value after the initial declaration using the assignment operator (=).84

-   Example (SpeedyMeds Context):\
    JavaScript\
    // Example: Managing patient queue size\
    let patientQueueSize = 10; // Initial queue size

    if (patientQueueSize > 5) {\
      // This block creates its own scope for 'notificationMessage'\
      let notificationMessage = "High patient volume alert!";\
      console.log(notificationMessage); // Output: High patient volume alert!

      // Reassigning 'patientQueueSize' is allowed because it's declared with 'let'\
      patientQueueSize = 15;\
      console.log(`Queue size updated to: ${patientQueueSize}`); // Output: Queue size updated to: 15\
    }

    // Trying to access 'notificationMessage' outside its block scope results in an error\
    // console.log(notificationMessage); // ReferenceError: notificationMessage is not defined

    // 'patientQueueSize' is accessible here because it was declared in the outer scope\
    console.log(`Final queue size: ${patientQueueSize}`); // Output: Final queue size: 15

    // Example of TDZ\
    try {\
      // console.log(nextPatientId); // This would throw ReferenceError due to TDZ\
      let nextPatientId = "P124";\
      console.log(`Next patient ID: ${nextPatientId}`); // Output: Next patient ID: P124\
    } catch (e) {\
      console.error(e);\
    }\
    This example demonstrates the block-scoping nature of let. The notificationMessage variable is strictly confined to the if block. Attempting to access it outside throws a ReferenceError. In contrast, patientQueueSize, declared in the outer scope, remains accessible both inside and outside the if block, and its value can be updated because it's mutable. The TDZ example (commented out) shows that accessing nextPatientId before its let declaration would cause a runtime error, enforcing declaration before use.

-   const

-   Explanation: Use const (short for constant) to declare variables whose value is intended to remain fixed after initialization. Like let, const variables are block-scoped, meaning they are only accessible within the {} block where they are defined.84

-   Hoisting & TDZ: const declarations are also hoisted but, like let, are not initialized and reside in the Temporal Dead Zone until the declaration line is executed. Accessing a const variable before its declaration results in a ReferenceError.84

-   Immutability: This is the defining characteristic of const. Variables declared with const must be initialized with a value at the point of declaration, and their value cannot be reassigned afterwards. Attempting to reassign a const variable will result in a TypeError. However, it's crucial to understand that const creates an immutable binding, not necessarily an immutable value. If a const variable holds an object or an array, the object's properties or the array's elements can still be modified. What const prevents is assigning a completely new object or array (or any other value) to that variable.84

-   Example (SpeedyMeds Context):\
    JavaScript\
    // Example: Defining a constant configuration value\
    const MAX_PRESCRIPTIONS_PER_PAGE = 20;

    // Attempting to reassign MAX_PRESCRIPTIONS_PER_PAGE will cause an error\
    // MAX_PRESCRIPTIONS_PER_PAGE = 25; // TypeError: Assignment to constant variable.\
    console.log(`Max items per page: ${MAX_PRESCRIPTIONS_PER_PAGE}`); // Output: Max items per page: 20

    // Example: const with an object\
    const pharmacyDetails = {\
      name: "SpeedyMeds",\
      city: "Healthville",\
      operationalHours: { open: "08:00", close: "20:00" }\
    };

    // Modifying a property of the const object IS allowed\
    pharmacyDetails.city = "Wellnesstown";\
    pharmacyDetails.operationalHours.close = "21:00"; // Modifying nested property\
    console.log(pharmacyDetails);\
    // Output: { name: 'SpeedyMeds', city: 'Wellnesstown', operationalHours: { open: '08:00', close: '21:00' } }

    // Attempting to reassign the entire object IS NOT allowed\
    // pharmacyDetails = { name: "QuickMeds" }; // TypeError: Assignment to constant variable.

    // Example: const requires initialization\
    // const API_KEY; // SyntaxError: Missing initializer in const declaration\
    This example illustrates that MAX_PRESCRIPTIONS_PER_PAGE cannot be reassigned. However, the pharmacyDetails object, although declared with const, is mutable. We can change its city property or even nested properties like operationalHours.close. What we cannot do is assign a completely new object to the pharmacyDetails variable. The final commented line shows that const declarations require an initializer.

-   var (Brief Comparison)

-   Explanation: var is the traditional way to declare variables in JavaScript, predating ES6. Its key difference lies in scoping: var variables have function scope or global scope, but not block scope.84 This means a variable declared with var inside an if block or for loop is accessible throughout the entire function (or globally, if declared outside any function). var variables are also hoisted, but unlike let/const, they are initialized with the value undefined upon hoisting.84

-   Recommendation: Due to the potential for confusion caused by function scoping (variables "leaking" out of blocks) and the undefined hoisting behavior, it is strongly recommended to avoid using var in modern JavaScript development. Always prefer let for variables that need reassignment and const for variables that should not be reassigned. This leads to more predictable, maintainable, and less error-prone code.

The introduction of let and const in ES6 was a significant step towards improving JavaScript's robustness. Block scoping aligns JavaScript more closely with the scoping rules found in many other programming languages, such as Java, C++, and Swift, reducing a common source of confusion for developers transitioning from those backgrounds.1 It prevents variables declared within loops or conditional blocks from unintentionally affecting the outer scope, a frequent cause of bugs with var.85 Furthermore, the Temporal Dead Zone associated with let and const enforces the good practice of declaring variables before they are used, unlike var which allows access before declaration (yielding undefined), potentially hiding logical errors.84 By providing more granular control over scope and mutability, let and const enable developers to write code that is easier to reason about, debug, and maintain.

-   Table: let vs. const vs. var Comparison

|

Feature

 |

let

 |

const

 |

var

 |
|

Scope

 |

Block scope, function scope, global scope

 |

Block scope, function scope, global scope

 |

Function scope, global scope

 |
|

Hoisting

 |

Hoisted, but not initialized (TDZ)

 |

Hoisted, but not initialized (TDZ)

 |

Hoisted, initialized to undefined

 |
|

Reassignment

 |

Allowed (mutable)

 |

Not allowed (immutable binding)

 |

Allowed (mutable)

 |
|

Initialization

 |

Optional

 |

Required at declaration

 |

Optional

 |
|

Redeclaration

 |

Not allowed within the same scope

 |

Not allowed within the same scope

 |

Allowed (can lead to issues)

 |

-   Background Bridge: (Native Developers - Java/Kotlin/Swift)\
    Comparison: JavaScript's let and const introduce block scoping ({}), which feels familiar to variable scope within blocks in Java, Kotlin, and Swift. However, remember that JavaScript is dynamically typed.4 You declare variables with let or const without specifying their type (e.g., let count = 10; instead of Java's int count = 10; or Swift's let count: Int = 10;). The type is inferred from the assigned value and can technically change for let variables (though this is often discouraged). The const keyword prevents reassignment of the variable, similar to final in Java or val in Kotlin/let in Swift. A key difference is that const in JavaScript does not make objects or arrays immutable.84 You can still modify the properties of a const object or the elements of a const array. This contrasts with Swift, where value types (structs, enums) declared with let are truly immutable. The older var keyword has function scope, which is less common in modern native languages and can be a source of confusion. 1\
    Key Takeaway: Embrace block scope with let and const as it aligns with your expectations. Use let for variables that will change value, and const for variables that won't be reassigned. Critically, remember that const does not guarantee immutability for object/array contents, only for the variable binding itself. Be mindful of JavaScript's dynamic typing.

Data Types

JavaScript determines the type of data a variable holds dynamically at runtime. Understanding the different types is essential for performing correct operations.

-   Dynamic Typing: JavaScript is a dynamically typed language. This means you don't explicitly declare the type of a variable when you create it. The type is associated with the value the variable holds, and a single variable can hold values of different types throughout the program's execution.4 While this offers flexibility, it also means that type errors (like trying to call a string method on a number) are only caught when the code runs, not during a compilation step.31 This contrasts with statically typed languages like Swift or Kotlin, where types are checked before execution, catching many errors early.31 This runtime type checking in JavaScript underscores the importance of careful coding, thorough testing, and potentially using tools like TypeScript (covered in Module 6) to add a layer of static type safety.\
    JavaScript\
    let medicationStatus = "Active"; // medicationStatus is a string\
    console.log(typeof medicationStatus); // "string"\
    medicationStatus = 1; // Now medicationStatus is a number\
    console.log(typeof medicationStatus); // "number"

-   Primitives: JavaScript has seven primitive data types. Primitives are fundamental data types that are not objects and have no methods themselves (though JavaScript provides wrapper objects that allow methods to be called on primitives).88 A key characteristic of primitives is that they are immutable -- their value cannot be changed once created. Operations that appear to modify a primitive actually create a new primitive value.88

-   string: Used to represent textual data. Strings are enclosed in single quotes ('...'), double quotes ("..."), or backticks (`...` - template literals). Examples: "Lisinopril", 'Take 1 tablet daily', `Patient ID: ${patientId}`. 88

-   number: Represents both integer and floating-point numbers. JavaScript uses the IEEE 754 double-precision 64-bit format for all numbers.90 This includes special values like Infinity, -Infinity, and NaN (Not-a-Number). Examples: 10, 20.5, NaN. 88

-   bigint: Used to represent whole numbers larger than the maximum safe integer value that the number type can accurately represent (253-1). BigInts are created by appending n to the end of an integer literal. Example: 9007199254740991n. 88

-   boolean: Represents a logical entity and can have two values: true or false. Used extensively in conditional logic. 88

-   undefined: Represents a variable that has been declared but has not yet been assigned a value. Functions also return undefined if they don't explicitly return a value. 88

-   null: Represents the intentional absence of any object value. It's often explicitly assigned to indicate that a variable should contain "no value" or "no object". 88

-   symbol: Represents a unique and immutable identifier. Symbols are often used as keys for object properties when you want to avoid name collisions. Example: Symbol('description'). 88

-   Object Type: Anything that is not a primitive is an Object. Objects are collections of key-value pairs, where keys are strings (or Symbols) and values can be any data type, including other objects. Functions and arrays are specialized types of objects in JavaScript. Unlike primitives, objects are mutable, meaning their properties can be changed after creation.4\
    JavaScript\
    const patient = { name: "Bob", age: 45 }; // An object\
    const medications = ["Aspirin", "Metoprolol"]; // An array (special object)\
    function checkVitals() { /*... */ } // A function (special object)

-   Immutability of Primitives vs. Mutability of Objects: It's vital to grasp this distinction.\
    JavaScript\
    let drugName = "Ibuprofen";\
    let upperDrugName = drugName.toUpperCase(); // Creates a NEW string "IBUPROFEN"\
    console.log(drugName); // "Ibuprofen" (original primitive string is unchanged)\
    console.log(upperDrugName); // "IBUPROFEN"

    const patientRecord = { id: "P456", status: "Active" };\
    patientRecord.status = "Discharged"; // Modifies the EXISTING object\
    console.log(patientRecord); // { id: 'P456', status: 'Discharged' }

    In the first part, toUpperCase() doesn't change drugName; it returns a new string. In the second part, assigning to patientRecord.status modifies the object that patientRecord refers to directly.88

-   Table: JavaScript Primitive Data Types

|

Type Name

 |

Description

 |

Example

 |
|

string

 |

Represents textual data

 |

"Warfarin", 'Patient'

 |
|

number

 |

Represents numeric values (integer and floating-point), NaN, Infinity

 |

100, 12.5, NaN

 |
|

bigint

 |

Represents integers larger than the safe range of number

 |

12345678901234567890n

 |
|

boolean

 |

Represents logical values: true or false

 |

true, false

 |
|

undefined

 |

Represents a variable that has not been assigned a value

 |

let x; (value of x)

 |
|

null

 |

Represents the intentional absence of any object value

 |

null

 |
|

symbol

 |

Represents unique, immutable identifiers, often used as object property keys

 |

Symbol('uniqueId')

 |

-   Background Bridge: (Native Developers - Java/Kotlin/Swift)\
    Comparison: JavaScript's dynamic typing is a major departure from the static typing in Java, Kotlin, and Swift.1 Variables don't have a fixed type; their type depends on the value they hold at any given moment. This means you won't get compile-time errors for assigning a string to a variable that previously held a number. JavaScript's number type handles both integers and floating-point values using a single representation (IEEE 754 double-precision), unlike the distinct int, long, float, double types in native languages.90 The distinction between undefined (variable declared but not assigned) and null (intentionally assigned "no value") is specific to JavaScript and requires careful handling.88 Primitives (string, number, boolean, etc.) are immutable, similar to primitives in Java or value types in Swift/Kotlin, but objects (including arrays and functions) are mutable reference types.\
    Key Takeaway: Prepare for the flexibility and potential pitfalls of dynamic typing. Runtime type checking (typeof or other methods) might be necessary in your logic. Understand the nuances of number, null, and undefined. Remember that objects and arrays are mutable, even when assigned to a const variable.

Operators

Operators are special symbols used to perform operations on operands (values or variables).

-   Assignment Operators: Assign values. The basic operator is =, but compound operators like +=, -=, *=, /=, %= combine an arithmetic operation with assignment for conciseness.92\
    JavaScript\
    let currentStock = 100;\
    currentStock -= 20; // Equivalent to currentStock = currentStock - 20; (currentStock is now 80)

-   Comparison Operators: Compare two values and return a boolean (true or false).

-   Strict Equality (===) and Inequality (!==): These operators check for equality without performing type coercion. They compare both the value and the type. It is strongly recommended to use strict comparison operators to avoid unexpected behavior caused by type coercion.92

-   Loose Equality (==) and Inequality (!=): These operators do perform type coercion before comparing values. This can lead to non-intuitive results (e.g., 0 == false is true, null == undefined is true). Avoid these unless you have a specific reason and fully understand the coercion rules.92

-   Relational Operators: >, <, >=, <=. These compare the magnitude of operands (numerically or lexicographically for strings).92

JavaScript\
const requiredDosage = 10;\
let patientDosage = "10";

console.log(patientDosage == requiredDosage);  // true (loose equality performs type coercion)\
console.log(patientDosage === requiredDosage); // false (strict equality checks type) - Recommended!\
console.log(requiredDosage > 5); // true

-   Arithmetic Operators: Perform mathematical calculations: + (addition), - (subtraction), * (multiplication), / (division), % (remainder/modulo), ** (exponentiation - ES2016).92 Also include ++ (increment) and -- (decrement), which can be used prefix (++x) or postfix (x++), affecting the value returned by the expression. Unary negation (-) changes the sign, and unary plus (+) attempts to convert its operand to a number.92\
    JavaScript\
    let quantity = 2;\
    let totalUnits = quantity * 30; // 60\
    let remaining = 100 % 30; // 10\
    console.log(++quantity); // 3 (increments, then returns new value)\
    console.log(quantity++); // 3 (returns current value, then increments)\
    console.log(quantity);   // 4\
    console.log(+"15");      // 15 (unary plus converts string to number)

-   Logical Operators: Combine boolean expressions: && (logical AND), || (logical OR), ! (logical NOT). These operators use short-circuiting evaluation:

-   expr1 && expr2: If expr1 is falsy, expr1 is returned without evaluating expr2. Otherwise, expr2 is evaluated and returned.

-   expr1 | | expr2: If expr1 is truthy, expr1 is returned without evaluating expr2. Otherwise, expr2 is evaluated and returned.

-   !expr: Returns false if expr is truthy, true if expr is falsy.

-   Nullish Coalescing Operator (??) (ES2020): Returns the right-hand operand only if the left-hand operand is null or undefined. Unlike ||, it does not short-circuit on other falsy values like 0, "", or false. This is often safer for providing default values.92

JavaScript\
const hasAllergy = true;\
const needsCaution = hasAllergy && isHighRisk; // Depends on isHighRisk (if hasAllergy is true)

const patientAge = 0;\
const displayAge = patientAge |

| 30; // 30 (|| treats 0 as falsy)

const correctDisplayAge = patientAge?? 30; // 0 (?? only checks for null/undefined)

console.log(displayAge);

console.log(correctDisplayAge);

```

-   Conditional (Ternary) Operator: A shorthand for if/else: condition? valueIfTrue : valueIfFalse.92\
    JavaScript\
    const stock = 5;\
    const stockStatus = stock > 0? "In Stock" : "Out of Stock"; // "In Stock"

-   typeof Operator: Returns a string indicating the type of the unevaluated operand. Useful for basic type checking, but remember typeof null returns "object".92\
    JavaScript\
    console.log(typeof 100); // "number"\
    console.log(typeof "Paracetamol"); // "string"\
    console.log(typeof null); // "object" (historical quirk)\
    console.log(typeof undefined); // "undefined"

-   Operator Precedence: Operators have a specific order of execution (e.g., * before +). Use parentheses () to control the order explicitly or improve readability.93

-   Example (SpeedyMeds Context):\
    JavaScript\
    let stockLevel = 50;\
    const minimumThreshold = 20;\
    const isUrgent = true;

    // Comparison and Logical Operators\
    const needsReorder = stockLevel < minimumThreshold; // false (Comparison: <)\
    const processImmediately = needsReorder |

| isUrgent; // true (Logical OR: ||)

// Ternary Operator\
const orderPriority = processImmediately? "High" : "Normal"; // "High"

// Arithmetic and Assignment Operators\
let orderQuantity = orderPriority === "High"? 50 : 0; // Uses strict equality (===)\
const itemCost = 15.50;\
let totalCost = orderQuantity * itemCost; // 775 (Arithmetic: *)\
totalCost += 5.00; // Add shipping cost (Assignment: +=) -> 780

// typeof Operator\
console.log(`Needs Reorder: ${needsReorder} (Type: ${typeof needsReorder})`); // boolean\
console.log(`Order Priority: ${orderPriority} (Type: ${typeof orderPriority})`); // string\
console.log(`Total Cost: ${totalCost} (Type: ${typeof totalCost})`); // number

// Nullish Coalescing\
const patientNotes = null;\
const displayNotes = patientNotes?? "No notes available."; // "No notes available."\
console.log(`Notes: ${displayNotes}`);\
```\
This example demonstrates various operators in a pharmacy context. `needsReorder` uses the less than operator (`<`). `processImmediately` uses the logical OR (`||`) to combine `needsReorder` with `isUrgent`. The ternary operator (`? :`) sets the `orderPriority`. Strict equality (`===`) is used to check the priority. Arithmetic (`*`) and compound assignment (`+=`) operators calculate the `totalCost`. The `typeof` operator checks the data types of variables. Finally, nullish coalescing (`??`) provides a default value for `patientNotes` only if it's `null` or `undefined`.

-   Table: Common JavaScript Operators

|

Operator

 |

Name

 |

Example

 |
|

=

 |

Assignment

 |

x = 5

 |
|

+=

 |

Addition Assignment

 |

x += 2 (i.e., x = x + 2)

 |
|

-=

 |

Subtraction Assignment

 |

x -= 2

 |
|

*=

 |

Multiplication Assignment

 |

x *= 2

 |
|

/=

 |

Division Assignment

 |

x /= 2

 |
|

===

 |

Strict Equality

 |

a === b

 |
|

!==

 |

Strict Inequality

 |

a!== b

 |
|

>

 |

Greater Than

 |

a > b

 |
|

<

 |

Less Than

 |

a < b

 |
|

>=

 |

Greater Than or Equal To

 |

a >= b

 |
|

<=

 |

Less Than or Equal To

 |

a <= b

 |
|

&&

 |

Logical AND

 |

x && y

 |
|

`

 |

`

 |

Logical OR

 |
|

y`

 |
|

!

 |

Logical NOT

 |

!x

 |
|

??

 |

Nullish Coalescing

 |

a?? b

 |
|

++

 |

Increment

 |

++x or x++

 |
|

--

 |

Decrement

 |

--x or x--

 |
|

+

 |

Addition / Unary Plus

 |

a + b or +x

 |
|

 |

Subtraction / Unary Negation

 |

a - b or -x

 |
|

*

 |

Multiplication

 |

a * b

 |
|

/

 |

Division

 |

a / b

 |
|

%

 |

Remainder

 |

a % b

 |
|

**

 |

Exponentiation

 |

a ** b

 |
|

?:

 |

Conditional (Ternary)

 |

cond? val1 : val2

 |
|

typeof

 |

Typeof

 |

typeof x

 |

Official Documentation Link Box

-   (<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types>) 4

-   (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators) 92

-   [MDN: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)  93

* * * * *

Section 2: Control Flow
------------------------------------

Control flow statements are essential constructs that allow us to direct the execution path of our program based on certain conditions or to repeat blocks of code multiple times. They enable decision-making and iteration, forming the backbone of program logic. JavaScript provides standard conditional statements (if/else, switch) and various looping statements (for, while, do...while, for...of, for...in).

Conditional Statements

Conditional statements execute different blocks of code depending on whether a specified condition evaluates to true or false.

-   if/else if/else

-   Syntax & Usage: The if statement executes a block of code if its condition is true. It can be followed by zero or more else if blocks, each with its own condition, checked only if the preceding if or else if conditions were false. An optional final else block executes if none of the preceding if or else if conditions were true.94 The structure ensures that at most one block among the if, else ifs, and else is executed.

-   Block Statements: It is strongly recommended to always enclose the code following if, else if, and else in curly braces {}. While JavaScript allows omitting braces for single statements, doing so can lead to ambiguity, hard-to-spot bugs (especially with nested conditionals), and reduced code readability.94

-   Truthy/Falsy Values: JavaScript conditions evaluate expressions based on their "truthiness". Values that are considered false in a boolean context are called "falsy". The specific falsy values are: false, 0 (zero), "" (empty string), null, undefined, and NaN (Not-a-Number). All other values, including any object (even empty ones like {} or ``), non-empty strings, and non-zero numbers, are considered "truthy" and will satisfy an if condition.94 Understanding this distinction is crucial for writing correct conditional logic.

-   Example (SpeedyMeds Context):\
    JavaScript\
    const medication = { name: "Lisinopril", quantity: 0, refillsRemaining: 0 };\
    let statusMessage = "";

    // Check refill status first\
    if (medication.refillsRemaining > 0) {\
      // This block executes if refillsRemaining is truthy (non-zero)\
      statusMessage = `${medication.name} has ${medication.refillsRemaining} refills left.`;\
    } else if (medication.quantity > 0) {\
      // This block executes if refillsRemaining is falsy (0) AND quantity is truthy (non-zero)\
      statusMessage = `${medication.name} has no refills left, but ${medication.quantity} units remaining. Contact doctor for renewal.`;\
    } else {\
      // This block executes if both refillsRemaining and quantity are falsy (0)\
      statusMessage = `No ${medication.name} remaining and no refills left. Prescription needed.`;\
    }\
    console.log(statusMessage);\
    // Output: No Lisinopril remaining and no refills left. Prescription needed.

    This code checks the status of a medication. First, it checks refillsRemaining. If that's greater than 0 (truthy), the first message is set. If not (falsy, i.e., 0), it proceeds to the else if and checks quantity. If quantity is greater than 0 (truthy), the second message is set. If both refillsRemaining and quantity are 0 (falsy), the final else block is executed, setting the "prescription needed" message. This demonstrates how the flow progresses through the conditions until one evaluates to true, or the final else is reached.

-   Table: Truthy vs. Falsy Values

|

Falsy Values

 |

Truthy Values

 |
|

false

 |

true

 |
|

0 (zero)

 |

Any non-zero number (e.g., 1, -10, 0.5)

 |
|

"" or '' (empty string)

 |

Any non-empty string (e.g., "hello", "false")

 |
|

null

 |

Any object (including empty objects {} and empty arrays ``)

 |
|

undefined

 |\
 |
|

NaN (Not-a-Number)

 |\
 |

-   switch

-   Syntax & Usage: The switch statement evaluates a single expression and matches its value against a series of case value: labels. When a match is found, the code block associated with that case is executed. The break statement is crucial; without it, execution will "fall through" to the next case block(s) regardless of whether their values match. An optional default: case handles situations where none of the specific case values match the expression.94

-   Comparison: switch performs comparisons using strict equality (===), meaning both the value and the type must match between the expression and the case value:.94

-   Example (SpeedyMeds Context):\
    JavaScript\
    const prescriptionStatus = "Filled"; // Could be "Filled", "Cancelled", "Pending", "Error"\
    let actionRequired = "";\
    let requiresPharmacist = false;

    switch (prescriptionStatus) {\
      case "Pending":\
        actionRequired = "Pharmacist review required.";\
        requiresPharmacist = true;\
        break; // Prevents fall-through to "Filled"\
      case "Filled":\
        actionRequired = "Ready for pickup.";\
        requiresPharmacist = false;\
        break; // Prevents fall-through to "Cancelled"\
      case "Cancelled":\
        actionRequired = "Contact patient regarding cancellation.";\
        requiresPharmacist = true;\
        break; // Prevents fall-through to default\
      case "Error":\
        console.error("Error processing prescription!");\
        // Fall-through intended to default case\
      default: // Handles "Error" and any other unexpected status\
        actionRequired = "Unknown status - investigate.";\
        requiresPharmacist = true;\
        // No break needed if default is the last case\
    }\
    console.log(`Status: ${prescriptionStatus} - Action: ${actionRequired} - Pharmacist Needed: ${requiresPharmacist}`);\
    // Output: Status: Filled - Action: Ready for pickup. - Pharmacist Needed: false\
    This example determines the required action based on a prescriptionStatus. The switch statement compares prescriptionStatus strictly against each case. Because the status is "Filled", the code associated with case "Filled": executes, setting actionRequired and requiresPharmacist. The break statement then exits the switch. If break were omitted after case "Filled":, execution would incorrectly continue into case "Cancelled":. The default case catches any status not explicitly listed, including the "Error" case due to the intentional fall-through (lack of break).

-   Background Bridge: (Native Developers - Java/Kotlin/Swift)\
    Comparison: JavaScript's if/else structure is syntactically almost identical to Java, Kotlin, and Swift. The main difference lies in condition evaluation. While native languages typically require strict boolean expressions (true or false), JavaScript uses truthy/falsy evaluation.94 Values like 0, null, undefined, "", and NaN are treated as false, while all other values (including objects and non-empty arrays) are treated as true. This can be convenient but also a source of bugs if not handled carefully. The switch statement 94 also looks familiar, but remember that JavaScript's case comparison uses strict equality (===) and requires explicit break statements to prevent fall-through, which might differ from the default behavior or syntax (e.g., Swift's switch doesn't fall through by default).\
    Key Takeaway: Be acutely aware of JavaScript's truthy/falsy rules when writing if conditions. Always use break statements within switch cases unless fall-through is explicitly intended.

Looping Statements

Looping statements allow code blocks to be executed repeatedly based on certain criteria.

-   for loop

-   Syntax & Usage: The traditional for loop (for (initialization; condition; final-expression) {... }) provides fine-grained control over iteration.94 The initialization part runs once before the loop starts (e.g., let i = 0). The condition is checked before each iteration (e.g., i < 10); if true, the loop body runs, otherwise the loop terminates. The final-expression runs after each iteration (e.g., i++). This loop is best suited when the number of iterations is known beforehand or depends on a simple counter.

-   Example:\
    JavaScript\
    console.log("Administering medication doses:");\
    const totalDoses = 5;\
    for (let doseNumber = 1; doseNumber <= totalDoses; doseNumber++) {\
      console.log(`Administering dose ${doseNumber} of ${totalDoses}.`);\
    }\
    // Output: Logs messages for doses 1 through 5.\
    This loop initializes doseNumber to 1, continues as long as doseNumber is less than or equal to totalDoses, and increments doseNumber after each iteration.

-   while loop

-   Syntax & Usage: The while loop (while (condition) {... }) executes its body as long as the condition evaluates to true.94 The condition is checked before each iteration. This is ideal when the number of iterations is not known in advance, but depends on a condition that changes within the loop. It's crucial to ensure the condition eventually becomes false to prevent infinite loops.

-   Example:\
    JavaScript\
    let remainingRefills = 3;\
    console.log("Processing available refills...");\
    while (remainingRefills > 0) {\
      console.log(`Refill processed. ${remainingRefills - 1} refills left.`);\
      remainingRefills--; // Modify the condition variable inside the loop\
    }\
    console.log("No refills remaining.");\
    // Output: Logs messages for refills 3, 2, 1, then the final message.\
    The loop continues as long as remainingRefills is greater than 0. The variable is decremented inside the loop, eventually making the condition false and terminating the loop.

-   do...while loop

-   Syntax & Usage: The do...while loop (do {... } while (condition);) is similar to while, but the condition is checked after the loop body executes.94 This guarantees that the loop body runs at least once, even if the condition is initially false.

-   Example:\
    JavaScript\
    let attempts = 0;\
    let pinEnteredCorrectly = false;\
    console.log("Attempting pharmacist PIN verification...");\
    do {\
      attempts++;\
      console.log(`Attempt ${attempts}...`);\
      // Simulate PIN check - let's say it's correct on the 2nd attempt\
      if (attempts === 2) {\
        pinEnteredCorrectly = true;\
        console.log("PIN verified.");\
      } else {\
        console.log("Incorrect PIN.");\
      }\
    } while (!pinEnteredCorrectly && attempts < 3); // Check condition after the block

    if (!pinEnteredCorrectly) {\
        console.log("Verification failed after 3 attempts.");\
    }\
    // Output: Logs attempt 1 (incorrect), attempt 2 (correct), PIN verified.\
    The loop body runs once (attempt 1). Then the condition (!pinEnteredCorrectly && attempts < 3) is checked. If true, it loops again. This continues until the PIN is correct or attempts reach 3.

-   for...of loop

-   Syntax & Usage: The for...of loop (for (const element of iterable) {... }) provides a modern, clean way to iterate over the values of iterable objects, such as Arrays, Strings, Maps, and Sets.94 It abstracts away index management and directly gives you each element in sequence. This is generally the preferred method for iterating over array elements.

-   Example (SpeedyMeds Context):\
    JavaScript\
    const medications =;\
    console.log("Medications in current prescription:");\
    for (const med of medications) {\
      // 'med' holds the actual string value from the array in each iteration\
      console.log(`- ${med}`);\
    }\
    // Output: Lists each medication on a new line prefixed with '- '.\
    This loop iterates through the medications array. In each iteration, the med variable holds the current medication string (e.g., "Lisinopril 10mg"), making the code concise and focused on the data itself.

-   for...in loop

-   Syntax & Usage: The for...in loop (for (const key in object) {... }) iterates over the enumerable property names (keys) of an object.94 It's primarily used for inspecting the properties of plain objects. It is not recommended for iterating over Arrays because:

1.  It iterates over keys (which are strings, even for array indices) rather than values.

2.  It may iterate over properties in an unexpected order.

3.  It can include inherited properties from the object's prototype chain, not just the object's own properties. If you must use for...in, often you'll pair it with Object.prototype.hasOwnProperty.call(object, key) to check if the property belongs directly to the object.

-   Example (SpeedyMeds Context):\
    JavaScript\
    const patientProfile = {\
      patientId: "P7890",\
      name: "Jane Smith",\
      dateOfBirth: "1990-01-20",\
      allergies:\
    };\
    console.log("Patient Profile Properties:");\
    for (const propertyKey in patientProfile) {\
      // 'propertyKey' holds the property name (string) in each iteration\
      // e.g., "patientId", "name", "dateOfBirth", "allergies"\
      if (Object.prototype.hasOwnProperty.call(patientProfile, propertyKey)) {\
        // Access the value using bracket notation\
        console.log(`  ${propertyKey}: ${patientProfile[propertyKey]}`);\
      }\
    }\
    // Output: Lists each property name and its corresponding value.\
    This loop iterates through the keys of the patientProfile object. Inside the loop, propertyKey holds the name of the property (like "name"), and we use bracket notation patientProfile[propertyKey] to access the corresponding value. The hasOwnProperty check ensures we only log properties directly defined on patientProfile, ignoring any potentially inherited ones.

-   break and continue

-   Explanation: These statements provide control within loops. break immediately terminates the innermost loop it's contained within, transferring execution to the statement following the loop.96 continue skips the rest of the current iteration of the loop and proceeds to the next iteration (checking the condition again in for/while loops).96

-   Example:\
    JavaScript\
    const inventoryItems =;\
    console.log("Checking inventory...");\
    for (const item of inventoryItems) {\
      if (item === "EXPIRED_ITEM") {\
        console.log(`Found expired item: ${item}. Stopping check.`);\
        break; // Exit the loop entirely\
      }\
      if (item === "Ibuprofen") {\
        console.log(`Skipping check for common item: ${item}.`);\
        continue; // Go to the next item without logging "Item OK"\
      }\
      console.log(`Item OK: ${item}`);\
    }\
    console.log("Inventory check finished.");\
    // Output:\
    // Checking inventory...\
    // Item OK: Aspirin\
    // Skipping check for common item: Ibuprofen.\
    // Found expired item: EXPIRED_ITEM. Stopping check.\
    // Inventory check finished.\
    When "EXPIRED_ITEM" is encountered, break stops the loop. When "Ibuprofen" is encountered, continue skips the "Item OK" log and moves to the next item.

Choosing the correct looping construct is important for code clarity and correctness. The introduction of for...of in ES6 significantly improved array iteration, making it the preferred choice over traditional for loops (which risk index errors) and for...in loops (which are unsuitable for arrays due to iterating over keys and potential prototype pollution).94 Using for...of clearly signals the intent to iterate over the values of an iterable collection, leading to more readable and robust code. for...in remains appropriate for its specific purpose: iterating over the keys of an object. while and do...while are best reserved for situations where the number of iterations depends on a condition evaluated during the loop's execution.

Official Documentation Link Box

-   [MDN: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)  94

-   [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)  96

* * * * *

Section 3: Functions
---------------------------------

Functions are a cornerstone of JavaScript, allowing you to group sequences of statements into reusable units. They enable code organization, abstraction, and modularity. Functions can accept input values (parameters), perform specific tasks or calculations using those inputs and other variables accessible within their scope, and optionally return an output value. Modern JavaScript offers several ways to define functions, each with distinct syntax and behavioral characteristics.

Defining Functions

-   Function Declarations

-   Syntax: This is the traditional way to define a named function using the function keyword, followed by the function name, parentheses for parameters, and curly braces for the function body.97\
    JavaScript\
    function calculateDosage(weightKg, dosePerKg) {\
      if (typeof weightKg!== 'number' |

| typeof dosePerKg!== 'number' |

| weightKg <= 0 |

| dosePerKg <= 0) {

return 0; // Return 0 or throw an error for invalid input

}

// Simple calculation for demonstration

const totalDosage = weightKg * dosePerKg;

return totalDosage;

}

* **Hoisting:** Function declarations are fully *hoisted*.84 This means the entire function definition (name and body) is conceptually moved to the top of its containing scope (function or global) by the JavaScript engine *before* the code is executed. Consequently, you can call a function declared this way *before* its actual definition appears in the source code.javascript

// Calling the function before its definition in the code

const patientWeight = 70; // kg

const dosageRate = 10; // mg/kg

const requiredDose = calculateDosage(patientWeight, dosageRate);

console.log(Required dose for ${patientWeight}kg patient: ${requiredDose}mg); // Works! Output: 700mg

    // The actual function definition appears later\
    function calculateDosage(weightKg, dosePerKg) {\
      //... (implementation as above)...\
      return weightKg * dosePerKg;\
    }\
    ```\
    Hoisting allows for a certain flexibility in code organization, such as defining utility functions at the bottom of a file while calling them earlier.

-   Function Expressions

-   Syntax: A function expression defines a function as part of a larger expression, typically an assignment to a variable.97 The function itself can be anonymous (most common) or named. Named function expressions are useful for recursion or clearer stack traces during debugging.\
    JavaScript\
    // Anonymous function expression\
    const getPatientGreeting = function(patientName) {\
      if (!patientName) {\
        return "Welcome to SpeedyMeds.";\
      }\
      return `Hello, ${patientName}. Welcome to SpeedyMeds.`;\
    };

    // Named function expression (name 'generateReport' primarily for internal use/debugging)\
    const createReport = function generateReport(data) {\
      console.log("Generating report...");\
      //... report generation logic...\
      return `Report generated with ${data.length} entries.`;\
    };

-   Hoisting: Function expressions are not hoisted in the same way as declarations. If you use var to declare the variable, the variable declaration is hoisted and initialized to undefined. If you use let or const, the variable declaration is hoisted but remains in the Temporal Dead Zone (TDZ) until the assignment line.97 In either case, the function itself is only assigned to the variable when the execution reaches that line. Therefore, you cannot call a function expression before its definition in the code.\
    JavaScript\
    // This would cause an error:\
    // console.log(getPatientGreeting("Alice")); // If using const/let: ReferenceError (TDZ)\
                                            // If using var: TypeError (getPatientGreeting is undefined)

    const getPatientGreeting = function(patientName) {\
      //... (implementation as above)...\
      return `Hello, ${patientName}. Welcome to SpeedyMeds.`;\
    };\
    console.log(getPatientGreeting("Alice")); // Works now\
    This behavior enforces a top-down code flow for function definitions.

-   Arrow Functions (ES6)

-   Syntax: Arrow functions provide a more concise syntax for writing function expressions, introduced in ES6.97 They are particularly well-suited for simple, inline functions.

-   Basic syntax: (param1, param2) => { statements }

-   Single parameter (parentheses optional): param => { statements }

-   No parameters: () => { statements }

-   Single expression body (implicit return, no curly braces needed): (param1, param2) => expression

JavaScript\
// Implicit return for a single expression\
const isMedicationExpired = (expiryDateString) => new Date(expiryDateString) < new Date();

// Explicit return with a block body\
const formatPrescription = (med, qty, instructions) => {\
  if (!med ||!qty ||!instructions) {\
    return "Invalid prescription data.";\
  }\
  const formattedString = `Medication: ${med}, Quantity: ${qty}, Instructions: ${instructions}`;\
  // Example processing: convert to uppercase\
  return formattedString.toUpperCase();\
};

// No parameters\
const getCurrentTimestamp = () => Date.now();

// Single parameter\
const logMessage = message => console.log(message);

-   Hoisting: Arrow functions behave like function expressions regarding hoisting -- the variable holding the arrow function follows var/let/const hoisting rules, but the function definition itself is not hoisted.97

-   this Binding (Lexical this): This is a crucial difference. Arrow functions do not have their own this context. Instead, they inherit the this value from the enclosing lexical scope where the arrow function was defined.97 This behavior avoids common problems with this encountered in traditional functions, especially when used as callbacks within methods or in asynchronous code.

-   arguments Object: Arrow functions also do not have their own arguments object.97 If you need to access all arguments passed to an arrow function, you must use rest parameters (...args).\
    JavaScript\
    // Example demonstrating lexical 'this' (conceptual - requires object context)\
    /*\
    const patientMonitor = {\
      patientId: 'P123',\
      checkStatusRegular: function() {\
        setTimeout(function() {\
          // 'this' here is likely the global object (window) or undefined (strict mode), NOT patientMonitor\
          console.log('Regular function this:', this.patientId); // undefined or error\
        }, 100);\
      },\
      checkStatusArrow: function() {\
        setTimeout(() => {\
          // 'this' here is inherited from checkStatusArrow's scope, which is patientMonitor\
          console.log('Arrow function this:', this.patientId); // P123\
        }, 100);\
      }\
    };\
    patientMonitor.checkStatusRegular();\
    patientMonitor.checkStatusArrow();\
    */

    // Example using rest parameters instead of 'arguments'\
    const logMedicationBatch = (...medications) => {\
      console.log("Logging batch:", medications); // 'medications' is a true array\
      // console.log(arguments); // ReferenceError: arguments is not defined\
    };\
    logMedicationBatch("Aspirin", "Loratadine", "Omeprazole");\
    // Output: Logging batch: [ 'Aspirin', 'Loratadine', 'Omeprazole' ]\
    The lexical this behavior makes arrow functions very predictable when dealing with context, which is why they are widely used in frameworks like React.

Function Parameters & Arguments

-   Default Parameters (ES6): You can provide default values for function parameters directly in the function signature. The default value is used if an argument for that parameter is not provided during the function call, or if the value undefined is explicitly passed.\
    JavaScript\
    function recordPatientVisit(patientId, visitType = "Routine Checkup") {\
      console.log(`Recording visit for ${patientId}. Type: ${visitType}`);\
    }

    recordPatientVisit("P456"); // Output: Recording visit for P456. Type: Routine Checkup\
    recordPatientVisit("P789", "Consultation"); // Output: Recording visit for P789. Type: Consultation\
    recordPatientVisit("P101", undefined); // Output: Recording visit for P101. Type: Routine Checkup

-   Rest Parameters (ES6): Using the ... syntax as the last parameter in a function definition allows you to capture an indefinite number of remaining arguments passed to the function into a single, true array.97 This is the modern replacement for the older, array-like arguments object (which is not a real array and isn't available in arrow functions).\
    JavaScript\
    function logMedicationInteractions(primaryMed, interactionCheckDate,...secondaryMeds) {\
      console.log(`Checking interactions for primary medication: ${primaryMed}`);\
      console.log(`Check Date: ${interactionCheckDate}`);\
      if (secondaryMeds.length > 0) {\
        // secondaryMeds is a real array, we can use array methods like join()\
        console.log(`With secondary medications: ${secondaryMeds.join(', ')}`);\
      } else {\
        console.log("No secondary medications listed.");\
      }\
    }

    logMedicationInteractions("Warfarin", "2024-01-15", "Aspirin", "Ibuprofen", "Ginkgo Biloba");\
    // Output:\
    // Checking interactions for primary medication: Warfarin\
    // Check Date: 2024-01-15\
    // With secondary medications: Aspirin, Ibuprofen, Ginkgo Biloba

    logMedicationInteractions("Lisinopril", "2024-01-16");\
    // Output:\
    // Checking interactions for primary medication: Lisinopril\
    // Check Date: 2024-01-16\
    // No secondary medications listed.

Scope Recap (Function vs. Block Scope)

As a reminder from Section 1, functions create their own scope. Variables declared with var inside a function are scoped to that entire function, regardless of any blocks ({}) they might be inside. In contrast, variables declared with let or const are scoped to the nearest enclosing block ({}), which could be the function block itself or a smaller block like an if statement or for loop body.87 This block scoping is generally preferred for its predictability.

Closures

Closures are a fundamental and powerful concept in JavaScript, stemming directly from how lexical scoping works.

-   Definition & Lexical Environment: A closure occurs when a function "remembers" and continues to have access to variables from its lexical environment (its parent scope(s)) even after that parent scope has finished executing.104 Essentially, the function carries a reference to its "birthplace" scope.

-   Mechanism: Every time a function is defined in JavaScript, a closure is created. If this function accesses variables from its outer scope(s), the closure maintains a live link to those variables.87 These outer variables are not garbage collected (removed from memory) as long as the inner function that references them still exists and could potentially be called.87 This allows the inner function to read and even modify those outer variables later on.

-   Practical Examples:

-   Data Encapsulation/Privacy: Closures are the standard way to emulate private variables in JavaScript before the introduction of private class fields. An outer function defines variables and returns one or more inner functions. These inner functions have access to the outer variables (which are inaccessible from outside), providing controlled access.\
    JavaScript\
    function createPatientRecord(name, initialCondition) {\
      let condition = initialCondition; // 'condition' is "private" to the returned object\
      let visitCount = 0;

      return {\
        recordVisit: function(newCondition) {\
          visitCount++;\
          condition = newCondition; // Modify the "private" variable\
          console.log(`<span class="math-inline">\{name\} visited \(</span>{visitCount}). Condition updated to: ${condition}`);\
        },\
        getVisitCount: function() {\
          return visitCount; // Read the "private" variable\
        },\
        getCurrentCondition: function() {\
          return condition; // Read the "private" variable\
        }\
        // Cannot access 'condition' or 'visitCount' directly from outside\
      };\
    }

    const patientJane = createPatientRecord("Jane Doe", "Stable");\
    patientJane.recordVisit("Improving"); // Output: Jane Doe visited (1). Condition updated to: Improving\
    patientJane.recordVisit("Stable");   // Output: Jane Doe visited (2). Condition updated to: Stable\
    console.log(patientJane.getCurrentCondition()); // Output: Stable\
    // console.log(patientJane.condition); // undefined\
    Here, condition and visitCount are only accessible via the methods returned by createPatientRecord. The returned methods form closures over the outer scope containing these variables.87

-   Function Factories: Closures enable the creation of "function factories" -- functions that generate and return other functions, often customized based on the factory's arguments.\
    JavaScript\
    function createDosageCalculator(dosePerKg) {\
      // The returned function 'closes over' dosePerKg\
      return function(weightKg) {\
        if (weightKg <= 0) return 0;\
        return weightKg * dosePerKg;\
      }\
    }

    const calculatePediatricDose = createDosageCalculator(5); // Creates a function with dosePerKg = 5 stored in its closure\
    const calculateAdultDose = createDosageCalculator(10);  // Creates a function with dosePerKg = 10 stored in its closure

    console.log(`Pediatric dose for 15kg: ${calculatePediatricDose(15)}mg`); // Output: 75mg\
    console.log(`Adult dose for 70kg: ${calculateAdultDose(70)}mg`); // Output: 700mg\
    Each returned function remembers the specific dosePerKg value it was created with.87

-   Callbacks and Asynchronous Operations: Closures are essential for callbacks used in asynchronous operations like setTimeout, setInterval, or event listeners. The callback function, when executed later, needs to access variables that were present when it was defined.\
    JavaScript\
    function scheduleRefillReminder(patientName, medication, delayMs) {\
      setTimeout(function() {\
        // This callback function forms a closure over patientName and medication\
        console.log(`Reminder for ${patientName}: Time to refill ${medication}.`);\
      }, delayMs);\
    }

    scheduleRefillReminder("Bob", "Lisinopril", 2000); // Logs the reminder after 2 seconds\
    The function inside setTimeout remembers patientName and medication even though scheduleRefillReminder finishes executing almost immediately.87  Loop Pitfall: A common mistake involves creating functions inside a loop that uses var. Because var is function-scoped, all created functions close over the same variable, which will hold its final value after the loop finishes.\
    JavaScript\
    // Incorrect behavior with var\
    for (var i = 1; i <= 3; i++) {\
      setTimeout(function() {\
        console.log(`Processing item (var): ${i}`); // Logs 4, three times!\
      }, i * 100);\
    }

    // Correct behavior with let (creates a new binding per iteration)\
    for (let j = 1; j <= 3; j++) {\
      setTimeout(function() {\
        console.log(`Processing item (let): ${j}`); // Logs 1, 2, 3 correctly\
      }, j * 100);\
    }\
    Using let solves this because it creates a new block-scoped variable j for each loop iteration, and each timeout callback closes over its respective j.86

-   Performance/Memory Implications: Because closures keep references to their outer scopes, these scopes cannot be garbage collected as long as the closure is reachable. If a closure inadvertently holds references to large data structures or DOM elements that are no longer needed elsewhere, it can lead to memory leaks.86 Creating many closures in tight loops can also have performance implications. While modern JavaScript engines are highly optimized for closures, it's good practice to be mindful of what variables are being closed over and to release references (e.g., set variables holding the closure function to null) when they are no longer needed, especially in long-running applications.

Closures are not an optional or obscure feature; they are a direct and fundamental consequence of JavaScript's lexical scoping rules.87 Every function potentially creates a closure. Understanding this mechanism is essential because it enables many powerful and common programming patterns. Data encapsulation via the module pattern (discussed in Section 6), the ability to create configurable functions (function factories), and the correct handling of state in asynchronous callbacks all rely heavily on the behavior of closures.87 Recognizing when a closure is formed and what variables it captures is key to writing effective JavaScript.

-   Background Bridge: (Native Developers - Java/Kotlin/Swift)\
    Comparison: The concept of closures---a function capturing its surrounding environment---is likely familiar. Java lambdas can capture final or effectively final local variables. Kotlin lambdas can capture and modify variables from their enclosing scope.120 Swift closures also capture variables from their surrounding context by reference by default.87 JavaScript closures operate similarly, maintaining a live link to the outer variables, allowing both reading and modification. The main differences often arise from JavaScript's dynamic typing and historical scoping rules with var, which could make certain closure behaviors (like the loop issue) seem less intuitive initially compared to the more explicit capture semantics or stricter scoping in native languages.\
    Key Takeaway: JavaScript closures provide a powerful way for inner functions to maintain access to their outer scope's variables. This is similar to lambda/closure capture in native languages. Be mindful that this reference is live, and be aware of potential memory implications if closures unintentionally keep large objects alive.

-   The this Keyword (Brief Introduction)

-   Explanation: this is a special keyword in JavaScript that refers to the execution context of a function. Unlike variables, the value of this is not determined by where the function is defined (lexical scope) but rather by how the function is called.99 This dynamic nature makes this a common source of confusion for developers new to JavaScript.

-   Function Calls vs. Arrow Functions:

-   Regular Functions (Declarations/Expressions): The value of this is set dynamically at call time.

-   Standalone Call: If called simply like myFunction(), this usually refers to the global object (window in browsers) in non-strict mode, or undefined in strict mode ("use strict";).99

-   Method Call: If called as a method of an object (myObject.myMethod()), this refers to the object the method was called on (myObject).99

-   Constructor Call: If called with new (new MyFunction()), this refers to the newly created instance object.99

-   Explicit Binding: Using methods like .call(), .apply(), or .bind(), you can explicitly set the value of this.99

-   Arrow Functions: Arrow functions behave differently. They do not have their own this binding. They lexically inherit this from the surrounding function or scope in which they were defined.97 The value of this inside an arrow function is fixed at the time of its creation and cannot be changed by how it's called or by using .call(), .apply(), or .bind().

-   Relevance to React Native: Understanding this was historically very important when using class-based components in React/React Native, especially for binding event handlers. In modern React Native development, which heavily favors functional components and Hooks, the use of this is much less frequent. Arrow functions are commonly used for callbacks and event handlers within functional components precisely because their lexical this binding avoids the complexities associated with traditional function this behavior. We will revisit this as needed in the context of React components later in the course.

Official Documentation Link Box

-   [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)  97

-   [MDN: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)  98

-   [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)  87

-   [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)  99

[Exercise 5.1: Function Practice](https://codesandbox.io/p/sandbox/module-5-exercise-1-function-practice-starter-9p6g7v)

-   Objective: Practice defining functions using different syntaxes (declaration, expression, arrow) and using closures.

-   Task: Implement the following functions related to pharmacy operations within the provided CodeSandbox environment. Follow the instructions in the README.md file in the sandbox.

1.  A function declaration calculateRefillDate(lastFillDate, daysSupply) that takes a starting date string (e.g., "2024-01-15") and the number of days supply, returning a new date string representing the refill date.

2.  A function expression assigned to a variable getMedicationInfo that takes a medication object (e.g., { name: 'Lisinopril', dosage: '10mg', form: 'Tablet' }) and returns a formatted string like "Lisinopril 10mg (Tablet)".

3.  An arrow function isHighPriority that takes a patient object (e.g., { name: 'Jane Doe', age: 75, conditions: ['Hypertension', 'Diabetes'] }) and returns true if the patient is over 65 or has more than 2 conditions, false otherwise.

4.  A function factory createInventoryChecker(minimumStock) that returns a closure function. The closure function takes currentStock and returns true if currentStock is less than minimumStock, and false otherwise. Test it by creating checkers for different minimum stock levels.

-   Tool: CodeSandbox (Link points to a starter template).

* * * * *

Section 4: Objects and Arrays
------------------------------------------

Objects and Arrays are JavaScript's primary tools for structuring and managing collections of data. Objects are versatile collections of key-value pairs, ideal for representing entities with named characteristics (properties) and associated actions (methods). Arrays provide ordered lists, perfect for storing sequences of items. Mastering their creation, manipulation, and modern ES6+ features like destructuring and spread syntax is fundamental for effective JavaScript development, especially in data-intensive applications like React Native apps often are.

Objects

Objects are dynamic collections of properties.

-   Object Literals: The most common way to create objects is using the literal syntax: curly braces {} containing zero or more key-value pairs, separated by commas. Keys are usually strings (quoted if they contain spaces or special characters, otherwise quotes are optional for valid identifiers) or Symbols. Values can be any JavaScript type, including other objects or functions.91\
    JavaScript\
    const patient = {\
      "patient-id": "P12345", // Quoted key\
      name: "John Appleseed",\
      dateOfBirth: "1985-03-14",\
      isActive: true,\
      address: { // Nested object\
        street: "123 Health St",\
        city: "Wellville"\
      }\
    };

-   Properties & Methods: Properties store the data associated with an object. When a property's value is a function, it's called a method, representing an action the object can perform.91

-   Accessing Properties: You can access properties using:

-   Dot Notation (.): object.propertyName. This is the most common way but only works if the property key is a valid JavaScript identifier (no spaces, doesn't start with a number, etc.).132

-   Bracket Notation (``): object['propertyName']. This is more versatile. It's required if the key is not a valid identifier (e.g., contains spaces, hyphens) or if the key is stored in a variable.132

JavaScript\
console.log(patient.name); // "John Appleseed"\
console.log(patient["patient-id"]); // "P12345" (Bracket notation needed)\
console.log(patient.address.city); // "Wellville" (Accessing nested property)

const keyToAccess = "dateOfBirth";\
console.log(patient); // "1985-03-14" (Accessing via variable)

-   Adding/Modifying/Deleting Properties: Objects are mutable. You can add new properties, change existing ones, or remove them after creation.91\
    JavaScript\
    patient.primaryDoctor = "Dr. Smith"; // Add new property\
    patient.isActive = false; // Modify existing property\
    delete patient.dateOfBirth; // Remove property\
    console.log(patient);

-   Shorthand Syntax (ES6): ES6 introduced convenient shorthands for object literals:

-   Method Shorthand: Define methods without the function keyword.134\
    JavaScript\
    const calculator = {\
      add(a, b) { // Shorthand for add: function(a, b)\
        return a + b;\
      }\
    };

-   Property Value Shorthand: If a variable name in the surrounding scope matches the desired property key, you can just include the variable name.134\
    JavaScript\
    const medicationName = "Amoxicillin";\
    const dosage = 500; // mg\
    const medicationRecord = { medicationName, dosage, type: "Antibiotic" };\
    // Equivalent to: { medicationName: medicationName, dosage: dosage, type: "Antibiotic" }\
    console.log(medicationRecord);

-   Object Destructuring (ES6): This powerful syntax provides an easy way to extract properties from objects into distinct variables.137

-   Basic Extraction: Extract properties into variables with the same name.\
    JavaScript\
    const { name, isActive } = patient;\
    console.log(name); // "John Appleseed"\
    console.log(isActive); // false

-   Renaming Variables: Extract a property into a variable with a different name using a colon (:).\
    JavaScript\
    const { "patient-id": patientId, address: patientAddress } = patient;\
    console.log(patientId); // "P12345"\
    console.log(patientAddress); // { street: '123 Health St', city: 'Wellville' }

-   Default Values: Provide a default value using = if the property might be missing or undefined in the object.\
    JavaScript\
    const { primaryDoctor = "Unassigned", insuranceProvider } = patient;\
    console.log(primaryDoctor); // "Dr. Smith" (from the object)\
    console.log(insuranceProvider); // undefined (property doesn't exist)

    const { emergencyContact = { name: "N/A", phone: "N/A" } } = patient;\
    console.log(emergencyContact); // { name: 'N/A', phone: 'N/A' }

-   Rest Properties (...): Collect all remaining enumerable own properties into a new object. Must be the last element in the pattern.134\
    JavaScript\
    const { name: pName, isActive: pIsActive,...restOfPatientData } = patient;\
    console.log(pName); // "John Appleseed"\
    console.log(restOfPatientData);\
    // Output: { 'patient-id': 'P12345', address: { street: '123 Health St', city: 'Wellville' }, primaryDoctor: 'Dr. Smith' }

-   Nested Destructuring: Extract properties from nested objects directly.\
    JavaScript\
    const { address: { city } } = patient;\
    console.log(city); // "Wellville"

-   Example (SpeedyMeds Context - Prescription Object):\
    JavaScript\
    const medicationName = "Atorvastatin";\
    const dosage = 20; // mg\
    const patientInfo = { name: "Jane Doe", id: "P789", dob: "1975-11-02" };

    const prescription = {\
      prescriptionId: `RX${Math.floor(Math.random() * 10000)}`,\
      medicationName, // Property shorthand\
      dosage,         // Property shorthand\
      patient: patientInfo, // Assigning another object\
      quantity: 90,\
      refills: 2,\
      instructions: "Take 1 tablet daily in the evening.",

      // Method shorthand to generate label text\
      getLabelText() {\
        return `${this.medicationName} ${this.dosage}mg\nPatient: <span class="math-inline">\{this\.patient\.name\}\\n</span>{this.instructions}`;\
      },

      // Method to update refills\
      updateRefills(newCount) {\
        if (typeof newCount === 'number' && newCount >= 0) {\
          this.refills = newCount;\
          console.log(`Refills updated to ${this.refills}`);\
        } else {\
          console.warn("Invalid refill count provided.");\
        }\
      }\
    };

    // Using the object\
    console.log("--- Prescription Label ---");\
    console.log(prescription.getLabelText());\
    console.log("------------------------");\
    prescription.updateRefills(1); // Output: Refills updated to 1

    // Destructuring for specific needs\
    const {\
      medicationName: med,\
      quantity,\
      patient: { name: patientName, dob: patientDOB }, // Nested destructuring\
      refills = 0, // Default value if refills was missing\
    ...otherDetails // Rest property\
    } = prescription;

    console.log(`Dispensing: <span class="math-inline">\{med\} \(</span>{quantity} units) for ${patientName} (DOB: ${patientDOB}). Refills left: ${refills}`);\
    // Output: Dispensing: Atorvastatin (90 units) for Jane Doe (DOB: 1975-11-02). Refills left: 1

    console.log("Other prescription details:", otherDetails);\
    // Output: Other prescription details: { prescriptionId: 'RX...', dosage: 20, instructions: '...', getLabelText:, updateRefills: }

    This comprehensive example showcases object literal creation using shorthand properties. It includes methods defined with shorthand syntax (getLabelText, updateRefills). It demonstrates accessing properties via dot notation (prescription.getLabelText()) and calling methods. Finally, it extensively uses destructuring to extract various pieces of information: basic extraction (quantity), renaming (medicationName: med), nested extraction (patient: { name: patientName, dob: patientDOB }), default values (refills = 0), and collecting remaining properties using the rest syntax (...otherDetails).

-   Background Bridge: (Native Developers - Java/Kotlin/Swift)\
    Comparison: JavaScript objects created via literals {} are fundamentally different from class instances in statically-typed OOP languages.1 Think of them more like Maps (Java), Maps or data classes (Kotlin), or Dictionaries (Swift) -- flexible containers for key-value pairs. JavaScript doesn't require a class definition to create an object. While ES6 introduced class syntax, it's primarily syntactic sugar over JavaScript's underlying prototype-based inheritance model.139 In prototypal inheritance, objects inherit directly from other objects (their prototype), forming a chain, rather than classes inheriting from other classes. This is a core difference from the classical inheritance you're used to. Object destructuring, however, might feel somewhat similar to destructuring declarations in Kotlin or pattern matching features in Swift for extracting values from data structures.\
    Key Takeaway: Treat JavaScript objects as dynamic dictionaries initially. Don't expect the strictness of classes unless you explicitly use the ES6 class syntax, and even then, be aware that the underlying inheritance mechanism (prototypes) is different.

Arrays

Arrays are ordered lists of values, indexed starting from zero.

-   Array Literals: The simplest way to create an array is using square brackets `` containing comma-separated values. Arrays can hold elements of mixed data types.135\
    JavaScript\
    const patientIds = ["P123", "P456", "P789"];\
    const mixedData = [10, "Metformin", true, null, { dose: 500 }];

-   Accessing Elements: Use bracket notation with the zero-based index: array[index].135\
    JavaScript\
    console.log(patientIds); // "P123"\
    console.log(mixedData[1]); // "Metformin"\
    console.log(patientIds[2]); // undefined (index out of bounds)

-   Common Properties/Methods:

-   .length: Returns the number of elements in the array.

-   .push(item1,...): Adds one or more elements to the end of the array and returns the new length.

-   .pop(): Removes the last element from the array and returns that element.

-   .shift(): Removes the first element from the array and returns that element.

-   .unshift(item1,...): Adds one or more elements to the beginning of the array and returns the new length.

-   .slice(start, end): Returns a shallow copy of a portion of an array into a new array object. The original array is not modified. end index is exclusive.

-   .splice(start, deleteCount, item1,...): Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Modifies the original array. (Note: This is a brief overview. Array methods like map, filter, reduce are covered separately below).

-   Array Destructuring (ES6): Similar to object destructuring, but uses positions rather than keys.137

-   Basic Extraction: Assign elements to variables based on their index.\
    JavaScript\
    const [firstPatient, secondPatient] = patientIds;\
    console.log(firstPatient); // "P123"\
    console.log(secondPatient); // "P456"

-   Skipping Elements: Use commas to skip elements you don't need.\
    JavaScript\
    const [ , , thirdPatient] = patientIds;\
    console.log(thirdPatient); // "P789"

-   Default Values: Provide defaults for elements that might not exist.\
    JavaScript\
    const = patientIds;\
    console.log(p4); // "P_DEFAULT"

-   Rest Elements (...): Collect remaining elements into a new array. Must be the last element.137\
    JavaScript\
    const [primaryId,...secondaryIds] = patientIds;\
    console.log(primaryId); // "P123"\
    console.log(secondaryIds); // ["P456", "P789"]

-   Spread Syntax (...) (ES6): Used to expand iterable elements (like arrays or strings) into places where multiple elements/arguments are expected.144

-   In Array Literals: Create new arrays by combining or copying existing ones.\
    JavaScript\
    const highPriorityPatients = ["P123", "P456"];\
    const regularPatients = ["P789", "P101"];\
    const waitingList = ["P112"];

    // Combine arrays\
    const allPatients = [...highPriorityPatients,...regularPatients,...waitingList];\
    console.log(allPatients); // ["P123", "P456", "P789", "P101", "P112"]

    // Create a shallow copy\
    const patientsCopy = [...allPatients];\
    console.log(patientsCopy);

    // Add elements immutably\
    const newPatientList = [...allPatients, "P113"];\
    console.log(newPatientList);

-   In Function Calls: Pass elements of an array as individual arguments to a function.\
    JavaScript\
    function logPatientIds(id1, id2, id3) {\
      console.log("Logging IDs:", id1, id2, id3);\
    }\
    const idsToLog = ["P123", "P456", "P789"];\
    logPatientIds(...idsToLog); // Equivalent to logPatientIds("P123", "P456", "P789")\
    // Output: Logging IDs: P123 P456 P789

-   Example (SpeedyMeds Context - Managing Medication List):\
    JavaScript\
    let formulary =;

    // Add a new medication\
    formulary.push("Omeprazole");\
    console.log("Added Omeprazole:", formulary);

    // Remove the first medication\
    const removedMed = formulary.shift();\
    console.log(`Removed ${removedMed}:`, formulary); // Removed Lisinopril

    // Combine with another list using spread\
    const newMedications = ["Atorvastatin", "Amlodipine"];\
    const updatedFormulary = [...formulary,...newMedications];\
    console.log("Updated Formulary:", updatedFormulary);\
    // Output:

    // Destructuring the updated formulary\
    const [firstMed, secondMed,...otherMeds] = updatedFormulary;\
    console.log(`First two meds: ${firstMed}, ${secondMed}`); // Metformin, Simvastatin\
    console.log(`Other meds count: ${otherMeds.length}`); // 3

    // Using spread in a function call (e.g., logging)\
    function displayMeds(...medList) { // Rest parameter\
      console.log("Displaying Meds:");\
      medList.forEach((med, index) => console.log(`${index + 1}. ${med}`));\
    }\
    displayMeds(...updatedFormulary); // Spread syntax\
    // Output: Logs each medication with a number\
    This example demonstrates adding (push) and removing (shift) elements from an array. It uses the spread syntax (...) effectively to create a new, combined array (updatedFormulary) without modifying the original arrays. Array destructuring is then used to easily extract the first two elements and gather the rest into otherMeds. Finally, spread syntax is used again to pass the elements of updatedFormulary as individual arguments to the displayMeds function, which uses a rest parameter to collect them.

Common Array Iteration Methods (Functional Approach)

Beyond traditional loops, JavaScript provides powerful array methods that align with functional programming principles. These methods often take a callback function and iterate over the array, performing transformations or calculations without directly mutating the original array.

-   .forEach()

-   Explanation: Executes a provided callback function once for each element in the array. It's primarily used for its side effects (e.g., logging each element, updating an external counter, making an API call for each item). forEach itself returns undefined, so it cannot be chained with other array methods like map or filter that expect an array return value.38

-   Syntax: array.forEach((element, index, array) => { /* perform action with element */ }); The index and array parameters are optional.

-   Example:\
    JavaScript\
    const pendingPrescriptions = [ { id: 101, drug: "Lisinopril" }, { id: 102, drug: "Metformin" } ];\
    console.log("Processing pending prescriptions:");\
    pendingPrescriptions.forEach(order => {\
      // Side effect: logging to console\
      console.log(` - Processing order ID: ${order.id} for ${order.drug}`);\
      // Could also call another function here, e.g., sendToVerificationQueue(order);\
    });\
    // Output: Logs processing message for each order.\
    Here, forEach iterates through each prescription object, logging a message for each one. No new array is created.

-   .map()

-   Explanation: This is one of the most frequently used array methods. It iterates over each element, applies a transformation function (the callback) to it, and returns a new array containing the transformed elements in the same order.135 The original array remains unchanged. It's essential for creating new data structures based on existing arrays.

-   Syntax: const newArray = array.map((element, index, array) => { return transformation(element); }); The index and array parameters are optional. Arrow functions with implicit returns (array.map(element => element * 2)) are common for simple transformations.

-   Example (SpeedyMeds Context):\
    JavaScript\
    const prescriptions =;\
    // Create an array containing only the drug names\
    const drugNames = prescriptions.map(p => p.drug);\
    console.log(drugNames); // Output:

    // Create an array of objects with drug name and quantity doubled\
    const doubledQuantityInfo = prescriptions.map(p => ({\
      name: p.drug,\
      doubledQty: p.quantity * 2\
    }));\
    console.log(doubledQuantityInfo);\
    // Output:\
    The first map extracts the drug property from each object. The second map transforms each prescription object into a new object with a different structure, demonstrating map's power in reshaping data.

-   .filter()

-   Explanation: Iterates through an array and returns a new array containing only the elements for which the provided callback function returns a truthy value.135 It's used to select a subset of elements based on a condition, without modifying the original array.

-   Syntax: const filteredArray = array.filter((element, index, array) => { return condition(element); }); The callback must return true to include the element or false to exclude it. index and array are optional.

-   Example (SpeedyMeds Context):\
    JavaScript\
    const inventory = [\
      { name: "Aspirin", stock: 100, isControlled: false },\
      { name: "Oxycodone", stock: 15, isControlled: true },\
      { name: "Amoxicillin", stock: 50, isControlled: false },\
      { name: "Fentanyl Patch", stock: 5, isControlled: true }\
    ];

    // Filter for items with low stock (< 20)\
    const lowStockItems = inventory.filter(item => item.stock < 20);\
    console.log("Low Stock Items:", lowStockItems);\
    // Output: Low Stock Items: [ { name: 'Oxycodone', stock: 15, isControlled: true }, { name: 'Fentanyl Patch', stock: 5, isControlled: true } ]

    // Filter for controlled substances\
    const controlledSubstances = inventory.filter(item => item.isControlled);\
    console.log("Controlled Substances:", controlledSubstances);\
    // Output: Controlled Substances: [ { name: 'Oxycodone', stock: 15, isControlled: true }, { name: 'Fentanyl Patch', stock: 5, isControlled: true } ]\
    These examples show how filter selects specific items based on conditions related to stock and isControlled properties, creating new arrays containing only the matching items.

-   .reduce()

-   Explanation: This is arguably the most versatile array iteration method. It executes a "reducer" callback function on each element of the array, passing the result of the previous execution (the accumulator) to the next execution, ultimately resulting in a single output value.135 This single value can be anything -- a number (like a sum or count), a string, an object, or even another array. It's powerful for summarizing or transforming an array into a completely different structure.

-   Syntax: const result = array.reduce((accumulator, currentValue, currentIndex, array) => { /* return new accumulator value */ }, initialValue);

-   accumulator: The value resulting from the previous callback invocation. On the first call, it's the initialValue if provided, otherwise it's the first element of the array.

-   currentValue: The current element being processed.

-   currentIndex (Optional): The index of the currentValue.

-   array (Optional): The array reduce was called upon.

-   initialValue (Optional): A value to use as the first argument to the first call of the callback. If omitted, the first element of the array is used as the initial accumulator, and iteration starts from the second element. Providing initialValue is often crucial, especially when working with objects or expecting a specific type for the result, or when the array might be empty.163

-   Example (SpeedyMeds Context):\
    JavaScript\
    const orderCosts = [15.50, 22.00, 8.75, 35.25];

    // Calculate the total cost of the order\
    const totalOrderCost = orderCosts.reduce((sum, cost) => {\
      console.log(`Accumulator: ${sum}, Current Cost: ${cost}`); // To show the process\
      return sum + cost;\
    }, 0); // Start the sum at 0\
    console.log(`Total cost: $${totalOrderCost.toFixed(2)}`); // Output: Total cost: $81.50

    // Group prescriptions by medication name\
    const prescriptionsList =;\
    const groupedByDrug = prescriptionsList.reduce((groups, prescription) => {\
      const drug = prescription.drug;\
      if (!groups[drug]) {\
        groups[drug] =; // Initialize array if drug key doesn't exist\
      }\
      groups[drug].push(prescription); // Add prescription to the group\
      return groups; // Return the modified groups object for the next iteration\
    }, {}); // Start with an empty object as the initial value\
    console.log("Grouped Prescriptions:", groupedByDrug);\
    /* Output:\
    Grouped Prescriptions: {\
      Lisinopril: [ { id: 1, drug: 'Lisinopril', patient: 'Alice' }, { id: 3, drug: 'Lisinopril', patient: 'Charlie' } ],\
      Metformin:\
    }\
    */\
    The first example uses reduce to sum the orderCosts, starting with an initialValue of 0. The second, more complex example uses reduce to transform an array of prescription objects into an object where prescriptions are grouped by drug name. It starts with an empty object ({}) as the initialValue and builds up the groups within the reducer function.

The array methods map, filter, and reduce are fundamental tools in the functional programming style within JavaScript.135 They allow developers to express complex data transformations and manipulations in a declarative way, often resulting in code that is more concise and easier to understand than equivalent imperative code using traditional for loops. These methods operate immutably by default, returning new arrays (map, filter) or values (reduce) rather than modifying the original array, which helps prevent side effects and makes code easier to reason about. Chaining these methods together (e.g., data.filter(...).map(...)) creates elegant data processing pipelines. While potentially slightly less performant than highly optimized for loops in some micro-benchmarks 154, their benefits in readability and maintainability often outweigh minor performance differences in typical application code.

-   Background Bridge: (Web Developers - React/Angular)\
    Comparison: As a web developer using React or Angular, you are likely very familiar with these functional array methods. map is ubiquitous in React for transforming data arrays into lists of JSX elements.135 filter is commonly used for selecting data based on criteria before rendering or processing.135 reduce might be used for more complex state transformations or calculations.135 In Angular, while RxJS operators often handle stream transformations, these standard array methods are still essential for manipulating static array data within components or services.146\
    Key Takeaway: This section reinforces the importance and utility of these core methods. Ensure you have a solid grasp of how map, filter, and especially reduce (with its accumulator and initial value) work, as they form the basis for many data manipulation tasks in React Native development, just as they do in web development.

Official Documentation Link Box

-   [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)  136

-   [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)  135

-   [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)  137

-   (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 144

-   [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  145

-   [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)  160

-   [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)  163

[Exercise 5.2: Data Manipulation](https://codesandbox.io/p/sandbox/module-5-exercise-2-data-manipulation-starter-hrx6k4)

-   Objective: Practice manipulating arrays and objects using methods, destructuring, and spread syntax.

-   Task: Given an array of patient objects (each with id, name, medications array, lastVisitDate), perform the following operations within the provided CodeSandbox environment. Follow the instructions in the README.md file.

1.  Use filter to create a new array containing only patients whose lastVisitDate (provided as a string like "2023-06-15") was more than 180 days ago from today.

2.  Use map to create an array of strings, where each string is formatted as: "Patient: [Name] - Meds: [Number of Medications]".

3.  Use reduce to find the patient object with the most medications listed in their medications array.

4.  Use array and object destructuring to extract the name and the second medication from the medications array of the first patient in the original list. Assign default values in case the patient or the second medication doesn't exist.

5.  Use spread syntax to create a new patient object based on an existing patient, adding a nextAppointment property with a future date string. Ensure the original patient object is not modified.

-   Tool: CodeSandbox (Link points to a starter template).

* * * * *

Section 5: Asynchronous JavaScript
-----------------------------------------------

JavaScript, by its nature, is single-threaded, meaning it can only execute one piece of code at a time.165 In environments like web browsers or React Native applications, the main thread is also responsible for handling user interface updates and responding to user interactions. If a long-running operation (like fetching data from a network, reading a large file, or performing complex calculations) were executed synchronously on this main thread, the entire application would freeze, becoming unresponsive until the operation completed.

To overcome this limitation and maintain responsiveness, JavaScript heavily relies on asynchronous programming. Asynchronous operations allow the program to initiate a task that might take time (like an API call) and then continue executing other code without waiting for that task to finish. When the task eventually completes, a mechanism is needed to handle its result or error. This non-blocking behavior is orchestrated by the Event Loop, a core concept in JavaScript's concurrency model.166 We'll explore the Event Loop conceptually and then delve into the primary patterns for managing asynchronous operations: Callbacks, Promises, and the modern async/await syntax.

The Event Loop (Conceptual Overview)

The Event Loop is the mechanism that enables JavaScript's non-blocking asynchronous behavior despite being single-threaded. It coordinates the execution of code, the handling of events, and the processing of asynchronous callbacks.

-   Single Thread: JavaScript code execution happens on a single main thread.165

-   Components: The model involves several key parts working together:

-   Call Stack: This is where synchronous function calls are tracked and executed (Last-In, First-Out).165 When you call a function, it's pushed onto the stack; when it returns, it's popped off. The stack must be empty for asynchronous tasks to run.

-   Web APIs / Native Modules / Node APIs: The surrounding environment (browser, React Native's bridge, Node.js) provides APIs for operations that can run outside the main JavaScript thread (e.g., setTimeout, fetch, native device interactions, file system access). These APIs handle the operation in the background.165

-   Callback Queue (Task Queue / Macrotask Queue): When an asynchronous operation managed by a Web API/Native Module completes, its associated callback function (e.g., the function passed to setTimeout or an event handler) is placed in the Callback Queue (also called the Task Queue or Macrotask Queue). These tasks wait here in First-In, First-Out order.165

-   Microtask Queue: This queue has higher priority than the Callback Queue. Callbacks associated with Promises (specifically, the functions passed to .then(), .catch(), .finally()) and functions queued via queueMicrotask() are placed here.165

-   Event Loop: This is the conductor. It continuously checks if the Call Stack is empty.

1.  If the Call Stack is empty, it first processes the Microtask Queue. It takes all currently queued microtasks and executes them one by one until the Microtask Queue is empty. Importantly, if executing a microtask queues another microtask, that new microtask will also be executed before moving on.174

2.  Only after the Microtask Queue is empty does the Event Loop check the Callback Queue (Task Queue).

3.  If the Callback Queue has tasks, the Event Loop takes the oldest task (FIFO), pushes its callback function onto the (now empty) Call Stack, and the engine executes it.168

4.  Once that task finishes and the Call Stack is empty again, the loop repeats from step 1 (checking the Microtask Queue again).

-   Rendering: In browser environments, rendering updates (painting changes to the screen) typically happen after a task from the Callback Queue has finished and the Microtask Queue has been emptied, but before the next task from the Callback Queue begins.177 This ensures that long-running JavaScript doesn't block rendering indefinitely, but also means a single long task can still cause noticeable UI freezes.

-   Visualization:\
    (Consider embedding a simplified diagram here or linking to external visualizers)\
    A helpful mental model is a continuous cycle: Execute current code -> Run all microtasks -> Run one task from callback queue -> Repeat.

-   Background Bridge: (Native Developers - Android/iOS)\
    Comparison: JavaScript's concurrency model, centered around a single thread and an event loop, is fundamentally different from the native multi-threading capabilities you might be used to on Android (e.g., AsyncTask, ThreadPoolExecutor, Kotlin Coroutines interacting with Dispatchers) or iOS (e.g., Grand Central Dispatch - GCD, OperationQueue).7 While native platforms have a dedicated main/UI thread (like Android's Looper-based main thread 8 or iOS's main RunLoop 13) that must not be blocked, JavaScript achieves non-blocking behavior for I/O operations (network, file system) by delegating them to the environment (browser, Node.js, React Native bridge) and using the event loop to manage callbacks when these operations complete. You don't typically create and manage background threads directly in JavaScript application code; instead, you rely on asynchronous APIs like Promises and async/await. The concepts of distinct Macrotask (Callback) and Microtask queues, with the latter having priority, are specific to the JavaScript event loop.\
    Key Takeaway: Concurrency in JavaScript is cooperative and event-driven, not preemptive via multiple threads you manage directly. Long-running synchronous JavaScript code will block the single main thread, just like blocking the UI thread in native development is detrimental. Therefore, mastering asynchronous patterns (Promises, async/await) is absolutely essential for building responsive applications.

Callbacks

The earliest pattern for handling asynchronous operations in JavaScript.

-   Explanation: A callback is simply a function passed as an argument to another function, with the intention of being executed ("called back") at a later time, typically when an asynchronous operation completes.172\
    JavaScript\
    // Conceptual Example\
    function fetchPatientDataFromServer(patientId, callback) {\
      console.log(`Fetching data for ${patientId}...`);\
      // Simulate network delay\
      setTimeout(() => {\
        const success = Math.random() > 0.2; // Simulate success/failure\
        if (success) {\
          const data = { id: patientId, name: "Alice", condition: "Stable" };\
          callback(null, data); // Call back with null error and data\
        } else {\
          const error = new Error("Network error fetching data");\
          callback(error, null); // Call back with error and null data\
        }\
      }, 1000);\
    }

    fetchPatientDataFromServer("P123", (error, data) => {\
      if (error) {\
        console.error("Callback Error:", error.message);\
      } else {\
        console.log("Callback Success:", data);\
      }\
    });

-   Callback Hell: When multiple asynchronous operations need to happen in sequence, relying solely on callbacks leads to deeply nested structures, often called "Callback Hell" or the "Pyramid of Doom". This nesting makes code difficult to read, debug, and manage error handling consistently.165\
    JavaScript\
    // Conceptual Callback Hell\
    /*\
    step1(value1, (error1, result1) => {\
      if (error1) { /* handle error1 */ }\
      else {\
        step2(result1, (error2, result2) => {\
          if (error2) { /* handle error2 */ }\
          else {\
            step3(result2, (error3, result3) => {\
              if (error3) { /* handle error3 */ }\
              else {\
                //...and so on...\
              }\
            });\
          }\
        });\
      }\
    });\
    */\
    Due to these drawbacks, while callbacks are still used in some APIs (especially older Node.js APIs), modern JavaScript heavily favors Promises and async/await.

Promises (ES6)

Promises provide a cleaner, more structured way to handle asynchronous operations and avoid callback hell.

-   Concept: A Promise is an object that acts as a placeholder for a value that will be available later. It represents the eventual result of an asynchronous operation. A Promise is always in one of three states 46:

-   pending: The initial state; the operation hasn't completed yet.

-   fulfilled (or resolved): The operation completed successfully, and the Promise now has a resulting value.

-   rejected: The operation failed, and the Promise has a reason (usually an Error object) for the failure. Once a Promise is fulfilled or rejected, it is considered settled, and its state cannot change again.

-   .then(): This method is attached to a Promise to schedule callback functions for when the Promise is fulfilled. It takes one or two arguments: the first is a callback for fulfillment (receives the resolved value), and the second (optional) is a callback for rejection. Crucially, .then() returns a new Promise.172 This allows chaining multiple .then() calls together to handle sequential asynchronous operations in a much flatter, more readable structure than nested callbacks. The value returned from a .then() callback becomes the resolved value of the promise returned by that .then(). If a callback returns another Promise, the chain waits for that Promise to settle.

-   .catch(): This method is specifically for handling rejected Promises. It takes a single callback function that receives the rejection reason (the error).172 It's syntactic sugar for `.then(undefined, rejectionCallback)

#### Works cited

1.  Java vs JavaScript: What to Choose for Your Project Development in 2023, accessed April 27, 2025, <https://mobisoftinfotech.com/resources/blog/java-vs-javascript>

2.  What is the Difference Between Java and Javascript? - Revelo, accessed April 27, 2025, <https://www.revelo.com/blog/java-vs-javascript>

3.  Java Language vs. JavaScript - The freeCodeCamp Forum, accessed April 27, 2025, <https://forum.freecodecamp.org/t/java-language-vs-javascript/27891>

4.  JavaScript data types and data structures - JavaScript - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures>

5.  Why do I need to specify what type a variable is in a class in Swift? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/24006573/why-do-i-need-to-specify-what-type-a-variable-is-in-a-class-in-swift>

6.  From JS to Swift: Key Differences Every Developer Should Know - DEV Community, accessed April 27, 2025, <https://dev.to/adrian_campos_4e442f872cc/from-js-to-swift-key-differences-every-developer-should-know-10h7>

7.  Is there a scenario where JavaScript's event loop is more efficient than goroutines? - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/golang/comments/1hilb51/is_there_a_scenario_where_javascripts_event_loop/>

8.  All About Looper, MessageQueue, and Handler in Android - Henry Techie, accessed April 27, 2025, <https://namanh11611.github.io/p/looper-message-queue-handler/>

9.  Decoding Handler and Looper in Android, accessed April 27, 2025, <https://krossovochkin.com/posts/2019_12_24_decoding_handler_and_looper_in_android/>

10. The Android Event Loop - mattias - - Niklewski, accessed April 27, 2025, <https://mattias.niklewski.com/2012/09/android_event_loop.html>

11. Android: Looper, Handler, HandlerThread. Part I. - Developer Notes, accessed April 27, 2025, <https://blog.nikitaog.me/android-looper-handler-handlerthread-i/>

12. Best explanation of JavaScript timers, event loop and event queues I've seen - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/programming/comments/9v8qlg/best_explanation_of_javascript_timers_event_loop/>

13. RunLoop | Apple Developer Documentation, accessed April 27, 2025, <https://developer.apple.com/documentation/foundation/runloop>

14. How to Use RunLoop in IOS Applications - HackerNoon, accessed April 27, 2025, <https://hackernoon.com/how-to-use-runloop-in-ios-applications>

15. What is an event loop or run loop? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/3920927/what-is-an-event-loop-or-run-loop>

16. Event Loop. Myths and reality - Frontend Almanac, accessed April 27, 2025, <https://blog.frontend-almanac.com/event-loop-myths-and-reality>

17. What's the difference between main event loop and app's run loop? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/34503463/whats-the-difference-between-main-event-loop-and-apps-run-loop>

18. Try Catch and Throws: Error Handling in Swift - Mahi Garg, accessed April 27, 2025, <https://mahigarg.github.io/blogs/try-catch-and-throws-error-handling-in-swift/>

19. Error Handling - Documentation - Swift.org, accessed April 27, 2025, <https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling/>

20. Try Catch Throw: Error Handling in Swift with Code Examples, accessed April 27, 2025, <https://www.avanderlee.com/swift/try-catch-throw-error-handling/>

21. Swift do-try-catch syntax - error handling - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/30720497/swift-do-try-catch-syntax>

22. Try/Catch vs Throws? : r/learnprogramming - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/learnprogramming/comments/3w3hnc/trycatch_vs_throws/>

23. What is the difference between Swift 2.0 do-try-catch and regular Java/C#/C++ exceptions, accessed April 27, 2025, <https://stackoverflow.com/questions/30740997/what-is-the-difference-between-swift-2-0-do-try-catch-and-regular-java-c-c-ex>

24. Exceptions | Kotlin Documentation, accessed April 27, 2025, <https://kotlinlang.org/docs/exceptions.html>

25. Mastering Exception Handling in Kotlin: A Comprehensive Guide - Bugfender, accessed April 27, 2025, <https://bugfender.com/blog/kotlin-exception-handling/>

26. Kotlin Exception Handling | try, catch, throw and finally - GeeksforGeeks, accessed April 27, 2025, <https://www.geeksforgeeks.org/kotlin-exception-handling-try-catch-throw-and-finally/>

27. How to catch non kotlin exception? - JavaScript, accessed April 27, 2025, <https://discuss.kotlinlang.org/t/how-to-catch-non-kotlin-exception/2404>

28. Handling errors without using a try-catch block using the effective-kotlin way, accessed April 27, 2025, <https://stackoverflow.com/questions/60511904/handling-errors-without-using-a-try-catch-block-using-the-effective-kotlin-way>

29. Kotlin: Beyond the Try/Catch (Exception Handling) - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=ThlFnnaxsuE>

30. Kotlin vs JavaScript: Key Differences for Developers - Mbloging, accessed April 27, 2025, <https://www.mbloging.com/post/kotlin-vs-javascript-a-comprehensive-comparison-for-developers>

31. Static vs. Dynamic Typing - AmorServ, accessed April 27, 2025, <https://amorserv.com/insights/static-vs-dynamic-typing>

32. What is the difference between statically typed and dynamically typed languages?, accessed April 27, 2025, <https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages>

33. Inferred Type and Dynamic typing - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/24598761/inferred-type-and-dynamic-typing>

34. Comparison of programming languages by type system - Wikipedia, accessed April 27, 2025, <https://en.wikipedia.org/wiki/Comparison_of_programming_languages_by_type_system>

35. Type Inference vs. Static/Dynamic Typing - Herb Sutter, accessed April 27, 2025, <https://herbsutter.com/2008/06/20/type-inference-vs-staticdynamic-typing/>

36. 12 Swift errors you should know: Swift exception handling with code examples - Zipy.ai, accessed April 27, 2025, <https://www.zipy.ai/blog/swift-errors>

37. Is there any value in using observables instead of async/await? : r/angular - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/angular/comments/106s0fr/is_there_any_value_in_using_observables_instead/>

38. What is the difference between Promises and Observables? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables>

39. Difference between RxJs async operations and javascript promise or async await, accessed April 27, 2025, <https://stackoverflow.com/questions/57195287/difference-between-rxjs-async-operations-and-javascript-promise-or-async-await>

40. Rxjs vs Promise(Async/Await) and Observable vs Generator | My resume, accessed April 27, 2025, <https://liangjima.com/docs/JavaScript/RXJS/>

41. Observables compared to other techniques - Angular, accessed April 27, 2025, <https://v17.angular.io/guide/comparing-observables>

42. Difference Between "Promise" and "Observable" in Angular | ABP.IO, accessed April 27, 2025, <https://abp.io/community/articles/difference-between-promise-and-observable-in-angular-bxv97pkc>

43. Angular Observable vs Angular Promise: Differences, Uses & More, accessed April 27, 2025, <https://www.infragistics.com/blogs/angular-observable-vs-angular-promise/>

44. Angular Promises Versus Observables | Syncfusion Blogs, accessed April 27, 2025, <https://www.syncfusion.com/blogs/post/angular-promises-vs-observables>

45. Conversion to Promises - RxJS, accessed April 27, 2025, <https://rxjs.dev/deprecations/to-promise>

46. Observable - RxJS, accessed April 27, 2025, <https://rxjs.dev/guide/observable>

47. JavaScript Promises vs. RxJS Observables - Auth0, accessed April 27, 2025, <https://auth0.com/blog/javascript-promises-vs-rxjs-observables/>

48. Using promises instead of observables? : r/Angular2 - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/Angular2/comments/15ydiey/using_promises_instead_of_observables/>

49. JavaScript Promises vs. RxJS Observables - Auth0 Community, accessed April 27, 2025, <https://community.auth0.com/t/javascript-promises-vs-rxjs-observables/36769>

50. How are Observables Different from Promises? | Beginner RXJS Lessons - YouTube, accessed April 27, 2025, <https://m.youtube.com/watch?v=GSI7iyK_ju4&pp=ygUUI3J4anNiZWhhdmlvcnN1YmplY3Q%3D>

51. What is the Difference Between Promises and Observables in Angular ? | GeeksforGeeks, accessed April 27, 2025, <https://www.geeksforgeeks.org/what-is-the-difference-between-promises-and-observables-in-angular/>

52. Understanding RxJS and Observables in Angular: A Beginner-Friendly Guide, accessed April 27, 2025, <https://dev.to/renukapatil/understanding-rxjs-and-observables-in-angular-a-beginner-friendly-guide-ibf>

53. Current Angular trend - Observables or Promises? : r/Angular2 - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/Angular2/comments/1h127u5/current_angular_trend_observables_or_promises/>

54. Promises vs Observables - Angular Tutorial - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=6LeJW5sJp0A>

55. Angular Observable vs Promise: 5 Key Differences You Must Know! - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=LT8pyUwZQhI>

56. Angular Promises Versus Observables - NashTech Blog, accessed April 27, 2025, <https://blog.nashtechglobal.com/angular-promises-versus-observables/>

57. Eager vs. Lazy - Thinkster, accessed April 27, 2025, <https://thinkster.io/tutorials/webinar-observables-for-all/eager-vs-lazy>

58. Difference between promise and observable - DEV Community, accessed April 27, 2025, <https://dev.to/khalid7487/difference-between-promise-and-observable-59o0>

59. Promise vs Observable: A Quick Comparison - DJ Codes, accessed April 27, 2025, <https://deepakjosecodes.com/promise-vs-observable-a-quick-comparison/>

60. Difference between Promises and Observables. - DEV Community, accessed April 27, 2025, <https://dev.to/manthanank/difference-between-promises-and-observables-380e>

61. The Biggest Misconception of PROMISES vs OBSERVABLES : r/Angular2 - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/Angular2/comments/16hl82h/the_biggest_misconception_of_promises_vs/>

62. When to use Promise over observable? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/50269671/when-to-use-promise-over-observable>

63. Angular Observables and Promises: A Practical Guide to Asynchronous Programming - Amazon.com, accessed April 27, 2025, <https://www.amazon.com/Angular-Observables-Promises-Asynchronous-Programming/dp/3384409868>

64. Angular Observables and Promises: A Practical Guide to Asynchronous Programming by Abdelfattah Ragab, Paperback | Barnes & Noble®, accessed April 27, 2025, <https://www.barnesandnoble.com/w/angular-observables-and-promises-abdelfattah-ragab/1146536151?ean=9783384409867>

65. Mastering Angular's Asynchronous Magic: A Guide to Promises, Observables, and Subjects, accessed April 27, 2025, <https://dev.to/chintanonweb/mastering-angulars-asynchronous-magic-a-guide-to-promises-observables-and-subjects-24j7>

66. Asynchronous Programming in Angular Promises vs. Observables - C# Corner, accessed April 27, 2025, <https://www.c-sharpcorner.com/article/asynchronous-programming-in-angular-promises-vs-observables/>

67. Angular development best practices: Observable, Promise and Signals - DEV Community, accessed April 27, 2025, <https://dev.to/soumayaerradi/angular-development-best-practices-observable-promise-and-signals-a9p>

68. Why people still compare Observables as "better" than promise as a primitive? - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/angular/comments/w9ipf4/why_people_still_compare_observables_as_better/>

69. The Biggest Misconception of PROMISES vs OBSERVABLES - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=vdsujUhFMLY>

70. What is the difference between a Promise and Observable? - Daniel Kreider, accessed April 27, 2025, <https://danielk.tech/home/difference-between-a-promise-and-observable>

71. Promises vs Observables in a real world scenario : r/Angular2 - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/Angular2/comments/ida0f3/promises_vs_observables_in_a_real_world_scenario/>

72. What is the difference between Observable and a Subject in rxjs? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/47537934/what-is-the-difference-between-observable-and-a-subject-in-rxjs>

73. Separating Contract and Promise - Scholarship Repository, accessed April 27, 2025, <https://ir.law.fsu.edu/cgi/viewcontent.cgi?article=1084&context=lr>

74. An Animated Intro to RxJS - CSS-Tricks, accessed April 27, 2025, <https://css-tricks.com/animated-intro-rxjs/>

75. CONVERSATION: What's the core differences between the observables/signals approach of Cycle.js and Elm vs React's pseudo FRP manually-triggered branch re-rendering approach? : r/javascript - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/javascript/comments/3zr6i0/conversation_whats_the_core_differences_between/>

76. RxJS sequence equivalent to promise.then()? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/34523338/rxjs-sequence-equivalent-to-promise-then>

77. promises Archives - CSS-Tricks, accessed April 27, 2025, <https://css-tricks.com/tag/promises/>

78. Promises vs Observables - Angular (Tutorial #30) - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=qfKkDEudaRs>

79. Observable.subscribe() vs Promise with async/await [closed] - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/55883785/observable-subscribe-vs-promise-with-async-await>

80. Northrop B-2 Spirit - Wikipedia, accessed April 27, 2025, <https://en.wikipedia.org/wiki/Northrop_B-2_Spirit>

81. Angular Promise vs Observable: Ultimate Differences You Must Know - Albiorix Technology, accessed April 27, 2025, <https://www.albiorixtech.com/blog/angular-promise-vs-observable/>

82. angular - What is the difference between Promises and Observables? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables/53707886>

83. Observables compared to other techniques - Angular, accessed April 27, 2025, <https://angular.io/guide/comparing-observables>

84. Grammar and types - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types>

85. Difference between var, let and const keywords in JavaScript - GeeksforGeeks, accessed April 27, 2025, <https://www.geeksforgeeks.org/difference-between-var-let-and-const-keywords-in-javascript/>

86. What are the potential pitfalls of using closures? | Quiz Interview Questions with Solutions, accessed April 27, 2025, <https://www.greatfrontend.com/questions/quiz/what-are-the-potential-pitfalls-of-using-closures>

87. Closures - JavaScript - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures>

88. Primitive - MDN Web Docs Glossary: Definitions of Web-related terms, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Glossary/Primitive>

89. Primitive - MDN Web Docs Glossary: Definitions of Web-related terms, accessed April 27, 2025, <https://udn.realityripple.com/docs/Glossary/Primitive>

90. JavaScript data types and data structures - JavaScript | MDN - LIA - Laboratory of Advanced Research on Computer Science, accessed April 27, 2025, <https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures.html>

91. Object - MDN Web Docs Glossary: Definitions of Web-related terms - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Glossary/Object>

92. Expressions and operators - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators>

93. Operator precedence - JavaScript - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence>

94. Control flow and error handling - JavaScript - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling>

95. if...else - JavaScript - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else>

96. Loops and iteration - JavaScript - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration>

97. Functions - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions>

98. Arrow function expressions - JavaScript - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>

99. this - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this>

100. JavaScript's this: how it works, where it can trip you up - 2ality, accessed April 27, 2025, <https://2ality.com/2014/05/this.html>

101. Rest parameters - JavaScript - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters>

102. Explain the difference between global scope, function scope, and block scope | Quiz Interview Questions with Solutions - GreatFrontEnd, accessed April 27, 2025, <https://www.greatfrontend.com/questions/quiz/explain-the-difference-between-global-scope-function-scope-and-block-scope>

103. What Is the Scope and Scope Chain of JavaScript? - ExplainThis, accessed April 27, 2025, <https://www.explainthis.io/en/swe/what-is-scope-and-scope-chain>

104. Closure - MDN Web Docs Glossary: Definitions of Web-related terms - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Glossary/Closure>

105. developer.mozilla.org, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures#:~:text=A%20closure%20is%20the%20combination,created%2C%20at%20function%20creation%20time.>

106. Understanding JavaScript Closures: A Deep Dive - GUVI, accessed April 27, 2025, <https://www.guvi.in/blog/understanding-javascript-closures-a-deep-dive/>

107. Master JavaScript Closures: A Guide for Developers - August Infotech, accessed April 27, 2025, <https://www.augustinfotech.com/blogs/deep-dive-into-javascript-closures-practical-use-cases-and-how-they-empower-your-code/>

108. JavaScript Memory Management - Metana, accessed April 27, 2025, <https://metana.io/blog/javascript-memory-management/>

109. Deep Dive into JavaScript Closures: How and When to Use Them - DEV Community, accessed April 27, 2025, <https://dev.to/itsshaikhaj/deep-dive-into-javascript-closures-how-and-when-to-use-them-5c63>

110. Closures In JavaScript - An Outstanding Beginner's Guide - Calibraint, accessed April 27, 2025, <https://www.calibraint.com/blog/closures-in-javascript-for-beginners>

111. Mastering Closures in JavaScript: A Comprehensive Guide - DEV Community, accessed April 27, 2025, <https://dev.to/imranabdulmalik/mastering-closures-in-javascript-a-comprehensive-guide-4ja8>

112. JavaScript Closures -- The Most Misunderstood Concept? - DEV Community, accessed April 27, 2025, <https://dev.to/hijazi313/javascript-closures-the-most-misunderstood-concept-5c2l>

113. Javascript closures performance - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/14974811/javascript-closures-performance>

114. You Don't Know JS Yet: Scope & Closures by Kyle Simpson | Goodreads, accessed April 27, 2025, <https://www.goodreads.com/book/show/52764087-you-don-t-know-js-yet>

115. You Don't Know JS Yet: Scope... by Kyle Simpson [PDF/iPad/Kindle] - Leanpub, accessed April 27, 2025, <https://leanpub.com/sh/YuO0OtIK>

116. You Don't Know JS: Scope & Closures: Simpson, Kyle: 9781449335588 - Amazon.com, accessed April 27, 2025, <https://www.amazon.com/You-Dont-Know-JS-Closures/dp/1449335586>

117. 1\. What Is Scope? - You Don't Know JS: Scope & Closures [Book] - O'Reilly, accessed April 27, 2025, <https://www.oreilly.com/library/view/you-dont-know/9781449335571/ch01.html>

118. You-Dont-Know-JS/scope-closures/ch7.md at 2nd-ed - GitHub, accessed April 27, 2025, <https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md>

119. You-Don-t-Know-JS-Scope-Closures.pdf, accessed April 27, 2025, <https://pepa.holla.cz/wp-content/uploads/2016/08/You-Don-t-Know-JS-Scope-Closures.pdf>

120. Closures in Kotlin | GeeksforGeeks, accessed April 27, 2025, <https://www.geeksforgeeks.org/closures-in-kotlin/>

121. Kotlin-js, dce & closure compiler - JavaScript, accessed April 27, 2025, <https://discuss.kotlinlang.org/t/kotlin-js-dce-closure-compiler/16046>

122. "A closure is a poor man's object"... : r/Kotlin - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/Kotlin/comments/kziv7e/a_closure_is_a_poor_mans_object/>

123. Why Closure is a big deal? : r/ProgrammingLanguages - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/ProgrammingLanguages/comments/1b8hqbc/why_closure_is_a_big_deal/>

124. Javascript closures vs PHP closures, what's the difference? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/7417430/javascript-closures-vs-php-closures-whats-the-difference>

125. Kotlin is even more confusing than js :) - Language Design, accessed April 27, 2025, <https://discuss.kotlinlang.org/t/kotlin-is-even-more-confusing-than-js/7292>

126. Closures | Documentation - Swift.org, accessed April 27, 2025, <https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures/>

127. What is the difference between Swift Closures, Java Closures, and Python Lambda expressions? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/73314736/what-is-the-difference-between-swift-closures-java-closures-and-python-lambda>

128. Closure (computer programming) - Wikipedia, accessed April 27, 2025, <https://en.wikipedia.org/wiki/Closure_(computer_programming)>

129. Is concept of closures in Swift similar to closures in Javascript? - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/24686806/is-concept-of-closures-in-swift-similar-to-closures-in-javascript>

130. Swift Closures Explained: A Comprehensive Guide for iOS Developers - Bugfender, accessed April 27, 2025, <https://bugfender.com/blog/swift-closures/>

131. this - JavaScript | MDN, accessed April 27, 2025, <https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this.html>

132. JavaScript object basics - Learn web development | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics>

133. Function - JavaScript - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function>

134. Object initializer - JavaScript - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer>

135. Array - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array>

136. Working with objects - JavaScript - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects>

137. Destructuring assignment - JavaScript | MDN, accessed April 27, 2025, <https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment.html>

138. Destructuring - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring>

139. How prototypal inheritance is practically different from classical inheritance? - Software Engineering Stack Exchange, accessed April 27, 2025, <https://softwareengineering.stackexchange.com/questions/99251/how-prototypal-inheritance-is-practically-different-from-classical-inheritance>

140. Explain the difference between classical inheritance and prototypal inheritance | Quiz Interview Questions with Solutions - GreatFrontEnd, accessed April 27, 2025, <https://www.greatfrontend.com/questions/quiz/explain-the-difference-between-classical-inheritance-and-prototypal-inheritance>

141. Classical vs. Prototypal Inheritance - DEV Community, accessed April 27, 2025, <https://dev.to/crishanks/classical-vs-prototypal-inheritance-2o5a>

142. Inheritance vs Classical: Is this a succinct explanation? : r/learnjavascript - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/learnjavascript/comments/16y8b2b/inheritance_vs_classical_is_this_a_succinct/>

143. Inheritance and the prototype chain - JavaScript - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain>

144. Spread syntax (...) - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>

145. Array.prototype.map() - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map>

146. Main difference between map and reduce - javascript - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/49934992/main-difference-between-map-and-reduce>

147. Understanding `map`, `filter`, and `reduce` in Kotlin | Siberoloji, accessed April 27, 2025, <https://www.siberoloji.com/understanding-map-filter-and-reduce-in-kotlin/>

148. Collection transformation operations | Kotlin Documentation, accessed April 27, 2025, <https://kotlinlang.org/docs/collection-transformations.html>

149. Map vs Filter vs Reduce - Thinkster, accessed April 27, 2025, <https://thinkster.io/tutorials/100-front-end-interview-questions-challenge/map-vs-filter-vs-reduce>

150. Reading 16: Map, Filter, Reduce - MIT, accessed April 27, 2025, <https://web.mit.edu/6.031/www/sp22/classes/16-map-filter-reduce/>

151. A behind the scenes look at Map, Filter, and Reduce in Swift - Bomberbot, accessed April 27, 2025, <https://www.bomberbot.com/functional-programming/a-behind-the-scenes-look-at-map-filter-and-reduce-in-swift/>

152. Reduce vs Filter and Map - javascript - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/55098746/reduce-vs-filter-and-map>

153. MAP vs REDUCE which I should choose? - javascript - Stack Overflow, accessed April 27, 2025, <https://stackoverflow.com/questions/53100135/map-vs-reduce-which-i-should-choose>

154. Performance of Map, Filter, Reduce, and flatMap vs. for-in loop in Swift - skoumal, accessed April 27, 2025, <https://www.skoumal.com/en/performance-of-built-in-higher-order-functions-map-filter-reduce-and-flatmap-vs-for-in-loop-in-swift/>

155. JavaScript Functional Programming: Map, Filter, & Reduce - DEV Community, accessed April 27, 2025, <https://dev.to/mainulspace/javascript-functional-programming-map-filter-reduce-5g55>

156. JavaScript map, filter and reduce functions explained, with examples - Will Taylor Blog, accessed April 27, 2025, <https://www.willtaylor.blog/javascript-map-filter-reduce/>

157. What's the big deal about filter, map and reduce? : r/webdev - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/webdev/comments/s3aglw/whats_the_big_deal_about_filter_map_and_reduce/>

158. Functional programming in JS using(map, filter and reduce) - DEV Community, accessed April 27, 2025, <https://dev.to/pratham82/functional-programmigng-in-js-using-map-filter-and-reduce-4ogf>

159. Reduce, Map, Filter - Functional Programming in JavaScript - #3 - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=wj_o90NtTcY>

160. Array.prototype.filter() - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter>

161. Filtering collections | Kotlin Documentation, accessed April 27, 2025, <https://kotlinlang.org/docs/collection-filtering.html>

162. Kotlin collection transformation efficiency? - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/Kotlin/comments/79oaya/kotlin_collection_transformation_efficiency/>

163. Array.prototype.reduce() - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce>

164. Why is Kotlin's map-filter-reduce slower than Java's Stream operations on large inputs?, accessed April 27, 2025, <https://stackoverflow.com/questions/48317709/why-is-kotlins-map-filter-reduce-slower-than-javas-stream-operations-on-large>

165. What is An Event Loop in JavaScript? | GeeksforGeeks, accessed April 27, 2025, <https://www.geeksforgeeks.org/what-is-an-event-loop-in-javascript/>

166. JavaScript Event Loop: Everything You Need To Know Explained Simply - DEV Community, accessed April 27, 2025, <https://dev.to/tolobayo/javascript-event-loop-everything-you-need-to-know-explained-in-simple-terms-fg0>

167. The Node.js Event Loop, accessed April 27, 2025, <https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick>

168. JavaScript execution model - MDN Web Docs, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model>

169. Internal Working of Node.js, Event loop and V8 Engine - Divij Sehgal's Blog, accessed April 27, 2025, <https://divijsehgal.hashnode.dev/internal-working-of-nodejs-event-loop-and-v8-engine>

170. A Complete Visual Guide to Understanding the Node.js Event Loop - Builder.io, accessed April 27, 2025, <https://www.builder.io/blog/visual-guide-to-nodejs-event-loop>

171. Inside the Node.js Event Loop: A Deep Dive - DEV Community, accessed April 27, 2025, <https://dev.to/leapcell/inside-the-nodejs-event-loop-a-deep-dive-152d>

172. Using promises - JavaScript | MDN - MDN Web Docs - Mozilla, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises>

173. What is the event loop in JavaScript runtimes? | Quiz Interview Questions with Solutions, accessed April 27, 2025, <https://www.greatfrontend.com/questions/quiz/what-is-event-loop-what-is-the-difference-between-call-stack-and-task-queue>

174. In depth: Microtasks and the JavaScript runtime environment - Web APIs | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth>

175. JavaScript execution model - JavaScript | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop>

176. Using microtasks in JavaScript with queueMicrotask() - Web APIs | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide>

177. Event loop: microtasks and macrotasks - JavaScript.info, accessed April 27, 2025, <https://javascript.info/event-loop>

178. Understanding the Event Loop : r/learnjavascript - Reddit, accessed April 27, 2025, <https://www.reddit.com/r/learnjavascript/comments/1bw659e/understanding_the_event_loop/>

179. JavaScript Visualized - Event Loop, Web APIs, (Micro)task Queue - YouTube, accessed April 27, 2025, <https://www.youtube.com/watch?v=eiC58R16hb8>

180. Window: queueMicrotask() method - Web APIs | MDN, accessed April 27, 2025, <https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask>

181. Tasks, microtasks, queues and schedules - JakeArchibald.com, accessed April 27, 2025, <https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>

182. Jake Archibald's talk "In the loop", transposed - Andrea Verlicchi, accessed April 27, 2025, <https://www.andreaverlicchi.eu/blog/jake-archibald-in-the-loop-jsconf-asia-talk-transposed/>