## Section 4: Objects and Arrays

Objects and arrays are JavaScript's primary data structures for organizing and managing collections of data. Objects allow you to group related data and functionality using key-value pairs, while arrays provide ordered lists of items. Mastering their manipulation, including modern ES6+ features, is crucial for handling complex data in your React Native applications.

### Objects

An object is an unordered collection of key-value pairs, where keys are typically strings (or Symbols) and values can be any JavaScript data type, including other objects or functions (which are then called methods).

#### Creating Objects

- **Object Literals (most common):**

  ```javascript
  const medication = {
    name: "Lisinopril",
    dosageForm: "Tablet",
    strength: "10mg",
    quantityInStock: 500,
    getDetails: function () {
      return `${this.name} ${this.strength} - Stock: ${this.quantityInStock}`;
    },
  };
  ```

- **Using `new Object()`:** Less common for simple objects.
  ```javascript
  const patient = new Object();
  patient.id = "P7890";
  patient.name = "Eleanor Vance";
  ```

#### Accessing Properties

- **Dot Notation (`.`):** Used when the property key is a valid JavaScript identifier.

  ```javascript
  console.log(medication.name); // Output: Lisinopril
  console.log(medication.getDetails()); // Output: Lisinopril 10mg - Stock: 500
  ```

- **Bracket Notation (`[]`):** Required when the property key is dynamic (a variable), not a valid identifier (e.g., contains spaces or starts with a number), or when you want to use an expression to determine the property name.

  ```javascript
  let propertyToAccess = "dosageForm";
  console.log(medication[propertyToAccess]); // Output: Tablet

  const patientPreferences = {
    "contact method": "email",
    language: "English",
  };
  console.log(patientPreferences["contact method"]); // Output: email
  ```

#### Adding/Modifying/Deleting Properties

- **Adding or Updating:** Assign a value to a new or existing property using dot or bracket notation.

  ```javascript
  medication.lastRestocked = "2023-10-15"; // New property
  medication.quantityInStock = 450; // Updating existing property
  console.log(medication.lastRestocked); // Output: 2023-10-15
  ```

- **Deleting Properties:** Use the `delete` operator.
  ```javascript
  delete medication.lastRestocked;
  console.log(medication.lastRestocked); // Output: undefined
  ```

#### Computed Property Names (ES6)

Allows you to use an expression for a property key within an object literal.

```javascript
let propertyName = "dosageInstructions";
const prescriptionDetails = {
  medication: "Ibuprofen",
  [propertyName]: "Take with food",
  ["patient" + "Id"]: "P999",
};

console.log(prescriptionDetails.dosageInstructions); // Output: Take with food
console.log(prescriptionDetails.patientId); // Output: P999
```

#### Object Methods

When a function is a property of an object, it's called a method. Inside a method defined using the `function` keyword **or the ES6 method shorthand syntax**, `this` refers to the object the method is called on.

```javascript
const prescription = {
  medicationName: "Amoxicillin",
  patientName: "Carlos Ray",
  // Traditional method syntax
  displayLabel: function () {
    return `Med: ${this.medicationName}, Patient: ${this.patientName}`;
  },
  // ES6 method shorthand syntax
  updateMedication(newMedication) {
    this.medicationName = newMedication;
    console.log(`Medication updated to ${this.medicationName}`);
  },
};
console.log(prescription.displayLabel()); // Output: Med: Amoxicillin, Patient: Carlos Ray
prescription.updateMedication("Augmentin"); // Output: Medication updated to Augmentin
```

> [!NOTE]
> If you use an arrow function for an object method, `this` will not refer to the object itself but will be inherited from the surrounding (lexical) scope. For object methods where you need to access the object's properties via `this`, traditional function expressions are generally preferred.

#### Common `Object` Static Methods

These are methods called on the `Object` constructor itself:

- `Object.keys(obj)`: Returns an array of a given object's own enumerable property **names** (keys).
- `Object.values(obj)`: Returns an array of a given object's own enumerable property **values**.
- `Object.entries(obj)`: Returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs.
- `Object.assign(target, ...sources)`: Copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object. Often used for merging objects or shallow copying.

```javascript
const drugInfo = {
  genericName: "Metformin",
  brandName: "Glucophage",
  class: "Antidiabetic",
};

console.log(Object.keys(drugInfo)); // Output: ['genericName', 'brandName', 'class']
console.log(Object.values(drugInfo)); // Output: ['Metformin', 'Glucophage', 'Antidiabetic']
console.log(Object.entries(drugInfo));
// Output: [ ['genericName', 'Metformin'], ['brandName', 'Glucophage'], ['class', 'Antidiabetic'] ]

const storageInfo = { location: "Shelf A-3", temperature: "Room" };
const combinedMedInfo = Object.assign({}, drugInfo, storageInfo);
console.log(combinedMedInfo);
// Output: { genericName: 'Metformin', brandName: 'Glucophage', class: 'Antidiabetic', location: 'Shelf A-3', temperature: 'Room' }
```

### Arrays

An array is an ordered, zero-indexed list of values. Array elements can be of any data type, including other arrays or objects.

#### Creating Arrays

- **Array Literals (most common):**
  ```javascript
  const pendingPrescriptions = ["RX1001", "RX1002", "RX1003"];
  const patientAges = [25, 42, 17, 65];
  const mixedData = ["Paracetamol", 500, true];
  ```
- **Using `new Array()`:**
  ```javascript
  const otcDrugs = new Array("Ibuprofen", "Loratadine", "Ranitidine");
  // const emptyArray = new Array(5); // Creates an array with 5 empty slots
  ```

#### Accessing and Modifying Elements

Elements are accessed by their numerical index (starting from 0).

```javascript
console.log(pendingPrescriptions[0]); // Output: RX1001
pendingPrescriptions[1] = "RX1005_UPDATED"; // Modify an element
console.log(pendingPrescriptions); // Output: ['RX1001', 'RX1005_UPDATED', 'RX1003']
```

#### Array Properties

- `length`: Returns the number of elements in the array.
  ```javascript
  console.log(
    `Number of pending prescriptions: ${pendingPrescriptions.length}`
  ); // Output: 3
  ```

#### Common Array Methods

JavaScript arrays come with a rich set of built-in methods for manipulation and iteration.

- **Adding/Removing Elements:**

  - `push(element1, ..., elementN)`: Adds one or more elements to the end of an array and returns the new length.
  - `pop()`: Removes the last element from an array and returns that element.
  - `unshift(element1, ..., elementN)`: Adds one or more elements to the beginning of an array and returns the new length.
  - `shift()`: Removes the first element from an array and returns that element.
  - `splice(start, deleteCount, item1, ..., itemN)`: Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Returns an array containing the deleted elements.

  ```javascript
  let deliveryQueue = ["PatientX", "PatientY"];
  deliveryQueue.push("PatientZ"); // deliveryQueue is now ['PatientX', 'PatientY', 'PatientZ']
  let nextDelivery = deliveryQueue.shift(); // nextDelivery is 'PatientX', deliveryQueue is ['PatientY', 'PatientZ']
  console.log(`Next for delivery: ${nextDelivery}`);
  ```

- **Iteration Methods (Higher-Order Functions):** These methods often take a callback function as an argument.

  - `forEach(callbackFn(element, index, array))`: Executes a provided function once for each array element.
  - `map(callbackFn(element, index, array))`: Creates a **new array** populated with the results of calling a provided function on every element in the calling array.
  - `filter(callbackFn(element, index, array))`: Creates a **new array** with all elements that pass the test implemented by the provided function.

  ```javascript
  const refillRequests = [
    { patientId: "P001", medication: "Lisinopril", quantity: 30 },
    { patientId: "P002", medication: "Metformin", quantity: 90 },
    { patientId: "P003", medication: "Lisinopril", quantity: 30 },
  ];

  console.log("Processing refill requests:");
  refillRequests.forEach((request) => {
    console.log(`Processing ${request.medication} for ${request.patientId}`);
  });

  const patientIds = refillRequests.map((request) => request.patientId);
  console.log(patientIds); // Output: ['P001', 'P002', 'P003']

  const lisinoprilRequests = refillRequests.filter(
    (request) => request.medication === "Lisinopril"
  );
  console.log(lisinoprilRequests);
  // Output: [ { patientId: 'P001', ... }, { patientId: 'P003', ... } ]
  ```

- **Finding Elements:**

  - `find(callbackFn(element, index, array))`: Returns the **first element** in the array that satisfies the provided testing function. Otherwise, `undefined` is returned.
  - `findIndex(callbackFn(element, index, array))`: Returns the **index of the first element** in the array that satisfies the provided testing function. Otherwise, -1 is returned.
  - `includes(valueToFind, fromIndex)`: Determines whether an array includes a certain value among its entries, returning `true` or `false`.

  ```javascript
  const urgentRequest = refillRequests.find((req) => req.quantity > 60);
  console.log(urgentRequest); // Output: { patientId: 'P002', medication: 'Metformin', quantity: 90 }

  const hasMetformin = refillRequests.some(
    (req) => req.medication === "Metformin"
  ); // `some` checks if at least one element passes the test
  console.log(`Has Metformin request? ${hasMetformin}`); // Output: true
  ```

- **Other Useful Methods:**

  - `reduce(callbackFn(accumulator, currentValue, currentIndex, array), initialValue)`: Executes a reducer function on each element of the array, resulting in a single output value.
  - `slice(start, end)`: Returns a shallow copy of a portion of an array into a new array object. The original array will not be modified.
  - `concat(array2, ..., arrayN)`: Used to merge two or more arrays. This method does not change the existing arrays but instead returns a new array.
  - `join(separator)`: Joins all elements of an array into a string.
  - `sort(compareFunction)`: Sorts the elements of an array in place and returns the sorted array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values. This can lead to unexpected results for numbers (e.g., 10 comes before 2). Always provide a `compareFunction` for sorting numbers or complex objects.

  ```javascript
  const prices = [10.99, 5.5, 23.0, 1.25];
  prices.sort((a, b) => a - b); // Sorts numbers in ascending order
  console.log(prices); // Output: [1.25, 5.50, 10.99, 23.00]

  const totalStockValue = refillRequests.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  console.log(`Total items in refill requests: ${totalStockValue}`); // Output: 150 (30+90+30)
  ```

### ES6+ Features for Objects and Arrays

#### Destructuring Assignment

Destructuring provides a concise way to extract values from arrays or properties from objects into distinct variables.

- **Object Destructuring:**

  ```javascript
  const patientFile = {
    id: "PF007",
    fullName: "James Bond",
    lastVisit: "2023-01-10",
    primaryCondition: "Hypertension",
  };

  // Extracting properties into variables
  const { fullName, primaryCondition } = patientFile;
  console.log(`${fullName} - ${primaryCondition}`); // Output: James Bond - Hypertension

  // Aliasing: assigning to a new variable name
  const { fullName: patientName, lastVisit: visitDate } = patientFile;
  console.log(`${patientName} visited on ${visitDate}`); // Output: James Bond visited on 2023-01-10

  // Default values: if a property doesn't exist
  const { fullName: name, allergies = "None reported" } = patientFile;
  console.log(`${name} has allergies: ${allergies}`); // Output: James Bond has allergies: None reported
  ```

  **Nested Object Destructuring:**

  ```javascript
  const order = {
    orderId: "ORD555",
    customer: {
      name: "Alice Wonderland",
      address: {
        street: "123 Main St",
        city: "Anytown",
      },
    },
  };

  const {
    customer: {
      name: customerName,
      address: { city },
    },
  } = order;
  console.log(`Customer: ${customerName}, City: ${city}`); // Output: Customer: Alice Wonderland, City: Anytown
  ```

- **Array Destructuring:**

  ```javascript
  const topSellingDrugs = [
    "Atorvastatin",
    "Levothyroxine",
    "Lisinopril",
    "Metformin",
  ];

  const [firstDrug, secondDrug] = topSellingDrugs;
  console.log(`Top sellers: ${firstDrug}, ${secondDrug}`); // Output: Top sellers: Atorvastatin, Levothyroxine

  // Skipping elements
  const [, , thirdDrug] = topSellingDrugs;
  console.log(`Third best seller: ${thirdDrug}`); // Output: Third best seller: Lisinopril
  ```

  **Swapping Variables:** A concise way to swap values.

  ```javascript
  let first = "A";
  let second = "B";
  [first, second] = [second, first];
  console.log(first, second); // Output: B A
  ```

#### Spread Operator (`...`)

The spread operator allows an iterable (like an array or string) to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

- **With Arrays:**

  ```javascript
  const otcMedications = ["Ibuprofen", "Paracetamol"];
  const prescriptionMedications = ["Amoxicillin", "Lisinopril"];
  const allMedications = [
    ...otcMedications,
    ...prescriptionMedications,
    "Aspirin",
  ];
  console.log(allMedications);
  // Output: ['Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Lisinopril', 'Aspirin']

  const originalBatch = ["BatchA", "BatchB"];
  const copiedBatch = [...originalBatch]; // Creates a shallow copy
  copiedBatch.push("BatchC");
  console.log(originalBatch); // Output: ['BatchA', 'BatchB'] (original is unchanged)
  console.log(copiedBatch); // Output: ['BatchA', 'BatchB', 'BatchC']
  ```

- **With Objects (ES2018+):**

  - **Shallow Copying:** Creates a new object with copies of the original object's own enumerable properties. If a property value is an object or array, the _reference_ is copied, not the nested structure itself.
  - **Merging:** Combines properties from multiple objects. Properties from later objects overwrite earlier ones with the same key.
  - **Difference from `Object.assign()`:** Spread syntax (`{...obj}`) creates a new object and defines properties directly. `Object.assign(target, source)` _mutates_ the `target` object and calls setters if they exist on the target.

  ```javascript
  const basicPatientInfo = {
    id: "P123",
    name: "Sarah Connor",
  };
  const contactInfo = {
    phone: "555-0199",
    email: "sarah.connor@example.com",
  };

  const completePatientRecord = {
    ...basicPatientInfo,
    ...contactInfo,
    lastScreening: "2023-05-20",
  };
  console.log(completePatientRecord);
  // Output: { id: 'P123', name: 'Sarah Connor', phone: '555-0199', email: 'sarah.connor@example.com', lastScreening: '2023-05-20' }

  // Can be used to update properties non-destructively (creating a new object)
  const updatedRecord = { ...completePatientRecord, phone: "555-0200" };
  console.log(updatedRecord);
  ```

- **In Function Calls:**
  ```javascript
  function logMedicationBatch(batchId, ...medications) {
    console.log(`Batch ${batchId} contains: ${medications.join(", ")}`);
  }
  const medsForBatch = ["Simvastatin", "Omeprazole"];
  logMedicationBatch("B001", ...medsForBatch);
  // Output: Batch B001 contains: Simvastatin, Omeprazole
  ```

#### Rest Parameters (`...`) and Rest Properties (`...`)

While they use the same syntax (`...`), their role depends on the context:

- **Rest Parameters (in Function Definitions):** Collects an indefinite number of _function arguments_ into a single **array**. Must be the last parameter.

  ```javascript
  // (Example shown in Section 3: Functions)
  function logPatientVitals(patientId, ...vitals) {
    console.log(`Vitals for ${patientId}: ${vitals.join(", ")}`);
  }
  logPatientVitals("P123", "HR: 72", "BP: 120/80", "Temp: 37.0C");
  // Output: Vitals for P123: HR: 72, BP: 120/80, Temp: 37.0C
  ```

- **Rest Properties (in Object Destructuring):** Collects the remaining own enumerable _object properties_ into a single **object**. Must be the last element in the destructuring pattern.

  ```javascript
  const fullPatientData = {
    patientId: "PXYZ",
    name: "Laura Croft",
    dob: "1996-02-14",
    primaryDoctor: "Dr. Smith",
    lastCheckup: "2023-11-01",
  };

  const { patientId, name, ...medicalInfo } = fullPatientData;

  console.log(`ID: ${patientId}, Name: ${name}`);
  // Output: ID: PXYZ, Name: Laura Croft

  console.log("Medical Info:", medicalInfo);
  // Output: Medical Info: { dob: '1996-02-14', primaryDoctor: 'Dr. Smith', lastCheckup: '2023-11-01' }
  ```

> [!NOTE]
> Remember the difference:
>
> - **Spread (`...`)** _expands_ an iterable or object properties.
> - **Rest (`...`)** _collects_ function arguments or object properties.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
> - [MDN Web Docs: Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
> - [MDN Web Docs: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> - [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> - [MDN Web Docs: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### Exercise 5.2: Data Manipulation

This exercise will challenge you to use various object and array methods, along with destructuring, spread, and rest parameters, to manage and transform data related to SpeedyMeds pharmacy operations.

**(https://codesandbox.io/s/module-5-exercise-2-data-manipulation-placeholder-g9x3a)**

_(Note: The CodeSandbox link is a placeholder. A functional CodeSandbox with the exercise prompt will be provided in the actual course materials.)_

**Instructions for Exercise 5.2 (to be placed in CodeSandbox `README.md`):**

```markdown
# Exercise 5.2: Data Manipulation - SpeedyMeds Pharmacy

## Objective

Practice manipulating JavaScript objects and arrays using various methods, destructuring, spread syntax, and rest parameters. All tasks will be themed around SpeedyMeds pharmacy data.

## Data

Start with the following sample data in your `index.js`:

```

```javascript
const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    prescriptions: ["Lisinopril", "Aspirin"],
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 62,
    prescriptions: ["Metformin", "Simvastatin", "Lisinopril"],
  },
  { id: "P003", name: "Alice Brown", age: 30, prescriptions: ["Amoxicillin"] },
  { id: "P004", name: "Bob Green", age: 70, prescriptions: ["Warfarin"] },
];

const medicationsInventory = {
  Lisinopril: { stock: 150, unitPrice: 0.5 },
  Aspirin: { stock: 200, unitPrice: 0.1 },
  Metformin: { stock: 100, unitPrice: 0.7 },
  Simvastatin: { stock: 80, unitPrice: 0.9 },
  Amoxicillin: { stock: 120, unitPrice: 0.3 },
  Warfarin: { stock: 50, unitPrice: 1.2 },
};
```

```markdown

## Tasks

1.  **List Patient Names:**

    - Use an array method to create a new array containing only the names of all patients.
    - Log this new array to the console.

2.  **Find Elderly Patients:**

    - Use an array method to create a new array containing only patients who are 60 years old or older.
    - Log this new array to the console.

3.  **Patient Prescription Summary (Destructuring & Map):**

    - Use the `map` method to create a new array of strings. Each string should be a summary for a patient, like: "John Doe (ID: P001) takes Lisinopril, Aspirin".
    - Inside the `map` callback, use object destructuring to extract `id`, `name`, and `prescriptions` from each patient object.
    - Use the `join(', ')` method on the `prescriptions` array to format the list of medications.
    - Log the new array of summaries.

4.  **Update Medication Stock (Spread Operator):**

    - Imagine 'Lisinopril' just had a new shipment of 50 units.
    - Create a _new_ `updatedMedicationsInventory` object where the stock for 'Lisinopril' is increased by 50.
    - Use the spread operator to copy the original `medicationsInventory` and then overwrite the 'Lisinopril' entry with the updated stock information.
    - Log both the original and the updated stock for Lisinopril to verify.

5.  **Combine Patient and First Prescription (Object Destructuring & Spread):**

    - For the first patient in the `patients` array, create a new object that combines all properties of the patient object with a new property `firstPrescription` which holds the name of their first listed prescription.
    - Use object destructuring to get the patient's properties and array destructuring to get their first prescription.
    - Use the spread operator to construct the new object.
    - Log the new combined object.

6.  **`logPrescriptionDetails(patientName, ...medications)` Function (Rest Parameters):**
    - Define a function `logPrescriptionDetails` that takes `patientName` as its first argument, and then uses rest parameters to collect all subsequent arguments (which will be medication names) into an array called `medications`.
    - The function should log a message like: "Patient: [patientName] is prescribed: [med1], [med2], ...". If no medications are passed, it should log "Patient: [patientName] has no new prescriptions listed."
    - Call this function for a couple of patients, passing their medication names as individual arguments after their name.
      - Example call: `logPrescriptionDetails('John Doe', 'Lisinopril', 'Aspirin');`

## Getting Started

1.  Copy the sample data into your `index.js`.
2.  Implement the tasks one by one.
3.  Use `console.log()` to display your results for each task.
4.  Check the console in CodeSandbox to verify your outputs.

Good luck!

```

### Next Steps

Understanding how to structure and manipulate data with objects and arrays is crucial. Next, we'll delve into how JavaScript handles operations that take time to complete, such as network requests or user interactions. Proceed to [Section 5: Asynchronous JavaScript](./section-05-asynchronous-javascript.md) to learn about callbacks, Promises, and async/await.
