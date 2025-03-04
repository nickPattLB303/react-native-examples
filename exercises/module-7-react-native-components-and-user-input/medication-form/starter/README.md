# Medication Input Form Challenge - Starter Code (TypeScript)

## Overview
This starter code provides the basic structure for building a medication input form in React Native using TypeScript. Follow the instructions in the comments to complete the challenge.

## Getting Started
This challenge is designed to be completed in Expo Snack. To get started:

1. Open [Expo Snack](https://snack.expo.dev/)
2. Copy the contents of `App.tsx` into a new Snack
3. Make sure to select TypeScript in the Snack settings
4. You can view the output on the right side of the screen or on your mobile device using the Expo Go app

## Requirements

### Functional Requirements
Your medication input form must include:

1. **Medication Information Section**
   - Text input for medication name (required)
   - Numeric input for medication strength (required)
   - Selection component for medication form (tablet, liquid, etc.)

2. **Dosage Instructions Section**
   - Input for dosage amount
   - Dropdown or segmented control for frequency (once daily, twice daily, etc.)
   - Basic text area for additional instructions

### Technical Requirements

1. **Input Components**
   - Use appropriate TextInput components with correct keyboard types
   - Implement at least one selection component (Picker or custom alternative)
   - Provide clear labels for all inputs

2. **Form Validation**
   - Validate required fields
   - Show error messages for invalid inputs
   - Disable submission until form is valid

3. **User Experience**
   - Handle keyboard appearance and dismissal appropriately
   - Provide visual feedback during submission
   - Include a clear submit button with proper state handling

4. **Accessibility**
   - Add basic accessibility labels to key components

5. **TypeScript**
   - Use proper TypeScript types for all components, functions, and state
   - Define interfaces for form data and validation states
   - Ensure type safety throughout the application

## Hints
1. Use the `useState<T>` hook with proper types to manage form data and validation state
2. Consider using conditional styling to show validation errors
3. Remember to use appropriate keyboard types for different input fields
4. For selection components, you can use the Picker from `@react-native-picker/picker` or create your own custom selection component

## Submission
When you've completed the challenge:
1. Save your Snack
2. Share the link to your completed challenge
3. Include a brief explanation of your implementation approach 