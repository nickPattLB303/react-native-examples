/**
 * @module store/useAppStore
 * @description Global app state management using Zustand
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @interface AppState
 * @description Interface for global app state
 */
export interface AppState {
  /** Whether the user has completed onboarding */
  hasCompletedOnboarding: boolean;
  /** Current theme mode */
  themeMode: 'light' | 'dark' | 'system';
  /** Whether notifications are enabled */
  notificationsEnabled: boolean;
  /** Actions to update app state */
  actions: {
    setHasCompletedOnboarding: (value: boolean) => void;
    setThemeMode: (mode: AppState['themeMode']) => void;
    setNotificationsEnabled: (enabled: boolean) => void;
    resetAppState: () => void;
  };
}

/**
 * Initial state for the app store
 */
const initialState: Omit<AppState, 'actions'> = {
  hasCompletedOnboarding: false,
  themeMode: 'system',
  notificationsEnabled: true,
};

/**
 * Global app state store using Zustand with persistence
 * @example
 * ```tsx
 * function App() {
 *   const { themeMode, actions } = useAppStore();
 *   
 *   return (
 *     <Button 
 *       onPress={() => actions.setThemeMode('dark')}
 *       title={`Current theme: ${themeMode}`}
 *     />
 *   );
 * }
 * ```
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
        setThemeMode: (mode) => set({ themeMode: mode }),
        setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
        resetAppState: () => set(initialState),
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 