/**
 * Custom Render Function for React Native Testing Library with Providers
 *
 * @file This file defines a custom render function for use in tests.
 * @module test-utils/renderWithProviders
 *
 * @purpose Many components in the application rely on context providers (like theme providers)
 * to function correctly. Setting up these providers manually in every single test file
 * would be repetitive and cumbersome. This utility creates a custom `render` function
 * that automatically wraps the component being tested with all necessary global providers.
 *
 * @usage In your test files (`*.test.tsx`), import `render` from this file instead of
 * directly from `@testing-library/react-native`:
 * ```typescript
 * import { render, screen } from '../../test-utils/renderWithProviders'; // Adjust path
 * import MyComponentThatUsesTheme from '../MyComponentThatUsesTheme';
 *
 * it('renders correctly', () => {
 *   render(<MyComponentThatUsesTheme />);
 *   // Component now has access to theme context provided by the wrapper
 *   expect(screen.getByText('Some Themed Text')).toBeVisible();
 * });
 * ```
 *
 * @dependencies
 * - React: For creating the wrapper component.
 * - @testing-library/react-native: For the base `render` function and types.
 * - react-native-paper (`Provider`): The theme provider from React Native Paper.
 * - styled-components/native (`ThemeProvider`): The theme provider from Styled Components.
 * - Internal:
 *   - `../theme/theme`: Provides the actual theme object (`lightTheme`) used by default in tests.
 *   - `../theme/spacing`: Provides the spacing object, ensuring it's included in the test theme.
 *
 * @see {@link https://testing-library.com/docs/react-testing-library/setup#custom-render | Testing Library Custom Render Setup} (Concept applies here)
 * @see {@link https://callstack.github.io/react-native-paper/docs/guides/theming/ | React Native Paper Theming}
 * @see {@link https://styled-components.com/docs/advanced#theming | Styled Components Theming}
 */

import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
// Import the specific providers needed by the application components
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
// Import a default theme to use in tests for consistency
import { lightTheme } from "../theme/theme"; // Using light theme as the default for tests
import { spacing } from "../theme/spacing"; // Import spacing definitions
import type { AppTheme } from "../theme/theme"; // Import the theme type

/**
 * A wrapper component that includes all necessary global context providers.
 *
 * @description This component takes `children` (the component being tested) and wraps them
 * inside the `PaperProvider` and `StyledThemeProvider`. It uses a default theme (`lightTheme`)
 * merged with custom spacing to ensure components relying on theme context have access to it
 * during tests.
 *
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - The child component(s) to render within the providers.
 * @returns {ReactElement} The children wrapped with theme providers.
 */
const AllTheProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define the theme object to be used within the test environment.
  // We use a consistent default theme (lightTheme) to make tests predictable.
  // It's crucial to merge the base theme with any custom properties our AppTheme expects,
  // like `customSpacing`, otherwise components accessing `theme.customSpacing` might fail.
  const themeToUse: AppTheme = {
    ...lightTheme, // Spread the properties of the base light theme
    customSpacing: spacing, // Explicitly add our custom spacing object
  };

  // Return the children wrapped in the necessary providers, passing the consistent test theme.
  return (
    <PaperProvider theme={themeToUse}>
      <StyledThemeProvider theme={themeToUse}>{children}</StyledThemeProvider>
    </PaperProvider>
  );
};

/**
 * Custom render function that wraps the UI with necessary providers.
 *
 * @description This function takes the same arguments as the original `render` function
 * from `@testing-library/react-native` but automatically provides the `AllTheProviders`
 * component as the `wrapper` option. This ensures that any component rendered using
 * this function will have the theme contexts available.
 *
 * @param {ReactElement} ui - The React component element to render.
 * @param {Omit<RenderOptions, "wrapper">} [options] - Optional render options (excluding 'wrapper').
 * @returns {ReturnType<typeof render>} The result of the render function (including query functions, etc.).
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">, // Allow all options *except* 'wrapper'
) => render(ui, { wrapper: AllTheProviders, ...options }); // Pass our wrapper and any other options

// Re-export everything from testing-library, overriding render with our custom one
// This allows tests to import everything they need from this one file.
// export * from '@testing-library/react-native'; // Optional: Re-export all RNTL functions

// Export the custom render method aliased as `render`.
// Tests will import `{ render }` from this file.
export { customRender as render };
