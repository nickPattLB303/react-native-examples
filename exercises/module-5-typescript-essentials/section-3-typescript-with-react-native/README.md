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

1. Define a `Medication` interface with appropriate properties:
   - id (number)
   - name (string)
   - dosage (string)
   - time (string)
   - taken (boolean)

2. Create a `MedicationItem` component with typed props:
   - Medication data
   - onPress callback to mark as taken/untaken

3. Create a `MedicationList` component that:
   - Renders a list of medications using FlatList
   - Uses proper TypeScript for its props and state

4. In the main App component:
   - Use useState with proper TypeScript typing
   - Implement a function to toggle medication taken status
   - Add a summary showing medications taken vs. total

## Tips

- Review the TypeScript type definitions for React Native components
- Pay attention to event handler types
- Use TypeScript to make your component props explicit
- Focus on creating a type-safe implementation
- Look for TypeScript errors and fix them

## Getting Started

1. Open the starter code in `App.tsx`
2. Work through the "ToDo" items in order
3. Test your implementation as you go
4. Verify the final app shows the correct UI and behavior

## Learning Objectives

This exercise reinforces the following skills:
- Using TypeScript with React Native components
- Typing component props and state
- Implementing type-safe event handlers
- Creating maintainable, type-safe React Native code 