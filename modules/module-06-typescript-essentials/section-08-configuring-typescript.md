## Section 8: Configuring TypeScript (`tsconfig.json` overview - as relevant to Expo)

The TypeScript compiler (`tsc`) is configured using a special JSON file named `tsconfig.json`. This file specifies the root files and the compiler options required to compile a TypeScript project. When you create a new React Native project with Expo using a TypeScript template (e.g., via `npx create-expo-app@latest --template blank-typescript`), a `tsconfig.json` file is automatically generated with sensible defaults for React Native development. This section provides an overview of its purpose and some key options you might encounter or want to adjust.

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
    "strict": true, // Enables all strict type-checking options
    "jsx": "react-native", // How JSX is processed
    "lib": ["DOM", "ESNext"], // Standard library files to include
    "moduleResolution": "node", // How modules are resolved
    "skipLibCheck": true, // Skips type checking of declaration files
    "esModuleInterop": true, // Enables compatibility with CommonJS modules
    "allowSyntheticDefaultImports": true, // Allows default imports from modules with no default export
    "target": "ESNext", // Specifies ECMAScript target version
    "module": "ESNext", // Specifies module code generation
    "baseUrl": ".", // Base directory to resolve non-absolute module names
    "paths": {
      // Optional: Define path aliases for cleaner imports
      "@components/*": ["components/*"],
      "@screens/*": ["screens/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
  // "exclude": ["node_modules"] // Usually implicit or handled by base config
}
```

This JSON configuration tells the TypeScript compiler how to process the project. The `extends` field pulls in a base configuration from Expo, which sets up many React Native-specific defaults. The `compilerOptions` then override or add to these defaults. `strict: true` is highly recommended for catching more errors. `jsx: "react-native"` preserves JSX for the React Native bundler. `paths` allows for defining import aliases (e.g., `@components/MyComponent` instead of `../../components/MyComponent`). The `include` array specifies which files TypeScript should be aware of for compilation.

#### Key `compilerOptions` Relevant to Expo/React Native

- **`extends`**: Often set to `"expo/tsconfig.base"`. This imports a base configuration provided by Expo that includes many sensible defaults for React Native development, such as JSX settings and module resolution strategies tailored for Metro.
- **`strict`**: (boolean, default `false`) When `true`, enables a wide range of strict type checking options (like `noImplicitAny`, `strictNullChecks`, `noImplicitThis`, etc.). **Highly recommended to keep `true` for robust code.**
- **`jsx`**: (string) Specifies how JSX is processed. For React Native, this is typically `"react-native"` (which preserves JSX for the Metro bundler to handle) or sometimes `"react"` (if using a custom setup or older versions).
- **`target`**: (string, e.g., `"ES5"`, `"ES2015"`, `"ESNext"`) Specifies the ECMAScript target version for the output JavaScript. `ESNext` is common for modern React Native projects as Hermes (React Native's default JavaScript engine) supports modern JS features.
- **`module`**: (string, e.g., `"commonjs"`, `"ESNext"`) Specifies module code generation. `ESNext` is often used to leverage modern module features, which bundlers like Metro can then process.
- **`lib`**: (array of strings, e.g., `["DOM", "ESNext"]`) Specifies a list of library files to be included in the compilation. `DOM` might be included for web compatibility or certain utility types, and `ESNext` for modern JavaScript features.
- **`moduleResolution`**: (string, e.g., `"node"`) Specifies how modules are resolved. `"node"` is the standard for Node.js and React Native projects.
- **`esModuleInterop`**: (boolean, default `false`) When `true`, enables better compatibility between CommonJS modules and ES modules. Often set to `true` in modern projects.
- **`allowSyntheticDefaultImports`**: (boolean, default `false` if `esModuleInterop` is `false` or `module` is `system`, otherwise `true`) Allows default imports from modules with no default export. Often works in conjunction with `esModuleInterop`.
- **`skipLibCheck`**: (boolean, default `false`) When `true`, skips type checking of all declaration files (`.d.ts`). This can speed up compilation times, especially in projects with many dependencies, but it means you won't get type errors from library declaration files.
- **`baseUrl` and `paths`**: These options allow you to configure custom module path aliases. For example, you can set `baseUrl` to `"."` (the project root) and then define `paths` like `"@components/*": ["src/components/*"]`. This would allow you to import components using `import MyComponent from '@components/MyComponent';` instead of relative paths like `../../src/components/MyComponent`.

> 🛣️ **(All Learners):** You generally won't need to modify `tsconfig.json` frequently, especially when starting with an Expo template. However, understanding its role and common options is beneficial if you need to troubleshoot build issues, integrate specific libraries, or customize your project's compilation behavior (like adding path aliases).

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
