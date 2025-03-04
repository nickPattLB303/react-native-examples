# Module 5 Challenge: Medication Types System

## Overview
In this challenge, you will build a TypeScript-powered medication type system that defines the core data structures for a pharmacy application. You'll create well-defined TypeScript interfaces and types that could be used in a React Native medication tracking application.

**Estimated Time**: 30-60 minutes

## Learning Objectives
This challenge will test your ability to:
- Define and implement interfaces and types for medication-related data structures
- Apply TypeScript features like unions, interfaces, and type aliases
- Create a type-safe system for medication management
- Document types effectively

## Requirements

### Part 1: Core Medication Types (15-20 minutes)
1. Create a `types.ts` file to store your type definitions
2. Define interfaces for the core data models:
   - `Medication` (include properties like id, name, manufacturer, dosage, etc.)
   - `Prescription` (doctor, patient, medication, instructions, etc.)
   - `DosageSchedule` (frequency, times, special instructions, etc.)
3. Use literal types for properties with fixed value sets (e.g., medication categories, dosage units)
4. Add appropriate JSDoc comments to document your types

### Part 2: Type Relationships and Utilities (15-20 minutes)
1. Create a `MedicationWithHistory` type that extends the basic medication type
2. Define a `DosageRecord` type to track when doses were taken
3. Create union types for medication status (active, discontinued, etc.)
4. Define utility types for common operations:
   - `MedicationListItem` (a simplified version of medication for lists)
   - `MedicationFormData` (the shape of data when adding a new medication)

### Part 3: Function Type Signatures (15-20 minutes)
1. Define type signatures for key functions:
   - `searchMedications`: A function to search for medications by name
   - `calculateNextDose`: A function to calculate the next dose time
   - `addMedication`: A function to add a new medication to a patient's list
   - `checkInteractions`: A function to check for potential medication interactions
2. Include appropriate parameter and return types
3. Demonstrate how generic types could be used to make functions more flexible

## Submission

Submit your TypeScript files containing the type definitions and function signatures. No implementation code is required, only the TypeScript type system.

## Evaluation Criteria

Your challenge will be evaluated based on:
1. **Type Correctness**: Are your types logically consistent and correct?
2. **Code Organization**: Are types organized in a maintainable way?
3. **TypeScript Features**: Do you use appropriate TypeScript features?
4. **Documentation**: Are your types well-documented with JSDoc comments?
5. **Type Relationships**: Do your types show a good understanding of relationships between different entities?

## Tips
- Focus on creating a logical, well-structured type system rather than implementation details
- Consider edge cases in your type definitions
- Use union types and optional properties where appropriate
- Remember that good type definitions make implementation easier later 