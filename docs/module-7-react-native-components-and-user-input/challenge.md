# Module 7 Challenge: Medication Input Form

## Overview
In this challenge, you will apply your knowledge of React Native components and user input by building a focused medication input form. This form will allow healthcare providers to input essential medication information with proper validation and feedback.

**Estimated Time**: 30-60 minutes

## Learning Objectives
This challenge tests your ability to:
- Implement common React Native input components
- Apply appropriate validation to form inputs
- Provide clear feedback to users
- Handle keyboard behavior on mobile devices
- Apply basic accessibility practices

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

## Getting Started
Use the starter code provided in the `challenges/medication-form/starter` directory. The starter code includes:
- Basic screen structure
- Styling utilities
- Submission handler function

## Submission Requirements
Your submission should include:
1. Complete code for the medication input form
2. A brief explanation of your implementation approach
3. A screenshot of your form

## Evaluation Criteria
Your solution will be evaluated based on:
- Correct implementation of form inputs
- Proper validation and error handling
- Code organization and readability
- Attention to user experience

## Additional Challenges (Optional)
If you finish early, consider adding one of these enhancements:
- Add an image picker for medication photos
- Implement form data persistence
- Add a reset button with confirmation 