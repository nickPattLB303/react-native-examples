# Medication Tracker Exercise - Starter Code

This is the starter code for the Medication Tracker exercise that practices TypeScript with React Native.

## Exercise Requirements

Follow these steps to complete the exercise:

1. Define interfaces for medication reminders and user settings
   - Create a `Medication` interface with id, name, dosage, frequency, and time properties
   - Create a `UserSettings` interface with notification preferences

2. Define props interface for the MedicationItem component
   - Create a `MedicationItemProps` interface with the necessary properties and callback functions

3. Implement the MedicationItem component with properly typed props
   - Use the React.FC generic type with your props interface
   - Implement the component to display medication information and handle interactions

4. Create a custom hook to fetch and manage medication data
   - Define a `useMedications` hook that returns medications, loading state, and error state
   - Include a function to add new medications

5. Implement state management with useState and TypeScript in the App component
   - Type the state variables properly with the defined interfaces
   - Handle loading, error, and empty states

6. Add type-safe event handlers for user interactions
   - Implement handlers for adding, taking, and skipping medications

## Tips

- Use the TypeScript interfaces throughout your code to ensure type safety
- Make use of React.FC for typing functional components
- Be explicit with useState generic types when needed
- Use type union with null for optional values
- Test your work to make sure the UI functions correctly

## Resources

- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [React Native TypeScript Documentation](https://reactnative.dev/docs/typescript) 