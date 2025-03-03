# Module 5, Section 1: TypeScript Fundamentals Exercise

This directory contains the "Medication Types" exercise for the TypeScript Fundamentals section.

## Exercise Overview

In this exercise, students will implement TypeScript interfaces and types for a medication tracking system, demonstrating their understanding of TypeScript's static typing capabilities.

The exercise focuses on:
- Creating interfaces for objects
- Implementing type aliases with union types
- Using proper type annotations
- Applying interfaces in a real-world context

## Directory Structure

- `/starter`: Contains the starter code that students will begin with
- `/complete`: Contains the completed example solution

## Exercise Requirements

Students will:
1. Define a type alias for `DosageUnit` with specific allowed values
2. Create interfaces for `Patient`, `Medication`, and `Prescription`
3. Apply type annotations to variables and functions
4. Ensure the application runs without TypeScript errors

## CodePen Setup

This exercise is designed to be completed in CodePen. To set it up correctly:

1. Create a new pen
2. Set up HTML (copy from starter/index.html)
3. Set up CSS (copy from starter/styles.css)
4. In the JavaScript section:
   - Click the settings icon (gear)
   - Select "TypeScript" from the JavaScript Preprocessor dropdown
   - Copy the code from starter/script.ts
   - Save settings

### Important CodePen Notes

- When you implement the `DosageUnit` type, you will need to add type assertions (`as DosageUnit`) to the string values in the data to make TypeScript happy
- CodePen will compile your TypeScript to JavaScript automatically, so the HTML references script.js
- Make sure to save your CodePen work frequently

## Testing Your Implementation

To verify your implementation works correctly:
1. All medications should display in the middle card
2. No TypeScript errors should appear in the console
3. Patient information and prescription details should display correctly in their respective cards

## Learning Path Notes

> 🚀 **Self-Led Learners**: Complete the exercise by implementing all the required interfaces and type aliases. Compare your solution with the completed example afterward. If you're stuck, check the console for TypeScript errors which will give you clues about what's missing.

> 🔍 **Instructor-Led Note**: This exercise should be introduced after covering the basic TypeScript types and interfaces sections of the module. Allow approximately 20-30 minutes for students to complete it. Highlight that type assertions may be needed for the string values to match the DosageUnit type.

> 🔄 **For Android/iOS Developers**: The interface concept in TypeScript is similar to interfaces in Java/Kotlin (Android) and protocols in Swift (iOS), though TypeScript uses structural typing rather than nominal typing. Type assertions are similar to casting in these languages but with different compile-time behavior. 