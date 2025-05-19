## Section 9: Theming with React Native Paper (v5)

React Native Paper comes with a powerful theming system that allows you to customize the appearance of its components to match your application's brand identity. This is crucial for ensuring that the SpeedyMeds app has a unique and consistent look and feel, even when using pre-built components. This section explores how to define and apply custom themes with React Native Paper.

### Understanding React Native Paper Theming

React Native Paper's theming is built on top of Material Design principles. You can override various aspects of the default theme, including colors, fonts, roundness, and animation scales.

The theme is an object that contains these design tokens. When you provide a theme via the `PaperProvider`, all descendant Paper components will automatically use these values.

**Key Theming Concepts:**

- **`PaperProvider`:** As seen previously, this component from `react-native-paper` wraps your application (or a part of it) and injects the theme into the context.
- **Theme Object:** A JavaScript object defining various style attributes. You can either use the default theme, extend it, or create a completely custom one.
- **`MD3Theme` (Material Design 3):** React Native Paper v5 aligns with Material Design 3 (MD3). The theme object structure reflects MD3 color roles (e.g., `primary`, `secondary`, `tertiary`, `surface`, `background`, `error`, and their `on-` counterparts like `onPrimary`, `onSurface`).
- **`useTheme` Hook:** Paper provides a `useTheme` hook that allows your custom components to access the current theme object, enabling you to apply theme values in your own styles.

### Defining a Custom Theme

Let's create a custom theme for SpeedyMeds. We can start by extending the default theme and overriding specific properties.

```typescript
// themes/speedyMedsPaperTheme.ts
import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";
import type { MD3Theme } from "react-native-paper"; // Import the type

// Define custom font configurations if needed (optional)
const fontConfig = {
  // Configure fonts for different platforms or use default
  // Example for customizing default fonts (not strictly necessary for basic theming)
  // See React Native Paper documentation for font configuration details
  // default: {
  //   regular: {
  //     fontFamily: 'YourApp-Regular', // Example: if you have custom fonts loaded
  //     fontWeight: 'normal' as const,
  //   },
  //   medium: {
  //     fontFamily: 'YourApp-Medium',
  //     fontWeight: 'normal' as const,
  //   },
  //   // ... other weights and styles
  // },
};

export const speedyMedsPaperTheme: MD3Theme = {
  ...DefaultTheme, // Start with the default light theme
  roundness: 2, // Slightly less rounded corners than default MD3 (default is 4 or higher for some elements)
  colors: {
    ...DefaultTheme.colors, // Inherit default colors
    primary: "#1A73E8", // SpeedyMeds Primary Blue (example)
    onPrimary: "#FFFFFF", // Text/icon color on primary background
    secondary: "#5E6C84", // SpeedyMeds Secondary Grey (example)
    onSecondary: "#FFFFFF",
    background: "#F4F6F8", // Custom app background color
    surface: "#FFFFFF", // Card and sheet backgrounds
    onSurface: "#172B4D", // Text/icon color on surface
    surfaceVariant: "#EAEBF0", // Slightly different surface color (e.g., for dividers or outlined inputs)
    onSurfaceVariant: "#42526E",
    error: "#DE350B", // Custom error color
    onError: "#FFFFFF",
    // You can define more colors like tertiary, custom colors, etc.
    // elevation: { // MD3 elevation uses color overlays, not just shadow opacity
    //   ...DefaultTheme.colors.elevation,
    //   level2: '#E0F0FF', // Example for a subtle blueish elevation overlay
    // }
  },
  // fonts: configureFonts({config: fontConfig, isV3: true}), // Uncomment and configure if using custom fonts
};
```

**Explanation of `speedyMedsPaperTheme.ts`:**

- We import `MD3LightTheme` as a base.
- The `speedyMedsPaperTheme` object spreads `DefaultTheme` to inherit its properties and then overrides specific ones.
- `roundness` is adjusted for component corners.
- `colors` object is spread from `DefaultTheme.colors`, and then specific color roles like `primary`, `onPrimary`, `background`, `surface`, etc., are customized for SpeedyMeds. MD3 themes have a more extensive set of color roles than MD2.
- The `fonts` property can be customized using `configureFonts`. This is more involved and typically needed if you are integrating custom fonts throughout the Paper components. For basic color theming, you might not need to touch this.

### Applying the Custom Theme

Provide your custom theme to the `PaperProvider` in your app's root component.

```tsx
// App.tsx
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { speedyMedsPaperTheme } from "./themes/speedyMedsPaperTheme"; // Your custom theme
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <PaperProvider theme={speedyMedsPaperTheme}>
      <MainNavigator />
    </PaperProvider>
  );
}
```

With this setup, all React Native Paper components used within `MainNavigator` (e.g., `Button`, `Card`, `TextInput`, `Appbar`) will now automatically adopt the styles defined in `speedyMedsPaperTheme`.

### Using Theme Values in Custom Components

If you are building your own components alongside Paper components and want them to respect the Paper theme, you can use the `useTheme` hook.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, MD3Theme } from "react-native-paper"; // Import MD3Theme for type safety

// Example custom component for SpeedyMeds that uses the Paper theme
/**
 * Props for the ThemedInfoBox component.
 * @param message - The informational message to display inside the box.
 */
interface ThemedInfoBoxProps {
  message: string;
}

/**
 * A custom component that displays an informational message box, styled using
 * the current React Native Paper theme obtained via the `useTheme` hook.
 * It demonstrates accessing theme colors and roundness for custom styling within the SpeedyMeds app.
 * @param {ThemedInfoBoxProps} props - The props for the component.
 * @returns {React.ReactElement} The ThemedInfoBox component.
 */
const ThemedInfoBox: React.FC<ThemedInfoBoxProps> = ({ message }) => {
  const theme = useTheme<MD3Theme>(); // Access the theme object, specify type for safety

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceVariant, // Use theme color
      padding: 16,
      borderRadius: theme.roundness * 2, // Use theme roundness
      marginVertical: 8,
    },
    text: {
      color: theme.colors.onSurfaceVariant, // Use theme color
      fontSize: 14,
      // fontFamily: theme.fonts.regular.fontFamily, // If fonts are configured
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

// How you might use it within a screen that's under PaperProvider
// const PatientAlertsScreen = () => (
//   <View style={{flex: 1, padding: 10}}>
//     <ThemedInfoBox message="Patient has an allergy to Penicillin." />
//   </View>
// );

export default ThemedInfoBox;
```

**Explanation:**

- `useTheme<MD3Theme>()` hook retrieves the current theme object provided by `PaperProvider`. Specifying `MD3Theme` gives you type autocompletion for theme properties.
- The `ThemedInfoBox` styles its `container` and `text` using values from `theme.colors` and `theme.roundness`.
- This ensures your custom components can also be consistent with the overall application theme set by React Native Paper.

### Overriding Theme for a Section of the App

If you need a specific part of your app to have a different theme (e.g., a single screen with a dark theme within a predominantly light-themed app), you can nest `PaperProvider` components.

```tsx
// ... imports
// import { darkPaperTheme } from './themes/speedyMedsPaperTheme'; // Assume you have a dark variant

// const MainApp = () => (
//   <PaperProvider theme={speedyMedsPaperTheme}>
//     {/* ... most of your app ... */}
//     {/* <SpecialScreenWithDarkTheme /> */}
//   </PaperProvider>
// );

// const SpecialScreenWithDarkTheme = () => (
//   <PaperProvider theme={darkPaperTheme}>
//     {/* This screen and its children will use darkPaperTheme */}
//   </PaperProvider>
// );
```

### Tips for Effective Theming

- **Start with Defaults:** Begin by spreading the default theme and override only what you need. This ensures you don't miss any essential theme properties.
- **Material Design Color Tool:** Use tools like the official Material Design Color Tool to help you choose accessible and harmonious color palettes for your MD3 theme roles.
- **Test on Devices:** Always test your theme on actual devices (iOS and Android) to see how colors and fonts render in practice.
- **Consider Dark Mode:** If implementing dark mode, ensure your color choices provide sufficient contrast and readability. MD3 has specific guidance on dark themes.

React Native Paper's theming system is a powerful way to create a polished and branded user experience for SpeedyMeds, ensuring consistency across all Material Design components.

### Exercise 10.4: Customizing Paper Theme

This exercise focuses on applying the theming concepts you've learned to customize the appearance of React Native Paper components for the SpeedyMeds application.

**Objective:** Create a custom theme for SpeedyMeds, focusing on primary and secondary colors, and apply it to a screen that uses several Paper components. Observe how the components adapt to your custom theme.

**(https://snack.expo.dev/@course-materials/module-10-exercise-10.4)**

_Instructions and requirements for the exercise are provided within the Expo Snack linked above._

### Next Steps

Theming with React Native Paper allows for consistent and branded UIs. To ensure your styled application looks great on all devices, the final section of this module will cover responsive design techniques. Proceed to [Section 10: Responsive Design Techniques (Platform, Dimensions)](./section-10-responsive-design-techniques.md).

📚 **Official Documentation:**

- [React Native Paper: Theming](https://callstack.github.io/react-native-paper/docs/guides/theming)
- [React Native Paper: DefaultTheme (MD2 - for reference, but use MD3 types for v5)](https://callstack.github.io/react-native-paper/docs/guides/theming#defaulttheme)
- [React Native Paper: `useTheme` hook](https://callstack.github.io/react-native-paper/docs/guides/theming#usetheme)
- [Material Design 3: Color System](https://m3.material.io/styles/color/system/overview)
