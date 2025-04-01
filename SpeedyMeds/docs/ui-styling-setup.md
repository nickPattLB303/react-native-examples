# UI Library & Styling Setup

This document outlines the setup for the UI component library (`react-native-paper`) and the styling library (`styled-components`), including theme management and light/dark mode support.

## Approach

- **UI Components:** `react-native-paper` (v5, MD3) is used for pre-built Material Design components.
- **Theming:** `react-native-paper` provides a robust theming system. We define separate `lightTheme` and `darkTheme` objects based on Paper's `MD3LightTheme` and `MD3DarkTheme`, merged with our custom values.
- **Custom Styling:** `styled-components` is used for creating custom components and overriding/extending styles, leveraging the same theme object.
- **Theme Switching:** A React Context (`ThemeContext`) manages the active theme, allowing users to choose between 'light', 'dark', or 'system' preferences. It uses React Native's `useColorScheme` hook to detect the system setting.

## Implementation Details

1.  **Dependencies:** The following key packages were installed:

    - `react-native-paper` (via `npx expo install`)
    - `styled-components` (via `npx expo install`)
    - `@types/styled-components-react-native` (via `npm install --save-dev`)
    - `lodash.merge` (via `npm install --save-dev` for deep theme merging)
    - `@types/lodash.merge` (via `npm install --save-dev`)
    - _Note: `react-native-vector-icons` is NOT explicitly needed as `@expo/vector-icons` (included with Expo) provides compatibility._

2.  **Theme Definition (`src/theme/theme.ts`):**

    - Defines and exports `lightTheme` and `darkTheme` objects.
    - Each theme merges the corresponding Paper MD3 base theme (`MD3LightTheme`, `MD3DarkTheme`) with custom colors, spacing, fonts, etc., defined in `./colors.ts`, `./spacing.ts`, etc.
    - Uses `lodash.merge` for deep merging to combine base themes and custom overrides correctly.
    - Exports a combined type `AppTheme` representing the full theme structure (MD3 + custom properties).
    - Also exports themes adapted for React Navigation: `CombinedNavLightTheme`, `CombinedNavDarkTheme`.

3.  **Theme Context (`src/context/ThemeContext.tsx`):**

    - Creates `ThemeContext` and a `ThemeProvider` component.
    - Uses the `useColorScheme` hook from `react-native` to detect the system preference.
    - Manages the user's selected preference (`'light'`, `'dark'`, or `'system'`) using `useState` (defaulting to `'system'`). _Persistence via AsyncStorage is marked as a TODO._
    - Determines the `effectiveMode` ('light' or 'dark') based on user preference and system setting.
    - Provides the corresponding `theme` object (`lightTheme` or `darkTheme`), the current `themePreference`, the `setThemePreference` function, and an `isDark` boolean via the context.
    - Exports a `useThemeContext` hook for easy consumption.

4.  **Provider Setup (`App.tsx`):**

    - The application root in `App.tsx` is wrapped with our custom `CustomThemeProvider` from `src/context/ThemeContext.tsx`.
    - An inner component (`AppContent`) is used to access the theme context via `useThemeContext`.
    - `AppContent` then wraps the `AppNavigator` with:
      - `PaperProvider` from `react-native-paper`, passing the `theme` from the context.
      - `StyledThemeProvider` from `styled-components/native`, also passing the `theme` from the context.

    ```typescript
    // App.tsx (Simplified)
    import { Provider as PaperProvider } from 'react-native-paper';
    import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
    import AppNavigator from './src/navigation/AppNavigator';
    import { ThemeProvider as CustomThemeProvider, useThemeContext } from './src/context/ThemeContext';

    const AppContent = () => {
      const { theme, isDark } = useThemeContext();
      // Determine navigation theme based on isDark
      const navigationTheme = isDark ? CombinedNavDarkTheme : CombinedNavLightTheme;

      return (
        <PaperProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            {/* Pass navigationTheme to NavigationContainer inside AppNavigator */}
            <AppNavigator navigationTheme={navigationTheme} />
            <StatusBar style={isDark ? 'light' : 'dark'} />
          </StyledThemeProvider>
        </PaperProvider>
      );
    };

    export default function App() {
      return (
        <CustomThemeProvider>
          <AppContent />
        </CustomThemeProvider>
      );
    }
    ```

    _Note: `AppNavigator` needs modification to accept and pass `navigationTheme` to `NavigationContainer`._

5.  **TypeScript Integration (`src/styled.d.ts`):**

    - A declaration file (`src/styled.d.ts`) extends the `DefaultTheme` interface from `styled-components/native`.
    - It sets `DefaultTheme` to be equivalent to our `AppTheme` type (exported from `src/theme/theme.ts`).
    - This enables type checking and autocompletion for all theme properties (MD3 + custom) within styled components.

    ```typescript
    // src/styled.d.ts
    import "styled-components/native";
    import type { AppTheme } from "./theme/theme";

    declare module "styled-components/native" {
      export interface DefaultTheme extends AppTheme {}
    }
    ```

## Usage

- **Accessing Theme:** Use the `useThemeContext` hook in functional components to get the current `theme` object, `isDark` boolean, `themePreference`, and `setThemePreference` function.
- **Paper Components:** Import and use components directly from `react-native-paper`. They automatically use the theme from `PaperProvider`.
- **Styled Components:** Access theme properties via the `theme` prop: `${({ theme }) => theme.colors.primary}` or `${({ theme }) => theme.customSpacing.m}`.
- **Theme Switching:** Use the `setThemePreference` function (obtained from `useThemeContext`) to change the theme mode ('light', 'dark', 'system'). (Example using `SegmentedButtons` added to `HomeScreen.tsx`).
