# Module 5, Section 1: TypeScript Fundamentals Exercise

This directory contains the "Medication Types" exercise for the TypeScript Fundamentals section.

## Exercise Overview

In this exercise, students will implement TypeScript interfaces and types for a medication tracking system, demonstrating their understanding of TypeScript's static typing capabilities.

The exercise focuses on:
- Creating interfaces for objects
- Implementing type aliases with union types
- Using proper type annotations
- Applying interfaces in a real-world React Native context

## Directory Structure

- `/starter`: Contains the starter code that students will begin with
- `/complete`: Contains the completed example solution

## Exercise Requirements

Students will:
1. Define a type alias for `DosageUnit` with specific allowed values
2. Create interfaces for `Patient`, `Medication`, and `Prescription`
3. Apply type annotations to variables and function props
4. Update React Native components to use specific types instead of `any`

## Expo Snack Setup

This exercise is designed to be completed in Expo Snack. To set it up:

1. Create a new Snack at [snack.expo.dev](https://snack.expo.dev/)
2. Select TypeScript in the project settings
3. Upload all the files from the starter folder
4. The app will automatically refresh as you make changes

### Important Notes

- When implementing the `DosageUnit` type, students will need to add type assertions (`as DosageUnit`) to the string values in the data
- The React Native UI components are already built - students should focus on implementing TypeScript interfaces and types
- Emphasize that this exercise focuses on TypeScript integration with React Native components

## Testing the Implementation

To verify the implementation works correctly:
1. All medications should display in the app
2. No TypeScript errors should appear in the editor
3. The app should render patient information, medications, and prescription details correctly

## Learning Path Notes

> 🚀 **Self-Led Learners**: Complete the exercise by implementing all the required interfaces and type aliases. Compare your solution with the completed example afterward. If you encounter errors, check the TypeScript error messages which will guide your implementation.

> 🔍 **Instructor-Led Note**: This exercise should be introduced after covering the basic TypeScript types and interfaces sections of the module. Allow approximately 20-30 minutes for students to complete it. Highlight how TypeScript enhances React Native development through type safety.

> 🔄 **For Android/iOS Developers**: This exercise shows how TypeScript provides a similar type safety experience to what you're used to in Kotlin/Java (Android) or Swift (iOS), but with JavaScript's flexibility. The component props typing is similar to defining interfaces for Fragment arguments or ViewController parameters. 