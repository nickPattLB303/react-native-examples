# Module 9: Modules

**Introduction**

As applications grow, organizing code becomes crucial. Placing all your code in a single file is unmanageable. Modules allow you to split your JavaScript code into separate files (modules), making it organized, maintainable, reusable, and preventing naming conflicts in the global scope. ES6 (ECMAScript 2015) introduced a standard module system for JavaScript, using `import` and `export` statements, which is the system used by React Native and modern web development.

**Learning Objectives**

*   Understand the purpose of modules in JavaScript for code organization and reusability.
*   Export variables, functions, and classes from a module using named exports.
*   Export a single primary value from a module using a default export.
*   Import specific named exports from another module.
*   Import the default export from another module.
*   Import all named exports from a module as a single object.
*   Understand the difference between named and default exports/imports.
*   Recognize how React Native components and utilities are typically organized using modules.

**Keywords**

*   Module: A self-contained file of JavaScript code.
*   `export`: Keyword used to make variables, functions, or classes available to other modules.
*   `import`: Keyword used to bring exported members from another module into the current module.
*   Named Export: Exporting multiple specific members from a module using their original names.
*   Default Export: Exporting a single primary member from a module. A module can have only one default export.
*   Namespace Import: Importing all named exports from a module as properties of a single object.
*   Scope: Modules have their own scope; variables declared in a module are not global by default.

---

## Why Use Modules?

Before standard modules, developers relied on patterns like IIFEs (Immediately Invoked Function Expressions) or external libraries (like RequireJS or CommonJS, used by Node.js) to manage dependencies and avoid polluting the global scope. ES6 Modules provide a native, standardized solution with several benefits:

1.  **Organization:** Break down large codebases into smaller, focused files.
2.  **Reusability:** Easily reuse functions, components, or utilities across different parts of your application.
3.  **Maintainability:** Changes within one module are less likely to break unrelated parts of the application.
4.  **Dependency Management:** Clear `import` statements explicitly declare what a module needs.
5.  **Namespace Protection:** Variables and functions within a module are local to that module unless explicitly exported, preventing accidental global variable collisions.

---

## Exporting from Modules

You use the `export` keyword to make code available outside the current module.

### Named Exports

Export multiple specific items by name.

```javascript
// ----- File: utils.js -----

export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Or export multiple items at the end
const MULTIPLIER = 2;
function multiply(a) {
  return a * MULTIPLIER;
}
// export { MULTIPLIER, multiply }; // Alternative way to export existing items

// Exporting with a different name
function divideInternal(a, b) {
  return a / b;
}
export { divideInternal as divide };
```

### Default Export

Export a single primary value from the module. This is often used for the main component in a file in React/React Native.

```javascript
// ----- File: MyComponent.js -----
import React from 'react';
import { View, Text } from 'react-native';

// Default export (often a component or class)
export default function MyComponent(props) {
  return (
    <View>
      <Text>This is my default component!</Text>
    </View>
  );
}

// You can still have named exports alongside a default export
export const componentVersion = "1.0";

//----- File: config.js -----
// Exporting an object as default
const config = {
  apiKey: "123xyz",
  baseUrl: "/api"
};
export default config;

//----- File: logger.js -----
// Exporting a class as default
class Logger {
    log(message) { console.log(message); }
}
// export default new Logger(); // Exporting an instance as default
export default Logger; // Exporting the class itself
```

**Key Points:**

*   A module can have **multiple named exports** but only **one default export**.
*   You can have both named and default exports in the same module.

---

## Importing into Modules

You use the `import` keyword to access exported code from other modules.

### Importing Named Exports

Use curly braces `{}` to import specific named exports. The names inside the braces must match the exported names (unless using `as` for renaming).

```javascript
// ----- File: main.js -----

// Import specific named exports from utils.js
import { add, subtract, PI, divide } from './utils.js';

console.log(`PI is approx ${PI}`);
console.log(`Addition: ${add(5, 3)}`);       // Output: Addition: 8
console.log(`Subtraction: ${subtract(10, 4)}`); // Output: Subtraction: 6
console.log(`Division: ${divide(20, 4)}`);     // Output: Division: 5

// Import with renaming
import { add as sum } from './utils.js';
console.log(`Sum: ${sum(1, 2)}`); // Output: Sum: 3
```

### Importing a Default Export

Import the default export using any name you choose, without curly braces.

```javascript
// ----- File: app.js -----

// Import the default export from MyComponent.js (can use any name)
import MyMainComponent from './MyComponent.js';

// Import default and named exports from the same module
import AnotherComponent, { componentVersion } from './MyComponent.js';

// Import the default export from config.js
import AppConfig from './config.js';

// Import the default class export from logger.js
import LoggerService from './logger.js';

console.log("Using component version:", componentVersion); // Output: Using component version: 1.0
console.log("API Key:", AppConfig.apiKey); // Output: API Key: 123xyz

const logger = new LoggerService();
logger.log("App started"); // Output: App started

// Use the imported components (conceptual in React/RN context)
// function AppRoot() {
//   return <MyMainComponent />;
// }
```

### Namespace Import (Importing all named exports)

Import all named exports from a module as properties of a single object.

```javascript
// ----- File: calculator.js -----

// Import everything from utils.js into an object called 'mathUtils'
import * as mathUtils from './utils.js';

console.log(`PI from namespace: ${mathUtils.PI}`);
console.log(`Add via namespace: ${mathUtils.add(10, 5)}`); // Output: Add via namespace: 15
console.log(`Subtract via namespace: ${mathUtils.subtract(10, 5)}`); // Output: Subtract via namespace: 5
// console.log(mathUtils.divideInternal); // Error: divideInternal was not exported
console.log(`Divide via namespace: ${mathUtils.divide(10, 5)}`); // Output: Divide via namespace: 2
```
*Note: Namespace imports (`import * as name`) only include named exports, not the default export.* You need separate imports for default and namespace.

```javascript
import DefaultComponent, * as utilities from './someModule.js';
```

---

## Modules in React Native

React Native applications are heavily based on modules:

*   **Core Components/APIs:** You import components like `View`, `Text`, `Button`, `StyleSheet`, and APIs like `useState`, `useEffect`, `Platform` from the `react` and `react-native` packages.
    ```jsx
    import React, { useState } from 'react';
    import { View, Text, Button, StyleSheet } from 'react-native';
    ```
*   **Your Components:** You typically define each component in its own file and export it (usually as a default export), then import it where needed.
    ```javascript
    // screens/HomeScreen.js
    import React from 'react';
    import { View, Text } from 'react-native';
    import CustomButton from '../components/CustomButton'; // Importing your own component

    export default function HomeScreen() {
      // ... component logic
      return (
        <View>
          <Text>Home Screen</Text>
          <CustomButton title="Press Me" />
        </View>
      );
    }
    ```
*   **Utilities/Helpers:** Functions for formatting data, making API calls, or handling specific logic are often grouped into utility modules and exported using named exports.
    ```javascript
    // utils/api.js
    export async function fetchUserProfile(userId) {
      // ... fetch logic
    }
    export async function updateUserProfile(userId, data) {
      // ... update logic
    }

    // In another file:
    import { fetchUserProfile } from '../utils/api';
    ```

---

**Conclusion**

ES6 Modules provide a standard, robust way to organize JavaScript code into separate files. Using `export` (named and default) and `import`, you can control which parts of your code are accessible externally, improving reusability, maintainability, and preventing global scope pollution. This system is fundamental to structuring React Native applications, from importing core libraries to organizing your own components and utility functions.

**Further Reading:**

*   MDN: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
*   MDN: [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
*   MDN: [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
*   Exploring JS: [Modules](https://exploringjs.com/es6/ch_modules.html)

**Next:** [Module 10: Conclusion](./10-conclusion.md) 