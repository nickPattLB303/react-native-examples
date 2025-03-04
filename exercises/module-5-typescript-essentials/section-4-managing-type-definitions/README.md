# Barcode Scanner Integration Exercise

This exercise will help you practice working with type definitions for third-party libraries in a React Native TypeScript application. You'll create type definitions for a medication barcode scanner library and integrate it into your app.

## Exercise Requirements

1. **Create Type Definitions**: Define TypeScript interfaces for the barcode scanner library's functions and data.

2. **Module Augmentation**: Implement module augmentation to add pharmacy-specific functionality to the library.

3. **Custom Hook**: Create a type-safe custom hook that uses the barcode scanner library.

4. **Error Handling**: Handle potential type errors and edge cases in a type-safe way.

5. **Documentation**: Add JSDoc comments to your type definitions.

## Project Structure

The starter code provides:
- A mock barcode scanner library (simulating a third-party library)
- Basic UI for scanning and displaying results
- Placeholder sections for your TypeScript implementations

## Implementation Tasks

1. **Create Declaration Files**:
   - Create a `types` directory
   - Add declaration files for the barcode scanner library
   - Define interfaces for all library functions and data structures

2. **Type Library Methods**:
   - Type the `scanBarcode` function with proper parameters and return types
   - Create interfaces for scan options and results
   - Add error handling types

3. **Module Augmentation**:
   - Add pharmacy-specific functionality to the library
   - Implement extended types for medication data

4. **Custom Hook**:
   - Create a `useBarcodeScanner` hook with proper TypeScript typing
   - Type all states and functions in the hook
   - Handle error scenarios in a type-safe way

## Best Practices

- Use descriptive interface and type names
- Create separate declaration files for different parts of the library
- Consider using JSDoc to provide additional context for your types
- Remember to handle all potential error cases in a type-safe way

## Getting Started

1. Open the starter code in `App.tsx`
2. Create the types directory and declaration files
3. Work through the "ToDo" items in order
4. Test your implementation to ensure type safety

## Running on Expo Snack

This exercise is designed to run on Expo Snack. Note that configuration files like package.json and tsconfig.json are deliberately excluded as Expo Snack handles these configurations automatically.

### Option 1: Upload to Expo Snack

1. Go to [Expo Snack](https://snack.expo.dev/)
2. Click "Import git repository"
3. Enter the GitHub URL for this repository
4. Navigate to this exercise directory

### Option 2: Manual Setup

1. Go to [Expo Snack](https://snack.expo.dev/)
2. Create a new Snack with TypeScript
3. Replace the default `App.tsx` file with the content from the `App.tsx` in either the `starter` or `complete` directory
4. Run the Snack on your device using the Expo Go app or in the embedded simulator

## Learning Objectives

This exercise reinforces the following skills:
- Creating declaration files for untyped libraries
- Using module augmentation to extend existing types
- Implementing custom hooks with proper TypeScript definitions
- Handling type safety with third-party libraries
- Documenting type definitions with JSDoc