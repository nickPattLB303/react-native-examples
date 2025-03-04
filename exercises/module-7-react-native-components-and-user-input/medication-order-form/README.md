# Medication Order Form Exercise

## Overview

In this exercise, you'll implement a multi-step medication order form, a common requirement in healthcare and pharmacy applications. The form will guide users through collecting patient information, selecting medications, defining prescription details, and reviewing the order before submission.

## Learning Objectives

By completing this exercise, you'll:

- Implement complex form state management using React's useReducer
- Create a multi-step form with validation between steps
- Apply error handling and validation techniques
- Implement an intuitive progress tracking UI
- Handle form submission with loading states

## Requirements

Your task is to implement a medication order form with the following features:

### Form Structure

The form should include four steps:

1. **Patient Information**
   - Patient name (required)
   - Patient ID (required, alphanumeric, minimum 6 characters)
   - Date of birth (required, format MM/DD/YYYY)

2. **Medication Selection**
   - Medication name (required)
   - Medication form (e.g., tablet, liquid, capsule) (required)
   - Medication strength (required)

3. **Prescription Details**
   - Dosage (required)
   - Frequency (required)
   - Duration (required)
   - Special instructions (optional)

4. **Review and Submit**
   - Display all collected information
   - Submit button
   - Loading state during submission

### Technical Requirements

- Use TypeScript for type safety
- Implement form state management with useReducer
- Add validation for required fields
- Implement navigation between steps with validation gates
- Create a visual progress indicator
- Handle keyboard dismissal
- Simulate form submission with a loading state

## Getting Started

The starter code provides a basic structure for the multi-step form with placeholders for implementation. You'll need to:

1. Complete the useReducer implementation
2. Add validation logic for each step
3. Implement the UI for form fields and steps
4. Create the progress indicator
5. Add form submission logic with loading state

## Running the Exercise

### Using Expo Snack

1. Create a new Snack at [snack.expo.dev](https://snack.expo.dev/)
2. Set up a new TypeScript project
3. Copy the starter code from `starter/App.tsx` to your Snack's App.tsx
4. Run the Snack on your device or in the web emulator

### Using Your Local Environment

1. Create a new React Native project with Expo
2. Copy the starter code from `starter/App.tsx` to your project's App.tsx
3. Install any required dependencies
4. Run the application using `expo start` or `npm start`

## Solution

A complete implementation is provided in `complete/App.tsx`. Review this after attempting the exercise to compare your approach with our solution.

## Tips for Success

- Focus on one step at a time in your implementation
- Test form validation thoroughly
- Pay attention to the user experience, especially error messages
- Ensure keyboard behavior is optimized for mobile
- Consider edge cases in form validation

## Extension Challenges

After completing the basic implementation, try these extensions:

1. Add form data persistence using AsyncStorage
2. Implement more sophisticated validation rules (e.g., drug interaction warnings)
3. Create a summary receipt screen after submission
4. Add animations for transitions between steps
5. Implement unit tests for your form validation logic 