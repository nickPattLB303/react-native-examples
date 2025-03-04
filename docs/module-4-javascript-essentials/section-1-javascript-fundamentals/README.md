# Section 1: JavaScript Fundamentals

## Learning Objectives
After completing this section, you will be able to:
- Explain JavaScript's role in React Native development
- Work with JavaScript variables, data types, and operators
- Understand type coercion and equality in JavaScript
- Implement conditional statements and loops
- Use template literals for string manipulation
- Handle errors with try/catch blocks
- Implement modern variable declarations with let and const

**Estimated Time**: 45-60 minutes

## JavaScript: The Foundation of React Native

JavaScript is the programming language used to build React Native applications. Understanding JavaScript fundamentals is essential for React Native development because:

- **React Native components are written in JavaScript**: All your UI components, business logic, and application behavior will be implemented in JavaScript.
- **Modern JavaScript features enhance productivity**: ES6+ features make your code more concise, readable, and maintainable.
- **React itself is a JavaScript library**: React's component model and hooks are built on JavaScript concepts.

## Variables and Data Types

### Variable Declarations

JavaScript offers three ways to declare variables:

```jsx
// var - function scoped (older, less recommended)
var patientName = "John Doe";

// let - block scoped, can be reassigned
let medicationCount = 3;
medicationCount = 4; // Valid reassignment

// const - block scoped, cannot be reassigned
const patientId = "P12345";
// patientId = "P67890"; // This would cause an error
```

When working with React Native, prefer:
- `const` for values that won't change (most variables)
- `let` only when you need to reassign a variable

### Primitive Data Types

JavaScript has seven primitive data types:

```jsx
// String
const medicationName = "Aspirin";

// Number
const dosage = 500; // No distinction between integers and floats
const pillCount = 30.5;

// Boolean
const isRefillNeeded = true;

// Undefined
let nextAppointment; // Declared but not assigned a value
console.log(nextAppointment); // undefined

// Null
const allergyInfo = null; // Explicitly set to no value

// Symbol (less common in React Native)
const uniqueId = Symbol("id");

// BigInt (for very large numbers, less common in React Native)
const largeNumber = 9007199254740991n;
```

### Non-Primitive Data Types

The main non-primitive type in JavaScript is Object, which includes arrays and functions:

```jsx
// Object
const medication = {
  name: "Aspirin",
  dosage: 500,
  instructions: "Take with food"
};

// Array
const medications = ["Aspirin", "Ibuprofen", "Paracetamol"];

// Function (more details in Section 2)
function calculateDosage(weight, age) {
  return weight * 0.1 * (age > 12 ? 1 : 0.5);
}
```

## Operators and Expressions

### Arithmetic Operators

```jsx
const a = 10;
const b = 3;

console.log(a + b);  // 13 (Addition)
console.log(a - b);  // 7 (Subtraction)
console.log(a * b);  // 30 (Multiplication)
console.log(a / b);  // 3.3333... (Division)
console.log(a % b);  // 1 (Modulus/Remainder)
console.log(a ** b); // 1000 (Exponentiation)
```

### Comparison Operators

```jsx
console.log(a > b);   // true (Greater than)
console.log(a < b);   // false (Less than)
console.log(a >= 10); // true (Greater than or equal)
console.log(b <= 3);  // true (Less than or equal)

// Equality operators
console.log(a == "10");  // true (Equal value, loose equality)
console.log(a === "10"); // false (Equal value and type, strict equality)
console.log(a != "10");  // false (Not equal value)
console.log(a !== "10"); // true (Not equal value or type)
```

> 💡 **Best Practice**: Always use strict equality (`===` and `!==`) in React Native development to avoid unexpected type coercion issues.

### Logical Operators

```jsx
const hasInsurance = true;
const needsPrescription = false;

console.log(hasInsurance && needsPrescription); // false (Logical AND)
console.log(hasInsurance || needsPrescription); // true (Logical OR)
console.log(!hasInsurance); // false (Logical NOT)

// Short-circuit evaluation
const coverage = hasInsurance && "Full coverage"; // "Full coverage"
const status = needsPrescription || "Over the counter"; // "Over the counter"
```

## Control Flow

### Conditional Statements

```jsx
// if-else statement
if (patientAge >= 18) {
  console.log("Adult dosage");
} else if (patientAge >= 12) {
  console.log("Teen dosage");
} else {
  console.log("Child dosage");
}

// Ternary operator (common in React Native JSX)
const dosageType = patientAge >= 18 ? "Adult" : "Child";

// Switch statement
switch (medicationCategory) {
  case "antibiotic":
    console.log("Take full course as prescribed");
    break;
  case "painkiller":
    console.log("Take as needed");
    break;
  case "vitamin":
    console.log("Take daily with food");
    break;
  default:
    console.log("Follow prescription instructions");
}
```

### Loops

```jsx
// for loop
for (let i = 0; i < medications.length; i++) {
  console.log(`Medication ${i+1}: ${medications[i]}`);
}

// for...of (iterating over array values)
for (const med of medications) {
  console.log(`Take ${med} as prescribed`);
}

// for...in (iterating over object properties - less common in React Native)
for (const key in medication) {
  console.log(`${key}: ${medication[key]}`);
}

// while loop
let daysLeft = 10;
while (daysLeft > 0) {
  console.log(`${daysLeft} days of medication left`);
  daysLeft--;
}

// do...while loop
let pillsToTake = 3;
do {
  console.log("Taking pill...");
  pillsToTake--;
} while (pillsToTake > 0);
```

## Template Literals

Template literals (introduced in ES6) allow for more readable string concatenation and multiline strings:

```jsx
const patient = "Jane";
const medName = "Lisinopril";
const dose = "10mg";

// Old way
const instruction = patient + " should take " + dose + " of " + medName + " daily.";

// Template literals
const betterInstruction = `${patient} should take ${dose} of ${medName} daily.`;

// Multiline strings
const fullInstructions = `
  Medication: ${medName}
  Dosage: ${dose}
  Patient: ${patient}
  Instructions: Take once daily with food
  Refills: 3
`;
```

## Error Handling

Error handling is crucial for robust applications:

```jsx
try {
  // Code that might throw an error
  const response = fetchPatientMedications(patientId);
  displayMedications(response);
} catch (error) {
  // Handle the error
  console.error("Failed to fetch medications:", error.message);
  showErrorMessage("Unable to load medications. Please try again later.");
} finally {
  // This will run regardless of success or failure
  hideLoadingIndicator();
}
```

## Type Coercion and Equality

JavaScript performs automatic type conversion in certain contexts, which can sometimes lead to unexpected results:

```jsx
console.log("5" + 3);      // "53" (string concatenation)
console.log("5" - 3);      // 2 (numeric subtraction)
console.log("5" == 5);     // true (loose equality with type coercion)
console.log("5" === 5);    // false (strict equality, no type coercion)
console.log(Boolean(""));  // false
console.log(Boolean("0")); // true
console.log(Boolean(0));   // false
```

> ⚠️ **Warning**: Type coercion can lead to bugs if not properly understood. Always use strict equality (`===`) in React Native code to avoid unintended type conversions.

## Exercises

### Exercise 1: Variable Declarations and Types
Create variables using `let` and `const` to track a patient's medication regimen:
- Patient information (name, age, patient ID)
- Medication details (name, dosage, times per day)
- Prescription status (active, expired)

### Exercise 2: Control Flow for Medication Instructions
Write a function that provides medication instructions based on:
- Medication type
- Time of day
- Food requirements (before/after meals)
- Patient age

### Exercise 3: Error Handling in a Medication Calculator
Create a function that calculates proper dosage based on patient weight with appropriate error handling for:
- Missing weight information
- Out of range values
- Incorrect data types

## Key Takeaways

- JavaScript is the foundation of React Native development
- Use `const` by default and `let` when variables need to be reassigned
- Understand the difference between primitive types and objects
- Always use strict equality (`===`) to avoid type coercion issues
- Template literals simplify string concatenation and formatting
- Proper error handling improves application reliability
- Modern JavaScript features (ES6+) make your code more maintainable 