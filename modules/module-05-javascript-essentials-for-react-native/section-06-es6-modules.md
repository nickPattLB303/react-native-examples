## Section 6: ES6 Modules (Import/Export)

ES6 Modules provide a standardized, built-in module system for JavaScript, enabling better code organization, reusability, and maintainability by allowing code to be split into separate files (modules). They help avoid polluting the global namespace and make dependency management more explicit.

> 🛣️ **All Learners:** Understanding ES6 Modules is essential for working with any modern JavaScript project, including React Native. Modules are the standard way to structure your codebase, manage dependencies, and share code between different parts of your application.

### Introduction to Modules

-   **Purpose:**
    -   **Organization:** Break down large codebases into smaller, more manageable, and self-contained pieces.
    -   **Reusability:** Write code once in a module and use it in multiple parts of an application or in different projects.
    -   **Encapsulation:** Modules can hide internal implementation details and only expose a public API (Application Programming Interface), preventing unintended external access or modification.
    -   **Dependency Management:** Clearly define which other modules a given module depends on.
    -   **Namespace Management:** Each module has its own scope, preventing naming conflicts between variables and functions in different modules and avoiding the creation of global variables.

In the context of React Native, the Metro bundler understands and processes ES6 module syntax to bundle all JavaScript code and assets for the application.

### `export` Statement: Making Code Available

The `export` statement is used to make variables, functions, or classes from one module available for use in other modules.

#### Named Exports

Allow a module to export multiple values, each with a distinct name.

-   Exporting at declaration:
    ```javascript
    // in utils.js
    export const PI = 3.14159;
    export function add(a, b) {
      return a + b;
    }
    export class Patient { /*... */ }
    ```
-   Exporting existing variables/functions (list at the end):
    ```javascript
    // in utils.js
    const GREETING = "Hello";
    function multiply(x, y) { return x * y; }
    //...
    export { GREETING, multiply };
    ```
-   Aliasing exports: Export a value under a different name using `as`.
    ```javascript
    // in utils.js
    function internalCalculate() { /*... */ }
    export { internalCalculate as calculateTotal };
    ```

A module can have multiple named exports.

This example shows a module exporting named values related to pharmacy operations:

```javascript
// src/utils/pharmacyMath.js
export const TAX_RATE = 0.08; // Named export

export function calculateSubtotal(items) { // Named export
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.quantity;
  }
  return subtotal;
}

export function applyTax(amount) { // Named export
  return amount * (1 + TAX_RATE);
}
```

#### Default Exports

Allows a module to export a single primary value. This is often used for the main functionality or class provided by a module.

-   Exporting at declaration:
    ```javascript
    // in MyComponent.js
    export default function MyComponent() { /*... */ }
    // or
    // export default class MyClass { /*... */ }
    ```
-   Exporting an existing value:
    ```javascript
    // in config.js
    const appConfig = { version: "1.0" };
    export default appConfig;
    ```

> [!IMPORTANT]
> A module can have only one default export.

This example shows a module exporting a default value (a configuration object):

```javascript
// src/config/appSettings.js
const settings = {
  appName: "SpeedyMeds",
  version: "1.0.0",
  apiEndpoint: "https://api.speedymeds.com"
};

export default settings; // Default export
```

#### Re-exporting

Modules can also re-export values from other modules. Useful for creating "barrel" files that aggregate exports.

-   Re-exporting named exports:
    ```javascript
    // src/utils/index.js (a barrel file)
    export { calculateSubtotal, applyTax } from './pharmacyMath.js'; // Re-exports from pharmacyMath.js
    // export other named exports from other utility files...
    ```
-   Re-exporting all named exports from another module:
    ```javascript
    // src/services/index.js
    export * from './patientService.js'; // Re-exports all named exports from patientService.js
    export * from './medicationService.js'; // Re-exports all named exports from medicationService.js
    // Note: `export *` does NOT re-export the default export of the other module.
    ```
-   Re-exporting a default export (as named or default):
    ```javascript
    // src/components/index.js
    export { default as PatientCard } from './PatientCard.js'; // Re-export default as named
    // export { default } from './App.js'; // Re-export default as default (less common)
    ```

### `import` Statement: Bringing Exported Code In

The `import` statement is used to bring exported variables, functions, or classes from other modules into the scope of the current module.

#### Named Imports

Used to import values that were exported using named exports. The name used during import must match the name used during export (or the alias used during export).

-   Syntax: `import { name1, name2 as newName2 } from 'module-name';`

This example shows importing named exports:

```javascript
// src/screens/OrderScreen.js
import { calculateSubtotal, applyTax } from '../utils/pharmacyMath.js'; // Import named exports

const items = [{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }];
const subtotal = calculateSubtotal(items);
const total = applyTax(subtotal);

console.log(`Subtotal: ${subtotal}, Total: ${total}`);
```

#### Default Imports

Used to import the single value that was exported as the default export from a module. The name used during import can be anything you choose.

-   Syntax: `import defaultName from 'module-name';`

This example shows importing a default export:

```javascript
// src/App.js
import appSettings from './config/appSettings.js'; // Import the default export

console.log(`App Name: ${appSettings.appName}, Version: ${appSettings.version}`);
```

#### Importing Everything

Imports all named exports from a module into a single object.

-   Syntax: `import * as moduleObject from 'module-name';`

This example shows importing all named exports into an object:

```javascript
// src/utils/anotherFile.js
import * as pharmacyUtils from './pharmacyMath.js'; // Import all named exports into pharmacyUtils object

const items = [{ price: 10, quantity: 2 }];
const subtotal = pharmacyUtils.calculateSubtotal(items);
console.log(`Calculated subtotal using imported object: ${subtotal}`);
```

#### Importing with Aliases

You can use the `as` keyword during import to give a named import a different name in the current module.

-   Syntax: `import { originalName as aliasName } from 'module-name';`

This example shows importing with an alias:

```javascript
// src/screens/ReportScreen.js
import { calculateSubtotal as calculateOrderTotal } from '../utils/pharmacyMath.js'; // Import with alias

const items = [{ price: 20, quantity: 1 }];
const orderTotal = calculateOrderTotal(items);
console.log(`Order total (using alias): ${orderTotal}`);
```

#### Side-effect Imports

Imports a module solely for its side effects (e.g., polyfills, global configurations). The imported module's code is executed, but no values are imported into the current scope.

-   Syntax: `import 'module-name';`

This is less common in typical application code but can be used for modules that register themselves or modify the global environment upon import.

> [!IMPORTANT]
> When importing modules, especially in environments like Node.js ES Modules, you might need to include the file extension (e.g., `.js`). Bundlers like Metro often handle this automatically, allowing you to omit the extension for local files, but it's a detail to be aware of in the broader JavaScript ecosystem.

> 🌐 **Web Developers:** ES6 Modules (`import`/`export`) are the standard for organizing code in modern web development, especially with frameworks like React. You should be very familiar with this syntax.
>
> 📲 **Native Developers:** Module systems like Java packages or Swift modules serve a similar purpose for code organization. The `import`/`export` syntax is specific to JavaScript. Understand the difference between named and default exports and how to import each correctly.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: `export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
> - [MDN Web Docs: `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
> - [MDN Web Docs: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### Module Challenge

You have reached the end of Module 5. Test your understanding of JavaScript essentials by completing the module challenge.

**(TODO: Add link to Module 5 Challenge - Microsoft Forms)**
