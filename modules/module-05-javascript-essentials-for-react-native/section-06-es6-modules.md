## Section 6: ES6 Modules

As your JavaScript applications grow in complexity, organizing your code becomes crucial for maintainability, reusability, and collaboration. ES6 (ECMAScript 2015) introduced a standard module system for JavaScript, allowing you to break down your code into smaller, self-contained, and reusable pieces called modules.

### What are Modules?

A module is typically a single file that encapsulates related code. Variables, functions, and classes declared within a module are private to that module by default, meaning they cannot be accessed directly from other modules unless they are explicitly **exported**.

**Benefits of using modules:**

- **Organization:** Code is structured into logical units, making it easier to understand and navigate.
- **Reusability:** Exported functionality can be easily **imported** and used in other parts of your application or even in different projects.
- **Maintainability:** Changes within one module are less likely to unintentionally affect other parts of the application, simplifying updates and debugging.
- **Namespace Management:** Modules help avoid naming conflicts by keeping declarations within their own scope, preventing pollution of the global namespace.

In ES6 modules, each file is treated as a separate module. Modules operate in **strict mode** by default.

### `export` Statement

The `export` statement is used to make JavaScript variables, functions, or classes available for use in other modules.

#### Named Exports

A module can have multiple named exports. You can export declarations as they are defined, or export a list of existing declarations.

**1. Exporting individual declarations:**

```javascript
// file: pharmacyUtils.js

export const PHARMACY_NAME = "SpeedyMeds Central";

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export function calculateSalesTax(totalAmount, taxRate = 0.07) {
  return totalAmount * taxRate;
}
```

**2. Exporting a list of existing declarations (often at the end of the file):**

```javascript
// file: medicationHelpers.js

const DEFAULT_DOSAGE_UNIT = "mg";

function getMedicationId(name, strength) {
  return `${name.toUpperCase().substring(0, 3)}${strength}`;
}

// ... other helper functions ...

export { DEFAULT_DOSAGE_UNIT, getMedicationId };
```

**Aliasing Named Exports:** You can export a value under a different name using `as`.

```javascript
// file: inventoryManager.js
function checkStockLevel() {
  // ... logic ...
  return 100;
}
export { checkStockLevel as getInventoryCount };
```

#### Default Export

A module can also have **one** default export. This is often used for the primary piece of functionality the module provides, like a class or a main function.

**1. Exporting a function or class directly:**

```javascript
// file: PatientRecord.js
export default class PatientRecord {
  constructor(name, dob) {
    this.name = name;
    this.dob = dob;
    this.prescriptions = [];
  }

  addPrescription(medication) {
    this.prescriptions.push(medication);
    console.log(`${medication} added for ${this.name}`);
  }
}
```

**2. Exporting an existing declaration as default:**

```javascript
// file: loggerService.js
function logEvent(message, level = "INFO") {
  console.log(`[${level}] - ${new Date().toISOString()}: ${message}`);
}

export default logEvent;
```

**When to use Named vs. Default Exports:**

- Use **named exports** when a module provides multiple utility functions, constants, or classes that can be used independently.
- Use a **default export** when a module has a primary purpose or provides a single, main piece of functionality (e.g., a class, a main configuration object).
- It's possible to have both named exports and a default export in the same module, but keep it logical for clarity.

### `import` Statement

The `import` statement is used to bring exported functionality from another module into the current module's scope.

#### Importing Named Exports

Use curly braces `{}` to import specific named exports. You can also alias them using `as`.

```javascript
// file: app.js
import {
  PHARMACY_NAME,
  formatCurrency,
  calculateSalesTax as calcTax,
} from "./pharmacyUtils.js";
// Assuming pharmacyUtils.js is in the same directory

console.log(`Welcome to ${PHARMACY_NAME}!`);
let itemPrice = 19.99;
let finalPrice = itemPrice + calcTax(itemPrice);
console.log(`Total for item: ${formatCurrency(finalPrice)}`);
```

#### Importing a Default Export

You can choose any name for the imported default value.

```javascript
// file: mainSystem.js
import Patient from "./PatientRecord.js"; // 'Patient' can be any name here
import writeLog from "./loggerService.js";

const patient1 = new Patient("Sarah Mills", "1985-02-20");
patient1.addPrescription("Loratadine 10mg");
writeLog("Patient record created for Sarah Mills.");
```

#### Importing Both Default and Named Exports

```javascript
// file: anotherModule.js
// Assuming someModule.js has a default export and a named export 'utilityFunc'
// import myDefaultExport, { utilityFunc } from './someModule.js';
```

#### Importing Everything as a Namespace

This imports all named exports from a module as properties of a single object.

```javascript
// file: inventoryApp.js
import * as utils from "./pharmacyUtils.js";

console.log(`Pharmacy: ${utils.PHARMACY_NAME}`);
let cost = 50;
let displayCost = utils.formatCurrency(cost + utils.calculateSalesTax(cost));
console.log(displayCost);
```

#### Module Specifiers (Paths)

The string that specifies the location of the module (e.g., `'./pharmacyUtils.js'`) is called the module specifier.

- **Relative paths:** Start with `./` (same directory) or `../` (parent directory).
- **Absolute paths:** Can be used but are less common for project-local modules. More typical for importing from installed packages (e.g., `import React from 'react';`).
- **File Extensions:** In many modern JavaScript environments and bundlers (like Metro for React Native), you can often omit the `.js` extension when importing local files. However, being explicit can sometimes improve clarity or be required by certain configurations.

### Modules in Practice (Conceptual)

- **Bundlers:** In React Native (and most modern web development), a tool called a **bundler** (Metro for React Native) processes your modules. It traverses the `import` statements, starting from your application's entry point, and bundles all the necessary code into one or more files that can be efficiently loaded by the JavaScript engine.
- **Strict Mode:** All ES6 modules are automatically in strict mode, which helps catch common coding mistakes and ensures more secure JavaScript.
- **Scope:** As mentioned, declarations within a module are local to that module unless exported. This helps prevent accidental modification of global variables and promotes encapsulation.

**Example: Structuring SpeedyMeds Code**

Let's imagine a simplified structure for SpeedyMeds using modules:

**`medicationService.js`** (exports functions related to medications)

```javascript
// medicationService.js
const inventory = {
  L001: { name: "Lisinopril", stock: 100 },
  A002: { name: "Amoxicillin", stock: 50 },
};

export function getMedicationDetails(medId) {
  return inventory[medId] || null;
}

export function updateStock(medId, quantityChange) {
  if (inventory[medId]) {
    inventory[medId].stock += quantityChange;
    return true;
  }
  return false;
}
```

**`patientService.js`** (exports a default class for patient management)

```javascript
// patientService.js
export default class PatientManager {
  constructor() {
    this.patients = {};
  }
  addPatient(id, name) {
    if (!this.patients[id]) {
      this.patients[id] = { name, prescriptions: [] };
      console.log(`Patient ${name} added with ID ${id}.`);
    }
  }
  // ... other methods
}
```

**`mainApp.js`** (imports and uses the services)

```javascript
// mainApp.js
import { getMedicationDetails, updateStock } from "./medicationService.js";
import PatientManager from "./patientService.js";

console.log("--- SpeedyMeds Main Application ---");

const meds = getMedicationDetails("L001");
if (meds) {
  console.log(`Found: ${meds.name}, Stock: ${meds.stock}`);
  updateStock("L001", -5);
  console.log(
    `Updated stock for ${meds.name}: ${getMedicationDetails("L001").stock}`
  );
}

const patientManager = new PatientManager();
patientManager.addPatient("PXYZ", "Eleanor Rigby");
```

This example demonstrates how different functionalities (medication management, patient management) can be separated into their own modules and then imported where needed, leading to a cleaner and more organized codebase.

### Re-exporting Modules

Modules can also export functionality that they have imported from other modules. This is useful for creating a single entry point ("barrel" file) for multiple related modules or for restructuring modules without breaking external imports.

**1. Re-exporting named exports:**

```javascript
// file: allUtils.js
// Re-exports named functions from two different utility modules
export { formatCurrency, calculateSalesTax } from "./pharmacyUtils.js";
export { getMedicationId } from "./medicationHelpers.js";

// Now another module can import directly from allUtils.js:
// import { formatCurrency, getMedicationId } from './allUtils.js';
```

**2. Re-exporting all named exports (`export * from ...`):**
This syntax re-exports all **named** exports from the specified module. It does **not** re-export the default export.

```javascript
// file: allServices.js
export * from "./medicationService.js"; // Re-exports getMedicationDetails, updateStock, etc.
// Note: Does not re-export PatientManager if it were the default export of patientService.js

// Usage:
// import { getMedicationDetails } from './allServices.js';
```

**3. Re-exporting a default export (as named or default):**

```javascript
// file: servicesIndex.js

// Re-export the default export of patientService.js as a named export 'PatientService'
export { default as PatientService } from "./patientService.js";

// Re-export the default export of loggerService.js as the default export of servicesIndex.js
export { default } from "./loggerService.js";

// Usage:
// import log, { PatientService } from './servicesIndex.js';
```

### Dynamic Imports (Advanced)

Besides the static `import` statement (which is processed at build time), JavaScript also supports dynamic `import()`. This looks like a function call and returns a **Promise** that resolves with the module object.

```javascript
// Conceptual Example
async function loadReportingModule() {
  if (userNeedsReports) {
    try {
      const reportingUtils = await import("./reportingUtils.js");
      reportingUtils.generateReport();
    } catch (error) {
      console.error("Failed to load reporting module:", error);
    }
  }
}
```

Dynamic imports are useful for **code splitting** – loading code only when it's actually needed, which can improve initial application load times, especially in web contexts. While Metro (React Native's bundler) handles bundling differently, the concept of loading resources dynamically is relevant.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
> - [MDN Web Docs: `export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
> - [MDN Web Docs: `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

---

## Challenge 5: Mini Pharmacy Data Processor

This challenge will test your understanding of the JavaScript concepts covered in this module, including variables, data types, operators, control flow, functions, objects, arrays, and ES6 module syntax (conceptually, as CodeSandbox might handle modules slightly differently than a full Node.js/React Native environment for this basic JS exercise).

**(https://codesandbox.io/s/module-5-challenge-mini-pharmacy-processor-placeholder-g9x5c)**

_(Note: The CodeSandbox link is a placeholder. A functional CodeSandbox with the challenge prompt and potentially a multi-file setup if simple enough will be provided.)_

**Instructions for Challenge 5 (to be placed in CodeSandbox `README.md`):**

```markdown
# Challenge 5: Mini Pharmacy Data Processor

## Objective

Apply your JavaScript knowledge from Module 5 to process and analyze a small dataset related to pharmacy operations. This includes working with arrays of objects, performing calculations, filtering data, and formatting output.

## Scenario

SpeedyMeds wants a simple script to analyze its daily prescription data. You are given an array of prescription objects.

## Data

Start with the following sample data in your `index.js` (or a separate `data.js` if you choose to structure it with modules conceptually):

```

```javascript
// data.js (conceptually)
export const dailyPrescriptions = [
  {
    id: "RX001",
    patientName: "John Doe",
    medication: "Lisinopril",
    quantity: 30,
    unitPrice: 0.5,
    insuranceCovered: true,
  },
  {
    id: "RX002",
    patientName: "Jane Smith",
    medication: "Metformin",
    quantity: 60,
    unitPrice: 0.7,
    insuranceCovered: false,
  },
  {
    id: "RX003",
    patientName: "Alice Brown",
    medication: "Amoxicillin",
    quantity: 15,
    unitPrice: 0.3,
    insuranceCovered: true,
  },
  {
    id: "RX004",
    patientName: "Bob Green",
    medication: "Lisinopril",
    quantity: 30,
    unitPrice: 0.5,
    insuranceCovered: true,
  },
  {
    id: "RX005",
    patientName: "John Doe",
    medication: "Simvastatin",
    quantity: 30,
    unitPrice: 0.9,
    insuranceCovered: false,
  },
  {
    id: "RX006",
    patientName: "Clara White",
    medication: "Metformin",
    quantity: 90,
    unitPrice: 0.7,
    insuranceCovered: true,
  },
];
```

```markdown

## Tasks

Create functions (potentially in a separate `processor.js` file, imported into `index.js`) to perform the following operations:

1.  **`calculateTotalRevenue(prescriptions)`:**

    - Accepts the `dailyPrescriptions` array.
    - Calculates the total revenue from all prescriptions (quantity \* unitPrice for each).
    - Returns the total revenue formatted as a currency string (e.g., "$123.45"). You can create a simple helper for currency formatting.

2.  **`getPrescriptionsByMedication(prescriptions, medicationName)`:**

    - Accepts the `prescriptions` array and a `medicationName` string.
    - Returns a new array containing only the prescriptions for the specified medication.

3.  **`getPatientsWithHighCostPrescriptions(prescriptions, costThreshold)`:**

    - Accepts the `prescriptions` array and a `costThreshold` number.
    - Calculates the total cost for each prescription (quantity \* unitPrice).
    - Returns a new array of unique patient names who have at least one prescription exceeding the `costThreshold`.

4.  **`summarizeInsuranceCoverage(prescriptions)`:**

    - Accepts the `prescriptions` array.
    - Returns an object with two properties: `coveredCount` (number of prescriptions covered by insurance) and `uncoveredCount` (number of prescriptions not covered).

5.  **`generateDailyReport(prescriptions)`:**
    - This function should call the other functions you've created to generate a summary report string.
    - The report should include:
      - Total revenue.
      - Number of Lisinopril prescriptions.
      - Names of patients with prescriptions costing more than $20.
      - Insurance coverage summary (covered vs. uncovered count).
    - The output should be a well-formatted multi-line string.

## Implementation Notes

- Use `let` and `const` appropriately.
- Utilize array methods like `map`, `filter`, `reduce`, `forEach`.
- Employ object and array destructuring where it improves readability.
- Use arrow functions where appropriate.
- **Module Structure (Conceptual for CodeSandbox):**
  - You can put your data in `data.js` and export it.
  - Put your processing functions in `processor.js` and export them.
  - In `index.js`, import the data and functions, then call `generateDailyReport` and log its output.
  - CodeSandbox might require you to use `require` and `module.exports` for simpler multi-file setups without full bundler emulation, or you can do it all in `index.js` and just structure your code with functions as if they were in modules.

## Expected Output (Example for `generateDailyReport`)

--- SpeedyMeds Daily Prescription Report ---
Total Revenue: $XX.XX
Lisinopril Prescriptions: X
Patients with High-Cost Prescriptions (> $20.00): Patient A, Patient B
Insurance Coverage:
Covered: X
Uncovered: X

---

(Replace X and XX.XX with your calculated values.)

## Getting Started

1.  Set up your files (`index.js`, and optionally `data.js`, `processor.js`).
2.  Implement the functions as described.
3.  In `index.js`, import necessary parts and call `generateDailyReport(dailyPrescriptions)`.
4.  Log the report to the console.

Good luck!
```

---

## Module 5 Summary

Congratulations on completing Module 5: JavaScript Essentials for React Native! You've covered a significant amount of ground, building a strong foundation in the language that powers React Native development.

Key takeaways from this module include:

- **Variables and Data Types:** Understanding `let` and `const` for variable declaration, and mastering JavaScript's primitive and object data types, along with various operators for manipulation and comparison.
- **Control Flow:** Using conditional statements (`if/else`, `switch`) and loops (`for`, `while`, `for...of`) to direct the execution path of your programs.
- **Functions:** Defining and using functions (including concise arrow functions), understanding scope (global, function, block, lexical), and harnessing the power of closures for data encapsulation and persistent state.
- **Objects and Arrays:** Working proficiently with these core data structures, including their methods, and leveraging ES6+ features like destructuring, the spread operator, and rest parameters for efficient data manipulation.
- **Asynchronous JavaScript:** Grasping the concepts of asynchronous operations, and managing them effectively using callbacks, Promises, and the modern `async/await` syntax to prevent blocking and maintain responsive applications.
- **ES6 Modules:** Learning how to organize code into reusable and maintainable modules using `import` and `export` statements.

These JavaScript skills are not just prerequisites but are actively used every day when building React Native applications. From managing component state and props to handling API responses and structuring your application logic, a solid understanding of these concepts will make your journey into React Native much smoother and more productive.

## Additional Resources (Optional)

For further exploration and to deepen your JavaScript knowledge, consider these resources:

- [JavaScript.info](https://javascript.info): A comprehensive and modern JavaScript tutorial.
- [Eloquent JavaScript by Marijn Haverbeke](https://eloquentjavascript.net/): A well-regarded book available online for free, covering JavaScript in depth.
- [You Don't Know JS Yet (book series) by Kyle Simpson](https://github.com/getify/You-Dont-Know-JS): A series of books that dive deep into the core mechanisms of JavaScript.
- [MDN Web Docs: JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide): An extensive guide covering all aspects of JavaScript.

### Next Steps

With these JavaScript essentials under your belt, you're well-prepared to enhance your code with static typing. Proceed to **[Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md)** (link to be updated based on final structure) to learn how TypeScript can help you write more robust and maintainable React Native applications.
