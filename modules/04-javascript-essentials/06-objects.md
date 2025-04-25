# Module 6: Objects

**Introduction**

Objects are a fundamental data type in JavaScript, used to store collections of related data and functionality. They consist of key-value pairs, where keys are typically strings (or Symbols) and values can be any data type, including other objects or functions (which are then called methods). Objects are incredibly versatile and form the basis for many JavaScript patterns, including data structures and component props/state in React/React Native.

**Learning Objectives**

*   Create objects using object literal syntax (`{}`).
*   Access and modify object properties using dot notation (`.`) and bracket notation (`[]`).
*   Define methods (functions) within objects.
*   Understand the concept of `this` within object methods.
*   Use object destructuring (`{}`) to extract property values into variables.
*   Apply the spread syntax (`...`) to create shallow copies and merge objects.
*   Recognize common use cases for objects in React Native (e.g., component props, state, style objects).

**Keywords**

*   Object Literal: The `{ key: value }` syntax for creating objects.
*   Property: A key-value pair within an object.
*   Key: The identifier (string or Symbol) for a property.
*   Value: The data associated with a key.
*   Method: A function that is a property of an object.
*   Dot Notation: Accessing properties using `object.propertyName`.
*   Bracket Notation: Accessing properties using `object["propertyName"]` or `object[variableContainingKey]`.
*   `this` (in methods): Typically refers to the object the method was called on.
*   Object Destructuring: A syntax for unpacking properties from objects into distinct variables.
*   Spread Syntax (`...`): Expands an iterable (like an object's properties) into individual elements, useful for copying and merging.
*   Shallow Copy: Copying only the top-level properties; nested objects/arrays are still referenced, not deeply copied.

---

## Creating Objects

The most common way to create objects is using the object literal syntax:

```javascript
// Empty object
const emptyObj = {};

// Object with properties
const user = {
  firstName: "Alice",
  lastName: "Smith",
  age: 30,
  isOnline: true,
  // Nested object
  address: {
    street: "123 Main St",
    city: "Anytown"
  },
  // Method (function as a property)
  greet: function() {
    // 'this' refers to the 'user' object when called as user.greet()
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
  },
  // Shorthand method syntax (ES6+)
  sayGoodbye() {
    console.log(`Goodbye from ${this.firstName}!`);
  }
};

console.log(user);
```

---

## Accessing and Modifying Properties

You can access object properties using dot notation or bracket notation.

*   **Dot Notation (`object.property`)**: Simpler and more common when the property key is a valid identifier (doesn't contain spaces, special characters, or start with a number).
*   **Bracket Notation (`object["property"]` or `object[variable]`)**: Required when the key is not a valid identifier or when the key is stored in a variable.

```javascript
// Accessing properties
console.log(user.firstName);      // Output: Alice (dot notation)
console.log(user["lastName"]);    // Output: Smith (bracket notation with string)
console.log(user.address.city);   // Output: Anytown (accessing nested property)

let propertyToAccess = "age";
console.log(user[propertyToAccess]); // Output: 30 (bracket notation with variable)

// Modifying properties
user.age = 31;
user["isOnline"] = false;
user.address.street = "456 Side St";

console.log(user.age);          // Output: 31
console.log(user.isOnline);     // Output: false
console.log(user.address.street); // Output: 456 Side St

// Adding new properties
user.country = "USA";
user["favoriteColor"] = "Blue";

console.log(user.country);      // Output: USA
console.log(user.favoriteColor);// Output: Blue
```

---

## Methods and `this`

Methods are functions stored as object properties. Inside a method defined using the `function` keyword or shorthand syntax, `this` typically refers to the object that the method was called on.

```javascript
user.greet();       // Output: Hello, my name is Alice Smith.
user.sayGoodbye();  // Output: Goodbye from Alice!

const greetFunc = user.greet;
// greetFunc(); // TypeError: Cannot read property 'firstName' of undefined (or window/global)
// When called this way, 'this' loses its context. It needs to be bound or called differently.

// To fix this, you can use .bind() or call it on the object
const boundGreet = user.greet.bind(user);
boundGreet(); // Output: Hello, my name is Alice Smith.

// Or call directly on the object
user.greet();

// Arrow functions as methods behave differently with 'this'
const counter = {
  count: 0,
  incrementRegular: function() {
    this.count++;
    console.log("Regular increment:", this.count);
  },
  // Arrow function inherits 'this' from where counter was defined (e.g., global scope)
  // This usually doesn't work as intended for typical methods.
  incrementArrow: () => {
    // 'this' here is NOT the 'counter' object
    // this.count++; // This would likely cause an error or modify a global count
    console.log("Arrow increment this:", this);
  }
};

counter.incrementRegular(); // Regular increment: 1
// counter.incrementArrow(); // Check console to see what 'this' refers to (not counter)
```

**Key Takeaway:** For standard object methods where you need to access the object's own properties, use regular function syntax or method shorthand, not arrow functions.

---

## Object Destructuring (ES6+)

Destructuring provides a concise way to extract values from objects (and arrays) into distinct variables.

**Syntax:**

```javascript
const { property1, property2, ...rest } = object;
```

**Features:**

*   Extract properties into variables with the same name.
*   Assign to new variable names (`property: newName`).
*   Provide default values (`property = defaultValue`).
*   Extract nested properties (`{ address: { city } }`).
*   Combine with rest syntax (`...rest`) to collect remaining properties.

**Example:**

```javascript
const product = {
  id: "P123",
  name: "Laptop",
  price: 1200,
  details: {
    brand: "TechCo",
    color: "Silver"
  },
  inStock: true
};

// Basic destructuring
const { name, price } = product;
console.log(name);  // Output: Laptop
console.log(price); // Output: 1200

// Renaming variables
const { id: productID, inStock } = product;
console.log(productID); // Output: P123
console.log(inStock);   // Output: true

// Default values
const { category = "Electronics", price: itemPrice } = product;
console.log(category);   // Output: Electronics (default used)
console.log(itemPrice);  // Output: 1200

// Nested destructuring
const { details: { brand, color: itemColor } } = product;
console.log(brand);     // Output: TechCo
console.log(itemColor); // Output: Silver

// Destructuring with rest syntax
const { id, name: productName, ...otherDetails } = product;
console.log(id);           // Output: P123
console.log(productName);  // Output: Laptop
console.log(otherDetails); // Output: { price: 1200, details: { brand: 'TechCo', color: 'Silver' }, inStock: true }

// Destructuring in function parameters (very common in React/RN)
function displayUser({ firstName, age = 18 }) {
  console.log(`User: ${firstName}, Age: ${age}`);
}

displayUser(user); // Output: User: Alice, Age: 31
```

**In React Native:** Destructuring is heavily used to extract props within components.

```jsx
// Instead of: props.title, props.onPress
const MyButton = ({ title, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

---

## Spread Syntax (`...`) for Objects (ES2018+)

The spread syntax allows an iterable like an object expression to be expanded in places where zero or more key-value pairs are expected.

**Uses:**

1.  **Creating Shallow Copies:**
    ```javascript
    const originalUser = { name: "Bob", age: 40 };
    const userCopy = { ...originalUser };

    console.log(userCopy);     // Output: { name: 'Bob', age: 40 }
    console.log(userCopy === originalUser); // Output: false (different objects)

    userCopy.age = 41;
    console.log(originalUser.age); // Output: 40 (original is unaffected)
    ```
    *Note: This is a shallow copy. Nested objects within `originalUser` would still be references shared between `originalUser` and `userCopy`.*

2.  **Merging Objects:** Properties from later objects overwrite earlier ones if keys clash.
    ```javascript
    const defaults = { theme: "light", notifications: true };
    const userSettings = { notifications: false, timezone: "UTC" };

    const finalSettings = { ...defaults, ...userSettings, userId: "U456" };
    console.log(finalSettings);
    // Output: { theme: 'light', notifications: false, timezone: 'UTC', userId: 'U456' }
    ```

3.  **Passing props:** Spreading props onto a component.
    ```jsx
    const buttonProps = {
      title: "Submit",
      color: "#007bff",
      disabled: false
    };

    // In a component:
    // return <Button {...buttonProps} onPress={handleSubmit} />;
    ```

**In React Native:** Often used for merging style objects or updating state immutably.

```javascript
// Merging styles
// const combinedStyle = { ...styles.base, ...styles.warning };

// Updating state immutably (common pattern before hooks, still relevant)
/*
this.setState(prevState => ({
  user: {
    ...prevState.user, // Copy existing user properties
    isOnline: true     // Overwrite or add isOnline
  }
}));
*/
```

---

**Conclusion**

Objects are versatile data structures in JavaScript, essential for grouping related data and functionality. Object literals provide a straightforward creation syntax. Dot and bracket notation allow access and modification. Destructuring offers a powerful way to extract data, while the spread syntax simplifies copying and merging objects. These features are heavily utilized in React Native for managing props, state, styles, and component logic.

**Further Reading:**

*   MDN: [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
*   MDN: [Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
*   MDN: [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)
*   MDN: [Method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)
*   MDN: [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
*   MDN: [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
*   React Docs: [Components and Props](https://react.dev/learn/passing-props-to-a-component)

**Next:** [Module 7: Arrays](./07-arrays.md) 