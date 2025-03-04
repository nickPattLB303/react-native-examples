# Module 9 Challenge: Implementing Basic Navigation for a Pharmacy App

## Challenge Overview
In this challenge, you will implement a streamlined navigation system for a pharmacy application called "PharmEasy." You'll set up a basic tab-based navigation structure with key screens that a user would need to browse and order medications.

**Estimated Time**: 30-60 minutes
**Prerequisite Knowledge**: All sections of Module 9

## Learning Objectives
This challenge will test your ability to:
- Set up a basic tab navigation structure using React Navigation
- Implement a stack navigator for nested screens
- Configure headers and navigation options
- Pass parameters between screens

## Challenge Description

### Context
PharmEasy is a digital pharmacy application that allows users to browse medications, view details, and place orders. You've been tasked with creating a navigation structure that provides a smooth and intuitive experience for users.

### Requirements

Create a navigation system with the following structure:

1. **Tab Navigator** with three main tabs:
   - Home
   - Orders
   - Profile

2. **Home Tab**:
   - Implement a stack navigator with:
     - Medication List Screen (initial screen)
     - Medication Detail Screen (accessible by tapping a medication)

3. **Orders Tab**:
   - Simple Orders List Screen

4. **Profile Tab**:
   - Simple Profile Screen

### Technical Requirements

1. Use React Navigation v6+ for all navigation components
2. Configure proper headers for all screens
3. Implement parameter passing from the Medication List to the Medication Detail screen
4. Style the navigation components (tabs, headers) to match a pharmacy theme
5. Add navigation icons for the tab navigator

## Getting Started

1. Set up a new React Native project with React Navigation
2. Install the necessary dependencies:
   - @react-navigation/native
   - @react-navigation/bottom-tabs
   - @react-navigation/native-stack
3. Create placeholder screens for all required screens
4. Implement the navigation structure
5. Add sample data for medications to test navigation

## Hints and Tips

- Focus on the navigation structure rather than complex screen implementations
- Use simple placeholder content for the screens to keep focused on navigation
- Test your navigation flow to ensure it works as expected
- Consider how users might navigate through your app and optimize for common paths

## Evaluation Criteria

Your submission will be evaluated on:

1. **Navigation Structure**: Is the navigation structure intuitive and user-friendly?
2. **Technical Implementation**: Are you using React Navigation correctly?
3. **Parameter Passing**: Is data correctly passed between screens?
4. **Styling**: Are the navigation elements visually appealing and consistent?
5. **Code Quality**: Is your navigation code well-organized and maintainable?

## Submission Guidelines

Submit your solution as:
1. Navigation configuration code files
2. Screen component files (placeholder content is acceptable)
3. A brief explanation of your navigation structure
4. A recording or screenshots demonstrating the navigation flow
