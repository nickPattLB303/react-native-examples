# Module 6 Challenge: Medication Tracker Component

## Overview

In this challenge, you'll apply the React concepts you've learned by building a medication tracking component using functional components and hooks. This challenge will test your understanding of components, props, state, effects, and composition.

## Learning Objectives

This challenge reinforces the following skills:
- Creating and composing functional components
- Managing component state with hooks
- Implementing side effects with useEffect
- Passing data between components with props
- Applying performance optimizations

## Challenge Requirements

### Scenario

You're building a medication tracking application for a pharmacy. The app needs to allow users to:
1. View a list of medications
2. Add new medications
3. Mark medications as taken
4. Filter medications by status 

### Core Requirements

1. **Component Structure**:
   - Create a `MedicationTracker` parent component
   - Create child components: `MedicationList`, `MedicationItem`, `AddMedicationForm`, and `FilterControls`
   - Use proper component composition and props passing

2. **State Management**:
   - Use `useState` to track the list of medications
   - Implement state for form inputs in the `AddMedicationForm`
   - Use state for filtering in the `FilterControls`
   - Implement "lifting state up" where appropriate

3. **Side Effects**:
   - Use `useEffect` to persist medications to localStorage (or AsyncStorage in React Native)
   - Implement a cleanup function for any subscriptions or timers
   - Add an effect that displays a notification when medications are due (simulated)

4. **Component Interaction**:
   - Pass callbacks from parent to child components
   - Implement proper prop validation
   - Use the children prop for flexible composition

5. **Optimization**:
   - Use `useMemo` for expensive calculations (like filtering)
   - Implement `useCallback` for event handlers passed to child components
   - Create at least one custom hook (e.g., `useMedicationManager`)

### Medication Data Model

Each medication should have the following properties:
```ts
interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: 'morning' | 'afternoon' | 'evening' | 'bedtime';
  lastTaken: string | null; // ISO date string
  isActive: boolean;
}
```

## Implementation Steps

1. **Setup Component Structure**:
   - Create the component files with appropriate props and TypeScript interfaces
   - Establish the component hierarchy

2. **Implement Basic UI**:
   - Create a simple UI for each component
   - Use minimal styling to make the interface usable

3. **Add State Management**:
   - Implement state for the medication list
   - Add state for form inputs and filters

4. **Implement CRUD Operations**:
   - Add functionality to create, read, update, and delete medications

5. **Add Side Effects**:
   - Implement persistence with useEffect
   - Add the notification simulation

6. **Optimize Performance**:
   - Apply useMemo and useCallback where appropriate
   - Extract reusable logic into custom hooks

7. **Test and Refine**:
   - Test all functionality
   - Refine the component structure and logic as needed

## Bonus Challenges

If you complete the core requirements, try these additional challenges:

1. **Context API**:
   - Refactor to use React Context for medication state
   - Create a custom provider and hook for the medication context

2. **Advanced Filtering**:
   - Add the ability to filter by multiple criteria
   - Implement sorting options

3. **Medication Scheduling**:
   - Add a calendar view for medication schedules
   - Implement recurring medication schedules

4. **Notifications**:
   - Add a notification system with useReducer
   - Implement snackbar/toast notifications for actions

## Deliverables

1. Component source code with proper organization
2. A brief write-up explaining your component structure and key decisions
3. A simple demo showing the components in action

## Evaluation Criteria

Your solution will be evaluated on:
1. **Functionality**: Does it meet all the requirements?
2. **Code Quality**: Is the code well-organized, maintainable, and following best practices?
3. **Component Design**: Is the component hierarchy logical and well-structured?
4. **State Management**: Is state managed efficiently and appropriately?
5. **Error Handling**: Does the application handle potential errors gracefully?
6. **Performance Considerations**: Are appropriate optimizations applied?

## Getting Started

1. Create a new React or React Native project
2. Set up the component files
3. Implement the basic structure
4. Build out functionality incrementally

## Hints

- Start with a simple version and add complexity incrementally
- Use console.logs to debug state and effects
- Consider drawing out your component hierarchy before coding
- Test each feature before moving on to the next

Good luck with your challenge! This project will help solidify your understanding of React's core concepts and prepare you for building more complex React Native applications. 