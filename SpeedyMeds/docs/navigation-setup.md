# Navigation Setup

This document details the setup of navigation using React Navigation for the SpeedyMeds project, including integration with the application theme.

## Approach

We are implementing a common mobile navigation pattern combining:

1.  **Bottom Tab Navigator:** For the primary sections (Home, Prescriptions, Orders, Account).
2.  **Native Stack Navigator:** As the root navigator, allowing screens (like Order Details) to be pushed on top of the tabs.
3.  **Theming:** The appearance of the navigators (headers, tab bar, background) is controlled by the application's theme.

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

3.  **Core Files & Theming Integration:**

    - **`src/theme/theme.ts`**: Defines `CombinedNavLightTheme` and `CombinedNavDarkTheme` by merging base React Navigation themes with our custom Paper themes using `adaptNavigationTheme`.
    - **`src/context/ThemeContext.tsx`**: Manages the overall application theme (light/dark/system) and provides the active theme object and an `isDark` boolean.
    - **`App.tsx`**: Wraps the entire application in our custom `ThemeProvider`. An inner `AppContent` component:
      - Gets the active theme and `isDark` flag from `useThemeContext`.
      - Selects the appropriate navigation theme (`CombinedNavLightTheme` or `CombinedNavDarkTheme`) based on `isDark`.
      - Renders the `AppNavigator`, passing the selected `navigationTheme` as a prop.
    - **`src/navigation/AppNavigator.tsx`**:
      - Defines `RootStackParamList` and `BottomTabParamList` types.
      - Creates stack and tab navigators.
      - The exported `AppNavigator` component now accepts the `navigationTheme` prop.
      - The `NavigationContainer` inside `AppNavigator` receives the `navigationTheme` prop, ensuring navigators match the app's light/dark mode.
    - **`src/screens/*.tsx`**: Placeholder screens (HomeScreen, PrescriptionsScreen, OrdersScreen, AccountScreen, OrderDetailScreen).

4.  **Type Safety:**
    - `RootStackParamList` defines routes/params for the root stack.
    - `BottomTabParamList` defines routes for the bottom tabs.
    - Used with `createNativeStackNavigator` and `createBottomTabNavigator`.
    - Screen components use `NativeStackScreenProps` for typed props.

## Usage

- The `AppNavigator` is rendered within the theme providers in `App.tsx`.
- The `NavigationContainer` and its navigators automatically adopt the light or dark theme based on the selection made via the `ThemeContext` (e.g., using the switcher in `HomeScreen`).
- Navigation between screens remains the same (`navigation.navigate('ScreenName', {params})`).
