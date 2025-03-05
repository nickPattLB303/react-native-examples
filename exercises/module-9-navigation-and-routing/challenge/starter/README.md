# PharmEasy Navigation Challenge - Starter Code

This is the starter code for the PharmEasy navigation challenge. Your task is to implement a navigation structure for a pharmacy application.

## Challenge Overview

You need to implement a tab-based navigation structure with the following components:

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

## Getting Started

1. Review the existing code structure:
   - `src/screens/`: Contains placeholder screens
   - `src/navigation/`: Contains placeholder navigation files
   - `src/data/`: Contains sample data for medications, orders, and user profile

2. Install the necessary dependencies:
   ```bash
   npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context
   ```

3. Implement the navigation structure:
   - Complete the `TabNavigator.tsx` file to set up the bottom tabs
   - Complete the `HomeStackNavigator.tsx` file to set up the stack navigation for the Home tab
   - Update the `App.tsx` file to use your navigation structure

4. Style the navigation components to match a pharmacy theme.

## Sample Data

Sample data is provided in the `src/data/` directory:
- `medications.ts`: Sample medication data
- `orders.ts`: Sample order data
- `user.ts`: Sample user profile data

Use this data to populate your screens.

## Requirements

1. Use React Navigation v6+ for all navigation components
2. Configure proper headers for all screens
3. Implement parameter passing from the Medication List to the Medication Detail screen
4. Style the navigation components (tabs, headers) to match a pharmacy theme
5. Add navigation icons for the tab navigator

## Submission

When you've completed the challenge, submit your solution as directed by your instructor.

Good luck! 