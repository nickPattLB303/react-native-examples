# UI Library & Styling Setup

This document outlines the setup for the UI component library (`react-native-paper`) and the styling library (`styled-components`) used in the SpeedyMeds project.

## Approach

*   **UI Components:** `react-native-paper` is used as the primary source for pre-built, Material Design-compliant UI components (Buttons, TextInputs, Cards, etc.).
*   **Theming:** `react-native-paper` provides a robust theming system. We will define a central theme object that conforms to Paper\'s theme structure.
*   **Custom Styling:** `styled-components` is used for:
    *   Creating custom, reusable components with encapsulated styles.
    *   Overriding or extending the styles of `react-native-paper` components when necessary.
    *   Leveraging the same central theme object used by `react-native-paper` for consistency.

## Implementation Details

1.  **Dependencies:** The following packages were installed:
    *   `react-native-paper` (via `npx expo install`)
    *   `styled-components` (via `npx expo install`)
    *   `@types/styled-components-react-native` (via `npm install --save-dev` for TypeScript support)
    *   *Note: `react-native-vector-icons` is NOT explicitly needed as `@expo/vector-icons` (included with Expo) provides compatibility.*

2.  **Provider Setup (`App.tsx`):**
    *   The application root in `App.tsx` is wrapped with `PaperProvider` from `react-native-paper`.
    *   `ThemeProvider` from `styled-components/native` is nested *inside* `PaperProvider`.
    *   A theme object (to be defined in `src/theme/theme.ts`) is passed to *both* providers via their `theme` prop.
    ```typescript
    // App.tsx (Simplified)
    import { Provider as PaperProvider } from 'react-native-paper';
    import { ThemeProvider } from 'styled-components/native';
    import AppNavigator from './src/navigation/AppNavigator';
    import theme from './src/theme/theme'; // Assuming theme is defined here

    export default function App() {
      return (
        <PaperProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <AppNavigator />
            {/* ... StatusBar ... */}
          </ThemeProvider>
        </PaperProvider>
      );
    }
    ```

3.  **Theme Definition (`src/theme/theme.ts`):**
    *   A central theme file will define colors, fonts, spacing, etc., conforming to the `ReactNativePaper.Theme` type.
    *   This ensures that theme values are accessible consistently in both Paper components and styled-components.

4.  **TypeScript Integration:**
    *   `@types/styled-components-react-native` provides type definitions for `styled-components`.
    *   A declaration file (`src/theme/styled.d.ts` or similar) will be needed to extend the `DefaultTheme` interface from `styled-components/native` with our custom theme type. This enables type checking and autocompletion for theme properties within styled components.

## Usage

*   **Paper Components:** Import and use components directly from `react-native-paper` (e.g., `<Button>`, `<TextInput>`). They will automatically adopt the theme provided by `PaperProvider`.
*   **Styled Components:**
    *   Import `styled` from `styled-components/native`.
    *   Create styled versions of React Native core components (e.g., `styled.View`, `styled.Text`) or other components.
    *   Access theme properties within tagged template literals: \`color: \${({ theme }) => theme.colors.primary};\`
    *   Customize Paper components: \`const StyledButton = styled(Button)\\\`margin-bottom: \${({ theme }) => theme.spacing.medium}px;\\\`;\` 