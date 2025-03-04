# Module 7 Challenge: Medication Order Form

## Overview
In this challenge, you will apply your knowledge of React Native components and user input by building a comprehensive medication order form for a pharmacy application. This form will allow healthcare providers to submit medication orders for patients, capturing all necessary information while providing a smooth, accessible user experience.

## Learning Objectives
This challenge tests your ability to:
- Implement various React Native input components
- Create a multi-step form with proper navigation
- Apply form validation and provide user feedback
- Manage keyboard behavior on mobile devices
- Implement accessible form elements
- Create custom input components for specialized data entry

## Requirements

### Functional Requirements
Your medication order form must include the following features:

1. **Patient Information Section**
   - Ability to search for a patient by name or ID
   - Display of selected patient information
   - Option to add a new patient if not found

2. **Medication Selection Section**
   - Search functionality for medications by name or code
   - Display of medication details (form, strength, etc.)
   - Quantity selection with appropriate input validation

3. **Prescription Details Section**
   - Dosage instructions with appropriate input components
   - Duration selection (days, weeks, months)
   - Route of administration selection (oral, topical, etc.)
   - Special instructions text area

4. **Confirmation Section**
   - Summary of the order details
   - Submission confirmation with success/error handling

### Technical Requirements

1. **Input Components**
   - Use appropriate TextInput components with proper keyboard types
   - Implement selection components (Picker, RadioButton, etc.)
   - Create at least one custom input component

2. **Form Management**
   - Implement form state management (with useState, useReducer, or a form library)
   - Include proper validation with user feedback
   - Support multi-step navigation with state preservation

3. **User Experience**
   - Manage keyboard appearance and dismissal
   - Provide loading states during asynchronous operations
   - Implement error handling and user feedback

4. **Accessibility**
   - Include proper accessibility labels and hints
   - Support screen readers
   - Implement proper focus management

## Getting Started
Use the starter code provided in the `challenges/medication-order-form/starter` directory. The starter code includes:
- Basic navigation structure
- Mock API for patient and medication data
- Placeholder screens for each section
- Basic types and interfaces

## Submission Requirements
Your submission should include:
1. Complete code for the medication order form
2. A brief write-up explaining your implementation decisions
3. Screenshots of your form on both iOS and Android
4. A demonstration of the accessibility features implemented

## Evaluation Criteria
Your solution will be evaluated based on:
- Correct implementation of all required features
- Code quality and organization
- User experience and interface design
- Accessibility implementation
- Error handling and validation
- Performance considerations

## Additional Challenges
For those seeking extra challenges:
- Implement offline support with form data persistence
- Add image upload for prescription photos
- Create animations for form transitions
- Implement biometric authentication for form submission 