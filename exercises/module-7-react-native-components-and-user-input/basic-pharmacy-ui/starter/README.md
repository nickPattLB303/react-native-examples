# Basic Pharmacy UI Layout - Starter Code

## Exercise Description
In this exercise, you will create a basic medicine details screen using React Native core components and TypeScript. This exercise is designed to help you practice using the fundamental UI components in React Native within the context of a pharmacy application, while leveraging TypeScript for type safety.

## Learning Objectives
After completing this exercise, you will be able to:
- Use core React Native components like View, Text, Image, and Pressable with TypeScript
- Structure a screen layout using appropriate components
- Apply styling to React Native components using StyleSheet
- Implement basic interactivity with state management
- Use TypeScript interfaces and type annotations for React Native components

## Requirements
Your task is to complete the MedicationDetailScreen component to display detailed information about a medication. The screen should include:

1. A header with the medication name
2. An image of the medication
3. Basic details (dosage, form, manufacturer)
4. A description section
5. Directions for use
6. A button to add the medication to cart

The starter code includes:
- Sample medication data in the `medicationData` object with a TypeScript interface
- A basic component structure with TODO comments
- Initial StyleSheet with basic styles

## Step-by-Step Instructions
1. Create a state variable to track if the medication is added to cart (with proper typing)
2. Implement a function to handle the "Add to Cart" button press
3. Set up a ScrollView to make the content scrollable
4. Create a header showing the medication name
5. Display the medication image
6. Show the basic details (dosage, form, manufacturer)
7. Add the description section
8. Include the directions for use
9. Implement the "Add to Cart" button that changes text when pressed
10. Style all components appropriately

## TypeScript-Specific Tips
- Use the provided `Medication` interface to understand the data structure
- Add proper type annotations for the useState hook: `useState<boolean>(false)`
- Use `React.FC` type for the functional component
- Add return type annotations for functions: `const handleAddToCart = (): void => {}`

## Tips
- Remember to use the appropriate core components for each part of the UI
- Use the provided `medicationData` object to populate your UI
- The Image component requires specific dimensions in the style
- Make your UI look professional by adding appropriate spacing and styling
- Remember that all text must be wrapped in a Text component in React Native

## Expected Output
When completed, your app should display a professional-looking medication detail screen with all the required information. The "Add to Cart" button should change to "Added to Cart" when pressed.

## Concepts Covered
- Core UI Components (View, Text, Image, ScrollView, Pressable)
- Layout with React Native
- Styling with StyleSheet
- Basic state management with useState
- Handling user interaction
- TypeScript interfaces and type annotations for React Native 