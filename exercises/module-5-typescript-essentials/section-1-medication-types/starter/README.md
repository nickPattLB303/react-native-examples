# TypeScript Fundamentals Exercise: Medication Types

## Learning Objectives
After completing this exercise, you will be able to:
- Define TypeScript interfaces for objects
- Create and use type aliases with union types
- Apply proper type annotations to variables and functions
- Understand how TypeScript interfaces can model real-world objects

## Exercise Requirements

In this exercise, you'll be implementing TypeScript interfaces and types for a medication tracking system. The application displays information about a patient, their medications, and prescription details.

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
1. Add type annotations to the three variables in the DOMContentLoaded event listener
2. Update the render functions to use your specific types instead of any

## Getting Started
1. Open the `script.ts` file
2. Look for the TODO comments
3. Implement each interface and type as specified
4. Test your implementation by ensuring there are no TypeScript errors

## Success Criteria
- All TODOs are implemented correctly
- The code runs without TypeScript errors
- The webpage displays the patient information, medications, and prescription details correctly
- Each interface properly enforces the required properties and types 