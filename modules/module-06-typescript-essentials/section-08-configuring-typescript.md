## Section 8: Configuring TypeScript (`tsconfig.json` overview - as relevant to Expo)

The TypeScript compiler (`tsc`) is configured using a special JSON file named `tsconfig.json`. This file specifies the root files and the compiler options required to compile a TypeScript project. In the React Native and Expo ecosystem, while `tsc` performs type checking, the actual transformation of TypeScript code (stripping types, transpiling modern JavaScript features, and handling JSX) is typically done by Babel, which is invoked by the Metro bundler.

When you create a new React Native project with Expo using a TypeScript template (e.g., via `npx create-expo-app@latest --template blank-typescript`), a `tsconfig.json` file is automatically generated. This file usually extends a base configuration from Expo (`expo/tsconfig.base`) that provides sensible defaults. This section provides an overview of its purpose and some key options.

### Setting Up a New TypeScript Project with Expo

Creating a new Expo project with TypeScript is straightforward using the official templates. These templates come pre-configured with TypeScript, including a `tsconfig.json` file and necessary dependencies.

To create a new project named `YourProjectName` with the default blank TypeScript template, you would run:

```bash
# Create a new Expo project with the blank TypeScript template
npx create-expo-app@latest YourProjectName --template blank-typescript

# Navigate to the project directory
cd YourProjectName
```

Expo offers various templates, including those with navigation pre-configured with TypeScript. Using a template is the recommended way to start a new TypeScript-based Expo project as it handles the initial setup for you.

Behind the scenes, this command:

1. Creates a new project directory (e.g., `YourProjectName`).
2. Downloads and installs the chosen TypeScript template, which includes:
   - A pre-configured `tsconfig.json` (often extending `expo/tsconfig.base`).
   - TypeScript and relevant type definitions (e.g., `@types/react`) as dependencies in `package.json`.
   - Sample TypeScript files (e.g., `App.tsx`).
   - TypeScript-aware ESLint configuration (if included in the template).

After running the command and navigating into the project directory, you can immediately start developing with TypeScript using standard Expo commands like `npx expo start`.

### Adding TypeScript to an Existing Expo Project

If you have an existing JavaScript-based Expo project, you can convert it to TypeScript. Here are the general steps:

1.  **Install TypeScript and Type Definitions:**
    Add TypeScript and the necessary type definitions for React and React Native to your project. Expo recommends using `npx expo install` to ensure compatible versions:

    ```bash
    npx expo install typescript @types/react
    # For older Expo SDKs, you might also have needed @types/react-native explicitly
    # but this is often pulled in by @types/react or managed by Expo.
    ```

2.  **Create or Update `tsconfig.json`:**
    If you don\'t have a `tsconfig.json` file, you can generate a basic one by running:

    ```bash
    npx tsc --init
    ```

    This will create a `tsconfig.json` file with many options commented out. You\'ll then need to configure it for your React Native/Expo project. A good starting point is to extend `expo/tsconfig.base`:

    ```json
    {
      "extends": "expo/tsconfig.base",
      "compilerOptions": {
        "strict": true
        // Add any project-specific overrides here
      },
      "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
      // "exclude": ["node_modules"] // Usually handled by base or default behavior
    }
    ```

    Ensure your `tsconfig.json` is correctly set up, especially the `jsx` option (should be `"react-native"`) and `strict` mode (recommended `true`). The `expo/tsconfig.base` handles many of these defaults.

3.  **Rename JavaScript Files:**
    Convert your JavaScript files (`.js`, `.jsx`) to TypeScript files (`.ts`, `.tsx`).

    - Use `.tsx` for files containing JSX (React components).
    - Use `.ts` for plain TypeScript/JavaScript files without JSX.
      Start with your root component (e.g., rename `App.js` to `App.tsx`).

4.  **Add Type Annotations:**
    Gradually add type annotations to your codebase. Start with component props, state, and function signatures. TypeScript will likely show many errors initially, which you can fix incrementally.

5.  **Update Imports (if necessary):**
    Ensure your import statements correctly resolve after renaming files.

Adding TypeScript to an existing project can be done incrementally. You don\'t need to convert all files at once. TypeScript can coexist with JavaScript files in the same project if your `tsconfig.json` is configured to allow JS files (e.g., `"allowJs": true`, often a default in Expo templates).

### Conceptual Content: The Role of `tsconfig.json`

The `tsconfig.json` file serves several important purposes:

- **Identifies the Project Root:** Its presence in a directory indicates that the directory is the root of a TypeScript project.
- **Specifies Compiler Options:** It allows you to customize how TypeScript compiles your `.ts` and `.tsx` files into JavaScript. This includes settings for target JavaScript version, module system, JSX handling, strictness, and more.
- **Defines Included and Excluded Files:** You can specify which files should be included in the compilation process and which should be ignored.

When you run commands like `npx expo start`, Expo and its underlying tools (like Metro bundler) use the `tsconfig.json` to understand how to process your TypeScript files.

#### Common Structure of an Expo `tsconfig.json`

An auto-generated `tsconfig.json` in an Expo project often looks something like this (options may vary slightly based on the Expo SDK version and template):

A short, conceptual example of a typical `tsconfig.json` structure in an Expo project:

```json
{
  "extends": "expo/tsconfig.base", // Inherits base configuration from Expo
  "compilerOptions": {
    // Base options from expo/tsconfig.base are inherited
    // Add your project-specific overrides and additions here
    "strict": true, // Enables all strict type-checking options. Highly recommended.

    // Overrides from expo/tsconfig.base if needed, or new options:
    "jsx": "react-native", // Instructs TypeScript to preserve JSX for React Native (Metro bundler will handle it).
    "lib": ["DOM", "ESNext"], // Specifies standard library files to include. "DOM" is for Expo Web and some shared libraries.
    "target": "ESNext", // Target modern JavaScript version, suitable for Hermes engine.
    "module": "ESNext", // Use modern ES module syntax.
    "moduleResolution": "node", // Standard module resolution strategy for Node.js/React Native.

    "esModuleInterop": true, // Improves compatibility between CommonJS and ES modules.
    "allowSyntheticDefaultImports": true, // Allows default imports from modules without a default export (works with esModuleInterop).
    "skipLibCheck": true, // Skips type checking of declaration files in node_modules, speeding up compilation.
    "resolveJsonModule": true, // Allows importing .json files as modules.
    "noEmit": true, // Prevents TypeScript from outputting JavaScript files directly, as Metro/Babel handles this.
    "forceConsistentCasingInFileNames": true, // Ensures file name casing is consistent, important for cross-platform compatibility.

    "baseUrl": ".", // Base directory for resolving non-absolute module names.
    "paths": {
      // Optional: Define path aliases for cleaner imports (example)
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@utils/*": ["src/utils/*"]
      // Adjust paths based on your project structure, e.g., remove "src/" if components are at root.
    }
  },
  "include": [
    // Specifies files TypeScript should include in compilation
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts", // Expo-generated type definitions
    "expo-env.d.ts" // Environment variable type definitions for Expo
  ],
  "exclude": [
    // Specifies files/directories to exclude from compilation
    "node_modules" // Usually excluded to speed up compilation and avoid type conflicts.
    // Babel.config.js, metro.config.js etc can also be excluded if not needed for TS awareness.
  ]
}
```

This JSON configuration tells the TypeScript compiler how to process the project.

- The `extends`: `"expo/tsconfig.base"` line is crucial as it pulls in many default configurations optimized by the Expo team for React Native projects. These base settings handle much of the React Native-specific setup.
- `compilerOptions` allows you to customize the TypeScript compiler\'s behavior:
  - `strict: true` enables a suite of strict type-checking rules, which is highly recommended for catching more errors early. Beginners might sometimes start with `false` but aiming for `true` is a best practice.
  - `jsx: "react-native"` tells TypeScript to preserve JSX syntax, as the Metro bundler (with Babel) will handle its transformation.
  - `target` and `module` are often set to `"ESNext"` to use modern JavaScript features, which are then transpiled by Babel as needed.
  - `lib` includes type definitions for standard JavaScript features and, often, `"DOM"` for web compatibility (relevant for Expo Web).
  - `esModuleInterop` and `allowSyntheticDefaultImports` enhance compatibility with different module formats.
  - `skipLibCheck: true` can speed up compilation by not type-checking all `.d.ts` files in `node_modules`.
  - `noEmit: true` is important because TypeScript itself doesn\'t output the final JS files in an Expo/React Native setup; Metro/Babel does this. TypeScript\'s role is primarily type checking.
  - `baseUrl` and `paths` allow for custom import aliases (e.g., `@components/MyComponent` instead of `../../components/MyComponent`), which can make imports cleaner in larger projects.
- `include` specifies an array of glob patterns that determine which files TypeScript will process.
- `exclude` specifies glob patterns for files or directories that TypeScript should ignore, commonly `node_modules`.

#### Understanding `expo/tsconfig.base`

Expo projects typically `extend` a base configuration from `expo/tsconfig.base`. This file provides a solid, opinionated starting point for Expo projects. Key settings often found in `expo/tsconfig.base` (for recent SDKs like 52+) include:

- `"target": "es2020"` or `"ESNext"`: Targets modern JavaScript, suitable for engines like Hermes.
- `"module": "commonjs"` (though Metro often processes ESM, `commonjs` can be for broader tooling compatibility) or `"ESNext"`.
- `"lib": ["es2020", "dom", "dom.iterable", "esnext.asynciterable"]`: Includes type definitions for built-in JS APIs. `"dom"` is included primarily for Expo for Web support and compatibility with libraries that might expect DOM types.
- `"jsx": "react-native"`: Preserves JSX for Metro/Babel to transform.
- `"strict": true`: Enables all strict type-checking options (see below).
- `"esModuleInterop": true`: Improves compatibility with CommonJS modules.
- `"skipLibCheck": true`: Speeds up compilation by not checking types in `node_modules` declaration files.
- `"allowSyntheticDefaultImports": true`: Often enabled by `esModuleInterop`.
- `"resolveJsonModule": true`: Allows direct importing of JSON files.

Developers can override or extend these base configurations by specifying options directly in their project's `tsconfig.json` file to tailor the TypeScript setup to specific project needs.

#### Key `compilerOptions` Relevant to Expo/React Native

- **`extends`**: Usually `"expo/tsconfig.base"`. Imports Expo\'s base configuration.
- **`strict`**: (boolean, default `false`) When `true`, enables a suite of strict type checking options like:
  - `noImplicitAny`: Flags variables/parameters that implicitly have an `any` type.
  - `strictNullChecks`: Makes `null` and `undefined` distinct types, requiring explicit handling.
  - `strictFunctionTypes`: Enables stricter checking of function parameter bivariance.
  - `strictBindCallApply`: Ensures safer usage of `bind`, `call`, and `apply` on functions.
  - `strictPropertyInitialization`: Ensures class properties are initialized in the constructor or by a property initializer.
  - `noImplicitThis`: Raises an error on `this` expressions with an implied `any` type.
  - `alwaysStrict`: Parses in strict mode and emits `"use strict"` for each source file.
  - `useUnknownInCatchVariables`: Types `catch` clause variables as `unknown` instead of `any` by default (TS 4.4+).
    **Highly recommended to keep `strict: true` for robust code.**
- **`jsx`**: (string) For React Native, this is typically `"react-native"` (preserves JSX for Metro).
- **`target`**: (string, e.g., `"ESNext"`) Specifies ECMAScript target for output JavaScript. `ESNext` or a recent year (e.g., `"es2020"`) is common for React Native.
- **`module`**: (string, e.g., `"ESNext"`, `"commonjs"`) Specifies module code generation. `ESNext` allows use of modern module features, processed by Metro.
- **`lib`**: (array of strings, e.g., `["DOM", "ESNext"]`) Specifies library files for type checking. `DOM` is often for Expo Web.
- **`moduleResolution`**: (string, e.g., `"node"`) How modules are found. `"node"` is standard.
- **`esModuleInterop`**: (boolean) Enables compatibility with CommonJS modules. Recommended: `true`.
- **`allowSyntheticDefaultImports`**: (boolean) Allows default imports from modules with no default export. Often works with `esModuleInterop`.
- **`skipLibCheck`**: (boolean) If `true`, skips type checking of declaration files (`.d.ts`) from dependencies, speeding up compilation.
- **`resolveJsonModule`**: (boolean) If `true`, allows importing `.json` files directly as modules.
- **`baseUrl` and `paths`**: Configure custom module path aliases (e.g., `"@components/*": ["src/components/*"]`) for cleaner imports.

#### TypeScript Compilation and Build Process in React Native/Expo

It\'s helpful to understand the general flow:

1.  **Type Checking (`tsc`):** The TypeScript compiler (`tsc`) reads your `tsconfig.json`, parses your `.ts`/`.tsx` files into an Abstract Syntax Tree (AST), and performs type checking based on your annotations and type inference. This is where type errors are caught.
2.  **Transformation/Transpilation (Babel via Metro):** In React Native/Expo, `tsc` is usually _not_ directly emitting the final JavaScript that runs in your app. Instead, the Metro bundler uses Babel (with plugins like `@babel/preset-typescript`) to:
    - Strip away TypeScript type annotations.
    - Transform JSX into JavaScript function calls (`React.createElement`).
    - Transpile modern JavaScript features (if any) to a version compatible with the target JavaScript engine (e.g., Hermes).
3.  **Bundling (Metro):** Metro then bundles all JavaScript modules into one or more files for the application.

**Type Erasure:** A key concept is that TypeScript type information is primarily for compile-time checking. It is **erased** during the transformation to JavaScript and does not exist in the final JavaScript output. This means TypeScript types do not add any runtime overhead.

**Caveats with Babel Transformation:** While Babel handles most TypeScript features well, some very advanced or niche TypeScript features that rely on `tsc` for specific JavaScript output (like `const enum` inlining, or certain behaviors of `namespaces` if not configured carefully with Babel plugins) might behave slightly differently or require specific Babel configurations. For most common TypeScript usage in React Native, this is not an issue.

> 🛣️ **(All Learners):** You generally won\'t need to modify `tsconfig.json` frequently, especially when starting with an Expo template. However, understanding its role and common options is beneficial if you need to troubleshoot build issues, integrate specific libraries, or customize your project\'s compilation behavior (like adding path aliases).

> ⚠️ **(Caution):** Incorrectly modifying `tsconfig.json` can lead to build errors or unexpected behavior. Always ensure your changes are compatible with your Expo SDK version and React Native setup. Refer to the official TypeScript and Expo documentation when making significant changes.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
> - [TypeScript Handbook: Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
> - [Expo Docs: Using TypeScript (mentions `tsconfig.json`)](https://docs.expo.dev/guides/typescript/)

While a deep dive into every compiler option is beyond this module's scope, knowing that `tsconfig.json` is the central configuration file for TypeScript empowers you to understand how your project is compiled and how to make adjustments if needed.

### Challenge 6: Typing a Pharmacy API Response

Now it's time for a challenge to apply what you've learned about TypeScript types, interfaces, and potentially utility types to model a real-world data structure.

**Objective:** Define TypeScript interfaces and types to accurately represent a complex API response for medication details from the SpeedyMeds system. Then, create a mock API function that returns data conforming to these types.

**Scenario:** SpeedyMeds has an API endpoint `/api/medications/:id` that returns detailed information about a specific medication.

The API response structure is as follows:

```json
{
  "medicationId": "MED456",
  "genericName": "Atorvastatin Calcium",
  "brandNames": ["Lipitor", "Atorva"],
  "strength": "20mg",
  "dosageForm": "Tablet", // Could be 'Tablet', 'Capsule', 'Syrup', 'Injection'
  "routeOfAdministration": "Oral",
  "pharmacologicalClass": "Statins",
  "indications": [
    "Hypercholesterolemia",
    "Prevention of cardiovascular disease"
  ],
  "contraindications": ["Active liver disease", "Pregnancy"],
  "sideEffects": {
    "common": ["Diarrhea", "Arthralgia", "Nasopharyngitis"],
    "rare": ["Myopathy", "Rhabdomyolysis", "Liver enzyme abnormalities"]
  },
  "storageInstructions": "Store at controlled room temperature 15-30°C (59-86°F). Protect from light and moisture.",
  "interactions": [
    {
      "drugName": "Cyclosporine",
      "severity": "Major",
      "description": "Increased risk of myopathy or rhabdomyolysis."
    },
    {
      "drugName": "Grapefruit juice",
      "severity": "Moderate",
      "description": "May increase atorvastatin plasma concentrations."
    }
  ],
  "isInStock": true,
  "stockLevel": {
    "current": 1500,
    "lowStockThreshold": 200
  },
  "lastStockUpdate": "2023-10-27T10:30:00Z" // ISO 8601 Date String
}
```

**Instructions:**

1.  **Define Enums (Optional but Recommended):**
    - Create a string enum `DosageFormType` for `dosageForm` (e.g., `Tablet`, `Capsule`, `Syrup`, `Injection`).
    - Create a string enum `InteractionSeverity` for `interactions[].severity` (e.g., `Major`, `Moderate`, `Minor`).
2.  **Define Interfaces:**
    - Create an interface `DrugInteraction` for the objects within the `interactions` array.
    - Create an interface `StockDetails` for the `stockLevel` object.
    - Create the main interface `MedicationApiResponse` that accurately types the entire API response structure shown above. Use your enums and other interfaces where appropriate.
    - Pay attention to optional properties if any might not always be present (though for this challenge, assume all shown fields are present unless logically optional, like if `stockLevel` was only present if `isInStock` is true - for this exercise, assume `stockLevel` is always present).
3.  **Create a Mock API Function:**
    - Write a function `fetchMedicationDetails(medicationId: string): Promise<MedicationApiResponse>`.
    - This function should simulate an API call. Inside, create a mock `MedicationApiResponse` object that matches the structure and your defined types. You can hardcode the data based on the example JSON.
    - The function should return a `Promise` that resolves with your mock data.
4.  **Test Your Types:**
    - Call `fetchMedicationDetails` with a sample ID.
    - Use `.then()` to access the resolved data and log some of its properties to the console to verify its structure and type correctness (e.g., `console.log(details.brandNames[0])`, `console.log(details.sideEffects.common)`).

**Tool:** CodeSandbox

**(https://codesandbox.io)** (_Note: You will need to create a new TypeScript sandbox or use a provided template._)

This challenge will test your ability to translate a JSON structure into robust TypeScript types, a critical skill for working with APIs in any TypeScript application.
