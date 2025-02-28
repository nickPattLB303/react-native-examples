# Module 4 Challenge: Medication Management System

## Objective
Build a medication management system using modern JavaScript that demonstrates your understanding of core JavaScript concepts, data manipulation, and asynchronous programming.

**Prerequisite Knowledge**: Module 4 content
**Estimated Time**: 90-120 minutes

> 💡 **Tip**: Focus on applying ES6+ features and asynchronous patterns that would be useful in a React Native application. Think about how these concepts will translate to component-based development later.

## Challenge Description

In this challenge, you'll create a JavaScript-based medication management system that allows users to:

1. Add, update, and remove medications from a patient's list
2. Filter and sort medications based on various criteria
3. Calculate dosing schedules based on medication frequency
4. Simulate API calls to a medication database
5. Handle errors gracefully

## Tasks

### 1. Data Structures and Management

Create the core data structures for your medication management system:

- Design objects to represent medications with properties like:
  - `id` (unique identifier)
  - `name` (medication name)
  - `dosage` (amount)
  - `frequency` (times per day)
  - `instructions` (special instructions)
  - `startDate` (when to begin taking)
  - `endDate` (optional, when to stop taking)
  
- Implement functions to:
  - Add a new medication
  - Update an existing medication
  - Remove a medication
  - Find medications by name (partial match)

Use modern JavaScript methods like array methods, object destructuring, and other ES6+ features where appropriate.

**CodePen Link**: [Medication Data Management](https://codepen.io/your-username/pen/create)

### 2. Medication Scheduling

Implement functions that calculate:

- Next dose times based on frequency and last dose
- Total doses remaining based on schedule
- Warning if medications might interact (based on a predefined list of interactions)

Use JavaScript's Date object effectively and implement proper error handling.

**CodePen Link**: [Medication Scheduling](https://codepen.io/your-username/pen/create)

### 3. Asynchronous Operations

Create a simulation of asynchronous operations:

- Implement a mock medication database using arrays/objects
- Create Promise-based functions that simulate fetching medication details
- Implement async/await to handle multiple sequential operations
- Add proper error handling for network operations
- Implement a debounced search function for medication lookup

**CodePen Link**: [Asynchronous Medication Operations](https://codepen.io/your-username/pen/create)

### 4. Complete System Integration

Combine all components into a complete medication management system:

- Integrate data management, scheduling, and asynchronous operations
- Implement a simple console-based interface for testing
- Ensure proper error handling throughout the system
- Add comments explaining your application of key JavaScript concepts

**CodePen Link**: [Complete Medication Management System](https://codepen.io/your-username/pen/create)

## Submission

Submit links to your completed CodePen implementations for each part of the challenge.

## Evaluation Criteria

Your challenge will be evaluated based on:

- **Code Quality**: Clean, readable code that follows modern JavaScript practices
- **JavaScript Features**: Appropriate use of ES6+ features, destructuring, and modern methods
- **Asynchronous Implementation**: Proper use of Promises and async/await
- **Error Handling**: Robust error handling throughout the application
- **Problem Solving**: Effective solutions to the medication management problems
- **Maintainability**: Well-organized code that would be easy to extend or modify 