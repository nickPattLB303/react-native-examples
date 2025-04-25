# Module 7: Arrays

**Introduction**

Arrays are a fundamental type of object in JavaScript used to store ordered collections of items. These items can be of any data type, including numbers, strings, booleans, objects, or even other arrays. Arrays come with a rich set of built-in methods for manipulation and iteration, many of which are crucial for handling data and rendering lists in React Native.

**Learning Objectives**

*   Create arrays using array literal syntax (`[]`).
*   Access and modify array elements using index notation (`array[index]`).
*   Determine the length of an array using the `length` property.
*   Iterate over arrays using `forEach`, `for...of`, and standard `for` loops.
*   Transform arrays using the `map` method (essential for React/RN lists).
*   Filter arrays based on a condition using the `filter` method.
*   Aggregate array values into a single value using the `reduce` method.
*   Use array destructuring (`[]`) to extract elements into variables.
*   Apply the spread syntax (`...`) to create shallow copies and combine arrays.
*   Understand other useful array methods like `push`, `pop`, `shift`, `unshift`, `slice`, `splice`, `find`, `findIndex`, `includes`.

**Keywords**

*   Array Literal: The `[element1, element2]` syntax for creating arrays.
*   Index: The zero-based numerical position of an element in an array.
*   Element: An individual item within an array.
*   `length` Property: Returns the number of elements in an array.
*   Iteration Methods: Methods for looping through array elements (`forEach`, `map`, `filter`, `reduce`, `find`, etc.).
*   Transformation Methods: Methods that create a new array based on the original (`map`, `filter`, `slice`).
*   Mutation Methods: Methods that modify the original array directly (`push`, `pop`, `shift`, `unshift`, `splice`).
*   Array Destructuring: A syntax for unpacking elements from arrays into distinct variables.
*   Spread Syntax (`...`): Expands an array into individual elements, useful for copying and combining.
*   Shallow Copy: Copying only the top-level elements; nested objects/arrays within the array are still referenced.

---

## Creating and Accessing Arrays

Arrays are most commonly created using array literals.

```javascript
// Empty array
const emptyArr = [];

// Array of numbers
const numbers = [10, 20, 30, 40, 50];

// Array of strings
const fruits = ["Apple", "Banana", "Cherry"];

// Array with mixed types
const mixed = [1, "Hello", true, null, { id: 1 }, ["nested"]];

// Accessing elements (zero-based index)
console.log(numbers[0]);   // Output: 10
console.log(fruits[1]);    // Output: Banana
console.log(mixed[4].id);  // Output: 1
console.log(fruits[3]);    // Output: undefined (index out of bounds)

// Modifying elements
fruits[1] = "Blueberry";
console.log(fruits); // Output: [ 'Apple', 'Blueberry', 'Cherry' ]

// Getting the length
console.log(numbers.length); // Output: 5
console.log(emptyArr.length); // Output: 0
```

---

## Key Iteration and Transformation Methods

These methods are heavily used for data manipulation, especially when preparing data for display.

### `forEach(callbackFn)`

Executes a provided function once for each array element. It does *not* create a new array and its return value is `undefined`. Primarily used for side effects (like logging or modifying external variables).

**Syntax:**

```javascript
array.forEach((element, index, array) => {
  // Code to execute for each element
});
```

**Example:**

```javascript
fruits.forEach((fruit, i) => {
  console.log(`Index ${i}: ${fruit}`);
});
// Output:
// Index 0: Apple
// Index 1: Blueberry
// Index 2: Cherry
```

### `map(callbackFn)`

Creates a **new array** populated with the results of calling a provided function on every element in the calling array. This is the **standard way to render lists in React/React Native**.

**Syntax:**

```javascript
const newArray = array.map((element, index, array) => {
  // Return the transformed value for the new array
  return transformedElement;
});
```

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // Output: [ 2, 4, 6, 8, 10 ]
console.log(numbers);        // Output: [ 1, 2, 3, 4, 5 ] (original array is unchanged)

const numberObjects = numbers.map((num, index) => ({ id: index, value: num }));
console.log(numberObjects);
// Output:
// [ { id: 0, value: 1 },
//   { id: 1, value: 2 },
//   { id: 2, value: 3 },
//   { id: 3, value: 4 },
//   { id: 4, value: 5 } ]
```

**React Native Example (Rendering a List):**

```jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

const MyList = () => {
  // Preferred way: Using FlatList for performance
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );

  // Basic way using map (less performant for long lists):
  /*
  return (
    <View>
      {data.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </View>
  );
  */
};

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default MyList;
```
*Note: While `map` works for rendering, `FlatList` or `SectionList` are generally preferred in React Native for performance reasons (virtualization).* `map` is still essential for data transformation *before* rendering.

### `filter(callbackFn)`

Creates a **new array** with all elements that pass the test implemented by the provided function (i.e., the callback returns `true`).

**Syntax:**

```javascript
const filteredArray = array.filter((element, index, array) => {
  // Return true to keep the element, false otherwise
  return condition;
});
```

**Example:**

```javascript
const numbers = [10, 25, 5, 40, 15, 30];

const numbersAbove20 = numbers.filter(num => num > 20);
console.log(numbersAbove20); // Output: [ 25, 40, 30 ]

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [ 10, 40, 30 ]
```

### `reduce(callbackFn, initialValue)`

Executes a "reducer" function on each element of the array, resulting in a single output value. It takes an accumulator and the current element, and returns the updated accumulator value for the next iteration.

**Syntax:**

```javascript
const singleValue = array.reduce((accumulator, currentElement, currentIndex, array) => {
  // Return the new value for the accumulator
  return updatedAccumulator;
}, initialValue); // initialValue is optional (defaults to array[0] if omitted)
```

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// Summing all numbers
const sum = numbers.reduce((total, currentNum) => {
  console.log(`Total: ${total}, Current: ${currentNum}`);
  return total + currentNum;
}, 0); // Start with initialValue of 0
console.log("Sum:", sum); // Output: Sum: 15

// Grouping objects by a property
const products = [
  { id: 1, category: 'A', price: 10 },
  { id: 2, category: 'B', price: 20 },
  { id: 3, category: 'A', price: 15 },
];

const productsByCategory = products.reduce((grouped, product) => {
  const category = product.category;
  if (!grouped[category]) {
    grouped[category] = []; // Initialize array for the category if it doesn't exist
  }
  grouped[category].push(product);
  return grouped;
}, {}); // Start with an empty object

console.log(productsByCategory);
// Output: { A: [ { id: 1, category: 'A', price: 10 }, { id: 3, category: 'A', price: 15 } ],
//          B: [ { id: 2, category: 'B', price: 20 } ] }
```

---

## Array Destructuring (ES6+)

Similar to object destructuring, but uses square brackets `[]` to extract elements based on their position.

**Syntax:**

```javascript
const [ element1, element2, ...rest ] = array;
```

**Features:**

*   Extract elements by position.
*   Skip elements using commas (`, ,`).
*   Provide default values (`element = defaultValue`).
*   Combine with rest syntax (`...rest`) to collect remaining elements into a new array.

**Example:**

```javascript
const coordinates = [10, 20, 30];
const names = ["Alice", "Bob", "Charlie", "David"];

// Basic destructuring
const [x, y] = coordinates;
console.log(x); // 10
console.log(y); // 20

// Skipping elements
const [firstPerson, , thirdPerson] = names;
console.log(firstPerson); // Alice
console.log(thirdPerson); // Charlie

// Rest syntax
const [winner, runnerUp, ...others] = names;
console.log(winner);   // Alice
console.log(runnerUp); // Bob
console.log(others);   // [ 'Charlie', 'David' ]

// Default values
const [primaryColor, secondaryColor = 'Gray'] = ["Red"];
console.log(primaryColor);   // Red
console.log(secondaryColor); // Gray (default used)

// Swapping variables
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

---

## Spread Syntax (`...`) for Arrays (ES6+)

Expands an array into its individual elements.

**Uses:**

1.  **Creating Shallow Copies:**
    ```javascript
    const originalNumbers = [1, 2, 3];
    const numbersCopy = [...originalNumbers];

    console.log(numbersCopy); // [ 1, 2, 3 ]
    console.log(numbersCopy === originalNumbers); // false

    numbersCopy.push(4);
    console.log(originalNumbers); // [ 1, 2, 3 ] (original unchanged)
    ```
2.  **Combining Arrays:**
    ```javascript
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const combined = [...arr1, 0, ...arr2, 5];
    console.log(combined); // [ 1, 2, 0, 3, 4, 5 ]
    ```
3.  **Passing elements as arguments to functions:**
    ```javascript
    function sumThree(a, b, c) {
      return a + b + c;
    }
    const nums = [10, 20, 30];
    console.log(sumThree(...nums)); // 60 (Equivalent to sumThree(10, 20, 30))
    ```
4.  **Converting iterables (like Strings or NodeLists) to Arrays:**
    ```javascript
    const str = "Hello";
    const chars = [...str];
    console.log(chars); // [ 'H', 'e', 'l', 'l', 'o' ]
    ```

---

## Other Useful Array Methods

*   **Mutating Methods (Modify original array):**
    *   `push(el1, ...)`: Adds element(s) to the end, returns new length.
    *   `pop()`: Removes the last element, returns the removed element.
    *   `shift()`: Removes the first element, returns the removed element.
    *   `unshift(el1, ...)`: Adds element(s) to the beginning, returns new length.
    *   `splice(start, deleteCount, item1, ...)`: Removes/replaces elements. Returns array of deleted elements.
    *   `sort(compareFn?)`: Sorts elements in place (default is string conversion).
    *   `reverse()`: Reverses elements in place.

*   **Non-Mutating Methods (Return new array or value):**
    *   `slice(start?, end?)`: Returns a shallow copy of a portion of the array.
    *   `concat(arr1, ...)`: Joins arrays and/or values to create a new array.
    *   `includes(value, fromIndex?)`: Checks if an array includes a certain value, returns boolean.
    *   `indexOf(value, fromIndex?)`: Returns the first index of a value, or -1 if not found.
    *   `lastIndexOf(value, fromIndex?)`: Returns the last index of a value, or -1 if not found.
    *   `find(callbackFn)`: Returns the *first element* that satisfies the callback condition, or `undefined`.
    *   `findIndex(callbackFn)`: Returns the *index* of the first element that satisfies the callback condition, or -1.
    *   `join(separator?)`: Joins all elements into a string (separated by `separator`, default is comma).

**Example:**

```javascript
const letters = ['a', 'b', 'c', 'd', 'e'];

// slice (non-mutating)
const middle = letters.slice(1, 4); // Start at index 1, end before index 4
console.log(middle);  // [ 'b', 'c', 'd' ]
console.log(letters); // [ 'a', 'b', 'c', 'd', 'e' ] (original unchanged)

// splice (mutating)
const removed = letters.splice(2, 2, 'X', 'Y'); // Start at index 2, remove 2, insert 'X', 'Y'
console.log(removed); // [ 'c', 'd' ] (elements removed)
console.log(letters); // [ 'a', 'b', 'X', 'Y', 'e' ] (original changed)

// find
const users = [{id: 1, name: 'A'}, {id: 2, name: 'B'}, {id: 3, name: 'C'}];
const userB = users.find(u => u.name === 'B');
console.log(userB); // { id: 2, name: 'B' }

// includes
console.log(letters.includes('X')); // true
console.log(letters.includes('c')); // false
```

**Conclusion**

Arrays are indispensable for managing lists of data in JavaScript. Modern methods like `map`, `filter`, and `reduce`, combined with features like destructuring and the spread syntax, provide powerful and expressive ways to work with array data. Understanding these tools is crucial for effectively handling data, managing state, and rendering dynamic lists in React Native applications.

**Further Reading:**

*   MDN: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
*   MDN: [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
*   MDN: [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
*   MDN: [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
*   MDN: [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
*   MDN: [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
*   MDN: [`findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
*   MDN: [`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
*   MDN: [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
*   MDN: [`splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
*   MDN: [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
*   MDN: [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
*   React Native Docs: [Handling Lists (`FlatList`)](https://reactnative.dev/docs/using-list-views)

**Next:** [Module 8: Asynchronous JavaScript](./08-async-javascript.md) 