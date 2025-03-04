# Medication Tracker Exercise

This exercise will help you practice applying TypeScript concepts to a React Native application. You'll build a simple medication tracker application that allows users to mark medications as taken and see a summary of their daily medication regimen.

## Exercise Requirements

1. **Define TypeScript Interfaces**: Create interfaces for medication reminders.

2. **TypeScript Components**: Implement type-safe React components for the medication tracker.

3. **State Management**: Use proper TypeScript types with React's useState hook.

4. **Type-safe Event Handlers**: Implement handlers for user interactions with correct TypeScript typing.

5. **Custom Hooks (Optional)**: Create a custom hook to manage medication data.

## Project Structure

The starter code provides:
- Basic app structure
- Sample medication data
- StyleSheet definitions

## Implementation Tasks

1. **Create the Medication Interface**:
   - Define properties for medication items
   - Use appropriate TypeScript types for each property

2. **Implement Type-Safe Components**:
   - Create a MedicationItem component with proper prop types
   - Create a MedicationList component with proper prop types
   - Implement a Summary component that displays statistics

3. **Manage State with TypeScript**:
   - Define the correct types for useState hooks
   - Properly type the medication data array

4. **Handle User Interactions**:
   - Create type-safe functions for toggling medication status
   - Implement proper event handler types

## Best Practices

- Create reusable interfaces
- Use TypeScript to make your component props explicit
- Focus on creating a type-safe implementation
- Look for TypeScript errors and fix them

## Getting Started

1. Open the starter code in `App.tsx`
2. Work through the "ToDo" items in order
3. Test your implementation as you go
4. Verify the final app shows the correct UI and behavior

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
- Using TypeScript with React Native components
- Typing component props and state
- Implementing type-safe event handlers
- Creating maintainable, type-safe React Native code