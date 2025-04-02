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

// Define the type for the theme preference
export type ThemePreference = "light" | "dark" | "system";

// Define the shape of the context value using AppTheme
interface ThemeContextType {
  theme: AppTheme; // Use the fully typed AppTheme
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  isDark: boolean; // Convenience boolean
}

// Create the context with a default value (can be undefined or a default object)
// Providing a default implementation for setThemePreference to satisfy TypeScript initially
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the provider component
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

// Create a custom hook for easier context consumption
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
