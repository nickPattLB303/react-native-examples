# Patient Information Input Form

This exercise focuses on implementing a form with text input components, showcasing proper keyboard handling and form validation in React Native.

## Overview

In this exercise, you'll create a Patient Information Input Form that demonstrates:

1. Different types of text inputs with appropriate configurations
2. Keyboard management techniques
3. Form validation
4. Focus management between input fields
5. User feedback for form errors

## Learning Objectives

After completing this exercise, you will be able to:

- Configure TextInput components with appropriate properties for different data types
- Implement keyboard avoiding behavior to ensure forms work well on all devices
- Manage focus between form fields for a better user experience
- Validate form data and provide appropriate error feedback
- Create a complete form submission workflow

## Exercise Requirements

You will need to implement:

1. State management for all form fields
2. Text input components with appropriate keyboard types
3. Focus management to navigate between fields
4. Basic validation for required fields and format validation
5. A submit function that validates all fields
6. Feedback for validation errors
7. Keyboard avoiding behavior

## Starting Point

The starter code provides:

- Basic structure for the Patient Information Form
- TypeScript interfaces for form data
- TODO comments indicating where implementation is needed
- KeyboardAvoidingView setup for keyboard management

You'll need to implement the missing functionality marked with TODO comments.

## Expo Snack

This exercise can be run in [Expo Snack](https://snack.expo.dev/). To do this:

1. Create a new TypeScript-based Snack
2. Replace the contents of `App.tsx` with the starter code from this exercise
3. Run the Snack on a simulator or physical device

The starter file is located at `./starter/App.tsx`.

## Complete Solution

The complete solution implements all requirements and includes:

- Full state management for the form
- Properly configured text inputs with appropriate keyboard types
- Focus management to move between fields
- Comprehensive validation with error messages
- Submit handling with success feedback
- A polished user interface with proper styling

The complete solution is located at `./complete/App.tsx`.

## Key Concepts

### Keyboard Management

React Native provides several components and techniques for proper keyboard management:

- `KeyboardAvoidingView`: Adjusts its height, position, or bottom padding automatically based on keyboard height
- `TouchableWithoutFeedback` with `Keyboard.dismiss()`: Dismisses the keyboard when tapping outside of inputs
- `blurOnSubmit` and `returnKeyType`: Controls keyboard behavior when submitting an input

### Form Validation

Proper form validation includes:

- Required field validation
- Format validation (email, phone, etc.)
- Real-time validation feedback
- Submission validation

### Focus Management

Smooth focus management improves user experience by:

- Automatically moving focus to the next field
- Providing appropriate return key types
- Dismissing the keyboard when appropriate

## Tips

- Test your form on both iOS and Android to ensure keyboard behavior works correctly
- Consider the different keyboard types available and choose appropriately
- Remember that multiline text inputs behave differently from single-line inputs
- Test validation with various error scenarios to ensure proper feedback