# PharmEasy Navigation Challenge - Complete Solution

This is the complete solution for the PharmEasy navigation challenge. It implements a tab-based navigation structure for a pharmacy application.

## Navigation Structure

The navigation structure is organized as follows:

1. **Tab Navigator** (`TabNavigator.tsx`)
   - Home Tab
   - Orders Tab
   - Profile Tab

2. **Home Stack Navigator** (`HomeStackNavigator.tsx`)
   - Medication List Screen (initial screen)
   - Medication Detail Screen (accessible by tapping a medication)

3. **Orders Screen** (`OrdersScreen.tsx`)
   - Simple screen displaying a list of orders

4. **Profile Screen** (`ProfileScreen.tsx`)
   - Simple screen displaying user profile information

## Implementation Details

### Tab Navigator
- Uses `createBottomTabNavigator` from `@react-navigation/bottom-tabs`
- Customized tab bar appearance with pharmacy-themed colors
- Added appropriate icons for each tab using FontAwesome

### Home Stack Navigator
- Uses `createNativeStackNavigator` from `@react-navigation/native-stack`
- Customized header appearance with pharmacy-themed colors
- Implemented parameter passing from the Medication List to the Medication Detail screen

### Screens
- **HomeScreen**: Displays a list of medications with details like name, price, and prescription requirements
- **MedicationDetailScreen**: Shows detailed information about a selected medication
- **OrdersScreen**: Displays a list of the user's medication orders with status indicators
- **ProfileScreen**: Shows the user's profile information and prescriptions

## Data

Sample data is provided in the `src/data/` directory:
- `medications.ts`: Sample medication data
- `orders.ts`: Sample order data
- `user.ts`: Sample user profile data

## Features

1. **Navigation**
   - Tab-based navigation for main app sections
   - Stack navigation for nested screens
   - Parameter passing between screens

2. **UI/UX**
   - Consistent pharmacy-themed styling
   - Custom headers and tab bar
   - Status indicators for orders and medications

3. **Functionality**
   - View medication details
   - View order history
   - View user profile and prescriptions

## Running the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

## Next Steps

In a real application, you might want to add:
- Authentication flow
- State management for medications and orders
- API integration for fetching real data
- Form handling for adding/editing medications and prescriptions 