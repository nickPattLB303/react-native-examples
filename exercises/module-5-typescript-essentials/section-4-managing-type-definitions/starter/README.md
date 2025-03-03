# Pharmacy Inventory System - TypeScript Exercise

This exercise focuses on implementing proper type definitions for a React Native pharmacy inventory system. The starter code contains a functional application, but lacks proper TypeScript types, interfaces, and type declarations for third-party libraries.

## Exercise Overview

You'll work with a partially typed React Native application that manages medications in a pharmacy. Your task is to implement proper TypeScript definitions for all components, APIs, and third-party libraries.

## Getting Started

1. Create a new Expo Snack at [snack.expo.dev](https://snack.expo.dev/)
2. Select TypeScript in the project settings
3. Upload all the files from this starter folder
4. The app will run, but with TypeScript errors due to missing type definitions

## Your Tasks

### 1. Create Basic Type Definitions

First, create a directory structure for your types:

```
/types
  /api
  /components
  /models
  index.ts
```

Then, create basic interfaces for the core models:

- `Medication` interface for medication data
- `InventoryItem` interface extending Medication with stock information
- `ScanResult` interface for barcode scanning results

### 2. Create Type Declarations for the Scanner Library

Create a declaration file for the simulated barcode scanner:

```
/types/barcode-scanner.d.ts
```

This should include:
- Interface for scanner options
- Interface for scan results
- Module declaration for the scanner functions

### 3. Type Component Props

Update the component files to use proper prop types:
- Define prop interfaces for `MedicationItem` and `ScannerButton`
- Use these interfaces in the component function parameters

### 4. Type API Responses and Requests

For the inventory API:
- Create interfaces for API request parameters
- Create interfaces for API response objects
- Update API function signatures with proper return types

### 5. Implement Module Augmentation

Extend existing libraries:
- Augment React Native's StyleSheet to add pharmacy-specific colors
- Extend React Navigation (if used) with pharmacy route parameters

### 6. Organize and Export Types

In your types/index.ts file:
- Re-export all commonly used types
- Create utility types for shared patterns
- Document types with JSDoc comments

## Success Criteria

- No TypeScript errors or warnings in the code
- Proper type safety throughout the application
- Well-organized type definitions that follow best practices
- Type declarations that accurately represent the third-party libraries
- Module augmentation that extends existing libraries

## Additional Challenges

Once you've completed the basic requirements, try these additional challenges:
1. Add Zod schemas for runtime validation of API responses
2. Create a custom hook with proper TypeScript typing for scanning medications
3. Implement generic types for the API response structure
4. Add branded types for IDs, barcodes, and other specific string formats

## Resources

- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Zod Documentation](https://github.com/colinhacks/zod) 