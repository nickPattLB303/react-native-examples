# 05: Styled Components 💅

`styled-components` is a popular CSS-in-JS library that allows you to write actual CSS syntax to style your React Native components, leveraging tagged template literals. It helps create reusable, dynamic, and themed components with styles colocated.

*   **Installation:**
    ```bash
    npx expo install styled-components
    # Install types for TypeScript
    npm install --save-dev @types/styled-components-react-native
    ```
*   Uses tagged template literals for CSS syntax.
*   Creates actual React Native components with styles attached.
*   Supports props-based dynamic styling and theming.

> `styled-components` offers a powerful alternative to `StyleSheet` for component-centric styling.

<div class="react-dev">⚛ **React Devs:** If you've used `styled-components` on the web, the concepts are very similar, just targeting React Native components (`View`, `Text`, etc.) instead of HTML elements.</div>
<div class="angular-dev">🅰 **Angular Devs:** Think of this as defining component-scoped styles (like in `@Component({ styles: [...] })`), but using JavaScript and CSS syntax directly to create styled component primitives.</div>
<div class="android-dev">🤖 **Android Devs:** This approach moves styling away from separate resources (like XML styles/themes) directly into your component code using CSS syntax within JavaScript.</div>
<div class="ios-dev">🍏 **iOS Devs:** Imagine defining `UIView` or `UILabel` subclasses where appearance properties are set using CSS syntax within your Swift/Objective-C code, enabled by this library.</div>

<blockquote><details>

`styled-components` has gained significant traction in the React ecosystem (both web and native) as a way to manage styling. It allows developers to write familiar CSS syntax directly within their JavaScript/TypeScript files using ES6 tagged template literals. Instead of creating style objects like with `StyleSheet`, you define components where the styles are intrinsically linked. For example, `styled.View\`...\`` creates a new React Native component that renders a `View` with the specified CSS rules applied. This promotes better colocation of component logic and styles, enhances reusability, and simplifies dynamic styling based on props or themes. It automatically handles vendor prefixing (less relevant in RN) and ensures unique class names (under the hood) to prevent style collisions. While `StyleSheet` is built-in and highly performant, `styled-components` provides a different, often more expressive, way to handle styling, especially in complex applications with design systems or theming requirements. Remember to install both the library and its corresponding types for TypeScript support.

</details></blockquote>

---

## Basic Syntax

Import `styled` from `styled-components/native` and use it with tagged template literals.

```typescript
import styled from 'styled-components/native';
import { View, Text } from 'react-native'; // Still need core components

// Create a styled View component
const StyledContainer = styled.View`
  background-color: papayawhip; /* CSS syntax! */
  padding: 15px; /* Use CSS units/syntax where applicable */
  border-radius: 8px;
`;

// Create a styled Text component
const StyledTitle = styled.Text`
  font-size: 18px;
  color: palevioletred;
  font-weight: bold;
  text-align: center;
`;

// Usage within a component
const MyComponent = () => (
  <StyledContainer>
    <StyledTitle>Hello from Styled Components!</StyledTitle>
  </StyledContainer>
);
```

> You define new components (`StyledContainer`, `StyledTitle`) that encapsulate the base component (`View`, `Text`) and its styles.

<blockquote><details>

The core syntax involves importing the `styled` function from the `styled-components/native` entry point (it's crucial to use `/native` for React Native projects). You then call `styled` followed by the base React Native component you want to style (e.g., `styled.View`, `styled.Text`, `styled.Image`, `styled.ScrollView`). Immediately after this call, you provide a tagged template literal (backticks `` ` ``) containing standard CSS rules. Property names use CSS syntax (kebab-case like `background-color`) rather than JavaScript camelCase. Values can often use CSS units like `px` (though `px` and unitless numbers often behave similarly to React Native's dp system within `styled-components`). The result of `styled.View\`...\`` is a *new* React component (`StyledContainer` in the example) that you can render just like any other component. This component will render the underlying base component (`View`) with the specified styles automatically applied. This approach tightly couples the styles to the component definition.

</details></blockquote>

---

## Styling Based on Props

You can interpolate functions within the template literal to access the component's props and apply styles dynamically.

```typescript
import styled from 'styled-components/native';

interface PillButtonProps {
  variant?: 'primary' | 'secondary'; // Define expected props
}

// Access props via interpolated function: ${props => ...}
const PillButton = styled.TouchableOpacity<PillButtonProps>`
  background-color: ${(props) =>
    props.variant === 'primary' ? '#007AFF' : '#6C757D'};
  padding: 10px 20px;
  border-radius: 50px; /* Large radius for pill shape */
  margin-vertical: 5px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; /* Style based on disabled prop */
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

// Usage
const ActionButtons = () => (
  <>
    <PillButton variant="primary" onPress={() => {}}>
      <ButtonText>Submit Prescription</ButtonText>
    </PillButton>
    <PillButton variant="secondary" onPress={() => {}}>
      <ButtonText>Cancel</ButtonText>
    </PillButton>
    <PillButton variant="primary" disabled onPress={() => {}}>
      <ButtonText>Disabled Submit</ButtonText>
    </PillButton>
  </>
);
```

> Functions inside `${...}` receive the component's props, enabling powerful dynamic styling.

<blockquote><details>

One of the most powerful features of `styled-components` is its seamless integration with component props for dynamic styling. Within the tagged template literal, you can embed JavaScript expressions using the `${...}` syntax. If the expression is a function, `styled-components` will automatically call that function, passing it the component's props object. This allows you to write logic directly within your styles. In the `PillButton` example, the `background-color` is determined by checking `props.variant`. If the `variant` prop is `'primary'`, it uses the blue color; otherwise, it uses gray. Similarly, the `opacity` is adjusted based on the standard `disabled` prop often used with touchable components. This makes creating component variations (like primary/secondary buttons, active/inactive states) very intuitive, as the styling logic lives directly within the style definition and reacts to the props passed to the component instance. TypeScript interfaces (`PillButtonProps`) help ensure type safety when accessing props within the style functions.

</details></blockquote>

---

## Theming with `ThemeProvider`

`styled-components` provides a `<ThemeProvider>` component to pass a theme object down the component tree via context. Styled components can access this theme object within their style functions.

**1. Define a Theme:**

```typescript
// themes/defaultTheme.ts
export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  // Add more theme properties like typography, etc.
}

export const defaultTheme: AppTheme = {
  colors: {
    primary: '#007AFF', // Blue
    secondary: '#5AC8FA', // Light Blue
    background: '#F2F2F7',
    text: '#1C1C1E',
    error: '#FF3B30', // Red
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
```

**2. Wrap App with `ThemeProvider`:**

```typescript
// App.tsx (or your root component)
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { defaultTheme } from './themes/defaultTheme';
import MainNavigation from './navigation/MainNavigation'; // Your app's content

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <MainNavigation />
  </ThemeProvider>
);

export default App;
```

**3. Access Theme in Styled Components:**

```typescript
import styled from 'styled-components/native';
import { AppTheme } from '../themes/defaultTheme'; // Import theme type

// Props object in interpolated functions includes a 'theme' property
const ThemedContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.medium}px;
`;

const PrimaryText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 18px;
  margin-bottom: ${(props) => props.theme.spacing.small}px;
`;

// Type hint for props including theme (requires @types/styled-components-react-native)
const ErrorMessage = styled.Text<{ theme: AppTheme }>`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
  margin-top: ${props => props.theme.spacing.small}px;
`;
```

> Theming allows for centralized control over design tokens (colors, spacing, fonts) and easy switching between themes (e.g., light/dark mode).

<blockquote><details>

Theming is a cornerstone feature of `styled-components`, enabling robust design system implementation. You start by defining a theme object (`defaultTheme` in the example) containing your design tokens like colors, spacing units, font sizes, etc. Using a TypeScript interface (`AppTheme`) for your theme object provides type safety and autocompletion. Next, you wrap your entire application (or a relevant part of it) with the `ThemeProvider` component imported from `styled-components/native`, passing your theme object to its `theme` prop. This makes the theme object available via React's context API to all `styled-components` underneath it in the component tree. Inside the style functions (interpolated functions like `${props => ...}`), the `props` object automatically receives a `theme` property containing the theme object you provided. You can then access theme values like `props.theme.colors.primary` or `props.theme.spacing.medium` directly in your styles. This decouples specific values (like `#007AFF`) from your components, making it easy to update your design system globally or even implement dynamic theme switching (e.g., for dark mode) by changing the theme object passed to `ThemeProvider`. Explicitly typing the theme in styled components (`styled.Text<{ theme: AppTheme }>\``) enhances type checking.

</details></blockquote>

---

## Advantages and Considerations

**Advantages:**

*   ✅ **Colocation:** Styles live right next to the component logic.
*   ✅ **CSS Syntax:** Familiar syntax for many developers.
*   ✅ **Dynamic Styling:** Easy styling based on props and theme.
*   ✅ **Theming:** Built-in support for design systems and theming.
*   ✅ **Reusability:** Encourages creating reusable styled primitives.
*   ✅ **Automatic Vendor Prefixing:** (More relevant for web).
*   ✅ **No Style Name Collisions:** Generates unique identifiers.

**Considerations:**

*   ⚠️ **Performance:** Can have a slight runtime overhead compared to `StyleSheet` due to JS execution and component creation, though often negligible in typical RN apps. Performance has improved significantly over versions.
*   ⚠️ **Bundle Size:** Adds a dependency to your project.
*   ⚠️ **Learning Curve:** Requires understanding tagged template literals and CSS-in-JS concepts.
*   ⚠️ **Debugging:** Can sometimes make inspecting styles slightly harder (though dev tools are improving).

> `styled-components` is a powerful tool, especially for apps with complex UIs, design systems, or theming needs. Evaluate if its benefits outweigh the potential overhead for your project.

<blockquote><details>

Choosing a styling approach involves trade-offs. `styled-components` brings several benefits: colocating styles with component logic improves maintainability; using CSS syntax can be more intuitive for web developers; dynamic styling via props and the built-in theming system are powerful features for creating flexible and consistent UIs. It naturally promotes the creation of small, reusable styled building blocks. However, there are considerations. Because styles are processed at runtime using JavaScript, there can be a performance cost compared to `StyleSheet`, which pre-processes styles. While modern versions are highly optimized, it's something to be aware of, especially in performance-critical scenarios or on lower-end devices. It also adds to your app's bundle size. Developers new to CSS-in-JS or tagged template literals might face a slight learning curve. Debugging styles might also feel different initially compared to inspecting `StyleSheet` objects. Ultimately, the choice between `StyleSheet`, `styled-components`, or other styling solutions depends on the project's specific needs, team familiarity, and performance requirements. Many large applications successfully use `styled-components` in React Native.

</details></blockquote>

---

## Summary: Styled Components

*   💅 **CSS-in-JS:** Write CSS syntax in JS using tagged template literals (`styled.View\`...\``).
*   📦 **Installation:** `npx expo install styled-components` + types. Import from `styled-components/native`.
*   🧱 **Component Creation:** Defines new components with styles baked in.
*    dynamique **Props:** Access component props within styles using `${props => ...}` for dynamic styling.
*   🎨 **Theming:** Use `<ThemeProvider>` and `props.theme` for centralized design tokens.
*   ➕ **Pros:** Colocation, CSS syntax, dynamic styles, theming, reusability.
*   ➖ **Cons:** Potential minor performance overhead, bundle size increase, learning curve.

> `styled-components` provides an expressive and component-oriented way to style React Native applications, integrating seamlessly with props and themes.

<blockquote><details>

This section introduced `styled-components` as a popular CSS-in-JS library adapted for React Native. We covered its basic syntax using tagged template literals to create styled versions of core components like `View` and `Text`. We explored how to leverage component props within the style definitions to create dynamic styles that react to component state or variations. A key feature, theming via `ThemeProvider` and accessing the theme object in styles (`props.theme`), was explained as a powerful tool for managing design systems and consistency. We weighed the advantages, such as improved colocation, familiar CSS syntax, and powerful dynamic/theming capabilities, against potential considerations like runtime performance overhead and bundle size. `styled-components` offers a compelling alternative or complement to the built-in `StyleSheet` API, particularly valuable for applications emphasizing component reusability, dynamic UIs, and theming.

</details></blockquote> 