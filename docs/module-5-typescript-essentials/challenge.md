# Module 5 Challenge: Medication Inventory System

## Overview
In this challenge, you will build a TypeScript-powered medication inventory system for a pharmacy. You'll refactor an existing JavaScript-based system to use TypeScript, adding proper typing, interfaces, and type safety throughout the application. This challenge will test your understanding of TypeScript concepts and their application in a React Native environment.

**Estimated Time**: 60-90 minutes

## Learning Objectives
This challenge will test your ability to:
- Convert JavaScript code to TypeScript with proper typing
- Define and implement interfaces and types for complex data structures
- Apply advanced TypeScript features like generics and utility types
- Ensure type safety in React Native components and APIs
- Implement proper error handling with TypeScript
- Create and use custom types for a domain-specific application

## Requirements

### Part 1: Project Setup (10 minutes)
1. Clone the starter code from the `exercises/module-5-typescript-essentials/challenge/starter` branch
2. Install the necessary dependencies
3. Review the existing JavaScript code to understand the current implementation
4. Configure TypeScript for the project with appropriate compiler options

### Part 2: Data Models (20 minutes)
1. Create a `types` directory to organize your type definitions
2. Define interfaces for the core data models:
   - `Medication` (include properties like id, name, manufacturer, dosage, etc.)
   - `Inventory` (quantity, location, expiration date, etc.)
   - `Supplier` (contact information, available medications, etc.)
   - `Order` (order status, items, quantities, etc.)
3. Use literal types for properties with fixed value sets (e.g., medication categories, order status)
4. Implement type unions and intersections where appropriate
5. Create a barrel file (`index.ts`) to export all types from a single location

### Part 3: Components and Hooks (20 minutes)
1. Convert the following components to TypeScript:
   - `MedicationList.js` → `MedicationList.tsx`
   - `InventoryDetails.js` → `InventoryDetails.tsx`
   - `OrderForm.js` → `OrderForm.tsx`
2. Add proper props interfaces for each component
3. Implement typed state using `useState` and `useReducer` hooks
4. Convert the custom hooks to TypeScript:
   - `useInventory.js` → `useInventory.ts`
   - `useOrders.js` → `useOrders.ts`
5. Ensure all event handlers are properly typed

### Part 4: API Integration (15 minutes)
1. Create type definitions for API responses and requests
2. Implement proper error handling with typed error objects
3. Use generics for API utility functions
4. Add type guards to safely process API responses
5. Create mock type definitions for the external medication database API

### Part 5: Advanced Features (15 minutes)
1. Implement a generic inventory management system that can work with different item types
2. Create utility types for common transformations (e.g., creating a partial inventory update)
3. Add proper TypeScript support for the barcode scanning functionality
4. Implement module augmentation to extend existing library types
5. Document your types with JSDoc comments

### Part 6: Testing and Validation (10 minutes)
1. Fix any remaining TypeScript errors in the codebase
2. Test the application to ensure it works as expected
3. Add runtime type validation for user inputs and API responses
4. Create a brief write-up of how TypeScript improved the codebase

## Starter Code Structure
The starter code provides a basic JavaScript implementation of the medication inventory system:

```
/src
  /components
    MedicationList.js
    InventoryDetails.js
    OrderForm.js
  /hooks
    useInventory.js
    useOrders.js
  /api
    medicationApi.js
    inventoryApi.js
    ordersApi.js
  /utils
    barcodeScanner.js
    formatters.js
  App.js
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. **Correctness**: Does the application work as expected with TypeScript?
2. **Type Safety**: Are all components and functions properly typed?
3. **Code Organization**: Is the type structure well-organized and maintainable?
4. **TypeScript Features**: Do you use appropriate TypeScript features for different scenarios?
5. **Error Handling**: Is error handling properly implemented with TypeScript?
6. **Documentation**: Are types well-documented with comments?

## Tips
- Start by setting up the core interfaces and types before converting components
- Use the TypeScript compiler to help identify issues during conversion
- Remember that TypeScript is a superset of JavaScript, so you don't need to change the runtime behavior
- Consider using utility types like `Partial<T>`, `Pick<T>`, and `Omit<T>` to create derived types
- When in doubt, refer to the React Native TypeScript documentation

## Submission
When you've completed the challenge:
1. Ensure all TypeScript errors are resolved
2. Test the application functionality
3. Commit your code to the `exercises/module-5-typescript-essentials/challenge/complete` branch
4. Include a short README explaining your approach and any design decisions

## Additional Challenge (Optional)
If you complete the main challenge early, try implementing these advanced features:
1. Add a state management system (like Redux) with full TypeScript support
2. Implement an inventory search feature with properly typed filters and sorting options
3. Create a barcode scanning system that validates medication information against your type definitions
4. Add complex form validation using TypeScript to ensure type safety of user inputs 