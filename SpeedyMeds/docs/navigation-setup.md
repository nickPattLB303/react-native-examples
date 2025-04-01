# Navigation Setup

This document details the setup of navigation using React Navigation for the SpeedyMeds project.

## Approach

We are implementing a common mobile navigation pattern combining:

1.  **Bottom Tab Navigator:** For the primary sections of the app (Home, Prescriptions, Orders, Account).
2.  **Native Stack Navigator:** As the root navigator. This allows screens (like Order Details) to be pushed _on top_ of the tab bar, providing a standard modal/detail view behavior.

## Implementation Details

1.  **Dependencies:** The following packages were installed using `npx expo install`:

    - `@react-navigation/native`
    - `@react-navigation/native-stack`
    - `@react-navigation/bottom-tabs`
    - `react-native-screens`
    - `react-native-safe-area-context`

2.  **Directory Structure:**

    - Navigation logic resides in `src/navigation/`.
    - Screen components reside in `src/screens/`.

3.  **Core Files:**

    - **`src/navigation/AppNavigator.tsx`**: Defines both the `RootStackParamList` and `BottomTabParamList` TypeScript types, creates the stack and tab navigators, defines a `MainTabNavigator` component containing the tab screens, and exports the main `AppNavigator` component which nests `MainTabNavigator` within the root `Stack.Navigator`. It also includes the `NavigationContainer`.
    - **`src/screens/*.tsx`**: Placeholder functional components were created for `HomeScreen`, `PrescriptionsScreen`, `OrdersScreen`, `AccountScreen`, and `OrderDetailScreen`.
    - **`App.tsx`**: Modified to render the `<AppNavigator />` component.

4.  **Type Safety:**
    - `RootStackParamList` defines the routes available in the root stack navigator, including the nested `MainTabs` navigator and any screens pushed above it (e.g., `OrderDetail`). It also defines expected parameters (`OrderDetail: { orderId: string }`).
    - `BottomTabParamList` defines the routes available within the bottom tab navigator.
    - These types are used with `createNativeStackNavigator<RootStackParamList>()` and `createBottomTabNavigator<BottomTabParamList>()`.
    - Screen components use `NativeStackScreenProps` (imported from `@react-navigation/native-stack`) along with the appropriate ParamList and screen name to type their `navigation` and `route` props (e.g., `NativeStackScreenProps<RootStackParamList, 'OrderDetail'>`).

## Usage

- The `AppNavigator` is rendered in `App.tsx`.
- The default view shows the `MainTabNavigator`.
- Navigation between stack screens outside the tabs (like navigating from `OrdersScreen` to `OrderDetailScreen`) is done using the `navigation.navigate('ScreenName', {params})` method available in screen component props.
