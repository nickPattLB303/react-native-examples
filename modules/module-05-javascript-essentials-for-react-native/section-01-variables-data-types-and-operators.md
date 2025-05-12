## Section 1: Variables, Data Types, and Operators (ES6+ Focus: `let`, `const`)

Welcome to the foundational concepts of JavaScript! Variables, data types, and operators are the basic building blocks you'll use in every JavaScript program, including your React Native applications. Understanding them thoroughly is key to writing effective and bug-free code.

### Variables

In JavaScript, a variable is a named container for storing data values. Think of it as a label you can attach to a value, allowing you to refer to and manipulate that value throughout your code. In modern JavaScript (ES6 and later), we primarily use `let` and `const` to declare variables.

#### `let`

The `let` keyword declares a block-scoped local variable, optionally initializing it to a value. Block scope means the variable is only accessible within the block of code (typically defined by curly braces `{}`) where it is declared.

- **Re-assignable:** You can change the value of a `let` variable after it's declared.
- **Block-scoped:** Accessible only within the block it's defined in.

This example demonstrates declaring and re-assigning a `let` variable:

```javascript
let patientName = "John Doe";
console.log(patientName); // Output: John Doe

patientName = "Jane Smith"; // Value can be changed
console.log(patientName); // Output: Jane Smith

if (true) {
  let age = 30; // age is block-scoped to this if-block
  console.log(age); // Output: 30
}
// console.log(age); // This would cause an error: age is not defined outside the block
```

#### `const`

The `const` keyword declares a block-scoped local variable, similar to `let`, but with a crucial difference: its value cannot be reassigned after declaration. This makes `const` ideal for values that you know shouldn't change, promoting code predictability and preventing accidental modifications.

- **Not Re-assignable (for primitive types):** Once a primitive value is assigned to a `const` variable, it cannot be changed.
- **Block-scoped:** Accessible only within the block it's defined in.
- **Must be initialized:** You must assign a value when you declare a `const` variable.

```javascript
const birthYear = 1990;
console.log(birthYear); // Output: 1990
// birthYear = 1991; // This would cause an error: Assignment to constant variable.

const PI = 3.14159;
// PI = 3.14; // Error!
```

> [!IMPORTANT]
> When `const` is used with objects or arrays, the variable still cannot be reassigned to a _new_ object or array. However, the _contents_ of the object (its properties) or the array (its elements) can still be modified. We'll explore objects and arrays in detail later in this module.

```javascript
const medicationDetails = {
  name: "Lisinopril",
  dosage: "10mg",
};

// We can change a property of the object
medicationDetails.dosage = "20mg";
console.log(medicationDetails.dosage); // Output: 20mg

// But we cannot reassign medicationDetails to a new object
// medicationDetails = { name: 'Amoxicillin', dosage: '250mg' }; // This would cause an error
```

#### What about `var`?

You might encounter `var` in older JavaScript code. `var` declares variables that are function-scoped or globally-scoped, and they are hoisted (moved to the top of their scope during compilation). This behavior can sometimes lead to confusion. Modern JavaScript development strongly favors `let` and `const` for their clearer block-scoping rules and improved predictability.

> [!NOTE]
> For this course, and in modern React Native development, you should primarily use `let` for variables whose values might change and `const` for variables whose values should remain constant.

### Data Types

JavaScript is a dynamically typed language. This means you don't have to explicitly declare the data type of a variable; the type is determined automatically at runtime based on the value assigned. JavaScript has several built-in data types.

#### Primitive Data Types

Primitive types are immutable, meaning their values cannot be changed once created. When you operate on a primitive value, you get a new value.

1.  **String:** Represents textual data. Strings are enclosed in single quotes (`'...'`), double quotes (`"..."`), or backticks (`` `...` ``).

    ```javascript
    let pharmacyName = "SpeedyMeds Pharmacy";
    let greeting = "Welcome to " + pharmacyName;
    let message = `Order ready for ${patientName}`;
    console.log(message); // Example Output: Order ready for Jane Smith
    ```

    Backticks allow for template literals, which make embedding expressions in strings easier.

2.  **Number:** Represents both integer and floating-point numbers. Special numeric values include `Infinity`, `-Infinity`, and `NaN` (Not a Number).

    ```javascript
    let quantity = 100;
    let pricePerUnit = 1.25;
    let totalCost = quantity * pricePerUnit;
    console.log(totalCost); // Output: 125

    let notANumber = 0 / 0;
    console.log(notANumber); // Output: NaN
    ```

3.  **Boolean:** Represents a logical entity and can have two values: `true` or `false`.

    ```javascript
    let isPrescriptionRequired = true;
    let isOverTheCounter = false;
    console.log(isPrescriptionRequired); // Output: true
    ```

4.  **Undefined:** A variable that has been declared but not yet assigned a value has the type `undefined`.

    ```javascript
    let deliveryAddress;
    console.log(deliveryAddress); // Output: undefined
    ```

5.  **Null:** Represents the intentional absence of any object value. It's often used to explicitly indicate that a variable holds no value.

    ```javascript
    let selectedMedication = null;
    // Later, this might be assigned an object: selectedMedication = { name: 'Ibuprofen', strength: '200mg' };
    console.log(selectedMedication); // Output: null
    ```

6.  **Symbol (ES6):** A unique and immutable primitive value that may be used as the key of an Object property. Symbols are less commonly used in everyday application logic but are useful for specific metaprogramming tasks.

    ```javascript
    const uniqueId = Symbol("patientRecordId");
    console.log(uniqueId.toString()); // Output: Symbol(patientRecordId)
    ```

7.  **BigInt (ES2020):** Represents whole numbers larger than 2<sup>53</sup> - 1, which is the largest number JavaScript can reliably represent with the `Number` type. You create a `BigInt` by appending `n` to the end of an integer or by calling the `BigInt()` constructor.
    ```javascript
    const veryLargeNumber = 9007199254740991n;
    const anotherLargeNumber = BigInt("9007199254740992");
    console.log(veryLargeNumber + 1n); // Output: 9007199254740992n
    ```

#### Non-Primitive Data Type

1.  **Object:** Represents a collection of key-value pairs (or properties). Objects are mutable, meaning their contents can be changed after creation. Functions and arrays are also types of objects in JavaScript.
    ```javascript
    let prescription = {
      patientId: "P1001",
      medication: "Atorvastatin",
      dosage: "40mg",
      refillsRemaining: 2,
    };
    console.log(prescription.medication); // Output: Atorvastatin
    ```
    We will cover objects in more detail in a later section.

### Operators

Operators are special symbols used to perform operations on operands (values and variables).

#### Assignment Operators

Assigns a value to its left operand based on the value of its right operand.

- `=` (Assignment): Assigns the value of the right operand to the left operand.
  `javascript
    let stockLevel = 50;
    stockLevel += 20; // equivalent to stockLevel = stockLevel + 20;
    console.log(stockLevel); // Output: 70
    `
  Other assignment operators include `+=`, `-=`, `*=`, `/=`, `%=`.

#### Arithmetic Operators

Perform arithmetic on numbers.

- `+` (Addition)
- `-` (Subtraction)
- `*` (Multiplication)
- `/` (Division)
- `%` (Modulus - remainder of division)
- `**` (Exponentiation - ES7)
- `++` (Increment)
- `--` (Decrement)

```javascript
let itemsInCart = 5;
itemsInCart++; // itemsInCart is now 6

let totalAmount = 120.75;
let discount = 10.5;
let finalAmount = totalAmount - discount;
console.log(finalAmount); // Output: 110.25

console.log(10 % 3); // Output: 1 (remainder of 10 divided by 3)
console.log(2 ** 3); // Output: 8 (2 to the power of 3)
```

#### Comparison Operators

Compare two operands and return a boolean value (`true` or `false`).

- `==` (Equal to - performs type coercion)
- `===` (Strictly equal to - no type coercion, compares value and type)
- `!=` (Not equal to - performs type coercion)
- `!==` (Strictly not equal to - no type coercion)
- `>` (Greater than)
- `<` (Less than)
- `>=` (Greater than or equal to)
- `<=` (Less than or equal to)

> [!IMPORTANT]
> Always prefer strict equality (`===`) and strict inequality (`!==`) operators over their loose counterparts (`==` and `!=`). Strict operators prevent unexpected behavior by not performing type coercion, meaning they check if both the value and the type are the same.

```javascript
let refillCount = 3;
console.log(refillCount === 3); // Output: true
console.log(refillCount === "3"); // Output: false (different types)
console.log(refillCount == "3"); // Output: true (type coercion happens)

let priceA = 15.0;
let priceB = 20.0;
console.log(priceA < priceB); // Output: true
```

#### Logical Operators

Perform logical operations, typically used with boolean values.

- `&&` (Logical AND): Returns `true` if both operands are true.
- `||` (Logical OR): Returns `true` if at least one operand is true.
- `!` (Logical NOT): Returns `true` if the operand is false, and vice versa.

```javascript
let hasValidPrescription = true;
let medicationInStock = false;

console.log(hasValidPrescription && medicationInStock); // Output: false
console.log(hasValidPrescription || medicationInStock); // Output: true
console.log(!medicationInStock); // Output: true
```

Logical operators can also work with non-boolean values (truthy/falsy values), often used for short-circuiting.

#### String Operators

- `+` (Concatenation): Joins two strings together.
  ```javascript
  let firstName = "Sarah";
  let lastName = "Connor";
  let fullName = firstName + " " + lastName;
  console.log(fullName); // Output: Sarah Connor
  ```

#### Ternary Operator

Also known as the conditional operator, it's a shorthand for an `if...else` statement.

- `condition ? exprIfTrue : exprIfFalse`

```javascript
let patientAge = 25;
let ageCategory = patientAge >= 18 ? "Adult" : "Pediatric";
console.log(ageCategory); // Output: Adult
```

#### Type Operators

- `typeof`: Returns a string indicating the type of an unevaluated operand.
  ```javascript
  let drugName = "Aspirin";
  let dosageMg = 100;
  console.log(typeof drugName); // Output: string
  console.log(typeof dosageMg); // Output: number
  console.log(typeof { id: 1 }); // Output: object
  console.log(typeof null); // Output: object (this is a known quirk in JavaScript)
  ```
- `instanceof`: Returns `true` if the specified object is an instance of the specified constructor or any of its ancestors.
  ```javascript
  let anArray = [1, 2, 3];
  let aDate = new Date();
  console.log(anArray instanceof Array); // Output: true
  console.log(aDate instanceof Date); // Output: true
  ```

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
> - [MDN Web Docs: `let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
> - [MDN Web Docs: `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
> - [MDN Web Docs: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

### Next Steps

Now that you have a grasp of variables, data types, and operators, you're ready to learn how to control the flow of your JavaScript programs. Proceed to [Section 2: Control Flow](./section-02-control-flow.md) to explore conditional statements and loops.
