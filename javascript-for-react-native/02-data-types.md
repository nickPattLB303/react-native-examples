# Module 2: Data Types

**Introduction**

JavaScript is a dynamically typed language, meaning you don't have to specify the type of data a variable will hold beforehand. However, understanding the different types of data JavaScript works with is crucial for writing effective code. Data types in JavaScript are broadly categorized into two main groups: Primitive Types and Objects.

**Learning Objectives**

*   Identify and describe the seven primitive data types in JavaScript.
*   Understand the fundamental difference between primitive types (passed by value) and objects (passed by reference).
*   Recognize the `object` type and its role as a container for collections of data and more complex entities.
*   Use the `typeof` operator to determine the type of a variable.
*   Understand the special values `null` and `undefined` and their distinctions.

**Keywords**

*   Primitive Types: The most basic data types, immutable.
*   Object Type: Represents collections of properties (key-value pairs) or more complex structures.
*   Dynamic Typing: Variable types are determined at runtime, not compile time.
*   Immutability (Primitives): The value of a primitive type cannot be directly altered once created.
*   Mutability (Objects): The contents (properties) of an object can typically be altered after creation.
*   Pass by Value: Copying the actual value of a primitive when passing it to a function or assigning it to another variable.
*   Pass by Reference: Copying the memory address (reference) of an object when passing or assigning it.
*   `typeof` operator: Returns a string indicating the type of the unevaluated operand.

---

## Primitive Data Types

Primitives are the most basic data types available within JavaScript. They are immutable, meaning their actual value cannot be changed once created. When you perform operations that seem to modify a primitive (like concatenating strings or adding numbers), you are actually creating a *new* primitive value.

There are seven primitive types:

1.  **`string`**: Represents textual data. Enclosed in single quotes (`'...'`), double quotes (`"..."`), or backticks (`` `...` `` - template literals).
    ```javascript
    let greeting = "Hello, React Native!";
    const name = 'World';
    const message = `Greeting: ${greeting}`; // Template literal
    console.log(typeof greeting); // "string"
    ```
2.  **`number`**: Represents numeric values, including integers and floating-point numbers. Includes special numeric values like `Infinity`, `-Infinity`, and `NaN` (Not-a-Number).
    ```javascript
    let age = 30;
    const price = 99.99;
    let notANumber = NaN; // Result of invalid math operations, e.g., 0/0
    console.log(typeof age); // "number"
    console.log(typeof NaN); // "number" (Note: typeof NaN is 'number')
    ```
3.  **`boolean`**: Represents logical entities with two values: `true` or `false`.
    ```javascript
    let isActive = true;
    const isLoggedIn = false;
    console.log(typeof isActive); // "boolean"
    ```
4.  **`null`**: Represents the intentional absence of any object value. It's treated as a primitive value, but `typeof null` historically (and confusingly) returns `"object"`.
    ```javascript
    let userProfile = null; // Intentionally no user profile yet
    console.log(userProfile); // null
    console.log(typeof userProfile); // "object" (This is a known quirk in JavaScript!)
    ```
5.  **`undefined`**: Represents a variable that has been declared but not yet assigned a value, or a function argument that was not provided.
    ```javascript
    let score;
    console.log(score); // undefined
    console.log(typeof score); // "undefined"

    function greet(name) {
      console.log(name); // If called without args, name is undefined
    }
    greet(); // undefined
    ```
6.  **`symbol`** (ES6+): Represents a unique and immutable value that may be used as the key of an Object property. Primarily used to create unique identifiers.
    ```javascript
    const id = Symbol('uniqueId');
    const anotherId = Symbol('uniqueId');
    console.log(id === anotherId); // false (Symbols are unique)
    console.log(typeof id); // "symbol"
    ```
7.  **`bigint`** (ES2020+): Represents whole numbers larger than the maximum safe integer limit for `number` (2^53 - 1). Created by appending `n` to the end of an integer literal or by calling the `BigInt()` function.
    ```javascript
    const veryLargeNumber = 9007199254740991n; // Note the 'n'
    const anotherLarge = BigInt("9007199254740992");
    console.log(typeof veryLargeNumber); // "bigint"
    ```

---

## The `object` Type

Anything that is not a primitive type is an `object`. Objects are collections of key-value pairs (properties). Arrays, Functions, Dates, RegExp, and plain objects are all types of objects in JavaScript.

**Key characteristics of `object`:**

*   **Mutable:** The contents (properties/elements) of an object can generally be changed after it's created (unless explicitly frozen).
*   **Collection of Properties:** Can hold various data types, including other objects.
*   **Passed by Reference:** When assigned or passed to a function, a reference (memory address) to the object is copied, not the object itself.

**Example (Plain Object):**

```javascript
const person = {
  name: "Alice",
  age: 30,
  isDeveloper: true,
  address: { // Nested object
    street: "123 Main St",
    city: "Anytown"
  }
};

console.log(typeof person); // "object"
console.log(person.name); // "Alice"

person.age = 31; // Mutating the object
console.log(person.age); // 31
```

**Example (Array - a type of object):**

```javascript
const colors = ["red", "green", "blue"];
console.log(typeof colors); // "object" (Arrays are objects!)
console.log(Array.isArray(colors)); // true (Use Array.isArray to specifically check for arrays)

colors.push("yellow"); // Mutating the array
console.log(colors); // ["red", "green", "blue", "yellow"]
```

---

## Primitives vs. Objects: Key Differences

| Feature          | Primitives (`string`, `number`, etc.) | Objects (`object`, `array`, `function`, etc.) |
| :--------------- | :------------------------------------ | :------------------------------------------- |
| **Mutability**   | Immutable                             | Mutable (generally)                          |
| **Assignment**   | Pass by Value (copied)                | Pass by Reference (reference copied)         |
| **Comparison (`==`, `===`)** | Compares actual values                | Compares references (memory addresses)       |
| **`typeof` result**| Specific type string (except `null`)  | `"object"` (or `"function"` for functions) |

**Example (Pass by Value vs. Pass by Reference):**

```javascript
// Primitives (Pass by Value)
let x = 10;
let y = x; // y gets a copy of the value 10
x = 20;
console.log(x); // 20
console.log(y); // 10 (y remains unchanged)

// Objects (Pass by Reference)
let obj1 = { value: 10 };
let obj2 = obj1; // obj2 gets a copy of the reference to the same object

obj1.value = 20;
console.log(obj1.value); // 20
console.log(obj2.value); // 20 (obj2 points to the same object, so it sees the change)

// Comparison
let str1 = "hello";
let str2 = "hello";
console.log(str1 === str2); // true (same primitive value)

let arr1 = [1, 2];
let arr2 = [1, 2];
console.log(arr1 === arr2); // false (different objects in memory, even with same content)

let arr3 = arr1;
console.log(arr1 === arr3); // true (both reference the same object)
```

This distinction is vital in React/React Native. When passing objects or arrays as props or managing them in state, understanding references helps prevent bugs related to unintended mutations or incorrect comparisons.

---

## The `typeof` Operator

The `typeof` operator is useful for quickly checking the type of a variable. However, be aware of its quirks:

```javascript
console.log(typeof "hello");     // "string"
console.log(typeof 123);         // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 123n);        // "bigint"

console.log(typeof null);        // "object" <-- Quirk!
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" <-- Use Array.isArray() for arrays
console.log(typeof function(){});// "function" (Functions are technically objects but typeof gives 'function')
```

**Conclusion**

JavaScript's type system consists of seven primitive types (string, number, boolean, null, undefined, symbol, bigint) which are immutable and passed by value, and the object type, which is mutable and passed by reference. Recognizing these types and their behaviors, especially the difference between primitives and objects, is foundational for working effectively with data in React Native applications.

**Further Reading:**

*   MDN: [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
*   MDN: [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
*   MDN: [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)
*   MDN: [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
*   MDN: [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
*   MDN: [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

**Next:** [Module 3: Operators](./03-operators.md) 