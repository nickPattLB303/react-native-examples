# Module 5: TypeScript Essentials

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

Note: This module builds on JavaScript knowledge. Web and JavaScript developers may find some concepts familiar, while native mobile developers may want to pay special attention to TypeScript's type system which provides structure similar to strongly-typed languages like Swift or Kotlin.

---

## Overview

TypeScript is a powerful superset of JavaScript that adds static typing to the language. In this module, we'll explore TypeScript fundamentals and how they enhance React Native development by catching errors early, improving code quality, and providing better tooling support. TypeScript has become the standard in modern React Native development, making it an essential skill for building robust mobile applications.

Note: TypeScript represents a significant evolution in JavaScript development. As we explore this module, we'll see how TypeScript addresses many of the pain points developers face when building large-scale applications with JavaScript. The static typing system helps catch errors during development rather than at runtime, which is particularly valuable in mobile app development where user experience is critical. For instructors, emphasize that while TypeScript adds some initial complexity, the long-term benefits in code quality, maintainability, and developer productivity are substantial. This module serves as a foundation for all subsequent modules, as we'll be using TypeScript throughout the rest of the course.

---

## Learning Objectives

By the end of this module, you will be able to:

- Understand TypeScript's core concepts and benefits in React Native development
- Define and use TypeScript types, interfaces, and type aliases
- Implement TypeScript with React Native components and props
- Apply TypeScript to improve code quality and developer experience
- Troubleshoot common TypeScript errors in React Native applications
- Leverage TypeScript's advanced features for more robust code

Note: These learning objectives build progressively from fundamental concepts to advanced applications. When teaching this module, it's important to ensure students grasp the basic concepts before moving to more complex topics. The objectives are designed to be practical and directly applicable to React Native development. For native mobile developers, emphasize the parallels between TypeScript's type system and the type systems in Swift or Kotlin. For web developers, highlight how TypeScript extends their existing JavaScript knowledge. Throughout the module, continually relate concepts back to these objectives to help students track their progress and understand the relevance of each topic to their overall learning journey.

---

# Section 1: Introduction to TypeScript

---

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- Superset of JavaScript (all valid JS is valid TS)
- Adds static type-checking to JavaScript
- Compiles down to plain JavaScript
- Developed and maintained by Microsoft
- Open source with a large community

<div class="platform-specific">
<strong>Native Developers:</strong> TypeScript provides type safety similar to Swift or Kotlin, making the transition to React Native more comfortable.
</div>

Note: TypeScript was created by Anders Hejlsberg at Microsoft (who also designed C#) and was first released in 2012. When explaining TypeScript to students, it's crucial to emphasize that TypeScript is a superset of JavaScript, meaning any valid JavaScript code is also valid TypeScript code. This makes the adoption curve much gentler than learning an entirely new language. The TypeScript compiler (tsc) transforms TypeScript code into standard JavaScript that can run in any JavaScript environment, including browsers, Node.js, and React Native's JavaScript runtime.

The key innovation of TypeScript is its optional static typing system. Unlike JavaScript's dynamic typing where variables can change types at runtime, TypeScript allows developers to define explicit types for variables, function parameters, return values, and more. This static typing enables the compiler to catch type-related errors during development rather than at runtime, which is particularly valuable in large codebases and team environments.

For pharmacy/medication examples, you might explain that TypeScript is like having a pharmacist double-check prescriptions before they're filled, catching potential errors before they reach the patient, while JavaScript is like dispensing medication without that verification step.

When teaching this concept, demonstrate how TypeScript's type system can prevent common JavaScript errors like trying to call methods on undefined values or passing the wrong type of arguments to functions. These examples will help students immediately see the practical benefits of TypeScript in their development workflow.

---

## Why TypeScript in React Native?

TypeScript offers significant advantages for React Native development:

- **Catch errors earlier** - Type checking during development instead of runtime
- **Better developer experience** - Improved autocomplete and IntelliSense
- **Self-documenting code** - Types serve as documentation
- **Safer refactoring** - Compiler catches breaking changes
- **Enhanced collaboration** - Clearer contracts between components and functions
- **Better tooling support** - Improved IDE integration

Note: When discussing TypeScript's benefits for React Native development, it's important to contextualize these advantages within the mobile development workflow. React Native applications, once deployed to app stores, are more difficult to update quickly compared to web applications. This makes catching errors during development even more critical.

The "catch errors earlier" benefit is particularly valuable in the React Native context. In traditional JavaScript React Native development, many type-related errors only surface when the app is running, potentially after it has been deployed to users. TypeScript shifts error detection to compile time, allowing developers to fix issues before they reach production.

The "better developer experience" through improved autocomplete and IntelliSense is a significant productivity booster. When working with React Native's component props, state management, and navigation parameters, TypeScript provides real-time feedback about available properties and methods. This is especially helpful when working with third-party libraries and APIs.

"Self-documenting code" means that TypeScript type definitions serve as built-in documentation. This is valuable in team environments where developers need to understand each other's code quickly. For example, when a new developer joins a project, they can immediately see what props a component expects or what shape of data an API function returns.

"Safer refactoring" is crucial in evolving applications. When you need to change a component's props or modify a function's parameters, TypeScript will identify all the places in your codebase that need to be updated. This prevents the common scenario where a change in one part of the application breaks functionality elsewhere.

"Enhanced collaboration" through clearer contracts is essential in team environments. TypeScript creates explicit agreements about the shape of data being passed between components and functions, reducing misunderstandings and integration issues between different parts of the application developed by different team members.

"Better tooling support" extends beyond just code editors. TypeScript integrates well with testing frameworks, build tools, and other development utilities, creating a more robust development ecosystem.

---

## TypeScript vs. JavaScript

Key differences between TypeScript and JavaScript:

- **Type System**: TypeScript adds static typing to JavaScript's dynamic typing
- **Error Detection**: TypeScript catches errors at compile-time vs. runtime
- **Developer Experience**: Enhanced autocomplete and IntelliSense
- **Learning Curve**: Requires understanding the type system
- **Code Safety**: Prevents common type-related bugs
- **Tooling**: Better refactoring and code navigation

Note: When comparing TypeScript and JavaScript, it's important to highlight both the advantages and the learning investment required. TypeScript's static typing system fundamentally changes how developers write and maintain code, shifting error detection from runtime to compile time. This is particularly valuable in larger codebases and team environments where catching errors early saves significant debugging time.

For native mobile developers coming from Swift or Kotlin, TypeScript's type system will feel familiar and provide the structure they're accustomed to. For JavaScript developers, TypeScript represents an evolution that preserves their existing knowledge while adding safety guardrails.

The learning curve is an important consideration - while TypeScript is a superset of JavaScript, mastering its type system takes time. However, the investment pays dividends through improved code quality, better tooling support, and enhanced team collaboration. TypeScript can be adopted incrementally, allowing teams to gradually introduce typing to their codebase.

When teaching this comparison, use concrete examples to demonstrate how TypeScript prevents common JavaScript errors, such as accessing properties on undefined objects or passing incorrect argument types to functions. These practical demonstrations help students immediately see the value proposition of TypeScript in their daily development work.

---

## TypeScript vs. JavaScript: Code Example

```typescript
// JavaScript - No type safety
function calculateDosage(weight, concentration) {
  return weight * concentration / 100; // Potential runtime errors
}

// TypeScript - With type safety
function calculateDosage(weight: number, concentration: number): number {
  return weight * concentration / 100; // Errors caught during development
}
```

Note: This example illustrates one of the fundamental benefits of TypeScript: explicit type annotations. Let's analyze this code in detail to understand the implications.

In the JavaScript version, the function `calculateDosage` accepts two parameters, `weight` and `concentration`, but there's no explicit indication of what types these parameters should be. This creates several potential issues:

1. A developer could call this function with strings instead of numbers (e.g., `calculateDosage("70", "5")`), which would result in string concatenation rather than numerical calculation.
2. The function might receive `undefined` or `null` values, leading to NaN results.
3. There's no indication to other developers what the function returns.
4. IDEs can't provide intelligent code completion or parameter hints.

In contrast, the TypeScript version explicitly declares that both parameters must be numbers and that the function returns a number. This provides several benefits:

1. The TypeScript compiler will flag errors if the function is called with non-number arguments.
2. Other developers can immediately understand what types of values the function expects and returns.
3. IDEs can provide better autocomplete suggestions and parameter hints.
4. Refactoring tools can more reliably identify all usages of the function.

In a medication context, this type safety is crucial. Imagine if a dosage calculation function received a string representation of weight instead of a number - this could lead to incorrect dosage calculations and potentially harmful outcomes for patients. TypeScript helps prevent these kinds of errors by catching them during development.

When teaching this concept, you might ask students to consider what would happen if someone called the JavaScript version with strings or with missing parameters. Then demonstrate how TypeScript would catch these issues before runtime.

---

## TypeScript vs. JavaScript: Feature Comparison

| Feature | JavaScript | TypeScript |
|---------|------------|------------|
| Type System | Dynamic typing | Static typing with dynamic options |
| Errors | Runtime | Compile-time + Runtime |
| Tooling | Good | Excellent (autocomplete, refactoring) |
| Learning Curve | Lower | Moderate (need to learn type system) |
| Adoption | Universal | Growing standard in React Native |
| Code Size | Smaller | Slightly larger source (same after compilation) |

Note: This comparison table highlights key differences between JavaScript and TypeScript that are particularly relevant to React Native developers. Let's explore each row in detail:

**Type System**: JavaScript uses dynamic typing, where variables can change types at runtime and type checking happens during execution. This flexibility can be both a strength and a weakness. TypeScript introduces static typing, where types are checked at compile time, but it preserves the option to use dynamic typing when needed through the `any` type. This hybrid approach gives developers the best of both worlds - the safety of static typing with the flexibility of dynamic typing when appropriate.

**Errors**: In JavaScript, many errors only surface at runtime when the code is executed. This can lead to bugs that only appear under specific conditions or after deployment. TypeScript shifts many of these errors to compile time, catching them before the code runs. This is especially valuable in React Native, where the development-test-deploy cycle can be longer than web development.

**Tooling**: While JavaScript tooling has improved significantly, TypeScript's static type information enables much more powerful tooling. IDEs can provide more accurate autocomplete suggestions, inline documentation, and refactoring tools. This is particularly valuable when working with complex React Native components and APIs.

**Learning Curve**: JavaScript has a lower initial learning curve since it doesn't require understanding a type system. TypeScript adds complexity with its type system, generics, interfaces, and other type-related concepts. However, TypeScript can be adopted incrementally, starting with basic type annotations and gradually incorporating more advanced features.

**Adoption**: JavaScript is universal and runs everywhere. TypeScript has seen rapid adoption, particularly in large-scale applications and frameworks. In the React Native ecosystem specifically, TypeScript has become increasingly standard, with many libraries and tools providing built-in TypeScript support.

**Code Size**: TypeScript source files are typically larger than equivalent JavaScript files due to type annotations. However, after compilation, the JavaScript output is similar in size since type annotations are removed. The slight increase in source code size is generally considered a worthwhile trade-off for the benefits TypeScript provides.

When teaching this comparison, emphasize that TypeScript isn't a replacement for JavaScript but an enhancement. The goal isn't to abandon JavaScript knowledge but to build upon it with additional type safety and tooling benefits.

---

## Setting Up TypeScript in React Native: Creating a New Project

```bash
# Create a new Expo project with TypeScript template
npx create-expo-app MedicationTracker --template expo-template-blank-typescript

# Navigate to the project
cd MedicationTracker
```

Note: Setting up a new React Native project with TypeScript using Expo is straightforward thanks to the built-in TypeScript templates. Let's break down what happens when you run these commands:

When you execute `npx create-expo-app MedicationTracker --template expo-template-blank-typescript`, several things happen behind the scenes:

1. The Expo CLI creates a new project directory called "MedicationTracker"
2. It downloads and installs the blank TypeScript template, which includes:
   - A properly configured `tsconfig.json` file
   - TypeScript as a dependency in `package.json`
   - Type definitions for React, React Native, and Expo
   - Sample TypeScript files instead of JavaScript files
   - ESLint configured for TypeScript

The `--template expo-template-blank-typescript` flag is crucial here - it tells Expo to use the TypeScript template rather than the default JavaScript template. Without this flag, you'd get a JavaScript project that you'd need to convert to TypeScript manually.

After creating the project, you navigate into it with `cd MedicationTracker`. At this point, the project is ready for TypeScript development.

When teaching this setup process, it's worth highlighting a few additional points:

1. Expo handles the complex configuration of TypeScript, Babel, and Metro bundler, making the setup much simpler than in a bare React Native project.
2. The template includes TypeScript definitions for React Native components, so you get type checking and autocomplete for the React Native API.
3. All the usual Expo commands work the same way - `npx expo start` will launch the development server.

For students who are transitioning from JavaScript to TypeScript, emphasize that they can start writing TypeScript code immediately in this project, but they can also write plain JavaScript if they prefer and gradually adopt TypeScript features as they become more comfortable.

---

## Setting Up TypeScript in React Native: Adding to Existing Projects

```bash
# Install TypeScript and type definitions
npx expo install typescript @types/react

# Generate tsconfig.json
npx typescript --init
```

Note: Adding TypeScript to an existing React Native project requires a few more steps than starting with a TypeScript template, but it's still a manageable process. Let's examine what each command does:

The first command, `npx expo install typescript @types/react`, installs two essential packages:
1. `typescript`: The TypeScript compiler itself, which will transform your TypeScript code into JavaScript that React Native can execute.
2. `@types/react`: Type definitions for React. These provide TypeScript with information about React's API, enabling type checking and autocomplete for React features.

Using `npx expo install` instead of `npm install` or `yarn add` is important because it ensures compatibility with your specific Expo SDK version. Expo manages dependency versions carefully to avoid conflicts.

The second command, `npx typescript --init`, generates a `tsconfig.json` file in your project root. This configuration file tells the TypeScript compiler how to process your TypeScript code. The generated file includes default settings that you'll likely need to customize for React Native.

After running these commands, there are several additional steps you should take that aren't shown in the example:

1. Modify the generated `tsconfig.json` to work better with React Native (as shown in the next slide).
2. Install additional type definitions for React Native: `npx expo install @types/react-native`.
3. Rename your `.js` files to `.tsx` for files containing JSX, or `.ts` for plain TypeScript files.
4. Update any import statements that might be affected by the file extensions changing.
5. Start adding type annotations to your code, beginning with the most critical components and functions.

When teaching this process, emphasize that converting to TypeScript can be done incrementally. Developers don't need to add type annotations to every file at once. TypeScript can coexist with JavaScript in the same project, allowing for a gradual transition. This is especially important for larger existing projects where a complete rewrite would be impractical.

Also note that some third-party libraries might not include TypeScript definitions. In these cases, developers might need to install separate `@types/` packages or create their own type definitions.

---

## TypeScript Configuration Example

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2019"],
    "jsx": "react-native",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noEmit": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

Note: The `tsconfig.json` file is the control center for TypeScript in your project. It configures how the TypeScript compiler behaves and affects everything from type checking strictness to which files are included in compilation. Let's examine the key options in this configuration:

**`target`: "esnext"** - This tells TypeScript to compile to the latest ECMAScript version. React Native uses Babel for transpilation, so we can target modern JavaScript features and let Metro/Babel handle compatibility.

**`module`: "commonjs"** - Specifies the module system for the output JavaScript. CommonJS is widely compatible, though you might also use "esnext" here since React Native handles module transformation.

**`lib`: ["es2019"]** - Specifies which built-in API declarations TypeScript should include. "es2019" includes modern JavaScript features like `Array.prototype.flat()` and `Object.fromEntries()`.

**`jsx`: "react-native"** - This is crucial for React Native projects. It tells TypeScript how to handle JSX syntax, preserving it for the React Native bundler rather than transforming it to JavaScript.

**`strict`: true** - Enables all strict type checking options. This provides the highest level of type safety but may require more explicit type annotations. For beginners, you might set this to `false` initially and enable it later.

**`esModuleInterop`: true** - Enables compatibility with Babel-transformed modules, which is important for React Native's ecosystem.

**`skipLibCheck`: true** - Skips type checking of declaration files from libraries. This speeds up compilation and avoids errors in third-party libraries.

**`forceConsistentCasingInFileNames`: true** - Ensures consistent casing in file references, which is important for cross-platform development where some systems are case-sensitive (Linux) and others aren't (Windows).

**`allowSyntheticDefaultImports`: true** - Allows importing modules that don't have a default export as if they did, which is common in the React Native ecosystem.

**`moduleResolution`: "node"** - Tells TypeScript to resolve modules using Node.js resolution strategy, which is appropriate for React Native.

**`resolveJsonModule`: true** - Allows importing JSON files as modules, which is useful for configuration files or static data.

**`noEmit`: true** - Prevents TypeScript from outputting JavaScript files. In React Native, Metro handles the bundling, so we use TypeScript only for type checking.

**`exclude`: ["node_modules"]** - Tells TypeScript not to process files in the node_modules directory, which would be unnecessary and slow.

When teaching about `tsconfig.json`, emphasize that these settings can be adjusted based on project needs. For example, a team might start with less strict settings and gradually increase strictness as they become more comfortable with TypeScript. Also note that some settings might need adjustment based on specific libraries or tools being used in the project.

---

# Section 2: TypeScript Fundamentals

---

## Basic Types

TypeScript provides several basic types that form the foundation of its type system:

- **Primitive types**: string, number, boolean
- **Special types**: null, undefined, any, never
- **Arrays**: string[], number[], Array<Type>
- **Tuples**: fixed-length arrays with specific types for each position
- **Object types**: interfaces and type aliases (covered in later slides)
- **Enum types**: named sets of numeric or string values
- **Union and intersection types**: combining types with | and &

Note: TypeScript's type system is the cornerstone of its value proposition. When teaching basic types, it's important to emphasize that TypeScript's type system is designed to be intuitive for developers coming from both JavaScript and statically-typed languages. The basic types in TypeScript closely mirror JavaScript's runtime types, making the transition smoother for JavaScript developers.

For primitive types (string, number, boolean), explain that these correspond directly to JavaScript's primitive types but with compile-time checking. This means that once a variable is declared as a string, TypeScript will prevent operations that aren't valid for strings, like mathematical operations (except concatenation).

The special types (null, undefined, any, never) serve specific purposes in TypeScript's type system. The `any` type is particularly important to discuss as it effectively opts out of type checking. While it can be useful during migration or for working with dynamic data, overusing `any` defeats the purpose of using TypeScript. The `never` type represents values that never occur - useful for functions that always throw exceptions or never return.

Arrays in TypeScript can be typed in two ways: using the `Type[]` syntax or the generic `Array<Type>` syntax. Both are equivalent, but the first is more commonly used due to its brevity. When teaching arrays, emphasize that TypeScript will ensure operations on the array are valid for its element type.

Tuples are a TypeScript-specific feature not present in JavaScript. They allow you to express an array with a fixed number of elements where each element may have a different type. This is particularly useful for representing pairs or triplets of related values, like coordinates or key-value pairs.

When discussing these types with students, provide real-world examples relevant to medication management to make the concepts more concrete and applicable to their domain. For example, you might demonstrate how a patient record could use various types: strings for names and IDs, numbers for ages and dosages, booleans for allergies and medication status, arrays for medication lists, and tuples for medication-dosage pairs.

It's also important to discuss type inference in this context - TypeScript can often infer the correct type without explicit annotations, but there are cases where explicit typing provides better documentation and prevents errors. Encourage students to find the right balance between relying on inference and adding explicit type annotations.

When teaching primitive types, emphasize that TypeScript's type checking happens at compile time, not runtime. This means that while TypeScript prevents type errors during development, the compiled JavaScript doesn't include any type checking. This is why runtime validation is still important for data from external sources like API responses or user input.

---

## Basic Types: Code Example

```typescript
// Primitive types
const patientName: string = "John Smith";
const patientAge: number = 45;
const isAllergic: boolean = false;

// Special types
const notFound: null = null;
const notSpecified: undefined = undefined;
const unknownValue: any = getSomeExternalData();
const neverReturns: never = function throwError() { 
  throw new Error("This function never returns"); 
};

// Arrays
const medications: string[] = ["Aspirin", "Ibuprofen", "Acetaminophen"];
const dosages: Array<number> = [100, 200, 500]; // Alternative syntax

// Tuples (fixed-length arrays with specific types)
const medicationWithDosage: [string, number] = ["Aspirin", 100];
```

Note: This code example demonstrates the fundamental types in TypeScript using a medication management context. Let's analyze each part in detail:

The primitive types (string, number, boolean) are the building blocks of most TypeScript programs. In this example, we're using them to represent patient information: a name as a string, an age as a number, and an allergic status as a boolean. These type annotations ensure that these variables can only hold values of the specified type.

For instance, if we tried to assign `patientAge = "forty-five"`, TypeScript would raise a compile-time error because we're trying to assign a string to a variable that should only contain numbers. This prevents a common source of bugs in JavaScript where type coercion might lead to unexpected behavior.

The special types section demonstrates some of TypeScript's more unique types:
- `null` and `undefined` are separate types in TypeScript, reflecting JavaScript's two different "empty" values.
- `any` is a special type that effectively turns off type checking for a variable. The example shows it being used for data from an external source where the type might not be known at compile time.
- `never` is used for functions that never return normally (they either throw an exception or run indefinitely). This is useful for error handling functions or for exhaustive type checking.

The arrays section shows two equivalent ways to type arrays in TypeScript:
1. Using the `Type[]` syntax: `medications: string[]` indicates an array where all elements must be strings.
2. Using the generic `Array<Type>` syntax: `dosages: Array<number>` indicates an array where all elements must be numbers.

Both approaches achieve the same result, but the first is more commonly used due to its brevity.

Finally, the tuple example demonstrates how to define an array with a fixed number of elements where each element has a specific type. In this case, `medicationWithDosage` is a pair where the first element must be a string (the medication name) and the second element must be a number (the dosage). Tuples are particularly useful in medication contexts for representing related values like medication-dosage pairs, medication-time pairs, or medication-patient pairs.

When teaching this code, you might ask students to consider what would happen if they tried to assign values of the wrong type to these variables, or if they tried to access a tuple element with an index beyond its length. This helps reinforce the value of TypeScript's type checking.

---

## Type Inference

TypeScript can often infer types without explicit annotations:

- **Variable initialization**: Types inferred from assigned values
- **Function return types**: Inferred from return statements
- **Context typing**: Types determined from the surrounding code
- **Best-practice balance**: Know when to rely on inference vs. explicit types
- **Type widening**: How TypeScript generalizes literal types
- **Const assertions**: Using `as const` to prevent widening
- **Generic inference**: How TypeScript determines type parameters

Note: Type inference is one of TypeScript's most powerful features, allowing developers to benefit from static typing without having to explicitly annotate every variable. When teaching type inference, emphasize that it's not about avoiding type annotations entirely, but about using them strategically where they add the most value.

TypeScript's type inference system is contextual and sophisticated. It can determine types not just from initialization values, but also from how variables are used throughout the code. This bidirectional type inference is particularly powerful in function contexts.

For beginners, it's helpful to explain that TypeScript follows a simple rule: if it can confidently determine a variable's type from its initialization or usage, it will do so. This means developers can often omit type annotations for local variables, especially when they're initialized with literal values or expressions with clear types.

However, there are important cases where explicit type annotations are still recommended:
1. Function parameters, to ensure callers provide the correct types
2. Function return types, to create a clear contract and catch implementation errors
3. Class properties, to document the intended types for maintainers
4. Empty arrays or objects, where TypeScript can't infer the intended element types

When discussing type inference with students, emphasize that it's about finding the right balance. Too few annotations can make code harder to understand and maintain, while too many can create unnecessary verbosity. The goal is to use type annotations where they provide the most value for documentation, error prevention, and developer experience.

Type widening is an important concept to cover when teaching inference. When you initialize a variable with a literal value, TypeScript might "widen" the type to be more general. For example, `let x = 42` infers `x` as `number`, not specifically the literal `42`. This widening behavior can be controlled with const assertions (`as const`), which tell TypeScript to use the most specific type possible.

Context typing is another powerful aspect of TypeScript's inference system. When a function is used in a context where the type is known (like passing a callback to `Array.map()`), TypeScript can infer the parameter types without explicit annotations. This makes code more concise while maintaining type safety.

For React Native developers, type inference is particularly valuable when working with component props, state, and event handlers. TypeScript can often infer the correct types for these elements based on their usage, reducing the need for explicit annotations while still providing type safety.

When teaching inference, demonstrate both successful cases where TypeScript correctly infers types and edge cases where inference fails or produces unexpected results. This helps students develop an intuition for when explicit annotations are necessary.

---

## Type Inference: Code Example

```typescript
// TypeScript infers these types automatically
let patientName = "John Smith";          // inferred as string
let patientAge = 45;                     // inferred as number
let isAllergic = false;                  // inferred as boolean
let medications = ["Aspirin", "Ibuprofen"]; // inferred as string[]

// Type inference with functions
const calculateDosage = (weight: number, multiplier: number) => {
  const result = weight * multiplier;    // inferred as number
  return result;
};
```

Note: This example demonstrates TypeScript's type inference capabilities in a medication management context. Let's examine how TypeScript infers types in each case:

In the first four variable declarations, TypeScript automatically infers the types based on the initialization values:
- `patientName` is inferred as `string` because it's initialized with a string literal.
- `patientAge` is inferred as `number` because it's initialized with a numeric literal.
- `isAllergic` is inferred as `boolean` because it's initialized with a boolean literal.
- `medications` is inferred as `string[]` (an array of strings) because it's initialized with an array containing only string literals.

These inferences are exactly the same as if we had explicitly written the types:
```typescript
let patientName: string = "John Smith";
let patientAge: number = 45;
// etc.
```

The function example demonstrates more complex inference. While we explicitly annotate the function parameters (`weight: number, multiplier: number`), we don't specify the return type. TypeScript infers that `calculateDosage` returns a number because:
1. The function body creates a variable `result` that is inferred as a number (the product of two numbers).
2. The function returns `result`, so the return type is inferred to be the same as `result`'s type.

This is equivalent to explicitly declaring the return type:
```typescript
const calculateDosage = (weight: number, multiplier: number): number => {
  // ...
};
```

It's worth noting that while TypeScript can infer the return type in this simple case, it's often good practice to explicitly annotate return types for functions, especially for public APIs or complex functions. This creates a clear contract and helps catch implementation errors.

When teaching this concept, you might ask students to consider what would happen if the function body changed to return a different type than expected. With an explicit return type annotation, TypeScript would catch this as an error, but without it, the inferred return type would silently change, potentially causing issues elsewhere in the code.

Also point out that type inference becomes particularly valuable when working with complex types or generics, where writing out the full type might be verbose or difficult. In these cases, letting TypeScript infer the types can make code more readable while still maintaining type safety.

---

## Interfaces and Type Aliases

Interfaces and type aliases help define complex object shapes:

- **Interfaces**: Define object structures with required and optional properties
- **Type aliases**: Create named types for any type expression
- **Extension**: Interfaces can extend other interfaces with `extends`
- **Intersection**: Type aliases can combine types with `&`
- **Declaration merging**: Interfaces can be augmented across multiple declarations
- **Readonly properties**: Prevent modification with `readonly` modifier
- **Index signatures**: Define types for dynamic property access
- **Call signatures**: Define function types within interfaces

Note: Interfaces and type aliases are fundamental tools for creating custom types in TypeScript, allowing developers to define the shape of objects and create reusable type definitions. When teaching these concepts, it's important to explain both their similarities and differences.

Interfaces in TypeScript define contracts that objects must adhere to. They're particularly useful for defining the shape of objects, especially when those objects represent entities in your domain model or API responses. Interfaces can be extended (using the `extends` keyword) and implemented by classes, making them ideal for object-oriented programming patterns.

Type aliases, on the other hand, create new names for types. They can represent not just object shapes, but also primitives, unions, tuples, and other more complex types. Type aliases can use the intersection operator (`&`) to combine multiple types.

A key difference to highlight is that interfaces can be augmented after their initial declaration (through declaration merging), while type aliases cannot be changed after being defined. This makes interfaces more flexible in certain scenarios, particularly when working with third-party code or when you need to gradually build up a type definition.

When discussing these concepts with students, emphasize that the choice between interfaces and type aliases often comes down to the specific use case and team preferences. In React Native development, both are commonly used, with interfaces often preferred for component props and API responses, and type aliases often used for unions, intersections, and other complex types.

In a React Native context, interfaces are commonly used to define component props, state shapes, and API response structures. For example, you might create an interface for a medication component's props that specifies what data the component needs to render correctly. This creates a clear contract that both the component and its consumers must follow.

Optional properties, denoted with a question mark (`?`), are particularly useful in React Native development. They allow you to create flexible interfaces where some properties aren't required, which is common in component props where you want to provide sensible defaults for some values.

Readonly properties, marked with the `readonly` modifier, prevent accidental modification of properties after an object is created. This is valuable for immutable data patterns, which are recommended in React Native for performance and predictability.

Index signatures (e.g., `[key: string]: any`) allow you to define types for objects with dynamic property names, which is useful when working with data from APIs or user input where the exact property names aren't known in advance.

When teaching interfaces and type aliases, demonstrate how they improve code quality through better documentation, error prevention, and IDE support. Show examples of how TypeScript can catch errors when an object doesn't conform to an interface, and how interfaces make refactoring safer by identifying all places that need to be updated when an interface changes.

---

## Interfaces and Type Aliases: Code Example

```typescript
// Interface definition
interface Medication {
  id: string;
  name: string;
  dosage: number;
  unit: string;
  frequency: number;
  instructions?: string; // Optional property
}

// Using the interface
const aspirin: Medication = {
  id: "med-001",
  name: "Aspirin",
  dosage: 100,
  unit: "mg",
  frequency: 2,
  instructions: "Take with food"
};

// Type alias (alternative to interface)
type Patient = {
  id: string;
  name: string;
  age: number;
  medications: Medication[];
};

// Using the type alias
const patient: Patient = {
  id: "pat-001",
  name: "John Smith",
  age: 45,
  medications: [aspirin]
};
```

Note: This example demonstrates how to define and use interfaces and type aliases in a medication management context. Let's analyze the code in detail:

The `Medication` interface defines the shape that all medication objects must conform to. It specifies six properties:
- `id`: A string that uniquely identifies the medication
- `name`: A string representing the medication's name
- `dosage`: A number indicating the amount of medication
- `unit`: A string specifying the unit of measurement (e.g., "mg", "ml")
- `frequency`: A number indicating how many times per day the medication should be taken
- `instructions`: An optional string (denoted by the `?` modifier) providing additional instructions

The question mark (`?`) after `instructions` makes this property optional, meaning objects can still conform to the `Medication` interface even if they don't have an `instructions` property. This is particularly useful for modeling real-world data where some fields might not always be present.

After defining the interface, we create an object `aspirin` that conforms to the `Medication` interface. TypeScript will verify that this object has all the required properties with the correct types. If we were to omit a required property or provide a value of the wrong type, TypeScript would raise a compile-time error.

Next, we define a `Patient` type using a type alias. This type represents a patient with:
- `id`: A string that uniquely identifies the patient
- `name`: A string representing the patient's name
- `age`: A number indicating the patient's age
- `medications`: An array of `Medication` objects associated with the patient

This demonstrates how types can be composed - the `Patient` type references the `Medication` interface for its `medications` property. This composition is a powerful feature of TypeScript's type system, allowing you to build complex types from simpler ones.

Finally, we create a `patient` object that conforms to the `Patient` type, including a reference to the previously defined `aspirin` medication.

When teaching this code, emphasize that interfaces and type aliases provide several benefits:
1. **Documentation**: They clearly communicate the expected structure of objects.
2. **Validation**: TypeScript will catch errors if objects don't conform to the expected shape.
3. **Intellisense**: IDEs can provide autocomplete and type information based on these definitions.
4. **Reusability**: Once defined, these types can be reused throughout the codebase.

You might also discuss how these types would be used in a React Native application - for example, the `Medication` interface might define the shape of data received from an API or stored in a local database, while component props might use these types to ensure they receive the expected data.

---

## Union and Intersection Types

Union types allow a value to be one of several types, while intersection types combine multiple types:

- **Union types**: Combine types with the `|` operator (OR relationship)
- **Intersection types**: Combine types with the `&` operator (AND relationship)
- **Type narrowing**: Refining union types within conditional blocks
- **Discriminated unions**: Using a common property to distinguish between union members
- **Type guards**: Functions that check and narrow types at runtime
- **Type predicates**: Custom type guards with `paramName is Type` return types
- **Exhaustiveness checking**: Ensuring all variants of a union are handled
- **Distributive conditional types**: How unions distribute in conditional types

Note: Union and intersection types are powerful features in TypeScript that enable more flexible and precise type definitions. When teaching these concepts, it's helpful to use analogies from set theory: union types represent the union of sets (A OR B), while intersection types represent the intersection of sets (A AND B).

Union types, denoted by the `|` operator, allow a value to be one of several types. This is particularly useful for functions that can accept different types of input or for variables that might hold different types of values at different times. In React Native development, union types are commonly used for component props that can accept multiple types of values, such as a string or a number for a size prop.

Intersection types, denoted by the `&` operator, combine multiple types into one. This is useful for composing complex types from simpler ones, particularly when you want to merge the properties of multiple interfaces. In React Native, intersection types are often used to combine multiple prop types or to extend existing types with additional properties.

When discussing these concepts with students, emphasize that union and intersection types provide a way to model complex relationships between types that would be difficult or impossible to express with just interfaces or classes. They're particularly valuable in functional programming patterns and when working with complex data structures.

Type narrowing is a crucial concept to teach alongside union types. When you have a variable of a union type, you often need to determine which specific type you're working with before you can safely use type-specific operations. TypeScript uses control flow analysis to narrow types within conditional blocks based on type guards like `typeof`, `instanceof`, or property checks.

Discriminated unions (also called tagged unions) are a powerful pattern where each member of a union contains a common property (the "tag") that can be used to distinguish between them. This pattern is particularly valuable in React Native for modeling different states of a component or different types of API responses.

For example, in a medication tracking app, you might use a discriminated union to represent different types of medications (tablets, liquids, inhalers) where each type has its own specific properties but shares a common `type` property that identifies it.

Type guards and type predicates allow you to create custom functions that help TypeScript narrow types. This is especially useful for complex type checking that can't be expressed with simple operators like `typeof`. Type predicates (functions that return `paramName is Type`) tell TypeScript that if the function returns true, the parameter is of the specified type.

Exhaustiveness checking is a technique that ensures you've handled all possible variants of a union type. By using a switch statement with a default case that assigns a value to a variable of type `never`, TypeScript will raise an error if you haven't covered all possibilities. This is invaluable for ensuring robust code that handles all potential cases.

---

## Union and Intersection Types: Code Example

```typescript
// Union type (OR)
type MedicationIdentifier = string | number;

function getMedication(id: MedicationIdentifier) {
  // Function can accept either string or number
  console.log(`Fetching medication with ID: ${id}`);
}

getMedication("med-001");  // Valid
getMedication(12345);      // Also valid

// Intersection type (AND)
interface MedicationBase {
  name: string;
  dosage: number;
}

interface MedicationInstructions {
  frequency: number;
  instructions: string;
}

// Combines both interfaces
type CompleteMedication = MedicationBase & MedicationInstructions;

const tylenol: CompleteMedication = {
  name: "Tylenol",
  dosage: 500,
  frequency: 4,
  instructions: "Take every 6 hours as needed for pain"
};
```

Note: This example demonstrates union and intersection types in a medication management context. Let's analyze each part in detail:

The first section introduces union types with `MedicationIdentifier`, which can be either a string or a number. This is denoted by the `|` operator, which can be read as "or". This union type is useful because medication identifiers might be represented differently in different systems - some might use string IDs like "med-001", while others might use numeric IDs like 12345.

The `getMedication` function accepts a parameter of type `MedicationIdentifier`, meaning it can be called with either a string or a number. Inside the function, TypeScript knows that `id` is either a string or a number, so it only allows operations that are valid for both types. For example, you can use string interpolation with both strings and numbers, but you couldn't call string-specific methods like `id.toUpperCase()` without first checking that `id` is a string.

The function calls demonstrate that `getMedication` can indeed be called with either a string or a number argument, showcasing the flexibility of union types.

The second section demonstrates intersection types. We define two interfaces:
- `MedicationBase` with basic medication properties (name and dosage)
- `MedicationInstructions` with properties related to how the medication should be taken (frequency and instructions)

We then create a new type `CompleteMedication` using the `&` operator, which combines all properties from both interfaces. This can be read as "and" - a `CompleteMedication` must have all properties from `MedicationBase` AND all properties from `MedicationInstructions`.

The `tylenol` object demonstrates using this intersection type. It must include all four properties from both interfaces to be valid. If any property were missing, TypeScript would raise a compile-time error.

When teaching this code, emphasize several key points:
1. Union types provide flexibility by allowing multiple possible types for a value.
2. Intersection types create more complex types by combining existing ones.
3. Both union and intersection types can be used with any TypeScript types, not just interfaces.
4. These type operators can be combined to create even more complex types.

In a React Native context, you might discuss how union types are particularly useful for component props that can accept different types of values, while intersection types are useful for combining different sets of props or for extending existing types with additional properties.

You could also discuss type narrowing - the process of refining a union type to a more specific type within a conditional block, which is essential when working with union types:

```typescript
function processMedication(id: MedicationIdentifier) {
  if (typeof id === 'string') {
    // In this block, TypeScript knows id is a string
    return id.toUpperCase();
  } else {
    // In this block, TypeScript knows id is a number
    return id.toFixed(0);
  }
}
```

---

## Enums and Literal Types

Enums and literal types help define a fixed set of allowed values:

- **Enums**: Named sets of numeric or string values
- **Numeric enums**: Auto-incremented numeric values (default)
- **String enums**: Explicitly assigned string values
- **Const enums**: Inlined at compile time for better performance
- **String literal types**: Exact string values (e.g., `"small" | "medium" | "large"`)
- **Numeric literal types**: Exact number values (e.g., `1 | 2 | 3`)
- **Boolean literal types**: `true` or `false` specifically
- **Template literal types**: Generate string literals from patterns

Note: Enums and literal types are powerful features in TypeScript for restricting values to a specific set of options. When teaching these concepts, emphasize that they provide both type safety and semantic meaning to your code.

Enums in TypeScript create named constants that can make code more readable and self-documenting. They're particularly useful for representing a fixed set of related values, such as status codes, categories, or modes. In a medication context, enums might represent medication categories, dosage forms, or frequency patterns.

There are several types of enums in TypeScript:
1. Numeric enums (default): Values are automatically assigned incremental numbers starting from 0
2. String enums: Each value is explicitly assigned a string
3. Heterogeneous enums: Mix of string and numeric values (generally not recommended)
4. Const enums: Inlined at compile time for better performance

String enums (as shown in the example) are often preferred because they provide more meaningful values when debugging and are more self-documenting.

Literal types, on the other hand, allow you to specify the exact values a variable can have. They can be string literals, number literals, boolean literals, or even object literals. Literal types are particularly useful when you want to restrict a value to a specific set of strings or numbers without creating a full enum.

When discussing these concepts with students, highlight that both enums and literal types serve similar purposes but have different use cases. Enums are better for related constants that might be used throughout the codebase, while literal types are often more lightweight and flexible, especially for function parameters or return types.

In React Native development, enums and literal types are particularly valuable for component props that should only accept specific values. For example, a `Button` component might have a `size` prop that only accepts "small", "medium", or "large", which could be defined as a string literal type: `type ButtonSize = "small" | "medium" | "large"`.

Template literal types, introduced in TypeScript 4.1, allow you to create more complex string literal types by combining existing string literals. For example, you could define a type for valid CSS color names: `type Color = "red" | "green" | "blue"` and then create a type for button variants: `type ButtonVariant = `${Color}Button``, which would generate "redButton", "greenButton", and "blueButton".

When teaching enums, it's important to discuss their runtime behavior. Unlike most TypeScript features that are erased during compilation, enums generate actual JavaScript code. This can be an advantage (the enum values are available at runtime) or a disadvantage (they increase bundle size). Const enums address this by being completely inlined at compile time, but they can't be used in all scenarios.

For React Native applications, string enums are often the best choice because they provide meaningful values in logs and debugging tools, making it easier to understand the application state during development and troubleshooting.

---

## Enums and Literal Types: Code Example

```typescript
// Enum definition
enum MedicationCategory {
  Analgesic = "analgesic",
  Antibiotic = "antibiotic",
  Antihistamine = "antihistamine",
  Antidepressant = "antidepressant"
}

// Using the enum
const aspirin = {
  name: "Aspirin",
  category: MedicationCategory.Analgesic
};

// String literal types
type DosageUnit = "mg" | "ml" | "mcg" | "g";

function formatDosage(value: number, unit: DosageUnit) {
  return `${value}${unit}`;
}

formatDosage(500, "mg");  // Valid
// formatDosage(10, "oz");   // Error: Argument of type '"oz"' is not assignable to parameter of type 'DosageUnit'
```

Note: This example demonstrates enums and literal types in a medication management context. Let's analyze each part in detail:

The first section defines a string enum `MedicationCategory` with four possible values representing different categories of medications. Each enum member is explicitly assigned a string value. Using a string enum (rather than the default numeric enum) makes the values more meaningful when debugging or logging.

The enum provides several benefits:
1. It creates a namespace for related values, making the code more organized.
2. It provides type safety - TypeScript will ensure that variables of type `MedicationCategory` can only be assigned one of the defined enum values.
3. It improves code readability and maintainability by giving meaningful names to values.

The `aspirin` object demonstrates using the enum. The `category` property is assigned `MedicationCategory.Analgesic`, which has the string value "analgesic". Using the enum member rather than the string directly makes the code more maintainable - if the string value needs to change, it only needs to be updated in the enum definition.

The second section demonstrates string literal types with `DosageUnit`. This type can only be one of four specific strings: "mg", "ml", "mcg", or "g". This is defined using the union type operator (`|`) to combine multiple string literals.

The `formatDosage` function accepts a number and a `DosageUnit` as parameters. The function concatenates the value and unit to create a formatted dosage string. Because the `unit` parameter is restricted to the `DosageUnit` type, TypeScript will ensure that only valid units are passed to the function.

The function calls demonstrate this type checking:
- `formatDosage(500, "mg")` is valid because "mg" is one of the allowed values in the `DosageUnit` type.
- If we were to uncomment `formatDosage(10, "oz")`, TypeScript would raise a compile-time error because "oz" is not included in the `DosageUnit` type.

When teaching this code, emphasize several key points:
1. Enums provide a way to define a set of named constants, improving code readability and maintainability.
2. String literal types offer a lightweight alternative when you just need to restrict a value to a specific set of strings.
3. Both features provide compile-time type checking, preventing invalid values from being used.
4. These types are particularly valuable in healthcare applications where using the correct units and categories is critical for patient safety.

In a React Native context, you might discuss how enums and literal types can be used for component props to restrict values to a specific set of options. For example, a `MedicationCard` component might accept a `category` prop of type `MedicationCategory` or a `size` prop of type `"small" | "medium" | "large"`.

You could also discuss how these types integrate with TypeScript's autocomplete features in modern IDEs, making it easier for developers to see and select from the available options.

---

## Exercise

<div class="exercise">

### Exercise: Medication Types

**Objective:** Create TypeScript interfaces and types for a medication tracking application.

**Time:** 15-20 minutes

**Instructions:**
1. Create a new Expo TypeScript project: `npx create-expo-app MedicationTypes --template expo-template-blank-typescript`
2. Navigate to the project: `cd MedicationTypes`
3. Create a new file called `types.ts` in the project root
4. Define the following types:
   - An enum for `MedicationForm` (tablet, capsule, liquid, etc.)
   - An interface for `Medication` with properties for id, name, dosage, form, etc.
   - A type for `Prescription` that includes medication, patient info, and dosing schedule
5. Export all types from the file
6. Create a file called `sample-data.ts` that imports and uses these types
7. Run the project with `npx expo start` to verify there are no type errors

**Resources:**
- [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Expo Snack](https://snack.expo.dev/)

</div>

---

# Section 3: TypeScript with React Native

---

## Typing Component Props

TypeScript enhances React Native components with prop type checking:

- **Interface definition**: Define prop types with interfaces
- **Required vs optional**: Mark optional props with `?`
- **Function props**: Type function props with parameter and return types
- **React.FC<Props>**: Use generic type for function components
- **Prop destructuring**: Destructure props with proper types
- **Default props**: Type-safe default prop values
- **Prop validation**: Catch invalid props at compile time
- **Children prop**: Type the children prop appropriately
- **Generic components**: Create reusable components with type parameters
- **Prop composition**: Combine multiple prop interfaces


Note: Typing component props is one of the most immediate benefits of using TypeScript with React Native. When teaching this concept, emphasize that properly typed props create a clear contract between components, making them more maintainable and less prone to errors.

In React Native, components often accept a variety of props that control their appearance and behavior. Without TypeScript, it's easy to pass incorrect prop types or forget required props, leading to runtime errors or unexpected behavior. TypeScript helps prevent these issues by checking prop types at compile time.

The `interface` keyword is used to define the shape of the props object. Each property in the interface represents a prop that the component can receive, with its corresponding type. Required props are defined normally, while optional props are marked with a question mark (`?`).

The `React.FC<Props>` type (Function Component) is a generic type that takes your props interface as its type parameter. It includes the `children` prop automatically, which is useful for components that might wrap other components. However, you can also define components without using `React.FC`, which gives you more explicit control over whether the component accepts children.

When discussing this with students, highlight that well-typed props provide several benefits:
1. Documentation - The props interface clearly communicates what props a component expects
2. Validation - TypeScript will catch errors if you pass the wrong type or forget a required prop
3. Autocomplete - IDEs can provide intelligent suggestions based on the props interface
4. Refactoring - When you change a component's props, TypeScript will identify all places that need updates

For React Native specifically, typed props are particularly valuable when working with complex component libraries or when building reusable component systems.

---

## Typing Component Props: Code Example

```typescript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Define props interface
interface MedicationItemProps {
  name: string;
  dosage: number;
  unit: string;
  isActive: boolean;
  onPress: () => void;
}

// Use the interface with the component
const MedicationItem: React.FC<MedicationItemProps> = ({ 
  name, 
  dosage, 
  unit, 
  isActive, 
  onPress 
}) => {
  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <Text style={styles.name} onPress={onPress}>
        {name}
      </Text>
      <Text style={styles.dosage}>
        {dosage}{unit}
      </Text>
    </View>
  );
};

// Usage
export default function MedicationList() {
  return (
    <View>
      <MedicationItem
        name="Aspirin"
        dosage={100}
        unit="mg"
        isActive={true}
        onPress={() => console.log('Pressed Aspirin')}
      />
      {/* TypeScript would error if we forgot a required prop */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activeContainer: {
    backgroundColor: '#e6f7ff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

Note: This example demonstrates how to type component props in a React Native application using TypeScript. Let's analyze it in detail:

First, we define an interface `MedicationItemProps` that specifies the shape of the props our component will accept:
- `name`: A string representing the medication name
- `dosage`: A number representing the medication dosage amount
- `unit`: A string representing the unit of measurement (e.g., "mg", "ml")
- `isActive`: A boolean indicating whether the medication is active
- `onPress`: A function that takes no arguments and returns nothing (void), which will be called when the medication item is pressed

By defining this interface, we create a clear contract for what props the `MedicationItem` component requires. This helps prevent common errors like forgetting required props or passing props of the wrong type.

Next, we define the `MedicationItem` component using the `React.FC<MedicationItemProps>` type. The `FC` stands for "Function Component," and the generic parameter `MedicationItemProps` specifies the type of props this component accepts. We destructure the props in the function parameters, which makes the code cleaner and allows TypeScript to check that we're using all props correctly within the component.

Inside the component, we use the props to render a medication item with conditional styling based on the `isActive` prop. The expression `[styles.container, isActive && styles.activeContainer]` is a common React Native pattern for conditional styling - if `isActive` is true, both style objects will be applied; if false, only `styles.container` will be applied.

The `MedicationList` component demonstrates how to use our typed component. When we render `<MedicationItem>`, TypeScript checks that we're providing all required props with the correct types. If we were to omit a required prop or provide a prop of the wrong type (e.g., passing a string for `dosage` instead of a number), TypeScript would raise a compile-time error.

When teaching this example, emphasize several key points:
1. The props interface serves as both documentation and validation for the component.
2. TypeScript ensures that all required props are provided and that they have the correct types.
3. The IDE can provide autocomplete suggestions based on the props interface.
4. If the component's requirements change (e.g., adding a new required prop), TypeScript will identify all places where the component is used that need to be updated.

You might also discuss alternative approaches, such as:
- Using a type alias with `type` instead of `interface`
- Defining the component without `React.FC` for more explicit control over children
- Using more complex prop types like unions, intersections, or generics for more flexible components

This pattern of defining prop interfaces and typed components is fundamental to TypeScript React Native development and will be used throughout the application.

---

## Optional and Default Props

TypeScript allows you to specify optional props and default values:

- **Optional props**: Use the `?` modifier to mark props as optional
- **Default values**: Provide fallback values for optional props
- **Required vs optional**: Balance between enforcing requirements and flexibility
- **Type safety**: TypeScript ensures optional props are used correctly when provided
- **Documentation**: Optional props are self-documenting in the type definition
- **Prop spreading**: Safely pass optional props to child components
- **Conditional rendering**: Handle optional props in component logic
- **Prop groups**: Organize related optional props into nested objects


Note: Optional props and default values are essential features in TypeScript React Native development that provide flexibility and improve component reusability. When teaching these concepts, emphasize that they allow components to be more adaptable to different use cases while maintaining type safety.

In TypeScript, optional props are denoted by adding a question mark (`?`) after the property name in an interface or type definition. This tells TypeScript that the property doesn't have to be provided when using the component. Without this marker, TypeScript would require all properties to be specified, which can make components rigid and harder to use in different contexts.

Default values work hand-in-hand with optional props. While optional props indicate that a property doesn't need to be provided, default values specify what value to use when the prop is omitted. This is implemented using JavaScript's destructuring assignment with default values in the component parameters.

The combination of optional props and default values enables several important patterns in React Native development:
1. Progressive disclosure - Components can start with minimal required props and offer additional customization options
2. Sensible defaults - Components can work "out of the box" with reasonable default behavior
3. Backward compatibility - New props can be added without breaking existing usage
4. Contextual adaptation - Components can adapt their appearance or behavior based on provided props

When discussing these concepts with students, highlight that well-designed components often have a small set of required props that define their core functionality, with additional optional props that allow for customization. This approach makes components more flexible and easier to use across different parts of an application.

Also note that while TypeScript ensures type safety for props that are provided, it doesn't guarantee that default values are of the correct type - that's the developer's responsibility. This is why it's important to be careful when defining default values to ensure they match the expected type.

---

## Optional and Default Props: Code Example

```typescript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DosageIndicatorProps {
  value: number;
  maxValue: number;
  unit: string;
  showPercentage?: boolean; // Optional prop
  color?: string;           // Optional prop
}

// Component with default props
const DosageIndicator: React.FC<DosageIndicatorProps> = ({ 
  value, 
  maxValue, 
  unit, 
  showPercentage = false, // Default value
  color = '#007AFF'       // Default value
}) => {
  const percentage = Math.round((value / maxValue) * 100);
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.indicator, 
          { width: `${percentage}%`, backgroundColor: color }
        ]} 
      />
      <Text style={styles.text}>
        {value}{unit} {showPercentage && `(${percentage}%)`}
      </Text>
    </View>
  );
};

// Usage
export default function DosageScreen() {
  return (
    <View style={styles.screen}>
      <DosageIndicator 
        value={500} 
        maxValue={1000} 
        unit="mg" 
      />
      <DosageIndicator 
        value={750} 
        maxValue={1000} 
        unit="mg" 
        showPercentage={true} 
        color="#27AE60" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  container: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    lineHeight: 20,
  },
});
```

Note: This example demonstrates how to implement optional props and default values in a React Native component using TypeScript. Let's analyze it in detail:

First, we define an interface `DosageIndicatorProps` that specifies the shape of the props our component will accept:
- `value`: A required number representing the current dosage value
- `maxValue`: A required number representing the maximum possible dosage
- `unit`: A required string representing the unit of measurement (e.g., "mg", "ml")
- `showPercentage`: An optional boolean (denoted by the `?`) that determines whether to display the percentage
- `color`: An optional string (denoted by the `?`) that specifies the color of the indicator

The question mark (`?`) after `showPercentage` and `color` makes these props optional, meaning they don't have to be provided when using the component. Without the question mark, TypeScript would require these props to be specified.

Next, we define the `DosageIndicator` component using the `React.FC<DosageIndicatorProps>` type. In the component parameters, we destructure the props and provide default values for the optional props:
- `showPercentage = false`: If not provided, `showPercentage` defaults to `false`
- `color = '#007AFF'`: If not provided, `color` defaults to the blue color `'#007AFF'`

These default values ensure that the component works correctly even when the optional props are omitted. Inside the component, we calculate the percentage and render a visual indicator with the appropriate width and color, along with a text label that optionally includes the percentage.

The `DosageScreen` component demonstrates how to use our `DosageIndicator` component with different prop combinations:
1. The first instance provides only the required props (`value`, `maxValue`, and `unit`), relying on the default values for `showPercentage` and `color`.
2. The second instance provides all props, including the optional ones, overriding the default values.

This example illustrates several key points about optional props and default values:
1. They make components more flexible and reusable by allowing different configurations.
2. They provide sensible defaults while allowing customization when needed.
3. They reduce the amount of code needed when using components in their default configuration.
4. They maintain type safety by ensuring that when optional props are provided, they have the correct type.

When teaching this pattern, emphasize that it's a best practice to make props that control non-essential features optional with reasonable defaults, while keeping props that are fundamental to the component's functionality required. This creates components that are both easy to use and flexible.

---

## Typing Component State

TypeScript helps ensure state updates are type-safe:

- **useState hook**: Type-safe state initialization and updates
- **State interfaces**: Define the shape of complex state objects
- **Generic types**: Type-safe state with generics
- **State updates**: Type-safe state update functions
- **Form state**: Type-safe form handling and validation
- **Error state**: Type-safe error handling in state
- **Loading state**: Type-safe loading state management
- **State composition**: Combining multiple state pieces

Note: Managing state is a critical aspect of React Native development, and TypeScript adds an extra layer of safety and clarity to this process. When teaching about typing component state, it's important to emphasize how TypeScript helps prevent common state-related bugs and improves the developer experience.

In React Native applications, component state often contains complex data structures with multiple properties of different types. Without TypeScript, it's easy to make mistakes when updating this state, such as misspelling property names, using incorrect types, or forgetting to include required properties. These mistakes can lead to subtle bugs that are difficult to track down.

TypeScript addresses these issues by allowing developers to define explicit interfaces for their state objects. These interfaces serve as contracts that specify exactly what properties the state should have and what types those properties should be. The TypeScript compiler then ensures that all state operations conform to this contract.

When using the `useState` hook with TypeScript, you can provide a type parameter that specifies the shape of your state. This enables TypeScript to verify that your initial state and all subsequent state updates match the expected structure. For complex state objects, it's a best practice to define a separate interface rather than inline the type, as this makes the code more readable and allows the interface to be reused if needed.

For form state specifically, TypeScript offers significant benefits. Forms typically have multiple fields with different validation requirements, and keeping track of the state for each field can be challenging. TypeScript helps by ensuring that you're accessing valid field names and handling each field's value according to its expected type.

The `keyof` operator is particularly useful when working with form state. It allows you to create functions that can operate on any field in your state object while still maintaining type safety. Combined with TypeScript's indexed access types, this enables you to create flexible, reusable functions for updating form fields.

Error handling in forms also benefits from TypeScript's type system. By including error messages in your state interface, you can ensure that errors are properly tracked and displayed for each field. This helps create a more robust user experience by providing clear feedback when validation fails.

When teaching this concept, emphasize that while adding types to state requires some upfront investment, it pays dividends through improved code quality, better IDE support, and fewer runtime errors. Encourage students to start with simple state typing and gradually adopt more advanced patterns as they become comfortable with TypeScript.

---

## Typing Component State: Code Example

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Define the state interface
interface MedicationFormState {
  name: string;
  dosage: string; // Using string for input, will convert to number later
  frequency: number;
  notes: string;
  errors: {
    name?: string;
    dosage?: string;
  };
}

export default function MedicationForm() {
  // Initialize state with the interface
  const [formState, setFormState] = useState<MedicationFormState>({
    name: '',
    dosage: '',
    frequency: 1,
    notes: '',
    errors: {}
  });

  // Type-safe state updates
  const updateField = (field: keyof Omit<MedicationFormState, 'errors'>, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: field === 'frequency' ? parseInt(value) || 1 : value,
      errors: {
        ...prevState.errors,
        [field]: undefined // Clear error when field is updated
      }
    }));
  };

  const validateForm = (): boolean => {
    const errors: MedicationFormState['errors'] = {};
    
    if (!formState.name.trim()) {
      errors.name = 'Medication name is required';
    }
    
    if (!formState.dosage.trim()) {
      errors.dosage = 'Dosage is required';
    } else if (isNaN(parseFloat(formState.dosage))) {
      errors.dosage = 'Dosage must be a number';
    }
    
    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', {
        ...formState,
        dosage: parseFloat(formState.dosage) // Convert to number
      });
      // Submit logic here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Medication Name</Text>
      <TextInput
        style={styles.input}
        value={formState.name}
        onChangeText={(value) => updateField('name', value)}
        placeholder="Enter medication name"
      />
      {formState.errors.name && (
        <Text style={styles.errorText}>{formState.errors.name}</Text>
      )}

      <Text style={styles.label}>Dosage</Text>
      <TextInput
        style={styles.input}
        value={formState.dosage}
        onChangeText={(value) => updateField('dosage', value)}
        placeholder="Enter dosage"
        keyboardType="numeric"
      />
      {formState.errors.dosage && (
        <Text style={styles.errorText}>{formState.errors.dosage}</Text>
      )}

      <Text style={styles.label}>Frequency (times per day)</Text>
      <TextInput
        style={styles.input}
        value={formState.frequency.toString()}
        onChangeText={(value) => updateField('frequency', value)}
        placeholder="Enter frequency"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formState.notes}
        onChangeText={(value) => updateField('notes', value)}
        placeholder="Enter additional notes"
        multiline
      />

      <Button title="Save Medication" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
```

Note: This example demonstrates a comprehensive approach to typing component state in a React Native form. Let's analyze the key TypeScript features and patterns used in this code.

First, we define an interface `MedicationFormState` that specifies the exact shape of our form state. This interface includes fields for the medication name, dosage, frequency, and notes, as well as an errors object for validation messages. Notice that we're using a string for the dosage input even though it represents a number - this is a common pattern in forms since TextInput components work with string values, which we'll convert to a number when submitting.

The errors object uses optional properties (indicated by the `?` modifier) since not every field will have an error at all times. This is a good example of how TypeScript's optional properties can model real-world scenarios where some data might not always be present.

When initializing state with `useState`, we provide the `MedicationFormState` interface as a type parameter: `useState<MedicationFormState>`. This tells TypeScript that our state must conform to this interface, and it will check that our initial state object includes all required properties with the correct types.

The `updateField` function demonstrates several advanced TypeScript features:
1. It uses `keyof Omit<MedicationFormState, 'errors'>` to create a type that represents all field names in our state except 'errors'. This ensures that we can only update valid fields.
2. It uses a computed property name with `[field]` to dynamically update the correct property based on the field parameter.
3. It includes type-specific logic, converting string inputs to numbers for the frequency field.

The `validateForm` function shows how to use TypeScript with form validation. It creates an errors object that matches the shape defined in our interface (`MedicationFormState['errors']`), performs validation checks, and updates the state with any validation errors. The function returns a boolean indicating whether the form is valid, which is used in the submit handler.

The component's JSX demonstrates conditional rendering based on the presence of errors. For each field that has an error message, we display a text element with the error. TypeScript ensures that we're accessing valid properties of the errors object.

When teaching this example, highlight how TypeScript helps prevent common mistakes:
- It ensures we don't misspell field names when updating state
- It verifies that we're using the correct types for each field
- It helps us handle the conversion between string inputs and numeric values
- It makes our error handling more robust by ensuring we're checking for errors correctly

This pattern of defining a state interface, using it with useState, and creating type-safe update functions can be applied to any React Native component with complex state, not just forms. It's a powerful way to leverage TypeScript's type system to create more reliable and maintainable components.

Key TypeScript features demonstrated:
- State interface definition
- Generic useState with type parameter
- Using `keyof` to ensure field names are valid
- Type-safe error handling

---

## Typing Event Handlers

TypeScript helps ensure event handlers are properly typed:

- **GestureResponderEvent**: Type for touch events
- **TextInputChangeEventData**: Type for text input changes
- **NativeSyntheticEvent**: Base type for native events
- **Event handler props**: Type-safe event handler props
- **Custom event types**: Creating custom event types
- **Event transformation**: Type-safe event data transformation
- **Event parameter typing**: Proper typing of event parameters
- **Event handler composition**: Combining multiple handlers

Note: Event handling is a fundamental aspect of React Native development, and TypeScript adds significant value by ensuring that event handlers are correctly typed. When teaching this concept, it's important to emphasize how TypeScript's type system helps prevent common errors and improves the developer experience when working with events.

React Native's event system differs from web React in several important ways. While web React uses synthetic events that closely mirror DOM events, React Native has its own set of event types that are specific to mobile interactions. This makes TypeScript particularly valuable, as it can be difficult to remember the exact structure of these event objects without type assistance.

One of the key challenges in React Native event handling is that different components emit different types of events. For example, a TouchableOpacity component's onPress handler receives a GestureResponderEvent, while a TextInput component's onChange handler receives a NativeSyntheticEvent<TextInputChangeEventData>. Without TypeScript, developers might try to access properties that don't exist on a particular event type, leading to runtime errors.

TypeScript addresses this challenge by providing specific event types for different React Native components. These types define exactly what properties and methods are available on each event object, allowing the compiler to catch errors when you try to access non-existent properties. This is particularly valuable when working with complex event objects that have nested properties.

When defining component props that include event handlers, TypeScript allows you to specify the exact signature of these handlers. This creates a clear contract between components, ensuring that event handlers are called with the correct parameters. For example, you can define a prop that expects a function that takes a GestureResponderEvent parameter, and TypeScript will ensure that any function passed to this prop has a compatible signature.

Another important pattern in React Native is creating custom event handlers that transform or augment the original event. For example, you might have a component that receives a generic onPress handler but needs to pass additional context when that handler is called. TypeScript helps ensure that these transformations are type-safe, preventing errors when the transformed event is passed to the original handler.

When teaching event handling with TypeScript, it's important to emphasize that the goal is not just to satisfy the type checker, but to create more robust and self-documenting code. Well-typed event handlers make it clear what data is available in each event and how that data should be used, which improves code maintainability and reduces the likelihood of bugs.

For students transitioning from JavaScript to TypeScript, highlight that while adding type annotations to event handlers requires some additional code, the benefits in terms of error prevention and code clarity are substantial. Encourage them to use the TypeScript documentation and IDE features like hover information and autocomplete to explore the available event types and their properties.

---

## Typing Event Handlers: Code Example

```typescript
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';

interface MedicationButtonProps {
  name: string;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (name: string) => void;
}

const MedicationButton: React.FC<MedicationButtonProps> = ({ 
  name, 
  onPress, 
  onLongPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      onLongPress={() => onLongPress(name)}
    >
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function MedicationScreen() {
  // Event handler with React Native's event type
  const handlePress = (event: GestureResponderEvent) => {
    console.log('Button pressed at:', event.nativeEvent.locationX, event.nativeEvent.locationY);
  };

  // Event handler with custom parameter
  const handleLongPress = (medicationName: string) => {
    console.log(`Long pressed on ${medicationName}`);
  };

  // TextInput event handler
  const handleTextChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    console.log('Text changed:', e.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChange={handleTextChange}
        placeholder="Search medications"
      />
      
      <MedicationButton
        name="Aspirin"
        onPress={handlePress}
        onLongPress={handleLongPress}
      />
      
      <MedicationButton
        name="Ibuprofen"
        onPress={handlePress}
        onLongPress={handleLongPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
```

Note: This example demonstrates how to type event handlers in a React Native application using TypeScript. Let's analyze the key aspects of this code to understand how TypeScript enhances event handling.

First, we import specific event types from React Native: `GestureResponderEvent` and `NativeSyntheticEvent<TextInputChangeEventData>`. These types define the structure of events that are passed to our event handlers, allowing TypeScript to verify that we're using these events correctly.

The `MedicationButtonProps` interface defines the props for our `MedicationButton` component, including two event handlers:
- `onPress`: A function that takes a `GestureResponderEvent` parameter and returns nothing (void)
- `onLongPress`: A function that takes a string parameter (the medication name) and returns nothing

This creates a clear contract for how the component should be used. Anyone using this component will know exactly what parameters these event handlers expect, and TypeScript will ensure that compatible functions are provided.

Inside the `MedicationButton` component, we pass the `onPress` prop directly to the TouchableOpacity's `onPress` property. For `onLongPress`, we create a wrapper function that calls the provided `onLongPress` prop with the medication name. This is a common pattern in React Native - transforming one event type into another. TypeScript ensures that this transformation is type-safe.

In the `MedicationScreen` component, we define three event handlers:
1. `handlePress`: Takes a `GestureResponderEvent` parameter and accesses properties from the event's `nativeEvent` object
2. `handleLongPress`: Takes a string parameter (the medication name)
3. `handleTextChange`: Takes a `NativeSyntheticEvent<TextInputChangeEventData>` parameter and accesses the text value from the event

Each handler is typed according to the event it will receive, ensuring that we only access properties that actually exist on that event type. This prevents runtime errors that might occur if we tried to access, for example, `locationX` on a text input event.

When we use these handlers in our JSX, TypeScript verifies that we're passing them to the correct props and that they have compatible signatures. For example, if we tried to pass `handleTextChange` to a TouchableOpacity's `onPress` prop, TypeScript would raise an error because the event types don't match.

When teaching this example, emphasize several key points:
1. Different React Native components emit different types of events, and TypeScript helps us handle these correctly
2. Well-typed event handlers make it clear what data is available in each event
3. TypeScript ensures that event handlers are used consistently throughout the application
4. The pattern of transforming events (like we do with `onLongPress`) is common in React Native and benefits from TypeScript's type checking

Also point out that while this example shows basic event handling, the same principles apply to more complex scenarios like gesture handling with libraries such as React Native Gesture Handler, where proper typing becomes even more valuable due to the complexity of the events involved.

React Native provides specific event types that help ensure your event handlers are correctly implemented.

---

## Typing Styles

TypeScript can help ensure your styles are valid:

- **ViewStyle**: Type for View component styles
- **TextStyle**: Type for Text component styles
- **ImageStyle**: Type for Image component styles
- **StyleSheet.create**: Type-safe style creation
- **Style composition**: Combining multiple styles
- **Conditional styles**: Type-safe dynamic styling
- **Style inheritance**: TextStyle extends ViewStyle
- **Style validation**: Catch invalid properties at compile time

Note: Styling is a critical aspect of React Native development, and TypeScript can significantly enhance the styling experience by providing type safety for style objects. When teaching this concept, emphasize how TypeScript helps prevent common styling errors and improves the developer experience when working with React Native's styling system.

React Native's styling system is based on a subset of CSS properties, but with important differences. Unlike web CSS where invalid properties are simply ignored, React Native will throw runtime errors for invalid style properties or values. This makes type checking particularly valuable for styles, as it can catch these errors during development rather than at runtime.

TypeScript provides specific types for different component styles: ViewStyle for View components, TextStyle for Text components, and ImageStyle for Image components. These types define exactly which style properties are valid for each component type, allowing the compiler to catch errors when you try to use a property that isn't supported by a particular component.

One common mistake in React Native styling is using Text-specific styles (like fontWeight or textAlign) on View components, or vice versa. Without TypeScript, these errors would only be caught at runtime, potentially after the app has been deployed. TypeScript prevents these errors by ensuring that you only use style properties that are valid for the component type you're styling.

Another benefit of typing styles is improved autocomplete and documentation in modern IDEs. When you define a style object with the correct type, your IDE can provide intelligent suggestions for valid style properties and values, making it easier to write correct styles without constantly referring to documentation.

For complex applications with many style objects, TypeScript allows you to define interfaces for your style objects, ensuring consistency across your codebase. This is particularly valuable for team environments where multiple developers might be working on the same styles or when you need to maintain a large number of style definitions.

When teaching this concept, it's important to explain the relationship between TypeScript's style types and React Native's component hierarchy. ViewStyle, TextStyle, and ImageStyle are not arbitrary divisions - they reflect the actual properties that each component type supports. TextStyle extends ViewStyle (adding text-specific properties), and ImageStyle extends ViewStyle (adding image-specific properties). This inheritance relationship mirrors the component hierarchy in React Native.

Another important aspect to cover is conditional styling, which is common in React Native applications. TypeScript ensures that dynamically constructed style objects still adhere to the correct type, even when combining multiple style objects or adding conditional properties. This prevents errors that might occur when dynamically generating styles based on component props or application state.

For students transitioning from JavaScript to TypeScript, emphasize that while adding types to styles requires some additional code, the benefits in terms of error prevention and code clarity are substantial. The time saved by catching styling errors during development rather than debugging them at runtime more than compensates for the initial investment in typing.

---

## Typing Styles: Code Example

```typescript
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ImageStyle 
} from 'react-native';

// Define a type for our style object
interface MedicationCardStyles {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  dosage: TextStyle;
  description: TextStyle;
  activeIndicator: ViewStyle;
  image?: ImageStyle; // Optional style
}

// Create typed styles
const styles = StyleSheet.create<MedicationCardStyles>({
  container: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dosage: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CD964',
  },
  // TypeScript would error if we tried to add an invalid style property
});

interface MedicationCardProps {
  name: string;
  dosage: string;
  description: string;
  isActive: boolean;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  description,
  isActive,
}) => {
  // Conditional styles with TypeScript
  const containerStyle: ViewStyle = {
    ...styles.container,
    borderLeftWidth: 4,
    borderLeftColor: isActive ? '#4CD964' : '#FF3B30',
  };

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        {isActive && <View style={styles.activeIndicator} />}
      </View>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default function MedicationList() {
  return (
    <View style={{ padding: 16 }}>
      <MedicationCard
        name="Aspirin"
        dosage="100mg, twice daily"
        description="Take with food to reduce stomach irritation."
        isActive={true}
      />
      <MedicationCard
        name="Lisinopril"
        dosage="10mg, once daily"
        description="Take in the morning for blood pressure control."
        isActive={false}
      />
    </View>
  );
}
```

Note: This example demonstrates how to use TypeScript to ensure type safety for styles in a React Native component. Let's analyze the key aspects of this code to understand how TypeScript enhances styling.

First, we import specific style types from React Native: `ViewStyle`, `TextStyle`, and `ImageStyle`. These types define the valid style properties for different component types:
- `ViewStyle` contains properties valid for View components (like flex, padding, margin, etc.)
- `TextStyle` extends `ViewStyle` and adds text-specific properties (like fontSize, fontWeight, etc.)
- `ImageStyle` extends `ViewStyle` and adds image-specific properties (like resizeMode, etc.)

We then define an interface `MedicationCardStyles` that specifies the expected type for each style property in our stylesheet:
- `container` and `header` are `ViewStyle` because they're applied to View components
- `title`, `dosage`, and `description` are `TextStyle` because they're applied to Text components
- `activeIndicator` is `ViewStyle` because it's applied to a View component
- `image` is an optional `ImageStyle` (denoted by the `?` modifier) for potential image styling

This interface serves as a contract for our stylesheet, ensuring that each style property has the correct type. We pass this interface as a type parameter to `StyleSheet.create<MedicationCardStyles>`, which ensures that the created stylesheet conforms to our interface.

Inside the stylesheet, TypeScript will verify that each style object only contains properties that are valid for its declared type. For example, if we tried to add a text-specific property like `fontWeight` to the `container` style (which is a `ViewStyle`), TypeScript would raise a compile-time error.

The `MedicationCard` component demonstrates how to use typed styles with conditional styling. We create a `containerStyle` variable with type `ViewStyle` that combines the base container style with additional properties that depend on the `isActive` prop. TypeScript ensures that all properties added to this style object are valid `ViewStyle` properties.

When we apply these styles in the component's JSX, TypeScript verifies that we're using the correct style type for each component. For example, if we tried to apply a `TextStyle` to a View component, TypeScript would raise an error.

The `MedicationList` component shows how to use our styled component with different prop values, demonstrating how the conditional styling changes based on the `isActive` prop.

When teaching this example, emphasize several key points:
1. TypeScript's style types prevent common styling errors by ensuring that you only use valid style properties for each component type.
2. Defining a style interface makes your stylesheet more maintainable and self-documenting.
3. TypeScript ensures type safety even with dynamic and conditional styles.
4. The IDE can provide better autocomplete suggestions for style properties based on the declared types.

Also point out that while this example shows a relatively simple component, the benefits of typed styles become even more significant in larger applications with complex styling requirements. In such cases, TypeScript can help maintain consistency and prevent styling bugs that might be difficult to track down.

Using TypeScript with styles helps catch errors like:
- Misspelled style properties
- Invalid style values
- Using View styles on Text components (or vice versa)

---

## Exercise

<div class="exercise">

### Exercise: TypeScript Medication Tracker Component

**Objective:** Create a typed React Native component for tracking medication adherence.

**Time:** 15-20 minutes

**Instructions:**
1. Create a new Expo TypeScript project: `npx create-expo-app MedicationTracker --template expo-template-blank-typescript`
2. Navigate to the project: `cd MedicationTracker`
3. Create a new file called `MedicationTracker.tsx`
4. Define the following:
   - An interface for a Medication object with properties for id, name, dosage, time, and taken status
   - A props interface for your component that accepts an array of medications and callbacks for marking medications as taken
   - A functional component that displays the list of medications with buttons to mark them as taken
5. Use proper TypeScript typing for props, state, event handlers, and styles
6. Import and use the component in App.tsx with sample data
7. Run the project with `npx expo start` to verify it works correctly

**Resources:**
- [TypeScript React Native Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [React Native TypeScript Documentation](https://reactnative.dev/docs/typescript)
- [Expo Snack](https://snack.expo.dev/)

</div>

---

# Section 4: Advanced TypeScript Features

---

## Generic Types

Generics allow you to create reusable components and functions:

- **Type parameters**: Placeholders for types (e.g., `<T>`)
- **Generic functions**: Functions that work with multiple types
- **Generic interfaces**: Interfaces with type parameters
- **Generic classes**: Classes with type parameters
- **Generic constraints**: Limiting type parameters with `extends`
- **Default type parameters**: Providing fallback types with `<T = DefaultType>`
- **Generic type inference**: How TypeScript determines type arguments
- **Multiple type parameters**: Using `<T, U, V>` for complex relationships

Note: Generics are one of TypeScript's most powerful features, enabling developers to create flexible, reusable code without sacrificing type safety. When teaching generics, it's important to emphasize that they allow you to write code that works with a variety of types while still maintaining strong type checking.

The core concept of generics is type parameters, which act as placeholders for types that will be specified later when the code is used. This is similar to function parameters, but instead of passing values, you're passing types. This abstraction allows you to create components, functions, and interfaces that can work with different data types while still preserving type information throughout your code.

In React Native development, generics are particularly valuable for several common patterns:

1. **Utility functions** that need to work with different data types, such as functions for array manipulation, data transformation, or state management.

2. **API response handling**, where the structure of the response might be consistent (status code, error messages, etc.) but the actual data varies depending on the endpoint.

3. **Reusable components** that need to display or manipulate different types of data, such as lists, forms, or modals.

4. **State management** solutions that need to work with various data structures while maintaining type safety.

When explaining generics to students, it's helpful to start with simple examples and gradually introduce more complex patterns. Begin with generic functions that operate on arrays or simple data structures, then move to generic interfaces and classes, and finally to more advanced patterns like generic constraints and conditional types.

It's also important to discuss the syntax of generics, including the angle brackets (`<T>`) used to define type parameters, the convention of using single uppercase letters (like T, U, V) for simple type parameters, and more descriptive names for complex scenarios.

For students coming from other typed languages like Swift or Kotlin, you can draw parallels to similar features in those languages. For JavaScript developers, emphasize how generics provide the flexibility they're used to while adding type safety.

When teaching generics in React Native specifically, highlight how they enable type-safe component props, navigation parameters, and API calls. Show examples of generic components like lists or forms that can work with different data types while still providing proper type checking and autocompletion.

Generic constraints, specified with the `extends` keyword, are an important concept to cover. They allow you to limit what types can be used with a generic, ensuring that the type parameter has certain properties or methods. For example, `<T extends { id: string }>` ensures that T must be an object with at least an id property of type string.

Default type parameters provide fallback types when a type argument isn't explicitly provided. This is useful for creating APIs that are both flexible and easy to use, as consumers don't need to specify common type arguments.

In React Native, generics are commonly used with hooks like useState and useReducer to provide type safety for state management. They're also valuable for typing context providers and consumers, ensuring that the context value maintains its type throughout the application.

---

## Generic Types: Code Example

```typescript
// Generic function
function getFirstItem<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

const medications = ["Aspirin", "Ibuprofen", "Acetaminophen"];
const firstMedication = getFirstItem<string>(medications); // Type: string | undefined

const dosages = [100, 200, 500];
const firstDosage = getFirstItem<number>(dosages); // Type: number | undefined

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// Using the generic interface
interface Medication {
  id: string;
  name: string;
  dosage: number;
}

// The response type is now ApiResponse<Medication>
function fetchMedication(id: string): Promise<ApiResponse<Medication>> {
  return fetch(`/api/medications/${id}`)
    .then(response => response.json());
}

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <View>
      {items.map(item => (
        <View key={keyExtractor(item)}>
          {renderItem(item)}
        </View>
      ))}
    </View>
  );
}

// Using the generic component
function MedicationList() {
  const medications: Medication[] = [
    { id: '1', name: 'Aspirin', dosage: 100 },
    { id: '2', name: 'Ibuprofen', dosage: 200 }
  ];
  
  return (
    <List<Medication>
      items={medications}
      renderItem={(med) => (
        <Text>{med.name} - {med.dosage}mg</Text>
      )}
      keyExtractor={(med) => med.id}
    />
  );
}
```

Note: This example demonstrates three common uses of generics in a React Native application: generic functions, generic interfaces, and generic components. Let's analyze each part in detail to understand how generics enable type-safe, reusable code.

First, we define a generic function `getFirstItem<T>` that works with arrays of any type. The type parameter `T` acts as a placeholder that will be replaced with an actual type when the function is used. The function returns either the first item in the array (of type `T`) or `undefined` if the array is empty.

We then use this function with two different array types:
- An array of strings (`medications`), where `T` is inferred as `string`
- An array of numbers (`dosages`), where `T` is inferred as `number`

In both cases, TypeScript ensures type safety - `firstMedication` has type `string | undefined` and `firstDosage` has type `number | undefined`. This demonstrates how a single generic function can work with different data types while preserving type information.

Next, we define a generic interface `ApiResponse<T>` that represents a common API response structure. The generic parameter `T` represents the type of data returned by the API, which will vary depending on the endpoint. The interface includes common fields like `status` and `message` that are present in all responses, along with a `data` field of type `T`.

We then use this generic interface with a specific data type `Medication` to create a type-safe API function `fetchMedication`. This function returns a Promise that resolves to an `ApiResponse<Medication>`, ensuring that the data property of the response will be of type `Medication`. This pattern is extremely valuable in React Native applications that interact with APIs, as it provides type safety for API responses without duplicating response structure definitions.

Finally, we demonstrate a generic component pattern with the `List<T>` component. This component can display a list of items of any type, with the type parameter `T` representing the item type. The component accepts three props:
- `items`: An array of items of type `T`
- `renderItem`: A function that takes an item of type `T` and returns a React node
- `keyExtractor`: A function that takes an item of type `T` and returns a string key

The `MedicationList` component shows how to use this generic component with a specific type `Medication`. By specifying `<Medication>` when using the `List` component, we ensure that:
1. The `items` prop must be an array of `Medication` objects
2. The `renderItem` function receives a `Medication` object as its parameter
3. The `keyExtractor` function receives a `Medication` object as its parameter

This pattern is particularly valuable in React Native for creating reusable list components, form components, or any component that needs to work with different data types.

When teaching this example, emphasize how generics provide both flexibility and type safety. Without generics, we would either need to create separate functions and components for each data type (leading to code duplication) or use `any` (losing type safety). Generics give us the best of both worlds - reusable code that maintains type information.

Generics are powerful for creating flexible, reusable code while maintaining type safety.

---

## Type Guards and Type Narrowing

Type guards help TypeScript understand the type of a variable within a certain scope:

- **typeof guards**: Check primitive types (`typeof x === "string"`)
- **instanceof guards**: Check class instances (`x instanceof Date`)
- **Property checks**: Verify property existence (`'property' in object`)
- **Discriminated unions**: Use a common property to distinguish types
- **User-defined type guards**: Custom functions with type predicates
- **Assertion functions**: Functions that throw errors for invalid types
- **The `in` operator**: Check for property existence
- **Exhaustiveness checking**: Ensure all cases are handled

Note: Type guards and type narrowing are essential concepts in TypeScript that enable you to work safely with union types and polymorphic data. When teaching these concepts, it's important to emphasize how they allow TypeScript to understand the specific type of a variable within a particular code block, enabling type-safe access to properties and methods that might not be available on all possible types.

In TypeScript, when you have a variable that could be one of several types (a union type), you need a way to determine which specific type you're working with at runtime. Type guards provide this capability by performing runtime checks that inform TypeScript about the type of a variable within a specific scope. This process of refining a variable from a more general type to a more specific type is called type narrowing.

There are several kinds of type guards in TypeScript:

1. **typeof guards** check for JavaScript primitive types like string, number, boolean, etc.
2. **instanceof guards** check if an object is an instance of a specific class or constructor function.
3. **Property checks** verify the existence of properties on an object.
4. **Discriminated unions** use a common property (often called a "tag" or "discriminant") to distinguish between different object shapes.
5. **User-defined type guards** are custom functions that return a type predicate, allowing you to define your own type checking logic.

In React Native development, type guards are particularly valuable when working with:

1. **Component props** that can accept different types of data
2. **API responses** that might have different structures based on success or error states
3. **Navigation parameters** that vary between screens
4. **State management** where state can take different shapes based on application conditions

When explaining type guards to students, it's helpful to start with simple examples using typeof and instanceof, then move to more complex patterns like discriminated unions and user-defined type guards. Emphasize that type guards not only prevent runtime errors but also enable better developer experience through improved autocompletion and type checking.

For students coming from other typed languages, you can draw parallels to pattern matching or switch statements with type checking. For JavaScript developers, emphasize how type guards formalize and enhance the kind of type checking they might already be doing with conditional statements.

When teaching type guards in React Native specifically, highlight how they enable safer handling of component props, state transitions, and API responses. Show examples of components that can render different UI based on the specific type of data they receive, all while maintaining type safety.

Discriminated unions are particularly powerful in React Native applications. For example, you might use them to model different states of a screen (loading, error, success), different types of notifications, or different variants of a component. By using a common property like "type" or "status", you can create a union type that TypeScript can narrow based on that property.

Exhaustiveness checking is another important concept to cover. By using a switch statement with a default case that assigns to a variable of type `never`, you can ensure that you've handled all possible variants of a union type. This is invaluable for ensuring that your code remains type-safe even as you add new variants to a union type in the future.

---

## Generic Types: Code Example

```typescript
// Generic function
function getFirstItem<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

const medications = ["Aspirin", "Ibuprofen", "Acetaminophen"];
const firstMedication = getFirstItem<string>(medications); // Type: string | undefined

const dosages = [100, 200, 500];
const firstDosage = getFirstItem<number>(dosages); // Type: number | undefined

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// Using the generic interface
interface Medication {
  id: string;
  name: string;
  dosage: number;
}

// The response type is now ApiResponse<Medication>
function fetchMedication(id: string): Promise<ApiResponse<Medication>> {
  return fetch(`/api/medications/${id}`)
    .then(response => response.json());
}

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <View>
      {items.map(item => (
        <View key={keyExtractor(item)}>
          {renderItem(item)}
        </View>
      ))}
    </View>
  );
}

// Using the generic component
function MedicationList() {
  const medications: Medication[] = [
    { id: '1', name: 'Aspirin', dosage: 100 },
    { id: '2', name: 'Ibuprofen', dosage: 200 }
  ];
  
  return (
    <List<Medication>
      items={medications}
      renderItem={(med) => (
        <Text>{med.name} - {med.dosage}mg</Text>
      )}
      keyExtractor={(med) => med.id}
    />
  );
}
```

Note: This example demonstrates three common uses of generics in a React Native application: generic functions, generic interfaces, and generic components. Let's analyze each part in detail to understand how generics enable type-safe, reusable code.

First, we define a generic function `getFirstItem<T>` that works with arrays of any type. The type parameter `T` acts as a placeholder that will be replaced with an actual type when the function is used. The function returns either the first item in the array (of type `T`) or `undefined` if the array is empty.

We then use this function with two different array types:
- An array of strings (`medications`), where `T` is inferred as `string`
- An array of numbers (`dosages`), where `T` is inferred as `number`

In both cases, TypeScript ensures type safety - `firstMedication` has type `string | undefined` and `firstDosage` has type `number | undefined`. This demonstrates how a single generic function can work with different data types while preserving type information.

Next, we define a generic interface `ApiResponse<T>` that represents a common API response structure. The generic parameter `T` represents the type of data returned by the API, which will vary depending on the endpoint. The interface includes common fields like `status` and `message` that are present in all responses, along with a `data` field of type `T`.

We then use this generic interface with a specific data type `Medication` to create a type-safe API function `fetchMedication`. This function returns a Promise that resolves to an `ApiResponse<Medication>`, ensuring that the data property of the response will be of type `Medication`. This pattern is extremely valuable in React Native applications that interact with APIs, as it provides type safety for API responses without duplicating response structure definitions.

Finally, we demonstrate a generic component pattern with the `List<T>` component. This component can display a list of items of any type, with the type parameter `T` representing the item type. The component accepts three props:
- `items`: An array of items of type `T`
- `renderItem`: A function that takes an item of type `T` and returns a React node
- `keyExtractor`: A function that takes an item of type `T` and returns a string key

The `MedicationList` component shows how to use this generic component with a specific type `Medication`. By specifying `<Medication>` when using the `List` component, we ensure that:
1. The `items` prop must be an array of `Medication` objects
2. The `renderItem` function receives a `Medication` object as its parameter
3. The `keyExtractor` function receives a `Medication` object as its parameter

This pattern is particularly valuable in React Native for creating reusable list components, form components, or any component that needs to work with different data types.

When teaching this example, emphasize how generics provide both flexibility and type safety. Without generics, we would either need to create separate functions and components for each data type (leading to code duplication) or use `any` (losing type safety). Generics give us the best of both worlds - reusable code that maintains type information.

Generics are powerful for creating flexible, reusable code while maintaining type safety.

---

## Type Guards and Type Narrowing

Type guards help TypeScript understand the type of a variable within a certain scope:

- **typeof guards**: Check primitive types (`typeof x === "string"`)
- **instanceof guards**: Check class instances (`x instanceof Date`)
- **Property checks**: Verify property existence (`'property' in object`)
- **Discriminated unions**: Use a common property to distinguish types
- **User-defined type guards**: Custom functions with type predicates
- **Assertion functions**: Functions that throw errors for invalid types
- **The `in` operator**: Check for property existence
- **Exhaustiveness checking**: Ensure all cases are handled


Note: Type guards and type narrowing are essential concepts in TypeScript that enable you to work safely with union types and polymorphic data. When teaching these concepts, it's important to emphasize how they allow TypeScript to understand the specific type of a variable within a particular code block, enabling type-safe access to properties and methods that might not be available on all possible types.

In TypeScript, when you have a variable that could be one of several types (a union type), you need a way to determine which specific type you're working with at runtime. Type guards provide this capability by performing runtime checks that inform TypeScript about the type of a variable within a specific scope. This process of refining a variable from a more general type to a more specific type is called type narrowing.

There are several kinds of type guards in TypeScript:

1. **typeof guards** check for JavaScript primitive types like string, number, boolean, etc.
2. **instanceof guards** check if an object is an instance of a specific class or constructor function.
3. **Property checks** verify the existence of properties on an object.
4. **Discriminated unions** use a common property (often called a "tag" or "discriminant") to distinguish between different object shapes.
5. **User-defined type guards** are custom functions that return a type predicate, allowing you to define your own type checking logic.

In React Native development, type guards are particularly valuable when working with:

1. **Component props** that can accept different types of data
2. **API responses** that might have different structures based on success or error states
3. **Navigation parameters** that vary between screens
4. **State management** where state can take different shapes based on application conditions

When explaining type guards to students, it's helpful to start with simple examples using typeof and instanceof, then move to more complex patterns like discriminated unions and user-defined type guards. Emphasize that type guards not only prevent runtime errors but also enable better developer experience through improved autocompletion and type checking.

For students coming from other typed languages, you can draw parallels to pattern matching or switch statements with type checking. For JavaScript developers, emphasize how type guards formalize and enhance the kind of type checking they might already be doing with conditional statements.

When teaching type guards in React Native specifically, highlight how they enable safer handling of component props, state transitions, and API responses. Show examples of components that can render different UI based on the specific type of data they receive, all while maintaining type safety.

Finally, discuss best practices such as using discriminated unions for complex object types, creating reusable type guard functions for common patterns, and avoiding type assertions (as) when type guards can be used instead.

---

## Type Guards and Type Narrowing: Code Example

```typescript
// Union type
type MedicationDosage = {
  type: 'tablet';
  count: number;
  strength: number;
} | {
  type: 'liquid';
  volume: number;
  concentration: number;
};

// Type guard function
function isTabletDosage(dosage: MedicationDosage): dosage is { type: 'tablet', count: number, strength: number } {
  return dosage.type === 'tablet';
}

// Using type guards
function formatDosage(dosage: MedicationDosage): string {
  // Type narrowing with if statement
  if (dosage.type === 'tablet') {
    // TypeScript knows dosage is tablet type here
    return `${dosage.count} tablet(s), ${dosage.strength}mg each`;
  } else {
    // TypeScript knows dosage is liquid type here
    return `${dosage.volume}ml, ${dosage.concentration}mg/ml`;
  }
}

// Alternative using the type guard function
function describeDosage(dosage: MedicationDosage): string {
  if (isTabletDosage(dosage)) {
    // TypeScript knows dosage is tablet type here
    return `Take ${dosage.count} tablet(s) of ${dosage.strength}mg strength`;
  } else {
    // TypeScript knows dosage is liquid type here
    return `Take ${dosage.volume}ml at ${dosage.concentration}mg/ml concentration`;
  }
}

// Example usage
const tabletDosage: MedicationDosage = {
  type: 'tablet',
  count: 2,
  strength: 500
};

const liquidDosage: MedicationDosage = {
  type: 'liquid',
  volume: 10,
  concentration: 50
};

console.log(formatDosage(tabletDosage));  // "2 tablet(s), 500mg each"
console.log(describeDosage(liquidDosage)); // "Take 10ml at 50mg/ml concentration"
```

Note: This example demonstrates how to use type guards and type narrowing in TypeScript with a medication-related example. Let's analyze the key concepts in detail.

First, we define a discriminated union type `MedicationDosage` that can represent either tablet or liquid medications. Each variant has a common `type` property (the discriminant) that distinguishes between them, plus variant-specific properties:
- Tablet medications have `count` (number of tablets) and `strength` (mg per tablet)
- Liquid medications have `volume` (ml) and `concentration` (mg/ml)

This union type is a powerful way to model different but related concepts. In a medication tracking app, we need to handle different forms of medication, each with its own set of properties, but we want to treat them in a unified way when possible.

Next, we demonstrate two approaches to type narrowing:

1. **Inline type guard using property check**: In the `formatDosage` function, we check the `type` property directly with an if statement. TypeScript is smart enough to understand that within the if block, `dosage` must be the tablet variant, so it allows access to `count` and `strength`. Similarly, in the else block, TypeScript knows `dosage` must be the liquid variant, allowing access to `volume` and `concentration`.

2. **User-defined type guard function**: The `isTabletDosage` function is a custom type guard that returns a type predicate (`dosage is {...}`). This tells TypeScript that if the function returns true, the parameter is of the specified type. We then use this function in `describeDosage` to narrow the type, achieving the same effect as the inline check but with reusable code.

The example usage demonstrates creating instances of both variants and formatting them appropriately. The output strings show how we can access the variant-specific properties safely after type narrowing.

When teaching this example, emphasize several key points:

1. **Discriminated unions** are a pattern where all variants share a common property (the discriminant) that can be used to determine which variant you're working with.

2. **Type narrowing** is the process by which TypeScript refines a type within a conditional block based on runtime checks.

3. **Type predicates** (`paramName is Type`) allow you to create custom type guard functions that can be reused throughout your codebase.

4. **Safety benefits**: Without type narrowing, accessing variant-specific properties would be a type error or require unsafe type assertions.

5. **Developer experience**: After type narrowing, you get proper autocomplete and type checking for the specific variant you're working with.

In a React Native context, you might extend this example to show how a `MedicationItem` component could render differently based on the medication type, with type guards ensuring that you only access properties that exist for each variant. This pattern is extremely valuable for creating flexible yet type-safe components.

Type guards are especially useful when working with union types in React Native components.

---

## Utility Types

TypeScript provides built-in utility types to transform existing types:

- **Partial<T>**: Makes all properties optional
- **Required<T>**: Makes all properties required
- **Readonly<T>**: Makes all properties read-only
- **Pick<T, K>**: Creates a type with only the specified properties
- **Omit<T, K>**: Creates a type without the specified properties
- **Record<K, T>**: Creates a type with keys K and values T
- **Exclude<T, U>**: Excludes types in U from T
- **Extract<T, U>**: Extracts types in U from T
- **NonNullable<T>**: Removes null and undefined from T
- **ReturnType<T>**: Extracts the return type of a function type

Note: Utility types are one of TypeScript's most powerful features, allowing developers to transform existing types into new ones without duplicating type definitions. When teaching utility types, it's important to emphasize how they promote code reuse and maintainability by providing standardized ways to modify types.

TypeScript includes several built-in utility types that solve common type manipulation needs. These utility types operate on existing type definitions, creating new types with modified characteristics. This is particularly valuable in React Native development, where you often need variations of the same base types for different contexts.

The most commonly used utility types include:

1. **Partial<T>** - Makes all properties of a type optional. This is invaluable for update operations where you only want to change some properties of an object, such as in form handling or API updates.

2. **Required<T>** - Makes all properties of a type required, removing optional modifiers. This is useful when you need to ensure all properties are present in certain contexts, such as when submitting complete data.

3. **Pick<T, K>** - Creates a new type by selecting only specific properties from an existing type. This helps create focused subsets of larger types, such as when you need only certain fields for a specific view or operation.

4. **Omit<T, K>** - Creates a new type by excluding specific properties from an existing type. This is the inverse of Pick and is useful when you want most properties except a few.

5. **Record<K, T>** - Creates a type with specified keys and value types. This is perfect for dictionaries, lookup tables, or any object where keys follow a pattern.

6. **Readonly<T>** - Makes all properties read-only, preventing modifications after initialization. This promotes immutability and is valuable for state management patterns.

7. **NonNullable<T>** - Removes null and undefined from a type, ensuring values are present. This is helpful when working with optional values that must be validated before use.

When teaching utility types, it's helpful to demonstrate them with practical examples relevant to the domain. For React Native applications, show how utility types can be used with component props, state management, API interactions, and form handling.

It's also important to explain that utility types can be combined and nested to create more complex transformations. For example, you might use `Readonly<Partial<T>>` to create a type where all properties are optional and read-only, which could be useful for immutable partial updates.

For students coming from other typed languages, highlight that utility types provide a level of type manipulation that might not be available in their previous experience. For JavaScript developers, emphasize how utility types help formalize common patterns they might have implemented manually.

In React Native development, utility types are particularly valuable for several common scenarios:

1. **Form handling**: Using `Partial<T>` for form state that's gradually filled in, and `Required<T>` for validation before submission.

2. **API interactions**: Using `Pick<T, K>` to select only the fields needed for a specific API request, or `Omit<T, K>` to exclude sensitive fields.

3. **State management**: Using `Readonly<T>` to ensure state immutability, and `Record<K, T>` for normalized state structures.

4. **Component props**: Using utility types to derive prop types from state types or to create variations of prop types for different component configurations.

When teaching utility types, emphasize that they're not just syntactic sugar - they provide real type safety benefits by ensuring that transformations are complete and correct. For example, if you add a required property to a base type, `Partial<T>` will automatically make that property optional in the derived type, preventing potential runtime errors.

---

## Utility Types: Code Example

```typescript
// Original interface
interface Medication {
  id: string;
  name: string;
  dosage: number;
  unit: string;
  frequency: number;
  instructions?: string;
}

// Partial - All properties become optional
type PartialMedication = Partial<Medication>;
// Useful for updates where only some fields change
const medicationUpdate: PartialMedication = {
  dosage: 200,
  frequency: 3
};

// Required - All properties become required
type RequiredMedication = Required<Medication>;
// Now 'instructions' is required too
const completeInfo: RequiredMedication = {
  id: "med-001",
  name: "Aspirin",
  dosage: 100,
  unit: "mg",
  frequency: 2,
  instructions: "Take with food" // No longer optional
};

// Pick - Select specific properties
type MedicationDosageInfo = Pick<Medication, 'dosage' | 'unit' | 'frequency'>;
// Only includes the picked properties
const dosageInfo: MedicationDosageInfo = {
  dosage: 100,
  unit: "mg",
  frequency: 2
};

// Omit - Remove specific properties
type MedicationBasics = Omit<Medication, 'instructions' | 'frequency'>;
// Excludes the omitted properties
const basicInfo: MedicationBasics = {
  id: "med-001",
  name: "Aspirin",
  dosage: 100,
  unit: "mg"
};

// Record - Create a dictionary with specific key and value types
type MedicationInventory = Record<string, number>;
// Maps medication names to quantities
const inventory: MedicationInventory = {
  "Aspirin": 200,
  "Ibuprofen": 150,
  "Acetaminophen": 100
};

// Readonly - Make all properties read-only
type ReadonlyMedication = Readonly<Medication>;
const aspirin: ReadonlyMedication = {
  id: "med-001",
  name: "Aspirin",
  dosage: 100,
  unit: "mg",
  frequency: 2,
  instructions: "Take with food"
};
// aspirin.dosage = 200; // Error: Cannot assign to 'dosage' because it is a read-only property
```

Note: This example demonstrates how to use TypeScript's built-in utility types to transform an existing type in various ways. Let's analyze each utility type in detail:

First, we define a base `Medication` interface that represents the structure of a medication in our application. This interface has several required properties (id, name, dosage, unit, frequency) and one optional property (instructions, denoted by the `?` modifier).

**Partial<T>**: The `PartialMedication` type makes all properties of the `Medication` interface optional. This is extremely useful for update operations where you only want to change some properties while leaving others unchanged. In the example, we create a `medicationUpdate` object that only specifies the dosage and frequency to update, without needing to include other properties. This pattern is common in PATCH API requests or when implementing partial form updates.

**Required<T>**: The `RequiredMedication` type makes all properties of the `Medication` interface required, including the originally optional `instructions` property. This is useful when you need to ensure that all properties have values in certain contexts, such as when saving complete records or validating full forms. The example shows that we must provide a value for `instructions` when creating a `completeInfo` object.

**Pick<T, K>**: The `MedicationDosageInfo` type selects only the dosage-related properties from the `Medication` interface. This creates a focused subset type that's perfect for scenarios where you only need specific aspects of a larger data structure, such as displaying dosage information without other medication details. The example demonstrates creating a `dosageInfo` object with just these selected properties.

**Omit<T, K>**: The `MedicationBasics` type excludes specific properties from the `Medication` interface. This is the inverse of `Pick` and is useful when you want most properties except a few. In the example, we create a `basicInfo` object that includes all medication properties except `instructions` and `frequency`.

**Record<K, T>**: The `MedicationInventory` type creates a dictionary type where keys are strings (medication names) and values are numbers (quantities). This utility is perfect for creating lookup tables, dictionaries, or any object where keys follow a pattern. The example shows an inventory object mapping medication names to their quantities in stock.

**Readonly<T>**: The `ReadonlyMedication` type makes all properties of the `Medication` interface read-only, preventing modifications after initialization. This promotes immutability and is valuable for state management patterns where you want to ensure data isn't accidentally modified. The commented-out line shows that attempting to modify a property of a readonly object would result in a TypeScript error.

When teaching this example, emphasize several key points:
1. Utility types transform existing types without duplicating type definitions, promoting DRY (Don't Repeat Yourself) principles.
2. When the base type changes, all derived types automatically reflect those changes, making maintenance easier.
3. Utility types can be combined for more complex transformations (e.g., `Readonly<Partial<Medication>>`).
4. These patterns map to common real-world scenarios in React Native development, such as form handling, API interactions, and state management.

In a React Native context, you might discuss how these utility types can be used with component props (e.g., `React.ComponentProps<typeof Button>`), API responses, form state management, and navigation parameters. This helps students see the practical applications of these abstract concepts.

These utility types help create derived types without duplicating type definitions, making your code more maintainable.

---

## Declaration Merging

TypeScript allows you to extend existing types through declaration merging:

- **Interface merging**: Define the same interface multiple times to add properties
- **Module augmentation**: Extend types from external modules
- **Global augmentation**: Add declarations to the global scope
- **Namespace merging**: Combine multiple namespace declarations
- **Enum merging**: Add members to enums across multiple declarations
- **Function and variable merging**: Combine overloads with implementations
- **Class and interface merging**: Add static and instance members to classes
- **Merging limitations**: Not all declarations can be merged (e.g., types)

Note: Declaration merging is a powerful TypeScript feature that allows you to add properties to existing types across multiple declarations. When teaching this concept, it's important to emphasize how it enables extending and augmenting types in ways that would be difficult or impossible in other type systems.

Declaration merging is the process by which TypeScript combines multiple declarations with the same name into a single definition. This is particularly useful in several scenarios:

1. **Gradually building up interfaces** - You can define an interface in multiple places, and TypeScript will merge them into a single interface with all the properties. This is valuable when you need to add properties to an interface in different files or modules.

2. **Extending third-party types** - You can add properties to interfaces from libraries without modifying the original source code. This is especially useful for adding custom properties to React Native's built-in types.

3. **Module augmentation** - You can extend the types of entire modules, adding new interfaces or extending existing ones. This is how you can add custom properties to React Native's style types or add new components to the JSX namespace.

4. **Namespace augmentation** - Similar to module augmentation, you can extend namespaces to add new types or values.

When discussing declaration merging with students, it's important to highlight that it only works with certain declarations, primarily interfaces. Classes, for example, cannot be merged in the same way. Also note that when merging interfaces, if the same property appears in multiple declarations with different types, TypeScript will require the property to satisfy all the types (effectively an intersection).

For React Native development specifically, declaration merging is particularly valuable for:
1. Extending style types to add custom properties that might be implemented through native modules
2. Adding custom properties to navigation parameter types across different files
3. Extending component prop types to add application-specific properties
4. Augmenting third-party library types to better match how they're used in your application

When teaching this concept, emphasize that while declaration merging is powerful, it should be used judiciously. Overusing it can make it difficult to track where properties are defined and can lead to confusion. It's generally best used for extending third-party types or for gradually building up interfaces that are logically related but defined in different parts of the codebase.

A common use case in React Native is extending the global theme type when using styled-components or other styling libraries. For example, you might want to add custom color or spacing properties to the theme:

```typescript
// theme.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
  }
}
```

Another valuable use case is extending React Navigation's parameter lists across different files, allowing you to maintain type safety while keeping your navigation types modular:

```typescript
// In navigation-types.ts
declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Profile: { userId: string };
      Settings: undefined;
    }
  }
}
```

---

## Declaration Merging: Code Example

```typescript
// Original interface
interface Medication {
  id: string;
  name: string;
  dosage: number;
}

// Adding more properties through declaration merging
interface Medication {
  unit: string;
  frequency: number;
}

// The Medication interface now has all five properties
const aspirin: Medication = {
  id: "med-001",
  name: "Aspirin",
  dosage: 100,
  unit: "mg",
  frequency: 2
};

// This is particularly useful for extending third-party types
// For example, extending React Native's TextStyle
declare module 'react-native' {
  interface TextStyle {
    textStroke?: string;
    textStrokeWidth?: number;
  }
}

// Now you can use these custom properties in your styles
const styles = StyleSheet.create({
  highlightedText: {
    fontSize: 18,
    color: 'white',
    textStroke: 'black',     // Custom property
    textStrokeWidth: 1       // Custom property
  }
});
```

Note: This example demonstrates two common uses of declaration merging in TypeScript: merging interface declarations and augmenting module types. Let's analyze each part in detail.

In the first section, we define an initial `Medication` interface with three properties: `id`, `name`, and `dosage`. Then, we define another interface with the same name, adding two more properties: `unit` and `frequency`. TypeScript merges these two declarations into a single interface that has all five properties.

This is useful in several scenarios:
1. When you're gradually building up an interface as you discover new requirements
2. When different aspects of an interface are defined in different files or modules
3. When you want to logically group related properties together in the code

The `aspirin` object demonstrates that we can create an object that conforms to the merged interface, providing values for all five properties. TypeScript ensures that all required properties from both interface declarations are present.

The second section demonstrates a more advanced use case: module augmentation. Here, we're extending the built-in `TextStyle` interface from the 'react-native' module to add two custom properties: `textStroke` and `textStrokeWidth`. These might represent custom styling capabilities implemented through a native module or a third-party library.

The syntax `declare module 'react-native'` tells TypeScript that we're augmenting the existing 'react-native' module, not creating a new one. Inside this declaration, we extend the `TextStyle` interface with our new properties.

After this augmentation, we can use these custom properties in our style objects, as shown in the `styles` object. TypeScript will recognize these properties as valid `TextStyle` properties, providing type checking and autocomplete.

When teaching this example, emphasize several key points:
1. Declaration merging is non-destructive - it adds to existing types rather than replacing them
2. It's particularly valuable for extending third-party types without modifying the original source code
3. Module augmentation should be used carefully, as it affects the global type system
4. This pattern is commonly used in React Native for extending style types, navigation parameters, and component props

In a React Native context, you might discuss how this feature can be used to add custom properties to navigation params, extend component prop types with application-specific properties, or add support for native module features that aren't covered by the default type definitions.

Declaration merging is powerful for extending existing types, especially from third-party libraries.

---

## Mapped Types

Mapped types allow you to create new types by transforming properties of existing types:

```
Basic syntax: { [K in keyof T]: T[K] }

Adding modifiers: { [K in keyof T]?: T[K] }

Removing modifiers: { [K in keyof T]-?: T[K] }

Remapping keys: { [K in keyof T as NewKeyType]: T[K] }

Filtering properties: { [K in keyof T as Condition<K>]: T[K] }

Conditional property types: { [K in keyof T]: T[K] extends Condition ? TrueType : FalseType }

Template literal key remapping: { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }

Key constraints: { [K in MyKeys]: T[K] } where MyKeys is a subset of keyof T
```

Note: Mapped types are one of TypeScript's most powerful and flexible type manipulation features. When teaching mapped types, it's important to emphasize how they enable systematic transformations of existing types, creating new types with modified characteristics while maintaining the structure of the original type.

Mapped types work by iterating over the properties of an existing type and applying a transformation to each property. This is conceptually similar to how array map methods work in JavaScript - just as `array.map()` transforms each element of an array, mapped types transform each property of a type. This makes them particularly valuable for creating variations of existing types without duplicating type definitions.

The basic syntax of a mapped type uses the `[K in keyof T]` pattern, where:
- `keyof T` produces a union of all property names in type `T`
- `K` is a type variable that represents each property name in that union
- `[K in keyof T]` iterates over all property names
- The type assigned to each property can reference the original type using `T[K]`

Mapped types can be enhanced with modifiers:
- Adding `?` makes all properties optional
- Adding `readonly` makes all properties read-only
- Using `-?` removes optionality (makes optional properties required)
- Using `-readonly` removes read-only constraints

When combined with conditional types (`T extends U ? X : Y`), mapped types become even more powerful, allowing for complex type transformations based on the characteristics of each property.

In React Native development, mapped types are particularly valuable for:
1. Creating form state types from data models
2. Transforming API response types to application models
3. Creating validation schema types from data models
4. Building type-safe event handling systems

When teaching mapped types, it's helpful to start with simple examples like making all properties optional or read-only, then progress to more complex transformations using conditional types. Emphasize that mapped types are a form of metaprogramming at the type level - they allow you to write types that generate other types based on patterns.

For students coming from other typed languages, highlight that mapped types provide a level of type manipulation that might not be available in their previous experience. For JavaScript developers, draw parallels to functional programming patterns like map, filter, and reduce, but applied to types rather than values.

A particularly powerful feature of mapped types in TypeScript 4.1+ is key remapping via the `as` clause. This allows you to not just transform the types of properties but also their names. For example, you could create getter methods for all properties of a type:

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

// Applied to a User type
interface User {
  id: string;
  name: string;
  age: number;
}

// Results in:
// {
//   getId: () => string;
//   getName: () => string;
//   getAge: () => number;
// }
```

This capability is especially useful in React Native when creating derived types for different contexts, such as transforming a data model into form state, validation schema, or display format.

---

## Mapped Types: Code Example

```typescript
// Original interface
interface Medication {
  id: string;
  name: string;
  dosage: number;
  unit: string;
}

// Create a new type where all properties are optional
type OptionalMedication = {
  [K in keyof Medication]?: Medication[K];
};

// Create a new type where all properties are readonly
type ReadonlyMedication = {
  readonly [K in keyof Medication]: Medication[K];
};

// Create a type with string values for all keys
type MedicationStringMap = {
  [K in keyof Medication]: string;
};

const medicationAsStrings: MedicationStringMap = {
  id: "med-001",
  name: "Aspirin",
  dosage: "100", // Now a string instead of number
  unit: "mg"
};

// More complex mapped type with conditional types
type MedicationFormFields = {
  [K in keyof Medication]: Medication[K] extends string | number
    ? { value: Medication[K]; error?: string }
    : never;
};

// This creates form field objects for each property
const medicationForm: MedicationFormFields = {
  id: { value: "med-001" },
  name: { value: "Aspirin", error: "Name too short" },
  dosage: { value: 100 },
  unit: { value: "mg" }
};
```

Note: This example demonstrates how to use mapped types to create new types by transforming an existing type in various ways. Let's analyze each mapped type in detail:

First, we define a base `Medication` interface that represents the structure of a medication in our application. This interface has four properties: `id`, `name`, `dosage`, and `unit`.

**OptionalMedication**: This mapped type makes all properties of the `Medication` interface optional by adding the `?` modifier to each property. The syntax `[K in keyof Medication]?` iterates over all property names in the `Medication` interface and makes each one optional. This is useful for creating types for partial updates or form states where not all fields need to be filled at once.

**ReadonlyMedication**: This mapped type makes all properties of the `Medication` interface read-only by adding the `readonly` modifier to each property. The syntax `readonly [K in keyof Medication]` iterates over all property names and makes each one read-only. This is valuable for creating immutable data structures or for types that represent data that shouldn't be modified after creation.

**MedicationStringMap**: This mapped type transforms all properties of the `Medication` interface to have string values, regardless of their original type. The syntax `[K in keyof Medication]: string` iterates over all property names but changes the type of each property to `string`. This is useful for scenarios like serialization, form input handling, or creating string representations of data.

The `medicationAsStrings` object demonstrates using this type. Notice that even though `dosage` was originally a number in the `Medication` interface, it's now a string in `medicationAsStrings`.

**MedicationFormFields**: This is a more complex mapped type that uses conditional types to transform each property based on its original type. The syntax `[K in keyof Medication]: Medication[K] extends string | number ? { value: Medication[K]; error?: string } : never` does the following:
1. Iterates over all property names in `Medication`
2. For each property, checks if its type extends `string | number` (i.e., is it a string or number?)
3. If it is a string or number, transforms it into an object with a `value` property of the original type and an optional `error` property
4. If it's not a string or number, assigns the `never` type (effectively excluding it)

This pattern is particularly useful for form handling, where each field needs to track both its value and potential validation errors. The `medicationForm` object demonstrates this, with each property transformed into an object with a `value` and optional `error`.

When teaching this example, emphasize several key points:
1. Mapped types provide a systematic way to transform all properties of a type according to a pattern
2. They can be combined with modifiers like `?` and `readonly` to change property characteristics
3. When combined with conditional types, they enable complex type transformations based on property types
4. They maintain the property names from the original type, ensuring consistency

In a React Native context, you might discuss how mapped types can be used to create form state types from data models, transform API responses to application models, or create validation schema types. These are common patterns in mobile app development where data needs to be transformed between different representations while maintaining type safety.

Mapped types are powerful for creating consistent transformations of existing types.

---

## Exercise

<div class="exercise">

### Exercise: Advanced TypeScript with React Native

**Objective:** Apply advanced TypeScript features to improve a medication reminder component.

**Time:** 15-20 minutes

**Instructions:**
1. Create a new Expo TypeScript project: `npx create-expo-app AdvancedTypescript --template expo-template-blank-typescript`
2. Navigate to the project: `cd AdvancedTypescript`
3. Create a file called `types.ts` with the following:
   - A base `Medication` interface
   - A generic `Reminder<T>` interface that can work with different item types
   - A utility type that makes all properties of a type required and non-nullable
   - A mapped type that converts all number properties to string properties
4. Create a component that uses these types to display medication reminders
5. Implement at least one type guard to handle different reminder types
6. Run the project with `npx expo start` to verify it works correctly

**Resources:**
- [TypeScript Handbook: Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Expo Snack](https://snack.expo.dev/)

</div>

---

# Section 5: TypeScript Best Practices for React Native

---

## Organizing Types in React Native Projects

Best practices:
- Group related types in dedicated files
- Co-locate component-specific types with components
- Use barrel files (index.ts) to simplify imports
- Keep type definitions close to where they're used

Example of a barrel file (types/index.ts):
```typescript
// Re-export all types for easier imports
export * from './medication';
export * from './patient';
export * from './api';
export * from './navigation';
```

Note: Organizing types effectively is crucial for maintaining large React Native projects. When teaching this concept, emphasize that there's no one-size-fits-all approach, but rather principles that teams should adapt to their specific needs. The barrel file pattern shown here is particularly valuable as projects grow, as it simplifies imports and creates a cleaner API for accessing types throughout the codebase. Encourage students to consider the tradeoff between centralized type definitions (easier to find and maintain consistency) versus co-located types (better for component encapsulation). For pharmacy/healthcare applications, demonstrate how organizing medication, patient, and prescription types in dedicated files creates a more intuitive codebase structure. Also highlight that TypeScript's module system makes it easy to split types across files while maintaining their relationships through imports and exports. This organization becomes especially important when working with complex domain models or when multiple developers collaborate on the same codebase.

---

## Organizing Types in React Native Projects: Example

Proper organization of TypeScript types improves maintainability:

```
src/
├── types/
│   ├── index.ts          # Re-exports all types
│   ├── medication.ts     # Medication-related types
│   ├── patient.ts        # Patient-related types
│   ├── api.ts            # API response types
│   └── navigation.ts     # Navigation types
├── components/
│   ├── MedicationItem/
│   │   ├── index.tsx     # Component implementation
│   │   └── types.ts      # Component-specific types
│   └── ...
└── screens/
    ├── MedicationList/
    │   ├── index.tsx     # Screen implementation
    │   └── types.ts      # Screen-specific types
    └── ...
```

Note: This example illustrates a well-organized TypeScript project structure for a React Native application. When teaching this concept, emphasize how this organization improves maintainability and collaboration. The central `/types` directory houses domain-specific type definitions that are shared across the application, while component-specific types remain co-located with their components. This balances centralization with encapsulation. The barrel file pattern (index.ts) simplifies imports by providing a single entry point for all shared types. For healthcare applications, point out how separating medication, patient, and API types creates a more intuitive mental model of the domain. Discuss how this structure scales as applications grow - larger projects might introduce subdirectories within the types folder for feature areas. Encourage students to adapt this pattern to their team's needs rather than following it rigidly. This organization becomes particularly valuable when multiple developers work on the same codebase, as it creates clear conventions for where types should be defined and imported from.

---

## Type-Safe API Calls

TypeScript helps ensure API calls are type-safe:

- **Response type definitions**: Define interfaces for API response structures
- **Request type definitions**: Define types for API request parameters
- **Data Transfer Objects (DTOs)**: Create types that match the exact API data format
- **Model transformations**: Define types for converting between API and application formats
- **Generic API clients**: Create reusable, type-safe API utilities
- **Error handling types**: Define types for different error responses
- **Runtime validation**: Combine TypeScript with runtime validation libraries
- **Async/await typing**: Properly type Promise-based API calls

Note: API interactions are a critical part of most React Native applications, and TypeScript can significantly enhance the safety and maintainability of API code. When teaching type-safe API calls, it's important to emphasize how TypeScript helps prevent common API-related errors and improves the developer experience when working with external data.

In React Native applications, API calls often involve fetching data from a server, transforming that data into a format suitable for the application, and then using it to update the UI. Without TypeScript, this process can be error-prone, as there's no guarantee that the data received from the API matches what the application expects. TypeScript addresses this by providing a way to define the expected shape of API responses and ensuring that data transformations maintain type safety.

The key benefits of using TypeScript with API calls include:

1. **Type safety for API responses**: By defining interfaces for API responses, TypeScript ensures that you're handling all the expected properties and that you're using them with the correct types. This prevents runtime errors that might occur if the API returns data in an unexpected format.

2. **Data transformation safety**: When transforming data from API responses to application models, TypeScript ensures that all required properties are included and that they have the correct types. This is particularly valuable when dealing with differences between API and application conventions, such as snake_case vs. camelCase.

3. **Documentation**: Type definitions serve as documentation for API responses, making it clear to other developers what data is expected from each endpoint. This is especially valuable in team environments where multiple developers might be working with the same API.

4. **Refactoring safety**: When API responses change, TypeScript will identify all places in your code that need to be updated to handle the new response format. This makes refactoring safer and helps prevent bugs when APIs evolve.

When teaching this concept, it's helpful to demonstrate a complete API interaction flow, from defining response types to transforming data and using it in components. Emphasize the importance of separating API response types (DTOs - Data Transfer Objects) from application model types, as this allows for cleaner transformations and better handles differences in naming conventions or data structures.

Also discuss error handling in the context of typed API calls. TypeScript can help ensure that error responses are handled correctly, but it's important to remember that runtime type checking is still necessary for data received from external sources. Type assertions should be used carefully and ideally combined with runtime validation.

A best practice to emphasize is the creation of a type-safe API client that encapsulates all API calls and their type definitions. This approach centralizes API logic and types, making it easier to maintain and update as the API evolves. For example:

```typescript
// api-client.ts
class ApiClient {
  async getMedications(): Promise<Medication[]> {
    // Implementation
  }
  
  async getMedicationById(id: string): Promise<Medication> {
    // Implementation
  }
  
  async createMedication(data: CreateMedicationRequest): Promise<Medication> {
    // Implementation
  }
  
  // etc.
}
```

This pattern is particularly valuable in larger applications where multiple components need to interact with the same API endpoints. It ensures consistent typing across the application and makes it easier to handle changes to the API.

---

## Type-Safe API Calls: Code Example

```typescript
// Define API response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface MedicationDTO {
  id: string;
  name: string;
  dosage_mg: number; // Note: API uses snake_case
  frequency_per_day: number;
}

// Transform API data to application model
interface Medication {
  id: string;
  name: string;
  dosage: number; // Note: Application uses camelCase
  frequency: number;
}

// Type-safe API function
async function fetchMedications(): Promise<Medication[]> {
  try {
    const response = await fetch('https://api.example.com/medications');
    const json = await response.json() as ApiResponse<MedicationDTO[]>;
    
    // Transform API data to application model
    return json.data.map(item => ({
      id: item.id,
      name: item.name,
      dosage: item.dosage_mg,
      frequency: item.frequency_per_day
    }));
  } catch (error) {
    console.error('Error fetching medications:', error);
    return [];
  }
}

// Usage in a component
function MedicationScreen() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchMedications();
      setMedications(data);
      setLoading(false);
    }
    
    loadData();
  }, []);
  
  // Component rendering...
}
```

Note: This example demonstrates how to implement type-safe API calls in a React Native application using TypeScript. Let's analyze the key aspects of this code to understand how TypeScript enhances API interactions.

First, we define a generic interface `ApiResponse<T>` that represents the common structure of our API responses. This interface includes:
- `data`: The actual response data, with a generic type `T` that will vary depending on the endpoint
- `status`: A number representing the HTTP status code
- `message`: A string providing additional information about the response

This generic interface allows us to reuse the same response structure across different endpoints while varying the data type.

Next, we define a `MedicationDTO` interface that represents the structure of medication data as it comes from the API. The "DTO" suffix stands for Data Transfer Object, indicating that this type represents data as transferred over the network. Notice that this interface uses snake_case property names (`dosage_mg`, `frequency_per_day`) to match the API's naming convention.

We then define a separate `Medication` interface that represents how we want to use medication data within our application. This interface uses camelCase property names (`dosage`, `frequency`) to match JavaScript/React Native conventions. Separating these interfaces allows us to clearly distinguish between the external API format and our internal application format.

The `fetchMedications` function demonstrates a type-safe API call:
1. It returns a `Promise<Medication[]>`, clearly indicating that it will asynchronously provide an array of Medication objects.
2. It uses a type assertion (`as ApiResponse<MedicationDTO[]>`) to tell TypeScript that the parsed JSON matches our expected response format. In a production application, you might want to add runtime validation to ensure this is actually true.
3. It transforms the data from the API format to the application format, mapping snake_case properties to camelCase properties. TypeScript ensures that this transformation is complete and correct.

Finally, the `MedicationScreen` component shows how to use this typed API function in a React component:
1. It declares state with explicit types: `useState<Medication[]>([])` ensures that `medications` will always be an array of Medication objects.
2. It calls the API function in a useEffect hook and updates the state with the typed result.

When teaching this example, emphasize several key points:
1. The separation of API types (DTOs) from application types allows for clean transformations and adaptation to different naming conventions.
2. Generic types like `ApiResponse<T>` enable code reuse while maintaining type safety.
3. Explicit return types for API functions (`Promise<Medication[]>`) create clear contracts about what data will be provided.
4. Type assertions should be used carefully and ideally combined with runtime validation for data from external sources.
5. Typed state ensures that components correctly handle the data received from APIs.

In a larger application, you might extend this pattern by:
- Creating a dedicated API client with typed methods for each endpoint
- Adding more sophisticated error handling with typed error responses
- Implementing runtime validation using libraries like Zod or io-ts
- Using code generation tools to create TypeScript types from API specifications (e.g., OpenAPI/Swagger)

Benefits of type-safe API calls:
- Clear contract between frontend and backend
- Automatic documentation of API responses
- Easier refactoring when API changes
- Runtime type safety through transformation

---

## TypeScript with React Navigation

TypeScript enhances React Navigation with type-safe routes and params:

- **ParamList types**: Define the screens and their parameters
- **NavigationProp**: Type-safe navigation methods
- **RouteProp**: Type-safe access to route parameters
- **Nested navigators**: Type composition for complex navigation structures
- **useNavigation hook**: Typed with

Note: When teaching TypeScript with React Navigation, emphasize how static typing improves the navigation experience. React Navigation is a core library in React Native development, and TypeScript integration provides significant safety benefits. The ParamList type defines the structure of all screens and their parameters, creating a single source of truth for the navigation structure. NavigationProp and RouteProp types ensure that navigation actions and parameter access are type-safe, preventing common errors like typos in route names or accessing non-existent parameters. For healthcare applications, demonstrate how this prevents critical errors like navigating to the wrong patient record or medication detail screen. Show how TypeScript catches these errors at compile time rather than runtime. The useNavigation hook with proper typing provides autocomplete for available screens and required parameters. This is particularly valuable in large applications with complex navigation structures. Nested navigators benefit greatly from TypeScript's ability to compose types, allowing for type safety even in deeply nested navigation structures.

---

## Type-Safe API Calls: Code Example

```typescript
// Define API response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface MedicationDTO {
  id: string;
  name: string;
  dosage_mg: number; // Note: API uses snake_case
  frequency_per_day: number;
}

// Transform API data to application model
interface Medication {
  id: string;
  name: string;
  dosage: number; // Note: Application uses camelCase
  frequency: number;
}

// Type-safe API function
async function fetchMedications(): Promise<Medication[]> {
  try {
    const response = await fetch('https://api.example.com/medications');
    const json = await response.json() as ApiResponse<MedicationDTO[]>;
    
    // Transform API data to application model
    return json.data.map(item => ({
      id: item.id,
      name: item.name,
      dosage: item.dosage_mg,
      frequency: item.frequency_per_day
    }));
  } catch (error) {
    console.error('Error fetching medications:', error);
    return [];
  }
}

// Usage in a component
function MedicationScreen() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchMedications();
      setMedications(data);
      setLoading(false);
    }
    
    loadData();
  }, []);
  
  // Component rendering...
}
```

Note: This example demonstrates how to implement type-safe API calls in a React Native application using TypeScript. Let's analyze the key aspects of this code to understand how TypeScript enhances API interactions.

First, we define a generic interface `ApiResponse<T>` that represents the common structure of our API responses. This interface includes:
- `data`: The actual response data, with a generic type `T` that will vary depending on the endpoint
- `status`: A number representing the HTTP status code
- `message`: A string providing additional information about the response

This generic interface allows us to reuse the same response structure across different endpoints while varying the data type.

Next, we define a `MedicationDTO` interface that represents the structure of medication data as it comes from the API. The "DTO" suffix stands for Data Transfer Object, indicating that this type represents data as transferred over the network. Notice that this interface uses snake_case property names (`dosage_mg`, `frequency_per_day`) to match the API's naming convention.

We then define a separate `Medication` interface that represents how we want to use medication data within our application. This interface uses camelCase property names (`dosage`, `frequency`) to match JavaScript/React Native conventions. Separating these interfaces allows us to clearly distinguish between the external API format and our internal application format.

The `fetchMedications` function demonstrates a type-safe API call:
1. It returns a `Promise<Medication[]>`, clearly indicating that it will asynchronously provide an array of Medication objects.
2. It uses a type assertion (`as ApiResponse<MedicationDTO[]>`) to tell TypeScript that the parsed JSON matches our expected response format. In a production application, you might want to add runtime validation to ensure this is actually true.
3. It transforms the data from the API format to the application format, mapping snake_case properties to camelCase properties. TypeScript ensures that this transformation is complete and correct.

Finally, the `MedicationScreen` component shows how to use this typed API function in a React component:
1. It declares state with explicit types: `useState<Medication[]>([])` ensures that `medications` will always be an array of Medication objects.
2. It calls the API function in a useEffect hook and updates the state with the typed result.

When teaching this example, emphasize several key points:
1. The separation of API types (DTOs) from application types allows for clean transformations and adaptation to different naming conventions.
2. Generic types like `ApiResponse<T>` enable code reuse while maintaining type safety.
3. Explicit return types for API functions (`Promise<Medication[]>`) create clear contracts about what data will be provided.
4. Type assertions should be used carefully and ideally combined with runtime validation for data from external sources.
5. Typed state ensures that components correctly handle the data received from APIs.

In a larger application, you might extend this pattern by:
- Creating a dedicated API client with typed methods for each endpoint
- Adding more sophisticated error handling with typed error responses
- Implementing runtime validation using libraries like Zod or io-ts
- Using code generation tools to create TypeScript types from API specifications (e.g., OpenAPI/Swagger)

Benefits of type-safe API calls:
- Clear contract between frontend and backend
- Automatic documentation of API responses
- Easier refactoring when API changes
- Runtime type safety through transformation

---

## TypeScript with React Navigation

TypeScript enhances React Navigation with type-safe routes and params:

- **ParamList types**: Define the screens and their parameters
- **NavigationProp**: Type-safe navigation methods
- **RouteProp**: Type-safe access to route parameters
- **Nested navigators**: Type composition for complex navigation structures
- **useNavigation hook**: Typed with

Note: Navigation is a critical aspect of React Native applications, and TypeScript can significantly improve the safety and developer experience of navigation code. When teaching TypeScript with React Navigation, it's important to emphasize how type safety prevents common navigation errors and improves maintainability as applications grow.

React Navigation is the most widely used navigation library for React Native, and it provides excellent TypeScript support. The key benefit of using TypeScript with React Navigation is the ability to define a type-safe schema for your navigation structure, including screen names and the parameters each screen accepts.

The foundation of typed navigation is the `ParamList` type, which defines the screens in your navigation hierarchy and the parameters each screen accepts. This creates a contract that ensures:
1. You can only navigate to screens that actually exist
2. You provide all required parameters when navigating
3. You don't pass parameters that a screen doesn't expect
4. You can safely access parameters in your screen components

When defining navigation types, it's important to understand the relationship between three key types:
1. The `ParamList` type that defines your navigation structure
2. The `NavigationProp` type that provides type-safe navigation methods
3. The `RouteProp` type that provides type-safe access to route parameters

For complex applications with nested navigators, you can create separate param list types for each navigator and compose them together. This creates a type-safe representation of your entire navigation hierarchy.

In React Native development, navigation parameters often include IDs or other data needed to fetch information or perform operations. Type-safe navigation ensures that these critical parameters are always provided, preventing runtime errors when a screen tries to access missing parameters.

When teaching this concept, it's helpful to demonstrate how TypeScript catches common navigation errors, such as:
- Navigating to a non-existent screen
- Forgetting to provide required parameters
- Providing parameters of the wrong type
- Accessing parameters that don't exist for a particular screen

Also emphasize how typed navigation improves the developer experience through better autocomplete and documentation. When you type `navigation.navigate(`, your IDE can show you a list of available screens, and after selecting a screen, it can show you the required parameters for that screen.

For students transitioning from JavaScript to TypeScript, highlight that while setting up typed navigation requires some initial investment, it pays dividends through improved code quality, better IDE support, and fewer runtime errors. This is especially valuable as applications grow and navigation structures become more complex.

---

## TypeScript with React Navigation: Code Example

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation parameter types
type RootStackParamList = {
  Home: undefined;
  MedicationList: undefined;
  MedicationDetails: { medicationId: string; editable?: boolean };
  AddMedication: { patientId: string } | undefined;
};

// Create the navigator
const Stack = createStackNavigator<RootStackParamList>();

// Type for navigation prop
type MedicationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MedicationDetails'
>;

// Type for route prop
type MedicationDetailsRouteProp = RouteProp<
  RootStackParamList,
  'MedicationDetails'
>;

// Props for the screen component
interface MedicationDetailsProps {
  navigation: MedicationDetailsNavigationProp;
  route: MedicationDetailsRouteProp;
}

// Screen component with typed props
function MedicationDetailsScreen({ navigation, route }: MedicationDetailsProps) {
  // Type-safe access to route params
  const { medicationId, editable = false } = route.params;
  
  // Type-safe navigation
  const handleEdit = () => {
    if (editable) {
      // TypeScript ensures we provide the required medicationId
      navigation.navigate('AddMedication', { patientId: 'patient-001' });
    }
  };
  
  return (
    // Component implementation...
    <View>
      <Text>Medication Details for ID: {medicationId}</Text>
      {editable && (
        <Button title="Edit" onPress={handleEdit} />
      )}
    </View>
  );
}

// App navigation container
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MedicationList" component={MedicationListScreen} />
        <Stack.Screen name="MedicationDetails" component={MedicationDetailsScreen} />
        <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Note: This example demonstrates how to use TypeScript with React Navigation to create type-safe navigation in a medication tracking application. Let's analyze the key aspects of this code to understand how TypeScript enhances navigation.

First, we define a `RootStackParamList` type that specifies all the screens in our navigation stack and the parameters each screen accepts:
- `Home`: No parameters (undefined)
- `MedicationList`: No parameters (undefined)
- `MedicationDetails`: Requires a `medicationId` string and has an optional `editable` boolean
- `AddMedication`: Either requires a `patientId` string or no parameters (undefined)

This type serves as a contract for our navigation structure, ensuring that we can only navigate to screens that actually exist and that we provide the correct parameters when navigating.

Next, we create the navigator using `createStackNavigator<RootStackParamList>()`, passing our param list type as a generic parameter. This connects our type definitions to the actual navigator implementation.

For the `MedicationDetailsScreen`, we define two specific types:
1. `MedicationDetailsNavigationProp`: This type provides type-safe navigation methods specifically for the MedicationDetails screen. It knows about all the screens in our navigation stack and their required parameters.
2. `MedicationDetailsRouteProp`: This type provides type-safe access to the route parameters for the MedicationDetails screen. It knows that this screen should receive a `medicationId` and an optional `editable` parameter.

We combine these types in the `MedicationDetailsProps` interface, which defines the props for our screen component. This ensures that the component receives properly typed navigation and route props.

Inside the `MedicationDetailsScreen` component, we can safely destructure the route parameters with `const { medicationId, editable = false } = route.params`. TypeScript knows that `medicationId` is a string and `editable` is an optional boolean. We provide a default value of `false` for `editable` in case it's not provided.

The `handleEdit` function demonstrates type-safe navigation. When we call `navigation.navigate('AddMedication', { patientId: 'patient-001' })`, TypeScript ensures that:
1. 'AddMedication' is a valid screen in our navigation stack
2. The parameters we provide match what the AddMedication screen expects

If we tried to navigate to a non-existent screen or provide incorrect parameters, TypeScript would raise a compile-time error.

Finally, the `App` component sets up the navigation container and stack navigator with all our screens. Even here, TypeScript ensures that the screen names in `<Stack.Screen name="..." />` match the keys in our `RootStackParamList` type.

When teaching this example, emphasize how TypeScript provides end-to-end type safety for navigation:
1. It ensures we only navigate to screens that exist
2. It ensures we provide all required parameters when navigating
3. It ensures we can safely access parameters in screen components
4. It provides autocomplete and documentation for navigation methods and parameters

This type safety is particularly valuable in larger applications where navigation structures can become complex and where navigation parameters often contain critical data needed for screen functionality.

Benefits of typed navigation:
- Prevents navigation to non-existent screens
- Ensures required parameters are provided
- Provides autocomplete for route names and params
- Makes refactoring safer when changing route parameters

---

## Common TypeScript Pitfalls in React Native

Avoid these common TypeScript issues in React Native projects:

1. Type Assertions vs. Type Declarations
2. Overusing `any`
3. Not Handling Null/Undefined
4. Forgetting to Type React.useState
5. Incorrect Event Handler Types

---

### Type Assertions vs. Type Declarations

```typescript
// ❌ Incorrect: Type assertion without verification
const userData = JSON.parse(response) as UserData;

// ✅ Better: Validate before asserting
function isUserData(data: any): data is UserData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

const responseData = JSON.parse(response);
if (isUserData(responseData)) {
  const userData: UserData = responseData;
  // Safe to use userData
}
```

Note: Type assertions can be dangerous when used without proper validation. This slide demonstrates how to safely handle type assertions by implementing a type guard function. The type guard ensures that the data actually matches the expected structure before we assert its type. This is particularly important when dealing with external data sources like APIs, where we can't guarantee the shape of the data at compile time.

---

### Overusing `any`

```typescript
// ❌ Avoid: Losing type safety with any
function processMedication(medication: any) {
  return medication.dosage * 2; // No type checking!
}

// ✅ Better: Use unknown with type narrowing
function processMedication(medication: unknown): number {
  if (
    typeof medication === 'object' &&
    medication !== null &&
    'dosage' in medication &&
    typeof medication.dosage === 'number'
  ) {
    return medication.dosage * 2; // Type-safe!
  }
  throw new Error('Invalid medication object');
}
```

Note: The `any` type is often used as a quick fix to bypass TypeScript's type checking, but it completely defeats the purpose of using TypeScript. This slide shows how to properly handle unknown data types using type narrowing with the `unknown` type. The example demonstrates a safer approach that maintains type safety while still allowing for flexible data handling. This is especially important in healthcare applications where type safety is crucial.

---

### Not Handling Null/Undefined

```typescript
// ❌ Risky: Not handling potential null/undefined
function getMedicationName(medication?: Medication): string {
  return medication.name; // Potential runtime error!
}

// ✅ Better: Handle null/undefined cases
function getMedicationName(medication?: Medication): string {
  return medication?.name ?? 'Unknown medication'; // Safe!
}
```

Note: Null and undefined values are common sources of runtime errors in JavaScript applications. This slide demonstrates the importance of defensive programming when working with potentially null or undefined values. In TypeScript, the optional parameter syntax (?) indicates that a parameter might be undefined, but it doesn't automatically protect you from accessing properties on that undefined value. The example shows how to use the optional chaining operator (?.) and nullish coalescing operator (??) to safely handle these cases. Optional chaining allows you to safely access nested properties without checking each level for null/undefined, while nullish coalescing provides a default value when the expression evaluates to null or undefined. This pattern is particularly important in healthcare applications where missing data should be handled gracefully rather than causing crashes. When teaching this concept, emphasize that TypeScript can warn about potential null/undefined issues at compile time, but you still need to write code that handles these cases properly at runtime.

---

### Forgetting to Type React.useState

```typescript
// ❌ Suboptimal: Implicit any[] type
const [medications, setMedications] = useState([]);

// ✅ Better: Explicit type annotation
const [medications, setMedications] = useState<Medication[]>([]);
```

Note: This example highlights a common mistake when using React's useState hook with TypeScript. When the type parameter is omitted, TypeScript will infer the type based on the initial value. In this case, an empty array results in an implicit `any[]` type, which loses type safety. This can lead to runtime errors when you try to access properties of items in the array or when you add items of different types to the array. By explicitly providing the type parameter `<Medication[]>`, you ensure that TypeScript enforces that only Medication objects can be added to the array. This provides better autocomplete support, catches type errors during development, and serves as self-documentation. For healthcare applications where data consistency is critical, properly typing state is especially important. When teaching this concept, demonstrate how explicit typing prevents common errors like adding incompatible objects to the array or accessing non-existent properties. This pattern should be consistently applied to all useState calls in a React Native application.

---

### Incorrect Event Handler Types

```typescript
// ❌ Incorrect: Wrong event type
const handleChange = (event: any) => {
  setValue(event.target.value); // 'target' doesn't exist on React Native events!
};

// ✅ Correct: Proper React Native event type
const handleChange = (text: string) => {
  setValue(text);
};

// Usage
<TextInput onChangeText={handleChange} />
```

Note: This example highlights a critical difference between web React and React Native event handling. In web React, event handlers receive synthetic event objects with properties like 'target', but React Native components use different patterns. TextInput's onChangeText directly provides the text string rather than an event object. Using 'any' type masks this platform difference, leading to runtime errors. Always use platform-specific event types in React Native - TextInput events receive text strings, TouchableOpacity's onPress has no parameters, and gesture handlers have their own specific types. This pattern is especially important when converting web React code to React Native, as event handling is one of the most significant differences between platforms.

---

## Challenge

<div class="challenge">

### Challenge: TypeScript Medication Reminder App

**Objective:** Create a medication reminder application using TypeScript and React Native that demonstrates your understanding of TypeScript concepts.

**Time:** 30-60 minutes

**Instructions:**
1. Create a new Expo TypeScript project: `npx create-expo-app MedicationReminder --template expo-template-blank-typescript`
2. Navigate to the project: `cd MedicationReminder`
3. Implement the following features:
   - A comprehensive type system for medications, reminders, and user profiles
   - A screen to display a list of medications with dosage information
   - A form to add new medications with proper validation
   - A detail view for each medication
   - A reminder system that shows notifications (mock implementation is fine)

**Requirements:**
- Use interfaces, type aliases, and generics appropriately
- Implement at least one custom type guard
- Use TypeScript utility types where appropriate
- Ensure all components have properly typed props
- Implement proper error handling with type safety
- Follow the best practices for organizing types
- Include comments explaining your TypeScript implementation choices

**Resources:**
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Native TypeScript Documentation](https://reactnative.dev/docs/typescript)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Snack](https://snack.expo.dev/)

</div>

---

## Additional Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [React Native TypeScript Documentation](https://reactnative.dev/docs/typescript)
- [TypeScript Deep Dive Book](https://basarat.gitbook.io/typescript/)
- [TypeScript React Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [Definitely Typed Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React Native Type-Safe API Calls with Axios](https://github.com/axios/axios#typescript)

---

# Summary

- TypeScript adds static typing to JavaScript, catching errors during development rather than at runtime
- TypeScript is particularly valuable in React Native for improving code quality and developer experience
- Core TypeScript concepts include basic types, interfaces, type aliases, unions, and generics
- React Native components benefit from typed props, state, and event handlers
- Advanced TypeScript features like utility types, type guards, and mapped types enable more robust code
- Following TypeScript best practices leads to more maintainable React Native applications
- TypeScript enhances collaboration by providing clear contracts between components and functions

---

# Thank You!

Questions?

[Back to Course Home](../../index.html)
