# Section 2: Functions and Scope

## Learning Objectives
After completing this section, you will be able to:
- Declare and use functions using different syntax forms
- Differentiate between function declarations, expressions, and arrow functions
- Understand and manage variable scope and closure
- Explain execution context and the 'this' keyword in different contexts
- Apply default parameters and rest/spread operators
- Implement higher-order functions and callbacks
- Create clean, reusable function components for React Native

**Estimated Time**: 45-60 minutes

## Functions in JavaScript

Functions are one of the most important concepts in JavaScript, especially for React Native development. They allow you to:

- Create reusable blocks of code
- Encapsulate logic
- Create components (React components are essentially functions)
- Implement event handlers
- Manage side effects

Let's explore the different ways to create and use functions in JavaScript.

## Function Declarations

The most traditional way to create a function:

```javascript
function calculateDosage(weight, age) {
  const baseDosage = weight * 0.1;
  const ageFactor = age < 18 ? 0.8 : 1;
  return baseDosage * ageFactor;
}

// Calling the function
const dosage = calculateDosage(70, 35); // 7
```

### Key characteristics:
- Hoisted (can be called before declaration in code)
- Has a name that can be used for recursion
- Creates a new 'this' context

## Function Expressions

Functions can also be assigned to variables:

```javascript
const calculateDosage = function(weight, age) {
  const baseDosage = weight * 0.1;
  const ageFactor = age < 18 ? 0.8 : 1;
  return baseDosage * ageFactor;
};

// Calling the function
const dosage = calculateDosage(70, 35); // 7
```

### Key characteristics:
- Not hoisted (must be defined before use)
- Anonymous (though can be named for recursion)
- Creates a new 'this' context

## Arrow Functions (ES6+)

A more concise syntax introduced in ES6:

```javascript
const calculateDosage = (weight, age) => {
  const baseDosage = weight * 0.1;
  const ageFactor = age < 18 ? 0.8 : 1;
  return baseDosage * ageFactor;
};

// Shorter version for simple functions
const simpleCalculation = weight => weight * 0.1;

// Implicit return for one-liners
const adultDosage = weight => weight * 0.1;
```

### Key characteristics:
- More concise syntax
- No 'this' binding (inherits 'this' from parent scope)
- No 'arguments' object
- Cannot be used as constructors
- Great for callbacks and React component functions

> 💡 **React Native Tip**: Arrow functions are commonly used in React Native, especially for event handlers and small functional components.

## Parameters and Arguments

### Default Parameters

ES6 introduced default parameter values:

```javascript
function medicationSchedule(medName, doseCount = 3, instructions = "Take with water") {
  return `${medName}: Take ${doseCount} times daily. ${instructions}`;
}

// Using default parameters
console.log(medicationSchedule("Aspirin")); 
// "Aspirin: Take 3 times daily. Take with water"

// Overriding default parameters
console.log(medicationSchedule("Ibuprofen", 2, "Take after meals"));
// "Ibuprofen: Take 2 times daily. Take after meals"
```

### Rest Parameters

The rest parameter syntax allows handling multiple arguments as an array:

```javascript
function listMedications(patientName, ...medications) {
  return `${patientName}'s medications: ${medications.join(", ")}`;
}

console.log(listMedications("John", "Aspirin", "Lisinopril", "Metformin"));
// "John's medications: Aspirin, Lisinopril, Metformin"
```

## Variable Scope

JavaScript has different types of scope that determine where variables can be accessed:

### Global Scope

Variables declared outside any function or block:

```javascript
const hospitalName = "General Hospital"; // Global scope

function getPatientInfo() {
  return `Patient at ${hospitalName}`; // hospitalName is accessible here
}
```

> ⚠️ **Warning**: Avoid global variables in React Native applications as they can lead to naming conflicts and unpredictable behavior.

### Function Scope

Variables declared within a function:

```javascript
function calculateMedicationDays() {
  const pillsPerDay = 3; // Function scoped
  const totalPills = 90;
  return totalPills / pillsPerDay;
}

// pillsPerDay is not accessible here
// console.log(pillsPerDay); // ReferenceError
```

### Block Scope

Variables declared with `let` and `const` are block-scoped:

```javascript
if (patientAge > 18) {
  const adultDosage = weightKg * 0.1; // Block scoped
  console.log(`Adult dosage: ${adultDosage}mg`);
} 

// adultDosage is not accessible here
// console.log(adultDosage); // ReferenceError
```

## Closures

Closures occur when a function "remembers" its lexical scope even when executed outside that scope:

```javascript
function createMedicationTracker(medicationName) {
  let count = 0; // This variable is "enclosed" in the returned function
  
  return function() {
    count++;
    return `${medicationName}: Taken ${count} times`;
  };
}

const trackAspirin = createMedicationTracker("Aspirin");
console.log(trackAspirin()); // "Aspirin: Taken 1 times"
console.log(trackAspirin()); // "Aspirin: Taken 2 times"

const trackLisinopril = createMedicationTracker("Lisinopril");
console.log(trackLisinopril()); // "Lisinopril: Taken 1 times"
```

Closures are particularly useful in React Native for:
- Creating custom hooks
- Managing state in functional components
- Creating event handlers that remember values

## The 'this' Keyword

The `this` keyword in JavaScript refers to the execution context of a function, which can vary depending on how the function is called:

### 'this' in Regular Functions

```javascript
const patient = {
  name: "John",
  medications: ["Aspirin", "Lisinopril"],
  listMedications: function() {
    console.log(`${this.name}'s medications:`);
    
    // 'this' in callback function loses context
    this.medications.forEach(function(med) {
      console.log(`${this.name} takes ${med}`); // 'this' is undefined or global
    });
  },
  
  // Solution with arrow function
  listMedicationsCorrectly: function() {
    console.log(`${this.name}'s medications:`);
    
    // Arrow function preserves 'this' from outer scope
    this.medications.forEach(med => {
      console.log(`${this.name} takes ${med}`); // 'this' is the patient object
    });
  }
};
```

> 💡 **React Native Tip**: In React Native, 'this' binding is a common source of confusion in class components. Using arrow functions for event handlers or manually binding in the constructor helps prevent 'this' context issues.

## Higher-Order Functions

Higher-order functions either take a function as an argument or return a function. They are fundamental to functional programming and React:

```javascript
// Function that returns a function
function medicationDosageCalculator(baseMultiplier) {
  return function(weight) {
    return weight * baseMultiplier;
  };
}

const childDosage = medicationDosageCalculator(0.05);
const adultDosage = medicationDosageCalculator(0.1);

console.log(childDosage(30)); // 1.5
console.log(adultDosage(70)); // 7

// Function that takes a function as an argument
function processMedications(medications, filterFn) {
  return medications.filter(filterFn);
}

const allMeds = [
  { name: "Aspirin", type: "pain" },
  { name: "Amoxicillin", type: "antibiotic" },
  { name: "Lisinopril", type: "blood pressure" }
];

const painMeds = processMedications(allMeds, med => med.type === "pain");
```

React Native heavily uses higher-order components and hooks, which are based on these higher-order function concepts.

## Immediately Invoked Function Expressions (IIFE)

An IIFE is a function that runs as soon as it is defined:

```javascript
(function() {
  const privateData = "Sensitive patient information";
  console.log("IIFE executed");
})();

// ES6 arrow function IIFE
(() => {
  const medicationDatabase = { /* ... */ };
  console.log("Initialized medication database");
})();
```

IIFEs are useful for creating private scopes and avoiding global namespace pollution.

## Functions in React Native

In React Native, functions are used extensively:

```javascript
// Functional component
const MedicationItem = ({ name, dosage, instructions }) => {
  // Event handler function
  const handlePress = () => {
    console.log(`Selected medication: ${name}`);
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{name}</Text>
      <Text>{dosage}</Text>
      <Text>{instructions}</Text>
    </TouchableOpacity>
  );
};

// Higher-order component example
const withPatientData = (Component) => {
  return (props) => {
    const [patientData, setPatientData] = useState(null);
    
    useEffect(() => {
      // Fetch patient data
      fetchPatientData().then(data => setPatientData(data));
    }, []);
    
    return <Component {...props} patientData={patientData} />;
  };
};

const PatientMedications = withPatientData(MedicationList);
```

## Exercises

### Exercise 1: Function Transformations
Convert between different function types:
- Take a function declaration and rewrite it as a function expression
- Convert a function expression to an arrow function
- Identify which transformations change the behavior of 'this'

### Exercise 2: Closures for Medication Tracking
Create a closure-based medication tracker that:
- Keeps track of doses taken
- Records when doses were taken
- Calculates time until next dose
- Alerts when medication adherence is poor

### Exercise 3: Higher-Order Functions
Implement a medication filtering system using higher-order functions:
- Filter by medication type
- Sort by time of day
- Map medication data to display format
- Chain multiple operations together

## Key Takeaways

- Functions are first-class citizens in JavaScript and essential for React Native
- Arrow functions provide concise syntax and lexical 'this' binding
- Understanding scope is critical for managing variable access
- Closures enable powerful patterns for state management
- Higher-order functions allow for code reuse and composition
- React Native components are essentially functions that return UI elements
- ES6+ features like default parameters and rest/spread enhance function flexibility 