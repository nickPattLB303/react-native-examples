import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { lightTheme } from "../theme/theme"; // Import a default theme
import { spacing } from "../theme/spacing"; // Import spacing directly

// Define a wrapper component that includes all necessary providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use a default theme (e.g., lightTheme) for testing consistency
  // Ensure customSpacing is definitely present for tests
  const themeToUse = {
    ...lightTheme,
    customSpacing: spacing,
  };

  return (
    <PaperProvider theme={themeToUse}>
      <StyledThemeProvider theme={themeToUse}>{children}</StyledThemeProvider>
    </PaperProvider>
  );
};

// Custom render function that includes the providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Export the custom render function
export { customRender as render };
