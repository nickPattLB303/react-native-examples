import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../theme/theme"; // Adjust path as needed
// Import the AppTheme type which includes MD3Theme and custom properties
import type { AppTheme } from "../theme/theme";

/**
 * @description Represents the user's preference for the application theme.
 * - `light`: Always use the light theme.
 * - `dark`: Always use the dark theme.
 * - `system`: Use the theme currently configured on the user's operating system.
 * @typedef {'light' | 'dark' | 'system'} ThemePreference
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * @description Defines the structure of the value provided by the ThemeContext.
 * @interface ThemeContextType
 * @property {AppTheme} theme - The currently active theme object (either light or dark).
 * @property {ThemePreference} themePreference - The user's selected theme preference ('light', 'dark', or 'system').
 * @property {(preference: ThemePreference) => void} setThemePreference - Function to update the user's theme preference.
 * @property {boolean} isDark - A boolean flag indicating if the currently active theme is dark.
 */
interface ThemeContextType {
  theme: AppTheme; // Use the fully typed AppTheme
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  isDark: boolean; // Convenience boolean
}

// Create the context with a default value (can be undefined or a default object)
// Providing a default implementation for setThemePreference to satisfy TypeScript initially
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * @description Defines the props accepted by the ThemeProvider component.
 * @interface ThemeProviderProps
 * @property {ReactNode} children - The child components that the ThemeProvider will wrap.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * @description Provides theme context to the application.
 * Manages the current theme state based on user preference (`ThemePreference`)
 * and the system's color scheme. It determines the effective theme (light/dark)
 * and makes the theme object, preference, and update function available via context.
 * @param {ThemeProviderProps} props - Component props.
 * @param {ReactNode} props.children - The child components to wrap.
 * @returns {React.ReactElement} The ThemeProvider wrapping its children.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme(); // 'light', 'dark', or null
  // TODO: Load preference from AsyncStorage
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");

  // Determine the effective theme mode based on preference and system scheme
  const effectiveMode = useMemo(() => {
    if (themePreference === "system") {
      return systemColorScheme ?? "light"; // Default to light if system is null
    } else {
      return themePreference;
    }
  }, [themePreference, systemColorScheme]);

  // Memoize the actual theme object
  const theme = useMemo(() => {
    return effectiveMode === "dark" ? darkTheme : lightTheme;
  }, [effectiveMode]);

  // Apply the chosen theme if not 'system'
  // useEffect(() => {
  //   if (themePreference !== 'system') {
  //     Appearance.setColorScheme(themePreference);
  //   }
  //   // TODO: Consider if Appearance.setColorScheme(null) is needed when switching back to 'system'
  // }, [themePreference]);

  // Callback to update the theme preference (persist to AsyncStorage later)
  const setThemePreference = useCallback((preference: ThemePreference) => {
    setThemePreferenceState(preference);
    // TODO: Save preference to AsyncStorage
  }, []);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      theme,
      themePreference,
      setThemePreference,
      isDark: effectiveMode === "dark",
    }),
    [theme, themePreference, setThemePreference, effectiveMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * @description Custom hook to easily consume the theme context (`ThemeContext`).
 * Provides access to the current theme, theme preference, and the function to update the preference.
 * Throws an error if used outside of a `ThemeProvider`.
 * @returns {ThemeContextType} The theme context value.
 * @throws {Error} If the hook is used outside of a ThemeProvider.
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
