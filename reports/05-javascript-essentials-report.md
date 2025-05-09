Module 5: JavaScript Essentials for React Native
This module provides a foundational understanding of JavaScript, the language that powers React Native applications. A proficient grasp of modern JavaScript, particularly features introduced in ES6 (ECMAScript 2015) and subsequent versions, is indispensable for developing efficient, maintainable, and robust mobile applications using React Native. This report aims to deliver an exhaustive exploration of core JavaScript concepts, meticulously explaining each topic from its fundamental principles. It assumes no prior knowledge of the specific JavaScript concept being discussed and delves into the internal workings of these mechanisms where relevant to foster a deeper understanding.
Section 1: Variables, Data Types, and Operators (ES6+ Focus: let, const)
This section establishes the groundwork for comprehending how data is declared, stored, classified, and manipulated within JavaScript. It places a strong emphasis on contemporary ES6+ practices for variable declaration, which present considerable enhancements over previous JavaScript versions.
1.1. Detailed Exploration of Variable Declarations (var, let, const)
Introduction to Variables
In JavaScript, variables serve as named containers for storing data values that can be referenced and manipulated throughout a program. Their use is fundamental for holding data that may change during program execution or needs to be accessed multiple times. The process of using a variable typically involves two steps: declaration, which introduces the variable's name to the JavaScript engine, and initialization, which assigns an initial value to the variable.
var Keyword
The var keyword was the original method for declaring variables in JavaScript.
Syntax: Variables can be declared and optionally initialized using var variableName = value; or simply declared as var variableName;.
Scope: Variables declared with var possess either function scope or global scope. If declared within a function, they are accessible only within that function. If declared outside any function, they become global variables, accessible from anywhere in the program. This scoping rule can sometimes lead to unexpected behavior, especially in larger applications, as variables might unintentionally overwrite others or be accessible in broader contexts than intended.
Hoisting: var declarations are subject to a behavior known as hoisting. During the compilation phase, the JavaScript engine moves the declarations of var variables to the top of their respective scope (either function or global). However, only the declaration is hoisted, not the initialization. This means a variable declared with var can be referenced before its textual declaration in the code, but its value will be undefined until the line where it is assigned a value is executed.1
Under the Hood: The JavaScript engine processes variable declarations before executing any code. For var declarations, it allocates memory and assigns undefined as the initial value. For example:
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

Re-declaration: Variables declared with var can be re-declared within the same scope without generating an error. For instance, var x = 10; var x = 20; is valid.
Re-assignment: var variables can be re-assigned new values after their initial declaration.
Legacy Status: While var is still functional, its use is generally discouraged in modern JavaScript (ES6 and beyond) development. The introduction of let and const provides more predictable scoping and helps avoid common pitfalls associated with var.
let Keyword (ES6+)
The let keyword, introduced in ES6, provides a more modern and robust way to declare variables.
Syntax: let variableName = value; or let variableName;.
Scope: let variables are block-scoped. A block is defined by any code enclosed in curly braces {}, such as in if statements, for loops, or even standalone blocks of code. This means a let variable is only accessible within the specific block in which it is defined, which significantly reduces the risk of accidental variable name collisions and improves code modularity.
Hoisting and Temporal Dead Zone (TDZ): let declarations are also hoisted to the top of their block scope, but unlike var, they are not initialized with undefined. Instead, they enter a state known as the Temporal Dead Zone (TDZ). Attempting to access a let variable before its declaration in the code results in a ReferenceError.1
Under the Hood: The TDZ begins at the start of the block and ends when the let declaration is encountered and evaluated. During this period, the variable exists in memory but is inaccessible. This behavior is a deliberate design choice to prevent the use of variables before they are properly declared and initialized, leading to more reliable code. For example:
JavaScript
{
// console.log(myLet); // This would cause a ReferenceError: Cannot access 'myLet' before initialization
let myLet = 5;
console.log(myLet); // Outputs: 5
}

Re-declaration: let variables cannot be re-declared within the same scope. Attempting to do so will result in a SyntaxError. For example, let y = 10; let y = 20; is invalid.
Re-assignment: let variables can be re-assigned new values after their declaration.
Modern Practice: let is the preferred keyword for declaring variables whose values are expected to change during the program's execution.
const Keyword (ES6+)
The const keyword, also introduced in ES6, is used for declaring constants, i.e., variables whose values are not intended to change after initialization.
Syntax: const variableName = value;. Variables declared with const must be initialized at the time of declaration. Omitting the initializer will result in a SyntaxError.
Scope: const variables are block-scoped, identical to let variables.
Hoisting and Temporal Dead Zone (TDZ): Similar to let, const declarations are hoisted to the top of their block but are not initialized. They are also subject to the TDZ, and accessing them before their declaration results in a ReferenceError.1 The TDZ for const is particularly important as it ensures that a constant cannot be accessed before its mandatory initial value is assigned, upholding its immutability principle from the point of declaration.4
Re-declaration: const variables cannot be re-declared within the same scope, similar to let.
Re-assignment: const variables cannot be re-assigned a new value after they have been initialized. Attempting to do so will result in a TypeError. This enforces the immutability of the variable's binding.
Important Nuance for Objects and Arrays: It is crucial to understand that const makes the variable binding immutable, not necessarily the value it holds if that value is an object or an array. If a const variable references an object or an array, the properties of that object or the elements of that array can still be modified.
JavaScript
const MY_OBJECT = { key: "value" };
MY_OBJECT.key = "newValue"; // This is allowed
console.log(MY_OBJECT.key); // Outputs: "newValue"

const MY_ARRAY = ;
MY_ARRAY.push(4); // This is allowed
console.log(MY_ARRAY); // Outputs:

// MY_OBJECT = { newKey: "anotherValue" }; // This would cause a TypeError: Assignment to constant variable.

Modern Practice: const is the preferred keyword for declaring variables whose values should remain unchanged after initialization. This practice promotes code predictability and helps prevent accidental modifications. It is advisable to use const by default and switch to let only when it is clear that the variable's value needs to be reassigned.
Best Practices for Variable Declaration
In modern JavaScript development, adhering to certain best practices for variable declaration can significantly improve code quality:
Prefer const by default: Use const for all variable declarations unless you explicitly know that the variable's value will need to change. This helps in creating more predictable and less error-prone code.
Use let for re-assignable variables: If a variable's value is expected to be updated later in its scope, declare it using let.
Avoid var: In ES6+ environments, the use of var should be avoided to prevent issues related to its function-scoping and hoisting behavior, which can lead to confusion and bugs. The introduction of let and const with block scope and the TDZ directly addresses these historical pitfalls, offering more refined control over variable lifecycles.1 The TDZ, for instance, by throwing a ReferenceError on premature access, forces developers to declare variables before use, which is a safer practice.1
Declare variables at the top of their scope: For better readability, declare variables at the beginning of the block (for let and const) or function (if still using var) where they are used. While hoisting moves declarations, explicit declaration at the top makes the code easier to follow.
The shift from var to let and const represents a significant improvement in JavaScript's variable management. var's function-level scope meant variables declared inside loops, for example, were accessible throughout the entire function, potentially leading to naming conflicts or misuse. Its hoisting behavior, where variables are initialized to undefined, could also mask errors by allowing usage before a meaningful assignment. let and const confine variables to block scopes, making code more modular and easier to reason about. The Temporal Dead Zone further enhances this by preventing access to a variable before its lexical declaration is encountered, thus catching potential errors early. This evolution underscores a move towards stricter, more predictable variable handling in the language.
<br>
Table 1.1: var vs. let vs. const
Feature
var
let
const
Scope
Function or Global
Block ({})
Block ({})
Hoisting (Declaration)
Yes
Yes
Yes
Hoisting (Initialization)
Yes (to undefined)
No (in TDZ)
No (in TDZ)
Temporal Dead Zone (TDZ)
No
Yes
Yes
Re-declaration (same scope)
Yes
No (SyntaxError)
No (SyntaxError)
Re-assignment
Yes
Yes
No (TypeError)
Must be initialized?
No (defaults to undefined)
No (defaults to undefined after TDZ)
Yes (SyntaxError if not)

<br>
1.2. Comprehensive Overview of JavaScript Data Types
Introduction to Data Types
Data types are fundamental classifications that specify the kind of value a variable can hold and the operations that can be performed on that value. JavaScript is a dynamically-typed language, which means that variable types are determined at runtime based on the value assigned to them, rather than being explicitly declared by the programmer in the code. A single variable can hold different data types over its lifetime.
JavaScript data types are broadly categorized into two main groups: Primitive Data Types and the Object Type.
Primitive Data Types
Primitive data types represent single, immutable values. "Immutable" means that the value itself cannot be changed once it's created; however, a variable holding a primitive value can be reassigned to a new primitive value. JavaScript has seven primitive data types :
String:
Represents textual data. Strings are sequences of characters.
They can be enclosed in single quotes (e.g., 'hello'), double quotes (e.g., "world"), or backticks (e.g., `template literal`). Backticks enable template literals, which allow for embedded expressions and multi-line strings.
Strings are immutable. Any operation that appears to modify a string (like concatenation or substring extraction) actually creates and returns a new string, leaving the original unchanged.
Number:
Represents both integer and floating-point numbers. JavaScript uses a 64-bit floating-point format (IEEE 754 standard) to store all numbers.1
This single representation means there's no distinct integer type as in some other languages.
Special numeric values include:
Infinity: Represents mathematical positive infinity (e.g., the result of 1 / 0).
-Infinity: Represents mathematical negative infinity.
NaN (Not-a-Number): Represents an invalid or unrepresentable numeric value. It typically results from operations like 0 / 0, Math.sqrt(-1), or attempting to parse a non-numeric string into a number (e.g., parseInt("hello")). A unique characteristic of NaN is that it does not equal itself (NaN === NaN is false). To check if a value is NaN, use the global isNaN() function or the more robust Number.isNaN() method.
Boolean:
Represents logical entities and can have only two values: true or false.1
Booleans are extensively used in conditional statements and control flow logic.
Null:
Represents the intentional absence of any object value. It is a primitive value that signifies "no value" or "empty".1
It's important to note a long-standing quirk in JavaScript: typeof null returns "object". This is a historical bug and should not be interpreted as null being an object.6 To check for null, one should use strict equality: myVar === null.
Developers often assign null to a variable to explicitly indicate that it currently holds no object value.
Undefined:
Represents a variable that has been declared but has not yet been assigned a value. It also signifies the value returned by functions that do not explicitly return a value, or the value of a non-existent object property.1
The typeof undefined correctly returns "undefined".6
Distinction between null and undefined: While both can represent an absence of value, they have different semantic meanings and origins.6
undefined typically signifies that a value is missing by default or has not been provided by the system (e.g., an uninitialized variable, a missing function argument).
null is generally used by programmers to explicitly indicate that a variable should have no value or that an object reference is intentionally empty.
This distinction is subtle but important for debugging and for writing functions that correctly handle optional data or missing information. For example, a function might receive undefined for an optional parameter if the caller omits it, but null if the caller explicitly wants to pass "no value" for that parameter.
Symbol (ES6+):
Represents unique and immutable identifiers. Symbols are typically used to create unique property keys for objects, helping to avoid naming collisions, especially when adding properties to objects from external sources or for internal metaproperties.
A new symbol is created using the Symbol() factory function (e.g., const mySymbol = Symbol("description");). Each call to Symbol() creates a new, unique symbol, even if the optional string description is the same.
BigInt (ES2020+):
Represents whole numbers that can be arbitrarily large, exceeding the safe integer limit of the standard Number type (which is 2<sup>53</sup> - 1).
BigInt values are created by appending n to an integer literal (e.g., 12345678901234567890n) or by calling the BigInt() constructor (e.g., BigInt("123...")).
BigInts cannot be mixed directly with Numbers in arithmetic operations; explicit conversion is required to avoid precision loss.
Object Type (Reference Type)
The Object type is the second main category of data types in JavaScript. Unlike primitive types, objects are complex data structures that can store collections of key-value pairs. These pairs are known as properties (if the value is data) or methods (if the value is a function).
Objects are mutable, meaning their content (properties and methods) can be changed after they are created.
Variables that hold objects actually store a reference (or a memory address) to the location where the object is stored in memory, rather than the object itself. This has implications for how objects are copied and passed to functions (covered in more detail in Section 4).
The Object type encompasses various built-in constructs, including:
Generic objects (created with {} or new Object())
Arrays (`` or new Array())
Functions (function() {} or new Function())
Date objects (new Date())
Regular Expressions (/pattern/ or new RegExp())
And many more.
1.3. Exhaustive Coverage of Operators
Introduction to Operators
Operators in JavaScript are special symbols or keywords that perform operations on one or more values, called operands, to produce a result.1 They are the building blocks for expressions and performing computations, comparisons, and assignments.
Assignment Operators
Assignment operators are used to assign values to JavaScript variables.
= (Assignment): The basic assignment operator. It assigns the value of its right-hand operand to its left-hand operand.1
Example: let score = 100;
Compound Assignment Operators: These operators provide a shorthand way to perform an operation and then assign the result back to the left-hand operand.1
+= (Addition assignment): x += y is equivalent to x = x + y.
-= (Subtraction assignment): x -= y is equivalent to x = x - y.
*= (Multiplication assignment): x *= y is equivalent to x = x * y.
/= (Division assignment): x /= y is equivalent to x = x / y.
%= (Remainder assignment): x %= y is equivalent to x = x % y.
**= (Exponentiation assignment, ES2016+): x **= y is equivalent to x = x ** y.
Bitwise Assignment Operators: <<=, >>=, >>>=, &=, ^=, |=. These perform a bitwise operation and assign the result. They are less commonly used in typical application development but are part of the language.1
Logical Assignment Operators (ES2021+): These operators combine a logical operation with an assignment, offering concise ways to assign values conditionally.1
&&= (Logical AND assignment): x &&= y is equivalent to x && (x = y). Assigns y to x only if x is truthy.
||= (Logical OR assignment): x ||= y is equivalent to x | | (x = y). Assigns y to x only if x is falsy.
??= (Nullish Coalescing assignment): x??= y is equivalent to x?? (x = y). Assigns y to x only if x is null or undefined.
Comparison Operators
Comparison operators compare their operands and return a Boolean value (true or false) based on whether the comparison is true.1
== (Loose Equality / Equal): Compares two operands for equality after performing type coercion if they are of different types. For example, "5" == 5 is true. This operator is generally discouraged because its type coercion rules can be complex and lead to unexpected behavior.1
!= (Loose Inequality / Not Equal): Compares for inequality, also performing type coercion.1
=== (Strict Equality / Identical): Compares two operands for equality without performing type coercion. Both the value and the type must be the same for the result to be true. For example, "5" === 5 is false. This is the preferred equality operator for most comparisons as it leads to more predictable and reliable code.1 Understanding the difference between == and === is fundamental. The loose equality == can introduce subtle bugs because its type conversion rules are not always intuitive (e.g., 0 == false is true, "" == false is true). Strict equality === avoids these ambiguities by directly comparing values if types are the same, and returning false if types are different, forcing developers to be more explicit about their intentions.
!== (Strict Inequality / Not Identical): Compares for inequality without type coercion. It's the negation of ===.1
> (Greater than) 1
< (Less than) 1
>= (Greater than or equal to) 1
<= (Less than or equal to) 1
Arithmetic Operators
Arithmetic operators perform mathematical calculations on numerical operands.1
+ (Addition): Adds two numbers. If one or both operands are strings, it performs string concatenation.
- (Subtraction): Subtracts the right operand from the left operand.
* (Multiplication): Multiplies two operands.
/ (Division): Divides the left operand by the right operand.
% (Remainder / Modulo): Returns the remainder of an integer division.
** (Exponentiation, ES2016+): Raises the left operand to the power of the right operand (e.g., 2 ** 3 is 8).
++ (Increment): Increases its operand by 1.
Prefix (++x): Increments x and then returns the new value of x.
Postfix (x++): Returns the original value of x and then increments x.
-- (Decrement): Decreases its operand by 1.
Prefix (--x): Decrements x and then returns the new value of x.
Postfix (x--): Returns the original value of x and then decrements x.
Unary + (Unary Plus): Tries to convert its operand into a number. If the operand is already a number, it does nothing. Example: +"42" results in the number 42.1
Unary - (Unary Negation): Negates its operand. Example: -(42) results in -42.1
Bitwise Operators
Bitwise operators treat their operands as a sequence of 32 bits (zeros and ones) and perform operations on them at the binary level. These are less frequently used in typical React Native application logic but are part of the language for lower-level manipulations.1
& (Bitwise AND)
| (Bitwise OR)
^ (Bitwise XOR)
~ (Bitwise NOT)
<< (Left Shift)
>> (Sign-propagating Right Shift)
>>> (Zero-fill Right Shift)
Logical Operators
Logical operators are typically used with Boolean values; when they are, they return a Boolean value. However, the && and || operators actually return the value of one of the specified operands, so if used with non-Boolean values, they may return a non-Boolean value.1
&& (Logical AND): Returns the first falsy operand it encounters, or the last operand if all operands are truthy. It exhibits short-circuiting behavior: if the first operand evaluates to falsy, the second operand is not evaluated at all.10
Example: true && false returns false. let result = getValue() && processValue(); ( processValue() only runs if getValue() is truthy).
|| (Logical OR): Returns the first truthy operand it encounters, or the last operand if all operands are falsy. It also exhibits short-circuiting behavior: if the first operand evaluates to truthy, the second operand is not evaluated.10
Example: true | | false returns true. let name = providedName | | "Default Name";
! (Logical NOT): Inverts the Boolean value of its operand. If the operand is truthy, ! returns false; if falsy, ! returns true.
Example: !true returns false. !0 returns true.
String Operators
JavaScript provides operators for string manipulation, primarily concatenation.
+ (Concatenation): When one or both operands are strings, the + operator performs string concatenation, joining them together.
Example: let greeting = "Hello" + " " + "World"; // "Hello World"
+= (Concatenation assignment): Appends the right operand string to the left operand string and assigns the result to the left operand.
Example: let message = "Welcome"; message += " to JavaScript!"; // "Welcome to JavaScript!"
Conditional (Ternary) Operator
The conditional operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy, followed by a colon (:), and finally the expression to execute if the condition is falsy. It's a concise way to write simple if...else statements.1
Syntax: condition? expressionIfTrue : expressionIfFalse
Example: let accessLevel = user.isAdmin? "full" : "limited";
Comma Operator
The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand. It is rarely used in practice but can sometimes be found in for loop initializers or update expressions to combine multiple expressions into one.1
Example: let x = (1 + 2, 3 + 4); // x will be assigned 7
Unary Operators (Recap)
Unary operators operate on a single operand. Several have been mentioned (e.g., ++, --, unary +, unary -, !, ~). Others include 1:
delete: Removes a property from an object. Example: delete myObject.property;. It does not work on variables or functions.
void: Evaluates an expression and returns undefined. Often used to obtain the undefined primitive value reliably or to prevent an expression from returning a value where one isn't desired (e.g., javascript:void(0) in HTML links).
typeof: Returns a string indicating the type of its operand.
Relational Operators
Relational operators test for a relationship between two operands.
in: Returns true if the specified property is in the specified object or its prototype chain.1
Example: const car = { make: "Honda", model: "Civic" }; "make" in car; // true
instanceof: Returns true if the specified object is an instance of the specified constructor or a class that inherits from it.1
Example: const today = new Date(); today instanceof Date; // true
typeof Operator
The typeof operator returns a string indicating the data type of its operand.
Possible return values: "undefined", "boolean", "number", "bigint", "string", "symbol", "function", "object".
Quirks:
typeof null returns "object" (a historical bug).
typeof (an array) returns "object". To check for an array, use Array.isArray().
typeof function(){} returns "function". Functions are technically objects but typeof has a special return for them.
Operator Precedence and Associativity
When an expression contains multiple operators, JavaScript uses rules of precedence and associativity to determine the order of evaluation.
Precedence: Determines which operator is performed first in an expression with multiple operators. Operators with higher precedence are evaluated before those with lower precedence. For example, multiplication (*) and division (/) have higher precedence than addition (+) and subtraction (-).1 In 3 + 10 * 2, 10 * 2 is evaluated first, resulting in 20, then 3 + 20 results in 23.10
Associativity: Determines the order in which operators with the same precedence are evaluated. It can be left-to-right (L-R) or right-to-left (R-L).1
Most arithmetic and logical operators are left-to-right. For example, a - b - c is evaluated as (a - b) - c.
Assignment operators (=, +=, etc.), the conditional (ternary) operator (?:), and the exponentiation operator (**) are right-to-left. For example, a = b = 5 is evaluated as a = (b = 5).9
Parentheses (): Can be used to explicitly control the order of evaluation, overriding default precedence and associativity rules.1 For example, (3 + 10) * 2 evaluates 3 + 10 first, resulting in 13, then 13 * 2 results in 26.10
Understanding operator precedence and associativity is crucial for writing correct and predictable code, especially in complex expressions. Without this knowledge, expressions might yield unexpected results due to the implicit evaluation order defined by the language.
<br>
Table 1.2: Operator Precedence and Associativity (Common Operators)
Precedence
Operator(s)
Description
Associativity
19 (Highest)
(... )
Grouping
n/a
18
. ?. `` new (with args)
Member Access, Optional Chaining, Computed Member Access, Instantiation
L-R
17
new (without args)
Instantiation
R-L
16
++ (postfix) -- (postfix)
Postfix Increment/Decrement
n/a (unary)
15
! ~ + (unary) - (unary) ++ (prefix) -- (prefix) typeof void delete
Logical NOT, Bitwise NOT, Unary Plus/Negation, Prefix Increment/Decrement, Typeof, Void, Delete
R-L (unary)
14
**
Exponentiation
R-L
13
* / %
Multiplication, Division, Remainder
L-R
12
+ (binary) - (binary)
Addition, Subtraction
L-R
11
<< >> >>>
Bitwise Shifts
L-R
10
< <= > >= in instanceof
Relational, in, instanceof
L-R
9
== != === !==
Equality
L-R
8
&
Bitwise AND
L-R
7
^
Bitwise XOR
L-R
6
`
`
Bitwise OR
5
&&
Logical AND
L-R
4
`
`
Logical OR
3
??
Nullish Coalescing
L-R
2
? :
Conditional (Ternary)
R-L
1
= += -= *= /= %= **= <<= >>= >>>= &= ^= `
=&&=
=??=`
0 (Lowest)
,
Comma
L-R

(Adapted from MDN Operator Precedence Table 9)
<br>
Section 2: Control Flow (Conditionals, Loops)
Control flow statements dictate the order in which JavaScript code is executed. They enable programs to make decisions based on conditions and to repeat blocks of code, forming the fundamental logic of any application.
2.1. Conditional Statements
Conditional statements allow a program to execute different blocks of code based on whether a specified condition evaluates to true or false.
if Statement:
The most basic conditional statement. It executes a block of code if its condition is true (or "truthy").
Syntax: if (condition) { /_ block of code to execute if condition is true _/ }.8
if...else Statement:
Provides an alternative block of code to execute if the if statement's condition is false (or "falsy").
Syntax: if (condition) { /_ block for true condition _/ } else { /_ block for false condition _/ }.8
if...else if...else Statement:
Allows for testing a sequence of multiple conditions. The first condition that evaluates to true will have its associated block executed. If none of the conditions are true, the final else block (if present) is executed.8
Syntax:
JavaScript
if (condition1) {
// block 1
} else if (condition2) {
// block 2
} else if (conditionN) {
// block N
} else {
// final else block (optional)
}

It's good practice to always use block statements ({}) for the code to be executed, even if it's a single line, to improve readability and prevent errors, especially with nested conditionals.11
Truthy and Falsy Values:
In JavaScript, the condition in an if statement does not strictly need to be a Boolean value. Any value can be used as a condition, and JavaScript will implicitly convert it to a Boolean (a process called type coercion) to determine whether it's "truthy" or "falsy".11
Falsy Values: These are values that coerce to false in a Boolean context. The complete list of falsy values in JavaScript is:
false (the Boolean value)
0 (the number zero)
-0 (the number negative zero)
0n (BigInt zero)
"" (an empty string)
null
undefined
NaN (Not-a-Number)
Truthy Values: All other values in JavaScript are considered truthy. This includes:
Any non-empty string (e.g., "hello", "0", "false")
Any non-zero number (e.g., 1, -1, 3.14)
All objects (including empty objects {} and empty arrays ``)
All functions
All symbols
A solid understanding of truthy and falsy values is critical for writing concise and accurate conditional logic. Many programming errors stem from incorrect assumptions about how non-Boolean values are evaluated in conditions.
switch Statement:
Provides an alternative to long if...else if...else chains when comparing a single expression against multiple possible constant values (cases).8
Syntax:
JavaScript
switch (expression) {
case value1:
// statements executed if expression === value1
break; // Exits the switch
case value2:
// statements executed if expression === value2
break;
//... more cases
default: // Optional
// statements executed if no case matches
}

The expression is evaluated once. Its value is then compared with the value of each case clause using strict equality (===).
The break statement is crucial. When a matching case is found and its statements are executed, the break statement causes an exit from the switch block. If break is omitted, execution "falls through" to the statements of the next case block, regardless of whether that next case matches the expression.11 This fall-through behavior can be intentional for grouping cases that share code, but it's a common source of bugs if break is accidentally forgotten.
The default clause is optional and is executed if none of the case values match the expression's value.11
<br>
Table 2.1: Truthy and Falsy Values in JavaScript
Value
Type
Truthiness
Notes
false
Boolean
Falsy

0
Number
Falsy

-0
Number
Falsy

0n
BigInt
Falsy

""
String
Falsy
Empty string
null
Null
Falsy

undefined
Undefined
Falsy

NaN
Number
Falsy
Not-a-Number
true
Boolean
Truthy

"hello"
String
Truthy
Non-empty string
"0"
String
Truthy
Non-empty string (even if looks numeric)
42
Number
Truthy
Non-zero number
-42
Number
Truthy
Non-zero number
{}
Object
Truthy
Any object, including empty object
``
Object
Truthy
Any array, including empty array
function(){}
Function
Truthy
Any function

<br>
2.2. Looping Constructs
Looping constructs allow for the repeated execution of a block of code.
for Loop:
Ideal when the number of iterations is known or can be determined beforehand.
Syntax: for (initialization; condition; afterthought) { /* loop body */ }.12
initialization: An expression (including assignment expressions) or variable declaration. Executed once before the loop begins. Typically initializes a counter variable (e.g., let i = 0).
condition: An expression evaluated before each loop iteration. If it evaluates to truthy, the loop body is executed. If falsy, the loop terminates.
afterthought (also called final-expression or increment/decrement expression): An expression executed at the end of each iteration, after the loop body. Typically used to update the counter (e.g., i++).
while Loop:
Repeats a block of code as long as a specified condition is true.
Syntax: while (condition) { /* loop body */ }.12
The condition is evaluated before each execution of the loop body. If the condition is initially false, the loop body will never execute.
It's crucial to ensure that the statements within the loop eventually cause the condition to become false to prevent infinite loops.
do...while Loop:
Similar to a while loop, but the loop body is executed at least once, regardless of the condition's initial state.
Syntax: do { /* loop body */ } while (condition);.12
The condition is evaluated after the loop body has executed.
break Statement (in Loops):
Used to immediately terminate the innermost enclosing loop (for, while, do...while) or switch statement.12
Program execution continues at the statement immediately following the terminated loop or switch.
continue Statement (in Loops):
Skips the remaining statements in the current iteration of the loop and proceeds to the next iteration.12
In a for loop, control jumps to the afterthought expression.
In a while or do...while loop, control jumps back to the evaluation of the condition.
Labeled Statements (with break and continue):
A label is an identifier followed by a colon (:), placed before a loop or block statement. It allows break and continue to refer to a specific enclosing loop, which is useful for controlling nested loops.12
Syntax: myLabel: while (condition) {... break myLabel;... }
break myLabel; terminates the loop identified by myLabel.
continue myLabel; skips to the next iteration of the loop identified by myLabel.
for...in Loop:
Iterates over the enumerable property names (keys) of an object.
Syntax: for (const key in object) { /* code using object[key] */ }.12
The order of iteration is not guaranteed and may vary across JavaScript engines.
It iterates over an object's own properties as well as enumerable properties inherited from its prototype chain. To iterate only over an object's own properties, use object.hasOwnProperty(key) within the loop.
Generally not recommended for iterating over arrays. While arrays are objects, for...in can iterate over non-index properties (if any are added to the array object or its prototype) and the order of indices is not guaranteed. For arrays, for...of or standard array iteration methods (forEach, map, etc.) are preferred. The introduction of for...of in ES6 provided a more direct and reliable way to iterate over array values, addressing these shortcomings of for...in for array iteration.
for...of Loop (ES6+):
Creates a loop iterating over the values of iterable objects. Iterable objects include built-in types like Array, String, Map, Set, and the arguments object, as well as user-defined iterables.
Syntax: for (const value of iterable) { /* code using value */ }.12
This loop provides a simpler and more direct way to access the values of elements in a collection compared to traditional for loops (which require managing an index) or for...in (which gives keys for objects).
Objects are not directly iterable by default with for...of. To iterate over an object's properties using for...of, one can use methods like Object.keys(obj), Object.values(obj), or Object.entries(obj), which return iterables.
JavaScript
const myObject = { a: 1, b: 2, c: 3 };
for (const key of Object.keys(myObject)) {
  console.log(key); // 'a', 'b', 'c'
}
for (const value of Object.values(myObject)) {
  console.log(value); // 1, 2, 3
}
for (const [key, value] of Object.entries(myObject)) {
  console.log(`${key}: ${value}`); // 'a: 1', 'b: 2', 'c: 3'
}

<br>
Table 2.2: Loop Comparison
Loop Type
Syntax
Primary Use Case
Condition Check
Executes At Least Once?
for
for (init; cond; afterthought) {... }
Known number of iterations, iterating with a counter
Before each iteration
No (if cond is initially false)
while
while (condition) {... }
Iterations based on a condition, number unknown
Before each iteration
No (if cond is initially false)
do...while
do {... } while (condition);
Iterations based on a condition, body needs to run once
After each iteration
Yes
for...in
for (const key in object) {... }
Enumerating object property names (keys)
Implicit (for each key)
No (if object has no enumerable properties)
for...of
for (const value of iterable) {... }
Iterating over values of iterable objects (Arrays, Strings, etc.)
Implicit (for each value)
No (if iterable is empty)

<br>
Section 3: Functions (Arrow Functions, Scope, Closures)
Functions are fundamental building blocks in JavaScript, enabling code organization, reusability, and the implementation of complex patterns such as closures. This section focuses on modern function syntax, parameter handling, the behavior of the this keyword, and the critical concepts of scope and closures.
3.1. Function Definition Mechanisms
JavaScript offers several ways to define functions, each with distinct characteristics regarding syntax, hoisting, and behavior.
Function Declarations (Statements):
This is a traditional way to define a named function.
Syntax: function functionName(parameter1, parameter2) { /* function body */ return value; }.14
Hoisting: Function declarations are fully hoisted. This means the entire function definition (both its name and body) is moved to the top of its enclosing scope (either global scope or the scope of an enclosing function) by the JavaScript engine during the compilation phase. As a result, a function declared this way can be called before its actual textual appearance in the code.14
A variable with the same name as the function is created in the current scope.
Function Expressions:
A function expression defines a function as part of a larger expression, typically an assignment to a variable.
Syntax (anonymous): const myFunction = function(parameter1, parameter2) { /* function body */ return value; };.14
Syntax (named): const myFunction = function actualFunctionName(param1, param2) { /* body */ return value; };. The actualFunctionName is primarily useful for debugging (it appears in stack traces) and for recursive calls from within the function itself. It is not accessible outside the function's body.14
Hoisting: Function expressions are not hoisted in the same way as function declarations. If the function expression is assigned to a variable declared with var, the variable declaration (var myFunction;) is hoisted and initialized with undefined. The assignment of the function itself happens only when the execution reaches that line. Therefore, attempting to call myFunction before the assignment line would result in a TypeError (as myFunction would be undefined). If assigned to a variable declared with let or const, the variable is hoisted but remains in the Temporal Dead Zone (TDZ) until the assignment, so it cannot be accessed at all before that point.4
Arrow Functions (ES6+):
Introduced in ES6, arrow functions provide a more concise syntax for writing functions, particularly for anonymous functions or simple one-liners.14
Syntax Variations:
Single parameter, single expression (implicit return): const increment = x => x + 1;
Multiple parameters, single expression (implicit return): const sum = (a, b) => a + b;
No parameters, single expression (implicit return): const sayHello = () => "Hello";
Single parameter, block body (requires explicit return):
JavaScript
const processValue = value => {
  const result = value * 2;
  return result;
};

Multiple parameters, block body (requires explicit return):
JavaScript
const multiply = (a, b) => {
const product = a \* b;
return product;
};

Returning an object literal directly requires wrapping the object in parentheses to distinguish it from a function block: const createPerson = (name, age) => ({ name: name, age: age });
Hoisting: Arrow functions behave like function expressions concerning hoisting. If assigned to a variable, the hoisting rules of that variable (var, let, or const) apply.14 The function itself is not callable before its definition is reached.
Key Differences from Regular Functions: Arrow functions have significant differences from traditional function declarations and expressions, most notably in their handling of the this keyword, the absence of an arguments object, and their inability to be used as constructors. These differences are detailed in subsequent subsections.
3.2. Function Parameters
Parameters are placeholders for values that a function expects to receive when it is called. Arguments are the actual values passed to the function during invocation.
Argument Passing: When a function is called, arguments are passed to its parameters. If fewer arguments are passed than parameters defined, the remaining parameters will typically be undefined (unless they have default values). If more arguments are passed, the extra arguments can be accessed via the arguments object (in regular functions) or rest parameters.
Default Parameters (ES6+):
Allow named parameters to be initialized with default values if no value or undefined is passed for that parameter during the function call.16
Syntax: function greet(name = "Guest", message = "Welcome") { console.log(${message}, ${name}!); }
Default parameter values are evaluated at the time the function is called. This means you can use expressions or even other parameters as default values (provided the other parameters are declared earlier in the parameter list).
JavaScript
function createLog(message, timestamp = Date.now()) {
  console.log(`[${timestamp}]: ${message}`);
}

This feature simplifies code by eliminating the need for manual checks for undefined arguments to assign default values.16
Rest Parameters (ES6+):
Provide a way for a function to accept an indefinite number of arguments as an array.17
Syntax: function sumAll(...numbers) { /_ 'numbers' is now an array of all arguments passed _/ }
The rest parameter must be the last parameter in the function definition. Any parameters after a rest parameter will cause a SyntaxError.17
A rest parameter cannot have a default value itself.20
It gathers all remaining arguments passed to the function (those not matched by preceding named parameters) into a genuine Array instance. This means array methods like map, filter, reduce can be used directly on it.
Rest parameters are generally preferred over the older arguments object for handling a variable number of arguments due to their clarity and true array nature.17 The introduction of rest parameters and default parameters in ES6 significantly enhanced the expressiveness and robustness of function signatures, reducing boilerplate code previously needed for common argument-handling patterns.
3.3. Return Values from Functions
Functions in JavaScript can return a value to the caller using the return statement.
A function can return only a single value. If multiple values need to be returned, they are typically grouped into an object or an array.
The return statement immediately exits the function, and any code after the return statement within the function will not be executed.
If a function does not have an explicit return statement, or if it has a return statement with no value (return;), it implicitly returns undefined.6
Functions can return any JavaScript data type, including primitives, objects, arrays, or even other functions.
3.4. The this Keyword
The this keyword in JavaScript is a frequent source of confusion for developers. Its value is not static but is determined dynamically by how a function is called (its execution context).14
Regular Functions (Declarations and Expressions):
Global Context (Standalone Invocation): When a regular function is called as a standalone function (i.e., not as a method of an object and not with new), this typically refers to the global object (window in browsers, global in Node.js) in non-strict mode. In strict mode ('use strict';), this will be undefined in such cases.21 This behavior can lead to errors if the function expects this to refer to a specific object.
Method Invocation: When a function is called as a method of an object (e.g., myObject.myMethod()), this inside the method is bound to myObject (the object on which the method was called).21
Constructor Invocation: When a function is used as a constructor with the new keyword (e.g., const instance = new MyConstructor();), a new object is created, and this inside the constructor function is bound to this newly created object instance.21
Explicit Binding: The value of this can be explicitly set using:
function.call(thisArg, arg1, arg2,...): Calls the function with a specified thisArg and individual arguments.
function.apply(thisArg, [argsArray]): Calls the function with a specified thisArg and an array (or array-like object) of arguments.
function.bind(thisArg): Creates a new function where this is permanently bound to thisArg. Subsequent calls to the bound function will always have this this value, regardless of how it's invoked.21
Arrow Functions:
Arrow functions exhibit a fundamentally different behavior regarding this: they do not have their own this binding.14
Instead, they lexically inherit the this value from their surrounding (enclosing) non-arrow function's scope at the time they are defined.14 This means this inside an arrow function always refers to whatever this was in its outer lexical environment.
The value of this inside an arrow function cannot be changed using call, apply, or bind. These methods can still pass arguments to the arrow function, but they will have no effect on its this context.
This lexical this binding is a major advantage of arrow functions, especially in scenarios like callbacks (e.g., for setTimeout, event listeners, or array methods like map and filter) and when defining methods in class components in React. It often eliminates the need for older patterns like var self = this; or explicitly binding methods. For example, if a regular function is used as a callback for setTimeout within an object's method, this inside that callback would typically refer to the global object. An arrow function callback, however, would correctly capture the this of the object's method.
3.5. Scope and Closures
Scope and closures are powerful concepts in JavaScript that govern variable accessibility and enable sophisticated programming patterns.
Scope Recap: Scope defines the accessibility of variables. JavaScript has:
Global Scope: Variables declared outside any function or block.
Function Scope: Variables declared with var inside a function are accessible only within that function.
Block Scope: Variables declared with let or const inside a block ({...}) are accessible only within that block.
Lexical Scoping (Static Scope):
JavaScript uses lexical scoping, meaning the scope of a variable is determined by its physical placement within the source code at the time the code is written, not by how or where the function is called at runtime.23
An inner function has access to the variables and parameters of its outer (parent) function, and this continues up the chain of outer functions to the global scope. This chain of accessible scopes is known as the scope chain.24
Closures:
A closure is formed when a function is defined. It is the combination of the function itself and the lexical environment (the scope) in which that function was declared.23
This means a function "remembers" and retains access to its lexical scope (variables, parameters of its outer functions) even if the function is executed outside of that original lexical scope.24 Closures are not something explicitly created with a keyword; they are a natural consequence of lexical scoping in languages with first-class functions.
Under the Hood (Lexical Environment): When a function is created, an internal property (often referred to as [[Environment]]) is associated with it, holding a reference to the lexical environment of its creation. A lexical environment is an internal JavaScript engine construct consisting of two parts:
Environment Record: An object that stores the declarations of local variables, function parameters, and the value of this for that scope.
Reference to the Outer Lexical Environment: A pointer to the lexical environment of the enclosing scope. This forms the link in the scope chain.24 When a function is called, a new lexical environment is created for that specific call. Its "outer environment" reference is set based on the function's [[Environment]] property. When the code inside the function attempts to access a variable, the JavaScript engine first looks in the current function call's lexical environment. If not found, it searches in the outer lexical environment, and so on, up the scope chain until the variable is found or the global scope is reached. If a function (the closure) is still accessible even after its outer function has finished executing, the JavaScript engine ensures that the lexical environment (or the parts of it that the closure uses) remains in memory.
Practical Applications of Closures:
Data Encapsulation and Privacy: Creating "private" variables and methods that are not accessible from outside a module or function, but are accessible to inner functions.
JavaScript
function createSecretHolder(secret) {
return {
getSecret: function() { return secret; } // `secret` is enclosed
};
}
const holder = createSecretHolder("my secret");
// console.log(holder.secret); // undefined, secret is not directly accessible
console.log(holder.getSecret()); // "my secret"

Creating Functions with Persistent State: For example, a counter function that remembers its previous value across multiple calls.
JavaScript
function makeCounter() {
let count = 0; // `count` is part of the closure's environment
return function() {
count++;
return count;
};
}
const counter1 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

Callbacks and Event Handlers: Maintaining context or state for when the callback is eventually executed.
Currying and Partial Application: Creating new functions by pre-filling some arguments of an existing function.
3.6. The arguments Object
The arguments object is an array-like object accessible inside regular functions (function declarations and function expressions) that contains the values of the arguments passed to that function.14
It allows access to all arguments passed, regardless of whether corresponding parameters were formally defined in the function signature.
It has a length property indicating the number of arguments actually passed.
Arguments can be accessed by index (e.g., arguments, arguments).
Crucially, the arguments object is not available in arrow functions. Arrow functions must rely on rest parameters (...args) to capture a variable number of arguments as a true array.14
Differences from Rest Parameters 17:
Type: arguments is array-like but not a true Array instance. It lacks standard array methods like map(), forEach(), filter() directly (though these can be called using Array.prototype.method.call(arguments,...)). Rest parameters, however, are true Array instances.
Content: arguments contains all parameters passed to the function. Rest parameters only collect the arguments that were not assigned to explicitly named parameters preceding them.
Modern Practice: In modern JavaScript, rest parameters are generally preferred over the arguments object. They provide a cleaner, more explicit syntax and result in a true array, making them easier to work with.
<br>
Table 3.1: Function Declarations vs. Function Expressions vs. Arrow Functions
Feature
Function Declaration
Function Expression
Arrow Function
Syntax Example
function greet() {}
const greet = function() {};
const greet = () => {};
Hoisting Behavior
Fully hoisted (name and body)
Variable hoisted (if var), TDZ (if let/const); function value not hoisted
Variable hoisted (if var), TDZ (if let/const); function value not hoisted
this Binding
Dynamic (depends on invocation)
Dynamic (depends on invocation)
Lexical (inherits from surrounding scope)
arguments Object
Available
Available
Not available (use rest parameters ...args)
Usable as Constructor (new)
Yes
Yes (if not an arrow function in disguise)
No (TypeError)
Typical Use Cases
General purpose functions, when hoisting is desired
Callbacks, IIFEs, functions assigned to properties
Callbacks (especially with this preservation), concise functions

<br>
Section 4: Objects and Arrays (Methods, Destructuring, Spread/Rest Operators)
Objects and arrays are the cornerstone data structures in JavaScript, used for organizing and storing collections of related data and functionality. This section delves into their creation, manipulation, and the powerful ES6+ features like destructuring and spread/rest syntax that enhance working with them.
4.1. Objects In-Depth
Objects in JavaScript are dynamic collections of key-value pairs. Keys are typically strings (or Symbols), and values can be any valid JavaScript data type, including other objects or functions (which are then called methods).
Object Literal Syntax:
The most common way to create objects is using the literal syntax: const myObject = { key1: "value1", "property name with spaces": true, numericKey: 123 };.22
Property keys that are valid JavaScript identifiers can be written without quotes. Keys containing spaces or special characters, or those that are not valid identifiers, must be enclosed in quotes (single or double). Numeric keys are automatically coerced to strings.
Property Management:
Accessing Properties:
Dot Notation: myObject.key1. This is used when the property key is a valid identifier and is known at the time of writing.22
Bracket Notation: myObject["property name with spaces"]. This notation is more versatile. It must be used if the property key is not a valid identifier (e.g., contains spaces) or if the key is dynamic (i.e., stored in a variable).22 For example:
JavaScript
let dynamicKey = "key1";
console.log(myObject[dynamicKey]); // Accesses myObject.key1
The ability to use an expression that evaluates to a string for the property name makes bracket notation powerful for scenarios where property names are determined at runtime.
Adding/Modifying Properties: Properties can be added or existing ones modified by simple assignment: myObject.newKey = "a new value"; or myObject["anotherKey"] = 456;.22
Deleting Properties: The delete operator can remove a property from an object: delete myObject.key1;.
ES6+ Computed Property Names:
Allows the use of an expression, enclosed in square brackets ``, to define a property key within an object literal at the time of creation.25
Syntax:
JavaScript
let suffix = "Name";
const person = {
  ["first" + suffix]: "Alice",
  ["last" + suffix]: "Smith"
};
console.log(person.firstName); // "Alice"
console.log(person.lastName);  // "Smith"

Method Definitions:
Methods are functions that are properties of an object.
Traditional syntax: const calculator = { add: function(a, b) { return a + b; } };.22
ES6+ Shorthand Syntax: Provides a more concise way to define methods: const calculator = { add(a, b) { return a + b; } };.22
this in Methods: When a method is defined using regular function syntax (or the ES6 shorthand, which behaves similarly regarding this), the this keyword inside the method refers to the object the method was called on (the receiver of the method call).22 If an arrow function is used as a method, it will inherit this lexically, which is often not the desired behavior for object methods that need to refer to the object instance itself.
ES6+ Object Destructuring:
A powerful and concise syntax for extracting values from object properties and assigning them to distinct variables.1 This greatly improves code readability when working with objects, especially function parameters or props in React.
Basic Syntax: const { property1, property2 } = myObject; This creates two variables, property1 and property2, initialized with the values of myObject.property1 and myObject.property2.
Aliasing (Assigning to New Variable Names): If you want to assign the extracted value to a variable with a different name: const { property1: newName1, property2: anotherName } = myObject;.27
Default Values: Provide a default value if a property does not exist on the object or if its value is undefined: const { property1, nonExistentProperty = "defaultValue" } = myObject;.27
Nested Destructuring: Extract values from properties of nested objects: const { name, address: { city, country } } = userProfile;.
Rest Properties: Collect all remaining enumerable own properties of an object into a new object: const { id, name,...otherDetails } = userRecord; The otherDetails object will contain all properties from userRecord except id and name.26
Destructuring in Function Parameters: A very common pattern for easily accessing properties of an object passed as an argument:
JavaScript
function displayUser({ name, age = 30, email }) {
console.log(`Name: ${name}, Age: ${age}, Email: ${email}`);
}
displayUser({ name: "Bob", email: "bob@example.com" });

ES6+ Object Spread Syntax (...):
Provides a concise way to copy enumerable own properties from one or more source objects into a new object literal. It is frequently used for shallow cloning and merging objects, especially in patterns that promote immutability.18
Shallow Cloning: const clonedObject = {...originalObject };. This creates a new object with all the same properties and values as originalObject.
Merging Objects: const mergedObject = {...objectA,...objectB, customProperty: "override" };. Properties are copied from left to right. If multiple source objects have properties with the same key, the value from the rightmost object in the spread sequence will overwrite earlier ones. Any properties explicitly defined after the spreads will also overwrite.
Important Note on Shallow Copy: The spread syntax performs a shallow copy. This means if a property value in the source object is itself an object or an array, the reference to that nested object/array is copied, not the nested object/array itself. Modifying the nested object/array in the clone will also affect the original, and vice-versa.18
Difference from Object.assign(): While both can be used for merging objects, Object.assign(target,...sources) modifies the target object and triggers setters on the target. The spread syntax creates a new object and does not trigger setters during property definition.25
4.2. Arrays In-Depth
Arrays in JavaScript are ordered, zero-indexed collections of values. They are a special type of object, optimized for storing and manipulating ordered data.
Array Literal Syntax: The most common way to create an array: const myArray = [10, "apple", true, { id: 1 }, ["nested", "array"]];.28
Arrays can hold elements of mixed data types.
Since arrays are objects, typeof myArray returns "object". To reliably check if a value is an array, use Array.isArray(myArray).29
length Property:
Indicates the number of elements in the array. It is always one greater than the highest index in the array.28
The length property is mutable. Setting it to a value smaller than the current length will truncate the array, removing elements from the end. Setting it to a larger value will create empty slots (which behave like undefined in many contexts) at the end of the array.
Accessing and Modifying Elements:
Elements are accessed using zero-based bracket notation: myArray (first element), myArray (second element), etc.
Elements can be modified by assigning a new value to a specific index: myArray = "banana";.
New elements can be added by assigning to an index equal to or greater than the current length: myArray[myArray.length] = "new last element"; (though push() is generally preferred for adding to the end).
Comprehensive Coverage of Common Array Methods: JavaScript provides a rich set of built-in methods for array manipulation. Understanding which methods modify (mutate) the original array and which return a new array is crucial, especially in contexts like React state management where immutability is preferred.28 The distinction between mutating and non-mutating methods is a core concept for React Native developers. Direct mutation of state arrays can lead to bugs and break React's change detection. Non-mutating methods, or techniques like the spread syntax to create copies before mutation, are vital for predictable state updates.
Mutator Methods (modify the original array):
push(...items): Adds one or more elements to the end of an array and returns the new length.
pop(): Removes the last element from an array and returns that removed element.
shift(): Removes the first element from an array and returns that removed element.
unshift(...items): Adds one or more elements to the beginning of an array and returns the new length.
splice(startIndex, deleteCount,...itemsToAdd): A versatile method that changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Returns an array containing the deleted elements.
sort(compareFunction): Sorts the elements of an array in place. By default, it sorts elements lexicographically (as strings). For numeric or custom sorting, a compareFunction must be provided.
reverse(): Reverses the order of the elements of an array in place.
fill(value, startIndex, endIndex): Fills all the elements of an array from a startIndex (default 0) to an endIndex (default array.length) with a static value.
copyWithin(targetIndex, startIndex, endIndex): Shallow copies part of an array to another location in the same array and returns it, without modifying its length.
Accessor Methods (return a new array or value; do not modify the original array):
concat(...arraysOrItems): Returns a new array created by merging the calling array with other arrays and/or values.
slice(startIndex, endIndex): Returns a shallow copy of a portion of an array into a new array object. The original array is not modified. endIndex is exclusive.
join(separator): Joins all elements of an array into a string. A separator string can be specified.
includes(valueToFind, fromIndex): Determines whether an array includes a certain value among its entries, returning true or false.
indexOf(searchElement, fromIndex): Returns the first index at which a given element can be found in the array, or -1 if it is not present.
lastIndexOf(searchElement, fromIndex): Returns the last index at which a given element can be found in the array, or -1 if it is not present. Searches backwards from fromIndex.
toString(): Returns a string representing the specified array and its elements.
toLocaleString(): Returns a localized string representing the array and its elements.
at(index) (ES2022+): Takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array (e.g., myArray.at(-1) is the last element).
Iteration Methods (execute a callback for each element; generally do not modify the original array unless the callback itself does so):
forEach(callback(element, index, array)): Executes a provided function once for each array element. Does not return a value (implicitly returns undefined).
map(callback(element, index, array)): Creates a new array populated with the results of calling a provided function on every element in the calling array.
filter(callback(element, index, array)): Creates a new array with all elements that pass the test implemented by the provided function (i.e., for which the callback returns a truthy value).
reduce(callback(accumulator, currentValue, currentIndex, array), initialValue): Executes a "reducer" function on each element of the array, resulting in a single output value (the accumulator).
reduceRight(callback(accumulator, currentValue, currentIndex, array), initialValue): Similar to reduce(), but executes from right-to-left.
every(callback(element, index, array)): Tests whether all elements in the array pass the test implemented by the provided function. Returns a Boolean.
some(callback(element, index, array)): Tests whether at least one element in the array passes the test implemented by the provided function. Returns a Boolean.
find(callback(element, index, array)): Returns the value of the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
findIndex(callback(element, index, array)): Returns the index of the first element in the array that satisfies the provided testing function. Otherwise, -1 is returned.
findLast(callback(element, index, array)) (ES2023+): Similar to find(), but iterates from the end of the array.
findLastIndex(callback(element, index, array)) (ES2023+): Similar to findIndex(), but iterates from the end of the array.
flatMap(callback(element, index, array)): First maps each element using a mapping function, then flattens the result into a new array (to a depth of 1).
keys(): Returns a new Array Iterator object that contains the keys (indices) for each index in the array.
values(): Returns a new Array Iterator object that contains the values for each index in the array.
entries(): Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
New Non-Mutating Methods (ES2023+): These methods provide non-mutating alternatives to older mutating methods, which is beneficial for functional programming and immutable state patterns.29
toReversed(): Returns a new array with elements in reversed order (non-mutating version of reverse()).
toSorted(compareFunction): Returns a new array with elements sorted (non-mutating version of sort()).
toSpliced(startIndex, deleteCount,...itemsToAdd): Returns a new array with elements spliced (non-mutating version of splice()).
with(index, value): Returns a new array with the element at the given index replaced with the new value.
ES6+ Array Destructuring:
A concise syntax for extracting multiple values from an array and assigning them to variables in a single statement.1
Basic Syntax: const [firstElement, secondElement] = myArray;.
Skipping Elements: Use a comma placeholder to skip elements: const [first, , third] = myArray;.26
Default Values: Provide default values for elements that might be missing or undefined: const [first, second = "defaultVal"] = someArray;.27
Rest Elements: Collect all remaining elements of an array into a new array: const [firstItem, secondItem,...remainingItems] = fullArray;. The rest element must be the last one in the destructuring pattern.26
Swapping Variables: A common use case for array destructuring is swapping the values of two variables without needing a temporary variable: [a, b] = [b, a];.26
Destructuring in Function Parameters: function processCoordinates([x, y]) { console.log(x, y); } processCoordinates();.
ES6+ Array Spread Syntax (...):
Expands an iterable (like an array or string) into individual elements. This is extremely useful for creating new arrays, concatenating, and passing arguments to functions.18
Creating New Arrays with Existing Elements: const newArray = [...oldArray, newItem1, "anotherItem"];. This creates a new array containing all elements from oldArray followed by newItem1 and "anotherItem".
Concatenating Arrays: const combinedArray = [...array1,...array2,...array3];.
Passing Array Elements as Individual Arguments to Functions: If a function expects multiple arguments (e.g., Math.max(arg1, arg2, arg3)), you can pass elements from an array like this: const numbers = ; const maxNumber = Math.max(...numbers);.18
Converting Iterables to Arrays: Can convert other iterables, like a NodeList (from DOM operations) or a string, into an array: const characters =;.
Shallow Copying an Array: const arrayCopy = [...originalArray];. This creates a new array with the same elements. Like object spread, this is a shallow copy.
The introduction of destructuring and spread syntax in ES6 has significantly improved the ergonomics of working with objects and arrays. They promote more declarative code and align well with functional programming paradigms that favor immutability, which is particularly relevant in state management libraries used with React Native.
<br>
Table 4.1: Summary of Key Array Methods
Method Name & Syntax
Description
Mutates Original?
Returns
push(...items)
Adds items to the end
Yes
New length of the array
pop()
Removes the last item
Yes
The removed item
shift()
Removes the first item
Yes
The removed item
unshift(...items)
Adds items to the beginning
Yes
New length of the array
splice(start, deleteCount,...itemsToAdd)
Removes/replaces/adds items in place
Yes
Array of deleted items
slice(start, end)
Returns a shallow copy of a portion
No
New array with the extracted elements
map(callback)
Creates a new array with results of callback on each element
No
New array with transformed elements
filter(callback)
Creates a new array with elements for which callback returns truthy
No
New array with filtered elements
reduce(callback, initialValue)
Reduces array to a single value by applying callback to accumulator and each element
No
The single accumulated value
forEach(callback)
Executes callback for each element
No (by itself)
undefined
find(callback)
Returns the first element for which callback returns truthy
No
The found element, or undefined
findIndex(callback)
Returns the index of the first element for which callback returns truthy
No
The index of the found element, or -1
includes(valueToFind, fromIndex)
Checks if an array contains a certain value
No
true or false
join(separator)
Joins elements into a string
No
String representation of the array
concat(...arraysOrItems)
Merges arrays/items into a new array
No
New concatenated array
sort(compareFunction)
Sorts elements in place (default: lexicographical)
Yes
The sorted array (reference to original)
reverse()
Reverses elements in place
Yes
The reversed array (reference to original)
toSorted(compareFunction) (ES2023+)
Returns a new array with elements sorted
No
New sorted array
toReversed() (ES2023+)
Returns a new array with elements in reversed order
No
New reversed array
toSpliced(start, deleteCount,...itemsToAdd) (ES2023+)
Returns a new array with elements spliced
No
New array with elements spliced
with(index, value) (ES2023+)
Returns a new array with the element at index replaced with value
No
New array with the element at index replaced

<br>
Section 5: Asynchronous JavaScript (Callbacks, Promises, async/await)
Asynchronous operations are a cornerstone of modern JavaScript, especially in environments like React Native where non-blocking I/O (Input/Output) operations such as network requests, file system access, or timers are essential for a responsive user interface. This section explores the evolution of handling asynchronicity in JavaScript, from traditional callbacks to Promises and the more recent async/await syntax.
5.1. Fundamentals of Synchronous vs. Asynchronous Programming in JavaScript
Synchronous Execution: In a synchronous programming model, code is executed sequentially, one line at a time. Each operation must complete before the next operation can begin. If a long-running synchronous operation (e.g., a complex calculation or a blocking I/O call, though the latter is rare in JavaScript's main thread) occurs, it will block the main thread of execution. In a UI application, this results in an unresponsive interface (e.g., the app freezes) until the operation finishes.30
Asynchronous Execution: Asynchronous programming allows operations, particularly those that take time (like fetching data from a server, reading a file, or waiting for a timer), to be initiated and then run in the background without blocking the main thread. The main thread can continue executing other code. When the asynchronous operation eventually completes (or fails), a specific piece of code (often a callback function, or a Promise handler) is executed to handle the result or error.30
Why Asynchronous is Crucial for UI Applications: In UI-driven applications such as those built with React Native, maintaining a responsive user interface is paramount. Asynchronous operations prevent the UI from freezing during time-consuming tasks. For instance, if a network request were synchronous, the entire app would become unresponsive until the data was received from the server. Asynchronous patterns ensure that the user can continue to interact with the app while these operations are in progress.
5.2. Callbacks
Callbacks were the earliest mechanism for handling asynchronous operations in JavaScript.
Definition: A callback is a function that is passed as an argument to another function. This passed-in function is intended to be executed ("called back") at a later time, typically after the completion of an asynchronous operation or an event.30
Role in Asynchronous Operations:
Event Handlers: Used extensively in browser and Node.js environments to respond to events (e.g., user clicks, mouse movements, server responses). button.addEventListener('click', function() { /* This is a callback */ });
Timers: Functions like setTimeout() and setInterval() accept callbacks to be executed after a specified delay or at regular intervals. setTimeout(function() { /* This callback runs after 1 second */ }, 1000);
Network Requests: Older APIs for making network requests (like the XMLHttpRequest object in browsers or some core Node.js modules) relied heavily on callbacks to handle responses or errors.
"Callback Hell" (Pyramid of Doom):
When multiple asynchronous operations need to be performed in sequence, where each operation depends on the result of the previous one, it often leads to deeply nested callback functions. This pattern is pejoratively known as "Callback Hell" or the "Pyramid of Doom" due to the triangular shape the indented code forms.30
Consequences:
Readability Suffers: The code becomes very difficult to read and follow due to excessive nesting and indentation.
Maintainability Decreases: Modifying or debugging such code is challenging and error-prone.
Error Handling Becomes Complex: Each nested callback might require its own error handling logic, leading to repetitive and often inconsistent error management.31
Example:
JavaScript
// Illustrative example of callback hell
asyncOperation1(arg1, function(error1, result1) {
  if (error1) {
    handleError(error1);
  } else {
    asyncOperation2(result1, function(error2, result2) {
      if (error2) {
        handleError(error2);
      } else {
        asyncOperation3(result2, function(error3, result3) {
          if (error3) {
            handleError(error3);
          } else {
            //...and so on
            console.log("All operations complete:", result3);
          }
        });
      }
    });
  }
});

The difficulties posed by callback hell were a primary motivation for the introduction of Promises in ES6.
5.3. Promises (ES6+)
Promises provide a more robust and structured approach to managing asynchronous operations, offering a cleaner alternative to callback-based patterns.
Core Concepts: A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value (or reason for failure). It acts as a placeholder for a future value.32
States of a Promise: A Promise can be in one of three states 32:
pending: The initial state; the asynchronous operation has not yet completed.
fulfilled (often referred to as resolved): The operation completed successfully, and the Promise has a fulfillment value.
rejected: The operation failed, and the Promise has a reason for the failure (typically an error object). A Promise is considered settled if it is either fulfilled or rejected (i.e., no longer pending). Once a Promise is settled, its state and value/reason are immutable.
Creating a Promise: Promises are typically created using the new Promise() constructor, which takes an "executor" function as an argument. The executor function itself receives two functions as arguments: resolve and reject.
JavaScript
const myPromise = new Promise((resolve, reject) => {
// Perform an asynchronous operation
setTimeout(() => {
const success = Math.random() > 0.5;
if (success) {
resolve("Operation was successful!"); // Fulfill the promise
} else {
reject(new Error("Operation failed.")); // Reject the promise
}
}, 1000);
});

Consuming Promises: The primary way to interact with a Promise and handle its eventual outcome is through its methods:
.then(onFulfilled, onRejected): This method is used to schedule callbacks for when the Promise settles.32
onFulfilled: A function called if the Promise is fulfilled. It receives the fulfillment value as its argument.
onRejected (optional): A function called if the Promise is rejected. It receives the rejection reason as its argument.
Crucially, .then() always returns a new Promise. This is what enables Promise chaining.33
.catch(onRejected): This method is a more readable shorthand for .then(null, onRejected). It's used specifically to handle rejections.32 It also returns a new Promise.
.finally(onFinally): This method schedules a callback function to be executed when the Promise is settled, regardless of whether it was fulfilled or rejected. It's useful for cleanup tasks (e.g., hiding a loading spinner). The onFinally callback receives no arguments, and its return value is generally ignored (unless it throws an error or returns a rejected promise). It also returns a new Promise that typically resolves with the original promise's outcome.32
Promise Chaining:
Because .then(), .catch(), and .finally() return new Promises, these methods can be chained together to create a sequence of asynchronous operations in a more linear and readable fashion than nested callbacks.33
How Return Values Affect the Chain 33:
If an onFulfilled or onRejected handler returns a regular value (not a Promise), the Promise returned by .then() (or .catch()) is fulfilled with that value.
If a handler throws an error, the returned Promise is rejected with that error.
If a handler returns another Promise (let's call it P2), the Promise returned by .then() (or .catch()) will "adopt" the state of P2. That is, it will wait for P2 to settle and then settle with P2's fulfillment value or rejection reason. This is key for sequencing asynchronous operations where one depends on the completion of another.
JavaScript
fetchUserData()
.then(user => {
console.log("User data:", user);
return fetchUserOrders(user.id); // Returns another promise
})
.then(orders => {
console.log("User orders:", orders);
// Further processing
})
.catch(error => {
console.error("An error occurred:", error);
})
.finally(() => {
console.log("Cleanup operations finished.");
});

Static Promise Methods: The Promise constructor itself provides several static utility methods for working with multiple Promises 32:
Promise.resolve(value): Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e., has a .then method), the returned promise will "follow" that thenable, adopting its eventual state. If the value is not a thenable, the returned promise will be fulfilled with the value.
Promise.reject(reason): Returns a Promise object that is rejected with the given reason.
Promise.all(iterableOfPromises): Takes an iterable (e.g., an array) of Promises. It returns a single Promise that:
Fulfills when all of the input Promises have fulfilled. The fulfillment value is an array of the fulfillment values of the input Promises, in the same order as the input iterable.
Rejects if any of the input Promises reject, with the rejection reason of the first Promise that rejected.
Promise.race(iterableOfPromises): Takes an iterable of Promises. It returns a single Promise that:
Settles (fulfills or rejects) as soon as the first Promise in the iterable settles, with the same fulfillment value or rejection reason.
Promise.allSettled(iterableOfPromises) (ES2020+): Takes an iterable of Promises. It returns a Promise that fulfills after all of the given Promises have either fulfilled or rejected. The fulfillment value is an array of objects, each describing the outcome of a Promise: {status: "fulfilled", value:...} or {status: "rejected", reason:...}. This is useful when you need to know the outcome of all operations, regardless of individual failures.
Promise.any(iterableOfPromises) (ES2021+): Takes an iterable of Promises. It returns a Promise that fulfills as soon as any of the input Promises fulfill, with the value of the first one that fulfilled. If all input Promises reject, it rejects with an AggregateError (an error object that groups all the individual rejection reasons).
<br>
Table 5.1: Promise States and Transitions
State
Description
How it's Reached
Next Possible States
pending
Initial state, operation not yet completed
When new Promise() is created
fulfilled, rejected
fulfilled
Operation completed successfully, has a value
Executor calls resolve(value)
(Terminal state)
rejected
Operation failed, has a reason (error)
Executor calls reject(reason) or error thrown in executor
(Terminal state)

<br>
5.4. async/await (ES2017+)
async/await is a more recent addition to JavaScript (ES2017) that provides syntactic sugar on top of Promises. It allows asynchronous, Promise-based code to be written in a style that looks and behaves more like synchronous code, making it easier to read and reason about.34
async Functions:
To use await, the enclosing function must be declared with the async keyword.
Syntax: async function myFunction() { /*... */ } or const myArrowFunction = async () => { /*... */ };.34
An async function always implicitly returns a Promise.34
If the async function executes a return value; statement, the Promise it returns will be fulfilled with value.
If the async function throws an error (or an awaited Promise within it rejects and is not caught), the Promise it returns will be rejected with that error.
await Keyword:
The await keyword can only be used inside an async function (or at the top level of JavaScript modules in modern environments).34
When await is placed before a Promise, it pauses the execution of the async function until that Promise settles (fulfills or rejects).34 It does not block the main JavaScript thread; instead, it yields control back to the event loop, allowing other code to run.
If the awaited Promise fulfills, the await expression evaluates to the fulfillment value of the Promise.
If the awaited Promise rejects, the await expression throws the rejection reason. This thrown error can be caught using a standard try...catch block within the async function.35
Simplification of Promise-based Code:
async/await helps to avoid long chains of .then() calls, resulting in code that is often flatter, more linear, and easier to follow, especially for complex sequences of asynchronous operations.
Example Comparison:
JavaScript
// Using Promises with.then()
function fetchDataWithPromises() {
  return fetch('https://api.example.com/data')
   .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
   .then(data => {
      console.log("Data received (Promises):", data);
      return data; // Make data available to the next.then() if chained
    })
   .catch(error => {
      console.error("Failed to fetch data (Promises):", error);
      throw error; // Re-throw to propagate the error if needed
    });
}

// Using async/await
async function fetchDataWithAsyncAwait() {
try {
const response = await fetch('https://api.example.com/data');
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const data = await response.json();
console.log("Data received (async/await):", data);
return data; // The async function's promise will fulfill with this
} catch (error) {
console.error("Failed to fetch data (async/await):", error);
throw error; // The async function's promise will reject with this
}
}

Error Handling with try...catch:
Standard try...catch blocks can be used around await expressions to handle errors (rejected Promises) in a way that is familiar from synchronous error handling.34 This often makes error handling logic more straightforward compared to .catch() chains.
5.5. "Under the Hood": Event Loop, Callback Queue (Task Queue), and Microtask Queue
JavaScript is a single-threaded language, meaning it has only one call stack and can execute only one piece of code at a time. However, it achieves concurrency (handling multiple things seemingly at once) through a mechanism involving the event loop, and different task queues, which operate in conjunction with APIs provided by the hosting environment (like a web browser or Node.js).
JavaScript as a Single-Threaded Language: At its core, the JavaScript engine has a single thread for code execution.
The Call Stack: This is a data structure that keeps track of function calls in the program. When a function is called, a new frame is pushed onto the stack. When a function returns, its frame is popped off the stack.
Web APIs / Node.js Background Operations: Asynchronous operations like setTimeout, DOM events (in browsers), fetch requests, or file system operations (in Node.js) are not handled directly by the JavaScript engine's main thread. Instead, they are offloaded to the browser's Web APIs or the Node.js environment's underlying system (often using separate threads managed by the environment). When these background operations complete, they don't directly interrupt the JavaScript execution; instead, they place their associated callback functions into a queue.36
The Event Loop: This is a constantly running process that monitors both the Call Stack and the task queues. Its fundamental job is to take a task from a queue and push it onto the Call Stack for execution, but only when the Call Stack is empty.36
Callback Queue (Task Queue / Macrotask Queue):
This queue holds callback functions that are ready to be executed. These callbacks typically come from completed "macrotasks" such as:
setTimeout and setInterval timers.
I/O operations (e.g., network responses, file reads).
User interaction events (e.g., clicks, key presses).
UI rendering updates (in browsers).
The Event Loop picks one task from this queue per "tick" or iteration, but only when the Call Stack is empty.36
Microtask Queue:
This queue holds callbacks from completed "microtasks." Microtasks have a higher priority than macrotasks. The primary sources of microtasks are:
Promise handlers (.then(), .catch(), .finally() callbacks). When a Promise settles, its attached handlers are scheduled as microtasks.
Callbacks registered with queueMicrotask().
MutationObserver callbacks (in browsers).
Higher Priority and Execution Timing: The Microtask Queue is processed after the currently executing synchronous script finishes, and critically, after each macrotask from the Callback Queue finishes. Before the Event Loop considers taking another macrotask or performing rendering updates, it will execute all tasks currently in the Microtask Queue until it is empty. This means if a microtask adds another microtask to the queue, that new microtask will also be executed before the next macrotask or rendering.36
Order of Execution: The general flow is as follows:
All synchronous code currently on the Call Stack executes until the Call Stack is empty.
The JavaScript engine checks the Microtask Queue. If it's not empty, it executes all microtasks in the queue sequentially until the Microtask Queue becomes empty. This happens within the same event loop tick.
(Browser specific) If rendering updates are due and conditions allow, the browser may perform UI rendering.
The Event Loop checks the Callback (Macrotask) Queue. If it's not empty, it dequeues the oldest task, pushes its callback function onto the Call Stack, and execution jumps back to step 1 (executing this new task).
Implications for Developers: Understanding this execution order is crucial for predicting the behavior of code that mixes synchronous operations, Promises, async/await, and traditional callbacks like setTimeout. For example, a Promise's .then() callback (a microtask) will always execute before a setTimeout callback (a macrotask) scheduled for the same effective "time," even if the setTimeout delay is 0ms.
Conceptual Diagram: Async/Await Flow
(This would be a Mermaid diagram in the final course material)
An async function begins execution synchronously. When an await keyword is encountered before a Promise:
The async function's execution is paused.
If the awaited Promise is not yet settled, control is yielded back to the event loop, allowing other code (e.g., UI updates, other event handlers) to run. The JavaScript engine essentially registers the continuation of the async function to be executed when the Promise settles.
When the awaited Promise fulfills, its value becomes the result of the await expression, and the async function resumes execution from that point.
If the awaited Promise rejects, the rejection reason is thrown as an exception at the point of the await, which can be caught by a try...catch block within the async function. The key is that await does not block the main thread; it integrates with the Promise mechanism and the event loop to manage the asynchronous flow.
Conceptual Diagram: Event Loop, Call Stack, Callback Queue, Microtask Queue Interaction
(This would be a Mermaid diagram in the final course material)
Imagine four main components:
Call Stack: A LIFO (Last-In, First-Out) stack where function execution frames are pushed and popped.
Web APIs / Background: Where asynchronous operations (e.g., setTimeout, fetch) are handled by the environment. Upon completion, their callbacks are sent to a queue.
Callback Queue (Macrotask Queue): A FIFO (First-In, First-Out) queue holding callbacks from completed macrotasks.
Microtask Queue: A FIFO queue holding callbacks from completed microtasks (e.g., Promise handlers). This queue has higher priority.
Event Loop: Continuously checks:
Is the Call Stack empty?
If yes, process the Microtask Queue until empty.
If Microtask Queue is empty, take one task from the Callback Queue and push it to the Call Stack.
This cycle ensures non-blocking behavior and orderly execution of asynchronous tasks.
Section 6: ES6 Modules (Import/Export)
ES6 Modules provide a standardized, built-in module system for JavaScript, enabling better code organization, reusability, and maintainability by allowing code to be split into separate files (modules). They help avoid polluting the global namespace and make dependency management more explicit.
6.1. Introduction to Modules
Purpose:
Organization: Break down large codebases into smaller, more manageable, and self-contained pieces.
Reusability: Write code once in a module and use it in multiple parts of an application or in different projects.
Encapsulation: Modules can hide internal implementation details and only expose a public API (Application Programming Interface), preventing unintended external access or modification.
Dependency Management: Clearly define which other modules a given module depends on.
Namespace Management: Each module has its own scope, preventing naming conflicts between variables and functions in different modules and avoiding the creation of global variables.
In the context of React Native, the Metro bundler understands and processes ES6 module syntax to bundle all JavaScript code and assets for the application.
6.2. export Statement: Making Code Available
The export statement is used to make variables, functions, or classes from one module available for use in other modules.38
Named Exports:
Allow a module to export multiple values, each with a distinct name.
Exporting at declaration:
JavaScript
// in utils.js
export const PI = 3.14159;
export function add(a, b) {
return a + b;
}
export class User { /_... _/ }

Exporting existing variables/functions (list at the end):
JavaScript
// in utils.js
const GREETING = "Hello";
function multiply(x, y) { return x \* y; }
//...
export { GREETING, multiply };

Aliasing exports: You can export a value under a different name using as.
JavaScript
// in utils.js
function internalFunctionName() { /_... _/ }
export { internalFunctionName as publicName };

A module can have multiple named exports.38
Default Exports:
Allows a module to export a single primary value. This is often used for the main functionality or class provided by a module.
Exporting at declaration:
JavaScript
// in MyComponent.js
export default function MyComponent() { /_... _/ }
// or
// export default class MyClass { /_... _/ }

Exporting an existing value:
JavaScript
// in config.js
const appConfig = { version: "1.0" };
export default appConfig;

A module can have only one default export.38 The name used during import for a default export can be chosen by the importing module.
Re-exporting:
Modules can also re-export values from other modules. This is useful for creating "barrel" files that aggregate exports from multiple modules into a single point of access.
Re-exporting named exports:
JavaScript
// in main-utils.js
export { add, subtract } from './mathUtils.js'; // Re-exports add and subtract
export { formatCurrency } from './stringUtils.js';

Re-exporting all named exports from another module:
JavaScript
// in services.js
export _ from './userService.js'; // Re-exports all named exports from userService.js
// Note: `export _` does NOT re-export the default export of the other module.[38]

Re-exporting a default export (as named or default):
JavaScript
// Re-exporting default as named
export { default as UserClass } from './User.js';
// Re-exporting default as default (less common for clarity, but possible)
// export { default } from './User.js';

6.3. import Statement: Bringing Exported Code In
The import statement is used to bring exported variables, functions, or classes from other modules into the scope of the current module.39
Named Imports:
Used to import values
Works cited
Grammar and types - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types
Explain the difference between global scope, function scope, and block scope | Quiz Interview Questions with Solutions - GreatFrontEnd, accessed May 9, 2025, https://www.greatfrontend.com/questions/quiz/explain-the-difference-between-global-scope-function-scope-and-block-scope
Scope - MDN Web Docs Glossary: Definitions of Web-related terms, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Glossary/Scope
How JavaScript Works (Part 4)? Hoisting, var, let, const, TDZ - DEV ..., accessed May 9, 2025, https://dev.to/samabaasi/how-javascript-works-part-4-hoisting-var-let-const-tdz-2d6
Basic math in JavaScript — numbers and operators - Learn web ..., accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math
JavaScript data types and data structures - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures
Expressions and operators - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators
Making decisions in your code — conditionals - Learn web ..., accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals
Operator precedence - JavaScript | MDN, accessed May 9, 2025, https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence.html
Operator precedence - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
Control flow and error handling - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
Loops and iteration - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
continue - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
Functions - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
Arrow vs normal functions - JavaScript - The freeCodeCamp Forum, accessed May 9, 2025, https://forum.freecodecamp.org/t/arrow-vs-normal-functions/664251
Default parameters - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
Rest parameters - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
Rest parameters and spread syntax - The Modern JavaScript Tutorial, accessed May 9, 2025, https://javascript.info/rest-parameters-spread
SyntaxError: parameter after rest parameter - JavaScript - MDN Web Docs, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Parameter_after_rest_parameter
SyntaxError: rest parameter may not have a default - JavaScript - MDN Web Docs, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Rest_with_default
this - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
JavaScript object basics - Learn web development | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics
Closure - MDN Web Docs Glossary: Definitions of Web-related terms - Mozilla, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Glossary/Closure
Understanding Closures and Lexical Environment in JavaScript - DEV Community, accessed May 9, 2025, https://dev.to/ayako_yk/understanding-closures-and-lexical-environment-in-javascript-1ino
Object initializer - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
Destructuring assignment - JavaScript | MDN, accessed May 9, 2025, https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment.html
Destructuring - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
Array - JavaScript | MDN - Developer's Documentation Collections, accessed May 9, 2025, https://www.devdoc.net/web/developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array.html
Array - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
Understanding Callbacks and Callback Hell in JavaScript ..., accessed May 9, 2025, https://www.geeksforgeeks.org/what-to-understand-callback-and-callback-hell-in-javascript/
What is Callback Hell in JavaScript ? | GeeksforGeeks, accessed May 9, 2025, https://www.geeksforgeeks.org/what-is-callback-hell-in-javascript/
Promise - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
Promise.prototype.then() - JavaScript | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
async function - JavaScript - MDN Web Docs - Mozilla, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
await - JavaScript - MDN Web Docs - Mozilla, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
Using microtasks in JavaScript with queueMicrotask() - Web APIs | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
In depth: Microtasks and the JavaScript runtime environment - Web APIs | MDN, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth
export - JavaScript - MDN Web Docs, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
import - JavaScript - MDN Web Docs - Mozilla, accessed May 9, 2025, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
