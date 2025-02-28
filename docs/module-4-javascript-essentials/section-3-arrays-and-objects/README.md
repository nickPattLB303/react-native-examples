# Section 3: Arrays and Objects

## Learning Objectives
After completing this section, you will be able to:
- Create and manipulate arrays using modern array methods
- Work with objects and access their properties
- Use object destructuring to extract values efficiently
- Apply the spread operator for arrays and objects
- Implement array transformation methods like map, filter, and reduce
- Create complex data structures combining arrays and objects
- Understand immutability concepts for React Native state management

**Estimated Time**: 45-60 minutes

## Arrays in JavaScript

Arrays are ordered collections of values that are fundamental to handling lists of data in React Native applications.

### Array Creation and Access

```javascript
// Array creation
const medications = ["Aspirin", "Lisinopril", "Metformin"];

// Accessing elements (zero-based indexing)
console.log(medications[0]); // "Aspirin"
console.log(medications[2]); // "Metformin"

// Array length
console.log(medications.length); // 3

// Modifying elements
medications[1] = "Ibuprofen";
console.log(medications); // ["Aspirin", "Ibuprofen", "Metformin"]
```

### Array Methods

JavaScript arrays have many built-in methods that make data manipulation easier:

#### Adding and Removing Elements

```javascript
const prescriptions = ["Aspirin", "Lisinopril"];

// Adding elements
prescriptions.push("Metformin");       // Adds to the end
console.log(prescriptions);            // ["Aspirin", "Lisinopril", "Metformin"]

prescriptions.unshift("Simvastatin");  // Adds to the beginning
console.log(prescriptions);            // ["Simvastatin", "Aspirin", "Lisinopril", "Metformin"]

// Removing elements
const last = prescriptions.pop();      // Removes from the end
console.log(last);                     // "Metformin"
console.log(prescriptions);            // ["Simvastatin", "Aspirin", "Lisinopril"]

const first = prescriptions.shift();   // Removes from the beginning
console.log(first);                    // "Simvastatin"
console.log(prescriptions);            // ["Aspirin", "Lisinopril"]

// Inserting or removing at specific positions
prescriptions.splice(1, 0, "Amlodipine"); // Insert at index 1, delete 0 elements
console.log(prescriptions);            // ["Aspirin", "Amlodipine", "Lisinopril"]

prescriptions.splice(0, 1);            // Remove 1 element starting at index 0
console.log(prescriptions);            // ["Amlodipine", "Lisinopril"]
```

> 💡 **React Native Tip**: When working with state in React Native, avoid methods like `push`, `pop`, `shift`, and `unshift` as they mutate the original array. Instead, use non-mutating approaches with the spread operator to maintain immutability.

#### Finding Elements

```javascript
const medications = [
  { id: 1, name: "Aspirin", type: "pain" },
  { id: 2, name: "Amoxicillin", type: "antibiotic" },
  { id: 3, name: "Lisinopril", type: "blood pressure" }
];

// Find an exact match
const pain = medications.find(med => med.type === "pain");
console.log(pain); // { id: 1, name: "Aspirin", type: "pain" }

// Check if an element exists
const hasAntibiotic = medications.some(med => med.type === "antibiotic");
console.log(hasAntibiotic); // true

// Find index of an element
const index = medications.findIndex(med => med.name === "Lisinopril");
console.log(index); // 2
```

### Array Transformation Methods

These methods are crucial for React Native development as they support the functional programming paradigm and immutability principles:

#### map()

Creates a new array by transforming each element:

```javascript
const medicationNames = medications.map(med => med.name);
console.log(medicationNames); // ["Aspirin", "Amoxicillin", "Lisinopril"]

// More complex transformation
const medicationInfo = medications.map(med => {
  return {
    label: med.name,
    description: `${med.name} (${med.type})`,
    key: med.id.toString()
  };
});
```

> 💡 **React Native Tip**: `map()` is extensively used in React Native to render lists of components from arrays of data. The `key` property is essential for efficient rendering.

#### filter()

Creates a new array with elements that pass a test:

```javascript
const nonPainMeds = medications.filter(med => med.type !== "pain");
console.log(nonPainMeds.length); // 2

// Combining filter and map
const antibioticNames = medications
  .filter(med => med.type === "antibiotic")
  .map(med => med.name);
console.log(antibioticNames); // ["Amoxicillin"]
```

#### reduce()

Accumulates array values into a single result:

```javascript
const medicationTypes = medications.reduce((types, med) => {
  if (!types.includes(med.type)) {
    types.push(med.type);
  }
  return types;
}, []);
console.log(medicationTypes); // ["pain", "antibiotic", "blood pressure"]

// More complex example: Grouping by type
const groupedByType = medications.reduce((groups, med) => {
  const type = med.type;
  if (!groups[type]) {
    groups[type] = [];
  }
  groups[type].push(med);
  return groups;
}, {});

console.log(groupedByType.pain); // [{ id: 1, name: "Aspirin", type: "pain" }]
```

#### sort()

Sorts array elements in place:

```javascript
// Warning: sort() mutates the original array
const medNames = [...medicationNames]; // Create a copy first
medNames.sort();
console.log(medNames); // ["Amoxicillin", "Aspirin", "Lisinopril"] (alphabetical)

// Sorting objects
medications.sort((a, b) => a.name.localeCompare(b.name));

// Sort by numeric value
const doses = [10, 5, 25, 15];
doses.sort((a, b) => a - b);
console.log(doses); // [5, 10, 15, 25]
```

> ⚠️ **Warning**: `sort()` mutates the original array, which can cause issues in React Native state management. Always create a copy of the array before sorting.

### Array Spread Operator

The spread operator (`...`) allows for powerful array manipulations:

```javascript
const morningMeds = ["Lisinopril", "Vitamin D"];
const eveningMeds = ["Aspirin", "Simvastatin"];

// Combine arrays without mutating originals
const allMeds = [...morningMeds, ...eveningMeds];
console.log(allMeds); // ["Lisinopril", "Vitamin D", "Aspirin", "Simvastatin"]

// Create a copy of an array
const medsCopy = [...morningMeds];

// Add elements without mutating original
const updatedMorningMeds = [...morningMeds, "Fish Oil"];
console.log(updatedMorningMeds); // ["Lisinopril", "Vitamin D", "Fish Oil"]
console.log(morningMeds); // ["Lisinopril", "Vitamin D"] (unchanged)

// Insert in the middle
const withInsert = [
  ...allMeds.slice(0, 2),
  "Metformin",
  ...allMeds.slice(2)
];
```

## Objects in JavaScript

Objects are collections of key-value pairs that are essential for representing structured data in React Native apps.

### Object Creation and Access

```javascript
// Object literal
const medication = {
  id: 1,
  name: "Aspirin",
  dosage: "81mg",
  frequency: "once daily",
  instructions: "Take with food"
};

// Accessing properties
console.log(medication.name); // "Aspirin"
console.log(medication["dosage"]); // "81mg" (bracket notation)

// Adding new properties
medication.refills = 3;
console.log(medication.refills); // 3

// Modifying properties
medication.dosage = "325mg";
console.log(medication.dosage); // "325mg"

// Checking if a property exists
console.log("instructions" in medication); // true
console.log(medication.hasOwnProperty("price")); // false
```

### Object Methods

Objects can contain functions as properties, known as methods:

```javascript
const patient = {
  firstName: "John",
  lastName: "Doe",
  age: 45,
  medications: ["Aspirin", "Lisinopril"],
  
  // Method
  getFullName: function() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  // ES6 method shorthand
  getAge() {
    return this.age;
  },
  
  // Arrow function (careful with 'this')
  getMedications: () => {
    // Warning: 'this' doesn't refer to patient object in arrow functions
    return patient.medications.join(", ");
  }
};

console.log(patient.getFullName()); // "John Doe"
console.log(patient.getMedications()); // "Aspirin, Lisinopril"
```

### Object Destructuring

Object destructuring allows you to extract properties into variables concisely:

```javascript
const { name, dosage, instructions } = medication;
console.log(name); // "Aspirin"
console.log(instructions); // "Take with food"

// Destructuring with new variable names
const { name: medicationName, dosage: medicationDosage } = medication;
console.log(medicationName); // "Aspirin"

// Destructuring with default values
const { price = "Not specified" } = medication;
console.log(price); // "Not specified"

// Nested destructuring
const prescription = {
  medication: {
    name: "Lisinopril",
    dosage: "10mg"
  },
  patient: {
    id: "P12345",
    name: "Jane Smith"
  }
};

const { medication: { name: medName }, patient: { name: patientName } } = prescription;
console.log(medName); // "Lisinopril"
console.log(patientName); // "Jane Smith"
```

> 💡 **React Native Tip**: Destructuring is extensively used in React Native functional components to extract props and state values.

### Object Spread Operator

The spread operator works with objects too:

```javascript
// Creating a copy of an object
const medicationCopy = { ...medication };

// Merging objects
const baseInfo = { name: "Aspirin", dosage: "325mg" };
const details = { frequency: "twice daily", instructions: "Take with food" };

const completeInfo = { ...baseInfo, ...details };
console.log(completeInfo); 
// { name: "Aspirin", dosage: "325mg", frequency: "twice daily", instructions: "Take with food" }

// Overriding properties
const updatedInfo = { ...baseInfo, dosage: "81mg" };
console.log(updatedInfo); // { name: "Aspirin", dosage: "81mg" }

// Creating a new object with additional properties
const medicationWithId = { id: 123, ...baseInfo };
```

> 💡 **React Native Tip**: Object spread is invaluable for state updates in React Native:
> ```javascript
> this.setState(prevState => ({ ...prevState, count: prevState.count + 1 }));
> // or with hooks
> setMedication(prev => ({ ...prev, dosage: "81mg" }));
> ```

### Computed Property Names

ES6 introduced the ability to use expressions as property names:

```javascript
const propertyName = "dosageInfo";
const timeOfDay = "evening";

const medicationSchedule = {
  name: "Simvastatin",
  [propertyName]: "40mg",
  [`${timeOfDay}Dose`]: true
};

console.log(medicationSchedule.dosageInfo); // "40mg"
console.log(medicationSchedule.eveningDose); // true
```

## Working with Arrays of Objects

Arrays of objects are a common data structure in React Native applications:

```javascript
const medicationList = [
  { id: 1, name: "Aspirin", type: "pain", dosage: "325mg" },
  { id: 2, name: "Lisinopril", type: "blood pressure", dosage: "10mg" },
  { id: 3, name: "Metformin", type: "diabetes", dosage: "500mg" }
];

// Finding a specific medication
const diabetes = medicationList.find(med => med.type === "diabetes");

// Creating a new array with modified objects
const updatedList = medicationList.map(med => {
  if (med.id === 2) {
    return { ...med, dosage: "20mg" };
  }
  return med;
});

// Adding a new medication (immutably)
const newMed = { id: 4, name: "Simvastatin", type: "cholesterol", dosage: "20mg" };
const extendedList = [...medicationList, newMed];

// Removing a medication (immutably)
const filteredList = medicationList.filter(med => med.id !== 1);

// Updating all medications with a new property
const withInstructions = medicationList.map(med => ({
  ...med,
  instructions: `Take ${med.name} as directed`
}));
```

## Object and Array Immutability

In React Native, maintaining immutability when updating state is essential for correct functioning:

```javascript
// ❌ Incorrect way to update state (mutating)
const updateMedicationDosage = (medications, id, newDosage) => {
  const med = medications.find(m => m.id === id);
  med.dosage = newDosage; // Mutation! Bad for React Native
  return medications; // Same array reference
};

// ✅ Correct way (creating new objects/arrays)
const updateMedicationDosageCorrectly = (medications, id, newDosage) => {
  return medications.map(med => {
    if (med.id === id) {
      return { ...med, dosage: newDosage }; // New object
    }
    return med;
  });
};

// Example usage in a React Native component:
const updateMedication = (id, newDosage) => {
  setMedications(prevMeds => updateMedicationDosageCorrectly(prevMeds, id, newDosage));
};
```

## Complex Data Transformations

Real-world React Native applications often require complex data transformations:

```javascript
const patientData = {
  id: "P12345",
  name: "John Doe",
  medications: [
    { id: 1, name: "Aspirin", type: "pain", dosage: "325mg", times: ["morning"] },
    { id: 2, name: "Lisinopril", type: "blood pressure", dosage: "10mg", times: ["morning"] },
    { id: 3, name: "Simvastatin", type: "cholesterol", dosage: "20mg", times: ["evening"] }
  ]
};

// Group medications by time of day
const medicationsByTime = patientData.medications.reduce((schedule, med) => {
  med.times.forEach(time => {
    if (!schedule[time]) {
      schedule[time] = [];
    }
    schedule[time].push(med);
  });
  return schedule;
}, {});

console.log(medicationsByTime.morning.length); // 2
console.log(medicationsByTime.evening.length); // 1

// Create a medication schedule
const medicationSchedule = Object.entries(medicationsByTime).map(([time, meds]) => {
  return {
    timeOfDay: time,
    medications: meds.map(med => ({
      name: med.name,
      dosage: med.dosage,
      instructions: `Take ${med.dosage} of ${med.name}`
    }))
  };
});

console.log(medicationSchedule[0].timeOfDay); // "morning"
console.log(medicationSchedule[0].medications.length); // 2
```

## Exercises

### Exercise 1: Medication List Transformations
Work with an array of medication objects to:
- Filter medications by type
- Sort medications by name
- Calculate the total number of pills per day based on frequency
- Transform the data for display in a React Native component

### Exercise 2: Patient Record Management
Create functions to:
- Add a new medication to a patient's record (immutably)
- Update a medication's dosage (immutably)
- Remove a medication from a patient's record (immutably)
- Merge information from multiple patient records

### Exercise 3: Medication Schedule Builder
Build a function that:
- Takes a patient's medication list
- Groups medications by time of day
- Calculates intervals between doses
- Produces a formatted schedule object ready for a React Native component to display

## Key Takeaways

- Arrays and objects are the fundamental data structures in JavaScript and React Native
- Modern array methods like `map`, `filter`, and `reduce` enable powerful transformations
- Object destructuring and spread operators make code more readable and maintainable
- Immutability is crucial when working with React Native state
- Complex data structures (arrays of objects) form the basis of most React Native applications
- Transforming data into the right format for your components improves code organization 