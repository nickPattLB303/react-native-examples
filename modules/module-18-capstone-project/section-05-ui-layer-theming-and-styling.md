## Section 05: UI Layer: Theming and Styling

Creating a visually appealing and consistent user interface is a key part of mobile app development. The SpeedyMeds project provides a robust theming system and utilizes both React Native Paper and Styled Components for styling, allowing for flexibility and adherence to Material Design principles.

### Theming System Overview

The SpeedyMeds application features a comprehensive theming system that supports light mode, dark mode, and system preference detection. This is orchestrated through a combination of React Context, React Native Paper, and Styled Components.

**1. Theme Context (`src/context/ThemeContext.tsx`):
**

- **Purpose:** A custom React Context (`ThemeContext`) is likely implemented to manage the current theme state (e.g., `'light'`, `'dark'`, or `'system'`) and provide a function to toggle the theme.
- **Provider:** A `CustomThemeProvider` wraps the application (likely in `App.tsx`), making the current theme and toggle function available to all components via a custom hook (e.g., `useThemeContext`).

**2. Theme Definitions (`src/theme/`):
**

- This directory houses the actual theme configurations:
  - **`colors.ts`**: Defines color palettes for both light and dark modes (e.g., primary, secondary, background, surface, text colors).
  - **`typography.ts`**: Defines font families, sizes, and weights.
  - **`spacing.ts`**: Defines consistent spacing units.
  - **`shape.ts`**: Defines border radii for components.
  - **`theme.ts` (or similar)**: Assembles these individual parts into complete theme objects for React Native Paper and Styled Components. It will also likely export combined themes specifically adapted for React Navigation (`CombinedNavLightTheme`, `CombinedNavDarkTheme`).

**3. Integration in `App.tsx`:**

- **`PaperProvider`**: The root of the application within `AppContent` (in `App.tsx`) is wrapped with `PaperProvider` from `react-native-paper`. The active theme object (light or dark) from `src/theme/` is passed to this provider, making it available to all React Native Paper components.
- **`StyledThemeProvider`**: Similarly, `StyledThemeProvider` from `styled-components/native` wraps the application, receiving the _same_ active theme object. This allows your custom styled components to access theme properties.
- **React Navigation Theme**: As seen in `AppNavigator.tsx` (Module 18, Section 04), a navigation-specific version of the theme is passed to the `NavigationContainer`.

This setup ensures that UI elements from React Native Paper, custom styled components, and navigation components all reflect the currently active theme (light or dark) consistently.

### Styling with React Native Paper

React Native Paper provides a rich set of Material Design 3 components that are already themed. You can use these components directly and they will adapt to the active light/dark theme.

- **Usage:** Import components like `Button`, `Card`, `TextInput`, `Text`, `Avatar`, `IconButton`, etc., directly from `react-native-paper`.
- **Customization:** While Paper components adhere to the theme, you can further customize them using their props or by applying additional styles via `StyleSheet` or Styled Components.

**Conceptual Example:**

```typescript
import React from "react";
import { View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

const MyPaperComponent = () => {
  const theme = useTheme(); // Access the full Paper theme object

  return (
    <Card style={{ margin: 8, backgroundColor: theme.colors.surfaceVariant }}>
      <Card.Title title="Patient Information" />
      <Card.Content>
        <Text variant="bodyMedium">Name: John Doe</Text>
        <Text style={{ color: theme.colors.primary, marginTop: 8 }}>
          Status: Active
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log("Edit pressed")}>Edit</Button>
        <Button
          mode="contained"
          onPress={() => console.log("View Details pressed")}
          // Button automatically uses theme's primary color for contained mode
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default MyPaperComponent;
```

In this example, `Card`, `Text`, and `Button` from React Native Paper automatically adapt to the theme. We also use `useTheme()` to access specific theme colors for further custom styling.

### Styling with Styled Components

Styled Components allow you to create custom components with encapsulated styles using tagged template literals. They integrate seamlessly with the theming system.

- **Creating Styled Components:** Define components using `styled(Component)` or `styled.View`, `styled.Text`, etc.
- **Accessing Theme Props:** Within the style definitions, you can access the theme object passed to the `StyledThemeProvider` via `props.theme`.

**Conceptual Example:**

```typescript
import React from "react";
import styled from "styled-components/native";
import { Text as PaperText } from "react-native-paper"; // Can style Paper components too

// Styled View that uses the theme's background color
const StyledContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.m}px; /* Accessing theme spacing */
  background-color: ${(props) => props.theme.colors.background};
`;

// Styled Text that uses the theme's primary color
const StyledPrimaryText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;

// You can also wrap and style existing components, including Paper components
const StyledPaperTextEmphasis = styled(PaperText)`
  color: ${(props) => props.theme.colors.tertiary};
  font-style: italic;
`;

const MyStyledComponent = () => {
  return (
    <StyledContainer>
      <StyledPrimaryText>Patient Dashboard</StyledPrimaryText>
      <StyledPaperTextEmphasis variant="labelLarge">
        Critical alerts will appear here.
      </StyledPaperTextEmphasis>
    </StyledContainer>
  );
};

export default MyStyledComponent;
```

This approach promotes reusable and theme-aware styled components throughout the application.

### Reusable UI Components (`src/components/`)

The SpeedyMeds starter project includes some generic reusable components in `src/components/` like:

- `ScreenContainer.tsx`: A common wrapper for screens, potentially handling padding or safe area views.
- `LoadingIndicator.tsx`: A centered activity indicator.
- `ErrorDisplay.tsx`: A component to show error messages.
- `ThemeSelector.tsx`: The component used on the Account screen to switch themes.

As you build out the SpeedyMeds features, you will create more domain-specific reusable components (e.g., `PrescriptionCard`, `OrderListItem`, `StatusBadge`). These should also be designed to be theme-aware, utilizing styles from React Native Paper or Styled Components that respond to the active theme.

> 📚 **Official Documentation:**
>
> - [React Native Paper - Theming](https://callstack.github.io/react-native-paper/docs/guides/theming)
> - [React Native Paper - Components](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator) (Browse specific components)
> - [Styled Components - React Native](https://styled-components.com/docs/basics#react-native)
> - [Styled Components - Theming](https://styled-components.com/docs/advanced#theming)
> - [React Context](https://react.dev/learn/passing-data-deeply-with-context)

> 🎨 **(Designers and Developers new to systematic theming):**
>
> **Comparison:** If you're used to applying styles ad-hoc or with basic CSS, this systematic theming approach might seem more involved initially. However, it's incredibly powerful for ensuring visual consistency, especially with features like light/dark mode.
>
> **Key Takeaway:** Instead of hardcoding colors or font sizes, strive to use theme variables (e.g., `theme.colors.primary`, `theme.fonts.bodyLarge`). This makes your UI automatically adapt when the theme changes and simplifies global style updates.
>
> **Source:** Examine the contents of the `src/theme/` directory in the SpeedyMeds project to see how color palettes, typography, and spacing are defined and assembled into theme objects.

By leveraging the theming capabilities of React Native Paper and Styled Components, along with the custom `ThemeContext`, you can build a visually consistent and adaptable UI for the SpeedyMeds application that looks great in both light and dark modes.
