## Section 2: Control Flow (Conditionals, Loops)

> [!TIP]
> Experienced developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Making decisions in your code — conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals)
> - [MDN Web Docs: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
> - [MDN Web Docs: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

Control flow statements dictate the order in which JavaScript code is executed. They enable programs to make decisions based on conditions and to repeat blocks of code, forming the fundamental logic of any application.

### 2.1. Conditional Statements

Conditional statements allow a program to execute different blocks of code based on whether a specified condition evaluates to true or false.

* **if Statement**:
  + The most basic conditional statement. It executes a block of code if its condition is true (or "truthy").
  + Syntax: if (condition) { /\* block of code to execute if condition is true \*/ }.8
* **if...else Statement**:
  + Provides an alternative block of code to execute if the if statement's condition is false (or "falsy").
  + Syntax: if (condition) { /\* block for true condition \*/ } else { /\* block for false condition \*/ }.8
* **if...else if...else Statement**:
  + Allows for testing a sequence of multiple conditions. The first condition that evaluates to true will have its associated block executed. If none of the conditions are true, the final else block (if present) is executed.8
  + Syntax:
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
  + It's good practice to always use block statements ({}) for the code to be executed, even if it's a single line, to improve readability and prevent errors, especially with nested conditionals.11
* **Truthy and Falsy Values**:
  + In JavaScript, the condition in an if statement does not strictly need to be a Boolean value. Any value can be used as a condition, and JavaScript will implicitly convert it to a Boolean (a process called type coercion) to determine whether it's "truthy" or "falsy".11
  + **Falsy Values**: These are values that coerce to false in a Boolean context. The complete list of falsy values in JavaScript is:
    - false (the Boolean value)
    - 0 (the number zero)
    - -0 (the number negative zero)
    - 0n (BigInt zero)
    - "" (an empty string)
    - null
    - undefined
    - NaN (Not-a-Number)
  + **Truthy Values**: All other values in JavaScript are considered truthy. This includes:
    - Any non-empty string (e.g., "hello", "0", "false")
    - Any non-zero number (e.g., 1, -1, 3.14)
    - All objects (including empty objects {} and empty arrays ``)
    - All functions
    - All symbols
  + A solid understanding of truthy and falsy values is critical for writing concise and accurate conditional logic. Many programming errors stem from incorrect assumptions about how non-Boolean values are evaluated in conditions.

> 🌐 **(Web Developers):**
> > **Comparison:** In many languages, conditional statements strictly require a boolean expression. JavaScript's concept of "truthy" and "falsy" values means that non-boolean values are implicitly coerced to booleans in conditional contexts. This can be convenient but also a source of subtle bugs if you're not aware of which values are falsy.
> >
> > **Key Takeaway:** Memorize the list of falsy values (false, 0, -0, 0n, "", null, undefined, NaN); everything else is truthy. Use strict equality (`===`) when you need to check for specific values without type coercion.
> >
> > **Source:** [MDN Web Docs: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and [MDN Web Docs: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

> 📲 **(Native Developers):**
> > **Comparison:** Unlike native languages where conditional logic typically relies on explicit boolean results, JavaScript evaluates many non-boolean values as either "truthy" or "falsy" in conditional contexts. This implicit coercion is a key difference to be aware of.
> >
> > **Key Takeaway:** Understand the specific values that are considered falsy in JavaScript to write accurate conditional logic.
> >
> > **Source:** [MDN Web Docs: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and [MDN Web Docs: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

* **switch Statement**:
  + Provides an alternative to long if...else if...else chains when comparing a single expression against multiple possible constant values (cases).8
  + Syntax:
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
  + The expression is evaluated once. Its value is then compared with the value of each case clause using **strict equality** (===).
  + The break statement is crucial. When a matching case is found and its statements are executed, the break statement causes an exit from the switch block. If break is omitted, execution "falls through" to the statements of the next case block, regardless of whether that next case matches the expression.11 This fall-through behavior can be intentional for grouping cases that share code, but it's a common source of bugs if break is accidentally forgotten.
  + The default clause is optional and is executed if none of the case values match the expression's value.11

<br>

**Table 2.1: Truthy and Falsy Values in JavaScript**

| **Value** | **Type** | **Truthiness** | **Notes** |
| --- | --- | --- | --- |
| false | Boolean | Falsy |  |
| 0 | Number | Falsy |  |
| -0 | Number | Falsy |  |
| 0n | BigInt | Falsy |  |
| "" | String | Falsy | Empty string |
| null | Null | Falsy |  |
| undefined | Undefined | Falsy |  |
| NaN | Number | Falsy | Not-a-Number |
| true | Boolean | Truthy |  |
| "hello" | String | Truthy | Non-empty string |
| "0" | String | Truthy | Non-empty string (even if looks numeric) |
| 42 | Number | Truthy | Non-zero number |
| -42 | Number | Truthy | Non-zero number |
| {} | Object | Truthy | Any object, including empty object |
| `` | Object | Truthy | Any array, including empty array |
| function(){} | Function | Truthy | Any function |

<br>

### 2.2. Looping Constructs

Looping constructs allow for the repeated execution of a block of code.

* **for Loop**:
  + Ideal when the number of iterations is known or can be determined beforehand.
  + Syntax: for (initialization; condition; afterthought) { /\* loop body \*/ }.12
    - initialization: An expression (including assignment expressions) or variable declaration. Executed once before the loop begins. Typically initializes a counter variable (e.g., let i = 0).
    - condition: An expression evaluated before each loop iteration. If it evaluates to truthy, the loop body is executed. If falsy, the loop terminates.
    - afterthought (also called final-expression or increment/decrement expression): An expression executed at the end of each iteration, after the loop body. Typically used to update the counter (e.g., i++).
* **while Loop**:
  + Repeats a block of code as long as a specified condition is true.
  + Syntax: while (condition) { /\* loop body \*/ }.12
  + The condition is evaluated *before* each execution of the loop body. If the condition is initially false, the loop body will never execute.
  + It's crucial to ensure that the statements within the loop eventually cause the condition to become false to prevent infinite loops.
* **do...while Loop**:
  + Similar to a while loop, but the loop body is executed at least once, regardless of the condition's initial state.
  + Syntax: do { /\* loop body \*/ } while (condition);.12
  + The condition is evaluated *after* the loop body has executed.
* **break Statement (in Loops)**:
  + Used to immediately terminate the innermost enclosing loop (for, while, do...while) or switch statement.12
  + Program execution continues at the statement immediately following the terminated loop or switch.
* **continue Statement (in Loops)**:
  + Skips the remaining statements in the current iteration of the loop and proceeds to the next iteration.12
  + In a for loop, control jumps to the afterthought expression.
  + In a while or do...while loop, control jumps back to the evaluation of the condition.
* **Labeled Statements (with break and continue)**:
  + A label is an identifier followed by a colon (:), placed before a loop or block statement. It allows break and continue to refer to a specific enclosing loop, which is useful for controlling nested loops.12
  + Syntax: myLabel: while (condition) {... break myLabel;... }
  + break myLabel; terminates the loop identified by myLabel.
  + continue myLabel; skips to the next iteration of the loop identified by myLabel.
* **for...in Loop**:
  + Iterates over the enumerable property names (keys) of an object.
  + Syntax: for (const key in object) { /\* code using object[key] \*/ }.12
  + The order of iteration is not guaranteed and may vary across JavaScript engines.
  + It iterates over an object's own properties as well as enumerable properties inherited from its prototype chain. To iterate only over an object's own properties, use object.hasOwnProperty(key) within the loop.
  + **Generally not recommended for iterating over arrays**. While arrays are objects, for...in can iterate over non-index properties (if any are added to the array object or its prototype) and the order of indices is not guaranteed. For arrays, for...of or standard array iteration methods (forEach, map, etc.) are preferred. The introduction of for...of in ES6 provided a more direct and reliable way to iterate over array values, addressing these shortcomings of for...in for array iteration.
* **for...of Loop (ES6+)**:
  + Creates a loop iterating over the values of iterable objects. Iterable objects include built-in types like Array, String, Map, Set, and the arguments object, as well as user-defined iterables.
  + Syntax: for (const value of iterable) { /\* code using value \*/ }.12
  + This loop provides a simpler and more direct way to access the values of elements in a collection compared to traditional for loops (which require managing an index) or for...in (which gives keys for objects).
  + Objects are not directly iterable by default with for...of. To iterate over an object's properties using for...of, one can use methods like Object.keys(obj), Object.values(obj), or Object.entries(obj), which return iterables.
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

> 🌐 **(Web Developers):**
> > **Comparison:** If you're used to iterating over collections using index-based loops (`for` loops) or built-in methods (`forEach`, `map`, etc.), `for...in` might seem familiar for object properties, but its behavior with arrays (iterating over keys/indices, including non-numeric properties, and unpredictable order) can be unexpected compared to iterating over values directly. `for...of` provides a more direct way to iterate over the *values* of iterable objects like arrays, similar to `for...each` style loops in other languages.
> >
> > **Key Takeaway:** Use `for` loops for index-based iteration, `for...of` for iterating over the values of arrays and other iterables, and `for...in` cautiously for object property keys (often combined with `hasOwnProperty`).
> >
> > **Source:** [MDN Web Docs: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) and [MDN Web Docs: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages have various ways to iterate over collections (e.g., `for` loops, `forEach`, iterators). JavaScript's `for...in` iterates over object property names (keys), which can include inherited properties, and its order is not guaranteed. `for...of` is a more modern and generally preferred way to iterate directly over the *values* of arrays and other iterable collections, offering behavior closer to value-based iteration in native languages.
> >
> > **Key Takeaway:** Prefer `for...of` for iterating over array elements. Use `for...in` with caution for object properties and always check if the property is the object's own property.
> >
> > **Source:** [MDN Web Docs: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) and [MDN Web Docs: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

<br>

**Table 2.2: Loop Comparison**

| **Loop Type** | **Syntax** | **Primary Use Case** | **Condition Check** | **Executes At Least Once?** |
| --- | --- | --- | --- | --- |
| for | for (init; cond; afterthought) {... } | Known number of iterations, iterating with a counter | Before each iteration | No (if cond is initially false) |
| while | while (condition) {... } | Iterations based on a condition, number unknown | Before each iteration | No (if cond is initially false) |
| do...while | do {... } while (condition); | Iterations based on a condition, body needs to run once | After each iteration | Yes |
| for...in | for (const key in object) {... } | Enumerating object property names (keys) | Implicit (for each key) | No (if object has no enumerable properties) |
| for...of | for (const value of iterable) {... } | Iterating over values of iterable objects (Arrays, Strings, etc.) | Implicit (for each value) | No (if iterable is empty) |

<br>
