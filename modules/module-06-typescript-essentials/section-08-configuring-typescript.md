## Section 8: Configuring TypeScript (`tsconfig.json`)

The `tsconfig.json` file is the heart of a TypeScript project. It specifies the root files and the compiler options required to compile (or transpile) the project. Understanding its basic structure and common options is crucial for managing your TypeScript setup, especially within an Expo and React Native context.

### Conceptual Content: The TypeScript Configuration File

When you create a new Expo project with TypeScript support (which is the default for `create-expo-app`), a `tsconfig.json` file is automatically generated for you. This file tells the TypeScript compiler (`tsc`) how to treat your `.ts` and `.tsx` files.

**1. Purpose of `tsconfig.json`**

- **Root Files:** Defines which files are part of your project.
- **Compiler Options:** Specifies how the TypeScript code should be checked, transformed, and what kind of JavaScript output should be generated.
- **Project Integration:** Helps integrate TypeScript with build tools, linters, and IDEs, ensuring consistent behavior across your development environment.

**2. Structure of `tsconfig.json`**

A typical `tsconfig.json` file is a JSON object with several top-level properties, the most important being `compilerOptions` and often `extends`, `include`, and `exclude`.

- **`compilerOptions`**: This object contains the bulk of the configuration, telling the compiler how to process your files.
- **`extends`**: Allows you to inherit configurations from another `tsconfig.json` file. Expo projects often use this to extend a base configuration (e.g., `expo/tsconfig.base`).
- **`include`**: An array of glob patterns specifying which files to include in the compilation. If not specified, it defaults to all TypeScript files (`.ts`, `.tsx`, `.d.ts`) in the containing directory and subdirectories.
- **`exclude`**: An array of glob patterns specifying files or directories to exclude from compilation (e.g., `node_modules`, build output folders).

**3. Common `compilerOptions` Relevant to Expo/React Native**

While an Expo project comes with a sensible default `tsconfig.json`, understanding some key options is beneficial:

- **`target`**: Specifies the ECMAScript target version for the generated JavaScript output (e.g., `"esnext"`, `"es2020"`). Expo typically uses a modern target like `"esnext"` as downstream tools like Babel will handle further transpilation for compatibility.

  - Example: `"target": "esnext"`

- **`module`**: Specifies the module system for the generated code (e.g., `"commonjs"`, `"esnext"`). For React Native, `"esnext"` is common to leverage modern module features, with Babel handling the final module format for the bundler (Metro).

  - Example: `"module": "esnext"`

- **`lib`**: A list of library files to be included in the compilation. These define built-in APIs (e.g., DOM APIs if you were in a browser environment, or ESNext features).

  - Example: `"lib": ["esnext", "dom"]` (DOM might be included for web compatibility or certain libraries).

- **`jsx`**: Controls how JSX is processed. For React Native, `"react-native"` or `"react-jsx"` are common values.

  - `"react-native"`: Preserves JSX to be transformed by Babel/Metro.
  - `"react-jsx"`: Enables the new JSX transform (React 17+) which doesn't require `import React from 'react';` in every file using JSX.
  - Expo default: `"jsx": "react-native"` in `expo/tsconfig.base` is typical, but can be overridden.

- **`moduleResolution`**: Specifies how modules are resolved. `"node"` is the standard for Node.js/npm-based projects like React Native.

  - Example: `"moduleResolution": "node"`

- **`allowJs`**: If `true`, allows JavaScript files to be compiled alongside TypeScript files. Useful for gradual migration.

  - Example: `"allowJs": true`

- **`skipLibCheck`**: If `true`, skips type checking of all declaration files (`.d.ts`). This can speed up compilation times, especially in projects with many dependencies, but might hide potential type inconsistencies in library definitions.

  - Expo default: `"skipLibCheck": true` is common.

- **`resolveJsonModule`**: If `true`, allows importing `.json` files as modules.

  - Example: `"resolveJsonModule": true`

- **`esModuleInterop`**: Enables interoperability between CommonJS modules and ES modules. It allows default imports from modules that don't have a default export (e.g., `import React from 'react';` even if React uses `module.exports`). Highly recommended and often set to `true`.

  - Expo default: `"esModuleInterop": true`

- **`allowSyntheticDefaultImports`**: Allows default imports from modules with no default export. This option does not affect code emit, only type checking. `esModuleInterop` implies this option and is generally preferred.

- **`strict`**: A very important option. When `true`, it enables a wide range of strict type checking options, including:

  - `noImplicitAny`: Raises an error on expressions and declarations with an implied `any` type.
  - `strictNullChecks`: Makes `null` and `undefined` distinct types, preventing accidental assignment to other types (highly recommended).
  - `strictFunctionTypes`: Enables stricter checking of function type compatibility.
  - `strictBindCallApply`: Enables stricter checking of `bind`, `call`, and `apply` methods on functions.
  - `strictPropertyInitialization`: Ensures class properties are initialized in the constructor or by a property initializer.
  - `noImplicitThis`: Raises an error when `this` expressions have an `any` type.
  - `alwaysStrict`: Parses in strict mode and emits "use strict" for each source file.
  - It's highly recommended to set `"strict": true` for new projects to catch more errors and write more robust code.
  - Expo default: `"strict": true`

- **`baseUrl` and `paths`**: Used for configuring custom module path aliases, allowing for cleaner import statements (e.g., `import MyComponent from "@components/MyComponent"` instead of `import MyComponent from "../../../../components/MyComponent"`). Requires additional setup with Babel for React Native (e.g., using `babel-plugin-module-resolver`).
  - Example:
    ```json
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"]
    }
    ```

**4. Expo's `tsconfig.json`**

When you initialize an Expo project, it comes with a `tsconfig.json` file that typically looks like this:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
    // You might add other options here like custom paths for your src directory
    // e.g., "@components/*": ["src/components/*"]
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

- **`"extends": "expo/tsconfig.base"`**: This is key. Expo provides a base configuration (`node_modules/expo/tsconfig.base.json`) that includes many sensible defaults for React Native development (like `jsx: "react-native"`, `lib`, `moduleResolution`, `esModuleInterop`, `skipLibCheck`, etc.). Your project's `tsconfig.json` then extends and can override these defaults.
- **`"strict": true`**: Enforces strict type-checking rules, which is good practice.
- **`"paths"`**: The default path alias `@/*` allows you to import files relative to your project root using `@/filename`.
- **`"include"`**: Specifies which files TypeScript should be aware of, including your `.ts`/`.tsx` files and type definitions generated by Expo.

It's generally recommended to stick with the Expo base configuration and only override specific options if you have a clear reason and understand the implications. The `Using TypeScript` guide in the Expo documentation is an excellent resource for more details.

> [!TIP]
> You usually don't need to run the TypeScript compiler `tsc` directly in an Expo project. The Expo CLI and Metro bundler handle the TypeScript transpilation as part of the development and build process. The `tsconfig.json` is used by these tools and your IDE for type checking and language services.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
> - [Expo Documentation: Using TypeScript](https://docs.expo.dev/guides/typescript/)
> - [React Native Documentation: Using TypeScript](https://reactnative.dev/docs/typescript)

Understanding the `tsconfig.json` file empowers you to customize TypeScript's behavior to suit your project's needs, although for most Expo projects, the defaults provided are excellent starting points.

### Challenge 6: Typing a Pharmacy API Response

This challenge will test your ability to apply various TypeScript concepts learned in this module, including interfaces, basic types, and potentially arrays or nested objects, to accurately type a complex data structure.

**Objective:**
Define TypeScript interfaces and types to accurately represent a complex JSON response from a mock SpeedyMeds pharmacy API. This API response contains information about a specific medication, including its details, patient prescription data, and pharmacy stock levels.

**Scenario:**
The SpeedyMeds system needs to fetch comprehensive details for a medication. The (mock) API endpoint `/api/medication/:medicationId/details` returns a JSON object with the following structure:

```json
// Example Mock API Response for /api/medication/MED001/details
{
  "medicationInfo": {
    "id": "MED001",
    "name": "Amoxicillin",
    "genericName": "Amoxicillin Trihydrate",
    "manufacturer": "SpeedyPharm Inc.",
    "dosageForm": "Capsule", // Could be "Tablet", "Syrup", "Injection"
    "strength": "250mg",
    "requiresPrescription": true,
    "storageInstructions": "Store at room temperature away from moisture and heat.",
    "interactions": [
      { "drugName": "Warfarin", "severity": "Major" },
      { "drugName": "Methotrexate", "severity": "Moderate" }
    ]
  },
  "patientPrescriptions": [
    {
      "prescriptionId": "RX78910",
      "patientId": "PAT123",
      "patientName": "John Doe",
      "dosagePrescribed": "1 capsule every 8 hours",
      "quantity": 30,
      "refillsRemaining": 2,
      "datePrescribed": "2023-10-15T00:00:00.000Z",
      "prescribingDoctor": {
        "id": "DOC005",
        "name": "Dr. Emily Carter",
        "specialty": "General Practice"
      }
    },
    {
      "prescriptionId": "RX11121",
      "patientId": "PAT456",
      "patientName": "Jane Smith",
      "dosagePrescribed": "1 capsule every 12 hours",
      "quantity": 20,
      "refillsRemaining": 0,
      "datePrescribed": "2023-11-01T00:00:00.000Z",
      "prescribingDoctor": {
        "id": "DOC007",
        "name": "Dr. Alan Grant",
        "specialty": "Pediatrics"
      }
    }
  ],
  "pharmacyStock": [
    {
      "pharmacyId": "PHARM001",
      "pharmacyName": "SpeedyMeds Downtown",
      "stockLevel": 157,
      "lastRestocked": "2023-12-01T00:00:00.000Z"
    },
    {
      "pharmacyId": "PHARM002",
      "pharmacyName": "SpeedyMeds Uptown",
      "stockLevel": 88,
      "lastRestocked": "2023-11-28T00:00:00.000Z"
    }
  ],
  "lastUpdatedAt": "2023-12-10T10:30:00.000Z"
}
```

**Instructions:**

1.  Carefully analyze the JSON structure provided above.
2.  Define a main interface, perhaps `MedicationFullDetailsResponse`, to represent the entire API response.
3.  Create separate interfaces or type aliases for nested objects and arrays within the response. For example:
    - `MedicationInfo`
    - `DrugInteraction`
    - `PatientPrescription`
    - `PrescribingDoctor`
    - `PharmacyStockInfo`
4.  Use appropriate basic types (`string`, `number`, `boolean`, `Date` for date strings - you can assume date strings will be converted to `Date` objects upon processing).
5.  Consider using enums for fields like `dosageForm` or `severity` if you think it makes sense (optional, but good practice for a fixed set of string values).
6.  Ensure your types correctly represent optional fields if any are implied (though for this challenge, assume all fields shown in the example are present unless explicitly stated otherwise or are clearly optional by context, like `interactions` potentially being an empty array).
7.  Create a sample variable of type `MedicationFullDetailsResponse` and assign it a mock data object that conforms to your defined types. This will help TypeScript validate your definitions.

**Access the Challenge:**

**(https://codesandbox.io/s/speedymeds-ts-challenge-placeholder)** (Note: This is a placeholder link. A live CodeSandbox link with a basic setup and the JSON data will be provided.)

This challenge does not require writing functions to process the data, only to accurately define the types for it. Good luck!

---

Course Creation Guidelines Complete
