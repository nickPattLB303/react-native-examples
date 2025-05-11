## Section 1: Variables, Data Types, and Operators (ES6+ Focus: let, const)

> [!TIP]
> Experienced developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
> - [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
> - [MDN Web Docs: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
> - [MDN Web Docs: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

This section establishes the groundwork for comprehending how data is declared, stored, classified, and manipulated within JavaScript. It places a strong emphasis on contemporary ES6+ practices for variable declaration, which present considerable enhancements over previous JavaScript versions.

### 1.1. Detailed Exploration of Variable Declarations (var, let, const)

#### Introduction to Variables

In JavaScript, variables serve as named containers for storing data values that can be referenced and manipulated throughout a program. Their use is fundamental for holding data that may change during program execution or needs to be accessed multiple times. The process of using a variable typically involves two steps: **declaration**, which introduces the variable's name to the JavaScript engine, and **initialization**, which assigns an initial value to the variable.

#### var Keyword

The var keyword was the original method for declaring variables in JavaScript.

* **Syntax**: Variables can be declared and optionally initialized using var variableName = value; or simply declared as var variableName;.
* **Scope**: Variables declared with var possess either **function scope** or **global scope**. If declared within a function, they are accessible only within that function. If declared outside any function, they become global variables, accessible from anywhere in the program. This scoping rule can sometimes lead to unexpected behavior, especially in larger applications, as variables might unintentionally overwrite others or be accessible in broader contexts than intended.
* **Hoisting**: var declarations are subject to a behavior known as hoisting. During the compilation phase, the JavaScript engine moves the declarations of var variables to the top of their respective scope (either function or global). However, only the declaration is hoisted, not the initialization. This means a variable declared with var can be referenced before its textual declaration in the code, but its value will be undefined until the line where it is assigned a value is executed.1
  + *Under the Hood*: The JavaScript engine processes variable declarations before executing any code. For var declarations, it allocates memory and assigns undefined as the initial value. For example:
    JavaScript
    console.log(myVar); // Outputs: undefined
    var myVar = 5;
    console.log(myVar); // Outputs: 5
    This behaves as if the code were:
    JavaScript
    var myVar; // Declaration hoisted and initialized to undefined
    console.log(myVar); // Outputs: undefined
    myVar = 5; // Assignment happens here
    console.log(myVar); // Outputs: 5
* **Re-declaration**: Variables declared with var can be re-declared within the same scope without generating an error. For instance, var x = 10; var x = 20; is valid.
* **Re-assignment**: var variables can be re-assigned new values after their initial declaration.
* **Legacy Status**: While var is still functional, its use is generally discouraged in modern JavaScript (ES6 and beyond) development. The introduction of let and const provides more predictable scoping and helps avoid common pitfalls associated with var.

#### let Keyword (ES6+)

The let keyword, introduced in ES6, provides a more modern and robust way to declare variables.

* **Syntax**: let variableName = value; or let variableName;.
* **Scope**: let variables are **block-scoped**. A block is defined by any code enclosed in curly braces {}, such as in if statements, for loops, or even standalone blocks of code. This means a let variable is only accessible within the specific block in which it is defined, which significantly reduces the risk of accidental variable name collisions and improves code modularity.
* **Hoisting and Temporal Dead Zone (TDZ)**: let declarations are also hoisted to the top of their block scope, but unlike var, they are *not* initialized with undefined. Instead, they enter a state known as the **Temporal Dead Zone (TDZ)**. Attempting to access a let variable before its declaration in the code results in a ReferenceError.1
  + *Under the Hood*: The TDZ begins at the start of the block and ends when the let declaration is encountered and evaluated. During this period, the variable exists in memory but is inaccessible. This behavior is a deliberate design choice to prevent the use of variables before they are properly declared and initialized, leading to more reliable code. For example:
    JavaScript
    {
     // console.log(myLet); // This would cause a ReferenceError: Cannot access 'myLet' before initialization
     let myLet = 5;
     console.log(myLet); // Outputs: 5
    }
* **Re-declaration**: let variables cannot be re-declared within the same scope. Attempting to do so will result in a SyntaxError. For example, let y = 10; let y = 20; is invalid.
* **Re-assignment**: let variables can be re-assigned new values after their declaration.
* **Modern Practice**: let is the preferred keyword for declaring variables whose values are expected to change during the program's execution.

#### const Keyword (ES6+)

The const keyword, also introduced in ES6, is used for declaring constants, i.e., variables whose values are not intended to change after initialization.

* **Syntax**: const variableName = value;. Variables declared with const *must* be initialized at the time of declaration. Omitting the initializer will result in a SyntaxError.
* **Scope**: const variables are **block-scoped**, identical to let variables.
* **Hoisting and Temporal Dead Zone (TDZ)**: Similar to let, const declarations are hoisted to the top of their block but are not initialized. They are also subject to the TDZ, and accessing them before their declaration results in a ReferenceError.1 The TDZ for const is particularly important as it ensures that a constant cannot be accessed before its mandatory initial value is assigned, upholding its immutability principle from the point of declaration.4
* **Re-declaration**: const variables cannot be re-declared within the same scope, similar to let.
* **Re-assignment**: const variables cannot be re-assigned a new value after they have been initialized. Attempting to do so will result in a TypeError. This enforces the immutability of the variable's *binding*.
  + **Important Nuance for Objects and Arrays**: It is crucial to understand that const makes the variable binding immutable, not necessarily the value it holds if that value is an object or an array. If a const variable references an object or an array, the properties of that object or the elements of that array can still be modified.
    JavaScript
    const MY\_OBJECT = { key: "value" };
    MY\_OBJECT.key = "newValue"; // This is allowed
    console.log(MY\_OBJECT.key); // Outputs: "newValue"

    const MY\_ARRAY = ;
    MY\_ARRAY.push(4); // This is allowed
    console.log(MY\_ARRAY); // Outputs:

    // MY\_OBJECT = { newKey: "anotherValue" }; // This would cause a TypeError: Assignment to constant variable.
* **Modern Practice**: const is the preferred keyword for declaring variables whose values should remain unchanged after initialization. This practice promotes code predictability and helps prevent accidental modifications. It is advisable to use const by default and switch to let only when it is clear that the variable's value needs to be reassigned.

#### Best Practices for Variable Declaration

In modern JavaScript development, adhering to certain best practices for variable declaration can significantly improve code quality:

1. **Prefer const by default**: Use const for all variable declarations unless you explicitly know that the variable's value will need to change. This helps in creating more predictable and less error-prone code.
2. **Use let for re-assignable variables**: If a variable's value is expected to be updated later in its scope, declare it using let.
3. **Avoid var**: In ES6+ environments, the use of var should be avoided to prevent issues related to its function-scoping and hoisting behavior, which can lead to confusion and bugs. The introduction of let and const with block scope and the TDZ directly addresses these historical pitfalls, offering more refined control over variable lifecycles.1 The TDZ, for instance, by throwing a ReferenceError on premature access, forces developers to declare variables before use, which is a safer practice.1
4. **Declare variables at the top of their scope**: For better readability, declare variables at the beginning of the block (for let and const) or function (if still using var) where they are used. While hoisting moves declarations, explicit declaration at the top makes the code easier to follow.

> 🌐 **(Web Developers):**
> > **Comparison:** If you're coming from a language with strict block scoping (like Java, C++, or even modern Python), the function-level scope of `var` might feel counter-intuitive. `let` and `const` in ES6+ introduce block scoping similar to what you might be used to, making variable lifetimes more predictable within `if` blocks, `for` loops, etc.
> >
> > **Key Takeaway:** Prefer `let` and `const` to leverage block scoping and avoid potential pitfalls associated with `var`'s function scope.
> >
> > **Source:** [MDN Web Docs: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

> 📲 **(Native Developers):**
> > **Comparison:** Concepts like variable scope and lifetime exist in native languages (Swift, Kotlin, Java). JavaScript's `var` with its function scope and hoisting can behave differently than local variables in native blocks. `let` and `const` provide block-level scoping that might feel more familiar.
> >
> > **Key Takeaway:** Pay close attention to `var`'s function scope and hoisting; `let` and `const` offer more predictable block scoping.
> >
> > **Source:** [MDN Web Docs: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

The shift from var to let and const represents a significant improvement in JavaScript's variable management. var's function-level scope meant variables declared inside loops, for example, were accessible throughout the entire function, potentially leading to naming conflicts or misuse. Its hoisting behavior, where variables are initialized to undefined, could also mask errors by allowing usage before a meaningful assignment. let and const confine variables to block scopes, making code more modular and easier to reason about. The Temporal Dead Zone further enhances this by preventing access to a variable before its lexical declaration is encountered, thus catching potential errors early. This evolution underscores a move towards stricter, more predictable variable handling in the language.

<br>

**Table 1.1: var vs. let vs. const**

| **Feature** | **var** | **let** | **const** |
| --- | --- | --- | --- |
| **Scope** | Function or Global | Block ({}) | Block ({}) |
| **Hoisting (Declaration)** | Yes | Yes | Yes |
| **Hoisting (Initialization)** | Yes (to undefined) | No (in TDZ) | No (in TDZ) |
| **Temporal Dead Zone (TDZ)** | No | Yes | Yes |
| **Re-declaration (same scope)** | Yes | No (SyntaxError) | No (SyntaxError) |
| **Re-assignment** | Yes | Yes | No (TypeError) |
| **Must be initialized?** | No (defaults to undefined) | No (defaults to undefined after TDZ) | Yes (SyntaxError if not) |

<br>

### 1.2. Comprehensive Overview of JavaScript Data Types

#### Introduction to Data Types

Data types are fundamental classifications that specify the kind of value a variable can hold and the operations that can be performed on that value. JavaScript is a **dynamically-typed language**, which means that variable types are determined at runtime based on the value assigned to them, rather than being explicitly declared by the programmer in the code. A single variable can hold different data types over its lifetime.

JavaScript data types are broadly categorized into two main groups: **Primitive Data Types** and the **Object Type**.

> 🌐 **(Web Developers):**
> > **Comparison:** If you're used to statically typed languages (like Java, C#, or TypeScript), JavaScript's dynamic typing might feel different. You don't explicitly declare variable types, and a variable can hold values of different types over its lifetime. This offers flexibility but requires careful attention to avoid runtime type errors.
> >
> > **Key Takeaway:** Be mindful of JavaScript's dynamic typing and use tools like `typeof` or strict equality (`===`) when type checking is necessary. TypeScript (covered in the next module) adds static typing to JavaScript.
> >
> > **Source:** [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages like Swift and Kotlin are statically typed, requiring explicit type declarations. JavaScript's dynamic typing means variable types are inferred at runtime. This can be more flexible but also increases the risk of unexpected type-related errors if not managed carefully.
> >
> > **Key Takeaway:** Understand that JavaScript variables don't have fixed types; their type is determined by the value they hold at any given moment. TypeScript (Module 6) introduces static typing.
> >
> > **Source:** [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)

#### Primitive Data Types

Primitive data types represent single, immutable values. "Immutable" means that the value itself cannot be changed once it's created; however, a variable holding a primitive value can be reassigned to a new primitive value. JavaScript has seven primitive data types :

* **String**:
  + Represents textual data. Strings are sequences of characters.
  + They can be enclosed in single quotes (e.g., 'hello'), double quotes (e.g., "world"), or backticks (e.g., `template literal`). Backticks enable template literals, which allow for embedded expressions and multi-line strings.
  + Strings are immutable. Any operation that appears to modify a string (like concatenation or substring extraction) actually creates and returns a new string, leaving the original unchanged.
* **Number**:
  + Represents both integer and floating-point numbers. JavaScript uses a 64-bit floating-point format (IEEE 754 standard) to store all numbers.1
  + This single representation means there's no distinct integer type as in some other languages.
  + Special numeric values include:
    - Infinity: Represents mathematical positive infinity (e.g., the result of 1 / 0).
    - -Infinity: Represents mathematical negative infinity.
    - NaN (Not-a-Number): Represents an invalid or unrepresentable numeric value. It typically results from operations like 0 / 0, Math.sqrt(-1), or attempting to parse a non-numeric string into a number (e.g., parseInt("hello")). A unique characteristic of NaN is that it does not equal itself (NaN === NaN is false). To check if a value is NaN, use the global isNaN() function or the more robust Number.isNaN() method.
* **Boolean**:
  + Represents logical entities and can have only two values: true or false.1
  + Booleans are extensively used in conditional statements and control flow logic.
* **Null**:
  + Represents the intentional absence of any object value. It is a primitive value that signifies "no value" or "empty".1
  + It's important to note a long-standing quirk in JavaScript: typeof null returns "object". This is a historical bug and should not be interpreted as null being an object.6 To check for null, one should use strict equality: myVar === null.
  + Developers often assign null to a variable to explicitly indicate that it currently holds no object value.
* **Undefined**:
  + Represents a variable that has been declared but has not yet been assigned a value. It also signifies the value returned by functions that do not explicitly return a value, or the value of a non-existent object property.1
  + The typeof undefined correctly returns "undefined".6
  + **Distinction between null and undefined**: While both can represent an absence of value, they have different semantic meanings and origins.6
    - undefined typically signifies that a value is missing by default or has not been provided by the system (e.g., an uninitialized variable, a missing function argument).
    - null is generally used by programmers to explicitly indicate that a variable should have no value or that an object reference is intentionally empty.
    - This distinction is subtle but important for debugging and for writing functions that correctly handle optional data or missing information. For example, a function might receive undefined for an optional parameter if the caller omits it, but null if the caller explicitly wants to pass "no value" for that parameter.
* **Symbol (ES6+)**:
  + Represents unique and immutable identifiers. Symbols are typically used to create unique property keys for objects, helping to avoid naming collisions, especially when adding properties to objects from external sources or for internal metaproperties.
  + A new symbol is created using the Symbol() factory function (e.g., const mySymbol = Symbol("description");). Each call to Symbol() creates a new, unique symbol, even if the optional string description is the same.
* **BigInt (ES2020+)**:
  + Represents whole numbers that can be arbitrarily large, exceeding the safe integer limit of the standard Number type (which is 2<sup>53</sup> - 1).
  + BigInt values are created by appending n to an integer literal (e.g., 12345678901234567890n) or by calling the BigInt() constructor (e.g., BigInt("123...")).
  + BigInts cannot be mixed directly with Numbers in arithmetic operations; explicit conversion is required to avoid precision loss.

#### Object Type (Reference Type)

The Object type is the second main category of data types in JavaScript. Unlike primitive types, objects are complex data structures that can store collections of key-value pairs. These pairs are known as properties (if the value is data) or methods (if the value is a function).

* Objects are **mutable**, meaning their content (properties and methods) can be changed after they are created.
* Variables that hold objects actually store a **reference** (or a memory address) to the location where the object is stored in memory, rather than the object itself. This has implications for how objects are copied and passed to functions (covered in more detail in Section 4).
* The Object type encompasses various built-in constructs, including:
  + Generic objects (created with {} or new Object())
  + Arrays (`` or new Array())
  + Functions (function() {} or new Function())
  + Date objects (new Date())
  + Regular Expressions (/pattern/ or new RegExp())
  + And many more.

### 1.3. Exhaustive Coverage of Operators

#### Introduction to Operators

Operators in JavaScript are special symbols or keywords that perform operations on one or more values, called operands, to produce a result.1 They are the building blocks for expressions and performing computations, comparisons, and assignments.

#### Assignment Operators

Assignment operators are used to assign values to JavaScript variables.

* **= (Assignment)**: The basic assignment operator. It assigns the value of its right-hand operand to its left-hand operand.1
  + Example: let score = 100;
* **Compound Assignment Operators**: These operators provide a shorthand way to perform an operation and then assign the result back to the left-hand operand.1
  + += (Addition assignment): x += y is equivalent to x = x + y.
  + -= (Subtraction assignment): x -= y is equivalent to x = x - y.
  + \*= (Multiplication assignment): x \*= y is equivalent to x = x \* y.
  + /= (Division assignment): x /= y is equivalent to x = x / y.
  + %= (Remainder assignment): x %= y is equivalent to x = x % y.
  + \*\*= (Exponentiation assignment, ES2016+): x \*\*= y is equivalent to x = x \*\* y.
  + **Bitwise Assignment Operators**: <<=, >>=, >>>=, &=, ^=, |=. These perform a bitwise operation and assign the result. They are less commonly used in typical application development but are part of the language.1
  + **Logical Assignment Operators (ES2021+)**: These operators combine a logical operation with an assignment, offering concise ways to assign values conditionally.1
    - &&= (Logical AND assignment): x &&= y is equivalent to x && (x = y). Assigns y to x only if x is truthy.
    - ||= (Logical OR assignment): x ||= y is equivalent to x | | (x = y). Assigns y to x only if x is falsy.
    - ??= (Nullish Coalescing assignment): x??= y is equivalent to x?? (x = y). Assigns y to x only if x is null or undefined.

#### Comparison Operators

Comparison operators compare their operands and return a Boolean value (true or false) based on whether the comparison is true.1

* == (Loose Equality / Equal): Compares two operands for equality *after* performing type coercion if they are of different types. For example, "5" == 5 is true. **This operator is generally discouraged** because its type coercion rules can be complex and lead to unexpected behavior.1
* != (Loose Inequality / Not Equal): Compares for inequality, also performing type coercion.1
* === (Strict Equality / Identical): Compares two operands for equality *without* performing type coercion. Both the value and the type must be the same for the result to be true. For example, "5" === 5 is false. **This is the preferred equality operator for most comparisons** as it leads to more predictable and reliable code.1 Understanding the difference between == and === is fundamental. The loose equality == can introduce subtle bugs because its type conversion rules are not always intuitive (e.g., 0 == false is true, "" == false is true). Strict equality === avoids these ambiguities by directly comparing values if types are the same, and returning false if types are different, forcing developers to be more explicit about their intentions.
* !== (Strict Inequality / Not Identical): Compares for inequality without type coercion. It's the negation of ===.1
* > (Greater than) 1
* < (Less than) 1
* >= (Greater than or equal to) 1
* <= (Less than or equal to) 1

#### Arithmetic Operators

Arithmetic operators perform mathematical calculations on numerical operands.1

* + (Addition): Adds two numbers. If one or both operands are strings, it performs string concatenation.
* - (Subtraction): Subtracts the right operand from the left operand.
* \* (Multiplication): Multiplies two operands.
* / (Division): Divides the left operand by the right operand.
* % (Remainder / Modulo): Returns the remainder of an integer division.
* \*\* (Exponentiation, ES2016+): Raises the left operand to the power of the right operand (e.g., 2 \*\* 3 is 8).
* ++ (Increment): Increases its operand by 1.
  + Prefix (++x): Increments x and then returns the new value of x.
  + Postfix (x++): Returns the original value of x and then increments x.
* -- (Decrement): Decreases its operand by 1.
  + Prefix (--x): Decrements x and then returns the new value of x.
  + Postfix (x--): Returns the original value of x and then decrements x.
* Unary + (Unary Plus): Tries to convert its operand into a number. If the operand is already a number, it does nothing. Example: +"42" results in the number 42.1
* Unary - (Unary Negation): Negates its operand. Example: -(42) results in -42.1

#### Bitwise Operators

Bitwise operators treat their operands as a sequence of 32 bits (zeros and ones) and perform operations on them at the binary level. These are less frequently used in typical React Native application logic but are part of the language for lower-level manipulations.1

* & (Bitwise AND)
* | (Bitwise OR)
* ^ (Bitwise XOR)
* ~ (Bitwise NOT)
* << (Left Shift)
* >> (Sign-propagating Right Shift)
* >>> (Zero-fill Right Shift)

#### Logical Operators

Logical operators are typically used with Boolean values; when they are, they return a Boolean value. However, the && and || operators actually return the value of one of the specified operands, so if used with non-Boolean values, they may return a non-Boolean value.1

* && (Logical AND): Returns the first falsy operand it encounters, or the last operand if all operands are truthy. It exhibits **short-circuiting behavior**: if the first operand evaluates to falsy, the second operand is not evaluated at all.10
  + Example: true && false returns false. let result = getValue() && processValue(); ( processValue() only runs if getValue() is truthy).
* || (Logical OR): Returns the first truthy operand it encounters, or the last operand if all operands are falsy. It also exhibits **short-circuiting behavior**: if the first operand evaluates to truthy, the second operand is not evaluated.10
  + Example: true | | false returns true. let name = providedName | | "Default Name";
* ! (Logical NOT): Inverts the Boolean value of its operand. If the operand is truthy, ! returns false; if falsy, ! returns true.
  + Example: !true returns false. !0 returns true.

#### String Operators

JavaScript provides operators for string manipulation, primarily concatenation.

* + (Concatenation): When one or both operands are strings, the + operator performs string concatenation, joining them together.
  + Example: let greeting = "Hello" + " " + "World"; // "Hello World"
* += (Concatenation assignment): Appends the right operand string to the left operand string and assigns the result to the left operand.
  + Example: let message = "Welcome"; message += " to JavaScript!"; // "Welcome to JavaScript!"

#### Conditional (Ternary) Operator

The conditional operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy, followed by a colon (:), and finally the expression to execute if the condition is falsy. It's a concise way to write simple if...else statements.1

* Syntax: condition? expressionIfTrue : expressionIfFalse
* Example: let accessLevel = user.isAdmin? "full" : "limited";

#### Comma Operator

The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand. It is rarely used in practice but can sometimes be found in for loop initializers or update expressions to combine multiple expressions into one.1

* Example: let x = (1 + 2, 3 + 4); // x will be assigned 7

#### Unary Operators (Recap)

Unary operators operate on a single operand. Several have been mentioned (e.g., ++, --, unary +, unary -, !, ~). Others include 1:

* delete: Removes a property from an object. Example: delete myObject.property;. It does not work on variables or functions.
* void: Evaluates an expression and returns undefined. Often used to obtain the undefined primitive value reliably or to prevent an expression from returning a value where one isn't desired (e.g., javascript:void(0) in HTML links).
* typeof: Returns a string indicating the type of its operand.

#### Relational Operators

Relational operators test for a relationship between two operands.

* in: Returns true if the specified property is in the specified object or its prototype chain.1
  + Example: const car = { make: "Honda", model: "Civic" }; "make" in car; // true
* instanceof: Returns true if the specified object is an instance of the specified constructor or a class that inherits from it.1
  + Example: const today = new Date(); today instanceof Date; // true

#### typeof Operator

The typeof operator returns a string indicating the data type of its operand.

* Possible return values: "undefined", "boolean", "number", "bigint", "string", "symbol", "function", "object".
* **Quirks**:
  + typeof null returns "object" (a historical bug).
  + typeof (an array) returns "object". To check for an array, use Array.isArray().
  + typeof function(){} returns "function". Functions are technically objects but typeof has a special return for them.

#### Operator Precedence and Associativity

When an expression contains multiple operators, JavaScript uses rules of **precedence** and **associativity** to determine the order of evaluation.

* **Precedence**: Determines which operator is performed first in an expression with multiple operators. Operators with higher precedence are evaluated before those with lower precedence. For example, multiplication (\*) and division (/) have higher precedence than addition (+) and subtraction (-).1 In 3 + 10 \* 2, 10 \* 2 is evaluated first, resulting in 20, then 3 + 20 results in 23.10
* **Associativity**: Determines the order in which operators with the *same* precedence are evaluated. It can be left-to-right (L-R) or right-to-left (R-L).1
  + Most arithmetic and logical operators are left-to-right. For example, a - b - c is evaluated as (a - b) - c.
  + Assignment operators (=, +=, etc.), the conditional (ternary) operator (?:), and the exponentiation operator (\*\*) are right-to-left. For example, a = b = 5 is evaluated as a = (b = 5).9
* **Parentheses ()**: Can be used to explicitly control the order of evaluation, overriding default precedence and associativity rules.1 For example, (3 + 10) \* 2 evaluates 3 + 10 first, resulting in 13, then 13 \* 2 results in 26.10

Understanding operator precedence and associativity is crucial for writing correct and predictable code, especially in complex expressions. Without this knowledge, expressions might yield unexpected results due to the implicit evaluation order defined by the language.

<br>

**Table 1.2: Operator Precedence and Associativity (Common Operators)**

| **Precedence** | **Operator(s)** | **Description** | **Associativity** |
| --- | --- | --- | --- |
| 19 (Highest) | (... ) | Grouping | n/a |
| 18 | . ?. `` new (with args) | Member Access, Optional Chaining, Computed Member Access, Instantiation | L-R |
| 17 | new (without args) | Instantiation | R-L |
| 16 | ++ (postfix) -- (postfix) | Postfix Increment/Decrement | n/a (unary) |
| 15 | ! ~ + (unary) - (unary) ++ (prefix) -- (prefix) typeof void delete | Logical NOT, Bitwise NOT, Unary Plus/Negation, Prefix Increment/Decrement, Typeof, Void, Delete | R-L (unary) |
| 14 | \*\* | Exponentiation | R-L |
| 13 | \* / % | Multiplication, Division, Remainder | L-R |
| 12 | + (binary) - (binary) | Addition, Subtraction | L-R |
| 11 | << >> >>> | Bitwise Shifts | L-R |
| 10 | < <= > >= in instanceof | Relational, in, instanceof | L-R |
| 9 | == != === !== | Equality | L-R |
| 8 | & | Bitwise AND | L-R |
| 7 | ^ | Bitwise XOR | L-R |
| 6 | ` | ` | Bitwise OR |
| 5 | && | Logical AND | L-R |
| 4 | ` | ` | Logical OR |
| 3 | ?? | Nullish Coalescing | L-R |
| 2 | ? : | Conditional (Ternary) | R-L |
| 1 | = += -= \*= /= %= \*\*= <<= >>= >>>= &= ^= ` | =&&= | =??=` |
| 0 (Lowest) | , | Comma | L-R |

(Adapted from MDN Operator Precedence Table 9)
