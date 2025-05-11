## Section 6: ES6 Modules (Import/Export)

> [!TIP]
> Experienced developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
> - [MDN Web Docs: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

ES6 Modules provide a standardized, built-in module system for JavaScript, enabling better code organization, reusability, and maintainability by allowing code to be split into separate files (modules). They help avoid polluting the global namespace and make dependency management more explicit.

#### 6.1. Introduction to Modules

* **Purpose**:
  + **Organization**: Break down large codebases into smaller, more manageable, and self-contained pieces.
  + **Reusability**: Write code once in a module and use it in multiple parts of an application or in different projects.
  + **Encapsulation**: Modules can hide internal implementation details and only expose a public API (Application Programming Interface), preventing unintended external access or modification.
  + **Dependency Management**: Clearly define which other modules a given module depends on.
  + **Namespace Management**: Each module has its own scope, preventing naming conflicts between variables and functions in different modules and avoiding the creation of global variables.
* In the context of React Native, the Metro bundler understands and processes ES6 module syntax to bundle all JavaScript code and assets for the application.

> 🌐 **(Web Developers):**
> > **Comparison:** If you've worked with older JavaScript module systems (like CommonJS used in Node.js or AMD used with RequireJS), ES6 Modules provide a standardized, built-in syntax (`import`/`export`). This is similar to module or package systems in other languages (e.g., `import` in Python, `package`/`import` in Java, `using` in C#).
> >
> > **Key Takeaway:** ES6 Modules are the standard for organizing JavaScript code into reusable units. Understand the difference between named and default exports/imports.
> >
> > **Source:** [MDN Web Docs: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages use module or package systems to organize code and manage dependencies. JavaScript's ES6 Modules (`import`/`export`) serve a similar purpose, allowing you to break your code into separate files and explicitly define what parts are available for use elsewhere. This provides better organization and avoids global namespace pollution, similar to native practices.
> >
> > **Key Takeaway:** ES6 Modules provide a structured way to organize your JavaScript code in React Native, comparable to module systems in native languages.
> >
> > **Source:** [MDN Web Docs: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

#### 6.2. export Statement: Making Code Available

The export statement is used to make variables, functions, or classes from one module available for use in other modules.38

* **Named Exports**:
  + Allow a module to export multiple values, each with a distinct name.
  + **Exporting at declaration**:
    JavaScript
    // in utils.js
    export const PI = 3.14159;
    export function add(a, b) {
     return a + b;
    }
    export class User { /\*... \*/ }
  + **Exporting existing variables/functions (list at the end)**:
    JavaScript
    // in utils.js
    const GREETING = "Hello";
    function multiply(x, y) { return x \* y; }
    //...
    export { GREETING, multiply };
  + **Aliasing exports**: You can export a value under a different name using as.
    JavaScript
    function internalFunctionName() { /\*... \*/ }
    export { internalFunctionName as publicName };
  + A module can have multiple named exports.38
* **Default Exports**:
  + Allows a module to export a single primary value. This is often used for the main functionality or class provided by a module.
  + **Exporting at declaration**:
    JavaScript
    // in MyComponent.js
    export default function MyComponent() { /\*... \*/ }
    // or
    // export default class MyClass { /\*... \*/ }
  + **Exporting an existing value**:
    JavaScript
    // in config.js
    const appConfig = { version: "1.0" };
    export default appConfig;
  + A module can have **only one default export**.38 The name used during import for a default export can be chosen by the importing module.
* **Re-exporting**:
  + Modules can also re-export values from other modules. This is useful for creating "barrel" files that aggregate exports from multiple modules into a single point of access.
  + **Re-exporting named exports**:
    JavaScript
    // in main-utils.js
    export { add, subtract } from './mathUtils.js'; // Re-exports add and subtract
    export { formatCurrency } from './stringUtils.js';
  + **Re-exporting all named exports from another module**:
    JavaScript
    // in services.js
    export \* from './userService.js'; // Re-exports all named exports from userService.js
    // Note: `export \*` does NOT re-export the default export of the other module.[38]
  + **Re-exporting a default export (as named or default)**:
    JavaScript
    // Re-exporting default as named
    export { default as UserClass } from './User.js';
    // Re-exporting default as default (less common for clarity, but possible)
    // export { default } from './User.js';

#### 6.3. import Statement: Bringing Exported Code In

The import statement is used to bring exported variables, functions, or classes from other modules into the scope of the current module.39

* **Named Imports**:
  + Used to import values
