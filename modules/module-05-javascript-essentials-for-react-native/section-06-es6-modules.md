## Section 6: ES6 Modules

As your JavaScript applications grow in complexity, organizing your code becomes crucial for maintainability, reusability, and collaboration. ES6 (ECMAScript 2015) introduced a standard module system for JavaScript, allowing you to break down your code into smaller, self-contained, and reusable pieces called modules.

### What are Modules?

A module is typically a single file that encapsulates related code. Variables, functions, and classes declared within a module are private to that module by default, meaning they cannot be accessed directly from other modules unless they are explicitly **exported**.

**Benefits of using modules:**

- **Organization:** Code is structured into logical units, making it easier to understand and navigate.
- **Reusability:** Exported functionality can be easily **imported** and used in other parts of your application or even in different projects.
- **Maintainability:** Changes within one module are less likely to unintentionally affect other parts of the application, simplifying updates and debugging.
- **Namespace Management:** Modules help avoid naming conflicts by keeping declarations within their own scope, preventing pollution of the global namespace.

> 📲 **(Native Developers):**
>
> **Comparison:** ES6 modules in JavaScript work differently from module systems in native platforms. Swift uses modules where each framework or package is a module with explicit imports. Android uses Java/Kotlin packages with import statements. JavaScript ES6 modules have more granular export/import syntax that works at the individual function/class level.
>
> **Key Takeaway:** All these systems isolate code and prevent namespace collisions, but JavaScript's module system feels more granular than Swift's module-level imports or Android's package-level organization.
>
> **Source:** [Swift Modules and Imports](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol/) and [Kotlin Packages and Imports](https://kotlinlang.org/docs/packages.html)
>
> **Example:**
>
> ```swift
> // Swift imports an entire module
> import UIKit
> import MyCustomFramework
>
> // Selective import (less common)
> import class MyModule.MyClass
> import struct MyModule.MyStruct
> ```
>
> ```kotlin
> // Kotlin/Java imports packages or specific classes
> import android.view.View
> import com.example.myapp.utils.*  // Import all from package
>
> // No direct equivalent to JS default exports
> ```
>
> ```javascript
> // JavaScript can import specific items or default exports
> import { useState, useEffect } from "react"; // Named imports
> import React from "react"; // Default import
> import * as Utils from "./utils"; // Namespace import
> ```

> 🌐 **(Web Developers):** > **Comparison:** If you're familiar with Node.js, you've likely used CommonJS modules (`require()/module.exports`), which differ from ES6 modules (`import/export`). CommonJS modules are synchronous and load at runtime, while ES6 modules are asynchronous and statically analyzed at compile time.
>
> **Key Takeaway:** React Native's bundler (Metro) supports both module systems, but the ES6 module syntax is preferred for modern React Native development.
>
> **Source:** [JavaScript Modules: ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
>
> **Example:**
>
> ```javascript
> // CommonJS (older Node.js style)
> const React = require("react");
> const { useState } = require("react");
> module.exports = MyComponent;
> module.exports.helper = helperFunction;
>
> // ES6 Modules (modern, used in React Native)
> import React, { useState } from "react";
> export default MyComponent;
> export const helper = helperFunction;
> ```

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
