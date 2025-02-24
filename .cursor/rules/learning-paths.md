# Learning Paths and Educational Approach

## Description
This rule defines the educational approach and learning paths for the React Native training course, ensuring content is accessible and effective for all participants regardless of their learning style or background.

## Rule
- All content must support three distinct learning paths:
  1. End-to-end instructor-led: For participants attending the full 4-week course
  2. End-to-end self-led: For participants working through the material independently
  3. Async - learn specific topics: For participants needing to learn specific topics on demand

- Course schedule structure:
  - 4 weeks total duration
  - 1-hour instructor-led sessions daily (5 days per week)
  - 4-6 additional hours of self-directed learning daily
  - Final week dedicated to capstone project

- Content difficulty progression:
  - HTML, CSS, JavaScript, React: Shorter, simpler exercises
  - React Native: More time-intensive, challenging exercises
  - Capstone: Complex, production-style application

- Each learning component must include:
  - Clear learning objectives
  - Prerequisite knowledge
  - Estimated time to complete
  - Path-specific instructions (instructor-led, self-led, async)

- Use callout boxes to guide different learner types:
  ```markdown
  > 🔍 **For Android Developers**: This concept is similar to [Android equivalent]
  
  > 🔍 **For iOS Developers**: This concept is similar to [iOS equivalent]
  
  > 🔍 **For Web Developers**: This concept is similar to [Web equivalent]
  ```

- All exercises, challenges, and projects must be designed to be completed standalone, with clear instructions and all necessary resources included.

## Examples
- Proper learning objective format:
  ```markdown
  ## Learning Objectives
  After completing this section, you will be able to:
  - Create functional components in React Native
  - Use props to pass data between components
  - Implement basic styling using StyleSheet
  
  **Prerequisite Knowledge**: Basic JavaScript, React fundamentals
  **Estimated Time**: 45 minutes
  
  > 🚀 **Self-Led Learners**: Complete the CodePen exercise at the end of this section before moving on.
  
  > 🔍 **Instructor-Led Note**: This section will be covered in the Day 3 morning session.
  ```

- Proper standalone exercise format:
  ```markdown
  # Exercise: Create a Medication Card Component
  
  ## Objective
  Create a reusable card component to display medication information.
  
  ## Prerequisites
  - Understanding of React Native components
  - Familiarity with StyleSheet
  
  ## Time Estimate
  20 minutes
  
  ## Instructions
  1. Open the starter code in Expo Snack: [link]
  2. Create a `MedicationCard` component that accepts the following props:
     - `name`: Medication name
     - `dosage`: Medication dosage
     - `instructions`: Usage instructions
  3. Style the component using StyleSheet
  4. Test your component with the provided sample data
  
  ## Success Criteria
  - Component correctly displays all medication information
  - Component is styled according to the design specifications
  - Component handles long text appropriately
  