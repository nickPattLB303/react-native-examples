# Module 3: Operators

**Introduction**

Operators are special symbols or keywords in JavaScript used to perform operations on values (operands). They are essential for manipulating data, making comparisons, and controlling the logic of your application. This section covers the most common categories of operators used in everyday JavaScript and React Native development.

**Learning Objectives**

*   Perform basic arithmetic operations using arithmetic operators.
*   Compare values using comparison operators, understanding the difference between `==` and `===`.
*   Combine boolean expressions using logical operators (`&&`, `||`, `!`).
*   Utilize the assignment operators for concise variable updates.
*   Apply the ternary operator for simple conditional assignments.
*   Recognize other useful operators like `typeof`, `instanceof`, and grouping `()`.

**Keywords**

*   Operand: The value(s) that an operator acts upon.
*   Operator: A symbol or keyword that performs an operation.
*   Arithmetic Operators: Perform mathematical calculations (`+`, `-`, `*`, `/`, `%`, `**`, `++`, `--`).
*   Comparison Operators: Compare two operands and return a boolean (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`).
*   Logical Operators: Combine or invert boolean values (`&&`, `||`, `!`).
*   Assignment Operators: Assign values to variables (`=`, `+=`, `-=`, `*=`, `/=`, etc.).
*   Ternary Operator: A shorthand for conditional expressions (`condition ? exprIfTrue : exprIfFalse`).
*   Type Coercion: Automatic conversion of values from one data type to another (often happens with `==`).
*   Strict Equality: Comparison without type coercion (`===`, `!==`).

---

## Arithmetic Operators

These operators perform standard mathematical operations.

| Operator | Description        | Example                   | Result |
| :------- | :----------------- | :------------------------ | :----- |
| `+`      | Addition           | `5 + 3`                   | `8`    |
| `-`      | Subtraction        | `5 - 3`                   | `2`    |
| `*`      | Multiplication     | `5 * 3`                   | `15`   |
| `/`      | Division           | `6 / 3`                   | `2`    |
| `%`      | Modulus (Remainder)| `5 % 3`                   | `2`    |
| `**`     | Exponentiation (ES7+)| `5 ** 3` (5³)             | `125`  |
| `++`     | Increment          | `let x = 5; x++;`        | `x` is now `6` |
| `--`     | Decrement          | `let y = 5; y--;`        | `y` is now `4` |

**Note on `+`:** The `+` operator also performs string concatenation if one of the operands is a string.

```javascript
console.log("Hello " + "World"); // "Hello World"
console.log("Result: " + 5);   // "Result: 5" (Number 5 is coerced to string)
console.log(5 + "5");         // "55" (Number 5 is coerced to string)
console.log(5 + 5 + "5");     // "105" (Addition first, then concatenation)
console.log("5" + 5 + 5);     // "555" (Concatenation happens from left to right)
```

**Note on `++` and `--`:** These can be used prefix (`++x`) or postfix (`x++`).
*   Postfix (`x++`): Returns the value *before* incrementing.
*   Prefix (`++x`): Returns the value *after* incrementing.

```javascript
let a = 5;
let b = a++; // b gets 5, then a becomes 6
console.log(`a: ${a}, b: ${b}`); // a: 6, b: 5

let c = 5;
let d = ++c; // c becomes 6, then d gets 6
console.log(`c: ${c}, d: ${d}`); // c: 6, d: 6
```

---

## Comparison Operators

These operators compare two operands and return a boolean value (`true` or `false`).

| Operator | Description                     | Example           | Result | Notes                                       |
| :------- | :------------------------------ | :---------------- | :----- | :------------------------------------------ |
| `==`     | Equal (Loose Equality)          | `5 == "5"`        | `true` | Performs type coercion                      |
| `===`    | Strictly Equal (Strict Equality)| `5 === "5"`       | `false`| No type coercion; checks type and value     |
| `!=`     | Not Equal (Loose)               | `5 != "5"`        | `false`| Performs type coercion                      |
| `!==`    | Strictly Not Equal (Strict)     | `5 !== "5"`       | `true` | No type coercion                            |
| `>`      | Greater Than                    | `5 > 3`           | `true` |                                             |
| `<`      | Less Than                       | `5 < 3`           | `false`|                                             |
| `>=`     | Greater Than or Equal To        | `5 >= 5`          | `true` |                                             |
| `<=`     | Less Than or Equal To           | `5 <= 3`          | `false`|                                             |

**`==` vs. `===` (Crucial Distinction):**

*   `==` (Loose Equality): Compares values after attempting to convert them to a common type (type coercion). This can lead to unexpected results.
*   `===` (Strict Equality): Compares both the value and the type without performing type coercion.

**Best Practice:** Almost always use strict equality (`===` and `!==`) to avoid subtle bugs caused by implicit type coercion.

```javascript
console.log(1 == '1');        // true (string '1' coerced to number 1)
console.log(1 === '1');       // false (number vs string)

console.log(0 == false);      // true (boolean false coerced to number 0)
console.log(0 === false);     // false (number vs boolean)

console.log(null == undefined); // true (special case in loose equality)
console.log(null === undefined);// false (different types)

console.log('apple' > 'banana'); // false (lexicographical/dictionary comparison)
```

---

## Logical Operators

Logical operators are typically used with boolean values. They are fundamental for creating conditional logic in `if` statements and other control flow structures.

| Operator | Description                        | Example                       | Result  |
| :------- | :--------------------------------- | :---------------------------- | :------ |
| `&&`     | Logical AND: `true` if both operands are `true` | `true && false`               | `false` |
| `||`     | Logical OR: `true` if at least one operand is `true` | `true || false`               | `true`  |
| `!`      | Logical NOT: Inverts the boolean value | `!true`                       | `false` |

**Short-Circuiting:**

Logical operators (`&&` and `||`) exhibit short-circuiting behavior:

*   `&&`: If the left operand is `false` (or *falsy*), the right operand is **not evaluated**, and the left operand's value is returned.
*   `||`: If the left operand is `true` (or *truthy*), the right operand is **not evaluated**, and the left operand's value is returned.

```javascript
// && Short-circuiting
let resultAnd = (false && console.log("This won't print"));
console.log(resultAnd); // false

resultAnd = (true && "Returned value");
console.log(resultAnd); // "Returned value"

// || Short-circuiting
let resultOr = (true || console.log("This won't print either"));
console.log(resultOr); // true

resultOr = (false || "Default value");
console.log(resultOr); // "Default value"
```

**Truthy and Falsy Values:**

In JavaScript, values other than `true` and `false` can be evaluated in a boolean context. Values that evaluate to `false` are called *falsy*, and all others are *truthy*.

*   **Falsy Values:** `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`.
*   **Truthy Values:** Everything else, including `true`, any non-zero number, any non-empty string, objects (`{}`), arrays (`[]`).

This is often used for providing default values or conditional rendering in React/React Native:

```jsx
// React Native Example: Conditional Rendering
function UserGreeting({ user }) {
  return (
    <View>
      {/* Only render if user is truthy (i.e., not null/undefined) */}
      {user && <Text>Welcome, {user.name}!</Text>}

      {/* Provide default value if user is falsy */}
      <Text>Status: {user.status || "Inactive"}</Text>
    </View>
  );
}
```

---

## Assignment Operators

These operators assign a value to a variable.

| Operator | Example         | Equivalent To   |
| :------- | :-------------- | :-------------- |
| `=`      | `x = 5`         | `x = 5`         |
| `+=`     | `x += 5`        | `x = x + 5`     |
| `-=`     | `x -= 5`        | `x = x - 5`     |
| `*=`     | `x *= 5`        | `x = x * 5`     |
| `/=`     | `x /= 5`        | `x = x / 5`     |
| `%=`     | `x %= 5`        | `x = x % 5`     |
| `**=`    | `x **= 5`       | `x = x ** 5`    |

```javascript
let count = 10;
count += 2; // count is now 12
count *= 3; // count is now 36
console.log(count); // 36
```

---

## Ternary Operator (Conditional Operator)

The ternary operator is the only JavaScript operator that takes three operands. It's a concise way to write simple conditional statements, often used for assignments or inline conditions.

**Syntax:**

```
condition ? expressionIfTrue : expressionIfFalse
```

**Example:**

```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // "Yes"

let speed = 70;
let message = speed > 60 ? "Slow down!" : "Speed OK";
console.log(message); // "Slow down!"
```

**In React Native:** Often used for conditional styling or text.

```jsx
<Text style={{ color: isError ? 'red' : 'black' }}>
  {isComplete ? 'Task Done' : 'In Progress'}
</Text>
```

While concise, avoid nesting ternary operators as it can quickly become difficult to read. For complex logic, use `if/else` statements.

---

## Other Useful Operators

*   **`typeof`**: Returns a string indicating the type of a variable (covered in Data Types module).
    ```javascript
    console.log(typeof 42); // "number"
    ```
*   **`instanceof`**: Checks if an object is an instance of a particular constructor (class).
    ```javascript
    let today = new Date();
    console.log(today instanceof Date); // true
    ```
*   **Grouping `()`**: Controls the order of operations, just like in standard mathematics.
    ```javascript
    console.log(2 + 3 * 4); // 14 (multiplication first)
    console.log((2 + 3) * 4); // 20 (addition first due to parentheses)
    ```

**Conclusion**

Operators are the workhorses of JavaScript, allowing you to manipulate data, compare values, and control program flow. Mastering arithmetic, comparison, logical, and assignment operators, along with the useful ternary operator, is essential for writing dynamic and responsive React Native applications. Remember the crucial difference between `==` and `===`, and always prefer the strict versions.

**Further Reading:**

*   MDN: [Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
*   MDN: [Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

**Next:** [Module 4: Control Flow](./04-control-flow.md) 