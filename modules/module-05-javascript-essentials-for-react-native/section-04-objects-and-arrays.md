## Section 4: Objects and Arrays (Methods, Destructuring, Spread/Rest Operators)

Objects and arrays are the cornerstone data structures in JavaScript, used for organizing and storing collections of related data and functionality. This section delves into their creation, manipulation, and the powerful ES6+ features like destructuring and spread/rest syntax that enhance working with them.

> 🛣️ **All Learners:** Objects and arrays are fundamental to almost all programming. Focus on mastering the built-in methods, especially the iteration methods (`map`, `filter`, `reduce`), and the modern ES6+ features like destructuring and spread/rest syntax. These are used extensively in React and React Native for handling data and component props.

### Objects In-Depth

Objects in JavaScript are dynamic collections of key-value pairs. Keys are typically strings (or Symbols), and values can be any valid JavaScript data type, including other objects or functions (which are then called methods).

-   Objects are mutable, meaning their content (properties and methods) can be changed after they are created.
-   Variables that hold objects actually store a reference (or a memory address) to the location where the object is stored in memory, rather than the object itself. This is why modifying an object through one variable is reflected when accessing it through another variable that holds the same reference.

#### Object Literal Syntax

The most common way to create objects is using the literal syntax: `const myObject = { key1: "value1", "property name with spaces": true, numericKey: 123 };`.

Property keys that are valid JavaScript identifiers can be written without quotes. Keys containing spaces or special characters, or those that are not valid identifiers, must be enclosed in quotes (single or double). Numeric keys are automatically coerced to strings.

This example shows object literal syntax:

```javascript
const patient = {
  id: "P101",
  "first name": "Alice", // Key with space requires quotes
  lastName: "Smith",
  age: 30,
  isActive: true
};
```

#### Property Management

-   **Accessing Properties:**
    -   Dot Notation: `myObject.key1`. Used when the property key is a valid identifier and is known at the time of writing.
    -   Bracket Notation: `myObject["property name with spaces"]`. Must be used if the key is not a valid identifier or if the key is dynamic (stored in a variable).

    ```javascript
    const patient = { id: "P101", name: "Alice" };
    console.log(patient.name); // Outputs: Alice (Dot notation)

    let propertyName = "id";
    console.log(patient[propertyName]); // Outputs: P101 (Bracket notation with variable)
    ```

-   **Adding/Modifying Properties:** Properties can be added or existing ones modified by simple assignment: `myObject.newKey = "a new value";` or `myObject["anotherKey"] = 456;`.

    ```javascript
    const patient = { id: "P101" };
    patient.name = "Alice"; // Add a new property
    patient.id = "P102"; // Modify an existing property
    console.log(patient); // Outputs: { id: 'P102', name: 'Alice' }
    ```

-   **Deleting Properties:** The `delete` operator can remove a property from an object: `delete myObject.key1;`.

    ```javascript
    const patient = { id: "P101", name: "Alice" };
    delete patient.name;
    console.log(patient.name); // Outputs: undefined
    ```

#### ES6+ Computed Property Names

Allows the use of an expression, enclosed in square brackets `[]`, to define a property key within an object literal at the time of creation.

-   Syntax:
    ```javascript
    let suffix = "Name";
    const person = {
      ["first" + suffix]: "Alice",
      ["last" + suffix]: "Smith"
    };
    console.log(person.firstName); // Outputs: Alice
    console.log(person.lastName);  // Outputs: Smith
    ```

#### Method Definitions

Methods are functions that are properties of an object.

-   Traditional syntax: `const calculator = { add: function(a, b) { return a + b; } };`
-   ES6+ Shorthand Syntax: Provides a more concise way to define methods: `const calculator = { add(a, b) { return a + b; } };`.
-   `this` in Methods: When a method is defined using regular function syntax (or the ES6 shorthand), the `this` keyword inside the method refers to the object the method was called on.

This example shows the ES6+ method shorthand:

```javascript
const medication = {
  name: "Aspirin",
  describe() { // ES6+ method shorthand
    console.log(`This medication is ${this.name}.`);
  }
};
medication.describe(); // Outputs: This medication is Aspirin.
```

#### ES6+ Object Destructuring

A powerful and concise syntax for extracting values from object properties and assigning them to distinct variables. This greatly improves code readability when working with objects, especially function parameters or props in React.

-   Basic Syntax: `const { property1, property2 } = myObject;` Creates variables `property1` and `property2`.
-   Aliasing (Assigning to New Variable Names): `const { property1: newName1, property2: anotherName } = myObject;`
-   Default Values: `const { property1, nonExistentProperty = "defaultValue" } = myObject;`
-   Nested Destructuring: `const { name, address: { city, country } } = userProfile;`
-   Rest Properties: Collect all remaining enumerable own properties into a new object: `const { id, name, ...otherDetails } = userRecord;`

This example shows object destructuring:

```javascript
const patient = {
  id: "P101",
  name: "Alice Smith",
  age: 30,
  address: { city: "Medville", zip: "12345" }
};

// Basic destructuring
const { name, age } = patient;
console.log(name, age); // Outputs: Alice Smith 30

// Destructuring with aliasing and default value
const { id: patientId, phoneNumber = "N/A" } = patient;
console.log(patientId, phoneNumber); // Outputs: P101 N/A

// Nested destructuring
const { address: { city } } = patient;
console.log(city); // Outputs: Medville

// Destructuring with rest properties
const { id, ...details } = patient;
console.log(id, details); // Outputs: P101 { name: 'Alice Smith', age: 30, address: { city: 'Medville', zip: '12345' } }
```

Destructuring is very common in React Native for accessing props passed to components.

#### ES6+ Object Spread Syntax (`...`)

Provides a concise way to copy enumerable own properties from one or more source objects into a new object literal. Frequently used for shallow cloning and merging objects, especially in patterns that promote immutability.

-   Shallow Cloning: `const clonedObject = { ...originalObject };`
-   Merging Objects: `const mergedObject = { ...objectA, ...objectB, customProperty: "override" };` (Properties from rightmost object overwrite).

> [!IMPORTANT]
> The object spread syntax performs a *shallow* copy. If a property value is itself an object or array, only the reference is copied. Modifying the nested object/array in the clone will affect the original.

This example shows object spread syntax:

```javascript
const baseMedication = { form: "Tablet", strength: "200mg" };
const specificMedication = { name: "Ibuprofen", ...baseMedication }; // Merge objects
console.log(specificMedication); // Outputs: { name: 'Ibuprofen', form: 'Tablet', strength: '200mg' }

const patient = { id: "P101", name: "Alice" };
const updatedPatient = { ...patient, age: 31 }; // Add/update property immutably
console.log(updatedPatient); // Outputs: { id: 'P101', name: 'Alice', age: 31 }
console.log(patient); // Outputs: { id: 'P101', name: 'Alice' } (Original is unchanged)
```

> 🌐 **Web Developers:** Object destructuring and spread syntax are standard in modern JavaScript and heavily used in React. You should be very comfortable with these patterns.
>
> 📲 **Native Developers:** These are powerful syntactic features that might not have direct equivalents in Java or Swift. They are essential for writing concise and readable JavaScript, especially when working with data structures and function arguments.

### Arrays In-Depth

Arrays in JavaScript are ordered, zero-indexed collections of values. They are a special type of object, optimized for storing and manipulating ordered data.

-   Arrays are mutable.
-   Variables holding arrays store a reference to the array in memory.
-   `typeof []` returns `"object"`. Use `Array.isArray()` to reliably check if a value is an array.

#### Array Literal Syntax

The most common way to create an array: `const myArray = [10, "apple", true, { id: 1 }, ["nested", "array"]];`. Arrays can hold elements of mixed data types.

This example shows array literal syntax:

```javascript
const medicationList = ["Aspirin", "Ibuprofen", "Paracetamol"];
const patientIds = ["P101", "P102", "P103"];
const mixedArray = [1, "hello", true, { name: "Test" }];
```

#### `length` Property

Indicates the number of elements in the array. It is always one greater than the highest index. The `length` property is mutable. Setting it to a smaller value truncates the array.

This example shows the `length` property:

```javascript
const medicationList = ["Aspirin", "Ibuprofen", "Paracetamol"];
console.log(medicationList.length); // Outputs: 3

medicationList.length = 2; // Truncate the array
console.log(medicationList); // Outputs: ["Aspirin", "Ibuprofen"]
```

#### Accessing and Modifying Elements

Elements are accessed using zero-based bracket notation: `myArray[0]`. Elements can be modified by assigning a new value to an index: `myArray[0] = "new value";`. New elements can be added by assigning to an index equal to or greater than the current length, though `push()` is preferred for adding to the end.

This example shows accessing and modifying array elements:

```javascript
const patientIds = ["P101", "P102", "P103"];
console.log(patientIds[0]); // Outputs: P101

patientIds[1] = "P105"; // Modify element at index 1
console.log(patientIds); // Outputs: ["P101", "P105", "P103"]

patientIds[3] = "P106"; // Add element at index 3
console.log(patientIds); // Outputs: ["P101", "P105", "P103", "P106"]
```

#### Comprehensive Coverage of Common Array Methods

JavaScript provides a rich set of built-in methods for array manipulation. Understanding which methods modify (mutate) the original array and which return a new array is crucial, especially in contexts like React state management where immutability is preferred.

> [!IMPORTANT]
> In React Native state management, you should avoid directly mutating state arrays. Use non-mutating methods or techniques like the spread syntax to create a new array with the desired changes.

**Mutator Methods (modify the original array):**

-   `push(...items)`: Adds elements to the end.
-   `pop()`: Removes the last element.
-   `shift()`: Removes the first element.
-   `unshift(...items)`: Adds elements to the beginning.
-   `splice(startIndex, deleteCount, ...itemsToAdd)`: Changes array content by removing/replacing/adding elements in place.
-   `sort(compareFunction)`: Sorts elements in place.
-   `reverse()`: Reverses elements in place.
-   `fill(value, startIndex, endIndex)`: Fills elements with a static value.
-   `copyWithin(targetIndex, startIndex, endIndex)`: Shallow copies part of an array to another location in the same array.

This example shows mutator array methods:

```javascript
const medicationQueue = ["A", "B", "C"];
medicationQueue.push("D"); // Adds D to the end
console.log(medicationQueue); // Outputs: ["A", "B", "C", "D"]

const last = medicationQueue.pop(); // Removes D
console.log(medicationQueue, last); // Outputs: ["A", "B", "C"] D

medicationQueue.splice(1, 1, "E"); // Removes B, adds E at index 1
console.log(medicationQueue); // Outputs: ["A", "E", "C"]
```

**Accessor Methods (return a new array or value; do not modify the original array):**

-   `concat(...arraysOrItems)`: Merges arrays/values into a new array.
-   `slice(startIndex, endIndex)`: Returns a shallow copy of a portion of the array.
-   `join(separator)`: Joins elements into a string.
-   `includes(valueToFind, fromIndex)`: Checks if an array contains a value.
-   `indexOf(searchElement, fromIndex)`: Returns the first index of an element, or -1.
-   `lastIndexOf(searchElement, fromIndex)`: Returns the last index of an element, or -1.
-   `at(index)` (ES2022+): Returns the item at an index, supports negative indices.
-   `toString()`: Returns a string representation.
-   `toLocaleString()`: Returns a localized string representation.

This example shows accessor array methods:

```javascript
const medications1 = ["Aspirin", "Ibuprofen"];
const medications2 = ["Paracetamol"];
const allMedications = medications1.concat(medications2); // Creates a new array
console.log(allMedications); // Outputs: ["Aspirin", "Ibuprofen", "Paracetamol"]
console.log(medications1); // Outputs: ["Aspirin", "Ibuprofen"] (Original is unchanged)

const subset = allMedications.slice(0, 2); // Creates a new array from a portion
console.log(subset); // Outputs: ["Aspirin", "Ibuprofen"]

console.log(allMedications.includes("Ibuprofen")); // Outputs: true
```

**Iteration Methods (execute a callback for each element; generally do not modify the original array unless the callback itself does so):**

-   `forEach(callback)`: Executes a function for each element.
-   `map(callback)`: Creates a new array with results of calling a function on each element.
-   `filter(callback)`: Creates a new array with elements that pass a test.
-   `reduce(callback, initialValue)`: Reduces array to a single value.
-   `reduceRight(callback, initialValue)`: Similar to `reduce`, but from right-to-left.
-   `every(callback)`: Tests if all elements pass a test.
-   `some(callback)`: Tests if at least one element passes a test.
-   `find(callback)`: Returns the value of the first element that passes a test.
-   `findIndex(callback)`: Returns the index of the first element that passes a test.
-   `findLast(callback)` (ES2023+): Returns the value of the last element that passes a test.
-   `findLastIndex(callback)` (ES2023+): Returns the index of the last element that passes a test.
-   `flatMap(callback)`: Maps each element and flattens the result.
-   `keys()`: Returns an iterator of keys (indices).
-   `values()`: Returns an iterator of values.
-   `entries()`: Returns an iterator of key/value pairs.

This example shows common iteration methods:

```javascript
const dosages = [100, 200, 300, 400];

// map: Create a new array with transformed values
const mgDosages = dosages.map(dosage => `${dosage}mg`);
console.log(mgDosages); // Outputs: ["100mg", "200mg", "300mg", "400mg"]

// filter: Create a new array with elements that pass a test
const highDosages = dosages.filter(dosage => dosage >= 300);
console.log(highDosages); // Outputs: [300, 400]

// reduce: Calculate a single value from the array
const totalDosage = dosages.reduce((sum, dosage) => sum + dosage, 0);
console.log(totalDosage); // Outputs: 1000

// forEach: Execute a side effect for each element
dosages.forEach(dosage => console.log(`Processing ${dosage}mg...`));
// Outputs:
// Processing 100mg...
// Processing 200mg...
// Processing 300mg...
// Processing 400mg...
```

**New Non-Mutating Methods (ES2023+):** These methods provide non-mutating alternatives to older mutating methods, beneficial for immutable state patterns.

-   `toReversed()`: Returns a new array with elements in reversed order.
-   `toSorted(compareFunction)`: Returns a new array with elements sorted.
-   `toSpliced(startIndex, deleteCount, ...itemsToAdd)`: Returns a new array with elements spliced.
-   `with(index, value)`: Returns a new array with the element at the given index replaced.

This example shows new non-mutating methods:

```javascript
const originalArray = [1, 3, 2];
const sortedArray = originalArray.toSorted(); // New sorted array
console.log(sortedArray); // Outputs: [1, 2, 3]
console.log(originalArray); // Outputs: [1, 3, 2] (Original is unchanged)

const reversedArray = originalArray.toReversed(); // New reversed array
console.log(reversedArray); // Outputs: [2, 3, 1]

const arrayWithReplacement = originalArray.with(1, 5); // New array with element at index 1 replaced
console.log(arrayWithReplacement); // Outputs: [1, 5, 2]
```

#### ES6+ Array Destructuring

A concise syntax for extracting multiple values from an array and assigning them to variables in a single statement.

-   Basic Syntax: `const [firstElement, secondElement] = myArray;`
-   Skipping Elements: `const [first, , third] = myArray;`
-   Default Values: `const [first, second = "defaultVal"] = someArray;`
-   Rest Elements: Collect all remaining elements into a new array: `const [firstItem, secondItem, ...remainingItems] = fullArray;` (Must be the last element).
-   Swapping Variables: `[a, b] = [b, a];`

This example shows array destructuring:

```javascript
const patientNames = ["Alice", "Bob", "Charlie"];

// Basic destructuring
const [patient1, patient2] = patientNames;
console.log(patient1, patient2); // Outputs: Alice Bob

// Skipping elements
const [,, patient3] = patientNames;
console.log(patient3); // Outputs: Charlie

// Destructuring with rest elements
const [firstPatient, ...otherPatients] = patientNames;
console.log(firstPatient, otherPatients); // Outputs: Alice ["Bob", "Charlie"]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // Outputs: 2 1
```

Destructuring is also common in function parameters when an array is passed as an argument.

#### ES6+ Array Spread Syntax (`...`)

Expands an iterable (like an array or string) into individual elements. Useful for creating new arrays, concatenating, and passing arguments to functions.

-   Creating New Arrays with Existing Elements: `const newArray = [...oldArray, newItem1, "anotherItem"];`
-   Concatenating Arrays: `const combinedArray = [...array1, ...array2, ...array3];`
-   Passing Array Elements as Individual Arguments: `Math.max(...numbers);`
-   Converting Iterables to Arrays: `const characters = [...myString];`
-   Shallow Copying an Array: `const arrayCopy = [...originalArray];`

This example shows array spread syntax:

```javascript
const availableMedications = ["Aspirin", "Ibuprofen"];
const newMedications = ["Paracetamol", "Naproxen"];

// Concatenating arrays using spread
const allMedications = [...availableMedications, ...newMedications];
console.log(allMedications); // Outputs: ["Aspirin", "Ibuprofen", "Paracetamol", "Naproxen"]

// Adding elements to a new array using spread
const updatedList = [...availableMedications, "New Drug"];
console.log(updatedList); // Outputs: ["Aspirin", "Ibuprofen", "New Drug"]

// Passing array elements as arguments
const dosages = [100, 500, 250];
console.log(Math.max(...dosages)); // Outputs: 500
```

The introduction of destructuring and spread syntax in ES6 has significantly improved the ergonomics of working with objects and arrays. They promote more declarative code and align well with functional programming paradigms that favor immutability, which is particularly relevant in state management libraries used with React Native.

This table summarizes key array methods and whether they mutate the original array:

Table 4.1: Summary of Key Array Methods

| Method Name & Syntax                               | Description                                                                 | Mutates Original? | Returns                                   |
| :------------------------------------------------- | :-------------------------------------------------------------------------- | :---------------- | :---------------------------------------- |
| `push(...items)`                                   | Adds items to the end                                                       | Yes               | New length of the array                   |
| `pop()`                                            | Removes the last item                                                       | Yes               | The removed item                          |
| `shift()`                                          | Removes the first item                                                      | Yes               | The removed item                          |
| `unshift(...items)`                                | Adds items to the beginning                                                 | Yes               | New length of the array                   |
| `splice(start, deleteCount, ...itemsToAdd)`        | Removes/replaces/adds items in place                                        | Yes               | Array of deleted items                    |
| `slice(start, end)`                                | Returns a shallow copy of a portion                                         | No                | New array with the extracted elements     |
| `map(callback)`                                    | Creates a new array with results of callback on each element                | No                | New array with transformed elements       |
| `filter(callback)`                                 | Creates a new array with elements for which callback returns truthy         | No                | New array with filtered elements          |
| `reduce(callback, initialValue)`                   | Reduces array to a single value by applying callback to accumulator and each element | No                | The single accumulated value              |
| `forEach(callback)`                                | Executes callback for each element                                          | No (by itself)    | `undefined`                               |
| `find(callback)`                                   | Returns the first element for which callback returns truthy                 | No                | The found element, or `undefined`         |
| `includes(valueToFind, fromIndex)`                 | Checks if an array contains a certain value                                 | No                | `true` or `false`                         |
| `toSorted(compareFunction)` (ES2023+)              | Returns a new array with elements sorted                                    | No                | New sorted array                          |
| `toReversed()` (ES2023+)                           | Returns a new array with elements in reversed order                         | No                | New reversed array                        |
| `toSpliced(start, deleteCount, ...itemsToAdd)` (ES2023+)| Returns a new array with elements spliced                                   | No                | New array with elements spliced           |
| `with(index, value)` (ES2023+)                     | Returns a new array with the element at index replaced with value           | No                | New array with the element at index replaced|

> 🌐 **Web Developers:** Objects and arrays are core to web development. Destructuring and spread/rest syntax are standard in modern JavaScript and React. Ensure you are comfortable with the distinction between mutating and non-mutating array methods, as this is crucial for state management.
>
> 📲 **Native Developers:** While you have concepts like dictionaries/maps and arrays/lists, JavaScript's dynamic nature and the built-in methods (especially iteration methods like `map`, `filter`, `reduce`) might be new. Destructuring and spread/rest syntax are powerful features that offer concise ways to handle data that differ from typical native patterns. Pay close attention to the reference nature of objects/arrays and the implications for copying and modification.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics)
> - [MDN Web Docs: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
> - [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
> - [MDN Web Docs: `Array.isArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
> - [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> - [MDN Web Docs: Spread syntax (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> - [MDN Web Docs: Rest parameters (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### Section Exercise

Practice manipulating data using objects, arrays, methods, destructuring, and spread/rest operators in this coding exercise.

**(TODO: Add link to Exercise 5.2: Data Manipulation - CodeSandbox)**

### Next Steps

Continue to the next section to understand how JavaScript handles operations that take time, such as fetching data, using asynchronous patterns like callbacks, Promises, and the modern `async`/`await` syntax.

- [Section 5: Asynchronous JavaScript (Callbacks, Promises, async/await)](./section-05-asynchronous-javascript.md)
