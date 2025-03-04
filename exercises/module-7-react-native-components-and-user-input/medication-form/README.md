# Module 7 Challenge: Medication Input Form (TypeScript)

## Overview
In this challenge, you will apply your knowledge of React Native components and user input by building a focused medication input form using TypeScript. This form will allow healthcare providers to input essential medication information with proper validation and feedback.

**Estimated Time**: 30-60 minutes

## Learning Objectives
This challenge tests your ability to:
- Implement common React Native input components
- Apply appropriate validation to form inputs
- Provide clear feedback to users
- Handle keyboard behavior on mobile devices
- Apply basic accessibility practices
- Use TypeScript for type-safe development

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
   - Use TypeScript interfaces for form data and validation states
   - Add proper type annotations to functions and component props
   - Ensure type safety in state management and event handlers

## Getting Started
This challenge has two versions:

- **Starter Code**: `/starter` directory contains the basic structure to get you started
- **Complete Solution**: `/complete` directory contains a fully implemented solution

Both versions are designed to be run in Expo Snack with TypeScript enabled. Follow the instructions in each directory's README file to get started.

## Evaluation Criteria
Your solution will be evaluated based on:
- Correct implementation of form inputs
- Proper validation and error handling
- Code organization and readability
- Attention to user experience
- Proper use of TypeScript types and interfaces

## Additional Challenges (Optional)
If you finish early, consider adding one of these enhancements:
- Add an image picker for medication photos
- Implement form data persistence
- Add a reset button with confirmation 