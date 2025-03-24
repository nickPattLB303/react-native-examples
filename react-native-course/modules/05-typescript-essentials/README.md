# Module 5: TypeScript Essentials

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

<blockquote><details>

TypeScript bridges the gap between JavaScript's flexibility and the type safety found in native mobile development. This module provides a foundation for all developers regardless of background. JavaScript developers will expand their skills with static typing, while native developers from Swift/Kotlin backgrounds will find familiar type concepts that make React Native development more comfortable. Understanding TypeScript's type system is essential as it's now the standard in modern React Native development.

</details></blockquote>

---

## Overview

TypeScript is a powerful superset of JavaScript that adds static typing to the language. In this module, we'll explore TypeScript fundamentals and how they enhance React Native development by catching errors early, improving code quality, and providing better tooling support. TypeScript has become the standard in modern React Native development, making it an essential skill for building robust mobile applications.

<blockquote><details>

TypeScript addresses many pain points in large-scale JavaScript development, particularly for mobile applications where user experience is critical. Its static typing system catches errors during development rather than at runtime, improving code quality and maintainability. While there is an initial learning curve, the investment pays off through improved developer productivity, better tooling support, and fewer runtime errors. This module serves as a foundation for the entire course, as TypeScript will be used throughout all subsequent modules to build robust React Native applications.

</details></blockquote>

---

## Learning Objectives

By the end of this module, you will be able to:

- Understand TypeScript's core concepts and benefits in React Native development
- Define and use TypeScript types, interfaces, and type aliases
- Implement TypeScript with React Native components and props
- Apply TypeScript to improve code quality and developer experience
- Troubleshoot common TypeScript errors in React Native applications
- Leverage TypeScript's advanced features for more robust code

<blockquote><details>

The learning objectives follow a progressive path from fundamentals to advanced applications, with each concept building on previous knowledge. They focus on practical skills directly applicable to real-world React Native development. Native mobile developers will recognize parallels between TypeScript's type system and those in Swift or Kotlin, while web developers will see how TypeScript enhances their existing JavaScript knowledge. As you work through the module, reference these objectives to track your progress and understand how each topic contributes to your ability to create robust, type-safe React Native applications.

</details></blockquote>

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

<blockquote><details>

Created by Anders Hejlsberg at Microsoft in 2012, TypeScript is a superset of JavaScript, meaning any valid JavaScript code is valid TypeScript code. This gentle learning curve allows developers to adopt TypeScript incrementally. The TypeScript compiler transforms TypeScript code into standard JavaScript that runs in any environment, including React Native.

TypeScript's key innovation is its optional static typing system, which allows developers to define explicit types for variables, function parameters, and return values. This catches type-related errors during development rather than at runtime—like having a pharmacist double-check prescriptions before they're filled, preventing errors before they reach patients.

The static typing system prevents common errors like calling methods on undefined values or passing incorrect argument types, making your code more robust.

</details></blockquote>

---

## Why TypeScript in React Native?

TypeScript offers significant advantages for React Native development:

- **Catch errors earlier** - Type checking during development instead of runtime
- **Better developer experience** - Improved autocomplete and IntelliSense
- **Self-documenting code** - Types serve as documentation
- **Safer refactoring** - Compiler catches breaking changes
- **Enhanced collaboration** - Clearer contracts between components and functions
- **Better tooling support** - Improved IDE integration

<blockquote><details>

TypeScript offers critical advantages for React Native development. Mobile applications are more difficult to update than websites once deployed, making error prevention especially valuable.

Error detection shifts from runtime to compile time, catching issues before users experience them. The improved developer experience through auto-completion and IntelliSense dramatically increases productivity when working with component props, state management, and navigation parameters.

Type definitions serve as built-in documentation, helping team members understand code quickly. When refactoring, TypeScript identifies all affected code, preventing unexpected breakages elsewhere in the application.

TypeScript establishes clear contracts between components and functions, reducing integration issues between different parts of an application. Its tooling support extends beyond editors to testing frameworks and build tools, creating a more robust development ecosystem.

</details></blockquote>

---

## TypeScript vs. JavaScript

Key differences between TypeScript and JavaScript:

- **Type System**: TypeScript adds static typing to JavaScript's dynamic typing
- **Error Detection**: TypeScript catches errors at compile-time vs. runtime
- **Developer Experience**: Enhanced autocomplete and IntelliSense
- **Learning Curve**: Requires understanding the type system
- **Code Safety**: Prevents common type-related bugs
- **Tooling**: Better refactoring and code navigation

<blockquote><details>

TypeScript fundamentally changes how developers write and maintain code by shifting error detection from runtime to compile time. This proves especially valuable in larger codebases and team environments, saving significant debugging time.

Native mobile developers will find TypeScript's type system familiar, providing the structure they're accustomed to in Swift or Kotlin. JavaScript developers can leverage their existing knowledge while gaining safety guardrails.

While mastering TypeScript's type system requires an investment, it pays dividends through improved code quality, better tooling, and enhanced collaboration. Teams can adopt TypeScript incrementally, gradually introducing typing to their codebase.

TypeScript prevents common errors like accessing properties on undefined objects or passing incorrect argument types to functions—practical benefits visible in everyday development work.

</details></blockquote>

---

## TypeScript vs. JavaScript: Code Example

```tsx
// JavaScript - No type safety
function calculateDosage(weight, concentration) {
  return weight * concentration / 100; // Potential runtime errors
}

// TypeScript - With type safety
function calculateDosage(weight: number, concentration: number): number {
  return weight * concentration / 100; // Errors caught during development
}
```

<blockquote><details>

This example demonstrates TypeScript's fundamental benefit: explicit type annotations. In the JavaScript version, the function parameters lack type information, creating several potential issues:

1. String arguments would cause string concatenation instead of numerical calculation (e.g., `calculateDosage("70", "5")` yields `"705"` not `3.5`)
2. `undefined` or `null` values lead to NaN results
3. There's no indication what the function returns
4. IDEs can't provide intelligent code completion

The TypeScript version explicitly specifies that both parameters and the return value are numbers, providing clear benefits:

1. The compiler flags errors if called with non-number arguments
2. Developers immediately understand what values the function expects and returns
3. IDEs provide better autocomplete suggestions and parameter hints
4. Refactoring tools can reliably identify all function usages

In a medication context, this type safety is crucial. A dosage calculation function receiving a string representation of weight instead of a number could lead to incorrect dosages and potentially harmful outcomes. TypeScript catches these errors during development, before they reach patients.

</details></blockquote>

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

<blockquote><details>

This comparison highlights key differences relevant to React Native developers:

**Type System**: JavaScript uses dynamic typing, allowing variables to change types at runtime with checking during execution. TypeScript adds static typing checked at compile time while preserving flexibility through the `any` type when needed. This hybrid approach offers both safety and flexibility.

**Errors**: JavaScript surfaces errors at runtime, potentially after deployment. TypeScript shifts error detection to compile time, particularly valuable in React Native where the development-test-deploy cycle is longer than web development.

**Tooling**: TypeScript enables more powerful IDE features like accurate autocomplete, inline documentation, and refactoring tools—essential when working with complex React Native components and APIs.

**Learning Curve**: JavaScript has a lower initial barrier but TypeScript can be adopted incrementally, starting with basic annotations before moving to advanced features.

**Adoption**: TypeScript has seen rapid adoption in the React Native ecosystem, with most libraries providing TypeScript definitions.

**Code Size**: TypeScript files are larger due to annotations, but compile to similar-sized JavaScript. This slight increase is a worthwhile trade-off for improved reliability.

Remember that TypeScript enhances JavaScript rather than replacing it—building upon existing knowledge with added safety and tooling benefits.

</details></blockquote>

---

## Setting Up TypeScript in React Native: Creating a New Project

```bash
# Create a new Expo project with TypeScript template
npx create-expo-app MedicationTracker --template expo-template-blank-typescript

# Navigate to the project
cd MedicationTracker
```

<blockquote><details>

Creating a TypeScript-enabled React Native project with Expo is straightforward thanks to built-in templates. The command shown uses the TypeScript template flag which is crucial—without it, you'd get a JavaScript project requiring manual conversion.

Behind the scenes, this command:
1. Creates a new project directory ("MedicationTracker")
2. Downloads and installs the TypeScript template with:
   - Pre-configured `tsconfig.json`
   - TypeScript dependency in `package.json`
   - Type definitions for React, React Native, and Expo
   - TypeScript sample files
   - TypeScript-aware ESLint configuration

After navigating into the project, it's immediately ready for TypeScript development. Expo handles all the complex configuration of TypeScript, Babel, and Metro bundler, making setup much simpler than in a bare React Native project.

All standard Expo commands work as usual—`npx expo start` will launch the development server. Developers can immediately write TypeScript code or start with JavaScript and gradually adopt TypeScript features as they become comfortable.

</details></blockquote>

---

## Setting Up TypeScript in React Native: Adding to Existing Projects

```bash
# Install TypeScript and type definitions
npx expo install typescript @types/react

# Generate tsconfig.json
npx typescript --init
```

<blockquote><details>

Adding TypeScript to an existing React Native project involves installing the necessary dependencies and configuring your project. The first command installs TypeScript and React type definitions, ensuring compatibility with your Expo version. The second command generates a baseline TypeScript configuration file.

After these initial steps, you'll need to:
1. Customize your tsconfig.json for React Native
2. Install React Native type definitions
3. Convert .js files to .tsx or .ts
4. Update imports as needed
5. Add type annotations incrementally

Remember that TypeScript adoption can be gradual—you don't need to convert everything at once. This incremental approach works well for larger projects where a complete rewrite would be impractical.

</details></blockquote>

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

<blockquote><details>

The `tsconfig.json` file functions as the control center for TypeScript in your project, configuring compiler behavior from type checking strictness to included files. Key settings include:

**`target`: "esnext"** - Compile to latest ECMAScript version, letting Metro/Babel handle compatibility
**`jsx`: "react-native"** - Preserve JSX for React Native bundler
**`strict`: true** - Enable comprehensive type checking (beginners may start with `false`)
**`moduleResolution`: "node"** - Use Node.js resolution strategy
**`noEmit`: true** - Prevent JS output since Metro handles bundling

Other important settings enhance compatibility (`esModuleInterop`, `allowSyntheticDefaultImports`), improve performance (`skipLibCheck`), and support various features (`resolveJsonModule`).

Teams can adjust settings based on project needs—starting with less strict settings and increasing strictness as members become more comfortable with TypeScript.

</details></blockquote>

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

<blockquote><details>

TypeScript's basic types provide the foundation for building type-safe applications. These types mirror JavaScript's runtime types while adding compile-time verification.

Primitive types (string, number, boolean) ensure operations are valid for their respective data types. Special types serve specific purposes: null and undefined represent empty values, any opts out of type checking (use sparingly), and never represents values that never occur.

Arrays can be typed using either Type[] or Array<Type> syntax, with both approaches being equivalent. Tuples, a TypeScript-specific feature, allow for fixed-length arrays with different types at specific positions.

When working with these types, consider using type inference where appropriate while adding explicit annotations where they improve code clarity and documentation.
</details></blockquote>

---

## Basic Types: Code Example

```tsx
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

<blockquote><details>

This example showcases TypeScript's fundamental types in a healthcare context. The primitive types (string, number, boolean) form the foundation of type safety. Attempting to assign incompatible values (like `patientAge = "forty-five"`) would trigger immediate compile-time errors, preventing bugs from type coercion.

Special types serve distinct purposes:
- `null` and `undefined` represent empty values
- `any` effectively disables type checking (use sparingly)
- `never` indicates values that never occur (useful for exhaustive checks)

Arrays can be typed using either `string[]` or `Array<number>` syntax, with the former being more common.

Tuples represent fixed-length arrays with specific types at each position—ideal for related data like medication-dosage pairs. They ensure both elements of the proper type are always present together, preventing mismatched data.

</details></blockquote>

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

<blockquote><details>

Type inference enables TypeScript to determine types automatically without explicit annotations, balancing type safety with coding efficiency. This sophisticated system works contextually, analyzing both initialization values and usage patterns.

TypeScript follows a basic principle: if it can confidently determine a type from context, explicit annotation becomes optional. This works well for:
- Local variables with clear initial values
- Function return types based on return statements
- Variables used in well-typed contexts

However, explicit annotations remain valuable for:
- Function parameters (ensuring correct inputs)
- Public API return types (creating clear contracts)
- Class properties (documenting intentions)
- Empty arrays/objects (where element types can't be inferred)
- Complex generic functions (guiding type resolution)

The balance is key—too few annotations can reduce code clarity and maintainability, while too many create unnecessary verbosity.

Advanced inference concepts include:
- **Type widening:** TypeScript generalizes literal values (e.g., `let x = 42` infers `number`, not literal `42`)
- **Const assertions:** Using `as const` preserves exact literal types
- **Context typing:** Parameter types inferred from usage context (e.g., in callbacks)

For React Native developers, inference significantly simplifies working with component props, state, and event handlers, reducing boilerplate while maintaining safety.

</details></blockquote>

---

## Type Inference: Code Example

```tsx
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

<blockquote><details>

This example demonstrates TypeScript's automatic type inference in a healthcare context. In variable declarations, TypeScript determines types from initialization values:

- Variables with primitive literals (`"John Smith"`, `45`, `false`) receive corresponding primitive types
- The array `medications` is inferred as `string[]` based on its elements
- These inferences create the same type safety as explicit annotations without the verbosity

For functions, TypeScript shows more sophisticated inference capabilities. While parameters require explicit types, the return type is automatically inferred by analyzing:
1. The result variable's type (a product of two numbers)
2. The function's return statement

Though TypeScript handles this simple case well, explicit return type annotations are recommended for:
- Public API functions (creating clear contracts)
- Complex functions (documenting intent)
- Functions where implementation might change (preventing accidental type changes)

Type inference is particularly valuable when working with complex types or generics where explicit annotation would be verbose or challenging to write correctly.

</details></blockquote>

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

<blockquote><details>

Interfaces and type aliases provide structured ways to define object shapes and create reusable type definitions. Though similar, they have important distinctions:

**Interfaces:**
- Define "contracts" that objects must implement
- Can be extended with `extends` keyword
- Can be implemented by classes
- Support declaration merging (can be augmented after initial declaration)
- Ideal for API responses, component props, and domain models
- Example use: `interface MedicationProps { ... }`

**Type Aliases:**
- Create new names for any type (not just objects)
- Can represent unions, primitives, and tuples
- Combine multiple types with intersection operator (`&`)
- Cannot be modified after declaration
- Preferred for complex types like unions and mapped types
- Example use: `type MedicationID = string | number`

**Key features for both:**
- Optional properties (`name?: string`) for flexible typing
- Readonly properties (`readonly id: string`) for immutability
- Index signatures (`[key: string]: any`) for dynamic property access
- Nested types for complex data structures

In React Native development, interfaces are commonly used for component props and API responses, while type aliases are used for unions and complex types. The choice between them depends on your specific needs—interfaces offer more flexibility for evolution through declaration merging, while type aliases provide more versatility for representing complex types.

</details></blockquote>

---

## Interfaces and Type Aliases: Code Example

```tsx
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

<blockquote><details>

This example showcases how interfaces and type aliases provide structure to a healthcare application:

The `Medication` interface defines a contract that medication objects must follow, with properties for identification, dosage information, and administration details. The optional `instructions` property (marked with `?`) allows flexibility where this information might not always be available.

When we create the `aspirin` object, TypeScript enforces this contract:
- All required properties must be present
- Each value must match its specified type
- TypeScript would raise compile-time errors for missing properties or incorrect types

The `Patient` type alias demonstrates:
1. An alternative syntax for defining object shapes
2. Type composition—incorporating the `Medication` interface within another type
3. Array typing with `Medication[]`

Creating the `patient` object showcases how these types work together, with TypeScript validating that all required properties exist with the correct types, including the nested array of medication objects.

This pattern provides multiple benefits:
- **Self-documenting code**: The types clearly communicate object structure
- **Compile-time validation**: Errors are caught during development
- **IDE support**: Autocomplete and inline documentation
- **Maintainability**: Changes to interfaces highlight all affected code

In React Native applications, these patterns are essential for typing component props, state, and API interactions.

</details></blockquote>

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

<blockquote><details>

Union and intersection types create flexible, precise type definitions inspired by set theory concepts:

**Union Types** (OR relationship, `|` operator):
- Allow a value to be one of several specified types
- Useful for functions accepting multiple input types and variables that might change types
- Example: `type MedicationID = string | number;` accepts either strings or numbers
- Common in React Native for props that accept alternative formats (like size as string or number)

**Intersection Types** (AND relationship, `&` operator):
- Combine multiple types into one composite type requiring all properties
- Create complex types from simpler ones by merging properties
- Example: `type AdminUser = User & AdminPermissions;` requires all properties from both types
- Used in React Native to combine prop interfaces or extend existing types

**Working with Union Types:**

*Type Narrowing* - Before using type-specific operations on union types, you must determine which specific type you're working with. TypeScript uses control flow analysis with conditional blocks:
```tsx
if (typeof id === 'string') {
  // TypeScript knows id is a string here
} else {
  // TypeScript knows id is a number here
}
```

*Discriminated Unions* - Union members with a common "tag" property that distinguishes between variants:
```tsx
type Medication =
  | { type: 'tablet'; count: number }
  | { type: 'liquid'; volume: number };
```
Perfect for modeling component states or API responses in React Native.

*Type Guards & Predicates* - Custom functions that narrow types, especially for complex checking:
```tsx
function isTablet(med: Medication): med is { type: 'tablet', count: number } {
  return med.type === 'tablet';
}
```

*Exhaustiveness Checking* - Technique to ensure all union variants are handled:
```tsx
function process(med: Medication) {
  switch(med.type) {
    case 'tablet': return handleTablet(med);
    case 'liquid': return handleLiquid(med);
    default:
      const exhaustiveCheck: never = med; // Error if cases missed
      return exhaustiveCheck;
  }
}
```

</details></blockquote>

---

## Union and Intersection Types: Code Example

```tsx
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

<blockquote><details>

This example demonstrates practical applications of union and intersection types in healthcare:

**Union Types** allow for flexibility when values can have different types:
- `MedicationIdentifier` accepts either string IDs ("med-001") or numeric IDs (12345)
- The function parameter allows both string and number arguments
- TypeScript ensures operations remain type-safe by only allowing operations valid for both types
- Without explicit type narrowing, only shared operations are allowed (string interpolation works, but `toUpperCase()` would require a type check)

The flexibility of union types is particularly valuable in healthcare systems where:
- Different systems may use different ID formats
- Functions need to handle multiple input types
- Components need to accept alternative prop formats

**Intersection Types** combine multiple type definitions into a single composite type:
- `MedicationBase` defines core medication properties
- `MedicationInstructions` defines administration details
- `CompleteMedication` requires ALL properties from BOTH interfaces
- The `tylenol` object must satisfy all requirements from both interfaces

This pattern is essential for:
- Building complex entities from modular type definitions
- Ensuring comprehensive data validation
- Combining multiple feature sets or capability interfaces
- Creating specialized extensions of base types

A common pattern with union types is **type narrowing**:

```tsx
function processMedication(id: MedicationIdentifier) {
  if (typeof id === 'string') {
    // TypeScript knows this is a string here
    return id.toUpperCase();
  } else {
    // TypeScript knows this is a number here
    return id.toFixed(0);
  }
}
```

</details></blockquote>

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

<blockquote><details>

Enums and literal types provide powerful ways to restrict values to specific sets of options, offering both type safety and semantic clarity to your code.

**Enums** create named constants representing fixed sets of related values:

```tsx
enum MedicationFrequency {
  Once = "once daily",
  Twice = "twice daily",
  AsNeeded = "as needed"
}
```

TypeScript supports several enum variations:
- **Numeric enums** (default): Auto-assigned incremental numbers (`enum Status { Active, Inactive }`)
- **String enums**: Explicit string values (shown in example above)
- **Const enums**: Inlined at compile time (`const enum Month { Jan, Feb }`)

String enums are generally recommended for React Native as they provide meaningful values in logs and debugging tools.

**Literal Types** specify exact allowed values:

```tsx
type ButtonSize = "small" | "medium" | "large";
type ResponseCode = 200 | 400 | 404 | 500;
type Toggle = true | false;
```

They're lightweight and perfect for:
- Component props with specific allowed values
- Function parameters with fixed options
- Return types with predetermined results

**Template Literal Types** (TS 4.1+) combine existing literals into new patterns:

```tsx
type Color = "red" | "green" | "blue";
type ButtonVariant = `${Color}Button`; // "redButton" | "greenButton" | "blueButton"
```

**Choosing Between Them:**
- Use **enums** for related constants used throughout the codebase (medication categories, status codes)
- Use **literal types** for function parameters, prop types, and local constraints
- Consider runtime implications: enums generate JavaScript code, while literal types are erased during compilation

</details></blockquote>

---

## Enums and Literal Types: Code Example

```tsx
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

<blockquote><details>

This example demonstrates two powerful ways to restrict values to predetermined sets in a healthcare context:

**String Enum: MedicationCategory**
The example defines a string enum with meaningful values for different medication categories. String enums are preferred over numeric enums (the default) because:
- Values are self-documenting when viewed in logs or debugging
- They create a namespace for related constants
- They provide type safety through compile-time checking
- They improve maintainability—changing values requires updates in only one place

When using the enum with the `aspirin` object, we access enum values through the namespace (`MedicationCategory.Analgesic`). This approach provides better type checking and IDE autocompletion than hardcoded strings.

**String Literal Types: DosageUnit**
The `DosageUnit` type demonstrates a lightweight approach to create a restricted set of string options without the namespace structure of enums:
- It defines exactly which string values are permitted ("mg", "ml", "mcg", "g")
- TypeScript enforces this restriction at compile time
- The `formatDosage` function only accepts valid units, preventing errors

The commented-out line shows how TypeScript would reject invalid values ("oz"), providing immediate feedback during development. This type safety is crucial in healthcare applications where incorrect units could have serious consequences.

Both approaches integrate seamlessly with IDE features like autocompletion, helping developers select from available options without referencing documentation.

</details></blockquote>

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


<blockquote><details>

TypeScript significantly improves React Native component development by creating a clear contract between components through typed props. This prevents common issues like passing incorrect prop types or forgetting required props that would otherwise cause runtime errors.

To implement typed props:
- Define an `interface` that specifies each prop and its type
- Mark optional props with a question mark (`?`)
- Use the interface with your component via `React.FC<YourPropsInterface>`

```tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;  // Optional prop
}

const Button: React.FC<ButtonProps> = ({ title, onPress, color = "blue" }) => {
  /* component implementation */
};
```

This pattern provides multiple benefits:
- **Documentation**: Self-documenting component API
- **Validation**: Compile-time checking prevents errors
- **IDE support**: Autocomplete and inline type information
- **Refactoring safety**: Changes to props highlight all affected usages

These benefits are particularly valuable for complex component libraries and design systems where component APIs need to be consistent and well-defined.

</details></blockquote>

---

## Typing Component Props: Code Example

```tsx
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

<blockquote><details>

This example demonstrates how to implement type-safe component props in a medication tracking app, establishing a contract between components that prevents runtime errors.

The implementation follows a clear pattern:

1. **Define a props interface** that specifies exactly what the component needs:
   - Each prop has an explicit type (`string`, `number`, `boolean`, or function)
   - The function type `() => void` ensures the callback takes no arguments and returns nothing
   - This interface creates a clear API contract for the component

2. **Apply the props interface** using React's generic function component type:
   ```tsx
   const MedicationItem: React.FC<MedicationItemProps> = ({ ... })
   ```

3. **Destructure props** for clean access while maintaining type safety

4. **Use props safely** in the component, leveraging TypeScript's knowledge:
   - Conditional styling with the boolean `isActive` prop
   - Type-safe event handling with the `onPress` function
   - String interpolation with the correctly typed `dosage` and `unit`

The usage example demonstrates TypeScript's compile-time validation—attempting to omit any required prop or providing incorrectly typed values would trigger immediate errors before runtime.

This pattern enables:
- Automatic documentation through type definitions
- Predictable component APIs with validation
- Improved refactoring safety—changes to prop requirements highlight all affected usages
- Better developer experience with IDE autocomplete and inline documentation

</details></blockquote>

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


<blockquote><details>

Optional props and default values provide flexibility in component design while maintaining type safety. They're essential for creating adaptable, reusable React Native components.

**Optional Props** are marked with the question mark (`?`) modifier:

```tsx
interface ButtonProps {
  title: string;    // Required
  onPress: () => void;  // Required
  color?: string;   // Optional
  size?: 'small' | 'medium' | 'large';  // Optional
}
```

**Default Values** provide fallbacks for optional props through destructuring:

```tsx
const Button = ({
  title,
  onPress,
  color = 'blue',  // Default value
  size = 'medium'  // Default value
}: ButtonProps) => {
  // Implementation...
};
```

This pattern enables several key benefits:
- **Progressive disclosure**: Components require minimal props but offer customization options
- **Sensible defaults**: Components work "out of the box" with reasonable behavior
- **Backward compatibility**: New props can be added without breaking existing code
- **Adaptation**: Components adjust their appearance based on provided props

Well-designed components typically have a small set of required props defining core functionality with additional optional props for customization, creating more flexible and reusable components.

</details></blockquote>

---

## Optional and Default Props: Code Example

```tsx
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

<blockquote><details>

This example demonstrates a practical implementation of optional props and default values in a medication dosage indicator component.

The interface defines a clear separation between required and optional props:
- Required props form the component's core functionality (dosage value, maximum, and unit)
- Optional props provide customization (showing percentage and indicator color)

The optional props use the question mark (`?`) modifier in the interface definition:
```tsx
showPercentage?: boolean; // Optional prop
color?: string;           // Optional prop
```

While default values are specified in the component's parameter destructuring:
```tsx
showPercentage = false, // Default value
color = '#007AFF'       // Default value
```

This pattern creates a component that works with minimal configuration but remains customizable:

```tsx
// Basic usage with only required props
<DosageIndicator value={500} maxValue={1000} unit="mg" />

// Enhanced usage with optional props specified
<DosageIndicator
  value={750}
  maxValue={1000}
  unit="mg"
  showPercentage={true}  // Override default
  color="#27AE60"        // Override default
/>
```

The implementation elegantly handles optional props with conditional rendering (`{showPercentage && ...}`) and dynamic styling, providing visual feedback based on both required and optional inputs.

This approach balances ease of use with flexibility—essential props remain required while customization options become optional with sensible defaults.

</details></blockquote>

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

<blockquote><details>

TypeScript adds crucial type safety to React Native state management, preventing common bugs like misspelled property names, incorrect types in updates, and incomplete state changes that would otherwise lead to runtime errors.

The primary pattern for typed state involves:

1. **Defining explicit state interfaces** that document the exact shape of your state:
```tsx
interface UserFormState {
  username: string;
  email: string;
  age: number;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
  errors: {
    username?: string;
    email?: string;
  };
}
```

2. **Providing type parameters to useState** to enforce the interface:
```tsx
const [form, setForm] = useState<UserFormState>({
  username: '',
  email: '',
  age: 0,
  preferences: { notifications: true, theme: 'light' },
  errors: {}
});
```

3. **Creating type-safe update functions** that maintain state integrity:
```tsx
// Type-safe field updater
function updateField<K extends keyof Omit<UserFormState, 'errors'>>(
  field: K,
  value: UserFormState[K]
) {
  setForm(prev => ({
    ...prev,
    [field]: value
  }));
}
```

This approach is particularly valuable for:
- Complex forms with multiple fields and validation rules
- State with nested objects or arrays
- Components with multiple state transitions
- Applications where data consistency is critical

The initial investment in defining state types pays dividends through improved code quality, better developer experience, and fewer runtime errors.

</details></blockquote>

---

## Typing Component State: Code Example

```tsx
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

<blockquote><details>

This example demonstrates a comprehensive approach to typed state management in a medication form component, showcasing several key TypeScript features:

**1. State Interface Definition**
The `MedicationFormState` interface precisely defines the component's state shape, including:
- Form fields with appropriate types
- An errors object with optional error messages
- String type for text inputs (even numeric ones) to match React Native's TextInput behavior

**2. Typed State Initialization**
```tsx
const [formState, setFormState] = useState<MedicationFormState>({
  name: '',
  dosage: '',
  frequency: 1,
  notes: '',
  errors: {}
});
```
This ensures the initial state and all updates conform to the defined structure.

**3. Type-Safe Update Function**
```tsx
const updateField = (field: keyof Omit<MedicationFormState, 'errors'>, value: string) => {
  setFormState(prevState => ({
    ...prevState,
    [field]: field === 'frequency' ? parseInt(value) || 1 : value,
    errors: { ...prevState.errors, [field]: undefined }
  }));
};
```
This function demonstrates advanced TypeScript features:
- `keyof Omit<>` ensures only valid field names can be updated
- Computed property access with type safety
- Field-specific type conversion logic

**4. Typed Validation**
The `validateForm` function uses `MedicationFormState['errors']` to ensure error messages match the defined structure, maintaining type safety throughout the validation process.

This pattern prevents common errors like:
- Misspelled property names
- Incorrect type assignments
- Invalid property access
- Inconsistent state updates

</details></blockquote>

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

<blockquote><details>

TypeScript significantly enhances React Native's event handling by providing precise types for each component's unique events. This is particularly valuable because React Native's event system differs substantially from web React and varies across components.

**Key React Native event types:**

- **GestureResponderEvent**: For touch interactions (TouchableOpacity, etc.)
  ```tsx
  onPress: (event: GestureResponderEvent) => void
  ```

- **NativeSyntheticEvent<T>**: Generic wrapper for platform events
  ```tsx
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  ```

- **Component-specific event types**: Tailored to each component's needs
  ```tsx
  // TextInput events receive text directly rather than through event.target
  onChangeText: (text: string) => void
  ```

These typed events prevent common errors like accessing:
- Web-specific properties that don't exist in React Native (`event.target`)
- Properties that exist on one event type but not others

**Best practices for typed event handlers:**

1. **Define precise handler signatures in prop interfaces**
   ```tsx
   interface ButtonProps {
     onPress: (event: GestureResponderEvent) => void;
     onLongPress?: (id: string) => void;  // Custom parameter pattern
   }
   ```

2. **Transform events safely** when adding context or changing parameter types
   ```tsx
   // Safe transformation from event to contextual data
   onPress={(event) => props.onItemSelect(item.id, event)}
   ```

3. **Use event type-specific properties** confidently
   ```tsx
   // TypeScript knows these properties exist on this specific event
   const { locationX, locationY } = event.nativeEvent;
   ```

TypeScript ensures that your event handlers receive the right event types with the right structures—preventing runtime errors from incorrect event access patterns.

</details></blockquote>

---

## Typing Event Handlers: Code Example

```tsx
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

<blockquote><details>

This example demonstrates three essential patterns for type-safe event handling in React Native:

**1. Component-Specific Event Types**
The example imports React Native's specialized event types:
- `GestureResponderEvent` for touch interactions
- `NativeSyntheticEvent<TextInputChangeEventData>` for text input changes

These types provide accurate type definitions for each component's unique event structure:
```tsx
// Access properties that TypeScript knows exist on this event
const handlePress = (event: GestureResponderEvent) => {
  console.log('Button pressed at:', event.nativeEvent.locationX, event.nativeEvent.locationY);
};
```

**2. Typed Event Handler Props**
The `MedicationButtonProps` interface defines a contract for event handlers:
```tsx
interface MedicationButtonProps {
  name: string;
  onPress: (event: GestureResponderEvent) => void;  // Native event
  onLongPress: (name: string) => void;              // Custom parameter
}
```

This forces consumers to provide compatible handlers and enables IDE autocompletion.

**3. Event Transformation Pattern**
The example demonstrates a common React Native pattern—transforming raw events into contextualized data:
```tsx
// Transform raw event to contextual parameter
<TouchableOpacity
  onPress={onPress}  // Pass through raw event
  onLongPress={() => onLongPress(name)}  // Transform to contextual data
>
```

TypeScript ensures this transformation maintains type safety throughout the component hierarchy, preventing:
- Mismatched event types between components
- Access to non-existent event properties
- Incorrect parameter passing in transformed events

</details></blockquote>

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

<blockquote><details>

TypeScript adds crucial type safety to React Native styling, preventing runtime errors that would otherwise occur when using invalid style properties. Unlike web CSS where invalid properties are silently ignored, React Native throws runtime errors for invalid styles—making compile-time checking especially valuable.

React Native provides component-specific style types that mirror its component hierarchy:

- **ViewStyle**: For View components (layout properties like flex, margin, padding)
- **TextStyle**: Extends ViewStyle, adding text-specific properties (fontWeight, textAlign)
- **ImageStyle**: Extends ViewStyle, adding image-specific properties (resizeMode)

These typed styles provide several benefits:

```tsx
// Type-safe styles with autocomplete
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // fontWeight: 'bold' // Error: not valid for ViewStyle
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold', // Valid for TextStyle
  }
});
```

TypeScript enables:
- Immediate error feedback for invalid style properties
- Component-appropriate style properties (preventing Text styles on View components)
- Intelligent IDE autocomplete for valid style properties
- Type-safety for dynamic and conditional styles

```tsx
// Type-safe conditional styling
<View style={[styles.base, isActive && styles.active]} />
```

The minor overhead of typing styles prevents errors that are otherwise difficult to debug at runtime.

</details></blockquote>

---

## Typing Styles: Code Example

```tsx
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

<blockquote><details>

This example showcases a comprehensive approach to typed styling in a medication card component, demonstrating how TypeScript ensures style safety throughout React Native applications.

The implementation centers around a typed style interface that maps each style object to its appropriate component type:

```tsx
interface MedicationCardStyles {
  container: ViewStyle;       // For View components
  header: ViewStyle;          // For View components
  title: TextStyle;           // For Text components (includes text properties)
  dosage: TextStyle;          // For Text components
  description: TextStyle;     // For Text components
  activeIndicator: ViewStyle; // For View components
  image?: ImageStyle;         // Optional, for Image components
}
```

This interface serves multiple purposes:
1. **Documentation** - Clearly shows which styles apply to which components
2. **Validation** - Ensures each style only contains properties valid for its target component
3. **Type checking** - Prevents using text properties on view components and vice versa

The `StyleSheet.create<MedicationCardStyles>({...})` generic syntax connects the interface to the style implementation, giving TypeScript the information needed to validate each style property.

The example also demonstrates **type-safe dynamic styling**:
```tsx
const containerStyle: ViewStyle = {
  ...styles.container,
  borderLeftColor: isActive ? '#4CD964' : '#FF3B30',
};
```

TypeScript validates that all dynamically added properties are valid for ViewStyle, preventing common issues like applying text-specific properties to non-text components or using invalid property values.

This typing pattern becomes increasingly valuable as applications grow, ensuring consistent styling and preventing difficult-to-debug rendering issues.

</details></blockquote>

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

<blockquote><details>

 Generics are one of TypeScript's most powerful features, enabling developers to create flexible, reusable code without sacrificing type safety. When teaching generics, it's important to emphasize that they allow you to write code that works with a variety of types while still maintaining strong type checking.

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

</details></blockquote>

---

## Generic Types: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates three common uses of generics in a React Native application: generic functions, generic interfaces, and generic components. Let's analyze each part in detail to understand how generics enable type-safe, reusable code.

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

</details></blockquote>

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

<blockquote><details>

 Type guards and type narrowing are essential concepts in TypeScript that enable you to work safely with union types and polymorphic data. When teaching these concepts, it's important to emphasize how they allow TypeScript to understand the specific type of a variable within a particular code block, enabling type-safe access to properties and methods that might not be available on all possible types.

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

</details></blockquote>

---

## Generic Types: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates three common uses of generics in a React Native application: generic functions, generic interfaces, and generic components. Let's analyze each part in detail to understand how generics enable type-safe, reusable code.

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

</details></blockquote>

---

## Type Guards and Type Narrowing: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates how to use type guards and type narrowing in TypeScript with a medication-related example. Let's analyze the key concepts in detail.

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

</details></blockquote>

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

<blockquote><details>

 Utility types are one of TypeScript's most powerful features, allowing developers to transform existing types into new ones without duplicating type definitions. When teaching utility types, it's important to emphasize how they promote code reuse and maintainability by providing standardized ways to modify types.

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

</details></blockquote>

---

## Utility Types: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates how to use TypeScript's built-in utility types to transform an existing type in various ways. Let's analyze each utility type in detail:

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

</details></blockquote>

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

<blockquote><details>

 Declaration merging is a powerful TypeScript feature that allows you to add properties to existing types across multiple declarations. When teaching this concept, it's important to emphasize how it enables extending and augmenting types in ways that would be difficult or impossible in other type systems.

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

```tsx
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

```tsx
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

</details></blockquote>

---

## Declaration Merging: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates two common uses of declaration merging in TypeScript: merging interface declarations and augmenting module types. Let's analyze each part in detail.

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

</details></blockquote>

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

<blockquote><details>

 Mapped types are one of TypeScript's most powerful and flexible type manipulation features. When teaching mapped types, it's important to emphasize how they enable systematic transformations of existing types, creating new types with modified characteristics while maintaining the structure of the original type.

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

```tsx
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

</details></blockquote>

---

## Mapped Types: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates how to use mapped types to create new types by transforming an existing type in various ways. Let's analyze each mapped type in detail:

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

</details></blockquote>

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
```tsx
// Re-export all types for easier imports
export * from './medication';
export * from './patient';
export * from './api';
export * from './navigation';
```

<blockquote><details>

 Organizing types effectively is crucial for maintaining large React Native projects. When teaching this concept, emphasize that there's no one-size-fits-all approach, but rather principles that teams should adapt to their specific needs. The barrel file pattern shown here is particularly valuable as projects grow, as it simplifies imports and creates a cleaner API for accessing types throughout the codebase. Encourage students to consider the tradeoff between centralized type definitions (easier to find and maintain consistency) versus co-located types (better for component encapsulation). For pharmacy/healthcare applications, demonstrate how organizing medication, patient, and prescription types in dedicated files creates a more intuitive codebase structure. Also highlight that TypeScript's module system makes it easy to split types across files while maintaining their relationships through imports and exports. This organization becomes especially important when working with complex domain models or when multiple developers collaborate on the same codebase.

</details></blockquote>

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

<blockquote><details>

 This example illustrates a well-organized TypeScript project structure for a React Native application. When teaching this concept, emphasize how this organization improves maintainability and collaboration. The central `/types` directory houses domain-specific type definitions that are shared across the application, while component-specific types remain co-located with their components. This balances centralization with encapsulation. The barrel file pattern (index.ts) simplifies imports by providing a single entry point for all shared types. For healthcare applications, point out how separating medication, patient, and API types creates a more intuitive mental model of the domain. Discuss how this structure scales as applications grow - larger projects might introduce subdirectories within the types folder for feature areas. Encourage students to adapt this pattern to their team's needs rather than following it rigidly. This organization becomes particularly valuable when multiple developers work on the same codebase, as it creates clear conventions for where types should be defined and imported from.

</details></blockquote>

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

<blockquote><details>

TypeScript significantly enhances API interactions in React Native by providing structure and type safety throughout the request-response lifecycle. This is critical since API data is inherently dynamic and potentially unpredictable.

A comprehensive approach to type-safe API calls involves:

**1. Define API response types with interfaces**
```tsx
// Define the expected structure of API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Define the shape of specific data models
interface MedicationDTO {
  id: string;
  medication_name: string;
  dosage_mg: number;
  instructions: string;
}
```

**2. Create application models**
```tsx
// Application models typically use camelCase and may reorganize data
interface Medication {
  id: string;
  name: string; // Renamed from medication_name
  dosage: number; // Renamed from dosage_mg
  instructions: string;
}
```

**3. Implement type-safe transformation functions**
```tsx
// Transform API data to application models with type safety
function mapApiMedication(dto: MedicationDTO): Medication {
  return {
    id: dto.id,
    name: dto.medication_name,
    dosage: dto.dosage_mg,
    instructions: dto.instructions
  };
}
```

**4. Create a typed API client**
```tsx
class MedicationApi {
  async getMedications(): Promise<Medication[]> {
    const response = await fetch('/api/medications');
    const data: ApiResponse<MedicationDTO[]> = await response.json();
    return data.data.map(mapApiMedication);
  }
}
```

This approach ensures:
- Accurate documentation of expected API formats
- Type-safe data transformations
- Early detection of breaking API changes
- Clear contracts between API and application code

Remember that TypeScript typing happens at compile time—consider adding runtime validation with libraries like Zod to ensure data actually matches your TypeScript types.

</details></blockquote>

---

## Type-Safe API Calls: Code Example

```tsx
// Define API response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface MedicationDTO {
  id: string;
  name: string;
  dosage_mg: number; // <blockquote><details>

 API uses snake_case
  frequency_per_day: number;
}

// Transform API data to application model
interface Medication {
  id: string;
  name: string;
  dosage: number; // <blockquote><details>

 Application uses camelCase
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

<blockquote><details>

This example demonstrates a complete type-safe API workflow in React Native, implementing the DTO (Data Transfer Object) pattern to safely bridge external API data with application models.

**Key patterns demonstrated:**

1. **Generic API response typing**
   ```tsx
   interface ApiResponse<T> {
     data: T;          // Generic data type that varies by endpoint
     status: number;   // HTTP status code
     message: string;  // Response message
   }
   ```
   This enables reuse across different endpoints while maintaining specific data types.

2. **API/Application model separation**
   - `MedicationDTO`: External API model with snake_case (`dosage_mg`, `frequency_per_day`)
   - `Medication`: Internal application model with camelCase (`dosage`, `frequency`)

   This separation handles the common mismatch between API conventions and application standards.

3. **Type-safe data transformation**
   ```tsx
   return json.data.map(item => ({
     id: item.id,
     name: item.name,
     dosage: item.dosage_mg,       // Renamed from snake_case
     frequency: item.frequency_per_day
   }));
   ```
   TypeScript ensures all required properties are correctly mapped from the DTO model.

4. **Typed component integration**
   ```tsx
   const [medications, setMedications] = useState<Medication[]>([]);
   ```
   The entire chain remains type-safe through to component state.

This pattern provides significant benefits:
- Clarifies the contract between frontend and backend
- Makes API changes immediately visible during refactoring
- Prevents property access errors from mismatched data types
- Ensures consistent data transformation throughout the app

For production applications, combine this pattern with runtime validation using libraries like Zod or io-ts, as TypeScript's compile-time checks cannot validate data received at runtime.

</details></blockquote>

---

## TypeScript with React Navigation

TypeScript enhances React Navigation with type-safe routes and params:

- **ParamList types**: Define the screens and their parameters
- **NavigationProp**: Type-safe navigation methods
- **RouteProp**: Type-safe access to route parameters
- **Nested navigators**: Type composition for complex navigation structures
- **useNavigation hook**: Typed with

<blockquote><details>

TypeScript integration with React Navigation creates a robust system for type-safe navigation in React Native apps. Without typing, navigation is especially error-prone due to string-based route names and untyped parameters.

The type system is built around three core concepts:

**1. ParamList Type Definition**
```tsx
type RootStackParamList = {
  Home: undefined;  // No parameters
  MedicationList: undefined;
  MedicationDetails: { medicationId: string; editable?: boolean };
  AddMedication: { patientId: string } | undefined;
};
```
This serves as the single source of truth for your navigation structure, defining both available screens and their required parameters.

**2. NavigationProp & RouteProp Types**
```tsx
// For navigation actions
type MedicationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MedicationDetails'
>;

// For accessing route parameters
type MedicationDetailsRouteProp = RouteProp<
  RootStackParamList,
  'MedicationDetails'
>;
```

These types enable:
- Compile-time validation of route names (preventing typos)
- Required parameter enforcement
- Type-safe parameter access
- Autocompletion for available screens and parameters

**3. Properly Typed Navigation Hooks**
```tsx
const navigation = useNavigation<MedicationDetailsNavigationProp>();
const route = useRoute<MedicationDetailsRouteProp>();

// TypeScript knows the structure of route.params
const { medicationId, editable } = route.params;
```

This system creates an end-to-end type-safe navigation experience that prevents common issues like:
- Navigating to non-existent screens
- Missing required parameters
- Accessing non-existent parameters
- Type errors in parameters

</details></blockquote>

---

## TypeScript with React Navigation: Code Example
    return json.data.map(item => ({
      id: item.id,
      name: item.name,
      dosage: item.dosage_mg,
      frequency: item.frequency_per_day
```tsx
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

<blockquote><details>

This example demonstrates three essential patterns for type-safe navigation in React Native:

**1. Type-Safe Route Definition**
The `RootStackParamList` type defines the entire navigation structure, ensuring:
- Only declared screens can be navigated to
- Required parameters are enforced
- Optional parameters are properly marked with `?`
- Different parameter structures for different routes

**2. Type-Safe Navigation Props**
By creating specific navigation and route prop types for each screen:
```tsx
type MedicationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MedicationDetails'
>;
```

The screen component receives fully typed props with:
- Autocomplete for available navigation methods
- Type checking for navigation parameters
- Type-safe access to route parameters

**3. Type-Safe Parameter Access**
```tsx
// TypeScript knows the exact structure of route.params
const { medicationId, editable = false } = route.params;
```

This enables safe destructuring with proper types and default values.

The example demonstrates how TypeScript prevents common navigation errors like:
- Typos in route names
- Missing required parameters
- Accessing non-existent parameters
- Passing incorrect parameter types

In healthcare applications, this precision is critical to ensure patients' information is correctly accessed and displayed.

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

</details></blockquote>

---

## TypeScript with React Navigation

TypeScript enhances React Navigation with type-safe routes and params:

- **ParamList types**: Define the screens and their parameters
- **NavigationProp**: Type-safe navigation methods
- **RouteProp**: Type-safe access to route parameters
- **Nested navigators**: Type composition for complex navigation structures
- **useNavigation hook**: Typed with

<blockquote><details>

 Navigation is a critical aspect of React Native applications, and TypeScript can significantly improve the safety and developer experience of navigation code. When teaching TypeScript with React Navigation, it's important to emphasize how type safety prevents common navigation errors and improves maintainability as applications grow.

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

</details></blockquote>

---

## TypeScript with React Navigation: Code Example

```tsx
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

<blockquote><details>

 This example demonstrates how to use TypeScript with React Navigation to create type-safe navigation in a medication tracking application. Let's analyze the key aspects of this code to understand how TypeScript enhances navigation.

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

</details></blockquote>

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

```tsx
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

<blockquote><details>

 Type assertions can be dangerous when used without proper validation. This slide demonstrates how to safely handle type assertions by implementing a type guard function. The type guard ensures that the data actually matches the expected structure before we assert its type. This is particularly important when dealing with external data sources like APIs, where we can't guarantee the shape of the data at compile time.

</details></blockquote>

---

### Overusing `any`

```tsx
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

<blockquote><details>

 The `any` type is often used as a quick fix to bypass TypeScript's type checking, but it completely defeats the purpose of using TypeScript. This slide shows how to properly handle unknown data types using type narrowing with the `unknown` type. The example demonstrates a safer approach that maintains type safety while still allowing for flexible data handling. This is especially important in healthcare applications where type safety is crucial.

</details></blockquote>

---

### Not Handling Null/Undefined

```tsx
// ❌ Risky: Not handling potential null/undefined
function getMedicationName(medication?: Medication): string {
  return medication.name; // Potential runtime error!
}

// ✅ Better: Handle null/undefined cases
function getMedicationName(medication?: Medication): string {
  return medication?.name ?? 'Unknown medication'; // Safe!
}
```

<blockquote><details>

 Null and undefined values are common sources of runtime errors in JavaScript applications. This slide demonstrates the importance of defensive programming when working with potentially null or undefined values. In TypeScript, the optional parameter syntax (?) indicates that a parameter might be undefined, but it doesn't automatically protect you from accessing properties on that undefined value. The example shows how to use the optional chaining operator (?.) and nullish coalescing operator (??) to safely handle these cases. Optional chaining allows you to safely access nested properties without checking each level for null/undefined, while nullish coalescing provides a default value when the expression evaluates to null or undefined. This pattern is particularly important in healthcare applications where missing data should be handled gracefully rather than causing crashes. When teaching this concept, emphasize that TypeScript can warn about potential null/undefined issues at compile time, but you still need to write code that handles these cases properly at runtime.

</details></blockquote>

---

### Forgetting to Type React.useState

```tsx
// ❌ Suboptimal: Implicit any[] type
const [medications, setMedications] = useState([]);

// ✅ Better: Explicit type annotation
const [medications, setMedications] = useState<Medication[]>([]);
```

<blockquote><details>

 This example highlights a common mistake when using React's useState hook with TypeScript. When the type parameter is omitted, TypeScript will infer the type based on the initial value. In this case, an empty array results in an implicit `any[]` type, which loses type safety. This can lead to runtime errors when you try to access properties of items in the array or when you add items of different types to the array. By explicitly providing the type parameter `<Medication[]>`, you ensure that TypeScript enforces that only Medication objects can be added to the array. This provides better autocomplete support, catches type errors during development, and serves as self-documentation. For healthcare applications where data consistency is critical, properly typing state is especially important. When teaching this concept, demonstrate how explicit typing prevents common errors like adding incompatible objects to the array or accessing non-existent properties. This pattern should be consistently applied to all useState calls in a React Native application.

</details></blockquote>

---

### Incorrect Event Handler Types

```tsx
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

<blockquote><details>

 This example highlights a critical difference between web React and React Native event handling. In web React, event handlers receive synthetic event objects with properties like 'target', but React Native components use different patterns. TextInput's onChangeText directly provides the text string rather than an event object. Using 'any' type masks this platform difference, leading to runtime errors. Always use platform-specific event types in React Native - TextInput events receive text strings, TouchableOpacity's onPress has no parameters, and gesture handlers have their own specific types. This pattern is especially important when converting web React code to React Native, as event handling is one of the most significant differences between platforms.

</details></blockquote>

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

</details></blockquote>

---

# Thank You!

Questions?

[Back to Course Home](../../index.html)
