# Module 7: React Native Components and User Input

This module focuses on React Native components and handling user input, including form elements, text inputs, and keyboard management.

## Overview

React Native provides a powerful set of components for building user interfaces and collecting user input. This module covers the fundamentals of working with these components and implementing effective user input strategies.

## Sections

### Section 1: Basic UI Layout Components

Learn about the fundamental layout components in React Native, including:
- View
- Text
- Image
- ScrollView
- SafeAreaView

[Go to Section 1](./basic-pharmacy-ui/README.md)

### Section 2: Text Input and Keyboard Management

Learn about collecting and validating user input with TextInput components:
- TextInput configuration
- Keyboard management
- Form validation
- Focus management

[Go to Section 2](./section-2-text-input-and-keyboard-management/README.md)

### Section 3: Selection Components and Pickers

Learn about implementing various selection components:
- Picker (dropdown)
- Switch (toggle)
- Custom radio buttons
- Custom checkboxes
- DateTimePicker

[Go to Section 3](./section-3-selection-components/README.md)

### Section 4: Form Management in React Native

Learn advanced techniques for managing complex forms:
- Advanced state management with useReducer
- Multi-step form implementation
- Form validation strategies
- User feedback and error handling

[Go to Section 4](./section-4-form-management/README.md)

## Exercises

### Basic Pharmacy UI Layout

Create a pharmacy app interface using fundamental React Native components.

[Basic Pharmacy UI Exercise](./basic-pharmacy-ui/README.md)

### Patient Information Input Form

Create a patient information form with text inputs and proper keyboard management.

[Patient Information Form Exercise](./patient-information-form/README.md)

### Medication Schedule Form

Create a medication scheduling form with various selection components.

[Medication Schedule Form Exercise](./medication-schedule-form/README.md)

### Medication Order Form

Create a multi-step medication order form with advanced state management and validation.

[Medication Order Form Exercise](./medication-order-form/README.md)

## Expo Snack Integration

The exercises in this module can be run using [Expo Snack](https://snack.expo.dev/), allowing you to work on the exercises in a browser-based environment without local setup.

For each exercise:
1. Create a new TypeScript Snack
2. Copy the contents of the exercise's `App.tsx` file into the Snack
3. For the Medication Schedule Form, add these dependencies:
   - `@react-native-picker/picker`
   - `@react-native-community/datetimepicker`
4. Run the Snack on a simulator or device

Note that when using Expo Snack:
- Configuration files like `package.json` and `tsconfig.json` are not needed
- Dependencies can be added through the Snack interface
- TypeScript integration is handled automatically

## Learning Objectives

After completing this module, you will be able to:

- Create structured layouts using React Native's core components
- Implement properly styled UI components
- Configure text input fields for different data types
- Manage keyboard interactions effectively
- Implement various selection components (Picker, Switch, etc.)
- Create custom selection UI components
- Validate form inputs
- Provide feedback for form errors
- Create a fluid user experience with proper focus management
- Handle platform differences in component behavior
- Implement complex multi-step forms with state management
- Create accessible and user-friendly form experiences

## Additional Resources

- [React Native Components Documentation](https://reactnative.dev/docs/components-and-apis)
- [React Native TextInput Documentation](https://reactnative.dev/docs/textinput)
- [React Native Keyboard Documentation](https://reactnative.dev/docs/keyboard)
- [React Native Picker Documentation](https://github.com/react-native-picker/picker)
- [React Native DateTimePicker Documentation](https://github.com/react-native-datetimepicker/datetimepicker)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Formik Documentation](https://formik.org/)
- [Expo Snack Documentation](https://docs.expo.dev/workflow/snack/) 