## Section 4: Objects and Arrays (Methods, Destructuring, Spread/Rest Operators)

> [!TIP]
> Experienced developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics)
> - [MDN Web Docs: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
> - [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
> - [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> - [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> - [MDN Web Docs: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

Objects and arrays are the cornerstone data structures in JavaScript, used for organizing and storing collections of related data and functionality. This section delves into their creation, manipulation, and the powerful ES6+ features like destructuring and spread/rest syntax that enhance working with them.

> [!TIP]
> Experienced developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics)
> - [MDN Web Docs: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
> - [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
> - [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> - [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> - [MDN Web Docs: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### 4.1. Objects In-Depth

Objects in JavaScript are dynamic collections of key-value pairs. Keys are typically strings (or Symbols), and values can be any valid JavaScript data type, including other objects or functions (which are then called methods).

* **Object Literal Syntax**:
  + The most common way to create objects is using the literal syntax: const myObject = { key1: "value1", "property name with spaces": true, numericKey: 123 };.22
  + Property keys that are valid JavaScript identifiers can be written without quotes. Keys containing spaces or special characters, or those that are not valid identifiers, must be enclosed in quotes (single or double). Numeric keys are automatically coerced to strings.
* **Property Management**:
  + **Accessing Properties**:
    - **Dot Notation**: myObject.key1. This is used when the property key is a valid identifier and is known at the time of writing.22
    - **Bracket Notation**: myObject["property name with spaces"]. This notation is more versatile. It must be used if the property key is not a valid identifier (e.g., contains spaces) or if the key is dynamic (i.e., stored in a variable).22 For example:
      JavaScript
      let dynamicKey = "key1";
      console.log(myObject[dynamicKey]); // Accesses myObject.key1
      The ability to use an expression that evaluates to a string for the property name makes bracket notation powerful for scenarios where property names are determined at runtime.
  + **Adding/Modifying Properties**: Properties can be added or existing ones modified by simple assignment: myObject.newKey = "a new value"; or myObject["anotherKey"] = 456;.22
  + **Deleting Properties**: The delete operator can remove a property from an object: delete myObject.key1;.

> 🌐 **(Web Developers):**
> > **Comparison:** JavaScript objects are similar to dictionaries or maps in other languages, storing key-value pairs. Property access using dot notation (`.`) or bracket notation (`[]`) is a common pattern, though the flexibility of using variables for bracket notation keys might be a point of note.
> >
> > **Key Takeaway:** JavaScript objects are versatile for representing structured data. Understand both dot and bracket notation for accessing properties, especially when dealing with dynamic keys.
> >
> > **Source:** [MDN Web Docs: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages use various data structures like dictionaries (Swift), HashMaps (Kotlin/Java), or structs/classes. JavaScript objects serve a similar purpose for key-value data. The dynamic nature of adding/deleting properties and the flexibility of bracket notation with variables are key differences from statically defined structures.
> >
> > **Key Takeaway:** JavaScript objects are flexible containers. Be comfortable using both dot and bracket notation for property access and manipulation.
> >
> > **Source:** [MDN Web Docs: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

* **ES6+ Computed Property Names**:
  + Allows the use of an expression, enclosed in square brackets ``, to define a property key within an object literal at the time of creation.25
  + Syntax:
    JavaScript
    let suffix = "Name";
    const person = {
     ["first" + suffix]: "Alice",
     ["last" + suffix]: "Smith"
    };
    console.log(person.firstName); // "Alice"
    console.log(person.lastName); // "Smith"
* **Method Definitions**:
  + Methods are functions that are properties of an object.
  + Traditional syntax: const calculator = { add: function(a, b) { return a + b; } };.22
  + ES6+ Shorthand Syntax: Provides a more concise way to define methods: const calculator = { add(a, b) { return a + b; } };.22
  + **this in Methods**: When a method is defined using regular function syntax (or the ES6 shorthand, which behaves similarly regarding this), the this keyword inside the method refers to the object the method was called on (the receiver of the method call).22 If an arrow function is used as a method, it will inherit this lexically, which is often not the desired behavior for object methods that need to refer to the object instance itself.
* **ES6+ Object Destructuring**:
  + A powerful and concise syntax for extracting values from object properties and assigning them to distinct variables.1 This greatly improves code readability when working with objects, especially function parameters or props in React.
  + **Basic Syntax**: const { property1, property2 } = myObject; This creates two variables, property1 and property2, initialized with the values of myObject.property1 and myObject.property2.
  + **Aliasing (Assigning to New Variable Names)**: If you want to assign the extracted value to a variable with a different name: const { property1: newName1, property2: anotherName } = myObject;.27
  + **Default Values**: Provide a default value if a property does not exist on the object or if its value is undefined: const { property1, nonExistentProperty = "defaultValue" } = myObject;.27
  + **Nested Destructuring**: Extract values from properties of nested objects: const { name, address: { city, country } } = userProfile;.
  + **Rest Properties**: Collect all remaining enumerable own properties of an object into a new object: const { id, name,...otherDetails } = userRecord; The otherDetails object will contain all properties from userRecord except id and name.26
  + **Destructuring in Function Parameters**: A very common pattern for easily accessing properties of an object passed as an argument:
    JavaScript
    function displayUser({ name, age = 30, email }) {
     console.log(`Name: ${name}, Age: ${age}, Email: ${email}`);
    }
    displayUser({ name: "Bob", email: "bob@example.com" });
* **ES6+ Object Spread Syntax (...)**:
  + Provides a concise way to copy enumerable own properties from one or more source objects into a new object literal. It is frequently used for shallow cloning and merging objects, especially in patterns that promote immutability.18
  + **Shallow Cloning**: const clonedObject = {...originalObject };. This creates a new object with all the same properties and values as originalObject.
  + **Merging Objects**: const mergedObject = {...objectA,...objectB, customProperty: "override" };. Properties are copied from left to right. If multiple source objects have properties with the same key, the value from the rightmost object in the spread sequence will overwrite earlier ones. Any properties explicitly defined after the spreads will also overwrite.
  + **Important Note on Shallow Copy**: The spread syntax performs a **shallow copy**. This means if a property value in the source object is itself an object or an array, the *reference* to that nested object/array is copied, not the nested object/array itself. Modifying the nested object/array in the clone will also affect the original, and vice-versa.18
  + **Difference from Object.assign()**: While both can be used for merging objects, Object.assign(target,...sources) modifies the target object and triggers setters on the target. The spread syntax creates a new object and does not trigger setters during property definition.25

### 4.2. Arrays In-Depth

Arrays in JavaScript are ordered, zero-indexed collections of values. They are a special type of object, optimized for storing and manipulating ordered data.

* **Array Literal Syntax**: The most common way to create an array: const myArray = [10, "apple", true, { id: 1 }, ["nested", "array"]];.28
  + Arrays can hold elements of mixed data types.
  + Since arrays are objects, typeof myArray returns "object". To reliably check if a value is an array, use Array.isArray(myArray).29
* **length Property**:
  + Indicates the number of elements in the array. It is always one greater than the highest index in the array.28
  + The length property is mutable. Setting it to a value smaller than the current length will truncate the array, removing elements from the end. Setting it to a larger value will create empty slots (which behave like undefined in many contexts) at the end of the array.
* **Accessing and Modifying Elements**:
  + Elements are accessed using zero-based bracket notation: myArray (first element), myArray (second element), etc.
  + Elements can be modified by assigning a new value to a specific index: myArray = "banana";.
  + New elements can be added by assigning to an index equal to or greater than the current length: myArray[myArray.length] = "new last element"; (though push() is generally preferred for adding to the end).
* **Comprehensive Coverage of Common Array Methods**: JavaScript provides a rich set of built-in methods for array manipulation. Understanding which methods modify (mutate) the original array and which return a new array is crucial, especially in contexts like React state management where immutability is preferred.28 The distinction between mutating and non-mutating methods is a core concept for React Native developers. Direct mutation of state arrays can lead to bugs and break React's change detection. Non-mutating methods, or techniques like the spread syntax to create copies before mutation, are vital for predictable state updates.
  + **Mutator Methods (modify the original array)**:
    - push(...items): Adds one or more elements to the end of an array and returns the new length.
    - pop(): Removes the last element from an array and returns that removed element.
    - shift(): Removes the first element from an array and returns that removed element.
    - unshift(...items): Adds one or more elements to the beginning of an array and returns the new length.
    - splice(startIndex, deleteCount,...itemsToAdd): A versatile method that changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Returns an array containing the deleted elements.
    - sort(compareFunction): Sorts the elements of an array in place. By default, it sorts elements lexicographically (as strings). For numeric or custom sorting, a compareFunction must be provided.
    - reverse(): Reverses the order of the elements of an array in place.
    - fill(value, startIndex, endIndex): Fills all the elements of an array from a startIndex (default 0) to an endIndex (default array.length) with a static value.
    - copyWithin(targetIndex, startIndex, endIndex): Shallow copies part of an array to another location in the same array and returns it, without modifying its length.
  + **Accessor Methods (return a new array or value; do not modify the original array)**:
    - concat(...arraysOrItems): Returns a new array created by merging the calling array with other arrays and/or values.
    - slice(startIndex, endIndex): Returns a shallow copy of a portion of an array into a new array object. The original array is not modified. endIndex is exclusive.
    - join(separator): Joins all elements of an array into a string. A separator string can be specified.
    - includes(valueToFind, fromIndex): Determines whether an array includes a certain value among its entries, returning true or false.
    - indexOf(searchElement, fromIndex): Returns the first index at which a given element can be found in the array, or -1 if it is not present.
    - lastIndexOf(searchElement, fromIndex): Returns the last index at which a given element can be found in the array, or -1 if it is not present. Searches backwards from fromIndex.
    - toString(): Returns a string representing the specified array and its elements.
    - toLocaleString(): Returns a localized string representing the array and its elements.
    - at(index) (ES2022+): Takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array (e.g., myArray.at(-1) is the last element).
  + **Iteration Methods (execute a callback for each element; generally do not modify the original array unless the callback itself does so)**:
    - forEach(callback(element, index, array)): Executes a provided function once for each array element. Does not return a value (implicitly returns undefined).
    - map(callback(element, index, array)): Creates a **new array** populated with the results of calling a provided function on every element in the calling array.
    - filter(callback(element, index, array)): Creates a **new array** with all elements that pass the test implemented by the provided function (i.e., for which the callback returns a truthy value).
    - reduce(callback(accumulator, currentValue, currentIndex, array), initialValue): Executes a "reducer" function on each element of the array, resulting in a single output value (the accumulator).
    - reduceRight(callback(accumulator, currentValue, currentIndex, array), initialValue): Similar to reduce(), but executes from right-to-left.
    - every(callback(element, index, array)): Tests whether all elements in the array pass the test implemented by the provided function. Returns a Boolean.
    - some(callback(element, index, array)): Tests whether at least one element in the array passes the test implemented by the provided function. Returns a Boolean.
    - find(callback(element, index, array)): Returns the **value** of the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
    - findIndex(callback(element, index, array)): Returns the **index** of the first element in the array that satisfies the provided testing function. Otherwise, -1 is returned.
    - findLast(callback(element, index, array)) (ES2023+): Similar to find(), but iterates from the end of the array.
    - findLastIndex(callback(element, index, array)) (ES2023+): Similar to findIndex(), but iterates from the end of the array.
    - flatMap(callback(element, index, array)): First maps each element using a mapping function, then flattens the result into a new array (to a depth of 1).
    - keys(): Returns a new Array Iterator object that contains the keys (indices) for each index in the array.
    - values(): Returns a new Array Iterator object that contains the values for each index in the array.
    - entries(): Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
  + **New Non-Mutating Methods (ES2023+)**: These methods provide non-mutating alternatives to older mutating methods, which is beneficial for functional programming and immutable state patterns.29
    - toReversed(): Returns a new array with elements in reversed order (non-mutating version of reverse()).
    - toSorted(compareFunction): Returns a new array with elements sorted (non-mutating version of sort()).
    - toSpliced(startIndex, deleteCount,...itemsToAdd): Returns a new array with elements spliced (non-mutating version of splice()).
    - with(index, value): Returns a new array with the element at the given index replaced with the new value.

> 🌐 **(Web Developers):**
> > **Comparison:** If you're used to modifying arrays in place, the distinction between mutating and non-mutating array methods in JavaScript is crucial, especially when working with frameworks like React that emphasize immutability for state management. Methods like `push` or `splice` modify the original array, while methods like `map` or `filter` return a new array.
> >
> > **Key Takeaway:** Be aware of which array methods mutate the original array and which return a new one. In React Native development, favoring non-mutating methods or using techniques like the spread syntax (`...`) to create copies before modification is essential for predictable state updates.
> >
> > **Source:** [MDN Web Docs: Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages have various ways to manipulate collections, some of which modify the collection in place, and others that return new collections. In JavaScript, it's important to understand which array methods are "mutator" methods (change the original array) and which are "accessor" methods (return a new array). This distinction is particularly relevant when working with immutable data patterns in React Native.
> >
> > **Key Takeaway:** Identify and understand the difference between mutating and non-mutating array methods. For predictable state management in React Native, prefer methods that return new arrays or use the spread syntax to avoid direct mutation.
> >
> > **Source:** [MDN Web Docs: Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)

* **ES6+ Array Destructuring**:
  + A concise syntax for extracting multiple values from an array and assigning them to variables in a single statement.1
  + **Basic Syntax**: const [firstElement, secondElement] = myArray;.
  + **Skipping Elements**: Use a comma placeholder to skip elements: const [first, , third] = myArray;.26
  + **Default Values**: Provide default values for elements that might be missing or undefined: const [first, second = "defaultVal"] = someArray;.27
  + **Rest Elements**: Collect all remaining elements of an array into a new array: const [firstItem, secondItem,...remainingItems] = fullArray;. The rest element must be the last one in the destructuring pattern.26
  + **Swapping Variables**: A common use case for array destructuring is swapping the values of two variables without needing a temporary variable: [a, b] = [b, a];.26
  + **Destructuring in Function Parameters**: function processCoordinates([x, y]) { console.log(x, y); } processCoordinates();.
* **ES6+ Array Spread Syntax (...)**:
  + Expands an iterable (like an array or string) into individual elements. This is extremely useful for creating new arrays, concatenating, and passing arguments to functions.18
  + **Creating New Arrays with Existing Elements**: const newArray = [...oldArray, newItem1, "anotherItem"];. This creates a new array containing all elements from oldArray followed by newItem1 and "anotherItem".
  + **Concatenating Arrays**: const combinedArray = [...array1,...array2,...array3];.
  + **Passing Array Elements as Individual Arguments to Functions**: If a function expects multiple arguments (e.g., Math.max(arg1, arg2, arg3)), you can pass elements from an array like this: const numbers = ; const maxNumber = Math.max(...numbers);.18
  + **Converting Iterables to Arrays**: Can convert other iterables, like a NodeList (from DOM operations) or a string, into an array: const characters =;.
  + **Shallow Copying an Array**: const arrayCopy = [...originalArray];. This creates a new array with the same elements. Like object spread, this is a shallow copy.

> 🌐 **(Web Developers):**
> > **Comparison:** Destructuring and spread/rest syntax are powerful features that exist in some other languages (e.g., Python, C# with pattern matching). In JavaScript, they provide concise ways to extract values from objects/arrays or combine them, often simplifying code that would otherwise require more verbose property access or array manipulation methods.
> >
> > **Key Takeaway:** Master destructuring and spread/rest syntax as they are widely used in modern JavaScript and React/React Native for cleaner data handling.
> >
> > **Source:** [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages might use different patterns for extracting data from collections or passing multiple arguments (e.g., tuple unpacking, variable arguments). JavaScript's destructuring and spread/rest syntax offer concise, built-in ways to achieve similar results, which are heavily utilized in React Native development.
> >
> > **Key Takeaway:** Destructuring and spread/rest syntax are fundamental modern JavaScript features that streamline data extraction and manipulation. Become proficient in using them.
> >
> > **Source:** [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

The introduction of destructuring and spread syntax in ES6 has significantly improved the ergonomics of working with objects and arrays. They promote more declarative code and align well with functional programming paradigms that favor immutability, which is particularly relevant in state management libraries used with React Native.

<br>

**Table 4.1: Summary of Key Array Methods**

| **Method Name & Syntax** | **Description** | **Mutates Original?** | **Returns** |
| --- | --- | --- | --- |
| push(...items) | Adds items to the end | Yes | New length of the array |
| pop() | Removes the last item | Yes | The removed item |
| shift() | Removes the first item | Yes | The removed item |
| unshift(...items) | Adds items to the beginning | Yes | New length of the array |
| splice(start, deleteCount,...itemsToAdd) | Removes/replaces/adds items in place | Yes | Array of deleted items |
| slice(start, end) | Returns a shallow copy of a portion | No | New array with the extracted elements |
| map(callback) | Creates a new array with results of callback on each element | No | New array with transformed elements |
| filter(callback) | Creates a new array with elements for which callback returns truthy | No | New array with filtered elements |
| reduce(callback, initialValue) | Reduces array to a single value by applying callback to accumulator and each element | No | The single accumulated value |
| reduceRight(callback, initialValue) | Similar to reduce(), but executes from right-to-left | No | The single accumulated value |
| forEach(callback) | Executes callback for each element | No (by itself) | undefined |
| find(callback) | Returns the first element for which callback returns truthy | No | The found element, or undefined |
| findIndex(callback) | Returns the index of the first element for which callback returns truthy | No | The index of the found element, or -1 |
| includes(valueToFind, fromIndex) | Checks if an array contains a certain value | No | true or false |
| join(separator) | Joins elements into a string | No | String representation of the array |
| concat(...arraysOrItems) | Merges arrays/items into a new array | No | New concatenated array |
| sort(compareFunction) | Sorts elements in place (default: lexicographical) | Yes | The sorted array (reference to original) |
| reverse() | Reverses elements in place | Yes | The reversed array (reference to original) |
| toSorted(compareFunction) (ES2023+) | Returns a new array with elements sorted | No | New sorted array |
| toReversed() (ES2023+) | Returns a new array with elements in reversed order | No | New reversed array |
| toSpliced(start, deleteCount,...itemsToAdd) (ES2023+) | Returns a new array with elements spliced | No | New array with elements spliced |
| with(index, value) (ES2023+) | Returns a new array with the element at index replaced with value | No | New array with the element at index replaced |

<br>

**(TODO: Add CodeSandbox link for Exercise 5.2)**
