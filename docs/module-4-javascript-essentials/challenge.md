# Module 4 Challenge: Medication Management System

## Objective
Build a focused medication management system using modern JavaScript that demonstrates your understanding of core JavaScript concepts and data manipulation.

**Prerequisite Knowledge**: Module 4 content
**Estimated Time**: 30-60 minutes

> 💡 **Tip**: Focus on applying ES6+ features and patterns that would be useful in a React Native application. Think about how these concepts will translate to component-based development later.

## Challenge Description

In this challenge, you'll create a JavaScript-based medication management system that allows users to:

1. Add, update, and remove medications from a patient's list
2. Filter and sort medications based on various criteria
3. Calculate basic dosing schedules

## Tasks

### 1. Data Structures and Management

Create the core data structures for your medication management system:

- Design objects to represent medications with properties like:
  - `id` (unique identifier)
  - `name` (medication name)
  - `dosage` (amount)
  - `frequency` (times per day)
  - `instructions` (special instructions)
  
- Implement functions to:
  - Add a new medication
  - Update an existing medication
  - Remove a medication
  - Find medications by name (partial match)

Use modern JavaScript methods like array methods, object destructuring, and other ES6+ features where appropriate.

### 2. Filtering and Sorting

Implement functions that allow users to:

- Filter medications by name, frequency, or dosage
- Sort medications by name, frequency, or next dose time
- Group medications by frequency (e.g., all daily medications together)

Use array methods such as `filter`, `sort`, `map`, and `reduce` effectively.

### 3. Dosing Schedule Calculation

Implement functions that calculate:

- Next dose times based on frequency and last dose
- Format dose times in a user-friendly way

Use JavaScript's Date object effectively and implement proper error handling.

## Submission

Submit your completed JavaScript files that implement the medication management system.

## Evaluation Criteria

Your challenge will be evaluated based on:

- **Code Quality**: Clean, readable code that follows modern JavaScript practices
- **JavaScript Features**: Appropriate use of ES6+ features, destructuring, and modern methods
- **Error Handling**: Proper handling of edge cases and potential errors
- **Problem Solving**: Effective solutions to the medication management problems
- **Maintainability**: Well-organized code that would be easy to extend or modify 