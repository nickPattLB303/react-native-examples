# Module 5: TypeScript Essentials

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

## Overview

TypeScript is a powerful superset of JavaScript that adds static typing to the language. In this module, we'll explore TypeScript fundamentals and how they enhance React Native development by catching errors early, improving code quality, and providing better tooling support. TypeScript has become the standard in modern React Native development, making it an essential skill for building robust mobile applications.

Note: This module builds on JavaScript knowledge. Web and JavaScript developers may find some concepts familiar, while native mobile developers may want to pay special attention to TypeScript's type system which provides structure similar to strongly-typed languages like Swift or Kotlin.

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

Note: TypeScript's type system is the cornerstone of its value proposition. When teaching basic types, it's important to emphasize that TypeScript's type system is designed to be intuitive for developers coming from both JavaScript and statically-typed languages. The basic types in TypeScript closely mirror JavaScript's runtime types, making the transition smoother for JavaScript developers.

For primitive types (string, number, boolean), explain that these correspond directly to JavaScript's primitive types but with compile-time checking. This means that once a variable is declared as a string, TypeScript will prevent operations that aren't valid for strings, like mathematical operations (except concatenation).

The special types (null, undefined, any, never) serve specific purposes in TypeScript's type system. The `any` type is particularly important to discuss as it effectively opts out of type checking. While it can be useful during migration or for working with dynamic data, overusing `any` defeats the purpose of using TypeScript. The `never` type represents values that never occur - useful for functions that always throw exceptions or never return.

Arrays in TypeScript can be typed in two ways: using the `Type[]` syntax or the generic `Array<Type>` syntax. Both are equivalent, but the first is more commonly used due to its brevity. When teaching arrays, emphasize that TypeScript will ensure operations on the array are valid for its element type.

Tuples are a TypeScript-specific feature not present in JavaScript. They allow you to express an array with a fixed number of elements where each element may have a different type. This is particularly useful for representing pairs or triplets of related values, like coordinates or key-value pairs.

When discussing these types with students, provide real-world examples relevant to medication management to make the concepts more concrete and applicable to their domain.

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

Note: Type inference is one of TypeScript's most powerful features, allowing developers to benefit from static typing without having to explicitly annotate every variable. When teaching type inference, emphasize that it's not about avoiding type annotations entirely, but about using them strategically where they add the most value.

TypeScript's type inference system is contextual and sophisticated. It can determine types not just from initialization values, but also from how variables are used throughout the code. This bidirectional type inference is particularly powerful in function contexts.

For beginners, it's helpful to explain that TypeScript follows a simple rule: if it can confidently determine a variable's type from its initialization or usage, it will do so. This means developers can often omit type annotations for local variables, especially when they're initialized with literal values or expressions with clear types.

However, there are important cases where explicit type annotations are still recommended:
1. Function parameters, to ensure callers provide the correct types
2. Function return types, to create a clear contract and catch implementation errors
3. Class properties, to document the intended types for maintainers
4. Empty arrays or objects, where TypeScript can't infer the intended element types

When discussing type inference with students, emphasize that it's about finding the right balance. Too few annotations can make code harder to understand and maintain, while too many can create unnecessary verbosity. The goal is to use type annotations where they provide the most value for documentation, error prevention, and developer experience.

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

Note: Interfaces and type aliases are fundamental tools for creating custom types in TypeScript, allowing developers to define the shape of objects and create reusable type definitions. When teaching these concepts, it's important to explain both their similarities and differences.

Interfaces in TypeScript define contracts that objects must adhere to. They're particularly useful for defining the shape of objects, especially when those objects represent entities in your domain model or API responses. Interfaces can be extended (using the `extends` keyword) and implemented by classes, making them ideal for object-oriented programming patterns.

Type aliases, on the other hand, create new names for types. They can represent not just object shapes, but also primitives, unions, tuples, and other more complex types. Type aliases can use the intersection operator (`&`) to combine multiple types.

A key difference to highlight is that interfaces can be augmented after their initial declaration (through declaration merging), while type aliases cannot be changed after being defined. This makes interfaces more flexible in certain scenarios, particularly when working with third-party code or when you need to gradually build up a type definition.

When discussing these concepts with students, emphasize that the choice between interfaces and type aliases often comes down to the specific use case and team preferences. In React Native development, both are commonly used, with interfaces often preferred for component props and API responses, and type aliases often used for unions, intersections, and other complex types.

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

Note: Union and intersection types are powerful features in TypeScript that enable more flexible and precise type definitions. When teaching these concepts, it's helpful to use analogies from set theory: union types represent the union of sets (A OR B), while intersection types represent the intersection of sets (A AND B).

Union types, denoted by the `|` operator, allow a value to be one of several types. This is particularly useful for functions that can accept different types of input or for variables that might hold different types of values at different times. In React Native development, union types are commonly used for component props that can accept multiple types of values, such as a string or a number for a size prop.

Intersection types, denoted by the `&` operator, combine multiple types into one. This is useful for composing complex types from simpler ones, particularly when you want to merge the properties of multiple interfaces. In React Native, intersection types are often used to combine multiple prop types or to extend existing types with additional properties.

When discussing these concepts with students, emphasize that union and intersection types provide a way to model complex relationships between types that would be difficult or impossible to express with just interfaces or classes. They're particularly valuable in functional programming patterns and when working with complex data structures.

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

Key TypeScript features demonstrated:
- State interface definition
- Generic useState with type parameter
- Using `keyof` to ensure field names are valid
- Type-safe error handling

---

## Typing Event Handlers

TypeScript helps ensure event handlers are properly typed:

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

React Native provides specific event types that help ensure your event handlers are correctly implemented.

---

## Typing Styles

TypeScript can help ensure your styles are valid:

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

Generics are powerful for creating flexible, reusable code while maintaining type safety.

---

## Type Guards and Type Narrowing

Type guards help TypeScript understand the type of a variable within a certain scope:

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

Type guards are especially useful when working with union types in React Native components.

---

## Utility Types

TypeScript provides built-in utility types to transform existing types:

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

These utility types help create derived types without duplicating type definitions, making your code more maintainable.

---

## Declaration Merging

TypeScript allows you to extend existing types through declaration merging:

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

Declaration merging is powerful for extending existing types, especially from third-party libraries.

---

## Mapped Types

Mapped types allow you to create new types by transforming properties of existing types:

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

---

## Type-Safe API Calls

TypeScript helps ensure API calls are type-safe:

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

Benefits of type-safe API calls:
- Clear contract between frontend and backend
- Automatic documentation of API responses
- Easier refactoring when API changes
- Runtime type safety through transformation

---

## TypeScript with React Navigation

TypeScript enhances React Navigation with type-safe routes and params:

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

Benefits of typed navigation:
- Prevents navigation to non-existent screens
- Ensures required parameters are provided
- Provides autocomplete for route names and params
- Makes refactoring safer when changing route parameters

---

## Common TypeScript Pitfalls in React Native

Avoid these common TypeScript issues in React Native projects:

### 1. Type Assertions vs. Type Declarations

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

### 2. Overusing `any`

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

### 3. Not Handling Null/Undefined

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

### 4. Forgetting to Type React.useState

```typescript
// ❌ Suboptimal: Implicit any[] type
const [medications, setMedications] = useState([]);

// ✅ Better: Explicit type annotation
const [medications, setMedications] = useState<Medication[]>([]);
```

### 5. Incorrect Event Handler Types

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
