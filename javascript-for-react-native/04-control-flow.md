# Module 4: Control Flow

**Introduction**

Control flow statements dictate the order in which the computer executes statements in a script. By default, JavaScript code runs from top to bottom. However, control flow statements allow you to make decisions (conditional statements) or repeat actions (loops), enabling more complex and dynamic program logic.

**Learning Objectives**

*   Use `if`, `else if`, and `else` statements to execute code based on conditions.
*   Employ the `switch` statement for multi-way branching based on a single expression.
*   Iterate over code blocks using `for` loops, including standard `for`, `for...in`, and `for...of`.
*   Use `while` and `do...while` loops for iteration based on a condition.
*   Understand how to use `break` and `continue` to alter loop execution.
*   Apply control flow structures within React Native components for conditional rendering and logic.

**Keywords**

*   Conditional Statements: Execute code based on whether a condition is true or false (`if`, `else if`, `else`, `switch`).
*   Looping Statements (Iteration): Repeat a block of code multiple times (`for`, `while`, `do...while`).
*   `if`: Executes a block of code if a specified condition is true.
*   `else if`: Specifies a new condition to test if the previous `if` condition was false.
*   `else`: Executes a block of code if all preceding `if` and `else if` conditions were false.
*   `switch`: Evaluates an expression and executes code associated with a matching `case`.
*   `case`: A specific value to match against the `switch` expression.
*   `break`: Exits a `switch` statement or a loop.
*   `default`: Optional clause in a `switch` statement that executes if no `case` matches.
*   `for`: A loop with initialization, condition, and final expression.
*   `for...in`: Iterates over the *property names* (keys) of an object.
*   `for...of`: Iterates over the *values* of an iterable object (like arrays, strings, Maps, Sets).
*   `while`: Creates a loop that executes as long as a condition is true (checked *before* each iteration).
*   `do...while`: Creates a loop that executes as long as a condition is true (checked *after* each iteration, guaranteeing at least one execution).
*   `continue`: Skips the rest of the current loop iteration and proceeds to the next one.

---

## Conditional Statements

### `if...else if...else`

This is the most common structure for making decisions.

**Syntax:**

```javascript
if (condition1) {
  // Block of code to execute if condition1 is true
} else if (condition2) {
  // Block of code to execute if condition1 is false and condition2 is true
} else {
  // Block of code to execute if all preceding conditions are false
}
```

**Example:**

```javascript
function checkGrade(score) {
  let grade;
  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }
  console.log(`Score: ${score}, Grade: ${grade}`);
}

checkGrade(85); // Score: 85, Grade: B
checkGrade(55); // Score: 55, Grade: F
```

### `switch` Statement

The `switch` statement provides an alternative way to execute different code blocks based on the value of an expression. It's often cleaner than long `if...else if` chains when comparing a single value against multiple possibilities.

**Syntax:**

```javascript
switch (expression) {
  case value1:
    // Code to execute if expression matches value1
    break; // Important: Exits the switch statement
  case value2:
    // Code to execute if expression matches value2
    break;
  // ... more cases
  default:
    // Optional: Code to execute if no cases match
}
```

**Key Points:**

*   The `switch` expression is evaluated once.
*   Its value is compared strictly (`===`) against the value of each `case`.
*   The `break` statement is crucial. Without it, execution will "fall through" to the next `case`, regardless of whether it matches.
*   The `default` case is optional and handles unmatched values.

**Example:**

```javascript
function getDayMessage(dayOfWeek) {
  let message;
  switch (dayOfWeek.toLowerCase()) {
    case 'monday':
      message = "Start of the work week!";
      break;
    case 'friday':
      message = "Almost weekend!";
      break;
    case 'saturday':
    case 'sunday': // Fall-through: same message for Saturday and Sunday
      message = "Enjoy the weekend!";
      break;
    default:
      message = "It's a weekday.";
  }
  console.log(message);
}

getDayMessage("Friday"); // Almost weekend!
getDayMessage("Sunday"); // Enjoy the weekend!
getDayMessage("Wednesday"); // It's a weekday.
```

---

## Looping Statements

Loops are used to execute a block of code repeatedly.

### `for` Loop

The standard `for` loop is ideal when you know how many times you want to iterate.

**Syntax:**

```javascript
for (initialization; condition; finalExpression) {
  // Code block to be executed
}
```

1.  `initialization`: Executed once before the loop starts (e.g., `let i = 0`).
2.  `condition`: Evaluated before each iteration. If `true`, the loop continues; if `false`, the loop ends.
3.  `finalExpression`: Executed at the end of each iteration (e.g., `i++`).

**Example:**

```javascript
console.log("Standard for loop:");
for (let i = 0; i < 5; i++) {
  console.log(`Iteration number ${i}`);
}
// Output:
// Iteration number 0
// Iteration number 1
// Iteration number 2
// Iteration number 3
// Iteration number 4
```

### `for...in` Loop

Used to iterate over the *enumerable property names (keys)* of an object. **Avoid using `for...in` to iterate over Arrays**, as it can iterate over unexpected properties (including inherited ones) and the order is not guaranteed.

**Syntax:**

```javascript
for (let key in object) {
  // Code block, 'key' will be a property name (string)
  // Use object[key] to access the property value
}
```

**Example:**

```javascript
const user = {
  name: "Alice",
  age: 30,
  city: "New York"
};

console.log("\nfor...in loop (Object properties):");
for (let propName in user) {
  // It's good practice to check if the property belongs directly to the object
  if (user.hasOwnProperty(propName)) {
    console.log(`${propName}: ${user[propName]}`);
  }
}
// Output:
// name: Alice
// age: 30
// city: New York
```

### `for...of` Loop (ES6+)

This is the preferred loop for iterating over the *values* of **iterable** objects like Arrays, Strings, Maps, Sets, etc. It's generally more intuitive and safer than `for...in` for collections.

**Syntax:**

```javascript
for (let value of iterable) {
  // Code block, 'value' will be an element from the iterable
}
```

**Example:**

```javascript
const colors = ["red", "green", "blue"];
const message = "Hello";

console.log("\nfor...of loop (Array values):");
for (let color of colors) {
  console.log(color);
}
// Output:
// red
// green
// blue

console.log("\nfor...of loop (String characters):");
for (let char of message) {
  console.log(char);
}
// Output:
// H
// e
// l
// l
// o
```

### `while` Loop

Executes a block of code as long as a specified condition is true. The condition is checked *before* each iteration.

**Syntax:**

```javascript
while (condition) {
  // Code block to execute
  // Important: Ensure the condition eventually becomes false to avoid infinite loops!
}
```

**Example:**

```javascript
let count = 0;
console.log("\nwhile loop:");
while (count < 3) {
  console.log(`Count is ${count}`);
  count++;
}
// Output:
// Count is 0
// Count is 1
// Count is 2
```

### `do...while` Loop

Similar to `while`, but the condition is checked *after* the code block executes. This guarantees the block runs at least once.

**Syntax:**

```javascript
do {
  // Code block to execute
  // Ensure the condition eventually becomes false
} while (condition);
```

**Example:**

```javascript
let attempts = 0;
console.log("\ndo...while loop:");
do {
  console.log(`Attempt number ${attempts + 1}`);
  attempts++;
} while (attempts < 0); // Condition is initially false, but loop runs once
// Output:
// Attempt number 1
```

---

## Loop Control: `break` and `continue`

*   **`break`**: Immediately terminates the innermost loop (`for`, `while`, `do...while`) or `switch` statement it's in.
*   **`continue`**: Skips the remainder of the current iteration and proceeds to the next iteration of the loop.

**Example:**

```javascript
console.log("\nLoop control:");
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    continue; // Skip iteration when i is 3
  }
  if (i === 7) {
    break; // Exit the loop when i is 7
  }
  console.log(`Processing number ${i}`);
}
// Output:
// Processing number 0
// Processing number 1
// Processing number 2
// Processing number 4
// Processing number 5
// Processing number 6
```

---

## Control Flow in React Native

Control flow is essential for rendering UI conditionally and handling logic within components.

*   **Conditional Rendering:** Using `if`, `&&`, or the ternary operator (`? :`) within JSX to show/hide components or elements.
*   **Looping for Lists:** Using `Array.prototype.map` (covered later) is the standard React way to render lists from data, which internally uses looping concepts. While direct `for` loops aren't typically written *inside* JSX, the logic often resides in the component body or helper functions.

**Example (Conditional Rendering):**

```jsx
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

function DataLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setData(null);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // Simulate success/failure
      if (success) {
        setData({ message: "Data fetched successfully!" });
      } else {
        setError("Failed to fetch data.");
      }
      setIsLoading(false);
    }, 1500);
  };

  let content;
  if (isLoading) {
    content = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (error) {
    content = <Text style={{ color: 'red' }}>Error: {error}</Text>;
  } else if (data) {
    content = <Text>Success: {data.message}</Text>;
  } else {
    content = <Text>Press the button to load data.</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Button title={isLoading ? "Loading..." : "Load Data"} onPress={fetchData} disabled={isLoading} />
      <View style={{ marginTop: 20 }}>
        {content}
      </View>
    </View>
  );
}

export default DataLoader;
```

**Conclusion**

Control flow statements (`if`, `switch`, `for`, `while`) allow you to create non-linear execution paths in your code, making decisions and repeating tasks. Understanding these structures, especially the nuances between different loop types and the use of `break` and `continue`, is fundamental for building applications with any level of complexity in JavaScript and React Native.

**Further Reading:**

*   MDN: [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
*   MDN: [`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
*   MDN: [`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
*   MDN: [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
*   MDN: [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
*   MDN: [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
*   MDN: [`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
*   MDN: [`do...while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)
*   MDN: [`break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
*   MDN: [`continue`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)
*   React Docs: [Conditional Rendering](https://react.dev/learn/conditional-rendering)

**Next:** [Module 5: Functions](./05-functions.md) 