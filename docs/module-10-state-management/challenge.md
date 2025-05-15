# Module 10 Challenge: Medication Tracker State Management

## Challenge Overview
In this challenge, you will implement a focused state management solution for a medication tracking application called "MedTracker". Instead of building a comprehensive system, you'll focus on creating a well-structured state management solution for key medication tracking features.

**Estimated Time**: 30-60 minutes
**Prerequisite Knowledge**: All sections of Module 10

## Learning Objectives
This challenge will test your ability to:
- Implement state management using a single library/approach (React Context or Zustand)
- Create a well-structured state architecture
- Handle asynchronous operations for data fetching
- Manage UI state effectively

## Challenge Description

### Context
MedTracker is an application that helps users track their medications. Your task is to implement the state management for the core medication tracking features.

### Requirements

Implement state management for the following features:

1. **Medication Management**:
   - Store a list of user medications
   - Implement add, edit, and delete medication functionality
   - Store medication details (name, dosage, schedule, etc.)

2. **Medication Schedule**:
   - Track when medications need to be taken
   - Mark medications as taken or missed

### Technical Requirements

Choose **ONE** of the following state management approaches:

**Option A: React Context with useReducer**
1. Create a MedicationContext and appropriate reducers
2. Implement actions for all required operations
3. Create custom hooks for accessing medication state

**Option B: Zustand**
1. Create a medication store with Zustand
2. Implement actions for all required operations
3. Organize the store logically for the required features

## Getting Started

1. Set up a new React Native project
2. Choose your state management approach
3. Create the basic application screens:
   - Medication List
   - Add/Edit Medication
   - Medication Detail
4. Implement the state management solution

## Hints and Tips

- Focus on creating a clean, well-organized state architecture
- Use TypeScript to define your state types
- Test your state management solution with different scenarios
- Keep your solution focused on the core requirements

## Evaluation Criteria

Your submission will be evaluated on:

1. **Architecture**: Is your state management solution well-structured?
2. **Functionality**: Does it handle all the required operations correctly?
3. **Code Quality**: Is your code clean, maintainable, and well-organized?
4. **TypeScript Usage**: Are you using TypeScript effectively for type safety?
5. **Performance**: Have you considered performance implications?

## Submission Guidelines

Submit your solution as:
1. State management implementation files
2. Basic UI components that demonstrate the state management in action
3. A brief explanation of your state management approach
4. Examples of how to use your state management solution
