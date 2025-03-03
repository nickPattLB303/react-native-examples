# Section 4: Managing Type Definitions

## Learning Objectives
After completing this section, you will be able to:
- Install and use type definitions for third-party libraries
- Create your own type declaration files
- Resolve common type errors in React Native projects
- Implement proper module augmentation techniques
- Understand and use TypeScript configuration options
- Apply strategies for working with partially typed or untyped libraries
- Implement robust type organization patterns for React Native projects

**Prerequisite Knowledge**: TypeScript basics and its application in React Native
**Estimated Time**: 45-60 minutes

## Exercise: Pharmacy Inventory System

### Overview
In this exercise, you'll build a pharmacy inventory system that leverages advanced TypeScript features to handle medication data. You'll work with third-party libraries, create custom type declarations, and implement proper type organization patterns.

### Requirements
You will build a pharmacy inventory system that:
1. Displays a list of medications with their details
2. Allows scanning of medication barcodes (simulated)
3. Tracks inventory levels and expiration dates
4. Provides type-safe interaction with an external API

### Getting Started
1. Create a new Expo Snack at [snack.expo.dev](https://snack.expo.dev/)
2. Select TypeScript in the project settings
3. Copy the starter code from this repository
4. Follow the TODOs in the code to implement the required type definitions

### Task 1: Third-Party Library Integration
Create appropriate type definitions for the simulated barcode scanning library:

1. Create a declaration file `types/barcode-scanner.d.ts`
2. Define interfaces for scanner options and result objects
3. Declare module functions for scanning and processing barcodes

### Task 2: Module Augmentation
Extend existing types to add pharmacy-specific functionality:

1. Augment React Native's StyleSheet with pharmacy-specific colors
2. Extend React Navigation to include medication-specific route parameters

### Task 3: Type Organization
Implement a robust type organization pattern:

1. Create a types directory structure with subdirectories for models, components, and API
2. Define shared types in a central location
3. Re-export commonly used types for ease of access

### Task 4: Working with Untyped APIs
Handle data from a simulated inventory API:

1. Create type guards to safely work with unknown API responses
2. Implement utility functions to transform untyped data into properly typed objects
3. Use Zod or a similar library to validate data at runtime

## Success Criteria
- All TODOs are implemented correctly
- The application runs without TypeScript errors
- All types are properly organized and documented
- External library types are correctly defined and used
- Untyped API data is handled safely with proper type validation

## Additional Resources
- [TypeScript Declaration Files Documentation](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [TypeScript Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
- [Zod: TypeScript-first schema validation](https://github.com/colinhacks/zod)

> 🚀 **Self-Led Learners**: Focus first on creating the basic type declarations, then gradually refine them as you work through the exercise. Remember that TypeScript's type system is designed to help you catch errors early — let the error messages guide your implementation.

> 🔍 **Instructor-Led Note**: This exercise builds on the fundamentals of TypeScript and introduces more advanced patterns. Students often struggle with module augmentation and declaration files, so be prepared to provide additional examples and explanations for these concepts. 