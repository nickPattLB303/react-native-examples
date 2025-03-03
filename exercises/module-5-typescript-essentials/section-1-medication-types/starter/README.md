# TypeScript Fundamentals Exercise: Medication Types

## Learning Objectives
After completing this exercise, you will be able to:
- Define TypeScript interfaces for objects
- Create and use type aliases with union types
- Apply proper type annotations to variables and functions
- Understand how TypeScript interfaces can model real-world objects

## Exercise Requirements

In this exercise, you'll implement TypeScript interfaces and types for a medication tracking app. The application displays information about a patient, their medications, and prescription details.

### Task 1: Define the Types
1. Create a type alias for `DosageUnit` that only allows these specific string values: "mg", "ml", "µg", and "tablet"
2. Define an interface for a `Patient` with these properties:
   - `id`: number
   - `name`: string
   - `dateOfBirth`: Date
   - `allergies`: string array
3. Create an interface for a `Medication` with these properties:
   - `id`: number
   - `name`: string
   - `dosage`: number
   - `unit`: DosageUnit (using your type alias)
   - `sideEffects`: string array
4. Define a `Prescription` interface with these properties:
   - `id`: number
   - `patient`: Patient (using your Patient interface)
   - `medications`: array of Medication objects
   - `prescribedDate`: Date
   - `refillsRemaining`: number
   - `notes`: string

### Task 2: Apply the Types
1. Add type annotations to the three variables in App.tsx
2. Update the components in `/components` folder to use your specific types instead of `any`

## Getting Started
1. Open the `App.tsx` file
2. Look for the TODO comments
3. Implement each interface and type as specified
4. Test your implementation by ensuring there are no TypeScript errors

## Expo Snack Setup
This exercise is designed to be completed in Expo Snack. To work with it:

1. Create a new Snack at [snack.expo.dev](https://snack.expo.dev/)
2. Select TypeScript in the project settings
3. Upload all the files from this starter folder
4. The app will automatically refresh as you make changes

### Important Notes
- When you implement the `DosageUnit` type, you will need to add type assertions (`as DosageUnit`) to the string values in the data
- Make sure to check for TypeScript errors in the Expo Snack editor
- The UI components are already built for you - focus on implementing the TypeScript interfaces and types

## Success Criteria
- All TODOs are implemented correctly
- The code runs without TypeScript errors
- The app displays the patient information, medications, and prescription details correctly
- Each interface properly enforces the required properties and types 