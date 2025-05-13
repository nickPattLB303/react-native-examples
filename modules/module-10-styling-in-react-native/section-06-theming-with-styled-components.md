## Section 6: Theming with Styled Components

One of the significant advantages of using `styled-components` is its built-in support for theming. Theming allows you to define a consistent set of design tokens (colors, fonts, spacing, etc.) that can be accessed by any styled component within your application. This makes it easier to manage your app's look and feel, enforce brand consistency, and even implement features like dark mode for your SpeedyMeds app.

### What is Theming?

Theming involves creating a central theme object containing design values. This theme object is then made available to all styled components wrapped in a `ThemeProvider` component. Styled components can then access these theme values via their props.

**Benefits of Theming:**

- **Consistency:** Ensures all components use the same design tokens, leading to a unified look and feel.
- **Maintainability:** Update a design value (e.g., primary color) in one place (the theme object), and the change propagates throughout the app.
- **Flexibility:** Easily switch between different themes (e.g., light mode, dark mode, high contrast mode) by changing the theme object provided to the `ThemeProvider`.
- **Reusability:** Components become more reusable as their specific colors or font sizes aren't hardcoded but derived from the theme.

### Setting up Theming

Setting up theming with `styled-components` involves three main steps:

1.  **Define your Theme Object(s):** Create a JavaScript object that holds your design tokens.
2.  **Wrap your App with `ThemeProvider`:** Use the `ThemeProvider` component from `styled-components` to provide the theme to your component tree.
3.  **Access Theme Values in Styled Components:** Use the `props.theme` object within your styled component definitions.

**1. Define Your Theme Object**

Let's define a simple theme for our SpeedyMeds application.

```typescript
// themes/speedyMedsTheme.ts

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string; // For card backgrounds, etc.
    text: string;
    textSecondary: string;
    error: string;
    success: string;
  };
  fonts: {
    main: string;
    sizes: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    weights: {
      normal: string;
      bold: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: string;
}

export const lightTheme: AppTheme = {
  colors: {
    primary: "#007bff", // SpeedyMeds Blue
    secondary: "#6c757d", // Grey
    background: "#f8f9fa", // Light grey background
    surface: "#ffffff", // White for cards
    text: "#212529", // Dark grey text
    textSecondary: "#6c757d", // Lighter grey text
    error: "#dc3545", // Red for errors
    success: "#28a745", // Green for success
  },
  fonts: {
    main: "System", // Default system font
    sizes: {
      small: "12px",
      medium: "16px",
      large: "20px",
      xlarge: "24px",
    },
    weights: {
      normal: "400",
      bold: "700",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: "8px",
};

// Optionally, define a dark theme
export const darkTheme: AppTheme = {
  ...lightTheme, // Spread light theme to reuse fonts, spacing, etc.
  colors: {
    ...lightTheme.colors,
    primary: "#58a6ff", // Lighter blue for dark mode
    background: "#121212", // Very dark grey background
    surface: "#1e1e1e", // Darker grey for cards
    text: "#e0e0e0", // Light grey text
    textSecondary: "#a0a0a0", // Medium grey text
  },
};

// It's good practice to export the type for use in styled components
declare module "styled-components/native" {
  export interface DefaultTheme extends AppTheme {}
}
```

**Explanation of `speedyMedsTheme.ts`:**

- We define an `AppTheme` interface for type safety with TypeScript.
- `lightTheme` object contains various design tokens like colors, font sizes, font weights, spacing units, and border radius.
- A `darkTheme` is also defined, reusing some values from `lightTheme` but overriding colors for a dark appearance.
- The `declare module 'styled-components/native'` part is crucial for TypeScript. It merges our `AppTheme` interface with `styled-components`' `DefaultTheme`, so when we access `props.theme`, TypeScript knows its shape.

**2. Wrap your App with `ThemeProvider`**

In your main application file (e.g., `App.tsx` or your root navigator), import `ThemeProvider` and your chosen theme, then wrap your root component.

```tsx
// App.tsx (or your root component file)
import React, { useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { lightTheme, darkTheme } from "./themes/speedyMedsTheme";
import MainNavigator from "./navigation/MainNavigator"; // Assuming you have a navigator
import { Button } from "react-native"; // For a simple toggle example

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      {/* Example toggle button - in a real app, this would be part of settings */}
      {/* <Button title="Toggle Theme" onPress={() => setIsDarkMode(prev => !prev)} /> */}
      <MainNavigator />
    </ThemeProvider>
  );
}
```

**3. Access Theme Values in Styled Components**

Now, your styled components can access the theme object via `props.theme`.

```tsx
import styled from "styled-components/native";

const ThemedContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.md};
`;

const ThemedText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fonts.sizes.medium};
  font-family: ${(props) => props.theme.fonts.main};
`;

const PrimaryStyledButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.sm} ${(props) =>
      props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius};
  align-items: center;
`;

const PrimaryButtonText = styled.Text`
  color: ${(props) =>
    props.theme.colors.surface}; /* Assuming primary button text is light */
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  font-size: ${(props) => props.theme.fonts.sizes.medium};
`;

// Example SpeedyMeds Themed Component
// const PatientDashboardScreen = () => (
//   <ThemedContainer>
//     <ThemedText style={{ fontSize: props.theme.fonts.sizes.xlarge, fontWeight: props.theme.fonts.weights.bold }}>
//       Patient Dashboard
//     </ThemedText>
//     <PrimaryStyledButton onPress={() => alert('Viewing medications...')}>
//       <PrimaryButtonText>View Medications</PrimaryButtonText>
//     </PrimaryStyledButton>
//     {/* ... other themed components for SpeedyMeds ... */}
//   </ThemedContainer>
// );
```

**Explanation:**

- `ThemedContainer`, `ThemedText`, `PrimaryStyledButton`, and `PrimaryButtonText` all use arrow functions within the template literal to access properties from `props.theme`.
- For example, `background-color: ${(props) => props.theme.colors.background};` sets the background color of the `ThemedContainer` to the `background` color defined in the currently active theme.
- If you toggle the theme in `App.tsx` (e.g., by changing `isDarkMode`), all components using `props.theme` will automatically re-render with the new theme values.

### Best Practices for Theming

- **Comprehensive Theme Object:** Define as many common design values (colors, typography, spacing, border radii, shadows) as possible in your theme to maximize consistency.
- **Semantic Naming:** Use semantic names for theme properties (e.g., `colors.primary`, `colors.text`, `spacing.md`) rather than presentational names (e.g., `blue`, `black`, `mediumSpace`). This makes it easier to change the theme without breaking the meaning.
- **TypeScript for Safety:** Using TypeScript with `styled-components` (as shown with `declare module`) provides type checking for your theme object, preventing typos and ensuring you access valid theme properties.
- **Keep Themes Organized:** For larger applications with multiple themes, keep theme files in a dedicated `themes` directory.
- **Consider Theme Switching Carefully:** While powerful, implementing seamless theme switching (e.g., dark mode) requires careful planning of your color palette and component styles to ensure readability and accessibility in all themes.

> [!TIP]
> You can create helper functions or utilities to access nested theme properties more easily if your theme object becomes very complex. However, for most cases, direct access like `props.theme.colors.primary` is clear and effective.

Theming with `styled-components` provides a robust and flexible way to manage the visual identity of your SpeedyMeds application. It promotes consistency, simplifies maintenance, and enables powerful features like dynamic theme switching.

Next, we'll shift our focus to UI component libraries, specifically React Native Paper, and see how it can accelerate UI development.

📚 **Official Documentation:**

- [Styled Components: Theming](https://styled-components.com/docs/advanced#theming)
- [Styled Components: TypeScript Support (including DefaultTheme)](https://styled-components.com/docs/api#typescript)
