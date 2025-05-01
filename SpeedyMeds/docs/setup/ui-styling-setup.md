# UI & Styling Setup (Paper, Styled Components, Theming)

This document explains how the User Interface (UI) components and styling are set up in the SpeedyMeds project. We use a combination of tools to create a consistent look and feel with support for light and dark modes.

## The Styling Toolkit

- **UI Components:** [React Native Paper](https://callstack.github.io/react-native-paper/) (v5, using Material Design 3) provides ready-made components like Buttons, Cards, Lists, Text inputs, etc. This saves us time and gives the app a consistent Material Design style.
- **Custom Styling:** [Styled Components](https://styled-components.com/docs/basics#react-native) lets us create our own custom, reusable components with specific styles attached. It uses familiar CSS-like syntax within template literals.
- **Theming:** We have a central theme system (`src/theme/`) that defines colors, spacing, fonts, and shapes. This theme is used by *both* React Native Paper and our Styled Components, ensuring everything matches.
- **Theme Switching:** A React Context (`ThemeContext` in `src/context/`) allows the theme to be switched between 'light', 'dark', or automatically follow the phone's system setting.

## How It's Set Up (Already Done!)

1.  **Dependencies:** `react-native-paper`, `styled-components`, and their necessary types (`@types/styled-components-react-native`) are installed.

2.  **Theme Definition (`src/theme/`):
    - Base values (colors, spacing, fonts, shapes) are defined in separate files.
    - `theme.ts` combines these base values and the default themes from React Native Paper (`MD3LightTheme`, `MD3DarkTheme`) to create our complete `lightTheme` and `darkTheme` objects.
    - It also exports an `AppTheme` type that describes the full shape of our theme object.

3.  **Theme Context (`src/context/ThemeContext.tsx`):
    - Creates the `ThemeContext`.
    - The `ThemeProvider` component manages the current preference ('light', 'dark', 'system') and determines the active theme object (`lightTheme` or `darkTheme`).
    - It provides the active `theme` object and a `setThemePreference` function to components via the `useThemeContext` hook.

4.  **Provider Setup (`App.tsx`):
    - The root of the app is wrapped in our `CustomThemeProvider`.
    - Inside that, `AppContent` wraps the main navigator with:
      - `<PaperProvider theme={theme}>`: Makes the theme available to all React Native Paper components.
      - `<StyledThemeProvider theme={theme}>`: Makes the *same* theme available to all our custom Styled Components.
    - This ensures both types of components use the same styles!

    ```typescript
    // App.tsx (Simplified Provider Setup)
    import { Provider as PaperProvider } from 'react-native-paper';
    import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
    import { ThemeProvider as CustomThemeProvider, useThemeContext } from './src/context/ThemeContext';
    // ... other imports

    const AppContent = () => {
      const { theme } = useThemeContext();
      return (
        <PaperProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            {/* ... AppNavigator and StatusBar ... */}
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

5.  **Styled Components TypeScript (`src/styled.d.ts`):**
    - This special file tells TypeScript about the shape of our custom `AppTheme` so we get autocompletion and type checking when using the `theme` prop in styled components.

## How to Use Styling

- **Accessing Theme:** In components, use the `useThemeContext` hook from `src/context/ThemeContext.tsx` to get the theme preference or the `setThemePreference` function. To get the theme object itself for styling, use the `useTheme` hook from `react-native-paper` (it gets the theme provided by `<PaperProvider>`):
  ```typescript
  import { useTheme } from 'react-native-paper';
  import type { AppTheme } from '../theme/theme'; // Import AppTheme type

  const MyComponent = () => {
    const theme = useTheme<AppTheme>(); // Get the full theme object
    // Now you can use theme.colors.primary, theme.customSpacing.m, etc.
  }
  ```
- **Paper Components:** Import components like `Button`, `Card`, `Text` directly from `react-native-paper`. They will automatically adopt the current theme's styles.
  ```typescript
  import { Button, Text } from 'react-native-paper';

  <Button mode="contained">Themed Button</Button>; // Uses theme.colors.primary etc.
  <Text variant="bodyLarge">Themed Text</Text>; // Uses theme fonts/colors
  ```
- **Styled Components:** Create custom components or style existing ones. Access theme properties using the `theme` prop inside the template literal.
  ```typescript
  import styled from 'styled-components/native';
  import { View } from 'react-native';
  import type { AppTheme } from '../theme/theme';

  const PaddedView = styled(View)`
    padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.l}px; /* Use theme spacing */
    background-color: ${({ theme }: { theme: AppTheme }) => theme.colors.surfaceVariant};
  `;

  <PaddedView>...</PaddedView>;
  ```
- **Theme Switching:** The `ThemeSelector` component in `src/components/` (shown on the Account placeholder screen) demonstrates how to use `useThemeContext` to change the theme.
