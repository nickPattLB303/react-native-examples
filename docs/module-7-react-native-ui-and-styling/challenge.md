# Module 7 Challenge: Pharmacy Medication Detail Screen

## Overview

In this challenge, you'll apply the UI and styling concepts you've learned by building a comprehensive medication detail screen for a pharmacy application. This challenge will test your understanding of React Native components, layout techniques, styling, responsiveness, and animations.

## Learning Objectives

This challenge reinforces the following skills:
- Implementing complex layouts with Flexbox
- Creating consistent and reusable styling
- Building responsive designs that work across device sizes
- Applying animations for enhanced user experience
- Implementing custom UI components
- Using platform-specific styling

## Challenge Requirements

### Scenario

You're building a mobile application for a pharmacy that allows users to view detailed information about medications. The detail screen needs to display comprehensive information about a medication, including dosage instructions, side effects, and refill options.

### Core Requirements

1. **Component Structure**:
   - Create a `MedicationDetailScreen` component
   - Create reusable sub-components for different sections
   - Implement a responsive header with medication name and key information
   - Include tabs or sections for different categories of information

2. **Styling and Layout**:
   - Apply consistent styling using StyleSheet
   - Implement a responsive layout using Flexbox
   - Create a visually appealing UI with appropriate spacing, typography, and color
   - Ensure the layout adapts to different screen sizes and orientations

3. **UI Components**:
   - Use appropriate React Native core components (View, Text, Image, etc.)
   - Implement at least one custom component (e.g., dosage indicator, progress bar)
   - Create interactive elements (buttons, tabs, etc.) with appropriate feedback

4. **Animation and Interaction**:
   - Implement at least one animation using Animated API
   - Add transition effects between tabs or sections
   - Create interactive elements with visual feedback

5. **Platform Adaptability**:
   - Implement platform-specific styling or components where appropriate
   - Ensure the UI is consistent with platform design guidelines

### Medication Data Model

Use the following data model for the medication details:

```ts
interface MedicationDetail {
  id: string;
  name: string;
  genericName: string;
  dosageForm: string; // e.g., "Tablet", "Capsule", "Liquid"
  strength: string; // e.g., "10mg", "50mg/25mg"
  directions: string;
  pharmacy: {
    name: string;
    address: string;
    phone: string;
  };
  prescriber: {
    name: string;
    phone: string;
  };
  prescription: {
    number: string;
    datePrescribed: string; // ISO date
    quantity: number;
    refillsRemaining: number;
    lastFilled: string; // ISO date
    expirationDate: string; // ISO date
  };
  warnings: string[];
  sideEffects: string[];
  interactions: {
    medications: string[];
    food: string[];
  };
  image: string; // URL to medication image
}
```

## Implementation Steps

1. **Design Phase**:
   - Sketch the UI layout for different screen sizes
   - Plan the component hierarchy
   - Decide on a color scheme and typography

2. **Setup Component Structure**:
   - Create the necessary component files
   - Implement the basic structure with placeholder content

3. **Implement Static UI**:
   - Build the UI components with proper styling
   - Apply consistent spacing, typography, and colors
   - Implement the responsive layout

4. **Add Interactivity**:
   - Implement tab navigation or accordion sections
   - Add buttons and interactive elements
   - Implement animations and transitions

5. **Refine and Optimize**:
   - Test on different screen sizes
   - Optimize performance
   - Refine animations and interactions

6. **Platform Adaptation**:
   - Add platform-specific styling
   - Test on both iOS and Android

## Bonus Challenges

If you complete the core requirements, try these additional challenges:

1. **Theming**:
   - Implement a light/dark mode toggle
   - Create a complete theming system with multiple color schemes

2. **Accessibility**:
   - Ensure the UI is fully accessible with appropriate labels
   - Implement screen reader support
   - Add support for dynamic font sizes

3. **Advanced Animations**:
   - Create complex animation sequences
   - Implement gesture-based interactions
   - Add subtle micro-interactions throughout the UI

4. **Medication Comparison**:
   - Add a split-screen view to compare two medications
   - Implement animated transitions between medications

## Deliverables

1. Component source code with proper organization and comments
2. A brief write-up explaining your design decisions and implementation approach
3. Screenshots or a video showing the UI on different screen sizes and platforms
4. Documentation of any custom components created

## Evaluation Criteria

Your solution will be evaluated on:
1. **Visual Design**: Is the UI visually appealing and aligned with modern mobile design standards?
2. **Code Quality**: Is the code well-organized, maintainable, and following best practices?
3. **Component Structure**: Is the component hierarchy logical and well-structured?
4. **Responsiveness**: Does the UI adapt well to different screen sizes and orientations?
5. **Performance**: Are there any obvious performance issues with the implementation?
6. **Animation Quality**: Are animations smooth and purposeful?

## Getting Started

1. Create a new React Native project or component
2. Set up the basic structure with placeholder content
3. Implement the UI incrementally, starting with layout
4. Add styling and refine the appearance
5. Implement interactivity and animations

## Hints

- Start with a simple design and enhance it incrementally
- Use the React Native Style Inspector to debug layout issues
- Test frequently on different screen sizes and orientations
- Consider creating a reusable style system or theme
- Pay attention to small details like spacing, alignment, and typography

Good luck with your challenge! This project will help solidify your understanding of React Native UI and styling concepts and prepare you for building more complex mobile interfaces. 