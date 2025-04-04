/**
 * Theme Context for SpeedyMeds App
 *
 * This file establishes a React Context for managing the application's theme (light/dark mode).
 * React Context provides a way to pass data through the component tree without having to
 * pass props down manually at every level. This is ideal for global data like theme settings.
 *
 * It defines:
 *   - `ThemePreference`: The possible user choices for theme setting.
 *   - `ThemeContextType`: The shape of the data provided by the context.
 *   - `ThemeProvider`: A component that wraps the application (or parts of it) and provides
 *     the theme context value to all descendants.
 *   - `useThemeContext`: A custom hook for components to easily consume the theme context value.
 *
 * @see https://react.dev/learn/passing-data-deeply-with-context - React Context Documentation
 */

import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  ReactNode,
  // useEffect, // Keep commented out unless Appearance API is used
} from "react";
// `useColorScheme` is a React Native hook to detect the user's system theme preference.
import { useColorScheme /*, Appearance*/ } from "react-native";
// Import the pre-defined light and dark theme objects.
import { lightTheme, darkTheme } from "../theme/theme"; // Adjust path as needed
// Import the AppTheme type which combines React Native Paper's MD3Theme and our custom properties.
import type { AppTheme } from "../theme/theme";

/**
 * @description Represents the user's explicit preference for the application theme.
 * This allows the user to override the system setting if desired.
 * @typedef {'light' | 'dark' | 'system'} ThemePreference
 * @property {'light'} light - Force the light theme.
 * @property {'dark'} dark - Force the dark theme.
 * @property {'system'} system - Follow the device's operating system theme setting.
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * @description Defines the structure (shape) of the value that will be provided by the ThemeContext.
 * Components consuming this context will receive an object matching this interface.
 * @interface ThemeContextType
 */
interface ThemeContextType {
  /**
   * @description The currently active theme object (`lightTheme` or `darkTheme`).
   * This object contains all the theme properties (colors, fonts, spacing, etc.)
   * needed by UI components (React Native Paper, Styled Components).
   */
  theme: AppTheme;

  /**
   * @description The user's currently selected theme preference setting.
   * This reflects the value chosen by the user ('light', 'dark', or 'system').
   */
  themePreference: ThemePreference;

  /**
   * @description A function that components can call to update the user's theme preference.
   * @param {ThemePreference} preference - The new preference value to set.
   */
  setThemePreference: (preference: ThemePreference) => void;

  /**
   * @description A convenient boolean flag indicating if the currently *active* theme is dark.
   * Useful for conditional styling or logic based on the effective mode.
   */
  isDark: boolean;
}

/**
 * Creates the React Context object for the theme.
 * `createContext` requires an initial default value. We provide `undefined` here,
 * which means any attempt to consume the context *outside* of a `ThemeProvider`
 * will result in `undefined`. Our `useThemeContext` hook handles this case by throwing an error.
 * Alternatively, a default object matching `ThemeContextType` could be provided, but
 * checking for `undefined` is a common pattern to ensure the provider is correctly set up.
 * @see https://react.dev/reference/react/createContext - `createContext` documentation
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * @description Defines the props accepted by the ThemeProvider component.
 * @interface ThemeProviderProps
 */
interface ThemeProviderProps {
  /**
   * @description The child components that the ThemeProvider will wrap.
   * Typically, this will be the entire application or a significant portion of it.
   * @type {ReactNode}
   */
  children: ReactNode;
}

/**
 * @description Provides the theme context value to its descendant components.
 * This component encapsulates the logic for:
 *   - Detecting the system's color scheme.
 *   - Storing the user's theme preference (e.g., 'light', 'dark', 'system').
 *   - Determining the *effective* theme (light or dark) based on the preference and system setting.
 *   - Providing the active theme object, preference, update function, and `isDark` flag
 *     to consuming components via the `ThemeContext.Provider`.
 *
 * It should wrap the root of your application (or the part that needs theme awareness)
 * typically within `App.tsx`.
 *
 * @param {ThemeProviderProps} props - Component props.
 * @param {ReactNode} props.children - The child components to render within the provider.
 * @returns {React.ReactElement} The ThemeProvider component wrapping its children.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 1. Get the system's current color scheme ('light', 'dark', or null/undefined).
  // `useColorScheme` automatically subscribes to system theme changes.
  // @see https://reactnative.dev/docs/usecolorscheme
  const systemColorScheme = useColorScheme();

  // 2. Manage the user's explicit theme preference state.
  // `useState` initializes the preference to 'system' by default.
  // `setThemePreferenceState` is the function to update this state.
  // TODO: Implement loading the initial preference from persistent storage (e.g., AsyncStorage)
  //       and saving it when `setThemePreference` is called.
  // @see https://react.dev/reference/react/useState - `useState` documentation
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");

  // 3. Determine the *effective* theme mode ('light' or 'dark').
  // `useMemo` optimizes this calculation. It only recalculates `effectiveMode`
  // if `themePreference` or `systemColorScheme` changes.
  // If preference is 'system', use the detected system scheme (defaulting to 'light' if system returns null).
  // Otherwise, use the user's explicit 'light' or 'dark' preference.
  // @see https://react.dev/reference/react/useMemo - `useMemo` documentation
  const effectiveMode = useMemo(() => {
    if (themePreference === "system") {
      // Default to 'light' if the system scheme is somehow null/undefined
      return systemColorScheme ?? "light";
    } else {
      // Use the user's explicit preference ('light' or 'dark')
      return themePreference;
    }
  }, [themePreference, systemColorScheme]); // Dependencies for recalculation

  // 4. Select the actual theme object based on the effective mode.
  // `useMemo` ensures we don't recreate the theme object on every render unless `effectiveMode` changes.
  const theme = useMemo(() => {
    return effectiveMode === "dark" ? darkTheme : lightTheme;
  }, [effectiveMode]); // Dependency for recalculation

  // --- Optional: Force OS theme (Commented Out) ---
  // This section shows how you *could* attempt to force the OS-level appearance,
  // but it's often better to let the app's UI theme itself rather than forcing the OS.
  // Requires importing `Appearance` from 'react-native'.
  // useEffect(() => {
  //   if (themePreference !== 'system') {
  //     Appearance.setColorScheme(themePreference);
  //   } else {
  //     // Reset to system default when preference is 'system'
  //     Appearance.setColorScheme(null);
  //   }
  // }, [themePreference]);
  // ---

  // 5. Create a stable function to update the theme preference state.
  // `useCallback` memoizes the `setThemePreference` function itself. It ensures that
  // consuming components receiving this function don't trigger unnecessary re-renders
  // if their props depend on this function's identity, unless `setThemePreferenceState` changes (which it won't).
  // TODO: Enhance this to save the preference to AsyncStorage.
  // @see https://react.dev/reference/react/useCallback - `useCallback` documentation
  const setThemePreference = useCallback((preference: ThemePreference) => {
    setThemePreferenceState(preference);
    // console.log("Saving theme preference:", preference); // Placeholder for saving
    // savePreferenceToStorage(preference); // Example persistence call
  }, []); // No dependencies, as setThemePreferenceState identity is stable

  // 6. Memoize the entire context value object.
  // This prevents consumers of the context from re-rendering unnecessarily if the
  // provider re-renders but the actual context values (`theme`, `themePreference`, etc.) haven't changed.
  const contextValue = useMemo(
    () => ({
      theme, // The active theme object
      themePreference, // The user's preference ('light', 'dark', 'system')
      setThemePreference, // The function to change the preference
      isDark: effectiveMode === "dark", // Boolean flag for the active mode
    }),
    // Dependencies: Recalculate the context object only if these values change.
    [theme, themePreference, setThemePreference, effectiveMode],
  );

  // 7. Render the Context Provider.
  // The `ThemeContext.Provider` component makes the `contextValue` available
  // to all descendant components that use `useContext(ThemeContext)` or `useThemeContext()`.
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * @description Custom hook to simplify consuming the `ThemeContext`.
 * It abstracts the `useContext(ThemeContext)` call and includes error handling
 * to ensure it's used within a `ThemeProvider`.
 *
 * Components should use this hook instead of `useContext(ThemeContext)` directly.
 *
 * @example
 * const { theme, isDark, themePreference, setThemePreference } = useThemeContext();
 * // Use theme.colors.primary, isDark for conditional styles, etc.
 *
 * @returns {ThemeContextType} The current theme context value.
 * @throws {Error} If the hook is called outside of a descendant of `ThemeProvider`.
 * @see https://react.dev/reference/react/useContext - `useContext` documentation
 */
export const useThemeContext = (): ThemeContextType => {
  // Get the context value.
  const context = useContext(ThemeContext);
  // Check if the context value is undefined, which means the hook is likely used
  // outside of the ThemeProvider tree.
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  // Return the context value if found.
  return context;
};
